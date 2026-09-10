# The offset signature is still exactly the CRT null one decade up: 2,979,349 twin openers at the square anchors q in [10^4, 3.16*10^4] read chi2/df 0.31..1.11 inside envelopes written first, the matched control reads clean, and one registered clause is found biased before it was ever reached

<!-- ledger
id: Q-records-placement
status: ANSWERED
todo: Z6 (retired)
question: Do the seven unswept twin-gap records 76-82, above 2^53, land uniformly inside their stretches, or is there square-anchor coupling in record-start placement?
verdict: HOLD, as preregistered: every per-prime conditional-null chi2/df over r = 7..23 lands inside its own 99.73% envelope (0.31..1.11 against 2.03..3.17) on 2,979,349 twin openers at heights 1e8..1e9, the matched non-square-anchor control lands inside its own at every r, and the calibration gate reproduces stretch-01.js SEC C2's decade below digit-exact; no offset structure beyond the QR redistribution is detected, and the registered sub-band clause is disclosed as biased and unreached.
-->

*(2026-08-28. Staging note; nothing here is integrated into a live document.
HELD. Producer, formally embedded: `research/records-placement-02.js` (4.9 s;
code-sha256 `d8f512bf...`, out-sha256 `938232d2...`, 63 body lines;
`node research/qc/embed.js --check` passes bit-honest, one READINGS advisory
cleared).
Executes the remaining half of TODO item Z6 — `stretch-01.md` §5's second
probe, same cost class, left deliberately unrun there and named again as
unrun in `records-placement-01.md` §4. Conventions are `stretch-01.md` §0's:
a pair is named by its opener a, it lies in S_Q iff Q^2 <= a and a+2 < Q'^2,
and the offset is t = a - Q^2. Calibration marked per claim: PROVEN,
VERIFIED by exact computation, MEASURED, OPEN, REFUTED.)*

**THE GUARDRAIL, FIRST.** `stretch-01.md` §4 PROVES that summing the QR kill
incidence over the r offset classes gives exactly 2(r-1), the generic
ensemble mean 2/r: the square anchor's structure REDISTRIBUTES kills over
offsets and removes none. Route B (a density advantage at the anchor) is
CLOSED (`REFUTED.md`). Nothing below argues from density. The redistribution
is this test's NULL, not its finding — a measurement that merely recovers it
confirms the guardrail and buys nothing.

## 1. PREREGISTRATION — written 2026-08-28 16:52 CEST (2026-08-28T14:52Z), before `research/records-placement-02.js` existed and before any number in this range was computed

**The seal is UNSEALED and cannot be otherwise.** No git command may be run
in this session, so no commit can timestamp this block ahead of the producer.
The only custody here is the order of writing inside one session and this
paragraph saying so. It is WEAKER than the earlier probes in this family,
which were sealed by commit: `records-placement-prereg.md` was committed
alone before its producer existed (`records-placement-01.md` §1 names the
seal `1bc0dd8`; the producer's own header names `11de808` — the two
disagree, and reconciling that is the earlier note's debt, not this one's,
since this session may edit no existing file). That sealed prereg still
carried a custody residual of its own (producer first in git 10m56s after
the seal, `records-placement-01.md` §2). Treat this block accordingly.

### 1a. The range, and what is being replicated

`stretch-01.js` SEC C2 measured the offset signature over stretches
q in [317, 9973] (heights 1e5..1e8, 439,644 twin openers) and read the
CONDITIONAL null at chi2/df 0.52..1.63 across r = 7..23. `stretch-01.md` §6
records that this is one decade with no sealed bands, and §5 names the
replication on q in [10^4, 3.16*10^4] (heights 1e8..1e9) as the second
cheapest probe. That is what runs here.

Anchors: every prime q with 10^4 <= q <= 3.16*10^4 (so q from 10007 to the
largest prime <= 31600), each with its own stretch S_q = [q^2, q'^2). The
top of the range is q'^2 for the last such q. Expected scale, from
`attack-z3-immune-01.md` §2's extension level over the overlapping band:
about 2,170 anchors and about 3.0 million twin openers.

**PRICE, computed before starting** (Chris's rule: under 4 h is simply run).
`attack-z3-immune-01.js` sieved this same window family to Q = 31607 and ran
its statistics AND a five-variant certificate engine in a measured 31.6 s
(`attack-z3-immune-01.md` §2). This producer does strictly less per window
(two histogram passes, no certificate engine) over about twice the swept
length (treatment windows plus an equal-width control family) and adds one
global sieve to 1e9. Price: 1-5 minutes, same cost class, decisively under
the 4 h line. It is therefore run without asking.

### 1b. The statistic, fixed here

Identical to `stretch-01.js` SEC C2. For each r in R = {7, 11, 13, 17, 19,
23} and each anchor Q with realised twin-opener count n_Q:

- F_r(Q) = {(-alpha) mod r, (-alpha-2) mod r} with alpha = (Q mod r)^2 mod r
  — the two forbidden offset classes (the QR kill law, `stretch-01.md`
  §4(i), PROVEN). The remaining r-2 classes are allowed.
- o_c = #{twin openers a in any S_Q : (a - Q^2) = c (mod r)}.
- e_c = sum over Q of n_Q * 1[c not in F_r(Q)] / (r - 2).
- **X^2_r = sum_c (o_c - e_c)^2 / e_c**, reported as **X^2_r/(r-1)**, the
  exact normalisation SEC C2 printed.

**THE CONDITIONAL NULL, as a generative model.** The realised anchors, the
realised widths and the realised per-anchor totals n_Q are FIXED at their
observed values; at each anchor the n_Q offsets are iid uniform on that
anchor's own r-2 allowed classes. Only offset PLACEMENT is random. Per-anchor
marginals are subtracted by construction — every anchor contributes expected
mass only to its own allowed set, never pooled raw (the 113%-artefact rule,
`attack-z3-immune-01.md` §1a).

### 1c. The bands, and why the nominal chi-square table is not one

There are no sealed bands from the earlier read to inherit: `stretch-01.md`
§6 states in terms that SEC C2 ran with "no sealed bands". The earlier sealed
prereg in this family (`records-placement-prereg.md`) set its bands
PER-RANGE, deriving each from the null's own sd at that range's n. The same
rule is applied here, so the envelope is derived from THIS range's realised
n_Q and allowed sets.

The nominal chi2_{r-1} table is registered as WRONG for this statistic and is
not the band. Under the conditional null the pooled count vector has
covariance Cov(o) = sum_Q n_Q [diag(p_Q) - p_Q p_Q^T], p_Q the anchor's own
allowed-class probability vector, so the Pearson form is a quadratic form
whose null mean is strictly below r-1 (each allowed class carries variance
e_c(1 - 1/(r-2)), not e_c). Registered envelope instead:

- Compute Cov(o) exactly from the realised n_Q and allowed sets.
- lambda = eigenvalues of D^{-1/2} Cov D^{-1/2}, D = diag(e), by cyclic
  Jacobi. Then X^2_r is distributed as sum_k lambda_k Z_k^2, Z_k iid N(0,1)
  (the multivariate CLT; per-class expected counts here are >= 1e5, so the
  normal approximation is not in question).
- **E_r(0.9973) = the 99.73rd percentile of (sum_k lambda_k Z_k^2)/(r-1)**
  over B = 200,000 draws, mulberry32 seeded 20260828, seed and B fixed here.
- The null mean sum_k lambda_k/(r-1) is printed alongside every reading. The
  nominal chi2_{r-1} 99.73% quantile / df is printed as a SECONDARY reference
  only, carrying no band, for continuity with SEC C2's normalisation.

**Three disjoint sub-bands.** The anchor list is split into three consecutive
equal-count thirds by index; the q boundaries are printed. For a prime r that
exceeds its envelope, let d = o - e over the full range and d^(j) the same
residual vector computed within sub-band j alone. **Sign consistency holds
iff the Pearson correlation of d^(j) with d over the r classes is > 0 for all
three j.** (A one-off fluctuation has no reason to reproduce its residual
SHAPE in each third; deterministic offset structure does.)

### 1d. The matched control, which must read inside its envelope

Reused verbatim from `attack-z3-immune-01.md` §1c, the design whose firing
voided that note's 6.5-sigma surplus. For each treatment anchor Q with width
w = Q'^2 - Q^2, the control window is [N, N + w) with N = Q^2 - w. Two
properties make it matched rather than merely adjacent: every composite below
Q^2 has least prime factor below Q, so the active set is the same {7..Q} and
finality holds identically (survivors are exactly the twin primes there); and
N is not a perfect square, so its kill classes are unconstrained by the QR
law. The window sits within w/Q^2 ~ 1e-4 of the treatment in height, so the
Hardy-Littlewood density is matched to four figures.

Forced deviation, carried over from `attack-z3-immune-01.md` §2's D1: N =
Q^2 - w is itself a perfect square at some anchors (there, Q = 113 gave
N = 97^2, a PRIME square carrying exactly the structure the control must not
have). The producer steps N down by 30 until it is not a square, keeping the
width, the active set and finality, and reports how many anchors needed it.

The control's forbidden classes are F_r(N) = {(-N) mod r, (-N-2) mod r},
generic, always two distinct classes since r > 2. Statistic, null, covariance
and envelope are the treatment's, recomputed from the control's own realised
n and allowed sets. Offsets are t = a - N.

### 1e. KILL, VOID, HOLD

- **KILL** iff (i) some r in R has X^2_r/(r-1) > E_r(0.9973), AND (ii) at
  that r the sign consistency of §1c holds across all three sub-bands, AND
  (iii) every control X^2/df lies inside its own 99.73% envelope.
- **VOID** iff any control X^2/df lies outside its own 99.73% envelope. The
  note then reports an instrument defect and no treatment verdict, per
  `attack-z3-immune-01.md` §1c.
- **HOLD** in every other case — including a lone prime over its envelope
  whose residual shape does not reproduce across the thirds.

**MULTIPLICITY, registered before the fact.** Six primes are each tested at
99.73%, so the family-wise false-positive rate under the null is about 1.6%,
not 0.27%. A single flagging prime is therefore a flag and not a detection;
the sub-band clause is what carries the weight, and this sentence exists so
that reading cannot be discovered afterwards.

**Descriptive, no flag, reported either way:** total openers N per r; the
worst single class deviation vs the conditional null in per cent (SEC C2's
own descriptive figure); the MARGINAL-null chi2/df (SEC C2 printed it and it
is dominated by anchor-sampling variance, so it carries no band here); the
observed and null share vectors at r = 7.

### 1f. Calibration gate — abort before any new figure prints

1. Re-run the identical statistic on q in [317, 9973] and reproduce
   `stretch-01.js` SEC C2's embedded OUTPUT block digit-exact: N = 439,644
   openers, 0 twin openers in forbidden classes, conditional chi2/df at
   r = 7, 11, 13, 17, 19, 23, and the r = 7 observed share vector. **The
   targets are EXTRACTED FROM `research/stretch-01.js`'s embedded OUTPUT AT
   RUNTIME, never transcribed** — the two-document wrong constant is the QC
   framework's named biggest unguarded class, and it already fired once in
   this exact probe family (`records-placement-01.md` §3).
2. The QR kill law re-verified by direct divisibility over the first r
   offsets of every treatment window, and the immune-class lists and the
   guardrail sum 2(r-1) reproduced at r = 7..23.
3. Structural asserts: q^2 <= a and a+2 < q'^2 at every counted opener; every
   opener in a mod-30 twin channel; N not a perfect square at every control
   anchor; control and treatment widths equal anchor by anchor; no position
   or index >= 2^31 (max height 31627^2 = 1.0003e9 < 2^31 = 2.147e9, bit
   index <= 5.0e8, both audited at runtime).

Any failure aborts before a single new-range figure is printed.

### 1g. What a KILL would mean, at its rung, and what it would not

A KILL is MEASURED offset structure at square anchors beyond the
redistribution the guardrail theorem forces — that is its whole content.

- It is **NOT a density advantage.** The guardrail (total kill incidence
  2(r-1) exactly) is PROVEN, and Route B is CLOSED (`REFUTED.md`). A
  non-uniform placement WITHIN the allowed classes cannot move the count.
- It carries **no all-Q occupancy statement.** "Every stretch is occupied"
  is the Stretch Postulate, unproven; occupancy is certified from adopted
  data only to 9.0e15 (`stretch-01.md` §3). A finite-range placement
  measurement implies nothing about all Q.
- **No Z_2 bound, no TPC content**, and no first-moment claim. rho(2) is
  ADVERSE at u = 2.
- A HOLD extends the square-blindness measurement of the offset signature by
  one decade, 1e8..1e9, and nothing more.

Results are HELD for the end-of-day adversarial roundup.

### 1h. ADDENDUM, written 2026-08-28 17:00 CEST — after §1a–§1g, after the producer was written, and BEFORE it was run for the first time

One property of the inherited control design was noticed while coding it and
is recorded here rather than discovered afterwards. The control window
[Q² − w, Q²) sits immediately below the anchor, and the previous stretch is
[Q_prev², Q²) with a width of the same order, so **the control's openers
overlap the previous anchor's TREATMENT openers heavily** — often they are
largely the same twin primes, re-offset against a non-square origin. The
control is therefore not an independent second sample. That is what
`attack-z3-immune-01.md` §1c built and what it means by "the treatment
stripped of QR-ness and nothing else": it is a same-data, origin-swapped
control, and its power is against instrument defects (a bias in the pooling,
the null, the envelope or the code path), not against sampling accidents.
It is registered here at that strength and no higher, and the registered
reading of §1d and §1e is unchanged. The treatment and control opener SETS
are still disjoint by construction (a control opener has a + 2 < Q², a
treatment opener has a ≥ Q²), which the producer asserts.

---

## 2. The run, its price, and its three disclosed deviations

Producer `research/records-placement-02.js`, formally embedded
(`node research/qc/embed.js`, then `--check`: code-sha256 `d8f512bf…`,
out-sha256 `938232d2…`, 63 body lines, **4.9 s**, one static input hashed,
`research/stretch-01.js@2d3cf9f2e077`, `--check` bit-honest). Zero assertion
failures.

**Price against the estimate.** §1a priced this at 1-5 minutes from
`attack-z3-immune-01.js`'s measured 31.6 s over the same window family. It
ran in **4.9 s** — the estimate was high by roughly an order of magnitude,
because the price was scaled from a producer whose cost is dominated by a
certificate engine this one does not have. The direction of the miss is the
safe one and no launch decision turned on it, but the scaling rule "price
from the neighbouring producer's elapsed" is confirmed only as an upper
bound here, not as an estimate.

**Level.** 2,170 anchors, q = 10007..31583 (the primes in [10⁴, 3.16·10⁴]),
top height q′² = 998,623,201 < 2³¹ as audited. 2,979,349 treatment twin
openers; 2,978,489 control twin openers. Sub-bands, equal anchor counts:
A q = 10007..16931, B q = 16937..24071, C q = 24077..31583.

**Calibration gate [VERIFIED].** The identical statistic on q ∈ [317, 9973]
reproduces `stretch-01.js` SEC C2's embedded OUTPUT **digit-exact**: 439,644
openers, 0 in forbidden classes, conditional χ²/df 0.86, 0.52, 0.93, 0.91,
0.64, 1.63, marginal χ²/df 21.85, 5.89, 7.57, 3.19, 5.34, 3.32, every worst
class and its percentage, and both r = 7 share vectors. Targets extracted
from that file at runtime. The QR kill law re-verifies by direct
divisibility over the first r offsets of every window at every anchor of
both ranges; the immune class lists and the guardrail sum 2(r−1) reproduce
at r = 7..23; the sieve itself is cross-checked against an independently
built base table and π(10⁶) = 78,498.

**Deviation D1, an extraction defect the gate caught [process].** The first
draft's regex for `stretch-01.js`'s r = 7 share vectors matched the
producer's own SOURCE line (a template literal) instead of its embedded
OUTPUT comment, so the gate compared the run against `${obs.join(',')}` and
failed. It failed loudly, before any new-range figure printed, and the fix
anchors both regexes on the comment. Worth recording because it is the same
class the QC framework names as the biggest unguarded one, caught by the
same gate that caught it in `records-placement-01.md` §3.

**Deviation D2, forced, and it did not fire.** §1d's step-down of a square
control origin (`attack-z3-immune-01.md`'s D1) was implemented and asserted
at every anchor. **0 of 2,170 anchors needed it**; the assertion that N is
not a perfect square holds everywhere as written.

**Deviation D3, post hoc, disclosed, and it changes no verdict.** Two
diagnostics were added to the producer AFTER its first run and are marked
POST HOC in the output: the leave-one-out form of §1c's sub-band correlation
(§3 says why), and the null's 0.27% LOWER reference, which the registered
one-sided band does not carry. Neither enters KILL / VOID / HOLD. The first
run's verdict and every registered figure are unchanged by their addition;
the re-run is the embedded one.

## 3. The reading [MEASURED, scored against §1e]

**HOLD, on §1e as written.** Clause (i) never fires: every treatment χ²/df
is inside its own conditional-null 99.73% envelope, so clauses (ii) and
(iii) are not reached. The matched control is inside its own envelope at
every r, so nothing is VOID.

| r | treatment χ²/df | null mean | 99.73% envelope | control χ²/df | control envelope |
|---|---|---|---|---|---|
| 7 | 0.31 | 0.933 | 3.168 | 0.45 | 3.132 |
| 11 | 0.54 | 0.978 | 2.632 | 0.75 | 2.657 |
| 13 | 0.44 | 0.985 | 2.475 | 0.73 | 2.468 |
| 17 | 1.11 | 0.992 | 2.245 | 0.67 | 2.245 |
| 19 | 0.60 | 0.993 | 2.159 | 0.50 | 2.165 |
| 23 | 0.54 | 0.996 | 2.034 | 1.11 | 2.033 |

Worst single class against the conditional null: 0.23%, 0.33%, 0.24%,
0.73%, 0.37%, 0.40% (treatment). Certification in offset coordinates holds
on the new range too: **0 twin openers in forbidden classes**, at 2,979,349
openers.

**What this is.** The square anchor's offset signature is still exactly the
CRT null one decade up. `stretch-01.md` §4(ii) read that over 439,644
openers at heights 1e5..1e8 with no sealed bands; this reads it over
2,979,349 openers at 1e8..1e9, a factor 6.8 more openers, with the bands
written first and a matched control that did not exist there.

**What this is NOT.** Not a density statement: the guardrail (total kill
incidence exactly 2(r−1), recomputed here at every r) is PROVEN, Route B is
CLOSED, and placement within the allowed classes cannot move a count. Not an
occupancy statement about all q: that is the Stretch Postulate, unproven,
with occupancy certified from adopted data only to 9.0e15. No Z₂ bound, no
TPC content, no first-moment claim; ρ(2) is ADVERSE at u = 2.

**A registered clause was biased, and it is disclosed rather than quietly
dropped.** §1c's sub-band consistency clause correlates each third's
residual vector with the FULL residual vector, of which that third is a
summand, so it is biased toward +1 by construction. The run shows the bias
directly: every treatment correlation lands positive, 0.15 to 0.85, while
nothing flags. The clause was never reached, because clause (i) did not
fire, so no verdict here depends on it — but had a prime flagged, the clause
would have passed on arithmetic rather than on evidence. The unbiased
leave-one-out form corr(d⁽ʲ⁾, d − d⁽ʲ⁾) is reported instead and reads
mixed-sign in both families, treatment −0.51 to +0.46 and control −0.34 to
+0.52: no residual shape reproduces across the thirds in either. **Any
replication of this probe should register the leave-one-out form.**

**The readings run low in both families, and that is not an anchor effect
[MEASURED, descriptive].** Five of six treatment values and five of six
control values sit below their null mean of 0.933..0.996. The effect is
common to treatment and control, which is precisely the separation the
matched control exists to make, and every value is above the null's 0.27%
lower reference (0.083, 0.180, 0.220, 0.289, 0.308, 0.360), so nothing is
detected on that side either. Recorded as an observation about the
conditional null's dispersion at this range, not as a finding. A plausible
mechanism, UNTESTED: the conditional null treats the offsets as iid uniform
over the allowed classes, while the realised openers in one window are also
constrained by the other actives, which can only remove variance.

**The marginal null, descriptive, no band.** χ²/df 101.47, 29.51, 8.13,
20.55, 6.42, 2.33 at r = 7..23, against 21.85..3.32 on the decade below.
This is anchor-sampling variance, which the marginal null does not price and
which grows with openers per anchor; `stretch-01.md` §4(ii) already reads it
that way, and it is why the conditional null is the statistic.

## 4. What did not move, and what is NOT REACHED

- **Z6 is now fully executed.** Both halves of TODO Z6 have run: the records
  76-82 placement probe (`records-placement-01.md`) and this replication.
  Neither found square-anchor coupling. Z6's remaining line is discharged;
  the item's other ids (`Q-redteam-0828-census`, `Q-applied-0828-census`)
  are not this note's business.
- **The wall is untouched.** `stretch-01.md` §5 is exact about it: the
  question is PLACEMENT of the tile's rare wide gaps at the quadratic point,
  no whole-tile gap bound can ever prove SP, and the density delta is
  adverse. A negative placement measurement over 2,170 anchors is consistent
  with the postulate and proves nothing about it.
- **Not run.** The decade q ~ 10⁵ (a further factor 100 in swept length; at
  4.9 s here that is minutes, not hours, and it would need the 2³¹ width
  audit redone). r = 29 and 31, outside the replicated set. Any statistic
  other than the offset histogram — nothing here says WHERE survivors sit
  inside a stretch beyond the offset-class marginals, which is
  `stretch-01.md` §6's standing gap, unchanged.
- **The control's power is bounded** (§1h): it overlaps the previous
  anchor's treatment openers by construction, so it certifies the
  instrument, not the sampling.
- **Custody is weaker here than in the first half of Z6.** That probe's
  prereg was committed alone before its producer existed. This one cannot
  be, and §1 says so at the top.

---

*Producer and custody: `research/records-placement-02.js`, embedded,
`--check` bit-honest, one static input hashed (`research/stretch-01.js`).
Recomputed rather than cited, deliberately, because they are this test's
calibration: `stretch-01.js` SEC C1's kill law, immune classes and guardrail,
and SEC C2's entire decade below. Cited, never recomputed, per the standing
compute rule: the 9.0e15 occupancy certification (`stretch-01.md` §3),
`attack-z3-immune-01.md` §2's 31.6 s used for pricing, and Route B's closure
(`REFUTED.md`). History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
