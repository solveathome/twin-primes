# Adversarial review: grouped-divisor-moment.md (1)-(20)

**NO DEFECT FOUND IN SCOPE.**

Scope: the derivation written in `research/grouped-divisor-moment.md` equations
(1)-(20), its internal quantifiers, and the arithmetic of the regions and cuts.
This review does **not** certify the upstream twin reduction. It does not verify
that the actual arithmetic residual has the form `Sum_m A_left(g m) Y(m)` with
`Y` as in (1); that structural claim lives in `endpoint-fourier.md`,
`residual-coverage.md` and `signed-divisor-grouping.md` and is listed below as an
unreviewed dependency. If that reduction is wrong, every budget in §4-§6 changes,
and nothing in this review would catch it. Twin-prime infinitude and the
sufficient signed margin remain OPEN; this note claims neither.

Review date 2026-09-06, against the working tree at commit `6e4a4fc`.

## Pressure points

| # | Status | Decisive inequality / failure | Exact quotation from the file |
|---|---|---|---|
| (a) | CHECKED | `R=0 <=> h1*l2=h2*l1 <=> h_i=t*l_i` by `(l1,l2)=1`. Count: for `k=max(l1,l2)` at most `2k-1<=2k` ordered coprime pairs, `j<=2N/k`, `t<=2A/k`, so `Sum_k 2k*(2N/k)(2A/k)=8NA*H_K`, `K=floor(2min(N,A))`. Only the **upper** endpoints `u_i<=2N`, `h_i<=2A` are used, so the closed band `H c [A,2A]` in (1) is covered even though audit (4) is stated for `(A,2A]`. Contribution `<= B^2 (C/A)^2 * 8NA*H_K * M f^2 = B^2C^2 f^2 (MN/A) H_K`. Distinct `u1!=u2` collisions are inside the parametrisation (`j=(u1,u2)` is recovered from `(l1,l2)=1`), so nothing is missed. Brute force over all `1<=N,A<=40` (1600 pairs, closed `h`-band): max count/bound `= 0.1667`. | "The same note's count gives at most 8*N*A*H_floor(2*min(N,A)) such ordered pairs. Since \|F\|<<f² and \|I\|<<M, their total absolute contribution to the moment is ... All collisions are included, also those between different divisors." (lines 93-102) |
| (b) | CHECKED | Write `Phi=e(h z0'/(gmu))(1-e(h(z'-z0')/(gmu)))`; `\|1-e(y)\|<=min(2,2pi\|y\|)` with `\|y\|<=2Ax/(MN)=2v` gives `\|Phi\|<<min(1,v)=f` in **both** cases. Each exponential has derivative `<=2pi h\|z\|/(g t^2 u) <= 4pi v/M`, so `\|Phi'\|<<v/M<<f(1+v)/M` for `v<=1` (`f=v`) and for `v>=1` (`f=1`). Product rule: `\|F\|_inf<<f^2`, `int_M^{2M}\|F'\|<<f^2(1+v)`. Partial summation against a bound valid *for every subinterval* `I'` costs exactly `\|F\|_inf+TV(F) << f^2(1+v)`; (7) is stated for every subinterval, so this is legitimate. Numerical sweep over `x,M,N,A,g` and random `u_i,h_i,z`: max `(\|F\|_inf+TV)/(f^2(1+v)) = 9.03` (bounded; the derivation's constant is `O((4pi)^2)`). | "To verify the factor f, write Phi=e(h*z0'/(gmu))*(1-e(h*(z'-z0')/(gmu))). When v<=1 this gives \|Phi\|<<v and \|Phi'\|<<v/M; when v>=1 it gives \|Phi\|<=2 and \|Phi'\|<<v/M." (lines 113-116) |
| (c) | CHECKED (mathematics); ASSUMED-UNVERIFIED (Pascadi lemma numbering) | Complete periods: `Sum_{a mod c}^* e_c(r abar) = c_c(r)`, and `\|c_c(r)\| = phi(c)/phi(c/(c,r)) <= (c,r)` since `phi(ab)<=a*phi(b)`. Count of complete periods `<= \|I'\|/c <= M/c`, giving `(M/c)G`. Partial interval of length `< c`: `Sum = (1/c) Sum_t hat1(t) S(t,r;c)`, `Sum_t \|hat1(t)\| = Sum_t min(len, 1/(2\|t/c\|)) << c log 2c`, and `\|S(t,r;c)\| <= tau(c) sqrt(c(t,r,c)) <= tau(c) sqrt(cG)`; product `<< c^eps log(2c) sqrt(cG)`, absorbed into `x^eps` since `c<=poly(x)`. **c>M**: no complete periods, the whole `I'` is the partial piece, bound `= x^eps sqrt(cG)` and the `MG/c` term is a harmless nonnegative addition. **c<M**: both terms present and both needed — dropping `MG/c` would be false (validator control `missingPeriod`). I verified the two classical inputs directly over 1,274,491 complete sums, `c<=300` composite, `r` up to `2c` including `r=0`, `r` nonprimitive: max ratio for `\|S(0,r;c)\|<=(r,c)` is **1.0000**; max ratio for `\|S(t,r;c)\|<=tau(c)sqrt(c(t,r,c))` is **1.0000**. The Springer DOI is behind an auth redirect (303 to `idp.springer.com`) from this fetcher, so I could not confirm that these are *Lemmas 3.2-3.3* of that paper — that is a statement about my fetcher, not about the source. The mathematical content is classical (Ramanujan sum; Estermann/Weil for composite modulus, Iwaniec-Kowalski Cor. 11.12) and is correct as used. | "The finite Fourier transform of an interval has total modulus O(c*log(2c)); (7) includes that cost. The term M*G/c is essential when M exceeds c." (lines 141-143) |
| (d) | CHECKED | `G=(sigma theta R, j l1 l2) = (theta R, c)` since `sigma=+-1`. `(ab,c)<=(a,c)(b,c)` (per prime, `min(v_a+v_b, v_c) <= min(v_a,v_c)+min(v_b,v_c)`) gives `G <= theta (R,j)(R,l1)(R,l2) <= 2(R,j)(R,l1)(R,l2)`. `R = h1 l2 - h2 l1 == h1 l2 (mod l1)`, so `(R,l1)=(h1 l2,l1)=(h1,l1)` by `(l1,l2)=1`; symmetrically `(R,l2)=(h2,l2)`. No coprimality of `j` to `l_i` is used, so shared prime powers are covered. Exhaustive check `j<=40`, `l_i<=25` coprime, `h_i<=25`, `theta in {1,2}`: 19,900,000 cases, 0 failures, max ratio `G/rhs = 1.0000`; 10,527,064 of those have `(j,l1 l2)>1`. Separate sweep restricted to `R!=0` with `c \| theta R` (the "nonzero numerator divisible by the modulus" class): 275,244 cases, 0 failures. | "It follows from (R,ab)<=(R,a)(R,b), and (R,ell1)=(h1,ell1), (R,ell2)=(h2,ell2). Prime powers shared by j and an ell_i therefore remain covered." (lines 151-153) |
| (e) | CHECKED | `(R,j)^a <= Sum_{d\|(R,j)} d^a`; a divisor `d` of a summation variable in `[J,2J)` satisfies `d<2J` and has at most `2J/d` multiples there (`J/d+1<=2J/d` for `d<=J`; count `<=1<=2J/d` for `J<d<2J`); hence `<= 2J Sum_{d\|R} d^{a-1} <= 2J tau(\|R\|)` for `0<=a<=1`. Same for `h` in the **closed** band `[A,2A]`: `d<=2A`, count `<=2A/d`, giving `2A tau(l)`. `tau(\|R\|)` requires `R!=0`, which the file states. The dropping-of-restrictions step is legitimate: `R=h1 l2 - h2 l1` genuinely does not involve `j`, and every quantity being summed is a nonnegative majorant, so enlarging the `j`-range only increases it. Checks: (9a) 14,000 cases (`\|R\|<=200`, `J` dyadic to 64, `alpha in {0,.25,.5,.75,1}`), 0 failures, max ratio 0.7422; (9b) with the **closed** interval `[A,2A]`, 76,800 cases (`l<=400`, `A<=64`), 0 failures, max ratio 1.0000. | "For either inequality, dominate the gcd power by the sum of d^alpha over its common divisors... The first inequality is not used at R=0." (lines 163-167) and "For fixed ell1,ell2,h1,h2, the integer R is independent of j. Restrictions on j may now be dropped after taking a nonnegative upper bound." (lines 172-174) |
| (f) | CHECKED | `Sum_{J<=j<2J} sqrt(j*2(R,j)(h1,l1)(h2,l2)*l1l2) <= sqrt(2)*sqrt(2J)*(2J tau(\|R\|))*sqrt(l1l2(h1,l1)(h2,l2)) = 4 J^{3/2} tau(\|R\|) sqrt(...)`; the displayed constant 4 is exactly right. `\|R\|<=8AL<=poly(x)` and `R!=0`, so `tau(\|R\|)<<_eps x^eps` (the standing hypothesis at lines 27-28 supplies the fixed power). Harmonics with `alpha=1/2`: `(C^2/A^2)(2A tau(l1))(2A tau(l2)) = 4C^2 tau(l1)tau(l2)` — the `A` cancels exactly, matching (10)'s lack of `A`-dependence. `sqrt(l1l2)<=2L`, `O(L^2)` pairs, so `<< x^eps J^{3/2} L^3 = x^eps N^3/J^{3/2}`. **Band `L` when `L<1`:** `u_i in (N,2N]`, `j in [J,2J)` forces `l_i in (N/(2J), 2N/J] = (L/2,2L]`, and a nonempty band needs `j<=2N`, i.e. `L=N/J>=1/2` (equality attainable when `2N` is a power of 2, forcing `l1=l2=1`). With `L>=1/2` the count of `l` values is `<=2L` with an absolute constant, so `O(L^2)` is correct there. Geometric sum over dyadic `J>=1` gives `<< N^3`. | "Split j into dyadic bands [J,2J). Put L=N/J; the ell_i lie in (L/2,2L], with L>=1/2 on any nonempty band." (lines 169-171) |
| (g) | CHECKED | `Sum_{J<=j<2J} M G/(j l1 l2) <= (2M (h1,l1)(h2,l2)/(J l1 l2)) Sum_j (R,j) <= 4M tau(\|R\|)(h1,l1)(h2,l2)/(l1 l2)` — the displayed constant 4 is right, using (9) at `alpha=1`. Harmonics at `alpha=1`: `(C^2/A^2)(2A tau(l1))(2A tau(l2))`, again `A`-free. `Sum_{l in (L/2,2L]} 1/l = O(1)` uniformly, including `1/2<=L<=1` where the range is `(1/4,2]` and the sum is at most `1+1/2`. Hence `<<_eps M x^eps` per band, `O(log N)` bands. | "The sum of 1/(ell1*ell2) over the dyadic ell ranges is O(1), also when L lies between 1/2 and 1." (lines 199-200) |
| (h) | CHECKED | Summing (10) over dyadic `J>=J0` gives `<< N^3/J0^{3/2}` (geometric, decreasing) and (11) over `O(log N)` bands gives `M x^eps`; multiply by `B^2 f^2(1+v)`. Validity "for arbitrary restrictions" is exactly the nonnegativity point: every step from (7) onward bounds `\|K\|` termwise by a nonnegative majorant, and `\|Sum_S z_p\| <= Sum_S \|z_p\| <= Sum_{all} \|z_p\|` for any `S`. The file states the correct non-claim that this does not make a restricted signed cross term nonnegative. | "It is valid for arbitrary restrictions on those pairs. It is not an assertion that a restricted signed cross term is itself nonnegative." (lines 220-221) |
| (i) | CHECKED for the coefficient bounds and the Cauchy cost; ASSUMED-UNVERIFIED for the reciprocity/orientation claim | `\|A_0\| = \|mu(l)\| l^{-Re s} 1_I <= 1` for `Re(s)>=0`, independent of `Im(s)`. `\|A_1\| <= log l + Sum_{r\|l, r<=W} Lambda(r) <= log l + Sum_{r\|l} Lambda(r) = 2 log l`, again independent of `Im(s)`. Support: first term `1_I(l)` with `I c (D,2D]`; second term needs `l/r in I` and `r<=W`, so `l < 2DW`. First Cauchy: `(Sum_{m~M}\|A_left(gm)\|^2)^{1/2} <= (M * (2 log 2DW)^2)^{1/2} << sqrt(M) log x`. Feeding (3) into `F*sqrt(M-moment)` gives exactly (14). `g=2` and even reduced indices: (2) was derived for **arbitrary** complex `b_u` on `(N,2N]` with no squarefree/odd/coprimality assumption, so the branch is covered — checked against §§1-3, nothing there uses the arithmetic of `u`. The left orientation ("phase sign reversed and **both** counted endpoints shifted by 2; it swaps M,N") is *admissible* under (1)'s hypotheses (`sigma in {-1,1}`; `z0'=x/2-2`, `z'=z-2` satisfy `\|z0'\|,\|z'\|<=x`, `\|z'-z0'\|<=x`), but that the actual left object reduces to that form is an upstream inverse-reciprocity derivation I did not check. | "Their bounds \|A0\|<=1, \|A1\|<=2*log ell hold independently of Im(s), because sum_(r\|ell) Lambda(r)=log ell." (lines 236-237); "The left orientation is obtained by inverse reciprocity, with phase sign reversed and **both** counted endpoints shifted by 2; it swaps M,N in (14)." (lines 257-259) |
| (j) | CHECKED | Recomputed in exact rationals, independently of the repo validator. `a=delta+6/25`, `b=nu+1/20`. `(1+a)/2<1 <=> a<1 <=> delta<1-6/25=19/25`. `a/2+3b/2<1 <=> delta/2+3nu/2 < 1-3/25-3/40 = 161/200 <=> delta+3nu<161/100`. `a<1` repeats the first. So (15) is correct. Left (swap `a,b`): `b/2+3a/2<1 <=> nu/2+3delta/2 < 1-1/40-9/25 = 123/200 <=> 3delta+nu<123/100` (my first script mis-transcribed this constant; recomputed by hand and by a corrected script, both give 123/100, matching the file). Containment: `3delta+nu<123/100 => 5delta+2nu = 2(3delta+nu)-delta < 246/100-delta <= 222/100 = 111/50 < 123/50` using `delta>=6/25`; also `nu<51/100` so `b<1`. (16): `a=16/25`, `b=9/20` give `41/50, 199/200, 16/25` — exact match. `delta=nu=2/5` satisfies (15) with margins `9/25` and `1/100`. | "The left condition 3delta+nu<123/100 is already contained in the old left region: 5delta+2nu<246/100-delta<=222/100<246/100." (lines 281-283) |
| (k) | CHECKED for the separation logic and arithmetic; ASSUMED-UNVERIFIED for the density lemma it invokes | De Morgan is right: (19) is exactly the complement of `A u B u C` with `C={d<=floor(x^{151/200}), de^3<=floor(x^{321/200})}`, so `E_* - E_dagger` is the mass on `C \ (A u B)`, expanded by inclusion-exclusion into at most four simultaneous cuts. Twists: `d^{-s}` (from `C`'s first cut), `d^{-t}e^{-3t}` (second cut), `d^{-s'}e^{-s'}` (`A`), `d^{-5s''}e^{-2s''}` (`B`); the total is `d^{-S} e^{-T}` with `Re S, Re T >= 0` because every Perron line has `Re = 1/log x > 0`, which is exactly the hypothesis `Re(s)>=0` under which `\|A_0\|<=1, \|A_1\|<=2 log l` were proved — so the moment is uniform in all four heights. Each `int \|ds\|/\|s\|` on `Re s = 1/log x`, `\|Im s\|<=x^{10}` is `O(log x)`, and `\|(K+1/2)^s\| = (K+1/2)^{1/log x} = O(1)` for polynomial cuts, so four integrals cost `O(log^4 x)`. Pointwise indicator error `O((K+1)/T_P)` with the half-integer shift giving `\|log((K+1/2)/q)\| >> 1/(K+1)` for integer `q`. Total separation error: `max(3/4, 49/20, 151/200, 321/200) = 49/20`, so `O(x^{2+49/20-10} log^C x) = O(x^{-111/20} log^C x)` — the exponent in the file is correct. Boxes meeting `C` have `delta<=151/200` and `delta+3nu<=321/200` from the **lower** dyadic endpoints, and the `2^{O(1)}` box constants and floors cost `O(1/log x)` in the exponent, absorbed by the fixed gaps `1/200` on each cut. Worst budgets on `C` recomputed exactly: zero `<= 399/400`, cross `<= (321/200)/2 + 3/25 + 3/40 = 399/400`, period `<= 199/200` — all three match the file. Rectangles with a fixed strict margin give a power saving `x^{1-eta}` times `O(log^2 x)` boxes and `O(log x)` harmonic bands, hence `O_H(x/log^H x)` for every fixed `H`. Untwisted density: at fixed `e` each of `C, C n A, C n B, C n A n B` is an initial `d`-segment (min of `floor(x^kappa)`, `floor(x^lambda)/e^3`, `x^{3/4}/e`, `(x^{49/20}/e^2)^{1/5}`, clipped to `(U,D0]`), which is the shape the excluded-prime Mobius lemma needs — but that lemma itself lives in `signed-divisor-grouping.md` and I did not check it. | "The old cuts are A={de<=floor(x^(3/4))} and B={d^5*e²<=floor(x^(49/20))}. All intersections with C have at most four Perron integrals, still only logarithmic cost." (lines 330-333); "Thus the untwisted density bound applies directly before separation." (line 340) |
| (l) | CHECKED | Exact rationals: `delta+nu = 8/25+11/25 = 19/25`, **not** `< 19/25`; `5delta+2nu = 62/25 = 124/50 > 123/50`; `delta+3nu = 41/25 = 164/100 > 161/100`. So the witness fails all three strict regions while having product exponent exactly `19/25`, and it lies in the original domain (`8/25 in [6/25,19/25]`, `11/25 in [1/20,19/20]`). Any uniform product cutoff `P > 19/25` would include `{delta+nu <= 19/25}` and therefore this point, so the file's conclusion follows — as a statement about the current estimate inventory, which is how the file words it. | "delta=8/25,nu=11/25 has delta+nu=19/25, while 5delta+2nu=62/25>123/50 and delta+3nu=41/25>161/100. It lies in none of the strict sufficient regions." (lines 379-381) |

Cross-check of §6, also exact: `a=14/25`, `b=1/2` give `39/50, 103/100, 14/25`;
`103/100 - 3/80 = 397/400`; the first-Cauchy threshold `a/2 + E/2 < 1` gives
`E < 2(1-7/25) = 36/25`; `3/2 - 36/25 = 3/50`. The `(delta,nu)=(8/25,9/20)` box
is genuinely in `W_dagger`: `de=x^{77/100}>x^{3/4}`, `d^5e^2=x^{5/2}>x^{49/20}`,
and although `d=x^{8/25}<=x^{151/200}`, `de^3=x^{167/100}>x^{321/200}`. All match
the file.

## Imported theorems, hypotheses, and whether they are satisfied here

| Import | Primary source as cited | Hypotheses | Satisfied here? |
|---|---|---|---|
| `\|S(0,r;c)\| <= (r,c)` (Ramanujan sum) | Pascadi, Lemma 3.2, Springer GAFA DOI `10.1007/s00039-026-00746-0`, "checked 2026-09-06" | `c>=1` any positive integer, `r` any integer | Yes. Applied with `c=j l1 l2` composite and `r=sigma theta R` possibly nonprimitive and possibly `0 mod c`. I verified the inequality independently over 1.27M complete sums (`c<=300`, `r<=2c`): max ratio 1.0000. The lemma **numbering** is unverified — the DOI 303-redirects to `idp.springer.com` from this fetcher, so I could not read the paper. The statement is classical regardless. |
| `\|S(t,r;c)\| <<_eps c^eps sqrt(c (t,r,c))` (Weil/Estermann for composite modulus) | Pascadi, Lemma 3.3, same DOI; `prime-dispersion.md` line 172 attributes it to Iwaniec-Kowalski Cor. 11.12 plus the divisor bound | `c>=1` any positive integer; no primitivity of `t,r`; the `c^eps` comes from `tau(c)` | Yes. Applied at composite `c` and at `t` running over all residues including `t=0`. Verified independently in the sharper form `\|S(t,r;c)\| <= tau(c) sqrt(c(t,r,c))`: max ratio 1.0000 over the same sweep. Numbering unverified, as above. |
| Interval completion `(7)` | Derived in `prime-dispersion.md` §4, (10)-(11), from the two bounds above | Interval of length `<= M`, any position; `(m,c)=1`; `\|hat 1\|_1 << c log 2c` | Yes, and `prime-dispersion.md` explicitly retains the `M>c` case ("This argument also handles M>c"). Its derivation is internally correct as far as I checked it. |
| Truncated Perron with half-integer shift | `residual-coverage.md` §4, (14) | integer argument `q`; `T_P=x^{10}`; `c=1/log x`; polynomially bounded cut `K` | Yes. The three quantitative ingredients (`\|u\|>>1/(K+1)` from integer spacing, `exp(cu)=O(1)` for polynomial `K`, tail integration by parts) are stated and correct. The extension from the two-cut product-error remark to a four-cut product is asserted, not written out; the three-term expansion with `\|P_K\|<=1+O((K+1)/T_P)` is routine but is not in the file. |
| Full positive Vaaler majorant bound | `endpoint-pairing.md` §5, (12)-(13) | all nonzero original divisor indices `> 2`; `1<=w=8P/(T+1)<=x` | Plausible and the two side-conditions are checked in the file (`w = 8MN/(T+1)` lies in `[1, O(x^{1-2tau})]` for retained boxes; original divisors exceed `2` since `d>U=x^{6/25}`, `e>Y=x^{1/20}`). I read the argument but did **not** audit its input `D_T(v) <= min(1/2, 1/(8(T+1)^2 \|\|v\|\|^2))`, which comes from `endpoint-fourier.md`. |
| Uniform excluded-prime Mobius mean (untwisted density) | `signed-divisor-grouping.md` | fixed `e`; `d`-interval with lower endpoint `>= U/2`; polynomially bounded exclusion parameter | Not reviewed. The file states the interval shape is produced correctly by the cuts, which I did check; the lemma itself I did not. |
| Exact convolution identity for `A_0, A_1` | `endpoint-fourier.md` §2 | — | Not reviewed. |

## Unreviewed dependencies

1. **The reduction that produces `Sum_m A_left(g m) Y(m)`.** Everything in §4-§6
   assumes the residual's expanded blocks have exactly the shape (1) with a
   *separate* left coefficient in `m` and a *separate* right coefficient in `u`,
   the harmonic weight depending only on `h`. If the real object couples these
   (the file itself warns about coupled `(u_i,h_i)` weights at lines 421-424, in
   a different context), the first Cauchy step and every budget change. This is
   the single largest thing I did not check.
2. The inverse-reciprocity derivation for the left orientation, including the
   claim that it swaps `M,N` and shifts both endpoints by 2.
3. `signed-divisor-grouping.md`'s uniform excluded-prime Mobius lemma and its
   (17)-(18) CRT kernel, which is what `E_dagger` is *defined* to be.
4. `endpoint-fourier.md` §2's convolution identity and its Fejer/`D_T` bound.
5. `residual-coverage.md`'s `O(x^2 log^C x)` total absolute endpoint mass and its
   (16)-(17), i.e. the reduction `S(x)=C_2 x + E_*(x) + O_H(x/log^H x)` on which
   (20) is built.
6. The `§6` cross-references to older budgets ("the old left cross budget is
   101/100 and the old right zero budget is 201/200") — not recomputed.
7. `grouped-divisor-validation.js` beyond reading it: I re-derived (4), (8), (9)
   and the two Kloosterman bounds myself rather than trusting it. I did notice
   its harmonic loop uses `h in [A,2A)` while the note's band is closed `[A,2A]`;
   I re-ran the check on the **closed** band (76,800 cases) and the inequality
   still holds, so this is a gap in the validator's coverage, not in the note.

## Calibration

- Rung for the §§1-3 moment: **derived**, and now independently re-derived here
  line by line, with (4), (8), (9a), (9b) and the two classical Kloosterman
  inputs verified numerically as well. That is a checked argument, not a
  refereed theorem.
- Rung for (15)-(20): **derived, conditional on the six unreviewed dependencies
  above**. The arithmetic and the separation logic are correct as written.
- All numbers I quote from my own scripts are **measurements** on the stated
  finite ranges, in `scratchpad/wave-0906/check{1..6}.js`. They cannot establish
  an asymptotic rate or an implied constant; they can only fail to falsify.
- What would falsify the core claims, and whether it has run: an instance of
  (8) or (9) failing (ran, none found in the ranges above); a Kloosterman bound
  failing at composite `c` or `r=0` (ran, none found); an unbounded
  `(\|F\|_inf+TV)/(f^2(1+v))` ratio (ran, stayed at 9.03); a gross violation of
  (2) itself (ran a brute-force moment at `B=C=1`, `x<=5000`, ratio stayed at
  2.62 — this is weak evidence, since (2) carries `x^eps` and an implied
  constant). None of these is a test of the unreviewed reduction in item 1.

## Bookkeeping imprecisions (not defects, no line is wrong)

- (5), (10) and (11) are displayed with inconsistent coefficient bookkeeping:
  (5) suppresses `C^2`; (10) and (11) have already absorbed `C^2/A^2` through
  the harmonic averages but not `B^2`, which line 208 then restores. The final
  (2) is correct; the intermediate displays are not self-contained.
- (7) is never taken in `min` with the trivial per-pair bound `M`. In the regime
  `c >> M^2` the Weil term is worse than trivial. At the boxes actually used
  (`N=x^{1/2}`, `M=x^{14/25}`, `c<=x`) this costs nothing, so it is slack rather
  than error, and I am not proposing an estimate here — only recording that the
  `N^3` term is not claimed optimal.
- Line 333's four-cut product error is asserted from residual-coverage's
  two-cut remark; the expansion is routine but unwritten.

## Standing caveat

This is a local review of one note. It does not certify the upstream twin
reduction, does not bear on the sufficient signed margin in
`RESEARCH-HANDOFF.md` §3, and does not move the OPEN status of (21) or of
twin-prime infinitude. Finding no defect in (1)-(20) is not evidence that a
proof is near.
