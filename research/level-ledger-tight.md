# Tightening the Level Ledger

<!-- ledger
id: Q-level-ledger-tight
status: PARTIAL
todo: none
question: How much of the Level Ledger's 2*3^{pi(x)-1} class-discrepancy bound can be taken back?
verdict: The sup-versus-variance gap is not closed, and section 4 shows no L1 Fourier method can close it, since such a bound is already >> 2^{pi(x)} from its own j = 1 term; what replaces the exponent is an exact reduction to one finite quantity, computed by exhaustion to y = 19, and a proven CONSTANT factor 81.0 uniform in x, p and a (53.9 from the cheap y = 17 seed), which does not grow.
-->

**2026-08-17. Script: `research/level-ledger-tight.js`
(30.7 s, all asserts passed, full output pasted in the file).
R\*(19) from `--deep`, 2717.1 s, and folded in.**

`research/FOLD-PROFILE.md` §2 proves, for the twin-slot tile T_x of width
W = x# and census D, and for every prime p > x and every residue a mod p,

$$\bigl| h(a) - D/p \bigr| \;\le\; 2\cdot 3^{\pi(x)-1},
\qquad h(a) = \#\{\, r \in T_x : r \equiv a \ (\mathrm{mod}\ p)\,\}.$$

`research/discrepancy-two-class.md` §5 then showed the bound has the right base
and twice the right exponent. This note asks what can actually be taken back.

**Lead with what is hard.** The sup-versus-variance gap is not closed here, and
§4 shows it cannot be closed by any L¹ Fourier method at all: such a bound is
already ≫ 2^{π(x)} from its own j = 1 term, which sits strictly above √3^{π(x)}.
What replaces the exponent is an exact reduction of the Level Ledger to a single
finite quantity, that quantity computed by exhaustion up to y = 19, and a proven
**constant** factor of 81.0 uniform in x, p and a. The 81.0 needs the y = 19
exhaustion; the y = 17 seed, which costs seconds against the deep run's 2717 s,
gives 53.9. The factor does not grow.
There is a second, genuinely growing unconditional route (Erdős–Turán with the
exact Fourier coefficients, ×1.18 per fold), and it is never the best bound
available in the computable range. Saying otherwise would be the interesting
result, and it is not the one that came out.

---

## 1. Custody

Everything downstream is checked against the published numbers first, through
code written from scratch for this file.

| target | source | reproduced |
|---|---|---|
| max_a\|h−D/p\| = 1.36, 1.62, 3.35, 3.63, 6.13, 16.9 | FOLD-PROFILE §3 | to the digit (16.93) |
| K(0), min K, max K, sd(K), six rows | FOLD-PROFILE §3 | every cell |
| bound/mean = 5.56, 1.24, 0.266, 0.048 | FOLD-PROFILE §2 | 5.5636, 1.2436, 0.2657, 0.0479 |
| ΔΦ₂ max/min, 0.3000/−1.1000 .. 26.9038/−27.8325 | discrepancy-two-class §2 | every cell |
| looseness ratios 25.7, 36.0, 54.4, 124, 186, 256, 479 | discrepancy-two-class §5 | 25.7 .. 479.5 |

**"Right base, twice the exponent" VERIFIED.** The looseness ratio grows by
**1.6284** per fold on the interval object (6 folds, x = 5→23) and **1.8127** on
the arithmetic-progression object (5 folds, x = 7→23). √3 = 1.7321 sits between
them. The claim survives independent checking.

**The scope of the first custody row.** FOLD-PROFILE §3's sequence is quoted at
the *ladder* prime, the smallest admissible p at every level, and the quantity is
not uniform in p. Maximising over p instead:

| x | §3 value (ladder p) | max over p | at p | range of p searched |
|---|---|---|---|---|
| 11 | 1.62 | 2.87 | 47 | ≤ 5000 |
| 13 | 3.35 | 5.97 | 149 | ≤ 5000 |
| 17 | 3.63 | 12.03 | 37 | ≤ 2000 |

So the diagonal sequence moves p and x together and is not a statement about x
alone. The bound is uniform in p, the measurement it is compared against is not,
and no exponential base should be fitted to either. FOLD-PROFILE §3 carries the
three maxima; the primes attaining them and the ranges searched are recorded
here because it does not.

---

## 2. The reduction: the Level Ledger is a dilated-interval discrepancy

Write, for a set S mod W of density ρ,

$$G_S(u) = \#\bigl(S \cap [0,u)\bigr) - \rho u, \qquad
\operatorname{range}(S) = \max_u G_S - \min_u G_S ,$$

and define

$$R^*(x) \;=\; \max_{\alpha \in (\mathbb{Z}/W)^{\times}} \operatorname{range}(\alpha \cdot T_x).$$

**Theorem 1 (Dilation Reduction, PROVEN).** For every prime p > x and every a,

$$\bigl|h(a) - D/p\bigr| \;\le\; R^*(x) + D/W \;<\; R^*(x) + \tfrac12 .$$

*Proof.* r ≡ a (mod p) with r ∈ [0,W) means r = a + ps for 0 ≤ s < L = (W−a)/p,
and r ∈ T_x means s ∈ S := p^{-1}(T_x − a) mod W, which is an admissible dilate
of T_x. So h(a) = ρL + G_S(L) = D/p − ρa/p + G_S(L). The family of dilates is
closed under translation, and the supremum over translates of sup_u |G| is
exactly the range; ρa/p < ρ = D/W. ∎

Nothing is discarded but that D/W. **The arithmetic-progression discrepancy of
the tile *is* the worst dilated-interval discrepancy of the tile**, so the Level
Ledger and Holt's ΔΦ₂ channel are the same object seen twice, and any bound on
one transfers instantly to the other. That settles `discrepancy-two-class.md`
§9's loose end: the natal ledger deviation is a sup of a k = 2
discrepancy, and its base should be √3, not 2.

**Theorem 2 (Transfer, PROVEN).** For y ≤ x,
R\*(x) ≤ 3^{π(x)−π(y)} · R\*(y).

*Proof.* Expand the conditions only at the primes in (y, x]: the indicator
factorises into 3^{π(x)−π(y)} signed terms, one for each squarefree d | W₂ =
∏_{y<q≤x} q together with a choice of removed class mod each q | d. Over an
interval [A,B) the (d,c) term counts t in an interval of length (B−A)/d lying in
an affine image S₁ of the y-pattern, so it equals (N₁/W₁)(B−A)/d + G_{S₁}(B′) −
G_{S₁}(A′). The main terms sum to ρ(B−A) exactly, and each bracket is at most
range(S₁) ≤ R\*(y). ∎

R\*(2) = 1, so R\*(x) ≤ 3^{π(x)−1} at once: **the published bound carries a free
factor of 2** before any computation.

---

## 3. R\*(y) by exhaustion

A dilate of T_y removes {0, e_q} mod q with e_q ≠ 0 arbitrary and independent
across q, since α ↦ (−2α mod q)_q is onto by CRT. So the family is finite with
∏_{3≤q≤y}(q−1) members and R\*(y) is a finite maximum. Computed exactly:

| y | π(y) | dilation classes | R\*(y) | step | gain 2·3^{π−1}/R\* |
|---|---|---|---|---|---|
| 2 | 1 | 1 | 1.000000 | – | 2.00 |
| 3 | 2 | 2 | 1.000000 | 1.0000 | 6.00 |
| 5 | 3 | 8 | 1.800000 | 1.8000 | 10.00 |
| 7 | 4 | 48 | 3.000000 | 1.6667 | 18.00 |
| 11 | 5 | 480 | 6.584416 | 2.1948 | 24.60 |
| 13 | 6 | 5,760 | 14.384615 | 2.1846 | 33.79 |
| 17 | 7 | 92,160 | 27.019392 | 1.8784 | 53.96 |
| 19 | 8 | 1,658,880 | **53.972817** | 1.9976 | **81.04** |

The y = 19 row is the `--deep` exhaustion: 1,658,880 dilation classes, 2717.1 s,
worst class = 13-tile #746 with e₁₇ = 2, e₁₉ = 17. It is recorded as a constant
in the script so the 30-second run can use it, and `--deep` recomputes and
asserts it. It does **not** move anything in §6: pushing the Legendre death point
from y = 61 to y = 67 would need R\*(19) < 28.0, and it is twice that. The next
level, y = 23, needs 36,495,360 classes on a 2.2 × 10^8 tile and is out of reach.

**Corollary (UNCONDITIONAL).** For every x ≥ 19, every prime p > x, every a,

$$\bigl|h(a) - D/p\bigr| \;\le\; 53.972817 \cdot 3^{\pi(x)-8} + \tfrac12 ,$$

which beats 2·3^{π(x)−1} by **at least 80.98** uniformly in x, p and a (80.98 at
x = 19, rising to 81.04 once the +½ is negligible). The y = 17 seed alone gives
53.9 with no overnight run. The same constants apply to the interval channel
with the +½ dropped.

**The parametrisation is checked independently.** Dilating T₁₇ by 4000 random
α ∈ (Z/510510)^× and taking the range directly, never touching the e-tuples,
reaches **27.019392 exactly** (at α = 473,611) and never exceeds it. The
enumerated maximum is attained by a genuine dilation.

**Checked, not assumed.** The nine-term expansion at (x, y, p) = (13, 7, 17) was
run term by term: it reproduces h(a) for every a, no single term exceeds
R\*(7) + D₁/W₁ = 3.0714 (worst 1.5294), and the assembled bound 27.64 brackets
the truth 3.3529 against the ledger's 486. Theorem 1 was then stress-tested
against the actual maximum over **every** p ≤ 5000 at x = 11, 13 and every
p ≤ 2000 at x = 17: 2.8723 ≤ 6.6429, 5.9664 ≤ 14.4341, 12.0270 ≤ 27.0630.

**The target shape, and the deep run breaking it.** Up to y = 17 the fit looked
exact: R\*(y) grew by **1.73226** per fold in geometric mean from y = 2, against
√3 = 1.73205, with R\*(17) = 27.0194 against 3^{(π(17)−1)/2} = 27. The caveat
attached at the time was that this is a two-endpoint statement, and the caveat
was right. **R\*(19) = 53.9728 breaks it**: the step is 1.9976, essentially 2, the
seven-fold geometric mean rises to **1.76788**, and 3^{(π(19)−1)/2} = 46.77 is
15% low. So R\* runs *above* the √3 shape.

That is expected and is not evidence against √3 for the twin pattern itself.
R\* is a maximum over ∏(q−1) patterns, a count that grows with y, so it carries
a √(2 ln #patterns) extreme-value factor that √3^{π(y)} does not. The individual
steps run 1.000, 1.800, 1.667, 2.195, 2.185, 1.878, 1.998: no law, and the
"exact" hit at y = 17 was a coincidence.

---

## 4. Why the exponent does not move

The gain is 2·3^{π(y)−1}/R\*(y). It grows by about ×1.4 for each extra level of
y that can be enumerated, and y is capped by compute: y = 17 costs 92,160
patterns and 11 s, y = 19 costs 1,658,880 patterns and about 50 minutes, y = 23
costs 36,495,360 patterns on a 2.2 × 10^8 tile and is out of reach. **A growing gain needs R\*(y) for unbounded y, which is the
√3 statement itself.** The transfer is lossless in base and costs exactly ×3 per
fold above the seed, so seeding low and transferring high cannot recover the
exponent: the gap is not a small-level artefact.

Four routes to the exponent were tried. One gives a growing gain and is still
never the best bound available; the other three do not survive.

**(a) Second moment plus extreme value.**
Parseval on the p-point group gives Σ_a (h(a)−D/p)² = (1/p)Σ_{t≠0}|F(t)|², and
sup ≤ √(Σ_a (h−D/p)²), so a second-moment bound *would* give a sup bound with no
extreme-value step at all. The second moment has an exact identity:

$$\sum_a h(a)^2 \;=\; D + 2\sum_{m\ge 1} N(mp), \qquad
N(h) = \#\{r : r,\ r+h \in T_x,\ r+h < W\},$$

because p | r − r′ is a condition on *integers*, not on residues mod W. Verified
exactly at (11,13), (11,29), (13,17), (13,41). But that turns the problem into
Hardy–Littlewood pair correlation: Σ_m N(mp) must be known to absolute precision
3^{π(x)/2}, i.e. the singular series must equidistribute over h ≡ 0 (mod p) to
that precision. That is the same wall, not an easier one. The measured p·Var is
4.1e−2, 3.3e−1, 4.9e−2, 1.0e−1 of the binomial D(1−1/p) at those four cells and
**2.52e−4 at (23, 29)**, a fifth cell the script now prints (added 2026-08-20;
the ratio there is one O(D) residue histogram, while the identity check at
W = 223,092,870 would cost ~6e13 operations and is not run — the four small
cells are what certify the identity). So every general inequality that stops at the binomial line
is vacuous against this object, the large sieve included: it gives
Σ_{a≠0}|F(a)|² ≤ (p²+W)D and hence nothing below binomial.

**(b) A better per-fold recursion.** The one-step identity for a new prime q is
Δ_{new}(u) = Δ_S(u) − Δ_{S₀}(u/q) − Δ_{S_e}((u−e)/q), and S_e is a *translate*
of S₀ by q^{-1}e mod W, which is essentially arbitrary. Rewriting the third term
through that translate gives four evaluations instead of three, so the direct ×3
is the better of the two. Beating ×3 needs the three arguments not to be extreme
together, which is an equidistribution statement of exactly the kind being
sought.

**(c) Erdős–Turán with the exact Fourier coefficients, and the L¹ ceiling.**
This is the one route that *does* give a growing unconditional gain, and it
still cannot reach √3. The coefficients of a 2-class pattern factorise exactly:
with removed classes {0, e_q} mod q,

$$S(j) = \prod_q S_q(j), \qquad
S_q(j) = q-2 \ \text{if } q \mid j, \quad -1 - e(j e_q/q) \ \text{otherwise},$$

so |S_q(j)| = 2|cos(π j e_q/q)| off the divisors. Since
|Σ_{n<u} e(jn/W)| ≤ W/(2 min(j, W−j)), every interval obeys

$$|\Delta| \;\le\; \tfrac12 \sum_{j \ne 0} \frac{|S(j)|}{\min(j, W-j)} \;=:\; ET(x),$$

unconditionally and computably:

| x | ET(x) | 2·3^{π−1} | gain | step | true sup | R\*(x) |
|---|---|---|---|---|---|---|
| 11 | 27.08 | 162 | 5.98 | – | 2.98 | 6.58 |
| 13 | 69.42 | 486 | 7.00 | 2.563 | 3.92 | 14.38 |
| 17 | 177.75 | 1458 | 8.20 | 2.561 | 7.84 | 27.02 |
| 19 | 442.58 | 4374 | 9.88 | 2.490 | 17.08 | 53.97 |

**Three exponents, not two.** The per-prime scale of ET is the *average* of
|S_q| over a full period, and that average has an exact limit:

$$f_q = \frac{1}{q}\Bigl[(q-2) + \sum_{v \ne 0} 2\bigl|\cos(2\pi v/q)\bigr|\Bigr]
\;\longrightarrow\; 1 + \frac{4}{\pi} = 2.27324 ,$$

running 1.00000, 1.49443, 1.71256, 1.91394, 1.96865, 2.03976, … at
q = 3, 5, 7, 11, 13, 17. So

| | value | what it is |
|---|---|---|
| 3 | 3.00000 | 2 (per-prime **max** of \|S_q\|) × 1.5 (the divisor sum): the Legendre term count |
| 1 + 4/π | 2.27324 | per-prime **average** of \|S_q\|: the scale of the bulk of ET |
| √3 | 1.73205 | the L² truth |

**And a hard floor under the whole L¹ family.** The single term j = 1 already
contributes |S(1)|/2, where |S(1)| = ∏_q 2|cos(2π/q)| = ∏_q |cos(2π/q)| ·
2^{π(x)−1} over the π(x)−1 odd primes, and that product converges because
Σ 1/q² does. Measured, |S(1)| = 1.297, 2.296, 4.282 at x = 11, 13, 17,
i.e. 0.0405, 0.0359, 0.0335 times 2^{π(x)} and settling.

So **ET(x) ≫ 2^{π(x)}:
no L¹ Fourier bound of this shape can reach √3^{π(x)}, because it is beaten by
its own first term.** The extreme-value step is therefore not an artefact of how
this repo has argued so far; it is unavoidable for the entire L¹ family, and √3
lives strictly below that family's floor.

*(CORRECTED 2026-08-18, two slips in one sentence, neither touching the
conclusion. The sentence used to read "contributes |S(1)|/2 = ∏_q |cos(2π/q)| ·
2^{π(x)−1}", which is out by a factor 2: that product is |S(1)| itself, not half
of it. Checked at x = 11, where ∏_{q=3,5,7,11} 2|cos(2π/q)| = 1.29666 against
the printed |S(1)| = 1.297. And the third ratio read 0.0334 where the script's
own table row prints 0.0335; 4.28203/128 = 0.033453. Both slips originate in
`level-ledger-tight.js`'s READING text at :405-408, which is **printed** text
sitting above a pasted OUTPUT block, and that block is a merge of a 30.7 s run
with the R\*(19) row from a 2,717 s `--deep` run. Editing the printed string
would require re-pasting, and a plain re-run would drop the deep row, so the
script carries a dated correction comment instead and its printed line is left
as the custody record of what it printed. The j = 1 term is ≍ 2^{π(x)} on either
reading, so ET(x) ≫ 2^{π(x)} is unaffected.)*

ET's measured gain grows by about 1.18 per fold, but it stays *above* the
transfer bound throughout the computable range and crosses it only near x = 41,
where W = 41# = 3 × 10^17. So it is a growing gain that is never the best
available one.

**(d) Brun-style truncation.** Truncating the Möbius expansion at ω(d) ≤ 2m
replaces 3^{π(x)} by Σ_{j≤2m} C(π,j)2^j, but at the price of a *relative*
distortion of the main term. Here the target error is absolute and vastly
smaller than D/p times any relative error, so the truncation is useless. Noted
so it is not tried again.

---

## 5. The controls (run before any agreement was claimed)

`research/discrepancy-two-class.md` §4 records this repo mistaking an algebraic
identity for an agreement between measurements (`research/history/SESSION-2026-08-17.md`
§4). Both controls below were run through the identical pipeline first.

**Random 2-class patterns.** Same primes, same number of removed classes, random
classes instead of {0, −2}. Looseness growth per fold over the seven folds
x = 3 → 23:

| | draw 1 | draw 2 | draw 3 | the twin tile |
|---|---|---|---|---|
| geometric mean step | 1.7146 | 1.6928 | 1.6956 | **1.6935** |

The twin tile sits inside the control spread. **The √3 law belongs to k = 2, not
to the twin arithmetic**, which is `discrepancy-two-class.md` §6's finding
reproduced on a different statistic.

**Bernoulli at the same density.** Half-range 34.5 and 61.5 at x = 13, 17
against the true 3.92 and 7.84; AP sup 18.4 and 107.1 against 3.35 and 3.63.
The pipeline reports Poisson-scale fluctuation when it is there.

**The fourth handle, and what it is worth.** The extreme-value constant
c = sup / (sd · √(2 ln n_eff)) on this AP object, p ≤ 200:

| | mean c | spread |
|---|---|---|
| twin, x = 17 | 0.8261 | 0.649 .. 1.150 |
| twin, x = 19 | 0.8545 | 0.649 .. 1.201 |
| random 2-class controls (6 draws) | 0.873 .. 0.918 | 0.628 .. 1.320 |

against 0.830 (one class) and 0.687 (two class) in `discrepancy-two-class.md` §5
and 0.97 in `natal-cap-25`. **Four objects, one constant near 0.8, no trend.**
Labelled honestly: this is a shared *shape* with a shared constant across
objects that are not the same quantity, and the twin set is inside the control
spread on it, so it is evidence about the class of k = 2 patterns and not about
the twin problem. It is not the identity of §4 of the two-class note.

**The third handle, quantified.** `natal-cap-29-sigma-plateau.js`'s spectral
level factor R₂(p) → 3 governs a variance, so the sd of this AP object should
step by √R₂(p) per fold. Measured:

| fold p | 13 | 17 | 19 | 23 | 29 |
|---|---|---|---|---|---|
| sd step measured | 0.8101 | 3.1976 | 1.0036 | 1.7040 | 2.3896 |
| √R₂(p) | 1.5967 | 1.6290 | 1.6400 | 1.6561 | 1.6719 |

The individual steps swing wildly because p moves with x on this ladder, so only
the geometric mean carries information: **1.6031 measured against 1.6385
predicted, 2.2% low**, with limit √3 = 1.7321. So the three handles agree in the
only sense available: R₂ → 3 is the variance growth, √R₂ → √3 the sd growth, and
√3 is what the sup ladders and R\* both show. That is one law read in two norms,
already labelled as such in `discrepancy-two-class.md` §5; this file adds a
fourth measurement of the same constant and a check of the sd step itself.

---

## 6. What the tightening buys

**FOLD-PROFILE §2's table, rebuilt.** The new K-level bound is
2·(R\*(x) + D/W) up to x = 19 and 2·(3^{π(x)−8}·R\*(19) + D/W) above it:

| tile | fold p | mean 2D/p | true max\|K−mean\| | old 4·3^{π−1} | old/mean | new bound | new/mean | gain |
|---|---|---|---|---|---|---|---|---|
| T₇ | 11 | 2.73 | 1.73 | 1.08e2 | 39.60 | 6.14 | 2.25 | 17.58 |
| T₁₁ | 13 | 20.77 | 2.23 | 3.24e2 | 15.60 | 13.29 | **0.640** | 24.39 |
| T₁₃ | 17 | 174.71 | 5.71 | 9.72e2 | 5.56 | 28.87 | 0.165 | 33.67 |
| T₁₇ | 19 | 2,344.74 | 6.26 | 2.92e3 | 1.24 | 54.13 | 0.023 | 53.87 |
| T₁₉ | 23 | 32,928.26 | 6.74 | 8.75e3 | 0.266 | 108.02 | 0.0033 | 80.98 |
| T₂₃ | 29 | 548,425.86 | 23.86 | 2.62e4 | 0.048 | 323.91 | **0.00059** | 81.02 |

The relative error crosses below the mean at **x = 11 instead of x = 19**, and
reads 5.9e−4 of it at T₂₃ instead of 0.048.

**FOLD-PROFILE §9b tier 1, the Legendre route in the 23# window.** Sift
[0, 23#) by every prime up to y and ask how far the majorant stays below the
main term, so that the count is certified positive:

| majorant | last usable y | u = ln W / ln y | survivors |
|---|---|---|---|
| ledger 2·3^{π(y)−1} (§9b: "dies at 47") | 43 | 5.111 | 5,942,314 |
| **PROVEN here**, 3^{π(y)−8}·R\*(19) | **61** | 4.676 | 5,115,886 |
| CONDITIONAL √3 shape, 3^{(π(y)−1)/2} | 107 | 4.114 | 4,028,025 |
| the true sup (MEASURED, not a bound) | 397 | 3.212 | 2,568,665 |

DHR's two-dimensional lower bound reaches u = 4.26645, i.e. y = 91 in this
window. **So the proven tightening moves the Legendre route from y = 43 to
y = 61 and does not reach DHR.** But the conditional √3 bound reaches y = 107,
u = 4.114, which is *inside* the band DHR cannot reach: a proven √3 Level Ledger
would put an elementary Legendre certificate below the two-dimensional sieve's
lower-bound wall in this window. That is the one place in the repo where this
tightening would buy something not already available, and it needs the exponent,
not the constant.

**TODO item 8(c): REFUTED as unblocked.** `natal-cap-25`'s lemma
|C(s) − N·ℓ/W| ≤ 2·3^k has k = π(x) − 3, so the transfer has only the mids to
absorb and the proven gain is small:

| y | mids absorbed | R\*_natal(y) | patterns | gain vs 2·3^k |
|---|---|---|---|---|
| 5 | 0 | 1.600000 | 4 | 1.25 |
| 7 | 1 | 3.142857 | 24 | 1.91 |
| 11 | 2 | 5.818182 | 240 | 3.09 |
| 13 | 3 | 13.406593 | 2,880 | 4.03 |
| 17 | 4 | 26.682612 | 46,080 | **6.07** |

against the ~30× of measured slack that item 8(c) asks for. Reaching 30× needs
R\*_natal(29), which is 4·∏_{7≤q≤29}(q−1) = 5.1 × 10^8 patterns on a 6.5 × 10^9
tile. **Item
8(c) is not closed by this file**, and the reason is structural rather than
computational: cap-25's exponent already excludes 2, 3 and 5, so its bound was
the tighter of the two to begin with.

One lead not pursued: for the *window* channel the per-term error is
|G(B) − G(A)| with B − A = ℓ/d, and for the many terms with large d that is far
below the range. An ℓ-dependent refinement of the natal lemma is available
there, at the cost of the ℓ-independence the lemma is prized for.

---

## 7. Honest residuals

- The best deliverable is a **constant** 81.0, where a growing factor was
  wanted; the only growing one on offer (route (c), ×1.18 per fold) is worse
  than the constant one everywhere it can be computed.
- R\*(y) is a maximum over the whole dilation family, and the twin tile's own
  discrepancy is 3 to 4 times smaller than it. Some of the remaining slack is
  the price of a bound that must hold for every p, since p^{-1} runs over the
  dilations as p runs over the primes. How much is not separated here.
- The √3 reading on R\* did not survive its own next data point: the y = 2 → 19
  geometric mean is 1.768, above √3. Whether that gap is the extreme-value
  factor over ∏(q−1) patterns or something else is not separated here, and
  y = 23 would need 36,495,360 classes.
- 1 + 4/π is the full-period average of |S_q| and is exact; what is *not* proven
  is that ET(x) achieves it, since the 1/j weight makes small j dominate and
  small j are not average. ET's measured per-fold step is 2.49 to 2.56, between
  the j = 1 floor of 2 and the term count 3.
- Nothing here proves sup/sd stays bounded, so nothing here proves
  sup = (√3)^{π(x)+o(1)}. The only proven statements about the sup remain the
  ceilings ×2 and ×3 of `discrepancy-two-class.md` §3, now with an explicit
  finite seed attached and an L¹ floor of 2^{π(x)} beneath them.

---

## Reproduction

```
node --max-old-space-size=6144 research/level-ledger-tight.js           # 30.7 s
node --max-old-space-size=6144 research/level-ledger-tight.js --deep    # recomputes R*(19), 2717 s
```

Full output and the numbered readings are pasted into the script.
