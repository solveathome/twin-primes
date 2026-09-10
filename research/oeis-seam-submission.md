# OEIS submission draft: twin primes among the seams of one primorial period

<!-- ledger
id: Q-oeis-seam-submission
status: PARTIAL
todo: none
question: Is the seam twin-pair count sequence absent from OEIS, and is the draft ready to submit?
verdict: Status DRAFT: the exact-terms absence survives on both range conventions and the 20 terms are cross-checked by two independent Miller-Rabin implementations, but qc-wave6-X section B3 found a concept neighbour, A367739, that the draft's crossrefs do not mention.
-->

Status: DRAFT for review before submission at https://oeis.org/Submit.html
(submitter: Chris Benjaminsen). Terms from attack2-04-10-hierarchy-oeis.js
(BigInt Miller-Rabin, 40 fixed bases), cross-checked by an independent Python
Miller-Rabin implementation with random bases, an exact match on all 20 terms.

Note: the companion sequence min{k : k*P_n# +- 1 both prime} was also computed
(2, 1, 1, 2, 1, 6, 8, 11, 4, 16, 22, ...) but already exists as A060256, so it
is not submitted. This draft covers only the count sequence, which is absent from
OEIS in both range conventions (k <= prime(n+1) and k < prime(n+1)).

---

**NAME**

Number of k in 1 <= k <= prime(n+1) such that k*P - 1 and k*P + 1 are both
prime, where P = A002110(n) is the n-th primorial.

**DATA**

2, 4, 4, 3, 4, 6, 2, 1, 7, 1, 1, 2, 0, 1, 1, 1, 3, 1, 0, 4

**OFFSET**

1

**COMMENTS**

k*P is divisible by each of the first n primes, so neither k*P - 1 nor
k*P + 1 has a prime factor <= prime(n): every pair (k*P - 1, k*P + 1) is a
twin candidate for the wheel of level n ("seam pair"). The range
1 <= k <= prime(n+1) covers the multiples of P inside one period of the next
primorial; the last one, k = prime(n+1), gives A002110(n+1) - 1 and
A002110(n+1) + 1.

a(n) <= prime(n+1) - 2 for n >= 3: as k runs over 1..prime(n+1), k*P sweeps
every residue class mod prime(n+1) exactly once, so exactly two values of k
give a pair with a member divisible by prime(n+1) (k == +-P^(-1) mod
prime(n+1)) and the other prime(n+1) - 2 pairs are twin candidates for the
level-(n+1) wheel as well. For n = 1, 2 the bound fails only because the
divisible member is prime(n+1) itself: the pairs (3,5) and (5,7) are twin
primes despite containing a multiple of 3 resp. 5.

a(n) >= 1 iff some seam of the n-th primorial inside the first level-(n+1)
period crystallizes as an actual twin prime pair. First zeros at n = 13 and
n = 19. Hardy-Littlewood heuristic: the twin candidates mod P have density
A059861(n)/P, so each seam pair is a twin pair with probability
~ (2*C2 / log^2(k*P)) * P/A059861(n). Since P/A059861(n) ~
e^(2*gamma) * log(prime(n))^2 / (2*C2) the twin constant cancels, and summing
over k = 1..prime(n+1) gives expected count roughly e^(2*gamma) *
prime(n+1) * (log(prime(n)) /
log(P))^2, which decays like log(prime(n))^2 / prime(n); its sum over n
diverges, so heuristically a(n) > 0 for infinitely many n while a(n) = 0 for
almost all n. Computed terms are still pre-asymptotic (a(20) = 4). Summed over
n = 1..20, the per-k form (2*C2 / log^2(k*P)) * P/A059861(n) predicts 52.5
against 48 observed, and the asymptotic form above predicts 57.3; the n = 1 term
carries about 8 of that, since P = prime(1) there and the form degenerates.

The twin primes counted here are the smaller-member sequence A087732 read as
an irregular triangle (which uses the open range 0 < k < prime(n+1)), plus
the k = prime(n+1) endpoint exactly when A002110(n+1) +- 1 is a twin prime
pair (n+1 = 2, 3, 5 among computed terms; cf. A057706): a(n) =
(row n length of A087732) + [A002110(n+1) - 1 is in A057706].

**EXAMPLE**

For n = 4, P = 210, prime(5) = 11: among k = 1..11 the pairs
(210k - 1, 210k + 1) that are twin primes are k = 2 (419, 421), k = 5
(1049, 1051) and k = 11 (2309, 2311); a(4) = 3.

**PROG**

(PARI)
a(n) = my(P=vecprod(primes(n))); sum(k=1, prime(n+1), isprime(k*P-1) && isprime(k*P+1))

**CROSSREFS**

Cf. A002110 (primorials), A060256 (least k with k*primorial +- 1 twin,
unrestricted range), A087732 (the smaller twin primes of this family, open
range) and A087651 (the primorials that produce them),
A057706 (twins straddling a primorial itself), A014545 and
A057704 (primorial +- 1 primes separately), A059861 (twin candidates per
primorial period), **A367739** (Schoenfield 2023: table of the number of k-bit
multipliers m with m*prime(n)# the average of a twin pair — the same counting
object binned by bit-length of m rather than by m <= prime(n+1), so a different
sequence but the crossref an editor will ask for), and **A384545** (the
smooth-multiplier variant).

**KEYWORD**

nonn, more

**LINKS**

- Code (JS, with independent-implementation verification): primeoire
  repository, research/attack2-04-10-hierarchy-oeis.js

---

## Term provenance

Witness values of k per n (each verified prime-prime by two independent
Miller-Rabin implementations; ceiling = prime(n+1) - 2 from the Seam Lemma):

| n | prime(n+1) | a(n) | witnesses k |
|---|---|---|---|
| 1 | 3 | 2 | 2, 3 |
| 2 | 5 | 4 | 1, 2, 3, 5 |
| 3 | 7 | 4 | 1, 2, 5, 6 |
| 4 | 11 | 3 | 2, 5, 11 |
| 5 | 13 | 4 | 1, 4, 5, 11 |
| 6 | 17 | 6 | 6, 9, 10, 11, 13, 14 |
| 7 | 19 | 2 | 8, 17 |
| 8 | 23 | 1 | 11 |
| 9 | 29 | 7 | 4, 11, 16, 19, 20, 22, 27 |
| 10 | 31 | 1 | 16 |
| 11 | 37 | 1 | 22 |
| 12 | 41 | 2 | 4, 23 |
| 13 | 43 | 0 | — |
| 14 | 47 | 1 | 24 |
| 15 | 53 | 1 | 37 |
| 16 | 59 | 1 | 28 |
| 17 | 61 | 3 | 14, 23, 36 |
| 18 | 67 | 1 | 11 |
| 19 | 71 | 0 | — |
| 20 | 73 | 4 | 11, 15, 53, 64 |

a(21)..a(30) are now computed and verified to the same standard, by the same two
independent Miller-Rabin implementations:

    0, 2, 1, 1, 2, 1, 1, 1, 0, 1     (n = 21..30)

with witnesses k = none, {20,75}, {83}, {91}, {35,72}, {80}, {48}, {47}, none,
{2}. Every minimum witness over n = 1..30 agrees with A060256(n), and the four
n with a(n) = 0, namely 13, 19, 21 and 29, are exactly those where A060256(n)
exceeds prime(n+1). Appending them to DATA is a one-line change and strengthens
the
"more" keyword; it is left to the submitter.

## Before submission

The LINKS entry "primeoire repository,
research/attack2-04-10-hierarchy-oeis.js" is a path, not a URL. OEIS wants
either a public URL or the code uploaded as an a-file, and under the publication
moratorium neither exists yet. That blocks submission on its own.

Everything else in the draft is verified. All twenty DATA terms and every
witness were reproduced independently, the heuristic was rederived from the
Mertens limit, and every cited A-number was checked against oeis.org.
