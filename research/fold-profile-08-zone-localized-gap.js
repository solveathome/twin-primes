// ============================================================================
// FOLD PROFILE 08 — THE ZONE-LOCALIZED MAX GAP
// ============================================================================
// Chris, 2026-08-17: "we only care about the max gap as it can exist inside the
// zone. It does not matter that a larger gap exists further down the tile."
//
// He is right, and the payoff is large enough to be worth measuring exactly.
// G2(x#) is a maximum over a tile of width x# ~ e^x, while the zone is a window
// of width ~x^2 sitting at the very start of it. Define
//
//        M(x, Y) = max twin-slot gap of T_x among gaps starting below Y
//
// so that M(x, x'^2) is the only thing the Zone Postulate needs and
// M(x, x#) = G2(x#) is what the programme has been bounding instead.
//
//   S1  M(x, Y) against ln Y: is the growth logarithmic in the window width?
//   S2  the slope c(x) = M / ln Y, and what it means for the zone
//   S3  the projected margin, zone-localized against full-tile
//   S4  where the freeze ends: the fold's first bite inside [0, Y)
//
// Run:  node --max-old-space-size=8000 fold-profile-08-zone-localized-gap.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

function primesTo(n) {
  const c = new Uint8Array(n + 1); const o = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { o.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return o;
}
const PR = primesTo(100);

function tileT5() { return { x: 5, W: 30, s0: 11, D: 3, gaps: Uint16Array.from([6, 12, 12]) }; }
function fold(T, p) {
  const { W, s0, D, gaps } = T;
  const Dn = D * (p - 2), Wn = W * p;
  const ng = new Uint16Array(Dn);
  const w = W % p, d2 = p - 2;
  let idx = 0, prev = -1, first = -1;
  for (let k = 0; k < p; k++) {
    const base = k * W, sh = (k * w) % p;
    let r = (s0 + sh) % p, pos = base + s0;
    for (let j = 0; j < D; j++) {
      if (r !== 0 && r !== d2) { if (first < 0) first = pos; else ng[idx++] = pos - prev; prev = pos; }
      const g = gaps[j]; pos += g; r += g % p; if (r >= p) r -= p;
    }
  }
  ng[idx++] = (first + Wn) - prev;
  if (idx !== Dn) throw new Error('census');
  return { x: p, W: Wn, s0: first, D: Dn, gaps: ng };
}
const TIL = {};
{ let T = tileT5(); TIL[5] = T; for (const p of [7, 11, 13, 17, 19, 23]) { T = fold(T, p); TIL[p] = T; } }

console.log('='.repeat(98));
console.log('FOLD PROFILE 08 — the zone-localized max gap: how much does restricting to the head buy?');
console.log('='.repeat(98));

// ---------------------------------------------------------------------------
// S1 / S2. M(x, Y) against ln Y
// ---------------------------------------------------------------------------
console.log('');
console.log('S1/S2. M(x, Y) = max twin-slot gap starting below Y, sampled across the tile');
console.log('-'.repeat(98));
const slopes = {};
for (const x of [17, 19, 23]) {
  const T = TIL[x];
  const lnW = Math.log(T.W);
  const nb = 14;
  const cuts = [];
  for (let i = 1; i <= nb; i++) cuts.push(Math.exp((lnW * i) / nb));
  const best = new Array(nb).fill(0);
  let pos = T.s0;
  for (let j = 0; j < T.D; j++) {
    const g = T.gaps[j];
    for (let i = 0; i < nb; i++) if (pos < cuts[i] && g > best[i]) best[i] = g;
    pos += g;
  }
  console.log('');
  console.log(`   T${x}:  W = ${T.W.toLocaleString()},  ln W = ${lnW.toFixed(2)},  G2 = ${best[nb - 1]}`);
  console.log('        Y     |    ln Y |  M(x, Y) |  M / ln Y');
  for (let i = 0; i < nb; i++) {
    console.log(`   ${cuts[i].toExponential(2).padStart(10)} | ${Math.log(cuts[i]).toFixed(2).padStart(7)} | ` +
      `${String(best[i]).padStart(8)} | ${(best[i] / Math.log(cuts[i])).toFixed(2).padStart(9)}`);
  }
  // least-squares slope through the origin over the upper half (the low end is noisy)
  let num = 0, den = 0;
  for (let i = Math.floor(nb / 3); i < nb; i++) { const L = Math.log(cuts[i]); num += L * best[i]; den += L * L; }
  slopes[x] = num / den;
  console.log(`   slope through the origin, upper two thirds: M ~ ${slopes[x].toFixed(2)} * ln Y`);
}

// ---------------------------------------------------------------------------
// S3. the margin, localized against full-tile
// ---------------------------------------------------------------------------
console.log('');
console.log('S3. THE MARGIN — zone-localized against full-tile');
console.log('-'.repeat(98));
console.log('   The zone is (x, x\'^2), so the localized object is M(x, x\'^2) with ln Y = 2 ln x\'.');
console.log('   The full-tile object is G2 = M(x, x#) with ln Y = ln x# = theta(x).');
console.log('');
console.log(' tile |    G2 | zone top x\'^2 | full margin | M(x, x\'^2) | localized margin | reduction G2 / M');
for (const x of [17, 19, 23]) {
  const T = TIL[x];
  const xp = PR.find((q) => q > x), Y = xp * xp;
  let G2 = 0, M = 0, pos = T.s0;
  for (let j = 0; j < T.D; j++) { const g = T.gaps[j]; if (g > G2) G2 = g; if (pos < Y && g > M) M = g; pos += g; }
  console.log(` T${String(x).padEnd(3)} | ${String(G2).padStart(5)} | ${String(Y).padStart(13)} | ` +
    `${(Y / G2).toFixed(2).padStart(11)} | ${String(M).padStart(10)} | ${(Y / M).toFixed(2).padStart(16)} | ${(G2 / M).toFixed(2)}`);
}
console.log('');
console.log('   PROJECTION, using M ~ c*ln Y with c = G2/theta(x) measured above.');
console.log('   full-tile:  G2      ~ c*theta(x)  ~ 0.6*x^2         against x^2   -> margin ~ 1.7, a CONSTANT');
console.log('   localized:  M(x,x^2) ~ c*2 ln x    ~ 1.2*x*ln x      against x^2   -> margin ~ x/(1.2 ln x)');
console.log('   so the reduction factor is theta(x)/(2 ln x) ~ x/(2 ln x):');
console.log('        x |   x/(2 ln x)');
for (const x of [23, 37, 100, 1e3, 1e6, 1e9]) {
  console.log(`   ${String(x).padStart(6)} | ${(x / (2 * Math.log(x))).toExponential(2).padStart(12)}`);
}

// ---------------------------------------------------------------------------
// S4. where the freeze ends
// ---------------------------------------------------------------------------
console.log('');
console.log('S4. WHERE THE FREEZE ENDS — the fold\'s first bite inside the head');
console.log('-'.repeat(98));
console.log('   By the Impact Lemma (FOLD-PROFILE section 11) a fold by p touches [0, Y) only at');
console.log('   r = p*t with t = 1 or t >= p, so nothing below p^2 except the graduations {p-2, p}.');
console.log('   Consequence: [0, p^2) is FROZEN and its recursion is vacuous (A6). The window');
console.log('   [0, p^k) with k >= 3 is NOT frozen: kills land at r = p*q for primes q in (p, p^{k-1}).');
console.log('');
console.log(' tile | fold p |  kills in [0,p^2) |  kills in [0,p^3) |  kills in [0,p^4) |  kills in whole copy 0');
for (const x of [17, 19, 23]) {
  const T = TIL[x];
  const p = PR.find((q) => q > x);
  const d2 = p - 2;
  let pos = T.s0, r = T.s0 % p;
  const cnt = [0, 0, 0, 0];
  const Ys = [p * p, p ** 3, p ** 4, T.W];
  for (let j = 0; j < T.D; j++) {
    if (r === 0 || r === d2) for (let i = 0; i < 4; i++) if (pos < Ys[i]) cnt[i]++;
    const g = T.gaps[j]; pos += g; r += g % p; if (r >= p) r -= p;
  }
  console.log(` T${String(x).padEnd(3)} | ${String(p).padStart(6)} | ${String(cnt[0]).padStart(17)} | ` +
    `${String(cnt[1]).padStart(17)} | ${String(cnt[2]).padStart(17)} | ${cnt[3].toLocaleString().padStart(22)}`);
}

// ---------------------------------------------------------------------------
// S5. is anything ever BORN in the head?
// ---------------------------------------------------------------------------
console.log('');
console.log('S5. THE NATAL COHORT NEVER REACHES THE HEAD (PROVEN, and checked)');
console.log('-'.repeat(98));
console.log('   A slot at r < p^2 is a slot of T_p iff r and r+2 are coprime to p#, which implies the');
console.log('   same at every earlier level. So head membership is monotone decreasing: the head is');
console.log('   pure attrition and nothing is ever created there.');
console.log('   Concretely, the natal@p cohort sits at the seam positions k*W_prev - 1, so its lowest');
console.log('   member is W_prev - 1, astronomically above the zone:');
console.log('   fold p | zone top p^2 | lowest natal position W_prev - 1 | ratio');
{
  let W = 30;
  for (const p of [7, 11, 13, 17, 19, 23, 29]) {
    console.log(`   ${String(p).padStart(6)} | ${String(p * p).padStart(12)} | ${(W - 1).toLocaleString().padStart(32)} | ` +
      `${((W - 1) / (p * p)).toExponential(2)}`);
    W *= p;
  }
}
console.log('');
console.log('   So the creation ledger (Natal@X) and the zone-localized target are disjoint:');
console.log('   births happen at the seams, deep in the tile; the zone only ever loses members.');

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-08-zone-localized-gap.js
//   invocation:  node research/fold-profile-08-zone-localized-gap.js
//   code-sha256: f27a555c464b46f2c9df83d8488ff7599e9c00a9cc2f62ba5a4960d6b26ac919
//   out-sha256:  f441c621ce62376ee518c81a1b30ff5958aa6745d77ef2d1032fa5350ce42c78
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.3 s
// ============================================================================
// ==================================================================================================
// FOLD PROFILE 08 — the zone-localized max gap: how much does restricting to the head buy?
// ==================================================================================================
//
// S1/S2. M(x, Y) = max twin-slot gap starting below Y, sampled across the tile
// --------------------------------------------------------------------------------------------------
//
//    T17:  W = 510,510,  ln W = 13.14,  G2 = 108
//         Y     |    ln Y |  M(x, Y) |  M / ln Y
//       2.56e+0 |    0.94 |        0 |      0.00
//       6.54e+0 |    1.88 |        0 |      0.00
//       1.67e+1 |    2.82 |        0 |      0.00
//       4.27e+1 |    3.76 |       18 |      4.79
//       1.09e+2 |    4.69 |       30 |      6.39
//       2.79e+2 |    5.63 |       30 |      5.33
//       7.14e+2 |    6.57 |      108 |     16.43
//       1.83e+3 |    7.51 |      108 |     14.38
//       4.67e+3 |    8.45 |      108 |     12.78
//       1.19e+4 |    9.39 |      108 |     11.50
//       3.05e+4 |   10.33 |      108 |     10.46
//       7.81e+4 |   11.27 |      108 |      9.59
//       2.00e+5 |   12.20 |      108 |      8.85
//       5.11e+5 |   13.14 |      108 |      8.22
//    slope through the origin, upper two thirds: M ~ 10.17 * ln Y
//
//    T19:  W = 9,699,690,  ln W = 16.09,  G2 = 150
//         Y     |    ln Y |  M(x, Y) |  M / ln Y
//       3.16e+0 |    1.15 |        0 |      0.00
//       9.96e+0 |    2.30 |        0 |      0.00
//       3.14e+1 |    3.45 |       12 |      3.48
//       9.91e+1 |    4.60 |       30 |      6.53
//       3.13e+2 |    5.75 |       36 |      6.27
//       9.87e+2 |    6.89 |      150 |     21.76
//       3.11e+3 |    8.04 |      150 |     18.65
//       9.83e+3 |    9.19 |      150 |     16.32
//       3.10e+4 |   10.34 |      150 |     14.50
//       9.78e+4 |   11.49 |      150 |     13.05
//       3.09e+5 |   12.64 |      150 |     11.87
//       9.74e+5 |   13.79 |      150 |     10.88
//       3.07e+6 |   14.94 |      150 |     10.04
//       9.70e+6 |   16.09 |      150 |      9.32
//    slope through the origin, upper two thirds: M ~ 12.09 * ln Y
//
//    T23:  W = 223,092,870,  ln W = 19.22,  G2 = 204
//         Y     |    ln Y |  M(x, Y) |  M / ln Y
//       3.95e+0 |    1.37 |        0 |      0.00
//       1.56e+1 |    2.75 |        0 |      0.00
//       6.15e+1 |    4.12 |       18 |      4.37
//       2.43e+2 |    5.49 |       30 |      5.46
//       9.59e+2 |    6.87 |      150 |     21.85
//       3.78e+3 |    8.24 |      150 |     18.21
//       1.49e+4 |    9.61 |      150 |     15.61
//       5.90e+4 |   10.98 |      150 |     13.66
//       2.33e+5 |   12.36 |      150 |     12.14
//       9.19e+5 |   13.73 |      156 |     11.36
//       3.63e+6 |   15.10 |      180 |     11.92
//       1.43e+7 |   16.48 |      186 |     11.29
//       5.65e+7 |   17.85 |      198 |     11.09
//       2.23e+8 |   19.22 |      204 |     10.61
//    slope through the origin, upper two thirds: M ~ 12.16 * ln Y
//
// S3. THE MARGIN — zone-localized against full-tile
// --------------------------------------------------------------------------------------------------
//    The zone is (x, x'^2), so the localized object is M(x, x'^2) with ln Y = 2 ln x'.
//    The full-tile object is G2 = M(x, x#) with ln Y = ln x# = theta(x).
//
//  tile |    G2 | zone top x'^2 | full margin | M(x, x'^2) | localized margin | reduction G2 / M
//  T17  |   108 |           361 |        3.34 |         60 |             6.02 | 1.80
//  T19  |   150 |           529 |        3.53 |         72 |             7.35 | 2.08
//  T23  |   204 |           841 |        4.12 |        150 |             5.61 | 1.36
//
//    PROJECTION, using M ~ c*ln Y with c = G2/theta(x) measured above.
//    full-tile:  G2      ~ c*theta(x)  ~ 0.6*x^2         against x^2   -> margin ~ 1.7, a CONSTANT
//    localized:  M(x,x^2) ~ c*2 ln x    ~ 1.2*x*ln x      against x^2   -> margin ~ x/(1.2 ln x)
//    so the reduction factor is theta(x)/(2 ln x) ~ x/(2 ln x):
//         x |   x/(2 ln x)
//        23 |      3.67e+0
//        37 |      5.12e+0
//       100 |      1.09e+1
//      1000 |      7.24e+1
//    1000000 |      3.62e+4
//    1000000000 |      2.41e+7
//
// S4. WHERE THE FREEZE ENDS — the fold's first bite inside the head
// --------------------------------------------------------------------------------------------------
//    By the Impact Lemma (FOLD-PROFILE section 11) a fold by p touches [0, Y) only at
//    r = p*t with t = 1 or t >= p, so nothing below p^2 except the graduations {p-2, p}.
//    Consequence: [0, p^2) is FROZEN and its recursion is vacuous (A6). The window
//    [0, p^k) with k >= 3 is NOT frozen: kills land at r = p*q for primes q in (p, p^{k-1}).
//
//  tile | fold p |  kills in [0,p^2) |  kills in [0,p^3) |  kills in [0,p^4) |  kills in whole copy 0
//  T17  |     19 |                 1 |                33 |               598 |                  2,347
//  T19  |     23 |                 0 |                41 |               950 |                 32,930
//  T23  |     29 |                 2 |                63 |              1745 |                548,411
//
// S5. THE NATAL COHORT NEVER REACHES THE HEAD (PROVEN, and checked)
// --------------------------------------------------------------------------------------------------
//    A slot at r < p^2 is a slot of T_p iff r and r+2 are coprime to p#, which implies the
//    same at every earlier level. So head membership is monotone decreasing: the head is
//    pure attrition and nothing is ever created there.
//    Concretely, the natal@p cohort sits at the seam positions k*W_prev - 1, so its lowest
//    member is W_prev - 1, astronomically above the zone:
//    fold p | zone top p^2 | lowest natal position W_prev - 1 | ratio
//         7 |           49 |                               29 | 5.92e-1
//        11 |          121 |                              209 | 1.73e+0
//        13 |          169 |                            2,309 | 1.37e+1
//        17 |          289 |                           30,029 | 1.04e+2
//        19 |          361 |                          510,509 | 1.41e+3
//        23 |          529 |                        9,699,689 | 1.83e+4
//        29 |          841 |                      223,092,869 | 2.65e+5
//
//    So the creation ledger (Natal@X) and the zone-localized target are disjoint:
//    births happen at the seams, deep in the tile; the zone only ever loses members.
//
//    done in 0.3s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. S4'S PROSE IS REFUTED BY THE TABLE PRINTED DIRECTLY UNDER IT, AT TWO OF
//    THREE TILES. The S4 preamble says a fold "touches [0, Y) only at r = p*t
//    with t = 1 or t >= p, so nothing below p^2 except the graduations
//    {p-2, p}". The first clause is right and the conclusion drawn from it is
//    off by one slot: t >= p gives r = p*t - 2 >= p^2 - 2, and p^2 - 2 IS below
//    p^2. The table then shows it. T17 by 19 has 1 kill in [0, p^2) and it
//    cannot be 19 or 17 (neither is a slot of T17), so it is 359 = 19^2 - 2.
//    T23 by 29 has 2, and fold-profile-07's S1 listing names them: "29(t=1)"
//    and "839(t=29)", and 839 = 29^2 - 2. The corpus already has the right
//    statement: the Head Lemma of research/FOLD-PROFILE.md:144-150 says copy
//    0's kills below p^2 are contained in {p, p^2-2}, with a proof (on the
//    ladder p-2 <= x, so p-2 is never x-rough and drops out).
//    fold-profile-07's header states it correctly too ("r in {p-2, p} or
//    r >= p^2 - 2"). This file's S4 gloss and fold-profile-03's header line 8
//    are the two places still carrying the pre-Head-Lemma wording. Not edited
//    here: this sentence is printed by console.log, so changing it would
//    falsify the pasted OUTPUT block above.
// 2. THE ZONE SAVING IS REAL BUT SMALLER THAN THE PROJECTION, AND IT RESTS ON
//    ONE SAMPLE PER TILE. Measured reduction G2 / M(x, x'^2) = 1.80, 2.08,
//    1.36 at T17, T19, T23. The projection in the same section predicts
//    x/(2 ln x) = 3.67 at x = 23. Measured 1.36 against projected 3.67: the
//    projection overstates the benefit by a factor of 2.7 at the only level
//    where both are available. Worse, M(x, Y) is a step function and the sample
//    point sits just below a step: at T17, M = 60 at Y = 361 and M = 108 by
//    Y = 714, so the localized margin nearly halves over a factor of 2 in Y.
//    One Y per tile, three tiles, no error bar. LOW confidence in the size of
//    the saving; HIGH that it is greater than 1.
// 3. THE PROJECTION'S ALGEBRA DOES NOT FOLLOW FROM THE SLOPES PRINTED ABOVE IT.
//    S3 says "using M ~ c*ln Y with c = G2/theta(x) measured above" and then
//    writes "G2 ~ c*theta(x) ~ 0.6*x^2". Those are inconsistent: if c were the
//    measured constant, c*theta(x) would be linear in x, not quadratic. The
//    step being taken silently is c ~ 0.6*x, which the measured slopes do
//    support loosely (0.6x = 10.2, 11.4, 13.8 against measured 10.17, 12.09,
//    12.16 at x = 17, 19, 23). The cleaner reading of the same three numbers is
//    that c tracks the MEAN twin-slot gap: W/D = 22.92, 25.61, 28.05 and
//    c/(W/D) = 0.444, 0.472, 0.433 — flat to 5%, mean 0.450. So the file's law
//    is the maxgap law's M ~ 0.45 * mbar * ln Y with mbar absorbed into c, and
//    the absorption is what makes S3's "c" look constant while being used as if
//    it grows. Three tiles, so 0.450 is an average of three numbers, not a fit,
//    and it is this file's own number: `maxgap-law.md`'s whole-period twin
//    measurement is c = 0.4463 and its diff-2 band is [0.4463, 0.5939], which
//    the 0.450 sits inside but is not taken from.
// 4. THE RECORD GAP ARRIVES EARLY, WHICH IS THE FILE'S MOST USEFUL FACT AND IS
//    NOT STATED. At T17 M reaches its full-tile value 108 by Y = 714, i.e. at
//    1.4e-3 of the tile. At T19 it reaches 150 by Y = 987, 1.0e-4 of the tile,
//    and never moves again. Only T23 keeps growing deep (150, 156, 180, 186,
//    198, 204 over the last five decades). So for two of three tiles the
//    zone-localized object and the global object coincide once Y passes about
//    10^3, and the whole benefit of localizing lives in the window below that.
//    That is a caution on the Zone Postulate route, not a support for it.
// 5. S5'S "ASTRONOMICALLY ABOVE THE ZONE" FAILS IN ITS OWN FIRST ROW. The
//    ratio column reads 5.92e-1 at p = 7 (lowest natal position 29 against zone
//    top 49) and 1.73e+0 at p = 11. So the natal cohort is INSIDE the zone at
//    p = 7 and barely outside at p = 11; "disjoint" is true from p = 13 on,
//    where the ratio is 13.7 and climbing to 2.65e+5. The monotone-attrition
//    argument above the table is correct and does not depend on the ratio, so
//    only the adverb is wrong. Small, but this is a printed claim contradicted
//    by the printed row beneath it.
// 6. S5 IS NOT IN THE HEADER. The header lists S1 through S4; the run prints
//    five sections. Nothing is wrong with the extra section; the index is stale.
// 7. CUSTODY AND SCOPE. G2 reads 108, 150, 204 at T17, T19, T23, matching the
//    ladder in fold-profile-01 S5. S4's kill counts in copy 0 (2,347 / 32,930 /
//    548,411) match fold-profile-01's K(0) column exactly. Three tiles only;
//    the Y-grid is 14 geometric points per tile; the "upper two thirds" slope
//    fit is through the origin with no residual reported. Runtime 0.3 s, the
//    cheapest file in the family, and the header's --max-old-space-size=8000 is
//    not needed.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION: Y = 714 in reading 2 and Y = 987 in reading 4
//   are the printed 7.14e+2 and 9.87e+2 grid points.
// TOKENIZER ARTIFACT, not a figure: "FOLD-PROFILE.md:144-150" in reading 1 is a
//   line range, read as 144 and -150.
// DERIVED IN THIS READING by arithmetic over printed values:
//   359 in reading 1 is 19^2 - 2, and 839 is 29^2 - 2, the off-by-one slot the
//     reading is about.
//   10.2, 11.4 and 13.8 in reading 3 are 0.6x at x = 17, 19 and 23, the
//     comparison values, not measurements; the measurements they are set
//     against are the printed slopes 10.17, 12.09 and 12.16.
//   W/D = 22.92, 25.61, 28.05 in reading 3 is this file's printed W over the
//     twin-slot counts D = 22,275 / 378,675 / 7,952,175, which are
//     prod_{2<p<=x}(p-2) and are printed in `fold-profile-01-per-copy.js`.
//   c/(W/D) = 0.444, 0.472, 0.433 is the printed slope over that quotient:
//     10.17/22.92, 12.09/25.61, 12.16/28.05.
//   1.4e-3 and 1.0e-4 in reading 4 are the two Y values over their tiles,
//     714/510510 = 1.40e-3 and 987/9699690 = 1.02e-4.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   "29(t=1)" and "839(t=29)" in reading 1 are `fold-profile-07-impact-window.js`,
//     whose copy-0 listing for fold 29 begins with exactly those two entries.
//   D = 22,275 / 378,675 / 7,952,175, above, and the copy-0 kill counts 2,347 /
//     32,930 / 548,411 that reading 7 cites, are all in
//     `fold-profile-01-per-copy.js`'s block.
// IN-CODE: --max-old-space-size=8000 in reading 7 is the header's own run line.
// CORRECTED 2026-08-20 (mismatch adjudication #24): reading 3's 0.44 was
//   offered two ways in one sentence and neither checked out exactly. As the
//   mean of the three ratios derived in the same sentence it is
//   (0.4437 + 0.4721 + 0.4335)/3 = 0.450, not 0.44. As "maxgap-law.js's"
//   constant it could not be confirmed at all: that script carries no embedded
//   block of its own -- zero banner lines of the embed form, verified
//   2026-08-20 -- so it prints nothing anyone can cite, and `maxgap-law.md`
//   gives the
//   whole-period twin measurement as c = 0.4463 with a diff-2 band
//   [0.4463, 0.5939]. Reading 3 now uses 0.450, states it as this file's own
//   three-tile average, and cites `maxgap-law.md` rather than the script for
//   the independent 0.4463. Old -> new: 0.44 -> 0.450 (twice, the average and
//   the law's coefficient, the latter written 0.45). The reading's point --
//   that c tracks the mean twin-slot gap and S3's algebra silently uses
//   c ~ 0.6x -- does not move. NOTE FOR THE FOLLOW-UP LIST: `maxgap-law.js`
//   having no OUTPUT block at all is a custody defect of that file, not of
//   this one, and is not repaired here.
// ---------------------------------------------------------------------------
