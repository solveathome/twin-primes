# The Skeleton Equidistribution Conjecture — the door opened, measured, and found not to be the blocker

<!-- ledger
id: Q-skeleton-door
status: ANSWERED
todo: 4 (retired)
question: Is the Skeleton Equidistribution Conjecture the blocker on the anchored calm?
verdict: It is not the blocker as far as the door can be seen: Theorem A (Trapezoid Cancellation) is proven for all x, q and branches, @29 is certified as an exact integer inequality at G30_agg = 0.1176 with margin 0.3824 over 7,863 scour primes, and the decay-law shortcut is REFUTED, the six levels being flat within their own spread with every fit made strictly worse by adding @29.
-->

*(2026-08-15. Companion to `natal-cap-36-skeleton-door.js`, which verifies the
identity below against the definition on 340 (q, branch) pairs, reproduces
cap-30's certified BigInt levels and adds @29 under `--at29`, and checks the
whole branch
decomposition against the exact kernel to five digits at @13 and @17.
Notation as cap-26 / cap-30: level x, W = x#, N̄ = 2∏(p−2), δ = N̄/W; scour
prime q, k = ⌊W/q⌋, lA = ⌈W/q⌉ = k+1, lB = ⌊(W+1)/q⌋, L = lA+lB,
a = q·lA − W ∈ [1, q−1]; branch T ⊆ {30, 7..x} with 30 ∈ T, branch modulus
M_T = 30∏_{p∈T}p, branch kernel Φ_T = ∏_{M∈T}φ_M · ∏_{M∉T}m̄_M, skeleton
G30(q) = Σ_{30∈T} dev_T.)*

Status of these results and of the anchored calm as a whole:
[anchored-calm.md](anchored-calm.md).

Cap-30 collapsed the skeleton to one kernel, turned G30_agg < 1/2 into an exact
integer inequality, and named the remaining all-x blocker: the equidistribution
of ⌈W/q⌉ mod 30 over the scour primes. This file goes through that door, and it
supplies the sixth certified level first: the `--at29` pass
certifies G30_agg = 0.1176 at @29 as an exact integer inequality, margin 0.3824,
over 7,863 scour primes at W = 6,469,693,230, reproducing @23 as its control
(18.5 min). Cap-30's scan silently loses exactness at that size, where w·C
exceeds 2⁵³; the split-weight accumulator here fixes it. **So the aggregate
anticorrelation is a theorem at every x ≤ 29.** Then we report three things. The branch the door governs turns out to be
closed outright by an exact identity, with no equidistribution needed. The door
itself is measured open, at modulus 30 and at the next two branch moduli, with
square-root cancellation over the scour primes. And the door is not the
blocker: between 90.8% and 100.9% (over every scour prime; the 91% to 111% band this line carried until 2026-08-30 came from subsamples at @19 and @23, `history/staging/decide-0830-skeleton-door.md` SEC B) of the skeleton's mass sits in branches whose
modulus exceeds the window length, where the same question is posed at moduli
comparable to W rather than at a fixed modulus.

---

## Theorem A (Trapezoid Cancellation — proven, all x, all q, all branches)

Let M | W, let F : Z/M → R be **even** and **mean-zero**, and let q be coprime
to M. Put G(v) = F(qv mod M), ℓ = lA mod M, R = lB mod M, and

**Pa := Σ_{v<ℓ} G(v) − G(0)/2,  B := Σ_{j<R} (R−j)·G(ℓ+j).**

Then the branch numerator

**Snum(F) := L·(F(0) + 2Σ_{0<d<lA} G(d)) + 4Σ_{0≤e<lB} (lB−e)·G(lA+e)**

satisfies, exactly,

**Snum(F) = 2·Pa·(lA − lB + 2R) + 4·B.**

The window length L cancels identically, and Snum depends on F only through two
partial sums, taken at the two lengths ℓ = lA mod M and R = lB mod M.

*Proof.* Since M | W we have a = q·lA − W ≡ q·lA (mod M), so F(a+qe) =
G(lA+e) and the second sum is the one written. Four steps.

(1) Because G is even and mean-zero, pairing v with M−v gives
2Σ_{v=1}^{M−1} v·G(v) = M Σ_{v=1}^{M−1} G(v) = −M·G(0), so
Σ_{v mod M} v·G(v) = −(M/2)·G(0).

(2) Write A := Σ_{j=0}^{M−1} j·G(lA+j) and substitute v = lA + j, so that
j = (v − ℓ) mod M = v − ℓ + M·1_{v<ℓ} for v, ℓ ∈ [0, M). Then
A = Σ_v (v−ℓ)G(v) + M Σ_{v<ℓ} G(v) = −(M/2)G(0) + M Σ_{v<ℓ} G(v) by (1) and
mean-zero. Hence **A = M·Pa**.

(3) The flat sum. G has period M and mean zero, so full blocks drop and
Σ_{0<d<lA} G(d) = Σ_{0<d<ℓ} G(d) = Σ_{v<ℓ} G(v) − G(0). Therefore
F(0) + 2Σ_{0<d<lA} G(d) = 2Σ_{v<ℓ} G(v) − G(0) = 2·Pa by (2). (For ℓ = 0 both
sides read −G(0).)

(4) The triangular sum. Write lB = MQ + R and group e by its residue j mod M;
the count is n_j = Q + 1_{j<R}, and Σ_{e≡j, e<lB}(lB−e) = n_j(lB−j) −
M·n_j(n_j−1)/2 = (M/2)Q² + Q(R−j+M/2) + 1_{j<R}(R−j). Multiplying by G(lA+j)
and summing over j, every term free of j is killed by Σ_j G(lA+j) = 0, leaving
Σ_{e<lB}(lB−e)G(lA+e) = −Q·A + B.

Assembling, Snum = 2Pa·L − 4MQ·Pa + 4B, and MQ = lB − R gives
Snum = 2Pa(L − 2lB + 2R) + 4B = 2Pa(lA − lB + 2R) + 4B. ∎

**Verified** (P1) against the direct evaluation of the definition on 340
(q, branch) pairs at @11, @13, @17, @19, max relative error 4.8e−13 at @11
rising to 6.0e−6 at @19. The rise is the *direct* sum's own float cancellation:
its terms are of size L·max|F| while the answer is of size M·σ(F), so the
relative float noise is exactly of order L/M², which is what one sees.

## Corollary B (a bound uniform in q, with no window length in it)

With σ(F) = Σ_{u mod M} |F(u)| the one-period absolute mass, partial sums of a
mean-zero function are at most σ/2, so |Pa| ≤ σ, |B| ≤ Rσ, and since
lA − lB ∈ {0,1} and R < M,

**|Snum(F)| ≤ 8·M·σ(F),  uniformly in q and in L.**

Applied branch by branch, with dev_T = Snum(Φ_T)/(2(V_A+V_B)) and the CRT
factorization σ_T = s₃₀·∏_{p∈T}s_p·∏_{p∉T}m̄_p (s₃₀ = 216/900,
s_p = (8p−24)/p², the cap-26 constants), this gives

**|G30(q)| ≤ 28.8·∏_{7≤p≤x}[(8p−24)/p + ((p−2)/p)²] / (V_A+V_B).**

**The per-branch bound is Θ(1/Vg) with an L-free constant**, so the window
length is not the obstruction. The bound is nonetheless vacuous, for two other
reasons, both measured in P2. Its constant grows like
8^{π(x)}, because the sum over branches is dominated by the deepest one, where
M_T is W itself and where 8M_Tσ_T is worse than the trivial estimate. And the
denominator is itself shrinking: the aggregate calm ratio ΣV/Σ(Lδ) reads
0.2349, 0.1149, 0.0505, 0.0198, 0.0080 at @11 through @23, a clean loss of
0.29 per unit ln W. Numerically the new bound is worse than cap-26's Abel bound
at every level (aggregate 5.7e2 against 1.8e1 at @11, 5.6e4 against 1.6e3 at
@23), and like it certifies zero primes anywhere. Theorem A earns its keep as
an identity, not as a bound.

## Proposition C (the door, stated with no hand-waving)

By Theorem A the branch numerator Snum(Φ_T) is an explicit bounded function of
the pair of lengths (ℓ, R) = (lA mod M_T, lB mod M_T) together with q mod M_T,
and nothing else. Since lA = k+1 and lB = k for every q with a > 1, both
lengths are read off k = ⌊W/q⌋. So for each branch modulus M | W,

**Σ_q Snum_T(q) = Σ_q Ψ_M(q mod M, ⌊W/q⌋ mod M)**

for an explicit function Ψ_M bounded by 8Mσ_T, the sum running over the scour
primes. The all-x aggregate bound therefore needs exactly this, and this is the
statement the corpus calls the Skeleton Equidistribution Conjecture:

> **Skeleton Equidistribution Conjecture [OPEN].** For every branch modulus
> M | W, the pairs (q mod M, ⌊W/q⌋ mod M) equidistribute over
> (Z/M)^× × Z/M as q runs over the primes in (x, √W], with a saving over the
> trivial bound large enough, and uniform enough in M, to beat Σ_q (V_A+V_B).

It is open, its hypothesis measures true at every modulus we can reach
(Measurement D), and Proposition E shows that proving it at the fixed modulus 30
that cap-30 named would close almost none of the mass.

The hyperbola form is exact rather than approximate. Since M | W, writing
u = W/(Mq) gives ⌊W/q⌋ = ⌊Mu⌋ = M⌊u⌋ + ⌊M{u}⌋, hence

**⌊W/q⌋ ≡ ⌊M·{W/(Mq)}⌋ (mod M),**

so the door is precisely the equidistribution of the fractional parts
{W/(Mq)} over primes q, read at resolution 1/M, jointly with q mod M. At
M = 30 this is the statement cap-30 named. The elementary reduction through
q^{−1} mod 30 does not land: a ≡ q·lA (mod 30) makes q^{−1} a change of
variable inside the pair, and it converts nothing about ⌊W/q⌋ into a Dirichlet
statement about q alone.

There is a second exact face of the same statement, obtained by parametrizing
the primes by k rather than by q. For fixed k the condition ⌊W/q⌋ = k confines
q to the interval (W/(k+1), W/k], and the pair condition becomes a congruence
condition on q modulo M. So the door is equally the statement that primes are
equidistributed in arithmetic progressions modulo M across the ~√W intervals
(W/(k+1), W/k], summed over k. For q up to √W those intervals have length
W/k² ≤ 1 on average, so no pointwise short-interval theorem applies and the
statement is irreducibly an averaged one.

## Measurement D (the door is open, as far as we can see it)

Measured over all scour primes, χ² for the pair (q mod 30, ⌊W/q⌋ mod 30) on
its 240 admissible cells (df 239):

| level | K | χ² | M=30 | M=210 | M=2310 | M=30030 | K^{−1/2} |
|---|---|---|---|---|---|---|---|
| @17 | 120 | 280.0 | 1.16e−1 | 3.29e−2 | 3.89e−1 | 6.86e−1 | 9.1e−2 |
| @19 | 435 | 219.9 | 6.80e−2 | 3.28e−2 | 7.71e−2 | 3.42e−1 | 4.8e−2 |
| @23 | 1739 | 276.1 | 6.10e−2 | 1.08e−2 | 3.23e−2 | 1.63e−1 | 2.4e−2 |
| @29 | 7863 | 250.8 | 1.05e−2 | 4.42e−4 | 5.50e−3 | 7.98e−2 | 1.1e−2 |
| @31 | 37534 | 174.1 | 1.56e−2 | 9.04e−3 | 7.96e−3 | | 5.2e−3 |
| @37 | 198274 | 241.6 | 1.68e−2 | 3.09e−3 | 1.26e−3 | | 2.3e−3 |

The four kernel columns are the cancellation ratio |Σ_q Snum_T| / Σ_q |Snum_T|
for the branches of modulus 30, 210, 2310, 30030. A separate census (not in the
script, same method) finds the marginals (a mod 30), (⌈W/q⌉ mod 30) and the
joint pair also uniform at nine levels through @41, where there are 1,117,909
scour primes. That census is [MEASURED] at those nine finite levels, and
nothing in the corpus upgrades it to [PROVEN]. The fractional-parts import that
would have carried it, Saffari-Vaughan II Theorem 10, holds only on the growing
window W^{1/12} < M ≤ √W, so it has no instance at fixed M = 30; its saving
exp(−C(log W/log log W)^{1/3}) is ineffective and certifies no finite level;
and what it controls is one marginal, while the door is the joint pair
(import-map row 15, history/staging/import-fracparts.md §6).

**[MEASURED]** At M = 30 the door is open. The χ² values are consistent with
uniformity at every level, and the branch sums cancel at square-root strength.
At M = 210 and M = 2310 the cancellation is at or below K^{−1/2} from @19 on.
At M = 30030 the ratio is still 0.68 at @17 and only reaches 0.08 at @29, for
the structural reason of the next proposition: at those levels M exceeds the
window length for every scour prime, and Theorem A's cancellation does not
apply.

## Proposition E (where the skeleton's mass actually sits — the load-bearing measurement)

Theorem A is an identity for every M, but its consequence is informative only
when M ≲ L. When M_T > lB the identity degenerates: Q = 0, R = lB, and it
returns Snum = 2Pa·L + 4B, which is the original incomplete sum with its L
intact. Splitting the exact branch ledger on that threshold:

| level | primes | Σ_T Σ_q Snum_T | M_T ≤ lB | M_T > lB |
|---|---|---|---|---|
| @13 | 34 (all) | 29.021 | +2.67 (9.2%) | +26.35 (90.8%) |
| @17 | 120 (all) | 226.50 | −2.00 (−0.9%) | +228.5 (100.9%) |
| @19 | 40 (step 11) | 181.53 | −19.5 (−10.8%) | +201.1 (110.8%) |
| @23 | 29 (step 60) | 384.00 | +21.0 (5.5%) | +363.0 (94.5%) |

At @13 and @17 the total is checked against cap-30's exact BigInt kernel:
Σ_T Σ_q Snum_T = Σ_q NUMsk(q)/(15W) to all five printed digits. The open mass
is concentrated at one depth, the depth at which M_T first passes the window
length: at @17 depth |T|−1 = 3 carries 220 of 226; at @19 depths 3 and 4 carry
110 and 99; at @23 depth 4 carries 290 of 384.

**[MEASURED, decisive]** The branches for which the door is a fixed-modulus
question carry essentially none of the skeleton. Their aggregate is small and
of either sign, which is the same square-root cancellation the χ² table shows.
Everything that produces the +0.10 sits above the window threshold, where the
required equidistribution is at moduli up to W itself.

## The decay-law shortcut (refuted)

G30_agg = 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176 at @11 through @29.
The increments are −0.1019, −0.0102, +0.0248, −0.0313, +0.0231: the sequence is
non-monotone twice, going up at @19 and again at @29, and from @13 on it is flat
within its own spread (mean 0.1101, spread 0.0313). The best of three log-linear
fits, against ln ln W, gives exponent −0.483 with R² = 0.439 and residuals to
±0.27; against x, R² = 0.261; against ln K, R² = 0.331. Nothing here is a law.
The @11 point carries the whole apparent trend, and removing it leaves no trend
at all. Adding @29 makes every one of the three fits strictly worse, which is
what happens when a fit was tracking one outlier.

**[REFUTED]** The shortcut fails twice over. The data do not support a decay
law, and a fitted law would sit at PREDICTED, one rung below what closing an
all-x statement requires, so it could not have finished the job even if it had
fitted.
