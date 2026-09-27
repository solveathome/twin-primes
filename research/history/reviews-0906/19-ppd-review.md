# Adversarial review 19: prime-power-dispersion §§4-5 and singleton-fiber-audit §3

Read-only pass, 2026-09-06. Nothing in the repository was created, edited or
deleted; `git status --porcelain` is clean apart from another agent's untracked
`research/corner-log-average-validation.js`, which I did not touch. The two
validators write deterministic artifacts (`data-reuse/factor-windows.json`,
`data-reuse/prime-power-dispersion.json`) that reproduce byte-identically, so
running them left no diff.

## Verdicts, one line each

- **PART 1 (prime-power-dispersion.md §§4-5, (8)-(10), (12)-(13), and residual-coverage §3's consumption): NO DEFECT FOUND.** Every decisive step in (8), (9), (10), the assembly into (12) and (13), the k=1 / k>=2 table, the region (14), the supremum (17)-(18), the §7 budget table, and the `D -> D/P` substitution into residual-coverage (5)-(6) and the §3 budget table was re-derived independently and reproduced exactly.
- **PART 2 (singleton-fiber-audit.md §3, (6)-(8)): CHECKED, and the counting argument does transfer to the corner boxes as corner-correlation.md uses it.** One defect of wording, not of mathematics, at `research/reachability-coverage.md:216-217`: the sentence claiming its S_0 count "localises" the *per-sign* `c*x*log x` lower bounds over-states what is derived — neither note establishes a per-sign lower bound on S_0, and deriving one would require the two-point Möbius correlation that the same wave records as OPEN.

Neither part changes the OPEN status of the signed endpoint remainder or the
twin margin. Nothing below is an estimate.

---

# PART 1 — prime-power-dispersion.md §§4-5

## 1.1 (8), the zero-numerator count — CHECKED

Two classes, and they are exhaustive:

*Identical prime, `h1=h2`.* `O(P)` bases in the band times `O(A)` harmonics,
weight `(log p)^2 |c_h|^2 << log^2 x / A^2`. Total `<< (P/A) log^2 x`. Matches
the first monomial.

*Distinct primes.* `r = theta(h1 p2^k - h2 p1^k) = 0` with `(p1^k, p2^k) = 1`
forces `p1^k | h1`, hence `h1 = j p1^k`, `h2 = j p2^k` with the same positive
`j` — I re-derived this rather than accepting it, and it is exactly right.
Since `p_i^k` lies in `[R, 2R)`, the count of admissible `j` with both
`j p_i^k ~ A` is `O(A/R)`, and a solution requires `j >= 1`, hence `R <= 2A`,
so `A/R >> 1/2` and the `+1` from interval endpoints is absorbed — the note's
"absorbs the endpoint constant" is correct and load-bearing. `O(P^2)` prime
pairs and weight `1/A^2` give `P^2/(AR)`. `P = R^{1/k} <= R` collapses this into
`P/A`, with equality of order at `k=1`.

The subsequent use is consistent: the `r=0` inner `n`-sum is bounded by `N f^2`,
so the zero class contributes `f^2 D N P / A` to (12) — the first bracket term.

Note: `|c_h| << 1/|h|` for Vaaler coefficients, giving
`sum_{h~A}|c_h| = O(1)` and `sum_{h~A}|c_h|^2 = O(1/A)`; both are used and both
hold, including in the clipped `A = 1` block.

## 1.2 (9), the prime-power gcd factor — CHECKED, and the refuted shortcut is genuinely refuted

*Same prime.* `c = d p^k` with `p ∤ d`, so `gcd(r, c) = gcd(r,d) gcd(r, p^k)`;
`p` odd and `theta ∈ {1,2}` give `gcd(theta(h1-h2), p^k) = gcd(h1-h2, p^k)`.

*Distinct primes.* `c = d p1^k p2^k` with three pairwise-coprime factors.
`r ≡ theta h1 p2^k (mod p1^k)` and `gcd(theta p2^k, p1^k) = 1`, so
`gcd(r, p1^k) = gcd(h1, p1^k)`; symmetrically for `p2`. Hence
`H = gcd(h1,p1^k) gcd(h2,p2^k)`.

Both branches need `p_i` odd and `p_i ∤ d`; both hypotheses are in force
(`B_k` is defined over odd primes only, and `p ∤ d` sits inside `P_d`).

The refuted shortcut is correctly refuted and the full factor is kept: the note
retains `gcd(h_i, p_i^k)` and `gcd(h1-h2, p^k)` everywhere downstream, never a
radical. `gcd(25, 5^2) = 25 != 5`. The validator asserts the identity exactly —
`assert.equal(bgcd(r,c), bgcd(r,d)*H)` — over the full pair loop, with 217,616
nonzero cases carrying a nontrivial `H` and 10,612 distinct-prime zero terms, so
the "omit distinct-prime zero pairs" shortcut is also actively falsified rather
than merely asserted. The example `(25,25)`, `(49,49)` does have equal
frequency.

## 1.3 (10), the harmonic averages with exponent alpha — CHECKED

The majorization `gcd(h,p^k)^alpha <= sum_{0<=j<=k, p^j | h} p^{j alpha}` is
valid: the term at `j0 = min(v_p(h), k)` is present and equals the left side.
Each `j` contributes at most `p^{j alpha} * 2A/p^j = 2A p^{j(alpha-1)} <= 2A`
because `alpha <= 1`, and only `p^j <= 2A` can divide a positive `h <= 2A`.
`k+1` values of `j` give `A(k+1)`.

For the difference sum, each nonzero value `n = |h1-h2| < A` is realised by
`O(A)` ordered pairs, and the first bound applied on `[1,A)` gives `A^2(k+1)`.

Normalized: for a distinct prime pair the two `h`-sums separate and give
`O((k+1)^2)`; for the same prime `O(k+1)`. `k = O(log x)` since `p^k <= V` and
`p >= 3`, so these are fixed powers of `log x`, uniformly in `k`. The note's
"up to fixed logarithms uniform in k" is the correct reading of that.

Validator coverage note: `prime-power-dispersion-validation.js` tests (10) on
the **half-open** band `[A, 2A)` (`for(let h=A;h<2*A;h++)`), whereas the note's
`h ~ A` reads as `(A, 2A]`. Same class of gap the chain review found in
`grouped-divisor-validation.js`. I re-ran (10) on `(A,2A]` and `[A,2A]`
independently (2,538 cases; `p ∈ {3,5,7,17,31,101}`, `k <= 8`, `A <= 16384`,
`alpha ∈ {1/2, 1}`): maximum ratio to `A(k+1)` is 1.4688 and to `A^2(k+1)` is
1.0000, both inside the validator's own constants 2 and 4. **Not a defect** —
a validator coverage gap that the closed-band re-run closes.

The `d`-average `sum_{d~D} gcd(r,d)^alpha << D tau(|r|)` (dispersion-range (11))
was re-derived: `gcd(r,d)^alpha <= sum_{s | (r,d)} s^alpha`, and each divisor `s`
of `|r|` contributes `D_0 s^{alpha-1} + s^alpha <= 3 D_0` for `alpha <= 1`. No
hypothesis `r < D` and no coprimality is used, and `r = 0` is correctly excluded.

## 1.4 The assembly into (12) — CHECKED

I reconstructed each of the four bracket terms independently, with the harmonic
and prime sums put back in:

| class | reconstruction | (12) |
|---|---|---|
| zero numerators | `D * N * (P/A) * f^2` | `f^2 D N P / A` |
| cross-prime Weil | `sqrt(p1^k p2^k) * sqrt(D) * D tau(r) * (k+1)^2 * P^2` = `x^eps D^{3/2} R P^2` | `D^{3/2} R P^2` |
| same-prime Weil | `sqrt(p^k) * D^{3/2} * (k+1) * P` = `x^eps D^{3/2} R^{1/2} P` | `D^{3/2} R^{1/2} P` |
| complete periods | `(N H / (p1^k p2^k)) * sum_d gcd(r,d)/d` = `N P^2/R^2 <= N` (same prime: `N P/R <= N`) | `N` |

The `f^2` prefactor is right in both directions: the zero class has
`|Phi_1 conj(Phi_2)| << f^2` with no variation cost, and the nonzero classes
carry `f^2 (1 + r_phase) << f^2 x^{3 tau}` from the sparse-dispersion (9)
derivative argument, which transfers because differentiation is in `n` and
`d p^k ~ M ≍ DR`. `r_phase = Ax/(DRN) << x^{3 tau}` on the retained boxes
`MN > x^{1-tau}` with `A <= T = ceil(x^{2 tau} max(1, MN/x))`.

The completion input (11) is `prime-dispersion.md` (11), which I checked against
its cited source (see §1.8): complete periods cost `(M/c)G` by the Ramanujan
bound, the residual interval costs `sqrt(cG) log c` by Fourier inversion plus
the composite-modulus Weil bound. No squarefree-modulus hypothesis anywhere.

## 1.5 (13), including the envelope — CHECKED

`|B_k|^2 << F^2 D * (12)` is the two Cauchy steps (in `n`, then in `d`), and I
checked the enlargement of the nonnegative moment to all `d` in the interval is
the only place a restriction is dropped — `p ∤ d` and `(n, dp^k)=1` stay inside
`Y_d`, as claimed.

The envelope `f/sqrt(A) <= sqrt(x/(DRN))` is `min(u,v) <= sqrt(uv)` with
`u = 1/sqrt(A)`, `v = sqrt(A) x/(MN)`, `M ≍ DR`. Applying it to the zero term
gives exactly `sqrt(DxP/R)`; the three nonzero terms use `f <= 1` and give
`D^{5/4}R^{1/2}P`, `D^{5/4}R^{1/4}P^{1/2}`, `sqrt(DN)` after the outer
`F sqrt(D)`. All four match (13).

The `k=1` / `k>=2` table follows from `P = R` and `P <= R^{1/2}` respectively,
with `R <= V`; each of the eight cells reproduces.

## 1.6 The claim that the first-power case removes the small-prime cut and the unpaired diagonal — CHECKED

*Small-prime cut.* `dispersion-range.md` §3 needed `p > x^kappa > 2T` precisely
so that `gcd(r,c) = gcd(r,d)` with no distinguished-prime factor and no
distinct-prime zero numerators. (8)-(10) price both of those objects directly,
so the cut is no longer needed for odd `p`. The prime 2 is still removed
separately as `Q_2` by the paired bound (support `O(D)`), which the note states.
So: "the small-prime cut is removed" is true **for the odd primes**, which is
what `B_1 = Q_odd` contains. Correct as written.

*Unpaired diagonal.* In `dispersion-range` the diagonal used `A >= 1` and gave
exponent `a+b-w/2`, which needed its own condition in (2). Here the zero class
is paired, giving `J = 1/2 + (a+b)/2 - w/2`. That is strictly smaller whenever
`a+b > 1`, which holds throughout the region. I verified the two implications:

- `W_L < 1` and `a > 2w` give `a+b < 2 - 7w/2 = 29/25`, hence `J < 24/25`.
- `P_0 = b + a/2 - w/2 = 2 W_L - w - 2a < 2 - 5w = 4/5`.

Both are exact; the validator checks the same two rational identities. So (14)
legitimately drops the diagonal condition.

## 1.7 §6-§7 region arithmetic — CHECKED in exact rationals, by hand and against the validator

- `C' = C - w/2` and `G' = G - w/2` for `B_exc` follow from
  `dispersion-range (4)` with `a' = a`, `rho = (a-w)/2`, `b' = b`, `sigma = b/2`:
  the `(a+b)` coefficients cancel to zero (`1/2 + 1/5 - 7/10 = 0`) leaving `-w/2`.
  Cross-check: `dispersion-range` gives `C - w/4` for the whole `B` sector, and
  `B_exc`'s norm is smaller by exactly `w/4`, so `C - w/2` is consistent.
- `G <= (25/22)(C - 3/20)` reduces to `7(t - 2 max(a,b))/88 <= 0`, i.e. to
  `max(a,b) >= (a+b)/2`. True. Then `C < 28/25` gives `G - w/2 < 2161/2200`.
- Low terms save `7w/10` in the first exponent and `7w/8` in the second,
  relative to `C` and `G` — I confirm the comparison is against `C`, `G`, not
  against `C - w/2`, and it holds because `max(a-w,b) <= max(a,b)`.
- §7 table at `a = 0.487`, `b = 0.662` (`delta = 0.247`, `nu = 0.612`,
  product `0.859`): `C = 1.1198`, so `C - w/2 = 0.9998`; `W_L = 0.99975`;
  `J = 0.9545`; `P_0 = 0.7855`; `W_L - w/2 = 0.87975`; `W_L - 3w/4 = 0.81975`;
  `C - 7w/10 = 0.9518`. All seven reproduce; the validator's rational output
  `4999/5000, 3999/4000, 1909/2000, 1571/2000, 3519/4000, 3279/4000, 4759/5000`
  is the same list.
- The two control budgets are correctly reported as insufficient here:
  `C - (w+v)/4 = 1.0473` (BB) and `a+b-w/2 = 1.029` (unpaired diagonal).
- Supremum (17): `max(a,b) >= b` turns `C < 28/25` into `14a + 19b < 97/5`;
  `W_L < 1` gives `5a + 2b < 94/25`; the multipliers `3/67` and `5/67` give
  coefficient 1 on both `a` and `b` and right side `77/67`, hence
  `delta + nu < 77/67 - 6/25 - 1/20 = 5757/6700`. The intersection
  `(816/1675, 1109/1675)` sits on both boundary lines, has `b* > a*` (needed for
  `max(a,b) = b`), `a* = 0.48716 > 2w = 0.48`, and `J`, `P_0` strictly below 1.
  Reproduced exactly.

## 1.8 Consumption in residual-coverage §3 — CHECKED

*The `D -> D/P` substitution (residual-coverage (5)).* The first branch's
original divisor is `pm = p g d ∈ I`, so `gd` lies in a single interval of
length `≍ D/p ≍ D/P`, and the union over the band `p ∈ [P, 2^{1/k}P)` is one
interval of length `≍ D/P`. Both the size of `d` and the length of the `d`-range
scale as `D/P`, and `M ≍ (D/P) R`, so the substitution is consistent in all
three roles `D` plays in (13). Substituting term by term:
`sqrt((D/P)xP/R) = sqrt(Dx/R)`, `(D/P)^{5/4}R^{1/2}P = D^{5/4}R^{1/2}P^{-1/4}`,
`(D/P)^{5/4}R^{1/4}P^{1/2} = D^{5/4}R^{1/4}P^{-3/4}`, `sqrt(DN/P)`. All four
match (5) exactly.

*The reduction (5) -> (6).* Uses `R <= 2PW` (from `p^k = p * p^{k-1} <= 2P W`),
`P <= W` (from `p <= p^{k-1} <= W`, valid because `k >= 2` on this branch) and
`P >= 1`. Gives `D^{5/4}W^{3/4}`, `D^{5/4}W^{1/4}`, `sqrt(Dx)`, `sqrt(DN)`.
The "smaller by `3w/4` than the first-power cross budget" claim is
`W^{3/2} -> W^{3/4}`, i.e. `3w/4`. Correct. The note's own caveat that (6)
supplies no extra saving on the zero term is honest and correct.

*The prime-free moment (8).* I re-derived it from scratch: zero weight `O(1/A)`,
Weil `D^{3/2}`, periods `N`, then `f/sqrt(A) <= sqrt(x/(DN))` gives
`F[sqrt(Dx) + x^{3tau/2}(D^{5/4} + sqrt(DN))]`. Matches.

*Coefficient coverage.* The seven pieces — `A_0`, low `A_1`, `Q_2` (prime-free
(8)); `Q_odd = B_1` ((13), `k=1`); odd `B_k`, `k>=2` ((13), `P <= sqrt(R)`);
odd first branch ((6)); `p=2` first and negative branches ((7)) — exhaust
`A_0 log n + A_1` via `coefficient-structure.md` (1)-(3), which I checked matches
`prime-power (1)` and `residual-coverage (3)` term for term. `(9)` dominates all
seven envelopes. "There is no remaining `B_exc` norm condition" is therefore
correct.

*The §3 budget table.* Substituting `F << sqrt(N)`, `D = x^{a-w}`, `W = x^w`,
`N = x^b` into (9) gives left `W = 5a/4 + b/2 + w/4`, `J = 1/2 + (a+b)/2 - w/2`,
`P = b + a/2 - w/2`; the right row is the same with `a <-> b`, `w <-> v`. Both
rows reproduce.

*(11)-(12), the simplification.* `J_R = 31/50 + theta/2` is exact, and
`J_R < 1 <=> theta < 19/25` is an equivalence, so the `19/25` edge is genuinely
set by the right zero term as claimed. `W_R <= 5 theta/4 + 3/200` and
`P_R <= theta + 43/200` **use `delta >= w` and `nu >= v`** respectively — the
crude bound `delta/2 + 5nu/4 <= 5 theta/4` would give the constant `39/200`, not
`3/200`, and the claimed `193/200` at `theta = 19/25` would fail. The domain (1)
does supply `delta >= w`, so the note is right, but the dependence on the domain
constraint is implicit in the display and worth a word if that display is ever
reused outside (1). Not a defect.
`W_L = (5 delta + 2 nu)/4 + 77/200 < 1 <=> 5 delta + 2 nu < 123/50` reproduces.
The frontier crossing `(47/150, 67/150)`, the regional supremum `87/100`
approached at `(6/25, 63/100)`, the containment of the generic paired region
(`C < 1 => a+b < 34/33`, so `theta < 0.7403 < 19/25`), the concrete
`theta = 3/4 -> 199/200` and `lambda = 49/20 -> 399/400`, and all four budgets
at `(delta,nu) = (2/5,2/5)` (`179/200`, `51/50`, `21/25`, `217/200`) all
reproduce in exact rationals.

## 1.9 Imported theorems, with primary source and hypotheses

- **Ramanujan and Weil bounds.** `link.springer.com/article/10.1007/s00039-026-00746-0`
  fetched successfully (HTTP 200, 849 KB). **Lemma 3.2 (Ramanujan bound):**
  "For `c ∈ Z_+` and `n ∈ Z`, one has `|S(0,n;c)| <= (n,c)`." **Lemma 3.3 (Weil
  bound):** "For `c ∈ Z_+` and `m, n ∈ Z`, one has
  `S(m,n;c) << c^{o(1)} sqrt((m,n,c) c)`", proved from Iwaniec-Kowalski
  Corollary 11.12 plus the divisor bound. Numbering, statement and quantifiers
  confirmed verbatim; **no squarefree-modulus hypothesis, `n = 0` and
  nonprimitive numerators admitted**, which is exactly how the notes use them.
  This **repairs** the `chain-review-0906.md` §5 row "numbering not confirmed by
  the fetcher" and the §7 entry listing these as unchecked.
- **Bettin-Chandee, Theorem 1 and Remark 1**, `arxiv.org/pdf/1502.00769` (HTTP
  200). Theorem 1 reads
  `B(M,N,A) << ||alpha|| ||beta|| ||nu|| (1 + |theta|A/(MN))^{1/2} [ (AMN)^{7/20+eps}(M+N)^{1/4} + (AMN)^{3/8+eps}(AN+AM)^{1/8} ]`,
  for arbitrary coefficients on dyadic `[M/2,M]`, `[N/2,N]`, `[A/2,A]`, with
  `(m,n)=1` and `theta != 0`. With `||nu|| ≍ A^{-1/2}` (Vaaler) and `A ≍ MN/x`
  this collapses to `x^{3/20}||alpha|| ||beta|| (MN)^{1/5}(M+N)^{1/4}` and
  `||alpha|| ||beta|| (MN)^{3/8}(M+N)^{1/8}` — **exactly** the two monomials of
  `dispersion-range.md` (4) that `prime-power §6` uses for `B_exc`. Remark 1
  permits the endpoint perturbation with the factor replaced by
  `(1 + (|theta|A + X)/(MN))^{1/2}`, as the notes assume. Hypotheses met as used.

## 1.10 Do the validators test what the notes say?

Mostly yes, with the scope the notes themselves state.

Directly tested: the exact decomposition (1)-(2) against an independently built
truncated convolution (1,883,736 identities); the support and norm majorants of
(3); the gcd identity (9) as an exact BigInt equality over every pair, with
active nontrivial-`H` and distinct-prime-zero counters; the `O(A/R)` collision
count of (8) as `count <= 3A/R` (15 configurations); the two harmonic bounds of
(10) with constants 2 and 4; the two Cauchy inequalities of (6); the shifted
reciprocity identity with an active wrong-shift control (`0.11336` error); and
the whole §6-§7 rational budget list including the supremum certificate. Ran in
3.13 s here; `embed.js --check` reports code, body, input and out hashes all
matching for both scripts.

Not tested, and correctly declared not tested: the assembly (12)-(13) itself —
the summation of the completion bound over `d`, `h` and the prime pairs is a
written derivation, and the note says so ("The uniform all-harmonic bound is the
derivation (8)-(13)"). Also untested: any asymptotic rate; the note says that
too. `singleton-fiber-validation.js` checks only **finite nonemptiness** of the
two sign classes (`assert(pos && neg)`, with the comment "Finite nonemptiness,
not the asymptotic density claim") — it does not test (6), (7) or (8) as
inequalities. Honest, but it means §3 carries no numerical backstop in the repo;
see §2.3 below for one I ran.

---

# PART 2 — singleton-fiber-audit.md §3

## 2.1 (6)-(8) — CHECKED

*Odd pairs:* `UY/4 + O(U+Y+1)`.

*Union bound (7):* each of `p^2|d`, `p^2|e`, `p | (d,e)` contributes main term
`UY/(4p^2)` for odd `p`, hence `(3UY/4) sum_{p>2} p^{-2}`. The chain
`sum_{p>2} p^{-2} <= sum_{j>=1}(2j+1)^{-2} < sum_{j>=1} 1/(4j(j+1)) = 1/4` is
correct because `(2j+1)^2 > 4j(j+1)`, giving `< 3UY/16` and `|G| >= UY/16 + o(UY)`.
The stated error terms `O(Y sqrt U + U sqrt Y + ...)` and
`O((U+Y)log(2Y) + Y)` are the right shapes (the second comes from
`sum_{p<=2Y}(U/(2p) + 1)(Y/(2p) + 1)`), and all are `o(UY)` at
`U = x^{6/25}`, `Y = x^{1/20}`: `x^{0.17}`, `x^{0.265}`, `x^{0.24} log x` against
`x^{0.29}`.

*The sign split.* `T = sum_{d,e odd, (d,e)=1} mu(d) mu(e) = |G_+| - |G_-|`
because nonsquarefree pairs weigh zero. The fixed-`P` argument is sound: for
fixed `e`, the inner `d`-sum is `sum_{d~U, (d,m)=1} mu(d)` for one of at most
`2^{pi(P)+1}` fixed moduli `m`, each `o_P(U)` by §2's fixed-`m` Möbius mean;
summing `O(Y)` values of `e` gives `o_P(UY)`. Removing pairs sharing a prime
`> P` costs `O(UY/P) + o(UY)` since `sum_{p>P} p^{-2} << 1/P`. Letting `x -> ∞`
then `P -> ∞` is the standard limsup argument and is valid: `limsup |T|/(UY) <=
C/P` for every fixed `P`. **No growing-modulus Möbius correlation is used**, and
the note's own disclaimer to that effect is accurate.

*(8).* `|G| >= UY/32` and `|G_+| - |G_-| = o(UY)` give each sign `>= UY/128`
eventually; `d phi(e) <= 4UY` gives `sum_{G_sigma} 1/(d phi(e)) >= 1/512`.

I also re-derived §4 (which is what turns (8) into (4)) since (4) is the cited
result: the singleton criterion (`kv > x` and `g | 2` force at most
`xg/(2kv) + 1 < 2` solutions), `kv ≍ x^{171/100} > x`, `beta_V(k) = log k`, the
primitive progression `k ≡ 2 d^{-1} (mod e l)`, the uniqueness of the
representation `q = e l` for fixed `d` (two primes `> 2Y` would force
`l' | e <= 2Y`), the BV parameters (`q << x^{1/4}` against `sqrt K ≍ x^{19/50}`),
the loose prime-power subtraction `x^{6/25 + 1/4 + 19/50} = x^{87/100}`, and the
Mertens/PNT evaluation `sum_l log l/(l-1) = (1/10 + o(1)) log x`. All reproduce.
`c = 1/40960` is conservative against `(1/2)(1/512)(1/20) = 1/20480`.

Imported inputs for (4), with hypotheses: **Bombieri-Vinogradov for `Lambda`**
(Tao, 254A Notes 3, Theorem 17) at level `q <= K^{1/2}/log^{B_A} K` with the
maximum over coprime classes — the note's `q << x^{1/4}` against `x^{19/50}`
meets it with a fixed power margin, and the one-representation lemma is what
licenses summing the maximum without multiplicity; **quantitative PNT**; and
**`sum_{n<=t} mu(n) = o(t)`** (Tao, 254A Notes 2, Exercise 66, `q=1` case),
extended to fixed coprimality by the convolution argument in §2. I did not
independently re-open the two Tao pages this pass; `chain-review-0906.md` §5
records both as source-confirmed.

## 2.2 Does §3 transfer to the corner boxes? — CHECKED, as used

**What is actually claimed.** `corner-correlation.md:344` says only that
"singleton-fiber-audit §3 derives that both signs occupy a positive proportion
of odd squarefree coprime divisor pairs on a box, and that counting argument
transfers verbatim to the corner's boxes." That is a claim about §3's *counting*
argument, not about §4's `c x log x` bound.

**It does transfer.** §3 uses only: (i) `D, E -> ∞` with intervals of length
`≍ D`, `≍ E`; (ii) `sum_{p>2} p^{-2} < 1/4`; (iii) the fixed-`m` Möbius mean at
modulus `-> ∞`. None of these involves `x`, the relation of `D, E` to `x`,
Bombieri-Vinogradov, or any ordering of `D` and `E`. At the corner scales
`D ≍ x^{19/25}` (interval length `≍ D`, since `D_0/D_1 = x^{2 eta_0}`) and
`E ≍ x^{19/20}`, I redid the error bookkeeping: `E sqrt D = x^{1.33}`,
`D sqrt E = x^{1.235}`, `(D+E) loglog x + D/log D = O(x^{0.95} loglog x)`, all
`o(DE) = o(x^{1.71})`. One phrase does not transfer literally — "a common prime
is at most `2Y`" becomes "at most `2 min(D,E)`", since at the corner `E > D` —
but the resulting bound has the same form and the same order. So "verbatim" is
one word stronger than the truth; "with `U, Y` replaced by the box's `D, E` and
the same error bookkeeping redone" is exact, and the conclusion is unchanged.

**What corner-correlation uses it for is legitimate.** The row is arguing that
the support restrictions (`(d,e)|2`, oddness, squarefreeness) do not bias
`mu(d) mu(e)`. §3 gives precisely that: both signs at positive density in
counting measure over the box. It does **not** claim, and corner-correlation
does not need it to claim, anything about the sign distribution once the
determinant constraint `dr - er' = 2` and the `beta` weights are imposed.

**§4 does not transfer, and corner-correlation says so correctly.** At the
corner `K = x/d ≍ x^{6/25}`, `sqrt K ≍ x^{3/25}`, while `q >= e ≍ x^{19/20}` —
BV is unusable by a factor `x^{0.83}`. Independently, `kt ≍ x^{29/100} < x`, so
the corner fibers have `≍ x^{71/100}` points and are the opposite extreme to the
singleton family, which is exactly what `corner-correlation.md:348` states. That
row is correct.

## 2.3 The one defect: reachability-coverage.md:216-217

`research/reachability-coverage.md:216-217` reads:

> "This bounds absolute term mass and says nothing about the signed value. It
> localises [singleton-fiber-audit.md]'s `c*x*log x` lower bounds on each sign's
> ungrouped mass."

**DEFECTIVE as literally read.** §2.6 derives a lower bound `>> eta_0^2 x log^2 x`
on the sum of **absolute values** of the terms of `R` restricted to `S_0` — both
signs together. It does not split that mass by the sign of `mu(d) mu(e)`, and
`singleton-fiber-audit §3` cannot supply the split here: §3 gives equidistribution
of the sign in **counting measure over a raw divisor box**, whereas a per-sign
lower bound on `S_0` would need the sign of `mu(n/r) mu((n-2)/r')` along the CRT
progression `r | n`, `r' | n-2` — that is the two-point Möbius correlation at
shift 2 which `corner-correlation.md` records as the OPEN object. So the sentence
asserts, as an established localisation, something whose derivation would require
the open input.

Severity: **wording, not load-bearing.** §2.6's actual conclusion (a triangle-
inequality treatment of `S_0` cannot reach `x/log^K x`) needs only the absolute
mass, which is derived independently there and does not use singleton-fiber at
all. Suggested repair, if the note is edited: drop "on each sign's ungrouped
mass", or restate as "it is the `S_0`-local analogue of singleton-fiber-audit's
global `c x log x` absolute-mass lower bound, without the per-sign split".

Adjacent, outside my scope and non-load-bearing: "the same in all three readings
... by a factor `log^{K+2}`" at :214-216 is exact only for the fixed-`eta_0`
reading; with `eta_0 = C loglog x/log x` from §2.5 the factor is
`(loglog x)^2 log^K x`, and for the single top dyadic box it is `log^K x`. The
qualitative conclusion (misses by at least `log^K x`) holds in all three.

## 2.4 An independent numeric probe of §3

Not in the repository; run in the scratchpad only, as a measurement, on 10 box
shapes including four with `E >> D` (the corner's orientation, the reverse of
the note's `U > Y`). Counted odd squarefree coprime pairs `(d,e)` with
`d ∈ (D,2D]`, `e ∈ (E,2E]`:

| D | E | `|G|/(DE)` | `(|G_+|-|G_-|)/(DE)` | `min/(DE)` | `min_sigma sum 1/(d phi(e))` |
|---|---|---|---|---|---|
| 512 | 64 | 0.1425 | -1.25e-3 | 0.0706 | 0.0409 |
| 16384 | 1024 | 0.1434 | 7.51e-6 | 0.0717 | 0.0412 |
| 1024 | 16384 | 0.1434 | 7.51e-6 | 0.0717 | 0.0412 |
| 4096 | 65536 | 0.1434 | 8.65e-6 | 0.0717 | 0.0412 |
| 8192 | 131072 | 0.1433 | 3.60e-6 | 0.0717 | 0.0411 |
| 64 | 262144 | 0.1433 | 2.44e-5 | 0.0716 | 0.0419 |

Note's thresholds: `|G|/(DE) >= 1/32 = 0.03125`, `min/(DE) >= 1/128 = 0.0078`,
`sum >= 1/512 = 0.00195`. Measured values clear all three by factors of 4-20,
the sign imbalance decays, and the `E >> D` shapes behave identically to the
`D >> E` shapes. This is a **measurement at `D, E <= 3e5`**, not a proof, and it
does not reach corner scales; it is consistent with the derivation in §2.1-§2.2
and with the note's constants being conservative.

---

# What I did not check

- `endpoint-pairing.md` §5 (the divisor-count bound on the full positive
  Vaaler majorant) and its (9), which both notes import for the majorant and for
  the paired budget shape. I confirmed that `dispersion-range (4)`'s two
  monomials are the specialisation of Bettin-Chandee Theorem 1 (§1.9), but I did
  not read endpoint-pairing's derivation of (9).
- `prime-dispersion.md` (11)'s derivation line by line — I checked its cited
  inputs verbatim and the completion sketch, not the full text.
- The **right-orientation** rewrite of the prime-power and first-branch moments
  (`residual-coverage §3`). It is asserted from sign-agnostic ingredients and the
  native phase (10) rather than written out. **ASSUMED-UNVERIFIED**, same as the
  earlier review's flag. Since the `19/25` product edge is set entirely by
  `J_R`, this is the largest unwritten dependency in the part I reviewed.
- `residual-coverage §4`'s Perron separation and §5's `E_*`; the prior chain
  review adjudicated §§1-5 with no defect and I did not repeat it.
- `signed-divisor-grouping §2`'s excluded-prime Möbius lemma (used by
  residual-coverage §4's density step).
- Tao, 254A Notes 2 Exercise 66 / Corollary 39 and Notes 3 Theorem 17 as
  fetched pages this pass.
- `coefficient-structure.md` §2's norm lower bound, and everything in
  `grouped-divisor-moment.md`.
- Whether the OPEN signed margin holds. Nothing here bears on it.

A checked derivation is not a refereed theorem. The full endpoint remainder,
the sufficient twin margin, and the corner correlation all remain OPEN, and
this review moves none of them.
