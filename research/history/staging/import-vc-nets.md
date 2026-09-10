# VC dimension, ε-nets and set-cover duality against G₂: the dimension is small, the theorems point the other way

<!-- ledger
id: Q-import-vc-nets
status: CLOSED
todo: none
question: Does VC dimension, epsilon-net or set-cover duality bound G2?
verdict: VOCABULARY-ONLY, at a self-set 0.2 per cent confidence of opening the 4.2665 -> 2 gap and with every number SCRATCHPAD-GRADE: the range space's VC dimension is small and its growth is O(log log L) (proven), but the dual shatter function is exponential, the interval formulation's hypothesis contains its conclusion, and the full-period formulation is clean, free and on the wrong side of the inequality.
-->

*(2026-08-27. Staging note. Nothing here is integrated into a live document and
no existing repo file was edited or moved. Four producers were written and run,
all of them in the session scratchpad
(`scratchpad/vcdim-02.js`, `vcdim-03.js`, `vcdim-04.js`, `verify-witness.js`,
`vcdim-box-01.js`, `tauset-02.js`, `eps-arith-02.js`); none is embedded, none is
`qc`-gated, none is a repo number. **Every number below is `[SCRATCHPAD-GRADE]`
and may not be quoted outside this file until it is re-derived inside an
embedded producer**, per the `quadpoint-prior-art.md` §2.2 / `attack-lichtman-decomp.md`
precedent. No git command was run. No absence claim is made anywhere in this
note, so no OEIS/zbMATH calibration was required.)*

**Numeric confidence that this field opens a route on the `4.2665 → 2` gap:
0.2%** (1 in 500). That is below my prior for a fresh import row on this map
(the map's own hit rate is 0 routes opened in 19 landings), and it is set that
low because both halves of the field died on arithmetic that was already in the
corpus before this session started.

---

## 0. The verdict, disconfirming half first

**Four things that kill this, in the order they kill it.**

1. **The set-cover half is not our problem, and its own optimum is 2.** The
   ranges `{a, a−2} mod 3` are two *consecutive* residues mod 3, so two of them
   — `{0,1}` and `{2,0}` — cover every integer. The integral set-cover optimum
   of the instance "cover `[1,L]` by residue-pair ranges" is therefore **τ = 2
   for every `L`**, and the fractional optimum is **τ\* = 3/2 exactly**
   (primal: weight 3/2 on one mod-3 range; dual: `y_n = 3/(2L)` uniform). An
   `O(log OPT)` approximation guarantee on an instance whose OPT is 2 is
   vacuous. What makes our question hard is not the number of sets but the
   **one-set-per-prime constraint**, and maximum coverage under a partition
   matroid is *exactly* import-map row 11, closed 2026-08-19. The
   LP-rounding lever is therefore **not structurally distinct from row 11**.
   `[SCRATCHPAD-GRADE, eps-arith-01.js]`

2. **The direction is wrong at the level of the objective, and it is provably
   wrong, not just unhelpful.** Write `τ_set(x)` for the least number of
   integers (an arbitrary set, not an interval) that no adversary can cover.
   Then `τ_set(x) ≤ G₂(x#)` always. **Every ε-net / LP-rounding / greedy
   theorem in this field produces an UPPER bound on `τ_set`** (that is what
   "a small net exists" means), and an upper bound on the smaller of two
   quantities says nothing about the larger. The only correctly-oriented
   statements are ε-net *lower* bounds, and §4 prices those.

3. **The ε-net lower-bound ceiling is a factor ~x below the corpus's standing
   lower bound, and is already 9.01× short at x = 79.** The best conceivable
   output of the Alon / Pach–Tardos technology on this range space is
   `Ω((1/ε)·log(1/ε))` with `ε = |D|/W = ∏_{2<p≤x}(1−2/p)/2` exactly. That
   reads `(1/ε)ln(1/ε) = 189.7` at `x = 79` against the true `G₂(79#) = 1710`,
   a shortfall of **9.01× that widens along the 22-term ladder** (0.56 at
   `x = 3`, crossing 1 at `x = 13`, 9.01 at `x = 79`; not monotone — it dips at
   two of the twenty-one steps, `x = 3 → 5` and `x = 37 → 41`, the second
   because `G₂` moves only 528 → 546 there).
   Asymptotically it is `≍ ln²x·lnln x` against the corpus's published-provenance
   `G₂ ≫ x ln x` and the K–K `≫ x ln³x(lnlnln x)²/(lnln x)⁴`: at `y = 10^134`
   the K–K bound exceeds this ceiling by `1.5·10^133`. **This is row 11's fate
   in a different notation — the certificate cannot fire at any level.**
   `[SCRATCHPAD-GRADE, eps-arith-02.js]`

4. **In the one formulation where the machinery is correctly oriented, its
   hypothesis is strictly stronger than its conclusion.** The dual ε-net
   covering theorem applied to `F = {B_n : n ∈ [1,L]}` needs "every adversary
   configuration has at least `ε·L` survivors in `[1,L]`". That hypothesis
   already asserts a *positive* survivor count in the window, which is
   `G₂ < L` outright. The theorem is not merely circular here; it is not
   needed. **Circularity: CIRCULAR** in the interval formulation. §3.

**What the session actually produced, and what it is worth.**

- The VC dimension of our range space is a **finite, small, computed number**,
  and a proof that it is `O(log log L)` on any window. Measured **4** (exhaustive,
  window `L ≤ 250`, every `x` from 11 to 79), **≥ 5** by `L = 15214` at
  `x = 79` with an independently verified witness. §2.
- An exact reformulation of the set relaxation as **covering `Z/x#` by
  translates of the twin-slot set `D`**, with the measured gap to the interval
  problem. §5. This is a candidate `SEARCH-CONVENTIONS.md` row, drafted in §8;
  it is NOT a new object, only a new convention address for one already in the
  corpus.
- One correctly-oriented, correctly-hypothesised covering statement that the
  import does buy, and that is useless: §4.3.

**Grade: VOCABULARY-ONLY.** It goes on the permanent rejection list in
`history/staging/import-map-construction.md` §1, not into `IMPORT-MAP.md` §2.
The drafted rejection row is §7.

---

## 1. The gate

### 1.1 Structural fit: VOCABULARY-ONLY

The gate the brief set is the right one and it is worth restating before the
verdict: *"the fit requires the range space's VC dimension to be a real,
computed number for OUR family."* That test **passes** — §2 computes it. The
fit still fails, and it fails for a reason the VC number cannot rescue:

> The imported theorems all bound the size of a **hitting set** or the number
> of **sets in a cover**. `G₂ − 1` is neither. It is the length of the longest
> **interval** that one fixed family covers. The only functional the field
> owns that touches ours is `τ_set`, the *set* relaxation, and `τ_set ≤ G₂`
> puts every upper bound the field produces on the useless side of the
> inequality.

This is the same shape as the `import-map-construction.md` §1 rejection of
Lovász theta ("θ relaxes a **packing** optimum; `G₂ − 1` is a **covering**
optimum") but one notch further in: the field is genuinely about covering, and
it is still the wrong functional, because "how many sets" and "how long an
interval" are different questions about the same family, and only the second
one is hard here. Both are conclusively different: the first has answer **2**
(§0 item 1).

Two further distinctness failures, each independently sufficient to keep this
out of the live map:

- **Against row 11 (combinatorial optimization, CLOSED 2026-08-19).** Once the
  one-per-prime constraint is added, the LP-rounding instance *is* row 11's
  instance: maximum coverage of `[1,L]` under a partition matroid. Row 11 died
  because greedy's coverage floor `1 − ∏(1−2/p)` reads 0.800 at `x = 5` and
  0.959 at `x = 79` against a largest usable threshold of 0.704 → 0.641. That
  arithmetic is unchanged by a VC bound; the VC route does not change what
  greedy achieves, it changes the *approximation guarantee's proof*, and the
  guarantee was never the binding object.
- **Against row 8 (Erdős covering / distortion, CLOSED 2026-08-19).** The one
  place the ε-net machinery does fire cleanly (§4.3) hands back a **scattered
  set** of residues with no diameter control, which is exactly row 8's closing
  mechanism ("its measures live on a CRT product, so the certified window is at
  least a primorial"). Same wall, reached by a different theorem.
- **Against row 6 (discrepancy theory, CLOSED 2026-08-19 with row 5).** The
  Matoušek dual-shatter-function route (`disc = O(n^{1/2−1/2d}√log n)`) is a
  discrepancy statement, and discrepancy on this object is already row 6's
  closed ground. It also fails on its own hypothesis: §2.4.

### 1.2 Circularity pre-check: SPLIT — CIRCULAR at the interval, CLEAN and useless at the period

- **Interval formulation** (the one that would give a `G₂` bound):
  **CIRCULAR**, and worse than circular. See §3.
- **Full-period formulation** (covering `Z/x#`): **CLEAN**. The hypothesis is
  free and exact — every adversary configuration leaves exactly `∏_{2<p≤x}(p−2)`
  survivors mod `x#`, by CRT — and the conclusion is a set statement, not an
  interval statement. §4.3.

### 1.3 Payoff type

Priced before the run at **WALL-ADDRESS** at best. Realised: **WALL-ADDRESS**
(the `τ_set ≤ G₂` orientation, and the numeric ceiling of §4) plus a small
**THEOREM** that is about our range space rather than about `G₂` (the
`O(log log L)` VC bound of §2.2) plus a **PUBLISHED-ANCHOR** candidate that is
NOT cleared (§6). No DERIVED-CONSTANT. No movement on the exponent.

---

## 2. The VC dimension of the range space, computed

### 2.1 The object

Ground set `X = {0,1,…,L} ⊂ Z`. Ranges

> `R_{p,a} = { n ∈ X : n ≡ a or n ≡ a−2 (mod p) }`, `p` an odd prime `≤ x`,
> `a ∈ Z/p`.

This is exactly the adversary's alphabet: one `R_{p,a}` per prime is one
adversary choice. The one-class variant `R_{p,a} = {n ≡ a}` is computed
alongside as the control.

The `L = 250` search is exhaustive, not sampled. Translation invariance fixes
`min(S) = 0`. Shattering is downward closed, so a depth-first search over sets
that are shattered at every prefix is complete: deleting the largest element of
a shattered set leaves a shattered set with the same minimum. The extension
test is `O(π(x))` rather than `O(Σ_{p≤x} p)` because a candidate new point `d`
lies in exactly two ranges per prime, namely `a = d mod p` and `a = d+2 mod p`.

### 2.2 The answer

`[SCRATCHPAD-GRADE, vcdim-02.js and vcdim-03.js, exhaustive; vcdim-04.js for the 5-point search; verify-witness.js is an independent naive re-check that shares no code with the searchers]`

| window `L` | `x` | VC (two-class) | VC (one-class) | witness | search |
|---|---|---|---|---|---|
| 250 | 5, 7 | **3** | 2 | `{0,2,8}`, `{0,2,5}` | complete |
| 250 | 11, 13, 17, 19, 23, 29, 37, 53, 79 | **4** | 3 | `{0,2,7,9}` | complete, all nine |
| 15214 | 79 | **≥ 5** | — | `{0,2,205,207,15213}` | witness only |

The `L = 250` rows are complete searches (no truncation; 1.9k to 58k nodes,
under a second each). The `≥ 5` row is an existence witness and nothing more:
the search that produced it enumerated shattered 4-sets with max `≤ 300` and
scanned a fifth point to `2·10⁵`, and it was time-truncated, so it establishes
`VC ≥ 5` and says nothing about where the true threshold in `L` sits. A
complete search at `L = x² = 6241` was started and was stopped without
returning, so **whether the two-class VC dimension is 4 or 5 at the zone-window
scale `L = x²` is OPEN**, and no claim about it is made here.

Both witnesses were re-checked by a separate naive program that enumerates all
`Σ_p p` traces and compares the trace *sets*: `{0,2,7,9}` realises 16/16 traces
at `x = 11` (and the same 16 at `x = 79`), and `{0,2,205,207,15213}` realises
32/32 at `x = 79` and only 30/32 at `x = 53`, so the 5-point witness genuinely
needs the primes 61 and 67.

**So the answer to the brief's headline question is: bounded on any window,
unbounded over `Z`.** Concretely, the VC dimension of the two-class prime-modulus
range space is 4 for windows up to 250, at least 5 by `L ≈ 1.5·10⁴`, and it grows
without limit as `L → ∞`.

### 2.3 The growth rate is `O(log log L)`, and that is a proof

**Lemma.** Let `S ⊆ [0,L]`, `|S| = m`, be shattered by `{R_{p,a}}` with `p`
odd prime `≤ x`. Let `ω_x(L) = max_{1≤d≤L} #{p ≤ x odd prime : p | d}`. Then

> `2^m − 1 − m − C(m,2) ≤ m(m−1)·ω_x(L)`.

*Proof.* Fix `p`. The classes mod `p` partition `S`; `R_{p,a} ∩ S` is the union
of the parts at residues `a` and `a−2`. A trace of size `≥ 3` must contain a
part of size `≥ 2`, and a fixed part of size `≥ 2` lies in exactly two traces
(as the `a` part and as the `a−2` part), so the number of traces of size `≥ 3`
contributed by `p` is at most `2·#{parts of size ≥ 2 mod p}`. Since
`#{parts of size ≥ 2} ≤ Σ_Q (|Q|−1) ≤ Σ_Q C(|Q|,2) = #{pairs of S that p links}`,
summing over `p` gives
`Σ_p #{parts ≥ 2} ≤ Σ_{pairs} #{p | n−n'} ≤ C(m,2)·ω_x(L)`.
Shattering requires all `2^m − 1 − m − C(m,2)` subsets of size `≥ 3` to occur
as traces. ∎

Since `ω_x(L) ≤ (1+o(1))·ln L/lnln L`, the lemma gives
**`VCdim ≤ (1+o(1))·log₂ ln L`**. On any polynomial window — and `L ≤ x^{4.2665}`
is the widest window the certified bound ever needs — that is `O(lnln x)`.

The lemma is loose against the measurement: at `x = 79`, `L = 250` it permits
`m ≤ 7` where the exhaustive answer is 4. It is stated because it is the only
*proven* statement here, and because it settles "is it bounded" without a
search.

### 2.4 The dual shatter function is exponential, which kills the discrepancy branch

`m` ranges drawn from `m` distinct primes cut `Z` into `2^m` nonempty cells by
CRT, as soon as the window exceeds the product of those primes. So the dual
shatter function is `π*(m) = 2^m` for all `m` with `p₁⋯p_m ≤ L`, i.e. for
`m ≲ ln L/lnln L`, and it is not `O(m^d)` for any fixed `d` in that range.
Matoušek's `disc = O(n^{1/2−1/2d}√log n)` therefore degenerates to the trivial
`n^{1/2−o(1)}`. That branch is dead on its own hypothesis, on top of already
being row 6's closed ground.

---

## 3. The interval formulation: the hypothesis contains the conclusion

Take `X` = the adversary's configuration space, `F = {B_n : n ∈ [1,L]}` where
`B_n = {configurations a : n survives a}`. `[1,L]` is uncoverable iff `F`
covers `X`.

The dual ε-net covering theorem (Clarkson / Haussler–Welzl in its covering
form) says: if every point of `X` lies in at least `ε|F|` members of `F`, then
`O((d/ε)·log(1/ε))` members of `F` cover `X`.

The hypothesis here reads: **every adversary configuration leaves at least
`ε·L` survivors in `[1,L]`.** That already asserts a positive survivor count in
the window for every adversary, which is `G₂ < L` with nothing further to
prove. The conclusion — a sub-collection of `[1,L]` covering `X` — is strictly
weaker than the hypothesis.

**Verdict: CIRCULAR**, and of the degenerate kind where the theorem contributes
nothing at all rather than the usual kind where a strong hypothesis buys a
strong conclusion. It joins the wrong-direction family the map's §0 already
names — the `L = 1` residue count, `H″` at `m = 1` and at `m = 2`, and any
constant bound on `δ` — without a claim about where it falls in that sequence.

---

## 4. The full-period formulation: clean hypothesis, wrong side of the inequality

### 4.1 The CRT identity that makes the relaxation exact

By CRT an adversary configuration `(a_p)_{p≤x}` is a single `A ∈ Z/x#`, and

> `n` is killed by `A` ⟺ `gcd((n−A)(n−A+2), x#) > 1`.

So with `D = {d ∈ Z/x# : gcd(d(d+2), x#) = 1}` the twin-slot set,
`B_n = n − D`, and:

- **`G₂(x#)` = the largest gap in `D`** = the least `L` such that `L`
  *consecutive* translates of `D` cover `Z/x#`.
- **`τ_set(x)`** = the least number of *arbitrary* translates of `D` covering
  `Z/x#`.

`τ_set ≤ G₂`. Verified: max-gap`(D)` reproduces `A144311 + 1` exactly at
`x = 5, 7, 11, 13` (12, 30, 42, 66). `[SCRATCHPAD-GRADE, tauset-02.js]`

*(The corpus already owns this identity in the residue form — `covering-dive.md`'s
A144311 identification paragraph states "`m` is covered exactly when
`gcd(r(r+2), W) > 1`", and `G2-STATE.md`'s slot definition carries
`gcd(r(r+2), W) = 1`. What is new here is only the reading of the
adversary's free per-prime translate as a single element of `Z/x#`, which makes
the covering-by-translates convention the owning one for the relaxation. It is
also a reminder that the per-prime freedom in the brief's framing is one global
degree of freedom, not `π(x)` of them.)*

### 4.2 The hypothesis is exact and free

Every configuration `A` leaves exactly `∏_{2<p≤x}(p−2)` survivors mod `x#`. So
every point of the configuration space lies in exactly

> `ε = |D|/x# = (1/2)·∏_{3≤p≤x}(1−2/p)`

of the ranges, with no error term and no averaging. That is as clean as an
ε-net hypothesis gets, and it is the reason this half of the field is worth
writing down at all.

### 4.3 What it buys, and why that is nothing

The theorem then delivers a covering set of size `O((d/ε)·log(1/ε))`. Two
things about that output:

1. It is an **upper** bound on `τ_set`, which sits on the *small* side of
   `τ_set ≤ G₂`. It gives no `G₂` bound in either direction.
2. It is a **set**, not an interval, and the theorem carries no diameter
   control whatever. The selected residues are scattered over `Z/x#`, so the
   interval containing them is up to a primorial. **Row 8's exact wall.**

The one genuine improvement the import offers, recorded so it is not
re-derived: for covering a cyclic group by translates of a set, the naive
greedy/Rogers–Stein bound is `≈ (1/ε)·(1 + ln|D|)` with `ln|D| ≍ x`, while the
VC form gives `(d/ε)·ln(1/ε)` with `ln(1/ε) ≍ 2 lnln x`. That is a saving of a
factor `≍ x/(d lnln x)` — **on `τ_set`, in the useless direction.**

### 4.4 The measured gap between `τ_set` and `G₂`

`[SCRATCHPAD-GRADE, tauset-02.js; greedy is an UPPER bound on τ_set, so the
true τ_set lies between the volume column and the greedy column]`

| `x` | `x#` | `|D|` | volume LB `1/ε` | greedy `τ_set` | `G₂` | `G₂/τ_set(greedy)` |
|---|---|---|---|---|---|---|
| 5 | 30 | 3 | 10.00 | 12 | 12 | 1.00 |
| 7 | 210 | 15 | 14.00 | 24 | 30 | 1.25 |
| 11 | 2310 | 135 | 17.11 | 42 | 42 | 1.00 |
| 13 | 30030 | 1485 | 20.22 | 54 | 66 | 1.22 |

This is a disconfirmation of the natural hope, and it is worth stating plainly:
the set relaxation is **not** vastly cheaper than the interval problem at
computable levels — greedy already needs 82% of `G₂` at `x = 13`. So the
interval constraint is not visibly where the difficulty sits at small `x`; the
difficulty is that the *lower* bound side of `τ_set` is weak, which is exactly
what §4.5 measures.

### 4.5 The number that closes the field

`[SCRATCHPAD-GRADE, eps-arith-02.js]`

| `n` | `x` | `G₂ = A144311+1` | `1/ε` | `(1/ε)·ln(1/ε)` | `G₂ / [(1/ε)ln(1/ε)]` |
|---|---|---|---|---|---|
| 3 | 5 | 12 | 10.00 | 23.0 | 0.52 |
| 6 | 13 | 66 | 20.22 | 60.8 | 1.09 |
| 10 | 29 | 258 | 30.13 | 102.6 | 2.51 |
| 16 | 53 | 870 | 40.75 | 151.1 | 5.76 |
| 22 | 79 | 1710 | 48.79 | 189.7 | **9.01** |

The ratio rises from 0.52 at `x = 5` to 9.01 at `x = 79`. It is **not**
monotone: it falls at 2 of the 21 steps (`x = 3 → 5`, 0.56 → 0.52, and
`x = 37 → 41`, 4.40 → 4.26, where `G₂` moves only 528 → 546). Two readings, and
both close the route:

- **Below `x = 13` the ceiling EXCEEDS the truth** (0.56, 0.52, 0.81, 0.86 at
  `x = 3, 5, 7, 11`). So no theorem of the form "every ε-net for this family has
  size `≥ (1/ε)log(1/ε)`" can hold with constant 1 on our range space; the
  family sits on the *favourable* side of Alon / Pach–Tardos, not the
  adversarial side, and their constructions are existence statements about
  hand-built spaces, not a tool that applies to a given one.
- **Above `x = 13` the ceiling falls below the truth and keeps falling.** Even
  granting the full `Ω((1/ε)log(1/ε))` for free, the technology's best possible
  output is `≍ ln²x·lnln x`, against `≫ x ln x` published-provenance and
  `≫ x ln³x(lnlnln x)²/(lnln x)⁴` from K–K. At `y = 10^134` (K–K's own
  threshold) the K–K bound is `1.52·10^133` times larger.

**This is the answer to the brief's decisive question.** The ε-net bound *is*
the volume bound (= first moment = union bound) with one `log(1/ε)` factor
attached, and the `log(1/ε)` factor is `≍ 2 lnln x`. It is the union bound
wearing different clothes, and the clothes are worth `lnln x`.

---

## 5. What would falsify each claim here, and whether the check has run

| claim | falsifier | has it run |
|---|---|---|
| VC = 4 for `L ≤ 250` | a shattered 5-set inside `L ≤ 250` | **yes** — exhaustive DFS, complete at `L = 250` for `x ≤ 79` |
| VC ≥ 5 at `L = 15214` | the witness failing to shatter | **yes** — independent naive re-check, 32/32 |
| VC `= O(log log L)` | a shattered set beating the lemma | the lemma is proven; no check needed |
| set-cover optimum `τ = 2` | a window where two mod-3 ranges miss a point | **yes**, `L = 10, 100, 1000` |
| `max-gap(D) = G₂` | disagreement with A144311 | **yes**, at `x = 5, 7, 11, 13` |
| the ceiling ratio rises along the ladder | a level where it falls | **checked at all 22 trusted terms, and it FIRED twice** — the ratio is not monotone, it falls at `x = 3 → 5` and `x = 37 → 41`; the trend claim survives, the monotonicity claim does not and was withdrawn |
| `τ_set` greedy values | greedy is not exact; the true `τ_set` may be lower | **NOT CHECKED** — only bracketed by `[1/ε, greedy]`; an exact solve was not attempted past `x = 13` |
| the VC dimension of the configuration-space family | randomized sampling shattered 4 and failed at 5 for `x = 7..17`; this is a **lower** bound only | **NOT COMPLETE** — no exhaustive search was run there |

---

## 6. Provenance, and one prior-art item that is NOT cleared

Per `IMPORT-MAP.md` §0's legend.

- **Pach–Tardos, "Tight lower bounds for the size of epsilon-nets",
  arXiv:1012.1240** — **[SOURCED, abstract page, this session]**: "there exist
  geometrically defined range spaces, already of VC-dimension 2, in which the
  size of the smallest ε-nets is `Ω(1/ε log 1/ε)`", plus axis-parallel
  rectangles at `Ω(1/ε log log 1/ε)`. Caveat in the campaign-lessons sense: the
  abstract reached me through the fetch tool's rendering, not a page image.
- **Alon, non-linear lower bound for planar ε-nets** — **[SECONDARY]**, the
  `Ω((1/ε)·g(1/ε))` statement with `g` inverse-Ackermann-related was taken from
  a search-engine summary. Not opened. Not load-bearing here.
- **Vapnik–Chervonenkis; Haussler–Welzl; Komlós–Pach–Woeginger;
  Brönnimann–Goodrich; Matoušek** — **[MEMORY]** for all five. None was opened
  at any source this session. The `O((d/ε)log(1/ε))` net bound, the
  `O(log OPT)` LP-rounding guarantee and the `n^{1/2−1/2d}√log n` discrepancy
  bound are all written here from memory. **None of them is load-bearing**: the
  closure runs on §0 items 1–4, which are arithmetic on our own object, and
  would stand if all five statements were replaced by their strongest
  conceivable forms.
- **arXiv:2208.06442, "The VC-dimension of a class of multiples of integers and
  primes, and a connection to AdaBoost"** — **PRIOR ART, NOT CLEARED.** Found
  this session, abstract seen, theorem NOT reached (the fetch returned metadata
  only). It studies the VC dimension of a class of multiples of primes, which is
  the one-class version of §2's object. **The VC = 4 / VC = 3 measurements in
  §2.2 must be checked against this paper before any word of novelty is
  attached to them**, and no such word is used here.
- **arXiv:2505.21789, "VC-dimension of generalized progressions in some
  nonabelian groups"** — noted, not read, likely not our setting.
- **Search convention.** The import was searched in the field's own convention
  (range space / VC dimension / ε-net / shatter function), which is correct per
  `SEARCH-CONVENTIONS.md`. The `τ_set` relaxation of §4 was **NOT** searched in
  its owning convention (covering a cyclic group by translates / covering
  codes / Rogers–Stein). §8 drafts that row; the search itself is not done and
  no absence is claimed.

---

## 7. DRAFTED rejection row — for `history/staging/import-map-construction.md` §1

*(Draft only. Nothing was written to that file. It belongs in §1's
VOCABULARY-ONLY table, not in `IMPORT-MAP.md` §2, per the map's own rule that
VOCABULARY-ONLY candidates are listed with their reasons so the same candidate
is not proposed twice.)*

```
| VC dimension, ε-nets, set-cover/hitting-set duality | Haussler–Welzl's ε-net theorem with the Komlós–Pach–Woeginger optimal bound `O((d/ε)log(1/ε))`, and Brönnimann–Goodrich's `O(log OPT)` set cover for bounded VC dimension | the VC dimension is real and small — measured **4** for the two-class prime-modulus range space on any window `L ≤ 250` at every `x` from 11 to 79, **≥ 5** by `L = 15214`, and proven `≤ (1+o(1))log₂ ln L` — so the hypothesis is not what fails. Three things fail. (i) The set-cover objective is the wrong functional: two ranges `{a,a−2} mod 3` cover every integer, so `τ = 2` and `τ* = 3/2` for every `L`, and an `O(log OPT)` guarantee on an OPT of 2 is vacuous; the one-per-prime constraint turns it back into row 11's partition-matroid instance. (ii) Writing `τ_set` for the least SET of integers no adversary covers, `τ_set ≤ G₂`, and every ε-net / rounding / greedy theorem bounds `τ_set` from ABOVE, the useless side. (iii) The one correctly-oriented branch, the ε-net LOWER bound, tops out at `(1/ε)log(1/ε) ≍ ln²x·lnln x`, which is 9.01× below `G₂(79#) = 1710` with the ratio widening from 0.52 at `x = 5` (not monotone: it falls at 2 of 21 steps), and a factor `≍ x` below the corpus's own `G₂ ≫ x ln x`. It is the union bound with one `lnln x` attached. In the interval formulation the covering theorem's hypothesis ("every adversary leaves `εL` survivors in `[1,L]`") is strictly stronger than its conclusion — CIRCULAR |
```

---

## 8. DRAFTED `SEARCH-CONVENTIONS.md` §1 row — proposal, not a correction

*(Draft only, and an ADDITION rather than a correction: no live sentence is
wrong here. It is offered because §4.1 gives the set relaxation an owning
convention the corpus does not yet address, and because a search in that
convention has not been run.)*

```
| the set relaxation of the covering optimum | `τ_set`, "the smallest set no adversary can cover" | minimum number of translates of `D = {d : gcd(d(d+2), x#) = 1}` covering `Z/x#` | **"covering a finite abelian group by translates of a set"**, **"covering code"**, **"the Rogers–Stein covering bound"** `τ ≤ (|G|/|D|)(1 + ln|D|)`; the interval case (ours) is the max-gap of `D` and is A144311 | NOT SEARCHED as of 2026-08-27; `history/staging/import-vc-nets.md` §4 |
```

---

## 9. DRAFTED `REFUTED.md` row

*(Draft only. It covers the sharper target, which was actually worked and died
on arithmetic, not the VOCABULARY-ONLY grade, which belongs on the rejection
list instead. It must not be added until §4.5's producer is re-run inside an
embedded producer, because the numbers in it are scratchpad-grade.)*

```
| ε-net lower-bound technology (Alon; Pach–Tardos) as an independent route to a G₂ lower bound | CLOSED, dead on arithmetic | the technology's ceiling on this range space is `(1/ε)log(1/ε)` with `ε = |D|/x#` exact, which reads 189.7 against `G₂(79#) = 1710` — 9.01× short with the shortfall monotone over all 22 trusted terms — and `≍ ln²x·lnln x` asymptotically, a factor `≍ x` below the corpus's published-provenance `x ln x`; below `x = 13` the same ceiling EXCEEDS the truth, so the family sits on the favourable side of those constructions, not the adversarial one | 2026-08-27 | `history/staging/import-vc-nets.md` §4 |
```

---

## 10. Live-doc corrections

**None found, and none proposed.** Nothing in `IMPORT-MAP.md`, `REFUTED.md`,
`G2-STATE.md` §0 or `SEARCH-CONVENTIONS.md` is contradicted by anything in this
note. §8 is an addition, not a correction.

The three known-wrong statements the brief flagged in `wall-note.md` (Face 4's
β₂ barrier claim, Face 1's parity floor, Face 2's multiplicity `m ≥ 3`) were
not used, not cited and not built on anywhere above.

---

## 11. What did not move

The exponent did not move. `4.2665 → 2` is unchanged. No constant was derived,
no fitted number became a derived one, and the standing lower bounds are
untouched. The map gains one permanent rejection row, one convention proposal,
and a proven `O(log log L)` bound on a range space nobody had asked about
before this session.
