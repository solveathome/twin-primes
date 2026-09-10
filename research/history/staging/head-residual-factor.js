'use strict';
// ============================================================================
// HEAD RESIDUAL FACTOR — where the 1.09 -> 1.03 prime-origin excess comes from
// ============================================================================
// SCRATCHPAD GRADE. Staging companion to research/history/staging/
// head-residual-factor.md (TODO Z4, head half). Not a certified artefact: no
// entry in the QC ledgers, no cross-script reuse intended.
//
// QUESTION. destroyer-census-01.js SEC 6(b) measures, per window,
//   h = mean over primes p of F(p) = (first twin opener > p) - p
//   R = sum g^2 / (2 sum g), the uniform-origin forward-recurrence functional
//       of the SAME window's twin-opener gaps
// and reports h/R = 1.0924 -> 1.0254 over [11,1e4) .. [1e7,1e8). TODO Z4 asks
// whether that residual is the mod-30 small-h class correlation of SEC 6(c),
// and whether it has a derivable form.
//
// WHAT THIS FILE DOES.
//  SEC 0  control: reproduce the census's own SEC 6(b) columns from an
//         independent segmented sieve. If these disagree, nothing below counts.
//  SEC 1  the exact identity h - R = A + B, no model:
//           A = sum_i (S_i - n_i g_i / 2) / sum_i n_i     within-gap placement
//           B = sum_i n_i g_i / (2 sum_i n_i) - R         length/count coupling
//         where gap i runs [a_i, a_{i+1}) between consecutive twin openers,
//         n_i = #primes in it, S_i = sum over those primes of (a_{i+1} - p).
//         B is exactly (1/2)(mean containing-gap seen by a PRIME - mean
//         containing-gap seen by an INTEGER).
//  SEC 2  the derived piece of A. Every gap contains two FORCED primes at its
//         extreme left, p = a_i (F = g_i) and p = a_i + 2 (F = g_i - 2); the
//         right endpoint's forced pair belongs to the NEXT gap. Against the
//         uniform-within-gap surrogate those two contribute an excess of
//         exactly (g_i - 2) each gap, so
//           A_forced = (E[g] - 2) / E[n]  ->  the mean prime gap ~ ln x.
//         Split A = A_forced + D and measure D (all other primes' placement).
//  SEC 3  scaling: h - R over six half-decade windows with a bootstrap over
//         gaps, fitted against constant and against a + b ln p.
//  SEC 4  the mod-30 test: the exact mean shift the residue-class marginal can
//         carry, and the small-h mass, both against the 5.68 to be explained.
//
// CONVENTIONS (research/GLOSSARY.md; destroyer-census-01.js header).
//   twin opener a   a and a+2 both prime.
//   F(p)            first twin opener STRICTLY above p, minus p. Matches the
//                   census: a prime that is itself an opener gets the full
//                   forward gap.
//   gap window      a gap is binned by its LEFT opener a_i; a head is binned
//                   by its own p (the census's convention, kept for SEC 0).
//   censoring       the final incomplete gap and its primes are dropped.
// ============================================================================

const T0 = Date.now();
const N = 1e8;
let failures = 0;
function assertNear(name, got, want, tol) {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) { failures++; console.log(`  ASSERT FAIL ${name}: got ${got} want ${want} +-${tol}`); }
  return ok;
}
const f2 = x => x.toFixed(2), f3 = x => x.toFixed(3), f4 = x => x.toFixed(4);
// deterministic PRNG: the bootstrap must reproduce byte for byte or the embed
// tail cannot bind to the code (mulberry32, fixed seed).
let RNGSTATE = 0x9e3779b9;
function rnd() {
  RNGSTATE = (RNGSTATE + 0x6d2b79f5) | 0;
  let t = RNGSTATE;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// ---------------------------------------------------------------- base sieve
const LIM = Math.floor(Math.sqrt(N)) + 2;
const comp = new Uint8Array(LIM + 1);
const base = [];
for (let i = 2; i <= LIM; i++) {
  if (!comp[i]) { base.push(i); for (let j = i * i; j <= LIM; j += i) comp[j] = 1; }
}

// gap records, one per completed twin-opener gap
const CAP = 460000;
const gArr = new Int32Array(CAP);      // g_i
const nArr = new Int32Array(CAP);      // n_i  primes in [a_i, a_{i+1})
const sArr = new Float64Array(CAP);    // S_i  sum of (a_{i+1} - p)
const lArr = new Int32Array(CAP);      // a_i  (left opener; window key)
let nGap = 0;

// census-style per-window head/gap ensembles (SEC 0 control)
const NW = 5;
const wn = ['[11,1e4)', '[1e4,1e5)', '[1e5,1e6)', '[1e6,1e7)', '[1e7,1e8)'];
const winOf = n => (n < 1e4 ? 0 : n < 1e5 ? 1 : n < 1e6 ? 2 : n < 1e7 ? 3 : 4);
const hN = new Float64Array(NW), hSum = new Float64Array(NW);
const gN = new Float64Array(NW), gSum = new Float64Array(NW), gSum2 = new Float64Array(NW);
const hLn2 = new Float64Array(NW), gLn2 = new Float64Array(NW);
const pLn = new Float64Array(NW), pCnt = new Float64Array(NW);

// mod-30 ensemble, exactly the census's bookkeeping
const headMod30 = new Float64Array(30), pClassTot = new Float64Array(30), aClassTot = new Float64Array(30);
// small-h mass, global and in the top window
let smallCnt = 0, smallSum = 0, allCnt = 0;      // F <= 60, all primes >= 7
let smallCnt4 = 0, smallSum4 = 0, allCnt4 = 0;   // same, window [1e7,1e8)

// -------------------------------------------------------- segmented main walk
const SEG = 1 << 21;
let prevOpener = -1;
let pend = [];                    // primes waiting for their opener
let nPrimesSeen = 0;

for (let lo = 0; lo < N; lo += SEG) {
  const hi = Math.min(lo + SEG, N);
  const len = hi - lo + 3;        // need lo..hi+2 so n+2 is always readable
  const seg = new Uint8Array(len);
  for (let bi = 0; bi < base.length; bi++) {
    const p = base[bi];
    let m = Math.max(p * p, Math.ceil(lo / p) * p);
    for (; m < lo + len; m += p) seg[m - lo] = 1;
  }
  const startN = Math.max(lo, 7) | 1;          // odd, >= 7
  for (let n = startN; n < hi; n += 2) {
    if (seg[n - lo]) continue;                 // n composite
    // n is prime. Is it an opener?
    if (seg[n + 2 - lo] === 0) {
      // n is an opener: settle every pending prime's head, then close the gap
      let S = 0;
      for (let k = 0; k < pend.length; k++) {
        const p = pend[k], h = n - p, w = winOf(p);
        S += h;
        hN[w]++; hSum[w] += h; hLn2[w] += Math.log(p) ** 2;
        headMod30[h % 30]++; pClassTot[p % 30]++; aClassTot[n % 30]++;
        allCnt++; if (h <= 60) { smallCnt++; smallSum += h; }
        if (w === 4) { allCnt4++; if (h <= 60) { smallCnt4++; smallSum4 += h; } }
      }
      if (prevOpener > 0) {
        const g = n - prevOpener, wg = winOf(prevOpener);
        gN[wg]++; gSum[wg] += g; gSum2[wg] += g * g; gLn2[wg] += Math.log(prevOpener) ** 2;
        gArr[nGap] = g; nArr[nGap] = pend.length; sArr[nGap] = S; lArr[nGap] = prevOpener;
        nGap++;
      }
      prevOpener = n;
      pend.length = 0;
    }
    pend.push(n);
    nPrimesSeen++;
    const wp = winOf(n); pLn[wp] += Math.log(n); pCnt[wp]++;
  }
}
const dropped = pend.length;

console.log('SEC 0 — CONTROL: independent reproduction of destroyer-census-01 SEC 6(b)');
console.log('  window | g | R | h | h/R  (census embedded value in brackets)');
const censusHR = [1.0924, 1.0780, 1.0416, 1.0347, 1.0254];
const censusR = [42.929, 76.990, 118.438, 164.022, 223.520];
const censusH = [46.896, 82.994, 123.368, 169.718, 229.199];
for (let w = 0; w < NW; w++) {
  const mg = gSum[w] / gN[w], R = gSum2[w] / (2 * gSum[w]), mh = hSum[w] / hN[w];
  console.log(`  ${wn[w]}: g=${f3(mg)} R=${f3(R)} h=${f3(mh)} h/R=${f4(mh / R)}  [census R=${censusR[w]} h=${censusH[w]} h/R=${censusHR[w]}]  (${gN[w]} gaps, ${hN[w]} prime origins)`);
  assertNear(`R@${wn[w]}`, R, censusR[w], 0.002);
  assertNear(`h@${wn[w]}`, mh, censusH[w], 0.002);
  assertNear(`h/R@${wn[w]}`, mh / R, censusHR[w], 0.0002);
}
console.log(`  ${nGap} completed gaps, ${nPrimesSeen} primes >= 7 walked, ${dropped} censored at the range end`);
console.log('');

// ------------------------------------------------------------ the identity
function stats(lo, hi) {   // gap index range [lo,hi)
  let Sn = 0, SS = 0, Sg = 0, Sg2 = 0, Sng = 0, Sf = 0, Snp = 0, Ssp = 0;
  for (let i = lo; i < hi; i++) {
    const g = gArr[i], n = nArr[i], S = sArr[i];
    Sn += n; SS += S; Sg += g; Sg2 += g * g; Sng += n * g;
    Sf += g - 2;                       // the two forced primes' excess
    Snp += n - 2; Ssp += S - (2 * g - 2);
  }
  const R = Sg2 / (2 * Sg), h = SS / Sn, h1 = Sng / (2 * Sn);
  const A = h - h1, B = h1 - R;
  const Aforced = Sf / Sn;
  const D = A - Aforced;
  // OLS of the gap's prime count n_i on its length g_i, and the exact identity
  //   B = Var(g) (alpha - lambda) / (2 E[n]) = - beta Var(g) / (2 E[g] E[n]).
  // beta is the intercept: how many primes a gap holds ABOVE the mean-density
  // prediction. The two forced left-end primes make beta = 2 - 2 lambda under an
  // independent-Poisson interior; a depressed interior pulls it below that.
  const G = hi - lo;
  const mg = Sg / G, mn = Sn / G, varg = Sg2 / G - mg * mg;
  const alpha = (Sng / G - mn * mg) / varg, beta = mn - alpha * mg;
  const lambda = Sn / Sg;
  const Bid = varg * (alpha - lambda) / (2 * mn);
  const cv2 = varg / (mg * mg);
  // the placement term of the NON-forced primes alone, as an independent read
  const Dalt = Ssp / Snp - (Sng - 2 * Sg) / (2 * Snp);
  return { R, h, h1, A, B, Aforced, D, Dalt, alpha, beta, lambda, cv2, varg, Bid, Eg: Sg / (hi - lo), En: Sn / (hi - lo), nGaps: hi - lo, Sn };
}
// window index ranges over the gap array (gaps are stored in increasing a_i)
function rangeFor(a, b) {
  let lo = 0; while (lo < nGap && lArr[lo] < a) lo++;
  let hi = lo; while (hi < nGap && lArr[hi] < b) hi++;
  return [lo, hi];
}

console.log('SEC 1 — THE EXACT IDENTITY  h - R = A + B  (no model; A, B as defined in the header)');
console.log('  window | h-R | A within-gap placement | B length/count coupling | E[g] | E[n]');
const decades = [[11, 1e4], [1e4, 1e5], [1e5, 1e6], [1e6, 1e7], [1e7, 1e8]];
const dec = [];
for (let w = 0; w < NW; w++) {
  const [lo, hi] = rangeFor(decades[w][0], decades[w][1]);
  const s = stats(lo, hi); dec.push(s);
  assertNear(`identity@${wn[w]}`, s.A + s.B, s.h - s.R, 1e-9);
  console.log(`  ${wn[w]}: h-R=${f3(s.h - s.R)} | A=${f3(s.A)} | B=${f3(s.B)} | E[g]=${f2(s.Eg)} E[n]=${f3(s.En)}`);
}
console.log('  (gaps binned by left opener here, so h-R differs slightly from SEC 0 at window edges)');
console.log('');

console.log('SEC 2 — A SPLIT: the two forced left-end primes, derived, vs everything else');
console.log('  A_forced = (E[g]-2)/E[n], closed form; D = A - A_forced measured; 1/lambda = mean prime gap');
for (let w = 0; w < NW; w++) {
  const s = dec[w];
  const invLambda = (decades[w][1] - decades[w][0]) / s.Sn;
  console.log(`  ${wn[w]}: A=${f3(s.A)} = A_forced ${f3(s.Aforced)} + D ${f3(s.D)} | (E[g]-2)/E[n]=${f3((s.Eg - 2) / s.En)} | 1/lambda=${f3(invLambda)} | mean ln p=${f3(pLn[w] / pCnt[w])}`);
  assertNear(`Aforced closed form@${wn[w]}`, s.Aforced, (s.Eg - 2) / s.En, 1e-9);
}
console.log('');

console.log('SEC 2b — B IS AN EXACT IDENTITY IN THE REGRESSION OF PRIME COUNT ON GAP LENGTH');
console.log('  B = Var(g)(alpha - lambda)/(2 E[n]) = - beta Var(g)/(2 E[g] E[n]), beta = OLS intercept of n_i on g_i');
console.log('  null with an independent-Poisson interior: beta = 2 - 2 lambda (the two forced left-end primes)');
for (let w = 0; w < NW; w++) {
  const s = dec[w];
  console.log(`  ${wn[w]}: beta=${f3(s.beta)} (null ${f3(2 - 2 * s.lambda)}) | CV^2(g)=${f4(s.cv2)} | B=${f3(s.B)} identity ${f3(s.Bid)} | -beta CV^2 lnp/2 = ${f3(-s.beta * s.cv2 * (pLn[w] / pCnt[w]) / 2)}`);
  assertNear(`B identity@${wn[w]}`, s.B, s.Bid, 1e-9);
}
console.log('  so h - R = [ln p - 4C2/ln p] + D - (beta CV^2 / 2) ln p: the two ln p terms cancel iff beta CV^2 -> 2');
for (let w = 1; w < NW; w++) {
  const s = dec[w];
  console.log(`  ${wn[w]}: beta*CV^2 = ${f4(s.beta * s.cv2)} (needs 2) | implied ln p coefficient of h-R = ${f4(1 - s.beta * s.cv2 / 2)}`);
}
console.log('');

// ---------------------------------------------------------------- SEC 3 scaling
console.log('SEC 3 — SCALING of h - R, six half-decade windows, bootstrap over gaps (B=200)');
const HW = [];
for (let k = 10; k < 16; k++) HW.push([Math.pow(10, k / 2), Math.pow(10, (k + 1) / 2)]);
const B = 200;
console.log('  window | lnp | h-R +- sd | A_forced | D | B | B/E[g] +- sd | h/R-1 +- sd');
const fitX = [], fitY = [], fitE = [], fitRat = [], fitRatE = [];
const C2 = 0.66016181584686957392;
for (const [a, b] of HW) {
  const [lo, hi] = rangeFor(a, b);
  const s = stats(lo, hi);
  // prime-weighted mean ln p inside the window
  let sl = 0, sc = 0;
  for (let i = lo; i < hi; i++) { sl += nArr[i] * Math.log(lArr[i]); sc += nArr[i]; }
  const mlp = sl / sc;
  const m = hi - lo;
  const r1 = new Float64Array(B), r2 = new Float64Array(B), r3 = new Float64Array(B);
  for (let r = 0; r < B; r++) {
    let Sn = 0, SS = 0, Sg = 0, Sg2 = 0, Sng = 0;
    for (let t = 0; t < m; t++) {
      const i = lo + (rnd() * m) | 0;
      Sn += nArr[i]; SS += sArr[i]; Sg += gArr[i]; Sg2 += gArr[i] * gArr[i]; Sng += nArr[i] * gArr[i];
    }
    const RR = Sg2 / (2 * Sg), hh = SS / Sn, BB = Sng / (2 * Sn) - RR;
    r1[r] = hh - RR; r2[r] = BB / (Sg / m); r3[r] = hh / RR - 1;
  }
  const sdOf = arr => {
    let mu = 0; for (let r = 0; r < B; r++) mu += arr[r]; mu /= B;
    let v = 0; for (let r = 0; r < B; r++) v += (arr[r] - mu) ** 2;
    return Math.sqrt(v / (B - 1));
  };
  const sd = sdOf(r1), sdBg = sdOf(r2), sdHR = sdOf(r3);
  const hr = s.h / s.R - 1;
  console.log(`  [1e${(Math.log10(a)).toFixed(1)},1e${(Math.log10(b)).toFixed(1)}): lnp=${f3(mlp)} | h-R=${f3(s.h - s.R)}+-${f3(sd)} | Af=${f3(s.Aforced)} | D=${f3(s.D)} | B=${f3(s.B)} | B/E[g]=${f4(s.B / s.Eg)}+-${f4(sdBg)} | A/R=${f4(s.A / s.R)} B/R=${f4(s.B / s.R)} | h/R-1=${f4(hr)}+-${f4(sdHR)}`);
  fitX.push(mlp); fitY.push(s.h - s.R); fitE.push(sd); fitRat.push(hr); fitRatE.push(sdHR);
}
console.log('  A_forced closed form check: A_forced = 1/lambda - 2/E[n] = ln p - 4 C2 / ln p exactly to PNT+HL;');
for (let i = 0; i < HW.length; i++)
  console.log(`      lnp=${f3(fitX[i])}: ln p - 4C2/ln p = ${f3(fitX[i] - 4 * C2 / fitX[i])}`);
// weighted fits: constant, and a + b ln p
function chi2const() {
  let sw = 0, swy = 0;
  for (let i = 0; i < fitX.length; i++) { const w = 1 / (fitE[i] ** 2); sw += w; swy += w * fitY[i]; }
  const c = swy / sw;
  let c2 = 0; for (let i = 0; i < fitX.length; i++) c2 += ((fitY[i] - c) / fitE[i]) ** 2;
  return { c, c2, df: fitX.length - 1 };
}
function chi2lin() {
  let sw = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < fitX.length; i++) {
    const w = 1 / (fitE[i] ** 2);
    sw += w; sx += w * fitX[i]; sy += w * fitY[i]; sxx += w * fitX[i] ** 2; sxy += w * fitX[i] * fitY[i];
  }
  const det = sw * sxx - sx * sx;
  const bb = (sw * sxy - sx * sy) / det, aa = (sxx * sy - sx * sxy) / det;
  const sb = Math.sqrt(sw / det);
  let c2 = 0; for (let i = 0; i < fitX.length; i++) c2 += ((fitY[i] - aa - bb * fitX[i]) / fitE[i]) ** 2;
  return { a: aa, b: bb, sb, c2, df: fitX.length - 2 };
}
const fc = chi2const(), fl = chi2lin();
console.log(`  fit  h-R = c        : c = ${f3(fc.c)}, chi2/df = ${f3(fc.c2 / fc.df)} (${f2(fc.c2)}/${fc.df})`);
console.log(`  fit  h-R = a + b lnp: a = ${f3(fl.a)}, b = ${f4(fl.b)} +- ${f4(fl.sb)} (${f2(Math.abs(fl.b / fl.sb))} sigma from 0), chi2/df = ${f3(fl.c2 / fl.df)} (${f2(fl.c2)}/${fl.df})`);
// the candidate law:  h/R - 1 = c0 + c1 / ln p, with c0 the B/R plateau
{
  let sw = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < fitX.length; i++) {
    const w = 1 / (fitRatE[i] ** 2), u = 1 / fitX[i];
    sw += w; sx += w * u; sy += w * fitRat[i]; sxx += w * u * u; sxy += w * u * fitRat[i];
  }
  const det = sw * sxx - sx * sx;
  const c1 = (sw * sxy - sx * sy) / det, c0 = (sxx * sy - sx * sxy) / det;
  const s0 = Math.sqrt(sxx / det), s1 = Math.sqrt(sw / det);
  let c2 = 0;
  for (let i = 0; i < fitX.length; i++) c2 += ((fitRat[i] - c0 - c1 / fitX[i]) / fitRatE[i]) ** 2;
  console.log(`  fit  h/R - 1 = c0 + c1/lnp: c0 = ${f4(c0)} +- ${f4(s0)}, c1 = ${f3(c1)} +- ${f3(s1)}, chi2/df = ${f3(c2 / (fitX.length - 2))}`);
  console.log(`       residuals (meas - fit): ${fitRat.map((y, i) => f4(y - c0 - c1 / fitX[i])).join('  ')}`);
  if (c0 < 0 && c1 > 0) console.log(`       the fitted law crosses h = R at ln p = ${f2(-c1 / c0)}, i.e. p ~ 1e${f2(-c1 / c0 / Math.LN10)}`);
  // model comparison on the SAME six points and the same bootstrap errors.
  // Every model but the last forces h/R -> 1; the last allows a plateau.
  function wls(basis) {                       // basis: array of functions of lnp
    const K = basis.length, M = fitX.length;
    const AtA = [], Atb = new Float64Array(K);
    for (let i = 0; i < K; i++) AtA.push(new Float64Array(K));
    for (let m = 0; m < M; m++) {
      const w = 1 / (fitRatE[m] ** 2), v = basis.map(f => f(fitX[m]));
      for (let i = 0; i < K; i++) { Atb[i] += w * v[i] * fitRat[m]; for (let j = 0; j < K; j++) AtA[i][j] += w * v[i] * v[j]; }
    }
    // gaussian elimination
    const Mx = AtA.map((r, i) => Array.from(r).concat([Atb[i]]));
    for (let c = 0; c < K; c++) {
      let piv = c; for (let r = c + 1; r < K; r++) if (Math.abs(Mx[r][c]) > Math.abs(Mx[piv][c])) piv = r;
      const t = Mx[c]; Mx[c] = Mx[piv]; Mx[piv] = t;
      for (let r = 0; r < K; r++) if (r !== c) { const f = Mx[r][c] / Mx[c][c]; for (let j = c; j <= K; j++) Mx[r][j] -= f * Mx[c][j]; }
    }
    const co = Mx.map((r, i) => r[K] / r[i]);
    let c2 = 0;
    for (let m = 0; m < M; m++) {
      let pr = 0; for (let i = 0; i < K; i++) pr += co[i] * basis[i](fitX[m]);
      c2 += ((fitRat[m] - pr) / fitRatE[m]) ** 2;
    }
    return { co, c2, df: M - K };
  }
  const models = [
    ['N1  k/ln^2 p          (limit 1)', [x => 1 / (x * x)]],
    ['N2  k/ln p            (limit 1)', [x => 1 / x]],
    ['N3  k1/lnp + k2/ln^2p (limit 1)', [x => 1 / x, x => 1 / (x * x)]],
    ['N4  c0 + c1/lnp       (limit 1+c0)', [x => 1, x => 1 / x]],
  ];
  for (const [nm, bs] of models) {
    const r = wls(bs);
    console.log(`  ${nm}: coeffs ${r.co.map(f4).join(', ')} | chi2 = ${f2(r.c2)} / ${r.df} df = ${f3(r.c2 / r.df)}`);
  }
}
console.log('');

// ---------------------------------------------------------------- SEC 4 mod 30
console.log('SEC 4 — THE MOD-30 QUESTION: how much of h - R can the class correlation carry?');
{
  let tot = 0; for (let c = 0; c < 30; c++) tot += headMod30[c];
  let settles = 0; for (let c = 0; c < 30; c++) settles += pClassTot[c];
  const nullV = new Float64Array(30);
  for (let c = 0; c < 30; c++) {
    let s = 0;
    for (let i = 0; i < 30; i++) s += (pClassTot[i] / settles) * (aClassTot[(i + c) % 30] / settles);
    nullV[c] = s * tot;
  }
  const rows = [];
  for (let c = 0; c < 30; c++) if (headMod30[c] > 0) rows.push([c, headMod30[c], nullV[c], headMod30[c] / nullV[c]]);
  rows.sort((x, y) => Math.abs(y[3] - 1) - Math.abs(x[3] - 1));
  console.log('  6 most deviant residues (residue: meas/null): ' + rows.slice(0, 6).map(r => `${r[0]}: ${f3(r[3])}`).join('  '));
  let d30 = 0, tv = 0;
  for (let c = 0; c < 30; c++) { d30 += c * (headMod30[c] - nullV[c]) / tot; tv += Math.abs(headMod30[c] - nullV[c]) / (2 * tot); }
  console.log(`  residue-marginal mean shift  Delta30 = sum_c c (P_meas - P_null) = ${f4(d30)}  (total variation ${f4(tv)}, over ${tot} heads)`);
  console.log(`  worst-case bound if ALL of that TV mass moved a full 30 positions: ${f3(tv * 30)}`);
  console.log(`  small-h mass (F <= 60): all p: ${f4(smallCnt / allCnt)} of origins carrying ${f3(smallSum / allCnt)} of h; [1e7,1e8): ${f4(smallCnt4 / allCnt4)} carrying ${f3(smallSum4 / allCnt4)} of h=${f3(hSum[4] / hN[4])}`);
  console.log(`  so a 7.4% distortion confined to the small-h mass can move h by at most ${f3(0.074 * smallSum4 / allCnt4)}, against h - R = ${f3(dec[4].h - dec[4].R)}`);
}
console.log('');

console.log('SEC 5 — CLOSING THE COEFFICIENT: c_h = c_g x (1+CV^2)/2 x (h/R), all three factors measured');
console.log('  c_g is the window\'s own twin-gap coefficient (HL predicts 1/(2 C2) = 0.7574); the second factor is');
console.log('  the renewal correction R/E[g], which is 1 exactly when twin gaps are Poisson (CV^2 = 1).');
for (let w = 0; w < NW; w++) {
  const cg = gSum[w] / gLn2[w], ch = hSum[w] / hLn2[w];
  const mg = gSum[w] / gN[w], cv2 = (gSum2[w] / gN[w]) / (mg * mg) - 1;
  const R = gSum2[w] / (2 * gSum[w]), hh = hSum[w] / hN[w];
  const pred = cg * (1 + cv2) / 2 * (hh / R);
  console.log(`  ${wn[w]}: c_g=${f4(cg)} | (1+CV^2)/2=${f4((1 + cv2) / 2)} | h/R=${f4(hh / R)} | predicted c_h=${f4(pred)} | measured c_h=${f4(ch)} | ratio ${f4(ch / pred)}`);
}
console.log('  the two open factors are exactly these: CV^2 -> 1 (twin gaps Poisson, a Hardy-Littlewood consequence)');
console.log('  and h/R -> 1 (the prime-origin factor, SEC 3). Granted both, c_h -> c_g -> 1/(2 C2) = 0.7574.');
console.log('');
console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/head-residual-factor.js
//   invocation:  node research/history/staging/head-residual-factor.js
//   code-sha256: 118dbbbbf9e34216ca0ff92d3b46dd458730f287385f2c9335804b659dd2dcca
//   out-sha256:  95beaed36ef6a9b738ac0c476701d88730171bb4bbbc19c3ecdb74defaf63a81
//   body-lines:  85
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     1.6 s
// ============================================================================
// SEC 0 — CONTROL: independent reproduction of destroyer-census-01 SEC 6(b)
//   window | g | R | h | h/R  (census embedded value in brackets)
//   [11,1e4): g=49.241 R=42.929 h=46.896 h/R=1.0924  [census R=42.929 h=46.896 h/R=1.0924]  (203 gaps, 1226 prime origins)
//   [1e4,1e5): g=88.463 R=76.990 h=82.994 h/R=1.0780  [census R=76.99 h=82.994 h/R=1.078]  (1019 gaps, 8363 prime origins)
//   [1e5,1e6): g=129.573 R=118.438 h=123.368 h/R=1.0416  [census R=118.438 h=123.368 h/R=1.0416]  (6945 gaps, 68906 prime origins)
//   [1e6,1e7): g=177.129 R=164.022 h=169.718 h/R=1.0347  [census R=164.022 h=169.718 h/R=1.0347]  (50811 gaps, 586081 prime origins)
//   [1e7,1e8): g=236.014 R=223.520 h=229.199 h/R=1.0254  [census R=223.52 h=229.199 h/R=1.0254]  (381331 gaps, 5096856 prime origins)
//   440309 completed gaps, 5761452 primes >= 7 walked, 20 censored at the range end
//
// SEC 1 — THE EXACT IDENTITY  h - R = A + B  (no model; A, B as defined in the header)
//   window | h-R | A within-gap placement | B length/count coupling | E[g] | E[n]
//   [11,1e4): h-R=4.001 | A=7.120 | B=-3.119 | E[g]=49.24 E[n]=6.034
//   [1e4,1e5): h-R=6.007 | A=10.311 | B=-4.303 | E[g]=88.46 E[n]=8.216
//   [1e5,1e6): h-R=4.932 | A=12.017 | B=-7.085 | E[g]=129.57 E[n]=9.921
//   [1e6,1e7): h-R=5.696 | A=14.291 | B=-8.594 | E[g]=177.13 E[n]=11.535
//   [1e7,1e8): h-R=5.679 | A=16.562 | B=-10.883 | E[g]=236.01 E[n]=13.366
//   (gaps binned by left opener here, so h-R differs slightly from SEC 0 at window edges)
//
// SEC 2 — A SPLIT: the two forced left-end primes, derived, vs everything else
//   A_forced = (E[g]-2)/E[n], closed form; D = A - A_forced measured; 1/lambda = mean prime gap
//   [11,1e4): A=7.120 = A_forced 7.829 + D -0.709 | (E[g]-2)/E[n]=7.829 | 1/lambda=8.154 | mean ln p=8.069
//   [1e4,1e5): A=10.311 = A_forced 10.524 + D -0.213 | (E[g]-2)/E[n]=10.524 | 1/lambda=10.750 | mean ln p=10.737
//   [1e5,1e6): A=12.017 = A_forced 12.859 + D -0.843 | (E[g]-2)/E[n]=12.859 | 1/lambda=13.063 | mean ln p=13.044
//   [1e6,1e7): A=14.291 = A_forced 15.183 + D -0.892 | (E[g]-2)/E[n]=15.183 | 1/lambda=15.356 | mean ln p=15.351
//   [1e7,1e8): A=16.562 = A_forced 17.508 + D -0.946 | (E[g]-2)/E[n]=17.508 | 1/lambda=17.658 | mean ln p=17.656
//
// SEC 2b — B IS AN EXACT IDENTITY IN THE REGRESSION OF PRIME COUNT ON GAP LENGTH
//   B = Var(g)(alpha - lambda)/(2 E[n]) = - beta Var(g)/(2 E[g] E[n]), beta = OLS intercept of n_i on g_i
//   null with an independent-Poisson interior: beta = 2 - 2 lambda (the two forced left-end primes)
//   [11,1e4): beta=1.028 (null 1.755) | CV^2(g)=0.7436 | B=-3.119 identity -3.119 | -beta CV^2 lnp/2 = -3.084
//   [1e4,1e5): beta=1.079 (null 1.814) | CV^2(g)=0.7406 | B=-4.303 identity -4.303 | -beta CV^2 lnp/2 = -4.291
//   [1e5,1e6): beta=1.310 (null 1.847) | CV^2(g)=0.8281 | B=-7.085 identity -7.085 | -beta CV^2 lnp/2 = -7.075
//   [1e6,1e7): beta=1.314 (null 1.870) | CV^2(g)=0.8520 | B=-8.594 identity -8.594 | -beta CV^2 lnp/2 = -8.591
//   [1e7,1e8): beta=1.379 (null 1.887) | CV^2(g)=0.8941 | B=-10.883 identity -10.883 | -beta CV^2 lnp/2 = -10.882
//   so h - R = [ln p - 4C2/ln p] + D - (beta CV^2 / 2) ln p: the two ln p terms cancel iff beta CV^2 -> 2
//   [1e4,1e5): beta*CV^2 = 0.7993 (needs 2) | implied ln p coefficient of h-R = 0.6004
//   [1e5,1e6): beta*CV^2 = 1.0849 (needs 2) | implied ln p coefficient of h-R = 0.4576
//   [1e6,1e7): beta*CV^2 = 1.1193 (needs 2) | implied ln p coefficient of h-R = 0.4403
//   [1e7,1e8): beta*CV^2 = 1.2326 (needs 2) | implied ln p coefficient of h-R = 0.3837
//
// SEC 3 — SCALING of h - R, six half-decade windows, bootstrap over gaps (B=200)
//   window | lnp | h-R +- sd | A_forced | D | B | B/E[g] +- sd | h/R-1 +- sd
//   [1e5.0,1e5.5): lnp=12.188 | h-R=5.545+-0.476 | Af=11.998 | D=-0.661 | B=-5.792 | B/E[g]=-0.0512+-0.0033 | A/R=0.1109 B/R=-0.0567 | h/R-1=0.0542+-0.0054
//   [1e5.5,1e6.0): lnp=13.340 | h-R=5.198+-0.387 | Af=13.157 | D=-0.906 | B=-7.054 | B/E[g]=-0.0519+-0.0021 | A/R=0.0992 B/R=-0.0571 | h/R-1=0.0421+-0.0035
//   [1e6.0,1e6.5): lnp=14.492 | h-R=5.844+-0.291 | Af=14.313 | D=-0.987 | B=-7.483 | B/E[g]=-0.0475+-0.0015 | A/R=0.0922 B/R=-0.0517 | h/R-1=0.0404+-0.0022
//   [1e6.5,1e7.0): lnp=15.644 | h-R=6.134+-0.180 | Af=15.480 | D=-0.860 | B=-8.486 | B/E[g]=-0.0460+-0.0008 | A/R=0.0859 B/R=-0.0499 | h/R-1=0.0360+-0.0011
//   [1e7.0,1e7.5): lnp=16.796 | h-R=5.995+-0.129 | Af=16.639 | D=-0.919 | B=-9.724 | B/E[g]=-0.0455+-0.0004 | A/R=0.0782 B/R=-0.0484 | h/R-1=0.0298+-0.0007
//   [1e7.5,1e8.0): lnp=17.947 | h-R=6.061+-0.092 | Af=17.802 | D=-0.955 | B=-10.786 | B/E[g]=-0.0442+-0.0003 | A/R=0.0730 B/R=-0.0468 | h/R-1=0.0263+-0.0004
//   A_forced closed form check: A_forced = 1/lambda - 2/E[n] = ln p - 4 C2 / ln p exactly to PNT+HL;
//       lnp=12.188: ln p - 4C2/ln p = 11.971
//       lnp=13.340: ln p - 4C2/ln p = 13.142
//       lnp=14.492: ln p - 4C2/ln p = 14.310
//       lnp=15.644: ln p - 4C2/ln p = 15.475
//       lnp=16.796: ln p - 4C2/ln p = 16.638
//       lnp=17.947: ln p - 4C2/ln p = 17.800
//   fit  h-R = c        : c = 6.008, chi2/df = 1.297 (6.48/5)
//   fit  h-R = a + b lnp: a = 4.616, b = 0.0823 +- 0.0483 (1.70 sigma from 0), chi2/df = 0.895 (3.58/4)
//   fit  h/R - 1 = c0 + c1/lnp: c0 = -0.0315 +- 0.0051, c1 = 1.036 +- 0.088, chi2/df = 0.762
//        residuals (meas - fit): 0.0007  -0.0041  0.0004  0.0013  -0.0004  0.0000
//        the fitted law crosses h = R at ln p = 32.92, i.e. p ~ 1e14.29
//   N1  k/ln^2 p          (limit 1): coeffs 8.4661 | chi2 = 4.41 / 5 df = 0.883
//   N2  k/ln p            (limit 1): coeffs 0.4960 | chi2 = 40.63 / 5 df = 8.127
//   N3  k1/lnp + k2/ln^2p (limit 1): coeffs 0.0353, 7.8662 | chi2 = 4.20 / 4 df = 1.050
//   N4  c0 + c1/lnp       (limit 1+c0): coeffs -0.0315, 1.0363 | chi2 = 3.05 / 4 df = 0.762
//
// SEC 4 — THE MOD-30 QUESTION: how much of h - R can the class correlation carry?
//   6 most deviant residues (residue: meas/null): 12: 1.074  0: 0.927  6: 1.053  28: 0.950  4: 1.044  10: 1.036
//   residue-marginal mean shift  Delta30 = sum_c c (P_meas - P_null) = -0.0854  (total variation 0.0188, over 5761432 heads)
//   worst-case bound if ALL of that TV mass moved a full 30 positions: 0.563
//   small-h mass (F <= 60): all p: 0.2297 of origins carrying 7.323 of h; [1e7,1e8): 0.2208 carrying 7.055 of h=229.199
//   so a 7.4% distortion confined to the small-h mass can move h by at most 0.522, against h - R = 5.679
//
// SEC 5 — CLOSING THE COEFFICIENT: c_h = c_g x (1+CV^2)/2 x (h/R), all three factors measured
//   c_g is the window's own twin-gap coefficient (HL predicts 1/(2 C2) = 0.7574); the second factor is
//   the renewal correction R/E[g], which is 1 exactly when twin gaps are Poisson (CV^2 = 1).
//   [11,1e4): c_g=0.7723 | (1+CV^2)/2=0.8718 | h/R=1.0924 | predicted c_h=0.7355 | measured c_h=0.7064 | ratio 0.9603
//   [1e4,1e5): c_g=0.7687 | (1+CV^2)/2=0.8703 | h/R=1.0780 | predicted c_h=0.7211 | measured c_h=0.7177 | ratio 0.9953
//   [1e5,1e6): c_g=0.7633 | (1+CV^2)/2=0.9141 | h/R=1.0416 | predicted c_h=0.7267 | measured c_h=0.7236 | ratio 0.9956
//   [1e6,1e7): c_g=0.7531 | (1+CV^2)/2=0.9260 | h/R=1.0347 | predicted c_h=0.7216 | measured c_h=0.7192 | ratio 0.9967
//   [1e7,1e8): c_g=0.7579 | (1+CV^2)/2=0.9471 | h/R=1.0254 | predicted c_h=0.7360 | measured c_h=0.7344 | ratio 0.9977
//   the two open factors are exactly these: CV^2 -> 1 (twin gaps Poisson, a Hardy-Littlewood consequence)
//   and h/R -> 1 (the prime-origin factor, SEC 3). Granted both, c_h -> c_g -> 1/(2 C2) = 0.7574.
//
// elapsed 1.5 s
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
//
// 1. WHAT DID NOT DERIVE. The residual is still measured, not derived. Two of
//    its three parts have closed forms; the third, B, is an exact identity in a
//    regression intercept beta whose value (1.028 rising to 1.379, against a
//    null of 2 - 2/ln p) has no derivation here. Whether h/R tends to 1 is
//    therefore open: it holds iff beta CV^2(g) -> 2, and beta CV^2 is measured
//    at 0.7993, 1.0849, 1.1193, 1.2326 across the four decades above 1e4.
//    Rising, and still well short at the top window.
//
// 2. THE MOD-30 ANSWER IS NO. TODO Z4 asks whether the 1.09 -> 1.03 residual is
//    the small-h class correlation of destroyer-census-01 SEC 6(c). The residue
//    marginal's own mean shift is Delta30 = -0.0854, the wrong sign and 1.5% of
//    the effect; the worst case in which the entire measured total variation
//    (0.0188) moved a full 30 positions is 0.563; a 7.4% distortion confined to
//    the F <= 60 mass can move h by at most 0.522. Against h - R = 5.679 at
//    [1e7,1e8), each is an order of magnitude short. The class correlation is a
//    real but separate O(0.1) effect.
//
// 3. THE IDENTITY. h - R = A + B exactly, A the within-gap placement of the
//    primes and B the coupling between a gap's length and its prime count,
//    asserted to 1e-9 at every window. B is itself exactly
//    Var(g)(alpha - lambda)/(2 E[n]) = -beta Var(g)/(2 E[g] E[n]), alpha and
//    beta the OLS slope and intercept of prime count on gap length. So the sign
//    of the prime-origin excess is decided by whether a twin gap holds more or
//    fewer primes than its length alone predicts.
//
// 4. THE ONE DERIVED PIECE. A_forced = (E[g] - 2)/E[n] = 1/lambda - 2/E[n],
//    which is ln p - 4 C2 / ln p to PNT + Hardy-Littlewood, matching at all six
//    half-decades (11.998 against 11.971, rising to 17.802 against 17.800). The
//    mechanism is elementary: every twin gap contains its own left opener a and
//    a + 2, both primes, both at the extreme left, so both carry near-maximal
//    forward distance, while the right opener's pair belongs to the NEXT gap.
//    The asymmetry is worth one mean prime gap.
//
// 5. THE REST OF A IS SMALL AND FLAT. D = A - A_forced runs -0.661, -0.906,
//    -0.987, -0.860, -0.919, -0.955 across the six half-decades: the non-forced
//    primes sit very slightly late in their gap, worth about one unit, with no
//    visible growth. Not derived.
//
// 6. THE SCALING TEST DISCRIMINATES THE RATE, NOT THE LIMIT. Over six
//    half-decade windows with a bootstrap over gaps (B = 200, deterministic
//    seed), h - R = 6.008 constant fits at chi2/df = 1.297 on 5 df, and the
//    equivalent one-parameter ratio law h/R - 1 = 8.4661/ln^2 p fits at 0.883.
//    The competing one-parameter law h/R - 1 = 0.4960/ln p is REJECTED at 8.127.
//    A two-parameter law with a negative plateau, h/R - 1 = -0.0315 + 1.036/lnp,
//    fits best at 0.762 and would put h/R below 1 past p ~ 1e14, but it is not
//    required by the data and its plateau is an extrapolation off a lever arm
//    of ln p in [12.188, 17.947], where 1/ln p is close to linear.
//
// 7. THE COEFFICIENT CLOSES AS A PRODUCT OF THREE MEASURED FACTORS. c_h =
//    c_g x (1+CV^2)/2 x (h/R) reproduces the measured head coefficient to
//    ratio 0.9953, 0.9956, 0.9967, 0.9977 on the four decades above 1e4 (the
//    [11,1e4) window is 0.9603, its ln^2 p average spanning three decades). The
//    predicted 0.7360 against the measured 0.7344 at [1e7,1e8) is the closest.
//    So the head coefficient's derivation reduces to exactly two open limits,
//    CV^2 -> 1 and h/R -> 1, and neither is settled here.
