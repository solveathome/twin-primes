# Completed review specification: the arithmetic reduction of the twin sum

> Public mirror edition: repository-internal working instructions were removed. See MIRROR.md.

<!-- ledger
id: Q-review-request-0906
status: ANSWERED
todo: C
parity: Review specification only. No arithmetic is asserted here; the claims to be reviewed carry their own parity lines in their owning notes.
question: Which claims of the arithmetic campaign should an independent reviewer check, in what order, against which records, and what must the review return?
verdict: Completed review specification at the bounded scope recorded in handoff-review-0906.md and reports 20 and 21, with the subsequent round reviewed in round-review-0906.md. The dependency list records questions at dispatch, not current unfinished assignments. Imported proofs retain their review limits and the twin margin remains OPEN. Current assignments are in RESEARCH-EXECUTION.md.
-->

**This review round is completed at its recorded scope.** Its checklist is
retained so readers can assess what was requested and what was actually
checked. Current review assignments belong to
[RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md), lane V. The next open
review specification is [review-request-0907.md](review-request-0907.md),
covering the 2026-09-07 measurement and source-reading session.

[handoff-review-0906.md](handoff-review-0906.md) and reports 20–21 record
the bounded review and readiness pass. [round-review-0906.md](round-review-0906.md)
records the subsequent scale and coefficient corrections. Read these
dispositions before treating any item below as still unchecked.

## 1. What to read, in order

1. [TWIN-REDUCTION.md](TWIN-REDUCTION.md): the whole campaign in one
   document, with the review state of each claim in its §9.
2. [chain-review-0906.md](chain-review-0906.md): what the three review
   passes on the reduction chain checked and did not check.
3. The owning notes, in the order the claims depend on each other:
   [prime-detection-spec.md](prime-detection-spec.md),
   [polylog-fold-transfer.md](polylog-fold-transfer.md),
   [shifted-prime-decomposition.md](shifted-prime-decomposition.md),
   [signed-divisor-grouping.md](signed-divisor-grouping.md),
   [endpoint-fourier.md](endpoint-fourier.md),
   [endpoint-pairing.md](endpoint-pairing.md),
   [prime-power-dispersion.md](prime-power-dispersion.md),
   [residual-coverage.md](residual-coverage.md),
   [grouped-divisor-moment.md](grouped-divisor-moment.md),
   [reachability-coverage.md](reachability-coverage.md),
   [corner-correlation.md](corner-correlation.md).
4. The review reports themselves, preserved verbatim in
   [history/reviews-0906/](history/reviews-0906/README.md), only after
   forming your own view of a step.

The outcome register [OUTCOMES.md](OUTCOMES.md) records each result with
its limits under its question; [QUESTIONS.md](QUESTIONS.md) is the
generated index of every question attacked.

## 2. The claims, ranked by leverage

A defect in a higher row invalidates every lower row that depends on it.

| rank | claim | calibration | owning record | consequence of a defect |
|---|---|---|---|---|
| 1 | S(x) = C_2 x + E_dagger(x) + O_H(x/log^H x) for every fixed H, with E_dagger the exact CRT endpoint sum on W_dagger | derived; three passes, no defect | chain-review-0906.md; the notes in §1 item 3 | every downstream statement changes |
| 2 | the endpoint remainder has the block shape sum_m A_left(gm) Y(m) with separate left and right coefficients and an h-only harmonic weight | derived; reconstructed exactly in review 06 | residual-coverage.md, endpoint-fourier.md §2, signed-divisor-grouping.md (15)-(18) | every dispersion budget changes |
| 3 | the grouped moment bound (2)-(3) for arbitrary bounded coefficients, and the budgets (1+a)/2, a/2+3b/2, a | derived; review 01 | grouped-divisor-moment.md §§1-4 | the controlled region and the ceiling change |
| 4 | at a prescribed fixed exponent margin S_0 fails that margin for every nonzero-kernel saving; uniform gamma=2 covers its complement | derived; reviews 06 and 19 | reachability-coverage.md | the direction of the campaign changes |
| 5 | on S_0 the remainder equals the full C(n)C'(n-2) residual up to O_H; only s=s'=1 is sum_n mu(n)mu(n-2)L(n)L'(n-2) plus O(x^(19/20+eps)) | derived; review 11 with repairs applied | corner-correlation.md §§1-2 | the parity classification changes |
| 6 | the one-sided corner bound implies and is implied by the sufficient margin, given the complement | derived logic; review 11 and consumer-comparison flags | corner-correlation.md §2.2; consumer-comparison.md §4 | the claim that the one-sided form is the conclusion changes |
| 7 | the Mobius Bombieri-Vinogradov input follows from Koukoulopoulos Cor. 13.4, Thms 26.2, 26.6, eq. (26.3) with Vaughan's identity for mu | derived from published theorems; review 15 | mobius-bv-derivation.md | one classical contribution loses its citation |
| 8 | the priced negatives: Bettin-Chandee Theorem 1 at 129/125, Corollary 1 adds zero area, Type I/II decomposition reaches 41/40, Cauchy-in-h lemma 3/2 at the corner, Heath-Brown edge relocates | derived; reviews 15 and partial | small-divisor-kernel.md, determinant-corollary.md, left-divisor-signs.md, signed-moment.md, heath-brown-edges.md | a route recorded as failed might be open |
| 9 | the log-averaged Chowla transfer fails at the named steps | derived, one pass | corner-log-average.md | a route recorded as failed might be open |
| 10 | the measurements | measured, pre-registered falsifiers | kernel-sign-control.md, corner-measurement.md | heuristic reading only |

## 3. Dependency checklist at dispatch

These were the outstanding checks when this brief was dispatched.
Their current dispositions are in the review records linked above and
TWIN-REDUCTION section 9. This list is not the current research queue.
Each entry names its point of use; numbering is retained for citations.

1. **The right-orientation rewrite of the prime-power and first-branch
   moments** (residual-coverage §3). Asserted from sign-agnostic
   ingredients, never written out. It sets the 19/25 product edge through
   the right zero budget J_R. Reviews 06 and 19 both flag it.
2. **The unweighted-cofactor reading of the moment's phase**
   (heath-brown-edges.md §3): that e(hz'/(gmu)) is the CRT count with both
   cofactors summed unweighted, so a = 1 minus the largest free-variable
   exponent for any identity. One reader. If the shape tolerated a
   cofactor weight, the Heath-Brown conclusion collapses and the corner
   under that identity would need only gamma >= 2/3.
3. **Lemmas A and B of signed-moment.md and its heuristic ceiling.** One
   pass. The ceiling's rigorous half lacks a lower bound on
   sum |G(u,h)|^2.
4. **The Perron separation with four intersecting cuts**
   (grouped-divisor-moment §5, residual-coverage §4): the error is
   asserted from the two-cut remark; the box-by-box order of operations is
   forced but unwritten.
5. **endpoint-pairing.md §5 (9)**, the divisor-count bound on the full
   positive Vaaler majorant: hypotheses and side conditions checked, the
   derivation of (9) itself not read by any reviewer.
6. **prime-dispersion.md (11)**, the completion with periods removed:
   cited inputs confirmed verbatim (Pascadi Lemmas 3.2-3.3), the full text
   not read line by line.
7. **signed-divisor-grouping.md §2**, the uniform excluded-prime Mobius
   mean: checked once (review 02), consumed by every later note.
8. **polylog-fold-transfer.md §§1-3 and §5**: only §4 was reviewed.
9. **corner-log-average.md**: Pilatte's rate constant c <= 0.003832 is
   derived there from his §2.3 chain, unreviewed; and the eta_0
   dependence of the band-swap cost was not measured against varying
   eta_0.
10. **corner-correlation.md**: status PARTIAL because three literature
    imports (Pilatte's c, Frantzikinakis-Host, Klurman-Mangerel) were
    checked at abstract level only; the classification itself is
    complete.
11. **consumer-comparison.md**: the interval transfer from Murty-Vatwani's
    conclusion on [1,x] to our dyadic consumer is derived there at medium
    confidence; the Siegel-zero implication at K=0 at medium-high. The
    two citing sources for Heath-Brown 1983 disagree on the upper range
    exponent (q^300 versus q^500); the original was not reachable.
12. **Koukoulopoulos GSM 203 numbering** read from the author's
    preliminary version by two readers, not from the printed book.
    Iwaniec-Kowalski §17.2 and Opera de Cribro §§9, 16, 18 were not
    reachable; either may state the Mobius Bombieri-Vinogradov case
    directly.
13. **Validator coverage gaps**, not defects: grouped-divisor-validation.js
    and prime-power-dispersion-validation.js test their harmonic averages
    on the half-open band [A,2A) while the notes use the closed band; both
    inequalities were re-run on the closed band and hold.
14. **Baier-Zhao Lemma 2.2** (Vaaler majorant) as a published statement:
    numbering and page not verified; the inequality was verified
    numerically and re-derived from the Fejer form.

## 4. Known limits of the internal reviews

- Agreement among reviews does not establish independence of their
  arguments. A new reviewer should reconstruct the decisive steps in
  rows 1 to 5 of section 2, rather than count prior approvals.
- The reviews re-derived decisive inequalities and confirmed theorem
  statements at primary sources; they did not check the proofs of the
  imported theorems (Bettin-Chandee Theorem 1 and Corollary 1, the
  Kloosterman bounds, Koukoulopoulos' theorems, Tao's log-averaged
  theorems).
- Finite validators check identities and rational bookkeeping. None
  proves an asymptotic rate; every measurement note says so.
- The judgement paragraphs (which route is more promising, whether the
  corner is "the parity wall") are labelled assessment and are not
  claims for review.

## 5. What the review must return

The completed round used the following return format:

1. One-line verdict per reviewed claim: DEFECT FOUND with file, equation
   and line, or NO DEFECT FOUND IN SCOPE.
2. A table of decisive steps, each CHECKED with the inequality reproduced,
   DEFECTIVE with the exact failure, or ASSUMED-UNVERIFIED.
3. Imported theorems with primary source, version, theorem number,
   hypotheses, and whether each hypothesis is met at the point of use.
4. What was not checked.
5. For any defect: which rows of §2 fall with it.

Reports from this round are retained in
[history/reviews-0906/](history/reviews-0906/README.md). New work uses the
question-based paths and integration rules in RESEARCH-EXECUTION.
One handler reconciles shared state after review. The integration gates are:

```sh
node research/qc.js --index --strict
node research/qc/selftest.js
node research/audit-numbers.js
```

These verify syntax, custody and finite numbers; they do not verify an
analytic argument.

## 6. What is not being asked

Not asked: to propose new estimates, to price further interfaces, to run
computations beyond what a finite identity check needs, or to judge
whether the programme should continue. Those are separate decisions. The
publication moratorium is in force; this review is internal.
