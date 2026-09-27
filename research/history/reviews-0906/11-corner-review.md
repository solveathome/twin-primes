# 11 — Adversarial review: `research/corner-correlation.md`

> Public mirror edition: repository-internal working instructions were removed. See MIRROR.md.

## Verdict

**DEFECT FOUND — `research/corner-correlation.md`:74–76, claim D1: "so **exactly
one** prime power above the cutoff divides each cofactor" is false as stated, and
the note's own validator counts the exceptions (2 and 5) without the note saying so.**

Three further line-specific defects, all repairable, none of which changes the
note's conclusions:

- `research/corner-correlation.md`:565 — "clearing them costs gamma=11/10 and
  gamma=37/25" imports report 04's already-corrected error (see `06-residual-coverage-review.md`
  Part 2). Understates the cost; the correction strengthens the note's negative.
- `research/corner-correlation.md`:630 — "§3.1's bijection: verified exactly by the
  A==C identity check". It is not: `corner-correlation-validation.js` `bandSum`
  iterates over *every* prime power in β's support, so A==C holds whether or not
  the split is unique. The falsifier as written did not run.
- `research/corner-correlation.md`:9 (ledger `verdict:`) — "on norms by x^(691/1000)
  where smoothness works" misattributes: 691/1000 is orientation **A**, where
  smoothness does **not** work (it costs a further 360/1000). The orientation where
  smoothness works is **C**, whose norm excess is 19/20.

Twin-prime infinitude and the sufficient margin C_2 x + E_dagger >= c_0 x/log^K x
remain OPEN. Nothing in this review bears on either.

---

## D1 — D9

| # | claim | verdict | decisive step reproduced / exact failure |
|---|---|---|---|
| **D1** | exact corner sum with s,s'>1, prime-power classes, (rs,r's')\|2, valid 0<eta_0<1/400 uniformly for fixed H; uniqueness from k<V², t<Z²; (r,r')=1 automatic for eta_0<19/200 | **DEFECTIVE** in one step; the rest CHECKED | **The failure.** `corner-correlation.md`:74–76. k<V² excludes two prime powers above V **with distinct bases** (p^a·q^b > V² if p≠q), but *not* two powers of the same base. Explicit counterexample at the note's own case 1 (V=38, Kmax=152): k=128<V²=1444 has both 64>38 and 128>38 as prime-power divisors, so beta_V(128)=2log2, not log P. Symmetrically t=32 with Z=15 has {16,32}. The validator prints exactly this: `two-prime-powers-above-cutoff=2` (case 1), `=0` (case 2), `=5` (case 3). The class is contained: two powers of one base forces v_p(k)>=2, hence P>V^(1/2), hence it sits inside the a>=2 class the note already bounds. **Correct statement:** *at most one prime base contributes; up to the proper-prime-power class of size O(x^(22/25+eps)) (left) and O(x^(39/40+eps)) (right), exactly one prime power divides each cofactor and the weight is (log r)(log r').* One-sentence repair; (1) and every downstream conclusion survive unchanged. **CHECKED separately:** eta_0<3/25 gives k<V², eta_0<1/40 gives t<Z² (both implied by 1/400); s=k/r<x^(2eta_0)<Z<V; band disjointness (Z x^(2eta_0) <= V ⟺ 2eta_0 <= 6/25−1/20 = 19/100) gives eta_0 <= 19/200 exactly; the CRT parametrisation (K/g)d_0 ≡ 2/g (mod T/g), d = d_0+(T/g)m, e = e_0+(K/g)m, g\|2 is correct (multiply the congruence by g to get Kd_0 ≡ 2 mod T, so e_0 ∈ Z). **One further imprecision:** "I(K,T) … has length gx/(2KT)+O(1)" holds at the *foot* of the bands only. At the top, K → x^(6/25+2eta_0) makes x/K → D_1 and the window collapses; the note's next sentence does restrict to "at the foot of the bands", so the general claim is over-stated by one clause. |
| **D2** | e-edge proper prime power class O(x^(39/40) log^C x) is negligible against x/log^H x | **CHECKED** | x^(39/40)log^C x·log^H x/x = log^(C+H)x/x^(1/40) → 0 for every fixed C,H. The correction to `04-reachability-coverage.md`:215 is right, and was found independently in `06-residual-coverage-review.md` Part 2 (same conclusion, same reason). **One over-claim:** "Nothing else in that report depends on the point." Report 04's J4 (line 456) does — "its proper-prime-power class alone costs x^(39/40) and must be carried" is one of four reasons J4 gives for deprioritising the e-edge. J4's other three reasons stand; the sentence should read "nothing else in that report's derived content depends on it." |
| **D3** | on the corner q=ab/g >> x so each compatible class meets J_x at most once; M\|_{S_0}=O_H(x/log^H x); hence E_dagger\|_{S_0}=R\|_{S_0}+O_H; the sawtooth formalism can be dropped | **CHECKED**, with one ASSUMED import | q >= (1/2)x^(171/100−4eta_0) >> x from a>=d>x^(19/25−2eta_0), b>=e>x^(19/20−2eta_0): correct, and 171/100−4eta_0 > 1 for eta_0<1/400 with room. **Hypothesis check, as asked.** `signed-divisor-grouping` (7)–(8) needs (i) exclusion parameter m <= x², (ii) the inner sum over a in an interval with lower endpoint >= U/2, (iii) t_0 ∈ [x/2−2,x], c ∈ {1,2}. All three hold: on S_0, m = 2b_o <= 2es <= 2·x^(19/20)·x^(1/20) = 2x <= x²; the S_0 region is a *product* region in (d,e), so at fixed (n,e,r,s) the d-interval is (max(U,D_1), D_0], and after d = 2^eps a the a-interval has lower endpoint >= U/2; the weight is f_1(n;d)=log(n/d) with n ∈ J_x, exactly (8)'s second display. The note's §1.3 says "m<=2es<=x^2" while §6 says "used here at m<=2x" — both true, no conflict. The restriction is legitimate because E_dagger (residual-coverage (16)) and M (signed-divisor-grouping (11)) are both term-wise sums over (d,e,r,s), so R = M + E is restrictable to any (d,e) sub-region; S_0 ⊂ W_dagger is verified below. Also CHECKED: the identity (9) needs no separate k>V check, since beta_V(k)=0 whenever k<=V. **ASSUMED:** the lemma (7)–(8) itself is not re-derived here (review 02 checked it, per `06`). |
| **D3′** | S_0 ⊂ W_dagger for eta_0 < 1/400 | **CHECKED** | de: 19/25+19/20−4eta_0 = 171/100−4eta_0 > 3/4. d⁵e²: 5·19/25+2·19/20−14eta_0 = 57/10−14eta_0 > 49/20. d: 19/25−2eta_0 = 152/200−2eta_0 > 151/200 ⟺ eta_0 < 1/400. The "exactly when" is exact. Floors do not bite (fixed exponent gap). |
| **D4** | R\|_{S_0} = Σ_n C^{S_0}(n)C'^{S_0}(n−2) exactly; on s=s'=1 it is Σ μ(n)μ(n−2)L(n)L'(n−2) + O(x^(19/20+eps)); μ(n)μ(n−2)≠0 ⟹ n odd ⟹ g=1; g=2 lives where μ(n)μ(n−2)=0, μ(d)μ(e)≠0; the non-squarefree class carries the majority of the mass at the tested parameters | **CHECKED** (the last item as a MEASUREMENT, and it is labelled as one) | (4) is `singleton-fiber-audit` (3) with the corner cuts inserted into the divisor conditions; n=dk, n−2=et is a bijection between the four-variable and the two-point index sets. (5): if s=s'=1 and (d,r)=1 then n=dr is squarefree, μ(d)=μ(n)μ(r)=−μ(n) and μ(e)=−μ(n−2), so μ(d)μ(e)=μ(n)μ(n−2) with weights log r, log r'. The only discrepancy is r\|d, i.e. r²\|n, costing Σ_{r>x^(6/25)} x/r² << x^(19/25), and r'²\|(n−2) costing Σ_{r'>x^(1/20)} x/r'² << x^(19/20); with log² x weight, O(x^(19/20+eps)) is right. 2-adic rider: μ(n)μ(n−2)≠0 forces n odd, because n even makes n and n−2 consecutive even numbers, one of which is 0 mod 4; then k\|n and t\|(n−2) are both odd, so g=(k,t)=1. Correct. g=2 needs k,t both even, hence n even, hence μ(n)μ(n−2)=0. Correct. **Measurement, verified by re-running:** mass(n or n−2 non-squarefree)/total = 2713808/3809775 = 71.2%, 1026735/1453572 = 70.6%, 955040/1358424 = 70.3% across the three cases. Majority confirmed; the note labels it "at the finite parameters of §6", which is the right calibration. |
| **D5** | term-wise absolute mass ≍ eta_0⁴ x log⁴ x; ≍ eta_0² x log² x on s=s'=1 | **CHECKED in order; two displayed constants not derived** | Mertens gives Σ_{V<r<=Vx^(2eta_0)} (log r)/r = 2eta_0 log x + O(1) and Σ_{s<x^(2eta_0)} 1/s = 2eta_0 log x + O(1), so the product is **4**eta_0²log²x, not the 2eta_0²log²x displayed at lines 217/219; with the CRT count x·g/(2kt) the full mass is ≍ 8eta_0⁴ x log⁴ x. Since the headline uses ≍ without a constant, the order claim stands; the constant "2" is decoration and is not derived (the note's own lower-bound route restricts s,s' to odd squarefree, which changes it again, to ≈1.6). Consistency with reachability Q1.5 CHECKED: (25/3)eta_0·40eta_0·(3/250)log²x = 4eta_0²log²x for the sub-family, same order as the note's 2eta_0²x log²x. **Second slip, line 227:** "the x^(29/100+4eta_0+o(1)) **quadruples**". The quadruple count is x^(6/25+2eta_0)·x^(2eta_0)·x^(1/20+2eta_0)·x^(2eta_0) = x^(29/100+**8**eta_0+o(1)); 4eta_0 is the count of (r,r') *pairs*, which is what line 319 correctly says. Harmless (eta_0<1/400 puts both far below x^(3/10)) but arithmetically wrong where written. |
| **D6** | S(x)>=0 gives E_dagger >= −C_2x − O_H; given the complement, a one-sided corner bound is equivalent to a quantitative twin lower bound | **CHECKED as an implication chain; "equivalent" needs the conditional and a log-power qualifier** | (7) is immediate from S = C_2x + E_dagger + O_H and S >= 0. The precise statement is: *given* the complement hypothesis W_dagger\S_0 = O_H(x/log^H x) with H>K, (6) ⟺ C_2x+E_dagger(x) >= c_0x/log^K x ⟺ S(x) >= c_0x/log^Kx + O_H(x/log^Hx). Each ⟺ is an equivalence up to absorbing O_H into c_0 (legitimate for H>K, `endpoint-target-audit` §2). The last of these *implies* N_2(x) >= (c_0/2)x/log^(K+2)x (endpoint-target-audit (4)), and is implied by a twin count >= c x/log^K x; so "equivalent to a quantitative twin lower bound" is loose by two log powers and a constant at the outer step. **Recommended phrasing:** "implies and is implied by the sufficient margin, given the complement hypothesis; and the sufficient margin sits between two quantitative twin lower bounds differing by log² x". **One wording over-claim:** "(7) holds with **no arithmetic input at all**" (line 254). It holds with no *further* arithmetic input; the reduction S = C_2x+E_dagger+O_H that it is applied to is the whole upstream arithmetic. |
| **D7** | eta_0 cannot shrink: absolute control needs eta log x << log^(−K/4)x, complement control needs eta log x >> log log x | **CHECKED given its stated assumption; the assumption is ASSUMED-UNVERIFIED and the note says so** | Absolute side: eta⁴log⁴x << log^(−K)x ⟹ eta << log^(−(K+4)/4)x ⟹ eta log x << log^(1−(K+4)/4)x = log^(−K/4)x. Exact. Complement side: with a per-box bound x^(1−c·eta+eps), being o(x/log^Kx) needs x^(−c·eta+eps)log^K x → 0, i.e. c·eta·log x − eps·log x >> K log log x; ignoring eps (which must be taken as a function of eta or the bound exceeds x), eta log x >> log log x. Since log^(−K/4)x → 0 while log log x → ∞, incompatible for every K >= 0, by a factor at least log log x. **The assumption is not justified by the reachability budgets**, and the note flags exactly this in §6 ("only the budget inequalities were used"). What the budgets do give: the strict-margin parameter eta_0 enters the moment shape as "all three budgets <= 1−eta_0", so the natural per-box bound is x^(1−eta_0) with c=1 — which is the assumed shape, but only per box and only *if* the assumed uniform gamma=2 saving exists at all. Consistent with `06-residual-coverage-review.md`'s independent remark that eta_0 ≍ log log x/log x is the admissible scale and the corner still carries mass >> x there. |
| **D8** | no structural positivity or sign bias in the corner sum | **ASSESSMENT, correctly labelled** ("Assessed candidate by candidate"); each row CHECKED as a negative | The diagonal row is right: u_1=u_2,h_1=h_2 is nonnegative only inside the second moment after the first Cauchy; (1) is the raw signed sum. The coprimality row is right: (d,e)\|2, (d,r')=1, (e,r)=1 are support restrictions; `singleton-fiber-audit` §3 (6)–(8) does derive \|G_+\|,\|G_−\| >> UY on a box of odd squarefree coprime pairs, and the transfer to the corner's boxes is a re-run of the same fixed-P argument (I did not re-derive it at the corner's scales). The density row follows from D3. The longest-fiber row is right: kt ≍ x^(29/100) < x so fibers have ≍ x^(71/100) points, the opposite extreme to `singleton-fiber-audit`'s kv>x singletons; the note correctly says no sign information transfers either way. The heuristic square-root paragraph is labelled heuristic and carries no weight. A negative search result is not a theorem that no bias exists, and the note does not claim it is. |
| **D9** | the (r,r') average is the factorisation structure of one n-sum at fixed shift 2; zero shift range; MRT has no purchase | **CHECKED as to the structural conclusion; the word "bijection" is inaccurate, and its stated falsifier did not run** | The structural conclusion is correct and is the note's most useful content: the index set of (1) is {(n, r, s, r', s') : rs\|n, r'\|(n−2)s'-wise, corner cuts}, i.e. a re-indexing of Σ_n C(n)C'(n−2) — no additive shift is ever varied, the difference dk−et is pinned at 2, so an average over h_1..h_k <= H with H→∞ (MRT's entire content) has nothing to range over. **Two defects in how it is written.** (a) The map is *not* a bijection onto {(n,k,t): k\|n, t\|(n−2), corner cuts}: when k has two prime powers above V (D1's exception class) two distinct (r,s) give the same k. It is a bijection onto {(n,k,t,r,r') : r ∈ supp beta_V(k), r' ∈ supp beta_Z(t)}, which is what (4) and the validator actually realise, and which supports the conclusion just as well. (b) Line 630 lists "§3.1's bijection: verified exactly by the A==C identity check". Reading `corner-correlation-validation.js` `bandSum` (lines 265–309): it loops `for (const r of bK[K])` over every prime power above the cutoff, so A==C is an identity *by construction* and cannot detect a failure of uniqueness. **That falsifier did not run.** The claim it was supposed to protect is nevertheless correct on other grounds. |

### Pricing 1 — Bettin–Chandee Corollary 1 at the corner

Recomputed in exact rationals independently of the note (`scratchpad/bcprice.js`),
with ‖alpha‖ = N_1^(1/2), ‖beta‖ = N_2^(1/2) for arbitrary bounded coefficients and
(N_1+N_2)^(1/4) taken at max(N_1,N_2). **All figures reproduce exactly.**

| orientation | matching to dk−et=2 | error exp. at eta=1 | at the actual eta | note's figures |
|---|---|---|---|---|
| A (smooth on cofactors) | m_1=k, m_2=t, n_1=e, n_2=d | 19/40+19/50 + (7/20)(171/100) + (1/4)(19/20) = **1691/1000** | +(3/2)(6/25) = **2051/1000** | match |
| B (smooth on divisors) | m_1=d, m_2=e, n_1=t, n_2=k | 1/40+3/25 + (7/20)(29/100) + (1/4)(6/25) = **613/2000** | +(3/2)(19/25) = **2893/2000** | match |
| C (primes absorbed) | m_1=s, m_2=s', n_1=er', n_2=dr | 1/2+1/2+7/10+1/4 = **39/20** | 39/20 | match |

Derived readings, all reproduced: B's saving at eta=1 is x^(1387/2000); the
affordable smoothness budget is log_x eta < 1387/3000 (from (3/2)log_x eta + 613/2000
< 1), i.e. f,g constant on scales x^(893/3000) and x^(1463/3000); the actual gap in
B is 2893/2000 − 1 = **893/2000**; A's excess at eta=1 is 691/1000; C's is 19/20.
R ≍ 1 in all three (M_1N_2/(M_2N_1) = x^(6/25+19/25−1/20−19/20) = x^0 in A, and
likewise in B and C). **The one substantive caveat:** treating mu(d) as admissible
with eta ≍ M_1 requires a smooth interpolation whose j-th derivatives are O_j(1);
BC's hypothesis is "f^(j) << eta^j M_1^(−j) for all j >= 0 and some eta>1" with
j-dependent implied constants, so the price is right in exponent but the constant
is not uniform in j. This makes the corollary *less* usable, not more, so the note's
negative conclusion is unaffected. The ledger's `verdict:` line mislabels which
orientation "smoothness works" in (see the verdict block above).

### Pricing 2 — Guria comparison

`19/20 · 7/4 = 133/80 = 1.6625` and `19/20 · 31/20 = 589/400 = 1.4725` at r=2:
both reproduce exactly. The three blocks are correctly ordered by severity, and
block 3 (two Mobius weights on the two long variables, no free variable to Poisson
in, and by D3 no main term left to produce because the density is already
subtracted) is the decisive one and is derived, not asserted. Block 2's Poisson
diagnostic (dual length ≍ q/L, helps only for L >= q; at the corner k has length
x^(6/25) against modulus e ≍ x^(19/20), dual x^(71/100), longer by x^(47/100))
is arithmetically correct. Block 1 is a quantitative pricing, correctly labelled.

### Parity line and the assessment paragraph

The `parity:` ledger block and §4 satisfy the repository's rule. §4 explicitly
declines the obstruction claim, cites F-0905-01, and names what *is* derived
instead (D9, D5/D6, D7). Two sentences exceed what is derived and should be
scoped, not deleted:

1. §4: "**Every** unconditional advance on that object uses inputs beyond residue
   counting and sieve upper bounds". This is a universal quantifier over the
   literature backed by nine sources. Scope it: "every unconditional advance
   reviewed here".
2. §3.4: "On the natural average at a single scale, **no saving of any size is
   known**". True to my knowledge and consistent with everything read, but it is a
   claim about the state of the literature, i.e. an assessment, and sits in a table
   column headed "best read in the literature" — acceptable as written, but it is
   not a derived statement and should not be re-quoted as one.

Neither is an obstruction claim; the note does not assert a method class, retained
statistics, error tolerance or quantifiers for an impossibility, and says so.

---

## Imported theorems: source, hypotheses, met or not

| import | primary source, what I did | hypotheses | met? |
|---|---|---|---|
| **Bettin–Chandee, Corollary 1** (arXiv:1502.00769) | **CHECKED at source by me** via ar5iv. The error term is verbatim as the note quotes it: `O((ηR)^(3/2)‖α‖‖β‖(N₁N₂)^(7/20)(N₁+N₂)^(1/4+ε)(M₁M₂)^ε)` with `R = M₁N₂/(M₂N₁)+M₂N₁/(M₁N₂)`, hypothesis `f^(j) ≪ η^j M₁^(−j)`, `g^(j) ≪ η^j M₂^(−j)` for all j≥0 and some η>1, α and β arbitrary complex, Δ a fixed nonzero integer. | smoothness of f,g; Δ ≠ 0 fixed; dyadic supports | **Not met at the corner in any orientation**, exactly as the note derives. The *main term* form ("over (n_1,n_2)\|Δ") and the published Adv. Math. 328 (2018) numbering I did **not** verify. |
| **Guria** (arXiv:2410.10856) | Abstract CHECKED by me: determinant equation x₁x₂−x₃x₄=r, r≠0, expanding cube [−X,X]⁴, **two** prime entries, power-saving error, method = Poisson summation + Kloosterman fractions over primes. All four structural features the note relies on are confirmed. | cube box; free variables for Poisson; one arbitrary weight | **Not met.** The exact error exponents (X^(1+3/4+eps), r^(1/5)X^(1+11/20+eps)), the constant 8K_r, and the uniformity 0<\|r\|<<X^(2−eps) are **ASSUMED-UNVERIFIED by me** (the arXiv abs page does not carry the theorem text); the note says "read at source". |
| Tao, arXiv:1509.05422 Thm 1.2/1.3; MRT arXiv:1503.05121; Helfgott–Radziwiłł arXiv:2103.06853; Pilatte arXiv:2310.19357; Tao–Teräväinen arXiv:1809.02518; arXiv:2608.23500 | **ASSUMED-UNVERIFIED by me.** Not fetched in this review. The note labels each row CHECKED/ASSUMED itself, with the specific caveats ("Pilatte: value of c and exact Thm 1.1 form NOT checked", "TT: proof's uniformity NOT checked"), which is the right calibration. | fixed coefficients; logarithmic average (or almost-all-scales) | Not met — the note's three-axis table (average type, saving size, coefficient uniformity) is the correct reason and I found no error in it. |
| Tao–Teräväinen arXiv:2512.01739; Friedlander–Iwaniec asymptotic sieve | carried from `structural-literature-audit`, labelled ASSUMED in the note | — | not re-checked here |
| `signed-divisor-grouping` (7)–(8) excluded-prime Möbius mean | **applicability CHECKED by me** (three hypotheses, above); the lemma itself **ASSUMED** | m <= x²; d-interval lower endpoint >= U/2; t_0 ∈ [x/2−2,x] | met |
| `singleton-fiber-audit` (3) regrouping; §3 (6)–(8) sign-balance | (3) **CHECKED** (it is the identity (4) needs); §3 read, its transfer to the corner's boxes **ASSUMED** | fixed-P Möbius mean, summable large-common-prime density | met for (3); plausible but not re-derived at corner scales for §3 |
| `grouped-divisor-moment` (2)–(3), Pascadi Lemmas 3.2–3.3 | **ASSUMED**; used only through the reachability budget table, as the note states | — | not re-checked |
| `04-reachability-coverage.md` Q1/Q3 arithmetic | **ASSUMED as given** by the note; independently reviewed in `06-residual-coverage-review.md` Part 2, which found three derived errors. The note corrected one (x^(39/40)) and inherited another (the S_R/S_T clearing costs, line 565). | — | one inherited defect |

---

## Validator

`node research/corner-correlation-validation.js` — ran from the repository root,
1.80 s (matches the note's 1.8 s). `node research/qc/embed.js --check
research/corner-correlation-validation.js` returns **exit 0**: `code-sha256 matches`,
`body matches out-sha256 — the pasted block is bit-honest`, `out-sha256 matches`.
The embedded block is bound to the code and to a real run; nothing was hand-pasted.

All four identities pass in all three cases. Controls: C1, C2, C3, C5 active in all
three; C4 (drop mu(k)) INACTIVE(0) at (x=2^22, w=6/25, v=1/20). **The note's stated
reason for that inactivity is correct, and I verified it directly** (`scratchpad/c4probe.js`,
78,729 squarefree-class terms enumerated, zero with mu(k)mu(t) ≠ 1). The mechanism is
D4's 2-adic rider: mu(n)mu(n−2)≠0 forces n odd, so k is odd and t is odd; with V=38,
Kmax=114 the only odd squarefree k with a prime power above 38 is k=p (the next
candidate 3·41=123 exceeds Kmax), and with Z=2, Tmax=6 the only odd t are 3 and 5.
Hence s=s'=1 identically on that class and mu(k)mu(t)=(−1)(−1)=1.

**What the four representations do and do not test.** They test what the note says
in three of four cases: A==B tests the CRT progression parametrisation of §1.2
including both g branches (C1 falsifies it by using T instead of T/g); A==D tests
the two-point regrouping of §1.4 including the independently computed
non-squarefree remainder (C4 falsifies it where the class is populated); the
class-mass split is a genuine measurement and is labelled as one. **A==C does not
test what line 630 says it tests** — `bandSum` sums over the full beta-support, so
it verifies the (r,s) re-indexing *with multiplicity*, not the uniqueness of the
split, and not the injectivity asserted in §3.1. The uniqueness claim is in fact
falsified by the script's own `cofactorsWithTwoPrimePowersAboveCutoff` counter (2, 0, 5),
which the note never quotes.

The note's own scope disclaimer is accurate: "These are identity checks. No
asymptotic rate, saving or cancellation is measured, and the density subtraction (3)
is not tested."

---

## What I did not check

- The published statements of Tao 1509.05422 Thm 1.2/1.3, MRT 1503.05121,
  Helfgott–Radziwiłł 2103.06853, Pilatte 2310.19357, Tao–Teräväinen 1809.02518 and
  2512.01739, and arXiv:2608.23500. I fetched none of them; the note's own
  CHECKED/ASSUMED labels on those rows are taken at face value.
- Guria's Theorems 1.2/1.3 beyond the abstract; the exact error exponents and the
  uniformity range in r.
- Bettin–Chandee's main term and its published (Adv. Math.) numbering.
- `signed-divisor-grouping` (7)–(8) as a proof; `singleton-fiber-audit` §3's transfer
  to the corner's boxes; `grouped-divisor-moment` (2)–(3); Pascadi Lemmas 3.2–3.3.
- The interior of `04-reachability-coverage.md` beyond the four items the note
  actually leans on (Q1.1, Q1.2, Q3.1's strips, Q3.5's gamma=2).
- Whether the sufficient margin is plausible. Out of scope.
- `research/qc.js` and `research/audit-numbers.js`: not run (they may write).
- The concurrent notes `kernel-sign-control.*`, `left-divisor-signs.*`,
  `determinant-corollary.*`, `reachability-coverage.*` — excluded by the brief.

---

## Does the bottom line stand?

**Yes, at rung DERIVED, with the D1 sentence repaired.** Three things are derived
and survive adversarial pressure. First, the corner *is* the two-point Möbius
correlation at the fixed shift 2: (4) is an exact regrouping, and on the s=s'=1
sub-family (5) is literally Σ_n mu(n)mu(n−2)L(n)L'(n−2) with L,L' >= 0 up to
O(x^(19/20+eps)) — I reproduced both derivations and the two riders, and the
finite identity checks pass with a bit-honest embed. Second, the one-sided form is
the conclusion and not a lemma: given the complement, (6) is inter-derivable with
the sufficient margin, and (7) already holds for free from S(x) >= 0, so the entire
content of a one-sided corner attack is the margin itself. Third, no kernel
improvement reaches the corner, because the cross term enters neither the zero nor
the period budget — that is report 04's Q1, independently confirmed in review 06,
and this note adds nothing to it but does not weaken it. What does **not** stand as
written: the "exactly one prime power" step (false, repairable in one sentence, no
downstream consequence), the "bijection … verified by A==C" falsifier (did not
run), the imported gamma=11/10 / 37/25 edge-clearing costs (understated; the true
cost is gamma → 2), the ledger's smoothness/norms attribution, and two displayed
constants in §1.5. None of these touches the bottom line; two of them make the
note's negative stronger.

**Sentence the live documents should carry** (and nothing more than this):

> On the corner S_0 of W_dagger, where both cofactors lie within x^(2eta_0) of
> their own cutoffs, the remaining endpoint sum equals the arithmetic residual up
> to O_H(x/log^H x), and that residual is exactly the two-point Möbius correlation
> at the fixed shift 2 weighted by nonnegative prime-band divisor sums; the average
> over the prime dilations (r,r') is a re-indexing of that single n-sum and supplies
> no additive-shift range, so averaged-Chowla inputs do not apply. Absolute control
> of S_0 requires a log^(4+eps) x saving on a natural average at a single scale,
> where no unconditional saving of any size is known; one-sided control of S_0 is,
> given the complement, inter-derivable with the sufficient twin margin itself.
> Derived; the corner estimate is OPEN in both forms, the complement is OPEN, and
> the sufficient margin C_2 x + E_dagger(x) >= c_0 x/log^K x remains OPEN.
