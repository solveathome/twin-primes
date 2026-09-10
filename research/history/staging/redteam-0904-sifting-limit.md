# Red team on the sifting-limit floor note: the convention find holds, the padding derivation is a two-line consequence of the definition it cites, and the METHOD ARTEFACT headline does not survive

<!-- ledger
id: Q-redteam-0904-sifting-limit
status: ANSWERED
todo: 0
question: Do recon-0904-sifting-limit-floor.md's five claims survive adversarial re-derivation at the page, and in particular is the 4.26645 cap a method artefact at rung MEASURED?
verdict: Four of five claims survive with corrections and the headline does not. Claim d is REFUTED as stated on four grounds, each sufficient: the level-D LP fixes one omega-profile out of a class Ford defines by a ONE-SIDED inequality, and inside the classical (Omega_2(kappa,L)) budget a legal profile at x = 13 gives a calibrated reading of 5.0113, above beta_2 = 4.26645, which fires the target note's own pre-registered refutation of its floor; the calibration is a 1.72 multiplicative correction fitted at one point and it misses the second proven point beta(1/2) = 1 by 66 to 82 per cent, two and a half times the 28.7 per cent effect the headline rests on; the pooled 3.3152 averages four statistics of which only s* is the definitional analogue of beta, and that route reads 3.4678 here and 3.9487 at x = 43 in the corpus's own data, still climbing at +0.4297 per ln x with the fitted line reaching 4.26645 at x = 104; and 3.3152 is 22.2961 per cent below 4.26645 rather than the 18 per cent the note prints. Claim a is CONFIRMED with a second source off the OCR channel (Ford 2023 p. 37, "Some authors, e.g. Selberg, refer to 1/beta(kappa) as the sieve limit"), one page correction owed (Halberstam is p. 117, not p. 116). Claim b is CONFIRMED and strengthened: Brady's class is stated on his p. 10 and IS the axiom-only interval class Face 4 needs, his v_R table is reproduced here, and the identity v_{2d+2} = v_{2d+1} his proof asserts is confirmed at d = 0, 1, 2, so 1.819592 rests on proved facts alone. Claim c is CONFIRMED but demoted: beta(2) >= beta(1) = 2 is two lines from Ford's own one-sided (Omega) plus his own beta(1) >= 2, so the padding construction is correct and unnecessary. Of the eight proposed live-layer changes, two survive verbatim, five need rewording and one is refuted; the new SEARCH-CONVENTIONS row adds exactly three clearing phrases and changes nothing for any existing absence claim.
-->

*(2026-09-04. Adversarial review, HELD. Target:
`research/history/staging/recon-0904-sifting-limit-floor.md` and its producer,
both written the same day and both HELD. No existing file edited; no git
command run beyond read-only `status` and `log`. Producer for every number
below: `research/history/staging/redteam-0904-sifting-limit.js`, embedded by
`node research/qc/embed.js`. Legend as in the target note: **[PROVEN]**
published theorem read at the page; **[VERIFIED]** checked computationally
here; **[MEASURED]** empirical, finite range; **[DERIVED]** this note's own
deduction; **[ABSENT]** searched, with the convention named.)*

---

## 0. Verdict

**The disconfirming half first.** Nothing here moves an exponent either. The
open band `(2, 4.26645]` is exactly as open after this review as before it, and
the one thing that changes inside it is that the corpus now has less reason to
believe its own measured floor than it had this morning. The target note's four
supporting claims mostly hold, three of them more firmly than the note itself
claimed. Its headline does not hold, and the reason is not a slip in the code,
which reproduces cleanly: it is that the object being measured is not the object
being named.

**Claim d, the headline, is REFUTED as stated.** "The cap at 4.26645 is a method
artefact at rung MEASURED, since the level-`D` LP is exactly the axiom-only
information class and its calibrated floor of 3.3152 sits about 18 per cent
below the DHR value." Four things are wrong with that sentence and each one is
enough on its own.

1. **The LP is one member of the class, not the class.** Ford's dimension axiom
   is the one-sided inequality `(Omega)`, implied by `(Omega_0) g(p) <= min(kappa/p, 1-delta)`
   (`sieve2023.pdf` p. 18, read at the page), so a dimension-`kappa` problem is
   any `omega`-profile inside a budget, and the class barrier is the supremum
   over profiles. The corpus's LP fixes `omega(p) = min(kappa, p-1)`. Searched
   directly: inside `(Omega_0)` the constant profile is indeed the maximum, 485
   profiles at `x = 13`, none beats it. Inside the classical `(Omega_2(kappa,L))`
   budget it is not: at `x = 13` the profile `[1,2,2,4,4,4]` needs `L = 1.5350`
   and gives `s* = 3.0196` against the constant profile's `2.0847`, a factor
   1.4484. Under the corpus's own calibration rule that profile reads **5.0113**,
   **above** `beta_2 = 4.26645`, which is precisely the condition the target
   note pre-registered as refuting its own floor. The constant profile is not
   the `L = 0` profile either: it needs `L = 0.4965` at `x = 13`. Once a
   positive `L` is granted at all, the choice of profile moves the calibrated
   reading from 2.7108 to 5.0113 at one level, and nothing in the axioms picks
   the corpus's one. **[VERIFIED]**
2. **The calibration fails at the only other point where the truth is proven.**
   The rule is one multiplicative rescaling fitted so the `kappa = 1` column
   reproduces `beta(1) = 2`, and the correction it applies is large: `1.6596` to
   `1.8172` across `x = 7..23`. `beta(kappa) = 1` for every `kappa <= 1/2` is
   equally proven (Ford section 3.1 p. 37; Halberstam, *Bull. AMS* **40** (2003)
   **p. 117**, "We have `beta_{1/2} = 1` and `beta_1 = 2`"). Run the same rule
   there: the raw threshold `s*(x, 1/2)` is **exactly 1.0000 at all six levels**,
   which is the truth on the nose, so the rescaling sends it to **1.6596 to
   1.8172 against a truth of 1**, a mean error of **+71.7 per cent**. Run
   backwards from the `kappa = 1/2` anchor it predicts `beta(1) = 1.1006` to
   `1.2051` against 2. The same `kappa = 2` quantity reads `1.7472` to `2.0847`
   from one legal anchor and `2.9542` to `3.5598` from the other, a spread of
   1.21 to 1.51 on a number the corpus quotes to four decimals. A correction of
   72 per cent that is wrong by 72 per cent at its own check point cannot
   resolve the 28.7 per cent effect the headline rests on. **[VERIFIED]**
3. **The pooled figure averages four statistics of which one is the analogue of
   `beta`.** `beta(kappa)` is an infimum over levels at which a positive lower
   bound first exists, so `s*` is its counterpart and `s50`, `s90`, `s99` are
   levels at which the sieve recovers a fraction of the true density, a
   different object. Separated: over `x >= 13` in reach here the `s*` route
   alone reads **3.4678** and the four-route pool **3.1579**, a dilution of
   0.3098, and the `s*` route sits 18.72 per cent below DHR against the pool's
   25.98 per cent. On the corpus's own published `s*` column out to `x = 43`
   (`lp-push-x43.md` section 3) that route is still climbing, least squares
   **+0.4297 per `ln x`**, and the fitted line reaches 4.26645 at `x = 104`.
   The definitional route is the one closest to DHR and the one with no sign of
   having converged. **[MEASURED]**
4. **The arithmetic in the headline does not match its own inputs.** 3.3152 is
   **22.2961** per cent below 4.26645 and 4.26645 is **28.6936** per cent above
   3.3152. Neither figure is 18 per cent. **[VERIFIED]**

**What the LP does establish, and it is not nothing.** At `x = 7`, `kappa = 2`,
level `D = 21`, the LP optimum is **exactly** `0/1` in rational arithmetic, and
one constraint higher, at `D = 30`, it is exactly `1/15` of `V(z)`, that is the
value `1/210 = 0.004761904762` the target note printed at float precision. That
certifies the target note's section 3.5 barrier as an exact statement rather
than a residual: at that finite level no argument reading only the
divisor-class counts of that profile can prove a survivor exists. It is a
barrier for one profile at one finite level, which is what it says and not what
the headline says. **[VERIFIED]**

**The other three claims.**

| claim | grade | what changed |
|---|---|---|
| a, Selberg's reciprocal convention | **CONFIRMED**, second source found off the OCR channel | Ford, `sieve2023.pdf` section 3.1 p. 37, at the page: "Some authors, e.g. Selberg, refer to `1/beta(kappa)` as the sieve limit." The section title is reproduced independently from the same Google Books channel (1 result, page PA65). The *constant* `a_k < e^{1-1/k}/k` is still OCR-only and still uncorroborated except asymptotically |
| b, Brady's floor at `kappa = 2` | **CONFIRMED and strengthened** | Brady's class is stated on his p. 10 and it is the axiom-only interval class Face 4 needs, level `= |A|`, remainder `|r_d| <= kappa(d)`, which the target note never checked. His `v_R` table is reproduced here to 5 decimals, and the identity `v_{2d+2} = v_{2d+1}` that his Corollary 3 proof asserts without proof is **confirmed at `d = 0, 1, 2`**, so both `kappa = 2` values now rest on verified facts |
| c, `beta(2) >= 2` by padding | **CONFIRMED but demoted** | The padding construction is sound and unnecessary. `(Omega)` is one-sided, so the dimension-1 class sits **inside** the dimension-2 class, so Selberg's `kappa = 1` extremal example is itself a legal dimension-2 problem and `beta(2) >= beta(1) = 2` is two lines from Ford's own Definition 2 and his own "The lower bound `beta(1) >= 2` is clear from Selberg's examples in Section 1.7.4". Not folklore-probably: a definitional consequence |

**The floor on `beta(2)` after this review, restated.** Unconditional and
resting on published theorems alone: `beta(2) >= 2`, by class inclusion. Resting
on Brady's chain alone, without the inclusion argument: `beta(2) >= 1.819592`.
Nothing enters `(2, 4.26645]`. The corpus's measured 3.3152 is inside the band
and is now graded as an instrument reading with no error bar, a free profile
parameter worth a factor 1.45, and a calibration that misses its own second
anchor by 72 per cent.

---

## 1. Claim a: Selberg's reciprocal convention. CONFIRMED, with one page correction

**What the target note claims.** Selberg's *Lectures on Sieves* section 17,
titled "Some upper bounds for sifting limits for constant sifting density",
states **lower** bounds on `beta_kappa`, because Selberg writes `a_k = 1/beta_kappa`.
Every Selberg quotation in the target note is a Google Books OCR snippet with
the fraction bars lost, and the note says so.

**The convention itself: CONFIRMED off the OCR channel.** Ford, *Sieve Methods
Lecture Notes, Spring 2023*, section 3.1 p. 37, read from the PDF text layer of
`ford126.web.illinois.edu/sieve2023.pdf` (sha256 `a6e8462f…`, fetched
2026-09-04 with a desktop Chrome user agent), immediately after his Definition 2:

> "Some authors, e.g. Selberg, refer to `1/beta(kappa)` as the sieve limit."

That is a second source, in print, on a channel with no OCR in it, for exactly
the inversion the target note discovered. **[PROVEN, read at the page.]** The
target note quoted Ford's Definition 2 and his Table 1 caption but not this
line, which is the one that settles its own headline find.

**The section title: reproduced independently on the same channel.** The Google
Books search-within endpoint for volume `JswcQj2B1HIC`, query
`"upper bounds for sifting limits"`, returns `number_of_results: 1`, page id
`PA65`, snippet

> "… **upper bounds for sifting limits** for constant sifting density 18. A
> historical digression , the parity principle and a further example 19.
> Sifting on an interval , the uses of Fourier analysis 20. An extremal problem
> with application to …"

which is the table of contents and reproduces the target note's reading of it.
It is the same channel, so it is a reproduction and not a corroboration.
**[PROVEN that the section carries that title; the channel is unchanged.]**

**A third source for the direction, and this one is independent.** Brady,
*Sieves and iteration rules*, Stanford 2017, printed p. 11, PDF text layer of
`notzeb.com/phd-thesis.pdf` (sha256 `792ec8f3…`):

> "From this, one can improve a lower bound Selberg gave for the sifting limit
> `beta_kappa` by a factor of 2. **Corollary 1.** `beta_kappa >= (1 + o(1)) 2kappa/e`."

Selberg's bound was therefore `(1+o(1)) kappa/e` asymptotically, which is what
`beta_kappa > kappa e^{1/kappa - 1}` tends to. So the **form** of the constant
the target note read out of the snippet is corroborated by a source that never
saw the snippet. **[PROVEN for the asymptotic form.]**

**What is still uncorroborated, and this is the residual.** The finite-`kappa`
constant `a_k < e^{1-1/k}/k`, and therefore the value `beta_2 > 2e^{-1/2} = 1.213`,
rests on one OCR snippet with the fraction bars lost and nothing else. Since
1.213 is below the 1.819592 that Brady's chain gives at the page, nothing in the
corpus depends on it, and the honest move is to stop quoting the 1.213 rather
than to try to source it. **[The check that would settle it, a page image of
*Lectures* pp. 199-203, has not run.]**

**One page correction owed.** The target note cites Halberstam's review at
*Bull. AMS* **40** (2003) **p. 116**. The sentence is on **p. 117**. Verified by
isolating PDF page 9 of `S0273-0979-02-00957-6.pdf` (sha256 `20cf2c58…`, http 200
with a desktop user agent after the note's own 403 on a plain fetch), whose
running header reads "BOOK REVIEWS 117" and which carries

> "Concrete examples like Selberg's when `kappa = 1` and Iwaniec's when
> `kappa = 1/2` are not known and greatly to be desired. We have `beta_{1/2} = 1`
> and `beta_1 = 2`, and Selberg has given a convincing argument that suggests
> that `beta_kappa ~ 2kappa` as `kappa -> infinity` … existing methods yield
> only `beta_kappa ~ 2.44 … kappa`, so probably much remains to be done."

Page 116 is PDF page 8 and does not contain it. **[VERIFIED.]** Two further
things fall out of that paragraph and both matter downstream: Halberstam gives
`beta_{1/2} = 1` as proven, which is the second anchor section 4 uses, and he
prints the `2.44 kappa` growth the target note attributes to Franze alone, so
the corpus can source that figure twice rather than once.

**The absence itself.** "Not known and greatly to be desired" is a statement
that no example is **known**, not that none exists. The target note reads it
correctly in its own section 1 and then, in the SEARCH-CONVENTIONS row it
proposes, writes that a `kappa > 1` extremal example "does not exist". Those are
different claims and only the first is sourced. See section 5, item 7.

---

## 2. Claim b: Brady's floor at `kappa = 2`. CONFIRMED and strengthened

**The definition, which the target note did not check and which is the whole
question.** The brief asks under what definition of the sifting limit Brady's
bound holds, and whether that definition is the one Face 4 needs. Brady states
it on his printed p. 10:

> "More generally, for any fixed value of `kappa`, if we take `|A| = z^s`, with
> `s` a constant greater than 1 and `z` going to infinity, we can ask for the
> asymptotically optimal bounds coming from the system of linear inequalities
> `|A_d| - kappa(d)|A|/d <= kappa(d)`, (1.1) where `kappa(d) = prod_{p|d} kappa_p`.
> Define sifting functions `f_kappa(s)`, `F_kappa(s)` by
> `(1+o(1)) f_kappa(s)|A| prod_{p<z}(1 - kappa_p/p) <= S(A, P_z) <= …`
> with `f_kappa(s)` as large as possible … given that the above inequality holds
> for all choices of weighted sets `A` satisfying (1.1)."

and on his p. 3, `beta_kappa = inf{s | f_kappa(s) > 0}`.

So Brady's class is: any weighted set, `omega(d)` classes per prime, remainder
bounded by `omega(d)` itself, level `= |A| = z^s`, optimum over the whole linear
relaxation with no restriction to any sieve construction. **That is the
axiom-only interval class, at remainder `|r_d| <= omega(d)` and level `H` rather
than `H^{1-eps}`, which is Face 4's class or slightly more generous.**
**[PROVEN, read at the page.]** The target note's own falsification item 4 worried
that Brady's `inf{s : f_kappa(s) > 0}` might be "a property of the DHR
delay-differential pair" and a different object sharing a symbol. It is not; it
is the linear-relaxation optimum, and the note's caveat there should be struck.

**The `kappa = 2` substitution, re-derived.** Brady's Corollary 3 proof, printed
p. 51, runs: suppose `beta_kappa < 2d+3`; take `P` the primes between `y^{1/(2d+3)}`
and `y^{1/beta_kappa}`; then `v = sum_{p in P} kappa/p = (kappa + o(1)) log((2d+3)/beta_kappa)`;
the product of any `2d+3` of them exceeds `y`, so a nontrivial lower bound sieve
forces `kappa log((2d+3)/beta_kappa) <= v_{2d+2} = v_{2d+1}`. Rearranged,
`beta_kappa >= (2d+3) exp(-v_{2d+2}/kappa)`, and that holds whether or not the
supposition does, since `exp(-v/kappa) <= 1` makes the right side at most `2d+3`.
The `kappa >= 3` in his statement comes only from optimising `d = floor(kappa - sqrt kappa) - 1`,
which is negative at `kappa = 2`. Both readings check out. **[VERIFIED by
re-derivation.]**

**The gap the target note flagged, now closed.** The `d = 0` evaluation needs
`v_2`, an **even** `R`, and Brady's own algorithm (his p. 45, line 23: "assume R
odd, otherwise decrease it by 1") never computes one; his table on p. 46 lists
odd `R` only, and `v_{2d+2} = v_{2d+1}` is asserted inside the Corollary 3 proof.
Selberg's `floor((R+1)/2) <= v_R <= R` alone gives only `v_2 <= 2` and hence
`beta_2 >= 3e^{-1} = 1.1036`. The model problem is re-derived here from Brady's
p. 10 definition and solved for even `R` as well:

| `R` | `v_R` here | Brady p. 46 |
|---|---|---|
| 1 | 1.000000 | 1 |
| 2 | 1.000000 | not tabled |
| 3 | 2.000000 | 2 |
| 4 | 2.000000 | not tabled |
| 5 | 3.117135 | 3.11714 |
| 6 | 3.117135 | not tabled |
| 7 | 4.143771 | 4.14377 |

His odd column is reproduced to the precision he prints, and
`v_{2d+2} = v_{2d+1}` holds at `d = 0, 1, 2`. **[VERIFIED.]** `v_2 = v_1 = 1`
also falls out by hand in three lines: `theta(n) = 1 + lambda_1 n + lambda_2 C(n,2)`
needs `lambda_1 <= -1` from `n = 1` and `lambda_2 <= 0` from `n -> infinity`, so
the objective `1 + lambda_1 v + lambda_2 v^2/2` is at most `1 - v`. **[DERIVED.]**

So the two `kappa = 2` values are:

- `d = 0`: `3 e^{-1/2} = 1.819592`, resting on Theorem 22 at `R = 1` plus
  `v_2 = v_1`, both now verified.
- `d = 1`: `5 e^{-1} = 1.839397`, resting on `v_4 = v_3 = 2`, computed twice by
  independent code and not proven by any theorem in the thesis.
- `d = 2`: `1.473061`, worse. Corollary 1's asymptotic `2 kappa/e = 1.471518` at
  `kappa = 2` is worse still, as the target note says.

**Grade: CONFIRMED.** The correction owed is small and runs the right way: the
target note's own falsification item 4 is closed, and the headline floor
"resting on a citation alone" should be quoted as **1.819592**, the value backed
by a proved inequality, with 1.839397 given as the computational refinement.
The note quotes 1.8394 as the headline, which is the weaker-provenance one.

**What Brady does not give.** No `kappa = 2` extremal example, and he says so in
his own words on p. 3: "It is currently not known whether there is any
`kappa > 1` with `beta_kappa < 2kappa`." Nothing here reaches 2, let alone the
band.

---

## 3. Claim c: `beta(2) >= 2` by padding. CONFIRMED, and unnecessary

**The target note's construction, checked.** `A' = {ab : a in A, b in B}` with
multiplicity, `B = {m <= M}`. The three steps hold with the bookkeeping written
out.

- *Dimension.* For squarefree `d`, `d | ab` iff every `p | d` divides `a` or `b`,
  and `[p|a or p|b] = [p|a] + [p|b] - [p|a][p|b]`, so
  `|A'_d| = sum (-1)^{omega(d_c)} |A_{d_a d_c}| |B_{d_b d_c}|` over the
  `3^{omega(d)}` ways of splitting the primes of `d` into "divides `a` only",
  "divides `b` only", "divides both". The main terms multiply out to
  `|A||B| prod_{p|d}(g_A(p) + g_B(p) - g_A(p)g_B(p))`, which is `|A'| g'(d)` with
  `g'(p) = g_A(p) + g_B(p) - g_A(p)g_B(p)`, so
  `sum_p omega'(p) log p / p = (kappa + kappa_B) log z + O(1)`. **[DERIVED, and
  it is the note's step 1 with the cross term made explicit.]**
- *Sifted count.* `ab` is `z`-rough iff both factors are, so
  `S(A',z) = S(A,z) S(B,z)`, and `V_{kappa+1} = V_kappa V_1`, so the normalised
  densities multiply. With `M = D^{1+eps}` and `s >= 1` the second factor is
  `Theta(1)` by Buchstab, so a factor tending to 0 times a bounded factor tends
  to 0. **[DERIVED.]**
- *Remainder, which the note left sketched.* Each of the `3^{omega(d)}` terms
  expands as `g_A |A| r_B + g_B |B| r_A + r_A r_B`. The first group is bounded by
  `|A| sum_{f <= D} 3^{omega(f)} |r_B(f)|`, and for `B` a full interval
  `r_B(f) = O(1)`, so that is `O(|A| D log^2 D)`, which is `o(|A| M / log^C)`
  as soon as `M >> D log^{C+2} D`. The second group needs `A`'s remainder sum
  with a `3^{omega}` weight, which is the shape the remainder axiom already
  carries. So the padding survives at `M = D^{1+eps}`, and the step the note
  flagged as unchecked does check out. **[DERIVED. Nobody has reviewed this
  either; it is one adversary's arithmetic, not two.]**

**And it is not needed, which is the finding.** Ford's dimension axiom is
one-sided (`sieve2023.pdf` p. 18, at the page):

> `(Omega)  prod_{y<=p<=w} (1 - g(p))^{-1} <= (log w / log y)^kappa exp(B/log y)`,
> `(2 <= y <= w <= z)` … "It is easy to show … that condition `(Omega)` is
> implied by the condition `(Omega_0) g(p) <= min(kappa/p, 1-delta)`."

An upper bound. So `(log w/log y)^kappa <= (log w/log y)^{kappa'}` for
`kappa <= kappa'` and `w >= y` gives: **every dimension-`kappa` sieve problem is
a dimension-`kappa'` sieve problem for every `kappa' >= kappa`.** Ford's
Definition 2 quantifies over "any sieve problem `A` satisfying `(g)`, `(r)`, and
`(Omega)`", and the normalisation `V(z)` is the problem's own, so the same
sequence has the same normalised sifted density in both readings. Hence
`beta(kappa)` is non-decreasing in `kappa`, and with Ford's own

> "The exact value of `beta(kappa)` is known only for `kappa` in `[0,1/2] u {1}`,
> in these cases `beta(kappa) = 1` for `kappa <= 1/2` and `beta(1) = 2`. …
> The lower bound `beta(1) >= 2` is clear from Selberg's examples in Section 1.7.4."

Selberg's Liouville set is itself a legal dimension-2 problem and
**`beta(2) >= beta(1) = 2`** follows in two lines with no auxiliary sequence, no
product construction and no remainder bookkeeping at all. **[DERIVED from two
sourced statements in one document.]**

**Grade: CONFIRMED, demoted in status.** The target note records monotonicity as
`[ABSENT in the six sources read]` and its own derivation as "unreviewed,
almost certainly folklore". The second half is right and understated: it is a
one-step consequence of a definition and an axiom printed on facing sections of
one of the six sources, so the correct rung is not "derived here" but "immediate
from Ford section 3.1 and section 2, not stated there". Recording it as an
absence in the literature reads as a stronger negative than the situation
supports.

**Is it in print?** Not located, searched in the owning convention named in
section 5's proposed row (Selberg's reciprocal convention `a_k`, and "the model
problem", `v_R`): full-text greps of Ford's 129 pages, Brady's 133, Franze's 6
and Halberstam's 10 for `monotone`, `increasing in`, `non-decreasing` return
nothing about `beta` in `kappa`. That is four documents, not a literature
search, and the claim it supports is only that four sources that define `beta`
do not remark on the monotonicity, which is what one expects of a two-line
consequence.

---

## 4. Claim d, the headline: REFUTED as stated

The four grounds are in section 0. This section is the evidence, and it opens
with the part that goes the target note's way.

### 4.1 The control, and one thing the target note got exactly right

The twelve published raw `s*` cells of `research/lp-push-x43.js` reproduce on a
third, independently written solver, worst disagreement `4.23e-5` against a
printing precision of `1e-4`. Three implementations now agree: the corpus's
revised simplex on a Mobius crash basis, the target note's dense two-phase
tableau, and this one. **[VERIFIED.]**

More than that, the target note's section 3.5 barrier is now exact rather than
floating. Rebuilding the optimum over `Q` from its own support and checking
primal feasibility and non-negativity in rational arithmetic:

| `x` | `kappa` | rank | `D` | `s` | exact `rho*` |
|---|---|---|---|---|---|
| 7 | 1 | 6 | 7 | 1.0000 | `0/1` |
| 7 | 1 | 7 | 10 | 1.1833 | `19/48` |
| 7 | 2 | 10 | 21 | 1.5646 | `0/1` |
| 7 | 2 | 11 | 30 | 1.7479 | `1/15` |

`1/15` of `V(z) = 1/14` is `1/210 = 0.004761904762`, which is the target note's
own printed value at that level, now certified exactly. **[VERIFIED.]** The
statement that carries is the one the target note itself makes at the end of its
section 3.5: this is a barrier for the method at that finite level and for that
profile, not for the truth.

### 4.2 (i) Is the LP the exact dual of every axiom-only argument?

**The duality half of the target note's argument is right and does not need
defending.** The primal minimises `y_empty` over non-negative measures on divisor
patterns matching every level-`D` moment, and its dual is
`max sum_T pi_T g(T)` subject to `sum_{T subset S} pi_T <= [S = empty]`, which
under `lambda_d = pi_T` is the general minorant condition with no restriction to
`Lambda^2` form or to bounded `lambda`. Stronger than duality: a feasible primal
point with `y_empty = 0` is a **model** of the axioms with no survivors, so no
argument of any shape, linear or not, that reads only those moments can prove a
survivor exists. That part stands. **[PROVEN, and it is standard.]**

**The class half does not.** "The axiom-only information class" is not a single
LP, because the axioms do not name a single `g`. Two families were searched.

| family | at `x = 11` | at `x = 13` |
|---|---|---|
| A: `omega(p) <= min(2, p-1)`, inside Ford's `(Omega_0)` | 161 profiles, best `s* = 1.7472`, the constant profile, **does not beat it** | 485 profiles, best `s* = 2.0847`, the constant profile, **does not beat it** |
| B: `omega(p) <= p-1` under the classical `(Omega_2(kappa,L))` budget | 749 profiles, best `s* = 2.4184` at `[1,2,3,2,4]`, `L = 0.8720`, ratio **1.3841** | 3748 profiles, best `s* = 3.0196` at `[1,2,2,4,4,4]`, `L = 1.5350`, ratio **1.4484** |

Inside `(Omega_0)` the corpus's choice is the maximum, which is a point in its
favour and is recorded as such. Inside the classical axiom it is not, and the
gap is a factor 1.45 at `x = 13`. Applying the corpus's own calibration rule to
the family-B winners:

| `x` | `L` cap | best `s*` | profile | `L` used | calibrated reading | against `beta_2 = 4.26645` |
|---|---|---|---|---|---|---|
| 11 | 0 | 1.5587 | `[1,2,1,3,0]` | 0.0000 | 2.8326 | under |
| 11 | 0.5 | 2.2299 | `[1,2,2,3,2]` | 0.4360 | 4.0523 | under |
| 11 | 1 | 2.4184 | `[1,2,3,2,4]` | 0.8720 | **4.3948** | **OVER** |
| 13 | 0 | 1.6334 | `[1,2,2,3,1,0]` | 0.0000 | 2.7108 | under |
| 13 | 1 | 2.3921 | `[1,1,2,4,4,1]` | 0.9431 | 3.9699 | under |
| 13 | 2 | 3.0196 | `[1,2,2,4,4,4]` | 1.5350 | **5.0113** | **OVER** |

The target note's own pre-registration, its P3: "If any calibrated reading
exceeds the DHR value at its own `kappa`, the calibration that produces the
3.3152 floor is refuted and that floor may not be quoted again in this corpus."
It fires as soon as the profile is allowed to move inside the class, at
`L = 0.8720` at `x = 11` and `L = 1.5350` at `x = 13`. And the corpus's own
constant profile is not the `L = 0` profile: it needs `L = 0.4360` at `x = 11`
and `L = 0.4965` at `x = 13`, so the argument that `L` must be held at zero is
not available. **[VERIFIED.]**

The general point behind the table: `L` and Ford's `B` are fixed constants that
the asymptotic sifting limit does not depend on, but at finite `x` a larger `L`
buys a larger barrier without limit, so **the finite-`x` LP does not define a
class barrier at all until a profile is fixed by hand**, and the corpus fixes
one by hand. Answer to (i): the LP is the exact dual of every axiom-only
argument **for the profile it is given**, and it is not the class.

### 4.3 (ii) Does a finite-`x` LP value bound the asymptotic limit?

**No theorem, and the data says the question is not rhetorical.** Nothing in the
corpus, in Ford, in Brady, in Franze or in Halberstam's review states any
relation between the finite-`z` linear relaxation's threshold and
`lim_{z->infinity}`. `rho*` is monotone in `D` at fixed `x`, which is what the
bisection uses; monotonicity or convergence **in `x`** is asserted nowhere.

The measurements make the direction of the bias non-uniform, which is the part
that matters:

| `kappa` | proven `beta` | raw `s*` at `x = 23` | ratio |
|---|---|---|---|
| 1/2 | 1 | **1.0000** | **1.000** |
| 1 | 2 | 1.1601 | 0.580 |
| 2 | not known | 2.0238 | not applicable |

At `kappa = 1/2` the raw threshold is exactly the truth, at all six levels
`x = 7 … 23`, flat. At `kappa = 1` it is 58 per cent of the truth, and the
corpus's own least squares on its published column puts its slope at `-0.025`
per `ln x`, that is drifting very slightly the wrong way. There is no
finite-size correction consistent with both rows, and there is no evidence of
convergence in the row where convergence is needed. Answer to (ii): it is a
measurement at that `x`, with no monotonicity theorem behind it, and the
instrument's bias is 0 per cent at one proven point and 42 per cent at the
other.

**The second anchor, stated as the falsification test it is.**

| `x` | `s*(1/2)` | `s*(1)` | correction `2/s*(1)` | reading at `kappa = 1/2` | error against the proven 1 |
|---|---|---|---|---|---|
| 7 | 1.0000 | 1.1833 | 1.6902 | 1.6902 | +69.0% |
| 11 | 1.0000 | 1.1006 | 1.8172 | 1.8172 | +81.7% |
| 13 | 1.0000 | 1.2051 | 1.6596 | 1.6596 | +66.0% |
| 17 | 1.0000 | 1.1500 | 1.7392 | 1.7392 | +73.9% |
| 19 | 1.0000 | 1.1976 | 1.6700 | 1.6700 | +67.0% |
| 23 | 1.0000 | 1.1601 | 1.7239 | 1.7239 | +72.4% |

Mean signed error `+0.7167`. The effect the headline rests on is `0.2869`.
**[VERIFIED.]** And the same `kappa = 2` quantity, read from the two legal
anchors:

| `x` | reading(2) anchored at `kappa = 1/2` | reading(2) anchored at `kappa = 1` | spread |
|---|---|---|---|
| 13 | 2.0847 | 3.4597 | 1.3751 |
| 17 | 2.0468 | 3.5598 | 1.5130 |
| 19 | 2.0262 | 3.3837 | 1.3575 |
| 23 | 2.0238 | 3.4889 | 1.4651 |

**One caveat on this test, stated because it is the obvious counter.** The
`kappa = 1/2` column reads exactly 1 for a reason that can be written down: for
`x <= ~300`, `sum_{p <= x} 0.5/p < 1`, so the Bonferroni bound alone forces
`y_empty > 0` the moment every singleton `{p}` is constrained, which happens at
`D = x`, that is `s = 1` exactly. So the agreement with `beta(1/2) = 1` is
produced by the union bound rather than by the LP's depth, and it will break at
larger `x`. That does not weaken the test: whatever the mechanism, the raw
instrument reads the truth at one proven point and 58 per cent of it at the
other, and no single multiplicative correction serves both. **[MEASURED, with
the mechanism identified.]**

### 4.4 (iii) Is "passed 0 of 15" evidence, and what would a failure look like?

**It is a consistency check that was pre-registered to pass with margin, and it
passed with margin.** The calibrated reading is `2 s*(kappa)/s*(1)`; DHR's own
values grow like `2.44 kappa` (Franze at the page, arXiv:1012.3809 p. 2: "The
calculations in Chapter 17 of [4] show that for the DHR sieves,
`beta_kappa <~ 2.44 kappa`"; and Halberstam, *Bull. AMS* 40 p. 117 prints the
same figure). So failure requires the raw ratio `s*(kappa)/s*(1)` to exceed
`beta_kappa/2`, which grows like `1.22 kappa`, while the measured ratio grows
much more slowly:

| `x` | `kappa` | measured `s*(kappa)/s*(1)` | needed to fail | margin |
|---|---|---|---|---|
| 13 | 2 | 1.7299 | 2.1332 | 18.9% |
| 13 | 3 | 1.9301 | 3.3204 | 41.9% |
| 13 | 4 | 2.5056 | 4.5361 | 44.8% |
| 19 | 2 | 1.6919 | 2.1332 | 20.7% |
| 19 | 4 | 2.9998 | 4.5361 | 33.9% |

The target note's own pre-registration forecast the `kappa = 3` reading into
`[4.5, 6.0]` and the `kappa = 4` reading into `[5.5, 8.0]`, "that is below the
DHR value with margin at both". A test whose author correctly predicts it will
pass with 20 to 50 per cent margin, and which then does, transfers little belief.
It rules out a gross calibration error and it does not distinguish "the floor is
tight" from "the floor is loose by any factor up to 1.29". Answer to (iii):
consistency, not evidence for the floor. What a failure would have looked like
is on the table in section 4.2: it looks like a legal profile, and one exists.

**The target note's own disconfirming reading, checked and endorsed.** It notes
that the reading/DHR ratio **falls** with `kappa` and reads that as the
instrument being conservative. Reproduced here: 18.9, 41.9, 44.8 per cent margin
at `kappa = 2, 3, 4` at `x = 13`. That reading is correct and it argues against
the note's own headline, since a floor that loosens with `kappa` is a floor that
is not measuring the class limit.

### 4.5 (iv) Is "method artefact" the right word, and the calibrated sentence

**No, on two grounds.** First, the LP threshold is a **lower** bound on what the
class permits, and `beta_2 = 4.26645` is an **upper** bound on the same
quantity, so a lower bound sitting below an upper bound is the generic situation
and carries no information about which end is tight. To call the cap an artefact
requires exhibiting an axiom-only argument that beats it, and the LP exhibits
none: its dual optimum at level `D` is a sieve at that finite level and says
nothing about the asymptotic exponent. Second, the definitional route is heading
the other way: on the corpus's own published `s*` column,

`3.4597, 3.5598, 3.3837, 3.4889, 3.7734, 3.8149, 3.7769, 3.8529, 3.9487` at
`x = 13 … 43`,

least squares against `ln x` gives **+0.4297 per `ln x`**, and the fitted line
reaches 4.26645 at `x = 104`. The last three levels average 3.8595 and are still
rising. **[MEASURED. A linear fit in `ln x` over nine points with no theory
behind the functional form, offered as a description of the trend and not as an
extrapolation to trust.]** The data is consistent with the class limit being
4.26645, that is with the DHR sieve being optimal at `kappa = 2`; it is also
consistent with a limit near 3.5. It does not separate them.

**The calibrated sentence, proposed.**

> The level-`D` linear program is the exact dual of every argument that reads
> only the divisor-class counts of a **given** `omega`-profile at level `D`, and
> its optimum being zero is a rigorous barrier for that profile at that level;
> at `x = 7`, `kappa = 2`, `D = 21` that optimum is exactly `0` in rational
> arithmetic. Turning it into an exponent requires two free choices the axioms
> do not make: which profile, worth a factor 1.45 at `x = 13`, and how to
> correct the finite-`x` bias, a correction of about 1.72 whose one-point fit
> misses the second proven anchor `beta(1/2) = 1` by 72 per cent. The corpus's
> calibrated reading of 3.3152 is therefore a measurement of the instrument as
> much as of the class, and whether `beta_2 = 4.26645` is attained or merely
> attainable is **open**, with the definitional route on the corpus's own data
> still climbing toward it at `+0.43` per `ln x`. **[MEASURED.]**

---

## 5. Claim e: the eight proposed live-layer changes

**Two survive verbatim, five need rewording, one is refuted.**

| # | target | grade | note |
|---|---|---|---|
| 1 | `paper/wall-note.md`:422-429, insert the LP floor as "a measured floor inside the band … a statement about exactly this class" | **REFUTED** | The floor is not a statement about the class; section 4.2 shows the class contains profiles whose calibrated reading exceeds `beta_2`. Replacement text below |
| 2 | `paper/wall-note.md`:419-421, "no lower bound above 2 is known" | **REWORD** | The direction is right and two details are wrong: the citable floor is 1.819592, not 1.8394, and `beta(2) >= 2` is not "unreviewed and probably folklore" but immediate from Ford's own `(Omega)` and his own `beta(1) >= 2`. Replacement below |
| 3 | `research/sift-limit-attack.md`:143, split the `[ABSENT]` and cite Halberstam | **REWORD** (one citation) | The split is right and survives. The citation is *Bull. AMS* **40** (2003) **p. 117**, not p. 116, verified by isolating the printed page |
| 4 | `research/sift-limit-attack.md`:169, add "no published lower bound reaches 2 either, best located 1.8394" | **REWORD** | Quote 1.819592 as the proved value, and the sentence must not stop there, because `beta(2) >= 2` does follow from the axioms. Replacement below |
| 5 | `research/sift-limit-attack.md` section 2, the Franze paragraph | **SURVIVES verbatim** | Every clause verified at arXiv:1012.3809v1: the `2.44 kappa` line, the `≲`/`≳` contradiction, "approached rapidly from below" describing his own table. Add that Halberstam's 2003 review prints the same `2.44 kappa`, so the figure has two sources |
| 6 | `research/history/staging/object-g2-read-0829.md`:532-534 | **REWORD**, same as items 1 and 2 | Its sentence "`beta(kappa)` is unknown for every `kappa > 1/2` except `kappa = 1`" is Ford's own and is fine; what needs adding is the lower-bound half, not the LP floor |
| 7 | `research/SEARCH-CONVENTIONS.md` section 1, the new row | **REWORD** (one clause struck) | Gate effect measured, below. Strike "which at `kappa > 1` does not exist": Halberstam says not known, which is a different claim, and this file is the one place where that distinction is the whole point |
| 8 | `research/THE-DIALS.md`:276-279, footnote the `beta_kappa` column | **SURVIVES verbatim** | The column does print a proven two-sided 2 beside an upper-bound-only 4.2665 with no mark, and a footnote is owed. Ford's Table 1 is captioned "Known **upper** bounds" for exactly this reason |

### 5.1 Replacement text for items 1, 2, 4

**Item 1**, in place of the target note's proposed insertion at
`paper/wall-note.md`:429:

> No barrier theorem. The corpus's own level-`D` linear program does return an
> exact barrier at finite levels for a fixed profile, certified in rational
> arithmetic at `x = 7`, `kappa = 2`, `D = 21`
> (`history/staging/redteam-0904-sifting-limit.md` section 4.1), and turning
> that into an exponent needs two choices the axioms do not make, so its
> calibrated reading of 3.3152 is not a floor on the class and must not be
> quoted as one. What can be said is that no axiom-only argument has been
> exhibited anywhere inside the band, and that the corpus's own definitional
> route is climbing toward 4.26645 rather than away from it.

**Item 2**, in place of `paper/wall-note.md`:419-421's "and no such lower bound
is known":

> and no lower bound on `beta(2)` above 2 is known. Lower bounds below and at 2
> are in print or immediate from what is in print: Selberg's *Lectures* section
> 17 in his reciprocal convention `a_k = 1/beta_kappa` (Ford, *Sieve Methods*
> 2023, p. 37: "Some authors, e.g. Selberg, refer to `1/beta(kappa)` as the
> sieve limit"), Brady 2017's Theorem 22 evaluated at `kappa = 2` giving
> `beta_2 >= 3e^{-1/2} = 1.8196`, and `beta(2) >= beta(1) = 2` by the fact that
> Ford's dimension axiom `(Omega)` is one-sided, so Selberg's `kappa = 1`
> extremal example is itself a legal dimension-2 problem
> (`history/staging/redteam-0904-sifting-limit.md` section 3).

**Item 4**, appended at `research/sift-limit-attack.md`:169:

> and no published lower bound on `beta(2)` exceeds 2 either. The best resting
> on a proved inequality is `3e^{-1/2} = 1.8196` from Brady 2017 Theorem 22 at
> `d = 0`, `1.8394` using his computed `v_4 = 2`; `beta(2) >= 2` follows from
> the one-sidedness of the dimension axiom and is the band's lower endpoint, not
> a point inside it.

### 5.2 The SEARCH-CONVENTIONS row and the gate

Section 1 is parsed at run time by the `search-convention` check
(`research/qc/checks.js`, `conventionVocabulary`), which harvests bold spans and
quoted phrases of at least three words from the OWNING column, the first
comma-delimited segment of that column in plain text, and any OEIS A-number,
arXiv id or MathOverflow id in the OWNING and "where it lives" columns.

Simulated by parsing the file with the proposed row spliced in, against the
current file, using the check's own rules and the repo's own `norm`:

- **phrases before 101, after 104. Exactly three are added:**
  `selberg's reciprocal convention a_k = 1/beta_kappa`,
  `upper bounds for sifting limits`, `selberg's model problem`.
- **Body markdown documents already containing any of the three: zero**, over
  all 87 non-history markdown documents.

So **adding the row changes nothing about what clears the gate for any existing
absence claim.** It only widens what a future paragraph can clear with.
**[VERIFIED.]** Three cautions on the row as drafted:

1. `"sifting density"` and `` `v_R` `` are two words and one word, so the
   parser drops them. The row instructs a searcher to use terms the gate will
   not accept as evidence of having used them. Harmless, worth knowing.
2. `upper bounds for sifting limits` is a phrase a paragraph can carry by
   quoting a section title without having opened the section. That is inherent
   to a check that asks only whether a paragraph says where it looked, and
   section 6 of the conventions file already says so.
3. The clause "which at `kappa > 1` does not exist" must go, per item 7.

---

## 6. Provenance

| source | what was read | how | sha256 / locator |
|---|---|---|---|
| Ford, *Sieve Methods Lecture Notes, Spring 2023* | p. 18 `(Omega)` and `(Omega_0)`; section 3.1 p. 37 Definition 2, the reciprocal-convention line, `beta(1) >= 2`, Table 1 caption | `curl` with a desktop Chrome user agent, http 200, `pdftotext -layout`, full text | `ford126.web.illinois.edu/sieve2023.pdf`, `a6e8462f1e76606614e5c2891b419515be408d5f11f0b82915f5c24e05c00e06` |
| Brady, *Sieves and iteration rules*, Stanford PhD 2017 | pp. 1-3 the problem and `beta_kappa = inf{s | f_kappa(s) > 0}`; p. 10 the linear relaxation (1.1) and the model problem; p. 11 Theorems 6, 7, 8 and Corollary 1; p. 45 Algorithm 1; p. 46 the `v_R` table; p. 51 Corollary 3 with its proof and Theorem 22 | `curl` with a desktop Chrome user agent, http 200, `pdftotext -layout`, full text | `notzeb.com/phd-thesis.pdf`, `792ec8f34434d326b63cc2749a1a61c46a15701c799d6fb679063de3a9d9612c` |
| Halberstam, review of Greaves, *Bull. AMS* **40** (2003) | the whole review; the "Concrete examples" paragraph isolated to its printed page | AMS PDF, http 200 with a desktop user agent after locating the article id in the volume index; `pdftotext -layout -f 9 -l 9` to fix the page | `S0273-0979-02-00957-6.pdf`, `20cf2c58d03596782dc3552e189f8b1c92ebb2b4898e7cd4adac8c51700b8d9c`; the quotation is on **p. 117**, PDF page 9 |
| Franze, *Sifting limits for the `Lambda^2 Lambda^-` sieve*, arXiv:**1012.3809v1** | pp. 1-2 the abstract, the `2.44 kappa` line, the `beta_kappa <~ 2kappa + 19/36` line, both tables, the Blight figures; p. 4 the `>~` occurrence | arXiv PDF, http 200, `pdftotext -layout` | `a2c1b516c4f0ee5c77397fac1c513bf6f4aeb1d6c89c457ff087c4e4956e572d` |
| Selberg, *Lectures on Sieves*, Collected Papers II | the table of contents entry for section 17 | Google Books search-within, `books.google.dk/books?id=JswcQj2B1HIC&jscmd=SearchWithinVolume`, `number_of_results: 1`, page id `PA65`. **OCR snippet, no page image.** Same channel the target note used, so a reproduction and not a corroboration | vol. id `JswcQj2B1HIC` |
| `research/lp-push-x43.js`, `history/staging/lp-push-x43.md` | sections 1-5 and the embedded block | in repo | the twelve control cells, the four-route table, the pooled 3.3152 |
| `research/qc/checks.js`, `research/qc/corpus.js` | `conventionVocabulary`, `searchConvention`, `SEARCH_CONVENTIONS`, `norm` | in repo, and the parser re-run against a spliced copy held in memory | the gate simulation of section 5.2 |
| this note's own producer | all figures | `node research/qc/embed.js --force research/history/staging/redteam-0904-sifting-limit.js`, 29.4 s, 222 lines | code-sha256 `bd4f34a49792ad25…`, out-sha256 `607f06743d018e8a…` |

**Channels that failed or were not tried.** No page image of Selberg's *Lectures*
pp. 199-203 was obtained, so the constant `a_k < e^{1-1/k}/k` remains
single-source OCR; the target note records the same failure and this review adds
nothing to it. `purl.stanford.edu/gk881hk9239` was not fetched: the
`notzeb.com` copy was taken instead and the target note reports the two as
identical, which was not re-verified here. The Diamond-Halberstam book, MathSciNet
review text and zbMATH were not opened for this review. No literature search for
"is `beta` monotone in `kappa`" was run beyond full-text greps of the four PDFs
above, and section 3 says so rather than recording an absence.

---

## 7. What would falsify this red team

1. **A convention under which `(Omega)` is two-sided.** Section 3's whole
   demotion of the padding argument, and section 4.2's profile freedom, rest on
   Ford's `(Omega)` being an upper bound only. If the definition the corpus
   means by "the axiom class" pins the dimension exactly, then the dimension-1
   class is not inside the dimension-2 class, `beta(2) >= 2` needs the padding
   after all, and the family-B profiles are illegal. The check that has run is
   Ford p. 18 at the page and Halberstam-Richert's `(Omega_2(kappa,L))` as
   quoted second-hand in this corpus. The check that has **not** run is the DHR
   book's own Chapter 2 axioms at the page.
2. **A reason the `kappa = 1/2` anchor is not comparable.** Section 4.3 shows
   the raw threshold there is pinned at exactly 1 by the union bound while
   `sum_{p<=x} 0.5/p < 1`, which holds only to `x` of order 300. If somebody
   argues that the calibration is only meant to apply where the LP is not union-
   bound-limited, the second anchor is void and the strongest of the four
   grounds against the headline falls. The counter is that no such scope was
   ever stated, and that the `kappa = 1` column is not union-bound-limited and
   still misses its truth by 42 per cent.
3. **An `L` argument that pins the profile.** If a defensible finite-`x`
   normalisation fixes `L = 0`, family B collapses and the constant profile is
   again the maximum inside `(Omega_0)`. The measured obstacle is that the
   corpus's own constant profile needs `L = 0.4965` at `x = 13`, so `L = 0` does
   not contain it, but a different `L` convention might.
4. **`v_4 != 2`.** The `d = 1` value 1.839397 rests on `v_4 = v_3 = 2` computed
   twice, by Brady's Algorithm 1 and by the LP here, and proven by neither. The
   `d = 0` value 1.819592 does not depend on it.
5. **A defect in the model-problem LP.** `v_R` here is a bisection over a
   truncated program, `theta(n) <= 0` for `n <= 220` plus `lambda_R <= 0` plus a
   box of `1e5`. The truncation was checked at `N = 60, 120, 220, 400` with no
   movement in any digit printed, and the row scaling that made that true was
   added after an unscaled run drifted `v_5` to 2.911 at `N = 600`. If the
   truncation still bites at some `R`, the even-`R` confirmations weaken.
6. **A page image of Selberg's section 17.** It would settle the constant and
   could show the bound is stronger than `kappa e^{1/kappa - 1}`, which would
   move the citable floor without touching anything else here.
7. **The `s*` trend flattening above `x = 43`.** Section 4.5's fit is nine
   points and a straight line in `ln x`. If the corpus pushes the LP past 43 and
   the calibrated `s*` route stops climbing near 4.0, the "consistent with DHR
   being optimal" reading weakens and the target note's reading strengthens.
   That run has not happened and is the single cheapest test on this face.
