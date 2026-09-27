# Foreign import 4 of the map's top five: Stein's method for Poisson approximation

<!-- ledger
id: Q-import-stein
status: CLOSED
todo: none
question: Does Stein's method for Poisson approximation derive the extinction law's constants and the ~3.8 joint deficit?
verdict: The pre-registered kill fires at both targets for one structural reason: each object is driven by exactly one shared uniform draw, so the non-neighbourhood indicators reconstruct it and b3 climbs to its own ceiling, measured at 0.850 to 0.9998 of that ceiling and 200 to 800 times b1 + b2; with no error term there is no Stein derivation, and the first-moment arithmetic banks the (A, c) pair anyway, relabelled.
-->

*Staging note, 2026-08-19. Proposal only; nothing here is integrated into a live
document. Pre-registration, written to disk before either producer ran:
[import-stein-prereg.md](import-stein-prereg.md). Producers, both formally
embedded: `research/import-stein-01-multikill.js` (386.5 s),
`research/import-stein-02-strikes.js` (223.6 s). Calibration is marked on every
claim: PROVEN, VERIFIED by exact computation, MEASURED, REFUTED.*

## 0. The answer

**The pre-registered kill criterion fires at both targets, and it fires for one
structural reason that is worth more than either target.** Arratia, Goldstein
and Gordon's `b₃` measures the dependence between an event and the occurrences
outside its neighbourhood. Both objects here are driven by **exactly one shared
uniform draw** — the fold's offset `u ∈ Z/p` for the multi-kill events, the
natal residue `r ∈ N` for the strike events — so the non-neighbourhood
indicators reconstruct the draw, `E{X_α | F_α} = X_α`, and `b₃` climbs to its
own ceiling `Σ_α 2p_α(1−p_α) = 2λ − 2b₁`. Measured: `b₃` reaches **0.850, 0.983,
0.998, 0.9998** of that ceiling across the four windows, and a flat **0.55 to
0.61** for the strike process. Against the pair terms it runs **200 to 800 times
`b₁ + b₂`** on the multi-kill side and **12.7 to 73.4 times** on the strike side.
There is no error term, so there is no Stein derivation.

**What lands anyway is arithmetic, and it lands hard, twice.** Both `b₁` figures
are exact first- and second-moment objects that owe nothing to the method's
error term, and both reproduce their fitted targets:

- **The extinction law's two constants.** `λ_p = Σ_α p_α = (1/p)Σ ω_α`, computed
  exactly on the window with no fitting at all, reproduces the measured `X_p`
  fold by fold: `ΣX/Σλ = 0.914, 1.009, 1.046, 1.009` at the four windows and
  `|X_p − λ_p| ≤ 3√λ_p` at 100%, 100%, 97.1%, 100% of the folds where `λ_p ≥ 1`.
  Fitted the record's own way it gives **A = 2.2091e−2, c = 1.0701** against the
  record's fitted **2.4312e−2, 1.0818 ± 0.0317** — `c` inside 0.37 of its own
  standard error, `A` a factor 0.909. Both are nearer the record than the
  geometric null of `import-thinning.md` §1.4 (4.7843e−2, 1.0577), which is the
  pre-registered P3.
- **The `~3.8` joint-deficit constant.** `b₁` for the strike process is
  `4·Σ_{x<q≤√W} q^{−2} = 4S₂` in closed form, zero parameters. Predicted
  `1 − J = 4S₂ = 0.041122` and `0.033678` at @19 and @23 against measured
  **0.0401 ± 0.0035** and **0.0341 ± 0.0007**: **−0.29σ and +0.60σ**. The ratio
  `(1−J)/F` it predicts is `3.7804` and `3.8189` against measured `3.686` and
  `3.867`, it rises monotonically 3.526 → 3.822 over @11..@23 as the measured
  ratio rises, and **its asymptote is exactly 4**, which is AGG's neighbourhood
  count: two orientations per prime, each paired with both.

**And the pre-registration's own clause decides what that second one is called.**
Prereg §5's last paragraph was written before the arithmetic ran, "precisely
because P5's arithmetic is cheap and its agreement, if it comes, will be
tempting": with `b₃ > b₁ + b₂` a numerical agreement is *an unexplained
coincidence of scale, not a derivation*. `b₃/(b₁+b₂) = 73.4` at @23. So the
honest label on `4S₂` is **a zero-parameter closed-form candidate for TODO item
X's constant that fits at two levels and is not derived**, and the one mechanism
that would have derived it was tested here and is REFUTED (§3.4).

## 1. Verification of the formulas, which the map flagged as never opened

`IMPORT-MAP.md` row 4 carries Arratia–Goldstein–Gordon, *Ann. Probab.* 17 (1989)
9–25 as **[SOURCED-BIB]**, and `import-map-construction.md` §3 is explicit:
"abstract read at Project Euclid, the `b₁`, `b₂`, `b₃` formulas and the constant
1.4 not."

**Opened this pass:** Arratia, Goldstein and Gordon, *Poisson Approximation and
the Chen–Stein Method*, **Statistical Science 5 (1990) 403–434**, the full
scanned text (Project Euclid / JSTOR deposit, 22 pages, image-only PDF, read
page by page **as images**, since the campaign rule is that text extraction is
not reading and the file carries no text layer). Page 406 opens with the
authors' own sentence "The following theorems are proved in Arratia, Goldstein
and Gordon (1989)", which is the paper the map cites. The *Ann. Probab.* full
text itself is paywalled and was **not** opened.

The definitions are quoted verbatim in the pre-registration §1 and are not
repeated here. Three things the verification settles:

1. **The formulas are as the corpus assumed**, with `B_α ⊂ I` a chosen
   neighbourhood containing `α`, `b₁` a product sum over it, `b₂` the true joint
   probabilities over it, and `b₃ = Σ_α E|E{X_α − p_α | σ(X_β : β ∉ B_α)}|`.
2. **The constant 1.4 is real** and sits in Theorem 1 as `b₃(1 ∧ 1.4λ^{−1/2})`.
3. **One scan ambiguity, flagged rather than hidden.** The first display of
   Theorem 1 renders its second subscript as `b₁`, reading `(b₁ + b₁)`. The line
   immediately below it, `≤ 2(b₁ + b₂ + b₃)`, and the p. 405 identity
   `b₂ − b₁ = E(W²) − E(Z²)` both force `b₂`, and that reading was checked
   independently by rederiving the identity (`EW² − EZ² = Σ_{α≠β}p_{αβ} − λ²`,
   which splits into `b₂ − b₁` exactly when `p_{αβ} = p_αp_β` off the
   neighbourhood). It is read as `b₂`.

**Proposed grade change:** row 4's theorem column moves from **[SOURCED-BIB]** to
**[SOURCED, verbatim, via the authors' 1990 restatement in *Statistical Science*
5, 403–434]**. Not to a clean [SOURCED] on the 1989 paper, which was not reached.

## 2. Object 1 — the multi-kill events, and the two constants of the extinction law

### 2.1 The setup, and the identity that licenses it

Fix a window and a fold `p`. `I` = the qualifying gaps of the level-`p` word
(`g ≡ 0` or `±2 mod p`); a non-qualifying gap has `p_α = 0` and is excluded,
which is AGG's own `p_α > 0` requirement. `X_α = 1` iff both endpoints of gap
`α` die at fold `p`, so `W = X_p` exactly.

The randomisation is the corpus's own. By the Merge Rate Identity
(`attack-foldL-04-amortized.md` §2, PROVEN there) the two endpoints of a gap die
together in exactly `ω ∈ {0,1,2}` of the `p` copies of the fold. So `u ∈ Z/p` is
uniform, a slot `n` dies at offset `u` iff `n + u ≡ 0` or `−2 (mod p)`, `u = 0`
is the arithmetic truth, `p_α = ω_α/p`, and with `L` the left endpoint

> `g ≡ 0 → S_α = {−L, −L−2}, ω = 2`;  `g ≡ 2 → S_α = {−L−2}, ω = 1`;
> `g ≡ −2 → S_α = {−L}, ω = 1`.

**[VERIFIED] `W(0) = X_p` at 237 of 237 folds**, with the AGG floor dropped to
`p = 5` at `Y = 2·10⁹` so the identity is tested where `X_p` is in the tens of
millions: `W(0) = X_7 = 19,047,619` on `Q = 133,333,332` qualifying gaps,
`X_23 = 106,418`, `X_29 = 75,336`, `X_421 = 1`. That is the gate that licenses
the uniform-offset model as a description of the arithmetic rather than as a
convenient fiction, and it is the file's strongest single check.

### 2.2 The three neighbourhoods, and the b-table

`N1 = {α}`. `N2 = {α−1, α, α+1} ∩ I`, the adjacent gaps — **the choice the map
pre-registered**, from the Fold Moment Identity's pair structure. `N3 = I`,
where `σ(X_β : β ∉ B_α)` is trivial and `b₃ = 0` by identity.

Aggregated over the folds the law is fitted on, `p ≥ 100`:

| Y | Σλ | ΣX | N1 `b₁` | N1 `b₃` | N2 `b₁` | N2 `b₂` | N2 `b₃` | N3 `b₁` | N3 `b₂` |
|---|---|---|---|---|---|---|---|---|---|
| 2·10⁷ | 18.61 | 17 | 1.534e−1 | 3.138e+1 | 1.534e−1 | **0** | 3.138e+1 | 3.042e+1 | 3.052e+1 |
| 2·10⁸ | 192.3 | 194 | 1.586e+0 | 3.752e+2 | 1.586e+0 | **0** | 3.752e+2 | 3.317e+3 | 3.311e+3 |
| 2·10⁹ | 1,919 | 2,006 | 1.580e+1 | 3.799e+3 | 1.581e+1 | **0** | 3.799e+3 | 3.289e+5 | 3.287e+5 |
| 2·10¹⁰ | 19,120 | 19,293 | 1.575e+2 | 3.792e+4 | 1.575e+2 | **0** | 3.792e+4 | 3.259e+7 | 3.259e+7 |

**[MEASURED] `b₂` under N2 is exactly zero at all four windows, and that is a
statement about `H″`, not a rounding.** The count of adjacent qualifying gap
pairs is 0, 1, 24 and 221 across the four windows, and **not one of those pairs
ever fires at a common offset**, at any of the `p` copies. Two adjacent gaps of
the level-`p` word can both qualify; they can never both merge. The reason is
the alternation cap `attack-foldL-01-census.md` §1 names — a run of three needs
two consecutive qualifying gaps in opposite channels — and this is the first
time it has been measured over the whole offset ensemble rather than at the one
arithmetic offset.

### 2.3 The kill criterion, and why `b₃` saturates

Prereg §5: SMALL is `b₃ ≤ 0.1(b₁+b₂)`, NOT SMALL is `b₃ > (b₁+b₂)`, under N2.

| Y | folds with `I ≠ ∅`, `p ≥ 100` | SMALL | between | **NOT SMALL** | max `b₃/(b₁+b₂)` |
|---|---|---|---|---|---|
| 2·10⁷ | 47 | 11 | 0 | **36** | 246.9 |
| 2·10⁸ | 65 | 8 | 0 | **57** | 416.8 |
| 2·10⁹ | 76 | 3 | 0 | **73** | 553.3 |
| 2·10¹⁰ | 108 | 14 | 0 | **94** | 798.0 |

**THE KILL FIRES.** The mechanism is visible in one column. `b₃` can never
exceed `Σ_α 2p_α(1−p_α) = 2λ − 2b₁(N1)`, with equality exactly when the
conditioning σ-algebra determines `X_α`. Measured `b₃/ceiling`: **0.8503,
0.9834, 0.9984, 0.9998**. The conditioning reconstructs the offset, and it does
so more completely the larger the window, because more qualifying gaps means a
finer firing pattern on the same `p` offsets.

The few SMALL folds are the deepest ones, where `Q` falls to one or two
qualifying gaps and there is nothing left to reconstruct with: at `Y = 2·10⁹`,
`p = 499` has `Q = 2` and `b₃/(b₁+b₂) = 2.0`, `p = 457` has `Q = 13` and 24.0,
against 200 to 550 everywhere above.

`b₃` is computed exactly, not bounded. Cells whose reduced firing set is empty
are the one big cell `{u : T(u) ⊆ B_α}`, sized from `W(u)` directly; every other
cell sits inside some `S_β` and so has at most two members and is counted as a
singleton. That single approximation is bounded rather than hoped: it can move
`b₃` by at most `2·b₁(N1)`, which is 0.98%, 0.85%, 0.83% and 0.83% of the
measured `b₃` at the four windows.

### 2.4 P1, P2, P3 — what the first moment does, with the kill's label attached

**Under prereg §5 these are void as Stein-derived results and are reported as a
first-moment computation that owes nothing to Stein's method.** They are
reported in full because a first-moment computation that lands is worth having
whatever licensed it.

**[MEASURED] P1 HOLDS.** `λ_p` is a zero-parameter derived quantity — no fit, no
model of the gap word, just the window's own qualifying gaps counted with their
`ω`.

| Y | Σλ (p≥100) | ΣX | ratio | folds with `λ ≥ 1` inside `±3√λ` |
|---|---|---|---|---|
| 2·10⁷ | 18.61 | 17 | 0.914 | 6 / 6 = 100% |
| 2·10⁸ | 192.3 | 194 | 1.009 | 18 / 18 = 100% |
| 2·10⁹ | 1,919 | 2,006 | 1.046 | 34 / 35 = 97.1% |
| 2·10¹⁰ | 19,120 | 19,293 | 1.009 | 49 / 49 = 100% |

Both pre-registered clauses hold at all four windows: the ratio inside
`[0.8, 1.25]`, and the per-fold band at 90% or better.

**[MEASURED] P2 HOLDS.** The record's own estimator (two-parameter Poisson MLE
over `p ≥ 100` in `θ_p/m̄_before(p)`), applied to the derived `λ_p` curve:

| Y | fitted on `λ`: `A` | `c` | fitted on measured `X`: `A` | `c` ± se |
|---|---|---|---|---|
| 2·10⁷ | 2.0511e−2 | 1.0545 | 2.6478e−2 | 1.1340 ± 0.3578 |
| 2·10⁸ | 2.1773e−2 | 1.0667 | 1.4631e−2 | 0.9741 ± 0.0947 |
| **2·10⁹** | **2.2091e−2** | **1.0701** | **2.4312e−2** | **1.0818 ± 0.0317** |
| 2·10¹⁰ | 2.2010e−2 | 1.0698 | 2.1867e−2 | 1.0662 ± 0.0101 |

The `Y = 2·10⁹` right-hand column is the record's `A = 2.4312e−2,
c = 1.0818 ± 0.0317` reproduced **digit for digit** by an engine that shares no
data structure with the one that produced it. Against it, `c_pred = 1.0701` sits
**0.37σ** low, inside the pre-registered `[0.987, 1.177]`; `A_pred` is a factor
**0.909**, inside the pre-registered 1.5. At `Y = 2·10¹⁰`, where the record's own
error bar is three times tighter, the derived pair (2.2010e−2, 1.0698) sits
against the measured (2.1867e−2, 1.0662 ± 0.0101), **0.36σ** on `c` and a factor
1.007 on `A`.

**[MEASURED] P3 HOLDS.** The geometric null of `import-thinning.md` §1.4 gives
`A = 4.7843e−2` (a factor 1.97 high) and `c = 1.0577` (0.76σ low). The AGG first
moment, which counts the window's actual qualifying gaps instead of modelling
the gap word as geometric, is nearer on **both**: 0.909 against 1.97 on the
amplitude, 0.37σ against 0.76σ on the exponent. **The amplitude the record calls
"fitted, not derived" (`attack-foldL-06-scaling.md` §7) and the thinning import
calls "the right order but not a prediction" is now a computed number that lands
within 10%.** The `c` the corpus has three independent readings of gains a
fourth that agrees with the other three.

**[REFUTED] P4 fails at the two large windows.** Under N3, `b₃ = 0` by identity
and AGG Theorem 1's second display gives a rigorous bound on exactly the
assumption the record's extinction band makes, `P(W_q = 0) = e^{−λ_q}`. Summed
over `p ≥ 300`, the decade that decides where extinction lands, the bound reads
**3.716e−4, 4.474e−2, 2.451, 6.777e+1**. The pre-registered threshold was 0.10:
it holds at `Y = 2·10⁷` and `2·10⁸` and fails by factors of 25 and 680 at the two
windows that matter. The reason is structural rather than a near miss: `N3` buys
`b₃ = 0` at the price of `b₁ = λ²`, so the bound is `O(λ²)` against a target
probability of order `λ`, and it is informative only for `λ ≲ 1/4` — which is
below, not at, the extinction fold. **The extinction band's Poisson assumption
is licensed deep and unlicensed exactly where it is used.**

## 3. Object 2 — the strike process, and the `~3.8` joint deficit

### 3.1 The setup, and two of the three b's in closed form

`W = x#`, natal set `N ⊂ [0,W)`, scour primes `x < q ≤ √W`, all taken verbatim
from `natal-cap-39-triple-census.js`. `I = {(q,L), (q,R)}`, `X_{(q,L)} = 1{q|r}`,
`X_{(q,R)} = 1{q|r+2}`, `r` uniform on `N`, `p_α = 1/q`, `λ = 2S₁`. The
neighbourhood `B_{(q,·)} = {(q,L),(q,R)}` is the pair the construction forces to
be dependent.

> **[PROVEN] `b₂ = 0` exactly.** `p_{(q,L)(q,R)} = P(q|r and q|r+2) = 0` for
> every `q > 2`.
>
> **[PROVEN] `b₁ = 4S₂`, `S₂ = Σ_{x<q≤√W} q^{−2}`.** Each of the `2K` indices
> contributes `2/q²`.

By AGG's own p. 405 identity this is the CRT model's Poisson second-moment
defect: `a+b` is a sum of independent Bernoulli(`2/q`), so `Var = λ − 4S₂` and
`b₂ − b₁ = EW² − EZ² = −4S₂`. The strike count is **under-dispersed** against
Poisson by exactly `b₁`.

**[VERIFIED] custody.** `F = ∏_{q>x}(1+1/(q(q−2))) − 1` reproduces
`import-suen.md` §3 and `xchannel-triples.md` R3 at every level: **2.1086%,
1.7084%, 1.3856%, 1.0878%, 0.8819%** at @11..@23. `K = 435` at @19 and `1739` at
@23 against the record. `N̄ = 2∏_{7≤p≤x}(p−2)` at all five levels. The sub-`W`
triple count at @23 is **4,517,592**, the record's own figure from
`natal-cap-39-triple-census.js` §B2, reproduced by a different enumeration.

### 3.2 P5 and P6, scored

`xchannel-triples.md` R3's measured joint deficit, against `4S₂`:

| x | predicted `1−J = 4S₂` | measured `1−J` | `σ_J` | z | predicted `(1−J)/F` | measured `(1−J)/F` | verdict |
|---|---|---|---|---|---|---|---|
| 11 | 0.074345 | 0.4639 | 0.3791 | +1.03 | 3.5258 | 22.00 | informational |
| 13 | 0.062527 | −0.0236 | 0.0856 | −1.01 | 3.6600 | −1.38 | informational |
| 17 | 0.051607 | 0.0975 | 0.0160 | **+2.87** | 3.7245 | 7.0365 | **MISS** |
| **19** | **0.041122** | **0.0401** | 0.0035 | **−0.29** | **3.7804** | 3.6864 | **HIT** |
| **23** | **0.033678** | **0.0341** | 0.0007 | **+0.60** | **3.8189** | 3.8667 | **HIT** |

**P5 hits at both scored levels.** @17 misses at 2.87σ, and it is the same level
`xchannel-triples.md` R3 already flags as 2.75σ above @23 on its own series; R3
offers two readings of that point and this prediction is compatible with the one
that says the multiple "has always run at about 3.8 times the forced scale" and
@17 is the high point.

**[MEASURED] P6 holds, and it supplies the number the record could not name.**
`4S₂/F` rises **3.5258 → 3.6600 → 3.7245 → 3.7804 → 3.8189** over @11..@23,
monotone, and the measured ratio rises over the two scored levels
(3.686 → 3.867). Because `1/(q(q−2)) = q^{−2}(1 + 2/q + …)`, `S₂/F → 1` and

> **the asymptote of `(1−J)/F` is exactly 4**, and the record's `~3.8` is that
> limit seen at `x = 23`.

Four is AGG's `b₁` neighbourhood count: two orientations per prime, each paired
with both members of its own neighbourhood.

**Forward prediction, on the record before the level exists.** The closed form
needs only the scour prime list, so it can be quoted two levels past the census,
and `xchannel-triples.md` §7 names @29 as the level that would decide R3.

> **@29** (`K = 7,863` scour primes in (29, 80429], `F = 0.7537%`):
> **`1 − J = 0.028943`, `(1−J)/F = 3.8399`**.
> **@31** (`K = 37,534` in (31, 447829], `F = 0.6419%`):
> **`1 − J = 0.024784`, `(1−J)/F = 3.8612`**.

Both `F` values reproduce `import-suen.md` §3's own two-level extension
(0.7537% and 0.6419%) exactly, which is the custody on the prime lists behind
the prediction. This is the test to run when the @29 census becomes affordable,
and it is blind in the strongest sense available: no @29 census exists.

### 3.3 Why this is not a derivation, by the pre-registration's own rule

| x | `b₃` | `b₁+b₂` | ratio | `b₃` / ceiling `2λ−2b₁` | signature classes | natal `r` |
|---|---|---|---|---|---|---|
| 11 | 0.9411 | 0.0743 | 12.7 | 0.658 | 39 | 90 |
| 13 | 1.1842 | 0.0625 | 18.9 | 0.546 | 382 | 990 |
| 17 | 1.7260 | 0.0516 | 33.4 | 0.598 | 5,808 | 14,850 |
| 19 | 2.1287 | 0.0411 | 51.8 | 0.610 | 100,046 | 252,450 |
| 23 | 2.4720 | 0.0337 | **73.4** | 0.612 | 2,150,326 | 5,301,450 |

`b₃` is computed **exactly**, by enumerating every conditioning cell that has a
`q`-sibling (7,203,512 of them at @23) and closing the rest in one closed form.
The classes are genuinely non-singleton — 2.47 natal residues per class at @23 —
so the 0.61 is a real measurement of partial reconstruction and not an artefact
of everything being unique.

**NOT SMALL at every level.** Prereg §5's clause therefore applies: `4S₂` is
recorded as a zero-parameter closed form that fits, not as a Stein-derived
constant.

### 3.4 The one mechanism that would have derived it, tested and REFUTED

If the whole `i+j = 3` deficit lived in the super-`W` part — which is what
`verify-cofactor-convolution.md` §3 argues about P1's truncation — then
`1 − J = δ_tot/s` with `δ_tot = 1 − T/(6N̄e₃)` the total anchored-versus-CRT
deficit of the `(2,1)+(1,2)` census and `s = mm₃/e₃` the super-`W` share. Both
sides are computed here exactly.

| x | mean(a+b) | `λ = 2S₁` | var(a+b) | `λ − 4S₂` | super-W share `s` | `δ_tot` | `δ_tot/s` | measured `1−J` |
|---|---|---|---|---|---|---|---|---|
| 11 | 0.81111 | 0.78909 | 0.81988 | 0.71475 | 1.000000 | 4.639e−1 | **0.46393** | **0.46390** |
| 13 | 1.14646 | 1.14676 | 1.04622 | 1.08424 | 0.866651 | 1.361e−2 | 0.01570 | −0.02360 |
| 17 | 1.49037 | 1.49379 | 1.39307 | 1.44218 | 0.614356 | 5.683e−2 | 0.09251 | 0.09750 |
| 19 | 1.78528 | 1.78566 | 1.73075 | 1.74454 | 0.446412 | 9.770e−3 | 0.02189 | 0.04010 |
| 23 | 2.05287 | 2.05259 | 2.00513 | 2.01891 | 0.334471 | 6.514e−3 | 0.01948 | 0.03410 |

The @11 row is the identity check: `s = 1`, every triple is super-`W`, and
`δ_tot/s = 0.46393` against the record's `0.46390`. Where `s < 1` the
decomposition **fails**: 0.0219 against 0.0401 at @19 and 0.0195 against 0.0341
at @23, a factor of about 1.8 short at both. **[REFUTED] The joint deficit does
not all live in the super-`W` part**; the sub-`W` part carries a compensating
surplus, and subtracting it is what makes the super-`W` deficit as large as it
is. So the obvious route from the exactly computable total to `1−J` is closed,
and `4S₂` is left without a mechanism.

**[MEASURED] One number that keeps the candidate alive.** The anchored strike
process's own Poisson variance defect, `mean − var`, reads **0.04774** at @23
against the CRT model's `4S₂ = 0.03368`: the true process is 1.42 times more
under-dispersed than mutual exclusion alone forces, in the same direction. The
CRT first moment is essentially exact (2.05287 against 2.05259, 0.014%). Whatever
`4S₂` is doing at `i+j = 3`, the object it is the second moment of is real in the
anchored measure and not only in the model.

## 4. The wall address, which is the transferable finding

Both objects fail the same way, and the failure is not technical.

> **A sieve object whose randomness is one residue draw per modulus cannot be
> priced by the Chen–Stein `b₃` at any local neighbourhood.** Every indicator is
> a function of the single draw, so the indicators outside any proper
> neighbourhood determine it, `E{X_α | F_α} = X_α`, and `b₃` sits at its ceiling
> `Σ 2p_α(1−p_α)`. Measured at 0.85 to 0.9998 of that ceiling on the multi-kill
> side and 0.55 to 0.61 on the strike side.

That is the same hypothesis that priced two other rows of the map, reached from
a third direction, and the three should be read together:

- **Row 10, Moser–Tardos**, needs the window to be a product space over the
  residues mod every `q ≤ x`, which is `H ≥ x#`.
- **Row 3 and `import-suen.md` §8** locate the local-lemma wall at the
  admissible conditioning-set modulus, which is the same requirement.
- **This row** shows that even the *approximation* machinery, which asks for far
  less than the local lemma, needs the same product structure, because `b₃` is
  the price of not having it.

**The escape AGG themselves supply is legal and is priced here.** Take
`B_α = I`; then `σ(X_β : β ∉ B_α)` is trivial, `b₃ = 0` by identity, and
Theorem 1 costs `b₁ = λ²` instead. That is the only version of the method that
applies to this corpus's objects, it is non-vacuous only for `λ ≲ 1/4`, and §2.4
measures exactly where that lands relative to the extinction fold: below it.

## 5. What this does not show

Nothing here proves `H″`, and nothing here bears on the exponent. The `b₃`
measurement for object 1 carries one stated approximation, bounded by `2·b₁(N1)`
and measured at under 1% of `b₃` at every window. The `b₃` measurement for
object 2 uses a 53-bit signature hash, so distinct signatures could in principle
collide; the class count is reported and the expected collision count at
`N̄ = 5.3·10⁶` is under 0.002. The extinction-law figures are localised-window
figures and `attack-foldL-06-scaling.md` §7's warning that the window's `G₂` is
smaller than the tile's at the same fold applies unchanged; nothing here is a
statement about `T_x`. `λ_p` is derived from the window's own gap word, so it is
not a *prediction* of the window in the sense the record's out-of-sample test
was — it is a derivation of the rate law's shape and constants from data the
record also had, and its content is that no fitted amplitude is needed, not that
a new window was forecast. The `4S₂` agreement rests on two levels, exactly as
R3's own constant does, and @17 disagrees with both. The joint-deficit
measurements `J` are quoted from `xchannel-triples.md` and were **not**
recomputed here; what was recomputed and reproduced is `F`, `K`, `N̄` and the
sub-`W` triple count. And the AGG statements are read from the authors' 1990
restatement, not from the 1989 paper.

## 6. Proposed regrades and updates, for adjudication rather than applied

**`IMPORT-MAP.md` row 4 → LANDED, kill criterion fired.** Verification column
**[SOURCED-BIB] → [SOURCED, verbatim, via the authors' 1990 restatement]**.
Payoff banked: **PUBLISHED-ANCHOR** (the b-formulas and the 1.4 at source) +
**WALL-ADDRESS** (the one-draw obstruction, shared with rows 3 and 10) + a
closed-form candidate for TODO item X that is explicitly not a derived constant.
The pre-registered payoff was "DERIVED-CONSTANT, twice"; the honest outcome is
zero derived constants and two zero-parameter formulas that fit, one of which
(`λ_p`) removes a fitted amplitude the corpus has flagged as underived twice.

**Row 4 should also carry the calibration lesson**, since the map's own §1
teaches from its calibration set: this is the first row where the circularity
check was CLEAN, the fit grade was honest, and the row still closed — on an
*error term*, which is a failure mode none of the five calibration rows had.

**`TODO.md` item X.** The sentence "the ~3.8 constant has no derivation — that
derivation is the item's open analytic target" wants replacing with: *the ~3.8
constant now has a zero-parameter closed-form candidate,
`4·Σ_{x<q≤√W} q^{−2}`, which lands at −0.29σ (@19) and +0.60σ (@23) and misses
at @17 by 2.87σ; it is AGG's `b₁` for the scour-strike process, hence the CRT
model's Poisson variance defect, its asymptote is exactly 4, and it rises
3.53 → 3.82 over @11..@23 as the measured ratio rises. It is not derived: the
Chen–Stein error term that would license it is 73× the pair terms at @23, and
the one mechanism tested — that the whole deficit lives in the super-`W` part —
is refuted, `δ_tot/s = 0.0195` against a measured 0.0341 at @23. The @29 value is
pre-computed and on record.*

**`attack-foldL-06-scaling.md` §7's "the amplitude `A` is fitted, not derived"**
is now answerable: the derived first moment gives `A = 2.2091e−2` at `Y = 2·10⁹`
against the fitted `2.4312e−2`, and `2.2010e−2` against `2.1867e−2` at
`Y = 2·10¹⁰`. That is a note to carry back if the record is ever integrated, not
an edit made here.

## 7. Reproduction

```
node research/import-stein-01-multikill.js                       # 386.5 s, four windows + the P0=5 calibration
STAGE=predict node research/import-stein-01-multikill.js          # stops before the four-window measurement
SKIPCAL=1 node research/import-stein-01-multikill.js              # skips the deep stage-A window
node --max-old-space-size=10000 research/import-stein-02-strikes.js   # 223.6 s, @11..@23
XMAX=19 node research/import-stein-02-strikes.js                  # 1 s, stops below @23
```

Both tails are formally embedded
(`node research/qc/embed.js --timeout 1500 research/import-stein-01-multikill.js`;
`node research/qc/embed.js --timeout 900 --node-flag --max-old-space-size=10000
research/import-stein-02-strikes.js`). Producer 1 aborts unless 23 of the
record's embedded figures reproduce digit for digit and unless `W(0) = X_p` at
every fold; producer 2 aborts unless `W`, `ln W`, `N̄` and `K` match the record
at every level.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
