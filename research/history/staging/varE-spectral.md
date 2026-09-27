# The spectral form pushed to a limit: two unproven steps, a closed constant, and why 0.611 was an artefact

<!-- ledger
id: Q-varE-limit
status: PARTIAL
todo: 9
question: Does lim Var/E on the diagonal window exist, and what is it?
verdict: HEURISTIC closed form lim Var/E = Pr[GD(2) > u] = 0.45546 at u = 2 (confirmed to 2.9e-11 by three routes), TWO open steps (the theta=2 mean-coefficient replacement and the model's own limit theorem, whose n <= L band is unevaluated); the theta = 1 branch is an exact identity with Gorodetsky's (1.5)/(1.6); the published 0.611 is refuted as an inference on both the in-sample and the frozen out-of-sample protocol; HELD pending the two steps.
-->

> **RIDER 2026-08-30 (orchestrator, from `verify-0830-record-defects.md` §1.3 item 5 and
> `attack-0830-varE-identification.md`).** "TWO open steps" in this note's
> ledger and §0 reads ONE: `varE-limit-theorem.md`'s ledger states "Step 2 of
> the two is CLOSED: the decoupled model's limit is exactly Pr[GD(2) > u] with
> NO correction term", and the identification step IS the θ = 2 replacement
> error (`varE-theta2-step.md` §1). Whether that theorem survives review is
> its own HELD status.

*Staging note, 2026-08-28. TODO item 9, second pass. Producer:
`research/history/staging/varE-spectral.js` (embedded, `--check` clean, 3.2 s).
Reads `research/history/staging/varE-asymptotic.md` (the sibling pass of the
same day) and `paper/variance-note.md` §§6-7. The nine exact diagonal points
are read from `variance-note.md` §7 and are recomputed nowhere here.*

## 0. Verdict, disconfirming half first

**Two steps are unproven, and together they are the gap.** The evaluation below
replaces the local Fourier coefficient $\hat f_p(\nu)$ by its mean over the
$p-1$ nonzero frequencies, which is an identity at one excluded class and false
pointwise at two, which is the comb's case; where the error can be computed
exactly it is 15% at $x = 7$ and 4% at $x = 11$ (reading 1), and nothing here
proves it shrinks. Separately, the passage from the decoupled sum to
$\Pr[GD(2) > u]$ is a limit theorem about the model that is asserted and not
derived here: it needs the convergence of $\ln n/\ln y$ to $GD(2)$, which is
routine and unwritten, and it needs the $n \le L$ band to vanish, which §4
states as $O(1/\ln W)$ and does not evaluate. Everything downstream is
HEURISTIC and stands or falls with both.

**And no computed level reaches the constant.** The model itself sits at 0.402
at $x = 41$ against its own limit 0.4555, so the constant rests on the second
step above and not on data.

**Nothing here touches the conjecture.** Var/E is a statement about a uniformly
random window. `variance-note.md` §4 already records that this says nothing
about the one anchored window the twin problem needs.

With that said, what the pass produced:

- **PROVEN, and newly checked.** The spectral form
  $X = \sum_{\nu \ne 0 \bmod M} \hat W(\nu) K_L(\nu/M)$ reproduces the sibling's
  brute-forced $X(210) = 4.612929$ to $2.9\times10^{-7}$, but only with the CRT
  twist $\nu_p = \nu\,(M/p)^{-1} \bmod p$. Without it the sum is 4.441347 while
  the total-mass check $\sum_{\nu\ne0}\hat W = 1/\delta - 1$ still passes, so
  that check does not catch the omission (§1, reading 2).
- **PROVEN given the decoupling step.** The decoupled spectral sum collapses to a
  single expectation over a random divisor,
  $\delta X = \mathbb{E}\big[\{L/n\}(1-\{L/n\})\,n/L\big]$ with each prime
  $p \le y$ present independently with probability $(p-\alpha_p)/(p-1)$ (§3).
  Fact B falls out of it, not into it.
- **HEURISTIC.** $\lim \operatorname{Var}/\mathbb{E} = \lambda_2(u)$, the tail of
  the generalized Dickman law $GD(2)$, and at the diagonal $u = 2$
  $$\lambda_2(2) \;=\; 1 - e^{-2\gamma}\Big(\tfrac92 - 4\ln 2\Big) \;=\; 0.45545648,$$
  equivalently $\lim X/\ln^2 W = \lambda_2(2)/\kappa = 0.410$ (§5).
- **MEASURED, 22 points, no fitted parameter.** The model reproduces the nine
  diagonal points to $\le 0.0029$ for $x \ge 13$, §6's six-point $u$-sweep at
  $y = 401$ to $\le 0.018$, and §6's seven-point $u = 2$ level sweep to
  $\le 0.005$ (§6). The §6a model column is Monte Carlo; against an exact model
  column the residuals at $x = 13..23$ are $+0.00291$, $+0.00130$, $+0.00050$,
  $+0.00063$ (`redteam-0828-varE.md` §6), all positive, and at $x \ge 29$ they
  sit at the quantisation floor of the measured column. The model is close and
  is not exact.
- **REFUTED, as an inference, on both halves of the protocol.** §7's argument
  that the limit is near 0.611 because $a + b/\ln\ln W$ beats $a + b/\ln W$ does
  not survive a control. Run on the model, a sequence that tracks the measured
  data to 0.003 and whose limit is 0.455456 by construction, the same in-sample
  protocol returns intercept 0.6164 from $1/\ln\ln W$ and 0.4468 from $1/\ln W$
  on an exact model column (`redteam-0828-varE.md` §4): same winner, same
  margin, same two numbers the data give (0.6108 and 0.4454). The frozen
  out-of-sample half, which this note's own control does not run, fails on the
  control too: fitted on $x = 13..31$ and frozen, $1/\ln\ln W$ forecasts the
  model at $x = 37$ with residual $-0.00039$ against $1/\ln W$'s $+0.00276$.
  Neither the in-sample winner nor the forecast separation is evidence about
  the limit on this range (§7).

## 1. The spectral form, restated exactly, and checked

Notation as in `variance-note.md` §7 (Corollary 3). Let $\alpha_p$ be the number
of comb classes surviving at $p$: $\alpha_2 = \alpha_3 = 1$, $\alpha_5 = 2$ (the
teeth 11, 17 mod 30 are 1, 2 mod 5), $\alpha_p = p-2$ for $7 \le p \le y$; so
$\delta = \prod_{p\le y}\alpha_p/p$. Write $W(d) = \prod_{p \le y} f_p(d)$ with

$$f_p(d) \;=\; \frac{p\,\rho_p(d)}{\alpha_p^{2}},\qquad
\hat f_p(0) = 1, \qquad
\hat f_p(\nu \ne 0) \;=\; \frac{\big|\sum_{a \in E_p} e(\nu a/p)\big|^{2}}{\alpha_p^{2}} \;\ge\; 0,$$

where $E_p$ is the excluded set: $E_p = \{0,-2\}$ for $p \ge 7$, giving
$\hat f_p(\nu) = (2 + 2\cos(4\pi\nu/p))/(p-2)^2$, which is the sibling's §4
local factor. Then, with $K_L$ the Fejér kernel,

$$\boxed{\ X(L) \;=\; \sum_{\nu \ne 0 \bmod M} \hat W(\nu)\,K_L(\nu/M),
\qquad \hat W(\nu) = \prod_{p \le y} \hat f_p\big(\nu\,(M/p)^{-1} \bmod p\big). \ }$$

**The twist is not decoration.** Coding $\hat W(\nu)$ as $\prod_p \hat f_p(\nu \bmod p)$
gives 4.441347 at $x = 7$ against the true 4.612929, a 3.7% error, while leaving
$\sum_{\nu\ne0}\hat W(\nu) = 29.333333 = 1/\delta - 1$ intact, because the twist
permutes frequencies within each conductor. With the twist the sum agrees with
the sibling's brute force to $2.9\times10^{-7}$ (PART 0). Any future spectral
computation in this corpus should carry this check.

The two exact facts the sibling proved are used unchanged:
$\sum_{\nu \ne 0 \bmod q} K_L(\nu/q) = r_q(q-r_q)/L$ with $r_q = L \bmod q$
(Fact A), hence $q \mid L$ contributes exactly zero (Fact B).

## 2. The decoupling step, named and priced

Define the mean local coefficient

$$\gamma_p \;:=\; \frac{1}{p-1}\sum_{\nu \ne 0} \hat f_p(\nu)
\;=\; \frac{p/\alpha_p - 1}{p-1} \;=\; \frac{p-\alpha_p}{\alpha_p\,(p-1)},$$

so $\gamma_p = 2/((p-1)(p-2))$ for $p \ge 7$, $\gamma_5 = 3/8$, $\gamma_2 = \gamma_3 = 1$.

**DECOUPLING (unproven).** Replace $\hat f_p(\nu_p)$ by $\gamma_p$ at every
$\nu_p \ne 0$.

Two things are worth saying about this step before anything is built on it.

1. **It is exact at one excluded class.** If $|E_p| = 1$ then
   $\hat f_p(\nu \ne 0) = 1/\alpha_p^2$, a constant, and the replacement changes
   nothing. That is the rough-integer case, and it is why the corresponding
   asymptotic is a theorem in print (§9). At $|E_p| = 2$ the coefficient
   $(2+2\cos(4\pi\nu/p))/(p-2)^2$ ranges over $[0, 4/(p-2)^2]$ with mean
   $2/((p-1)(p-2))$, a factor $(p-2)/(2(p-1)) \approx 1/2$ below its maximum at
   every prime. **This one factor per prime is the missing log** the sibling's
   §3 could not find: bounding by the maximum gives the weight $4^{\omega(q)}$
   and $\sum_{q\le Q}4^{\omega} \asymp Q\ln^3 Q$, hence the refuted
   $X \asymp \ln^3 W$; using the mean gives $2^{\omega(q)}$ and
   $\sum_{q \le Q} 2^{\omega} \asymp Q \ln Q$, hence $\ln^2 W$.
2. **Its error is measured only twice.** Full divisor enumeration (PART 2) gives
   $X_{\rm dec} = 5.405185$ against $X = 4.612929$ at $x = 7$, and
   $15.694986$ against $15.0751$ at $x = 11$: true/model $= 0.8534$ and
   $0.9605$. Two points, both at the bottom of the range, both with the model
   *above* the truth. At $x \ge 13$ the model sits slightly *below* the measured
   data (§6), so the error changes sign somewhere in $11 < x < 13$ and no
   monotone statement about it is available.

The heuristic reason to expect the step to be harmless asymptotically: the
Fejér weight concentrates on $|\nu| \lesssim M/L$, and the conductors carrying
the mass have $\ln q \approx \ln L$ (§4), while $M/L$ has 194188 digits at
$x = 31$ (`natal-cap-16` reading 2). Equidistribution of $\nu \bmod q$ over a
range astronomically longer than $q$ is exactly what the step needs. It is not
proven, and no attempt is made here to prove it.

## 3. What the decoupled sum evaluates to

Under the replacement, $\prod_p \hat f_p$ becomes
$\prod_p\big[\gamma_p + (1-\gamma_p)\mathbf 1[\nu_p = 0]\big]$. Expanding over
the subset $e$ of primes where the second term is taken and using Fact A with
$n = M/e$,

$$X_{\rm dec} \;=\; \frac{1}{L}\,\mathbb{E}_\Theta\big[\,r_n(n-r_n)\,\big],
\qquad r_n = L \bmod n,$$

where $\Theta$ makes each prime $p \le y$ a factor of $n$ independently with
probability $\gamma_p$. Two exact consequences:

- $\mathbb{E}_\Theta[n] = \prod_{p\le y}\big(1+\gamma_p(p-1)\big) = \prod_{p\le y} p/\alpha_p = 1/\delta$,
  checked at $x = 7$ (PART 1).
- Size-biasing by $n$ preserves independence and turns $\gamma_p$ into
  $\pi_p = \gamma_p \alpha_p = (p-\alpha_p)/(p-1)$, the number of excluded
  classes divided by $p-1$. Hence

$$\boxed{\ \frac{\operatorname{Var}}{\mathbb{E}} \;\approx\;
\mathbb{E}\Big[\Big\{\tfrac{L}{n}\Big\}\Big(1-\Big\{\tfrac{L}{n}\Big\}\Big)\frac{n}{L}\Big],
\qquad \Pr[\,p \mid n\,] = \pi_p = \frac{p-\alpha_p}{p-1}\ \text{independently}. \ }$$

Fact B is now automatic: $n \mid L$ forces $\{L/n\} = 0$. The diagonal's
arithmetic input is inside the formula rather than a correction to it.

## 4. The conductor groups, and where the growth lives

Read off the three groups directly from $r_n(n-r_n)/L$:

| group | value of the statistic | total after $\times\,\delta$ |
|---|---|---|
| $n \mid L$ (all prime factors $\le x$, since $L = x\#$) | exactly 0 | 0, exactly |
| $n \le L$, $n \nmid L$ | $\le n^2/4L$ | $O(1/\ln W)$: moves the drift, not the limit |
| $n > L$ | $r_n = L$, statistic $= n - L$ | the whole limit |

The task's guess for the third row is right: for $n > L$ the statistic is
exactly $n - L$, which after size-biasing is $(1 - L/n)$. The second row is the
band near $L$; bounding it by $n^2/4L$ and summing $2^{\omega(n)}$ gives
$O(\ln W)$ before the $\delta$, so it is a $1/\ln W$ correction and is **not**
evaluated here. That is the reason the drift *coefficient* below is not derived
even though the limit is.

The growth rate follows without any further work. Because
$\mathbb{E}_\Theta[n] = 1/\delta$ exactly and $\delta \ln^2 W \to \kappa = 1.109905$
(sibling §2, PROVEN), and because the fraction of that expectation sitting above
$L$ is bounded away from 0 and 1, $X$ is $\asymp \ln^2 W$ with an order-one
constant. So of the three shapes the task asks about, the answer is the first:
$X = c\ln^2 W\,(1 + O(1/\ln W))$, never $\ln^2 W \ln\ln W$ and never
$\ln^3 W$. The corrections enter through $\ln y$-sized offsets in $\ln n$
against $\ln L$, all of relative size $1/\ln y = 2/\ln W$, so **the drift family
is a series in $1/\ln W$**, which is the principled reason the sibling's §8 row
recorded as missing.

## 5. The limit, and the constant

$\ln n = \sum_{p \le y}\mathbf 1_p \ln p$ with $\Pr = \pi_p$. Since
$\pi_p = 2/(p-1)$ for $p \ge 7$, Mertens gives
$\mathbb{E}[\ln n] = 2\ln y + O(1)$ and $\operatorname{Var}[\ln n] = \ln^2 y\,(1+o(1))$:
the threshold $\ln L = u \ln y$ sits at the mean when $u = 2$, and the
distribution does not concentrate. Its Laplace transform is

$$\mathbb{E}\big[e^{-s\ln n/\ln y}\big] \;\longrightarrow\;
\exp\Big(\theta\!\int_0^1 \frac{e^{-sw}-1}{w}\,dw\Big),\qquad \theta = |E_p| = 2,$$

the **generalized Dickman law** $GD(\theta)$, with density $f_\theta$ satisfying
$f_\theta(t) = e^{-\theta\gamma}t^{\theta-1}/\Gamma(\theta)$ on $(0,1]$ and
$t f_\theta'(t) = (\theta-1)f_\theta(t) - \theta f_\theta(t-1)$ beyond. And
$(1 - L/n)^{+} \to \mathbf 1[\ln n > \ln L]$. Hence

$$\lim \frac{\operatorname{Var}}{\mathbb{E}} \;=\; \lambda_\theta(u) \;:=\; \Pr\big[GD(\theta) > u\big],
\qquad u = \frac{\ln L}{\ln y},\ \ \theta = \text{excluded classes per prime}.$$

For $\theta = 2$, $f_2(t) = e^{-2\gamma}t$ on $(0,1]$ and
$f_2(t) = e^{-2\gamma}\big[t(3-2\ln t) - 2\big]$ on $(1,2]$, so

$$\lambda_2(2) \;=\; 1 - e^{-2\gamma}\Big(\tfrac12 + 4 - 4\ln 2\Big)
\;=\; 1 - e^{-2\gamma}\Big(\tfrac92 - 4\ln 2\Big) \;=\; 0.45545648,$$

closed form and numeric delay-equation solution agreeing to $10^{-8}$ (PART 3),
with $\int f_2 = 1$ and mean $= 2$ to eight decimals as they must be. Equivalently
$\lim X/\ln^2 W = 0.45545648/1.109905 = 0.410$.

The tail at the other exponents, which §6 of the note can test:

| $u$ | 0.6 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 |
|---|---|---|---|---|---|---|
| $\lambda_2(u)$ | 0.9433 | 0.8424 | 0.6571 | 0.4555 | 0.2820 | 0.1577 |

**The passage above is the second open step.** Both arrows are asserted rather
than derived here: the convergence of $\ln n/\ln y$ to $GD(2)$ is routine and is
nowhere written down in this note, and $(1 - L/n)^{+} \to \mathbf 1[\ln n > \ln L]$
needs §4's $n \le L$ band to vanish, which §4 states as $O(1/\ln W)$ and does
not evaluate. The constant is no stronger than that step
(`redteam-0828-varE.md` §0).

**Convergence, checked.** The model's leading part at $u = 2$ climbs
0.32116, 0.35378, 0.37271, 0.38660, 0.39357, 0.39838 over
$\ln y = 6.9 \ldots 16.7$, and its own $a + b/\ln y$ fit returns 0.45285 against
the closed form 0.455456 (PART 4b). So the model does converge where it is
claimed to, and it does so slowly: at $x = 41$ it is still 0.053 short.

## 6. Against the data: 22 points, no fitted parameter

The model has no free parameter. Its inputs are $\alpha_p$, $y$ and $L$.

**6a. The nine diagonal points** (`variance-note.md` §7), model by Monte Carlo,
$N = 4\times10^5$, s.e. $\approx 7\times10^{-4}$:

| $x$ | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 |
|---|---|---|---|---|---|---|---|---|---|
| measured | 0.1521 | 0.2563 | 0.2995 | 0.3268 | 0.3473 | 0.3643 | 0.3774 | 0.3876 | 0.3958 |
| model | 0.17850 | 0.26744 | 0.29750 | 0.32579 | 0.34637 | 0.36214 | 0.37695 | 0.38740 | 0.39566 |
| residual | $-0.0264$ | $-0.0111$ | $+0.0020$ | $+0.0010$ | $+0.0009$ | $+0.0022$ | $+0.0005$ | $+0.0002$ | $-0.0006$ |

Lead with the bad part: at $x = 7$ and $x = 11$ the model is wrong by 17% and
4% relative, exactly the decoupling error of §2, and at $x \ge 13$ the seven
residuals average $+0.0009$, roughly 3 sigma of the pooled MC noise. The model
is not exact anywhere. It is within 0.0022 everywhere from $x = 13$ up.

**6b. §6's $u$-sweep at $y = 401$**, a different object (set $A$, all three
mod-30 houses, $\alpha_5 = 3$) and a different question. Model against the note:

| $u$ | 0.6 | 1.0 | 1.5 | 2.0 | 2.5 | 3.0 |
|---|---|---|---|---|---|---|
| note §6 | 0.845 | 0.685 | 0.477 | 0.290 | 0.157 | 0.076 |
| model | 0.8543 | 0.7025 | 0.4842 | 0.2927 | 0.1576 | 0.0764 |

The note's empirical regularity 1, $\ln(\operatorname{Var}/\mathbb{E}) \approx -(0.24u^2+0.13u)$,
is a two-parameter fit to a curve the model returns with none, and the model's
normalization $\lambda_2(0) = 1$ is the note's own observed $\to 1$ as $u \to 0$.

**6c. §6's $u = 2$ level sweep**, model against the note:

| $y$ | 97 | 199 | 401 | 797 | 1009 | 1499 | 2003 |
|---|---|---|---|---|---|---|---|
| note §6 | 0.251 | 0.281 | 0.290 | 0.303 | 0.307 | 0.317 | 0.321 |
| model | 0.2541 | 0.2810 | 0.2944 | 0.3061 | 0.3095 | 0.3196 | 0.3232 |

## 7. What this does to the 0.611 reading

`variance-note.md` §7 concludes that the limit is near 0.611 because, on the
frozen-coefficient forecast at $x = 37$, $a + b/\ln\ln W$ beat $a + b/\ln W$ by
a factor ten, and because it refits with a stable intercept. The sibling's §5
already showed the fit sets are misdescribed and that two more forms fit as
well with intercepts 0.5366 and 0.7198, and recorded that no principled reason
to prefer one intercept was known.

Here is one, and it is a control rather than an argument. The nine model values
of §6a form a sequence whose limit is $0.455456$ **by construction**, and which
tracks the measured data to 0.003 over the range where the data live. Running
the note's own protocol on it (fits on $x = 13..37$), with the model column
rebuilt exactly at $x = 13, 17, 19$ and by Monte Carlo at $N = 2\times10^{7}$
elsewhere (`redteam-0828-varE.md` §4; this note's own PART 6b column is Monte
Carlo at $N = 4\times10^{5}$ and reads 0.6151 and 0.4463, inside its own noise):

| form | intercept on the model | bias vs 0.455456 | intercept on the measured | measured minus bias | $\|c\|_1$ | gap vs its bound |
|---|---|---|---|---|---|---|
| $a + b/\ln W$ | 0.4468 | $-0.0086$ | 0.4454 | 0.4540 | 2.60 | $0.0014 \le 0.0076$ |
| $a + b/\ln\ln W$ | 0.6164 | $+0.1609$ | 0.6108 | 0.4499 | 6.91 | $0.0056 \le 0.0201$ |
| $a + b/\sqrt{\ln W}$ | 0.5402 | $+0.0848$ | 0.5366 | 0.4518 | 4.96 | $0.0036 \le 0.0144$ |
| $a + b/\ln W^{1/3}$ | 0.6337 | $+0.1783$ | 0.6279 | 0.4496 | 7.43 | $0.0059 \le 0.0216$ |
| $a + b\cdot$(inert Mertens share) | 0.7281 | $+0.2727$ | 0.7198 | 0.4471 | 9.83 | $0.0083 \le 0.0286$ |
| $a + b/(\ln W\ln\ln W)$ | 0.4219 | $-0.0336$ | 0.4211 | 0.4546 | 2.03 | $0.0008 \le 0.0059$ |
| $a + b/\ln\ln^2 W$ | 0.4833 | $+0.0278$ | 0.4809 | 0.4531 | 3.48 | $0.0023 \le 0.0101$ |

**The frozen half, run on the same control.** `variance-note.md` §7 leans
hardest on the other protocol: fit on the early points, freeze the
coefficients, forecast $x = 37$. The control above does not run it;
`redteam-0828-varE.md` §4 does, fitting on $x = 13..31$:

| form | model forecast at $x = 37$ | model residual | data forecast | data residual |
|---|---|---|---|---|
| $a + b/\ln W$ | 0.39281 | $+0.00276$ | 0.39259 | $+0.00321$ |
| $a + b/\ln\ln W$ | 0.39596 | $-0.00039$ | 0.39567 | $+0.00013$ |

The model's own value at $x = 37$ is $0.395567 \pm 0.000106$, so the $-0.00039$
is resolvable. On a sequence whose limit is 0.455456 by construction the frozen
$1/\ln\ln W$ forecast beats $1/\ln W$ by a factor 7, in the same direction and
at the same ordering as the data's factor 25. So §7's out-of-sample argument
carries no information about the limit either, and the refutation covers both
halves of the protocol rather than one.

Three readings, in order of how much they are worth.

1. **The winner is the same and the intercept is wrong.** On the control,
   $1/\ln\ln W$ wins in-sample (rms $8.99\mathrm{e}{-4}$ against
   $2.26\mathrm{e}{-3}$) and its intercept misses the known limit by $+0.161$.
   So on data of this shape and this range, "the $1/\ln\ln W$ form fits best"
   carries no information about the limit. This is MEASURED, and it refutes the
   §7 inference as a method, not the number 0.611 as a fact.
2. **Every form's bias transfers.** Each form's intercept on the model sits
   within 0.009 of its intercept on the measured data, across a range of
   intercepts from 0.42 to 0.73. That is the sense in which the control is the
   right control.
3. **Bias-corrected the seven forms agree, and the agreement is mostly forced.**
   Removing each form's control bias from its measured intercept gives 0.4540,
   0.4499, 0.4518, 0.4496, 0.4471, 0.4546, 0.4531: a spread of 0.0075 around
   $\lambda_2(2) = 0.455456$, against an uncorrected spread of 0.3062. That
   spread is not evidence for the constant. The intercept is a linear functional
   $a = \sum_i c_i y_i$ with $\sum_i c_i = 1$, so the corrected column is
   $0.455456 + (a_{\rm data} - a_{\rm model})$ and its width is bounded a priori
   by $\|c\|_1 \cdot \max_i |{\rm data} - {\rm model}|$. With
   $\max|{\rm data} - {\rm model}| = 0.00291$ and $\|c\|_1$ between 2.03 and
   9.83 that bound runs 0.0059 to 0.0286, and every observed gap sits inside it
   (`redteam-0828-varE.md` §4). So the last column restates that the model
   tracks the data pointwise, and it is neither an independent measurement of
   the constant nor a check that could have failed.

## 8. Item 9, and the registered $x = 41$ forecast

**What item 9 gets.** A candidate limit with a mechanism and a closed form,
$\lambda_2(2) = 1 - e^{-2\gamma}(9/2 - 4\ln 2) = 0.45546$, at HEURISTIC rung; a
derived reason the drift family is $1/\ln W$ and not $1/\ln\ln W$; an
explanation of the sibling's refuted $\ln^3 W$ as the mean-versus-maximum of one
local coefficient; and a control that explains where 0.611 came from. What it
does not get is a proof: §2's replacement is open and so is §5's limit theorem
for the model, and item 9 needs both closed.

**$x = 41$.** The model predicts $0.402364 \pm 0.000075$ (MC, $N = 2\times10^{7}$,
two seeds, `redteam-0828-varE.md` §4). `var41-prereg.md` registers
$[0.4013, 0.4040]$; the model is inside it and near its middle. So the tenth
point does not test the model either, and the sibling's finding stands
unchanged: $x = 41$ retires the one-term $1/\ln W$ form (0.39941) and separates
nothing else. The surviving forecasts 0.40296, 0.40309, 0.40408, 0.40500 are now
joined by a fifth, 0.40236, which is the only one carrying a derivation rather
than a fit.

## 9. Prior art: this is Gorodetsky's convention at two classes

Run the same construction with **one** excluded class per prime and it gives
$\lambda_1(u) = e^{-\gamma}\int_u^\infty \rho$, numerically 0.663124, 0.438541,
0.218559, 0.093970, 0.035636, 0.012095 at $u = 0.6 \ldots 3$ (PART 3). That is
Gorodetsky's $\lambda(u)$ for the variance of $y$-rough integers in short
intervals (*Math. Z.* **308** (2024) no. 4, Paper 59, arXiv:2111.00853, Thms
1.1/1.3), and $\mathbb{E}[\{L/n\}(1-\{L/n\})\,n/L]$ is his
$\sum_n g_y(n)\{H/2n\}(1-\{H/2n\})$ in the corpus's variables.

Two consequences, one of them a caution.

- The $\theta = 1$ case of §5 is **published and proven, and the identification
  is an exact identity rather than a numerical match.** Every $n$ is even, since
  $\pi_2 = 1$; writing $n = 2n'$ turns the decoupled sum into his (1.5) and (1.6)
  term by term, checked at $(y,H) = (13,210), (13,2310), (29,30030)$ to relative
  $1.7\times10^{-16}$. His Lemma 1.5 gives $V_{q_y}(H) = M(H,y)$ exactly for a
  primorial window, which is this corpus's window, with no hypotheses, and his
  Theorem 1.3(1) then gives $M \sim H P_y \lambda(u)$ for
  $y \ge \exp((\log\log H)^{5/3+\varepsilon})$, which the diagonal satisfies
  (`lit-dickman-variance.md` §1, `redteam-0828-varE.md` §3). So at $\theta = 1$
  the whole chain from the exact finite-level variance to $\lambda_1(u)$ is a
  published theorem about exactly this object. Its value to $\theta = 2$ is
  limited and should be stated as such: the reason §2's step is invisible at one
  class is that the local coefficient is constant there,
  $\hat f_p(\nu \ne 0) = 1/(p-1)^2 = \gamma_p$ identically, and that says
  nothing about $\theta = 2$, where the step is the gap.
- **This route is not novel.** The owning convention is
  "the variance of integers without small prime factors in short intervals" with
  coordinate $u = \log H/\log y$, exactly as `research/SEARCH-CONVENTIONS.md`
  records it via `import-rough-anatomy.md` §8. What is not in print, as far as
  this pass knows, is the two-class value $\lambda_2$, and this pass did not
  search for it. The Gorodetsky paper has since been read at source
  (`lit-dickman-variance.md` §1, `redteam-0828-varE.md` §7): it is $\kappa = 1$
  only, with zero occurrences of `tuple`, `twin`, `admissible`, `generalized`,
  `dimension` and `Poisson` in its full text. Whether a successor states the
  $k$-tuple version is still **NOT CHECKED**, with four channels owed, and it
  should be checked before anything is claimed as new. Aryan
  (arXiv:1302.2296) is the nearest neighbour found so far: his Lemma 1.2 is this
  object at general tuple size, with an upper bound and no asymptotic
  (`lit-dickman-variance.md` §2).

## 10. Defects noticed in passing

- `paper/variance-note.md` §7's closing sentence ("the live hypothesis is
  $\lim = 0.611$ ... the 0.44 reading is demoted") rests on a model comparison
  that returns 0.6164 on a control whose limit is 0.455456, and on a frozen
  forecast separation that the same control reproduces while missing its own
  limit. The §7 sentence should be reversed, not softened. Its replacement
  sentence is drafted in `applied-0828-varE.md` §5; the live document is
  unedited.
- `paper/variance-note.md` abstract ("reduces the open question to the value of
  a single constant, near 0.611") carries the same claim into the abstract.
- The sibling's `varE-asymptotic.md` §8 row "the intercept is not localized to
  0.611 ... a principled reason to exclude ... NO. No such reason is known" now
  has a reason on both halves of the protocol, and that note carries it.
- Any spectral computation in this corpus that indexes $\hat W$ by
  $\nu \bmod p$ rather than $\nu (M/p)^{-1} \bmod p$ is wrong by a permutation
  and will still pass a total-mass check. `natal-cap-29-sigma-plateau.js` STEP 2
  was **not** audited for this here.

## 11. What would falsify this, and whether the check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| $X = \sum_{\nu\ne0}\hat W(\nu)K_L(\nu/M)$ with the CRT twist | PROVEN | disagreement with brute force | YES, $x = 7$, $2.9\mathrm{e}{-7}$ |
| $\delta X_{\rm dec} = \mathbb{E}[\{L/n\}(1-\{L/n\})n/L]$, $\pi_p = (p-\alpha_p)/(p-1)$ | PROVEN given decoupling | a level where the divisor sum disagrees with the MC | YES, $x = 7$ and 11, exact enumeration vs MC inside 1 s.e. |
| the decoupling step is asymptotically harmless | CONJECTURED | a level where true/model stays away from 1 | PARTLY. Exact only at $x = 7$ (0.8534) and $x = 11$ (0.9605); at $x \ge 13$ only indirectly, against the measured data, at $\pm 0.002$ |
| $\lim \operatorname{Var}/\mathbb{E} = \lambda_2(u)$, $\lambda_2(2) = 0.45546$ | HEURISTIC, two open steps (§2's replacement, §5's limit theorem) | the model failing at a new level, or a proof that either step shifts the limit | NO. No level beyond $x = 37$ exists, and the model is 0.053 short of its own limit at $x = 41$ |
| $\lambda_1 = $ Gorodetsky's $\lambda$ | PROVEN: an exact identity with his (1.5)/(1.6), and Lemma 1.5 makes the primorial window his own case | a $(y,H)$ where the two sums differ | YES, three pairs to relative $1.7\mathrm{e}{-16}$, and the paper is read at source (`redteam-0828-varE.md` §3) |
| the drift family is a series in $1/\ln W$ | HEURISTIC | a derived $\ln\ln$ term in the model's expansion | NO. The $n \le L$ band that carries the $1/\ln W$ coefficient is not evaluated |
| §7's fit-comparison does not estimate the limit, on either half of its protocol | MEASURED (control) | a control matching the data as well and reproducing its own limit in-sample AND on the frozen forecast | YES; in-sample PART 6b, the control matches to 0.003 and misses by $+0.161$; frozen forecast `redteam-0828-varE.md` §4, residual $-0.00039$ on a sequence whose limit is known |
| the model's $x = 41$ value 0.402364 | MEASURED (forward, MC) | a measured $r(41)$ outside $0.4024 \pm$ a few $10^{-3}$ | NO. Var(41) priced and declined, TODO item 2 |
| this is novel | NOT CLAIMED | Gorodetsky or a successor stating the $k$-class $\lambda_k$ | NO. Not searched. Do not call it new before that search |

The one line worth carrying out of this pass: the corpus should stop quoting
0.611 and start quoting $\lambda_2(2) = 0.45546$ as a **heuristic** candidate
with two open steps, together with the control that shows why 0.611 appeared,
on both halves of the protocol that produced it, and why no amount of further
levels of the present kind will settle it.
