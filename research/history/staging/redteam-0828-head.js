'use strict';
// ============================================================================
// RED TEAM 2026-08-28 — companion producer for the three head-residual notes
// ============================================================================
// SCRATCHPAD GRADE. Adversarial companion to research/history/staging/
// redteam-0828-head.md. Written from the definitions on a different code path
// from head-residual-factor.js / -null.js / -hl3.js; nothing is copied from
// their embedded blocks except as a comparison target (the arrays sibBeta,
// sibCV2, censusH are targets, not inputs).
//
// SECTIONS
//  SEC 0  independent odd-only segmented sieve; the census SEC 6(b) columns and
//         the siblings' E[g], E[n], alpha, beta, CV^2, A, B, A_forced, D.
//  SEC 1  THE COMPARATOR. R = sum g^2/(2 sum g) is the CONTINUUM inspection
//         functional. A discrete uniform INTEGER origin sees R + 1/2 exactly,
//         an ODD origin R + 1, a COPRIME-TO-30 origin more still. Measured.
//  SEC 2  THE "IFF". h/R -> 1 does not require beta*CV^2 -> 2; what it does
//         require, and what the N4 plateau would need of beta*CV^2 at height.
//  SEC 3  MOD-30 with per-class marginals subtracted first (repo rule):
//         h - R_cop = sum_c w_c (h_c - R_c) + sum_c (w_c - v_c) R_c.
//  SEC 4  LEFT/RIGHT, model-free: prime counts at centre-distance +s and -s
//         around every twin pair in [1e7,1e8).
//  SEC 5  HL from scratch: psi, 3*P5, rho(t,g) from nu_q of the two tuples,
//         W(g), kappa fixed by the identity, Delta_HL, and its error bars.
//  SEC 6  ERRORS: block jackknife on the six half-decades, and the model refits.
//  SEC 7  the shortfall split's basis dependence (the sibling's 72/28).
// ============================================================================

const T0 = Date.now();
let failures = 0;
function assertNear(name, got, want, tol) {
  if (!(Math.abs(got - want) <= tol)) { failures++; console.log(`  ASSERT FAIL ${name}: got ${got} want ${want} +-${tol}`); }
}
const f2 = x => x.toFixed(2), f3 = x => x.toFixed(3), f4 = x => x.toFixed(4), f5 = x => x.toFixed(5);
const C2 = 0.66016181584686957392;
const N = 1e8;

// ---------------------------------------------------------------- base primes
const SQ = Math.floor(Math.sqrt(N)) + 2;
const smallComp = new Uint8Array(SQ + 1);
const oddBase = [];
for (let i = 3; i <= SQ; i += 2) {
  if (!smallComp[i]) { oddBase.push(i); for (let j = i * i; j <= SQ; j += 2 * i) smallComp[j] = 1; }
}

// ---------------------------------------------------------------- gap store
const CAP = 460000;
const gArr = new Int32Array(CAP), nArr = new Int32Array(CAP);
const lArr = new Float64Array(CAP), sArr = new Float64Array(CAP);
let nGap = 0;

const COP = [1, 7, 11, 13, 17, 19, 23, 29];
const COP210 = [];
for (let c = 1; c < 210; c += 2) if (c % 3 && c % 5 && c % 7) COP210.push(c);
// per-class accumulators for [1e7,1e8), gaps binned by LEFT OPENER on both sides
const pCntC = new Float64Array(30), pFwdC = new Float64Array(30);
const iCntC = new Float64Array(30), iFwdC = new Float64Array(30);
let i210Cnt = 0, i210Fwd = 0;
// census convention (binned by the prime itself), top window only, for the control
let censusSum = 0, censusCnt = 0;
// head histogram mod 30 and the class-independence null inputs (whole walk)
const headMod30 = new Float64Array(30), pMod30 = new Float64Array(30), aMod30 = new Float64Array(30);
// discrete-origin forward sums for [1e7,1e8)
let intSum8 = 0, intCnt8 = 0, oddSum8 = 0, oddCnt8 = 0;
// the siblings' band profile convention: EDGE = 120, BAND = 300, pair slots skipped
const EDGE = 120, BAND = 300;
const cntL = new Float64Array(EDGE), cntR = new Float64Array(EDGE);
let bandGaps = 0, bandCentralPrimes = 0, bandCentralLen = 0;
const bandHist = new Map();

function classSums(a, g) {
  const end = a + g;
  for (const c of COP) {
    const n0 = a + (((c - a) % 30) + 30) % 30;
    if (n0 >= end) continue;
    const k = Math.floor((end - 1 - n0) / 30) + 1;
    iCntC[c] += k;
    iFwdC[c] += k * (end - n0) - 30 * k * (k - 1) / 2;
  }
  for (const c of COP210) {
    const n0 = a + (((c - a) % 210) + 210) % 210;
    if (n0 >= end) continue;
    const k = Math.floor((end - 1 - n0) / 210) + 1;
    i210Cnt += k;
    i210Fwd += k * (end - n0) - 210 * k * (k - 1) / 2;
  }
}

const SEG = 1 << 22;
let prevOpener = -1, pend = [], nPrimes = 0;
for (let lo = 0; lo < N; lo += SEG) {
  const hi = Math.min(lo + SEG, N);
  const len = hi - lo + 4;
  const isComp = new Uint8Array(len);
  for (let bi = 0; bi < oddBase.length; bi++) {
    const p = oddBase[bi];
    let m = Math.max(p * p, Math.ceil(lo / p) * p);
    if (m % 2 === 0) m += p;
    for (; m < lo + len; m += 2 * p) isComp[m - lo] = 1;
  }
  const start = Math.max(lo, 7) | 1;
  for (let n = start; n < hi; n += 2) {
    if (isComp[n - lo]) continue;
    if (isComp[n + 2 - lo] === 0) {                     // n is a twin opener
      let S = 0;
      const in8 = prevOpener >= 1e7;
      for (let k = 0; k < pend.length; k++) {
        const p = pend[k], F = n - p;
        S += F;
        headMod30[F % 30]++; pMod30[p % 30]++; aMod30[n % 30]++;
        if (p >= 1e7) { censusSum += F; censusCnt++; }
        if (in8) { pCntC[p % 30]++; pFwdC[p % 30] += F; }
      }
      if (prevOpener > 0) {
        const g = n - prevOpener;
        gArr[nGap] = g; nArr[nGap] = pend.length; sArr[nGap] = S; lArr[nGap] = prevOpener;
        nGap++;
        if (in8) {
          intSum8 += g * (g + 1) / 2; intCnt8 += g;
          oddSum8 += (g / 2) * (g / 2 + 1); oddCnt8 += g / 2;
          classSums(prevOpener, g);
          if (g >= BAND) {
            bandGaps++; bandCentralLen += g - 2 * EDGE;
            bandHist.set(g, (bandHist.get(g) || 0) + 1);
            for (let k = 2; k < pend.length; k++) {
              const d = pend[k] - prevOpener;
              if (d < EDGE) cntL[d]++;
              else if (g - d <= EDGE) cntR[g - d - 1]++;
              else bandCentralPrimes++;
            }
          }
        }
      }
      prevOpener = n; pend = [];
    }
    pend.push(n); nPrimes++;
  }
}

// ---------------------------------------------------------------------------
console.log('SEC 0 — INDEPENDENT ENGINE: census SEC 6(b) and the siblings\' per-decade table');
const decades = [[11, 1e4], [1e4, 1e5], [1e5, 1e6], [1e6, 1e7], [1e7, 1e8]];
const wn = ['[11,1e4)', '[1e4,1e5)', '[1e5,1e6)', '[1e6,1e7)', '[1e7,1e8)'];
function rangeFor(a, b) {
  let lo = 0; while (lo < nGap && lArr[lo] < a) lo++;
  let hi = lo; while (hi < nGap && lArr[hi] < b) hi++;
  return [lo, hi];
}
function stats(lo, hi) {
  let Sn = 0, SS = 0, Sg = 0, Sg2 = 0, Sng = 0, Sf = 0, Sln = 0, Sn2 = 0;
  for (let i = lo; i < hi; i++) {
    const g = gArr[i], n = nArr[i];
    Sn += n; SS += sArr[i]; Sg += g; Sg2 += g * g; Sng += n * g; Sf += g - 2;
    Sn2 += n * n; Sln += n * Math.log(lArr[i]);
  }
  const G = hi - lo;
  const Eg = Sg / G, En = Sn / G, varg = Sg2 / G - Eg * Eg, varn = Sn2 / G - En * En;
  const alpha = (Sng / G - En * Eg) / varg, beta = En - alpha * Eg;
  const R = Sg2 / (2 * Sg), h = SS / Sn, h1 = Sng / (2 * Sn);
  const lam = Sn / Sg, lamS = lam * (1 - 2 / En), cv2 = varg / (Eg * Eg);
  const s2 = (varn - alpha * alpha * varg) * G / (G - 2);
  const seBeta = Math.sqrt(s2 * (1 / G) * (1 + Eg * Eg / varg));
  return { lo, hi, G, Eg, En, varg, alpha, beta, seBeta, R, h, A: h - h1, B: h1 - R,
           Af: Sf / Sn, D: h - h1 - Sf / Sn, lam, lamS, cv2, mlp: Sln / Sn };
}
const dec = [];
const censusH = [46.896, 82.994, 123.368, 169.718, 229.199];
const sibBeta = [1.028, 1.079, 1.310, 1.314, 1.379];
const sibCV2 = [0.7436, 0.7406, 0.8281, 0.8520, 0.8941];
for (let w = 0; w < 5; w++) {
  const [lo, hi] = rangeFor(decades[w][0], decades[w][1]);
  const s = stats(lo, hi); dec.push(s);
  console.log(`  ${wn[w]}: E[g]=${f3(s.Eg)} E[n]=${f3(s.En)} R=${f3(s.R)} h=${f3(s.h)} h/R=${f4(s.h / s.R)} h-R=${f3(s.h - s.R)} | alpha=${f5(s.alpha)} beta=${f3(s.beta)} CV^2=${f4(s.cv2)} | A=${f3(s.A)} B=${f3(s.B)} A_f=${f3(s.Af)} D=${f3(s.D)}`);
  assertNear(`beta@${wn[w]}`, s.beta, sibBeta[w], 0.001);
  assertNear(`CV2@${wn[w]}`, s.cv2, sibCV2[w], 0.0001);
  assertNear(`A+B identity@${wn[w]}`, s.A + s.B, s.h - s.R, 1e-9);
  assertNear(`B regression identity@${wn[w]}`, s.B, -s.beta * s.varg / (2 * s.Eg * s.En), 1e-9);
}
console.log(`  census-convention h at [1e7,1e8) = ${f3(censusSum / censusCnt)} over ${censusCnt} prime origins [census ${censusH[4]}]`);
assertNear('census h@[1e7,1e8)', censusSum / censusCnt, censusH[4], 0.002);
console.log(`  ${nGap} completed gaps, ${nPrimes} primes >= 7 walked, ${pend.length} censored at the range end`);
console.log('');

// ---------------------------------------------------------------------------
console.log('SEC 1 — THE COMPARATOR: R is the CONTINUUM functional, a discrete origin sees more');
let Rcop8 = 0;
{
  const s = dec[4];
  const Rint = intSum8 / intCnt8, Rodd = oddSum8 / oddCnt8;
  let cs = 0, cc = 0;
  for (const c of COP) { cs += iFwdC[c]; cc += iCntC[c]; }
  Rcop8 = cs / cc;
  console.log(`  [1e7,1e8): R = sum g^2/(2 sum g)                    = ${f4(s.R)}`);
  console.log(`             uniform INTEGER origin,     measured    = ${f4(Rint)}   (exactly R + 1/2 = ${f4(s.R + 0.5)})`);
  console.log(`             uniform ODD origin,         measured    = ${f4(Rodd)}   (exactly R + 1   = ${f4(s.R + 1)})`);
  console.log(`             uniform COPRIME-30 origin,  measured    = ${f4(Rcop8)}   (offset ${f4(Rcop8 - s.R)})`);
  console.log(`             uniform COPRIME-210 origin, measured    = ${f4(i210Fwd / i210Cnt)}   (offset ${f4(i210Fwd / i210Cnt - s.R)})`);
  assertNear('integer origin = R + 1/2', Rint, s.R + 0.5, 1e-6);
  assertNear('odd origin = R + 1', Rodd, s.R + 1, 1e-6);
  console.log('  the prime origin\'s excess over a like-for-like origin:');
  console.log(`     h - R           = ${f3(s.h - s.R)}   (the notes' number: prime origin against a CONTINUUM origin)`);
  console.log(`     h - (R + 1/2)   = ${f3(s.h - s.R - 0.5)}   (against a uniform integer origin)`);
  console.log(`     h - R_coprime30 = ${f3(s.h - Rcop8)}   (against the population primes >= 7 actually live in)`);
  console.log(`     h - R_coprime210= ${f3(s.h - i210Fwd / i210Cnt)}   (against the coprime-to-210 population)`);
  console.log(`  so ${f3(100 * 0.5 / (s.h - s.R))}% to ${f3(100 * (i210Fwd / i210Cnt - s.R) / (s.h - s.R))}% of the quoted h - R is the comparator convention, not a prime effect`);
  console.log('  per decade, h-R | h-R-1/2 (integer-origin check in brackets):');
  for (let w = 0; w < 5; w++) {
    const [lo, hi] = rangeFor(decades[w][0], decades[w][1]);
    let is = 0, ic = 0;
    for (let i = lo; i < hi; i++) { const g = gArr[i]; is += g * (g + 1) / 2; ic += g; }
    console.log(`    ${wn[w]}: ${f3(dec[w].h - dec[w].R)} | ${f3(dec[w].h - dec[w].R - 0.5)}   [${f4(is / ic - dec[w].R)}]`);
  }
}
console.log('');

// ---------------------------------------------------------------------------
console.log('SEC 2 — THE "IFF": h/R -> 1 does not need beta*CV^2 -> 2');
{
  console.log('  exact: h - R = (1/lambda)(1 - beta CV^2/2) + D - 2/E[n];  R = E[g](1+CV^2)/2 grows like ln^2 p');
  for (let w = 1; w < 5; w++) {
    const s = dec[w];
    const rhs = (1 / s.lam) * (1 - s.beta * s.cv2 / 2) + s.D - 2 / s.En;
    assertNear(`h-R closed identity@${wn[w]}`, s.h - s.R, rhs, 2e-9);
    console.log(`  ${wn[w]}: h-R=${f3(s.h - s.R)} = ${f3((1 / s.lam) * (1 - s.beta * s.cv2 / 2))} + D ${f3(s.D)} - 2/E[n] ${f3(2 / s.En)} | (h-R)/R=${f4((s.h - s.R) / s.R)} | R/(1/lam)=${f2(s.R * s.lam)} (grows like ln p)`);
  }
  console.log('  (h-R)/R is O(ln p / ln^2 p) for ANY bounded beta*CV^2, so h/R -> 1 follows from boundedness alone.');
  console.log('  beta*CV^2 -> 2 buys h - R = O(1), i.e. the RATE 1/ln^2 p rather than 1/ln p. Different claims.');
  console.log('  and under beta*CV^2 -> 2 with D -> -0.95, h - R -> -0.95: h falls BELOW R, so the fitted');
  console.log('  law h/R - 1 = +8.4661/ln^2 p has the wrong sign in the limit the sibling conjectures:');
  for (const lnp of [17.947, 27.6, 46.05]) {
    const cv2 = 0.95, R = (lnp * lnp / (2 * C2)) * (1 + cv2) / 2;
    console.log(`    ln p=${f2(lnp)}: R=${f2(R)} | under beta CV^2 = 2, h/R-1 = ${(-0.95 / R).toExponential(2)} | fitted law gives ${(8.4661 / (lnp * lnp)).toExponential(2)}`);
  }
  console.log('  what the N4 plateau h/R - 1 -> c0 = -0.0315 requires of beta*CV^2 (D = -0.95, CV^2 = 0.95):');
  for (const lnp of [17.947, 27.6, 46.05, 100]) {
    const cv2 = 0.95, R = (lnp * lnp / (2 * C2)) * (1 + cv2) / 2, En = lnp / (2 * C2);
    const need = 2 - 2 * (-0.0315 * R + 0.95 + 2 / En) / lnp;
    console.log(`    ln p=${f2(lnp)}: needs beta CV^2 = ${f3(need)}`);
  }
  console.log('  beta*CV^2 is measured at 0.80 -> 1.23 and both factors are conjectured bounded, so the plateau is');
  console.log('  not merely "not required by the data": the sibling\'s own identity excludes it unless beta diverges.');
}
console.log('');

// ---------------------------------------------------------------------------
console.log('SEC 3 — MOD-30 WITH PER-CLASS MARGINALS SUBTRACTED FIRST (repo rule)');
{
  let Ph = 0, Pc = 0, Ih = 0, Ic = 0;
  for (const c of COP) { Ph += pFwdC[c]; Pc += pCntC[c]; Ih += iFwdC[c]; Ic += iCntC[c]; }
  const h = Ph / Pc, Rcop = Ih / Ic;
  let within = 0, between = 0;
  console.log('  class | w_c (prime share) | v_c (integer share) |   h_c   |   R_c   | w_c(h_c-R_c) | (w_c-v_c)R_c');
  for (const c of COP) {
    const w = pCntC[c] / Pc, v = iCntC[c] / Ic;
    const hc = pFwdC[c] / pCntC[c], Rc = iFwdC[c] / iCntC[c];
    within += w * (hc - Rc); between += (w - v) * Rc;
    console.log(`   ${String(c).padStart(2)}   |      ${f5(w)}      |      ${f5(v)}      | ${f3(hc)} | ${f3(Rc)} |   ${f4(w * (hc - Rc))}    |  ${f4((w - v) * Rc)}`);
  }
  assertNear('mod-30 decomposition closes', within + between, h - Rcop, 1e-9);
  console.log(`  h - R_cop30 = ${f4(h - Rcop)} = within-class ${f4(within)} + class-reweighting ${f4(between)}`);
  console.log(`  the class-correlation term is ${f4(between)}: ${f3(100 * Math.abs(between) / Math.abs(h - Rcop))}% of the like-for-like excess,`);
  console.log(`  and ${f3(100 * Math.abs(between) / (dec[4].h - dec[4].R))}% of the notes' h - R = ${f3(dec[4].h - dec[4].R)}. Sibling's answer NO is confirmed, by a valid route.`);
  let tot = 0, settles = 0;
  for (let c = 0; c < 30; c++) { tot += headMod30[c]; settles += pMod30[c]; }
  const nullV = new Float64Array(30);
  for (let c = 0; c < 30; c++) {
    let s = 0; for (let i = 0; i < 30; i++) s += (pMod30[i] / settles) * (aMod30[(i + c) % 30] / settles);
    nullV[c] = s * tot;
  }
  let d30 = 0, tv = 0;
  for (let c = 0; c < 30; c++) { d30 += c * (headMod30[c] - nullV[c]) / tot; tv += Math.abs(headMod30[c] - nullV[c]) / (2 * tot); }
  console.log(`  sibling bound 1 reproduced: mean shift ${f4(d30)}; TV ${f4(tv)} over ${tot} heads; TV*30 = ${f3(tv * 30)}`);
  console.log('  bound 2 (TV*30) is NOT an upper bound on a mean shift: mass moved from h = 2 to h = 302 shifts the');
  console.log('  mean by 300 and leaves the mod-30 histogram unchanged. The class-reweighting term above is the bound.');
}
console.log('');

// ---------------------------------------------------------------------------
console.log('SEC 4 — LEFT/RIGHT AROUND A TWIN PAIR, model-free: primes at centre-distance +s and -s');
{
  const MARG = 200, LO = 1e7, HI = 1e8;
  const cntUp = new Float64Array(MARG + 2), cntDn = new Float64Array(MARG + 2);
  let nPairs = 0;
  const S2 = 1 << 21;
  for (let lo = LO; lo < HI; lo += S2) {
    const hi = Math.min(lo + S2, HI);
    const a0 = lo - MARG - 4, a1 = hi + MARG + 4, L = a1 - a0;
    const comp = new Uint8Array(L);
    for (let bi = 0; bi < oddBase.length; bi++) {
      const p = oddBase[bi];
      let m = Math.max(p * p, Math.ceil(a0 / p) * p);
      if (m % 2 === 0) m += p;
      for (; m < a1; m += 2 * p) comp[m - a0] = 1;
    }
    for (let n = lo | 1; n < hi; n += 2) {
      if (comp[n - a0] || comp[n + 2 - a0]) continue;
      const m = n + 1;
      nPairs++;
      for (let s = 1; s <= MARG; s += 2) {
        if (!comp[m + s - a0]) cntUp[s]++;
        if (!comp[m - s - a0]) cntDn[s]++;
      }
    }
  }
  console.log(`  ${nPairs} twin pairs in [1e7,1e8); m = a+1 is the pair centre; only odd s can hold a prime`);
  console.log('  cumulative primes per pair above vs below the centre:');
  let up = 0, dn = 0;
  for (let s = 1; s <= MARG; s += 2) {
    up += cntUp[s] / nPairs; dn += cntDn[s] / nPairs;
    if (s === 1 || s === 29 || s === 59 || s === 119 || s === 199)
      console.log(`    s <= ${String(s).padStart(3)}: up ${f4(up)}  down ${f4(dn)}  difference ${f4(up - dn)}  (Poisson sd ${f4(Math.sqrt(2 * up / nPairs))}, so ${f2((up - dn) / Math.sqrt(2 * up / nPairs))} sd)`);
  }
  console.log('  the measured prime field around a twin pair is symmetric with no HL input, so');
  console.log('  head-residual-null.md §3 reading 2 ("the asymmetry is the mechanism naming itself") is refuted');
  console.log('  by data alone; hl3\'s reflection argument is confirmed but was not needed to close it.');
}
console.log('');

// ---------------------------------------------------------------------------
console.log('SEC 5 — HARDY-LITTLEWOOD FROM SCRATCH: psi, rho, W(g), Delta_HL');
{
  const QL = 2000000;
  const cq = new Uint8Array(QL + 1); const qs = [];
  for (let i = 2; i <= QL; i++) { if (!cq[i]) { qs.push(i); for (let j = i * i; j <= QL; j += i) cq[j] = 1; } }
  let logBase3 = 0;
  for (const q of qs) if (q >= 5) logBase3 += Math.log((q - 3) * q / ((q - 2) * (q - 1)));
  logBase3 += -2 / (QL * Math.log(QL));
  const P5 = Math.exp(logBase3);
  console.log(`  P5 = prod_{q>=5}(1 - 2/((q-1)(q-2))) = ${P5.toFixed(9)}   ->   3*P5 = ${(3 * P5).toFixed(9)}`);
  console.log(`  independent route: published S(0,2,6) = 2.858248596, /S(0,2) = ${(2.858248596 / (2 * C2)).toFixed(9)}`);
  assertNear('3*P5 against the published triplet constant', 3 * P5, 2.858248596 / (2 * C2), 5e-7);

  const TMAX = 200000;
  const spf = new Int32Array(TMAX + 3);
  for (let i = 2; i <= TMAX + 2; i++) if (spf[i] === 0) for (let j = i; j <= TMAX + 2; j += i) if (spf[j] === 0) spf[j] = i;
  function bigfac(t) { const s = []; let x = t; while (x > 1) { const p = spf[x]; if (p >= 5) s.push(p); while (x % p === 0) x /= p; } return s; }
  let run = 0, sumPsi = 0; const Dv = {};
  const marks = new Set([30, 120, 1000, 10000, 100000, 200000]);
  for (let t = 3; t <= TMAX; t++) {
    let v = 0;
    if (t % 2 === 0 && t % 3 !== 1) {
      v = 3 * P5;
      for (const q of bigfac(t)) v *= (q - 2) / (q - 3);
      for (const q of bigfac(t - 2)) v *= (q - 2) / (q - 3);
    }
    sumPsi += v; run += 1 - v;
    if (marks.has(t)) Dv[t] = run;
  }
  console.log(`  Cesaro mean of psi over all t <= ${TMAX}: ${f4(sumPsi / (TMAX - 2))} (HL normalisation forces 1 asymptotically)`);
  console.log(`  D(T) = sum_{t<=T}(1 - psi): ` + [...marks].sort((a, b) => a - b).map(T => `${T}:${f3(Dv[T])}`).join('  '));
  {
    const Ts = [1000, 10000, 100000, 200000];
    const xs = Ts.map(Math.log), ys = Ts.map(T => Dv[T]);
    const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
    let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
    console.log(`  fit D(T) = c ln T + C on [1e3,2e5]: c = ${f3(sxy / sxx)} (sibling 0.844); D(T)/ln T = ${Ts.map(T => f3(Dv[T] / Math.log(T))).join(' ')}`);
  }

  // rho(t,g) = S(0,2,t,g,g+2)/S(0,2,g,g+2), from nu_q of the two tuples directly
  let logGen = 0;
  for (const q of qs) if (q >= 7) logGen += Math.log((q - 5) * q / ((q - 4) * (q - 1)));
  logGen += -4 / (QL * Math.log(QL));
  const LOG3 = Math.log(3);
  function rhoRow(g) {
    const r = new Float64Array(g + 1);
    const qq = [], dCol = [], dGen = [], mk = [];
    for (const q of qs) {
      if (q < 5) continue;
      if (q > g + 2) break;
      const seen = new Uint8Array(q);
      seen[0] = 1; seen[2 % q] = 1; seen[g % q] = 1; seen[(g + 2) % q] = 1;
      let nu4 = 0; for (let z = 0; z < q; z++) nu4 += seen[z];
      const den = (1 - nu4 / q) * (1 - 1 / q);
      const already = q >= 7 ? Math.log((q - 5) * q / ((q - 4) * (q - 1))) : 0;
      const colNum = 1 - nu4 / q;                  // t hits an existing class: nu5 = nu4
      const genNum = 1 - (nu4 + 1) / q;            // t hits a fresh class:    nu5 = nu4+1
      qq.push(q); mk.push(seen);
      dCol.push(Math.log(colNum / den) - already);
      dGen.push(genNum <= 0 ? null : Math.log(genNum / den) - already);
    }
    for (let t = 3; t <= g - 1; t++) {
      if (t % 2 !== 0 || t % 3 === 1) { r[t] = 0; continue; }
      let lg = LOG3 + logGen, dead = false;
      for (let j = 0; j < qq.length; j++) {
        const q = qq[j];
        if (mk[j][t % q]) lg += dCol[j];
        else if (dGen[j] === null) { dead = true; break; }
        else lg += dGen[j];
      }
      r[t] = dead ? 0 : Math.exp(lg);
    }
    return r;
  }
  for (const g of [300, 606, 1002, 2010]) {
    const r = rhoRow(g);
    let s = 0; for (let t = 3; t <= g - 1; t++) s += r[t];
    console.log(`    g=${String(g).padStart(4)}: mean rho over t in [3,g-1] = ${f4(s / (g - 3))}  (sibling 0.9582 0.9760 0.9827 0.9910)`);
  }

  console.log('  Delta = 2 - beta, measured (OLS s.e. and 40-block jackknife s.e.) against HL, zero fitted parameters:');
  const wins = [[1e5, 1e6], [1e6, 1e7], [1e7, 1e8]];
  const sibDeltaHL = [0.7914, 0.7124, 0.6545];
  for (let wi = 0; wi < 3; wi++) {
    const [A, Bb] = wins[wi];
    const [lo, hi] = rangeFor(A, Bb);
    const s = stats(lo, hi);
    const hist = new Map();
    for (let i = lo; i < hi; i++) hist.set(gArr[i], (hist.get(gArr[i]) || 0) + 1);
    let EW = 0, EWg = 0, Wtot = 0;
    for (const g of [...hist.keys()].sort((x, y) => x - y)) {
      const r = rhoRow(g);
      let W = 0; for (let t = 3; t <= g - 1; t++) W += r[t];
      const w = hist.get(g);
      EW += w * W; EWg += w * W * g; Wtot += w;
    }
    EW /= Wtot; EWg /= Wtot;
    const kappa = s.lamS * s.Eg / EW;
    const alphaHL = kappa * (EWg - EW * s.Eg) / s.varg;
    const DeltaHL = s.Eg * (alphaHL - s.lamS), Delta = 2 - s.beta;
    const NB = 40, bl = Math.floor((hi - lo) / NB);
    function jkSE(inBlock) {
      const bs = [];
      for (let b = 0; b < NB; b++) {
        let Sn = 0, Sg = 0, Sg2 = 0, Sng = 0, G = 0;
        for (let i = lo; i < hi; i++) {
          if (inBlock(i, b)) continue;
          const g = gArr[i], n = nArr[i];
          Sn += n; Sg += g; Sg2 += g * g; Sng += n * g; G++;
        }
        const Eg2 = Sg / G, En2 = Sn / G, vg = Sg2 / G - Eg2 * Eg2;
        bs.push(En2 - ((Sng / G - En2 * Eg2) / vg) * Eg2);
      }
      const mb = bs.reduce((a, b) => a + b) / NB;
      let vj = 0; for (const b of bs) vj += (b - mb) ** 2;
      return Math.sqrt((NB - 1) / NB * vj);
    }
    const seJK = jkSE((i, b) => i >= lo + b * bl && i < lo + (b + 1) * bl);      // contiguous: carries within-window height drift
    const seJKi = jkSE((i, b) => (i - lo) % NB === b);                            // interleaved: height drift removed
    console.log(`  [1e${Math.log10(A)},1e${Math.log10(Bb)}): Delta=${f4(Delta)} +-${f4(s.seBeta)} (OLS) +-${f4(seJKi)} (interleaved jk) +-${f4(seJK)} (contiguous jk) | Delta_HL=${f4(DeltaHL)} [sibling ${sibDeltaHL[wi]}] | ratio ${f4(DeltaHL / Delta)} | miss ${f2((DeltaHL - Delta) / s.seBeta)} / ${f2((DeltaHL - Delta) / seJKi)} / ${f2((DeltaHL - Delta) / seJK)} s.e.`);
    console.log(`      alpha=${f5(s.alpha)} alpha_HL=${f5(alphaHL)} (apart by ${f3(100 * (alphaHL / s.alpha - 1))}%) lambda_s=${f5(s.lamS)} | Delta = E[g](alpha - lambda_s) amplifies that by ${f2((DeltaHL / Delta - 1) / (alphaHL / s.alpha - 1))}x`);
    console.log(`      Delta_HL*lnp/lnlnp = ${f3(DeltaHL * s.mlp / Math.log(s.mlp))} | Delta_meas*lnp/lnlnp = ${f3(Delta * s.mlp / Math.log(s.mlp))} | the two pair slots are worth 2*lambda_s = ${f4(2 * s.lamS)} of Delta (${f3(100 * 2 * s.lamS / Delta)}%)`);
    assertNear(`Delta_HL@${wi}`, DeltaHL, sibDeltaHL[wi], 0.004);
  }

  // the siblings' binned d-profile, measured and HL, in their own convention
  const lamBulk = bandCentralPrimes / bandCentralLen;
  const profL = new Float64Array(EDGE), profR = new Float64Array(EDGE);
  let wsum = 0, cSum = 0, cLen = 0;
  for (const [g, w] of [...bandHist.entries()].sort((a, b) => a[0] - b[0])) {
    const r = rhoRow(g);
    wsum += w;
    for (let d = 0; d < EDGE; d++) { profL[d] += w * r[d]; profR[d] += w * r[g - 1 - d]; }
    for (let t = EDGE; t < g - EDGE; t++) { cSum += w * r[t]; cLen += w; }
  }
  for (let d = 0; d < EDGE; d++) { profL[d] /= wsum; profR[d] /= wsum; }
  const rhoC = cSum / cLen;
  console.log(`  the siblings' binned profile, reproduced: lambda_bulk = ${f5(lamBulk)} over ${bandGaps} band gaps (g >= ${BAND})`);
  console.log('    cut | left meas  left HL | right meas right HL |  sum meas   sum HL');
  let mL = 0, mR = 0, pL = 0, pR = 0; const rows = [];
  for (let d = 0; d < EDGE; d++) {
    mL += lamBulk - cntL[d] / bandGaps; mR += lamBulk - cntR[d] / bandGaps;
    pL += lamBulk * (1 - ((d === 0 || d === 2) ? 0 : profL[d] / rhoC));
    pR += lamBulk * (1 - profR[d] / rhoC);
    if ((d + 1) % 30 === 0) rows.push([d + 1, mL, pL, mR, pR]);
  }
  for (const [c, a, b, x, y] of rows) console.log(`    ${String(c).padStart(3)} |  ${f4(a)}    ${f4(b)}  |  ${f4(x)}    ${f4(y)}  |  ${f4(a + x)}   ${f4(b + y)}`);
  assertNear('sibling profile L30', rows[0][1], 0.4626, 0.0002);
  assertNear('sibling profile R30', rows[0][3], 0.1134, 0.0002);
  assertNear('sibling profile L120', rows[3][1], 0.5295, 0.0002);
  assertNear('sibling profile R120', rows[3][3], 0.1942, 0.0002);
  console.log(`    left/right at d<30: measured ${f3(rows[0][1] / rows[0][3])} [sibling 4.079], HL ${f3(rows[0][2] / rows[0][4])} [sibling 4.232]`);
  console.log(`    share of d<120 inside d<30: measured ${f3((rows[0][1] + rows[0][3]) / (rows[3][1] + rows[3][3]))} [sibling 0.796], HL ${f3((rows[0][2] + rows[0][4]) / (rows[3][2] + rows[3][4]))} [sibling 0.761]`);
  {
    const xs = [], ys = [];
    for (let i = 0; i < rows.length; i++) {
      const pv = i ? rows[i - 1] : [0, 0, 0, 0, 0];
      xs.push(rows[i][1] - pv[1], rows[i][3] - pv[3]); ys.push(rows[i][2] - pv[2], rows[i][4] - pv[4]);
    }
    const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
    let sxy = 0, sxx = 0, syy = 0;
    for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
    console.log(`    correlation of the 8 shell deficits, measured vs HL: r = ${f4(sxy / Math.sqrt(sxx * syy))} [sibling 0.9989]`);
    console.log(`    the two pair slots in THIS statistic are worth 2*lambda_bulk = ${f4(2 * lamBulk)}, ${f3(100 * 2 * lamBulk / (rows[3][1] + rows[3][3]))}% of the d<120 total [sibling's null note said 52%]`);
  }
}
console.log('');

// ---------------------------------------------------------------------------
console.log('SEC 6 — ERRORS AND FITS: 40-block jackknife instead of the sibling\'s bootstrap');
{
  const HW = [];
  for (let k = 10; k < 16; k++) HW.push([Math.pow(10, k / 2), Math.pow(10, (k + 1) / 2)]);
  const X = [], Y = [], E = [], YR = [], ER = [];
  for (const [a, b] of HW) {
    const [lo, hi] = rangeFor(a, b);
    const s = stats(lo, hi);
    const NB = 40, bl = Math.floor((hi - lo) / NB), vals = [], ratios = [];
    for (let bi = 0; bi < NB; bi++) {
      let Sn = 0, SS = 0, Sg = 0, Sg2 = 0;
      for (let i = lo; i < hi; i++) {
        if (i >= lo + bi * bl && i < lo + (bi + 1) * bl) continue;
        Sn += nArr[i]; SS += sArr[i]; Sg += gArr[i]; Sg2 += gArr[i] * gArr[i];
      }
      const R = Sg2 / (2 * Sg), h = SS / Sn;
      vals.push(h - R); ratios.push(h / R - 1);
    }
    const jk = arr => { const m = arr.reduce((p, q) => p + q) / arr.length; let v = 0; for (const z of arr) v += (z - m) ** 2; return Math.sqrt((arr.length - 1) / arr.length * v); };
    X.push(s.mlp); Y.push(s.h - s.R); E.push(jk(vals)); YR.push(s.h / s.R - 1); ER.push(jk(ratios));
    console.log(`  [1e${(Math.log10(a)).toFixed(1)},1e${(Math.log10(b)).toFixed(1)}): lnp=${f3(s.mlp)} | h-R=${f3(s.h - s.R)}+-${f3(jk(vals))} | h/R-1=${f4(s.h / s.R - 1)}+-${f4(jk(ratios))} | A_f=${f3(s.Af)} vs lnp-4C2/lnp=${f3(s.mlp - 4 * C2 / s.mlp)} | 1/lam=${f3(1 / s.lam)} vs lnp=${f3(s.mlp)} | 2/E[n]=${f4(2 / s.En)} vs 4C2/lnp=${f4(4 * C2 / s.mlp)}`);
  }
  function wls(basis, y, e) {
    const K = basis.length, M = X.length;
    const AtA = [], Atb = new Float64Array(K);
    for (let i = 0; i < K; i++) AtA.push(new Float64Array(K));
    for (let m = 0; m < M; m++) {
      const w = 1 / (e[m] ** 2), v = basis.map(f => f(X[m]));
      for (let i = 0; i < K; i++) { Atb[i] += w * v[i] * y[m]; for (let j = 0; j < K; j++) AtA[i][j] += w * v[i] * v[j]; }
    }
    const Mx = AtA.map((r, i) => Array.from(r).concat([Atb[i]]));
    for (let c = 0; c < K; c++) {
      let piv = c; for (let r = c + 1; r < K; r++) if (Math.abs(Mx[r][c]) > Math.abs(Mx[piv][c])) piv = r;
      const t = Mx[c]; Mx[c] = Mx[piv]; Mx[piv] = t;
      for (let r = 0; r < K; r++) if (r !== c) { const f = Mx[r][c] / Mx[c][c]; for (let j = c; j <= K; j++) Mx[r][j] -= f * Mx[c][j]; }
    }
    const co = Mx.map((r, i) => r[K] / r[i]);
    let c2 = 0;
    for (let m = 0; m < M; m++) { let pr = 0; for (let i = 0; i < K; i++) pr += co[i] * basis[i](X[m]); c2 += ((y[m] - pr) / e[m]) ** 2; }
    return { co, c2, df: M - K };
  }
  console.log('  h/R - 1 refit on the SAME six points, jackknife errors (sibling, bootstrap: N1 0.883, N2 8.127, N4 0.762):');
  for (const [nm, bs] of [
    ['N1  k/ln^2 p         (limit 1)', [x => 1 / (x * x)]],
    ['N2  k/ln p           (limit 1)', [x => 1 / x]],
    ['N3  k1/lnp+k2/ln^2p  (limit 1)', [x => 1 / x, x => 1 / (x * x)]],
    ['N4  c0 + c1/lnp      (plateau)', [x => 1, x => 1 / x]],
    ['N5  k lnlnp/ln^2 p   (limit 1)', [x => Math.log(x) / (x * x)]],
  ]) { const r = wls(bs, YR, ER); console.log(`    ${nm}: coeffs ${r.co.map(f4).join(', ')} | chi2/df = ${f3(r.c2 / r.df)} (${f2(r.c2)}/${r.df})`); }
  console.log('  h - R itself:');
  for (const [nm, bs] of [['constant ', [x => 1]], ['a + b lnp', [x => 1, x => x]], ['k lnlnp  ', [x => Math.log(x)]]]) {
    const r = wls(bs, Y, E); console.log(`    ${nm}: coeffs ${r.co.map(f4).join(', ')} | chi2/df = ${f3(r.c2 / r.df)}`);
  }
}
console.log('');

// ---------------------------------------------------------------------------
console.log('SEC 7 — THE SHORTFALL SPLIT IS BASIS-DEPENDENT (the sibling\'s 72/28)');
for (let w = 0; w < 5; w++) {
  const b = sibBeta[w], c = sibCV2[w], short = 2 - b * c;
  console.log(`  ${wn[w]}: shortfall ${f4(short)} | sibling order: beta ${f3(100 * (2 - b) * c / short)}% CV^2 ${f3(100 * 2 * (1 - c) / short)}% | other order: beta ${f3(100 * (2 - b) / short)}% CV^2 ${f3(100 * b * (1 - c) / short)}%`);
}
console.log('  both are exact decompositions of the same number; "beta carries 72%" is a convention, not a measurement.');
console.log('');

console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0828-head.js
//   invocation:  node research/history/staging/redteam-0828-head.js
//   code-sha256: 08dfca3ad5f4f7d3b51a217334414f1a0c42f1d1ed1ea776aa49ef08023f935a
//   out-sha256:  dbaa790ac900837f088c630cecdb150766e2fef8b65f333e8a32d04e6dc7f7f5
//   body-lines:  137
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     2.0 s
// ============================================================================
// SEC 0 — INDEPENDENT ENGINE: census SEC 6(b) and the siblings' per-decade table
//   [11,1e4): E[g]=49.241 E[n]=6.034 R=42.929 h=46.931 h/R=1.0932 h-R=4.001 | alpha=0.10167 beta=1.028 CV^2=0.7436 | A=7.120 B=-3.119 A_f=7.829 D=-0.709
//   [1e4,1e5): E[g]=88.463 E[n]=8.216 R=76.990 h=82.998 h/R=1.0780 h-R=6.007 | alpha=0.08067 beta=1.079 CV^2=0.7406 | A=10.311 B=-4.303 A_f=10.524 D=-0.213
//   [1e5,1e6): E[g]=129.573 E[n]=9.921 R=118.438 h=123.370 h/R=1.0416 h-R=4.932 | alpha=0.06645 beta=1.310 CV^2=0.8281 | A=12.017 B=-7.085 A_f=12.859 D=-0.843
//   [1e6,1e7): E[g]=177.129 E[n]=11.535 R=164.022 h=169.718 h/R=1.0347 h-R=5.696 | alpha=0.05770 beta=1.314 CV^2=0.8520 | A=14.291 B=-8.594 A_f=15.183 D=-0.892
//   [1e7,1e8): E[g]=236.014 E[n]=13.366 R=223.520 h=229.199 h/R=1.0254 h-R=5.679 | alpha=0.05079 beta=1.379 CV^2=0.8941 | A=16.562 B=-10.883 A_f=17.508 D=-0.946
//   census-convention h at [1e7,1e8) = 229.199 over 5096856 prime origins [census 229.199]
//   440309 completed gaps, 5761452 primes >= 7 walked, 20 censored at the range end
//
// SEC 1 — THE COMPARATOR: R is the CONTINUUM functional, a discrete origin sees more
//   [1e7,1e8): R = sum g^2/(2 sum g)                    = 223.5196
//              uniform INTEGER origin,     measured    = 224.0196   (exactly R + 1/2 = 224.0196)
//              uniform ODD origin,         measured    = 224.5196   (exactly R + 1   = 224.5196)
//              uniform COPRIME-30 origin,  measured    = 226.2737   (offset 2.7541)
//              uniform COPRIME-210 origin, measured    = 226.8591   (offset 3.3395)
//   the prime origin's excess over a like-for-like origin:
//      h - R           = 5.679   (the notes' number: prime origin against a CONTINUUM origin)
//      h - (R + 1/2)   = 5.179   (against a uniform integer origin)
//      h - R_coprime30 = 2.925   (against the population primes >= 7 actually live in)
//      h - R_coprime210= 2.340   (against the coprime-to-210 population)
//   so 8.804% to 58.800% of the quoted h - R is the comparator convention, not a prime effect
//   per decade, h-R | h-R-1/2 (integer-origin check in brackets):
//     [11,1e4): 4.001 | 3.501   [0.5000]
//     [1e4,1e5): 6.007 | 5.507   [0.5000]
//     [1e5,1e6): 4.932 | 4.432   [0.5000]
//     [1e6,1e7): 5.696 | 5.196   [0.5000]
//     [1e7,1e8): 5.679 | 5.179   [0.5000]
//
// SEC 2 — THE "IFF": h/R -> 1 does not need beta*CV^2 -> 2
//   exact: h - R = (1/lambda)(1 - beta CV^2/2) + D - 2/E[n];  R = E[g](1+CV^2)/2 grows like ln^2 p
//   [1e4,1e5): h-R=6.007 = 6.464 + D -0.213 - 2/E[n] 0.243 | (h-R)/R=0.0780 | R/(1/lam)=7.15 (grows like ln p)
//   [1e5,1e6): h-R=4.932 = 5.976 + D -0.843 - 2/E[n] 0.202 | (h-R)/R=0.0416 | R/(1/lam)=9.07 (grows like ln p)
//   [1e6,1e7): h-R=5.696 = 6.762 + D -0.892 - 2/E[n] 0.173 | (h-R)/R=0.0347 | R/(1/lam)=10.68 (grows like ln p)
//   [1e7,1e8): h-R=5.679 = 6.775 + D -0.946 - 2/E[n] 0.150 | (h-R)/R=0.0254 | R/(1/lam)=12.66 (grows like ln p)
//   (h-R)/R is O(ln p / ln^2 p) for ANY bounded beta*CV^2, so h/R -> 1 follows from boundedness alone.
//   beta*CV^2 -> 2 buys h - R = O(1), i.e. the RATE 1/ln^2 p rather than 1/ln p. Different claims.
//   and under beta*CV^2 -> 2 with D -> -0.95, h - R -> -0.95: h falls BELOW R, so the fitted
//   law h/R - 1 = +8.4661/ln^2 p has the wrong sign in the limit the sibling conjectures:
//     ln p=17.95: R=237.85 | under beta CV^2 = 2, h/R-1 = -3.99e-3 | fitted law gives 2.63e-2
//     ln p=27.60: R=562.53 | under beta CV^2 = 2, h/R-1 = -1.69e-3 | fitted law gives 1.11e-2
//     ln p=46.05: R=1565.97 | under beta CV^2 = 2, h/R-1 = -6.07e-4 | fitted law gives 3.99e-3
//   what the N4 plateau h/R - 1 -> c0 = -0.0315 requires of beta*CV^2 (D = -0.95, CV^2 = 0.95):
//     ln p=17.95: needs beta CV^2 = 2.713
//     ln p=27.60: needs beta CV^2 = 3.208
//     ln p=46.05: needs beta CV^2 = 4.099
//     ln p=100.00: needs beta CV^2 = 6.633
//   beta*CV^2 is measured at 0.80 -> 1.23 and both factors are conjectured bounded, so the plateau is
//   not merely "not required by the data": the sibling's own identity excludes it unless beta diverges.
//
// SEC 3 — MOD-30 WITH PER-CLASS MARGINALS SUBTRACTED FIRST (repo rule)
//   class | w_c (prime share) | v_c (integer share) |   h_c   |   R_c   | w_c(h_c-R_c) | (w_c-v_c)R_c
//     1   |      0.12497      |      0.12500      | 230.246 | 226.512 |   0.4666    |  -0.0057
//     7   |      0.12501      |      0.12500      | 221.790 | 220.512 |   0.1597    |  0.0025
//    11   |      0.12502      |      0.12500      | 232.358 | 226.585 |   0.7216    |  0.0045
//    13   |      0.12499      |      0.12500      | 228.960 | 224.585 |   0.5467    |  -0.0033
//    17   |      0.12500      |      0.12500      | 231.436 | 230.494 |   0.1177    |  0.0003
//    19   |      0.12501      |      0.12500      | 230.217 | 228.494 |   0.2153    |  0.0016
//    23   |      0.12502      |      0.12500      | 226.844 | 224.494 |   0.2938    |  0.0045
//    29   |      0.12498      |      0.12500      | 231.743 | 228.512 |   0.4038    |  -0.0045
//   h - R_cop30 = 2.9253 = within-class 2.9254 + class-reweighting -0.0001
//   the class-correlation term is -0.0001: 0.003% of the like-for-like excess,
//   and 0.002% of the notes' h - R = 5.679. Sibling's answer NO is confirmed, by a valid route.
//   sibling bound 1 reproduced: mean shift -0.0854; TV 0.0188 over 5761432 heads; TV*30 = 0.563
//   bound 2 (TV*30) is NOT an upper bound on a mean shift: mass moved from h = 2 to h = 302 shifts the
//   mean by 300 and leaves the mod-30 histogram unchanged. The class-reweighting term above is the bound.
//
// SEC 4 — LEFT/RIGHT AROUND A TWIN PAIR, model-free: primes at centre-distance +s and -s
//   381332 twin pairs in [1e7,1e8); m = a+1 is the pair centre; only odd s can hold a prime
//   cumulative primes per pair above vs below the centre:
//     s <=   1: up 1.0000  down 1.0000  difference 0.0000  (Poisson sd 0.0023, so 0.00 sd)
//     s <=  29: up 2.3957  down 2.3959  difference -0.0002  (Poisson sd 0.0035, so -0.05 sd)
//     s <=  59: up 4.0361  down 4.0391  difference -0.0030  (Poisson sd 0.0046, so -0.65 sd)
//     s <= 119: up 7.3751  down 7.3773  difference -0.0023  (Poisson sd 0.0062, so -0.36 sd)
//     s <= 199: up 11.9752  down 11.9807  difference -0.0055  (Poisson sd 0.0079, so -0.70 sd)
//   the measured prime field around a twin pair is symmetric with no HL input, so
//   head-residual-null.md §3 reading 2 ("the asymmetry is the mechanism naming itself") is refuted
//   by data alone; hl3's reflection argument is confirmed but was not needed to close it.
//
// SEC 5 — HARDY-LITTLEWOOD FROM SCRATCH: psi, rho, W(g), Delta_HL
//   P5 = prod_{q>=5}(1 - 2/((q-1)(q-2))) = 0.721603026   ->   3*P5 = 2.164809078
//   independent route: published S(0,2,6) = 2.858248596, /S(0,2) = 2.164809087
//   Cesaro mean of psi over all t <= 200000: 0.9999 (HL normalisation forces 1 asymptotically)
//   D(T) = sum_{t<=T}(1 - psi): 30:3.429  120:5.688  1000:8.475  10000:10.511  100000:12.924  200000:11.645
//   fit D(T) = c ln T + C on [1e3,2e5]: c = 0.722 (sibling 0.844); D(T)/ln T = 1.227 1.141 1.123 0.954
//     g= 300: mean rho over t in [3,g-1] = 0.9582  (sibling 0.9582 0.9760 0.9827 0.9910)
//     g= 606: mean rho over t in [3,g-1] = 0.9760  (sibling 0.9582 0.9760 0.9827 0.9910)
//     g=1002: mean rho over t in [3,g-1] = 0.9827  (sibling 0.9582 0.9760 0.9827 0.9910)
//     g=2010: mean rho over t in [3,g-1] = 0.9910  (sibling 0.9582 0.9760 0.9827 0.9910)
//   Delta = 2 - beta, measured (OLS s.e. and 40-block jackknife s.e.) against HL, zero fitted parameters:
//   [1e5,1e6): Delta=0.6900 +-0.0355 (OLS) +-0.0366 (interleaved jk) +-0.0379 (contiguous jk) | Delta_HL=0.7914 [sibling 0.7914] | ratio 1.1470 | miss 2.86 / 2.77 / 2.68 s.e.
//       alpha=0.06645 alpha_HL=0.06724 (apart by 1.178%) lambda_s=0.06113 | Delta = E[g](alpha - lambda_s) amplifies that by 12.48x
//       Delta_HL*lnp/lnlnp = 4.019 | Delta_meas*lnp/lnlnp = 3.504 | the two pair slots are worth 2*lambda_s = 0.1223 of Delta (17.719%)
//   [1e6,1e7): Delta=0.6862 +-0.0148 (OLS) +-0.0185 (interleaved jk) +-0.0196 (contiguous jk) | Delta_HL=0.7124 [sibling 0.7124] | ratio 1.0381 | miss 1.77 / 1.42 / 1.33 s.e.
//       alpha=0.05770 alpha_HL=0.05785 (apart by 0.256%) lambda_s=0.05383 | Delta = E[g](alpha - lambda_s) amplifies that by 14.89x
//       Delta_HL*lnp/lnlnp = 4.004 | Delta_meas*lnp/lnlnp = 3.857 | the two pair slots are worth 2*lambda_s = 0.1077 of Delta (15.688%)
//   [1e7,1e8): Delta=0.6214 +-0.0060 (OLS) +-0.0051 (interleaved jk) +-0.0100 (contiguous jk) | Delta_HL=0.6545 [sibling 0.6545] | ratio 1.0532 | miss 5.49 / 6.51 / 3.31 s.e.
//       alpha=0.05079 alpha_HL=0.05093 (apart by 0.276%) lambda_s=0.04816 | Delta = E[g](alpha - lambda_s) amplifies that by 19.29x
//       Delta_HL*lnp/lnlnp = 4.025 | Delta_meas*lnp/lnlnp = 3.822 | the two pair slots are worth 2*lambda_s = 0.0963 of Delta (15.499%)
//   the siblings' binned profile, reproduced: lambda_bulk = 0.05101 over 107722 band gaps (g >= 300)
//     cut | left meas  left HL | right meas right HL |  sum meas   sum HL
//      30 |  0.4626    0.4838  |  0.1134    0.1143  |  0.5761   0.5981
//      60 |  0.4929    0.5049  |  0.1557    0.1641  |  0.6486   0.6690
//      90 |  0.4966    0.5185  |  0.1421    0.1577  |  0.6388   0.6762
//     120 |  0.5295    0.5623  |  0.1942    0.2241  |  0.7236   0.7864
//     left/right at d<30: measured 4.079 [sibling 4.079], HL 4.232 [sibling 4.232]
//     share of d<120 inside d<30: measured 0.796 [sibling 0.796], HL 0.761 [sibling 0.761]
//     correlation of the 8 shell deficits, measured vs HL: r = 0.9989 [sibling 0.9989]
//     the two pair slots in THIS statistic are worth 2*lambda_bulk = 0.1020, 14.098% of the d<120 total [sibling's null note said 52%]
//
// SEC 6 — ERRORS AND FITS: 40-block jackknife instead of the sibling's bootstrap
//   [1e5.0,1e5.5): lnp=12.188 | h-R=5.545+-0.543 | h/R-1=0.0542+-0.0062 | A_f=11.998 vs lnp-4C2/lnp=11.971 | 1/lam=12.214 vs lnp=12.188 | 2/E[n]=0.2158 vs 4C2/lnp=0.2167
//   [1e5.5,1e6.0): lnp=13.340 | h-R=5.198+-0.390 | h/R-1=0.0421+-0.0037 | A_f=13.157 vs lnp-4C2/lnp=13.142 | 1/lam=13.354 vs lnp=13.340 | 2/E[n]=0.1967 vs 4C2/lnp=0.1980
//   [1e6.0,1e6.5): lnp=14.492 | h-R=5.844+-0.279 | h/R-1=0.0404+-0.0022 | A_f=14.313 vs lnp-4C2/lnp=14.310 | 1/lam=14.498 vs lnp=14.492 | 2/E[n]=0.1841 vs 4C2/lnp=0.1822
//   [1e6.5,1e7.0): lnp=15.644 | h-R=6.134+-0.178 | h/R-1=0.0360+-0.0011 | A_f=15.480 vs lnp-4C2/lnp=15.475 | 1/lam=15.650 vs lnp=15.644 | 2/E[n]=0.1697 vs 4C2/lnp=0.1688
//   [1e7.0,1e7.5): lnp=16.796 | h-R=5.995+-0.152 | h/R-1=0.0298+-0.0009 | A_f=16.639 vs lnp-4C2/lnp=16.638 | 1/lam=16.796 vs lnp=16.796 | 2/E[n]=0.1571 vs 4C2/lnp=0.1572
//   [1e7.5,1e8.0): lnp=17.947 | h-R=6.061+-0.089 | h/R-1=0.0263+-0.0004 | A_f=17.802 vs lnp-4C2/lnp=17.800 | 1/lam=17.949 vs lnp=17.947 | 2/E[n]=0.1471 vs 4C2/lnp=0.1471
//   h/R - 1 refit on the SAME six points, jackknife errors (sibling, bootstrap: N1 0.883, N2 8.127, N4 0.762):
//     N1  k/ln^2 p         (limit 1): coeffs 8.4771 | chi2/df = 0.832 (4.16/5)
//     N2  k/ln p           (limit 1): coeffs 0.4943 | chi2/df = 7.989 (39.95/5)
//     N3  k1/lnp+k2/ln^2p  (limit 1): coeffs 0.0264, 8.0266 | chi2/df = 1.011 (4.04/4)
//     N4  c0 + c1/lnp      (plateau): coeffs -0.0319, 1.0449 | chi2/df = 0.700 (2.80/4)
//     N5  k lnlnp/ln^2 p   (limit 1): coeffs 2.9901 | chi2/df = 1.597 (7.98/5)
//   h - R itself:
//     constant : coeffs 6.0130 | chi2/df = 1.248
//     a + b lnp: coeffs 4.6625, 0.0796 | chi2/df = 0.896
//     k lnlnp  : coeffs 2.1254 | chi2/df = 0.899
//
// SEC 7 — THE SHORTFALL SPLIT IS BASIS-DEPENDENT (the sibling's 72/28)
//   [11,1e4): shortfall 1.2356 | sibling order: beta 58.497% CV^2 41.503% | other order: beta 78.668% CV^2 21.332%
//   [1e4,1e5): shortfall 1.2009 | sibling order: beta 56.799% CV^2 43.201% | other order: beta 76.693% CV^2 23.307%
//   [1e5,1e6): shortfall 0.9152 | sibling order: beta 62.434% CV^2 37.566% | other order: beta 75.394% CV^2 24.606%
//   [1e6,1e7): shortfall 0.8805 | sibling order: beta 66.382% CV^2 33.618% | other order: beta 77.913% CV^2 22.087%
//   [1e7,1e8): shortfall 0.7670 | sibling order: beta 72.387% CV^2 27.613% | other order: beta 80.961% CV^2 19.039%
//   both are exact decompositions of the same number; "beta carries 72%" is a convention, not a measurement.
//
// elapsed 2.0 s
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
//
// 1. THE COMPARATOR CARRIES 9 TO 59 PERCENT OF THE "PRIME-ORIGIN EXCESS".
//    R = sum g^2/(2 sum g) is the CONTINUUM inspection functional. A discrete
//    uniform integer origin sees R + 1/2 exactly (asserted); an odd origin
//    R + 1; a coprime-to-30 origin R + 2.754; a coprime-to-210 origin R + 3.340.
//    h - R = 5.679 at [1e7,1e8) becomes 5.179, or 2.925 against the population
//    primes >= 7 actually live in. The excess is not comparator-free.
//
// 2. "h/R -> 1 IFF beta CV^2 -> 2" IS FALSE. h - R is O(ln p) for any bounded
//    beta CV^2 and R grows like ln^2 p, so h/R -> 1 follows from boundedness.
//    beta CV^2 -> 2 buys h - R = O(1), i.e. the RATE. Under that limit with
//    D -> -0.95 the ratio goes to 1 from BELOW, so the accepted +8.4661/ln^2 p
//    cannot be the limit law. The N4 plateau needs beta CV^2 = 2.71 at
//    ln p = 17.9 rising to 6.63 at ln p = 100: excluded unless beta diverges.
//
// 3. THE MOD-30 ANSWER IS NO, BY A VALID ROUTE. With per-class marginals
//    subtracted first, h - R_cop30 = 2.9253 = within-class 2.9254 + class
//    reweighting -0.0001. The class-correlation term is 0.002% of the notes'
//    h - R, not "an order of magnitude short". The sibling's bound 2 (TV x 30)
//    is not an upper bound on a mean shift at all.
//
// 4. THE LEFT-HEAVINESS IS BINNING, MEASURED DIRECTLY. Primes per pair at
//    centre-distance +s and -s over 381,332 pairs: 11.9752 up against 11.9807
//    down out to s = 199, a 0.70 Poisson sd difference. No HL input needed.
//
// 5. THE HL MACHINERY REPRODUCES. An independent implementation of psi and rho
//    gives 3*P5 = 2.164809078 against the published-triplet route 2.164809087,
//    rho's interior means 0.9582 / 0.9760 / 0.9827 / 0.9910, Delta_HL = 0.7914,
//    0.7124, 0.6545, the binned profile to the printed digit, L/R 4.079 against
//    HL 4.232, and r = 0.9989 on the eight shells. All of hl3's figures stand.
//
// 6. THE 5.5 S.E. IS STATISTICAL ONLY. At [1e7,1e8) the ratio Delta_HL/Delta =
//    1.0532 sits 5.49 OLS s.e., 6.51 interleaved-jackknife s.e. and 3.31
//    contiguous-jackknife s.e. from 1. It is a 0.276% miss in alpha amplified
//    19.29x by the near-cancellation in Delta = E[g](alpha - lambda_s), and
//    HL's own unquantified 1/ln x term at that height is the same size.
//
// 7. THE FITS SURVIVE THE ERROR MODEL. Jackknife errors instead of the
//    bootstrap: N1 0.832 (sibling 0.883), N2 7.989 (8.127), N4 0.700 (0.762).
//    But the finer comparison flips with the parameterisation: fitting h - R
//    prefers k lnln p (0.899) over a constant (1.248), while fitting h/R - 1
//    prefers k/ln^2 p (0.832) over k lnln p/ln^2 p (1.597).
//
// 8. TWO SMALLER ONES. The divergence rate of the one-opener sum is c = 0.722
//    on four points against the sibling's 0.844 on six of the same points, so
//    it is pinned to about 15%. The 72/28 shortfall split is one of two exact
//    decompositions of the same number; the other order reads 81/19.
