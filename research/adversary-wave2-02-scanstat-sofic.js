'use strict';
// ============================================================================
// ADVERSARY WAVE 2 / 02 — THE SCAN-STATISTIC DUALITY AND THE SOFIC RATIO TEST,
// ATTACKED
// (2026-08-19. Refute-first verification of research/history/staging/
//  import-scanstat.md and research/history/staging/import-sofic.md.)
// ============================================================================
// STANCE. Break the two claims, in the places where they are load-bearing.
//
//  (A) THE COMPLEMENTARY-WINDOW DUALITY. Claimed exact and proven. It is exact
//      ONLY on the cyclic word: S_m(i) + S_{D-m}(i+m) = W holds because the two
//      windows partition the cycle. This part builds the tiles from scratch,
//      checks the duality at EVERY m rather than a grid, and then runs the same
//      test on the LINEAR (non-wrapping) window to show the cyclic hypothesis
//      is load-bearing rather than decorative -- because the corpus's live
//      documents (U-FRAME.md section 5a, TODO.md item 0c) state the growth law
//      without the word "cyclic".
//
//  (B) THE T29 BLIND CLAIM. import-scanstat.md says T29 "had never been
//      computed here for any moving-sum statistic". a3-04-maxsum-recursion.js
//      (2026-08-16) and attack-foldL-02-bridge.js (2026-08-19, earlier the same
//      day) both publish maxsum_m(T29) for m = 1..8. This part asks the only
//      question that matters: do those published numbers LEAK the exponent H
//      that the pre-registration predicted?
//
//  (C) THE EXTRAPOLATION RULE. H = 0.2205 + 0.0061 lnD is a three-point OLS
//      extrapolated one level out. This part reports its sensitivity to
//      dropping each point, and its own prediction interval, which the record
//      never quotes: the miss is reported against the MEASUREMENT's standard
//      error, not the PREDICTION's.
//
//  (D) THE SOFIC PRESENTATION. The strictly-sofic argument, checked as an
//      argument and not only at k <= 40; the legal-word count; and the
//      pre-registered ratio test re-run from the cited inputs.
//
//  (E) A AGAINST B. The record kills estimator B at t = 2.69 and calls A flat
//      at t = 1.65 on the same seven points. Those are not independent samples.
//      This part runs the PAIRED test the record does not: the OLS slope of
//      R_A - R_B, whose standard error is the right one for "the two estimators
//      differ in trend".
// ============================================================================

// ------------------------------------------------------------------ tiles --
function primesUpTo(n){ const s = new Uint8Array(n+1), o = []; for (let i = 2; i <= n; i++){ if (!s[i]){ o.push(i); for (let j = i*i; j <= n; j += i) s[j] = 1; } } return o; }
const P = primesUpTo(200);
// twin-slot tile T_x: r in [0,W) with r !== 0 and r !== -2 mod p for every p <= x
function tile(x){
  const ps = P.filter(p => p <= x);
  let W = 1; for (const p of ps) W *= p;
  const bad = new Uint8Array(W);
  for (const p of ps){ for (let j = 0; j < W; j += p) bad[j] = 1;
                       let t = ((p-2) % p + p) % p; for (let j = t; j < W; j += p) bad[j] = 1; }
  const slots = []; for (let r = 0; r < W; r++) if (!bad[r]) slots.push(r);
  return { x, W, slots, D: slots.length };
}
// cyclic moving-sum statistics at window m: max, min, mean, sd, over all D starts
function cyc(T, m){
  const { W, slots, D } = T;
  let mx = -Infinity, mn = Infinity, s = 0, s2 = 0;
  for (let i = 0; i < D; i++){
    const j = i + m, v = (j < D ? slots[j] : slots[j - D] + W) - slots[i];
    if (v > mx) mx = v; if (v < mn) mn = v; s += v; s2 += v*v;
  }
  const mu = s/D;
  return { max: mx, min: mn, mean: mu, sd: Math.sqrt(Math.max(0, s2/D - mu*mu)) };
}
// LINEAR moving sum: windows that do not wrap, i = 0..D-m
function lin(T, m){
  const { slots, D } = T;
  let mx = -Infinity, mn = Infinity, s = 0, s2 = 0, n = 0;
  for (let i = 0; i + m <= D - 1; i++){ const v = slots[i+m] - slots[i]; if (v > mx) mx = v; if (v < mn) mn = v; s += v; s2 += v*v; n++; }
  const mu = s/n;
  return { max: mx, min: mn, sd: Math.sqrt(Math.max(0, s2/n - mu*mu)), n };
}

console.log('=== (A) the complementary-window duality, at every m and on both words ===');
for (const x of [7, 11, 13]){
  const T = tile(x);
  let bad = 0, worstSum = 0, worstSd = 0;
  for (let m = 1; m < T.D; m++){
    const a = cyc(T, m), b = cyc(T, T.D - m);
    const e1 = Math.abs(a.max + b.min - T.W);
    const e2 = Math.abs(a.sd - b.sd)/Math.max(1e-300, a.sd);
    if (e1 > 0) bad++;
    if (e1 > worstSum) worstSum = e1;
    if (e2 > worstSd) worstSd = e2;
  }
  console.log(`  T${String(x).padEnd(3)} W = ${String(T.W).padEnd(7)} D = ${String(T.D).padEnd(6)}  m = 1..D-1 (${T.D-1} values, not a grid)`);
  console.log(`      max_m + min_{D-m} = W: exact at ${T.D-1-bad} of ${T.D-1}; worst deviation ${worstSum} (integers, so 0 means identical)`);
  console.log(`      sd_m = sd_{D-m}: worst relative difference ${worstSd.toExponential(3)}`);
}
{
  const T = tile(13);
  let peak = 0, pm = 0;
  for (let m = 1; m < T.D; m++){ const v = cyc(T, m).sd; if (v > peak){ peak = v; pm = m; } }
  console.log(`  T13: sd peaks at m = ${pm} (D/2 = ${T.D/2}), at ${(peak/cyc(T,1).sd).toFixed(3)} times sd_1; maxsum_{D-1} = ${cyc(T, T.D-1).max} = W - ${T.W - cyc(T, T.D-1).max}`);
}
console.log('  the same test on the LINEAR (non-wrapping) window, T13:');
{
  const T = tile(13);
  let bad = 0, worst = 0;
  for (let m = 1; m < T.D - 1; m++){
    const e = Math.abs(lin(T, m).max + lin(T, T.D - 1 - m).min - T.W);
    if (e > 0) bad++; if (e > worst) worst = e;
  }
  console.log(`    max_m + min_{D-1-m} = W fails at ${bad} of ${T.D-2} values of m; worst deviation ${worst}`);
  console.log('    VERDICT A: the duality is a theorem, and it is a theorem ABOUT THE CYCLIC WORD.');
  console.log('    Every producer in the corpus forms the window cyclically; the live documents');
  console.log('    that state the growth law do not say so, and the duality is false without it.');
}
console.log('  independent anchor: maxsum_1 must be G2(x#).');
{
  const G2 = { 7:30, 11:42, 13:66, 17:108 };      // exact-g2-ladder.js reading 1
  for (const x of [7, 11, 13, 17]){ const T = tile(x);
    console.log(`    T${String(x).padEnd(3)} maxsum_1 = ${String(cyc(T,1).max).padEnd(4)} G2(${x}#) = ${String(G2[x]).padEnd(4)} match: ${cyc(T,1).max === G2[x]}   D = ${String(T.D).padEnd(6)} W = ${T.W}`); }
}

// --------------------------------------------------------------------------
console.log('\n=== (B) does the already-published T29 maxsum row leak the exponent? ===');
{
  const W = 6469693230, D = 214708725, mbar = W/D, rt = Math.sqrt(2*Math.log(D));
  // a3-04-maxsum-recursion.js (2026-08-16) and attack-foldL-02-bridge.js (2026-08-19 14:42)
  const pub = { 1:258, 2:330, 3:390, 4:420, 5:510, 6:540, 7:552, 8:582 };
  const grid = [1,2,3,4,6,8];
  console.log(`  mbar = ${mbar.toFixed(5)}, sqrt(2 lnD) = ${rt.toFixed(4)}`);
  const xs = [], ys = [];
  for (const m of grid){ const ex = pub[m] - m*mbar, sd = ex/rt; xs.push(Math.log(m)); ys.push(Math.log(sd));
    console.log(`    m = ${String(m).padEnd(2)} maxsum = ${pub[m]}  excess = ${ex.toFixed(2)}  implied sd = ${sd.toFixed(3)}`); }
  const f = ols(xs, ys);
  console.log(`  exponent recoverable from the published row: ${f.b.toFixed(4)} +/- ${f.se.toFixed(4)}`);
  console.log(`  the exponent actually measured at T29 (grid to m = 64):  0.3367 +/- 0.0080`);
  console.log(`  the exponent pre-registered for T29:                     0.3383`);
  console.log('  VERDICT B: the published row does NOT leak H -- the back-out is biased by the');
  console.log('  very tail factor the record shows is not sqrt(2 lnD), and lands 0.13 away. So');
  console.log('  the BLINDNESS OF H survives. What does not survive is the sentence: T29 maxsums');
  console.log('  m = 1..8 were in the corpus three days earlier and again five hours earlier, and');
  console.log('  maxsum_1 = 258 is therefore a reproduction, not an independent anchor.');
}

// --------------------------------------------------------------------------
function ols(x, y){
  const n = x.length, mx = x.reduce((a,b)=>a+b,0)/n, my = y.reduce((a,b)=>a+b,0)/n;
  let sxy = 0, sxx = 0; for (let i = 0; i < n; i++){ sxy += (x[i]-mx)*(y[i]-my); sxx += (x[i]-mx)**2; }
  const b = sxy/sxx, a = my - b*mx;
  let ss = 0; for (let i = 0; i < n; i++){ const r = y[i] - (a + b*x[i]); ss += r*r; }
  const s2 = n > 2 ? ss/(n-2) : NaN;
  return { a, b, se: Math.sqrt(s2/sxx), t: b/Math.sqrt(s2/sxx), sig: Math.sqrt(s2), mx, sxx, n };
}

console.log('\n=== (C) the extrapolation rule: sensitivity and its own prediction interval ===');
{
  const D = { 13:1485, 17:22275, 19:378675, 23:7952175, 29:214708725 };
  const H = { 13:0.2661, 17:0.2804, 19:0.3001, 23:0.3216, 29:0.3367 };
  const lnD = (l) => Math.log(D[l]);
  const tgt = lnD(29);
  const sets = { 'T13,T17,T19  (the pre-registered fit)':[13,17,19], 'T17,T19      (drop T13)':[17,19],
                 'T13,T17      (drop T19)':[13,17], 'T13,T19      (drop T17)':[13,19] };
  for (const [k, s] of Object.entries(sets)){
    const f = ols(s.map(lnD), s.map(l => H[l])), pred = f.a + f.b*tgt;
    console.log(`  ${k.padEnd(38)} H* = ${pred.toFixed(4)}   miss vs 0.3367 = ${(pred-0.3367>=0?'+':'')+(pred-0.3367).toFixed(4)} = ${((pred-0.3367)/0.0080).toFixed(2)} measurement s.e.`);
  }
  const f = ols([13,17,19].map(lnD), [13,17,19].map(l => H[l]));
  const seFit = f.sig*Math.sqrt(1/3 + (tgt - f.mx)**2/f.sxx);
  console.log(`  the fit's OWN uncertainty at T29: residual sigma ${f.sig.toExponential(3)} on 1 degree of freedom,`);
  console.log(`  SE of the extrapolated mean ${seFit.toFixed(4)}; 95% band (t_1 = 12.706) = [${(f.a+f.b*tgt-12.706*seFit).toFixed(3)}, ${(f.a+f.b*tgt+12.706*seFit).toFixed(3)}]`);
  console.log('  VERDICT C: the kill criterion (A beats B on ln-RMS of excess_m) is passed, and');
  console.log('  Model B\'s H = 0.5 is outside the band, so the REFUTATION of sqrt(m) is sound.');
  console.log('  But "predicted to within a fifth of a standard error" prices the wrong error:');
  console.log('  on 1 residual degree of freedom the rule could not have been falsified by any H');
  console.log('  in [0.28, 0.40], and dropping T13 alone moves the prediction to 0.94 s.e.');
}

// --------------------------------------------------------------------------
console.log('\n=== (D) the sofic presentation and the pre-registered ratio test ===');
// states Z (r = 0 mod p) and M (r = -2 mod p); letters 0, -2, +2
const STEP = { Z: { '0':'Z', '-2':'M' }, M: { '0':'M', '2':'Z' } };
function accepts(word){ return ['Z','M'].some(s0 => { let s = s0; for (const c of word){ const n = STEP[s][c]; if (!n) return false; s = n; } return true; }); }
{
  let ok = true, kmax = 400;
  for (let k = 0; k <= kmax; k++){
    const zeros = Array(k).fill('0');
    const whole1 = ['-2', ...zeros, '-2'], whole2 = ['2', ...zeros, '2'];
    const halfA = ['-2', ...zeros], halfB = [...zeros, '-2'];
    const halfC = ['2', ...zeros], halfD = [...zeros, '2'];
    if (accepts(whole1) || accepts(whole2)) ok = false;
    if (!accepts(halfA) || !accepts(halfB) || !accepts(halfC) || !accepts(halfD)) ok = false;
  }
  console.log(`  for every k = 0..${kmax}: (-2)0^k(-2) and (+2)0^k(+2) rejected, all four halves accepted: ${ok}`);
  console.log('  the general argument, and it is complete: an M-step SFT forbids only words of');
  console.log('  length <= M+1. Take w = (-2)0^M(-2), of length M+2. Its ONLY two subwords of');
  console.log('  length M+1 are (-2)0^M and 0^M(-2), both legal, so any M-step SFT containing');
  console.log('  the language contains w -- which the language does not. True for every M, so');
  console.log('  the shift is sofic and not of finite type. STRICTLY SOFIC: the argument holds.');
  const counts = [];
  for (let n = 1; n <= 12; n++){
    let c = 0; const rec = (w) => { if (w.length === n){ if (accepts(w)) c++; return; } for (const l of ['0','-2','2']) rec([...w, l]); };
    rec([]); counts.push(c);
  }
  console.log(`  legal words of length 1..12: ${counts.join(', ')}`);
  console.log(`  closed form 2^{n+1} - 1:     ${counts.map((_,i)=>Math.pow(2,i+2)-1).join(', ')}   match: ${counts.every((c,i)=>c===Math.pow(2,i+2)-1)}`);
}
{
  const FOLD = [7,11,13,17,19,23,29,31,37];
  const DD    = { 7:3, 11:15, 13:135, 17:1485, 19:22275, 23:378675, 29:7952175, 31:214708725, 37:6226553025 };
  const PAIRS = { 7:2, 11:0, 13:6, 17:72, 19:1088, 23:11870, 29:243822, 31:8025014, 37:114874436 };
  const LEX   = { 7:2, 11:1, 13:2, 17:2, 19:2, 23:3, 29:2, 31:4, 37:4 };
  const LA = (p) => Math.log(p*DD[p])/Math.log(p/2);
  const LB = (p) => Math.log(DD[p])/Math.log(p/3);
  const LC = (p) => { const fe = PAIRS[p]/(2*DD[p]); return fe > 0 ? 1 + Math.log(2*DD[p])/Math.log(1/fe) : 1; };
  const EXCL = new Set([11, 29]);          // declared in the pre-registration
  console.log('  estimator          set    n   mean R    slope on ln p     SE       t      by the prereg rule (|t| > 2)');
  const keep = {};
  for (const [nm, fn] of [['A  ln(pD)/ln(p/2)', LA], ['B  lnD/ln(p/3)  ', LB], ['C  measured edge', LC]]){
    for (const [tag, set] of [['nine', FOLD], ['seven', FOLD.filter(p => !EXCL.has(p))]]){
      const R = set.map(p => fn(p)/LEX[p]), lp = set.map(p => Math.log(p));
      const f = ols(lp, R), mean = R.reduce((a,b)=>a+b,0)/R.length;
      if (tag === 'seven') keep[nm[0]] = { R, lp };
      console.log(`  ${nm}  ${tag.padEnd(6)}${String(set.length).padStart(2)}   ${mean.toFixed(4)}    ${f.b.toFixed(4).padStart(8)}   ${f.se.toFixed(4)}  ${f.t.toFixed(3).padStart(6)}    ${Math.abs(f.t) > 2 ? 'KILL' : 'flat'}`);
    }
  }
  // (E) the paired test the record does not run
  console.log('\n=== (E) A against B: the paired test ===');
  const dif = keep.A.R.map((v, i) => v - keep.B.R[i]);
  const fd = ols(keep.A.lp, dif);
  console.log(`  slope of (R_A - R_B) on ln p over the seven folds: ${fd.b.toFixed(4)} +/- ${fd.se.toFixed(4)}, t = ${fd.t.toFixed(3)}`);
  console.log(`  B's slope 0.8880 lies inside A's own 95% interval (5 df, t = 2.571):`);
  {
    const fa = ols(keep.A.lp, keep.A.R);
    console.log(`    A: ${fa.b.toFixed(4)} +/- ${fa.se.toFixed(4)}  ->  [${(fa.b-2.571*fa.se).toFixed(4)}, ${(fa.b+2.571*fa.se).toFixed(4)}]  contains 0.8880: ${(fa.b-2.571*fa.se) < 0.8880 && 0.8880 < (fa.b+2.571*fa.se)}`);
  }
  console.log('  VERDICT E: the split SURVIVES the paired test, which is stronger than the record');
  console.log('  claims for it -- the trend difference between A and B is not a coincidence of two');
  console.log('  marginal t values. What does not survive is reading "flat" as "shown flat": A\'s');
  console.log('  own interval [-0.297, 1.355] contains B\'s slope, so the seven points cannot');
  console.log('  exclude B\'s drift FROM A. A is unrefuted, not confirmed, and the record\'s own');
  console.log('  A/B -> 1 by fold 37 is the reason: the estimators converge, so the surviving');
  console.log('  flatness is a small-D transient exactly as the record states.');
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/adversary-wave2-02-scanstat-sofic.js
//   invocation:  node research/adversary-wave2-02-scanstat-sofic.js
//   code-sha256: 7f5b6cb3db7ea59702df7208fad4d6dd480d113521ac01b99d43bbdcad4fc73a
//   out-sha256:  224cc5ccb7a6b45b39631cce89e1151f587d9d4e98c4a1c50f7ceedc4ee3dbfc
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.2 s
// ============================================================================
// === (A) the complementary-window duality, at every m and on both words ===
//   T7   W = 210     D = 15      m = 1..D-1 (14 values, not a grid)
//       max_m + min_{D-m} = W: exact at 14 of 14; worst deviation 0 (integers, so 0 means identical)
//       sd_m = sd_{D-m}: worst relative difference 2.830e-14
//   T11  W = 2310    D = 135     m = 1..D-1 (134 values, not a grid)
//       max_m + min_{D-m} = W: exact at 134 of 134; worst deviation 0 (integers, so 0 means identical)
//       sd_m = sd_{D-m}: worst relative difference 7.450e-12
//   T13  W = 30030   D = 1485    m = 1..D-1 (1484 values, not a grid)
//       max_m + min_{D-m} = W: exact at 1484 of 1484; worst deviation 0 (integers, so 0 means identical)
//       sd_m = sd_{D-m}: worst relative difference 1.006e-10
//   T13: sd peaks at m = 742 (D/2 = 742.5), at 3.554 times sd_1; maxsum_{D-1} = 30024 = W - 6
//   the same test on the LINEAR (non-wrapping) window, T13:
//     max_m + min_{D-1-m} = W fails at 1371 of 1483 values of m; worst deviation 114
//     VERDICT A: the duality is a theorem, and it is a theorem ABOUT THE CYCLIC WORD.
//     Every producer in the corpus forms the window cyclically; the live documents
//     that state the growth law do not say so, and the duality is false without it.
//   independent anchor: maxsum_1 must be G2(x#).
//     T7   maxsum_1 = 30   G2(7#) = 30   match: true   D = 15     W = 210
//     T11  maxsum_1 = 42   G2(11#) = 42   match: true   D = 135    W = 2310
//     T13  maxsum_1 = 66   G2(13#) = 66   match: true   D = 1485   W = 30030
//     T17  maxsum_1 = 108  G2(17#) = 108  match: true   D = 22275  W = 510510
//
// === (B) does the already-published T29 maxsum row leak the exponent? ===
//   mbar = 30.13242, sqrt(2 lnD) = 6.1943
//     m = 1  maxsum = 258  excess = 227.87  implied sd = 36.787
//     m = 2  maxsum = 330  excess = 269.74  implied sd = 43.546
//     m = 3  maxsum = 390  excess = 299.60  implied sd = 48.367
//     m = 4  maxsum = 420  excess = 299.47  implied sd = 48.346
//     m = 6  maxsum = 540  excess = 359.21  implied sd = 57.990
//     m = 8  maxsum = 582  excess = 340.94  implied sd = 55.041
//   exponent recoverable from the published row: 0.2100 +/- 0.0274
//   the exponent actually measured at T29 (grid to m = 64):  0.3367 +/- 0.0080
//   the exponent pre-registered for T29:                     0.3383
//   VERDICT B: the published row does NOT leak H -- the back-out is biased by the
//   very tail factor the record shows is not sqrt(2 lnD), and lands 0.13 away. So
//   the BLINDNESS OF H survives. What does not survive is the sentence: T29 maxsums
//   m = 1..8 were in the corpus three days earlier and again five hours earlier, and
//   maxsum_1 = 258 is therefore a reproduction, not an independent anchor.
//
// === (C) the extrapolation rule: sensitivity and its own prediction interval ===
//   T13,T17,T19  (the pre-registered fit)  H* = 0.3383   miss vs 0.3367 = +0.0016 = 0.20 measurement s.e.
//   T17,T19      (drop T13)                H* = 0.3442   miss vs 0.3367 = +0.0075 = 0.94 measurement s.e.
//   T13,T17      (drop T19)                H* = 0.3288   miss vs 0.3367 = -0.0079 = -0.98 measurement s.e.
//   T13,T19      (drop T17)                H* = 0.3390   miss vs 0.3367 = +0.0023 = 0.29 measurement s.e.
//   the fit's OWN uncertainty at T29: residual sigma 1.891e-3 on 1 degree of freedom,
//   SE of the extrapolated mean 0.0045; 95% band (t_1 = 12.706) = [0.281, 0.396]
//   VERDICT C: the kill criterion (A beats B on ln-RMS of excess_m) is passed, and
//   Model B's H = 0.5 is outside the band, so the REFUTATION of sqrt(m) is sound.
//   But "predicted to within a fifth of a standard error" prices the wrong error:
//   on 1 residual degree of freedom the rule could not have been falsified by any H
//   in [0.28, 0.40], and dropping T13 alone moves the prediction to 0.94 s.e.
//
// === (D) the sofic presentation and the pre-registered ratio test ===
//   for every k = 0..400: (-2)0^k(-2) and (+2)0^k(+2) rejected, all four halves accepted: true
//   the general argument, and it is complete: an M-step SFT forbids only words of
//   length <= M+1. Take w = (-2)0^M(-2), of length M+2. Its ONLY two subwords of
//   length M+1 are (-2)0^M and 0^M(-2), both legal, so any M-step SFT containing
//   the language contains w -- which the language does not. True for every M, so
//   the shift is sofic and not of finite type. STRICTLY SOFIC: the argument holds.
//   legal words of length 1..12: 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191
//   closed form 2^{n+1} - 1:     3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191   match: true
//   estimator          set    n   mean R    slope on ln p     SE       t      by the prereg rule (|t| > 2)
//   A  ln(pD)/ln(p/2)  nine   9   2.3931      0.5157   0.4385   1.176    flat
//   A  ln(pD)/ln(p/2)  seven  7   2.1346      0.5292   0.3213   1.647    flat
//   B  lnD/ln(p/3)    nine   9   2.1249      0.9784   0.3828   2.556    KILL
//   B  lnD/ln(p/3)    seven  7   1.9340      0.8880   0.3301   2.690    KILL
//   C  measured edge  nine   9   1.5511      0.4083   0.2609   1.565    flat
//   C  measured edge  seven  7   1.4965      0.1353   0.1721   0.786    flat
//
// === (E) A against B: the paired test ===
//   slope of (R_A - R_B) on ln p over the seven folds: -0.3588 +/- 0.0253, t = -14.184
//   B's slope 0.8880 lies inside A's own 95% interval (5 df, t = 2.571):
//     A: 0.5292 +/- 0.3213  ->  [-0.2969, 1.3553]  contains 0.8880: true
//   VERDICT E: the split SURVIVES the paired test, which is stronger than the record
//   claims for it -- the trend difference between A and B is not a coincidence of two
//   marginal t values. What does not survive is reading "flat" as "shown flat": A's
//   own interval [-0.297, 1.355] contains B's slope, so the seven points cannot
//   exclude B's drift FROM A. A is unrefuted, not confirmed, and the record's own
//   A/B -> 1 by fold 37 is the reason: the estimators converge, so the surviving
//   flatness is a small-D transient exactly as the record states.
// ============================================================================
// READINGS
// B1. THE DUALITY IS A THEOREM, AND EXACT AT EVERY m, NOT ON A GRID. On T7, T11
//   and T13, max_m + min_{D-m} = W holds with integer deviation ZERO at all
//   D-1 values of m, and sd_m = sd_{D-m} to 1.006e-10 at worst. The proof is
//   two windows partition the cycle, so S_m(i) + S_{D-m}(i+m) = W identically,
//   and i -> i+m is a bijection of the cycle. The record's "VERIFIED at fifteen
//   values of m" understates it and miscounts: the producer prints twelve.
// B2. AND IT IS A THEOREM ABOUT THE CYCLIC WORD ONLY. Run the same test on the
//   non-wrapping window and it fails at 1371 of 1483 values of m on T13, worst
//   deviation 114. Every producer in the corpus forms the window cyclically, but
//   the LIVE documents that state the growth law -- U-FRAME.md section 5a and
//   TODO.md item 0c -- do not contain the word. Any edit that carries the
//   duality into the live layer must carry "cyclic" with it or it carries a
//   false statement.
// B3. maxsum_1 = G2 CHECKS INDEPENDENTLY. Tiles built from scratch here return
//   maxsum_1 = 30, 42, 66, 108 at T7, T11, T13, T17, which is exact-g2-ladder's
//   G2(x#) at those levels, with D = 15, 135, 1485, 22275 matching the corpus's
//   slot counts. The tile convention is confirmed.
// B4. THE T29 BLINDNESS CLAIM IS FALSE AS WRITTEN, AND THE EXPONENT IS STILL
//   BLIND. `a3-04-maxsum-recursion.js` (2026-08-16) publishes maxsum_m(T29) for
//   the prereg grid as 258, 330, 390, 420, 540, 582 at m = 1, 2, 3, 4, 6, 8, and
//   `attack-foldL-02-bridge.js` re-verifies m = 1..6 five hours before the
//   scanstat commit. So "T29 had never been computed here for any moving-sum
//   statistic" is not true, and maxsum_1 = 258 is a reproduction rather than an
//   independent anchor. But backing the exponent out of that published row gives
//   0.2100 +/- 0.0274, nowhere near the measured 0.3367, because the tail factor
//   is not sqrt(2 lnD) -- which is the record's own finding. THE BLINDNESS OF H
//   SURVIVES; only the sentence and the anchor claim need correcting.
// B5. THE EXTRAPOLATION IS SOUND AS A KILL AND OVERSOLD AS A PREDICTION. The
//   three-point fit carries ONE residual degree of freedom; its own 95% band at
//   T29 is [0.281, 0.396]. Model B's H = 0.5 is outside it, so the refutation of
//   sqrt(m) is safe. But "predicted to within a fifth of a standard error"
//   prices the miss against the MEASUREMENT's error and not the PREDICTION's,
//   and dropping T13 alone moves the prediction to 0.94 measurement s.e. The
//   claim to make is the kill, not the precision.
// B6. THE SOFIC PRESENTATION IS EXACT AND THE STRICTLY-SOFIC ARGUMENT IS
//   COMPLETE. (-2)0^k(-2) and (+2)0^k(+2) are rejected and all four halves
//   accepted for every k up to 400, and the general argument closes it for every
//   M at once: w = (-2)0^M(-2) has exactly two subwords of length M+1, both
//   legal, so no M-step SFT can exclude it. The legal-word count is
//   2^{n+1} - 1 at n = 1..12, matching the Perron root 2.
// B7. THE RATIO TEST REPRODUCES TO FOUR DECIMALS FROM THE CITED INPUTS. Mean R
//   2.3931 / 2.1346 (A), 2.1249 / 1.9340 (B), 1.5511 / 1.4965 (C) and slopes
//   0.5157, 0.5292, 0.9784, 0.8880, 0.4083, 0.1353 with the record's standard
//   errors and t values. The kill of estimator B fires on both readings.
// B8. THE A/B SPLIT SURVIVES A PAIRED TEST, WHICH IS BETTER THAN THE RECORD
//   CLAIMS. Slope of (R_A - R_B) on ln p is -0.3588 +/- 0.0253, t = -14.184: the
//   two estimators genuinely differ in trend (t = -14.184), so the split is not an
//   artifact of two t values either side of 2. What is NOT established is that A is
//   flat: A's own interval [-0.297, 1.355] contains B's slope, so seven points
//   cannot exclude B's drift from A either. "Flat" here means unrefuted, and the
//   record's own A/B ratio reaching 1 by fold 37 is the reason.
