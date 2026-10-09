---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/r/[slug].astro"]
---

# Surface brief: recipe book (home index + recipe pages + guided cook mode)

Scope and mode: the home page is the lookup surface (Operate: find a dish fast; it is also the showcase first impression). Recipe pages are Read surfaces with an Operate core: the guided cook mode. Audience: Eric at the stove on a phone or tablet; secondary, friends and family browsing the public link. Content: 16 recipes in 4 chapters (dough and dumplings, bakery, braises, hot pot). Constraints: static Astro build, no photos of Eric's own food, open-licensed imagery only, honest provenance and draft status.

## Direction contract

THESIS: The book is a dim sum order card (點心紙). The index is the printed tally card you tick to plan a cook; each recipe is its own card you work down, and cooking is stamping it off line by line. Refuses the category default: hero photo, intro paragraph, grid of equal recipe cards.

OWN-WORLD: Pale celadon table ground; thin cool-white card stock with a faint paper tooth, slightly askew; two printed inks only, vermilion for hanzi, step numerals and key rules, dim-sum-card green for the ruled grid, column heads and English titles; the cook's own marks in ballpoint blue (plan ticks, notes); completion as a translucent red rubber stamp (試 cooked, 好 done, 草 draft). Type: heavy Song/Ming hanzi in vermilion, a sturdy condensed grotesque for printed caps and numerals, a hyperlegible text face for steps. Rules, not boxes; no rounded cards.

STORY: Eric opens the card, types or scans to a dish, opens its card, ticks the mise en place, then steps through a one-step-at-a-time guided view that keeps the screen awake, runs that step's timer, shows only that step's ingredients at the current scale, and stamps each finished step; leaving and coming back resumes at the same line. Visitors see the same card and read the provenance and notes.

FIRST VIEWPORT: Desktop: the order card fills a left-center column (about 60 percent width, rotated under one degree) on the celadon table: 家常 in huge vermilion with HOME COOKING green caps beside it, a printed "Find a dish" form line, then the green-ruled header (DISH, TIME, STATUS, PLAN) and the first chapter's rows. To the right on the table, a narrow tear-off tally chit: dishes ticked, total time, and the shopping-list action. Mobile: card is full width, chit becomes a sticky bottom strip once something is ticked.

FORM: Dim sum order card (點心紙), position 1 on my ordered grounded list (taken by the user as IMPECCABLE'S PICK over the dealt bakery box), seed key 43fea1a8. Signature interaction: the rubber stamp landing on a finished step or a cooked dish (fast press, slight random rotation, ink spread), plus ballpoint ticks; the step view slides like a chit pulled across the table. Motion is only those, and collapses to instant under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Book name: working title 家常 Home Cooking; Eric may rename.
- Photos: open-licensed dish photos pending verification; recipes without a verified photo ship without one.
