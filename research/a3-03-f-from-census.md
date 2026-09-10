# A3: f from the grain census law

<!-- ledger
id: Q-f-census
status: PARTIAL
todo: none
question: What does the grain census law give for f, the qualifying-gap fraction, and where does it structurally stop?
verdict: DEFECT-carrying: the producer's one-word residue mask aliases for primes above 32, so every census point from x = 37 up is wrong by 0.62x to 1.05x and every fit on them is defective; Lemma A (d_min = 2p -/+ 2 exactly) and Lemma B (the fold-covariance shortcut is unavailable exactly where f lives) stand, and the corrected law over 51 window levels is ln(1/f) = 1.917 + 1.4016(+/-0.0235)(2p/mbar) - 1.021 ln s(d_min), R^2 0.9867.
-->

*(2026-08-16. Companion prose for `research/a3-03-f-from-census.js`. Two short
lemmas that the code checks by brute force, and the exact statement of where the
census law does and does not reach. Everything numeric lives in the code's
pasted OUTPUT and READINGS; this file carries only what needs proving.)*

> **DEFECT, 2026-08-19 (`history/staging/fdecay-deep.md`), the same defect
> `research/a3-03-f-from-census.js` carries in its own READINGS header.** The
> producer's `bitsOf` evaluator holds each prime's avoided set in ONE 32-bit word,
> and JavaScript's `<<` takes shift counts mod 32, so for q > 32 residues alias
> and every `(q − |A_q|)` factor is under-read. T_x carries a prime above 32 iff
> x ≥ 37, so **every census point from x = 37 up is wrong by a factor 0.62× to
> 1.05×**, and everything in THIS file fitted to those points is defective with
> them: the regression `ln(1/f) = 1.529 + 1.482·(2p/m̄) − 1.025·ln s(d_min)`,
> R² = 0.964; the factor 170; and the x = 181 / x = 199 comb illustration
> (d_min = 384 with s = 1 and f = 5.7e−5 against d_min = 420 with s = 6.10 and
> f = 2.7e−4). **Corrected law**, over 51 window levels rather than 42 census
> points: `ln(1/f) = 1.917 + 1.4016(±0.0235)·(2p/m̄) − 1.021·ln s(d_min)`,
> R² 0.9867. **The corrected factor from x = 11 to x = 199 is LARGER than 170**,
> so the polylog branch call below is strengthened, not weakened. The alias-free
> recomputation of all 42 levels is embedded in
> `research/fdecay-deep-01-census-defect.js` (`countRatioFixed`, a drop-in with
> identical leaf counts, two independent methods agreeing to 1.74σ); regenerating
> the producer's OUTPUT with the multi-word mask is queued. **UNAFFECTED:**
> Lemma A, the direct-sieve verification at x ≤ 23, the five diagonal points,
> Lemma B, the comb coefficient (−1.021 corrected against −1.025), everything at
> x ≤ 31, and the polylog branch call itself. Do not quote an x ≥ 37 number from
> below without the correction.

## What f is

Fold the tile T_x by the next prime p. U-FRAME §5a step 6: two adjacent twin
slots at distance g can both be deleted by that fold only if g ≡ 0 or ±2
(mod p). We write f(x, p) for the fraction of the grain's gaps that meet the
condition, and L for the longest run of adjacent kills, with the independence
heuristic L ≈ ln D / ln(1/f). The whole Zone Postulate route through the copy
theorem turns on whether f stays constant or decays.

With count_x(d) the grain census of T_x and D_x = prod_{3<=q<=x} (q−2) the
number of gaps, f is a linear functional of the census:

    f(x, p) = ( sum over qualifying d of count_x(d) ) / D_x .

`research/grain-census.js` proved an exact finite identity for count_x(d), so
the question is whether that identity can be evaluated at the d that qualify.

Custody note before anything else. The law reproduces all five published
diagonal values at machine precision, and it independently agrees with A2's two
streamed points, T29@31 f = 3.737e-2 and T31@37 f = 1.844e-2, which A2 obtained
by building the tiles. Two methods sharing no code and no arithmetic agree to
four figures at levels nobody had computed before.

## Lemma A: the qualifying set, and d_min = 2p ∓ 2 exactly

Every twin slot is ≡ 5 (mod 6), so every grain gap is a multiple of 6. Write
d = 6k. Then d ≡ 0, ±2 (mod p) is equivalent to 6k ≡ 0, ±2 (mod p), and since
gcd(2, p) = 1 that is 3k ≡ 0, ±1 (mod p), that is

    k ≡ 0, ±3^{-1}  (mod p).

Put k0 = min(3^{-1} mod p, p − 3^{-1} mod p). If p ≡ 1 (mod 3) then
3^{-1} = (2p+1)/3 and k0 = (p−1)/3; if p ≡ 2 (mod 3) then 3^{-1} = (p+1)/3 and
k0 = (p+1)/3. Hence the smallest qualifying gap is

    d_min = 6·k0 = 2p − 2  when p ≡ 1 (mod 3),
    d_min = 6·k0 = 2p + 2  when p ≡ 2 (mod 3),

and the full ascending list is 2p∓2, 4p±2, 6p, 8p∓2, 10p±2, 12p, and so on:
a comb of spacing 2p, truncated at G₂(T_x). So the smallest qualifying value is
exactly 2p ∓ 2 rather than about 2p, with the sign read straight off p mod 3.
The code verifies the closed form against a direct scan of every multiple of 6
up to 12p, for all 302 primes from 5 to 1999, with no exceptions.

Two consequences worth naming. First, f is a tail functional by construction,
not by accident: it never sees a gap smaller than 2p − 2, so it is always
sampling the far end of a distribution whose mean is
m̄ ~ (e^{2γ}/2C₂)·ln²x = 2.4026·ln²x, a Mertens limit that exact W/D shows has
already arrived by x = 2003. Second, f is
dominated by its first term, because count_x(d) falls off fast in d. Measured
across the levels where every term is affordable, the first term carries between
93.5% and 99.8% of f, so a one term evaluation understates f by a bounded
constant factor and nothing more.

## Lemma B: the fold-covariance shortcut is unavailable exactly where f lives

The cheap half of the census law is its fold covariance (grain-census.js
reading 3). Group the signed inclusion-exclusion terms by m, the number of
forced slots, into integer strata S_m(d). A prime q multiplies every m stratum
by exactly (q − 2m), provided that no offset difference 6j ≤ d is ≡ 0 or ±2
(mod q), since only then do all 2m avoided classes stay distinct. Call such a q
safe for d. The header of grain-census.js states the range as q ≥ 29 for
d ≤ 54, with the first failure 60 ≡ 2 (mod 29).

That condition can be made exact by the same computation as Lemma A. The
smallest multiple of 6 that is ≡ 0 (mod q) is 6q, and by Lemma A applied to q
the smallest multiple of 6 that is ≡ ±2 (mod q) is 2q ∓ 2. So

    q is safe for d  iff  2q − 2 > d   (which already implies 6q > d for q ≥ 5).

Now put the two lemmas together. On the diagonal we need d = d_min = 2p ∓ 2, so

    q is safe for d_min  iff  2q − 2 > 2p ∓ 2  iff  q > p.

Every prime of the tile satisfies q ≤ x < p. **So on the diagonal the number of
safe primes inside the tile is zero, at every fold.** The code confirms it by
counting, over every diagonal fold p ≤ 200: the total is 0.

This is not a near miss to be fixed by working a little harder. It is the same
arithmetic twice. The reason d_min sits at 2p ∓ 2 is that 2p ∓ 2 is the first
multiple of 6 congruent to ±2 mod p, and the reason p is unsafe for d_min is
that 2p ∓ 2 is the first multiple of 6 congruent to ±2 mod p. The qualifying
condition and the unsafety condition are one condition. **The census law's
closed-form half never reaches the tail that f is made of.**

## What is left, and how far it goes

What survives is the raw half of the law, the pruned inclusion-exclusion over
the intermediate grid, which is exact for every d with no small-d restriction at
all. It is what the code evaluates, in ratio form, so that f drops out directly
with no tile in memory, no enumeration and no big integers. The cost is the
number of surviving signed terms, which we measure at about 1.33^{d/6}. With
d_min/6 = k0 ≈ p/3 that is exponential in p, and it puts the practical ceiling
at p ≈ 210, that is x ≈ 200.

So the honest position on the reach question is a split verdict. The law does
reach the tail we need, exactly, and it takes the diagonal from five measured
points to forty two computed ones, x = 11 to 199, which is enough to settle the
branch: f falls by a factor 170 across that range, so L is on the polylog branch
rather than the linear one. **That is the branch the route needs; it is not the
route.** Carrying L to a bound on G₂ goes through U-FRAME section 5a step 3, and
priced against the sharp per-fold budget ln c(p) <= 2 ln p / p that needs
L <= 0.19 to 0.31·p/ln p on average, against A5 Theorem B's proven L <= 0.18 p
(`research/gate-multiplies.md` section 8). The measurement here settles which
branch the truth is on; it does nothing about the factor 0.58 to 0.95 ln p
between the branch and a proof. It also does not reach x = 1000: that would need count(2016),
and the surviving term count there is about 4·10^41. What is missing is precisely
a closed form, or a saddle point, or any asymptotic handle, for count_x(d) at d
of order 2p. Everything else in the census law is already exact and already fast.

## The empirical closed form, and why the fluctuation is not noise

Over the forty two exact points, ln(1/f) tracks the threshold 2p/m̄ as U-FRAME
predicted, and the residual is not random. It is the singular-series comb of
d_min. Writing rho_q(d) = q−2 when q | d, q−3 when d ≡ ±2 (mod q), and q−4
otherwise, and s(d) = prod_{5<=q<=x} rho_q(d)/(q−4) for the richness of this
particular d_min relative to generic, the regression gives

    ln(1/f) = 1.529 + 1.482·(2p/m̄) − 1.025·ln s(d_min),   R² = 0.964

against R² = 0.902 for the threshold alone. The coefficient on ln s is −1 to
within the fit, so f is proportional to s(d_min) times a clean exponential in
the threshold. The clearest instance sits at the top of the range: x = 181 has
d_min = 384 with s = 1 and f = 5.7e−5, while x = 199 has d_min = 420 = 2²·3·5·7
with s = 6.10 and f = 2.7e−4, five times larger at a larger p. Since s is exact
and instant at any x, this is a closed form for the fluctuation rather than a
residual, and it is what lets the extrapolation to x = 1000 be quoted with a
calibration rather than a shrug.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
