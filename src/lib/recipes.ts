import { getCollection, type CollectionEntry } from 'astro:content';
import { amount, isoDuration, parseStep } from './format';

export type Recipe = CollectionEntry<'recipes'>;

export const CHAPTERS = [
  { id: 'dough', hanzi: '面点', name: 'Dough and dumplings' },
  { id: 'braises', hanzi: '炖煮', name: 'Braises and simmers' },
  { id: 'bakery', hanzi: '烘焙', name: 'Bakery' },
  { id: 'hotpot', hanzi: '火锅', name: 'Hot pot' },
] as const;

export const STATUS = {
  cooked: { stamp: '試', label: 'Cooked', long: 'Cooked, with notes from the stove' },
  saved: { stamp: '存', label: 'Saved', long: 'Saved, not marked as cooked yet' },
  draft: { stamp: '草', label: 'Draft', long: 'Draft written for the book, not cooked yet' },
} as const;

const ORDER: Record<string, number> = { cooked: 0, saved: 1, draft: 2 };

export async function allRecipes(): Promise<Recipe[]> {
  const list = await getCollection('recipes');
  return list.sort(
    (a, b) => ORDER[a.data.status] - ORDER[b.data.status] || a.data.title.localeCompare(b.data.title),
  );
}

export function byChapter(list: Recipe[]) {
  return CHAPTERS.map((c) => ({ ...c, recipes: list.filter((r) => r.data.chapter === c.id) })).filter(
    (c) => c.recipes.length,
  );
}

export function sourceLine(r: Recipe): { text: string; label?: string; url?: string; date?: string } {
  const s = r.data.source;
  const date = s.date ? formatMonth(String(s.date)) : undefined;
  switch (s.kind) {
    case 'notebook':
      return { text: "From Eric's recipe notebook" };
    case 'family':
      return { text: s.label ? `Family recipe, the way ${s.label} makes it` : 'Family recipe' };
    case 'adapted':
      return { text: 'Adapted from', label: s.label, url: s.url, date };
    case 'chat':
      return { text: 'Worked out in a cooking chat', date };
    case 'draft':
      return s.url
        ? { text: 'Draft for the book, from the bookmarked', label: s.label, url: s.url }
        : { text: 'Draft for the book' };
  }
}

function formatMonth(d: string): string {
  const [y, m] = d.split('-');
  if (!m) return y;
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[Number(m) - 1]} ${y}`;
}

function plainStep(text: string, items: Map<string, { qty?: number; unit?: string; name: string }>) {
  return parseStep(text)
    .map((s) => {
      if (s.kind === 'text') return s.text;
      const it = items.get(s.id);
      if (!it) return s.label ?? s.id;
      if (s.label) return s.label;
      const a = amount(it.qty, it.unit);
      return a ? `${a} ${it.name}` : it.name;
    })
    .join('');
}

export function jsonLd(r: Recipe, url: string) {
  const d = r.data;
  const items = new Map(d.ingredients.flatMap((g) => g.items).map((i) => [i.id, i]));
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: d.title,
    alternateName: d.hanzi,
    description: d.summary,
    author: { '@type': 'Person', name: 'Eric Tang' },
    recipeCuisine: d.cuisine,
    recipeCategory: d.chapter,
    recipeYield: [String(d.yield.qty), `${d.yield.qty} ${d.yield.unit}`],
    totalTime: isoDuration(d.time.total),
    prepTime: isoDuration(d.time.active),
    ...(d.photo ? { image: [new URL(d.photo.src, url).href] } : {}),
    recipeIngredient: d.ingredients.flatMap((g) =>
      g.items.map((i) => [amount(i.qty, i.unit), i.name, i.note ? `(${i.note})` : ''].filter(Boolean).join(' ')),
    ),
    recipeInstructions: d.steps.map((g) => ({
      '@type': 'HowToSection',
      name: g.name ?? d.title,
      itemListElement: g.steps.map((s) => ({ '@type': 'HowToStep', text: plainStep(s.text, items) })),
    })),
    url,
  };
}
