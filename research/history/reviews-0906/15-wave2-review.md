# Wave-2 adversarial review, 2026-09-06 — three same-day derivation notes

Reviewer: independent pass, read-only. Repo at commit `ec00a95` (working tree clean at
start). Nothing in the repository was created, edited or deleted. All three validators
were run read-only and all three embedded output blocks were confirmed bit-honest with
`node research/qc/embed.js --check`. Independent recomputations were done in the
scratchpad (`wave-0906/indep.js`, `wave-0906/indep2.js`), not in the repo.

## Verdicts, one line each

* **NOTE A — `research/mobius-bv-derivation.md`: NO DEFECT FOUND IN SCOPE.** Every step
  re-derived; all four imported statements confirmed verbatim at the cited source; the
  edit to `shifted-prime-decomposition.md` is provenance-only.
* **NOTE B — `research/determinant-corollary.md`: NO DEFECT FOUND IN SCOPE.** Identity
  (1), the transfer, the error exponent and the whole region arithmetic reproduce
  independently; Bettin–Chandee Corollary 1 confirmed verbatim including the DFI 1995
  comparison.
* **NOTE C — `research/left-divisor-signs.md`: DEFECT FOUND.**
  `research/left-divisor-signs.md:290-293`, `:327`, `:362`, `:517` and
  `research/left-divisor-signs-validation.js:216-221`. The required per-block saving at
  the corner is stated as `eta'>2` from a general formula `eta'>2(a+b-1)`. The correct
  general requirement is `eta' > (a+b-1)/b`; the factor 2 is an artefact of `b=1/2` at
  the target box. At the corner `a=b=1` the requirement is `eta'>1`, not 2, and the
  corner needs **twice** the square-root ceiling `1/2`, not four times. The note's own
  corner table (`:287`, value `3/2`) and the validator's `sqrtRoute = b + a/2` use the
  correct accounting, so the note contradicts itself. Two further scope slips are
  recorded below. **The verdict of the note is unaffected**: every failure it reports
  is still a failure, and the error is in the conservative direction.

---

# NOTE A — `research/mobius-bv-derivation.md` + `research/mobius-bv-validation.js`

## Decisive steps

| step | claim | status |
|---|---|---|
| (i) identity (V) | `mu = mu_{>U}*mu_{>V}*1 - mu_{<=U}*mu_{<=V}*1 + mu_{<=U} + mu_{<=V}` | **CHECKED (proved).** Expand `(mu-mu_{<=U})*(mu-mu_{<=V})*1` and apply `mu*1=delta` three times: `= mu - mu_{<=U} - mu_{<=V} + mu_{<=U}*mu_{<=V}*1`. Rearranges to (V) at every `n`, no range restriction. |
| (i) coprime version | (V) survives multiplication by `1_{(n,r)=1}` factorwise | **CHECKED.** `(ab,r)=1 <=> (a,r)=1 and (b,r)=1`; the indicator is completely multiplicative on the convolution. Validator confirms pointwise for `r in {1,6,105}`. |
| supports | `f=mu_{<=U}*mu_{<=V}` on `[1,UV]`, `g=mu_{>V}*1` on `(V,inf)`, `mu''` on `(UV,inf)`, `|f|,|g|<=tau` | **CHECKED.** `g(n)=sum_{d|n,d>V}mu(d)=0` for `n<=V`; `|f|,|g|<=tau` is the trivial divisor count. |
| (iii) Type I | `2 sum_{k<=UV} tau(k) <= 2UV(log UV+1) << T^(2/5)L`; `sum_{q<=Q}(...) << QT^(2/5)L + QU << T^(9/10)L` | **CHECKED.** `Q<=T^(1/2)`, `UV=T^(2/5)` gives `T^(9/10)L`; `QU=T^(7/10)` is dominated. K2's bound is uniform in `x`, so `max_{y<=T}` is free here. |
| (b) character reduction (5.1) | `phi(q)>=phi(d)phi(r)`, `chi(n)=xi(n)1_{(n,r)=1}` with `q=dr` | **CHECKED.** Both standard and correctly applied; `max` distributes over the character sum term by term, which is why the `max_y` survives. |
| (ii)/(c) small conductors | run (V) backwards, apply K1 class by class mod `d` with `m=r` | **CHECKED, and stronger than the note needs.** The note leans on K1 allowing arbitrary `a`; in fact `xi(b)=0` unless `(b,d)=1`, so only reduced classes occur and the coprimality restriction is the only non-standard feature used. Hypotheses: `d<=(log T)^C<=(log y)^{2C}` holds for `y>=T/L^{A''}` since `log y >= (1/2)log T` eventually; `omega(r) << log T <= exp{(log y)^{1/2}}` holds with `eps=1/2`. Below `y=T/L^{A''}` the trivial bound `y` is used. |
| (c) bookkeeping | `<< T L^{2C+2}/L^{A''} + T^{2/5}L^{2C+5}`, `A''=A+2C+2` | **CHECKED as an over-estimate.** My count gives `T L^{2C+1}log L/L^{A''}` and `T^{2/5}L^{2C+3+o(1)}`; both are inside the stated bounds. No circularity: fix `A`, then `C=A+6`, then `A''=A+2C+2=3A+14`. Presentation order (c) before (e) is a wrinkle, not a defect. |
| (d) dyadic split | `mu''1_{(n,r)=1} = sum_j alpha_j*beta_j` exactly, `U<2^j<=2T/V` | **CHECKED.** `k>U`, `l>V` forces `k<=T/V`, and `l<=T/2^{j-1}` is implied, not imposed. Validator confirms exactness at `n<=10^5` on all eight parameter sets. |
| (d) norms | `||alpha_j||_2<=2^{j/2}`, `||beta_j||_2 << (T/2^j)^{1/2}L^{3/2}`, product `<< T^{1/2}L^{3/2}` | **CHECKED** (`sum_{l<=z}tau(l)^2 << z log^3 z`). |
| (iv) (5.2) and (5.3) | `(T + TP/sqrt U + TP/sqrt V + P^2 sqrt T)L^{9/2}`, then `T L^{11/2}/L^C + T^{9/10}L^{13/2} + Q sqrt T L^{11/2}` | **CHECKED as over-estimates.** Exact bookkeeping gives `L^{5/2}` where the note writes `L^{7/2}`, and `Q sqrt T L^{9/2}` where the note writes `L^{11/2}`. Every discrepancy is in the safe direction. The dyadic-conductor step `sum_d (1/phi(d)) = sum_d (1/d)(d/phi(d))` correctly converts K3's `q/phi(q)` weight, and `sum_r 1/phi(r) << L`, `sum_r 1/(r phi(r)) << 1` are right. |
| (iv) `C=A+6` | first term `T/L^{A+1/2}`, third needs `Q<=T^{1/2}/L^{A+11/2}` | **CHECKED.** `Q<=T^{1/2}/L^{A+6}` is stricter than needed; `B(A)=A+6` stands with slack `1/2`. |
| final subtraction | `K1` at modulus 1, `m=q`, then `sum_{q<=Q}1/phi(q) << L` | **CHECKED.** |
| (v) `max_{y<=T}` inside | legitimate at every application | **CHECKED.** K2 uniform in `x`; K1 applied at each `y` with the trivial branch below `T/L^{A''}`; K3 carries `max_{y<=x}` in its own statement. |
| shifted-prime edit | only provenance sentences changed | **CHECKED.** `git show eb17313 -- research/shifted-prime-decomposition.md` is a single hunk of 19 lines replacing the Le Boudec-only citation with the derivation pointer. Statement (4) itself, the mesh argument and everything downstream are byte-identical. |

## Imported theorems, verified at source

Author's preliminary version of Koukoulopoulos, GSM 203, downloaded 2026-09-06 from
`dms.umontreal.ca/~koukoulo/documents/publications/primes.pdf` and read with
`pdftotext -layout`. **All four numbering claims and all four statements are confirmed
verbatim** (this upgrades the note's own §3 caveat only as far as the preliminary
version; the printed book was still not checked):

* **Corollary 13.4** (p. 135): "Fix `A, C >= 1` and `eps in (0,1/2]`. Let `x>=2` and
  `q, m in N` with `q <= (log x)^C` and `omega(m) <= exp{(log x)^{1-eps}}`. Then
  `sum_{n<=x,(n,m)=1,n=a(q)} mu(n) <<_{eps,A,C} x/(log x)^A`." Arbitrary `a` confirmed;
  the proof does split off `d=(a,q)`. Ineffectivity via Theorem 12.1 is as described.
* **Theorem 26.2** (p. 280): exactly as quoted, `a in (Z/qZ)*`.
* **Theorem 26.6** (p. 283): exactly as quoted, `max_{y<=x}` inside, weight `q/phi(q)`,
  primitive characters.
* **(26.3)** (p. 275): exactly as quoted.
* **Exercise 23.4(a)**: "For any `U,V>=1`, prove that
  `mu = -mu_{<=U}*mu_{<=V}*1 + mu_{>U}*mu_{>V}*1 + mu_{<=U} + mu_{<=V}`." Identical to (V).
* The §2 negative is accurate: Chapter 26 proves BV for `Lambda`; Corollary 26.7 is the
  `Lambda'` type-II corollary, and Exercises 26.1-26.5 (read in full) contain no `mu`
  statement.
* The §6 "two small discrepancies" observation is accurate: the display after (26.13)
  prints `x(log x)^5/min{U,V}` where (26.13) itself carries `sqrt U`, `sqrt V`.
* Granville-Shao p. 2 confirmed verbatim in the arXiv PDF (1703.06865, lines 61-62 of
  the extracted text): the `mu` half of the sentence carries references [16],[23], which
  are the smooth-number papers, and no `mu` locator.

**Structural corroboration worth recording:** the book's own §26 proof of BV for
`Lambda` uses exactly the architecture of the note's §5(d)-(e) — the same
`(log x)^C < 2^j` conductor split, the same dyadic-conductor trick, the same
`sum 2^{-j} << L^{-C}` and `sum 2^j << Q/r` estimates. The note's assembly is a
faithful transposition with `mu` in place of `Lambda'`, with the `*1` moved to the
`beta` side (costing `L^{1/2}` more, which the note pays).

## What I did not check for Note A

* The printed AMS book (numbering could differ from the preliminary version).
* The proofs of Corollary 13.4, Theorem 26.2 and Theorem 26.6 — read as statements only.
* Iwaniec-Kowalski §17.2 / Theorem 17.4 and *Opera de Cribro* §9. These remain the two
  most plausible published carriers of a general bilinear BV that would cover `mu`, and
  the note is right to leave them NOT REACHED rather than claim a clean negative.
* The claim in §6 that `shifted-prime-decomposition.md §3` reduces every congruence to a
  primitive class before applying (M). §3 is titled "Nonprimitive congruences are
  retained"; I read the heading, not the argument.

---

# NOTE B — `research/determinant-corollary.md` + validation

## Decisive steps

| step | claim | status |
|---|---|---|
| `beta_W` identity and sign | `beta_W(k) = log k - sum_{r|k, r<=W} Lambda(r)` | **CHECKED.** Immediate from `sum_{r|k}Lambda(r)=log k`. Sign is right. |
| deletion of `k>V`, `t>Z` | vacuous because `beta_V(k)=0` for `k<=V` | **CHECKED.** Every divisor of `k<=V` is `<=V`, so the `r>V` sum is empty. `R(x)` as defined in `RESEARCH-HANDOFF §3` matches the note's display exactly, so the deletion is legal on the actual object. |
| deletion is what buys separability | after the split a retained `k>V` would couple the smooth variable to the coefficient index | **CHECKED as reasoning.** With `k=rk'` and `n_2=dr`, `k>V` reads `rk'>V`, which is a joint condition on `n_2` and `m_1`; deleting it leaves only `d>U`, `e>Y`, which are free restrictions on arbitrary coefficients. |
| identity (1) | `R = T_11 - T_10 - T_01 + T_00` | **CHECKED (proved) and independently reproduced.** Expanding both `beta` factors gives four terms with signs `+,-,-,+`; the map `(d,r,k') -> (n_2=dr, m_1=k')` is exact with the coefficient aggregated into `B_V(n_2)`, and the constraint set factorises after the deletion. Validator's negative control (re-imposing `m_1>V`, `m_2>Z`) fires. |
| coefficient bounds and (2) | `|B_V|,|A_Z| <= log`, `||alpha|| ||beta|| << sqrt(N_1N_2) log^2 x` | **CHECKED.** |
| supports (3) | `N_2 ~ x^{delta+rho}`, `M_1 ~ x^{1-delta-rho}`, etc. | **CHECKED** from `m_1n_2 in J_x` and `m_2n_1 = m_1n_2-2`. |
| `R = O(1)` | `M_1N_2` and `M_2N_1` both `~x` | **CHECKED.** |
| Perron error | `O(x^{1-kappa}log^C x)` with `T_P=x^kappa`, `|a_n|<=d(n)d(n-2)log^2x` | **CHECKED.** Dyadic split of `|n-x|` gives `x log^{C+1}x/T_P` for the far range and `x^{1-kappa}log^C x` for the near range. |
| smoothness met | `f=phi(m_1/M_1)(m_1/M_1)^{-s}`, `f^{(j)} << (1+T_P)^j M_1^{-j}`, so `eta ~ x^kappa` | **CHECKED.** The `log m_1` weight is correctly normalised as `log M_1 + log(m_1/M_1)` with the constant pulled out. `n_2^{-s}` has modulus `<=1` and only lowers `||beta||`. |
| error exponent (7) | `3kappa/2 + (17/20)(A+B) + max(A,B)/4 + eps` | **CHECKED.** `(1/2 + 7/20)(A+B) = (17/20)(A+B)`; `(N_1+N_2)^{1/4} = x^{max/4}`; `(eta R)^{3/2}=x^{3kappa/2}`. |
| (8) equivalence | `(17/20)(A+B)+max/4<1 <=> 22max+17min<20` | **CHECKED symbolically** (multiply by 20, `A+B=max+min`) and reproduced on an independent grid. |
| `A+B<40/39` | `22max+17min >= 17S+5S/2 = 39S/2` | **CHECKED.** |
| (9) `delta+nu < 2869/3900` | `40/39-6/25-1/20 = 2869/3900 = 0.735641... < 19/25` | **CHECKED in exact rationals** (LCD 3900: `4000-936-195=2869`). |
| all-pieces half-planes | `2200delta+1700nu<1387` and `1700delta+2200nu<1482` | **CHECKED** by substituting `a=delta+6/25`, `b=nu+1/20`. |
| vertices and areas | all-pieces `342383/4290000`; log-log `167659/729300`; added `17013209/280280000`; domain `117/250` | **CHECKED.** Independent shoelace on the listed vertices matches to 15 digits; an independent 2000x2000 grid gives added area `0.060703` against the claimed `0.060701`, and `0.000000` added for the all-pieces region. `12.97%` reproduces. |
| named points | `2173/2000`, `1041/1000`, `2563/2000`, `39/20`; log-log `39/50`, `767/1000`, `39/40`, `1691/1000`; diagonals `1387/3900`, `20/39` | **CHECKED, all reproduce exactly.** |
| band coverage at (8/25,9/20) | `rho<223/1100` at `zeta=1/20`; `zeta<3/1700` at `rho=6/25`; deficit `41/1000` | **CHECKED.** |
| per-band budgets (10) | `(1+A)/2`, `A/2+3B/2`, `A` with `A=delta+rho`, `B=nu+zeta` | **CHECKED against the source.** `grouped-divisor-moment.md §1` is genuinely stated for arbitrary `M,N,A>=1` and arbitrary `|b_u|<=B`, and the band coefficient is pointwise `<= log l` with support `<< D x^rho`, so the re-application is verbatim. Top band reproduces `delta<19/25` and `delta+3nu<161/100` — checked in exact rationals. |
| monotonicity + split argument | every per-band budget nondecreasing in `(rho,zeta)`, so admissible sets are downward closed and the union is too; hence split-covered `<=>` top band covered | **CHECKED.** The logic is valid (a union of downward-closed sets is downward closed, and the top band is the maximum of the parameter box). Coefficient signs in (10) and in (7) are all `>=0`. |
| corner argument | at `delta=19/25`, `beta_V(k)!=0` forces `rho=w`, so `A=1` and (7) `>= 11/10` | **CHECKED.** `k ~ x^{6/25} = V`, so any prime power `r|k` with `r>V` has `r ~ k`. |
| witness (8/25,11/25) | `22(14/25)+17(49/100) = 413/20 > 20` | **CHECKED.** |
| DFI 1995 containment | `(7/8)(A+B)+(11/48)max` vs `(17/20)(A+B)+(1/4)max`; diagonals `48/95` vs `20/39` | **CHECKED, and the containment needs the argument the note does not spell out.** DFI is *not* pointwise dominated coefficient by coefficient (`7/8>17/20` but `11/48<1/4`). It is dominated because `DFI - BC = (1/40)S - (1/48)m >= (1/40 - 1/48)S > 0` for `m<=S`. The conclusion stands. |
| §8 sensitivity numbers | `gamma<33/106`, `kappa<99/560`, benchmark deficit `173/2000` | **CHECKED.** |

## Imported theorem, verified at source

**Bettin-Chandee, arXiv:1502.00769v1, Corollary 1** (p. 4), fetched and extracted
2026-09-06. Confirmed **verbatim**, including: supports `[M_i/2,M_i]`, `[N_i/2,N_i]`;
hypothesis `f^{(j)} << eta^j M_1^{-j}`, `g^{(j)} << eta^j M_2^{-j}` for all `j>=0` and
some `eta>1`; main term with `(n_1,n_2)|Delta`, density `(n_1,n_2)/(n_1n_2)` and
integrand `f((x+Delta)/n_2)g(x/n_1)`; error
`O((eta R)^{3/2}||alpha|| ||beta||(N_1N_2)^{7/20}(N_1+N_2)^{1/4+eps}(M_1M_2)^eps)`;
`R = M_1N_2/(M_2N_1)+M_2N_1/(M_1N_2)`. The **DFI 1995 comparison quoted in §7 is also
verbatim** from the same page. The §9 remark "we can assume `|Delta| <= 4D`, otherwise
both `T` and the main term are identically zero", `D = M_1N_2+M_2N_1`, is confirmed in
the proof text; so is the fact that no coprimality between `n_1` and `n_2` is imposed
in the statement (it appears only inside the proof after the `d|Delta` split).

Hypothesis audit against §§1-2: `Delta=2 != 0` OK; supports dyadic after the O(1)
resplit of `n_2=dr` (ratio 4 -> two dyadic blocks; sharp restrictions on arbitrary
coefficients are free) OK; `alpha`, `beta` arbitrary complex, so `d>U`, `e>Y`, `r<=V`,
`r'<=Z`, the Perron twists and every low/prime-power sector are admissible OK;
`f,g` smooth with `eta = x^kappa > 1` OK; `R=O(1)` OK. **I found no failing hypothesis.**

## Assumed, not verified, in Note B

| item | status |
|---|---|
| main term (4) equals `M_>` of `signed-divisor-grouping §5` | **ASSUMED-UNVERIFIED.** The note itself says this is "DERIVED by citation, not rewritten line by line", and correctly notes the verdict does not depend on it (the error term fails first). I checked only that the density factor and the compatibility condition displayed in Corollary 1 match the shapes described. |
| `residual-coverage.md (9)` per band replaces `W` by `x^zeta` and `N` by `x^{delta+rho}` | **ASSUMED-UNVERIFIED.** (9) reads `F x^eps[sqrt(Dx) + x^{3tau/2}(D^{5/4}W^{3/2} + sqrt(DN))]`; the substitution is self-consistent if (9) is read in the left orientation (`D~x^nu`, `W` the right cutoff, `N` the other coefficient's support), which the note does not say. Immaterial to the conclusion: the budget is nondecreasing in `rho` and `zeta` on either reading, which is all the split argument uses. |
| downward closedness of the estimates behind `delta+nu<19/25` and `5delta+2nu<123/50` | **ASSUMED-UNVERIFIED.** §5 argues monotonicity for (10) and residual-coverage (9) only, but the split argument needs it for every estimate in the current union. `grouped-divisor-moment §4` does assert the general principle ("these monomials increase in each support length, so the top bounds apply to all smaller expanded boxes"), and every bound in the chain is a monomial in the support lengths, so the risk is low. If one of those were not monotone, the split region could be *larger* than claimed — i.e. the failure mode would be against the note's negative verdict, not for it. |
| Perron applied inside a fixed dyadic box | **ASSUMED-UNVERIFIED but standard.** The four-variable sum has no a priori bound once `dk in J_x` is removed; convergence relies on the box decomposition of §1.3 already confining all four variables. The note does not say this explicitly. |
| Corollary 1's own proof, and Theorem 1 | The note flags this itself ("Not checked, assumed"). I did not check them either. |

## What I did not check for Note B

The DFI 1995 and DFI 1997 originals (the note reports both unreachable today; I did not
retry). The identification of (4) with `M_>`. `endpoint-fourier.md §3` and the
excluded-prime Mobius mean. `small-divisor-kernel.md §5A`'s `gamma<9/28`, `kappa<27/140`.
The §7 provenance table's claims about which notes imported Theorem 1 rather than
Corollary 1.

---

# NOTE C — `research/left-divisor-signs.md` + validation

## DEFECT 1 (decisive numbers, conservative direction)

**Where:** `research/left-divisor-signs.md:290-293` (§5), `:327` (§6 display), `:362`,
`:517` (§7 table); `research/left-divisor-signs-validation.js:216-221`
(`const need = (a,b) => 2*(a+b-1)`).

**Claim as written.** "Trivially summing over `u ~ N` and `h` costs `N`, so a per-block
bound `M f u^{-eta'}` yields total exponent `a+b-eta'/2`; at the corner that needs
`eta'>2` ... **The corner therefore needs four times the square-root ceiling**", and
`eta' > 2(a+b-1) = 3/25` at the target box, `eta' > 2` at the corner.

**What is actually true.** With `|b_u|<=B`, `sum_h |c_h| <= C` and a per-`(u,h)` bound
`M f u^{-eta'}`, the block is `<< N * M * N^{-eta'}`, i.e. exponent `a + b - eta' b`.
The requirement `< 1` is

```
    eta' > (a + b - 1)/b .
```

At the target box `b=1/2`, so `(a+b-1)/b = 2(a+b-1) = 3/25` — the note's formula is
right *there and only there*. At the corner `a=b=1` the requirement is `eta' > 1`, not
2, and the ratio to the square-root ceiling `1/2` is **2, not 4**.

**Internal contradiction.** The note's own corner table (`:287`) lists the per-block
square-root route at `3/2`, and the validator computes it as `sqrtRoute = b + a/2 = 3/2`
(`left-divisor-signs-validation.js:205`). That is `a + b - eta' b` at `eta'=1/2`. Under
the note's own text formula `a + b - eta'/2` the same input would give `7/4`. So the
table and the prose disagree, and the table is the correct one.

**Impact.** None on the verdict. `eta'=1/2 < 1`, so the corner remains unreachable by
any per-block bound that treats the `u`-sum absolutely; the note's conclusion is
correct, its ledger verdict line (`:9`) does not quote the number, and every affected
statement over-states the difficulty rather than under-stating it. But four live
statements and one validator assertion carry a wrong constant, and the validator's
"mechanical check" reproduced the error rather than catching it.

## DEFECT 2 (hypothesis violated on about half the grid the note counts)

**Where:** `research/left-divisor-signs.md:499-503` versus the lemma hypothesis at `:181`.

Lemma II is stated with `B_2 < N`, and its diagonal step at `:198` uses `B_2 < N <= u`
to force `b_1=b_2`. In §7 the box-level test is applied with `s_A = delta` and
`B_2 = x^{a-delta} = x^{6/25}` against `N = x^{nu+1/20}`, so the hypothesis requires
`nu > 6/25 - 1/20 = 19/100`. Reproducing the grid exactly (191x191 = 36481 boxes,
`Lemma II controls 9943`, `0 outside`), I get **4790 of those 9943 boxes with
`B_2 >= N`**, the lowest being `nu = 1/20`. On those boxes Lemma II's diagonal argument
does not apply and "Lemma II controls" is unsupported.

**Impact.** None on the verdict, and again conservative: over-counting the controlled
set can only make "0 of them lie outside the existing region" easier to satisfy. The
grid statistic `9943` is nonetheless not what it says it is. The `41/40` headline is
unaffected — the target box has `nu = 9/20 > 19/100`.

## DEFECT 3 (boundary strictness; one lattice point)

**Where:** `research/left-divisor-signs.md:254`, "every sector with `sigma<=3/100` is
controlled".

At `(rho,sigma) = (6/25, 3/100)` the grouped cross budget is exactly
`167/200 + 3/25 + 9/200 = 1` and Lemma II's `E_2` is exactly
`289/400 + 6/25 + 3/80 = 1`. Neither is `<1`, so with the fixed strict margin the note
requires everywhere, that sector is not controlled. On the note's own 201x201 sector
lattice, exactly **1** of the 885 uncontrolled points has `sigma <= 3/100`, and it is
that one. Prose and validator disagree by one point. The intended claim — the deficit
needs `q > x^{3/100}` — survives with `sigma <= 3/100` read strictly, or `rho < 6/25`.

## Decisive steps that CHECK

| step | claim | status |
|---|---|---|
| §1 coefficient structure | `A_0`, first term of `A_1` supported in `I`; only the prime-power term reaches `l<=2DW`; it is exactly `(mu . ^{-s}1_I) * (Lambda 1_{[2,W]})` | **CHECKED** against `grouped-divisor-moment (13)`. |
| §1 obs. 3, `g=2` | `r=2^k` gives `m = d 2^{k-1}` linear in `d`; `r` odd forces `2|d`, `d=2d'`, `m=d'r` | **CHECKED.** `r` odd and `r | 2m` gives `r|m`, hence `d=l/r=2(m/r)` is even. |
| §1 sector parametrisation | `M ~ x^{delta+rho}`, `N ~ x^{nu+sigma}`, O(1) values of `R` per dyadic `m`-box, `O(log^2 x)` sectors | **CHECKED.** |
| **Lemma I derivation** | `<< x^eps f(1+v) BC [A_1 N^{3/2} + M 1_{M>=N/2}]` | **CHECKED line by line.** `k = sigma theta h abar` with `abar` a unit gives `G=(k,u)<=2(h,u)`; `TV_b(Phi(ab)) = int_{J}|Phi'| << f(1+v)` by change of variable; `sup+TV << f(1+v)`; `(7)` applies to every subinterval, so the `b`-range `J_a` (an interval, cut by the sharp `ab in I`) is legal; `sum_h |c_h|(h,u)^{alpha} << C tau(u)` from (9) with `|c_h|<=C/A`; `sum_u |b_u| sqrt u tau(u) << B x^eps N^{3/2}`; `sum_a |c_a| << A_1 x^eps` and `sum_a |c_a| M/a << M x^eps`. Period term absent iff `2M < u` for all `u~N`, i.e. `M<N/2`. |
| §2 twist-height obligation | `residual-coverage §4` separates cuts at `T_P = x^{10}`; `TV_{b~B}(b^{-s}) >> |Im s|`, so Lemma I costs `x^{10}` there | **CHECKED.** `T_P=x^10` confirmed at `research/residual-coverage.md:283`; `d/db(b^{-s}) = -s b^{-s-1}` integrates to `~|s|` over `b~B`. The obligation is real and correctly flagged as undischarged. |
| §2.1 Vaughan for `mu` | `mu = mu_{<=U} + mu*(delta - 1*mu_{<=U})`, only Type II pieces | **CHECKED** (`mu*1*mu_{<=U} = mu_{<=U}`). |
| §2.1 Heath-Brown for `mu` | `mu = sum_{j<K} M_z*(delta - 1*M_z)^{*j}` below `z^K`; `<=K` Mobius variables of length `<=z`, `<=K-1` variables of coefficient 1 | **CHECKED.** `(delta - 1*M_z)` vanishes at 1 and is supported on `m>z`, so its `K`-fold convolution is supported above `z^K`. |
| §2.1 Lemma I threshold | decisive iff `alpha_1 < 1/4`, i.e. iff one 1-variable exceeds `x^{31/100}`; Cauchy exponent `a/2=7/25` | **CHECKED** (`14/25 - 1/4 = 31/100`). |
| §2.1 Lemma II window | controls iff `min(s_A,s_B) in (3/25, 19/100)` | **CHECKED.** Term 1 gives `s_B > 3/25`, term 2 gives `s_B < 19/100`, term 3 is `81/100` always. Assigning the smaller factor to `B_2` is optimal. |
| §2.1 leftover configuration | `m = n_1n_2`, both 1-variables at `7/25`: subset sums `{0, 0.28, 0.56}`, none in `(0.12,0.19)`, none above `0.31` | **CHECKED.** This is a genuine dyadic block of the decomposition (all Mobius variables `O(1)`), so the counterexample is real, and the coefficient there is divisor-like with no Mobius structure to exploit. |
| **Lemma II derivation** | `<< x^eps f(1+v)^{1/2} BC N [A_2B_2^{1/2} + A_2^{1/2}B_2N^{1/4} + A_2B_2N^{-1/2}]` | **CHECKED line by line.** Cauchy in `a` removes `x_a` and the twist `a^{-s}`, so the surviving weight `F(a)=Phi(ab_1)conj(Phi(ab_2))` obeys (6) — this is exactly why the bound is uniform in the Perron heights, and the claim is correct. The gcd identity `bbar_1 - bbar_2 = bbar_1 bbar_2 (b_2-b_1) (mod u)` is exact, so `(bbar_1-bbar_2,u)=(b_1-b_2,u)`; `G' <= 2(h,u)(b_1-b_2,u)`. The `(h,u)` factor suppressed in the collected display at `:207` is correctly recovered as `(h,u)^{1/4}` after taking the square root, which is why the `h`-sum uses `alpha=1/4`. All three terms reproduce: `N A_2 B_2^{1/2}`, `N^{5/4}A_2^{1/2}B_2`, `N^{1/2}A_2B_2`. |
| §4 grouped sector budgets | zero `33/50+rho/2`, cross `167/200+rho/2+3sigma/2`, period `8/25+rho`; only cross reaches 1; (1) `rho+3sigma<33/100` | **CHECKED in exact rationals** against `grouped-divisor-moment (14)`'s `(1+a)/2`, `a/2+3b/2`, `a`. Top values `39/50`, `103/100`, `14/25`. |
| §4 Lemma II sector budgets | `E_1=77/100+sigma+rho/2`, `E_2=289/400+rho+5sigma/4`, `E_3=109/200+rho+sigma/2`; (2) `rho+5sigma/4<111/400` | **CHECKED in exact rationals.** Top values `47/50`, `41/40`, `81/100`. |
| §4 crossing and survivors | crossing at `sigma=3/100`; at `sigma=1/20` survivors `43/200 <= rho <= 6/25`; worst block `41/40` vs `103/100`; deficit `3/100 -> 1/40` | **CHECKED** (modulo DEFECT 3 at the single boundary point). Suprema are attained at the top corner because both budgets increase in `rho` and `sigma`. |
| §4 moment-currency remark | `3/50 -> 1/20`, "only indicative" | **CHECKED and correctly hedged.** Block `= F * M^{1/2}` gives the factor-2 conversion; the note is right that Lemma II is not a second moment. |
| §5 corner table | grouped `1,2,1`; Lemma I `>=3/2`; Lemma II best `15/8`; BC/Wright `15/8`; per-block sqrt `3/2` | **CHECKED.** Lemma II's corner optimum is at `s_B=1/4` where `2-s_B/2 = 7/4+s_B/2 = 15/8`. |
| §5 BC/Wright pricing | target box prefactor `x^{1/2}`, brackets `399/400` and `129/125`; corner `11/8` and `9/5` over prefactor `1/2`, max `15/8` | **CHECKED, and the normalisation is self-consistent once one notices `||nu||_2 ~ C A^{-1/2}` (since `|c_h|<=C/A`) and `A ~ MN/x`.** All four numbers reproduce exactly on that reading; the note does not state the normalisation, which cost me a pass to reconstruct. |
| §5 left budgets | swap gives `3/4, 109/100, 1/2` at the target box and `1,2,1` at the corner; left Lemma II `207/200, 39/40, 39/50` | **CHECKED in exact rationals.** |
| §5 level-of-distribution remarks | `M/u = x^{3/50}` complete periods; `u = M^{25/28}`; `N sqrt u = x^{3/2}` at the corner | **CHECKED.** |
| §6 target-box `eta'` | `eta' > 3/25` at the target box against ceiling `14/25`, factor `14/3 = 4.67` | **CHECKED** (this is the case where the note's formula is right). |
| §6.1 Wright subdyadic pricing | `29/100 + 71/200 + (133/250 - 1/50) = 1157/1000`, strictly worse; net loss `K^{3/5}` | **CHECKED arithmetically** (`0.29+0.355+0.512 = 1.157`). The `K^2` applications against `K^{-1}` in norms and `K^{-2/5}` in the bracket is right. |
| §7 grid | 36481 boxes, 9943 controlled, 0 outside `delta+nu<19/25`, `5delta+2nu<123/50`, `delta+3nu<161/100` | **CHECKED — reproduced exactly** on an independently written grid. (See DEFECT 2 for what "controls" means on 4790 of them.) |
| §7 box-level conditions | `b+a-(a-delta)/2<1`, `(5/4)b+a-delta/2<1`, `a+b/2<1` | **CHECKED** as the substitution `s_A=delta`, `s_B=a-delta` into Lemma II. |

## Imported theorems in Note C

| source | what is used | status here |
|---|---|---|
| Pascadi, Lemmas 3.2-3.3 (via `grouped-divisor-moment §3`) | Ramanujan `|S(0,r;c)|<=(r,c)` and composite-modulus Weil `|S(t,r;c)| << c^eps sqrt(c(t,r,c))`, and the completion bound (7) | **NOT RE-VERIFIED at source.** Inherited from an earlier note; the review scope here is Note C's use of them, which is correct. |
| `grouped-divisor-moment` (1),(3),(6),(7),(9),(13),(14) | the moment, the endpoint displays, the completion bound, the gcd averages, the coefficient shape, the block budgets | **CHECKED that Note C quotes them correctly**, including that (1),(3) are stated for arbitrary `M,N,A>=1` and arbitrary bounded `b_u`, and that (7) is stated "for every subinterval" — which Lemmas I and II both need. |
| Fouvry-Kowalski-Michel, Duke 163 (2014), Thm 1.7 | `eta<1/24` ceiling, prime modulus, non-exceptional isotypic trace weight | **NOT REACHED** (I did not fetch it). The note's arithmetic `1/48` vs `3/25` short by `144/25` is internally consistent; its own recorded failing hypothesis (`p` prime) stands. |
| Wright, arXiv:2608.27732v1, Thm 2.1 | the subdyadic form of Bettin-Chandee Thm 1 | **NOT REACHED.** At `eta=0` the stated bracket does reduce to `(AMN)^{7/20}(M+N)^{1/4}` as claimed, which is a consistency check but not a source check. |
| Guria, arXiv:2410.10856v2, Thms 1.2-1.3 | the determinant asymptotic with one arbitrary weight and one prime variable | **NOT REACHED.** The three recorded reasons it does not apply (two weight-1 variables, prime variable not ours, error `X^{7/4}` against a needed `x/log^K x`) are internally coherent. |

## What I did not check for Note C

* The upstream reduction to `sum_m A_left(gm) Y(m)` — the note flags this as its
  unreviewed dependency and it remains unreviewed. If it is wrong, everything in the
  note changes.
* The four literature sources above at their primary texts.
* `endpoint-fourier §2 (4)-(5)`'s convolution identity beyond the note's restatement.
* The `191x191` grid boundary strips, which the note itself says were not examined.
* Whether the `(rho,sigma)` parametrisation exhausts the sectors of the target box
  (the note flags this as falsifier (b), checked finitely for four `(D,W)` pairs only).

---

# Custody

| script | run | `embed.js --check` |
|---|---|---|
| `research/mobius-bv-validation.js` | exit 0, 8 parameter sets, 800000 pointwise identity checks | code-sha256 matches, body matches out-sha256, out-sha256 matches |
| `research/determinant-corollary-validation.js` | exit 0, 28 checks passed, 4/4 negative controls fired | all three match |
| `research/left-divisor-signs-validation.js` | exit 0, 82 exact rational assertions, 6 negative controls fired | all three match |

No repository file was modified. Scratchpad artefacts:
`wave-0906/indep.js`, `wave-0906/indep2.js`, `kouk.pdf/.txt`, `bc.pdf/.txt`, `gs.pdf/.txt`.

# Recommended dispositions

1. **Note C, DEFECT 1:** correct `2(a+b-1)` to `(a+b-1)/b`, `eta'>2` to `eta'>1`, and
   "four times" to "twice", in `left-divisor-signs.md:290-293, :327, :362, :517` and in
   `left-divisor-signs-validation.js:216-221`. The conclusions do not move.
2. **Note C, DEFECT 2:** either add `nu > 19/100` to the §7 grid statement, or report the
   two counts separately (boxes where the hypothesis holds; boxes claimed). Say
   explicitly that the over-count is conservative for the "0 outside" conclusion.
3. **Note C, DEFECT 3:** state `sigma < 3/100` (or `rho < 6/25` at `sigma = 3/100`) at
   `:254`, matching the validator.
4. **Note C, presentation:** state the norm normalisation `||nu||_2 ~ C A^{-1/2}` and
   `A ~ MN/x` used in the BC/Wright pricing; without it the four numbers are not
   reconstructible from the note.
5. **Note A:** the theorem numbers are now confirmed against the author's preliminary
   version by a second reader; the caveat about the printed book should stay.
6. **Note B:** add the one-line reason DFI 1995 is contained in Bettin-Chandee
   (`(1/40)S - (1/48)max >= 0`), since the coefficient comparison alone does not give it;
   and say that the Perron separation is applied inside a fixed dyadic box.
7. All three notes: `OUTCOMES.md` should record that this adversarial pass ran, what it
   found, and that Note C's headline `41/40` and "zero added region" survive it.
