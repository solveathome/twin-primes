# Review: does Theorem B of paper/kk-lower-bound.md need section 6.2?

Read-only review, 2026-09-07. No repository file was edited. Sources read at
source: arXiv:2302.00459v2 (`scratchpad/kk/kk.pdf`, md5
`b5d7d2a23ffd902415057adebfe430b1`, matching the manuscript's recorded artifact,
pp. 3 to 4 via `pdftotext -layout`) and Richert, *Lectures on Sieve Methods*,
Tata 1976 (`scratchpad/kk/richert.pdf`, md5 `d2915a3eca4436a760dfaf50e1a1c335`,
via the existing `richert.txt` extraction, Chapter 11 pp. 125 to 128 and the
chapter notes p. 142). Caveat on both: text extraction, not page images. The
project's own record (CHANGELOG 3425 to 3428) says a `pdftotext` linearisation
once nearly produced a false finding against this same paper. Every quotation
below from the two PDFs carries that caveat. Halberstam and Richert 1974 was
not read; nothing below claims to know its page.

## Verdict, first

**(a). Section 6.2 can be demoted to a remark, and Theorem B consumes
Corollary 1 directly at z = sqrt(y).** The theorem consumed has no support
parameter and no remainder sum; every hypothesis it prints is discharged for
the manuscript's sequence at z = sqrt(y) with no size restriction on d; the
step uses only the upper-bound direction; and the manuscript's own ledger
(sections 6.3 and 6.4) already computes at z = sqrt(y), not at z = xi, so the
"repair" of 6.2 is never carried through the argument as written. The
"kappa = 4 load-bearing, margin one sieve dimension wide" claim of 11.2 is a
statement about a different theorem (a Selberg-form bound with an explicit
remainder sum) that the second adversarial pass introduced without the source
PDF, and it is not correct even inside that theorem's frame (section 3 below).

Residual that keeps this from being a clean "proven" demotion: the chain is
manuscript -> Corollary 1 (printed, refereed) -> Lemma 1 (printed, refereed)
-> "[5, Theorem 2.2]" (cited, unread here). The demotion needs only the first
two links, which are read. If a reader with the 1974 text found Theorem 2.2
printed in a remainder-sum form, that would be a defect in Kalmynin and
Konyagin's citation inside a refereed paper, and by the manuscript's own
custody rule at lines 865 to 868 it would land on Theorem A exactly as it
lands on Theorem B. The manuscript currently applies that rule to A and not to
B with no stated reason, and the sieve step of B consumes the same printed
statement in the same way.

## 1. What the manuscript's Theorem B step actually needs

Line 446 to 449:

> `R \le S(m, \Omega) + O(\sqrt{y}) + 2\Psi(m+2, z_1)`, where
> `S(X, \Omega) = \#\{n \le X : n \bmod p \notin \Omega_p \ \forall p \le z\}`

with X = m (line 298) and z = sqrt(y) (line 317: "The sieve sets fed to the
fundamental lemma at sifting level z = sqrt(y)"). What is needed is an upper
bound for S(m, Omega) of size O(m V(sqrt y)), consumed at lines 552 to 553 and
559:

> `S(m, \Omega) \ll m \prod_{p \le \sqrt{y}}(1 - g(p)/p) \ll A^4 y/(B \ln y)`
> ... "taking B large against A gives S(m, Omega) <= y/(4 ln y)."

That is exactly the statement of Corollary 1 with X = m, z = sqrt(y).

## 2. Lemma 1 and Corollary 1 as printed, and each hypothesis for this sequence

Lemma 1, arXiv v2 p. 3 to 4, extracted text (`kk-p3-4.txt` lines 64 to 84):

> Suppose that kappa > 0, z >= 2. Assume that {a_n} is a sequence of
> non-negative real numbers such that for all d | P(z) we have
> sum_{n = 0 (mod d)} a_n = g(d) X/d + r_d, where g(d) is a multiplicative
> function with g(p) <= kappa, g(p) < p for all primes p, |r_d| <= g(d) and
> z << X. Then we have S(a, z) = sum_{(n, P(z)) = 1} a_n <<_kappa X V(z),
> where V(z) = prod_{p <= z}(1 - g(p)/p).
> Proof. This is a version of the fundamental lemma of sieve theory. See, for
> example, [5, Theorem 2.2]

Corollary 1, p. 4 (lines 88 to 110), matches the manuscript's line 459 to 462
quotation word for word from "Suppose". Its printed proof encodes "n avoids
every Omega_p" into "(m, P(z)) = 1" by a CRT change of variable and ends
"Conditions of Lemma 1 also clearly hold." So the manuscript, consuming
Corollary 1, has to discharge only: g multiplicative, g(p) = |Omega_p| <=
kappa, g(p) < p for all p, z << X. The |r_d| <= g(d) condition is discharged
inside the corollary's own proof. It is checked here anyway, as the task asks.

There is no support parameter xi, no remainder sum, and no restriction on d
beyond d | P(z) anywhere in Lemma 1 or Corollary 1. Confirmed at the extracted
text.

Hypothesis by hypothesis for the manuscript's Omega_p (lines 319 to 321 and
307 to 311; Omega_p is Omega^I_p union Omega^III_p, Omega^II empty):

| hypothesis | manuscript's discharge | checked here | calibration |
|---|---|---|---|
| g multiplicative | not stated explicitly; g(d) := prod_{p \mid d} g(p) on squarefree d is the definition Lemma 1 intends and Corollary 1's proof uses | trivially satisfiable; worth one clause in 6.1 | proven |
| g(p) <= kappa | line 474 to 475: "g(p) = \|Omega_p\| <= 4 everywhere, with 4 attained only on band 2, so kappa = 4" | g = 1 at p = 2 ({0, -2} mod 2 = {0}); g = 2 at p = 3 ({0, 1}); g = 2 on band 1 for p >= 5; g = 4 on band 2 (z_0, z_1], since {0, -2} and {1, -1} are disjoint mod p for p not dividing Res = -3, line 342. kappa = 4 is correct as a sup. **Any kappa >= 4 is also a valid hypothesis**; kappa enters Lemma 1 only through <<_kappa | proven |
| g(p) < p for all p | line 475 to 478: fails only at p = 2, 3 if they carried a band-2 count; they sit in band 1 because z_0 > 3 (H1, line 614) | confirmed: g(2) = 1 < 2, g(3) = 2 < 3, g(p) <= 4 < 5 <= p otherwise | proven, conditional on H1 |
| \|r_d\| <= g(d) for every d \mid P(z) | discharged inside Corollary 1's proof ("clearly hold") | Direct check: for squarefree d, the n mod d with n mod p in Omega_p for every p \mid d form, by CRT, exactly g(d) = prod g(p) residue classes mod d. Each class a (1 <= a <= d) contains floor((X - a)/d) + 1 integers n in [1, X], which lies in [X/d - 1, X/d + 1]. Summing over g(d) classes: #\{n <= X : n mod p in Omega_p for all p \mid d\} = g(d) X/d + r_d with \|r_d\| <= g(d). **This holds for every squarefree d, with no restriction on the size of d**; d > X is allowed and gives \|r_d\| <= g(d) still. This is the (R) hypothesis of Richert 11.3 in the same form | proven |
| z << X | line 478: "Finally z = sqrt(y) << m" | m / sqrt(y) = sqrt(y) (ln y)^3 (lnlnln y)^2 / (B (lnln y)^4) -> infinity for fixed B; so z <= X with constant 1 for all y >= some y_1(B), and at y = 10^{134.1} the ratio is about 10^67 times a log factor over B. Not one of the six H-conditions in section 8's table (lines 612 to 619); it is slack by a wide margin but should be listed if section 8 claims to list "every hypothesis" | proven |

So Corollary 1 applies at z = sqrt(y), X = m, giving S(m, Omega) <<_4 m
V(sqrt y). Nothing else is required.

On the implied constant. Line 466 says it depends "on kappa alone", quoting
Kalmynin and Konyagin's <<_kappa. Richert's Theorem 11.3 makes it depend on
A (the exponent in z <= X^A), A_1 from (Omega_1), A_2 from (Omega_2(kappa))
and kappa. For this sequence: exponent A = 1 (z = sqrt(y) <= m); (Omega_1) is
g(p)/p <= 1 - 1/A_1, met with A_1 = 5 (worst case 4/5 at p >= 5, 1/2 at
p = 2, 2/3 at p = 3); (Omega_2(kappa)) is sum_{w <= p < z} g(p) ln p / p <=
kappa ln(z/w) + A_2, met at kappa = 4 with an absolute A_2 by Mertens, or
replaced by Richert's (Omega_0) g(p) <= A_0 = 4 (line 6772 of `richert.txt`:
"(Omega_0) implies (Omega_2(kappa))"). None of these depends on the
manuscript's A or B. So the step at line 557 to 559, "since the implied
constant depends on kappa alone and not on A or B, taking B large against A",
survives under either printed form of the constant. Calibration: derived here
from Richert's stated hypotheses; the derivation is three lines and is
included above; not adversarially checked.

## 3. Is the 6.2 support restriction needed? What is lost or gained?

**Not needed.** Lemma 1 as printed is the Brun-form bound: pointwise
|r_d| <= g(d) for every d | P(z), conclusion S << X V(z), no xi. Richert's
Theorem 11.3 (`richert.txt` lines 6755 to 6768), which his chapter notes
(line 7414) identify as "cf. l.c. Theorem 2.2", has exactly that shape:

> (R) |R_d| <= omega(d) if mu(d) != 0 and (d, p-bar) = 1. (11.9)
> Theorem 11.3. (Omega_1), (Omega_2(kappa)), (R): For any A > 0
> S(A, p, z) << X prod_{p < z}(1 - omega(p)/p) if z <= X^A, (11.10)
> where the <<-constant depends at most on A, A_1, A_2 and kappa.
> In the literature, usually, the phrase 'by Brun's sieve...' refers to the
> statement (11.10).

and the chapter note adds (line 7414 to 7416): "Actually, Theorem 11.3 holds
for z >= X^A also when the restriction in the product, p < z, is replaced by
p < X." Richert derives 11.3 "from (the second inequality of) Theorem 9.1 and
(11.5)" (line 6757 to 6758), that is, from the Selberg sieve with the
remainder handled internally under (R). In other words, the manuscript's 6.2
manoeuvre (shrink the support to a power of log below sqrt(X), then note the
product only changes by a bounded factor) is what the proof of the theorem
consumed does on the reader's behalf, and the resulting factor is absorbed
into the constant. Doing it again outside the theorem is not wrong; it is
redundant.

The remainder that 6.2 analyses, `sum_{d <= xi^2} 3^{omega(d)} |r_d|`, is the
remainder of Richert's Theorem 11.1 (Halberstam and Richert Theorem 4.1, the
Selberg upper bound; `richert.txt` lines 6735 to 6740):

> Theorem 11.1. (Omega_1), (Omega_2(kappa)): S(A, p, z) << X W(z) +
> sum_{d <= z^2, (d, p-bar) = 1} mu^2(d) 3^{nu(d)} |R_d|. (11.7)

That is a different theorem, with a different hypothesis set (no (R)), and
the manuscript neither cites nor needs it. Under |R_d| <= g(d) <= kappa^{nu(d)}
the sum is << z^2 (ln z)^{3 kappa - 1}, which is where 6.2's exponent 11 comes
from. So 6.2's arithmetic is internally correct for Theorem 11.1 and
irrelevant to Lemma 1.

**Loss or gain at z = sqrt(y) versus z = xi.** None that matters, in either
direction. V(sqrt y) / V(xi) = prod_{xi < p <= sqrt y}(1 - g(p)/p), and on
(xi, sqrt y] every g(p) = 2 (band 2 ends at z_1 << xi by H3), so the ratio is
(ln xi / ln sqrt(y))^2 (1 + o(1)) = (1 - 14 ln ln y / ln y)^2 (1 + o(1)) -> 1.
The manuscript's line 495 says the same with exponent kappa = 4; the exact
exponent on this interval is 2, but either way the factor is 1 + o(1) and it
is the direction that helps (V(sqrt y) < V(xi)), so sieving at sqrt(y) gives a
marginally smaller bound. The threshold table of section 8 does not depend on
xi at all (H1 to H6, lines 614 to 619, contain no xi), so nothing in section 8
moves.

**The internal inconsistency this exposes.** Line 501 to 502 says the repair is
to "sieve at z = xi", but lines 512 to 515 (the ledger, sum over p <= sqrt y),
line 517 ("Omega^I charged over all p <= sqrt y"), and lines 550 to 553
(product over p <= sqrt y) all compute at z = sqrt(y). The manuscript already
runs Theorem B exactly as it would under (a); 6.2 is a paragraph that is never
consumed downstream. That is harmless numerically and it is a defect in the
exposition: as written, the proof claims to use one sifting level and computes
with another.

**Is "kappa = 4 load-bearing, margin one dimension wide" about the theorem
consumed?** No. Under Lemma 1, kappa enters only <<_kappa, and kappa = 6
(the source's own value) is a weaker hypothesis than kappa = 4 that the
sequence satisfies trivially. The claim at lines 498 to 500 and 832 to 835 is a
claim about Theorem 11.1's remainder. And even in that frame it is overstated:
at general kappa with xi = sqrt(y)/(ln y)^C the remainder is y (ln y)^{3 kappa
- 1 - 2C}, which sits below the main term y/ln y as soon as C > 3 kappa / 2, so
kappa = 6 is repaired by C = 9 (remainder y (ln y)^{-1} against y/(B ln y)
needs C > 9; take C = 10) with the main term still losing a factor -> 1. The
specific support (6.2) fails at kappa = 6; the method does not. "One sieve
dimension wide" is a property of the constant 7 chosen in (6.2), not of any
theorem. Calibration: arithmetic checked here by hand; not by script.

## 4. Direction: only the upper bound is used

Every consumer of the sieve bound uses it as an upper bound on a count that
must be shown small:

- line 446, (6.1): `R <= S(m, Omega) + O(sqrt y) + 2 Psi(m+2, z_1)`, an upper
  bound on R (Proposition 3 says "at least one of the following holds", which
  is a containment of the unkilled set in the union of three sets);
- line 552 to 559: `S(m, Omega) << ... <= y/(4 ln y)`, upper bound;
- line 584: `R <= y/(4 ln y) + o(y/ln y) <= y/(3 ln y)`, upper bound;
- line 597 to 600: band 3 needs `pi(y) - pi(y/2) > y/(3 ln y) >= R`, so the
  survivors can be injected into the primes of (y/2, y]. Upper bound on R
  against a lower bound on the prime count (Rosser and Schoenfeld), which is
  a separate published statement.

No step of Theorem B needs a lower bound on S(m, Omega) or an asymptotic for
it. The same is true of Theorem A (line 686: `#V <= C_1 m V(z)`). Lemma 1's
one-sided conclusion is exactly the direction consumed. Confirmed by reading
sections 5 to 7 and 9 in full.

## 5. The exact lines that would change under (a)

In `paper/kk-lower-bound.md`:

- **Lines 478 to 481**, "A smaller kappa than the source's own kappa = 6 is a
  tightening rather than a weakening, since kappa enters only the implied
  constant, and §6.2 shows it does more than tighten." Delete the final
  clause; keep "kappa enters only the implied constant". Add one clause
  defining g(d) = prod_{p | d} g(p) on squarefree d, and one sentence noting
  that the CRT remainder |r_d| <= g(d) holds for every d | P(z) (section 2
  table above), which is what Corollary 1's proof calls "clearly".
- **Lines 483 to 508** (all of §6.2). Demote to a remark of roughly this
  content: "Lemma 1 is the Brun-form bound under the pointwise hypothesis
  |r_d| <= g(d) (Richert, Tata 1976, Theorem 11.3, cross-referenced by its
  author to Halberstam and Richert Theorem 2.2), and carries no support
  parameter. A Selberg-form bound (Richert Theorem 11.1) would instead carry
  the remainder sum_{d <= xi^2} 3^{omega(d)} |r_d| << xi^2 (ln xi)^{3 kappa
  - 1} and would need xi = sqrt(y)/(ln y)^C with C > 3 kappa / 2, sieving at
  z = xi, at a cost of 1 + o(1) in V; that route is available and is not the
  one consumed." The riders at 497 to 502 go, or survive inside the remark
  with "load-bearing" removed.
- **Line 317**, "at sifting level z = sqrt(y)": unchanged, and now consistent
  with 512 to 553.
- **Lines 824 to 835** (§11.2 first paragraph). Replace "The Selberg support
  correction of §6.2 uses ... The exponent 3 kappa - 1 = 11 and the choice
  (6.2) are load-bearing, and a different hypothesis on xi against z in the
  printed theorem would need a different repair. The direction of the risk
  is known: at kappa = 6 that support fails, so the margin is one sieve
  dimension wide." with a statement that the residual is only the unread 1974
  page behind a printed, refereed Lemma 1, and that it is shared with Theorem
  A. The 2026-09-07 rider at 837 to 863 becomes the body of §11.2; its last
  two sentences ("§6.2 has not been rewritten on its strength. A reader with
  the 1974 text should check ...") become "§6.2 is retained as a remark".
- **Lines 865 to 868**: the paragraph granting Theorem A "published theorem
  consumed as a theorem" status applies verbatim to Theorem B's sieve step;
  say so, and confine Theorem B's INFERRED grade (line 256) to the
  trichotomy and the ledger, which are the parts that re-derive the source's
  proof.
- **Line 915** (§11.4 table): "Halberstam and Richert Thm 2.2's hypotheses |
  a xi-versus-z condition incompatible with (6.2) | no." Replace the
  falsifier with "Theorem 2.2 printed in 1974 in a form other than the
  Brun-type bound under (R)" and the status with "Richert Tata Theorem 11.3
  read at extracted text 2026-09-07; 1974 page unread; shared with Theorem
  A".
- **Line 932**: "or at §11.2, which costs the support repair and needs the
  sieve step rebuilt" becomes "or at §11.2, which would be a defect in a
  refereed citation and would reach Theorem A equally".
- **Line 641** ("the fundamental lemma's constant at kappa = 4"): unchanged.
- **Section 8 table, lines 612 to 619**: optionally add the row "z << X,
  sqrt(y) <= m" with the inequality `ln B + 4 ln lnln L - 3 ln L - 2 ln lnlnL
  < L/2`, marked slack; it is currently the one hypothesis of §6.1 the table
  omits.
- **Line 1069** (Appendix A row): the provenance "second adversarial pass"
  stays, with the note that the pass "had no K–K PDF" (CHANGELOG 2948) and
  priced a Selberg-form remainder that Lemma 1 does not carry.

Outside the manuscript, the same text lives at
`research/two-class-lower-bounds.md` lines 362 to 365,
`paper/proposals/prop-kk-lower-bound.md` lines 146 and 161, and
`paper/proposals/draft-kk-lower-bound.md` lines 267 to 275 and 482 to 485.
`research/history/staging/verify-kk-substitution.md` line 195 and CHANGELOG
2934 and 3416 are history and stay as written.

## 6. Provenance of the 6.2 claim, for the record

CHANGELOG 2927 to 2950: the second adversarial pass "found kappa = 4
load-bearing in the Selberg remainder", and "the second checker had no K–K PDF
... and could not check Halberstam–Richert Thm 2.2's xi-vs-z hypothesis at
source". CHANGELOG 3415 to 3417: "The §3a check tests z << X but not the
Selberg support, and a naive xi = sqrt(y) leaves a remainder (ln y)^12 above
the main term." The "xi-vs-z hypothesis" was hypothesised by a checker
working from the general shape of upper-bound sieves without the paper in
hand; it was never read from either source. That is the same failure mode the
project's campaign lessons name (a claimed hypothesis must be read, not
inferred from the theorem's family), running in the conservative direction:
it added a constraint the theorem does not impose. The manuscript's line 505
to 507 already says as much ("from the standard theory of upper-bound sieves
rather than from the printed hypotheses").

## 7. What would falsify (a), and whether it has run

- Kalmynin and Konyagin's Lemma 1 printed with a remainder sum or a support
  parameter: read at extracted text of the PDF of record, none present. Not
  read at page image in this pass.
- Corollary 1 needing a hypothesis beyond Lemma 1's: read; it needs only
  "Omega_p contains g(p) elements" for p <= z.
- The CRT remainder failing |r_d| <= g(d) for large d: checked by the
  two-line count in section 2; it cannot fail.
- A Theorem B step using the lower-bound direction or an asymptotic: read
  sections 5 to 7 in full; none.
- Halberstam and Richert 1974 Theorem 2.2 printed with a remainder sum and
  without (R): not checked, book unreachable. If true it is a defect in a
  refereed citation and reaches Theorem A equally; it does not reinstate 6.2
  as the manuscript's responsibility rather than the source's, and Richert's
  own Theorem 11.3 (a proved statement in a book, proof not re-derived here)
  is available as the citation in its place.
