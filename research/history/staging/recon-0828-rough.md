# recon-0828-rough: the analytic theory of rough numbers and sifted sets in short intervals, read for anything that bounds a largest gap in EVERY window, and the ten angles it produced

<!-- ledger
id: Q-recon-0828-rough
status: ANSWERED
todo: Z2, 0
question: Does the 2000-2026 literature on y-rough numbers, sifted sets and short intervals hold any theorem that lowers Z2 or G2, meaning any control on the largest gap or the minimum count of a sifted set in EVERY short interval, or any structure of rough numbers a gap bound could use?
verdict: No. Ten angles examined, ten killed for this purpose; the strongest every-interval statement in print for one-class rough numbers is Iwaniec's S(x,y,z) >= (4y/log^2 y)(log(y/z^2) - O(1)) for y >> z^2, uniform in x, giving J(P(z)) << z^2, and it is the linear sieve run exactly at its sifting limit beta_1 = 2 with no slack outside it; no two-class analogue exists in print at any exponent, the corpus's own x^4.2665 is beta_2 by the same mechanism, and every remaining branch of the field (Matomaki-Radziwill, Gorodetsky, Friedlander-Iwaniec Cor 6.28, Gafni-Tao) carries the almost-all quantifier, which a second-moment statement can never convert into a bound on one empty window.
-->

*(Literature recon, 2026-08-28. Commissioned against Chris's ask, verbatim:
"we need to find a way to lower both Z2 and G2 ... We need something that can
punch through this hole. Do some wide searches online for potential angles."
Area: the analytic number theory of y-rough numbers, sifted sets and short
intervals, 2000-2026. Own new file only. No existing file was edited, no git
command was run, `research/qc.js` was not run. Nothing here is integrated into
a live document. Sources are marked **[SOURCED]** when read at a page image this
session with the sha256 recorded in section 9, **[SOURCED-BIB]** when only the
record was verified, **[MEMORY]** otherwise. Corpus numbers are **[CITED]** and
were never recomputed, per the standing compute rule.)*

---

## 0. Verdict, disconfirming half first

**Nothing found lowers Z2 or G2 by any amount, and the count is ten examined,
ten killed for that purpose.** The prior said this would happen and it did. This
is the twenty-second consecutive import-style pass that opens no route.

**Three of the ten angles were already in the corpus before this pass ran, in
more detail than this pass adds**, and that is the honest first line of the
report rather than a footnote. `covering-dive.md` section 1.2 already carries
Iwaniec's every-interval theorem verbatim from Granville, already identifies it
as the linear sieve at its sifting limit, and already tables the beta_2 values.
`attack-obstruction-audit.md` section 3(d) already carries Granville's
Siegel-zero obstruction and already computes that it does not reach the zone
width. `research/SEARCH-CONVENTIONS.md` section 4 already closes "improve the
constant". A briefer sending an agent at this area again should read those three
first and skip most of what follows.

**What this pass adds that the corpus did not hold**, all of it calibration and
none of it a route:

1. The almost-all versus every-interval wall now has two published thresholds
   attached rather than a slogan (section 3): almost-all works from window
   length `H` with `H/log y -> infinity`, every-interval needs `H >> y^2`. The
   ratio is `y^2/log y`, and that ratio is the whole of the Jacobsthal problem.
2. A one-line reason no variance theorem can ever bound Z2, however sharp
   (section 3.3). A single empty window is invisible to a second moment.
3. Gafni-Tao, *Rough numbers between consecutive primes*, arXiv:2508.06463
   (August 2025), which is absent from this corpus and is the sharpest live
   illustration of the quantifier wall (section 4).
4. Confirmation at page image that no published lower bound on `beta_2` exists,
   read from the source the corpus cites for the upper values but had not read
   this way (section 6). Selberg's `2*kappa + 19/36` is what the `Lambda^2
   Lambda^-` sieve achieves, not a floor anybody proved.
5. Two channel gotchas (section 9), one of which would silently void a future
   negative.

**And one number that decides the shape of the whole area, stated flatly.** Even
a complete solution of the two-dimensional sifting-limit problem does not reach
the target. The best conjectural value in the field for `beta_kappa` is
`2*kappa + 19/36`, which reads `4.53` at `kappa = 2`, and the best proven is
`4.2665`; Selberg's asymptotic shape `2*kappa` reads `4`. The target exponent is
`2`. So the sieve-side ceiling on any conceivable gain is `4.2665 -> 4`, a factor
of `1.067` on the exponent against a required factor of `2.13`. `REFUTED.md`
already records "improving beta_2" as CLOSED; what this pass adds is that even
the fantasy version of that route falls short by more than the route would gain.

---

## 1. What the brief asked for, restated as a test each angle had to pass

An angle counts only if it does one of three things.

- **(T1)** Bounds the largest gap between elements of a sifted set, in EVERY
  window, at some exponent. This is the object `G2(x#)` is.
- **(T2)** Bounds from below the count of a sifted set in EVERY short interval,
  at a window length that is a power of `y` below `2` at two classes. This is
  what `Z2` needs.
- **(T3)** Supplies structure of rough numbers that a gap bound could consume,
  meaning an inequality the corpus does not already have in exact form.

**"Almost all intervals" fails T1 and T2 by construction and is labelled so at
every occurrence below.** A statement holding outside an exceptional set of
density zero says nothing about the single worst window, and the single worst
window is the entire content of both `G2` and `Z2`. This is not a quibble about
strength. It is a difference in what is being asserted.

---

## 2. Angle 1. Iwaniec's every-interval lower bound, the one-class Zone Postulate

**The theorem [SOURCED**, Granville, *Sieving intervals and Siegel zeros*, Acta
Arith. 205 (2022) 1-19 = arXiv:2010.01211, section 1 p. 3, read at page image,
sha256 in section 9, attributing it to Iwaniec, *On the problem of Jacobsthal*,
Demonstratio Math. 11 (1978) 225-231, itself **[NOT REACHED]]**. With
`S(x,y,z) := #{n in (x, x+y] : (n, P(z)) = 1}`, if `y >> z^2` then

> `S(x, y, z) >= (4y/(log y)^2) * (log(y/z^2) - O(1))`

uniformly in `x`, and uniformly for `2 < u <= 3`,
`S(x,y,z) >= (f(u) - c/log y) * prod_{p<=z}(1 - 1/p) * y` with
`f(u) = 2 e^gamma log(u-1)/u`. Consequence, in Granville's own words at the same
page: `J(P(z)) << z^2`, hence `J(m) << (omega(m) log omega(m))^2`, and Iwaniec
"deduced (cleverly) that this upper bound then holds for all integers m".

**What it bounds in its own convention.** The minimum, over all positions `x`, of
the number of `z`-rough integers in a window of length `y`. It is a one-class,
dimension-one, every-interval statement, and it is the strongest one in print.
The interval length as a power of `y` is `u = log y / log z` with the threshold
at `u = 2`, and the bound degenerates to nothing at `u = 2` exactly, since
`f(2) = 0`.

**Translation to G2 or Z2.** Exact at the object and worthless at the exponent.
Substituting `Omega_p = {a_p, a_p - 2}` moves the sifting dimension from `1` to
`2`, `f` and `F` change with it, and the positivity threshold moves from
`beta_1 = 2` to `beta_2 = 4.26645`, which is the corpus's own bound
[CITED, `paper/beta2-note.md`]. So this theorem does not lower the exponent; it
is the theorem the corpus's exponent already comes from, at the other dimension.

**Does it extend to two classes.** Not in print. `SEARCH-CONVENTIONS.md` section
3 records "Published upper bound on `G2` at any exponent? None found", searched
in the owning convention, and nothing this pass found contradicts it.

**Circularity: CLEAN.** A published theorem carries no hypothesis of
postulate strength.

**Why the existing closures already kill it.** `SEARCH-CONVENTIONS.md` section 4
closes "improve the constant" and `covering-dive.md` section 1.3 already
identifies `beta_1 = 2` as the one-class miracle, in the sentence "the sifting
limit (2) equals the twin-critical exponent (2)". This angle re-confirms both at
a source read again this session and adds nothing.

**One datum this pass did add, and its price.** Mercer, *Dirichlet's theorem and
Jacobsthal's function*, INTEGERS 18 (2018) #A26, p. 3 **[SOURCED**, page image,
sha256 section 9**]**: `h(n) <= C (n log n)^2 ~ C p_n^2` is Iwaniec's bound; a
bound `h(n) <= C p_n^{2 - epsilon}` for all `n` "would lead to a short proof of
Linnik's theorem and Dirichlet's theorem"; and even the weaker `h(n) = o(p_n^2)`
gives a short proof of Dirichlet. `covering-dive.md` carries the Linnik half via
Vaughan. **The Dirichlet half at `o(p_n^2)` is new here.** It does NOT price the
corpus's target: `G2 >= g` pointwise, so a two-class exponent of `2` implies
nothing below `2` at one class, and no Linnik price attaches to it. Recording it
so the false alarm is not raised later.

---

## 3. Angle 2. The almost-all branch, and the exact width of the quantifier wall

This is the largest single body of relevant literature and all of it fails T1
and T2. What is worth extracting is where the two thresholds sit, because the
distance between them is a clean statement of the difficulty.

### 3.1 The almost-all threshold, from the sieve-weight variance

**[SOURCED-BIB**, Friedlander-Iwaniec, *Opera de Cribro*, AMS Colloq. Publ. 57
(2010), Prop. 6.26 and Cor. 6.28, quoted second-hand at Gorodetsky
arXiv:2111.00853v3 p. 2, read at page image this session; the book itself
**[NOT REACHED]**, and `SEARCH-CONVENTIONS.md` row 55 already records Prop.
6.26's dimension as OWED, which this quotation does not settle**]**: if
`y <= X^{1/20}` and `H/log y -> infinity`, then
`sum_{x < n <= x+H} alpha_y(n) asymp H * P_y` for **almost all** `x` in
`[X, 2X]`, where `alpha_y` is the `y`-rough indicator and `P_y = prod_{p<=y}(1 - 1/p)`.

**So the almost-all statement holds from window length barely above `log y`.**
The every-interval statement needs `y^2`. The ratio is `y^2/log y`. Everything
in this field lives on one side of that ratio or the other, and no result found
this session crosses it.

### 3.2 Gorodetsky's variance, read at source for its quantifier

**[SOURCED**, Gorodetsky, *The variance of integers without small prime factors
in short intervals*, Math. Z. 308 (2024) Paper 59 = arXiv:2111.00853v3, Thm 1.1
p. 2 and Cor. 1.2 p. 2, read at page image, sha256 section 9**]**. Theorem 1.1
gives `V(X,H,y) ~ M(H,y)` under `y >= (2+eps) log H` and the range condition
`(1+a) log H/loglog H <= (1-eps) log X/log y` with `a = loglog H/log y`.
Corollary 1.2 is stated with the words **"for almost all x in [0,X]"**.

**A correction to a fetch, recorded because it is the failure mode this repo
keeps hitting.** The summarising fetcher, given the abstract page alone, asserted
that the conclusion "appears to be an 'every interval' statement rather than
'almost all intervals'". It is not. The corollary says almost all, in those
words, on the page. Text summarisation is not reading, and an abstract does not
carry a quantifier that the corollary carries.

**Translation to Z2: none, and the reason is structural rather than a matter of
range.** See 3.3.

### 3.3 Why no variance theorem can ever bound Z2 or G2, in one line

The quantity `Z2` asks whether one particular window of length about `p^2` is
empty. A window of length `H` that is empty rather than carrying its expected
`H * P_y` survivors contributes `(H P_y)^2 / X` to the variance
`V(X,H,y) = (1/X) sum_x (count(x) - H P_y)^2`. The variance itself is of size
`M(H,y)`, which Theorem 1.3 places at or below `Psi(H,y)`, the count of
`y`-smooth integers up to `H`. **A single exceptional window is therefore below
the error term of any variance asymptotic by a factor that grows with `X`, so it
is invisible to a second moment at every level and for every sharpness.** This
is not a defect of Gorodetsky's range. It holds for any second-moment statement
about this object, including the corpus's own `Var/E` work, and
`variance-note.md` section 4 already says the same thing in its own words
[CITED]. Recording it here in the form that kills the whole branch at once.

**Circularity: CLEAN, and irrelevant.** The angle fails on the quantifier before
circularity is reached.

**Existing closures.** Import row 17 (LANDED 2026-08-28) already closed the
repulsive-process reading of `Var/E` in both signs and demoted the
hyperuniformity reading to sub-Poisson. Import row 15's anatomy note already
found Gorodetsky's `lambda(s)` sitting 12x to 23x below the corpus's measured
dispersion. Nothing in this pass revives either.

### 3.4 Matomaki-Radziwill

**[SOURCED-BIB**, *Multiplicative functions in short intervals*, arXiv:1501.04585,
Ann. of Math. 183 (2016); *Multiplicative functions in short intervals II*,
arXiv:2007.04290**]**. The theorem controls a bounded multiplicative function in
**almost all** intervals of length `h` with `h -> infinity`, with power-saving
uniformity in II. The `y`-rough indicator is `chi_0 mod y#`, the principal
character, so the input is admissible and maximally pretentious.

`import-entropy-decrement.md` already graded this residual on 2026-08-27 and
recorded it as "unpriced: Matomaki-Radziwill in short intervals, which accepts
pretentious inputs but carries the almost-all quantifier" [CITED]. **Priced now,
and the price is that it is the wrong quantifier and cannot be made the right
one**: the theorem's conclusion is an `L^1` average over starting points, and no
averaging statement produces a bound at a prescribed start. Dead by 3.3's
mechanism, one rung weaker (first moment rather than second).

---

## 4. Angle 3. Gafni-Tao, rough numbers between consecutive primes

**The theorem [SOURCED**, arXiv:2508.06463 abstract page, fetched raw and hashed,
section 9; authors Ayla Gafni and Terence Tao; submitted 8 August 2025; no
journal reference on the record**]**, abstract verbatim in its load-bearing half:

> "Using a sieve-theoretic argument, we show that almost all gaps `(p_n, p_{n+1})`
> between consecutive primes `p_n, p_{n+1}` contain a natural number `m` whose
> least prime factor `p(m)` is at least the length `p_{n+1} - p_n` of the gap,
> confirming a prediction of Erdos. In fact the number `N(X)` of exceptional gaps
> with `p_n` in `[X,2X]` is shown to be at most `O(X/log^2 X)`."

**Absent from this corpus.** Zero occurrences of `2508.06463` or `Gafni` across
every markdown file, checked this session.

**What it bounds in its own convention.** The existence of one `h`-rough number
inside a window of length `h`, for almost every window of a specific arithmetic
family. In the coordinate this recon uses that is `u = 1`, since the roughness
threshold equals the window length.

**Translation to Z2.** None, and the direction of the failure is worth stating
because it is the wall in miniature. At `u = 1` the every-interval statement is
FALSE at one class (windows of length `y` with no `y`-rough number exist in
abundance), and the almost-all statement at `u = 1` is a theorem of 2025 that
took the singular-series asymptotics of Montgomery and Soundararajan to prove. At
`u = 2` the every-interval statement is Iwaniec's theorem. **The exceptional set
is where the whole difficulty lives, and this paper measures it rather than
removes it**: `O(X/log^2 X)` exceptional gaps against `~X/log X` gaps total is a
proportion `1/log X`, going to zero and never reaching zero.

**Circularity: CLEAN.** **Payoff: PUBLISHED-ANCHOR**, and a good one, since it is
the field's own most recent statement of exactly the quantifier the programme
cannot use. **No exponent.**

---

## 5. Angle 4. FKMPT and the long-gaps machinery

**[SOURCED-BIB** via the corpus, Ford-Konyagin-Maynard-Pomerance-Tao, *Long gaps
in sieved sets*, JEMS 23 (2021) 667-700, Corrigendum JEMS 25 (2023) 2483-2485**]**.

**Already landed in this corpus twice over** (`covering-dive.md` section 2.3,
`two-class-lower-bounds.md` sections 1-2a, import row 13), including the
one-dimensionality disclaimer quoted verbatim from Tao's blog and from the
paper's own section 1.1. Nothing this pass found changes any of it. The forward
citation graph was walked by DOI `10.4171/jems/1020` on OpenAlex this session:
three citing works, one of which is Dietmann-Elsholtz-Kalmynin-Konyagin-Maynard,
*Longer gaps between values of binary quadratic forms*, IMRN 2023 (12)
10313-10349 **[SOURCED-BIB]**, which is a **lower** bound on gaps for a sieved
set of dimension `1/2`. Wrong direction and wrong dimension.

**Translation to G2: raises a floor, never a ceiling.** `G2(x#) >> x log x` from
published ingredients is already the corpus's own [CITED, import row 13,
adversary-confirmed, not refereed]. A better lower bound makes the target
harder, not easier.

**Circularity: CLEAN. Existing closures: `REFUTED.md`'s "the two-class
driving-term route" and "the distortion method as a route to an interval bound"
lines both bear on this family and neither is disturbed.**

---

## 6. Angle 5. The sifting limit at dimension two, read for a floor

**The claim being tested.** A published lower bound on `beta_2` would close the
exponent question outright. `REFUTED.md` records "'a floor at 4', and the band
(4, 4.2665]" as REFUTED on 2026-08-18, on the ground that no `kappa = 2` sifting
limit below `4.2665` is exhibited.

**Read at source this session [SOURCED**, Franze, *Sifting limits for the
Lambda^2 Lambda^- sieve*, arXiv:1012.3809, pp. 2-3 and p. 11, page image, sha256
section 9**]**: "Selberg proved that for sufficiently large `kappa`, this sieve
yields `beta_kappa <~ 2*kappa + 19/36`", and at p. 11 the matching statement
"the sifting limit `beta_kappa >~ 2u + 1 = 2*kappa + 19/36`, upon taking
`d = -7/72`". Both statements are about what the `Lambda^2 Lambda^-` sieve
achieves. His Table 1 reads DHR `4.266` and `Lambda^2 Lambda^-` `4.516` at
`kappa = 2`, with Blight's `beta_2 < 4.45` cited on the same page.

**Verdict: the corpus's REFUTED row is CONFIRMED, at a source it cites for the
upper values and had not read for this question.** There is no published floor on
`beta_2`. There is also no published route below `4.2665` at `kappa = 2`.

**The number that matters for Chris's ask.** Suppose the whole `kappa = 2`
sifting-limit problem were solved tomorrow at Selberg's own asymptotic shape.
`2*kappa = 4` at `kappa = 2`. The target is `2`. **The entire available gain on
this axis is `4.2665 -> 4`, and the required gain is `4.2665 -> 2`.** The sieve
axis cannot reach the target even in the limit of its own best conjecture, which
is a stronger statement than "unimproved since 2008" and is the reason to stop
looking at it rather than the reason to look harder.

**Circularity: CLEAN.** **Payoff: WALL-ADDRESS, quantified.**

---

## 7. Angle 6. Granville's Siegel-zero sharpness, and whether it has a
dimension-two analogue

**[SOURCED**, Granville arXiv:2010.01211 Corollary 1 p. 3 and the surrounding
discussion, page image, sha256 section 9**]**. Under infinitely many Siegel
zeros: for each fixed `v > 1` there exist arbitrarily large `x, X, y, z` with
`y = z^v` such that `S(x,y,z) = (F(v)+o(1)) G(z) y` and
`S(X,y,z) = (f(v)+o(1)) G(z) y`; and for `1 < v <= 2`, since `f(2) = 0`, there
exist arbitrarily large `X` with `S(X,y,z) = o(y/log y)`.

**Why this is the sharpest obstruction in the area.** Selberg's parity examples
are sets defined by the parity of `Omega`, and are not instances of the
Jacobsthal problem at all. Granville's examples are actual intervals sifted by
actual primes. So the `u = 2` threshold is not merely what the axioms determine;
it is conditionally what the real problem does.

**This is already in the corpus.** `attack-obstruction-audit.md` section 3(d)
carries it, with the reading that it does not reach the target, because
`k (log k)^B = k^{1+o(1)} < k^2` for every fixed `B` [CITED]. That reading stands
and is not re-derived here.

**The question the corpus has not asked, and it is the only unexecuted item this
recon produced.** Granville's paper is `kappa = 1` throughout; the `kappa` that
appears later in it is the Siegel exponent, not the sifting dimension, checked
by reading every occurrence. Siebert, *Sieve methods and Siegel's zeros*, Studies
in Pure Mathematics (Turan memorial volume), Birkhauser 1983, 659-668
**[SOURCED-BIB**, record only, text not reached**]** is the earlier version and is
described as treating the linear Selberg sieve, again `kappa = 1`. **So: is there
a dimension-two analogue of the Siegel-zero construction, which would show
conditionally that the two-class interval count can be `o(expected)` for
`u < beta_2`?**

**Priced honestly, and the price is why it was not run.** Its payoff would be
CLOSURE and WALL-ADDRESS. **Its direction is wrong for the ask**: it can only
make the picture worse, never lower an exponent. And even at full strength it
would not refute the Zone Postulate, because `o(expected)` is not `0` and `Z2`
needs only one survivor. So it is a legitimate future row and it is not the thing
Chris asked for. **Circularity: CLEAN.**

---

## 8. Angles 7 to 10, killed shorter

**Angle 7. Fourier, Bohr and Ramanujan structure of sifted sets.** Finite
Ramanujan expansions of `G`-sifted indicators exist in print (the coefficients
vanish for `q` with a prime factor below the sifting level)
**[SOURCED-BIB**, the finite-Ramanujan-expansion family, arXiv:1612.03136 and
arXiv:1705.07193**]**. They are exact identities for an object the corpus already
holds exactly: `varE-spectral.md` section 1's structure factor
`S(nu) = delta * prod_p f_hat_p(nu_p)` with the CRT twist, verified there to
`2.9e-7` [CITED]. **An exact Fourier expansion of a set whose spectrum is already
known exactly carries no new information about its largest gap.** The only
inequalities the convention supplies are `L^2` (large sieve, Parseval), and
import rows 5 and 6 closed that conversion in 2026-08-19 with the finding that
`||Theta * S_H||_2 = rms(R_H)` exactly, so the conversion IS the sharp maximal
law. Dead, and dead by an existing closure rather than by this pass.

**Angle 8. Hyperuniformity and number variance beyond row 17.** Nothing new
found. Row 17 landed 2026-08-28 and closed the repulsive and attractive readings
in both signs on `g(2) = 0` and `g(6) >= 2.38`, and demoted the hyperuniformity
reading. No sieved-set instance of a hyperuniformity theorem exists, which
`SEARCH-CONVENTIONS.md` row 46 already records. Dead.

**Angle 9. Friedlander-Granville "all intervals" for smooth numbers.**
*Smoothing "smooth" numbers*, Philos. Trans. Roy. Soc. London A 345 (1993)
339-347 **[PARTIALLY SOURCED**, the author's hosted PDF was fetched and hashed
(section 9) but is set in Type 3 bitmap fonts and extracts garbled; only the
introduction's sentence structure is legible, and no theorem is quoted from it
here**]**. Two independent reasons it does not transfer, both legible in what
was extracted. The object is `Psi` (smooth), not `Phi` (rough), and the two are
not complementary at the level of a gap statement. The window length is of order
`sqrt(x)` times a power of `y`, which is enormously longer than `y^2` and is not
a short interval in the sense this recon needs. Dead. Recorded so the promising
phrase "all intervals" in the secondary literature does not send a future pass
here again.

**Angle 10. Erdos's problems, re-swept for rough numbers rather than for
Jacobsthal.** The site's path-encoded search was run this session on `rough`,
`Jacobsthal` and `coprime to`, calibrated against the corpus's own recorded
result (`/search/Jacobsthal` returns exactly #687 and #970, which it did). The
`rough` query returns #335, #460, #625, #669 and #831; four are off-topic
(sumsets, cochromatic number, orchard problem, circles) and one is on-topic:
**#460, Eggleton-Erdos-Selfridge**, the greedy sequence `a_k` of integers with
`(n - a_k, n - a_i) = 1`, where `a_k < k^{2+o(1)}` is proven for `k` large
depending on `n` and `a_k << k log k` is conjectured; the site's commentary notes
that a positive answer follows from
`f(n) = sum_{a<n} 1_{P^-(n-a) > a} / a -> infinity`, and that standard rough
number estimates give divergence on average but not for all `n`.
**Adjacent, one class, and not a gap bound**: `a_k` is a greedy coprimality
sequence relative to a single `n`, and its `k^{2+o(1)}` is the same exponent from
the same sieve, at the same dimension. **The corpus's finding that no Erdos
problem number poses two-class Jacobsthal is unchanged**, and now also holds
against a `rough`-keyed query rather than only a `Jacobsthal`-keyed one. Dead as
a route; the extra query is worth one line in `SEARCH-CONVENTIONS.md` section 3.

---

## 9. Channels, calibrated before any negative was written, and two gotchas

Per `SEARCH-CONVENTIONS.md` section 5. Every calibration below was run in the
same session as the queries it certifies.

| channel | calibration, same session | result |
|---|---|---|
| OEIS text API (`fmt=text`) | `2,4,6,10,14,22,26,34,40,46,58,66` | -> A048670, correct |
| zbMATH open API | `Buchstab function` | -> Bukhshtab records; PASS. The section 5 gotcha held: `sifted set maximal gap upper bound dimension two` answered HTTP **404**, which is a NEGATIVE on that channel and not a failure |
| OpenAlex | `title.search:long gaps in sieved sets` | -> count 2, `W2788886212`, correct. Conjunctive filters are comma-separated and worked |
| WebSearch | `Kourbatov maximal gaps between twin primes arXiv 1301.2242` | -> arXiv:1301.2242 first hit |
| erdosproblems.com, path-encoded | `/search/Jacobsthal` | -> exactly #687 and #970, matching the corpus's recorded calibration |
| arXiv API, `export.arxiv.org`, https | `ti:"Long gaps in sieved sets"` | **HTTP 429, 14 bytes, all session.** Dead today, exactly as the brief warned. The `http://` form returns empty rather than a code |
| Semantic Scholar graph API | `long gaps in sieved sets` | **HTTP 429.** Dead today |
| PDFs at page image, `pdftotext -layout` | five documents, sha256 below | four extract cleanly; one does not, see gotcha 2 |

**MathSciNet `mrlookup` was NOT run this session, and Google Scholar was reached
only through WebSearch rather than directly.** Both are owed on any negative
below that a future pass wants to lean on.

**Gotcha 1, and it would silently void a negative.** On OpenAlex, the query
`title_and_abstract.search:Jacobsthal function` returns **274 works, and the
first 25 are all about the Jacobsthal RECURRENCE** `a_n = a_{n-1} + 2 a_{n-2}`:
`k`-Jacobsthal quaternions, Jacobsthal-Lucas octonions, bi-periodic
Jacobsthal-Padovan numbers. **Zero of the first 25 concern the gap function.** A
pass that searched OpenAlex on the object's own name and read the first page
would conclude the field is combinatorial-sequence work and record a clean, false
negative. The owning convention for the gap object on that channel is the
sentence forms in `SEARCH-CONVENTIONS.md` section 1, never the surname.

**Gotcha 2.** `dms.umontreal.ca/~andrew/PDF/psinshorts.pdf` is set in Type 3
bitmap fonts. `pdftotext -layout` returns mojibake, and the summarising fetcher
correctly refused to answer from it. Any quotation from that paper must come from
a different copy. This is the same class of hazard as the corpus's standing rule
that text extraction is not reading.

**Artifacts fetched and hashed this session** (scratchpad, not repo):

| document | URL | sha256 |
|---|---|---|
| Granville, *Sieving intervals and Siegel zeros* | `arxiv.org/pdf/2010.01211` | `35a6aa6a7dac4b1af9b6c66dd1dc564270649be763253bb9b5a1d0b9a78d79ac` |
| Franze, *Sifting limits for the Lambda^2 Lambda^- sieve* | `arxiv.org/pdf/1012.3809` | `a2c1b516c4f0ee5c77397fac1c513bf6f4aeb1d6c89c457ff087c4e4956e572d` |
| Gorodetsky, *The variance of integers without small prime factors in short intervals* | `arxiv.org/pdf/2111.00853v3` | `069d1a4cd91db35c3ef618c5b64a16ea30e33fe2773d844383f4bb84360ca7a8` |
| Mercer, *Dirichlet's theorem and Jacobsthal's function* | `math.colgate.edu/~integers/s26/s26.pdf` | `c03e99352b72a56689ad4f67348b7398a91cc613288e31f0d29388449b4b3cb3` |
| Gafni-Tao, *Rough numbers between consecutive primes*, abstract page | `arxiv.org/abs/2508.06463` | `5595992cf96b35599300761eabcae9f1ff075a7db0e6457236c43dbe2b940df1` |
| Friedlander-Granville, *Smoothing "smooth" numbers* (unreadable, see gotcha 2) | `dms.umontreal.ca/~andrew/PDF/psinshorts.pdf` | `3197fa7258cebabba07f7ec373fc8ccce855226b489edf1f85cf2f9761daaab5` |

---

## 10. What this owes, and what it declines

**Owed, and NOT applied, because this pass edited no existing file.**

1. `TODO.md` items Z2 and 0 do not carry `Ledger: Q-recon-0828-rough` on a
   `Ledger:` line, so `research/qc/questions.js`'s gate will report this note as
   naming an item that does not acknowledge it. That is a correct report and the
   fix belongs to whoever integrates this.
2. One candidate row for `SEARCH-CONVENTIONS.md` section 3: *Does the Erdos
   problem corpus hold a rough-number gap problem? No; `/search/rough` returns
   five problems, one on-topic (#460, one class, a greedy coprimality sequence,
   not a gap bound); settled 2026-08-28, calibrated in the same minutes.*
3. One candidate row for the same file's section 5 or a channel note: the
   OpenAlex Jacobsthal-recurrence trap, gotcha 1 above.
4. `PRIOR-ART.md` and `IMPORT-MAP.md` are untouched. Gafni-Tao arXiv:2508.06463
   has no home in either and should get one.

**Declined.** No new import-map row is proposed. The one unexecuted question this
recon produced (section 7, a dimension-two Siegel-zero construction) points the
wrong way for the ask, and proposing it as a row while Chris is asking for a
route down would misrepresent what it can deliver.

---

## 11. What would falsify this, and whether that check has run

**Claim A: no published theorem controls the largest gap or the minimum count of
a two-class sifted set in every short interval, at any exponent.** Falsified by
exhibiting one. **Checks run:** zbMATH in three owning-convention phrasings, one
of which returned HTTP 404 and is therefore a negative on that channel; OpenAlex
title and abstract search; forward citation walks by DOI on
`10.4064/aa201002-25-6`, `10.1007/s00209-024-03601-w` and `10.4171/jems/1020`,
totalling nine citing works, each title read; WebSearch in five phrasings. **Not
run:** MathSciNet `mrlookup`, which is available and free per
`SEARCH-CONVENTIONS.md` section 5 and was not used; the arXiv API, dead at 429
all session; Google Scholar directly. **So Claim A rests on five channels and
owes three.** It agrees with the corpus's own standing negative, which is
independent evidence and is also not proof.

**Claim B: the almost-all branch cannot bound Z2, for a structural reason and
not for a range reason.** Falsified by any second-moment or first-moment average
statement that implies a bound at a prescribed position. **Check run:** the
arithmetic of 3.3, which is one line and is derived here rather than measured.
**Not run:** a search for a published statement of that one line, which would
tell whether the observation is owned elsewhere; the phrase to search is not
obvious and no owning convention for it was identified.

**Claim C: even a solved kappa = 2 sifting-limit problem stops at exponent
`4`, against a target of `2`.** Falsified by a published `beta_kappa` conjecture
below `2*kappa` at `kappa = 2`, or by a sieve whose lower bound is positive below
its own sifting limit. **Check run:** Franze read at page image for both the
achievement and the floor, and the floor is absent; `SEARCH-CONVENTIONS.md`
section 4's table of six sources was not re-run and is taken as [CITED]. **Not
run:** any search for `beta_kappa` conjectures outside the two sieve families
Franze compares.

**Claim D: Gafni-Tao is absent from this corpus.** Falsified by any occurrence.
**Check run:** grep for `2508.06463` and `Gafni` across every markdown file in
the repository, zero hits. That check is complete for markdown and was not run
against the JavaScript producers or the attestation directory.

**Claim E: this pass adds nothing that lowers Z2 or G2.** Falsified by any
reader finding an exponent in it. **Check run:** none beyond the author's own
reading, which is the weakest check in this file and is stated as such. The
adversarial pass every staging note owes has not run on this one, and this note
is HELD like every other.
