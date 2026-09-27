# Bounded source lookup: scale and coefficient quantifiers beyond the band transfer

<!-- ledger
id: Q-next-correlation-source-map
status: ANSWERED
todo: C
parity: Source lookup and hypothesis matching only. No imported statement is reproved, no proof of any listed preprint is checked, and no new estimate, region or twin margin is claimed. The comparison uses the quantifiers as printed in the primary sources.
question: Is there a primary-source statement with stronger scale or coefficient quantifiers than the ones the prime-band transfer actually consumed?
verdict: Scoped negative for the inspected statements: function-class and rate mismatches remain. The coordinating review withdraws the all-scales/dyadic-omitting requirement as a necessary gate, since bounded-interval stability yields a weak dyadic scale average from the existing input. No sufficient rate or full-coefficient theorem is matched. Proper-prime-power terms are already negligible on the fixed corner; other prime-r cofactor branches remain open.
-->

**Twin-prime infinitude and the sufficient signed margin remain OPEN.** This
note reads three primary statements and matches their hypotheses against two
targets. It derives nothing, adds no controlled region, and does not assert
that no such theorem exists anywhere. Baseline commit `10f6491`, tree clean at
dispatch.

**Coordinating review:** [round-review-0906.md](round-review-0906.md) retains
the source mismatches below but withdraws the all-scales/dyadic-omitting
condition as a necessary gate. Bounded-interval stability gives a dyadic
scale average from the existing input. Its rate is still too weak. The
proper-prime-power branches are already negligible on the fixed corner;
the remaining prime-r terms with s>1 or s'>1 and their non-squarefree inputs are not represented.

## 0. What was asked and what counts as a match

The transfer in [prime-band-transfer.md](prime-band-transfer.md) consumes
Tao-Teravainen arXiv:2512.01739v2 Theorem 3.1(ii): natural correlations of two
1-bounded multiplicative functions on `(N,2N]`, bound `O(L^{-c})` outside a set
of `N` in `[sqrt(X),X]` of logarithmic measure `O(log X * L^{-c})`, functions
fixed per outer `X`, with `L=(log X)^(1/4)` forced by the MRT (1.12) input.
Four possible improvements were searched for:

* (i) a bound at every dyadic scale, at all sufficiently large `N`, or outside
  an exceptional set small enough to miss no dyadic point;
* (ii) a rate better than `(log X)^(-c)` with unspecified small `c`, with
  explicit constant dependence;
* (iii) coefficients broader than fixed 1-bounded multiplicative functions,
  including bounded non-multiplicative weights;
* (iv) shifted-convolution statements for `mu(n)mu(n+h)` with divisor-type or
  prime-band weights.

Two targets are matched separately. Target (a) is the prime-cofactor subfamily
`mu(n)mu(n-2)L_w(n)L'_w(n-2)` with the moving cofactor windows of
`corner-correlation` (5); the lift (1) of the transfer turns it into an
integral over Fourier parameters `t,s` of correlations of the pairs
`g_(B,t), g_(B',s)`, whose bands depend on `X` and whose constants must be
uniform in `t,s`. Target (b) is the full corner `sum_n C(n)C'(n-2)` with the
`s>1 or s'>1` and proper-prime-power branches retained, whose coefficients are
divisor-bounded and not multiplicative.

## 1. The three statements inspected

| # | source, version, statement | coefficients | normalization and interval | rate and constants | scale quantifier | shift | first unmatched hypothesis vs (a) / vs (b) | improves |
|---|---|---|---|---|---|---|---|---|
| 1 | Tao-Teravainen, arXiv:1809.02518v2 (26 Jun 2019), Algebra & Number Theory 13 (2019) 2103-2150; Corollary 1.13 (binary unweighted Elliott at almost all scales) and Corollary 1.14 | `g1,g2 : N -> D` 1-bounded multiplicative, one of them satisfying (1), `inf_{|t|<=X} D(g_j, chi(n)n^(it); X) -> infinity` for every `chi`; Cor. 1.14 specialises to `lambda` and `mu` | natural, `E_{n<=X}` over `[1,X]` | none; (i) gives `|.| <= eps` and (ii) gives a limit `0`. No rate, no constant dependence | outside a set `X_eps` of logarithmic Banach density zero (i), or a set `X_0` of logarithmic density zero (ii) | fixed distinct `h1,h2 in Z` | (a) the functions must be fixed with a limit taken as `X -> infinity`; `g_(B,t)` depends on `X` through its band endpoints `X^alpha, X^beta` and on `t`, and the statement carries no rate and no uniformity in `t`, so the Tonelli step of the transfer has nothing to consume. (b) `C` is not 1-bounded and not multiplicative | none of (i)-(iv) |
| 2 | Jizhou Guo, arXiv:2608.23500v4 (1 Sep 2026), preprint, no journal reference on the arXiv record; Theorem 1.1 (global shift range), Theorem 1.8 (all fixed polylogarithmic ranges), with Theorems 1.3-1.6 read for context | `lambda` on both factors. Theorems 1.5 and 1.6 permit an arbitrary 1-bounded sequence `b(n+h)` on one side, still with `lambda(n)` on the other | logarithmic, `sum_{n<=y} lambda(n)lambda(n+h)/n`; Thm. 1.1 is maximal over prefixes `1<=y<=x`, Thm. 1.8 is at the terminal point `x` | `<< (log x)^(1-c)` in Thm. 1.1 and `<= C_A (log x)^(1-c)` in Thm. 1.8, `c>0` absolute and not made explicit; the threshold and the implied constants are stated to be ineffective through Siegel's theorem | every sufficiently large `x`, with no exceptional set of scales; the exceptional set is over shifts, not scales | Thm. 1.1: `1<=h<=x` outside `E_x` with `|E_x ∩ [1,H]| <<_A H(log x)^(-A)`; Thm. 1.8: every `h <= (log x)^A` with no exceptional shift, so `h=2` is covered outright | (a) the function class: both factors are `lambda`, so the superposition (1) of the transfer, which needs a pair of 1-bounded multiplicative functions varying with `X` and with the Fourier parameters, cannot be inserted at all; `mu` is also not covered. (b) same, and `C` is divisor-bounded | (i) in form only, and not in the normalization that the corner consumes; see §3 |
| 3 | Tao-Teravainen, arXiv:2512.01739v2, Theorem 3.1(i) (equidistributed case) with Remarks 3.2; same source and version as the transfer's input, different part | `g1,g2` 1-bounded multiplicative with `g1` **real-valued**, quantitatively equidistributed in every residue class `a mod q` with error `O(N L^(-1))` (3.1), plus the technical condition (3.2) `g1(p)=1` for `exp(log^(1/11)X) <= p <= exp(log^(1/10)X)` | natural, `(N,2N]`, with the `1_{n = b mod W}` twist, `W in [L^c]`, `b,h1,h2 = O(L^c)` | `<< L^(-c)`, same `c` and same conclusion (3.4) as part (ii) | identical to part (ii): outside one set `E ⊂ [sqrt(X),X]` with `(1/log X) ∫_E dt/t << L^(-c)` | `h1 != h2`, both `O(L^c)` | (a) `g_(B,t)(n)=mu(n)exp(it l_B(n))` is complex-valued for general `t`, so the real-valued hypothesis of (i) fails at the first line; independently `mu(p)=-1` violates (3.2). (b) not 1-bounded | none of (i)-(iv); it confirms that (ii) is the only applicable case in that source |

## 2. Fetch status

| # | URL fetched | how | date read | version | file SHA-256 |
|---|---|---|---|---|---|
| 1 | `https://arxiv.org/pdf/1809.02518` | curl into the session scratchpad, `pdftotext`, statements read in the extracted text; version stamp `arXiv:1809.02518v2 [math.NT] 26 Jun 2019` on page 1 | 2026-09-06 | v2 | `488b266bdf62adf9da8759717646b534339a5ac86b519072a3e370735fb01608` |
| 2 | `https://arxiv.org/html/2608.23500` and `https://arxiv.org/pdf/2608.23500v4` | WebFetch on the abstract page for metadata, then curl of the HTML and of the PDF; theorem statements read in the extracted text, not in the abstract | 2026-09-06 | v4, 1 Sep 2026 | PDF `95861fcc574a53c0cfc8985093b2fd62340eacdbbddd616e1bd53f0f6ed1c0a4`; HTML `ae28d0cef708d7fa060da9b41865f95af3c788b0846d8aea057e75958ce0b335` |
| 3 | `https://arxiv.org/pdf/2512.01739v2` | curl, `pdftotext`, Theorem 3.1 and Remarks 3.2 read in full | 2026-09-06 | v2 | `ce10e83b10c6544e1dbff037a5e4efa0e387892e0fc596ae09dce76025d7b41e`, which matches the custody hash already recorded in `prime-band-transfer.md` §4 |

No fetch failed. No abstract or search-result summary is used as a theorem
statement anywhere above; the abstract of source 2 was used only to decide
whether to open the paper.

## 3. Scoped negative

For the three statements named in §1, that is Tao-Teravainen 1809.02518v2
Corollaries 1.13 and 1.14, Guo 2608.23500v4 Theorems 1.1 and 1.8 (with 1.3-1.6
read for context), and Tao-Teravainen 2512.01739v2 Theorem 3.1(i), none
supplies a stronger interface than the transfer already used, and none reopens
a step of `prime-band-transfer.md` or of the corner argument.

Source 1 is weaker on each of the four axes. Its exceptional set is
qualitative, its rate is absent, and its functions must be fixed before the
limit in `X`. The set `{2^j}` has logarithmic density zero, so an exceptional
set of logarithmic density zero may contain every dyadic point; that is the
reason that the measure bound alone is insufficient. It does not exclude
using interval stability to obtain an average over dyadic scales, as the
coordinating review does for the quantitative input already consumed.

Source 3 is the same document and version as the transfer's input. Its part (i)
carries the identical exceptional set and the identical `L^(-c)` conclusion, so
it changes no quantifier. Its real-valued hypothesis fails for general
lifted factors, while its prime-value condition fails for `mu` itself. Its
Remarks 3.2 state, in the source, the order of the currently available
interfaces: qualitative logarithmic averaging first, then natural averaging
outside an exceptional set, then `L^(-c)` rates obtained by Pilatte in the
Liouville model case. That ordering is a source statement about the reviewed
literature, not a claim that nothing further exists.

Source 2 is the only one of the three that changes a quantifier in the
direction asked for in (i): its Theorem 1.8 holds for every `x >= x_A` with no
exceptional set of scales and no exceptional shifts below `(log x)^A`, so
`h=2` is included, and its Theorem 1.1 is in addition maximal over prefixes
`1 <= y <= x`, which is exactly the shape that
[corner-log-average.md](corner-log-average.md) §3 identifies as the input its
Abel conversion consumes. It is nevertheless not usable here, for two
independent reasons.

First, the coefficient class. Both factors are `lambda`. The transfer's
representation (1) requires a correlation bound for pairs of 1-bounded
multiplicative functions that depend on `X` and on the Fourier parameters,
uniformly in those parameters; a statement about `lambda` against `lambda`
admits no such insertion, and `mu` is not covered either. Theorems 1.5 and 1.6
do admit an arbitrary 1-bounded `b` on one side, which is the only appearance
of a non-multiplicative weight among the three sources, but only inside a
moment averaged over a window of `H` consecutive shifts: Theorem 1.5 gives
`(1/H) sum_{L<h<=L+H} sup_y |...|^p << 1 + x/H`, which at a single fixed shift
is the trivial bound, and Theorem 1.6 requires `H >= x^theta` with
`theta > 1/3`. The corner uses one fixed shift, so neither applies.

Second, the rate, which fails even if the coefficient class is set aside. With
`T_x(y) = sum_{n<=y} a_x(n)/n` and `sup_{y<=x}|T_x(y)| <= E_x`, the Abel step
recorded in `corner-log-average.md` §3 gives
`|sum_{n in J_x} a_x(n)| <= 4 x E_x`. Taking `E_x = (log x)^(1-c)` from Guo's
Theorem 1.1 gives `x (log x)^(1-c)`, which exceeds the trivial bound `x` for
every `c < 1`. A relative exponent above `1` is needed merely to beat the
trivial bound, and that note records `c > 3` as one sufficient exponent against
its `log^3 x` envelope; `corner-correlation` records that absolute control of
the full corner needs a `log^(4+eps)` saving on a natural average at a single
scale, with the subfamily's own absolute mass of order `eta_0^2 x log^2 x`.
Guo's `c` is absolute, is not made explicit in the statement, and the threshold
`x_A` and constant `C_A` are stated to be ineffective through Siegel's theorem.
So the arithmetic distance to any consumer is not small, and no numerical value
of `c` is available to price it.

Calibration on source 2: it is a single-author preprint whose v1 and v4 are
nine days apart, with no journal reference on the arXiv record. Its statements
are quoted here as printed. Its proof is not examined in this note, and nothing
in this repository should rest on it without a separate review.

## 4. Sufficient interfaces, without an unnecessary scale restriction

An every-scale theorem for the required X-dependent multiplicative pairs,
with uniform Fourier-parameter constants and a sufficiently strong rate,
would be useful. It is not a necessary input: the elementary sampling
argument in round-review-0906 §2 already yields a weak dyadic scale
average. A stronger averaged estimate is admissible when its complete
normalization, sampling and mesh losses reach a sufficient consumer.
The uniform-prefix Abel threshold is only the threshold for that transfer.

No inspected statement supplies the remaining required precision for the
actual coefficients. For the full corner, the unrepresented prime-r,
s>1 or s'>1 branches and their non-squarefree inputs remain open. Terms with
a proper prime power above V or Z already have the separate bound in
corner-correlation §1.1. Their retention in an exact diagnostic must not
be mistaken for a missing asymptotic bound.

## 5. Limits of this note

Three statements were inspected, which is the cap for this brief; the search
was run in the weighted multiplicative correlation, almost-all-scale
Chowla/Elliott and shifted-convolution conventions of
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md). No claim is made that the
literature contains nothing better, and no negative here is a statement about
unsearched conventions. No proof of any cited source is verified. The
observation that Guo's Theorem 1.1 covers `h=2`, obtained by noting that
`|E_x ∩ [1,2]| <<_A 2 (log x)^(-A)` is below `1` for `x` large at fixed `A` and
is an integer count, is elementary and is derived here rather than quoted;
Theorem 1.8 states the same coverage directly and is the citation to use.
Nothing above changes a controlled divisor region, a cut, the status of
`prime-band-transfer.md`, or the sufficient twin margin.
