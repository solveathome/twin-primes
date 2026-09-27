# Coherence pass across the 2026-08-28 staging files: 20 contradictions, 8 convergences, 46 live-doc corrections

<!-- ledger
id: Q-coherence-0828
status: ANSWERED
todo: none
question: Are the 2026-08-28 notes consistent with each other?
verdict: 20 contradictions, 8 convergences, 46 live-doc corrections collected (34 mechanical, 12 need a second reader).
-->

**Status: HELD, staging, 2026-08-28.** This is a COHERENCE pass, not a red team.
It checks the day's files against each other on definitions, numbers and
verdicts. It does not audit any of them against the wider corpus for defects,
and it does not adjudicate any claim on its own merits.

**Fence observed.** One file written, this one. No existing file edited. No git
command run. No script run. `research/qc.js` not run. Nothing recomputed.

**Files in scope,** all `research/history/staging/`, all 2026-08-28, all HELD:

| cluster | files | written |
|---|---|---|
| certificate engine | `thm-mod30-tail.md`, `thm-buchstab-transfer-shallow.md`, `thm-capK-bv.md`, `thm-sharp-sieve-range.md`, `comb-discrepancy-tight.md` | 09:26 to 09:58 |
| Var/E | `varE-asymptotic.md`, `varE-spectral.md` | 09:37, 10:12 |
| Z4 head | `head-residual-factor.md`, `head-residual-null.md`, `head-residual-hl3.md` | 09:45, 10:01, 10:21 |
| Z5 records | `record-location-null.md`, `lit-kourbatov-shortfall.md` | 10:05, 10:17 |
| imports | `import-map-rows-15-17.md`, `import-fracparts.md` | 09:59, 10:14 |
| singletons | `fold-ledger-forced.md`, `rho2-analytic-bound.md`, `excess-chain-c.md`, `c2prime-refit-22.md`, `hsubpow-explicit-K.md`, `lit-vc-multiples.md` | 09:27 to 09:56 |

**Absent, skipped per fence:** `lit-dickman-variance.md` does not exist in
`research/history/staging/` at the time of this pass. Nothing below assumes
anything about it, and the Var/E cluster's verdict may move when it lands.

**What this pass does not establish.** It compares statements, not their truth.
Where two files disagree, the entry names which one supersedes by its own
argument and whether the earlier file's author would accept it; that is a
judgement about the argument on the page, not an independent check of it. No
number below was recomputed and no proof below was re-derived.

---

## 0. Counts, and the two that matter most

**20 contradictions**, of which 6 are collisions of definition, 12 are
divergent values or readings of the same quantity, and 2 are intra-file
inconsistencies. **8 convergences**, of which 4 are strict (neither file cites
the other and neither could have known of it). **46 corrections proposed to
documents outside this day's set**, of which 41 target live documents and 5
target older staging records; 34 are mechanical and 12 need a second reader.

**Most consequential, first.** The Var/E constant. Four live documents carry
`0.611` as the live hypothesis (`paper/variance-note.md` abstract and §7,
`research/GLOSSARY.md` "Hyperuniformity", `research/README.md` line 153,
`TODO.md` line 428). `varE-asymptotic.md` §5 widens the fitted family and
leaves the intercept unpinned across `[0.46, 0.72]`; `varE-spectral.md` §7 then
runs a control whose limit is `0.455456` by construction and which tracks the
measured data to 0.002, and the same fit protocol returns `0.6151` from it. So
the estimator that produced `0.611` reproduces `0.611` on a sequence whose limit
is not `0.611`. This is MEASURED, on a control, and it refutes the inference
rather than the number. It touches a paper abstract.

**Second.** The freshness density factor. `research/bv-import-survey.md` §3.1
prices `∏(1 − 2/(q_i − 1))`; `thm-mod30-tail.md` §5(i) proves and measures
`∏(1 − 1/(q_i − 1))` (corrected form within 0.4% at @17 and 0.02% at @19, the
survey's form off by 5.0% to 32.4% and worsening with `K`);
`thm-buchstab-transfer-shallow.md` §1 derives the same independently from
`natal-cap-28`'s code; `thm-capK-bv.md` §1 carries it and reads the dimension
off it as `κ = 1`. Three files agree, two of them without contact. The same
two-class reading sits in `research/GLOSSARY.md` ("the two forbidden freshness
residues") and in `paper/staircase-note.md` §7. Harmless as a bound, wrong as a
dimension count, and the dimension count is what the sieve cluster's thresholds
are computed from.

---

## 1. Definitions

### D-1. The sifting variable `s`, on two incomparable depths

| file | formula | `z` is | κ | column over @11..@97 |
|---|---|---|---|---|
| `thm-capK-bv.md` §3 Step 2 | `s = ln D / ln z` | `q_K + 1`, the largest freshness prime; at `K = 0` this is the level `x` | 1 | 0.81 … 4.58 |
| `thm-buchstab-transfer-shallow.md` §3.1, §3.5 | `s = ln D / ln z` | `q`, the scour prime, because `P⁻(m) ≥ q` sifts to depth `q` | 2 | 2.639 … 17.142 |

`thm-sharp-sieve-range.md` §0 finding 5 and §1 name the collision and state the
rule: "these describe different sieves of different sequences" and the two
columns must never be tabled together. Both files are internally consistent;
neither is wrong; the two `s` are simply not the same number.

**What the live layer uses.** `research/GLOSSARY.md` has no entry for `s`, for
"sifting variable", or for the sieve dimension. `research/dhr-verification.md`
§4.1 quotes FI Lemma 6.8 with `D = z^s` and `z` the sieve's own sifting level,
which makes each sibling's `z` the correct one for its own sieve. There is no
programme-wide convention to violate, and the corpus has not needed one before
today.

**Consequence, and it is arithmetic.** The thresholds and the level crossings
are not comparable across the two: `s ≥ 10.82` at κ=1 with `K_dim = 1.2000`
against `s ≥ 21.37` (δ→1) or `22.06` (δ=0.5) at κ=2 with `K = 7/5`; first
crossing `x = 239` against level `131`. Any future table that puts the two
`s` columns side by side is wrong before it is read.

### D-2. The letter `K`, three objects

- **Ladder depth `K`** — how many freshness moduli a cap folds in.
  `research/GLOSSARY.md` "Ladder depth K, and K*"; `thm-mod30-tail.md` §5;
  `thm-capK-bv.md` §1; `thm-buchstab-transfer-shallow.md` §3.5 (`K ≤ idx(q)`).
- **The fundamental lemma's dimension constant `K`** — FI Lemma 6.8(iii).
  `thm-buchstab-transfer-shallow.md` §3.4 writes `K = 7/5` in the same section
  as `K ≤ idx(q)`. `thm-capK-bv.md` §3 Step 2 renames it **`K_dim = 1.2000`**,
  which is the disambiguation.
- **Sieve dimension `κ`** — 1 or 2, never written `K`, but adjacent everywhere.

`research/dhr-verification.md` §0 row 3 uses bare `K` for the lemma constant
("positivity needs `s > 9κ + 10 log K`"). The collision is inherited from the
live layer, not introduced today. `K_dim` is the only rename on offer and it
should be adopted corpus-wide if anything from this cluster lands.

### D-3. The fundamental lemma, one quotation, two attributions

`thm-capK-bv.md` §0 and §8 call it "Friedlander–Iwaniec *Opera de Cribro*
Lemma 6.8 (quoted verbatim in this repo at `research/dhr-verification.md` §4.1,
from arXiv:2301.07679 p. 33)". `thm-buchstab-transfer-shallow.md` §3.4 quotes
the identical statement as Matomäki–Teräväinen arXiv:2301.07679 p. 33
**Lemma 9.1**, and flags that "the same normalisation's attribution to
Friedlander–Iwaniec, *Opera de Cribro*, Lemma 6.8, is **not** verified (the book
is paywalled and was not reached)".

Same page, same statement. One file asserts the attribution the other holds
open. `thm-capK-bv.md` §8's own falsifier row concedes "*Opera de Cribro*
itself has not been opened here", so the two are reconcilable, but the live
layer carries the stronger form: `research/dhr-verification.md` line 348 records
"verbatim FI Opera Lemma 6.8" sourced from the MT PDF.
`thm-sharp-sieve-range.md` §10 lists FI *Opera de Cribro* Thm 11.12/11.13 as
`[NOT REACHED]` and takes the same cautious line as `thm-buchstab`.
**The cautious attribution is the one the day's files support.**

### D-4. `head`, three objects, and no glossary entry for any of them

- **zone head** — `F(p)`, the first twin opener above `p` minus `p`.
  `head-residual-factor.md` §1, from `zonegap-01.js`.
- **the head of the scour** — `q ∈ (x, W^{1/3}]`, against the tail
  `q³ > W + 1`. `thm-mod30-tail.md` §7; `thm-capK-bv.md` §6; the
  Certified-Head Theorem in `research/certificate-engine.md` §1.
- **the head of a primorial period** — `attack-02-head-bias.js`, flagged as a
  collision by `head-residual-factor.md` "Defects".

Three objects, one word, in one day's output. All three Z4 files independently
record that `research/GLOSSARY.md` has no entry for **head**, **tail** or
**opener**; that is confirmed. This is the widest definitional gap found.

### D-5. "The two forbidden freshness residues" is one class

`research/GLOSSARY.md` "Staircase cap" entry: "cap_K adds the two forbidden
freshness residues modulo the first K scour primes."
`paper/staircase-note.md` §7 carries the same pair.

Against that, three files today: `thm-mod30-tail.md` §5(i) proves
`v ≡ 0 (mod q_i)` excludes no class of `m` at all (since `q_i ∤ q` and `m` is
prime with `m ≥ q > q_i`); `thm-buchstab-transfer-shallow.md` §1 derives the
same and reads the dimension off `natal-cap-28-analytic-certificate.js:167`
(`F = 1/(q−1)`); `thm-capK-bv.md` §1 states `κ = 1` as a consequence.
`thm-buchstab` §7 flags GLOSSARY and the staircase note by name;
`thm-mod30-tail` flags only the survey. See §5 row 15 and row 16.

### D-6. Letter collisions, compact

Recorded for the index; no file conflates any of these within a display.

| letter | objects, and where |
|---|---|
| `A` | `⌊(W−1)/q⌋` (certificate cluster); trend load `mean_k g_k/T(e_k)` (Z5); the within-gap placement term of `h − R = A + B` (`head-residual-factor.md` §2); the fitted multiplier 1.1445 (`excess-chain-c.md` §3) |
| `B` | `⌊(W+1)/q⌋` and "B-side" (certificate cluster); the Buchstab transfer factor `B(q,K)` (`thm-buchstab`); the length-count coupling term (`head-residual-factor.md` §2); `B1/B2/B3/Bg`, the by_new bound chain (`fold-ledger-forced.md` §3) |
| `κ` | sieve dimension (certificate cluster); `16C₂e^{−2γ}/3 = 1.109905` (`varE-asymptotic.md` §2, `varE-spectral.md`); the unfitted scaling `κ = λ_s E[g]/E[W]` (`head-residual-hl3.md` §2) |
| `c` | the EVT prefactor `E_med/P_med` (`excess-chain-c.md`); the HL comb's divergence coefficient 0.844 (`head-residual-hl3.md` §0); the explicit constant 170.88, written `C` (`rho2-analytic-bound.md` §2) |
| `C₂` | the HL twin constant 0.6601618 (repo); Kourbatov's reciprocal 0.75739, with `1/(2C2) = 0.75739` (`lit-kourbatov-shortfall.md` §4). Already flagged live in `ZONE-POSTULATE.md` §4; recorded because `head-residual-factor.md` §5 and `lit-kourbatov-shortfall.md` §4 use opposite conventions in files 90 minutes apart |

---

## 2. Numbers

### N-1. The "~30x" discrepancy slack is not a constant

`TODO.md` item 8(c) (live): "tighten 2·3^k (~30x slack)".
`comb-discrepancy-tight.md` §0 and §4: the slack `2·3^k / D_x` reads
**2.68 / 4.29 / 6.61 / 12.36 / 16.41 / 28.99 / 53.64** at @7..@29. The 30 is the
@23 value and it is growing.

**Supersedes by exact computation.** `D_x` is the sharp window constant of that
file's Theorem A (max G minus min G over the period), computed exactly at seven
levels with the census asserted against `N = 2·∏(p−2)` at each. This is a
**correction**, not a disagreement: the TODO's 30 is one row of the table.
No other file in the set quotes a slack figure. `thm-buchstab` §3.3 and
`thm-sharp-sieve-range` §1 both cite the `2·3^k` bound itself and are unaffected
by its sharpening.

### N-2. The freshness density factor, one class against two

Covered in §0. Three files agree on `∏(1 − 1/(q_i − 1))`; the survey is the
lone outlier and `thm-mod30-tail.md` §0 lists six other repo sites already using
one class (`natal-cap-08`, `-11`, `-18`, `-24`, `-28`, `staircase-note.md` §8).
**Correction, unanimous, proven and measured.** The survey's author would agree:
the six concurring sites are the same author's work.

### N-3. The certified head share, 1/3/6 against 4/6/9

- Live `research/certificate-engine.md` status table: **1 / 3 / 6** primes at
  @17 / @19 / @23, carrying **9.69% / 17.40% / 22.93%** of Σcap₂.
- `thm-buchstab-transfer-shallow.md` §1 quotes that row `[CITED]`, unchanged.
- `comb-discrepancy-tight.md` §5 reproduces the old counts exactly and the old
  shares as **9.69 / 17.37 / 22.88%**, asserting agreement with the embedded
  artifact to 0.05 percentage points; then reports **4 / 6 / 9** primes at
  **28.14 / 27.97 / 29.40%** under a per-dilation blocked bound.

**Not a contradiction on the old numbers**; the 17.37/22.88 are that file's own
recomputation inside its stated tolerance. The 4/6/9 supersedes 1/3/6 only under
a different constant, and the file says so and calls the new counts floors
(at @19 and @23 the per-dilation constant used is the blocked `Y ≤ 13` bound,
above the sharp per-dilation range).

**Staleness to flag for the primary agent.** If the engine adopts the
per-dilation constant, `thm-buchstab-transfer-shallow.md` §1's scope sentence
("certifies 1 / 3 / 6 primes … carrying 9.69% / 17.40% / 22.93%") goes stale.
Nothing in `thm-buchstab`'s verdict turns on it: a larger certified share does
not weaken its Theorem 1, which is about a different regime.

### N-4. 21.37 against 22.06, and one sentence mislabels its own table

`thm-buchstab-transfer-shallow.md` §3.4: `s ≥ 9κ + 10 ln(7/5) + ln(1/δ)`
`= 18 + 3.365 + ln(1/δ)`, giving 22.06 (δ=0.5), 23.67 (0.1), 25.97 (0.01), and
the band is empty below level 131 at δ = 0.5.

`thm-sharp-sieve-range.md` §0 finding 1: "the fundamental lemma's factor
`e^{9κ−s}K^{10}` is explicit and crosses 1 at `s ≥ 10.82` (κ = 1) and
`s ≥ 21.37` (κ = 2), which the siblings locate at reachable levels `x = 239` and
`x = 131`."

21.365 is the δ = 1 crossing and 22.06 is the δ = 0.5 point; both are correct
arithmetic on the same formula. But `x = 131` was derived from 22.06, and the
same file's §4 third table reads the row correctly as
"22.06 (fundamental lemma, δ = 0.5) → @131, reproducing the sibling".
**Intra-file mislabel in one sentence of `thm-sharp-sieve-range.md` §0,
contradicted by its own §4.** One-word fix; no downstream number moves.

Related and live: `thm-sharp-sieve-range.md` §8 flags
`research/dhr-verification.md` §0 row 3's rounding to "≈ 19+ε", which understates
the binding κ=2 threshold by more than 2 (21.365 against `9κ+1 = 19`). Confirmed
against the live file at lines 29 and 265. See §5 row 17.

### N-5. The Var/E intercept: 0.6106, then [0.46, 0.72], then 0.45546

**Live layer.** `paper/variance-note.md` abstract ("a single constant, near
0.611") and §7 (`0.4435 − 1.509/ln W`, rms 1.8e-3; `0.6106 − 0.729/ln ln W`,
rms 8.2e-4); `research/GLOSSARY.md` line 376; `research/README.md` line 153;
`TODO.md` line 428.

**First move, `varE-asymptotic.md` §5 and §8.** The fit sets in §7 are
misdescribed: the published coefficients are the six points `x = 13..31` and the
seven points `x = 13..37`, not "the first eight" and "all nine"; on the eight
points §7 names, the `1/ln ln W` form is the worse of the two. A wider
two-parameter family gives intercepts 0.5387, 0.6106 and 0.7219 at rms ≤ 1e-3,
and a three-parameter member of the `1/ln W` family fits best at 0.4642.
Verdict: the intercept is unpinned across `[0.46, 0.72]`.

**Second move, `varE-spectral.md` §7 and §11.** The control. A model sequence
whose limit is `λ₂(2) = 0.45545648` by construction, and which tracks the
measured data to 0.002 over the range where data exist, returns intercept
**0.6151** from `a + b/ln ln W` at rms 8.99e-4 and 0.4463 from `a + b/ln W` at
rms 2.26e-3: same winner, same margin, same two numbers the data give (0.6108,
0.4454). Each form's control bias transfers to within 0.007 across intercepts
from 0.42 to 0.73; bias-corrected, seven forms agree at 0.4488 to 0.4551 around
0.455456, spread 0.0063 against an uncorrected spread of 0.3054.

**Supersession chain, and each step is one the earlier file would accept.**
`varE-asymptotic.md` §8 leaves the row open in terms: "a principled reason to
exclude `1/√ln W`, the share form and the two-term `1/ln W` form — NO. No such
reason is offered here, and none is known." `varE-spectral.md` §10 supplies a
candidate and says that row "needs updating either way". This is the cleanest
correction chain of the day. It is not a proof: `varE-spectral.md` §0 leads with
its one unproven decoupling step, measured wrong by 15% at `x = 7` and 4% at
`x = 11` with the sign flipping somewhere in `11 < x < 13`, and §9 records that
the Gorodetsky paper was not read and the `k`-class case was not searched.

**Residual inconsistency inside `varE-asymptotic.md`.** Its §0 says "On the set
§7 actually used, two further two-parameter forms fit at least as well … with
intercepts 0.5366 and 0.7198; a three-parameter member … with intercept 0.4642."
Its §5 table, on that same set (`x = 13..31`), gives **0.5387** and **0.7219**,
and §5 gives 0.4656 on the six points against 0.4642 on the seven. So §0's three
numbers are the `x = 13..37` fits carrying the `x = 13..31` label.
`varE-spectral.md` §7 inherits §0's numbers and attributes them to §5. The error
is self-cancelling downstream, because spectral's own table is fitted on
`x = 13..37` and does read 0.5366 / 0.7198. One label, two files.

### N-6. The `x = 41` forecasts agree

`varE-asymptotic.md` §5: `1/ln W` 0.39941, `1/ln ln W` 0.40296, Mertens share
0.40408, `1/√ln W` 0.40500, two-term `1/ln W` 0.40309, against
`var41-prereg.md`'s registered `[0.4013, 0.4040]`, which retires exactly the
one-term `1/ln W`. `varE-spectral.md` §8 agrees, adds 0.40184 ± 0.00075, and
notes it sits at the bottom edge of the band and is the only forecast carrying a
derivation. No conflict.

### N-7. The β null: `2 − 2/ln p` against exactly 2

`head-residual-factor.md` §3 states the null as `2 − 2/ln p`, "the value it
would take if the two forced left-end primes sat on an interior Poisson process
of rate λ independent of the gap".

`head-residual-null.md` §1 and "Defects": that model is not density-consistent.
It over-counts primes by `2 − 2/ln p` per gap, about 14% of `E[n]` at
`[1e7,1e8)`. Thinning the interior to `λ_s = λ − 2λ₂` restores
`E[n] = λ E[g]` and gives **β_null = 2 exactly**, together with
`CV²_null = 1`, `D_null = 0` and `h − R = −2/E[n]`, all four checked by seeded
simulation at 4,000,000 matched gaps (CV² 0.9998, β 1.9984, D −0.0103,
`h − R` −0.1424 against −0.1497).

`head-residual-hl3.md` §2 adopts `Δ = 2 − β` throughout.

**Correction, and the correcting file states the limit is unchanged**, so
`head-residual-factor.md` §3's conclusion (`β → 2` is what would be needed) is
untouched; only the finite-`p` null value moves, from 1.887 to 2.000 at
`[1e7,1e8)`. Two of three files now use 2.

### N-8. The two live positions: 52% against 16%, a 3.19x over-price

`head-residual-null.md` §3 reading 3: the opener pair's two slots cost
`6λ_s = 0.289` to `7.5λ_s = 0.361` of `Δ = 0.621`, "roughly half".

`head-residual-hl3.md` §4: that bracket is computed on a per-LIVE-slot baseline
`(30/8)λ_s`, while the statistic it is compared against
(`head-residual-null.js` SEC 2's accumulator, which sums
`λ_bulk − count_d/gaps` over all `d`) uses a **flat** baseline in which two
excluded slots are worth exactly `2λ_bulk = 0.1020`, "sixteen percent of Δ
rather than fifty-two". Anatomy at the mean gap `g = 234`, in `λ_bulk` units:
pair slots 2.000, the `|d| < 30` field 5.495, everything beyond 6.192, that is
`0.1020 + 0.2803 + 0.3158` of the measured 0.6214.

**Correction with a proof (the statistic's own baseline), and the check is
recorded as RUN**, by reading the sibling's accumulator.
`head-residual-null.md` §5's summary sentence ("about half priced by the
discreteness the continuum null drops") is wrong as written and should read
"about a sixth".

### N-9. Left-heaviness 0.5295 / 0.1942: mechanism against binning

`head-residual-null.md` §3 reading 2: "It is left-heavy, 0.5295 against 0.1942
… The asymmetry is the mechanism naming itself."

`head-residual-hl3.md` §0 and §4: HL's conditional density `ρ` is exactly
reflection-symmetric about a twin pair (proved from the singular series'
invariance under reflection), so HL has no way to make the deficit physically
left-heavy, **and it still reproduces the measured L/R ratio 4.079, predicting
4.232**. Two named causes, both in the sibling's own script: `cntL` skips the
forced pair, so `d = 0` and `d = 2` read as empty and add `2λ_bulk = 0.1020` to
the left column; and the right column's first 30-shell runs `t = 3..32` against
the left's `t = 3..29`, so two live high-`ρ` positions subtract from the right.

**Contradiction resolved in hl3's favour, with a proven mechanism plus a
measured reproduction.** hl3 states the sibling's sentence "should be
withdrawn". The measured 0.5295 / 0.1942 are not in dispute; only the reading.

### N-10. Δ's rate: `O(1/ln p)` against `O(ln ln p / ln p)`

`head-residual-null.md` §3, closing: "Everything in Δ is O(1/ln p), so β → 2
follows from this reading, and slowly."

`head-residual-hl3.md` §5: under HL the comb sums to `c ln T` and the gap cuts
it off at `T` of order `E[g] = ln²p/(2C₂)`, so Δ should vanish like
`ln ln p / ln p`, "one ln ln p too fast" in the sibling. Measured on the
prediction: `Δ_HL·ln p/ln ln p` = 4.022, 4.005, 4.025 across three windows, flat
to 0.5%; the measured version 3.506, 3.857, 3.822 is flat only over the top two.

hl3 also observes this is the same `ln ln p` that `head-residual-null.md` §0
could not separate from a constant on the `h − R` fit (`h − R` constant at
χ²/df 1.295 against `2.126 ln ln p` at 0.887, "not a discrimination"), calling
it "the same ambiguity seen twice". **Consistent correction, conditional on HL
and labelled so.**

### N-11. The MS shape: rejected, then the rejection's ground removed

`head-residual-null.md` §3 reading 1 rejects the Montgomery-Soundararajan shape
on the ground that the shells beyond `d < 30` contribute 0.0725, −0.0098,
0.0849, non-monotone against a steady 0.11 per nat.

`head-residual-hl3.md` "Defects": the shells are non-monotone in HL too, at
`r = 0.9518` with the two dominant `d < 30` shells dropped and `r = 0.9989`
across all eight, so "non-monotonicity was never evidence against a
singular-series account; only the accrual RATE was."

**Partial retraction, argued.** Both files agree the MS *rate* is not what the
profile shows. The 30-wide shell is now attributed to `ρ`'s non-smoothness in
`t`, not to a mechanism.

### N-12. The Z4 shared columns reproduce across all three files

`head-residual-factor.md` §3: β = 1.028, 1.079, 1.310, 1.314, 1.379; CV²
0.7406 → 0.8941 over the four decades above 1e4; `β CV²` = 0.7993, 1.0849,
1.1193, 1.2326.
`head-residual-null.md` §2: the same five β, with CV² 0.7436, 0.7406, 0.8281,
0.8520, 0.8941, and its SEC 2 stated as an independent re-sieve of `[1e7,1e8)`
reproducing `E[g]`, `E[n]`, β and CV² to 1e-3 before measuring anything new.
`head-residual-hl3.md` §0: reproduces null's four-row left/right deficit profile
"to the printed digit" from an independent re-sieve of three windows.

**Three-file numeric agreement on every shared column, with two independent
re-sieves, no drift.** This is the day's strongest reproduction chain and it is
the reason the corrections in N-7 through N-11 can be read as corrections rather
than as unresolved disagreements.

### N-13. Z5: `A = 0.9295` against `0.9895 ± 0.0182`

`record-location-null.md` §2 (data A = 0.9295; N0 null 0.9895 ± 0.0182, deficit
6.06%, z −3.30; N1/N2/N3 leave it at 6.01 to 6.06% or worsen it to z −4.24);
`import-map-rows-15-17.md` row 16 (quotes the same A and the same null);
`lit-kourbatov-shortfall.md` §5 (gates on reproducing A = 0.9295, z mean −1.298,
z sd 1.021, n = 72 before comparing anything, and cites 6.06% ± 1.84% without
recomputing). **Three files, one number, no drift.**

One figure has a single witness: row 16's "z mean −1.298 against a matched-null
−0.212 ± 0.244". `record-location-null.md` works in `A` units and in `z` against
the ensemble sigma on `A`; the `−0.212 ± 0.244` normalisation appears nowhere
else in the day's output. Nothing conflicts with it; it simply has no second
reading.

### N-14. `b`, and the 6% in two normalisations

`lit-kourbatov-shortfall.md` §5: models `b = 1`, `1.0818`, `1.2597` predict
deficits 5.27%, 5.79%, 6.92% against the data's 6.07%, so the measurement sits
inside the published range and within one null sigma of two of the three. The
in-house `b` implied by the z median at Kourbatov's own cut (`e < 1e15`, n = 71)
reads **−1.2597** against his published **1.2597**. The same file caveats it in
the same section: the match sits on a single record, the neighbouring order
statistics are −1.2618 and −1.2118, and median z moves to −1.3090 at `1e14` and
−1.2118 at `1e16`. **Consistent, self-caveated, correctly rung.**

### N-15. The excess-law prefactor `c`: 0.972, 1.08, 1.074, 1.05 ± 0.06

Four values in circulation, three of them in live artifacts:

| value | what it is | where |
|---|---|---|
| `c* = 0.972` | geometric mean over x = 7..29 | `natal-cap-25-excess-law.js` |
| `c ≈ 1.08` | reading 6's guess that the last four levels settled | same |
| `0.97` | the multiplier quoted in the glossary formula | `research/GLOSSARY.md` "Hyperuniformity" |
| `1.074` | `E_med(31)/P_med(31) = 60.90/56.68` | `TODO.md`, via cap-33 RUN 1 |

`excess-chain-c.md` §1(iii) resolves the provenance: the "RUN 1 passed at 0.5%"
is a statement about the `c ≈ 1.08` branch only (against `c* = 0.97` the same
run is an 11% miss), and §3 gives the honest reading as **`c = 1.05 ± 0.06` over
x = 13..31**, not 1.074, with ±6% scatter consistent with the twist noise
cap-29 reading 5 records (single-level plateau steps swinging 1.9x to 4.2x).
1.074 is separately **contradicted as a limit**: every member of the derived
Gumbel family tends to 1 (0.9196, 0.9453, 0.9683, 0.9850, 0.9979 at
L = 12, 20, 40, 100, 1000).

No other file in the day's set quotes `c`. The contradiction is entirely against
the live layer. See §5 rows 28 and 29.

### N-16. The (H-sub-pow) legal zone contradicts itself in the live layer

`TODO.md` item 1d gives the trusted trap ceiling `1.3946` at line 325 and the
legal-zone floor `1.3555` at line 328, four lines apart, overlapping on
`[1.3555, 1.3946)`. `hsubpow-explicit-K.md` §1c and §8 confirm the overlap,
attribute it to pricing an all-bases hypothesis at a single base, and give the
operative zones by argmax base: **trusted `[1.3946, 11.3568)`** (floor at
`b = 66`, ceiling at `b = 82`), **custody `[1.3555, 9.9082)`** (floor at
`b = 16`, ceiling at `b = 46`), on an exhaustive scan over `b ∈ [2,83)`.
The quoted floor calls a 0.0391-nat TPC-implying sliver legal; the quoted
ceiling forfeits 3.7173 nats. Same framing flagged in
`research/history/staging/attack-wrongdirection-audit.md` §3.5.

### N-17. Singleton numbers with no second witness

- `rho2-analytic-bound.md` §2 names `C = (27/16)e^{8γ} = 170.88` for a constant
  `attack-rhoms-01.md` left unnamed, with FORM I*/exact ratios 2.535e+12 to
  3.213e+14 **widening** with z. No other file touches ⟨ρ̃²⟩.
- `c2prime-refit-22.md` §1 weakens `research/exponent-control.md` §2's
  "74.7 AIC units on the control and only 12.2 on h2": the corresponding G₂
  ratio moves 13% (n = 10) to 35% (n = 20), so "the factor nearly tripled on ten
  new terms and should not be quoted as a stable number". Direction stands.
- `fold-ledger-forced.md` §3 gives B3 mean 1.271 max 5 against the column's mean
  0.267 max 3, tight at 34.0% of folds and forcing `by_new = 0` at 297 folds.
  Nothing else in the set touches the fold ledger.
- `lit-vc-multiples.md` §3 records that the two 4s (Thomas's
  `⌊log₂ π(79)⌋ = 4` and the in-house measured `VC = 4`) are unrelated: his
  construction's smallest witness at ℓ = 4 is 9,699,690 against a window of 250.
  A coincidence explicitly checked and dismissed.

---

## 3. Verdicts

### V-A. Certificate engine: five files, one monotone chain, no silent contradiction

Chain of verdicts, in write order:

1. `thm-mod30-tail.md` — S1 **PROVEN** at short-note grade, S2 **PROVEN** with
   the corrected density factor; the tail constant drops `2 ln 2 = 1.386` to
   `(ln 2)/2 = 0.347`; §7 "Do not buy" already states "Nothing in the head",
   "No new certified twin floor", "No change in the order of the deficiency".
2. `thm-buchstab-transfer-shallow.md` — Theorem 1 **PROVEN conditional on the
   cited fundamental lemma**, and vacuous at every level the engine has run:
   band empty below level 131, and where the theorem holds `|B − 1| < 10⁻⁵`.
3. `thm-capK-bv.md` — Theorem C **PROVEN, short-note grade**, "empty in every
   range anyone will ever compute": first `s ≥ 10.82` at `x = 239`, `W ≈ 10^96`.
4. `thm-sharp-sieve-range.md` — two readings, labelled and separated. Reading
   (L), the limit at fixed `s`: κ=1 non-empty from @53, κ=2 from @23. Reading
   (F), a finite-level statement: **EMPTY at every level for both theorems
   under both instruments**, because DH Thm 9.1's `O(·)` constant is unwritten
   and its bare shape does not fall below 1 until `log y ≈ 2.1e11` (κ=1) or
   `8.8e19` (κ=2).
5. `comb-discrepancy-tight.md` — the one place a constant actually moves the
   engine, and it moves it by pricing each dilation, not by a better uniform
   constant. §6: "Partly answered, and not in the channel that pays."

**Consistency of the last with the first: intact.** `thm-sharp-sieve-range.md`
§7 "Buys" 1 and 2 correct the *scope lines* of both siblings without overturning
their verdicts, and it says so in terms: "the siblings' verdicts stand unchanged
as finite-level verdicts and this note does not repair them." No file in the
cluster claims a finite-level certificate; `thm-mod30-tail.md` disclaimed one on
the day it was written.

**One item to watch, and it is a reading hazard, not a contradiction.**
`thm-sharp-sieve-range.md` §7 buys 2 says `thm-buchstab`'s `q ≤ W^{1/23}` is a
property of the fundamental lemma and "the sieve-theoretic threshold is
`q ≤ W^{1/5.26645}`", with the κ=2 band non-empty from @23 and covering 30% of
the log-depth at @97. The same file's §5 reading (F) says the theorem is EMPTY
at @23. Both readings are labelled, but they sit 400 lines apart and the file's
own title leads with the (L) half. Whatever integrates this should carry the
(L)/(F) distinction in the sentence, not in a section reference.

**Cluster verdict for the report: nothing in the certificate cluster opens a
route, and every file says so unprompted.** `thm-buchstab` prices its own
route-opening confidence at 0.01, `thm-sharp-sieve-range` likewise.

### V-B. Var/E: the later file overturns the earlier twice, states both, and the two end with incompatible recommendations

Overturned, and stated:

1. **The growth shape.** `varE-asymptotic.md` §3 and §5: "X sits strictly
   between `ln²W` and `ln²W ln ln W`", with `X/ln³W` refuted (falling by 2.7
   over nine levels) and `X/(ln²W ln ln W)` also falling while `X/ln²W` rises.
   `varE-spectral.md` §4: `X = c ln²W (1 + O(1/ln W))`, **never** `ln²W ln ln W`
   and never `ln³W`, with the mechanism named (mean against maximum of one local
   Fourier coefficient: `4^ω(q)` gives `Q ln³Q`, `2^ω(q)` gives `Q ln Q`), and
   with the sibling's refuted `ln³W` explained as the maximum branch. Stated,
   not silent, and spectral §4 also supplies the principled reason the drift
   family is a series in `1/ln W`, which asymptotic's §8 recorded as missing.
2. **The intercept row.** Covered at N-5. Stated.

**Surviving unchanged and load-bearing.** `varE-asymptotic.md`'s PROVEN half:
`δ ln²W → κ = 1.109905` (measured 1.109803 at x = 37, relative gap 9.2e-5),
Fact A (`Σ_{ν≠0 mod q} K_L(ν/q) = r_q(q−r_q)/L`) and Fact B (every conductor
dividing `L` is inert). `varE-spectral.md` §1 uses all three unchanged and §3
derives Fact B as a consequence rather than an input.

**The incompatibility the primary agent has to resolve.** Both files close with
a recommendation to the corpus and the recommendations are different:

- `varE-asymptotic.md` §8: "stop quoting 0.611 as 'the constant' and start
  quoting the reduction `lim Var/E = κ lim X/ln²W` with `κ = 1.109905` proven,
  an intercept unpinned across [0.46, 0.72], and the `ln²W`-to-`ln²W ln ln W`
  bracket on X as the only thing the nine points say about growth."
- `varE-spectral.md` §11: "stop quoting 0.611 and start quoting
  `λ₂(2) = 0.45546` as a **heuristic** candidate with one named open step,
  together with the control that shows why 0.611 appeared."

These agree on the negative and disagree on the positive, and spectral's version
additionally contradicts asymptotic's growth bracket. **They are not both
quotable.** Spectral's is the later and better-argued, and it carries three
caveats that must travel with it: the decoupling step is unproven and measured
wrong at the two levels where it can be measured exactly; the limit is reached
by no computed level (the model is 0.054 short of its own limit at `x = 41`);
and §9 records that the route is Gorodetsky's convention at two classes, the
paper was not read, and whether the `k`-class `λ_k` is already in print is
**NOT CHECKED**.

### V-C. Z4 head: derived, then null, then HL, and the chain is self-annotating

1. `head-residual-factor.md` — `h − R = A + B` exactly; `A_forced` derives from
   PNT and HL; the limit reduces to `β CV² → 2`; Z4's specific question (is the
   residual the mod-30 class correlation) answered **NO** by three independent
   bounds, every one an order of magnitude short of `h − R = 5.679`.
2. `head-residual-null.md` — under the programme's own null `β = 2`, `CV² = 1`,
   `D = 0` exactly, so the two `ln p` terms cancel identically and the null
   **settles the direction** (`h/R → 1`) while missing the rate by a power of
   `ln p` and getting the sign wrong (`χ²/df = 1362`, zero parameters).
   β carries 72% of the shortfall at `[1e7,1e8)` and its share is rising.
3. `head-residual-hl3.md` — HL prices Δ to within 5%, **over-predicting** at
   5.5 standard errors (0.6545 against 0.6214 ± 0.0060), same sign at three
   windows and four cuts; and the head half now reduces to a conjecture that
   already implies the twin prime conjecture.

**Is the last consistent with the first? Yes, and it narrows it.**
`head-residual-factor.md` §5 wrote "Granted both, `c_h → c_g → 1/(2C₂) = 0.7574`
and the head has a zero-parameter law." `head-residual-hl3.md` §6 supplies the
grant and prices it: the grant is HL, so "the correct summary of the head half
is now 'measured consistent with HL to five percent, nothing derived beyond
HL'", and the file calls this "a reduction in what is claimed, not an advance".
Factor's opening claim ("no derivation of the residual was reached") is
untouched.

**Silent contradictions: none.** Every correction hl3 makes to null is listed in
hl3's own "Defects" section and worked in §4 and §5; null's correction to factor
is in null's "Defects". The chain annotates itself at every step.

**One thing carried forward unchecked by all three.**
`head-residual-factor.md` §5 calls `CV² → 1` "the standard Poisson-limit
statement for twin gaps" and §3 calls it "a Hardy-Littlewood consequence".
`head-residual-null.md` "Defects" records that neither is cited to a source in
the corpus and downgrades it to CONJECTURED. hl3 does not revisit it. **It
should stay CONJECTURED**, and factor's two sentences are the ones to fix.

### V-D. Z5 records: the second file closes the first file's own largest exposure

`record-location-null.md` §8 names its largest open exposure: "the deficit is
already in the literature under its own normalisation. **NOT CHECKED**. §7. This
is the largest open exposure in this note." Its §7 says "novel to this corpus
and not claimed as novel".

`lit-kourbatov-shortfall.md` §1 closes it: **SAME EFFECT**. The in-house
statistic is Kourbatov's standardized record gap `g*_2`, his median-unbiased
`b = 1.2597` reproduces on the adopted ladder to four decimals at his own cut,
and the size matches in the A-normalisation. §6: "No live sentence may present
the 6.0% as an in-house finding."

**Consistent, in the direction the first flagged as most likely.**
`record-location-null.md` §5's substantive reading (Z₂ runs 6% low against the
pure-Exp model, the direction is harmless for the Zone Postulate, and it has no
proof value) stands unchanged. What `lit-kourbatov-shortfall.md` §6 leaves
standing from the in-house work is the matched simulated null and its sigma,
which is absent from all four Kourbatov papers read.

**The one disagreement between them.** `record-location-null.md` §7 cites the
2013 paper's Table 1 decade slopes (0.4576 → 0.5628 against `log³p`) as the
in-print instance of the shortfall. `lit-kourbatov-shortfall.md` §8: that is a
different statistic, a least-squares zero-intercept trendline slope, and it is
the weaker of two available citations; §5.1's `b` and §5.2's `µ*` are the same
statistic as the repo's and were in the same paper the whole time.
**Correction, and the correcting file read the pages.**

Both files replace one exposure with another: `lit-kourbatov-shortfall.md` §9
names arXiv:1401.6959's Cramér-model ensemble (skimmed, not read) as the new
largest exposure, since a `k = 2` ensemble comparison with a sigma there would
duplicate what the in-house work has left.

### V-E. Imports: row 15 runs and regrades itself; row 16 is stale by minutes

`import-fracparts.md` executes row 15 and scores its own prereg a HIT on the
kill test (largest covered branch 0.20% / 0.70% / 5.68% / 1.10% at
@13 / @17 / @19 / @23, none above the 10% kill), then **lowers its sibling's
pricing** on two grounds found at the page: Theorem 10 controls a marginal while
the door is joint (cap-36 Proposition C makes the branch aggregate a function of
the pair), and its `exp(−C(log x)^{1/3})` saving certifies no finite level.
It also corrects "covers only branches Proposition E measured at or below `lB`"
from an equality to a strict containment (machine-checked on 1,133,872 pairs)
and corrects `ε < 0.39` to the sharp `9/22 = 0.40909`. All three corrections are
in its own "Defects" list. It also finds one place the row **under**-priced:
the marginal-face reach `exp(C(log W)^{1/3})` exceeds the Siegel-Walfisz range
`(log W)^A` the row named for the joint face.

**The one real cross-cluster staleness in the whole set: row 16.**
`import-map-rows-15-17.md` was written at 09:59. Its row 16 prices a
record-theory import whose stated purpose is TODO Z5's first move, "decide
whether the deficit survives the corrected null before hunting mechanisms", and
whose payoff is graded DERIVED-CONSTANT contingent on that being undone.
`record-location-null.md` (10:05) ran the corrected null four ways and found the
deficit survives at z −3.3 to −4.3, with N3 (the repo's own pooling rule, which
is exactly the marginal-composition correction row 16 proposes) moving it by
0.05 percentage points. `lit-kourbatov-shortfall.md` (10:17) identified the
effect as published prior art in a different field entirely.

Consequence, and it should be applied before the row is landed or run:

- Row 16's first kill ("if `z` mean and `A` move by less than the 200-rep
  ensemble sd when the marginal is changed, they are distribution-free") has
  effectively already fired in the "does not move" direction, at least for the
  height-marginal correction.
- Row 16's PUBLISHED-ANCHOR half is banked, but by Kourbatov, not by
  Rényi / Deheuvels-Nevzorov / Ballerini-Resnick.
- Row 16's DERIVED-CONSTANT payoff is unavailable as priced.

The row is not wrong; it is 6 and 18 minutes out of date. Regrade before
landing.

### V-F. Singletons: internally consistent, contradicting only the live layer

`fold-ledger-forced.md`, `rho2-analytic-bound.md`, `excess-chain-c.md`,
`c2prime-refit-22.md`, `hsubpow-explicit-K.md`, `lit-vc-multiples.md`. No file
in the set cites or contradicts any of them, and each carries its own falsifier
table. Two contradict the live layer materially:

- `fold-ledger-forced.md` §3 and §9 against `TODO.md` item Z5b and
  `research/fold-ledger-01.js` line 149 on `by_new = O(1)`: MEASURED to
  `q = 9973`, forced only through the prime gap `g(q)`, and false as a uniform
  statement in `q`. The file also records that this reading is a rediscovery of
  `destroyer-census-01.md` §2, which is the correct rung for it.
- `excess-chain-c.md` against `natal-cap-25-excess-law.js` reading 5 on "roughly
  offset": both named corrections lower the predicted maximum, so they add.

`hsubpow-explicit-K.md` §0 reaches the strongest negative verdict of the day
(no `K` at any base by any of three mechanisms, with two proven divergences and
one exponent-gap lemma) and prices its own route-opening at zero. It is
consistent with nothing else because nothing else touches (H-sub-pow).

---

## 4. Convergences

Findings reached by files that did not cite each other. Four are **strict**
(neither file names the other, and the write times make contact impossible or
one-directional at best); four are weaker and flagged as such.

### C-1 (STRICT). The void second freshness class

`thm-mod30-tail.md` §5(i) derives it from the definition of `N_x` plus
`P⁻(m) ≥ q` and measures it against exact depth-`K` cofactor counts at @17 and
@19 for `K ∈ {1,2,4,8}` (corrected factor within 0.4% and 0.02%, the survey's
off by 5.0% to 32.4%). `thm-buchstab-transfer-shallow.md` §1 derives it as a
dimension-count remark by reading `natal-cap-28-analytic-certificate.js:167`
(`F = 1/(q−1)`) and `:184`. Neither cites the other:
`thm-buchstab`'s §9 source ledger has no `thm-mod30-tail` row, and
`thm-mod30-tail` §5 cites only the survey and the staircase note.
`thm-capK-bv.md` §1 then cites `thm-mod30-tail`, which makes it a third
statement but not a third independent one.

**Two derivations, one from the definitions and measured, one read off the
production code, agreeing exactly.** This is the strongest single piece of
evidence in the day's output.

### C-2 (STRICT). The certificate-engine theorems are empty in the computable range

| file | sieve | threshold | measured `s` | first non-empty |
|---|---|---|---|---|
| `thm-buchstab-transfer-shallow.md` §0.2, §4 | κ=2, `z = q` | `s ≥ 22.06` (δ=0.5) | 2.639 @13 … 17.142 @97 | level 131 |
| `thm-capK-bv.md` §0, §4 | κ=1, `z = q_K+1` | `s ≥ 10.82` (`K_dim = 1.2000`) | 0.81 @11 … 4.58 @97 | `x = 239` |

Written 5 minutes apart. `thm-capK-bv` names `thm-mod30-tail` as its sibling and
does not name `thm-buchstab`; `thm-buchstab` names neither. Both reach the same
verdict shape from different sieves, different dimensions, different constants
and different data: the theorem is a limit statement and supplies no
finite-level bound at any level anyone can reach or predict.
`thm-sharp-sieve-range.md` then reads both and confirms both verdicts survive
the sharp instrument, which is a citation and not a third independent arrival.

### C-3 (STRICT). The `2·3^k` comb qualifier

`thm-buchstab-transfer-shallow.md` §3.3 derives it as a correction to the
survey: the remainder is `O(d^ε)` only in the formulation that puts the comb
inside the sieve, and conditioned on the natal comb as an ambient set the repo's
own bound is `2·3^k` per Legendre term. `comb-discrepancy-tight.md` §1
independently reconstructs the lemma's proof from `natal-cap-25`'s header,
identifies where the 2 and the 3 come from (the mod-30 unit pair; the three
terms `1, −[≡0], −[≡p−2]` per mid), and shows in §2 that the standing lemma is
exactly the trivial per-block bound (`Σ_{d|M} 2^{ω(d)+1} = 2·3^k`). Neither
cites the other. **Convergent on the object, complementary on the content.**

### C-4 (STRICT). The Z5 null is where the payoff is, named from opposite sides

`import-map-rows-15-17.md` row 16 (09:59) prices a replacement null from print
as the row's whole deliverable, on the reasoning that Rényi's theorem decides
whether the marginal explanation is available at all.
`lit-kourbatov-shortfall.md` §6 (10:17), with no knowledge of the row, records
that the effect and its size are Kourbatov's but "the matched simulated null and
its sigma" are nowhere in the four papers read and are what stands from the
in-house work. Two files, no contact, both locating the null as the object that
carries the payoff. Weaker than C-1 to C-3 because it is a convergence on where
to look rather than on a finding.

### C-5 (flagged). `β → 2` and `CV² → 1` as the pair the head reduces to

`head-residual-factor.md` §5 reaches it from the measured product
`c_h = c_g × (1 + CV²(g))/2 × (h/R)` (ratio to measured `c_h`: 0.9953, 0.9956,
0.9967, 0.9977 on the four decades above 1e4). `head-residual-null.md` §1
reaches the same pair independently by computing the null exactly and finding
`β_null CV²_null = 2` makes the two `ln p` terms cancel identically. The null
file cites factor for its per-window numbers but derives the null from
`zonegap-03-model.md` §3, not from factor. **Convergent on the reduction, from a
measurement and from a model.** Flagged because the files are in contact.

### C-6 (flagged). The `ln ln p` ambiguity, found twice

`head-residual-null.md` §0 finds the composed rate not separable on the
available lever arm (`h − R` constant at χ²/df 1.295 against `2.126 ln ln p` at
0.887, over a range where `ln ln p` moves only 15.5%).
`head-residual-hl3.md` §5 derives the `ln ln p / ln p` rate from HL's cutoff and
observes it is "the same `ln ln p` that §0 of that file could not separate from
a constant … The two statements are the same ambiguity seen twice." Flagged
because hl3 cites null; the convergence is hl3's own observation.

### C-7 (flagged). The 1e12 pass, requested by all three Z4 files with three non-overlapping additions

| file | what it wants from 1e12 |
|---|---|
| `head-residual-factor.md` | the `β CV²` lever arm, `ln p ≤ 17.9 → ≤ 27.6`, to separate the two model families for `h/R` |
| `head-residual-null.md` | the endpoint profile of §3 at that height (does Δ fall like `1/ln p`), and the shell contributions past `d = 30` over a longer range |
| `head-residual-hl3.md` | `Δ_HL/Δ_meas`, to say whether the 5% miss is a `1/ln x` error term or a floor; and the eight shell deficits against ρ |

Each names the check as "the one cheap check not run". Factor names it first and
independently; null and hl3 each attribute it to the sibling and add to it.
**This is the single most-requested unrun check of the day**, and the three
additions do not overlap, so one pass serves all three.

### C-8 (flagged). Imports bank payoff and do not open routes

Carried as a standing calibration by `import-map-rows-15-17.md` §0 and
`import-fracparts.md` (which updates the record to 22-for-0 counting itself),
and independently instantiated by two literature files that are not imports:
`lit-vc-multiples.md` (banks a prior-art position, opens nothing, and stops
short of the strongest novelty phrasing because one reference is unread) and
`lit-kourbatov-shortfall.md` (banks an identification and withdraws a novelty
claim). Four literature-facing files, zero routes.

---

## 5. Corrections proposed to documents outside this day's set

Deduplicated. Nothing applied. "Mechanical" means the change is a
transcription or a one-line arithmetic fix that the proposing file has already
checked; "second reader" means the change rests on an argument or a measurement
that no one else has yet seen.

### 5a. Live documents (41)

| # | target | proposed change | proposing file | status |
|---|---|---|---|---|
| 1 | `research/bv-import-survey.md` §3.1 | density factor `∏(1 − 2/(q_i−1))` becomes `∏(1 − 1/(q_i−1))` | `thm-mod30-tail` §5(i); seconded `thm-capK-bv` §0/§6, `thm-buchstab` §1 | mechanical |
| 2 | `research/bv-import-survey.md` §3.1 | restore `− π(q−1; 30, ·)` in S1's display; without it the form is not below cap₁ (exceeds it at 1/5/16/60 of the 9/29/105/396 tail primes) | `thm-mod30-tail` D2 | mechanical |
| 3 | `research/bv-import-survey.md` §3.1 | S1 must carry the hypothesis `r ∈ N_x`; over the full mod-30 twin census the class lists are {11,17,29}/{13,19,1}, the tail factor is 8/3, and the constant is `(3/4)ln 2` | `thm-mod30-tail` D3 | mechanical |
| 4 | `research/bv-import-survey.md` §3.1 heading | "Provable now by Siegel-Walfisz" over-names the tool for S1; PNT in APs at the fixed modulus 30 suffices and is effective | `thm-mod30-tail` D4 | mechanical |
| 5 | `research/bv-import-survey.md` §1 | the BMOR 1/160 constant is stated for θ; the abstract says only "inequalities of the same shape" for π | `thm-mod30-tail` §8 | second reader (body not read) |
| 6 | `research/bv-import-survey.md` §3.1 | attributing S1's gain to `staircase-note.md` §8 factor (a) conflates a kill ratio with a cap ratio | `thm-mod30-tail` §3, §8 | mechanical |
| 7 | `research/bv-import-survey.md` §3.2 | "the same absorption of divisor weights as in Chen's proof" over-names the machinery; FI 6.8's weights are ≤1 so unweighted BV suffices | `thm-capK-bv` §7; confirmed and scoped by `thm-sharp-sieve-range` §0.6 | mechanical, with the rider that the `4^ν` bill comes due on switching to the sharp sieve |
| 8 | `research/bv-import-survey.md` §3.2 | "dimension 2 in the range `(x, q_K]`" is dimension 1 wherever `q_i < q` | `thm-capK-bv` §7 | second reader (marked NOT AUDITED at source) |
| 9 | `research/bv-import-survey.md` §3.3 bullet 1 | "covers the B-factor in the band where cap-28 validated it best" is unsupported and probably inverted | `thm-buchstab` §7 | second reader |
| 10 | `research/bv-import-survey.md` §3.3 | "the remainder … is O(1), unconditionally and trivially" needs the comb qualifier (`2·3^k` per Legendre term with the comb as ambient set) | `thm-buchstab` §3.3, §7; seconded `thm-sharp-sieve-range` §1 | mechanical |
| 11 | `research/certificate-engine.md` §3 | "provable now at `y = T^{o(1)}`" needs the second hypothesis `q = T^{o(1)}` | `thm-buchstab` §7 | mechanical |
| 12 | `research/certificate-engine.md` §2 | the Tail Comb Equidistribution Conjecture becomes a theorem in the limit, unconditionally and ineffectively, at shallow depth; the measured envelope stays the only finite-level statement | `thm-capK-bv` §4, §6 | second reader (no second reader has seen Theorem C) |
| 13 | `research/certificate-engine.md` status table | Comb Discrepancy Lemma scope cell: each Legendre term is off by at most 1; the sum of the `2·3^k` terms is off by at most `2·3^k` | `comb-discrepancy-tight` Defects | mechanical |
| 14 | `research/certificate-engine.md` status table | certified head 1/3/6 at 9.69/17.40/22.93% becomes 4/6/9 at 28.14/27.97/29.40% under a per-dilation blocked bound; the engine's unproven ingredients are unchanged | `comb-discrepancy-tight` §5 | second reader (scratchpad-grade, no embedded OUTPUT block; new counts are floors) |
| 15 | `research/GLOSSARY.md` "Staircase cap" | "the two forbidden freshness residues" becomes one class per freshness prime under `P⁻(m) ≥ q` | `thm-buchstab` §7 | mechanical (harmless as a bound, wrong as a dimension count) |
| 16 | `paper/staircase-note.md` §7 | same; the `v ≢ 0 (mod q′)` condition is void under `P⁻(m) ≥ q` | `thm-buchstab` §7 | mechanical |
| 17 | `research/dhr-verification.md` §0 row 3 and §4.1 | "≈ 19+ε" understates the binding threshold; at κ=2 with `K = 7/5` the second branch is 21.365 > `9κ+1 = 19` | `thm-sharp-sieve-range` §8 | mechanical |
| 18 | `research/covering-dive.md` §1.3 | wording: "for κ = 2 the linear sieve's f, F … do not apply" reads as if no `F, f` pair exists at κ=2, the opposite of the DHR situation the repo documents | `thm-sharp-sieve-range` §8 | mechanical |
| 19 | `research/natal-cap-28-analytic-certificate.js` line 13 | the `cap₂` abbreviation omits `P⁻(m) ≥ q`; the two agree in the prime regime and need not outside it | `thm-capK-bv` §7 | mechanical, comment-level |
| 20 | `research/natal-cap-28-analytic-certificate.js` | embedded OUTPUT at @13 prints "agg NaN%", a 0/0 when `cert.n = 0` | `comb-discrepancy-tight` Defects | mechanical, cosmetic |
| 21 | `paper/variance-note.md` §7 | "fitted to the first eight points" and "Refitting on all nine points" misdescribe the fit sets; the published coefficients are `x = 13..31` and `x = 13..37` | `varE-asymptotic` §7 | mechanical (the producers are right, the prose is wrong) |
| 22 | `paper/variance-note.md` §6 | the Montgomery-Soundararajan sentence points the reader at the half of the method that does not apply; the analogous main term here is exactly `L` | `varE-asymptotic` §7 | mechanical |
| 23 | `paper/variance-note.md` §7 closing and abstract | "the live hypothesis is `lim = 0.611` … the 0.44 reading is demoted" should be **reversed**, not softened, if the model survives | `varE-spectral` §10 | second reader (rests on one unproven decoupling step) |
| 24 | `paper/variance-note.md` §6 | the `(c₁,c₂)` fit table is at fixed `y = 401` while §6 point 2 records the ratio drifts with `y`; any use away from `y = 401` is an unflagged extrapolation | `head-residual-null` Defects | mechanical |
| 25 | `research/GLOSSARY.md` "Hyperuniformity", `research/README.md` line 153, `TODO.md` line 428 | all three carry 0.611 as the live hypothesis; both Var/E files recommend the corpus stop quoting it | `varE-asymptotic` §8 and `varE-spectral` §11 | second reader, **and the two files recommend different replacements** (V-B) |
| 26 | `research/GLOSSARY.md` | add entries for **head**, **tail**, **opener**; mark the `attack-02-head-bias.js` "head" collision and the scour-head collision | all three Z4 files | mechanical |
| 27 | `research/GLOSSARY.md` "Hyperuniformity" | "E = 0.97·σ(ℓ)·√(2ln(W/ℓ)) with no free multiplier" carries the `c* = 0.97` convention, which the last five levels contradict (mean 1.049, four of five above 1) | `excess-chain-c` §1(ii), §3 | second reader |
| 28 | `research/natal-cap-25-excess-law.js` reading 5 | "roughly offset" is wrong in kind: Gumbel centering and sub-Gaussian compression both lower the predicted maximum, so they add | `excess-chain-c` Defects | mechanical |
| 29 | `TODO.md` item Z5b and `research/fold-ledger-01.js` line 149 | `by_new = O(1)` is MEASURED to `q = 9973`, not forced; the uniform statement is false unless read as a bound in `g(q)` | `fold-ledger-forced` §3, §9 | mechanical |
| 30 | `research/fold-ledger-01.js` header line 27 | "the stretches partition the line" is false for the slot set; one opener per fold boundary falls in no stretch, so `cum_added`/`cum_removed` are short by 1,225 over the range (10,013,999 against 10,012,774) | `fold-ledger-forced` §9 | mechanical (accounting note; no published number affected) |

Continued, live:

| # | target | proposed change | proposing file | status |
|---|---|---|---|---|
| 31 | `TODO.md` item 0 and `research/history/staging/rho-maximal-law.md` §7 | both still list "an analytic upper bound on ⟨ρ²⟩(z)" as a first move / NOT REACHED; it was closed 2026-08-21 by `attack-rhoms-01.md` | `rho2-analytic-bound` §7 | mechanical, two stale pointers |
| 32 | `TODO.md` item 1e | "C_true = 0.60-0.78 at z = 13..29" understates the measured maximum 0.8022; `rho-maximal-law.md` §3 states the band correctly as 0.60-0.80 | `rho2-analytic-bound` §7 | mechanical |
| 33 | `research/exponent-control.md` §2 | "74.7 AIC units on the control and only 12.2 on h2" should not be quoted as a stable number; the G₂ ratio moved 13% (n=10) to 35% (n=20) | `c2prime-refit-22` §1 | mechanical (direction stands) |
| 34 | `research/exponent-control.js` READINGS | "practical bracket 1.3 to 1.9" is the superseded ten-term reading; the 22-term refit resolves to 1.3 to 1.8, which §5 already carries | `c2prime-refit-22` Defects | mechanical |
| 35 | `TODO.md` item 1d | self-contradiction within four lines (trap ceiling 1.3946 against legal-zone floor 1.3555); fix by quoting the argmax bases: trusted `[1.3946, 11.3568)`, custody `[1.3555, 9.9082)` | `hsubpow-explicit-K` §1c, §8 | mechanical (exhaustive over `b ∈ [2,83)`) |
| 36 | `TODO.md` item 1d (and any brief quoting it) | "+0.05 ± 0.11 over eleven exact terms" is a nine-term figure per `phase1-T3prep-decision-rule.md` §7.1, already corrected and still circulating | `hsubpow-explicit-K` §7, §8 | mechanical |
| 37 | `research/IMPORT-MAP.md` | land row 15 as regraded: LANDED, no route, prediction HIT; THEOREM lowered to one asymptotic marginal at fixed `M`; containment strict, not exact | `import-fracparts` §8 (draft row supplied) | second reader |
| 38 | `research/IMPORT-MAP.md` | add rows 16 and 17 as priced | `import-map-rows-15-17` §1 | second reader, **and row 16 needs regrading first** (V-E) |
| 39 | `research/SEARCH-CONVENTIONS.md` §1 | add the record-location-statistic row: our "trend load A" / "the 6%" maps to Kourbatov's `b` in `E_1 = a log(p/a) − ba` and to the mode `µ*` of the standardized gaps; search `b`, `E_1`, `median-unbiased`, `standardized maximal gaps` | `lit-kourbatov-shortfall` §7 (row supplied verbatim) | mechanical |
| 40 | `research/SEARCH-CONVENTIONS.md` §1 | add "the distribution of the fractional parts of `N/n` and `N/p`", with Saffari-Vaughan I and II as anchor and Graham-Kolesnik as the method behind the error term | `import-fracparts` §6 | mechanical, but the novelty half is explicitly unchecked |
| 41 | `research/natal-cap-36-skeleton-door.js` P4 | computes `sSh[dep]`, the closable-side mass by depth, and never prints it, so the covered side's per-depth profile cannot be recovered from the embedded artifact | `import-fracparts` Defects | mechanical |

### 5b. Older staging records (5)

| # | target | proposed change | proposing file | status |
|---|---|---|---|---|
| 42 | `research/history/staging/attack-wrongdirection-audit.md` §3.5 | same base-16-only legal-zone framing as `TODO.md` 1d; ceiling `7.6394` is `7.639457` truncated (conservative, display only) | `hsubpow-explicit-K` §8 | mechanical |
| 43 | `research/history/staging/attack-wrongdirection-audit.md` §3.8 | the `2.393` tag `[ARITHMETIC, unstamped, no adversarial pass]` can be softened; it reproduces to four digits | `thm-sharp-sieve-range` §8 | mechanical, owner's call |
| 44 | `research/history/staging/zonegap-prior-art.md` §6 | the proposed Kourbatov-Wolf bullet needs one added line: the 2013 paper already quantifies the twin location shortfall at `b ≈ 1.2597` and `µ* = −1.659` | `lit-kourbatov-shortfall` §7 | mechanical |
| 45 | `research/history/staging/zonegap-03-model.md` §3 | "the finite-height non-exponentiality of real twin gaps" is a mechanism claim carried at the register of a measurement; and no sentence may present the 6.0% as an in-house finding | `record-location-null` §9, `lit-kourbatov-shortfall` §6 | mechanical |
| 46 | `research/history/staging/import-vc-nets.md` §6 | regrade the arXiv:2208.06442 bullet from "PRIOR ART, NOT CLEARED" to "PRIOR ART, CLEARED AT THE PAPER; NEIGHBOURHOOD ONE PAPER SHORT"; correct the title to "multiples of the primes" | `lit-vc-multiples` §7 | mechanical |

Two further sibling-to-sibling corrections are recorded in §3 rather than here,
because their targets are files in this day's own set:
`head-residual-factor.js` SEC 2b's non-density-consistent null (N-7), and
`head-residual-null.md` §3 readings 2 and 3 (N-8, N-9).
`destroyer-census-01.md` §6(a)/§6(b) is flagged by `head-residual-factor.md` for
an unstated ensemble difference (0.7064-0.7344 against 0.6693), which is a
presentation note and not a number correction.

---

## 6. Per-cluster summary, caveat first

**Certificate engine (5 files).** Nothing here reaches a finite level and every
file says so before it says anything else: `thm-capK-bv` calls its own theorem
"empty in every range anyone will ever compute", `thm-buchstab` says its theorem
"certifies the transfer exactly where the transfer does nothing", and
`thm-sharp-sieve-range` finds that the sharp instrument, which was supposed to
rescue both, is worse at every finite level because its error constant is
unwritten in the only source the repo holds at a page. What moved: two survey
statements became theorems at short-note grade with the density factor corrected
(from `∏(1−2/(q_i−1))` to `∏(1−1/(q_i−1))`, measured wrong by 5.0% to 32.4% and
worsening with `K`); the Tail Comb Equidistribution Conjecture becomes a limit
theorem, unconditional and ineffective, at shallow depth; the tail constant drops
`2 ln 2 = 1.386` to `(ln 2)/2 = 0.347` at modulus 30; and the Comb Discrepancy
Lemma's constant becomes exact at @7..@29 (`D_29 = 81.5492` against `2·3^7 =
4374`), which raises the engine's certified head share from 1/3/6 primes to 4/6/9
at @17/@19/@23 by pricing dilations rather than by a better uniform constant.
None of it is a proof about twin primes, none of it touches the head of the
scour, and none of it moves the exponent, which every file states in its own
"does not buy" list. No second reader has seen either theorem.

**Var/E (2 files).** No closed form is proven and the one candidate rests on a
single unproven step whose error is measured only twice, at 15% and 4%, with the
sign flipping between `x = 11` and `x = 13`; the candidate limit is reached by no
computed level (the model is still 0.054 short of itself at `x = 41`); and the
route is Gorodetsky's convention at two classes, with the paper unread and the
`k`-class case unsearched. With that said: `δ ln²W → 16C₂e^{−2γ}/3 = 1.109905`
is PROVEN, so the whole question is one coefficient in front of `ln²W`; the
Montgomery-Soundararajan route is shown to have nothing to compute, by an exact
prime-by-prime identity; and the live claim that the limit is near 0.611 is
refuted **as an inference** by a control whose limit is 0.455456 by construction
and which the same protocol reads at 0.6151. The candidate is
`λ₂(2) = 1 − e^{−2γ}(9/2 − 4 ln 2) = 0.45546`, HEURISTIC, matching 22 measured
points with no fitted parameter to within 0.0022 for `x ≥ 13`. The corpus should
stop quoting 0.611 in four live documents; the two files disagree on what to
quote instead.

**Z4 head (3 files).** No derivation of the residual was reached and the final
file's own summary is that the head half now reduces to Hardy-Littlewood, which
already implies the conjecture the programme is attacking, so the reduction is
in what is claimed rather than an advance; HL also over-predicts the endpoint
deficit by 5.5 standard errors with the same sign at three windows and four
cuts, and nothing here derives that 5%. What the three files establish, and they
reproduce each other's shared columns exactly across two independent re-sieves:
`h − R` decomposes into three exact parts of which one has a closed form
(`A_forced = ln p − 4C₂/ln p`, matching to 0.002 at the top window); Z4's
specific question is answered NO, the residual is not the mod-30 class
correlation, by three bounds each an order of magnitude short; the programme's
own null gives `β = 2` and `CV² = 1` exactly and therefore settles the direction
while missing the rate by a power of `ln p` and the sign; and the second and
third files correct the first and the second respectively on the β null
(`2 − 2/ln p` to exactly 2), on the two-live-positions share (52% to 16%), on the
left-heaviness (mechanism to binning artefact), and on the rate (`1/ln p` to
`ln ln p / ln p`). Every correction is annotated at both ends.

**Z5 records (2 files).** The 6.0% record-location deficit is not an in-house
finding: it is Kourbatov's published shortfall coefficient `b`, in the same
normalisation on the same ladder, with his median-unbiased `1.2597` reproducing
to four decimals at his own cut, and the novelty claim is withdrawn. The
four-digit match is not cut-stable (median z moves ±0.05 one cut either side and
sits on a single record), the comparison is a reproduction rather than a
confirmation since `b` was fitted to the same data, and everything on both sides
is conjectural: nothing in Kourbatov-Wolf is proven and the 2013 paper's relevant
statement sits under a "Conjectures" heading. What stands from the in-house work
is the matched simulated null and its ensemble sigma, absent from all four papers
read, and the finding that the deficit survives four corrections and is enlarged
rather than reduced by conditioning on the observed record count (z −4.24). The
largest exposure has been replaced, not removed: arXiv:1401.6959's Cramér-model
ensemble was skimmed and not read.

**Imports (2 files).** Zero routes, as priced, and the record stands at 22-for-0
on this corpus. Row 15's prereg hit its kill test at all four levels (largest
covered branch 5.68%, against a 10% kill), and the run **lowered** the row's own
pricing on two grounds found at the page: Saffari-Vaughan's Theorem 10 controls a
marginal while the skeleton door is joint, so no branch closes; and its
`exp(−C(log x)^{1/3})` saving certifies no finite level, admitting `M = 30` at no
level in the ladder. What was banked is a published anchor for an object the
corpus has carried unnamed since 2026-08-15, one asymptotic marginal theorem at
fixed `M`, and a wall address sharper than the row anticipated: on the open side
`M_T > lB` is exactly `q > W/M_T`, so the phase never wraps and there is no
fractional part left to equidistribute. Row 16 is the one file in the day's
output that is stale: its premise, that TODO Z5's corrected-null move is untried,
was executed 6 minutes later and its prior-art half was closed 18 minutes later,
in a different field.

**Singletons (6 files).** Each is internally consistent, carries its own
falsifier table, and contradicts only the live layer. `hsubpow-explicit-K` closes
three mechanisms with two proven divergences (`K* ≥ π(y′)−π(y)`, and
`θ_b(y) ≳ 4.805·ln b·ln y`) and one exponent-gap lemma, proves no `K` at any
base, and corrects the live legal zone at both ends. `fold-ledger-forced`
enumerates what the ledger's columns force, finds only ceilings on `net` and
floors on `by_old` that diverge from the truth by `(log/log log)²`, and
downgrades the live `by_new = O(1)` line from forced to MEASURED. `excess-chain-c`
writes down the correction TODO item 10 asked for, scores it, and rejects it by
sign: both named mechanisms lower the predicted maximum while the measured `c`
sits above the prediction at five of eight levels, so the residual relocates from
tail shape to `n_eff`. `rho2-analytic-bound` refutes its own brief's premise (the
first move was executed a week earlier), audits the derivation clean, names the
unnamed constant `170.88 = (27/16)e^{8γ}`, and quantifies why Chebyshev off any
second moment provably cannot reach the target. `c2prime-refit-22` closes item 1c
at the level the data supports (the drift is class-count-blind and its rate is
unmeasurable on the item's band, with the ten-point estimator's true spread 2.47
times its nominal error and the wrong sign 45% of the time on a column known to
be drifting). `lit-vc-multiples` reads one paper in full at two sources, finds
the range spaces disjoint at the level of theorems, and stops one paper short of
a clean neighbourhood because Helmbold-Sloan-Warmuth Theorem 3.1 is closed access
and was reached at abstract level only.

---

## What would falsify this, and whether that check has run

| claim | falsifier | has the check run |
|---|---|---|
| the twenty contradictions of §1 and §2 are real disagreements and not misreadings of one of the two files | any entry where re-reading both files in full shows the two statements are compatible as written, or shows a third file already reconciles them | **RUN in the weakest form only.** All twenty entries were read at both endpoints, in full, in this session. No entry was checked against the wider corpus, and none of the underlying mathematics was re-derived. A misreading by this pass would look exactly like a contradiction |
| the four strict convergences (C-1 to C-4) are independent | either file citing the other, or both citing a common third file that already carries the finding | **RUN by inspection of the source ledgers and citation lists.** `thm-buchstab` §9 has no `thm-mod30-tail` row and `thm-mod30-tail` §5 cites only the survey and `staircase-note.md`; `thm-capK-bv` names `thm-mod30-tail` and not `thm-buchstab`; `comb-discrepancy-tight` and `thm-buchstab` name no common source for the `2·3^k` qualifier beyond `natal-cap-25`; `import-map-rows-15-17` predates `lit-kourbatov-shortfall` by 18 minutes and neither names the other. **NOT RUN:** whether a third, older staging file already carries C-1 or C-3. `fold-ledger-forced` §8 shows how often that turns out to be true |
| the 46 collected corrections are all the corrections proposed | a "Defects noticed in passing" entry, or an in-body proposal, missed by this pass | **RUN.** Every file's Defects section, every §"proposed edit" block, and every falsifier row naming a live document was read. **PARTIAL:** proposals stated only inside a proof or a table cell may have been missed, and the count is a floor |
| the "mechanical" grade is right on each of the 34 rows so graded | a row where applying the change as written would require a judgement the proposing file did not make | **NOT RUN.** The grade is this pass's reading of whether the proposing file has already done the check, not a verification that the edit is safe. Twelve rows are graded "second reader" for that reason; the other 34 have not been tested |
| `lit-dickman-variance.md` does not exist | the file appearing in `research/history/staging/` | **RUN** at the start of this pass, by direct listing. It did not exist. Any finding in it is absent from every count above, and the Var/E cluster verdict in §3 V-B may move when it lands |
| the live-doc quotations in §2 (0.611, ~30x, 1.3555/1.3946, the two forbidden residues, 9.69/17.40/22.93%, "19+ε") are what the live files actually say | a grep of the named line returning different text | **RUN** for all six, at the named files and line numbers. The `research/GLOSSARY.md`, `research/README.md`, `TODO.md`, `paper/variance-note.md`, `research/certificate-engine.md` and `research/dhr-verification.md` strings were read this session |
| the supersession direction in each of the twelve number entries is the one the earlier file's author would accept | the earlier file containing a defence of its own value that the later file does not address | **RUN by reading, NOT RUN by asking.** In eight of twelve the earlier file explicitly leaves the question open or flags the value as provisional. The four where it does not are N-5a (an intra-file label), N-9, N-10 and N-11, all in the Z4 cluster, and in all four the later file quotes the earlier file's own sentence before overturning it |
| row 16 of `import-map-rows-15-17.md` is genuinely stale rather than complementary | a reading of `record-location-null.md` under which its N3 correction is not the marginal correction row 16 proposes | **PARTIAL.** N3 is the height-marginal correction and it moves the deficit by 0.05 percentage points; row 16 also proposes two further nulls with the same record-time law and different gap marginals, and an `F^α` null, neither of which `record-location-null.md` ran. So the row is partly stale, not wholly. The regrade recommendation in §3 V-E stands on the prior-art half, which is fully closed |
| no file in the set contradicts another silently | a contradiction this pass classified as "stated" that is in fact only implied | **RUN by requiring an explicit sentence.** Every entry marked "stated, not silent" was matched to a quotable sentence in the later file. One entry, N-3, is a staleness the later file could not have known about and is marked as such, not as a contradiction |
| nothing in this pass opens a route, moves an exponent, or bears on the conjecture | any finding here doing so | **Cannot fail.** This is an editorial pass over statements. It contains no derivation, no measurement, and no claim about twin primes |
