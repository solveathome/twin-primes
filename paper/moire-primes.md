# Primes as Moiré Patterns: the Tile, the Family, and the Wall

*DRAFT v2, 2026-08-17. Sole author: Chris Benjaminsen (AI disclosure at
the end). Flagship paper (Paper I) of the suite
described in `paper/PAPERS.md`; technical detail deferred to Paper II (the
twin-Jacobsthal bound), Paper III (the exact variance), and Paper IV (data and
constructions). All computations reproducible from `research/` in this
repository; every table below is the embedded output of a script there.*

---

## Abstract

This paper presents a new framework and vocabulary over classical
sieve-theoretic objects — a new lens. Stack the periodic multiples of the
primes you know on the number line, and the positions untouched by every wave
form a repeating interference pattern: a moiré whose repeating unit we call
the **tile**, whose period is the primorial, and whose holes contain all
further primes. Developed from scratch as a six-year sequence of independent
rediscoveries (wheel factorization, Euler's and Schemmel's totients, the
Hardy–Littlewood twin constants, Fermat's factorization, and most of the
structural apparatus of Holt's cycle-of-gaps programme) and then audited
against the literature, the lens earns its keep by what it makes newly
speakable. We prove a spine of elementary structure theorems in its
vocabulary — among them an exact genealogy of twin candidates (every twin
opportunity at every scale descends from a single ancestral slot, through
exactly three immortal houses fixed at the second fold, with birth cohorts
whose demographic shares freeze forever), an Exact Invariance Lemma for the
fossil record each prime leaves in the pattern, and one new unconditional
theorem: **for every prime p ≥ 17 the interval (p, p²) contains two primes
whose distance is at most (p² − p)/(π(p²) − π(p) − 1)**, a quantity that
Rosser–Schoenfeld makes (2 + o(1))·ln p and that is already 2.00·ln p at
p = 1009. We verify the framework's census against reality through a
7.42-trillion-position count, survey the parity wall through five doors and four
faces, with the measured numbers behind each carried in the companion note, restate the Twin Prime Conjecture in the
framework's native form — *the Scour never achieves perfect local alignment
with the Grain* — and introduce the objects the lens found that our own
prior-art audit did not find in the literature: the twin Jacobsthal function
G₂, the exact two-class window variance, and the twin grain of the tile,
together with the difference map d ↦ G_d, whose closest published relative is
Ziller and Morack's paired Jacobsthal function h₂. A companion note (Paper
II) proves the first upper bound for G₂ at any exponent; a lower bound is
free and is likewise the first recorded, though it is nowhere near matching:
the band (2, 4.2665] between them is the problem this paper is about.

---

## 1. The lens

Take the number line and lay a wave of period 2 on it, striking every even
position. Add a wave of period 3, then 5, then 7. Each wave deletes its
multiples; what survives is the set of positions coprime to every stacked
prime — the *holes* of the combined pattern. Because the waves are periodic,
so is their superposition: the hole pattern repeats with period equal to the
primorial 2·3·5···pₙ, and every prime larger than pₙ must land in a hole,
forever. This is the sieve of Eratosthenes seen as interference — a moiré, in
the optical sense: simple periodic layers whose overlap produces structure far
more intricate than any layer alone.

The picture itself is not new, and we are precise about that at the outset.
Physicists have realized it literally: Petersen, Argüelles, Greenberg,
Kaminer, and Soljačić encoded the primes as intensity zeros of superposed
identical waves — "mimicking the sieve of Eratosthenes," twin primes
included — in *Physical Review Letters* 122, 090201 (2019). Jason Davies'
interactive visualization "El Patrón de los Números Primos" (2012, after Omar
E. Pol) made the same picture a small internet phenomenon; Jeffrey Ventrella's
*Divisor Drips and Square Root Waves* develops primes as the negative space
behind overlapping periodic patterns at book length. The algorithmic core — a
wheel whose circumference multiplies by p as each new prime joins — is the
sieve of Pritchard (1979; "Explaining the wheel sieve," *Acta Informatica* 17,
1982).

What is ours is the lens as a *system*: one metaphor family, one term per
object, and the discipline of asking every question in its vocabulary. The
repeating unit is the **tile** Tₚ (canonical alias: the primorial wheel mod
p#), of **width** |Tₚ| = p#. A new prime **folds** the tile — lays p copies
end to end, then strikes its two twin-forbidden residues through every copy.
Copies meet at **seams**; the tile is a palindrome (**the mirror**); each
prime leaves a permanent **stratum**; the twin opportunities form a
**family** with a literal genealogy; the primes that can destroy them form
**the Scour**; the spacing texture of the survivors is **the Grain**. None of
these objects is exotic, each has a classical shadow, and one other vocabulary
for the same system already exists: Holt's cycle of gaps, with its fusions, its
driving terms and its interval of survival, running since 2007 (§9). Ours
differs in what it points at. The questions this
paper answers (who are the family's founders? how deep is each prime's
stratum, and does it heal? is the Scour biased? where do the extremal gaps
live?) are not on his list and, as far as our audit found, on nobody else's
either.

One remark on provenance, because it shapes the paper's voice. The framework
was built between 2020 and 2026 in ignorance of the literature, as a private
research program (26 folders of self-contained browser experiments). Nearly
everything in §§1–2 turned out to be known, some of it since 1857, and most of
the structural apparatus of §§2–4 turned out to be Holt's, in print since 2007.
We regard that as the strongest available evidence that the lens *works*:
pointed at the number line, it reproduces Euler, Mertens, Hardy–Littlewood and
an entire parallel programme on empirical contact. The audit that established
what was known, and what was not, is summarized in §9 and given in full in
`research/PRIOR-ART.md`.

## 2. Tiles and folds: the spine

Write Tₓ for the tile at level x (all primes ≤ x stacked) and |Tₓ| for its
width. Four elementary theorems carry everything that follows.

**Redundancy Lemma (the kill image).** *When prime p folds the tile, the
positions it strikes that were not already struck are exactly p × (the
previous hole set) — a p-times-magnified copy of the tile's own hole pattern.
In particular the first new strike is at p·1 = p (the prime striking itself
as a candidate), the second at p², and one period of the new tile contains
exactly φ(previous width) new strikes.*

*Proof.* A multiple m·p is newly struck iff m is coprime to every earlier
prime, i.e. iff m is a hole of the previous tile. The smallest holes are 1 and
p itself (every integer in between has a prime factor < p), so the new
strikes begin at p, fall silent, and resume at p². Per period there are
φ(previous width) holes m in range, hence that many new strikes. ∎

The counts 1, 1, 2, 8 of new strikes per period — measured in this project's
`modifiercount.txt` years before the lemma was stated — are φ(1), φ(2), φ(6),
φ(30). The lemma says each fold deletes a scaled self-image: the moiré eats
copies of itself. This is classical in effect (it is why Eratosthenes starts
crossing out at p²), but the self-image phrasing is what later makes
crystallization, the strata (§4), and the gap decoupling (§8) transparent.

**Crystallization Lemma (the frontier).** *In Tₓ, every hole in (x, p²ₙₑₓₜ)
is prime and every twin slot there is a real twin-prime pair; no later prime
ever strikes below its own square. Territory below the frontier p²ₙₑₓₜ is
final: possible = actual, permanently.*

*Proof.* A composite c below the frontier has a prime factor ≤ √c < pₙₑₓₜ,
hence ≤ x, hence is already struck; by the Redundancy Lemma each later prime
q first strikes anew at q². ∎

We verified "possible = actual below p²" computationally at eight levels out
to p = 9973 with windows to 10⁸: `equal=true`, 8 of 8
(`research/04-crystallization-and-hl.js`). The moiré *crystallizes outward*;
the quiet stretch (p, p²), where the newest prime has struck exactly once, at
p itself, is **the zone**, and the entire Twin Prime Conjecture lives
there (§6). Holt names the same interval the *interval of survival* and its
upper edge the *horizon of survival* (arXiv:2603.25915); the two vocabularies
are describing one object.

**Copying Theorem (the census).** *A twin slot is a position r with r and
r+2 both holes. Writing Dₓ for the census — the number of twin slots per
tile — each fold by p lifts every slot to p copies, of which exactly 2 die:*

> *Dₓ = ∏₍₂<q≤x₎ (q−2), and per fold: (p−1)·D new copies created, exactly
> 2·D destroyed.*

*Proof.* Folding tiles the old pattern p times, so each slot r lifts to
r + j·(old width), j = 0,…,p−1. The old width is invertible mod p, so the p
lifts occupy each residue class mod p exactly once. Exactly one lift lands in
r ≡ 0 and one in r ≡ −2 (mod p) — distinct classes for every odd p — and the
fold kills those two copies and no others. ∎

The count ∏(q−2) is Schemmel's totient (1869) at the primorial and OEIS
A059861 (§5); the survival factor (p−2)/p per fold is the local factor of the
Hardy–Littlewood twin constant (1923). The moiré computes, fold by fold, the
combinatorial heart of the standard conjecture π₂(x) ~ 2C₂x/ln²x. The theorem
itself is Holt and Rudd's Theorem 2.3 (arXiv:1408.6002), where the same CRT
argument shows that each possible closure of adjacent gaps occurs exactly once,
and the twin case is their N₂(p#) = ∏(q−2); §9 records the correspondence in
full.

**Theorem (Euclid, ~300 BC, moiré form).** *There are infinitely many
primes.*

*Proof.* Suppose x were the largest prime and build Tₓ. The tile has holes
besides 1 — the mirror guarantees it: if r is coprime to the width W, so is
W − r, so the pattern is a palindrome whose edge W − 1 always survives. Any
hole r > 1 is coprime to every prime ≤ x, so its smallest prime factor
exceeds x: a prime larger than the largest prime. ∎

The subtlety is that the hole need not be prime — and usually isn't:
210 − 1 = **209 = 11 · 19**, and 30030 + 1 = 30031 = 59 · 509. Only its
*factors* must be new, and that is all the contradiction needs. Euclid's own
construction is literally p# + 1: the edge of the mirror, surviving by
symmetry, not by trick. And the same table shows why twins are harder: the
edge *pair* (W−1, W+1) is a twin slot at every level forever, but the escape
hatch was "prime *or* has a new prime factor," and a pair needs both members
actually prime. At p = 17 the edge pair factors as 510509 = 61·8369 and
510511 = 19·97·277 — the pair structure shatters. Singles have an escape
hatch; pairs do not. That asymmetry is the difference between a
2300-year-old theorem and an open conjecture, visible in one line of
factorizations.

## 3. The family: a complete genealogy of twin opportunities

The Copying Theorem says slots multiply; the lens asks *who begets whom*. The
answers turn out to be exact, verified, and — as far as the audit could
find — never before stated.

**No orphans.** If r and r+2 avoid all primes ≤ p, they avoid all primes
< p: every twin slot of every tile reduces, mod any earlier width, to a twin
slot of that earlier tile. No lineage is ever born after the beginning. We
verified this at four levels (zero orphans among 1,638 slots checked;
`research/genealogy.js`): the entire twin population of every tile, forever,
is **one family**, descending from the single ancestral slot (5,7) of T₃ —
the wrap pair straddling the seam of the six-wide tile, created by the
interference of 2 and 3 alone. (The 6k±1 template that every twin pair wears
is pure @2×@3 moiré.) The ancestor itself dies at the very next fold — 5
strikes position 5, the prime consuming itself as a candidate — the ancestor
dies giving birth.

**The Seam Lemma.** *After a fold, adjacent copies meet at seams k·(old
width), and every seam carries the pair (kP−1, kP+1) — twin slots by the
mirror. Each fold kills exactly 2 seam pairs and p−2 survive.*

*Proof.* kP mod p sweeps every residue class exactly once as k does (P
invertible mod p); the pair dies iff kP ≡ +1 or −1 (mod p) — one k each. ∎

Verified at six levels: survivors 3, 5, 9, 11, 15, …, 35 for folds 5 through
37, always exactly p−2 (`research/verify-ladder.js`). The Seam Lemma is the
Copying Theorem restricted to the **edge lineage** — the branch of the family
that keeps the seam address.

**The three houses.** T₅ is the unique tile fully crystallized at birth: its
width (30) is smaller than its own frontier (49), so all three of its slots —
(11,13), (17,19), (29,31) — are certified real twin primes the moment they
exist, immortal by theorem. They are the family's complete and final
aristocracy. **House 11** and **House 17** are mirror images of each other
(the palindrome maps 11 ↔ 17 in T₅); **House 29** is self-mirror — it *is*
the edge, ≡ −1 mod 30, owner of every seam pair at every level forever. The
Copying Theorem's uniformity makes the inheritance exact: **each house
carries precisely one third of every census, forever.** Of T₃₁'s
6,226,553,025 slots, exactly 2,075,517,675 descend from each founder. For
contrast, T₇ is the first tile containing *mortal* slots: (167,169) will be
executed by 13 — at 169 = 13², the first stratum kill in twin history — and
(209,211) falls to 11.

**Birth cohorts, with closed forms.** Each fold p, the edge slot bears its
p−2 children: one remains the edge (the wrap), and p−3 *graduate* into the
interior as that fold's genuine newborns — the interior seam pairs.
Everything else is copies. This yields an exact decomposition of the census
by creation fold, telescoping with the Copying Theorem via 1 + (p−3) = p−2:

> Dₓ = 1 + Σ₍₅≤p≤ₓ₎ cohort(p) · Dₓ/Dₚ,  cohort(5) = 2, cohort(p) = p−3
> (p ≥ 7),

and a slot's birth fold is readable directly off its residue (its
seam-address depth: born at fold p iff ≡ −1 mod the previous width but not
mod the new one). We classified every slot of T₁₃ and T₁₇ by this rule:
every cohort exact (990/396/88/10 + edge at T₁₃; 14850/5940/1320/150/14 +
edge at T₁₇; `research/birth-cohorts.js`). The demographic consequence is
striking — shares freeze at birth (a corollary of the Exact Invariance Lemma
of §4): share(@p) = cohort(p)/Dₚ forever. At T₃₁:

| born at | count | share |
|---:|---:|---:|
| @5 | 4,151,035,350 | 66.67% (= 2/3, frozen) |
| @7 | 1,660,414,140 | 26.67% (= 4/15) |
| @11 | 368,980,920 | 5.93% (= 8/135) |
| @13 | 41,929,650 | 0.67% |
| @17 → @31 | 4,192,964 | < 0.07% |
| eternal edge | 1 | — |

Sums to 6,226,553,025 exactly. Two-thirds of every twin opportunity that
will ever exist was born at the second fold; Houses 11 and 17 never absorb a
birth (they grow purely by copying); House 29 is the womb — every newborn
from fold 7 onward arrives inside the edge house, and the births exactly
compensate its graduations, holding it at one third.

The asymptotic growth of the whole family is governed by a named constant:
Dₓ ~ |Tₓ| · (2C₂e^{−2γ})/ln²x with 2C₂e^{−2γ} = 0.41621…, the twin-prime
constant married to Euler's; the measured convergence runs 0.3253 → 0.4007 →
0.4150 at x = 13, 97, 9973 (`research/genealogy.js`).

## 4. The geography: strata, the Unification Law, the Grain

**Strata and the Exact Invariance Lemma.** The Redundancy Lemma's kill image
p × (holes) has a *head*: its densest part, landing exactly at p². Each
prime therefore digs a dent — a **stratum** — into the band [p², 2p²] of its
own tile. The lens asks: does the dent heal, deepen, or persist under later
folds? The answer is an identity:

**Exact Invariance Lemma.** *The in-period depth of any band of the tile —
its slot density relative to the tile average — is exactly invariant under
folding.*

*Proof.* Every slot's p lifts lose exactly 2 (Copying Theorem), so every
band's total scales by exactly (p−2), the same factor as the census; all
ratios are frozen. ∎

Two agents in this project derived this independently, and the measurements
obey it to the last slot: prime 17's stratum measures 0.714 of the mean band
at level 19 *and* 0.714 at level 23 (0.17th percentile among all same-width
bands); 19's stratum (0.639) is the single most depleted band of its width
in the entire 223-million-position T₂₃ (`research/fossil-shadows.js`,
`attack2-02-08-tomography.js`). The pattern is an archaeological record:
every prime's ignition leaves a permanent, copied-forever stratum, its depth
fixed at birth. (For small primes ≤ 13 the "stratum" is three or four
individual kills and layout luck dominates — 11's band is actually enriched;
the statistical law begins at p = 17. Consecutive strata overlap, since
p²ₙ₊₁ < 2p²ₙ for close primes, so measured dents stack to 0.64–0.71.)

**The Unification Law.** The birth depth itself, and every other positional
density phenomenon we measured, turns out to be one curve. Let u = ln
(position) / ln (level). Then the local twin density relative to the tile
average follows

> ρ(u) = e^{2γ}/u² for 1 ≤ u ≤ 2, continuing as the pair-Buchstab square
> (e^γ·ω(u))² on 2 ≤ u ≤ 3, pinned to 1 beyond,

derived independently by two routes in this project (Hardy–Littlewood +
Mertens on one side; the strata calculus on the other) and verified to ~1%
at every grid point tested (`research/attack2-05-07-integral-ladder.js`,
`attack2-03-09-depth-formula.js`; the derivation is Hardy–Littlewood-
conditional). One curve explains: the head cap e^{2γ} ≈ 3.17 (a fixed window
[0,x) is at most that much enriched, peaking near u ≈ 1.2 and *falling back
to zero* as the level approaches x — an earlier "divergent enrichment"
reading of ours, refuted by our own follow-up); the zone-edge trough
e^{2γ}/4 = 0.79305 at u = 2 (measured 0.788 at 10⁸; the twin analogue of the
classical Mertens-vs-PNT factor e^γ/2, explicit in Táfula arXiv:1508.05702);
the band just past every frontier sitting at ≈ 0.85 of fair share (the
curve's first-octave average — a phenomenon we briefly believed was a
separate object); and the empirical law that cumulative fairness locks in
once positions exceed p³. Fresh stratum depths match the curve's band
average to three decimals by p = 4999 (0.827 = 0.827).

**The Grain.** The tile's fine texture — the ordered sequence of gaps
between consecutive twin slots — is the **Twin Prime Grain**. T₇'s grain
reads 6,12,12,18,12,30,6,30,12,18,12,12,6,12,12. It is deterministic and
fold-recursive: copy p times, then merge the two gaps flanking every kill,
which is the pair version of the gap-merge rule this project tabulated for
single holes in 2024 (`jumps.txt`). The single-hole gap word is OEIS A049296,
and the single-hole recursion and its closure theorem are Holt and Rudd's
(arXiv:1408.6002, Lemma 2.1 and Theorem 2.3); what follows is its two-class
form. The
grain is mirror-symmetric about the tile's center (offset −2); its size
distribution (T₁₁: 6×21, 12×56, 18×22, 24×6, 30×22, 36×4, 42×4) awaits a
law; behind the frontier the grain is the literal spacing of real twin
primes. The twin gap word appears absent from OEIS. Its maximum is the
subject of §8.

**House-blindness.** The geography is fair between the houses: every
remover prime is coprime to 30, so CRT forces its strikes to spread across
the three houses in exact proportion. Measured on the full T₁₃ ledger: kill
rates 68.7% / 69.3% / 69.9%, survivors 155/152/149 (`research/`, two-moiré
addendum). The Scour cannot preferentially hunt a house — which closes, by
arithmetic, one family of would-be shortcuts (§7, door four).

## 5. The census against reality

The census Dₓ = ∏(q−2) has a pedigree we can now cite precisely: the
sequence is OEIS **A059861**, created by Labos Elemer (2001) with the
Hardy–Littlewood context and the gap-count interpretation already attached;
the recurrence a(n) = a(n−1)(p−2) was added by A. H. M. Smeets (2019), the
exact gcd-census definition by Greg Tener (2021), and a determinant identity
by Alexander Adamchuk (2006). The underlying function is Schemmel's totient
(1869) — the pair-analogue of Euler's φ, one lower in each factor; the
periodicity of such patterns was remarked by H. J. S. Smith in 1857, per
Dickson's *History* (we cite Dickson, not Smith: the primary item is one we
have not held). This
project re-derived all of it blind — the multiply-by-(p−2) rule appears in
the original 2024 notes — and then did the one thing the b-file cannot do:
checked the formula against the raw object.

| tile | width | census (counted) | new seams | survived |
|---:|---:|---:|---:|---:|
| T₅ | 30 | 3 | 3 | 0 |
| T₁₃ | 30,030 | 1,485 | 11 | 1,474 |
| T₂₃ | 223,092,870 | 7,952,175 | 21 | 7,952,154 |
| T₂₉ | 6,469,693,230 | 214,708,725 | 27 | 214,708,698 |
| T₃₁ | 200,560,490,130 | 6,226,553,025 | 29 | 6,226,552,996 |
| T₃₇ | 7,420,738,134,810 | **217,929,355,875** | 35 | 217,929,355,840 |

Every row is a direct count — T₅ through T₂₃ by full materialization, T₂₉
through T₃₇ by a mod-30 lattice scan (10× compression, 57× faster than raw;
`research/verify-ladder.js`, `verify-ladder-big.js`) — and every row lands
exactly on ∏(q−2). The last line deserves its sentence: 7.42 *trillion*
positions were scanned in 54 minutes, and the count landed to the digit on
**217,929,355,875** — a number first written in this project's notes in 2024,
derived by hand with the multiply-by-(p−2) rule, two years before any
hardware checked it. The census also decomposes, per §3, into each fold's
p−2 newborn seam pairs plus the copies of all previous stock: the family's
wealth is almost entirely inheritance, compounding at (p−2) per fold, with
the seams contributing a thin but never-failing trickle of newcomers.

## 6. The zone and the theorem

**Zone Equivalence Proposition.** *There are infinitely many twin primes iff
the zone (pₙ, p²ₙ₊₁) contains a twin prime for infinitely many n.*

*Proof.* (⇐) Zone twins exceed pₙ. (⇒) Any twin pair (t, t+2), t prime,
lies in the zone of the level just beneath it: with pₙ the largest prime
< t we have pₙ < t and p²ₙ₊₁ = t² > t. ∎

Logically lightweight — we present it as a framing device — but not found as a
stated biconditional, searched under twin-Legendre and under no other
convention, since `research/SEARCH-CONVENTIONS.md` §1 carries none for the
biconditional form; read that negative as our framing rather than as a
calibrated search. It converts the conjecture into a
question about one specific, *anchored* window per level. Everything
measurable about that window we measured (`research/01`, `02`, `04`): the
zone is never starved (supply ~ 2C₂p²/ln²p; 437,987 real twins in the zone
of p = 9973); the naive fair-share model is biased exactly as the
Unification Law predicts (ratio drifting to e^{2γ}/4); against the
Hardy–Littlewood-corrected prediction the deviations are square-root sized
((act−HL)/√HL within ±1.1 at every computed level — the discipline RH asserts for
single primes, observed for twins, an object with no zeta function to its
name); and the margin is grotesque — the first twin after pₙ = 5,242,883
sits 84 above it while the zone extends to 2.7 × 10¹³.

And the framework proves something unconditional about pairs in every zone:

**Theorem (pigeonhole small-gap).** *Let p ≥ 17 be prime and put
K := π(p²) − π(p). Then the interval (p, p²) contains two primes q < q′ with
q′ − q ≤ (p² − p)/(K − 1), and that bound is (2 + o(1))·ln p as p → ∞.*

*Proof.* By crystallization the holes of (p, p²) at level p are exactly its
primes, K of them, so pigeonhole forces two consecutive ones at distance
≤ (p²−p)/(K−1). Rosser–Schoenfeld's explicit bounds give K ≥ p²/(2 ln p) −
1.26p/ln p for p ≥ 17, whence (p²−p)/(K−1) = (2+o(1)) ln p. ∎

The hypothesis p ≥ 17 is where the Rosser–Schoenfeld input holds in the form
used, and the o(1) is a statement about the limit rather than about any single
p, which is why the theorem is stated in the finite form first.

The certified constant is already 2.00 at p = 1009 (`research/attack-08`).
The statement does not follow from the bounded-gaps theorems: Zhang (2013)
and Maynard–Polymath produce pairs at distance ≤ 246 *infinitely often,
somewhere* — constitutively unable to say in which windows — whereas this
bound holds in every specified zone. Reality achieves distance 2 in every
zone we tested; we certify 2 ln p. **The Twin Prime Conjecture is the
removal of one logarithm from an elementary bound.**

## 7. The wall, surveyed: five doors

Why can't counting finish? The obstruction is the *parity problem* (Selberg
1949; Tao 2007): sieve-type arguments cannot distinguish numbers with an odd
number of prime factors from an even number, hence cannot lower-bound
populations defined by exact primality of both members. What this project
adds is a *surveyed perimeter*: five routes to the same wall, each carried as
far as it goes, each meeting the wall at a different door, and each with the
toll measured.

Door 1 is Legendre's budget (3ⁿ), Door 2 the Fourier budget (2ⁿ), Door 3 the
moment ceiling, Door 4 the removal ledger, and Door 5 coverings and
constructions. They are not
independent of each other and they do not all fail at the last step. Door 1 and
Door 4 are the same classical object at two truncation depths: the union bound
of Door 4 is the first line of Brun (1919), and Door 1's budget is what Brun's
truncation tames. Doors 1, 3 and 5 do run to a final inequality, while Door 2
fails structurally at x = 11 and Door 4 reverses on the numbers before any
limit is taken. Naming where each route actually stops is the point of the
survey, so each door is given in three parts, with the calibration of each part
stated separately: the *mechanism*, the *toll*, and *where it stops*. All five
are worked out at that grain in `paper/wall-note.md` §1, which holds every
number this section rests on, including Door 2's retraction and Door 5's
unpriced gap. A door is a route and never a result, so no door may be cited for
a number except through its toll, and a toll always carries the levels it was
measured or certified at.

The survey's conclusion is the conjecture's native form. The Grain (built by
primes ≤ x) and the Scour (built by primes in (x, √width]) come from
disjoint prime alphabets, so they are *exactly* independent (CRT): aggregate
alignment is arithmetically impossible, and the guaranteed misses are
counted, exactly, in the joint tile — an object ~10⁷³ wide already at
x = 13, of which the window we care about is a ~10⁻⁶⁹ sliver. "Misaligned on
average" is a theorem. "Misaligned in every window" is the conjecture:

> **The Scour never achieves perfect local alignment with the Grain.**

### 7A. The wall, located: four faces with coordinates

*(Section added 2026-08-15, folding in the natal-cap campaign. The five doors
above are routes: each one walks up to the wall and stops. This section
reports what the campaign found when it stopped walking and started measuring
the wall itself. Each face is a place where the obstruction sits, with
the price of passage in numbers we can regenerate. The faces are not disjoint
from the doors and we say so rather than let a reader discover it: Face 2's
X-channel is Door 4's overlap credit measured as a fluctuating quantity, and
Face 2's closing certificates are Door 3's moment ceiling in a different
ensemble, the rotation ensemble rather than the window ensemble. Calibration is
marked throughout the note, and the campaign's refutations, including four
reversals of our own earlier readings, stay visible there.)*

**What the four faces have in common.** They are one wall. Face 1, the anchored
bias, says the conjecture is the positivity of a computable number; Face 2, the
overlap channel, says that number is decided in a channel pair methods cannot
see; Face 3, certificate depth, prices what history-blind counting can buy,
which is every finite level and no limit; Face 4, the exponent, says the one
route with a finish line needs an unproven cancellation law for the sawtooth,
not a distribution hypothesis. The framework's claim on this chapter is not that any
face is close to falling. It is that each face now has coordinates, so that a
future attempt can be aimed rather than argued.

The four faces are worked out in `paper/wall-note.md` §2: β at ten levels and
the two sufficient statements it carries, the X-limitation theorem with the
levels it is proven at, the K* ladder with the moduli pool it was measured on,
and the exponent band with the theta ladder's ceiling beside it.

## 8. New objects and open questions

**The twin Jacobsthal function G₂ — the coarsest grain.** G₂(n) is the
largest cyclic gap between twin slots in the tile. Computed exactly through
T₃₇ (7.4 trillion positions; the census self-check matched 217,929,355,875
exactly):

| pₙ | 5 | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 |
|---|---|---|---|---|---|---|---|---|---|---|
| G₂ | 12 | 30 | 42 | 66 | 108 | 150 | 204 | 258 | 348 | 528 |
| G₂/p²ₙ₊₁ | 0.24 | 0.25 | 0.25 | 0.23 | 0.30 | 0.28 | 0.24 | 0.27 | 0.25 | 0.31 |

The sequence is published: it is **OEIS A144311 + 1** (Carter, September 2008,
22 terms), which carries G₂ − 1 in wording that uses none of our words. Five
waves of exact-term searches missed it by never shifting the ladder; see
`research/SEARCH-CONVENTIONS.md` §2 and `research/PRIOR-ART.md`. Our own
submission draft is a duplicate and must not be sent. If G₂(n) < p²ₙ₊₁ − 2
infinitely often, TPC follows (crystallization + Zone Equivalence), and the
worst gap anywhere runs at a quarter of the zone width across the computed
ladder.

The growth exponent is not determined by this ladder, and we quote it with the
control that shows why. A power fit in pₙ over the ten usable terms returns
1.801 ± 0.074; the same
estimator on 58 terms of the one-class Jacobsthal function, whose exponent is
1, returns 1.282 ± 0.008 with white residuals and no drift. Correcting for that
bias gives 1.54 ± 0.09 here and 1.57 ± 0.06 on the 19 terms of the dominating
h₂: central estimate **1.57, practical bracket 1.3 to 1.9**, floor 1 by
h₂ ≥ h, with exponent 2 disfavoured by the one-sided direction of the bias
rather than excluded (`research/exponent-control.md`). *(Update, 2026-08-21:
the fit has since been re-run on all 22 trusted terms of A144311, x ≤ 79,
against the 64-term control: raw 1.777 ± 0.029, corrected central
**1.50 ± 0.05** statistical with the systematic unquantified, practical
bracket 1.3 to 1.8; h₂'s 1.57 ± 0.06 is unchanged, its ladder did not
extend. The ten-term figures above stand as this draft's original record;
`research/exponent-control.md` §5.)*

The closest published object is Ziller–Morack's paired
Jacobsthal function h₂ (all even differences, for-all-n hypothesis,
conjectural; OEIS A288815) with G₂ ≤ h₂ level by level (348 vs 570 at 31#).
For one omitted class per prime Iwaniec (1978) proved the ln²q bound, which is
exactly the critical exponent, because the linear sieve's sifting limit
happens to be 2; for two classes **no upper bound was published at any
exponent** (FKMPT's Remark 7 expressly fences their machinery to dimension
one). The dimension-2 sieve's sifting limit is β₂ = 4.26645…, and Paper II
proves the corresponding first bound, G₂ ≪ (log q)^{4.2665+ε}, on sieve input
verified line by line against the primary source. The bound is now two-sided:
twin slots are a subset of the same tile's holes, so G₂(x#) ≥ g(x#) pointwise
and Rankin–Pintz–FGKMT transfers unchanged, giving
G₂ ≫ x·log x·logloglog x/loglog x (`research/two-class-lower-bounds.md`), per
the audit the first lower bound of any kind for a two-class Jacobsthal
function. The open band is (2, 4.2665]. Meanwhile the gap data forces a
decoupling: the extremal gaps migrate *deep* into the period (34% in at
23#), while the zone only ever inherits the frozen gap structure of actual
twins; bounding G₂ globally is sufficient for TPC but far from necessary.

**The difference map d ↦ G_d.** Pair patterns for even difference d follow
the Hardy–Littlewood density hierarchy exactly (d = 6 twice as rich as
d = 2), but the extremal gaps do not follow density — and do not follow any
bounded invariant of d we tested. An apparent 2-adic law at 19# (G₈ = G₁₆ =
198 vs G₂ = G₄ = 150) dissolves at 23# (G₄ = 186 < G₂ = 204 < G₈ = 210 <
G₁₆ = 264); after density normalization the hardest differences are the
*dense* ones (d = 6 tops the table). Only the full residue tuple of d
appears to determine G_d; every difference obeys the same Θ-growth law as
d = 2; and d = 2 is comparatively easy both ways, mid-pack on the raw gap at
rank 33 of 105 but in the bottom fifth once normalized for density, at 85 of 105
(`research/attack-06`, and `research/attack-06b-difference-map.js` for the
normalized ranks and the 23# dissolution).

**The exact two-class variance and its scaling law.** The twin-slot pair
correlation factors over primes (ρ_p(d) = p−2, p−3, p−4 as d ≡ 0, ±2, else
mod p), giving the window-count variance *exactly*; verified against brute
force to 10⁻⁶, and yielding certified statements like "≥ 99.87% of all
zone-length windows in T₉₇ contain a twin slot." The counts are sub-Poisson
at every computed level and window exponent — but our own early reading of a
universal constant ≈ 0.2 was refuted by deeper computation: Var/E drifts
(0.251 → 0.321 at zone scale) and the stable structure is the scaling law
ln(Var/E) ≈ −(0.24u² + 0.13u) in the window exponent u, with the limit's
existence posed as the open question (Paper III).

**The seams as hotspots, and the exact size of the effect.** Every seam pair
(kP±1) automatically avoids all primes dividing P, so against a *random
position* its Hardy–Littlewood twin likelihood is boosted by
E(P) = 2·∏₍p|P, p>2₎ p/(p−2), a prediction we verified to 0.2–0.6% across
four primorials and hundreds of thousands of seam twins (10× at P = 30 up to
20× at P = 30030). The baseline is the whole content of the statement. Against
a random *twin slot* the seam is not enriched at all: the boost is exactly the
slot-density factor and nothing more, so a seam position is about 25× more
likely than average to be a slot and no more likely than average to carry a
twin prime. Seam neighbourhoods at half-widths 300 to 3·10⁵ measure 1.016,
0.980, 1.007, 0.986 times the tile mean at T₂₃, against one control offset each
(`research/fold-profile-12-anatomy-survival.js`). The 400-control version is a
separate run, `research/fold-profile-13-hotspot-sweep.js`, which exists to close
exactly that gap: at T₁₉ and T₂₃ it puts the seams within −1.41 to +0.13
standard deviations of the control mean, every cell consistent with the null.
The two extremes are different tiles at different half-widths, T₁₉ at 3,000 and
T₂₃ at 30,000, so that pair is a range over six measurements and not a trend.
The enrichment is also a *point* phenomenon at the mirror
edges rather than a neighborhood one (seam-anchored windows measure
1.002 ± 0.005, a prediction of ours the data corrected); the seam-hierarchy
copy-law is
exact to four decimals at every depth; and the min-k seam ladder is OEIS
A060256 — extant but formula-less; our derived growth scale is contributable
(`research/attack2-01-06-seam-census.js`, `attack2-04-10`).

**Open questions the lens raises.** (i) Formalize anchored versus random
windows — the zone is not a random window, and every moment statement
averages over positions; the head's three-phase life (fair, trough, capped
rise and fall) is measured and Unification-Law-consistent but the anchored
lower bound is exactly what Door 4 lacks. The anchored tile's z-score within
its own rotation ensemble diverges, from +1.05 at x = 7 to −22,633 at x = 37
across the nine levels where the ensemble variance is certified
(`research/natal5-variance.js`, `research/natal-cap-33-overnight.js`), so the
anchored escape is a measurement and not a caveat; and the real tile is
*quieter* than its ensemble on the per-prime strike variance, at 0.34 to 0.62×
ensemble ("the anchored calm"). The campaign found the tile quieter or luckier
in four places and exact control dissolved three of them, leaving that one
sighting (`research/NATAL-CAP-CAMPAIGN.md`, with the calibration of every part
in `research/anchored-calm.md`). We expected the calm to
help and it does not: its mechanism is now proven, the anchor's two
strike classes being mirror-adjacent and gluing into a single cyclic window,
and the calm is uncorrelated with survival, corr(VR, S) ≈ 0 at all three
exactly enumerated levels (`paper/wall-note.md` §2, Face 2). (ii) The Var/E
scaling-law limit (Paper III's open question). (iii) The two-class Erdős–Rankin problem: how
long an interval can the *unshifted* Scour classes actually cover
(Paper IV's experiment). *No literature exists for the unshifted pair specifically, searched against arXiv:2302.00459, which owns the nearest
published result: Kalmynin and Konyagin's multi-class Erdős–Rankin
construction, Izv. Math. 88:2 (2024) 225–235, which bounds a shift of the
value and not of the argument.*

Three questions this section posed in earlier drafts have since been
answered by the record and moved to results: the grain census law is derived
and digit-exact (`research/grain-census.js`); the rich vein is solved (a T₁₁
ceiling plateau, `research/attack2-rich-vein.js`); and the Labos d=2/d=4
coincidence is proven, with an explicit bijection
(`research/d2-d4-bijection.md`).

## 9. What was rediscovered, and what wasn't: the audit

Four literature sweeps (full tables with links in `research/PRIOR-ART.md`;
coverage limits documented there). The largest finding comes first, because it
governs how the rest of this paper should be read.

**The framework has a predecessor, and most of §§2–4 belongs to it.** Fred B.
Holt, with Helgi Rudd on the earlier work, has run a programme since 2007 on
the same object under different names: about fifteen manuscripts, listed at
primegaps.info, with code and data at github.com/fbholt/Primegaps-v2. The
correspondence is close enough to be stated term by term. His *cycle of gaps*
G(p#) is our tile; his recursion R1/R2/R3 (identify the next prime, concatenate
p copies, close adjacent gaps; arXiv:1408.6002 Lemma 2.1) is our fold; his
*fusions* are our kills; his Theorem 2.3, that each possible closure of
adjacent gaps occurs exactly once by CRT, carries our Copying Theorem and
Redundancy Lemma together; his N₂(p#) = ∏(q−2) "Twin Generators" is our
census; his transfer matrix with binomial eigenvectors (1408.6002 §5, 2014) is
the histogram operator this project later built; and his *interval of survival*
Δ-H(p_k) = [p_k², p_{k+1}²] with its *horizon of survival* p_{k+1}² is our zone
and our crystallization frontier. He also recovers Hardy–Littlewood
Conjecture B from the tile structure (1408.6002 §6).

We reached these structures from the corpus and from first principles between
2020 and 2026 without knowing the programme existed, and we found it by
searching before publishing rather than before working. Independent arrival is
the credential; priority is his, and we cite it. Two further chains close the
same way. The tile *as a proof technique* is Maier's matrix (Maier 1985,
exhibited explicitly by Granville and Soundararajan, Annals 2007,
arXiv:math/0406018), which selects a primorial and works with the integers
coprime to it, and Maier's theorem is an irregularity theorem at exactly our
window scale: for Φ(x) = (log x)^λ with λ > 1 the primes in intervals of that
length are not uniformly distributed, and our zone width x² is (ln W)², the
case λ = 2. The survival curve this project measured and proved to be a
function of u = ln W/ln y alone is Buchstab's ω(u) (computed by Cheer and
Goldston, Math. Comp. 55, 1990), which is the analytic input to Maier's
theorem. So the function governing our folds is the engine of the theorem that
limits what any uniformity heuristic may assume at our window width.

The boundary, drawn sharply against the full corpus (fourteen arXiv manuscripts
read in full text, plus the repository; the 2022 book *Patterns among the
Primes* is not on arXiv and is not yet checked). Across all of it the word
"twin" appears only as motivation, as the population ∏(q−2), and in twin-count
estimates. **Holt never studies the spacing between consecutive occurrences of
the gap 2.** That spacing is our G₂, his machinery is bounded by |s| < 2p₁
throughout, which is the regime a maximum gap leaves, and no upper bound on a
maximum gap appears anywhere in the corpus. His arXiv:1402.1970 §4 tabulates
the one-class maximum gap h(p#) = A048670, records the empirical h(p#) ≈ 2p_{k−1},
and gives a constructive lower-bound technique; placed beside our ladder it
prices the second residue class directly, the ratio G₂/h running 2.0, 3.0, 3.0,
3.0, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00 at x = 5 through 37 without settling.
One warning travels with the correspondence: his Legendre result
(arXiv:2603.25915 Theorem 3.3) rests on his Conjecture 2.1, "approximate
uniformity", which is stated as a conjecture supported by samples, and which is
the hypothesis Maier's theorem breaks for the analogous prime statement.

With that established, the rest of the audit:

* **Classical, cited, not claimed:** the wave/superposition framing
  (Petersen et al. 2019; Davies/Pol 2012; Ventrella); the growing wheel
  (Pritchard 1979, 1982); the wheel as a matrix and as a proof technique
  (Maier 1985; Granville–Soundararajan 2007); crystallization (the p² rule,
  and Holt's horizon of survival); the census
  (Schemmel 1869; A059861: Labos 2001, Adamchuk 2006, Smeets 2019, Tener
  2021; periodicity per Smith 1857; Holt's N₂(p#); the "Sieve of Twins" of
  Grob–Schmitt, arXiv:1905.03117, and Grob alone, arXiv:2107.06950); the fold recursion, the
  fusion mechanism, the closure theorem, the transfer operator, the
  population models and the interval of survival (Holt and Rudd, 2007–2026);
  the survival curve ω(u) (Buchstab; Cheer–Goldston 1990); Euclid variants
  (Meštrović's survey);
  the empirical Hardy–Littlewood tradition (Brent 1975; Nicely; tables to
  10¹⁹); the one-class Jacobsthal function (Erdős 1962; A048670), Iwaniec's
  ln²q bound (1978) and the FGKMT lower bounds (2018);
  one-class window variance (Hausman–Shapiro 1973; Montgomery–Vaughan 1986)
  and the one-class rough-count discrepancy ΔΦ (Holt, arXiv:2308.07570);
  covering systems (Hough 2015; BBMST 2022); the parity problem (Selberg
  1949; Tao 2007).
* **Known but obscure:** the wheel palindrome (a passing line in standard
  references); the constant e^{2γ}/4 (Táfula arXiv:1508.05702; mechanism in
  Hardy–Littlewood 1923); the seam ladder (A060256, formula-less).
* **Closest prior art requiring differentiation:** Holt's programme, as above,
  which holds the frame but not the object; Ziller–Morack 2017 (the
  paired Jacobsthal function; all-differences, for-all-n, conjectural).
* **Not found (candidate novelties):** G₂ as a studied object, its twelve
  exact terms, and the infinitely-often reduction; the upper bound
  G₂ ≪ p^{4.2665+ε} and the pointwise lower bound G₂ ≥ g, which are the first
  bounds of either kind for a two-class Jacobsthal function; the exact
  two-class variance formula and scaling law; the two-class discrepancy ΔΦ₂;
  the map d ↦ G_d and its non-pattern; the two-class form of the localized
  merge lemma, whose mechanism is Holt and Rudd's Lemma 3.1; the pigeonhole
  theorem of §6 in its every-zone form; and the five-door survey. The
  genealogy results (zero orphans, three houses, birth cohorts, frozen
  shares), the Exact Invariance Lemma, the Seam Lemma and the Unification Law
  as a single stated curve are not in Holt's corpus and we have found them
  nowhere else, but they sit close to his population models and that adjacency
  is stated rather than resolved.

"Not found" is a search claim, not a novelty proof. Corrections from readers
are the point of publishing this section.

## 10. Coda

The moiré crystallizes outward. Everything settled is knowable; the family
grows by p−2 per fold from three founders fixed at the second fold; the
conjecture is the claim that the family never stops sending at least one
child into the zone before it crystallizes — that the Scour never achieves
perfect local alignment with the Grain. The data says the frontier never
comes within a factor of p of starving. The proof is one logarithm away and
a hundred years deep, behind a wall we have now walked around five times,
tolls receipted. We wrote this paper because the picture that got one of us
here — waves, holes, mirrors, a pattern that eats scaled copies of itself
and files a fossil record of every meal — turned out to be a lens good
enough to rediscover two centuries of number theory and, at the end, to see
a family, a geography, and a handful of objects that may not have been seen
before. The code that generated every number above runs in a browser or a
shell, and the reader is invited to break any of it.

---

### Authorship and AI disclosure

Sole author: Chris Benjaminsen.

> The framework, vocabulary, and driving questions are the author's,
> developed over six years of independent work. Formal derivations,
> literature audits, computations, and manuscript drafting were carried out
> using an AI assistant operating under the author's
> direction; all results were verified by explicit computation, with code
> and outputs published in the accompanying repository, and all refuted
> intermediate claims retained in the record.

---

### References

(Abbreviated; links and verification notes in `research/PRIOR-ART.md` and
`research/covering-dive.md`.)

Aryan, F. *The distribution of k-tuples of reduced residues.* arXiv:1302.2296.
Balister, P.; Bollobás, B.; Morris, R.; Sahasrabudhe, J.; Tiba, M. *On the Erdős covering problem.* Invent. Math. (2022).
Brent, R. P. *Irregularities in the distribution of primes and twin primes.* Math. Comp. 29 (1975).
Brun, V. *La série 1/5+1/7+1/11+… est convergente ou finie.* Bull. Sci. Math. 43 (1919); *Le crible d'Eratosthène et le théorème de Goldbach.* Skr. Norske Vid.-Akad. Kristiania I (1920).
Buchstab, A. A. *Asymptotic estimates of a general number-theoretic function.* Mat. Sb. 44 (1937).
Cheer, A. Y.; Goldston, D. A. *A differential delay equation arising from the sieve of Eratosthenes.* Math. Comp. 55 (1990).
Chen, J.-R. *On the representation of a larger even integer…* Sci. Sinica 16 (1973).
Diamond, H.; Halberstam, H. *A Higher-Dimensional Sieve Method.* Cambridge Tracts 177 (2008).
Erdős, P. *On the integers relatively prime to n and on a number-theoretic function considered by Jacobsthal.* Math. Scand. 10 (1962).
Ford, K.; Green, B.; Konyagin, S.; Maynard, J.; Tao, T. *Long gaps between primes.* J. Amer. Math. Soc. 31 (2018).
Ford, K.; Konyagin, S.; Maynard, J.; Pomerance, C.; Tao, T. *Long gaps in sieved sets.* J. Eur. Math. Soc. 23 (2021); corrigendum, ibid. 25 (2023), 2483–2485 (the corrigendum's constant 6 is the one to use).
Granville, A.; Soundararajan, K. *An uncertainty principle for arithmetic sequences.* Ann. of Math. 165 (2007); arXiv:math/0406018.
Grob, G. F.; Schmitt, M. *Cycles and patterns in the sieve of Eratosthenes*, arXiv:1905.03117 (2019).
Grob, G. F. *Cycles and patterns in the sieve of Eratosthenes — Part 2, potential twin primes*, arXiv:2107.06950 (2021). Single-authored; the "Part 2" appears on the PDF title page but not in arXiv's metadata title, which reads *Cycles and Patterns in the Sieve of Eratosthenes, Potential Twin Primes*.
Hardy, G. H.; Littlewood, J. E. *Some problems of 'Partitio Numerorum' III.* Acta Math. 44 (1923).
Hausman, M.; Shapiro, H. N. *On the mean square distribution of primitive roots of unity.* Comm. Pure Appl. Math. 26 (1973).
Holt, F. B.; Rudd, H. *On Polignac's conjecture.* arXiv:1402.1970 (2014); *Eratosthenes sieve and the gaps between primes.* arXiv:1408.6002 (2014).
Holt, F. B. *On the counts of p-rough numbers.* arXiv:2308.07570 (2023); *Surviving Eratosthenes sieve I.* arXiv:2603.25915 (2026); full list at primegaps.info.
Hough, R. *Solution of the minimum modulus problem for covering systems.* Ann. of Math. 181 (2015).
Iwaniec, H. *On the problem of Jacobsthal.* Demonstratio Math. 11 (1978).
Klein; Koukoulopoulos; Lemieux. *On the j-th smallest modulus of a covering system with distinct moduli.* Int. J. Number Theory (2024); arXiv:2212.01299. (Author initials still to be taken from the source.)
Maier, H. *Primes in short intervals.* Michigan Math. J. 32 (1985).
Maier, H.; Pomerance, C. *Unusually large gaps between consecutive primes.* Trans. AMS 322 (1990).
Meštrović, R. *Euclid's theorem…: a historical survey.* arXiv:1202.3670.
Montgomery, H. L.; Vaughan, R. C. *On the distribution of reduced residues.* Ann. of Math. 123 (1986).
OEIS A048670, A049296, A059861, A060256, A072753, A288815.
Petersen, C. et al. *Simple wave-optical superpositions as prime number sieves.* Phys. Rev. Lett. 122, 090201 (2019).
Pritchard, P. *A sublinear additive sieve* (1979); *Explaining the wheel sieve.* Acta Inform. 17 (1982).
Rosser, J. B.; Schoenfeld, L. *Approximate formulas…* Illinois J. Math. 6 (1962).
Selberg, A. *On elementary methods in prime number theory* (1949).
Táfula, C. *An elementary heuristic for Hardy–Littlewood extended Goldbach.* arXiv:1508.05702.
Tao, T. *Open question: the parity problem in sieve theory.* Blog (2007).
Zhang, Y. *Bounded gaps between primes.* Ann. of Math. 179 (2014).
Ziller, M.; Morack, J. F. *Divisibility in paired progressions…* arXiv:1706.00317; arXiv:1706.03668.
