# The two-class Jacobsthal function: bounds, data, and distance from the twin prime conjecture

<!-- ledger
id: Q-paper-two-class-jacobsthal
status: ANSWERED
todo: W
question: What are the consolidated bounds and data of this programme, stated as a single note a number theorist can check end to end, and how far does it sit from the twin prime conjecture?
verdict: The two-class Jacobsthal function G2 is bounded above at exponent 4.26645 by the DHR sieve and below at x ln^3 x up to loglog factors by a two-class Erdos-Rankin construction, with 22 exact terms and the 18 normalized terms at x >= 11 running at about 0.446 to 0.594 times m ln D; no twin-prime infinitude or universal method obstruction is proved.
parity: residue-only
-->

*Draft, 2026-09-05. Internal to the primeoire repository; the publication
moratorium is in force and this document is not submission copy. Prose follows
`paper/writing-style-math.md`. Nothing is re-derived here: every theorem points
at the file that proves it, every number at the script that produced it.*

**Author.** Chris Benjaminsen.

**Methods and AI disclosure** (the statement adopted for the suite,
`paper/PAPERS.md`): the framework, vocabulary and driving questions are the
author's, developed over six years of independent work. Formal derivations,
literature audits, computations and manuscript drafting were carried out using
AI assistants under the author's direction.
Computations have reproducible code and recorded outputs; asymptotic arguments
require their stated mathematical inputs and are not proved by finite checks.
Refuted intermediate claims are retained in the record.

---

## Abstract

Let $P(x) = \prod_{p \le x} p$ and call $r$ a twin slot mod $P(x)$ if
$\gcd(r(r+2), P(x)) = 1$. Let $G_2(x\#)$ be the largest cyclic gap between
consecutive twin slots: the two-class analogue of Jacobsthal's function $g$,
where each odd prime removes the two classes $0$ and $-2$ instead of one. We
record what is known about $G_2$. Above: $G_2(x\#) \ll_\varepsilon
x^{\beta_2 + \varepsilon}$ with $\beta_2 = 4.26645\ldots$ the sifting limit of
the Diamond–Halberstam–Richert two-dimensional sieve, a corollary of that sieve
that we did not find recorded. Below: $G_2 \ge g$ pointwise, and
$G_2(P(y)) \gg y (\ln y)^3 (\ln\ln\ln y)^2/(\ln\ln y)^4$ by carrying the
two-class kill set through Kalmynin and Konyagin's construction. Between:
twenty-two exact terms to $x = 79$, fourteen computed here and eight from
OEIS A144311. The eighteen normalized terms with $x \ge 11$ run at about
$0.446$ to $0.594$ times $m \ln D$, with $m$ the reciprocal slot density and
$D$ the census. A fixed upper exponent below $2$ would imply twin primes and
$g(x\#)=o(x^2)$, whereas a constant bound at exponent $2$ alone does not give
that little-o conclusion. The present DHR argument does not reach either
sufficient target. We make no claim that its threshold is optimal among all
sieves or that the exact tile structure excludes a different argument.

## 1. The object

Fix a prime $x$ and write $W = x\#$. The reduced residues mod $W$ are the
holes of the primorial wheel; a **twin slot** is a residue $r$ with $r$ and
$r+2$ both holes. For $p = 2$ one class is forbidden ($r$ even) and for each
odd $p \le x$ two classes are forbidden, $r \equiv 0$ and $r \equiv -2$. The
number of twin slots per period is $D_x = \prod_{3 \le q \le x}(q-2)$, the
Schemmel totient (OEIS A059861), and

$$G_2(x\#) = \max\{\text{cyclic gap between consecutive twin slots of } W\}.$$

Three facts fix the object's place.

- **It is a maximum-gap function of a sieve of dimension two.** The forbidden
  classes are set by the arithmetic, not chosen: $\omega(2) = 1$,
  $\omega(p) = 2$ for odd $p$, and $\prod_{p \le z}(1 - \omega(p)/p) \asymp
  1/\ln^2 z$. The linear sieve, with its sifting limit exactly $2$, is
  unavailable (`paper/beta2-note.md` §2).
- **It brackets the one-class function.** Twin slots are a subset of holes, so
  $G_2(x\#) \ge g(x\#)$ for Jacobsthal's $g$ (OEIS A048670 at primorials); and
  $G_2 \le h_2$, Ziller and Morack's function where each prime chooses its two
  classes freely (OEIS A288815). Both hold at every shared term
  (`research/G2-STATE.md` §2).
- **It is OEIS A144311 shifted by one.** A144311 counts the longest run of
  consecutive integers each $\equiv \pm 1$ mod some prime $\le x$; that is
  $G_2 - 1$ in the mirror convention. The entry dates from 2008 and its
  wording contains none of this programme's words, which is why our own
  search missed it for a week (`research/SEARCH-CONVENTIONS.md` §1).

The elementary connection to primes: $W - 1$ and $W + 1$ are both holes, so
the tile carries a twin slot at its edge, and every $x$-rough integer below
$x'^2$ is prime ($x'$ the next prime). Hence

$$G_2(x\#) < x'^2 - 2 \quad\Longrightarrow\quad \text{a twin prime pair lies in } (x, x'^2),$$

for every $x$ where it holds (`research/ZONE-POSTULATE.md` §3). Since
$\ln W \sim x$, the window is $(\ln W)^2$: an exponent below $2$ for $G_2$
would settle the conjecture. Section 5 says why that observation is a
calibration and not a plan.

## 2. The upper bound

> **Theorem 1** (`paper/beta2-note.md`, conditional only on the cited sieve).
> Let $\beta_2 = 4.26645028\ldots$ be the sifting limit of the DHR sieve of
> dimension $2$. For every $\varepsilon > 0$ there is $C(\varepsilon)$ with
> $$G_2(x\#) \le C(\varepsilon)\, x^{\beta_2 + \varepsilon} \quad \text{for all primes } x.$$
> Equivalently, in $q = x\#$: consecutive $r$ with $\gcd(r(r+2), q) = 1$ are
> spaced $\ll_\varepsilon (\ln q)^{4.267 + \varepsilon}$ apart.

*Shape of the proof.* Take $A = \{r(r+2) : u < r \le u + H\}$ on an interval
of length $H$ and sift by all $p \le x$. This is the Diamond–Halberstam book's
own Example 1.2 at $g = 2$, $L(n) = n(n+2)$: $|A_d| = (\omega(d)/d) H + r_d$
with $|r_d| \le \omega(d) \le 2^{\nu(d)}$ and the dimension condition
$\Omega(\kappa)$ holding at $\kappa = 2$ with an absolute constant, by Mertens.
Their Theorem 9.1 gives $S(A, z) \ge H V(z)\{f_2(u) - o(1)\} - 2\sum_{m<y}
4^{\nu(m)}|r_m|$ with $u = \ln y/\ln z$ and $f_2(u) > 0$ exactly for
$u > \beta_2$. With $H = z^{\beta_2 + \varepsilon}$ and level
$y = z^{\beta_2 + \varepsilon/2}$ the remainder is $\ll y \ln^7 y$ and the main
term wins by $z^{\varepsilon/2}$, so every interval of length
$z^{\beta_2 + \varepsilon}$ holds a twin slot, uniformly in position. Taking
$u$ over a period gives the theorem. The sieve input was read line by line
from the primary source with page images archived
(`research/dhr-verification.md`); the constant is inexplicit, as in Iwaniec's
one-class theorem.

*What the theorem is and is not.* It is the dimension-two sieve applied to an
interval, with no idea added; the note that proves it says so. The $\varepsilon$
absorbs the $8^{\nu(m)}$ remainder that makes the one-class exponent-$2$ result
hard (Iwaniec 1978 had no $\varepsilon$ to spend). Our search in the owning
convention, bounded number of residue classes per prime, found no earlier
upper bound at any exponent for the two-class problem
(`research/PRIOR-ART.md` row "Iwaniec-type upper bound for 2 omitted classes";
`research/SEARCH-CONVENTIONS.md` §3). The field of $\kappa = 2$ sifting limits
in print is Rosser–Iwaniec $4.834$, Ankeny–Onishi $4.42$, Selberg's
$\Lambda^2\Lambda^-$ $4.516$ (Franze 2011), Blight $4.45$, and DHR $4.26645$;
the theorem uses the smallest.

## 3. The lower bounds

> **Theorem 2a** (pointwise, elementary; `research/two-class-lower-bounds.md` §1, §3).
> $G_2(x\#) \ge g(x\#)$ for every $x$. In particular every published lower bound
> on Jacobsthal's function at primorials transfers: Ford, Green, Konyagin,
> Maynard and Tao give $G_2(x\#) \gg x \ln x \ln\ln\ln x/\ln\ln x$.

> **Theorem 2b** (`paper/kk-lower-bound.md` §9, Theorem A; published statements only, not refereed).
> $G_2(x\#) \gg x \ln x$.

> **Theorem 2c** (`paper/kk-lower-bound.md` §3, Theorem B; derived here, checked twice, not refereed).
> There is an absolute $y_0$ such that for $y \ge y_0$
> $$G_2(P(y)) \gg \frac{y (\ln y)^3 (\ln\ln\ln y)^2}{(\ln\ln y)^4}.$$

*Shape of 2c.* By the Chinese remainder theorem, $G_2(P(y)) - 1$ is the
longest interval $[1, m]$ that can be covered by choosing, for each prime
$p \le y$, a pair of classes $\{a_p, a_p - 2\}$ (band 1 fixes $a_p = 0$, where
the free translate and the sieve's own pair coincide; the covering freedom is
spent in band 2). Kalmynin and Konyagin (*A polynomial analogue of Jacobsthal
function*, Izv. Math. 88:2, 2024) publish a multi-class Erdős–Rankin
construction with a trichotomy of primes; substituting the two-class kill set
into it, their case 2 hypothesis quantifies over an empty set because the
two-linear-factor system has $h_f = 0$, and the rest goes through at sieve
dimension $\kappa = 4$ with the fundamental lemma, Mertens with the
Rosser–Schoenfeld error, the smooth-number estimate in Hildebrand's range, and
CRT. The seven asymptotic hypotheses (H1 to H7 of that note's §8) first hold together at
$y_0 = 10^{134.1}$ with every implied constant set to one, a floor on the true
$y_0$; band 2 is empty at every reachable $y$, so no computation exhibits the
construction. The substitution was re-derived by a second reader from
$200$ dpi page images of the source and its finite content brute-forced with
zero counterexamples (`research/history/staging/verify-kk-substitution.md`).

*Where the logs come from.* The Erdős–Rankin base gives one power of $x$; the
two-class survivor density after the small primes, $1/\ln^2 z$ in place of
$1/\ln z$, gives one log; the band-2 device of the source gives one more. The
Maier–Pomerance multi-kill upgrade, conjectural in both dimensions, would add a
fourth: the conjectural ceiling is $G_2(x\#) = x (\ln x)^{4 + o(1)}$, still
$x^{1 + o(1)}$ (`research/two-class-lower-bounds.md` §4c).

*A caution on the one-class floor.* The Erdős Problems page for #687, edited
2026-08-31, reports a one-class bound $Y(x) \gg x \ln x/\ln\ln\ln x$ that
improves FGKMT by a factor $\ln\ln x/(\ln\ln\ln x)^2$. Read at source on
2026-09-07: the attribution is not a paper. The page credits "GPT 5.6 Pro"
and links only to Erdős Problem #4's proof-claims thread; the artifact is an
anonymous AI-authored PDF posted to GitHub on 2026-08-26, not on arXiv and
not refereed, with its covering theorem formalised in Lean by a third party
(plby/lean-proofs). The statement is the one-class primorial form
$Y(X) \ge c_0 X\ln X/\ln\ln\ln X$, so it transfers to $G_2$ through
$G_2 \ge g$ at exactly that calibration. Theorem 2b sits above it in either
case and Theorem 2c far above.

## 4. The data

Fourteen exact terms computed here (`research/05-twin-jacobsthal.js`,
`research/05b-twin-jacobsthal-segmented.js`, `research/exact-g2-ladder.js`;
$41\#$ and $43\#$ each twice on disjoint masks), agreeing at all fourteen with
A144311, whose remaining eight terms (Alekseyev 2009, Wang 2024, a public
branch-and-bound sharing no method with ours) are adopted as trusted
(`research/a144311-full-ladder.js`). $G_2(37\#) = 528$ additionally carries an
exhaustive maximality certificate from a third engine over all
$217{,}929{,}355{,}875$ gaps (`research/history/staging/scanstat-t37.md`).

| $x$ | $G_2(x\#)$ | $c_2' = G_2/(m \ln D)$ | $G_2/x^2$ | $x$ | $G_2(x\#)$ | $c_2'$ | $G_2/x^2$ |
|---|---|---|---|---|---|---|---|
| 2 | 2 | | 0.500 | 41 | 546 | 0.512 | 0.325 |
| 3 | 6 | | 0.667 | 43 | 618 | 0.492 | 0.334 |
| 5 | 12 | | 0.480 | 47 | 708 | 0.484 | 0.320 |
| 7 | 30 | | 0.612 | 53 | 870 | 0.518 | 0.310 |
| 11 | 42 | 0.500 | 0.347 | 59 | 966 | 0.506 | 0.278 |
| 13 | 66 | 0.447 | 0.391 | 61 | 1080 | 0.502 | 0.290 |
| 17 | 108 | 0.471 | 0.374 | 67 | 1284 | 0.534 | 0.286 |
| 19 | 150 | 0.456 | 0.415 | 71 | 1398 | 0.523 | 0.277 |
| 23 | 204 | 0.458 | 0.386 | 73 | 1530 | 0.519 | 0.287 |
| 29 | 258 | 0.446 | 0.307 | 79 | 1710 | 0.528 | 0.274 |
| 31 | 348 | 0.479 | 0.362 | | | | |
| 37 | 528 | 0.594 | 0.386 | | | | |

Here $m = W/D$ is the reciprocal twin-slot density and $\ln D$ is the log of
the census, so $m \ln D$ is the Cramér-type scale, the mean gap times the log
of the number of gaps. Three readings, all MEASURED (`research/G2-STATE.md`
§3c, `research/maxgap-law.md`):

- $c_2'$ sits in $[0.446, 0.534]$ at every term except $x = 37$, whose $0.594$
  is the one outlier of the ladder and overshoots a blind seven-term
  extreme-value forecast at $z = +6.58$, unexplained. The band drifts upward
  along the ladder, $0.446$ to $0.500$ over $x \le 31$ against $0.484$ to
  $0.534$ over $x \ge 41$.
- The scale $m \ln D$ is $x \ln^2 x$ up to a constant, so the ladder lives at
  $x^{1 + o(1)}$, as the one-class function does. A power-law fit through the
  22 terms returns $1.50 \pm 0.05$ after correcting the estimator's bias on a
  one-class control (`research/exponent-control.md` §5). That figure is a local
  slope over one decade of $x$ and carries no asymptotic content.
- The unconditional floor $x \ln^3 x$ and the conjectural ceiling $x \ln^4 x$
  both sit above the $x \ln^2 x$ the data run at. This is the same situation
  as the one-class function, where the data run at $x \ln x$, the FGKMT floor
  sits just below, and the Maier–Pomerance conjecture $x (\ln x)^{2 + o(1)}$
  sits a log above: the Rankin-type gains are asymptotic and the accessible
  range does not see them. The ladder therefore tests nothing about either
  bound.

$G_2/x^2$ falls from $0.347$ at $x = 11$ to $0.274$ at $x = 79$, ten descents in
seventeen steps. The zone statement of §1 needs $G_2 < x'^2 - 2$; the measured
ratio $x'^2/G_2$ runs $3.2$ to $4.5$ over the ladder and the zone $(x, x'^2)$
holds a twin prime pair at every $x$ checked, to $X = 10^{12}$
(`research/history/staging/zonegap-03-score.md`). None of this is evidence for an asymptotic
statement, since $\ln^2 x/x \to 0$ makes the truth of the inequality
overwhelmingly likely and its proof no easier.

## 5. Distance from the twin prime conjecture

The implication of §1 is correct and it is why the object was studied. We
distinguish three claims.

1. **Quantifiers.** The safe sufficient inequality is
   $G_2(x\#)<x'^2-2$. Holding for every sufficiently large prime $x$, it gives
   occupancy of every sufficiently large zone. Infinitely many successful
   zones already suffice for twin-prime infinitude. A converse from infinitude
   to uniform occupancy is not proved here.
2. **The one-class comparison.** Since $g\le G_2$ and $x'/x\to1$, that
   constant inequality gives $\limsup g(x\#)/x^2\le1$. It does not by this
   comparison give $g(x\#)=o(x^2)$. The fixed-power improvement
   $G_2(x\#)=O(x^{2-\delta})$, $\delta>0$, would give little-o as well as
   twin primes. These are different targets.
3. **Sieve scope.** DHR achieves the sifting threshold $4.266450284\ldots$.
   Its current application gives no positive lower bound at the required
   quadratic scale. Neither this threshold nor Selberg's conjectured value
   $4$ is a proved optimal universal floor. See `research/OUTCOMES.md` for the
   withdrawn floor-at-4 claim.

Classical parity obstructions limit particular methods using specified
arithmetic statistics and errors. Exact residue arrangements determine the
survivors and, below the square frontier, primality; they are not thereby
excluded as a language for a future proof. Any broader impossibility claim
would need its own hypotheses and argument. Type II estimates are useful
additional inputs, not a proved necessary form for every possible proof.
Likewise a raw shifted-prime Liouville average needs factor-count restrictions
before its sign can certify a prime. This manuscript supplies no such new
estimate and no proof of the conjecture.

## 6. What would move each statement

| statement | rung | what would move it | has the check run |
|---|---|---|---|
| Theorem 1 | PROVEN, conditional on DHR Theorem 9.1 | a defect in the primary-source reading | yes: read line by line, page images archived |
| Theorem 2a | PROVEN | nothing; elementary | yes: verified at all 22 shared terms |
| Theorem 2b | DERIVED, not refereed | a misread of Kalmynin–Konyagin Corollary 1 | adversary-confirmed at the page image, once |
| Theorem 2c | DERIVED, checked three times, not refereed | a hypothesis of the source that the substitution does not satisfy; Halberstam and Richert Theorem 2.2 printed in a form that does not give Kalmynin and Konyagin's Lemma 1 (`paper/kk-lower-bound.md` §11.2) | second reader plus brute force of the finite content (2026-08-19); both §11.1 readings repeated at the arXiv text (2026-09-07) and at the TeX source, every other input read at source (2026-09-08, `research/history/reviews-0907/11`); the 1974 page unread after a second bounded access pass (2026-09-08, thirteen channels); a referee has not |
| the $c_2'$ band | MEASURED, 22 terms | a term at $x \ge 83$ outside $[0.44, 0.60]$ | no; the exact ladder and A144311 both end at $x = 79$ |
| "no earlier two-class upper bound" | CALIBRATED ABSENCE | one citation in the owning convention | searched 2026-08-18 and 2026-08-28 (`research/SEARCH-CONVENTIONS.md` §3) |
| §5 | elementary implications and scoped method limits | an independently proved estimate at the stated target scale | none supplied here; no universal impossibility claim |

## 7. Relation to the rest of the repository

This note supersedes nothing. `paper/beta2-note.md` carries Theorem 1 with its
verification record; `paper/kk-lower-bound.md` carries Theorems 2b and 2c
with a per-number provenance appendix; `research/G2-STATE.md` carries the
full state of the object with a calibration marker on every line;
`research/OUTCOMES.md` indexes the seventy-two routes tried toward a lower
exponent and closed. The current campaign benchmarks classical Chen input on
long intervals before proposing a signed extension; its scope is in
`README.md` §Status.

## References

- H. G. Diamond, H. Halberstam, with W. F. Galway, *A Higher-Dimensional Sieve
  Method*, Cambridge Tracts in Mathematics 177, CUP 2008. Theorem 9.1,
  Definition 1.3, Example 1.2, §6.5.
- A. Booker, T. D. Browning, *Square-free values of reducible polynomials*,
  Discrete Analysis 2016:8; ancillary table giving $\beta_2$ to twenty
  decimals.
- C. S. Franze, *Sifting limits for the $\Lambda^2\Lambda^-$ sieve*, J. Number
  Theory 131 (2011), arXiv:1012.3809.
- H. Iwaniec, *On the problem of Jacobsthal*, Demonstratio Math. 11 (1978).
- K. Ford, B. Green, S. Konyagin, J. Maynard, T. Tao, *Long gaps between
  primes*, J. Amer. Math. Soc. 31 (2018), arXiv:1412.5029.
- A. Kalmynin, S. Konyagin, *A polynomial analogue of Jacobsthal function*,
  Izv. Math. 88:2 (2024), arXiv:2302.00459.
- M. Ziller, J. F. Morack, *Algorithmic concepts for the computation of
  Jacobsthal's function*, arXiv:1611.03310; and OEIS A288815.
- OEIS A144311 (A. Carter 2008; M. Alekseyev 2009; J. Wang 2024), A059861,
  A048670.
- Erdős Problems #687, https://www.erdosproblems.com/687, as edited 2026-08-31;
  the new lower bound's source is the proof-claims thread of #4
  (https://www.erdosproblems.com/forum/thread/4/proof-claims, claim 224)
  and https://github.com/DottedCalculator/ai-math (Erdos_4_GPT_5.6_Sol.pdf),
  Lean formalisation https://github.com/plby/lean-proofs (Erdos4Tilted.lean).
