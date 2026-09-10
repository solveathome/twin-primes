# Partition S2: the fold-profile and attack script families, swept

<!-- ledger
id: Q-qc-scripts-S2
status: ANSWERED
todo: none
question: Do the fold-profile and attack script families say what their own outputs say?
verdict: Thirteen defects over 34 scripts and 5,673 lines, five of them HIGH: an untested identification two later scripts had already killed, a printed reading refuted by its own table, a section that has printed only its header since it was written, and a reproduction pointer to a scratchpad that is gone; script-side ones fixed, document-side ones left as evidence, gate 0 on all seven checks.
-->

Wave 5, 2026-08-17. Owned surface: `research/fold-profile-*.js` (16) and
`research/attack*.js` (18), 34 files, 5,673 lines. Every one was opened, its
header, its pasted OUTPUT block and its READINGS block read against every
document citing it. Twelve of the sixteen fold-profile scripts were re-run,
because none of them carries a pasted output block and their numbers could not
otherwise be checked at all.

Gates at hand-back: `node research/qc.js` **0 on all seven checks**,
`node research/qc/selftest.js` **exits 0** (13 positives fire, 5 controls
silent), `node research/audit-numbers.js` **78/78 in 154 s**.

---

## The defects, ranked by consequence

### S2-1 (HIGH, script side, FIXED). `fold-profile-13` carried an untested identification that two later scripts had already killed

`fold-profile-13-hotspot-sweep.js`'s last printed line called the sub-binomial
variance deficit "an independent sighting of the anchored calm recorded in
NATAL-CAP-CAMPAIGN ... now seen in a fourth place and by a fifth method". It is
the last thing the script says, so it is what a reader takes away.

Two things are wrong with it. The session record that produced these scripts
lists under *What is still live*: "**Untested:** whether today's variance
deficit is the same object as the natal-cap campaign's 'anchored calm'. That
concerned slot dynamics and ensemble variance, a different measurement.
**Assumed nowhere**; needs its own test." It was assumed here, in the artifact
itself. And `fold-profile-16` then settled the question the other way: the
deficit survives with the tile normalisation removed entirely, so it is the
ordinary short-interval variance of twin primes, classical and expected, not an
anchored phenomenon at all. Confirmed by re-running both.

Fixed with a CORRECTION block that keeps the original wording visible. Also
bounded the "0.84 to 0.96 almost everywhere" claim: the 8000-bin rows sit at
1.38 with 4,273 exceedances, and the file did not say so.

### S2-2 (HIGH, document side, EVIDENCE). `ATTACKS.md` row 6 still carries a result `attack-06b` refuted, and calls the object unstudied

`research/ATTACKS.md`:16 reads, in full: "✅ **DONE.** Slot counts follow H-L
hierarchy exactly; SURPRISE: equal-density differences split (G_8=G_16=198 vs
G_2=G_4=150 at 19#) — gap extremes depend on offset arithmetic beyond density.
New unstudied object: d ↦ G_d."

`research/attack-06b-difference-map.js` reading 2 is titled "THE ATTACK-06
'SURPRISE' WAS A COINCIDENCE, NOT A LAW", and its 23# block shows the pairing
dissolving four ways (G_2=204, G_4=186, G_8=210, G_16=264). Its reading 3 is a
stated NEGATIVE RESULT over all 105 even d ≤ 210 at three levels. So the object
is not unstudied; it was studied exhaustively and the answer is that no
low-complexity statistic determines G_d.

`research/history/CHANGELOG.md`:1566 already lists "the d ↦ G_d v₂ pattern as a
level-19 coincidence" among this project's own killed claims, and
`paper/moire-primes.md`:544-547 carries the corrected version. **ATTACKS.md is
the only live site still asserting the dead one, and `attack-06b` is not named
anywhere in ATTACKS.md** even though its preamble promises "artifacts land as
`attack-NN-*.js`".

Home: `attack-06b-difference-map.js` readings 2 and 3, and `moire-primes.md`
§8. ATTACKS.md is the descendant and it is the one that is wrong.

### S2-3 (HIGH, document side, EVIDENCE). `web/PROPOSAL.md` repeats the same false absence

`web/PROPOSAL.md`:25: "the framework's open questions are still visual ones:
**the d ↦ G_d map is unstudied**, and where the monster gaps sit inside the tile
is described but not explained."

Same refutation as S2-2. The sentence two lines later removes `grain-census`
from that same list on exactly this ground ("used to head that list and no
longer belongs on it, since `research/grain-census.js` settled it"), so the edit
pass that pruned the list missed the item next to it. The honest replacement is
that `attack-06b` returned a negative result over d ≤ 210: no bounded invariant
of d predicts G_d, and the map is determined only by the full residue tuple.

### S2-4 (HIGH, document side, EVIDENCE). `anchored-windows.md` still presents a retired object as new and unexplained, in four places

`research/anchored-windows.md`:83 heads a section "**## 5. New object: the kill
shadow (measured, unexplained)**", offers a "Conjectured mechanism", says "we
found no prior study (cf. PRIOR-ART.md)", line 80 calls it "the **newly
measured** kill shadow", line 9 promises the note "reports one new measured
object (the kill shadow)", and line 136's status summary closes "New measured
object: the kill shadow ≈ 0.85 just past every zone."

Against that, `research/attack2-05-07-integral-ladder.js` reading A5-2 says in
terms: "**The kill shadow is no longer a separate object**: its ~0.85 depth is
the integral of this curve over the first octave past the zone edge. One
formula, whole geography." Its pasted output has ρ = 0.856 at u = 2.10 and 0.824
at u = 2.05, which is the band. `research/ATTACKS2.md`:15 records the same, and
`research/GLOSSARY.md`:187 goes further and retires the term outright: the
historical "kill shadow" is an "**absorbed term, no longer a separate object**".

So a live research document holds an object as new and unexplained that the
glossary has formally absorbed. `anchored-windows.md` never mentions the
Unification Law, `attack2-05-07`, or Buchstab anywhere.

### S2-5 (HIGH, custody, EVIDENCE, NEEDS COMPUTE to close). `anchored-windows.md`'s reproduction pointer is to a scratchpad that is gone, and two of its headline numbers have no surviving artifact

`anchored-windows.md` §7 "Verification code" says: "full source:
`scratchpad/anchored-check.js` (run 2026-08-13). Key outputs reproduced in
sections 3 and 5 above." There is no `scratchpad/` directory in the repo and no
file of that name anywhere. This is the shape wave 4 found in U-FRAME.

What is actually reproducible: `attack-10-anchored-origin.js` computes ρ at
X = 10⁴ across levels 11 to 97 and its pasted output ends at ρ = 1.029 at p = 97.
What is **not** reproducible from anything in the repo: §3's "peak 2.01 (β=.83)
→ 0.564 (β=.98) → 0 (β=1)" and the whole §5 kill-shadow table (four levels ×
eight windows, p = 23, 97, 401, 997). Grepped for the table's distinctive values
(0.834, 0.853, 0.564) across every `.js`: only incidental matches in unrelated
tables, checked against the known positive that `attack2-05-07` does contain
0.856. attack-10's own CORRECTION block quotes "peak ~2.0 measured at X=10^4",
a number attack-10 does not produce.

Cost to close: attack-10's sieve is window-only and takes under a second per
level; extending its prime list past 97 and adding the per-window ratio loop
would regenerate both, well under a minute. Not done here because
`anchored-windows.md` is not mine to edit and the fix belongs with the prose.

### S2-6 (MEDIUM, document side, EVIDENCE). The flagship's difference-map paragraph credits two files, neither of which contains the result

`paper/moire-primes.md`:540-547 states the 23# dissolution (G₄ = 186 < G₂ = 204
< G₈ = 210 < G₁₆ = 264), the normalized ranking with d = 6 on top, the Θ-growth
law and "d = 2 is mid-pack", and cites "(`research/attack-06`,
`attack2-04-10`)".

Every figure in that paragraph is `attack-06b-difference-map.js`'s.
`attack-06-difference-hierarchy.js` stops at 19# and has no 23# block, no
normalized ratios and no d beyond 30. `attack2-04-10-hierarchy-oeis.js` is the
seam hierarchy and the OEIS sequences and contains no difference-map content at
all. The `refs` check cannot see this: both cited files exist, so the pointer
resolves; it just points at the wrong artifact.

Two smaller things in the same sentence. "Every difference obeys the same
Θ-growth law as d = 2" is stated flat, where its home marks it "CONJECTURE (the
honest one)". And "mid-pack" is wrong, see S2-8.

### S2-7 (MEDIUM, document side, EVIDENCE). A z-range is attributed to a script that computes no z

`research/GLOSSARY.md`:49-53 and `paper/moire-primes.md`:569-572 both say seam
neighbourhoods "measure 1.016, 0.980, 1.007, 0.986 times the tile mean **against
400 random controls each (z = −1.41 to +0.13)**", citing
`research/fold-profile-12-anatomy-survival.js` alone.

Re-ran both scripts. `fold-profile-12` produces the four survival ratios exactly
(S4, half-widths 300 to 3·10⁵) but uses **one** control offset per width and
prints no z-score anywhere. The 400 random controls and the z-scores are
`fold-profile-13-hotspot-sweep.js`, whose own header lists them as "GAP 3" of
the three gaps in 12 that it was written to close. Worse, the two quoted z
values come from different tiles: −1.41 is T19 at half-width 3000, +0.13 is T23
at half-width 30000. So a four-row table from one script is fused with the
extremes of a six-row table from another across two tiles, under one citation.

Both sites need `fold-profile-13` added and the tile attached to the z range.

### S2-8 (MEDIUM, script side, FIXED). `attack-06b` reading 4 is refuted by its own printed table

Reading 4 says "d=2 sits **mid-pack** at 5.86". Recomputed the full ranking from
the script's own method (13#, 17#, 19#, three tile sieves, under 10 s total):

| level | d=2 normalized ratio | rank of 105 | G_2 | raw rank of 105 |
|---|---|---|---|---|
| 13# | 3.26 | **89** | 66 | 35 |
| 17# | 4.71 | **76** | 108 | 31 |
| 19# | 5.86 | **85** | 150 | 33 |

Normalized, d = 2 sits in the bottom quarter at all three levels, never
mid-pack. Mid-pack is the RAW picture. The reading conflated the two inside the
paragraph that is explicitly about normalization. Fixed in place with the ranks
recorded; the correction **strengthens** the reading's conclusion, which is that
difference 2 is one of the easy ones. `THE-DIALS.md`:121 and
`paper/moire-primes.md`:547 both inherited the word "mid-pack" and both need the
split (mid-pack raw, bottom quarter normalized).

### S2-9 (MEDIUM, script side, FIXED). `fold-profile-15` §S3 has printed its header and nothing else on every run since it was written

S3 is advertised in the file header as "the deficit at fixed h across tiles,
against the prediction 1/ln W". Its loop asked for h = 30,000, 75,000, 200,000
and skipped any row where a tile lacked that h. T17's whole window is 510,510
wide, so its h grid tops out at 12,000 and it has none of the three. Every row
was skipped, every time. Fixed by using h = 2,000, 5,000, 12,000, which all
three tiles carry. The section now prints, and its answer is negative: measured
ratios 1.145, 2.694, 4.747 against a prediction that is flat at 1.463, which is
the same "ran out of statistics" verdict 16's header already gives it.

### S2-10 (MEDIUM, script side, FIXED). `fold-profile-07`'s fold-budget table silently truncated at T₃₁

S2 built its prime table as `primesTo(200000)`. √(31#) is 447,840. The T₃₁ row
therefore reported **17,973** damaging folds and a "last damaging fold" of
**199,999**, both artifacts of the sieve limit. The true figures are **37,534**
and **447,829**. Fixed by raising the table to 500,000 and adding a guard that
withholds the row rather than truncating it if the root ever exceeds the table.
Rows T₁₁ through T₂₉ are unchanged and match `FOLD-PROFILE.md` §11 exactly. No
document carried the wrong row, so nothing downstream needs repair.

This is a second, still-live instance of the class the session record already
logged for this file ("Cofactor primality table too small in fold-profile-07").
That one was in S3/S4 and was fixed; this one is in S2 and was not.

### S2-11 (MEDIUM, script side, FIXED). `fold-profile-01` S2 asserted a prediction that fails at every fold, and said nothing about it

S2 was headed "PALINDROME TEST — the mirror r -> W-2-r predicts K(k) =
K(p-1-k)" and printed "FAILS at: T5 by 7, T7 by 11, T11 by 13, T13 by 17, T17 by
19, T19 by 23, T23 by 29", which is every fold it runs. No explanation, no
pointer.

The exact form is false and was known to be false: the involution fixes r = W−1
without shifting its representative, so one slot is unpaired. The true statement
is |K(k) − K(p−1−k)| ≤ 1, which is the Mirror Ledger theorem of
`FOLD-PROFILE.md` §4, derived in `fold-profile-02` S4 and verified there at 45
of 45 cells. Fixed: S2 now reports the exact-equality failure as the refutation
it is and tests the theorem's bound alongside it. **This also extends the Mirror
Ledger's verification**, which previously ran over p ≤ 43 at fixed tiles; the
seven ladder folds T₅ by 7 through T₂₃ by 29 all give max|K(k) − K(p−1−k)| = 1.

### S2-12 (MEDIUM, script side, FIXED). `fold-profile-14`'s control was unseeded and two sibling scripts quoted a range no later run reproduces

`fold-profile-14`'s synthetic control drew from `Math.random()`, so its column
was a different number on every run. `fold-profile-15` and `fold-profile-16`
both open by quoting "the synthetic control ... disperses at **0.993-1.014**".
Ten runs later, nothing in the corpus reproduces that range: the replicate means
land near 1.009, 0.994, 0.960 and individual replicates run 0.886 to 1.030.

Seeded the generator (mulberry32, seed 20260817) and verified two consecutive
runs are byte-identical. Corrected the quoted figures in 15 and 16 to the
reproducible ones, and added the caveat the range was hiding: the control's own
replicate scatter widens with width and at 800 bins spans 0.886 to 1.020, so the
800-bin comparison is the weakest of the three. The finding itself is unharmed;
the real column (0.9621, 0.9213, 0.8376) is deterministic and reproduced exactly.

### S2-13 (MEDIUM, script side, FIXED). `attack-10`'s header still asserted the claim its own correction block refutes

Header paragraph (b) read "In the n -> infinity limit the head is infinitely
enriched vs average." The CORRECTION forty-five lines below says the opposite:
ρ is capped at e^{2γ} ≈ 3.17 and then crashes to 0. `paper/anchored-note.md`:222
states "the correction is recorded in both files", which was true of the
readings and false of the header. Fixed with a pointer, correction untouched.

### S2-14 (MEDIUM, script side, FIXED). `attack-02` carried two superseded readings and no banner at all

Reading 1 closes "at fixed x the ratio tends to INFINITY with the level", the
same refuted divergence claim. Reading 3 ends "Unresolved; worth a dedicated
derivation" for the dip constant, a question `anchored-windows.md` §4 closed
(e^{2γ}/4 = 0.79305, not e^γ/2 = 0.8905; the measured 0.895-0.899 is a
finite-size blend) and `attack-10`'s own correction says it resolves. Reading 2,
the p³ equidistribution law, stands and is the u ≥ 3 branch of the Unification
Law.

`ATTACKS.md` row 2 already carries all of this correctly. The artifact under it
did not. Added a SUPERSEDED IN PART banner naming which reading falls and which
stands; nothing below it edited.

### S2-15 (MEDIUM, script side, FIXED). `attack2-02-08` reading 3 was superseded by its own same-day follow-up

Reading 3(b) reports "the richest windows align with seams: 52% of max-tied
windows contain a k*2310 seam vs 12.5% expected (4x), **confirming seams as the
anti-shadow**", and 3(c) logs a "Novelty: a rich vein at [1667,1956) mod 2310".
`attack2-rich-vein.js` reading 4 dissolves both into one thing: the 62
seam-containing windows are the wrap-runs 2063-2267, the segment of the T11
ceiling plateau that happens to straddle 0, and the vein is one of 58 tied
offsets in five mirror-paired runs. Its verdict 5 is "REAL STRUCTURE, KNOWN
MECHANISM, NO NEW PHYSICS". Banner added naming which readings fall (3b, 3c) and
which stand (1, 2, 4, 5).

### S2-16 (MEDIUM, document side, EVIDENCE). `ATTACKS2.md` still logs the rich vein as an unexplained novelty, twice

`research/ATTACKS2.md`:12 ends "NOVELTY: unexplained rich vein [1667,1956) mod
2310, non-seam, non-p²", and its campaign verdict at :32-33 closes "One
unexplained novelty logged: the rich vein at [1667,1956) mod 2310." Same
refutation as S2-15. `paper/moire-primes.md`:604 already reads "the rich vein is
solved (a T₁₁ ceiling plateau, `research/attack2-rich-vein.js`)", and ATTACKS2.md
has no row for `attack2-rich-vein.js` at all. Row 2's "Seams = anti-shadow (4×
over-represented in richest windows)" needs the same reframing.

### S2-17 (LOW, script side, FIXED). `attack-04`'s reading 3 sat forty lines below its banner with no local marker

The banner names readings 1 and 2 as the ones that survive.
`NATAL-CAP-CAMPAIGN.md` says explicitly that "**every** number in that column is
invalid, including the 'grows like 2ⁿ' reading and the 'misses the p = 11 zone
by only 18%' near-miss", which is reading 3 in its entirety. A reader landing on
reading 3 sees confident quantitative prose with no marker.

Added a one-line inline pointer at the head of reading 3 identifying it as the
invalidated column and naming the corrected artifact. **Nothing was stripped or
softened and no number was touched** (decision U5).

### S2-18 (LOW, script side, FIXED). `attack-06b` reading 5 pointed at the wrong file, and mislabelled the object

Reading 5 compared its d = 2 growth to "the all-class Jacobsthal function in
attack-05". `attack-05-annulus-induction.js` has no Jacobsthal content of any
kind; the Jacobsthal ladder is `research/05-twin-jacobsthal.js`. And the
comparison is not to an all-class object: the d = 2 column here IS G₂, matching
05's ladder 66, 108, 150, 204 at 13# to 23# term for term, so it is the same
object measured twice rather than an independent confirmation. The all-class h₂
= A288815 is a different sequence, used correctly in reading 3. Both halves
fixed.

### S2-19 (LOW, document side, EVIDENCE). Two small ones in `FOLD-PROFILE.md`

`FOLD-PROFILE.md` §9 gives S/P at u = 2 as **0.8926** in its table and
**"against 0.8929"** in the prose three lines below. Re-ran
`fold-profile-05`: 895,790 / 1,003,543 = 0.892624, so the table is right and the
prose digit is a slip. (`fold-profile-06` gives 0.8927 at exactly u = 2.000, a
different sampling point, so neither figure is 0.8929.)

§10's Reproduction index covers `fold-profile-01` through `-11` and closes "All
eleven run in seconds". Scripts **12 through 16 are absent**, and 13, 14, 15, 16
have no prose home anywhere in the body layer. See S2-20.

### S2-20 (structural, EVIDENCE). Four scripts have no body-layer home, and the index that says otherwise counts history as reachability

`SCRIPTS.md` reports "Cited by nothing: **0**". For five files in my partition
the only citer is a wave-3 staging report:

| script | only body-layer citer |
|---|---|
| `attack-02-head-bias.js` | none (only `history/staging/qc-arch.md`) |
| `attack-05-annulus-induction.js` | none (only `history/staging/qc-arch.md`) |
| `fold-profile-13-hotspot-sweep.js` | none (only `history/staging/qc-arch.md`) |
| `fold-profile-14-underdispersion.js` | none (only `history/staging/qc-arch.md`) |
| `fold-profile-15-variance-law.js` | none (only `history/staging/qc-arch.md`) |
| `fold-profile-16-is-it-the-tile.js` | none (only history files) |

This is wave 3's second `crosslinks` blind spot ("history conferred
reachability") reappearing in a different instrument. `SCRIPTS.md` is generated
by `gen-scripts-index.js`, which is not mine.

Two of these are not merely unlinked, they carry a finding with no prose home at
all: `fold-profile-14/15/16` established that the twin-prime variance deficit in
these tiles is the classical short-interval variance and NOT a tile phenomenon,
which is a real negative result and a caveat on any future "the tile is quieter"
claim. It exists only inside three unlinked scripts and one session file.

`ATTACKS.md` rows 1, 2, 3, 5 describe their attacks by number and never by
filename, which is why the generator scores those files as history-only. That is
a generator convention, not a defect in ATTACKS.md, but it means the index's
zero is softer than it reads.

### S2-21 (structural, EVIDENCE). All sixteen fold-profile scripts violate the house format

`SCRIPTS.md` line 9 states the convention: "The house format is question in the
header, code, **pasted output**, numbered readings, which means a script is
readable as evidence without being re-run." Every `attack*` file in this
partition obeys it. **Not one of the sixteen `fold-profile-*` files has a pasted
OUTPUT block or a READINGS block.** Their results exist only in
`FOLD-PROFILE.md` §§1-12, which covers 01 to 11, and nowhere for 12 to 16.

The consequence is direct and it is why this partition ran them: the wave-4
method that found R-1, reading a script's READINGS block against the summary
citing it, is **impossible** on a third of my surface. There is nothing to read.

### S2-22 (LOW, open loose end, EVIDENCE). `fold-profile-13` found a positive excess and told nobody

Its summary ends "T23 | width 8 | max z 4.90 | threshold 4.75 | *** ABOVE *** ...
A positive excess survived. **Investigate.**" `fold-profile-14` went after the
dispersion instead, 15 and 16 after the variance law. No document records
whether the excess was ever chased, and the session record does not mention it.
It is one window at the coarsest width against a Gumbel threshold it clears by
0.15, so the likely answer is that it is nothing, but the artifact asks a
question the corpus never answers.

### S2-23 (LOW, EVIDENCE). `TODO.md`:428's parked item is narrower than it reads

"Deep-gap migration mystery (attack-01): why did the worst G₂ gap jump from
r≈700 to r≈1.2e9 at 29#? **Unexplored since.**" `attack-01` reading 2 already
gives a mechanism ("the actual twin gap 659→809 was still the largest thing the
young pattern had seen; once p=23's deep structure produced 204 > 150, the max
moved away") and a prediction it then verified at 29#. What is unexplored is
whether the prediction holds forever, not the jump itself.

---

## Coverage: every script, with a verdict

Superseded status is called out per row, with whether the artifact says so **on
its face**. That column is the one worth reading independently of any defect.

### attack (10 + 1 follow-up)

| script | superseded? | says so on its face? | verdict |
|---|---|---|---|
| `attack-01-gap-cartography.js` | no | n/a | CLEAN. Output and four readings check out; 34.14% at 23# and 18.6% at 29# both reproduce against `05-twin-jacobsthal.js`'s r = 1,205,437,109. The twin pairs named in reading 1 (659,661)→(809,811) verify. |
| `attack-02-head-bias.js` | **YES, readings 1 and 3** | no → **BANNER ADDED** | S2-14. Reading 1's divergence limit refuted; reading 3's open question closed. Reading 2 stands. |
| `attack-03-higher-moments.js` | no | n/a | CLEAN. Kurtosis, quartic gain and min-window counts all match `ATTACKS.md` row 3 and `wall-note.md` Door 3. |
| `attack-04-fourier-budget.js` | **YES, the certified column** | **yes, prominently** → marker added at reading 3 | S2-17. The banner is the corpus's best example of the form. Doc layer is CLEAN on this one: `ATTACKS.md`, `NATAL-CAP-CAMPAIGN.md` and `wall-note.md` all carry the supersession and the retraction. |
| `attack-05-annulus-induction.js` | no | n/a | CLEAN as arithmetic. Body-layer orphan, see S2-20. |
| `attack-06-difference-hierarchy.js` | **YES, reading 2** | **no** | The "SURPRISE" is a level-19 coincidence per `attack-06b` reading 2. Left unbannered deliberately: `attack-06b` is the immediate successor file, names attack-06 in its own title line, and the pairing reads as a two-file unit. The live defect is in `ATTACKS.md` (S2-2), which cites 06 and never mentions 06b. Flagging here rather than editing so the shepherd can decide whether the banner belongs on the artifact too. |
| `attack-06b-difference-map.js` | no | n/a | **TWO FIXES**, S2-8 (mid-pack, refuted by its own table) and S2-18 (wrong file cited, object mislabelled). Everything else recomputed and correct: the 105-difference tables, the paired/free ratios, the zone margins, the normalized ranking. |
| `attack-07-certificate-ceiling.js` | no | n/a | CLEAN. 1.62e-4 at p = 19 and the 57× factor reproduce into `wall-note.md` Door 3 and `ATTACKS.md` row 7. Reading 1's "Chebyshev ~60x" is a loose round on a 45-59 range and it computes Cantelli, not Chebyshev; not worth an edit. |
| `attack-08-pigeonhole-theorem.js` | no | n/a | CLEAN. The Rosser-Schoenfeld arithmetic checks; "2.00 at p = 1009" reproduces into `moire-primes.md`:418. |
| `attack-09-chen-theta.js` | no | n/a | CLEAN. The 8% and 2.0× figures reproduce into `ATTACKS.md` row 9 and `wall-note.md`:162. |
| `attack-10-anchored-origin.js` | **YES, phase 3** | **yes in the readings, NOT in the header** → **FIXED** | S2-13. Also the custody gap in S2-5: two of the numbers `anchored-windows.md` §3 attributes here are not produced here. |

### attack2 (7)

| script | superseded? | says so on its face? | verdict |
|---|---|---|---|
| `attack2-01-06-seam-census.js` | no | n/a | CLEAN, and it is the model of the form: its own attack-6 prediction was refuted and reading 3 says so in capitals. E(P) figures reproduce into `ATTACKS2.md`, `GLOSSARY.md`, `moire-primes.md`. |
| `attack2-02-08-tomography.js` | **YES, reading 3** | no → **BANNER ADDED** | S2-15. Readings 1, 2, 4, 5 stand. |
| `attack2-03-09-depth-formula.js` | no | n/a | CLEAN. The Invariance Lemma proof, the identity checks (3213 = 3213, 378 = 378) and the Buchstab convergence at b = 4999 all hold; reading 5's honest scope is exact. |
| `attack2-04-10-hierarchy-oeis.js` | no | n/a | CLEAN. Reading 2's "numerator FREEZES once p_m > 2W+2" is a different regime from attack-10's refuted head divergence and does not inherit the refutation; checked deliberately. |
| `attack2-05-07-integral-ladder.js` | no | n/a | CLEAN, and it is the file that retires the kill shadow. The doc that should have inherited that has not (S2-4). |
| `attack2-rankin2d.js` | no | n/a | CLEAN. Recomputed the zone margins (0.90, 0.96, 0.55, 0.59, 0.52, 0.499), the paired/free ratios (0.54 to 0.68 over p = 13..41) and the m/p² and m/(p ln²p) columns from its own A072753 array; every one reproduces. Its "PRECISE DEFINITIONS for readings 5-6 (do not paraphrase loosely)" block is the strongest anti-flattening device in the corpus. |
| `attack2-rich-vein.js` | no | n/a | CLEAN, and it is the file that solves the vein. Two documents have not inherited it (S2-16). |

### fold-profile (16)

None of these carries a pasted output block (S2-21), so each row's verdict rests
on a re-run rather than on a read.

| script | re-run? | superseded? | verdict |
|---|---|---|---|
| `fold-profile-01-per-copy.js` | yes, 4.7 s | S2 section only | **FIXED**, S2-11. Custody line holds: G₂(new) reads 30, 42, 66, 108, 150, 204, 258. |
| `fold-profile-02-deviation-law.js` | yes, 2.3 s | no | CLEAN. S4 gives 45 of 45 cells YES with max diff 1, matching `FOLD-PROFILE.md` §4's "VERIFIED 45 of 45" exactly. |
| `fold-profile-03-inside-copy0.js` | yes | no | CLEAN. |
| `fold-profile-04-count-vs-damage.js` | yes, 3.9 s | no | CLEAN. Every figure in `FOLD-PROFILE.md` §6 reproduces: 0.0573→0.057, sd 0.241, 0.0083→0.008 at depth, rank ratio 0.763 and 0.745, 3 of 48 against 1.47. |
| `fold-profile-05-survival-curve.js` | yes, 2.1 s | no | CLEAN except the §9 prose slip in S2-19. Custody holds at both ends: D = 7,952,175 at the start, 895,790 by running count and by direct recount at the end. |
| `fold-profile-06-scale-free.js` | yes | no | CLEAN. All seven rows of `FOLD-PROFILE.md` §9a reproduce to four decimals. |
| `fold-profile-07-impact-window.js` | yes, 3.7 s | T₃₁ row only | **FIXED**, S2-10. Every other figure matches §11 exactly, including the band table, the 268/4,702,069/2,354,048 cofactor split, and both exhaustive lemma checks at 64 and 456 removals. |
| `fold-profile-08-zone-localized-gap.js` | yes, 0.7 s | no | CLEAN. §12's table (108/361/3.34/60/6.02 and the two rows below) and the 12.2·ln Y slope both reproduce. |
| `fold-profile-09-natal-dispersion.js` | not re-run | no | Header lemma and its one-line proof read correctly; the reproduction line in §10 is specific. NOT REACHED, see below. |
| `fold-profile-10-lineage-census.js` | yes, 1.9 s | no | CLEAN. Custody holds: all 7,952,175 slots of T₂₃ classify, twin count 440,311. |
| `fold-profile-11-lineage-yield.js` | yes, 0.9 s | no | CLEAN. All seven S3 rows read EXACT. |
| `fold-profile-12-anatomy-survival.js` | yes, 2.2 s | no | CLEAN as an artifact. Custody holds (D = 7,952,175 MATCH). Its numbers are quoted correctly in three documents; what is quoted alongside them is not (S2-7). |
| `fold-profile-13-hotspot-sweep.js` | yes, 2.7 s | **YES, reading 2** | **FIXED**, S2-1. Open loose end in S2-22. |
| `fold-profile-14-underdispersion.js` | yes ×3, 2.3 s | no | **FIXED**, S2-12 (seeded). Real column deterministic and reproduced exactly. |
| `fold-profile-15-variance-law.js` | yes ×2, 3.0 s | header figure | **FIXED**, S2-9 (S3 never printed) and S2-12 (quoted range). |
| `fold-profile-16-is-it-the-tile.js` | yes, 2.1 s | header figure | **FIXED**, S2-12. Its own S1 caveat is exemplary: it states the A = B/(1−p) identity as an identity rather than dressing it as agreement, which is the correction the session record logged. |

---

## What was not reached, and why

1. **`fold-profile-09-natal-dispersion.js` was not re-run.** It trial-divides
   past 4.9e11 with a 700,000-prime table over the natal cohorts on the ladder
   to p = 31, and I could not price it from the source without running it.
   Everything else in the family ran in seconds; this one did not obviously
   belong in that class, and I chose to spend the time on the twelve that did.
   Its header lemma ("for any prime q > p, the fold by q removes at most two
   members of natal@p") is one line and reads correctly. **NEEDS COMPUTE,
   unpriced.**

2. **The `anchored-windows.md` §3 and §5 numbers were not regenerated** (S2-5).
   Priced at under a minute of compute, but the artifact that would carry them
   is prose I do not own, so regenerating them without the prose fix would leave
   the output homeless.

3. **`attack2-rankin2d.js`'s exact solver was not re-run.** Its default run is
   2 m 42 s and its `--deep` results took 586 s and 20.5 min. Its published
   values were instead checked by recomputing every derived column from its own
   pasted arrays, which caught nothing. The eight FREE terms recomputed
   "ab initio" and the four Resta certificates are taken on the file's word.
   **NEEDS COMPUTE: about 3 minutes default, about 30 minutes with `--deep`.**

4. **`attack-05` and `attack-08`'s 10⁸ sieves were not re-run** (each a
   100-million-entry sieve plus, for attack-08, an O(x) π(x) loop per level,
   which is minutes). Their readings are internally consistent and their
   arithmetic checks by hand.

5. **The novelty claims were not literature-checked.** `attack-06b` reading 6's
   conjecture, `attack2-rankin2d` reading 1's "OEIS-absent" paired ladder, and
   `attack-08`'s "our first new theorem that is not a repackaging" are all
   absence claims about the literature, which `PRIOR-ART.md` owns and which
   `qc.js`'s `absence` check routes there by design. Not mine.

6. **No `.md` was edited.** Findings S2-2, S2-3, S2-4, S2-5, S2-6, S2-7, S2-16,
   S2-19, S2-20, S2-22 and S2-23 are evidence for the shepherd, not replacement
   text.

---

## Method notes

**The direction of staleness inverted in this family, and that is the finding
under the findings.** The campaign's lesson 1 says a claim gets fixed in the
research layer while the summary layer above goes on asserting the old thing.
Here it ran the other way three times. `paper/moire-primes.md` carries the 23#
dissolution, the solved rich vein and the refuted divergence, all correctly,
while `ATTACKS.md` row 6 and `ATTACKS2.md` rows 2 and 12 still hold the dead
versions. `ATTACKS.md` row 2 is fully corrected while `attack-02-head-bias.js`
underneath it was not. The papers got swept in waves 1 to 4; the campaign
indexes and the scripts did not. **Where a family has an index file
(`ATTACKS.md`, `ATTACKS2.md`), the index is the least-swept document in the
corpus**, because it looks like a summary and reads like a changelog and nobody
treats it as either.

**A grep returning nothing proved nothing until checked, twice here.** The
absence sweep for the retired kill-shadow object ran against the known positive
`anchored-windows.md`:83, which fires. The sweep for scripts producing
`anchored-windows.md` §5's table ran against the known positive
`attack2-05-07-integral-ladder.js`, which contains 0.856 and matched; the four
files that matched 0.834 were opened and are unrelated tables.

**Agreement was not independence in S2-7.** Two documents carry the z-range
identically, and they are not two witnesses: `GLOSSARY.md`:50 and
`moire-primes.md`:571 are the same sentence, and the fusion of two scripts'
tables happened once, upstream of both.

**One supplied answer was refused and the refusal was right.** The brief
predicted that in this family "superseded artifacts are the norm rather than the
exception". They are not. Of 34 scripts, **six** carry a superseded reading
(attack-02, attack-04, attack-06, attack-10, attack2-02-08, fold-profile-13),
and **two of the six said so on their face before this sweep** (attack-04, and
attack-10 in its readings but not its header). The dominant defect in
this partition is not supersession at all. It is **eight scripts whose own
printed output contradicts their own prose**, which is class 3 in the brief and
was listed third.
