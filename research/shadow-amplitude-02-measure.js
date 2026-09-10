'use strict';
// ============================================================================
// SHADOW-AMPLITUDE 02 — THE BLIND HALF: THE EFFECTIVE SAMPLE SIZE, THE
// EMPIRICAL LOCAL PAIR DENSITY, AND THE SCORE
// (2026-08-19. Pre-registration: research/history/staging/shadow-amplitude-prereg.md,
//  committed alone before this file existed.)
// ============================================================================
// WHAT IS MEASURED HERE, AND WHY IT IS NEW. Nothing in this file re-measures
// the ten cluster depths: those are embedded in
// `shadow-buchstab-02-instrument.js` and reproduced from independent code in
// `adversary-wave2-01-shadow.js`, and the standing compute rule says cite them.
// Two quantities the corpus has never measured are computed instead.
//
//  (A) N_dist, the number of DISTINCT pairs a cluster's bands sample. The
//      instrument pools 36 bands [y^2, 2y^2] at y0 = 1000, and those bands
//      cover one interval [881^2, 2*1117^2]; the same pair is counted up to
//      eighteen times, so `measured/sqrt(Ntot)` is not a counting floor. A pair
//      n is sampled iff n is y_lo-rough, y_lo the SMALLEST cluster level with
//      n < 2 y_lo^2 (roughness decreases in y, so the smallest covering level is
//      the weakest test). That makes N_dist one segmented pass: the levels
//      partition the union into [2 y_{j-1}^2, 2 y_j^2).
//
//  (B) The pre-band [y^2/2, y^2), POOLED over every level of every cluster.
//      Below y^2 a level-y slot is a twin prime and nothing else (a y-rough
//      composite needs two factors > y, hence exceeds y^2), so the pre-band's
//      model is the u <= 2 branch e^{2gamma}/u^2 — exact Hardy-Littlewood, with
//      no independence conjecture in it. Then
//          lambda_pre := measured_pre/pred_pre = lambda_twin / K,
//      which measures the empirical local pair density against its HL form at
//      each cluster's own scale, on integers DISJOINT from the band. This is
//      route (b) of the task: measurement where 01 is derivation.
//
//  (C) The score, C1 to C5 of the pre-registration.
//
// The correction under test, derived in `shadow-amplitude-01-derivation.js`:
//   K(y) = delta(y) (ln y)^2 e^{2gamma} / (2 C2),  corrected prediction B_x/K.
// ============================================================================

const GAMMA = 0.5772156649015329;
const E2G = Math.exp(2 * GAMMA);
const C2 = 0.6601618158468695;
const omega = (u) => (1 + Math.log(u - 1)) / u;
const rho = (u) => (u <= 2 ? E2G / (u * u) : Math.pow(Math.exp(GAMMA) * omega(u), 2));

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const ALL = primesUpTo(40_000);
function delta(y){ let d = 0.5; for (const p of ALL){ if (p === 2) continue; if (p > y) break; d *= (p - 2)/p; } return d; }
const K = (y) => delta(y)*Math.pow(Math.log(y),2)*E2G/(2*C2);
function predWindow(y, a, b){
  const ln = Math.log(y), n = 400, h = (b - a)/n;
  let s = 0;
  for (let i = 0; i <= n; i++){
    const t = a + i*h, wt = (i === 0 || i === n) ? 1 : (i % 2 ? 4 : 2);
    s += wt * rho(Math.log(t)/ln);
  }
  return s * h / 3 / (b - a);
}
const SEG = 1 << 22;
const buf = new Uint8Array(SEG);
function countSlots(y, lo, hi){            // level-y twin slots in [lo, hi)
  if (hi <= lo) return 0;
  let out = 0;
  for (let base = lo; base < hi; base += SEG){
    const top = Math.min(base + SEG, hi), len = top - base;
    buf.fill(0, 0, len);
    for (const p of ALL){
      if (p > y) break;
      let s = p - (base % p); if (s === p) s = 0;
      for (let j = s; j < len; j += p) buf[j] = 1;
      if (p > 2){ let t = ((p - 2 - (base % p)) % p + p) % p; for (let j = t; j < len; j += p) buf[j] = 1; }
    }
    for (let i = 0; i < len; i++) if (!buf[i]) out++;
  }
  return out;
}

// --- CITED, not recomputed: shadow-buchstab-02-instrument.js part (B), and
//     adversary-wave2-01-shadow.js part (C), both embedded and --check clean.
const MEAS = {1000:0.85004,1400:0.84124,2000:0.83285,2900:0.83212,4200:0.82830,
              6000:0.82690,8500:0.82741,12000:0.82325,18000:0.82315,26000:0.82279};
const NTOT = {1000:266735,1400:591384,2000:1417269,2900:2219418,4200:2052941,
              6000:1868376,8500:1945202,12000:1785182,18000:1840503,26000:1779677};
const LADM = {1009:0.85431, 25409:0.82224};

const CENTRES = [1000,1400,2000,2900,4200,6000,8500,12000,18000,26000], BUDGET = 4.0e8;
const clusters = [];
for (const y0 of CENTRES){
  const pool = ALL.filter(p => p >= 0.88*y0 && p <= 1.12*y0);
  const ys = []; let tot = 0;
  for (const p of pool){ if (tot > BUDGET && ys.length) break; ys.push(p); tot += p*p; }
  let sB = 0, sBc = 0, sK = 0;
  for (const y of ys){ const P = predWindow(y, y*y, 2*y*y); sB += P; sBc += P/K(y); sK += 1/K(y); }
  clusters.push({ y0, ys, n: ys.length, B: sB/ys.length, Bc: sBc/ys.length, invK: sK/ys.length, m: MEAS[y0] });
}

// ============ sanity: below y^2 a slot is a twin prime, nothing else ========
console.log('=== (0) the pre-band holds twin primes and nothing else — checked at one level ===');
{
  const y = 101, lo = Math.floor(y*y/2), hi = y*y;
  const comp = new Uint8Array(hi + 3);
  for (let i = 2; i*i <= hi + 2; i++) if (!comp[i]) for (let j = i*i; j <= hi + 2; j += i) comp[j] = 1;
  let tw = 0; for (let n = lo; n < hi; n++) if (!comp[n] && !comp[n+2]) tw++;
  console.log(`  y = ${y}, window [${lo}, ${hi}): level-y twin slots = ${countSlots(y, lo, hi)}, twin primes = ${tw}`);
  const y2 = 1009, lo2 = Math.floor(y2*y2/2), hi2 = y2*y2;
  const comp2 = new Uint8Array(hi2 + 3);
  for (let i = 2; i*i <= hi2 + 2; i++) if (!comp2[i]) for (let j = i*i; j <= hi2 + 2; j += i) comp2[j] = 1;
  let tw2 = 0, hl2 = 0;
  for (let n = lo2; n < hi2; n++){ if (!comp2[n] && !comp2[n+2]) tw2++; hl2 += 2*C2/Math.pow(Math.log(n), 2); }
  console.log(`  y = ${y2}, window [${lo2}, ${hi2}): level-y twin slots = ${countSlots(y2, lo2, hi2)}, twin primes = ${tw2}`);
  const d = delta(y2), len = hi2 - lo2;
  console.log(`    measured/fair = ${(tw2/(len*d)).toFixed(5)}, predicted = ${predWindow(y2, lo2, hi2).toFixed(5)},`);
  console.log(`    sum 2C2/(ln n)^2 = ${hl2.toFixed(1)} vs ${tw2} actual, lambda_twin = ${(tw2/hl2).toFixed(5)},`);
  console.log(`    and lambda_pre * K = ${((tw2/(len*d))/predWindow(y2, lo2, hi2)*K(y2)).toFixed(5)}  (must agree: the identity of section 1 of the prereg)`);
}

// ================== (A) the effective sample size, exactly ==================
console.log('\n=== (A) N_dist: how many DISTINCT pairs each cluster actually samples ===');
console.log('  y0      Ntot(pooled)  N_dist(exact)  oversample  se_old     se_eff     ratio');
for (const c of clusters){
  let N = 0;
  for (let j = 0; j < c.n; j++){
    const y = c.ys[j];
    const lo = j === 0 ? y*y : Math.max(y*y, 2*c.ys[j-1]*c.ys[j-1]);
    N += countSlots(y, lo, 2*y*y);
  }
  c.Nd = N; c.se = c.m/Math.sqrt(N); c.seOld = c.m/Math.sqrt(NTOT[c.y0]);
  console.log(`  ${String(c.y0).padEnd(7)} ${String(NTOT[c.y0]).padStart(10)}   ${String(N).padStart(11)}    ${(NTOT[c.y0]/N).toFixed(2)}x       ${c.seOld.toFixed(5)}    ${c.se.toFixed(5)}    ${(c.se/c.seOld).toFixed(2)}x`);
}

// ============ (B) the pre-band, pooled: the empirical local pair density ====
console.log('\n=== (B) the pre-band [y^2/2, y^2), pooled over every level — route (b) ===');
console.log('  pred_pre uses the u <= 2 branch e^{2gamma}/u^2, which is exact HL, no conjecture');
console.log('  y0      lev  pre-band slots  N_dist(pre)  measured_pre  pred_pre   lambda_pre   1/K (frozen)  lambda_twin');
for (const c of clusters){
  let sm = 0, sp = 0, tot = 0;
  for (const y of c.ys){
    const lo = Math.floor(y*y/2), hi = y*y, d = delta(y);
    const cnt = countSlots(y, lo, hi);
    tot += cnt; sm += cnt/((hi-lo)*d); sp += predWindow(y, lo, hi);
  }
  const mp = sm/c.n, pp = sp/c.n;
  let Nd = 0;
  for (let j = 0; j < c.n; j++){
    const y = c.ys[j];
    const lo = j === 0 ? Math.floor(y*y/2) : Math.max(Math.floor(y*y/2), c.ys[j-1]*c.ys[j-1]);
    Nd += countSlots(y, lo, y*y);
  }
  c.pre = mp; c.prePred = pp; c.lamPre = mp/pp; c.preNd = Nd;
  c.preSe = (mp/pp)/Math.sqrt(Nd);
  c.lamTwin = c.lamPre * (c.ys.reduce((s,y)=>s+K(y),0)/c.n);
  console.log(`  ${String(c.y0).padEnd(7)}${String(c.n).padStart(4)}  ${String(tot).padStart(13)}  ${String(Nd).padStart(11)}   ${mp.toFixed(5)}      ${pp.toFixed(5)}   ${c.lamPre.toFixed(5)}     ${c.invK.toFixed(5)}      ${c.lamTwin.toFixed(5)}`);
}
console.log('  lambda_pre = measured_pre/pred_pre; lambda_twin = lambda_pre * mean K, the measured');
console.log('  local twin density over its Hardy-Littlewood form at that cluster\'s scale.');

// =============================== (C) the score =============================
console.log('\n=== (C) SCORE against research/history/staging/shadow-amplitude-prereg.md ===');

console.log('  C1 amplitude: 1 must lie inside the 2-sigma interval of (measured drift)/(predicted drift)');
function c1(tag, dm, dp, s){
  const R = dm/dp, a0 = (dm - 2*s)/dp, b0 = (dm + 2*s)/dp;
  const a = Math.min(a0,b0), b = Math.max(a0,b0), ok = a <= 1 && 1 <= b;
  console.log(`    ${tag.padEnd(44)} ratio ${R.toFixed(3).padStart(6)}  2-sigma [${a.toFixed(3)}, ${b.toFixed(3)}]  ${ok ? 'PASS' : 'FAIL'}`);
  return ok;
}
let C1 = true;
{
  const a = clusters[0], b = clusters[2], z = clusters[9];
  const s1 = Math.hypot(a.se, z.se), s2 = Math.hypot(b.se, z.se);
  console.log(`    full span y~1000 -> y~26000, measured drift ${(z.m-a.m).toFixed(5)}, sigma ${s1.toFixed(5)}`);
  c1('  against B_x     (pred ' + (z.B-a.B).toFixed(5) + ')', z.m-a.m, z.B-a.B, s1);
  C1 = c1('  against B_corr  (pred ' + (z.Bc-a.Bc).toFixed(5) + ')', z.m-a.m, z.Bc-a.Bc, s1) && C1;
  console.log(`    y >= 2000, y~2000 -> y~26000, measured drift ${(z.m-b.m).toFixed(5)}, sigma ${s2.toFixed(5)}`);
  c1('  against B_x     (pred ' + (z.B-b.B).toFixed(5) + ')', z.m-b.m, z.B-b.B, s2);
  C1 = c1('  against B_corr  (pred ' + (z.Bc-b.Bc).toFixed(5) + ')', z.m-b.m, z.Bc-b.Bc, s2) && C1;
  // the ladder, single bands, no pooling: N_dist is the band's own slot count
  const y0 = 1009, y1 = 25409;
  const n0 = countSlots(y0, y0*y0, 2*y0*y0), n1 = countSlots(y1, y1*y1, 2*y1*y1);
  const B0 = predWindow(y0, y0*y0, 2*y0*y0), B1 = predWindow(y1, y1*y1, 2*y1*y1);
  const sl = Math.hypot(LADM[y0]/Math.sqrt(n0), LADM[y1]/Math.sqrt(n1));
  console.log(`    ladder y=1009 -> y=25409, slots ${n0} and ${n1}, measured drift ${(LADM[y1]-LADM[y0]).toFixed(5)}, sigma ${sl.toFixed(5)}`);
  c1('  against B_x     (pred ' + (B1-B0).toFixed(5) + ')', LADM[y1]-LADM[y0], B1-B0, sl);
  C1 = c1('  against B_corr  (pred ' + (B1/K(y1)-B0/K(y0)).toFixed(5) + ')', LADM[y1]-LADM[y0], B1/K(y1)-B0/K(y0), sl) && C1;
}
console.log(`    C1: ${C1 ? 'PASS' : 'FAIL'}`);

console.log('  C2 per-cluster residuals: |measured - B_corr| <= 2 se_eff everywhere, mean z in [-1,+1]');
let mz = 0, nbad = 0, mz0 = 0;
console.log('    y0       res_old   z_old    res_corr   z_corr   |z|<=2');
for (const c of clusters){
  const r0 = c.m - c.B, r = c.m - c.Bc, z = r/c.se, z0 = r0/c.se;
  mz += z; mz0 += z0; if (Math.abs(z) > 2) nbad++;
  console.log(`    ${String(c.y0).padEnd(8)} ${((r0>=0?'+':'')+r0.toFixed(5)).padStart(8)}  ${z0.toFixed(2).padStart(6)}   ${((r>=0?'+':'')+r.toFixed(5)).padStart(8)}   ${z.toFixed(2).padStart(6)}   ${Math.abs(z) <= 2 ? 'yes' : 'NO'}`);
}
mz /= 10; mz0 /= 10;
const C2ok = nbad === 0 && Math.abs(mz) <= 1;
console.log(`    mean z: uncorrected ${mz0.toFixed(3)}, corrected ${mz.toFixed(3)};  clusters beyond 2 sigma: ${nbad}`);
console.log(`    C2: ${C2ok ? 'PASS' : 'FAIL'}`);

console.log('  C3 route (a) meets route (b): lambda_pre must equal the frozen 1/K within 2 sigma');
let c3 = 0;
for (const c of clusters){
  const d = c.lamPre - c.invK, ok = Math.abs(d) <= 2*c.preSe;
  if (ok) c3++;
  console.log(`    ${String(c.y0).padEnd(8)} lambda_pre ${c.lamPre.toFixed(5)}  1/K ${c.invK.toFixed(5)}  diff ${((d>=0?'+':'')+d.toFixed(5)).padStart(8)}  2se ${(2*c.preSe).toFixed(5)}  ${ok ? 'PASS' : 'FAIL'}`);
}
console.log(`    C3: ${c3} of 10 clusters pass (threshold 8)  ${c3 >= 8 ? 'PASS' : 'FAIL'}`);

console.log('  C4 the record\'s own explanation: is lambda_twin approaching 1 from above, or oscillating?');
let above = 0, sw = 0, sww = 0;
for (const c of clusters){
  const z = (c.lamTwin - 1)/c.preSe;
  if (c.lamTwin > 1) above++;
  sw += z; sww += z*z;
  console.log(`    ${String(c.y0).padEnd(8)} lambda_twin ${c.lamTwin.toFixed(5)}  ${(c.lamTwin>1?'above':'below')}  z = ${z.toFixed(2)}`);
}
const meanz = sw/10, seMean = 1/Math.sqrt(10);
console.log(`    clusters above 1: ${above} of 10; mean z ${meanz.toFixed(3)} against a mean-of-ten s.e. of ${seMean.toFixed(3)} -> ${(meanz/seMean).toFixed(2)} sigma`);
const C4ok = !(above === 10) && Math.abs(meanz/seMean) <= 2;
console.log(`    C4: ${C4ok ? 'PASS (oscillates about HL; no second systematic)' : 'FAIL (a second systematic survives)'}`);

console.log('  C5 kill: a surviving trend in the corrected residual, or a one-sided lambda_pre - 1/K');
{
  const xs = clusters.map(c => Math.log(c.y0)), zs = clusters.map(c => (c.m - c.Bc)/c.se);
  const mx = xs.reduce((a,b)=>a+b)/10, mzz = zs.reduce((a,b)=>a+b)/10;
  let sxy = 0, sxx = 0; for (let i = 0; i < 10; i++){ sxy += (xs[i]-mx)*(zs[i]-mzz); sxx += (xs[i]-mx)**2; }
  const slope = sxy/sxx;
  let ss = 0; for (let i = 0; i < 10; i++){ const f = mzz + slope*(xs[i]-mx); ss += (zs[i]-f)**2; }
  const seSlope = Math.sqrt(ss/8/sxx);
  let oneSided = 0; const sgn = Math.sign(clusters[0].lamPre - clusters[0].invK);
  for (const c of clusters) if (Math.sign(c.lamPre - c.invK) === sgn && Math.abs(c.lamPre - c.invK) > 2*c.preSe) oneSided++;
  const C5trip = Math.abs(slope/seSlope) > 2 || oneSided >= 8;
  console.log(`    trend of z_corr on ln y: slope ${slope.toFixed(3)} +- ${seSlope.toFixed(3)}  (${Math.abs(slope/seSlope).toFixed(2)} sigma)`);
  console.log(`    clusters with lambda_pre - 1/K one-sided beyond 2 sigma: ${oneSided}`);
  console.log(`    C5: ${C5trip ? 'TRIPPED — hypothesis wrong' : 'not tripped'}`);
  console.log(`\n  VERDICT INPUTS: C1 ${C1 ? 'PASS' : 'FAIL'}, C2 ${C2ok ? 'PASS' : 'FAIL'}, C3 ${c3 >= 8 ? 'PASS' : 'FAIL'}, C4 ${C4ok ? 'PASS' : 'FAIL'}, C5 ${C5trip ? 'TRIPPED' : 'clear'}`);
}

console.log('\n=== (D) how much of the amplitude gap the derived term supplies ===');
{
  const a = clusters[0], z = clusters[9], b = clusters[2];
  const gapOld = (z.m-a.m) - (z.B-a.B), gapNew = (z.m-a.m) - (z.Bc-a.Bc);
  console.log(`  full span: missing drift was ${gapOld.toFixed(5)}, is now ${gapNew.toFixed(5)};`);
  console.log(`  the derived term 1/K supplies ${(100*(1-gapNew/gapOld)).toFixed(1)}% of it, and the remainder is`);
  console.log(`  ${(Math.abs(gapNew)/Math.hypot(a.se,z.se)).toFixed(2)} sigma of the endpoint clusters' own counting floor.`);
  const gO = (z.m-b.m)-(z.B-b.B), gN = (z.m-b.m)-(z.Bc-b.Bc);
  console.log(`  y >= 2000: missing drift was ${gO.toFixed(5)}, is now ${gN.toFixed(5)} (sign flips; ${(Math.abs(gN)/Math.hypot(b.se,z.se)).toFixed(2)} sigma).`);
  // the surviving offset: inverse-variance mean of the corrected residual, the two ends apart
  const wm = (arr) => { let sw = 0, sr = 0; for (const c of arr){ const w = 1/(c.se*c.se); sw += w; sr += w*(c.m - c.Bc); } return [sr/sw, 1/Math.sqrt(sw)]; };
  const [w1, e1] = wm(clusters.slice(2));
  const [w0, e0] = wm(clusters);
  console.log(`  surviving offset, inverse-variance mean of (measured - B_corr):`);
  console.log(`    all ten clusters   ${(w0>=0?'+':'')+w0.toFixed(5)} +- ${e0.toFixed(5)}   (${Math.abs(w0/e0).toFixed(2)} sigma)`);
  console.log(`    the eight y >= 2000 ${(w1>=0?'+':'')+w1.toFixed(5)} +- ${e1.toFixed(5)}   (${Math.abs(w1/e1).toFixed(2)} sigma)`);
  console.log(`  and the term the correction leaves at y ~ 1000: ${((clusters[0].m-clusters[0].Bc)>=0?'+':'')+(clusters[0].m-clusters[0].Bc).toFixed(5)} +- ${clusters[0].se.toFixed(5)},`);
  console.log(`  which is gone by y ~ 2000 (${(clusters[2].m-clusters[2].Bc).toFixed(5)} +- ${clusters[2].se.toFixed(5)}).`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/shadow-amplitude-02-measure.js
//   invocation:  node research/shadow-amplitude-02-measure.js
//   code-sha256: 93b5163e19c0cb276f20ce24e0ce510d940a61e3bcd32d0e7246d14b3671fe45
//   out-sha256:  92507a4c454d29584bcad78c5ba1b1c9057d3de8cfa1393bb1c800ce4c7ec427
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     17.4 s
// ============================================================================
// === (0) the pre-band holds twin primes and nothing else — checked at one level ===
//   y = 101, window [5100, 10201): level-y twin slots = 81, twin primes = 81
//   y = 1009, window [509040, 1018081): level-y twin slots = 3684, twin primes = 3684
//     measured/fair = 0.83771, predicted = 0.82998,
//     sum 2C2/(ln n)^2 = 3675.7 vs 3684 actual, lambda_twin = 1.00226,
//     and lambda_pre * K = 1.00226  (must agree: the identity of section 1 of the prereg)
//
// === (A) N_dist: how many DISTINCT pairs each cluster actually samples ===
//   y0      Ntot(pooled)  N_dist(exact)  oversample  se_old     se_eff     ratio
//   1000        266735         12981    20.55x       0.00165    0.00746    4.53x
//   1400        591384         23062    25.64x       0.00109    0.00554    5.06x
//   2000       1417269         42351    33.46x       0.00070    0.00405    5.78x
//   2900       2219418         61931    35.84x       0.00056    0.00334    5.99x
//   4200       2052941         87157    23.55x       0.00058    0.00281    4.85x
//   6000       1868376        143717    13.00x       0.00060    0.00218    3.61x
//   8500       1945202        248328    7.83x       0.00059    0.00166    2.80x
//   12000      1785182        450451    3.96x       0.00062    0.00123    1.99x
//   18000      1840503        923555    1.99x       0.00061    0.00086    1.41x
//   26000      1779677       1779677    1.00x       0.00062    0.00062    1.00x
//
// === (B) the pre-band [y^2/2, y^2), pooled over every level — route (b) ===
//   pred_pre uses the u <= 2 branch e^{2gamma}/u^2, which is exact HL, no conjecture
//   y0      lev  pre-band slots  N_dist(pre)  measured_pre  pred_pre   lambda_pre   1/K (frozen)  lambda_twin
//   1000     36         131382         6205   0.83624      0.83003   1.00748     1.00967      0.99784
//   1400     45         298753        11169   0.85031      0.82822   1.02668     1.00728      1.01926
//   2000     59         711255        20403   0.83611      0.82651   1.01161     1.00584      1.00574
//   2900     53        1105323        30160   0.82865      0.82509   1.00431     1.00520      0.99912
//   4200     28        1027583        43061   0.82921      0.82378   1.00659     1.00429      1.00229
//   6000     14         930641        71277   0.82377      0.82252   1.00151     1.00218      0.99934
//   8500      8         965332       122965   0.82122      0.82136   0.99983     1.00163      0.99820
//   12000     4         892044       224961   0.82275      0.82027   1.00302     1.00223      1.00078
//   18000     2         916076       459603   0.81942      0.81909   1.00040     1.00207      0.99833
//   26000     1         885629       885629   0.81890      0.81811   1.00096     1.00138      0.99959
//   lambda_pre = measured_pre/pred_pre; lambda_twin = lambda_pre * mean K, the measured
//   local twin density over its Hardy-Littlewood form at that cluster's scale.
//
// === (C) SCORE against research/history/staging/shadow-amplitude-prereg.md ===
//   C1 amplitude: 1 must lie inside the 2-sigma interval of (measured drift)/(predicted drift)
//     full span y~1000 -> y~26000, measured drift -0.02725, sigma 0.00749
//       against B_x     (pred -0.01188)            ratio  2.294  2-sigma [1.034, 3.555]  FAIL
//       against B_corr  (pred -0.01881)            ratio  1.449  2-sigma [0.653, 2.245]  PASS
//     y >= 2000, y~2000 -> y~26000, measured drift -0.01006, sigma 0.00409
//       against B_x     (pred -0.00848)            ratio  1.186  2-sigma [0.221, 2.151]  PASS
//       against B_corr  (pred -0.01219)            ratio  0.825  2-sigma [0.154, 1.496]  PASS
//     ladder y=1009 -> y=25409, slots 7514 and 2145307, measured drift -0.03207, sigma 0.00987
//       against B_x     (pred -0.01211)            ratio  2.648  2-sigma [1.018, 4.278]  FAIL
//       against B_corr  (pred -0.01707)            ratio  1.879  2-sigma [0.722, 3.036]  PASS
//     C1: PASS
//   C2 per-cluster residuals: |measured - B_corr| <= 2 se_eff everywhere, mean z in [-1,+1]
//     y0       res_old   z_old    res_corr   z_corr   |z|<=2
//     1000     +0.01639    2.20   +0.00833     1.12   yes
//     1400     +0.00932    1.68   +0.00327     0.59   yes
//     2000     +0.00260    0.64   -0.00225    -0.56   yes
//     2900     +0.00326    0.98   -0.00105    -0.31   yes
//     4200     +0.00074    0.26   -0.00281    -1.00   yes
//     6000     +0.00061    0.28   -0.00119    -0.55   yes
//     8500     +0.00229    1.38   +0.00094     0.57   yes
//     12000    -0.00076   -0.62   -0.00260    -2.12   NO
//     18000    +0.00036    0.42   -0.00134    -1.57   yes
//     26000    +0.00102    1.65   -0.00011    -0.18   yes
//     mean z: uncorrected 0.887, corrected -0.401;  clusters beyond 2 sigma: 1
//     C2: FAIL
//   C3 route (a) meets route (b): lambda_pre must equal the frozen 1/K within 2 sigma
//     1000     lambda_pre 1.00748  1/K 1.00967  diff -0.00219  2se 0.02558  PASS
//     1400     lambda_pre 1.02668  1/K 1.00728  diff +0.01940  2se 0.01943  PASS
//     2000     lambda_pre 1.01161  1/K 1.00584  diff +0.00578  2se 0.01416  PASS
//     2900     lambda_pre 1.00431  1/K 1.00520  diff -0.00089  2se 0.01157  PASS
//     4200     lambda_pre 1.00659  1/K 1.00429  diff +0.00230  2se 0.00970  PASS
//     6000     lambda_pre 1.00151  1/K 1.00218  diff -0.00066  2se 0.00750  PASS
//     8500     lambda_pre 0.99983  1/K 1.00163  diff -0.00180  2se 0.00570  PASS
//     12000    lambda_pre 1.00302  1/K 1.00223  diff +0.00079  2se 0.00423  PASS
//     18000    lambda_pre 1.00040  1/K 1.00207  diff -0.00167  2se 0.00295  PASS
//     26000    lambda_pre 1.00096  1/K 1.00138  diff -0.00042  2se 0.00213  PASS
//     C3: 10 of 10 clusters pass (threshold 8)  PASS
//   C4 the record's own explanation: is lambda_twin approaching 1 from above, or oscillating?
//     1000     lambda_twin 0.99784  below  z = -0.17
//     1400     lambda_twin 1.01926  above  z = 1.98
//     2000     lambda_twin 1.00574  above  z = 0.81
//     2900     lambda_twin 0.99912  below  z = -0.15
//     4200     lambda_twin 1.00229  above  z = 0.47
//     6000     lambda_twin 0.99934  below  z = -0.18
//     8500     lambda_twin 0.99820  below  z = -0.63
//     12000    lambda_twin 1.00078  above  z = 0.37
//     18000    lambda_twin 0.99833  below  z = -1.13
//     26000    lambda_twin 0.99959  below  z = -0.39
//     clusters above 1: 4 of 10; mean z 0.099 against a mean-of-ten s.e. of 0.316 -> 0.31 sigma
//     C4: PASS (oscillates about HL; no second systematic)
//   C5 kill: a surviving trend in the corrected residual, or a one-sided lambda_pre - 1/K
//     trend of z_corr on ln y: slope -0.523 +- 0.264  (1.98 sigma)
//     clusters with lambda_pre - 1/K one-sided beyond 2 sigma: 0
//     C5: not tripped
//
//   VERDICT INPUTS: C1 PASS, C2 FAIL, C3 PASS, C4 PASS, C5 clear
//
// === (D) how much of the amplitude gap the derived term supplies ===
//   full span: missing drift was -0.01537, is now -0.00844;
//   the derived term 1/K supplies 45.1% of it, and the remainder is
//   1.13 sigma of the endpoint clusters' own counting floor.
//   y >= 2000: missing drift was -0.00158, is now 0.00213 (sign flips; 0.52 sigma).
//   surviving offset, inverse-variance mean of (measured - B_corr):
//     all ten clusters   -0.00074 +- 0.00042   (1.74 sigma)
//     the eight y >= 2000 -0.00079 +- 0.00043   (1.85 sigma)
//   and the term the correction leaves at y ~ 1000: +0.00833 +- 0.00746,
//   which is gone by y ~ 2000 (-0.00225 +- 0.00405).
// ============================================================================
// READINGS
// S2-1. THE PRE-BAND IS A CLEAN INSTRUMENT FOR THE LOCAL PAIR DENSITY, AND THE
//   DERIVATION'S CENTRAL IDENTITY CHECKS FROM RAW COUNTS. Below y^2 a level-y
//   slot is a twin prime and nothing else: 81 slots and 81 twin primes at
//   y = 101, 3684 and 3684 at y = 1009. At y = 1009 the window's measured
//   depth 0.83771 over its prediction 0.82998, times K, is 1.00226 — and the
//   twin count 3684 over the Hardy-Littlewood sum 3675.7 is 1.00226 as well.
//   measured/pred = lambda_twin/K is therefore not a bookkeeping convention
//   but a checkable identity between a sieve count and a prime count.
//   CALIBRATION: VERIFIED.
// S2-2. THE POOLED SLOT TOTAL OVERSTATES THE SAMPLE BY UP TO 35.84x. Exact
//   distinct-pair counts: 12981 pairs behind Ntot = 266735 at y ~ 1000, 61931
//   behind 2219418 at y ~ 2900, and 1779677 behind 1779677 at y ~ 26000 where
//   there is one level and no pooling. The counting floor is 4.53x to 5.99x
//   larger than the one the record printed at every cluster below y ~ 8500.
//   This is a defect in the record's error column, not in its measurement.
// S2-3. ROUTE (a) MEETS ROUTE (b), 10 OF 10. The derived 1/K and the measured
//   lambda_pre agree within 2 sigma at every cluster, on integers DISJOINT
//   from the band and against a model branch (u <= 2) that contains no
//   independence conjecture: 1.00748 against 1.00967 at y ~ 1000, 0.99983
//   against 1.00163 at y ~ 8500, 1.00096 against 1.00138 at y ~ 26000. A
//   derivation and a measurement that never touch the same integers give the
//   same finite-y factor. C3 PASS.
// S2-4. THE RECORD'S OWN EXPLANATION IS THE WRONG HALF, AND THIS IS THE FINDING
//   THAT MATTERS. shadow-buchstab.md §4 reads the small-y excess as "the local
//   pair density still approaching its Hardy-Littlewood form at x ~ 10^6".
//   Measured, lambda_twin is 0.99784, 1.01926, 1.00574, 0.99912, 1.00229,
//   0.99934, 0.99820, 1.00078, 0.99833, 0.99959 — above 1 at 4 of 10 clusters,
//   mean 0.31 sigma, with the largest excursion at y ~ 1400 and not at the
//   smallest scale. The local pair density OSCILLATES about its HL form at
//   these scales; it is not approaching it from above. What has not reached its
//   asymptote is the FAIR SHARE the instrument divides by, and that is
//   derivable. C4 PASS.
// S2-5. THE AMPLITUDE: THE CORRECTED PREDICTION PASSES C1 ON ALL THREE
//   BINNINGS AND THE UNCORRECTED ONE FAILS ON TWO. Full span 2.294 -> 1.449,
//   2-sigma [1.034, 3.555] -> [0.653, 2.245]; ladder 2.648 -> 1.879,
//   [1.018, 4.278] -> [0.722, 3.036]; y >= 2000 1.186 -> 0.825, both inside.
//   The factor-2.6 alarm of adversary-wave2.md §1 correction 2 is real as
//   arithmetic and is not a defect of the law: 45.1% of the missing drift is
//   the derived 1/K and the remaining -0.00844 is 1.13 sigma of the endpoint
//   clusters' own floor.
// S2-6. C2 FAILS, BY ONE CLUSTER, AND THE VERDICT IS THEREFORE PARTIALLY
//   EXPLAINED. y ~ 12000 sits at z = -2.12 against a threshold of 2, on four
//   levels and a 1.99x-pooled sample; every other cluster is inside, and the
//   mean z moves from +0.887 to -0.401. Under the pre-registration's own rule
//   DERIVED needs C1 and C2 and C3 and C4, so the label is PARTIALLY
//   EXPLAINED. Reporting it any higher would repeat exactly the error
//   adversary-wave2.md §1 correction 1 caught in the parent record.
// S2-7. WHAT IS LEFT, WITH ITS SIZE AND ITS SIGN. Two residues survive the
//   correction and they point opposite ways. At y ~ 1000 it leaves +0.00833 +-
//   0.00746 (1.12 sigma), gone by y ~ 2000 where the residual is -0.00225 +-
//   0.00405. Across the eight clusters at y >= 2000 the inverse-variance mean
//   is -0.00079 +- 0.00043, a 1.85-sigma OVER-correction, and the corrected
//   residual's trend on ln y is -0.523 +- 0.264, which is 1.98 sigma and did
//   not trip C5 by a hair. Both are consistent with zero at 2 sigma and
//   neither is worth naming yet; what would settle them is more distinct
//   pairs, which at y ~ 1000 means a wider pool and not a longer run, since
//   the 36 bands there already exhaust the x-range they cover.
// ============================================================================
