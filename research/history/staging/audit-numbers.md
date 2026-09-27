# Audit: arithmetic, recomputed from scratch (2026-08-17)

<!-- ledger
id: Q-audit-numbers
status: ANSWERED
todo: none
question: Does the corpus's arithmetic survive recomputation from scratch by an independent method?
verdict: The ladder is right: all twelve G2 terms reproduce under a method sharing no code with the one that produced them, 37 of 39 assertions pass in 152 s, and the four errors found are small and none is load-bearing.
-->

Method: `research/audit-numbers.js`, written for this audit and reading no other
repo script, so a shared bug cannot hide. Every value below is either sieved,
constructed, or evaluated in closed form.

```
node --max-old-space-size=16384 research/audit-numbers.js all     # 152 s, 37/39
```

The three that do not pass are the two rounding discrepancies below plus one
deliberate failing assertion recording the 475/476 split. 123 of the 152 seconds
is the 37# term; `ladder` alone reaches 31# in 15 seconds.

The headline: the ladder is right. All twelve terms of G2, including the two that
are ours, reproduce exactly under a method that has nothing in common with the
one that produced them. Four small errors turned up, none of them load-bearing.

---

## Errors found

### research/exponent-control.md §7.2, research/two-class-lower-bounds.md §6
**"the x = 37 outlier, whose local exponent is 4.49".** WRONG TERM. The local
exponents `ln(G2_n/G2_{n-1}) / ln(x_n/x_{n-1})` over the ladder read

```
 2->3  2.7095    7->11 0.7444   17->19 2.9535   23->29 1.0131   31->37 2.3563
 3->5  1.3569   11->13 2.7056   19->23 1.6094   29->31 4.4870
 5->7  2.7232   13->17 1.8358
```

4.487 is the step **29 -> 31**. The step 31 -> 37 reads **2.356**, which is
below the ladder mean of 2.227, so x = 37 is not a local-exponent outlier at all
under any endpoint convention. What x = 37 *is* an outlier in is `c2'`, where it
reads 0.594 against a 0.446-0.500 band for x = 11..31; that reading is correct
and is the one `two-class-lower-bounds.md` §6 uses. The two statements have been
welded together and the exponent half belongs to a different term.

### research/U-FRAME.md §6a
**"the Poisson law's 475 to 633 is the prediction".** OFF BY ONE. The band is
`c2' * m2(41) * lnD(41)` with `m2(41) * lnD(41) = 1065.7`; at `c2'_min = 0.4463`
that is 475.6, quoted as **476** in `two-class-lower-bounds.md` §6 and
`maxgap-law.md` §9. U-FRAME floors where the other two round.

### research/U-FRAME.md §6a
**"The margin against p_n^2 reads 1.11, 1.40, 1.67, 1.04, ...".** WRONG LABEL,
right numbers. Those are `(p_n^2 - p_n)/a(n)`, the Ziller-Morack conjecture form
set up in the sentence before. Against `p_n^2` alone the column would read 1.39,
1.63, 1.83, 1.13. The companion list is correctly labelled: 2.72, 4.03, 2.56 are
`p_{n+1}^2/a(n)` with no subtraction.

### research/two-class-lower-bounds.md §6, research/maxgap-law.md §9
**"about 487" for the x = 37-as-outlier case.** Rounding of a rounding. The
median `c2'` over x = 11..31 is 0.45766, not 0.457, and 0.45766 * 1065.7 = 487.8,
i.e. **488**. The text says "about", so this is cosmetic, but the same paragraph
carries 476, 513 and 633 to the unit.

### research/natal-cap-11-kstar23.js, research/natal-cap-37-at41-march.js
`e^{2gamma}/4 = 0.7930547...`. The first says 0.79306 (correct 5 d.p. is
0.79305), the second's comment says 0.7930550. `natal-cap-35-x-multiplicity.js`
has it right at 0.7930547.

### web/bench/test-kernel.js
Quotes the GLOSSARY G2 ladder as ten terms ending at 258. GLOSSARY has had
twelve since 31# and 37# landed.

---

## Verified, by independent recomputation

**The G2 ladder, all twelve terms, exactly.** 2, 6, 12, 30, 42, 66, 108, 150,
204, 258, 348, 528 at x = 2..37. Terms to 23# by direct construction of the twin
slot set; 29# by streaming its 214,708,725 slots; 31# and 37# by lifting the 29#
cycle. The lift is exact, not a search: by CRT, deleting the two classes
`{0,-2}` mod q from copy j of the Q-cycle is the same as deleting
`{a, a-2}` mod q from the Q-cycle with `a = -jQ mod q`, and j -> a is a
bijection, so `G2(Qq) = max_a (max gap after deleting {a,a-2})`. That inner
maximum falls out of one pass with a longest-compatible-suffix scan. Copy-
boundary joins are settled separately (widest is 114 at 37#, 84 at 31#, both far
below the internal maxima). 37# took 31 passes over 214.7M slots, 123 seconds,
against the 54 minutes the original lattice walk needed over 7.42e12 positions.
The machinery self-tests: lifting the 23# cycle one prime returns 258 and two
primes returns 348.

**A048670, first ten terms**, 2, 4, 6, 10, 14, 22, 26, 34, 40, 46, by direct
sieve to phi(29#) = 1,021,870,080. The G2/h ratio table 2.00, 3.00, 3.00, 3.00,
4.15, 4.41, 5.10, 5.61, 6.00, 8.00 follows and is right in all four files that
carry it.

**The census columns.** D_x, mbar = x#/D_x, lnD, theta(x) - ln mbar = lnD, and
the x'^2/G2 margin column 4.50 ... 3.18, all exact. Every primorial quoted
anywhere in the corpus (210, 2310, 30030, 510510, 9699690, 223092870,
6469693230, 200560490130, 7420738134810, 304250263527210) is correct, and 37# is
7.42e12, not 7.86e15.

**mbar/ln^2 x -> e^{2gamma}/(2 C2) = 2.4026.** Exact W/D gives 2.4195 at
x = 1009, 2.4086 at 10007, 2.4041 at 100003, matching the CHANGELOG digit for
digit. The factor-2 slip is gone from every working file; the only surviving
mention of 1.2013 is inside a correction block in `gate-multiplies.md` §10.

**Constants.** e^{2gamma} = 3.172219 (4 d.p. 3.1722, as the repo has it),
e^{2gamma}/4 = 0.7930547, C2 = 0.6601618 (product to 5e6 plus analytic tail),
1+sqrt(e) = 2.6487, 2(1+sqrt(e)) = 5.2974, and the break-even
2(1+sqrt e)/beta_2 = 1.2417.

**The Zone Postulate census is a 1e11 run.** pi(1e11) = 4,118,054,813 sits
11,588 below Li(1e11) = 4,118,066,401, which is the right size for
sqrt(x)/ln x at that height. The 224,376,048 twin pairs sit at 1.000032 of the
Hardy-Littlewood integral 2C2 int dt/ln^2 t = 224,368,865. At 1e10 the same
integral gives 27,411,417 against the known 27,412,679, and the claimed count is
8.19 times it, so the run cannot be a 1e10 run. Both figures in
`ZONE-POSTULATE.md` §4 stand.

**The G2(41#) band.** The exact diagonal ladder for c2' reproduces to four
decimals at every one of the eight terms, the full-sample mean is 0.4814 with
cv 10.2%, and `m2(41) * lnD(41) = 1065.7`. Band **476 to 633**, central **513**,
outlier case **488**. The retired bands are gone from the working files.

**A091592**, 1, 9, 19, 26, 27, 30, 34, 39, 49, 53, 77, 122, by sieve to n = 3000
with both members of the pair required inside the square window. The Pane
Postulate's single exception at n = 26 for n <= 1e5 also reproduces.

**The grain.** T7's gap word 6,12,12,18,12,30,6,30,12,18,12,12,6,12,12 sums to
210 and peaks at 30 = G2(7#). T11's census 6x21, 12x56, 18x22, 24x6, 30x22,
36x4, 42x4 counts 135 = D_11 and sums to 2310. count(6) = prod(q-4) gives 21,
and 8*21 = 3*56.

**Assorted.** pi(16001) = 1863 exactly; 13933, 16001, 1453 and 4001 are all
prime; the ln x*/ln y column 1.448 ... 1.472 and its square as the 2.2 cap;
Ziller and Morack's a(n)/(ln W)^2 decay 1.411 ... 0.604 and both margin columns;
the raw G2 log-log fit 1.801 +- 0.074 on ten terms; the theta-ladder's
need -> theta -> true/z^2 arithmetic at all four physical z; the
`discrepancy-two-class.md` D_x, mu_2 and share-of-D_x columns.

---

## Not verified, and why

- **beta_2 = 4.26645028414864191641.** External (Booker-Browning rigorous
  truncation of the DHR dimension-2 sifting limit). Not recomputable here.
  Internally it agrees at all fourteen appearances, and 5.2974/4.26645 = 1.2417
  checks.
- **h(31#) = 58 and h(37#) = 66.** OEIS A048670 / Hagedorn. The direct sieve
  stops at 29#; phi(31#) = 3.07e10 is out of reach by that route.
- **h2 = A288815** and the identity 6*A072753 + 6. The free-pair covering search
  is a different and much harder computation. The identity holds arithmetically
  at all twelve terms from n = 2, and the chain h <= G2 <= h2 holds at all
  twelve.
- **pi(1e11) = 4,118,054,813 to the unit.** Checked only against Li. Getting it
  exactly needs a Meissel-Lehmer count.
- **The exact theta suprema 1.9524, 1.9477, 2.0018, 2.0476.** Reproducing these
  means re-running the certificate machinery in `sift-limit-lemmaV.js`. The
  arithmetic that turns `need` into theta and into true/z^2 is right at all four
  rows.
- **Every MEASURED fit constant**: the c surface, "12.2 ln Y" at T23, the
  3.5 ln^3 x localized law, ln(Var/E) ~ -(0.24u^2 + 0.13u), and the 356,712
  certificate at x = 4001. These are outputs of experiments, not arithmetic.

## Confidence

High. Eight independent recomputations of numbers that appear in three or more
files each returned the published value to the last digit quoted, including the
two hardest ones in the repo. The four errors found are a misattributed step, a
floor-versus-round, a mislabelled column, and a double rounding. Nothing in the
corpus arithmetic looks like the factor-2 Mertens slip, and that one is fully
purged from the working files.
