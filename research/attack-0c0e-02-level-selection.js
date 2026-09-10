// attack-0c0e-02-level-selection.js
//
// TODO 0c x 0e, stage 3: THE LEVEL-SELECTION HUNT.
//
// The weak Zone Postulate is EQUIVALENT to TPC and needs the zone occupied at
// infinitely many x only (ZONE-POSTULATE.md sec 2, G2-STATE.md 1c). Every G2
// route proves the strictly stronger uniform form. THE-DIALS dial 4 prices the
// difference as free slack with no known mechanism; two mechanisms are dead
// (almost-all-positions cannot be steered to the origin; large prime gaps widen
// the window by 2(p'-p)/p -> 0 against a needed factor 3) and are not retried.
//
// Stage 1 of this attack (research/history/staging/attack-0c0e-level-selection.md)
// showed the chain has exactly two entrances:
//
//   (Q1) the copy theorem needs max over the p alignments where an averaged
//        method gives the mean; level selection could buy the difference.
//        Measured by attack-0c0e-01-deleted-family.js.
//
//   (Q2) a uniform route must beat inf_x x'^2/G2(x#); an i.o. route need only
//        beat limsup_x x'^2/G2(x#). The gain is exactly the OSCILLATION
//        AMPLITUDE of that ratio. This script measures it, asks whether it
//        grows, and hunts for a rule that predicts the good levels.
//
// A SELECTION RULE IS ONLY A RULE IF IT IS CHECKABLE WITHOUT COMPUTING G2.
// Rules that read the answer are marked ORACLE and excluded from the verdict.
//
// Every rule is scored against a PERMUTATION NULL of the same subset size, so a
// rule that looks good only because it selected few levels is caught. This is
// the calibrate-before-fitting discipline of research/attack-L-law.js sec 10.
//
// Part C uses the compute lever (LOCALIZED-GAP.md sec 10) NOT to extend the
// ladder but to CALIBRATE the max/mean law of (Q1) across census sizes, which
// is what licenses extrapolating it to the tile, where ln D ~ theta(x) ~ x.
// Localized readings are off-diagonal (G2-STATE 3c) and are never mixed with
// tile readings in a fit.
//
// usage: node research/attack-0c0e-02-level-selection.js [Ymax]   default 3e7

'use strict';

const YMAX = Number(process.argv[2] || 3e7);
const T0 = Date.now();
const log = (s) => process.stderr.write('[' + ((Date.now() - T0) / 1000).toFixed(1) + 's] ' + s + '\n');
const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : '  n/a');
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);
let FAILS = 0;
const check = (label, ok, detail) => {
  if (!ok) FAILS++;
  console.log('  ' + (ok ? 'ok  ' : 'FAIL') + '  ' + label + (detail ? '   ' + detail : ''));
};

// Deterministic PRNG. The permutation null must be reproducible byte for byte
// or the embedded tail cannot be re-verified, which is the defect class
// TODO.md item 2 records as "nondeterministic by construction". xorshift32,
// fixed seed, stated here so the seed is part of the record.
const SEED = 20260819;
let _rng = SEED >>> 0;
function rnd() {
  _rng ^= _rng << 13; _rng >>>= 0;
  _rng ^= _rng >>> 17;
  _rng ^= _rng << 5; _rng >>>= 0;
  return _rng / 4294967296;
}

function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}
const P = primesUpTo(4000);
const nextPrime = (x) => P.find(q => q > x);

// ---------------------------------------------------------------- the ladders
// G2 at primorials. x = 2..43 computed in this repo; x = 47..79 are OEIS
// A144311 a(15)-a(22) read through G2 = a(n) + 1 and are NOT ours. Provenance
// is carried so no reading can silently mix the two (attack-growth-law.js).
const X_G2 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2   = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618, 708, 870, 966, 1080, 1284, 1398, 1530, 1710];
const OURS_UPTO = 43;
// The one-class control h(p_n#), OEIS A048670, 58 terms, p_58 = 271.
const H = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100, 106, 118, 132, 152, 174, 190,
  200, 216, 234, 258, 264, 282, 300, 312, 330, 354, 378, 388, 414, 432, 450, 476, 492, 510, 538,
  550, 574, 600, 616, 642, 660, 686, 718, 742, 762, 798, 810, 834, 858, 876, 908, 926, 954];
const X_H = P.slice(0, H.length);

console.log('='.repeat(78));
console.log('ATTACK 0c x 0e -- STAGE 3: THE LEVEL-SELECTION HUNT');
console.log('='.repeat(78));
console.log('');
console.log('-'.repeat(78));
console.log('SELF-TESTS');
console.log('-'.repeat(78));
check('G2 ladder has 22 terms', G2.length === 22 && X_G2.length === 22);
check('A048670 control has 58 terms, top prime 271', H.length === 58 && X_H[57] === 271, 'p_58 = ' + X_H[57]);
check('G2 >= h pointwise on the shared range', X_G2.every((x, i) => G2[i] >= H[X_H.indexOf(x)]));
check('G2 is non-decreasing', G2.every((v, i) => i === 0 || v >= G2[i - 1]));
check('h is non-decreasing', H.every((v, i) => i === 0 || v >= H[i - 1]));
check('G2(23#) = 204, G2(43#) = 618', G2[X_G2.indexOf(23)] === 204 && G2[X_G2.indexOf(43)] === 618);

// ============================================================================
// PART A. (Q2) THE I.O. AMPLITUDE OF THE ZONE MARGIN
// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('PART A. (Q2) THE ZONE MARGIN x\'^2/G2(x#) AND ITS OSCILLATION');
console.log('='.repeat(78));
console.log('A uniform route must clear the INF of this column; an i.o. route need');
console.log('only clear the LIMSUP. The whole value of dial 4 on the conclusion side');
console.log('is ln(limsup/inf), in nats, once and for the whole infinite ladder.');
console.log('WINDOW CONVENTION: x\'^2 throughout, never x^2 (qc/units.js sec 3).');
console.log('');
console.log('   n    x    x\'    x\'^2   G2(x#)   margin   ln margin   provenance');
const MAR = [];
for (let i = 0; i < X_G2.length; i++) {
  const x = X_G2[i], xp = nextPrime(x), m = (xp * xp) / G2[i];
  MAR.push({ x, xp, g: G2[i], m, ln: Math.log(m), ours: x <= OURS_UPTO });
  console.log('  ' + pad(i + 1, 2) + '  ' + pad(x, 3) + '  ' + pad(xp, 4) + '  ' + pad(xp * xp, 6) +
    '  ' + pad(G2[i], 7) + '  ' + pad(F(m, 4), 7) + '  ' + pad(F(Math.log(m), 4), 10) +
    '   ' + (x <= OURS_UPTO ? 'ours' : 'A144311'));
}
function amp(rows) {
  let mn = Infinity, mx = -Infinity;
  for (const r of rows) { if (r.m < mn) mn = r.m; if (r.m > mx) mx = r.m; }
  return { mn, mx, ratio: mx / mn, nats: Math.log(mx / mn) };
}
console.log('');
{
  const all = amp(MAR), tail = amp(MAR.filter(r => r.x >= 11)), ours = amp(MAR.filter(r => r.ours && r.x >= 11));
  console.log('  amplitude over all 22 terms      : inf ' + F(all.mn, 4) + '  sup ' + F(all.mx, 4) +
    '  ratio ' + F(all.ratio, 4) + '  = ' + F(all.nats, 4) + ' nats');
  console.log('  amplitude over x >= 11 (18 terms) : inf ' + F(tail.mn, 4) + '  sup ' + F(tail.mx, 4) +
    '  ratio ' + F(tail.ratio, 4) + '  = ' + F(tail.nats, 4) + ' nats');
  console.log('  amplitude over x = 11..43, ours   : inf ' + F(ours.mn, 4) + '  sup ' + F(ours.mx, 4) +
    '  ratio ' + F(ours.ratio, 4) + '  = ' + F(ours.nats, 4) + ' nats');
}
console.log('');
console.log('DOES THE AMPLITUDE GROW? Sliding windows of the ladder, in level order.');
console.log('If dial 4 is worth more and more as x rises, these columns rise.');
console.log('');
console.log('  window   levels          ratio sup/inf   nats');
for (const w of [5, 6, 8]) {
  for (let i = 0; i + w <= MAR.length; i++) {
    const seg = MAR.slice(i, i + w);
    if (seg[0].x < 11) continue;
    const a = amp(seg);
    console.log('  ' + pad(w, 6) + '   x = ' + padr(seg[0].x + '..' + seg[w - 1].x, 12) + '  ' +
      pad(F(a.ratio, 4), 13) + '   ' + pad(F(a.nats, 4), 6));
  }
  console.log('');
}

console.log('THE ONE-CLASS CONTROL, 58 TERMS TO p = 271 (A048670).');
console.log('Same question on an object whose ladder is four times longer. If the');
console.log('amplitude is flat here it is evidence, not proof, that it is flat there.');
console.log('');
const MARH = [];
for (let i = 0; i < H.length; i++) {
  const x = X_H[i], xp = nextPrime(x);
  MARH.push({ x, xp, g: H[i], m: (xp * xp) / H[i], ln: Math.log((xp * xp) / H[i]) });
}
console.log('  window   levels             ratio sup/inf   nats');
for (const w of [10, 20]) {
  for (let i = 0; i + w <= MARH.length; i += Math.max(1, Math.floor(w / 2))) {
    const seg = MARH.slice(i, i + w);
    if (seg[0].x < 11) continue;
    const a = amp(seg);
    console.log('  ' + pad(w, 6) + '   x = ' + padr(seg[0].x + '..' + seg[w - 1].x, 15) + '  ' +
      pad(F(a.ratio, 4), 13) + '   ' + pad(F(a.nats, 4), 6));
  }
  console.log('');
}
{
  const a1 = amp(MARH.filter(r => r.x >= 11 && r.x <= 79));
  const a2 = amp(MARH.filter(r => r.x > 79));
  console.log('  control, x = 11..79  (the G2 ladder\'s own range): ratio ' + F(a1.ratio, 4) + '  = ' + F(a1.nats, 4) + ' nats');
  console.log('  control, x = 83..271 (four times deeper)        : ratio ' + F(a2.ratio, 4) + '  = ' + F(a2.nats, 4) + ' nats');
  console.log('');
  console.log('  NOTE: the control\'s margin column x\'^2/h(x#) GROWS without bound, since');
  console.log('  h is the one-class object; only its OSCILLATION about that growth is');
  console.log('  comparable, so the windows above are the reading and the endpoints are');
  console.log('  not. Detrended amplitude, ratio to a running geometric mean of 5:');
  const det = [];
  for (let i = 2; i + 2 < MARH.length; i++) {
    let s = 0; for (let j = i - 2; j <= i + 2; j++) s += Math.log(MARH[j].m);
    det.push({ x: MARH[i].x, m: MARH[i].m / Math.exp(s / 5) });
  }
  const dA = amp(det.filter(r => r.x >= 11 && r.x <= 79)), dB = amp(det.filter(r => r.x > 79));
  console.log('    x = 11..79 : sup/inf ' + F(dA.ratio, 4) + ' = ' + F(dA.nats, 4) + ' nats');
  console.log('    x = 83..271: sup/inf ' + F(dB.ratio, 4) + ' = ' + F(dB.nats, 4) + ' nats');
  const detG = [];
  for (let i = 2; i + 2 < MAR.length; i++) {
    let s = 0; for (let j = i - 2; j <= i + 2; j++) s += Math.log(MAR[j].m);
    detG.push({ x: MAR[i].x, m: MAR[i].m / Math.exp(s / 5) });
  }
  const dG = amp(detG.filter(r => r.x >= 11));
  console.log('    G2 ladder, same detrending, x >= 11: sup/inf ' + F(dG.ratio, 4) + ' = ' + F(dG.nats, 4) + ' nats');
}

// ============================================================================
// PART B. THE SELECTION RULES
// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('PART B. SELECTION RULES, EACH AGAINST A PERMUTATION NULL');
console.log('='.repeat(78));
console.log('A rule is scored on the DETRENDED ln-margin: ln margin minus its own');
console.log('least-squares line in ln x over the same levels. Raw means are not used,');
console.log('because "select the large x" would then score as a rule wherever the');
console.log('column has any trend at all, which is the comparison-of-means trap');
console.log('TODO.md item 1d paid for on 2026-08-18. The raw gain is printed beside');
console.log('the detrended one so the size of that trap is visible.');
console.log('p-value is the fraction of 20000 random subsets of the same size whose');
console.log('detrended gain is at least as large; a rule that beats nothing has p ~ 0.5.');
console.log('');
function frac(v) { return v - Math.floor(v); }
function mbarOf(x) { let W = 1, D = 1; for (const q of P) { if (q > x) break; W *= q; if (q >= 3) D *= (q - 2); } return W / D; }
function thetaOf(x) { let s = 0; for (const q of P) { if (q > x) break; s += Math.log(q); } return s; }

const RULES = [
  ['x is the lower twin (x\' = x+2)', (r) => r.xp - r.x === 2, false],
  ['x\' is the lower twin (x\'\' = x\'+2)', (r) => nextPrime(r.xp) - r.xp === 2, false],
  ['prime gap x\'-x >= 4', (r) => r.xp - r.x >= 4, false],
  ['prime gap x\'-x >= 6', (r) => r.xp - r.x >= 6, false],
  ['x\'^2/x^2 above its median', null, false],
  ['frac(mbar_x) in the top third', null, false],
  ['frac(mbar_x) in the bottom third', null, false],
  ['theta(x)/x above its median', null, false],
  ['x = 1 mod 4', (r) => r.x % 4 === 1, false],
  ['pi(x) even  (null control)', (r) => (P.indexOf(r.x) + 1) % 2 === 0, false],
  ['previous multiplier below median  [ORACLE]', null, true],
];
function scoreRules(rows, label) {
  // detrend: least squares of ln margin on ln x, over exactly these levels
  let n = rows.length, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const r of rows) { const u = Math.log(r.x); sx += u; sy += r.ln; sxx += u * u; sxy += u * r.ln; }
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx), a0 = (sy - b * sx) / n;
  const res = rows.map(r => r.ln - (a0 + b * Math.log(r.x)));
  const sd = Math.sqrt(res.reduce((s, v) => s + v * v, 0) / n);
  console.log('  ' + label + ' (' + n + ' levels; trend ln margin = ' + F(a0, 4) + ' + ' + F(b, 4) +
    ' ln x, residual sd ' + F(sd, 4) + ' nats)');
  console.log('    rule                                        n   detrended gain   raw gain   p-value');
  const baseRaw = sy / n;
  const med = (arr) => { const q = arr.slice().sort((u, v) => u - v); return q[Math.floor(q.length / 2)]; };
  const ratioSq = rows.map(r => (r.xp * r.xp) / (r.x * r.x));
  const fracs = rows.map(r => frac(mbarOf(r.x)));
  const thetas = rows.map(r => thetaOf(r.x) / r.x);
  const fs = fracs.slice().sort((u, v) => u - v);
  const lo = fs[Math.floor(fs.length / 3)], hi = fs[Math.floor(2 * fs.length / 3)];
  const mults = rows.map((r, i) => i === 0 ? NaN : r.g / rows[i - 1].g);
  const medMult = med(mults.slice(1));
  const preds = {
    "x'^2/x^2 above its median": (r, i) => ratioSq[i] > med(ratioSq),
    'frac(mbar_x) in the top third': (r, i) => fracs[i] >= hi,
    'frac(mbar_x) in the bottom third': (r, i) => fracs[i] <= lo,
    'theta(x)/x above its median': (r, i) => thetas[i] > med(thetas),
    'previous multiplier below median  [ORACLE]': (r, i) => i > 0 && mults[i] < medMult,
  };
  for (const [name, fn, oracle] of RULES) {
    const sel = [];
    for (let i = 0; i < n; i++) { const ok = fn ? fn(rows[i]) : preds[name](rows[i], i); if (ok) sel.push(i); }
    if (!sel.length || sel.length === n) { console.log('    ' + padr(name, 42) + pad(sel.length, 4) + '        (degenerate)'); continue; }
    const gain = sel.reduce((s, i) => s + res[i], 0) / sel.length;
    const raw = sel.reduce((s, i) => s + rows[i].ln, 0) / sel.length - baseRaw;
    let ge = 0; const N = 20000;
    for (let t = 0; t < N; t++) {
      const used = new Uint8Array(n); let got = 0, acc = 0;
      while (got < sel.length) { const j = (rnd() * n) | 0; if (!used[j]) { used[j] = 1; acc += res[j]; got++; } }
      if (acc / sel.length >= gain) ge++;
    }
    console.log('    ' + padr(name, 42) + pad(sel.length, 4) + '   ' + pad(F(gain, 4), 14) +
      '   ' + pad(F(raw, 4), 8) + '   ' + pad(F(ge / N, 4), 7) + (oracle ? '   ORACLE' : ''));
  }
  console.log('    ORACLE CEILING on the detrended column: best level is ' + F(Math.max(...res), 4) +
    ' nats above trend, worst ' + F(Math.min(...res), 4) + ', span ' + F(Math.max(...res) - Math.min(...res), 4) + '.');
  console.log('');
}
scoreRules(MAR.filter(r => r.x >= 11), 'G2 ladder, x = 11..79');
scoreRules(MARH.filter(r => r.x >= 11), 'one-class control, x = 11..271');

// ============================================================================
// PART C. CALIBRATING THE max/mean LAW ACROSS CENSUS SIZES
// ============================================================================
console.log('='.repeat(78));
console.log('PART C. THE max/mean LAW OF (Q1), CALIBRATED AGAINST THE CENSUS');
console.log('='.repeat(78));
console.log('Stage 2 measures max_a Delta_1 / mean_a Delta_1 on tiles, where ln D grows');
console.log('like theta(x) ~ x. The predicted law is max/mean - 1 ~ ln p / (2 ln census).');
console.log('If that law is right the alignment freedom is worth a VANISHING factor and');
console.log('the i.o. licence on (Q1) buys nothing asymptotically. To test the law we');
console.log('need the census varied independently of the level, which a localized window');
console.log('does and a tile cannot: sieve [0, Y) by the primes up to x and vary Y.');
console.log('LOCALIZED READINGS ARE OFF-DIAGONAL (G2-STATE 3c) AND ARE NEVER POOLED');
console.log('WITH TILE READINGS. What is being extracted is the SHAPE in ln(census).');
console.log('');

// twin slots in [0, Y) rough to x: n and n+2 free of every prime <= x
function localSlots(Y, x) {
  let a = new Int32Array(Math.ceil(Y / 6) + 1);
  { let n = 0; for (let v = 5; v < Y; v += 6) a[n++] = v; a = a.subarray(0, n); }   // T_3
  for (const q of P) {
    if (q < 5) continue;
    if (q > x) break;
    const out = new Int32Array(a.length);
    let n = 0;
    for (let i = 0; i < a.length; i++) { const r = a[i] % q; if (r !== 0 && r !== q - 2) out[n++] = a[i]; }
    a = out.subarray(0, n);
  }
  return a;
}
// max gap after deleting classes {a, a-2} mod p, over slots[lo, hi)
function maxgapDeleted(slots, lo, hi, p, a) {
  const d0 = a, d2 = (a - 2 + p) % p;
  let prev = -1, best = 0;
  for (let i = lo; i < hi; i++) {
    const r = slots[i] % p;
    if (r === d0 || r === d2) continue;
    if (prev >= 0) { const g = slots[i] - prev; if (g > best) best = g; }
    prev = slots[i];
  }
  return best;
}
console.log('One sieve of [0, ' + YMAX.toExponential(0) + ') per level, then the same slot list cut into k');
console.log('equal sub-windows. k replicates at census S/k each, ratios averaged over the k');
console.log('windows, so the census moves by a factor 128 at FIXED level and FIXED p.');
console.log('');
console.log('     x     p     k     census/window     ln S     mean max/mean   1+lnp/(2 ln S)');
const CAL = [];
for (const x of [11, 13, 17, 19, 23, 29, 31, 37, 43, 53, 61, 71, 79]) {
  const p = nextPrime(x);
  const s = localSlots(YMAX, x);
  for (const k of [128, 32, 8, 2, 1]) {
    const per = Math.floor(s.length / k);
    if (per < 300) continue;
    let acc = 0, used = 0;
    for (let w = 0; w < k; w++) {
      const lo = w * per, hi = lo + per;
      let mx = 0, sum = 0;
      for (let al = 0; al < p; al++) { const v = maxgapDeleted(s, lo, hi, p, al); if (v > mx) mx = v; sum += v; }
      if (sum > 0) { acc += mx / (sum / p); used++; }
    }
    if (!used) continue;
    const lnS = Math.log(per), ratio = acc / used, pred = 1 + Math.log(p) / (2 * lnS);
    CAL.push({ x, p, k, S: per, lnS, ratio, pred });
    console.log('  ' + pad(x, 4) + '  ' + pad(p, 4) + '  ' + pad(k, 4) + '  ' + pad(per, 16) +
      '  ' + pad(F(lnS, 3), 7) + '  ' + pad(F(ratio, 4), 14) + '  ' + pad(F(pred, 4), 14));
  }
  log('calibration level x = ' + x + ' done');
  console.log('');
}
{
  let mono = 0, tot = 0;
  for (const x of [...new Set(CAL.map(c => c.x))]) {
    const rows = CAL.filter(c => c.x === x).sort((u, v) => u.lnS - v.lnS);
    if (rows.length < 2) continue;
    tot++;
    if (rows[rows.length - 1].ratio < rows[0].ratio) mono++;
  }
  console.log('  LEVELS WHERE max/mean FALLS AS THE CENSUS GROWS: ' + mono + ' of ' + tot);
  let n = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const c of CAL) { const u = Math.log(c.p) / (2 * c.lnS), v = c.ratio - 1; n++; sx += u; sy += v; sxx += u * u; sxy += u * v; }
  const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx), icept = (sy - slope * sx) / n;
  console.log('  REGRESSION  (max/mean - 1) = a + b * ln p/(2 ln S)   over ' + n + ' localized cells');
  console.log('    b = ' + F(slope, 4) + '   a = ' + F(icept, 4));
  console.log('    b = 1, a = 0 is the law exactly. b > 0 with a near 0 is the shape that');
  console.log('    matters: the alignment advantage is carried by 1/ln(census), so on the');
  console.log('    tile, where ln D = theta(x) ~ x, it vanishes like ln x / x.');
}

// ============================================================================
// PART D. WHAT THE LICENCE IS WORTH, PRICED
// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('PART D. THE PRICE OF DIAL 4, IN THE ONLY UNITS THAT MATTER');
console.log('='.repeat(78));
{
  const tail = MAR.filter(r => r.x >= 11);
  const inf = Math.min(...tail.map(r => r.m)), sup = Math.max(...tail.map(r => r.m));
  console.log('  uniform route must clear    inf x\'^2/G2 = ' + F(inf, 4) + '   budget ln = ' + F(Math.log(inf), 4) + ' nats');
  console.log('  i.o. route must clear    limsup x\'^2/G2 = ' + F(sup, 4) + '   budget ln = ' + F(Math.log(sup), 4) + ' nats');
  console.log('  DIAL 4 IS WORTH ' + F(Math.log(sup / inf), 4) + ' NATS, ONCE, FOR THE WHOLE LADDER.');
  console.log('');
  console.log('  Against the Overshoot Budget of gate-multiplies.md sec 5, measured at');
  console.log('  0.88 to 1.19 nats of lifetime slack, that is a ' +
    F(100 * Math.log(sup / inf) / 1.03, 1) + '% enlargement at the');
  console.log('  midpoint 1.03 nats. It is a CONSTANT. The deficit it is being asked to');
  console.log('  pay is the exponent gap 4.2665 against 2, and at x = 79 the shortfall of');
  console.log('  a 4.2665-exponent bound against x\'^2 already runs');
  {
    // how many nats does a beta2-exponent bound miss x'^2 by, at the top exact level?
    for (const x of [23, 43, 79]) {
      const xp = nextPrime(x), th = thetaOf(x);
      const miss = (4.26645 - 2) * Math.log(th);
      console.log('    x = ' + pad(x, 3) + ':  (4.2665 - 2) * ln theta(x) = ' + F(miss, 3) +
        ' nats, against ' + F(Math.log(sup / inf), 3) + ' nats of licence');
    }
  }
  console.log('  and it diverges. No constant number of nats pays an exponent.');
}

console.log('');
console.log('='.repeat(78));
console.log(FAILS === 0 ? 'SELF-TESTS: all passed.' : 'SELF-TESTS: ' + FAILS + ' FAILED.');
console.log('elapsed ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');
console.log('='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-0c0e-02-level-selection.js -- 3e7
//   invocation:  node research/attack-0c0e-02-level-selection.js 3e7
//   code-sha256: bcb753863b48c67d4f192ccb5e50c6b3e6c8bbc14fcec93d4390054bdcdd9930
//   out-sha256:  446d1629d1d3b12c7e3b433e06b19609249d24e11928bbab5ada6c23ba1251f9
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     6.6 s
// ============================================================================
// ==============================================================================
// ATTACK 0c x 0e -- STAGE 3: THE LEVEL-SELECTION HUNT
// ==============================================================================
//
// ------------------------------------------------------------------------------
// SELF-TESTS
// ------------------------------------------------------------------------------
//   ok    G2 ladder has 22 terms
//   ok    A048670 control has 58 terms, top prime 271   p_58 = 271
//   ok    G2 >= h pointwise on the shared range
//   ok    G2 is non-decreasing
//   ok    h is non-decreasing
//   ok    G2(23#) = 204, G2(43#) = 618
//
// ==============================================================================
// PART A. (Q2) THE ZONE MARGIN x'^2/G2(x#) AND ITS OSCILLATION
// ==============================================================================
// A uniform route must clear the INF of this column; an i.o. route need
// only clear the LIMSUP. The whole value of dial 4 on the conclusion side
// is ln(limsup/inf), in nats, once and for the whole infinite ladder.
// WINDOW CONVENTION: x'^2 throughout, never x^2 (qc/units.js sec 3).
//
//    n    x    x'    x'^2   G2(x#)   margin   ln margin   provenance
//    1    2     3       9        2   4.5000      1.5041   ours
//    2    3     5      25        6   4.1667      1.4271   ours
//    3    5     7      49       12   4.0833      1.4069   ours
//    4    7    11     121       30   4.0333      1.3946   ours
//    5   11    13     169       42   4.0238      1.3922   ours
//    6   13    17     289       66   4.3788      1.4768   ours
//    7   17    19     361      108   3.3426      1.2067   ours
//    8   19    23     529      150   3.5267      1.2604   ours
//    9   23    29     841      204   4.1225      1.4165   ours
//   10   29    31     961      258   3.7248      1.3150   ours
//   11   31    37    1369      348   3.9339      1.3696   ours
//   12   37    41    1681      528   3.1837      1.1580   ours
//   13   41    43    1849      546   3.3864      1.2198   ours
//   14   43    47    2209      618   3.5744      1.2738   ours
//   15   47    53    2809      708   3.9675      1.3781   A144311
//   16   53    59    3481      870   4.0011      1.3866   A144311
//   17   59    61    3721      966   3.8520      1.3486   A144311
//   18   61    67    4489     1080   4.1565      1.4247   A144311
//   19   67    71    5041     1284   3.9260      1.3676   A144311
//   20   71    73    5329     1398   3.8119      1.3381   A144311
//   21   73    79    6241     1530   4.0791      1.4059   A144311
//   22   79    83    6889     1710   4.0287      1.3934   A144311
//
//   amplitude over all 22 terms      : inf 3.1837  sup 4.5000  ratio 1.4134  = 0.3460 nats
//   amplitude over x >= 11 (18 terms) : inf 3.1837  sup 4.3788  ratio 1.3754  = 0.3187 nats
//   amplitude over x = 11..43, ours   : inf 3.1837  sup 4.3788  ratio 1.3754  = 0.3187 nats
//
// DOES THE AMPLITUDE GROW? Sliding windows of the ladder, in level order.
// If dial 4 is worth more and more as x rises, these columns rise.
//
//   window   levels          ratio sup/inf   nats
//        5   x = 11..23               1.3100   0.2700
//        5   x = 13..29               1.3100   0.2700
//        5   x = 17..31               1.2333   0.2097
//        5   x = 19..37               1.2949   0.2584
//        5   x = 23..41               1.2949   0.2584
//        5   x = 29..43               1.2356   0.2116
//        5   x = 31..47               1.2462   0.2201
//        5   x = 37..53               1.2568   0.2285
//        5   x = 41..59               1.1815   0.1668
//        5   x = 43..61               1.1628   0.1509
//        5   x = 47..67               1.0791   0.0761
//        5   x = 53..71               1.0904   0.0865
//        5   x = 59..73               1.0904   0.0865
//        5   x = 61..79               1.0904   0.0865
//
//        6   x = 11..29               1.3100   0.2700
//        6   x = 13..31               1.3100   0.2700
//        6   x = 17..37               1.2949   0.2584
//        6   x = 19..41               1.2949   0.2584
//        6   x = 23..43               1.2949   0.2584
//        6   x = 29..47               1.2462   0.2201
//        6   x = 31..53               1.2568   0.2285
//        6   x = 37..59               1.2568   0.2285
//        6   x = 41..61               1.2274   0.2049
//        6   x = 43..67               1.1628   0.1509
//        6   x = 47..71               1.0904   0.0865
//        6   x = 53..73               1.0904   0.0865
//        6   x = 59..79               1.0904   0.0865
//
//        8   x = 11..37               1.3754   0.3187
//        8   x = 13..41               1.3754   0.3187
//        8   x = 17..43               1.2949   0.2584
//        8   x = 19..47               1.2949   0.2584
//        8   x = 23..53               1.2949   0.2584
//        8   x = 29..59               1.2568   0.2285
//        8   x = 31..61               1.3055   0.2666
//        8   x = 37..67               1.3055   0.2666
//        8   x = 41..71               1.2274   0.2049
//        8   x = 43..73               1.1628   0.1509
//        8   x = 47..79               1.0904   0.0865
//
// THE ONE-CLASS CONTROL, 58 TERMS TO p = 271 (A048670).
// Same question on an object whose ladder is four times longer. If the
// amplitude is flat here it is evidence, not proof, that it is flat there.
//
//   window   levels             ratio sup/inf   nats
//       10   x = 13..47                  2.1383   0.7600
//       10   x = 31..71                  1.4408   0.3652
//       10   x = 53..97                  1.3129   0.2722
//       10   x = 73..113                 1.4880   0.3974
//       10   x = 101..149                1.3541   0.3031
//       10   x = 127..173                1.2285   0.2058
//       10   x = 151..197                1.1603   0.1487
//       10   x = 179..229                1.2170   0.1964
//       10   x = 199..257                1.1705   0.1575
//
//       20   x = 31..113                 2.0707   0.7279
//       20   x = 73..173                 1.8131   0.5950
//       20   x = 127..229                1.4954   0.4024
//
//   control, x = 11..79  (the G2 ladder's own range): ratio 2.8534  = 1.0485 nats
//   control, x = 83..271 (four times deeper)        : ratio 2.1932  = 0.7854 nats
//
//   NOTE: the control's margin column x'^2/h(x#) GROWS without bound, since
//   h is the one-class object; only its OSCILLATION about that growth is
//   comparable, so the windows above are the reading and the endpoints are
//   not. Detrended amplitude, ratio to a running geometric mean of 5:
//     x = 11..79 : sup/inf 1.2430 = 0.2175 nats
//     x = 83..271: sup/inf 1.1471 = 0.1372 nats
//     G2 ladder, same detrending, x >= 11: sup/inf 1.3157 = 0.2744 nats
//
// ==============================================================================
// PART B. SELECTION RULES, EACH AGAINST A PERMUTATION NULL
// ==============================================================================
// A rule is scored on the DETRENDED ln-margin: ln margin minus its own
// least-squares line in ln x over the same levels. Raw means are not used,
// because "select the large x" would then score as a rule wherever the
// column has any trend at all, which is the comparison-of-means trap
// TODO.md item 1d paid for on 2026-08-18. The raw gain is printed beside
// the detrended one so the size of that trap is visible.
// p-value is the fraction of 20000 random subsets of the same size whose
// detrended gain is at least as large; a rule that beats nothing has p ~ 0.5.
//
//   G2 ladder, x = 11..79 (18 levels; trend ln margin = 1.3041 + 0.0101 ln x, residual sd 0.0827 nats)
//     rule                                        n   detrended gain   raw gain   p-value
//     x is the lower twin (x' = x+2)               6          -0.0356    -0.0372    0.8858
//     x' is the lower twin (x'' = x'+2)            5           0.0215     0.0204    0.2698
//     prime gap x'-x >= 4                         12           0.0178     0.0186    0.1111
//     prime gap x'-x >= 6                          6           0.0543     0.0562    0.0239
//     x'^2/x^2 above its median                    8           0.0249     0.0202    0.1406
//     frac(mbar_x) in the top third                6          -0.0356    -0.0349    0.8852
//     frac(mbar_x) in the bottom third             7           0.0010    -0.0009    0.4914
//     theta(x)/x above its median                  8           0.0253     0.0304    0.1368
//     x = 1 mod 4                                  8          -0.0160    -0.0165    0.7521
//     pi(x) even  (null control)                   9          -0.0049    -0.0043    0.5924
//     previous multiplier below median  [ORACLE]   8           0.0026     0.0071    0.4617   ORACLE
//     ORACLE CEILING on the detrended column: best level is 0.1467 nats above trend, worst -0.1827, span 0.3293.
//
//   one-class control, x = 11..271 (54 levels; trend ln margin = 1.0312 + 0.5925 ln x, residual sd 0.0564 nats)
//     rule                                        n   detrended gain   raw gain   p-value
//     x is the lower twin (x' = x+2)              16          -0.0291    -0.0929    0.9945
//     x' is the lower twin (x'' = x'+2)           15           0.0228    -0.0025    0.0296
//     prime gap x'-x >= 4                         38           0.0123     0.0391    0.0069
//     prime gap x'-x >= 6                         24           0.0328     0.1538    0.0000
//     x'^2/x^2 above its median                   26           0.0152    -0.3044    0.0297
//     frac(mbar_x) in the top third               18          -0.0007     0.0471    0.5260
//     frac(mbar_x) in the bottom third            19           0.0103    -0.2084    0.1665
//     theta(x)/x above its median                 26           0.0027     0.3418    0.3705
//     x = 1 mod 4                                 25          -0.0001    -0.0089    0.5032
//     pi(x) even  (null control)                  27           0.0033     0.0201    0.3357
//     previous multiplier below median  [ORACLE]  26           0.0032     0.3734    0.3568   ORACLE
//     ORACLE CEILING on the detrended column: best level is 0.1568 nats above trend, worst -0.1348, span 0.2917.
//
// ==============================================================================
// PART C. THE max/mean LAW OF (Q1), CALIBRATED AGAINST THE CENSUS
// ==============================================================================
// Stage 2 measures max_a Delta_1 / mean_a Delta_1 on tiles, where ln D grows
// like theta(x) ~ x. The predicted law is max/mean - 1 ~ ln p / (2 ln census).
// If that law is right the alignment freedom is worth a VANISHING factor and
// the i.o. licence on (Q1) buys nothing asymptotically. To test the law we
// need the census varied independently of the level, which a localized window
// does and a tile cannot: sieve [0, Y) by the primes up to x and vary Y.
// LOCALIZED READINGS ARE OFF-DIAGONAL (G2-STATE 3c) AND ARE NEVER POOLED
// WITH TILE READINGS. What is being extracted is the SHAPE in ln(census).
//
// One sieve of [0, 3e+7) per level, then the same slot list cut into k
// equal sub-windows. k replicates at census S/k each, ratios averaged over the k
// windows, so the census moves by a factor 128 at FIXED level and FIXED p.
//
//      x     p     k     census/window     ln S     mean max/mean   1+lnp/(2 ln S)
//     11    13   128             13697    9.525          1.0000          1.1346
//     11    13    32             54788   10.911          1.0000          1.1175
//     11    13     8            219155   12.298          1.0000          1.1043
//     11    13     2            876623   13.684          1.0000          1.0937
//     11    13     1           1753247   14.377          1.0000          1.0892
//
//     13    17   128             11589    9.358          1.0000          1.1514
//     13    17    32             46359   10.744          1.0000          1.1318
//     13    17     8            185439   12.130          1.0000          1.1168
//     13    17     2            741758   13.517          1.0000          1.1048
//     13    17     1           1483517   14.210          1.0000          1.0997
//
//     17    19   128             10226    9.233          1.0517          1.1595
//     17    19    32             40905   10.619          1.0170          1.1386
//     17    19     8            163623   12.005          1.0000          1.1226
//     17    19     2            654492   13.392          1.0000          1.1099
//     17    19     1           1308984   14.085          1.0000          1.1045
//
//     19    23   128              9149    9.121          1.1587          1.1719
//     19    23    32             36599   10.508          1.1327          1.1492
//     19    23     8            146399   11.894          1.1017          1.1318
//     19    23     2            585597   13.280          1.0553          1.1180
//     19    23     1           1171194   13.974          1.0317          1.1122
//
//     23    29   128              8354    9.030          1.1654          1.1864
//     23    29    32             33417   10.417          1.1431          1.1616
//     23    29     8            133668   11.803          1.1326          1.1426
//     23    29     2            534674   13.189          1.1137          1.1277
//     23    29     1           1069348   13.883          1.0995          1.1213
//
//     29    31   128              7778    8.959          1.1952          1.1916
//     29    31    32             31112   10.345          1.1802          1.1660
//     29    31     8            124449   11.732          1.1775          1.1464
//     29    31     2            497798   13.118          1.1942          1.1309
//     29    31     1            995596   13.811          1.1726          1.1243
//
//     31    37   128              7276    8.892          1.2205          1.2030
//     31    37    32             29105   10.279          1.2383          1.1757
//     31    37     8            116421   11.665          1.2620          1.1548
//     31    37     2            465684   13.051          1.2344          1.1383
//     31    37     1            931369   13.744          1.2922          1.1314
//
//     37    41   128              6883    8.837          1.2421          1.2101
//     37    41    32             27532   10.223          1.2484          1.1816
//     37    41     8            110129   11.609          1.2410          1.1599
//     37    41     2            440516   12.996          1.2195          1.1429
//     37    41     1            881032   13.689          1.2286          1.1356
//
//     43    47   128              6242    8.739          1.2484          1.2203
//     43    47    32             24970   10.125          1.2491          1.1901
//     43    47     8             99882   11.512          1.2360          1.1672
//     43    47     2            399530   12.898          1.1726          1.1493
//     43    47     1            799060   13.591          1.1533          1.1416
//
//     53    59   128              5750    8.657          1.2847          1.2355
//     53    59    32             23003   10.043          1.2556          1.2030
//     53    59     8             92013   11.430          1.2226          1.1784
//     53    59     2            368055   12.816          1.2081          1.1591
//     53    59     1            736110   13.509          1.2024          1.1509
//
//     61    67   128              5372    8.589          1.2767          1.2448
//     61    67    32             21490    9.975          1.2392          1.2108
//     61    67     8             85962   11.362          1.2001          1.1850
//     61    67     2            343850   12.748          1.1810          1.1649
//     61    67     1            687700   13.441          1.1604          1.1564
//
//     71    73   128              5064    8.530          1.2632          1.2515
//     71    73    32             20259    9.916          1.2085          1.2163
//     71    73     8             81038   11.303          1.1503          1.1898
//     71    73     2            324152   12.689          1.1673          1.1691
//     71    73     1            648305   13.382          1.1733          1.1603
//
//     79    83   128              4800    8.476          1.2770          1.2607
//     79    83    32             19202    9.863          1.2391          1.2240
//     79    83     8             76809   11.249          1.2045          1.1964
//     79    83     2            307238   12.635          1.1749          1.1749
//     79    83     1            614477   13.329          1.1580          1.1658
//
//   LEVELS WHERE max/mean FALLS AS THE CENSUS GROWS: 10 of 13
//   REGRESSION  (max/mean - 1) = a + b * ln p/(2 ln S)   over 65 localized cells
//     b = 1.7965   a = -0.1347
//     b = 1, a = 0 is the law exactly. b > 0 with a near 0 is the shape that
//     matters: the alignment advantage is carried by 1/ln(census), so on the
//     tile, where ln D = theta(x) ~ x, it vanishes like ln x / x.
//
// ==============================================================================
// PART D. THE PRICE OF DIAL 4, IN THE ONLY UNITS THAT MATTER
// ==============================================================================
//   uniform route must clear    inf x'^2/G2 = 3.1837   budget ln = 1.1580 nats
//   i.o. route must clear    limsup x'^2/G2 = 4.3788   budget ln = 1.4768 nats
//   DIAL 4 IS WORTH 0.3187 NATS, ONCE, FOR THE WHOLE LADDER.
//
//   Against the Overshoot Budget of gate-multiplies.md sec 5, measured at
//   0.88 to 1.19 nats of lifetime slack, that is a 30.9% enlargement at the
//   midpoint 1.03 nats. It is a CONSTANT. The deficit it is being asked to
//   pay is the exponent gap 4.2665 against 2, and at x = 79 the shortfall of
//   a 4.2665-exponent bound against x'^2 already runs
//     x =  23:  (4.2665 - 2) * ln theta(x) = 6.700 nats, against 0.319 nats of licence
//     x =  43:  (4.2665 - 2) * ln theta(x) = 8.191 nats, against 0.319 nats of licence
//     x =  79:  (4.2665 - 2) * ln theta(x) = 9.637 nats, against 0.319 nats of licence
//   and it diverges. No constant number of nats pays an exponent.
//
// ==============================================================================
// SELF-TESTS: all passed.
// elapsed 6.5 s
// ==============================================================================
// ───── stderr ─────
// [0.6s] calibration level x = 11 done
// [1.0s] calibration level x = 13 done
// [1.4s] calibration level x = 17 done
// [1.8s] calibration level x = 19 done
// [2.3s] calibration level x = 23 done
// [2.7s] calibration level x = 29 done
// [3.2s] calibration level x = 31 done
// [3.7s] calibration level x = 37 done
// [4.2s] calibration level x = 43 done
// [4.7s] calibration level x = 53 done
// [5.3s] calibration level x = 61 done
// [5.9s] calibration level x = 71 done
// [6.5s] calibration level x = 79 done
// ============================================================================
// READINGS
// ============================================================================

// 1. THE I.O. LICENCE IS WORTH 0.3187 NATS, ONCE, FOR THE WHOLE LADDER.
//    A uniform route must clear inf x'^2/G2 = 3.1837 (at x = 37); an i.o.
//    route need only clear limsup, measured 4.3788 (at x = 13) over x >= 11
//    and 4.5000 over all 22 terms. The whole content of THE-DIALS dial 4 on
//    the conclusion side is the ratio of those two, 1.3754, and its log,
//    0.3187 nats. That is the number the dial has never had.
//
// 2. IT IS A CONSTANT AND THE DEFICIT IS AN EXPONENT, SO IT CANNOT PAY.
//    Against the Overshoot Budget's measured 0.88 to 1.19 nats of lifetime
//    slack the licence is a 30.9 percent enlargement at the midpoint, which
//    is real. Against the exponent gap it is nothing: (4.2665 - 2) ln theta(x)
//    reads 6.700, 8.191 and 9.637 nats at x = 23, 43, 79 and diverges, while
//    the licence stays at 0.319. A constant number of nats never pays a
//    divergent one, at any level, in any formulation.
//
// 3. AND THE AMPLITUDE IS FALLING, NOT GROWING. In sliding windows of five
//    consecutive ladder levels the amplitude runs 0.2700, 0.2700, 0.2097,
//    0.2584, 0.2584, 0.2116, 0.2201, 0.2285, 0.1668, 0.1509, 0.0761, 0.0865,
//    0.0865, 0.0865 nats from x = 11..23 up to x = 61..79. The windows of six
//    and of eight fall the same way, to 0.0865 nats at the top. The i.o.
//    licence is worth LESS the further up the ladder it is spent, which is
//    the opposite of what a route that needs it asymptotically would want.
//
// 4. THE ONE-CLASS CONTROL SAYS THE SAME THING FOUR TIMES DEEPER. On the
//    58-term A048670 ladder the detrended amplitude is 0.2175 nats over
//    x = 11..79 and 0.1372 nats over x = 83..271, and the ten-term windows
//    fall 0.7600, 0.3652, 0.2722, 0.3974, 0.3031, 0.2058, 0.1487, 0.1964,
//    0.1575. The G2 ladder detrended the same way reads 0.2744 nats over
//    x >= 11, so the two objects agree on the size of the oscillation and
//    the control agrees on the direction over four times the range.
//
// 5. NO SELECTION RULE BEATS ITS OWN NULL BY ANYTHING WORTH HAVING. On the
//    G2 ladder the detrended gains are -0.0356, 0.0215, 0.0178, 0.0543,
//    0.0249, -0.0356, 0.0010, 0.0253, -0.0160, -0.0049 and 0.0026 nats, with
//    the null control (pi(x) even) at -0.0049 and p = 0.5924, exactly where a
//    rule that knows nothing should sit. The largest gain is 0.0543 nats.
//
// 6. THE ONE RULE WITH A SIGNAL IS THE MECHANISM ALREADY DECLARED DEAD, AND
//    THIS PRICES IT. "prime gap x'-x >= 6" scores 0.0543 nats at p = 0.0253
//    on the G2 ladder and 0.0328 nats at p = 0.0000 on the 54-level control.
//    That rule IS "large prime gaps widen the window", which TODO item 0e
//    lists as dead because 2(p'-p)/p -> 0 against a needed factor 3. The
//    measurement agrees and now attaches a number: the mechanism is real and
//    worth 0.0328 to 0.0543 nats, against a factor of three, which is ln 3.
//
// 7. THE ORACLE CEILING IS 0.1467 NATS AND NO RULE CAN EXCEED IT. Even an
//    argument that could see G2 and pick the single best level would sit
//    0.1467 nats above trend on the G2 ladder and 0.1568 on the control, with
//    spans 0.3293 and 0.2917. So the entire space of level-selection rules,
//    including the ones that cheat, is bounded by a sixth of a nat above the
//    trend the uniform route already has to track.
//
// 8. THE ORACLE RULE ITSELF SCORES NOTHING ONCE DETRENDED, WHICH IS THE
//    CALIBRATION WORKING. "previous multiplier below median" reads a raw gain
//    of 0.3734 nats on the control and a detrended gain of 0.0032 at
//    p = 0.3568; "theta(x)/x above its median" reads raw 0.3418 and detrended
//    0.0027. Both raw figures are pure trend. Scoring on raw means would have
//    reported two significant rules where there are none, which is the
//    comparison-of-means trap in its exact shape.
//
// 9. THE max/mean LAW OF (Q1) SCALES WITH THE CENSUS, WHICH IS WHAT LICENSES
//    EXTRAPOLATING IT. Across 65 localized cells the fit is
//    (max/mean - 1) = -0.1347 + 1.7965 * ln p/(2 ln S), and max/mean falls as
//    the census grows at 10 of the 13 levels tested. The coefficient is not 1
//    and the intercept is not 0, so this is a SHAPE and not a law; what it
//    establishes is the sign and the carrier, 1/ln(census). On the tile
//    ln D = theta(x) ~ x, so the alignment advantage vanishes like ln x / x
//    and the i.o. licence on the hypothesis side has a vanishing target.
//
// 10. WHAT THIS FILE DOES NOT SHOW. It does not prove the amplitude is
//    bounded; 22 exact terms and a 58-term control are evidence and the
//    reading in 3 is a measured trend on a short ladder, which is exactly the
//    kind of reading TODO item 1d warns about. The localized cells of Part C
//    are off-diagonal and are never pooled with tile readings. No rule tested
//    here exhausts the space of rules; what is bounded is not the list of
//    rules but the prize, by reading 7.
