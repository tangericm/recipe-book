# 家常 Home Cooking

Eric's recipe book: Chinese home cooking, braises, buns and a cake, built as a printed dim sum order card. Find a dish, tick a few to plan a cook and get a shopping list, or open one and let the guided mode walk you through it: mise en place first, one step at a time, the step's timer front and center, the screen kept awake, and your place remembered if you leave.

Built with [Astro](https://astro.build) as a static site.

## Run it

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`.

## Add a recipe

Each recipe is one YAML file in `src/content/recipes/`. The file name becomes the URL (`/r/<file-name>/`).

```yaml
title: Salt Chicken
hanzi: 盐鸡            # optional; set hanziLang: zh-Hant for traditional characters
pinyin: Yán jī         # optional
chapter: braises       # dough | braises | bakery | hotpot
status: cooked         # cooked | saved | draft
source:
  kind: notebook       # notebook | adapted | chat | draft
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
