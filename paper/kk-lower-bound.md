# A lower bound for the two-class Jacobsthal function

*Draft, 2026-08-28. Internal to the primeoire repository; the publication
moratorium is in force and this document is not submission copy. Prose follows
`paper/writing-style-math.md`. Grade and triggers are carried by
`paper/proposals/prop-kk-lower-bound.md`; the suite architecture is
`paper/PAPERS.md`.*

**Author.** Chris Benjaminsen.

**Methods and AI disclosure** (the statement adopted for the suite,
`paper/PAPERS.md`, adapted to this note): the framework, vocabulary, and
driving questions are the author's, developed over six years of independent
work. Formal derivations, literature audits, computations, and manuscript
drafting were carried out using an AI assistant operating
under the author's direction; all results were verified by explicit
computation, with code and outputs published in the accompanying repository,
and all refuted intermediate claims retained in the record.

---

## Abstract

Let $P(y) = \prod_{p \le y} p$ and let $G_2(N)$ be the largest gap between
consecutive integers $n$ with $\gcd(n(n+2), N) = 1$, the two-class analogue of
Jacobsthal's function $g$. The main statement of this note is

$$G_2(P(y)) \;\gg\; \frac{y (\ln y)^3 (\ln\ln\ln y)^2}{(\ln\ln y)^4}
\qquad (y \ge y_0),$$

with an absolute implied constant, obtained by substituting the kill set
$\Omega_p = \{a_p, a_p - 2\}$ into the multi-class Erdős and Rankin
construction published by Kalmynin and Konyagin, and carrying their §2
trichotomy through line by line. The construction is theirs; the substitution
and the proof that it goes through are the present author's, and the argument
follows the source's construction while proving each step here, consuming the
source's Corollary 1 at its statement. It has been checked twice adversarially
inside this project and it has **not been refereed**.

Two weaker statements are recorded beside it, and both are stronger in
provenance than in exponent. The free bound $G_2 \ge g$ imports the
one-class Erdős and Rankin literature at no cost and gives
$G_2(P(y)) \gg y \ln y \ln\ln\ln y / \ln\ln y$. A chain assembled from
published statements alone, Kalmynin and Konyagin's Corollary 1 together with
Mertens, the prime number theorem, and an elementary identity from the Chinese
remainder theorem, gives $G_2(P(y)) \gg y \ln y$ with an effective constant.
The three sit two logarithms apart at the top and one $\ln\ln y / \ln\ln\ln y$
apart at the bottom.

Nothing here touches the twin prime conjecture, and nothing here moves the
standing upper bound $G_2 \ll_\varepsilon y^{\,\beta_2 + \varepsilon}$ at
$\beta_2 = 4.266$. The gap between the two sides remains a factor
$y^{3.266 + o(1)}$ wide.

---

## 1. Introduction

### 1.1 One class per prime

Jacobsthal's function $g(N)$ is the largest gap between consecutive integers
coprime to $N$. At a primorial $N = P(y)$ it is the object of Erdős problem
#687, which carries a US\$1000 prize, and its history is the history of two
opposed techniques.

On the upper side, Iwaniec proved $g(P(y)) \ll y^2$, equivalently
$g(N) \ll (\ln N)^2$, in 1978 [Iw78]. That bound is the linear sieve run at its
sifting limit $\beta_1 = 2$, and the numerical agreement between the sifting
limit and the exponent 2 is what makes it land where it does. Nothing better is
published, and the only proof of the transfer step, Iwaniec's Lemma 1, has an
unanswered question mark against it on MathOverflow that has stood since 2016
(MO 245539). This note does not touch the upper side.

On the lower side, the technique is a covering construction. Erdős and Rankin
choose one residue class $a_p$ per prime and ask how long an interval the
chosen classes can cover; the covered interval, transported by the Chinese
remainder theorem, is a run with no coprime integer in it. Rankin's 1938
argument, Pintz's 1997 refinement, and the Ford, Green, Konyagin, Maynard and
Tao theorem of 2018 give

$$g(P(y)) \;\gg\; \frac{y \ln y \ln\ln\ln y}{\ln\ln y}. \tag{1.1}$$

Maier and Pomerance conjecture $g(P(y)) = y (\ln y)^{2 + o(1)}$, and their
heuristic is the multi-kill accounting of their 1990 paper, p. 205. The
distance between (1.1) and Iwaniec's $y^2$ is the whole open problem.

Kalmynin and Konyagin generalised the lower side in 2023. For
$f \in \mathbb{Z}[x]$ they define $j_f(N)$ as the largest $m$ for which some
$x$ has $\gcd(x + f(i), N) > 1$ for every $i \le m$, and they prove a lower
bound whose exponent is governed by two parameters of $f$: the number
$\ell_f$ of linear factors, and $M(f)$, the average size of the maximal
preimage of a point under $f : \mathbb{F}_p \to \mathbb{F}_p$. Each prime now
deletes a whole fibre rather than a single class, and the Erdős and Rankin gain
is raised to the power $M(f)$.

### 1.2 Two classes per prime

The object of this note is what happens when each prime deletes a pair of
classes at fixed distance 2. Define

$$G_2(N) \;=\; \max \{\, b - a : a < b,\ \gcd(a(a+2), N) = \gcd(b(b+2), N) = 1,
\ \gcd(n(n+2), N) > 1 \text{ for } a < n < b \,\},$$

the largest gap between consecutive twin-admissible slots modulo $N$. It is not
a new object. Shifted by one, $G_2(P(p_n)) - 1$ is **OEIS A144311**, entered by
Andrew Carter in September 2008 and carrying 22 terms to $y = 79$, extended by
Alekseyev in 2009 and by Wang in 2024, whose entry words the same quantity as
*"the length of the longest sequence of consecutive integers, each equal to 1
or $-1$ modulo at least one of the first $n$ primes"*. A144311 carries no
formula line and no reference line. The related paired Jacobsthal function
$h_2$ of Ziller and Morack, OEIS A288815, takes the worst case over all even
offsets and satisfies $h_2 \ge G_2$; their papers give a conjectural ceiling
and no lower bound.

Two facts orient the problem.

**The upper side has one published-ingredient bound and it is far away.** The
dimension-2 lower-bound sieve of Diamond, Halberstam and Richert has sifting
limit $\beta_2 = 4.266$ as printed on p. 79 of their tract, and running
Iwaniec's argument with it gives $G_2(P(y)) \ll_\varepsilon
y^{\,\beta_2 + \varepsilon}$. That statement is derived inside this project
(`paper/beta2-note.md`) with its sieve input checked line by line against the
primary source, and it is the only two-class upper bound at any exponent that
the searches recorded in `research/SEARCH-CONVENTIONS.md` §3 could find.

**The lower side was empty until 2018 made it free.** Twin slots are a subset
of the integers coprime to $P(y)$, so any run containing no coprime integer
contains no twin slot, and $G_2 \ge g$ holds pointwise with no sieve input at
all. Feeding (1.1) through that inequality gives the first lower bound of any
kind recorded for a two-class Jacobsthal function, per the audit in
`research/two-class-lower-bounds.md` §3. It costs one line and it was not
written down anywhere the audit could reach.

### 1.3 What this note does

Kalmynin and Konyagin's construction is not a theorem about $G_2$ and may not
be evaluated as one. At $f(x) = x(x+2)$ their deleted fibre is
$\{-1 \pm \sqrt{1 - x_p}\}$, a pair with fixed centre and varying separation;
the pair that defines $G_2$ has varying centre and separation fixed at 2. The
two families coincide only at $x_p = 0$, where both are $\{0, -2\}$. So their
Theorem 1 cannot be read off. What transfers is the construction, instantiated
on a different system, and the result is a different proof of a different
theorem that lands on the same right-hand side.

Section 4 sets up that instantiation, §5 re-derives their §2 trichotomy for
$\Omega_p = \{a_p, a_p - 2\}$, §6 runs the sieve and the Mertens ledger, and §7
finishes. Section 8 gives the explicit threshold and says exactly what it is a
threshold for. Section 9 proves the weaker $y \ln y$ bound from published
statements only, which is the version a reader unwilling to grant a reading of
someone else's proof can still take. Section 10 states what none of this does.

### 1.4 Attribution

The multi-class Erdős and Rankin construction is Kalmynin and Konyagin's, and
the record says so before it says anything else
(`research/SEARCH-CONVENTIONS.md` §3, `research/PRIOR-ART.md`). What is claimed
here is the two-class instantiation and the carry-through, and the
carry-through consumes their §2 while discarding the whole of their §3.

The framing this note sits inside, primorial coordinates for the sieve wheel
and its recursive structure, has a predecessor that owns most of it: Fred B.
Holt, with Helgi Rudd on the earlier papers, has run a programme since 2007 on
the cycle of gaps $G(p\#)$ among the generators of $\mathbb{Z}/p\#$, with the
fold recursion, the closure theorem, the transfer operator and the interval of
survival all in print (arXiv:1408.6002, arXiv:2603.25915, primegaps.info). The
present project reached the same structures independently and cites them where
it uses them, per `research/PRIOR-ART.md`. Holt's corpus contains no upper
bound on any maximum gap and no two-class covering construction, so the object
of this note is not in it; the frame around the object is.

The standing posture of this project's prior-art record applies here without
softening. Its central object sat in OEIS from 2008 while five internal audit
waves ran clean negatives in the wrong vocabulary. A negative here is worth the
search behind it and no more, and §11.3 states which conventions were searched
and which have no row yet.

---

## 2. The object as a covering problem

Write $P(y) = \prod_{p \le y} p$ throughout, and call $n$ a *twin slot* modulo
$N$ when $\gcd(n(n+2), N) = 1$. The primorial $P(y) - 1$ is a twin slot, so
twin slots exist at every level and $G_2$ is well defined.

> **Proposition 1 (elementary, Chinese remainder theorem).**
> $G_2(P(y)) - 1$ equals the largest $m$ for which there is a choice of one
> residue $a_p \in \mathbb{Z}/p\mathbb{Z}$ for each prime $p \le y$ such that
> every $i \in [1, m]$ satisfies $i \equiv a_p$ or $i \equiv a_p - 2 \pmod p$
> for at least one $p \le y$.

*Proof.* A gap of length $G$ starting at a twin slot $s$ says that each of
$s+1, \dots, s+G-1$ fails to be a twin slot, that is, for each such $t$ either
$t$ or $t+2$ shares a factor with $P(y)$. Translate the origin to $s$ and write
$i = t - s$. Then $p \mid s + i$ exactly when $i \equiv -s$, and
$p \mid s + i + 2$ exactly when $i \equiv -s - 2$, so the deleted pair is
$\{a_p, a_p - 2\}$ with $a_p = -s \bmod p$. As $s$ runs over
$\mathbb{Z}/P(y)$, the Chinese remainder theorem makes $(a_p)_{p \le y}$ run
over all of $\prod_{p \le y} \mathbb{Z}/p\mathbb{Z}$. Conversely a covered run
is bounded on both sides by uncovered points, and those are twin slots. $\square$

So $G_2$ has an adversary after all, and the adversary's only constraint is
that the two deleted classes sit at distance exactly 2. Everything below is a
construction for that adversary. The identity is not new to this project's
record either: `research/attack2-rankin2d.js` already carried it under the name
PAIRED, with the note that choosing all shifts independently is the same as
sliding one window over the tile.

Three neighbouring quantities, all pointwise comparable:

| object | classes deleted per prime | relation | OEIS |
|---|---|---|---|
| $g(P(y))$, Jacobsthal | one, $\{a_p\}$ | base | A048670 |
| $G_2(P(y))$ | $\{a_p, a_p - 2\}$ | $\ge g(P(y))$ | A144311 (shifted by 1) |
| $h_2$, paired Jacobsthal | $\{a_p, a_p - d\}$, worst even $d$ | $\ge G_2(P(y))$ | A288815 |
| free two-class | any $\{a_p, b_p\}$ | $\ge h_2$ | A072753 |

The inequality $G_2 \ge g$ is verified at all eleven levels where both ladders
are known, with the ratio $G_2/g$ running 2.00, 3.00, 3.00, 3.00, 4.15, 4.41,
5.10, 5.61, 6.00, 8.00, 7.38 for $y = 5$ to $41$
(`research/two-class-lower-bounds.md` §1).

---

## 3. Statements

Three bounds, in increasing strength and decreasing provenance.

> **Proposition 2 (proven, and free).**
> $$G_2(P(y)) \;\ge\; g(P(y)) \;\gg\; \frac{y \ln y \ln\ln\ln y}{\ln\ln y}.$$
> The first inequality is pointwise and elementary (§2); the second is Ford,
> Green, Konyagin, Maynard and Tao, *JAMS* **31** (2018), via Rankin 1938 and
> Pintz 1997.

> **Theorem A (proven from published statements; the composition is the
> author's, adversary-confirmed, not refereed).**
> There is an effective $c > 0$ with
> $$G_2(P(y)) \;\ge\; (c + o(1))\, y \ln y.$$
> Every ingredient is a published theorem consumed at its statement:
> Kalmynin and Konyagin's Corollary 1 at sieve dimension $\kappa = 2$, Mertens'
> third theorem, the prime number theorem, and Proposition 1. Proof in §9.

> **Theorem B (derived here from a published construction; not refereed).**
> There is an absolute $y_0$ such that for every $y \ge y_0$,
> $$G_2(P(y)) \;\gg\; \frac{y (\ln y)^3 (\ln\ln\ln y)^2}{(\ln\ln y)^4},$$
> with an absolute implied constant. The proof substitutes
> $\Omega_p = \{a_p, a_p - 2\}$ into Kalmynin and Konyagin's construction and
> carries their §2 trichotomy through at $\ell_f = 2$, $h_f = 0$, $M(f) = 2$.
> Proof in §§4 to 7; the threshold in §8.

**Calibration, stated in the project's own legend
(`paper/proposals/PROPOSALS.md`).** Proposition 2 is PROVEN, and both of its
halves are in print. Theorem A is PROVEN at every ingredient and INFERRED at
the composition: the composition is written out in full here and was
re-derived end to end by a dedicated adversarial pass
(`research/history/staging/redteam-0820-math.md` §3.3), and no referee has seen
it. Theorem B is INFERRED at the composition, like Theorem A, and its sieve
step consumes the same printed statement (Corollary 1). It sits below Theorem
A on three counts: one ingredient, the smooth-number estimate of §6.5, is
consumed without an artifact (§12, [MEMORY]); its threshold is a floor with
every implied constant set to 1 (§8); and its construction cannot be
exhibited at any computable scale (§10). It must never be quoted without the
derivation named.

**Placement.** Writing $\ell = \ln y$, $\ell\ell = \ln\ln y$,
$\ell\ell\ell = \ln\ln\ln y$:

| bound | right-hand side | ratio to the one below |
|---|---|---|
| Theorem B | $y \ell^3 (\ell\ell\ell)^2 / (\ell\ell)^4$ | $\approx \ell^2 (\ell\ell\ell)^2/(\ell\ell)^4$ |
| Theorem A | $y \ell$ | $\ell\ell / \ell\ell\ell \to \infty$ |
| Proposition 2 | $y \ell \, \ell\ell\ell / \ell\ell$ | base |

and against the upper side, $G_2(P(y)) \ll_\varepsilon y^{4.26645 +
\varepsilon}$, every one of the three is $y^{1 + o(1)}$. The gap is not a
constant and not a logarithm. It is an exponent, and §10 prices it.

The conjectural picture, which none of the three reaches, decomposes the
exponent of $\ln y$ as $\ell_f + M(f) - 1$ plus a conjectural multi-kill term:

| source of a logarithm | one class | two classes |
|---|---|---|
| Erdős and Rankin base, one survivor per large prime | 1 | 1 |
| survivor density after the small primes, $\ell_f = 2$ | 0 | $+1$ |
| the band-2 device, $M(f) = 2$ | 0 | $+1$ |
| Maier and Pomerance multi-kill (conjectural) | $+1$ | $+1$ |
| total exponent of $\ln y$ above $y$ | 2, conjectural | 4 conjectural, 3 proved here |

The conjectural two-class ceiling is therefore $G_2(P(y)) = y (\ln y)^{4 +
o(1)}$, one logarithm above Theorem B, and still $y^{1 + o(1)}$. The
corresponding one-class reading is recorded in A048670's own OEIS comment,
which draws the Maier and Pomerance conclusion one dimension down.

---

## 4. The construction

Fix two parameters, $A > 4$ and $B$ large in terms of $A$, and set

$$z_0 = (\ln y)^A, \qquad
z_1 = \exp\!\left(\frac{\ln\ln\ln y \cdot \ln y}{A \ln\ln y}\right), \qquad
m = \frac{y}{B} \cdot \frac{(\ln y)^3 (\ln\ln\ln y)^2}{(\ln\ln y)^4}.$$

These are Kalmynin and Konyagin's $z_0$, $z_1$ and $m$, the last evaluated at
$\ell_f = 2$, $h_f = 0$, $M(f) = 2$. The displays were read from the arXiv
PDF of record at pp. 3 and 6 and checked against the published Izvestiya PDF
(§12 and Appendix A).

Choose one residue $a_p$ per prime $p \le y$ in three bands.

| band | primes | $a_p$ | deleted pair $\{a_p, a_p - 2\}$ |
|---|---|---|---|
| 1 | $p \le z_0$ and $z_1 < p < y/2$ | $0$ | $\{0, -2\}$ |
| 2 | $z_0 < p \le z_1$ | $1$ | $\{1, -1\}$ |
| 3 | $y/2 \le p \le y$ | greedy, one leftover $i$ per prime | one point |

By Proposition 1 it suffices to show that every $i \in [1, m]$ is deleted by
some prime, since then $G_2(P(y)) \ge m + 1$, which is the right-hand side of
Theorem B up to the constant $1/B$.

The sieve sets fed to the fundamental lemma at sifting level $z = \sqrt{y}$ are

$$\Omega^{\mathrm{I}}_p = \{0, -2\} \ \ (p \le \sqrt{y}), \qquad
\Omega^{\mathrm{II}}_p = \emptyset, \qquad
\Omega^{\mathrm{III}}_p = \{1, -1\} \ \ (z_0 < p \le z_1),$$

and $\Omega_p$ is their union. The second is empty because $f(x) = x(x+2)$ has
no irreducible non-linear factor over $\mathbb{Z}$, so $h_f = 0$; §5 makes that
the content of Case 2.

**Why the two formulations never have to be reconciled.** Proposition 1's
covering pair $\{a_p, a_p - 2\}$ has a free centre; the sieve pair
$\Omega^{\mathrm{I}}_p = \{0, -2\}$ is fixed. Band 1 sets $a_p = 0$, and at
$a_p = 0$ the two sets are equal. The covering freedom is therefore spent
entirely in band 2, where it is spent on the single value $a_p = 1$, and each
formulation is used only in the band where it applies. This project has made
the covering-versus-sifting error before, which is why `research/qc/units.js`
§5 exists, and it is why the point is made here rather than passed over.

**Three structural facts the substitution needs, each a resultant rather than a
sweep.**

| what the method needs | what the substituted system gives | reason |
|---|---|---|
| $\lvert \Omega^{\mathrm{I}}_p\rvert  = \ell_f$ above some $p_0$ | $\lvert \Omega^{\mathrm{I}}_p\rvert  = 2$ for every $p > 2$ | $\mathrm{Res}(x, x+2) = 2$ |
| the three $\Omega$ pairwise disjoint above $p_0$ | disjoint for every $p \ge 5$; $p = 3$ is the last overlap | $\mathrm{Res}(x(x+2), (x-1)(x+1)) = -3$ |
| a sieve dimension $\kappa$ (theirs is $3 \deg f = 6$) | $\kappa = 4$ | $\lvert \Omega^{\mathrm{I}}\rvert  + \lvert \Omega^{\mathrm{III}}\rvert  = 4$, $\Omega^{\mathrm{II}} = \emptyset$ |

The band-2 choice $a_p = 1$ is optimal in the sense that matters here:
$\mathrm{Res}(x(x+2), (x-a)(x-a+2)) = a^2(a^2 - 4)$, the values
$a \in \{0, 2, -2\}$ are degenerate, and among the rest $a = \pm 1$ minimise
$|\mathrm{Res}|$ at 3, which is the floor because $3 \mid a^2(a^2-4)$ whenever
$3 \nmid a$.

The count $|\Omega^{\mathrm{III}}_p| = 2$ was also checked directly at every
one of the 78,498 primes below $10^6$, with no exception
(`research/attack-kk-substitution.js`). That check is redundant given the
resultant, and it is recorded because it is the form the first adversarial pass
demanded.

---

## 5. The trichotomy

Throughout this section $i \in [1, m]$, and *unkilled* means unkilled by bands
1 and 2.

> **Proposition 3.** If $i \le m$ is unkilled after bands 1 and 2, then at
> least one of the following holds:
> **(a)** $i \le \sqrt{y} + 2$;
> **(b)** $i$ or $i+2$ is $z_1$-smooth;
> **(c)** $i \bmod p \notin \Omega_p$ for every $p \le \sqrt{y}$.

*Proof.* Suppose (c) fails, so $i \bmod p \in \Omega_p$ for some
$p \le \sqrt{y}$. Since $\Omega_p$ is the union of the three sets of §4, one of
three cases holds.

**Case 1: $i \bmod p \in \Omega^{\mathrm{I}}_p$.** Then $i \equiv 0$ or
$i \equiv -2 \pmod p$, that is $p \mid k$ with $k = i$ or $k = i+2$, so
$1 \le k \le m+2$. If $k = p$ then $i \le p + 2 \le \sqrt{y} + 2$ and (a)
holds. Otherwise $k$ is composite. Since $i$ is unkilled by band 1, neither $i$
nor $i+2$ has a prime factor in $[2, z_0] \cup (z_1, y/2)$, so every prime
factor of $k$ lies in $(z_0, z_1] \cup [y/2, \infty)$. Let $P$ be the largest.
If $P \le z_1$ then $k$ is $z_1$-smooth and (b) holds. If $P \ge y/2$ then
$k/P \le (m+2)/(y/2) = 2(m+2)/y$, while every prime factor of $k/P$ exceeds
$z_0$, so that $k/P > z_0$ unless $k/P = 1$. Under the inequality

$$2(m+2)/y \le z_0 \tag{5.1}$$

the cofactor $k/P$ therefore has no prime factor at all. Hence $k/P = 1$ and
$k = P$ is prime, contradicting that $k$ is composite. (Until 2026-09-07 the
first display read $(m+2)/(y/2) < 2m/y$, which is false by $4/y$, and (5.1)
read $2m/y < z_0$; the repair changes H4 by $\ln(1 + 2/m)$, below $10^{-100}$
at every tabulated $L$, and no brute-force row: `research/history/reviews-0907/09`.)

**Case 2: $i \bmod p \in \Omega^{\mathrm{II}}_p$.** The source defines
$\Omega^{\mathrm{II}}_p$ as $\{t : q(t) \equiv 0 \pmod p$ for some non-linear
irreducible factor $q$ of $f\}$, read from the PDF of record at p. 6. Since
$f(x) = x(x+2)$ is a product of two linear factors over $\mathbb{Z}$,
$h_f = 0$, the set $\Omega^{\mathrm{II}}_p$ is empty at every prime, and this
case quantifies over an empty set. It is unsatisfiable and contributes nothing.

**Case 3: $i \bmod p \in \Omega^{\mathrm{III}}_p$.** Then $z_0 < p \le z_1$ and
$i \equiv 1$ or $i \equiv -1 \pmod p$, which is exactly the band-2 deleted
pair, so $i$ was killed at band 2, contrary to assumption. $\square$

**What Case 1 consumes, and it is all of what it consumes**, is the single
inequality (5.1). Since $m \le y (\ln y)^3$, that step alone asks only
$A > 3$. The proof as a whole needs $A > 4$, and it needs it at the
smooth-number step of §6, not here. An earlier version of this derivation wrote
$A > 3$ for the whole proof and the first adversarial pass corrected it
(`research/history/staging/verify-kk-substitution.md`).

**What Case 2 takes with it.** Kalmynin and Konyagin's Lemma 2, their use of
the effective Chebotarev density theorem, their Theorem 2, their Lemma 3 and
the Galois groups $G_f$ and $G_f^+$, which is the whole of their §3, are
consumed by nothing here. Lemma 2 and Chebotarev drop because
$\Omega^{\mathrm{II}}$ is empty. Theorem 2, Lemma 3 and the Galois groups drop
for the Case 3 reason instead: they exist in order to compute $M(f)$, and the
substituted $\Omega^{\mathrm{III}}_p$ has exactly two elements at every odd
prime, with no logarithmic average and no exceptional primes. About half of the
source paper is not needed.

**The finite content of Proposition 3 was brute-forced.** At $y = 200000$,
$z_1 = 300$, $m = 4 \cdot 10^6$, so the Case 1 threshold (5.1) reads
$z_0 \ge 2(m+2)/y = 40.00002$ (the script tests $2m/y = 40$; no tabulated
$z_0$ lies between):

| $z_0$ | does (5.1) hold | unkilled $i \le m$ | counterexamples to Proposition 3 |
|---|---|---|---|
| 100 | yes | 16985 | 0 |
| 60 | yes | 14381 | 0 |
| 45 | yes | 13164 | 0 |
| 30 | no | 11228 | 235 |
| 20 | no | 10372 | 799 |
| 10 | no | 9086 | 2921 |

The correct reading is that (5.1) is **sufficient** at finite scale,
counterexample-free wherever it holds, and that violating it far enough breaks
the proposition. It is not necessary: violations near the boundary produce no
counterexamples, measured across three parameter families. The run also rules
out a covering-versus-sifting leak of the kind §4 warns about, because such a
leak would surface as a counterexample where (5.1) holds. The producer is
`research/verify-kk-substitution.js`; the report is
`research/history/staging/verify-kk-substitution.md`.

---

## 6. The sieve step and the Mertens ledger

Let $R$ be the number of $i \le m$ unkilled after bands 1 and 2. Proposition 3
gives

$$R \;\le\; S(m, \Omega) \;+\; O(\sqrt{y}) \;+\; 2\,\Psi(m+2, z_1), \tag{6.1}$$

where $S(X, \Omega) = \#\{n \le X : n \bmod p \notin \Omega_p \ \forall p \le
z\}$ and $\Psi$ is the smooth-number counting function. The factor 2 on the
smooth count is there because branch (b) of Proposition 3 is a statement about
$i$ or $i+2$.

### 6.1 The fundamental lemma, applied at $\kappa = 4$

The result consumed is Kalmynin and Konyagin's Corollary 1, which in their
paper follows from their Lemma 1, itself a citation to Halberstam and Richert's
Theorem 2.2. Read from the PDF of record at p. 4, verbatim:

> *Let $\kappa$, $z$, $g(d)$, $V(z)$ and $X$ be as above. Suppose that for any
> $p \le z$ the set $\Omega_p \subset \mathbb{Z}/p\mathbb{Z}$ contains $g(p)$
> elements. Let $S(X, \Omega)$ be the number of $n \le X$ such that
> $n \bmod p \notin \Omega_p$ for all $p \le z$. Then $S(X, \Omega) \ll X V(z)$.*

Here $V(z) = \prod_{p \le z} (1 - g(p)/p)$, and "as above" imports Lemma 1's
hypotheses: $g$ multiplicative, $g(p) \le \kappa$, $g(p) < p$ for all primes,
$|r_d| \le g(d)$ for every $d \mid P(z)$, $z \ll X$, and an implied constant
depending on $\kappa$ alone.

**The corollary sees $\Omega_p$ only through $|\Omega_p|$, and that single fact
is what makes the substitution legal**, because it is indifferent to whether
the classes are a fibre of a polynomial or a free translate. Their own proof
invokes it with the words *"Let $g(p) = |\Omega_p|$"*. This reading is
load-bearing and §11.1 flags it as such.

The hypotheses are discharged as follows. $g(p) = |\Omega_p| \le 4$ everywhere,
with 4 attained only on band 2, so $\kappa = 4$. The condition $g(p) < p$ holds
for $p \ge 5$, and the two primes where a band-2 count would fail it, $p = 2$
and $p = 3$, sit in band 1 where $g(2) = 1$ and $g(3) = 2$, because band 2
begins above $z_0 = (\ln y)^A > 3$. On squarefree $d$ put $g(d) = \prod_{p
\mid d} g(p)$; then, by the Chinese remainder theorem, the $n \le m$ with $n
\bmod p \in \Omega_p$ for every $p \mid d$ fill exactly $g(d)$ classes mod $d$,
each containing $m/d + O(1)$ integers, so the remainder satisfies $|r_d| \le
g(d)$ for every $d \mid P(z)$ with no restriction on the size of $d$. Finally
$z = \sqrt{y} \ll m$, since $m/\sqrt{y} \to \infty$ for fixed $B$. A smaller
$\kappa$ than the source's own $\kappa = 6$ is a tightening rather than a
weakening, since $\kappa$ enters only the implied constant.

### 6.2 Remark: no support parameter is consumed

*(Demoted from an argument to a remark on 2026-09-07 after a source re-read;
see §11.2 and `research/history/reviews-0907/05`, `06`.)* Lemma 1 of the
source is the Brun-form upper bound: under $g(p) \le \kappa$, $g(p) < p$, the
pointwise remainder hypothesis $|r_d| \le g(d)$ for $d \mid P(z)$, and $z \ll
m$, it gives $S \ll_\kappa m V(z)$ with no remainder sum and no support
parameter. Richert's own cross-reference identifies it with Halberstam and
Richert Theorem 2.2 (Tata lectures, Theorem 11.3: $S \ll X \prod_{p<z}(1 -
\omega(p)/p)$ for $z \le X^A$, any fixed $A$, constant depending on $A$, $A_1$,
$A_2$, $\kappa$). The reduction from a Selberg bound at support $z$ to that
statement, namely $S(z) \le S(z')$ for $z' < z$ and $V(z')/V(z) \ll (\ln
z/\ln z')^\kappa$, is, on the reconstruction in
`research/history/reviews-0907/06` finding 1, internal to the proof of the
theorem cited, where Richert's text says only "one readily obtains", and
appears as the $A$-dependence of its constant. It is not this manuscript's
responsibility, and the source's own refereed step runs at $z = \sqrt{y}$ with
$\kappa = 6$.

A Selberg-form bound (Richert Theorem 11.1, Halberstam and Richert Theorem 4.1)
sieving at a level $z = \xi$, would instead carry the remainder
$\sum_{d \le \xi^2,\ d \mid P(\xi)} 3^{\omega(d)} |r_d| \ll
\xi^2 (\ln \xi)^{3\kappa - 1}$ and, at the naive choice $\xi = \sqrt{y}$, a
remainder $y(\ln y)^{11}$ at $\kappa = 4$ against a main term $y/(B \ln y)$.
That route is available at $\xi = \sqrt{y}/(\ln y)^C$ with $C > 3\kappa/2$,
sieving at $z = \xi$, at a cost $1 + o(1)$ in $V$; $C = 7$ serves $\kappa = 4$
and $C = 10$ serves $\kappa = 6$, so nothing about it is one sieve dimension
wide. It is not consumed anywhere below: every computation in §§6.3 to 8 runs
at $z = \sqrt{y}$, as the earlier text of this subsection did not.

### 6.3 The ledger has exactly two terms

$$\sum_{p \le \sqrt{y}} \frac{g(p)}{p}
= \sum_{5 \le p \le \sqrt{y}} \frac{2}{p}
+ \sum_{z_0 < p \le z_1} \frac{2}{p} + O(1)
= 2\ln\ln y + 2(\ln\ln z_1 - \ln\ln z_0) + O(1). \tag{6.3}$$

The first term is $\Omega^{\mathrm{I}}$ charged over all $p \le \sqrt{y}$, with
$|\Omega^{\mathrm{I}}_p| = 2$ standing in for the source's $\ell_f$. The second
is $\Omega^{\mathrm{III}}$ over band 2, with $|\Omega^{\mathrm{III}}_p| = 2$
standing in for its $M_p(f)$. The middle term of the source's three-way split,
the one carrying $h_f$, is identically zero. Both surviving terms are plain
Mertens sums over a constant, where the second was an application of Chebotarev
in the original. That is the whole of the simplification the substitution buys.

The $O(1)$ is an identified constant rather than a shrug. With Mertens'
constant $M = 0.2614972128476428$ and $\ln\ln\sqrt{y} = \ln\ln y - \ln 2$,

$$\sum_{5 \le p \le \sqrt{y}} \frac{2}{p} - 2\ln\ln y \;\longrightarrow\;
-2\ln 2 + 2M - 2\left(\tfrac12 + \tfrac13\right) = -2.529967,$$

reached to $1.9 \times 10^{-5}$ at $\sqrt{y} = 10^7$ and to $0.0079$ at
$\sqrt{y} = 10^3$. At the $y$ where no computer can look, an explicit Mertens
bound does the same work. Rosser and Schoenfeld's Theorem 5 gives
$\ln\ln x + M - 1/(2\ln^2 x) < \sum_{p \le x} 1/p$ for $x > 1$ and
$\sum_{p \le x} 1/p < \ln\ln x + M + 1/(2\ln^2 x)$ for $x \ge 286$ ((3.17),
(3.18), read at the page image 2026-09-08); Dusart's Theorem 6.10
(arXiv:1002.0442) sharpens the error to $1/(10\ln^2 x) + 4/(15 \ln^3 x)$, the
upper bound for $x \ge 10372$. $M$ cancels in a band difference, leaving, at
$A = 5$, a bound that falls from $2.475 \times 10^{-4}$ at $\ln y = 10^3$ to
$1.911 \times 10^{-5}$ at $\ln y = 10^9$ in Dusart's form, and from
$1.158 \times 10^{-3}$ to $9.314 \times 10^{-5}$ in Rosser and Schoenfeld's.

### 6.4 The assembly is an identity

Write $\ell\ell = \ln\ln y$, $\ell\ell\ell = \ln\ln\ln y$, $\ell\ell\ell\ell =
\ln\ln\ln\ln y$. Then

$$\ln\ln z_0 = \ln A + \ell\ell\ell, \qquad
\ln\ln z_1 = \ell\ell\ell\ell + \ell\ell - \ell\ell\ell - \ln A,$$

so (6.3) reads $\sum g(p)/p = 4\ell\ell - 4\ell\ell\ell + 2\ell\ell\ell\ell -
4\ln A + O(1)$, hence

$$\exp\!\left(-\sum g(p)/p\right) = \frac{A^4 (\ell\ell)^4}{(\ln y)^4
(\ell\ell\ell)^2}, \qquad
S(m, \Omega) \ll m \prod_{p \le \sqrt{y}}\!\left(1 - \frac{g(p)}{p}\right)
\ll \frac{A^4 y}{B \ln y},$$

which is the source's own displayed $A^{2M(f) - 2h_f} y/(B\ln y)$ at
$M(f) = 2$, $h_f = 0$. Every coefficient cancels separately: in $\ln y$, in
$\ell\ell\ell$, in $\ell\ell$, and in $\ln A$. Since the implied constant
depends on $\kappa$ alone and not on $A$ or $B$, taking $B$ large against $A$
gives $S(m, \Omega) \le y/(4 \ln y)$; with the ledger constant
$-2\ln 2 + 2M - 1/2 = -1.3633$ and the implied constant set to 1 this asks
$B \ge 4 e^{1.3633} A^4$, about $4.2 \times 10^3$ at $A = 4.05$, and §8 shows
that no tabulated threshold depends on $B$ in that range.

The collapse was checked numerically over 30 parameter triples out to
$\ln y = 10^{300}$, and again at machine precision by a second, independently
written pass: $\max |\text{ratio} - 1| = 5.684 \times 10^{-13}$.

### 6.5 The smooth-number step, and where $A > 4$ comes from

This is the one imported estimate. With $u = \ln m / \ln z_1 \sim A \ln\ln y /
\ln\ln\ln y$, the leading term of $u \ln u$ is $A \ln\ln y$, the
$\ln\ln\ln y$ cancelling, so $\Psi(m, z_1) = m (\ln y)^{-A + o(1)}$, the
$o(1)$ of order $\ln\ln\ln\ln y/\ln\ln\ln y$, and the
requirement $2\Psi(m+2, z_1) = o(y/\ln y)$ becomes

$$(\ln y)^{3-A} \frac{(\ln\ln\ln y)^2}{(\ln\ln y)^4} = o\!\left(\frac{1}{\ln
y}\right), \qquad\text{that is}\qquad A > 4.$$

That is exactly the $\ell_f + M(f) = 4$ that the source's own version of this
step asks for. The estimate consumed is Hildebrand and Tenenbaum's Corollary
1.3 (§12), whose range hypothesis $u \le z_1^{1-\varepsilon}$ is slack
($u = 13.7$ against $z_1 = e^{23.2}$ at $y_0$); the tighter range of
Hildebrand's Theorem 1.1, measured by $\ln z_1 / (\ln\ln m)^{5/3}$, runs from
$6.364 \times 10^{-1}$ at $\ln y = 10^2$ to $2.339 \times 10^5$ at
$\ln y = 10^9$ and is not required. Bisecting for the
least admissible $A$ at each scale gives values rising through
$2.3196 \dots 3.8185$, approaching 4 from below, which is the expected
signature of an asymptotic condition met with room to spare only past the
threshold of §8.

Combining, $R \le y/(4\ln y) + o(y/\ln y) \le y/(3\ln y)$.

---

## 7. Band 3, and the end of the proof of Theorem B

Each remaining $i$ is assigned its own prime $p \in (y/2, y]$ and the choice
$a_p \equiv i \pmod p$, which deletes $i$ and nothing else in $[1, m]$ that
matters. The assignment is available as soon as there are enough such primes.
Rosser and Schoenfeld give

$$\pi(y) - \pi(y/2) \;>\; \frac{y}{\ln y} - \frac{0.62753\, y}{\ln y - \ln 2},$$

and the right-hand side exceeds $y/(3\ln y)$ exactly when
$0.62753 \ln y/(\ln y - \ln 2) < 2/3$, that is $\ln y > 11.807294$, that is
$y > 1.3423 \times 10^5$. That is far below any threshold of §8, so band 3
never binds.

Every $i \le m$ is now deleted by some prime $p \le y$. By Proposition 1,
$G_2(P(y)) \ge m + 1$, and $m$ is $y (\ln y)^3 (\ln\ln\ln y)^2/(\ln\ln y)^4$
divided by the constant $B$. This proves Theorem B. $\square$

---

## 8. The threshold $y \ge 10^{134.1}$, and what it is a threshold for

Every hypothesis used above is an explicit inequality in $L = \ln y$:

| condition | inequality | where it is used |
|---|---|---|
| H1, $z_0 > 3$ | $A \ln L > \ln 3$ | §6.1, the $g(p) < p$ discharge |
| H2, $z_0 < z_1$ | $A^2 \ln^2 L < L \ln\ln L$ | §4, band 2 non-empty |
| H3, $z_1 < \sqrt{y}$ | $2\ln\ln L < A \ln L$ | §6.3, band 2 lies inside the sieve range $p \le \sqrt{y}$ of (6.3) and of Proposition 3(c) |
| H4, Case 1 | $\ln 2 - \ln B + 3\ln L + 2\ln\ell\ell\ell - 4\ln\ell\ell < A \ln L$ | (5.1), as coded with $2m/y$; the $2(m+2)/y$ form adds $\ln(1+2/m) < 10^{-100}$ |
| H5, smooth count | $\ln 2 + \ln(m/y) + \ln\rho(u) + \ln 12 + \ln L < 0$, the smooth term's share of the budget $y/(4\ln y) + 2\Psi + O(\sqrt y) \le y/(3\ln y)$; $\rho$ is de Bruijn's asymptotic, not an upper bound; slack by more than 17 in the logarithm at $L = 308.67$ (coded with $\ln 3$ until 2026-09-07; no tabulated value moved) | §6.5 |
| H6, band 3 | $L > 11.8073$ | §7 |
| H7, $z \ll X$ as $\sqrt{y} \le m$ | $\ln B + 4\ln\ell\ell - 3\ln L - 2\ln\ell\ell\ell < L/2$ | §6.1, the $z \ll X$ discharge; slack by 163 at $L = 308.67$, binds only for $\ln B > 163$; not coded in the bisection, which it cannot move |

Bisecting for the first $L$ at which all seven hold simultaneously, with every
implied constant set to 1:

| $A$ | $L_0 = \ln y_0$ | $y_0$ | binding condition |
|---|---|---|---|
| 4.05 | $3.0867 \times 10^2$ | $10^{134.1}$ | H2 |
| 4.5 | $4.0795 \times 10^2$ | $10^{177.2}$ | H2 |
| 5 | $5.3747 \times 10^2$ | $10^{233.4}$ | H2 |
| 7 | $1.2733 \times 10^3$ | $10^{553.0}$ | H2 |
| 10 | $3.1008 \times 10^3$ | $10^{1346.7}$ | H2 |

$B$ does not move $y_0$ to five figures, because it enters only H4, H5 and
H7, all of which are slack; the table is the same for every $B$ between 1 and
$10^{70}$, and the runs use $B = 10$. The binding condition is H2, $z_0 < z_1$, at every $A$, and H2 is a
property of the source's band geometry with nothing to do with the
substitution: the original construction has the same $y_0$ at the same $A$.

Two consequences, and both are limitations.

**$10^{134.1}$ is a floor on the true explicit threshold, not the threshold.**
It is what a reader gets by setting every implied constant to 1: the
fundamental lemma's constant at $\kappa = 4$, the smooth-number constant, the
$O(\sqrt{y})$ of (6.1), and the $O(1)$ of (6.3). A genuine explicit $y_0$ is
larger by an amount this project has not computed, so Theorem B as stated is
ineffective.

**Band 2 is empty at every level any computer here can reach.** At $y = 4001$
and $A = 4.05$ the parameters are $z_1 = 2.07$ against $z_0 = 5.26 \times
10^3$, so the interval $(z_0, z_1]$ is empty and the construction degenerates.
No finite computation in this project can exhibit it working as designed. In
particular the factor 4.0 to 6.6 by which a three-band certificate loses to a
plain greedy search at $y = 4001$
(`research/history/staging/attack-lower-bound.md` D4) is not evidence about
Theorem B in either direction, and it must not be cited as any.

**The bound is a floor on the method rather than its ceiling.** Run the
source's Theorem 1 at $f(x) = x$, where $j_f$ is the ordinary Jacobsthal
function and $\ell_f = 1$, $h_f = 0$, $M(f) = 1$. It gives
$g(P(y)) \gg y \ln y \ln\ln\ln y / (\ln\ln y)^2$, weaker by exactly one factor
of $\ln\ln y$ than the one-class lower bound quoted in the source's own
introduction at p. 2, with the ratio measured here running from $4.6052$ at
$\ln y = 10^2$ to $20.7233$ at $\ln y = 10^9$. The slack comes from a fixed $A$
in $z_0 = (\ln y)^A$ rather than an optimised Erdős and Rankin band choice, and
the transferred bound inherits it. An optimised band choice, or the Pintz and
FGKMT refinements imported into the substituted frame, should recover one or
two factors of $\ln\ln y$. That has not been attempted and is not claimed.

---

## 9. Theorem A: the same object from published statements only

Theorem B follows a published construction and proves each step here,
consuming one estimate without an artifact. Theorem A consumes every
ingredient at its printed statement, and the composition is elementary and
written out here in full. It is two logarithms weaker, and the
trade is strength for provenance.

*Proof of Theorem A.* Let $m = c_0\, y \ln y$ with $c_0$ fixed at step 3 below,
and let $z = \sqrt{m}$.

**1. The survivor count, from Corollary 1 consumed as a theorem.** Apply the
corollary quoted in §6.1 with $X = m$, $\Omega_2 = \{0\}$, and
$\Omega_p = \{0, -2 \bmod p\}$ for odd $p \le z$. Then $g(2) = 1 < 2$,
$g(p) = 2 < p$ for odd $p$ (the two classes being distinct for $p$ odd),
$\kappa = 2$, and $z = \sqrt{m} \ll m = X$, so every hypothesis of Lemma 1 is
discharged. The stage-1 survivors, that is the twin slots of $[1, m]$ with
respect to the primes $\le z$, number
$\#V \le C_1 \, m \, V(z)$ with $V(z) = \prod_{p \le z}(1 - g(p)/p)$.

**2. The product, by Mertens.** Writing
$1 - 2/p = (1-1/p)^2 \cdot \big[(1-2/p)/(1-1/p)^2\big]$ with the bracket
convergent, Mertens' third theorem gives
$\prod_{2 < p \le z}(1 - 2/p) = (C_2 + o(1))/\ln^2 z$. At $z = \sqrt{m}$ this
carries a factor 4, so $\#V \le (4C_3 + o(1))\, m/\ln^2 m$.

**3. The mop-up, one prime per survivor.** Since $\sqrt{m} = o(y/\ln y)$, the
prime number theorem gives $\pi(y) - \pi(\sqrt{m}) = (1 + o(1))\, y/\ln y$.
From step 2 and $\ln m \sim \ln y$,
$\#V \le 4 C_3 c_0 (1 + o(1))\, y/\ln y$. Choose $c_0 = 1/(8C_3)$. For large
$y$ there is then an injection $V \to \{\text{primes in } (\sqrt{m}, y]\}$,
$r \mapsto p_r$. Set $a_{p_r} = r \bmod p_r$, and $a_p = 0$ for every other
$p \le y$.

**4. Every $r \in [1, m]$ is covered.** A non-survivor has some $p \le
\sqrt{m}$ with $p \mid r$ or $p \mid r+2$, that is $r \equiv a_p$ or
$r \equiv a_p - 2 \pmod p$ at $a_p = 0$. A survivor is covered by its own
prime. By Proposition 1 a full cover of $[1, m]$ by pairs $\{a_p, a_p - 2\}$
over $p \le y$ exhibits a run of $m$ consecutive residues of $P(y)$ containing
no twin slot, so $G_2(P(y)) \ge m + 1 = (c + o(1))\, y \ln y$. $\square$

All four constants are effective, so $c$ is effective, which Theorem B's is
not.

**Custody.** This chain was written on 2026-08-20, held out of every live
document until a dedicated adversarial pass reported, and confirmed by it at
every ingredient: the Corollary 1 statement re-read at a freshly fetched page
image with a matching md5, the Mertens and prime number theorem steps
re-derived, the hypothesis list discharged item by item, and the Chinese
remainder identity re-derived from its own proof
(`research/history/staging/redteam-0820-math.md` §3.3). The pre-registration
was committed alone before any producer or report existed, so the custody is
provable rather than declared.

**The finite end-to-end check.** The whole pipeline was rebuilt from the
pre-registration text alone, by separately written code, and the assembled
cover replayed through an independent per-residue scan: $|V| = 9889$,
$\prod(1-2/q) = 0.1750499$, mean leftover $1730.83$ against an expectation of
$1731.07$, best trial 1654, a mop-up of 1153 primes at 1.43 slots per prime,
largest prime used $10861$, **uncovered points in $[1, 200000]$: zero**, and
ratio $m/(y \ln y) = 1.9816$. That is an end-to-end correctness check of the
construction at one scale. It is not evidence for the limit, and the record
says so in the same sentence
(`research/history/staging/redteam-0820-math.md` §3.4).

Theorem A supersedes nothing in the record except its own earlier sketch:
`research/two-class-lower-bounds.md` §4b had this accounting at INFERRED
grade, reaching $m \asymp y \ln y$ by the same two-stage argument. What §9 adds
is the proof grade, the chain of custody, and the finite echo.

---

## 10. What these bounds do not do

**They say nothing about the upper side.** The best two-class upper bound
available is $G_2(P(y)) \ll_\varepsilon y^{\beta_2 + \varepsilon}$ at
$\beta_2 = 4.26645028414864191641$, the sifting limit of the dimension-2
Diamond, Halberstam and Richert sieve. Nothing in §§4 to 9 constrains it, in
either direction, because a covering construction is a lower-bound device and
the sifting limit is a positivity threshold for a lower-bound sieve. The two
sides do not meet:

| | statement | exponent of $y$ |
|---|---|---|
| upper | $G_2(P(y)) \ll_\varepsilon y^{4.26645 + \varepsilon}$ | $4.266\ldots$ |
| lower, Theorem B | $G_2(P(y)) \gg y (\ln y)^3 (\ln\ln\ln y)^2/(\ln\ln y)^4$ | $1 + o(1)$ |

so the gap is a factor $y^{3.266 + o(1)}$, and moving Theorem B by another
logarithm, or by ten, does not narrow it in the exponent. On the evidence
available the truth is nearer the lower side: the exponent measured on the 22
trusted terms of A144311 is $1.50 \pm 0.05$ in the $y$-frame, and the estimator
that produced it is provably biased upward by about $+0.28$ on a control object
whose answer is 1 (`research/exponent-control.md` §§1, 5). A measured exponent
with a known upward bias of that size is not an argument about the limit, and
it is recorded here only so that the reader knows which end of the interval the
data sits at.

**They say nothing about the twin prime conjecture.** No lower bound on
$G_2$ can, since a lower bound says the adversary can build long twin-free
runs, which is the direction away from producing twin primes. What a *bound* on
$G_2$ would decide is the internal Zone Postulate of this project, which needs
$G_2(P(y)) < y'^2$ where $y'$ is the next prime; the theorems above leave that
margin exactly where it was, since $y^2/(y\ln^3 y) \to \infty$ and the margin
is still $y^{1-o(1)}$. A stronger construction-side bound was the one thing
that could have threatened the Postulate. Theorem B is not it.

**They are not effective.** Theorem A's constant is effective; its threshold
is not stated. Theorem B's $y_0 = 10^{134.1}$ is a floor with every implied
constant set to 1 (§8), and no effective version exists.

**They are not exhibited.** No computation in this project reaches band 2
(§8), so the only empirical support for Theorem B is the brute force of
Proposition 3 rather than of the construction, and a referee is entitled to
call the theorem unfalsifiable by anything in this repository. That is
accurate. Theorem A is different: its construction runs at accessible scale and
was replayed clean (§9), which is the honest reason to prefer it despite the
two logarithms.

**They do not improve the best constructed value.** The certified ladder in
this project reaches $356{,}712$ at $y = 4001$, replayed by an independent
routine with zero uncovered points at all sixteen levels
(`research/G2-STATE.md` §3a), and a further certified $479{,}339$ at
$y = 5003$ (`research/two-class-lower-bounds.md` §0). Those are finite
constructions, and neither theorem above predicts them or is predicted by them.

---

## 11. Residuals, and what would break each theorem

### 11.1 The two load-bearing readings of the source (Theorem B)

Theorem B rests on two sentences of someone else's paper: that Corollary 1's
conclusion depends on $\Omega_p$ only through $g(p) = |\Omega_p|$, and that
$\Omega^{\mathrm{II}}_p$ is defined by the non-linear irreducible factors of
$f$, hence empty for $f = x(x+2)$. Both were read from 200 dpi page images of
the PDF of record by the first adversarial pass, and the first of them was
re-read a third time by the pass that confirmed Theorem A. The second was not
re-read by that pass, which had the PDF only for the Corollary 1 page. If
either reading is wrong the substitution does not go through, and no
computation available here would show it.

*Re-read at source 2026-09-07* (arXiv:2302.00459v2 PDF, md5
`b5d7d2a23ffd902415057adebfe430b1`, matching the artifact recorded in
`research/history/staging/lit-pdf-kalmynin-konyagin.md`; full text, pp. 1 to
7 line by line). Both readings are CONFIRMED. Corollary 1 as printed
imports only Lemma 1's hypotheses, $g$ multiplicative with $g(p) \le \kappa$
and $g(p) < p$, $|r_d| \le g(d)$ for $d \mid P(z)$, $z \ll X$, together with
"for any $p \le z$ the set $\Omega_p \subset \mathbb{Z}/p\mathbb{Z}$ contains
$g(p)$ elements". The polynomial $f$ does not appear in Lemma 1, Corollary 1
or its four-sentence proof; it enters only the proof of Theorem 1 (the
trichotomy on p. 6 and the evaluation of $\sum g(p)/p$ on pp. 6 to 7),
which this manuscript replaces by its own §3 to §5. $\Omega^{\mathrm{II}}_p$
is defined on p. 5 as the residues at which "some non-linear irreducible
factor $q(x)$ of $f(x)$" vanishes, empty for $x(x+2)$. The published
Izvestiya English edition (88:2, 225 to 235; mathnet full text, md5
`9e7f3c54b1979cdfb505c14b4576c4e0`, which now needs a browser User-Agent
to fetch) was read at extracted text for the Corollary 1 material on
2026-09-07 and carries the same statement and proof text.

### 11.2 Halberstam and Richert Theorem 2.2, unread (Theorem B)

Nobody in this project has read it at source, and the record says so rather
than implying otherwise: `research/PRIOR-ART.md` records the companion
Corollary 2.4.1 as UNREACHABLE after fourteen access routes, corroborated by
Ford's course notes rather than verified. Until 2026-09-07 this section also
carried a Selberg-form support correction (§6.2 as it then stood) and the
claim that $\kappa = 4$ was load-bearing with a margin one sieve dimension
wide. Both were about a theorem the source does not cite; the paragraph below
records what the source re-read found, and §6.2 is now a remark. The residual
that remains is only the unread 1974 page behind a printed, refereed Lemma 1,
and it is shared with Theorem A, whose step 1 consumes the same statement at
$\kappa = 2$.

One more residual on the source, found by the red team of 2026-09-07 and
recorded here because it lands on both theorems equally: the printed proof of
Corollary 1 encodes avoidance of $\Omega_p$ by the product $\prod_{p \le z}
\prod_{r \in \Omega_p}(P(z;p)\,n + r\,Q(z;p))$, and the representatives $r$
are left as elements of $\mathbb{Z}/p\mathbb{Z}$; read as integers in
$[0, p-1]$, any $2 \le r \le p-1$ has a prime factor $q<p$ dividing
$P(z;p)$. For $r=0$, choose any other prime $q \le z$ (available for
$z \ge 3$, as here). In either case $q$ divides the factor
$P(z;p)\,n + r\,Q(z;p)$ for every $n$, the
encoded sum is identically zero, and the printed "if and only if" and the
appeal to Lemma 1 both fail whenever some $\Omega_p \not\subseteq \{1\}$,
which holds here at every $p$ since $0 \in \Omega_p$; in the remaining case
$\Omega_p \subseteq \{1\}$ the encoding selects the $n$ avoiding $-\Omega_p$,
not $\Omega_p$ (finite checks at $z = 5, 7, 11$, nine configurations,
`history/reviews-0907/10` §4; the $z = 5$ check of 2026-09-07 gives 3 avoiding
$n \le 30$ against 0 encoded). Choosing $r' \equiv r \pmod p$, $r' \equiv 1 \pmod{P(z;p)}$
repairs it and proves the bound for $-\Omega$, which has the same $g(p)$ and
the same bound; the repaired encoding selects exactly the $n$ avoiding
$-\Omega$, pointwise. The published Izvestiya version (p. 228 of the English
edition, read at extracted text; the mathnet full-text artifact md5
871d344e..., read at page image 2026-09-08) has the same proof text as arXiv
v2 apart from copy-edits, so the slip survived refereeing. The corollary's
statement is the standard Brun bound and is what both theorems consume; the
gap is in the source's proof of it.

*Source identification 2026-09-07.* Halberstam and Richert's 1974 text remains UNREACHABLE at the page: the archive.org copy (item sievemethods0000halb) is a lending copy behind login and loan (page image 403, text 401 on 2026-09-07 and 2026-09-08); Google Books serves an "image not available" placeholder for pp. 68 and 69 of the Dover reprint and no index for the 1974 volume; HathiTrust and ScienceDirect return 403; Montgomery's Bull. AMS review (1976), Schwarz's Zbl review, Ford's 2023 notes, Greaves's monograph and five arXiv papers citing the book do not reproduce Theorem 2.2 (thirteen channels, [history/reviews-0907/12](../research/history/reviews-0907/12-halberstam-richert-second-access.md) §4). Richert's own
*Lectures on Sieve Methods* (Tata 1976, md5
`d2915a3eca4436a760dfaf50e1a1c335`), Chapter 11 notes, cross-references its
Theorem 11.3 as "cf. l.c. Theorem 2.2", l.c. being Halberstam and Richert.
Theorem 11.3 reads: under $(\Omega_1)$, $(\Omega_2(\kappa))$ and $(R)$, for any
$A > 0$, $S(\mathcal A, \mathfrak p, z) \ll X \prod_{p<z}(1 - \omega(p)/p)$ if
$z \le X^A$, with the constant depending on $A$, $A_1$, $A_2$, $\kappa$; and
it holds under $\omega(p) \le A_0$ in place of $(\Omega_2(\kappa))$. Its
hypothesis $(R)$ is the pointwise $|R_d| \le \omega(d)$, and its conclusion
carries **no remainder sum and no support parameter $\xi$**. That shape
matches Kalmynin and Konyagin's Lemma 1 term for term ($g(p) \le \kappa$,
$g(p) < p$, $|r_d| \le g(d)$, $z \ll X$), which is consistent with their
citation. If the identification is right, the Selberg-shape remainder
$\sum_{d \le \xi^2} 3^{\omega(d)}|r_d|$ analysed in §6.2 belongs to a
different theorem (Richert's Theorems 11.1, 11.5 to 11.7, where the printed
condition is $\tau = \ln \xi^2/\ln z \ge 2$, i.e. $\xi \ge z$, the opposite
direction from the "$\xi < z$" the earlier text of §6.2 imposed), and the
"one sieve dimension wide" margin that text claimed is not a property of the theorem
actually consumed: for the CRT-counted sequence of Corollary 1 the
condition $|r_d| \le g(d)$ holds for every $d \mid P(z)$ without a support
restriction. Later the same day the identification was corroborated by the
Dover reprint's OCR search index (Theorem 2.2 at p. 68, Chapter 2 §5, with
the second clause $S \ll X\prod_{p<X}(1-\omega(p)/p)$ for $z \ge X^{1/A}$
and the proof on p. 69 reducing to $z = X^{1/A}$) and by the authors' 1971
Mémoire Theorem 3, which states the same two-clause bound under $(\Omega)$,
$(\Omega_1)$, $(R)$; `research/history/reviews-0907/08`. Both were re-read at
page image on 2026-09-08 (Richert pp. 135 and 150; Mémoire pp. 98 and 100),
and the Dover index re-fetched at pp. 68, 69, 82, 130 and 153
(`reviews-0907/10` §2, §3.3). The printed page image of the 1974 book is still unread. The OCR now covers both clauses, the footnote $B = B(A, A_1, A_2, \kappa)$ and the full Remark ("By virtue of Lemma 2.2, condition $(\Omega_2(\kappa))$ may be replaced by $(\Omega)$"), and the three constant labels reported on 2026-09-07 and 2026-09-08 (B, B3, B5) are three OCR tokens of one page, one per clause and one in the footnote; which subscript the book prints is not decidable from the index and does not enter the consumer. Against the OCR-read hypotheses the substitution discharges with $A = 1$, $A_1 = \kappa + 1$, $A_0 = \kappa$ and $P$ the primes at most $z$, so that $(R)$ is exactly $|r_d| \le g(d)$ for $d \mid P(z)$; the only clause the consumer needs that is seen at no custody is Lemma 2.2 behind the Remark, which the 1971 Mémoire's Theorem 3 (page image) covers independently by stating the bound under bounded $\omega(p)$. The Selberg-form construction remains a valid alternative
route; it is not required by Lemma 1 as cited. This is a source
identification through a secondary text by the same author, not a reading
of the 1974 page. On its strength, after a dependency review and a red
team (`research/history/reviews-0907/05`, `06`), §6.2 was demoted to a
remark on 2026-09-07; a reader with the 1974 text should still check
Theorem 2.2 directly, and the outcome would reach Theorem A equally.

Both theorems consume Corollary 1 at its statement, Theorem A at $\kappa = 2$
and $z = \sqrt{m}$, Theorem B at $\kappa = 4$ and $z = \sqrt{y}$, and Lemma 1's
proof by citation to Halberstam and Richert sits inside a refereed paper,
which is what "published theorem consumed as a theorem" means. The residuals
of this subsection are therefore common to the two theorems.

### 11.3 Prior art

The multi-class construction is Kalmynin and Konyagin's, and the ingredients of
Theorem A are all published and owned by their authors. What is claimed is the
two-class instantiation, the carry-through, and in Theorem A's case the
composition and its custody.

Searched, in the owning convention. The owning convention for the object is
A144311's wording (`research/SEARCH-CONVENTIONS.md` §1), and the probes were
run there with same-session calibration against known positives. A144311's
record carries no formula and no reference line, where the one-class A048670
carries five and one. As of 2026-08-19 no work cites Kalmynin and Konyagin:
forward and reverse citation counts on all three DOIs return zero on OpenAlex,
and the Semantic Scholar citations endpoint returns nothing twice, against
same-session calibration positives returning 46, 48 and 5. A topical sweep for
a two-class lower bound of any shape returns nothing on point.

What was not searched, or failed on the day, travels with the negative. The
arXiv API returned zero bytes on its own known-positive calibration in that
session, so no negative is quoted from it. Semantic Scholar's record endpoint
answered 429 throughout, so no citation count is quoted for the source paper
itself. MathSciNet's free index covers bibliographic fields only, with no
review text and no subject classification, which is the standing residual for
every negative run there. And the Jacobsthal-type function for admissible
$k$-tuples at $k \ge 3$ is recorded as not found and uncalibrated, which is the
reach of the search rather than an absence
(`research/two-class-lower-bounds.md` §2, row 9).

The zero-citation finding is the cleanest negative in this file and also the
one most likely to expire. It should be re-run on the source paper's DOI,
never its arXiv identifier, at the next audit.

### 11.4 What would falsify each claim, and whether the check has run

| claim | what would falsify it | has the check run |
|---|---|---|
| Proposition 1 | a covered run not bounded by twin slots | yes, re-derived by two passes |
| Proposition 3 | an unkilled $i$ failing all three branches with (5.1) holding | yes, brute force to $i = 4 \times 10^6$, zero found |
| $\Omega^{\mathrm{II}} = \emptyset$ | a non-linear irreducible factor of $x(x+2)$ | yes, and it is a triviality; the risk is the reading, §11.1 |
| $\lvert \Omega^{\mathrm{III}}_p\rvert  = 2$ at odd $p$ | one exception | yes, all 78,498 primes below $10^6$, zero exceptions |
| $\kappa = 4$ and $g(p) < p$ | an overlap above $p = 3$ | yes, enumeration to 1000: only $p = 2, 3$, both in band 1 |
| the ledger's $O(1)$ | a residual not converging to $-2.529967$ | yes, $\sqrt{y} = 10^3$ to $10^7$, residual $0.0079$ to $1.9 \times 10^{-5}$ |
| the exponent assembly | a ratio away from 1 | yes, 30 triples to $\ln y = 10^{300}$, $\max$ deviation $5.684\times10^{-13}$ |
| $y_0$ and the binding condition | a different binding inequality | yes, bisection reproduced independently, H2 binds at every $A$ |
| Corollary 1's cardinality-only dependence | a re-read showing otherwise | read at primary text; representative repair checked in section 11.2, with the imported sieve statement retaining its source status |
| Halberstam and Richert Thm 2.2's form | printed in 1974 in a form other than the Brun-type bound under $(R)$ | Richert Tata Theorem 11.3 read at page image 2026-09-08 ("cf. l.c. Theorem 2.2"); Mémoire 1971 Theorem 3 read at page image; Dover OCR of pp. 29, 52, 68, 69 (both clauses, footnote, Remark) re-fetched 2026-09-08 and the hypothesis matrix written; the 1974 page unread after thirteen channels; shared with Theorem A. §11.2 |
| the smooth-number estimate | a $\Psi$ bound weaker than $x\,u^{-(1+o(1))u}$ in the regime $u \asymp \ln\ln y/\ln\ln\ln y$, $z_1 \to \infty$ | yes: Hildebrand and Tenenbaum Theorem 1.2 and Corollary 1.3 read at page image 2026-09-08, range slack; `research/history/reviews-0907/11` |
| the implied constants | any explicit pass | **no.** §8 |

### 11.5 What would move the grade

**Toward submission.** A referee-grade re-reading of §§11.1 and 11.2 by someone
holding the printed Halberstam and Richert beside the Kalmynin and Konyagin
PDF. That is a bounded job and it is the whole gate. An explicit-constants pass
turning $y_0$ into a value rather than a floor; the six inequalities of §8 are
already written and only the constants are missing. One number theorist who
knows the Erdős and Rankin literature confirming that the substitution is
legitimate, which would do more than any further computation here, because no
computation here can reach the construction.

**Against.** A prior-art hit in any convention listed in
`research/SEARCH-CONVENTIONS.md`, which retires the novelty claim though not
the theorem. A failure at §11.1, which kills the substitution outright, or at
§11.2, which would be a defect in a refereed citation and would reach Theorem A
equally. The
optimised band choice succeeding, which would improve the exponent and make
this statement the wrong headline rather than a wrong statement. A published
bound stronger than Theorem B, at which point the move is to cite it and keep
the exponent accounting of §3, which stands regardless.

---

## 12. References

Bibliographic data below is what this project has verified, and the level of
verification is stated per item. An item marked [MEMORY] carries details that
no artifact on disk or page image confirms; see the footnote at the end of this
section.

**The construction.**

- A. Kalmynin and S. Konyagin, *A polynomial analogue of Jacobsthal function*,
  arXiv:2302.00459 (v1 1 Feb 2023, v2 3 Dec 2023); published as *Izvestiya:
  Mathematics* **88**:2 (2024) 225–235, DOI 10.4213/im9467e, MR4727548.
  *Verified at the publisher record 2026-08-18. Theorem 1 checked identical
  across v1, v2 and the published version. The artifact of record for every
  quotation here is the arXiv v2 PDF: 12 pages, 148,566 bytes, md5
  `b5d7d2a23ffd902415057adebfe430b1`, custody in
  `research/history/staging/lit-pdf-kalmynin-konyagin.md` §0.*

**The one-class lower bounds.**

- K. Ford, B. Green, S. Konyagin, J. Maynard and T. Tao, *Long gaps between
  primes*, arXiv:1412.5029, *J. Amer. Math. Soc.* **31** (2018) 65–105.
  *PDF read; the $Y(x) \ll x^2$ sentence checked word for word.*
- K. Ford, B. Green, S. Konyagin and T. Tao, arXiv:1408.4505, *Ann. of Math.*
  **183** (2016). *PDF read, same sentence, same wording.*
- R. A. Rankin, 1938. [MEMORY]
- J. Pintz, 1997. [MEMORY]
- P. Erdős, *On the integers relatively prime to n and on a number-theoretic
  function considered by Jacobsthal*, *Math. Scand.* **10** (1962) 163–170.
  *Located at users.renyi.hu/~p_erdos/1962-12.pdf; one class only.*
- H. Maier and C. Pomerance, *Trans. Amer. Math. Soc.* **322** (1990) 201–237.
  *The heuristic for the exponent located and quoted at p. 205.*

**The upper side.**

- H. Iwaniec, *Demonstratio Math.* **11** (1978): $h(k) \le C(k\ln k)^2$,
  constant inexplicit. *Bibliographic data as carried by this project's record;
  the paper's Lemma 1 has never been read here, and MathOverflow 245539
  (Paseman, 2016) raises an unanswered question about an inequality direction
  inside its published proof.*
- H. Diamond, H. Halberstam and H.-E. Richert, *A Higher-Dimensional Sieve
  Method*, Cambridge Tracts in Mathematics **177**. *Page photographs on disk
  at `attestation/book-ch5-6/`; Theorem 9.1 at p. 104 and the sifting limit at
  p. 79 read from the pages themselves. Page 79 prints $\beta_2 \approx
  4.266$, three decimals.*
- A. R. Booker and T. Browning, *Square-free values of reducible polynomials*,
  *Discrete Anal.* *The source of the twenty-decimal
  $\beta_2 = 4.26645028414864191641$; the three-decimal printing above may not
  be cited for those digits.*
- H. Halberstam and H.-E. Richert, *Sieve Methods*, London Mathematical Society Monographs 4, Academic Press, London and New York, 1974, ISBN 0-12-318250-6 (Dover reprint 2011, ISBN 978-0-486-47939-2, described by the publisher as unabridged), Theorem 2.2, Chapter 2 §5, pp. 68 to 69. [OCR ONLY: statement, footnote and Remark reached at the Dover search-inside index on 2026-09-07 and 2026-09-08; page image unread]
  *Consumed by the source as the proof of its Lemma 1. Unread here. The
  companion Corollary 2.4.1 is recorded UNREACHABLE in
  `research/PRIOR-ART.md` after fourteen access routes, corroborated by Ford's
  course notes rather than verified.*

**Explicit estimates.**

- J. B. Rosser and L. Schoenfeld, *Approximate formulas for some functions of
  prime numbers*, *Illinois J. Math.* **6** (1962) 64–94. *Read at page images
  pp. 69–70 on 2026-09-08 (Project Euclid, md5 `357d126e8d5e498a74e750f2c3ff83cd`):
  Corollary 1, (3.5) $x/\log x < \pi(x)$ for $x \ge 17$ and (3.6)
  $\pi(x) < 1.25506\,x/\log x$ for $x > 1$, consumed in §7; Theorem 5, (3.17),
  (3.18), the explicit Mertens bound with error $1/(2\ln^2 x)$, the upper
  bound for $x \ge 286$, consumed in §6.3.*
- P. Dusart, *Estimates of some functions over primes without R.H.*,
  arXiv:1002.0442, Theorem 6.10: $|\sum_{p \le x} 1/p - \ln\ln x - B| \le
  1/(10\ln^2 x) + 4/(15\ln^3 x)$, the upper bound for $x \ge 10372$. *Read at
  extracted text 2026-09-08; this is the form §6.3's figures use.*
- A. Hildebrand and G. Tenenbaum, *Integers without large prime factors*,
  J. Théorie Nombres Bordeaux **5** (1993) 411–484, numdam
  `JTNB_1993__5_2_411_0`. *Read at page images pp. 414–417 on 2026-09-08 (md5
  `a036c61d06a8199185379c883059566a`). Theorem 1.2:
  $\log(\Psi(x,y)/x) = \{1 + O(\exp(-(\log u)^{3/5-\varepsilon}))\}\log\rho(u)$
  uniformly for $y \ge 2$, $1 \le u \le y^{1-\varepsilon}$, the upper bound
  implicit in de Bruijn (1966); Corollary 1.3: $\Psi(x,y) = x\,u^{-(1+o(1))u}$
  as $y, u \to \infty$ uniformly for $u \le y^{1-\varepsilon}$. §6.5 consumes
  Corollary 1.3 at $x = m + 2$, $y = z_1$, where
  $u \sim A\ln\ln y/\ln\ln\ln y$ and the range hypothesis is slack. Theorem
  1.1 (Hildebrand 1986) with its range $u \le \exp((\log y)^{3/5-\varepsilon})$
  is not needed.*

**The object and its data.**

- OEIS **A144311** (A. Carter, September 2008, $a(1)$ to $a(7)$;
  M. Alekseyev, 2009, $a(8)$ to $a(16)$; Wang, 2024, $a(17)$ to $a(22)$), 22
  terms to $y = 79$, equal to $G_2(P(y)) - 1$. *Entry read; it carries no
  formula line and no reference line.*
- OEIS **A048670** (Jacobsthal at primorials), **A288815** and **A072753**
  (paired and free two-class), **A059861** (twin-slot census).
- L. Ziller and J. Morack, arXiv:1706.00317 and arXiv:1706.03668, with
  `full_details.pdf`. *Read; they carry an upper-bound conjecture and no lower
  bound.*
- T. R. Hagedorn, *Math. Comp.* **78** (2009), Proposition 1.1. *One class.*
- A. Kourbatov, arXiv:1301.2242. *The maximal twin-gap law, conjectural, and it
  is $0.76\log^3 p$.*

**The frame.**

- F. B. Holt and H. Rudd, arXiv:1408.6002; F. B. Holt, arXiv:2603.25915;
  primegaps.info; code and data at github.com/fbholt/Primegaps-v2 (73 MB,
  cloned 2026-08-17). *The cycle of gaps $G(p\#)$, the fold recursion and its
  closure theorem, the transfer operator with binomial eigenvectors, and the
  interval of survival $[p_k^2, p_{k+1}^2]$. Priority is theirs; see
  `research/PRIOR-ART.md`.*

**Discussion.**

- Erdős problems #687 (US\$1000, the order of $Y(x)$) and #970 (the order of
  $h(k)$); MathOverflow 88323 (*Analogues of Jacobsthal's function*), the
  question whose convention owns the bounded-classes-per-prime formulation.
  *All re-checked at the pages 2026-08-18.*

**Footnote on [MEMORY].** Two entries above are marked [MEMORY]: Rankin 1938 and Pintz 1997. Halberstam and Richert's *Sieve Methods* Theorem 2.2 is marked [OCR ONLY]: its bibliographic details are confirmed (OpenLibrary and Zbl 0298.10026) and its statement is reached at an OCR index, which is not a reading; the page image is the owed item (§11.2). Two
former [MEMORY] entries, the Rosser and Schoenfeld numbering and the
smooth-number estimate, were read at page images on 2026-09-08; the first was
misattributed (`research/history/reviews-0907/11`, F1). For each,
this project holds the statement and uses it, and holds no page image, PDF or
photograph confirming the bibliographic details as written. The distinction
matters here because this project has already retracted one constant that came
from an arXiv HTML rendering rather than from a PDF, and the rule adopted after
that (`research/PRIOR-ART.md`, "Provenance: what artifact was actually read")
is that a quotation records which artifact it was read from. These five record
that no artifact was read.

---

## Appendix A. Provenance of every number

Every figure printed above, in order of appearance, with the corpus file or
cited page it comes from. Producers named here carry embedded OUTPUT blocks
written by `research/qc/embed.js`, so each figure below the banner is bound to
the code above it by a `code-sha256`; no number in this note was pasted by
hand from a terminal.

| number | where it appears | source |
|---|---|---|
| $\beta_2 = 4.26645028414864191641$ | §1.2, §3, §10 | Booker and Browning, via `research/PRIOR-ART.md`; the tract's p. 79 prints $4.266$ |
| $\beta_1 = 2$, Iwaniec's exponent | §1.1 | `research/covering-dive.md`, "where the proof breaks" item 1 |
| gap factor $y^{3.266+o(1)}$ | Abstract, §10 | arithmetic on the two rows of §10's table |
| $G_2/g$ = 2.00, 3.00, 3.00, 3.00, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00, 7.38 at $y = 5 \dots 41$ | §2 | `research/two-class-lower-bounds.md` §1, VERIFIED at all eleven shared terms |
| A144311, 22 terms to $y = 79$; Carter 2008 $a(1..7)$, Alekseyev 2009 $a(8..16)$, Wang 2024 $a(17..22)$ | §1.2, §12 | `research/PRIOR-ART.md`; `research/SEARCH-CONVENTIONS.md` §§1, 2 |
| $\mathrm{Res}(x, x+2) = 2$; $\mathrm{Res}(x(x+2),(x-1)(x+1)) = -3$; $\mathrm{Res}(x(x+2),(x-a)(x-a+2)) = a^2(a^2-4)$ | §4 | `research/attack-kk-substitution.js`, §§C, D |
| 78,498 primes below $10^6$, zero exceptions to $\lvert \Omega^{\mathrm{III}}_p\rvert  = 2$ | §4, §11.4 | `research/attack-kk-substitution.js` |
| overlap only at $p = 2, 3$, by enumeration to 1000 | §6.1, §11.4 | `research/attack-kk-substitution.js` |
| brute force at $y = 200000$, $z_1 = 300$, $m = 4\times10^6$, threshold $2m/y = 40$; unkilled 16985 / 14381 / 13164 / 11228 / 10372 / 9086 and counterexamples 0 / 0 / 0 / 235 / 799 / 2921 at $z_0 = 100, 60, 45, 30, 20, 10$ | §5 | `research/verify-kk-substitution.js`; report `research/history/staging/verify-kk-substitution.md` |
| $3\kappa - 1 = 11$ at $\kappa = 4$; $\xi = \sqrt{y}/(\ln y)^7$; $C > 3\kappa/2$ | §6.2 (remark) | second adversarial pass, `research/history/CHANGELOG.md` 2026-08-19, which had no source PDF and priced a Selberg-form remainder Lemma 1 does not carry; demoted 2026-09-07, `research/history/reviews-0907/05`, `06` |
| $M = 0.2614972128476428$ | §6.3 | Mertens' constant, standard; used by `research/attack-kk-substitution.js` |
| limit $-2\ln2 + 2M - 2(\frac12+\frac13) = -2.529967$; residual $0.0079$ at $\sqrt{y}=10^3$ falling to $1.9\times10^{-5}$ at $\sqrt{y}=10^7$ | §6.3, §11.4 | `research/attack-kk-substitution.js` |
| explicit Mertens error $1/(10\ln^2x) + 4/(15\ln^3x)$ (Dusart, Theorem 6.10, $x \ge 10372$; Rosser and Schoenfeld's (3.18) has $1/(2\ln^2 x)$, $x \ge 286$); evaluated at $A = 5$: $2.475\times10^{-4}$ at $\ln y = 10^3$ and $1.911\times10^{-5}$ at $\ln y = 10^9$ | §6.3 | statements per §12, read 2026-09-08; evaluations by `research/attack-kk-substitution.js` §F4 (the prose there still names Theorem 20) |
| exponent assembly, 30 triples to $\ln y = 10^{300}$, $\max\lvert \text{ratio}-1\rvert  = 5.684\times10^{-13}$ | §6.4 | first pass plus an independent second pass at machine precision, `research/history/CHANGELOG.md` 2026-08-19 |
| Hildebrand slack $\ln z_1/(\ln\ln m)^{5/3}$: $6.364\times10^{-1}$ at $\ln y = 10^2$, $2.339\times10^5$ at $\ln y = 10^9$ | §6.5 | `research/attack-kk-substitution.js` |
| least admissible $A$ rising $2.3196 \dots 3.8185$ | §6.5 | `research/attack-kk-substitution.js`, bisection per scale |
| $0.62753$; $\ln y > 11.807294$; $y > 1.3423\times10^5$ | §7 | Rosser and Schoenfeld Corollary 1, (3.5) and (3.6), read at page image 2026-09-08, plus arithmetic in `research/attack-kk-substitution.js` |
| $y_0$ table: $L_0 = 3.0867\times10^2$, $4.0795\times10^2$, $5.3747\times10^2$, $1.2733\times10^3$, $3.1008\times10^3$ at $A = 4.05, 4.5, 5, 7, 10$; $y_0 = 10^{134.1}, 10^{177.2}, 10^{233.4}, 10^{553.0}, 10^{1346.7}$; H2 binding throughout | §8 | `research/attack-kk-substitution.js`, seven-inequality bisection, reproduced independently by the second pass |
| $z_1 = 2.07$ against $z_0 = 5.26\times10^3$ at $y = 4001$, $A = 4.05$ | §8 | live-layer corrected value, `research/two-class-lower-bounds.md` §4c. The frozen `attack-kk-substitution.md` §5 still carries the pre-correction $z_0$ figure, three orders larger, with no run behind it; the conclusion is unaffected because $z_0$ already exceeds $y$ there |
| factor 4.0 to 6.6, three-band certificate against plain greedy at $y = 4001$ | §8 | `research/history/staging/attack-lower-bound.md` D4, cited only to be excluded as evidence |
| ratio $4.6052$ at $\ln y = 10^2$ to $20.7233$ at $\ln y = 10^9$ for the method's own one-class shortfall | §8 | `research/attack-kk-substitution.js` |
| $c_0 = 1/(8C_3)$ | §9 | `research/history/staging/import-hypergraph.md` §4 step 3 |
| $\lvert V\rvert  = 9889$; degree $1.708115$; $\prod(1-2/q) = 0.1750499$; $E = 1731.07$; mean leftover $1730.83$; trial variance ratio $0.43$; best trial 1654; mop-up 1153 primes at 1.43 slots per prime; largest prime $10861$; uncovered in $[1, 200000]$ zero; ratio $1.9816$ | §9 | `research/history/staging/redteam-0820-math.md` §3.4, producer `rt0820-t3-cover.js`, rebuilt from the pre-registration text alone |
| exponent $1.50 \pm 0.05$ on 22 trusted terms; control bias $+0.28$ | §10 | `research/exponent-control.md` §§1, 5 |
| certified $356{,}712$ at $y = 4001$, sixteen levels, zero uncovered | §10 | `research/G2-STATE.md` §3a |
| certified $479{,}339$ at $y = 5003$ | §10 | `research/two-class-lower-bounds.md` §0 |
| md5 `b5d7d2a23ffd902415057adebfe430b1`, 12 pages, 148,566 bytes | §12 | `research/history/staging/lit-pdf-kalmynin-konyagin.md` §0 |
| zero forward and reverse citations on three DOIs (OpenAlex); Semantic Scholar empty twice against calibration positives 46, 48, 5; A048670 carries five formula lines and one reference line | §11.3 | `paper/proposals/prop-kk-lower-bound.md` §4, run 2026-08-19 |

**One attribution this note declines to make.** Section 8 compares the
method's own one-class output against "the one-class lower bound quoted in the
source's own introduction at p. 2". This project's records name that quoted
bound two different ways, Ford, Green, Konyagin and Tao in
`paper/proposals/prop-kk-lower-bound.md` §6 and Ford, Green, Konyagin, Maynard
and Tao in `paper/proposals/draft-kk-lower-bound.md` §6, and the source page
has not been re-read to settle which. The comparison is unaffected, since the
two published bounds agree in the shape being compared, and the name is left
unstated rather than guessed.

---

## Appendix B. Custody residuals in the underlying records

Three residuals sit in the frozen staging records rather than in the
mathematics, and a reader following the citations will meet them. This project's
document convention keeps frozen records frozen and corrects in the live layer,
so the disagreements below are by design and are listed rather than repaired.

1. `research/history/staging/attack-kk-substitution.md` §5 carries a $z_0$
   figure at $y = 4001$ with no run behind it, three orders too large. The
   corrected value is in `research/two-class-lower-bounds.md` §4c and is what
   §8 above uses.
2. That file and the first adversary's report use opposite conventions for
   $p_0$, each matching its own producer, and the two have not been reconciled.
3. The frozen first adversary's report reads "necessary and sufficient" for the
   Case 1 inequality (5.1) where the live layer, and §5 above, read
   "sufficient" only. The brute force supports the weaker reading and not the
   stronger one.

A draft quotes the live layer. This one does.

---

## Appendix C. Registry updates this draft implies

Listed rather than made, since this note is written under a fence that permits
no edits to existing files.

- `paper/proposals/PROPOSALS.md`: the `prop-kk-lower-bound.md` row's grade stays
  QUICK-DRAFT and its "last regraded" date stands, since a draft existed
  already; the row's pointer should name `paper/kk-lower-bound.md` as the draft
  of record beside `paper/proposals/draft-kk-lower-bound.md`, which becomes the
  earlier, shorter version rather than the draft.
- `paper/proposals/PROPOSALS.md`: `prop-xlnx-lower-bound.md`'s first upgrade
  trigger reads "upgrade to QUICK-DRAFT when the paper case is written". Section
  9 above writes it, inside a note that states both bounds with their grades,
  which is what that trigger asked for. The grade should move PROPOSAL to
  QUICK-DRAFT, with the regrade recorded in `research/history/CHANGELOG.md` per
  the registry's regrade rule.
- `paper/PAPERS.md`: the suite has no entry for a two-class lower-bound note.
  Either it becomes a fifth paper or it folds into Paper II, which already
  carries the pointwise $G_2 \ge g$ bound and is the note that would then be
  two-sided at three levels rather than two. That is a call for Chris, and the
  reason to prefer folding is that a referee reading a lower-bound note wants
  the upper bound in the same document.
- `research/two-class-lower-bounds.md` §4c and `research/G2-STATE.md` §3a: both
  carry the two theorems already, at the grades used here; the only change is a
  pointer to this draft.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in
[research/history/CHANGELOG.md](../research/history/CHANGELOG.md), indexed by
document.*
