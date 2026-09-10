# Attack 4 — literature notes: dense admissible tuples, and does the two-class version exist?

<!-- ledger
id: Q-packing-two-class-priorart
status: PARTIAL
todo: none
question: Does the two-class (twin) analogue of the Hensley-Richards packing function exist in print?
verdict: Not found, on an uncalibrated search in our own wording with no owning convention recorded, so this is the reach of the search rather than an absence; the classical one-class theory is well developed, and against A008407 the two-class ladder is bounded below by the minimal admissible 2k-tuple diameter.
-->

*(companion to `natal-cap-04-packing-cap.js`; 2026-08-14. Reading-only dive —
publication moratorium respected: nothing submitted anywhere, including OEIS.)*

## The question

Our packing function rho\*5(L) — max points in [0,L) lying in two classes
{11,17} mod 30 (up to shift) and avoiding SOME pair {c, c+2} mod every prime
p ≥ 7 — is the **two-residue-class (twin) analog** of the classical function
rho\*(x): the maximal size of an admissible tuple in an interval of length x.
Question: does the two-class version exist in print?

## The classical (one-class) theory — well developed

1. **D. Hensley, I. Richards, "Primes in intervals", Acta Arithmetica 25
   (1974), 375–391.** Defines rho\*(x) (after Schinzel–Sierpiński's rho-bar)
   and proves rho\*(x) − pi(x) ≥ (log 2 − eps)·x/log²x for large x: dense
   admissible tuples eventually BEAT the primes-in-initial-interval count.
   Consequence: the prime k-tuples conjecture (HL1) and the second
   Hardy–Littlewood conjecture pi(x+y) ≤ pi(x) + pi(y) (HL2) are
   **incompatible** — at most one is true.
2. **I. Richards, "On the incompatibility of two conjectures concerning
   primes", Bull. Amer. Math. Soc. 80 (1974), 419–438.** The discussion
   paper (definitions, translation invariance, the p ≤ k testing cutoff —
   our pigeonhole cutoff p ≤ 2|S| is the two-class version of exactly this).
3. **D. M. Gordon, G. Rodemich, "Dense admissible sets", ANTS-III (Algorithmic
   Number Theory, Portland 1998), Springer LNCS 1423.** Computed rho\*(n) up
   to n = 1600.
4. **D. A. Clark, N. C. Jarvis, "Dense admissible sequences", Mathematics of
   Computation 70 (2001), no. 236, 1713–1718.** Exact rho\*(n) computations;
   their paper's note records the Gordon–Rodemich extension to 1600.
5. **T. J. Engelsma, "K-tuple permissible patterns", opertech.com/primes/
   k-tuples.html.** Multi-year exhaustive computations of maximal admissible
   tuples; found the admissible **447-tuple of width 3159** while
   pi(3159) = 446 — the first concrete size where HL2 must fail if HL1 holds.
   His Table 2 (counts of admissible k-tuples per interval length) is OEIS
   A292224.
6. **OEIS**: A023193 (rho\*, "rhobar of Schinzel and Sierpiński"), A020497
   (its inverse: least width holding k), A008407 (minimal diameter of
   admissible k-tuples), A292224 (Engelsma's triangle).
7. **Polymath8 / A. V. Sutherland, "narrow admissible tuples" (2013–14)**
   (secret blogging seminar threads "The quest for narrow admissible
   tuples"; Sutherland's online database). Modern computational
   state-of-the-art for DENSE/narrow tuples, driven by bounded prime gaps;
   Hensley–Richards shifted-interval sieving is still the baseline method.
8. **A. Granville, A. Lumley, "Primes in short intervals: Heuristics and
   calculations", arXiv:2009.05000.** The modern heuristic picture for the
   MAXIMAL number of primes in intervals of length y around x — the living
   descendant of the rho\* vs pi tension.

## The two-class / twin version — not found, on an uncalibrated search

Every query below is in our own wording, and `research/SEARCH-CONVENTIONS.md`
§1 carries no owning convention for the twin Hensley–Richards question, so read
what follows as the reach of the search rather than as an absence.

Searched (2026-08-14): combinations of "admissible" + two residue classes /
twin pairs / pi_2 packing / superdense twins / second Hardy–Littlewood analog
for twins; OEIS by name and **by value**:

- diameters of our maximal two-class k-pair patterns
  `2, 8, 32, 38, 62, 86, 116, 128, 158, 188, 212, 242, 272, 302, 338, 362, 392`
  → **0 OEIS hits** (control searches on known sequences returned hits);
- minimal-window form `1, 7, 31, 37, 61, 85, ...` → 0 hits;
- name searches for a twin analog of A023193 → nothing.

Closest printed neighbors, none of which is the packing function:

- **T. Forbes, "Prime clusters and Cunningham chains", Math. Comp. 68 (1999),
  1739–1747**, and his long-running "Prime k-tuplets" tables (continued at
  pzktupel.de): minimal-width constellations, including clusters made of
  twin pairs — but (a) minimal-width-for-k, not max-count-in-window, and
  (b) allowing ALL admissible shapes. NB for comparisons: the classical
  densest 3-twin cluster (0,2,6,8,18,20) (e.g. 11,13,17,19,29,31) has
  diameter 20 but uses the third twin class 29 mod 30 (our **seam** class);
  under the Natal@5 two-class skeleton the optimum is 32. Our sequence is
  genuinely a different (more constrained) object.
- Maynard/Tao-era "dense clusters of primes" and bounded-gaps literature:
  admissible tuples as inputs, never the two-class packing max.
- We found **no published statement**, on the uncalibrated search this section opens with (`research/SEARCH-CONVENTIONS.md`), of the twin analog of the
  Hensley–Richards incompatibility (i.e. "densest twin-pair packings beat
  the twin-prime count of the initial interval, so pi_2(x+y) ≤ pi_2(x) +
  pi_2(y) contradicts HL1"). Given how the one-class proof works (shifted
  Eratosthenes sieving of [−x/2, x/2]), the twin version is very plausibly
  true and provable by the same method — but it appears to be unwritten.

## The ladder at its owning convention — A008407, compared 2026-08-20

The comparison this file's first version said was never run. Every two-class
k-pair pattern is in particular an admissible 2k-tuple (mod 2, 3, 5 it uses
only the two Natal classes; mod every p ≥ 7 it avoids a pair of residues), so
its diameter is bounded below by A008407(2k), the minimal diameter of an
admissible 2k-tuple. Against the b-file (T. D. Noe, 342 terms, fetched
2026-08-20; a(1) = 0, offset 1):

| k | w(k) ours | A008407(2k) | excess |
|---|---|---|---|
| 1 | 2 | 2 | 0 |
| 2 | 8 | 8 | 0 |
| 3 | 32 | 16 | 16 |
| 4 | 38 | 26 | 12 |
| 5 | 62 | 32 | 30 |
| 6 | 86 | 42 | 44 |
| 8 | 128 | 60 | 68 |
| 10 | 188 | 80 | 108 |
| 12 | 242 | 100 | 142 |
| 14 | 302 | 126 | 176 |
| 17 | 392 | 156 | 236 |

- The lower bound holds at all 17 terms; **equality exactly at k = 1, 2**,
  where the classical minimal patterns are themselves twin-pair shaped
  ({0,2} and {0,2,6,8}). From k = 3 the classical optimum abandons the
  two-class skeleton (the diameter-16 sextuple is not three twin pairs) and
  the excess grows steadily, 16 to 236.
- **Offset scan over all 342 published terms**: no run of 3 or more
  consecutive terms of our ladder appears in A008407 at any offset, at
  stride 1 or stride 2 (longest prefix match: 2 terms, the k = 1, 2
  equalities). The ladder is not A008407 in disguise at a shift.
- So the ABSENT reading is now calibrated in its owning convention, *minimal diameter of an admissible prime k-tuple* = A008407 (`research/SEARCH-CONVENTIONS.md` §2): the sequence is genuinely a different, strictly more constrained object, and what it measures over A008407 is the price of the Natal@5 two-class skeleton.

## What our computation adds (kept in-repo; moratorium)

- Exact rho\*5(L) for all L ≤ 400 (branch-and-bound staircase), exact at
  83/184 sampled L up to 960 via the tile-certificate (lb = ub), brackets to
  L = 26869 (greedy sieve LB vs @23-tile window UB, W = 223092870).
- The embedding lemma rho\*5(L) ≤ M_x(L) for every level x (CRT translation
  into every tile) — which **refutes** the hoped universal cap direction:
  tile windows are NOT natal-admissible sets, and at the head of the scour
  they are strictly denser (gross(17)@13 = 115 > 2·rho\*5UB(1767) = 108;
  @17 the cap fails for every q ≤ 211). Details and numbers in the JS file's
  OUTPUT/READINGS.

## Sources

- https://handwiki.org/wiki/Second_Hardy%E2%80%93Littlewood_conjecture
- https://www.ams.org/journals/mcom/2001-70-236/S0025-5718-01-01348-5/ (Clark–Jarvis)
- http://www.opertech.com/primes/k-tuples.html and http://www.opertech.com/primes/w3159.html (Engelsma)
- https://sbseminar.wordpress.com/2013/07/02/the-quest-for-narrow-admissible-tuples/ (Polymath8 / Sutherland)
- https://oeis.org/A023193 , https://oeis.org/A020497 , https://oeis.org/A008407 , https://oeis.org/A292224
- https://arxiv.org/abs/2009.05000 (Granville–Lumley)
- https://t5k.org/glossary/xpage/PrimeKTuplet.html and https://pzktupel.de/ktuplets.php (Forbes' k-tuplets)
