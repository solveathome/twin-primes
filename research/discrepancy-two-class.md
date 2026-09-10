# The two-class discrepancy, and the three-way growth law

<!-- ledger
id: Q-discrepancy-two-class
status: ANSWERED
todo: none
question: What is the two-class analogue of Holt's signed discrepancy DeltaPhi, and do the three candidate growth laws on the table agree?
verdict: One object in three norms rather than three agreeing measurements: the proven Level Ledger bound 2*3^(pi(x)-1) and natal-cap-29's spectral level law share the integer 3 provably, since R_k(p) tends to k+1, so the apparent agreement is an identity; the custody gate reproducing Holt's Table 2 passed.
-->

**2026-08-17. Script: `research/discrepancy-two-class.js`
(17.9 s, all asserts passed, full output pasted in the file).**

Holt's arXiv:2308.07570 tabulates

$$\Delta\Phi(y, x) \;=\; \Phi(y, x) \;-\; \frac{\varphi(x\#)}{x\#}\,y,$$

the signed discrepancy of the **one-class** $x$-rough counting function inside
the cycle. This note does three things: reproduces his Table 2 from our own
engine as a custody gate, builds the **two-class analogue** that no search had
found in print when this note was written, and settles a collision the repo has
been circling between his growth column, our Level Ledger bound, and
natal-cap-29's spectral mass.

**Absence resolved, 2026-08-19, in this note's favour.** Ojaroudi (Zenodo
10.5281/zenodo.18509488 v4; v5 is 10.5281/zenodo.18528635) was read end to end
(`history/staging/ojaroudi-read.md`). He builds the same tile and fold and
carries an **L² arithmetic-progression** discrepancy, D_i(m) = Σ_{r mod m}
(c^{(m)}(r) − |T_i|/m)² — a variance over residue classes to a coprime
modulus, which is NOT this note's object: ours is a signed interval sup.
Nothing in his paper counts twin slots below a bound and he states no growth
law for any sup, so ΔΦ₂, the mirror law, the half-range statistic and the
growth ladder stand unchallenged by it. (His claimed twin-prime theorem is
not proved: its load-bearing step imports a Selberg lower bound that does not
exist; see the read record.) His |T_i| column equals this note's D_x to the
digit — independent custody in both directions. What still may not be written
here is an absence: `SEARCH-CONVENTIONS.md` §1 now names the owning
convention for the L²-AP object ("variance of the sifted set in arithmetic
progressions"), and until the INTERVAL analogue is searched under its own
convention no sentence in this file may call it absent from the literature.

The two-class object:

$$\Delta\Phi_2(y, x) \;=\; \Psi(y, x) \;-\; \frac{D_x}{x\#}\,y,
\qquad D_x = \prod_{3 \le q \le x}(q-2),$$

with $\Psi(y,x)$ the count of twin slots of $T_x$ below $y$.

---

## 1. The custody gate: PASSED

Every analytic column of Holt's Table 2 reproduced independently at every
$x$ from 5 to 29, including the $x=29$ row ($\varphi(29\#) = 1.02\times 10^9$
survivors, streamed from the materialised $x=23$ tile, 12.5 s).

| $x$ | $\mu(x)$ ours/his | $\max\lvert\Delta\Phi\rvert$ ours/his | rising-zero share ours/his |
|---|---|---|---|
| 5 | 3.750 / 3.750 | 0.9333 / 0.9333 | 100.00% / 100.00% |
| 7 | 4.375 / 4.375 | 1.5143 / 1.5143 | 66.67% / 66.67% |
| 11 | 4.813 / 4.813 | 2.5195 / 2.5195 | 54.58% / 54.58% |
| 13 | 5.214 / 5.214 | 3.5475 / 3.5475 | 38.47% / 38.47% |
| 17 | 5.539 / 5.539 | 5.4388 / 5.4388 | 28.16% / 28.16% |
| 19 | 5.847 / 5.847 | 8.6592 / 8.6592 | 20.76% / 20.76% |
| 23 | 6.113 / 6.113 | 14.4180 / 14.4180 | 14.90% / 14.90% |
| 29 | 6.331 / 6.331 | 20.9128 / 20.9128 | 10.74% / 10.74% |

**Three clerical cells refuted**, none of which touches any conclusion of his:

- $\varphi(23\#) = 36{,}495{,}360$; he prints $36{,}595{,}360$. His own
  $\varphi(29\#) = 1{,}021{,}870{,}080 = 36{,}495{,}360 \times 28$ confirms ours.
- $N_{0+}(19) = 344{,}338$; he prints 344,337.
- $N_{0+}(23) = 5{,}438{,}506$; he prints 5,438,505.

Ours is exact-integer certified: $\Delta\Phi$ at the $k$-th survivor has
numerator $k\,W - N r_k$, an exact integer below $2^{53}$ for $x \le 23$, and
the count is unchanged under strict or closed inequalities. It also satisfies
Holt's own theorem $N_{0-} = N_{0+}$ at every level. Levels 5, 7, 11, 13, 17
and 29 agree to the unit.

---

## 2. The two-class table (new)

| $x$ | $x\#$ | $D_x$ | $\mu_2$ | $\max\Delta\Phi_2$ | $\min\Delta\Phi_2$ | rising zeroes | share of $D_x$ |
|---|---|---|---|---|---|---|---|
| 5 | 30 | 3 | 10.000 | 0.3000 | −1.1000 | 2 | 66.67% |
| 7 | 210 | 15 | 14.000 | 1.0714 | −1.9286 | 7 | 46.67% |
| 11 | 2310 | 135 | 17.111 | 2.5390 | −3.4221 | 49 | 36.30% |
| 13 | 30030 | 1485 | 20.222 | 3.4670 | −4.3681 | 418 | 28.15% |
| 17 | 510510 | 22275 | 22.919 | 7.3862 | −8.2990 | 3569 | 16.02% |
| 19 | 9699690 | 378675 | 25.615 | 16.6168 | −17.5388 | 29804 | 7.87% |
| 23 | 223092870 | 7952175 | 28.054 | 26.9038 | −27.8325 | 515942 | 6.49% |
| 29 | 6469693230 | 214708725 | 30.132 | 48.6852 | −49.6188 | 6960458 | 3.24% |

The twin-slot set is mirror symmetric under $r \mapsto W - 2 - r$, which forces
$\max + \min = -(1 - 2\delta_2)$ exactly rather than Holt's $\max + \min = 0$;
the shift-invariant statistic is therefore the half-range
$\operatorname{sup} = (\max-\min)/2$, and for the one-class set that equals his
$\max$ on the nose.

---

## 3. Two exact recursions, and the proven ceilings

**One class (proven, verified to `0.0e0` at 200 random $y$).** A survivor of
$T_n$ killed by $p$ is exactly $p$ times a survivor of $T_n$, so
$\Phi_{n+1}(y) = \Phi_n(y) - \Phi_n(y/p)$ and, after cancelling densities,

$$\Delta\Phi_{n+1}(y) \;=\; \Delta\Phi_n(y) \;-\; \Delta\Phi_n(y/p).$$

Hence $\sup\lvert\Delta\Phi_{n+1}\rvert \le 2\sup\lvert\Delta\Phi_n\rvert$: at
most $\times 2$ per fold, and $2^{\pi(x)}$ is exactly the term count of the
Möbius expansion $\prod(1 - \mathbb{1}[q \mid r])$.

**Two classes (proven, verified to `9.6e-14`).** A twin slot is killed by $p$
either as $r = pm$, forcing $m$ to avoid $\{0, -2p^{-1}\}$ mod each $q$, or as
$r = pm - 2$, forcing $m$ to avoid $\{0, 2p^{-1}\}$. Both are admissible
two-class patterns of the same density, so with $U, V$ those sets,

$$\Delta\Phi_2^{(n+1)}(y) \;=\; \Delta\Phi_2^{(n)}(y) \;-\; \Delta_U(y/p)
\;-\; \Delta_V\!\left(\tfrac{y+2}{p}\right) \;-\; \frac{2\delta_n}{p}.$$

The family of two-class patterns is closed under this, so the sup over the
family satisfies $M_{n+1} \le 3 M_n + 1$: at most $\times 3$ per fold, and
$3^{\pi(x)}$ is exactly the term count of
$\prod(1 - \mathbb{1}[q\mid r] - \mathbb{1}[q \mid r+2])$ — the Level Ledger's
majorant.

Measured growth: $\times 1.5592$ and $\times 1.8356$ per fold. Both ceilings
hold, both are loose.

---

## 4. The Parseval identity, labelled as an identity

**Proven.** For any periodic point set mod $W$ with
$S(j) = \sum_{r \in T} e(jr/W)$,

$$\operatorname{Var}_y(\Delta\Phi)
= \frac{1}{4W^2}\sum_{j \ne 0}\frac{\lvert S(j)\rvert^2}{\sin^2(\pi j / W)}
= \frac{1}{2\pi^2}\sum_{j \ge 1,\, W \nmid j}\frac{\lvert S(j)\rvert^2}{j^2}
= \frac{P}{2},$$

where $P$ is natal-cap-29's plateau $\operatorname{avg}_\ell \operatorname{Var}(\ell)$.
The middle step is the same $1/\sin^2 \to \sum_a (k+aW)^{-2}$ fold that
natal-cap-29 uses, applied to a different kernel.

Verified against natal-cap-29's exact BigInt plateaus, through completely
disjoint code:

| $x$ | $2\operatorname{Var}_y$ (this file) | $P(x)$ (natal-cap-29, exact) | rel err |
|---|---|---|---|
| 7 | 0.486697 | 0.4867 | −0.0006% |
| 11 | 0.927458 | 0.9275 | −0.0045% |
| 13 | 3.609585 | 3.6096 | −0.0004% |
| 17 | 7.331398 | 7.3314 | −0.0000% |
| 19 | 28.627095 | 28.6271 | −0.0000% |
| 23 | 58.462375 | 58.4624 | −0.0000% |
| 29 | 152.809336 | 152.8093 | 0.0000% |

**Say it plainly: this is not two measurements agreeing.** It is one quantity
computed twice, and its only value is custody — on both programmes at once.
`research/history/SESSION-2026-08-17.md` §4 records this repo getting exactly this
distinction wrong once; the label is here so it cannot happen again.

(natal-cap-29's tile is not the full twin-slot tile. Its mod-30 base is
$\{11,17\}$ — the slot 29, whose partner 31 leaves $[1,30)$, is dropped — so it
carries $2/3$ of the twin slots. The check above runs on *his* set for that
reason.)

---

## 5. THE VERDICT: one object, three norms

Three growth laws were on the table:

- **(A)** Holt's measured $\max\lvert\Delta\Phi\rvert$, roughly doubling every
  two levels;
- **(B)** our proven Level Ledger bound $2\cdot 3^{\pi(x)-1}$;
- **(C)** natal-cap-29's measured spectral-mass level law, $\times 3$ per fold.

They are not three objects, and they are not an agreement between three
measurements.

**(B) and (C) share the integer 3, and provably so.** For $k$ removed classes
per prime the Möbius expansion has $k+1$ terms. The spectral level factor is

$$R_k(p) \;=\; \underbrace{\frac{k(p-k)}{p-1}}_{\text{generic mean square} \to k}
\;+\; \underbrace{\frac{(p-k)^2}{p^2}}_{\text{coherent echo} \to 1} \;\longrightarrow\; k+1 ,$$

which for $k=2$ is natal-cap-29's $R(p) = (2p-4)/(p-1) + ((p-2)/p)^2 \to 3$ and
for $k=1$ is $R_1(p) = 1 + ((p-1)/p)^2 \to 2$. Both $k+1$'s are Parseval on a
$k$-point set. The resemblance is **not numerology** — same integer, same
source.

**But they govern different norms, and that is the whole answer.** $R_k$ is the
growth rate of a **variance**; the term count bounds a **sup**. So

> the Level Ledger bound has the right base and **twice** the right exponent.

Its ratio to the measured two-class sup runs 25.7, 36.0, 54.4, 124, 186, 256,
479, 801 across $x = 5 \ldots 29$ — growing by about $\sqrt 3$ per fold, which
is exactly the square-root gap and nothing else.

**(A) is the sup of the $k=1$ case of the same object.** Holt gives no growth
law for his own column; his §4 only establishes that $\Delta\Phi$ is periodic
and bounded at fixed $p$. The law is:

$$\frac{\operatorname{sd}(\Delta\Phi)\ \text{at}\ p}{\operatorname{sd}\ \text{at the previous level}}
\;=\; \sqrt{R_1(p)} \;=\; \sqrt{1 + \left(\tfrac{p-1}{p}\right)^2},$$

and it is **essentially exact**:

| fold $p$ | 7 | 11 | 13 | 17 | 19 | 23 | 29 |
|---|---|---|---|---|---|---|---|
| $\sqrt{R_1(p)}$ | 1.31708 | 1.35146 | 1.36091 | 1.37325 | 1.37750 | 1.38381 | 1.39004 |
| measured | 1.32214 | 1.35372 | 1.36112 | 1.37308 | 1.37701 | 1.38337 | 1.38973 |

0.4% at $p=7$, falling to 0.02% at $p=29$. The reason is structural: the
one-class local factor is $\lvert S_p(t)\rvert^2 = 1$ for **every** $t \ne 0$,
so the one-class problem has no phase freedom at all.

The two-class version has real freedom and shows it: per-fold sd steps swing
1.177 to 2.269 (natal-cap-29 reading 5's twist luck), but the seven-fold
geometric mean 1.6612 sits 3.5% above the $\sqrt{R_2}$ product 1.6046, below
the limit $\sqrt 3 = 1.7321$.

**Why the sup outruns the sd.** $\operatorname{sup} = c \cdot \operatorname{sd}
\cdot \sqrt{2\ln W}$, with $c \in [0.765, 0.880]$ one class (mean 0.830) and
$c \in [0.612, 0.812]$ two class (mean 0.687), no trend across eight levels.
Same shape and nearly the same constant as natal-cap-25's excess law
$E_x(\ell) = 0.97\,\sigma\sqrt{2\ln(W/\ell)}$ — the fourth appearance of that
factor in this repo, on a fourth object.

Summary of the ladders (geometric mean per fold, $x = 5 \to 29$):

| | sup | sd | $\sqrt{R_k}$ limit | proven ceiling |
|---|---|---|---|---|
| one class | ×1.5592 | ×1.3656 | 1.4142 | 2 |
| two class | ×1.8356 | ×1.6612 | 1.7321 | 3 |

---

## 6. The controls (run before any of the above was claimed)

**Bernoulli.** A random subset of $\mathbb{Z}/510510$ at the same density gives
sup 134.96 (sd 67.34) one class and 84.90 (sd 38.34) two class, against the
true 5.4388 (sd 1.3867) and 7.8426 (sd 2.3900); $\sqrt W = 714.5$. Two orders
of magnitude. The pipeline reports Poisson-scale fluctuation when it is there.

**Random classes.** Same primes, same *number* of removed classes, random
classes instead of $\{0\}$ and $\{0,-2\}$.

| $k$ | top | draws | object | true set | control median | control spread | true set's percentile |
|---|---|---|---|---|---|---|---|
| 1 | 19 | 4 | sd | 1.3573 | 1.3573 | 1.357 .. 1.357 | degenerate |
| 2 | 23 | 24 | sd | 1.6190 | 1.6053 | 1.508 .. 1.711 | 71% |
| 2 | 23 | 24 | sup | 1.8423 | 1.8148 | 1.731 .. 1.930 | 79% |

The $k=1$ control is **degenerate by theorem**, and that is the finding:
$\{r : r \not\equiv a_q \bmod q \ \forall q\}$ is a CRT translate of the coprime
set, so every draw has identical sd and range. One class has no arithmetic
freedom, which is why $\sqrt{R_1}$ is near-exact.

For $k=2$ the twin pattern lands **inside** the control spread. **Refuted:** any
twin-specific discrepancy law. The growth law is a function of the count $k$ of
removed classes only; the twin arithmetic sets the twist luck, not the law.

---

## 7. The price of the second residue class, and a warning

$$\frac{\operatorname{sup}_2}{\operatorname{sup}_1}
= 0.750,\ 0.991,\ 1.183,\ 1.104,\ 1.442,\ 1.972,\ 1.898,\ 2.350
\qquad (x = 5 \ldots 29)$$

The two-class discrepancy **starts smaller**, crosses over at $x = 11$, and then
grows by ×1.177 per fold, asymptotically $\sqrt{3/2} = 1.2247$ per fold, i.e.
$(3/2)^{\pi(x)/2}$. So the two-class law is *stronger* (larger discrepancy) than
the one-class law, by a factor exponential in $\pi(x)$.

**This is not the price measured in the max-gap channel, and the separation is
the point.** There the one-class object $h(x\#)$ tracks $p \log p$, the
two-class object carries a measured exponent of **1.50** (central; bracket 1.3
to 1.8, floor 1), and the ratio $G_2/g$ runs 2.00 → 8.00 over
$x = 5 \ldots 37$, a **power of $\log$**. Here the price of the second class is
**exponential in $\pi(x)$**, a factor $(3/2)^{\pi(x)/2}$ crossing over at
$x = 11$. Those are different objects with different prices, different in kind
and not only in size, and no constant or exponent should be carried between
them. In particular there is no shared number for the two channels to agree on:
the ratio of sieve limits is 2.13 against a measured exponent ratio near 1.50
(`research/PRIOR-ART.md`).

Both discrepancies are $W^{o(1)}$: $\ln \operatorname{sup} \approx 0.3466\,\pi(x)$
one class and $0.5493\,\pi(x)$ two class, against $\ln W = \theta(x) \sim x$, so
$\operatorname{sup} = W^{O(1/\ln x)}$.

---

## 8. Predictions on record for $x = 31$ (a-priori, unmeasured)

$31\# = 2.0056\times 10^{11}$, $\ln(31\#) = 26.024$, $\sqrt{2\ln W} = 7.2145$.

- One class: $\sqrt{R_1(31)} = 1.39159$, so $\operatorname{sd}(31) = 5.1085$;
  with $c = 0.830$, **$\max\lvert\Delta\Phi(\cdot,31)\rvert = 30.6$**, band
  28.2 .. 32.4. This is the sharp test — $R_1$ carries no twist luck, so only
  $c$ is in question.
- Two class: $\sqrt{R_2(31)} = 1.67585$, so $\operatorname{sd}_2(31) = 19.33$
  (±25% twist luck); with $c = 0.687$, **$\operatorname{sup}\Delta\Phi_2(\cdot,31) = 95.9$**,
  band 64 .. 142.

Cost if anyone wants to check: $x=31$ two class needs $D_{31} = 6.23\times 10^9$
slots and the $x=29$ tile held as Uint16 gaps (430 MB, $G_2(29\#) = 258$ fits),
about 4 to 8 minutes under `nohup`. $x=31$ one class ($3.07\times10^{10}$
survivors) is out of reach on this machine.

---

## 9. Loose end, since settled

`research/FOLD-PROFILE.md` §3 records $\max_a \lvert h(a) - D/p\rvert$ =
1.36, 1.62, 3.35, 3.63, 6.13, 16.9 across five folds, against the
$3^{\pi(x)}$ majorant. Its per-fold geometric mean is **1.655**. Our two-class
sd base is **1.661**.

Settled by `research/level-ledger-tight.md`. Theorem 1 there proves the natal
ledger deviation **is** a sup of a $k=2$ discrepancy — the
arithmetic-progression discrepancy of the tile is exactly its worst
dilated-interval discrepancy — so §5 applies and its base is
$\sqrt 3 = 1.732$, not 2. No exponential base should be fitted to FOLD-PROFILE's
sequence in any case: it is quoted at the ladder prime, which moves $p$ with $x$,
and maximising over $p$ instead breaks it (`research/level-ledger-tight.md` §1).

---

## 10. Honest residuals

- The $\sqrt{R_k}$ laws are asymptotic in $p$ and measured over seven folds.
  Nothing here proves $\operatorname{sup}/\operatorname{sd}$ stays bounded, so
  nothing here proves $\operatorname{sup} = (\sqrt{R_k})^{\pi(x)+o(1)}$. The only
  **proven** statements about the sup are the ceilings ×2 and ×3 of §3.
- That gap — right base, doubled exponent — is the same shape of gap the repo
  carries in the sifting exponent ($4.2665 \to 2$). It is now visible in a
  second, much simpler place, where the doubling has an exact cause: an $L^\infty$
  bound derived from an $L^1$ term count against an $L^2$ truth.
- The rising-zero share is reported but not explained. It falls far faster in
  the two-class case (100% → 3.24%) than the one-class (100% → 10.74%), and
  nothing here says why.

---

## Reproduction

```
node --max-old-space-size=6144 research/discrepancy-two-class.js     # 17.9 s
```

The full output is pasted into the script under `OUTPUT (2026-08-17)`, followed
by the numbered readings.


---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
