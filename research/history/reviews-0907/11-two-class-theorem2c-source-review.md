# Source review of Theorem 2c (two-class Jacobsthal lower bound): every hypothesis of the substitution, read at source

<!-- ledger
id: Q-two-class-theorem2c-source-review
status: ANSWERED
todo: W
parity: residue-only. A covering construction and an upper-bound sieve; no prime-detecting or bilinear input is consumed, and nothing here bears on the twin target.
question: Do the source readings outstanding in paper/kk-lower-bound.md section 11.1 support Theorem 2c of paper/two-class-jacobsthal.md, and does every hypothesis of the substitution Omega_p = {a_p, a_p - 2} into Kalmynin and Konyagin's construction discharge?
verdict: Verified within stated scope. Every hypothesis of the chain is discharged at a source read in this pass, with one exception the manuscript already states: Kalmynin and Konyagin's Corollary 1 is consumed at its printed statement and its proof cites Halberstam and Richert Theorem 2.2, unread at the page (Lane V). Two [MEMORY] inputs are now read at source; one of them (the explicit Mertens error) was misattributed and needs a provenance correction that moves no number of Theorem 2c. Theorem 2c remains derived here and not refereed.
-->

Lane W worker report, TODO item W. Date 2026-09-08. Starting commit `fda7b55`,
tree clean. Read-only on the repository apart from this file. Line numbers refer
to `paper/kk-lower-bound.md` and `paper/two-class-jacobsthal.md` at `fda7b55`.

Scope fence honoured: the identification of Kalmynin and Konyagin's Lemma 1 with
Halberstam and Richert Theorem 2.2 (Brun form) and the demotion of section 6.2,
and the CRT-representative slip in Corollary 1's printed proof, are Lane V's
ranked claims 1 and 2. Both are taken here as recorded in
`research/history/reviews-0907/04` to `09` and `paper/kk-lower-bound.md`
section 11.2, and are marked "covered by Lane V" below.

## 0. Disposition

**Verified within stated scope.** Theorem 2c of `paper/two-class-jacobsthal.md`
(Theorem B of `paper/kk-lower-bound.md`),

    G_2(P(y)) >= m + 1,   m = (y/B) (ln y)^3 (lnlnln y)^2 / (lnln y)^4,   y >= y_0,

follows from its cited sources by the chain written out in section 3 below, once
Kalmynin and Konyagin's Corollary 1 is granted at its printed statement. That
single conditional input is the one the manuscript already names (section 11.2);
its refereed proof cites Halberstam and Richert Theorem 2.2, which nobody in this
project has read at the page (Lane V). Every other input is now read at source
in this pass, including the two that carried the [MEMORY] label: the
smooth-number estimate (read at page image, Hildebrand and Tenenbaum 1993,
Theorem 1.2 and Corollary 1.3) and the Rosser and Schoenfeld prime-count bounds
(read at page image, (3.5) and (3.6)). The explicit Mertens error the manuscript
attributes to Rosser and Schoenfeld "Theorem 20" is not in that paper in that
form; it is Dusart's (section 5, finding F1). That is a provenance correction
with no effect on Theorem 2c, whose statement uses only Mertens' theorem with an
O(1).

Two labels are preserved exactly: Theorem 2c is **derived here from a published
construction and not refereed**; Kalmynin and Konyagin's paper is refereed
(Izvestiya 88:2, 2024), and the manuscript consumes its Corollary 1 at its
statement. "Proved from its cited sources" and "the cited sources are refereed"
are different claims, and only the second applies to the source's Corollary 1;
neither applies to Theorem 2c's composition, which has had internal adversarial
passes (2026-08-19, 2026-09-07, this one) and no outside reader.

## 1. What was read, and how

| artifact | how obtained | identity | custody level |
|---|---|---|---|
| Kalmynin and Konyagin, arXiv:2302.00459v2, TeX source `Polynomial_Jacobsthal_revision_3.tex` (3 Dec 2023) | `curl https://arxiv.org/e-print/2302.00459v2` | gzip 10,370 bytes md5 `b5ee4ec937e2b679f012df2811225481`; extracted TeX 30,276 bytes md5 `6e06b4c1dd5e9ad0e3783869b698115a` | **READ in full** (the author's own source; formulas unambiguous). Sections 1 and 2 read line by line; section 3 skimmed to confirm nothing there is consumed |
| arXiv abs page 2302.00459v2 | curl | md5 `f5f022ecc4af3d9aca8d5f003d44a807`; versions v1 1 Feb 2023, v2 3 Dec 2023, no v3 | read for version dates only |
| Published version, Izvestiya: Mathematics 88:2 (2024) 225 to 235, DOI 10.4213/im9467e | mathnet.ru `getFT.phtml?jrnid=im&paperid=9467&what=fullt` with a browser User-Agent (both `option_lang` values serve the same file) | 629,304 bytes, 11 pages, created 21 Mar 2024, md5 `871d344ee9cbb53bfc04e631e8bd8040` (the record's "Russian-edition endpoint" artifact of `reviews-0907/07`, English body) | READ at extracted text (`pdftotext -layout`) for Lemma 1, Corollary 1 and the whole proof of Theorem 1, pp. 35 to 39 of the running pagination; not at page image |
| Hildebrand and Tenenbaum, *Integers without large prime factors*, J. Théorie Nombres Bordeaux 5 (1993) 411 to 484 | numdam `JTNB_1993__5_2_411_0.pdf` | 5,792,744 bytes, 75 pages, md5 `a036c61d06a8199185379c883059566a` | **READ at page image** pp. 414 to 417 (rendered at 100 dpi and inspected): (1.3), (1.4), (1.7), (1.8), Theorem 1.1 with range (1.10), Theorem 1.2 with range (1.13), Corollary 1.3 |
| Rosser and Schoenfeld, *Approximate formulas for some functions of prime numbers*, Illinois J. Math. 6 (1962) 64 to 94 | Project Euclid `download/pdf_1/euclid.ijm/1255631807` | 2,520,753 bytes, 31 pages, md5 `357d126e8d5e498a74e750f2c3ff83cd` | **READ at page image** pp. 69 to 70 (Theorems 1 to 8 and corollaries, in particular (3.5), (3.6), (3.17), (3.18)); Theorem 20 at extracted text p. 72 |
| Dusart, *Estimates of some functions over primes without R.H.*, arXiv:1002.0442v1 | arXiv PDF | 233,779 bytes, md5 `b6540b68b8083df37266f57fab34db68` | read at extracted text, Theorem 6.10 only; secondary source used to locate the misattributed Mertens form |
| Halberstam and Richert 1974, Theorem 2.2 | not attempted here | | UNREAD at the page; covered by Lane V and `reviews-0907/08` |
| Richert, Tata lectures 1976, Theorem 11.3 | not re-read here | | covered by Lane V |

Repository files read in full: `paper/two-class-jacobsthal.md`,
`paper/kk-lower-bound.md`, `paper/proposals/prop-xlnx-lower-bound.md`,
`research/history/reviews-0907/04` to `09`, `research/review-request-0907.md`,
`research/history/CHANGELOG.md` entry 2026-09-07,
`research/two-class-lower-bounds.md` sections 3 and 4c, the H-block and `geom()`
of `research/attack-kk-substitution.js`, `testProp` of
`research/verify-kk-substitution.js`, and the custody header of
`research/history/staging/verify-kk-substitution.md`.

## 2. The hypotheses the substitution consumes, one row each

Notation as in the manuscript: L = ln y, ll = ln L, lll = ln ll, llll = ln lll;
z_0 = L^A, z_1 = exp(lll L / (A ll)), m = (y/B) L^3 lll^2 / ll^4, sieve level
z = sqrt(y), X = m. Discharge levels: **D** discharged at a source read in this
pass; **D-c** discharged conditionally on a named input; **N** not discharged.

| # | hypothesis consumed | where | source statement (locator) | read at | status |
|---|---|---|---|---|---|
| 1 | Proposition 1: G_2(P(y)) - 1 is the largest m such that some choice (a_p)_{p <= y} covers [1, m] by the pairs {a_p, a_p - 2} mod p | section 2 | elementary CRT; no external source | re-derived here (section 3.1); exhaustive at y = 5, 7, 11, 13 (section 4) | D |
| 2 | Omega^I_p = {0, -2} has 2 elements for p >= 3, 1 for p = 2; Omega^III_p = {1, -1} has 2 elements for p >= 3; the two are disjoint for p >= 5 | section 4 | elementary: 0 = 1, 0 = -1, -2 = -1 need p \| 1; -2 = 1 needs p \| 3 | re-derived | D |
| 3 | Omega^II_p is empty for f = x(x+2) | section 5, Case 2 | KK TeX, proof of Theorem 1: Omega^II_p := {t : q(t) = 0 mod p for some non-linear irreducible factor q of f}; x(x+2) has none | TeX read; Izvestiya extracted text agrees | D (reading R2 of section 11.1, now read a fourth time, at the TeX) |
| 4 | Corollary 1 sees Omega_p only through g(p) = \|Omega_p\| and needs no polynomial | section 6.1 | KK TeX, Lemma 1 and Corollary 1 as printed: "Suppose that for any p <= z the set Omega_p subset Z/pZ contains g(p) elements ... Then S(X, Omega) << X V(z)"; f appears nowhere in Lemma 1, Corollary 1 or its proof | TeX read | D (reading R1 of section 11.1) |
| 5 | Lemma 1's hypotheses, imported by Corollary 1's "as above": g multiplicative, g(p) <= kappa, g(p) < p for all primes p, \|r_d\| <= g(d) for d \| P(z), z << X; conclusion S <<_kappa X V(z) | section 6.1 | KK TeX Lemma 1, verbatim | TeX read; each hypothesis checked for the substituted g in section 3.4 | D for the hypotheses; **D-c for the conclusion**: Lemma 1's proof is "See, for example, [HaRi, Theorem 2.2]", unread at the page (Lane V) |
| 6 | kappa = 4: g(2) = 1, g(3) = 2, g(p) = 2 on band 1, g(p) = 4 on band 2; g(p) < p needs p = 2, 3 outside band 2, i.e. z_0 > 3 (H1) | section 6.1 | rows 2 and 5 | re-derived | D. kappa is load-bearing only through the implied constant C_kappa of Lemma 1 and through H1; any kappa >= 4 is a valid hypothesis (agrees with `reviews-0907/05` section 2) |
| 7 | \|r_d\| <= g(d) for every squarefree d \| P(z), no size restriction | section 6.1 | discharged inside Corollary 1's proof by the source; re-derived here: g(d) classes mod d, each holding floor((X-a)/d) + 1 in [X/d - 1, X/d + 1] integers | re-derived | D (Corollary 1's printed proof has the representative slip; covered by Lane V; the statement consumed is unaffected) |
| 8 | z = sqrt(y) << X = m | section 6.1; H7 | m / sqrt(y) -> infinity; explicit row H7 | recomputed: slack 163.4 in the logarithm at L = 308.67, B = 10 | D |
| 9 | Proposition 3 (the trichotomy) and its single inequality (5.1), 2(m+2)/y <= z_0 | section 5 | derived in the manuscript; source's Case 1 is the template (TeX: "Since k(i) << m << y (ln y)^{l_f + M(f)}, for large enough A ... either a prime or a z_1-smooth number") | TeX read; Proposition 3 re-derived in section 3.2; finite content brute-forced 2026-08-19 (not re-run, per the compute rule) | D |
| 10 | Mertens' second theorem with an O(1): sum_{p <= x} 1/p = lnln x + O(1) | section 6.3 | classical; for the asymptotic theorem only the O(1) is used | standard | D |
| 11 | the explicit Mertens error used for the y_0 narrative: "\|sum 1/p - lnln x - M\| < 1/(10 ln^2 x) + 4/(15 ln^3 x) for x >= 286, Rosser and Schoenfeld Theorem 20" | section 6.3, section 12, Appendix A | **not in Rosser and Schoenfeld 1962 in this form.** RS Theorem 5, p. 70, page image: (3.17) lnln x + B - 1/(2 ln^2 x) < sum_{p <= x} 1/p for x > 1; (3.18) sum_{p <= x} 1/p < lnln x + B + 1/(2 ln^2 x) for x >= 286. RS Theorem 20 (p. 72) is a finite-range statement for 1 < x <= 10^8 with error 2/(x^{1/2} ln x). The quoted form is Dusart, arXiv:1002.0442 Theorem 6.10: lower bound for x > 1, upper bound for x >= 10372 | RS at page image; Dusart at extracted text | D for the mathematics (an explicit O(1) exists in either form); **provenance correction required** (finding F1). Not consumed by the asymptotic Theorem 2c |
| 12 | the smooth-number estimate: Psi(m, z_1) <= m (ln y)^{-A + o(1)} in the regime u = ln m / ln z_1 ~ A ll / lll | section 6.5; H5 | Hildebrand and Tenenbaum 1993, p. 417, page image: **Theorem 1.2**, for any fixed eps > 0, log(Psi(x,y)/x) = {1 + O(exp(-(log u)^{3/5 - eps}))} log rho(u) uniformly for y >= 2, 1 <= u <= y^{1 - eps} (upper bound implicit in de Bruijn 1966, lower bound Hildebrand 1986a); **Corollary 1.3**, Psi(x, y) = x u^{-(1 + o(1)) u} as y, u -> infinity uniformly for u <= y^{1 - eps}; (1.7) log rho(u) = -(1 + o(1)) u log u. Also Theorem 1.1 (Hildebrand): (1.8) Psi = x rho(u)(1 + O(log(u+1)/log y)) uniformly for y >= 2, 1 <= u <= exp((log y)^{3/5 - eps}) | page image | **D**, replacing the [MEMORY] label. The range hypothesis of Corollary 1.3 is u <= z_1^{1 - eps}; at y_0 that is u = 13.68 against z_1 = e^{23.2}, and u/z_1 -> 0 at every larger y. The manuscript's "Hildebrand's range" refers to Theorem 1.1's range, in which the recorded slack is 0.636 (below 1) at ln y = 10^2 and 1.25 at y_0 with constant 1; Theorem 1.2 / Corollary 1.3 carry no such tightness. The o(1) exponent is what the manuscript writes after E10 |
| 13 | the smooth term's requirement A > 4 | section 6.5 | from rows 12 and 9: (ln y)^{3 - A + o(1)} lll^2 / ll^4 = o(1/ln y) iff A > 4 | re-derived (section 3.5) | D |
| 14 | band 3: pi(y) - pi(y/2) > y/(3 ln y) for y > 1.3423 x 10^5 | section 7; H6 | RS 1962 Corollary 1, p. 69, page image: (3.5) x/log x < pi(x) for x >= 17; (3.6) pi(x) < 1.25506 x/log x for x > 1. Hence pi(y) - pi(y/2) > y/ln y - 0.62753 y/(ln y - ln 2) for y >= 17 | page image | D, replacing the [MEMORY] label on the numbering; for the asymptotic theorem PNT (which the source uses: "pi(y) - pi(y/2) = y/((2 + o(1)) ln y)") suffices |
| 15 | PNT in progressions, Brun and Titchmarsh, Chebotarev, Galois data (M(f)), Lemma 2, Theorem 2, Theorem 3 of the source | none | KK TeX: these enter only the proof of Theorem 1 through Omega^II (Lemma 2, Chebotarev) and the evaluation of sum M_p(f)/p (section 3, Theorem 3 uses PNT in progressions for M(x^d)) | TeX read | **not consumed**; rows 3 and 4 make them drop. Correct as the manuscript states in section 5 |
| 16 | the threshold y_0 = 10^{134.1} and its origin | section 8 | H1 to H7 recomputed from the definitions in an independently written scratch script (section 4): L_0 = 308.67, 407.95, 537.47, 1273.27, 3100.83 at A = 4.05, 4.5, 5, 7, 10; H2 (z_0 < z_1, i.e. A^2 ll^2 < L lll) binds at every A; L_0 identical at B = 1, 10, 4200, 10^{10}, 10^{70} | recomputed | D as a floor with every implied constant set to 1. Not a hypothesis of Theorem 2c as stated ("there is an absolute y_0"); it is a bookkeeping statement about where the seven inequalities first hold |
| 17 | Halberstam and Richert Theorem 2.2 is the Brun-form bound behind Lemma 1; section 6.2 demoted | section 6.2, 11.2 | Lane V, ranked claim 1 | not re-read | covered by Lane V; taken as recorded |
| 18 | Corollary 1's printed proof mis-chooses CRT representatives | section 11.2 | Lane V, ranked claim 2 | not re-read | covered by Lane V; the statement consumed is unaffected |

## 3. The chain of inequalities, written here

### 3.1 Proposition 1

Let s be any residue mod P(y). For i >= 1, s + i is a twin slot iff no prime
p <= y divides (s+i)(s+i+2). Put a_p := -s mod p. Then p | s + i iff i = a_p
(mod p) and p | s + i + 2 iff i = a_p - 2 (mod p). So s + 1, ..., s + m are all
non-slots iff every i in [1, m] lies in some {a_p, a_p - 2} mod p. As s runs over
Z/P(y), (a_p)_{p <= y} runs over the full product by CRT. A covered run of length
m sits inside a gap between consecutive twin slots of length at least m + 1
(twin slots exist: P(y) - 1 is one), and a gap of length G exhibits a covered
run of length G - 1. Hence G_2(P(y)) - 1 = max coverable m. Checked
exhaustively at y = 5, 7, 11, 13 (section 4).

### 3.2 Proposition 3

Bands: a_p = 0 for p <= z_0 and z_1 < p < y/2 (kills p | i or p | i + 2);
a_p = 1 for z_0 < p <= z_1 (kills p | i - 1 or p | i + 1); band 3 is
y/2 <= p <= y. Sieve sets for p <= sqrt(y): Omega_p = {0, -2} for every p,
plus {1, -1} for z_0 < p <= z_1 (which needs z_1 <= sqrt(y), H3, for the
ledger to charge all of band 2).

Let i <= m be unkilled after bands 1 and 2, and suppose i mod p is in Omega_p
for some p <= sqrt(y).

Case i = 0 or -2 mod p: p | k with k in {i, i+2}, 1 <= k <= m + 2. If k = p
then i <= sqrt(y) + 2 (branch (a)). Otherwise k = p (k/p) with k/p >= 2 is
composite. Unkilled by band 1 means no prime factor of i or i + 2 lies in
[2, z_0] or (z_1, y/2), so every prime factor of k lies in (z_0, z_1] or in
[y/2, infinity). If all lie in (z_0, z_1], k is z_1-smooth (branch (b)).
Otherwise the largest prime factor P >= y/2 and k/P <= (m+2)/(y/2) = 2(m+2)/y.
Every prime factor of k/P exceeds z_0, so k/P = 1 or k/P > z_0. Under (5.1),
2(m+2)/y <= z_0, the second is impossible, so k = P is prime, contradicting
compositeness. This case therefore lands in (a) or (b). It applies whether p is
a band-1 or a band-2 prime, which is why Omega^I_p is charged at every
p <= sqrt(y), as in the source.

Case i = 1 or -1 mod p with z_0 < p <= z_1: i was killed at band 2,
contradiction. Case Omega^II: empty. So an unkilled i is in (a), (b), or avoids
Omega_p for every p <= sqrt(y) (branch (c)).

(5.1) with m <= y L^3 asks A > 3 for that step; the proof's A > 4 comes from
3.5.

### 3.3 The count

R := #{i <= m unkilled after bands 1, 2}
  <= (sqrt(y) + 2) + 2 Psi(m + 2, z_1) + S(m, Omega),

where S(m, Omega) = #{n <= m : n mod p not in Omega_p for all p <= sqrt(y)}.

### 3.4 The sieve step (conditional input)

Corollary 1 with X = m, z = sqrt(y), g(p) = |Omega_p|. Hypotheses: g extended
multiplicatively to squarefree d, g(p) := 1 for p > z; g(2) = 1 < 2,
g(3) = 2 < 3 (since -2 = 1 mod 3), g(p) = 2 < p for p >= 5 in band 1,
g(p) = 4 < p for p >= 5 in band 2 (band 2 starts above z_0 = L^A > 3 by H1);
kappa = 4; |r_d| <= g(d) for all squarefree d by the class count of row 7;
z = sqrt(y) <= m by H7. Conclusion, granted at the printed statement:
S(m, Omega) <= C_4 m V(sqrt(y)), C_4 depending on kappa = 4 only, not on A or
B.

Ledger: sum_{p <= sqrt(y)} g(p)/p = 1/2 + 2/3 + sum_{5 <= p <= sqrt(y)} 2/p
+ sum_{z_0 < p <= z_1} 2/p = 2 lnln y + 2(lnln z_1 - lnln z_0) + O(1) by Mertens
(row 10). With lnln z_0 = ln A + lll and lnln z_1 = llll + ll - lll - ln A (both
from the definitions; ll = ln L is the manuscript's lnln y):

    sum g(p)/p = 4 ll - 4 lll + 2 llll - 4 ln A + O(1).

Since 1 - x <= e^{-x}, V(sqrt(y)) <= exp(-sum g(p)/p) = e^{O(1)} A^4 ll^4 /
(L^4 lll^2), so

    S(m, Omega) <= C_4 e^{O(1)} (y/B) L^3 lll^2 ll^{-4} A^4 ll^4 L^{-4} lll^{-2}
                 = C' A^4 y / (B L),

with C' absolute. Choose B >= 4 C' A^4; then S(m, Omega) <= y/(4 ln y). The
identity behind the cancellation was recomputed here at L = 10^2 to 10^300
(ratio 1 to within 2.3 x 10^{-13}, section 4).

### 3.5 The smooth term

u = ln(m+2)/ln z_1 = (L + O(ln L)) A ll / (lll L) = (A ll/lll)(1 + O(ll/L)).
Corollary 1.3 of Hildebrand and Tenenbaum (row 12; range u <= z_1^{1-eps} is
slack since u ~ A ll/lll while z_1 = exp(L lll/(A ll))) gives
Psi(m+2, z_1) = (m+2) exp(-(1 + o(1)) u ln u). Now
u ln u = (A ll/lll)(ln A + lll - llll) = A ll (1 + O(llll/lll)), so
Psi(m+2, z_1) = m (ln y)^{-A + o(1)}. Then

    2 Psi(m+2, z_1) / (y / ln y) = 2 B^{-1} (ln y)^{4 - A + o(1)} lll^2 / ll^4 -> 0   iff   A > 4.

Fix A = 4.05, say. Then R <= y/(4 ln y) + o(y/ln y) <= y/(3 ln y) for all
large y.

### 3.6 Band 3

The primes in [y/2, y] number pi(y) - pi(y/2) = (1/2 + o(1)) y/ln y by the PNT
(explicitly, by RS (3.5) and (3.6), more than y/(3 ln y) for y > 1.3423 x 10^5),
so each of the at most y/(3 ln y) unkilled i can be assigned its own prime p
with a_p := i mod p, which kills i. Every i in [1, m] is then covered, and by
3.1, G_2(P(y)) >= m + 1. This is Theorem 2c with implied constant 1/B, B a
constant depending on A and C_4, hence absolute once A is fixed.

### 3.7 Where each logarithm comes from, checked

The budget is y/ln y survivors (one band-3 prime each). The sieve returns
S <= C' m V(sqrt(y)) with V(sqrt(y)) = e^{O(1)} A^4 ll^4 / (L^4 lll^2): the
L^{-4} is L^{-2} from Omega^I (two classes at every prime, ell_f = 2) times
L^{-2} from Omega^III over band 2 (two classes, M(f) = 2, charged as
(ln z_0/ln z_1)^2 = A^4 ll^4/(L^2 lll^2)), and the source's h_f term is
identically zero. Solving C' m V(sqrt(y)) = y/(B ln y) for m gives
m = (y/B) L^3 lll^2 / ll^4 up to constants, so the exponent 3 of ln y is
(ell_f - 1) + M(f) = 1 + 2, and the (lll/ll)^2 is the inverse of the band-2
ratio's ll^4/lll^2 divided by ... nothing else: it is the band-2 device's own
factor, inverted. All four coefficients (in ll, lll, llll, ln A) cancel
separately (section 4, item 2).

## 4. Finite checks run (scratch, not embedded; script text below)

Compute: one Node process, 0.07 s wall, one core. Script
`scratchpad/round-0908/W/w-check.js` (copied into this note's scratch
directory; reproduced verbatim at the end of this file so the run is
repeatable). The numbers below are transcribed from its output file
`w-check.out`; they are checks of the manuscript's arithmetic and of the
elementary identities, not new measurements of anything.

1. **H1 to H7 recomputed from the definitions.** First L at which all seven
   hold, A = 4.05, B = 10: L_0 = 308.67 (y_0 = 10^{134.1}); A = 4.5: 407.95
   (10^{177.2}); A = 5: 537.47 (10^{233.4}); A = 7: 1273.27 (10^{553.0});
   A = 10: 3100.83 (10^{1346.7}). Just below L_0 the failing condition is H2 at
   every A. At L = 308.67, A = 4.05, B = 10: all seven hold; u = 13.684,
   ln rho(u) = -35.278 (de Bruijn asymptotic, not a bound), H5 slack 17.34,
   H7 slack 163.36. L_0(A = 4.05) = 308.667 at B = 1, 10, 4200, 10^{10},
   10^{70}. This reproduces the section 8 table and the B-independence claim
   (E7) exactly.
2. **Ledger identity.** m exp(-(4 ll - 4 lll + 2 llll - 4 ln A)) divided by
   A^4 y/(B L): ratio minus 1 between -1.1 x 10^{-13} and 2.3 x 10^{-13} at
   L = 10^2, 10^3, 10^6, 10^{12}, 10^{50}, 10^{300}, A = 4.05 and 7.
3. **Proposition 1 exhaustively.** Over all prod_{p <= y} p residue vectors
   (a_p): max coverable m = 11, 29, 41, 65 at y = 5, 7, 11, 13, against
   G_2(P(y)) = 12, 30, 42, 66 computed directly from the twin slots of
   P(y) = 30, 210, 2310, 30030. G_2 - 1 = m in all four cases.
4. **Three-band composition at toy parameters, verified mod P(y) with BigInt
   CRT.** Band 2 is empty at the asymptotic parameters for every computable y
   (manuscript section 8), so z_0, z_1 were set by hand to make it non-empty;
   band 3 is the greedy of section 7. Each run s + 1, ..., s + m was tested
   directly with gcd((s+i)(s+i+2), P(y)) > 1:

   | y | z_0 | z_1 | band-3 primes | covered m | G_2 >= | exact G_2 | twin slots inside the run |
   |---|---|---|---|---|---|---|---|
   | 31 | 3 | 7 | 5 | 94 | 95 | 348 | 0 |
   | 31 | 5 | 11 | 5 | 106 | 107 | 348 | 0 |
   | 37 | 3 | 7 | 5 | 136 | 137 | 528 | 0 |
   | 41 | 5 | 13 | 5 | 190 | 191 | 546 | 0 |
   | 47 | 5 | 13 | 6 | 178 | 179 | 708 | 0 |
   | 47 | 3 | 7 | 6 | 202 | 203 | 708 | 0 |
   | 47 | 7 | 19 | 6 | 106 | 107 | 708 | 0 |

   Control (all a_p = 0, no band 2 or 3): m = 40 at y = 31 and 58 at y = 47,
   zero twin slots inside. Reading: the composition step (bands, then CRT, then
   Proposition 1) produces a twin-free run of the claimed length at every toy
   parameter tried, and the lower bound it certifies sits below the exact
   G_2 as it must. This is a correctness check of the composition at finite
   scale. It says nothing about the asymptotic bound, whose bands cannot be
   realised below y_0.

Not re-run, by the compute rule: the Proposition 3 brute force at y = 200000
(`research/verify-kk-substitution.js`, embedded), the 30-triple exponent
assembly, and the bisection in `research/attack-kk-substitution.js` (embedded;
item 1 above is an independent recomputation, not a re-embed).

## 5. Findings

**F1. PROVENANCE DEFECT (record only; no number of Theorem 2c moves).**
`paper/kk-lower-bound.md` lines 548 to 550, the section 12 entry at lines 1048
to 1052, and the Appendix A row at line 1123 attribute
"|sum_{p <= x} 1/p - lnln x - M| < 1/(10 ln^2 x) + 4/(15 ln^3 x) for x >= 286" to
Rosser and Schoenfeld 1962, Theorem 20. Read at the page image (Illinois J.
Math. 6, p. 70): Rosser and Schoenfeld's explicit Mertens bounds are Theorem 5,
(3.17) lnln x + B - 1/(2 ln^2 x) < sum 1/p for x > 1 and (3.18) sum 1/p <
lnln x + B + 1/(2 ln^2 x) for x >= 286; their Theorem 20 (p. 72) is the
finite-range statement lnln x + B < sum 1/p < lnln x + B + 2/(x^{1/2} ln x) for
1 < x <= 10^8. The quoted form with 1/10 and 4/15 is Dusart's, arXiv:1002.0442
Theorem 6.10 (thesis 1998), with the upper bound valid for x >= 10372 and the
lower bound for x > 1. The evaluated figures 2.475 x 10^{-4} (ln y = 10^3) and
1.911 x 10^{-5} (ln y = 10^9) in section 6.3 are those of the Dusart form, at
A = 5 (the value the embedded F4 table uses, unstated in the prose), and are
valid under Dusart's range since z_0 = e^{34.5} > 10372 there. Under Rosser and
Schoenfeld (3.17), (3.18) the same band-difference bound reads
2(1/(2 ln^2 z_0) + 1/(2 ln^2 z_1)) = 1.158 x 10^{-3} and 9.314 x 10^{-5}
respectively (scratch arithmetic). The [MEMORY] label on this entry was the
correct label and the entry was wrong in the way that label warns about. The
same sentence lives in `paper/proposals/draft-kk-lower-bound.md` lines 311
to 312 and 498, and in the prose of `research/attack-kk-substitution.js`
(lines 424 to 425, 880 to 881, embedded).

**F2. [MEMORY] discharged: the smooth-number estimate.** Row 12. Hildebrand
and Tenenbaum 1993 Theorem 1.2 and Corollary 1.3 (page image) supply
Psi(m, z_1) = m (ln y)^{-A + o(1)} in the manuscript's regime with a range
hypothesis (u <= z_1^{1 - eps}) that is slack by a factor exceeding 10^9 at
y_0. The manuscript's "Hildebrand's range" sentence at lines 595 to 597 cites
the tighter range of Theorem 1.1 and reports a slack of 0.636 at ln y = 10^2,
which is outside that range; the sentence is true as a computation and
misleading as a discharge, since Theorem 1.2 is the statement that does the
work and its range is not tight anywhere. A reference entry with the numdam
locator can replace the [MEMORY] entry.

**F3. [MEMORY] discharged: Rosser and Schoenfeld (3.5), (3.6).** Row 14. The
page image confirms x/log x < pi(x) for x >= 17 and pi(x) < 1.25506 x/log x
for x > 1 (Corollary 1 to Theorem 2, p. 69). The manuscript's section 7
display and its threshold y > 1.3423 x 10^5 follow (the validity range x >= 17
is implied by H6). The theorem numbering in section 12 should read "Corollary
1, (3.5) and (3.6)".

**F4. Stale cross-references in `paper/two-class-jacobsthal.md`.** Line 153
says "The six asymptotic hypotheses first hold together at y_0 = 10^{134.1}";
`paper/kk-lower-bound.md` section 8 has listed seven (H7) since 2026-09-07.
Line 274 names as the mover "the two unrepeated source readings
(`paper/kk-lower-bound.md` §11.1)"; both readings were repeated at the arXiv
v2 text on 2026-09-07 (`reviews-0907/04`) and at the TeX source here, so the
row's "what would move it" and "has the check run" cells are out of date. Line
152's "Mertens with the Rosser–Schoenfeld error" is correct for (3.17), (3.18)
and does not need to change.

**F5. Nothing in Theorem 2c's chain consumes PNT in progressions, Brun and
Titchmarsh, Chebotarev, or any Galois datum.** Row 15. The source uses PNT in
progressions only in section 3 (M(x^d) = tau(d)), which the substitution
discards; the manuscript's section 5 paragraph "What Case 2 takes with it" is
accurate against the TeX.

**F6. kappa = 4 is not load-bearing beyond the constant.** Rows 5, 6. Under
Lemma 1 as printed, kappa enters only <<_kappa; the substituted g has
g(p) <= 4 everywhere, so kappa = 4, 6 or any larger value is a valid hypothesis
and changes only C_kappa. H1 (z_0 > 3) is what keeps g(p) < p at p = 2, 3.
This agrees with the demoted section 6.2 and with `reviews-0907/05`, `06`, `09`.

**F7. The source's published version agrees with the TeX on every consumed
sentence.** Lemma 1, Corollary 1, the band definitions, the three cases, the
sieve step at kappa = 3d, the ledger and the band-3 count read identically at
extracted text apart from copy-edits ("Each two fixed irreducible polynomials",
"Hence", "Corollary is proved"). The Case 2 sentence "hence p must be sifted"
(for i) is in both versions; Case 2 is empty here and the slip is not consumed.

**F8. What would still falsify Theorem 2c, and whether the check has run.**
(i) Halberstam and Richert Theorem 2.2 printed in a form that does not give
Lemma 1 as stated: not checked at the page by anyone (Lane V; `reviews-0907/08`
reaches the Brun form through the Dover OCR index and the 1971 Mémoire). This
would be a defect in a refereed citation and would reach Theorem A equally.
(ii) A hypothesis of Corollary 1 the substituted g violates: checked, row 5,
none. (iii) An unkilled i failing all three branches of Proposition 3 with
(5.1) holding: re-derived here; brute force 2026-08-19 found none to
i = 4 x 10^6. (iv) The smooth-number estimate failing in the regime used:
Theorem 1.2 covers it with slack. (v) The implied constants: not priced by
anyone; y_0 = 10^{134.1} is a floor.

## 6. Proposed record updates (for the integrator; nothing below was applied)

**U1. `paper/kk-lower-bound.md` lines 547 to 552.**
Old: `At the $y$ where no computer can look, the Rosser and Schoenfeld explicit form does the same work: their Theorem 20 gives $|\sum_{p \le x} 1/p - \ln\ln x - M| < 1/(10\ln^2 x) + 4/(15 \ln^3 x)$ for $x \ge 286$, and $M$ cancels in a band difference, leaving a bound that falls from $2.475 \times 10^{-4}$ at $\ln y = 10^3$ to $1.911 \times 10^{-5}$ at $\ln y = 10^9$.`
New: `At the $y$ where no computer can look, an explicit Mertens bound does the same work. Rosser and Schoenfeld's Theorem 5 gives $\ln\ln x + M - 1/(2\ln^2 x) < \sum_{p \le x} 1/p$ for $x > 1$ and $\sum_{p \le x} 1/p < \ln\ln x + M + 1/(2\ln^2 x)$ for $x \ge 286$ ((3.17), (3.18), read at the page image 2026-09-08); Dusart's Theorem 6.10 (arXiv:1002.0442) sharpens the error to $1/(10\ln^2 x) + 4/(15\ln^3 x)$, the upper bound for $x \ge 10372$. $M$ cancels in a band difference, leaving, at $A = 5$, a bound that falls from $2.475 \times 10^{-4}$ at $\ln y = 10^3$ to $1.911 \times 10^{-5}$ at $\ln y = 10^9$ in Dusart's form, and from $1.158 \times 10^{-3}$ to $9.314 \times 10^{-5}$ in Rosser and Schoenfeld's. (Until 2026-09-08 this sentence attributed Dusart's form and the threshold 286 to Rosser and Schoenfeld's Theorem 20, which is a finite-range statement for $x \le 10^8$: `research/history/reviews-0907/11`.)`

**U2. `paper/kk-lower-bound.md` lines 1048 to 1052 (section 12, Explicit estimates).**
Old: `- J. B. Rosser and L. Schoenfeld, *Approximate formulas for some functions of prime numbers*, *Illinois J. Math.* **6** (1962). *Theorem 20 (Mertens with an explicit error) and the $\pi(y) - \pi(y/2)$ bound are consumed at their statements as carried by this project's record; neither was read at a page image here.* [MEMORY, for the theorem numbering]`
New: `- J. B. Rosser and L. Schoenfeld, *Approximate formulas for some functions of prime numbers*, *Illinois J. Math.* **6** (1962) 64–94. *Read at page images pp. 69–70 on 2026-09-08 (Project Euclid, md5 `357d126e8d5e498a74e750f2c3ff83cd`): Corollary 1, (3.5) $x/\log x < \pi(x)$ for $x \ge 17$ and (3.6) $\pi(x) < 1.25506\,x/\log x$ for $x > 1$, consumed in §7; Theorem 5, (3.17), (3.18), the explicit Mertens bound with error $1/(2\ln^2 x)$, the upper bound for $x \ge 286$, consumed in §6.3.*
- P. Dusart, *Estimates of some functions over primes without R.H.*, arXiv:1002.0442, Theorem 6.10: $|\sum_{p \le x} 1/p - \ln\ln x - B| \le 1/(10\ln^2 x) + 4/(15\ln^3 x)$, the upper bound for $x \ge 10372$. *Read at extracted text 2026-09-08; this is the form §6.3's figures use.*`

**U3. `paper/kk-lower-bound.md` lines 1053 to 1055.**
Old: `- The standard smooth-number estimate $\Psi(x, z) \ll x\rho(u)$ in Hildebrand's range. *Consumed as standard, and asserted without proof in the source too.* [MEMORY]`
New: `- A. Hildebrand and G. Tenenbaum, *Integers without large prime factors*, J. Théorie Nombres Bordeaux **5** (1993) 411–484, numdam `JTNB_1993__5_2_411_0`. *Read at page images pp. 414–417 on 2026-09-08 (md5 `a036c61d06a8199185379c883059566a`). Theorem 1.2: $\log(\Psi(x,y)/x) = \{1 + O(\exp(-(\log u)^{3/5-\varepsilon}))\}\log\rho(u)$ uniformly for $y \ge 2$, $1 \le u \le y^{1-\varepsilon}$, the upper bound implicit in de Bruijn (1966); Corollary 1.3: $\Psi(x,y) = x\,u^{-(1+o(1))u}$ as $y, u \to \infty$ uniformly for $u \le y^{1-\varepsilon}$. §6.5 consumes Corollary 1.3 at $x = m + 2$, $y = z_1$, where $u \sim A\ln\ln y/\ln\ln\ln y$ and the range hypothesis is slack. Theorem 1.1 (Hildebrand 1986) with its range $u \le \exp((\log y)^{3/5-\varepsilon})$ is not needed.*`
And at line 595 to 597: Old: `The estimate is used well inside Hildebrand's range: the slack $\ln z_1 / (\ln\ln m)^{5/3}$ runs from $6.364 \times 10^{-1}$ at $\ln y = 10^2$ to $2.339 \times 10^5$ at $\ln y = 10^9$.` New: `The estimate consumed is Hildebrand and Tenenbaum's Corollary 1.3 (§12), whose range hypothesis $u \le z_1^{1-\varepsilon}$ is slack ($u = 13.7$ against $z_1 = e^{23.2}$ at $y_0$); the tighter range of Hildebrand's Theorem 1.1, measured by $\ln z_1/(\ln\ln m)^{5/3}$, runs from $6.364 \times 10^{-1}$ at $\ln y = 10^2$ to $2.339 \times 10^5$ at $\ln y = 10^9$ and is not required.`

**U4. `paper/kk-lower-bound.md`, the [MEMORY] footnote (section 12, "Footnote on [MEMORY]").** Change "Five entries above are marked [MEMORY]: Rankin 1938, Pintz 1997, Halberstam and Richert's *Sieve Methods* Theorem 2.2, the theorem numbering in Rosser and Schoenfeld, and the smooth-number estimate." to "Three entries above are marked [MEMORY]: Rankin 1938, Pintz 1997, and Halberstam and Richert's *Sieve Methods* Theorem 2.2." and add one sentence: "Two former [MEMORY] entries, the Rosser and Schoenfeld numbering and the smooth-number estimate, were read at page images on 2026-09-08; the first was misattributed (`research/history/reviews-0907/11`, F1)."

**U5. `paper/kk-lower-bound.md` Appendix A, line 1123.**
Old: `| Rosser and Schoenfeld Theorem 20 form $1/(10\ln^2x) + 4/(15\ln^3x)$, $x \ge 286$; evaluated $2.475\times10^{-4}$ at $\ln y = 10^3$ and $1.911\times10^{-5}$ at $\ln y = 10^9$ | §6.3 | statement per §12 [MEMORY]; evaluations by `research/verify-kk-substitution.js` |`
New: `| explicit Mertens error $1/(10\ln^2x) + 4/(15\ln^3x)$ (Dusart, Theorem 6.10, $x \ge 10372$; Rosser and Schoenfeld's (3.18) has $1/(2\ln^2 x)$, $x \ge 286$); evaluated at $A = 5$: $2.475\times10^{-4}$ at $\ln y = 10^3$ and $1.911\times10^{-5}$ at $\ln y = 10^9$ | §6.3 | statements per §12, read 2026-09-08; evaluations by `research/attack-kk-substitution.js` §F4 (the prose there still names Theorem 20) |`

**U6. `paper/kk-lower-bound.md` section 11.4 table.** Add the row: `| the smooth-number estimate | a $\Psi$ bound weaker than $x\,u^{-(1+o(1))u}$ in the regime $u \asymp \ln\ln y/\ln\ln\ln y$, $z_1 \to \infty$ | yes: Hildebrand and Tenenbaum Theorem 1.2 and Corollary 1.3 read at page image 2026-09-08, range slack; `research/history/reviews-0907/11` |`

**U7. `paper/two-class-jacobsthal.md` line 153.** Old: `The six asymptotic hypotheses first hold together at` New: `The seven asymptotic hypotheses (H1 to H7 of that note's §8) first hold together at`

**U8. `paper/two-class-jacobsthal.md` line 274.**
Old: `| Theorem 2c | DERIVED, checked twice, not refereed | a hypothesis of the source that the substitution does not satisfy; the two unrepeated source readings (`paper/kk-lower-bound.md` §11.1) | second reader plus brute force of the finite content; a referee has not |`
New: `| Theorem 2c | DERIVED, checked three times, not refereed | a hypothesis of the source that the substitution does not satisfy; Halberstam and Richert Theorem 2.2 printed in a form that does not give Kalmynin and Konyagin's Lemma 1 (`paper/kk-lower-bound.md` §11.2) | second reader plus brute force of the finite content (2026-08-19); both §11.1 readings repeated at the arXiv text (2026-09-07) and at the TeX source, every other input read at source (2026-09-08, `research/history/reviews-0907/11`); the 1974 page unread; a referee has not |`

**U9. `research/history/reviews-0907/README.md`.** Add the row: `| 11-two-class-theorem2c-source-review.md | Lane W source review of Theorem 2c: 18-row hypothesis table, chain re-derived, smooth-number and Rosser–Schoenfeld inputs read at page image, Mertens-error misattribution found (F1), finite CRT composition check | paper/two-class-jacobsthal.md §3, §6; paper/kk-lower-bound.md §6.3, §6.5, §11.4, §12, Appendix A |`

**U10. `research/OUTCOMES.md`, new subsection under "By research question", after "Finite algebra and numerical validation":**

```
### Two-class Jacobsthal lower bound (independent of the twin target)

#### Theorem 2c source review — every hypothesis of the substitution read at source

**Grade:** DERIVED (the manuscript's Theorem 2c), not refereed; source review VERIFIED within stated scope. **Question:** `Q-two-class-theorem2c-source-review` (TODO W); prior `Q-kk-substitution`, `Q-paper-kk-draft`.
**Established:** the chain of `paper/kk-lower-bound.md` Theorem B, re-derived in `history/reviews-0907/11` section 3, is proved from its cited sources once Kalmynin and Konyagin's Corollary 1 (arXiv:2302.00459v2, TeX read in full; Izvestiya 88:2 read at extracted text) is granted at its printed statement. The smooth-number input is Hildebrand and Tenenbaum 1993 Theorem 1.2 / Corollary 1.3 (page image), range slack; the band-3 count is Rosser and Schoenfeld (3.5), (3.6) (page image). kappa = 4 enters only the implied constant. No progression, Brun–Titchmarsh, Chebotarev or Galois input is consumed. Proposition 1 holds exhaustively at y = 5, 7, 11, 13; the three-band CRT composition produces twin-free runs at toy parameters with zero twin slots inside (finite check only).
**Limits:** Halberstam and Richert Theorem 2.2, cited by the source's Lemma 1, is unread at the page (shared with Theorem A; Lane V). Implied constants unpriced; y_0 = 10^{134.1} is a floor with constants set to 1 and H2 binding. Band 2 is empty at every computable y, so no finite run exhibits the asymptotic construction. Not refereed.
**Defect found:** the explicit Mertens error quoted as Rosser and Schoenfeld "Theorem 20", 1/(10 ln^2 x) + 4/(15 ln^3 x) for x >= 286, is Dusart's Theorem 6.10 (x >= 10372); Rosser and Schoenfeld's (3.18) has 1/(2 ln^2 x) for x >= 286. Provenance only; no number of Theorem 2c moves.
**Evidence:** `history/reviews-0907/11-two-class-theorem2c-source-review.md` (hypothesis table, chain, artifact hashes, scratch script).
**Next/reuse condition:** a reader holding Halberstam and Richert 1974 quotes Theorem 2.2 at the page; an explicit-constants pass turns y_0 into a value; an outside number theorist reads the substitution. No twin-prime payoff is implied.
```

**U11. `TODO.md` item W.** Replace `Ledger: none` with `Ledger: Q-two-class-theorem2c-source-review, Q-kk-substitution, Q-paper-kk-draft, Q-lit-kalmynin-konyagin`. (The ledger gate does not scan `history/` outside `staging/`, so this report's block is documentation; the integrator decides whether the id belongs on the TODO line.)

**U12. `research/history/CHANGELOG.md`, entry 2026-09-08 (Lane W).** `**Theorem 2c source review (paper/kk-lower-bound.md §6.3, §6.5, §12, Appendix A; paper/two-class-jacobsthal.md §3, §6).** The claim as it stood: the explicit Mertens error 1/(10 ln²x) + 4/(15 ln³x) for x ≥ 286 was Rosser and Schoenfeld's Theorem 20 [MEMORY]; the smooth-number estimate was consumed from memory in "Hildebrand's range". What replaced it: read at page images, Rosser and Schoenfeld's explicit Mertens bound is Theorem 5 with error 1/(2 ln²x) (x ≥ 286) and the quoted form is Dusart's Theorem 6.10 (x ≥ 10372), no number of Theorem B moving; the smooth-number input is Hildebrand and Tenenbaum 1993 Theorem 1.2 / Corollary 1.3 with a slack range; Rosser and Schoenfeld (3.5), (3.6) confirmed for §7. Both [MEMORY] labels retired, the footnote count falling from five to three. Two stale cross-references in two-class-jacobsthal.md corrected (six → seven hypotheses; the §11.1 readings are no longer unrepeated). Disposition of Theorem 2c: verified within stated scope, conditional as before on the unread 1974 page. Report: `research/history/reviews-0907/11`.`

**U13. `research/SEARCH-CONVENTIONS.md` §3, one row.** `| Where is the explicit Mertens error 1/(10 ln²x) + 4/(15 ln³x) in print? | **Dusart** (thesis 1998; arXiv:1002.0442 Theorem 6.10, x ≥ 10372), not Rosser and Schoenfeld 1962, whose Theorem 5 has 1/(2 ln²x) for x ≥ 286 and whose Theorem 20 is a finite-range (x ≤ 10^8) statement | settled 2026-09-08 at page image; `history/reviews-0907/11` F1 |`

## 7. Remaining source dependency

One: Halberstam and Richert, *Sieve Methods* (1974), Theorem 2.2, at the printed
page, behind Kalmynin and Konyagin's Lemma 1. It is shared with Theorem A and
with the source's own refereed proof, and it is Lane V's object. Nothing else
in Theorem 2c's chain is now consumed without a source read in this project.

## 8. Scratch script, verbatim (`w-check.js`, run 2026-09-08, 0.07 s)

```js
// Lane W scratch check, 2026-09-08. Not a repo script; not embedded.
// (1) H1-H7 of paper/kk-lower-bound.md section 8 recomputed from the
//     definitions, independently of research/attack-kk-substitution.js.
// (2) Exponent bookkeeping of the ledger at machine precision.
// (3) Proposition 1 (CRT covering identity) exhaustively at y = 5, 7, 11, 13.
// (4) A finite three-band construction at y = 31 and y = 47, verified by
//     direct gcd tests modulo P(y) (BigInt), and compared with the exact G2.
'use strict';

function primesUpTo(n) { const s = new Uint8Array(n + 1); const out = []; for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return out; }

// ---------- (1) H1-H7 at A = 4.05, B = 10, L = 308.67 and a bisection for L0
// Notation: L = ln y; ll = ln L = lnln y; lll = ln ll = lnlnln y; llll = ln lll.
function lnRho(u) { return -u * (Math.log(u) + Math.log(Math.log(u)) - 1); } // de Bruijn asymptotic, not a bound
function hyps(L, A, B) {
  const ll = Math.log(L), lll = Math.log(ll);
  const lnz0 = A * ll;                           // z0 = (ln y)^A
  const lnz1 = lll * L / (A * ll);               // z1 = exp(lnlnln y * ln y / (A lnln y))
  const lnm_over_y = -Math.log(B) + 3 * ll + 2 * Math.log(lll) - 4 * Math.log(ll); // ln(m/y)
  const lnm = L + lnm_over_y;
  const u = lnm / lnz1;
  return {
    H1: lnz0 > Math.log(3),
    H2: lnz0 < lnz1,
    H3: lnz1 < L / 2,
    H4: Math.log(2) + lnm_over_y < lnz0,                       // 2m/y < z0 (the m+2 correction is ln(1+2/m))
    H5: Math.log(2) + lnm_over_y + lnRho(u) + Math.log(12) + Math.log(L) < 0, // 2 m rho(u) < y/(12 ln y)
    H6: L > 11.807294,
    H7: L / 2 <= lnm,                                           // sqrt(y) <= m
    detail: { lnz0, lnz1, lnm, u, lnRho: lnRho(u), slackH5: -(Math.log(2) + lnm_over_y + lnRho(u) + Math.log(12) + Math.log(L)), slackH7: lnm - L / 2 }
  };
}
function firstL(A, B) {
  let lo = 12, hi = 1e9;
  const all = (L) => { const h = hyps(L, A, B); return h.H1 && h.H2 && h.H3 && h.H4 && h.H5 && h.H6 && h.H7; };
  if (!all(hi)) return null;
  for (let i = 0; i < 200; i++) { const mid = Math.sqrt(lo * hi); if (all(mid)) hi = mid; else lo = mid; }
  return hi;
}
console.log('(1) hypotheses H1-H7');
for (const A of [4.05, 4.5, 5, 7, 10]) {
  const L0 = firstL(A, 10);
  const just = hyps(L0 * 0.999, A, 10);
  const failing = Object.keys(just).filter(k => k !== 'detail' && !just[k]).join(',');
  console.log(`  A=${A}  L0=${L0.toFixed(2)}  y0=10^${(L0 / Math.LN10).toFixed(1)}  binding just below: ${failing}`);
}
const h = hyps(308.67, 4.05, 10);
console.log('  at L=308.67, A=4.05, B=10:', JSON.stringify({ H1: h.H1, H2: h.H2, H3: h.H3, H4: h.H4, H5: h.H5, H6: h.H6, H7: h.H7 }), 'u=', h.detail.u.toFixed(3), 'lnrho=', h.detail.lnRho.toFixed(3), 'H5 slack=', h.detail.slackH5.toFixed(2), 'H7 slack=', h.detail.slackH7.toFixed(2));
for (const B of [1, 10, 4200, 1e10, 1e70]) console.log(`  B=${B}: L0(A=4.05)=${firstL(4.05, B).toFixed(3)}`);

// ---------- (2) exponent bookkeeping: exp(-sum g(p)/p) * m versus A^4 y /(B ln y), constants dropped
console.log('(2) ledger identity  m * exp(-(4 ll - 4 lll + 2 llll - 4 ln A)) / (A^4 y / (B L))  (should be 1)');
for (const L of [1e2, 1e3, 1e6, 1e12, 1e50, 1e300]) {
  for (const A of [4.05, 7]) {
    const B = 10, ll = Math.log(L), lll = Math.log(ll), llll = Math.log(lll);
    const lnm_over_y = -Math.log(B) + 3 * ll + 2 * Math.log(lll) - 4 * Math.log(ll);
    const lnS_over_y = lnm_over_y - (4 * ll - 4 * lll + 2 * llll - 4 * Math.log(A));
    const lnTarget_over_y = 4 * Math.log(A) - Math.log(B) - ll;
    console.log(`  L=${L} A=${A}: ratio-1 = ${(Math.exp(lnS_over_y - lnTarget_over_y) - 1).toExponential(3)}`);
  }
}

// ---------- (3) Proposition 1 exhaustively: G2(P(y)) - 1 == max m coverable by pairs {a_p, a_p-2}
function twinSlotMaxGap(P) { // cyclic max gap between consecutive r in [0,P) with gcd(r(r+2),P)=1 ; P small (Number)
  const ok = (r) => gcd(r % P, P) === 1 && gcd((r + 2) % P, P) === 1;
  const slots = []; for (let r = 0; r < P; r++) if (ok(r)) slots.push(r);
  let g = 0; for (let i = 0; i < slots.length; i++) { const nxt = i + 1 < slots.length ? slots[i + 1] : slots[0] + P; g = Math.max(g, nxt - slots[i]); }
  return g;
}
function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }
function maxCover(ps) { // brute force over all residue vectors (a_p)
  let best = 0;
  const idx = ps.map(() => 0);
  const total = ps.reduce((x, p) => x * p, 1);
  for (let t = 0; t < total; t++) {
    let m = 0;
    for (let i = 1; ; i++) {
      let covered = false;
      for (let k = 0; k < ps.length; k++) { const p = ps[k], a = idx[k]; const r = i % p; if (r === a || r === ((a - 2) % p + p) % p) { covered = true; break; } }
      if (!covered) break; m = i;
    }
    if (m > best) best = m;
    for (let k = 0; k < ps.length; k++) { idx[k]++; if (idx[k] < ps[k]) break; idx[k] = 0; }
  }
  return best;
}
console.log('(3) Proposition 1');
for (const y of [5, 7, 11, 13]) {
  const ps = primesUpTo(y); const P = ps.reduce((x, p) => x * p, 1);
  const G2 = twinSlotMaxGap(P), M = maxCover(ps);
  console.log(`  y=${y} P=${P}: G2=${G2}, max coverable m=${M}, G2-1==m: ${G2 - 1 === M}`);
}

// ---------- (4) finite three-band construction with CRT verification
function crt(residues, moduli) { // BigInt CRT
  let x = 0n, M = 1n;
  for (let i = 0; i < moduli.length; i++) {
    const p = BigInt(moduli[i]), r = BigInt(residues[i]);
    const inv = modInv(M % p, p);
    const t = ((r - x % p) % p + p) % p * inv % p;
    x = x + M * t; M = M * p;
  }
  return [x % M, M];
}
function modInv(a, m) { let [g, x] = egcd(a, m); if (g !== 1n) throw new Error('no inverse'); return (x % m + m) % m; }
function egcd(a, b) { if (b === 0n) return [a, 1n, 0n]; const [g, x, y] = egcd(b, a % b); return [g, y, x - (a / b) * y]; }
function bgcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }
function threeBand(y, z0, z1) {
  const ps = primesUpTo(y);
  const a = new Map();
  const band3 = [];
  for (const p of ps) {
    if (p <= z0 || (p > z1 && p < y / 2)) a.set(p, 0);
    else if (p > z0 && p <= z1) a.set(p, 1);
    else band3.push(p);
  }
  const killed = (i) => { for (const [p, ap] of a) { const r = i % p; if (r === ap || r === ((ap - 2) % p + p) % p) return true; } return false; };
  // greedy band 3: walk i = 1, 2, ...; the first unkilled i takes the next free band-3 prime with a_p = i mod p
  let i = 1; const free = band3.slice();
  while (true) {
    if (!killed(i)) { if (!free.length) break; const p = free.shift(); a.set(p, i % p); }
    i++;
  }
  const m = i - 1;
  // CRT: s = -a_p mod p for all p; verify s+1..s+m are non-twin-slots mod P(y)
  const [s, P] = crt(ps.map(p => ((-a.get(p)) % p + p) % p), ps);
  let bad = 0;
  for (let j = 1n; j <= BigInt(m); j++) { const t = (s + j) % P; if (bgcd(t, P) === 1n && bgcd((t + 2n) % P, P) === 1n) bad++; }
  const sTwin = bgcd(s, P) === 1n && bgcd((s + 2n) % P, P) === 1n;
  const eTwin = bgcd((s + BigInt(m) + 1n) % P, P) === 1n && bgcd((s + BigInt(m) + 3n) % P, P) === 1n;
  return { y, z0, z1, band3: band3.length, m, s: s.toString(), twinSlotsInsideRun: bad, startIsTwinSlot: sTwin, endIsTwinSlot: eTwin };
}
console.log('(4) three-band construction, finite toy parameters (band 2 non-empty by hand), verified mod P(y)');
const exactG2 = { 31: 348, 37: 528, 41: 546, 43: 618, 47: 708 }; // paper/two-class-jacobsthal.md section 4, OEIS A144311 + 1
for (const [y, z0, z1] of [[31, 3, 7], [31, 5, 11], [37, 3, 7], [41, 5, 13], [47, 5, 13], [47, 3, 7], [47, 7, 19]]) {
  const r = threeBand(y, z0, z1);
  console.log(`  y=${y} z0=${z0} z1=${z1} band3=${r.band3} primes: covered m=${r.m} -> G2 >= ${r.m + 1}; exact G2=${exactG2[y]}; twin slots inside run: ${r.twinSlotsInsideRun}; run bounded by twin slots: ${r.startIsTwinSlot}/${r.endIsTwinSlot}`);
}
// one-band control: a_p = 0 for all p (band 2 empty, no band 3)
for (const y of [31, 47]) { const r = threeBand(y, y, y); console.log(`  control y=${y} all a_p=0: m=${r.m}, twin slots inside run: ${r.twinSlotsInsideRun}`); }
```

---

*This report is a historical record of one review pass. Current understanding
lives in the owning notes; superseded wording and the reasons for each change are
in [research/history/CHANGELOG.md](../CHANGELOG.md).*
