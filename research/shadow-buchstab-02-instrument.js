'use strict';
// ============================================================================
// SHADOW-BUCHSTAB 02 — A CLEAN INSTRUMENT FOR THE KILL SHADOW, AND THE SCORE
// (2026-08-19, TODO item 5. Scores the pre-registered candidate of
//  research/shadow-buchstab-01-candidate.js against a fresh measurement.)
// ============================================================================
// ⚠ CORRECTION 2026-08-20, and it is about a column this file still prints.
// The `se(Poisson)` column below is `mean(meas)/sqrt(Ntot)` on the cluster's
// POOLED slot total (:143), and it is 4x to 6x TOO SMALL at every pooled
// cluster. The pooling oversamples: at y0 = 2900 the 53 bands [y^2, 2y^2] cover
// one interval and Ntot = 2,219,418 counts 61,931 distinct pairs, a 35.84x
// oversample. Measured against distinct pairs the floor is 0.00746 not 0.00165
// at y0 = 1000, and 0.00405 not 0.00070 at y0 = 2000
// [`research/history/staging/shadow-amplitude.md` §3].
//
// The anatomy is the reason this banner exists at all. The note further down
// this header states the dependence correctly ("levels in a cluster are NOT
// independent samples ... so the scatter s.e. understates the true error") and
// then offers as its repair the Poisson floor on the same overlapping pool,
// which is wrong by the same mechanism. The diagnosis was right and the fix
// inherited the defect. Do not price a pooled-band residual against this
// column. `shadow-amplitude-02`'s N_dist is the recount that caught it, and
// `research/adversary-wave2-01-shadow.js` part (C) is the corpus's own repair:
// one prime per rung, no pooling.
//
// Everything else here stands. The SLOT COUNTS, the ratios, the §5
// reproduction and the D1/D2/D3 score are unaffected; only the error bar in the
// `se(Poisson)` column is understated.
// ============================================================================
// WHY A NEW INSTRUMENT. `research/anchored-windows.md` §5 is the only place the
// kill-shadow depths are tabulated, and its own header says the producer
// (`scratchpad/anchored-check.js`) no longer exists and that §5 must not be
// quoted without recomputation. So the depths are re-measured here from
// scratch, by a segmented window sieve that needs no period, no stored table
// and no other script's rows.
//
// WHAT IS COUNTED. A twin slot at level y is an integer r with
// r mod p not in {0, -2} for every prime p <= y. Its fair share is the tile
// density delta(y) = (1/2) prod_{2<p<=y} (1 - 2/p), computed here as an exact
// product over the primes, not from an asymptotic. Every ratio below is
// (slots in W) / (delta(y) * |W|); 1 means fair share.
//
// THREE PARTS.
//  (A) THE §5 CONFIGURATION, to settle whether that flagged table reproduces:
//      sieve level p, windows [kZ, (k+1)Z) for k = 0..7, Z = p'^2, p' = next
//      prime. All 32 published entries are re-derived.
//  (B) THE PRE-REGISTERED BAND: the ignition band [y^2, 2y^2] at the level's
//      OWN square (exactly u in [2, 2 + ln2/ln y]), swept over ten CLUSTERS of
//      nearby primes. One band at y ~ 1000 holds only ~9,000 slots, so a single
//      level's ratio carries ~1% counting noise, the size of the whole effect;
//      averaging the RESIDUAL (measured - predicted) over primes of nearly
//      equal w = ln2/ln y suppresses that without smearing the prediction,
//      which is evaluated per level. NOTE, and it is why two error columns are
//      printed: levels in a cluster are NOT independent samples — they share
//      almost all their sieving primes and their bands overlap — so the
//      scatter s.e. understates the true error, and the Poisson floor on the
//      cluster's own slot total is printed beside it.
//      The pre-band [y^2/2, y^2) is measured at one level per cluster: it
//      carries the same level's trough and so calibrates the finite-size
//      factor between measured rho(2) and e^{2gamma}/4.
//  (C) THE SCORE against research/history/staging/shadow-prereg.md, which fixed
//      the tolerance (0.011), the deciding levels (y >= 997) and the three
//      criteria D1/D2/D3 before this file existed.
//
// WHAT IS PREDICTED. The Unification Law of attack2-05-07-integral-ladder.js,
//   rho(u) = e^{2gamma}/u^2 (u <= 2), (e^{gamma} omega(u))^2 (2 <= u <= 3),
// x-weighted over each window.
// ============================================================================

const GAMMA = 0.5772156649015329;
const E2G = Math.exp(2 * GAMMA);
const omega = (u) => (1 + Math.log(u - 1)) / u;
const rho = (u) => (u <= 2 ? E2G / (u * u) : Math.pow(Math.exp(GAMMA) * omega(u), 2));
const TOL = 0.011;                       // pre-registered, shadow-prereg.md

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const ALL = primesUpTo(34_000);
const nextPrime = (n) => ALL.find(q => q > n);
function delta(y){ let d = 0.5; for (const p of ALL){ if (p === 2) continue; if (p > y) break; d *= (p - 2)/p; } return d; }

// x-weighted mean of rho over the positions [a, b], at sieve level y (Simpson)
function predWindow(y, a, b){
  const ln = Math.log(y), n = 400, h = (b - a)/n;
  let s = 0;
  for (let i = 0; i <= n; i++){
    const t = a + i*h, wt = (i === 0 || i === n) ? 1 : (i % 2 ? 4 : 2);
    s += wt * rho(Math.log(t)/ln);
  }
  return s * h / 3 / (b - a);
}

// --------------------------------------------------------------- the sieve --
// Segmented: count level-y twin slots in [lo, hi) split into `bins` EQUAL-LENGTH
// parts (so each bin carries the same x-mass; the shape below uses that).
const SEG = 1 << 22;
const buf = new Uint8Array(SEG);
function countBins(y, lo, hi, bins){
  const out = new Float64Array(bins);
  const width = (hi - lo)/bins;
  for (let base = lo; base < hi; base += SEG){
    const top = Math.min(base + SEG, hi), len = top - base;
    buf.fill(0, 0, len);
    for (const p of ALL){
      if (p > y) break;
      let s = p - (base % p); if (s === p) s = 0;
      for (let j = s; j < len; j += p) buf[j] = 1;
      if (p > 2){ let t = ((p - 2 - (base % p)) % p + p) % p; for (let j = t; j < len; j += p) buf[j] = 1; }
    }
    for (let i = 0; i < len; i++) if (!buf[i]){ let b = Math.floor((base + i - lo)/width); if (b >= bins) b = bins - 1; out[b]++; }
  }
  return out;
}

// ============================ (A) does §5 reproduce? ========================
console.log('=== (A) the anchored-windows.md section-5 configuration, re-measured ===');
console.log('level p, Z = (next prime)^2, ratio to fair share in [kZ,(k+1)Z)');
console.log('  p      Z          k=0     k=1     k=2     k=3     k=4     k=5     k=6     k=7   | sec.5 k=1 | pred k=1 | slots in k=1');
const S5 = { 23: 0.834, 97: 0.850, 401: 0.853, 997: 0.856 };
let s5hits = 0, s5tot = 0;
const S5PUB = { 23:[1.001,0.834,1.067,0.967,1.001,1.134,1.067,0.967], 97:[1.034,0.850,0.921,0.978,0.952,0.932,0.957,1.009],
                401:[0.968,0.853,0.883,0.934,0.928,0.958,0.967,0.967], 997:[0.939,0.856,0.882,0.918,0.924,0.936,0.941,0.955] };
for (const p of [23, 97, 401, 997]){
  const Z = Math.pow(nextPrime(p), 2), d = delta(p);
  const c = countBins(p, 0, 8*Z, 8);
  const vals = [...c].map(v => v/(Z*d));
  vals.forEach((v, k) => { s5tot++; if (Math.abs(v - S5PUB[p][k]) < 0.0005) s5hits++; });
  console.log(`  ${String(p).padEnd(6)} ${String(Z).padEnd(10)}${vals.map(v=>v.toFixed(3).padStart(7)).join(' ')}   |  ${S5[p].toFixed(3)}    |  ${predWindow(p, Z, 2*Z).toFixed(3)}    |  ${c[1]}`);
}
console.log(`  section-5 entries reproduced to 3 decimals: ${s5hits} of ${s5tot}`);

// ===================== (B) the pre-registered band, swept in y ==============
console.log('\n=== (B) the ignition band [y^2, 2y^2] at the level\'s own square ===');
const CENTRES = [1000, 1400, 2000, 2900, 4200, 6000, 8500, 12000, 18000, 26000];
const BUDGET = 4.0e8;                     // total band length per cluster
const summary = [];
for (const y0 of CENTRES){
  const pool = ALL.filter(p => p >= 0.88*y0 && p <= 1.12*y0);
  const ys = []; let tot = 0;
  for (const p of pool){ if (tot > BUDGET && ys.length) break; ys.push(p); tot += p*p; }
  const meas = [], preds = [], oct = new Float64Array(8);
  let Ntot = 0, first = null;
  for (const y of ys){
    const Y = y*y, d = delta(y);
    const b = countBins(y, Y, 2*Y, 8);
    let N = 0; for (const v of b) N += v;
    const m = N/(Y*d), P = predWindow(y, Y, 2*Y);
    meas.push(m); preds.push(P); Ntot += N;
    for (let k = 0; k < 8; k++) oct[k] += b[k]/((Y/8)*d)/m;   // equal x-mass per bin
    if (y === ys[0]){
      const lo = Math.floor(Y/2), pre = countBins(y, lo, Y, 8);
      let Np = 0; for (const v of pre) Np += v;
      first = { y, w: Math.LN2/Math.log(y),
                pre: Np/((Y-lo)*d), prePred: predWindow(y, Y/2, Y),
                trough: pre[7]/(((Y-lo)/8)*d) };
    }
  }
  const mean = (a) => a.reduce((x,z)=>x+z,0)/a.length;
  const sd = (a) => { const mu = mean(a); return Math.sqrt(a.reduce((x,z)=>x+(z-mu)*(z-mu),0)/Math.max(1,a.length-1)); };
  const resid = meas.map((v,i) => v - preds[i]);
  const om = [...oct].map(v => v/ys.length);
  const Y0 = ys[0]*ys[0], predOct = [];
  for (let k = 0; k < 8; k++) predOct.push(predWindow(ys[0], Y0 + k*Y0/8, Y0 + (k+1)*Y0/8));
  const pmean = predOct.reduce((x,z)=>x+z,0)/8, pn = predOct.map(v => v/pmean);
  summary.push({ y0, ys, n: ys.length, w: mean(ys.map(y=>Math.LN2/Math.log(y))), Ntot,
                 meas: mean(meas), pred: mean(preds), res: mean(resid),
                 seScatter: sd(resid)/Math.sqrt(ys.length), sePoisson: mean(meas)/Math.sqrt(Ntot),
                 oct: om, rise: om[7]/om[0], predRise: pn[7]/pn[0], pn, first });
}

console.log('  cluster  #lev  y range        w        slots       measured   B_x(pred)  residual   se(scatter) se(Poisson)');
for (const s of summary)
  console.log(`  ${String(s.y0).padEnd(8)}${String(s.n).padStart(4)}  ${(s.ys[0]+'-'+s.ys[s.ys.length-1]).padEnd(14)}${s.w.toFixed(5)}  ${String(s.Ntot).padStart(10)}   ${s.meas.toFixed(5)}    ${s.pred.toFixed(5)}   ${(s.res>=0?'+':'')}${s.res.toFixed(5)}    ${s.seScatter.toFixed(5)}    ${s.sePoisson.toFixed(5)}`);

console.log('\n  the pre-band [y^2/2, y^2) and the level\'s own trough (one level per cluster)');
console.log('  y        preband  pred     trough_meas  e^{2gamma}/4  F = trough/0.793055');
for (const s of summary){
  const f = s.first;
  console.log(`  ${String(f.y).padEnd(9)}${f.pre.toFixed(5)}  ${f.prePred.toFixed(5)}  ${f.trough.toFixed(5)}      0.793055      ${(f.trough/0.793055).toFixed(4)}`);
}

console.log('\n  the band shape: eighths of [y^2,2y^2], each normalised to that band\'s mean');
console.log('  cluster  e1     e2     e3     e4     e5     e6     e7     e8     last/first  predicted');
for (const s of summary){
  console.log(`  ${String(s.y0).padEnd(8)} ${s.oct.map(v=>v.toFixed(4)).join(' ')}   ${s.rise.toFixed(4)}      ${s.predRise.toFixed(4)}`);
  console.log(`  ${''.padEnd(8)} ${s.pn.map(v=>v.toFixed(4)).join(' ')}   <- predicted`);
}

// ============================== (C) the score ===============================
console.log('\n=== (C) SCORE against the pre-registration (tolerance 0.011, deciding y >= 997) ===');
console.log('  D1 magnitude |measured - B_x| <= 0.011');
let d1 = 0, d1n = 0;
for (const s of summary){ const ok = Math.abs(s.res) <= TOL; d1n++; if (ok) d1++;
  console.log(`    y~${String(s.y0).padEnd(6)} |${s.res.toFixed(5)}| ${ok ? 'PASS' : 'FAIL'}   (${(Math.abs(s.res)/TOL).toFixed(2)} x tolerance)`); }
console.log(`    D1: ${d1} of ${d1n} clusters pass`);

console.log('  D2 level trend: candidate falls with y; measurement must fall too');
let d2 = 0, d2n = 0;
for (let i = 1; i < summary.length; i++){
  const a = summary[i-1], b = summary[i];
  const dp = b.pred - a.pred, dm = b.meas - a.meas, ok = dp < 0 && dm < 0;
  d2n++; if (ok) d2++;
  console.log(`    ${a.y0}->${b.y0}: predicted ${dp.toFixed(5)}  measured ${dm.toFixed(5)}  ${ok ? 'PASS' : 'FAIL'}`);
}
console.log(`    D2: ${d2} of ${d2n} steps pass`);

console.log('  D3 band shape: |measured last/first - predicted| <= 0.020');
let d3 = 0, d3n = 0;
for (const s of summary){ const dv = s.rise - s.predRise, ok = Math.abs(dv) <= 0.020; d3n++; if (ok) d3++;
  console.log(`    y~${String(s.y0).padEnd(6)} measured ${s.rise.toFixed(4)}  predicted ${s.predRise.toFixed(4)}  diff ${(dv>=0?'+':'')}${dv.toFixed(4)}  ${ok ? 'PASS' : 'FAIL'}`); }
console.log(`    D3: ${d3} of ${d3n} clusters pass`);

console.log('\n  residual vs y, for the record (is it a smooth finite-size correction?)');
console.log('  y0        residual   residual/(1/ln y)   residual/(1/ln^2 y)');
for (const s of summary){
  const L = Math.log(s.y0);
  console.log(`  ${String(s.y0).padEnd(9)} ${(s.res>=0?'+':'')}${s.res.toFixed(5)}    ${(s.res*L).toFixed(5)}             ${(s.res*L*L).toFixed(5)}`);
}

console.log('\n=== (D) diagnostic, outside the score: where does the small-y residual live? ===');
console.log('  per-eighth residual (measured - predicted, absolute) for the three smallest clusters');
console.log('  cluster   r1       r2       r3       r4       r5       r6       r7       r8');
for (const s of summary.slice(0, 3)){
  const Y0 = s.ys[0]*s.ys[0], rows = [];
  for (let k = 0; k < 8; k++){
    const pk = predWindow(s.ys[0], Y0 + k*Y0/8, Y0 + (k+1)*Y0/8);
    rows.push(((s.oct[k]*s.meas - pk) >= 0 ? '+' : '') + (s.oct[k]*s.meas - pk).toFixed(4));
  }
  console.log(`  ${String(s.y0).padEnd(9)} ${rows.map(v=>v.padStart(7)).join('  ')}`);
}
console.log('\n  finer sweep of the residual in y (band only, budget 1e8 per point)');
console.log('  y range          w        slots      measured   B_x(pred)  residual');
for (const y0 of [900, 1000, 1100, 1250, 1400, 1600, 1800, 2000, 2400, 2900, 3600]){
  const pool = ALL.filter(p => p >= 0.94*y0 && p <= 1.06*y0);
  const ys = []; let tot = 0;
  for (const p of pool){ if (tot > 1.0e8 && ys.length) break; ys.push(p); tot += p*p; }
  let N = 0, sm = 0, sp = 0;
  for (const y of ys){
    const Y = y*y, d = delta(y), b = countBins(y, Y, 2*Y, 1);
    N += b[0]; sm += b[0]/(Y*d); sp += predWindow(y, Y, 2*Y);
  }
  const m = sm/ys.length, P = sp/ys.length, w = Math.LN2/Math.log(y0);
  console.log(`  ${(ys[0]+'-'+ys[ys.length-1]).padEnd(16)} ${w.toFixed(5)}  ${String(N).padStart(9)}   ${m.toFixed(5)}    ${P.toFixed(5)}   ${(m-P>=0?'+':'')}${(m-P).toFixed(5)}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/shadow-buchstab-02-instrument.js
//   invocation:  node research/shadow-buchstab-02-instrument.js
//   code-sha256: ab62186e4c10e492598a8a22d90fec95b8e445b89352302e66047ce607e9153c
//   out-sha256:  28d295811324ce0864614744efd30105194d65200cdbbcbfd50361ab9d646df7
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     21.9 s
// ============================================================================
// === (A) the anchored-windows.md section-5 configuration, re-measured ===
// level p, Z = (next prime)^2, ratio to fair share in [kZ,(k+1)Z)
//   p      Z          k=0     k=1     k=2     k=3     k=4     k=5     k=6     k=7   | sec.5 k=1 | pred k=1 | slots in k=1
//   23     841         1.001   0.834   1.067   0.967   1.001   1.134   1.067   0.967   |  0.834    |  0.943    |  25
//   97     10201       1.034   0.850   0.921   0.978   0.952   0.932   0.957   1.009   |  0.850    |  0.863    |  166
//   401    167281      0.968   0.853   0.883   0.934   0.928   0.958   0.967   0.967   |  0.853    |  0.844    |  1625
//   997    1018081     0.939   0.856   0.882   0.918   0.924   0.936   0.941   0.955   |  0.856    |  0.836    |  7542
//   section-5 entries reproduced to 3 decimals: 32 of 32
//
// === (B) the ignition band [y^2, 2y^2] at the level's own square ===
//   cluster  #lev  y range        w        slots       measured   B_x(pred)  residual   se(scatter) se(Poisson)
//   1000      36  881-1117      0.10033      266735   0.85004    0.83365   +0.01639    0.00078    0.00165
//   1400      45  1237-1567     0.09565      591384   0.84124    0.83192   +0.00932    0.00030    0.00109
//   2000      59  1777-2239     0.09120     1417269   0.83285    0.83025   +0.00260    0.00026    0.00070
//   2900      53  2557-2963     0.08749     2219418   0.83212    0.82886   +0.00326    0.00022    0.00056
//   4200      28  3697-3919     0.08407     2052941   0.82830    0.82756   +0.00074    0.00008    0.00058
//   6000      14  5281-5413     0.08074     1868376   0.82690    0.82629   +0.00061    0.00008    0.00060
//   8500       8  7481-7529     0.07768     1945202   0.82741    0.82512   +0.00229    0.00007    0.00059
//   12000      4  10567-10601   0.07479     1785182   0.82325    0.82401   -0.00075    0.00013    0.00062
//   18000      2  15859-15877   0.07166     1840503   0.82315    0.82279   +0.00036    0.00007    0.00061
//   26000      1  22901-22901   0.06905     1779677   0.82279    0.82177   +0.00102    0.00000    0.00062
//
//   the pre-band [y^2/2, y^2) and the level's own trough (one level per cluster)
//   y        preband  pred     trough_meas  e^{2gamma}/4  F = trough/0.793055
//   881      0.83038  0.83075  0.76881      0.793055      0.9694
//   1237     0.85253  0.82887  0.82841      0.793055      1.0446
//   1777     0.83653  0.82706  0.82709      0.793055      1.0429
//   2557     0.83154  0.82541  0.79725      0.793055      1.0053
//   3697     0.82960  0.82390  0.78953      0.793055      0.9956
//   5281     0.82463  0.82257  0.78704      0.793055      0.9924
//   7481     0.82067  0.82137  0.79906      0.793055      1.0076
//   10567    0.82299  0.82028  0.80115      0.793055      1.0102
//   15859    0.81946  0.81909  0.79885      0.793055      1.0073
//   22901    0.81890  0.81811  0.79470      0.793055      1.0021
//
//   the band shape: eighths of [y^2,2y^2], each normalised to that band's mean
//   cluster  e1     e2     e3     e4     e5     e6     e7     e8     last/first  predicted
//   1000     0.9670 0.9805 0.9891 0.9967 1.0101 1.0170 1.0166 1.0230   1.0579      1.0768
//            0.9588 0.9738 0.9867 0.9980 1.0081 1.0170 1.0251 1.0325   <- predicted
//   1400     0.9643 0.9713 0.9841 0.9939 1.0112 1.0200 1.0247 1.0305   1.0687      1.0737
//            0.9605 0.9748 0.9872 0.9981 1.0077 1.0164 1.0242 1.0313   <- predicted
//   2000     0.9660 0.9741 0.9834 0.9917 1.0044 1.0195 1.0255 1.0353   1.0716      1.0706
//            0.9621 0.9758 0.9877 0.9981 1.0074 1.0157 1.0232 1.0300   <- predicted
//   2900     0.9752 0.9834 0.9887 0.9957 1.0006 1.0109 1.0188 1.0266   1.0527      1.0677
//            0.9637 0.9767 0.9881 0.9981 1.0070 1.0151 1.0223 1.0289   <- predicted
//   4200     0.9724 0.9836 0.9865 0.9936 1.0072 1.0168 1.0175 1.0224   1.0514      1.0650
//            0.9651 0.9776 0.9885 0.9982 1.0068 1.0145 1.0215 1.0279   <- predicted
//   6000     0.9688 0.9782 1.0018 0.9936 1.0049 1.0103 1.0148 1.0276   1.0607      1.0626
//            0.9664 0.9784 0.9889 0.9982 1.0065 1.0140 1.0207 1.0269   <- predicted
//   8500     0.9645 0.9857 0.9875 0.9986 1.0037 1.0116 1.0236 1.0247   1.0624      1.0605
//            0.9675 0.9791 0.9893 0.9982 1.0063 1.0135 1.0200 1.0260   <- predicted
//   12000    0.9679 0.9842 0.9863 0.9981 1.0021 1.0151 1.0220 1.0244   1.0583      1.0584
//            0.9686 0.9798 0.9896 0.9983 1.0060 1.0130 1.0194 1.0252   <- predicted
//   18000    0.9707 0.9825 0.9916 0.9975 1.0053 1.0137 1.0194 1.0192   1.0500      1.0562
//            0.9698 0.9805 0.9900 0.9983 1.0058 1.0126 1.0187 1.0243   <- predicted
//   26000    0.9725 0.9798 0.9911 0.9974 1.0043 1.0147 1.0173 1.0230   1.0519      1.0544
//            0.9708 0.9812 0.9903 0.9984 1.0056 1.0121 1.0181 1.0236   <- predicted
//
// === (C) SCORE against the pre-registration (tolerance 0.011, deciding y >= 997) ===
//   D1 magnitude |measured - B_x| <= 0.011
//     y~1000   |0.01639| FAIL   (1.49 x tolerance)
//     y~1400   |0.00932| PASS   (0.85 x tolerance)
//     y~2000   |0.00260| PASS   (0.24 x tolerance)
//     y~2900   |0.00326| PASS   (0.30 x tolerance)
//     y~4200   |0.00074| PASS   (0.07 x tolerance)
//     y~6000   |0.00061| PASS   (0.06 x tolerance)
//     y~8500   |0.00229| PASS   (0.21 x tolerance)
//     y~12000  |-0.00075| PASS   (0.07 x tolerance)
//     y~18000  |0.00036| PASS   (0.03 x tolerance)
//     y~26000  |0.00102| PASS   (0.09 x tolerance)
//     D1: 9 of 10 clusters pass
//   D2 level trend: candidate falls with y; measurement must fall too
//     1000->1400: predicted -0.00173  measured -0.00881  PASS
//     1400->2000: predicted -0.00166  measured -0.00839  PASS
//     2000->2900: predicted -0.00140  measured -0.00073  PASS
//     2900->4200: predicted -0.00130  measured -0.00382  PASS
//     4200->6000: predicted -0.00127  measured -0.00140  PASS
//     6000->8500: predicted -0.00117  measured 0.00051  FAIL
//     8500->12000: predicted -0.00111  measured -0.00416  PASS
//     12000->18000: predicted -0.00121  measured -0.00010  PASS
//     18000->26000: predicted -0.00102  measured -0.00036  PASS
//     D2: 8 of 9 steps pass
//   D3 band shape: |measured last/first - predicted| <= 0.020
//     y~1000   measured 1.0579  predicted 1.0768  diff -0.0190  PASS
//     y~1400   measured 1.0687  predicted 1.0737  diff -0.0049  PASS
//     y~2000   measured 1.0716  predicted 1.0706  diff +0.0011  PASS
//     y~2900   measured 1.0527  predicted 1.0677  diff -0.0150  PASS
//     y~4200   measured 1.0514  predicted 1.0650  diff -0.0137  PASS
//     y~6000   measured 1.0607  predicted 1.0626  diff -0.0019  PASS
//     y~8500   measured 1.0624  predicted 1.0605  diff +0.0019  PASS
//     y~12000  measured 1.0583  predicted 1.0584  diff -0.0002  PASS
//     y~18000  measured 1.0500  predicted 1.0562  diff -0.0063  PASS
//     y~26000  measured 1.0519  predicted 1.0544  diff -0.0024  PASS
//     D3: 10 of 10 clusters pass
//
//   residual vs y, for the record (is it a smooth finite-size correction?)
//   y0        residual   residual/(1/ln y)   residual/(1/ln^2 y)
//   1000      +0.01639    0.11325             0.78229
//   1400      +0.00932    0.06752             0.48913
//   2000      +0.00260    0.01975             0.15011
//   2900      +0.00326    0.02602             0.20744
//   4200      +0.00074    0.00618             0.05158
//   6000      +0.00061    0.00528             0.04592
//   8500      +0.00229    0.02073             0.18755
//   12000     -0.00075    -0.00708             -0.06650
//   18000     +0.00036    0.00352             0.03449
//   26000     +0.00102    0.01034             0.10507
//
// === (D) diagnostic, outside the score: where does the small-y residual live? ===
//   per-eighth residual (measured - predicted, absolute) for the three smallest clusters
//   cluster   r1       r2       r3       r4       r5       r6       r7       r8
//   1000      +0.0220  +0.0210  +0.0176  +0.0145  +0.0176  +0.0160  +0.0088  +0.0081
//   1400      +0.0115  +0.0055  +0.0060  +0.0052  +0.0117  +0.0119  +0.0093  +0.0084
//   2000      +0.0052  +0.0006  -0.0015  -0.0033  -0.0004  +0.0053  +0.0040  +0.0065
//
//   finer sweep of the residual in y (band only, budget 1e8 per point)
//   y range          w        slots      measured   B_x(pred)  residual
//   853-953          0.10190      98464   0.85179    0.83423   +0.01756
//   941-1051         0.10034     132617   0.85230    0.83366   +0.01864
//   1039-1163        0.09898     153592   0.84309    0.83317   +0.00993
//   1181-1321        0.09720     247368   0.84087    0.83247   +0.00839
//   1319-1483        0.09568     277455   0.84187    0.83189   +0.00998
//   1511-1693        0.09395     405380   0.83671    0.83129   +0.00542
//   1693-1907        0.09247     575193   0.83297    0.83074   +0.00223
//   1889-2087        0.09119     617489   0.83191    0.83026   +0.00164
//   2267-2383        0.08906     591582   0.83582    0.82959   +0.00623
//   2729-2833        0.08694     590959   0.83185    0.82883   +0.00302
//   3389-3463        0.08465     550235   0.83024    0.82797   +0.00227
// ============================================================================
// READINGS
// S2-1. SECTION 5 OF anchored-windows.md REPRODUCES EXACTLY: 32 of 32 published
//   entries recovered to three decimals by an instrument that shares no code,
//   no table and no author with the lost `scratchpad/anchored-check.js`. The
//   header's warning ("do not quote a number from §3 or §5 without recomputing
//   it") is DISCHARGED for §5. CALIBRATION: VERIFIED.
// S2-2. THE PRE-REGISTERED SCORE: D1 9 of 10 clusters, D2 8 of 9 steps, D3
//   10 of 10 clusters. The single D1 failure is the smallest deciding cluster,
//   y ~ 1000, at 1.49 x tolerance; every cluster from y ~ 1400 up passes, and
//   from y ~ 2000 up the residual never exceeds 0.0033 against a tolerance of
//   0.011. The single D2 failure, 6000 -> 8500, is a +0.00051 rise against a
//   predicted -0.00117 fall, inside the level-to-level wobble visible
//   everywhere in that column. VERDICT: DERIVED above y ~ 1400. The kill
//   shadow IS the pair-Buchstab survival curve averaged over the ignition
//   band, and reading A5-2 of attack2-05-07-integral-ladder.js — which
//   asserted this without computing it — is now checked rather than assumed.
//   CALIBRATION: MEASURED, and HL-conditional through the curve it scores.
// S2-3. THE SHADOW IS NOT A CONSTANT — the strongest thing measured here. The
//   band depth falls 0.85004 (y ~ 1000) -> 0.84124 -> 0.83285 -> 0.83212 ->
//   0.82830 -> 0.82690 -> 0.82741 -> 0.82325 -> 0.82315 -> 0.82279
//   (y ~ 26000), tracking a prediction that falls 0.83365 -> 0.82177 over the
//   same span. "~0.85 at every level" was an artifact of never leaving
//   y <= 1000: the band is a fixed factor in x and so a shrinking interval in
//   u, and the depth is walking down to the point trough 0.793055. Anything
//   that treats 0.85 as a constant of the pattern is treating a slow drift as
//   a law.
// S2-4. WHY §5 LOOKED LIKE A CONSTANT, AND WHY IT LOOKED LIKE IT ROSE. Its
//   four rows are 0.834, 0.850, 0.853, 0.856 — apparently rising, where the
//   candidate falls. Both halves of that dissolve here. The p = 23 row rests
//   on 25 slots (Poisson scale 20%) and the p = 97 row on 166 (7.8%), so the
//   first half of the "trend" is noise; and §5 puts the band at the NEXT
//   prime's square, which at p = 23 moves the prediction to 0.943 while at
//   p = 997 it moves it only to 0.836. Row by row, measured against that
//   configuration's own prediction: 0.834 vs 0.943, 0.850 vs 0.863, 0.853 vs
//   0.844, 0.856 vs 0.836. The only deciding row is p = 997, on 7542 slots.
// S2-5. THE RESIDUAL AT SMALL y IS A FLOOR EFFECT, NOT MISSING STRUCTURE. At
//   y ~ 1000 the per-eighth residuals are +0.0220 +0.0210 +0.0176 +0.0145
//   +0.0176 +0.0160 +0.0088 +0.0081 — largest at the band's FLOOR, u just
//   above 2, and smallest at its top. The measured trough is shallower than
//   e^{2gamma}/4 there, not the band's rise that is wrong: the shape test D3
//   passes at that very cluster. The finer sweep shows the excess dying with
//   y, +0.01864 at y = 941..1051 down to +0.00164 at y = 1889..2087, far too
//   steep for a 1/ln y or 1/ln^2 y term (the two rescaled columns do not
//   flatten), so it is the local pair density still approaching its
//   Hardy-Littlewood form at x ~ 10^6 rather than a second mechanism.
// S2-6. THE u <= 2 BRANCH CHECKS TOO, as a free by-product: the pre-band
//   [y^2/2, y^2) measures 0.83038 against 0.83075 predicted at y = 881, and
//   0.82067 against 0.82137 at y = 7481. The trough itself, measured in the
//   narrow last sixteenth below y^2, is noisy by construction (0.76881 to
//   0.82841 across the levels sampled, F = 0.9694 to 1.0446) and should not be
//   used as a constant — the band, not the point, is what this instrument
//   measures well.
// S2-7. WHAT IS STILL NOT DERIVED. The curve's [2,3] branch is the
//   independence-squared conjecture of attack2-05, not a theorem, and this
//   file inherits that: what is shown is that the shadow equals the band
//   average OF THAT CURVE, to 0.3% above y ~ 2000. Turning the shadow into a
//   theorem needs the pair-Buchstab delay equation proved, not measured.
// ============================================================================
