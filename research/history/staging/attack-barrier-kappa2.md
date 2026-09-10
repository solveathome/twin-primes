# The kappa = 2 barrier attempt: Granville's exceptional-character construction transfers, satisfies the two-class axioms at level theta approaching 1, and then stops dead at u = 2, which is below the entire open band

<!-- ledger
id: Q-barrier-kappa2
status: CLOSED
todo: 0
question: Does Granville's exceptional-character construction, which makes the Jurkat-Richert f and F attained by interval sieving problems at kappa = 1, transfer to kappa = 2 and supply the missing barrier on wall-note Face 4, so that no class-blind argument can beat beta_2 = 4.26645 on intervals?
verdict: No. Verdict (b): the transfer runs, fixes the axiom obstruction that sift-limit-attack.md section 2 blamed for the mixed-sign sketch's death, and then hits a hard ceiling at u = 2, because the character's only gift is the one-point identity lambda = chi on z-rough integers and a sign pattern with a +1 coordinate is empty exactly when z^2 >= x; above u = 2 the surviving question is the shifted intersection of two positive-density lambda-classes, which is Chowla-strength, so the section 2 verdict stands with a corrected reason; the band (2, 4.26645] is untouched, and the hypothesis itself implies the target by Heath-Brown 1983.
-->

*(2026-08-28. Staging note, HELD pending an adversarial pass. No existing file
was edited and no git command was run, per the session fence. One companion
script, `attack-barrier-kappa2.js`, scratchpad-grade, embedded with
`research/qc/embed.js`. Nothing here is a TPC claim, nothing here lowers an
exponent, and the one thing that lands is a wall address.)*

---

## 0. Bottom line, disconfirming half first

**The attempt fails, and it fails at a point that can be named exactly.** The
verdict is **(b)** in the brief's own numbering. The construction reaches
`u = 2` and stops there, for every choice of character sign pattern, on both the
arithmetic-progression form and the interval form. The open band
`(2, 4.26645]` is not touched at any point, and the corpus should not record
that this route can be pushed further with more work: section 5 gives the
reason the ceiling is exactly 2 and it is an arithmetic identity, not a
technical shortfall.

**The failure point, in one sentence.** The exceptional character supplies a
single arithmetic identity, `lambda(n) = chi(n)` for `z`-rough `n <= x`, which
is a one-point statement; it constrains each coordinate of a two-class problem
separately; the resulting constrained set is empty exactly when a `lambda = +1`
`z`-rough integer below `x` cannot exist, which happens exactly when `z^2 >= x`,
that is `u <= 2`; above `u = 2` the surviving question is whether the shifted
intersection of two positive-density `lambda`-classes is small, and that is a
two-point question the character does not answer.

**Whether the missing input is Chowla-strength: yes, and the corpus's stated
reason for it is wrong.** `sift-limit-attack.md` section 2 records the
mixed-sign twin example `C = {n(n+2) : lambda(n) = -1, lambda(n+2) = +1}` as
dying because "its axioms need two-point lambda-equidistribution at full level:
Chowla-strength, open". Substituting the exceptional character for `lambda`
**pays that off in full**: section 3 below derives the density and remainder
axioms for the character version unconditionally, with dimension exactly 2 and
level `theta` approaching 1, because the character version is periodic and the
`lambda` version is not. The set then dies anyway, at its sifted count rather
than at its axioms, above `u = 2`. So section 2's verdict survives and its
reason does not. That correction is owed and this note cannot apply it.

**A caveat that outranks everything above.** Granville's hypothesis implies the
conjecture this programme is attacking. Heath-Brown proved in 1983 that
infinitely many Siegel zeros give infinitely many twin primes, which the corpus
already carries at `research/bv-import-survey.md` section 2 and which was
re-confirmed at zbMATH in this session. A Siegel-zero-conditional barrier at
`kappa = 2` therefore lives in a world where the target is already a theorem.
It can price a route. It can never be a step along one. Anyone reading this
note as progress toward the conjecture has misread it.

**What did move, at its rung.** One conditional statement lands on Face 4,
where the corpus records none: under a Siegel-zero hypothesis strictly stronger
than Granville's Corollary 1 needs, the `kappa = 2` interval sifting problem
attains the DHR lower bound value zero at sieve parameter `v` approaching 2, so
`beta_interval(2) >= 2` conditionally. That is below the whole open band and
lowers nothing. Angle A12 of `history/staging/recon-0828-jacobsthal.md` moves
from LIVE to CLOSED. Angle A13, the Siebert 1983 chapter, was answered in
parallel this session by a sibling agent and is also closed: Siebert is `kappa`
equal to 1 only, on three independent statements of his theorem, so the
`kappa = 2` extremal example is not already in print there
(`history/staging/lit-siebert-1983.md`). The area's two live angles are
therefore both closed today, and neither closure lowers anything.

---

## 1. Granville's theorem, read at the page

**Source, with custody.** A. Granville, *Sieving intervals and Siegel zeros*,
arXiv:2010.01211v1, Acta Arith. **205** (2022) 1-19. Fetched this session from
the author's copy at
`https://dms.umontreal.ca/~andrew/PDF/Sieve.Remark.20.09.26.pdf`, 376,359 bytes,
sha256 `a5403b56e7aab8dd2f66bbc776e049e1ac470bc8a948abd65d8fe2b6c250281b`,
extracted with `pdftotext -layout`. This confirms the hash
`recon-0828-jacobsthal.md` recorded, on a differently sized download; the byte
count there was 222,744 against 376,359 here, and the sha256 agrees, so the
earlier figure is a transfer artefact and not a different file. Every quotation
below is from that extraction. The **published** Acta Arith. version was not
obtained, and the check that it says nothing above `kappa = 1` has run only on
v1. **[SOURCED]**

**The hypothesis.** Section 2, verbatim: "for any `kappa > 0` arbitrarily small,
there is a sequence `(q_j, chi_j, beta_j)` such that `beta_j >= 1 - kappa/log q_j`
for all `j >= 1`", where each `chi_j` is a **primitive real (quadratic)
character mod `q_j`** and `beta_j` is a real zero of `L(s, chi_j)`. The
quantifier that matters is that `kappa` may be taken arbitrarily small, which
Granville justifies in the same section: if the zeros fail for a small enough
`kappa` then there are none and the whole discussion is vacuous. The working
parameter throughout is `Delta = Delta_beta(x) = (1 - beta) log x`, and the
usable range is his (6): `x >= q^A` with `(1 - beta) log x <= Delta`, for a
large absolute constant `A`.

**The conclusion, Corollary 1, verbatim.** "Assume that there are infinitely
many Siegel zeros. For each fixed `v > 1`, there exist arbitrarily large
`x, X, y, z` with `y = z^v` such that
`S(x, y, z) = (F(v) + o(1)) G(z) y` and `S(X, y, z) = (f(v) + o(1)) G(z) y`."
So both Jurkat-Richert bounds are attained by the **interval** problem
`S(x,y,z) = #{n in (x, x+y] : (n, P(z)) = 1}`, at every fixed `v > 1`, along a
sequence of `x` and `X` that depend on the sequence of Siegel zeros.

**The uniformity, stated honestly.** It is not uniform in `v` and it is not
uniform in `x`. The extremal intervals occur only at the `x` the construction
produces, one per exceptional zero, and Granville says so on his page 6: "It is
feasible that the limits ... might not exist; indeed if the extremal examples
all come from Siegel zeros (as in this paper), and if Siegel zeros are very
spaced out ... then these limits will not exist. Therefore, one needs to work
with lim sup and lim inf". So the theorem is a `lim sup` / `lim inf` statement,
which is exactly what a barrier needs and no more.

**The quantitative machinery, for section 5.** Proposition 1 gives, in the range
`y^{1-epsilon} > z > y^{1/2 - o(1)}`,
`S(X, y, z) <~ 4y (log y)^{-2} log^+(qy/z^2) + (1 - beta) y`.
Proposition 2 gives four regimes of `1 - beta`, of which the second, "if
`1 - beta <= (log q)^{-kappa}` for some fixed `kappa > 1`", is the one this note
uses.

---

## 2. The mechanism, extracted

Three steps, all from the hashed file.

**Step 1, the character captures the primes.** Corollary 4: under the hypothesis,
for `x >= q^A` in range (6) and `(a,q) = 1`,
`pi(x; q, a) = (pi(x)/phi(q)) times O(Delta)` if `chi(a) = 1`, and
`(pi(x)/phi(q)) times (2 + O(Delta))` if `chi(a) = -1`. Primes are pushed out of
the `chi = +1` classes entirely and doubled in the `chi = -1` classes. Tao's
2007 post states the same thing informally, and was fetched this session
(sha256 `7f8042f8b554b80d85602a8a86dbbe48c2775d0b0984bca9c06120fdd87ebf77`):
"the primes can be largely recovered from the almost primes as being those
almost primes which are quadratic non-residues modulo the conductor `q`".
**[SOURCED]**

**Step 2, it propagates multiplicatively.** Theorem 2.1: for `k < u` a positive
integer, `x = z^u`, `(a,q) = 1`,
`pi_k(x, z; q, a) = (1 + (-1)^k chi(a) + O(Delta)) pi_{k,q}(x, z) / phi(q)`,
where `pi_k(x,z)` counts `n = p_1 ... p_k` with all `p_i > z`. The weight
`1 + (-1)^k chi(a)` is `1 + lambda(n) chi(a)`, and since `n` is congruent to `a`
and `chi` is completely multiplicative, `chi(a) = chi(n)`. **So the content of
Theorem 2.1 is the single identity `lambda(n) = chi(n)`, valid for every
`z`-rough `n <= x` outside an exceptional set of size `O(Delta)` in the natural
normalisation.** That identity is the whole gift, and section 5 turns on the
fact that it is a statement about one integer at a time.

**Step 3, the class becomes an interval.** Corollary 5 converts step 2 into
`N(x, z; q, a) = (F(u) + O(Delta)) phi(q)^{-1} prod_{p<=z}(1 - 1/p) x` when
`chi(a) = -1`, and the same with `f(u)` when `chi(a) = +1`, by identifying the
class with Selberg's set `A_+` or `A_-`. Then the proof of Corollary 1 dilates:
let `P_q(z)` be the product of primes up to `z` not dividing `q`, choose `r` with
`rq = 1 mod P_q(z)`, and set `b = ra mod P_q(z)`. Then
`b + j = r(a + jq) mod P_q(z)`, so `(b+j, P_q(z)) = (a + jq, P_q(z))`, and the
interval `j in [0, y-1]` inherits the sifted count of the progression
`a mod q` up to `x = qy`. The primes dividing `q` are handled by deleting one
class each, at a cost `phi(q)/q`, and `u = v + 1/A` with `z = q^A`, so
`F(u) -> F(v)` as `A -> infinity`.

The dilation is the reason the construction reaches intervals at all, and
section 4 is about what it costs at `kappa = 2`.

---

## 3. The kappa = 2 analogue, and the one thing that works

**The problem.** Sift by two classes per prime. The instance the programme cares
about is the twin instance, `{0, -2} mod p` for odd `p` and `{0} mod 2`, so
`omega(2) = 1` and `omega(p) = 2`, dimension `kappa = 2`, which is the
Diamond-Halberstam book's own worked example (`paper/beta2-note.md`, header,
read line-level against Cambridge Tracts 177). The lower-bound function is
`f_2`, and DHR Theorem 6.1 (6.2) gives `f_kappa(u) = 0` for `0 < u <= beta_kappa`,
with `beta_2 = 4.26645028414864191641` (Booker-Browning, `dhr-verification.md`
section 1.1).

**A point of framing the brief blurs, worth fixing before anything else.**
"Making the sifted count sit at the DHR lower bound `f_2(s)`, zero for
`s < beta_2`" is not the content of a barrier, because zero is easy: the empty
set attains it. The content is **how large `u` can be** while a set that
satisfies the axioms still has sifted count `o(G_2(z) |A|)`. That is what
`beta(2) >= u` means, and it is what the rest of this note measures the
construction against.

**The candidate set.** Take a real primitive `chi mod q` with an exceptional
zero, `z = q^A`, `x = z^u`, and a residue class `a` coprime to `q`. Put

  `A = { n <= x : n = a mod q }`,

sifted by `{0, -2} mod p` for every `p <= z`.

**The axioms hold, unconditionally, at dimension 2 and level theta -> 1.** For
`d | P(z)` squarefree with `(d, q) = 1`, the condition `d | n(n+2)` selects
`2^{omega(d)}` classes mod `d`, independent of the class mod `q` by CRT, so

  `#A_d = (2^{omega(d)} / d)(x/q) + O(2^{omega(d)})`,

giving `g(d) = 2^{omega(d)}`, `g(p) = 2`, dimension exactly 2, and
`|r(A, d)| = O(2^{omega(d)})`. Then
`sum_{d <= D, d | P(z)} |r(A,d)| << D log D`, which is
`o(|A| / (log x)^B)` as soon as `D <= (x/q)^{1 - epsilon}`. Since `z = q^A` and
`x = z^u`, the modulus is `q = x^{1/(Au)}`, which is `x^{o(1)}` as `A` grows, so
`D` may be taken to be `|A|^{1 - epsilon}` and the level `theta` approaches 1.
The sieve parameter is `log|A| / log z = u - 1/A`, which approaches `u`.
**[PROVEN, elementary]**

The primes dividing `q` are inside the sieve range, since `q < z`. Removing two
classes at each of them costs the constant factor `prod_{p|q}(1 - 2/p)` and
changes nothing below.

**Why this matters, and it is the one positive result in this note.** The
corpus's own candidate, `C = {n(n+2) : lambda(n) = -1, lambda(n+2) = +1}`, is
recorded as failing because its axioms need two-point `lambda`-equidistribution
in progressions at full level, which is Chowla-strength. The character version
above needs nothing of the kind, because a condition on `chi(n)` and `chi(n+2)`
is a condition on `n mod q`, hence periodic, hence equidistributed in every
progression coprime to `q` by counting. **The axiom obstruction that
`sift-limit-attack.md` section 2 names is removed by the substitution.** What
follows is that the set dies anyway.

---

## 4. The interval transfer is class-preserving, so intervals see only same-sign pairs

Apply Granville's dilation to the two-class problem. With `b = ra mod P_q(z)`
and `rq = 1 mod P_q(z)`,

  `b + j + 2 = r(a + jq) + 2 = r(a + jq + 2q) mod P_q(z)`,

since `r(2q) = 2`. So the two coprimality conditions on the interval,
`(b+j, P_q(z)) = 1` and `(b+j+2, P_q(z)) = 1`, transfer to roughness of
`a + jq` and of `a + (j+2)q`. **Both lie in the class `a mod q`.** The character
assigns one value to the pair, not two.

This is not an artefact of the choice `d = q` for the progression's common
difference. Theorem 2.1's control is a condition modulo `q`, and it is constant
along a progression if and only if `q` divides the common difference `d`; and
then every fixed shift `h` in the transferred interval maps to the shift `hd`,
which is `0 mod q`. So on intervals the construction can only produce
**same-sign** pairs, `(lambda(n), lambda(n+2)) = (epsilon, epsilon)`.

**Mixed signs are reachable on a progression and not on an interval.** On the
progression `A` of section 3, with the actual shift 2, the two coordinates sit
in classes `a` and `a+2`, and `chi(a) = -1` with `chi(a+2) = +1` is available:
the companion script measures the density of such `a` as 0.249752 at `q = 1009`
and 0.249925 at `q = 10007`, converging on `1/4`. That is a positive proportion
of residues mod `q`, not a bounded number of classes, so it cannot be imposed on
the transferred interval by Granville's own device of deleting one class per
prime dividing `q`; and the set of admissible `j` is then not an interval at
all. **[MEASURED, exact character sums, `attack-barrier-kappa2.js` reading 2]**

Two characters do not help. If `chi_1 mod q_1` and `chi_2 mod q_2` both have
exceptional zeros, then on `z`-rough `n` both say `lambda(n) = chi_i(n)`, which
is the same statement twice. There is no second, independent bit to be had.

---

## 5. The ceiling is u = 2, at every sign pattern, and it is an identity

**The vanishing direction, proven.** Let `n <= x = z^u` be `z`-rough with
`lambda(n) = +1`. Then `n` has an even number of prime factors, each greater
than `z`, so `n = 1` or `n > z^2`. If `u <= 2` then `z^2 >= x`, so no such `n`
exists below `x` apart from `n = 1`. Consequently **any sign pattern with a
`+1` coordinate has sifted count at most `1` plus the leakage**, where the
leakage is the count of `z`-rough integers in the relevant class that violate
the identity `lambda = chi`. By Corollary 4 that leakage is
`<< Delta x / (phi(q) log x)`.

**The leakage arithmetic, which forces a stronger hypothesis than Corollary 1
needs.** The `kappa = 2` normalisation is `G_2(z)|A| ~ c u^2 x / (q (log x)^2)`,
against a leakage `~ Delta x / (phi(q) log x)`. The ratio is
`Delta (log x) (q/phi(q)) / (c u^2)`. A fixed `Delta` makes this diverge, so
the construction needs `Delta = o(1 / log x)`, that is
`(1 - beta)(log x)^2 -> 0`. With `log x = Au log q`, the hypothesis
`1 - beta <= (log q)^{-C}` with a fixed `C > 2` suffices. That hypothesis is in
Granville's paper, as the second bullet of Proposition 2, but **his Corollary 5
is stated for a fixed `Delta > 0` and the uniformity used here is not stated at
the source**. Pushing `Delta` below `1/log x` inside Corollary 5's statement is
this note's extension, not a quotation. **[INFERRED, uniformity not stated at
the source; the mechanism is Granville's, the uniformity claim is not]**

**What lands, therefore.** Under the strengthened hypothesis, both the
progression form of section 3 and the interval form of section 4 give sifted
count `o(G_2(z)|A|)` at sieve parameter approaching 2. On the interval form,
take `chi(a) = +1`: both coordinates are forced to `lambda = +1`, both are
therefore absent, and the interval's twin-sifted count is `o(G_2(z) y)` at
`v -> 2^-`. So, conditionally, `beta_interval(2) >= 2`. This is the first
barrier statement of any kind on Face 4, and it sits below the whole open band.
**[CONDITIONAL, on a hypothesis strictly stronger than Corollary 1's, with the
uniformity flagged above]**

**The ceiling direction, and why it is exactly 2.** For `u > 2` the same
arithmetic runs backwards: `z^2 < x`, so `z`-rough integers with `lambda = +1`
below `x` exist, namely products of two primes both above `z`, and they exist in
quantity. Every sign pattern is then nonempty, and the question becomes whether
the **shifted intersection** of two positive-density `lambda`-classes is
`o(G_2(z)|A|)`. Nothing in the character speaks to that. The companion script
measures the transition directly at `x = 2 times 10^7`: the `(-,+)` count is
`0` at `u = 1.6, 1.8, 1.9, 2.0` and `2917, 8902, 29592` at `u = 2.1, 2.2, 2.5`,
and the share of the full `z`-rough pair count carried by that pattern is
`0.025755, 0.070546, 0.168063` at those three values, rising to `0.248549` at
`u = 4.0` and converging on `1/4`. **[MEASURED, `attack-barrier-kappa2.js`
readings 4 and 5, with a control at reading 3 reproducing an independently
computed 107407 twin pairs. The caveat is large and is stated in reading 5: at
this `x` the natural logarithm of `x` is under seventeen, so this is an
illustration of the mechanism and not a measurement of the limit, and it cannot
rule out that the share tends to zero as `x` grows.]**

**The pattern the interval transfer actually delivers is the worst one.** With
`chi(a) = -1`, both coordinates are forced to `lambda = -1`, which for `u < 3`
means both are prime. The construction then selects **every twin prime pair in
range**, which is the largest piece of the sifted set rather than the smallest:
reading 6 measures `107374` of `176077` rough pairs at `u = 2.5` and `107389` of
`261012` at `u = 3.0`. Choosing the `chi = -1` class is the exact opposite of
extremal, and it is the choice Granville uses for his `F` direction, where at
`kappa = 1` it is correct.

**Why the ceiling is 2 and not some other number, stated once more.** The
character forces parity. Parity forbids a `z`-rough integer only when the
smallest admissible even factorisation, a product of two primes both above `z`,
already exceeds `x`. That is `z^2 >= x`, that is `u <= 2`. At `kappa = 1` this
ceiling is not binding, because `beta(1) = 2` and the ceiling is the answer.
At `kappa = 2` the ceiling is `2` and the target is `4.26645`, so the method
covers none of the gap. This also explains, without needing a search, why
Granville's paper contains no statement above `kappa = 1`: there is nothing
above `kappa = 1` for the method to say.

---

## 6. What the character supplies about pair correlations, and why it is the wrong sum

The brief's conjecture on this point is **correct as stated and does not help**,
and both halves are worth recording.

**The correlation is available, unconditionally.** For `q` an odd prime and
`chi` the Legendre symbol,
`sum_{n mod q} chi(n) chi(n+2) = sum_{n mod q} chi(n^2 + 2n) = sum_{m} chi(m^2 - 1) = -1`,
exactly. The companion script confirms `-1` at all fourteen prime moduli tried,
`11` through `10007` **[MEASURED, reading 1]**. For general squarefree `q` the
sum factors over the prime divisors and has absolute value 1. So the two-point
input that the `lambda` version of the sketch could not obtain **is** obtainable
for `chi`, with no Chowla hypothesis, exactly as the brief guessed.

**It is the wrong sum, and the reason is a degeneracy.** Over the residue class
`a mod q`, which is where the construction lives, `chi(n) chi(n+2)` is the
**constant** `chi(a) chi(a+2)`. A constant carries no information about the
class's sifted count. Over an interval the sum is genuinely non-constant, but
the identity that would convert it into information about `lambda` holds only on
`z`-rough integers, so writing

  `T = sum_{n in I, n and n+2 both z-rough} lambda(n) lambda(n+2)
     = chi(a)chi(a+2) times S_2(A, z)`

reintroduces the sifted count on the right-hand side. The correlation and the
sifted count are the same object up to a sign, and the identity is therefore
empty. Detecting roughness by sieve weights instead, to reach the unrestricted
character sum where Weil applies, replaces `T` by a bilinear sum over pairs of
moduli `d, e` up to the level, and completing each residue class costs `q^{1/2}`
per pair; that is affordable, and it delivers a bound on the unrestricted sum,
which is the sum that was already known and was already useless.

**So the Chowla-strength requirement is relocated, not removed.** It leaves the
axioms, where the character pays it off completely (section 3), and reappears at
the sifted count, where it is worse: no longer a hypothesis one could assume and
proceed from, but the conclusion itself, and where both the standard pair
heuristic and the measurement of section 5 say the conclusion is false above
`u = 2`. `sift-limit-attack.md` section 2's verdict stands. Its stated reason
does not.

---

## 7. The hypothesis implies the target, which is the honest circularity grade

D. R. Heath-Brown, *Prime twins and Siegel zeros*, Proc. London Math. Soc. (3)
**47** (1983) 193-224, Zbl 0517.10044, keywords "existence of Siegel zeros;
existence of infinitely many prime twins", read at the zbMATH record this
session; quantified by Tao and Teräväinen, arXiv:2112.11412. The corpus already
carries it at `research/bv-import-survey.md` section 2, with the right reading:
"a catastrophic failure of equidistribution would also settle our question, in
our favor". **[SOURCED-BIB for the paper; SOURCED for the zbMATH record]**

Three consequences for this note.

1. **The barrier, had it worked, would still have been a route-pricing device
   and nothing more.** Under Granville's hypothesis the twin prime conjecture is
   a theorem, so a conditional `kappa = 2` barrier can never be a step toward
   it. The logically useful form is the contrapositive, which is the form
   Granville himself extracts at `kappa = 1` when he reproves Motohashi: an
   unconditional class-blind improvement below the sifting limit would disprove
   the existence of Siegel zeros. That shape is real, and this note does not
   reach it.
2. `recon-0828-jacobsthal.md` grades A12's circularity CLEAN "because the
   hypothesis is believed false". The stronger and correct reason is that the
   hypothesis **implies the target**. The grade is unchanged and the reason
   should be.
3. **Do not generalise the section 5 ceiling into a claim about Siegel zeros.**
   Heath-Brown uses the same exceptional character to obtain a genuinely
   two-point conclusion about the twin problem. So "an exceptional character
   supplies only one-point information" is false. What is true, and all that is
   true, is that **Granville's transfer** supplies only one-point information.
   The failure here is a failure of a transfer. Reporting it as a theorem about
   the hypothesis would be an overstatement of exactly the kind this repository
   exists to prevent.

A speculation, marked as such and load-bearing on nothing: since Heath-Brown's
world is the one in which the twin problem gets *easier*, it is plausible that
no `kappa = 2` extremal example exists under Siegel zeros at all, which would
mean the barrier on Face 4 is not merely unproven by this route but unreachable
by it. No check on that has run. **[SPECULATION]**

---

## 8. Verdict, and what it buys

**Verdict (b).** The exact failure point is the shifted intersection of two
positive-density `lambda`-classes at `u > 2`, and the input needed to bound it
is Chowla-strength, so the corpus's section 2 verdict stands and the barrier is
not provable this way.

**It is not (a).** The band `(2, 4.26645]` is untouched at every point.

**It is not (c) either, and the reason is worth one line.** Attaining the upper
bound `F_2` requires a *lower* bound on the same two-point count, which is
Hardy-Littlewood-strength and therefore strictly harder than the upper bound
this route already cannot obtain. Neither DHR bound is attained above `u = 2`.

**What lands, priced.** A wall address, and a small one.
`beta_interval(2) >= 2`, conditional on a Siegel-zero hypothesis strictly
stronger than Corollary 1 needs, with the uniformity flagged in section 5.
Face 4 moves from "the programme has no barrier result on this face" to "one
conditional barrier result, at exponent 2, below the whole open band". **It
lowers nothing.** The constant-shift structure `twin slots = S_1 intersect
(S_1 - 2)` is not established as the only remaining input, because the band that
would have to be closed for that sentence to be true is exactly the band this
attempt failed to close.

**Route status.** Angle A12 of `recon-0828-jacobsthal.md`: LIVE to CLOSED, with
the qualifier of section 7 point 3. Angle A13, Siebert 1983: closed in parallel
by a sibling agent, `kappa` equal to 1 only, chapter text not reached, verdict
resting on three third-party statements (`history/staging/lit-siebert-1983.md`).
That closure and this one leave the area with no live angle. It also removes the
one way the section 5 ceiling could have been checked against a published
`kappa = 2` construction, so the ceiling argument stands unaudited against
anything in print.

---

## 9. Corrections owed to files this note may not edit

1. **`research/sift-limit-attack.md` section 2.** The mixed-sign twin example is
   recorded as dying because "its axioms need two-point lambda-equidistribution
   at full level: Chowla-strength, open". With an exceptional character in place
   of `lambda` the axioms hold unconditionally at dimension 2 and level `theta`
   approaching 1 (section 3), and the example dies at its sifted count instead,
   above `u = 2` (section 5). The sentence names the wrong obstruction.
2. **`research/history/staging/recon-0828-jacobsthal.md` A12.** LIVE to CLOSED;
   circularity reason to be replaced by Heath-Brown per section 7.
3. **`research/history/staging/recon-0828-jacobsthal.md` section 1.** The
   Granville PDF's byte count is recorded as 222,744; the file fetched this
   session at the same URL with the same sha256 is 376,359 bytes. One of the two
   byte counts is a transfer artefact. The hash is the binding record and it
   agrees.
4. **`paper/wall-note.md` section 2 Face 4.** "The programme has no barrier
   result on this face" is accurate today and would need the section 5
   qualifier if this note survives an adversarial pass.
5. **`research/REFUTED.md`.** One row: the exceptional-character `kappa = 2`
   extremal construction, CLOSED, ceiling `u = 2`, this file.
6. **`research/SEARCH-CONVENTIONS.md` section 1.** Heath-Brown 1983 as the
   owning anchor for "Siegel zeros and the twin problem", which the map does not
   carry although `bv-import-survey.md` cites the paper.
7. **`research/QUESTIONS.md` TODO item 0** owes a `Ledger: Q-barrier-kappa2`
   line, which the fence on this session forbids writing, so the gate will say
   so.

---

## 10. What would falsify this, and whether that check has run

- **"The ceiling is exactly `u = 2`."** Falsified by any use of the exceptional
  character that constrains a *pair* of integers jointly rather than each
  coordinate separately. The argument in section 5 is a two-line identity about
  the size of a product of two primes above `z`, and it has been checked against
  the measurement in reading 4, which finds every `+1`-containing pattern empty
  at `u <= 2.0` and nonempty at `u = 2.1`. It has **not** been checked against
  Heath-Brown's method, which is the one known place where Siegel zeros do give
  two-point conclusions, and which was not read at the page in this session; if
  his machinery admits an extremal-set reading, section 5's ceiling is a
  statement about Granville's transfer only, which is how section 7 point 3
  already states it.
- **"The axioms of the character version hold at dimension 2 and level `theta`
  approaching 1."** Falsified by an error in the CRT count of section 3.
  The derivation is elementary and was done by hand here; it has **not** been
  independently re-derived, and no script checks it.
- **"The uniformity in `Delta` used in section 5 is available."** Falsified by
  showing Granville's Corollary 5 fails when `Delta` shrinks with `q`. This is
  the note's own extension of his statement, it is flagged as such, and the
  check has **not** run: the error terms in his Theorem 2.1 induction were read
  but not re-derived with `Delta` as a function of `q`. If this fails, the small
  Face-4 gain of section 5 fails with it and the verdict (b) is unaffected.
- **"The candidate is not extremal above `u = 2`."** Falsified by showing the
  share of the sifted set carried by the constrained sign pattern tends to zero
  as `x` grows. The measurement runs at one `x` only, `2 times 10^7`, where the
  natural logarithm of `x` is under seventeen; the share is rising toward `1/4`
  across the table rather than falling, which is evidence against the
  falsifier, but no larger `x` has been run and no asymptotic has been derived.
- **"Granville states nothing above `kappa = 1`."** Falsified by any
  higher-dimensional statement in the published Acta Arith. version. The check
  ran on arXiv v1 only, as in `recon-0828-jacobsthal.md`, and the published
  version was **not** obtained in this session either.
- **"Siebert 1983 does not already contain the `kappa = 2` construction."**
  Checked in parallel by a sibling agent and answered `kappa` equal to 1 only,
  but **the chapter's text was not reached**, so that answer rests on the
  publisher abstract plus two third-party accounts and not on primary reading
  (`history/staging/lit-siebert-1983.md`). If the chapter turns out to carry a
  general-`kappa` statement, section 5's ceiling becomes a check on it rather
  than a closure of the angle.
- **"The hypothesis implies the target."** Falsified by an error in the reading
  of Heath-Brown's theorem. The paper itself was **not** opened; the statement
  rests on the zbMATH record read this session, on Tao's post, and on the
  corpus's own citation at `bv-import-survey.md`, which is three independent
  restatements and no primary text.

*This note states current understanding, is HELD pending an adversarial pass,
and opens no route.*
