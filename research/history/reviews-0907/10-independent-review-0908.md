# Independent review of the 2026-09-07 session: the six ranked claims of review-request-0907

Report 10, filed 2026-09-08 against `research/review-request-0907.md` at
starting commit fda7b55 (tree clean; lane V of the 2026-09-08 round). Read-only:
no owning note, script, register or index was edited. Proposed corrections are
in section 9 as exact text for the integrator. Historical record; not a live note.

## 0. What remains open, first

Twin-prime infinitude and every sufficient signed margin remain OPEN. Nothing
below changes the proof status. Halberstam and Richert 1974, Theorem 2.2, is
still unread at the printed page; the statement is now reached by four routes
(three of them re-fetched here), all in Brun form, and the residual on the
manuscript's Theorems A and B is that page behind a printed, refereed Lemma 1.
The Lean build behind the #687 bound is still not reproduced here. Every
disposition below is at finite or textual scope; no asymptotic statement is
established by any check in this report.

## 1. Disposition table

| rank | claim (short) | disposition | what moved |
|---|---|---|---|
| 1 | K-K Lemma 1 is the Brun-form bound, identified with H-R Theorem 2.2 via Richert Theorem 11.3; Theorem B consumes Corollary 1 at z = sqrt(y) with hypotheses discharged; §6.2 not consumed | **verified within stated scope; conditional on the named input** (the 1974 page) | Lemma 1 and Corollary 1 read at the arXiv TeX source and at two page images (arXiv v2 p. 4; the mathnet Izvestiya artifact, printed p. 36 of that file); Richert 11.3 and the chapter note read at page image; H-R 1971 Mémoire Theorem 3 read at page image; Dover OCR snippets re-fetched independently. Hypothesis discharge re-derived. No defect found in §5 to §8 as they stand after report 09's edits |
| 2 | Corollary 1's printed proof mis-chooses CRT representatives; repaired by r' = r (mod p), r' = 1 (mod P(z;p)); present in arXiv v2 and Izvestiya | **verified within stated scope; wording correction proposed** | Own finite check (9 configurations, z in {5, 7, 11}, X in {30, 100, 210, 2310}) confirms the slip and the repair, and sharpens the statement: the printed encoding with least non-negative representatives selects the empty set whenever some Omega_p is not contained in {1}, not only when 0 is in Omega_p; in the one surviving case it selects the avoiders of -Omega, not Omega. The Lemma 1 hypothesis also fails for the printed sequence |
| 3 | At x = 2^j, j >= 30, D_y/x = -(T1/x - C2) within 1e-4; a census measures the classical term's error | **verified within stated scope; correction required to the quoted tolerances** | Recomputed from the JSON artifact: max deviation over j >= 30 is 1.84e-4 (j = 30), also 1.54e-4 (j = 35) and 1.42e-4 (j = 31); the ledger verdict's "within 1e-5 at every j >= 30" holds only at j = 38; the body's "S/x - C2 at most 1.4e-4" is 1.80e-4 at j = 32; the ledger's "within 0.0042 of zero for j >= 26" is 0.004283 at j = 27. The identity algebra is exact and reproduced |
| 4 | The Erdős #687 bound is an anonymous AI-authored GitHub PDF, Lean-formalised by a third party, unrefereed, one-class primorial form; transfers through G2 >= g | **verified within stated scope** | Page, PDF metadata, GitHub commit, Lean statement and the `ResidueCover` definition re-read here at source on 2026-09-08. Build not reproduced (no Lean toolchain on this machine) |
| 5 | Four shifted-prime sums at random-sign size to 2^38; the +2 sums' sign run matched by a control draw | **verified within stated scope; one wording precision proposed** | Ratios, slopes, sign runs and pi(2^j) recomputed from the artifact; pi(2^j) + 2 equals A007053(j) at every j = 3..38 against the fetched b-file. The +2 real run (19) exceeds every draw in its own column (max 13 for mu+, 18 for lambda+); the match at 19 is one draw of the mu- column, so "matched by a control draw" holds only across the pooled 32 draws |
| 6 | A2 = prod_{p>2}(1 - 1/(p(p-1))) = 0.7479116 = 2 x Artin; 0.7364 was wrong | **verified** | Own Euler product to p <= 2 x 10^8: 0.74791163 (tail below 3e-10); 2 x 0.3739558136 = 0.7479116272; both scripts carry 0.7479116272384044; the certified interval of moving-cutoff-parity (15) excludes 0.7364 (C2(1 - 0.7364) = 0.1740 > 21/125 = 0.168) and admits 0.7479116 (0.16642 in (0.165, 0.168)) |

Reading order followed as specified: CHANGELOG 2026-09-07; kk-lower-bound §3 to
§6, §8, §9, §11; centered-discrepancy-measurement; shifted-prime-mobius-sums;
G2-STATE PROVEN list; two-class-jacobsthal §3; then reports 01 to 05, 07 to 09,
with 06 read only after my own attack on 05 (section 3 below); then the two
OUTCOMES entries. Report 09 had already applied E1 to E13; I checked the current
text of §5 Case 1 ((5.1) reads 2(m+2)/y <= z_0), §6.1 (the |r_d| <= g(d) clause
is in the imported list), §8 (H5 with ln 12, H7 present) and §11.2 (the Theorem A
asymmetry removed). Those edits are in place.

## 2. Sources reached in this pass, with custody

| source | route | custody | what was read |
|---|---|---|---|
| Kalmynin and Konyagin, arXiv:2302.00459v2 | `https://arxiv.org/e-print/2302.00459v2` (gzip of `Polynomial_Jacobsthal_revision_3.tex`, 30,276 bytes, dated 2023-12-03); abs page title "[2302.00459v2] A polynomial analogue of Jacobsthal function" | TeX source, primary | Lemma 1, Corollary 1 and its proof, verbatim (section 4) |
| same, PDF | cached `kk_v2.pdf`, md5 `b5d7d2a23ffd902415057adebfe430b1` (matches the manuscript's recorded artifact) | page image p. 4 rendered at 150 dpi and inspected | the same text; the product formula and representative choice as in the TeX |
| published version, Izvestiya Math 88:2 | `https://www.mathnet.ru/php/getFT.phtml?jrnid=im&paperid=9467&what=fullt&option_lang=eng` and `=rus` with a browser User-Agent; both served the same file, md5 `871d344ee9cbb53bfc04e631e8bd8040`, 629,304 bytes, 11 pages, created 2024-03-21 | page image (pdf p. 4, printed p. 36 of that artifact) | Corollary 1 and its proof; same formula, copy-edited wording ("it is easily seen", "Corollary is proved"); Lemma 1's proof line "see, for example, Theorem 2.2 in [5]". The English-edition artifact md5 `9e7f3c54...` that report 07 read (printed p. 228) was not served today |
| Richert, Lectures on Sieve Methods, Tata 1976 | cached `richert_tata.pdf`, md5 `d2915a3eca4436a760dfaf50e1a1c335`; the Toledo-hosted copy re-fetched, same md5 | page images pdf pp. 151 and 166 (printed pp. 135 and 150) | Theorem 11.1, 11.2, condition (R) as (11.9), Theorem 11.3 as (11.10), the (Omega_0) remark; the chapter note "Theorem 11.3: cf. l.c. Theorem 2.2. Actually, Theorem 11.3 holds for z >= X^A also when the restriction in the product, p < z, is replaced by p < X" |
| Halberstam and Richert, A new look at Brun's sieve, Mém. SMF 25 (1971) | `https://www.numdam.org/item/10.24033/msmf.39.pdf`, 646,810 bytes | page images pp. 98 and 100 | Theorem 3, p. 100, verbatim: "Suppose that (Omega), (Omega_1) and (R) hold. For any positive number mu, S(A;P,z) = O(XW(z)) if z <= X^mu and S(A;P,z) = O(XW(X)) if z >= X^{1/mu}, where the constants implied by the O-symbols may depend on mu." Conditions on p. 98: (Omega) omega(p) <= A for some constant A >= 1; (R) |R_d| <= omega(d) if d | P(z); (Omega_1) omega(p)/p <= 1 - 1/A_1 |
| Halberstam and Richert 1974 (Dover reprint OCR) | `https://books.google.dk/books?id=keKvAAAAQBAJ&q=%22THEOREM+2.2%22` search-inside JSON | OCR snippets, not page images | p. 68: "THEOREM 2.2. (Omega_1), (Omega_2(kappa)), (R): For any A (>0), ... S(A;P,z) <= B3 X prod (1 - omega(p)/p) ... Proof. We begin with the trivial estimate, provided by (1.4.14)"; p. 69: "Theorem 2.2 is an easy consequence of (5.3). We may now assume in both (5.1) and (5.2) that z >= X^{1/A}"; p. 82: Theorem 2.5, the fundamental lemma, under the same (Omega_1), (Omega_2(kappa)), (R); p. 130: "Theorem 2.2 and all results of Sections 2.6 and 2.7 could be derived equally well from Theorem 4.1 below, after applying condition (R)"; p. 153: "the conditions under which Theorems 4.1 (and 2.2) were proved: namely, (Omega_1), (Omega_2(kappa)) (and (R))". The constant label reads "B3" in this OCR against "B" in report 08's; both are uncertain tokens. archive.org `_djvu.txt` returned 401; the Books API returned no items for the same queries |
| Erdős Problems #687 | `https://www.erdosproblems.com/687` via curl with a browser User-Agent (WebFetch returned 403) | HTML, 33,727 bytes | "The best lower bound is due to GPT 5.6 Pro (see [4]) Y(x) >> (log x/logloglog x) x, improving on a previous bound of Ford, Green, Konyagin, Maynard, and Tao [FGKMT18]"; "[4]" links to `/4`; "This page was last edited 31 August 2026" |
| the anonymous PDF | `https://raw.githubusercontent.com/DottedCalculator/ai-math/main/Erdos_4_GPT_5.6_Sol.pdf`, 644,908 bytes; GitHub API: one commit touching the file, `9ed1cea5`, 2026-08-26T01:30:55Z, "Add files via upload" | pdfinfo and text of pp. 1 to 4 | Title "A Tilted Residue-Class Construction for Long Prime-Free Intervals"; Author field "Anonymous manuscript – revised edition"; 48 pages; creation 2026-08-26; p. 3 "Covering theorem. There is an effective constant c0 > 0 such that, for every sufficiently large X, Y(X) >= c0 X log X / log log log X" |
| Lean formalisation | `plby/lean-proofs`, `src/latest/ErdosProblems/Erdos4Tilted.lean` (6,240 bytes) and the 405 files under `Erdos4/` | source text | `theorem covering_theorem : ∃ c X₀ : ℝ, 0 < c ∧ ∀ X : ℝ, X₀ ≤ X → c * X * Real.log X / Real.log (Real.log (Real.log X)) ≤ (maximumCoverLength X : ℝ)`; `maximumCoverLength X := Nat.findGreatest (BoundedCover ⌊X⌋₊) (primorial ⌊X⌋₊)`; `BoundedCover z y := ∃ cover : ResidueCover y, cover.primes ⊆ z.primesLE`; `structure ResidueCover (y : ℕ)` with `primes : Finset ℕ`, `residue : ℕ → ℕ`, `covers : ∀ i, 1 ≤ i → i ≤ y → ∃ p ∈ primes, i ≡ residue p [MOD p]` (Base.lean line 1692). Zero occurrences of `sorry` or `axiom` across the 408 files fetched. Build not reproduced |
| OEIS A007053 | `https://oeis.org/A007053/b007053.txt` | b-file, 93 rows | pi(2^j) + 2 from the shifted-prime artifact equals A007053(j) at every j = 3..38 |

## 3. Ranked claim 1: the sieve step of Theorem B

### 3.1 The statements as printed (TeX source, verbatim)

Lemma 1: "Suppose that kappa > 0, z >= 2. Assume that {a_n} is a sequence of
non-negative real numbers such that for all d | P(z) we have
sum_{n = 0 (mod d)} a_n = g(d) X/d + r_d, where g(d) is a multiplicative
function with g(p) <= kappa, g(p) < p for all primes p, |r_d| <= g(d) and
z << X. Then we have S(a, z) = sum_{(n, P(z)) = 1} a_n <<_kappa X V(z), where
V(z) = prod_{p <= z}(1 - g(p)/p)." Proof: "This is a version of the fundamental
lemma of sieve theory. See, for example, [5, Theorem 2.2]."

Corollary 1: "Let kappa, z, g(d), V(z) and X be as above. Suppose that for any
p <= z the set Omega_p subset Z/pZ contains g(p) elements. Let S(X, Omega) be
the number of n <= X such that n mod p not in Omega_p for all p <= z. Then
S(X, Omega) << X V(z)."

Neither statement carries a support parameter, a remainder sum or a size
restriction on d beyond d | P(z). Confirmed at the TeX and at both page images.

### 3.2 Hypothesis discharge for Theorem B, re-derived

With Omega_p = Omega^I_p union Omega^III_p as in §4, z = sqrt(y), X = m:

- g(2) = |{0, -2 mod 2}| = 1 < 2; g(3) = |{0, 1}| = 2 < 3; band 1 at p >= 5,
  g(p) = 2 < p; band 2, g(p) = 4 < p since p > z_0 > 3 (H1) forces p >= 5, and
  {0, -2} and {1, -1} are disjoint mod p because the only coincidence -2 = 1
  needs p | 3. So kappa = 4 is the supremum and any kappa >= 4 is admissible;
  kappa enters only the implied constant.
- g(d) := prod_{p | d} g(p) on squarefree d is multiplicative.
- |r_d| <= g(d) for every squarefree d: the n with n mod p in Omega_p for each
  p | d form exactly g(d) classes mod d by CRT; a class a mod d with
  1 <= a <= d meets [1, X] in floor((X - a)/d) + 1 integers if a <= X and in 0
  integers otherwise, and in both cases the count differs from X/d by less than
  1; summing over g(d) classes gives |r_d| < g(d). No restriction on the size of
  d; d > X is allowed.
- z << X: m/sqrt(y) = sqrt(y)(ln y)^3(lnlnln y)^2/(B (lnln y)^4) tends to
  infinity for fixed B; at y_0 the ratio is above 10^67 divided by B.
- Direction: every consumer in §6.1 to §7 uses an upper bound on a count
  ((6.1), the ledger, R <= y/(3 ln y), the injection into primes of (y/2, y]).
  No lower-bound sieve, no asymptotic.
- The implied constant: Lemma 1 prints <<_kappa. Under Richert 11.3 the
  constant depends on A, A_1, A_2 and kappa; here A = 1 (z <= X), A_1 = kappa + 1
  (since g(p) <= min(kappa, p - 1) gives g(p)/p <= 1 - 1/(kappa + 1)), and A_2
  is absolute by Mertens or by (Omega_0) with A_0 = kappa. So the constant
  depends on kappa alone, which is what "B large against A" in §6.4 needs.

### 3.3 The identification with Halberstam and Richert Theorem 2.2

Four routes now agree on the shape: pointwise |R_d| <= omega(d) for squarefree
d | P(z), conclusion S << X prod_{p < z}(1 - omega(p)/p) for z <= X^A, constant
depending on A and the (Omega) constants, no remainder sum, no support
parameter. (i) Richert's Theorem 11.3 and his chapter note, read at page image.
(ii) The 1971 Mémoire's Theorem 3, read at page image, under (Omega) (bounded
omega(p)), (Omega_1) and (R), with the two clauses z <= X^mu and z >= X^{1/mu}.
(iii) The Dover OCR index, re-fetched here, at pp. 68, 69, 130 and 153. (iv)
The same index shows Theorem 2.5 (the fundamental lemma proper, p. 82) under
the same three conditions, so Kalmynin and Konyagin's phrase "a version of the
fundamental lemma" and their citation of Theorem 2.2 point at the same
hypothesis set either way.

What has not been done: the 1974 page image. What I did not find in any route:
a Halberstam and Richert upper-bound theorem under (R) that carries a support
parameter. The Selberg-form remainder sum_{d <= xi^2} 3^{nu(d)} |R_d| belongs
to Theorem 4.1 (Richert 11.1), which has no (R) hypothesis; p. 130 of the OCR
says Theorem 2.2 "could be derived equally well from Theorem 4.1 below, after
applying condition (R)", which is the reduction the manuscript's §6.2 remark
now describes.

### 3.4 Richert 11.3 from Theorem 9.1 and (11.5) (ASSUMED-UNVERIFIED item 2)

Richert prints no proof beyond "one readily obtains, from (the second
inequality of) Theorem 9.1 and (11.5)". Read at page image: Theorem 9.1's second
inequality is S(A, p, z) <= X/G(z) + sum_{d < z^2, d | P(z), (d, p-bar) = 1}
mu^2(d) 3^{nu(d)} |R_d|; (11.5) is 1/G(z) << W(z) under (Omega_1), (Omega_2(kappa)).
The standard argument, re-derived here at sketch level and not adversarially
checked: (a) for z' <= z, S(A, p, z) <= S(A, p, z') since fewer primes are
sifted; (b) under (R) and (Omega_2(kappa)), sum_{d < z'^2, d | P(z')} 3^{nu(d)}
omega(d) <= z'^2 prod_{p < z'}(1 + 3 omega(p)/p) << z'^2 (ln z')^{3 kappa},
using sum_{p < z'} omega(p)/p <= kappa ln ln z' + O(1) by partial summation of
(Omega_2(kappa)); (c) take z' = min(z, X^{1/2}(ln X)^{-2 kappa}); then the
remainder is << X (ln X)^{-kappa} << X W(z') (the lower bound W(z') >>
(ln z')^{-kappa} follows from (Omega_2(kappa)) the same way), and for z <= X^A,
W(z')/W(z) << (ln z/ln z')^kappa <<_{A, kappa} 1. Hence S << X W(z') << X W(z).
This matches report 06 finding 1 as report 09 describes it. Calibration: a
reviewer's reconstruction of a three-line standard argument; Richert's own
derivation is not printed and so cannot be "read".

### 3.5 My attack on report 05 before reading 06

Points probed: the p < z against p <= z product mismatch (harmless, one factor
>= 1 - 4/sqrt(y)); whether the encoded sequence's decomposition is required for
d > X (it is, and it holds trivially); whether the Corollary needs g(p) < p at
primes p > z (a formality; g is only consulted on d | P(z)); whether z << X
against z <= X^A loses anything (no: z <= CX <= X^2 for X >= C); whether the
constant could depend on the manuscript's A or B (no, section 3.2). I found no
defect in 05's mathematics. Its exponent slip in the V(sqrt y)/V(xi) ratio (2
against 4) and its formula slip in the z << X row are already recorded in 09.
Report 06's finding 6 (the representative slip) is the one thing 05 missed; I
reached it independently through the TeX before reading 06, and section 4
extends it.

## 4. Ranked claim 2: the CRT representatives in Corollary 1's printed proof

### 4.1 The printed encoding

P(z;p) = P(z)/p; Q(z;p) the least positive solution of Q = P(z;p) (mod p),
Q = -1 (mod P(z;p)); a_m = 1 if m = prod_{p <= z} prod_{r in Omega_p}
(P(z;p) n + r Q(z;p)) for some n <= X, else 0. Claim printed: (m, P(z)) = 1
and a_m = 1 if and only if n lies in no Omega_p; "Conditions of Lemma 1 also
clearly hold."

### 4.2 Exact finite algebra

Fix p <= z and r in Omega_p taken as an integer in [0, p - 1]. Modulo p the
factor is P(z;p)(n + r), so p divides it iff n = -r (mod p). Modulo any other
prime q <= z, P(z;p) = 0 and Q(z;p) = -1, so the factor is -r (mod q) and q
divides it iff q | r. For r = 0 every q <= z, q != p, divides the factor. For
2 <= r <= p - 1 every prime factor q of r satisfies q <= r < p <= z and
q != p, so q | P(z;p) and q divides the factor for every n. Only r = 1 is
coprime to P(z;p). Consequences, all confirmed by the finite check below:

1. If some Omega_p is not contained in {1}, then (m(n), P(z)) > 1 for every n,
   the encoded sum is identically zero, the printed "if and only if" is false,
   and the Lemma 1 hypothesis fails for the encoded sequence (for example the
   count of n <= X with 2 | m(n) is X against g(2)X/2 + r_2 with |r_2| <= g(2)).
   This is sharper than "fails when 0 is in Omega_p": it fails for every
   representative other than 1.
2. If every Omega_p is contained in {1}, the printed encoding selects exactly
   the n avoiding -Omega_p for all p, not Omega_p. The sign is wrong even where
   the representatives are admissible.
3. With r' = r (mod p), r' = 1 (mod P(z;p)), the factor is P(z;p)(n + r) (mod p)
   and -1 (mod q), so (m(n), P(z)) = 1 iff n avoids -Omega_p for every p <= z:
   the session's repair, giving the bound for -Omega with the same g(p). The
   variant r' = -r (mod p), r' = 1 (mod P(z;p)) gives Omega itself. Under the
   repaired encoding n -> m(n) is strictly increasing on n >= 1 (every factor is
   positive and increasing), so a_m is a genuine indicator and the counts
   sum_{m = 0 (d)} a_m = #{n <= X : d | m(n)} obey |r_d| <= g(d) by section 3.2.

### 4.3 The finite check (own fixture, independent of the session's 3/0/3)

Scratch script `round-0908/V/crt-check.js` (BigInt; not a repo script, not
embedded; text in section 10). For each configuration it enumerates n <= X,
forms m(n) under both encodings, tests (m(n), P(z)) = 1, compares with the
sets avoiding Omega and -Omega, and checks |r_d| <= g(d) at every squarefree
d | P(z).

| configuration | avoid Omega | avoid -Omega | printed encoding | repaired encoding | Lemma 1 hypothesis, printed / repaired |
|---|---|---|---|---|---|
| z = 7, X = 210, Omega_2 = {0}, Omega_p = {0, -2} (Theorem A shape) | 15 | 15 | 0, equal to neither | 15, equal to the -Omega avoiders {1, 13, 19, 31, ...} | 15 of 15 d violate / 0 violate |
| same, X = 100 | 6 | 7 | 0 | 7 = -Omega avoiders | 15 / 0 |
| z = 7, X = 210, Omega_2 = {0}, Omega_3 = {0, 1}, Omega_5 = Omega_7 = {0, -2, 1, -1} (Theorem B band-2 shape) | 3 | 3 | 0 | 3 = -Omega avoiders {73, 103, 193} | 15 / 0 |
| z = 7, X = 210, Omega_5 = {3}, others {1} (no zero; 3 divides P(z;5)) | 48 | 48 | 0 | 48 = -Omega avoiders | 8 / 0 |
| z = 7, X = 210, Omega = {2:{1}, 3:{1}, 5:{1, 4}, 7:{2}} | 36 | 36 | 0 | 36 = -Omega avoiders | 7 / 0 |
| z = 7, X = 210, Omega = {2:{1}, 3:{1, 2}, 5:{1, 4}, 7:{1, 6}} (symmetric) | 15 | 15 | 0 | 15 = both | 11 / 0 |
| z = 7, X = 210, Omega_p = {1} for all p (the only admissible representatives) | 48 ({2, 12, 14, ...}) | 48 ({10, 12, 16, ...}) | 48, equal to the -Omega avoiders, not the Omega avoiders | 48 = -Omega avoiders | 0 / 0 |
| z = 11, X = 2310, Omega_p = {1} for all p | 480 | 480 | 480 = -Omega avoiders | 480 = -Omega avoiders | 0 / 0 |
| z = 5, X = 30, Omega_2 = {0}, Omega_3 = {0, 1}, Omega_5 = {0, 3} (the session fixture) | 3 ({11, 17, 29}) | 3 ({1, 13, 19}) | 0 | 3 = -Omega avoiders | 7 / 0 |

The session's 3 / 0 / 3 reproduces as the last row. The slip is in the TeX
source and in both page images (arXiv v2 p. 4; the mathnet artifact). The
corollary's statement is unaffected: the repaired encoding proves it for -Omega,
hence for Omega by applying it to -Omega. The manuscript consumes the statement.

## 5. Ranked claim 3: the D_y identity reading

From `research/centered-discrepancy-measurement.json` (config C2 =
0.6601618158468696, rows j = 16..38 at shift 2), recomputed here:

| j | D/x | -(T1/x - C2) | difference | S/x - C2 | P/x | E_pp/x | E_even/x |
|---|---|---|---|---|---|---|---|
| 30 | -0.000265 | -0.000450 | +1.84e-4 | +1.26e-4 | -8.86e-5 | +2.98e-5 | -1.8e-9 |
| 31 | +0.002449 | +0.002591 | -1.42e-4 | -1.40e-4 | -2.06e-5 | +2.26e-5 | ~0 |
| 32 | -0.001258 | -0.001349 | +9.10e-5 | +1.80e-4 | +7.44e-5 | +1.43e-5 | 0 |
| 33 | -0.004180 | -0.004208 | +2.80e-5 | +9.73e-5 | +5.86e-5 | +1.07e-5 | -8.9e-11 |
| 34 | -0.000899 | -0.000983 | +8.38e-5 | +1.25e-4 | +3.34e-5 | +7.64e-6 | -2.6e-10 |
| 35 | +0.001132 | +0.001286 | -1.54e-4 | -1.11e-4 | +3.78e-5 | +5.55e-6 | 0 |
| 36 | -0.001193 | -0.001204 | +1.04e-5 | +6.29e-6 | -7.87e-6 | +3.81e-6 | +1.5e-10 |
| 37 | -0.000406 | -0.000455 | +4.90e-5 | +5.13e-5 | -4.09e-7 | +2.64e-6 | -1.2e-10 |
| 38 | +0.001476 | +0.001473 | +3.15e-6 | +9.44e-6 | +4.34e-6 | +1.96e-6 | +9.6e-12 |

Identity residuals in the artifact: S - T1 - T2 - E_pp at most 2.5e-7 absolute;
T2 - acc1 - E_even at most 1.26e-5 (j = 38, sums of size 1e11); D - (acc1 - P)
exactly 0 at every j. The naive reimplementation agrees at j = 16, 18, 20 to
relative 9.0e-15, 7.5e-15, 6.1e-15; W1grid/W1exact 0.9747, 0.9718, 0.9661. The
rearrangement D_y/x = (S/x - C2) - (T1/x - C2) - P/x - E_pp/x - E_even/x is
exact given those identities and D = acc1 - P, so the reading follows from the
columns. What the columns support, exactly: max |D_y/x + (T1/x - C2)| over
j >= 30 is 1.84e-4; it is below 1e-4 at j = 32, 33, 34, 36, 37, 38 and below
1e-5 only at j = 38. The quoted "1e-5" (ledger verdict, OUTCOMES-adjacent
QUESTIONS row) is wrong; "1e-4" (body, spec, CHANGELOG, OUTCOMES) is exceeded
at j = 30, 31, 35. The body's bound "S/x - C2 at most 1.4e-4 for j >= 30" is
1.80e-4 at j = 32. The ledger's "within 0.0042 of zero for j >= 26" is 0.004283
at j = 27 (OUTCOMES already says 0.0043).

The interpretation, stated at its exact scope: at every j in 30..38, D_y equals
S - T1 up to at most 2e-4 x, where S is the twin count and T1 the classical
term, both computed separately by the same script. D_y therefore adds no
information at reachable x beyond the twin count and T1's finite convergence,
which is what the note's item 3 says in other words. The do-not-rerun stands.
One consequence the note does not state: by (12), D_y >= -4x/25 + o(x) is
equivalent to S + 2 C2 M >= (C2 - 4/25) x + o(x), a lower bound on the twin
count itself modulo the M term; that is derived here as an elementary
rearrangement of (12) and relies on T1 = C2 x + o(x) only as recorded in
moving-cutoff-parity (6), not re-derived. It is consistent with the handoff's
statement that D_y and the full residual are not independent gains.

The "order x/log^2 x" description of T1's error is a heuristic reading: at
j = 38, T1/x - C2 = -1.47e-3 against 1/ln^2(2^38) = 1.44e-3; at j = 33 it is
-4.2e-3. Sign oscillates. Not fitted; not claimed as a rate.

## 6. Ranked claims 4, 5, 6

**Claim 4.** Every element of the attribution re-read at source (section 2):
page text and edit date; the "[4]" link; the GitHub commit date; the PDF's
title, author field, page count and creation date; the covering theorem's
statement; the Lean theorem, its `maximumCoverLength` and `ResidueCover`
definitions (one residue per prime in a finite set of primes <= floor(X),
covering every i in [1, y]), which is the one-class primorial Y(floor(X)); zero
`sorry` and zero `axiom` across 408 fetched files. The transfer: a cover of
[1, N] by one class per prime p <= x gives a run of N consecutive integers each
sharing a factor with x#, so g(x#) >= N + 1, and G2 >= g pointwise (Proposition
2 of the manuscript); hence G2(x#) >> x ln x/ln ln ln x at the calibration of the
source: formalised, unrefereed, anonymous. Not reproduced: the Lean build (no
toolchain here). The G2-STATE and two-class-jacobsthal wording is accurate as it
stands.

**Claim 5.** From `research/shifted-prime-mobius-sums.json`: largest
|U|/control-rms over j >= 20 is 2.822 (mu+, j = 35), 1.438 (mu-), 2.335
(lambda+), 1.309 (lambda-); at j = 38 the four ratios are 1.282, 0.692, 1.983,
0.286. Slopes over j >= 28 recomputed by least squares: 0.650, 0.505, 0.614,
0.276 against control rms slopes 0.465, 0.432, 0.453, 0.453, matching the
stored `slopes` block to three decimals. Longest same-sign run over j = 20..38:
19, 7, 19, 4; mu+ and lambda+ negative at every j from 21 to 38. pi(2^j) + 2
equals A007053(j) at every j = 3..38 against the fetched b-file. Sq/pi at j = 38
is 0.747911, diff -4.45e-7 against A2. Mdy at j = 24 is -18508.63010892218
against -18508.63010892274 in the centered artifact. The per-draw sign runs
(mu+ draws 9, 7, 5, 13, 3, 8, 4, 10; mu- draws 9, 11, 14, 19, 5, 9, 8, 12;
lambda+ and lambda- draws 9, 11, 10, 18, 4, 4, 7, 9) and the control flags
(plainSieveMatches(j <= 26) = true; ctrlMeanWithin4se = true; shiftsDiffer =
true) are read from the bound OUTPUT block, not recomputable from the JSON.
Precision point: the real +2 run of 19 exceeds every draw in its own column
(max 13 for mu+, 18 for lambda+); it is matched only by one mu- draw. "Matched
by a control draw" is true across the pooled 32 draws and false column by
column. One of 32 draws reaching 19 is not a significance claim in either
direction, and the note proposes no mechanism; the wording should say which
column matched.

**Claim 6.** Own computation (`round-0908/V/a2.js`): the Euler product over
primes p <= 2 x 10^8 (11,078,937 primes) gives 0.7479116275, with the tail
factor below 1 - 2.6e-10, so A2 = 0.7479116 to seven digits; 2 x 0.3739558136 =
0.7479116272. Both scripts carry `A2 = 0.7479116272384044`; the shifted script's
fingerprint records the forced re-embed ("2 of 666 figures in the replaced block
not reproduced (first: 0.73644380948, 0.011467)"); the centered script's
thresholds line reads "M bound A2/2 = 0.3740". The certified interval
33/200 < C2(1 - A2) < 21/125 of moving-cutoff-parity (15) gives, at A2 = 0.7364,
C2(1 - A2) = 0.1740 > 0.168, excluded; at 0.7479116 it gives 0.16642, inside
(0.165, 0.168). Git history: the constant changed in commit 1a4cb7a.

## 7. The two embedded OUTPUT blocks and a tooling finding

`node research/qc/embed.js --check <script>` was run for both scripts as the
brief instructed. Its static half passed for both: "code-sha256 matches; body
matches out-sha256 — the pasted block is bit-honest". Its second half then
re-ran the RECORDED invocation, `node research/centered-discrepancy-measurement.js
38` with 5 worker processes and `SPMS_WORKERS=6 node
research/shifted-prime-mobius-sums.js 38` with 7 processes, that is the 2^38
census both the round contract and the review spec forbid, at 12 processes
against the 2-core lane limit. I killed all 15 processes after about 7 and 10
minutes of wall time respectively; no output was written and no artifact
changed (the two JSON files carry their 2026-09-07 timestamps). The brief's
premise that `--check` is a read-only verification with a 120 s timeout does
not hold for scripts whose recorded invocation spawns workers: the parent's
timeout did not stop the workers. Proposed wording for the review spec and the
embed documentation is in section 9. The static half is the check the spec's §4
actually wants ("bound to their code"), and it passed.

## 8. ASSUMED-UNVERIFIED items

| item | disposition after this pass |
|---|---|
| 1. H-R 1974 Theorem 2.2 at the printed page | NOT discharged. Fourth route added (Dover OCR re-fetched here, pp. 68, 69, 82, 130, 153; section 2), agreeing with report 08 on the hypotheses (Omega_1), (Omega_2(kappa)), (R) and on the p. 69 reduction to z >= X^{1/A}; the constant label is "B3" in my OCR against "B" in 08's, both uncertain. The 1971 Mémoire Theorem 3 read here at page image (report 08 does not say at what custody it read it). archive.org 401; Books API empty; HathiTrust not retried |
| 2. Richert 11.3 proved as stated | PARTIALLY discharged: Richert prints no proof beyond the pointer (page image read); the three-step standard reduction re-derived here in sketch (section 3.4), matching 06 finding 1 as 09 reports it. Not adversarially checked; a reader wanting a printed proof should use H-R 1974 p. 69 or Theorem 4.1 with (R) |
| 3. Lean build | NOT reproduced (no toolchain). File-level: 0 `sorry`, 0 `axiom` across 408 fetched files; the `ResidueCover` definition read and matches the one-class covering |
| 4. Page images of both K-K PDFs at the Corollary 1 proof | DISCHARGED: arXiv v2 p. 4 (md5 b5d7d2a2...) and the mathnet artifact pdf p. 4 (md5 871d344e...) inspected as images; the product formula and representative choice are as the TeX states. The English-edition artifact 9e7f3c54... was not served today, so its p. 228 image remains at report 07's extracted-text custody |
| 5. The random-sign control as the right null for §3.3 | Not load-bearing, as the spec says: the §3.3 reading is identity-based and control-free (section 5). The control's D at j = 38 has rms about 1.8e7, i.e. 6.5e-5 x, which is the only use of it in that item. Unchanged |
| 6. The two segmented sieves agree beyond j = 24 | DISCHARGED for the M column, the only quantity both scripts compute: at all 23 shared j = 16..38 the centered script's M and the shifted script's Mdy agree to relative 5.4e-12 or better (exactly equal at j <= 23). No other column has a cross-codebase counterpart |

## 9. Proposed record updates (exact text; the integrator applies)

**9.1 `research/review-request-0907.md` ledger.** `status: OPEN` -> `status:
ANSWERED`. Verdict line -> `Reviewed 2026-09-08 by an outside reader
(history/reviews-0907/10): ranked claims 1 (conditional on the unread 1974
page), 2, 4, 5, 6 verified within stated scope; claim 3 verified with its
quoted tolerances corrected (max deviation 1.8e-4, not 1e-4 or 1e-5); the
Corollary 1 slip sharpened (fails for every representative other than 1, and
mis-signs even then); ASSUMED items 4 and 6 discharged, 2 partially, 1, 3, 5
not. Twin-prime infinitude and every sufficient signed margin remain OPEN.`
Add to §3 after the disposition paragraph: `Independent review 2026-09-08:
history/reviews-0907/10. The embed.js --check of §4 re-runs the recorded
invocation and spawned the 2^38 census; use it only for the static verdict
and stop it before the re-run, or verify with node research/qc.js embeds.`

**9.2 `research/centered-discrepancy-measurement.md`.** Ledger verdict: replace
`D_y/x stays within 0.0042 of zero for j>=26` with `D_y/x stays within 0.0043
of zero for j>=26`; replace `pins D_y/x to -(T1/x - C2) within 1e-5 at every
j>=30, because S/x is within 1e-4 of C2` with `pins D_y/x to -(T1/x - C2) within
2e-4 at every j>=30 (1.8e-4 at j=30, below 1e-4 from j=36), because S/x is
within 1.8e-4 of C2`. §3 item 3: replace `S/x-C2 is at most 1.4e-4 in magnitude
for j>=30 (9e-6 at j=38)` with `S/x-C2 is at most 1.8e-4 in magnitude for j>=30
(1.80e-4 at j=32, 9e-6 at j=38)`; replace `So D_y/x equals -(T1/x - C2) to
within about 1e-4 at every j>=30` with `So D_y/x equals -(T1/x - C2) to within
2e-4 at every j>=30 (the largest deviation is 1.84e-4 at j=30; it is below
1e-4 at j=32, 33, 34, 36, 37, 38)`. Add to item 3, after the sentence ending
"an order of magnitude beneath it": `Equivalently, by (12), the sufficient
input (16) is the statement S + 2C2 M >= (C2 - 4/25)x + o(x), a lower bound
on the twin count itself up to the M term; a census of D_y is a census of
twin primes minus a computable classical term.` (The regenerated QUESTIONS.md
row follows from the ledger edit.)

**9.3 `research/OUTCOMES.md`, Q-centered-discrepancy-measurement.** Replace
`pin D_y/x to -(T1/x - C2) within 1e-4 at every j>=30, because S/x is within
1.4e-4 of C2` with `pin D_y/x to -(T1/x - C2) within 2e-4 at every j>=30
(largest deviation 1.84e-4 at j=30), because S/x is within 1.8e-4 of C2`. Add
to **Evidence:** `independent review of the identity columns in
history/reviews-0907/10 §5`.

**9.4 `research/OUTCOMES.md`, new entry under Q-review-request-0907.**
`#### Review of the 2026-09-07 session — six ranked claims read by an outside
reader` / `**Grade:** REVIEWED at textual and finite scope; no asymptotic
content. **Question:** Q-review-request-0907.` / `**Result:** Claims 1, 2, 4, 5,
6 verified within stated scope, claim 1 conditional on the unread 1974 page of
Halberstam and Richert; claim 3 verified with its tolerances corrected (max
|D_y/x + (T1/x - C2)| over j>=30 is 1.84e-4). Lemma 1 and Corollary 1 of
Kalmynin and Konyagin read at the arXiv TeX and at two page images; Richert
Theorem 11.3 and the 1971 Mémoire Theorem 3 read at page image; the Dover OCR
index re-fetched; all Brun form. The Corollary 1 representative slip
sharpened by exact finite algebra: with representatives in [0, p-1] the
printed encoding selects the empty set whenever some Omega_p is not contained
in {1}, and selects the avoiders of -Omega in the remaining case; the repair
r' = r (mod p), r' = 1 (mod P(z;p)) selects the -Omega avoiders pointwise in
all nine tested configurations. The cross-codebase M column agrees at all 23
shared j to 5.4e-12 relative.` / `**Limit:** the 1974 page image is unread;
Richert's proof of 11.3 is a pointer, re-derived here only in sketch; the Lean
build is not reproduced. A finite check does not prove Corollary 1; the
statement is consumed from a refereed source.` / `**Evidence:**
[report](history/reviews-0907/10-independent-review-0908.md); scratch
`crt-check.js` and `a2.js` under the round-0908/V scratchpad (not embedded).` /
`**Reuse or revisit condition:** revisit claim 1 only with the 1974 page or a
printed proof of Theorem 11.3; revisit claim 2 only if a representative
convention other than [0, p-1] is shown to be the authors' intent, which does
not change the statement consumed.`

**9.5 `paper/kk-lower-bound.md` §11.2, the slip paragraph.** Replace `as
extracted from the TeX the representatives $r$ are not chosen coprime to
$P(z;p)$; when $0 \in \Omega_p$, which holds here at every $p$, the factor
$P(z;p)\,n$ is divisible by every other $q \le z$ and the printed "if and only
if" fails (a check at $z = 5$ gives 3 avoiding $n \le 30$ against 0 encoded;
reproduced independently on 2026-09-07).` with `the representatives $r$ are
left as elements of $\mathbb{Z}/p\mathbb{Z}$; read as integers in $[0, p-1]$,
every $r \ne 1$ has a prime factor $q < p \le z$ dividing $P(z;p)$, so $q$
divides the factor $P(z;p)\,n + r\,Q(z;p)$ for every $n$, the encoded sum is
identically zero, and the printed "if and only if" and the appeal to Lemma 1
both fail whenever some $\Omega_p \not\subseteq \{1\}$, which holds here at
every $p$ since $0 \in \Omega_p$; in the remaining case $\Omega_p \subseteq
\{1\}$ the encoding selects the $n$ avoiding $-\Omega_p$, not $\Omega_p$ (finite
checks at $z = 5, 7, 11$, nine configurations, `history/reviews-0907/10` §4;
the $z = 5$ check of 2026-09-07 gives 3 avoiding $n \le 30$ against 0 encoded).`
Also replace `The published Izvestiya version (p. 228) has the same proof text
as arXiv v2 apart from copy-edits` with `The published Izvestiya version (p.
228 of the English edition, read at extracted text; the mathnet full-text
artifact md5 871d344e..., read at page image 2026-09-08) has the same proof
text as arXiv v2 apart from copy-edits`.

**9.6 `paper/kk-lower-bound.md` §11.2 and §11.4, the identification row.**
After `and by the authors' 1971 Mémoire Theorem 3, which states the same
two-clause bound under $(\Omega)$, $(\Omega_1)$, $(R)$;
`research/history/reviews-0907/08`.` add `Both re-read at page image on
2026-09-08 (Richert pp. 135 and 150; Mémoire pp. 98 and 100), and the Dover
index re-fetched at pp. 68, 69, 82, 130 and 153 (`reviews-0907/10` §2, §3.3).`
In the §11.4 table row for Theorem 2.2, replace `Richert Tata Theorem 11.3 read
at extracted text 2026-09-07` with `Richert Tata Theorem 11.3 read at page image
2026-09-08; Mémoire 1971 Theorem 3 read at page image`.

**9.7 `research/shifted-prime-mobius-sums.md` §3 item 3.** Replace `one draw of
the mu- control holds one sign across the whole window` with `one draw of the
mu- control holds one sign across the whole window, while no draw in the mu+
column exceeds 13 and none in the lambda+ column exceeds 18, so the real +2
runs are matched only across the pooled 32 draws`. In the review spec's row 5,
`matched by a control draw` -> `matched by one draw of the mu- control, not by
any draw in the +2 columns`.

**9.8 `research/history/CHANGELOG.md`, new entry.** `## 2026-09-08: independent
review of the 2026-09-07 session (history/reviews-0907/10). Ranked claims 1, 2,
4, 5, 6 verified within stated scope (claim 1 conditional on the unread 1974
page); claim 3's tolerances corrected in centered-discrepancy-measurement.md
(ledger and §3 item 3) and OUTCOMES: the identity pins D_y/x to -(T1/x - C2)
within 2e-4 for j>=30, not 1e-5 or 1e-4, and S/x - C2 reaches 1.80e-4 at j=32.
The Corollary 1 representative slip in kk-lower-bound §11.2 sharpened: every
representative other than 1 breaks the printed encoding, and the sign is wrong
even then. Richert Theorem 11.3, its chapter note and the 1971 Mémoire Theorem
3 read at page image; the Dover OCR index re-fetched. Cross-codebase M column
agreement extended from one j to all 23 shared j (5.4e-12). Tooling: embed.js
--check re-runs the recorded invocation; its two 2^38 census reruns were killed
after the static verdict passed; no artifact changed.`

**9.9 `research/qc/embed.js` header or `research/SCRIPTS.md` (documentation
only).** Add one line: `--check verifies the static hashes and then RE-RUNS the
recorded invocation with its recorded environment (workers included); for a
census-scale script the re-run is the census. Read the static verdict and stop
the process, or use node research/qc.js embeds for the static check alone.`

## 10. Files, commands, compute

Written: this file; `round-0908/V/V-report.md` (copy); scratch under
`round-0908/V/`: `a2.js` (Euler product), `crt-check.js` and `crt-check.out`,
`kk-v2/main.tex` (arXiv e-print), `kk_v2.txt`, `richert.txt`, `msmf39.pdf/.txt`,
`izv_eng.pdf/.txt`, `gb.html`, `erdos687.html`, `Erdos4Tilted.lean`,
`TiltedMaxima.lean`, `TiltedScale.lean`, `lean/` (405 files), `dotted.pdf`,
`b007053.txt`, `img/` (seven page renders). Nothing in the repository was
edited besides this report.

Compute: `a2.js` about 20 s; `crt-check.js` under 5 s; JSON recomputations
under 1 s each; the two `embed.js --check` reruns consumed about 7 and 10
minutes of wall on 5 and 7 processes before being killed, with no retained
output. No census was completed or extended.

`crt-check.js`, condensed (BigInt arithmetic; `crt2` solves x = r1 (m1),
x = r2 (m2) by extended Euclid): for each p <= z set Pp = P(z)/p and Qp =
crt2(Pp mod p, p, Pp - 1, Pp); for n = 1..X and each r in Omega_p (reduced to
[0, p-1]) multiply the printed factor Pp*n + r*Qp into m1 and the repaired
factor Pp*n + r'*Qp into m2 with r' = crt2(r, p, 1, Pp); record n if gcd(m1,
P(z)) = 1, respectively gcd(m2, P(z)) = 1; compare the two recorded sets with
{n : n mod p not in Omega_p for all p} and {n : -n mod p not in Omega_p for all
p}; for every squarefree d | P(z) count #{n <= X : d | m(n)} under both
encodings and flag |count - g(d)X/d| > g(d).

## 11. Next move

One justified next move: a reader with the physical 1974 book quotes p. 68
(Theorem 2.2, both clauses, the constant label and the superscripts) and p. 69
(the reduction to z = X^{1/A}) verbatim; that closes ASSUMED item 1 and the
"conditional" qualifier on ranked claim 1 for both Theorems A and B. Until then
the record should keep the qualifier and should not describe the identification
as a reading of the 1974 page. No other item in the six rows has an open
mathematical question; the corrections in section 9 are precision and wording.
