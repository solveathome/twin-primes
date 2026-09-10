// ============================================================================
// GENEALOGY — Chris's decomposition: "new twin targets (p-2) + existing
// surviving twin opportunities" (2026-08-14 session)
// ============================================================================
// Verified claims:
// 1. NO ORPHANS, EVER: every twin slot mod P*p reduces mod P to a twin slot
//    of the old pattern (if r, r+2 avoid all primes <= p, they avoid all
//    primes < p). The population never gains a new lineage — it is ONE
//    family tree, descending from the single ancestral slot (5,7) mod 6.
// 2. THE "NEW" (p-2) SEAM PAIRS ARE THE EDGE SLOT'S CHILDREN: seam pairs
//    (kP-1, kP+1) all reduce to r ≡ -1 mod P — the wrap/mirror-edge slot.
//    So the Seam Lemma is the Copying Theorem applied to one distinguished
//    slot. Chris's decomposition, exactly:
//      D_{n+1} = (p-2)*1        [edge children  = "new twin targets"]
//              + (p-2)*(D_n -1) [copies of all interior slots = "existing
//                                surviving opportunities"]
//              = (p-2)*D_n      [the Copying Theorem]
// 3. PREDICTABLE GROWTH, closed form and asymptotic:
//      D_n = prod_{3<=p<=p_n} (p-2)                  (exact)
//      D_n ~ P_n# * (2*C2*e^{-2gamma}) / ln^2(p_n)   (Mertens-type)
//    with 2*C2*e^{-2gamma} = 0.41621...; verified converging:
//    delta*ln^2 p = 0.3253 (13) -> 0.4007 (97) -> 0.4150 (9973).
//    (The constant read 0.41625 here and in the pasted tail from 2026-08-14
//    until 2026-08-19. It was never computed: the code has always printed
//    0.41621 and the corpus quoted a digit the code did not produce.)
//
// Historical witness: Chris's 2024 folder-09 "data" file recorded the chain
// 3 -> 15 -> 135 -> 1485 -> 22275 ("multiply by p-2") empirically.
// ============================================================================

const primes = [2,3,5,7,11,13];
let P = 6;
for (const p of [5,7,11,13]) {
  const Pn = P * p;
  const bad = (r, M, ps) => { for (const q of ps) { if (q > M) break; if (r % q === 0 || (r+2) % q === 0) return true; } return false; };
  const ps = primes.filter(q => q <= p);
  const slots = []; for (let r = 0; r < Pn; r++) if (!bad(r, Pn, ps)) slots.push(r);
  const oldPs = ps.filter(q => q < p);
  let orphan = 0, edgeKids = 0;
  for (const r of slots) {
    if (bad(r % P, P, oldPs)) orphan++;
    if (r % P === P - 1) edgeKids++;
  }
  console.log(`p=${p}: slots=${slots.length} orphans=${orphan} edge-children=${edgeKids} (Seam Lemma: ${p-2})`);
  P = Pn;
}
// ---------------------------------------------------------------------------
// THE CONVERGENCE TABLE, COMPUTED (added 2026-08-19, custody migration wave 3).
// It was asserted in the tail and in the header from 2026-08-14 and the code
// had never printed it, so nine of its eleven figures had no source in this
// repository. delta(p) = D(p) / p# with D(p) = prod_{3<=q<=p} (q-2), and the
// Mertens-type claim is delta(p) * ln^2 p -> 2*C2*e^{-2gamma}. The ratio is
// accumulated as prod (1 - 2/q) / 2 so nothing overflows.
const LEVELS = [13, 31, 97, 499, 1999, 9973];
{
  const N = LEVELS[LEVELS.length - 1];
  const sieve = new Uint8Array(N + 1);
  const odd = [];
  for (let i = 3; i <= N; i += 2) {
    if (sieve[i]) continue;
    odd.push(i);
    for (let j = i * i; j <= N; j += 2 * i) sieve[j] = 1;
  }
  let ratio = 0.5, k = 0;                        // the prime 2 contributes 1/2
  const cells = [];
  for (const q of odd) {
    ratio *= (q - 2) / q;
    if (q === LEVELS[k]) { cells.push(`${(ratio * Math.log(q) ** 2).toFixed(4)} (${q})`); k++; }
  }
  console.log(`delta*ln^2(p): ${cells.join(', ')}`);
}
const C2x2 = 1.3203236316937248, g = 0.5772156649015329;
console.log(`asymptotic constant 2*C2*e^(-2gamma) = ${(C2x2 * Math.exp(-2*g)).toFixed(5)}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/genealogy.js
//   invocation:  node research/genealogy.js
//   code-sha256: d05eabf4779dbb52c71e3fa3a8bfd61c852814192705dd61fd7512651f50eda7
//   out-sha256:  427866ebdf384ef0f8ea7656d9a6112d716ea91dbd92c33c92933220b2b2d1c3
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// p=5: slots=3 orphans=0 edge-children=3 (Seam Lemma: 3)
// p=7: slots=15 orphans=0 edge-children=5 (Seam Lemma: 5)
// p=11: slots=135 orphans=0 edge-children=9 (Seam Lemma: 9)
// p=13: slots=1485 orphans=0 edge-children=11 (Seam Lemma: 11)
// delta*ln^2(p): 0.3253 (13), 0.3661 (31), 0.4007 (97), 0.4093 (499), 0.4140 (1999), 0.4150 (9973)
// asymptotic constant 2*C2*e^(-2gamma) = 0.41621
// ============================================================================
// READINGS
// ============================================================================
//
// 1. NO ORPHANS, AT EVERY LEVEL COMPUTED. orphans = 0 at p = 5, 7, 11, 13:
//    every twin slot mod P*p reduces mod P to a twin slot of the old pattern.
//    The population is one family tree, and the count in the row above is the
//    whole of it. This is the computational face of claim 1 in the header.
//
// 2. THE SEAM PAIRS ARE THE EDGE SLOT'S CHILDREN. edge-children equals p-2 at
//    all four levels (3, 5, 9, 11), which is the Seam Lemma read off the run
//    rather than assumed: the "new twin targets" of Chris's decomposition are
//    the descendants of the single slot r = -1 mod P, so the decomposition
//    (p-2)*1 + (p-2)*(D_n - 1) is the Copying Theorem with one slot named.
//
// 3. THE CONVERGENCE IS REAL AND SLOW, AND THE LIMIT IS 0.41621, NOT 0.41625.
//    delta*ln^2 p rises 0.3253 -> 0.3661 -> 0.4007 -> 0.4093 -> 0.4140 ->
//    0.4150 over p = 13 .. 9973 against the printed 2*C2*e^(-2gamma) =
//    0.41621. The approach is monotone and the residual at p = 9973 is still
//    about 0.3%, which is the 1/ln p correction the Mertens-type statement
//    carries and not a defect of the fit.
//
//    CUSTODY, 2026-08-19. Those six figures stood in the OUTPUT block from
//    2026-08-14 with no code behind them; the computation added this pass
//    reproduces all six digit for digit, so the table was right. The limit
//    was not: the block closed the arrow at 0.41625 where this code has
//    always printed 0.41621, and 0.41621 is the correct value of
//    2*C2*e^(-2gamma) = 1.3203236316937248 * e^(-1.1544313298). The four
//    slots/orphans/edge-children rows are unchanged from the 2026-08-14 run.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// Reading 3's own custody paragraph already accounts for 0.41625: it is the
// RETIRED value, quoted only to name what the pre-2026-08-19 block closed the
// arrow at. This file has always printed 0.41621, which is correct. The figure
// is deliberate contrast, not a live claim, and nothing here quotes it as the
// constant.
//
// IN-CODE: 1.3203236316937248 is the constant C2x2 declared above the banner,
// which is 2*C2 with C2 = 0.6601618158, the twin-prime constant.
//
// DEFINITION constant: -1.1544313298 is -2*gamma, formed from the gamma
// declared above the banner, 0.5772156649015329. The product
// 1.3203236316937248 * e^(-1.1544313298) = 0.4162145328, which the run prints
// rounded to 0.41621. The arithmetic of reading 3 checks out exactly.
// ---------------------------------------------------------------------------
