# Import row 15 run: the skeleton door is Saffari–Vaughan's Θ*, and their theorem stops before the mass starts

<!-- ledger
id: Q-import-fracparts
status: ANSWERED
todo: 4 (retired)
question: Does Saffari-Vaughan Theorem 10 cover the branches carrying the Skeleton door's mass?
verdict: Prediction HIT: the covered branches carry at most 8 percent of the mass; anchor and a sharper wall-address banked; the THEOREM column is struck, not merely overpriced, because Theorem 10's range condition is x^{6/11+eps} < y, which fails at fixed M; no route; no cap-36 line is upgraded.
-->

*Staging record, 2026-08-28. The experiment priced as row 15 of
`history/staging/import-map-rows-15-17.md`. Source: B. Saffari and R. C.
Vaughan, "On the fractional parts of x/n and related sequences. II",
Ann. Inst. Fourier 27 (1977) 1–30, DOI 10.5802/aif.649. Companion producer:
`import-fracparts.js`, scratchpad-grade. This pass edited no existing file and
ran no git command. Nothing here is integrated; §8 drafts the regrade text for
whoever holds `research/IMPORT-MAP.md`.*

**The standing calibration this pass carries.** Imports on this corpus bank
payoff and do not open routes: 21 across 2026-08-26 and 2026-08-27 returned
zero routes. This one returns zero routes too. Everything below is graded by
payoff TYPE.

---

## 1. The prediction, written before anything was computed

**Timestamp 2026-08-28T08:05:15Z.** Written into this file before the branch
ledger was reopened and before `import-fracparts.js` existed. **This is an
UNSEALED prereg**: the publication moratorium and this pass's fence forbid any
git command, so there is no commit hash stamping it. It is a prereg by
construction order and by nothing stronger, and it should be read at that
rung. The reader who wants the sealed kind should look at
`xchan-at37-offset-prereg.md`, which has a hash.

**The exact test, in three parts.**

1. *Which branches Theorem 10 covers per level.* Row 15 §6(b) reads the
   theorem's range condition under the dictionary `x = W/M`, `y = √W` as
   `M ≤ √W`. (Row 15 as written carries the lower exponent `1/11`; printed
   p. 7 reads `x^{6/11+ε} < y ≤ x`, corrected in §3, and the correction leaves
   the covered set unchanged at every computed level.) Prediction: the covered
   set at level `L` is exactly the branch moduli `M_T = 30·∏_{p∈T} p` with `M_T ≤ √(L#)`, and
   at @17 through @23 that means depth `|T|−1 ≤ 1` at @17 and `≤ 2` at @23.
2. *Which branches carry the skeleton mass.* `natal-cap-36` Proposition E
   measured 90.8% / 100.9% / 110.8% / 94.5% of `Σ_T Σ_q Snum_T` at
   @13 / @17 / @19 / @23 in branches with `M_T > lB`, concentrated at the one
   depth where `M_T` first passes the window length.
3. *The predicted overlap: none.* No branch that Theorem 10 covers carries a
   share of `Σ_T Σ_q Snum_T` above 10% in magnitude at any of @13, @17, @19,
   @23. The covered aggregate is predicted to be a few percent of either sign,
   the same square-root cancellation Measurement D shows at `M = 30, 210,
   2310`.

**Kill, as row 15 wrote it.** If any single branch with `M_T ≤ √W` carries
more than 10% of `Σ_T Σ_q Snum_T` at any of @13, @17, @19, @23, the theorem
reaches live mass, §6(b) is wrong, and the row upgrades from a wall address to
a partial closure. If none does, the row banks a theorem for the empty half
and a wall address, and the fixed-modulus door is confirmed out of reach of any
theorem of `{N/p}` type.

**One prediction is additionally made about the dictionary itself, before the
page was re-read at the definitional level:** that `c_α` is the indicator of
`{t} < α`, so that `Θ*_{x,y}(α)` is a log-weighted distribution function of
`{x/p}` and the door's `⌊M·{W/(Mq)}⌋` is read off it by taking `α = j/M`.

---

## 2. What is open or failed, first

**No route opened.** The import banks payoff and does not move `G30_agg`, does
not close the Skeleton Equidistribution Conjecture at any modulus, and does not
touch the all-`x` aggregate bound. The 21-for-0 record stands at 22-for-0.

**The row's THEOREM column is struck, not lowered.** Row 15 §1 priced
"THEOREM (for the reachable branches)". Three things are wrong with it. The
first is decisive and is §3's: Theorem 10's lower range condition is
`x^{6/11+ε} < y`, which under the dictionary reads `M > W^{1/12}` and fails at
every fixed `M` as `W → ∞`, so there is no fixed-modulus theorem here to bank
(§6). The other two were found at the page and in the ledger, and both are
stated before the win below.

1. *Theorem 10 is a marginal statement and the door is a joint one.* Cap-36
   Proposition C makes the branch aggregate `Σ_q Ψ_M(q mod M, ⌊W/q⌋ mod M)`,
   a function of the PAIR. Theorem 10 controls the distribution of
   `⌊W/q⌋ mod M` alone. So even on a branch the theorem fully covers, no bound
   on `Σ_q Snum_T` follows, and no branch closes. What transfers is one
   marginal, not a branch.
2. *Theorem 10 is asymptotic with an unspecified implied constant, so it
   certifies zero branches at every level the corpus computes at.* Its saving
   is `exp(−C(ε)(log x/log log x)^{1/3})`, a log-power saving and not a power
   saving. Resolving a cell of width `1/M` needs
   `M·exp(−C(log W/log log W)^{1/3}) → 0`, that is
   `M ≪ exp(C(log W/log log W)^{1/3})`. With `C = 1` that reads 5.59, 6.02,
   6.47, 6.92, 7.38 and 7.85 at @17 through @37
   (`redteam-0828-litimports.js` PART F2), against the coarser
   `exp((log W)^{1/3})` column the producer prints, 10.6, 12.5, 14.6, 16.9,
   19.4 and 22.1 (`import-fracparts.js` E2), which is about three times too
   generous. On either reading the condition admits `M = 30` at no level at
   all. The
   theorem is worth having as an asymptotic; it is worth nothing as a
   certificate at a finite `x`, and no reading below claims otherwise.

**Still open, unchanged by this pass.** The Skeleton Equidistribution
Conjecture at moduli growing with `W`; the all-`x` `G30_agg < 1/2` (a theorem
at `x ≤ 29`, `natal-cap-36` P6); TODO item 4, which this pass does not answer
in the "restate" direction either, since the only statement Theorem 10 supports
at the marginal face lives on the growing window `W^{1/12} < M ≤ √W` (§6) and
restates no line of the cap-36 ledger.

**Not reached.** No prior-art search worth the name was run on the
identification itself (§7).

---

## 3. The dictionary, checked at the page

**Custody.** `curl` at 2026-08-28T08:02Z returned HTTP 200 and 1,548,052 bytes
from `https://aif.centre-mersenne.org/item/10.5802/aif.649.pdf` with sha256
`26ea860646aea8e0007bed07cc074dcf2abb3f646d173688f3939dbf32439bde`, matching
the hash row 15 §5 recorded. Part I was fetched as well,
`https://aif.centre-mersenne.org/item/10.5802/aif.634.pdf`, 951,862 bytes,
sha256 `8ec0e78a4d7cd007d9d10c667b2a06e737a5026eb5673d86cff3d88c1f624cae`,
because the definition the dictionary turns on lives there and not in II.
Both were read with `pdftotext -layout`; the scan is a 1977 Numdam
digitisation and its text layer is corrupted OCR, so the decisive pages are
read at a 150 dpi rendering of the page image and every place where a character
is lost in the extraction is flagged below rather than quoted.

**[SOURCED] The definition of `c_α`, part I (1.9), p. 116.** `c_α` is "the
characteristic function modulo 1 of `[0, α)`": `c_α(u) = 1` when
`0 ≤ {u} < α` and 0 otherwise. So `Θ` and `Θ*` are distribution functions of
fractional parts, which is what the prereg predicted, and reading the door off
them at `α = j/M` is legitimate. **Prediction on the dictionary: HIT.**

**[SOURCED at the page image] Theorem 10 and (1.27), II printed p. 7,
verbatim.** The PDF's text layer is corrupted OCR and cannot be quoted; the
block below is copied from a 150 dpi rendering of the page.

> `(1.27)  Θ*_{x,y}(α) = y^{−1} Σ_{p≤y} (log p) c_α(x/p)`
>
> **THEOREM 10.** Suppose that `ε > 0` and `x^{6/11 + ε} < y ⩽ x`. Then
> `(1.28)  Θ*_{x,y}(α) = F(α, x/y) + O(exp(−C(ε)(log x/log log x)^{1/3}))`
> where `C(ε)` is a positive number depending at most on `ε`.

The lower exponent is `6/11`, and the paper's own derivation settles it against
any other reading: the same page obtains the constant as `c/(c+2)` from a
zero-density exponent `N(σ,T) ≪ T^{c(1−σ)+ε}`, and says the density hypothesis
would replace it by `1/2`. The density hypothesis is `c = 2` and `2/4 = 1/2`
checks; Ingham's `c = 12/5` gives `(12/5)/(22/5) = 6/11` exactly. No positive
`c` makes `c/(c+2)` equal `1/11` while keeping `1/2` as its density-hypothesis
limit, so `1/11` is not an available reading of the glyph. The saving is
`exp(−C(ε)(log x/log log x)^{1/3})` and not `exp(−C(ε)(log x)^{1/3})`. Every
argument below that uses only the shape of the saving uses only that it is
quasi-polynomially small and not power-small; the lower range condition, by
contrast, is load-bearing, and §6 states what it costs. `C(ε)` depending at
most on `ε` is what makes the error uniform in `α`, which the resolution
argument needs.

**The dictionary, and it holds.** Cap-36's own reduction is the whole of it.
For `M | W`, writing `W' = W/M ∈ Z`, `⌊W/q⌋ = M⌊W'/q⌋ + ⌊M{W'/q}⌋`, so
`⌊W/q⌋ ≡ ⌊M·{W'/q}⌋ (mod M)`. **[PROVEN, one line, and machine-checked with
zero exceptions on 1,133,872 (branch, scour prime) pairs at @13, @17, @19,
@23, @29: `import-fracparts.js` E3.]** Hence the number of scour primes `q`
with `⌊W/q⌋ ≡ j (mod M)` is the number with `{W'/q} ∈ [j/M, (j+1)/M)`, which
is `y·(Θ*_{W', y}((j+1)/M) − Θ*_{W', y}(j/M))` after unweighting. So the
door's marginal face IS Saffari–Vaughan's `Θ*`, at

> **`x_SV = W' = W/M_T`,  `y = √W`,  `α = j/M_T`.**

Two bookkeeping differences, both as row 15 stated them and neither deep. The
`log p` weight against the corpus's unweighted sum: partial summation. The
range `p ≤ y` against the scour range `q ∈ (x, √W]`: the discrepancy is
`θ(x)/√W`, and `√W = exp(θ(x)/2)`, so it is smaller than any power of `1/x`.

**The range condition, re-derived at the page image.** Theorem 10 requires
`x^{6/11+ε} < y ≤ x`. Under `x_SV = W/M`, `y = √W` the upper condition reads
**`M ≤ √W`** and the lower reads **`M > W^{1/12}`**, so the theorem covers the
branch window `W^{1/12} < M_T ≤ √W`. At @13 through @37 `W^{1/12}` is 2.36,
2.99, 3.82, 4.96, 6.57, 8.75 and 11.82 (`redteam-0828-litimports.js` PART F),
below every branch modulus, the smallest of which is 30, so the covered set
coincides with `{M_T ≤ √W}` at every computed level and §4's coverage table
stands. The admissible `ε` at @19, `M = 30`, is `ε < 0.0886`. At fixed `M` and
`W → ∞` the lower condition fails, so no fixed-`M` asymptotic follows from this
theorem, which is §6's strike.

**Two further conditions the row did not state, and they bind harder than the
range condition. DERIVED HERE.** Theorem 10 gives the distribution function,
not uniformity. Uniformity needs `F(α, ξ) → α` at `ξ = x/y = √W/M`.

- *The main term.* Theorem 1 (printed p. 2, `1 ⩽ y ⩽ x`) gives
  `Θ_{x,y}(α) = F(α, x/y) + O(x^{1/3}y^{−1} log x)` and Corollary 1.3
  (printed p. 3, `y/x → 0`) gives
  `Θ_{x,y}(α) = α + O(yx^{−1} + x^{1/3}y^{−1} log x)`; both exponents are
  `1/3`, read at the page image. Holding `ξ = x/y` fixed while `x → ∞` violates
  Corollary 1.3's own hypothesis, since `y/x = 1/ξ` is then constant, so the
  limit is taken along a diagonal instead: for any sequence `ξ_n → ∞` choose
  `x_n` large enough that `ξ_n x_n^{−2/3} log x_n ≤ 1/ξ_n`, and set
  `y_n = x_n/ξ_n`. Then `y_n/x_n → 0`, Corollary 1.3 applies, the
  `x^{1/3}y^{−1} log x` terms cancel between the two statements, and
  `F(α, ξ_n) = α + O(1/ξ_n)`. `F` does not depend on `x`, so
  **`F(α, ξ) = α + O(1/ξ)` as `ξ → ∞`**, uniformly in `α`. This fills row 15
  §7's third NOT-REACHED item, from their own two statements rather than from
  (1.2), whose OCR is unreadable. It also means the main term resolves a cell
  of width `1/M` only when `M/√W ≪ 1/M`, that is **`M ≪ W^{1/4}`**.
- *The error term.* Resolving `1/M` needs
  `M·exp(−C(ε)(log(W/M)/log log(W/M))^{1/3}) → 0`, that is
  **`M ≪ exp(C(log W/log log W)^{1/3})`**, which is asymptotically the binding
  one.

`exp(C(log W/log log W)^{1/3})` exceeds every fixed power of `log W`, so on
the marginal face Theorem 10 reaches further than the Siegel–Walfisz range
`(log W)^A` that row 15 §2 named for the joint face. That is the one place this
import is better than the row priced. It is also a purely asymptotic gain, and
it is available only inside the window `M > W^{1/12}`: the `C = 1` column shows
the condition admits nothing at any level in the ladder.

---

## 4. The coverage table

Computed by `import-fracparts.js`, scratchpad-grade, invocation
`node research/history/staging/import-fracparts.js`, 5.7 s, output embedded by
`node research/qc/embed.js --force`. The producer reproduces cap-36 P4's own
totals at all four levels from an independent CRT evaluator that allocates no
table of size `M` (E0a: max relative error `6.7e−12` against cap-36's table
form; E1 totals `2.9021e+1`, `2.2650e+2`, `1.8153e+2`, `3.8400e+2` against
cap-36's printed values, relative error `1.1e−7` to `2.6e−5`). The split is on
`M_T ≤ √W`, a fixed per-branch condition, and not on cap-36 P4's `M_T ≤ lB`,
which is a per-`(T, q)` condition; the two columns are therefore not the same
column, and §5 gives the exact relation.

| level | branch moduli `M_T` | Thm 10 applies (`y ≤ x`, i.e. `M_T ≤ √W`) | skeleton mass share of the covered branches | largest single covered branch |
|---|---|---|---|---|
| @13 | 8 branches, `√W = 173.3` | 1 of 8 (`M = 30`, depth 0) | `5.869e−2` = **0.2%** of `2.9021e+1` | 0.20% (`M = 30`) |
| @17 | 16 branches, `√W = 714.5` | 5 of 16 (depth ≤ 1: 30, 210, 330, 390, 510) | `−1.980e+0` = **−0.9%** of `2.2650e+2` | 0.70% (`M = 330`) |
| @19 | 32 branches, `√W = 3114.4` | 8 of 32 (depth ≤ 2, largest `M = 2730`) | `−1.474e+1` = **−8.1%** of `1.8153e+2` | 5.68% (`M = 2310`) |
| @23 | 64 branches, `√W = 14936.3` | 22 of 64 (depth ≤ 2, largest `M = 13110`) | `−1.025e+0` = **−0.3%** of `3.8400e+2` | 1.10% (`M = 5610`) |

**Summary line.** Theorem 10 covers 1, 5, 8 and 22 of the 8, 16, 32 and 64
branches at @13, @17, @19 and @23, and those branches carry
`+0.2% / −0.9% / −8.1% / −0.3%` of the skeleton total, with no single covered
branch above 5.68% in magnitude and none above 10%.

**@29 and beyond: mass not evaluable, coverage condition evaluable.** No
branch ledger is embedded above @23 anywhere in the corpus, and the fence
forbids a new census, so the mass column is empty at @29, @31 and @37 and this
pass makes no claim there. The coverage condition alone is free arithmetic and
E2 gives it: 40 of 128 branches covered at @29 (max depth 3, largest covered
`M = 79170`), 90 of 256 at @31 (depth 3), 180 of 512 at @37 (depth 4). The
covered fraction of the branch COUNT does not shrink with the level: 1 of 8,
5 of 16, 8 of 32, 22 of 64, 40 of 128, 90 of 256, 180 of 512, that is 0.125,
0.313, 0.250, 0.344, 0.313, 0.352, 0.352, non-monotone at @19 and @29 and
otherwise drifting up. That is the opposite of what a reader would guess from
the row, and is worth saying: the theorem covers a stable-to-growing share of
the branches and, at every level where the mass is measurable, essentially
none of the mass.

**The only branch-level data above @23 that already exist** are cap-36 P3's
cancellation ratios at `M = 30, 210, 2310, 30030`. All four of those moduli sit
below `√W` from @29 on, and their cancellation is at or below `K^{−1/2}` at
@29 through @37 except `M = 30030` at @29 (`7.98e−2` against
`K^{−1/2} = 1.13e−2`). That is consistent with the covered branches being the
cancelling ones and is not evidence about their mass.

---

## 5. The prediction, scored

**HIT on the kill test, and a correction on the word "exactly".**

*Part 3 of the prereg, the overlap.* Predicted: no covered branch carries more
than 10% of `Σ_T Σ_q Snum_T` in magnitude at @13, @17, @19 or @23. Measured:
0.20%, 0.70%, 5.68%, 1.10%. **The kill does not fire at any level. The
prediction is a HIT.** Predicted also: the covered aggregate is a few percent
of either sign. Measured `+0.2%, −0.9%, −8.1%, −0.3%`. The `−8.1%` at @19 is
at the loose end of "a few percent" and comes from one branch pair,
`M = 2310` at `−5.68%` and `M = 2730` at `−3.63%`; @19 is also the level whose
`M_T ≤ lB` column cap-36 printed at `−10.8%`, so the level, not the split, is
where that sits.

*Part 1, which branches are covered.* The prereg said depth `≤ 1` at @17 and
`≤ 2` at @23. Measured: depth `≤ 1` at @17, depth `≤ 2` at @19 and @23. HIT.

*Part 2 and the word "exactly".* Row 15 §3 wrote that the theorem "covers only
branches Proposition E measured at or below `lB`". The containment is real and
provable, the equality is not. **DERIVED HERE, and machine-checked:** every
scour prime satisfies `q ≤ √W`, so `lB = ⌊(W+1)/q⌋ ≥ ⌊√W⌋`, and an integer
`M ≤ √W` satisfies `M ≤ ⌊√W⌋ ≤ lB` for every `q`. So
`{M_T ≤ √W} ⊆ {M_T ≤ lB}` at every `(T, q)` pair, **strictly**: E3 counts
34 against 95 pairs at @13, 600 against 756 at @17, 3,480 against 5,948 at
@19, 38,258 against 47,432 at @23, and 314,520 against 447,287 at @29. Zero
exceptions to the inclusion. The correct statement is that Theorem 10 reaches
a strict subset of cap-36's closable column, which makes the prediction safer
than it was written, not weaker.

**One thing the prereg did not predict and the ledger says anyway. DERIVED
HERE, machine-checked with zero exceptions on the same 1,133,872 pairs (E3):**
cap-36 Proposition E's threshold is exactly a no-wrap condition.

> For `M_T | W` and any scour prime `q`, `M_T > lB ⟺ q > W' = W/M_T`.

Equivalently `M_T > lB ⟺ ⌊W/q⌋ < M_T`, so on the open side the reduction mod
`M_T` does nothing at all: the branch phase is the integer `⌊W/q⌋` itself,
unreduced. In fractional-part language, `W' < q` makes `{W'/q} = W'/q` with no
wrapping, and a sequence that never wraps has no equidistribution at
resolution `1/M`; it is monotone in `q`. This is the same degeneracy cap-36
records as `Q = 0, R = lB`, said in the imported field's own words.

---

## 6. Payoff banked, by type

**PUBLISHED-ANCHOR [banked].** The skeleton door's marginal face is
Saffari–Vaughan's `Θ*_{x,y}(α)` at `x = W/M_T`, `y = √W`, `α = j/M_T`, with
`c_α` the indicator of `{u} < α`. The corpus has carried this object since
2026-08-15 with the owning convention unnamed, and `Saffari` appears nowhere in
the repository outside row 15. The owning-convention row for
`SEARCH-CONVENTIONS.md` is "the distribution of the fractional parts of `N/n`
and `N/p`", with Saffari–Vaughan I and II as the anchor and Graham–Kolesnik as
the method behind the error term. The anchor is banked; the novelty question
attached to it is NOT (§7).

**WALL-ADDRESS [banked], in their coordinates.** Each branch is an instance of
`Θ*` at `x_SV = W/M_T` with `y = √W` fixed by the scour range. Then:

- The theorem's regime is `y ≤ x`, that is `x_SV ≥ √W`, that is
  `M_T ≤ √W`. Measured mass there: `+0.2% / −0.9% / −8.1% / −0.3%`.
- The corpus's mass is at `M_T > lB`, which by §5 is `x_SV < q` for the very
  prime `q` being summed. So the open half is not merely `y > x`; it is the
  regime in which **every summand `p` exceeds `x`**, where `{x/p} = x/p` never
  wraps. Saffari–Vaughan's `y ≥ x` half (Theorems 6 to 9) is for integers with
  logarithmic weights and still needs `x → ∞`, and `x_SV = W/M_T` falls to 1
  at the deepest branch, where `Θ*` degenerates completely.

So the address is: **the skeleton's mass sits at `x_SV < p`, outside every
theorem in the field, and outside the field's subject matter, because there is
no fractional part left to equidistribute.** That is a stronger closure than
row 15 anticipated. The row expected a range-condition failure; what is there
is a degeneracy of the object.

**NO THEOREM: the column is struck, not repriced.** The fixed-`M` statement
this experiment set out to bank reads: for each fixed `M` dividing `W` at every
level, as `x → ∞` along the primorial ladder,
`y^{−1} Σ_{q ≤ y} (log q)·1[⌊W/q⌋ ≡ j (mod M)] = 1/M + o(1)` with `y = √W`. It
has no instance at large `W`. Its hypothesis is `(W/M)^{6/11+ε} < W^{1/2}`,
that is `M > W^{1/12}`, whose left side exceeds the right for every fixed `M`
once `W` is large enough. **The statement as posed is void.**

What survives is the same statement on the growing window
`W^{1/12} < M ≤ √W`:

> `y^{−1} Σ_{q ≤ y} (log q)·1[⌊W/q⌋ ≡ j (mod M)] = 1/M + O(exp(−C(log W/log log W)^{1/3}) + M/√W)`,
> uniformly in `j ∈ Z/M`, with `y = √W`, for `W^{1/12} < M ≤ √W`.

That follows from Theorem 10 applied at `α = j/M` and `α = (j+1)/M` together
with `F(α, ξ) = α + O(1/ξ)` derived in §3, and it transfers to the unweighted
count over `q ∈ (x, √W]` by partial summation. A growing modulus is precisely
the regime the rest of this note says the source does not reach, so nothing in
the cap-36 ledger is upgraded by it. **No cap-36 line moves from MEASURED to
PROVEN.** The line this pass first claimed for the upgrade is
`natal-cap-36-skeleton-door.md` Measurement D's last paragraph, "A separate
census (not in the script, same method) finds the marginals `(a mod 30)`,
`(⌈W/q⌉ mod 30)` and the joint pair also uniform at nine levels through @41",
which is a finite-level statement at nine named levels; an asymptotic with an
unspecified constant certifies no finite level, so it cannot upgrade it. Three
further points travel with the strike. The cap-36 line is about `⌈W/q⌉` while
the surviving statement is about `⌊W/q⌋`, which differ by exactly 1 since no
scour prime divides `W`, so uniformity would transfer if anything transferred.
The surviving statement is one marginal, so it bounds no `Σ_q Snum_T`. And it
does not reach the joint `(q mod 30, ⌊W/q⌋ mod 30)` line that Proposition C
needs, nor the `a mod 30` marginal, since `a ≡ q·lA (mod 30)` is a function of
the joint pair.

**No CLOSURE, no DERIVED-CONSTANT, and no route.** Nothing here bounds
`G30_agg`, moves the exponent, or closes a family.

**Is the uncovered mass where the TPC-strength lives?** Not established, and
this pass does not claim it. What is established is narrower and worth keeping
separate. The uncovered mass is where the door is not a fractional-parts
question at all (§5), and cap-36's second face already says what it is instead:
primes in progressions mod `M` averaged across the `~√W` hyperbola intervals
`(W/(k+1), W/k]`, whose mean length is at most 1 for `q ≤ √W`. A statement
about primes in intervals of bounded mean length, even an averaged one, is the
shape of thing this corpus has repeatedly found to be TPC-strength or worse,
which is why row 15's SPLIT verdict should stay SPLIT with the deep half read
at the lower rung as **suspected TPC-STRENGTH, UNRESOLVED**. Calling it
TPC-strength outright would need a derivation nobody here has written, and
saying so is not the same as having shown it.

---

## 7. NOT REACHED

- **No prior-art search worth the name.** One query was run and returned
  nothing that identifies this object with a sieve skeleton. One query is not a
  search, `SEARCH-CONVENTIONS.md` was not worked through, and the arXiv channel
  was not tried. Row 15 §7's contingency on this stands unresolved: the
  PUBLISHED-ANCHOR is banked as an anchor, not as a novelty claim.
- **The mass above @23.** No branch ledger exists at @29, @31 or @37, and none
  was computed. The coverage table's mass column stops at @23.
- **The arithmetic-progression version of Theorem 10** was not written out.
  Row 15's §3 named it as the second deliverable, and this pass did not produce
  it. What §3 above adds is only that the reach on the marginal face,
  `exp(C(log W/log log W)^{1/3})`, is larger than the Siegel–Walfisz range
  `(log W)^A`,
  so an AP version would be worth writing if the joint face mattered anywhere
  the mass is. It does not, by §5, which is why this was not done.
- **`F(α, ξ)`'s closed form** at their (1.2) was still not read; the OCR is
  unreadable there. `F(α, ξ) = α + O(1/ξ)` in §3 is derived from Theorem 1 and
  Corollary 1.3 instead, which is enough for everything used here and is not
  the same as having the formula.
- **Theorem 10's implied constant** is unspecified in the source, so no finite
  level is certified by anything in this file, and no attempt was made to
  extract one.
- **Theorems 6 to 9, the `y ≥ x` half of the paper**, were not opened. §6's
  strike is a statement about Theorem 10 alone; a reader who wants the fixed-`M`
  marginal as a theorem should look there before accepting it, though §6 already
  records that those theorems are for integers with logarithmic weights and
  still need `x → ∞`.

---

## 8. Draft LANDED regrade for `research/IMPORT-MAP.md` row 15

*For the primary agent to integrate or reject. Written in the map's row
format; the map holds the row, this file holds the record.*

| # | field | the importable theorem, and where its statement lives | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 15 | the distribution of the fractional parts of `x/n` and `x/p` | Saffari–Vaughan II, *Ann. Inst. Fourier* **27** (1977) 1–30, DOI 10.5802/aif.649, **Theorem 10 (p. 7)** and **(1.27)**; `c_α` defined in part I (1.9), DOI 10.5802/aif.634 **[SOURCED, both re-fetched and hashed 2026-08-28]** | the branch phase `⌊W/q⌋ mod M_T`, which cap-36 reduces to `⌊M·{W'/q}⌋`, `W' = W/M_T` | the Skeleton Equidistribution Conjecture; TODO item 4 | **EXACT-IDENTITY at the marginal face**, confirmed at the page: `x_SV = W/M_T`, `y = √W`, `α = j/M_T`. The joint face has no theorem in the source | **SPLIT, unchanged.** CLEAN where the theorem reaches, and measured to be worth `≤ 5.68%` of one branch there; the deep half stays UNRESOLVED, read at the lower rung as **suspected TPC-STRENGTH** | PUBLISHED-ANCHOR + WALL-ADDRESS; **no THEOREM**, the column struck because Theorem 10's lower range condition reads `M > W^{1/12}` and fails at every fixed `M` | 4 h, spent | **LANDED, no route; prediction HIT** |

**Landing paragraph.** The experiment ran on 2026-08-28 and its record is
`history/staging/import-fracparts.md`, producer
`history/staging/import-fracparts.js`. The prereg predicted that Theorem 10's
range condition `y ≤ x` reads `M_T ≤ √W` and therefore covers only branches
carrying no skeleton mass; the kill was any single covered branch above 10% of
`Σ_T Σ_q Snum_T`. Measured largest covered branch: 0.20%, 0.70%, 5.68%, 1.10%
at @13, @17, @19, @23, covered aggregate `+0.2% / −0.9% / −8.1% / −0.3%`. The
kill did not fire. Three corrections to the row as priced. The containment is
`{M_T ≤ √W} ⊆ {M_T ≤ lB}` strictly and not exactly, machine-checked on
1,133,872 pairs. The THEOREM column is struck rather than repriced: Theorem
10's range condition is `x^{6/11+ε} < y ≤ x`, which under the dictionary reads
`W^{1/12} < M ≤ √W`, so no fixed-`M` asymptotic follows and no line of cap-36
Measurement D is upgraded; the theorem also controls a marginal while the door
is joint, so no branch closes, and its `exp(−C(log x/log log x)^{1/3})` saving
certifies no finite level. TODO item 4's "restate" is not executed. And the
wall is sharper than a range-condition failure:
`M_T > lB` is exactly `q > W/M_T`, so on the open side the phase never wraps
and there is no fractional part left to equidistribute.

---

## What would falsify this, and whether that check has run

**The dictionary is falsified** if `c_α` is not the indicator of `{u} < α`, or
if `Θ*`'s normalisation is not `y^{−1}` over `p ≤ y`. RUN, at the page, both
papers re-fetched and hashed. Both hold.

**The identity is falsified** if `⌊W/q⌋ ≢ ⌊M·{W/(Mq)}⌋ (mod M)` at any
`(branch, prime)` pair. RUN in exact integer arithmetic on 1,133,872 pairs at
@13 through @29: zero exceptions (`import-fracparts.js` E3). It is also a
one-line proof, so the check is a control on the code and not on the claim.

**The coverage claim is falsified** if any branch with `M_T ≤ √W` carries more
than 10% of `Σ_T Σ_q Snum_T` in magnitude. RUN at @13, @17, @19, @23. NOT RUN
at @29 and above, where no branch ledger exists; a level whose covered mass
crosses 10% would reopen the row, and the corpus cannot currently see one.

**The strike on the THEOREM column is falsified** if the `6/11` reading is
itself a misreading, or if the fixed-`M` marginal is rescuable from elsewhere in
the paper. PARTIALLY RUN on the first: printed p. 7 was read at a 150 dpi
rendering of a PDF whose sha256 matches the one recorded above, and
cross-checked against the paper's own `c/(c+2)` derivation, which admits `6/11`
at Ingham's `c = 12/5` and admits no reading giving `1/11`. It has not been
checked against a second digitisation, and the Numdam scan is the only one in
circulation, so the strike rests on one image of one scan; that is the largest
single exposure in this note. NOT RUN on the second: Theorems 6 to 9 were not
opened.

**The surviving window statement is falsified** if `F(α, ξ)` does not tend to
`α`, or does so slower than `O(1/ξ)`. Derived from Theorem 1 and Corollary 1.3
in §3, NOT checked against (1.2) directly, whose OCR is unreadable. It is also
falsified as useful, though not as true, if someone shows the joint face reduces
to the marginal; no such reduction is known here and cap-36 Proposition C says
the opposite.

**The wall address is falsified** if the deep branches admit a fractional-part
formulation after all, that is if `M_T > lB` does not imply `⌊W/q⌋ < M_T`. RUN,
zero exceptions on the same 1,133,872 pairs; the equivalence is also a two-line
proof.

**The PUBLISHED-ANCHOR's novelty half is unfalsified and unchecked.** One web
query is the only thing that ran. Until a `SEARCH-CONVENTIONS.md` pass runs on
the owning convention, nothing here should be written up as novel.

---

## Defects noticed in passing

- `history/staging/import-map-rows-15-17.md` §6(b) derives the lower range
  condition from the exponent `1/11`, which is a misreading of printed p. 7; the
  page reads `6/11`, and the correct condition is two-sided,
  `W^{1/12} < M_T ≤ √W`. Which branches are covered survives the correction at
  every computed level; the row's THEOREM column does not.
- The same row's §3 says Theorem 10 "covers only branches Proposition E
  measured at or below `lB`", which reads as an equality in §1's payoff column
  ("THEOREM for the reachable branches"). It is a strict containment, and the
  reachable branches do not close, because `Ψ_M` is a joint function.
- `natal-cap-36-skeleton-door.js` P4 computes `sSh[dep]`, the closable-side
  mass by depth, and never prints it; only the open side's `sDp` is printed.
  Recovering the covered side's per-depth profile from the embedded artefact is
  therefore impossible, which is why this pass had to re-run the ledger rather
  than cite it.

---

*This document states current understanding at 2026-08-28. It edits no live
file. The regrade in §8 is a draft for whoever holds `research/IMPORT-MAP.md`.*
