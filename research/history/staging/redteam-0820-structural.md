# Red team 2026-08-20: the two structural headlines, adversarially replayed

<!-- ledger
id: Q-redteam-0820-structural
status: ANSWERED
todo: none
question: Do the Mirror-Sweep Lemma and its palindrome, and the advmin@11 = 16 headline, survive an adversarial replay?
verdict: Both CONFIRMED on independent re-derivation with zero shared code, advmin@11 = 16 re-proven end to end so that 16 < 34 kills every class-uniform cap; the correction that matters is one quantifier made explicit in the inversion sentence, since a family whose conclusion reads the chosen classes is not capped by 16 at the anchored point, and two precision defects sit in a Thorne citation.
-->

*(2026-08-20. Adversarial verifier, branch opus-try. Brief: break the
Mirror-Sweep Lemma + palindrome + decoupling claims of
`attack-0c-holesweep.md`, break the advmin@11 = 16 headline of
`attack-advmin-1113.md`, and spot-check three citations in
`special-levels-recon.md`. Method: independent re-derivation and independent
replay — no code shared with the producers for the witness replays. Default:
refuted-until-rederived. Verdicts: CONFIRMED / WEAKENED / REFUTED.)*

## STATUS: COMPLETE

## 0. The one correction that matters most

The inversion sentence at the heart of the pivot needs one quantifier made
explicit (§2d). As written — "any bound that quantifies over all class
choices proves a floor valid at the adversarial witness too" — it is true
only for bounds whose CONCLUSION is a single class-independent number. A
family proven "for all classes" but whose conclusion reads the chosen
classes (a class-dependent floor B(a)) is not capped by 16 at the anchored
point; instantiated at {0,−2} it is exactly an anchored-aware argument, so
the report's dichotomy survives, but the sentence should say so. Corrected
sentence in §2d. THE PIVOT ITSELF STANDS: advmin@11 = 16 re-proven here end
to end with zero shared code, and 16 < 34 kills every class-uniform cap.

## 1. Target 1: attack-0c-holesweep.md

### 1a. Mirror-Sweep Lemma — CONFIRMED (re-derived from scratch), with one wording defect

**Re-derivation, independent.** σ(s) = W−2−s maps the twin-slot tile to
itself (r, r+2 coprime to W ⟺ −r−2, −r coprime), reverses cyclic order (a
circle reflection, so every maxsum_m is invariant), and fixes exactly the
slots with 2s ≡ −2 (mod W): s = (W−2)/2 (even, not a slot) and s = W−1 —
the edge, uniquely. The crux the producer states as "integer-exact": the
mod-p residue of a slot is a function of its representative in [0, W), and
p ∤ W, so a representative wrap shifts the residue by w = W mod p. For
s ≤ W−3, σ(s) = W−2−s needs no wrap (slot W−2 ≡ 4 mod 6 does not exist),
so s ≡ a ⟹ σ(s) ≡ (w−a)−2 and s ≡ a−2 ⟹ σ(s) ≡ w−a: σ carries the
deletion class {a, a−2} to {w−a, w−a−2} on every non-edge slot. The edge
slot is σ-fixed; its residue is w−1, so it lies in del_a iff a ∈ {w−1, w+1}
(the seam-striking alignments) and in del_{w−a} iff a ∈ {1, p−1}. Hence
σ(Alive(a)) = Alive(w−a) exactly when the two memberships agree — identity
(i) for a outside {1, w−1, w+1, p−1} — and when a strikes and w−a does not,
σ(Alive(a)) = Alive(w−a) minus the edge slot, which is (iii) verbatim, with
Δ_m(a) ≥ Δ_m(w−a) since deleting one slot only merges gaps. The palindrome
(ii): a(k) = −kw gives a(k) + a(p−1−k) ≡ w. All three parts re-derive
cleanly; the ±2 conventions (a(k) = −k·(W mod p); second class a−2; edge
residue w−1; seam set {w−1, w+1}) were re-derived from the fold definition
t = s + kW, t ≡ 0 or −2 (mod p), and match the producer's code exactly.
**No off-by-one found.**

**Wording defect: "four specials" is at most four.** The set
{1, w−1, w+1, p−1} has THREE elements whenever w ∈ {2, p−2}; at 5→7 (w = 2)
the producer's own output prints `{1,3,6}`. Finer: the truly asymmetric
alignments (edge-membership XOR) at 5→7 are only {3, 6} — a = 1 is
edge-striking AND self-mirror, so (i) holds there trivially. The exclusion
set is conservative and safe; the count "four" in the headline and §4(i)
is contradicted by the artifact's own 5→7 row. WEAKENED (wording only).

**Independent exhaustive verification** (`rtb-t1-inmem.js`, direct-definition
tiles — gcd sieve, no fold recursion — and a from-scratch maxsum): all seven
in-memory C₁ curves reproduce the embedded rows slot for slot; mirror pairs
equal at every m ≤ 8 on all non-special pairs (3/3, 4/4, 5/5, 7/7, 8/8,
10/10, 13/13); anomaly (iii) exact at every fold; one-sided never violated;
the single strict break at 5→7 (30 vs 18). ALL CHECKS PASS.

### 1b. Palindrome / argmax closure vs 0c0e reading 5 — CONFIRMED

Opened `attack-0c0e-01-deleted-family.js`'s embedded "full argmax sets":
{5,7}, all-of-0..12-except-11, {0,2,3,5,6,8,9,12,13,16}, {0,1,2,4,5,9,13,
14,16,17,18}, {5,10,19}, {2,15}, {7,12,23,27}. My independent recompute
produces the same sets, and closure under a ↦ w−a verifies at every fold
7→11 .. 31→37 (11↦11 at w=9 is the mirror-fixed point 2·11≡9; 19↦19 at
w=15; 15↔33 at 31→37). The 5→7 exception is real and licensed: argmax {3}
is not closed, and 3 = w+1 is the seam special. Reading 5's sentence "The
argmax sets carry no arithmetic pattern" read in situ — the held correction
candidate is right: they carry exactly the mirror closure.

### 1c. Kill-decoupling — CONFIRMED, with one tie-break caveat at 19→23

Exact recompute (sums as integers): 5→7 hi/lo = 66/3 vs 42/3 (22.0/14.0);
7→11 180/5 vs 156/5 (36.0/31.2); 13→17 840/8 vs 816/8; **17→19 1302/9 vs
1302/9 — "exactly flat" is EXACT (both means 434/3 = 144.666…, printed
144.7), not a rounding artifact**; 19→23 2082/11 both; **23→29 3252/14 vs
3300/14 = 232.286 vs 235.714 — REVERSED, matching 232.3/235.7.**

Tie-break audit (`rtb-t1-ties.js`): the median split sorts by kill count and
kill counts tie. Over ALL tie-break permutations: 5→7, 7→11, 11→13, 13→17
strictly positive; **17→19 flat for every tie-break (both sums pinned at
1302)**; **23→29 reversed for every tie-break (hi−lo mean = −3.429
always)**. The headline's three cited numbers are therefore tie-robust.
CAVEAT: **19→23's flatness is tie-break-dependent** — ties straddle the
boundary and other permutations give hi−lo mean anywhere in [−1.64, +1.64];
§5/reading 6's "exactly flat at … 19→23" should carry that caveat (the
range straddling zero still supports decoupling). WEAKENED for that one
sentence; the claim set the report leads with is CONFIRMED.

### 1d. Engine coverage of the streamed folds — WEAKENED as stated, CONFIRMED after replay

As shipped, walker=naive validation covers the seven in-memory folds only
(transfer validation). 29→31 additionally has real dual custody: 0c0e's
independent stream reproduces min/mean/max. **31→37 is single-engine for 35
of its 37 values**: only the max (528 = G₂(37#), copy theorem against
scanstat-t37's exhaustive certificate) had independent custody, and mirror
symmetry is internal redundancy, not a second engine. §8's wording is
accurate but reads stronger than it is. Repaired here: my from-scratch
naive tracker (`rtb-t1-stream.js`, direct-definition T₂₃, CRT streams, no
top-K machinery) reproduces the **full 29→31 curve, 31 of 31 alignments**,
and six 31→37 values spanning the whole shape — a=15:528 (max), a=30:402
(min), a=34:510 and a=35:462 (both tiers), a=0:408 and a=19:432 (bulk) —
**all agree**. The remaining 31 values at 31→37 stay walker-only (halved by
the proven mirror).

## 2. Target 2: attack-advmin-1113.md

### 2a. Witness replay — CONFIRMED, and the whole equality re-proven independently

From-scratch checker (`rtb-t2-advmin.js`; comb built from the definition,
strike test r ≡ a or a−2 (mod q), zero code shared with the producer): the
OUTPUT-block witness 13:10 17:4 19:14 23:15 29:24 31:17 37:34 41:39 43:10
47:40 leaves **exactly 16 of the 90 slots** unstruck. Beyond the brief: my
own branch-and-bound (union bound ONLY — no dual weights, no dedup, my
code) **completed over the full 10-prime space with zero leaves below 16**
(6,782 nodes), so advmin@11 ≥ 16 is re-proven independently. With the
witness, **advmin@11 = 16 now holds with two disjoint proof stacks.**
Also replayed: anchored survivors 45 (@11) and 307 (@13), |N| = 10/90/990,
scour lists 11..13 / 13..47 / 17..173, product space 266,186,053,068,611.

### 2b. Pruning-bound soundness — CONFIRMED (proven, not assumed)

Re-derived both bounds independently. Union bound: fresh coverage on any
descendant uncovered set U′ ⊆ U is ≤ max_a |K_q(a) ∩ U| by set inclusion —
genuinely monotone, no assumption. Dual bound: the header's five-line
weak-duality argument is correct as written (each covered slot pays p_s in
some chosen class ≤ λ_i frozen at root, plus μ_s over U ⊇ C; floor valid on
integers; ranges λ_i ≤ 990·2²⁰ ≈ 1.0e9, sums ≪ 2⁵³ — Float64-exact), and it
is valid at every node directly from root quantities, needing no
monotonicity. Traced the cachedMax dirty-flag invariant through apply/undo:
dirty ⟹ cachedMax ≥ true max, clean ⟹ exact — sound in all four branches.
Child dedup is a true state identity (covered/cnt/uSize/muSumU are
functions of the fresh slot set), keyed by exact slot list. Incumbents come
only from evaluated leaves or an externally replay-verified witness; the
subgradient tuning touches tightness only (λ recomputed exactly from the
final rounded integer weights). Bar mode: completing with no leaf below B
proves min ≥ B — sound. The repo's twice-shipped greedy-monotonicity
mistake has no entry point here.

### 2c. Calibrations — CONFIRMED, all three re-run from scratch

Independent prune-free enumerator (own bitset code): **@7 full min 4 over
exactly 143 leaves; @11 head-4 min 45 over exactly 96,577; @11 head-6 min
33 over exactly 86,822,723.** All three match the producer's claims,
including the leaf counts.

### 2d. Inversion logic — WEAKENED (one quantifier made explicit); the pivot stands

The staircase's 34 (paper/staircase-note.md Thm 8) is a pointwise floor at
the anchored configuration a_q = 0 ∀q — one point of the adversary's
product space (Cofactor Rigidity is a theorem about the classes {0, −2}).
The report knows this and says so. The gap is in the ceiling sentence:
"any cap family … that quantifies over all class choices proves a floor
valid at the adversarial witness too" conflates where the family QUANTIFIES
with what it CONCLUDES. A family proven for all classes but concluding a
class-dependent floor B(a) is not capped by 16 at the anchored point; it
escapes the theorem — and instantiated at {0,−2} it is precisely an
anchored-aware argument, i.e. the family the report leaves alive. So the
dichotomy is coherent, but the sentence should be:

> **Corrected sentence.** Any bound whose certified floor is a single
> number valid simultaneously for every choice of scour classes (a
> class-uniform conclusion) is instantiated by the adversarial witness, so
> its ceiling is advmin@11 = 16 < 34: class-uniform caps cannot re-certify
> the staircase floor, let alone close 34 → 45. A cap whose conclusion
> depends on the chosen classes is not touched — but reading the classes
> is exactly what "anchored-aware" means, so only anchored-aware caps
> remain.

### 2e. @13 replay, arithmetic, and a custody nit — CONFIRMED with one provenance defect

The recorded @13 witness replays to **152 of 990** in my checker. The
arithmetic: 307−152 = 155, 307−110 = 197, 155/197 = 78.7% → "79%" and "at
most 42" = 152−110 both exact. All seven terminal states in §3's table
cross-check against the preserved logs (bars 2.96/4.42/4.57/3.92/5.55 e8
with bestF pinned at the bar = no leaf below it; shard 1.61e9 at depth 15
seed 152; bar-111 1.10e8; full 2.66e8 no leaf below 153; head-8 NOT
COMPLETED at 3.0e8; head-4 −30; head-6 ≥ 21 at 1.02e7 nodes).
**Provenance defect (minor):** the §1 table's @13 rows "union 1264 > 990"
and "dual 1017 > 990" are NOT in the embedded OUTPUT block and are not
marked as terminal states of killed runs — they come from the killed
full13 logs, contradicting the preamble's custody sentence. The union 1264
(and @11's 91) I recomputed independently — correct; the dual 1017 is
tuning-dependent and was not re-derived here. Fix: mark those two cells'
provenance, or add root bounds to an embedded phase.

## 3. Target 3: special-levels-recon.md citation spot-check

### 3a. Shiu — CONFIRMED

Verified at the journal's article pages this pass (Wiley/LMS DOI
10.1112/S0024610799007863 and the Oxford Academic listing jlms/61/2/359):
D. K. L. Shiu, *Strings of Congruent Primes*, J. London Math. Soc. (2)
**61** (2000), no. 2 (April), 359–373. The trap is real: Thorne's survey
(rendered page 2, read this pass) prints "In 1997, Shiu [8] similarly
proved". Cite 2000.

### 3b. AGP — CONFIRMED

Two independent channels this pass: the Crossref record for DOI
10.2307/2118576 (Annals of Mathematics, vol. 139, issue 3, 1994, p. 703)
and MR1283874 (Ann. of Math. (2) 139 (1994), no. 3, 703–722); and the
author-hosted scan's own first page, read as a rendered image, genuinely
carries the running head "Annals of Mathematics, 140 (1994), 703–722" —
the trap exists exactly as described. Cite 139, never the running head.

### 3c. Thorne footnote — WEAKENED (two precision defects, substance intact)

The footnote is real and the recon quotes it verbatim: "This is not known
to be true for all Q, except under GRH. However, a theorem of Gallagher
[3] implies the correct asymptotic for an infinite set of such Q, where
the error term in the asymptotic depends on D." Two defects. (i) **It sits
on printed page 2**, attached to "predicts²" (the PDF's page 1 is the
unnumbered title page) — the recon cites "p. 1 footnote 2" three times.
(ii) The footnote directly supports "certified only on an infinite
subsequence via Gallagher", but **it never mentions Siegel zeros**:
"Siegel-defensive" is a correct mathematical gloss (Gallagher's theorem is
the exceptional-zero-avoiding PNT for APs, and the GRH caveat is the
exceptional-zero issue) but it is an inference, not Thorne's text.
Corrected reading: "Maier's levels are certified only on an infinite
subsequence via Gallagher (Thorne survey p. 2 fn. 2); reading that
subsequence as Siegel-avoidance is our (standard) gloss, not the
footnote's words."

## 4. Not reached

- advmin@13 head-6 ≥ 21: replayed from output/logs only, not re-run.
- The @13 dual root bound 1017 (subgradient-dependent): not re-derived.
- 31→37: 6 of 37 alignments independently recomputed (max/min/tiers/bulk);
  the other 31 remain walker-only, halved by the proven mirror.
- m ≥ 2 at the streamed folds — like the producer, m = 1 only.
- The producer's @11 exact-search tree was not audited node for node; my
  independent completion proof (union-only B&B to bar 16) is the substitute.
- Shiu's full text (paywalled): bibliography verified; hypotheses still
  carried via Thorne. Thorne-bubbles fn. 1 ("1/φ(q) omitted") not re-read.
- The recon's other second-hand chains (Heath-Brown 1983, FG 1989, Tanner,
  Pomerance originals) — outside this brief, unaudited.

## 5. Artifacts

Scratch producers and outputs (session scratchpad, prefix `rtb-`):
`rtb-t1-inmem.js/.out` (tiles by direct definition; all seven in-memory
folds, mirror/anomaly/argmax/splits), `rtb-t1-ties.js/.out` (tie-break
ranges), `rtb-t1-stream.js/.out` (29→31 full curve, 31→37 six alignments),
`rtb-t2-advmin.js/.out` (combs, witness replays, three brute-force
calibrations, union-only B&B completion, arithmetic). Citation checks:
`slrecon/thorne-survey.pdf` pp. 1–2 and `slrecon/agp.pdf` pp. 703–704 read
as rendered page images; `slrecon/mr.html`; Crossref 10.2307/2118576;
Wiley 10.1112/S0024610799007863.
