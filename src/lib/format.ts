// Shared by the server render and the client islands: quantity scaling,
// fraction display, ingredient references inside step text, and durations.

const GLYPHS: Record<string, string> = {
  '1/2': '½', '1/3': '⅓', '2/3': '⅔', '1/4': '¼', '3/4': '¾', '1/6': '⅙', '5/6': '⅚',
  '1/8': '⅛', '3/8': '⅜', '5/8': '⅝', '7/8': '⅞',
};

const SPOON = new Set(['tsp', 'tbsp']);
const MEASURE = new Set(['cup', 'lb', 'qt', 'oz']);
const METRIC = new Set(['g', 'ml', 'kg', 'l']);

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

/** Round to the closest fraction whose denominator is in `dens`, rendered with vulgar-fraction glyphs. */
function fraction(q: number, dens: number[]): string {
  let best = { whole: Math.round(q), num: 0, den: 1, err: Math.abs(q - Math.round(q)) };
  for (const den of dens) {
    const n = Math.round(q * den);
    const err = Math.abs(q - n / den);
    if (err < best.err - 1e-9) best = { whole: Math.floor(n / den), num: n % den, den, err };
  }
  let { whole, num, den } = best;
  if (whole === 0 && num === 0) {
    // Never round a real amount down to nothing.
    num = 1;
    den = Math.max(...dens);
  }
  if (num === 0) return String(whole);
  const g = gcd(num, den);
  const key = `${num / g}/${den / g}`;
  const glyph = GLYPHS[key] ?? key;
  return whole ? `${whole}${glyph}` : glyph;
}

export function formatQty(q: number, unit?: string): string {
  if (unit && METRIC.has(unit)) {
    if (q >= 10) return String(Math.round(q));
    return String(Math.round(q * 10) / 10);
  }
  if (unit && SPOON.has(unit)) return fraction(q, [2, 4, 8]);
  if (unit && MEASURE.has(unit)) return fraction(q, [2, 3, 4]);
  if (q >= 10) return String(Math.round(q));
  return fraction(q, [2, 3, 4, 6, 8]);
}

export function formatUnit(q: number, unit?: string): string {
  if (!unit) return '';
  if (unit === 'cup') return q > 1 ? 'cups' : 'cup';
  return unit;
}

/** "2 tbsp", "½", "450 g"; empty when the ingredient has no quantity. */
export function amount(qty: number | undefined, unit: string | undefined, scale = 1): string {
  if (qty === undefined) return '';
  const q = qty * scale;
  const u = formatUnit(q, unit);
  return u ? `${formatQty(q, unit)} ${u}` : formatQty(q, unit);
}

export type Ingredient = { id: string; qty?: number; unit?: string; name: string; note?: string };

export type Segment = { kind: 'text'; text: string } | { kind: 'ref'; id: string; label?: string };

/** Split step text on {id} and {id|label} references. */
export function parseStep(text: string): Segment[] {
  const out: Segment[] = [];
  const re = /\{([a-z0-9-]+)(?:\|([^}]*))?\}/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) out.push({ kind: 'text', text: text.slice(last, m.index) });
    out.push({ kind: 'ref', id: m[1], label: m[2] });
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push({ kind: 'text', text: text.slice(last) });
  return out;
}

export function refIds(text: string): string[] {
  return [...new Set(parseStep(text).flatMap((s) => (s.kind === 'ref' ? [s.id] : [])))];
}

/** Minutes to a short label: "45 min", "1 h 45", "14 h", "2 days". */
export function minutes(m: number): string {
  if (m < 60) return `${m} min`;
  if (m >= 1440) return `${Math.round(m / 1440)} days`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} h ${String(r).padStart(2, '0')}` : `${h} h`;
}

/** Seconds to a timer label: "90 sec", "15 min", "1 h 30 min". */
export function seconds(s: number): string {
  if (s < 120 && s % 60) return `${s} sec`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}

/** Countdown face: "4:05", "1:02:09". */
export function clock(s: number): string {
  const sign = s < 0 ? '+' : '';
  s = Math.abs(Math.round(s));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h ? `${sign}${h}:${String(m).padStart(2, '0')}:${sec}` : `${sign}${m}:${sec}`;
}

export function isoDuration(m: number): string {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return `PT${h ? `${h}H` : ''}${r || !h ? `${r}M` : ''}`;
}

/** Fold accents so "jiaozi" finds "Jiǎozi". */
export function fold(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
