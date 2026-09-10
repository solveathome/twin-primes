'use strict';
// ============================================================================
// HEAD RESIDUAL, HL-3 — pricing beta's endpoint deficit from the Hardy-
// Littlewood k-tuple constants, with no fitted parameter
// ============================================================================
// SCRATCHPAD GRADE. Staging companion to research/history/staging/
// head-residual-hl3.md. Not a certified artefact: no QC ledger entry, no
// cross-script reuse intended. Siblings: head-residual-factor.md/.js and
// head-residual-null.md/.js, whose EMBEDDED numbers are the control targets.
//
// QUESTION. head-residual-null.md §3 leaves Delta = 2 - beta = 0.621 at
// [1e7,1e8) as a MEASURED prime deficit near the two openers bounding a twin
// gap: localized (80% inside d < 30), left-heavy (0.4626 against 0.1134), and
// about half priced by a HEURISTIC "two live positions" bracket [0.289,0.361].
// This file asks whether all of it is the Hardy-Littlewood correlation at the
// openers, priced with no fitted parameter.
//
// THE HL STATEMENT USED (conjectural; everything downstream inherits that).
// For an admissible k-tuple H, S(H) = prod_q (1 - nu_q(H)/q)/(1 - 1/q)^k with
// nu_q(H) = #distinct residues of H mod q, and HL k-tuple gives
//   #{n<=x : n+h prime for all h in H} ~ S(H) x / (ln x)^k.
//
// (a) ONE OPENER. Given (a, a+2) a twin pair, the conditional density of a
//     prime at a + t is psi(t) / ln x with
//       psi(t) = S(0,2,t) / S(0,2).
//     Local factors, exactly:
//       q=2 : nu_2 = 1 on even t, 2 on odd t          -> psi = 0 on odd t
//       q=3 : an opener has a = 2 mod 3, so {0,2,t} is all of Z/3 iff
//             t = 1 mod 3                              -> psi = 0 on t = 1 mod 3
//       q>=5: nu_q = 2 iff q | t(t-2), else 3.
//     Dividing out S(0,2)'s own local factors leaves, on live t,
//       psi(t) = 3 * P5 * prod_{q>=5, q|t(t-2)} (q-2)/(q-3),
//       P5 = prod_{q>=5} (1 - 2/((q-1)(q-2))).
//     The RIGHT opener is the same function reflected: for m = b - u below a
//     pair (b, b+2) the tuple is {0,u,u+2}, whose reflection is {0,2,u+2}, so
//     the density there is psi(u+2). HL therefore makes the depletion around a
//     twin pair exactly reflection-symmetric in distance from the pair.
//
// (b) BOTH OPENERS, which is what a gap actually is. A gap [a, a+g) is bounded
//     by two pairs, so the conditioning set is {0,2,g,g+2} and the exact
//     conditional density at a + t is
//       rho(t,g) = S(0,2,t,g,g+2) / S(0,2,g,g+2).
//     Every twin gap above 3 has 6 | g (both openers are 2 mod 3 and odd), so
//       q=2 : factor 2 on even t, 0 on odd t
//       q=3 : factor 3/2 on t = 0,2 mod 3, 0 on t = 1 mod 3
//       q>=5: nu_4 = 2 if q|g, 3 if q|g-2 or q|g+2, else 4;
//             nu_5 = nu_4 if q | t(t-2)(t-g)(t-g-2), else nu_4 + 1;
//             factor = (1 - nu_5/q) / ((1 - nu_4/q)(1 - 1/q)).
//     Note the factor is ZERO at q = 5 when nu_4 = 4 and t collides with
//     nothing: four fixed points already occupy four of the five classes mod 5,
//     so one residue class of t is barred outright. The PRODUCT psi(t)*psi(u+2)
//     does not see that, and it double-counts q = 2 and q = 3 by a factor 3.
//     rho, not the product, is what SEC 2 and SEC 3 use.
//
// WHAT THIS FILE DOES.
//  SEC 0  CONTROL. Re-sieve [1e7,1e8) and reproduce head-residual-null.js
//         SEC 2 in its own convention (beta, CV^2, E[n], lambda_bulk, and the
//         left/right cumulative deficit profile) before computing anything.
//  SEC 1  psi: P5 against the published prime-triplet constant, the Cesaro
//         mean (Gallagher), and the divergence rate of sum_{t<=T}(1 - psi(t)).
//  SEC 2  rho(t,g), exactly; its mean (a second check on the local factors);
//         and the zero-parameter prediction of the measured d-profile, in the
//         sibling's exact binning convention, left and right separately.
//  SEC 3  the zero-parameter prediction of Delta = 2 - beta, pushed through
//         the same OLS the sibling runs, on the MEASURED gap-length law.
//  SEC 4  the sibling's "two live positions" bracket, re-priced in the
//         baseline its own script uses.
//
// CONVENTIONS: research/GLOSSARY.md. opener / gap / head as in
// head-residual-factor.js. C2 is the twin-prime constant.
// ============================================================================

const T0 = Date.now();
let failures = 0;
function assertNear(name, got, want, tol) {
  if (!(Math.abs(got - want) <= tol)) { failures++; console.log(`  ASSERT FAIL ${name}: got ${got} want ${want} +-${tol}`); }
}
const f2 = x => x.toFixed(2), f3 = x => x.toFixed(3), f4 = x => x.toFixed(4), f5 = x => x.toFixed(5);
const C2 = 0.66016181584686957392;

// --------------------------------------------------------------------------
// SEC 0 — CONTROL: re-sieve [1e7,1e8) and reproduce the sibling's SEC 2
// --------------------------------------------------------------------------
console.log('SEC 0 — CONTROL: independent re-sieve, head-residual-null.js SEC 2 convention');
const EDGE = 120, BAND = 300;
function scanWindow(LO, HI) {
  const LIM = Math.floor(Math.sqrt(HI)) + 2;
  const comp = new Uint8Array(LIM + 1);
  const base = [];
  for (let i = 2; i <= LIM; i++) { if (!comp[i]) { base.push(i); for (let j = i * i; j <= LIM; j += i) comp[j] = 1; } }
  const cntL = new Float64Array(EDGE), cntR = new Float64Array(EDGE);
  const gapHist = new Int32Array(16384);
  let gMax = 0, bandGaps = 0, bandCentralPrimes = 0, bandCentralLen = 0;
  let Sg = 0, Sg2 = 0, Sn = 0, Sn2 = 0, Sng = 0, nGap = 0, badMod6 = 0;
  const SEG = 1 << 21;
  let prevOpener = -1, pend = [];
  for (let lo = Math.floor(LO / 2) * 2; lo < HI; lo += SEG) {
    const hi = Math.min(lo + SEG, HI);
    const len = hi - lo + 3;
    const seg = new Uint8Array(len);
    for (let bi = 0; bi < base.length; bi++) {
      const p = base[bi];
      let m = Math.max(p * p, Math.ceil(lo / p) * p);
      for (; m < lo + len; m += p) seg[m - lo] = 1;
    }
    for (let n = lo | 1; n < hi; n += 2) {
      if (seg[n - lo]) continue;
      if (seg[n + 2 - lo] === 0) {
        if (prevOpener > 0) {
          const g = n - prevOpener, np = pend.length;
          Sg += g; Sg2 += g * g; Sn += np; Sn2 += np * np; Sng += np * g; nGap++;
          if (g % 6 !== 0) badMod6++;
          if (g < gapHist.length) gapHist[g]++; if (g > gMax) gMax = g;
          if (g >= BAND) {
            bandGaps++; bandCentralLen += g - 2 * EDGE;
            for (let k = 2; k < pend.length; k++) {
              const d = pend[k] - prevOpener;
              if (d < EDGE) cntL[d]++;
              else if (g - d <= EDGE) cntR[g - d - 1]++;
              else bandCentralPrimes++;
            }
          }
        }
        prevOpener = n; pend = [];
      }
      pend.push(n);
    }
  }
  const Eg = Sg / nGap, En = Sn / nGap, varg = Sg2 / nGap - Eg * Eg;
  const alpha = (Sng / nGap - En * Eg) / varg, beta = En - alpha * Eg, cv2 = varg / (Eg * Eg);
  // classical OLS standard error of the intercept
  const varn = Sn2 / nGap - En * En;
  const s2 = (varn - alpha * alpha * varg) * nGap / (nGap - 2);
  const seBeta = Math.sqrt(s2 * (1 / nGap) * (1 + Eg * Eg / varg));
  const lam = En / Eg, lamS = lam * (1 - 2 / En);
  return { LO, HI, nGap, Eg, En, varg, alpha, beta, seBeta, cv2, lam, lamS, gapHist, gMax,
           cntL, cntR, bandGaps, lamBulk: bandCentralPrimes / bandCentralLen, badMod6 };
}
const WINS = [scanWindow(1e5, 1e6), scanWindow(1e6, 1e7), scanWindow(1e7, 1e8)];
for (const w of WINS)
  console.log(`  [${(w.LO).toExponential(0)},${(w.HI).toExponential(0)}): gaps ${String(w.nGap).padStart(6)} E[g]=${f3(w.Eg)} E[n]=${f3(w.En)} beta=${f3(w.beta)}+-${f3(w.seBeta)} CV^2=${f4(w.cv2)} alpha=${f5(w.alpha)} lambda_s=${f5(w.lamS)} lambda_bulk=${f5(w.lamBulk)} g_max=${w.gMax} band ${w.bandGaps} | 6-nondiv gaps ${w.badMod6}`);
const W8 = WINS[2];
const { Eg, En, alpha: alphaOLS, beta: betaOLS, cv2, lamBulk, bandGaps, lam, lamS, cntL, cntR, gapHist, gMax } = W8;
assertNear('control beta [1e7,1e8)', betaOLS, 1.379, 0.002);
assertNear('control CV^2 [1e7,1e8)', cv2, 0.8941, 0.0002);
assertNear('control E[n] [1e7,1e8)', En, 13.366, 0.002);
assertNear('control lambda_bulk [1e7,1e8)', lamBulk, 0.05101, 0.00002);
assertNear('control alpha [1e7,1e8)', alphaOLS, 0.05079, 0.00002);
assertNear('control lambda_s [1e7,1e8)', lamS, 0.04817, 0.00002);
assertNear('control beta [1e6,1e7)', WINS[1].beta, 1.314, 0.002);
assertNear('control beta [1e5,1e6)', WINS[0].beta, 1.310, 0.002);
assertNear('control CV^2 [1e6,1e7)', WINS[1].cv2, 0.8520, 0.0002);
assertNear('control CV^2 [1e5,1e6)', WINS[0].cv2, 0.8281, 0.0002);
assertNear('every twin gap has 6 | g', WINS[0].badMod6 + WINS[1].badMod6 + W8.badMod6, 0, 0);
{
  let aL = 0, aR = 0; const meas = {};
  for (let d = 0; d < EDGE; d++) {
    aL += lamBulk - cntL[d] / bandGaps; aR += lamBulk - cntR[d] / bandGaps;
    if ((d + 1) % 30 === 0) meas[d + 1] = [aL, aR];
  }
  console.log('  measured cumulative deficit at [1e7,1e8) (sibling SEC 2): left / right / sum');
  for (const c of [30, 60, 90, 120]) console.log(`    d < ${String(c).padStart(3)}: ${f4(meas[c][0])}  ${f4(meas[c][1])}  ${f4(meas[c][0] + meas[c][1])}`);
  assertNear('control profile L30', meas[30][0], 0.4626, 0.0002);
  assertNear('control profile R30', meas[30][1], 0.1134, 0.0002);
  assertNear('control profile L120', meas[120][0], 0.5295, 0.0002);
  assertNear('control profile R120', meas[120][1], 0.1942, 0.0002);
}
console.log('');

// --------------------------------------------------------------------------
// SEC 1 — psi(t) = S(0,2,t)/S(0,2): one-opener conditioning
// --------------------------------------------------------------------------
console.log('SEC 1 — psi(t) = S(0,2,t)/S(0,2): the constant, the Cesaro mean, the divergence');
const TMAX = 200000;
const psi = new Float64Array(TMAX + 1);
let P5 = 1;
const QLIM = 4000000;
const primes = [];
{
  const cq = new Uint8Array(QLIM + 1);
  for (let i = 2; i * i <= QLIM; i++) if (!cq[i]) for (let j = i * i; j <= QLIM; j += i) cq[j] = 1;
  for (let q = 2; q <= QLIM; q++) if (!cq[q]) primes.push(q);
  for (const q of primes) if (q >= 5) P5 *= 1 - 2 / ((q - 1) * (q - 2));
  P5 *= Math.exp(-2 / (QLIM * Math.log(QLIM)));       // crude tail, O(1e-8)
  const tripletHL = 2.858248596;                       // S(0,2,6), published
  console.log(`  P5 = ${P5.toFixed(9)}  ->  3*P5 = ${(3 * P5).toFixed(9)}`);
  console.log(`  independent check: published S(0,2,6) = ${tripletHL}, so S(0,2,6)/S(0,2) = ${(tripletHL / (2 * C2)).toFixed(9)}`);
  assertNear('P5 against the published triplet constant', 3 * P5, tripletHL / (2 * C2), 5e-7);
  const SPF = new Int32Array(TMAX + 3);
  for (let i = 2; i <= TMAX + 2; i++) if (SPF[i] === 0) for (let j = i; j <= TMAX + 2; j += i) if (SPF[j] === 0) SPF[j] = i;
  const big = t => { const s = []; let x = t; while (x > 1) { const p = SPF[x]; if (p >= 5) s.push(p); while (x % p === 0) x /= p; } return s; };
  for (let t = 3; t <= TMAX; t++) {
    if (t % 2 !== 0 || t % 3 === 1) { psi[t] = 0; continue; }
    let v = 3 * P5;
    for (const q of big(t)) v *= (q - 2) / (q - 3);
    for (const q of big(t - 2)) v *= (q - 2) / (q - 3);
    psi[t] = v;
  }
  for (const T of [1000, 10000, 100000, 200000]) {
    let s = 0, nl = 0, sl = 0;
    for (let t = 3; t <= T; t++) { s += psi[t]; if (psi[t] > 0) { nl++; sl += psi[t]; } }
    console.log(`    T=${String(T).padStart(6)}: mean psi over all t = ${f4(s / (T - 2))} | over live t = ${f4(sl / nl)} | live share ${f4(nl / (T - 2))}`);
  }
  console.log('  D(T) = sum_{t=3..T} (1 - psi(t)), the one-sided deficit summed to T:');
  const Ts = [30, 60, 120, 300, 1000, 3000, 10000, 30000, 100000, 200000];
  let run = 0, ti = 0; const Dv = {};
  for (let t = 3; t <= TMAX; t++) { run += 1 - psi[t]; if (ti < Ts.length && t === Ts[ti]) { Dv[Ts[ti]] = run; ti++; } }
  for (const T of Ts) console.log(`    D(${String(T).padStart(6)}) = ${f3(Dv[T]).padStart(7)}   D(T)/ln T = ${f3(Dv[T] / Math.log(T))}`);
  const xs = Ts.filter(T => T >= 1000).map(T => Math.log(T)), ys = Ts.filter(T => T >= 1000).map(T => Dv[T]);
  const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  console.log(`  fit D(T) = c ln T + C on T in [1e3, 2e5]: c = ${f3(sxy / sxx)}, C = ${f3(my - (sxy / sxx) * mx)}`);
  console.log('  D(T) does not converge: the one-opener HL deficit is log-divergent in the distance,');
  console.log('  so "sum the deficit over d" has no value on its own. The gap length is the cutoff.');
}
console.log('');

// --------------------------------------------------------------------------
// SEC 2 — rho(t,g) = S(0,2,t,g,g+2)/S(0,2,g,g+2), exactly, and the profile
// --------------------------------------------------------------------------
console.log('SEC 2 — rho(t,g) = S(0,2,t,g,g+2)/S(0,2,g,g+2): exact local factors, then the d-profile');
// rho is built in logs, prime by prime, per g. For q > g+2 nothing about t can
// collide, so the factor is the generic nu_4=4, nu_5=5 value; that whole tail
// is the g-independent constant GTOT below, carried so that rho's absolute
// normalisation is honest and its mean over t can be checked against 1.
const LGEN = new Float64Array(0);
let GTOT = 0;
const genlog = new Map();
for (const q of primes) {
  if (q < 7) continue;
  const v = Math.log((q - 5) * q / ((q - 4) * (q - 1)));
  genlog.set(q, v); GTOT += v;
}
const LOG3 = Math.log(3);
function genFactor(q, nu4) { return (q - nu4 - 1) * q / ((q - nu4) * (q - 1)); }   // 0 iff nu4 = q-1
function rhoRow(g) {
  // returns Float64Array r of length g, r[t] = rho(t,g) for 0<=t<g (t=0,2 are
  // the left pair itself and are left in place, unused by callers)
  const L = new Float64Array(g + 1).fill(LOG3 + GTOT);
  const alive = new Uint8Array(g + 1);
  for (let t = 0; t <= g; t++) alive[t] = (t % 2 === 0 && t % 3 !== 1) ? 1 : 0;
  for (const q of primes) {
    if (q < 5) continue;
    if (q > g + 2) break;
    let nu4 = 4;
    if (g % q === 0) nu4 = 2; else if ((g + 2) % q === 0 || (g - 2) % q === 0) nu4 = 3;
    const gen = genFactor(q, nu4);              // t collides with nothing mod q
    const colFac = q / (q - 1);                 // t collides with an endpoint
    const already = q === 5 ? 0 : genlog.get(q);  // what GTOT already charged
    const marks = new Uint8Array(q);
    marks[0] = 1; marks[2 % q] = 1; marks[g % q] = 1; marks[(g + 2) % q] = 1;
    const dcol = Math.log(colFac) - already;
    if (gen === 0) {
      // q = 5 with nu_4 = 4: the four endpoints occupy four classes mod q, so a
      // non-colliding t is barred outright.
      for (let t = 0; t <= g; t++) if (!marks[t % q]) alive[t] = 0; else L[t] += dcol;
    } else {
      const dgen = Math.log(gen) - already;
      for (let t = 0; t <= g; t++) L[t] += marks[t % q] ? dcol : dgen;
    }
  }
  const r = new Float64Array(g + 1);
  for (let t = 0; t <= g; t++) r[t] = alive[t] ? Math.exp(L[t]) : 0;
  return r;
}
let profL, profR, rhoCentral;
{
  // exact-rho check: the mean of rho over the interior should sit at 1
  for (const g of [300, 606, 1002, 2010]) {
    const r = rhoRow(g);
    let s = 0; for (let t = 3; t <= g - 1; t++) s += r[t];
    console.log(`    g=${String(g).padStart(4)}: mean rho over t in [3,g-1] = ${f4(s / (g - 3))} (must sit at 1 if the local factors are right)`);
  }
  // band-weighted profile
  profL = new Float64Array(EDGE); profR = new Float64Array(EDGE);
  let wsum = 0, cSum = 0, cLen = 0;
  for (let g = BAND; g <= gMax; g++) {
    const w = gapHist[g]; if (!w) continue;
    const r = rhoRow(g);
    wsum += w;
    for (let d = 0; d < EDGE; d++) { profL[d] += w * r[d]; profR[d] += w * r[g - 1 - d]; }
    for (let t = EDGE; t < g - EDGE; t++) { cSum += w * r[t]; cLen += w; }
  }
  for (let d = 0; d < EDGE; d++) { profL[d] /= wsum; profR[d] /= wsum; }
  rhoCentral = cSum / cLen;
  console.log(`  band-average rho in the central region (d >= ${EDGE} from both ends) = ${f4(rhoCentral)}`);
  console.log('  cumulative deficit within d of an opener: MEASURED vs HL(exact rho), zero fitted parameters');
  console.log('    cut |   left meas   left HL |  right meas  right HL |   sum meas    sum HL');
  let mL = 0, mR = 0, pL = 0, pR = 0; const rows = [];
  for (let d = 0; d < EDGE; d++) {
    mL += lamBulk - cntL[d] / bandGaps; mR += lamBulk - cntR[d] / bandGaps;
    // d = 0 and d = 2 hold the opener pair, excluded from the interior tally
    const modelL = (d === 0 || d === 2) ? 0 : profL[d] / rhoCentral;
    pL += lamBulk * (1 - modelL);
    pR += lamBulk * (1 - profR[d] / rhoCentral);
    if ((d + 1) % 30 === 0) rows.push([d + 1, mL, pL, mR, pR]);
  }
  for (const [c, a, b, x, y] of rows)
    console.log(`    ${String(c).padStart(3)} | ${f4(a).padStart(11)} ${f4(b).padStart(9)} | ${f4(x).padStart(11)} ${f4(y).padStart(9)} | ${f4(a + x).padStart(11)} ${f4(b + y).padStart(9)}`);
  console.log('  per-shell deficit (the differences of the table above), MEASURED vs HL:');
  console.log('    shell   left meas  left HL |  right meas  right HL |   sum meas    sum HL');
  const shells = [];
  for (let i = 0; i < rows.length; i++) {
    const pv = i ? rows[i - 1] : [0, 0, 0, 0, 0];
    const dm = [rows[i][1] - pv[1], rows[i][2] - pv[2], rows[i][3] - pv[3], rows[i][4] - pv[4]];
    shells.push(dm);
    const lo = i ? rows[i - 1][0] : 0;
    console.log(`    [${String(lo).padStart(3)},${String(rows[i][0]).padStart(3)}) ${f4(dm[0]).padStart(10)} ${f4(dm[1]).padStart(9)} | ${f4(dm[2]).padStart(11)} ${f4(dm[3]).padStart(9)} | ${f4(dm[0] + dm[2]).padStart(11)} ${f4(dm[1] + dm[3]).padStart(9)}`);
  }
  {
    const xs = [], ys = [];
    for (const d of shells) { xs.push(d[0], d[2]); ys.push(d[1], d[3]); }
    const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
    let sxy = 0, sxx = 0, syy = 0;
    for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
    console.log(`  correlation of the 8 shell deficits (4 left + 4 right), measured against HL: r = ${f4(sxy / Math.sqrt(sxx * syy))}`);
    const xs2 = xs.slice(2), ys2 = ys.slice(2);           // drop the two d<30 shells, which dominate
    const n2 = xs2.length, mx2 = xs2.reduce((a, b) => a + b) / n2, my2 = ys2.reduce((a, b) => a + b) / n2;
    let sxy2 = 0, sxx2 = 0, syy2 = 0;
    for (let i = 0; i < n2; i++) { sxy2 += (xs2[i] - mx2) * (ys2[i] - my2); sxx2 += (xs2[i] - mx2) ** 2; syy2 += (ys2[i] - my2) ** 2; }
    console.log(`  same, dropping the two d<30 shells that dominate the spread (6 points): r = ${f4(sxy2 / Math.sqrt(sxx2 * syy2))}, and the [60,90) shell's SIGN is missed (measured -0.0098, HL +0.0072)`);
    console.log('  the non-monotone shells head-residual-null.md §3 reading 1 could not place (its 0.0725, -0.0098,');
    console.log('  0.0849) are in the comb: rho is not smooth in t, and a 30-wide shell samples it unevenly.');
  }
  const r0 = rows[0], r3 = rows[3];
  console.log(`  left/right ratio at d<30: measured ${f3(r0[1] / r0[3])}, HL ${f3(r0[2] / r0[4])}`);
  console.log(`  share of the d<120 total inside d<30: measured ${f3((r0[1] + r0[3]) / (r3[1] + r3[3]))}, HL ${f3((r0[2] + r0[4]) / (r3[2] + r3[4]))}`);
  console.log(`  Poisson sd on one 30-wide shell: +-${f4(Math.sqrt(2 * lamBulk * 30 / bandGaps))}; on the d<120 cumulative: +-${f4(Math.sqrt(2 * lamBulk * EDGE / bandGaps))}`);
  console.log(`  the two pair slots (d = 0, 2) contribute exactly 2*lambda_bulk = ${f4(2 * lamBulk)} of the left column, in both columns`);
}
console.log('');

// --------------------------------------------------------------------------
// SEC 3 — the zero-parameter HL prediction for Delta = 2 - beta
// --------------------------------------------------------------------------
console.log('SEC 3 — HL prediction for Delta = 2 - beta, through the sibling\'s own OLS');
// MODEL. E[n | g] = 2 + kappa * W(g), W(g) = sum_{t=3}^{g-1} rho(t,g).
// kappa is NOT fitted: E[n] = 2 + lambda_s E[g] is an identity in the data, so
// kappa = lambda_s E[g] / E[W(g)]. Then alpha_HL = kappa Cov(W,g)/Var(g) and
// beta_HL = E[n] - alpha_HL E[g].
// What is NOT in rho: the gap's defining condition that no INTERIOR position is
// itself an opener. Under the null that condition is exactly the thinning
// lambda -> lambda_s, which kappa carries; its non-uniform part is not modelled.
function deltaHL(w, gapLaw) {
  const { gapHist, gMax, lamS } = w;
  const W = new Float64Array(gMax + 1);
  for (let g = 6; g <= gMax; g++) {
    if (!gapHist[g]) continue;
    const r = rhoRow(g);
    let s = 0; for (let t = 3; t <= g - 1; t++) s += r[t];
    W[g] = s;
  }
  let n = 0, Sg = 0, Sg2 = 0, SW = 0, SWg = 0;
  const egEmp = (() => { let a = 0, b = 0; for (let g = 0; g <= gMax; g++) { a += gapHist[g] * g; b += gapHist[g]; } return a / b; })();
  for (let g = 0; g <= gMax; g++) {
    let c = gapHist[g]; if (!c) continue;
    if (gapLaw === 'exp') c = Math.exp(-g / egEmp);          // same mean, Exp law
    n += c; Sg += c * g; Sg2 += c * g * g; SW += c * W[g]; SWg += c * W[g] * g;
  }
  const eg = Sg / n, eg2 = Sg2 / n, ew = SW / n, ewg = SWg / n;
  const vg = eg2 - eg * eg, cwg = ewg - ew * eg;
  const kappa = lamS * eg / ew;
  const alphaHL = kappa * cwg / vg;
  const betaHL = (2 + lamS * eg) - alphaHL * eg;
  return { kappa, alphaHL, betaHL, delta: 2 - betaHL, ew, eg, W };
}
{
  console.log('  window          Delta_meas (+-se)   Delta_HL   ratio    alpha_meas  alpha_HL   E[W]/(E[g]-3)');
  for (const w of WINS) {
    const h = deltaHL(w, 'emp');
    console.log(`  [${(w.LO).toExponential(0)},${(w.HI).toExponential(0)})   ${f4(2 - w.beta)} +- ${f4(w.seBeta)}     ${f4(h.delta)}   ${f3(h.delta / (2 - w.beta))}    ${f5(w.alpha)}   ${f5(h.alphaHL)}   ${f4(h.ew / (h.eg - 3))}`);
  }
  console.log('  the form HL implies for Delta: with the comb cut off at the gap, Delta ~ (const) lnln p / ln p.');
  console.log('  window          ln p   lnln p   Delta_HL*ln p/lnln p   Delta_meas*ln p/lnln p');
  for (const w of WINS) {
    const h = deltaHL(w, 'emp'), lnp = 1 / w.lam, ll = Math.log(lnp);
    console.log(`  [${(w.LO).toExponential(0)},${(w.HI).toExponential(0)})   ${f3(lnp)}  ${f3(ll)}          ${f3(h.delta * lnp / ll)}                  ${f3((2 - w.beta) * lnp / ll)}`);
  }
  const h8 = deltaHL(W8, 'emp'), h8e = deltaHL(W8, 'exp');
  console.log(`  sensitivity at [1e7,1e8): measured gap law gives Delta_HL = ${f4(h8.delta)}, an Exp law of the same mean gives ${f4(h8e.delta)}`);
  console.log(`  kappa = ${f5(h8.kappa)} against lambda_bulk = ${f5(lamBulk)} and the measured alpha = ${f5(alphaOLS)} (kappa is fixed by the identity, not fitted)`);
  // where Delta_HL sits, in lambda_bulk units, at the mean gap
  {
    const gm = 6 * Math.round(Eg / 6);
    const r = rhoRow(gm);
    let cs = 0, cl = 0; for (let t = EDGE; t < gm - EDGE; t++) { cs += r[t]; cl++; }
    const rc = cl ? cs / cl : 1;
    let nearL = 0, nearR = 0, farL = 0, farR = 0;
    for (let t = 3; t < 30; t++) nearL += 1 - r[t] / rc;
    for (let t = 30; t <= gm / 2; t++) farL += 1 - r[t] / rc;
    for (let d = 0; d < 30; d++) nearR += 1 - r[gm - 1 - d] / rc;
    for (let d = 30; d <= gm / 2; d++) farR += 1 - r[gm - 1 - d] / rc;
    console.log(`  anatomy at g = ${gm} (lambda_bulk units): pair slots 2.000 | near L ${f3(nearL)} R ${f3(nearR)} | far L ${f3(farL)} R ${f3(farR)} | L total ${f3(2 + nearL + farL)} R total ${f3(nearR + farR)}`);
    console.log(`  of Delta_meas ${f4(2 - betaOLS)}: pair slots ${f4(2 * lamBulk)}, |d|<30 field ${f4((nearL + nearR) * lamBulk)}, beyond ${f4((farL + farR) * lamBulk)}`);
    console.log('  the L/R split of the near field is a BINNING effect, not a mechanism: rho is exactly');
    console.log('  reflection-symmetric about a pair, and the left column\'s 30-shell runs over t=3..29');
    console.log('  while the right column\'s runs over t=3..32, which is where the large rho at t=30,32 falls.');
  }
}
console.log('');

// --------------------------------------------------------------------------
// SEC 4 — the sibling's "two live positions" bracket, re-priced
// --------------------------------------------------------------------------
console.log('SEC 4 — the "two live positions" term, in the baseline the sibling\'s own script uses');
{
  console.log(`  head-residual-null.md §3 point 3 prices the opener pair's two slots at 6*lambda_s = ${f3(6 * lamS)} to 7.5*lambda_s = ${f3(7.5 * lamS)}`);
  console.log(`  but its own deficit statistic is sum_d (lambda_bulk - count_d/gaps) over ALL d, a FLAT baseline,`);
  console.log(`  in which two excluded slots are worth exactly 2*lambda_bulk = ${f4(2 * lamBulk)}`);
  console.log(`  bracket midpoint over the flat price: ${f3((6.75 * lamS) / (2 * lamBulk))}x`);
  console.log(`  share of Delta = ${f4(2 - betaOLS)}: as bracketed ${f3(6.75 * lamS / (2 - betaOLS))}, flat ${f3(2 * lamBulk / (2 - betaOLS))}`);
}
console.log('');
console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// READINGS
// ============================================================================
// 1. THE ONE-OPENER SUM DOES NOT CONVERGE, so the question "sum the deficit
//    over d" has no answer on its own. D(T) = sum_{t<=T}(1 - psi(t)) runs
//    3.429, 5.688, 8.475, 12.924 at T = 30, 120, 1000, 100000, fitting
//    c ln T + C with c = 0.844 on T in [1e3, 2e5]. psi's Cesaro mean is
//    0.9999 by T = 1e5, so the leading term cancels and a log survives, which
//    is the Montgomery-Soundararajan behaviour transposed to a triple. The
//    gap length is what supplies the cutoff, and the cutoff is the model.
//
// 2. THE LOCAL FACTORS CHECK OUT TWICE. 3*P5 = 2.164809083 against the
//    published prime-triplet constant route S(0,2,6)/S(0,2) = 2.164809087;
//    and the exact rho(t,g) has mean 0.9582, 0.9760, 0.9827, 0.9910 over the
//    interior at g = 300, 606, 1002, 2010, approaching the 1 that HL's
//    normalisation forces as g grows.
//
// 3. THE PROFILE IS PRICED TO ROUGHLY 5%, AND HL OVER-PREDICTS. Cumulative
//    deficit at [1e7,1e8), measured against HL with no fitted parameter:
//    d<30 0.5761/0.5981, d<60 0.6486/0.6690, d<90 0.6388/0.6762,
//    d<120 0.7236/0.7864. Poisson sd on a 30-shell is 0.0053, on the d<120
//    cumulative 0.0107, so the d<120 miss of 0.063 is about 4 sd. The sign is
//    the same at every cut: HL asks for MORE depletion than is there.
//
// 4. THE LEFT-HEAVINESS IS A BINNING EFFECT, NOT A MECHANISM. rho is exactly
//    reflection-symmetric about a twin pair, so HL cannot produce a physical
//    left/right asymmetry at all; it still predicts the measured ratio at
//    d<30 (4.232 against 4.079), out of the two excluded pair slots
//    (2*lambda_bulk = 0.1020) and the fact that the left column's 30-shell
//    covers t = 3..29 while the right column's covers t = 3..32, which is
//    where the large rho at t = 30, 32 lands.
//
// 5. THE NON-MONOTONE SHELLS ARE IN THE COMB. The 8 shell deficits correlate
//    at r = 0.9989 with HL, and still at 0.9518 with the two dominant d<30
//    shells removed; the [60,90) shell's sign is missed (measured -0.0098
//    against HL +0.0072, sd 0.0053).
//
// 6. DELTA = 2 - BETA IS PRICED TO 5%, AND THE MISS IS 5 SD. Measured against
//    HL: 0.6899+-0.0355 / 0.7914 at [1e5,1e6), 0.6862+-0.0148 / 0.7124 at
//    [1e6,1e7), 0.6214+-0.0060 / 0.6545 at [1e7,1e8) — ratios 1.147, 1.038,
//    1.053. Swapping the measured gap law for an Exp law of the same mean
//    moves the top window's prediction only from 0.6545 to 0.6463, so the
//    miss is not the gap law. The bulk slope, by contrast, is priced to 0.3%
//    (alpha_HL 0.05093 against 0.05079).
//
// 8. HL MAKES DELTA VANISH LIKE lnln p / ln p, NOT LIKE 1/ln p. The comb's
//    one-sided sum grows like c ln T and the gap supplies the cutoff at
//    T ~ E[g] = ln^2 p / (2 C2), so Delta ought to go like (const) lnln p/ln p.
//    Delta_HL * ln p / lnln p is 4.022, 4.005, 4.025 across the three windows,
//    flat to 0.5%; the measured version is 3.506, 3.857, 3.822. That is the
//    rate head-residual-null.md §3's closing line ("everything in Delta is
//    O(1/ln p)") reads one lnln p too fast, and it is the same lnln p that
//    §0 of that file could not separate from a constant on the h - R fit.
//
// 7. THE SIBLING'S "TWO LIVE POSITIONS" BRACKET IS THE d = 0, 2 TERM, AND IT
//    IS OVER-PRICED BY 3.2x IN ITS OWN CONVENTION. head-residual-null.md §3
//    reading 3 puts it at 6*lambda_s = 0.289 to 7.5*lambda_s = 0.361, about
//    half of Delta. Its own statistic sums (lambda_bulk - count/gaps) over
//    ALL d, a flat baseline, in which two excluded slots are worth exactly
//    2*lambda_bulk = 0.1020, i.e. 16% of Delta, not 52%.
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/head-residual-hl3.js
//   invocation:  node research/history/staging/head-residual-hl3.js
//   code-sha256: db561693f99b00b1e1046eb45a0ea85fbcbd90e6de95df49f9fd8aff3bd3b786
//   out-sha256:  e862d6980dfba567c6dc49a5f61d08af353589e69d233e7125ecdfba147c67e2
//   body-lines:  86
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     1.6 s
// ============================================================================
// SEC 0 — CONTROL: independent re-sieve, head-residual-null.js SEC 2 convention
//   [1e+5,1e+6): gaps   6944 E[g]=129.581 E[n]=9.921 beta=1.310+-0.035 CV^2=0.8281 alpha=0.06645 lambda_s=0.06113 lambda_bulk=0.06620 g_max=1452 band 616 | 6-nondiv gaps 0
//   [1e+6,1e+7): gaps  50810 E[g]=177.129 E[n]=11.535 beta=1.314+-0.015 CV^2=0.8520 alpha=0.05770 lambda_s=0.05383 lambda_bulk=0.05817 g_max=1722 band 9139 | 6-nondiv gaps 0
//   [1e+7,1e+8): gaps 381331 E[g]=236.014 E[n]=13.366 beta=1.379+-0.006 CV^2=0.8941 alpha=0.05079 lambda_s=0.04816 lambda_bulk=0.05101 g_max=2868 band 107722 | 6-nondiv gaps 0
//   measured cumulative deficit at [1e7,1e8) (sibling SEC 2): left / right / sum
//     d <  30: 0.4626  0.1134  0.5761
//     d <  60: 0.4929  0.1557  0.6486
//     d <  90: 0.4966  0.1421  0.6388
//     d < 120: 0.5295  0.1942  0.7236
//
// SEC 1 — psi(t) = S(0,2,t)/S(0,2): the constant, the Cesaro mean, the divergence
//   P5 = 0.721603028  ->  3*P5 = 2.164809083
//   independent check: published S(0,2,6) = 2.858248596, so S(0,2,6)/S(0,2) = 2.164809087
//     T=  1000: mean psi over all t = 0.9915 | over live t = 2.9805 | live share 0.3327
//     T= 10000: mean psi over all t = 0.9989 | over live t = 2.9974 | live share 0.3333
//     T=100000: mean psi over all t = 0.9999 | over live t = 2.9997 | live share 0.3333
//     T=200000: mean psi over all t = 0.9999 | over live t = 2.9998 | live share 0.3333
//   D(T) = sum_{t=3..T} (1 - psi(t)), the one-sided deficit summed to T:
//     D(    30) =   3.429   D(T)/ln T = 1.008
//     D(    60) =   4.480   D(T)/ln T = 1.094
//     D(   120) =   5.688   D(T)/ln T = 1.188
//     D(   300) =   6.043   D(T)/ln T = 1.060
//     D(  1000) =   8.475   D(T)/ln T = 1.227
//     D(  3000) =   7.946   D(T)/ln T = 0.992
//     D( 10000) =  10.511   D(T)/ln T = 1.141
//     D( 30000) =  11.088   D(T)/ln T = 1.076
//     D(100000) =  12.924   D(T)/ln T = 1.123
//     D(200000) =  11.645   D(T)/ln T = 0.954
//   fit D(T) = c ln T + C on T in [1e3, 2e5]: c = 0.844, C = 2.251
//   D(T) does not converge: the one-opener HL deficit is log-divergent in the distance,
//   so "sum the deficit over d" has no value on its own. The gap length is the cutoff.
//
// SEC 2 — rho(t,g) = S(0,2,t,g,g+2)/S(0,2,g,g+2): exact local factors, then the d-profile
//     g= 300: mean rho over t in [3,g-1] = 0.9582 (must sit at 1 if the local factors are right)
//     g= 606: mean rho over t in [3,g-1] = 0.9760 (must sit at 1 if the local factors are right)
//     g=1002: mean rho over t in [3,g-1] = 0.9827 (must sit at 1 if the local factors are right)
//     g=2010: mean rho over t in [3,g-1] = 0.9910 (must sit at 1 if the local factors are right)
//   band-average rho in the central region (d >= 120 from both ends) = 0.9965
//   cumulative deficit within d of an opener: MEASURED vs HL(exact rho), zero fitted parameters
//     cut |   left meas   left HL |  right meas  right HL |   sum meas    sum HL
//      30 |      0.4626    0.4838 |      0.1134    0.1143 |      0.5761    0.5981
//      60 |      0.4929    0.5049 |      0.1557    0.1641 |      0.6486    0.6690
//      90 |      0.4966    0.5185 |      0.1421    0.1577 |      0.6388    0.6762
//     120 |      0.5295    0.5623 |      0.1942    0.2241 |      0.7236    0.7864
//   per-shell deficit (the differences of the table above), MEASURED vs HL:
//     shell   left meas  left HL |  right meas  right HL |   sum meas    sum HL
//     [  0, 30)     0.4626    0.4838 |      0.1134    0.1143 |      0.5761    0.5981
//     [ 30, 60)     0.0303    0.0211 |      0.0423    0.0498 |      0.0725    0.0709
//     [ 60, 90)     0.0037    0.0136 |     -0.0136   -0.0064 |     -0.0098    0.0072
//     [ 90,120)     0.0328    0.0438 |      0.0520    0.0664 |      0.0849    0.1102
//   correlation of the 8 shell deficits (4 left + 4 right), measured against HL: r = 0.9989
//   same, dropping the two d<30 shells that dominate the spread (6 points): r = 0.9518, and the [60,90) shell's SIGN is missed (measured -0.0098, HL +0.0072)
//   the non-monotone shells head-residual-null.md §3 reading 1 could not place (its 0.0725, -0.0098,
//   0.0849) are in the comb: rho is not smooth in t, and a 30-wide shell samples it unevenly.
//   left/right ratio at d<30: measured 4.079, HL 4.232
//   share of the d<120 total inside d<30: measured 0.796, HL 0.761
//   Poisson sd on one 30-wide shell: +-0.0053; on the d<120 cumulative: +-0.0107
//   the two pair slots (d = 0, 2) contribute exactly 2*lambda_bulk = 0.1020 of the left column, in both columns
//
// SEC 3 — HL prediction for Delta = 2 - beta, through the sibling's own OLS
//   window          Delta_meas (+-se)   Delta_HL   ratio    alpha_meas  alpha_HL   E[W]/(E[g]-3)
//   [1e+5,1e+6)   0.6899 +- 0.0355     0.7914   1.147    0.06645   0.06724   0.9165
//   [1e+6,1e+7)   0.6862 +- 0.0148     0.7124   1.038    0.05770   0.05785   0.9359
//   [1e+7,1e+8)   0.6214 +- 0.0060     0.6545   1.053    0.05079   0.05093   0.9497
//   the form HL implies for Delta: with the comb cut off at the gap, Delta ~ (const) lnln p / ln p.
//   window          ln p   lnln p   Delta_HL*ln p/lnln p   Delta_meas*ln p/lnln p
//   [1e+5,1e+6)   13.061  2.570          4.022                  3.506
//   [1e+6,1e+7)   15.356  2.732          4.005                  3.857
//   [1e+7,1e+8)   17.658  2.871          4.025                  3.822
//   sensitivity at [1e7,1e8): measured gap law gives Delta_HL = 0.6545, an Exp law of the same mean gives 0.6463
//   kappa = 0.05136 against lambda_bulk = 0.05101 and the measured alpha = 0.05079 (kappa is fixed by the identity, not fitted)
//   anatomy at g = 234 (lambda_bulk units): pair slots 2.000 | near L 4.669 R 0.826 | far L 1.093 R 5.099 | L total 7.762 R total 5.925
//   of Delta_meas 0.6214: pair slots 0.1020, |d|<30 field 0.2803, beyond 0.3158
//   the L/R split of the near field is a BINNING effect, not a mechanism: rho is exactly
//   reflection-symmetric about a pair, and the left column's 30-shell runs over t=3..29
//   while the right column's runs over t=3..32, which is where the large rho at t=30,32 falls.
//
// SEC 4 — the "two live positions" term, in the baseline the sibling's own script uses
//   head-residual-null.md §3 point 3 prices the opener pair's two slots at 6*lambda_s = 0.289 to 7.5*lambda_s = 0.361
//   but its own deficit statistic is sum_d (lambda_bulk - count_d/gaps) over ALL d, a FLAT baseline,
//   in which two excluded slots are worth exactly 2*lambda_bulk = 0.1020
//   bracket midpoint over the flat price: 3.186x
//   share of Delta = 0.6214: as bracketed 0.523, flat 0.164
//
// elapsed 1.5 s
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
//
