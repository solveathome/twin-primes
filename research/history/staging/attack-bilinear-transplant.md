# attack-bilinear-transplant — can this frame host Type-II information? The tile side cannot, the zone side can express one, and the estimate it needs is the one already recorded absent

<!-- ledger
id: Q-bilinear-transplant
status: CLOSED
todo: none
question: Does this programme's frame have anywhere to put bilinear or Type-II arithmetic information, the only thing that defeats parity in practice?
verdict: The tile side cannot host it, since no corpus object is a signed sum over two ranging element ranges; the zone side can express one, and the estimate that one needs is the one already recorded absent. Section 9 lists the four findings that would reopen the row.
-->

*(Staging note, 2026-08-26. Nothing here is integrated into a live document.
Question asked: the parity obstruction is defeated in practice only by
bilinear/Type-II arithmetic information (Vinogradov; Chen's switching;
Friedlander–Iwaniec's asymptotic sieve; Harman's method). Does this
programme's frame have anywhere to put such information? No repo file is
edited by this note; every proposed addition to a live file is marked
PROPOSED and left unapplied. Calibration marked per claim: PROVEN,
MEASURED, HEURISTIC, SCRATCHPAD, ABSENT-PER-CONVENTION, NOT REACHED.)*

**HELD-document rider, carried at the top because three of this note's
premises rest on it.** `quadpoint-identity-01.md`, `quadpoint-prior-art.md`,
`stretch-01.md` and `destroyer-census-01.md` are HELD and have never had an
adversarial pass (`TODO.md` Z0). Everything below that leans on the capture
identity `floor_K = T − X(K)`, on the crossing law `u ω(u) = 2`, or on the
stretch's structure is therefore built on an **UNVERIFIED PREMISE**, and the
note says so at each use rather than once.

---

## 0. The disconfirming half first

Three things go against this run, and they are stated before anything it found.

1. **The question is not new to the corpus, and the corpus already answered
   the version it asked.** `research/sift-limit-attack.md` §4.1 prices
   Friedlander–Iwaniec's asymptotic sieve for primes explicitly — "Both are
   DP4 inputs. Our DP4 is already saturated free of charge, and what these
   sieves buy (detecting primes inside a sifted sequence, breaking the parity
   factor 2) is not our bottleneck at 4.2665. Verdict: … no direct
   application." `research/THE-DIALS.md` prices the almost-prime axis (dial 5,
   "proven, off the target"), the choice-of-`d` axis (dial 6, "the only breach
   ever made", "not ours to redo") and the level-of-distribution axis (dial 7,
   "inert on the target legs"). `research/bv-import-survey.md` §4 already
   writes Chen's theorem in tile vocabulary and calls a tile-native reproof
   "feasible and worth doing", with the distance to twins named as the parity
   wall. **What was not asked before is the Z2/zone-coordinate version and the
   short-interval version**, and that is the whole of this note's licence.

2. **The route collides in machinery with eight closed rows of
   `research/REFUTED.md`** (34, 36, 37, 54, 63, 78, 79, 80: Lemma V's
   mean-square form, Brüdern–Fouvry's left factor and its re-split, the
   ℓ¹→ℓ²√log conversion, generic chaining, the smooth-profile manufacture, the
   Kowalski–Michel–Sawin branch, the DI/Pascadi coefficient axis). It does not
   collide in *target*: every one of those rows aims bilinear machinery at the
   **level of distribution**, and this note aims it at **parity**. That is a
   real distinction and §2 argues it is also the distinction that kills the
   route, so the collision is worth stating twice rather than once.

3. **The brief's own premise (a) is wrong, and correcting it is part of the
   deliverable.** The brief reasoned that because our capture identity is
   "Buchstab bookkeeping plus Chen's switching principle", Chen's
   parity-relevant machinery is already inside it. Switching is not the
   parity-relevant ingredient: Fouvry and Grupp reached `p + 2 = P₂` **without
   switching**, Iwaniec's ICM names `P₂` as the *ceiling* of the classical
   system, and whether `p + 2` has an odd number of prime factors infinitely
   often is still open. Sources and quotations in §2.6.

4. **The expected answer is the one that arrived.** The frame does not host
   parity-breaking information; the estimate it would need is already on the
   corpus's own ABSENT list; and the short-interval literature does not come
   near the interval length a zone is. Nothing in this note moves an exponent,
   a constant, or a certificate.

**What is new, and it is five flat statements.**

- **(N1)** The tile side of the frame is Type-I *by construction*, and the
  mechanism is periodicity plus the absence of any signed prime-detecting
  weight. Every bilinear object the corpus owns is bilinear **over moduli**,
  never over elements. §3.1.
- **(N2)** The zone side is not: the capture identity's own candidate map
  `v = r·m` is a genuine product with both factors ranging, and it spans the
  Friedlander–Iwaniec Type-II window `(x^{1/3}, x^{1/2})` that their (B1)
  forces. Measured share of the stretch's composite mass with
  `lpf(v) > v^{1/3}`: 0.4328, 0.2415, 0.1753, 0.1339 at
  `Q = 101, 1009, 10007, 99991` (SCRATCHPAD, §4.2). The product structure is
  there and it carries no signs, which is why it counts and does not cancel.
  §3.2.
- **(N3, and this is the hardest thing in the note)** The
  Friedlander–Iwaniec machine **cannot be posed** for a zone-supported
  sequence, for a reason prior to parity. Their (R1) forces the level
  `D > x^{2/3}`; their own remark forbids `D(x) > A(x)`; a stretch has
  `A(x) ⩽ x^{θ}` with `θ → 1/2`. Measured fraction of anchors whose stretch
  even reaches `θ > 2/3`: 0.4053 → 0.1678 → 0.0339 → **0.0023** over the
  decades `10³` to `10⁷` (SCRATCHPAD, §4.3). Deficit `x^{1/6}` — a power, not
  a log. §2.3.
- **(N4)** The short-interval sieve's own arithmetic input **vanishes at
  exactly a zone's exponent**. The level in the short-interval
  Bombieri–Vinogradov lemma that every `p + 2 = P₂` short-interval result runs
  on is `D ⩽ x^{θ−1/2}(log x)^{−B}`, asserted only for `7/12 < θ ⩽ 1`, and
  **the bound does not depend on `r`** — so relaxing `P₂ → P₃` buys weighted-
  sieve slack, not arithmetic. At `θ = 1/2` the level is 1: no moduli. §5.3.
- **(N5)** Two numeric locations the corpus did not have. The certificate's
  usable depth range is `u ∈ [2, u*)` with `u* = 3.565845`, and the proven
  dimension-2 positivity range is `u > β₂ = 4.26645`: **disjoint**, missing
  each other by **0.70060 in `u`** (§2.5). And the twin short-interval
  exponent has moved `0.98 → 0.971` since 1976 — **0.009 in half a century**
  (§5.2) — against a zone's `θ → 1/2` with an unconditional ceiling of
  `0.7625` on any zone at any anchor (§5.1).

---

## 1. What the certificate is, in one place

*(UNVERIFIED PREMISE: `quadpoint-identity-01.md`, HELD, never red-teamed.)*

Anchor `Q`, stretch `S_Q = [Q², Q′²)`, height `h = Q²`, width
`w = Q′² − Q²`. `C` = channel positions (pairs admissible mod 30), `T` =
twins, `X(y)` = pairs with both members composite and both `y`-rough,
`M` = mixed prime/composite pairs. The capture identity is
`floor_K = T − X(K)`, so the certificate at depth `y` is exactly

> **`X(y) < T` inside `S_Q`.**

Its classical restatement (identity note §4.2, main-term only, inheriting the
product-form hypothesis of `quadpoint-prior-art.md` §2.3): `S(A, y) < 4T`,
where `S(A, y)` is the dimension-2 twin sifting function for
`A_p = {n : p | n(n+2)}`. Its precision class: the margin is
`(T − X)/C ~ 1/ln²h`, on an interval as short as `w`.

Two coordinates matter below.

- **`u = ln h / ln y`**, the sieve's sifting parameter. Full depth `y = Q`
  gives `u = 2`; `y ≤ Q` forces `u ≥ 2`. The crossing law `u ω(u) = 2` has
  root `u* = 3.565845` (`quadpoint-prior-art.md` §2.2, SCRATCHPAD there,
  never re-derived inside an embedded producer), so `X(y) < T` holds
  heuristically for `u < u*`. The certificate's usable range is therefore
  `u ∈ [2, u*)`.
- **`θ = ln w / ln h`**, the interval exponent, which is the coordinate the
  short-interval literature is indexed by. `w = Q′² − Q² ≈ 2Q·g_Q`, so
  `θ → 1/2` and the finite-level values are §5.1's.

---

## 2. Question 1 — the minimal bilinear input, written down and priced

### 2.1 The distinction that decides the whole note

Two different things are called "bilinear" in this corpus and in the
literature, and conflating them is the failure mode this section exists to
avoid.

| | bilinear **over moduli** | bilinear **over elements** (Type-II) |
|---|---|---|
| shape | `Σ_{d₁,d₂ ≤ D} λ_{d₁} λ_{d₂} r_{d₁d₂}(x)`, or `Σ_q γ_q (π(x;q,a) − …)` | `Σ_{m∼M} Σ_{n∼N} α_m β_n a_{mn}`, `M, N ≥ x^δ`, `α, β` arbitrary bounded |
| what it buys | **level of distribution** `θ` | **parity information** |
| in print | BV `θ = 1/2`; BFI; DI; Zhang/Polymath8; Maynard; Lichtman; Pascadi | Vinogradov's minor arcs; FI's asymptotic sieve; Harman's asymptotic pieces |
| does it defeat parity? | **No.** Selberg's parity example has remainder `O(1)`, i.e. perfect level; and EH/GEH-strength input still yields only the `d ∈ {2,4,6}` disjunction (Polymath8b, via `bv-import-survey.md` §2) | **Yes**, where it is available |
| where the corpus's objects sit | **all of them** | none |

Every bilinear object in this corpus is in the left column: Lemma V's
remainder is a sum over `(d₁, d₂)` (`sift-limit-attack.md` §4.5), reduced in
`attack-sqrt-cancellation.md` to a trilinear Kloosterman-fraction form over
`(d₁, d₂, h)`; `Θ_e(a)` (import rows 5 and 6) is indexed by modulus and
frequency; the BFI/DI/Pascadi imports are all statements about moduli. **The
corpus has never formed a sum over a product of two ranging ELEMENTS with
signed coefficients.** That is (N1) and §3 gives its mechanism.

### 2.2 The hypothesis, taken from the source that states it

Friedlander and Iwaniec, *Asymptotic sieve for primes*, **Ann. of Math. (2)
148** (1998) **1041–1065**, read in full at source this session
(arXiv:math/9811186v1, sha256 in §6). For a non-negative sequence
`A = (a_n)`, `A(x) = Σ_{n≤x} a_n`, `A_d(x) = Σ_{n≤x, d|n} a_n =
g(d)A(x) + r_d(x)`, their two load-bearing axioms are, **verbatim, p. 1043**:

> **(R)**  `Σ_{d⩽D} μ²(d)|r_d(t)| ⩽ A(x)(log x)^{−2^{22}}`
> for all `t ⩽ x` with some `D = D(x)` such that
> **(R1)**  `x^{2/3} < D(x) < x`.

> We assume an estimate for bilinear forms of the following type:
> **(B)**  `Σ_m |Σ_{N<n⩽2N, mn⩽x} γ(n) μ(mn) a_{mn}| ⩽ A(x)(log x)^{−2^{22}}`
> for every `N` with
> **(B1)**  `Δ^{−1}√D < N < δ^{−1}√x`
> for some `δ = δ(x) ⩾ 2` and `Δ = Δ(x) ⩾ 2`, and where the coefficients are
> given by
> **(B2)**  `γ(n) = γ(n, C) = Σ_{d|n, d⩽C} μ(d)`.
> This is required for every `C` with **(B3)** `1 ⩽ C ⩽ xD^{−1}`.

Three of their own remarks fix the shape of the answer, all **verbatim,
p. 1045**:

> "the source of cancellation in the bilinear form in (B) comes from the sign
> changes of the Möbius function `μ(mn)` in the inner sum";

> "our stipulation of the lower bound restriction `N > Δ^{−1}√D` in (B1) is
> essential; indeed by narrowing this slightly to `N > √D` we would not be
> able to break the parity problem";

> "Actually, for thin sequences `A` one cannot expect (R) to hold with
> `D(x) > A(x)` and for such sequences the classical sieve does
> correspondingly worse."

And, **verbatim, p. 1046**, the sentence that answers the question this note
was sent to ask:

> "we certainly expect that the sieve given here is quite capable of settling,
> for instance, the twin prime problem. **The stumbling block is that in this
> case we have no idea how to prove that the relevant sequence satifies the
> condition (B). Even proving (R) to such a high level is currently beyond
> reach.**" *(their typo, reproduced)*

**Written in the repo's notation, then.** Take the stretch's sequence

> `a_v = 1` if `v ∈ S_Q = [Q², Q′²)` and `v + 2` is `y`-rough; `0` otherwise,

so `A(x) = Σ_v a_v` is the count the certificate must bound, and
`Σ_p a_p log p` is the twin count with a log weight. The minimal bilinear
input is **(B) for this sequence**, i.e.

> **(B_Q)** `Σ_m |Σ_{N<n⩽2N, mn ∈ S_Q} γ(n,C) μ(mn) a_{mn}| ⩽
> A(x)(ln x)^{−2^{22}}` for every `N` with `Δ^{−1}√D < N < δ^{−1}√x` and
> every `C ⩽ xD^{−1}`, uniformly in the anchor `Q`.

### 2.3 The hypothesis is not merely unproven for our sequence — it cannot be posed

**This is the run's hardest result and it does not go through parity at all.**
FI's (R1) demands `D(x) > x^{2/3}`. Their own remark (quoted above) says (R)
cannot be expected once `D(x) > A(x)`. Our sequence is supported on a stretch,
so

> `A(x) ⩽ w = x^{θ}` with `θ → 1/2`,

and `θ > 2/3` is exactly the condition for `A(x)` to reach the level (R1)
forces. **Measured** (SCRATCHPAD, §4.3), the fraction of anchors whose stretch
is even that wide:

| decade of `Q` | 10–10² | 10²–10³ | 10³–10⁴ | 10⁴–10⁵ | 10⁵–10⁶ | 10⁶–10⁷ |
|---|---|---|---|---|---|---|
| fraction with `θ > 2/3` | 0.9524 | 0.7133 | 0.4053 | 0.1678 | 0.0339 | **0.0023** |

`θ > 2/3` needs a prime gap `g_Q > Q^{1/3}`, against gaps that are `≍ ln²Q`
on every model and on every measurement. So the eligible fraction is not
merely falling; it is heading to zero faster than any power. **The
Friedlander–Iwaniec machine is structurally unavailable to a zone-supported
sequence, for a reason that has nothing to do with parity and nothing to do
with whether (B) is provable: the stretch does not carry enough mass to
support the level its own Type-I axiom requires.** Deficit at the exponent:
`x^{2/3}` against `x^{1/2+o(1)}`, i.e. a factor `x^{1/6}` — a power, not a log.

### 2.4 What is proven on each axis, and why the ladder is the wrong ladder

**The level-of-distribution ladder, priced as the brief asked.** Every entry
below is an (R)-axis statement. None is a (B)-axis statement.

| result | level `θ` | class of moduli / weights | residue |
|---|---|---|---|
| Bombieri–Vinogradov 1965 | 1/2 | arbitrary, absolute values | **max over `a`** |
| Bombieri–Friedlander–Iwaniec, *Acta Math.* **156** (1986), Thm 10 p. 209 | **4/7 ≈ 0.5714** | well-factorable `λ(q)` | **fixed `a ≠ 0`**, no max, no absolute values |
| Zhang, *Ann. of Math.* **179** (2014), Thm 2 | 1/2 + 1/584 | squarefree, `x^{1/1168}`-smooth | root classes |
| Polymath8a, *ANT* **8**:9, Thm 1.1 | 1/2 + 7/300 | squarefree, smooth / densely divisible | CRT-coherent |
| Maynard, Mem. AMS **306**(1543), Thm 1.2 / 1.1 | 7/12; **3/5** | well-factorable linear-sieve; **triply** well-factorable | fixed `a` |
| Lichtman, *ANT* **19**:1 (2025) 1–38, Thm 1.1 | **10/17 ≈ 0.5882** | his modified linear sieve | fixed `a` — **the twin-usable one** |
| Lichtman, arXiv:2309.08522, Cor 1.5 | 66/107 ≈ 0.6168 | **triply** well-factorable | fixed `a` — **not usable for twins** |
| Pascadi, arXiv:2505.00653, Thm 1.3 | **5/8 − ε** unconditional; 3/5 − ε | triply well-factorable; well-factorable linear-sieve | fixed `a ≠ 0` |

The reason the ladder is the wrong ladder is one sentence with a number in it,
and Lichtman states the conversion himself (arXiv:2109.02851 p. 3, via the
agent's read): **level `x^{θ−ε}` gives `π₂(x)/Π(x) ≲ 2/θ`, which bottoms out
at `2` as `θ → 1`.** That is `natal-cap-10-sieve-cap.md` §1.5's parity floor,
re-derived from the top of the ladder rather than from Selberg's example.
Every twin output in the entire (R)-axis literature is an **upper** bound. The
certificate needs a **lower** bound on `T`, at relative precision `1/ln²h`.
The corpus's own numeric form of the same statement is
`natal-cap-10-sieve-cap.md` §4's ordering, and no (R)-axis input moves any
term of it:

> `C*(x) < 1` (truth) `< 2` (parity floor) `< 3.29956` (record)
> `< 4` (BV wall) `< 8` (interval-uniform).

*(Record-column rider: `3.29956` is the refereed record, Lichtman ANT 19:1
(2025) Thm 1.2. Two preprints stand ahead of it — Lichtman arXiv:2309.08522 at
3.2290 and Pascadi arXiv:2505.00653 Cor 1.4 at `3.203 + o(1)` — and the corpus
already carries both in `sift-limit-attack.md` §4.2. Neither crosses the
parity floor 2, which is the only thing the ordering is being used for here.
Pascadi's paper is a preprint: `Forum Math. Pi` **14** (2026) e8 is his
**other** paper, arXiv:2404.04239, and the two must not be conflated.)*

**The (B) axis, priced.** Nothing has moved on it since 1998, and the object
is posed as an open question in the field's own survey:

- **Maynard, "Counting primes", Proc. ICM 2022, Vol. 1, §6 p. 15**, verbatim
  (agent's read at `mathunion.org`): "**Question 17 (Type II estimates for
  twin primes).** Can one estimate a Type II sum associated to Twin Primes,
  such as `Σ_{n∼N} Σ_{m∼M} α_n β_m Λ(nm + 2)` for arbitrary 1-bounded
  sequences `α_n, β_m`?" — preceded by "we currently do not know how to
  estimate Type II sums for most of the outstanding open problems on primes."
- **Polymath8b §8**, arXiv:1407.4897, verbatim: if one could bound bilinear
  expressions `Σ_d Σ_m α(d)β(m) 1_{[x,2x]}(dm) Λ(dm+2)` then "one would very
  likely obtain non-trivial bounds … which would soon lead to a proof of the
  twin prime conjecture. **Unfortunately, we do not know of any plausible way
  to control such bilinear expressions.**"
- **Tao, "Notes on the Bombieri asymptotic sieve" (2016)**, verbatim: no bound
  on the relevant `δ_x` beyond the trivial `[0, 2]` "is known, even if one
  assumes all other major conjectures in number theory than the prime tuples
  conjecture and its variants (e.g. GRH, GEH, GUE, abc, Chowla, …)."

**So `(B_Q)` is Maynard's Question 17 restricted to a short interval and made
uniform in the interval's position.** It is strictly harder than an open
question, and the short-interval, position-uniform layer on top of it is the
object `attack-sqrt-cancellation.md` §6 already records as **ABSENT** —
searched in the owning convention "bilinear/trilinear forms with Kloosterman
fractions" per `research/SEARCH-CONVENTIONS.md` §1, on WebSearch, the arXiv
API and OpenAlex, each calibrated in-session. The uniformity price is quoted
at source there: Bettin–Chandee's Remark 1 charges `(1 + hx/MN)^{1/2}`,
`O(1)` only for `x ≪ H^{1.212157}` while our `x` reaches `exp(H^{0.2344})`.

**`(B_Q)` is TPC-STRENGTH**, and by the import map's circularity rule it is
legal to pursue only with an independent reason to think it softly provable.
There is none, and the chain is three steps long in the wrong direction:
`(B_Q)` ⟹ short-interval position-uniform Type-II ⟹ Maynard's Question 17 ⟹
the twin prime conjecture, with the last implication asserted by Polymath8b
in the words quoted above.

### 2.5 Against the sifting limit, and this is the new number

The certificate's usable depth range is `u ∈ [2, u*)`, `u* = 3.565845`. Proven
dimension-2 positivity — the region where a lower-bound sieve gives anything
at all — is `u > β₂ = 4.26645028`. The two ranges are **disjoint**, and the
miss is

> `β₂ − u* = 4.26645 − 3.56585 = ` **`0.70060`** in `u`,

equivalently a factor `h^{1/u* − 1/β₂} = h^{0.046052}` in the depth `y`
(2.336 at `h = 10⁸`; 5.455 at `h = 10¹⁶`; unbounded).
`quadpoint-prior-art.md` §2.4 recorded the *inclusion* `u* ∈ (2, β₂)` as an
observation and made no claim; the miss is computed here for the first time.
**Calibration: HEURISTIC on both ends.** `u*` comes from the product-form
depth law, validated at exactly one point (`u = 2`), and `β₂` bounds
axiom-class sieves, not this particular comparison. The two numbers are not
statements about the same object and the note does not treat them as one; what
the arithmetic shows is that the operating point the heuristic picks out sits
**outside** the region any proven lower-bound sieve reaches, so no
strengthening of the sieve axioms puts it inside.

### 2.6 Chen's switching principle is not the parity-relevant ingredient — correcting the premise this run was sent with

The brief that commissioned this run reasoned that because
`quadpoint-prior-art.md` identifies the capture identity as "standard Buchstab
bookkeeping plus Chen's switching principle", Chen's parity-relevant machinery
is already inside our identity. **That inference is wrong, and the literature
says so directly.** Switching re-organises which variable gets sieved so that
an *upper*-bound sieve can remove the `P₃` contribution; it does not supply
Type-II information and it does not break parity.

- **Matomäki and Zuniga-Alterman, arXiv:2405.19063 pp. 1–2** (agent's read):
  "Later Fouvry and Grupp managed to show that `p + 2 = P₂` infinitely often
  **without using switching**, but a better level of distribution coming from
  deep estimates for sums of Kloosterman sums." Chen's conclusion is reachable
  without switching, so switching cannot be the ingredient that gets it.
- **Iwaniec, ICM 2006 plenary, Vol. I p. 294** (agent's read): "we can also
  obtain numbers having either one or two prime divisors, but we are not able
  to determine which of these numbers are there … in order to distinguish
  primes from numbers having two prime divisors it is necessary to extend the
  system of sieve conditions by adding a new condition." Chen's `P₂` is named
  as the ceiling of the classical system, not as a breach of it.
- **Pintz, arXiv:1004.1065 p. 1** (agent's read): "it is not known whether
  there are infinitely many primes `p` such that `p + 2` has an odd number of
  prime factors." Chen's theorem leaves the parity of `p+2` open, which is the
  operational test.
- **Ford–Maynard, arXiv:2407.14368 p. 2** (agent's read), on the machine that
  *does* consume Type-II: Selberg's example satisfies Type I for arbitrary
  `γ < 1` with `Σ_p a_p = 0`, "so **non-trivial Type II information is
  necessary to detect primes**. Harman's sieve is a technique developed to get
  non-trivial lower bounds … with weaker assumptions on the Type I and Type II
  ranges" — weaker, not absent.

**Consequence for the corpus.** `quadpoint-prior-art.md` §3's identification
stands as prior art and is unaffected; what must not be attached to it is the
reading that our frame therefore already carries parity-breaking machinery. It
carries the bookkeeping and none of the input. `research/THE-DIALS.md` dial 5
("almost-primes: proven, off the target") had this right and this note does not
move it.

---

## 3. Question 3 — is anything in the frame bilinear? The mechanism, split by side

### 3.1 The tile side: Type-I by construction

The tile `T_x` is periodic mod `W = x#`. A periodic set's entire arithmetic is
its congruence data: `|A_d|` for `d | W`, equivalently its finite Fourier
transform. That is the sieve's own input vector, and it is `DP1` — the
corpus's master discard, "from the first line the sieve sees only the vector"
(`sift-limit-attack.md` §1, DP1), carrying 71% of the loss budget at `x ≤ 43`
(same file §7c).

Type-II information is not a function of congruence data. The reason the
classical setting has it at all is that `Λ = μ * log` admits Vaughan /
Heath-Brown decompositions into Type-I and Type-II pieces **with signed
coefficients**; the signs are the whole content. In this frame there is no
`Λ` and no `μ` on the element variable. The frame's only prime-detecting
device is **full-depth sifting** — "a survivor of the full Scour is a prime"
(crystallization, `GLOSSARY.md`) — and `1_{survivor}` admits no such
decomposition. That is what the parity problem says, stated in the frame's own
vocabulary.

The one candidate that looks like an exception is Door 2 (the Fourier budget),
because the circle method is where Vinogradov's parity-defeating minor-arc
cancellation lives. It is not an exception: Door 2 expands the **tile
indicator**, which is periodic and exactly computable, so there are no minor
arcs and no prime-detecting weight to put on them. Its measured budget is the
price of that: pointwise `2ⁿ`, `L₁` mass per support class `(4/π)ⁿ`, effective
base 1.165 / 1.185 / 1.195 / 1.204 at `x = 7, 11, 13, 17`, and the aggregation
dies at `x = 11` (`wall-note.md` §1 Door 2).

The frame's genuinely signed objects are the Rosser–Iwaniec weights `λ_d`, and
they are bilinear over **moduli** (§2.1). `smoothness-front.md` §4 measured
what they carry: Möbius-signed weights are Fourier-flat, every mode's share of
the factor's mass `≤ 2.8e−3` against the `≳ 0.4` a usable smooth component [Rider 2026-08-29: the "≳ 0.4" share has no derivation at any record; the record's criterion is a ratio, C̃/K ≫ 100, and REFUTED.md's row now states it that way; refuted-audit-0829-4.md row 60.]
needs (REFUTED row 78). So the one signed object in the frame is signed in the
wrong variable and flat in the one place it was tested.

**Verdict, tile side: structurally Type-I.** Falsification test, stated so the
claim is not unfalsifiable: exhibit a corpus object that is a **signed** sum
over a product of two **element** ranges, each of size `≥ h^δ`. The note
searched the corpus for one (grep over `*.md` for Type I/Type II, bilinear,
parity, and a read of the Lemma V family, `Θ_e(a)`, the Scour, the staircase
injection and the capture identity) and found none.

### 3.2 The zone side: a product structure exists, and it is unsigned

The zone side is not periodic and the verdict does not transfer. Three places
in the corpus carry the same map `v = r·m`, `r` prime, `m` rough beyond `r`:

- **the Scour** — "`⋃_q q × (the tile's own holes)`" (`GLOSSARY.md`);
- **the staircase injection** — "for a prime-regime scour prime `q`, every
  non-self fresh victim satisfies `v = qm` with `m` prime"
  (`bv-import-survey.md` §3.1, S1);
- **the capture identity's candidate map** — "a candidate of `r` is `v = r·m`
  in the window with `lpf(m) ≥ r`; … `lpf(m) ≥ r` holds iff `r = lpf(v)`"
  (`quadpoint-identity-01.md` §1, proof step (i), UNVERIFIED PREMISE).

In the stretch this map ranges over `r ∈ [7, Q] = [7, v^{1/2}]` and
`m ∈ [v^{1/2}, v/7]`, so its sub-range `r ∈ (v^{1/3}, v^{1/2})` is exactly the
window where neither factor is small. That window is not chosen for
convenience: FI's **(B1)** is `Δ^{−1}√D < N < δ^{−1}√x`, and their **(R1)**
forces `D > x^{2/3}`, hence `√D > x^{1/3}` — so **(B1) always sits inside
`(x^{1/3}, x^{1/2})` and narrows as `D` grows.** The mass in it is measured in
§4.2 and is a positive, slowly falling fraction of the stretch's composites.

**So the frame is not Type-I only in the naive sense: it does own a product
decomposition with both factors ranging.** What it does not own is a reason
for that sum to cancel. Every appearance of `v = r·m` above is inside a
non-negative count with coefficient 1. A product decomposition of a counting
problem is a *classification*, not Type-II information; Type-II information is
cancellation in a signed sum, and there is nothing here to sign.

### 3.3 The one place the shift kills it, stated separately

Even granting signs, the decomposition is on the **wrong member**. `v = r·m`
factorises one side of the pair; the certificate's content is the joint
condition on `(v, v+2)`, and `v + 2 = rm + 2` has no product structure at all.
Any Type-II estimate for the pair has to control `rm + 2` in progressions,
uniformly, over a short interval — which is the twin problem's own
distribution question, not an input to it.

This is precisely the move Chen's switching principle makes and precisely how
far it goes: switch to the partner's side, where the bad events are
semiprime-slot counts an upper sieve can afford, and buy `P₂` rather than
prime. `quadpoint-prior-art.md` §3 (HELD, UNVERIFIED PREMISE) already
identifies our capture identity as "Buchstab's identity for the dimension-2
twin sieve plus the switching condition", with no verbatim carrier and no
novelty. **Read against this section, that identification says something
sharper than it was written to say: the frame's switching move is already
made, and it lands where switching always lands.**

---

## 4. The measurements this note ran

All SCRATCHPAD-grade: session scripts in the agent scratchpad, **not embedded
producers, not `qc`-gated**. None of these numbers may be quoted outside this
file until re-derived inside an embedded producer, per the precedent of
`quadpoint-prior-art.md` §2.2.

### 4.1 Stretch-width exponent `θ = ln(Q′² − Q²)/ln(Q²)`

| decade of `Q` | anchors | mean `θ` | min `θ` | max `θ` |
|---|---|---|---|---|
| 10–10² | 21 | 0.7878 | 0.6642 | 0.9333 |
| 10²–10³ | 143 | 0.6959 | 0.6023 | 0.8588 |
| 10³–10⁴ | 1061 | 0.6539 | 0.5753 | 0.7943 |
| 10⁴–10⁵ | 8363 | 0.6302 | 0.5602 | 0.7400 |
| 10⁵–10⁶ | 68906 | 0.6133 | 0.5502 | 0.7153 |
| 10⁶–10⁷ | 586081 | 0.6007 | 0.5430 | 0.6974 |

The mean falls monotonically toward `1/2`; the **minimum** is the binding
column, because the postulate has to hold at every anchor and the narrowest
stretch is the hardest one. `w ≈ √h · ln h` is the asymptotic shape.

### 4.2 Type-II mass in a stretch

Share of the stretch's **composite** channel members with `lpf(v) > v^{1/3}`,
i.e. sitting in the range where `v = r·m` has both factors `≥ v^{1/3}`:

| `Q` | `Q′` | width | channel positions | primes | `lpf ≤ v^{1/3}` | `lpf > v^{1/3}` | Type-II share of composites |
|---|---|---|---|---|---|---|---|
| 101 | 103 | 408 | 109 | 42 | 38 | 29 | 0.4328 |
| 1009 | 1013 | 8088 | 2157 | 596 | 1184 | 377 | 0.2415 |
| 10007 | 10009 | 40032 | 10675 | 2166 | 7017 | 1492 | 0.1753 |
| 99991 | 100003 | 2399928 | 639981 | 104133 | 464091 | 71757 | 0.1339 |

Control on the same run: the total share with `lpf > v^{1/3}` (primes
included) reads 0.2748 at `Q = 99991` against the Buchstab prediction
`3ω(3)·(30/8)/ln v = 0.2757`, a 0.3% agreement, so the counter is doing what
it says.

### 4.3 How many stretches are wide enough for the FI machine to be posed

The condition is `θ > 2/3`, i.e. `A(x) > x^{2/3}`, i.e. a prime gap
`g_Q > Q^{1/3}` (§2.3). The `θ > 0.7625` column is the unconditional ceiling
of §5.1 and is carried as a consistency check on the sieve: it must go to zero
and it does.

| decade of `Q` | anchors | fraction `θ > 2/3` | fraction `θ > 0.7625` | mean `θ` | max `θ` |
|---|---|---|---|---|---|
| 10–10² | 21 | 0.9524 | 0.6190 | 0.7878 | 0.9333 |
| 10²–10³ | 143 | 0.7133 | 0.0769 | 0.6959 | 0.8588 |
| 10³–10⁴ | 1061 | 0.4053 | 0.0019 | 0.6539 | 0.7943 |
| 10⁴–10⁵ | 8363 | 0.1678 | 0.0000 | 0.6302 | 0.7400 |
| 10⁵–10⁶ | 68906 | 0.0339 | 0.0000 | 0.6133 | 0.7153 |
| 10⁶–10⁷ | 586081 | 0.0023 | 0.0000 | 0.6007 | 0.6974 |

The `θ > 0.7625` column is empty from `Q = 10⁴` up, as the BHP ceiling
requires, which is the only calibration available for that argument.

---

## 5. Question 2 — Chen in short intervals, against a zone's width

*(Literature block; see §6 for what was reached at source and what was not.)*

### 5.1 What a zone requires

`θ → 1/2` (§4.1). In words: **the Zone Postulate asks for a twin pair in an
interval of length `≈ √x · ln x` around `x`.** That length is, to within the
constant, the interval in which RH guarantees a *single* prime. The zone
question is therefore the twin analogue of Cramér-under-RH, one dimension up,
unconditionally.

**And the width is capped from above, unconditionally, which is what makes the
comparison decisive rather than merely unfavourable.** A stretch is as wide as
its prime gap: `w = (Q′ + Q)·g_Q` with `g_Q = Q′ − Q`. Any unconditional
prime-gap bound `g_Q ≪ Q^{c}` therefore caps the interval exponent at

> `θ = ln w / ln h ≤ (1 + c)/2 + o(1)`.

At the standing unconditional `c = 0.525` this is `θ ≤ 0.7625 + o(1)`; under
RH's `g ≪ √Q ln Q` it is `θ ≤ 0.75 + o(1)`; on average it is `1/2`. The
measured maximum over `Q ∈ [10⁵, 10⁶)` is 0.7153 (§4.1), inside the ceiling.
**So if the best short-interval exponent in print exceeds 0.7625, no
short-interval theorem of that family can cover a stretch at any anchor
whatsoever — not typically, not eventually, not ever — and the failure is
structural rather than a matter of margin.**

### 5.2 What the literature reaches

The owning convention is **"Chen's theorem in short intervals"**, and the
object it is indexed by is `D_{1,r}(N, c, θ) = #{p : p ⩽ N, N − p = P_r,
p ∈ [cN, cN + N^θ]}` — a Goldbach-form count, with `c` locating the interval
inside `[0, N]` and `θ` its length exponent. `c = 1/2` is a genuine short
interval; `c = 0` is a *small-primes* restriction, not a short interval, and
the two chains must not be tabled together. Our house words — zone, stretch,
quadratic point — reach none of this (`research/SEARCH-CONVENTIONS.md` has no
row for the object; §7.3 proposes one).

**The twin form is in print, and it is stated as a corollary of the Goldbach
form.** Cai and Lu, *Chen's theorem in short intervals*, **Acta Arith. 91**
(1999) **311–323**, read at page image (§6), Theorem with `U = N^{0.972}` and
then, verbatim:

> "**Corollary.** For sufficiently large `x` and `y = x^{0.972}`, we have
> `Σ_{x ⩽ p < x+y, p+2 = P₂} 1 ≫ Cy/log²x`, where
> `C = 2 ∏_{p>2}(1 − 1/(p−1)²)`."

That is the exact statement this question asked for: **a Chen-type theorem in
`[x, x + x^{0.972}]`, for all sufficiently large `x`, with the
Hardy–Littlewood order.** Wu then sharpened it with an explicit constant, also
read at source this session — Acta Arith. **114** (2004) **215–273**, p. 5,
where `π_{1,2}(x, θ) := |{x ⩽ p ⩽ x + x^θ : Ω(p+2) ⩽ 2}|` is defined and
Theorem 5 reads "For every `θ ⩾ 0.971`, `N ⩾ N₀(θ)` and `x ⩾ x₀(θ)`, we have
`D_{1,2}(N, θ) ⩾ 0.012 Ξ(N, θ)`, `π_{1,2}(x, θ) ⩾ 0.006 Π(x, θ)`." **`0.971`
is the best twin short-interval exponent this note can assert at source.**

**The chain.** Taken from Li, *On Chen's theorem, Goldbach's conjecture and
almost prime twins III* §1 (read at page image, §6) — the only place the corpus
has found the chronology assembled — and cross-checked row by row on zbMATH
reviews.

| object | chain of `θ` | attributions, with the twin-form ones in bold |
|---|---|---|
| `p + 2 = P₂` in `[x, x + x^θ]` — **the twin form, and the one this question is about** | 0.98 → 0.973 → 0.9729 → 0.972 → **0.971** | Ross (Ph.D., London 1976), `θ ⩾ 0.98`; **Wu, *J. London Math. Soc.* (2) 49 (1994) 61–72** (`θ ⩾ 0.973`, review-level); **Salerno–Vitolo, *p + 2 = P₂ in short intervals*, Note Mat. 13 (1993) 309–328** (`θ > 0.9729`, review-level); **Cai–Lu, Acta Arith. 91 (1999) 311–323, Corollary** (`θ = 0.972`, page-level); **Wu, Acta Arith. 114 (2004) 215–273, Theorem 5** — `π_{1,2}(x, θ) := \|{x ⩽ p ⩽ x + x^θ : Ω(p+2) ⩽ 2}\| ⩾ 0.006 Π(x, θ)` for every `θ ⩾ 0.971`, `x ⩾ x₀(θ)`, **read at source this session, definition on p. 5 and Theorem 5 on p. 5** |
| `D_{1,2}(N, 1/2, θ)` — the Goldbach short-interval form | 0.98 → 0.974 → 0.973 → 0.9729 → 0.972 → 0.971 → **0.97** | Ross (Ph.D., London 1976); Wu; Salerno–Vitolo; Cai–Lu; **Wu, Acta Arith. 114 (2004) 215–273, Thm 5** (0.971, page-level); **Cai, *On Chen's theorem. II*, J. Number Theory 128 (2008) 1336–1357** (`\|p − N/2\| ⩽ N^{0.97}`, review-level, Heath-Brown's zbMATH review) |
| `D_{1,2}(N, 0, θ)` — **small primes, NOT a short interval**; carried only so it is not mistabled | 0.959 → … → 0.9409 | Ross; Cai; Cai–Li; Cai; Li |
| `D_{1,3}(N, 1/2, θ)` — the `P₃` relaxation | 0.919 → **0.87125** | Li, arXiv:2403.09691 (**math.GM — arXiv declined it from math.NT**); Li, paper III Thm 1.1 |
| single primes in `[x, x+x^θ]`, right order | `13/23 → … → 21/40 = **0.525** → 13/25 = 0.52` | Iwaniec–Jutila (1979) … **Baker–Harman–Pintz, Proc. LMS 83 (2001) 532–562** = 0.525, the refereed record; 0.52 is Li, arXiv:2308.04458v8, **unrefereed** |
| single primes, asymptotic formula | `7/12 → 17/30 ≈ 0.5667` | Huxley (1972); **Guth–Maynard**, arXiv:2405.20552, Ann. of Math. to appear |
| one `P₂` (not a pair) in a short interval, for contrast | 0.45 → … → **101/232 = 0.435345** | Iwaniec–Laborde (1981) … Wu, Sci. China Math. 53 (2010) 2511–2524; no improvement since 2010 |

**Four things this table settles that the corpus did not have.**

1. **The twin form exists in print and its best exponent confirmed at source
   is `0.971`** (Wu 2004, Theorem 5, with the explicit constant 0.006).
   `0.97` is the Goldbach chain's best and **whether Cai's 2008 paper carries
   a twin corollary was NOT REACHED** (§6). The twin chain has moved `0.98 →
   0.971` in the twenty-eight years 1976–2004, and has not moved since:
   **0.009 of exponent in half a century.**
2. **`c = 0` is a small-primes restriction, not a short interval.** Its chain
   (0.959 … 0.9409) must never be tabled beside the `c = 1/2` one, and the
   `0.817` figure that goes with it is not a short-interval exponent.
3. **`0.87125` is Goldbach-only, and it is fragile.** No `p + 2 = P₃`
   short-interval result exists in any form, and nothing at all exists for
   `r ⩾ 4`. The `0.87125` itself has margin 0.003 on a sum of five numerically
   evaluated Buchstab integrals, is unrefereed, and rests on Lou–Yao, *J.
   Shandong Univ. (Nat. Sci.)* 2 (1979) 1–19 (in Chinese) — a paper **Li
   himself states contains errors** and which neither channel could obtain
   (§6). Quote it as a claim, never as a theorem.
4. **The pair problem and the single-almost-prime problem are not the same
   problem.** One `P₂` in a short interval reaches `0.4353`, below `1/2`; a
   `P₂` *pair* reaches only `0.971`. §5.3 gives the mechanism, and it is the
   run's cleanest statement of the wall.

**Negative sweeps, recorded so they are not redone.** No almost-prime-*pair*
result in a short interval exists beyond the `p + 2 = P₂` chain above:
zbMATH `ti:"short intervals" & cc:11P32` (30 hits) and the same with
`cc:11N36` (40 hits) return zero on pairs; `ti:"almost prime" & ti:twins`
returns three, none short-interval. The global pair object is J. Kan, *On the
problem of Goldbach's type*, Math. Ann. **292** (1992) 31–42 (`D_{s,r}(N)` for
any `s ⩾ 1, r ⩾ 2`) and Heath-Brown, *Almost-prime k-tuples*, Mathematika
**44** (1997) 245–266 at `k = 2` — **neither has a short-interval version.**
Searched in the owning convention "Chen's theorem in short intervals" per
§7.3's proposed `research/SEARCH-CONVENTIONS.md` row. One false lead, recorded
so nobody re-chases it: W. Luo, *Lower bound for number of B-twins in short
intervals* (Hua Loo Keng memorial, Springer 1991, 193–208) — `B` is **sums of
two squares**, not almost primes.

### 5.3 The comparison

**The decisive line, and it is not about margins: the arithmetic input
vanishes at exactly our exponent.** The engine under every entry in the
`p + 2 = P₂` chain is a Bombieri–Vinogradov theorem *in short intervals*. Its
level, read at page image from Li's paper III Lemma 3.2 (attributed there to
Lou–Yao 1979, Lemma 3):

> `D ⩽ min( x^{θ − 1/2}(log x)^{−B},  x^{(12θ − 7)/5} )`, for `7/12 < θ ⩽ 1`.

Two readings, and both matter.

1. **The level is `x^{θ − 1/2}`, so it is `1` at `θ = 1/2` and the lemma is
   not asserted at all below `θ = 7/12 = 0.58333`.** A zone has
   `θ → 1/2`. **The Zone Postulate asks for twins in an interval of exactly
   the length at which the sieve's own arithmetic input degenerates to no
   moduli.** That is not a gap to be closed by a better exponent; it is the
   endpoint of the coordinate.
2. **Neither bound depends on `r`.** Relaxing `P₂ → P₃` buys slack in the
   *weighted sieve* (Li III: `k₁` drops 7.726 → 5.4644), not in the
   arithmetic. That is why one almost-prime in a short interval reaches
   `0.4353` — a single sequence, Fouvry–Iwaniec sums suffice — while a
   *correlated pair* sits above `0.87`, and why the `P₂ → P₃` step is worth
   only about 0.10 before stopping. Going to `P₄` and beyond buys nothing and
   is not attempted anywhere in print.

**The unconditional exclusion, as a second and independent argument.** The
ceiling on a zone's interval exponent (§5.1) is `θ ⩽ (1 + 0.525)/2 =
0.7625 + o(1)`. The cheapest short-interval almost-prime-pair exponent in
print is `0.87125`, and the actual `P₂` figure is `0.971`. **So no member of
the Chen-in-short-intervals family can cover a stretch at any anchor for large
`Q` — not typically, not for infinitely many anchors, not ever.** The
exclusion survives even if the published exponent were improved all the way to
the ceiling, because reading 1 above says the family cannot reach `θ = 1/2` at
any `r`.

The finite-scale sizes, for calibration rather than for the argument
(SCRATCHPAD, same session):

| `Q` | `x = Q²` | zone width `w` | `x^{0.972}` | `w / x^{0.972}` | `x^{0.87125}` | `w / x^{0.87125}` |
|---|---|---|---|---|---|---|
| 101 | 1.020e4 | 408 | 7.878e3 | 5.18e−2 | 3.108e3 | 1.31e−1 |
| 1009 | 1.018e6 | 8088 | 6.911e5 | 1.17e−2 | 1.715e5 | 4.72e−2 |
| 10007 | 1.001e8 | 40032 | 5.978e7 | 6.70e−4 | 9.344e6 | 4.28e−3 |
| 99991 | 9.998e9 | 2399928 | 5.247e9 | 4.57e−4 | 5.157e8 | 4.65e−3 |
| 1000003 | 1.000e12 | 6.000e7 | 4.613e11 | 1.30e−4 | 2.851e10 | 2.10e−3 |

*(The table is computed at `0.972`, Cai–Lu's page-level twin figure, rather
than at Wu's `0.971`; the difference is 0.001 of exponent and moves no cell
visibly.)* The ratio falls like `x^{θ_lit − 1/2}`, so it diverges; the table's
job is only to show it is already four orders of magnitude at `x = 10¹²`.

**One comparison in the other direction, stated so the note is not read as
uniformly pessimistic.** A zone is *wider* than a BHP interval at every height
the corpus computes: `x^{0.525}` is 1.99e6 at `x = 10¹²` against a zone width
of 6.00e7, a factor 30. The two cross at `0.025 ln x = ln ln x`, i.e. around
`x ≈ e^{215} ≈ 10^{93}` (SCRATCHPAD arithmetic). **Asymptotically, therefore, a
zone is narrower than the shortest interval in which unconditional methods can
place a single prime** — which is a fair summary of what the Zone Postulate is
asking for, and it is asking for two.

**Chen's theorem restricted to a zone, per the question as asked: no
per-zone content.** Cai–Lu's corollary holds for all large `x` at
`y = x^{0.972}`, so it says something about every interval of that length —
including intervals that *contain* many zones. It says nothing about any one
zone, because a zone is `x^{0.5+o(1)}` and the corollary's own admissible
length is bounded below by `x^{0.97}`. The corpus's existing tile-native Chen
proposal (`bv-import-survey.md` §4, never executed) is a `[1, x]` statement
and inherits the same limitation: `β_Chen(x) ≥ c` is a whole-tile bias, not a
per-zone occupancy statement.

---

## 6. Sources, and what was not reached

### 6.1 Read at page image this session, with hashes

Fetched to the session scratchpad, extracted with `pdftotext -layout`, and read
in extraction. Every quotation above marked "page-level" or "at source" comes
from these files, not from a search snippet or a review.

| artifact | source | sha256 |
|---|---|---|
| Friedlander–Iwaniec, *Asymptotic sieve for primes*, Ann. of Math. (2) **148** (1998) 1041–1065 | `arxiv.org/pdf/math/9811186v1` | `d39f5249d9003a8a7ce121c93e785dcffa2dfb5ccc9e728820a705826d953d1f` |
| Cai–Lu, *Chen's theorem in short intervals*, Acta Arith. **91** (1999) 311–323 | `matwbn.icm.edu.pl/ksiazki/aa/aa91/aa9142.pdf` | `59205bc24e6275bc3f90f702d4c0436b858749942c2a00579be57f4955b44af6` |
| Wu, *Chen's double sieve, Goldbach's conjecture and the twin prime problem*, Acta Arith. **114** (2004) 215–273 | `arxiv.org/pdf/0705.1652` | `41d432dd63da6d1fe7836ba3beda8b601ce6e64420e50501d26d79f7d971043e` |
| Runbo Li, *On Chen's theorem, Goldbach's conjecture and almost prime twins III* | `runbolicarey.com/assets/downloads/…III.pdf` | `6ee0d3d6d40eb8683d73c73b252c76b8b6fe10554115f98a297814d4312e2e33` |
| Runbo Li, *… almost prime twins II* (v4) | `arxiv.org/pdf/2405.05727v4` | `e62adef510c1e0a695769e03be1f7fe787cc2b30ea1f8761e87a9039efdf3f2c` |

**Channel calibration, run in the same session** per
`research/SEARCH-CONVENTIONS.md`: WebSearch on `"Baker Harman Pintz difference
between consecutive primes II 2001"` returned the paper on the first query;
WebSearch on `Cai Yingchun "Chen's theorem in short intervals" Acta
Arithmetica` returned EUDML 207358 and the Springer record on the first query.
Reached through the two literature agents with their own in-session
calibrations: annals.math.princeton.edu, msp.org, mathunion.org, zbMATH open
API (`_search`, **not** `_structured_search`, which 400s), MathSciNet
`mrlookup`, terrytao.wordpress.com (via `curl` with a browser UA — WebFetch
403s there).

### 6.2 NOT REACHED

Recorded so the next wave spends its budget on what is left.

- **Cai, *On Chen's theorem. II*, J. Number Theory 128 (2008) 1336–1357** —
  review-level only (Heath-Brown's zbMATH review, `|p − N/2| ⩽ N^{0.97}`);
  ScienceDirect 403s. **Whether it carries a twin corollary is unknown**, so
  the best twin exponent this note asserts is Wu's `0.971`, not `0.97`.
- **Wu, JLMS (2) 49 (1994) 61–72** and **Salerno–Vitolo, Note Mat. 13 (1993)
  309–328** — review-level only (Zbl 0790.11065, Zbl 0831.11055). Both are
  twin-form, both above `0.972`, so neither changes any conclusion.
- **Lou–Yao, *J. Shandong Univ. (Nat. Sci.)* 2 (1979) 1–19 (in Chinese)** —
  not obtainable on any channel. It is the sole arithmetic input to Li's
  `0.87125`, and **Li himself states it contains errors** invalidating its own
  claimed `θ = 0.92`. Li's Lemma 3.2, which is what §5.3 quotes, is attributed
  to it.
- **Opera de Cribro Ch. 16 (parity) and Ch. 25 (almost-prime sieve, §25.6
  twin almost-primes, switching trick indexed at p. 484)** — chapter titles,
  page numbers and Preface reached; body text not. What Friedlander and
  Iwaniec say about switching *in the book* is unverified. Their Preface does
  say of Ch. 18 (the 1998 paper's book form): "the bilinear form part is the
  new axiom by means of which one breaks the parity barrier."
- **Harman, *Prime-Detecting Sieves*, PUP 2007, body text** — TOC verified
  from the Library of Congress MARC record; the attribution of the Type-II
  input to Chs. 2, 3 and 5 is inferred from Ford–Maynard and Kumchev citing
  it, not read off the book.
- **Bombieri, *The asymptotic sieve*, Mem. Acad. Naz. dei XL 1/2 (1976)
  243–269** — not reached; carried through FI 1998, Iwaniec's ICM and Tao 2016.
- **BFI *Acta Math.* 156 Theorems 1–7 (the bilinear engine, pp. 214–244)** —
  located, not transcribed; only Theorem 10 (p. 209) is quoted.
- **Maynard, Mem. AMS 306 (1542)/(1543)** — the 3/5 and 7/12 figures are
  abstract-level plus Pascadi's and Lichtman's citations, except Theorem 1.2,
  transcribed from arXiv:2006.07088 p. 2 by an agent.
- **Tao's 2007 parity post says nothing about the switching principle in its
  body** — only Chen's *theorem*, on the parity-permitted side. The mechanism
  appears in the comment thread (Kowalski), not in Tao's text.
- **Every scratchpad number in §4 and §5.3's finite-scale table.** No embedded
  producer, no `qc` gate. They must be re-derived inside one before being
  quoted anywhere outside this file.

### 6.3 The conditional negative

**No result places any twin-type problem in an interval of length
`x^{1/2+ε}` under RH, GRH, or Elliott–Halberstam.** Eleven distinct queries
across four calibrated channels (agent-run, list held in its report), searched
in the owning convention "Chen's theorem in short intervals" and in "the
difference between consecutive primes". The nearest object is
**Alweiss–Luo, *Bounded gaps between primes in short intervals*, Res. Number
Theory 4 (2018), Paper 15**, which gets *bounded* gaps inside `[x, x+x^δ]` for
`δ ∈ [0.525, 1]` — it inherits the BHP floor verbatim because it consumes BHP
as an input, and its gap `d` is unspecified rather than 2. That is dial 6
again (`THE-DIALS.md`), the axis this programme does not own.

---

## 7. PROPOSED, not applied

### 7.1 `research/IMPORT-MAP.md` §2, one new row (row 15)

Per the map's standing rule ("a future import gets a graded row here, with its
circularity pre-check, BEFORE it runs — never a run out of inspiration"), this
row is written retroactively and marked as such; it is the grade this run
*should* have carried at its start.

| # | field | the importable theorem | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 15 | bilinear (Type-II) prime detection | Friedlander–Iwaniec, *Asymptotic sieve for primes*, Ann. of Math. (2) **148** (1998) 1041–1065, axioms (R)/(R1)/(B)/(B1–B3) **[SOURCED, verbatim]**; Bombieri's asymptotic sieve **[MEMORY, carried through FI]**; Chen 1973's switching principle; Harman, *Prime-Detecting Sieves*, PUP 2007 **[SOURCED-BIB]** | the capture identity's candidate map `v = r·m` on the stretch (`quadpoint-identity-01.md` §1 proof step (i)) | Z2's certificate `X(y) < T` | **VOCABULARY-ONLY on the tile side** (periodic ⟹ congruence data only, §3.1); **STRONG-ANALOGY on the zone side** (the product structure is real and spans FI's own (B1) window, §3.2) | **TPC-STRENGTH** — `(B_Q)` is Maynard's ICM Question 17 restricted to a short interval and made position-uniform, and Polymath8b §8 states in print that controlling such forms "would soon lead to a proof of the twin prime conjecture" | WALL-ADDRESS | 4 h | **LANDED 2026-08-26, route closed, and closed twice over** — (i) FI's machine cannot be POSED for a zone-supported sequence: (R1) forces `D > x^{2/3}` while FI's own remark forbids `D(x) > A(x)` and a stretch has `A(x) ⩽ x^{1/2+o(1)}` (deficit `x^{1/6}`; only 0.0023 of anchors at `Q ∈ [10⁶,10⁷)` are even wide enough); (ii) the estimate is a position-uniform short-interval bilinear form, the object `attack-sqrt-cancellation.md` §6 already records ABSENT. Banked: the tile-side Type-I mechanism (N1), the (R)-axis/(B)-axis distinction that reprices eight REFUTED rows' machinery, `β₂ − u* = 0.70060`, the short-interval-BV level `x^{θ−1/2}` vanishing at a zone's own exponent, and the correction that Chen's switching is not parity-relevant |

### 7.2 `research/REFUTED.md`, one line

| route | verdict | why, in one clause | closed | record |
|---|---|---|---|---|
| transplanting Type-II (bilinear) parity-breaking information into the frame | CLOSED | Friedlander–Iwaniec's machine cannot be posed on a stretch — (R1) needs `D > x^{2/3}` where their own remark caps `D` at `A(x) ⩽ x^{1/2+o(1)}` — and the input it would need is Maynard's ICM Question 17 made position-uniform on a short interval, already recorded ABSENT; the tile side carries no element-side signed sum at all | 2026-08-26 | `history/staging/attack-bilinear-transplant.md` |
| Chen-in-short-intervals as a source of per-zone occupancy | CLOSED | the short-interval BV level is `x^{θ−1/2}`, asserted only for `θ > 7/12` and independent of `r`, so the family degenerates at exactly a zone's `θ → 1/2`; the twin exponent in print is 0.971 and has moved 0.009 since 1976, against an unconditional ceiling of 0.7625 on any stretch | 2026-08-26 | `history/staging/attack-bilinear-transplant.md` §5 |

### 7.3 `research/SEARCH-CONVENTIONS.md` §1, one candidate row

Offered with the file's own warning attached — a row added to make a claim
pass is a suppression wearing a table's clothes. This one is proposed because
it is the wording the literature uses, and because the corpus searched the
short-interval axis in no convention at all before today.

| object | our name | canonical | **OWNING convention — search THIS** | where it lives |
|---|---|---|---|---|
| a twin-type or almost-prime-pair statement confined to `[x, x + x^θ]` | the Zone Postulate's width, the stretch | — | **"Chen's theorem in short intervals"**, and the count it is indexed by, `D_{1,r}(N, c, θ) = #{p ⩽ N : N − p = P_r, p ∈ [cN, cN + N^θ]}` — note `c = 0` is *small primes*, not a short interval, and its chain must never be tabled beside the `c = 1/2` one. The twin form is a corollary of the Goldbach form. For the single-prime baseline: **"the difference between consecutive primes"**. The house words zone, stretch, quadratic point reach nothing | Cai–Lu, *Chen's theorem in short intervals*, Acta Arith. **91** (1999) 311–323 (Corollary, `θ = 0.972`); Salerno–Vitolo, *p + 2 = P₂ in short intervals*, Note Mat. **13** (1993) 309–328; Cai, Chinese Ann. Math. Ser. B **29** (2008) 687–698 (`θ = 0.97`); Runbo Li, *On Chen's theorem, Goldbach's conjecture and almost prime twins III*, §1 carries the whole chronology; Baker–Harman–Pintz, Proc. LMS **83** (2001) 532–562 |

---

## 8. The fifth naming of the wall, with its coordinates

`quadpoint-identity-01.md` §4 counts the corpus's framings of the same
obstruction: zones, the origin, the square anchor, the rough-pair census —
"fourth frame of the same wall". This note adds a fifth, and unlike the first
four it is stated in the convention the *breach* literature uses rather than in
one of ours.

> **The wall, in Type-II coordinates.** Parity is defeated only by
> cancellation in `Σ_{m∼M, n∼N} α_m β_n a_{mn}` with both ranges large. The
> tile side of this frame cannot form such a sum at all, because a periodic
> set's arithmetic is its congruence data and the frame has no signed
> prime-detecting weight on the element variable (§3.1). The zone side can
> form one — `v = r·m` spans FI's own `(B1)` window and carries 13–43% of the
> stretch's composite mass (§4.2) — but carries no signs, so it classifies
> and does not cancel (§3.2). And before parity is even reached, a stretch is
> too thin to carry the level FI's Type-I axiom demands (§2.3), while the
> short-interval sieve's arithmetic input degenerates at exactly a stretch's
> own interval exponent (§5.3). **The zone is the one place in the frame where
> Type-II information could live, and it is the place where the two machines
> that consume it both run out of input.**

Its coordinates, all five new to the corpus:

| coordinate | value | calibration |
|---|---|---|
| mass: what FI's own Type-I axiom needs against what a stretch carries | needs `A(x) > D > x^{2/3}`; a stretch has `A(x) ⩽ x^{1/2+o(1)}` — **deficit `x^{1/6}`**; only **0.0023** of anchors at `Q ∈ [10⁶,10⁷)` even reach `θ > 2/3` | PROVEN from FI's (R1) + their own thin-sequence remark, both quoted; the fraction is SCRATCHPAD, §2.3 and §4.3 |
| arithmetic: the short-interval BV level at a stretch's own exponent | `D ⩽ x^{θ−1/2}(log x)^{−B}`, asserted only for `θ > 7/12`, **independent of `r`**; at `θ = 1/2` it is **1** | PROVEN in print, read at page image, §5.3 |
| depth: the certificate's usable range against the proven positivity range | `u ∈ [2, 3.565845)` vs `u > 4.26645`; **disjoint, miss 0.70060** | HEURISTIC (`u*` from the one-point-validated product form) + PROVEN (`β₂`); the two bound different objects, §2.5 |
| interval exponent: what a zone is, and its unconditional ceiling | `θ → 1/2`; mean 0.6302 and min 0.5602 over `Q ∈ [10⁴,10⁵)`; **no stretch exceeds `(1+0.525)/2 = 0.7625 + o(1)`** | SCRATCHPAD (§4.1) for the values; PROVEN given the prime-gap bound for the ceiling (§5.1) |
| interval exponent: what the literature reaches, and how fast it moves | `0.971` for `p + 2 = P₂` (Wu 2004 Thm 5, at source); `0.97` Goldbach chain best; `0.87125` after relaxing to `P₃`, Goldbach-only and fragile. Movement since 1976: **0.009** | PROVEN in print, §5.2 |

## 9. What would change this verdict

Stated so the closure is falsifiable rather than rhetorical, in the order a
future attempt should test them.

1. **A corpus object that is a signed sum over two ranging element ranges.**
   §3.1's falsification test, and the cheapest of the four. One exists nowhere
   in the corpus today; if one is exhibited, §3's mechanism fails and the row
   reopens.
2. **A version of the Friedlander–Iwaniec machine that does not require
   `D > x^{2/3}`.** §2.3's obstruction is the only one that is prior to
   parity, so it is the only one a purely technical improvement could touch.
   FI say their (B) "can be realistic only if `D` is somewhat larger than
   `x^{2/3+ε}`", which makes this a hypothesis of the method rather than of
   the sequence — and therefore, in principle, negotiable.
3. **A position-uniform short-interval bilinear estimate of any strength.**
   `attack-sqrt-cancellation.md` §6's ABSENT row becoming a PRICED row.
   Necessary, and by §2.4 nowhere near sufficient.
4. **A `p + 2 = P_r` short-interval result at any `r` with `θ < 0.7625`.**
   That would breach §5.1's ceiling argument. §5.3 says why it should not
   exist below `7/12`, and nothing at any `r ⩾ 3` exists in the twin form at
   all — so this is the one place where the literature is genuinely thin
   rather than genuinely blocked, and where a reader who knows the field
   should be asked before the row is treated as final.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md`
for the corpus rule. Nothing committed, nothing pushed, no existing file
edited.*
