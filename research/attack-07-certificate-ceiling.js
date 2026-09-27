// ============================================================================
// ATTACK 7 — CERTIFICATE CEILING (LP-adversary, moment-method form)
// ============================================================================
// Any polynomial Q >= 0 on the support with Q(0) > 0 certifies
//   P(N = 0) <= E[Q(N)] / Q(0).
// Degree 2 gives Chebyshev/Cantelli; degree 4 with Q = ((x-a)(x-b))^2 is the
// strongest quartic family. We grid-search (a,b) against the EXACT moments
// (enumerated over all window positions) to find the best certified bound at
// each level — the practical ceiling of the moment/Delsarte method with 4
// moments. The adversary (parity) lives in whatever gap remains between this
// certificate and the truth (which is 0 empty windows at these levels).
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
  // raw moments E[N^k], k=1..4, exact enumeration
  let N = 0; for (let i = 0; i < L; i++) N += A[i % P];
  let m1=0,m2=0,m3=0,m4=0;
  for (let t = 0; t < P; t++) { m1+=N; m2+=N*N; m3+=N**3; m4+=N**4; N += A[(t+L)%P]-A[t]; }
  m1/=P; m2/=P; m3/=P; m4/=P;
  const mu = m1, Var = m2 - mu*mu;
  // E[((N-a)(N-b))^2] expanded in raw moments:
  // (N^2 - (a+b)N + ab)^2 = N^4 - 2(a+b)N^3 + ((a+b)^2+2ab)N^2 - 2ab(a+b)N + a^2b^2
  const EQ = (a,b) => {
    const s = a+b, q = a*b;
    return m4 - 2*s*m3 + (s*s + 2*q)*m2 - 2*q*s*m1 + q*q;
  };
  let best = Infinity, bestAB = null;
  for (let a = 0.5; a <= mu; a += 0.05) for (let b = a; b <= 3*mu; b += 0.05) {
    const q = a*b, v = EQ(a,b)/(q*q);
    if (v < best) { best = v; bestAB = [a.toFixed(2), b.toFixed(2)]; }
  }
  const cantelli = Var/(Var + mu*mu);
  const quartic = (m4 - 4*mu*m3 + 6*mu*mu*m2 - 3*mu**4)/(mu**4); // central M4/mu^4
  console.log(`p=${upto}  mu=${mu.toFixed(2)}  Cantelli=${cantelli.toExponential(2)}  plain quartic=${quartic.toExponential(2)}  BEST deg-4 certificate=${best.toExponential(2)} at (a,b)=(${bestAB})  truth=0`);
}
for (const p of [13, 17, 19]) run(p);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-07-certificate-ceiling.js
//   invocation:  node research/attack-07-certificate-ceiling.js
//   code-sha256: 454bb70f21a257f2a57b561fe196824d4854bc05d1a485ae45e5f87297be32c5
//   out-sha256:  da6cabf47761a2dbe37bde501d3fc8701913030eb3dfe31d3f41d764c4445ff1
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     3.5 s
// ============================================================================
// p=13  mu=14.29  Cantelli=1.14e-2  plain quartic=3.33e-4  BEST deg-4 certificate=1.94e-4 at (a,b)=(12.95,16.05)  truth=0
// p=17  mu=15.75  Cantelli=1.13e-2  plain quartic=3.78e-4  BEST deg-4 certificate=2.51e-4 at (a,b)=(14.20,17.50)  truth=0
// p=19  mu=20.65  Cantelli=9.18e-3  plain quartic=2.48e-4  BEST deg-4 certificate=1.62e-4 at (a,b)=(18.85,22.85)  truth=0
// READINGS.
// 1. The optimized certificate beats plain quartic ~1.5-1.7x and Chebyshev
//    ~60x. The optimal roots bracket mu tightly (mu +/- ~1.6 sigma) — the
//    certificate's whole power is spent penalizing the far-below-mean tail.
// 2. THE CEILING PATTERN: each +2 moment degrees buys roughly a factor
//    ~Var/mu^2 ~ 1/(5mu) of improvement. The moment tower certifies
//    empty-window rarity decaying like (c/mu)^k — fast, compounding, and
//    NEVER zero. This is the parity wall seen from the LP side: no finite
//    moment order forces occupancy; every order makes the conspiracy
//    exponentially more expensive. A clean quantitative statement of "how
//    deep" the wall is: parity survives all polynomial certificates, and the
//    price it pays grows geometrically per degree.
// ============================================================================
