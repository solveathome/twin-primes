'use strict';
// ============================================================================
// HEAD RESIDUAL NULL — what beta and CV^2(g) are under the programme's own
// null, and what that null predicts for h/R - 1
// ============================================================================
// SCRATCHPAD GRADE. Staging companion to research/history/staging/
// head-residual-null.md. Not a certified artefact: no QC ledger entry, no
// cross-script reuse intended. Sibling: head-residual-factor.md/.js, whose
// EMBEDDED per-window numbers are quoted here as inputs and never recomputed.
//
// QUESTION. head-residual-factor.md §3 leaves h/R -> 1 turning on whether
// beta * CV^2(g) -> 2, with beta the OLS intercept of a twin gap's prime count
// on its length and CV^2(g) the squared coefficient of variation of twin-gap
// length. It quotes a null beta = 2 - 2/ln p and measures 1.028 -> 1.379.
// This file asks what the null actually says, and what it then predicts.
//
// THE NULL, stated (Poisson-HL renewal null; the same object as the matched
// pure-Exp / Kourbatov-Wolf null of zonegap-03-model.md §3):
//   primes near p are a Poisson process of rate lambda = 1/ln p;
//   a fraction theta = lambda_2/lambda = 2 C2 / ln p of them are twin openers,
//   the marking independent of everything else.
// Equivalently, in the form that keeps the prime density HONEST: the prime
// process is a Poisson CLUSTER process, a cluster being either a twin pair
// (two primes 2 apart, an opener) or a solitary prime. Cluster rate
// lambda_c = lambda(1-theta); a cluster is an opener with probability
// q = theta/(1-theta). Solitary-prime rate lambda_s = lambda_c(1-q)
// = lambda(1 - 2 theta) = lambda - 2 lambda_2.
//
// WHAT THIS FILE DOES.
//  SEC 0  the null, derived on paper and then SIMULATED, four predictions:
//           CV^2(g) = 1 exactly        (openers thin a Poisson process)
//           beta    = 2 exactly        (NOT 2 - 2/ln p)
//           D       = 0 exactly        (non-forced primes are uniform in gap)
//           h - R   = -2/E[n] = -4 C2 / ln p, hence h/R - 1 = -8 C2^2/ln^3 p
//  SEC 1  the null against the sibling's measurements: the rate, the sign, and
//         which of beta / CV^2 carries the shortfall.
//  SEC 2  REAL DATA, [1e7,1e8): where the beta deficit lives. E[n] = 1/theta is
//         an identity, so beta = 2 - (alpha - lambda_s)/lambda_2 exactly: a
//         beta below 2 IS a prime deficit near the two openers bounding a gap.
//         Measure the density profile of interior primes against distance from
//         each opener and report the cumulative deficit, against the
//         Montgomery-Soundararajan singular-series-average shape lambda/2 per
//         nat of distance.
//  SEC 3  fits of the sibling's six half-decade h/R - 1 against the null, the
//         constant-(h-R) law, and the ln ln p law the SEC 2 shape implies.
//
// CONVENTIONS: research/GLOSSARY.md; opener / gap / head as in
// head-residual-factor.js. C2 is the twin-prime constant.
// ============================================================================

const T0 = Date.now();
let failures = 0;
function assertNear(name, got, want, tol) {
  if (!(Math.abs(got - want) <= tol)) { failures++; console.log(`  ASSERT FAIL ${name}: got ${got} want ${want} +-${tol}`); }
}
const f2 = x => x.toFixed(2), f3 = x => x.toFixed(3), f4 = x => x.toFixed(4), f5 = x => x.toFixed(5);
const C2 = 0.66016181584686957392;
const GAMMA = 0.5772156649015328606;

// deterministic PRNG (mulberry32, fixed seed) so the embed binds to the code
let RNGSTATE = 0x1a2b3c4d;
function rnd() {
  RNGSTATE = (RNGSTATE + 0x6d2b79f5) | 0;
  let t = RNGSTATE;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return (((t ^ (t >>> 14)) >>> 0) + 0.5) / 4294967296;
}

// --------------------------------------------------------------------------
// SEC 0 — THE NULL, DERIVED THEN SIMULATED
// --------------------------------------------------------------------------
// DERIVATION (the four lines the simulation below checks).
//  (a) openers are an independent q-thinning of a Poisson cluster process,
//      hence themselves Poisson(lambda_2); so g ~ Exp(lambda_2) and
//      CV^2(g) = 1 EXACTLY, E[g] = 1/lambda_2, E[g^2] = 2 E[g]^2.
//  (b) splitting a marked Poisson process gives INDEPENDENT opener and
//      solitary processes, so given the gap [a, a+g) the interior solitary
//      primes are Poisson(lambda_s) on it, uniform given their count K.
//      n = 2 + K (the opener a and its partner a+2), so
//         E[n | g] = 2 + lambda_s g   =>  alpha_null = lambda_s, beta_null = 2.
//      beta = 2 EXACTLY, with no 1/ln p correction: the sibling's 2 - 2/ln p
//      comes from putting the two forced primes ON TOP of a full-density
//      lambda interior, which over-counts primes by 2 - 2/ln p per gap.
//      The density-consistent interior is lambda_s = lambda - 2 lambda_2.
//  (c) placement: S = g + (g-2) + sum_j (g - x_j), x_j uniform, so
//      E[S | g,K] = 2g - 2 + K g/2 and S - n g/2 = g - 2 identically.
//      Hence A = (E[g]-2)/E[n] = A_forced and D = 0 EXACTLY.
//  (d) h - R = [2E[g] - 2 + lambda_s E[g^2]/2 ... ] worked through:
//         h = (2E[g] - 2 + lambda_s E[g]^2) / (2 + lambda_s E[g]),  R = E[g],
//      so h - R = -2 / E[n] with E[n] = 1/theta, i.e.
//         h - R = -2 theta = -4 C2 / ln p          (negative, -> 0)
//         h/R - 1 = -2/(E[n] E[g]) = -8 C2^2 / ln^3 p.
//      Equivalently beta_null * CV^2_null = 2 exactly, so the two ln p terms
//      of h - R = [ln p - 4C2/ln p] + D - (beta CV^2/2) ln p CANCEL under the
//      null and h/R -> 1 follows. The null settles the DIRECTION of the
//      sibling's open question and gets the RATE and the SIGN wrong.
console.log('SEC 0 — THE NULL: derived (see header comment) and simulated');
const LNP = 17.656;                    // prime-weighted mean ln p of [1e7,1e8)
const lambda = 1 / LNP;
const theta = 2 * C2 / LNP;
const lambda2 = lambda * theta;
const lambdaS = lambda * (1 - 2 * theta);
const lambdaC = lambda * (1 - theta);
const qMark = theta / (1 - theta);
console.log(`  matched to [1e7,1e8): ln p = ${f3(LNP)} | lambda = ${f5(lambda)} | theta = ${f5(theta)} | lambda_2 = ${f2(1 / lambda2)}^-1 | lambda_s = ${f5(lambdaS)}`);
console.log(`  predictions: CV^2 = 1, beta = 2, D = 0, E[g] = ${f3(1 / lambda2)}, E[n] = ${f3(1 / theta)}, h-R = ${f4(-2 * theta)}, h/R-1 = ${(-8 * C2 * C2 / (LNP ** 3)).toExponential(3)}`);
{
  const NG = 4000000;
  let Sn = 0, SS = 0, Sg = 0, Sg2 = 0, Sng = 0, Sf = 0, SA = 0;
  for (let i = 0; i < NG; i++) {
    // K ~ Geom(qMark) on {0,1,2,...}: number of solitary clusters before the
    // next opener; g = sum of K+1 Exp(lambda_c) cluster spacings.
    let K = 0, g = -Math.log(rnd()) / lambdaC;
    let S = 0;
    while (rnd() >= qMark) {          // this cluster is solitary, not an opener
      const step = -Math.log(rnd()) / lambdaC;
      S += g;                          // record the solitary prime's position
      g += step; K++;
      if (K > 400) break;              // guard; P ~ 0 at these rates
    }
    // forward distances: opener g, partner g-2, solitary j at position S_j
    let sumFwd = g + (g - 2);
    // S above accumulated the positions of the solitary primes measured from a
    // (they were the running g at the moment each was placed)
    // recompute: need each position, so redo cheaply via stored partial sums
    // (kept as a single accumulator: sum of (g - x_j) = K*g - sum x_j)
    sumFwd += K * g - S;
    const n = 2 + K;
    Sn += n; SS += sumFwd; Sg += g; Sg2 += g * g; Sng += n * g; Sf += g - 2;
    SA += sumFwd - n * g / 2;
  }
  const Eg = Sg / NG, En = Sn / NG, varg = Sg2 / NG - Eg * Eg;
  const alpha = (Sng / NG - En * Eg) / varg, beta = En - alpha * Eg;
  const cv2 = varg / (Eg * Eg);
  const R = Sg2 / (2 * Sg), h = SS / Sn;
  const A = SA / Sn, Aforced = Sf / Sn, D = A - Aforced;
  console.log(`  simulated (${NG} gaps, seeded): E[g]=${f3(Eg)} E[n]=${f3(En)} CV^2=${f4(cv2)} beta=${f4(beta)} alpha=${f5(alpha)} (lambda_s ${f5(lambdaS)})`);
  console.log(`             A=${f4(A)} A_forced=${f4(Aforced)} D=${f4(D)} | h-R=${f4(h - R)} against -2/E[n]=${f4(-2 / En)} | beta*CV^2=${f4(beta * cv2)}`);
  assertNear('null CV^2 = 1', cv2, 1, 0.003);
  assertNear('null beta = 2', beta, 2, 0.02);
  assertNear('null alpha = lambda_s', alpha, lambdaS, 2e-4);
  assertNear('null D = 0', D, 0, 0.02);
  assertNear('null h-R = -2/E[n]', h - R, -2 / En, 0.03);
  assertNear('null beta*CV^2 = 2', beta * cv2, 2, 0.02);
  assertNear('E[n] = 1/theta', En, 1 / theta, 0.02);
}
console.log('');

// --------------------------------------------------------------------------
// SEC 1 — THE NULL AGAINST THE SIBLING'S MEASUREMENTS
// --------------------------------------------------------------------------
// INPUTS quoted verbatim from the EMBEDDED output block of
// research/history/staging/head-residual-factor.js (SEC 0/1/2b), not recomputed.
const decLnp = [8.069, 10.737, 13.044, 15.351, 17.656];
const decName = ['[11,1e4)', '[1e4,1e5)', '[1e5,1e6)', '[1e6,1e7)', '[1e7,1e8)'];
const decBeta = [1.028, 1.079, 1.310, 1.314, 1.379];
const decCV2 = [0.7436, 0.7406, 0.8281, 0.8520, 0.8941];
const decEg = [49.24, 88.46, 129.57, 177.13, 236.01];
const decEn = [6.034, 8.216, 9.921, 11.535, 13.366];
const decHmR = [4.001, 6.007, 4.932, 5.696, 5.679];
const decD = [-0.709, -0.213, -0.843, -0.892, -0.946];
console.log('SEC 1 — NULL vs MEASURED (sibling inputs quoted from its embedded block)');
console.log('  window | beta (null 2) | CV^2 (null 1) | beta*CV^2 (null 2) | share of the 2 - beta*CV^2 shortfall carried by beta / by CV^2');
for (let w = 0; w < 5; w++) {
  const prod = decBeta[w] * decCV2[w], short = 2 - prod;
  const byBeta = (2 - decBeta[w]) * decCV2[w], byCV = 2 * (1 - decCV2[w]);
  assertNear(`shortfall split@${decName[w]}`, byBeta + byCV, short, 1e-9);
  console.log(`  ${decName[w]}: beta=${f3(decBeta[w])} | CV^2=${f4(decCV2[w])} | product=${f4(prod)} | shortfall=${f4(short)} = beta ${f4(byBeta)} (${f1pct(byBeta / short)}) + CV^2 ${f4(byCV)} (${f1pct(byCV / short)})`);
}
function f1pct(x) { return (100 * x).toFixed(0) + '%'; }
console.log('  window | measured h-R | null h-R = -4C2/lnp | measured h/R-1 | null h/R-1 = -8C2^2/ln^3p | ratio');
for (let w = 0; w < 5; w++) {
  const nullHmR = -4 * C2 / decLnp[w];
  const R = decEg[w] * (1 + decCV2[w]) / 2;
  const meas = decHmR[w] / R, nul = -8 * C2 * C2 / (decLnp[w] ** 3);
  console.log(`  ${decName[w]}: h-R=${f3(decHmR[w])} vs null ${f4(nullHmR)} | h/R-1=${f4(meas)} vs null ${nul.toExponential(3)} | ratio ${f1(meas / nul)}`);
}
function f1(x) { return x.toFixed(1); }
// the null's own deficit object: E[n] = 1/theta is an identity, so
// beta = 2 - (alpha - lambda_s)/lambda_2 exactly, i.e. 2 - beta is a PRIME
// COUNT DEFICIT near the two openers, compensated by a bulk excess.
console.log('  2 - beta as an endpoint prime deficit, and the bulk excess that pays for it:');
for (let w = 0; w < 5; w++) {
  const lam = decEn[w] / decEg[w], th = 1 / decEn[w], lam2 = lam * th, lamS = lam * (1 - 2 * th);
  const alphaMeas = (decEn[w] - decBeta[w]) / decEg[w];
  console.log(`  ${decName[w]}: Delta = 2 - beta = ${f3(2 - decBeta[w])} primes | alpha_meas=${f5(alphaMeas)} vs lambda_s=${f5(lamS)} (+${f1pct(alphaMeas / lamS - 1)}) | check 2-(alpha-lambda_s)/lambda_2 = ${f3(2 - (alphaMeas - lamS) / lam2)}`);
}
// Montgomery-Soundararajan bracket: sum_{h<=H} S(h) = H - (1/2)ln H - (1/2)(gamma+ln 2pi)
console.log('  MS singular-series-average bracket for Delta (HEURISTIC, order only):');
for (let w = 0; w < 5; w++) {
  const lam = decEn[w] / decEg[w];
  const per = lam * (0.5 * Math.log(decEg[w]) + 0.5 * (GAMMA + Math.log(2 * Math.PI)));
  console.log(`  ${decName[w]}: one-prime conditioning 2x${f3(per)} = ${f3(2 * per)} | pair conditioning 4x = ${f3(4 * per)} | measured Delta = ${f3(2 - decBeta[w])}`);
}
// The other half of the product: does paper/variance-note.md's sub-Poisson
// window variance say anything about CV^2(g)? The renewal identity
// Var N(L)/E N(L) -> CV^2(g) needs an L -> infinity plateau. The twin-candidate
// process on the wheel has NO plateau: Var/E is a decreasing function of the
// window exponent u = ln L / ln y (0.845 at u=0.6 down to 0.076 at u=3, note
// §6, y=401) and hits 0 at L = P. So the identity does not transport, and the
// u = 2 diagonal number (0.3958 at x=37, note §7) is not a prediction for
// CV^2(g). What the note's empirical shape gives, evaluated at the exponent
// GAP scale actually corresponds to, is below — HEURISTIC, extrapolated in y.
console.log('  CV^2 against paper/variance-note.md §6 (HEURISTIC; the renewal identity does NOT transport, see header):');
console.log('  gap scale is L = E[g] with sieve level y = sqrt(x), so u = 2 ln E[g] / ln x, NOT u = 2');
for (let w = 0; w < 5; w++) {
  const lnx = Math.log(Math.pow(10, w === 0 ? 4 : w + 4));
  const u = 2 * Math.log(decEg[w]) / lnx;
  const r = Math.exp(-(0.24 * u * u + 0.13 * u));          // note §6 regularity 1, y = 401
  console.log(`  ${decName[w]}: u_gap = ${f3(u)} | note §6 law gives Var/E = ${f4(r)} | measured CV^2(g) = ${f4(decCV2[w])} | note §7 at u=2 = 0.3958, irrelevant here`);
}
console.log('');

// --------------------------------------------------------------------------
// SEC 2 — REAL DATA: where the beta deficit sits, [1e7,1e8)
// --------------------------------------------------------------------------
console.log('SEC 2 — REAL DATA [1e7,1e8): the interior-prime density profile against distance from an opener');
{
  const LO = 1e7, HI = 1e8;
  const LIM = Math.floor(Math.sqrt(HI)) + 2;
  const comp = new Uint8Array(LIM + 1);
  const base = [];
  for (let i = 2; i <= LIM; i++) { if (!comp[i]) { base.push(i); for (let j = i * i; j <= LIM; j += i) comp[j] = 1; } }
  const EDGE = 120, BAND = 300;          // shells are multiples of 30, so the
  // mod-30 house structure of the live positions averages out inside every shell
  const cntL = new Float64Array(EDGE), cntR = new Float64Array(EDGE);
  let bandGaps = 0, bandCentralPrimes = 0, bandCentralLen = 0;
  let Sg = 0, Sg2 = 0, Sn = 0, Sng = 0, nGap = 0;
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
      if (seg[n + 2 - lo] === 0) {                 // n is an opener
        if (prevOpener > 0) {
          const g = n - prevOpener;
          const nprimes = pend.length;             // includes a_i and a_i+2
          Sg += g; Sg2 += g * g; Sn += nprimes; Sng += nprimes * g; nGap++;
          if (g >= BAND) {
            bandGaps++;
            bandCentralLen += g - 2 * EDGE;
            // pend[0] = a_i and pend[1] = a_i + 2 are the opener pair: they are
            // the "2" of n = 2 + K and are NOT interior primes. Skip them.
            for (let k = 2; k < pend.length; k++) {
              const d = pend[k] - prevOpener;
              if (d < EDGE) cntL[d]++;
              else if (g - d <= EDGE) cntR[g - d - 1]++;   // e in [0,EDGE)
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
  console.log(`  CONTROL (must match the sibling's embedded [1e7,1e8) row): E[g]=${f3(Eg)} E[n]=${f3(En)} beta=${f3(beta)} CV^2=${f4(cv2)} over ${nGap} gaps`);
  assertNear('control beta', beta, 1.379, 0.002);
  assertNear('control CV^2', cv2, 0.8941, 0.0002);
  assertNear('control E[n]', En, 13.366, 0.002);
  const lamBulk = bandCentralPrimes / bandCentralLen;
  console.log(`  band g >= ${BAND}: ${bandGaps} gaps | central density lambda_bulk = ${f5(lamBulk)} (global alpha ${f5(alpha)}, lambda_s ${f5((En / Eg) * (1 - 2 / En))})`);
  // cumulative deficit from each opener, and the MS shape lambda/2 per nat
  const cuts = [30, 60, 90, 120];
  let accL = 0, accR = 0, ci = 0;
  const rows = [];
  for (let d = 0; d < EDGE; d++) {
    accL += lamBulk - cntL[d] / bandGaps;
    accR += lamBulk - cntR[d] / bandGaps;
    if (ci < cuts.length && d + 1 === cuts[ci]) { rows.push([cuts[ci], accL, accR, accL + accR]); ci++; }
  }
  console.log('  cumulative interior-prime deficit within distance d of an opener (left / right / sum), against 2 - beta = ' + f3(2 - beta) + ':');
  console.log('  (d = 0 and d = 2 are the opener pair itself, structurally empty of INTERIOR primes: they contribute 2*lambda_bulk = ' + f4(2 * lamBulk) + ' of any deficit)');
  for (const [d, aL, aR, s] of rows) console.log(`    d < ${String(d).padStart(3)}: left ${f4(aL)}  right ${f4(aR)}  sum ${f4(s)}`);
  const lam = En / Eg, lamS = lam * (1 - 2 / En);
  // shell densities: does the profile flatten, or keep rising like a log?
  console.log('  shell mean interior density relative to lambda_bulk, and the shell\'s deficit (+- Poisson sd):');
  for (let i = 0; i < rows.length; i++) {
    const a = i === 0 ? 0 : rows[i - 1][0], b = rows[i][0], width = b - a;
    let cl = 0, cr = 0;
    for (let d = a; d < b; d++) { cl += cntL[d]; cr += cntR[d]; }
    const rl = (cl / bandGaps / width) / lamBulk, rr = (cr / bandGaps / width) / lamBulk;
    const shell = (i === 0 ? rows[0][3] : rows[i][3] - rows[i - 1][3]);
    const sd = Math.sqrt(2 * lamBulk * width / bandGaps);
    const nat = Math.log(b / Math.max(a, 1));
    console.log(`    d in [${String(a).padStart(3)},${String(b).padStart(3)}): left ${f3(rl)} x lambda_bulk, right ${f3(rr)} x | deficit ${f4(shell)} +-${f4(sd)}${i ? ` | per nat ${f4(shell / nat)} (MS one-prime ${f4(lam)}, pair ${f4(2 * lam)})` : ''}`);
  }
  console.log(`  the two live positions the opener pair occupies, priced discretely: primes near a_i sit only at d = 0,2 mod 6`);
  console.log(`  (8 of 30 residues mod 30), so the pair costs the interior 6*lambda_s = ${f3(6 * lamS)} to 7.5*lambda_s = ${f3(7.5 * lamS)}`);
  console.log(`  of the measured Delta = 2 - beta = ${f3(2 - beta)}; all of it is O(1/ln p) and vanishes, so beta -> 2 either way.`);
}
console.log('');

// --------------------------------------------------------------------------
// SEC 3 — MODEL FITS on the sibling's six half-decade h/R - 1
// --------------------------------------------------------------------------
console.log('SEC 3 — the rate, on the sibling\'s six half-decade points (its embedded SEC 3 block)');
{
  const x = [12.188, 13.340, 14.492, 15.644, 16.796, 17.947];
  const y = [0.0542, 0.0421, 0.0404, 0.0360, 0.0298, 0.0263];
  const e = [0.0054, 0.0035, 0.0022, 0.0011, 0.0007, 0.0004];
  function wls(basis) {
    const K = basis.length, M = x.length;
    const AtA = [], Atb = new Float64Array(K);
    for (let i = 0; i < K; i++) AtA.push(new Float64Array(K));
    for (let m = 0; m < M; m++) {
      const w = 1 / (e[m] * e[m]), v = basis.map(f => f(x[m]));
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
    for (let m = 0; m < M; m++) { let pr = 0; for (let i = 0; i < K; i++) pr += co[i] * basis[i](x[m]); c2 += ((y[m] - pr) / e[m]) ** 2; }
    return { co, c2, df: M - K };
  }
  // zero-parameter null
  let c2null = 0;
  for (let m = 0; m < x.length; m++) c2null += ((y[m] - (-8 * C2 * C2 / (x[m] ** 3))) / e[m]) ** 2;
  console.log(`  NULL (0 par)  h/R-1 = -8 C2^2/ln^3 p : chi2 = ${f2(c2null)} / 6 df = ${f2(c2null / 6)}   [predicted values ${x.map(v => (-8 * C2 * C2 / v ** 3).toExponential(2)).join(', ')}]`);
  const models = [
    ['M1  k/ln^2 p              (h-R constant)', [v => 1 / (v * v)]],
    ['M2  k lnln p/ln^2 p       (h-R ~ lnln p)', [v => Math.log(v) / (v * v)]],
    ['M3  k/ln p                (rejected by sibling)', [v => 1 / v]],
  ];
  for (const [nm, bs] of models) { const r = wls(bs); console.log(`  ${nm}: coeff ${r.co.map(f4).join(', ')} | chi2 = ${f2(r.c2)} / ${r.df} df = ${f3(r.c2 / r.df)}`); }
  console.log(`  lever arm: ln p in [${f3(x[0])}, ${f3(x[5])}], lnln p in [${f3(Math.log(x[0]))}, ${f3(Math.log(x[5]))}] — a 15.5% range, so M1 and M2 are not separable here.`);
  // the same question in absolute terms: is h-R constant or ~ lnln p?
  const hmr = [5.545, 5.198, 5.844, 6.134, 5.995, 6.061], se = [0.476, 0.387, 0.291, 0.180, 0.129, 0.092];
  let s1 = 0, s2 = 0, s3 = 0, s4 = 0;
  for (let m = 0; m < 6; m++) { const w = 1 / (se[m] ** 2); s1 += w; s2 += w * hmr[m]; s3 += w * Math.log(x[m]); s4 += w * Math.log(x[m]) ** 2; }
  const cbar = s2 / s1;
  let cc = 0; for (let m = 0; m < 6; m++) cc += ((hmr[m] - cbar) / se[m]) ** 2;
  let sxy = 0; for (let m = 0; m < 6; m++) sxy += (1 / se[m] ** 2) * Math.log(x[m]) * hmr[m];
  const k = sxy / s4;
  let ck = 0; for (let m = 0; m < 6; m++) ck += ((hmr[m] - k * Math.log(x[m])) / se[m]) ** 2;
  console.log(`  h-R = c        : c = ${f3(cbar)}, chi2/df = ${f3(cc / 5)}`);
  console.log(`  h-R = k lnln p : k = ${f3(k)}, chi2/df = ${f3(ck / 5)}   (the null's own prediction is h-R = -4C2/lnp ~ ${f3(-4 * C2 / 17.9)})`);
  // what (b + 2c) the measured shortfall implies, if 2 - beta CV^2 = (b+2c) lnln p/ln p
  console.log('  implied (b + 2c) if 2 - beta*CV^2 = (b+2c) lnln p / ln p, per decade:');
  for (let w = 1; w < 5; w++) {
    const sh = 2 - decBeta[w] * decCV2[w];
    console.log(`    ${decName[w]}: ${f3(sh * decLnp[w] / Math.log(decLnp[w]))}   [and if the form is k/ln p instead: k = ${f3(sh * decLnp[w])}]`);
  }
}
console.log('');
console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/head-residual-null.js
//   invocation:  node research/history/staging/head-residual-null.js
//   code-sha256: dd758bc6f9785c3ffe3d48df41f5d5833cf6218e6565e933b476e02c988f34e0
//   out-sha256:  32cf3f538c84758e699e42c566d3c2a31d6cd59b6f25039e299082906ecd8b50
//   body-lines:  73
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     1.6 s
// ============================================================================
// SEC 0 — THE NULL: derived (see header comment) and simulated
//   matched to [1e7,1e8): ln p = 17.656 | lambda = 0.05664 | theta = 0.07478 | lambda_2 = 236.10^-1 | lambda_s = 0.04817
//   predictions: CV^2 = 1, beta = 2, D = 0, E[g] = 236.104, E[n] = 13.372, h-R = -0.1496, h/R-1 = -6.335e-4
//   simulated (4000000 gaps, seeded): E[g]=235.941 E[n]=13.361 CV^2=0.9998 beta=1.9984 alpha=0.04816 (lambda_s 0.04817)
//              A=17.4984 A_forced=17.5087 D=-0.0103 | h-R=-0.1424 against -2/E[n]=-0.1497 | beta*CV^2=1.9980
//
// SEC 1 — NULL vs MEASURED (sibling inputs quoted from its embedded block)
//   window | beta (null 2) | CV^2 (null 1) | beta*CV^2 (null 2) | share of the 2 - beta*CV^2 shortfall carried by beta / by CV^2
//   [11,1e4): beta=1.028 | CV^2=0.7436 | product=0.7644 | shortfall=1.2356 = beta 0.7228 (58%) + CV^2 0.5128 (42%)
//   [1e4,1e5): beta=1.079 | CV^2=0.7406 | product=0.7991 | shortfall=1.2009 = beta 0.6821 (57%) + CV^2 0.5188 (43%)
//   [1e5,1e6): beta=1.310 | CV^2=0.8281 | product=1.0848 | shortfall=0.9152 = beta 0.5714 (62%) + CV^2 0.3438 (38%)
//   [1e6,1e7): beta=1.314 | CV^2=0.8520 | product=1.1195 | shortfall=0.8805 = beta 0.5845 (66%) + CV^2 0.2960 (34%)
//   [1e7,1e8): beta=1.379 | CV^2=0.8941 | product=1.2330 | shortfall=0.7670 = beta 0.5552 (72%) + CV^2 0.2118 (28%)
//   window | measured h-R | null h-R = -4C2/lnp | measured h/R-1 | null h/R-1 = -8C2^2/ln^3p | ratio
//   [11,1e4): h-R=4.001 vs null -0.3273 | h/R-1=0.0932 vs null -6.636e-3 | ratio -14.0
//   [1e4,1e5): h-R=6.007 vs null -0.2459 | h/R-1=0.0780 vs null -2.817e-3 | ratio -27.7
//   [1e5,1e6): h-R=4.932 vs null -0.2024 | h/R-1=0.0416 vs null -1.571e-3 | ratio -26.5
//   [1e6,1e7): h-R=5.696 vs null -0.1720 | h/R-1=0.0347 vs null -9.638e-4 | ratio -36.0
//   [1e7,1e8): h-R=5.679 vs null -0.1496 | h/R-1=0.0254 vs null -6.335e-4 | ratio -40.1
//   2 - beta as an endpoint prime deficit, and the bulk excess that pays for it:
//   [11,1e4): Delta = 2 - beta = 0.972 primes | alpha_meas=0.10167 vs lambda_s=0.08193 (+24%) | check 2-(alpha-lambda_s)/lambda_2 = 1.028
//   [1e4,1e5): Delta = 2 - beta = 0.921 primes | alpha_meas=0.08068 vs lambda_s=0.07027 (+15%) | check 2-(alpha-lambda_s)/lambda_2 = 1.079
//   [1e5,1e6): Delta = 2 - beta = 0.690 primes | alpha_meas=0.06646 vs lambda_s=0.06113 (+9%) | check 2-(alpha-lambda_s)/lambda_2 = 1.310
//   [1e6,1e7): Delta = 2 - beta = 0.686 primes | alpha_meas=0.05770 vs lambda_s=0.05383 (+7%) | check 2-(alpha-lambda_s)/lambda_2 = 1.314
//   [1e7,1e8): Delta = 2 - beta = 0.621 primes | alpha_meas=0.05079 vs lambda_s=0.04816 (+5%) | check 2-(alpha-lambda_s)/lambda_2 = 1.379
//   MS singular-series-average bracket for Delta (HEURISTIC, order only):
//   [11,1e4): one-prime conditioning 2x0.387 = 0.773 | pair conditioning 4x = 1.547 | measured Delta = 0.972
//   [1e4,1e5): one-prime conditioning 2x0.320 = 0.641 | pair conditioning 4x = 1.281 | measured Delta = 0.921
//   [1e5,1e6): one-prime conditioning 2x0.279 = 0.557 | pair conditioning 4x = 1.115 | measured Delta = 0.690
//   [1e6,1e7): one-prime conditioning 2x0.247 = 0.494 | pair conditioning 4x = 0.989 | measured Delta = 0.686
//   [1e7,1e8): one-prime conditioning 2x0.223 = 0.446 | pair conditioning 4x = 0.892 | measured Delta = 0.621
//   CV^2 against paper/variance-note.md §6 (HEURISTIC; the renewal identity does NOT transport, see header):
//   gap scale is L = E[g] with sieve level y = sqrt(x), so u = 2 ln E[g] / ln x, NOT u = 2
//   [11,1e4): u_gap = 0.846 | note §6 law gives Var/E = 0.7544 | measured CV^2(g) = 0.7436 | note §7 at u=2 = 0.3958, irrelevant here
//   [1e4,1e5): u_gap = 0.779 | note §6 law gives Var/E = 0.7813 | measured CV^2(g) = 0.7406 | note §7 at u=2 = 0.3958, irrelevant here
//   [1e5,1e6): u_gap = 0.704 | note §6 law gives Var/E = 0.8101 | measured CV^2(g) = 0.8281 | note §7 at u=2 = 0.3958, irrelevant here
//   [1e6,1e7): u_gap = 0.642 | note §6 law gives Var/E = 0.8332 | measured CV^2(g) = 0.8520 | note §7 at u=2 = 0.3958, irrelevant here
//   [1e7,1e8): u_gap = 0.593 | note §6 law gives Var/E = 0.8508 | measured CV^2(g) = 0.8941 | note §7 at u=2 = 0.3958, irrelevant here
//
// SEC 2 — REAL DATA [1e7,1e8): the interior-prime density profile against distance from an opener
//   CONTROL (must match the sibling's embedded [1e7,1e8) row): E[g]=236.014 E[n]=13.366 beta=1.379 CV^2=0.8941 over 381331 gaps
//   band g >= 300: 107722 gaps | central density lambda_bulk = 0.05101 (global alpha 0.05079, lambda_s 0.04816)
//   cumulative interior-prime deficit within distance d of an opener (left / right / sum), against 2 - beta = 0.621:
//   (d = 0 and d = 2 are the opener pair itself, structurally empty of INTERIOR primes: they contribute 2*lambda_bulk = 0.1020 of any deficit)
//     d <  30: left 0.4626  right 0.1134  sum 0.5761
//     d <  60: left 0.4929  right 0.1557  sum 0.6486
//     d <  90: left 0.4966  right 0.1421  sum 0.6388
//     d < 120: left 0.5295  right 0.1942  sum 0.7236
//   shell mean interior density relative to lambda_bulk, and the shell's deficit (+- Poisson sd):
//     d in [  0, 30): left 0.698 x lambda_bulk, right 0.926 x | deficit 0.5761 +-0.0053
//     d in [ 30, 60): left 0.980 x lambda_bulk, right 0.972 x | deficit 0.0725 +-0.0053 | per nat 0.1046 (MS one-prime 0.0566, pair 0.1133)
//     d in [ 60, 90): left 0.998 x lambda_bulk, right 1.009 x | deficit -0.0098 +-0.0053 | per nat -0.0243 (MS one-prime 0.0566, pair 0.1133)
//     d in [ 90,120): left 0.979 x lambda_bulk, right 0.966 x | deficit 0.0849 +-0.0053 | per nat 0.2950 (MS one-prime 0.0566, pair 0.1133)
//   the two live positions the opener pair occupies, priced discretely: primes near a_i sit only at d = 0,2 mod 6
//   (8 of 30 residues mod 30), so the pair costs the interior 6*lambda_s = 0.289 to 7.5*lambda_s = 0.361
//   of the measured Delta = 2 - beta = 0.621; all of it is O(1/ln p) and vanishes, so beta -> 2 either way.
//
// SEC 3 — the rate, on the sibling's six half-decade points (its embedded SEC 3 block)
//   NULL (0 par)  h/R-1 = -8 C2^2/ln^3 p : chi2 = 8172.10 / 6 df = 1362.02   [predicted values -1.93e-3, -1.47e-3, -1.15e-3, -9.11e-4, -7.36e-4, -6.03e-4]
//   M1  k/ln^2 p              (h-R constant): coeff 8.4704 | chi2 = 4.44 / 5 df = 0.888
//   M2  k lnln p/ln^2 p       (h-R ~ lnln p): coeff 2.9885 | chi2 = 8.18 / 5 df = 1.636
//   M3  k/ln p                (rejected by sibling): coeff 0.4944 | chi2 = 42.59 / 5 df = 8.518
//   lever arm: ln p in [12.188, 17.947], lnln p in [2.500, 2.887] — a 15.5% range, so M1 and M2 are not separable here.
//   h-R = c        : c = 6.008, chi2/df = 1.295
//   h-R = k lnln p : k = 2.126, chi2/df = 0.887   (the null's own prediction is h-R = -4C2/lnp ~ -0.148)
//   implied (b + 2c) if 2 - beta*CV^2 = (b+2c) lnln p / ln p, per decade:
//     [1e4,1e5): 5.432   [and if the form is k/ln p instead: k = 12.894]
//     [1e5,1e6): 4.648   [and if the form is k/ln p instead: k = 11.938]
//     [1e6,1e7): 4.949   [and if the form is k/ln p instead: k = 13.516]
//     [1e7,1e8): 4.717   [and if the form is k/ln p instead: k = 13.543]
//
// elapsed 1.5 s
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
//
// 1. WHAT THE NULL DOES NOT DO. It does not reproduce the measured residual.
//    Under the Poisson-HL null h - R = -4 C2/ln p, so h/R - 1 = -8 C2^2/ln^3 p:
//    NEGATIVE, and one power of ln p faster than the measured +8.4704/ln^2 p (the sibling's own
//    refit of the same six points reads 8.4661).
//    Against the sibling's six half-decade points the zero-parameter null sits
//    at chi2/df = 1362. The head's residual is not a renewal artefact.
//
// 2. WHAT THE NULL DOES DO. beta_null = 2 and CV^2_null = 1, both EXACTLY, so
//    beta CV^2 = 2 exactly and the two ln p terms of h - R cancel identically.
//    The null therefore SETTLES THE DIRECTION of head-residual-factor.md §3's
//    open question -- under the null, h/R -> 1 -- while getting its rate and
//    its sign wrong. beta_null = 2 exactly, not 2 - 2/ln p: that quoted null
//    puts the two forced primes on top of a full-density lambda interior and
//    over-counts primes by 2 - 2/ln p per gap; the density-consistent interior
//    is the SOLITARY rate lambda_s = lambda - 2 lambda_2, and it gives 2.
//
// 3. WHICH FACTOR CARRIES THE DISCREPANCY: beta, by about 5:2 and widening.
//    Of the 2 - beta CV^2 = 0.7670 shortfall at [1e7,1e8), (2-beta)CV^2 =
//    0.5552 (72%) is beta's and 2(1-CV^2) = 0.2118 (28%) is CV^2's; the split
//    runs 58/42, 57/43, 62/38, 66/34, 72/28 up the five decades.
//
// 4. THE OBJECT CARRYING IT. E[n] = 1/theta is an identity, so
//    beta = 2 - (alpha - lambda_s)/lambda_2 exactly: beta < 2 IS a deficit of
//    Delta = 2 - beta primes near the two openers bounding a gap, paid for by a
//    bulk density 5% above lambda_s. Delta runs 0.972, 0.921, 0.690, 0.686,
//    0.621 up the decades. The measured profile localizes it: 0.5761 of 0.7236
//    (80%) sits within d < 30 of an opener, and it is LEFT-heavy (0.5295 against
//    0.1942), which is where the opener's own partner a+2 sits. Two live
//    positions priced discretely (primes near a_i only at d = 0,2 mod 6, 8 of
//    30 mod 30) is worth 6 lambda_s = 0.289 to 7.5 lambda_s = 0.361 of it.
//    All of Delta is O(1/ln p), so beta -> 2 -- slowly.
//
// 5. THE MS LOG-ACCRUAL PICTURE IS NOT WHAT THE PROFILE SHOWS. A
//    Montgomery-Soundararajan singular-series-average deficit would accrue like
//    lambda/2 per nat of distance without converging. The shells beyond d = 30
//    contribute 0.0725, -0.0098, 0.0849 (+-0.0053) rather than a steady 0.11 per
//    nat, i.e. 20% of the total and non-monotone. The deficit is mostly local.
//
// 6. THE VARIANCE NOTE'S SUB-POISSON NUMBER DOES NOT TRANSPORT. The renewal
//    identity Var N(L)/E N(L) -> CV^2(g) needs an L-plateau; the twin-candidate
//    process on the wheel has none (Var/E falls monotonically in the window
//    exponent u and reaches 0 at L = P), so the u = 2 diagonal value 0.3958 is
//    not a prediction for CV^2(g), and neither is TODO item 9's unpinned
//    [0.46, 0.72] intercept. Evaluated instead at the exponent GAP scale
//    corresponds to (u = 2 ln E[g]/ln x = 0.593 at 1e8, not 2), note §6's
//    empirical shape gives 0.7544, 0.7813, 0.8101, 0.8332, 0.8508 against
//    measured CV^2 0.7436, 0.7406, 0.8281, 0.8520, 0.8941. Right size, right
//    drift, no identity licensing it.
//
// 7. THE RATE IS NOT SEPARABLE HERE. Both corrections are O(lnln p / ln p), so
//    the composed prediction is h - R ~ ((b+2c)/2) lnln p rather than a
//    constant; the implied b + 2c is 5.432, 4.648, 4.949, 4.717 across the decades
//    (or, on a plain 1/ln p form, k = 12.894, 11.938, 13.516, 13.543). On the sibling's
//    six points h - R = 6.008 constant fits at chi2/df 1.295 and h - R =
//    2.126 lnln p at 0.887, and lnln p moves only 15.5% over the whole lever
//    arm. The two cannot be separated below 1e8.
// ============================================================================
