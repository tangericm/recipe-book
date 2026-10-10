# Eric's Recipe Book · 家常

Eric's recipe book: Chinese home cooking, braises, buns and a cake, built as a printed dim sum order card. Find a dish, tick a few to plan a cook and get a shopping list, or open one and let the guided mode walk you through it: mise en place first, one step at a time, the step's timer front and center, the screen kept awake, and your place remembered if you leave.

[Browse the recipe book](https://erics-kitchen.vercel.app) · [Report an issue](https://github.com/tangericm/recipe-book/issues)

Built with [Astro](https://astro.build) as a static site. Recipes are schema-validated YAML; the shopping list and guided cooking mode run in the browser. No account or backend is required. Cooked, saved, and draft recipes are labeled separately, and adaptations link to their sources.

[![CI](https://github.com/tangericm/recipe-book/actions/workflows/ci.yml/badge.svg)](https://github.com/tangericm/recipe-book/actions/workflows/ci.yml)

## Run it

Requires Node.js **22.12 or later** and npm **9.6.5 or later**. From a fresh checkout:

```bash
git clone https://github.com/tangericm/recipe-book.git
cd recipe-book
npm ci
npm run dev
```

Open the localhost URL printed by Astro. Before submitting a change:

```bash
npm run check
npm run build
npm run preview
```

`check` checks Astro and TypeScript; `build` validates the recipe collection and writes the static site to `dist/`. `preview` serves that build locally. CI runs the first two commands on pushes and pull requests. Vercel deploys `main`; the canonical public address is `https://erics-kitchen.vercel.app`.

Recipe checklists, cooking progress, and shopping selections use browser storage. They stay in that browser and are not synchronized across devices. Wake lock depends on browser support, and timers can be delayed when a device sleeps; keep a kitchen timer for anything time-critical.

## Add a recipe

Each recipe is one YAML file in `src/content/recipes/`. The file name becomes the URL (`/r/<file-name>/`).

```yaml
title: Salt Chicken
hanzi: 盐鸡            # optional; set hanziLang: zh-Hant for traditional characters
pinyin: Yán jī         # optional
cuisine: Chinese       # optional, defaults to Chinese (Thai, Indian, ...)
chapter: braises       # dough | braises | bakery | hotpot
status: cooked         # cooked | saved | draft
source:
  kind: notebook       # notebook | family | adapted | chat | draft
  label: Red House Spice   # for adapted or draft
  url: https://...
summary: One or two sentences.
yield: { qty: 4, unit: servings }
time: { active: 20, total: 120 }   # minutes
ingredients:
  - name: Seasoning     # optional group name
    items:
      - { id: soy, qty: 2, unit: tbsp, name: light soy sauce, note: "optional, quote notes with commas" }
steps:
  - name: Slow cook     # optional phase name
    steps:
      - text: Add {soy} and simmer.   # {id} expands to "2 tbsp light soy sauce"; {id|label} shows your own words
        timer: 5400                   # seconds; becomes a tap-to-start timer
notes:
  - { kind: cook, text: What happened when you made it. }
  - { kind: tip, text: General advice. }
```

Units that scale cleanly: `g`, `ml`, `tsp`, `tbsp`, `cup`, `lb`, `oz`, `qt`; leave `unit` out for counts. Set `scalable: false` when a recipe should not be resized (the cake is built for three 6 in pans).

## Credits

Recipes adapted from other cooks link to their source on each card. Type: Noto Serif SC, Archivo and Atkinson Hyperlegible Next (SIL Open Font License), self-hosted via Fontsource. Icons: Phosphor (MIT).

## Contributing and reuse

For a recipe correction, include the recipe URL and what you cooked or observed. For a UI bug, include the browser, device, and steps to reproduce. Preserve source credit, cooked/draft status, ingredient IDs, and existing recipe URLs when editing.

This is a public personal website repository, with no repository-wide open-source license currently granted. Third-party recipes, fonts, and icons retain their own terms; public availability does not grant redistribution rights to the collection.
