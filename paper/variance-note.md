# The exact variance of twin-candidate counts in windows over a primorial period

*Working note, primeoire project, 2026-08-13; §7 added 2026-08-15; §§8–11
restructured 2026-08-28 around the model limit theorem. Companion code:
`paper/variance-note-numerics.js`, `research/06-variance-theorem.js`; for §7
`research/natal5-variance.js`, `research/natal-cap-16-fast-variance.js`,
`research/natal-cap-33-overnight.js`; for §8
`research/history/staging/varE-asymptotic.js`; for §9
`research/history/staging/varE-spectral.js` and
`research/history/staging/varE-limit-theorem.js`; for §10
`research/history/staging/varE-theta2-step.js`,
`research/history/staging/varE-theta2-proof.js` and
`research/varE-exact-ladder-01.js`; for §11
`research/history/staging/redteam-0828-varE.js`. Every numerical claim below
is reproduced by one of these, and each is named at the number it produced.*

## Abstract

Let $P = P_n\# = \prod_{p \le p_n} p$ and let $A \subset \mathbb{Z}_P$ be the
set of *twin candidates*: residues $r$ with $\gcd(r,P) = \gcd(r+2,P) = 1$.
We derive the exact pair-correlation function of $A$ (Theorem 1) and from it a
closed, finitely computable formula for the variance of the number of elements
of $A$ in a window of length $L$ whose starting point is uniform on
$\mathbb{Z}_P$ (Theorem 2). The formula is verified against brute-force
enumeration of every window position at two levels. Two consequences: certified
Chebyshev bounds showing that all but a vanishing fraction of windows of
"zone length" $L = p_{n+1}^2$ contain a twin candidate, and the measurement of
a strictly sub-Poisson variance whose ratio to the mean follows an empirical
scaling law in the window exponent. Section 7 restricts the correlation to two
of the three mod-30 houses and evaluates it on the diagonal $L = W = x\#$,
$y \approx \sqrt{W}$, at nine exact levels reaching $W = 7.4\times10^{12}$.

The limit of that ratio is the note's open question, and it stays open. What
§§8–11 add is a decomposition of it. On the diagonal
$\operatorname{Var}/\mathbb{E} = \delta X$ exactly, with
$\delta \ln^2 W \to 16C_2e^{-2\gamma}/3 = 1.109905$ and with the
Montgomery–Soundararajan main term of $X$ equal to $L$ prime by prime, so all
of the ratio is a discrepancy (§8, proven). A decoupled model of the
discrepancy has its own limit, and that limit is a theorem: the model's
conductor law converges to the generalized Dickman law $GD(2)$ and its value
converges to $\lambda_2(u) = \Pr[GD(2) > u]$ with no correction term, giving
the closed form $\lambda_2(2) = 1 - e^{-2\gamma}(9/2 - 4\ln 2) = 0.45546$ at
the diagonal exponent (§9, proven). At one excluded class per prime the same
construction returns Gorodetsky's $\lambda(u)$ as an identity, where the
corresponding asymptotic is published. That the true variance shares the
model's limit is **conjectured, not proven** (§10): the replacement error is
measured at eight exact levels, falling to $1.000471$ at $x = 31$, two of its
three lag groups are closed unconditionally, and the third reduces to a
statement about $y$-smooth divisors of $C(C^2-4)$ that we have not searched in
its owning convention. Section 11 records that the earlier fitted reading
$0.611$ is refuted as an inference: a control sequence with a known, different
limit passes both halves of the protocol that produced it.

## 1. Setup

Fix $n \ge 2$ and write $P = P_n\# = \prod_{p\le p_n} p$. For every odd prime
$p \le p_n$ the condition $\gcd(r(r+2), p) = 1$ excludes exactly the two
residue classes $r \equiv 0$ and $r \equiv -2 \pmod p$; for $p = 2$ the two
classes coincide and exclude the even residues. By the Chinese Remainder
Theorem,

$$|A| \;=\; \prod_{2 < p \le p_n} (p-2), \qquad
\delta \;:=\; \frac{|A|}{P} \;=\; \frac{1}{2}\prod_{2<p\le p_n}\frac{p-2}{p}.$$

The count $|A|$ is classical (Schemmel's totient of 1869 evaluated at the
primorial; OEIS A059861). Throughout, indices on $\mathbb{Z}_P$ are cyclic and
$\mathbf{1}_A$ denotes the indicator of $A$.

For $t \in \mathbb{Z}_P$ and a window length $1 \le L \le P$, define

$$N_L(t) \;=\; \sum_{j=0}^{L-1} \mathbf{1}_A(t+j).$$

We study the mean, and above all the variance, of $N_L$ when $t$ is uniform on
$\mathbb{Z}_P$.

## 2. The pair correlation

**Theorem 1.** For $d \in \mathbb{Z}$, let
$J(d) = \frac{1}{P}\,\#\{r \in \mathbb{Z}_P : r \in A,\; r+d \in A\}$.
Then

$$J(d) \;=\; \prod_{p \le p_n} \frac{\rho_p(d)}{p},$$

where $\rho_2(d) = 1$ if $d$ is even and $0$ if $d$ is odd, and for odd $p$:

$$\rho_p(d) \;=\;
\begin{cases}
p-2, & d \equiv 0 \pmod p,\\
p-3, & d \equiv \pm 2 \pmod p,\ p \nmid d,\\
p-4, & \text{otherwise.}
\end{cases}$$

(For $p = 3$ every residue of $d$ falls into the first two cases, so the value
$p - 4 = -1$ never occurs; indeed $J(d) = 0$ unless $6 \mid d$.)

*Proof.* The event $r \in A \wedge r+d \in A$ says that for every prime
$p \le p_n$, the residue $r \bmod p$ avoids the set
$S_p(d) = \{0,\,-2,\,-d,\,-d-2\} \bmod p$. By CRT the conditions at distinct
primes are independent and the number of admissible residues modulo $p$ is
$p - |S_p(d)|$, so $J(d) = \prod_p (p - |S_p(d)|)/p$. It remains to compute
$|S_p(d)|$.

For $p = 2$: $0 \equiv -2$ and $-d \equiv -d-2$, so $S_2(d) = \{0, d\} \bmod
2$, of size $1$ if $d$ is even and $2$ (all of $\mathbb{Z}_2$) if $d$ is odd.

For odd $p$, the four listed elements can only collide as follows:
$0 \equiv -d$ and $-2 \equiv -d-2$ both hold iff $p \mid d$ (two collisions,
$|S_p| = 2$); $-2 \equiv -d$ iff $d \equiv 2$, and $0 \equiv -d-2$ iff
$d \equiv -2 \pmod p$ (one collision each, $|S_p| = 3$; the two cannot occur
together unless $p \mid 4$); $0 \equiv -2$ and $-d \equiv -d-2$ are impossible.
With no collision $|S_p| = 4$. $\square$

Note the sign structure: writing $J(d) = \delta^2\, W(d)$, the local factor of
$W$ at an odd prime is $p/(p-2) > 1$ when $p \mid d$, $p(p-3)/(p-2)^2 > 1$
when $d \equiv \pm 2$, and $p(p-4)/(p-2)^2 = 1 - 4/(p-2)^2 < 1$ generically.
$W$ is the finite-level, two-class analogue of the Hardy–Littlewood singular
series.

**Lemma (sum rule).** $\sum_{d \bmod P} J(d) = \delta^2 P$, and hence
$\sum_{d \ne 0} \big(J(d) - \delta^2\big) = -\,\delta(1-\delta)$, exactly.

*Proof.* $\sum_d \#\{r: r \in A, r+d \in A\} = |A|^2$, since every ordered
pair $(r,s) \in A^2$ is counted once, at $d = s - r$. The second identity
follows from $J(0) = \delta$. $\square$

The sum rule says the total off-diagonal anticorrelation exactly balances the
diagonal: consistently, the full-period window $L = P$ has variance $0$
(the count is deterministic).

## 3. The exact variance

**Theorem 2.** For $1 \le L \le P$ and $t$ uniform on $\mathbb{Z}_P$,

$$\mathbb{E}[N_L] = \delta L, \qquad
\operatorname{Var}[N_L] \;=\; \sum_{|d| < L} \big(L - |d|\big)\,\big(J(d) - \delta^2\big).$$

*Proof.* Linearity gives the mean. For the second moment,
$\mathbb{E}[N_L^2] = \sum_{0\le i,j<L} \Pr[t+i \in A,\ t+j \in A]
= \sum_{i,j} J(j-i)$, by stationarity of the uniform shift. The difference
$j - i$ takes each value $d$ with $|d| < L$ exactly $L - |d|$ times, and
$J(-d) = J(d)$ (substitute $r \mapsto r + d$). Subtracting
$(\mathbb{E}N_L)^2 = \delta^2 L^2 = \sum_{|d|<L}(L-|d|)\,\delta^2$ gives the
claim. (Since $L \le P$, distinct $d$ are distinct residues.) $\square$

The formula is a finite sum of $2L-1$ terms, each a product of $\pi(p_n)$
rational local factors: **exactly computable** at any level, no error term.

**Verification.** At $(p_n, L) = (13, 17^2)$ and $(17, 19^2)$, enumerating all
$P$ window positions (30{,}030 and 510{,}510 respectively) gives variances
$2.3596$ and $2.8416$; the formula returns the same values to $10^{-6}$, and
at both levels *no window of zone length is empty at all*
(`research/06-variance-theorem.js`).

## 4. Certified occupancy: almost all windows contain a twin candidate

**Corollary.** The fraction of $t \in \mathbb{Z}_P$ with $N_L(t) = 0$ is at
most $\operatorname{Var}[N_L]/(\delta L)^2$ (Chebyshev; Cantelli sharpens to
$\operatorname{Var}/(\operatorname{Var} + \delta^2L^2)$).

Evaluating the exact formula at zone length $L = p_{n+1}^2$:

| $p_n$ | $L$ | $\mathbb{E}[N]$ | $\operatorname{Var}$ | $\operatorname{Var}/\mathbb{E}$ | empty fraction $\le$ |
|---|---|---|---|---|---|
| 13 | 289 | 14.3 | 2.4 | 0.165 | $1.16\times10^{-2}$ |
| 19 | 529 | 20.7 | 4.0 | 0.191 | $9.27\times10^{-3}$ |
| 31 | 1369 | 42.5 | 8.0 | 0.189 | $4.45\times10^{-3}$ |
| 53 | 3481 | 85.4 | 19.1 | 0.223 | $2.61\times10^{-3}$ |
| 71 | 5329 | 115.2 | 28.3 | 0.246 | $2.13\times10^{-3}$ |
| 97 | 10201 | 195.3 | 48.1 | 0.246 | $1.26\times10^{-3}$ |

Since $\mathbb{E}[N] \sim c\,p_n^2/\ln^2 p_n \to \infty$ while
$\operatorname{Var}/\mathbb{E}$ stays bounded (§6), the bound decays like
$\ln^2 p_n / p_n^2$: **for every computed level, all but a certified vanishing
fraction of zone-length windows contain a twin candidate.** This
is a statement about a uniformly random window; it says nothing about the one
anchored window $(p_n, p_{n+1}^2)$ that the twin prime conjecture needs (the
parity obstruction lives exactly there; see `research/ATTACKS.md` attacks 7–10
and the anchored-windows analysis for what replaces randomness at the origin).

## 5. Relation to prior work, and what is new

For **one** excluded class per prime (the reduced residues/totatives of $q$),
the exact interval variance is classical: Hausman–Shapiro (*Comm. Pure Appl.
Math.* 26, 1973) computed it, and Montgomery–Vaughan (*Ann. of Math.* 123,
1986) bounded all central moments at the Poisson scale, proving Erdős's
conjecture on the distribution of totatives in intervals. For $k$-tuples of
reduced residues (our setting is the pair case with the specific offset $2$),
Aryan (arXiv:1302.2296) established Montgomery–Vaughan-type moment *bounds*;
Bloom–Kuperberg (arXiv:2312.09021) sharpened the odd-moment theory. For the
closely related model of $y$-rough integers in short intervals, Gorodetsky
(arXiv:2111.00853) proved variance asymptotics exhibiting genuinely
non-Poissonian constants. The nearest one-class object to ours is Holt's signed
discrepancy $\Delta\Phi(x,p) = \Phi(x,p) - (\varphi(p\#)/p\#)\,x$ of the
$p$-rough counting function, whose extremes he tabulates through $p = 29$
(arXiv:2308.07570); whether his growth law and the fluctuation law measured
here are the same phenomenon in one and two classes is open, and neither side
has been compared against the other.

What we have not found in the literature, and offer here: **(i)** the exact,
finite-level, two-class pair-correlation and variance formulas of Theorems 1–2
stated for the primorial wheel; **(ii)** their brute-force verification and
the resulting *certified* per-level occupancy bounds of §4; **(iii)** the
measured scaling law of §6. Given how classical the ingredients are, (i) may
well be folklore-derivable; we state it because the certified corollary and
the scaling measurements require the exact finite form, not an asymptotic.
The search behind that opening sentence was run in our own wording:
`research/SEARCH-CONVENTIONS.md` §1 records no owning convention for the
two-class window variance, so the negative is uncalibrated and is offered as
such rather than as a novelty claim.

## 6. The sub-Poisson scaling law (empirical)

A Poisson process has $\operatorname{Var}/\mathbb{E} = 1$. The twin-candidate
process is strictly sub-Poisson at every computed level and window length:
the sieve's negative correlations suppress clumping. But the suppression is
**not a single constant**: it depends on the window exponent. Writing
$L = y^u$ for sieve level $y = p_n$, the exact formula gives
(`variance-note-numerics.js`, $y = 401$):

| $u$ | 0.6 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 |
|---|---|---|---|---|---|---|
| $\operatorname{Var}/\mathbb{E}$ | 0.845 | 0.685 | 0.477 | 0.290 | 0.157 | 0.076 |

with the $y = 199$ values within $0.02$ throughout. Two empirical regularities:

1. $\ln(\operatorname{Var}/\mathbb{E}) \approx -(c_2 u^2 + c_1 u)$ with
   $c_2 \approx 0.24$, $c_1 \approx 0.13$ at $y = 401$, Gaussian-in-$u$
   decay with the correct normalization $\operatorname{Var}/\mathbb{E} \to 1$
   as $u \to 0$.
2. At the zone exponent $u = 2$ the ratio **rises slowly with the level**:
   $0.251,\ 0.281,\ 0.290,\ 0.303,\ 0.307,\ 0.317,\ 0.321$ for
   $y = 97,\ 199,\ 401,\ 797,\ 1009,\ 1499,\ 2003$.

Point 2 is a correction to an earlier claim of this project: the
"sub-Poisson $\approx 0.2$ constant" reported from levels $p_n \le 97$ is not
a constant. It drifts upward over the computed range. The object that carries
the drift to deep levels is the comb-restricted diagonal of §7, where nine
exact points are available; the reader who wants the current state of the open
question should read §§8–11 rather than extrapolating this table.

**Open question:** does $\lim_{y\to\infty} \operatorname{Var}/\mathbb{E}$ at
fixed $u$ exist, and what is it? It is still open, and §§8–11 report what has
been settled around it rather than an answer. Three things have moved since
this section was written. First, the Montgomery–Soundararajan route named here
does not transfer as named: the main term its machinery extracts is exactly
$L$ in this problem, prime by prime, so the whole of
$\operatorname{Var}/\mathbb{E}$ is a discrepancy term and there is no main term
left to compute (§8). Second, the Gorodetsky route does transfer, and at one
excluded class per prime it is an identity rather than an analogy (§9). Third,
a decoupled model of the discrepancy now has a proven limit,
$\lambda_2(u) = \Pr[GD(2) > u]$, worth $0.45546$ at $u = 2$ (§9), while the
identification of the true variance with that model stays conjectural (§10).
So the open question has one named unproven step in place of an empty page,
and the note's main unfinished business is that step.

## 7. The comb-restricted correlation, and the diagonal window

Theorem 1's proof is indifferent to which admissible classes we keep modulo
the small primes. Restricting to the two classes $11, 17 \pmod{30}$ (the
Natal@5 comb: two of the three mod-30 houses of twin candidates, carrying two
thirds of the census) gives the working correlation of the anchored programme.

**Corollary 3 (comb-restricted pair correlation).** Fix a sieve level $y$ and
let $M = \prod_{p \le y} p$. Put

$$A_5 = \{\, r \in \mathbb{Z}_M : r \equiv 11 \text{ or } 17 \ (\mathrm{mod}\ 30),\ \
r \bmod p \notin \{0, -2\} \ \text{ for every prime } 7 \le p \le y \,\},$$

so that $\delta = |A_5|/M = \tfrac{2}{30}\prod_{7 \le p \le y}(1 - 2/p)$. Then
the pair correlation $J_5(d) = \frac{1}{M}\#\{r : r \in A_5,\ r + d \in A_5\}$
factors as

$$J_5(d) \;=\; \frac{\rho_{30}(d)}{30} \prod_{7 \le p \le y} \frac{\rho_p(d)}{p},
\qquad
\rho_{30}(d) = \begin{cases} 2, & d \equiv 0 \pmod{30},\\
1, & d \equiv \pm 6 \pmod{30},\\ 0, & \text{otherwise,}\end{cases}$$

with $\rho_p$ exactly as in Theorem 1.

*Proof.* Identical to Theorem 1 at the primes $7 \le p \le y$. At the modulus
$30$ the comb has two teeth, so $\rho_{30}(d)$ counts the teeth $r$ with
$r + d$ also a tooth: both when $30 \mid d$, one when $d \equiv \pm 6$ (the
teeth are $6$ apart), none otherwise. $\square$

The comb kills every gap class outside $d \equiv 0, \pm 6 \pmod{30}$, which is
why the correlation sum is a sum over one class in ten rather than over all
$d$, and it is also the source of an exact cancellation used elsewhere in the
programme: the first five correlation lags vanish identically, so the
adjacent-window correlation constant is $-1/2$ with no error term
(`research/natal-cap-26-minus-half.md`, Theorem 2).

**The sum rule, verified exactly.** The local sums are
$S_{30} = 4/30 = 2^2/30$ (one residue class at $d \equiv 0$ carrying $2/30$,
two at $d \equiv \pm 6$ carrying $1/30$ each) and
$S_p = \big((p-2) + 2(p-3) + (p-3)(p-4)\big)/p = (p-2)^2/p$. Hence
$M \prod_i S_i = \delta^2 M^2$ identically, which is the sum rule of §2 for
$A_5$, and it has been checked in exact BigInt arithmetic at $y = 13, 47, 101$
(`research/natal-cap-16-fast-variance.js`, Part 1). Equivalently
$\operatorname{Var}[N_M] = 0$: a whole-period window always holds exactly
$|A_5|$ comb members. All variance at $L < M$ is truncation variance.

**The diagonal.** The window length that the twin problem actually asks about
is $L = W = x\#$ with sieve level $y = $ the largest prime $\le \sqrt{W}$, so
that $u = \ln L / \ln y = 2$ in the limit, and $2.0847$, $2.0116$, then
$2.000x$ from $x = 13$ up, at the computed levels
(`research/history/staging/redteam-0828-varE.js`; the earlier reading "$= 2$
exactly" was wrong, since $y$ is the largest prime *below* $\sqrt{W}$, and
from $x = 13$ up the coordinate error moves the limit function $\lambda_2$ of
§9 by less than $0.001$). The diagonal is §6's zone exponent, evaluated at
levels far beyond the reach of the $y \le 2003$ table. Nine exact points, each
computed by the product-sieve route (the direct $O(W \cdot \pi(y))$ sum is
months of compute at the deepest levels; the sieve is
$\approx 0.3\,W \ln\ln\sqrt{W}$ and reproduces the direct values inside their
certified bars wherever both exist):

| $x$ | $W$ | $\mathbb{E}[N_W]$ | $\operatorname{Var}$ | $\operatorname{Var}/\mathbb{E}$ |
|---|---|---|---|---|
| 7  | 210               | 6.92            | 1.05          | 0.1521 |
| 11 | 2,310             | 39.27           | 10.06         | 0.2563 |
| 13 | 30,030            | 304.28          | 91.13         | 0.2995 |
| 17 | 510,510           | 3,245.51        | 1,060.54      | 0.3268 |
| 19 | 9,699,690         | 41,441.19       | 14,392.59     | 0.3473 |
| 23 | 223,092,870       | 669,028.80      | 243,740.37    | 0.3643 |
| 29 | 6,469,693,230     | 14,063,617.40   | 5,307,862.63  | 0.3774 |
| 31 | 200,560,490,130   | 328,601,798.62  | 127,363,168.00| 0.3876 |
| 37 | 7,420,738,134,810 | 9,377,228,928.8 | 3,711,451,136 | 0.3958 |

Certified roundoff bars: $\pm 3.1\mathrm{e}{-3}$ at $x = 23$, $\pm 1.4$ at
$29$, $\pm 7.4\mathrm{e}2$ at $31$, $\pm 8.2\mathrm{e}5$ at $37$ (relative to
$\operatorname{Var}$: $1.3\mathrm{e}{-8}$, $2.6\mathrm{e}{-7}$,
$5.8\mathrm{e}{-6}$, $2.2\mathrm{e}{-4}$).

The nine points are the note's deepest data, and what follows is an analysis of
them rather than more of them. The tenth level, $x = 41$, costs roughly forty
times the last one and is out of reach of the current engine. Section 10 records what
it would and would not decide.

## 8. The spectral form of $\operatorname{Var}/\mathbb{E}$ on the diagonal

Everything in this section is proven, and none of it produces a constant. It
says where the constant has to come from. The producer is
`research/history/staging/varE-asymptotic.js`, and the nine points of §7 are
read rather than recomputed. Notation, once: $W(d)$ with an argument is the singular-series
factor of §2, and $W = x\#$ without one is the window length of §7.

**The normalisation.** Since $\sum_{|d|<L}(1 - |d|/L) = L$ identically,
Theorem 2 in the comb's variables reads

$$\frac{\operatorname{Var}}{\mathbb{E}} \;=\; \delta\,X(L),
\qquad X(L) \;:=\; \sum_{|d|<L}\Big(1 - \frac{|d|}{L}\Big)\big(W(d) - 1\big) \;\ge\; 0,
\qquad W(d) = \frac{J_5(d)}{\delta^2}.$$

The sum rule gives $X(M) = 0$, so $X(L)$ is exactly the off-diagonal
cancellation that a window of length $L$ fails to collect. At $x = 7$ brute
force over all $30030$ rotations returns $\operatorname{Var} = 1.05282410$ and
both Theorem 2 and this restatement reproduce it to $2\times10^{-16}$. The nine
levels give $X = 4.61,\ 15.08,\ 29.56,\ 51.40,\ 81.29,\ 121.48,\ 173.62,\
236.57,\ 313.22$, a column carrying four figures because it is divided out of a
$\operatorname{Var}/\mathbb{E}$ column printed to four decimals.

**Proposition 4 (the density half).** On the diagonal,
$\delta \ln^2 W \to \kappa := 16\,C_2\,e^{-2\gamma}/3 = 1.109905$, with $C_2$
the twin prime constant. Hence $\lim \operatorname{Var}/\mathbb{E}$ exists if
and only if $\lim X/\ln^2 W$ does, and the two differ by exactly $\kappa$.

*Proof.* $\prod_{2<p\le y}(1-2/p) = \big[\prod_{2<p\le y}\frac{1-2/p}{(1-1/p)^2}\big]\big[\prod_{2<p\le y}(1-1/p)\big]^2 \sim C_2\,(2e^{-\gamma}/\ln y)^2$
by Mertens. The comb's small primes give $\delta = \frac13\prod_{2<p\le y}(1-2/p)$,
and $\ln y = \frac12\ln L\,(1+o(1))$ on the diagonal. $\square$

Measured $\delta\ln^2 W$ at the nine levels: $0.9426$, $1.0198$, $1.0770$,
$1.0982$, $1.1058$, $1.1082$, $1.1093$, $1.1096$, $1.1098$, monotone from below
and $9.2\times10^{-5}$ short of $\kappa$ at $x = 37$. So the target is a single
coefficient in front of $\ln^2 W$, and the density side contributes no
uncertainty to it: $\lim \operatorname{Var}/\mathbb{E} = c$ says exactly
$X \sim (c/\kappa)\ln^2 W$.

**Proposition 5 (the main term is exactly $L$).** Write
$f_p(d) = p\rho_p(d)/(p-2)^2$ for $7 \le p \le y$, so that
$W(d) = \frac{30}{4}\rho_{30}(d)\prod_p f_p(d)$, and factor out the generic
value:

$$f_p(d) = a_p\Big[1 + \frac{2\cdot\mathbf 1[p\mid d] + \mathbf 1[p \mid d-2] + \mathbf 1[p\mid d+2]}{p-4}\Big],
\qquad a_p = 1 - \frac{4}{(p-2)^2}.$$

Expanding over squarefree conductors and keeping the leading term of each, the
total leading term of $\sum_{|d|<L}(1-|d|/L)W(d)$ is
$L\prod_{7\le p\le y}\big(1 + \frac{4}{p(p-4)}\big)\big(1 - \frac{4}{(p-2)^2}\big)$,
and every factor is $1$:

$$\Big(1 + \frac{4}{p(p-4)}\Big)\Big(1 - \frac{4}{(p-2)^2}\Big)
= \frac{(p-2)^2}{p(p-4)}\cdot\frac{p(p-4)}{(p-2)^2} = 1 .$$

*Proof.* The displayed identity is $p(p-4) + 4 = (p-2)^2$, which is the sum
rule of §2 read one prime at a time. The three indicators are mutually
exclusive for $p \ge 7$, so the expansion is a partition of the conductor
classes and carries no cross terms. $\square$

Consequence, and it is the reason one named route does not open. The
singular-series averages of Montgomery–Soundararajan work by extracting an
asymptotic main term of the form $H - \frac12\ln H + O(1)$; here the
corresponding main term is not asymptotic but exact, so
$\sum_{|d|<L}(1-|d|/L)W(d) = L + X(L)$ with nothing left for that machinery to
compute. All of $\operatorname{Var}/\mathbb{E}$ is accumulated discrepancy of
the conductor classes. The identity was re-checked over $1{,}117{,}922$ primes
with zero failures (`research/history/staging/redteam-0828-varE.js`).

**Lemma 6 (which conductors can contribute).** With $K_L$ the Fejér kernel and
$r_q = L \bmod q$,

$$\sum_{\nu \ne 0 \bmod q} K_L(\nu/q) \;=\; \frac{r_q\,(q - r_q)}{L}.$$

*Proof.* $\frac1q\sum_{\nu \bmod q} K_L(\nu/q) = \sum_{|d|<L,\ q \mid d}(1-|d|/L)$,
and summing that arithmetic progression gives $[L + r_q(q-r_q)/L]/q$; subtract
$K_L(0) = L$. $\square$

Two corollaries, both used in §9. If $q \mid L$ then $r_q = 0$ and the
conductor contributes exactly zero. The diagonal takes $L = x\#$, so **every
conductor built only from primes $p \le x$ is inert**, and those primes carry
$0.875, 0.763, \ldots, 0.539$ of the Mertens mass at $x = 7 \ldots 37$. And the
single-prime band is bounded by $O(\delta\,\pi(y)/L)$, measured
$1.1\times10^{-11}$ at $x = 37$ against $\operatorname{Var}/\mathbb{E} = 0.3958$,
so the whole ratio lives in conductors with many prime factors and no low-order
truncation of the spectral sum reaches it.

**One repair, refuted.** The standard next move is to keep the conductor sum
only for $q \lesssim L$ and treat the tail as lost. With
$u(q) = 4^{\omega(q)}/\prod_{p\mid q}(1-4/p)$ and
$\sum_{q\le Q}u(q) \asymp Q\ln^3 Q$ that model predicts $X \asymp \ln^3 W$.
Measured $X/\ln^3 W$ reads $0.0324, 0.0270, 0.0226, 0.0195, 0.0171, 0.0151,
0.0134, 0.0120$ over $x = 11 \ldots 37$: falling by a factor $2.7$ and still
falling, so the model is refuted. In the same range $X/\ln^2 W$ rises and
$X/(\ln^2 W\ln\ln W)$ falls, which brackets $X$ strictly between $\ln^2 W$ and
$\ln^2 W \ln\ln W$ on the computed levels. The overshoot is a full logarithm,
and it is the price of the positive expansion above having thrown away the
signs. Section 9 recovers the missing logarithm as one factor per prime.

## 9. A decoupled model, and its limit theorem

This section proves a limit theorem about a model. Whether the model has the
same limit as $\operatorname{Var}/\mathbb{E}$ is §10's conjecture, and nothing
here settles it. The producers are
`research/history/staging/varE-spectral.js` (the model, the closed form, the
$\theta = 1$ identity) and `research/history/staging/varE-limit-theorem.js`
(the three bands, exact at nine levels).

**The replacement.** In the Fourier form of $X$, the local coefficient at a
nonzero frequency is $\hat f_p(\nu) = |1 + e(2\nu/p)|^2/(p-2)^2$, which ranges
over $[0, 4/(p-2)^2]$ with mean

$$m_p \;:=\; \frac{1}{p-1}\sum_{\nu\ne0}\hat f_p(\nu) \;=\; \frac{p - \alpha_p}{\alpha_p(p-1)},$$

$\alpha_p$ being the number of comb classes surviving at $p$
($\alpha_2 = \alpha_3 = 1$, $\alpha_5 = 2$, $\alpha_p = p-2$ for $p \ge 7$).
**Decoupling** means replacing $\hat f_p(\nu)$ by $m_p$ at every $\nu \ne 0$.
Two facts about the step, before anything is built on it. It is an identity
when one class is excluded per prime, since $\hat f_p$ is then constant in
$\nu$. And it is exactly the mean-against-maximum accounting that recovers the
logarithm §8 lost: bounding by the maximum carries weight $4^{\omega(q)}$ and
gives $\ln^3 W$, while the mean carries $2^{\omega(q)}$ and gives $\ln^2 W$.

**The model.** Write $\Omega = \{0,1\}^{\{p \le y\}}$ with the product measure
under which the coordinate at $p$ is $1$ with probability
$\pi_p = (p-\alpha_p)/(p-1)$, independently, so $\pi_2 = \pi_3 = 1$,
$\pi_5 = 3/4$ and $\pi_p = 2/(p-1)$ for $p \ge 7$. Let $n$ be the product of
the primes whose coordinate is $1$, a squarefree $y$-smooth integer divisible
by $6$, and put

$$g(n) \;=\; \Big\{\frac{L}{n}\Big\}\Big(1 - \Big\{\frac{L}{n}\Big\}\Big)\frac{n}{L},
\qquad \delta X_{\rm dec} \;:=\; \mathbb{E}[g(n)].$$

Under the replacement, expanding the product over the subset of primes where
the coefficient is not flattened and applying Lemma 6 with $n = M/e$ turns the
spectral sum into $\frac1L\mathbb{E}[r_n(n-r_n)]$; size-biasing by $n$
preserves independence and carries the inclusion probability from $m_p$ to
$\pi_p = m_p\alpha_p$, which is the display above. Two identities fall out and
are used below: $\mathbb{E}[n] = \prod_{p\le y}p/\alpha_p = 1/\delta$, and its
dual $\mathbb{E}[1/n] = \prod_{p\le y}\alpha_p/p = \delta$, the latter checked
to $2.4\times10^{-15}$ at all nine levels. Lemma 6's inert conductors are
automatic here: $n \mid L$ forces $\{L/n\} = 0$, and in fact $g(n) = 0$ if and
only if $n \mid L$.

Write $D_y = \ln n/\ln y$ and $u_y = \ln L/\ln y$, so that $n > L$ if and only
if $D_y > u_y$.

**Theorem 7.** For every fixed $s > 0$,

$$\ln \mathbb{E}\big[e^{-sD_y}\big] \;=\; 2\int_0^1 \frac{e^{-sw}-1}{w}\,dw \;+\; O_s\!\Big(\frac{\ln\ln y}{\ln y}\Big),$$

and consequently $D_y \to GD(2)$ in distribution, the generalized Dickman law
of index $2$.

*Proof.* Put $w_p = \ln p/\ln y \in (0,1]$ and $\phi_p = e^{-sw_p} - 1$, so
that $\mathbb{E}[e^{-sD_y}] = \prod_{p\le y}(1 + \pi_p\phi_p)$ with every
factor positive.

(i) *Linearisation.* $|\pi_p\phi_p| \le 1/3$ for $p \ge 7$, and
$|\pi_p\phi_p| \le s\ln 5/\ln y \le 1/2$ for $p \in \{2,3,5\}$ once
$\ln y \ge 2s\ln 5$, so every factor admits $\ln(1+z) = z + O(z^2)$. Since
$\sum_p (\pi_p\phi_p)^2 \le 3(s\ln5/\ln y)^2 + (s^2/\ln^2 y)\sum_{p\ge7}4\ln^2p/(p-1)^2
= O_s(1/\ln^2 y)$, we get
$\ln\mathbb{E}[e^{-sD_y}] = \sum_p \pi_p\phi_p + O_s(1/\ln^2 y)$.

(ii) *The exact $\pi_p$ against the rate $2/p$.* Write $\pi_p = 2/p + \epsilon_p$,
so $\epsilon_p = 2/(p(p-1))$ for $p \ge 7$ and $|\epsilon_p| \le 1$ for
$p \in \{2,3,5\}$. With $|\phi_p| \le \min(1, sw_p) \le s\ln p/\ln y$,
$|\sum_p \epsilon_p\phi_p| \le (s/\ln y)\sum_p|\epsilon_p|\ln p = O_s(1/\ln y)$,
the tail converging. This is the only place the value $2$ enters, and it enters
as a convergent sum: the deviation of the model's inclusion rate from $2/p$ is
summable against $\ln p$ and cannot move the limit.

(iii) *Mertens.* Fix $t_0 = 3$. The primes below $t_0$ contribute
$O_s(1/\ln y)$. Above $t_0$, write $\sum_{p\le t}1/p = \ln\ln t + M + r(t)$
with $|r(t)| \le c/\ln t$ unconditionally, and $\phi(w) = e^{-sw}-1$. Then
$\sum_{t_0<p\le y}\phi(\ln p/\ln y)/p$ splits as
$\int_{t_0}^y \phi(\ln t/\ln y)\,\frac{dt}{t\ln t} + \int_{t_0}^y \phi(\ln t/\ln y)\,dr(t)$.
The substitution $w = \ln t/\ln y$ turns the first into
$\int_0^1\phi(w)\,dw/w + O(s/\ln y)$, since $|\phi(w)| \le sw$ near $0$.
Integration by parts turns the second into boundary terms $O(1/\ln y)$ plus
$(s/\ln y)\int_{t_0}^y (c/\ln t)\,dt/t = O(s\ln\ln y/\ln y)$.

(iv) *Identification.* $\exp\big(\theta\int_0^1(e^{-\lambda x}-1)\,dx/x\big)$ is
the Laplace transform of $GD(\theta)$, whose density is
$p_\theta = e^{-\theta\gamma}\varrho_\theta/\Gamma(\theta)$, where
$\varrho_\theta(x) = x^{\theta-1}$ on $(0,1]$ and
$x\varrho_\theta' + (1-\theta)\varrho_\theta + \theta\varrho_\theta(x-1) = 0$
beyond ($\varrho_1$ is Dickman's function; the letter is distinct from
Theorem 1's $\rho_p$),
whose mean is $\theta$, and which satisfies $p_\theta(x) \le C_\theta/\Gamma(x+1)$
for $x \ge 1$ (Pinsky, arXiv:1611.07207v3, pp. 2–3). Convergence of Laplace
transforms of non-negative random variables on $s > 0$ gives convergence in
distribution. $\square$

Two remarks. The rate is measured as well as asserted: the model's exact
transform against $GD(2)$'s at $s = 0.5, 1, 2, 4$ on all nine levels has error
times $\ln y/\ln\ln y$ bounded, which is the predicted shape and not a settled
constant. And $GD(2)$ has a bounded density, $p_2(t) = e^{-2\gamma}t$ on
$(0,1]$, with a continuous distribution function, which is what Theorem 8 uses.

**Theorem 8.** Let $y \to \infty$ with $u_y \to u > 0$. Then

$$\mathbb{E}[g] \;\longrightarrow\; \Pr[GD(2) > u] \;=:\; \lambda_2(u),$$

with no correction term: the transition region $n \asymp L$, where $g$ is
neither $0$ nor $1$, contributes nothing in the limit.

*Proof.* Read the three bands off $g(n) = \{L/n\}(1-\{L/n\})n/L$. If $n \mid L$
then $g(n) = 0$ exactly. If $n > L$ then $\{L/n\} = L/n$ and $g(n) = 1 - L/n$
exactly. If $n < L$ and $n \nmid L$ then $0 < g(n) \le n/(4L)$. So with
$P_> = \Pr[n > L]$, $R = \mathbb{E}[(L/n)\mathbf 1_{n>L}]$ and
$B = \mathbb{E}[g\,\mathbf 1_{n<L}]$,

$$\mathbb{E}[g] \;=\; P_> \;-\; R \;+\; B, \qquad \text{all four exact.}$$

Since $n > L$ iff $D_y > u_y$, and $GD(2)$ has a continuous distribution
function, Theorem 7 and Pólya's theorem give $P_> \to \lambda_2(u)$. Both
remainders are dominated by
$\mathcal{M} := \mathbb{E}[\min(n/L, L/n)] = \mathbb{E}[e^{-\ln y\,|D_y - u_y|}]$,
because $R \le \mathcal{M}$ and $0 \le B \le \mathcal{M}/4$. Fix $\epsilon > 0$. On $|D_y - u_y| > \epsilon$
the integrand is at most $y^{-\epsilon} \to 0$; on $|D_y - u_y| \le \epsilon$ it
is at most $1$, and
$\limsup_y \Pr[|D_y - u_y| \le \epsilon] = \Pr[|GD(2) - u| \le \epsilon] \le 2\epsilon\sup p_2$.
So $\limsup \mathcal{M} \le 2\epsilon \sup p_2$ for every $\epsilon$, hence
$\mathcal{M} \to 0$ and both remainders vanish. $\square$

Three things this settles. The closed form omits nothing: the transition band
is a two-sided window of width $O(1/\ln y)$ in $D_y$ and dies against a bounded
limiting density, so no term is added to $\lambda_2(u)$ and none subtracted. No
local limit theorem is needed, only weak convergence and boundedness. And
nothing in either proof uses the value $\theta = 2$: step (ii) is the only place
it enters, and it enters as summability, so any excluded-class count $\theta$
gives $\lambda_\theta(u)$ by the same two arguments.

**Lemma 9 (block bound).** Let $h$ be multiplicative, supported on squarefree
integers whose prime factors lie in $[5,y]$, with $h(5) = 3$ and
$h(p) = 2/(p-3)$ for $7 \le p \le y$. Then
$\sum_{N < m \le eN} h(m) \le K(1 + \ln 2N)$ for every $N \ge 1$, with $K$
absolute and in particular uniform in $y$.

*Proof.* $h(m) \le c(m)/m$ with $c = m\,h(m)$ multiplicative, squarefree
supported, $c(5) = 15$ and $c(p) = 2 + 6/(p-3)$ for $7 \le p \le y$, so the
block is at most $N^{-1}\sum_{m\le eN}c(m)$. Let
$q_y = \mu^2\,2^{\omega}\,\mathbf 1[y\text{-smooth, coprime to }6]$; since
$\mu^2(m)2^{\omega(m)} = \sum_{ab=m}\mu^2(a)\mu^2(b)$ for squarefree $m$,
$\sum_{m\le M}q_y(m) \le \sum_{a \le M}\lfloor M/a\rfloor \le M(1+\ln M)$.
Write $c = q_y * b$; locally $\sum_k b(p^k)z^k = (1+c(p)z)/(1+2z)$, so
$b(p^k) = (-2)^{k-1}(c(p)-2)$ and
$\sum_k |b(p^k)|/p^k = |c(p)-2|/(p-2) = 6/((p-3)(p-2))$ for $7 \le p \le y$,
summable over primes, with the single prime $5$ contributing a finite factor.
Hence $\sum_m |b(m)|/m \le K_0 < \infty$ absolutely, and
$\sum_{m\le M}c(m) = \sum_{d\le M}b(d)\sum_{e\le M/d}q_y(e) \le K_0\,M(1+\ln M)$. $\square$

**Lemma 10 (local bound).** Uniformly in $T > 0$ and $y$,
$\Pr[\ln n \in (T-1, T]] \le K'(1+T)/\ln^2 y$.

*Proof.* The support is $n = 6m$ with $m$ as in Lemma 9, and the weight is
$w(6m) = C_y h(m)$ with
$C_y = \prod_{5\le p\le y}(1-\pi_p) = \frac14\prod_{7\le p\le y}\frac{p-3}{p-1}$.
Since $(p-3)/(p-1) = (1-1/p)^2\big(1 - (3p-1)/(p-1)^3\big)$ and
$\sum_p (3p-1)/(p-1)^3$ converges, Mertens gives $C_y \asymp 1/\ln^2 y$. Apply
Lemma 9 with $N = e^{T-1}/6$. $\square$

**Proposition 11 (the two transition bands).** With $L = y^{u+o(1)}$ and $u$
fixed, $R = O_u(1/\ln y)$ and $B = O_u(1/\ln y)$, hence
$\mathbb{E}[g] = \Pr[n > L] + O_u(1/\ln y)$.

*Proof.* Bin by $j \ge 0$ and use Lemma 10. For the lower band,
$\mathbb{E}[(n/L)\mathbf 1_{n<L}] \le \sum_j e^{-j}\Pr[\ln n \in (\ln L - j - 1, \ln L - j]]
\le K'(1+\ln L)\ln^{-2}y\sum_j e^{-j} = O_u(1/\ln y)$; for the upper band the
same binning gives $\sum_j e^{-j}(2 + \ln L + j)K'/\ln^2 y = O_u(1/\ln y)$. $\square$

Proposition 11 bounds the bands. It does **not** bound the model's distance
from $GD(2)$'s tail: converting Theorem 7's transform rate into a distribution
rate needs an Esseen-type inequality, and that conversion is not done here. So
the model's own rate of approach to its limit is measured and not derived.

**The constant.** At $\theta = 2$ the density is $p_2(t) = e^{-2\gamma}t$ on
$(0,1]$ and $p_2(t) = e^{-2\gamma}[t(3-2\ln t) - 2]$ on $(1,2]$, so

$$\lambda_2(2) \;=\; 1 - e^{-2\gamma}\Big(\tfrac92 - 4\ln 2\Big) \;=\; 0.45545648,$$

equivalently $\lim X/\ln^2 W = \lambda_2(2)/\kappa = 0.410$ under §10's
conjecture. The number is confirmed to $2.9\times10^{-11}$ by three independent
routes: the closed form re-derived from the Laplace transform, a Simpson solve
of the delay equation at two step sizes, and a Monte Carlo of the limit process
itself, which samples a Poisson process of intensity $2\,dw/w$ on $(0,1]$ and
so tests the normalising constant rather than assuming it
(`research/history/staging/redteam-0828-varE.js`). The tail at the other
exponents, which §6's $u$-sweep can be read against:

| $u$ | 0.6 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 |
|---|---|---|---|---|---|---|
| $\lambda_2(u)$ | 0.9433 | 0.8424 | 0.6571 | 0.4555 | 0.2820 | 0.1577 |

**The $\theta = 1$ case is Gorodetsky's, exactly.** Run the same construction
with one excluded class per prime. The decoupling replacement is then vacuous,
because $\hat f_p(\nu \ne 0) = 1/(p-1)^2 = m_p$ identically, and the model's
value is his $M(H,y)$: every $n$ is even since $\pi_2 = 1$, and writing
$n = 2n'$ turns $\mathbb{E}[\{L/n\}(1-\{L/n\})n/L]$ into
$\prod_{2<p\le y}(1-2/p)\sum_{n}g_y(n)\{H/2n\}(1-\{H/2n\})$ term by term
(Gorodetsky, *Math. Z.* **308** (2024) no. 4, Paper 59, eqs. (1.5) and (1.6),
p. 2; arXiv:2111.00853v3), checked at
$(y,H) = (13,210),\ (13,2310),\ (29,30030)$ to relative $1.7\times10^{-16}$.
Theorem 8 at $\theta = 1$ returns
$\lambda_1(u) = e^{-\gamma}\int_u^\infty \varrho_1$, which is his $\lambda(u)$,
and his (1.12) read at the page gives $\lambda(u) = 1 - e^{-\gamma}u$ on
$[0,1]$, matching our $0.663124$ at $u = 0.6$ and $0.438541$ at $u = 1$ to six
decimals. His Lemma 1.5 (p. 5) makes a primorial window his own case with no
hypotheses, and his Theorem 1.3(1) then gives the asymptotic for
$y \ge \exp((\log\log H)^{5/3+\varepsilon})$, which the diagonal satisfies. So
at one excluded class the whole chain from the exact finite-level variance to
$\lambda_1(u)$ is a published theorem about exactly this object, and Theorem 8
agrees with it there.

The value of that check to $\theta = 2$ is limited, and we state it as such:
the decoupling step is invisible at one class precisely because the local
coefficient is constant there, which says nothing about two. Nor is
$\lambda_\theta$ ours. $GD(\theta)$ is published probability, and calling
$\lambda_\theta(u) = \Pr[GD(\theta) > u]$ a new function would be wrong. What
we have not found in print, searched in the owning convention (the variance of $y$-rough integers in short intervals, Gorodetsky's; `research/SEARCH-CONVENTIONS.md` §1) is the identification of that tail with a sifted
window variance at $\theta > 1$, and the search behind that sentence is
incomplete: Gorodetsky's paper is $\kappa = 1$ throughout (checked at source,
with `tuple`, `twin`, `admissible`, `generalized`, `dimension` and `Poisson`
absent from the full text), Aryan's Lemma 1.2 is the same object at general
tuple size with an upper bound and no asymptotic, and the successor question is
owed four channels. Nothing here is claimed as new.

**The three bands, exact at nine levels.** The decomposition
$\mathbb{E}[g] = P_> - R + B$ of Theorem 8's proof is computable without
enumerating anything above $L$: the conductors $n \le L$ are enumerated one at a
time by descent over the primes, and $\mathbb{E}[1/n] = \delta$ supplies the
rest. There is no Monte Carlo in the columns below
(`research/history/staging/varE-limit-theorem.js`, 4930 s, of which 4792 s is
the $x = 37$ level; `research/varE-exact-ladder-01.js` is an independent
second route).

| $x$ | $\Pr[n \mid L]$ | $P_>$ | $R$ | $B$ | $\mathbb{E}[g]$ |
|---|---|---|---|---|---|
| 7  | 0.666666667 | 0.283333333 | 0.108197358 | 0.003056943 | 0.178192918 |
| 11 | 0.417387328 | 0.335525028 | 0.081053290 | 0.012367138 | 0.266838875 |
| 13 | 0.296671934 | 0.350725586 | 0.066478692 | 0.012344728 | 0.296591623 |
| 17 | 0.212414912 | 0.368116926 | 0.052466671 | 0.009853657 | 0.325503912 |
| 19 | 0.160547361 | 0.382620145 | 0.043864663 | 0.008044066 | 0.346799547 |
| 23 | 0.123952461 | 0.394436926 | 0.037234816 | 0.006640313 | 0.363842423 |
| 29 | 0.096758571 | 0.403580143 | 0.032052128 | 0.005616554 | 0.3771445 |
| 31 | 0.078138150 | 0.410607924 | 0.028055939 | 0.004855050 | 0.387405 |
| 37 | 0.063810103 | 0.416225089 | 0.024823834 | 0.004252203 | 0.39566 |

The last three values of $\mathbb{E}[g]$ are quoted short because $R$ is a
difference of two quantities of size $L\delta = 9.4\times10^9$ at $x = 37$ and
carries a float floor. The witness spread across two independent routes is
$7.5\times10^{-8}$, $3.2\times10^{-6}$, $1.3\times10^{-5}$ at $x = 29, 31, 37$.
Every other column is a direct sum with no cancellation and agrees between the
two routes to every printed digit, and the recomposition $P_> - R + B$ returns
$\mathbb{E}[g]$ with residual $0$ at all nine levels.

Three readings. The inert band is not a small set, carrying $6.4\%$ of the
conductor mass at $x = 37$, and it contributes exactly zero at every finite
level rather than approximately zero. The lower transition band is
$B\ln y = 0.063616, 0.064678, 0.064691, 0.063820, 0.063440, 0.063175, 0.063008$
at $x = 13 \ldots 37$: bounded, as Proposition 11 requires, and settling on
$0.0630$ against the local-density prediction $0.062729$, while its share of
$\mathbb{E}[g]$ falls from $4.2\%$ to $1.1\%$. And the model's whole distance
from its own limit is $(\lambda_2(2) - \mathbb{E}[g])\ln y = 0.817, 0.847,
0.872, 0.880, 0.884, 0.885, 0.886$ over the same levels, settling on $0.886$.
That last number is a measurement, not a derived rate, and it prices how far
the computable levels sit from the constant: $\mathbb{E}[g] = 0.45$ needs
$\ln y \approx 162$, that is $W \approx e^{325}$. No level of the present kind
comes near $0.4555$, and no measurement of the constant exists to check it
against.

**The model against the data, with no fitted parameter.** The model's only
inputs are $\alpha_p$, $y$ and $L$. Against §7's nine diagonal points the
residuals, measured minus model, are $-0.0261$ and $-0.0106$ at $x = 7, 11$,
then $+0.0029$, $+0.0013$, $+0.0005$, $+0.0005$, $+0.0003$, $+0.0002$ from
$x = 13$ to $31$, all exact on both sides, and $+0.0001$ at $x = 37$ where the
measured column's own rounding is $\pm 5\times10^{-5}$. Against §6's six-point $u$-sweep at $y = 401$, which is a
different object (the full set $A$, all three mod-30 houses), it returns
$0.8543, 0.7025, 0.4842, 0.2927, 0.1576, 0.0764$ against the note's
$0.845, 0.685, 0.477, 0.290, 0.157, 0.076$; against §6's seven-point $u = 2$
level sweep it returns $0.2541 \ldots 0.3232$ against $0.251 \ldots 0.321$. The
model is close over twenty-two points and is exact nowhere.

## 10. The identification with the true variance: conjectured, with one named gap

**Conjecture 1.** On the diagonal $L = W = x\#$, $y$ the largest prime
$\le \sqrt W$, the decoupling replacement is asymptotically harmless:

$$\delta\,\big(X(L) - X_{\rm dec}(L)\big) \;\longrightarrow\; 0 ,
\qquad\text{hence}\qquad
\lim \frac{\operatorname{Var}}{\mathbb{E}} \;=\; \lambda_2(2) \;=\; 1 - e^{-2\gamma}\Big(\tfrac92 - 4\ln2\Big) \;=\; 0.45546 .$$

This is conjectured, not proven, and it is the one step between §9's theorem
and any statement about the variance of §7's table. The chain is: link 1,
$\operatorname{Var}/\mathbb{E} = \delta X$, proven (§8); link 2, this
conjecture, open; link 3, $\delta X_{\rm dec} = \mathbb{E}[g(n)]$, proven given
the replacement (§9); link 4, $\mathbb{E}[g] \to \lambda_2(u)$, proven
(Theorem 8); link 5, the closed form, proven. Exactly one link is unproven, and
it is the one that connects the model to the arithmetic.

**What the error is, exactly.** In real space the replacement flattens
$W$ to $V(h) = C_y\prod_{p \mid h,\ 7\le p\le y}\frac{p-1}{p-3}$ with
$C_y = \prod_{7\le p\le y}\big(1 - \frac{2}{(p-1)(p-2)}\big)$, so

$$X - X_{\rm dec} \;=\; \sum_{|h|<L}\Big(1 - \frac{|h|}{L}\Big)\big(W(h) - V(h)\big),$$

a sum over shifts rather than a per-prime defect. Over $p \ge 7$ the exact $W$
splits into $3^{\omega}$ groups according to which of $p \mid h$,
$p \mid h-2$, $p \mid h+2$ each prime takes.

**Measured, exact, eight levels, no Monte Carlo**
(`research/history/staging/varE-theta2-step.js` for $x \le 23$,
`research/varE-exact-ladder-01.js` for $x = 29, 31$):

| $x$ | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|---|
| $X/X_{\rm dec}$ | 0.853427 | 0.960382 | 1.009802 | 1.003895 | 1.001448 | 1.001312 | 1.000725 | 1.000471 |
| $\delta(X - X_{\rm dec})\ln y$ | $-0.06699$ | $-0.04070$ | $+0.01498$ | $+0.00832$ | $+0.00404$ | $+0.00459$ | $+0.00309$ | $+0.00238$ |

The scaled error is bounded on every level computed and falls at every step
above $x = 23$. That excludes growth and nothing finer: it is equally
consistent with $O(1/\ln y)$ and with anything smaller. It also does not license
a coefficient. The net at $x = 31$ is a difference of two terms fifty times its
size, $+0.13347$ and $-0.13109$, and the second is still moving in the third
decimal, so $0.0046$ or $0.0024$ is a number not to quote as a constant. The
level $x = 37$ needs the real-space sieve at a priced $21{,}656$ s and was
declined.

**Two of the three groups are closed.** Both derivations are the project's own,
elementary, and have had no adversarial pass, and they are reported at that rung
(`research/history/staging/varE-theta2-proof.js`). The two pure $\pm 2$ shift
groups satisfy $|2X_2| \le 60\prod_{7\le p\le y}p(p-3)/(p-2)^2 = O(\ln y) = o(1/\delta)$
unconditionally, loose by a factor $14$ to $48$ against the measured $2X_2 = 5.3$.
The group where every prime takes $p \mid h$ is the only one whose CRT class is
zero, so Lemma 6 evaluates it verbatim with no equidistribution and no
replacement, and $\delta(X_1 - X_{\rm dec}) \to 0$ unconditionally at rate
$O((\ln\ln y)^{-1/4})$ by a monotone coupling of the two product measures plus
Kolmogorov–Rogozin anti-concentration for $\ln n$. That rate is numerically
vacuous at every computed level: its factor is $0.815$ at $x = 23$, so the
proposition explains none of the eight measured rows.

**What is left, and it is not an oscillation problem.** Every lag's
Fejér-weighted contribution is exact and elementary,

$$R_n(c) \;=\; \frac{(r-c)^+ + (r+c-n)^+ - r^2/n}{L}, \qquad r = L \bmod n,$$

Lemma 6 being its $c = 0$ case, verified to $1.71\times10^{-13}$ on 4000 random
triples and rebuilding $X(210) = 4.612929$ from 192 (modulus, class) pairs. So
the CRT-mixed lags carry no phase that averages out over the frequency
variable, there is no exponential sum to estimate, and quoting Weil here would
be a category error. What remains is a counting statement. Writing $C$ for the
integer representative of the active lag and
$w(n,C) = D_y\prod_{p \mid n}(2\ \text{or}\ 1)/(p-4)$ according as $p \mid C$ or
$p \mid C \mp 2$, the estimate that would close Conjecture 1 is

$$\sum_{0<|C|<L}\Big(1-\frac{|C|}{L}\Big)\!\!\sum_{\substack{n \mid C(C^2-4),\ n > 2L\\ P^+(n) \le y}}\!\! w(n,C)
\;=\; L\sum_{n>2L}\sum_{c\ne0}\frac{w(n,c)}{n} \;+\; O\big(\ln y \cdot o(\ln y)\big),$$

that is: the weighted count of large $y$-smooth divisors of $C(C^2-4)$ agrees
with its expected count to one logarithm better than trivially, on average over
a window of length $L = y^2$. The owning conventions for that are the
distribution of divisors of a polynomial value in a dyadic range: Ford's
$H(x,y,z)$, Hooley's $\Delta$-function, and the Erdős multiplication-table
problem, applied to the reducible cubic $C(C-2)(C+2)$ with a smoothness
constraint at $u = 2$. **We have not run that search.** Until it is run, the
reduction is not claimed as new, and the honest prior is against the estimate
being available at the precision needed, since the same one-logarithm gap is
usually the whole difficulty in divisor problems of this shape.

One route through the exact kernel is already lost. The only split it offers,
flat against active, has $\delta\,|{\rm flat}|$ rising on all six levels where
it is computed, $0.559, 0.912, 0.960, 1.087, 1.188, 1.301$ against a target of
zero, so every absolute-value argument through that split fails before it
starts.

**What would falsify Conjecture 1**, and whether the check has run: a level at
which $\delta(X - X_{\rm dec})\ln y$ grows would kill it, and eight exact levels
show it bounded and falling; a proof that the replacement shifts the limit would
kill it, and none exists either way. The tenth level $x = 41$ has been priced
and declined, and by the registered forecast band it would retire one drift form
and separate nothing else.

## 11. Calibration: the fitted reading $0.611$, and why it is refuted

An earlier version of this note read the ninth level as favouring one drift law
over another and reported its intercept, $0.611$, as the value the open question
had come down to. That inference is refuted, on both halves of the protocol that
produced it, and a reader of the old version needs the reason.

The two forms were $r = 0.4435 - 1.509/\ln W$ (rms $1.8\mathrm{e}{-3}$) and
$r = 0.6106 - 0.729/\ln\ln W$ (rms $8.2\mathrm{e}{-4}$), fitted before $x = 37$
was computed. At $x = 37$ they predict $0.3926$ and $0.3955$ against the
measured $0.3958$, a factor of ten in residual, and refitting improves the
second while degrading the first. Two corrections to that account, then the
refutation. The published coefficients are the six points $x = 13 \ldots 31$ and
the seven points $x = 13 \ldots 37$, not "the first eight" and "all nine" as the
old text said; on the eight points $x = 7 \ldots 31$ the $1/\ln\ln W$ form is
the *worse* of the two. And on the six points actually used, two further
two-parameter forms fit at least as well, with intercepts $0.5387$ and $0.7219$,
while a three-parameter member of the $1/\ln W$ family fits better than all of
them with intercept $0.4642$.

The refutation is a control, not an argument. Section 9's model is a sequence
that tracks these nine points to $0.003$ and whose limit is $0.455456$ by
construction. Run the same in-sample protocol on it and $1/\ln\ln W$ wins, with
intercept $0.6164$ against $1/\ln W$'s $0.4468$: the same winner, the same
margin, and the same two numbers the data give, on a sequence whose limit is
neither. Run the frozen half, fitting on $x = 13 \ldots 31$ and forecasting
$x = 37$, and the control reproduces that too, $1/\ln\ln W$ residual $-0.00039$
against $1/\ln W$'s $+0.00276$, resolvable against the model's own
$0.395567 \pm 0.000106$. So neither the in-sample winner nor the out-of-sample
separation carries information about the limit
(`research/history/staging/redteam-0828-varE.js`). Bias-corrected against the
control the seven forms' intercepts cluster in $[0.4471, 0.4546]$ around
$\lambda_2(2)$, and that is not independent evidence either: the intercept is a
linear functional $a = \sum_i c_i y_i$ with $\sum_i c_i = 1$, so the corrected
column is bounded a priori by $\|c\|_1\max_i|{\rm data}-{\rm model}|$, and every
observed gap sits inside that bound. It restates that the model tracks the data
pointwise.

Stated plainly: this was model comparison, not measurement of a limit. Over the
entire computable range $1/\ln\ln W$ moves only from $0.295$ to $0.596$, so the
forms are separated on a short lever arm, and no finite computation of this kind
distinguishes one limit from another. Neither $0.611$ nor the $0.44$ reading is
measured here, and no value of $\lim\operatorname{Var}/\mathbb{E}$ is measured
anywhere in this note. What replaces the fitted number is the reduction of §8,
$\lim\operatorname{Var}/\mathbb{E} = \kappa\lim X/\ln^2 W$ with
$\kappa = 1.109905$ proven, together with §9's proven model limit and §10's one
open link.

## Authorship and AI disclosure

Sole author: Chris Benjaminsen.

> The framework, vocabulary, and driving questions are the author's,
> developed over six years of independent work. Formal derivations,
> literature audits, computations, and manuscript drafting were carried out
> using an AI assistant operating under the author's
> direction; all results were verified by explicit computation, with code
> and outputs published in the accompanying repository, and all refuted
> intermediate claims retained in the record.

Sections 8 to 11 were produced the same way, on 2026-08-28, and carry two
qualifications of their own. The derivations of Theorem 7, Theorem 8,
Lemma 9, Lemma 10 and Proposition 11, and both closed groups of §10, are
written out and checkable here, and each has been put against exact
computation at nine levels by the producers named at the number. None has yet
had an external referee's pass. And the earlier readings this restructure
replaces, the $0.611$ intercept of §11 and the "$u = 2$ exactly" of §7, were
both corrected by the project's own adversarial pass of the same date, whose
record is `research/history/staging/redteam-0828-varE.md`.

## References

- M. Hausman, H. N. Shapiro, *On the mean square distribution of primitive
  roots of unity*, Comm. Pure Appl. Math. 26 (1973), 539–547.
- H. L. Montgomery, R. C. Vaughan, *On the distribution of reduced residues*,
  Ann. of Math. (2) 123 (1986), 311–333.
- F. Aryan, *The distribution of k-tuples of reduced residues*, Mathematika 61
  (2015), 72–88; arXiv:1302.2296.
- T. Bloom, V. Kuperberg, *Odd moments and adding fractions*, arXiv:2312.09021.
- O. Gorodetsky, *The variance of integers without small prime factors in
  short intervals*, Math. Z. 308 (2024), no. 4, Paper No. 59;
  arXiv:2111.00853.
- R. G. Pinsky, *On the strange domain of attraction to generalized Dickman
  distributions for sums of independent random variables*,
  arXiv:1611.07207v3.
- F. B. Holt, *On the counts of p-rough numbers*, arXiv:2308.07570.
- H. L. Montgomery, K. Soundararajan, *Primes in short intervals*,
  Comm. Math. Phys. 252 (2004), 589–617.
- V. Schemmel, *Über relative Primzahlen*, J. reine angew. Math. 70 (1869);
  OEIS A059861.
- Project artifacts: `research/06-variance-theorem.js` (verification),
  `paper/variance-note-numerics.js` (scaling data), `research/PRIOR-ART.md`
  (novelty audit with sources). For §7: `research/natal5-variance.js` (the
  $J_5$ closed form and its brute-force check), `research/natal-cap-16-fast-variance.js`
  (the product-sieve engine, the BigInt sum rule, levels through $x = 31$),
  `research/natal-cap-33-overnight.js` (level $x = 37$),
  `research/natal-cap-26-minus-half.md` (the exact $-1/2$),
  `research/natal-cap-29-sigma-plateau.js` (the spectral mass). For §§8–11:
  `research/history/staging/varE-asymptotic.js` (the normalisation, $\kappa$,
  the conductor facts), `research/history/staging/varE-spectral.js` (the
  model, the closed form, the $\theta = 1$ identity),
  `research/history/staging/varE-limit-theorem.js` (the three bands, exact at
  nine levels), `research/history/staging/varE-theta2-step.js` and
  `research/history/staging/varE-theta2-proof.js` (the replacement error and
  its group split), `research/varE-exact-ladder-01.js` (the exact ratios at
  $x = 29, 31$), `research/history/staging/redteam-0828-varE.js` (the three
  routes to the constant and the fit control).
