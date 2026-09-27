# qc-scope-R — wave 4, partition R: the scope-flattening sweep

<!-- ledger
id: Q-qc-scope-R
status: ANSWERED
todo: none
question: Where does the summary layer restate a result with the scope its home document attaches dropped?
verdict: Fifteen findings, 2 HIGH, 3 MEDIUM-HIGH, 4 MEDIUM, 6 LOW: one HIGH is a false statement in README.md Status introduced by this campaign's own wave 2, the other is both papers giving a false reason for the X-limitation theorem's scope, and the coverage statement at the end is short and matters.
-->

Read-only pass over the summary layer (`README.md`, `TODO.md`, `research/README.md`,
`GLOSSARY.md`, `THE-LENS.md`, `THE-DIALS.md`, `ZONE-POSTULATE.md`, `G2-STATE.md`,
`PRIOR-ART.md`, the whole of `paper/`, plus the three REG documents
`anchored-calm.md`, `certificate-engine.md`, `NATAL-CAP-CAMPAIGN.md`), hunting the
campaign's confirmed dominant defect: a result established somewhere with a SCOPE
attached, restated above it with the scope dropped.

**Fifteen findings.** Two HIGH, three MEDIUM-HIGH, four MEDIUM, six LOW. One of the
two HIGH findings is a false statement in `README.md` §Status that this campaign
itself introduced in wave 2. Coverage statement at the end; it is short and it
matters.

Nothing here supplies replacement text. Each entry gives the two ends, the home, the
nature of the flattening and the evidence.

---

## Ranked

| # | severity | where | one line |
|---|---|---|---|
| R-1 | **HIGH** | `README.md`, `TODO.md`, `natal-cap-21-*.md`, `NATAL-CAP-CAMPAIGN.md` | "exactly one beyond-Chebyshev bound exists, at @11" — the @13 bound was run, is certified, and its own artifact says so |
| R-2 | **HIGH** | `paper/wall-note.md`, `paper/anchored-note.md` | both papers give a false reason for the X-limitation theorem's scope: "the levels where max VR is enumerated" names two, the home names three, and both papers list all three two sentences later |
| R-3 | MED-HIGH | `G2-STATE.md` ×2, `THE-LENS.md`, `gate-multiplies.md` ×3, `TODO.md` | the Overshoot Budget's lifetime slack in four incompatible renderings; the entry document quotes the asymptote as if it were the measurement, in the direction that strengthens the verdict |
| R-4 | MED-HIGH | `PRIOR-ART.md` ×2, `paper/moire-primes.md`, `TODO.md` | "twelve arXiv manuscripts" against the audit's own fourteen-row enumeration; TODO turns the count into "the book is the only uncovered item" |
| R-5 | MED-HIGH | `paper/beta2-note.md` | still calls Iwaniec 1978's Lemma 1 "possibly erroneous"; the campaign ruled that characterisation dropped and applied the ruling only to `PAPERS.md` |
| R-6 | MEDIUM | `paper/wall-note.md` Door 5 | states the two-class construction law as the flat constant `1.90·x·ln²x` where the home says the ratio is not constant and instructs that it be quoted with the level attached |
| R-7 | MEDIUM | `certificate-engine.md` | "The three PROVEN rows are proven at every level and need no qualifier" contradicts the scope column three lines above it and §1 seventeen lines below |
| R-8 | MEDIUM | `paper/PAPERS.md` | one level stale on the anchored note: "nine values" and "W = 7.4·10¹²" against ten levels and W = 3.04·10¹⁴ |
| R-9 | MEDIUM | `ZONE-POSTULATE.md`, `THE-DIALS.md` vs `G2-STATE.md`, `moire-primes.md`, `beta2-note.md` | h₂'s control-corrected exponent quoted over 21 terms in two places and 19 in three; the home carries both and its stated arithmetic does not reproduce. NEEDS COMPUTE |
| R-10 | LOW-MED | `G2-STATE.md` §2 | widens the G₂ ≥ g verification: "ten shared terms" then "ratios 1.00 to 8.00 over the twelve terms"; home and three other sites say ten terms, 2.00 to 8.00 |
| R-11 | LOW-MED | `paper/moire-primes.md` §8 | states the sufficient condition as `G₂ < p²ₙ₊₁ − pₙ` where the reduction's home says `< x′² − 2` |
| R-12 | LOW-MED | `paper/moire-primes.md` §3 | "never before stated" for the genealogy; the same paper's §9 attaches an adjacency qualification to exactly that claim |
| R-13 | LOW | `G2-STATE.md` ×2, `TODO.md` | "halves the band" for full decoupling against `ZONE-POSTULATE.md`'s exact "removes about 71%" |
| R-14 | LOW | `anchored-calm.md`, `README.md`, `paper/anchored-note.md` | the Anchored Typicality Measurement's scope row names three levels, its two supporting numbers name two, and the summaries quote "≈ 0.94" with none |
| R-15 | LOW | `README.md`:56 | "the first two-class Jacobsthal bound **of any kind**" for the upper bound, where the home reserves "of any kind" for the lower bound and says "at any exponent" for the upper |

---

## R-1 (HIGH). The @13 beyond-Chebyshev bound exists. Four documents say it does not, and one of them contradicts itself.

**This is the campaign's own error.** Wave 2's "last four decisions" settled the
beyond-Chebyshev question from `natal-cap-21`'s pasted output alone and wrote the
result into `README.md` and `TODO.md`. Nobody opened `natal-cap-27`, which had
already run the computation `natal-cap-21` lists as a next step.

**The artifact.** `research/natal-cap-27-t4-at13.js`, reading 3, in its own pasted
output block:

> "**THE THEOREM.** P(S=0) <= 1.898e-6 at @13 (optimal quadratic-square over
> moments 1..4; conservative quartic Markov: 2.85e-6). Beats the previous best
> proven bound — Chebyshev/Cantelli 9.74e-4, unimproved since cap-14 — by x513
> (x342 quartic). … And unlike @11, no capacity door exists here: **this is the
> first beyond-Chebyshev bound at a level where P(S=0) = 0 cannot be proven by
> exhaustion** — the ladder now stands alone."

Same file, the OUTPUT block:

> `optimal quadratic-square  = 1.90e-6   (e^-13.17)  BEATS Chebyshev x513`
> `THEOREM (finite computation): P(S=0) <= 1.898e-6 at @13 -- the first`
> `beyond-Chebyshev bound at a level where P(S=0)=0 is NOT capacity-provable`

and the script's own banner title, line 3: "…**and the first beyond-Chebyshev bound
at a level the capacity** [door does not close]". 23 machine checks, zero failures,
958.7 s. Custody: `natal-cap-34-wrap-precision.js` line 323 asserts
`CUSTODY: exact pass reproduces cap-27 T4@13` at 5e−14.

**The four sites that deny it.**

- `README.md` §Status, in the list of the natal-cap campaign's eight proven results:
  "the first beyond-Chebyshev ensemble bound (at @11, singular — **@13 and @17 are
  not run**)".
- `TODO.md` item 6: "Remaining: the @13 bound (listed as a next step in
  natal-cap-21 with an expected value, ≈ 3Var²/μ⁴ ≈ 2.9e−6, and **never run** …),
  and the @17 rerun, which never started. **Exactly one beyond-Chebyshev bound
  exists today, at @11.**"
- `natal-cap-21-beyond-chebyshev.md`:31, the heading: "Theorem 2 (the
  Beyond-Chebyshev Ensemble Bound, @11 — the first, **and so far the only one**)".
  And :141-146: "Run @13's T₄ offline (~90 min, parallelizable) → the first
  beyond-Chebyshev bound at a level where P(S=0) = 0 is NOT provable by capacity —
  expected ≈ 3Var²/μ⁴ ≈ 2.9e−6 (~340× beat). … **Not yet run, so the corpus holds
  exactly one beyond-Chebyshev ensemble bound, at @11.**"
- `NATAL-CAP-CAMPAIGN.md`:121: "the Beyond-Chebyshev Ensemble Bound at @11, and
  **the @13/@17 blocker**".

**Word diff, cap-21's claim against cap-27's output:**

```
@@ -1 +1 @@
{+THEOREM (finite computation): P(S=0) <= 1.898e-6 at @13 --+} the [-corpus holds
exactly one-]{+first+} beyond-Chebyshev [-ensemble bound,-]{+bound+} at [-@11.-]
{+a level where P(S=0)=0 is NOT capacity-provable+}
```

**`TODO.md` item 6 contradicts itself inside nine lines.** It writes "the @13
PRECISION gate is MET; the @13 bound itself does not exist", supports the precision
claim with "the exact decomposition returns T₄ = 352,253,669.87624460 **against
cap-27's certified value**, relative 3.4e-16", and then says the @13 bound was
"never run". Both statements are about the same computation.

**Home determination.** `natal-cap-27-t4-at13.js` governs. `natal-cap-21` is the
earlier artifact and its "Next steps" text is stale relative to a run that
happened after it. cap-21's own predicted value (≈ 2.9e−6, ~340× beat) matches
cap-27's delivered quartic Markov (2.85e−6, ×342) to two figures, which is itself
evidence the two are talking about one object.

**What is genuinely open at @17 is unaffected**: cap-27 records @17's T₄ at
4.9e16 quadruples with "compute is dead there", so `TODO.md`'s "@17 rerun, which
never started" stands.

**Consequence.** Two counts are wrong ("exactly one", "singular"), a level
restriction is wrong ("@13 and @17 are not run"), and the error sits in the
document a fresh reader opens first. The direction is unusual for this campaign —
the summary layer is *under*-claiming rather than over-claiming — but it is still a
false statement in `README.md` §Status.

**Needs a ruling, not a guess.** Whether the corpus wants to call cap-27's @13
result "the second beyond-Chebyshev ensemble bound" or to keep cap-21's "first"
scoped by its sextic/capacity distinction is a naming decision. What is not a
decision is that "@13 … not run" and "exactly one … exists today" are false.

---

## R-2 (HIGH). Both papers give a false reason for the X-limitation theorem's scope.

The *scope* difference between the papers (@13 and @17) and the research layer
(@11, @13 and @17) is already adjudicated: `research/history/CHANGELOG.md`:1379-1387
records it as "a presentational difference between two partitions … recorded rather
than resolved because both statements are true of different things". **That
adjudication does not cover the justification clause, and the justification clause
is false.**

`paper/wall-note.md`:226-227:

> "The **X-limitation theorem** (proven at x = 13 and x = 17, **the levels where the
> ensemble maximum of VR is enumerated**): strikes alone cannot annihilate the natal
> set at any loudness."

`paper/anchored-note.md`:437-439:

> "The theorem is proven at @13 and at @17, **the two levels where the ensemble
> maximum of VR is enumerated**, alongside an @11 annihilation-exclusion result…"

**The home**, `research/natal-cap-31-calm-vs-kill.md`, Theorem 2's "**Scope,
exactly**" paragraph:

> "The proof runs **per level**, from L2 plus the *enumerated* ensemble maximum of
> VR, and that maximum is **enumerated at @11, @13 and @17 only** — the three levels
> this file walks in full (2,310 / 30,030 / 510,510 rotations)."

and the theorem body: "|D(t)| ≤ √(K·V̄·VRmax) = **20.5 / 97.8 / 542**" — three
values, at @11/@13/@17.

**Both papers refute themselves two sentences later.** `wall-note.md`:234-235:
"that max VR stays bounded, **2.78, 2.35, 2.14 at x = 11, 13, 17**".
`anchored-note.md`:442: "**2.78, 2.35, 2.14 at @11, @13, @17**".

**Word diff of the two paper passages** (`anchored-note` §10 left, `wall-note`
Face 2 right), which shows the shared clause surviving both rewrites:

```
The[-first is the-] **X-limitation [-theorem**:-]{+theorem** (proven at x = 13 and x = 17, the levels where the+}
{+ensemble maximum of VR is enumerated):+} strikes alone cannot annihilate the
natal set at any loudness. However {+adversarially+} the scour primes' strike
classes are placed, [-the-]{+removal+} capacity[-to remove-] is not the binding [-constraint;-]{+constraint, and+}
annihilation requires an overlap collapse of 8 to 15 [-σ_X. The theorem-]{+standard deviations of X.+}
{+At x = 11 the question+} is [-proven at @13 and at @17,-]{+closed outright, by capacity plus exhaustion. The+}
{+proof runs per level, from+} the [-two levels where-]{+strike-variance lemma plus+} the {+*enumerated*+}
ensemble maximum of [-VR is enumerated, alongside an @11-]
[-annihilation-exclusion result that closes that level by one inequality and seven-]
[-checks. Its-]{+VR, so its+} extension to every [-level above-]{+larger x+} rests on two
measured trends rather than on a [-proof:-]{+theorem:+} that max VR stays bounded, 2.78,
2.35, 2.14 at [-@11, @13, @17,-]{+x = 11, 13, 17,+} and that the driver S̄/√(K·V̄) keeps growing,
3.1, 4.9, 9.8 at the same levels. {+So Assumption A restated in its true channel+}
```

**The flattening.** The papers' scope statement is defensible (@13 and @17 are the
enumerated levels at or above the theorem's own starting point, and @11 is closed
by a stronger and separate result). The clause explaining *why* is not: it asserts
that VR's ensemble maximum is enumerated at two levels when the home says three and
the same paragraph prints three. A referee comparing the paragraph with itself
finds the contradiction without leaving the page.

**Home**: `natal-cap-31-calm-vs-kill.md` §Theorem 2 governs on what was enumerated.
`GLOSSARY.md`:271-276, `README.md`:97-99 and `TODO.md`:255-259 all carry the
three-level form.

---

## R-3 (MED-HIGH). The Overshoot Budget's lifetime slack: four renderings, and the entry document quotes the asymptote as the measurement.

**The home**, `research/gate-multiplies.md` §7, boxed:

> "**`ln c(p) <= 2 ln p / p`**, with a **total** lifetime slack of `ln(x^2/G2(x#))`
> nats, **measured 0.88 to 1.19 and tending to ln(1/0.55) = 0.598**."

The measurement it rests on, same file, §5 table:

| x | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 |
|---|---|---|---|---|---|---|---|---|
| slack, nats | 1.058 | 0.940 | 0.984 | 0.878 | 0.953 | 1.182 | 1.016 | 0.953 |

So: measured range 0.878 to 1.182 over eight computed levels; 0.598 is a *predicted
asymptote conditional on α = 2*, stated as such at §5 ("with a predicted asymptote
of ln(1/0.55) = 0.598 if alpha = 2") and at §7.

**The four renderings now in the corpus:**

| site | text | what it drops |
|---|---|---|
| `gate-multiplies.md` §7 box | "measured 0.88 to 1.19 and tending to ln(1/0.55) = 0.598" | nothing — this is the honest form |
| `gate-multiplies.md` §9 (:474) | "with a total lifetime slack of about **0.6 nats**" | the whole measured range |
| `G2-STATE.md`:619 | "**CLOSED** by the Overshoot Budget: **0.6 nats** of lifetime slack against a counting tool loose by 3.5× to 6.7× at one fold" | the whole measured range |
| `G2-STATE.md`:766 | "a lifetime slack of **about 0.6 nats** caps every accumulating-index chain" | the whole measured range |
| `gate-multiplies.md`:48 and :362, `THE-LENS.md`:130 | "about **0.6 to 1.0** nats" | the upper end: measured max is 1.182 |
| `TODO.md`:76 | "total lifetime slack **~0.6 to 1.2** nats" | closest to the measurement; the 0.6 end is still the asymptote and not a measured value |

**Nature of the flattening, and its direction.** 0.6 is the *tightest* value in
play. Quoting it alone makes the budget about 40% smaller than every level the
corpus can compute, which makes the CLOSED verdicts in `G2-STATE.md` §5b read
stronger than the measurement supports. That is the same shape as the wave-1
`0.58 ln p` finding — a range collapsed to its favourable end in a load-bearing
figure — and it survived waves 1 to 3 untouched.

**Home**: `gate-multiplies.md` §7's box governs; it is the only site that states
both the measurement and the asymptote and distinguishes them. Note that the home
file is itself inconsistent across its own sections (:48, :362, :474 against
:325-326), so the fix is not confined to the summary layer.

---

## R-4 (MED-HIGH). "Twelve arXiv manuscripts" against the audit's own fourteen-row table.

**The artifact is the enumeration, and it lists fourteen.** `research/PRIOR-ART.md`
§"Full corpus sweep, 2026-08-17 (COMPLETE)" carries a per-paper verdict table whose
rows are:

0706.0889, 1312.2165, 1312.7569, 1402.1970, 1408.6002, 1503.00231, 1510.00743,
1604.02443, 2308.07570, 2309.16833, 2405.03540, 2502.20470, 2603.25896, 2603.25915.

Counted mechanically: `awk '/^\| paper \| year/,/^$/' research/PRIOR-ART.md |
grep -c "^| "` returns 15, i.e. **14 data rows plus the header**.

**The four sites that say twelve:**

- `PRIOR-ART.md`:167 — "**All twelve arXiv manuscripts** were downloaded, converted
  to text and searched", immediately above the fourteen-row table.
- `PRIOR-ART.md`:283 — "Every bibliography in the **twelve manuscripts** was
  extracted and deduped".
- `PRIOR-ART.md`:274 (§Coverage) — "**Twelve arXiv manuscripts** read or searched in
  full text, plus the repository. The only item not covered is the 2022 book".
- `paper/moire-primes.md`:647 — "The boundary, drawn sharply against the full corpus
  (**twelve arXiv manuscripts read in full text**, plus the repository…)".
- `TODO.md`:39 — "**The twelve arXiv manuscripts** and his repository are swept
  (research/PRIOR-ART.md, full corpus table). **The book is the only uncovered
  item**".

**Why this is more than a typo.** `TODO.md` item 000 converts the count into a
coverage guarantee: the book is the only uncovered item. If twelve of fourteen were
actually read, that guarantee is false and two papers are unswept — and the novelty
boundary this audit draws ("the twin-slot spacing is not in his corpus, and neither
is any upper bound on a maximum gap") is a claim about the whole corpus. Two
novelty verdicts have already moved in this campaign.

**Home**: the table in `PRIOR-ART.md` §"Full corpus sweep". Per the campaign's own
lesson 9, the artifact that enumerates is the authority, not the prose count.

**Needs a determination, not a guess**: whether the count is stale (rows added after
the sentence was written) or two papers genuinely were not read. I cannot settle
that from the repository; the per-paper verdict column is filled for all fourteen,
which points at a stale count, but "the verdict column is filled" is not the same
evidence as "the text was searched".

Note the separate figure "about fifteen manuscripts, listed at primegaps.info"
(`README.md`:113, `PRIOR-ART.md`:89, `THE-LENS.md`:178, `moire-primes.md`:617) is
consistent with 14 arXiv items plus the 2022 book and is not part of this finding.

---

## R-5 (MED-HIGH). `beta2-note.md` still calls Iwaniec's Lemma 1 "possibly erroneous".

**The paper**, `paper/beta2-note.md` §4 (:195-197):

> "Iwaniec's 1978 paper needs its Lemma 1 — the divisor-bijection transfer carrying
> the primorial estimate to arbitrary squarefree moduli — and **that lemma is
> precisely the step flagged as possibly erroneous in the unanswered 2016
> MathOverflow question 245539.** **We avoid it entirely**…"

**The ruling**, `research/history/CHANGELOG.md`:529: "**'Iwaniec's contested transfer
lemma'.** The word DROPPED. One unanswered 2016…". CHANGELOG:1655 records the
application, and it lists **only** `paper/PAPERS.md`. `PAPERS.md` now reads:

> "Iwaniec's 1978 Lemma 1 is a published result we have not been able to read in the
> original, and an explicit-constant or formalised exposition of it would be useful
> to the subject."

**The home**, `research/covering-dive.md`, attaches a calibration the paper drops.
Its §Caveats on sourcing:

> "Iwaniec 1978 itself is not obtainable … Only the **proof** is unread, so every
> statement here about the paper's *internals* — Lemma 1's divisor bijection at §1.2,
> and **the possible typo at §Q5** — rests on Granville's account and the MO 245539
> transcription, **and should be read at that calibration**."

**The flattening.** Two things go missing between `covering-dive` and `beta2-note`:
the calibration marker ("rests on a transcription, not on the paper"), and the
campaign's ruling that the characterisation should not be made in our own documents
at all. The paper states it flatly, as fact, about a published result.

**Consequence.** This is the note the paper-grade assessment ranks first and calls
"the only genuinely new theorem in the corpus", in the section whose whole argument
is "we avoid Iwaniec's lemma". An unsupported slur on the avoided lemma is the
single most quotable sentence a referee could object to, and it is not needed: §4's
argument stands on the primorial formulation alone.

**Home**: `covering-dive.md` for the calibration; `PAPERS.md` carries the applied
ruling. The paper is the outlier.

---

## R-6 (MEDIUM). Door 5 states a non-constant ratio as a constant.

**The paper**, `paper/wall-note.md` §1 Door 5, *Toll*:

> "with two classes per prime the only construction data in existence is Ziller and
> Morack's exact optima to the 21st prime, **whose growth over all 21 terms measures
> 1.90·x·ln²x**. A zone requires p². So the adversary's best known weapons fall
> short of a zone by about p/ln p with one class and by about p/ln²p with two, **and
> the two-class figure is the one this paper needs**. It rests on a measured
> construction law rather than on a proven bound."

**The home**, `research/covering-dive.md`:113, in terms:

> "**The direct ratio h₂/(x ln²x) over the 21 exact terms is not itself constant** —
> it runs 1.04 at x = 11 up to **1.95 at x = 73**, **so quote it with the level
> attached**; `research/two-class-lower-bounds.md` §6 gives the coefficient in the
> Poisson form instead, **2.04 x ln²x** at c₂ = 0.8511, which reads 5% high against
> the exact h₂(73#) = 2622."

`research/two-class-lower-bounds.md`:463 confirms the Poisson-form figure:
"Check: `2.04 × 73 × ln²73 = 2742` against `h2(73#) = 2622`, 5% high, at
`c2 = 0.85`."

**Three separate problems in one clause.**

1. The home says the ratio is *not constant*; the paper states a constant.
2. The home *instructs* that it be quoted with the level attached; the paper quotes
   it over "all 21 terms" with no level.
3. `1.90` is not the figure either home now carries. `covering-dive` gives the
   range 1.04-1.95 and mean-free advice; `two-class-lower-bounds` §6 gives 2.04 in
   the Poisson form. The 1.90 figure is the one wave 2's partition E scoped
   (campaign ledger: "`covering-dive.md`:108 attributed 'c ≈ 1.90 over all 21 exact
   terms' … the ratio is **not constant at all**: 1.04 at x = 11 rising to 1.95 at
   x = 73, mean 1.63. Scoped rather than deleted"). The fix landed in
   `covering-dive.md` and did not reach the paper.

**Home**: `covering-dive.md`:113 for the non-constancy verdict;
`two-class-lower-bounds.md` §6 for the coefficient in the form it should be quoted
in. `wall-note.md` is downstream of both.

**Grep validated against a known positive**: `grep -rn "1\.90"` over `paper/` and
`research/` (history excluded) returns `wall-note.md`:134 as the only surviving
site of the retired figure, and returns the `origin-excess.md` 1.90 crossover
values as controls, so the pattern is not silently failing.

---

## R-7 (MEDIUM). `certificate-engine.md` flattens its own scope column one line under the table.

**The document**, `research/certificate-engine.md`:37:

> "**The three PROVEN rows are proven at every level and need no qualifier.**"

**Its own table, three lines above**, first PROVEN row:

> | **Certified-Head Theorem** | PROVEN, explicit error term | **the head only: 1 / 3 / 6 certified primes at @17 / @19 / @23, carrying 9.69% / 17.40% / 22.93% of Σcap₂** | §1 |

**Its own §1, seventeen lines below**:

> "The certified share **grows with x** … 9.69% at @17 (1 prime, max relative error
> 0.01%), 17.40% at @19 (3 primes, 0.34%), 22.93% at @23 (6 primes, 0.40%). **At @13
> the theorem certifies nothing, the 34-prime scour being too short.**"

and, immediately after:

> "`README.md` lists this object under 'Proven' as the Legendre-comb head
> certificate. That is correct as to status; **what it needs is the scope, which is
> the head and not the sum**."

**The flattening.** The sentence at :37 says "need no qualifier" about a row whose
scope cell is a qualifier and whose §1 says the theorem is vacuous at @13 and
carries under a quarter of Σcap₂ where it does apply. The document exists precisely
to stop that sentence being written elsewhere; it writes it itself, and it is the
sentence a summariser reading a status table would carry upward.

`README.md` is *not* at fault here: it reads "the Legendre-comb head theorem (the
head alone; the full certificate still rests on two unproven ingredients, see
`research/certificate-engine.md`)", which is the scope the home asks for. The defect
is confined to the REG document.

**Home**: the scope column of `certificate-engine.md`'s own status table.

---

## R-8 (MEDIUM). `PAPERS.md` is one level stale on the anchored note, in two places.

**`paper/PAPERS.md`**, §"The anchored note is the hard call":

> "It is the artifact most likely to interest a number theorist on sight, because it
> is one number and **a table of nine values**…"

and, in the first of the two publication options:

> "The referee then reads it as 'an equivalent finite form of HL, plus **an exact
> computation to W = 7.4·10¹²**', which is what it is."

**The artifact**, `paper/anchored-note.md`, header and §3:

> "*(Research note, 2026-08-17. **Ten exactly computed levels of β through @41,
> where W = 3.04·10¹⁴** and the current arithmetic stops…)*"

§3's β table has ten rows, x = 7 through 41, with β(41) = 0.8455 at
W = 304,250,263,527,210. `README.md`:127 carries the current figures ("β is measured
at ten levels out to W = 3.04·10¹⁴"), as do `GLOSSARY.md`:232 and `THE-LENS.md`:105.

**The flattening.** 7.4·10¹² is the @37 primorial; the note reached @41 and the
suite index did not follow. Both figures are load-bearing for the positioning
argument PAPERS.md is making, since the whole case for the note is the depth of the
computation.

**Home**: `paper/anchored-note.md` §3 governs.

**Related, lower**: `anchored-note.md` §10 carries "Fitted on every measured level,
the free intercept … 0.7890 on the first eight levels, 0.7860 on **all nine**" and,
two paragraphs later, "on **all ten** levels 0.7842". The first is a narrative
snapshot at @37 and the second is current; a reader meeting "every measured level …
all nine" first has no way to know which is live.

---

## R-9 (MEDIUM). h₂'s control-corrected exponent: 19 terms or 21? The home carries both, and its arithmetic does not reproduce. NEEDS COMPUTE.

**Two families of statement in the summary layer.**

*Nineteen terms:*
- `G2-STATE.md` §3a: "raw exponent fit, h2, **19 terms**, x-frame | 1.847 ± 0.035"
  and "control-corrected exponent, h2 | **1.57 ± 0.06** stat".
- `paper/moire-primes.md`:514: "1.57 ± 0.06 on **the 19 terms** of the dominating h₂".
- `paper/beta2-note.md`:218: "1.57 ± 0.06 for the dominating h₂ of Ziller and
  Morack, **whose 19 terms give the longer lever**".

*Twenty-one terms:*
- `ZONE-POSTULATE.md`:185-186: "Ziller and Morack's h₂, which dominates G₂
  pointwise, **reads 1.567 in the same frame over 21 terms**."
- `THE-DIALS.md`:290-291: "Ziller and Morack's adversarial h₂ … **measures 1.567 in
  the same frame over 21 terms**."

**The home carries both**, `research/exponent-control.md`. §5's answer table says
"raw fit, h2, **19 terms**, x-frame | 1.847 ± 0.035" → "control-corrected, h2 |
**1.57 ± 0.06**". §6 says:

> "U-FRAME §6a's α = 1.653 on **all 21 terms** is the θ frame; **the same 21 terms
> read 1.924 against x**, and the Zone Postulate threshold p_n² is an x-frame
> quantity. The control's bias is **+0.282 in x** and +0.220 in θ, so after
> correction **the frames land at 1.567 and 1.493** and most of the disagreement
> cancels."

**The arithmetic in §6 does not reproduce.** 1.924 − 0.282 = 1.642, not 1.567.
1.653 − 0.220 = 1.433, not 1.493. Whereas §5's 19-term raw 1.847 − 0.282 = 1.565,
which *is* 1.57. So 1.567 appears to be the 19-term correction, presented in §6 as
the 21-term one, and the two downstream documents inherited the 21-term attribution.

**Nature of the defect.** Not a range collapsed to an end, but the same number
carrying two different sample sizes across the summary layer, with the home's own
derivation not reconstructible from its stated inputs. A referee checking "1.567
over 21 terms" against `exponent-control.md` §5 finds 19.

**Marked NEEDS COMPUTE.** Settling this requires re-running the estimator on both
prefixes in both frames; it should not be settled by editing. `research/exponent-control.js`
is the artifact.

---

## R-10 (LOW-MED). `G2-STATE.md` §2 widens the G₂ ≥ g verification past its home.

**`G2-STATE.md` §2**, first bullet:

> "**G2 ≥ g(x#) = h(x#) (PROVEN, VERIFIED at ten shared terms).** … `two-class-lower-bounds.md`
> §1. **Ratios 1.00 to 8.00 over the twelve terms**, growing without settling."

**The home**, `research/two-class-lower-bounds.md`:64-65:

> "`G2 >= g` is the important one and it was not being used. **VERIFIED** at all
> **ten shared terms (2.00, 3.00, 3.00, 3.00, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00**
> as …)"

**Three other summary sites agree with the home**, not with G2-STATE:
`ZONE-POSTULATE.md`:80-81 ("VERIFIED at all ten shared terms, ratios **2.00 to
8.00**"), `THE-DIALS.md`:273-274 (same words), `PRIOR-ART.md`:216-227 (the
calibration table, ten rows, x = 5 to 37, ratio column 2.00 → 8.00).

**The flattening.** One bullet states a verification scope of ten and then quotes a
ratio range over twelve, widening the low end from 2.00 to 1.00. The 1.00 comes
from x = 2, where G₂ = h = 2 — the one term at which the inequality is an equality,
which is exactly the term that makes the bound look tight. It is a small widening in
the unfavourable direction for the claim, which is why it is LOW-MED rather than
higher, but the scope and the range in one sentence disagree.

**Home**: `two-class-lower-bounds.md` §1.

---

## R-11 (LOW-MED). The flagship states the sufficient condition with the wrong slack.

**`paper/moire-primes.md`** §8:

> "If **G₂(n) < p²ₙ₊₁ − pₙ** infinitely often, TPC follows (crystallization + Zone
> Equivalence)…"

**The home**, `research/ZONE-POSTULATE.md` §3, the Gap Reformulation:

> "Hence **G₂(p#) < p′² − 2** implies the Zone Postulate at p."

repeated at `G2-STATE.md` §1b ("**G2(x#) < x′² − 2** ⟹ Zone Postulate at x"),
`G2-STATE.md` §3a's target row ("G2(x#) < x′² − 2, i.e. exponent 2"),
`THE-DIALS.md` §6 ("**G₂(p#) < p′² − 2 ⇒ Zone Postulate at p ⇒ TPC**") and
`ZONE-POSTULATE.md` §6 route A.

**Nature.** `− pₙ` is a *stronger* requirement than `− 2`, so the paper's statement
is sufficient and not false. But it misstates the target by making it harder than
the reduction needs, in the paper's own summary of what would prove the conjecture,
against four sites that agree on `− 2`. Worth noting that `p²ₙ₊₁ − pₙ` is exactly
Ziller and Morack's published condition (`PRIOR-ART.md`:66-67, A288815's comment),
so the paper may be conflating our reduction with theirs. That distinction is one
the corpus otherwise guards carefully ("DO NOT claim the reduction. Cite them.").

**Home**: `ZONE-POSTULATE.md` §3.

---

## R-12 (LOW-MED). "Never before stated", against the same paper's own qualification.

**`paper/moire-primes.md`** §3 opening:

> "The Copying Theorem says slots multiply; the lens asks *who begets whom*. The
> answers turn out to be exact, verified, and — as far as the audit could find —
> **never before stated**."

**The same paper**, §9, on exactly those results:

> "The genealogy results (zero orphans, three houses, birth cohorts, frozen shares),
> the Exact Invariance Lemma, the Seam Lemma and the Unification Law as a single
> stated curve are not in Holt's corpus and we have found them nowhere else, **but
> they sit close to his population models and that adjacency is stated rather than
> resolved**."

**The flattening.** §9's verdict has two clauses and §3 carries only the first. §3
retains the hedge "as far as the audit could find", so this is not an unqualified
novelty claim, but the specific reservation the audit attached — proximity to Holt's
population models, explicitly unresolved — does not travel. Two novelty verdicts
have moved in this campaign (Holt, de Polignac), and the campaign's own standing
note says any remaining novelty claim in that area wants a literature check.

**Home**: §9 of the same document, which is where the audit's verdicts live.

---

## R-13 (LOW). "Halves the band" against "removes about 71%".

Same quantity, three renderings, all about full Brüdern-Fouvry decoupling taking the
proven exponent from 4.2665 to 1 + √e ≈ 2.649 against a target of 2:

- `ZONE-POSTULATE.md` §6 route A: "Full decoupling would give 1 + √e ≈ 2.649, which
  **removes about 71%** of the open band and does not finish." (Exact: the band
  (2, 4.2665] has length 2.2665; 1.6175/2.2665 = 71.4%.)
- `paper/wall-note.md` Face 4: "full decoupling gives 1 + √e ≈ 2.649, which **cuts
  the open band by more than half**."
- `G2-STATE.md` §5 route A and §9 item 1, and `TODO.md` item 0: "**which halves the
  band** without finishing."

**Nature.** Not a false statement — 71% removed is more than half — but the entry
document and the work queue quote the weakest of three renderings of one exactly
computable figure, and a reader comparing them cannot tell whether "halves" and
"71%" are two estimates or one. Low consequence, listed because it is the same
mechanism as R-3 running in the conservative direction.

**Home**: `ZONE-POSTULATE.md` §6 gives the number.

---

## R-14 (LOW). The anchored typicality measurement's scope drifts across three documents.

- `research/anchored-calm.md` status table: "**Anchored Typicality Measurement** |
  MEASURED, no proof mechanism in sight | scope: **@13, @17, @19**".
- Same document, "The two numbers the table stands on": "The Anchored Typicality
  Measurement is Σdev(0,q)²/ΣV_fused = **0.935 at @13 and 0.939 at @17**, with mean
  position percentiles 47.9% and 47.8%." Two levels, not three.
- `README.md`:108-109: "the step joining the mechanism to the anchor is **measured at
  ≈ 0.94** with no proof mechanism in sight." No level.
- `paper/anchored-note.md`:417: "One further leg remains measured only: **the 0.94
  anchored typicality one level down**." No level.

**Nature.** The status-only document — which exists precisely so that summaries can
copy a scope correctly — gives a three-level scope supported by two numbers, and both
summaries drop the level entirely. ≈ 0.94 is a fair rounding of both quoted values,
so no number is wrong; what is missing is which levels the measurement covers, in
the one row of `anchored-calm.md` graded "no proof mechanism in sight".

**Home**: `natal-cap-19-calm-lemma.md` §"What Lemmas 1–3 do and do not give", per
`anchored-calm.md`'s own home column. I did not open it; the internal mismatch
inside `anchored-calm.md` is enough to flag, and the home is where the scope
question should be settled.

---

## R-15 (LOW). Two novelty scopes in one README line.

**`README.md`**:56, the Map row for Paper II:

> "Paper II: G₂ ≪ p^{4.267+ε}, **the first two-class Jacobsthal bound of any kind**,
> plus **the first two-class lower bound**, G₂ ≫ x·log x·logloglog x/loglog x…"

**The home**, `G2-STATE.md` §8's ownership table, keeps the two phrases apart:

> | G2(x#) ≪_ε x^{4.2665+ε} | PROVEN | **the first upper bound at any exponent** for the two-class problem, per the audit |
> | G2(x#) ≥ g(x#) pointwise, and with it **the first lower bound of any kind** for a two-class Jacobsthal function | PROVEN, trivial | … |

and `README.md`'s own §Status, twenty lines later, uses the home's wording: "the
first two-class Jacobsthal bound **at any exponent**" (:72-73) and "the first lower
bound **of any kind**" (:80).

**Nature.** "Of any kind" applied to the upper bound is a strictly broader novelty
claim than "at any exponent", and it makes the row's second clause redundant, since
a first bound of any kind would already include the lower one. One line, two
different novelty scopes, and the same file gets it right elsewhere.

**Home**: `G2-STATE.md` §8.

---

## Checked and NOT reported

These looked like the defect and are not, or are already adjudicated. Recorded so
the next pass does not spend the same time.

- **`gate-multiplies.md`:504**, "The branch of the answer, `0.58 ln p` against a
  target of O(1), does not depend on them." Adjudicated in wave 3 (`applied-G`):
  the sentence is about which *branch* the answer is on, which 0.58 against 0.95
  does not change. Stands.
- **`gate-multiplies.md`:442**, "tightens to `L <= 0.19 p / ln p`" — §8.5's ρ = 2.4
  reading, legitimately single-ended and says so.
- **The whole 0.58-to-0.95 axis is now clean in the working corpus.** All ten
  surviving sites carry the range: `TODO.md`:80, `gate-multiplies.md`:390 and :476,
  `U-FRAME.md`:384, :599, :696, `a3-03-f-from-census.md`:112,
  `a3-09-histogram-operator.md`:184, `a3-05-bound-L.md`:254. Grep validated against
  a known positive: the same pattern still returns the flattened form from
  `research/history/staging/changelog-add-G.md`:147 and `applied-G.md`:224, so a
  zero from it means something.
- **The L = 35.5 band.** `f-decays.md`:89-92 carries the 30.8-to-42.9 band as wave 3
  required, and no other working `.md` quotes 35.5. `a3-03-f-from-census.js` carries
  it in pasted output and is exempt.
- **"One sighting, not four".** Consistent at `NATAL-CAP-CAMPAIGN.md`:77,
  `GLOSSARY.md`:260 and `moire-primes.md`:591. Wave 3's fix landed.
- **The X-limitation three-level scope** at `README.md`:97-99, `GLOSSARY.md`:271-276
  and `TODO.md`:255-259 — all correct. Only the papers' justification clause is
  wrong (R-2).
- **The Structured-Bias Theorem** in `README.md`'s proven list: its home,
  `natal-cap-12-overlap-sign.md` §T1, states it "For every pair (q,q′) at every
  level x". No scope to drop.
- **The Aggregate 30-Skeleton Bound.** `anchored-calm.md`, `GLOSSARY.md`:285-289,
  `TODO.md` item 4 and `anchored-note.md`:401-412 all carry "certified at six levels
  @11..@29" with the all-x form named OPEN. Wave 3's `proven`→`certified` fix held.
- **KKL's title against its use.** `moire-primes.md`'s reference gives the paper's
  actual title ("…with distinct moduli") while Door 5 uses its Theorem 3 on
  multiplicity s. `covering-dive.md`:91 verified Theorem 3 from the PDF and quotes
  it. The tension is in the source's own title, not in our restatement.
- **`e^{2γ}/4` at two precisions** (0.7931 / 0.79305) — recorded as deliberate in
  CHANGELOG:1389-1391.
- **`staircase-note.md`** read in full: the best-calibrated document in the suite.
  Its §6 correction of its own source script is the documented false-positive shape
  and must not be flagged.
- **`variance-note.md`** §§6-7 and abstract: nine levels, W = 7.4e12, the 0.611
  hypothesis with its "short lever arm" caveat, all consistent with `GLOSSARY.md`
  and `TODO.md` item 9.

---

## Coverage: what I did NOT sweep, and why

This is the part worth acting on.

**Deliberately out of scope, other agents own them:** `research/a3-05-bound-L.md`,
`research/localized-04-maxsum.md`, `research/level-ledger-tight.md`,
`research/oeis-*.md`, `research/audit-numbers.js`. Wave 3 flagged the first three as
"assume they are not clean" on precisely this axis; I checked only that their 0.58
sites now carry the range and left them otherwise untouched.

**Not swept at all, and each is a real gap:**

- **`research/U-FRAME.md` (772 lines) and its three children** `kappa-not-L.md`,
  `operator-and-pair-count.md`, `f-decays.md`. I grepped them for the specific
  quantities in R-3 and the 0.58 axis and read nothing else. U-FRAME carries 128
  inbound section pointers and is the live route's home; it is the largest unswept
  surface in the corpus on this axis.
- **`research/FOLD-PROFILE.md`** — grepped only. It owns the survival curve, the
  natal dispersion lemma and the lineage figures, and `README.md` sends readers to
  it directly.
- **The homes I opened only at the line I needed**: `gate-multiplies.md`,
  `two-class-lower-bounds.md`, `covering-dive.md`, `exponent-control.md`,
  `maxgap-law.md`, `natal-cap-31-calm-vs-kill.md`, `natal-cap-21-beyond-chebyshev.md`,
  `natal-cap-12-overlap-sign.md`, `natal-cap-27-t4-at13.js`. None was read end to
  end, so a scope error *inside* any of them would not have been seen.
- **`ATTACKS.md`, `ATTACKS2.md`, `ATTACKS3.md`, `OBSERVATIONS.md`** — not opened.
  These are REG scoreboards with one verdict per row, which is exactly the shape
  that loses a scope in transit, and no wave has audited them on this axis.
- **The ~50 `natal-cap-*.md` and `attack-*.md` leaf notes** — not swept. Correctly
  lower priority, but R-1 was found *in* a leaf artifact (a `.js` file, no less)
  contradicting the entry document, so the leaf layer is not safely assumed inert.
- **`research/*.js` generally.** R-1 turned on reading one script's READINGS block.
  There are 128 more, they are exempt from history migration, and no pass in this
  campaign has compared a script's own reading against the summary that cites it.
  **This is the coverage gap I would spend the next wave on.**
- **`paper/variance-note.md` §§1-5** and **`paper/moire-primes.md`'s** reference
  list beyond spot checks.
- **`web/` and `attestation/`** — not opened, out of scope by construction.

**Two method notes for the shepherd.**

1. **R-1 is a warning about this campaign's own output.** It exists because a wave-2
   decision was taken from a document's "Next steps" section rather than from the
   artifact that had already executed those steps, and the conclusion was then
   written into `README.md` and `TODO.md` as fact. The campaign's lesson 3
   (agreement is not independence) has a mirror image: **a document's own statement
   of what has not been done is stale by construction the moment it is done.** Every
   "not yet run", "never started", "remaining" and "exactly one … exists today" in
   the corpus is a claim about the *absence* of an artifact, and absence claims are
   the ones no citation check can test.
2. **I did not word-diff every near-duplicate pair I met**, only the ones supporting
   R-1 and R-2. The `transfers` check plus the wave-3 ADJUDICATED ledger covers the
   pairs that are near-duplicates by fingerprint; what it cannot cover is a pair that
   has been paraphrased far enough to fall below the similarity threshold while
   still losing a hypothesis. R-2 is exactly that shape: two paragraphs saying the
   same wrong thing in different words, neither flagged by anything.
