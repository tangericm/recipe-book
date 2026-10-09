# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output), deployed to Vercel from the public GitHub repo `tangericm/recipe-book`. Recipes live as data files in an Astro content collection; interactivity ships as small islands only where a recipe page needs it.

## Users

Primary: Eric himself, looking up a recipe he made before and being guided through it step by step to recreate it, usually on a phone or tablet propped up in the kitchen, sometimes on a laptop while planning. Secondary: friends and family who get the public link and browse what he cooks.

## Product Purpose

A personal recipe platform for Eric's own home cooking (mostly Chinese and Cantonese family dishes, plus braises, breads and a cake worked out over time) that doubles as a public, showcase-quality book. Success: Eric can find any old recipe in seconds and cook it start to finish from the page, with the page keeping his place, his checklist and his timers; visitors find a book worth browsing.

## Positioning

These are one cook's working recipes, not a content farm: each carries its provenance (family notebook, a bookmarked source, or a recipe worked out in conversation), the cook's own notes from actually making it, and an honest status when a recipe is still a draft that has not been cooked.

## Operating Context

- Recipes come from a cooking notebook, family recipes and credited external sources. Private notebook files and conversations are not publication material.
- Many dishes are Instant Pot braises; several are flour-and-dough projects (buns, wrappers, pancakes) with multi-component ingredient lists and long proof times.
- Some recipes are scaled versions of others (pineapple buns for 6 and for 2).

## Capabilities and Constraints

- Recipe names appear in English, Chinese characters, and pinyin with tone marks.
- Grouped ingredient components (dough, filling, topping) and nested sub-steps must be supported.
- Recipes adapted from other authors credit and link the source; instructional prose is written fresh, never copied.
- Three recipes (mapo tofu, steamed pork buns, dan dan noodles) are drafts written for the book, labeled as not yet cooked, linking the source Eric bookmarked.
- No original photography exists. Any imagery must be openly licensed and attributed, or authored for the site.
- Adding a recipe should mean adding one data file.

## Brand Commitments

The public name is Eric's Recipe Book · 家常. Preserve the printed dim sum order card and celadon table visual identity.

## Evidence on Hand

- The checked-in recipe collection records ingredients, instructions, recipe status and public source credits.
- No original food photography, ratings, reviews or nutrition data are available. Do not fabricate these.
- Personal source documents, conversations and named family attributions remain private.

## Product Principles

1. Find, then cook: lookup takes seconds, and every recipe has a guided mode that walks through mise en place and each step, keeps the screen awake, runs the step's timers and remembers where you stopped.
2. The recipe is the product: cookable from a phone, no life-story preamble before the ingredients.
3. Provenance is honest: every recipe says where it came from and whether it has been cooked.
4. The cook's notes are the soul: real marginalia from making the dish is featured, not buried.
5. One cook's voice and growable structure: consistent, plain instructions across origins, working at 16 recipes and at 100.

## Accessibility & Inclusion

Readable at arm's length on a phone in kitchen light; WCAG 2.2 AA contrast; large touch targets; respects reduced motion; Chinese text set with correct language tags (`lang="zh-Hans"` / `zh-Hant`) so screen readers and fonts behave.
