# Proposal: the Tail-Count Transport as a per-level evaluator

**Grade: PROPOSAL** · last regraded 2026-08-19 · registry: [PROPOSALS.md](PROPOSALS.md)

## 1. Claim

Fold tile T_x by the next prime q. The count of new windows with sum at least θ
satisfies

> N_new(θ) ≤ (q − 2)·N(θ) + 2·Σ_{L ≥ 1} Q_L(θ),

where N(θ) counts old gaps of size at least θ and Q_L(θ) counts old windows of
L+1 gaps with sum at least θ whose L−1 interior gaps admit a legal walk on a
2-set mod q. So G₂ of the new tile is at most the largest such window sum. The
inequality is PROVEN, and cheaply: the two multiplicity bounds it rests on,
ν_q(i,0) ≤ q−2 with equality exactly when q divides the gap, and ν_q(i,L) ≤ 2
for L ≥ 1, are one line each, and summing them gives the exact identity
Σ_L ν_q(i,L) = q−2, hence the census recursion D_new = D·(q−2). The operator is
an equality and the inequality is a term-by-term relaxation of it. No arithmetic
enters beyond the two bounds, and the copy boundary costs nothing because
gcd(W, q) = 1 makes the sum over alignments the sum over copies.

The evaluator is exact at eight consecutive folds, q = 11 through 37, VERIFIED
by two independent implementations. Three nested certificates, differing only in
how many of the conditions of ν_q(i,L) > 0 are kept, all return the true G₂ of
the new tile at seven of the eight folds, and fold 29 is the only place the loosest
form separates from the other two. The inequality itself holds at every
threshold with no violation, untruncated, at 88 thresholds at fold 37, and its
margin narrows monotonically, running 0.8881 to 0.9477 across folds 17 to 37 at
about 0.012 per step.

The exactness is structural rather than a tail fact, and the record says so: the
fullest certificate is the operator evaluated on its own support, so its
agreement with G₂ is near-tautological. What is MEASURED at eight folds and
PROVEN at none is that the intermediate, alternation-refined certificate also
equals G₂.

Underneath both sits one operator in two semirings. Over the counting semiring
it is Holt and Rudd's bidiagonal transfer matrix with binomial eigenvectors,
which is closed on the histogram and therefore an exact simulator with no
bounds. Over the max-plus semiring the same fold is cyclic duplication followed
by state elimination, VERIFIED gap for gap at 6 of 6 folds, so the copy theorem
is a semiring identity. There the Perron root is the mean gap and bounds are
available but closure is lost. Tropicalization buys the bound and loses the
closure. That identification is INFERRED from the shape of the two
constructions, not sourced to anyone making it.

## 2. Status grade

PROPOSAL, and the honest reason it is not higher is that the delta over the
corpus's own prior state is one relaxation step. `research/operator-and-pair-count.md`
already conceded in 2026-08-18 that the operator is an exact simulator rather
than a source of bounds. Reading it as an inequality is new here and it is one
move, tested on eight folds whose answers are published as OEIS A144311 anyway.

Three further things hold the grade down. The statement carried in the live
layer at `research/U-FRAME.md` §11 uses the refined Q_L, the legal walk on a
2-set, while the record that proves the inequality proves it for the loose form;
the refinement is argued in one sentence as a valid relaxation and never written
out. The adversarial re-derivation that checked all of this ran from code in a
session scratchpad rather than from the repository, so that leg does not
reproduce here. And chaining the transport on the tile is CLOSED and sits in
`research/OUTCOMES.md`: the (q−2) growth factor forbids it, and the same alignment
sum that forbids it is what makes the per-level evaluator exact. A paper has to
lead with that, because it is the shape of the result.

## 3. Evidence

| what | where |
|---|---|
| the live-layer statement, with the exactness range and the margin trend | `research/U-FRAME.md` §11 |
| the origin record, the proof, the no-chain argument | `research/history/staging/attack-foldL-03-transport.md` |
| the adversarial re-derivation and its three corrections | `research/history/staging/verify-tailcount-transport.md` |
| the eighth fold, the three certificates, the untruncated check | `research/history/staging/frontier37.md` |
| the two-semiring reading and the fold as state elimination | `research/history/staging/import-maxplus.md` |
| the operator's own honest limit and the prior-art demotion | `research/operator-and-pair-count.md` |
| chaining, closed, one line with its record | `research/OUTCOMES.md` |
| the producer, folds 11 to 29 | `research/attack-foldL-03-transport.js` |
| the producer at fold 37, untruncated, three certificates | `research/attack-frontier37-02-transport.js` |
| the operator definition the proof was re-derived from | `research/a3-09-histogram-operator.js` |
| the semiring mapping | `research/import-maxplus-01-mapping.js` |
| the ladder the certificate is checked against | `research/exact-g2-ladder.js` |

Numbers are not restated here beyond the two the claim turns on. The certificate
table, the per-fold margins, the census ladder and the fold-37 by-products live
in `research/history/staging/frontier37.md` with their producers named.

## 4. Prior-art risk

**The operator is Holt and Rudd's and the corpus says so in its own voice.**
`research/PRIOR-ART.md` carries the correspondence: our tile is his cycle of
gaps, our fold is his R1/R2/R3, our kills are his fusions, our Copying and
Redundancy Lemma is his Theorem 2.3, and the histogram transfer operator with
its binomial eigenvectors is his 1408.6002 §5, pp. 17–19, from 2014. The corpus
demoted its own A9 in consequence, and both `research/U-FRAME.md` §11 and
`research/operator-and-pair-count.md` carry the instruction that nothing there
be presented as new structure. `research/U-FRAME.md` §11 also carries a
correction worth repeating, because it is the sort of thing a referee checks
first: an earlier citation read as a pointer into their paper, at a section
number their paper never had, and the section was ours all along.

**The boundary the audit draws.** His corpus contains no upper bound on any
maximum gap and does not study twin-slot spacing, and his machinery is bounded
throughout. The tail-count reading of his operator is therefore not something he
states, and neither is the max-plus twin.

**What was not searched.** The origin record is careful about this and its
wording should survive into any draft: the absence of another script running the
operator as an inequality is an internal absence, not a literature one, and no
claim of literature novelty is made. `research/SEARCH-CONVENTIONS.md` §1 now carries the row for the transfer
operator and the tail-count transport (written 2026-08-19 — by the same
commit, `23f39da`, that left this sentence in place), and the search in it
returned Holt–Rudd's (q − 2) driving-term transport WITHOUT the inequality
reading. No row exists for the semiring mapping; that one is still
unsearched. The standard tropical references are cited in the record
without a novelty claim attached.

There is a precedent in this corpus for exactly the failure this guards against:
a complexity exponent from a sibling import is flagged not to be called new
until its owning convention is searched. The same flag applies here.

The standing assumption in this registry is that prior art exists for more of
the corpus than has been found, and that the burden is on us to look again.

**Sharpened 2026-08-19, officer pass.** Holt–Rudd 1408.6002 §6.1, Corollary
6.3 (pp. 25–26) carries the (q − 2) driving-term transport with no span
hypothesis, so the corpus's old sentence that his machinery is bounded by
|s| < 2p₁ was false, and is now fixed in `research/PRIOR-ART.md`. What
survives as ours: the tail-count form, the inequality, the run term and the
certificate use (`research/history/staging/proposals-prior-art.md`).

## 5. Upgrade and downgrade triggers

**Precondition scored, 2026-08-20:** the downgrade trigger's precondition
(an owning-convention row written and searched) has FIRED — the row exists
and the search found the counting core owned without the inequality — and
the trigger itself does NOT fire: the inequality reading, the run term and
the certificate use were searched with it and not found. Grade holds.

**Upgrade to QUICK-DRAFT** if fold 41 keeps zero violations at every threshold
and the alternation-refined certificate again returns G₂ exactly. That is the
cheap check the record names, it is priced, and it is the ninth consecutive fold.

**Upgrade to QUICK-DRAFT** if the refined Q_L relaxation is written out as a
proof, closing the gap between what the live layer states and what the record
proves.

**Upgrade** if the alternation-refined certificate is proven equal to G₂ rather
than measured equal at eight folds. That is the result the package is missing
and it is the one a referee would call the theorem.

**Downgrade to WEAKENED** if fold 41 produces a violation, or if the refined
certificate separates from G₂ there. The margin trend rising toward 1 with no
mechanism attached is the reason to run the check rather than assume it.

**Downgrade to WEAKENED** if an owning-convention row is written for the
transfer operator and a search in it returns the inequality reading in print.

**Downgrade to HELD** if the adversarial leg cannot be reproduced from
repository code, since a verification that lives only in a vanished scratchpad
is not evidence a referee can be offered.

## 6. What a referee would attack

- **The exactness is a tautology dressed as a theorem.** The fullest certificate
  is G₂ by construction, so its agreement at eight folds is a code check, and
  the record's own pre-registration says as much. The instrument actually on
  offer is the looser one, whose exactness is measured at eight folds and proven
  at none, over a range where the answers are already published.
- **The stated inequality is not the proven inequality.** The live layer carries
  the refined interior condition, the origin record proves the loose one, and
  the bridge between them is a sentence. A referee will also notice that three
  claims in the origin record's own headline moved under a single adversarial
  pass, and that the adversary's code is not in the repository.
- **The duality is INFERRED and load-bearing.** No functor, no commuting
  diagram, and by the record's own measurement the spectral object and the
  target object differ: G₂ is the operator norm rather than an eigenvalue, and
  the tropical eigenvector's amplitude is several times G₂ and growing. A
  referee can fairly call it a suggestive restatement, and note that the one
  genuinely new half is the half labelled INFERRED.
