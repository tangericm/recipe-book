import { amount, parseStep, type Ingredient } from './format';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** A scalable quantity: the client rewrites the text when the yield changes. */
export function qtyHtml(i: Pick<Ingredient, 'qty' | 'unit'>): string {
  if (i.qty === undefined) return '';
  return `<span class="q num" data-qty="${i.qty}"${i.unit ? ` data-unit="${esc(i.unit)}"` : ''}>${esc(amount(i.qty, i.unit))}</span>`;
}

/** Step text with ingredient references expanded to "quantity name". */
export function stepHtml(text: string, items: Map<string, Ingredient>): string {
  return parseStep(text)
    .map((s) => {
      if (s.kind === 'text') return esc(s.text);
      const it = items.get(s.id);
      if (!it) return esc(s.label ?? s.id);
      if (s.label !== undefined) return `<span class="ref" data-ref="${s.id}">${esc(s.label)}</span>`;
      const q = qtyHtml(it);
      return `<span class="ref" data-ref="${s.id}">${q ? `${q} ` : ''}${esc(it.name)}</span>`;
    })
    .join('');
}
