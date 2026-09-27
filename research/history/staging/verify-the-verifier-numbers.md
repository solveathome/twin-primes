# Verify the verifier: is `audit-numbers.js` circular?

<!-- ledger
id: Q-verify-audit-numbers
status: ANSWERED
todo: none
question: Is audit-numbers.js circular?
verdict: Not circular in the way that would matter most, since it reads no other repo script, but 15 of its 117 checks certify nothing and 17 more are artifact echoes among transcribed constants; the one bug class the charter was written against had nothing in sections A to W to fire against and still has nothing, and one from-scratch re-implementation found a check depending on an unnamed hard-coded phase choice.
-->

*(Audit of the auditor, 2026-08-20. Scope: the 117 checks of
`research/audit-numbers.js` as of commit `ab34c82`, sections A..W in driver
order. Section X was being appended by a sibling while this ran and is OUT OF
SCOPE; §9 records what it changes about the findings below. Nothing in
`audit-numbers.js` was edited: every fix here is a proposal. `node
research/qc.js` was clean before and after.)*

**One-line verdict.** The file is not circular in the way that would matter
most — it reads no other repo script, so no producer's bug can leak into it by
import — but **15 of its 117 checks certify nothing** (they are arithmetic on
inline literals, or same-file duplicates of another check), **17 more are
artifact echoes** that assert relationships among transcribed constants, and the
one bug class the charter was written against, the a3-03 census alias, **had
nothing in A..W to fire against and still has nothing.** Four checks were
re-implemented from scratch in a different language and all four agree; the
fifth re-implementation found that check W1's answer **depends on a hard-coded
phase choice the check does not name**.

---

## 1. Classification, all 117

Sections are lettered here in driver-execution order, since the file itself
labels only `W`. Counts are of individual `check()` outcomes, so the `G2(x#)`
loop counts 11 and the `W2` loop counts 7.

| § | what it checks | n | FP | FP-DERIVED | ARTIFACT-ECHO | TAUTOLOGY |
|---|---|---|---|---|---|---|
| A | loudness @17, the known positive | 4 | | 4 | | |
| B | loudness @19 row, and four re-derivations of it | 8 | | 8 | | |
| C | G2(41#) certificate | 4 | 3 | | | 1 |
| D | G2(43#) certificate | 5 | 4 | | | 1 |
| E | theta of a primorial, and the retired `2v` form | 2 | 2 | | | |
| F | slots vs integers at block 1 | 4 | 2 | 1 | | 1 |
| G | window conventions, and the four gap objects ordered | 3 | | | | 3 |
| H | the named constants | 8 | 5 | 2 | 1 | |
| I | one-class ladder h(x#), and G2/h | 2 | 1 | | | 1 |
| J | A091592 | 1 | 1 | | | |
| K | Li, HL and the 1e11 census | 2 | 1 | | 1 | |
| L | the G2(41#) prediction band | 7 | | 6 | | 1 |
| M | pointwise ladder inequalities, local exponents | 5 | | | 5 | |
| N | A059861 by sieve and by closed form | 2 | 2 | | | |
| O | G2 draft DATA, primorials, the p'^2 margin | 6 | 2 | | 3 | 1 |
| P | a(n)/(p ln^2 p) | 3 | | | 3 | |
| Q | the c = G2/(mbar lnD) fit, and the retired index | 5 | | 5 | | |
| R | the control-corrected exponent 1.54 vs 1.57 | 8 | | 5 | 1 | 2 |
| S | draft bounds and the CROSSREFS identity | 3 | | | 3 | |
| T | seam DATA, twenty terms plus the extension | 6 | 6 | | | |
| U | the seam heuristic and its retired halving | 6 | | 2 | | 4 |
| V | the G2 ladder itself, 2# to 37# | 14 | 14 | | | |
| W | the fold-L wave regression floor | 9 | 9 | | | |
| | **total** | **117** | **52** | **33** | **17** | **15** |

**FIRST-PRINCIPLES (52).** The computed side is rebuilt from a raw definition
by code that shares no path with whatever produced the claimed value, and the
claimed value is an external anchor (OEIS, the literature) or a second method
inside the same run. Concretely "independent" means one of three things here:

- *different algorithm*: §N's A059861 is counted by a `gcdInt` residue scan and
  then again by the closed form `prod (q-2)` (lines 477-478), and the two are
  asserted against each other;
- *different arithmetic domain*: §T rebuilds all thirty seam terms from a
  self-contained BigInt Miller-Rabin, and the drafts they are checked against
  came from a different tool entirely;
- *external anchor*: §I's h(x#) and §J's A091592 are recomputed by sieve and
  checked against OEIS, which no one in this repo wrote.

**FP-DERIVED (33).** The arithmetic is genuine and rebuilds the doc's number
from more primitive inputs, but at least one input is a literal transcribed
from an artifact. §L's whole band is `(literal G2 table) / (BigInt-computed
m·lnD)`; §Q's fit is the same; §R's bias comes from a 58-term A048670 array
typed into the file. These catch arithmetic drift and rounding drift. They do
not catch a wrong input.

**ARTIFACT-ECHO (17).** Reads numbers out of embedded OUTPUT or literal tables
and asserts a relationship among them. Legitimate as a consistency net. What it
would *not* catch, in every case: a value that is wrong but still satisfies the
relationship. §M's three pointwise orderings (`h <= G2 <= h2`) are the clearest
example — every term of all three ladders could be wrong by the same factor and
all three checks still pass.

**DOC-ECHO / TAUTOLOGY (15).** Listed in full in §2.

---

## 2. The tautology list, all 15, ranked

**Class 1 — cannot fail under any change to the corpus.** These compute a
number from literals written inline in the same expression, and compare it to
another literal. Editing any live document, any artifact, or any other check
leaves them untouched.

| line | check | why it certifies nothing |
|---|---|---|
| 670 | `x'^2/x^2 at x=41 = 1.0999` | computes `43*43/(41*41)`. Both operands inline. It asserts a fact of arithmetic. |
| 672 | `Y2(37) <= G2(37#)-1` | the expression is `527 <= 528 - 1`, i.e. `527 <= 527`. **Y2(37) = 527 is the number this is supposed to guard and it appears only as a literal here; nothing recomputes it.** |
| 673 | `G2(37#) = 528 and the covering optimum is G2-1 = 527` | the expression is `528 - 1` vs `527`. |
| **705** | **`G2(41#) lies inside the pre-registered Poisson window [476,633]`** | **the expression is `546 >= 476 && 546 <= 633` with `546` written as a literal. The certificate walk four lines above computes the gap into `n - r0` and this check does not use it. If the walk returned 500 this check would still pass.** The one repairable defect in this class. |
| 570 | `the two differ, so quoting one for the other is an error` | `abs(1.539 - 1.567) > 0.02`, entailed by the two checks immediately above it, with 0.008 of margin. |
| 667 | `capacity is BELOW the 19 slots needed` | `17.96 < 19`, entailed by line 666. |
| 631 | `seam heuristic with the retired /2` | `exact/2` against `26.3`, entailed by line 629's `52.5`. |
| 731 | `G2(43#) recorded position is below 2^53` | literal `<` literal. Entailed by line 732, which uses the same `r0`. Harmless as documentation of the wheel-23 defect; it adds no coverage. |

**Class 2 — same-file duplicates. Fail only when the check they duplicate also
fails.**

| line | duplicates | note |
|---|---|---|
| 358 | line 346 | identical expression `Math.round(lo * base)`, identical claim `476`. Labelled a retired-value guard for `475`, but line 346 already is one. |
| 632 | line 608 | identical expression `got.slice(0,20).reduce(...)`, identical claim `48`. |
| 636 | line 66 | `e^{2g}/(2 C2)` against `2.4026`, twice, from the same two literals. |
| 637 | line 67 | `e^{2g}/(4 C2)` against `1.2013`, twice. |
| 579 | line 377 | `A048670(n) <= a(n)` at twelve terms, on the same two literal arrays. |
| 581 | line 378 | `a(n) <= A288815(n)` at twelve terms, same. |

Two more duplicates sit inside the FP-DERIVED class and are worth naming even
though they are not tautologies: line 524 (`mean 0.4814`) recomputes line 345,
and line 526 (`range 0.4463..0.5939`) recomputes line 344, over the identical
eight levels by the identical arithmetic.

**Class 3 — transcription-only.**

| line | check | what it really tests |
|---|---|---|
| 311-315 | `G2/h at x = 5..37` | `G2c` and `hc` are literal tables typed at lines 311-312 and `claimedRatio` is a literal list of the ten quotients. The check divides literals by literals and compares to literals. **It does not use the `got` array of h values the same function computed twenty lines above, nor the ladder's computed G2.** |
| 487 | `G2 DATA field, twelve terms` | asserts a hard-coded array equals a hard-coded string, both typed in this file. The comment concedes the point: *"the terms themselves are rebuilt from scratch in parts `ladder` and `g2big`"* — and nothing connects the two. |
| 558 | `control A048670 has 58 terms` | `A048670.length === 58`, on an array literal in the same block. |

---

## 3. Shared-helper contamination

`audit-numbers.js` requires nothing outside `fs`/`path` (and those only in the
sibling's section X), so **cross-file contamination with a producer is zero by
construction for A..W.** The contamination that does exist is of two other
kinds: helpers shared *between checks inside the file*, and checks that
*reimplement the producer's algorithm* rather than choosing a different one.

### 3.1 Intra-file helper graph, for the ten most load-bearing checks

| helper | checks that depend on it | is the helper itself guarded? |
|---|---|---|
| `PRIMES` (sieve to 2e5) | almost everything | **yes, three ways.** §J builds its own sieve to 9e6, §A builds its own `sieve()`, §T's `isPrimeBig` is a Miller-Rabin. Three independent counterparts in-file. |
| `lnBig` | §L's six band checks (476/513/633/488), §Q's five fit checks (0.4814, 10.2%, 0.4463..0.5939, 0.0406, 69.4%) | **NO.** Eleven checks and both headline band numbers ride on one 15-digit string truncation, and nothing asserts `lnBig(D)` against `sum ln(q-2)`. The file *prints* that cross-check at line 336 — `check theta(x) - ln m = ... (must equal lnD)` — as a `console.log`, **not** as a `check()`. A bug in `lnBig` shifts all eleven consistently and the run stays green. |
| `maxCyclicGap` | §V's eleven G2 terms, §I's h ladder | **partially.** §I's output is anchored to OEIS A048670, so a wrap-handling bug would surface there. |
| `liftOne` / `liftTwo` | G2(31#) = 348, G2(37#) = 528, both self-tests | **NO.** `liftTwo` *is* `liftOne` with an outer class loop: identical "longest compatible suffix" restart logic, copied. The two self-tests at lines 851-852 exercise `liftOne` and `liftTwo` against each other, so **a bug in the shared suffix logic passes both self-tests.** The only external anchor for 348 and 528 is the `claimed` literal. |
| `build29` | G2(29#) = 258 | cross-checked against `liftOne` at line 851. This one is a real two-method agreement. |
| `simpsonLog` | §K's two checks, i.e. the entire Zone-Postulate census guard | **NO.** One quadrature routine, no closed-form calibration anywhere. |
| `isPrimeBig` | §T's six seam checks | **NO** in-file. Externally anchored by A060256 (line 613) and by SV2 below. |
| `level()` (§A/§B) | all twelve loudness checks | see §3.2. |
| `check()` | all 117 | string-compares when either side is non-numeric. `check(x, true)` works; `check(undefined, undefined)` would pass. Not currently reachable. |

### 3.2 Algorithmic contamination: the loudness "known positive"

The file's design here is explicit and, on its face, exemplary: run `level(17)`
first, match cap-31's independently produced @17 row, and only then believe
`level(19)`. The comment says cap-31's row "was produced by a completely
different algorithm (a full per-rotation sweep of survivors, strikes and overlap
credit)".

That is true of S-bar and of max VR. **It is not true of the object.**
`natal-cap-31-calm-vs-kill.js:77-78` seeds the natal set as

    for(let r=11;r<W;r+=30)A[r]=1; for(let r=17;r<W;r+=30)A[r]=1;
    for(const p of basePs){ ... A[j]=0 ... }

and `audit-numbers.js:756-761` seeds it the same way, line for line, then
computes K over the same `q > x, q*q <= W` window and V-bar by the same
`n[a] + n[a-2] - 2N/q` formula. Two consequences:

1. The natal set **drops the twin class `29 mod 30`**, one of the three twin
   classes mod 30, giving N = 14,850 against D(17#) = 22,275 = 3N/2. That is a
   convention (it is the class whose partner crosses the wheel boundary), and it
   may well be the right one, but **no check in A..W states it or tests it**, and
   both the audit and the producer would pass with it wrong.
2. Checks 83-86 are therefore not four independent confirmations. They are one
   confirmation for S-bar (two genuinely different routes to the same identity)
   and one for max VR, plus two shared-construction agreements for K and V-bar.

The audit is nonetheless **stronger than its producer** on the @19 row, and that
deserves saying: `natal-cap-38-loudness-driver.js:182` takes `K: 435, Vbar:
8944.60, maxVR: 2.293` as **hard-coded inputs** from cap-19, whereas
`audit-numbers.js` recomputes all three. That is exactly the upgrade this file
exists to make.

### 3.3 The five copies of the G2 table

`{2,6,12,30,42,66,108,150,204,258,348,528}` is typed into the file five times:
line 117 (`claimed`, the only one the ladder is checked against), line 311
(`G2c`), line 322, line 369 and line 486. The h ladder is typed twice: computed
into `got` at lines 290-307, and typed again as `hc` at line 312.

**No check asserts that any copy equals any other, or that any copy equals the
ladder's computed `L.got`.** A single-digit slip in any of the four downstream
copies changes §L's band, §M's inequalities, §P's ratios, §Q's fit and §R's
exponent, and the ladder checks in §V would not notice.

### 3.4 One asymmetry in §V

Lines 851, 852 and 858 all take `Math.max(internal, boundaryCheck(...))`.
Line 843 calls `boundaryCheck(B, 31, null)` and **discards the return value**,
so the `G2(31#)` check at line 840 asserts the internal lift only. It passes
because the widest copy-boundary gap at 31# is 84 against an internal 348
(baseline run, line 474 of the transcript), but the check as written is not the
complete recomputation its three siblings are.

---

## 4. The census-bug counterfactual, run honestly

**The bug.** `research/a3-03-f-from-census.js:86` holds each prime's avoided set
in one 32-bit word: `a[j] = (1 << r0) | (1 << r2)`. JavaScript takes shift counts
mod 32, so for `q > 32` residues alias and every `(q - |A_q|)` factor is
under-read. T_x carries a prime above 32 iff x >= 37, so every census point from
x = 37 up is wrong by 0.62x to 1.05x, and the regression fitted to them was
wrong with them. The producer was embedded and gate-green throughout.

**Would any A..W check have caught it? No, twice over.**

*First, and decisively: there is no check for f.* Reading all 117 labels: none
mentions f, `count_x(d)`, the grain census, the qualifying comb, or the
`ln(1/f)` regression. The audit's coverage of the entire fold-decay layer is
zero. The bug had nothing to fire against, and still has nothing.

*Second, had a check existed and been written in this file's house style, it
would have caught it.* Every residue computation in A..W uses `%`, never a
shift: `isSlot` at lines 698 and 730, `r % q` in W2, `r % p` in W1, `killer[]`
as `Int16Array` in W3. A `%`-based recomputation of f at x = 37 disagrees with
the producer at the first aliased prime. So the file is **structurally immune to
that bug class and structurally blind to the layer it lived in**, which is the
uncomfortable shape of the finding: the immunity is a side effect of the house
style, not of any rule, and nothing enforces the house style on a future
section.

**What it implies about which classes of number have no guard.** Four classes,
and they are the same four everywhere in A..W:

1. **Fitted numbers.** Regression coefficients, R-squared, exponents fitted to
   measured points. The audit checks refits of data it holds (§Q, §R) but never a
   fit whose data lives in a producer's OUTPUT.
2. **Search and optimisation outputs.** Anything whose truth is *maximality* or
   *optimality*: G2(41#) and G2(43#) are certified `>=` only, by the file's own
   admission; Y2(37) = 527 is a greedy construction and is a bare literal at line
   672; the ILP lower bounds in A072753 are transcriptions.
3. **Anything past the 152 s budget.** x >= 41 maximality, windows past 2e7,
   depth-2 and depth-3 ceilings, the deep-fold tail certificates. The section W
   header says so plainly.
4. **Literature imports.** beta_2, the tail of A048670, A288815, A072753. Some
   are cross-checked against each other (line 584); beta_2 is not cross-checked
   against anything.

---

## 5. The unguarded top ten

Live-layer numbers with **no independent recomputation anywhere in A..W**,
ordered by how much of the corpus rests on them.

| # | number | where it is load-bearing | nearest thing to a guard |
|---|---|---|---|
| 1 | **beta_2 = 4.26645028414864191641** | 25 live .md files; the sifting-limit wall itself; the "exponent 4.2665 -> 2" framing | none. Line 71 divides by it and asserts the quotient 1.2417. `attack-beta2-04-loss-budget.js` recovers 4.26660 by shooting (3.5e-5 relative) but that is a producer, not the gate. |
| 2 | **the eight A144311 terms past 43#** (G2 = 708, 870, 966, 1080, 1284, 1398, 1530, 1710) | `PRIOR-ART.md:363`, `covering-dive.md:193`, `G2-STATE.md:773` | none. The audit stops at 43# and its OEIS section audits `oeis-G2-submission.md`, which `covering-dive.md:193` has already ruled **a duplicate that must not be submitted**. Roughly twenty checks (§O..§S) guard a retired draft while the sequence the live layer actually cites is unguarded. |
| 3 | **G2(41#) = 546 and G2(43#) = 618 as maxima** | the two newest ladder terms, the Poisson-window headline | the certificates prove `>=` only. Maximality rests on two enumerations that the gate does not rerun and cannot afford to. Stated honestly in the file; still unguarded. |
| 4 | **the fold-decay law** `ln(1/f) = 1.917 + 1.4016(+-0.0235)(2p/mbar) - 1.021 ln s(d_min)`, R^2 0.9867 | `a3-03-f-from-census.md:19`, `f-decays.md:20`, `ATTACKS3.md:117`, `U-FRAME.md:465` | none. This is the corrected law that replaced the aliased one. Nothing in the gate would catch a second alias. |
| 5 | **A048670 terms 11..58** (h(31#) = 58 through h(271#) = 954) | the control that produces the bias 1.262/1.280/1.282 and therefore the headline exponents **1.54** and **1.57** | none. §I recomputes the first ten and line 309 says so: *"h(31#)=58 and h(37#)=66 are taken from OEIS A048670 (Hagedorn); not recomputed here."* Forty-eight transcribed terms carry two headline numbers. |
| 6 | **Y2(37) = 527** | `G2-STATE.md:740-758`, the covering/greedy comparison | none. Lines 672-673 are the two tautologies above. |
| 7 | **1.847**, the h2 raw slope on nineteen terms | half of check 568, hence the 1.57 that must differ from 1.54 | none. `rawG2` is recomputed from the G2 array by `slope()` at line 565; 1.847 is a bare literal at line 568 even though the same `slope()` is right there. |
| 8 | **the census 224,376,048** (twin count below 1e11) | the Zone-Postulate census | §K bounds it to 0.5% of a Hardy-Littlewood integral. That constrains the *magnitude* and would catch a 1e10-vs-1e11 confusion. It would not catch a 0.1% error, and 0.5% of 2.2e8 is over a million. |
| 9 | **the extinction folds 331, 421, 457** and the pre-registered bands | `attack-foldL-06-scaling.js:1147`, the out-of-sample law test | §W guards **181 only**, and only inside `[0, 2e7)`. The three larger windows are past the budget. Note also that W3 walks folds to `PMAX = 499` with no assertion that the answer is below the ceiling. |
| 10 | **the survival-curve trough numbers 0.8926 / 0.8927 / 0.8929** at three sampling conventions | `FOLD-PROFILE.md:398-410`, and the fourth confirmation of the e^{2gamma}/4 trough constant | none. Only the constant `e^{2gamma}/4 = 0.793055` is guarded (line 53). The three measured values and the finite-size factor 1.1238 are not. This is exactly the shape that produced wave 5's false S2-19 alarm. |

Runners-up worth naming: the L ceiling factor **0.58 to 0.95 ln p**
(`U-FRAME.md:408, 782`) has no numeric guard; `L <= 0.18 p` likewise; and
A072753's ten terms at line 585 are a transcription checked only against another
transcription.

---

## 6. Five from-scratch spot-verifications

Re-implemented in Python with deliberately different algorithms and data
structures. Scripts in the session scratchpad; all values below are as printed.

**SV1 — the G2 ladder, x = 2..23 (§V, 9 of the 14 checks).** The audit builds
each level by copy-and-delete from the level below, sorting the survivor list.
This rebuild instead lays one flat `numpy` boolean array over Z/x#, marks
`0::q` and `(q-2)%q::q` by strides, and takes the cyclic gap from `np.diff`.
Different construction, different language, no sorting.

    x= 2 D=1        G2=2      x=13 D=1485     G2=66
    x= 3 D=1        G2=6      x=17 D=22275    G2=108
    x= 5 D=3        G2=12     x=19 D=378675   G2=150
    x= 7 D=15       G2=30     x=23 D=7952175  G2=204
    x=11 D=135      G2=42

**AGREES** with the audit at all nine, and every D matches `prod (q-2)`
independently. The audit's 29#, 31# and 37# are past what this method can hold
and were not re-verified here; §3.1 records that they rest on one algorithm
family.

**SV2 — the seam sequence, thirty terms (§T, all 6 checks).** The audit uses a
fixed-twelve-base deterministic Miller-Rabin in BigInt JavaScript. This rebuild
uses **Baillie-PSW** in Python: Miller-Rabin base 2 plus a strong Lucas test with
Selfridge parameters. Genuinely different primality algorithm.

    a(1..20)  = 2, 4, 4, 3, 4, 6, 2, 1, 7, 1, 1, 2, 0, 1, 1, 1, 3, 1, 0, 4
    sum       = 48
    a(21..30) = 0, 2, 1, 1, 2, 1, 1, 1, 0, 1
    least witnesses = 2,1,1,2,1,6,8,11,4,16,22,4,-,24,37,28,14,11,-,11,-,20,83,91,35,80,48,47,-,2

**AGREES** with all six checks, including the A060256 correspondence and the
"zeros are exactly where A060256(n) > prime(n+1)" claim (verified at n = 13, 19,
21, 29: 74 > 43, 242 > 71, 91 > 79, 226 > 113).

**SV3 — section W2, the seven diagonal L values (§W, 7 checks).** The audit
walks p copies of the tile with a running shift and patches the wrap with an
ad-hoc `firstRun`/`joined` join. This rebuild materialises the full residue
sequence and finds the longest cyclic run by the doubled-array method, with the
tile's slots derived by sieve rather than by the shift recurrence.

    L(T_5,7)=2  L(T_7,11)=1  L(T_11,13)=2  L(T_13,17)=2
    L(T_17,19)=2  L(T_19,23)=3  L(T_23,29)=2

**AGREES** at all seven. The wrap patch is correct.

**SV4 — section W1, first dead l (§W, 1 check). THIS ONE DISAGREES IN
SUBSTANCE.** The audit hard-codes the T_5 gap word as `(6, 12, 12)` repeated.
This rebuild derives the word by sieving Z/30 (slots 11, 17, 29, mbar = 10,
which independently confirms line 661) and then runs the counting criterion at
**all three phases** of the period:

    phase start=11  word=[6,12,12]  first dead l = 63   => L <= 62
    phase start=17  word=[12,12,6]  first dead l = 62   => L <= 61
    phase start=29  word=[12,6,12]  first dead l = 62   => L <= 61

The audit's `63` is right, and it is right **because 11 is the tile's first slot
and that phase happens to be the maximising one**. The check does not say the
answer is phase-dependent, does not derive the word, and does not take the max.
A future edit that re-derived the word from a different origin would produce 62,
`L <= 61`, and a red gate on a number that is not wrong. Proposed upgrade in §7.

**SV5 — the loudness @17 row (§A, all 4 checks).** Re-implemented in `numpy`
with `bincount` and `roll` for the class deviations, and with S-bar computed
**twice**: once by the weight identity (the cap-35 route, not the audit's
prefix-sum-over-rho route), and once by brute force, evaluating
`S(t) = #{r in rho : g(r - t) = 1}` at 4,000 random rotations.

    W=510510  N=14850  K=120        audit K=120
    Vbar   = 1144.4036              audit 1144.40
    maxVR  = 2.1427                 audit 2.143
    Sbar   = 3614.9297              audit 3614.93   (weight identity)
    Sbrute = 3615.13 +- 3.27        (4000 random rotations, brute S(t))

**AGREES** at all four, and the brute-force sample lands 0.06 sigma from the
exact identity. The §3.2 caveat stands regardless: this rebuild inherited the
`11, 17 mod 30` seeding from the audit, because that seeding is the definition
of the object and there is nowhere else to get it.

---

## 7. Upgrade plan

### 7.1 Echo to first-principles (six edits, all cheap)

| # | target | change |
|---|---|---|
| U1 | **line 705** | replace the literal `546` with the computed gap: `check('G2(41#) lies inside the pre-registered Poisson window [476,633]', (n - r0) >= 476 && (n - r0) <= 633, true)`. Turns a tautology into a real assertion for the cost of two characters. |
| U2 | **line 336** | promote the printed `theta(x) - ln m` identity to a `check()`. One line, and it puts `lnBig` — eleven checks' single point of failure — under the gate. |
| U3 | **line 66-67, 636-637** | feed `c2full` (line 64) into the four `e^{2g}/(kC2)` checks instead of the literal `0.6601618158468696`, and delete the two duplicates in §U. Makes §H3's Euler product actually load-bearing. |
| U4 | **line 568** | compute h2's raw slope with the `slope()` helper already in scope instead of the literal `1.847`. Needs the nineteen A288815 terms; the file currently holds twelve. Add the seven. |
| U5 | **line 311-315** | replace `G2c`/`hc` with the ladder's computed `L.got` and the function's own computed `got`, so the ratio table tests the ladder rather than a transcription. |
| U6 | **line 843** | `L.got[31] = Math.max(g31, boundaryCheck(B, 31, null))`, matching lines 851, 852 and 858. |

### 7.2 New checks for the unguarded ten

| for | proposed check | cost |
|---|---|---|
| #1 beta_2 | assert the printed roundings against one canonical literal, **and** add a comment naming `attack-beta2-04-loss-budget.js`'s independent shooting recovery (4.26660, 3.5e-5) as the only non-transcription evidence in the repo. A full DHR recomputation does not belong in a 152 s gate. *(The sibling's section X4 does the rounding half; see §9.)* | free |
| #2 A144311 tail | pin the eight terms past 43# as a literal table with an explicit `[TRANSCRIBED, A144311, not recomputed]` label, plus a check that `A144311(n) + 1` equals the audit's own computed G2 at all fourteen overlapping terms. That last one is a real external cross-check and costs nothing. | free |
| #3 41#/43# maximality | no gate-affordable check exists. Add instead a `check()` that the *multiplicity* recorded (4 at 41#, 8 at 43#) is consistent with the certificate's least-position claim, and keep the honest comment. | free |
| #4 fold-decay law | recompute f(x, p) by direct sieve at x = 11, 13, 17, 19, 23 (the levels `a3-03` calls UNAFFECTED) and assert the five values against the law's prediction. That is 5 of 51 window levels, but it is the levels where `%`-arithmetic can reach, and it would have caught the alias the moment the law was extended past 32. | ~1 s |
| #5 A048670 tail | stream h(31#) by the same method §I already uses for 29#. phi(31#) = 3.07e10 is past the gate budget; do **h(31#) only**, offline, once, and pin it. Then at minimum assert that the 58-term array is monotone increasing and that its first ten equal the computed ones. | ~2 s for the cheap half |
| #6 Y2(37) = 527 | run the greedy construction and assert 527, replacing lines 672-673. If the greedy is too slow, at minimum verify the *certificate*: exhibit the 527 consecutive integers and check each is covered. | seconds |
| #8 the 1e11 census | tighten §K by also asserting the ratio against pi_2(1e10) = 27,412,679, which the file already prints but does not check. Two anchors constrain the census far better than one. | free |
| #9 extinction folds | add `check('W3 the answer is below the PMAX ceiling', lastMulti < 499, true)`. Without it a fold past 499 reads as "no multi-kill". | free |
| #10 survival trough | pin the three sampling conventions as three separate labelled checks recomputed from the same curve, so the "neither figure is 0.8929" failure mode cannot recur. | needs the curve; defer |

### 7.3 Delete as false assurance

Eight lines. Deleting them takes the count from 117 to 109 and **increases** what
the file certifies per check, which is the point.

- **672, 673** — `527 <= 527` and `528 - 1 === 527`. Replace with U6's real Y2
  check, or with nothing.
- **670** — `43*43/(41*41)`. The unit lesson it documents belongs in the comment
  it already has; the `check()` adds nothing.
- **570** — entailed by 566 and 568, with 0.008 of margin.
- **667** — entailed by 666.
- **631** — entailed by 629.
- **632** — verbatim duplicate of 608.
- **636, 637** — verbatim duplicates of 66 and 67. *(Counted as one bullet;
  eight lines total across the list.)*

Keep but relabel, do not delete: **358** (duplicate of 346) and **579/581**
(duplicates of 377/378) carry retired-value documentation that has value even
though the assertion is redundant. Merge each pair and keep the comment.

Keep as-is: **558** and **731**. Both are trivial, but both guard a literal that
other checks consume, and both cost nothing.

---

## 8. What this audit did not settle

- **G2(29#), G2(31#), G2(37#)** were not independently re-verified here. SV1
  reaches 23#. The `liftOne`/`liftTwo` shared-suffix risk in §3.1 is therefore
  unretired by this pass. The sibling's section X6 closes 37# from the t37 shard
  partials; 29# and 31# remain on one algorithm family plus a literal.
- **Whether the `11, 17 mod 30` natal seeding is the intended object.** §3.2
  states the fact; adjudicating the convention needs cap-13, which was out of
  scope.
- **The three larger extinction windows** and everything else in class 3 of §4.
  These are budget-bound, not audit-bound.

---

## 9. Section X (out of scope, noted for the sibling)

Section X was appended during this pass; the file grew from 1,085 lines to at
least 1,354 while this ran, so the line numbers above are those of `ab34c82`.
X is a **cross-document constants audit**: X1-X4 assert every printed rounding of
a named constant against one closed form, X5 pins the `K/beta_2` break-even pair,
X6-X7 rebuild G2(37#) from the `t37-partials` shard JSONs. Three observations
that bear on this report:

1. **X6 closes unguarded-number #2's cousin and part of §3.1's `liftTwo` risk**
   by reconstructing 528 from shard data rather than from prose. That is a
   genuine second method for 37# and the first one in the file.
2. **X4's beta_2 checks are rounding tautologies on a literal**, by the
   classification of §1 — legitimate for their stated purpose (are all the
   printed forms roundings of one number?) but they do not move beta_2 off the
   unguarded list, and the section's own opening line, *"a number cannot be the
   witness that the number is right"*, applies to them.
3. **One X4 label looks wrong.** The check reads
   `check('X4 and "4.2665..." is NOT the expansion: digit 5 of the expansion is
   4, not 5', BETA2.toFixed(5).slice(-1), '5')` — the label says the digit is 4,
   the assertion says the last character of `4.26645` is `5`, and both are
   statements about a rounding rather than about the expansion. Worth a second
   look by whoever owns X.

X is also the first part of the file to call `require('fs')` and read artifacts
off disk. That is a new dependency class for this gate and worth a line in the
header comment.

---

## 10. Gate state

`node research/qc.js` before: 0 findings, clean, 11/11 checks.
`node research/qc.js` after: 0 findings, clean, 11/11 checks. No corpus file was
edited by this pass; `research/audit-numbers.js` was read only.

`node --max-old-space-size=16384 research/audit-numbers.js` at `ab34c82`:
**117/117 checks passed, exit 0, 410.7 s** on this machine (the header's ~152 s
estimate is stale; the 37# lift alone is 31 passes over 214.7M slots and took
about 280 s).
