import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const ingredient = z.object({
  id: z.string(),
  qty: z.number().optional(),
  unit: z.string().optional(),
  name: z.string(),
  note: z.string().optional(),
});

const step = z.object({
  text: z.string(),
  timer: z.number().int().positive().optional(),
});

const recipes = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    hanzi: z.string().optional(),
    hanziLang: z.enum(['zh-Hans', 'zh-Hant']).default('zh-Hans'),
    pinyin: z.string().optional(),
    cuisine: z.string().default('Chinese'),
    chapter: z.enum(['dough', 'braises', 'bakery', 'hotpot']),
    status: z.enum(['cooked', 'saved', 'draft']),
    scalable: z.boolean().default(true),
    source: z.object({
      kind: z.enum(['notebook', 'family', 'adapted', 'chat', 'draft']),
      label: z.string().optional(),
      url: z.string().url().optional(),
      date: z.union([z.string(), z.number()]).optional(),
      also: z.object({ label: z.string(), url: z.string().url() }).optional(),
    }),
    summary: z.string(),
    yield: z.object({ qty: z.number(), unit: z.string() }),
    time: z.object({ active: z.number(), total: z.number() }),
    equipment: z.string().optional(),
    related: z.array(z.string()).default([]),
    photo: z
      .object({
        src: z.string(),
        alt: z.string(),
        credit: z.string(),
        license: z.string(),
        href: z.string().url(),
        caption: z.string().optional(),
      })
      .optional(),
    ingredients: z.array(z.object({ name: z.string().optional(), items: z.array(ingredient) })),
    steps: z.array(z.object({ name: z.string().optional(), steps: z.array(step) })),
    notes: z.array(z.object({ kind: z.enum(['cook', 'tip']), text: z.string() })).default([]),
    extras: z
      .array(z.object({ title: z.string(), rows: z.array(z.array(z.string())) }))
      .default([]),
  }),
});

export const collections = { recipes };
