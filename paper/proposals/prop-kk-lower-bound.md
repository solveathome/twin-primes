# Proposal: a two-class Erdős–Rankin lower bound for G₂

**Grade: QUICK-DRAFT** · last regraded 2026-08-19 · registry: [PROPOSALS.md](PROPOSALS.md)

*The quick draft itself is a separate document, `draft-kk-lower-bound.md`,
beside this file. This proposal carries the grade, the evidence trail, the
prior-art position and the triggers. The draft carries the mathematics.*

## 1. Claim

There is an absolute y₀ such that for all y ≥ y₀,

> **G₂(P(y)) ≫ y (ln y)³ (lnlnln y)² / (lnln y)⁴**

with an absolute implied constant, equivalently
G₂(x#) ≫ x (ln x)³ (lnlnln x)²/(lnln x)⁴ in the x-frame. The construction is
Kalmynin and Konyagin's published Erdős–Rankin construction, PROVEN and in
print (Izv. Math. 88:2 (2024) 225–235, arXiv:2302.00459, MR4727548), used
here with the substitution Ω_p = {a_p, a_p − 2} and their §2 trichotomy
carried through line by line. The structural facts the substitution needs are
VERIFIED: |Ω^I_p| = 2 for p > 2, disjointness from p ≥ 5, Ω^II empty because
h_f = 0 so Case 2 quantifies over nothing, and |Ω^III_p| = 2 at every odd
prime over a sweep to 10⁶ with no exception. The Mertens ledger's O(1) is an
identified constant rather than a shrug, and the exponent assembly collapses
coefficient by coefficient: both VERIFIED, and reproduced digit for digit by
an independent adversary. Case 1's finite content was brute-forced and the
governing inequality 2m/y < z₀ is sufficient at finite scale, with zero
counterexamples where it holds. The deduction as a whole is complete, checked
twice here, and **not refereed**, so it carries INFERRED by this corpus's
legend and must never be stated without the derivation named. It consumes K–K's
Lemma 1 and Corollary 1 at κ = 4, Mertens with Rosser and Schoenfeld, the
standard smooth-number estimate and CRT, and it consumes none of their §3
apparatus.

Two logs above the free bound that G₂ ≥ g imports, one above the sketch this
supersedes in `research/two-class-lower-bounds.md` §4b. It does not touch the
Zone Postulate's margin, since x²/(x ln³x) still diverges.

## 2. Status grade

QUICK-DRAFT. Three things
earn it.

The theorem is a theorem, in the sense that every step is either a published
result with its source or an elementary carry-through written out rather than
gestured at. The record it rests on was **held at the door**: the claim was
written and deliberately kept out of every corpus document until an adversary
reported, which is the first time this project has done that. And the adversary
did its job, pulling the source PDF independently with a matching md5, reading
every load-bearing display from 200 dpi page images rather than extracted text,
and brute-forcing the Proposition's finite content, which is the move that
makes the verdict worth something. Verdict: stands with corrections, five of
them, all to presentation and none to the exponent. A second adversarial pass
the same day also returned stands, and forced a ledger repair.

What keeps it below submission-ready is the referee gap. Two hypotheses are
imported and were never reconstructed at source: Halberstam and Richert's
Theorem 2.2, and the Selberg remainder's ξ-versus-z condition, which the second
pass showed is where κ = 4 is load-bearing rather than merely tighter.

## 3. Evidence

| what | where |
|---|---|
| the claim in the live layer, with its calibration and its quoting rule | `research/two-class-lower-bounds.md` §4c |
| the frozen claim, nine sections, written as a proof | `research/history/staging/attack-kk-substitution.md` |
| the frozen adversary, first pass | `research/history/staging/verify-kk-substitution.md` |
| the first pass and its five corrections, dated | `research/history/CHANGELOG.md`, 2026-08-19 |
| the second adversarial pass and the ledger repair it forced | `research/history/CHANGELOG.md`, 2026-08-19 |
| the producer, nine sections A–I | `research/attack-kk-substitution.js` |
| the adversary's producer, seven sections V1–V7 | `research/verify-kk-substitution.js` |
| the PDF of record, with its md5 and byte count | `research/history/staging/lit-pdf-kalmynin-konyagin.md` |
| the blocker this discharged | `research/covering-dive.md` |
| the K–K row in the novelty audit | `research/PRIOR-ART.md` |

Both producers carry embedded OUTPUT blocks written by `research/qc/embed.js`,
so every figure below the banner is bound to the code above it by a
`code-sha256`. Numbers are not restated here. The two staging records carry
them with their sections, and the y₀ table, the Mertens residuals, the exponent
collapse and the brute-force counts all live there.

Three custody residuals travel with this claim and a drafter has to know them.
The frozen `attack-kk-substitution.md` §5 still carries a z₀ figure at y = 4001
with no run behind it, corrected in the adversary's report and in the live
layer but left standing in the staging file by the doc convention. The true
value is three orders smaller and the conclusion is unaffected, since z₀ already
exceeds y there. The two documents use opposite conventions for p₀, each
matching its own producer, and that has not been reconciled. And the frozen
adversary still reads "necessary and sufficient" where the live layer now reads
only "sufficient". A draft quotes the live layer, not the frozen one.

## 4. Prior-art risk

**The construction is not ours and the record says so first.**
`research/SEARCH-CONVENTIONS.md` §1 carries the row that separates the two
objects: the polynomial analogue j_f is a shift of the value rather than of the
argument, and it belongs to Kalmynin and Konyagin at arXiv:2302.00459. §3 of the
same file carries the settled row: the multi-class Erdős–Rankin claim is theirs,
not ours. What is claimed here is the two-class instantiation and the
carry-through, nothing more.

Searched, in the owning convention. The object's owning convention is
A144311's wording, per `research/SEARCH-CONVENTIONS.md` §1, and the probes were
run there with same-session calibration on known positives. A144311's
record carries no formula and no reference lines, where the one-class A048670
carries five and one. Nobody has cited Kalmynin and Konyagin: forward and
reverse citation counts on all three DOIs come back zero on OpenAlex, and the
Semantic Scholar citations endpoint returns nothing, twice, against calibration
positives that return 46, 48 and 5. A topical sweep for a two-class lower bound
returns nothing of the kind, the nearest being a Ziller and Morack paper on a
different question.

**What has not been searched, or failed on the day.** The arXiv API returned
zero bytes on its own known-positive calibration in that session, so no negative
is quoted from it; `research/SEARCH-CONVENTIONS.md` §5 records the fix, which is
that the endpoint is https-only. Semantic Scholar's record endpoint answered 429
throughout, so no citation count is quoted for K–K. MathSciNet's free index
covers bibliographic fields only, with no review text, no abstracts and no
subject classification, which is the standing residual for every negative run
there. And `research/two-class-lower-bounds.md` §2 flags an adjacent question,
the Jacobsthal-type function for admissible k-tuples at k ≥ 3, as not found and
uncalibrated: that is the reach of the search rather than an absence.

The standing assumption in this registry is that prior art exists for more of
the corpus than has been found, and that the burden is on us to look again.

## 5. Upgrade and downgrade triggers

**Upgrade to submission-ready** when both imported hypotheses are checked at
source: Halberstam and Richert's Theorem 2.2 as printed, and the ξ-versus-z
condition of the Selberg remainder, with the sifting parameter named. Those are
the two steps neither checker reconstructed, and the second pass showed the
second one is where κ = 4 does real work rather than decorative work.

**Upgrade to submission-ready** on an outside read: one number theorist who
knows the Erdős–Rankin literature confirming the substitution is legitimate
would do more for the grade than any further computation here, because no
computation in this repository can reach the construction.

**Downgrade to WEAKENED** if the optimised band choice is carried out and
recovers one or two factors of lnln x. The bound then improves and this
statement stops being the right headline, so the proposal gets rewritten around
the sharper exponent rather than kept as it stands.

**Downgrade to WEAKENED** if Halberstam and Richert Theorem 2.2, read at the
1974 page, is printed in a form other than the Brun-type bound under the
pointwise remainder hypothesis; as of 2026-09-07 the source's Lemma 1 is that
Brun form (Richert's own cross-reference), the Selberg-support pricing at
κ = 4 concerns a theorem K–K do not cite, and the manuscript's §6.2 is a remark.

**Downgrade to HELD** if an owning-convention search returns a published
two-class lower bound of this shape, or if anyone cites K–K with this
instantiation. The zero-citation finding is the cleanest negative in the file
and it is also the one most likely to expire.

**Retire** if the trichotomy is found to leak, which the brute force was
designed to detect and did not: a covering-form against sieve-form double-use
would have surfaced as a counterexample where 2m/y < z₀ holds, and there were
none across three parameter families.

## 6. What a referee would attack

- **The Selberg support, checked in the wrong place, then found not consumed.**
  K–K's Lemma 1 concludes with no remainder term because it is the Brun-form
  bound (pointwise `|r_d| ≤ g(d)`, `z ≪ X`); the support reduction happens
  inside the proof of the theorem it cites. The earlier "repair" priced a
  Selberg-form remainder the source does not carry (2026-09-07 re-read,
  `research/history/reviews-0907/04` to `06`). What a referee reconstructing
  Lemma 1 starts at is the unread 1974 page, shared with Theorem A.
- **Not refereed, and nothing finite can exhibit it.** y₀ is an all-constants-
  set-to-one floor rather than a value, band 2 is empty at every level the
  repository can compute, and the only empirical support is the brute force of
  the Proposition rather than of the construction. A referee is entitled to
  call the theorem unfalsifiable by anything in the repository, because it is.
- **The bound is a floor on the method, and the method is lossy.** K–K's own
  Theorem 1 at f(x) = x lands one lnln y below the FGKT bound they quote in
  their own introduction, measured here to every digit. So the stated exponent
  is what this method gives without effort, not what it gives. A referee asks
  why the optimised band choice was not done, and the honest answer is that it
  was not attempted.
