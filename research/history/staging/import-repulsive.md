# Import-map row 17: repulsive point processes and hyperuniformity

<!-- ledger
id: Q-import-repulsive
status: CLOSED
todo: none
question: Does any repulsive point-process model (determinantal, Coulomb gas, hyperuniform) reproduce the twin tile's sub-Poisson counts?
verdict: NO, two-sided: g(2) = 0 kills positively-associated models and g(6) = 2.66 (g never in (0,1); support 6 | d, g >= 2.38) kills Hermitian determinantal and negatively-associated ones; the Gibbs extension is withdrawn; every fixed level is periodic hence class I hyperuniform and the statement is empty, while along the diagonal family L = y^u no member approaches a hyperuniform limit in Var/E, which is a statement about the family and not a class for any one tile; the determinantal row's quoted product evaluates to 0 and its obstruction distance is 6 not 2.
-->

*Staging record, 2026-08-28. Executes row 17 as priced in
`history/staging/import-map-rows-15-17.md` §1 and §6(a). Producer:
`history/staging/import-repulsive.js` (embedded, `--check` clean, 0.7 s,
scratchpad-grade). This pass edited no existing file and ran no git command.
Everything below is either a finite evaluation of `paper/variance-note.md`
Theorem 1's local factors or a citation, and the two are kept apart.*

---

## 0. Verdict, disconfirming half first

**The closure is cheap and nobody had built a model inside the family it
closes.** The twin tile is a deterministic set given one uniform random
translate. Its entropy is `ln W` where a genuine determinantal measure on `W`
sites carries entropy of order `W`. No route in `REFUTED.md` and no live
document proposed a repulsive-gas model of it. What the row buys is that the
family cannot be proposed again, plus a correction to a sentence already in the
corpus, plus one taxonomy word at a defensible rung. It buys nothing about the
conjecture, and §7 says so at length.

**The row's clause (b) as written is too strong and is narrowed here.** The
row's §6(a) says the inequality that kills the Hermitian determinantal model
"kills Pfaffian processes, `β`-ensembles, the one-dimensional one-component
plasma and every strictly negatively-associated model, because all of them
require `g ≤ 1`". The last clause is the only one this pass can support. A
one-dimensional gas with a repulsive pair potential does **not** satisfy
`g ≤ 1` at finite density in general: the hard-rod fluid's pair correlation has
shell peaks above 1 just beyond the rod length, and the one-dimensional
one-component plasma orders. `β`-ensembles are determinantal only at `β = 2`.
The closure below is stated for the class that actually carries the inequality,
and the rest of the row's list is withdrawn rather than repaired.

**The taxonomy word is banked in a weaker place than the row implies.** The
tile is class I hyperuniform, and the reason is that it is periodic, which
Torquato states for every periodic configuration. That is true and arithmetically
empty: every window the programme cares about has `L ≤ W`, and at `L = W` the
variance is exactly zero by the sum rule. Along the diagonal family `L = y^u`
with `u` fixed, one configuration per level, the variance grows **linearly** in
`L` at every member, which is the non-hyperuniform scaling with a suppressed
prefactor. The correct word for that family is sub-Poisson, and it is a
statement about the family rather than a hyperuniformity class for any one
tile.

**What stands, all of it finite computation.**

- `g(2) = 0` at every level, exactly, and `g(d) = 0` at every `d` not divisible
  by 6. PROVEN (mod 3 forces it) and VERIFIED.
- `g(6) = 2.661728` at `x = 11`, confirming the row's 2.66, and
  `g(6) = 6 ∏_{5≤p≤x}(1 − 4/(p−2)²)` exactly at all twelve levels tested.
  PROVEN and VERIFIED.
- Stronger than the row: `g` never takes a value in `(0, 1)`. Its support is
  `6 | d` and on that support `g(d) ≥ 2.38128` at every level, with `d = 6` the
  exact minimum. PROVEN, with the exhaustive check to `d = 2·10⁶` at `x = 1009`.
- So the tile is neither negatively nor positively associated at the two-point
  level, and the closure is two-sided: `g(6) > 1` kills the negatively-associated
  family, `g(2) = 0 < 1` kills the permanental and positively-associated family.
- The number-variance identity `Var/E = Σ_{ν≠0} S(ν) K_L(ν/M)` with
  `S(ν) = δ·Ŵ(ν)`, verified against `varE-spectral.md`'s `X(210) = 4.612929` in
  both the direct and the spectral evaluation. PROVEN and VERIFIED.
- A defect in the existing rejection's formula: as literally written it
  evaluates to zero. §5.

---

## 1. The pair correlation, verified

`paper/variance-note.md` Theorem 1 gives the tile's pair correlation exactly.
Writing `g(d) = J(d)/δ² = W(d)`, the local factors are `2` at `p = 2` when `d`
is even and `0` when odd, `3` at `p = 3` when `3 | d` and `0` otherwise, and for
`p ≥ 5`

> `p/(p−2)` when `p | d`,  `p(p−3)/(p−2)²` when `d ≡ ±2 (mod p)`,
> `p(p−4)/(p−2)² = 1 − 4/(p−2)²` otherwise.

**(i) The support.** Mod 3 the tile occupies one class, so `ρ₃(d) = 0` unless
`3 | d`; mod 2 it occupies one class, so `ρ₂(d) = 0` unless `2 | d`. Hence
`g(d) = 0` unless `6 | d`, and in particular `g(2) = 0` identically. The row's
first claim is confirmed. The note itself records the fact in its Theorem 1
parenthetical, so nothing here is new to the corpus, only newly load-bearing.

**(ii) `g(6)`.** For `p ≥ 5`, `p ∤ 6` and `6 ≢ ±2 (mod p)` (that would need
`p | 4` or `p | 8`), so every factor is generic and

> `g(6) = 6 ∏_{5≤p≤x} (1 − 4/(p−2)²)`.

PART 2 evaluates both sides at `x = 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 101,
1009` and they agree to machine precision at every level. The readings are
3.333333, 2.800000, **2.661728**, 2.573737, 2.527982, 2.492993, 2.470380,
2.456826, 2.445140, 2.437156, 2.398088, 2.382485. The row's four hand-computed
factors and its 2.66 at `x = 11` are correct as written.

**(iii) `g` has no values in `(0,1)`, at any level.** Every local factor of `g`
at `p ≥ 5` is at least `1 − 4/(p−2)²`, with equality exactly in the generic
case, and a partial product of factors below 1 exceeds the full product. So for
every `d` with `6 | d` and every level `x`,

> `g(d) ≥ 6 ∏_{p≥5} (1 − 4/(p−2)²) = 2.3812822` (product to `p ≤ 10⁷`;
> the omitted tail is bounded by `4/(10⁷ ln 10⁷) = 2.5·10⁻⁸` relative).

`d = 6` attains it at every level, so 6 is the exact minimiser of `g` over its
support. PART 3 checks every `d ≡ 0 (mod 6)` up to `2·10⁶` at `x = 1009`: the
minimum is `2.382485` at `d = 6` and the maximum is `23.78` at `d = 1021020`.
This is stronger than the row's prediction `g(6) > 2` and it closes the family
at every distance rather than at one.

**(iv) The profile for `d ≤ 60`.** At `x = 11`, ten distances carry `g > 0` and
none of them lies in `(0,1)`. At `x = 10⁷` the readings on the multiples of 6
are 2.381, 6.350, 4.763, 3.024, 9.525, 2.735, 9.072, 5.013, 3.528, 7.705. The
peaks sit where the distance is divisible by many small primes (`d = 30` and
`d = 42` are the largest in the range), which is the `p/(p−2)` factor doing what
the singular series always does.

**(v) The comb.** For the Natal@5 comb of Corollary 3 the same computation gives
`g₅(6) = 5.36` and `g₅(30) = 14.29` at `y = 1009`, with `g₅` supported on
`d ≡ 0, ±6 (mod 30)` only. The comb is more strongly clustered on the classes it
keeps, so no repulsive model of the comb exists either.

**(vi) Controls that passed.** The sum rule `Σ_{d≠0}(J − δ²) = −δ(1−δ)` holds to
relative `3·10⁻¹⁴` at `x = 7, 11, 13` (PART 6). The exact-variance engine
reproduces `variance-note.md` §6's `y = 401` table at `u = 0.6, 1.0, 1.5, 2.0,
2.5` with maximum deviation `4·10⁻⁴` (PART 5), so the machinery that computes
`Var/E` here is the same machinery the note publishes.

---

## 2. The closure, with proofs

### (a) Hermitian determinantal processes. CLOSED, and the proof is one line.

A determinantal probability measure on a finite ground set with Hermitian kernel
`K` has `P(i, j ∈ S) = det [[K_ii, K_ij],[K_ji, K_jj]] = K_ii K_jj − |K_ij|²`,
since `K_ji = conj(K_ij)`. Hence `ρ₂(i,j) ≤ ρ₁(i)ρ₁(j)` at every pair, that is
`g ≤ 1` everywhere. The tile has `g(6) = 2.661728` at `x = 11` and
`g(6) ≥ 2.3812` at every level, so no Hermitian kernel reproduces it, at any
level, with any kernel whatever. The argument needs nothing beyond the `2 × 2`
determinant, so it is PROVEN in house and the citations below are anchors rather
than load-bearing steps.

Anchors. Soshnikov, *Determinantal random point fields*, *Russian Math. Surveys*
**55** (2000) 923–975, DOI 10.1070/rm2000v055n05abeh000321, whose abstract states
that the paper proves "the necessary and sufficient condition for the existence
of the determinantal random point field with Hermitian kernel" [SOURCED at the
arXiv abstract page, math/0002099; the theorem number is MEMORY and was not
opened]. Lyons, *Determinantal probability measures*, *Publ. Math. IHÉS* **98**
(2003) 167–212, DOI 10.1007/s10240-003-0016-0, whose abstract names negative
association among its main results, and which is the discrete-ground-set paper
this object actually needs [SOURCED at abstract, math/0204325]. Hough,
Krishnapur, Peres, Virág, *Determinantal processes and independence*,
*Probability Surveys* **3** (2006) 206–229 [SOURCED at abstract, math/0503110].

### (b) Negatively-associated and strongly Rayleigh measures. CLOSED, same inequality.

Negative association implies `E[1_i 1_j] ≤ E[1_i]E[1_j]`, which is `g ≤ 1`, so
the same reading at `d = 6` closes the whole class. Strongly Rayleigh measures
are negatively associated (Borcea, Brändén, Liggett, *Negative dependence and
the geometry of polynomials*, *J. Amer. Math. Soc.* **22** (2009) 521–567,
DOI 10.1090/S0894-0347-08-00618-8 [SOURCED-BIB at Crossref]), so they go with
it, and so does every model whose selling point is that survivors repel.

### (b′) The positive side, which the row did not claim. CLOSED too.

A permanental process has `ρ₂ ≥ ρ₁ρ₁`, and any positively-associated measure has
`g ≥ 1`. The tile has `g(2) = 0` and `g(d) = 0` at five sixths of all distances,
so that family is closed as well. **The tile is neither negatively nor positively
associated at the two-point level.** Its `g` takes the value 0 or a value above
2.38 and nothing in between, which is a shape no association hypothesis of either
sign permits. This is the sharper form of the closure and it is what should go in
the one-line `REFUTED.md` index.

### (c) One-dimensional Gibbs and Coulomb gases. NOT CLOSED by this argument.

The row's clause naming the one-dimensional one-component plasma is withdrawn.
A repulsive pair potential gives `g(r) = exp(−βv(r))` only in the low-density
limit; at finite density the hard-rod fluid has `g(r) > 1` just past the rod
length and the one-dimensional one-component plasma orders, so `g ≤ 1` is not a
property of that class. The honest statement is narrower and is stated as such:
a pair potential that is `+∞` off `6ℤ` reproduces the tile's support by
construction, so a Gibbs model of the tile is not refuted by two-point data
alone. What is refuted is the reading of the tile as *repulsive*. No claim is
made here about whether such a Gibbs model exists, and none should be made
without a computation that goes beyond `g`.

This narrowing is the main correction this pass makes to its own row.

---

## 3. Hyperuniformity, and what the taxonomy word costs

**The definition.** A point configuration is hyperuniform when the structure
factor tends to zero at zero wavenumber, `lim_{|k|→0} S(k) = 0`. Torquato,
*Hyperuniform states of matter*, *Physics Reports* **745** (2018) 1–95,
DOI 10.1016/j.physrep.2018.03.001, eq. (14) on p. 10 [SOURCED, see §6].

**The taxonomy.** Torquato §5.3, p. 23, verbatim: "the asymptotic growth
behaviors of `σ²_N(R)` fall into three distinct classes: class I in which the
growth is proportional to the window surface area `R^{d−1}`, class II in which
the growth is proportional to `ln(R) R^{d−1}`, and class III in which the growth
is proportional to `R^{d−α}`, where `α ∈ (0,1)` is an exponent." In `d = 1`
class I means the number variance is bounded, which he states explicitly at
§5.3.1, arXiv p. 25, eq. (88): "For one-dimensional class I hyperuniform
systems, the number variance is exactly (not asymptotically) given by
`σ²_N(R) = 2φB_N(R)`, where `B_N(R)` is given by (83) with `d = 1`, implying
that the fluctuations are bounded, i.e., do not grow with `R`." Two riders: the
right-hand side is `B_N(R)` and not the constant `B̄_N` of eq. (87), and the
statement is an ensemble average. The sentence quantifies over one-dimensional
class I systems generally and not over one lattice.

**The tile's class, and why it is empty.** Torquato §5.5, arXiv p. 28,
verbatim: "All
periodic point configurations that have a finite number of particles in the
fundamental cell belong to class I hyperuniform systems." The tile translate is
periodic with period `W`, and `N_{L+W}(t) = N_L(t) + |A|` gives
`Var[N_{L+W}] = Var[N_L]` exactly, so the number variance is periodic in `L` and
therefore bounded. **Class I, PROVEN, and arithmetically vacuous:** the bound is
attained inside one period, `Var[N_W] = 0` by the sum rule, and no window the
programme reasons about has `L > W`.

PART 8 measures the bound. At `x = 11, 13, 17` the maximum of `Var[N_L]` over
all `L < W` reads 4.0266, 4.8350, 17.9964, attained at `L = W/2` in all three
cases, and `Var[N_W]` returns `4·10⁻¹³`, `−7·10⁻¹¹`, `−7·10⁻⁹`, which is the sum
rule again at floating precision. The symmetry behind the argmax is exact and is
the count-side of a duality the corpus already proved: `N_{W−L}(t) = |A| −
N_L(t + W − L)` gives `Var[N_L] = Var[N_{W−L}]`, which is
`import-scanstat.md`'s `sd_m = sd_{D−m}` read on window length instead of window
count. **The class-I coefficient is not uniform in the level**: the maximum
grows 4.03, 4.84, 18.00 across three levels, so the taxonomy word banks no
statement in `x`, and `x` is the only axis the programme needs.

**The regime that matters is not hyperuniform.** At `L = y^u` with `u` fixed and
`L ≪ W`, `variance-note.md` §6 and §7 measure `Var/E` between 0.152 and 0.396,
bounded away from both 0 and 1. Linear growth of `σ²_N` in `L` is the
non-hyperuniform (Poisson) scaling with a reduced prefactor. In the taxonomy's
own terms the classes are defined by the large-`R` asymptotics, and at fixed `u`
those asymptotics are `σ²_N ∼ c(u)·δL`, `c(u) > 0`. Torquato's practical
fallback does not rescue it either: the "effective hyperuniformity" criterion of
§11.1.6, p. 78, eq. (252), is `H ≡ S(0)/S(k_peak)` "of the order of `10⁻⁴` or
smaller", and the corresponding ratio here is of order `10⁻¹` to `10⁰`.

**So the taxonomy word, banked at its rung.** The tile at a fixed level is
class I hyperuniform in the `k → 0` limit, PROVEN, by periodicity, and the
statement is arithmetically empty. Hyperuniformity classifies **one**
configuration by its large-`R` asymptotics, so the `L = y^u` reading is not a
competing classification of the same object: it is a statement about a
**diagonal family** of configurations, one per level, with `L` and the sieve
level moving together. Along that family the measured `Var/E` stays in
`[0.152, 0.396]` over `x = 7..37` on the comb diagonal and in `[0.076, 0.845]`
over `u = 0.6..3.0` at `y = 401` on the full tile, rather than falling toward
zero, so **no member of the family is approaching a hyperuniform limit in the
ratio the programme reads**, MEASURED. That is a statement about the family and
not a hyperuniformity class for any one tile, and the word to use for it is
sub-Poisson. The two statements are compatible and the corpus currently uses one
word for both.

**A vocabulary defect this pass found and did not fix.** `research/GLOSSARY.md`
defines Hyperuniformity as "the natal field's suppressed large-scale density
fluctuation: window counts are sub-Poisson, `Var/E` drifting 0.152 → 0.396". By
Torquato's definition that is not hyperuniformity, it is sub-Poisson variance;
the entry should either say "sub-Poisson (not hyperuniform in the
Torquato–Stillinger sense, whose criterion `Var/E → 0` the tile fails at every
fixed `u`)" or split into two entries. The same word is used in the same loose
sense in `natal-cap-29-sigma-plateau.js`, `FOLD-PROFILE.md` §3,
`sift-limit-attack.md`, `discrepancy-two-class.md` and `level-ledger-tight.md`.
No live file was edited. The proposal is recorded here for whoever holds those
documents.

**One thing that is genuinely hyperuniform, and is already in house.** PART 7
computes the structure factor of the comb at `y = 13` directly:
`S(ν) = δ·Ŵ(ν)` reads `2.9·10⁻⁸` at `ν = 1`, with a minimum of `1.2·10⁻¹¹` and a
maximum of `0.0330` over all `ν ≠ 0`. The smallest frequencies do carry almost no
mass, which is the `k → 0` statement, and the `Var/E ≈ 0.4` at window scale comes
from the Fejér kernel smearing across the spikes. `natal-cap-29-sigma-plateau.js`
already derives the `σ`-plateau from `|S(j)|²` at small `j`, so the corpus has
been computing the small-`k` structure factor under another name, which is what
the row predicted.

---

## 4. The published anchor

**The statistic, in the owning convention.** `variance-note.md` Theorem 2's
`Var[N_L] = Σ_{|d|<L}(L−|d|)(J(d) − δ²)` is the **local number variance**
`σ²_N(L)` of the tile point process for an interval window of length `L`,
uniformly placed. Its normalisation `Var/E` is the **number-variance-to-mean
ratio**, and its `L → ∞` limit is `S(0)` in the convention where a Poisson
process has `S ≡ 1`.

**The spectral form is the structure-factor statement.** With
`Ŵ(ν) = ∏_p f̂_p(ν(M/p)^{−1} mod p)` as `varE-spectral.md` §1 defines it,
`S(ν) = δ·Ŵ(ν)` is the structure factor, and

> `Var/E = Σ_{ν ≠ 0 mod M} S(ν) K_L(ν/M)`,  `K_L` the Fejér kernel,

which is the discrete form of the standard `σ²_N(R) = ρ ∫ S(k)|α̂(k;R)|² dk`
relation between number variance and structure factor. PART 7 verifies it at
`y = 13`, `L = 210`: the direct sum over `d` and the spectral sum over `ν` both
return `X(L) = 4.612929`, matching `varE-spectral.md`'s reading; the mass check
`Σ_{ν≠0} Ŵ(ν) = 29.333333 = 1/δ − 1` passes; and `δX = 0.152075` matches
`variance-note.md` §7's diagonal entry 0.1521 at `x = 7`. The CRT twist that
`varE-spectral.md` flags is required here too, and is carried.

**The `SEARCH-CONVENTIONS.md` row this feeds.** §1's hyperuniformity row
currently reads "no sieved-set instance exists, searched". That absence is not
contradicted by this pass, and this pass could not repeat the search (see §6).
What it can add is the instance itself, which is the row's PUBLISHED-ANCHOR
half: the twin tile at level `x` is a periodic, class I hyperuniform point
configuration on `ℤ/W` whose structure factor is known in closed product form,
`S(ν) = δ ∏_{p≤y} f̂_p(ν_p)` with `f̂_p(ν) = (2 + 2cos(4πν/p))/(p−2)²`. If a
sieved-set instance is wanted in that convention, this is it, stated in the
convention's own variables.

**A name collision worth recording.** Torquato's `H` (eq. 252, p. 78) is the
hyperuniformity metric `S(0)/S(k_peak)`, a dimensionless ratio. The corpus's `H`
(import-map row 1) is a growth exponent of a moving-sum standard deviation. They
are different objects with the same letter, and the convention row that names
hyperuniformity as the owner of the corpus's `H` should say so.

**The check on whether the variance law explains the corpus's `H`, which failed.**
PART 5 computes the local exponent `d ln σ / d ln L` of the count standard
deviation at `y = 1009`: it reads 0.4481, 0.4427, 0.4446, 0.4369, 0.4314,
0.4312, 0.4256 over `u = 1.30` to `1.90`. The maxsum exponent `H` measured in
`import-scanstat.md` and `scanstat-t37.md` runs 0.2661 to 0.3565. The two do not
match, and both drift downward against different variables. The objects are not
the same (a window of fixed length versus a sum of `m` consecutive gaps, that is
a window of fixed count), so this is a failed check rather than a refutation of
anything; it says only that the sub-Poisson variance law does not, as tried
here, produce the corpus's `H`, and that the hyperuniformity convention row
remains an address for `H` rather than a derivation of it.

---

## 5. The correction to the existing determinantal rejection

**File:** `research/history/staging/import-map-construction.md`, §1, the
`determinantal point processes` row (line 60 at the time of this pass).

**The sentence as it stands:**

> a **proof-level** obstruction, not a gap: Hermitian determinantal processes
> are negatively correlated, and the reduced residues mod a primorial have pair
> density at distance 2 equal to `∏(1−2/p)/∏(1−1/p)² > 1`, positively
> correlated. No Hermitian kernel can exist

**Three defects, in increasing order of importance.**

1. *The formula evaluates to zero.* As literally written the product runs over
   all `p` dividing the primorial, and its `p = 2` factor is `1 − 2/2 = 0`.
   PART 9 prints `0.000000` at every level. The correct one-class value is
   `g₁(2) = 2 ∏_{2<p≤x} (1 − 1/(p−1)²)`, reading 1.4062, 1.3672, 1.3535, 1.3441,
   1.3226 at `x = 5, 7, 11, 13, 101`.
2. *The exponent convention is right, the range is not.* `(1−2/p)/(1−1/p)²` does
   equal `p(p−2)/(p−1)²` and is the correct generic factor; only `p = 2`, where
   the two excluded classes coincide, is mishandled.
3. *The object is not the one the corpus models.* The sentence is about the
   reduced residues, one class per prime, where distance 2 is indeed the first
   admissible separation. The twin tile is two classes per prime and has no pairs
   at distance 2 at all: `g(2) = 0`, because mod 3 the tile occupies one class
   and every separation is divisible by 6. The obstruction for the tile sits at
   `d = 6`.

**What it should read, offered verbatim for whoever holds that file:**

> a **proof-level** obstruction, not a gap: a Hermitian determinantal measure
> has `P(i,j ∈ S) = K_ii K_jj − |K_ij|² ≤ P(i)P(j)`, so `g ≤ 1` at every pair.
> The twin tile fails this at its **first admissible separation, `d = 6`**, not
> at `d = 2` where `g` vanishes identically (mod 3 forces `6 | d`):
> `g(6) = 6 ∏_{5≤p≤x}(1 − 4/(p−2)²)` reads 2.661728 at `x = 11` and never falls
> below 2.3812 at any level. The one-class analogue, the reduced residues, fails
> it at `d = 2` instead, with `g₁(2) = 2 ∏_{2<p≤x}(1 − 1/(p−1)²) = 1.3535` at
> `x = 11`. No Hermitian kernel can exist for either
> (`history/staging/import-repulsive.md` §1, §2, §5)

The rejection's **conclusion was correct all along**, for both objects. Only the
distance, the formula and the identification of the object needed fixing.

---

## 6. The verification ledger

**[SOURCED] this pass.** Torquato, *Hyperuniform States of Matter*, read as the
author's arXiv full text: `https://export.arxiv.org/pdf/1801.06924`, HTTP 200,
10,187,846 bytes, sha256
`59812b37af8b075900bb1e219a6dc4e9fa44851c8fcaf2637e5023c7daad259f`, text
extracted with `pdftotext -layout` and the decisive pages read at the page
image; arXiv lists v1 only. **Every page number in this note is an
arXiv:1801.06924 page**, of 113, and not a *Physics Reports* page: the published
article runs 1–95 on different pagination, so these numbers must never be
attached to the journal citation, and "printed page numbers confirmed against
the extraction's own page footers" confirmed the preprint's footers. Quoted at
eq. (14) arXiv p. 10 (the definition), §5.3 arXiv p. 23 (the three classes),
§5.3.1 eq. (88) arXiv p. 25 (the one-dimensional bounded-variance statement),
§5.5 arXiv p. 28 (periodic configurations are class I), §11.1.6 eq. (252) arXiv
p. 78 (the effective-hyperuniformity criterion
`H ≡ S(0)/S(k_peak) ≲ 10⁻⁴`).

**[SOURCED] at abstract pages, `export.arxiv.org`, HTTP 200.** Soshnikov
math/0002099 (sha256 `2ab07517…`), whose abstract states the paper proves the
necessary and sufficient condition for a determinantal random point field with
Hermitian kernel; Lyons math/0204325 (sha256 `300619c1…`), whose abstract names
negative association as a main result for the **discrete** case, which is the
version this object needs; Hough–Krishnapur–Peres–Virág math/0503110 (sha256
`a6b6d8c5…`). In all three the abstract was read and no theorem was opened at a
page, so every theorem number attributed to them is [MEMORY]. Nothing in §2
depends on those numbers: the `2 × 2` determinant is the whole proof.

**[SOURCED-BIB] at the Crossref API.** Torquato, *Physics Reports* **745** (2018)
1–95, DOI 10.1016/j.physrep.2018.03.001; Soshnikov, *Russian Math. Surveys*
**55**(5) (2000) 923–975, DOI 10.1070/rm2000v055n05abeh000321; Lyons, *Publ.
Math. IHÉS* **98** (2003) 167–212, DOI 10.1007/s10240-003-0016-0;
Torquato–Stillinger, *Phys. Rev. E* **68** (2003) 041113, DOI
10.1103/physreve.68.041113; Borcea–Brändén–Liggett, *J. Amer. Math. Soc.* **22**
(2009) 521–567, DOI 10.1090/S0894-0347-08-00618-8.

**[MEMORY], not reached at any source.** The hard-rod pair correlation's shell
peak above 1, and the ordering of the one-dimensional one-component plasma, both
used in §2(c) to withdraw the row's clause. They are the reason the clause is
withdrawn rather than repaired, and a reader who wants the clause reinstated in
any form should source them first. Also [MEMORY]: that `β`-ensembles are
determinantal only at `β = 2`.

**Channel note.** `arxiv.org` rate-limited earlier in the day per the row's own
record; `export.arxiv.org` answered 200 on all four requests this pass, and
Crossref answered 200 on five of six (the sixth was a wrong DOI, corrected on
retry). No absence claim rests on a failed channel here, and none is made.

---

## 7. The LANDED regrade for row 17, in the map's format

Offered for `research/IMPORT-MAP.md`. This pass edited no live file.

| # | field | the importable theorem, and where its statement lives | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 17 | repulsive point processes, and hyperuniformity as the surviving half | the two-point inequality for Hermitian determinantal measures, `P(i,j∈S) = K_ii K_jj − \|K_ij\|² ≤ P(i)P(j)`, proven in house from the `2×2` determinant and anchored in Soshnikov, *Russian Math. Surveys* **55** (2000) 923–975 and Lyons, *Publ. Math. IHÉS* **98** (2003) 167–212 **[SOURCED at abstract, theorem numbers MEMORY]**; the positive half is the Torquato–Stillinger classification by the growth of the local number variance, Torquato, *Physics Reports* **745** (2018) 1–95, read at the author's arXiv full text and cited by ITS pages, not the journal's: arXiv:1801.06924 eq. (14) p. 10, §5.3 p. 23, §5.3.1 eq. (88) p. 25, §5.5 p. 28, eq. (252) p. 78 **[SOURCED at the page image; the published article is 95 pages on different pagination and these are not its page numbers]** | the tile `T_x ⊂ ℤ/W` as a stationary point process under a uniform translate, with pair correlation `g = W(d)` (`variance-note.md` Thm 1) and structure factor `S(ν) = δ∏_p f̂_p(ν_p)` (`varE-spectral.md` §1) both exact | the family of routes modelling the survivor process as repulsive, and the owning-convention row for the local number variance | **EXACT-IDENTITY at the statistic; NEGATIVE at the model**, and two-sided rather than one-sided | **CLEAN.** A pair-correlation evaluation at a fixed level is a finite computation | CLOSURE (a family, both signs, with a mechanism) + PUBLISHED-ANCHOR | 2 h | **LANDED 2026-08-28** |

**Status text.** Pre-registration `g(6) > 2` at every level: PASSED, and exceeded. The
kill criterion (`g(d) > 1` at any `d` and any level) fired on the first line and the
result is stronger than the row asked for: `g` takes the value 0 or a value at
least `2.3812` and nothing in `(0,1)`, at every level, with `d = 6` the exact
minimiser and `g(6) = 6∏_{5≤p≤x}(1−4/(p−2)²)` in closed form. So the tile is
**neither negatively nor positively associated**, and the closure is two-sided:
Hermitian determinantal, negatively-associated and strongly Rayleigh models die on
`g(6) ≥ 2.38 > 1`; permanental and positively-associated models die on
`g(2) = 0 < 1`. **Two of the row's own claims were corrected by its own run.**
The row's clause extending the closure to one-dimensional Gibbs and Coulomb gases
is WITHDRAWN: a repulsive pair potential does not force `g ≤ 1` at finite density.
The row's implicit reading that the sub-Poisson `Var/E` is a hyperuniformity
statement is DEMOTED: each fixed level is class I hyperuniform only because it is
periodic, which is exact and vacuous, while along the diagonal family `L = y^u`
the variance is linear in `L` with ratio 0.152 to 0.396, so no member of that
family approaches a hyperuniform limit and the correct word for the family is
sub-Poisson. Banked: the
distance correction to `import-map-construction.md` §1 (`d = 6`, not `d = 2`, and
its quoted product vanishes as written); the number-variance identity
`Var/E = Σ_{ν≠0} S(ν)K_L(ν/M)` verified against `varE-spectral.md`'s `X(210) =
4.612929`; the exact `Var[N_L] = Var[N_{W−L}]` symmetry, the count-side of the
scan-statistic duality; and a `SEARCH-CONVENTIONS.md` §1 candidate naming the tile
as the sieved-set instance that row records as absent. Not banked: any statement
about the conjecture. `history/staging/import-repulsive.md`;
producer `history/staging/import-repulsive.js`.

**One-line `REFUTED.md` index, offered:**

> | modelling the twin tile as a repulsive point process (Hermitian determinantal, negatively-associated, strongly Rayleigh) or as an attractive one (permanental, positively-associated) | CLOSED, both signs | its pair correlation takes the value 0 or a value ≥ 2.3812 and nothing in between, so no association hypothesis of either sign holds: `g(2) = 0` by mod 3, `g(6) = 6∏_{5≤p≤x}(1−4/(p−2)²) = 2.6617` at `x = 11` | 2026-08-28 | `history/staging/import-repulsive.md` §2 |

---

## 8. What this buys, plainly

**A family closed, with a mechanism.** Any model of the twin tile whose content
is that survivors repel is dead, at every level, on one inequality and one number.
The mechanism is not a fit or a measurement: it is the local factors. Two slots
six apart impose only four excluded classes mod each `p ≥ 5` rather than eight,
because `{0, −2}` and `{−6, −8}` are disjoint but the sieve pays for them once
each rather than twice, and the ratio `(1−4/p)/(1−2/p)²` exceeds 1 at every
prime. Attraction at `d = 6` is forced by the sieve's own arithmetic. The same
arithmetic forces total exclusion at `d = 2`, and that pair of facts is what no
association hypothesis can hold.

**A taxonomy word, at a rung.** Class I hyperuniform at every fixed level,
proven, by periodicity, and empty. Sub-Poisson along the `L = y^u` family at the
window scales that matter, with no member of that family approaching a
hyperuniform limit, measured. The corpus's current use of the word covers both
and should not.

**A correction and an anchor.** The existing determinantal rejection has the
right conclusion, the wrong distance, the wrong object, and a formula that
evaluates to zero. The variance note's `Var/E` is the local number variance and
its spectral form is the structure factor, which is the convention that owns
them.

**Nothing about the conjecture.** `Var/E` is a statement about a uniformly
random window, and `variance-note.md` §4 already records that this says nothing
about the one anchored window the twin problem needs. Closing a family of models
nobody had built does not move `G₂`, does not move the exponent, and does not
touch the Zone Postulate. The base rate stands.

---

## 9. NOT REACHED

- **No prior-art search was run on the identification itself**, meaning on
  whether anyone has published the twin tile, or any two-class sieved set, as a
  hyperuniform point configuration. `SEARCH-CONVENTIONS.md` §1 records the
  absence from an earlier search; this pass did not repeat it and the
  PUBLISHED-ANCHOR half is contingent on that earlier negative.
- **No theorem in Soshnikov, Lyons, HKPV or Borcea–Brändén–Liggett was opened at
  a page.** Only abstracts and bibliographic records were read. §2 does not
  depend on this, but any sentence that attributes a numbered theorem does.
- **The Gibbs question was not computed.** Whether a one-dimensional Gibbs
  measure with a pair potential supported on `6ℤ` can reproduce `g` on `6ℤ` at
  the tile's density is open and was not attempted. It is the only surviving
  member of the row's original list.
- **`Var/E` was not recomputed at the deep diagonal levels.** The `x = 29..37`
  readings are quoted from `variance-note.md` §7 and `varE-asymptotic.md`, per
  the standing compute rule. What this pass recomputed is the `y ≤ 1009` control,
  the `y = 401` §6 table, and the `y = 13` spectral identity.
- **The `H` check is one comparison at one level.** PART 5's local exponents come
  from `y = 1009` alone, on the full tile, against `H` values measured on the
  comb at seven levels. The mismatch is reported and not diagnosed.
- **No live file was edited and no `REFUTED.md` line was added.** §5 and §7 are
  drafts for whoever holds those documents.

---

## What would falsify this, and whether that check has run

**The closure at `d = 6` is falsified** if `g(6) ≤ 1` at any level, or if the
closed form `g(6) = 6∏_{5≤p≤x}(1−4/(p−2)²)` is wrong. RUN: PART 2 checks the
identity at twelve levels to machine precision and the value never falls below
2.3812. It would also fall if `variance-note.md` Theorem 1's local factors were
wrong; that theorem carries its own proof and its sum rule is re-verified here
at three levels to relative `3·10⁻¹⁴` (PART 6).

**The stronger claim, that `g` never lies in `(0,1)`, is falsified** by any `d`
with `6 | d` and `g(d) < 1`. The argument is a proof (every local factor is at
least `1 − 4/(p−2)²`), and the exhaustive check ran to `d = 2·10⁶` at
`x = 1009` (PART 3). It has not been checked at levels above `x = 1009` by
enumeration, and does not need to be, since the bound is level-uniform.

**The two-sided closure is falsified** if some model in the named families does
not in fact require `g ≤ 1` or `g ≥ 1`. For Hermitian determinantal measures the
inequality is the `2 × 2` determinant and cannot fail. For negatively-associated
measures it is the definition. For strongly Rayleigh it goes through
Borcea–Brändén–Liggett, whose theorem was NOT opened at a page. **Non-Hermitian
determinantal kernels are not closed** and are not claimed to be: with `K` not
Hermitian, `K_ij K_ji` can be negative and `g > 1` is available. Any future
proposal in this family must state that its kernel is non-Hermitian, and then it
must still reproduce `g = 0` at five sixths of all distances.

**The Gibbs withdrawal is falsified** if the hard-rod and one-component-plasma
facts used to withdraw it are wrong. NOT CHECKED at a source; both are [MEMORY]
in §6. If they are wrong the row's original clause may be reinstatable, and the
closure would widen rather than narrow, so the error would be conservative.

**The class-I reading is falsified** if `Var[N_L]` is not periodic in `L`, which
would require the tile not to be periodic. RUN, at three levels: PART 8 finds
`Var[N_W] ≈ 0` and a bounded maximum at `L = W/2`. The reading that this is
vacuous is falsified if any live document reasons about a window longer than one
period; none does, on the reading of `variance-note.md` §§4, 6, 7 done here.

**The "not hyperuniform at `L = y^u`" reading is falsified** if `Var/E → 0` at
fixed `u` as the level grows. It does the opposite on both ladders: 0.251 to
0.321 at `u = 2` over `y = 97..2003` (`variance-note.md` §6) and 0.152 to 0.396
over `x = 7..37` on the comb diagonal (§7). Both are measurements over a finite
range and neither is a limit theorem; `varE-spectral.md` gives a HEURISTIC limit
0.455456 at `u = 2`, which if right settles the reading and if wrong does not
change it unless the true limit is 0.

**The anchor is falsified** if the number-variance / structure-factor identity
is not the standard one, or if `S(ν) = δŴ(ν)` is the wrong normalisation. RUN,
one level: PART 7 reproduces `X(210) = 4.612929` by direct summation and by the
spectral sum independently, and the mass check `Σ_{ν≠0}Ŵ = 1/δ − 1` passes.
It is falsified as a *published* anchor if a sieved-set instance already exists
in the hyperuniformity literature, which this pass did not search.

**The correction in §5 is falsified** if the quoted product does not vanish, or
if the reduced residues are not positively correlated at distance 2. RUN, PART
9: the quoted product prints `0.000000` at five levels and the correct value
prints 1.4062 down to 1.3226.

---

*This document states current understanding at 2026-08-28. It edits nothing;
the integration, if any, belongs to `research/IMPORT-MAP.md`,
`research/REFUTED.md`, `research/SEARCH-CONVENTIONS.md`, `research/GLOSSARY.md`
and `history/staging/import-map-construction.md`, and to whoever holds them.*
