// ============================================================================
// recon-0830-smooth-aps.js — support for recon-0830-smooth-aps.md
// Numerical checks of the two elementary identities that section 3.2 of the
// note rests on, and of the kernel bound it quotes. Nothing here touches the
// literature; nothing here is a measurement of the programme's objects.
// ============================================================================
// Objects (varE-theta2-proof.md section 1, attack-0830-varE-identification.md
// section 1): for a modulus n and a class c mod n,
//   phi_n(c) = sum_{h = c (mod n), |h| < L} (1 - |h|/L),   R_n(c) = phi_n(c) - L/n,
// computed here by DIRECT SUMMATION over h, never by the closed form, so the
// closed form is itself under test in PART A.
//
//  PART A  |R_n(c)| <= min(1, 2n/L) on random (n, c), and the closed form
//          [(r-c)^+ + (r+c-n)^+ - r^2/n]/L (r = L mod n) against the direct
//          sum for n <= L.
//  PART B  the main-term identity of section 3.2(iv):
//            sum_{j in (Z/d)^x} R_{de}(2 + e j)  =  sum_{g | d} mu(g) R_{eg}(2)
//          on random odd squarefree d and e coprime to d, several L.
//  PART C  the variation bound of section 3.2(ii): for fixed (L, d, a) and a
//          block e in [E, 2E], E = L/(dM), the function
//            G(a, e) = R_{de}(c(a, e)),  c = CRT(0 mod d, 2 mod e),
//          over ALL e = a (mod d) coprime to d in the block (a superset of the
//          friable squarefree e the note sums), has total variation
//          sum |G(e_{k+1}) - G(e_k)| <= 14 and sup |G| <= 2/M. Prints the
//          worst case over the samples.
// Deterministic: a seeded PRNG; no wall-clock figure is printed.
//   node research/history/staging/recon-0830-smooth-aps.js
// ============================================================================
'use strict';

// --- seeded PRNG (mulberry32) ------------------------------------------------
let seed = 20260830;
function rnd() {
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const rint = (lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));

function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }
function modinv(a, m) { // a, m coprime, m > 1
  let [g, x, x1, b] = [a % m, 1, 0, m]; if (g < 0) g += m;
  let r0 = g, r1 = m;
  while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [x, x1] = [x1, x - q * x1]; }
  if (r0 !== 1) throw new Error('not invertible');
  return ((x % m) + m) % m;
}
function isSquarefree(n) { for (let p = 2; p * p <= n; p++) if (n % (p * p) === 0) return false; return true; }
function mobius(n) { let m = 1; for (let p = 2; p * p <= n; p++) { if (n % p === 0) { n /= p; if (n % p === 0) return 0; m = -m; } } if (n > 1) m = -m; return m; }
function divisors(n) { const d = []; for (let k = 1; k * k <= n; k++) if (n % k === 0) { d.push(k); if (k * k !== n) d.push(n / k); } return d.sort((a, b) => a - b); }

// --- the objects, by direct summation ---------------------------------------
function phi(L, n, c) { // sum over h = c mod n, |h| < L, of (1 - |h|/L)
  c = ((c % n) + n) % n;
  let s = 0;
  const kmin = Math.ceil((-L + 1 - c) / n), kmax = Math.floor((L - 1 - c) / n);
  for (let k = kmin; k <= kmax; k++) { const h = c + k * n; s += 1 - Math.abs(h) / L; }
  return s;
}
const R = (L, n, c) => phi(L, n, c) - L / n;
function Rclosed(L, n, c) { const r = L % n; c = ((c % n) + n) % n; return (Math.max(r - c, 0) + Math.max(r + c - n, 0) - r * r / n) / L; }

const Ls = [2310, 30030, 510510];

// --- PART A ------------------------------------------------------------------
console.log('PART A  kernel bound |R_n(c)| <= min(1, 2n/L), and the closed form (n <= L)');
{
  let worstRatio = 0, worstClosed = 0, trials = 0;
  for (const L of Ls) for (let t = 0; t < 400; t++) {
    const n = rint(2, 3 * L), c = rint(0, n - 1);
    const r = R(L, n, c), bound = Math.min(1, 2 * n / L);
    worstRatio = Math.max(worstRatio, Math.abs(r) / bound);
    if (n <= L) worstClosed = Math.max(worstClosed, Math.abs(r - Rclosed(L, n, c)));
    trials++;
  }
  console.log(`  trials ${trials}  max |R|/min(1,2n/L) = ${worstRatio.toFixed(6)}  max |R - closed| (n<=L) = ${worstClosed.toExponential(2)}`);
}

// --- PART B ------------------------------------------------------------------
console.log('PART B  sum_{j unit mod d} R_{de}(2+ej) = sum_{g|d} mu(g) R_{eg}(2)');
{
  let worst = 0, trials = 0, worstCase = '';
  for (const L of Ls) for (let t = 0; t < 60; t++) {
    let d; do { d = rint(3, 400); } while (d % 2 === 0 || !isSquarefree(d));
    let e; do { e = rint(2, Math.floor(3 * L / d)); } while (gcd(d, e) !== 1);
    let lhs = 0;
    for (let j = 0; j < d; j++) if (gcd(j, d) === 1) lhs += R(L, d * e, 2 + e * j);
    let rhs = 0;
    for (const g of divisors(d)) rhs += mobius(g) * R(L, e * g, 2);
    const err = Math.abs(lhs - rhs);
    if (err > worst) { worst = err; worstCase = `L=${L} d=${d} e=${e} lhs=${lhs.toFixed(6)}`; }
    trials++;
  }
  console.log(`  trials ${trials}  max |lhs - rhs| = ${worst.toExponential(2)}  (worst case ${worstCase})`);
}

// --- PART C ------------------------------------------------------------------
console.log('PART C  variation of G(a, e) = R_{de}(CRT(0 mod d, 2 mod e)) over e = a (d) in [E, 2E], E = L/(dM)');
{
  const Ms = [0.5, 1, 2, 4, 8];
  let worstVar = 0, worstSup = 0, worstDesc = '', samples = 0, maxLen = 0;
  for (const L of Ls) for (const M of Ms) for (let t = 0; t < 40; t++) {
    const dmax = Math.floor(Math.sqrt(2 * L / M));
    let d; do { d = rint(3, Math.max(3, dmax)); } while (d % 2 === 0 || !isSquarefree(d));
    let a; do { a = rint(1, d - 1); } while (gcd(a, d) !== 1);
    const E = L / (d * M);
    let prev = null, variation = 0, sup = 0, len = 0;
    for (let e = Math.ceil(E); e <= 2 * E; e++) {
      if (e % d !== a % d || gcd(e, d) !== 1) continue;
      // CRT: c = 0 mod d, c = 2 mod e  ->  c = d * ((2 * inv(d mod e)) mod e)
      const c = e === 1 ? 0 : d * ((2 * modinv(d % e, e)) % e);
      const G = R(L, d * e, c);
      sup = Math.max(sup, Math.abs(G));
      if (prev !== null) variation += Math.abs(G - prev);
      prev = G; len++;
    }
    samples++; maxLen = Math.max(maxLen, len);
    if (variation > worstVar) { worstVar = variation; worstDesc = `L=${L} M=${M} d=${d} a=${a} terms=${len}`; }
    worstSup = Math.max(worstSup, sup * M);
  }
  console.log(`  samples ${samples}  longest class in a block ${maxLen} terms`);
  console.log(`  max total variation = ${worstVar.toFixed(4)}  (bound claimed 14; worst case ${worstDesc})`);
  console.log(`  max M * sup|G| = ${worstSup.toFixed(4)}  (bound claimed 2)`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/recon-0830-smooth-aps.js
//   invocation:  node research/history/staging/recon-0830-smooth-aps.js
//   code-sha256: cab029786fc4c2d1a43250d522503e49ddc784c2c938dccb58b121371a4888b7
//   out-sha256:  6cf5a4aeb971778296396d82331860a06cb6031ccfbf2561c6bd681a74f97bc2
//   body-lines:  8
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     0.1 s
// ============================================================================
// PART A  kernel bound |R_n(c)| <= min(1, 2n/L), and the closed form (n <= L)
//   trials 1200  max |R|/min(1,2n/L) = 0.656563  max |R - closed| (n<=L) = 1.25e-14
// PART B  sum_{j unit mod d} R_{de}(2+ej) = sum_{g|d} mu(g) R_{eg}(2)
//   trials 180  max |lhs - rhs| = 1.33e-12  (worst case L=510510 d=47 e=862 lhs=-0.018726)
// PART C  variation of G(a, e) = R_{de}(CRT(0 mod d, 2 mod e)) over e = a (d) in [E, 2E], E = L/(dM)
//   samples 600  longest class in a block 6674 terms
//   max total variation = 0.4576  (bound claimed 14; worst case L=2310 M=1 d=33 a=4 terms=3)
//   max M * sup|G| = 0.4658  (bound claimed 2)
// ============================================================================
// READINGS
// ============================================================
// R1  PART A: the kernel bound |R_n(c)| <= min(1, 2n/L) holds on every trial
//     with a ratio below 1, and the closed form agrees with the direct sum
//     to floating-point precision for n <= L.
// R2  PART B: the main-term identity sum_{j unit} R_{de}(2+ej) =
//     sum_{g|d} mu(g) R_{eg}(2) holds to floating-point precision on random
//     (L, d, e); this is section 3.2(iv) of the note.
// R3  PART C: the total variation of G(a, .) over a block is far below the
//     14 claimed in section 3.2(ii), and M * sup|G| is below the claimed 2,
//     on 600 sampled (L, M, d, a) with classes of up to thousands of terms.
//     The claimed constants are upper bounds with room, not sharp values.
// R4  None of this is a measurement of the programme's objects; the three
//     checks are of elementary identities the deduction uses.
