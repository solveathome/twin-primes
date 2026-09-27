# The parity adversary, built explicitly on our own stretches: it does NOT survive at every level — the exact-data adversary dies at D* ≈ Q^1.18, and the certificate that kills it is destroyed by 0.30 of one count per modulus

<!-- ledger
id: Q-parity-adversary
status: ANSWERED
todo: Z2
question: Does a parity adversary built on our own stretches survive at every level, and what precision class does a certificate need?
verdict: It does NOT survive: the exact-data adversary dies at D* about Q^1.18 (MEASURED, exact arithmetic, 43 anchors Q <= 200), and the certificate that kills it is itself destroyed by 0.30 of one count per modulus, so Z2's precision class is now measured rather than described; it is PROVEN not to be a proof ingredient.
-->

*(2026-08-26. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/attack-parity-adversary-01.js`.
Calibration marked per claim: PROVEN, VERIFIED by exact computation, MEASURED,
HEURISTIC, OPEN, REFUTED. Every figure quoted below sits in that producer's
OUTPUT block; nothing is recomputed here and nothing is transcribed by hand.
This note answers TODO Z2's first move (b) and it answers it in the direction
Z2 did not name.)*

---

## 0. What is still open, first

The thing this attack set out to establish is **REFUTED as posed**. The plan
was: build a non-negative measure ν on the stretch that matches the true
count in every sieve-accessible statistic to level y and gives twins zero
mass, show it exists at every anchor, and conclude that Z2 route (b) is dead
by construction. On our own finite grids **that measure does not exist**. At
level D = Q² the level-D data determines the twin count exactly at 42 of 43
anchors Q ≤ 200, and the adversary is already dead at a much lower level:
the killing level D* has ln D*/ln Q = 1.181 on average over 43 anchors
(min 0.812, max 1.439), and D*/width = 0.321 on average, so **D\* sits inside
the interval length, not beyond it**. Congruence data to a level well below
the stretch's own width *does* contain the occupancy fact. The information is
there. So route (b) is not blocked by information, and the "no argument using
only congruence data can prove occupancy" reading is false on these grids.

What remains true, and is the note's actual deliverable, is quantitative and
worse: the certificate that appears at D* is worth nothing to any sieve. It is
destroyed by moving each divisor count by **0.3018 of a single integer** (mean
per-modulus tolerance θ_min over the 22 anchors Q ≥ 79), and the total L¹
distortion the adversary needs is **exactly T**, the twin count itself
(measured at 40 of 40 anchors, and PROVEN to be a lower bound by Legendre).
Against that, the worst-case remainder a level-Q² sieve must survive on the
same stretch runs **5.3× T at Q = 23 rising to 20.8× T at Q = 149** (max 30.4
over the 27 anchors measured), and the ratio grows with Q. The wall is in the
error term, exactly where the identity note put it, and the LP now prices it.

Four further caveats, all disconfirming, all carried:

- **The random-class control reproduces the shape.** Two uniformly chosen
  residues per prime instead of {0, −2} gives Δ/T = 1.000 at every control
  anchor and ln D*/ln Q = 1.139 against the true arithmetic's 1.192 on the
  34 matched anchors (ratio 1.047). Those two readings are about **sieves**,
  not about twins. The one place the arms separate is θ_min: true 0.3851 vs
  control 0.5307, ratio 0.726, with the true arithmetic lower at 25 of 33
  tied-free anchors (paired sign test, two-sided p = 0.0046). That test was
  **not pre-registered**, the arms carry different T, and there is no
  dispersion model — §6.
- **n is 43 anchors, all with Q ≤ 200.** The largest stretch carries C = 491
  channel positions. D*'s exponent trends *upward* across the range (0.812 at
  Q = 11, 1.414 at Q = 199, with local swings back to 1.000 at Q = 149 and
  Q = 179) with no model and no extrapolation. Nothing here licenses an
  asymptotic statement.
- **The LP's infeasibility, if it held uniformly in Q, would BE the Zone
  Postulate** and is therefore TPC-strength, not a sub-target. §7. Fifth
  wrong-direction arrival in this corpus.
- **`quadpoint-identity-01.md` is HELD and never red-teamed — UNVERIFIED
  PREMISE.** Nothing below depends on the capture identity being correct;
  it is used only to fix the stretch/channel convention, and that convention
  is bound to the custody artefact in SEC 1 (Q = 9281 reproduces T = 127 and
  CC = 2357; the CC < T anchor list reproduces the cited eight).

---

## 1. The construction [PROVEN, elementary]

Anchor Q prime ≥ 7, Q′ the next prime, stretch S_Q = [Q², Q′²), channel
positions a ∈ S_Q with a ≡ 11, 17, 29 (mod 30) and a + 2 < Q′², so both
members are coprime to 30. C = #channel, T = #twins.

For a channel position a set **sig(a) = { p ∈ [7, Q] : p | a(a+2) }**. By
finality sig(a) = ∅ **iff** a is a twin (asserted in the producer): a
composite member of the pair has least prime factor at most √a < Q′, hence
at most Q.

A sieve of level D on this stretch reads exactly the numbers
|A_d| = #{a : d | a(a+2)} for squarefree d | P(y), d ≤ D. A level-D
**lower-bound sieve** is a vector (λ_d) with Σ_{d | a(a+2), d ≤ D} λ_d ≤
1_{a is a twin} for every channel position a; it then certifies
T ≥ Σ_d λ_d |A_d|.

**Model A (exact data).** Variables ν(a) ≥ 0; constraints
Σ_{a ∈ A_d} ν(a) = |A_d| for every d | P(y), 1 < d ≤ D, plus the census row
Σ ν = C. Write

> m\*(D) = min twin mass over that polytope,  M\*(D) = max twin mass.

**By LP duality these are exactly the best level-D lower and upper bounds on
T obtainable from the data by any linear certificate**, and m\*(D) = 0 is
exactly the statement "a twin-free adversary matching the level-D data
exists", equivalently "no level-D lower-bound sieve certificate exists on this
stretch". D\*(Q) is the least D with m\*(D) ≥ 1. m\* is monotone
non-decreasing in D (more constraints shrink the polytope), which is what
makes the bisection in the producer valid.

One collapse makes the LP small: **every twin column is the same column.** A
twin's only divisor in P(y) is d = 1, so twins appear in the census row and
nowhere else, and the LP reduces to the non-twin signature classes with the
census row on top. The largest instances solved carry 491 channel positions
(Q = 199) and 417 distinct moduli (Q = 113), all in exact rational arithmetic
(BigInt simplex, Bland's rule, no floating-point tolerance anywhere).

**Model B (what a sieve actually has).** Model A hands the sieve the counts
*exactly*, which no theorem grants. So price the adversary instead:

> Δ(D) = min Σ_d |dev_d| (L¹, the sieve's own currency: a certificate with
> |λ_d| ≤ 1 loses at most Σ|dev|), and θ(D) = min max_d |dev_d| (L∞,
> per-modulus tolerance),

both subject to ν ≥ 0, Σ ν = C, zero twin mass. The census row stays hard:
the number of channel positions in an interval is exact and free.

**Model C (the literal formulation).** Constraints are residue-class counts,
Σ_{a ≡ b (mod p)} ν(a) = truth for every prime p ≤ y and every b. This is
**strictly more** than a sieve reads (a sieve sees only the sifted classes),
so it is an upper bound on sieve-accessible information, not a sieve.

---

## 2. The disconfirming result: the adversary dies, and it dies early [MEASURED, exact arithmetic, 43 anchors Q ≤ 200]

Read the producer's SEC 2 table. Three levels:

- **D = Q (single primes only).** m\* = 0 at 27 of 31 anchors Q ≥ 53. The
  adversary survives level 1 comfortably. This is `wall-note.md` §1 Door 4
  (the removal ledger and the union bound) re-derived as an exact optimum
  rather than a union bound: no per-prime accounting can force a survivor.
- **D = width (the interval's own length).** m\* > 0 at every anchor Q ≥ 31,
  but short of T at most of them — 37 against T = 49 at Q = 181, 41 against
  52 at Q = 199. The adversary is wounded at a level equal to the interval
  length and not yet dead.
- **D = Q² (the height h).** m\* = M\* = T at 42 of 43 anchors — the data
  *determines* the twin count. Q = 113 is the single hold-out (m\* = 41,
  M\* = 43 against T = 42).

D\* itself: mean ln D\*/ln Q = 1.181, range [0.812, 1.439], mean
D\*/width = 0.321. The exponent trends upward across the range (0.812 at
Q = 11, 1.414 at Q = 199, with local swings — 1.000 at Q = 149 and Q = 179).
**Nothing here extrapolates**, and the trend is the reason to distrust any
reading of the mean as a law.

**The comparison that matters, and it is adverse to the asymptotic theory
transferring.** The κ = 2 sifting limit is β₂ = 4.26645 (Diamond–Halberstam
2008; `research/REFUTED.md` rows on β₂), i.e. the asymptotic theory says no
lower-bound sieve of dimension 2 exists below level z^{4.26645}. Measured
here, the exact-data LP produces a valid lower bound at s = ln D\*/ln Q ≈
1.18, a factor 3.6 below the sifting limit. **There is no contradiction**, and
the gap is the whole point: β₂'s theory quantifies over sequences satisfying
the sieve *axioms* (density ω(d)/d plus a controlled remainder), while the LP
is handed the exact counts of one specific stretch. The distance between
s = 1.18 and s = 4.27 is precisely the value of the information the axioms
throw away. §3 measures what that information costs.

**Upper-bound side, with a hard non-comparability warning.** M\*(D = Q)/T has
mean 2.876 and max 5.000 over the 31 anchors Q ≥ 53. Lichtman 2025's
π₂(x) ≲ 3.29956·𝔖 (cited from `quadpoint-prior-art.md`, itself HELD) sits
inside that range. **These two numbers are not commensurable and must never be
quoted against each other**: Lichtman's is a uniform asymptotic constant over
all x, this is a per-stretch LP optimum on exact single-prime data, and its
maximum over our range already exceeds his constant by 1.5×.

---

## 3. What the certificate is worth once the data is not exact [MEASURED; the L¹ floor PROVEN]

**Δ(all levels) = T exactly, at 40 of 40 anchors.** The lower bound is a
theorem, not a measurement: Legendre's identity in the stretch,
C + Σ_{d>1} μ(d)|A_d| = T (asserted at all 43 anchors Q ≤ 200 in SEC 1 —
only d with |A_d| > 0 contribute, so the sum is finite and computable), makes
λ = μ a certificate with |λ_d| ≤ 1 attaining T, so any adversary must move
the level-∞ data by at least T in L¹. The LP attains that floor. Truncating
the level costs the adversary less: mean Δ(width)/T = 0.775 and mean
Δ(Q²)/T = 0.999 over the anchors Q ≥ 79.

**θ_min < 1 at 37 of 40 anchors, trending down.** Mean over the 22 anchors
Q ≥ 79 is 0.3018; the three exceptions are Q = 7, 11, 13, where the stretch
holds one to three moduli in total. Individual readings reach 0.1700 (Q = 157)
and 0.1707 (Q = 191), against 0.5000 at Q = 101 and Q = 179, so the trend is
not monotone. **The certificate is destroyed by perturbing every divisor count
by less than a third of one integer.**

**Against the sieve's own budget.** SEC 4 computes, on the same stretches, the
truncated Legendre main term C·Σ_{d≤D} μ(d)∏(2/p) and the worst-case
remainder Σ_{d≤D} |r_d| with r_d = |A_d| − C∏(2/p). At D = Q² the ratio
Σ|r_d| / Δ runs **5.3 at Q = 23 to 20.8 at Q = 149**, min 5.3, max 30.4
(at Q = 137), trending up with Q but not monotone. A level-Q² sieve is already
carrying five to thirty times the distortion the adversary needs, before any
attempt to be clever with λ.

**And at level = width the signal has the wrong sign.** The truncated
Legendre main term is *negative* at 6 of 27 anchors at D = width (Q = 59, 71,
101, 107, 137, 149 in the SEC 4 table). At level equal to the interval length
the classical main term does not merely lose to its remainder, it points the
wrong way. This is `wall-note.md` §1 Door 1's budget instantiated in the
stretch coordinate rather than the tile's.

---

## 4. Model C, the literal first-move formulation [MEASURED]

m\*_classes = T at 31 of 31 anchors tested (C ≤ 120, Q ≤ 197). Residue-class
data mod every prime p ≤ y determines the twin count exactly, everywhere. As
expected and uninformative: for small stretches a residue class mod p holds
O(C/p) positions, so classes containing only twins occur and locate them
directly. The row is recorded because the first move asked for it, and it
should not be read as a sieve statement — this data model is strictly stronger
than anything a sieve reads.

---

## 5. Which classical statement this instantiates, and where the analogy breaks [PRIOR ART, no novelty claimed anywhere]

**The classical statement.** The parity problem, identified and named by
Selberg (1949). In the owning convention: *if a set's elements are all
products of an odd number of primes, or all products of an even number, then
without injecting additional ingredients sieve theory is unable to provide
non-trivial lower bounds on the size of the set, and any upper bound must be
off from the truth by a factor of 2 or more.* Sources as the corpus already
carries them (`research/PRIOR-ART.md`; `research/sift-limit-attack.md` §4.1):
Selberg 1949; Friedlander–Iwaniec, *Opera de Cribro*, AMS Colloquium
Publications **57** (2010); Tao, *Open question: the parity problem in sieve
theory*, terrytao.wordpress.com, 2007-06-05; Bombieri, *The asymptotic sieve*,
Rend. Accad. Naz. XL (1975/76), and Friedlander–Iwaniec's asymptotic sieve for
primes, *Annals* **148** (1998).

**Where our object sits inside it.** With y = Q the unsifted set of our
sifting problem is exactly the twins, i.e. the a with Ω(a(a+2)) = 2 — fixed
even parity. So the twin problem is a parity-obstructed problem in the
classical sense and the "no non-trivial lower bound" half is the half that
applies. **But the dimension is not the classical worked example's.** Selberg's
concrete instance splits the x^{1/2}-rough numbers ≤ x by parity of Ω, a
dimension-1 (linear) sieve problem where the factor is 2. Ours is a two-class
sieve, κ = 2, sifting limit β₂ = 4.26645, and the published upper-bound
constants for twins are 8 (Selberg 1947) down to 3.29956 (Lichtman 2025) —
not 2. Any sentence transferring "the factor 2" to this object is wrong, and
this note does not make one.

**Where the analogy breaks, and this is the honest part.** The classical
statement is *asymptotic* and is about a **model** of the data — the density
ω(d)/d plus a remainder controlled on average to level D. The LP above is
*finite* and is handed the **exact counts** of one specific stretch. Its
verdict differs from the classical one: with exact counts the adversary dies
at s ≈ 1.18, far below β₂. So **this LP does not reproduce the classical
parity obstruction, and it must not be cited as a finite version of it.** What
it does is locate where the classical obstruction actually lives on our grids:
not in the information, in the remainder. That relocation is the note's
content.

**Prior art, position.** The LP-duality reading of "no lower-bound sieve at
level D exists ⟺ a non-negative measure with matching level-D data and zero
mass on the sifted set exists" is standard convex duality applied to the
standard sieve certificate condition, and the *method of proving sieve
optimality by exhibiting an extremal sequence* is Selberg's own. **No novelty
is claimed.** A page-level search in the owning convention for the finite,
exact-count instance is **OWED** and has not been run; `SEARCH-CONVENTIONS.md`
carries no row for the parity obstruction and one is proposed in §9.

---

## 6. The control [MEASURED — the measurement is about sieves, not about twins]

Replace {0, −2} by two uniformly chosen residues per active prime (seeded,
same interval, same channel ground set) and repeat everything. On the 34
matched anchors:

- Δ/T = 1.000 at every control anchor, exactly as in the true arithmetic.
- ln D\*/ln Q: true 1.192, control 1.139, ratio 1.047.
- θ_min: true 0.3851, control 0.5307, ratio 0.726 — the true arithmetic's
  certificate is the **more fragile** of the two, at 25 of 33 tied-free
  anchors, paired sign test two-sided **p = 0.0046**.

Reading: the D\* behaviour and the Δ = T floor are **sieve-generic** and carry
no twin-specific content — they would look the same for any two-class sieve on
any interval, and that is what the control shows. The θ_min separation is the
one place the arms come apart, and it survives a sign test. It is still **not
a finding**: the test was not pre-registered, it was run after the ratio was
seen, the two arms carry different T (T_ctrl ≠ T) so the comparison is
confounded by the denominator, one seed family is one seed family, and 33
anchors below Q = 200 is small. What would make it one: a matched-T control
family, a second and third seed family, a pre-registered band, and a
mechanism. Nothing here supplies any of the four.

---

## 7. The trap check: is this a proof ingredient? [PROVEN — it is not]

m\*(D) ≥ 1 at a single anchor certifies T(Q) ≥ 1 on that stretch, where T is
already known by direct count. Worthless as an ingredient.

The uniform statement — m\*(D(Q)) ≥ 1 for all large Q, with D(Q) in some
reachable class — implies T(Q) ≥ 1 for all large Q, which is the strong Zone
Postulate and implies TPC. It is in fact **strictly stronger** than TPC, since
it demands a certificate and not merely existence. So the LP is a
**diagnostic**, never a sub-target: proving its infeasibility uniformly is at
least as hard as the conjecture. This is the same wrong-direction arrival the
corpus has logged four times before (`REFUTED.md`: the anchored-δ bound, the
thinning coupling's H″, the L = 1 residue count, the maximal law), and it is
the fifth. Anyone who proposes "prove the parity LP infeasible for all Q" as a
next step has proposed the conjecture.

---

## 8. Verdict on TODO Z2 first move (b), and what to do with it

Z2 (b) asks to "decide honestly whether any machinery reaches that precision
class, or whether this frame's deliverable is the wall's fourth naming."

**The answer, with the coordinates.** The precision class is now measured, not
described. To certify T ≥ 1 on a stretch from level-D congruence data, the
data must be correct to within **T counts in total** (Δ = T, Legendre-forced
below, LP-attained above) and to within **≈ 0.30 of one count on each single
modulus** (θ_min, mean over Q ≥ 79, trending down but not monotone). The worst-case remainder
a level-Q² sieve carries on the same stretch is 5.3× to 30.4× that budget and
growing in Q, and at level equal to the interval width the truncated main term
is negative at 6 of 27 anchors. **No sieve remainder theory delivers per-modulus
accuracy below one count at moduli exceeding the interval length**, because at
those moduli the count *is* O(1) and the whole term is remainder. So: the
machinery does not reach the precision class, the gap is measured at one to
one-and-a-half orders of magnitude at Q ≤ 149 and widening, and this frame's
deliverable **is** the wall's naming — but the naming now carries two numbers
(T and 0.30) instead of an analogy.

**What changed, and what did not.** Nothing moved on the conjecture. What
moved: the claim "congruence data to level y cannot see occupancy" is
REFUTED on our grids (it can, from D\* ≈ 0.32·width upward), so future notes
must not use the information-barrier phrasing for this object. The barrier is
error control, and it has a price tag.

---

## 9. NOT REACHED

- **No anchor above Q = 200.** The LP is polynomial and a decade more is
  within reach of the exact solver with a better pivot rule or a
  fraction-free tableau (Bland's rule is chosen here for safety, not speed);
  the D\* exponent's trend across the computed range is the reason to want
  them, and nothing about that trend is modelled. A run past Q = 200 should
  carry a sealed prereg on the exponent, per the corpus rule.
- **No y < Q sweep.** Everything here sifts the full range y = Q, so the
  unsifted set is the twins. The identity note's y\* = h^{1/(2e^γ)} depth law
  lives at y < Q, and the LP at truncated y (where the unsifted set is the
  y-rough pairs and X(y) enters) is untouched.
- **The dual certificates themselves.** The LP returns optima, not the
  extremal λ vectors. Reading off the λ that attains m\*(D\*) would say what
  the certificate at the killing level actually *is*, and whether it is
  anything other than a disguised factorisation table. That is the single
  highest-value follow-up and it is one flag away in the producer.
- **The prior-art search of §5**, at page level, in the owning convention.
  Proposed `SEARCH-CONVENTIONS.md` §1 row (NOT written — this note edits no
  other file): *object* "a measure indistinguishable from the truth by the
  sieve's own data" / *ours* "the parity adversary" / **owning convention**
  "the parity problem", "Selberg's parity example", "parity-sensitive sieve",
  "asymptotic sieve". Warning for whoever runs it: "adversary" is a house
  word here and belongs to combinatorics and complexity theory elsewhere, so
  a clean negative on it would be the default failure mode this file exists
  to prevent. **No absence is asserted anywhere in this note.**
- **The θ_min control separation** (ratio 0.726), left as an unexplained
  measurement, deliberately.

---

*Producer and custody: `research/attack-parity-adversary-01.js`, embedded.
Cited, never recomputed: `quadpoint-identity-01.md`'s stretch/channel
convention and the T = 127 / CC = 2357 / eight-anchor figures from
`attack-quadpoint-03.js`'s embedded OUTPUT (both HELD, never red-teamed —
UNVERIFIED PREMISE); β₂ = 4.26645 and Lichtman's 3.29956 from
`REFUTED.md` and `quadpoint-prior-art.md`. HELD for the end-of-day
adversarial roundup (TODO Z0). History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
