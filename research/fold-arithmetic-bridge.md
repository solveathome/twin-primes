# Fold ledger and the parity table: exact identities, checked sieve inputs, all-depth failure of both ratio tests

<!-- ledger
id: Q-fold-arithmetic-bridge
status: PARTIAL
todo: C
parity: Exact parity-table algebra and the semiprime classification above the dyadic cube-root cutoff. Sieve pricing now imports the Pan--Ding mean value theorem (Wu, Lemma 2.3, read at the arXiv page) for products of k primes with all factors above X^(1/u), ordinary prime Bombieri--Vinogradov, and the Rosser--Iwaniec linear sieve (Wu, Lemma 2.2). No Type II or bilinear estimate for the parity of a shifted prime is used; the decorrelation hypotheses (Cov_u) and (Dec_1) are stated, not proved.
question: Does one parity-table bridge from the anchored fold ledger yield a sufficient twin lower bound with named arithmetic inputs?
verdict: Exact identities retained. The one unread sieve input of the pricing, Bombieri--Vinogradov for k-fold X^(1/u)-rough products, is derived from Wu's Lemma 2.3 (section 3a); the same input, sieved in the composite variable, gives the contamination aggregate constant 4 for each fixed k,u, replacing the displayed 12.86 to 19.72. With these inputs, elementary bounds give Q_cov(u)<1 and c*_real(u)<4 for every u>4 (section 4a, independently reviewed 2026-09-09 with rational certificates), so neither sufficient ratio test succeeds at any depth. This closes the two tests, not the decorrelation hypotheses, and supplies no twin estimate.
-->

**Twin-prime infinitude remains OPEN.** This is the reviewed scope of
lane E after the second dispatch of 2026-09-08. The integration review
[research-round-validation.md](research-round-validation.md), section 4,
identified the corrections to the first return; section 3a below performs
the source check it asked for and section 4a the all-depth analysis. The
original pre-registration, its post-run correction and submitted report
are preserved in a5e1244. No new novelty claim is made.

## 1. Question and disposition

The chosen bridge is the odd/even Omega table on pairs surviving a sieve
to y=X^(1/u). It provides an exact identity and two conditional ratio
tests. In the first return the tests failed on a sampled grid whose
input bounds included one unread theorem and one cofactor-uniformity
claim, and the finite grid gave no all-depth statement.

The second dispatch selected the unread input, Bombieri--Vinogradov for
products of k primes with every factor above X^(1/u), read the primary
statement it reduces to (Pan--Ding through Wu's Lemma 2.3, arXiv page
image and text layer, hash matched to the repository's custody record),
and derived the needed distribution statement from it with every error
paid (Proposition 3). The same statement, fed to the Rosser--Iwaniec upper
bound in the composite variable, gives the pair contamination constant
4 after summing the factor tuples (Proposition 4). The displayed constants c_eff
between 12.86 and 19.72 came from sieving in the prime variable and are
not what the available level gives; the corrected c_eff is 4 at every
depth. With the inputs settled, elementary bounds on the sieve functions
and on rho_odd give Q_cov(u)<1 and c*_real(u)<4 for every u>4
(Proposition 5), so both tests fail at every depth, not only on a grid.

Disposition: the two sufficient ratio tests of this note are closed at
every depth u>4 under their stated union-bound shape, with all inputs
now proven or derived here except the reading of Wu's Lemma 2.3 as
uniform over bounded coefficients (section 3a.1). This does not show
that (Cov_u) or (Dec_1) cannot imply twins by another consumer, that a
second Liouville hypothesis is necessary, or that exact folds are
parity-blind. No bound for a handoff consumer follows. Propositions 3 to
5 were independently reviewed on 2026-09-09. Proposition 4 is an
aggregate estimate, not a bound uniform for each factor tuple;
Proposition 5 now has directed rational bounds for all five pieces.

## 2. Exact identities and conditional tests

Throughout X -> infinity through powers of 2, I = (X, 2X] cap Z, u > 4
fixed, y = X^(1/u), P(y) = product of primes p <= y. Omega counts prime
factors with multiplicity, lambda(n) = (-1)^Omega(n). Set

    S_X = { n in I : gcd(n(n+2), P(y)) = 1 }

and on S_X

    S = #S_X,  A = sum lambda(n),  B = sum lambda(n+2),  C = sum lambda(n) lambda(n+2),
    P_odd  = #{ n in S_X : Omega(n) odd },   P'_odd = #{ n in S_X : Omega(n+2) odd },
    N_odd3 = #{ n in S_X : Omega(n), Omega(n+2) both odd, max >= 3 },
    T      = #{ n in S_X : n, n+2 both prime } = #{ twin openers in I } for X > y.

The normalising constants: C_2 = prod_{p>2} (1 - 1/(p-1)^2); M = X/(log X)^2;
omega is Buchstab's function; D_k(u) is the density constant of products
of exactly k primes each exceeding X^(1/u), so that #{n ~ X : Omega(n) = k,
P^-(n) > X^(1/u)} ~ D_k(u) X/log X, with D_1 = 1, D_2(u) = log(u-1) and
D_k(u) = int_{k-1}^{u-1} D_{k-1}(v) dv/v; rho_odd(u) = sum_{k odd} D_k(u).
f_1, F_1 are the Rosser-Iwaniec linear-sieve functions; F_2 is any valid
dimension-2 upper-bound sieve function with F_2 >= 1, here Ankeny-Onishi
1/sigma_2.

**Proposition 1 (bridge identity, exact).** For every X and u with S>0,

    T = P_odd P'_odd / S + (S/4) cov - N_odd3,   cov := C/S - (A/S)(B/S),

The denominator-free identity, valid also at S=0, is 4 T S = 4 P_odd P'_odd + (C S - A B) - 4 N_odd3 S. Also
S - A - B + C = 4 (T + N_odd3).

*Proof.* (1 - lambda(m))/2 is the indicator of Omega(m) odd. Summing
(1 - lambda(n))(1 - lambda(n+2))/4 over S_X counts pairs with both
Omega odd, which is T + N_odd3, and expands to (S - A - B + C)/4. Write
a = A/S, b = B/S. Then (S - A - B + C)/4 = (S/4)((1-a)(1-b) + cov) and
S(1-a)/2 = P_odd, S(1-b)/2 = P'_odd. The review's four-sign identity
4T = S - A - B + C is the case N_odd3 = 0, which is guaranteed when y >= (2X+2)^(1/3). With y=X^(1/u),
fixed u<3 suffices eventually, but u=3 does not guarantee it. QED.

**Proposition 2 (parity content of the anchored fold ledger).** Let X>=4 and
y_0 = (2X+2)^(1/3) and let p be a prime with y_0 < p <= (2X+2)^(1/2).
If the fold at p kills a pair (n, n+2) of I on the n side, meaning p | n
and n(n+2)/p has no prime factor below p, then n = p m with m prime, so
Omega(n) = 2 and lambda(n) = +1 exactly; the partner satisfies
Omega(n+2) in {1, 2}, and lambda(n+2) = -1 if and only if n+2 is prime.
Symmetrically on the n+2 side.

*Proof.* m = n/p < 2X/p < (2X)^(2/3) < p^2 and m has no prime factor
below p, so m = 1 or m is prime; m > X/p >= 1 excludes m = 1. The partner
is p-rough and below 2X+2 < p^3, so it has at most two prime factors. QED.

Consequently each such kill determines the parity of its killed member.
The partner's primality remains arithmetic information to be estimated.
This pointwise statement does not prove that the aggregate (S,A,B,C)
retains every correlation of the fold ledger. At the cube-root depth,
the both-odd count equals T, so estimating that statistic already contains
the twin-count problem.

**Two candidate single hypotheses**, each on an unbounded set of dyadic X
at a fixed u > 4:

- (Cov_u) cov >= 0, i.e. C S >= A B.
- (Dec_1) sum_{n in S_X, n prime} lambda(n+2) = (B/S) #{n in S_X : n prime} + o(X/(log X)^2):
  the parity of n+2 is asymptotically independent of the primality of n
  on the sifted pair set.

**Input bounds of the pricing, with their status after section 3a.** With Pi := #{p in I : gcd(p+2, P(y)) = 1},

    Pi      >= f_1(u/2) 2 C_2 e^-gamma u M (1 + o(1))          [linear sieve + prime BV; needs u > 4; proven inputs]
    P_odd   >= f_1(u/2) rho_odd(u) 2 C_2 e^-gamma u M (1 + o(1))  [same, summed over odd k <= u; BV for rough P_k is Proposition 3]
    S       <= F_2(u) 2 C_2 e^-2gamma u^2 M (1 + o(1))          [dimension-2 upper sieve, level X^(1-eps); only F_2 >= 1 is used below]
    #{n in S_X : Omega(n) = k} <= F_1(u/2) D_k(u) 2 C_2 e^-gamma u M (1 + o(1))   [linear upper sieve; BV from Proposition 3]
    #{p in I : p+2 = q_1...q_k, q_1 > y} <= (4 + o(1)) 2 C_2 D_k(u) M                [Proposition 4; replaces the earlier c_pair model]

The earlier model used c_pair(tau) = min(8/tau, 4 tau/(2 tau - 1)) for
tau > 1/2 and 8/tau otherwise, tau = log q_k / log X, and integrated it
against the Hardy--Littlewood density; it is retained in the validator's
section 3 for reproducibility and is superseded by the constant 4 (section
3a.3). With c_pair replaced by 1 the same integral is the Hardy--Littlewood
value 2 C_2 D_k(u) M.

**The conditional ratio tests.** If the preceding bounds hold, the
following are sufficient tests for a positive asymptotic lower bound.
Failure of a test proves no negative statement about T or about the
hypothesis alone. Under (Cov_u), with the union bound
N_odd3 <= sum_{k odd >= 3} (#{Omega(n) = k, n+2 rough} + #{Omega(n+2) = k, n rough}),

    T > 0 follows if   Q_cov(u) := f_1(u/2)^2 rho_odd^2 / ( 2 e^-gamma u F_1(u/2) F_2(u) (rho_odd - 1) ) > 1.

Under (Dec_1), with T = #{n prime, Omega(n+2) odd} - #{n prime, Omega(n+2) odd >= 3},

    T > 0 follows if   c*_real(u) := f_1(u/2)^2 rho_odd / ( F_2(u) (rho_odd - 1) ) > c_eff(u),

where c_eff(u) is the contamination constant relative to the
Hardy--Littlewood value; after Proposition 4, c_eff(u) = 4 for every
u > 4 (the earlier model's contamination-weighted mean of c_pair ran from
12.86 to 19.72). c*_best(u) := rho_odd/(rho_odd - 1) is the same threshold
with every sieve loss at its floor.

## 3. Prior work and source status

The two-sided indicator is elementary. The earlier four-sign identity is
in history/staging/review-0905.md, the one-sided minorant in
[chen-signed-target.md](chen-signed-target.md), and separate-estimate
failures in [chen-opportunity-audit.md](chen-opportunity-audit.md).
The per-fold kill count is a Buchstab sift of a dilated shifted sequence.
Exact folds retain arithmetic positions; no equivalence between all
their statistics and Type I progression counts has been proved here.
Sieving the composite variable of a shifted-prime count, as in
Proposition 4, is Chen's switching principle; it is classical machinery
and no novelty is claimed for it.

The source table. Entries marked UNREAD are not imports. The
descriptions of classical constants are not certified uniformly in
the growing cofactor merely by evaluating the numerical functions; the
uniformity used here is stated in Propositions 3 and 4.

| source | version, locator | statement used | hypotheses and how discharged | unmatched |
|---|---|---|---|---|
| Wu, Acta Arith. 114 (2004) 215-273 = [arXiv:0705.1652v1](https://arxiv.org/pdf/0705.1652v1) (11 May 2007), pp. 1-4 read as page images | p. 2 (1.2)-(1.4): Selberg 1949 D(N) <= 16 Theta(N), Bombieri-Davenport 8, Chen 7.8342; p. 3 (1.7) and the sentence that the twin constant is half; p. 4 Theorem 3: pi_2(x) <= 3.3996 Pi(x), Pi(x) = 2 C_2 x/log^2 x | history of the pair constant: 8 (Selberg), 4 (B-D), 3.3996 (Wu) in the normalisation where HL is 1; p. 2 states the linear sieve bounds are attained by B_nu = {n : Omega(n) = nu mod 2}, the parity example | Theorem 3 is for the sequence p+2 only | none needed |
| Wu, same file, p. 6, Lemma 2.2 (Rosser--Iwaniec [17]), (2.4)-(2.6), read 2026-09-08 as page image and text layer; PDF SHA-256 41d432dd63da6d1fe7836ba3beda8b601ce6e64420e50501d26d79f7d971043e, equal to the custody record in [paired-factor-budget.md](paired-factor-budget.md) section 7 | upper bound (2.4): S(A;P,z) <= X V(z){F(log Q/log z) + E} + sum_{l<L} sum_{q\|P(z)} lambda_l^+(q) r(A,q), 0 < eps < 1/8, 2 <= z <= Q^(1/2), lambda^+ well factorable of order 1 and level Q, E << eps + eps^-8 e^K/(log Q)^(1/3); F(u) = 2e^gamma/u on (0,2], (uF)' = f(u-1) | (2.1) with X = #set_k and w(d) = d/phi(d); (2.2) 0 <= w(p) < p; (2.3) with absolute K from Mertens with error; remainder bounded by L sum_{q<=Q} mu^2(q)\|r(A,q)\| since \|lambda^+\| <= 1 | none for the upper bound; the lower bound (2.5) is used with z = y for P_odd, needing y <= Q^(1/2), i.e. u > 4 |
| Wu, same file, p. 6, Lemma 2.3 (Pan--Ding [21] in the form of Pan--Pan [22, Corollary 8.12]), first and second estimates, read 2026-09-08 as page image and text layer | for f(m) << 1, alpha in (0,1], r_1(y) << x^alpha: sum_{q <= sqrt x/(log x)^B} mu(q)^2 3^nu(q) max_{y<=x} max_{(a,q)=1} \|sum_{m <= x^(1-alpha), (m,q)=1} f(m) E_0(y;q,a,m)\| << x/(log x)^A and the same with E_0(m r_1(y);q,a,m), where pi(y;q,a,m) = #{p : mp <= y, mp = a (q)} and E_0 = pi - li(y/m)/phi(q) | alpha = 1/u, x = 4X, r_1 = X^(1/u) <= x^alpha, f in {0,1} fixed once y in {X, 2X} is fixed; the implied constant is read as depending on A, alpha and the bound for f only (section 3a.1) | the third estimate's condition line reads "m r_2(m) << x, m <= x^alpha" while its sum runs over m <= x^(1-alpha); it is not used. Pan--Ding 1979 and Pan--Pan 1992 UNREAD; the uniformity reading rests on Wu's statement |
| Halberstam-Richert, Sieve Methods (1974), Theorem 3.12 | UNREAD at the page; the repository reaches HR only through the Dover OCR index (`history/reviews-0907/08-halberstam-richert-thm22-access.md`) | classical Selberg form #{p <= x : ap + b prime} <= 8 prod_{p>2}(1-1/(p-1)^2) prod_{p\|ab}(p-1)/(p-2) x/log^2 x (1+o(1)); this is the constant-8 branch of the earlier c_pair, not the constant-4 branch as the first return's table said | no longer used: Proposition 4 replaces both branches | uniformity in a, b never verified here |
| Bombieri-Vinogradov for primes | [Tao, Notes 3, Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/), as in the corpus | level X^(1/2-eps) for the sequence {p+2} in the Pi bound | proven | none |
| Bombieri-Vinogradov for products of k primes with all factors > X^(1/u) | DERIVED here as Proposition 3 from Wu's Lemma 2.3; Motohashi's induction principle (Proc. Japan Acad. 52, 1976) not needed and UNREAD | level sqrt x/(log x)^B for 1_{set_k} on (X,2X], every fixed k and u | all errors paid in section 3a.2 | the uniformity reading of Lemma 2.3 |
| Ankeny-Onishi sigma_kappa (HR ch. 5) | not opened; the function is reproduced from its defining delay equation and checked at sigma_2(2) = e^-2gamma/2 and sigma_2 -> 1 | F_2 = 1/sigma_2 as a valid upper function | section 4a uses only F_2 >= 1, which holds for this F_2 and for any upper function bounded below by 1 | none needed for the all-depth bounds |
| Rosser-Iwaniec linear sieve F_1, f_1 | Wu (2.6) for the definitions; closed forms on [1,3] and [2,4] and the recursion (sF)' = f(s-1), (sf)' = F(s-1); f_1 <= 1 <= F_1 for all s is the standard monotone convergence of both functions to 1 | marginal lower bound, P_k upper bounds, and the inequalities f_1 <= 1 <= F_1 in section 4a | f_1 is optimal for the linear sieve by the parity example (Wu p. 2) | none |
| Murty, "Twin primes and the parity problem" (queensu.ca) | HTTP 404 on 2026-09-08 | possibly the same conditional in print | UNREAD; no import | novelty of Proposition 1 against it unknown |
| Tao, parity-problem posts (2007, 2014) and Bombieri asymptotic sieve notes (2016) | already read in `review-0905.md` and [consumer-comparison.md](consumer-comparison.md) section 2 | the undetermined scalar delta_x; the parity example | the covariance here is a restriction of that scalar to the sifted set | not re-derived |

## 3a. Source check of the sieve inputs (2026-09-08, second dispatch)

    Lane / stable question id: E / Q-fold-arithmetic-bridge
    Starting commit / report commit or shared-checkout paths: 07ab47f (working tree of the shared checkout); this note and fold-arithmetic-bridge-validation.js
    Disposition / exact claim / unproved hypotheses: the unread input is discharged (Proposition 3) and the contamination constant corrected to 4 (Proposition 4); both ratio tests fail for every u > 4 (Proposition 5). Unproved: (Cov_u), (Dec_1); the uniformity reading of Lemma 2.3 in 3a.1
    Changed step compared with the reviewed baseline: the c_pair(tau) model sieved the prime variable with the cofactor in the modulus; the composite variable at level X^(1/2) gives 4 for every tuple
    Source theorem and first unmatched hypothesis, if any: Wu, Lemma 2.3 first and second estimates (Pan--Ding); the dependence of its implied constant on the bound for f is not displayed in the statement
    Validation command, falsifier, result and compute used: node research/qc/embed.js research/fold-arithmetic-bridge-validation.js (1.2 s, one core); falsifier for Proposition 5: any grid point where the analytic bound falls below the model value, or any piece with bound >= 1 or >= 4; result: every piece is below both thresholds and every grid point is dominated
    Independent reviewer / disposition (PENDING until actually reviewed): handler; Propositions 3, 4 and 5 reconstructed 2026-09-08, verified within stated scope conditional on the uniformity reading of Lemma 2.3 (research-round-validation.md section 11)
    Full-consumer payoff and unpaid complement: none; the tests are sufficient conditions and both fail; the identity's other consumers are untouched
    Proposed shared-record changes / next bounded obligation: in the report; next obligation is a joint contamination bound with a named parity input, or nothing

### 3a.1 The imported statement and how it is read

Notation for this section: Y := X^(1/u) (the note's y, renamed because
Wu's y is a prefix variable), x := 4X, alpha := 1/u, and for k >= 0

    set_k := { n >= 1 : Omega(n) = k, P^-(n) > Y },   set_0 = {1},

with prime powers allowed. Write N_k(y; q, a) := #{n <= y : n = a (mod q),
n in set_k} and N_k^(q)(y) := #{n <= y : (n, q) = 1, n in set_k}.

Wu's Lemma 2.3, first and second estimates, transcribed from the page:
let f(m) << 1 and alpha in (0, 1]; let r_1(y) be a positive function of x
with r_1(y) << x^alpha for y <= x. Then for every A > 0 there is
B = B(A) > 0 such that

\[
 \sum_{q\le\sqrt x/(\log x)^B}\mu(q)^2 3^{\nu(q)}
 \max_{y\le x}\max_{(a,q)=1}
 \Bigl|\sum_{\substack{m\le x^{1-\alpha}\\(m,q)=1}} f(m)\,E_0(y;q,a,m)\Bigr|
 \ll\frac{x}{(\log x)^A},
 \qquad
 E_0(y;q,a,m)=\pi(y;q,a,m)-\frac{\mathrm{li}(y/m)}{\varphi(q)},
                                                              \tag{3a.1}
\]

with pi(y;q,a,m) = #{p prime : mp <= y, mp = a (mod q)}, and the same
bound with E_0(m r_1(y); q, a, m) in place of E_0(y; q, a, m), i.e. with
the prime variable cut at p <= r_1(y).

Reading adopted. The statement writes f(m) << 1 and displays no
dependence of the implied constant on f; it is read as: the implied
constant depends on A, alpha and the constant in f << 1 only, so the
bound is uniform over all f with |f| <= 1, including f that depend on X.
This is the reading already used by [paired-factor-budget.md](paired-factor-budget.md)
and it is the content of a mean value theorem for arbitrary bounded
coefficients. The Pan--Ding original and Pan--Pan Corollary 8.12 are
UNREAD; if the constant were allowed to depend on f beyond its bound,
Propositions 3 and 4 would need another source. The third estimate of
the lemma is not used.

### 3a.2 Proposition 3: Bombieri--Vinogradov for k-fold Y-rough products

**Proposition 3.** Fix k >= 1, u >= 2 and A > 0. With Y = X^(1/u) and
x = 4X there is B = B(A, k, u) such that

\[
 \sum_{q\le\sqrt x/(\log x)^B}\mu(q)^2 3^{\nu(q)}\max_{(a,q)=1}
 \Bigl|N_k(y;q,a)-\frac{N_k^{(q)}(y)}{\varphi(q)}\Bigr|
 \ll_{A,k,u}\frac{x}{(\log x)^A}
 \qquad(y\in\{X,2X\}),
                                                              \tag{3a.2}
\]

hence the same bound for the counts on (X, 2X] by subtraction.

*Proof.* For every n >= 1,

\[
 \sum_{\substack{mp=n\\ p\ \text{prime},\ p>Y}}\mathbf 1_{set_{k-1}}(m)
 =\omega(n)\,\mathbf 1_{set_k}(n),
                                                              \tag{3a.3}
\]

because a pair (m, p) with m in set_{k-1} and p > Y has mp in set_k, and
conversely each distinct prime factor p of an n in set_k gives one such
pair (n/p has Omega = k-1 and all prime factors above Y). Here omega
counts distinct prime factors, so omega(n) = k exactly when n is
squarefree.

Sum (3a.3) over n <= y, n = a (mod q), with (a, q) = 1. A pair (m, p)
with p > Y and mp <= y <= 2X has m < 2X/Y = 2X^(1-1/u) <= (4X)^(1-1/u) =
x^(1-alpha), since 4^(1-1/u) >= 2 for u >= 2; and (m, q) > 1 is
incompatible with mp = a (mod q). So

\[
 \sum_{\substack{m\le x^{1-\alpha}\\(m,q)=1}}\mathbf 1_{set_{k-1}}(m)
 \Bigl[\pi(y;q,a,m)-\#\{p\le Y: mp\le y,\ mp\equiv a\ (q)\}\Bigr]
 = k\,N_k(y;q,a)-\sum_{\substack{n\le y,\ n\equiv a\ (q)\\ n\in set_k}}(k-\omega(n)).
                                                              \tag{3a.4}
\]

The subtracted small-prime count splits at m = y/Y: for m <= y/Y every
p <= Y has mp <= y, so the count is pi(mY; q, a, m); for m > y/Y every p
with mp <= y has p < Y, so the count is pi(y; q, a, m). Apply (3a.1)
three times, with f = 1_{set_{k-1}} (first estimate), with
f = 1_{set_{k-1}} 1_{m <= y/Y} and r_1(y) = Y <= x^alpha (second
estimate), and with f = 1_{set_{k-1}} 1_{m > y/Y} (first estimate). Each
f has values in {0, 1} and is fixed once y in {X, 2X} is fixed. The
left side of (3a.4) therefore equals

\[
 \frac1{\varphi(q)}\sum_{\substack{m\le y/Y\\(m,q)=1}}\mathbf 1_{set_{k-1}}(m)
 \bigl[\mathrm{li}(y/m)-\mathrm{li}(Y)\bigr]+R(y;q,a),
 \qquad
 \sum_{q\le\sqrt x/(\log x)^B}\mu(q)^2 3^{\nu(q)}\max_{(a,q)=1}|R|\ll\frac{x}{(\log x)^A}.
                                                              \tag{3a.5}
\]

(The m > y/Y terms cancel between the first and third applications;
the m <= y/Y terms leave li(y/m) - li(Y).)

Main term. Summing (3a.3) over n <= y with (n, q) = 1 gives
k N_k^(q)(y) - sum_{n <= y, (n,q)=1, n in set_k}(k - omega(n)) =
sum_{m <= y/Y, (m,q)=1} 1_{set_{k-1}}(m)[pi(y/m) - pi(Y)] - J_q, where
J_q counts pairs with p | q, p > Y, so J_q <= nu(q) y/Y. Since y/m >= Y =
X^(1/u) for m <= y/Y, the prime number theorem with classical error gives
|pi(t) - li(t)| <<_{A,k,u} t/(log x)^(A+k+4) for t in {y/m, Y}, and
sum_{m <= y/Y} 1/m <= log x + 1, so

\[
 \Bigl|\frac1{\varphi(q)}\sum_{\substack{m\le y/Y\\(m,q)=1}}\mathbf 1_{set_{k-1}}(m)
 [\mathrm{li}(y/m)-\mathrm{li}(Y)]-\frac{k\,N_k^{(q)}(y)}{\varphi(q)}\Bigr|
 \le\frac{k\,B^{(q)}(y)+\nu(q)\,y/Y}{\varphi(q)}+O\Bigl(\frac{x}{\varphi(q)(\log x)^{A+k+3}}\Bigr),
                                                              \tag{3a.6}
\]

where B^(q)(y) := #{n <= y : (n,q)=1, p^2 | n for some prime p > Y}
<= y/Y bounds the non-squarefree correction on the main-term side.
Summing with the weights mu(q)^2 3^nu(q)/phi(q), whose sum over q <= sqrt x
is O((log x)^3), and using nu(q) <= log x, these three contributions are
O(x (log x)^4/Y) + O(x/(log x)^A), acceptable since Y is a power of X.

Non-squarefree correction on the progression side. The last sum in
(3a.4) is at most k B(y; q, a), B(y;q,a) := #{n <= y : n = a (mod q),
p^2 | n for some prime p > Y}. For a prime p <= (y/q)^(1/2) the number
of such n is at most y/(p^2 q) + 1 <= 2y/(p^2 q). For p > (y/q)^(1/2)
write n = p^2 m with m < q; for squarefree q the congruence
p^2 m = a (mod q) has at most 2^nu(q) admissible classes for p modulo
q, so these n number at most sum_{m<q} 2^nu(q)((y/m)^(1/2)/q + 1)
<= 2^nu(q)(2 (y/q)^(1/2) + q). Hence, with Q = sqrt x/(log x)^B,

\[
 \sum_{q\le Q}\mu(q)^2 3^{\nu(q)}\max_a B(y;q,a)
 \ll\frac{y(\log x)^3}{Y}+\sqrt{y}\,Q^{1/2}(\log x)^5+Q^2(\log x)^5
 \ll\frac{x}{(\log x)^A}
                                                              \tag{3a.7}
\]

once B >= (A + 5)/2, using sum_{q <= Q} 6^nu(q) << Q (log x)^5 and
sum_{p > Y} p^-2 << 1/Y. Dividing (3a.4) by k and collecting (3a.5),
(3a.6) and (3a.7) gives (3a.2). QED.

The statement (3a.2) is a distribution theorem for the indicator of
k-fold Y-rough products in reduced residue classes. It is not the twin
count, an occupancy statement, or a parity statement; it carries no
sign information about lambda.

### 3a.3 Proposition 4: aggregate contamination constant 4

**Proposition 4.** Fix k >= 1 and u >= 2. Then, as X -> infinity,

\[
 \#\{n\in(X,2X]\cap set_k:\ n-2\ \text{prime}\}
 \le(4+o(1))\,\frac{2C_2\,\#(set_k\cap(X,2X])}{\log X}
       +O_{A,k,u}(X/\log^A X).
                                                              \tag{3a.8}
\]

With #(set_k cap (X,2X]) = (D_k(u) + o(1)) X/log X this is
(4 D_k(u) + o(1)) 2 C_2 M for every k (the displayed form absorbs the
O(X/log^A X) remainder only when D_k(u)>0, i.e. k<u; reader V4), and by symmetry the same bound
holds for #{n in (X,2X] : n prime, n+2 in set_k}.

*Proof.* Let A := {n - 2 : n in set_k cap (X, 2X]}, P the odd primes,
X_A := #(set_k cap (X,2X]). For X >= 2^u every n in set_k is odd, so
every element of A is odd and d | n - 2 with d odd is the reduced
condition n = 2 (mod d). Put w(d) := d/phi(d) on odd squarefree d, so
that (2.2) holds with 0 <= w(p) = p/(p-1) < p, and
|A_d| = (w(d)/d) X_A + r(A, d) with

    r(A,d) = [N_k(2X;d,2) - N_k^(d)(2X)/phi(d)] - [N_k(X;d,2) - N_k^(d)(X)/phi(d)]
             - (1/phi(d)) #{n in set_k cap (X,2X] : (n,d) > 1}.

The last term is at most (1/phi(d)) sum_{p | d, p > Y} 2X/p, and
sum_{d <= Q} mu(d)^2 (1/phi(d)) sum_{p|d, p>Y} 2X/p << X (log x) sum_{p>Y} p^-2
<< X log x/Y. With Proposition 3 for the first two brackets,
sum_{d <= Q} mu(d)^2 |r(A,d)| <<_{A,k,u} X/(log X)^A for
Q = sqrt x/(log x)^B. Condition (2.3) holds with an absolute K because
V(z) = prod_{2<p<z}(1 - 1/(p-1)) = prod_{2<p<z}(1 - 1/(p-1)^2) prod_{2<p<z}(1 - 1/p)
and Mertens' product has relative error O(1/log z).

Apply Wu's Lemma 2.2, (2.4), with this Q, z := Q^(1/2) and a fixed
eps in (0, 1/8). The remainder is at most
L sum_{q <= Q, q | P(z)} |r(A,q)| <= L sum_{q <= Q} mu(q)^2 |r(A,q)| << X/(log X)^A,
because lambda_l^+ has order 1, i.e. |lambda_l^+(q)| <= 1, and level Q.
The main term is X_A V(z){F(2) + E} with F(2) = e^gamma and
E << eps + o(1). Since V(z) = 2 C_2 e^-gamma (1 + o(1))/log z and
log z = (1/4) log x - (B/2) log log x = (1/4)(1 + o(1)) log X,

    S(A; P, z) <= X_A (2 C_2 e^-gamma 4/log X)(e^gamma + O(eps) + o(1)) = (4 + O(eps) + o(1)) 2 C_2 X_A/log X.

Every prime n - 2 with n in (X, 2X] is odd and exceeds z, so it has no
prime factor below z and is counted by S(A; P, z). Since eps is
arbitrary, (3a.8) follows. QED.

Effect on the displayed constants. The first return's c_pair(tau)
bounded #{p : p + 2 = m q, q prime, q ~ X^tau} by sieving the prime
variable q ~ X/m with the cofactor m in the modulus (constant
4 tau/(2 tau - 1) from prime BV at level X^(1/2)/m) or by Selberg's form
at the cofactor length (8/tau). Both constants exceed 4 for tau < 1 and
the contamination-weighted mean was displayed as 12.86 to 19.72. Sieving
the composite variable at the level of Proposition 3 gives the aggregate
bound 4 D_k(u) after summing the tuples. It does not give a bound
with c_pair(tau)=4 for each tuple: the distribution theorem has already
averaged the cofactors. The tests only require the aggregate input, so
one may take c_eff(u)=4 for every fixed u>4, and the marginal
test reads c*_real(u) > 4. The Q_cov test is unchanged by this
correction; its inputs are now the proven prime BV, Proposition 3, Wu's
Lemma 2.2, and any F_2 >= 1.

### 3a.4 Revised hypothesis matrix for the two tests

| Input | Status after this pass | Where |
|---|---|---|
| Prime Bombieri--Vinogradov at level X^(1/2-eps) | proven (corpus) | Tao Notes 3, Theorem 17 |
| BV for 1_{set_k}, every fixed k, u | DERIVED from Wu Lemma 2.3 first and second estimates, all errors paid; rests on the uniformity reading of 3a.1 | Proposition 3 |
| Rosser--Iwaniec bounds (2.4)-(2.5) with well factorable remainder | read at the page | Wu Lemma 2.2 |
| f_1 <= 1 <= F_1, f_1 closed form on [2,4] | standard properties of the linear sieve functions | section 4a |
| Dimension-2 upper sieve for S | only F_2 >= 1 used | section 4a |
| Contamination constant | c_eff = 4 for every u, DERIVED | Proposition 4 |
| #(set_k cap (X,2X]) ~ D_k(u) X/log X | classical normalisation of section 2, not re-derived | section 2 |
| (Cov_u), (Dec_1) | OPEN hypotheses, not used beyond the tests | section 2 |

No input of the matrix is the twin count, an occupancy statement, or a
restatement of either hypothesis.

## 4. What the computation establishes

[fold-arithmetic-bridge-validation.js](fold-arithmetic-bridge-validation.js)
checks the denominator-free identity exactly in BigInt arithmetic on
10 intervals, X in {2^16,2^18,2^20,2^22,2^24}, u in {4.5,6}.
Its section 3 evaluates the first return's model at 16 depths from 4.1
to 60 on a 0.002 differential-equation grid with quadrature and seeded
Monte Carlo for the superseded c_pair integrals; it is retained for
reproducibility. Over that grid, the largest reported Q_cov is 0.4063
with the proposed F_2 and 0.4222 with F_2 set to 1; the largest c*_real
is 1.661, and the superseded c_eff runs from 12.86 to 19.72.

Section 4, added on 2026-09-08, scans the same model at every grid point
in (4, 64]: max Q_cov(F_2) = 0.4065 at u = 8.120, max Q_cov(F_2 = 1) =
0.4240 at u = 7.652, max c*_real = 1.6641 at u = 7.732, and no grid
point has c*_real >= 2. With c_eff = 4 the marginal ratio is at most
0.4160. These are measurements of the numerical model. Section 4 also
evaluates the five piecewise bounds of Proposition 5 and checks at every
grid point that the analytic bound dominates the model value, that
rho_odd lies between 1 + D_3 and (u-1)/2 + 1/(2(u-1)), and that the
sieve functions satisfy f_1 <= 1 <= F_1 and F_2 >= 1 within the grid's
1e-6 discretisation tolerance.

The finite parity identity at u=3 also requires care: on (64,128] with
y=4, the surviving pair (125,127) has both Omega parities odd but is not
a twin pair. The cutoff (2X+2)^(1/3), rather than X^(1/3), is what
guarantees the absence of three-factor contamination.
[research-round-validation.js](research-round-validation.js) checks this
counterexample directly.

## 4a. Both tests fail at every depth u > 4

**Proposition 5.** For every u > 4 and every upper function F_2 >= 1,

\[
 Q_{cov}(u)\le f_1(u/2)^2\Bigl[\frac{e^\gamma}{4}+\frac{e^\gamma(1+1/D_3(u))}{2u}\Bigr],
 \qquad
 c^*_{real}(u)\le f_1(u/2)^2\Bigl(1+\frac1{D_3(u)}\Bigr).
                                                              \tag{4a.1}
\]

Consequently Q_cov(u) < 1 and c*_real(u) < 4 for every u > 4, and
c*_real(u) < 2 for u in (4, 4.8] and for u > 8.

*Proof.* Inputs. (i) f_1(s) <= 1 <= F_1(s) for all s > 0, and on
[2, 4] f_1(s) = 2 e^gamma log(s-1)/s, which is increasing there because
s/(s-1) > log(s-1) for s <= 4. (ii) F_2 >= 1. (iii) rho_odd(u) >= 1 +
D_3(u) > 1 for u > 4, since D_1 = 1, D_3(u) = int_2^(u-1) log(v-1) dv/v
> 0 for u > 3, and all D_k >= 0. (iv) D_k(u) <= log^(k-1)(u-1)/(k-1)!
for k >= 1: D_1 = 1 and D_2(u) = log(u-1) directly, and for k >= 3 by
induction, D_k(u) = int_{k-1}^{u-1} D_{k-1}(v) dv/v <=
int_2^{u-1} log^(k-2)(v-1)/((k-2)!(v-1)) dv = log^(k-1)(u-2)/(k-1)!,
using 1/v <= 1/(v-1) and k-1 >= 2.
Hence rho_odd(u) <= sum_{j even} log^j(u-1)/j! = cosh(log(u-1)) =
(u-1)/2 + 1/(2(u-1)) < u/2 for u > 2. (v) Writing rho = rho_odd,
rho^2/(rho-1) = rho + 1 + 1/(rho-1) <= u/2 + 1 + 1/D_3(u) by (iii)
and (iv). (vi) D_3 is increasing, and D_3(u) >= ((u-2) log(u-2) -
(u-3))/(u-1) from 1/v >= 1/(u-1) on the range of integration; the
integrand log(v-1)/v is unimodal on [2, infinity), so on any cell the
minimum of its endpoint values times the cell length is a lower bound
for the cell's integral.

From the definitions, Q_cov = f_1(u/2)^2 rho^2 e^gamma/(2u F_1(u/2) F_2(u)(rho-1))
<= f_1(u/2)^2 e^gamma (u/2 + 1 + 1/D_3(u))/(2u) by (i), (ii) and (v),
which is (4a.1); and c*_real = f_1(u/2)^2 rho/(F_2(u)(rho-1)) <=
f_1(u/2)^2 (1 + 1/D_3(u)) by (ii) and (iii). Both right sides are bounded
on a piece (u_0, u_1] by replacing f_1(u/2)^2 with f_1(u_1/2)^2 (or 1
when u_1/2 > 4), D_3(u) with a lower bound at u_0, and 1/(2u) with
1/(2u_0). Here is a certificate independent of that numerical grid.
Use e^gamma<9/5. Indeed gamma<=H_100-log 100<log(9/5), with the
last comparison certified by H_100<log 180. For the first four pieces
use D_3(u_0)>=((u_0-2)log(u_0-2)-(u_0-3))/(u_0-1). At u_0=8,
unimodality and the integer cells in [2,7] give

    D_3(8) >= log 2/3 + log 3/4 + log 5/6 + log 6/7 > 1.

The cell [2,3] is discarded; the other four minima are at 3,4,6,7.
For f use min(1,2(9/5)log(u_1/2-1)/(u_1/2)) on a finite piece,
and 1 on the tail. The resulting upward-rounded rational upper bounds
are as follows (strict comparison with 1 and 4 has positive slack):

| Depth u | Q_cov upper bound | c*_real upper bound |
|---|---:|---:|
| (4,22/5] | 216/1000 | 781/1000 |
| (22/5,24/5] | 420/1000 | 1491/1000 |
| (24/5,6] | 897/1000 | 3120/1000 |
| (6,8] | 875/1000 | 2899/1000 |
| (8,infinity) | 672/1000 | 1971/1000 |

To certify each logarithm, reduce its rational argument to [1,2] by
powers of two and put t=(z-1)/(z+1). The first 32 terms of
2 sum_(j>=0) t^(2j+1)/(2j+1) give a lower bound, with omitted tail at
most 2t^65/(65(1-t^2)). The certificate's operations and comparisons in
[research-round-validation.js](research-round-validation.js) use reduced
BigInt fractions. The same enclosures check the four endpoint minima,
D_3(8)>1 and H_100<log 180. On the tail, replacing f by 1 makes the
right sides decrease. These inequalities prove the claimed all-depth
bounds and the two stated sub-2 ranges. QED.

Calibration. The elementary argument, including the directed bounds,
was independently reconstructed on 2026-09-09. It uses the standard
linear-sieve facts in (i), not measurements of those functions. Wu's
Lemma 2.2 and its defining equations were re-read at printed page 6 of
[arXiv:0705.1652v1](https://arxiv.org/pdf/0705.1652v1), PDF SHA-256
`41d432dd63da6d1fe7836ba3beda8b601ce6e64420e50501d26d79f7d971043e`.
The original numerical grid remains a measurement with its own
rounding error; the certificate above replaces its use in the proof.
The rigorous sub-2 ranges remain (4,4.8] and (8,infinity). On (4.8,8]
the stronger sub-2 observation remains measured, not proved.

Scope. Proposition 5 closes the two sufficient tests of section 2 in
their union-bound form. It does not bound T, does not decide (Cov_u) or
(Dec_1), does not show that a joint contamination bound with the
partner's parity retained cannot succeed, and does not show that a
second Liouville hypothesis is necessary. The union bound loses a factor
tending to 4 as u -> infinity: a factor 2 from counting both sides and a
factor 2 from discarding the partner's parity; that is where the limit
1/4 of Q_cov comes from.

## 5. Payoff and next obligation

The exact identities can be reused. Propositions 3 and 4 are reusable
sieve inputs at their stated scope: a level-1/2 distribution theorem for
k-fold rough products and the constant 4 for shifted-prime contamination
after averaging the factor tuples for each fixed k,u. No additional controlled region or signed global
margin follows, and no handoff consumer receives a bound.

The two displayed tests with aggregate constant 4 are closed at every
depth by the reviewed Proposition 5. This does not exclude improving
other inputs or changing the consumer. A useful continuation could retain
the partner's parity in the joint contamination count N_odd3, with its
non-residue input named before computation, or use a different weight.
On the certified sub-2 ranges an upper-sieve constant bounded below by
2 cannot repair this particular marginal test; no such all-depth
impossibility for improved constants is established here.

Revision history for this note is in
[history/CHANGELOG.md](history/CHANGELOG.md).
