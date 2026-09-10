# lit-pdf-kourbatov-grob — Kourbatov and Grob verified against the PDFs of record

<!-- ledger
id: Q-lit-kourbatov-grob
status: ANSWERED
todo: none
question: Do the Kourbatov and Grob quotes on which the ZONE-POSTULATE retraction rested hold against the PDFs of record?
verdict: They hold: four verification items land VERBATIM against the published article and Grob's three negatives are confirmed, so the retraction was justified and a true claim was not retracted on false evidence; the corpus under-reports Grob in two places.
-->

Read-only literature check, 2026-08-18. No repo file edited except this one. Nothing committed,
nothing pushed.

Commissioned because today's retraction in `ZONE-POSTULATE.md` (see `history/CHANGELOG.md`
§"The guard now has a constant") rested on Kourbatov quotes taken from web sources rather than
from a PDF. If those quotes were wrong, a true claim was retracted. **They are not wrong.** All
four verification items land VERBATIM against the published article, and the fifth (Grob) confirms
the corpus description's three negatives while turning up two places where it under-reports.

Status legend: **VERBATIM** = exact match including punctuation; **DIFFERS** = source says
something else, difference marked; **NOT FOUND** = searched, absent.

---

## PDFs obtained

All five obtained and read. Nothing in this report comes from HTML, an abstract page, or a search
snippet.

| file | source | pages | md5 |
|---|---|---|---|
| `kourbatov-jis.pdf` | `cs.uwaterloo.ca/journals/JIS/VOL16/Kourbatov/kourbatov3.pdf` | 26 | `bc4aeb693289c58519acf3d86404a00e` |
| `k1301_v1.pdf` | `arxiv.org/pdf/1301.2242v1` (10 Jan 2013) | 22 | |
| `k1301_v2.pdf` | `arxiv.org/pdf/1301.2242v2` | 23 | |
| `k1301_v3.pdf` | `arxiv.org/pdf/1301.2242v3` (14 Apr 2013) | 24 | |
| `grob_1905.03117.pdf` | `arxiv.org/pdf/1905.03117` | 17 | |
| `grob_2107.06950.pdf` | `arxiv.org/pdf/2107.06950` | 20 | |

Identity of the JIS file confirmed from its own title block: *"Journal of Integer Sequences, Vol. 16
(2013), Article 13.5.2 — Maximal Gaps Between Prime k-Tuples: A Statistical Approach — Alexei
Kourbatov"*. Text extracted with `pdftotext` in both `-layout` and raw modes; every quotation below
was read in the layout extraction and cross-checked against the raw one.

**The PDF of record is the JIS version.** Where the arXiv versions differ from it, that is recorded
under each item. The short answer: **our four items match the JIS text and arXiv v3 exactly, and
v1/v2 differ from both.** Whoever transcribed these quotes read the right version.

---

## Item 1 — Table 1, the four twin-prime slopes — **VERBATIM**

**Location:** JIS **page 4**, §3 *"Motivation: is a simple linear fit for G_k(p) adequate?"*.

Our record: `0.4576, 0.4756, 0.5203, 0.5628` for end-of-gap prime p in `1<p<10⁶`, `10⁶<p<10⁹`,
`10⁹<p<10¹²`, `10¹²<p<10¹⁵`, least-squares zero-intercept, twin primes.

Source, the whole first column as printed:

```
                                    TABLE 1
Least-squares zero-intercept trendlines for maximal gaps between prime k-tuples
                      Trendline equation for maximal gaps between prime k-tuples:
End-of-gap prime p      twin primes      prime quadruplets      prime sextuplets
                     (k = 2; ξ = log3 p) (k = 4; ξ = log5 p)   (k = 6; ξ = log7 p)
   1 < p < 106          y = 0.4576ξ            y = 0.0627ξ            y = 0.0016ξ
  106 < p < 109         y = 0.4756ξ            y = 0.1031ξ            y = 0.0147ξ
 109 < p < 1012         y = 0.5203ξ            y = 0.1245ξ            y = 0.0181ξ
 1012 < p < 1015        y = 0.5628ξ            y = 0.1451ξ            y = 0.0249ξ
```

Every digit matches. Every range boundary matches. The column is **twin primes, k = 2, ξ = log³ p**,
and it is the **first** data column, so there is no chance of a k = 4 or k = 6 misread: the k = 4
column is 0.0627/0.1031/0.1245/0.1451 and the k = 6 column is 0.0016/0.0147/0.0181/0.0249, neither
of which resembles what we recorded.

Our descriptor "least-squares zero-intercept" is also the paper's own, twice: the caption above, and
the lead-in at page 4, *"Table 1 presents the least-squares zero-intercept trendlines [16, 22] for
record gaps between k-tuples below 10¹⁵ (k = 2, 4, 6)."*

**Version note, and it is a gain, not a defect.** arXiv **v1 and v2 print an R² column that v3 and
JIS dropped.** The slopes are identical in all four files; v1/v2 additionally give the goodness of
fit for the twin column:

| range | slope | R² (v1, v2 only) |
|---|---|---|
| 1 < p < 10⁶ | 0.4576 | 0.947 |
| 10⁶ < p < 10⁹ | 0.4756 | 0.904 |
| 10⁹ < p < 10¹² | 0.5203 | 0.944 |
| 10¹² < p < 10¹⁵ | 0.5628 | 0.974 |

These four numbers are not in the published article and are worth having: they say the linear fit is
good *within* each decade band while the slope moves *between* them, which is precisely the shape
of the trend that our retraction conceded. The caption also changed across versions — v1/v2 read
*"Best-fit lines and coefficients R² for maximal gaps between prime k-tuples (k = 2, 4, 6)"*, v3
reads *"Least-squares trendlines … (k = 2, 4, 6)"*, JIS reads *"Least-squares zero-intercept
trendlines for maximal gaps between prime k-tuples"*.

---

## Item 2 — the sentence under the table — **VERBATIM** (against JIS and v3)

**Location:** JIS **page 4**, §3, immediately following Table 1 with no intervening text. Our claim
that it "immediately follows that table" is correct.

Ours and the source are the same string:

> "Table 1 shows that, for a fixed k, record gaps between k-tuples farther from zero have a steeper
> trendline (when plotted against log^{k+1} p). This is not a 'one-slope-fits-all' situation!"

Exclamation mark present. Sentence break after the parenthesis present. The source sets
one-slope-fits-all in typographic double quotes, `“one-slope-fits-all”`; we render it in single
quotes, which is a quoting-style choice and not a textual difference.

**Version note — this sentence was rewritten twice, and only v3/JIS match us.** Anyone re-checking
against an arXiv listing needs to know which file they are holding:

- **v1 (10 Jan 2013) — DIFFERS, two ways.** *"Table 1 shows that, **in fact**, record gaps between
  k-tuples farther from zero have a steeper trendline (when plotted against log^{k+1} p)**;** **t**his
  is not a "one-slope-fits-all" situation!"* — "in fact" where the final text has "for a fixed k",
  and a **semicolon** with lowercase "this" where the final text has a full stop.
- **v2 — DIFFERS, one way.** *"Table 1 shows that, for a fixed k, record gaps between **larger
  k-tuples** have a steeper trendline (when plotted against log^{k+1} p). This is not a
  "one-slope-fits-all" situation!"* — "larger k-tuples" where the final text has "k-tuples farther
  from zero". This is a substantive change: "larger k-tuples" would mean bigger k, which contradicts
  "for a fixed k" in the same clause. He fixed it in v3.
- **v3 and JIS — identical to our quote.**

---

## Item 3 — the 0.76 log³ p bound — **VERBATIM**; the `= 1/(2C₂)` identification is **ours, and it holds**

**Location:** JIS **page 4**, §3, four sentences after Table 1, closing the section.

Our quote and the source agree word for word:

> "computations and heuristics suggest that a linear function of log^{k+1} p can serve as a
> convenient upper bound for gaps. For example: Maximal gaps between twin primes are less than
> 0.76 log³ p."

Identical in all four files — v1, v2, v3 and JIS. This sentence never changed. Full sentence in
source, of which our quote is the second half: *"Nevertheless, a linear approximation can also be
useful; computations and heuristics suggest that …"*. The string `0.76` occurs **exactly once in
each version of the paper**, here.

**`a = 0.75739 log² p` and `E3 = a log p` — VERBATIM.** JIS **page 9**, caption to Figure 1, §5.1
*"The growth of maximal gaps"*:

> "Figure 1: Maximal gaps between twin primes {p, p + 2} (A113274). Plotted (bottom to top):
> expected average gap a = 0.75739 log² p, estimators E1 = a log(p/a) − ba, E2 = a log(p/a),
> **E3 = a log p = 0.75739 log³ p**, where p is the end-of-gap prime; b = 1."

Both halves of our claim are in that one caption, and the caption also does the substitution for us:
E3 = a log p = 0.75739 log³ p.

**`0.76 = 1/(2C₂) = 0.75739` — correct in substance, but flag the notation and the rounding.**

1. Arithmetic: 1/(2 × 0.6601618158…) = **0.7573900640687455**, which rounds to 0.75739. Confirmed.
2. **Notation collision, and it is the kind that produces a wrong quote later.** In *our* sentence
   C₂ = 0.6601618 (the Hardy–Littlewood twin-prime constant) so 2C₂ = 1.32032. In *Kourbatov's*
   notation, `C₂` **is** 0.75739. He writes, JIS **page 6**, §4.2: *"Let C_k denote the reciprocal to
   the corresponding Hardy-Littlewood constant: C_k = H_k^{−1}"*, then *"C₂ = H₂^{−1} ≈ 0.75739,
   C₄ = H₄^{−1} ≈ 0.240895, C₆ = H₆^{−1} ≈ 0.057808."* So his H₂ is our 2C₂. Never quote "C₂" across
   the two conventions without saying whose.
3. **He never writes the equation `0.76 = 1/(2C₂)`.** That identification is ours. It is nonetheless
   the reading the paper supports, by its own chain: statement (B), §4.2 page 5, is
   *"Maximal gaps between prime k-tuples are O(log^{k+1} p): g_k(p) < M_k log^{k+1} p, where
   M_k ≈ C_k (and possibly M_k = C_k)"*; and note 5 on page 10 closes it, *"The estimator
   E3 = C_k log^{k+1} p overestimates all known record gaps … E3 may be a good candidate for an upper
   bound for all record gaps; so in statement (B) of section 4.2 we may have M_k = C_k = H_k^{−1}"*.
   With k = 2 that is M₂ = 0.75739, and 0.76 is that rounded up. Report it as an inference from
   (B) + note 5, not as a quotation.
4. **Independent corroboration of the constant, from a place the published paper deleted.** arXiv v3
   reference [6] carries an annotation dropped from JIS, giving Fischer's formula as
   *"Maximal gaps between twin primes are G₂(p) ≈ (1.32032)^{−1}(log p − (2/3) log log p)³"*. The
   1.32032 is H₂ = 2C₂ printed in the source itself.

**One caveat the corpus should carry with the guard.** The bound is explicitly heuristic — his own
words are "computations and heuristics suggest" and statement (B) is listed under "Conjectures".
§6, page 16, shows the analogous prime-case bound is conjecturally *violated*: Granville's adjustment
gives lim sup G(p)/log² p ≥ 2e^{−γ} = 1.1229, i.e. an infinite subsequence above the E3 line. Nothing
rules out the same correction for twins. Our guard survives this easily, because it compares against
a window of p², but the margin is what saves it, not the bound's status.

**Bonus, and it is our guard in his words.** §7 *"Corollaries: Legendre-type conjectures"*, page 17,
derives from statement (B) exactly the object `ZONE-POSTULATE.md` uses: *"For each integer n > 122,
there are twin primes between n² and (n + 1)². (A091592)"*, and also *"For each integer n > 0, there
are twin primes between n³ and (n + 1)³."* The argument he gives — any positive power of x beats any
power of log x, so the window eventually swallows the largest gap, with a computer check for small n
— is the argument our guard runs. Worth citing there.

---

## Item 4 — the three credits — **VERBATIM**, with one numbering trap and real version drift

All three verified in the JIS bibliography, pages 23–25.

**Rodriguez and Rivera — VERBATIM.**
> "[26] L. Rodriguez and C. Rivera, Conjecture 66. Gaps between consecutive twin prime pairs, 2009.
> Available at http://www.primepuzzles.net/conjectures/conj_066.htm."

Cited in text at page 4: *"For twin primes (k = 2), Rodriguez and Rivera [26] gave simple linear
approximations of record gaps."* Reference number moves by version: **[6] in v1, [24] in v2, [26] in
v3 and JIS.**

**Fischer — VERBATIM as to title and year, but it is reference [5], not [6].**
> "[5] R. Fischer, Maximale Lücken (Intervallen) von Primzahlenzwillingen, preprint, 2008.
> Available at http://www.fermatquotient.com/PrimLuecken/ZwillingsRekordLuecken."

**There are two Fischer preprints and they are easy to swap.** The other is
> "[6] R. Fischer, Maximale Intervalle von Primzahlenpaaren, preprint, 2006. Available at
> http://www.fermatquotient.com/PrimLuecken/Max_Intervalle."

The sentence under discussion in Item 1 cites the **2006** one: *"while Fischer [6] and Wolf [32]
proposed more sophisticated non-linear formulas."* The **2008** *Maximale Lücken* preprint is [5],
cited separately at page 3 (*"Kelly and Pilling [17], Fischer [5] and Wolf [32] report heuristics and
computations for gaps between twin primes (k = 2)"*) and again at page 14 (*"Table 2 reflects
Fischer's extensive computation [5]"*). So the form we recorded is correct, but if the corpus
anywhere attaches it to the bracket number [6] or to the non-linear-formula sentence, that is wrong.

Two version differences here, both real:
- **v1 has only one Fischer entry**, `[7] R. Fischer, Maximale Lücken (Intervallen) von
  Primzahlenzwillingen (in German)`, with no year in the title position and no second preprint. The
  2006 *Maximale Intervalle* paper enters at v2.
- **arXiv v2/v3 call both items "web page (in German)"; only the JIS version calls them
  "preprint"** and gives the year in the position we recorded. Our form
  *"preprint, 2008"* is therefore the **published** form and does not match the arXiv text. If a
  re-checker holds v3 and searches for "preprint", they will not find it and may report our citation
  as wrong. It is not wrong; it is the JIS wording.

**Wolf — VERBATIM in substance; it is a private communication, not a paper.**
> "[32] M. Wolf, Maximal gaps between twin primes G₂(x) can be expressed in terms of π₂(x).
> Personal communication, 2013."

Our description "M. Wolf on G₂(x) in terms of π₂(x)" is accurate. Three things to record:
- It is **not a citable document.** JIS says "Personal communication, 2013"; arXiv v3 says "E-mail
  communication (2013)". There is nothing to fetch. The corpus must not cite it as if there were.
- **v1 does not contain the string "Wolf" at all.** The entry appears first in v2. The acknowledgments
  explain it, page 23: *"Many thanks also to Prof. Marek Wolf for his interest in the initial version
  of this paper, followed by an email exchange that undoubtedly helped make this paper better."*
- Wolf's *published* item is a different one: `[31] M. Wolf, Some heuristics on the gaps between
  consecutive primes, preprint, 2011. Available at http://arxiv.org/abs/1102.0481.` Cited at page 3
  as *"Wolf [31, p. 21] proposes an improvement: a gap G(p) is likely to first appear near
  p ∼ G(p)e^{√G(p)}"*. Do not merge [31] and [32].

Also collected while there, since the corpus cites A113274: page 14, *"For earlier computations of
maximal gaps by Boncompagni, Rodriguez, and Rivera, see also OEIS A113274, A113404 [29, 26]."*

---

## Item 5 — Grob, full-text read of both papers

Both read end to end: **arXiv:2107.06950** (20 pp., §§1–7 plus a two-part appendix) and
**arXiv:1905.03117** (17 pp., §§1–12, Theorems 1–9 and Corollaries 1–4). Authorship not re-verified,
per the brief.

### The three negatives — all three hold

**(a) Any maximum-gap or largest-gap result — NOT FOUND.** The string **"gap" occurs zero times in
either paper**, in both the layout and the raw text extractions. So do "maximal", "maximum",
"longest", "spacing", "density", "Hardy", "Littlewood" and "Brun". The word "interval" appears in
both, but *only* in the sense of a period or a subdivision of one — "every interval of length Πp_i",
"6 Equal Intervals of 35" — never as a distance between two survivors. Neither paper measures the
separation of two consecutive twin candidates anywhere.

**(b) Any recursion on gaps between twin slots — NOT FOUND.** There are recursions, but none of them
is on gaps, and the paper that would need one says so:

- Meissel's recursion, on **counts**, one class: 1905.03117 Theorem 8, `f_Mn(x) = f_Mn−pi(x) −
  f_Mn−pi(x/p_i)`, restated in the 2021 appendix as Theorem 8/8a.
- 2107.06950 §5 asks directly whether that adapts to twins and answers **no**: *"Unfortunately, the
  situation is not analogous for twin n-primes … Adapting Meissel-Lehmer's prime counting formula to
  account for these features of twin n-primes or M-primes introduces so many complexities that the
  value of a single formula as elegant as Meissel-Lehmer's prime counting formula is lost."* What
  follows under the heading "Inductive Method for Counting Twins" is not a recursion at all — it is
  the observation that the term count grows by a factor of 3 per prime.
- No "recursion" or "recursive" anywhere in either paper.

**(c) Anything resembling a two-class Jacobsthal function — NOT FOUND.** **"Jacobsthal" occurs zero
times**, and more to the point neither paper ever takes a maximum over anything. Every quantity in
both papers is a count or a period length.

### Where the corpus description under-reports — two places, as the audit suspected

`PRIOR-ART.md`:187–190 says *"a two-class 'Sieve of Twins' with the prod(p-2) count. Same census, no
gap recursion, no maximum-gap work."* The three negatives are right. The phrase "same census" is
where it loses information.

**1. The ∏(p−2) count is not stated for twins. It is stated for every admissible 2-tuple, with the
inadmissible correction attached.** 1905.03117 page 4, Corollary 2 and the paragraph after it:

> "Corollary 2. More generally, for any integer a ≠ 0 (mod p_i, 1 ≤ i ≤ n) there are Π(p_i − 2) …
> integers x in P_n such that the pair x − a, x + a (mod P_n), are both n-primes."

> "Corollary 2 may be further generalized, holding true for any two integers a and b that are not
> congruent mod p_i, for all i … there are Π(p_i − 2) … integers x in P_n such that the pair x − a,
> x + b (mod P_n), are both n-primes. **Should a be congruent to b for any p_i, then the formula holds
> true by substituting (p_i – 1) for (p_i – 2) for any such p_i.**"

That last sentence is the admissibility switch — the per-prime class count dropping from 2 to 1 when
the pair collides mod p — written out in 2019. Anywhere the corpus presents "two classes per prime,
one when the offsets collide" as its own framing, this is prior art for the counting half of it. He
also flags in his own introduction, page 2, that *"Theorem 4, about twin n-primes, has also been
independently discovered or more fully developed by others"* — so he is not claiming the twin census
either.

**2. The 2021 paper has an explicit comb and a worked survival lift, which "same census" hides.**
§4E, page 12, defines the object:

> "**D_M**: the set of 'discarded M-prime centers,' i.e., integers x such that x ε P_M (i.e.,
> 0 ≤ x ≤ Πp_i, p_i ε M) and that each member of M divides either (x – 1) or (x + 1)."

and Tables 11–13 print those residue sets explicitly — D_{5} = {1, 4}, D_{5,7} = {1, 6, 29, 34},
D_{5,7,11} = {1, 34, 76, 111, 274, 309, 351, 384} — i.e. combs of dead centres mod a primorial, the
same kind of object as our `{11,17} mod 30 minus {0, p−2} mod p`. Then §5B, page 16, Table 14 does a
**lift by hand**: it takes the discarded centre 34 of M = {5, 11}, walks its 7 copies at
34 + 55k across the period 385, and finds that exactly **2 of the 7** have a wing divisible by 7
(34 and 309). Four discarded centres × 2 = the 8 of D_{5,7,11}. That is the two-class "2 of p copies
struck per fold" fact, demonstrated on one example.

**What is still absent, and this is the part that matters for our novelty claims.** He does not
generalise that lift; he calls it an open question and hands it to Diophantine equations —
*"At this point, an open question is: how were these 'discarded centers' determined? A general answer
is that they were calculated using Diophantine equations of two unknowns … A full discussion of
Diophantine questions is beyond the scope of this paper."* And he tracks only the **discarded** set,
never the survivors' arrangement. There is:

- **no birth-cohort decomposition.** Nothing corresponds to our natal set @p of size p−3, the edge
  bearing p−2 children, the seam, or `D_new = 1 + carried·(p−2) + natal(p−3)`. 1905.03117 Theorem 5
  is the nearest thing and it is the one-class version for n-primes: *"The (n+1)th prime, p_{n+1},
  divides one and only one n-prime in the series K·Πp_i + a for any n-prime a and 0 ≤ K ≤ p_{n+1} −
  1."* One class, no cohorts, and it is about n-primes rather than twin centres.
- **no mirror/edge structure used.** Theorem 2/2a give the symmetry x ↔ Πp_i − x, which is our
  mirror, but he never derives a protected slot from it. In his indexing 1 and Πp − 1 are always
  *discarded* (0 is divisible by everything), the opposite normalisation to our eternal edge, and he
  does not remark on it.
- **no positional analysis of survivors at all** — which is the same finding as (a).

### The audit's open flag on `GLOSSARY.md`:138 — now adjudicable, and it is half right

`audit-novelty-postaudit.md` finding 2 flagged *"The two-class object does not appear in the
literature; the one-class version is Holt's"* as at risk from Grob §4, and could not say whether he
studies the signed discrepancy. Having read it:

- **As a claim about the two-class sifting function, the GLOSSARY sentence is wrong.** 2107.06950 §4
  builds one explicitly. Formula (14): *"T_n(x) = [x] – Σ(D_{pi}(x)) + Σ(D_{pi,pj}(x)) −
  Σ(D_{pi,pj,pk}(x)) + · · ± Σ(D_{p1,p2,…pn}(x))"*, "sums taken over all the singles, then all the
  doubles, triples, etc. of the first n primes", with the closed form (16) `T_M(x) = [x] −
  Σ((−1)^k(D_mi(x))` over all subsets. Section title: *"4. A Legendre-like Function for Counting
  Twins"*. That is a two-class Legendre inclusion–exclusion sifting function, in print, 2021.
- **As a claim about ΔΦ₂ specifically, it survives.** ΔΦ₂ is the *signed discrepancy of the two-class
  sieve against its main term*. **Grob never forms a main term and never forms an error term.** His
  §6 "Euler-like ɸ-function for Twins" gives `T(x) = x·(p₁−2)(p₂−2)···(pₙ−2) / p₁p₂···pₙ`, but that
  is an exact count over one full period, derived straight from Theorem 4a — not an approximation
  that anything is compared against. He never subtracts it from T_M(x), never bounds a remainder,
  and the string "error" in that sense does not appear. Nothing in either paper resembles the
  3^{π(x)} ceiling or R_k(p) → k+1.

**Recommendation** (for a human to action; no edit made): keep the ΔΦ₂ claim, narrow its wording
from "the two-class object" to "the two-class *discrepancy*", and cite Grob 2021 §4 as the
two-class sifting function that already exists. Also consider widening `PRIOR-ART.md`'s Grob line
from "the prod(p-2) count" to note Corollary 2's all-admissible-2-tuple form with the (p−1)
fallback.

---

## Verdict on today's retraction

**Justified.** The retraction was made on quotes that turn out to be verbatim-correct against the
published article, and correct against arXiv v3, which is the version JIS printed. The four slopes
are right to the last digit, the ranges are right, the column is the twin column, the
"one-slope-fits-all" sentence is right including the exclamation mark, and it does sit immediately
under the table. A true claim was not retracted on false evidence.

Two things strengthen it further, both new here: the R² values in arXiv v1/v2 (0.947, 0.904, 0.944,
0.974) say the fit is tight inside each band while the slope moves between them, which is what a real
trend looks like rather than scatter; and §7's Legendre-type conjecture *"For each integer n > 122,
there are twin primes between n² and (n+1)²"* is the guard's own statement, derived by Kourbatov from
statement (B), so the replacement guard is standing on the paper's own argument and not merely on a
number lifted from it.

The one thing to fix in how the result is carried: `0.76 = 1/(2C₂)` is our inference, defensible via
(B) plus note 5, but not a quotation, and "C₂" means 0.66016 in our notation and 0.75739 in his.

---

*History and corrections index: `research/history/CHANGELOG.md`.*
