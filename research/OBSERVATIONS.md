# Observations from the bench

<!-- ledger
id: Q-observations
status: PARTIAL
todo: none
question: Which sightings from the bench survive being stated precisely enough to check, and at what rung?
verdict: A running log, each entry carrying its own rung: the mirror-centre and divisor-landmark items stand as VERIFIED, the closed form for the half word is REFUTED as a route (max of the half equals max of the whole at every level), and the compounding window is PROVEN to close only to U = 30.
-->

Things noticed while playing with the instruments in `web/bench/`, recorded
before they are chased. This file is deliberately not TODO.md: an item here is
a sighting, not a plan, and it earns its place by being stated precisely enough
to be checked rather than by being important.

House rules. Every entry carries its rung on the ladder (PROVEN, VERIFIED by
exact computation, MEASURED, CONJECTURED, REFUTED). An entry that turns into
real work leaves for a research artifact and keeps only a forward pointer here.
An entry that turns out to be known leaves with a pointer to the prior art,
including our own. Refuted entries stay, marked.

**Triage rule, applied to every entry before anything else.** If a sighting can
be stated in residues it is free and probably known; if it needs an interval,
meaning a relation between the pattern and a stretch of the number line, it is
hard. The entries worth real time are the ones on the boundary, where a residue
statement is trying to become an interval statement, which is why the
extremal-gap position question and the d ↦ G_d map rank above everything else on
the bench.

The rule, the reason the tile's CRT structure forces it, and its one payout
against a published programme are stated in full in [THE-LENS.md](THE-LENS.md)
§5, which owns it.

---

## 1. The mirror centre is struck by every stacked prime except 2

**Sighting** (Chris, 2026-08-15, on the number line at the mirror jump): the
column at the mirror axis is always hit by every previous prime except 2.

**Status: PROVEN, one line.** The mirror centre is p#/2, and

    p#/2 = 3 · 5 · 7 · … · p

by construction. So it is divisible by every odd prime up to p and by no power
of 2. The intuition in the sighting is exactly the mechanism: dividing the tile
width by 2 is what removes 2 from the product, and it removes nothing else.

**Its visual signature.** In the number line's `rows` mode this makes the
mirror column unmistakable without any line drawn on it: full height, every
band a single row, except the bottom band, which is 3's colour and two rows
tall because 2 did not strike and 3 hangs down through the empty row. Compare
the tile edge at p#, which is struck by everything including 2 and so has every
band single.

**The neighbourhood, VERIFIED T5 through T23.**

| position | struck by |
|---|---|
| p#/2 | every odd prime ≤ p |
| p#/2 ± 1 | 2 alone |
| p#/2 ± 2 | nothing: both are holes |

The pair at p#/2 ± 2 is a genuine d = 4 slot of the tile, centred exactly on
the mirror axis. Verified as a member of the d = 4 slot set at T5, T7, T11,
T13, T17.

**Why, PROVEN.** For odd q ≤ p we have p#/2 ≡ 0 mod q, so p#/2 ± k ≡ ±k, which
vanishes only when q divides k. And p#/2 is odd, so p#/2 ± k is odd exactly
when k is even. Hence:

> p#/2 ± k is a hole ⟺ k is even and no odd prime ≤ p divides k.

VERIFIED with zero mismatches over k = 1..200 at T11, T13, T17, T19.

**The power-of-two reading is a window artifact, and this is worth stating
because the eye reaches for it immediately.** The admissible distances are
every k = 2^a·m with a ≥ 1, m odd and coprime to p#. Powers of two are simply
the only such k below 2·p_next, since the smallest odd part greater than 1 that
is allowed is the next prime. So near the centre the ladder reads as
2, 4, 8, 16, 32 and then breaks. VERIFIED, admissible k ≤ 60:

| level | admissible distances | first non-power-of-two |
|---|---|---|
| T7 | 2, 4, 8, 16, 22, 26, 32, 34, 38, 44, 46, 52, 58 | 22 = 2·11 |
| T11 | 2, 4, 8, 16, 26, 32, 34, 38, 46, 52, 58 | 26 = 2·13 |
| T13 | 2, 4, 8, 16, 32, 34, 38, 46, 58 | 34 = 2·17 |

Each level's first exception is exactly 2·p_next, which is why the clean stretch
gets longer as the level rises and the artifact gets more convincing.

## 1a. The same question at the tile edge, and the duality

Running the identical argument at p# instead of p#/2 gives

> p# ± k is a hole ⟺ k is odd and no prime ≤ p divides k.

VERIFIED with zero mismatches over k = 1..200 at T11, T13, T17. The k = 1 case
is the Euclid edge already in the glossary; what is new here is only that it
sits inside a family.

The two mirror axes of the single reflection therefore each carry a guaranteed
pair at their centre, and the pairs are different:

| axis | centre struck by | nearest symmetric holes | pair they form |
|---|---|---|---|
| p# (tile edge) | every prime ≤ p | ±1 | a twin slot, d = 2 |
| p#/2 (tile centre) | every odd prime ≤ p | ±2 | a cousin slot, d = 4 |

The edge pair is the Euclid pair and the seam pair of the glossary. The centre
pair appears to have no name in our vocabulary and no mention anywhere in
`research/` or `paper/` as of 2026-08-15.

**Why this might matter, CONJECTURED and unpriced.** The edge pair is the
object behind Euclid-in-moiré: it survives every fold, so the family never
dies. The centre pair survives every fold by the same argument. If the edge
pair is worth a theorem, it is worth asking what the centre pair is worth, and
whether the pair of them is one object seen twice, since they are the two fixed
points of one reflection.

**First moves.**

- Compute the centre pair's birth fold and house. The edge pair is the eternal
  edge and House 29; the centre pair's lineage is unexamined.
- Ask whether the centre pair is ever a real cousin prime pair rather than a
  slot, and how the frontier p² relates to p#/2. Note p#/2 is far past p², so
  the centre pair is never crystallized by the current level and this is a
  statement about slots, not primes. That is the wall again, in a new place.
- Check `two-moire-argument.md` and the Seam Lemma for whether the centre pair
  is already implicit in the edge lineage under a different name.

## 1b. Divisor landmarks: the general shape

The two axes are the m = 1 and m = 2 cases of one construction: the landmark
p#/m for m a squarefree product of the smallest primes. The same argument gives
the symmetric hole ladder around each landmark.

MEASURED at T7 through T19, nearest symmetric hole pair:

| landmark | struck by | nearest symmetric holes |
|---|---|---|
| p# | all primes ≤ p | ±1 |
| p#/2 | all odd primes ≤ p | ±2 |
| p#/6 | all primes 5 ≤ q ≤ p | ±6 |
| p#/30 | all primes 7 ≤ q ≤ p | ±6, with T13 an exception showing none within ±6 |

The T13 exception under p#/30 is the interesting cell in that table, and it is
not yet explained. CONJECTURED: the nearest symmetric hole distance around
p#/m is governed by the residues of p#/m modulo the primes dividing m, which is
why m = 1 and m = 2 give a clean answer (the landmark is ≡ 0 or ≡ nothing) and
m = 30 does not.

**First move.** Derive the general rule for the nearest symmetric hole pair
around p#/m, then check whether the landmarks with small nearest pairs are also
the ones with unusual local slot density. If a landmark forces a slot of a
given offset at every level forever, that is a per-offset analogue of the seam
guarantee and it should be counted.

---

## 1c. Novelty, honestly

The underlying fact is a one-line coprimality computation, so as mathematics it
is certainly known and almost certainly not new. It sits in the same class as
Euclid's p# ± 1, which `PRIOR-ART.md` already records as classical (Euclid IX.20,
Meštrović's survey of 180+ proofs), and as the wheel palindrome, recorded there
as known-obscure folklore (gcd(r, n) = gcd(n − r, n)). Neither entry mentions
the centre landmark, and a targeted literature check has not been run.

What is worth keeping is the framing rather than the fact. p# and p#/2 are the
two positions from which the hole pattern is easiest to read, because from
either one the coprimality test on n ± k collapses to a test on k alone. From
the edge the answer is that the pattern reads as itself: p# ± k is a hole
exactly when k is a hole. From the centre it does not: the admissible distances
are 2^a·m for odd m coprime to p#, a strictly denser set than the holes. Two
clean viewpoints, two different pictures, one reflection.

## 2. Is there a closed formula for the jump word at every level?

**Sighting** (Chris, 2026-08-15): the jumps are trivial at 2, known at 2·3,
known at 2·3·5, and it feels as though a straight formula should exist for any
set, with the obstacle being that each added prime is fundamentally adding a
dimension.

The jump word, for the record, VERIFIED:

| level | width | holes | distinct jumps | largest | word |
|---|---|---|---|---|---|
| T2 | 2 | 1 | 1 | 2 | 2 |
| T3 | 6 | 2 | 2 | 4 | 4, 2 |
| T5 | 30 | 8 | 3 | 6 | 6, 4, 2, 4, 2, 4, 6, 2 |
| T7 | 210 | 48 | 5 | 10 | sizes 2, 4, 6, 8, 10 |
| T11 | 2310 | 480 | 7 | 14 | sizes 2..14 even |
| T13 | 30030 | 5760 | 10 | 22 | sizes 2..18 even, and 22 |

**Status: the answer splits into three tiers, and the split is exactly the
triage rule above.**

*The word has an exact recursion, and it is already ours.* Copy the word p
times, then merge the two jumps flanking every position p strikes. That is the
2024 jumps.txt merge rule, recorded in `GLOSSARY.md`, `CHRONICLE.md` and
`paper/moire-primes.md`, with the twin-slot version stated alongside it. It is
a complete and deterministic description. It is a recursion rather than a
closed form, which is what the sighting is really asking about.

*The statistics of the word are solved in closed form.* How many jumps of each
size is a pure residue statement, and `research/grain-census.js` gives the exact
CRT inclusion-exclusion identity with its fold covariance for the twin version.
The single-hole version is the same machinery.

*The extremes of the word are open, and this is the real obstacle.* The largest
jump at level p is Jacobsthal's function g(p#). VERIFIED: our column above reads
2, 4, 6, 10, 14, 22, which is OEIS A048670 exactly. No closed form is known,
only bounds, Iwaniec's g(q) ≪ log²q among them. So a straight formula for the
jump word would hand over Jacobsthal's function as a corollary. The limitation
the sighting senses is real, it is not a gap in our effort, and it has a name.

**On the dimension intuition, which is right and has a name.** The tile at level
p is a k-dimensional torus, k = π(p): the product Z/2 × Z/3 × … × Z/p. The
number line enters it as a single diagonal line, by CRT, and the jump word is
the one-dimensional trace of that line through a k-dimensional object with
forbidden hyperplanes removed. Each new prime genuinely does add a dimension,
and the word's complexity grows because a 1D slice of a k-dimensional structure
carries more information as k rises. This is the cut-and-project construction of
quasicrystal theory; the k = 2 case is the Sturmian words. CONJECTURED as a
useful framing, not yet checked against that literature.

**First moves.**

- Count of distinct jump sizes per level: 1, 2, 3, 5, 7, 10 at T2..T13. Check
  OEIS. If absent, it is a cheap micro-publication in the style of the G₂ draft.
- ~~Read the jump word as a substitution system.~~ **DONE, thirty-fourth pass,
  and the answer is not a substitution.** The constraint graph of the kill word
  is EXACT and **strictly sofic**, with **capacity ln 2** and the capacity free of
  `p`; the word count is `2^{n+1} − 1` and the PAIRS census reproduces 7 of 7.
  Sofic, not substitutive, is what it is instead, so the connection to symbolic
  dynamics is made and `IMPORT-MAP.md` row 2 is LANDED. The move also cost the
  novelty: the language is the **B = 1 charge constraint /
  alternate-mark-inversion** of Marcus–Roth–Siegel §2.3 p. 47, capacity in their
  §3.2 p. 75, so soficity and capacity are reproductions
  (`research/history/staging/import-sofic.md`).
- ~~Check the cut-and-project framing against the literature before leaning on
  it.~~ **DONE, twenty-fourth pass onward, and the nearest dynamical import is
  CLOSED with an exclusion in print.** The B-free/Sarnak route was run and shut:
  Araújo's 2026 multi-class generalisation names the Mertens-divergent regime —
  ours — "not an interesting system", the limit comb is `{−1}` with **entropy 0**
  and **not Toeplitz**, and the dictionary is exact at period scale while silent
  exactly where Assumption A and `H″` live; `H″`'s dynamical translation predicts
  the opposite of what is measured (`research/OUTCOMES.md`,
  `research/history/staging/import-bfree.md`). Do not lean on the framing, and do
  not re-open the route.

## 3. A closed form for the half word instead of the whole — REFUTED

**Sighting** (Chris, 2026-08-15): the word is mirrored, so any closed form for
the whole thing has to climb to the mirror and back down again. A closed form
for one half, walked forwards and backwards, might be easier.

**Verdict: REFUTED as a route, 2026-08-15.** The halving is real and the
structure below is exact, but max(half) = max(whole) at every level, so a closed
form for the half yields Jacobsthal's function exactly as a closed form for the
whole does. The obstacle does not care which half you look at. Kept in full
because the structural facts it turned up are reusable and because a route that
looks promising and is not deserves to stay visible.

**The structure is exactly as the sighting describes, VERIFIED T3 through T17.**
Write the jump word as the wrap gap followed by the interior gaps. Then:

- the interior word is a **palindrome** at every level, exact, no exceptions;
- its length is φ(p#) − 1, always odd, so it has a true centre entry;
- the **centre entry is always 4**, and the **wrap gap is always 2**;
- the **first entry is always p_next − 1**, and the last by the mirror. Nothing
  between 1 and p survives, so the first hole past 1 is the smallest prime
  beyond the stack. VERIFIED 4, 6, 10, 12, 16, 18 at T3..T17.

Three forced entries, then. The level at which the forced opening entry stops
being the largest one is the level at which Jacobsthal stops being trivial:
p_next − 1 is the maximum at T3, T5 and T7, and is beaten from T11 on (14
against 12, then 22 against 16, then 26 against 18).

So the whole word is determined by its first φ(p#)/2 entries, and the two ends
are not free: they are the two landmarks of entry 1. The wrap gap of 2 is the
Euclid pair p# ± 1 straddling the tile edge. The centre entry of 4 is the cousin
pair p#/2 ± 2 straddling the mirror. Entry 1 is why both are forced, which makes
these two observations one observation seen from different sides.

**Why the palindrome holds, PROVEN.** Holes are symmetric under r ↔ p# − r, so
for holes h₁ < … < h_m the reflection sends hᵢ to p# − h_{m+1−i} and therefore
gᵢ to g_{m−i}. That is the palindrome, and the centre entry is the gap
straddling p#/2, which entry 1 pins at 4.

**Honest verdict on whether it helps: partly, and not where it matters.**

*It genuinely halves the object.* Half the storage, half the compute, and a
canonical fundamental domain [0, p#/2] for the reflection. Worth having.

*It does not touch the hard part.* VERIFIED at every level above:
max(half word) = max(whole word). The largest jump lives in both halves by
symmetry, so a closed form for the half hands over Jacobsthal's function just as
readily as a closed form for the whole. The obstacle in entry 2 survives the
halving untouched.

*The recursion on the half is raggeder, not cleaner.* Under a fold by p the
whole word is p copies plus merges, which is uniform. The half word becomes
(p−1)/2 whole copies plus one half copy, then merges, because p is odd and
p·p#/2 does not split into whole old tiles. So the operation we most want to
iterate looks worse in the fundamental domain than outside it. CONJECTURED that
this is the real reason to expect no easy win, not yet argued properly.

**First moves.**

- Test the guess directly rather than by argument: compute the half words at
  T5..T17 and look for a pattern the full words do not show. Cheap, and it
  settles the idea either way.
- If the ragged fold is the obstruction, ask whether a different fundamental
  domain behaves better. The reflection is one symmetry; if the tile has other
  structure-preserving maps, their quotients are also candidates and nobody here
  has looked for them.

## 4. The lucky numbers as a falsification control

**Sighting** (Chris, 2026-08-15): start from all integers, remove every second
slot, then read off the value now sitting at position 2 and remove its slots
too, and so on. Is that a valid way to generate the primes?

**Resolved immediately, by Chris.** It generates the primes only if "remove its
slots" means remove the multiples of k, which is the sieve of Eratosthenes with
the index relabelled. Nothing new. But the *other* reading is where this earns a
place here.

**The positional reading generates the lucky numbers of Ulam.** Remove every
k-th surviving slot rather than every multiple:

    1, 3, 7, 9, 13, 15, 21, 25, 31, 33, 37, 43, 49, 51, 63, 67, 69, 73, 75, 79 …

Not the primes. It keeps 9, 15, 21, 25 and drops 2, 5, 11, 17. There is no
divisibility anywhere in its construction: no tile, no period, no CRT, no
arithmetic of any kind. It is pure position.

**MEASURED to 10⁷, and this is the reason to file it.**

| x | lucky(x) | π(x) | ratio | x/ln x |
|---|---|---|---|---|
| 10³ | 153 | 168 | 0.911 | 145 |
| 10⁴ | 1,118 | 1,229 | 0.910 | 1,086 |
| 10⁵ | 8,772 | 9,592 | 0.915 | 8,686 |
| 10⁶ | 71,918 | 78,498 | 0.916 | 72,382 |
| 10⁷ | 609,237 | 664,579 | 0.917 | 620,421 |

- Twin pairs at distance 2: 55,548 lucky against 58,980 prime, ratio 0.94.
- Largest gap below 10⁷: 182 lucky, 154 prime. Same order.
- The luckies track the naive x/ln x *more closely than the primes do* across
  the whole range.
- The two sets are nonetheless genuinely different: only 10.2% of luckies are
  prime, 62,446 shared members against 40,489 expected for independent sets at
  these densities. Correlated at about 1.5×, nowhere near identity.

**Why this matters to the framework, and it is not a small point.** Every
statistic the corpus measures — density, twin counts, gap scale — survives the
complete removal of arithmetic content. Two sets that share those statistics to
within a few percent differ in 90% of their members. That is the parity problem
stated empirically rather than as a theorem: counting cannot separate these two
sets, and the property that separates them is exactly the one counting cannot
see. It is the same finding attack 9 reached from inside, that the statistics
show no cliff at "prime".

**The proposal: use the luckies as a control set.** Before any statistical claim
about the tile earns a place in the papers, run the identical measurement
against the lucky numbers. If it also holds there, the claim is about sieving
and not about primes, and it should be stated that way or dropped. This is a
cheap falsification gate and we do not currently have one.

**First moves.**

- Run the corpus's headline measurements against the luckies as a control: the
  e^{2γ}/4 ≈ 0.79 zone share, the sub-Poisson window variance, the ±1.1σ
  Hardy-Littlewood agreement, the grain census shape, the G₂ growth law. Score
  each as sieve-generic or prime-specific. Some will survive and those are the
  ones worth defending.
- The luckies have no p, so there is no zone (p, p²) to test directly. Decide
  what the honest analogue of an anchored window is before measuring, not after.
- Prior art check. Using lucky numbers as a random-sieve control is standard
  practice, so the technique is certainly not ours. What is worth knowing is
  whether anyone has run it against *this* family of claims.

## 5. Boxes: composites as rectangles, and what the higher dimensions are

**Sighting** (Chris, 2026-08-15): a composite is a number that forms a perfect
rectangle, which is not a new view. But then there are 3D primes, numbers that
cannot form a perfect box from three factors, and 4D, and so on.

**The correspondence is exact, VERIFIED by brute force for every n ≤ 3000 and
every k ≤ 6.** A number forms a perfect k-dimensional box, meaning
n = a₁·a₂·…·a_k with every aᵢ ≥ 2, exactly when Ω(n) ≥ k, where Ω counts prime
factors with multiplicity. So the numbers that *cannot* are those with
Ω(n) ≤ k−1.

**Status: this lands on the almost-primes, the central object of sieve theory.**

| the sighting's name | condition | standard name | count below 10⁶ |
|---|---|---|---|
| 2D primes | Ω ≤ 1 | P₁, the primes | 78,498 |
| 3D primes | Ω ≤ 2 | P₂ | 288,533 |
| 4D primes | Ω ≤ 3 | P₃ | 539,386 |
| 5D primes | Ω ≤ 4 | P₄ | 737,448 |
| 6D primes | Ω ≤ 5 | P₅ | 861,913 |

Brun built the first sieve to produce these. They are what every sieve actually
delivers, and the whole history of the twin prime problem is the history of
pushing k down.

**Chen 1973, restated in the sighting's language:** there are infinitely many
primes p whose neighbour two along is a 3D prime. That is still the best known
result. The Twin Prime Conjecture is the identical sentence with 2D in place of
3D. The entire distance between proven and wanted is one dimension.

**The parity problem, restated in the sighting's language, and this is the
reason to file the entry.** Selberg's obstruction says sieve methods cannot
distinguish integers with an odd number of prime factors from those with an
even number. In boxes: *a sieve can prove a number needs at most three
dimensions, and can never prove that its number of dimensions is odd.* Going
from P₂ to P₁ means excluding Ω = 2 while keeping Ω = 1, which is precisely an
odd-versus-even distinction, which is precisely what sieves cannot see. This is
the most teachable statement of the wall we have found.

**Novelty: none, and that is fine.** Ω is the standard grading, almost-primes
are standard, and the geometric reading of composites as rectangles is folklore.
What the entry is worth is the framing, in exactly the way `PAPERS.md` positions
the whole project: a lens that makes an old object newly speakable.

**Incidental, MEASURED.** The dimension spectrum below 10⁶ peaks at Ω = 3, with
250,853 members, ahead of Ω = 2 at 210,035 and Ω = 4 at 198,062. The typical
number down there is a three-dimensional box.

### 5a. The "exactly one box" variant, and why it is a different object

**Sighting** (Chris, 2026-08-15): a 3D prime might better mean a number with one
and only one unordered set of three factors whose product is n.

**It is a different object, and the difference is exact. VERIFIED to 20,000 for
k = 2, 3, 4:**

> {n : exactly one unordered k-box} = {Ω(n) = k} ∪ {p^(k+1)}

| reading | condition | shape |
|---|---|---|
| entry 5, what the instrument draws | Ω(n) ≤ k−1 | cumulative, everything up to a depth |
| this variant | Ω(n) = k, plus p^(k+1) | a single layer |

**PROVEN in a paragraph.** Every part of a k-box has at least one prime factor,
so Ω(n) ≥ k. When Ω(n) = k each part must be a single prime, so the box is
forced to be the prime factorisation and is unique. When Ω(n) = k+1 a k-box
merges exactly two of the primes, and distinct merges give distinct boxes unless
all the primes are identical, which is exactly n = p^(k+1). At Ω(n) ≥ k+2 there
are always at least two boxes.

**The reason not to adopt it as the prime analogue.** At k = 2 it yields
4, 6, 8, 9, 10, 14, 15, 21, 22, 25, …, the semiprimes, not the primes. The
ladder does not start at the primes. A prime's defining property is that it
cannot be factored at all, which generalises to "cannot be factored into k
parts", the cumulative Ω ≤ k−1 of entry 5. "Factors in exactly one way" is a
real property but not the one primes have.

Both are standard: the layers are the k-almost-primes (A001358, A014612,
A014613), the cumulative sets are the P_k the sieves produce.

**Worth a look regardless.** The prime powers p^(k+1) are the only intruders,
and they intrude because identical factors leave no choice about grouping. They
are more composite than the layer and still uniquely boxable. Whether that thin
exceptional set does anything inside the tile is unexamined and cheap to check:
`dimensions.html` already has Ω, so colouring the prime-power holes separately
is a small change.

**First moves.**

- Take this into `web/PROPOSAL.md` act 8. The parity demo was flagged there as
  the highest-risk item on the build, and boxes give the two piles a meaning a
  sixteen year old can hold. Done: the proposal now names it.
- Cross-check against `attack-09-chen-theta.js`, which already measures Chen
  territory in the tile and reports it holding exactly 2.0× the twins. The
  dimensional reading and that measurement should be stated in one vocabulary.
- ~~Colour the tile's holes by Ω rather than by whether they are slots.~~
  BUILT, 2026-08-15: `web/bench/dimensions.html`. What it showed:

  **The ignition law, PROVEN and VERIFIED.** Every hole of the tile at level p
  has all its prime factors above p, so the smallest hole of dimension k is
  exactly p_next^k, and p_next^k is itself coprime to p# so it really is a hole.
  The tile's dimension spectrum therefore has hard ignition points, and the
  k = 2 one is the crystallization frontier restated: below p_next² every hole
  is one-dimensional, which is to say prime. Verified at T13 (289 = 17²),
  T17 (361 = 19²), T19 (529 = 23²), and at every higher k in range.

  **The tile's dimension depth grows slowly, MEASURED.** T13 reaches 3D, T17
  reaches 4D, T19 reaches 5D, since the depth is ⌊log p# / log p_next⌋.

  **Primes lose the majority of the holes between T13 and T17, MEASURED.**

  | level | holes | 1D (prime) | 2D | 1D share |
  |---|---|---|---|---|
  | T13 | 5,760 | 3,242 | 2,385 | 56.3% |
  | T17 | 92,160 | 42,324 | 43,378 | 45.9% |
  | T19 | 1,658,880 | 646,021 | 808,053 | 38.9% |

  Read carefully this is a statement about the tile growing wider rather than
  about sieving weakening, so it is a landmark and not yet a result. What makes
  it worth recording is the side-by-side: over the same range, the unsieved
  integers are already spread across five dimensions where the tile's holes are
  still almost entirely one- and two-dimensional. The sieve compresses the
  spectrum downward and never reaches the bottom, which is the wall in a picture.

## 6. The residual against the classical curve has a stable power, and §11 may be underselling it

*(Not from the bench. This one came out of the @41 march of 2026-08-16 and is
parked here rather than in TODO.md because it is a reading of existing
numbers, not a plan.)*

**MEASURED.** Recompute the anchored bias residual against the zero-knob
classical curve β ≈ (e^{2γ}/4)(1 + 2/lnW + 6/ln²W) at full precision, rather
than the four decimals the run prints:

| x | lnW | β exact | classical | residual |
|---|---|---|---|---|
| 23 | 19.2231 | 0.8930483 | 0.8884421 | 4.606e−3 |
| 29 | 22.5904 | 0.8751545 | 0.8725905 | 2.564e−3 |
| 31 | 26.0244 | 0.8625917 | 0.8610276 | 1.564e−3 |
| 37 | 29.6353 | 0.8529593 | 0.8519937 | 9.657e−4 |
| 41 | 33.3489 | 0.8455306 | 0.8448944 | 6.362e−4 |

The decay power implied by each consecutive pair is **3.629, 3.493, 3.712,
3.535**: four independent estimates on 3.6 ± 0.1. Neither a pure 1/ln³W nor a
pure 1/ln⁴W fits alone (best single-term fits miss by 13 to 20% and by 12% at
the ends), but the exponent itself never wobbles.

**The observation.** That stability is the signature of an asymptotic series
missing further terms, and it is not the signature of a wrong limit. If the
true limit of β were some value other than e^{2γ}/4, the residual would
converge to a nonzero constant and the implied power would fall toward 0.
Across four levels it does not move off 3.6. Taken at face value this bounds
any constant offset in the limit to below roughly 6e−4.

**Why this is worth addressing later.** `paper/anchored-note.md` §11 currently
prices the evidence as "the remaining gap to the conjectured limit, 0.0525, is
still 87 times the deepest residual, so the limit reading is
extrapolation-supported, not observed". That is defensible but it may
misdescribe what the 0.0525 is: almost all of it is the *predicted*
2/lnW + 6/ln²W correction, not unexplained gap. What is unexplained is
6.4e−4, and it is falling like lnW^{−3.6}.

**The counter-argument, which is why this is an observation and not an edit.**
A rival model with a different limit and different correction coefficients has
two free parameters and can fit five points. The zero-knob model's actual
claim to strength is that it has none and still lands inside 0.075% relative
at @41. Whether §11 should be rewritten around the residual's shape, or keep
the conservative 87× framing, is a judgement call for Chris and is deliberately
left open here.

**What would settle it.** More levels would, and there are none: @43 exceeds
2^53 exactly where the CRT anchoring product stops being exact (TODO item 1).
So the honest resolution is not more data but deciding which of the two
framings the note should carry.

## 7. Where capacity alone dies: the compounding window closes only to U = 30

*(Not from the bench. From the 2026-08-16 discussion of Chris's compounding
window. Parked here because it is a boundary fact about existing machinery,
not a plan.)*

**The construction (PROVEN, elementary).** The frontier lemma needs no
primality: stack every prime <= u, and any hole h with u < h < u^2 is prime,
because a composite h would have least prime factor q > u and hence h >= q^2.
This holds for every real u >= 1, verified at composite u = 9, 15, 21, 25, 27,
33, 35, 49, 91, 121. So the windows

  (u, u^2), (u^2, u^4), (u^4, u^8), ...

are DISJOINT, cover everything above u, and each is certified by the primes up
to its own lower endpoint. Covering [1, X] takes about log2 log X of them
against pi(X) overlapping zones, and every twin found in one is new. This
answers the zone's redundancy problem completely.

**But it moves no arithmetic (VERIFIED).** Slots and capacity both scale
linearly in a window's width, so their ratio depends only on the SIEVE DEPTH,
which is the window's lower endpoint. Measured cap/slots against the closed
form 2*sum_{7<=q<=U} 1/q: 1.542 vs 1.539, 1.958 vs 1.959, 2.329 vs 2.329,
2.621 vs 2.621 at U = 100, 300, 1000, 3000. The corridor, twins/slots, is
likewise a function of U alone, about 5*C2/ln^2 U = 3.301/ln^2 U. The factor 5
rather than 15/2 matters: the slot set sees only two of the three twin residues
mod 30, so counting all twins against it overstates the corridor by exactly 3/2.
Compounding is a better ledger, not a lever.

**The boundary, which is the point of this entry (VERIFIED).** The naive
capacity pigeonhole, survivors >= slots - (strikes counted with multiplicity),
actually CLOSES at small U and then dies for good:

| U | slots | capacity | certified floor | true twins |
|---|---|---|---|---|
| 20 | 24 | 18 | **6** | 11 |
| 24 | 36 | 32 | **4** | 14 |
| 26 | 43 | 38 | **5** | 16 |
| 28 | 50 | 45 | **5** | 16 |
| 30 | 58 | 54 | **4** | 20 |
| 32 | 66 | 69 | 0 | 20 |
| 36 | 84 | 87 | 0 | 25 |
| 50 | 162 | 201 | 0 | 46 |

So at U = 30 pure counting certifies at least 4 twin primes in (30, 900),
with no primality test and no strike located. From U = 32 onward the capacity
exceeds the slots and it never closes again, because 2*sum_{7<=q<=U} 1/q
passes 1 (it is 0.931 through q = 23 and 1.0002 once 29 joins).

**Why it matters.** U ~ 31 is the exact point where capacity alone stops being
enough and the overlap term becomes mandatory. Every attack past that point,
including the Pane Bound, must bound how many strikes land on already-dead
slots rather than how many strikes exist. This dates the transition precisely
rather than asserting it.

**Triage.** The crossing is governed by a Mertens sum, so it is a residue
statement and therefore free and classical, exactly as the triage rule
predicts. The interval content of the problem begins precisely where this
statement stops working, which is a tidy illustration of the rule.

## Reconfirmations

Results reached independently here, by a different
route from the one that first established them. None of these is new. They are
recorded because two independent derivations landing on the same object is the
cheapest evidence available that both are right, and because without this list
the next session will chase them again.

The pattern across the whole table is the triage rule at the top of this file
working exactly as stated: every reconfirmation below is a residue statement,
and every one of them fell out in an evening.

| what was re-reached | the route taken to reach it again | where it already lives |
|---|---|---|
| The grain census law: count(6) = ∏(q−4), the word rule that "6,6" never occurs, the forced ratio 8·count(6) = 3·count(12) | Instrument 1's per-fold multiplier column, read off the folding side | `research/grain-census.js` (2026-08-14), derived from the CRT side |
| φ(p#) = ∏(q−1) and the Euler product density | The mean removal spacing at each sieve step is exactly p, so a fraction (p−1)/p survives | `README.md` provenance list, as a 2020–2026 rediscovery |
| Infinitude of the primes | Density form: at any finite stage ∏(1−1/q) > 0, so survivors remain, so a new prime exists | Euler 1737; the framework's own version is Euclid-in-moiré in `GLOSSARY.md`, logged classical in `PRIOR-ART.md` |
| The Copying Theorem, (p−2) of p copies survive each fold | The mean kill spacing on a slot line is exactly p/2, since a fold strikes two residue classes | `GLOSSARY.md`, proven |
| Natal@5 carries exactly two thirds of every census, forever | Counted the birth-fold split at T5..T17 with `kernel.birthFold` | `GLOSSARY.md`: the three houses each carry one third forever |
| Houses 11 and 17 are mirror images, House 29 is self-mirror | The slot mirror axis at p#/2 − 1 maps 11 ↔ 17 and fixes 29 | `GLOSSARY.md`, stated as a fact; the axis explains why |
| The k-dimensional primes are the almost-primes | A number boxes into k factors exactly when Ω(n) ≥ k | Standard sieve theory; Chen 1973 restated is entry 5 above |
| Restricting to a sub-family to make survivors self-certifying | Asked whether discarding slots could make the pattern repeatable | `paper/anchored-note.md`: the Natal@5 comb, Lemma 3 (survivors exceed √W, hence are genuine twin primes), Proposition 2, the β programme |
| Changing the strike structure to attack the wall | Asked whether striking three residues instead of two would help | The productive direction is the reverse, decoupling two strikes into one: Brüdern–Fouvry vector sieve, `research/sift-limit-attack.md`, TODO item 0, missing Lemma V |

**Two things this list is evidence for, and one it is not.**

It is evidence that the framework is coherent: a fresh route through the
pictures reaches the same objects as the machinery did, without being steered.

It is evidence that the triage rule predicts well. Everything above is a
residue statement and everything above was cheap. Nothing on the interval side
of the line yielded anything all session, which is what the rule says to expect.

It is not evidence of anything new. The right reading is that the framework's
easy side is genuinely easy and was already fully worked, which is a fact about
the corpus rather than about any one session.

## Provenance

Everything in this file came out of one session on 2026-08-15, building and
playing with `web/bench/`. Entry 1 arrived about a minute after the mirror jump
button existed. That is the argument for the bench in `web/PROPOSAL.md` §3
working as intended, with the honest qualification that what it produced was
five sightings, one refutation, a set of reconfirmations, and no results.

Session ledger, for whoever picks this up next:

- **Built.** Four instruments on one kernel: `index.html` (grain census),
  `numberline.html` (strikes stacked, birth-fold filter, largest-gap jump, two
  render modes), `dimensions.html` (Ω), `uniquebox.html` (the strict reading).
  Kernel gained `birthFold`, `birthFoldWith`, `omegaUpTo`, `primePowersUpTo`,
  and a faster `topGaps`. Test vectors all pass.
- **Changed in the corpus.** `GLOSSARY.md`'s grain-census entry states the law
  and points at `grain-census.js`, which settled it. `web/PROPOSAL.md` act 8
  teaches the parity wall with boxes instead of an abstract two-pile colouring.
- **Open as a reading, with the position data already on record** (noted
  2026-08-20). At the two levels checked here the first maximal gap sits near
  the *start* of the tile, 2.43% in at 13# and 0.01% in at 19# — and those two
  figures are the `pos` column of `research/exact-g2-ladder.js` at x = 13 and
  x = 19 (731 of 30,030 and 659 of 9,699,690), which records the least
  attaining position at all fourteen custody levels. That column already says
  "near the start" does not survive: at 23# the least position sits 34% into
  the tile, at 29# 19%. For the one-class control the same question is
  answered in print — Gerbicz's table on A048670 publishes u(n) for
  n = 1..57, smallest starts = A049300. Attack 1 established that monster
  gaps migrate deep into the period; what remains is reading the recorded
  positions as an interval question, and the largest-gap marker in the number
  line is already the instrument for it. That is instrument 2 in
  `web/PROPOSAL.md` §3, and it is now the top of the bench queue.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
