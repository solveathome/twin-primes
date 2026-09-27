# Partition U (wave 6): `research/ATTACKS.md` and `research/ATTACKS2.md`, swept claim by claim

<!-- ledger
id: Q-qc-wave6-U
status: ANSWERED
todo: none
question: Do ATTACKS.md and ATTACKS2.md say what the corpus above them says?
verdict: Fifteen findings on 57 lines, led by a campaign verdict awarding theorem-grade to a curve its own home marks MEASURED and Hardy-Littlewood-conditional, the rich vein still logged as an unexplained novelty, and the anchored-window programme called unexplored where a research note and a 34 kB paper exist; six of the fifteen turn on a frozen-record-versus-current-state decision nobody has made.
-->

Both files live under `research/`, not at repo root. `ATTACKS.md` is 23 lines,
`ATTACKS2.md` is 34. Small surface, high density: `qc-arch.md`:531 calls
`ATTACKS.md` "highest information density per token in the corpus", which is the
reason a defect here costs more per line than anywhere else.

**Custody of the two files.** `ATTACKS.md` last changed in wave 5 (`88d2287`),
which rewrote exactly one row (row 6) and touched nothing else.
`ATTACKS2.md` **has not been edited since `324252f`** — the audit wave. Waves 2,
4 and 5 all passed over it. Three earlier reports (`qc-scope-T.md` T-1,
`qc-compound.md` CC-8, `applied-D.md` handoff 3) each scheduled a fix to
`ATTACKS2.md` and each handed it to a partition that never arrived. That is the
single most important structural fact in this report: **every prior finding
against `ATTACKS2.md` is still live, verbatim.**

Nothing was edited. Twelve artifacts were opened, four scripts were re-run
(`attack-03`, `fold-profile-12`, `attack2-04-10`, plus a hand-computed density
check). No `.md` touched, no commit, no push.

---

## HIGH

<a id="u-1"></a>
### U-1 (HIGH). The campaign verdict awards "theorem-grade" to a curve its own home marks MEASURED, HL-conditional, and half-conjectural — and two waves already wrote the fix

**`research/ATTACKS2.md`:24-27**, verdict paragraph, exact text:

> "Two **theorem-grade results**: the **Unification Law** ρ(u) = e^{2γ}/u² →
> (e^γω(u))² (one curve explaining the cap, the trough, the kill shadow, and the
> p³ law — derived independently by two agents) and the **Exact Invariance
> Lemma** (fossil depth frozen at birth, unconditional — proved independently
> twice)."

and **`ATTACKS2.md`:15**, row 5's status cell:

> "✅ **DONE, CLOSED** (attack2-05-07-integral-ladder.js): **THE UNIFICATION
> LAW** ρ(u) = e^{2γ}/u² (u ≤ 2), continuing as (e^γω(u))² on 2 ≤ u ≤ 3;
> verified ~1% everywhere."

**What the artifacts say.**

`research/attack2-05-07-integral-ladder.js`, reading A5-1 (last two lines):

> "Centerpiece-grade for the paper; **the [2,3] independence-squared step
> remains a conjecture** (exact on [1,2])."

`research/attack2-03-09-depth-formula.js`, reading 5, which is titled "Honest
scope":

> "R(x;b) is **Hardy–Littlewood-conditional** (exact on u in [1,2] given HL;
> standard factorization heuristic on (2,3]); its empirical success is another
> HL confirmation inside the framework, **not an unconditional theorem**. The
> Invariance Lemma, by contrast, is unconditional, exact, and one line deep."

`research/GLOSSARY.md`:185-186, the term's home entry, already corrected:

> "**Unification Law** (**MEASURED to ~1%, Hardy-Littlewood-conditional; ω(u) is
> Buchstab's survival function**) — one curve governs local twin density…"

`research/origin-excess.md`:36-40:

> "The third, that ρ attains its minimum exactly at u = 2, is **INFERRED** from
> the squared-Buchstab form (e^γω(u))² and **is not proven here**."

`research/PRIOR-ART.md`:322-334 attributes ω(u) to Buchstab via Cheer–Goldston
and closes "It is the Buchstab function."

**Why this is the worst finding in the partition.** Row 3 of the *same table*,
`ATTACKS2.md`:13, ends with the words "HL-conditional". Row 5, describing the
same curve, ends with "verified ~1% everywhere" and no marker at all, and the
verdict eleven lines below promotes it to "theorem-grade". The file contradicts
itself, and the half a reader will quote is the half in bold in the verdict.

**Two prior waves wrote the replacement and neither could apply it.**
`qc-compound.md` CC-8(d): "`research/ATTACKS2.md`:24-27 (apply B-1's replacement
verbatim, which already says 'It is not a theorem'); `research/ATTACKS2.md`:13,
:15 (add the conditionality marker to #5's 'DONE, CLOSED' row)".
`applied-D.md` handoff 3: "`research/ATTACKS2.md`:24 — the Unification Law's ω(u)
is Buchstab's and is unattributed there… I applied the calibration and the
attribution in GLOSSARY; **ATTACKS2 is partition G's**." Partition G never
touched the file. CC-8's own acceptance test is the sentence that is still on
disk: *"Test applied: 'theorem-grade: the Unification Law' is unwritable once the
name denotes an umbrella."*

**Not in scope of this finding:** the Exact Invariance Lemma half of the same
sentence is CORRECT. `attack2-03-09` reading 1 and `attack2-02-08` reading 1 are
two independent CRT proofs, and `history/CHRONICLE.md`:56-57 records "also proven
twice independently". "Derived independently by two agents" for the Unification
Law is likewise supported (`attack2-03-09` reading 2 and `attack2-05-07` A5-1 are
two different derivations, and CHRONICLE.md:54-55 says "derived independently
twice"). The defect is the calibration word, not the provenance.

**Confidence: HIGH.** Basis: four artifacts, three of them the cited ones,
plus two prior reports that reached the same verdict independently of me. Note
per the brief's rule: `GLOSSARY.md`, `qc-compound.md` and `applied-D.md` are
**not** three independent witnesses — CC-8 and applied-D are two partitions of
one wave. `attack2-05-07` and `attack2-03-09` are the independent ones.

---

<a id="u-2"></a>
### U-2 (HIGH). The rich vein is still logged twice as the wave's one unexplained novelty, and the seam anti-shadow beside it is dead from the same script

**`research/ATTACKS2.md`:12**, row 2 status cell, closing:

> "Seams = anti-shadow (**4× over-represented in richest windows**). **NOVELTY:
> unexplained rich vein [1667,1956) mod 2310, non-seam, non-p².**"

**`research/ATTACKS2.md`:32-33**, campaign verdict:

> "**One unexplained novelty logged: the rich vein at [1667,1956) mod 2310.**"

**The artifact**, `research/attack2-rich-vein.js`, a same-day follow-up that
`ATTACKS2.md` does not cite anywhere. Reading 5:

> "**VERDICT: REAL STRUCTURE, KNOWN MECHANISM, NO NEW PHYSICS.** … Mechanism,
> fully stated: 20-of-135 T11 slots in 289 positions (layout luck of the
> level-11 tile, mirror-symmetric), propagated exactly by uniform CRT survival,
> topped by a favorable mod-13/17 class layout that lets 4 copies per 510510
> reach the width-289 T17 ceiling."

Reading 2: "so do 57 other offsets (2.5% of all), in 5 mirror-paired runs. So
'anomalously rich' = 'one of the ~5 maximal regions of the T11 tile', not a
unique feature."

Reading 4 kills the *other* half of the same cell, the anti-shadow:

> "And tomography's 'richest windows align with seams' **is the SAME
> phenomenon**: the 62 seam-containing max windows **are the wrap-runs
> 2063-2267, i.e. the ceiling-plateau segment that happens to straddle 0** —
> seam-richness and the vein are both faces of the T11 ceiling plateau."

**Downstream state.** `paper/moire-primes.md`:604 already reads "the rich vein is
solved (a T₁₁ ceiling plateau, `research/attack2-rich-vein.js`)".
`attack2-02-08-tomography.js` received a supersession banner in wave 5 naming
readings 3b and 3c as fallen. `ATTACKS2.md` is now the only live site holding the
dead version, and it holds it **twice**, once in the row and once in the verdict
sentence a reader is most likely to lift.

Previously found as `qc-scope-T.md` T-1 and `qc-scripts-S2.md` S2-16. Both were
EVIDENCE-only and neither owner edited the file. **Re-confirmed live at HEAD.**

**Confidence: HIGH.** Basis: the refuting script read in full; the two dead
sentences read at HEAD.

---

<a id="u-3"></a>
### U-3 (HIGH). The scoreboard calls the anchored-window programme "unexplored". It has a research note and a 34 KB paper titled after it.

**`research/ATTACKS.md`:20**, attack 10 status cell:

> "The zone sits at the phase boundary; **anchored windows vs random windows =
> the framework's most original unexplored formalization target.**"

This is an absence claim, so it was run through the brief's directory
discipline rather than accepted:

```
$ ls -la paper/
-rw-r--r--  33812 Aug 18 07:00 anchored-note.md
$ head -1 paper/anchored-note.md
# Anchored versus random windows
```

`paper/anchored-note.md`:3-5: "*(Research note, 2026-08-17. **Ten exactly
computed levels of β through @41**, where W = 3.04·10¹⁴ and the current
arithmetic stops; ensemble variance certified through @37. Feeds Paper I §8(i)
and Paper III.)*"

`research/anchored-windows.md` is the research-layer note, with §3 the life-cycle
law and §4 the dip constant. `research/anchored-calm.md`, `research/U-FRAME.md`
and the 38-script natal-cap campaign all sit on the same object;
`natal-cap-31-calm-vs-kill.md`:144 states "anchored windows fuse [PROVEN, cap-19
L1–L2]".

The phrase is scoped to "the framework's", i.e. it is an internal absence claim,
and internally it is simply false — the formalization is the largest single body
of work in the repo. (Externally the picture differs and the honest wording is
`PRIOR-ART.md`:369, "The anchored half is untouched, and is the whole game",
which is about the literature, not about us.)

Previously found as `qc-scope-T.md` T-4 (MED-HIGH). Wave 5's `ATTACKS.md` diff
touched only row 6. **Re-confirmed live at HEAD.** I rank it HIGH rather than
MED-HIGH because it is the one sentence in the file that tells a reader what to
work on next, and it points at work already done.

**Confidence: HIGH.** Basis: `ls` of `paper/`, the paper's own title line, plus
five research documents.

---

<a id="u-4"></a>
### U-4 (HIGH, NEW). "Matches measurement to 4 decimals at every depth" — the cited script prints a 0.65% miss at the deepest measured seam, and says so in the same sentence the index quoted half of

**`research/ATTACKS2.md`:14**, row 4 status cell:

> "DONE (attack2-04-10-hierarchy-oeis.js): copy-law prediction E(m)=d_m^loc/δ_m
> **matches measurement to 4 decimals at every depth**; E(m) → c_W/δ_m ~
> c_W·log²p_m."

**Re-ran the cited script** (`node research/attack2-04-10-hierarchy-oeis.js`,
exit 0, seconds; output reproduces the pasted block exactly):

```
m=3 | 30      | 323322 | ... | meas/pred 1.0000
m=4 | 210     | 46188  | ... | meas/pred 1.0000
m=5 | 2310    | 4198   | ... | meas/pred 0.9999
m=6 | 30030   | 322    | ... | meas/pred 0.9998
m=7 | 510510  | 18     | ... | meas/pred 0.9935
```

0.9935 is **0.65% off**, i.e. agreement to two decimal places, at the deepest of
the five measured depths. The script's own reading 1 states both halves:

> "Predicted enrichment E(m) = d_m^loc([-W,W]) / delta_m matches measurement to 4
> decimal places at every depth (**worst 0.65% at m=7, which has only 18 seams =
> 3798 window positions**)."

`ATTACKS2.md` copied the clause and dropped the parenthesis, which is the only
part of the sentence that makes the clause true. As it stands the index asserts
of five depths something that holds at four.

The script's fit-check block, also reproduced on re-run, gives the same story a
second way: `m=7: measured ratio 1.187 = 0.0518 / delta_m (predicted c_W=0.0521)`.

The second half of the cell, "E(m) → c_W/δ_m ~ c_W·log²p_m", drops the
hypothesis reading 2 attaches to it: the freeze is **at fixed W** ("for fixed W
the numerator FREEZES once p_m > 2W+2"), and reading 2 also drops the twin
constant C from "c_W * C * log^2(p_m)". Minor beside the first half.

**Confidence: HIGH.** Basis: re-ran the script; the number is printed on the
console and in the pasted block and in the file's own caveat.

---

<a id="u-5"></a>
### U-5 (HIGH). "Quartic bound beats Chebyshev 35-40×" — the stated interval contains neither endpoint of the data

**`research/ATTACKS.md`:13**, attack 3 status cell:

> "✅ **DONE.** Kurtosis → 2.9 (Gaussian); **quartic bound beats Chebyshev
> 35-40×**; bonus: MIN window count over whole period = 9–12, nowhere near 0."

**Re-ran** `node research/attack-03-higher-moments.js` (3 lines, instant), output
byte-identical to the pasted block:

```
p=13  ... Chebyshev bound=1.16e-2  quartic bound=3.33e-4
p=17  ... Chebyshev bound=1.15e-2  quartic bound=3.78e-4
p=19  ... Chebyshev bound=9.27e-3  quartic bound=2.48e-4
```

Ratios: **34.8×, 30.4×, 37.4×**. The honest range is 30–37×. The interval
"35-40×" excludes two of the three levels at the bottom and its top end is above
the maximum. The error originates in the script's own reading 2 ("~35-40x"),
which `ATTACKS.md` copied faithfully, so both sites carry it.

Previously found as `qc-numbers.md` Q7.1 (wave 4). Neither site was fixed.
**Re-confirmed live at HEAD by re-running.**

**Cleared alongside it, and it must not be "reconciled":** `ATTACKS.md`:17's
"57× better than Chebyshev" is a *different* object — attack 7's LP-optimised
degree-4 certificate, 1.62e-4 at p = 19 against attack-03's Chebyshev 9.27e-3 =
57.2×, and against attack-07's own Cantelli 9.18e-3 = 56.7×. Row 7 is CLEAN.
(`attack-07` reading 1's own "Chebyshev ~60x" is the loose one, and it computes
Cantelli; that is a script defect, not an index one.)

**Confidence: HIGH.** Basis: re-ran the script and divided its own numbers.

---

## MED

<a id="u-6"></a>
### U-6 (MED, NEW). "A seam position is … no more likely than average to be a twin PRIME" drops the conditional that makes it true, and the 25× beside it is printed by no artifact

**`research/ATTACKS2.md`:11**, row 1 status cell, final sentence:

> "**A seam position is 25× more likely than average to be a SLOT and no more
> likely than average to be a twin PRIME.**"

**The cited artifact says the opposite of the second clause.**
`research/attack2-01-06-seam-census.js` reading 1 is titled:

> "**THE SEAMS ARE REAL-TWIN FACTORIES, AT EXACTLY THE PREDICTED RATE.** …
> confirmed to 0.2-0.6% over four primorials and ~900,000 actual seam twins — **a
> 10x to 20.2x enrichment over generic positions of the same magnitude**."

Its pasted output gives S/B = 9.983, 13.985, 17.015, 20.101 — those are actual
twin **primes** per seam against generic integers of the same size. So a seam
position is up to 20× more likely than average to be a twin prime, which is the
wave's headline result and is stated correctly in the *first* half of the same
row ("10×/14×/17×/20×").

The intended statement is the one its home keeps. `research/GLOSSARY.md`:47-48:

> "and **conditional on being a slot** it is not more likely than average to be a
> twin prime"

`ATTACKS2.md` drops "conditional on being a slot" from the clause a reader
quotes, leaving a sentence that contradicts the same row eight words earlier.

**The 25× has no artifact.** Grepped every `.js` for `25×`, `25x`, `25.5`,
`25.6`, `25 times`, after first confirming the pattern class works against a
known positive (`grep -l "20\.2"` fires on `attack2-01-06-seam-census.js`, which
does contain 20.2). Nothing in any script states a seam slot-enrichment of 25.
`attack2-01-06` computes 10 / 14 / 17.11 / 20.22 for P = 30…30030;
`fold-profile-12-anatomy-survival.js` (re-run, 2.3 s) prints seam survival ratios
and "20 seam slots, 1 of them genuine twin primes" and no enrichment factor at
all.

Recomputed the figure from the census:

```
T13: 1/delta = 20.22   T17: 22.92   T19: 25.61   T23: 28.05
fold-profile-12's T23 seams (multiples of 19#): 20 of 22 are T23 slots
  (20/22) / delta_23 = 25.50
```

So "25×" is arithmetically defensible **only at T19 / at the specific T23 seam
family fold-profile-12 measures**, and the same quantity is 10× at 5# and 28× at
23#. The index states it flat, one clause after listing 10–20× for the other
levels. `history/CHRONICLE.md`:58 records the wave without it ("seams are 10–20×
hotspots as POINTS").

**Also unsourced in the same cell, though correct:** "1 genuine twin pair from 20
seam slots **against 2.25 expected**". `fold-profile-12` prints "20 seam slots, 1
of them genuine twin primes, survival 0.0500 = 0.44x mean" and prints no 2.25;
the figure is 20 × 0.1126 (the tile mean survival implied by 0.0500 = 0.444×
mean) and is derivable but not printed.

**Confidence: HIGH** on the conditional-dropping (two artifacts read, one
re-run); **MEDIUM-HIGH** on the 25× being unsourced — the grep was
known-positive-checked, but a number this round could sit in a `.md` I did not
open. It is absent from every `.js` and from `attack2-01-06`, which is what the
row cites.

---

<a id="u-7"></a>
### U-7 (MED, NEW). "The origin carries 21% LESS than mean density" is an asymptote reached after stripping a measured factor; the raw measurements run 1.00 down to 0.912

**`research/ATTACKS.md`:20**, attack 10 status cell, final sentence:

> "At window S = x'², measured later, **the origin carries 21% LESS than mean
> density** (origin-excess.md)."

**The home**, `research/origin-excess.md`, states it three times and every one
carries a hedge the index drops.

Reading 8 (`:725-729`): "origin/mean at S = x′² is ρ(2), which **after dividing
out the window's own Hardy-Littlewood factor** reads 0.79303, 0.79475, 0.79668,
0.79863, 0.79922 at x = 1487…6037 against e^{2γ}/4 = 0.79305. The origin at the
zone's width is 21% below the tile's mean density, **asymptotically**."

The boxed statement at `:425-428`: "**The origin ceiling (MEASURED,
HL-conditional in its exact value)** … The raw ratio approaches it from above
like 1 + c/ln x; **the measured raw values run 1.00 at x = 181 down to 0.912 at
x = 6037.**"

And `:34-40`: "Two of the three legs are proven outright… The third, that ρ
attains its minimum exactly at u = 2, **is INFERRED** … and is not proven here."

So at every level actually enumerated the origin's deficit is between 0% and
8.8%. The 21% is the extrapolated limit of a ratio obtained by dividing out an
HL factor that is itself measured (1.0975 → 1.1412 down the same table). "Carries
21% LESS", stated flat and in the present tense, is the one number in the
sentence that was never directly measured.

**Confidence: HIGH.** Basis: the home document's own table and its own three
hedges, all in the file `ATTACKS.md` cites by name.

---

<a id="u-8"></a>
### U-8 (MED). The pigeonhole theorem is stated for every zone; the home states a hypothesis and explains why it is there

**`research/ATTACKS.md`:18**, attack 8:

> "✅ **DONE — THEOREM.** **Every zone (p,p²) contains two primes at distance ≤
> 2(1+o(1))·ln p, unconditionally** (crystallization+Chebyshev+pigeonhole);
> certified constant already 2.00 at p=1009."

**The home**, `paper/moire-primes.md` §7: "*Let **p ≥ 17** be prime…*", followed
by "**The hypothesis p ≥ 17 is where the Rosser–Schoenfeld input holds in the
form used**, and the o(1) is a statement about the limit rather than about any
single p, which is why the theorem is stated in the finite form first."

"Unconditionally" is correct in its own sense (no RH, no HL) and is not the
problem. What is dropped is the range hypothesis and the finite/limit split. The
script, `attack-08-pigeonhole-theorem.js` reading 1, has the same unrestricted
phrasing, so the scoreboard inherited it from the artifact rather than the paper;
the paper is the only statement with a proof attached and therefore governs.

Previously `qc-scope-T.md` T-12 (LOW-MED). **Re-confirmed live at HEAD.**

**Confidence: HIGH** that the hypothesis is dropped; the severity call (whether a
scoreboard row must carry p ≥ 17) is the adjudicator's.

---

<a id="u-9"></a>
### U-9 (MED, NEW). Wave 5's own replacement text for row 6 flattens the negative result it was written to import

**`research/ATTACKS.md`:16**, row 6, the cell wave 5 wrote:

> "…and its **reading 3 is a stated NEGATIVE RESULT over all 105 even d ≤ 210,
> no low-complexity statistic determines G_d**."

**The artifact**, `research/attack-06b-difference-map.js` reading 3, is titled
"**NO SIMPLE STATISTIC DETERMINES G_d WITHIN A DENSITY CLASS**" and its scope is
narrower than the index in three ways:

1. **"Within a density class."** Reading 1 of the same script says the opposite
   about density itself: "DENSITY SETS THE SCALE, confirmed across all 105
   differences: slot counts follow the Hardy-Littlewood hierarchy exactly". So a
   low-complexity statistic *does* determine the scale of G_d; what it does not
   determine is the residual inside a class. The index's flat "no low-complexity
   statistic determines G_d" contradicts the same script's reading 1.
2. **Three levels, not four.** The 105-difference sweep runs at 13#, 17# and 19#
   only. At 23# the script computes d = 2, 4, 8, 16 alone (its own output header:
   "level p=23, P#=223092870 (**d = 2,4,8,16 only**)").
3. **One surviving signal is dropped.** Reading 3: "Sole faint signal: d == +-2
   (mod 5) has a higher mean than d == +-1 (mod 5) at all three levels (78.3 vs
   73.5, 120.9 vs 113.0, 171.5 vs 166.6) — a consistent ~4-7% tilt … flag as
   unconfirmed, not a law."

Everything else in the rewritten cell verifies exactly: 19# gives 2:150 4:150
8:198 16:198, 23# gives 204/186/210/264, and reading 2 does say "Extending to
d=32,64,128 already kills v2-monotonicity at every level".

Worth recording as a method point: this is the campaign correcting a defect and
introducing a smaller one of the same class in the replacement, which is the
shape wave 5's commit message logged for lesson 13.

**Confidence: HIGH.** Basis: the script read in full, including the table
headers that bound the 23# run.

---

<a id="u-10"></a>
### U-10 (MED, NEW). "Growth matches HL scale" over a ratio the script's own output says fluctuates by a factor 400

**`research/ATTACKS2.md`:17**, row 7:

> "✅ DONE (attack2-05-07): m(n) computed to n=35; **growth matches HL scale
> m(n) ~ (pₙ/(e^γ ln pₙ))²**."

**The artifact**, `research/attack2-05-07-integral-ladder.js`, pasted output,
immediately after the 35 terms:

> "m/predictedScale **fluctuates 0.01..4.1** (exponential waiting-time scatter)
> **around a median ~0.8**."

and reading A7-2: "Our HL-derived scale … **tracks** the data (median ratio ~0.8
with the expected waiting-time scatter)."

"Matches" for a ratio spanning two and a half orders of magnitude with a median
of 0.8 is the strongest available reading of "tracks". The scatter is expected
and the finding is not in doubt; the word is.

**Confidence: HIGH.** Basis: the cited script's own pasted output line.

---

## LOW

<a id="u-11"></a>
### U-11 (LOW). "Confirmed to 0.2–0.6%" excludes two of the four measurements

`ATTACKS2.md`:11 and `GLOSSARY.md`:44 both say E(P) "VERIFIED to 0.2–0.6%".
`attack2-01-06`'s meas/pred column is 0.9983, 0.9989, 0.9944, 0.9940 — deviations
of **0.17%, 0.11%, 0.56%, 0.60%**. Two of four sit below the stated floor. The
interval understates the agreement, so this is a claim erring against itself, but
it is still an interval that contains neither of its own low endpoints.
Inherited from the script's reading 1. Same class as U-5, opposite direction.

**Confidence: HIGH** (arithmetic on the script's printed column).

---

<a id="u-12"></a>
### U-12 (LOW). The file's entire provenance line points at a session artifact that does not exist in the repo

**`research/ATTACKS2.md`:3**: "Based on the unified geography from **the
growth.txt session**".

```
$ grep -rn "growth.txt" .            # excluding .git
research/ATTACKS2.md:3
research/fossil-shadows.js:2
research/history/CHRONICLE.md:50
$ find . -iname "*growth*" -not -path "./.git/*"
./research/Lgrowth.js
```

Known-positive control for the pattern: `grep -rn "jumps.txt"` returns four hits
across `GLOSSARY.md`, `OBSERVATIONS.md`, `CHRONICLE.md` and
`paper/moire-primes.md`, so the pattern class finds session-file names when they
are cited. `growth.txt` is cited three times and exists nowhere.

**Mitigation, and it is why this is LOW not MED:** `history/CHRONICLE.md`:49-53
records the growth.txt session and its two outputs (fossil strata confirmed, the
Seam Lemma), so a reader has a landing place. This is nevertheless the same shape
as `qc-scripts-S2.md` S2-5's vanished `scratchpad/anchored-check.js`, and `refs`
cannot see it because "the growth.txt session" is prose, not a path.

**Confidence: HIGH** that the file is absent; the judgement that CHRONICLE
suffices as its home is the adjudicator's.

---

<a id="u-13"></a>
### U-13 (LOW, NEW). Two `attack2-` artifacts have no row in the index that claims all ten are complete

`ATTACKS2.md`:7 promises "Artifacts land as research files in code>output>readings
style" and `:22` heads the verdict "Campaign verdict (all ten complete)". Two
same-day `attack2-`-prefixed artifacts appear in no row:

| script | header line | why it matters |
|---|---|---|
| `attack2-rich-vein.js` | "ATTACK 2 FOLLOW-UP — THE RICH VEIN … (2026-08-14)" | it is the script that refutes rows 2 and the verdict (U-2) |
| `attack2-rankin2d.js` | "ATTACK2 — RANKIN-2D … (2026-08-14; the constructive/adversary side of covering-dive.md Q4)" | `qc-scripts-S2.md` rates it CLEAN and calls its "PRECISE DEFINITIONS … (do not paraphrase loosely)" block "the strongest anti-flattening device in the corpus" |

`S2-16` noted the first. The second is new here. `rankin2d` is arguably not one
of the ten and belongs to `covering-dive.md`, so the honest reading is that the
`attack2-` prefix is doing index work the index does not honour.

**Confidence: HIGH** (read both headers and all 34 lines of the index).

---

<a id="u-14"></a>
### U-14 (LOW, NEW). The two files of this partition use two different zones and neither labels the switch

- `ATTACKS.md`:3: "the frontier zone **(pₙ, p²ₙ₊₁)**" — matches
  `GLOSSARY.md`:159, "**Zone** — the quiet stretch **(p, p′²)**, where p′ is the
  next prime after p".
- `ATTACKS2.md`:6: "the **quiet stretch** (the zone **(p, p²)**, struck exactly
  once at p)".
- `ATTACKS.md`:18 also uses (p, p²), but there it is correct: its home,
  `paper/moire-primes.md` §7, states the pigeonhole theorem on (p, p²).

`ATTACKS2.md`'s parenthetical is *self*-consistent — "struck exactly once at p" is
true on (p, p²), where the only p-strike among slots is at r = p, and would need
qualification on (p, p′²), which also contains p². So the defect is the borrowed
name, not the arithmetic: `ATTACKS2.md` attaches the glossary's term "the quiet
stretch"/"the zone" to a strictly smaller interval than the glossary defines.

Flagged for the adjudicator only because the two files are read as one pair.

**Confidence: MEDIUM.** I verified the glossary definition and both index lines,
and reasoned the strike count myself rather than finding it computed anywhere.

---

<a id="u-15"></a>
### U-15 (LOW). "New empirical law" survives on a branch the corpus has since identified as Buchstab's

`ATTACKS.md`:12, attack 2: "cumulative equidistribution locks at ~p³ (**new
empirical law**)".

`attack-02-head-bias.js`'s 2026-08-17 banner, lines 19-20: "READING 2, the p^3
equidistribution law, stands; **it is the u >= 3 branch of the Unification
Law**." `GLOSSARY.md`:185 marks that law's ω(u) as "Buchstab's survival
function", and `PRIOR-ART.md`:322-334 closes the attribution: "It is the Buchstab
function."

The measurement is ours and is real. "New" as a novelty marker is what has gone
stale: the p³ lock is where the pair-Buchstab square reaches 1, and the curve is
prior art. The rest of the row 2 cell is fully current and correctly cites
`anchored-windows.md` §4, which I opened and which says exactly what the row says
(dip constant e^{2γ}/4 = 0.79305, the 0.895–0.899 a finite-size blend, "No e^γ/2
anywhere").

**Confidence: MEDIUM.** The chain (p³ branch → Unification Law → Buchstab →
prior art) is three links long and each link is stated somewhere different; no
single document says "the p³ law is prior art".

---

## Verified clean — recorded so the next wave does not re-spend the time

| claim | artifact | verdict |
|---|---|---|
| `ATTACKS.md`:11 row 1, "34% at 23#, 18.6% at 29#", "frozen actual-twin gap structure", "G₂'s deep growth is IRRELEVANT to the zone" | `attack-01` output+readings; corroborated at `FOLD-PROFILE.md`:542 ("gap growth further down the tile is irrelevant") and by the whole of `LOCALIZED-GAP.md` | CLEAN and still current |
| `ATTACKS.md`:12 row 2 apart from "new" (U-15) | `attack-02` banner + `anchored-windows.md` §4, both opened | CLEAN |
| `ATTACKS.md`:13 row 3 kurtosis 2.9, MIN 9–12 | re-ran `attack-03`: kurt 2.498/2.880/2.890, MIN 10/9/12 | CLEAN (only the 35-40×, U-5, fails) |
| `ATTACKS.md`:14 row 4, every figure | `natal-cap-02` output: ORACLE cap 117.3 vs N=90 at x=11; reading 4 "misses by 1.1 slots (15%)" at x=7; `attack-04` readings 1-2 for the smooth-conspiracy and mod-6-comb claims; `attack-04` reading 3 banner for the supersession | CLEAN — the strongest row in either file, and the 18%→15% repair from wave 4 landed |
| `ATTACKS.md`:15 row 5 | `attack-05` output: "empty annuli: 0", weakest are the tiny early annuli | CLEAN |
| `ATTACKS.md`:16 row 6, all figures | `attack-06b` 19# and 23# tables | figures CLEAN; only the scope, U-9 |
| `ATTACKS.md`:17 row 7, 1.6e-4 and 57× | `attack-07` output 1.62e-4 @ p=19; 9.27e-3/1.62e-4 = 57.2 | CLEAN |
| `ATTACKS.md`:19 row 9, 8% and ~2.0× | `attack-09` output: N(.9)/N(1) = 1.08/1.08/1.09; N(.5)/N(1) = 1.96/1.96/2.02 | CLEAN ("only 8%" is 9% at p=3001; not worth a finding) |
| `ATTACKS2.md`:4, "Seam Lemma: p−2 survive per level" | `fossil-shadows.js`:86, `genealogy.js`:49-52 (3/5/9/11 at p=5/7/11/13), `verify-ladder.js`:45. fold-profile-12's "20 of 22" is the *interior* count p−3 and `GLOSSARY.md`:163 states that split explicitly | CLEAN — checked because it looked like a mismatch and is not |
| `ATTACKS2.md`:11 row 1, "10×/14×/17×/20×", "sieved to 3·10⁹", survival 1.016/0.980/1.007/0.986 | `attack2-01-06` output; `fold-profile-12` re-run reproduces all four survival ratios | CLEAN (the trailing sentence is U-6, the interval is U-11) |
| `ATTACKS2.md`:12 row 2, "13's depth identical at 4 levels" | `attack2-02-08` ATTACK 2a: 0.957 at q=13,17,19,23 | CLEAN |
| `ATTACKS2.md`:13 row 3, every clause including "HL-conditional" | `attack2-03-09` readings 1-5; birth 0.827 vs pred 0.827 at b=4999 | CLEAN, and it is the best-calibrated row in either file |
| `ATTACKS2.md`:16 row 6, "1.002 ± 0.005", "20× at the pair" | `attack2-01-06` ATTACK 6: 1.0022±0.0054 and 1.0029±0.0052; 20.101 at P=30030 | CLEAN |
| `ATTACKS2.md`:18 row 8, "209 = 11·19, killed by 11 itself", "2.000δ / 0.800δ", "onset at p=17" | `attack2-02-08` ATTACK 8 block and readings 4-5; 11's pctile 86.97 vs the row's "87th" | CLEAN |
| `ATTACKS2.md`:19 row 9, "378 = 378" | `attack2-03-09` ATTACK 9 block | CLEAN |
| `ATTACKS2.md`:20 row 10, A060256 / count-sequence-absent / draft exists | `attack2-04-10` OEIS verdict block (re-run); `oeis-seam-submission.md` opened, still marked "Status: DRAFT", still blocked by the moratorium | CLEAN as an internal claim; the OEIS half is unverifiable here, see coverage |
| `ATTACKS2.md`:26-27 + :30-31, Invariance Lemma "proved independently twice", three refuted hypotheses | `attack2-02-08` r1 and `attack2-03-09` r1 are two CRT proofs; `CHRONICLE.md`:56-57; rows 6, 8, 9 are the three refutations | CLEAN |

---

## Mid-run adjudicator update (@19 driver, X-limitation, W/2): NOT PRESENT in this partition

Checked on instruction, as an absence claim, and therefore with a known-positive
control rather than on a bare zero.

**Control first.** The pattern class
`X-limitation | W/2 | loudest | Loudness | @13 upward | @11, @13` fires on twelve
files that do carry the material: `FOLD-PROFILE.md`, `GLOSSARY.md`,
`anchored-calm.md`, `natal-cap-19-calm-lemma.md`, `natal-cap-31-calm-vs-kill.md`,
`natal-cap-32-wrap-identity.md`, `natal-cap-36-skeleton-door.md`, `TODO.md`,
`README.md`, `paper/anchored-note.md`, `paper/moire-primes.md`,
`paper/wall-note.md`. The pattern works.

**Result on my two files.** `grep -n "X-limit|W/2|loud|Loud|@11|@13|@17|@19|VR|
rotation|ceiling|Ceiling" ATTACKS.md ATTACKS2.md` returns **zero matches** (exit
1). A second sweep on the adjacent vocabulary (`level|proven|certif|three|natal|
calm|variance`) returns eleven lines, all read: they are the Fourier certificate
row, the difference-hierarchy row, the LP row, the pigeonhole row, the Chen row,
and five `ATTACKS2` rows about seams and strata. **None concerns the natal-cap
campaign, rotations, variance ratio, or the X-limitation theorem.**

This is structural rather than lucky. Both files are scoreboards of the
2026-08-13 wall-attack wave and the 2026-08-14 copy-geography wave; the natal-cap
campaign, `natal-cap-31`'s Loudness Ceiling Conjecture and the X-limitation
theorem all postdate them and live in `NATAL-CAP-CAMPAIGN.md` and the `natal-cap-*`
files. The new artifact `research/natal-cap-38-loudness-driver.js` is present in
`research/` and is cited by neither of my files.

**Consequence for this report: none.** No finding above was rated clean on the
strength of agreeing with a home document that has since changed, and no finding
above touches the levels @11/@13/@17/@19 at all. The only per-level scope
question in my partition is U-8's `p ≥ 17` on the pigeonhole theorem, which is a
Rosser–Schoenfeld range condition in `paper/moire-primes.md` §7 and is unrelated.

---

## COVERAGE, and it is the section to read

**What fraction I actually traced.** `ATTACKS.md` has, by my count, **31
substantive claims** across ten rows plus preamble and closing; I traced **29**
to an artifact I opened, and re-ran the artifact for 4 of them. `ATTACKS2.md` has
**38** across ten rows plus preamble and verdict; I traced **34**, re-running the
artifact for 3. So roughly 91% traced, 10% re-run. Both files are short enough
that "read every line" was cheap; the cost was in the artifacts, and I opened
twelve of them plus five sister `.md` documents.

**The six claims I could not settle, and why.**

1. **"The count sequence is NOT in OEIS"** (`ATTACKS2.md`:20 and :29) and
   **"A060256 … carries NO formula"** (`:17`, `:30`). Both are absence claims
   about an external database. I have no network access and did not attempt one.
   `attack2-04-10` records "searched 2026-08-14" in both range conventions, and
   `oeis-seam-submission.md` says every cited A-number "was checked against
   oeis.org" — but that is one search by one agent on one day, restated by two
   documents that both descend from it. **Not independent, and now four days
   stale.** `PRIOR-ART.md` owns literature absence by the `absence` check's own
   routing; this should be routed there rather than believed here.
2. **"Derived independently by two agents"** (`ATTACKS2.md`:26). I confirmed two
   *derivations* exist in two scripts and that `CHRONICLE.md`:54 says
   "independently twice". I could not confirm "two agents" — that is a fact about
   the session, not about the repo, and no artifact records agent identity.
3. **`ATTACKS.md`:22-23's closing "Realistic goal"** is a statement of intent,
   not a claim, and I did not try to adjudicate it.
4. **`ATTACKS.md`:5's "based on the audit (PRIOR-ART.md)"** — I opened
   `PRIOR-ART.md` only at §Buchstab and §Maier. Whether all ten attacks were in
   fact derived from it is unfalsifiable from the file.
5. **The u ≤ 2 domain of the Unification Law.** `ATTACKS2.md`:15 writes
   "ρ(u) = e^{2γ}/u² (u ≤ 2)", which diverges as u → 0, whereas
   `FOLD-PROFILE.md`:174-176 describes the curve as falling "from e^{2γ} = 3.1722
   **at u = 1**" and `attack2-05-07` verifies only down to u = 1.2. The lower
   endpoint is unstated at three sites including the glossary, so it is a corpus
   convention rather than an `ATTACKS2` defect, and I did not raise it as a
   finding. **If the adjudicator wants it raised, it is a three-site fix, not
   one.**
6. **Whether `ATTACKS2.md`'s (p, p²) zone (U-14) is a deliberate convention.** I
   established both files' usage and the glossary's, but not which is intended.

**Scripts I chose not to run, and what that leaves unverified.**

- **`attack2-01-06-seam-census.js`** — sieves k to 10⁷ against a 55,001-prime
  table across four primorials, plus 800 segmented-sieve windows at n ~ 2·10⁹. I
  priced it above my 5-minute box from the source and did not start it. Its
  pasted output is therefore taken on the file's word for E(P), for the four
  meas/pred ratios I divided in U-11, and for the 1.002 ± 0.005 window result.
  `qc-scripts-S2.md` rates the file CLEAN but also did not re-run it. **This is
  the single largest unverified surface in my partition: three of ATTACKS2's ten
  rows rest on it.**
- **`attack2-05-07-integral-ladder.js`** — its ρ table is a sieve of [0, 10⁸] and
  its seam ladder runs Miller-Rabin to n = 35 on primorials past 10⁵⁰. Not
  started. So U-10's "0.01..4.1" and the u = 2 trough 0.788 are read, not
  reproduced. `origin-excess.md`:433 independently measures a trough of 0.86392
  at u = 2.0903 in a different window, which is consistent but is not the same
  cell.
- **`attack2-02-08-tomography.js`** and **`attack2-03-09-depth-formula.js`** —
  not run; the second walks bands to b = 4999. Their outputs are internally
  consistent and cross-check each other (3213 = 3213, 378 = 378, and 2-08's
  0.571/1.273/0.957/0.714/0.639 reappear as 3-09's birth column), which is real
  corroboration but is corroboration *between two files of one wave*, not
  independence.
- **`attack-05` and `attack-08`** — 10⁸ sieves. Not run. `qc-scripts-S2.md` also
  did not run them. Rows 5 and 8 are read-only in two consecutive waves now.
- **`attack2-rich-vein.js`** — not run. U-2 rests on its readings, which is
  sufficient for a supersession finding (the index asserts "unexplained"; the
  script asserts an explanation) but does not verify the explanation.

**What I suspect and could not prove.**

- **The `attack2-*` scripts have never been re-run by anyone.** `qc-scripts-S2.md`
  re-ran twelve of sixteen `fold-profile` scripts precisely because they carry no
  pasted output, and re-ran none of the seven `attack2` scripts because they all
  do. I re-ran one (`attack2-04-10`) and it reproduced byte-for-byte, which is
  mild evidence the family is honest. But `attack2-04-10` is the cheapest of the
  seven, and the two that carry the wave's two headline results —
  `attack2-01-06`'s E(P) and `attack2-05-07`'s ρ curve — are the two nobody has
  executed since 2026-08-14. **If one number in this partition is wrong in a way
  no reading catches, my bet is that it is in one of those two.**
- **The direction of staleness in this partition is fully inverted, and worse
  than S2 recorded.** S2's method note says the papers were swept and the indexes
  were not. What I found is sharper: `ATTACKS2.md` has not been *edited at all*
  in four waves, and three separate reports each assigned its fix to a partition
  that did not own it (`qc-scope-T` → unassigned; `qc-compound` CC-8 → sites
  list; `applied-D` → "partition G's"). The file is not under-swept for lack of
  attention. It is under-swept because **it was found three times and handed off
  three times.** The next wave's risk is a fourth hand-off, not a fourth miss.
- **`ATTACKS.md` row 2 is the corpus's best-maintained row and row 10 its worst,
  and they cite the same object.** Row 2 carries the full 2026-08-17 correction
  with the constant, the cap, the mortality and a section pointer. Row 10, four
  lines below, still calls the same programme unexplored and still states the
  origin deficit unhedged. Whoever repaired row 2 stopped one row short. I could
  not determine from `git log` which commit did it — `4636f31` (wave 2) is the
  only candidate and its diff is not in my partition's history.

**One thing I did not do that I think is worth doing.** `ATTACKS.md`:6-7 says
"Status updated as executed", and both files are dated scoreboards of waves that
closed on 2026-08-13 and 2026-08-14. `qc-scope-T.md`:271 already records the open
question — "Chris wants ATTACKS.md kept as a dated 2026-08-13 record (in which
case the whole …)". Six of my fifteen findings (U-2, U-3, U-4, U-6, U-10, U-15)
are supersessions that would not be defects at all under a frozen-record reading,
and would all need banners rather than edits. **That decision is upstream of
every fix in this report and nobody has made it.** Making it would cost one
sentence and would settle a third of the partition.
