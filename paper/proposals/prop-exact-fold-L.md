# Proposal: per-fold L is a word statistic, exactly

**Grade: PROPOSAL** · last regraded 2026-08-20 (downgrade trigger scored against Marcus–Roth–Siegel, §5; grade held) · registry: [PROPOSALS.md](PROPOSALS.md)

*Everything below is staging-layer. None of the four results has been carried
into a live document, and the changelog ledger is currently ahead of the body:
`research/kappa-not-L.md` still carries the unsharpened form of Theorem A and
`research/U-FRAME.md` §5a still carries maxsum subadditivity as measured. A
draft starts by closing that gap.*

## 1. Claim

Per-fold L, the length of the longest kill run when tile T_x is folded by the
next prime p', is a statistic of the old gap word alone, read modulo p', and it
is exact rather than bounded. The compatibility lemma under it is PROVEN in a
line and VERIFIED at 1160 cells over p' = 5 to 67 with no mismatch: two adjacent
slots at gap g die together at the same alignment exactly when g ≡ 0, −2 or +2
mod p', with the sign fixed by which of the two kill channels each slot uses.
The walk that results is a two-state automaton, so the non-zero classes strictly
alternate, and the longest alternation-legal window of the cyclic gap word
equals L with no slack, because the alignment is recoverable from the first slot
of the run and W mod p' is invertible, so every legal window is realised by a
real copy. That equality is PROVEN as argued and VERIFIED at 36 cells for tiles
with x ≤ 19 and at the nine diagonal folds 7, 11, 13, 17, 19, 23, 29, 31 and 37.
The qualification lemma is PROVEN and exact and already live: the qualifying
gaps are three arithmetic progressions of modulus 6p with weights 1, 1 and 2,
and the smallest is exactly 2p ∓ 2 with the sign set by p mod 6, VERIFIED at all
302 primes from 5 to 1999. Theorem A is sharpened from an approximation to an
equality, with c_min(j) given in closed form on both residue classes, VERIFIED
at 11 primes from 7 to 43 for j ≤ 6. The mechanism behind that equality is the
min-plus one: c_min = 3p is the minimum cycle mean of a two-by-two min-plus
matrix, its critical circuit is the two-cycle of weight 6p, and its eigenvector
is explicit, VERIFIED at all 23 primes from 5 to 97 by Karp's algorithm and by
the eigenvector equation. The record words at every fold with L ≥ 2 are exact
critical circuits rather than approximate eigenvectors, VERIFIED at 6 of 6.

What that buys is a sharpness statement rather than a bound. The constant 3/2
in the corpus's L work is a min-plus Perron root, so no re-derivation of the
same automaton can move it. The only routes past 3p are to change the arithmetic
weights or to add states.

## 2. Status grade

PROPOSAL. The mathematics is in better shape than the grade suggests and the
grade is held down by four things, each concrete.

The equality lemma has never been through the live layer, the gate, or a second
reader. It is derived in a staging record and labelled there as new to the
corpus, which is exactly the position that has produced same-day corrections
before. The ninth diagonal cell was **not blind**: `research/a3-10-lower-tightness.js`
already held L(T₃₁, 37) = 4 on disk, and the record discloses this. What is new
at fold 37 is the route, not the answer. The c_min(j) identity is VERIFIED and
not PROVEN past j = 6 and p = 43, so an eigen-identity checked to six terms is a
conjecture with a good name until someone writes the induction. And the
arithmetic content of the sharpening was already in `research/a3-05-bound-L.md`
§4's Corollary A1, whose sign was corrected on 2026-08-18, one day before the
import. What the import adds is the mechanism and a second verification route.

There is also a structural objection the corpus raises against itself, and it
belongs in the grade rather than in a footnote. The exact instruments have
infinitely-often value exactly zero, and they are precisely the instruments that
transport nothing. Because the best proven ceiling equals true L at every cell,
the u-frame chain run on the ceiling is identical to the chain run on true L,
which is already known to fail at fold 31. Exactness and usefulness are in
tension here, and a paper has to say so in its introduction.

## 3. Evidence

| what | where |
|---|---|
| the compatibility lemma, the census, the forced ceiling | `research/history/staging/attack-foldL-01-census.md` |
| the bridge, the corrected 2p ∓ 2 form, the eight-cell table | `research/history/staging/attack-foldL-02-bridge.md` |
| the ninth diagonal cell and its prior-art disclosure | `research/history/staging/frontier37.md` |
| the min-plus reading, the sharpening, the semiring mapping | `research/history/staging/import-maxplus.md` |
| the qualification lemma and the Alternation Lemma, live and PROVEN | `research/kappa-not-L.md` |
| Theorem A, Corollary A1 and Theorem B | `research/a3-05-bound-L.md` §4, §5 |
| the census producer | `research/attack-foldL-01-census.js` |
| the bridge producer | `research/attack-foldL-02-bridge.js` |
| the word statistic at fold 37 | `research/attack-frontier37-01-word.js` |
| the min-plus and max-plus mapping | `research/import-maxplus-01-mapping.js` |
| the subadditivity survey and the custody on the estimator | `research/import-maxplus-02-subadditivity.js` |
| the prior source of L(T₃₁, 37), which is why the ninth cell was not blind | `research/a3-10-lower-tightness.js` |

Every producer above carries an embedded OUTPUT block, and the frontier pair
re-checks only with its own invocation arguments and node flag, which the record
states because without them the checker runs calibration alone and reports a
difference that is not there.

Two implementation traps travel with this claim and a drafter has to state both.
A kill run must be scanned on the big tile of period W·p, because a cyclic scan
of one copy reports L = 2 at fold 11 where the truth is 1, and this record
made that mistake first and caught it against the gate. And the feasible set used by the
forced ceiling is not downward closed, so a bisecting implementation is simply
wrong: at T₁₃ folded by 17 the k = 2 test fails while k = 3 passes.

## 4. Prior-art risk

**What is already attributed.** `research/PRIOR-ART.md` records the largest
prior-art finding this corpus has made: Holt and Rudd own the cycle of gaps, the
fold recursion, the fusions, the closure theorem and the histogram transfer
matrix with its binomial eigenvectors, from 2014. The corpus demoted its own A9
in consequence and instructs that nothing there be presented as new structure.
The order-m object has an owning convention too, per
`research/SEARCH-CONVENTIONS.md` §1: Costello and Watts, Math. Comp. 84 (2015)
1389–1399, index it as π_min(m,k) one class down, and the related closed form of
arXiv:1209.3464 is withdrawn.

**The gap, stated plainly.** `research/SEARCH-CONVENTIONS.md` §1 carries no row
for tropical, max-plus, min-plus or minimum-cycle-mean objects, §3 carries no
search against them, and `research/PRIOR-ART.md` names none of that literature
anywhere. The whole max-plus picture is staging-local. So three questions have
no answer in this corpus and must not be written as if they did: whether the
alternation automaton is a known min-plus critical-circuit problem, whether the
longest-alternation-legal-window statistic is in print, and whether the equality
between it and L is a known lemma in the cycle-of-gaps literature. The standard
theory is cited in the record without any novelty claim attached, which is the
right posture: Baccelli, Cohen, Olsder and Quadrat's ch. 3 for the
Perron-Frobenius apparatus, Karp, Discrete Math. 23 (1978) 309–311 for the
minimum cycle mean, and Cuninghame-Green's Minimax Algebra for the semiring
itself.

**The load-bearing bridge is INFERRED.** The statement that Holt's operator and
the fold operator are one operator in two semirings is a deduction from the
shape of two constructions, with no source making the identification and no
commuting diagram written down.

Writing the missing convention row is the first job of any draft, and it comes
before any sentence about what is new.

The standing assumption in this registry is that prior art exists for more of
the corpus than has been found, and that the burden is on us to look again.

**Sharpened 2026-08-19, officer pass.** Holt owns more than the registry filed
this morning: arXiv:2502.20470v3 §3 Lemma 2 (p. 5) *is* the compatibility
lemma in one class ("the fusions at γ_i and γ_j occur in the same image of s
iff p divides the span"), and arXiv:2605.19165v1 §3 (p. 11) states the
extinction threshold |s|/2. What his fifteen prime-gaps papers do not carry is
the run: his coincidence count (J+1) − ν_p(s) is blind to adjacency in the
word, so LR, LP, LV, LVP and the 6p pair floor stand
(`research/history/staging/proposals-prior-art.md`).

## 5. Upgrade and downgrade triggers

**Upgrade to QUICK-DRAFT** if the equality survives at fold 41 as a blind
prediction: compute L(T₃₇, 41) by the word route with the answer pre-registered,
then by direct enumeration. The ninth cell was not blind and the tenth can be.
The cost is priced in the record at roughly two and a half hours plus five and a
half.

**Upgrade to QUICK-DRAFT** if c_min(j) is proven for all j rather than verified
to six, since the eigen-identity is the only part of the package that reads as a
theorem and it currently reads as a table.

**Upgrade** if a min-plus row is written into `research/SEARCH-CONVENTIONS.md`
§1, searched, and returns nothing that owns the alternation automaton.

**Downgrade to WEAKENED** if L(T₃₇, 41) disagrees between the two routes, which
would put the equality back to a verified pattern on a short diagonal.

**Downgrade to WEAKENED** if the owning-convention search returns the word
statistic, or the alternation automaton read as a critical-circuit problem, in
print. That is the most likely single outcome and the registry expects it.

**Scored 2026-08-20 against Marcus–Roth–Siegel: PARTIALLY fired, and by the
trigger's own words it does NOT fire.** What is now in print is the automaton's
**language family**: the alternation constraint — non-zero marks strictly
alternating in sign — is the **B = 1 charge constraint**, equivalently
**alternate-mark-inversion**, at Marcus–Roth–Siegel **§2.3 p. 47**, with the
capacity in their **§3.2 p. 75** table, so the constraint graph's strict
soficity and its capacity ln 2 are REPRODUCTIONS and are tagged as such in
`research/kappa-not-L.md` and `research/U-FRAME.md` §10
(`research/IMPORT-MAP.md` row 2, `research/history/staging/import-sofic.md`).
That answers the first of §4's three open questions and it does so against us.

But this trigger names two objects and neither is what turned up. It fires on
**the word statistic** in print — the longest alternation-legal window of the old
gap word — or on **the alternation automaton read as a critical-circuit
problem**. MRS print the language, not the statistic taken over it, and nothing
in their treatment is min-plus or a minimum cycle mean; §4's min-plus convention
row is still unwritten and still unsearched. The per-fold **L equality itself**,
which is this proposal's actual claim, is untouched by the finding. Grade stays
**PROPOSAL**, with the novelty surface narrowed: a draft may not present the
automaton or its capacity as new, only the equality, the 3/p → 2/p rate
correction, the weight-(1,1,2) multiplicity and the wall address. The remaining
downgrade risk is unchanged and still the most likely single outcome.

**Downgrade to HELD** if the live-layer integration is refused, since a claim
the body will not carry is not a claim a paper should carry either.

## 6. What a referee would attack

- **The sharpening is mostly already yours, and the min-plus reading renames a
  two-state dynamic program.** Corollary A1 in `research/a3-05-bound-L.md` §4
  already prints the same arithmetic, corrected the day before the import
  arrived. What is new is the label, the mechanism and a verification route, and
  the identity itself is checked to j = 6 and p = 43 and proven nowhere.
- **The exactness is a nine-point diagonal, and one of the nine was already on
  disk.** The equality lemma has not been through the gate, the forced ceiling
  under it is a presence relaxation rather than a multiset-exact bound,
  multiplicity is checked as presence only, and the whole wave sits at κ(1) = L
  while the corpus's own frame says κ is the better coordinate. The equality is
  verified precisely where it matters least.
- **Everything sharpened here is the thing that transports nothing.** Because
  the ceiling already equals true L, no improvement to an L bound can move the
  chain, and the min-plus reading's positive content is a proof that the route
  cannot be improved. A referee will ask what the package buys, and the honest
  answer inside the records is a corrected constant and a relocated wall.
