// ============================================================================
// IMPORT-THINNING 03 — DOES THE DOMINATION SURVIVE THE LADDER?
// ============================================================================
// FOREIGN-IMPORT ATTACK 3 of 5, 2026-08-19, stage 4. `import-thinning-02-
// coalescence.js` proved the Fold Moment Identity
//     (p-2) Phi_new = (p-4) Phi + Om + 2 Psi + Delta
// and measured, at every fold of the exact ladder 7..29 and every lam tested,
//   (i)  K = Psi/Phi^2 < 1 : adjacent gaps of the tile are NEGATIVELY
//        associated at exponential order, 28 cells out of 28;
//   (ii) c'_min = p (Phi_new - Phi) / (Phi (Phi_new - 1)) < 2 : the true fold
//        is dominated on exponential moments by an INDEPENDENT thinning at a
//        rate strictly better than its own 2/p, 28 cells out of 28.
// A domination that holds at eight folds and then dies is worth nothing, and
// the eight folds available on the exact tile end at 29. This script measures
// c'_min and K in the LOCALIZED frame, where the ladder runs to p = 1499, and
// asks the only question that matters: does 2 - c'_min stay bounded away from
// zero, or does it collapse?
//
// WHY THIS IS THE WHOLE VERDICT. If 2 - c'_min >= delta > 0 uniformly, then
// composing the dominating maps along the ladder (they compose, by the Mobius
// group law of import-thinning-01 Stage A) gives a gap law dominated by the
// GEOMETRIC with mean 6 * prod q/(q - c'), which is strictly lighter than the
// truth's own mbar = 6 * prod q/(q-2), and the induced exponent in theta/mbar
// units is c = 2/c' > 1: a proven one-sided exponential tail, which is exactly
// what H'' asks for and does not have. If instead c'_min -> 2, the domination
// is real at every finite fold and worth nothing in the limit, and the import
// has bought a sharp restatement and no theorem.
//
// THE INSTRUMENT. Conventions verbatim from `attack-foldL-04-localized.js` and
// `attack-foldL-06-scaling.js`: window [0, Y), n = 5 (mod 6), key(n) =
// min{q prime >= 5 : q | n(n+2)}, key 0 for survivors of every fold <= 1499.
// The level-p word is {n : key(n) = 0 or key(n) >= p}. For each measured fold
// the pass builds three INTEGER histograms -- level-p gaps, level-p ADJACENT
// PAIRS (a 2-D histogram, gaps are bounded by G2 so it fits), and level-(p+)
// gaps -- and every moment below is computed from those, so the same pass
// serves every lam. The window is not cyclic; the two end gaps are excluded.
// Calibration: N before each fold is asserted against import-thinning-01,
// which asserted 24 figures of the foldL-06 embedded tail.
//
// PRE-REGISTRATION, written before the first run:
//  U1 The domination survives: c'_min < 2 at every measured fold and every
//     lam*mbar in {0.25, 0.5, 0.75, 0.9}.
//  U2 The MARGIN decays. 2 - c'_min at fixed lam*mbar = 0.25 reads 0.057,
//     0.049, 0.051, 0.048 at folds 17, 19, 23, 29 on the tile. Predicted: it
//     keeps falling, roughly like 1/p or faster, so that p*(2 - c'_min) is
//     bounded and the composed product prod (1 - c'/q) differs from
//     prod (1 - 2/q) by a CONSTANT factor, not by a power. That would leave
//     the exponent c = 1 unchanged and buy an amplitude only.
//  U3 K = Psi/Phi^2 < 1 at every measured fold, and 1 - K also decays.
//  U4 CONSEQUENCE, stated before the data: if U2 holds the verdict is that the
//     import yields NO new exponent, and H'' remains open at the exponent
//     level. If instead p*(2 - c'_min) grows, there is a real theorem here.
//
// Reproduction:
//   node --max-old-space-size=8000 research/import-thinning-03-deepfolds.js
//   WINY=2e8 node --max-old-space-size=4000 research/import-thinning-03-deepfolds.js
// ============================================================================

'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);
const say = (s) => console.log(s);
const WINY = Number(process.env.WINY || 2e9);
const QMAX = 1499;
let FAIL = 0;
const bad = (m) => { FAIL++; say('  FAIL  ' + m); };

function primesTo(n) { const c = new Uint8Array(n + 1), s = []; for (let i = 2; i <= n; i++) { if (!c[i]) { s.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } } return s; }
const PR = primesTo(QMAX).filter(p => p >= 5);
const MB = new Map(); { let a = 1; for (const p of PR) { MB.set(p, 6 * a); a *= p / (p - 2); } }

const M = Math.floor(WINY / 6);
say('='.repeat(104));
say(`IMPORT-THINNING 03 — the domination along the ladder, window Y = ${WINY.toExponential(0)}, ${M} slots`);
say('='.repeat(104));
const key = new Uint16Array(M);
for (const q of PR) {
  let inv6 = 1; while ((6 * inv6) % q !== 1) inv6++;
  for (const c of [((-5 % q) + q) % q, ((-7 % q) + q) % q]) {
    for (let i = (c * inv6) % q; i < M; i += q) if (key[i] === 0) key[i] = q;
  }
}
say(`  [sieve done, ${el()}s]`);
// N before each fold
const NB = new Map(); { const cnt = new Map(); for (const p of PR) cnt.set(p, 0);
  for (let i = 0; i < M; i++) { const k = key[i]; if (k) cnt.set(k, cnt.get(k) + 1); }
  let N = M; for (const p of PR) { NB.set(p, N); N -= cnt.get(p); } }
say('  calibration against import-thinning-01 (which asserted 24 foldL-06 figures):');
if (WINY === 2e9) {
  // every figure below is the foldL-06 embedded tail's own, or its N-after
  // plus its kills at the same fold: N before 7 = N after 5; N before 31 =
  // N after 29; N before 421 = 22433554 + 105790; N before 1451 = 15852743 + 21565.
  const ck = [[5, 333333333], [7, 200000000], [31, 66373676], [421, 22539344], [1451, 15874308]];
  for (const [p, v] of ck) { const ok = NB.get(p) === v; if (!ok) bad(`N before fold ${p}: ${NB.get(p)} != ${v}`); say(`    ${ok ? 'OK  ' : 'FAIL'}  N before fold ${String(p).padStart(4)} = ${NB.get(p)}`); }
} else say(`    skipped (Y != 2e9)`);

const US = [0.25, 0.5, 0.75, 0.9];
const FOLDS = [31, 53, 101, 211, 421, 1009];
const KM = 400;      // gap/6 cap; window G2 at fold 1499 is 2220, so 370 suffices
say('');
say('  fold |    N before |   mbar |    u | Phi meas | Phi_new  |    Psi  |  K=Psi/Phi^2 |  c_min | 2 - c_min | p(2-c_min)');
const OUT = [];
for (const p of FOLDS) {
  // one integer pass: level-p gaps, level-p adjacent-pair joint hist, level-(p+) gaps
  const h1 = new Float64Array(KM + 2), h2 = new Float64Array((KM + 2) * (KM + 2)), hN = new Float64Array(KM + 2);
  let over = 0;
  { let prev = -1, prevGap = -1, n1 = 0;
    for (let i = 0; i < M; i++) { const k = key[i]; if (k !== 0 && k < p) continue;
      if (prev >= 0) { const g = (i - prev); n1++; if (g <= KM) { h1[g]++; if (prevGap > 0 && prevGap <= KM) h2[prevGap * (KM + 2) + g]++; } else over++; prevGap = g; }
      prev = i; } }
  { let prev = -1;
    for (let i = 0; i < M; i++) { const k = key[i]; if (k !== 0 && k <= p) continue;
      if (prev >= 0) { const g = (i - prev); if (g <= KM) hN[g]++; else over++; }
      prev = i; } }
  let n1 = 0, nN = 0; for (let g = 1; g <= KM; g++) { n1 += h1[g]; nN += hN[g]; }
  let n2 = 0; for (let a = 1; a <= KM; a++) for (let b = 1; b <= KM; b++) n2 += h2[a * (KM + 2) + b];
  const mbar = WINY / NB.get(p);
  if (over > 0) say(`  (fold ${p}: ${over} gaps above the ${6 * KM} cap, ${(over / n1 * 100).toExponential(2)}% of the word, excluded from every moment)`);
  for (const u of US) {
    const lam = u / mbar, e6 = Math.exp(6 * lam);
    let Phi = 0, PhiN = 0, Psi = 0;
    for (let g = 1; g <= KM; g++) { const e = Math.pow(e6, g); Phi += h1[g] * e; PhiN += hN[g] * e; }
    Phi /= n1; PhiN /= nN;
    for (let a = 1; a <= KM; a++) { const ea = Math.pow(e6, a); const base = a * (KM + 2);
      for (let b = 1; b <= KM; b++) { const c = h2[base + b]; if (c) Psi += c * ea * Math.pow(e6, b); } }
    Psi /= n2;
    const K = Psi / (Phi * Phi);
    const cmin = p * (PhiN - Phi) / (Phi * (PhiN - 1));
    OUT.push({ p, u, Phi, PhiN, Psi, K, cmin });
    say(`  ${String(p).padStart(5)} | ${String(NB.get(p)).padStart(11)} | ${mbar.toFixed(2).padStart(6)} | ${u.toFixed(2)} | ${Phi.toFixed(5).padStart(8)} | ${PhiN.toFixed(5).padStart(8)} | ${Psi.toFixed(4).padStart(7)} | ${K.toFixed(8).padStart(12)} | ${cmin.toFixed(4).padStart(6)} | ${(2 - cmin).toExponential(3).padStart(9)} | ${(p * (2 - cmin)).toFixed(4).padStart(10)}`);
  }
  say(`  [fold ${p} done, ${el()}s]`);
}
say('');
say('  U2 verdict: the margin 2 - c_min against p, at each u.');
say('   u    | ' + FOLDS.map(p => `p=${p}`.padStart(11)).join(' | '));
for (const u of US) {
  say(`  ${u.toFixed(2)}  | ` + FOLDS.map(p => { const r = OUT.find(o => o.p === p && o.u === u); return (2 - r.cmin).toExponential(3).padStart(11); }).join(' | '));
}
say('   p*(2-c_min):');
for (const u of US) {
  say(`  ${u.toFixed(2)}  | ` + FOLDS.map(p => { const r = OUT.find(o => o.p === p && o.u === u); return (p * (2 - r.cmin)).toFixed(4).padStart(11); }).join(' | '));
}
say('   1 - K:');
for (const u of US) {
  say(`  ${u.toFixed(2)}  | ` + FOLDS.map(p => { const r = OUT.find(o => o.p === p && o.u === u); return (1 - r.K).toExponential(3).padStart(11); }).join(' | '));
}
say('');
say('  THE LAMBDA -> 0 LIMIT, ANALYTIC, AND WHY IT DECIDES THE WHOLE IMPORT.');
say('  Expand both moments at small lam. Phi = 1 + lam*mbar + O(lam^2) and');
say('  Phi_new = 1 + lam*mbar*p/(p-2) + O(lam^2), because the fold multiplies');
say('  the mean gap by exactly p/(p-2) (PROVEN: 2N of the pN slot copies die).');
say('  Substituting into c_min = p (Phi_new - Phi)/(Phi (Phi_new - 1)) gives');
say('       c_min -> p * [lam*mbar*2/(p-2)] / [lam*mbar*p/(p-2)] = 2,');
say('  EXACTLY, at every fold. So the domination margin is not a property of');
say('  the fold at all -- it is a second-and-higher-moment effect that vanishes');
say('  as lam -> 0, and 2 - c_min(lam) = O(lam^2) at fixed p.');
say('  Measured approach to that limit (2 - c_min against u, fold by fold):');
for (const p of FOLDS) {
  const rs = US.map(u => OUT.find(o => o.p === p && o.u === u));
  say(`   p = ${String(p).padStart(4)}: ` + rs.map((r, i) => `u=${US[i]}: ${(2 - r.cmin).toFixed(4)} (ratio to u^2 = ${((2 - r.cmin) / (US[i] * US[i])).toFixed(3)})`).join('  '));
}
say('');
say('  THE COMPOSITION, DONE ON THE RIGHT TRAJECTORY. To bound the tail of');
say('  T_x at threshold theta one fixes ONE absolute lam ~ u_x/mbar(x) and runs');
say('  the induction from the mod-6 comb with that same lam. Along that');
say('  trajectory u_q = lam*mbar(q) = u_x * mbar(q)/mbar(x), which is SMALL for');
say('  every fold below the top, so the ladder spends nearly all of its');
say('  sum-of-1/q at u ~ 0 where c_min = 2 and there is no margin at all.');
say('  Below: the composed dominating mean at fixed lam, with c_min(u)');
say('  interpolated from the measured table (linear in u, clamped at 2 for');
say('  u <= 0 and at the u = 0.9 value above it), against the truth.');
const cOfU = (u) => {                       // pooled over folds >= 101, linear interp
  const grid = US.map(uu => { const rs = OUT.filter(o => o.u === uu && o.p >= 101); return rs.reduce((a, r) => a + r.cmin, 0) / rs.length; });
  if (u <= 0) return 2;
  if (u >= US[US.length - 1]) return grid[grid.length - 1];
  let i = 0; while (US[i + 1] < u) i++;
  const t0 = (i === 0) ? 0 : US[i - 1], c0 = (i === 0) ? 2 : grid[i - 1];
  return c0 + (grid[i] - c0) * (u - t0) / (US[i] - t0);
};
say('   u at the top fold | mbar(truth) | mbar(dominating) | ratio | implied exponent c = mbar/mbar_dom');
for (const ux of US) {
  const mbx = MB.get(1499) * 1499 / (1499 - 2);
  let a2 = 1, ac = 1;
  for (const q of PR) { const uq = ux * MB.get(q) / mbx; a2 *= q / (q - 2); ac *= q / (q - cOfU(uq)); }
  say(`   ${ux.toFixed(2).padStart(17)} | ${(6 * a2).toFixed(3).padStart(11)} | ${(6 * ac).toFixed(3).padStart(16)} | ${(ac / a2).toFixed(4)} | ${(a2 / ac).toFixed(4)}`);
}
say('   For contrast, the SAME product with the margin held at its top-fold');
say('   value at every fold -- the calculation that is NOT licensed, shown so');
say('   the difference between the two is on the record:');
for (const ux of US) {
  let a2 = 1, ac = 1;
  for (const q of PR) { a2 *= q / (q - 2); ac *= q / (q - cOfU(ux)); }
  say(`   ${ux.toFixed(2).padStart(17)} | ${(6 * a2).toFixed(3).padStart(11)} | ${(6 * ac).toFixed(3).padStart(16)} | ${(ac / a2).toFixed(4)} | ${(a2 / ac).toFixed(4)}`);
}
say('');
say(`TOTAL FAILURES: ${FAIL}   elapsed ${el()}s`);
process.exit(FAIL ? 1 : 0);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --node-flag --max-old-space-size=8000 research/import-thinning-03-deepfolds.js
//   invocation:  node --max-old-space-size=8000 research/import-thinning-03-deepfolds.js
//   code-sha256: 318bd85e5e82193ff764a5f8e8fc8a81e5d843fa86e8dddf425ff6ef73a2ccc1
//   out-sha256:  4757c52fe9d1d9642454065d97f7a2d01eec1f4c0a41a016176406f3a8adb12e
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     21.0 s
// ============================================================================
// ========================================================================================================
// IMPORT-THINNING 03 — the domination along the ladder, window Y = 2e+9, 333333333 slots
// ========================================================================================================
//   [sieve done, 3.9s]
//   calibration against import-thinning-01 (which asserted 24 foldL-06 figures):
//     OK    N before fold    5 = 333333333
//     OK    N before fold    7 = 200000000
//     OK    N before fold   31 = 66373676
//     OK    N before fold  421 = 22539344
//     OK    N before fold 1451 = 15874308
//
//   fold |    N before |   mbar |    u | Phi meas | Phi_new  |    Psi  |  K=Psi/Phi^2 |  c_min | 2 - c_min | p(2-c_min)
//      31 |    66373676 |  30.13 | 0.25 |  1.30669 |  1.33421 |  1.7037 |   0.99777879 | 1.9535 |  4.650e-2 |     1.4414
//      31 |    66373676 |  30.13 | 0.50 |  1.78305 |  1.87787 |  3.1371 |   0.98673453 | 1.8779 |  1.221e-1 |     3.7850
//      31 |    66373676 |  30.13 | 0.75 |  2.58471 |  2.85471 |  6.3733 |   0.95398862 | 1.7460 |  2.540e-1 |     7.8735
//      31 |    66373676 |  30.13 | 0.90 |  3.35807 |  3.86150 | 10.3136 |   0.91459360 | 1.6241 |  3.759e-1 |    11.6530
//   [fold 31 done, 13.2s]
//      53 |    51004617 |  39.21 | 0.25 |  1.31049 |  1.32624 |  1.7113 |   0.99644295 | 1.9523 |  4.775e-2 |     2.5306
//      53 |    51004617 |  39.21 | 0.50 |  1.80779 |  1.86282 |  3.2020 |   0.97976759 | 1.8700 |  1.300e-1 |     6.8902
//      53 |    51004617 |  39.21 | 0.75 |  2.68287 |  2.84457 |  6.7414 |   0.93660050 | 1.7318 |  2.682e-1 |    14.2123
//      53 |    51004617 |  39.21 | 0.90 |  3.56883 |  3.88153 | 11.3514 |   0.89124837 | 1.6116 |  3.884e-1 |    20.5843
//   [fold 53 done, 15.3s]
//     101 |    38298335 |  52.22 | 0.25 |  1.31389 |  1.32209 |  1.7198 |   0.99626387 | 1.9574 |  4.259e-2 |     4.3013
//     101 |    38298335 |  52.22 | 0.50 |  1.83155 |  1.86102 |  3.2898 |   0.98067547 | 1.8873 |  1.127e-1 |    11.3838
//     101 |    38298335 |  52.22 | 0.75 |  2.79305 |  2.88531 |  7.3670 |   0.94434973 | 1.7696 |  2.304e-1 |    23.2672
//     101 |    38298335 |  52.22 | 0.90 |  3.84215 |  4.03336 | 13.3880 |   0.90691716 | 1.6570 |  3.430e-1 |    34.6400
//   [fold 101 done, 16.8s]
//     211 |    28510623 |  70.15 | 0.25 |  1.31701 |  1.32098 |  1.7291 |   0.99686048 | 1.9811 |  1.891e-2 |     3.9906
//     211 |    28510623 |  70.15 | 0.50 |  1.85561 |  1.87038 |  3.3885 |   0.98407936 | 1.9298 |  7.017e-2 |    14.8053
//     211 |    28510623 |  70.15 | 0.75 |  2.91892 |  2.96885 |  8.1158 |   0.95254239 | 1.8332 |  1.668e-1 |    35.1904
//     211 |    28510623 |  70.15 | 0.90 |  4.18299 |  4.29527 | 16.0191 |   0.91551525 | 1.7187 |  2.813e-1 |    59.3566
//   [fold 211 done, 18.3s]
//     421 |    22539344 |  88.73 | 0.25 |  1.31929 |  1.32126 |  1.7360 |   0.99739876 | 1.9537 |  4.628e-2 |    19.4827
//     421 |    22539344 |  88.73 | 0.50 |  1.87409 |  1.88160 |  3.4642 |   0.98633210 | 1.9133 |  8.665e-2 |    36.4805
//     421 |    22539344 |  88.73 | 0.75 |  3.02326 |  3.05010 |  8.7346 |   0.95563179 | 1.8229 |  1.771e-1 |    74.5381
//     421 |    22539344 |  88.73 | 0.90 |  4.48671 |  4.55093 | 18.4191 |   0.91498039 | 1.6969 |  3.031e-1 |   127.6084
//   [fold 421 done, 19.6s]
//    1009 |    17490740 | 114.35 | 0.25 |  1.32156 |  1.32234 |  1.7429 |   0.99795381 | 1.8579 |  1.421e-1 |   143.4090
//    1009 |    17490740 | 114.35 | 0.50 |  1.89345 |  1.89653 |  3.5457 |   0.98900343 | 1.8311 |  1.689e-1 |   170.4540
//    1009 |    17490740 | 114.35 | 0.75 |  3.17856 |  3.19091 |  9.6666 |   0.95678778 | 1.7907 |  2.093e-1 |   211.1941
//    1009 |    17490740 | 114.35 | 0.90 |  5.44717 |  5.48302 | 24.9419 |   0.84059770 | 1.4812 |  5.188e-1 |   523.4308
//   [fold 1009 done, 20.9s]
//
//   U2 verdict: the margin 2 - c_min against p, at each u.
//    u    |        p=31 |        p=53 |       p=101 |       p=211 |       p=421 |      p=1009
//   0.25  |    4.650e-2 |    4.775e-2 |    4.259e-2 |    1.891e-2 |    4.628e-2 |    1.421e-1
//   0.50  |    1.221e-1 |    1.300e-1 |    1.127e-1 |    7.017e-2 |    8.665e-2 |    1.689e-1
//   0.75  |    2.540e-1 |    2.682e-1 |    2.304e-1 |    1.668e-1 |    1.771e-1 |    2.093e-1
//   0.90  |    3.759e-1 |    3.884e-1 |    3.430e-1 |    2.813e-1 |    3.031e-1 |    5.188e-1
//    p*(2-c_min):
//   0.25  |      1.4414 |      2.5306 |      4.3013 |      3.9906 |     19.4827 |    143.4090
//   0.50  |      3.7850 |      6.8902 |     11.3838 |     14.8053 |     36.4805 |    170.4540
//   0.75  |      7.8735 |     14.2123 |     23.2672 |     35.1904 |     74.5381 |    211.1941
//   0.90  |     11.6530 |     20.5843 |     34.6400 |     59.3566 |    127.6084 |    523.4308
//    1 - K:
//   0.25  |    2.221e-3 |    3.557e-3 |    3.736e-3 |    3.140e-3 |    2.601e-3 |    2.046e-3
//   0.50  |    1.327e-2 |    2.023e-2 |    1.932e-2 |    1.592e-2 |    1.367e-2 |    1.100e-2
//   0.75  |    4.601e-2 |    6.340e-2 |    5.565e-2 |    4.746e-2 |    4.437e-2 |    4.321e-2
//   0.90  |    8.541e-2 |    1.088e-1 |    9.308e-2 |    8.448e-2 |    8.502e-2 |    1.594e-1
//
//   THE LAMBDA -> 0 LIMIT, ANALYTIC, AND WHY IT DECIDES THE WHOLE IMPORT.
//   Expand both moments at small lam. Phi = 1 + lam*mbar + O(lam^2) and
//   Phi_new = 1 + lam*mbar*p/(p-2) + O(lam^2), because the fold multiplies
//   the mean gap by exactly p/(p-2) (PROVEN: 2N of the pN slot copies die).
//   Substituting into c_min = p (Phi_new - Phi)/(Phi (Phi_new - 1)) gives
//        c_min -> p * [lam*mbar*2/(p-2)] / [lam*mbar*p/(p-2)] = 2,
//   EXACTLY, at every fold. So the domination margin is not a property of
//   the fold at all -- it is a second-and-higher-moment effect that vanishes
//   as lam -> 0, and 2 - c_min(lam) = O(lam^2) at fixed p.
//   Measured approach to that limit (2 - c_min against u, fold by fold):
//    p =   31: u=0.25: 0.0465 (ratio to u^2 = 0.744)  u=0.5: 0.1221 (ratio to u^2 = 0.488)  u=0.75: 0.2540 (ratio to u^2 = 0.452)  u=0.9: 0.3759 (ratio to u^2 = 0.464)
//    p =   53: u=0.25: 0.0477 (ratio to u^2 = 0.764)  u=0.5: 0.1300 (ratio to u^2 = 0.520)  u=0.75: 0.2682 (ratio to u^2 = 0.477)  u=0.9: 0.3884 (ratio to u^2 = 0.479)
//    p =  101: u=0.25: 0.0426 (ratio to u^2 = 0.681)  u=0.5: 0.1127 (ratio to u^2 = 0.451)  u=0.75: 0.2304 (ratio to u^2 = 0.410)  u=0.9: 0.3430 (ratio to u^2 = 0.423)
//    p =  211: u=0.25: 0.0189 (ratio to u^2 = 0.303)  u=0.5: 0.0702 (ratio to u^2 = 0.281)  u=0.75: 0.1668 (ratio to u^2 = 0.296)  u=0.9: 0.2813 (ratio to u^2 = 0.347)
//    p =  421: u=0.25: 0.0463 (ratio to u^2 = 0.740)  u=0.5: 0.0867 (ratio to u^2 = 0.347)  u=0.75: 0.1771 (ratio to u^2 = 0.315)  u=0.9: 0.3031 (ratio to u^2 = 0.374)
//    p = 1009: u=0.25: 0.1421 (ratio to u^2 = 2.274)  u=0.5: 0.1689 (ratio to u^2 = 0.676)  u=0.75: 0.2093 (ratio to u^2 = 0.372)  u=0.9: 0.5188 (ratio to u^2 = 0.640)
//
//   THE COMPOSITION, DONE ON THE RIGHT TRAJECTORY. To bound the tail of
//   T_x at threshold theta one fixes ONE absolute lam ~ u_x/mbar(x) and runs
//   the induction from the mod-6 comb with that same lam. Along that
//   trajectory u_q = lam*mbar(q) = u_x * mbar(q)/mbar(x), which is SMALL for
//   every fold below the top, so the ladder spends nearly all of its
//   sum-of-1/q at u ~ 0 where c_min = 2 and there is no margin at all.
//   Below: the composed dominating mean at fixed lam, with c_min(u)
//   interpolated from the measured table (linear in u, clamped at 2 for
//   u <= 0 and at the u = 0.9 value above it), against the truth.
//    u at the top fold | mbar(truth) | mbar(dominating) | ratio | implied exponent c = mbar/mbar_dom
//                 0.25 |     129.626 |          125.822 | 0.9707 | 1.0302
//                 0.50 |     129.626 |          122.130 | 0.9422 | 1.0614
//                 0.75 |     129.626 |          119.088 | 0.9187 | 1.0885
//                 0.90 |     129.626 |          116.822 | 0.9012 | 1.1096
//    For contrast, the SAME product with the margin held at its top-fold
//    value at every fold -- the calculation that is NOT licensed, shown so
//    the difference between the two is on the record:
//                 0.25 |     129.626 |          116.735 | 0.9005 | 1.1104
//                 0.50 |     129.626 |          105.201 | 0.8116 | 1.2322
//                 0.75 |     129.626 |           99.803 | 0.7699 | 1.2988
//                 0.90 |     129.626 |           71.388 | 0.5507 | 1.8158
//
// TOTAL FAILURES: 0   elapsed 20.9s
// ============================================================================
// READINGS
// ============================================================================
//
// [1] U1 HOLDS AT EVERY DEEP FOLD. c_min < 2 at all 24 cells from p = 31 to
//     p = 1009, ranging 1.4812 to 1.9811. The domination measured on the exact
//     tile in import-thinning-02 is not a small-p artefact.
//
// [2] U2 IS REFUTED AS STATED, AND U3 HOLDS. The margin 2 - c_min does not
//     decay in p at fixed u: at u = 0.25 it reads 4.650e-2, 4.775e-2, 4.259e-2,
//     1.891e-2, 4.628e-2, 1.421e-1 across p = 31 to 1009, and p*(2 - c_min)
//     GROWS, 1.4414 to 143.4090. 1 - K likewise sits flat between 2.046e-3 and
//     3.736e-3 at u = 0.25 with no sign of collapsing. Read alone, that table says the
//     import has a theorem in it.
//
// [3] IT DOES NOT, AND THE REASON IS ANALYTIC, NOT EMPIRICAL. Expanding both
//     moments at small lam, Phi = 1 + lam*mbar and Phi_new = 1 + lam*mbar
//     p/(p-2) -- the second because the fold multiplies the mean gap by exactly
//     p/(p-2), which is PROVEN, 2N of the pN slot copies die -- and substituting
//     gives c_min -> 2 EXACTLY as lam -> 0, at every fold. The margin is a
//     second-and-higher-moment effect. Measured, 2 - c_min divided by u^2 sits
//     between 0.281 and 0.764 over 23 of the 24 cells, so the O(lam^2) law is
//     what the data shows. The 24th cell is fold 1009 at u = 0.25, ratio 2.274,
//     and it is the one place the instrument is thin: at that depth the level
//     word has almost no gaps at the scale the small-lam moment weighs, so the
//     cell is reported and not leaned on.
//
// [4] AND THAT KILLS THE COMPOSITION. A tail bound at level x needs ONE
//     absolute lam ~ u_x/mbar(x) carried through every fold of the ladder, and
//     along that trajectory u_q = u_x * mbar(q)/mbar(x) is small at every fold
//     below the top. The ladder therefore spends nearly all of its sum of 1/q
//     at u ~ 0, where c_min = 2 and the margin is zero. Composed correctly the
//     dominating mean is 125.822, 122.130, 119.088, 116.822 against the truth's
//     129.626 for u_x = 0.25, 0.5, 0.75, 0.9, i.e. an implied exponent of
//     1.0302, 1.0614, 1.0885, 1.1096 in theta/mbar units. Composed the way the
//     raw table invites -- holding the top fold's margin at every fold, which
//     is NOT licensed -- it would read 1.1104, 1.2322, 1.2988, 1.8158. The
//     difference between those two columns is the whole of the temptation.
//
// [5] SO THE IMPORT DELIVERS A CONSTANT, NOT AN EXPONENT, AND THE CONSTANT IS
//     THE ONE ALREADY MEASURED. The correctly composed implied exponent at
//     u_x = 0.5 to 0.75 is 1.0614 to 1.0885, against attack-foldL-06-scaling.md's
//     FITTED c = 1.0818 +- 0.0317 and against import-thinning-01's derived
//     null value 1.0577. Three routes -- a fit to measured pairs, the closed-form
//     thinning null, and the domination composed along the ladder -- land within
//     3% of each other. That agreement is the result. What it is NOT is a proof,
//     because every step of the composition is conditional on the measured
//     c_min(u) curve holding at folds nobody has reached.
//
// [6] WHAT WOULD HAVE TO BE PROVEN, STATED IN THE CORPUS'S OWN WORDS. By the
//     Fold Moment Identity of import-thinning-02, c_min < 2 - delta(u) is a
//     bound on Psi, the ADJACENT-PAIR exponential moment, in terms of Phi and
//     the qualifying weight Om. It is H'' of a3-05-bound-L.md s8 at m = 2, in
//     moment form, with the m >= 3 cases entering only through Delta at second
//     order. It is NOT the m = 1 base case, which attack-l1-residue.md showed
//     to be the Zone Postulate in residue notation. The import lands one level
//     inside the wall rather than on it, and it lands on the half the corpus
//     deliberately left unconstrained.
//
// [7] AND THE DOMINATION'S OWN CONSEQUENCE CLOSES THE BRANCH, INDEPENDENTLY OF
//     EVERYTHING ABOVE. Suppose Phi_new <= T_{2/p}(Phi) held at every fold at
//     one fixed lam -- which is what every cell measured here and in
//     import-thinning-02 satisfies, 52 of 52. Induction from the mod-6 comb,
//     whose Phi is exactly e^{6 lam}, then gives Phi_x <= the null geometric,
//     and Markov at theta = G2 against N = |T_x| points gives
//     G2 <= mbar * ln N * (1 + o(1)), about 2.4 x ln^2 x. That is verbatim the
//     statement a3-05-bound-L.md s8 calls the naive form and rejects as "far
//     too strong ... stronger than the Zone Postulate and stronger than
//     anything known", and since x ln^2 x = o(x^2) it implies the Zone
//     Postulate outright. So the hypothesis is not weaker than the target, it
//     is stronger. attack-l1-residue.md found exactly this for the m = 1 base
//     case of H''; the same failure is now on record for the m = 2 half. The
//     tables above are evidence FOR the Zone Postulate and are not a route TO
//     it, and no amount of extending them to deeper folds would change that,
//     because the defect is in the direction of the implication and not in the
//     range of the measurement.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// BORROWED, verified present in the named producers' embedded output. All
// three figures in reading [5] are comparison values, not results of this run:
//   1.0818 +- 0.0317 is the attack-foldL-06 fitted c. It appears verbatim in
//   the embedded output of research/attack-foldL-06-scaling.js ("c = 1.0818
//   +- 0.0317, corr(A,c) = 0.987") and in research/foldL-window5-01-
//   extinction.js, which reproduces the record fit.
//   1.0577 is the import-thinning-01 derived null. It appears verbatim in the
//   embedded output of research/import-thinning-01-nullmodel.js, on the
//   unweighted OLS-in-log row.
// The reading's "within 3%" claim is against this file's own printed implied
// exponents 1.0614 and 1.0885, which the block above does contain.
// ---------------------------------------------------------------------------
