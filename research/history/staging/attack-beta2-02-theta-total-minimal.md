# Attack beta_2 / 02: the minimal theta_total, and why it is 1

<!-- ledger
id: Q-beta2-theta-total
status: CLOSED
todo: none
question: What is the largest theta_total defensible position-uniformly, and does it clear the break-even the beta2 upper-bound attack needs?
verdict: The largest defensible theta_total is 1 and it does not clear break-even: it misses by 0.2417 under the brief's symmetric arithmetic and by 0.2090 under the corrected asymmetric one, no part of the gap closes, and the weakest link in the negative is an ABSENT rather than a PROVEN.
-->

*(2026-08-18. Staging note for the upper-bound attack on `paper/beta2-note.md`'s
G2 exponent. Companion computation: `research/attack-beta2-02-theta-total.js`.
Legend as in `research/covering-dive.md`: **[PROVEN]** published theorem with
source; **[VERIFIED]** checked computationally here; **[MEASURED]** empirical,
finite range; **[INFERRED]** our deduction from sourced facts; **[ABSENT]** we
searched and found nothing.)*

## 0. THE NUMBER, FIRST

**The largest theta_total defensible position-uniformly is 1, and it does not
clear 1.2417. It misses by 0.2417 under the brief's symmetric arithmetic and by
0.2090 under the correct asymmetric arithmetic. No part of the gap is closed.**

| quantity | value | status |
|---|---|---|
| break-even theta_total, symmetric levels | 1.241651 | the brief's figure, confirmed |
| break-even theta_total, optimally asymmetric levels | **1.208983** | corrected, and lower |
| theta_total provable in the LONG-interval problem (Brudern-Fouvry Prop. 2) | **1.25 exactly** | **[PROVEN]**, in print since 1996 |
| theta_total provable POSITION-UNIFORMLY (what G2 needs) | **1** | and it is sharp, §4 |
| shortfall against break-even | **0.209** | the whole gap |
| exponent at theta_total = 1, best asymmetry | 5.158065 | worse than beta_2 = 4.26645 by 0.892 |

Two findings sit beside that verdict and neither is small.

**The first is that the target of this attack is already a published theorem in
the neighbouring problem.** Brudern and Fouvry's Proposition 2 delivers
D1\*D2 = x^{5/4} unconditionally, their four side conditions bottom out at
`q^{C0} D1^4 D2^4 <= x^{5-c eps}`, which IS theta_total <= 5/4, and their
resulting exponent is (4/3)(1 + e^{3/4}) = **4.156000**, below beta_2 = 4.26645
by 0.110450. Their own introduction says so, comparing against "1/4,2664 =
0,2343". So the answer to "what is the smallest theta_total at which the joint
bilinear remainder bound is actually provable" is **1.25, and it was answered in
1996** for the density form of the problem. It is not new, and it is not ours.

**The second is that the transfer to G2 fails at one identifiable factor, not at
a vague loss of uniformity.** Writing the joint remainder for a window
(N, N+H] rather than for [x/2, 3x/2], the phase that appears is *exactly*
Brudern-Fouvry's, multiplied by one extra factor:

    e( h rho /(d1 d2) )  =  e( -h N /(d1 d2) ) · e( -2 h \bar{d1} / d2 )

The right factor is theirs verbatim. The left one is bounded by x^eps in their
setting because their window length equals the size of their elements, and it is
of size N/H in ours, with N running to P(z) = e^{z(1+o(1))}. Every step of both
their propositions survives the transfer except the one that removes it.

---

## 1. What Lemma V asks at theta_total = 1.25 and at 2

Both statements, written out, so the difference is visible rather than asserted.

> **Lemma V(a, b), position-uniform form.** Let z >= 2, H = z^u, and let psi^+
> be Rosser-Iwaniec upper-bound linear-sieve weights of level D = H^a and psi^-
> lower-bound weights of level Delta = H^b, both for the sieve by primes p < z.
> Then for every integer N >= 0 and each (alpha, beta) in {(-,+), (+,-), (+,+)},
>
>     SUM_{d1 | P(z), d1 <= L_alpha}  SUM_{d2 | P(z), d2 <= L_beta, (d1,d2)=1}
>         psi^alpha_{d1} psi^beta_{d2} · r_{d1,d2}(N)   <<   H (log H)^{-3},
>
> where r_{d1,d2}(N) = #{n in (N, N+H] : d1 | n, d2 | n+2} - H/(d1 d2), and
> L_+ = D, L_- = Delta. Write theta_total = max(a+b, 2a).

| | theta_total = 1.25 | theta_total = 2 |
|---|---|---|
| levels (upper, lower) | (H^{1/2}, H^{3/4}) | (H^{0.865}, H^{1.135}) at the optimum |
| terms in the sum | H^{1.25} | H^{2} |
| trivial bound | H^{1.25} | H^{2} |
| target | H^{1-eps} | H^{1-eps} |
| **power of H that must be saved** | **H^{0.25}** | **H^{1.00}** |
| cancellation exponent gamma needed, deviation ~ (terms)^gamma | **gamma <= 0.80** | **gamma <= 0.50** |
| fraction of square-root cancellation needed | 40% | 100% |
| sieve exponent obtained | 4.1560 (BF geometry) / 4.1265 (unconstrained optimum) | 2.6487 (symmetric) / 2.5790 (unconstrained optimum) |

**[VERIFIED]** `research/attack-beta2-02-theta-total.js` S1, S3, S6.

The brief's "roughly four times less cancellation" is exactly right and is exact
rather than rough: 0.25 against 1.00 in the exponent. In the repo's own
diagnostic variable, theta_total = 2 asks for *precisely* square-root
cancellation and not one epsilon less, while theta_total = 1.25 asks for 40% of
it. The pilot in `research/sift-limit-attack.js` measures gamma = 0.23 to 0.33 at
toy scale, comfortably inside both, which is why this route keeps looking alive.

**One correction to the arithmetic before going further.** The threshold formula
in `research/sift-limit-attack.md` §4.5, `ln(s1-1) + ln(s2-1) > 1`, parametrises
the asymmetry between the two COMPONENTS, and under that parametrisation the
optimum is symmetric and gives u > 2(1+sqrt e)/theta_total. The asymmetry that
actually pays is between the UPPER and the LOWER sieve level, which that formula
cannot express. Brudern and Fouvry's own positivity equation, on their p.355,
read from the PDF, is

    2 f( log x^{3/4} / log x^xi )  -  F( log x^{1/2} / log x^xi )  =  0

whose unique root is xi = 0.240616 **[VERIFIED]**, matching the 0,2406 they
print. In closed form the threshold with upper level H^a and lower level H^b is

    u  >  (1 + e^{b/(2a)}) / b

which reduces to 2(1+sqrt e)/theta_total only when a = b. Optimising over the
ratio rho = b/a gives u = G\*/theta_total with

    G\* = min_rho (1 + e^{rho/2})(1 + 1/rho) = **5.158065**  at rho\* = **1.313085**

against 2(1+sqrt e) = 5.297443. **[VERIFIED]** So the correct break-even is
5.158065/4.26645 = **1.208983**, not 1.241651, and at theta_total = 1.25 the
correct exponent is 4.126452, not 4.237954. The brief's 1.2417 is the
conservative figure; nothing below depends on which is used, because the
defensible value is 1.

Two validity checks that a threshold of this shape needs and that are easy to
skip. At the Brudern-Fouvry point F is evaluated at s = 2.078 and f at
s = 3.117, inside [1,3] and [2,4] respectively, which is where the explicit
`F(s) = 2e^gamma/s` and `f(s) = 2e^gamma ln(s-1)/s` are exact. **[VERIFIED]** At
the unconstrained optimum the arguments are s = 2.230 and s = 2.928, also inside.
No row in §1 or §3 of the script sits outside those ranges, which is the failure
mode that voided `research/theta-ladder.md` §5b's working point.

---

## 2. The two papers, read from the PDFs

Both fetched as PDFs and read as rendered pages, not as OCR text and not as HTML.
The numdam OCR layer drops every display formula in the Brudern-Fouvry file, so
every displayed condition below was read off the rendered page image.

### 2a. Brudern and Fouvry, *Le crible a vecteurs*, Compositio Math. 102 (1996) 337-355

Source: `numdam.org/item/CM_1996__102_3_337_0.pdf`. **[PROVEN]**

Their Theorem, p.339: for 0 <= kappa < 1, q an integer with 1 <= q <= x^kappa,
and P any set of primes, there is a function theta(kappa) tending to 0,2406 as
kappa tends to 0 such that uniformly on P, for 0 <= theta <= theta(kappa),

    |{n <= x ; n = 1 (mod q), p | n(n-2) and p in P  ==>  p >= x^theta}|
        >>  (x/q) PROD_{2<p<x^theta, p in P, p not| q} (1 - 2/p).

The same page, in their own words: "Un abord direct de cette question est
d'appliquer les formules de crible en dimension 2 a l'ensemble {n(n-2); n <= x},
le terme d'erreur etant alors trivialement controle jusqu'aux modules <= x^{1-e}.
En se reportant au travail de Diamond, Halberstam et Richert ([D-H-R]), on
obtient l'exactitude du Theoreme mais pour toute valeur inferieure de theta a
1/4,2664 = 0,2343... ."

So the benchmark they beat is exactly our beta_2, in exactly our normalisation
(u = 1/theta), and they beat it by 4.26645 - 4.156000 = **0.110450**.

**What they are counting is not what G2 counts.** Their statement is a lower
bound on the NUMBER of survivors in [1, x]; ours is that EVERY window of length
H holds one. A density theorem over an interval of length x says nothing about
the largest gap inside it. That is the whole distance between their theorem and
the one this attack wants, and §3 is about the one step where the distance bites.

### 2b. Their Proposition 1 (elementary: Cauchy-Schwarz, then Weil), p.342

Statement, read from the page: for lambda_1, lambda_2 of levels D1, D2 with
sup-norms <= 1, the joint remainder sum is O_eps(x^{1-eps} q^{-1}) uniformly
under

    q^{C0} D1 <= x^{1-10 eps},        q^{C0} D1 D2^3 <= x^{2-10 eps}.

With q = 1 and (D1, D2) = (x^A, x^B) that is the polytope A <= 1, A + 3B <= 2.
They add: "Dans le cas ou q = 1, la Proposition 1 permet de depasser la valeur
triviale D1 D2 = x, lorsque D1 est plus grand que D2 mais ne donne rien dans le
cas symetrique D1 = D2", which the polytope reproduces (A = B forces 4A <= 2,
i.e. theta_total = 1 exactly).

**Best exponent inside that polytope: u = 4.612313 at (a, b) = (0.4190, 0.7430),
theta_total = 1.1620.** That LOSES to beta_2 by 0.345863. **[VERIFIED]** So the
elementary half of Brudern-Fouvry, even used optimally and even with the correct
asymmetric threshold, does not reach break-even. Their own remark that
Proposition 1 "ne soit pas assez profond pour demontrer le Theoreme" is
quantified by that row.

### 2c. Their Proposition 2 (Deshouillers-Iwaniec Kloosterman), pp.344-345

Statement: lambda_1 of level D1 with sup-norm <= 1 and lambda_2 **well
factorable** of level D2. Then the joint remainder sum is O(x^{1-eps} q^{-1})
under

    q^{C0} D1 <= x^{1-c eps},         q^{C0} D1 D2^2 <= x^{2-c eps},
    q^{C0} D1^2 D2^3 <= x^{3-c eps},  q^{C0} D1^4 D2^4 <= x^{5-c eps}.

**The last condition, with q = 1, is A + B <= 5/4. It IS theta_total <= 1.25.**
That single line is the answer to the question this attack was sent to ask.

Their §3.4, p.353, verbatim: "Ainsi D et Delta sont respectivement attaches aux
fonctions psi^+ et psi^-. ... On choisit alors D = x^{(1/2)-100c eps} q^{-C0} et
Delta = x^{(3/4)-100c eps} q^{-C0}. Il est utile de signaler que dans le cas des
termes d'erreur provenant du troisieme terme de (2.6), c'est-a-dire de
Lambda_1^+ Lambda_2^+, on n'a affaire qu'a des coefficients bien factorisables de
niveau D et D." So the upper level is x^{1/2}, the lower is x^{3/4}, the mixed
terms sit at theta_total = 5/4 and the Lambda^+Lambda^+ term at theta_total = 1.

At (A, B) = (3/4, 1/2), which is the assignment that puts the larger level on the
arbitrary-coefficient side, two of the four conditions are tight:
A + 2B = 1.75 <= 2, **2A + 3B = 3.00 = 3**, **4A + 4B = 5.00 = 5**.
**[VERIFIED]** Searching the polytope, the true optimum is u = 4.155795 at
(0.5030, 0.7455), so their round choice is within 0.0002 of best possible inside
their own constraints.

### 2d. Iwaniec, *A new form of the error term in the linear sieve*, Acta Arith. 37 (1980) 307-320

Source: `matwbn.icm.edu.pl/ksiazki/aa/aa37/aa37127.pdf`, read from the scan.
**[PROVEN]** Theorem 1: for 0 < eps < 1/3, M, N > 1, D = MN, under the standard
one-sided axioms and for all 2 <= z <= D^{1/2},

    S(A,P,z) <= V(z) X {F(s) + E} + R^+(A,M,N),
    S(A,P,z) >= V(z) X {f(s) - E} - R^-(A,M,N),

with s = log D / log z and

    R^nu(A,M,N) = SUM_{l < exp(8 eps^-3)} SUM_{m<M, m|P(z)} SUM_{n<N, n|P(z)}
                    a^nu_{m,l} b^nu_{n,l} r(A, mn),

the coefficients bounded by 1 in absolute value. His p.308 states the point of
the whole paper in one sentence worth carrying: "Note that every single error
term r(A,d) appears in R(A,D) in absolute value, thus there cannot be any
cancellation of the errors. For this reason every D satisfying (6) may be called
the natural level of distribution of A in arithmetic progressions."

**Read correctly, this is a precedent for the FORM and not for the estimate.**
Iwaniec supplies the bilinear shape; what any application must then supply is a
bound for that shape on its own sequence. For long-interval sequences the bound
comes from Bombieri-Vinogradov-type averaging or, as in Brudern-Fouvry, from
Deshouillers-Iwaniec. For the interval-at-an-arbitrary-position sequence, no such
bound is in print. **[ABSENT, re-verified 2026-08-18]**

**And the kappa = 1 record says why.** The position-uniform one-class problem is
Jacobsthal's function, where the record is still Iwaniec's 1978 g(n) << (k log
k)^2 with k = omega(n), i.e. g(P(z)) << z^2, which is exactly beta(1) = 2, the
sifting limit at level H^{1-eps}. **[PROVEN, but taken from secondary accounts
(Costello-Watts, Math. Comp. 84 (2015) 2795-2803, and its sources); Iwaniec's
1978 paper itself was not read here.]** Forty-eight years, with the
well-factorable error term and the whole Kloosterman toolbox available
throughout, and the exponent has not moved. Whatever the vector sieve's extra
level buys in the density problem, nobody has yet bought any of it uniformly in
position, at kappa = 1 or at kappa = 2. **[INFERRED from the record]**

---

## 3. The transfer, localised to one factor

Set the window to (N, N+H] with N arbitrary, take a smooth minorant f_N of the
window, and run their Poisson step. Their (2.7), read from p.342, is

    R(D1,D2) = SUM_{d1~D1} SUM_{d2~D2} SUM_{1<=|h|<=H_f}
                 (lambda_1 lambda_2 / d1 d2) \hat f( h/(q d1 d2) )
                 e( -2h \bar{d1 q}/d2  -  h \bar{d1 d2}/q )   <<  x^{1-eps}

and their (2.8) extracts the position out of \hat f as a single phase: "Par
retour a la definition de \hat f, on voit que pour un certain t de [x/2, 3x/2]",
after which the summand carries the factor `e( h t /(q d1 d2) )`.

The two facts that make that factor free for them:

1. their frequency cut-off is `H_f = q D1 D2 x^{-1+eps}`, set by the WINDOW
   LENGTH, which for them is x;
2. the phase argument is `h t /(q d1 d2)`, set by the ELEMENT SIZE, also x.

so `|h t /(q d1 d2)| <= (3/2) x^eps` and the phase is a bounded smooth amplitude.
Their next line, "Par integration par parties on elimine le premier terme e(.) de
(2.9)", costs x^eps and nothing more.

**In the position-uniform problem those two roles come apart.** The cut-off is
set by H and the phase argument by N, so

    |h N /(d1 d2)|  <=  N/H · H^eps,        N up to P(z) = e^{z(1+o(1))}.

Partial summation on d1 now costs a factor 1 + O(N/H); equivalently, splitting
the d1 and d2 ranges finely enough to restore smoothness costs (N/H)^2 pieces
with no compensating average. The same factor kills the same step in
Proposition 1: after their Cauchy-Schwarz the surviving smooth phase is
`e( t L /(q d1 d2 d2') )` with `L = h d2' - h' d2`, whose argument is O(x^eps)
for them and O(N/H) for us. **[INFERRED, and the arithmetic is
elementary]**

Nothing else changes. Reciprocity, `\bar{d}/c + \bar{c}/d = 1/(cd) (mod 1)` for
(c,d) = 1, gives the identity quoted in §0: the CRT root of the shifted system
splits as a pure translation phase times their own Kloosterman phase, so the
Deshouillers-Iwaniec-shaped part of the sum is untouched by the shift. The whole
of the difference between the two problems is that one bounded factor becoming
unbounded. **[INFERRED]**

That is a sharper statement than "the estimates do not transfer", and it is worth
recording as the exact shape of the missing input: what would be needed is
Deshouillers-Iwaniec Theorem 12 with a weight that oscillates at frequency N/H in
the modulus variables, uniformly in N. The smoothness hypothesis in their
Lemme 2, `g^{(alpha,beta)} << C^{-alpha} D^{-beta}`, is precisely what such a
weight violates. **[ABSENT]**

---

## 4. Absolute values are sharp at the worst position, so theta_total <= 1 is a ceiling and not a habit

The reason the long-interval accounting cannot simply be repaired is that at the
worst window position the trivial bound is attained.

**Construction.** Partition the odd primes below z into S1 and S2 of positive
relative density, put Q_i = PROD_{p in S_i} p, and use CRT to pick n0 with
n0 = 0 (mod Q1) and n0 = -2 (mod Q2). Take the window (n0 - 1, n0 - 1 + H]. Then
for every admissible pair d1 | Q1, d2 | Q2 with d1 <= D1, d2 <= D2 the class
hits, so r_{d1,d2} >= 1 - H/(d1 d2) >= 1/2 once d1 d2 >= 2H. Hence

    SUM_{d1<=D1, d2<=D2} |r_{d1,d2}(n0 - 1)|  >>  #{admissible pairs}  =  (D1 D2)^{1-o(1)},

the o(1) being the Dickman-type density of z-smooth squarefree divisors, which is
the one asymptotic input here and is standard. **[INFERRED; the finite-range
behaviour is VERIFIED below]**

Measured, at z < 42 with the split by alternating primes,
`research/attack-beta2-02-theta-total.js` S7:

```
    H     D1=D2   pairs   sum|r| worst   /pairs   sum|r| typical   /pairs   worst/typical
     60     100     108          79.9   0.740            23.6   0.219             3.4
     60     200     168         136.2   0.811            28.9   0.172             4.7
     60     400     320         284.7   0.890            34.8   0.109             8.2
     30     400     320         294.4   0.920            24.8   0.078            11.9
     15     400     320         302.7   0.946            17.4   0.054            17.4
      8     800     520         508.7   0.978            13.9   0.027            36.7
```

**[VERIFIED]** The worst-position column climbs to 0.978 of the pair count as
D1 D2 / H grows, while the typical-position column falls to 0.027 of it. The
typical column is the divisor average, O(H log^2 H), which is what Brudern and
Fouvry have because they sum over n ~ x. G2 has to survive the other column.

Consequence, stated flatly: **for the two-class interval sequence, the natural
level of distribution in Iwaniec's sense is H^{1+o(1)} uniformly in position, and
that is a theorem about the sequence, not a limitation of any particular
argument.** Every theta_total above 1 therefore requires genuine signed
cancellation at EVERY position, with no absolute-value step anywhere in the
chain. **[INFERRED from the construction]**

**What this does not show.** It does not argue against Lemma V. At the same
constructed position the SIGNED sum with real Rosser-Iwaniec weights stays small,
S8:

```
    H     Dup   Dlo   pairs   |signed| worst pos   sum|r| worst pos   |signed| max over 20k pos
     60   200   400     272              2.00               46.7                    10.00
     30   200   400     272              3.00               44.0                     9.00
     15   200   400     272              4.00               36.1                     7.00
      8   400   800     588              1.00               54.5                     6.00
```

**[MEASURED]** The bottom row runs at theta_total = log(400·800)/log 8 = 6.1, far
past anything this attack needs, and the signed sum never exceeds 6 over 20,000
consecutive positions while the pair count is 588 and the absolute-value sum at
the constructed position is 54.5. So the worst-position obstruction of §4 is an
artifact of the absolute values and of nothing else, exactly as
`research/sift-limit-attack.js`'s full-period pilot already suggested. Lemma V
looks true and the method is what fails.

---

## 5. The theorem that would follow, stated so it can be checked, and NOT claimed

> **Conditional Theorem (NOT PROVED).** Suppose Lemma V(1/2, 3/4) of §1 holds:
> the joint interval remainder for the Rosser-Iwaniec weights at upper level
> H^{1/2} and lower level H^{3/4} is << H (log H)^{-3}, uniformly in the window
> position N. Then G2(p_n#) <<_eps p_n^{4.156000 + eps}, with
> 4.156000 = (4/3)(1 + e^{3/4}).

Against `paper/beta2-note.md`'s beta_2 = 4.26645028414864191641 that is a
decrement of **0.110450**, which closes **4.87%** of the open band (2, 4.2665].
Optimising the level split inside Brudern and Fouvry's Proposition 2 polytope
improves it to 4.155795; dropping their polytope and asking only for
theta_total = 1.25 improves it to 4.126452. **[VERIFIED]**

Three things must be said in the same breath.

**The hypothesis is not an auxiliary lemma; it is the theorem.** At
theta_total > 1 the identity
`SUM_{d1,d2} lambda_1 lambda_2 |A_{d1,d2}| = SUM_{n in window} (SUM_{d1|n} lambda_1)(SUM_{d2|n+2} lambda_2)`
says the remainder sum and the certificate are the same object up to the main
term. So proving Lemma V at theta_total = 1.25 is not a step toward the result,
it is the result written differently. That is normal for sieve remainders only
when an independent arithmetic input bounds them; here there is none.

**The exponent is not the binding cost.** Every published route to
theta_total > 1 on this sequence, Brudern-Fouvry's included, buys the extra level
from an average over the position variable. G2 has no position variable to
average over.

**And the honest comparison is with kappa = 1.** The same conditional sentence
could have been written in 1980 for Jacobsthal, and forty-eight years later the
exponent there is still 2.

---

## 6. What is defensible, and by how much it falls short

| route | position-uniform? | theta_total | exponent u | vs beta_2 = 4.26645 |
|---|---|---|---|---|
| absolute values, one remainder per pair (the current theorem's accounting) | yes | 1 - eps | 5.158065 | loses by 0.892 |
| Brudern-Fouvry Prop. 1 (Weil), transferred | **no**, §3 | 1.1620 | 4.612313 | loses by 0.346 |
| Brudern-Fouvry Prop. 2 (Deshouillers-Iwaniec), transferred | **no**, §3 | 1.2500 | 4.156000 | wins by 0.110 |
| break-even, symmetric | | 1.241651 | 4.266450 | ties |
| break-even, optimally asymmetric | | **1.208983** | 4.266450 | ties |

**[VERIFIED]** for every number in the table.

**Defensible position-uniformly: theta_total = 1.** Short of break-even by 0.209
(asymmetric) or 0.242 (symmetric). The shortfall is the entire distance; nothing
in this attack moves it by any amount.

Two smaller results the attack does produce, both worth keeping:

1. **The exact ceiling of the elementary route.** Even granting a perfect
   transfer of Brudern-Fouvry's Proposition 1, which uses only Weil's bound and
   no spectral theory, the best exponent is 4.612313 at theta_total = 1.1620,
   below break-even. So there is no elementary win available even in the
   long-interval problem, and the whole margin below beta_2 in Brudern-Fouvry
   rests on Deshouillers-Iwaniec.
2. **The sharpness of §4**, which converts "we do not know how to beat level H
   uniformly in position" into "no absolute-value argument can", and localises the
   remaining hope to a genuinely signed estimate.

---

## 7. Every hypothesis smuggled in

Listed because the brief asked and because two of them matter.

- **H1.** That the linear sieve functions may be taken as `F(s) = 2e^gamma/s` and
  `f(s) = 2e^gamma ln(s-1)/s`. Exact only on [1,3] and [2,4] respectively.
  Checked at every point quoted here (§1); all inside. This is the check whose
  omission voided `research/theta-ladder.md` §5b's working point.
- **H2.** That the vector-sieve main term is
  `F(s_D) [2 f(s_Delta) - F(s_D)]`, i.e. that the two components carry the same
  pair of levels. Brudern-Fouvry's p.355 equation confirms it for their
  configuration. A four-level configuration is not covered by anything here.
- **H3.** That the count of z-smooth squarefree divisors below D = z^s is
  D^{1-o(1)} for fixed s, and likewise for a positive-density subset of the
  primes below z. Standard Dickman-type counting; used only for the o(1) in §4,
  and the finite-range behaviour is measured rather than assumed.
- **H4.** That Brudern-Fouvry's normalisation and ours agree, i.e. that their
  theta and our u are related by u = 1/theta. Their own comparison against
  "1/4,2664" is the check, and it is their sentence, not our inference.
- **H5.** That Proposition 2's four conditions may be applied with either of the
  two levels in the D1 slot, since in their application both coefficient families
  are well factorable (their §3.4). Without this the polytope optimum in §2c
  would be worse, not better, so it cannot be inflating any claim here.
- **H6.** That the position-uniform requirement really is over all N up to P(z).
  It is: G2(p_n#) is a maximum over a full period of the primorial modulus.
- **H7 (the one that would overturn §3).** That there is no reformulation in
  which the translation phase `e(-hN/(d1 d2))` is absorbed rather than removed.
  We searched and found none, and the smoothness hypothesis of Deshouillers-
  Iwaniec Theorem 12 is what such a reformulation would have to evade.
  **[ABSENT, not [PROVEN]]**. This is the weakest link in the negative verdict
  and the place a stronger reader should push.

---

## 8. Corrections to the record

Proposed, not applied. None of these changes any headline number of the corpus.

1. **`research/sift-limit-attack.md`:30-32.** "Run unconditionally the component
   levels couple (D1D2 <= H) and the route lands at 2(1+sqrt e) = 5.2974, worse
   than 4.2665, which is why it is absent from this problem's record." The
   *reason* is wrong. Brudern and Fouvry do not run coupled: their Proposition 2
   gives D1 D2 = x^{5/4} unconditionally, and their published exponent is 4.156,
   below beta_2. The vector sieve is absent from the G2 record because of
   position-uniformity (§3), not because it loses. `paper/wall-note.md`:346-352
   already hedges this correctly and should be the model for the fix.
2. **`research/sift-limit-attack.md`:238-241 and :246-250.** The threshold
   `ln(s1-1) + ln(s2-1) > 1` parametrises component-versus-component asymmetry;
   the asymmetry that pays is upper-level versus lower-level. Correct constants:
   `u > (1 + e^{b/(2a)})/b`, optimum `u = 5.158065/theta_total`, break-even
   theta_total = **1.208983**. The figure 1.2417 is not wrong as a sufficient
   condition, it is simply not the break-even.
3. **`research/sift-limit-attack.md`:262-265**, Lemma V's stated range
   "s >= (0.63+delta)·u (theta_total >= 1.25)". Arithmetically consistent with a
   symmetric split at 0.625u each, but the shape that is actually provable in the
   long-interval problem is the ASYMMETRIC (0.5u, 0.75u). Worth restating Lemma V
   with two level parameters rather than one.
4. **New, for the sources list:** Brudern-Fouvry's Proposition 2 condition
   `q^{C0} D1^4 D2^4 <= x^{5-c eps}` is the exact origin of the number 1.25, and
   §6 item (iii) of `sift-limit-attack.md` can be closed by pointing at it: the
   question "is theta_total = 1.25 provable" has been answered yes since 1996 for
   the density problem and remains untouched for G2.
5. **`research/sift-limit-attack.md`:277-287** cites the kappa = 1 precedent as
   Iwaniec 1980. Accurate for the FORM of the bilinear error term (Theorem 1,
   read from the PDF, quoted in §2d). The position-uniform kappa = 1 record is a
   different and less encouraging fact: Iwaniec 1978's g << log^2 n, still
   unimproved in the exponent, sitting exactly on beta(1) = 2.

---

## 9. Reproduction

```
node research/attack-beta2-02-theta-total.js      # all eight sections, ~7 s
node research/qc.js                               # 8 checks
```

Gate state: eight checks; **this note and its script contribute 0 findings**,
confirmed on a clean run. The only finding seen during the run was a transient
`scripts / uncited-script` on `research/attack-beta2-04-loss-budget.js`, which
appears and clears as the sibling attack rewrites its own report. It is not ours
and it is not about anything here.

Sources read as PDFs, both fetched fresh for this note:
`numdam.org/item/CM_1996__102_3_337_0.pdf` (Brudern-Fouvry, pages 339, 342-345,
353, 355 read as rendered images because the numdam text layer drops every
display formula) and `matwbn.icm.edu.pl/ksiazki/aa/aa37/aa37127.pdf` (Iwaniec
1980, pages 307-309). Deshouillers-Iwaniec, Invent. Math. 70 (1982) 219-288, is
cited only through Brudern-Fouvry's Lemme 2 and was not read.
