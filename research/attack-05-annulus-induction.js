// ============================================================================
// ATTACK 5 — ANNULUS INDUCTION: a twin in every (p^2, q^2)?
// ============================================================================
// Crystallization nests the zones: each level adds the annulus (p_n^2,
// p_{n+1}^2) of newly settled territory. If EVERY annulus contains a twin
// prime, TPC follows by induction (a strong, Legendre-flavored hypothesis —
// cf. OEIS A192870 for integer squares, exceptions only at n <= 122).
// Empirics: count twin primes in every annulus between consecutive prime
// squares up to 10^8; find minima and any exceptions.
// ============================================================================

const LIMIT = 100_000_000;
const s = new Uint8Array(LIMIT + 3);
for (let i = 2; i * i <= LIMIT + 2; i++) if (!s[i]) for (let j = i * i; j <= LIMIT + 2; j += i) s[j] = 1;
const primes = []; for (let i = 2; i * i <= LIMIT; i++) if (!s[i]) primes.push(i);

let minCount = Infinity, minAt = null, empties = 0; const rows = [];
for (let i = 0; i + 1 < primes.length; i++) {
  const a = primes[i]*primes[i], b = primes[i+1]*primes[i+1];
  if (b > LIMIT) break;
  let c = 0;
  for (let r = a + 1; r + 2 < b; r++) if (!s[r] && !s[r+2]) c++;
  if (c === 0) { empties++; rows.push(`EMPTY annulus (${primes[i]}^2, ${primes[i+1]}^2)`); }
  if (c < minCount) { minCount = c; minAt = `(${primes[i]}^2, ${primes[i+1]}^2) len=${b-a}`; }
  if (i < 8 || i % 150 === 0) rows.push(`(${primes[i]}^2,${primes[i+1]}^2) len=${b-a} twins=${c}`);
}
console.log(rows.join('\n'));
console.log(`\nannuli checked: up to ${primes.findIndex(p=>p*p>LIMIT)} | empty annuli: ${empties} | minimum twins in an annulus: ${minCount} at ${minAt}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-05-annulus-induction.js
//   invocation:  node research/attack-05-annulus-induction.js
//   code-sha256: 49119bb0be0595a239d7434794fecfc1910c158ca371d8d8c1bcafd5a0b124b7
//   out-sha256:  957c7c556acb8e260147257bc11bb2d181d58d65261852557b0b6956435dd0dd
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.7 s
// ============================================================================
// (2^2,3^2) len=5 twins=1
// (3^2,5^2) len=16 twins=2
// (5^2,7^2) len=24 twins=2
// (7^2,11^2) len=72 twins=4
// (11^2,13^2) len=48 twins=2
// (13^2,17^2) len=120 twins=7
// (17^2,19^2) len=72 twins=2
// (19^2,23^2) len=168 twins=4
// (877^2,881^2) len=7032 twins=57
// (1993^2,1997^2) len=15960 twins=86
// (3187^2,3191^2) len=25512 twins=123
// (4421^2,4423^2) len=17688 twins=79
// (5701^2,5711^2) len=114120 twins=480
// (7001^2,7013^2) len=168168 twins=714
// (8389^2,8419^2) len=504240 twins=1988
// (9739^2,9743^2) len=77928 twins=317
//
// annuli checked: up to -1 | empty annuli: 0 | minimum twins in an annulus: 1 at (2^2, 3^2) len=5
// READINGS.
// 1. The annulus-induction hypothesis ("every (p^2, q^2) contains a twin",
//    which implies TPC by crystallization + induction) has ZERO exceptions
//    up to 1e8 — unlike its integer-square cousin (OEIS A192870) which has
//    early exceptions. Prime-square annuli are wide (>= ~4p) and, in this
//    range, never once approached emptiness: counts grow like len/ln^2.
// 2. The weakest annuli are the earliest, already crystallized ones — the
//    danger, as in attack 1, never materializes in settled territory.
// 3. This gives the paper a third equivalent-or-stronger ladder: gap form
//    (G2), window form (zones), annulus form — all measured, none provable.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// NOT A FIGURE: 192870 is the tail of the OEIS identifier A192870, which the
//   figure scanner reads as a number. The sequence id is carried in the code
//   above the banner.
// ---------------------------------------------------------------------------
