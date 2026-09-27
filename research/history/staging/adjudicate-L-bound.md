# Adjudicating the block-1 bound: first dead, or last alive?

<!-- ledger
id: Q-block-L-first-dead
status: ANSWERED
todo: G (retired)
question: Is the block-1 counting bound on L the first-dead 62 or the last-alive 111, and does downward closure hold in the block coordinate?
verdict: Downward closure HOLDS in the block coordinate: L <= 62 is sound and recomputed from scratch rather than inherited, L <= 111 is true, implied by 62 and weaker by 1.79x, and the adjudication's supposedly sharper instrument is attack 3's instrument.
-->

*(2026-08-18. Commissioned to produce the number, not the decision. Everything
below was recomputed from scratch in `research/block-L-first-dead.js`; nothing
is quoted from another document without being rederived. Calibration marked on
every claim: PROVEN, VERIFIED by exact computation, MEASURED, INFERRED.)*

## Verdict

**Downward closure HOLDS in the block coordinate. `L <= 62` is sound. `L <= 111`
is true, implied by 62, and weaker by 1.79x.** Section 7a of
`research/sift-limit-attack.md` is correct and can drop its INFERRED flag: the
block-1 instrument has now been re-run and 62 is recomputed rather than
inherited.

Three findings section 7a does not contain:

1. **The adjudication's instrument and attack 3's instrument are the same
   function.** `W(l) = Smax(l)` at every `l` from 1 to 400, zero disagreements,
   and by CRT that is a theorem rather than a coincidence. The adjudication's
   "computed here exactly" recovered 62 and 111 because it recomputed attack 3's
   own sweep. There was never a second opinion, only a second reading.
2. **62 is not merely correct, it is the best this criterion can give at block
   1.** The position-aware form does not beat the free-phase form, for the same
   CRT reason. Closing the remaining 19-to-62 gap needs a different constraint,
   not a better reading.
3. **Section 7a's own supporting ratio measures the wrong quantity.** "Last-dead
   gives 5854x" is a *last-dead* figure; the 62-vs-111 dispute turns on
   *last-alive*, the opposite reading. Details in section 8. The conclusion is
   unaffected.

Script: `research/block-L-first-dead.js` (about 17 s, output and readings
pasted in its footer).

---

## 1. The two objects that were merged

> (i) **FEASIBILITY.** "Some run of `l` consecutive `T_v` slots is entirely
> deleted by the block." A property of the sieved tile.
>
> (ii) **THE CRITERION.** `sum over p in (v, v^2] of K_p(l, f) >= l`, the
> counting necessary condition Theorem D imposes on (i).

(ii) is a sum of staircases and is genuinely not monotone in `l`. At block 1 it
fails at `l = 63`, passes again at 39 values between 64 and 111, and fails from
112 on. VERIFIED.

(i) is downward closed, because a run of `l+1` consecutive deleted slots
contains a run of `l`. PROVEN, and it is a one-line proof.

`attack-block-00-ADJUDICATION.md` observed the non-monotonicity of (ii) and
concluded that (i) is non-monotone: *"L = 63 is infeasible (window sum 62) but
L = 70, 100 and 111 are all feasible again"*. Those `l` are not feasible. They
are **not excluded**, which is a statement about the criterion, not about the
tile. A one-sided necessary condition that fails once has done its whole job.

## 2. The instrument, named

**`research/history/staging/attack-block-03-alternation.md`, section 2(c) and
section 6.** The exact computation, quoting its own statement of it:

> `k_p <= K_p(L, f) := max over a of #{i < L : d_i = a or a-2 (mod p)}`
>
> **Theorem D (Block Partition Inequality, PROVEN).** If a run of L cyclically
> consecutive T_v slots at phase f is entirely deleted by the block (v, v^2],
> then L <= sum over p in (v, v^2] of K_p(L, f). Since any run of length L
> contains runs of every shorter length, the combined L of the block satisfies
> **combined L <= L0 - 1, where L0 = min{ l : max over f of sum_p K_p(l, f) < l }.**

Here `d_0 = 0 < d_1 < ... < d_{l-1}` are the offsets of the run's slots from its
first slot, fixed by the phase `f` of the run start among the three rotations of
the `T_5` gap word `6, 12, 12`. Attack 3's section 6 table is the sweep of that
function, and it is where both disputed numbers come from: it reports *"first
dead l = 63, sums 62, 62, 62"* and, in the same paragraph, *"the raw inequality
is satisfied again at some l above 63, last at l = 111"*.

**Note what that means.** 111 is not a rival computation. It is the second
number in attack 3's own sentence. The adjudication took the same sweep and read
the other end of it.

## 3. Re-run from scratch: every number reproduces

The block-1 object rebuilt independently, `T_5` slots over `23#` folded at every
prime in `(5, 25]`. VERIFIED, all seven:

| quantity | recomputed | attack 3 | ok |
|---|---|---|---|
| `T_5` slots in `23#` | 22,309,287 | 22,309,287 | YES |
| survivors | 7,952,175 | `= D_23` | YES |
| mean killers per slot | 0.9312453598 | `= sum 2/p` | YES |
| combined `L` | 19 | 19 | YES |
| extremal run, first integer | 33,638,417 | 33,638,417 | YES |
| span `X` of that run | 180 | 180 | YES |
| `G2(23#) = maxsum_{L+1}(T_5)` | 204 | 204 | YES |

And the sweep itself, VERIFIED:

| `l` | `S(l,0)` | `S(l,1)` | `S(l,2)` | max | verdict |
|---|---|---|---|---|---|
| 19 | 23 | 23 | 23 | 23 | not excluded |
| 62 | 62 | 61 | 61 | 62 | not excluded |
| **63** | **62** | **62** | **62** | **62** | **DEAD** |
| 111 | 110 | 111 | 110 | 111 | not excluded |
| 112 | 111 | 111 | 110 | 111 | DEAD |

**First dead `l = 63`, so combined `L <= 62`.** Attack 3's second block figure
reproduces as well: at `v = 7`, over the 15-phase `T_7` tile with block primes
11 to 47, first dead `l = 660`, so `L <= 659`.

**One refinement attack 3 did not report.** Phase by phase the first failures
are 63, 62, 62. Phases 1 and 2 die a step earlier than phase 0. A run at phase
`f` has prefixes at the same phase `f`, so the per-phase reading gives
`L <= max_f (first_f - 1) = 62` as well. The bound is 62 either way, and the
`max over f` in Theorem D is not load-bearing.

**No revival above 111, ever.** PROVEN, not swept: `T(l) = Smax(l) - l` is
subadditive, because a run of `a+b` splits into a run of `a` and a run of `b`
and `K_p` is subadditive under that split. `T(1200) = -77` and `max T(r) = 7`
over `r < 1200`, so `T(n) <= -77 + 7 < 0` for every `n >= 1200`, and the sweep
covers `n < 1200` directly. The sweep length is not doing the work.

## 4. Downward closure in the block coordinate, attacked

The `{5,7,11}` check in section 7a is in the interval coordinate. The block
object could in principle have been something other than an interval, and then
closure would fail and the correction would collapse. It is an interval, and the
identification is pinned by seven independent numbers in section 3 above:
**combined `L` is the count of consecutive `T_5` slots inside one `G2` gap.**
The last row is the tightest pin. `maxsum_{19+1}(T_5) = 204` is exactly
`G2(23#)`, so the run of 19 and the exact gap are the same object seen twice.

Four tests, all clean:

**(a) The achievable set, decided at each `l` by its own scan.** For each `l`
from 1 to 23 a separate pass over all 22,309,287 windows asked whether any
window of `l` consecutive slots contains no survivor. Nothing was inferred from
the maximum, so a hole in the achievable set would have shown. Result: exactly
`1, 2, ..., 19`. VERIFIED.

**(b) The property closure actually needs.** Closure is usable only if the
criterion binds NON-maximal runs. Had Theorem D used the survivors that bound a
maximal run, restricting to a sub-run would leave its domain and first-dead
would be unsound. This is the one place the argument could have broken and it
does not: all 190 contiguous sub-runs of the extremal 19-run are themselves
all-dead runs, every one satisfies `sum k_p >= l`, and restriction reaches all
three phases. VERIFIED. Theorem D as stated fixes "a run of `L` cyclically
consecutive slots, all deleted", with no maximality anywhere in the derivation.

**(c) 67 instances with exactly known truth.** Every non-empty subset `Q` of the
six block-1 primes, each over its own exact period of `3 * prod(Q)` slots, plus
four subsets on the `T_7` tile whose gap word is 15 letters rather than 3. In
all 67: the achievable-length set is a contiguous `1..truth`, **zero
exceptions**; the first-dead bound is never below the truth, **zero
violations**; the last-alive bound is never below the truth either. VERIFIED.
Ratios: first-dead / truth in `[1.00, 3.26]`, last-alive / truth in
`[1.00, 5.84]`. Revivals do occur in the smaller instances (for example
`{7,11,13,17,19}`: truth 14, first-dead 30, last-alive 36), so the phenomenon is
not special to the full block.

**(d) The interval-coordinate check reproduced.** All 385 phase choices at
`{5,7,11}`, two classes each: feasible set exactly `1..9`, contiguous, as
section 7a says. VERIFIED.

**Nothing in the block coordinate resists the closure argument.** The reason is
that there is nothing to resist: the block object is a set of consecutive slots,
and a contiguous piece of a contiguous run is a contiguous run. The tests above
are guards against a misreading of the definition, not against a mathematical
risk, and they all come back clean.

## 5. The adjudication's instrument is attack 3's instrument

The adjudication describes its computation as a different and sharper one:

> Method: `w(i)` = the number of block primes killing `T_5` slot `i`; a run of
> `L` consecutive slots can be fully covered only if some window of `L`
> consecutive slots has `sum(w) >= L`. **Taken over a single position, which is
> what the constraint actually permits**, over the full `23#` period.

That instrument was recomputed here over all 22,309,287 windows. Its validation
figures reproduce: uncovered slots 7,952,175 `= D_23`, mean `w` = 0.9312453598
`= sum 2/p`. And so do its two headline numbers: **first dead `l = 63` with
window sum 62; last not excluded `l = 111`.**

**It agrees with instrument A at every single `l` from 1 to 400.** Zero
disagreements. That is not luck. PROVEN: `K_p(l,f)` is attained at some residue
`a_p`; by CRT there is an `s_0` in `[0, 23#)` congruent to `-a_p` mod `p` for
every block prime simultaneously and lying in the phase-`f` class mod 30, since
`gcd(30, 7*11*13*17*19*23) = 1`. That `s_0` is a genuine `T_5` slot and its
window realises `sum_p K_p(l,f)`. So over one full period the free-phase
relaxation costs nothing, `W(l) = Smax(l)` identically, and "at a single
position" and "each prime picks its own best phase" are the same maximum.

Two consequences.

- **The adjudication's recomputation was not independent.** It re-derived attack
  3's function, got attack 3's two numbers, and changed which end of the sweep
  was read. The shepherd's fifth self-diagnosed error, *"allowing every prime its
  own best phase when the phases are linked through the position"*, is a real
  error in general but is **not** an error at block 1: the phases are linked
  through the position, and over a full period the linkage is free.
- **62 is the ceiling of this criterion, not just a valid reading of it.** The
  position-aware form cannot beat it. Closing the remaining gap from 62 down
  toward the truth 19 requires a different constraint, which is exactly what
  attack 3 section 4 shows dies at the Mertens constant `2 ln 2`.

## 6. So is 111 wrong?

**No. It is true and weak, and it is a last-alive reading.** `L <= 62` implies
`L <= 111`. Across the 67 instances the last-alive reading was never violated
either. The dispute is a strength ordering, not a contradiction:

| reading | `L` bound | `maxsum_{L+1}(T_5)` | vs `23^2 = 529` |
|---|---|---|---|
| truth | 19 | 204 | 0.39x (an identity, `= G2(23#)`) |
| first-dead, attack 3 | **62** | 630 | **1.19x** |
| last-alive, adjudication | 111 | 1122 | 2.12x |

The factor between them is 1.79x in `L` and 1.78x in the downstream maxsum.
**Neither clears 529**, so no `p^2`-rule conclusion follows from either, and the
qualitative finding both support is the same one: counting at block 1 is binding
rather than vacuous, and it is the first finite block-level bound on combined
`L` in this repository. The adjudication's sentence *"it misses by more than a
factor of two"* reverts to attack 3's *"It just misses being interesting"*.

## 7. What survives from the adjudication

The standing check it installed is good and is untouched by this:

> **anywhere this corpus bisects on a predicate, the predicate's monotonicity
> must be demonstrated, not assumed.**

And the defect it found with it is real. `research/two-class-lower-bounds.js`
line 118 bisects on a **greedy's success**, which is genuinely non-monotone
because a greedy that fails at `m` can succeed at `m+1`. The greedy's success is
not the object's feasibility. The adjudication applied its own new rule to the
wrong predicate: it demanded monotonicity of the criterion, when what the
argument needs is monotonicity of feasibility, and feasibility has it.

## 8. Where section 7a is itself wrong

Section 7a writes:

> at x = 11, where the truth is known, first-dead gives 2.02× the truth and
> last-dead gives **5854×**.

That number comes from `research/attack-beta2-05-covering-prune.js` reading 7,
and it is the **last dead** `L`, the last `l` at which the criterion FAILS.
There is no such thing as a meaningful last-dead: once the criterion dies for
good it fails at every larger `l`, so the quantity is whatever the sweep limit
is. It was 239,999 when that reading was written, and **the same script run
today prints 40,000**, because its sweep was later shortened. VERIFIED by
running it.

The 62-vs-111 dispute turns on **last alive**, the opposite reading, since 111
is the last `l` the criterion PASSES. Apples to apples at `x = 11`, from that
script's own output (first dead 14, three live above it at 16, 17, 18):

| reading | `m` | bound `6m+5` | truth 41 |
|---|---|---|---|
| first-dead | 13 | 83 | 2.02x |
| last-alive | 18 | 113 | 2.76x |

So the honest illustration is 2.02x against 2.76x, not 2.02x against 5854x. The
conclusion of section 7a does not depend on it. The supporting ratio does not
support it.

A second, smaller point. Section 7a offers the `{5,7,11}` enumeration as the
verification. That enumeration is correct and reproduces, but its counting
criterion has **no revival at all** (first dead 19, last alive 18), so it cannot
witness the phenomenon under dispute. The witness is the `x = 11` free-phase
case in the same script.

## 9. What the bound is for

**Grepped for consumers across the repo.** The result is that there are almost
none, and this matters for how much the decision is worth.

- `research/sift-limit-attack.md` section 7a. The correction itself.
- `TODO.md` item **G(i)**, "Queued for Chris, not decided here".
- `research/attack-beta2-05-covering-prune.js` reading 7, which argues for 62
  from the free-phase side and flags itself INFERRED for exactly the reason this
  report removes.
- `research/qc/units.js` line 94. **The one live artifact carrying the wrong
  number.** It prints, as part of the SLOTS vs INTEGERS lesson, `Correct bound:
  L <= 111.` If Chris rules for 62, that line needs the edit; the lesson around
  it (capacity is binding, not vacuous by 10x) is unaffected and correct.
- `research/history/CHANGELOG.md` and the block-campaign staging reports, which
  are the process record and are supposed to hold superseded values.

**The phrase "combined L" appears in no body document.** `phase1-W1b-applied.md`
recorded the same finding on 2026-08-18: *"Grepped `research/*.md`, `paper/*.md`
and `TODO.md` for `L <= 62 / 111 / 120 / 158` and every Unicode variant: **zero
hits anywhere**. None of the four disputed values ever reached a body
document."* That is still true
apart from section 7a itself, which was written afterwards.

**So nothing downstream consumes the number.** What is at stake is the record:
which of two true statements the corpus asserts, and whether the adjudication's
stated reason for overturning 62 stands. The reason does not stand.

## 10. What is left for Chris

1. **The number.** `L <= 62` at block 1, `L <= 659` at block 2. Both recomputed
   here, both matching attack 3.
2. **Section 7a can lose its INFERRED flag.** The instrument has been re-run.
3. **Section 7a's `5854x` should be replaced** by 2.76x, or by the plain
   statement that a last-dead figure is a sweep artifact.
4. **`research/qc/units.js` line 94** is the only live edit the ruling implies.
5. **The adjudication's own paragraph** would need a correction note, since its
   stated ground (feasibility is non-monotone) is false and its claim to an
   independent recomputation is, by section 5, a recomputation of the same
   function.

**Where this report is most likely wrong.** The closure argument is a triviality
and the tests are guards rather than risks, so if there is an error it is in the
identification of the object, not in the reasoning about it. That identification
rests on seven independently reproduced numbers, the sharpest being
`maxsum_20(T_5) = 204 = G2(23#)`. If combined `L` ever meant something other
than a run of consecutive `T_5` slots, everything here changes and nothing else
does.

---

*Artifact: `research/block-L-first-dead.js`. Run `node
research/block-L-first-dead.js` (about 17 s). `node research/qc.js` reports 0
findings across 8 checks with this report and script in place.*
</content>
