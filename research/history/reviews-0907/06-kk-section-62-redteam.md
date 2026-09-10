# Red team of verdict (a): "§6.2 of paper/kk-lower-bound.md can be demoted to a remark"

Read-only, 2026-09-07. No repository file edited. Sources: the reviewer's report
(`kk-62-review.md`, read in full); `paper/kk-lower-bound.md` lines 280 to 700,
815 to 940, 1060 to 1075 (line numbers below refer to that file unless stated);
`scratchpad/kk/kk.txt` lines 165 to 345 (pdftotext of arXiv:2302.00459v2) and
`scratchpad/kk/kk.html` (arXiv's rendering of the LaTeX source, used for one
formula check); `scratchpad/kk/richert.txt` lines 5540 to 5630 (Theorem 9.1),
6670 to 6830 (Chapter 11), 7400 to 7425 (chapter notes);
`research/history/CHANGELOG.md` 2925 to 2952 and 3410 to 3430;
`research/attack-kk-substitution.js` (grep only). Text extraction, not page
images, for both PDFs; the arXiv HTML is a rendering of the TeX source, which
is stronger evidence than pdftotext for formula layout but is still not the
PDF of record. Halberstam and Richert 1974 not read. All hand arithmetic is
shown; the four numerical checks below were also run in a throwaway Python
session (not a repo script, not embedded).

## Findings

### 1. Lemma 1 against a remainder-sum fundamental lemma: the hidden support reduction exists, and it lives inside the cited theorem. CONFIRMS.

Richert derives Theorem 11.3 "from (the second inequality of) Theorem 9.1 and
(11.5)" (`richert.txt` 6757 to 6758). Theorem 9.1 (lines 5567 to 5590) is the
Selberg bound with remainder `sum_{d < z^2, d | P(z)} mu^2(d) 3^{nu(d)} |R_d|`,
where the support equals the sifting parameter (Richert calls this "the dual
role of z", line 6817 to 6819). Under (R), `|R_d| <= omega(d)`, and under
(Omega_2(kappa)) the remainder is `<< z^2 (log z)^{3 kappa - 1}`. For
`z <= X^A` with `A > 1/2` this is not `<< X W(z)`. So Theorem 11.3's
conclusion for every `A > 0` cannot come from Theorem 9.1 at the given `z`; it
needs

    S(A, p, z) <= S(A, p, z')   for z' < z   (a_n >= 0, fewer primes sifted),
    W(z') / W(z) = prod_{z' <= p < z} (1 - omega(p)/p)^{-1} << (log z / log z')^kappa

with `z' = X^{1/2} / (log X)^C` or `X^{1/s_0}`, the second line by partial
summation from (Omega_2(kappa)) (this is Richert's (11.5) machinery). With
`z <= X^A` the ratio `log z / log z'` is `<= 2A + o(1)`, bounded, and the bound
depends on `A`. That is exactly the trace 11.3 carries: "the <<-constant
depends at most on A, A_1, A_2 and kappa" (line 6763). The chapter note "holds
for z >= X^A also when p < z is replaced by p < X" (line 7414 to 7416) is the
same reduction pushed to `z' = X`. So the monotonicity argument is what makes
11.3 hold for all `z <= X^A`, and the `A`-dependence of the constant is where
the cost of §6.2's manoeuvre is booked in the printed theorem. Calibration:
derived here from the printed hypotheses and the printed derivation route;
Richert's text says "one readily obtains" and does not print the reduction.

The arithmetic the task asks for, in the Friedlander and Iwaniec or
Koukoulopoulos form `S = X V(z)(1 + O(e^{-s})) + O(sum_{d <= D} |r_d|)`,
`D = z^s`. With `|r_d| <= g(d) <= kappa^{omega(d)}` on squarefree `d`,
`sum_{d <= D} g(d) << D (log D)^{kappa - 1}`. At the manuscript's parameters,
`X V(sqrt y) ~ A^4 y / (B ln y)` (line 552 to 553), so `D (log D)^3 << y / ln y`
forces `D << y / (ln y)^4`, and

    s = log D / log sqrt(y) = (ln y - 4 lnln y + O(lnlnln y)) / ((1/2) ln y) -> 2.

At `ln y = 308.67`, `A = 4.05`, `B = 10`: `ln(XV) = 306.23`, `ln D = 289.06`,
`s = 1.873`. So a level `D = z^s` with `s` bounded below (by 1.87 at `y_0`,
tending to 2) is available at `z = sqrt(y)`. Whether that `s` is large enough
for a given printed fundamental lemma depends on that lemma's `s_0` (the
Friedlander and Iwaniec Lemma 6.3 form wants `s` of order `9 kappa`; I have not
checked the exact constant at source). If `s_0 > 2`, one reduces to
`z' = D^{1/s_0} = X^{1/s_0 - o(1)}`, and `V(z') / V(z) -> (s_0 / 2)^kappa`, a
constant depending on `kappa` only. For an upper bound the factor
`(1 + O(e^{-s}))` only has to be bounded, which it is for any `s >= 1`. Either
way the Brun-form conclusion `S <<_kappa X V(z)` at `z = sqrt(y)` follows,
with the constant absorbing the reduction. Since Lemma 1's hypotheses imply
Richert's (Omega_1) with `A_1 = kappa + 1` (for `p <= kappa`, `g(p)/p <=
1 - 1/p <= 1 - 1/kappa`; for `p > kappa`, `g(p)/p <= kappa/(kappa+1)`),
(Omega_0) with `A_0 = kappa` hence (Omega_2(kappa)) with `A_2 = A_2(kappa)`,
and (R), and `z << X` is `z <= X^A` with `A = 1 + o(1)`, Lemma 1 is a correct
specialisation of 11.3 with a `kappa`-only constant. Nothing here is a hidden
hypothesis on the manuscript.

Does the manuscript need to say it? Not for correctness: the reduction is
inside the proof of the theorem it cites, and the theorem's statement is what
it consumes. A reader who knows Theorem 9.1 will ask the question, so the
demotion remark is better if it says in one sentence that the support
reduction is internal to Theorem 11.3 and shows up as the `A`-dependence of its
constant. This is wording, not a change of verdict. Direction: CONFIRMS.

### 2. Lines 501 to 502 versus 512 to 553: the reviewer's reading is correct. CONFIRMS.

Line 501 to 502: "The repair is free: sieve at `z = xi`, which changes `V(z)`
by `1 + o(1)`." Line 512 to 513: `sum_{p <= sqrt{y}} g(p)/p = sum_{5 <= p <=
sqrt{y}} 2/p + ...`. Line 517: "`Omega^I` charged over all `p <= sqrt{y}`".
Line 552: `S(m, Omega) << m prod_{p <= sqrt{y}} (1 - g(p)/p)`. Line 317: "at
sifting level `z = sqrt{y}`". Line 478: "`z = sqrt{y} << m`". Proposition 3(c)
at line 368: "for every `p <= sqrt{y}`". Every computation and every
hypothesis discharge is at `sqrt(y)`; `xi` appears only in §6.2 (lines 485 to
502), §11.2 (831 to 854), the 11.4 table row (915) and the Appendix A row
(1069). Two additional facts the reviewer did not state, both pointing the
same way:

- The source itself runs at `z = sqrt(y)` with `kappa = 3 deg f = 6`
  (`kk.txt` 314 to 320: "Corollary is applicable for kappa = 3d and we get
  `S(m, Omega) << m prod_{p <= sqrt y}(1 - g(p)/p)`"). Under the Selberg-form
  reading of Lemma 1 the source's own refereed step would carry a remainder
  `y (ln y)^{17}` against `y / ln y`. The refereed paper is therefore itself
  evidence that Lemma 1 is the Brun-form bound.
- If the `z := xi` repair were carried through, H3 would have to read
  `z_1 < xi`, not `z_1 < sqrt(y)` (line 616), and the `O(sqrt y)` in (6.1)
  would become `O(xi)`. Neither was changed. The repair was never executed
  anywhere in §§5 to 8.

### 3. `C > 3 kappa / 2`: arithmetic verified. CONFIRMS, with two wording defects noted.

Remainder at `xi = sqrt(y) / (ln y)^C`: `xi^2 (ln xi)^{3 kappa - 1} = y (ln
y)^{-2C} ((1/2 - o(1)) ln y)^{3 kappa - 1} ~ y (ln y)^{3 kappa - 1 - 2C}`.
Main term `y / (B ln y) ~ y (ln y)^{-1}`. Remainder below main term iff
`3 kappa - 1 - 2C < -1` iff `C > 3 kappa / 2`.

| kappa | C | exponent `3 kappa - 1 - 2C` | below `-1`? |
|---|---|---|---|
| 4 | 7 | 11 - 14 = -3 | yes (matches line 493, "`y (ln y)^{-3}`") |
| 6 | 9 | 17 - 18 = -1 | no, equal to the main term's exponent |
| 6 | 10 | 17 - 20 = -3 | yes |

So the reviewer's conclusion (`kappa = 6` is repaired by a larger `C`; "one
sieve dimension wide" is a property of the constant 7, not of a theorem) is
right. The reviewer's sentence "kappa = 6 is repaired by C = 9 (remainder
`y (ln y)^{-1}` against `y/(B ln y)` needs C > 9; take C = 10)" is
self-correcting but garbled: `C = 9` does not repair it, `C = 10` does. The
underlying mean-value bound `sum_{d <= D} mu^2(d) (3g)(d) << D (log D)^{3
kappa - 1}` is legitimate for this `g` because `g(p) <= 4` pointwise gives
(Omega_2(4)) with an absolute `A_2`. Separately, the manuscript's line 494
writes the main-term loss as `(1 - 2K lnln y / ln y)^kappa` with `K` never
defined (it is the `C = 7` of (6.2)); if §6.2 survives as a remark that `K`
should become `C`.

### 4. `y_0 = 10^{134.1}` and H1 to H6 do not depend on `xi`. CONFIRMS.

The six inequalities (lines 612 to 619) contain no `xi`. The bisection script
`research/attack-kk-substitution.js` codes H3 as `z1 < sqrt(y)` (lines 510,
519) and has no `xi`, no `(ln y)^7`, no support parameter (grep for `xi`,
`ln7`, `pow(.*7)` returns nothing relevant). Line 641's "the fundamental
lemma's constant at `kappa = 4`" is an implied constant set to 1 and carries no
level. So demoting §6.2 moves nothing in §§7 to 9.

The one place `xi` could enter is H3 if the manuscript had actually sieved at
`xi`: then H3 would read `z_1 < xi`, i.e. `lnlnln y . ln y / (A lnln y) <
(1/2) ln y - 7 lnln y`. At `L = 308.67`, `A = 4.05`: `ln z_1 = 1.746 x 308.67
/ (4.05 x 5.732) = 23.22`, `ln xi = 154.34 - 40.12 = 114.21`. Slack by a factor
of about 5 in the logarithm, and H2 binds at every `A`, so `y_0` is unchanged
under either reading. The absence of this modified H3 from the table is one
more sign §6.2 was never carried through (finding 2).

### 5. Nothing in Theorem B consumes the Selberg form. CONFIRMS.

The weight `3^{omega(d)}` appears only in §6.2 (line 486) and its echoes (851,
915, 1069). Theorem B uses: an upper bound on `S(m, Omega)` (line 552, 559),
an upper bound on `Psi` (§6.5, Hildebrand), an upper bound on `R` (584), and a
lower bound on `pi(y) - pi(y/2)` from Rosser and Schoenfeld (§7), which is not
a sieve statement. No lower-bound sieve, no asymptotic, no level of
distribution feeds H2 to H6. Theorem A (§9) is the same shape at `kappa = 2`.

### 6. The printed proof of Corollary 1 has a gap as extracted; this bears on the reviewer's custody wording, not on the verdict. WEAKENS (wording only).

The reviewer (its section 2) describes Corollary 1's proof as "a CRT change of
variable" and treats the refereed proof as sound. As printed (`kk.txt` 199 to
217; confirmed at the arXiv HTML rendering of the TeX:
`\prod_{p\le z}\prod_{r\in\Omega_p}(P(z;p)n + rQ(z;p))`), the encoding is a
double product over `p <= z` and `r in Omega_p`. Mod `q != p`, `q <= z`:
`P(z;p) = 0` and `Q(z;p) = -1`, so the factor is `= -r (mod q)`. If `0 in
Omega_p` for any `p` (true for the manuscript's `Omega^I_p = {0, -2}` at every
`p`, and for the source's own `Omega^I_p` whenever a linear factor has root 0),
the factor `P(z;p) n` is divisible by every `q <= z`, `q != p`, so `(m, P(z))
= 1` holds for no `n`, and the printed "iff" fails. Numerical check at `z = 5`,
`Omega_2 = {0}`, `Omega_3 = {0,1}`, `Omega_5 = {0,3}`, `n <= 30`: 3 values of
`n` avoid `Omega`; the printed encoding gives 0 values of `n` with `(m, 30) =
1`. Choosing representatives `r' = r (mod p)`, `r' = 1 (mod P(z;p))` repairs
it, and then `(m, P(z)) = 1` iff `n` avoids `-Omega_p` for all `p` (verified
pointwise in the same check), which has the same `g(p)` and so the same bound.
So Corollary 1's statement is true and standard, the repair is one line, and
the printed proof of the corollary is defective at the representative choice.
Calibration: read at pdftotext and at the arXiv TeX rendering, not at the page
image; the formula is unambiguous in the TeX.

Consequence for the verdict: none. The manuscript consumes the corollary's
statement, and it is the standard Brun bound for sifting `g(p)` classes mod
`p` (Richert 11.3 after the same CRT shift). Consequence for the review's
wording: "printed, refereed" custody of Corollary 1 should be stated as
custody of the statement, with the proof gap recorded in §11.2 as a residual
on the source rather than on the manuscript. It lands on Theorem A exactly as
on Theorem B, which is the reviewer's own symmetry point.

### 7. The reviewer's proposed §8 row has a formula error. WEAKENS (section 5 of the review only).

Review line 250 to 252 proposes the row "`ln B + 4 ln lnln L - 3 ln L - 2 ln
lnlnL < L/2`". With `m = y L^3 (lnln L)^2 / (B (ln L)^4)` (line 298, `ell ell
= ln L`, `ell ell ell = lnln L`), `ln m >= L/2` reads

    ln B + 4 ln ln L - 3 ln L - 2 ln ln ln L < L/2.

The review has one `ln` too many in both the `ln ln L` and the `ln ln ln L`
terms. If the row is added to the manuscript it must be in the corrected form.
Slackness is unaffected: at `L = 308.67`, `B = 10` the left side is `2.30 +
6.99 - 17.20 - 1.11 = -9.02` against `154.34`.

### 8. "band 2 ends at `z_1 << xi` by H3" is a wrong citation. WEAKENS (wording only).

Review line 151. H3 is `z_1 < sqrt(y)` (line 616), not `z_1 < xi`. The
inequality `z_1 < xi` is a separate, slack condition (finding 4: `ln z_1 =
23.2` against `ln xi = 114.2` at `y_0`). The reviewer's `V(sqrt y) / V(xi)`
ratio and its exponent 2 on `(xi, sqrt y]` are right once that inequality is
granted, and the manuscript's own "exponent `kappa`" at line 494 to 495 is the
looser but still correct `1 + o(1)`.

### 9. The Theorem A versus Theorem B asymmetry: the reviewer is right. CONFIRMS.

If Lemma 1 were secretly Selberg-form with remainder `sum_{d <= z^2}
3^{omega(d)} |r_d|`, Theorem A's step 1 (line 686, `kappa = 2`, `z = sqrt(m)`,
`X = m`) would carry a remainder `m (log m)^5` against a main term `m /
(log m)^2` and would need the same `xi = sqrt(m) / (log m)^C`, `C > 3`, repair.
The manuscript grants A "published theorem consumed as a theorem" (lines 865
to 868) and denies B the same for the same step. No reason for the asymmetry
is stated, and I found none.

### 10. The residual is the unread 1974 page, and it does not block (a). CONFIRMS, calibrated.

My recollection of Halberstam and Richert Chapter 2 is that Theorem 2.2 is the
Brun upper bound `S << X W(z)` for `z <= X^A` under (Omega_1), (Omega_2(kappa)),
(R), with the fundamental lemma at Theorem 2.5. That is consistent with
Richert's note "Theorem 11.3: cf. l.c. Theorem 2.2" and with the note's
neighbours (11.1 to 4.1, 11.2 to 5.2, 11.4 to 5.1, which match the chapter
placement of the Selberg results). Recollection is not custody; it is recorded
only as "not inconsistent". Even if the 1974 statement were printed in a
different form, the manuscript consumes Lemma 1 as printed in a refereed
paper, and the reviewer's fallback citation (Richert Tata 11.3, a printed
theorem by the same author) carries the Brun form with no support parameter.
Nothing I can reach makes (a) premature.

### 11. Two things I looked for and did not find. CONFIRMS.

- A `kappa`-uniformity or `p`-range hypothesis in Lemma 1 that the
  manuscript's `g` violates: `g(p) < p` holds at every prime (`g(2) = 1`,
  `g(3) = 2`, `g(p) <= 4 < p` for `p >= 5`), and for `p > z` set `g(p) = 0`.
  (Omega_1) is met with `A_1 = 5` (worst case `4/5` if `p = 5` were in band 2,
  which it is not at any `y >= y_0`; `2/5` otherwise).
- A dependence of Lemma 1's implied constant on the manuscript's `A` or `B`:
  none; Richert's `A` is the exponent in `z <= X^A`, equal to 1 here, and
  `A_1`, `A_2` are functions of `kappa`. The "take `B` large against `A`" step
  at line 557 to 559 survives.

## Verdict

**(a) stands with the following required wording.** (i) The demotion remark
should say that the support reduction §6.2 performs is internal to the proof
of Richert 11.3 / Lemma 1 (Theorem 9.1's remainder at support `z` forces it)
and is booked as the `A`-dependence of that theorem's constant, so it is not
the manuscript's responsibility. (ii) If the "`z << X`" row is added to §8,
use `ln B + 4 ln ln L - 3 ln L - 2 ln ln ln L < L/2`, not the review's
formula. (iii) Do not cite H3 for `z_1 < xi`; it is a separate slack
inequality. (iv) Record in §11.2 that Corollary 1's printed proof, as
extracted, omits the coprime-representative choice and proves the bound for
`-Omega` (same `g`, same bound), a residual on the source's proof shared by
Theorems A and B, not on the statement either consumes. (v) Replace the
undefined `K` at line 494 by `C = 7` if that text survives inside the remark.
