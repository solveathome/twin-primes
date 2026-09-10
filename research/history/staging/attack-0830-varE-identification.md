# The identification step of lim Var/E, attacked: one open step and not two, its remainder re-split by branch type and modulus band, a mis-doubled group in the record, and the inequality that does not close relocated to friable integers in progressions

<!-- ledger
id: Q-varE-identification-0830
status: PARTIAL
todo: 9
question: Can either open step behind lim Var/E = 0.45546 (the identification delta*(X - X_dec) -> 0, or the theta = 2 mean-coefficient replacement) be proven, and if not, which single inequality does not close?
verdict: Neither closes, and the two named steps are one statement (Conjecture 1 of variance-note sec.10; the model half is PROVEN in varE-limit-theorem.md). The remainder is re-split exactly at five levels: the corpus's X2 column doubles the positive half of one shift pattern (X2c = 2.66 against the group sum 0.09 at x = 19, PROVEN by rebuild), so its Xmix is overstated 2.3x; the true mixed remainder is MEASURED at -0.49 ln y and 82 % of it sits BELOW 2L, in the two-branch type, in the unbalanced range min(d,e) <= L^(2/5) (99.7 % of that cell at x = 19), outside the range of every bilinear Kloosterman-fraction bound; the divisor-distribution estimate the record names (n > 2L only) is therefore not the whole open step. Henriot's Corollary 2 (read at the page, erratum read) applies as stated and cuts the moduli to n <= L ln^(2+o(1)) y, PROVEN given that theorem; the one inequality left is the uniform o(1) equidistribution of y-friable squarefree integers in progressions to moduli up to y^(4/5), NOT SEARCHED at the page. The limit 0.45546 stays HEURISTIC. Not TPC-strength.
-->

*Staging note, 2026-08-30. TODO item 9, the "prove either step" move. Producer:
`research/history/staging/attack-0830-varE-identification.js` (embedded by
`node research/qc/embed.js`; PARTS A-G; no timing figure printed). Reads
`varE-theta2-step.md` sections 4-5 for the six-level group columns and
`variance-note.md` section 7 for the nine exact points; recomputes none of the
nine `Var/E` readings. Every number below is from the producer's embedded
block or is cited to the artifact that carries it. Nothing here is on the
critical path and nothing here is TPC-strength (section 7).*

## 0. Verdict, the part that did not move first

**Neither step closes.** No proof of `delta*(X - X_dec) -> 0` is given, and the
one inequality this pass carries the attempt to (section 4) is stated with its
quantifiers and left open. `lim Var/E = lambda_2(2) = 0.45546` stays HEURISTIC
on exactly the step it rested on before.

**The brief's two open steps are one.** The brief asks for "either of the two
open steps": the identification half of `varE-spectral.md` and "separately" the
theta = 2 mean-coefficient step. They are the same statement. The
identification of the true variance with the model is Conjecture 1 of
`paper/variance-note.md` section 10, `delta*(X - X_dec) -> 0`, and
`varE-theta2-step.md` section 1 proves that `X - X_dec` is exactly the
mean-coefficient replacement error written in real space. The record's SECOND
open step, the model's own limit theorem, is PROVEN (unreviewed) in
`varE-limit-theorem.md` and is not "in varE-spectral.md" as the brief has it:
`varE-spectral.md`'s ledger still says "TWO open steps" and has not been
updated to cite the sibling. Three more brief errors are logged in section 8.

**One record defect, PROVEN by rebuild (section 2).** The `delta*X2` column of
`varE-theta2-step.md` section 5, carried into `varE-theta2-proof.md` sections 3
and 7 ("measured `2X2 = 5.3`, flat near 5.3") and `paper/variance-note.md`
section 10 ("loose by a factor 14 to 48 against the measured `2X2 = 5.3`"), is
not the shift group it names: the producer doubles the positive-`h` half of the
`h = 2 (mod p)` pattern, and that pattern is the mirror image of the
`h = -2 (mod p)` pattern, not an even function of `h`. The group sum is
`2X2 = -0.56, 0.53, 0.27, 0.23, 0.18` at `x = 7..19` (PART F) against the
column's `|2X2| = 5.715, 5.628, 5.333, 5.352, 5.327` (`varE-theta2-proof.md` section 3, PART D). Since `X = X1 + 2X2 + Xmix` holds by
definition, the corpus's `Xmix` absorbs the difference: `delta*Xmix` is
`-0.034971, -0.046368, -0.025439, -0.020542, -0.016835` (this pass) against the
record's `-0.241840, -0.133037, -0.076748, -0.053095, -0.038804`. The bound
`|2X2| = O(ln y)` of `varE-theta2-proof.md` section 3 is unaffected, since it
bounds the group and the group is smaller than the column. No live file is
edited; the correction list is section 8.

**Nothing here touches the conjecture.** `variance-note.md` section 4 records
that `Var/E` over a uniformly random window says nothing about the one anchored
window the twin problem needs. Section 7 runs the wrong-direction test anyway.

With that said, what the pass produced:

- **PROVEN, elementary, checked on 3000 random coprime triples (PART A).** The
  CRT class of a mixed lag with parts `(n0, n+, n-)` is the Kloosterman
  fraction `c/n = 2( inv(n0 n-, n+)/n+ - inv(n0 n+, n-)/n- ) mod 1`, and
  `c = 2 n0 v` with `v^2 = inv(n0)^2 (mod n+ n-)`. With `n- = 1` it is
  `2 inv(n0)/n+`, the phase of the additive divisor problem (section 3).
- **PROVEN, checked on 2000 random `(L,n)` (PART B).** `sum_{c mod n} R_n(c) = 0`:
  the main term `L w/n` of every lag is the average of its count over the `n`
  classes, so the whole remainder `X` is a discrepancy of CRT classes against
  interval bumps, at every modulus, above and below `2L` alike.
- **MEASURED, exact, five levels, reproducing the corpus `X` to `6.4e-8` relative or better
  (PART C).** `X` split by branch type (`c0`, pure shift, two-branch with the
  `0` branch, two-branch without it, three-branch) and by modulus band
  (`n <= 2L`, `2L..8L`, `8L..L ln^2 y`, above). The mixed remainder is
  `-1.06, -2.73, -2.51, -3.23, -3.94` at `x = 7..19`, i.e.
  `-0.41, -0.71, -0.49, -0.49, -0.49` times `ln y` (PART E): consistent with
  `O(ln y)` and settling near `-0.49 ln y` on the top three levels. Of it,
  `82 %` sits at `n <= 2L` at `x = 19` (`0.986, 0.916, 0.844, 0.826, 0.818`
  across the levels) and essentially all of it in the two-branch type carrying
  the `0` branch (`-3.94` of `-3.94`; the other two types read `-0.003` and
  `-0.0002`).
- **PROVEN, checked at `x = 7, 11` to `4.2e-17` (PART D).** Above `2L` the mixed
  count equals the mass of the root measure inside the window bump,
  `sum w (L - ||c'||_{30n})^+/L`, summed over 16,763,694 (modulus, pattern)
  pairs at `x = 11`.
- **MEASURED, exact (PART G).** The dominant cell (two-branch with the `0`
  branch, `n <= 2L`) split by balance: the pairs with `min(d, e) <= L^(2/5)`
  carry `95.7, 93.2, 94.4, 98.7, 99.7 %` of the cell's remainder at
  `x = 7..19`; the balanced pairs' remainder reads `-0.0087` at `x = 19`. The
  obstruction is unbalanced, and unbalanced is exactly where no Kloosterman-
  fraction bound in print reaches (section 4).
- **PROVEN given a theorem read at the page (section 5).** Henriot's Corollary 2
  (`arXiv:1102.1643v1`, page 7; erratum MPCPS 157 (2014) 375-377 read: "the
  upper bounds in Theorem 5 and Corollaries 1-2 are not sharp as claimed
  (although they are still valid)") applies to `F_0(h) F_1(h-2) F_1(h+2)` with
  its hypotheses met as stated, and gives
  `sum_{|h|<L} F_0(h) F_1(h-2) F_1(h+2) << L ln^4 y`. Hence the moduli
  `n > L ln^2 y * phi(y)`, any `phi -> infinity`, contribute `o(ln^2 y)` to
  both the count and the main term. The open estimate's range shrinks from
  `n in (2L, L^3)` to `n <= L ln^(2+o(1)) y`. Measured share of the mixed
  remainder above `L ln^2 y`: `0.014, 0.016, 0.014` at `x = 11, 13, 17`.
- **The record's named estimate is not the whole open step.** The divisor-
  distribution statement of `varE-theta2-proof.md` section 6 is for `n > 2L`
  only. The band `n <= 2L` carries `82 %` of the measured mixed remainder and
  the same one-logarithm gap under the kernel bound `|R_n(c)| <= n/L`. A proof
  of the section 6 display would leave the larger part of Conjecture 1 open.

## 1. The open step, stated once, with what stands on either side

**Objects.** `L = x#`, `y` the largest prime `<= sqrt L`, `K_L` the Fejer
kernel, `delta = prod_{p<=y} alpha_p/p`. `varE-theta2-step.md` section 1
(PROVEN, six levels): `X = sum_{|h|<L} (1-|h|/L)(W(h) - 1)` with
`W(h) = 6[6|h] f_5(h) D_y prod_{7<=p<=y} (1 + c_p(h))`, `c_p(h) = 2/(p-4)` if
`p | h`, `1/(p-4)` if `p | h-2` or `p | h+2`, else `0`; and `X_dec` the same
sum with `V(h) = C_y prod_{p|h}(p-1)/(p-3)`. Expanding the product,

    W(h) = 6[6|h] f_5(h) D_y sum_{n0 | h, n+ | h-2, n- | h+2} lam0(n0) lam1(n+) lam1(n-),

`lam0(p) = 2/(p-4)`, `lam1(p) = 1/(p-4)`, the three parts squarefree, `y`-smooth,
coprime to 30 and pairwise coprime. Each triple is a modulus `n = n0 n+ n-` and a
class `c` (`0 mod n0`, `2 mod n+`, `-2 mod n-`), and `varE-theta2-proof.md`
section 1 (PROVEN) gives its Fejer-weighted count as `L/n + R_n(c)` with
`R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L`, `r = L mod n`. The main terms sum to
`L` exactly (the Montgomery-Soundararajan identity `p(p-4) + 4 = (p-2)^2`,
`redteam-0828-varE.md` section 5), so

    X = sum_{(n, c)} w(n, c) R_n(c),      w = D_y lam0 lam1 lam1 (times the 2, 3, 5 factors).

**The one open statement (Conjecture 1, `variance-note.md` section 10).**
For every `eps > 0` there is `y_0` such that for every level `x` with `y > y_0`,

    | X(L) - X_dec(L) | <= eps / delta,      equivalently   | X - X_dec | <= eps * 3.6 ln^2 y (1 + o(1)).

**What stands on each side of it.**

| piece of `X - X_dec` | statement | rung | where |
|---|---|---|---|
| `X1 - X_dec` (`c0` type: `n+ = n- = 1`) | `delta*(X1 - X_dec) -> 0`, rate `O((ln ln y)^{-1/4})` | PROVEN, unreviewed, numerically vacuous at all levels | `varE-theta2-proof.md` sec.4 |
| `2X2` (pure shift: exactly one of `n+, n-` nontrivial, `n0 = 1`) | `\|2X2\| <= 60 prod p(p-3)/(p-2)^2 = O(ln y)` | PROVEN | `varE-theta2-proof.md` sec.3; measured group sum `0.18` at `x = 19`, PART F |
| `Xmix` (at least two parts nontrivial) | `Xmix = o(ln^2 y)` | OPEN | this note, sections 3-5 |
| the model's limit `E[g] -> Pr[GD(2) > u]` | no correction term; bands `O(1/ln y)` | PROVEN, unreviewed | `varE-limit-theorem.md` Thms A-C |

So the open step is `Xmix = o(ln^2 y)`, and by PART C it is, at the computed
levels, `Xmix = X_{mix2a} + X_{mix2b} + X_{mix3}` with the first of the three
carrying all of it.

**The record's statement of the open step (`varE-theta2-proof.md` section 6,
quoted in `lit-scourfield-2008.md` section 1 with quantifiers):** the weighted
count of `y`-smooth divisors `n > 2L` of `C(C^2-4)` over `|C| < L` equals its
expected count to `o(ln^2 y)`. That is the `n > 2L` band of `Xmix` only. The
quantities `MAIN` and `COUNT` of PART C are exactly that display's two sides,
band by band, and PART C reads the `n <= 2L` band of the mixed remainder at
`-3.22` against `-0.72` above `2L` at `x = 19`. Both bands are one logarithm
short under the kernel bound (`sum_{n<=2L} W_mix(n) n/L` and
`sum_{n>2L} W_mix(n)` are both `O(ln^3 y)` by the `4^omega` count), so the
`n <= 2L` band is not a smaller problem; it is the same problem at a different
scale, `r_n/n` with `r_n = x# mod n` in place of `L/n`.

## 2. The mis-doubled group, and what it changes

`varE-theta2-step.js` computes the group `X2` as
`[h = 0 term] + 2 sum_{k>=1} (1 - 6k/L)(6 f_5 D_y PM[k] - 6 b_2)` with
`PM[k] = prod_{p | 6k-2}(p-3)/(p-4)`: the `h = 2 (mod p)` pattern on `h > 0`,
doubled. The pattern function `W_-(h) = 6[6|h] f_5(h) D_y prod_{p|h-2}(p-3)/(p-4)`
satisfies `W_-(-h) = W_+(h)`, the mirror pattern, so the doubled half is
`sum_{h>0} W_- + sum_{h<0} W_+`, neither group. PART F rebuilds both:

| `x` | corpus column `delta*X2` | reproduced by the asymmetric formula | group sum `delta*X2` | `X2c` | `X2` |
|---|---|---|---|---|---|
| 7 | 0.094199 | 0.094199 | -0.009235 | 2.8574 | -0.2801 |
| 11 | 0.047843 | 0.047843 | 0.004509 | 2.8140 | 0.2652 |
| 13 | 0.027019 | 0.027019 | 0.001365 | 2.6666 | 0.1347 |
| 17 | 0.017012 | 0.017012 | 0.000736 | 2.6760 | 0.1157 |
| 19 | 0.011379 | 0.011379 | 0.000394 | 2.6633 | 0.0923 |

The group sum equals PART C's pure-type remainder to `1e-6` by an independent
enumeration (the per-`h` divisor expansion against the sieve), and PART C's
total reproduces the corpus `X` at every level, so the split is right and the
column is wrong. Consequences, each a correction owed to a live or HELD file
(section 8): `2X2` is not "flat near 5.3", it is `0.18` and falling; `Xmix` is
not `-9.78` at `x = 23` ("the truth is of order `ln y`", `varE-theta2-proof.md`
section 5), the true mixed remainder is `-3.94` at `x = 19`, still of order
`ln y` but with coefficient `-0.49`, not `-1`; and the sentence "`Xmix` the slow
half" survives with the halves renamed. `X1`, `X`, `X_dec`, every `X/X_dec` ratio
and every `delta*(X - X_dec)` in the corpus are untouched, since none of them
passes through the `X2` column.

## 3. Attempt on the identification step: the remainder as a discrepancy of Kloosterman fractions

**The reduction, PROVEN (PART A, PART B, PART D).** By PART B,
`R_n(c) = phi_n(c) - (1/n) sum_{c'} phi_n(c')` with
`phi_n(c) = sum_{h = c (n), |h|<L}(1 - |h|/L)`, so

    Xmix = sum_{n} sum_{eps mixed} w(n, eps) [ phi_n(c_eps) - mean_c phi_n ],

a weighted discrepancy of the mixed classes `c_eps` against the bump `phi_n`.
Above `2L` the bump is the triangle `(L - ||c||_n)^+/L` (PART D confirms the
count is exactly its mass at the roots). Below `L` it is the overlap
`[(r-c)^+ + (r+c-n)^+]/L` of an arc of length `r = L mod n` with its own shift
by `c`. By PART A the classes are Kloosterman fractions: for the two-branch
type with parts `(d, e)`, `c/n = 2 inv(d)/e mod 1`.

**Why this is not the corpus's "no exponential sum" finding restated.**
`varE-theta2-proof.md` section 6 is right that for a SINGLE modulus the phase
sum is exact and nothing oscillates. The cancellation the conjecture needs is
across moduli: `sum_{(d,e)} lam0(d) lam1(e) [phi_{de}(2 inv(d)/e) - mean]`, and
Fourier-expanding `phi_n` (whose transform at frequency `nu` is `K_L(nu/n)`)
turns it into

    sum_{d, e} lam0(d) lam1(e) (1/(de)) sum_{nu != 0} K_L(nu/(de)) e(-2 nu inv(d)/e),

a trilinear form in `(nu, d, e)` with the Kloosterman-fraction phase
`e(a inv(m)/n)`. That is the object of Duke-Friedlander-Iwaniec 1997 and of
Bettin-Chandee (`arXiv:1502.00769v1`, Theorem 1, read at the page), which the
corpus already holds as the instrument for Lemma V
(`research/SEARCH-CONVENTIONS.md` row "the vector-sieve bilinear remainder";
`lemmaV-neighbours.md` section 5.3). The two problems share an obstruction
family; neither implies the other (section 7).

**Where the attempt goes, and where it stops.**

1. *Trivial bound.* `|R_n(c)| <= min(1, n/L)` and `sum_n W_mix(n) min(1, n/L)`
   is `O(ln^3 y)` by `sum_{n<=T} 4^{omega(n)} << T ln^3 T`. One logarithm short,
   as the record says. All inequalities here are upper bounds on absolute
   values of a signed sum; legal, and lossy by exactly the cancellation sought.
2. *Moduli far below `L`.* For `n <= L^{1-eta}`, `|R_n(c)| <= n/L <= L^{-eta}`,
   and `sum_{n <= L^{1-eta}} W_mix(n) n/L << L^{-eta} ln^3 L`. Negligible. So
   the `n <= 2L` band lives on `n in (L^{1-eta}, 2L]`, within `L^eta` of the
   window. [ARITHMETIC, mine, unstamped.]
3. *Moduli far above `L`.* Section 5: Henriot's Corollary 2 cuts everything
   above `L ln^{2+o(1)} y`. PROVEN given the theorem.
4. *The balanced range.* On dyadic blocks `d ~ M`, `e ~ N` with both parts
   large, Bettin-Chandee Theorem 1 as read,
   `B(M,N,A) << ||alpha|| ||beta|| ||nu|| (1 + |theta|A/MN)^{1/2} [ (AMN)^{7/20+eps}(M+N)^{1/4} + (AMN)^{3/8+eps}(AN+AM)^{1/8} ]`,
   beats the trivial `||alpha|| ||beta|| ||nu|| (AMN)^{1/2}` when
   `(AMN)^{3/20} > (M+N)^{1/4}`. With `A ~ MN/L` (the frequencies the kernel
   weights) and `MN ~ L` this is `M > L^{2/5}` when `M <= N` [ARITHMETIC,
   mine, unstamped, first term only]. Two things are NOT done and are owed
   before any block is called closed: the kernel `(1/n) K_L(nu/n)` couples `nu`
   to `de` and is not of the form `nu_a alpha_m beta_n`, so it must be separated
   (Mellin in `nu/(de)`, at a logarithmic cost); and the three-branch type has
   two coupled inverses (PART A's fraction form) and is not bilinear in any
   pair of its parts without a further reciprocity step. PART G measures the
   balanced cell's remainder at `-0.0087` at `x = 19`, so a power saving there
   is at least consistent with the data.
5. *The unbalanced range, which is the obstruction.* PART G: `99.7 %` of the
   dominant cell sits at `min(d, e) <= L^{2/5}`, and no bound in print for
   `e(a inv(m)/n)` with arbitrary coefficients saves anything when one variable
   is below the `2/5`-power of the other in this configuration. Section 4
   states what is needed there.

## 4. The single inequality that does not close

Take the dominant cell: two parts `(d, e)`, `d | h`, `e | h -+ 2`,
`de in (L^{1-eta}, 2L]`, `min(d, e) <= L^{2/5}`, and say `d` is the small one
(the mirror case swaps the roles). Then `h = 2 + e j`, `|j| <= L/e < d L^{eta}`,
and `d | h` says `j = -2 inv(e) (mod d)`. For fixed `d`, the cell's remainder is

    E_d := sum_{e ~ L/d, e y-smooth squarefree, (e, 30d) = 1} lam1(e)
             [ sum_{j = -2 inv(e) (d), |2 + ej| < L} (1 - |2 + ej|/L)  -  L/(de) ],

the discrepancy of the class of `e` modulo `d` (through its inverse, which
permutes the reduced classes) against a bounded-variation window of the `j`
line, weighted by `lam1(e) = (1/e) prod_{p|e} p/(p-4)`. Trivially
`|E_d| = O(1)` [ARITHMETIC: `|R| <= min(1, de/L)` summed over `e <= 2L/d`],
and `sum_{d <= L^{2/5}} lam0(d) = O(ln^2 y)`, so the cell is trivially
`O(ln^2 y)` with an explicit constant, and PART G reads it at `-3.27`, i.e.
`0.05 ln^2 y`, at `x = 19`.

**What would close the cell.** For every `eps > 0` there is `y_0` such that for
`y > y_0`, uniformly in `y`-smooth squarefree `d <= L^{2/5} = y^{4/5 + o(1)}`
coprime to 30,

    | E_d | <= eps * (L/d) * sum_{e <= 2L/d} lam1(e)/e * (1/phi-share)      (*)

that is, the `y`-friable squarefree integers `e` in `(L^{1-eta}/d, 2L/d]`,
weighted by `lam1(e)`, are equidistributed among the reduced classes modulo `d`
against bounded-variation test functions, to relative precision `o(1)`
UNIFORMLY in `d` up to `y^{4/5}`, in the friability range `u = ln e/ln y in
(1.2, 2]`. Then `sum_d lam0(d) |E_d| <= eps * O(ln^2 y)` and the cell is
`o(ln^2 y)`. The direction is legal: it is an upper bound on the absolute value
of a signed discrepancy; nothing lower-bounds a count, and no window is anchored.

**Why it does not close here.** It is a level-of-distribution statement for
friable integers, at modulus `y^{4/5}` against sampling range `L/d >= y^{6/5}`,
with a multiplicative weight and a squarefree-coprimality restriction on top.
The owning convention is "entiers friables en progressions arithmetiques" /
"smooth numbers in arithmetic progressions", `Psi(x, y; a, q)`, and the
Bombieri-Vinogradov-type theorems for it. That convention is NOT the one the
corpus searched for this step (`lit-smooth-divisors.md` searched divisors of
polynomial values; `lit-scourfield-2008.md` the friable divisor sum), and it
was NOT searched at the page in this pass. Candidate sources, from memory and
UNVERIFIED (confirm every locator before quoting): Fouvry-Tenenbaum,
Proc. LMS (3) 63 (1991); Granville, Acta Math. 170 (1993); Harper,
arXiv:1208.5992; Drappeau, Compos. Math. 151 (2015). Whether any of them gives
`(*)` with the uniformity in `d` up to `y^{4/5}`, the `1/e`-type weight, and the
squarefree restriction is the question item 9 should ask next; the honest
prior is that the range is inside what those theorems reach and the weight and
restriction are bookkeeping, and that prior is worth nothing until a page is
read.

**What `(*)` does not cover.** The mirror case (`e` small, `d` large: friable
`d` in classes modulo `e`, same shape); the balanced cell (section 3, item 4,
owed the kernel separation); the three-branch and `(+,-)` types (measured
`-0.0002` and `-0.003` at `x = 19`, PART C, so numerically nothing, but their
`o(ln^2 y)` is not derived: the trivial bound is `O(ln^3 y)` for them too); and
the `n > 2L` band, `18 %` of the measured remainder, which is the record's
section 6 display with its moduli now confined to `(2L, L ln^{2+o(1)} y]` by
section 5, hence with the bump width `L/n >= 1/ln^{2+o(1)} y`, a logarithmic
scale and not a power scale.

## 5. The toolkit, theorem by theorem, with hypotheses checked

The brief's list: Shiu, Henriot, Nair-Tenenbaum, the Erdos-Hooley `Delta`
literature, Tenenbaum's book. Every entry below is an UPPER bound for a
nonnegative sum; none supplies the cancellation of section 4. One of them
applies as stated and earns a lemma.

| source | statement as read | hypothesis against our sum | verdict |
|---|---|---|---|
| Shiu 1980, Crelle 313 | quoted at second hand from Nair-Tenenbaum p.119 (read at the text layer of the Acta Math. PDF, sha256 `3a2caa93...`): `sum_{x<n<=x+y, n = a (q)} g(n) << (y/(phi(q) log x)) exp(sum_{p<=x, p not | q} g(p)/p)` for `g` in the class `M` (`g(p^nu) <= A^nu`, `g(n) <= B n^eps`), `x >= y >= x^alpha`, `q <= y^{1-beta}` (the last range read through OCR damage; not load-bearing) | one multiplicative function of one variable; ours is a product of three functions on three shifted arguments | HYPOTHESIS UNMET as stated; superseded by the next two rows |
| Nair-Tenenbaum 1998, Acta Math. 180, Theorem 1 (p.125, read) | `sum_{x<n<=x+y} F(\|Q_1(n)\|, ..., \|Q_k(n)\|) << y prod_{p<=x}(1 - rho(p)/p) sum_{n<=x} nu(n; F, rho)` for `F in M_k(A,B,eps)`, `x^{4g^2 eps} <= y <= x`, **`Q = prod Q_j` with no fixed prime divisor** | `Q = X(X-2)(X+2)`: `n(n-2)(n+2) = n^3 - n (mod 3)`, so 3 is a fixed prime divisor | HYPOTHESIS UNMET, through a prime our functions ignore; Corollary 1 (progressions) needs `(q, Q(a)) = 1` and is blocked the same way |
| Henriot 2012, MPCPS 152, Theorem 5 and Corollary 2 (`arXiv:1102.1643v1` p.6-7, read; erratum MPCPS 157 (2014) 375-377 read, sha256 of the PDF in the scratchpad log) | for `Q` PRIMITIVE, `F in M_k(A,B,eps)`, `x^alpha <= y <= x`, `x >= c_0 \|\|Q\|\|^delta`: `<< Delta_{D*} y prod_{g<p<=x}(1 - rho(p)/p) prod_{p<=x, p not \| D*} prod_h (1 + G^{(h)}(p) rho_{R_h}(p)/p)`; the erratum states the upper bound "still valid" | `Q = X(X-2)(X+2)` primitive, `g = 3`, `D* = 256`, `R_h` linear so `rho_{R_h}(p) = 1`; `F(n_1,n_2,n_3) = F_0(n_1)F_1(n_2)F_1(n_3)` with `F_0(p) = (3p-4)/(p-4) <= 17/3`, `F_1(p) = (2p-4)/(p-4) <= 10/3` for `7 <= p <= y` and `1` otherwise, so `F in M_3(17/3, B, eps)` for every `eps`; `x^alpha <= y <= x` met on dyadic blocks `(L/2^{j+1}, L/2^j]` with `y = x` | **APPLIES AS STATED.** Deduction below |
| Erdos-Hooley `Delta`, Hall-Tenenbaum *Divisors*, Ford-Koukoulopoulos-Tao line | bounds on a MAXIMUM over windows | ours is a signed sum; `lit-smooth-divisors.md` sec.3.9 already records the maximum-versus-mean gap as the missing logarithm | WRONG KIND of statement, not a weak version of the right one |
| Tenenbaum, *Introduction to analytic and probabilistic number theory* | NOT CONSULTED this pass | | no verdict |
| Duke-Friedlander-Iwaniec 1997; Bettin-Chandee Theorem 1 (read, p.2) | bilinear / trilinear forms with `e(a inv(m)/n)`, arbitrary coefficients, saving a power when the two variables are balanced | our coefficients are arbitrary and coprime-supported, the phase is the right one (PART A); the kernel couples the third variable to the product, and the mass sits in the unbalanced range (PART G) | HYPOTHESIS MET on the balanced blocks only; owed the separation; does not reach the obstruction |

**The deduction from Henriot's Corollary 2 (PROVEN given the theorem as read).**
Apply it on each dyadic block of `0 < h < L` with `y = x` (and by symmetry on
`h < 0`), sum the blocks: with the local factors above,
`sum_{|h|<L} F_0(h) F_1(h-2) F_1(h+2) << L prod_{3<p<=L}(1 - 3/p) prod_{2<p<=y}(1 + F_0(p)/p)(1 + F_1(p)/p)^2 prod_{y<p<=L}(1 + 1/p)^3 << L (ln y)^4`,
since `(1 - 3/p)(1 + 3/p)(1 + 2/p)^2 = 1 + 4/p + O(1/p^2)` for `p <= y` and
`(1 - 3/p)(1 + 1/p)^3 = 1 + O(1/p^2)` above. Now for any `T`, since
`w(n, eps) <= (n/T) w(n, eps)` on `n > T` and
`sum_{n0 | h} n0 lam0(n0) = F_0(h)`, `sum_{n+ | h-2} n+ lam1(n+) = F_1(h-2)`,

    COUNT(n > T) <= (15 D_y / T) sum_{|h|<L} F_0(h) F_1(h-2) F_1(h+2) << (L/T) ln^4 y,
    MAIN(n > T)  =  L sum_{n>T} W_tot(n)/n << L ln^3 T / T,

the second by partial summation off `sum_{n<=t} 4^{omega(n)} mu^2(n) << t ln^3 t`.
With `T = L ln^2 y * phi(y)`, `phi -> infinity` arbitrarily slowly, both are
`o(ln^2 y)`. Every inequality is an upper bound on a nonnegative quantity.
[The exponent bookkeeping is mine; the theorem's constants depend on
`g, alpha, delta, A, B` only, all fixed here, so the bound is uniform in `y`.]

## 6. Falsifiers, and whether each check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| the mixed class is `2( inv(n0 n-, n+)/n+ - inv(n0 n+, n-)/n- )` | PROVEN | a coprime triple where it fails | YES, 3000 triples, residual 0 (PART A) |
| `sum_c R_n(c) = 0` | PROVEN | an `(L, n)` where it fails | YES, 2000 pairs, `1.9e-12` (PART B) |
| the type x band table reproduces `X`, `X1`, `X - X1` | PROVEN (exact arithmetic) | a level off the corpus | YES, five levels, worst `6.4e-8` relative (PART C) |
| the corpus `X2` column doubles a positive half | PROVEN | the asymmetric formula not reproducing the column, or the group sum not matching PART C | YES, both, five levels (PART F) |
| the mixed remainder is `~ -0.49 ln y` | MEASURED, 5 exact levels | growth at a new level | NO beyond `x = 19`; `x = 23` costs the descent to `4.5e8` and was not run |
| `82 %` of it is below `2L`, `99.7 %` of the dominant cell is unbalanced | MEASURED, `x = 19` | the shares moving at a new level | NO beyond `x = 19` |
| Henriot Cor. 2 applies and cuts the moduli at `L ln^{2+o(1)} y` | PROVEN given the theorem as read at the text layer of arXiv v1 plus the erratum | a hypothesis of Theorem 5 I misread, or the published version differing from v1 in the statement | PARTLY: v1 and the erratum read; the MPCPS published text NOT read |
| `(*)` closes the dominant cell | STATED, not proven | nothing yet; it is the target | NO. Not searched in its owning convention |
| any of this closes Conjecture 1 | NOT CLAIMED | | the step stands open |
| this reduction is novel | NOT CLAIMED | the additive-divisor / sieve-remainder literature stating it | NO. The two-branch cell IS a truncated additive divisor problem, which is a hundred-year-old shape; do not call it new |

## 7. Wrong-direction guard

Per `attack-wrongdirection-audit.md` section 1: `Var/E` is a second moment of
the count in a UNIFORMLY random window; its limit constrains no single window,
so it is Axis-D capacity counting and not `min_x N(x) >= 1`. Every inequality
in this note is an upper bound on the absolute value of a signed remainder or
on a nonnegative sum, and none lower-bounds a count anywhere. The Kloosterman-
fraction shape shared with Lemma V (section 3) is an obstruction family, not a
bridge: closing `(*)` gives `lim Var/E`, which `variance-note.md` section 4
already says is not a statement about the anchored window; and Lemma V closing
would not close `(*)`, since Lemma V's coefficients are 1-bounded sieve weights
on a different index set. Verdict (i) of the audit's scale: strictly weaker than
TPC, and it stays there.

## 8. Corrections owed, and brief errors

**HOLD for the orchestrator; no file is edited here.**

1. `varE-theta2-step.js` PART 3 and `varE-theta2-step.md` section 5: the
   `delta*X2 (each)` and `delta*Xmix` columns. Replacement values at `x = 7..19`
   in PART F and PART C; `x = 23` not recomputed here (the descent is priced
   above the session, the sieve half is cheap and the fix is one line: sum
   `PM[k] + PP[k]` in place of `2 PM[k]`).
2. `varE-theta2-proof.md` sections 0, 3, 5, 7: "measured `2X2 = 5.3`", "flat
   near 5.3", "loose by 14 to 48", "`Xmix = -9.78` against `ln y = 9.611`":
   the bound holds with more room, the measured group is `O(1)` and falling
   toward 0, and the mixed remainder is `-0.49 ln y`.
3. `paper/variance-note.md` section 10: "loose by a factor 14 to 48 against the
   measured `2X2 = 5.3`" and the section 6 display's `n > 2L` restriction
   presented as the estimate "that would close Conjecture 1": it would close
   `18 %` of the measured remainder.
4. `lit-scourfield-2008.md` section 1 and `research/SEARCH-CONVENTIONS.md`
   row 69: the moduli range `(2L, L^3)` (corrected once already to the upper
   endpoint by `redteam-0829-measure-c.md` E23) is now `(L^{1-eta}, L ln^{2+o(1)} y]`
   and includes the band below `2L`; the owning convention for the dominant
   part is friable integers in arithmetic progressions, not divisors of
   polynomial values.
5. `varE-spectral.md` ledger and section 0: "TWO open steps" should cite
   `varE-limit-theorem.md` for the second.

**Brief errors, each verified at its record.** (a) "either of the two open
steps" and "separately the theta = 2 mean-coefficient step": one statement
(section 0). (b) "the MODEL half is a theorem ... (`varE-spectral.md`)": the
theorem is in `varE-limit-theorem.md`; `varE-spectral.md` says two steps are
open. (c) The path `research/varE-theta2-proof.md` is
`research/history/staging/varE-theta2-proof.md`. (d) TODO item 9's
"residuals <= 0.002 at nine exact points from x = 13" is the Monte-Carlo-model
residual; against the exact model the `x = 13` residual is `+0.00291`
(`varE-theta2-step.md` section 6, `redteam-0828-varE.md` section 6). Everything
else in the brief checked out: the `0.45546` closed form, the two-of-three
groups closed, the CRT-mixed reduction, the Scourfield verdict, the `x = 41`
sentence.

**Channels.** arXiv API answered HTTP 429 on two queries (a claim about the
fetcher, per the campaign rules); the arXiv PDF endpoints, Project Euclid's
Acta Math. download and Cambridge Core's erratum PDF answered 200 with a
browser user agent, so no source is recorded unreachable. Nair-Tenenbaum was
read at the text layer of a scanned PDF with OCR damage in the displays; the
two statements quoted from it (Theorem 1's fixed-prime-divisor hypothesis, and
Shiu's theorem) were checked against Henriot's restatement of both on his
pages 1-2, which is typeset and clean.
