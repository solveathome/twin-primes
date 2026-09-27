# 16 — corner vs the logarithmically averaged two-point machinery

**Question.** Does Tao's logarithmically averaged two-point theorem (arXiv:1509.05422v4,
Thms 1.2/1.3), or the entropy decrement argument behind it, or its quantitative successors
(Helfgott-Radziwill arXiv:2103.06853v2; Pilatte arXiv:2310.19357v3), apply to the corner sum
sum_{n in J_x} mu(n) mu(n-2) L(n) L'(n-2) of corner-correlation.md (5)?

**Calibration and payoff.** No transfer; the result is a derived non-transfer at named
hypotheses with explicit exponent shortfalls (PARTIAL, since one arithmetic is
derived-unreviewed and one negative is channel-limited), and the payoff is triage only:
nothing here changes E_dagger, any budget, any region, any cut, or the twin margin, all of
which remain OPEN.

## The dilation step with the weight — it passes

The step is Tao Prop 2.6's identity 1_{n=b(a)} g1(n)g2(n+h) = c_p 1_{pn=pb(pa)} g1(pn)g2(pn+ph),
plus Lemma 2.5 (approximate affine invariance, the reason logarithmic averaging is needed).
Pilatte's Section 2.3 is the same move for d a product of J primes.

Three requirements, all checked:

- **Band invariance.** For the scale-free band weight L_b(n) = sum over primes r|n with
  V < r <= V x^(2 eta0) of log r, L_b(pn) = L_b(n) whenever p is not in the band. Checked
  exactly: **zero** violations at p = 2,3,5,7,11,13 in four parameter sets; the control (p
  inside the band) fires in all four. The corner's own weight L_w, with the cofactor window
  D_1 < n/r <= D_0, fails the same test on 6.1%-12.7% of n.
- **mu instead of lambda.** mu(pn) = mu(p)mu(n) 1_{p does not divide n}: zero violations,
  exceptional density measured at 1/p to four places. Cost O(1/p) per prime, affordable
  since Tao's hierarchy has 1/eps << H_- << p.
- **Prime sizes (assignment item 5).** Tao's primes are O_eps(1) (hierarchy
  a,b,h << 1/eps << H_- << p << H << H_+ << A <= omega <= x/log x <= x; footnote 5:
  H_- = exp(eps^-C1), H_+ = exp(exp(exp(eps^-C2)))). Pilatte's are <= exp((log x)^(1/6)).
  HR's have log H <= (log N)^(1/2-eps). All far below Z = x^(1/20). **Compatible with room
  to spare, in every version.**

So Tao's stated non-transfer reason for 1_R (it kills small-prime multiplicativity) genuinely
does not apply to L. The distinction is real at the level of the proofs, not only the
statements. It buys nothing.

## The decisive failed step: the weight is pinned to one scale

1. **The corner's window kills the dilation outright.** L_w is supported on n ~ x (n/r must
   land in a window at x^(19/25)), so the "logarithmic average over [1,x]" is the single top
   block and n -> pn maps the support out of itself.
2. **Swapping window for band is not free.** On J_x the discrepancy is band primes in a strip
   of multiplicative width x/n in (1,2]; by Mertens the edge fraction of the band is
   log(2)/(4 eta0 log x), so
   sum_{n in J_x} |L_b L'_b - L_w L'_w| ~ eta0 (log 2) x log x,
   which **exceeds the o(x) target by a factor eta0 log2 log x**. The difference is itself a
   signed weighted two-point Mobius correlation with a thinner band, so the swap is circular,
   not cheap. Finite check: diff/band = 0.278502 to 0.369704 against the derived edge
   fraction log(2)/(2 log Delta), measured/predicted 1.114 to 1.262 across three x, two Delta.
3. **A self-similar band (r in (n^w, n^(w+2eta0)]) makes the dilation inexact.** Edge relative
   fraction w log d/(eta0 log n); absolute error against the logarithmic mass
   ~ C w eta0 (log d) log^2 x, above the target by log^2 x at d=2 and by log^(13/6) x at
   Pilatte's d. No prime size helps: the gain grows like log(sum 1/d), the edge error like log d.

## Granting the band form: where the machinery then fails

- **mu*L is not multiplicative**, so Theorem 1.3 does not apply as stated. Both repairs inside
  Tao's own apparatus fail with an exponent: Prop 2.2's convolution split needs the convolution
  variable <= A_0 = O(1) (ours is a band prime at x^(6/25), so only the trivial tail branch is
  available); Lemma 2.5 needs modulus q <= H_+ = O_eps(1) (ours is x^(6/25)); and the
  dilated-linear-forms rewriting hits a = a1 a2 = r r' ~ x^(29/100) against the hierarchy's
  a,b,h << 1/eps, with footnote 5's tower stated only "in the regime where a,b,h are bounded".
  This sharpens F-0905-11 by naming the inequality that fails.
- **The short-interval Fourier-uniformity input** (Tao Prop 2.4 via MRT; Pilatte Prop 3.1 —
  "this is the only place where the multiplicativity of lambda is used"; HR's second, uncentred
  term) is unavailable for mu*L. Not located in the owning conventions of SEARCH-CONVENTIONS
  section 1. One genuine open door: the band at x^(6/25) sits ABOVE MRT's own factorisation
  range, so the weight is invariant under that factorisation too, and an MRT-type theorem for
  mu twisted by a high-band divisor indicator is well posed rather than obviously false.
- **Unboundedness is NOT the obstruction.** The entropy decrement discretises to an O_eps(1)
  alphabet, and HR's Corollary 1.1 asks only |f|_2,|g|_2 <= 1 and |f|_4,|g|_4 <= e^(CL); our
  normalised weight has |f|_2 = 1, |f|_4 = (w/2eta0)^(1/4) = O(1). Their expansion half
  accommodates the weight as it stands.

## Delivered vs needed

Logarithmic-average to one dyadic block loses exactly one log x (partial summation; sharpness
witness a_n = 1_{J_x} has log-average log 2 = 0.693147 and block sum 0.5x). Against the
logarithmic mass ~ eta0^2 log^3 x:

| wanted on J_x | log-average bound needed | exponent c |
|---|---|---|
| beat the triangle inequality | o(eta0^2 log^2 x) | c > 1 |
| the absolute corner target o(x) | o(1) | **c > 3** |

**A qualitative weighted log-Chowla (relative o(1)) gives a block bound o(x log^3 x) — a
factor log x WORSE than the triangle inequality. It is not a partial result on the corner.**

| source (version, statement) | rate | c | shortfall |
|---|---|---|---|
| Tao 1509.05422v4 Thms 1.2/1.3, Cor 1.5, fn 2 | (log log log x)^(-c') | 0 | log^3 x |
| Tao-Teravainen 1708.02610v2 structure thm | qualitative | 0 | log^3 x |
| HR 2103.06853v2 Cor 1.5 | (log log w)^(-1/2) | 0 | log^3 x |
| HR Cor 1.6 (almost all scales, abs values) | (log log w)^(-1/2) | 0 | log^2 x/(log log x)^(1/2) |
| Pilatte 2310.19357v3 Thm 1.1 | (log x)^(-c) | **<= 0.003832** | log^(2.996) x |
| Pilatte Rem 2.8 (almost all scales) | (log x)^(-c) | same | log^(1.996) x |

**Pilatte's c, DERIVED-UNREVIEWED here.** He states only "for some absolute constant c > 0"
and adds "It appears that saving a fixed power of the logarithm is the best that is achievable
with current techniques". His Section 2.3 chain yields e^(O(J)) V^(-J/2) log x + log H with
V^J ~ (log H)^(c_0(eps1)), c_0(eps1) = eps1^2 log(1/(2 eps1)) (his Lemma 2.3(d)), and
log x = (log H)^6. So c = c_0/12 - O(eps1^2)/6; max c_0 = 0.045985 at eps1 = exp(-1/2)/2,
giving **c <= 0.003832** before the e^(O(J)) loss. The log H = (log x)^(1/6) term separately
caps c at 5/6. Both are caps on the displayed chain, not determinations of c.

**The rescaled dyadic-average consumer does not lower the bar.** With weight (log x_j)^K, the
C_2 term is ~ C_2 (log2)^K J^K/(K+1), so one needs (1/J) sum_j j^K |E|/x_j = o(J^K); a block
bound eta0^2 j^(3-c) gives J^(K+3-c), so again **c > 3**. Also: the corner's weight is pinned
to x, so {E_dagger(2^j)} is not the scale family of one arithmetic function and the
almost-all-scales theorems do not contain it.

## Imported theorems, custody

All four PDFs fetched from arXiv this session, read with pdftotext -layout. sha256:
1509.05422v4 467329ae414b6698...; 1708.02610v2 232bdb1ad6e46789...;
2103.06853v2 ab3809a4c5c7e992...; 2310.19357v3 f23e885ae2c4b28d....
CHECKED at source: Tao Thms 1.2/1.3, Cor 1.5, Rem 1.6, fns 2 and 5, Props 2.1/2.2/2.4/2.6,
Lemma 2.5, section 3 to Lemma 3.2; TT abstract, section 1 outline (10)-(12), section 3
discretisation and Prop 3.5; HR abstract, Main Theorem, Cors 1.1-1.6; Pilatte abstract,
sections 1.1-1.4, Notation 2.1, Def 2.2, Lemma 2.3, Thm 2.4, Rems 2.5/2.6/2.8, section 2.3
in full, Prop 3.1. ASSUMED (quoted only inside those four): MRT arXiv:1503.05121 and
Matomaki-Radziwill arXiv:1501.04585.

## What would change the reading

- (3)'s eta0 dependence being wrong by log x would reopen the swap in section 2.2. NOT measured
  (the runs hold Delta fixed; the asymptotics hold eta0 fixed).
- A short-interval Fourier-uniformity statement for mu twisted by a high-band divisor indicator
  would reopen section 3.3 — and would still leave sections 2 and 4.
- A published determination of Pilatte's c above 3, or a version of Tao's Thm 1.3 uniform in
  a_1,a_2, would change the arithmetic. Neither located.

## Files

- research/corner-log-average.md (new)
- research/corner-log-average-validation.js (new; embedded via node research/qc/embed.js, 0.6 s,
  code-sha256 e1145bb8a3482e10..., out-sha256 bf09a5bfe56bd30a...)

## Gate

node research/qc.js: 3 findings, none fixable within the file discipline —
(a) ledger-todo-unlisted, TODO.md item C does not list Q-corner-log-average (TODO.md is
forbidden to this agent); (b) crosslinks unreachable, no working document links
research/corner-log-average.md yet (linking requires editing an existing note); (c) a scripts
finding on research/signed-moment-validation.js, another agent's file. node
research/audit-numbers.js: 251/251 passed.
