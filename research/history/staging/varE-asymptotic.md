# The Var/E limit on the comb diagonal: the derivation attempted, and where it stops

<!-- ledger
id: Q-varE-limit
status: PARTIAL
todo: 9
question: Does lim Var/E on the diagonal window exist, and what is it?
verdict: No closed form reached; Var/E = delta X exactly with delta ln^2 W -> 1.109905 and the MS main term exactly L, so all of Var/E is discrepancy; the fitted intercept is unpinned in [0.46, 0.72], and the 0.611 reading is refuted as an inference on both halves of its protocol, the bias-corrected intercepts clustering in [0.4471, 0.4546] around the sibling's heuristic 0.455456.
-->

*Staging note, 2026-08-28. TODO item 9. Producer:
`research/history/staging/varE-asymptotic.js` (embedded, `--check` clean).
Target: `paper/variance-note.md` §6 open question and §7 diagonal. The nine
exact diagonal points are read from §7 and are not recomputed anywhere in this
pass.*

## 0. Verdict, and what failed

**No closed form reached.** Nothing here produces a candidate value for
0.6106, and nothing here should be read as evidence that 0.6106 is the limit.

Three things failed, in order of how much they cost:

1. **The Montgomery–Soundararajan route does not transfer as named.** Its
   engine is an asymptotic for a singular-series average whose main term is the
   thing being extracted. Here the main term is not asymptotic, it is *exact*:
   §3 below shows the leading term of the correlation sum is exactly $L$, with
   the cancellation holding prime by prime, so every bit of Var/E is a
   discrepancy term and the MS main-term machinery has nothing to compute.
   PROVEN (§3, one-line identity).
2. **The obvious replacement, a sharp cutoff of the conductor sum at $q\approx L$,
   is refuted by the data.** It predicts $X \asymp \ln^3 W$; measured
   $X/\ln^3 W$ falls by a factor 2.7 across the nine levels and is still
   falling. HEURISTIC prediction, REFUTED by measurement (reading 5).
3. **The one $\ln\ln$ mechanism this pass found does not pin the constant.**
   On the diagonal every prime $p \le x$ divides $L = x\#$ exactly and is inert
   (§4). Those primes carry 0.539 of the Mertens mass at $x = 37$, falling like
   $(\ln\ln x + B)/(\ln\ln y + B)$, and $\ln\ln x \approx \ln\ln\ln W$. That is
   a genuine slowly-decaying correction of roughly the right size. Fitted as a
   drift law it gives intercept 0.7198, not 0.611. MEASURED (reading 6, §5).

What did move, all of it calibration rather than progress on the constant:

- **PROVEN.** $\delta \ln^2 W \to 16 C_2 e^{-2\gamma}/3 = 1.109905$ on the
  diagonal, so $\lim \mathrm{Var}/\mathbb{E}$ exists **iff**
  $\lim X/\ln^2 W$ does, with the two limits differing by exactly that factor.
  Measured 1.109803 at $x = 37$, relative gap $9.2\times10^{-5}$.
- **PROVEN.** Two exact facts about which Fourier conductors can contribute:
  $\sum_{\nu \ne 0 \bmod q} K_L(\nu/q) = r_q(q - r_q)/L$ with $r_q = L \bmod q$,
  hence every conductor dividing $L$ contributes exactly zero, and the whole
  single-prime band is $1.1\times10^{-11}$ at $x = 37$ against Var/E = 0.3958.
- **DEFECT, in the note.** §7's "fitted to the first eight points" and
  "refitting on all nine points" do not describe the fits it publishes. The
  published numbers are the six points $x = 13..31$ and the seven points
  $x = 13..37$. On the eight points §7 names, the $1/\ln\ln W$ form is the
  *worse* of the two it compares. Reproduced below.
- **CALIBRATION.** On the set §7 actually used, two further two-parameter forms
  fit at least as well as $1/\ln\ln W$, with intercepts 0.5366 and 0.7198; a
  three-parameter member of the $1/\ln W$ family fits better than all of them
  with intercept 0.4642. §7's reading that "the open question is now a problem
  about one number" stands; its reading that the number is near 0.611 rests on
  a two-way comparison that a wider family does not respect. That second reading
  is REFUTED as an inference and not merely widened: run on a model sequence
  whose limit is 0.455456 by construction, the same protocol returns 0.6164
  in-sample and wins the frozen $x = 37$ forecast by a factor 7
  (`varE-spectral.md` §7, `redteam-0828-varE.md` §4), so neither half of §7's
  protocol estimates a limit.

## 1. The object, restated and checked

Notation follows `paper/variance-note.md` §7 (Corollary 3), not §2. Sieve level
$y$; modulus $M = \prod_{p \le y} p$; the comb

$$A_5 = \{\, r \in \mathbb{Z}_M : r \equiv 11, 17 \ (30),\ r \bmod p \notin \{0,-2\},\ 7 \le p \le y \,\},$$

density $\delta = \tfrac{2}{30}\prod_{7\le p\le y}(1 - 2/p)$, pair correlation
$J_5(d) = \frac{\rho_{30}(d)}{30}\prod_{7\le p\le y}\frac{\rho_p(d)}{p}$ with
$\rho_{30} \in \{2,1,0\}$ on $d \equiv 0, \pm 6, \text{else} \pmod{30}$ and
$\rho_p(d) = p-2,\, p-3,\, p-4$ on $p \mid d$, $d \equiv \pm2$, generic.
Write $W(d) = J_5(d)/\delta^2$, and $L = W = x\#$ with $y$ the largest prime
$\le \sqrt{L}$, so that $u = \ln L/\ln y = 2$ in the limit, and $2.0847$,
$2.0116$, then $2.000x$ from $x = 13$ up, at the computed levels
(`redteam-0828-varE.md` §2). Everything below is evaluated at the true $L$ and
$y$, so no number moves; from $x = 13$ up the coordinate error moves
$\lambda_2$ by less than 0.001.

Theorem 2 of the note gives
$\operatorname{Var}[N_L] = \sum_{|d|<L}(L - |d|)(J_5(d) - \delta^2)$. Since
$\sum_{|d|<L}(1 - |d|/L) = L$ identically, that is equivalent to

$$\boxed{\ \frac{\operatorname{Var}}{\mathbb{E}} \;=\; \delta \, X(L),
\qquad X(L) \;:=\; \sum_{|d|<L}\Big(1 - \frac{|d|}{L}\Big)\big(W(d) - 1\big) \;\ge\; 0. \ }$$

Equivalently $\operatorname{Var}/\mathbb{E} = 1 - \delta + \delta\,T(L)$ with
$T(L)$ the same sum over $d \ne 0$, since the $d = 0$ term is
$W(0) - 1 = 1/\delta - 1$. The sum rule of §2 says $X(M) = 0$, so $X(L)$ measures
how much of the off-diagonal cancellation the window of length $L$ has failed to
collect.

**Checked, not assumed.** At $x = 7$ brute force over all 30030 rotations gives
$\operatorname{Var} = 1.05282410$, matching `natal-cap-16-fast-variance.js`
PART 2d; Theorem 2 and the boxed restatement both reproduce it to
$2\times10^{-16}$, and $J_5(d)$ from Corollary 3 matches the enumerated
correlation at every $d$ (PART 0).

**The object an asymptotic has to produce.** $X = (\operatorname{Var}/\mathbb{E})/\delta$
at the nine levels: 4.61, 15.08, 29.56, 51.40, 81.29, 121.48, 173.62, 236.57,
313.22, with $X/\ln^2 W$ = 0.1614, 0.2513, 0.2781, 0.2976, 0.3141, 0.3287,
0.3402, 0.3493, 0.3566. That column carries four figures and no more (15.08
against the exact 15.073187, 51.40 against 51.400255;
`varE-theta2-step.md` §6, `redteam-0828-varE.md` §5), because it is divided out
of a $\operatorname{Var}/\mathbb{E}$ column that `variance-note.md` §7 prints to
four decimals.

## 2. The density, which is the easy half and is now proven

$\prod_{2<p\le y}(1-2/p) = \big[\prod_{2<p\le y}\tfrac{1-2/p}{(1-1/p)^2}\big]\cdot\big[\prod_{2<p\le y}(1-1/p)\big]^2
\sim C_2 \cdot (2e^{-\gamma}/\ln y)^2$, with $C_2 = \prod_{p>2}(1 - (p-1)^{-2}) = 0.6601618$
the twin prime constant, by Mertens. The comb's small primes give
$\delta = \tfrac13\prod_{2<p\le y}(1-2/p)$, and $\ln y = \tfrac12 \ln L$ on the
diagonal, so

$$\delta \,\ln^2 W \;\longrightarrow\; \kappa \;=\; \frac{16\,C_2\,e^{-2\gamma}}{3} \;=\; 1.109905 .$$

Measured $\delta\ln^2 W$: 0.9426, 1.0198, 1.0770, 1.0982, 1.1058, 1.1082,
1.1093, 1.1096, 1.1098, monotone from below, $9.2\times10^{-5}$ short at
$x = 37$. PROVEN (Mertens) and confirmed. Consequence, exact:

$$\lim \frac{\operatorname{Var}}{\mathbb{E}} \ \text{exists} \iff \lim \frac{X}{\ln^2 W} \ \text{exists},
\qquad \lim \frac{\operatorname{Var}}{\mathbb{E}} = \kappa \cdot \lim \frac{X}{\ln^2 W}.$$

So the hypothesis "$\lim = 0.6106$" is exactly the hypothesis
"$X \sim 0.550137\,\ln^2 W$", and "$\lim = 0.4435$" is
"$X \sim 0.399584\,\ln^2 W$". Whatever else is unsettled, the target is now a
single coefficient in front of $\ln^2 W$, and the $\delta$ side contributes no
uncertainty to it.

## 3. The Montgomery–Soundararajan route, carried out, and why it stops

**The brief's stated MS formula is garbled and was not used.** The brief quotes
$\sum_{h\le H}\mathfrak{S}(h) = H - \tfrac12 H\ln H + \tfrac12(1-\gamma-\ln2\pi)H + O(H^{1/2+\varepsilon})$.
That cannot be right at any rung: $\mathfrak{S}$ averages to 1 by Gallagher, so
the sum is $H(1+o(1))$, and an $H\ln H$ term of either sign would dominate it.
The published shape is $H - \tfrac12\ln H + O(1)$, one log, not $H\log H$. This
pass does not depend on which constant sits in the $O(1)$, because the analogous
main term here turns out to be exact.

**Set-up.** For $7 \le p \le y$ write $f_p(d) = p\rho_p(d)/(p-2)^2$, so
$W(d) = \tfrac{30}{4}\rho_{30}(d)\prod_p f_p(d)$. Factor out the generic value:

$$f_p(d) \;=\; a_p\Big[\,1 + \frac{2\cdot\mathbf{1}[p\mid d] + \mathbf{1}[p\mid d-2] + \mathbf{1}[p\mid d+2]}{p-4}\,\Big],
\qquad a_p = \frac{p(p-4)}{(p-2)^2} = 1 - \frac{4}{(p-2)^2}.$$

The three indicators are mutually exclusive for $p \ge 7$. Expanding over
squarefree conductors $q$ with prime factors in $[7,y]$, each prime of $q$
choosing one of the three classes with weight $2, 1, 1$, and counting $d$ in the
resulting class mod $30q$ with the triangle weight, the leading term of each
conductor is $L/(2q)$ per sign of $d$, and the total leading term is

$$C(y)\cdot L \cdot \prod_{7\le p\le y}\Big(1 + \frac{4}{p(p-4)}\Big),
\qquad C(y) = \prod_{7\le p\le y}\Big(1 - \frac{4}{(p-2)^2}\Big).$$

**The main term is exactly $L$, prime by prime.** For every $p$,

$$\Big(1 + \frac{4}{p(p-4)}\Big)\Big(1 - \frac{4}{(p-2)^2}\Big)
= \frac{(p-2)^2}{p(p-4)}\cdot\frac{p(p-4)}{(p-2)^2} = 1 .$$

PROVEN, and it is the same collapse as the note's own sum rule
$\sum_d \rho_p(d) = (p-2)^2$, seen one prime at a time. So
$\sum_{|d|<L}(1-|d|/L)\,W(d) = L + X(L)$ with no secondary main term to extract:
$X(L)$ is entirely the accumulated discrepancy of the conductor classes, and the
part of the MS method that produces $H - \tfrac12\ln H$ has nothing to act on.
This is the first place the route stops.

**The crude repair, and its refutation.** The standard next move is to keep the
conductor sum only for $q \lesssim L$ and treat the tail as lost. Writing
$u(q) = 4^{\omega(q)}/\prod_{p\mid q}(1-4/p)$, the lost tail is
$\sum_{q>L} u(q)/q^2$, and since $\sum_{q\le Q}u(q) \asymp Q\ln^3 Q$ this gives
$X \asymp \ln^3 W$. HEURISTIC. It is refuted by the exact points: measured
$X/\ln^3 W$ = 0.0324, 0.0270, 0.0226, 0.0195, 0.0171, 0.0151, 0.0134, 0.0120
across $x = 11..37$, falling by 2.7 and still falling, while
$X/(\ln^2 W \cdot \ln\ln W)$ also falls (0.1228 to 0.1052) and $X/\ln^2 W$
rises. So $X$ sits strictly between $\ln^2 W$ and $\ln^2 W \ln\ln W$, and the
sharp cutoff overshoots by a full log. Recovering $\ln^2 W$ from $\ln^3 W$
requires the signs, which the positive expansion above has thrown away. That is
the second place the route stops.

**The signed expansion, for whoever picks this up.** The cancellation is
recoverable in the Ramanujan basis. With $c_p(m)$ the Ramanujan sum,

$$W(d) - 1 = \sum_{q>1} \prod_{p\mid q} G_p(d),
\qquad G_p(d) = \frac{2c_p(d) + c_p(d+2) + c_p(d-2)}{(p-2)^2},$$

verified case by case: $G_p = 2/(p-2)$ on $p \mid d$, $(p-4)/(p-2)^2$ on
$d \equiv \pm2$, $-4/(p-2)^2$ generic, which reproduce $f_p - 1$ exactly. The
generic term is negative at every prime, and that is where the missing log
lives. Carrying this through needs the joint discrepancy
$\Delta_e(a) = \sum_{|d|<L, d\equiv a (e)}(1-|d|/L) - L/e$ summed against
$3^{\omega(e)}$ specific classes with weights $2,1,1$, which is exactly the
arithmetic MS handles for $c_q(h)$ and which is not handled here. NOT DONE.

## 4. The spectral form, and the two exact facts it does give

Fourier-expanding $f_p$ gives $\hat f_p(0) = 1$ and, for $\nu \ne 0$,
$\hat f_p(\nu) = |1 + e(2\nu/p)|^2/(p-2)^2 = (2 + 2\cos(4\pi\nu/p))/(p-2)^2 \ge 0$,
so with $K_L(\theta) = \frac1L\big|\sum_{j<L} e(j\theta)\big|^2$ the Fejér kernel,

$$\frac{\operatorname{Var}}{\mathbb{E}} \;=\; \delta \sum_{k \ne 0 \bmod M} \hat W(k)\, K_L(k/M),
\qquad \hat W(k) = \prod_{p \mid q(k)} \frac{2 + 2\cos(4\pi k_p/p)}{(p-2)^2},$$

every term non-negative, $q(k) = M/\gcd(k,M)$ the conductor, and
$K_L(k/M) = K_L(k'/q)$ where $k = (M/q)k'$.

**Not new to the corpus.** This is `natal-cap-02`'s factored spectrum, written
out again in `natal-cap-29-sigma-plateau.js` STEP 2 with the same local factors
$\mathrm{loc}_p(t \ne 0) = 4\cos^2(2\pi t/p)$ and the same CRT twist. It is
recorded here only because the two facts below fall out of it. `natal-cap-16`
reading 2 already closed spectral *certification* at scale: $M/L$ has 194188
digits at $x = 31$.

**Fact A (exact).** $\sum_{\nu \ne 0 \bmod q} K_L(\nu/q) = r_q(q-r_q)/L$ where
$r_q = L \bmod q$. Proof: $\frac1q\sum_{\nu} K_L(\nu/q) = \sum_{|d|<L, q\mid d}(1-|d|/L)$,
and summing the arithmetic progression gives $[L + r_q(q-r_q)/L]/q$; subtract
$K_L(0) = L$. Checked at six pairs (PART 5), including $L = 30030$, $q = 7$
where it returns $7\times10^{-26}$ against the predicted 0.

**Fact B (corollary).** If $q \mid L$ then $r_q = 0$ and the whole conductor
contributes exactly zero. On the diagonal $L = x\#$, so **every conductor built
only from primes $p \le x$ is inert.** Those primes carry
$\big(\sum_{p\le x}1/p\big)/\big(\sum_{p\le y}1/p\big)$ of the Mertens mass:
0.875, 0.763, 0.701, 0.653, 0.620, 0.594, 0.571, 0.554, 0.539 at $x = 7..37$.
Since $\theta(x) = \ln W$ gives $x \approx \ln W$, this share decays like
$\ln\ln\ln W/\ln\ln W$. This is the only mechanism found in the pass that puts
$\ln\ln W$ into the drift law at all, and it is a property of the diagonal's
choice $L = x\#$, not of the sieve.

**Fact C (bound).** The single-prime band is negligible: $|\hat f_p| \le 4/(p-2)^2$
and Fact A bound $q^2/4L$ give a total $O(\delta\,\pi(y)/L)$, measured
$1.1\times10^{-11}$ at $x = 37$ against Var/E = 0.3958. So the whole of Var/E
lives in conductors with many prime factors, which is why no low-order truncation
of the spectral sum reaches it, and it is consistent with `natal-cap-16`
reading 2's finding that 99% of the spectral mass at $x = 7$ needs
$K \approx 18.5\,(M/L)$.

## 5. Against the nine points

**First, a defect in what §7 says it did.** The published fits
$0.4435 - 1.509/\ln W$ (rms $1.8\mathrm{e}{-3}$) and
$0.6106 - 0.729/\ln\ln W$ (rms $8.2\mathrm{e}{-4}$) are reproduced here as
$0.4435 - 1.5085/\ln W$ (rms $1.84\mathrm{e}{-3}$) and
$0.6106 - 0.7284/\ln\ln W$ (rms $8.10\mathrm{e}{-4}$) **only on the six points
$x = 13..31$**, which is what `natal-cap-16-fast-variance.js` states
("drift fits (points x=13..31)"). §7 says "fitted to the first eight points".
On those eight points ($x = 7..31$) the fits are $0.4462 - 1.5424/\ln W$
(rms $4.22\mathrm{e}{-3}$) and $0.6347 - 0.7951/\ln\ln W$
(rms $5.25\mathrm{e}{-3}$), and the $\ln\ln W$ form is then the worse of the
two. Likewise §7's "refitting on all nine points ... $8.2 \to 7.6\mathrm{e}{-4}$,
$0.6106 \to 0.6108$" is the seven points $x = 13..37$ ($7.51\mathrm{e}{-4}$
here); all nine give $0.6321$ at rms $5.10\mathrm{e}{-3}$. The producers are
right and the prose is wrong. The 10:1 forecast separation at $x = 37$ is
unaffected: it used the frozen coefficients, whatever set produced them.

**Second, the two-form comparison is too narrow.** On the six points §7 actually
used, same protocol, same two free parameters:

| form | rms on $x=13..31$ | forecast at $x=37$ | residual | intercept |
|---|---|---|---|---|
| $a + b/\sqrt{\ln W}$ | $3.96\mathrm{e}{-4}$ | 0.3977 | $-0.0019$ | 0.5387 |
| $a + b\cdot$(inert Mertens share) | $6.67\mathrm{e}{-4}$ | 0.3968 | $-0.0010$ | 0.7219 |
| $a + b/\ln\ln W$ | $8.10\mathrm{e}{-4}$ | 0.3957 | $+0.0001$ | 0.6106 |
| $a + b/\ln W^{1/3}$ | $9.65\mathrm{e}{-4}$ | 0.3995 | $-0.0037$ | 0.6341 |
| $a + b/\ln\ln^2 W$ | $2.22\mathrm{e}{-3}$ | 0.3921 | $+0.0037$ | 0.4781 |
| $a + b/\ln W$ | $1.84\mathrm{e}{-3}$ | 0.3926 | $+0.0032$ | 0.4435 |
| $a + b\ln\ln\ln W/\ln\ln W$ | $2.99\mathrm{e}{-2}$ | 0.3599 | $+0.0359$ | 1.0108 |

Two readings, and they point opposite ways. In-sample, $1/\ln\ln W$ is third,
beaten by $1/\sqrt{\ln W}$ by a factor 2. Out-of-sample, on the frozen forecast
that §7 treats as the stronger test, $1/\ln\ln W$ wins by a factor 10 to 19 over
both. Neither reading licenses "the constant is near 0.611": the three forms
that fit at rms $\le 10^{-3}$ carry intercepts 0.5387, 0.6106 and 0.7219, and
the frozen forecast is not the stronger test it looks. Run on a model sequence
whose limit is 0.455456 by construction, the same frozen protocol (fit
$x = 13..31$, forecast $x = 37$) gives $1/\ln\ln W$ residual $-0.00039$ against
$1/\ln W$'s $+0.00276$: the same win, in the same direction, on a sequence whose
limit is neither intercept (`redteam-0828-varE.md` §4). So the out-of-sample
half carries no information about the limit either.
The bare $\ln\ln\ln W/\ln\ln W$ form is REFUTED as a drift law outright, by two
orders of magnitude of rms and by shape (it is non-monotone over the range while
$r$ is monotone), so the inert-prime mechanism of §4 does not enter the drift in
its naive form.

**Third, the derivation-shaped form is the one that fits best.** Any evaluation
of $X$ of Montgomery–Soundararajan shape returns a polynomial in $\ln W$,
$X = a\ln^2 W + b\ln W + c + \cdots$, which is
$r = \kappa(a + b/\ln W + c/\ln^2 W + \cdots)$: the $1/\ln W$ family with its own
second-order term. Fitted on the six points that gives rms
$1.80\mathrm{e}{-4}$, the best of the pass, intercept 0.4656; on the seven
points $x = 13..37$, rms $2.26\mathrm{e}{-4}$, intercept 0.4642. Three
parameters against two, so this is not a fair comparison and is not offered as
one. It is offered because §7 demotes the 0.44 reading on the strength of a
one-term $1/\ln W$ form losing to a one-term $1/\ln\ln W$ form, and the family
that a derivation would actually produce is not the one-term form.

**Fourth, $x = 41$ will not settle it.** Fitted on $x = 13..37$ and evaluated at
$W(41) = 304{,}250{,}263{,}527{,}210$: $1/\ln W$ predicts 0.39941,
$1/\ln\ln W$ 0.40296, Mertens share 0.40408, $1/\sqrt{\ln W}$ 0.40500, and the
two-term $1/\ln W$ form 0.40309. `var41-prereg.md`'s registered band is
$[0.4013, 0.4040]$. It excludes the one-term $1/\ln W$ form and includes
$1/\ln\ln W$, the Mertens-share form and the two-term $1/\ln W$ form. So the
tenth point retires exactly one of five, and it is not the $1/\ln W$ family. The
prereg's own §4a already says one more point cannot separate drift from limit;
this sharpens it to say which forms it cannot separate.

## 6. What a proof would need

In dependency order, none of it done here:

1. **A signed evaluation of $\sum_{e} \big[\prod_{p\mid e}(p-4)\big]^{-1}\sum_{s}w(s)\,\Delta_e(a_s)$**
   over squarefree $e$ with prime factors in $[7,y]$, where $\Delta_e$ is the
   triangle-weighted AP discrepancy and $a_s$ runs over the $3^{\omega(e)}$
   classes $d \equiv 0, \pm2 \bmod p$ with weights $2,1,1$. The positive
   expansion (§3) gives $\ln^3 W$; the answer is between $\ln^2 W$ and
   $\ln^2 W\ln\ln W$, so a full log of cancellation has to be extracted. This is
   the whole problem.
2. **Uniformity of that evaluation under truncation at $y$**, with $L = y^2$.
   The truncation is not a technicality here: the untruncated correlation and
   the level-$y$ one differ in the generic local factor
   ($1 - 4/(p-2)^2$ against 1), and $C(y) = \prod(1-4/(p-2)^2)$ converges to a
   constant near 0.70, so the truncation moves the *typical* value of $W$ and
   not only its tail.
3. **Tail control of the two-class local factors**, meaning the contribution of
   conductors $q$ with $\omega(q)$ large, which Fact C says is where all the
   mass is. No low-order truncation is available; `natal-cap-16` reading 2
   already recorded that spectral certification is dead for $x \ge 13$.
4. **The arithmetic of $L = x\#$ against the conductors.** Fact B is an exact
   arithmetic input peculiar to the diagonal, and any evaluation that treats
   $\{L/e\}$ as equidistributed will be wrong by the inert share, which is 0.539
   of the Mertens mass at $x = 37$.

Gorodetsky's route (arXiv:2111.00853) is untouched by this pass. It is the more
promising of the two named in §6 precisely because its object is a variance in
short intervals at fixed $u$ rather than a singular-series average, so its main
term is not the one that collapses here. Reading it against Fact B is the next
concrete step, and it has not been done.

## 7. Defects noticed in passing

- `paper/variance-note.md` §7: "fitted to the first eight points" and
  "Refitting on all nine points" misdescribe the fit sets; the published
  coefficients are the six points $x = 13..31$ and the seven points
  $x = 13..37$ (reproduced in §5 above and in the producer, reading 3).
- `paper/variance-note.md` §6's route sentence names Montgomery–Soundararajan
  for a main-term extraction that §3 above shows is exactly zero-work here; the
  sentence is not wrong about the literature, but it points the reader at the
  half of the method that does not apply.

## 8. What would falsify this, and whether the check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| $\operatorname{Var}/\mathbb{E} = \delta X$ with $X$ as boxed | PROVEN | any level where it disagrees with Theorem 2 or brute force | YES, $x = 7$, agreement to $2\mathrm{e}{-16}$ |
| $\delta\ln^2 W \to 16C_2e^{-2\gamma}/3 = 1.109905$ | PROVEN | $\delta\ln^2 W$ turning away from it | YES, nine levels, monotone, $9.2\mathrm{e}{-5}$ short at $x=37$ |
| main term of the conductor sum is exactly $L$ | PROVEN | a prime where $(1+\frac{4}{p(p-4)})(1-\frac{4}{(p-2)^2}) \ne 1$ | YES, identity, all $p$ |
| $\sum_{\nu\ne0}K_L(\nu/q) = r_q(q-r_q)/L$; $q\mid L$ inert | PROVEN | a nonzero value at $q \mid L$ | YES, six pairs incl. $(30030,7)$ |
| single-prime band negligible | MEASURED | a band total comparable to Var/E | YES, $1.1\mathrm{e}{-11}$ vs 0.3958 at $x=37$ |
| sharp-cutoff model $X \asymp \ln^3 W$ | REFUTED | $X/\ln^3 W$ settling | YES, falls 2.7x over nine levels |
| $\ln\ln\ln W/\ln\ln W$ as the drift law | REFUTED | it fitting at rms $\lesssim 10^{-3}$ | YES, rms $2.99\mathrm{e}{-2}$, wrong monotonicity |
| the intercept is not localized to 0.611 by the nine points, and 0.611 is refuted as an inference | MEASURED (control) | a control tracking the data as well and reproducing its own limit under BOTH halves of §7's protocol | YES. In-sample `varE-spectral.md` §7, frozen out-of-sample `redteam-0828-varE.md` §4; the control misses its own known limit on both |
| $x = 41$ cannot separate the surviving families | MEASURED (forward) | a measured $r(41)$ outside $[0.4013,0.4040]$ | NO. Var(41) priced and declined, TODO item 2 |
| no closed form exists for the constant | NOT A CLAIM | a closed form | n/a; this pass did not find one and does not predict one |

The one honest upgrade available from this pass is negative: the corpus should
stop quoting 0.611 as "the constant" and start quoting the reduction
$\lim \operatorname{Var}/\mathbb{E} = \kappa \lim X/\ln^2 W$ with
$\kappa = 1.109905$ proven, an intercept unpinned across $[0.46, 0.72]$, and the
$\ln^2 W$-to-$\ln^2 W\ln\ln W$ bracket on $X$ as the only thing the nine points
say about growth. Bias-corrected against the sibling's model the seven fitted
intercepts cluster in $[0.4471, 0.4546]$ (`redteam-0828-varE.md` §4), which is a
consistency check on that model and not an independent measurement.
