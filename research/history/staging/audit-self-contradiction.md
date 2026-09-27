# Audit: documents that contradict themselves (2026-08-18)

<!-- ledger
id: Q-self-contradiction
status: ANSWERED
todo: none
question: Which documents in the corpus contradict themselves?
verdict: Twenty findings, two rated HIGH because they change what somebody does: theta-ladder.md's retracted crossing still asserted unmarked in three further sections, and G2-STATE.md's confirmed G2(41#) = 546 against three sections still carrying twelve terms; eight more change a number somebody quotes.
-->

**Headline.** `research/theta-ladder.md` carries a 2026-08-18 correction box that
retracts the crossing in capitals — "**Nothing crosses**" — and three other
sections of the same file, including its up-front answer to its own title
question, still assert the retracted claim unmarked as the file's firmest result.

**Twenty findings.** Read only the first three if that is all there is time for.

- **1 and 2 would change what somebody does.** Both HIGH.
- **3, 9, 10, 11, 13, 14, 15, 16** would change a number somebody quotes.
- **4-8, 12, 17-20** are wording against printed data.

Findings 1-8 are `research/*.md` read by me; 9-12 are `paper/*.md` and 13-20 the
smaller `research/*.md`, both delegated and then re-verified by me line by line
with the arithmetic redone. Four further candidates are forwarded UNVERIFIED at
the end of the third wave and are not adjudicable as they stand.

The retracted θ column of finding 1 has also propagated, unmarked, into three
other files; that list is under finding 1.

---

## Calibration, first, because the brief requires it

All six named positives were **already fixed** in the working tree, so the
calibration had to run against the pre-fix text pulled from git
(`760a558`, `9d822f4`, `4636f31`, `2321e40` into a scratch dir). The method —
read the file end to end, flag any status word or superlative applied to one
object at two strengths, and read every pasted OUTPUT block against the prose
above it — rediscovers all six:

| case | pre-fix text found at | how it surfaced |
|---|---|---|
| G2-STATE §5a "Nobody in this repo had ever asked" | `760a558` :585-586 vs :749-750 "was already in this repo under the name PAIRED" | superlative/absence token |
| ATTACKS2 row 3 "HL-conditional" vs verdict "theorem-grade" | `760a558` :20 vs :31 | status token, two strengths |
| natal-cap-32 "±2e2 on μ4" vs its own 8.87e10 | `9d822f4` :55 vs the OUTPUT block | prose-vs-output |
| natal-cap-10 §1.4 "UNVERIFIED at that level of precision" | `760a558` :79 vs :89 "primary source, read from the PDF" | status token |
| a3-05 reading 9 printed verdict vs its own table | `2321e40` reading-9 block | prose-vs-output |
| natal-cap-21 Thm 2 "the first, and so far the only one" | `4636f31` :31 vs :141 "→ the first beyond-Chebyshev" | superlative |

Two of the six needed the OUTPUT block rather than the prose. That is why every
finding below quotes the artifact side.

---

## 1. `research/theta-ladder.md` — the retracted crossing survives in four places, three of them unmarked

**Severity: HIGH. Confidence: HIGH.**

The correction, at **lines 408-421**:

> **⚠ CORRECTION 2026-08-18: THE CROSSING DOES NOT HAPPEN, AND EVERY `need_true`
> IN THIS SECTION IS MEASURED AT THE WRONG WINDOW.**
> `research/theta-ladder-sup.js`:18 reads `const z=Number(process.argv[2]), u=3.2,
> s=3.0;` — **z comes from the caller and u never does.** [...] `need_true/z²` is
> **0.5485 / 0.4877 / 0.4637** at z = 19 / 23 / 29 against the 0.869 / 0.849 / 1.006
> printed below [...] The certificate is POSITIVE at every one of the
> 223,092,870 positions at H = 0.46 z². **Nothing crosses.** The prefix rows past
> z = 31 are lower bounds on an overstated quantity and therefore bound nothing
> for this question.

Reading 8 (**lines 683-690**) is correctly marked SUPERSEDED, and §5b item 3
(line 423) sits directly under the box, arguably covered by "the numbers below".
The following three are not.

**(a) §0, line 38-43 — the file's up-front answer, and it is *before* the box:**

> **The answer to the title question, up front: no, it does not turn over.** The
> conditional exponent [...] The unconditional one, which owes nothing to any
> maximal law, sat below 2 at z = 19 and z = 23, crossed 2 between z = 23 and
> z = 29, and exceeds the zone budget by at least half again at every z from 43
> to 71.

**(b) §5b closing statement, lines 466-470 — *after* the box, and it claims to be
unconditional:**

> **The statement this licenses, with nothing conditional in it:** the
> vector-sieve certificate's actual all-positions window exceeds the zone budget
> z^2 at every z from 29 to 71 that was tested, by a factor of at least 1.5 from
> z = 43 onward. It fitted inside the budget only at z = 19 and z = 23, the two
> smallest points available. That is the run's firmest result and it is the one
> that does not depend on the Gaussian maximal law at all.

**(c) §6 verdict item 1, lines 551-556:**

> 1. **theta turns over below 2: REFUTED over the measured range.** The exact,
>    unconditional column crossed 2 upward between z = 23 and z = 29 and has
>    risen at every point since, to at least 2.126 by z = 47.

**Which side the artifacts support: the correction box.** Verified at both ends,
outside the file:

- `research/theta-ladder-sup.js`:18 reads verbatim
  `const z=Number(process.argv[2]), u=3.2, s=3.0;` — `u` is hard-coded and taken
  from no caller, exactly as the box says.
- `research/history/staging/phase1-T4-maximal-law.md`:29-30 —
  "the unconditional requirement at z = 29 is `0.4637 z^2`, not the published
  `1.0060 z^2`"; :298 — "**The consequence is that the crossing does not
  happen.**"

**Why it matters.** §5b(b) is the sentence the rest of the repo quotes as the one
result free of the Gaussian maximal law, and §0 is what a reader takes away in
thirty seconds. Both now assert the opposite of the file's own correction.

**And it has already propagated to three other files.** Strictly this is the
`calibration` check's territory rather than this sweep's, but it is what makes
finding 1 the most severe thing here, so it is recorded:

- `research/G2-STATE.md`:659 ("**REFUTED**, θ crossed 2 upward between z = 23 and
  z = 29 and is rising"), :722 ("## 7. The theta ladder: it does not turn over"),
  and :741.
- `research/ZONE-POSTULATE.md`:233-238 — "*The all-positions exponent θ is above 2
  and rising, which went against us.* `research/theta-ladder.md` answers it by
  exact suprema over complete periods rather than by fitting: **1.9524, 1.9477,
  2.0018, 2.0476 at z = 19, 23, 29, 31**". Note the aggravating detail: this
  passage carries its *own* dated 2026-08-18 correction, of a different number in
  the same sentence (2.05 → 2.0495), so it was edited on the day of the
  retraction without the retraction being applied.
- `research/sift-limit-attack.md`:40-45 — "theta sits **above 2 and is rising**:
  the exact full-period suprema are 1.9524, 1.9477, 2.0018, 2.0476 at
  z = 19, 23, 29, 31".

Every one of those quotes the exact column that `theta-ladder.md`:419-420 says
"do not quote them", and every one presents it as the unconditional measurement.

---

## 2. `research/G2-STATE.md` — §5a says G2(41#) = 546 is confirmed; §2, §8 and §9 still carry twelve terms and list computing it as open work

**Severity: HIGH. Confidence: HIGH.**
**Volatility warning: this file is being edited by a running agent.** It grew
949 → 963 lines during this sweep. Line numbers and md5 below are as of
`md5 = b8a8130b8383755ea09e4b2b9370792a`.

**Line 635-639 (§5a):**

> **And the construction is EXACT wherever the truth is known.** The repaired
> search hits `G2(x#) − 1` at all thirteen exactly-known levels — 1, 5, 11, 29,
> 41, 65, 107, 149, 203, 257, 347, 527, 545 — so at x ≤ 41 it is not a lower bound
> but the value. Its 545 at x = 41 independently confirms G2(41#) = 546, which was
> computed the same day by direct enumeration over a disjoint method.

Against three other sites in the same file:

- **Line 101 (§2):** "All twelve exact terms." — over a twelve-row table
  (lines 108-121) that stops at x = 37.
- **Line 793 (§8):** "| G2 as a studied object, and the twelve exact terms |
  VERIFIED | not in OEIS at three offsets, and the last two terms (31#, 37#) were
  computed here |"
- **Lines 874-892 (§9, "Open questions, ranked"):**
  > **6. Compute G2(41#), the thirteenth term.**
  > [...] Its real value is as a falsifiable test of the Poisson law, which
  > predicts **476 to 633, central 513** [...] **Cost: about 6 hours by the
  > streaming leg** [...] At six hours this is a same-day falsifiable test of the
  > Poisson law rather than an overnight commitment.

**Which side the artifacts support: §5a.** The verified ladder in the phase-1
brief gives thirteen terms with 41:546 (r = 3,784,200,788,231, survivors =
D_41 = 8,499,244,879,125), and commit `2321e40` is titled "G2(41#) = 546: the
thirteenth term, and both cost estimates were wrong" — the run took 2 min 31 s
against the 5.6 h estimate that §9 still prints as "about 6 hours", itself a
correction of 37 h.

**Why it matters.** §9 is the repo's ranked plan-adjacent list. It currently
budgets six hours for a computation the same file reports finished, and prints a
prediction band for a value the same file already states. The §9 preamble
(line 829-831) commits to exactly the discipline being broken: "An item that
closes keeps its slot and is marked CLOSED."

**Two smaller instances in the same file, same cause:**

- **Line 126 vs line 130**, over the same twelve-row table that prints `h` and
  `h2` in every row:
  - :126 "- **G2 ≥ g(x#) = h(x#) (PROVEN, VERIFIED at ten shared terms).**"
  - :130 "- **G2 ≤ h2(x#) (VERIFIED at all twelve shared terms).**"
  The table has twelve rows with both columns populated, so "ten" is a count its
  own table refutes — a leftover from before 31# and 37# were added (:135, "The
  last two terms are ours").
- **Line 158** still gives "| lower bound, best constructed | 356,712 at x = 4001 |"
  while §5a's repaired ladder at **line 626** adds "| 5003 | **479,339** | 0.01915 |
  1.3206 | — (new rung) |" and **line 633** says "At x = 5003 the best construction
  reaches 1.9% of the zone".

---

## 3. `research/natal-cap-21-beyond-chebyshev.md` — "Chebyshev remains the best proven bound" at @13, forty lines above a bound 513× better

**Severity: MEDIUM-HIGH. Confidence: HIGH.**

**Lines 97-101:**

> Honest @13/@17 status: Chebyshev (9.74e−4 / 1.01e−4) remains the best
> proven bound; the Gaussian-shape reference (μ₄ ≈ 3Var², exact to 0.4% at
> @11) prices the quartic rung at ≈ 3Var²/μ⁴ ≈ 2.9e−6 / 3.1e−8 once T₄ is
> computed — a ~340× / ~3300× beat waiting on compute (@13) and on an
> identity (@17).

**Lines 141-152:**

> 1. **DONE, by `natal-cap-27-t4-at13.js`.** @13's T₄ was summed over all
>    39,782,707,965 quadruples in 15.4 minutes across eight workers, 23 checks
>    passed, giving **P(S=0) ≤ 1.898e−6 at @13**, a factor of 513 below
>    Chebyshev's 9.74e−4. [...] **So the corpus holds two beyond-Chebyshev
>    ensemble bounds, at @11 and @13.** Only the @17 rerun is outstanding.

**Which side the artifacts support: the Next-steps item**, verified outside the
file. `research/natal-cap-27-t4-at13.js` exists (24 KB, 2026-08-17) and its
header carries, at :352-353, "`optimal quadratic-square  = 1.90e-6   (e^-13.17)
BEATS Chebyshev x513`" and "`THEOREM (finite computation): P(S=0) <= 1.898e-6 at
@13`", restated at :372. `research/natal-cap-34-wrap-precision.js` exists as the
independent reproduction the paragraph cites ("to a relative 3.4e−16"), and
cap-27's quartic Markov leg returned 2.85e−6 against the 2.9e−6 the blocker
section itself predicts. The blocker section's
supporting sentences are stale in the same direction: **line 93-95**, "**But it
is only compute**: at the measured 2.4e8 prime-visits/s, @13's T₄ is ≈ 90 min
single-thread [...] @13 is REACHABLE offline", written in the future tense about
a run that is recorded as complete.

**Why it matters.** A reader who stops at the "Honest @13/@17 status" heading —
which is where you would stop, since it is labelled as the honest ledger — leaves
with a bound 513× weaker than the one the file holds. This one is invisible to
any token-level checker: the two passages share no named object.

---

## 4. `research/gate-multiplies.md` — "falls monotonically … at every fold" against its own pasted output

**Severity: LOW-MEDIUM. Confidence: HIGH.**

**Lines 158-159:**

> 1. **kappa(m) is strongly sublinear in m.** `kappa(m)/m` falls monotonically from
>    2 or 3 at m = 1 to 0.25 to 0.28 at m = 32, at every fold.

**Line 152, the file's own pasted OUTPUT block, fold T_23 by p = 29:**

> ```
>   kappa(m)/m      = 1:2.000  2:1.500  3:1.000  4:0.750  6:0.667  8:0.500  12:0.417  16:0.313  24:0.333  32:0.250
> ```

0.313 at m = 16 rises to 0.333 at m = 24. The other printed fold (T_19 by 23,
line 145) *is* monotone, so "at every fold" is the half that fails.

**Which side the artifacts support: the output block.** The conclusion — strongly
sublinear, ending at 0.25 to 0.28 — survives intact; only the word
"monotonically" and the quantifier "at every fold" do not. Propagated to
`research/U-FRAME.md`:335-336, "measures κ(m)/m falling monotonically from 2 or 3
at m = 1 to 0.25 to 0.28 at m = 32, at every fold."

---

## 5. `research/U-FRAME.md` §6a — "decays monotonically" over a list that rises

**Severity: LOW. Confidence: HIGH.**

**Lines 552-554:**

> The adversarial ratio a(n)/(lnW)^2 decays monotonically from n = 6: 1.411, 1.111,
> 0.997, 0.990, 0.882, 0.842, 0.806, 0.804, 0.758, 0.765, 0.704, 0.689, 0.674,
> 0.666, 0.649, 0.604.

0.758 → 0.765 is an increase. The claim and its refutation are in one sentence.

**Which side the artifacts support: the list** (it is Ziller and Morack's data,
reproduced in the same sentence). Worth fixing beyond pedantry because this repo
has three logged instances of a short-run trend broken by the next point —
`natal-cap-31-calm-vs-kill.md`:227-236 makes "two independent monotone claims in
this document break at the fourth level" its own lesson — and this one breaks
inside the printed run.

---

## 6. `research/U-FRAME.md` §5a step 3 — "strictly smaller at three folds" over two lists that differ at five

**Severity: LOW. Confidence: HIGH.**

**Lines 300-302:**

> it measures 3, 2, 2, 3, 2, 3, 3, 3, 4 at
> folds 7 to 37 against L + 1 = 3, 2, 3, 3, 3, 4, 3, 5, 5: never larger, strictly
> smaller at three folds, and at fold 31 it is 3 where L + 1 = 5.

Position by position: 3=3, 2=2, **2<3**, 3=3, **2<3**, **3<4**, 3=3, **3<5**,
**4<5**. Five strict inequalities, not three. ("never larger" holds; the L values
are the file's own, line 221.)

**Which side the artifacts support: the lists.** The undercount errs against the
file's own conclusion — "A proof aimed at L is therefore aiming past the target"
is stronger at five than at three.

---

## 7. `research/origin-excess.md` — "VERIFIED to four digits" where its own column agrees at one level of five and drifts away with depth

**Severity: MEDIUM. Confidence: HIGH on the arithmetic, MEDIUM on classification.**

**Lines 656-660 (§8, reason 3):**

> 3. **Shape, and this is the real answer.** origin/mean = ρ(u_x)/ρ(u_y) exactly.
>    S = x′² is u_x = 2, which is the minimum of ρ. So the zone's width is the one
>    width at which the origin is worst, and against the full ensemble the origin
>    carries e^{2γ}/4 = 0.79305 of the mean density. VERIFIED to four digits after
>    stripping the window's Hardy-Littlewood factor.

**Lines 418-419, reading its own OUTPUT block (lines 403-414):**

> Dividing it out leaves **0.7930, 0.7948, 0.7967, 0.7986, 0.7992** at the top
> five levels against e^{2γ}/4 = **0.79305**.

Deviations from 0.79305 across those five levels (x = 1487, 2111, 2999, 4253,
6037): 2e−5, 1.7e−3, 3.6e−3, 5.6e−3, 6.2e−3. Only the *shallowest* agrees to four
digits; the deepest agrees to two, and the agreement degrades **monotonically as
the measurement gets deeper** — the wrong direction for a convergence claim. §0
line 28-29 quotes only the single best-matching level: "Measured, after stripping
the finite-size Hardy-Littlewood factor: **0.79303 at x = 1487**."

**Which side the artifacts support: the column.** Note the file is not uniformly
wrong — its own boxed statement at line 425 hedges correctly, "**The origin
ceiling (MEASURED, HL-conditional in its exact value)**". §0 and §8 drop the
hedge and pick the best level. Classification is MEDIUM because a rising residual
under an imperfectly-measured HL factor is a defensible reading; what is not
defensible is "VERIFIED to four digits" stated flat.

---

## 8. `research/origin-excess.md` — "all fifteen readings" over a six-row block

**Severity: LOW. Confidence: MEDIUM.**

**Lines 436-437:** "and the shape on [1,2] against e^{2γ}/u², all fifteen
readings agreeing on one constant which is the window's HL factor:"

**Lines 440-447:** the block prints **six** rows (u = 1.30, 1.45, 1.60, 1.75,
1.90, 2.00), with no truncation marker; **line 449** then lists exactly six
ratios, "1.1028, 1.1224, 1.1276, 1.1295, 1.1308, 1.1319".

The file marks truncation when it truncates — line 350, "*(the full 127-row table
is in the run log; these are the rows that span the range)*" — so the absence of
a marker reads as completeness. "Fifteen" is most likely borrowed from the
fifteen *levels* of the §2 collapse table (line 167), which is a different
ensemble.

---

## Second wave: `paper/*.md`, delegated and then re-verified by me

A read-only sweep of the eight `paper/*.md` files (~3,500 lines, all read in
full) returned eight candidates. I re-verified the top five against the files
myself and redid every arithmetic step. Four survive, below, and they slot at
MEDIUM — between findings 3 and 7 of the main list. Three of the eight I do not
forward: `moire-primes.md`:42-44's "the band (2, 4.2665] between them", which is
the repo's own canonical framing of the open band and only reads oddly because
"them" is loose; and two count/sequencing items the sweep itself rated
medium-low and which I could not confirm cleanly.

### 9. `paper/staircase-note.md` — "K\*/scour falls", refuted by the list and the exponent in the same sentence, and again 140 lines later

**Severity: MEDIUM. Confidence: HIGH.**

**Lines 370-372:**

> **The K\* law, measured (added 2026-08-15).** The escalation continues
> 0, 0, 2, 10, 27, 69 at @11 through @29, and the shape of it is now readable.
> K\* is sub-linear in the scour: K\*/scour falls 0.0167, 0.0230, 0.0155,
> 0.0088 at @17 through @29, with pairwise growth exponents 1.25, 0.72, 0.62.

0.0167 → 0.0230 is a **rise**, and the first printed pairwise exponent, **1.25**,
is greater than 1, which is precisely "not sub-linear". The sentence carries its
claim, a list refuting it, and an exponent refuting it, in that order.

**Lines 512-513 (§10), the same claim restated as a result:**

> The growth question
> asked here has since been measured at two further levels and answered in
> the direction we did not expect: K\* grows strictly slower than the scour
> length, not linearly and not worse.

**Which side the artifacts support: the list.** I re-derived it independently.
K\* = 2, 10, 27, 69 comes from the §7 table (lines 354-359, K\* column). The
scour lengths are π(√W) − π(x) = 120, 435, 1739, 7863 at @17/@19/@23/@29, which
`research/FOLD-PROFILE.md`:502-509 tabulates independently. Then 2/120 =
**0.01667**, 10/435 = **0.02299**, 27/1739 = 0.01553, 69/7863 = 0.00878 — the
printed list exactly. So the numbers are right and both sentences about them are
wrong at the first step. What survives is "sub-linear from @19 onward"; "not
worse" does not.

### 10. `paper/anchored-note.md` — the anchored calm's mechanism at three strengths, the worst pair 18 lines apart

**Severity: MEDIUM. Confidence: HIGH.**

**Lines 181-183:**

> That is the profile
> of a mechanism, and not the profile of a lucky draw, which concentrates
> in a few primes (reading 5 there). Status: measured, with the mechanism
> since part-proven: the fusion identity and the exact −1/2 anticorrelation
> constant are theorems, and the remaining unproven steps are listed in §10

**Lines 198-200, eighteen lines later:**

> The ensemble's two arithmetically distinguished phases occupy the two
> opposite extreme tails, the loud one by proof, the calm one by measurement
> with its mechanism still open.

**Line 379-381 (§10), a third strength:**

> **The anchored calm, and which of its parts are theorems.** The suppression
> target of the calm campaign has advanced from a sighting to a proven mechanism
> with an unproven last step.

**Which side the artifacts support: "part-proven".** Both :182 and :380 name the
proven parts and point at `natal-cap-19-calm-lemma.md`,
`natal-cap-23-covadj-proof.md` and `natal-cap-26-minus-half.md`; :200's
"mechanism still open" is the stale end and is the one a reader skimming the
section summary takes away.

### 11. `paper/variance-note.md` — a stated lever arm that excludes five of the nine rows its own fits are run on

**Severity: MEDIUM. Confidence: MEDIUM-HIGH.**

**Lines 314-316:**

> **Calibration, stated plainly.** This is model comparison, not a measurement
> of a limit. Over the entire computable range $1/\ln\ln W$ moves only from
> $0.295$ to $0.343$, so the two forms are being separated on a short lever arm,

**Against the §7 table it calibrates, lines 280-289**, nine rows, x = 7 to 37.
I recomputed 1/ln ln W for every row:

```
 7  0.5965    11 0.4885    13 0.4286    17 0.3882    19 0.3600
23  0.3383    29 0.3208    31 0.3068    37 0.2951
```

The true span is **0.295 to 0.596**, and the fits are explicitly run on "the
first eight points" and then refit on "all nine points" (lines 293-307), so all
nine rows are in the lever arm. The stated band [0.295, 0.343] contains four of
them. Its upper endpoint, 0.343, matches **no row in the table** — I could not
reproduce it from any level, which is itself unexplained.

**Which side the artifacts support: the table.** The caveat understates its own
lever arm by roughly a factor of six, in the direction that makes the
model-comparison verdict look weaker than the data allows. Confidence is
MEDIUM-HIGH rather than HIGH only because the unsourced 0.343 leaves open that
the sentence means some narrower range it does not name.

### 12. `paper/staircase-note.md` — "the falling ratio of floor to truth" over a list that nearly doubles

**Severity: LOW. Confidence: HIGH.**

**Lines 483-485:**

> We should also record a reading of
> ours that was wrong: we took the falling ratio of floor to truth
> (0.76, 0.36, 0.026, 0.049, 0.0081, 0.0025) as a collapse of certificate
> efficiency with level. It is not.

0.026 → 0.049 nearly doubles. I checked all six against the §7 table
(lines 354-359, "certified twin pairs ≥" over "true survivors"): 34/45 = 0.756,
110/307 = 0.358, 82/3099 = **0.0265**, 1877/38380 = **0.0489**,
4841/597475 = 0.0081, 31327/12307838 = 0.0025 — the printed list exactly.

**Note the shape, because it is instructive.** The sentence *is* a marked
retraction, but it retracts the **inference** ("as a collapse of certificate
efficiency") and leaves the **description** ("the falling ratio") standing. A
correction that fixes the conclusion and not the misreading of the data
underneath it is a partial correction, and this corpus's convention does not
cover it.

### Noted, but a different kind of defect

`paper/PAPERS.md`:192-197 states the house rule — "All prose follows the math
edition of Chris's style guide [...] **no em dashes**" — and the file contains
six em dashes, four of them in its own section headings (lines 7, 13, 33, 53,
60, 75). `paper/writing-style-math.md`:129 makes the rule explicitly absolute:
"**Em dashes.** None. Body, titles, captions." That file is itself clean. This
is a genuine same-file self-contradiction but it is a style-compliance defect,
not a research claim at two strengths, so it is recorded here rather than ranked.

---

## Third wave: the 40 smaller `research/*.md`, delegated and then verified by me

A second read-only sweep read all 40 in full and returned twelve candidates. I
re-verified eight against the files, redoing every arithmetic step; those are
findings 13-20 below, compressed because none reaches the severity of 1-3. The
remaining four are forwarded unverified at the end and are **not** adjudicable as
they stand.

**13. `research/natal-cap-36-skeleton-door.md`:176-177 — a [MEASURED] verdict
false in five of its own table's ten cells.** MEDIUM-HIGH, confidence HIGH.
The prose: "At M = 210 and M = 2310 the cancellation is at or below K^{−1/2}
from @19 on." Against its own table at :159-166, using the table's own K^{−1/2}
column (which I recomputed: 1/√435 = 4.80e−2, 1/√1739 = 2.40e−2,
1/√7863 = 1.13e−2, 1/√37534 = 5.16e−3, 1/√198274 = 2.25e−3, all matching as
printed), five of the ten M = 210 / M = 2310 cells at @19 and later are **above**
K^{−1/2}: M=2310@19 (7.71e−2 vs 4.8e−2, ×1.61), M=2310@23 (3.23e−2 vs 2.4e−2,
×1.35), M=210@31 (9.04e−3 vs 5.2e−3, ×1.74), M=2310@31 (7.96e−3 vs 5.2e−3,
×1.53), M=210@37 (3.09e−3 vs 2.3e−3, ×1.37). The honest form is "within a factor
of 2 of K^{−1/2}". The table is the side to trust.

**14. `research/GLOSSARY.md`:389-390 — the corridor's last percentage contradicts
the formula in the same bullet.** MEDIUM, confidence HIGH on the arithmetic.
The bullet gives the corridor as "**5·C₂/ln²n = 3.301/ln²n** of the slots
(VERIFIED at 3.348, 3.285, 3.386, 3.326, 3.325 for n = 3e4 to 3e6)" and then
"MEASURED at 25% at n = 100, 8.2% at n = 1000, 3.2% at n = 30,000, **0.52% at
n = 3e6**". Its own n = 30,000 cell checks out exactly — 3.386/ln²(3·10⁴) =
3.386/106.27 = **3.19%** ✓ — but the same formula with the bullet's own last
verified constant gives 3.325/ln²(3·10⁶) = 3.325/222.43 = **1.49%**, not 0.52%,
a factor 2.9. The ratio (measured / formula) across the four cells runs 1.6,
1.19, 1.00, **0.35**: three converging and one outlier in the wrong direction.
0.52% would require n ≈ 10¹¹. The verdict "**The corridor closes**" survives
either way. Same formula, uncontradicted, at `OBSERVATIONS.md`:565-567.

**15. `research/sift-limit-attack.md`:305-306 — two "below X" comparisons that
are both arithmetically backwards against the file's own constants.** MEDIUM,
confidence HIGH.
"a valid two-class window certificate at exponent **2.2**, below β₂/2 and below
the Ziller-Morack conjectural p² ceiling, at toy scale." The file states
β₂ = 4.26645 at :10-11, so **β₂/2 = 2.1332 < 2.2**; and the Ziller-Morack p²
ceiling is exponent **2 < 2.2**. Both clauses are false as printed. The very next
sentence supplies numbers that *would* be below both — "the true all-positions
requirement at z = 19 and z = 23 is exponent 1.9524 and 1.9477" — but those are
the retracted `th_true` column of **finding 1**, so the sentence that implicitly
corrects the error is itself quoting a retracted measurement, and the false
comparison is never marked.

**16. `research/anchored-calm.md`:32 — the retired band survives, in words, 26
lines above its own retraction, and the file names this as the failure it exists
to prevent.** MEDIUM, confidence HIGH. Same shape as finding 1.
Status-table row :32: "| **Skeleton Equidistribution Conjecture** | OPEN, door
named, measured open, and **the door reaches about a tenth of the mass** | all x |".
The correction at :58-68: "*(BAND CORRECTED 2026-08-18. This read "between 9% and
11%", which is a range fitted to the two largest magnitudes and stated as if it
covered the series: only @13 lies inside it, @19 lies inside only in absolute
value and with the opposite sign, and @17 and @23 lie outside on either reading.
[...] the home's own summary is the safe form: "the branches [...] carry
essentially none of the skeleton. Their aggregate is small and of either sign".*"
"About a tenth of the mass" is the retired 9-11% band restated in words, in the
row a reader quotes from. The correction's own closing line is the sharpest
thing in this audit: "This file exists because the same status table was written
four times and no summary could copy it correctly, so a band no other copy
carries is exactly the failure it was created to prevent."

**17. `research/a3-09-histogram-operator.md`:137-146 — a rounding that reverses
the direction of a step, under a "digit for digit" claim.** LOW-MEDIUM,
confidence HIGH.
Prose :137: "mbar/ln^2 p **falls** 3.70, 2.85, 2.61, 2.50, **2.49**, 2.42".
Exact, :144-146: "3.6973, 2.8536, 2.6115, 2.4954, **2.5024**, 2.4167 [...] which
reproduces the six values above **digit for digit**". 2.4954 → 2.5024 is a
**rise**, and 2.5024 rounds to 2.50, not 2.49. I confirmed the rise
independently: over the 21 primes in (97, 199], m̄ multiplies by
exp(2·Σ1/q + 2·Σ1/q² + …) = exp(0.2944) = 1.3424 while ln²x multiplies by
28.019/20.928 = 1.3389, a net **+0.26%**, matching 2.5024/2.4954 = 1.0028. The
prose rounded in the one direction that preserves "falls", and the conclusion it
supports is "**There is no slow drift left to happen**".

**18. `research/a3-09-histogram-operator.md`:163-164 — "flat, near 0.8, over the
whole range" over a list that starts at 0.36.** LOW-MEDIUM, confidence HIGH.
"divided by ln^2 p sits at **0.36**, 0.64, 0.68, 0.78, 0.85, 0.79, 0.87, 0.82 at
p = 7, 19, 37, 53, 71, 89, 107, 131. It is flat, near 0.8, over the whole range."
0.36 to 0.87 is a factor 2.4, and the first two entries sit 55% and 20% below
"near 0.8". Flat-near-0.8 holds from p = 53 on. This is load-bearing: the cap it
produces, "L ≲ 0.8 ln²p", is what `gate-multiplies.md`:385-387 uses as "A9's
measured polylog" in the branch comparison that is the whole u-frame verdict.

**19. `research/f-decays.md`:31-32 — a cost law contradicted by the cost computed
in the same sentence, by 21 orders.** LOW-MEDIUM, confidence HIGH.
"Cost is then 1.33^(d/6) with d_min/6 ≈ p/3, so **exp(0.048p)**: reach x ≈ 200
(x = 199 costs 299 s), while x = 1000 would need count(2016), about **4·10⁴¹**
terms." But 1.33^{p/3} = exp(p·ln 1.33 / 3) = **exp(0.0951p)**. Checked at the
sentence's own endpoint: 1.33^{2016/6} = exp(336 × 0.28518) = **4.2e41** ✓, while
exp(0.048 × 1000) = **7e20** — 21 orders out. The slip is diagnosable: 0.048 ≈
ln(1.33)/6, i.e. d_min was divided by 6 twice instead of using d_min ≈ 2p. The
runtime confirms 0.0951: exp(0.0951 × 199) = 1.6e8 terms in 299 s is plausible,
exp(0.048 × 199) = 1.4e4 terms in 299 s is not. Propagated to
`ATTACKS3.md`:111-112, "The expensive half costs exp(0.048p), reaching x ≈ 200".

**20. `research/kappa-not-L.md`:114-116 and `research/ATTACKS3.md`:246 — "clean
and monotone" over a list whose first step falls.** LOW, confidence HIGH.
"Binned by 2p/m̄ the exactness rate is **0.44, 0.39**, 0.81, 0.91, 0.96, 1.000,
clean and monotone." 0.44 → 0.39 is a decrease. Monotone from the second bin on.
**I read `ATTACKS3.md` in full myself and missed this one** — it is at :245-247
there, in the same words. Recording that, because it is the honest measure of
what a single careful read catches.

### Forwarded UNVERIFIED — not adjudicable as they stand

Four candidates from the same sweep that I did not check. Do not act on these
without verifying both ends.

- `research/localized-04-maxsum.md`:118 — "R(1)/ln x [...] falls monotonically
  2.6 → 1.45" against §5's table at :163-166.
- `research/discrepancy-two-class.md`:269-271 — 0.3466·π(x) and 0.5493·π(x) are
  ln√2 and ln√3, i.e. the √R_k *limit* rates, quoted as the measured sup rates
  (which the same file's table at :214-215 gives as ln 1.5592 = 0.444 and
  ln 1.8356 = 0.607), and §10 at :313-316 lists that statement as unproven.
- `research/h2-scoping.md`:190 — the term-30 cost row (8.9e6 years) against the
  file's own 6.7-per-term ratio at :167, which extrapolates to 1.8e7.
- `research/dhr-verification.md`:3-4 "OUTSTANDING: none" and :27 item 1e
  "**CLOSED**" against :226-228 "the exact hypothesis wording of Thm 9.1 (see §5)
  [...] remain book-verification items". Both point at §5. Plausibly two
  different objects ("recommendations" vs "verification items"); needs a read.

Also forwarded, **cross-file so out of this sweep's scope** but the same shape as
finding 1 and worth someone's attention: `research/PRIOR-ART.md`:176-178 states
that the "max A = (0.49 ± 0.09)·ln³v flat over nine decades" reading was
"Retracted in `ZONE-POSTULATE.md` 2026-08-18", while `ZONE-POSTULATE.md`:136-150
still carries it live and unretracted. A retraction that did not land.

---

## Checked and deliberately NOT reported

Each of these looked like a hit and did not survive verification at both ends.
Recorded so nobody re-files them.

- `research/a3-05-bound-L.md`:103 "which reproduces the U-FRAME section 5 table
  exactly" vs :105-110, which immediately explains that fold 11 differs and why.
  Self-resolving in the next paragraph.
- `research/FOLD-PROFILE.md`:114-116 "roughly twice the diagonal reading at every
  level" against 2.87/1.62 = 1.77, 5.97/3.35 = 1.78, 12.03/3.63 = **3.31**. The
  companion claim in the same sentence, "roughly a doubling per level"
  (2.08, 2.02), is exact. "Roughly" is carrying the weight; borderline.
- `research/maxgap-law.md`:525 gives off-diagonal `c` as "0.85 to 1.05" against
  the same file's §8 table (0.919 to 1.135, line 509) and §9 (0.74 to 1.17,
  line 532). Three bands for arguably three sub-regimes; not cleanly one object.
- `research/origin-excess.md`:232-233 "through 1.0 near 2.9 y′²" against its own
  crossing table (:239, first crossing at 3.53 y′²) and its own fine scan (still
  1.0089 at 3.11 y′²). "Near 1.0" is defensible at 1.0019.
- `research/G2-STATE.md`:158's 356,712 against :625's 356,711 — different units
  (gap vs covering length, differing by exactly 1, as :605 states). Trap 2.
- `research/natal-cap-31-calm-vs-kill.md`:16 (anchor VR rank 14/9.7M at @19)
  against :71 (VR(W/2) = 2.293 at rank-from-top 0) — different rotations, t = 0
  vs t = W/2. Not a conflict.
- All six calibration cases: already corrected in the working tree, correctly
  marked, and not re-reportable.

---

## COVERAGE — blunt

**Read in full, by me, line by line (15 files, ~7,580 lines):**
`G2-STATE.md` (963, two passes plus targeted greps), `U-FRAME.md` (798),
`theta-ladder.md` (785), `origin-excess.md` (784), `FOLD-PROFILE.md` (779),
`OBSERVATIONS.md` (666), `maxgap-law.md` (594), `gate-multiplies.md` (542),
`a3-05-bound-L.md` (520), `natal-cap-10-sieve-cap.md` (316), `ATTACKS3.md` (255),
`natal-cap-31-calm-vs-kill.md` (246), `natal-cap-21-beyond-chebyshev.md` (157),
`natal-cap-32-wrap-identity.md` (119), `ATTACKS2.md` (56).

All findings above are mine and every one was verified at both ends inside the
file, with the arithmetic redone. Findings 1 and 2 were additionally verified
against artifacts outside the file (`theta-ladder-sup.js`:18,
`phase1-T4-maximal-law.md`:29-30 and :298, commit `2321e40`).

**Not read at all:** `research/two-class-lower-bounds.md` (937 lines) —
deliberately skipped, it is owned by a running agent and any finding in it would
be churned before adjudication. That is the single largest gap in this sweep and
the most likely place a finding is hiding, because it is the home file for the
G2(41#) prediction band, the certificate ladder and the maxgap constants that
findings 2 and 7 touch.

**Delegated, then verified by me (8 files, ~3,500 lines):** all of `paper/*.md`.
A read-only sweep read them in full and returned eight candidates; I re-verified
the top five against the files and redid every arithmetic step. Four survive as
findings 9-12, one is recorded as a style defect, three are dropped. `wall-note.md`
and `writing-style-math.md` came back clean and I did not re-open them, so those
two rest on the sweep's word alone.

**Delegated, then verified by me (40 files):** the smaller `research/*.md`. A
read-only sweep read them all in full and returned twelve candidates; I
re-verified eight (findings 13-20) and forwarded four unverified. Files that
sweep reports as clean and that I did not re-open: `SCRIPTS.md`,
`oeis-seam-submission.md`, `oeis-G2-submission.md`, `d2-d4-bijection.md`,
`natal-cap-30/26/23`, `maier-matrix.md`, `THE-DIALS.md`, `ZONE-POSTULATE.md`.
Those rest on the sweep's word alone.

**Total corpus coverage:** 64 of the 65 `research/*.md` + `paper/*.md` files were
read in full by someone. The one file nobody opened is
`research/two-class-lower-bounds.md`, skipped deliberately as agent-owned.

**One measured fact about single-pass reading.** Finding 20 sits in
`research/ATTACKS3.md`:245-247, a file I read in full myself, and I missed it. So
did the mechanical probe's first version. That is the honest base rate for this
defect class under one careful read.

**Where I am most likely wrong.** (i) Finding 2's line numbers, because that file
is under live edit — re-locate by string, not by line. (ii) Finding 7's
classification: a rising residual under a measured HL factor may be a legitimate
higher-order effect rather than a defect, and only the flat phrase "VERIFIED to
four digits" is clearly indefensible. (iii) I did not systematically read code
comments or `.js` OUTPUT blocks, only the ones the `.md` files quote. The a3-05
calibration case lived in a `.js`, so that whole surface is unswept.

**Volume sanity.** Twenty-three files opened, twelve findings, of which two
matter and four more would change a number somebody quotes. Yesterday's ~5-6
incidental finds in one day were not a fluke of attention: the class is real and
runs at roughly one live instance per two large files. `paper/staircase-note.md`
carries two on its own.

---

## Design question: could this be a ninth qc check?

**Partly yes, and the part that works is the part that caught the two worst
findings. But it does not close the class, and it must never gate.**

Split by shape.

**(c) A retracted claim that survives elsewhere in the same file — BUILD THIS.**
Findings 1 and 2 are both this shape and it is the most severe class. It is also
the most mechanisable, because this corpus marks corrections in a recognisable
register: `⚠ CORRECTION`, `SUPERSEDED`, `must not be quoted`, `do not quote them`,
`does not survive`, `used to read`, `Both halves are now wrong`. A grep for those
markers returns 15 hits across the corpus, a tractable set. The check: for each
marker, extract the distinctive tokens of the retracted assertion — the numbers
it names (`1.0060`, `0.869`, `546`, `twelve`) and its verb phrase (`crossed 2`) —
then search the rest of the same file for those tokens in an *assertive* frame,
and warn on any hit that is not itself inside a marked block.

*Its false-positive shape is the custody record.* This corpus deliberately
reprints the retracted numbers immediately under the box — theta-ladder:419-420
"left in place as the custody record of what was run", :692 "*(original,
superseded)*" — and a naive checker fires on every one of those. Two mitigations,
both cheap: suppress within N lines of the marker, and require the restatement to
sit under an assertive frame (`the answer is`, `VERIFIED`, `the statement this
licenses`, a section heading) rather than inside a blockquote. Neither is exact.
Expect one or two false alarms per genuine hit, which is affordable at 15 markers.

**(a) A monotonicity claim against its own printed list — buildable, ~25%
precision, and worth it. I ran it twice and the first version was badly wrong.**

*Version 1.* Trigger on `monotonic|monotonically|never below|no exceptions|falls
throughout`, take the nearest comma-separated run of **≥5** numbers in the same
paragraph, test the direction. Result over all 65 files: **5 alerts, 1 real**.

*Then I acquired two more known positives* (findings 9 and 12, both in
`paper/staircase-note.md`) and version 1 **missed both** — a 33% recall I would
have reported as adequate had I not gone looking. Two independent causes, and
both are the kind of thing you only find with a known positive:

- **Trigger vocabulary too narrow.** Finding 9 says "K\*/scour **falls**" and
  finding 12 says "the **falling** ratio". Neither matches a pattern built around
  the word *monotonic*. The defect register is ordinary verbs, not the formal
  ones.
- **List-length floor too high.** Finding 9's refuting list has **four** entries.
  I required five.

*Version 2*, with the trigger widened to bare `falls|rises|decays|declines|
climbs|sub-linear` and the floor dropped to four: **12 alerts, 3 real** —
findings 5, 9 and 12, i.e. **100% recall on all three known positives at 25%
precision**. That is the honest operating point. The nine false positives are
diagnosable, and two of them were useful anyway (`ZONE-POSTULATE.md`:233 and
`sift-limit-attack.md`:41 are not shape-(a) defects but are the propagation
sites for finding 1 that I would otherwise have missed):

1. **Scope qualifier.** `theta-ladder.md`:155, "theta rises monotonically *from
   z = 29 onward*" over a list that starts at z = 19. Fixable by parsing "from X
   onward", "over [a,b]", "on the top N" and slicing — reduces, does not
   eliminate.
2. **Negated claim.** `theta-ladder.md`:284, "does *not* fall monotonically; it
   wanders". Trivially filtered.
3. **Two claims in one window.** `G2-STATE.md`:227, a "falls monotonically"
   sentence adjacent to a rising list belonging to the next clause. Fixable by
   binding the list to the same sentence, at a cost in recall.
4. **The list is not the claim's data** — coordinates or level labels (`23, 29,
   97, 199, 401`) rather than the measured quantity. **This one has no clean fix.**
   It requires knowing which list a sentence is about, and it is the residual
   majority.

*Versions 3 and 4, forced by findings 17-20.* I then acquired three more
monotonicity-shaped positives and v2 **missed all three**. Two more independent
causes, and again neither was visible without a known positive:

- **The window only looked forward.** `kappa-not-L.md`:114-116 prints its list
  *before* the word "monotone". Fixed by widening to `[i−2, i+3]` — which took
  alerts from **12 to 22** and still did not catch it, because of:
- **"monotone" is not "monotonic".** My pattern had `monotonic(ally)?`. The
  corpus uses both words interchangeably, and finding 20 uses the one I omitted,
  at two separate sites.

*Version 4*, with both fixed: **32 alerts, 5 real** — findings 5, 9, 12 and
finding 20's two sites — **5 of 5 recall on every monotonicity-shaped positive I
know of.**

**The measured history is the point, so here it is in one table:**

| version | change | alerts | real | recall |
|---|---|---|---|---|
| v1 | `monotonic\|...`, ≥5 numbers, forward window | 5 | 1 | 1/3 |
| v2 | + bare `falls\|rises\|decays\|…`, ≥4 numbers | 12 | 3 | 3/3 known then |
| v3 | + backward window | 22 | 3 | 3/5 |
| v4 | + the word `monotone` | 32 | 5 | **5/5** |

Precision fell from 20% to 16% as recall went to 1.0. That is the honest
operating point: **about 32 alerts and 5 real findings per full-corpus run**, or
six alerts adjudicated per defect caught. At a minute each that is worth it.

**But read the recall column, because it is the real lesson.** Three separate
gaps — trigger vocabulary twice, window direction once — and **every one of them
was invisible until a new known positive arrived**. Had I stopped at v1 I would
have shipped a check with 33% recall and reported it as working, and the only
thing that stopped me was having six calibration cases and then acquiring five
more mid-sweep. Anyone building this must budget for the same: the pattern is not
the hard part, the vocabulary is, and you cannot see the vocabulary you are
missing.

The four false-positive shapes above (1-4) persist at every version and shape 4
remains the residual majority.

**(b) A count against an adjacent table — I predicted this would be narrow and
precise. I built it, and it is neither. Do not build it as specified.**
The design: match `at all N folds / terms / levels / cells / rows / points`,
find the nearest markdown table, compare N to its row count. Over all 65 files it
returned **2 alerts and 0 real findings**, and it **missed the known positive** it
was designed for.

- `research/PRIOR-ART.md`:436, "at all eight levels x = 5 to 29" — correct
  (x = 5, 7, 11, 13, 17, 19, 23, 29 is eight). The checker bound it to the
  3-row clerical-errors table below it, which is a different table.
- `research/exponent-control.md`:60, "**Control, all 56 terms, p in [5, 271]:**"
  over a 6-row table — correct. Those rows are *models*, not terms.

Both failures are the same failure: **the nearest table is not the claim's
table**, and nothing lexical distinguishes them. And it missed
`G2-STATE.md`:126's "VERIFIED at ten shared terms" — finding 2's third instance,
a genuine count refuted by a genuine twelve-row table — because that sentence
sits 25 lines *below* its table rather than above it. Widening the window to
catch it multiplies the mis-binding.

This is the one place my prediction was wrong, and it was wrong in the direction
the brief warns about: I estimated precision from the shape of the rule instead
of running it. The (b) lane should be dropped, or narrowed to the single case
where the count word and the table are separated by nothing but a blank line.

**(e) Two lists of the same quantity that disagree — NEW, and the cheapest
precise check available.** Finding 17 is this shape and no version of (a) can
reach it, because the prose list *is* monotone — the defect is that it disagrees
with the exact list seven lines below, in the one entry where agreeing would
break the claim. The corpus flags these pairings itself, in a small and
searchable register: "reproduces the six values above **digit for digit**",
"reproduce digit for digit", "match the values recorded independently", "MATCH:
YES". The check: where such a phrase joins two numeric lists of equal length,
compare them elementwise at the precision of the shorter. Nearly no false
positives, because the file has already asserted the two lists are the same
thing. `maxgap-law.md`:63-85 and `gate-multiplies.md`:533-537 are two more
custody blocks this would police for free.

**(f) A band or centre claim against its own list — NEW, small.** Finding 18 is
"It is **flat, near 0.8**, over the whole range" over a list running 0.36 to
0.87. Not a direction claim, so (a) misses it by construction. The test is
different and just as easy: extract a stated centre (`near X`, `about X`, `flat
at X`) or band (`X to Y`) and check that the adjacent list actually falls inside
it. This shape also covers finding 11 (`variance-note.md`'s lever arm) and the
`natal-cap-10`-style "0.2 to 0.6%" band that this corpus has already been
corrected on twice.

**(d) Superlatives and status-strength conflicts — NO.** Finding 3 is the honest
answer here. "Chebyshev remains the best proven bound" and "P(S=0) ≤ 1.898e−6 at
@13" share no token, no number and no named object; nothing short of reading
connects them. This is the same coreference problem the existing `calibration`
check dodges by keying on a *named* object — across files a claim usually names
what it is about, but within a file the second mention is a pronoun or a
paraphrase. Finding 3 was the third-most severe of the eight and no lexical check
reaches it.

**The honest summary. Build (c), (a) and (e). Add (f) if cheap. Drop (b). Do not
attempt (d).**

Measured where I built it, marked as unmeasured where I did not:

| lane | alerts | real | recall on known positives |
|---|---|---|---|
| (a) direction claim vs its own list, v1 | 5 | 1 | 1 of 5 |
| (a) same, v4 after three re-calibrations | 32 | 5 | **5 of 5** |
| (b) count vs adjacent table | 2 | 0 | 0 of 1 |
| (c) retracted claim surviving elsewhere | not built | — | shape of findings 1, 2, 16 |
| (e) two lists asserted equal that are not | not built | — | shape of finding 17 |
| (f) stated band vs its own list | not built | — | shape of findings 11, 18 |

A ninth check on (c) + (a)v4 + (e) + (f) would have caught findings 1, 2, 5, 9,
11, 12, 16, 17, 18 and 20 — **ten of twenty** — and (a)v4 additionally surfaces
two of the three cross-file propagation sites under finding 1. It would miss 3,
4, 6, 7, 8, 10, 13, 14, 15 and 19.

**The one it can never reach is finding 3**, which was third-most severe:
"Chebyshev remains the best proven bound" and "P(S=0) ≤ 1.898e−6 at @13" share no
token, no number and no named object. That is the class's defining property —
**the two ends of a self-contradiction do not have to share any words** — and it
is exactly why the existing `calibration` check works across files (a claim
usually *names* what it is about when it cites another file) and would not work
within one (the second mention is a pronoun or a paraphrase).

Ship (c), (a) and (e) as a WARN-only lane with the false-positive shapes above
documented inside the check, and extend (c)'s search to the whole corpus rather
than the single file, since finding 1's retracted column propagated to three
other files and the same marker set catches it there.

**Do not describe the lane as covering the class.** Half of what this sweep
found needed a reader, and the four findings a reader would most want — 1, 2, 3,
13 — split two-and-two across mechanisable and not. And note what the (a)
calibration history says about the eighth check's own likely state: a lexical
check written once, never tested against a positive it did not already know
about, is probably running at the recall v1 had. That is 20%.
