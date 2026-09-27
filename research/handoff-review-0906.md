# Independent handoff review: findings, completed scope and limits

<!-- ledger
id: Q-handoff-review-0906
status: ANSWERED
todo: C
parity: Independent review and elementary corrections only. The grouped moment uses classical completion with arbitrary bounded coefficients; no new Mobius cancellation, regional estimate or twin lower bound is claimed. Fixed-margin limitations and failures of particular estimates are not universal impossibility claims.
question: Does the handed-back arithmetic campaign survive an independent check of its main regional estimate and the conclusions used to choose the next research direction?
verdict: The bounded handoff audit is completed in reports 20 and 21: the checked local reduction and regional mechanisms survive, named source statements were verified, and the consumer, corner support, rate, shrinking-margin and identity-piece overclaims were corrected. Joint Cauchy is now priced and adds no region. The multiplicative band transfer has a separate PARTIAL owner with a weaker continuous-scale payoff. Imported deep theorems remain imports; this is not corpus-wide certification or a twin margin.
-->

**Twin-prime infinitude and every sufficient margin remain OPEN.** The
independent report is
[20-independent-handoff-review.md](history/reviews-0906/20-independent-handoff-review.md),
against commit `9be041f`. It contains the derivations, defect locations,
source check, scope limits and next-step assessment. The report was
written separately before integrating its unambiguous corrections into
the live notes, as requested by the review brief.

## 1. What survives and what changes

| finding | current conclusion | global consequence |
|---|---|---|
| grouped moment and checked coverage mechanisms | no defect found in scope; fixed-margin benchmark budgets 41/50,199/200,16/25 retained | no controlled region is withdrawn or added by this review |
| F1: cumulative consumer | equivalent to the dyadic consumer on unbounded scales at the same fixed K, with possibly different positive constants | the claimed strict weakening is withdrawn; cumulative lower bounds still suffice |
| F2: full corner | exact C(n)C'(n-2) sum; the nonnegative Möbius-product weight covers only s=s'=1, with n-dependent cofactor cuts | a bound on the subfamily needs additional error estimates before it controls the full corner |
| F3: shrinking margin | fixed-margin estimates retain x^epsilon losses; eta~loglog x/log x is not justified | the logarithmic-width corner is geometry only, pending uniform loss bounds |
| F4: signed-moment Lemma A | u1=u2,h1=h2 only; unequal proportional R=0 pairs remain outside it | no claim that all equal frequencies have been controlled; Lemma B adds no region |
| F5: proper prime powers | tail sum over p^j>W,j>=2 is O(W^(-1/2)) by a two-range argument | negligible errors are retained with a corrected proof |

F1 and F5 have complete elementary replacement arguments in the report.
F2 is a mismatch with the owning exact identity. F3 identifies an
unproved uniformity step, not a refutation of every possible shrinking
window estimate. F4 repairs scope and supplies the missing integral/Abel
step for the small paired factor. None supplies the open signed margin.

## 2. Completed local preparation and explicit limits

[Report 21](history/reviews-0906/21-readiness-review.md) discharges the
bounded follow-up from report 20. It checks the full local Möbius BV,
polylog transfer and second-Vaughan application against named source
statements; corrects diagonal lower-bound and Holder quantifiers, window support, unsigned mass constants and rate
quantifiers; reviews the Heath-Brown identity-piece claims; and prices
joint Cauchy in (m,h). That arrangement adds no region.

The new [multiplicative band transfer](prime-band-transfer.md) is written
with the Fourier representation, uniform source hypotheses, Tonelli step
and moving-window mesh completed locally. It gives a small log saving
in a continuous scale average for the prime-cofactor subfamily only.
It is not o(x), a dyadic pointwise bound or a full-corner estimate.

**Limits:** imported analytic theorems are consumed as stated, not
reproved from first principles. No sharp uniform shrinking-window
estimate, signed full-corner control, global margin, effective onset or
universal impossibility theorem is certified. Earlier abstract-only
literature comparisons must not be used as exhaustive closures.

**Subsequent round:** the bounded review, implementation and source
lookup are completed and assessed in [round-review-0906.md](round-review-0906.md).
It retains the lift, derives a weaker dyadic scale-average saving and
corrects the remaining coefficient obligations and diagnostic labels.
[AGENT-START.md](AGENT-START.md) gives the current research specification.
Do not reassign this completed checklist as unspecified unfinished work.

## 3. Verification

The existing prime-detection, grouped-divisor and corner-correlation
validators were re-run successfully. Their finite identity checks do
not prove an asymptotic saving; the corner validator uses finite proxy
windows and reports one previously documented inactive sign control.
The control deleting all but s=s'=1 is active in its tested cases.

The strict QC gate, QC self-tests and number audit passed on the review
baseline and again during the documentation integration. QUESTIONS and
SCRIPTS were regenerated; the strict gate reported no findings, and the
number audit passed all its checks. These mechanical results do not
certify the analytic arguments. No numeric output has been hand-pasted
and no simulation was used as a proof.

The completed readiness pass also ran the new finite ingredient validator,
prime-detection and shifted-prime validators, Heath-Brown and signed-moment
validators, strict QC with index regeneration, QC self-tests and the full
number audit. All passed. The log-average diagnostic was re-embedded after
correcting its interpretation labels; its numerical figures reproduce.
`git diff --check` passed. These are finite/documentation checks, not an
independent proof of the imported theorem or of the new analytic transfer.
