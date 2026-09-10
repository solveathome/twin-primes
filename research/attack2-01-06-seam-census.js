// ============================================================================
// ATTACK2 1+6 — SEAM CENSUS: do the seams supply ACTUAL twin primes?
// ============================================================================
// The Seam Lemma (fossil-shadows.js #5) guarantees (kP-1, kP+1) is a twin
// CANDIDATE pair for every seam kP — automatically coprime to P, at every
// level forever. But candidates are not primes. Two quantitative questions:
//
// ATTACK 1 (seam-twin census). At what rate are seam pairs actual twins?
//   Hardy–Littlewood, restricted to the progression n = kP-1: for p | P the
//   pair automatically avoids p (n ≡ -1, n+2 ≡ +1, never 0 mod p), so the
//   local factor is 1 instead of (p-2)/p [odd p] or 1/2 [p=2]; relative to
//   independence (1-1/p)^2 that is (p/(p-1))^2 instead of p(p-2)/(p-1)^2
//   [odd] or 2 [p=2]. Dividing by the generic twin density 2*C2/ln^2(x):
//
//       E(P) = 2 * prod_{odd p | P} p/(p-2)
//
//   E(30)=10, E(210)=14, E(2310)=154/9≈17.11, E(30030)=2002/99≈20.22.
//   TEST: for each P, sieve k=1..K (K = min(10^7, 3e9/P)) marking k where
//   some prime q ≤ sqrt(kP+1), q∤P divides kP±1 (k ≡ ±P⁻¹ mod q — a sieve
//   over k, no factoring). Measured enrichment = S / Σ_k 2*C2/ln²(kP),
//   compared against E(P).
//
// ATTACK 6 (seam-anchored windows). A window [kP, kP+X] has the SAME wheel-
//   of-P candidate pattern as the head [0, X] (kP+r ≡ r mod every p | P).
//   Prediction: actual-twin enrichment of seam windows over random windows
//   equals the head's candidate ratio rho = C_head(X)/(delta*X), delta =
//   prod(p-2)/P. Attack-10's phase law says which regime we're in: for P
//   reachable at 10^9 (≤ 23#) the head at X=50000 is PHASE 1 (p^3 < X), so
//   the honest prediction is rho ≈ 1.00 — NO window-scale enrichment.
//   TEST: P ∈ {30030, 510510}, 400 seam windows [kP, kP+50000] vs 400
//   unaligned windows at the same magnitude (n ~ 1-2e9), real twin counts
//   by segmented sieve. Verify measured ratio against computed rho.
// ============================================================================

'use strict';
const TWO_C2 = 1.3203236316;

// ---- primes to 55001 > sqrt(3e9) ----------------------------------------
const QLIM = 55001;
const comp0 = new Uint8Array(QLIM);
const primes = [];
for (let i = 2; i < QLIM; i++) if (!comp0[i]) { primes.push(i); for (let j = i * i; j < QLIM; j += i) comp0[j] = 1; }

function isPrimeTD(n) { if (n < 2) return false; for (const q of primes) { if (q * q > n) break; if (n % q === 0) return false; } return n > 1; }
function modInv(a, m) { // a, m coprime, both < 2^26 — plain-number egcd
  let [or_, r] = [a % m, m], [os, s] = [1, 0];
  while (r !== 0) { const q = Math.floor(or_ / r); [or_, r] = [r, or_ - q * r]; [os, s] = [s, os - q * s]; }
  return ((os % m) + m) % m;
}

// ============================ ATTACK 1 ====================================
console.log('=== ATTACK 1: seam-twin census (kP-1, kP+1 both prime) ===');
for (const P of [30, 210, 2310, 30030]) {
  const K = Math.min(1e7, Math.floor(3e9 / P));
  const maxVal = K * P + 1;                      // < 3.1e9 < 2^53, doubles safe
  const ok = new Uint8Array(K + 1).fill(1); ok[0] = 0;
  for (const q of primes) {
    if (q * q > maxVal) break;
    if (P % q === 0) continue;                   // q | P never divides kP±1
    const inv = modInv(P % q, q);                // kP ≡ 1 (mod q)  ⇔  k ≡ inv
    for (let k = inv; k <= K; k += q) ok[k] = 0; //   → q | kP-1
    for (let k = q - inv; k <= K; k += q) ok[k] = 0; // kP ≡ -1 → q | kP+1
  }
  // small-k repair: kP±1 ≤ 55000 may BE a sieving prime — recheck directly
  for (let k = 1; k * P + 1 <= QLIM; k++) ok[k] = isPrimeTD(k * P - 1) && isPrimeTD(k * P + 1) ? 1 : 0;

  let S = 0, S8 = 0, base = 0, base8 = 0;
  for (let k = 1; k <= K; k++) {
    const b = TWO_C2 / Math.log(k * P) ** 2;
    base += b; S += ok[k];
    if (k * P > 1e8) { base8 += b; S8 += ok[k]; }
  }
  let E = 2; for (const p of [3, 5, 7, 11, 13]) if (P % p === 0) E *= p / (p - 2);
  console.log(`P=${P}  K=${K.toExponential(1)}  max n=${maxVal.toExponential(2)}  seam twins S=${S}`);
  console.log(`  generic-HL baseline B=${base.toFixed(0)}  measured enrichment S/B=${(S / base).toFixed(3)}` +
    `  predicted E(P)=${E.toFixed(3)}  meas/pred=${(S / base / E).toFixed(4)}`);
  console.log(`  asymptotic slice (kP>1e8): S=${S8}  S/B=${(S8 / base8).toFixed(3)}  meas/pred=${(S8 / base8 / E).toFixed(4)}`);
}

// ============================ ATTACK 6 ====================================
console.log('\n=== ATTACK 6: seam-anchored windows vs random windows ===');
const X = 50000, NW = 400, LO = 1e9, HI = 2e9;

function mulberry32(seed) { return function () {
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function countTwins(lo) {       // # of n in [lo, lo+X) with n, n+2 both prime
  const len = X + 2, hi = lo + len, comp = new Uint8Array(len);
  for (const q of primes) {
    if (q * q >= hi) break;
    for (let v = Math.ceil(lo / q) * q; v < hi; v += q) comp[v - lo] = 1;
  }
  let c = 0;
  for (let i = 0; i + 2 < len; i++) if (!comp[i] && !comp[i + 2]) c++;
  return c;
}
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const sd = a => { const m = mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)); };

for (const [P, plist] of [[30030, [2, 3, 5, 7, 11, 13]], [510510, [2, 3, 5, 7, 11, 13, 17]]]) {
  // predicted factor: head candidate ratio under the wheel of P
  const bad = new Uint8Array(X + 3);
  for (const p of plist) {
    for (let j = 0; j < X + 3; j += p) bad[j] = 1;
    for (let j = ((p - 2) % p + p) % p; j < X + 3; j += p) bad[j] = 1;
  }
  let Chead = 0; for (let r = 0; r < X; r++) if (!bad[r]) Chead++;
  let D = 1; for (const p of plist) if (p > 2) D *= p - 2;
  const delta = D / P, rho = Chead / (delta * X);

  const rnd = mulberry32(20260814 + P);
  const kmin = Math.ceil(LO / P), kmax = Math.floor((HI - X - 2) / P);
  const kset = new Set();                       // distinct seams (kmax-kmin ≥ 1958 ≥ NW)
  while (kset.size < NW) kset.add(kmin + Math.floor(rnd() * (kmax - kmin + 1)));
  const seam = [], unal = [];
  for (const k of kset) {
    seam.push(countTwins(k * P));
    unal.push(countTwins(Math.floor(LO + rnd() * (HI - LO - X - 2))));
  }
  const ms = mean(seam), mu = mean(unal);
  const ses = sd(seam) / Math.sqrt(NW), seu = sd(unal) / Math.sqrt(NW);
  const ratio = ms / mu, seRatio = ratio * Math.sqrt((ses / ms) ** 2 + (seu / mu) ** 2);
  console.log(`P=${P}  head candidates C(${X})=${Chead}  fair=${(delta * X).toFixed(1)}  predicted rho=${rho.toFixed(4)}`);
  console.log(`  seam windows:      mean twins ${ms.toFixed(2)} ± ${ses.toFixed(2)}  (k in [${kmin},${kmax}])`);
  console.log(`  unaligned windows: mean twins ${mu.toFixed(2)} ± ${seu.toFixed(2)}`);
  console.log(`  measured ratio ${ratio.toFixed(4)} ± ${seRatio.toFixed(4)}   (prediction ${rho.toFixed(4)})`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack2-01-06-seam-census.js
//   invocation:  node research/attack2-01-06-seam-census.js
//   code-sha256: 1a9d84d01ed7b67ed36df3048344f0b49627bd0b7c0349ea40430fbb26ddc54b
//   out-sha256:  fce11e232fb9d7f65099069a2634bb3b572134d5f9c5c927734fcee6e896628d
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     1.6 s
// ============================================================================
// === ATTACK 1: seam-twin census (kP-1, kP+1 both prime) ===
// P=30  K=1.0e+7  max n=3.00e+8  seam twins S=388397
//   generic-HL baseline B=38905  measured enrichment S/B=9.983  predicted E(P)=10.000  meas/pred=0.9983
//   asymptotic slice (kP>1e8): S=241881  S/B=9.984  meas/pred=0.9984
// P=210  K=1.0e+7  max n=2.10e+9  seam twins S=444597
//   generic-HL baseline B=31792  measured enrichment S/B=13.985  predicted E(P)=14.000  meas/pred=0.9989
//   asymptotic slice (kP>1e8): S=415368  S/B=13.988  meas/pred=0.9991
// P=2310  K=1.3e+6  max n=3.00e+9  seam twins S=67842
//   generic-HL baseline B=3987  measured enrichment S/B=17.015  predicted E(P)=17.111  meas/pred=0.9944
//   asymptotic slice (kP>1e8): S=64587  S/B=17.012  meas/pred=0.9942
// P=30030  K=1.0e+5  max n=3.00e+9  seam twins S=6165
//   generic-HL baseline B=307  measured enrichment S/B=20.101  predicted E(P)=20.222  meas/pred=0.9940
//   asymptotic slice (kP>1e8): S=5887  S/B=20.158  meas/pred=0.9968
//
// === ATTACK 6: seam-anchored windows vs random windows ===
// P=30030  head candidates C(50000)=2473  fair=2472.5  predicted rho=1.0002
//   seam windows:      mean twins 148.06 ± 0.57  (k in [33301,66598])
//   unaligned windows: mean twins 147.74 ± 0.56
//   measured ratio 1.0022 ± 0.0054   (prediction 1.0002)
// P=510510  head candidates C(50000)=2181  fair=2181.6  predicted rho=0.9997
//   seam windows:      mean twins 148.07 ± 0.52  (k in [1959,3917])
//   unaligned windows: mean twins 147.64 ± 0.55
//   measured ratio 1.0029 ± 0.0052   (prediction 0.9997)
// READINGS
// 1. THE SEAMS ARE REAL-TWIN FACTORIES, AT EXACTLY THE PREDICTED RATE. The
//    derived constant E(P) = 2·prod_{odd p|P} p/(p-2) is confirmed to 0.2-0.6%
//    over four primorials and ~900,000 actual seam twins — a 10x to 20.2x
//    enrichment over generic positions of the same magnitude. The small
//    deficit (0.994-0.999, shrinking in the asymptotic slice) is the usual
//    second-order finite-x Hardy–Littlewood correction, not structure. Note
//    what E(P) is: the reciprocal of the wheel's twin-density factor. The
//    Copying Theorem dilutes twin-slot density by (p-2)/p per level; the
//    seams are exactly where that lost density re-concentrates. The Seam
//    Lemma's guaranteed CANDIDATES convert to actual twins at full HL rate —
//    conditioning on the wheel is "free" and the remaining primes q ∤ P
//    behave independently, as the moiré/CRT picture demands.
// 2. THE SEAM CANNOT BEAT THE LOGARITHM. As P grows through all primes ≤ y,
//    E(P) → e^{2γ}·ln²y / (2C₂)  (Mertens + the twin constant). So a seam
//    pair near kP ~ P survives with probability ≈ e^{2γ}·(ln y / θ(y))² ~
//    e^{2γ}(ln y/y)² → 0: maximal structural enrichment (ln²y) loses to
//    magnitude (ln²P ≈ y²). Corollary heuristic for attack2 #7/#10: Σ_y
//    (ln y/y)² converges — expect only FINITELY many twin primorial primes
//    P#±1, though infinitely many k give seam twins at every fixed level
//    (S grows like E(P)·2C₂·K/ln²(KP) → ∞). The wall, in seam form: the
//    enrichment is real, verified, and asymptotically insufficient — exactly
//    the parity-problem-shaped gap between "boosted density" and "certainty".
// 3. SEAM ANCHORING IS STRICTLY LOCAL — the window-scale prediction of
//    ATTACKS2 #6, done honestly, is NO enrichment, and that is what we
//    measure. The head [0, 50000] under the wheel of 13# or 17# is in
//    attack-10's PHASE 1 (p³ « X): C_head matches fair share to 0.03%
//    (2473 vs 2472.5 at P=30030, 0.02%; 2181 vs 2181.6 at P=510510, 0.0275%),
//    so predicted rho ≈ 1.000; measured ratios 1.0022 ±
//    0.0054 and 1.0029 ± 0.0052 — within 1σ of prediction, from ~59,000
//    twins per group. The naive reading "seam windows inherit an enriched
//    head" is REFUTED at reachable magnitudes, and structurally so: a seam
//    window needs kP ≤ n, so the wheel available at magnitude n is always
//    young relative to any fixed window (phase-3 head enrichment would need
//    p² ≳ 50000, i.e. P = 223# ~ 10^86 — no seams below 10^86). The seam's
//    gift dilutes from 20.2x at the pair itself (attack 1) to 1.000x across
//    50,000 positions: the pattern's enrichment is a point phenomenon at the
//    mirror edges, not a neighborhood phenomenon.
// 4. A CRT-VARIANCE ASIDE, free of charge: every seam window has the SAME
//    candidate pattern (wheel-coordinate variance exactly zero), yet its
//    twin-count sd (11.4) equals the unaligned windows' (11.2, vs Poisson
//    12.2). Freezing all coordinates p ≤ 17 removes almost none of the
//    window variance — consistent with the Variance Theorem's CRT product,
//    where at X=50000 the variance mass sits in the primes beyond the wheel.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run does not contain
// verbatim actually is. No number above was changed.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   ~900,000 seam twins = 388397 + 444597 + 67842 + 6165 = 907,001, the four
//   printed S totals summed and rounded down to one significant figure.
//   11.4 and 11.2 are per-window standard deviations, recovered from the
//   printed standard errors at P=30030 by multiplying by sqrt(NW): 0.57 x 20
//   = 11.4 (seam) and 0.56 x 20 = 11.2 (unaligned). NW = 400 is set in code.
//   12.2 is the Poisson comparison sqrt(148.06) = 12.168 on the printed mean.
//   ~59,000 twins per group = 400 windows x 148.06 mean = 59,224.
//   223 comes from the phase-3 requirement p^2 >~ 50000 with X = 50000 the
//   printed window width; theta(223) puts 223# at 10^86.6, quoted as 10^86.
//   0.03% is the larger of the two printed head-candidate errors: 2181 vs
//   2181.6 is 0.0275%. See the correction note below.
//
// TOKENIZER ARTIFACT, not a figure:
//   -0.999 is the tail of the hyphenated range "0.994-0.999". Both endpoints
//   round printed meas/pred values (0.9940 and 0.9989 / 0.9991).
//
// IN-CODE:
//   400 windows per group, X = 50000 window width, and the magnitude band
//   1e9 to 2e9 are all constants set above the banner.
//
// CORRECTED 2026-08-20 (mismatch adjudication #53): reading 3 said C_head
// "matches fair share to 0.03%" and cited "(2473 vs 2472.5)". That
// parenthetical is the P=30030 line, and 0.5/2472.5 = 0.0202%, not 0.03%; the
// 0.03% belongs to the P=510510 line, 2181 against 2181.6 = 0.0275%. The
// STATED BOUND was true of both lines, so no claim moved -- the parenthetical
// was simply attached to the wrong one of the two. The reading now names both
// lines with their own errors, so the bound and its witness cannot come apart
// again. No figure changed. (Both percentages recomputed here 2026-08-20.)
// ---------------------------------------------------------------------------
