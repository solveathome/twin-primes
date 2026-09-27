# Lane V2 report: second independent reading of three candidates (2026-09-08)

Reader: V2 (Fable agent), did not author any of the three derivations and
repaired none. Repo state when read: main at 1285d47 was the dispatch commit;
during this pass the handler committed 07ab47f (A), e90d49b (C) and 0735db9
(B), so all three notes are now committed. No repo file was edited by V2.
Scratch: /private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/9058ffd0-271d-4adc-bdd5-dabb0916b242/scratchpad/round-0908b/V2/
(fr-check.js, nonsqfree-mass.js, tao-notes3.html, wu2004.pdf, wu-p5-8.txt).

**What remains OPEN after this pass:** twin-prime infinitude, every sufficient
signed margin of RESEARCH-HANDOFF section 3, D^(e_1), Z_F^p beyond the sieve
constant, B_L^comp. None of the three candidates estimates any of these, and
none claims to.

Reading order followed: each proof was read and reconstructed before the
handler's sections 7, 8, 9 of research-round-validation.md; the comparison is
recorded per candidate.

---

## Candidate 1: centered-discrepancy-estimate.md section 3a (07ab47f)

    Lane / stable question id: V2 review of A / Q-centered-discrepancy-estimate
    Starting commit / report commit or shared-checkout paths: 1285d47 (dispatch); text read at 07ab47f; report in scratch V2/V2-report.md
    Disposition / exact claim / unproved hypotheses: VERIFIED WITHIN STATED SCOPE. Claim: T^top = O_(A,eps)(x log^-A x) for fixed A>0, 0<eps<1/50, e_1=floor(x^(1/2+eps)), ineffective constants. Unproved: nothing inside the claim; D^(e_1) untouched
    Changed step compared with the reviewed baseline: none proposed; two immaterial exponent slips noted (E_P triple count log^(L+3) not log^(L+2))
    Source theorem and first unmatched hypothesis, if any: Tao Notes 3 Theorem 17 read at the page on 2026-09-08 (terminal point, sup over reduced a, Delta against (1/phi(q)) sum_{(n,q)=1} Lambda, Q<=x^(1/2) log^-B x, x>=2); Exercise 20 is the prefix-sup form with the rounding hint. No unmatched hypothesis
    Validation command, falsifier, result and compute used: node research/centered-discrepancy-estimate-validation.js (15 s) and research-round-validation.js (0.2 s) rerun, all finite checks pass; no new finite check needed (the analytic steps are what carry the claim); no enumeration
    Independent reviewer / disposition (PENDING until actually reviewed): V2 / verified within stated scope; second reading after the handler's section 7
    Full-consumer payoff and unpaid complement: truncation only; D_y = D^(e_1) + O(x log^-A x); the fixed-endpoint signed discrepancy D^(e_1) >= -4x/25 + o(x) is the whole unpaid object
    Proposed shared-record changes / next bounded obligation: raise the note's calibration line to "read twice independently"; no other change

### What was reconstructed

Step 1 (3a.2)-(3a.4). The flip (4) was rederived from the definition of
T^top: mu(e)mu(em)log(e/(em)) = mu^2(e) 1_{(e,m)=1} mu(m)(-log m). For
e >= e_1, e_1 y > x/2 for large x, so a_e = ey and n > a_e is exactly m > y;
e <= Q is automatic from m > y. The power-of-two atom: em-2 = 2^a with
em in (x/2, x] forces em = x/2+2 (the only power of two in (x/2-2, x-2]),
tau(x/2+2) <= 2 sqrt x, giving (3a.2). Lambda_0(em-2) != 0 forces em odd, so
m, e odd; b odd is forced by b^2 | e. For fixed (b,g) the map e -> em is a
bijection onto {n in I_m : m[b^2,g] | n}; I_m = (l_m, x] with the integer
l_m = max(x/2, e_1 m - 1), so n = e_1 m is included (the first review's
defect 1 is repaired). The class 0 mod q for n gives -2 mod q for n-2, reduced
since q is odd.

Step 2. (3a.5): two prefixes, each with 2D(q); psi_0 vs psi costs at most
log x per prefix; the (n,q)=1 restriction in Tao's Delta costs
omega(q) log x / phi(q) <= log^2 x/phi(q). Local factor (3a.6): with
r = g[b^2,g] = b^2 g^2/(b,g) (g squarefree), rad(r) = rad(bg), (m',g)=1 gives
(m',r) = prod of primes dividing both m' and b, and the reciprocal totient
identity gives (p-1)/p there; h(p)=0 at p | 2g carries "m' odd, (m',g)=1".
Euler product (3a.7): the local factor at p not dividing 2bg is
1 - p^{-s}/(p-1); at p | b, p not dividing g it is 1 - p^{-1-s}, which is the
factor of 1/zeta(1+s), so eta vanishes there; at p | 2g it is 1. Dividing by
1/zeta(1+s) gives H exactly as displayed; eta(p^k) = p^{-k} - p^{-(k-1)}/(p-1)
= -1/(p^k(p-1)) at generic p, p^{-k} at p | 2g, 0 at p | b only. (3a.8): the
generic factor is 1 + 1/((p-1)(sqrt p - 1)), convergent; p=2 gives
(1-2^{-1/2})^{-1}; odd p | g gives at most (1-3^{-1/2})^{-1} < 2.37 < 4, so
K_g <= C_0 tau(g)^2 uniformly in b. H(0): (1-1/(p-1))/(1-1/p) = 1-1/(p-1)^2,
p=2 gives 2, p | g gives p/(p-1); H_{1,1}(0) = 2C_2.

(3a.9) and its proof. M_1: partial summation M_1(v) = M(v)/v + int_1^v M(t)t^{-2}dt,
the integral converges under M(t) << t log^-A t (A>1), the limit is the
convergent series sum mu(d)/d, and Abel's theorem for Dirichlet series
identifies it with lim_{s->1+} 1/zeta(s) = 0; the tail is O(log^{1-A} v),
which is O(log^-A) after renaming A. M_2: M_2(v) = M_1(v) log v -
int_1^v M_1(t)/t dt converges; the same Abel argument with
sum mu(d) log d d^{-s} = zeta'(s)/zeta(s)^2 -> -1 as s -> 1+ (zeta ~ 1/(s-1),
zeta' ~ -1/(s-1)^2) gives the value -1. Both steps are correct. P_0 = sum_k
eta(k) M_1(u/k) with the split at sqrt u; log(2u/k) >= (1/2) log u on
k <= sqrt u; sum_{k>sqrt u} |eta(k)| <= K_g u^{-1/4}. P_1: log m' = log d +
log k on dk = m'; sum_{k<=sqrt u} eta(k) = H(0) + O(K_g u^{-1/4});
log k <= 4 k^{1/4} (max of log k / k^{1/4} is 4/e). Uniform in b; tau(g)^2 in
g. Verified.

Step 3. (3a.10)-(3a.11): count of n in I_m with q | n is <= x/(2q)+1 for
q <= x and 0 for q > x; q >= m b^2 and q >= m b g; the "+1" terms are bounded
by the number of b with m b^2 <= x, i.e. sqrt(x/m), giving sqrt(xM) log^3 x =
x^{3/4-eps/2} log^3 x; sum_{m<=M, g|m} 1/m << (log M)/g. Both tails verified.
Multiplicity c(q) <= tau(q)^3 (m | q, then b^2 | q/m and g | q/m). E_P:
phi(q) >= phi(m) phi(b^2) since b^2 | [b^2,g]; the triple count gives
x^{1/2-eps} log^{L+3} x rather than log^{L+2}, immaterial.

(BV*). Theorem 17 confirmed at the page (text extracted from the LaTeX alt
attributes, scratch file tao-notes3.html): terminal point, sup over reduced
classes, Delta(Lambda 1_{[1,x]}; a (q)) defined against
(1/phi(q)) sum_{n<=x,(n,q)=1} Lambda(n), Q <= x^{1/2} log^{-B} x, B = B(A),
x >= 2. Exercise 20 is the sup_{y<=x} form, stated with the hint "round y to
the nearest multiple of x log^{-A-10} x, O(log^{A+10} x) values, then use the
original theorem as a black box". The note's derivation is exactly that hint
executed: the short piece (t',t] is bounded by 3 log x (delta/phi(q)+1) per q,
summing to delta log^2 x + Q_0 log x = O(x log^{-(A_1+8)} x); the grid has at
most log^{A_1+10} x points t' >= delta; Theorem 17 applies at x := t' with
Q_0 <= t'^{1/2} log^{-B} t' because x^{-eps} beats every logarithmic power;
log t' >= (1/2) log x so t' log^{-A_2} t' << x log^{-A_2} x; A_2 = 2A_1+12
gives x log^{-A_1-2} x. Verified. The trivial bound D(q) <= 4x log x/phi(q)
and the Mertens bound sum tau(q)^6/phi(q) << log^64 x (local factor
1 + 64/(p-1) + O(p^-2)) give (3a.14) by Cauchy-Schwarz. Verified.

(3a.15)-(3a.16). m = g m' with mu(m) = mu(g)mu(m'), mu(g)^2 = 1; the partial
sums A(t) are differences of two values of (3a.9) at u >= y/G >= x^{12/25}
log^{-L} x where log u >= (log x)/3; Abel's inequality for the positive
nonincreasing weight L(gm') gives the factor max L <= x/2; r >= (bg)^{3/2}
since (b,g) <= sqrt(bg), and 1/phi(r) << r^{-5/6} from r/phi(r) <= tau(r)
<< r^{1/6}; sum tau(g)^2 (1+log g)/(bg)^{5/4} converges. Verified.

Step 4. With L = A+5, A_3 = A+3, A_1 = 2A+68 each term of (3a.17) is
O(x log^-A x); the E_BV exponent is 1 + (65-2A-68)/2 = -A-1/2. Verified.

### Tests applied and their outcome

Missing endpoints: the inclusive n = e_1 m is in I_m; m = y is excluded on
both sides; the two prefixes of each progression sum are at t = x-2 and
l_m-2 >= 2. None missing. Reversed inequalities: none found. Incompatible
residue classes: q odd, class -2 reduced; even b excluded by the parity of e.
Dropped factors: mu(g)^2 = 1 and the log g term of log m are both carried.
Prime powers: Lambda includes them, Theorem 17 is for Lambda, powers of two
separated with an explicit bound. x-dependent constants: B, G, Q_0 depend on
x but every bound is uniform (K_g independent of b, the (b,g) sums converge
without B, G); the only x-dependence is the threshold x_0(A,eps). Hidden
estimate for Lambda(n-2)mu(n): none. The sign mu(m) enters only the main
term, where it is averaged by the q = 1 Mobius means (M1), (M2); BV is applied
with absolute values. No step needs the twisted sequence.

Comparison with the handler's section 7: agreement on every step. Section 7
does not mention the E_P exponent slip; it is immaterial.

Disposition: verified within stated scope, now read twice independently. It
is a truncation lemma; the consumer D^(e_1) >= -4x/25 + o(x) is untouched.

---

## Candidate 2: full-coefficient-average.md section 6.5, with 6.2 and 6.4(a) (e90d49b)

    Lane / stable question id: V2 review of C / Q-full-coefficient-average
    Starting commit / report commit or shared-checkout paths: 1285d47; text read at e90d49b
    Disposition / exact claim / unproved hypotheses: VERIFIED WITHIN STATED SCOPE. Claim (i): F_r = (-1)^(J_2+1) 35 h^4 C(n,J_2-1)(kappa + O(1/m)), |F_r| >= 2^(0.92 r) for large m; (ii): sup |F_L(s)| >= (log x)^(2/5) over W_L-smooth s <= x/W_L, hence any 1-bounded representation of F_L on that set has coefficient norm >= (log x)^(2/5). Only arithmetic input: PNT. Unproved: nothing inside the claim; no estimate for Rhat, E_dagger, D_y
    Changed step compared with the reviewed baseline: none proposed
    Source theorem and first unmatched hypothesis, if any: Tao Notes 2 Corollary 39 (PNT) for the prime supply; none unmatched
    Validation command, falsifier, result and compute used: node research/full-coefficient-average-validation.js (2.6 s) rerun, pass; independent exact BigInt recomputation of F_r from the raw alternating sum for m = 2..300 (scratch fr-check.js, 0.06 s): sign and magnitude agree with (i) for m >= 4, ratio to the kappa prediction 1.0158 (m=100), 1.0054 (m=300); the inequality |F_r| >= 2^(0.92 r) first holds at m = 130 (r = 4550) and fails at m <= 120 in this exact computation
    Independent reviewer / disposition (PENDING until actually reviewed): V2 / verified within stated scope; second reading after the handler's section 8
    Full-consumer payoff and unpaid complement: none; the proposition removes bounded-norm 1-bounded lifts on the full smooth set and adds no estimate
    Proposed shared-record changes / next bounded obligation: add the measured onset (m >= 130, i.e. r >= 4550, i.e. the (ii) threshold is x with log_2 log x of order 10^4) to the note's scope paragraph as a measurement; otherwise none

### What was reconstructed

Profile. global-smooth-majorant (2): chi(t) = 1 - 35t^4 + 84t^5 - 70t^6 + 20t^7
on (0,1), so S = 1 - chi is the C3 smoothstep with S'(y) = 140 y^3 (1-y)^3 and
S(y) + S(1-y) = 1; chi(1-y) = S(y) as used. max |chi'| = 140/64 = 35/16 at
y = 1/2.

6.2. (6): h_i = 0 on (-inf, w_i] and 1 on [w'_i, inf) with 0 < w_i < w'_i <
0.8, so c_{i,0} = (1/2)(int_{0.8}^2 h_i - int_{-1.2}^0 h_i) = 0.6. In (4) the
k = 0 term is -c_0 1_{s=1} because g_0(s) = prod_{p|s}(1-1) vanishes for s > 1,
so c'_0 = 2/5, and sum_k c_k = hper(0) = 0 gives sum_k c'_k = 1 = F_i(1).
(5): at primes n > W_i, D_i(n) = log n = Lambda(n); at composites that are not
prime powers Lambda = 0; at proper prime powers D_i is k log p (p > W_i) or 0
(p <= W_i) and the difference is Lambda(n), a O(sqrt x log^3 x) total; E_i
inside the exceptional budget. R_00 coefficient one: on W_L-rough n every
g_{L,k}(n) = g_k(1) = 1 and D_L(n) = log n; the (k,l) sum collapses to
(sum c'_{L,k})(sum c'_{R,l}) = 1.

6.4(a). 1_c = 1 - 1_prime; for prime n > W_L, G_{L,k,u}(n) = n^{iu/log x};
log x int psihat(u) n^{iu/log x} du = log x psi(log n/log x) = log n since
log n/log x is in [0,1] on J_x; the doubly-prime term is
sum_{n,n-2 prime} log n log(n-2) = S(x) + O(sqrt x log^2 x). So the expansion
returns S with coefficient one: reconstructed as stated.

6.5(i). f(j) = chi(35j/r - 11): 1 for j <= 11m, 0 for j >= 12m,
f(J_2 - l) = chi(1 - l/m) = S(l/m) with h = 1/m = 35/r. sum_j (-1)^j C(r,j) f(j)
= (-1)^r Delta^r f(0), Delta^r = Delta^{r-4} Delta^4, and (-1)^{r+n} = 1 with
n = r-4 gives F_r = sum_{m'} (-1)^{m'} C(n,m') g(m') with g = Delta^4 f; g
vanishes for m'+4 <= J_1 and m' >= J_2. Reindexing m' = J_2 - k gives the
displayed F_r = (-1)^{J_2+1} C(n,J_2-1) 35 h^4 sigma_r with
rho_k = prod_{i=1}^{k-1} (J_2-i)/(n-J_2+i+1), a product of decreasing factors,
first factor q_r = (12m-1)/(23m-2); q_r - 12/23 = 1/(23(23m-2)); the lower
bound rho_k >= q_r^{k-1}(1 - 2k^2/(11m)) from J_2-1 >= 11m and n-J_2+2 >= 11m.
Fourth differences: for 5 <= k <= m all five nodes (k-i)h lie in [0,1];
g_k = h^4 S''''(xi) with S'''' = 840(1 - 12y + 30y^2 - 20y^3), and
840(1-12y) <= S'''' <= 840 on [0,1] (20y^2 - 30y + 12 has discriminant
900 - 960 < 0; 10y^2(3-2y) >= 0), so 24(1-12kh) <= g_k/(35h^4) <= 24. For
k <= 4 the leading coefficients are the fourth differences of 35 y^4:
b = (1, 12, 23, 24) (checked: 16-4 = 12, 81-64+6 = 23, 256-324+96-4 = 24); the
next-order terms at k = 4 are 576h + 312h + 48h < 1600h for h <= 1/10, so
the constant 400 per unit k suffices. Junction terms m < k <= m+3 have
|g_k| <= 16 and are O(q_r^m m^4). kappa(q) = 1 - 12q + 23q^2 - 24q^3/(1+q);
at q = 12/23, 12q = 23q^2 = 144/23, and kappa = 1 - 41472/18515 =
-22957/18515. The error sum is O(1/m). Entropy: k/n = (12m-1)/(35m-4) exceeds
12/35 and is below 1/2, so H(k/n) >= H(12/35) = 0.9276 and
C(n,J_2-1) >= 2^{0.9276(r-4)}/(r-3); with 35h^4 = 35^5/r^4 the exponent gap
0.0076 r beats the polynomial factors. Verified.

6.5(ii). r = 35 floor(log_2 log x/70) gives 2^r <= (log x)^{1/2} and
r >= (1/2) log_2 log x - 35. P = x^{0.7/r} is huge, pi(2P) - pi(P) >= r by
PNT; 2P <= W_L for r >= 70; s <= 2^r x^{0.7} <= x^{0.71} <= x/W_L = x^{0.76};
s squarefree and W_L-smooth. Each exponent is within log 2/log x of 0.7/r, so
each subset exponent sum is within r log 2/log x of the equal-exponent value;
the rounded endpoints move the argument by O(x^{-0.22}/log x); the argument
scale is 1/0.02 = 50; Lipschitz constant 35/16, valid globally because chi is
constant outside (0,1). |F_L(s) - F_r| <= 2^r (35/16) 50 (r log 2/log x +
O(x^{-0.22})) <= 76 r 2^r/log x + o(1) -> 0 by 2^r <= (log x)^{1/2}. Since
|F_r| >= 1, |F_L(s)| >= |F_r|/2 >= 2^{0.92 r - 1} >= 2^{-34} (log x)^{0.46}
>= (log x)^{2/5}. A prime t in (x/(2s), x/s] exists and t > x^{0.29}/2 > W_L,
so s_L(st) = s. The norm statement is the trivial pointwise inequality
|F_L(s)| <= sum |lambda_j|. Verified.

### Independent finite check and one measured qualification

fr-check.js recomputes F_r exactly (BigInt, scaled by m^7) from the raw
alternating binomial sum, not through the junction identity. Results
(measurement): log_2|F_r|/r = 0.8299 (m=2), 0.8580 (4), 0.8772 (8), 0.8877
(12), 0.9099 (40), 0.9188 (100), 0.9200 (120), 0.9204 (130), 0.9212 (150),
0.9225 (200), 0.9239 (300). These reproduce the validator's 0.803/0.830/
0.858/0.877/0.888 at r = 35..420. The ratio |F_r| to 35 h^4 C(n,J_2-1)|kappa|
is 0.32 at m=2 (sign also disagrees there), 0.9985 at m=4, then
1.10, 1.09, 1.037, 1.016, 1.011, 1.008, 1.005 for m = 8, 12, 40, 100, 150,
200, 300, consistent with the O(1/m) error of (i); m = 2 is outside the
asymptotic regime and the proposition claims nothing there. The inequality
|F_r| >= 2^{0.92 r} holds at every tested m >= 130 and fails at every tested
m <= 120. So "for all sufficiently large m" in (i) is correct with onset near
m = 125, r near 4400; in (ii) this places the threshold at
log_2 log x of order 9 x 10^3, consistent with the note's own "astronomically
large". Not a defect; the note's scope paragraph could carry the number.

Tests applied: missing endpoints (the k-range 1..J_2 covers every nonzero
g, the extra terms vanish), reversed inequalities (H increasing on [0,1/2]
used in the right direction), dropped factors (the m^7 scaling and the 35h^4
normalisation are consistent), x-dependent constants (only the threshold),
prime-power contributions (s squarefree by construction; t prime). None found.

Comparison with the handler's section 8: agreement on every step; section 8
did not measure the onset of 0.92.

Disposition: verified within stated scope; read twice independently. It is
an obstruction to one route (bounded-norm 1-bounded lifts on the full smooth
set); it supplies no estimate and does not exclude density-one or
paid-growth representations.

---

## Candidate 3: joint-factor-estimate.md sections 2, 4, 5 (now committed at 0735db9)

    Lane / stable question id: V2 review of B / Q-joint-factor-estimate
    Starting commit / report commit or shared-checkout paths: 1285d47; text read in the working tree, since committed at 0735db9 unchanged
    Disposition / exact claim / unproved hypotheses: CORRECTION REQUIRED (source-hypothesis row) and, as it stands, CONDITIONAL ON A NAMED INPUT. Claim (4.4): R_F = C2 x H_delta - Z_F^p + o_delta(x). The Type I evaluation (4.3) applies Wu Lemma 2.3 to every odd modulus e <= W_R^2 carrying b_R(e); the published lemma sums over squarefree q only (nu*(q) = mu(q)^2 3^nu(q), read at the PDF). The non-squarefree moduli e = d p^k (p | d, or k >= 2) carry harmonic mass of order log W_R, so they are not paid by a trivial bound. Everything else in 4.2-4.4 verified
    Changed step compared with the reviewed baseline: none proposed by V2 (no repair); the defect is a missing discharge, not a false identity
    Source theorem and first unmatched hypothesis, if any: Wu, Acta Arith. 114 (2004), Lemma 2.3 (PDF SHA-256 ebe75ef3...b30 matches the recorded hash; printed pp. 220-221): moduli weighted by nu*(q) = mu(q)^2 3^nu(q), i.e. squarefree only; f(m) << 1; m <= x^(1-alpha); max over y <= x and (a,q)=1; main term li(y/m)/phi(q). First unmatched: the modulus set of the b_R term is not squarefree
    Validation command, falsifier, result and compute used: node research/joint-factor-estimate-validation.js (0.8 s) rerun, pass; scratch nonsqfree-mass.js (0.06 s) measures sum over non-squarefree odd e of |b_R(e)|/e (rhohat set to 1) = 2.11, 2.45, 2.82, 3.14, 3.48 at W = 10^3, 3x10^3, 10^4, 3x10^4, 10^5, ratio to log W steady at 0.30-0.31
    Independent reviewer / disposition (PENDING until actually reviewed): V2 / correction required at the hypothesis row; conditional identity otherwise verified; the handler's section 9 listed exactly this item as not re-derived
    Full-consumer payoff and unpaid complement: none; Z_F^p and B_L^comp unpaid, as the note states
    Proposed shared-record changes / next bounded obligation: (a) amend the note's source row and 4.2 to state the squarefree restriction and the affected moduli; (b) either import the Pan-Pan Corollary 8.12 form if it is stated for all moduli (unread), or discharge the non-squarefree moduli by ordinary prime Bombieri-Vinogradov applied per cofactor m at scale x/m >= x^(1/2) with moduli e <= x^(1/10) <= (x/m)^(1/5), which is inside Tao Theorem 17's range; that derivation is not in the note and V2 did not write it; (c) OUTCOMES grade of the Type I evaluation: "DERIVED conditional on the non-squarefree moduli" until (b) is written and read

### What was reconstructed and found correct

Exact family formula (4.1)-(4.2). (2.2) was rederived from the Vaughan-type
identity: sum_{d|m} mu(d) beta_W(m/d) = Lambda(m) 1_{m>W}, and beta_W(k) =
log k - sum_{r|k, r<=W} Lambda(r), giving P_i(t) = (log t) sum_{d|t} a_i(d) +
sum_{e|t} b_i(e) with b_i(e) = -a_i(e) log e - sum_{dq=e, q<=W_i} a_i(d)
Lambda(q), support e <= W_i^2. (2.3) is global-factor-signs (4) at n = mr with
m > 1. Unique representation: r > x^{1/2}/2 > W_L is the only prime factor
above W_L. Irregular count O(x W_L^{-1/2}) rechecked (p > W_L^{1/2} needs
p^2 | n; p <= W_L^{1/2} has its least power above W_L below W_L^{3/2}).

Pan-Ding shape. h = mr - 2 is odd (m odd since P^-(m) > x^delta, r odd);
d | mr - 2 with (d,m) > 1 is impossible; for (d,m) = 1 the condition is
mr = 2 mod d, the theorem's own form with fixed a = 2. Weights: log r
log(mr-2) = (log y - log m) log(y-2) at y = mr; the log m part uses the
bounded coefficient c(m) log m/T; partial summation against the y-uniform
discrepancy costs T^2 and T respectively; (log r) d li(y/m) = dy/m gives the
main term (4.3a)-(4.3b). Coprimality perturbation: removing (d,m) = 1 from
A_m, B_m costs sum_{p|m} T^2/(p-1) << delta^{-1} x^{-delta} T^2 = o(1/T).
All verified, subject to the modulus issue below.

Twisted-constant lemma. mu(i)1_{(i,Q)=1} = (mu * 1_{Q^infty})(i): checked by
writing i = i_Q i' and summing mu over divisors of i_Q. (4.3c): the l <= sqrt Z
part uses Landau's M_1(v) << exp(-c sqrt(log v)) (from Tao Notes 2 Exercise 41
by partial summation, plus sum mu(d)/d = 0) and sum_{l|Q^infty} 1/l =
Q/phi(Q); the l > sqrt Z part uses |M_1| <= 1 and Z^{-1/4} prod (1-p^{-3/4})^{-1}.
Uniformity in Q is explicit: the only Q-dependence is through those two
products, and the coefficient (k phi(k))^{-1} (2k/phi(2k)) prod_{p|2k}(1-p^{-3/4})^{-1}
<= 2 k^{eps}/phi(k)^2 is summable; the k > sqrt D tail is O(D^{-1/2} log D).
So T A = o(1) (in fact O(T^{1-A})). kappa = 1: M_2(Z) = int_1^Z M_1(u) du/u
converges; d M_3/d log Z = 2 M_2; sum_{n<=Z} Lambda(n)/n = (1/2) M_3(Z) +
gamma_1 M_1(Z) + O(1) from mu * log = Lambda and sum_{k<=Y} log k/k =
(1/2) log^2 Y + gamma_1 + O(log Y/Y); Mertens gives M_3 = 2 log Z + O(1), so
kappa = 1 (agrees with the residue of x^s/(zeta(1+s) s^2) at s = 0). (4.3e)-(4.3f):
dominated convergence with majorant 2 sup|M_2| mu^2(k)/phi(k)^2 gives
sum_k 2 mu(k)/phi(k)^2 = 2 prod_{p>2}(1 - 1/(p-1)^2) = 2C_2. Cross-check
with candidate 1: there P_0 -> 0 with logarithmic savings and
P_1 -> -H_{1,1}(0) = -2C_2 for odd squarefree moduli, so
sum_{d<=D odd} mu(d) log(D/d)/phi(d) = log D P_0(D) - P_1(D) -> 2C_2; the two
notes agree. Prime-power correction: phi(d p^k) = phi(d) p^k for p | d;
the bracket equals Q_1 - w(d) with 0 <= w(d) <= sum_{p|d} log p/(p-1)^2;
the w-part is O(T^{-A}) + a tail. Verified.

Two cosmetic slips, neither affecting a bound: (1) the displayed
A = S(a_R) - int_{a_R}^{b_R} S drhohat should read A = -int_{a_R}^{b_R} S
drhohat (the boundary term rhohat(a_R) S(a_R) cancels S(a_R)); the bound
|A| << sup|S| is unchanged. (2) The tail over p > a_R^{1/2} of
(log p)/(p-1)^2 is O(a_R^{-1/2}), so the displayed O(a_R^{-1} T) should be
O(a_R^{-1/2} T); still o(1).

(4.4)-(4.6). (4.5) from sum_{n in F} Ghat_L(n) = -sum_m c(m)(theta(x/m) -
theta(x/(2m))) + budget = -(x/2) H_delta + O(x T^{-A}) by PNT with
logarithmic savings on intervals of length >= sqrt x/2. (4.6a) is the audit's
(8)-(9) plus the second reduction B_L = Rhat + O_A(x/T^A) recorded in
joint-correction-source-audit section 5; the note's alternative route through
L_0 = C_2 x + o(x) uses the same lemma for the left profile (a_L = x^{0.22},
same proof). (4.6) is derived from (4.4) and (4.6a) by subtraction, not
asserted. The ordinary prime BV used by the audit for L, R covers all moduli
(Theorem 17 has no squarefree restriction), so (4.6a) does not inherit the
defect below.

Failed inequality (4.7)-(4.8). The sieve import paired-factor-budget (12)
(upper linear sieve at level x^{9/20}, F(2) = e^gamma, giving 40/9 against
the Hardy-Littlewood size) is used on the nonnegative part c_+ only; Z_{c_-}
>= 0 dropped. The arithmetic 31/100 - 32/45 = -1805/4500 < -2/5 is correct;
1 - log 2 + 24/22! < 0.3070 < 0.31. The imported constants H_delta <= -log 2 +
24/22! and H^+ >= I_3 > 4/25 were not re-derived here; they affect only the
size of the certified deficit of a negative result.

### The defect

Section 4.2 writes P_R(h) = (log h) sum_{d|h} a_R(d) + sum_{e|h} b_R(e) and
applies the Pan-Ding estimate to "odd d <= W_R and odd e <= W_R^2". The
coefficient b_R(e) = -a_R(e) log e - sum_{dq=e, q<=W_R} a_R(d) Lambda(q) is
supported on e = d p^k with d squarefree, and e is not squarefree whenever
p | d or k >= 2. The published Lemma 2.3 (Wu p. 220-221, read from the PDF
whose hash matches the recorded custody) has the modulus weight
nu*(q) := mu(q)^2 3^{nu(q)}, so it makes no statement at non-squarefree q.
The note's own table row records the mu^2(d) and then applies the lemma to
every e without remark. paired-factor-budget did not face this because it
sieved with squarefree moduli only; the present note is the first to route
the b_R coefficients through Pan-Ding.

The affected contribution is not negligible by a trivial bound: with the
count bounded by log x (x/(2me) + 1) the total is x T sum_m |c(m)|/m times
sum_{e non-squarefree} |b_R(e)|/e, and the last sum is of order log W_R
(measured 0.30 log W at W = 10^3..10^5, scratch nonsqfree-mass.js; the
analytic reason is sum_d (1/d) sum_{p|d} log p/(p-1) << log W). So the
trivial bound is O(x T^2), and a distribution estimate at these moduli is
required for (4.3). Their main term is already computed correctly inside the
lemma (the w(d) part, which is o(1)); only the error term lacks a theorem.

What would discharge it (not done here, and not V2's to do): the moduli are
e <= x^{1/10} while each cofactor interval has length x/(2m) >= x^{1/2}/2,
so for each fixed m the ordinary prime Bombieri-Vinogradov theorem (Tao
Theorem 17, all moduli, at x := x/m and x/(2m), Q = x^{1/10} <= (x/m)^{1/5})
bounds sum_{e<=x^{1/10}} sup_a |Delta_e| by (x/m) T^{-A}, and summing with
|c(m)| <= 2^{1/delta} and sum |c|/m = O(1) gives O(x T^{-A}) for the whole
Type I part, squarefree or not, with the prime-power difference between
Lambda and 1_prime costing O(x^{0.85}). If that is written and read, (4.3)
and (4.4) hold as stated and Pan-Ding is not needed for this family at all
(its aggregate level x^{9/20} is only needed when moduli exceed (x/m)^{1/2}).
Alternatively the Pan-Pan Corollary 8.12 original may be stated for all
moduli; it is UNREAD in this repo and cannot be imported on that guess.

Tests applied: missing endpoints (max over y covers both dyadic endpoints;
the r-range x/(2m) < r <= x/m), reversed inequalities (none), incompatible
residue classes (a = 2 coprime to odd e; (m,e) = 1 forced), dropped factors
(none found beyond the two cosmetic slips), prime powers (Z_F^p uses Lambda
on the partner and 1_prime on r; both consistent with the lemma's li main
term after the O(sqrt x T^3) remark), x-dependent constants (delta fixed;
2^{1/delta} fixed), hidden twisted-sequence estimate (none: the signed
object Z_F^p is left explicitly unestimated).

Comparison with the handler's section 9: section 9 accepted the derived
identity and explicitly listed "Wu Lemma 2.3's hypotheses (taken from
paired-factor-budget)" as not re-derived and as the second reader's first
item. That item does not discharge as recorded. The disposition should be
changed from "verified within stated scope" to "conditional on the
non-squarefree moduli estimate; correction required in 4.2 and the source
row". The failed inequality (4.7)-(4.8) and the retirement conclusion of
section 8 are unaffected in direction (they only become weaker if (4.3) is
in doubt), and the reopening condition stands.

---

## Summary of dispositions

| Candidate | Disposition | Decisive defect or none |
|---|---|---|
| 1. T^top = O(x log^-A x), section 3a | verified within stated scope (second independent reading) | none; Theorem 17 and Exercise 20 confirmed at the page; two immaterial exponent slips |
| 2. Proposition 6.5, with 6.2 and 6.4(a) | verified within stated scope (second independent reading) | none; exact recomputation measures the onset of 2^(0.92 r) at m = 130 |
| 3. (4.1)-(4.6), lemma, (4.7)-(4.8) | correction required at the source-hypothesis row; identity (4.4) conditional on a BV-type estimate at non-squarefree moduli e = d p^k <= x^(1/10) | Wu Lemma 2.3 is squarefree-only (nu*(q) = mu(q)^2 3^nu(q)); the b_R support is not; trivial bound at those moduli is O(x T^2) |

What was not checked: the imported constants H_delta, H^+, I_3 and the
sieve constant 40/9 (candidate 3); global-factor-signs (4) and (6)-(7)
(candidates 2 and 3); the audit's second reduction B_L = Rhat + O(x/T^A)
beyond its recorded statement; Landau's bound itself (Tao Exercise 41,
stated as an exercise). No asymptotic step was tested by computation; all
finite checks are measurements of identities and constants.

Compute used: four validators rerun (about 19 s total), two scratch scripts
(under 0.1 s each), two page/PDF fetches. No enumeration.

Revision history: none; V2 edited no repo file.

---

## Re-read of B 4.2 (working tree after lane B's correction, 2026-09-08)

    Lane / stable question id: V2 re-read of B / Q-joint-factor-estimate
    Starting commit / paths: 0735db9 plus the uncommitted working-tree revision of research/joint-factor-estimate.md sections 3 and 4.2
    Disposition / exact claim / unproved hypotheses: VERIFIED WITHIN STATED SCOPE for (4.3a) and hence (4.4). Claim: for every fixed A, uniformly in m in M_delta, sum_r (log r) P_R(mr-2) = (1/m) int_{x/2}^x [log(t-2) A_m + B_m] dt + O(Y/T), Y = x/m; after the lemma and sum_m |c(m)|/m = O_delta(1), (4.3) holds with o_delta(x). Unproved: nothing inside the claim
    Changed step: Pan-Ding replaced by ordinary prime BV per cofactor; one cosmetic chain to fix (below)
    Source theorem / first unmatched hypothesis: Tao Notes 3 Theorem 17, quoted verbatim in the section 3 row and matching the page text V2 extracted; none unmatched
    Validation / falsifier / compute: reading only; no new script
    Independent reviewer / disposition: V2 / verified within stated scope
    Payoff / unpaid complement: unchanged; Z_F^p and B_L^comp unpaid
    Proposed shared-record changes: replace "(Y/2)^(1/5)" in 4.2 by "(Y/2)^(1/4) log^(-B)(Y/2)" or equivalent; OUTCOMES grade for the Type I evaluation can drop "conditional"

Checked item by item.

Level condition. Theorem 17 is applied at y = Y and y = Y/2 with Y = x/m
>= x^(1/2), so y >= x^(1/2)/2 >= 2 and log y >= (log x)/3 for large x.
The hypothesis is Q <= y^(1/2) log^(-B) y with Q = W_R^2 <= x^(1/10);
y^(1/2) >= x^(1/4)/sqrt 2, so the margin is x^(3/20)/sqrt 2 against
log^B y, uniform in m once x >= x_0(A). Correct. The displayed
intermediate chain "x^(1/10) <= (Y/2)^(1/5)" can fail by the factor 2^(1/5)
when m is near x^(1/2) and floor(x^(0.05))^2 is near x^(0.1); it is not the
hypothesis actually needed. Cosmetic; replace by a chain with exponent 1/4.

Prime-power conversion. Theta versus psi on (Y/2, Y] in one class: the
prime powers p^k <= Y, k >= 2, have total weight O(sqrt Y log Y) and each
sits in one class, so the sup over a of their contribution per modulus is
O(sqrt Y log Y); over q <= Q this is O(Q sqrt Y log Y), and
Q sqrt Y = Y x^(1/10) Y^(-1/2) <= Y x^(1/10 - 1/4) = Y x^(-3/20). Correct.

Comparison term. phi(q)^(-1) sum_{n<=y,(n,q)=1} Lambda(n) differs from
psi(y)/phi(q) by at most omega(q) log y/phi(q) <= (log q log y)/phi(q)
and psi(y) = y + O(y exp(-c sqrt(log y))); summing with
sum_{q<=Q} 1/phi(q) << log Q gives O(y exp(-c sqrt(log y)) log Q + log^3 x)
= O(y T^(-A)) since log y >= (log x)/3. Correct. Taking the difference of
the two prefixes gives the main term Y/(2 phi(e)) in (4.2a). Constants in
Theorem 17 depend on A only, so (4.2a) is uniform in m.

b-part. Each odd e coprime to m appears once with coefficient b_R(e),
|b_R(e)| <= 2 log e <= T; e sharing a prime with m contributes zero on
both sides; the class 2 m^(-1) mod e is reduced. sum_e |b_R(e)| sup_a |err|
<= T Y T^(-A). The main term is (Y/2) B_m with B_m over all odd e coprime
to m, squarefree or not, exactly as (4.3b) defines it. Correct.

a-part and the subinterval count. K = ceil(T^2) intervals of equal
logarithmic length, ratio 2^(1/K): on I_j, log(mt-2) has t-derivative
m/(mt-2) <= 2/t, so its variation is at most 2(2^(1/K)-1) <= 1.4/T^2 =
O(T^(-2)), giving (4.2b). The K+1 single-prefix applications, each at
y_j >= Y/2 with Q inside the range, with l_j <= 2T and |a_R(d)| <= 1, cost
O(K T Y T^(-A)) = O(Y T^(3-A)). The O(T^(-2)) remainder is bounded by
T^(-2) sum_{d<=W_R} [Y/(2 phi(d)) + err_d] = O(Y T^(-2) log W_R + Y T^(-2-A))
= O(Y/T); replacing sum_j l_j (y_{j+1}-y_j) by the integral costs
O(Y T^(-2)) per d, O(Y/T) after the d-sum; t = mt' converts to
(1/m) int_{x/2}^x log(t'-2) dt' A_m. So O(Y/T) is exactly what this crude
subinterval approximation costs, and it suffices: the a-part's own main
term is O(Y T |A_m|) = O(Y T^(1-A)) anyway. A finer K would only lower a
term that is already o(Y).

Final error. Per m: O(Y/T + Y T^(1-A) + Y T^(3-A)) = O(x/(mT)) for A >= 4,
with constants independent of m. Multiplying by |c(m)| <= 2^(1/delta) and
summing over M_delta gives O_delta(x/T) = o(x), since sum |c(m)|/m =
O_delta(1). The main term is (x/(2m))(T A_m + B_m + O(|A_m|)) and the
coprimality perturbation o(1/T) is unchanged. (4.3) follows with the
lemma. Correct.

Squarefree property of e. None is used: Theorem 17 has no such
restriction; the b_R sum is indexed by e itself with one coefficient per
e; the main term 1/phi(e) is Theorem 17's expected term after the
comparison conversion; the lemma's second part already treats
non-squarefree dq through phi(d p^k) = phi(d) p^k. Pan-Ding now enters
only through paired-factor-budget (12) for the sieve constant 40/9 on
squarefree sieve moduli, where the restriction is native.

Also confirmed: the two cosmetic slips from the first reading are fixed
(A = -int S drhohat with the boundary terms explained; the tail is
O(a_R^(-1/2) T)).

Disposition for (4.3a) and (4.4): verified within stated scope, second
independent reading; the only edit recommended is the cosmetic exponent
chain. Nothing here estimates Z_F^p or B_L^comp; the failed inequality
(4.7)-(4.8), the retirement conclusion of section 8 and every OPEN margin
are unchanged.
