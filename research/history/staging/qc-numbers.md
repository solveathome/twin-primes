# QC pass: NUMBERS — cross-file agreement and caveat attachment

<!-- ledger
id: Q-qc-numbers
status: ANSWERED
todo: none
question: Do two places in the corpus ever give the same number for the same object, and does each remote quotation carry the caveat its home document requires?
verdict: 16 findings organised by quantity, led by the rho disagreement between U-FRAME:646 and gate-multiplies:360; diagnosis only, no existing file touched, and arithmetic-per-number is audit-numbers.md's axis rather than this pass's.
-->

Wave 1, diagnosis only. No existing file touched. Axis: do two places give the same
number for the same object, and does each remote quotation carry the caveat its home
document requires. Arithmetic-per-number was audited separately in `audit-numbers.md`;
this pass does not repeat it.

Status: COMPLETE. 16 findings, organised by quantity. Task 0 first, then Q1-Q8,
then Unresolved, then corrections to the brief, then counts.

---

## TASK 0 — the rho disagreement (U-FRAME:646 vs gate-multiplies:360)

**VERDICT: not a numbers defect. Both sentences are arithmetically true, of two
different statistics, and neither says which. One genuine defect rides along:
"rising with level" is false as stated in both places.**

### What was computed

`rho(T_x, m) = (maxsum_m(T_x) − G2(T_x)) / ((m−1)·m̄(T_x))`, m̄ = W/D.
Twin slots built by direct bit-sieve of each tile from scratch (scratchpad
`rho.js`), no repo code reused. **Runtime: 1.5 s for all of T_11 … T_23**
(T_23 alone 1.3 s, D = 7,952,175, W = 223,092,870). T_29 is taken from
`gate-multiplies-03.js`'s recorded stream, not re-derived.

CUSTODY, done before trusting anything: the sieve's `maxsum_m` table reproduces
**both** independently recorded copies in the repo — `a3-05-bound-L.js`:655-663
and `a3-02-diagonal-f.js`:572-577 — digit for digit at every tile T_11…T_23 and
every m ≤ 8. It also reproduces `gate-multiplies.md`:424's own derived row
`max_{m≤8} rho` = 1.58, 1.78, 1.83, 1.41, 1.84 to the quoted precision. m̄ and D
match `gate-multiplies.md`:402 at T_29. The engine is sound.

| rho | m=2 | m=3 | m=4 | m=5 | m=6 | m=7 | m=8 | min | max | mean | **median** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| T_11 | 1.403 | 1.578 | 1.286 | 1.403 | 1.332 | 1.227 | 1.152 | 1.152 | 1.578 | 1.340 | **1.332** |
| T_13 | 1.484 | 1.780 | 1.484 | 1.261 | 1.187 | 1.137 | 1.144 | 1.137 | 1.780 | 1.354 | **1.261** |
| T_17 | 1.833 | 1.309 | 1.309 | 1.113 | 1.152 | 1.091 | 1.122 | 1.091 | 1.833 | 1.275 | **1.152** |
| T_19 | 1.405 | 1.171 | 1.015 | 1.288 | 1.171 | 1.288 | 1.272 | 1.015 | 1.405 | 1.230 | **1.272** |
| T_23 | 1.069 | 1.711 | 1.711 | 1.657 | 1.839 | 1.747 | 1.650 | 1.069 | 1.839 | 1.626 | **1.711** |
| T_29 | 2.389 | 2.190 | 1.792 | 2.091 | 1.872 | 1.626 | 1.536 | 1.536 | 2.389 | 1.928 | 1.872 |

Global over T_11…T_23 and m ∈ [2,8]: **min 1.0150** (T_19, m=4),
**max 1.8393** (T_23, m=6).

### Which statistic each sentence is actually true of

- **`gate-multiplies.md`:360, "MEASURED at 1.0 to 1.9 across T_11 to T_23"** —
  true of the **min and max over every (tile, m) cell** of the grid above:
  1.015 → 1.0 and 1.839 → 1.9, each rounded outward to one decimal. The brief's
  leading hypothesis is **CONFIRMED** for this site.
- **`U-FRAME.md`:646-647, "about 1.3 at T_11 and about 1.7 at T_23"** — true of
  the **per-level median over m ∈ [2,8]**: 1.332 and 1.711, right to two
  decimals at both ends. It is the *unique* natural statistic that fits both
  endpoints: the mean gives 1.340 and 1.626 (so "about 1.7" would be wrong), the
  max gives 1.578 and 1.839 (both wrong), m=2 alone gives 1.403 and 1.069
  (both wrong). Fixed m = 4 also fits (1.286, 1.711) but no reader could guess
  m = 4, and the sentence's generic index `j` says it is not one m.
  So U-FRAME quotes a **central value per level at the two endpoint levels**,
  exactly as the brief supposed. Both files are right.

### The genuine defect, in both files: "rising with level"

Not supported by any of the three statistics as written:

| statistic | T_11 | T_13 | T_17 | T_19 | T_23 | monotone? |
|---|---|---|---|---|---|---|
| median over m | 1.332 | 1.261 | 1.152 | 1.272 | 1.711 | **no — falls for three levels** |
| mean over m | 1.340 | 1.354 | 1.275 | 1.230 | 1.626 | **no — falls for three levels** |
| max over m | 1.578 | 1.780 | 1.833 | 1.405 | 1.839 | **no — dips hard at T_19** |

The central statistic (U-FRAME's own) *falls* from T_11 to T_17 and recovers
only at T_23; "rising with level" is an endpoint comparison, not a trend. The
max statistic rises on trend but dips 1.833 → 1.405 at T_19 — and
`gate-multiplies.md` prints that dip itself at line 424, sixty lines after
asserting the rise at line 360. That is an in-file disagreement.
`gate-multiplies.md`:493 already states the honest version ("measured on six
tiles and it is rising … Do not extrapolate rho in either direction"); §8's
headline does not inherit it.

### Exact replacement wording

**`gate-multiplies.md`:359-361** — replace

> `rho = (maxsum_m - G2)/((m-1)*mbar)`, MEASURED at 1.0 to 1.9 across T_11 to T_23
> and rising with level.

with

> `rho = (maxsum_m - G2)/((m-1)*mbar)`, whose value depends on both tile and m.
> MEASURED over every cell with T_11 <= T_x <= T_23 and 2 <= m <= 8: **1.02 to
> 1.84**, extremes at (T_19, m=4) and (T_23, m=6). Per-level typical values (the
> median over m) run 1.33, 1.26, 1.15, 1.27, 1.71 at T_11 to T_23, so rho is
> higher at the top of the ladder than the bottom but **does not rise level by
> level**; see section 8.5 and section 11.

**`U-FRAME.md`:646-648** — replace

> **§5a step 4's slope was not 1 either.** (maxsum_j − G₂)/((j−1)·m̄) measures
> about 1.3 at T₁₁ and about 1.7 at T₂₃, rising with level, which is a second
> reason that step failed.

with

> **§5a step 4's slope was not 1 either.** (maxsum_j − G₂)/((j−1)·m̄), taken as
> the median over j ≤ 8, measures 1.33 at T₁₁ and 1.71 at T₂₃, and over
> individual (tile, j) cells it ranges 1.02 to 1.84 across that span, reaching
> 2.39 at T₂₉. It is larger at the top of the ladder than the bottom but not
> monotone in the level (1.33, 1.26, 1.15, 1.27, 1.71). Whichever reading is
> taken it is not 1, which is a second reason that step failed.

Confidence: **high**. Independently sieved, custody-checked against two recorded
maxsum tables and against gate-multiplies' own derived row, runtime 1.5 s.

### Two smaller things noticed in passing at this site

- `gate-multiplies.md`:365's box fixes **rho = 1.5** to derive
  `L <= 0.31 p/ln p`. Nothing in that paragraph tells the reader rho reaches
  2.39 at T_29, which moves the threshold to `0.19 p/ln p` — a 39% tightening.
  Line 425 does reconcile it, sixty-five lines later, and §9:456 carries the
  "0.19 to 0.31" pair. Class (c), paragraph-level. Fix: append to the box
  "(rho = 1.5 is the central reading; at T_29's rho = 2.4 the threshold tightens
  to `0.19 p/ln p` — section 8.5)".
- The same quantity is written with index `m` in one file and `j` in the other.
  Harmless, but the two sentences are hard to recognise as the same object.

---

---

## Findings by quantity

### Q1. Var/E and the 0.611 limit — TWO ENSEMBLES, one bullet, one number

**Correct value.** There are **two** Var/E ladders at the zone exponent u = 2 and
they are different objects:
- **Full twin-candidate process** (`paper/variance-note.md` §6, script 06):
  Var/E at u = 2 reads **0.251, 0.281, 0.290, 0.303, 0.307, 0.317, 0.321** for
  y = 97 … 2003. Limit genuinely unknown. The scaling law
  ln(Var/E) ≈ −(0.24u² + 0.13u) belongs to **this** ensemble (y = 401).
- **Comb-restricted process**, the Natal@5 comb 11, 17 mod 30
  (`paper/variance-note.md` §7 Corollary 3, `paper/anchored-note.md` §2): on the
  diagonal L = W = x# it reads **0.1521 … 0.3958** across @7…@37, and **0.611 is
  the limit hypothesis of this ladder only**, favoured 10:1 over 0.44 by one
  point of model comparison, explicitly "not a measurement of a limit".

Home documents: `paper/variance-note.md` §§6-7. Required caveats: 0.611 is a
**hypothesis** from a fit separated on a lever arm of 1/lnlnW ∈ [0.295, 0.343];
0.44 is demoted, not excluded; and it belongs to the comb ensemble.

| site | text | object it is actually about | verdict |
|---|---|---|---|
| `paper/variance-note.md`:195, 204 | 0.290 at u=2; 0.251…0.321 | full process | correct, home doc |
| `paper/variance-note.md`:282-310 | 0.1521…0.3958, limit 0.611 | comb | correct, home doc, caveat attached at :313-317 |
| `paper/anchored-note.md`:76, 95 | same table, 0.152→0.396 | comb | correct, "not a universal constant" attached in-paragraph |
| `research/README.md`:64-67 | "0.25 → 0.32 at zone scale, limit unknown" | full process | **correct** |
| `research/anchored-windows.md`:21-23 | law + "(0.25 → 0.32 at zone scale)" | full process | **correct** |
| `research/PRIOR-ART.md`:44-45 | "Var/E drifts … the stable law is ln(Var/E) ≈ −(0.24u²+0.13u)" | full process | correct |
| `paper/moire-primes.md`:713-715, 749 | law + "the limit's" | full process | correct |
| `TODO.md`:157, 268-272 | 0.611 hypothesis, 10:1, 0.3958 at @37 | comb | correct, caveats attached |
| `research/GLOSSARY.md`:257-263 | splices all three | **both, conflated** | **DEFECT** |

**FINDING Q1.1 — class (a), one number attached to two different objects.**
`research/GLOSSARY.md`, "Hyperuniformity" bullet, lines 257-263. It opens on the
comb ladder ("Var/E drifting 0.152 → 0.396 across @7..@37"), then asserts the
full-process scaling law as *the* stable structure of that same drift
("ln(Var/E) ≈ −(0.24u² + 0.13u)"), then attaches the comb's limit hypothesis to
it ("Whether Var/E has a limit at u = 2, ≈ 0.611 on current measurement").

Read as one object it is self-contradictory: the quoted law evaluated at u = 2
gives 0.290, and the full process's own u = 2 ladder runs 0.251 → 0.321 out to
y = 2003 — nowhere near the 0.396 the bullet's first clause reports at @37, and
not on a road to 0.611. Two ensembles, spliced.

CONCRETE FIX. Replace the tail of the bullet, from "Var/E is not a constant" to
"separate that limit from a slow decay", with:

> Var/E is not a constant in either the level or the window. For the **full**
> twin process the stable structure is a scaling law in the window exponent u,
> ln(Var/E) ≈ −(0.24u² + 0.13u), whose u = 2 value drifts 0.251 → 0.321 over
> y = 97 to 2003 with the limit unknown (`variance-note.md` §6). For the
> **comb-restricted** Natal@5 process the diagonal u = 2 ladder above is the one
> that reaches deep levels, and its limit is Paper III's last open question:
> ≈ 0.611 is the live hypothesis, favoured 10:1 over the demoted 0.44 by a single
> separating point, on a lever arm where 1/lnlnW moves only 0.295 to 0.343, so no
> finite computation can separate it from a slow approach to something else
> (`variance-note.md` §7).

Confidence: **high**. Checked by recomputing the comb density
δ = (2/30)∏_{7≤p≤y}(1−2/p) at x = 7, y = 13: δ·210 = 6.92, matching both tables
to the digit, which confirms `anchored-note.md`:76 and `variance-note.md`:282 are
the same comb object; and by evaluating the §6 law at u = 2 (0.295) against §6's
own u = 2 row (0.290) and against the comb's 0.396.

**FINDING Q1.2 — class (c), low priority.** `research/README.md`:64-67 is the
only summary carrying a Var/E limit sentence with no pointer to the 0.611
hypothesis. It is not wrong — "limit unknown" is right for the full process — but
a reader of the entry document never learns the question has a favoured answer on
the comb. Fix: append to line 67 "(the comb-restricted diagonal of
`paper/variance-note.md` §7 is where the limit is pinned down, hypothesis 0.611)".
Confidence: high, judgement call on whether the entry doc should carry it.

---

### Q2. The G2 growth exponent 1.57

**Correct value.** 1.57 ± 0.06 (statistical only, systematic unquantified) for
h₂, the dominating two-class object, control-corrected; 1.54 ± 0.09 for G₂
itself. Practical bracket **1.3 to 1.9**, hard floor **1**. It is **not** a
constant times p·ln²p. Home document: `research/exponent-control.md` §5,
mirrored in `research/G2-STATE.md`:164.

Occurrences: 29 paragraphs across 20 files. **Paragraph-level attachment is in
good shape** — this is the class the previous pass could only test at file level,
and it passes at paragraph level too, with two exceptions below. Sites checked
and clean, each carrying bracket or floor or control language in the same
paragraph: `README.md`:43, `GLOSSARY.md`:179, `PRIOR-ART.md`:41,
`THE-DIALS.md`:48 and :265, `ZONE-POSTULATE.md`:169, `FOLD-PROFILE.md`:488,
`G2-STATE.md`:164 and :636, `U-FRAME.md`:155 and :494, `exponent-control.md`:168,
:175, :250, `gate-multiplies.md`:44, :345, :349, `a3-05-bound-L.md`:215,
`discrepancy-two-class.md`:261, `oeis-G2-submission.md`:59,
`sift-limit-attack.md`:177, `two-class-lower-bounds.md`:384,
`research/README.md`:77, `paper/beta2-note.md`:216, `paper/moire-primes.md`:672.

**FINDING Q2.1 — class (c).** `research/THE-DIALS.md`:147, dial 2 row of the §3
summary table: "**open, an exponent fight: 4.2665 proven, 2 needed, 1.57
measured**". The bracket is 99 lines away at :48. This row is the most quotable
line in the file — a one-row summary of the project's live dial — and it presents
1.57 as a bare measurement beside two exact numbers, which invites reading it as
comparably solid. Fix: change to "4.2665 proven, 2 needed, 1.57 measured
(bracket 1.3-1.9, floor 1)". Confidence: high.

**FINDING Q2.2 — class (c), and the highest-leverage instance of it.**
`research/exponent-control.md`:198-199 and its mirror
`research/G2-STATE.md`:648-649 are **house directives telling future writers what
to quote**: "**Quote 1.57 for h2 and 1.54 for G2, note that the long certificate
ladder reads 1.2 …**". Neither directive names the bracket or the floor. A "quote
this" box is precisely the text that gets copied into remote documents, so a
bracket-free directive is the mechanism by which naked 1.57s would enter the
corpus. Both paragraphs do end with "every reading, corrected or raw, sits below
2 and above 1", which is a floor and a ceiling but not the 1.3-1.9 bracket.
Fix, both sites: "Quote 1.57 for h2 and 1.54 for G2, **always with the practical
bracket 1.3 to 1.9 and the hard floor 1**, note that the long certificate ladder
reads 1.2 …". Confidence: high; the corpus currently obeys the unstated rule, so
this is prophylactic rather than a live error.

Non-findings, recorded so nobody chases them: `exponent-control.md`:100's
"c = 1.579" is a fitted constant in the c·p·log²p row, not the exponent;
`theta-ladder.md`:396, :419, :445, :649 and `G2-STATE.md`:684's 1.5704 / >1.57
are need/z² values; `U-FRAME.md`:108 and :321's 1.571 is maxsum₂/G₂;
`maxgap-law.md`:449's 1.5772 is a table cell of a different fit.

---

---

### Q3. e^{2γ}/4 and the cap e^{2γ}

**Correct value.** e^{2γ} = 3.1722189581, e^{2γ}/4 = **0.7930547395**.
Legitimate renderings: 0.79305 (5 dp), 0.793055 (6 dp), 0.7931 (4 dp), 0.793,
0.79, and 3.172 / 3.1722 / 3.17 for the cap. All of these check out. Home
documents: `research/origin-excess.md` §2 and `research/anchored-windows.md` §4;
`research/ATTACKS2.md` item 5 for the Unification Law that produces it.
Separately, **0.79303 is a MEASURED value at x = 1487**, not a rendering of the
constant — already settled, not re-litigated here.

Occurrences: 46 paragraphs across 22 files. Two are wrong.

**FINDING Q3.1 — class (b), plain mis-rounding.** `research/PRIOR-ART.md`:20,
novelty table, first column: "e^{2γ}/4 ≈ **0.7935** twin Mertens-bias constant".
0.7935 is not a rounding of 0.7930547 at any precision; the fourth decimal is
wrong by 4 units in the last place. Fix: "e^{2γ}/4 ≈ 0.7931 twin Mertens-bias
constant". Confidence: **high**, arithmetic. Note for the applier: the identical
error at another site was already flagged in
`research/history/staging/audit-papers.md`:44 ("§4"), so this is the *second*
instance and the PRIOR-ART one is still live — worth a global check for 0.7935
after the fix.

**FINDING Q3.2 — class (b), plain mis-rounding.**
`research/NATAL-CAP-CAMPAIGN.md`:31: "a deterministic proportional drift
(predicted limit e^{2γ}/4 = **0.7932**)". Should be 0.7931. Note the "="
presents it as exact. Fix: "(predicted limit e^{2γ}/4 = 0.79305)". Confidence:
**high**, arithmetic. This one is unflagged by any prior pass, and it is
suspiciously close to the retired "0.79325 rounding slip" that
`paper/anchored-note.md`:516 records as corrected in natal-cap-11 — plausibly the
same slip surviving in a campaign file that the correction never reached.
Recommend the applier check `research/natal-cap-11-kstar23.js` for the same value.

---

### Q4. The G30_agg ladder — three sites stale at one level, and one pair of disagreeing fits

**Correct value.** G30_agg certified in exact BigInt at **six** levels
@11, @13, @17, @19, @23, @29: **0.2132, 0.1113, 0.1011, 0.1259, 0.0945,
0.1176**, margin ½ − G30 at @29 = **0.3824**. Home documents:
`research/natal-cap-30-skeleton-bound.md` (the certificate) and
`research/natal-cap-36-skeleton-door.md` (the decay-shortcut refutation). The @29
row was re-run today and reproduces exactly (already settled; not re-checked
here). Required caveat: there is **no decay law** — the sequence is non-monotone
and flat within its own spread from @13 on.

| site | levels carried | verdict |
|---|---|---|
| `TODO.md`:172-177 | **six**, @11..@29, mean 0.1101 spread 0.0313, R² 0.44/0.26/0.33 | **current** |
| `research/natal-cap-30-skeleton-bound.md`:50-56 | five, table ends @23, "**@23 is new**" | **STALE** |
| `research/natal-cap-36-skeleton-door.md`:194-200 | five, mean 0.1082 spread 0.0314, R² 0.601/0.511/0.527 | **STALE** |
| `research/GLOSSARY.md`:239-240 | "@11 through @23" | **STALE** |
| `research/natal-cap-26-minus-half.md`:105-118, 149, 164 | four, @11..@19, "+0.10..+0.21" | correct, scope declared |
| `paper/anchored-note.md`:390 | no numbers | fine |

**FINDING Q4.1 — class (d), stale term count in the certificate's own table.**
`research/natal-cap-30-skeleton-bound.md`:50-56. The certified table stops at @23
and the prose at :57-58 reads "Rows @11–@19 reproduce cap-26 to all printed
digits; **@23 is new** (first exact deviation/skeleton pass at
W = 223,092,870; 17 s)". @29 exists and is certified. Fix: add the row
`| **29** | *K* | **+0.1176** | **0.3824** | … |` (K, dev_agg, max|no30| and R_agg
at @29 to be read off `natal-cap-36 --at29`'s output, which TODO:173 names as the
source), and rewrite :57-58 to "Rows @11–@19 reproduce cap-26 to all printed
digits; @23 and @29 extend it." Confidence: **high** on the staleness and on
0.1176/0.3824; **medium** on the other @29 columns, which I did not re-run —
the applier must take them from the script, not invent them.

**FINDING Q4.2 — class (a) plus (d), two disagreeing sets of fit statistics for
the same refutation.** `research/natal-cap-36-skeleton-door.md`:194-200 refutes
the decay shortcut on **five** points and reports "the best of three log-linear
fits … exponent −0.700 with R² = 0.601 … against x, R² = 0.511 … against ln K,
R² = 0.527". `TODO.md`:175-177 refutes the same shortcut on **six** points and
reports "fits give R² of 0.44/0.26/0.33". Same three fits, same object, two
different R² triples, and the summary is *ahead* of the note it cites. TODO also
records the stronger fact that "the sequence goes UP at @19 **and again at @29**",
which the note cannot say.

This is the worst kind of drift for this corpus: a reader who checks the note
against the summary finds the summary unsupported. Fix, `natal-cap-36`:194-200,
replace with:

> G30_agg = 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176 at @11 through @29.
> The increments are −0.1019, −0.0102, +0.0248, −0.0314, +0.0231: the sequence is
> non-monotone, going up at @19 and again at @29, and from @13 on it is flat
> within its own spread (mean 0.1101, spread 0.0313). The best of three
> log-linear fits gives R² of only 0.44 against ln ln W, 0.26 against x and 0.33
> against ln K. Nothing here is a law. The @11 point carries the whole apparent
> trend, and removing it leaves no trend at all.

Confidence: **high** on the increments and the mean/spread, which I recomputed
from the six values (increments and mean 0.11008, spread max−min over @13..@29 =
0.1259 − 0.0945 = 0.0314; TODO's 0.0313 is the same figure, rounding); the R²
triple is taken from TODO's report of the `--at29` run and should be confirmed
against that output rather than trusted from here. **Decision needed:** whether
the note's -0.700 exponent line survives at six points — I did not refit.

**FINDING Q4.3 — class (d), one-word fix.** `research/GLOSSARY.md`:239-240:
"The aggregate G30_agg < 1/2 is certified in exact BigInt at **@11 through @23**".
Fix: "@11 through @29". Confidence: high.

---

### Q5. "The gap is a factor 0.58 ln p" — a range collapsed to its optimistic end

**Correct value.** 5a step 3 goes through iff **L ≤ 0.19 to 0.31 · p/ln p** on
average over the ladder (the two ends are rho = 2.4 and rho = 1.5 respectively,
`gate-multiplies.md`:425). A5 Theorem B proves **L ≤ 0.18 p**. Home document:
`research/gate-multiplies.md` §8-§9, with the honest-limits note at :489-491
("uses three measured laws at once … read as one significant figure").

The derived gap factor is 0.18 p ÷ (c · p/ln p) = (0.18/c)·ln p:
- at c = 0.31 (rho = 1.5): **0.58 ln p**
- at c = 0.19 (rho = 2.4, the T_29 reading): **0.95 ln p**

**FINDING Q5.1 — class (b), a rounded range presented as a point value, in eight
places.** Every site pairs the range "0.19 to 0.31" with the single derived
factor "0.58 ln p", which is the 0.31 end only. Sites:
`research/gate-multiplies.md`:378 (box, uses 0.31 alone — internally consistent),
`research/gate-multiplies.md`:456-457 (box, states the **range** then "The gap is
a factor 0.58 ln p, and it is the only gap" — inconsistent within the box),
`research/U-FRAME.md`:529-531, :590-592, `TODO.md`:85-86,
`research/a3-09-histogram-operator.md`:170-184,
`research/a3-05-bound-L.md`:251-254, `research/a3-03-f-from-census.md`:110-112.

Since rho is measured to be *rising* (Task 0), 0.19 is the end the trend points
at, so the corpus is quoting the favourable end of its own range as the headline.
The branch of the answer does not change — a factor of ln p either way — which is
why this is (b) and not (a). But the number is stated as exact eight times.

CONCRETE FIX, applied identically at all eight sites: wherever "the gap is a
factor 0.58 ln p" appears beside the range, write **"the gap is a factor 0.58 to
0.95 ln p (0.18/0.31 and 0.18/0.19), and it is the only gap"**. At
`gate-multiplies.md`:378, which legitimately fixes rho = 1.5, leave 0.58 and add
"(at rho = 1.5; 0.95 ln p at T_29's rho = 2.4)".

Confidence: **high**, pure arithmetic on the corpus's own two constants
(0.18/0.31 = 0.581, 0.18/0.19 = 0.947).

---

### Q6. Quantities checked and found CLEAN

Recorded so a later pass does not redo them.

- **The twelve G2 ladder terms** 2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348,
  528. Eight sites (`GLOSSARY.md`:176, `U-FRAME.md`:461, `oeis-G2-submission.md`:16,
  `THE-LENS.md`:80, `PRIOR-ART.md`:76, `paper/beta2-note.md`:50, plus
  `PRIOR-ART.md`:24 and `FOLD-PROFILE.md`:603 quoting proper sub-runs with their
  ranges stated). Identical everywhere; T₂..T₃₇ labelling consistent; no drift.
- **The ratio band 0.222–0.314.** Only two sites, both scoped in-paragraph:
  `research/README.md`:77 ("over the twelve exact terms (x = 2…37)") and
  `oeis-G2-submission.md`:40 ("from 0.222 at n = 1 to 0.314 at n = 12"). Neither
  presents it as an asymptotic law. Its reciprocal, the margin 3.18 at x = 37,
  agrees at `THE-DIALS.md`:67, `G2-STATE.md`:122 and :142 (1/0.314 = 3.185).
  **This is the caveat the brief expected to be missing and it is not.**
- **The theta suprema** 1.9524, 1.9477, 2.0018, 2.0476 at z = 19, 23, 29, 31.
  Nine sites, all identical, all labelled as exact full-period suprema and all
  distinguishing the ">" prefix entries. `G2-STATE.md`:679-690 is the model: it
  carries an explicit `status: exact/prefix` row and the flattening-artifact
  warning in the same block. One soft spot noted below.
- **The Zone Postulate verification limit 1e11**, 4,118,054,813 primes,
  224,376,048 twin pairs. Three sites (`TODO.md`:23,
  `ZONE-POSTULATE.md`:90-91, and the reproduction line at :368 / `G2-STATE.md`:879),
  all consistent, all with the "~10 min" runtime attached. No superseded limit
  (1e8, 1e10) is quoted anywhere as the current one.
- **G2(41#): cost 40x and the band 476–633, central 513.** `TODO.md`:282, :384-390,
  `U-FRAME.md`:177, :537-541, `maxgap-law.md`:501, :509,
  `two-class-lower-bounds.md`:485-490. The cost chain reconciles exactly: 54 min
  for the 37# walk × 41 = 36.9 h = "roughly 37 hours" = "about 40×", and
  `U-FRAME.md`:539 explicitly welds its own figure to `G2-STATE.md` §9.6's. The
  band and the 513 centre at c2' = 0.4814 agree at all sites. One 1-unit drift
  below.
- **The parity floor 2 and the 2·3^{π(x)−1} Level Ledger bound.** The ledger
  bound is quoted with the same exponent convention everywhere
  (`FOLD-PROFILE.md`:44-62, `level-ledger-tight.md` passim, `README.md`:75's 2·3ⁿ
  in the script-03 row), and the places that improve on it state what they beat
  and by how much (80.98 uniformly at `level-ledger-tight.md`:144; 243.7 against
  13,122 at T₂₃ at `FOLD-PROFILE.md`:62). No naked use found.

**Minor findings inside Q6:**

**FINDING Q6.1 — class (b), 1 unit.** `TODO.md`:389 says x = 37's c₂′ being an
outlier gives "**~487**"; `research/maxgap-law.md`:501 says "**488** if the
`x = 37` term is an outlier". Same quantity, one unit apart. Fix: make TODO read
"(~488)" to match the home document, or drop the tilde-precision and write
"(about 490)". Confidence: high that they disagree; **medium** on which is right —
I did not re-run `two-class-lower-bounds.md` §6's exact form
`c2' · m2(41) · (θ(41) − ln m2)` with the outlier-excluded mean. **Decision
needed** if the applier wants the digit rather than "about 490".

**FINDING Q6.2 — class (c), soft.** `research/G2-STATE.md`:692-694, "The
conditional column agrees and more loudly", quotes need/z² = 1.596 … 6.396 and
θ rising to 2.482 without the word **unproven**. The preceding paragraph's
"Dropping the Gaussian maximal bound entirely" lets a careful reader infer the
conditional column uses it, but only `TODO.md`:61 and
`research/theta-ladder.md`:11 say the law is unproven. Fix: open the paragraph
"**The conditional column, which rests on the unproven Gaussian maximal law for
the sawtooth, agrees and more loudly.**" Confidence: high; cheap and it removes
the corpus's only route to quoting a conditional θ as a measurement.

**FINDING Q6.3 — class (c), soft.** `research/ZONE-POSTULATE.md`:179-181 quotes
the θ suprema and "then above 2.05 at every z from 37 to 71" without the
prefix-flattening warning that `G2-STATE.md`:689-690 attaches ("an artifact of a
fixed 4·10⁹-position prefix against a period running to 7.9·10²⁴ and must not be
read as levelling off"). A reader of ZONE-POSTULATE alone sees the column
flatten and could read it as turning over. Fix: append to :181 "; the flattening
past z = 47 is a fixed-prefix artifact, not a levelling off
(`theta-ladder.md` §6)". Confidence: high.

---

### Q7. "quartic beats Chebyshev 35-40×" — a range that excludes its own data

**Correct value.** From `research/attack-03-higher-moments.js`'s recorded output
(2026-08-13), the three rows give Chebyshev / quartic =
1.16e-2 / 3.33e-4 = **34.8×** at p = 13, 1.15e-2 / 3.78e-4 = **30.4×** at p = 17,
9.27e-3 / 2.48e-4 = **37.4×** at p = 19. The honest range is **30 to 37×**.

**FINDING Q7.1 — class (b).** `research/ATTACKS.md`:13, attack 3 row: "quartic
bound beats Chebyshev **35-40×**". The stated interval contains neither endpoint
of the data: it excludes 30.4 and its upper end 40 exceeds the maximum 37.4. The
error originates in the script's own READING 2 ("~35-40x"), which ATTACKS.md
copies faithfully, so both need the same fix. Fix, both sites: "quartic bound
beats Chebyshev 30-37× at the three computed levels". Confidence: **high** —
divided the script's own recorded numbers.

**Non-finding, checked and cleared.** `research/README.md`:120's "optimal quartic
certificates beat Chebyshev 57×" is a **different object** — attack 7's
LP-optimised degree-4 certificate, 9.18e-3 / 1.62e-4 = 56.7× at p = 19, matching
`ATTACKS.md`:17's "57× better than Chebyshev". The two figures (30-37× and 57×)
are correctly attached to "quartic bound" and "optimal quartic certificates"
respectively and must not be reconciled into one number.

---

### Q8. Further quantities checked and found CLEAN

- **The anchored bias β at ten levels, @41 = 0.8455.** `README.md`:75,
  `TODO.md`:139, :218, `research/GLOSSARY.md`:203-204, `research/THE-LENS.md`:98,
  `paper/anchored-note.md`:3, :130, :133, :464, :478, `research/OBSERVATIONS.md`:527
  (0.8455306 at full precision, classical curve 0.8448944, residual 6.362e−4).
  All consistent; the descent 1.156 → 0.846 across ten levels agrees at every
  site; and the **ten β levels versus nine z levels** distinction is maintained
  correctly everywhere (`anchored-note.md`:130's @41 row says "not yet (Var@41
  uncomputed)", :512 says the z column "runs the full nine levels",
  `TODO.md`:152 says the same). This is a place the corpus could easily have
  drifted and has not.
- **Runtimes.** Twenty-six runtime figures were checked for internal consistency.
  All reconcile with their scripts or with each other, including the chain 54 min
  (37# walk) × 41 = 37 h for G2(41#) = "about 40×", and
  `research/theta-ladder.md`:692, :722 which correct an earlier TODO costing in
  place ("z = 59 is about 5 hours, not 1 to 2; z = 71 is 36 hours") — the
  correction has propagated. One open pricing question is in Unresolved below.
- **`research/README.md`'s measurement table (lines 71-78) is fully sourced.**
  Spot-checked every row against the named script's recorded OUTPUT block:
  row 02's "5×10⁶× at p≈5·10⁶" against `02-first-twin-margin.js`'s 5.24e+6 at
  p = 5,242,883 ✓; row 06's "≤ 1.3·10⁻³ at p=97" against
  `06-variance-theorem.js`'s 1.26e-3 ✓; row 05/05b's band and exponent ✓ (Q6);
  row 04's ±1.1σ ✓. **No unsourced number found in the entry document**, which
  was class (e)'s most likely home.

---

## Unresolved / needs a decision

**U1. Is G2(41#) really 37 hours, or is the streaming engine an order cheaper?
(A live research question, not a wording defect — and the biggest thing this pass
turned up outside Task 0.)**

The 37-hour figure at `TODO.md`:384, `research/U-FRAME.md`:537-539 and
`research/G2-STATE.md`:813 is derived one way only: the 37# **lattice walk over
positions** took 54 minutes, the walk is linear in width, so ×41 = 37 h.

But the same file documents a second engine at `research/U-FRAME.md`:816-819: the
streaming leg "recovers G₂(31#) = 348 from T₂₉ in 10 s and G₂(37#) = 528 from
T₃₁'s 6,226,553,025 slots in **519 s**". That is 8.7 minutes for the same term the
lattice walk spent 54 minutes on — a factor of 6 — and it scales in **slots**, not
positions. Slots grow by ×35 from T₃₁ to T₃₇ while positions grow by ×41, and the
copy theorem's per-fold cost is p × D(old), so a naive extension gives roughly
519 s × 35 ≈ **5 hours**, not 37.

Against that: memory is *not* the objection I first thought.
`research/U-FRAME.md`:362 states plainly that "T₂₉ was streamed out of T₂₃ in 34 s
and T₃₁ out of T₂₉ in 126 s, and **neither tile was ever stored**", and
`research/gate-multiplies-03.js`'s header says the same for T_29 — it materialises
only T_23 (7.95·10⁶ slots, trivial) and streams from there. So a nested generator
already exists in spirit and the storage wall is not where I assumed. The real
unknown is whether reaching G₂(41#) needs T₃₇'s gap word streamed **once** with 41
deletion states running in parallel (in which case ≈ 5 h is the right order) or
41 separate passes (in which case ×41 puts it back near the lattice walk's 37 h).
That is a question about the code, not the mathematics.

**The question for Chris:** should §7 item 3 and G2-STATE §9.6 say "37 hours by
the lattice walk; the streaming route may be several times cheaper but has never
been priced past 37#, and needs a nested generator", or has the streaming route
already been ruled out for a reason not in the documents? I did not resolve it and
will not guess. If it is genuinely 5 hours the thirteenth term is a same-day job
rather than an overnight one, which changes TODO's ordering.

**U2. Does `natal-cap-36`'s decay-law refutation survive at six points with the
exponent line intact?** Finding Q4.2 gives the replacement paragraph, but
`natal-cap-36`:198-199's "exponent −0.700 with R² = 0.601" is a five-point fit and
`TODO.md`:176 reports the six-point R² triple as 0.44/0.26/0.33 without an
exponent. Whether the −0.700 becomes something else at six points needs one refit
of `natal-cap-36-skeleton-door.js --at29`. **Question:** run the refit, or drop the
exponent from the note and keep only the R² triple, which is all the argument
needs? I recommend dropping it — the paragraph's point is "nothing here is a law",
which the R² values carry alone.

**U3. Is the x = 37 outlier branch of the G2(41#) prediction 487 or 488?**
`research/G2-STATE.md`:810 and `TODO.md`:389 say ~487, `research/maxgap-law.md`:501
says 488. One unit on a number quoted to three significant figures inside a band
876 wide, so it does not matter mathematically, but the corpus should say one
thing. **Question:** does the applier want the digit re-derived from
`two-class-lower-bounds.md` §6's exact form, or should all three sites read "about
490"? I did not re-run it.

**U4. The @29 row of `natal-cap-30`'s certified table.** Q4.1 supplies G30_agg =
0.1176 and margin 0.3824 with confidence, but the row also needs K, dev_agg,
max|no30|, R_agg and the resonance list at @29. Those exist only in the
`natal-cap-36 --at29` output. **Question:** should the applier pull them from that
run, or is adding the row out of scope for a consistency campaign that is not
supposed to do new research? Adding a partial row would be worse than none.

**U5. `natal-cap-26-minus-half.md`'s scope tags.** Its "[CERTIFIED EXACT
@11–@19]" at :164 and the "+0.10..+0.21" range are both correct *for that file's
levels*, which the file declares at :108. But a reader arriving from GLOSSARY sees
a narrower certified range than exists. This is the house rule's own tension:
"body = latest full understanding only" versus a note that is a faithful record of
one computation. **Question:** does the convention require cap-26 to be updated to
@29 too, or do per-attack notes keep their own scope and only the summaries carry
the frontier? Every other decision in this report assumed the latter.

---

## Corrections to the brief

Offered because the brief asked for them.

1. **"the 99.94% lineage figure" does not exist in the corpus.** No `*.md` outside
   `history/` contains 99.94, 99.9x at all. Two nearby things were probably
   conflated: the **lineage** claim, which is *exact* and carries no percentage
   ("zero orphans, ever. No new lineage is ever born" —
   `research/GLOSSARY.md`:119, `paper/moire-primes.md`:193,
   `web/PROPOSAL.md`:266), and the Variance Theorem's **99.87%** certified
   occupancy bound at p = 97 (`research/README.md`:61,
   `paper/moire-primes.md`:710, `web/PROPOSAL.md`:316, all agreeing). Nothing to
   fix; the quantity was checked and is clean.
2. **The Task 0 line references are off by one.** `gate-multiplies.md`'s rho
   sentence is at **:360-361**, not 359-360; the brief's 359 is the preceding
   line. U-FRAME's is at 646-648, not 646-647 (the sentence runs three lines).
3. **Task 0 was much cheaper than budgeted.** The brief priced T_23 as "minutes,
   not hours". All five tiles, sieved from scratch with an 8-bit-per-byte coprime
   bitset, took **1.5 seconds total**. Worth knowing: the whole T_11…T_23 gap
   structure is interactively cheap, so any future rho, maxsum or gap-histogram
   question at these levels needs no detached run.
4. **The brief's leading hypothesis was right about gate-multiplies and slightly
   wrong about U-FRAME.** It guessed U-FRAME quotes "the endpoints of the trend".
   It quotes the **median over m at the two endpoint levels**, and there is no
   trend to take endpoints of — the intermediate levels fall (Task 0). That
   distinction is what turned a presentation issue into a real defect.
5. **Class (e), UNSOURCED, came up empty.** Every number checked in a summary
   traced to a script or a named note. I looked hardest at `research/README.md`'s
   measurement table, `ATTACKS.md`'s ten rows, `THE-DIALS.md`'s summary table and
   `G2-STATE.md`'s status tables. The corpus's citation discipline is genuinely
   good, which matches `qc-shepherd.md` §6's finding on references. If a later
   pass wants class (e), the 129 `research/*.js` READINGS blocks are the untested
   surface, not the markdown.

---

## Counts

| class | count | findings |
|---|---|---|
| (a) disagreement / one number two objects | 3 | Q1.1, Q4.2, plus Task 0's "rising with level" |
| (b) precision drift or range-as-point | 5 | Q3.1, Q3.2, Q5.1, Q6.1, Q7.1 |
| (c) naked number at paragraph level | 5 | Q1.2, Q2.1, Q2.2, Q6.2, Q6.3, plus gate-multiplies:365's rho = 1.5 |
| (d) stale scale | 3 | Q4.1, Q4.2, Q4.3 |
| (e) unsourced | 0 | none found |

Quantities audited and found clean, no finding: the twelve G2 ladder terms, the
ratio band 0.222–0.314, the theta suprema, the 1e11 Zone Postulate limit with its
two counts, G2(41#)'s band and cost chain, the parity floor 2, the Level Ledger
bound 2·3^{π(x)−1}, β at ten levels, the 4.26645 exponent's eleven renderings
(already cleared by `qc-shepherd.md` §7 and re-confirmed), and every runtime.

**Written incrementally per the operational warning; no existing file was read
into or modified, nothing was committed.**
