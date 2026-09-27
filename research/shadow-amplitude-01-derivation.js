'use strict';
// ============================================================================
// SHADOW-AMPLITUDE 01 — THE FINITE-y CORRECTION TO THE KILL SHADOW'S DEPTH,
// DERIVED. PURE COMPUTATION: no measured datum enters this file.
// (2026-08-19. Pre-registration: research/history/staging/shadow-amplitude-prereg.md,
//  committed alone before this file existed.)
// ============================================================================
// THE OPEN NUMBER. `adversary-wave2.md` §1 correction 2: the shadow's depth
// SHAPE is right (drift coefficient 2 - 1/ln 2, D3 10 of 10) but the drift's
// AMPLITUDE is not — measured -0.03207 against a predicted -0.01211 on the
// ladder binning, ratio 2.648. The record's candidate explanation was that the
// local pair density has not reached its Hardy-Littlewood form at x ~ 10^6.
//
// THE DERIVATION. `shadow-buchstab-02-instrument.js` divides every count by the
// EXACT tile density delta(y) = (1/2) prod_{2<p<=y}(1 - 2/p). The curve it
// scores against, rho(u) = (e^gamma omega(u))^2, is normalised against the
// ASYMPTOTIC one. Using (1 - 2/p) = (1 - 1/(p-1)^2)(1 - 1/p)^2:
//
//     delta(y)     = 2 C2 M(y)^2 / A(y),        M(y) = prod_{p<=y}(1 - 1/p)
//     delta_inf(y) = 2 C2 e^{-2 gamma}/(ln y)^2, A(y) = prod_{p>y}(1-1/(p-1)^2)
//     K(y) := delta(y)/delta_inf(y) = (e^gamma M(y) ln y)^2 / A(y)
//
// K is the second-order term of the pair-Mertens product over exactly the prime
// range the band sieves: the SQUARE of the Mertens partial-product error,
// divided by the twin-constant tail. And delta_inf . rho is the exact
// Hardy-Littlewood local pair density — at u = 2,
// delta_inf . e^{2gamma}/4 = 2 C2/(2 ln y)^2 = 2 C2/(ln x)^2. Hence
//
//     measured(y) = lambda(y) . B_x(y) / K(y),
//
// with lambda the ratio of the true local pair density to its HL form. The
// corrected prediction is B_x(y)/K(y) and it carries no free parameter.
//
// WHAT THIS FILE PRINTS. (A) the identity, checked to machine precision, and
// the decomposition of K into its Mertens and twin-tail halves. (B) K on the
// ten clusters of shadow-buchstab-02 part (B) and on the fifteen ladder rungs
// of adversary-wave2-01 part (C), rebuilt from their published designs, with
// B_x recomputed here by the same Simpson rule. (C) the corrected drift, and
// the counting floor the score will use. Every measured value that appears is
// a CITED constant, flagged as such, taken from an embedded output block.
// ============================================================================

const GAMMA = 0.5772156649015329;
const E2G = Math.exp(2 * GAMMA);
const C2 = 0.6601618158468695;            // twin prime constant, prod_{p>2}(1-1/(p-1)^2)
const omega = (u) => (1 + Math.log(u - 1)) / u;
const rho = (u) => (u <= 2 ? E2G / (u * u) : Math.pow(Math.exp(GAMMA) * omega(u), 2));

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const ALL = primesUpTo(40_000);
const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i*i <= n; i++) if (n % i === 0) return false; return true; };

function delta(y){ let d = 0.5; for (const p of ALL){ if (p === 2) continue; if (p > y) break; d *= (p - 2)/p; } return d; }
function mertens(y){ let m = 1; for (const p of ALL){ if (p > y) break; m *= (1 - 1/p); } return m; }
const deltaInf = (y) => 2*C2*Math.exp(-2*GAMMA)/Math.pow(Math.log(y), 2);
const K = (y) => delta(y)/deltaInf(y);

// the same Simpson rule shadow-buchstab-02 uses, so B_x reproduces exactly
function predWindow(y, a, b){
  const ln = Math.log(y), n = 400, h = (b - a)/n;
  let s = 0;
  for (let i = 0; i <= n; i++){
    const t = a + i*h, wt = (i === 0 || i === n) ? 1 : (i % 2 ? 4 : 2);
    s += wt * rho(Math.log(t)/ln);
  }
  return s * h / 3 / (b - a);
}

// ---- CITED, not recomputed: embedded columns of shadow-buchstab-02-instrument.js
//      part (B) and adversary-wave2-01-shadow.js part (C).
const MEAS = {1000:0.85004,1400:0.84124,2000:0.83285,2900:0.83212,4200:0.82830,
              6000:0.82690,8500:0.82741,12000:0.82325,18000:0.82315,26000:0.82279};
const NTOT = {1000:266735,1400:591384,2000:1417269,2900:2219418,4200:2052941,
              6000:1868376,8500:1945202,12000:1785182,18000:1840503,26000:1779677};
const LADMEAS = {1009:0.85431,1277:0.84311,1597:0.83805,2003:0.83232,2521:0.83246,
                 3181:0.83118,4001:0.82851,5051:0.82598,6353:0.82460,8009:0.82688,
                 10079:0.82400,12703:0.82368,16001:0.82306,20161:0.82274,25409:0.82224};

// ============================ (A) the identity =============================
console.log('=== (A) delta(y) = 2 C2 M(y)^2 / A(y), and K = (e^gamma M ln y)^2 / A ===');
console.log('  A(y) = prod_{p>y}(1-1/(p-1)^2) is computed as C2 / prod_{2<p<=y}(1-1/(p-1)^2)');
console.log('  y        delta(y)        2C2 M^2/A       rel.diff    (e^g M ln y)^2   1/A(y)      K(y)        1/K - 1');
for (const y of [101, 1009, 2003, 5051, 10079, 22901, 39989]){
  let tw = 1; for (const p of ALL){ if (p === 2) continue; if (p > y) break; tw *= 1 - 1/((p-1)*(p-1)); }
  const A = C2/tw, M = mertens(y), d = delta(y), id = 2*C2*M*M/A;
  const eM2 = Math.pow(Math.exp(GAMMA)*M*Math.log(y), 2);
  console.log(`  ${String(y).padEnd(9)}${d.toExponential(8)}  ${id.toExponential(8)}  ${((d-id)/d).toExponential(2)}   ${eM2.toFixed(9)}      ${(1/A).toFixed(9)}   ${K(y).toFixed(9)}  ${(1/K(y)-1).toFixed(6)}`);
}
console.log('  the two halves: 1 - (e^g M ln y)^2 is the squared Mertens error and carries K;');
console.log('  1/A(y) - 1 = sum_{p>y} 1/(p-1)^2 + ... is the twin-constant tail and is O(1/(y ln y)).');

// ================= (B) K on the two published binnings ======================
console.log('\n=== (B) the correction on the ten clusters of shadow-buchstab-02 part (B) ===');
console.log('  design rebuilt from that file: centres, pool [0.88 y0, 1.12 y0], budget 4e8');
const CENTRES = [1000,1400,2000,2900,4200,6000,8500,12000,18000,26000], BUDGET = 4.0e8;
const rows = [];
for (const y0 of CENTRES){
  const pool = ALL.filter(p => p >= 0.88*y0 && p <= 1.12*y0);
  const ys = []; let tot = 0;
  for (const p of pool){ if (tot > BUDGET && ys.length) break; ys.push(p); tot += p*p; }
  let sB = 0, sBc = 0, sK = 0;
  for (const y of ys){ const P = predWindow(y, y*y, 2*y*y); sB += P; sBc += P/K(y); sK += 1/K(y); }
  const n = ys.length, lo = ys[0]*ys[0], hi = 2*ys[n-1]*ys[n-1];
  const Nest = Math.round(delta(ys[0])*(hi-lo)*MEAS[y0]);
  rows.push({ y0, n, ys, B: sB/n, Bc: sBc/n, invK: sK/n, lo, hi, L: hi-lo, Nest,
              m: MEAS[y0], se: MEAS[y0]/Math.sqrt(Nest), seOld: MEAS[y0]/Math.sqrt(NTOT[y0]) });
}
console.log('  y0     lev range          B_x       mean 1/K   B_corr     measured*  res_old*   res_corr*');
for (const r of rows)
  console.log(`  ${String(r.y0).padEnd(6)}${String(r.n).padStart(3)} ${(r.ys[0]+'-'+r.ys[r.n-1]).padEnd(14)}${r.B.toFixed(5)}   ${r.invK.toFixed(5)}    ${r.Bc.toFixed(5)}    ${r.m.toFixed(5)}   ${((r.m-r.B>=0?'+':'')+(r.m-r.B).toFixed(5)).padStart(8)}   ${((r.m-r.Bc>=0?'+':'')+(r.m-r.Bc).toFixed(5)).padStart(8)}`);
console.log('  * cited from the embedded output of shadow-buchstab-02-instrument.js, not remeasured');
console.log('    (B_x above reproduces that file\'s own B_x column, which is the check that the');
console.log('     cluster design and the quadrature were rebuilt faithfully)');

console.log('\n  the counting floor, and why the record\'s is too small');
console.log('  y0      union [y_min^2, 2 y_max^2]        length     Ntot(pooled)  oversample  N_dist(est)  se_old    se_eff(est)');
for (const r of rows)
  console.log(`  ${String(r.y0).padEnd(7)} [${String(r.lo).padStart(11)}, ${String(r.hi).padStart(11)}]  ${r.L.toExponential(3)}  ${String(NTOT[r.y0]).padStart(10)}   ${(NTOT[r.y0]/r.Nest).toFixed(2)}x       ${String(r.Nest).padStart(9)}   ${r.seOld.toFixed(5)}   ${r.se.toFixed(5)}`);

console.log('\n=== (B2) the ladder binning of adversary-wave2-01 part (C), one prime per rung ===');
const LADDER = []; for (let k = 0; k <= 14; k++){ let t = Math.round(1000*Math.pow(2,k/3)); while (!isPrime(t)) t++; LADDER.push(t); }
console.log('  y        B_x       1/K       B_corr    measured*  res_old*  res_corr*');
const lad = [];
for (const y of LADDER){
  const B = predWindow(y, y*y, 2*y*y), Bc = B/K(y), m = LADMEAS[y];
  lad.push({ y, B, Bc, m });
  console.log(`  ${String(y).padEnd(9)}${B.toFixed(5)}   ${(1/K(y)).toFixed(5)}   ${Bc.toFixed(5)}   ${m.toFixed(5)}   ${((m-B>=0?'+':'')+(m-B).toFixed(5)).padStart(8)}  ${((m-Bc>=0?'+':'')+(m-Bc).toFixed(5)).padStart(8)}`);
}

// ===================== (C) the corrected amplitude ==========================
console.log('\n=== (C) the drift, corrected — criterion C1 of the pre-registration ===');
const sg = (r) => r.se;
function report(tag, dm, dp, s){
  const R = dm/dp, lo2 = (dm - 2*s)/dp, hi2 = (dm + 2*s)/dp;
  const a = Math.min(lo2, hi2), b = Math.max(lo2, hi2);
  console.log(`  ${tag.padEnd(46)} ratio ${R.toFixed(3).padStart(6)}   2-sigma [${a.toFixed(3)}, ${b.toFixed(3)}]   1 inside: ${a <= 1 && 1 <= b}`);
}
{
  const a = rows[0], b = rows[2], z = rows[9];
  const s1 = Math.sqrt(sg(a)**2 + sg(z)**2), s2 = Math.sqrt(sg(b)**2 + sg(z)**2);
  console.log(`  full span y~1000 -> y~26000: measured drift ${(z.m-a.m).toFixed(5)}, sigma ${s1.toFixed(5)}`);
  report('    against B_x        (pred ' + (z.B-a.B).toFixed(5) + ')', z.m-a.m, z.B-a.B, s1);
  report('    against B_corr     (pred ' + (z.Bc-a.Bc).toFixed(5) + ')', z.m-a.m, z.Bc-a.Bc, s1);
  console.log(`  y >= 2000, y~2000 -> y~26000: measured drift ${(z.m-b.m).toFixed(5)}, sigma ${s2.toFixed(5)}`);
  report('    against B_x        (pred ' + (z.B-b.B).toFixed(5) + ')', z.m-b.m, z.B-b.B, s2);
  report('    against B_corr     (pred ' + (z.Bc-b.Bc).toFixed(5) + ')', z.m-b.m, z.Bc-b.Bc, s2);
  const l0 = lad[0], l1 = lad[14];
  const sl = Math.sqrt(Math.pow(l0.m/Math.sqrt(delta(l0.y)*l0.y*l0.y*l0.m),2) + Math.pow(l1.m/Math.sqrt(delta(l1.y)*l1.y*l1.y*l1.m),2));
  console.log(`  ladder y=1009 -> y=25409: measured drift ${(l1.m-l0.m).toFixed(5)}, sigma ${sl.toFixed(5)} (single bands, no pooling)`);
  report('    against B_x        (pred ' + (l1.B-l0.B).toFixed(5) + ')', l1.m-l0.m, l1.B-l0.B, sl);
  report('    against B_corr     (pred ' + (l1.Bc-l0.Bc).toFixed(5) + ')', l1.m-l0.m, l1.Bc-l0.Bc, sl);
}

console.log('\n  per-cluster standardised residuals — criterion C2 (provisional sigma)');
console.log('  y0       res_old/se_eff   res_corr/se_eff');
let s0 = 0, sc = 0, q0 = 0, qc = 0;
for (const r of rows){
  const a = (r.m - r.B)/r.se, b = (r.m - r.Bc)/r.se;
  s0 += a; sc += b; q0 += a*a; qc += b*b;
  console.log(`  ${String(r.y0).padEnd(8)} ${a.toFixed(2).padStart(8)}         ${b.toFixed(2).padStart(8)}`);
}
console.log(`  mean            ${(s0/10).toFixed(3).padStart(8)}         ${(sc/10).toFixed(3).padStart(8)}`);
console.log(`  sum of squares  ${q0.toFixed(2).padStart(8)}         ${qc.toFixed(2).padStart(8)}    (10 clusters)`);

console.log('\n  frozen blind prediction for criterion C3: lambda_pre(cluster) should equal mean 1/K');
console.log('  ' + rows.map(r => r.invK.toFixed(5)).join('  '));

console.log('\n  the record\'s "too steep for 1/ln y" residual, re-read against 1/K');
console.log('  the finer sweep of shadow-buchstab-02 part (D) used +-6% pools and a 1e8 budget');
console.log('  y-range         mean 1/K - 1   measured residual*   residual - (B_x/K - B_x)');
const SWEEP = {900:0.01756,1000:0.01864,1100:0.00993,1250:0.00839,1400:0.00998,1600:0.00542,
               1800:0.00223,2000:0.00164,2400:0.00623,2900:0.00302,3600:0.00227};
for (const y0 of Object.keys(SWEEP).map(Number)){
  const pool = ALL.filter(p => p >= 0.94*y0 && p <= 1.06*y0);
  const ys = []; let tot = 0;
  for (const p of pool){ if (tot > 1.0e8 && ys.length) break; ys.push(p); tot += p*p; }
  let sK = 0, sB = 0;
  for (const y of ys){ sK += 1/K(y) - 1; sB += predWindow(y, y*y, 2*y*y); }
  const ik = sK/ys.length, B = sB/ys.length;
  console.log(`  ${(ys[0]+'-'+ys[ys.length-1]).padEnd(15)} ${ik.toFixed(5)}        ${('+'+SWEEP[y0].toFixed(5)).padStart(9)}            ${((SWEEP[y0]-B*ik>=0?'+':'')+(SWEEP[y0]-B*ik).toFixed(5)).padStart(9)}`);
}
console.log('  * cited from the embedded output of shadow-buchstab-02-instrument.js part (D)');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/shadow-amplitude-01-derivation.js
//   invocation:  node research/shadow-amplitude-01-derivation.js
//   code-sha256: 9336374a27e44b37d87a117a638bef44aa04afd5a9385f0622a259093964317b
//   out-sha256:  568c29463a00795e5088489da8edb4f4c6ac1979bc04f21cab692cfe31994e98
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// === (A) delta(y) = 2 C2 M(y)^2 / A(y), and K = (e^gamma M ln y)^2 / A ===
//   A(y) = prod_{p>y}(1-1/(p-1)^2) is computed as C2 / prod_{2<p<=y}(1-1/(p-1)^2)
//   y        delta(y)        2C2 M^2/A       rel.diff    (e^g M ln y)^2   1/A(y)      K(y)        1/K - 1
//   101      1.87693419e-2  1.87693419e-2  -5.55e-16   0.958832150      1.001740681   0.960501171  0.041123
//   1009     8.63915722e-3  8.63915722e-3  -3.01e-15   0.992885390      1.000126148   0.993010641  0.007039
//   2003     7.15932670e-3  7.15932670e-3  -1.33e-15   0.994102797      1.000058097   0.994160551  0.005874
//   5051     5.70345448e-3  5.70345448e-3  0.00e+0   0.996412149      1.000020813   0.996432888  0.003580
//   10079    4.88662633e-3  4.88662633e-3  1.77e-16   0.997655941      1.000009737   0.997665656  0.002340
//   22901    4.12424163e-3  4.12424163e-3  3.58e-15   0.998620542      1.000003971   0.998624508  0.001377
//   39989    3.70325656e-3  3.70325656e-3  2.01e-14   0.999031090      1.000002165   0.999033254  0.000968
//   the two halves: 1 - (e^g M ln y)^2 is the squared Mertens error and carries K;
//   1/A(y) - 1 = sum_{p>y} 1/(p-1)^2 + ... is the twin-constant tail and is O(1/(y ln y)).
//
// === (B) the correction on the ten clusters of shadow-buchstab-02 part (B) ===
//   design rebuilt from that file: centres, pool [0.88 y0, 1.12 y0], budget 4e8
//   y0     lev range          B_x       mean 1/K   B_corr     measured*  res_old*   res_corr*
//   1000   36 881-1117      0.83365   1.00967    0.84171    0.85004   +0.01639   +0.00833
//   1400   45 1237-1567     0.83192   1.00728    0.83797    0.84124   +0.00932   +0.00327
//   2000   59 1777-2239     0.83025   1.00584    0.83510    0.83285   +0.00260   -0.00225
//   2900   53 2557-2963     0.82886   1.00520    0.83317    0.83212   +0.00326   -0.00105
//   4200   28 3697-3919     0.82756   1.00429    0.83111    0.82830   +0.00074   -0.00281
//   6000   14 5281-5413     0.82629   1.00218    0.82809    0.82690   +0.00061   -0.00119
//   8500    8 7481-7529     0.82512   1.00163    0.82647    0.82741   +0.00229   +0.00094
//   12000   4 10567-10601   0.82401   1.00223    0.82585    0.82325   -0.00076   -0.00260
//   18000   2 15859-15877   0.82279   1.00207    0.82449    0.82315   +0.00036   -0.00134
//   26000   1 22901-22901   0.82177   1.00138    0.82290    0.82279   +0.00102   -0.00011
//   * cited from the embedded output of shadow-buchstab-02-instrument.js, not remeasured
//     (B_x above reproduces that file's own B_x column, which is the check that the
//      cluster design and the quadrature were rebuilt faithfully)
//
//   the counting floor, and why the record's is too small
//   y0      union [y_min^2, 2 y_max^2]        length     Ntot(pooled)  oversample  N_dist(est)  se_old    se_eff(est)
//   1000    [     776161,     2495378]  1.719e+6      266735   20.38x           13088   0.00165   0.00743
//   1400    [    1530169,     4910978]  3.381e+6      591384   25.58x           23119   0.00109   0.00553
//   2000    [    3157729,    10026242]  6.869e+6     1417269   33.56x           42229   0.00070   0.00405
//   2900    [    6538249,    17558738]  1.102e+7     2219418   35.99x           61673   0.00056   0.00335
//   4200    [   13667809,    30717122]  1.705e+7     2052941   23.68x           86706   0.00058   0.00281
//   6000    [   27888961,    58601138]  3.071e+7     1868376   13.02x          143450   0.00060   0.00218
//   8500    [   55965361,   113371682]  5.741e+7     1945202   7.84x          248116   0.00059   0.00166
//   12000   [  111661489,   224762402]  1.131e+8     1785182   3.96x          450341   0.00062   0.00123
//   18000   [  251507881,   504158258]  2.527e+8     1840503   1.99x          923440   0.00061   0.00086
//   26000   [  524455801,  1048911602]  5.245e+8     1779677   1.00x         1779680   0.00062   0.00062
//
// === (B2) the ladder binning of adversary-wave2-01 part (C), one prime per rung ===
//   y        B_x       1/K       B_corr    measured*  res_old*  res_corr*
//   1009     0.83361   1.00704   0.83947   0.85431   +0.02070  +0.01484
//   1277     0.83238   1.00571   0.83714   0.84311   +0.01073  +0.00597
//   1597     0.83129   1.00714   0.83723   0.83805   +0.00676  +0.00082
//   2003     0.83024   1.00587   0.83512   0.83232   +0.00208  -0.00280
//   2521     0.82924   1.00408   0.83262   0.83246   +0.00322  -0.00016
//   3181     0.82827   1.00295   0.83071   0.83118   +0.00291  +0.00047
//   4001     0.82737   1.00349   0.83026   0.82851   +0.00114  -0.00175
//   5051     0.82650   1.00358   0.82946   0.82598   -0.00052  -0.00348
//   6353     0.82568   1.00355   0.82861   0.82460   -0.00108  -0.00401
//   8009     0.82490   1.00196   0.82652   0.82688   +0.00198  +0.00036
//   10079    0.82416   1.00234   0.82609   0.82400   -0.00016  -0.00209
//   12703    0.82345   1.00207   0.82515   0.82368   +0.00023  -0.00147
//   16001    0.82277   1.00216   0.82455   0.82306   +0.00029  -0.00149
//   20161    0.82212   1.00136   0.82324   0.82274   +0.00062  -0.00050
//   25409    0.82150   1.00111   0.82241   0.82224   +0.00074  -0.00017
//
// === (C) the drift, corrected — criterion C1 of the pre-registration ===
//   full span y~1000 -> y~26000: measured drift -0.02725, sigma 0.00746
//       against B_x        (pred -0.01188)         ratio  2.294   2-sigma [1.039, 3.549]   1 inside: false
//       against B_corr     (pred -0.01881)         ratio  1.449   2-sigma [0.656, 2.242]   1 inside: true
//   y >= 2000, y~2000 -> y~26000: measured drift -0.01006, sigma 0.00410
//       against B_x        (pred -0.00848)         ratio  1.186   2-sigma [0.219, 2.153]   1 inside: true
//       against B_corr     (pred -0.01219)         ratio  0.825   2-sigma [0.153, 1.497]   1 inside: true
//   ladder y=1009 -> y=25409: measured drift -0.03207, sigma 0.00987 (single bands, no pooling)
//       against B_x        (pred -0.01211)         ratio  2.648   2-sigma [1.018, 4.278]   1 inside: false
//       against B_corr     (pred -0.01707)         ratio  1.879   2-sigma [0.722, 3.036]   1 inside: true
//
//   per-cluster standardised residuals — criterion C2 (provisional sigma)
//   y0       res_old/se_eff   res_corr/se_eff
//   1000         2.21             1.12
//   1400         1.69             0.59
//   2000         0.64            -0.55
//   2900         0.97            -0.31
//   4200         0.26            -1.00
//   6000         0.28            -0.54
//   8500         1.38             0.57
//   12000       -0.62            -2.12
//   18000        0.42            -1.57
//   26000        1.65            -0.18
//   mean               0.888           -0.400
//   sum of squares     14.39            10.60    (10 clusters)
//
//   frozen blind prediction for criterion C3: lambda_pre(cluster) should equal mean 1/K
//   1.00967  1.00728  1.00584  1.00520  1.00429  1.00218  1.00163  1.00223  1.00207  1.00138
//
//   the record's "too steep for 1/ln y" residual, re-read against 1/K
//   the finer sweep of shadow-buchstab-02 part (D) used +-6% pools and a 1e8 budget
//   y-range         mean 1/K - 1   measured residual*   residual - (B_x/K - B_x)
//   853-953         0.00999         +0.01756             +0.00922
//   941-1051        0.00880         +0.01864             +0.01130
//   1039-1163       0.01063         +0.00993             +0.00107
//   1181-1321       0.00881         +0.00839             +0.00105
//   1319-1483       0.00630         +0.00998             +0.00474
//   1511-1693       0.00826         +0.00542             -0.00144
//   1693-1907       0.00721         +0.00223             -0.00376
//   1889-2087       0.00549         +0.00164             -0.00292
//   2267-2383       0.00499         +0.00623             +0.00209
//   2729-2833       0.00626         +0.00302             -0.00217
//   3389-3463       0.00318         +0.00227             -0.00036
//   * cited from the embedded output of shadow-buchstab-02-instrument.js part (D)
// ============================================================================
// READINGS
// A1-1. THE CORRECTION IS AN IDENTITY, NOT A MODEL. delta(y) = 2 C2 M(y)^2/A(y)
//   holds to 2.01e-14 relative at the widest level checked and to 5.55e-16 at
//   the narrowest, so K(y) = (e^gamma M(y) ln y)^2 / A(y) exactly. The
//   instrument normalises every count by the EXACT delta(y) and scores it
//   against a curve normalised by the asymptotic one; K is the whole of the
//   difference, and the corrected prediction B_x/K carries no free parameter
//   and no fitted constant. CALIBRATION: the identity is algebra; the
//   arithmetic is VERIFIED here.
// A1-2. K IS THE SQUARED MERTENS ERROR AND ALMOST NOTHING ELSE. At y = 1009 the
//   two halves are (e^gamma M ln y)^2 = 0.992885390 and 1/A(y) = 1.000126148,
//   so the Mertens partial product carries essentially all of the 0.007039
//   correction and the twin-constant tail carries 1.8% of it; by y = 22901 that
//   tail is 1.000003971. The "second-order term of the pair-Mertens product
//   over the prime range the band sieves" IS the derived correction. It falls
//   0.041123 at y = 101 to 0.000968 at y = 39989, and it is driven by the
//   prime-counting fluctuation inside M(y), not by any power of 1/ln y — which
//   is why the record's attempt to fit the residual with 1/ln y or 1/ln^2 y
//   could not work whichever way the amplitude came out.
// A1-3. THE CORRECTED PREDICTION, FROZEN. B_corr runs 0.84171 at y ~ 1000 down
//   to 0.82290 at y ~ 26000, against B_x's 0.83365 to 0.82177. The B_x column
//   reproduces shadow-buchstab-02-instrument.js's own, which is the check that
//   the cluster design and the quadrature were rebuilt faithfully here. On the
//   provisional floor the mean standardised residual moves from +0.888 to
//   -0.400 and the sum of squares from 14.39 to 10.60 over ten clusters.
// A1-4. THE RECORD'S COUNTING FLOOR IS THE POOLED TOTAL, AND POOLING
//   OVERSAMPLES. At y0 = 2900 the 53 bands cover one interval
//   [6538249, 17558738] and Ntot = 2219418 counts about 61673 distinct pairs:
//   35.99x. The printed se drops from 0.00335 to 0.00056, a six-fold
//   understatement, and it is worst exactly at the small-y clusters where the
//   residual is largest. Only the y ~ 26000 cluster, which is a single level,
//   has an honest 1.00x.
// A1-5. THE AMPLITUDE, ON THE PROVISIONAL FLOOR. Full span 2.294 -> 1.449 with
//   2-sigma [0.656, 2.242]; ladder 2.648 -> 1.879 with [0.722, 3.036]; y >= 2000
//   1.186 -> 0.825. The two uncorrected intervals [1.039, 3.549] and
//   [1.018, 4.278] exclude 1 and the corrected ones do not. The exact N_dist
//   that decides C1 is measured in shadow-amplitude-02-measure.js; these are
//   the estimates the pre-registration froze.
// A1-6. THE "TOO STEEP FOR 1/ln y" READING DISSOLVES. Subtract 1/K from the
//   eleven points of shadow-buchstab-02 part (D) and the column reads +0.00922
//   +0.01130 +0.00107 +0.00105 +0.00474 -0.00144 -0.00376 -0.00292 +0.00209
//   -0.00217 -0.00036: it changes sign three times and is not a decay at all.
//   The apparent eleven-fold fall from y ~ 1000 to y ~ 2000 was a smooth
//   1.7-fold fall in 1/K plus scatter, and the scatter's true size is A1-4's.
// ============================================================================
