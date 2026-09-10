# Friable integers in arithmetic progressions, searched in the owning convention: what the equidistribution literature gives the identification step of lim Var/E, and what it does not

<!-- ledger
id: Q-recon-0830-smooth-aps
status: PARTIAL
question: Does any theorem on y-friable integers in arithmetic progressions (Granville, Fouvry-Tenenbaum, Soundararajan, Harper, Drappeau, Drappeau-Granville-Shao) supply the uniform o(1) equidistribution that attack-0830-varE-identification.md section 4 leaves open, for moduli up to y^(4/5) with the lam1 weight and the squarefree restriction?
verdict: NONE APPLIES AS STATED, and the step stays open; lim Var/E = 0.45546 stays HEURISTIC. Read at the page (eleven sources, arXiv text layers and the Acta Math. page image): every pointwise asymptotic is O(log q / log y)-precise (Granville 1993 Thm 1) or hypothesises log x / log q -> infinity, and every beyond-square-root level (Fouvry-Tenenbaum 1996, Drappeau 2015, Drappeau-Granville-Shao 2017, Pascadi 2023/2025) hypothesises y <= x^delta, i.e. u -> infinity, against our u in (1.2, 2]. NEAREST: Harper arXiv:1208.5992 (2012, a preprint with no journal version found) Theorem 2, the Barban-Davenport-Halberstam form, whose range (log^K x <= y <= x, Q <= Psi/log^A x, bounded u in the ineffective form) covers d up to L^(1/2)/log and whose weight (1 on all friable n, no squarefree restriction, no max over x' <= x) is unmet. The record's quantifier is also refined: the cell needs the lam0-weighted AVERAGE over d, not uniformity. PROVEN given the weighted form (H_w) of that theorem, derivation mine and unreviewed, with its two identities checked numerically in the producer: every two-branch cell of Xmix, both mirror cases, all bands, balanced blocks included, is o(ln^2 y), so the Bettin-Chandee kernel separation is not on this route; the reduction of (H_w) to Harper's theorem is OUTLINED and not written, and the three-branch type (measured -0.0002 at x = 19, trivial bound O(ln^3 y)) is untouched. Not TPC-strength.
todo: 9
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-imports.md`).** This
> note's clause that the weight is unmet in print is REFUTED: Harper, JLMS 112
> (2025) e70293 = arXiv:2412.19644 proves the BDH asymptotic for an arbitrary
> complex sequence on the same dyadic all-classes object, and its footnote 1
> addresses the missing maximum over x′ ≤ x. The NEAREST citation is that
> paper, not arXiv:1208.5992; the step still does not close, on the range
> (√(2x) < Q ≤ x) and because its Thm 2 route bars sieved sets by name. Two
> misquotes of Thm 1/Thm 2 are recorded there, and this note's four channels
> did not surface the 2025 paper.

*Staging note, 2026-08-30. TODO item 9, the "smooth-numbers-in-APs search"
move named in `attack-0830-varE-identification.md` section 4. Recon and one
deduction. Producer: `research/history/staging/recon-0830-smooth-aps.js`
(embedded by `node research/qc/embed.js`; PARTS A-C; no timing figure
printed), which checks the two elementary identities of section 3.2 and the
kernel bound numerically and measures nothing of the programme's objects.
Every locator below is one this pass fetched; what was read of each
(abstract, full text, page image) is stated beside it.*

## 0. Verdict, the open part first

**The identification step does not close here.** No theorem read at the page
satisfies the hypotheses of the inequality `(*)` of
`attack-0830-varE-identification.md` section 4 as that inequality is written:
uniform in the modulus `d` up to `y^{4/5}`, with the weight `lam1(e)`, on
`y`-friable SQUAREFREE `e` coprime to 30, at friability `u = ln e / ln y` in
`(1.2, 2]`. `lim Var/E = 0.45546` stays HEURISTIC on the step it rested on.

**The quantifier the record asks for is not in print, and it is also more than
the step needs.** Every pointwise asymptotic in the owning convention is either
`O(log q / log y)`-precise (Granville 1993 Theorem 1, page 256, read), which is
`O(1)` at `q = y^{4/5}`, or is stated "as `log x / log q -> infinity`"
(Soundararajan 2008 Conjecture I(A) and Theorem 1, page 1-2, read; Harper 2012
Theorem 1, page 2, read), which our `log x / log q >= 3/2` does not supply. But
the cell's sum is `sum_d lam0(d) E_d`, and section 3 shows an AVERAGE over `d`
against the weight `lam0(d)` suffices: the Barban-Davenport-Halberstam form,
which sums the squared discrepancy over all classes `a`, is exactly what the
Cauchy-Schwarz step consumes. That is a refinement of the record's statement,
not a closure.

**NEAREST theorem, hypothesis unmet: Harper, arXiv:1208.5992v1 (2012),
Theorem 2, page 3, read at the text layer; a preprint, no journal-ref as of
this pass.** Its range covers ours: `log^K x <= y <= x` includes `u in (1, 2]`,
its moduli reach `Q <= Psi(x, y)`, non-trivially `Q <= Psi(x, y)/log^A x`,
which on the dyadic block `d ~ D` of the cell is `D <= L^{1/2} / log^{A/2}`
[ARITHMETIC, mine, unstamped], containing `y^{4/5}` and the balanced blocks
too; and its ineffective form saves `log^{-A} x` for every `A` with `u`
bounded. What it does not have: it counts `1_{n in S(y)}` with weight one, not
`mu^2(e) 1_{(e,30)=1} prod_{p|e} p/(p-4) / e`, and it carries no maximum over
`x' <= x` inside the sum. Section 3.4 outlines the elementary reduction of the
weighted statement to Harper's and names the two places where the tail
estimates need care; that reduction is NOT written out and NOT claimed.

**PROVEN given the weighted statement `(H_w)` of section 3.1, derivation mine
and unreviewed (section 3.2-3.3):** the two-branch cells of `Xmix`, both
mirror cases, at every modulus band `n in (L^{1-eta}, L ln^{2+o(1)} y]`, are
`o(ln^2 y)`. The balanced blocks are inside `(H_w)`'s range and the band above
it is trivial, so the Bettin-Chandee kernel separation the record names as the
next step is not on this path. What the deduction does NOT cover is the
three-branch type: its class map is a function of two of the three parts and is
not an arithmetic progression in one variable (section 3.5); its trivial bound
is `O(ln^3 y)`, and its measured value is `-0.0002` at `x = 19`
(`attack-0830-varE-identification.md` line 79, PART C).

**Beyond the square root, nothing reaches `u <= 2`.** Fouvry-Tenenbaum 1996
Theorems 2-3, Drappeau 2015 Theorem 1, Drappeau-Granville-Shao 2017 Theorem
1.2 and Pascadi 2025 Theorem 1.5 all hypothesise `y <= x^{delta}` or
`y <= x^{1/C}` with `delta` small or `C` large, that is `u -> infinity`, and
all fix the residue. NOT APPLICABLE, on a hypothesis and not on a precision.

Nothing here is TPC-strength; the wrong-direction guard of the parent note's
section 7 applies unchanged (every inequality below is an upper bound on the
absolute value of a signed remainder).

## 1. The object, restated in the literature's notation

From `attack-0830-varE-identification.md` section 4 (lines 253-299), with
`L = x#`, `y` the largest prime `<= sqrt L`, so `L = y^{2+o(1)}`. The dominant
cell is the two-branch type with parts `(d, e)`, `d | h`, `e | h - 2`,
`n = de in (L^{1-eta}, 2L]`, `d` the smaller part, `d <= L^{2/5} = y^{4/5+o(1)}`
(line 271). Writing `h = 2 + ej`, the constraint `d | h` is `j = -2 inv(e) (mod d)`,
and for fixed `d`

    E_d = sum_{e} lam1(e) [ sum_{j = -2 inv(e) (d), |2+ej|<L} (1 - |2+ej|/L) - L/(de) ],

`e` `y`-friable squarefree, `(e, 30d) = 1`, `lam1(e) = (1/e) prod_{p|e} p/(p-4)`
(lines 258-263). The bracket is `R_{de}(c)` of the parent note's section 1
with `c` the CRT class of `(0 mod d, 2 mod e)`, and `|R_n(c)| <= min(1, 2n/L)`
(parent section 3 item 1; the factor 2 is mine, from the closed form
`[(r-c)^+ + (r+c-n)^+ - r^2/n]/L` with `r = L mod n <= n`).

**Dictionary.** The literature's `x` is our `e`-range, `t in (L^{1-eta}/d, 2L/d]`,
so `x >= y^{6/5 - 2 eta}` and `x <= 2L = y^{2+o(1)}`; its `y` is our `y`; its
modulus `q` is our `d`; its class `a` is the class of `e` mod `d` (the map
`e -> -2 inv(e)` is a permutation of the reduced classes, `d` odd); its
`Psi(x, y; a, q)` is the weight-one count our `lam1`-weighted count replaces;
`u = log x / log y in (1.2 - 2 eta, 2 + o(1)]`; and `log x / log q >= 3/2` at
the top of the `d`-range, unbounded only as `d -> 1`. Two features have no
counterpart in `Psi`: the weight `lam1`, whose `1/e` is partial summation and
whose `prod p/(p-4)` is a multiplicative twist with `g(p) = p/(p-4) > 1`; and
the restriction to squarefree `e` coprime to 30.

**What the step needs, stated at the weakest rung that closes it (section 3).**
Not `(*)` uniform in `d`, but: for each `M >= 1/2` dyadic and each dyadic
`D <= L^{1/2}/log^C L`, with `E = L/(DM)`,

    sum_{d ~ D} lam0(d) sum_{a mod d, (a,d)=1} max_{t in [E, 2E]} | S_a(t; d) - S*(t; d) |  =  o(1) * log D,

`S_a(t; d) = sum_{e <= t, e = a (d)} lam1(e)` over friable squarefree `e`
coprime to 30, `S*(t; d) = (1/phi(d)) sum_{e <= t, (e,d)=1} lam1(e)`. That is a
Bombieri-Vinogradov-type average over `d` with the sum over ALL classes `a`
inside, i.e. the `L^1`-in-`a` form, which the `L^2`-in-`a`
(Barban-Davenport-Halberstam) form implies through Cauchy-Schwarz at a cost of
`phi(d)^{1/2}`. This is the statement searched below.

## 2. The sources, read at the page

Every PDF below was fetched by `curl` with a browser user agent, answered HTTP
200, and was read at the text layer (`pdftotext`) except where a page image is
named; sha256 of each PDF is in the scratchpad log of this pass. "Range of q"
is the theorem's, "ours" is the dictionary of section 1. The verdict is against
the statement of section 1, not against `(*)`.

| source | statement as read | range against ours | uniformity in `a` | weight, squarefree | verdict |
|---|---|---|---|---|---|
| Granville, *Integers, without large prime factors, in arithmetic progressions, I*, Acta Math. 170 (1993) 255-273, DOI 10.1007/BF02392787, Project Euclid PDF, **page image of pp. 255-256 read** | Thm 1 (1.4)-(1.5): `Psi(x,y;a,q) = Psi_q(x,y)/phi(q) {1 + O(log q / log y)}` uniformly for `(a,q)=1`, `x >= y >= 2`, `q <= min{x, y^N}`. Thm 2 (1.6)-(1.7): `sum_{q<=Q} max_{x'<=x} max_{(a,q)=1} |Psi(x',y;a,q) - Psi_q(x',y)/phi(q)| <<_A Psi(x,y)/log^A y` for `y >= 100`, `Q <= exp(C log y log log y / log log log y)`, `x >= Q^2 log^B Q`. Thm 3: `Psi(x,y;a,q) asymp Psi_q(x,y)/phi(q)` for `q <= y^N`, `N < 4/3`, `x >= max{y^{3/2+eps}, q y^{3/4+eps}}` | Thm 1: relative error `O(log d / log y)`, i.e. `O(1)` at `d = y^{4/5}`, `o(1)` only for `d = y^{o(1)}`. Thm 2: `x >= Q^2 log^B Q` with `x = L/(dM)` gives `D <= L^{1/3}/log^{B/3}` = `y^{2/3-o(1)}` [ARITHMETIC, mine]; `y >= 100` with no relation to `x`, so `u in (1.2, 2]` is inside. Thm 3: order of magnitude only | Thm 1 pointwise; Thm 2 max over `a` AND over `x' <= x` inside the sum | weight 1, all friable `n` | Thm 1: NOT APPLICABLE at the top of the `d`-range (precision `O(1)`). Thm 2: NEAREST for `d <= y^{2/3-o(1)}` with the max over `x'` we need; weight unmet |
| Granville, *... II*, Philos. Trans. Roy. Soc. London A 345 (1993) 349-362, DOI 10.1098/rsta.1993.0134 (OpenAlex; Drappeau's bibliography prints no. 1676) | NOT READ: royalsocietypublishing.org and doi.org both answered 403 to two `curl` attempts with a browser UA (a claim about the fetcher). Soundararajan p.1 (read): "In [5], [6] Granville established this Conjecture when A < 1", i.e. equidistribution for `q <= y^A`, `A < 1`, as `log x / log q -> infinity` | quantifier `log x / log q -> infinity` not ours | pointwise | weight 1 | NOT APPLICABLE as restated second-hand; page unread |
| Fouvry-Tenenbaum, *Entiers sans grand facteur premier en progressions arithmetiques*, Proc. LMS (3) 63 (1991) 449-494, DOI 10.1112/plms/s3-63.3.449 | NOT READ: Wiley and OUP answered 403 (browser UA). Restated at Granville I p.255-256 (page image): (1.2) `Psi(x,y;a,q) = Psi_q/phi(q){1 + O(exp(-c sqrt(log y)))}` for `x >= y >= exp(c (log log x)^2)`, `q <= log^N x`, and a similar estimate for `q <= exp(c sqrt(log y))`; and at Harper 2012 p.4 (read): their Theoreme 1 is the max-over-`a` Bombieri-Vinogradov bound `<< Psi e^{-c_1 u/log^2(u+1)}/log^A x + sqrt x Q u^{u(1+o(1))} log^{A+5} x` on `exp(log^{2/3+eps} x) <= y <= x` | pointwise: `d <= exp(c sqrt(log y))`, far below `y^{4/5}`. Average: level `x^{1/2}`, i.e. `D <= L^{1/3-o(1)}` | pointwise and max over `a` | weight 1 | NOT APPLICABLE pointwise at our `d`; the average form is superseded by Harper Thm 1 in our range |
| Fouvry-Tenenbaum, *Repartition statistique des entiers sans grand facteur premier dans les progressions arithmetiques*, Proc. LMS (3) 72 (1996) 481-514, DOI 10.1112/plms/s3-72.3.481 | NOT READ (403). Restated as Theoreme A at Drappeau 2015 p.3 (read): for `1 <= y <= x^delta`, fixed `a != 0`, `sum_{q <= x^{3/5-eps}, (q,a)=1} |E(x,y;a,q)| <<_A x / log^A x` (`|a| <= x^delta`), and level `6/11` for `|a| <= x` | **`y <= x^delta` is `u >= 1/delta`; ours is `u <= 2`** | fixed `a`, absolute values | weight 1 | NOT APPLICABLE, hypothesis `u -> infinity` unmet |
| Soundararajan, *The distribution of smooth numbers in arithmetic progressions*, Anatomy of Integers, CRM Proc. Lect. Notes 46 (2008) 115-128; arXiv:0707.0299v1, pp. 1-4 read | Thm 1: for `q <= y^{4 sqrt e - eps}` and `exp(y^{1-eps}) >= x >= y^{(log log y)^4}`, `Psi(x,y;q,a) ~ Psi_q(x,y)/phi(q)`; Conjecture I(A) is the same as `log x / log q -> infinity` | `x >= y^{(log log y)^4}` is `u >= (log log y)^4`; ours is `u <= 2` | pointwise | weight 1 | NOT APPLICABLE, hypothesis unmet |
| Harper, *On a paper of K. Soundararajan on smooth numbers in arithmetic progressions*, J. Number Theory 132 (2012) 182-199; arXiv:1103.2106v1, pp. 1-3 read | Thm 1: `y <= x`, `2 <= q <= y^{4 sqrt e - delta}`, `y` large in `delta`: `Psi(x,y;q,a) ~ Psi_q(x,y)/phi(q)` "as `log x / log q -> infinity`"; the smoothed error (p.2) carries the term `(log q)/(u log y)` and the term in `w = min{v, y}`, `v = log x / log q` | at `d = y^{4/5}`, `x = L/d`: `v = log x / log d <= 3/2 + o(1)` on the top block, so the asymptotic is not asserted; the error term `(log q)/(u log y)` reads `(4/5)/u` there | pointwise, all `(a,q)=1` | weight 1 | NOT APPLICABLE at the top of the `d`-range; APPLIES for `d = y^{o(1)}` (same as Granville Thm 1) |
| **Harper, *Bombieri-Vinogradov and Barban-Davenport-Halberstam type theorems for smooth numbers*, arXiv:1208.5992v1 (2012), 33 pp., no journal-ref on the arXiv abstract page (fetched); cited as "preprint" by Drappeau-Granville-Shao 2017 [7] and as "pre-publication" by Drappeau 2015 [Har12b]; pp. 1-5 and 17-19 read** | Thm 1 (p.3): `log^K x <= y <= x`, `1 <= Q <= sqrt(Psi(x,y))`: `sum_{q<=Q} max_{(a,q)=1} |Psi(x,y;q,a) - Psi_q(x,y)/phi(q)| << Psi(x,y)(e^{-cu/log^2(u+1)} + y^{-c}) + sqrt(Psi(x,y) Q) log^{7/2} x`, and for any `A` the ineffective `<<_A Psi(x,y)(e^{-cu/log^2(u+1)}/log^A x + y^{-c}) + sqrt(Psi Q) log^{7/2} x`. **Thm 2 (p.3): `log^K x <= y <= x`, `1 <= Q <= Psi(x,y)`: `sum_{q<=Q} sum_{(a,q)=1} |Psi(x,y;q,a) - Psi_q(x,y)/phi(q)|^2 << Psi(x,y)^2 (e^{-2cu/log^2(u+1)} + y^{-c}) + Psi(x,y) Q`, and ineffectively `<<_A Psi(x,y)^2 (e^{-2cu/log^2(u+1)}/log^A x + y^{-c}) + Psi(x,y) Q`.** Proof of Thm 2: conductors `<= x^eta` by the arguments of section 3.3 ("we merely insert the squares of all our bounds", p.18), the ineffective factor from Siegel's theorem (p.18); conductors `> x^eta` by the multiplicative large sieve, needing only `y >= log^K x` (p.19) | `y <= x` and `y >= log^K x` hold for `x = L/(dM) >= y^{1+o(1)}` [when `x < y` the count is all integers and the bound is trivial]; `u` bounded is allowed, at the price of the ineffective constant. Thm 1 non-trivial for `Q <= sqrt(Psi)/log^{7+2A}`: `D <= L^{1/3-o(1)}`. Thm 2 non-trivial on a dyadic block `d ~ D` when `D << Psi(x,y)/log^A x`: `D <= L^{1/2}/(M log^A)^{1/2}` [ARITHMETIC, mine, section 3.3] | Thm 1 max over `a`; Thm 2 sum over ALL `a` of the square | weight 1 on `1_{n in S(y)}`; no max over `x' <= x` | **NEAREST.** Thm 2's range and quantifier match section 1's statement; the weight and the squarefree restriction are unmet; the reduction is section 3.4 |
| Drappeau, *Theoremes de type Fouvry-Iwaniec pour les entiers friables*, Compos. Math. 151 (2015); arXiv:1307.7554v3, pp. 1-4 read | Thm 1: for `(log x)^c <= y <= x^{1/c}`, `sum_{q <= x^{3/5-eps}, (q, a1 a2)=1} |E(x,y; a1 inv(a2), q)| <<_A Psi(x,y)(H(u)^{-delta} log^{-A} x + y^{-delta})`, `|a1|, |a2| <= x^delta`; Cor. 1 adds `max_{z<=x}`. The author's own remark (p.4): a weight `lambda(q) = q^{o(1)}` on the moduli "n'est pas etudie ici" | **`y <= x^{1/c}` is `u >= c`, `c` "pouvant dependre de eps"; ours is `u <= 2`** | fixed residue `a1 inv(a2)` | weight 1 | NOT APPLICABLE, hypothesis unmet |
| Drappeau-Granville-Shao, *Smooth-supported multiplicative functions in arithmetic progressions beyond the x^{1/2}-barrier*, Mathematika 63 (2017) 895-918; arXiv:1704.04831v2, pp. 1-4 read | Thm 1.2: `f` in the class `C` (`|Lambda_f(n)| <= Lambda(n)`, hence `|f| <= 1`), supported on `y`-smooth, `x^delta > y >= exp(C' sqrt(log x log log x)/log log log x)`: `sum_{q <= x^{3/5-eps}, (q,a1a2)=1} |Delta_Xi(f,x;q,a1 inv(a2))| << Psi(x,y)/log^A x`, and the same without `Xi` under a Siegel-Walfisz criterion | `y <= x^delta` unmet (`u <= 2`); and our twist `g(p) = p/(p-4) > 1` has `Lambda_g(p) = g(p) log p > Lambda(p)`, outside `C` | fixed residue | multiplicative, `|f| <= 1` | NOT APPLICABLE, two hypotheses unmet |
| Granville-Shao, *When does the Bombieri-Vinogradov theorem hold for a given multiplicative function?*, Forum Math. Sigma 6 (2018) e15; arXiv:1706.05710v1, pp. 1-5 read | Thm 2.2: `f in C` supported on `y`-smooth, `y = x/log^gamma x`, `Q = x^{1/2}/log^B x`: `sum_{q<=Q} max_a |Delta_A(f,x;q,a)| << x/log^A x` with `A` the characters of conductor `<= log^B x` in the main term | level `x^{1/2}`: `D <= L^{1/3-o(1)}`; `y = x/log^gamma x` is `u = 1 + o(1)`, our `u` up to 2 not covered as stated | max over `a` | `|f| <= 1`; ours outside `C` | NOT APPLICABLE as stated; the class and the level both fall short |
| Pascadi, *On the exponents of distribution of primes and smooth numbers*, arXiv:2505.00653v2, pp. 1-3 read; and *Smooth numbers in arithmetic progressions to large moduli*, arXiv:2304.11696v3 (abstract via the arXiv API, "to appear in Compos. Math.") | Thm 1.5: fixed `a`, `y in [(log x)^C, x^{1/C}]`, `Q <= x^{5/8-eps}`: `sum_{q<=Q, (q,a)=1} |Psi(x,y;a,q) - Psi_q/phi(q)| << Psi/log^A x`; the 2023 paper is the `66/107` exponent | `y <= x^{1/C}`, `C = C(a, A, eps)` "large enough": `u -> infinity` | fixed `a` | weight 1 | NOT APPLICABLE, hypothesis unmet |
| de la Breteche-Fiorilli, *Entiers friables dans des progressions arithmetiques de grand module*, Math. Proc. Cambridge Philos. Soc. 169 (2020) 75-102; arXiv:1506.03268v1, pp. 1-3 read | Thm 1.3: the SIGNED average `sum_{q <= x/M, (q,a)=1} E*(x,y;a,q)` for fixed `a`, `y <= x^{1/C}`, is `-x phi(|a|) rho(u_a)/... + O(...)`: a secondary main term, not a bound | `y <= x^{1/C}`; signed, fixed `a` | fixed `a`, no absolute values | weight 1 | NOT APPLICABLE; different question (the bias), recorded so it is not re-fetched |
| de la Breteche-Tenenbaum, *Proprietes statistiques des entiers friables*, Ramanujan J. 9 (2005) 139-202; Tenenbaum-Wu, *Moyennes de certaines fonctions multiplicatives sur les entiers friables*, Crelle 564 (2003) | NOT FETCHED this pass; cited from memory as the mean-value (no progressions) literature for multiplicative weights on friable integers; locators UNVERIFIED | no progressions | none | multiplicative weight, no `q` | NOT APPLICABLE by object (mean values, not progressions); unverified |

**Channel calibration.** OpenAlex `search=` on "Barban-Davenport-Halberstam
smooth numbers" (91 hits) and on "Bombieri-Vinogradov smooth numbers" (357)
both returned Harper's preprint as the top record, the known positive; neither
list, nor "friable progressions arithmetiques fonction multiplicative" (6 hits,
all off-object), nor the arXiv API title sweeps `ti:"smooth numbers" AND
ti:"arithmetic progressions"` (3 records: Pascadi 2023, Soundararajan 2007,
Harper 2011) and `ti:friables AND ti:progressions` (1 record: de la
Breteche-Fiorilli), surfaced a Barban-Davenport-Halberstam or
Bombieri-Vinogradov theorem for a MULTIPLICATIVELY WEIGHTED friable sequence
at bounded `u`. That is a negative in the owning convention on four calibrated
channels (this file, sections 1-2, names the convention); the arXiv API
answered 200 on every query this pass, the earlier 301 was the http-to-https
redirect and not a rate limit. A weighted theorem may exist under wording not
tried; the negative is recorded with that expiry.

## 3. Deduction, or the nearest theorem and its unmet hypothesis

Everything in this section is mine, written this pass, with no adversarial
pass and no producer; nothing is computed. Every inequality is an upper bound
on the absolute value of a signed sum or on a nonnegative sum. Constants
`C, C_0, C_1, K_1` are absolute unless subscripted by `A`.

### 3.1 The hypothesis `(H_w)`, the weighted Barban-Davenport-Halberstam form

Let `w` be either of the two weights of the cell, `w = lam1` or `w = lam0`
(`lam0(e) = (1/e) prod_{p|e} 2p/(p-4)`), supported on `y`-friable squarefree
`e` coprime to 30. For `E >= 2`, `Q >= 1`, `d` running over `y`-friable
squarefree moduli coprime to 30, write

    Delta_a(t; d) = sum_{e <= t, e = a (d)} w(e) - (1/phi(d)) sum_{e <= t, (e,d)=1} w(e).

`(H_w)`: for every `A > 0` there is `C_A` with

    sum_{d <= Q} sum_{(a,d)=1} max_{t in [E, 2E]} |Delta_a(t; d)|^2  <=  C_A ( log^{-A} E + Q/E )

for all `E >= y`, `Q <= E`. [This is Harper's Theorem 2, ineffective form,
divided by `E^2` (the `1/e` in `w` costs a factor `1/E` on the block), with a
maximum over `t` inside and `1_{S(y)}` replaced by `w`. For `E < y` every
integer is `y`-friable and the statement is the trivial one.]

### 3.2 Lemma A: the cell's remainder at one modulus is an `L^1`-in-`a` discrepancy

Fix `M >= 1/2` dyadic and `D`, and put `E = L/(DM)`; the sub-cell is `d ~ D`,
`e ~ E`, so `n = de asymp L/M`. For `d` fixed, group the `e` by their class
`a` mod `d`. With `G(a, e) := R_{de}(c(a, e))`,

    E_d^{(M)} = sum_{(a,d)=1} sum_{e ~ E, e = a (d)} lam1(e) G(a, e).

(i) `|G(a, e)| <= 2/M` on the block (the bound `|R_n(c)| <= 2n/L`).
(ii) `G(a, .)` has total variation `<= C` on `e ~ E`, uniformly in `a, d`:
writing `theta = c/n = j_0/d + 2/(de)` with `j_0 = -2 inv(e) mod d`, which is
CONSTANT on the class `a`, and `rho = (L mod n)/n = {L/n}`, the closed form
reads `R_n(c) = (n/L) F(rho, theta)`, `F(rho, theta) = (rho - theta)^+ + (rho + theta - 1)^+ - rho^2`,
`|F| <= 1`, `F` Lipschitz in `rho` with constant `<= 4`, and `F(0, theta) = F(1, theta) = 0`
so `F` is continuous across the wrap of `rho`. As `e` runs through the class,
`L/(de)` falls from `M` to `M/2`, so `rho` winds at most `M/2 + 1` times, each
winding contributing variation `<= 4` to `F`; the prefactor `n/L in [1/(2M), 2/M]`
has variation `<= 2/M`. Product rule: `Var G <= (2/M)(4(M/2 + 1)) + 1 * (2/M) <= 14`.
[ARITHMETIC, mine, unstamped; the variation count is the load-bearing line of
this section.]
(iii) Partial summation in `e` on the class, against `Delta_a`:

    | sum_{e ~ E, e = a (d)} lam1(e) G(a,e) - (1/phi(d)) sum_{e ~ E, (e,d)=1} lam1(e) G(a,e) |
        <= (2 sup|G| + Var G) max_{t in [E,2E]} |Delta_a(t; d)| <= C_1 max_t |Delta_a(t; d)|.

(iv) The main term. `sum_{(a,d)=1} G(a, e) = sum_{j in (Z/d)^x} R_{de}(2 + ej)`,
and by Mobius over `g | d`, `sum_{j = 0 (g)} phi_{de}(2 + ej) = phi_{eg}(2)`
(the classes `2 + egj'` mod `de` are exactly the classes `= 2 mod eg`) with
mean `(d/g) L/(de) = L/(eg)`, so

    sum_{(a,d)=1} G(a, e) = sum_{g | d} mu(g) R_{eg}(2),   |.| <= sum_{g|d} min(1, 2eg/L) <= 2^{omega(d)}.

Hence, with `S_d := sum_{e ~ E, (e,d)=1} lam1(e) <= C_0` (the mean value of
`prod_{p|e} p/(p-4)` over squarefree `e` converges, since `sum_p 4/(p(p-4))` does),

    |E_d^{(M)}| <= C_1 sum_{(a,d)=1} max_t |Delta_a(t; d)| + C_0 2^{omega(d)}/phi(d).

The second term summed against `lam0(d)` over ALL `d` is `<= C_0 sum_d (14/3)^{omega(d)} 2^{omega(d)} / (d phi(d)) = O(1)`.

**Checked numerically (producer, PARTS A-C, OUTPUT lines 140-146).** The
kernel bound holds with ratio at most `0.656563` on 1200 random `(L, n, c)`
and the closed form agrees with the direct sum to `1.25e-14` (line 140); the
identity (iv) holds to `1.33e-12` on 180 random `(L, d, e)` (line 142); on 600
random blocks `(L, M, d, a)` with classes of up to 6674 terms, the total
variation of `G(a, .)` is at most `0.4576` against the claimed 14 and
`M sup|G|` at most `0.4658` against the claimed 2 (lines 144-146). The claimed
constants are loose upper bounds; the loose direction is the safe one here.

### 3.3 Lemma B: the block sum, and the two-branch cell under `(H_w)`

Cauchy-Schwarz over `d ~ D`, then `(H_w)` with `Q = 2D`:

    sum_{d ~ D} lam0(d) |E_d^{(M)}|
      <= C_1 ( sum_{d ~ D} lam0(d)^2 phi(d) )^{1/2} ( sum_{d <= 2D} sum_a max_t |Delta_a|^2 )^{1/2} + O(main)
      <= C_1 ( C log^{K_1} D )^{1/2} ( C_A ( log^{-A} E + 2D/E ) )^{1/2} + O(main),

using `lam0(d)^2 phi(d) <= c^{omega(d)}/d` with `c = (14/3)^2` and
`sum_{d ~ D} c^{omega(d)}/d << log^{c-1} D =: log^{K_1} D`. With `D/E = D^2 M/L`
and `A > K_1 + 4`:

- for `D <= D_max(M) := L^{1/2} / (M log^{K_1+2} L)^{1/2}`, the block is
  `<< log^{(K_1 - A)/2} L + (D^2 M/L)^{1/2} log^{K_1/2} L`; summed over the
  `<= log L` dyadic `D`, `<< log^{1 + (K_1-A)/2} L + 2 log^{-1} L = o(1)`;
- for `D in (D_max(M), (2L/M)^{1/2}]`, the band of `<= ((K_1+2)/2) log log L + 1`
  dyadic blocks, the trivial bound `|E_d^{(M)}| <= (2/M) S_d <= 2C_0/M` gives
  `<< (1/M) log L log log L` (each dyadic block of `d` carries
  `sum_{d ~ D} lam0(d) << log D`).

Summing over dyadic `M` from `1/2` to `M_0 = log L`: `o(log log L) + O(log L log log L)`;
the tail `M > M_0` is trivially `<= (2C_0/M_0) sum_d lam0(d) << log L`.
For the band `n > 2L`, i.e. `M' = n/L in (2, log^{2+o(1)} y]` (the parent
note's section 5 cut), the same argument runs with `E = LM'/D`, `|G| <= 1`,
`Var G <= 2` (there `phi_n(c) = (1 - ||c||_n/L)^+` is monotone in `e` on a
class), and no `1/M` gain in the band, over `<= 2 log log L` dyadic `M'`:
`o(1) + O(log L (log log L)^2)`. Altogether

    X_{mix2a}(n in (L^{1-eta}, L log^{2+o(1)} y])  =  O(log L (log log L)^2)  =  o(ln^2 y)     given (H_w) for w = lam1.

The mirror case (`e` the smaller part) is the same with `lam0` as the summed
weight and `lam1` on the modulus, and needs `(H_w)` for `w = lam0`. The
`(+,-)` type (`d | h-2`, `e | h+2`) has class map `j = -4 inv(d) (mod e)`, a
permutation of the units mod `e`, and runs identically. So under `(H_w)` for
both weights, EVERY two-branch cell of `Xmix` is `o(ln^2 y)`, at every band,
balanced blocks included; the kernel separation of the parent note's section
3 item 4 is not needed on this route.

### 3.4 From `(H_w)` to Harper's Theorem 2: an outline, NOT a proof

Write `f(e) = e w(e) = mu^2(e) 1_{(e,30)=1} 1_{S(y)}(e) prod_{p|e} g(p)`,
`g(p) = p/(p-4)` (or `2p/(p-4)`). (a) The `1/e` is partial summation on
`[E, 2E]` against `f`, costing the maximum over `t` that `(H_w)` already
carries. (b) `prod_{p|e} g(p) = sum_{m | e} h(m)`, `h(m) = mu^2(m) prod_{p|m}(g(p)-1)`,
with `sum_m h(m)/m^{1/2} = prod_p (1 + (g(p)-1)/p^{1/2}) < infinity`; so
`sum_{e<=t, e=a(d)} f(e) = sum_{(m,d)=1} h(m) sum_{e'<=t/m, e'=a inv(m)(d), (e',m)=1} mu^2(e') 1_{(e',30)=1} 1_{S(y)}(e')`.
Truncate at `m <= T = log^B t`; the class map `a -> a inv(m)` permutes the
units, so Cauchy-Schwarz over `m` costs `sum_{m<=T} h(m) tau(m) << log^8 T`.
(c) `mu^2(e')` and `(e', 30m) = 1` by Mobius over `p <= P` exactly, `P` a
constant, and the primes `p > P` with `p^2 | e'` left in a tail. (d) The
tails. Uniformly in `a` they FAIL beyond `d asymp t^{2/3}`: the count of
`e <= t`, `e = a (d)` with `p^2 | e` for some `p > P` is, term by term,
`<= sum_p (t/(p^2 d) + 1)`, and the `+1`'s cost `t^{1/2}`, which exceeds the
class mass `t/d` once `d > t^{1/2}`; a sharper count by `n = e/p^2` gives
`2^{omega(d)}(t/(Pd) + t/P^2)`, fine only for `P^2 >> 2^{omega(d)} d`, whose
`sum_{p<=P} 1` then exceeds `t/d` at `d > t^{2/3}`; `t = L/d` makes that
`d > L^{2/5}`, the parent note's own balance threshold, reappearing as the
limit of uniform-in-`a` bookkeeping. On AVERAGE over `a` they do not fail:
`sum_a (tail_a)^2 <= max_a tail_a * sum_a tail_a <= (t/d + 1)(t/P)`, which is
`<= eps^2 t^2/d` for `P >= 2/eps^2` and `d <= t`; the same shape handles the
`m > T` tail of (b) with `sum_{m>T} h(m)/m << T^{-1/2}`. (e) The maximum over
`t` inside Harper's sum, which his statement lacks: split the coefficients by
sign, so each partial count is monotone in `t`, and interpolate on a grid of
ratio `1 + log^{-B'} t`, costing `log^{B'}` applications of the theorem plus
increments of relative size `log^{-B'}`. (f) The `A` of Harper's theorem must
then beat `K_1 + 4` (section 3.3) plus the `log^8 T`, `log^{B'}` and grid
costs; since `A` is arbitrary in the ineffective form, this is a choice, not a
constraint, and the price is that `C_A` is not computable.

None of (a)-(f) is written out; (d) is where a write-up could go wrong, and
it is exactly the balanced range. The calibration is: `(H_w)` is a plausible
corollary of Harper's Theorem 2 by elementary means, UNPROVEN here, and
Harper's theorem is a 2012 preprint that this pass found no journal version
of (section 2).

### 3.5 What the deduction does not touch: the three-branch type

For `(n0, n+, n-)` all nontrivial, fix any two parts as the modulus and sum
over the third: with `n+` summed and `q = n0 n-`, `h = 2 + n+ j`,
`j = inv(n+) b (mod q)` for a `b` depending on `(n0, n-)` only, a permutation
of the summed variable's class; the argument of 3.2-3.3 then needs
`q <= (n/q) / log^A`, i.e. the summed part above `(n log^A)^{1/2}`. Triples
with all three parts `<= sqrt n` are outside, and they carry a positive
fraction of the `4^{omega}`-weighted three-branch mass at `n asymp L` (the
weight favours many small prime factors, whose three-way split lands each
part near `n^{1/3}`) [HEURISTIC, mine: the fraction is not computed]. On that
set the trivial bound is `O(ln^3 y)` and no one-variable progression
statement reaches it; the class map in two summed variables is the
Kloosterman-fraction shape of the parent note's section 3. OPEN; measured
`-0.0002` at `x = 19` (`attack-0830-varE-identification.md` line 79).

### 3.6 Falsifiers

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| `Var_e G(a, .) <= 14` on a block, uniformly | ARITHMETIC, mine, checked | a `(d, a, E)` with larger variation, e.g. from a non-continuity of `F` at the wrap I missed | YES, 600 random blocks at three `L`, worst `0.4576` (producer PART C, OUTPUT line 145); not a proof of the constant |
| `sum_{a unit} R_{de}(c(a,e)) = sum_{g|d} mu(g) R_{eg}(2)` | ARITHMETIC, mine, checked | one `(d, e)` where it fails | YES, 180 random `(L, d, e)`, residual `1.33e-12` (PART B, line 142) |
| the two-branch cells are `o(ln^2 y)` given `(H_w)` | PROVEN given `(H_w)`, unreviewed | an error in 3.2-3.3, most likely the log-power accounting | NO adversarial pass |
| `(H_w)` follows from Harper Thm 2 | OUTLINED, not proven | step (d) failing on average, or a hypothesis of Thm 2 I misread | NO |
| Harper Thm 2 holds with `u` bounded in its ineffective form | READ at the statement (p.3) and at the two proof remarks (p.18-19); the proof not verified | a hidden `u -> infinity` in section 3.3 of the preprint | PARTLY |
| the three-branch type is `o(ln^2 y)` | NOT CLAIMED | | |

## 4. Proposed SEARCH-CONVENTIONS rows (NOT applied)

Two rows for section 1 of `research/SEARCH-CONVENTIONS.md`, in its column
order (object, our name, canonical, owning convention, where it lives). Not
applied; the orchestrator edits live files.

**Row A.**
| the class discrepancy of the summed part of a two-branch mixed lag, `sum_{e = a (d)} lam1(e) R_{de}(c)` | the dominant cell of `Xmix`; inequality `(*)` of `attack-0830-varE-identification.md` sec.4 | equidistribution of `y`-smooth integers in arithmetic progressions | **"smooth numbers in arithmetic progressions" / "entiers friables en progressions arithmetiques", `Psi(x, y; a, q)` against `Psi_q(x, y)/phi(q)`.** Four quantifier registers, and they do not substitute for each other: (i) POINTWISE asymptotics carry either the precision `O(log q / log y)` (Granville 1993 Thm 1) or the hypothesis `log x / log q -> infinity` (Granville 1993 II; Soundararajan 2008; Harper JNT 2012, `q <= y^{4 sqrt e - eps}`), so at `q = y^{theta}` with `x = y^{O(1)}` none asserts `o(1)`; (ii) BOMBIERI-VINOGRADOV with max over `a`, level `x^{1/2}` (Fouvry-Tenenbaum 1991 Thm 1; Granville 1993 Thm 2, which also carries `max_{x' <= x}`; Harper arXiv:1208.5992 Thm 1) on `log^K x <= y <= x`, bounded `u` allowed; (iii) BARBAN-DAVENPORT-HALBERSTAM, sum over all `a` of the square, `Q <= Psi(x,y)/log^A x` (Harper arXiv:1208.5992 Thm 2, a PREPRINT with no journal version found 2026-08-30), bounded `u` allowed in the ineffective form; (iv) BEYOND THE SQUARE ROOT, fixed residue, levels `3/5` (Fouvry-Tenenbaum 1996; Drappeau 2015), `66/107` (Pascadi 2023), `5/8` (Pascadi 2025), ALL under `y <= x^{delta}`, i.e. `u -> infinity`: NOT AVAILABLE at `u <= 2`. Trap: a modulus `q ~ y^{theta}` with `theta` fixed and `x = y^{u}`, `u` bounded, is register (ii)/(iii) territory only; the word "level of distribution of smooth numbers" in a title means register (iv) and does not reach it | Granville, Acta Math. 170 (1993) 255-273 (page image of pp. 255-256 read); Harper, arXiv:1208.5992 (2012) Thms 1-2 p.3; Soundararajan, CRM Proc. 46 (2008) 115-128, arXiv:0707.0299; Harper, JNT 132 (2012) 182-199, arXiv:1103.2106; Drappeau, Compos. Math. 151 (2015), arXiv:1307.7554; Pascadi arXiv:2304.11696, arXiv:2505.00653. `history/staging/recon-0830-smooth-aps.md` |

**Row B.**
| the same, with the weight `lam1(e) = mu^2(e) prod_{p|e} p/(p-4) / e` and coprimality to 30 | the `lam1`-weighted count | multiplicative functions supported on friable integers, in arithmetic progressions | **"smooth-supported multiplicative functions in arithmetic progressions"**, the class `C` of `f` with `|Lambda_f(n)| <= Lambda(n)` (hence `|f| <= 1`). Two traps: (a) our twist `g(p) = p/(p-4)` exceeds 1, so `g` is OUTSIDE `C` and every theorem in this convention (Drappeau-Granville-Shao 2017 Thm 1.2, level `3/5` at `u -> infinity`; Granville-Shao 2018 Thm 2.2, level `1/2` at `y = x/log^gamma x`) fails on the class before it fails on the range; the route is the convolution `g = 1 * h`, `h(p) = 4/(p-4)`, back to weight one, which is bookkeeping and is NOT in print for this object; (b) the mean-value literature for multiplicative weights on friable integers (de la Breteche-Tenenbaum, Ramanujan J. 9 (2005); Tenenbaum-Wu, Crelle 564 (2003); locators unverified) has no modulus and is a false friend for a progression search | Drappeau-Granville-Shao, Mathematika 63 (2017) 895-918, arXiv:1704.04831; Granville-Shao, Forum Math. Sigma 6 (2018) e15, arXiv:1706.05710. `history/staging/recon-0830-smooth-aps.md` sec.2-3 |

Also owed to section 3 of that file ("searches already run"): one line, "Is a
Barban-Davenport-Halberstam or Bombieri-Vinogradov theorem in print for a
multiplicatively weighted friable sequence at bounded `u`? None found on
OpenAlex (two queries, calibrated on Harper's preprint) and the arXiv API
(two title sweeps, calibrated on Soundararajan/Harper/Pascadi and on de la
Breteche-Fiorilli); expiry: any wording of "weighted smooth numbers in
progressions" not tried, and Google Scholar and MathSciNet review text not
reached."

## 5. Brief errors and channel log

**Brief claims, each verified at its record.** (a) "uniform o(1)
equidistribution of y-friable squarefree integers in arithmetic progressions
to moduli up to y^{4/5}, weighted": matches `attack-0830-varE-identification.md`
lines 269-279 (`d <= L^{2/5} = y^{4/5+o(1)}`, `lam1` weight, `u in (1.2, 2]`).
(b) "PART A/B reduction": PART A is the Kloosterman-fraction class, PART B is
`sum_c R_n(c) = 0` (lines 61-69). (c) "Henriot's Cor. 2 applies as stated and
cuts the moduli to n <= L ln^{2+o(1)} y": lines 91-100. (d) The brief's source
list: every locator checked out except two that the brief left to me to fix:
Granville II's DOI is `10.1098/rsta.1993.0134` (OpenAlex), and Harper's
Bombieri-Vinogradov paper is an arXiv preprint with no journal version found,
not "(arXiv 2012)" as a stage on the way to print. (e) The brief's "Fouvry-Tenenbaum
(1996)" title is right; it is Proc. LMS (3) 72 (1996) 481-514 per Harper's
bibliography [7]. (f) One refinement, not an error: the brief and the record
ask for UNIFORMITY in `d`; the deduction needs the `lam0`-weighted average
over `d` only (section 1), which is why register (iii) of row A is the nearest
and register (i) is not.

**Numbers in this note.** `82 %`, `99.7 %`, `-3.27`, `0.05 ln^2 y`, `-0.0002`,
`-0.003` are the parent note's (lines 77, 87, 266-267, 79); `4 sqrt e`,
`3/5`, `6/11`, `66/107`, `5/8`, `log^K x`, `(log log y)^4` are the sources'
(section 2 table, page cited per row); `L^{1/3}`, `L^{1/2}/log`, `t^{2/3}`,
`14`, `K_1 = (14/3)^2 - 1` are mine, marked ARITHMETIC where they occur.

**Channels.** arXiv PDF endpoints: 200 on all nine fetches; arXiv API: 200 on
all three queries after the http-to-https 301; Project Euclid (Granville I):
200, page images rendered with `pdftoppm`; OpenAlex: 200; royalsocietypublishing.org,
doi.org (rsta), Wiley (plms, both papers) and OUP: 403 to `curl` with a
browser UA, so Granville II and both Fouvry-Tenenbaum papers are UNREAD AT THE
PAGE and quoted through Granville I p.255-256 (page image), Harper 2012 p.4
and Drappeau 2015 p.3, all read. Springer (Ramanujan J.) and De Gruyter
(Crelle) not attempted. No source is recorded unreachable.
