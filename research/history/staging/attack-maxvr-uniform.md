# No level-uniform bound on max VR, and the all-x form needs a second ingredient the Status sentence does not name

<!-- ledger
id: Q-maxvr-uniform
status: CLOSED
todo: none
question: Is there a level-uniform bound on max VR, and what would an all-x form need?
verdict: No level-uniform bound: all three candidate bounds are killed by the numbers, and the all-x form needs a second ingredient the Status sentence does not name, an analytic lower bound on Sbar, the count of n with both n and n+2 free of prime factors in (x, sqrt(N)]; a max VR bound is in any case not TPC-strength, and no REFUTED.md row covers the route.
-->

*(2026-08-26. Producer [`research/attack-maxvr-uniform-01.js`](../../attack-maxvr-uniform-01.js),
embedded, 25.6 s run, `node research/qc/embed.js --check` passes on code, body
and output hashes. Every number below is in that file's OUTPUT block unless it
is explicitly attributed to another file. Under moratorium.)*

## 0. What was attacked and what did not happen

The brief was the named open item in `README.md` §Status: *"the X-limitation
Theorem (proven per level at @11, @13, @17 and @19; the all-x form is open for
want of a level-uniform bound on max VR)"*, boxed in
[`natal-cap-31-calm-vs-kill.md`](../../natal-cap-31-calm-vs-kill.md) as the
Loudness Ceiling Conjecture.

**The attack failed at its stated target. There is no level-uniform bound on
max VR here, and this file does not move the Loudness Ceiling Conjecture from
OPEN.** Everything produced is per level. The bound proved below, A(x), *grows*
with level: 4.212, 5.408, 6.989, 9.506, 11.648 at @11, @13, @17, @19, @23. Three
deterministic candidates for the one remaining input all fail at every computed
level, two of them by a margin that widens ×4.4 to ×7.0 per level.

Two things did move, and the second is worth more than the first.

1. The X-limitation theorem gains a **fifth level, @23**, and loses its
   dependence on enumerating the rotation ensemble. The route costs O(N̄·K)
   instead of O(W·strikes) and took 20.4 s where the sweep at @23 would cost
   223,092,870 rotations against 1,739 scour primes.
2. **The Status sentence understates what the all-x form is missing.** It names
   one ingredient. There are two. The second is a proven lower bound on S̄, and
   it sits at sieve ratio s = 2.0001 against the κ = 2 sifting limit
   β₂ = 4.26645 that this programme's own Face 4 treats as a wall. Detail in §4.

## 1. The definition, from the producers that enumerate it

Taken from `natal-cap-31-calm-vs-kill.js` and `natal-cap-38-loudness-driver.js`,
not paraphrased. Level x, tile W = 30·∏_{7≤p≤x} p, natal set
ρ = {r ∈ [0,W) : r ≡ 11 or 17 (mod 30), r ≢ 0, −2 (mod p) for 7 ≤ p ≤ x},
N̄ = |ρ|. Scour primes qs = {q prime : x < q, q² ≤ W}, K = |qs|, H = Σ_q 2/q.
Class counts n_q(a) = #{r ∈ ρ : r ≡ a (mod q)}. Then

- **class deviation** dev_q(a) = n_q(a) + n_q(a−2) − 2N̄/q,
- **per-prime rotation variance** V̄_q = (1/q)·Σ_{a mod q} dev_q(a)², V̄ = Σ_q V̄_q,
- **loudness** VR(t) = ( Σ_q dev_q(t mod q)² ) / V̄ for t ∈ [0,W),
- **max VR** = the maximum over all W rotations,
- **strike surplus** D(t) = Σ_q dev_q(t mod q), with S(t) = N̄(1−H) + X(t) − D(t).

Cauchy–Schwarz on D gives cap-31's L2, |D(t)| ≤ √(K·V̄·VR(t)), and the per-level
hypothesis carrying the theorem is exactly √(K·V̄·max VR) < S̄.

So max VR is the ensemble maximum of a **sum of K per-prime squared class
deviations, one class per prime, the classes locked together by t mod q**. It is
not a maximum of a ratio of two independently varying objects: V̄ is a constant
of the level, and the only thing varying with t is which class each prime is
read at.

Custody: the producer recomputes N̄, K, V̄, S̄ and max VR at all four enumerated
levels and matches cap-38's embedded banners to the digit, including
max VR = 2.777, 2.352, 2.143, 2.293.

## 2. The one-line theorem, and what it buys

**(T1) Alignment bound.** For every level x,

> max_t VR(t) ≤ A(x) := ( Σ_q max_a dev_q(a)² ) / V̄.

Proof: VR(t) reads one class per prime and each summand is at most that prime's
own maximum. One line, no hypothesis, no enumeration. The slack is exactly the
amount by which no single rotation can maximise every prime simultaneously.

**(T2) The V̄-free form, which is the useful one.** √(K·V̄·max VR) < S̄ squares to
K·max_t Σ_q dev_q(t mod q)² < S̄². V̄ cancels. So

> **K · Σ_q max_a dev_q(a)² < S̄²  ⟹  the X-limitation theorem at level x.**

This matters beyond bookkeeping: it removes V̄ from the all-x problem, and with
it any need for a *lower* bound on V̄. A bound stated on max VR needs both an
upper bound on the numerator and a lower bound on the denominator; (T2) needs
only the numerator.

**What the numbers say.** (T2) holds at all five computed levels.

| | @11 | @13 | @17 | @19 | @23 |
|---|---|---|---|---|---|
| K | 10 | 34 | 120 | 435 | 1739 |
| S̄ | 38.24 | 310.88 | 3614.93 | 49238.76 | 815732.55 |
| threshold S̄²/(K·V̄) | 9.71 | 23.77 | 95.16 | 623.11 | 4315.86 |
| enumerated max VR | 2.777 | 2.352 | 2.143 | 2.293 | not enumerated |
| **A(x)** | **4.212** | **5.408** | **6.989** | **9.506** | **11.648** |
| A / max VR | ×1.52 | ×2.30 | ×3.26 | ×4.15 | — |
| **(T2) margin S̄²/(K·Σ max dev²)** | **×2.3** | **×4.4** | **×13.6** | **×65.5** | **×370.5** |
| max\|D\| ≤ √(K·Σ max dev²) | 25.2 | 148.3 | 979.7 | 6081.8 | 42377.1 |
| that, as a share of S̄ | 65.9% | 47.7% | 27.1% | 12.4% | 5.2% |

**@23 is new.** max VR has never been enumerated there and cannot be. A(x) puts
it below 11.648 against a threshold of 4315.86, and (T2) closes the strike
channel at @23 with margin ×370.5: annihilation at @23 requires an overlap
collapse X̄ − X ≥ 773,355.4. The @11 row holds too, at ×2.3, though @11 is
already closed outright by cap-31 Theorem 1.

**What (T1) is not.** A(x) grows by factors 1.284, 1.292, 1.360, 1.225 per level,
and A/lnW reads 0.5439, 0.5245, 0.5317, 0.5909, 0.6059 — flat to slowly rising.
The alignment bound is a per-level instrument, not a uniform one, and its own
slack against the enumerated truth grows (×1.52 → ×4.15). It will keep getting
worse in absolute terms; it stays useful only because the threshold grows faster
(×2.449, ×4.003, ×6.548, ×6.926 per level against A's ×1.2 to ×1.4).

## 3. The three candidate uniform bounds, and the numbers that kill them

(T2) reduces the all-x problem to: bound max_a dev_q(a)² uniformly in q and x.
Three deterministic candidates were priced. All three fail at every computed
level. Reporting them in the order of how badly.

**(a) The trivial class bound — dead, and diverging.** From the mod-30 comb
alone, n_q(a) ≤ 2⌈W/(30q)⌉, hence |dev_q(a)| ≤ max((2/q)(2W/30 − N̄) + 4, 2N̄/q).
K·Σ T_q² exceeds S̄² by 5.940e+0, 2.598e+1, 1.765e+2, 1.148e+3, 8.064e+3, with the
overshoot growing ×4.375, ×6.794, ×6.500, ×7.027 per level. Per prime the loss
against the true maximum runs Σ T_q²/Σ max dev² = 1.369e+1 at @11 to 2.988e+6 at
@23. The reason is structural and worth stating: the true dev_q lives at the
square-root-or-below scale while any bound that does not see cancellation lives
at the class-size scale N̄/q. At @23, q = 37 has V̄_q = 703.576 and true
max|dev| = 47.14 against a trivial bound of 517,377.4.

**(b) The completed-sum Fourier certificate — dead, but not diverging.** n_q(a) is
a window count of a *dilate* of the natal comb (r = a + jq, j ∈ [0,L), L = ⌈W/q⌉),
and the dilation permutes the natal spectrum by k ↦ q^{-1}k, so a uniform-in-q
certificate needs a majorant invariant under that permutation. With
|Ŝ(k)| = 2|cos(πu₃₀/5)|·∏_p f_p(u_p), u_m = k·y_m mod m, y_m = (W/m)^{-1} mod m
(the CRT twist `paper/wall-note.md` §Door 2 records an earlier file for dropping),
f_p(0) = p−2 and f_p(u) = 2|cos(2πu/p)| otherwise, the majorant
B(k) = 2·∏_{7≤p≤x}(p | k ? p−2 : 2) dominates |Ŝ(k)| and is invariant under
k ↦ qk because u_p = 0 ⟺ p | k. That gives, for every scour q and every class a,

> |n_q(a) − N̄/q| ≤ 1 + (1/W)·Σ_{k≠0} B(k)·min(L, W/(4|k|_W)),

a genuine per-level theorem with no enumeration in it. It is correct — it
dominates the true max|dev| at 1739 of 1739 primes at @23 and at every prime at
every level — and it is **370× short at the deepest level**: K·Σ(2Cb_q)² exceeds
S̄² by 3.853e+2, 7.556e+2, 7.816e+2, 5.966e+2, 3.703e+2.

The one interesting thing about it is that the overshoot **turned at @17**:
×1.961, ×1.034, ×0.763, ×0.621 per level. The driver is Σ_k B(k)/k = 8.592e+1,
2.969e+2, 1.016e+3, 3.396e+3, 1.126e+4, whose shape is the 3^{π(x)−3} of Door 1's
Legendre budget (9, 27, 81, 243, 729), so the test's asymptotic form is
9^{π(x)−3} against W, which reads 8.100e+1 vs 2.310e+3 at @11 and 5.314e+5 vs
2.231e+8 at @23. That ratio does eventually go the right way, because π(x)/θ(x)
→ 0. **This must not be written as a route.** Five points with one turning point
is not a trend, and this corpus has had three short-run trends refuted by the
next point, max VR itself among them (cap-31's own correction block). Nothing
here licenses an extrapolation to a crossing level.

**(c) The moment bound — the only one that tracks the truth, and it is not a
bound.** max_a dev² ≤ (q·μ_{2m}(q))^{1/m} for every m, μ_{2m}(q) = (1/q)Σ_a
dev_q(a)^{2m}, minimised over m ≤ 8. Its loss against A(x) is only ×1.090,
×1.130, ×1.157, ×1.174, ×1.227, and it passes (T2) at every level. But it is a
*reformulation*, not a bound: it converts the problem into bounding the even
moments of dev_q over residue classes, and no such bound is proved here. What it
buys is a precise name for the object a level-uniform proof would have to
control.

**Two measurements that describe that object.** R_q = max_a dev_q(a)²/V̄_q has
mean 4.224, 5.669, 7.537, 10.103, 12.398 against mean 2 ln q = 6.643, 8.634,
11.107, 13.888, 16.984, so the ratio runs 0.636, 0.657, 0.679, 0.727, 0.730: the
per-prime maximum sits below the Gaussian √(2 ln q) heuristic at every level, and
the margin is shrinking. The fourth-moment ratio μ4/μ2² averages 2.329, 2.691,
2.770, 2.885, 2.884, under the Gaussian 3 at all five levels. The trivial ceiling
R_q ≤ q is never approached: the worst single prime reads R_q = 7.649, 11.552,
16.667, 27.122, 25.600 at q = 43, 151, 479, 2039, 5483. None of this is a bound.
It says the tail of dev_q over classes is sub-Gaussian in the measured range, and
that a level-uniform theorem would follow from a level-uniform sub-Gaussian
moment bound for that tail.

## 4. The second missing ingredient: the Status sentence names one and there are two

This is the part of the session worth keeping.

Every per-level proof, cap-31's and this file's alike, computes S̄ **exactly** and
puts it on the large side of the inequality. An all-x statement cannot do that.
It needs an analytic lower bound on S̄, and S̄ is the count of a set of size ≈ W
sifted by two residue classes for every prime up to y = √W. The producer prints
the sieve ratio ln W/ln y at each level: **2.0116, 2.0007, 2.0024, 2.0004,
2.0001**. The dimension is κ = 2. The κ = 2 sifting limit is β₂ = 4.26645, which
`paper/wall-note.md` §Face 4 already treats as the wall of this programme, and
s = 2 is well inside the region where the sieve axioms yield no positive lower
bound at all.

Two elementary dodges were priced and both fail.

- **Bonferroni truncation.** X(t) ≥ B₂(t) − B₃(t) holds pointwise, so
  S̄ ≥ N̄(1−H) + B̄₂ − B̄₃. The model value N̄(1−H+ē₂−ē₃) is +29.2 at @11 and then
  NEGATIVE at every level from @13: −10.0, −5401.7, −170536.0, −5123913.7 against
  the true S̄ = 310.9, 3614.9, 49238.8, 815732.6. H = 0.7891, 1.1468, 1.4938,
  1.7857, 2.0526 grows like 2·lnln, so the truncation depth needed grows with it.
- **The level constraint on a deeper truncation.** Going deeper needs subsets of
  scour primes whose product stays under the tile. 2³·C(K,3) already exceeds W
  from @13 on: 4.787e+4 vs 3.003e+4 at @13, up to 7.000e+9 vs 2.231e+8 at @23. The
  O(1)-per-subset remainder outruns the main term exactly where the longer
  truncation would be required. This is s = 2 again, in counting form.

**Calibration, explicitly.** This is an ARGUED obstruction, not a proof that no
lower bound on S̄ exists. Our set is explicit rather than an arbitrary
axiom-satisfying sequence, and the margin at @23 is ×370.5 in the squared form,
so a lower bound losing a constant factor would still do — the problem is that
the sieve at s < β₂ gives zero, not a small constant. The owning literature
convention has **not** been searched: per
[`SEARCH-CONVENTIONS.md`](../../SEARCH-CONVENTIONS.md) the right convention here
is integers free of prime factors from an interval (the two-variable analogue of
Φ(x,y,z) for n and n+2 simultaneously), not anything phrased in this corpus's
vocabulary. That search is the obvious next move and it was not run.

What is established is narrower and it stands: **the all-x X-limitation theorem
needs two ingredients, not one, and `README.md` §Status and
`research/GLOSSARY.md` name only the first.** Suggested repair, for whoever owns
those files: "the all-x form is open for want of a level-uniform bound on max VR
*and* an analytic lower bound on S̄, the latter at sieve ratio s = 2 against
β₂ = 4.26645."

## 5. Wrong-direction check: a max VR bound is not TPC-strength

The corpus has recorded four wrong-direction arrivals (`REFUTED.md` rows on the
anchored δ, on H″ in moment form, on the L = 1 residue count, and on the sharp
maximal law of the θ ladder), so this was checked before anything was claimed.

A bound on max VR is **not** TPC-strength, on three independent grounds. First,
this file proves per-level bounds on it with no arithmetic input and no
enumeration, so the object is not inaccessible. Second, VR is measurably
decorrelated from survival: cap-31 enumerates corr(VR,S) ≈ 0 at all three of its
swept levels. Third, and decisively, even max VR ≡ 0 would only close the strike
channel, and Face 2 measures the strike channel at 2.7% of Var(S) at @17, with
97% of the fluctuation in overlap credit.

The TPC-adjacent object in this neighbourhood is the S̄ lower bound of §4, not
max VR. That one deserves the wrong-direction scrutiny, and §4 gives it as far as
this session took it.

## 6. Collision check against `REFUTED.md`

All 65 rows were read first. No row covers this route. The nearest neighbours,
and why each is a different object:

- Row on **`u_sup` as an unconditional worst-position bound** (CLOSED): that is
  the θ-ladder / sifting-limit object in the `e` basis, not the natal-cap class
  deviation. Different quantity, different file, different convention.
- Rows on the **ℓ¹ → ℓ²√log conversion** and **generic chaining against the
  maximal-law union bound** (both CLOSED): those are maximal laws for Θ_e(a)'s
  arithmetic and for R_H. VR's maximum is over W rotations of a sum of K
  per-prime class deviations, and the bound used here is alignment, not chaining.
- **Door 2's dead aggregation** (`wall-note.md`, not a REFUTED row): the per-prime
  Fourier certificates fail as an ℓ¹ union bound on *gross strikes*, which
  exceeds the census from x = 13 up. The aggregation here is ℓ² and on
  *deviations only*; the mean HN̄ is carried by the X-channel identity, not by
  capacity. The §3(b) certificate is a fresh failure at a different aggregation,
  not a re-run of that one, and it fails by a different amount.

## 7. What is still open, and what would falsify what is claimed

- **Open, unchanged:** the Loudness Ceiling Conjecture. No level-uniform bound on
  max VR exists in this corpus after this file.
- **Open, and newly named:** a level-uniform sub-Gaussian moment bound for
  dev_q over residue classes mod q, uniform for q ≤ √W. §3(c) shows it would
  suffice via (T2); §3's measurements say it is true in the computed range.
- **Open, and newly surfaced:** an analytic lower bound on S̄ at s = 2, κ = 2.
  Not searched in the owning convention.
- **Falsifiable, and the check has run:** (T1) requires A(x) ≥ max VR at every
  enumerated level. It passes at all four. A FAIL there would have been a bug in
  this file, not a finding.
- **Falsifiable, and the check has not run:** (T2) at @29 and above. @29 needs
  N̄ ≈ 1.4e8 against K ≈ 7.9e3, about 1.1e12 class-count operations plus a 1.3e10
  sieve for S̄; that is compute-box work, not laptop work, and it is the single
  cheapest way to test whether the ×370.5 margin at @23 keeps widening.
- **What would falsify the §4 finding:** an unconditional lower bound on the
  count of n ≤ N with both n and n+2 free of prime factors in (x, √N]. If one
  exists in print, §4's "second ingredient" shrinks to a citation.
