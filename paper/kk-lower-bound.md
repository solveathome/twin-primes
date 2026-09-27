# A two-class Erdos and Rankin lower bound for the Jacobsthal gap

**Contributions to the 27 September revisions:** [Benjaminsen](https://solveathome.org/@Benjaminsen)
provided direction and publication authorization. Codex (AI assistant; exact
model variant not recorded) performed the meta-research, source checks and
edits in these two tasks. Original mathematical sources and earlier project
contributors retain their credit; the [contribution record](../research/RESEARCH-CONTRIBUTIONS-2026-09-27.md)
names the recorded accounts, AI models and revision links. This is not a
claim of sole research authorship by the publishing account.

**Project direction and publication:** Chris Benjaminsen. Research and writing: see the contribution record above.

**Status:** Draft for project review, 18 September 2026. This manuscript
implements the proposal `kk-lower-bound`. Its main composition is
**DERIVED / INFERRED, not independently refereed**, in the terminology of the
project's proposal registry. It is not a journal or arXiv submission and does
not lift the publication moratorium recorded in `paper/PAPERS.md`.

## Abstract

This argument proves no assertion about the infinitude of twin primes. It
constructs long intervals without integers that survive the two residue
exclusions modulo every prime up to a given threshold. Write
$P(y)=\prod_{p\leq y}p$, and let $G_2(P(y))$ be the largest gap between
successive integers $n$ satisfying $\gcd(n(n+2),P(y))=1$. We give the
project's derivation of
$$
 G_2(P(y))\gg
 \frac{y(\log y)^3(\log\log\log y)^2}{(\log\log y)^4}.
 \tag{1}
$$
The argument adapts the three-band construction of Kalmynin and Konyagin,
rather than applying their polynomial theorem to a different object.
The imported analytic inputs are their upper-sieve Lemma 1, Mertens'
theorem, the prime number theorem, and the smooth-number estimate of
Hildebrand and Tenenbaum, Corollary 1.3. We state these dependencies where
they enter and prove the intervening covering and counting steps.
The source's 1974 sieve-theorem reference has not been checked at the printed
page in this work. No implied constant or numerical starting threshold is
certified. Equation (1) remains a project-derived, unrefereed composition
from the stated inputs.

## 1. Object, contribution and prior work

Let
$$
 {\cal T}_y=\{n\in\mathbb Z:\gcd(n(n+2),P(y))=1\}.
$$
This set is periodic with period $P(y)$ and is nonempty: $-1$ belongs
to it. We define $G_2(P(y))$ as the largest distance between consecutive
members of this periodic set, including the gap across a period boundary.
A gap of length $G$ therefore contains $G-1$ excluded integers.
All logarithms in this note are natural.

The object predates the project's terminology. Under the translation
$t=n+1$, exclusion means $t\equiv1$ or $-1\pmod p$ for some prime
$p\leq y$. Consequently, at the $k$-th prime $p_k$,
$$
 G_2(P(p_k))-1=\mathrm{A144311}(k).
 \tag{2}
$$
The current OEIS entry attributes the sequence to Andrew Carter, with
extensions by Max Alekseyev and Jinyuan Wang [O]. Identity (2) concerns
the definition, not a new computation of its entries.

The construction used below belongs to Kalmynin and Konyagin [KK].
Their polynomial quantity asks for a translate $b+f(i)$ that fails
coprimality for every $1\leq i\leq m$. At $f(i)=i(i+2)$, its local
excluded set solves
$$
 i(i+2)+b_p=0\pmod p.
$$
When the two roots exist at an odd prime, they have centre $-1$ and
separation depending on $b_p$. Our excluded pair
$\{a_p,a_p-2\}$ has a moving centre and a fixed separation. Thus [KK,
Theorem 1] is not itself a theorem about $G_2$. Sections 4--7 below
adapt its proof architecture to this specific pair.

The project already records this adaptation in
`research/two-class-lower-bounds.md`, section 4c, and in the prior edition of
this manuscript (version 1, [R4]), sections 4--7 [R2, R4]. This draft supplies a
compact exposition, retains the later source corrections, and gives an
incidence-weight derivation of the residue-class sieve estimate directly
from [KK, Lemma 1]. It makes no claim to a new multi-class construction or
to priority for the two-class specialization.

The source registry distinguishes this fixed-offset quantity from paired
Jacobsthal functions optimized over all even offsets and from systems with
two independently chosen classes per prime [R5]. Neither comparison
identifies these different extremal problems.

## 2. The exact covering identity

**Proposition 1 (elementary; [R2, section 1]).** The largest integer $m$
for which one can cover $\{1,\ldots,m\}$ by pairs
$$
 \{a_p,a_p-2\}\pmod p,\qquad p\leq y,
 \tag{3}
$$
equals $G_2(P(y))-1$.

**Proof.** Given the choices $a_p$, the Chinese remainder theorem
provides an integer $s$ satisfying $s\equiv-a_p\pmod p$ for every
prime $p\leq y$. For an index $i$, membership in the pair (3) says
that $p\mid s+i$ or $p\mid s+i+2$. A covered interval of $m$
indices therefore gives $m$ consecutive integers outside ${\cal T}_y$.
Since ${\cal T}_y$ is nonempty and periodic, this interval lies between
two successive members at distance at least $m+1$.

Conversely, let $s$ be the left endpoint of a gap of length $G$ in
${\cal T}_y$. Each $s+i$, $1\leq i<G$, fails coprimality at some
prime $p\leq y$. The choices $a_p=-s\pmod p$ then cover all these
indices. Taking the maximum in both directions proves the identity.
$\square$

The same argument with one class per prime gives the usual Jacobsthal
gap $g(P(y))$. Adding a second class cannot destroy a cover, so
$$
 G_2(P(y))\geq g(P(y)).
 \tag{4}
$$
Equation (4) is elementary. Inserting the published one-class lower bound
reported in [KK, Theorem A and reference 1] gives the inherited comparison
$$
 G_2(P(y))\gg
 \frac{y\log y\log\log\log y}{\log\log y}.
 \tag{5}
$$
The cited one-class theorem, due to Ford, Green, Konyagin, Maynard and Tao,
is external mathematical input, not a result established by computation
in this assignment.

## 3. Analytic inputs and their scope

We isolate the upper-sieve estimate because both lower-bound constructions
in this note depend on it.

**Input S ([KK, Lemma 1]).** Let $\kappa$ be fixed. For primes $p\leq z$,
suppose a multiplicative function $g$ satisfies
$0\leq g(p)\leq\kappa$ and $g(p)<p$. Suppose nonnegative weights
$w_t$ satisfy, for every squarefree $d\mid P(z)$,
$$
 \sum_{d\mid t}w_t=\frac{Xg(d)}d+r_d,\qquad |r_d|\leq g(d).
 \tag{6}
$$
With $z\ll X$, the quoted lemma bounds their sifted sum by
$$
 \sum_{\gcd(t,P(z))=1}w_t
 \ll_\kappa X\prod_{p\leq z}\left(1-\frac{g(p)}p\right).
 \tag{7}
$$
We use only $z\leq X$; its proportionality constant is fixed.
The statement was read in arXiv v2, page 4, and in the journal's online
text. Its proof cites Halberstam and Richert, *Sieve Methods* (1974),
Theorem 2.2. That printed book theorem has not been independently read
here. A second carrier of the same statement is [FI], Theorem 6.9 with
Corollary 6.10: it was reached at OCR custody in return #158 and
re-read there, so it is not counted as a page reading. Sections 4--8
establish deductions conditional on using (7) in this stated form. They
do not reconstruct its underlying sieve proof.

**Input M.** Mertens' prime harmonic estimate is
$$
 \sum_{p\leq t}\frac1p=\log\log t+M+o(1).
 \tag{8}
$$
We need only bounded errors and differences of this estimate, not a
numerically explicit error term. Its use is recorded in [R4, section 6.3]
and in [KK, section 2].

**Input H ([HT, Corollary 1.3, printed page 417]).** With
$\Psi(X,Z)$ counting integers at most $X$ all of whose prime factors
are at most $Z$, put $u=\log X/\log Z$. For a fixed
$\varepsilon>0$,
$$
 \Psi(X,Z)=X u^{-(1+o(1))u}
 \tag{9}
$$
as $Z,u\to\infty$, uniformly when $u\leq Z^{1-\varepsilon}$.
The formula and its range were read from the primary page image: this is
the printed range of Corollary 1.3 (p. 417). In $x,y$ the source restates
the underlying range (1.13) of its Theorem 1.2 as
$(\log x)^{1+\varepsilon}\leq y\leq x$, (1.13)$'$ on p. 418.
We will use only its upper-bound consequence.

**Input P.** The prime number theorem gives
$$
 \pi(y)-\pi(y/2)\sim\frac{y}{2\log y}.
 \tag{10}
$$
No explicit prime-count threshold is required. This is the final counting
input in [KK, section 2] and [R4, section 7].

## 4. A residue-class form of Input S

**Lemma 2 (elementary reduction from Input S).** For sets
$\Omega_p\subset\mathbb Z/p\mathbb Z$ with
$g(p)=|\Omega_p|\leq\kappa$ and $g(p)<p$, define
$$
 S(X,\Omega)=
 \#\{1\leq n\leq X:n\bmod p\notin\Omega_p
                      \text{ for every }p\leq z\},
 \qquad
 V(z)=\prod_{p\leq z}\left(1-\frac{g(p)}p\right).
$$
For integral $X$ and $z\ll X$, Input S implies
$$
 S(X,\Omega)\ll_\kappa X V(z).
 \tag{11}
$$

**Proof.** For $1\leq n\leq X$, set
$$
 D(n)=\prod_{\substack{p\leq z\\ n\bmod p\in\Omega_p}}p,
 \qquad
 w_t=\#\{1\leq n\leq X:D(n)=t\}.
 \tag{12}
$$
The empty product is 1. These are nonnegative weights with finite support.
For squarefree $d\mid P(z)$, the condition $d\mid D(n)$ requires
$n\bmod p\in\Omega_p$ at every prime dividing $d$. By the Chinese
remainder theorem this is precisely $g(d)=\prod_{p\mid d}g(p)$ residue
classes modulo $d$. Counting an interval in each class gives (6), with
$|r_d|\leq g(d)$, for every such $d$, including $d>X$.

Since $D(n)\mid P(z)$, it is coprime to $P(z)$ exactly when
$D(n)=1$. Hence the left side of (7) is exactly $S(X,\Omega)$.
Applying Input S proves (11). $\square$

This is the conclusion of [KK, Corollary 1], expressed through counting
weights instead of its printed polynomial encoding. The source
record reports a representative and sign problem with that encoding
[R4, section 11.2; R6]. The proof above does not use it or an unstated
choice of integer representatives. The remaining imported obligation is
Input S itself. No Selberg support parameter or additional remainder sum
is introduced into (11).

## 5. The three bands and the finite covering step

Fix a constant $A>4$. A second constant $B>0$ will be chosen after
the sieve constant is accounted for. Write
$$
 L=\log y,\qquad L_2=\log\log y,\qquad L_3=\log\log\log y,
$$
and set
$$
 z_0=L^A,\qquad
 z_1=\exp\!\left(\frac{L L_3}{A L_2}\right),\qquad
 m=\left\lfloor\frac{y}{B}\frac{L^3L_3^2}{L_2^4}\right\rfloor .
 \tag{13}
$$
These are the parameters of [KK, section 2], instantiated as in
[R2, section 4c; R4, section 4].

For fixed $A,B$, all sufficiently large $y$ satisfy
$$
 3<z_0<z_1<\sqrt y<y/2,\qquad
 \frac{2(m+2)}y\leq z_0.
 \tag{14}
$$
Indeed, $\log z_1/\log z_0=L L_3/(A^2L_2^2)\to\infty$,
$\log z_1/L=L_3/(A L_2)\to0$, and the last condition follows from
$m/y=O(L^3L_3^2/L_2^4)$ and $A>4$.
We assert eventual validity, not a certified numerical value of $y$.

Choose the covering classes as follows:

| Primes | Choice of $a_p$ | Pair excluded modulo $p$ |
|---|---|---|
| $p\leq z_0$ or $z_1<p<y/2$ | $0$ | $\{0,-2\}$ |
| $z_0<p\leq z_1$ | $1$ | $\{1,-1\}$ |
| $y/2\leq p\leq y$ | reserved | assigned after the survivor count |

For a separate counting sieve at $z=\sqrt y$, put
$$
 \Omega_p=
 \begin{cases}
  \{0,-2,1,-1\}\pmod p,&z_0<p\leq z_1,\\
  \{0,-2\}\pmod p,&\text{otherwise},
 \end{cases}
 \qquad p\leq\sqrt y .
 \tag{15}
$$
The covering choices and the auxiliary counting sets are different
objects. In particular, the middle band does not cover four classes.
The following implication is what permits the larger sets in (15).

**Proposition 3 (elementary; corrected finite form of [R4, section 5]).**
If $1\leq i\leq m$ is uncovered after the first two bands, at least one
of the following holds:

1. $i\leq\sqrt y+2$;
2. $i$ or $i+2$ is $z_1$-smooth;
3. $i\bmod p\notin\Omega_p$ for every $p\leq\sqrt y$.

**Proof.** Suppose the last condition fails. Membership in the
$\{1,-1\}$ part at a middle-band prime would already cover $i$,
so the failure must give $p\mid k$, where
$p\leq\sqrt y$ and $k=i$ or $i+2$.

If $k$ is prime, it equals $p$, and the first alternative holds.
Otherwise let $q$ be its largest prime factor. Since $i$ survived
the first band, every prime factor of $k$ lies in
$(z_0,z_1]\cup[y/2,\infty)$. If $q\leq z_1$, the second
alternative holds. If $q\geq y/2$, then
$$
 1<k/q\leq 2(m+2)/y\leq z_0.
 \tag{16}
$$
But every prime factor of $k/q$ is greater than $z_0$, a contradiction.
This proves the assertion. $\square$

The term $m+2$ in (14) and (16) is required. Replacing
$2(m+2)/y$ by the smaller $2m/y$ inside this finite inequality is
not valid. The historical draft makes that error; version 1
records its correction [R3, section 4; R4, equation (5.1)].
Condition (14) is sufficient. We claim no converse.

In the notation of [KK], no nonlinear-factor case remains: the two
forms $i$ and $i+2$ are linear. There is no Chebotarev or
Galois-group input to Proposition 3 or to the argument below.

## 6. Counting the uncovered indices

Let $R$ be their number after the first two covering bands. Proposition 3
gives
$$
 R\leq S(m,\Omega)+O(\sqrt y)+2\Psi(m+2,z_1).
 \tag{17}
$$
The smooth-number terms may overlap; an upper bound is all that is needed.

### 6.1 The sieve conditions

At $p=2$ the basic pair has one class, and at $p=3$ it has two.
Both primes are below $z_0$. At primes $p\geq5$, the four residues
in the middle-band set are distinct: a collision between
$\{0,-2\}$ and $\{1,-1\}$ would force $p\mid1$ or $p\mid3$.
Thus $g(2)=1$, $g(3)=2$, and $g(p)$ is 2 or 4 thereafter.
In every case
$$
 0\leq g(p)\leq4,\qquad g(p)<p.
 \tag{18}
$$
The counts required by Input S are supplied by Lemma 2, with
$|r_d|\leq g(d)$ for every $d\mid P(\sqrt y)$.
Finally, $\sqrt y/m\to0$. Hence (11) applies with $\kappa=4$:
$$
 S(m,\Omega)\ll m V(\sqrt y).
 \tag{19}
$$
The cardinalities in (18) are elementary identities. Historical finite
sweeps are not needed to establish them at all primes.

### 6.2 The product calculation

The two small primes contribute a bounded term, so Input M yields
$$
 \sum_{p\leq\sqrt y}\frac{g(p)}p
 =2\log\log\sqrt y+
   2(\log\log z_1-\log\log z_0)+O(1).
 \tag{20}
$$
The contribution of the middle band is additional to the basic
two-class contribution. Since $g(p)\leq4$ and the small primes are
handled separately, the quadratic and higher terms in the logarithm
of the product have bounded sum. It follows that
$$
 V(\sqrt y)\asymp
  \frac1{(\log\sqrt y)^2}
  \left(\frac{\log z_0}{\log z_1}\right)^2
 \asymp
  \frac{A^4 L_2^4}{L^4L_3^2}.
 \tag{21}
$$
These are comparisons up to constant factors, not identities with unit
constant. In particular, exponentiating an $O(1)$ in (20) does not
remove it.

Multiplying (21) by (13) gives
$$
 S(m,\Omega)\ll \frac{A^4}{B}\frac{y}{L}.
 \tag{22}
$$
After fixing $A$, choose $B$ large enough that this term is at most
$y/(4L)$ for all sufficiently large $y$. We have not assigned a
numerical value to the sieve constant.

### 6.3 The smooth-number term

Set $X=m+2$, $Z=z_1$. Then
$$
 \log X=L+O(L_2),\qquad
 u=\frac{\log X}{\log Z}\sim\frac{A L_2}{L_3}.
 \tag{23}
$$
Both $u$ and $Z$ tend to infinity. For example, with
$\varepsilon=1/2$, the range condition $u\leq Z^{1-\varepsilon}$
holds eventually, because
$\log u=O(L_3)$ whereas
$\log Z=L L_3/(A L_2)$.

Moreover $u\log u=(A+o(1))L_2$. Input H therefore implies
$$
 \Psi(m+2,z_1)
  =(m+2)L^{-A+o(1)}
  =o(y/L)\qquad(A>4).
 \tag{24}
$$
For the last step, the ratio to $y/L$ is bounded by a constant times
$L^{4-A+o(1)}L_3^2/L_2^4$, which tends to zero.
This discharges the smooth-number range rather than assuming that a
fixed-$u$ estimate applies while $u$ grows.

Also $\sqrt y=o(y/L)$. Combining (17), (22) and (24), for sufficiently
large $y$,
$$
 R\leq\frac{y}{3L}.
 \tag{25}
$$

## 7. Completing the cover

By Input P, the reserved interval $[y/2,y]$ contains more than
$y/(3L)$ primes for all sufficiently large $y$. Assign distinct
reserved primes $p_i$ to the $R$ remaining indices. Set
$a_{p_i}=i\pmod{p_i}$. This covers index $i$; covering other indices
as well causes no difficulty. Choose any value for unused reserved
primes.

All indices $1,\ldots,m$ are now covered by admissible pairs.
Proposition 1 gives
$$
 G_2(P(y))\geq m+1.
 \tag{26}
$$
With one fixed $A>4$ and the corresponding fixed $B$ from section 6,
equation (26) proves (1) from Inputs S, M, H and P.

**Calibration of (1).** The proof of the reduction is displayed here.
Its analytic inputs are cited published statements. The specialization
is the existing project-derived, unrefereed claim [R2, R4, R6], not a
new theorem asserted to have passed external review. The implied
constant depends on the fixed choices made in this proof; we do not
claim a lower-bound constant uniform over arbitrary $A,B$.

## 8. A shorter, weaker deduction

The same covering identity and sieve input also give
$$
 G_2(P(y))\gg y\log y.
 \tag{27}
$$
This is Theorem A of version 1 [R4, section 9].
For completeness, let $m=\lfloor c y\log y\rfloor$ and
$z=\sqrt m$, with $c>0$ fixed and sufficiently small.
Choose $a_p=0$ for $p\leq z$.

Lemma 2 with $\kappa=2$, together with Mertens' theorem, bounds the
uncovered indices by
$$
 C\,\frac{m}{(\log z)^2}
 \leq (4Cc+o(1))\,\frac{y}{\log y}.
 \tag{28}
$$
Here the constant $C$ absorbs the convergent local factors, including
the prime 2. Since $z=o(y)$, the number of unused primes is
$\pi(y)-\pi(z)\sim y/\log y$. Choosing $c<1/(8C)$ leaves more
than one unused prime per survivor, so the assignment in section 7
finishes the cover.

If that constant is priced at all, the cited form gives
$C=2C_2e^{-2\gamma}C_1=0.41621\,C_1$ with $C_1(1/2)=805.5$
($\delta=0.05$, $K=3$), so any $0<c<1/(8C)\approx3.73\times10^{-4}$ suffices; for example $c=3.7\times10^{-4}$
([FI, Theorem 6.9 and Corollary 6.10], conditional on that reading).
The value $7.5\times10^{-4}$ recorded in return #158 is not reused: it
drops the local factor for the prime $p=2$ that $C$ carries. That is a
priced constant, not a certified threshold.

This argument does not use the smooth-number input, but it still uses
Input S. It cannot be described as having escaped the unread
Halberstam--Richert source dependency. Its composition has the same
project-derived, unrefereed status. In asymptotic size, (1) is stronger
than (27), which is stronger than the inherited comparison (5).

## 9. Scope, corrections and remaining obligations

A lower-bound construction does not bound $G_2$ from above. In
particular, (1) is $y^{1+o(1)}=o(y^2)$, but that fact does **not**
show $G_2(P(y))=o(y^2)$. It also gives no claim about a prescribed
prime-sized interval containing a twin pair. No assertion in this note
changes the project's standing upper-bound problem.

This draft uses the source record rather than reproducing the
historical quick draft unchanged:

| Item | Treatment in this manuscript |
|---|---|
| Finite cofactor inequality | Retains $2(m+2)/y\leq z_0$, including the additive 2 |
| Mertens product | Uses $\asymp$, retaining the unspecified constant factors |
| Parameter constants | Fixes $A$, then $B$; does not claim uniformity over arbitrary choices |
| Printed corollary encoding | Replaced here by the counting weights (12), with Input S explicit |
| Selberg remainder discussion | Not an input to the quoted Brun-form estimate; no claim that dimension 4 is a unique support threshold |
| Smooth-number source | Uses [HT, Corollary 1.3] with its growing-$u$ range checked |
| Numeric threshold | No certified $y_0$ is given; the historical $10^{134.1}$ calculation with constants set to 1 is not such a certificate |
| Computation | No published numerical experiment or ladder has been rerun, and no asymptotic claim is called computationally verified |

The source record [R6] already explains why an earlier misattribution of
an explicit Mertens error does not change this asymptotic deduction.
Here no explicit Rosser--Schoenfeld or Dusart error formula is needed.
Likewise, the earlier finite tests of the covering step remain cited
historical evidence, not executions by this manuscript's preparer.

The uniformity for these changing residue systems is settled under
Input S as quoted: its constant depends only on $\kappa$ (in the
Halberstam--Richert form as cited, on $\kappa,A_1,A_2$), and those
quantities are uniform here, because $g(p)\leq4$ and $g(p)/p\leq4/5$
follow from (18) with $g$ integer-valued ($g(2)=1$, $g(3)=2$, and
$g(p)\leq4$ for $p\geq5$). The next mathematical review should check
Input S against a printed upper-sieve theorem and then inspect the
reduction in sections 4--7.
Tracking all constants would be a separate task. Optimizing the bands
or proving an optimal growth law is also left open. No additional
logarithmic factor is asserted on the basis of a heuristic multi-cover
argument.

## 10. Source and search record

The following claim map separates proved elementary steps, imported
theorems and the unrefereed composition.

| Claim | Mathematical status | Traceable source |
|---|---|---|
| Covering identity and $G_2\geq g$ | Elementary proofs, section 2 | [R2, section 1]; [R4, section 2] |
| Bound (5) | Published one-class input plus elementary comparison | [KK, Theorem A and reference 1]; [R2, section 3] |
| Residue upper-sieve bound (11) | Elementary reduction conditional on the quoted Input S | [KK, Lemma 1 and Corollary 1, p. 4]; weights (12) |
| Three-band reduction and bound (1) | DERIVED / INFERRED, not refereed | [R2, section 4c]; [R4, sections 4--7]; [R6, section 3] |
| Smooth-number estimate and range | Published input, primary page inspected | [HT, Theorem 1.2 and Corollary 1.3, p. 417] |
| Weaker bound (27) | Derived from Input S, Mertens and PNT; not refereed | [R4, section 9] |
| Historical finite tests and source corrections | Reports of earlier project work only | [R4, sections 5 and 11]; [R6] |
| Absence of a twin-prime conclusion | Scope of the displayed argument | [R1]; sections 1 and 9 here |

**Search update, 18 September 2026.** We reused
`research/SEARCH-CONVENTIONS.md`, sections 1, 3 and 5, and the relevant
source-review and closed-route entries of `research/OUTCOMES.md`.
The additional web search used the author names and identifier
`2302.00459`, and the phrases "paired or two-class Jacobsthal",
"forbidden residues 0 and -2", and "OEIS A144311". We inspected the
arXiv v2 source paper, the journal's Math-Net text, the current OEIS
entry, and the primary smooth-number page identified below. The
Ziller--Morack abstract was reached as an adjacent object; its full
paper was not re-audited in this assignment.

The search service incorrectly described [KK] as not journal-published.
The journal's own record and text resolve that point: it appeared in
*Izvestiya: Mathematics* in 2024. Search summaries are not used as
authority for the theorem or its bibliography. The inspected sources
do not themselves state this fixed-offset specialization as the
theorem under review. This bounded source comparison neither proves
novelty nor establishes the absence of other literature.

The 1974 Halberstam--Richert pages were not accessed in this assignment.
We retain the source registry's documented access limitation rather
than repeating its failed retrievals or presenting OCR as a page reading.
The [FI] carrier recorded in section 3 sits at that same OCR custody and
is not a page reading either. No new citation-count claim is made.

### Primary references

- **[KK]** A. B. Kalmynin and S. V. Konyagin, *A polynomial analogue of
  Jacobsthal function*, *Izvestiya: Mathematics* **88** (2) (2024),
  225--235, DOI [10.4213/im9467e](https://doi.org/10.4213/im9467e).
  [arXiv:2302.00459v2](https://arxiv.org/abs/2302.00459v2),
  section 2, especially Lemma 1 and Corollary 1 on p. 4 and the
  three-band construction on pp. 5--7.
  [Journal text](https://www.mathnet.ru/eng/im9467).
  Retrieved arXiv PDF SHA-256:
  `9dd8ce68421e50756ff7341a2320aaf65f240a9d98cca127d0525113e1613a79`.
- **[HT]** A. Hildebrand and G. Tenenbaum, *Integers without large prime
  factors*, *Journal de Theorie des Nombres de Bordeaux* **5** (1993),
  411--484, Theorem 1.2 and Corollary 1.3, printed p. 417.
  [Numdam](https://www.numdam.org/item/JTNB_1993__5_2_411_0/).
  Retrieved PDF SHA-256:
  `f7641a11188d783d8e941883467d541d71429b98d6760e7d20bf85cf53e80bac`.
  The displayed formula and range were read from that page image,
  because text extraction omitted the mathematical displays.
- **[HR]** H. Halberstam and H.-E. Richert, *Sieve Methods*, Academic
  Press, 1974, Theorem 2.2, pp. 68--69 as identified in the project
  source record. Cited through [KK]. Original printed pages not read
  in this assignment.
- **[FI]** J. B. Friedlander and H. Iwaniec, *Opera de Cribro*, AMS
  Colloquium Publications 57, 2010, Theorem 6.9 with Corollary 6.10,
  pp. 68--69. Second carrier of the Theorem 2.2 statement used through
  [KK]; reached at OCR custody in return #158 and re-read there, labeled
  OCR rather than a page reading (section 10). Original printed pages
  not read at page image in this assignment.
- **[O]** [OEIS A144311](https://oeis.org/A144311), definition and
  attribution, revision 23 dated 5 December 2024, inspected
  18 September 2026. The current entry contains 22 values. They were
  not recomputed or reproduced as a new dataset here.

### Project sources and attribution

These are the public editions served on 18 September 2026. References
identify the existing work from which the manuscript was prepared.

- **[R1]**
  [Proposal: a two-class Erdos--Rankin lower bound for G2](/projects/twin-primes/docs/paper/proposals/prop-kk-lower-bound.md),
  sections 1--6, grade QUICK-DRAFT.
  SHA-256 `6e87abcd4d72d22eee1612cbe1f78e65d335e3b2d00c42eb6145587459198670`.
- **[R2]**
  [Two-class lower bounds](/projects/twin-primes/docs/research/two-class-lower-bounds.md),
  sections 1, 3 and 4c.
  SHA-256 `d4af9ec9c9923a51f1c8478d898d1de3a7bed4be566c55f4c63d3d1c856f2556`.
- **[R3]**
  [Historical quick draft](/projects/twin-primes/docs/paper/proposals/draft-kk-lower-bound.md),
  especially sections 3--5. Superseded finite inequality is not reused.
  SHA-256 `d3de944c59a8c885c599e89b8ba9d3c23c027f0b587f6719c37e1cb14e6373c5`.
- **[R4]**
  [A lower bound for the two-class Jacobsthal function](/files/7c375d9510a22b6fc2c6241eeffe51c1d92cb9daa17e4eba63220ed1c29c107f),
  version 1 (the prior edition of this manuscript), sections 2--9 and
  11--12, pinned by content address so that the section references above
  do not follow the served slug as it is revised.
  SHA-256 `7c375d9510a22b6fc2c6241eeffe51c1d92cb9daa17e4eba63220ed1c29c107f`.
- **[R5]**
  [Search conventions](/projects/twin-primes/docs/research/SEARCH-CONVENTIONS.md),
  sections 1, 3 and 5.
  SHA-256 `6160114056b5978f277959993d05a7693cc3c333bbe1becc57c4e3ed03db4b25`.
- **[R6]**
  [Source review of Theorem 2c](/projects/twin-primes/docs/research/history/reviews-0907/11-two-class-theorem2c-source-review.md),
  8 September 2026, sections 0--3 and its source table.
  SHA-256 `700031d9d550bb4d5067ec4691507585e4a149ed3d162b0e520e47318003fb43`.
  The corresponding entry in
  [OUTCOMES](/projects/twin-primes/docs/research/OUTCOMES.md) retains the
  unread 1974 source page and unpriced constants. That edition has
  SHA-256 `78c5ea9f7f96767696cdc0fed267fe06311c0ff723ab4ed15ef0c431343eb9e7`.
- **[R7]**
  [Paper-suite architecture and authorship](/projects/twin-primes/docs/paper/PAPERS.md),
  authorship and AI disclosure section, SHA-256
  `bd01edba6c84ac8681249c4c8cdc5e4cd845a73291406a2c38faa1cd56aeafc8`;
  [mathematical style](/projects/twin-primes/docs/paper/writing-style-math.md).

## Methods and AI disclosure

Chris Benjaminsen provided project framing, questions and publication
stewardship. Formal derivations, literature audits, computations and drafting
were performed by the AI workers and project contributors identified in the
[contribution record](../research/RESEARCH-CONTRIBUTIONS-2026-09-27.md).
The earlier accepted revision [#1093](https://solveathome.org/projects/twin-primes/return/1093)
was submitted under nielsegberts with model gpt-6-astra; the manuscript records
GitHub Copilot CLI as its tool. The 25 September correction
[#1730](https://solveathome.org/projects/twin-primes/return/1730) was submitted
under Benjaminsen with deepseek-v4-flash; the manuscript records Freebuff.
That correction changed the source-custody statements, the [R4] pointer, the priced
constant, the uniformity discussion and source-record wording. Its mathematical work consisted of source inspection,
exposition and checking the displayed deductions, not a new numerical
experiment. The 27 September 2026 Codex meta-research revision, directed by Benjaminsen, corrects the
undefined constant and reversed numerical comparison in §8, updates the
source-record wording, and expands this disclosure (findings #2651–2653).
The specialized argument remains an adaptation of prior machinery, with
priority unestablished and the stated source/referee qualifications retained.
Earlier computations have their own cited code and
recorded outputs. Finite checks do not establish the asymptotic
argument. Refuted intermediate steps and the remaining source-access
and referee obligations are retained explicitly.
