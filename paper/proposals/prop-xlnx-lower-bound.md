# Proposal: G₂(x#) ≫ x ln x from published ingredients only

**Grade: QUICK-DRAFT** · regraded 2026-08-28; header synchronized 2026-09-06 · registry: [PROPOSALS.md](PROPOSALS.md)

*This proposal carries the grade, the evidence trail, the prior-art position
and the triggers. The mathematics lives in
`research/history/staging/import-hypergraph.md` §4, held at the door for one
adversarial pass and confirmed by it
(`research/history/staging/redteam-0820-math.md` §3.3–3.4).*

## 1. Claim

There is an effective c > 0 such that

> **G₂(x#) ≥ (c + o(1)) · x ln x.**

Four steps, every one a published theorem consumed as a theorem or an
elementary carry-through written out. Kalmynin and Konyagin's Corollary 1
(Izv. Math. 88:2 (2024) 225–235), instantiated at Ω₂ = {0}, Ω_p = {0, −2}
with κ = 2, counts the stage-1 twin-slot survivors of [1, y] at z = √y;
Mertens' third theorem turns the product into (C₂ + o(1))/ln²z; the prime
number theorem supplies enough primes in (√y, x] to injectively assign one
covering prime per survivor at y = c₀·x ln x; and the CRT identity of
`research/two-class-lower-bounds.md` §1 converts the full cover into a
twin-slot-free run of y consecutive residues, hence G₂(x#) ≥ y − O(1). All
constants effective. PROVEN by this corpus's legend at every step except the
composition, which is INFERRED (ours, written out in full, adversary-checked,
not refereed).

Placement, exact: ABOVE the free FGKMT transfer
G₂(x#) ≫ x ln x · lll x/ll x by a factor ll x/lll x → ∞, and BELOW the
corpus's unrefereed K–K reading x ln³x·(lll x)²/(ll x)⁴ by ≈ ln²x. The trade is
provenance for strength: this chain consumes published theorems as theorems,
where the §4c reading re-derives the inside of a published proof.

## 2. Status grade

QUICK-DRAFT. The draft trigger was met as recorded below; the composition
remains unrefereed. The following evidence supports that grade.

The chain is the strongest provenance grade in the registry's lower-bound
family: unlike `prop-kk-lower-bound.md`, which re-runs K–K's §2 trichotomy
line by line, this chain never opens a published proof — K–K Corollary 1 is
consumed at its statement, read verbatim at page images twice by this corpus
and a third time by the dedicated adversarial pass, which fetched the PDF
fresh with a matching md5.

It was held at the door: the claim was written on 2026-08-20 and flagged HELD
in its own record, entering no live document until a dedicated adversary
reported. That adversary confirmed it end to end: every ingredient verified
at its source page image, the composition re-derived step by step, every
hypothesis of K–K's Lemma 1/Corollary 1 discharged explicitly, and the finite
echo — a replay-clean cover of [1, 200000] at x′ = 10861, ratio
y/(x′ ln x′) = 1.98 — independently rebuilt from the prereg text alone and
replayed clean (`redteam-0820-math.md` §3.4). The adversary's judgment is on
record: the grade does not hang on the N3 label question, because the chain
never uses N3.

The pre-registration custody is provable, not merely declared: the prereg was
committed alone at 469aaa3 before any producer or report existed — the first
row-13-wave prereg with that property.

What moved it from PROPOSAL to QUICK-DRAFT (2026-08-28): the paper case is written. `paper/kk-lower-bound.md` §§3, 9 and 10 state this bound and the §4c reading side by side with their grades, which is exactly what the first upgrade trigger asked for. The refereeing rider is unchanged: the composition is ours and not refereed, and the provenance trade it exhibits is the point of the note.

## 3. Evidence

| what | where |
|---|---|
| the theorem, four steps written as a proof | `research/history/staging/import-hypergraph.md` §4 |
| the adversarial confirmation, ingredient by ingredient | `research/history/staging/redteam-0820-math.md` §3.3 |
| the finite cover, independently rebuilt and replayed | `research/history/staging/redteam-0820-math.md` §3.4 |
| the prereg, committed alone (custody provable) | `research/history/staging/import-hypergraph-prereg.md`, commit 469aaa3 |
| the producer, formal embed | `research/import-hypergraph-01-instance.js` |
| K–K Corollary 1, quoted verbatim at source | `research/covering-dive.md` §4.2 |
| the CRT identity the chain closes with | `research/two-class-lower-bounds.md` §1 |
| the live-layer statement, all three lower bounds with grades | `research/G2-STATE.md` §3a |

The record's own scoring residue travels with the claim: the prereg's N3
99.9th-percentile prediction failed at toy scale (0.1496 against the
registered 0.02, mechanism identified — short pairs pick up the small
covering primes) and the prereg words both N3 figures identically, so the
record's asymmetric threshold/prediction split is a reading its text does not
distinguish. Neither touches the chain: Branch A uses K–K + Mertens + PNT +
CRT with N5 as its finite echo, and the adversary re-derived the true
all-pairs codegree bound analytically.

## 4. Prior-art risk

The ingredients are all published and owned by their authors; what is claimed
is the two-class composition and its provenance grade, nothing more. The
corpus's own §4b had sketched this accounting at INFERRED
(`research/two-class-lower-bounds.md`); what is new is the proof grade, the
explicit chain of custody, and the finite end-to-end echo. The K–K
zero-citation finding of `prop-kk-lower-bound.md` §4 covers this chain's main
ingredient too, and expires the same way. The owning-convention position is
inherited from that proposal: A144311 carries no formula and no reference
lines, and no published two-class lower bound of any shape was found in the
owning convention (`research/SEARCH-CONVENTIONS.md` §1/§3). The standing
assumption of this registry — that prior art exists for more of the corpus
than has been found — applies with less force here than anywhere else in the
registry, because the claim is mostly made of other people's theorems and
says so first.

## 5. Upgrade and downgrade triggers

**Upgrade to QUICK-DRAFT** when the paper case is written: a short note whose
point is the provenance trade (published-ingredient chain vs. proof-reading),
stating both this bound and the §4c reading with their grades. The
mathematics is finished; the case is not.

**Upgrade to QUICK-DRAFT** on an outside read, as for
`prop-kk-lower-bound.md`: one number theorist confirming the K–K
instantiation is legitimate moves this grade more than any computation here.

**Downgrade to WEAKENED** if K–K Corollary 1's Lemma 1 hypotheses are found
to exclude the κ = 2 instantiation on a re-read — the adversary discharged
them explicitly (g multiplicative, g(p) ≤ κ, g(p) < p for all primes,
z ≪ X), so this trigger is priced low, but it is the only import the chain
cannot survive losing.

**Retire** if the §4c reading is refereed or published first at its stronger
exponent, since this chain's only advantage is provenance and a refereed
x ln³x-type bound makes an x ln x note pointless.

## 6. What a referee would attack

- **"Two logs weaker than your own §4c claim — why publish the weaker one?"**
  The honest answer is the grade: §4c re-derives the inside of a published
  proof and is not refereed; this chain consumes statements only. A referee
  who accepts that framing accepts the paper; one who does not has no reason
  to want it.
- **The composition is ours and unrefereed.** Every step is elementary once
  the ingredients are granted, and the adversarial pass re-derived it end to
  end, but no referee has seen it. The Mertens and PNT steps are textbook;
  the exposure is the instantiation step's hypothesis list, which §3's
  discharge table answers.
- **The finite echo proves nothing asymptotic.** True and conceded in the
  record: N5 is an end-to-end correctness check of the construction at one
  scale (ratio 1.98 against the claimed ≫ 1), not evidence for the limit.
