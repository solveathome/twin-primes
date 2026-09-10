// ============================================================================
// THE REMOVAL LEDGER — Chris's capacity question, answered exactly
// (2026-08-14; resolves folder-17 step 6-7, the <FORMULA(PI#)> placeholder)
// ============================================================================
//
// THE PROPOSED ARGUMENT (Chris): we know the tile width, the census, the
// remover window (primes q with x < q <= sqrt(width) — only these can strike
// slots inside the tile, since q strikes only at positions >= q^2), and the
// count of primes in that window (PNT). If the census grows faster than the
// removers' total capacity, twins survive by scarcity -> statistical
// infinitude.
//
// THE VERDICT: facts 1-4 all correct — but the ledger REVERSES. The removers
// are few (34 at x=13) yet each strikes ~2/q of all slots; their total
// capacity EXCEEDS the census (factor ~2 ln x, growing). Scarcity fails.
// What saves the family is OVERLAP: kill events pile onto already-dead slots
// (670 of 1699 wasted at x=13), forced by arithmetic (a slot divisible by
// q1 and q2 dies once, absorbs two bullets) — inclusion-exclusion, i.e. the
// moire itself. Survivors = census * prod(1 - 2/q) ~ 2*C2*W/ln^2 W -> inf:
// the Hardy-Littlewood statistical base, reached from Chris's ledger.
//
// FOLDER-17 RESOLUTION: the 2025 sketch's step 6 <FORMULA(PI#)> can now be
// written: max damage of remover q ~ 2D/q; total ~ 2D * sum 1/q over the
// window — and it is LARGER than the census D, not smaller as step 7 hoped.
// The inequality reverses; salvation lives in overlap, not scarcity. Proving
// overlap is guaranteed in every region = the parity wall, as always.
//
// Note the unification: removers act EXACTLY like further folds — each q
// takes its 2/q toll by the same law. "The removers are just the folds the
// tile hasn't performed yet."
// ============================================================================

const W = 30030; // tile T13
const s = new Uint8Array(W + 3);
for (let i = 2; i * i <= W + 2; i++) if (!s[i]) for (let j = i * i; j <= W + 2; j += i) s[j] = 1;
const removers = []; for (let q = 17; q * q <= W; q++) if (!s[q]) removers.push(q);

const bad = new Uint8Array(W);
for (const p of [2, 3, 5, 7, 11, 13]) {
  for (let j = 0; j < W; j += p) bad[j] = 1;
  const r2 = ((p - 2) % p + p) % p;
  for (let j = r2; j < W; j += p) bad[j] = 1;
}
const slots = []; for (let r = 0; r < W; r++) if (!bad[r]) slots.push(r);

let totalKillEvents = 0; const killed = new Uint8Array(W);
for (const q of removers) {
  let k = 0;
  for (const r of slots) if (r % q === 0 || (r + 2) % q === 0) { k++; killed[r] = 1; }
  totalKillEvents += k;
}
let killedDistinct = 0; for (const r of slots) if (killed[r]) killedDistinct++;
let realTwins = 0; for (const r of slots) if (!killed[r] && r > 1 && !s[r] && !s[r + 2]) realTwins++;

console.log(`width=${W}  census=${slots.length}  removers=${removers.length} (17..${removers[removers.length - 1]})`);
console.log(`total kill EVENTS=${totalKillEvents} -> ${(totalKillEvents / slots.length).toFixed(2)}x census`);
console.log(`distinct killed=${killedDistinct}  overlap credit=${totalKillEvents - killedDistinct} wasted events`);
console.log(`survivors=${slots.length - killedDistinct} (real twin pairs below width: ${realTwins})`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/removal-ledger.js
//   invocation:  node research/removal-ledger.js
//   code-sha256: 8980262cb3e1e6f5252fc60625147f2ee94a3da61b02900aa5ac6e3a937570b2
//   out-sha256:  83d6f6a679c8fb369b7b025a8f5cddd7082676d51a7e5e8ba89ce796c73f898a
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.1 s
// ============================================================================
// width=30030  census=1485  removers=34 (17..173)
// total kill EVENTS=1699 -> 1.14x census
// distinct killed=1029  overlap credit=670 wasted events
// survivors=456 (real twin pairs below width: 456)
// READINGS.
// 1. Capacity > census already at x=13 (1.14x), growing ~2 ln x: the
//    scarcity route to infinitude is dead on the numbers.
// 2. 670/1699 = 39% of all kill events wasted on overlap — the family
//    survives on its killers' forced inefficiency, not on outnumbering them.
// 3. Survivors (456) = exactly the real twin pairs below the width: the
//    full-sieve ledger crystallizes the whole tile.
// 4. The remover window (x, sqrt(W)] and the strike-at-q^2 law give the
//    exact "max damage" formula folder-17 step 5 asked for; step 7's hoped
//    inequality reverses. The open problem is overlap-guarantee-per-region
//    (parity), not bullet-counting.
//
// ADDENDUM (2026-08-14, later): THE FAMILY-RESTRICTED UNION BOUND.
// Chris's follow-up attack: bound each remover's max damage ON THE @5 FAMILY
// within a fixed width (e.g. T31) and hope sum(max damages) < family total.
// Verdict: fails by a growing factor — at T31 the remover range is
// [37, 447840], 37,534 primes, and sum 2/q = 2.52x the family total
// (house-blindness closes the family-restriction escape: the Scour strikes
// the @5 comb at exactly the global rate, measured 68.7/69.3/69.9%).
// HISTORICAL NAME: this attack is the first line of Brun (1919) — the
// union bound; Brun's sieve is exactly its overlap-corrected refinement
// (alternating Bonferroni truncations), which proves the UPPER bound (twins
// sparse) and hits parity on the lower bound. NEAR-MISS VERSION: with a
// thin remover band q in (x, x(1+0.2/ln x)) the union bound arithmetically
// closes — but then needs a LOWER bound on the slot count of the anchored
// window to start from, which is the equidistribution problem: the wall,
// met at the entrance instead of the exit. Every route meets the same wall
// at a different door; the ledger now maps five doors (capacity, moments,
// Fourier, coverings, union bound).
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// The four figures at issue all sit in the 2026-08-14 ADDENDUM, which reasons
// about T31 while the embedded run is the T13 tile of width 30030.
//
// DEFINITION: 447840 is the top of the remover window, sqrt(T31). T31 is
//   200560490130 and its square root is 447839.80. The window rule
//   (x, sqrt(W)] is stated in reading 4 above; at T31 the head primes run to
//   31, so the removers are the primes from 37 to 447840 inclusive. CORRECTED
//   2026-08-20 (adjudication #44): the addendum said "(37, ~450000]" and
//   "~37,000 primes"; the window is now written [37, 447840] and the count
//   37,534, both recomputed here by sieve. (The old loose window, 37 < q <=
//   450000, holds 37,694 primes, so the "~37,000" was low by 700 either way.)
//
// BORROWED, verified present in the named source: the kill rates 68.7, 69.3
//   and 69.9 are the mod-30 house rates of research/two-moire-argument.md,
//   in its house-blindness section, measured on this same T13 ledger. They
//   reconcile with what this file prints: the census 1485 splits into three
//   houses of 495, the survivors that document lists as 155, 152 and 149 sum
//   to the 456 printed here, and 340/495, 343/495 and 346/495 are 68.69,
//   69.29 and 69.90 percent.
//
// CORRECTED 2026-08-20 (adjudication #41): the addendum's 2.66 is now 2.52.
//   Summing 2/q over [37, 447840] gives 2.52361 (recomputed here by sieve),
//   which is the value research/natal-cap-22-at31-drift.js prints when the @31
//   scour was actually run: "sum_scour 2/q = 2.524". The old figure is traced:
//   summing from q = 29 instead of q = 37 gives 2.6578 — the @29 scour floor
//   carried into a T31 window. Starting at 31 gives 2.5881; the half-open
//   37 < q <= 450000 reading gives 2.4703. The same 2.66 stood at
//   natal-cap-18-at29.js reading 7 with the same cause and is corrected there
//   too. The addendum's verdict, that the family-restricted union bound fails
//   by a growing factor, is unaffected: every one of these values exceeds 1.
// ---------------------------------------------------------------------------
