# OEIS submission draft: the twin Jacobsthal function G₂

<!-- ledger
id: Q-oeis-G2-submission
status: CLOSED
todo: none
question: Should the twin Jacobsthal function G2 be submitted to OEIS as a new sequence?
verdict: DO NOT SUBMIT: it duplicates A144311 (Carter, September 2008), which is G2 - 1 on the same fixed classes with no free translate and carries 22 terms to our fourteen, all fourteen agreeing; five waves missed it because every search was run on G2 and never on G2 - 1.
-->

> # ⚠ DO NOT SUBMIT. THIS IS A DUPLICATE OF OEIS A144311.
>
> **Established 2026-08-18.** A144311, submitted by Andrew Carter in September
> 2008, is this sequence shifted by one: *"The length of the longest sequence of
> consecutive integers, each equal to 1 or −1 modulo at least one of the first n
> primes."* Their `m` is our `r + 1`, so `m ≡ ±1 (mod p)` is exactly
> `p | r(r+2)`, and their a(n) is our G₂ − 1. Same fixed classes `{0, −2}`, no
> free translate — the same object.
>
> It carries **22 terms** where we have fourteen, and all fourteen agree. Our
> searches missed it for five waves because every one of them was run on `G₂`
> and never on `G₂ − 1`; the `G₂` searches still return nothing, and A144311's
> text contains no "Jacobsthal", "twin", "primorial" or "gap".
>
> **What survives and is still worth offering to A144311**, subject to the
> standing publication moratorium and to Chris's decision, not mine: a b-file
> extending the terms, the twin-prime motivation and the primorial-wheel
> framing, cross-references to A048670 / A288815 / A072753 which A144311 does
> not have, and the position certificates. Everything below is kept as the
> record of what was drafted, not as a thing to send.

Status: **RETIRED as a submission**, kept as a source of material for A144311.
Was: DRAFT for review before submission at https://oeis.org/Submit.html
(submitter: Chris Benjaminsen). Verified terms from scripts
05-twin-jacobsthal.js and 05b (segmented, 29#); a(1), a(2) verified separately.

---

**NAME**

Largest gap between consecutive integers r with 0 <= r < P and gcd(r, P) =
gcd(r+2, P) = 1, taken cyclically, where P = A002110(n) is the n-th primorial.

**DATA**

2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528

**OFFSET**

1

**COMMENTS**

The counted residues are the "twin candidates" mod P: positions r such that
neither r nor r+2 is divisible by any of the first n primes. There are
A059861(n) of them per period (Schemmel totient); the pattern is
periodic mod P and palindromic (r is a twin candidate iff P-2-r is).

A twin-specific analogue of Jacobsthal's function A048669/A048670 (one
forbidden residue class per prime; here each odd prime forbids the two classes
0 and -2). Differs from the paired Jacobsthal function A288815 (Ziller-Morack),
which takes the worst case over ALL even differences: a(n) <= A288815(n) for
all computed terms (12 <= 18, 30 <= 30, 42 <= 66, ..., 528 <= 708).

Reduction to the twin prime conjecture: any composite in (prime(n),
prime(n+1)^2) has a prime factor <= prime(n), so twin candidates below
prime(n+1)^2 are actual twin primes. Hence if a(n) < prime(n+1)^2 - prime(n)
for infinitely many n, the twin prime conjecture follows. Computed terms
satisfy a(n) < 0.32 * prime(n+1)^2; the ratio a(n)/prime(n+1)^2 runs from
0.222 at n = 1 to 0.314 at n = 12. Cf. the analogous conjecture for A288815
in Ziller-Morack 2017.

Lower bound: a(n) >= A048670(n) pointwise, with no sieve input. Twin
candidates are a subset of the totatives of P, so a maximal gap between
consecutive totatives contains no twin candidate either, and the twin-candidate
gap covering it is at least as long. Hence a(n) >> p * log(p) * logloglog(p) /
loglog(p) with p = prime(n), by Ford, Green, Konyagin, Maynard and Tao (J.
Amer. Math. Soc. 31 (2018)) via Rankin (1938) and Pintz (1997); and
a(n) >= p * log(p)^(2+o(1)) if Jacobsthal's function attains the order Maier
and Pomerance conjecture for it. Ford, Green, Konyagin, Maynard and Tao state
that conjecture as an upper bound, j(P) - 1 << p * log(p)^(2+o(1)); the lower
bound quoted here needs the equality form j(P) = p * log(p)^(2+o(1)), which is
how Ford states it in his 2018 Montreal lectures. Measured,
a(n)/A048670(n) = 2.00, 3.00, 3.00, 3.00, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00
at n = 3..12.

Growth over the computed terms follows the extreme-value form
c * m * (log(P) - log(m)), where m = P/A059861(n) is the mean gap between
twin candidates; c averages 0.48 over n = 5..12 with a coefficient of variation
of 10%. The direct ratio a(n)/(p * log(p)^2) wobbles between 0.66 and 1.13 with
no trend over n = 3..12, mean 0.89, so that form describes the computed range
and is not an asymptotic law. The raw log-log slope in the x-frame is 1.777 over
the twenty terms x = 5..79; calibrated against the 64-term one-class control
A048670, whose estimator carries a bias of +0.28 at the matching window width,
that corrects to a growth exponent in p of 1.50 +- 0.05, with a practical
bracket of 1.3 to 1.8 and a hard floor of 1. The same estimator reads
1.57 +- 0.06 on A288815 over nineteen terms, so the two sequences should not be
quoted at a common exponent. A certified covering ladder run far beyond the
exact terms reads about 1.2; roughly a third of that difference is the ladder's
own downward bias and the residual, about 0.2, is unexplained.

Upper bound. Iwaniec's O(log(P)^2) for Jacobsthal's function has no analogue in
print for two forbidden classes per prime, but the gap is one of sieve dimension
rather than of missing input. One omitted class per prime is a dimension-1
sieve and two is dimension-2, and the dimension-2 lower-bound sieve of Diamond
and Halberstam has sifting limit beta_2 = 4.266... (Cambridge Tracts 177,
p. 79 prints "beta_2 ~ 4.266"; the 20-decimal value is in Booker and Browning,
"Square-free values of reducible polynomials", Discrete Anal.), which gives
a(n) << p^(beta_2 + eps) by the standard argument. A bound
at exponent 2 is what the reduction above would need, so the open band on the
exponent is (2, 4.2665].

**EXAMPLE**

For n = 3, P = 30: the twin candidates mod 30 are 11, 17, 29 (pairs
(11,13), (17,19), (29,31)). Cyclic gaps are 6, 12, 12; a(3) = 12.

**PROG**

(PARI)
a(n) = my(P=vecprod(primes(n)), prev=-1, first=-1, g=0); for(r=0, P-1, if(gcd(r,P)==1 && gcd(r+2,P)==1, if(first<0, first=r, g=max(g, r-prev)); prev=r)); max(g, first+P-prev)
\\ feasible through n=9; a(10) and a(11) by segmented sieve, a(12) by a mod-30
\\ lattice walk (see link)

**CROSSREFS**

Cf. A002110 (primorials), A059861 (number of twin candidates per period),
A048670 (Jacobsthal's function at primorials; a term-by-term lower bound for
this sequence), A288815 and A072753 (the paired Jacobsthal function in two
normalisations, A288815(n) = 6*A072753(n) + 6; it maximises over all residue
pairs and so dominates this sequence), A091592 (n with no twin prime between
n^2 and (n+1)^2) and A192870 (the same question for prime k-tuplets, the twin
case being a(2) = 122).

**KEYWORD**

nonn, hard, more

**LINKS**

- Code (JS, full-period and segmented): primeoire repository, research/05*.js
- M. Ziller and J. F. Morack, "Divisibility in paired progressions...",
  arXiv:1706.00317 (2017). [the all-differences analogue and its conjecture]
- H. Iwaniec, "On the problem of Jacobsthal", Demonstratio Math. 11 (1978).
- K. Ford, B. Green, S. Konyagin, J. Maynard and T. Tao, "Long gaps between
  primes", J. Amer. Math. Soc. 31 (2018), 65-105. [the lower bound, imported
  through A048670; also the source for the upper-bound form of the
  Maier-Pomerance conjecture, their eq. (1.3) and the line after it]
- K. Ford, "Large gaps between primes", Talk 1, CRM Montreal workshop
  Probability in Number Theory, 2018,
  ford126.web.illinois.edu/montreal_talk1_primegaps.pdf. [the equality form of
  the Maier-Pomerance conjecture]
- H. G. Diamond and H. Halberstam, "A Higher-Dimensional Sieve Method",
  Cambridge Tracts in Mathematics 177, CUP 2008, p. 79. [prints beta_2 ~ 4.266;
  verified against the page photographs in this repo's attestation/ directory]

---

## Term provenance

| n | prime(n) | P = n-th primorial | a(n) | verified by |
|---|---|---|---|---|
| 1 | 2 | 2 | 2 | direct |
| 2 | 3 | 6 | 6 | direct |
| 3 | 5 | 30 | 12 | 05 + direct |
| 4 | 7 | 210 | 30 | 05 |
| 5 | 11 | 2310 | 42 | 05 |
| 6 | 13 | 30030 | 66 | 05 |
| 7 | 17 | 510510 | 108 | 05 |
| 8 | 19 | 9699690 | 150 | 05 |
| 9 | 23 | 223092870 | 204 | 05 |
| 10 | 29 | 6469693230 | 258 | 05b (segmented, ~3 min; slot count matched A059861 exactly) |
| 11 | 31 | 200560490130 | 348 | 05b method over 2.0e11 positions (~80 min; slot count matched A059861 = 6226553025 exactly; max gap at r=8813641451) |
| 12 | 37 | 7420738134810 | 528 | mod-30 lattice walk over 7.42e12 positions (~54 min; slot count matched A059861 = 217929355875 exactly; max gap at r=544899485411) |

a(13) (41#, 3.0e14 positions) is the natural next term. It needs about 40x this
runtime or a compiled implementation.

## Before submission

Two things in the draft are not yet in a form OEIS accepts, and both are
mechanical:

- The LINKS entry "primeoire repository, research/05*.js" is a path, not a URL.
  OEIS wants either a public URL or the code uploaded as an a-file. Under the
  publication moratorium neither exists yet, so this blocks submission on its
  own.
- The PROG entry reproduces a(1) through a(9) only. Terms a(10) to a(12) rest on
  the two segmented programs, which are what the LINKS entry has to point at.

Everything else in the draft is verified. All twelve DATA terms are reproduced
by independent construction in `research/audit-numbers.js` (parts `ladder` and
`g2big`), every cited A-number was checked against oeis.org, and the numeric
claims in COMMENTS are checked by that script's `oeis` part.
