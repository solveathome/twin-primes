# 07 — Corner correlation

**Question.** On the corner S_0 = {d > x^(19/25-2eta_0)} ∩ {e > x^(19/20-2eta_0)} of the remainder domain, what exactly is the remaining endpoint sum (**) with s,s'>1, the prime-power classes and the CRT endpoint weights included; what does the sufficient consumer C_2 x + E_dagger >= c_0 x/log^K x actually require there; how does (**) classify against the two-point Chowla/Elliott literature and the determinant-equation interfaces; and is a proof of the needed bound reachable from residue information and sieve upper bounds alone?

**Calibration and payoff.** Everything below is DERIVED algebra plus one flagged ASSESSMENT and finite EXACT identity checks; the corner estimate itself is OPEN in both its forms, twin-prime infinitude and the sufficient margin are unchanged, and even a complete corner estimate would change no budget, region or cut in grouped-divisor-moment (15)/(19)/(21) and would not raise the uniform product threshold above every fixed exponent below 19/25.

Artifacts: `research/corner-correlation.md`, `research/corner-correlation-validation.js` (output embedded via `node research/qc/embed.js`, 1.8 s).

---

## What is still open

- The corner estimate, in both admissible forms. Absolute: |E_dagger|_{S_0}| = o(x). One-sided: E_dagger|_{S_0} >= -C_2 x + c_0 x/log^K x. Neither is proved and neither is attempted here.
- The complement W_dagger \ S_0. By wave-1 reachability D2 it needs a uniform moment saving gamma = 2, 33x the 3/50 currently priced at one box. Unproved.
- Consequently: nothing about the global consumer moved. This note is classification and pricing.

## Derived results, with quantifiers

**D1 (exact form of the corner sum).** For fixed 0 < eta_0 < 1/400, uniformly for every fixed H > 0,

R|_{S_0}(x) = sum over primes r in (V, V x^(2eta_0)], r' in (Z, Z x^(2eta_0)] of (log r)(log r') times sum over s, s' < x^(2eta_0) with (rs, r's') | 2 of sum over m in I(rs, r's') of mu(d_0 + (r's'/g) m) mu(e_0 + (rs/g) m), plus O_H(x/log^H x).

Here g = (rs, r's'), K/g · d_0 ≡ 2/g mod T/g, e_0 = (d_0 K - 2)/T, and |I(K,T)| = g x /(2KT) + O(1). At s = s' = 1 the two forms have determinant -2 and the window has length ≍ x/(2 r r'), i.e. x^(71/100) at the foot of the bands. Uniqueness of the prime power above each cutoff uses k < V^2 (eta_0 < 3/25) and t < Z^2 (eta_0 < 1/40); disjointness of the two bands, hence (r,r') = 1, uses eta_0 < 19/200.

**D2 (correction to the wave-1 sizing).** The e-edge proper-prime-power class, O(x^(39/40) log^C x), is recorded in `04-reachability-coverage.md` Q2.2 as "not negligible against x/log^H x on its own and must be carried as an explicit separate class". It is negligible: x^(39/40) log^(C+H) x / x = log^(C+H) x / x^(1/40) -> 0 for every fixed H. Both prime-power classes (x^(22/25+eps) on the left, x^(39/40+eps) on the right) drop into the arbitrary fixed logarithmic error. Nothing else in that report depends on the point.

**D3 (the CRT endpoint weights degenerate on S_0).** In signed-divisor-grouping (15)-(18), a = dr, b = es, q = ab/g. On S_0, a >= d > x^(19/25-2eta_0) and b >= e > x^(19/20-2eta_0), so q >= (1/2) x^(171/100-4eta_0) >> x: **each compatible congruence class meets J_x in at most one integer**, and Delta_{a,b} is a difference of two sawtooths with no complete period to remove. This is the local form of the wave-1 remark that completion has no period at the corner. In the other direction it is useful: the density term M|_{S_0} is O_H(x/log^H x) (at fixed n, e, r, s the S_0 condition leaves d in one interval inside [U/2, x], and the excluded-prime Mobius mean signed-divisor-grouping (7)-(8) is uniform in the excluded-prime parameter m <= 2es <= x^2), hence

  E_dagger|_{S_0}(x) = R|_{S_0}(x) + O_H(x/log^H x).

So the sawtooth formalism can be discarded on S_0; that removes a false hope (Fourier completion buys nothing there), not a difficulty.

**D4 (the corner is a two-point Mobius correlation at the fixed shift 2).** Exactly, R|_{S_0} = sum_{n in J_x} C^{S_0}(n) C'^{S_0}(n-2) with C^{S_0}(n) = sum over dk = n, k > V, D_1 < d <= D_0 of mu(d) beta_V(k). On the s = s' = 1 sub-family the identity is clean up to O(x^(19/20+eps)):

  R|_{S_0, s=s'=1}(x) = sum_{n in J_x} mu(n) mu(n-2) L(n) L'(n-2) + O(x^(19/20+eps)),
  L(n) = sum over primes r | n, r > V, D_1 < n/r <= D_0 of log r >= 0, and L' likewise.

Two riders, both derived and both checked numerically: (i) if mu(n)mu(n-2) != 0 then n is odd, so k, t are odd and g = (k,t) = 1 — the g = 2 branch lives entirely where mu(n)mu(n-2) = 0 but mu(d)mu(e) != 0; (ii) that non-squarefree class is **not** a small correction (it is driven by a prime dividing both s and d) and at the finite parameters tested carries the majority of the term-wise mass.

**D5 (mass, and therefore the size of the required saving).** With absolute constants and fixed small eta_0, sum over (r,s) of (log r)/(rs) ≍ 2 eta_0^2 log^2 x and likewise on the right, so the term-wise absolute mass of R on S_0 is ≍ eta_0^4 x log^4 x, and that of the s = s' = 1 sub-family alone is ≍ eta_0^2 x log^2 x. The wave-1 figure eta_0^2 x log^2 x (Q1.5) is the sub-family; the full corner is larger by log^2 x. **The absolute target is therefore a natural-average saving of log^(4+eps) x over the triangle inequality (log^(2+eps) x on the sub-family).**

**D6 (the one-sided target is the theorem, not a lemma).** S(x) >= 0 and S = C_2 x + E_dagger + O_H(x/log^H x) give, with no arithmetic input at all, E_dagger(x) >= -C_2 x - O_H(x/log^H x). The entire content of the sufficient consumer is the margin c_0 x/log^K x. Hence, given the complement controlled to O_H with H > K, the corner requirement E_dagger|_{S_0} >= -C_2 x + c_0 x/log^K x is **logically equivalent** to S(x) >= c_0 x/log^K x + O_H, i.e. to a quantitative twin lower bound. The absolute route is the one that behaves like a lemma: |E_dagger|_{S_0}| = o(x) would give, conditionally, a fixed-fraction margin, far more than needed.

**D7 (eta_0 cannot be shrunk with x to escape).** Absolute control of S_0(eta) at o(x/log^K x) needs eta << log^(-(K+4)/4) x, hence eta log x << log^(-K/4) x. Control of the complement by the moment shape gives O(x^(1-c eta+eps)) with c absolute, which is o(x/log^K x) only if eta log x >> log log x. Since log^(-K/4) x = o(log log x) for every K >= 0, no eta(x) makes both halves negligible; they are incompatible by at least log log x.

**D8 (no structural positivity; the sum is genuinely signed).** Candidates disposed of one by one: the u_1 = u_2 diagonal lives in the second moment after the first Cauchy, not in the raw sum (**); the coprimality patterns forced by dr - er' = 2 — (d,e)|2, (d,r')=1, (e,r)=1, (n,n-2)|2, n odd on the squarefree class — are support restrictions and singleton-fiber-audit §3's counting shows both signs occupy a positive proportion of odd squarefree coprime pairs on a box; the density subtraction removes nothing exploitable by D3; the nonnegativity of L, L' leaves the sign on mu(n)mu(n-2). Also worth recording: on S_0, kt ≍ x^(29/100) < x, so every fiber holds ≍ x^(71/100) points — S_0 is the **opposite** extreme to the singleton family, whose lower bounds are for kv > x.

**D9 (the dilation average is not a shift average).** The map (r,s,r',s',m) -> n = d·rs is a bijection onto {(n,k,t): k|n, t|(n-2), corner cuts}; that bijection is D4. Therefore the x^(29/100+4eta_0+o(1)) pairs of prime dilations are the average over the factorisations of n and n-2 at the single fixed shift 2, not an independent resource. The change of variables the brief asks about exists — fixing r and varying r' moves d_0(r,r') = 2·r-bar mod r' over residues — but it moves the base point of a progression, not the shift of a correlation; the shift is invariant at 2, so the available additive-shift range is zero, at zero cost. **Matomaki-Radziwill-Tao averaged Chowla therefore has no purchase here, structurally, not merely by parameter mismatch (F-0905-11).** This is the note's central negative: it closes a route rather than opening one.

---

## Imported theorems: source, hypotheses, checked vs assumed

| source | what was read | average | coefficients / shift | saving | why it does not close S_0 | status |
|---|---|---|---|---|---|---|
| Tao, Forum Math. Pi 4 (2016) e8 = arXiv:1509.05422, Thm 1.2, 1.3 | log-averaged Chowla for two linear forms a_1n+b_1, a_2n+b_2 with a_1b_2-a_2b_1 != 0; Thm 1.3 the Elliott form with an explicit non-pretentiousness hypothesis | logarithmic on (x/omega, x] | a_i, b_i **fixed**; Thm 1.3 has a threshold A = A(eps, a_1, a_2, b_1, b_2) | qualitative o(log omega) | our a_i are r' ≍ x^(1/20), r ≍ x^(6/25), growing; threshold not uniform in them; a log-average o(1) is not a natural-average saving | CHECKED (statement + coefficient-dependent threshold). Already F-0905-11 |
| Matomaki-Radziwill-Tao, arXiv:1503.05121 | sum over h_1..h_k <= H of the absolute correlation is o(H^k X) for any H -> infinity | additive-shift average | forms fixed, shifts averaged | ≍ log log H / log H | no shift average exists here (D9) | CHECKED (abstract, main statement) |
| Helfgott-Radziwill, arXiv:2103.06853, Main Theorem | operator eigenvalues O(sqrt(L)) off a density-1 set, primes in [H_0,H] with log H_0 >= (log H)^(2/3+eps), log H <= (log N)^(1/2-eps); consequence (1/log x) sum lambda(n)lambda(n+1)/n = O((log log x)^(-1/2)) | logarithmic | fixed shift 1, lambda, no weights | (log log x)^(-1/2) | wrong average; saving is (log log)^(-1/2) against a requirement of log^(4+eps) | CHECKED (abstract, main theorem, prime ranges) |
| Pilatte, arXiv:2310.19357, Thm 1.1 | sum_{n<=x} lambda(n)lambda(n+1)/n << (log x)^(1-c), c > 0 absolute | logarithmic | fixed shift 1 | (log x)^(-c), c unspecified, "best possible with current methods" | wrong average; c not claimed > 4 (or > 2 for the sub-family); lambda not mu, no weights | Abstract CHECKED; value of c and exact Thm 1.1 form NOT checked |
| Tao-Teravainen, arXiv:1809.02518, Cor. 1.13 and the Chowla corollary | **unweighted** two-point Chowla/Elliott at all scales outside a set of logarithmic Banach density zero | natural within a scale; exceptional scale set | shifts fixed, no uniformity stated | qualitative o(X) | closest interface to the handoff's scale-average consumer and the only one on a natural average; blocked by fixed coefficients, and o(X) fibrewise gives o(eta_0^4 x log^4 x), not o(x) | CHECKED via ar5iv; proof uniformity NOT checked |
| arXiv:2608.23500 (2026), Thm 1.1 | (log x)^(1-c) for sum_{n<=y} lambda(n)lambda(n+h)/n for all h outside E_x with |E_x ∩ [1,H]| <<_A H(log x)^(-A) | logarithmic | fixed forms, h ranges | (log x)^(-c) | wrong average; h = 2 is one shift and is not shown to avoid E_x | CHECKED (abstract, theorem) |
| Tao-Teravainen, arXiv:2512.01739, Thm 3.1, Rem. 3.2 | quantitative correlations outside a small set of log scales; moduli/shifts bounded by a small power of a parameter <= log X | log scales | polylogarithmic coefficients | quantitative | our coefficients are fixed powers of x | ASSUMED from structural-literature-audit §3E |
| Frantzikinakis; Frantzikinakis-Host (arXiv:1611.09338) | ergodicity/genericity of the Liouville system implies Chowla | — | — | conditional | conditional on an unproved ergodic hypothesis | CHECKED at abstract level only |
| Klurman, Compositio 153 (2017); Klurman-Mangerel, Math. Ann. 372 (2018) = arXiv:1707.07817 | rigidity/converse theorems for binary correlations | — | fixed shifts | — | converse direction; no upper bound for our sum | CHECKED at abstract level only |
| Friedlander-Iwaniec asymptotic sieve, Thm 1 + (R),(B) | distribution + a signed bilinear hypothesis yields a prime asymptotic | — | — | — | (B) is itself a signed bilinear axiom; invoking it renames the problem | ASSUMED from structural-literature-audit §3F |

**Not verified and not used:** the brief's remark that Chowla for mu(an+b)mu(cn+d) with fixed a, c is equivalent to the two-point case. Tao's Thm 1.2 covers two linear forms directly in the log-averaged setting, which is what matters; a formal equivalence for the unaveraged conjecture was not located and nothing above relies on it.

### The two determinant-equation interfaces the coordinator flagged

**Bettin-Chandee, Adv. Math. 328 (2018) = arXiv:1502.00769v1, Corollary 1** (read at source, p. 3, eq. (1.4)). For Delta != 0, T = sum over m_1n_2 - m_2n_1 = Delta of f(m_1)g(m_2)alpha_{n_1}beta_{n_2} with alpha, beta arbitrary and f^(j) << eta^j M_1^(-j), g^(j) << eta^j M_2^(-j) for all j >= 0 and some eta > 1, the asymptotic holds with main term over (n_1,n_2)|Delta and error O((eta R)^(3/2) ||alpha|| ||beta|| (N_1N_2)^(7/20) (N_1+N_2)^(1/4+eps) (M_1M_2)^eps), R = M_1N_2/(M_2N_1) + M_2N_1/(M_1N_2). At the corner (Delta = 2, d ≍ x^(19/25), e ≍ x^(19/20), k = r ≍ x^(6/25), t = r' ≍ x^(1/20)), R ≍ 1 in all three matchings — the one hypothesis the corner meets comfortably — and:

| orientation | (M_1,M_2,N_1,N_2) | smoothness demanded of | required eta | error exponent at eta=1 | error exponent at the actual eta | main term |
|---|---|---|---|---|---|---|
| A smooth on the cofactors | (x^(6/25), x^(1/20), x^(19/20), x^(19/25)) | beta_V(k), beta_Z(t) | ≍ x^(6/25) | 1691/1000 | 2051/1000 | ≍ x |
| B smooth on the divisors | (x^(19/25), x^(19/20), x^(1/20), x^(6/25)) | mu(d), mu(e) | ≍ x^(19/25) | 613/2000 | 2893/2000 | ≍ x |
| C primes absorbed, smooth on s, s' | (x^(2eta_0), x^(2eta_0), x, x) | the constant 1 | O(1) | 39/20 | 39/20 | ≍ x^(1+2eta_0) |

**Orientation B is the only one whose norms work and it fails exactly on smoothness**, as the coordinator predicted, and by an explicit margin: at eta = 1 the error exponent is 613/2000 against a main term of exponent 1, the affordable budget is eta < x^(1387/3000) (from (3/2)log_x eta + 0.3065 < 1, i.e. f, g constant on scales x^(893/3000) and x^(1463/3000)), and mu forces eta ≍ x^(19/25), giving 2893/2000 — **a gap of x^(893/2000), entirely the smoothness hypothesis**. Orientation A puts the arbitrary coefficients on the long variables and is already x^(691/1000) above the object before smoothness (the corollary saves N^(1/20) at N ≍ M; our box has N_1N_2 = x^(171/100) against M_1M_2 = x^(29/100)). Orientation C meets the smoothness hypothesis but is x^(19/20) above the object on norms. Smoothness and the norm budget are satisfiable at the corner only in mutually exclusive orientations. A separate agent owns Corollary 1 on the bulk; none of this bears on that.

**Guria, arXiv:2410.10856v2, Theorems 1.2 and 1.3** (read at source). Theorem 1.2 counts (a,b,p,d) in [-X,X]^4 with ad - pb = r, p prime, one weight alpha(a) = O(a^eps), b and d free; Theorem 1.3 has two primes and gives S_r(X) = 8 K_r (li X)^2 + O(X^(1+3/4+eps) + r^(1/5) X^(1+11/20+eps)) uniformly for 0 < |r| << X^(2-eps), by Poisson summation in the unrestricted b, d and averaging Kloosterman fractions over the prime. It is the one located published mechanism using exactly the corner's prime structure, so the transfer question is real. Three blocks, increasing in severity:

1. *Box shape (quantitative).* Her cube error evaluated at X = the corner's largest variable x^(19/20) is X^(7/4) = x^(133/80) = x^(1.6625) and, at r = 2, r^(1/5)X^(31/20) = x^(589/400); the corner's whole term-wise mass is x^(1+o(1)). Her relative saving X^(-1/4) against a main term X^2 would be far more than sufficient if it transferred, but no such statement is proved for an unbalanced box, and the balance is where the Poisson step enters.
2. *The Poisson step needs a long free variable.* Poisson in a variable of length L against modulus q gives a dual of length ≍ q/L and helps only when L >= q. In her cube, b, d have length X against moduli ≍ X, dual length ≍ 1. At the corner the only unweighted variables are the cofactors: k has length x^(6/25) against a modulus e ≍ x^(19/20), dual length x^(71/100) — longer than the original by x^(47/100); r' is shorter still. Her prime is comparable to the other variables; ours are x^(6/25) and x^(1/20), and the r'-average has only x^(1/20+2eta_0+o(1)) terms.
3. *Two Mobius weights, and no main term (structural, decisive).* Her theorems allow one arbitrary weight; the other three variables are free, which is why Poisson applies and why the conclusion is an asymptotic with a genuine main term ≍ (li X)^2. The corner carries mu(d) **and** mu(e) on the two long variables and prime restrictions on both short ones — no free variable exists — and by D3 the density on S_0 is already subtracted and O_H(x/log^H x), so there is no main term to produce; the object *is* the fluctuation. A counting theorem reaches it only through its error term, and by item 1 that term alone exceeds it.

What would have to be proved: an analogue of Thm 1.3 for the unbalanced box with arbitrary bounded coefficients on **both** long variables and error o(x/log^K x). By D6 that statement is, given the complement, at least as strong as a quantitative twin lower bound — not a reason to dismiss the mechanism, but a reason not to expect it from a parameter substitution.

### The decisive quantitative comparison

On the natural average at a single scale, **no saving of any size is known** for sum_{n<=x} lambda(n)lambda(n+h) at a fixed h != 0. The corner needs, on the natural average: a saving of log^(-4-eps) x (log^(-2-eps) x on the sub-family), uniform over ≍ x^(29/100) prime dilations of sizes x^(6/25) and x^(1/20) and over x-dependent weights L, L'. Strictly stronger on all three axes — average type, saving size, coefficient uniformity — than a problem that is open with no saving. The one partial route with a matching quantifier is the handoff's scale-average consumer (5) against Tao-Teravainen's "almost all scales"; converting one into the other still needs dilation uniformity, the weights, and a quantitative log^(4+eps) saving in place of o(X). That is a specification of a transfer, not a transfer.

## The parity input, named

Inputs used in this note: exact divisibility and CRT algebra; the classical Mobius mean (Tao, Notes 2, Exercise 66) through signed-divisor-grouping (7)-(8); quantitative PNT (Tao, Notes 2, Corollary 39); Mertens; counting. **No step uses more than residue and density information plus those classical means** — no bilinear estimate, no large sieve, no sieve upper bound beyond counting.

Does closing S_0 need more? **ASSESSMENT, medium-high confidence, not a theorem: yes.** By D4 the corner's leading family is literally sum_n mu(n)mu(n-2) L(n)L'(n-2) with L, L' >= 0; it does not resemble the parity difficulty, it is the two-point Mobius correlation at shift 2, weighted. Every unconditional advance on that object uses inputs beyond residue counting and sieve upper bounds (Halasz/pretentious distance, MRT short-interval averages, entropy decrement, expander and non-backtracking estimates), and nothing in the tile framework supplies any of them. **No obstruction theorem is claimed**: per F-0905-01 and the parity gate, that would require a named method class with its retained statistics, error tolerance and quantifiers, and a proof at that scope. None is offered. What is derived instead is narrower: D9 (no shift average exists), D5/D6 (the gap is log^(4+eps) on a natural average, and the one-sided form is the conclusion), D7 (eta_0 cannot be shrunk).

## Payoff, exactly

A complete corner estimate would leave the reduction S = C_2 x + E_dagger + O_H untouched and change only the accounting: |E_dagger|_{S_0}| = o(x) reduces the sufficient consumer to a statement about W_dagger \ S_0 alone. It changes **no** block budget ((1+a)/2, a/2+3b/2, a), **no** region (delta < 19/25 and delta + 3nu < 161/100), and **not** target (21) or its "more than 3/50". It does **not** raise the uniform product threshold — still every fixed exponent below 19/25; the witness (8/25, 11/25) is outside S_0. It does **not** license dropping the vertical cutoff delta < 19/25 in (15), because S_0 is the *intersection* of the two top strips: the d-edge strip S_R and the e-edge strip S_T survive, costing gamma = 11/10 and gamma = 37/25. Conversely wave-1 D1 says no nonzero-kernel improvement of any size reaches S_0. The two halves are disjoint, neither is proved, and both would still have to be combined with the unproved uniform saving.

**Triage opinion (mine, flagged).** The absolute target on the s = s' = 1 sub-family — D4's identity with a log^(2+eps) saving — is the smallest well-posed piece and the only one whose statement is a recognisable open problem rather than an equivalent of the theorem. I would not spend an attempt on the one-sided form: D6 shows it is the conclusion. Medium confidence; triage, not a result.

## Validation, controls, and what is not tested

`research/corner-correlation-validation.js`, output embedded via `node research/qc/embed.js`, 1.8 s, three parameter sets. At reachable x the asymptotic windows are degenerate (Z = floor(x^(1/20)) = 2 at x = 2^22), so two cases use larger cutoff exponents w, v so that the s > 1, s' > 1, prime-power and g = 2 branches are populated; the corner is defined intrinsically as V < k <= V·Delta, Z < t <= Z·Delta with Delta standing for x^(2eta_0). Values are exact integer combinations of log(r)log(r').

Passing in all three cases: direct four-variable enumeration = fiber/CRT progression = prime-band form (1) = two-point form + independently computed non-squarefree remainder.

Controls: C1 un-reduced modulus T in place of T/g; C2 keep only s = s' = 1; C3 shift 4 instead of 2; C4 drop mu(k) inside the two-point weight; C5 widen the right corner cut. Four active in all three cases. C4 is **inactive** at the case with v = 1/20, for a derived reason rather than a defect: there s = s' = 1 is forced on the squarefree class, so mu(k)mu(t) = 1 identically; it is active in the other two.

Not tested: any asymptotic rate, saving or cancellation; the density subtraction D3 (asymptotic); D5's eta_0 dependence; D7.

## Uncontrolled sectors and unreviewed dependencies

- W_dagger \ S_0 entirely (needs gamma = 2 uniformly; wave-1 Q3).
- D3 rests on signed-divisor-grouping (7)-(8) being uniform in the excluded-prime parameter; stated there for m <= x^2, used here at m <= 2x. ASSUMED, not re-derived.
- D7 assumes the complement's saving is x^(1-c·eta+eps) with c absolute; only the budget inequalities were used, not grouped-divisor-moment's proof.
- grouped-divisor-moment (2)-(3) and Pascadi Lemmas 3.2-3.3 are used only through the wave-1 budget table and are ASSUMED.
- The wave-1 Q1/Q3 arithmetic is used as given; only its x^(39/40) sizing remark was re-derived, and corrected (D2).

## What would change the reading

- A natural-average two-point result with a power-of-log saving, uniform in linear coefficients of size x^(6/25) and x^(1/20) — that is the whole target, and would be a major theorem.
- A proof that the s = s' = 1 sub-family is *not* the hard part, i.e. that the non-squarefree/s > 1 class can be handled separately — the finite runs say it carries the majority of the mass, so this is not obviously the easier half.
- A domain partition other than the one-parameter eta_0 family, which would void D7.
- An error in D9's bijection would reopen the MRT reading; it is verified exactly by the A == C identity check.

## Repository state

`git status` shows only the two files I created. Two QC findings are mine and both need an edit I am fenced off from, so an integrating agent must make them:
- `crosslinks`: `research/corner-correlation.md` is not yet referenced by any working document (router / README row).
- `ledger`: TODO.md item C must list `Q-corner-correlation` on its `Ledger:` line.

The other findings in the run (`research/kernel-sign-control.js` stale embed, uncited `left-divisor-signs-validation.js` and `reachability-validation.js`) belong to concurrent agents.
