---
name: Eric's Recipe Book · 家常
description: Eric's recipe book, set as a printed dim sum order card on a celadon table.
colors:
  vermilion: "#c41f2e"
  vermilion-stamp-ink: "rgb(196 31 46 / 0.88)"
  card-green: "#1b6a4e"
  card-green-rule: "rgb(27 106 78 / 0.55)"
  card-green-faint: "rgb(27 106 78 / 0.14)"
  ballpoint-blue: "#1f4ea1"
  ballpoint-blue-faint: "rgb(31 78 161 / 0.1)"
  celadon-table: "#d7e3db"
  celadon-table-deep: "#c5d6cb"
  card-stock: "#fbfbf7"
  card-shade: "rgb(32 66 52 / 0.16)"
  press-ink: "#15191a"
  press-ink-soft: "#44514b"
typography:
  display:
    fontFamily: "'Noto Serif SC Variable', 'Songti SC', 'STSong', 'SimSun', serif"
    fontSize: "clamp(3.4rem, 2.2rem + 6vw, 6rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "0.02em"
  headline:
    fontFamily: "'Archivo Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.4rem, 1.7rem + 3.4vw, 4.4rem)"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 80"
  title:
    fontFamily: "'Archivo Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.75rem, 1.45rem + 1.5vw, 2.6rem)"
    fontWeight: 750
    lineHeight: 1.1
    fontVariation: "'wdth' 82"
  dish:
    fontFamily: "'Archivo Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.3rem)"
    fontWeight: 650
    lineHeight: 1.2
    fontVariation: "'wdth' 92"
  cook-step:
    fontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 2vw, 2.4rem)"
    fontWeight: 500
    lineHeight: 1.32
  body:
    fontFamily: "'Atkinson Hyperlegible Next Variable', system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Archivo Variable', 'Arial Narrow', sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 78"
  numeral:
    fontFamily: "'Archivo Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.35rem, 1.2rem + 0.75vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 80"
rounded:
  none: "0"
  hairline: "1px"
  sm: "2px"
  stamp: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  row: "8px"
  cell: "12px"
  section: "clamp(32px, 4vw, 48px)"
  touch: "48px"
components:
  button:
    textColor: "{colors.card-green}"
    rounded: "{rounded.sm}"
    padding: "0 1.25em"
    height: "48px"
  button-hover:
    backgroundColor: "{colors.card-green-faint}"
  button-red:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.card-stock}"
    rounded: "{rounded.sm}"
    padding: "0 1.25em"
    height: "48px"
  button-big:
    padding: "0 1.5em"
    height: "56px"
  timer-chip:
    textColor: "{colors.card-green}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "36px"
  tick:
    rounded: "{rounded.hairline}"
    size: "30px"
  find-input:
    textColor: "{colors.ballpoint-blue}"
    rounded: "{rounded.none}"
    padding: "6px 40px 6px 2px"
    height: "48px"
  stamp:
    textColor: "{colors.vermilion-stamp-ink}"
    rounded: "{rounded.stamp}"
    size: "2.3em"
  card:
    backgroundColor: "{colors.card-stock}"
    rounded: "{rounded.none}"
    padding: "clamp(20px, 4vw, 56px) clamp(16px, 4.5vw, 64px)"
---

# Design System: Eric's Recipe Book · 家常

## Overview

**Creative North Star: "The Dim Sum Order Card"**

Every surface is a sheet of thin, cool-white card stock lying on a pale celadon table, printed in exactly two inks and then marked up by the cook. The index is the tally card you tick to plan a cook, a recipe is its own card you work down, and the guided cook view is a card laid on the table that you stamp off line by line. Structure comes from printed rules (single, double, dashed), never from boxed panels or rounded containers.

Density is that of a working form: ruled rows, compact printed caps, generous touch targets inside the cells. Three hands are visible and never confused: the printer (vermilion and card green), the cook (ballpoint blue), and the rubber stamp (translucent vermilion with one shared ink texture). Cards sit slightly askew on wide screens and lie square on phones, where the card fills the viewport. Dark mode turns the table and card to night tones; the inks lighten and the stamps switch from multiply to screen so they still read as ink.

Motion is limited to physical acts: the ballpoint tick snapping in, the step panel sliding across like a chit, the mobile tally strip rising from the bottom edge, and an overdue timer nudging. Everything collapses to near-instant under reduced motion.

**Key Characteristics:**
- Two printed inks (vermilion, card green) plus the cook's ballpoint blue; no other hues.
- Rules, not boxes: hairline green row rules, a red double rule under every header band, dashed rules for tear-offs.
- One shared ink-mask noise on every rubber stamp; per-index rotation.
- Paper tooth grain inside every card; a coarser grain fixed over the table.
- Hanzi lead every heading in heavy Song/Ming vermilion; English follows in condensed green caps.

## Colors

Two printed inks on cool card stock over a celadon table, with blue reserved for the cook's own hand.

### Primary
- **Dim Sum Vermilion** (`vermilion`): the first printed ink. Hanzi in every heading and dish name, step numerals, the 3px double rule that closes a header band (index column heads, the recipe fields, the cook bar, the shopping list head), the primary action button, the tally chit's big hands-on total, and an overdue timer.
- **Stamp Vermilion** (`vermilion-stamp-ink`): the same red at 88% for rubber stamps only, blended `multiply` on light and `screen` on dark.

### Secondary
- **Order Card Green** (`card-green`): the second printed ink. Column heads and field labels, English titles on a recipe card, chapter names, panel leads in cook mode, pinyin, outline buttons, section rules (1.5px).
- **Green Rule** (`card-green-rule`): row rules, grid cell dividers, tick-box borders, the tear-off dashed edge.
- **Green Wash** (`card-green-faint`): button hover fill, light list rules between ingredients and steps, the hairline under a card.

### Tertiary
- **Ballpoint Blue** (`ballpoint-blue`): the cook's marks only. Plan ticks, ingredient quantities, the search field's typed text, cook's notes (italic), the current step's 3px underline in the cook track, the idle timer face, strike-through lines on ticked items, links in recipe fields, focus outlines, the text caret.
- **Blue Wash** (`ballpoint-blue-faint`): selection, row hover gradients, track hover.

### Neutral
- **Celadon Table** (`celadon-table`): page ground and the cook dialog's backdrop; also the browser theme color.
- **Celadon Shadow** (`celadon-table-deep`): deeper table tone, reserved.
- **Cool Card Stock** (`card-stock`): every card surface, and text on the vermilion button.
- **Press Ink** (`press-ink`): body text.
- **Faded Ink** (`press-ink-soft`): summaries, hints, ingredient notes, done items, the colophon.
- **Card Shade** (`card-shade`): the only shadow color.

Dark mode remaps the same names: table `#0f1814`, card `#1a2420`, vermilion `#f2707a`, green `#79c9a4`, blue `#93b6ff`, ink `#e9eeeb`, faded ink `#a8b8b0`.

### Named Rules
**The Two Inks Rule.** The printer owns exactly two inks. Vermilion is for hanzi, step numerals and key rules; card green is for the ruled grid, column heads, English titles and panel leads. No third printed color, no gradients, no tints beyond the rule and wash alphas.

**The Ballpoint Rule.** Blue appears only where the cook has acted or is acting: ticks, quantities, notes, typed search text, the current step. Printed matter is never blue.

## Typography

**Display Font:** Noto Serif SC Variable at 900 (with Songti SC, STSong, SimSun)
**Print Font:** Archivo Variable, condensed through the width axis (with Arial Narrow)
**Body Font:** Atkinson Hyperlegible Next Variable (with system-ui)

**Character:** Heavy Song/Ming hanzi do the shouting in vermilion; a sturdy condensed grotesque prints the caps, titles and numerals in green; a hyperlegible text face carries the instructions so they read at arm's length by the stove.

### Hierarchy
- **Display** (900, `--step-5`, 1.02): the hanzi name of the book and of each recipe. Always vermilion, always with a language tag.
- **Headline** (750, `--step-4`, 1, 80% width): the English recipe title under its hanzi, in card green.
- **Title** (750, `--step-3`, 1.1, 82% width): cook-mode panel leads ("Get everything out first."), in card green.
- **Dish** (650, `--step-1`, 1.2, 92% width): English dish names in index rows and related links, in press ink.
- **Cook step** (500, up to 2.4rem, 1.32, max 34ch): the single instruction in cook mode; quantities inside it go to 800 and blue.
- **Body** (400, `--step-0`, 1.55, max 62 to 65ch): steps, notes, summaries.
- **Label** (700, 0.6875 to 0.875rem, uppercase, 0.06em, 78% width): column heads, field labels, ingredient group names, meta lines.
- **Numeral** (800, `--step-2`, tabular, 80% width): step numbers in vermilion; the same face at larger sizes sets timer faces and the tally total.

### Named Rules
**The Hanzi First Rule.** Every section head pairs a vermilion hanzi with a green printed-caps English word, hanzi first (配料 Ingredients, 做法 Method, 笔记 Notes, 买菜 Shopping list).

**The Tabular Clock Rule.** Times, counts and timers are set in the condensed print face with tabular figures, so digits never jitter as they tick.

## Layout

Each surface is one card on the table, padded with fluid clamps (about 16 to 64px) inside a page gutter of `clamp(16px, 4vw, 48px)`. The index places the order card in a flexible column beside a 300px tally chit from 1024px up (max width 1240px); below that the chit becomes a fixed bottom strip that slides up once a dish is ticked. A recipe card is max 1180px; its body splits ingredients and method 5:7 from 900px; with a photo, the page widens to 1440px and the photo card pins to the right from 1180px.

Inside a card, content is a ruled grid: rows of 8 to 13px vertical padding separated by rules, sections spaced `clamp(32px, 4vw, 48px)` apart, field grids of three columns collapsing to one at 640px. On phones, the index hides the time column and folds time into the dish cell.

Cook mode fills the viewport with the table and lays one card of max 1120px on it (inset from 900px, edge to edge below): a bar, the numeral track, a scrolling stage (panel max 860px), the nav row, then the timer tray.

**The Askew Card Rule.** From 1024px up, cards sit slightly off square: order card -0.5deg, recipe card -0.35deg, tally chit 1.1deg, photo 2deg. Below 1024px and in print, every card is square. The cook card is never rotated.

## Elevation & Depth

Depth is physical paper on a table: a soft, low, layered drop under each card, never a hard edge. Texture does more than shadow: a fixed fractal-noise grain at 35% lies over the table, and every card carries its own finer paper tooth (`.card::before`, 50% light, 35% dark) under the print and above the stock.

### Shadow Vocabulary
- **Card on table** (`box-shadow: 0 1px 0 var(--green-faint), 0 18px 40px -18px var(--card-shade), 0 4px 10px -4px var(--card-shade)`): every card. Removed in print and on the full-bleed cook card below 900px.
- **Timer chip lift** (`box-shadow: 0 8px 20px -10px var(--card-shade)`): running timer chips floating over the page.

### Named Rules
**The Paper Tooth Rule.** Any new card surface uses the shared card class so it gets the same grain and shadow; never a flat panel and never a second grain.

## Shapes

Square card corners everywhere. Printed blanks and controls get at most a 2px corner (buttons, timer chips, yield steppers); tick boxes 1px. The only round form is the rubber stamp, a 50% circle ringed in 0.13 to 0.14em vermilion, dashed for a draft. Lines carry the structure: 1px green rules for rows and cell dividers, 1.5px green rules under section heads and around the meta line, a 3px vermilion double rule closing each header band, 2px green underline for the find field, and dashed green rules for the chit's tear-off top and the cook view's "next" preview.

**The Rules, Not Boxes Rule.** Group content with rules and whitespace, not bordered or filled containers. The only bordered rectangles are printed form blanks a hand acts on: buttons, tick boxes, steppers and timer chips.

## Components

### Buttons
Printed, firm, and plainly tappable.
- **Shape:** near-square (2px), 1.5px border, min height 48px (56px for the big cook and print actions).
- **Default:** transparent with a card-green border and green label, condensed print face at 700, optional Phosphor bold icon at 1.2em.
- **Red:** solid vermilion with card-stock text; one per surface for the main act (Cook this, Shopping list, Done, next step). Hover mixes 12% ink into the red. Disabled on the chit turns to a red outline.
- **Hover / Active / Focus:** green wash fill at 160ms; 1px press down on active; 2px blue outline at 3px offset on focus.
- **Icon buttons (cook bar):** 48px, borderless, gain a green-rule border and green text when toggled on (Screen on).

### Tick boxes
The cook's ballpoint mark. A 30px blank with a 1.5px green-rule border; checking draws a Phosphor bold check in blue, rotated -6deg and overshooting the box, eased in 180ms. In the index plan column the box disappears: the whole ruled cell is the target (min 64px tall) with a short printed underline to mark on. Ticked ingredients strike through in blue and fade to faded ink.

### Inputs / Fields
- **Find field:** no box; a 2px card-green underline, 48px tall, text typed in ballpoint blue at `--step-2`, a green search icon that hides once text is entered. A vermilion hanzi (找) and green caps label sit to its left.
- **Focus:** 2px blue outline offset 6px.

### Rubber stamps
The record of what is done: 試 cooked, 存 saved, 草 draft (dashed ring), 好 step done. All share one `--ink-mask` noise texture, translucent stamp vermilion and the theme blend mode. Rotation defaults to -12deg on status stamps; step stamps rotate per index through `--stamp-rot` (-10deg, 7deg, -19deg, repeating every three).

### Navigation: the cook track
A ruled numeral strip under the cook bar: 42 by 46px cells separated by faint green rules, a right-edge 56px fade showing there is more to scroll, no scrollbar. The current step is blue, bold, with a 3px blue underline; finished steps carry a 28px 好 stamp over a faded numeral. Back links are green print caps with an arrow.

### Recipe card
Hanzi display title, green English headline, pinyin, summary in faded ink, a status stamp in its own column, then a three-column field grid opened by the red double rule. Ingredients and method follow as ruled lists; steps hang a vermilion tabular numeral in a 2.4em column. Cook's notes are blue italic with a blue check mark.

### Cook view
A card laid on the celadon table. Each step panel shows one instruction large, only that step's ingredients at the current scale, an optional timer whose face is blue idle, green running and red over, and a dashed-rule preview of the next step. Panels slide in 28px with a 0.6deg turn over 280ms, reversed for going back.

### Tally chit
A narrow tear-off on the table: dashed green top edge, 点单 Plan heading, blue planned dishes, the hands-on total as a large vermilion numeral, and the shopping-list action. On narrow screens it is a fixed bottom strip that slides up 260ms once something is ticked.

## Do's and Don'ts

### Do:
- **Do** set every section head as vermilion hanzi plus green printed caps, with `lang="zh-Hans"` or `zh-Hant` on the hanzi.
- **Do** close every header band with the 3px vermilion double rule and divide rows with 1px green rules.
- **Do** put every new card on the shared card surface so it carries the paper tooth and the card-on-table shadow.
- **Do** give every new stamp the shared ink mask, stamp vermilion, the theme blend mode and an index-driven `--stamp-rot`.
- **Do** keep ballpoint blue for marks the cook makes or is making, and keep touch targets at 44 to 48px or larger.
- **Do** tilt cards only from 1024px up, by no more than 2deg, and lay them square on phones and in print.

### Don't:
- **Don't** add a third printed ink, a gradient fill, or a tint other than the existing rule and wash alphas.
- **Don't** box or fill content groups; use rules. Bordered rectangles are only for buttons, tick boxes, steppers and timer chips.
- **Don't** round card corners or give controls more than a 2px corner; the stamp is the only circle.
- **Don't** print anything in blue, or mark anything the cook did in green or red (except the stamp).
- **Don't** turn the index into a hero photo, intro paragraph or grid of equal recipe cards; it is a ruled order card with one row per dish.
- **Don't** add icon families other than Phosphor bold, or emoji and text glyphs in place of icons.
