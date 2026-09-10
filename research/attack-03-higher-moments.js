// ============================================================================
// ATTACK 3 — HIGHER MOMENTS: Gaussian discipline and quartic tail bounds
// ============================================================================
// The variance theorem (script 06) gives Chebyshev: empty fraction <= Var/mu^2.
// A 4th-moment bound gives <= M4/mu^4 — quadratically better IF M4 is small.
// Here we compute central moments M2, M3, M4 of the window count N(t) EXACTLY
// by enumerating all P window positions (levels 13/17/19), and test:
//   * skewness M3/M2^1.5 and kurtosis M4/M2^2 (Gaussian: 0 and 3)
//   * how much the quartic bound beats Chebyshev at these levels.
// k-point correlations factor over primes by CRT, so M3/M4 are in principle
// certifiable by formula (O(L^2)/O(L^3) sums); enumeration here = ground truth.
// ============================================================================

const PR = [2,3,5,7,11,13,17,19,23];
function run(upto) {
  const idx = PR.indexOf(upto), pNext = PR[idx+1], L = pNext*pNext;
  let P = 1; for (let i = 0; i <= idx; i++) P *= PR[i];
  const A = new Uint8Array(P); A.fill(1);
  for (let i = 0; i <= idx; i++) {
    const p = PR[i];
    for (let j = 0; j < P; j += p) A[j] = 0;
    for (let j = ((p-2)%p+p)%p; j < P; j += p) A[j] = 0;
  }
  let N = 0; for (let i = 0; i < L; i++) N += A[i % P];
  let s1=0, s2=0, s3=0, s4=0, min=Infinity;
  for (let t = 0; t < P; t++) {
    s1 += N; if (N < min) min = N;
    N += A[(t+L)%P] - A[t];
  }
  const mu = s1/P;
  N = 0; for (let i = 0; i < L; i++) N += A[i % P];
  for (let t = 0; t < P; t++) {
    const d = N - mu; s2 += d*d; s3 += d*d*d; s4 += d*d*d*d;
    N += A[(t+L)%P] - A[t];
  }
  const M2 = s2/P, M3 = s3/P, M4 = s4/P;
  console.log(`p=${upto}  L=${L}  mu=${mu.toFixed(2)}  MIN window count=${min}  ` +
    `Var=${M2.toFixed(2)}  skew=${(M3/M2**1.5).toFixed(3)}  kurt=${(M4/(M2*M2)).toFixed(3)}  ` +
    `Chebyshev bound=${(M2/(mu*mu)).toExponential(2)}  quartic bound=${(M4/(mu**4)).toExponential(2)}`);
}
for (const p of [13, 17, 19]) run(p);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-03-higher-moments.js
//   invocation:  node research/attack-03-higher-moments.js
//   code-sha256: 457b7ca1801eaf83352ff3c89f79f88c17c2e7948aefa166e286e230f7ac849b
//   out-sha256:  7f0494b6488f96880c94d952b5a57b00ef6199f145f4b6be82684edc19e085ba
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.2 s
// ============================================================================
// p=13  L=289  mu=14.29  MIN window count=10  Var=2.36  skew=0.116  kurt=2.498  Chebyshev bound=1.16e-2  quartic bound=3.33e-4
// p=17  L=361  mu=15.75  MIN window count=9  Var=2.84  skew=-0.087  kurt=2.880  Chebyshev bound=1.15e-2  quartic bound=3.78e-4
// p=19  L=529  mu=20.65  MIN window count=12  Var=3.95  skew=0.013  kurt=2.890  Chebyshev bound=9.27e-3  quartic bound=2.48e-4
// READINGS.
// 1. GAUSSIAN DISCIPLINE: skew ~ 0, kurtosis -> 2.9 (Gaussian = 3). The window
//    counts behave like a slightly clipped Gaussian — matching the
//    Montgomery–Vaughan moment philosophy, here measured exactly.
// 2. QUARTIC BOUND BEATS CHEBYSHEV 30-37x at the same level. (Corrected
//    2026-08-18: this reading said ~35-40x, an interval containing neither
//    endpoint of the three ratios its own output prints, 34.8 / 30.4 / 37.4.) Moment order k
//    buys roughly (Var/mu^2)^{k/2}*(k-1)!! decay: certified empty-window
//    bounds can be driven down super-polynomially by evaluating higher CRT
//    moment formulas (O(L^{k-1}) work) — but never to 0. Parity survives all
//    fixed moment orders; the METHOD's limit is visible and quantifiable.
// 3. BONUS CERTIFIED FACT: the MINIMUM count over all P window positions is
//    10 / 9 / 12 — the worst window still holds ~60% of the mean. Nothing in
//    the whole period comes remotely close to empty at these levels.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// DERIVED IN THIS READING by arithmetic over printed values: 34.8, 30.4 and
// 37.4 are the Chebyshev-over-quartic bound ratios, one per printed row.
// p=13: 1.16e-2 / 3.33e-4 = 34.83. p=17: 1.15e-2 / 3.78e-4 = 30.42.
// p=19: 9.27e-3 / 2.48e-4 = 37.38. All three round to the quoted values, and
// the reading's own "30-37x" span brackets them.
// ---------------------------------------------------------------------------
