# B-free dynamics: the theory that owns the comb excludes it by name, and the theorem that owns its gaps stops one hypothesis short

<!-- ledger
id: Q-import-bfree
status: ANSWERED
todo: none
question: Does the ergodic theory of B-free systems - Mirsky measures, Toeplitz structure, tautness, heredity, entropy - say anything about the twin comb?
verdict: It lands as an exclusion: the comb is exactly the object the field's newest generalisation is built for and that generalisation names the comb's own regime as the one it declines to study, the limit comb is the single point {-1} so every ergodic statement about it is vacuous, and the yield is a corrected address for the walls plus one live external open problem.
-->

*Staging note, 2026-08-19. Foreign-import attack 5 of 5: the ergodic theory of
B-free systems (Sarnak's programme — Mirsky measures, Toeplitz structure,
tautness, heredity, entropy) applied to the twin comb. Proposal only; nothing
here is integrated into a live document. Producers:
`research/import-bfree-01-toeplitz.js`,
`research/import-bfree-02-poisson-hypothesis.js` and
`research/import-bfree-03-admissible-complexity.js`, all formally embedded
(`node research/qc/embed.js --streams both …`). Calibration is marked on every
claim: PROVEN, VERIFIED by exact computation, MEASURED, CONFIRMED AT SOURCE,
UNCONFIRMED, REFUTED.*

*This note replaces the branch's earlier target. The L = 1 residue count was
refuted the same day as the Zone Postulate in residue notation
(`attack-l1-residue.md`); it is not resurrected anywhere below.*

## 0. The answer

**The B-free import lands, and it lands as an exclusion.** The comb is exactly
the object the field's newest generalisation is built for, and that
generalisation names the comb's own regime as the one it declines to study. The
useful yield is not a theorem about the comb; it is a corrected address for the
walls and one live external open problem that the corpus did not know existed.

Five findings, in order of what they cost or buy.

1. **The limit comb is a single point, so every ergodic statement about it is
   vacuous.** `C_∞ = {n : p ∤ n(n+2) for every prime p} = {−1}` (§2.1, PROVEN in
   two lines, VERIFIED by brute force over `|n| ≤ 2·10⁶`). The associated
   sequence is not Toeplitz, its subshift has topological entropy 0, and its
   only invariant measure is the point mass at `0^∞`. The dividing line between
   the twin comb and the whole published theory is **Mertens**: the field runs
   on Erdős's condition `Σ 1/b < ∞`, and ours is `Σ 2/p = ∞`.
2. **This is in print, as the reason the theory stops.** Araújo's *Sarnak's
   Program for Erdős Sieves* (arXiv:2602.24031, February 2026) generalises
   B-free dynamics to arbitrarily many residue classes per modulus, which is
   precisely the two-class case, and writes, verbatim: *"if R is not Erdős, we
   have `d_I(F_R) = 0` for every Følner sequence … When R is such a sieve, we
   have that `ν_R = δ_∅`, so `(Ω_R, S, ν_R)` **is not an interesting system**.
   For this reason, we restrict our study of sieves with weak light tails to
   only Erdős sieves."* Our comb is that sieve. CONFIRMED AT SOURCE.
3. **The entropy is 0 in every reading, and computing it produced a new
   invariant that closes a new route.** Word complexity of the level-x comb
   saturates at `x#` at a length `R_x` (the recognizability radius), `R_x ≥ G₂ − 1`
   is elementary, and therefore `R_x < x′² − 3` would imply the Zone Postulate.
   **PRICED AND CLOSED:** `R_x/x′²` reads 0.2000, 0.4898, 0.5455, **1.1006,
   1.0796, 2.5429, 2.0756** at `x = 3..19`, so the route certifies only to
   `x = 7` and fails from `x = 11` onward (§3.2, VERIFIED).
4. **The one live import is not ergodic theory at all, and it is sharp.**
   Granville and Kurlberg, *Poisson statistics via the Chinese Remainder
   Theorem*, Adv. Math. **218** (2008) 2013–2042, own the comb's gap statistics
   in a setup identical to ours (one subset `Ω_p ⊂ Z/pZ` per prime, CRT to
   squarefree modulus). Their Theorem 1's hypothesis **fails for the twin comb,
   and holds for the reduced residues**, by a factor `p^δ` at every `δ > 0`
   (§6, VERIFIED exactly). The averaged weakening that would repair it **holds
   for the comb with a factor `p` to spare** (§6.4, VERIFIED exactly) and is
   Granville and Kurlberg's own stated open problem: *"We have been unable to
   prove this as yet."* CONFIRMED AT SOURCE.
5. **One new number that is not a dead end.** The complexity of the limit
   twin-admissible subshift is computed exactly to `n = 60`: `cpx(60) = 1441`,
   which is `1.250e−15` of `2⁶⁰`, with the one-class control landing inside the
   published band for the prime subshift and the two-class-to-one-class ratio
   growing to 430.8319 by `n = 52` (§3.3, VERIFIED against a second engine at
   19 of 19 lengths).

## 1. The dictionary, written out

`H = Ẑ` is the profinite integers, `W_x = ∏_{p ≤ x}(Z/pZ \ {0, −2})` the window,
`φ(h)(n) = 1` iff `h + n ∈ W`, and `ν_η` the Mirsky measure, the push-forward of
Haar measure on `H` under `φ`.

| corpus object | B-free / dynamics object | status of the correspondence |
|---|---|---|
| tile `T_x`, period `x#` | the `x#`-periodic point of the shift; the periodic approximant | **EXACT.** The tile is literally a periodic point; its orbit closure is one finite cycle |
| fold `x → x′` | the next term of the period structure `s_k = ∏_{p ≤ p_k} p` | **EXACT.** The period sequence is the primorials, and the inverse limit is `Ẑ` |
| the CRT product measure the corpus already uses | the Mirsky measure `ν_η` | **EXACT on positive cylinders** (identity, VERIFIED §4.1); **absent on negative ones** (§4.2) |
| comb density `∏(1 − 2/p)` | Haar measure of the window | dimension 2 against the literature's `∏(1 − 1/b)`. The difference is fatal, not cosmetic: `Σ 2/p = ∞` |
| crystallization frontier `x′²` | the Toeplitz "periodic part" filtration, whose density measures **regularity** | **INVERTED.** Regularity wants the periodic part to have density `→ 1`; ours is `x′²/x#`, reading 7.32e−2, 9.62e−3, 7.07e−4, **5.45e−5** at `x = 11..19` |
| `G₂(x#)` | `1 +` the longest run of zeros in the periodic word | **EXACT** |
| the Gap Reformulation's sufficient condition `G₂(x#) < x′²−2` | `0^{x′²−2} ∉ L(T_x)`: uniform syndeticity of the family `{C_x}` with constant `x′²` | **EXACT.** The condition that delivers the Zone Postulate is a language statement about one forbidden word |
| the gap sequence | the return-time process of the induced map on the comb | **EXACT** |
| `H″` | conditional exponential tail (ψ-mixing) of that return-time process at threshold `θ ≈ 3x` | **EXACT as a translation**, and the dynamics predicts the opposite (§5.2) |
| Assumption A | *no counterpart.* A ratio of a count over a window of length `x′²` to the full-period mean, at a distinguished point | the dynamics has two scales, 1 and `x#`, and `x′²` is neither |
| "every conspiracy occurs" (translate-buys-zero, `sift-limit-attack.md` §7a-bis) | heredity of `X_η` | **the dynamical statement is true and vacuous; the word-level form is false with room** (§5.1, §3.3) |

**Where the two-class case leaves the published one-class theory, itemised.**
(a) The density is dimension 2, so Erdős's condition fails and the whole
measure-theoretic layer degenerates. (b) The set is not of the form
`{n : b ∤ n}` for any `B`; it is a general window in `Ẑ`, which needs the
Keller–Richard weak-model-set formulation rather than the `B`-indexed one.
(c) In Granville–Kurlberg's coordinates the second class breaks a hypothesis
that the first class satisfies (§6). Only (b) is cosmetic.

## 2. Stage A: the limit object, and why the theory declines it

### 2.1 `C_∞ = {−1}` (PROVEN, VERIFIED)

> **Lemma A.** `{n ∈ Z : p ∤ n(n+2) for every prime p} = {−1}`.

*Proof.* If `n ≥ 1` then `n + 2 ≥ 3` has a prime factor, which divides
`n(n+2)`. If `n = 0` or `n = −2` then every prime divides `n(n+2)`. If
`n ≤ −2` then `|n| ≥ 2` has a prime factor. At `n = −1`, `n(n+2) = −1`, which no
prime divides. QED

**VERIFIED** by brute force over `|n| ≤ 2·10⁶` against every prime to `2·10⁶+2`:
the survivor list is exactly `[−1]`.

Three consequences, all immediate and all fatal to the naive import.

- `η = 1_{C_∞}` is **not a Toeplitz sequence**. Toeplitz requires every position
  `n` to carry some `k_n` with `η(n) = η(n + jk_n)` for all `j`; position `−1`
  carries a 1 and no arithmetic progression through it is constant.
- `X_η = {0^Z} ∪ {shifts of the single-1 sequence}`, so `h_top = 0` and the only
  invariant measure is `δ_{0^Z}`. Unique ergodicity holds and says nothing.
- The window `W = ∏_p (Z/pZ \ {0,−2})` is a nonempty Cantor set of **Haar
  measure zero** with empty interior. In Kasjan–Keller–Lemańczyk's dictionary
  (IMRN 2019, Theorem C) empty interior is exactly **proximality** with unique
  minimal subset `{0^Z}`.

The density's collapse rate, for the record: `∏_{p ≤ x}(1 − 2/p)` reads
5.844e−2, 1.877e−2, 8.639e−3, 4.893e−3, 3.138e−3, 2.180e−3 at
`x = 10, 10², …, 10⁶`.

### 2.2 The literature's own statement of the boundary (CONFIRMED AT SOURCE)

The one-class version of this regime is a live research topic, and it has a
name: **Behrend sets**, `B` with `d(F_B) = 0`. Kasjan, Lemańczyk and Zuniga
Alterman, *Dynamics of B-free systems generated by Behrend sets. I*, Acta Arith.
**209** (2023) 135–171, prove the dichotomy (their Corollary 1.1, verbatim):
*"(i) B is Erdős if and only if `X_η = X_B` and `h(X_η,S) > 0`. (ii) B is
Behrend if and only if `(X_η,S)` is proximal and `h(X_η,S) = 0`."* And in their
§1.1: *"`ν_η` is just the Dirac measure `δ_{0^Z}` at the fixed point, and it is
the only S-invariant measure on `X_η`. That is, from the dynamical point of
view, these are uniquely ergodic models of the one-point system."*

**The primes themselves are already in that class.** Keller (*Generalized
heredity in B-free systems*, Stoch. Dyn. **21** (2021) 2140008, Remark 3, citing
Hall's *Sets of Multiples* p. 173) records that `B = {pq : p, q prime}` is
Behrend and `F_B = P ∪ (−P) ∪ {−1, 1}`. So the prime subshift is a B-free system
with `Σ 1/b = ∞`, and the field knows it and studies it topologically rather than
ergodically.

**No published sentence names Eratosthenes as outside the theory.** The search
for one came back empty in every wording tried, and the string "Eratosthenes"
appears zero times in either Araújo paper. The quotable sentence is the `δ_∅`
passage in §0 item 2, which requires one substitution to become the statement
about the comb.

## 3. Import (ii) priced first, because it produced something: entropy and complexity

### 3.1 The entropy number, in all four readings (VERIFIED)

| object | topological entropy |
|---|---|
| the limit comb's subshift | **0** (Lemma A; the system is a point plus one orbit) |
| the level-x comb's subshift, every finite `x` | **0** (a single periodic orbit) |
| the B-free hereditary-closure formula `d_x · log 2` evaluated at level x | 4.051e−2, 3.428e−2, 3.024e−2, **2.706e−2** nats at `x = 11, 13, 17, 19`, and `→ 0` |
| the nondegenerate two-class cousin `{n : p² ∤ n(n+2)}` | density **0.322634616605**, entropy **0.223633274851** nats |

The last row is the only nonzero number, and it is new. Its one-class
counterpart is Sarnak's square-free flow: `6/π² = 0.607927101854`, entropy
`(6/π²) log 2 = 0.421382956636` (Sarnak, *Three lectures on the Möbius function,
randomness and dynamics*, Theorem 8(ii), CONFIRMED AT SOURCE; the bare `6/π²`
quoted elsewhere is the same number in `log₂` normalisation). The general
formula is Dymek–Kasjan–Kułaga-Przymus–Lemańczyk, TAMS **370** (2018) 5425–5489,
Proposition K: `h_top(S, X̃_η) = h_top(S, X_B) = δ(F_B)`, the logarithmic density
of the B-free set.

**The two-class cousin is in print as of six months ago.** Araújo Part II §6.2
handles square-free values of polynomials, and Corollary 6.23 covers *"a
polynomial that can be written as the product of distinct irreducible
polynomials all of degree smaller than or equal to 3"*, which `n(n+2)` is. So
the entropy number above is a computation the framework licenses rather than a
new theorem, and **it is not the corpus's object**: `{n : p² ∤ n(n+2)}` has
positive density and nothing to do with twin slots.

### 3.2 The recognizability radius, and the route it closes

> **Definition.** `p_x(n)` is the number of distinct binary words of length `n`
> occurring in the level-x comb read cyclically. It is nondecreasing and
> saturates at `x#`. `R_x` is the least `n` with `p_x(n) = x#`.

> **Lemma B (PROVEN).** `R_x ≥ G₂(x#) − 1`.

*Proof.* A record gap of length `G₂` is `G₂ − 1` consecutive zeros, which
contains the word `0^{G₂−2}` at two distinct starting positions. So two distinct
positions share a window of length `G₂ − 2`, and saturation cannot occur before
`G₂ − 1`. QED

> **Corollary.** `R_x < x′² − 3` implies `G₂(x#) < x′² − 2` implies the Zone
> Postulate at `x`.

| `x` | `x#` | slots | `G₂` | `R_x` | `R_x/G₂` | `x′²` | `R_x/x′²` | certifies the zone? |
|---|---|---|---|---|---|---|---|---|
| 3 | 6 | 1 | 6 | 5 | 0.8333 | 25 | 0.2000 | yes |
| 5 | 30 | 3 | 12 | 24 | 2.0000 | 49 | 0.4898 | yes |
| 7 | 210 | 15 | 30 | 66 | 2.2000 | 121 | 0.5455 | yes |
| 11 | 2310 | 135 | 42 | 186 | 4.4286 | 169 | 1.1006 | **no** |
| 13 | 30030 | 1485 | 66 | 312 | 4.7273 | 289 | 1.0796 | **no** |
| 17 | 510510 | 22275 | 108 | 918 | 8.5000 | 361 | 2.5429 | **no** |
| 19 | 9699690 | 378675 | 150 | 1098 | 7.3200 | 529 | 2.0756 | **no** |

**REFUTED as a route.** The complexity reformulation is strictly stronger than
the target by Lemma B, and it is already false as a certificate from `x = 11`
onward, at four consecutive levels. The deficit at the zone budget,
`1 − p_x(x′²−2)/x#`, reads 2.0346e−2, 6.6600e−3, 7.8151e−2, 5.4708e−2 at
`x = 11..19`: a few per cent of positions are still unresolved exactly where the
postulate needs all of them to be.

The `G₂` column reproduces the corpus's ladder (42, 66, 108, 150 at
`T₁₁..T₁₉`) from an engine that shares no code with it, which is the run's
calibration. The one-class control reproduces A048670 (`g = 4, 6, 10, 14, 22,
26, 34`) and has recognizability radius `4, 14, 38, 66, 138, 238, 366`.

### 3.3 The complexity of the limit twin-admissible subshift (VERIFIED)

The level-x complexity `p_x(n)` is nondecreasing in `x` and converges to the
complexity of the limit subshift `X_φ`, whose length-`n` words are exactly the
twin-admissible configurations. That limit is computable exactly, because the
primes split at `n + 2`: below it every choice of residue kills something, so
each prime contributes one mandatory generator and the operation is a product;
above it `K_p(r)` is the empty set, a pair `{a−2, a}`, or a boundary singleton,
the empty set is always available, and the generator family no longer depends on
`p`, so the operation is a union closure and saturates.

**The engine is asserted against the level-x refinement of §3.2, which shares no
code with it: `c_x(n)` is monotone in `x` at 19 of 19 lengths and `c₁₇(n)`
already equals the limit at 19 of 19.**

| `n` | 1..12 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 60 |
|---|---|---|---|---|---|---|---|---|---|---|
| `cpx(n)` | 2,3,4,5,6,7,9,11,13,15,17,19 | 31 | 49 | 73 | 105 | 153 | 313 | 577 | 1121 | **1441** |
| `ln(cpx)·ln n / n` | peaks 0.6262 at n=9 | 0.5951 | 0.5829 | 0.5681 | 0.5539 | 0.5448 | 0.5299 | 0.5128 | 0.5047 | **0.4963** |
| `cpx(n)/2ⁿ` | | 4.730e−4 | 4.673e−5 | | | 3.562e−8 | 2.847e−10 | 2.050e−12 | 1.556e−14 | **1.250e−15** |

**Three readings.**

- **"Every conspiracy occurs" is false at word level, quantitatively.**
  `cpx(60)/2⁶⁰ = 1.250e−15`. The tile realises a vanishing fraction of binary
  words, and the corpus's translate-buys-zero identity is a statement about
  covering economy inside one period, not about which words exist.
- **The one-class control IS the published object, exactly, and it has an OEIS
  home.** KLZ §1.2 (read at source 2026-08-19,
  `history/staging/klz-forward-walk.md`) defines `X_ℬ` hereditarily and its
  `cpx` counts blocks, i.e. subsets; our union enumeration reaches every
  hereditary member (mod-6 lemma: any admissible S lies in one class mod 6, so
  an extra zero is absorbed by one fresh prime; VERIFIED union count == subset
  count at every n = 1..20, both classes), so `cpx₁(n) = cpx_{X_ℙ}(n)`
  **exactly**, and Kasjan–Lemańczyk–Zuniga Alterman's **unconditional**
  equation (8) sandwiches our measured sequence from BOTH sides — the sequence
  `1_ℙ`'s own lower bound (their (9)) stays conditional on Hardy–Littlewood,
  and the upper bound's engine is the large sieve (Montgomery–Vaughan,
  Mathematika 20 (1973)). The one-class column is **OEIS A023192** (Wilson,
  "infinitely-recurring prime patterns on n consecutive integers"), 13 of 13
  against its b-file — third-party custody on the control, stronger than the
  band membership below. Measured: `cpx₁(n)` reads 7,
  25, 73, 211, 535, 1275, 3103, 7145, 15955, 36457, 80233, 164779, 358883 at
  `n = 4..52`, with exponent rising 0.6744 → **0.9719**, inside
  `[ln 2, ln 4] = [0.6931, 1.3863]` from `n = 8` on. Landing inside a band it is
  provably inside is a calibration, not a discovery, and that is what it is for.
- **The second class is expensive and the cost is growing.** `cpx₁/cpx₂` reads
  1.4000, 2.2727, 3.8421, 6.8065, 10.9184, 17.4658, 29.5524, 46.6993, 73.5253,
  116.4760, 185.2956, 285.5789, **430.8319** at `n = 4..52`. This is the
  complexity-side face of the dimension-2 penalty the sieve side carries as
  `β₂ = 4.26645`.

**The two-class exponent, 0.4963 and still falling at `n = 60`, is below the
one-class band and has not converged.** `n ≤ 60` is nowhere near asymptotic in
a coordinate carrying `n/log n`. This is a measured head of a curve, and no
value should be quoted as its limit.

**`R_x` is apparently unrecorded.** Searched on OEIS at eight indexings
(`5,24,66,186,312,918`; the same shifted by ±1; four suffixes; and the one-class
sequence `4,14,38,66,138,238` at three indexings), all clean negatives, on a
channel calibrated the same minute with two known positives (A288815 and A048670
both returned). A keyword sweep in the combinatorics-on-words convention
("longest repeated factor", "window complexity", "modulo-recurrence") returned
nothing on point. **No owning convention was identified**, so per
`SEARCH-CONVENTIONS.md` this negative carries little weight and should not be
written as an absence in any live document.

## 4. Import (i): unique ergodicity and the Mirsky measure

**Verdict: IN PRINT, TRUE, AND VACUOUS IN BOTH REGIMES.** At finite level the
system is a periodic orbit, so it is uniquely ergodic for free and every finite
pattern frequency exists and equals the CRT prediction. In the limit it is
uniquely ergodic with measure `δ_{0^Z}`. Neither is Assumption A's qualitative
form, and the reason is not rates.

### 4.1 On positive cylinders the Mirsky prediction is an identity (VERIFIED)

For a finite offset set `D`, all required to be comb members, the count in one
period is exactly `∏_{p ≤ x} (p − |{−d, −d−2 : d ∈ D} mod p|)`. At `x = 13` the
exact count and the CRT product agree to every printed digit at all six patterns
tested, including the three that are inadmissible and give 0 on both sides.
There is no error term to make effective.

### 4.2 On negative cylinders there is no product at all

"`n + e` is **not** a comb member" is a union over primes, not an intersection,
so its probability is an inclusion-exclusion, and the term count is the
`3^{π(x)}` ceiling `discrepancy-two-class.md` already carries. Measured at
`x = 13`, the exact density against the naive independence value `d^{|D|}(1−d)^{|E|}`:

| positives | span | negatives | exact | naive | ratio |
|---|---|---|---|---|---|
| 2 | 6 | 1 | 6.293706e−3 | 2.324433e−3 | 2.7076 |
| 2 | 6 | 2 | 6.293706e−3 | 2.209488e−3 | 2.8485 |
| 2 | 12 | 5 | 1.678322e−2 | 1.897649e−3 | 8.8442 |
| 2 | 30 | 14 | 8.991009e−3 | 1.202232e−3 | 7.4786 |
| 2 | 66 | 32 | 3.996004e−4 | 4.825398e−4 | 0.8281 |

**Gaps are negative events.** That is the whole of why the Mirsky import gives
the corpus nothing it did not have: the half of the cylinder algebra where the
measure is a clean product is the half the corpus never needed.

### 4.3 What "unique ergodicity would give Assumption A without rates" gets wrong

The brief's guess was that the import supplies the limit statements and the
corpus needs the rates. That is not where the mismatch is. Assumption A is a
statement about a window of length `x′²`, and `x′²/x#` reads 7.32e−2, 9.62e−3,
7.07e−4, 5.45e−5 at `x = 11..19` and falls like `e^{−x}`. **The ergodic theory
is exact at scale `x#` and silent below it**, and the corpus lives at a
vanishing fraction of the period. The gap is not speed of convergence on the
same statement; it is a different statement at a scale the dynamics has no
coordinate for. Effective unique ergodicity, if someone proved it, would supply
an error term on the full-period average, which is already exact by CRT.

## 5. Import (iii): tautness and heredity, and the wall's dynamical address

### 5.1 Tautness and heredity, resolved

**Tautness: FAILS, by definition.** Behrend sets are never taut, and the taut
case is exactly where Dymek–Kasjan–Kułaga-Przymus–Lemańczyk Theorem F puts the
Mirsky system isomorphic to a group rotation. Our window has Haar measure 0, so
`supp ν_η = {0^Z} ⊊ X_η` and tautness fails at the definition.

**Heredity: TRUE AND VACUOUS.** Empty interior gives proximality (KKL Theorem
C), and Keller's Corollary 1 (Stoch. Dyn. **21** (2021) 2140008) gives
`X_φ = X̃_φ` for primitive proximal systems. Directly: `X_η = {0^Z} ∪ {shifts of
the single-1 sequence}` is closed under coordinatewise `≤`. So heredity holds
and asserts only that deleting the single 1 gives `0^Z`.

**It does not upgrade "every conspiracy occurs".** The corpus's measured fact
(`sift-limit-attack.md` §7a-bis: `L(primes ≤ x) + 1 = G₂(x#)`, so the covering
form's free translate buys exactly zero over the pinned pair) is a statement
about which patterns are realised **inside one period**. The word-level version
of "every pattern occurs" is `p_x(n) = 2^n`, and it is **false with enormous
room**: `p_13(n)` reads 2, 3, 4, 5, 6, 7 at `n = 1..6` and 8512 at `n = 100`,
against `2^n`, and is capped at `x# = 30030` forever. §3.3 gives the limit
version: `cpx(60)/2⁶⁰ = 1.250e−15`. Heredity is a statement about the subshift's
closure, not about the tile, and the two are not the same object.

For the record, the proof mechanism does transfer in principle. Heredity in
DKKL §5 runs on their condition `(T_her)`, which is CRT-solvability of a system
of congruences, plus "light tails" to make the realisation happen with positive
density. Light tails is strictly weaker than `Σ 1/b < ∞` but still requires
`lim_K d̄(∪_{b>K} bZ) = 0`, which our `Σ 2/p = ∞` denies. So the machinery is not
available, and it would deliver nothing if it were.

### 5.2 `H″`

**Dynamical name: exponential return-time statistics / a ψ-mixing tail for the
return-time process of the induced map on the comb, uniformly in `x`, at
threshold `θ ≈ 3x`.**

**The dynamics predicts the opposite of what `H″` needs, and there is no
literature.** Poisson and exponential return-time laws are proved for systems
with positive entropy or strong mixing. Our system is a periodic orbit at every
finite level and an odometer factor in the limit: rigid, zero entropy, no
decay of correlations at all. Frączek, Kanigowski and Lemańczyk (ETDS **42**
(2022) 1446–1473) is the nearest published result and it points the same way:
*"neither a prime nor an ℓ-almost prime number theorem hold in the class of
regular Toeplitz subshifts"* unless *"a quantitative strengthening of the
regularity"* is assumed. Ours is not even regular (§1, the inverted row).

What the comb actually does, measured, and it is the arithmetic doing it rather
than the dynamics: the gap sequence's lag-1 autocorrelation reads −0.1177,
−0.0622, −0.0397, −0.0421 at `x = 11..19`, and the ratio of the conditional to
the marginal tail at `θ = 2m̄` reads 0.0000, 1.0876, 0.9712, **0.8764**. That is
memorylessness at the threshold, consistent with `H″` and with
`fold-succession-autocorr.md`'s independent finding that kill succession is
memoryless. **It is invisible to the dynamics**, because a periodic orbit's
whole ergodic content is one uniform measure and the gap statistics live inside
a single point of the orbit space.

### 5.3 Assumption A

**Dynamical name: none that fits.** The nearest genuine dynamical family is
shrinking-target and logarithm-law problems for `Ẑ`-rotations, and the
quantitative content of any such statement at scale `x′² ≪ x#` is exactly the
CRT discrepancy, which is the sieve remainder. §4.3 has the numbers. The honest
entry is that the dynamics has no coordinate here.

### 5.4 The maximal law

**Dynamical name: the extremal statistic of the return-time point process — an
extreme value law with an extremal index.** For a single periodic orbit no such
law exists, and **no maximal-gap result for any B-free-like system appears in
the dynamics literature** on a search that found the complexity, entropy,
heredity and proximality results and explicitly failed to find any treatment of
tameness. Even in the flagship system the gap
question is answered by sieve and exponential-sum methods, never by the
dynamics. This is negative cartography and it is worth carrying: the field that
owns the comb's structure does not work on the comb's extremes.

### 5.5 Where the parity wall appears in dynamical coordinates

**Honest answer: nowhere that anyone has written down, and the corpus should not
claim otherwise.** The search for a published identification of the sieve
parity obstruction with a dynamical obstruction came back empty in every
wording. Sarnak's conjecture concerns zero-entropy systems and Tao's
entropy-decrement work names a higher-order restriction theorem, not parity, as
its obstruction. Any claim that parity "is" a lack of spectral gap or an entropy
obstruction is folklore.

**What is real, and it is close.** Kasjan–Lemańczyk–Zuniga Alterman's Theorem
1.1, read at source (Acta Arith. **209** (2023) 135–171, equations (8) and (9)),
splits exactly where it matters:

- **(8), unconditional, about the SUBSHIFT:**
  `(2+o(1))^{n/log n} ≪ cpx_{X_P}(n) ≪ (4+o(1))^{n/log n}`.
- **(9), conditional, about the SEQUENCE:** *"If the Hardy–Littlewood conjecture
  is true then `(2+o(1))^{n/log n} ≪ cpx_{1_P}(n)`"*, with their footnote 11
  adding that Dickson's conjecture would serve instead. Both upper bounds are
  Tao's, by private correspondence.

**That split is the wall in dynamical coordinates, and it is published.** The
orbit closure already carries the complexity unconditionally; what needs the
tuples conjecture is the prime SEQUENCE itself attaining it. The twin case is
the `k = 2` instance of the conditional half. It is one class per prime, and the
two-class analogue is not in print. UNCONFIRMED whether anyone has written it.

## 6. The one live import: Granville–Kurlberg's open averaged hypothesis

**This is the finding with a future, and it is not ergodic theory.**

### 6.1 The owning convention, found and confirmed

Granville and Kurlberg, *Poisson statistics via the Chinese Remainder Theorem*,
Adv. Math. **218** (2008) 2013–2042 (arXiv:math/0412135). Setup, verbatim:
*"Suppose that for each prime p we are given a subset `Ω_p ⊂ Z/pZ`. For q a
squarefree integer, we define `Ω_q ⊂ Z/qZ` using the Chinese remainder theorem
… `s_q = q/|Ω_q|`."* Arbitrarily many classes per prime. That is the twin comb
exactly, with `Ω_p = Z/pZ \ {0, −2}`.

**Theorem 1, verbatim** (read at source): *"Suppose that we are given subsets
`Ω_p ⊂ Z/pZ` for each prime p. For each integer k, assume that
(1) `N_k(h, Ω_p) = r_p^k · p (1 + O_k((1 − r_p) p^{−δ}))` provided that
`0, h_1, h_2, …, h_{k−1}` are distinct mod p. If `s_p = p^{o(1)}` for all primes
p, then the spacings between elements in the sets `Ω_q` become Poisson
distributed as `s_q → ∞`."*

They recover the one-class case from it, and the source there is **Hooley 1965**
(*On the difference between consecutive numbers prime to n*, II, Publ. Math.
Debrecen **12** (1965) 39–49; III, Math. Z. **90** (1965) 355–364), not
Montgomery–Vaughan. Montgomery–Vaughan, Ann. of Math. **123** (1986) 311–333,
settles Erdős's moment conjecture; it is not a limit law. The corpus cites
Montgomery–Vaughan in four places and **cites neither Hooley 1965 nor
Granville–Kurlberg anywhere** (checked: "Kurlberg" appears in no corpus
document).

### 6.2 The comb's exact local counts (PROVEN, VERIFIED)

> **Lemma C.** For `Ω_p = Z/pZ \ {0, −2}` and `0, h_1, …, h_{k−1}` distinct mod
> `p`, write `m(h) = #{i : h_i + 2 ∈ h}`. Then exactly
> `N_k(h, Ω_p) = p − 2k + m(h)`, and `0 ≤ m ≤ k − 1`.

*Proof.* `n + h_i ∈ Ω_p` for all `i` forbids `n ∈ {−h_i} ∪ {−h_i − 2}`. The
`−h_i` are distinct and so are the `−h_i − 2`; the only coincidences across the
two families are `−h_i − 2 = −h_j`, that is `h_j = h_i + 2`. QED

**VERIFIED** against brute force at 99 668 shift vectors, `k = 2, 3, 4`, primes
5 to 113, no mismatch.

### 6.3 Hypothesis (1) fails for the comb and holds for the reduced residues

The requirement is `|ε_k(h,p)| ≪_k (1 − r_p) p^{−δ}`, so the ratio
`max_h |ε| / (1 − r_p)` must decay like `p^{−δ}`.

| `k` | `p` | two-class `max|ε|` | `/(1−r_p)` | one-class `max|ε|` | `/(1−r_p)` |
|---|---|---|---|---|---|
| 2 | 101 | 9.8969e−3 | 4.9980e−1 | 1.0000e−4 | 1.0100e−2 |
| 2 | 10007 | 9.9930e−5 | **5.0000e−1** | 9.9880e−9 | 9.9950e−5 |
| 2 | 1000003 | 1.0000e−6 | **5.0000e−1** | 9.9998e−13 | 9.9998e−7 |
| 3 | 1000003 | 2.0000e−6 | **1.0000e+0** | 3.0000e−12 | 3.0001e−6 |
| 4 | 1000003 | 3.0000e−6 | **1.5000e+0** | 6.0001e−12 | 6.0001e−6 |

The two-class column is **flat** across five orders of magnitude in `p`, so no
`δ > 0` works: **hypothesis (1) FAILS for the twin comb**. The one-class column
falls like `1/p`, so `δ = 1` works: it **HOLDS for the reduced residues**, which
is Granville and Kurlberg recovering Hooley.

**The offset 2 is not what does it.** Brute force over all `h` with two deleted
classes at common difference `d = 2, 4, 30` gives numbers identical to the last
digit, because `a ↦ a + d` is a `p`-cycle for every `d` coprime to `p`. Three
deleted classes are worse (ratio 1.3336 at `k = 3`). **Theorem 1 covers exactly
the dense one-class case**, and the comb is not a near miss.

### 6.4 The averaged form holds for the comb, with a factor `p` to spare

Granville and Kurlberg's own weakening, verbatim: *"perhaps it suffices to
simply assume an averaged form of (1), like
`p^{−(k−1)} Σ_h |N_k(h,Ω_p)/(r_p^k p) − 1| ≪_k (1 − r_p) p^{−δ}` … **We have
been unable to prove this as yet.**"*

Since `a ↦ a + 2` is a single `p`-cycle, a `k`-subset `h` has `m(h) = k − j` with
`j` its number of blocks of cycle-consecutive elements, and the number with `j`
blocks is `(p/j)·C(k−1, j−1)·C(p−k−1, j−1)`. Rotation is transitive and
preserves `m`, so that distribution is also the distribution over `h` containing
0, and the averages are **exact**:

| `k` | `p` | avg `|ε|` | `avg/(1−r_p)` | `× p` |
|---|---|---|---|---|
| 2 | 10007 | 5.9926e−8 | 2.9984e−4 | 3.000 |
| 2 | 1000003 | 6.0001e−12 | 3.0001e−6 | 3.000 |
| 3 | 1000003 | 1.8000e−11 | 9.0000e−6 | 9.000 |
| 4 | 1000003 | 3.6000e−11 | 1.8000e−5 | 18.000 |

`avg/(1−r_p) = 3C(k,2)/p` exactly to the printed digits, so the averaged
hypothesis holds at every `δ < 1`.

### 6.5 What this buys, priced honestly

**It buys a named external open problem whose resolution delivers a theorem
about the comb, and it does not touch `G₂`.** Poisson spacings is a statement
about the empirical distribution of gaps at the scale of the mean spacing `m̄`.
It would put the corpus's max-gap model on a proved footing at the typical
scale. It would **not** bound `G₂`, because a maximum over `D ≈ e^{θ(x)}` gaps is
not determined by any finite-order local statistic; `maxgap-law.md` §5 already
prices exactly that distance, and the missing factor there is a `log`, not a
distributional limit.

## 7. Verdict table

| import | verdict | what it buys |
|---|---|---|
| unique ergodicity of the Mirsky-type measure | **IN PRINT and VACUOUS.** Trivial at finite level (periodic orbit); in the limit the measure is `δ_{0^Z}` (Araújo, `ν_R = δ_∅`) | nothing. The full-period average is already exact by CRT, and Assumption A lives at `x′²/x# → 0` of the period |
| entropy of the comb subshift | **COMPUTED: 0**, in all four readings. The nondegenerate cousin `{n : p² ∤ n(n+2)}` has entropy 0.223633274851 nats and is covered by Araújo Part II Cor. 6.23 | a new number for an object that is not the corpus's. The by-product `R_x` is new, and closes its own route |
| the complexity reformulation `R_x < x′² − 3 ⟹ Zone Postulate` | **REFUTED as a route**, at `x = 11, 13, 17, 19` | it is strictly stronger than the target by Lemma B and already false |
| tautness | **FAILS by definition** (Behrend sets are never taut) | nothing |
| heredity | **TRUE and VACUOUS.** Proximal + primitive gives it (Keller 2021); directly, `X_η` is two orbits | it does not upgrade "every conspiracy occurs": that is a statement inside one period, and `p_x(n) ≪ 2^n` refutes the word-level form |
| Poisson spacings via Granville–Kurlberg Theorem 1 | **BLOCKED BY hypothesis (1)**, which fails by `p^δ` on shift vectors carrying the comb's own difference | — |
| the complexity of the limit twin-admissible subshift | **COMPUTED, exactly, to `n = 60`** (§3.3). `cpx(60) = 1441`, exponent 0.4963 and falling; one-class control 0.9719, inside the published band | the first number the corpus has for this object, a quantitative refutation of "every conspiracy occurs" at word level (`cpx(60)/2⁶⁰ = 1.250e−15`), and a complexity-side reading of the dimension-2 penalty (`cpx₁/cpx₂ = 430.8319` at `n = 52`) |
| Granville–Kurlberg's averaged hypothesis | **LIVE, EXTERNAL, OPEN.** Holds for the comb with a factor `p` to spare | a proof of their stated open problem delivers Poisson gap statistics for the level-x twin comb. It does not deliver `G₂` |

## 8. Corrections and additions to the record

Proposals only; no live document was edited.

1. **`SEARCH-CONVENTIONS.md` §1 gains two rows.** For "gap statistics of the
   level-x comb", the owning convention is **"Poisson spacings for CRT-defined
   subsets"** (Granville–Kurlberg, Adv. Math. 218 (2008) 2013–2042), and for the
   one-class limit law it is **Hooley 1965 II and III**, not Montgomery–Vaughan.
   For the comb's dynamics it is **"Erdős sieves"** (Araújo, arXiv:2602.24031 and
   2602.24034), a coinage from February 2026 that no B-free or twin-comb wording
   reaches. Two house terms need translation entries: comb → *sieve `R` over `Z`
   with `|R_p| = 2`*; the limit comb → *a Behrend / non-Erdős sieve*.
2. **`PRIOR-ART.md` gains the B-free line.** It is currently absent from the
   corpus entirely (the string "Sarnak" appears nowhere). The line to add is that
   the dynamics of two-class sieves is in print as of February 2026 and excludes
   our regime by name.
3. **`paper/variance-note.md` and `PRIOR-ART.md` cite Montgomery–Vaughan for
   distributional statements.** The distinction worth carrying: Montgomery–Vaughan
   is moments, Hooley 1965 is the limit law. Neither is two-class.
4. **`REFUTED.md` gains one row**: "the word-complexity reformulation of the
   Zone Postulate — REFUTED — `R_x ≥ G₂ − 1` makes it strictly stronger, and it
   already fails at `x = 11, 13, 17, 19` — 2026-08-19 — `history/staging/import-bfree.md` §3.2".

## 9. What this does not show

- **Nothing here is a bound on `G₂`, and nothing here is a step toward one.**
  The `R_x` route is closed, the ergodic route is vacuous, and the live route
  (§6) reaches typical gaps rather than the maximum.
- **The Araújo papers are six months old and unrefereed as far as this run
  could tell.** Their Corollary 6.23 and the `δ_∅` remark were re-read at source
  in the arXiv HTML by this pass, not only by the reconnaissance pass, and both
  are verbatim. No journal version was located. Treat the framework as real and
  the theorem numbers as provisional.
- **What was independently re-verified at source by this pass, and what was
  not.** Re-verified: Granville–Kurlberg's Theorem 1 and their averaged-form
  paragraph including *"We have been unable to prove this as yet"*; Araújo's
  `δ_∅` passage, his twin `R`-free sentence and his degree-≤ 3 corollary;
  Kasjan–Lemańczyk–Zuniga Alterman Theorem 1.1 equations (7), (8), (9) and
  footnote 11. Not re-verified, and carried on the reconnaissance pass's reading
  alone: every citation in §2.2 and §5.1 to DKKL, KKL, Keller and Peckner, and
  Sarnak's Theorem 8(ii).
- **`R_x` was computed to `x = 19` only.** The ratio `R_x/x′²` is not monotone
  over the seven levels (2.5429 at 17, 2.0756 at 19), so the growth rate is not
  established; what is established is that the route fails at four consecutive
  levels, which is enough to close it and not enough to describe it.
- **§6.3 and §6.4 are exact statements about the comb's local counts, not about
  Granville–Kurlberg's proof.** Their Theorem 12 is stated as stronger and more
  explicit than Theorem 1 and was not read. It is possible their machinery
  survives the failure of (1) in a form this note did not check.
- **The heredity mechanism was priced from a description of DKKL §5, not from
  the paper's own pages.** The propositions and the `(T_her)` condition were
  reported at source by the reconnaissance pass; they were not independently
  re-read here.
- **`sd/mbar` and the autocorrelations in §5.2 are one-tile statistics** at
  `x ≤ 19`, populations 135 to 378 675. They are consistent with `H″` and they
  are not a test of it at the scale `H″` is stated for.

## 10. NOT REACHED

- **A PROOF of anything in §3.3.** The complexity function is computed exactly
  to `n = 60`; no asymptotic is derived, and the two-class analogue of
  Kasjan–Lemańczyk–Zuniga Alterman Theorem 1.1 — two-sided bounds of the form
  `c^{n/log n}` for the twin-admissible subshift — is not proved here. Their
  upper bound is Tao's counting argument for admissible sets and it plausibly
  transfers; the lower bound is conditional on Hardy–Littlewood in the one-class
  case and would be conditional on the twin-tuples statement here, which is the
  target itself. That circularity should be checked before the route is opened.
- **The owning-convention search has now been run** (2026-08-19,
  `history/staging/klz-forward-walk.md`): the convention is Wilson's
  prime-pattern family (A023189–A023192, A035326), the one-class column IS
  A023192, and the two-class sequence returns nothing at three indexings on a
  channel calibrated by A023192 in the same minutes. Residue: MathSciNet,
  zbMATH, and the published Acta text (all quotes here are from arXiv v1, so
  equation numbers may differ in print).
- **The tameness question.** No treatment of tameness in the B-free literature
  was found, and "not found" is not "absent".
- **Araújo Part II's spectrum computation** (Theorem 1.4, an ergodic rotation on
  `∏ O_K/F(R_b)` with computed spectrum) was not evaluated for our sieve. If it
  degenerates the same way, that should be stated; if it does not, the comb has
  a computable spectral invariant nobody has written down.
- **Whether the averaged Granville–Kurlberg hypothesis is provable for the comb
  specifically.** §6.4 verifies the hypothesis holds; it does nothing toward
  proving their theorem under it, which is where the work is.
- **`R_x` at `x = 23` and beyond.** `23# = 223 092 870` and the refinement is
  `O(x# · R_x)`; level 19 took 394 s and level 23 would take roughly 10 hours at
  the same rate. A suffix-array route would make it minutes and was not built.
- **The two-class square-free cousin's own gap and complexity structure.** Its
  density and entropy are computed here; nothing else about it is.

## 11. Reproduction

```
node research/import-bfree-01-toeplitz.js                 # levels 3..17, ~6 s
BIG=1 node research/import-bfree-01-toeplitz.js           # adds level 19, ~529 s
node research/import-bfree-02-poisson-hypothesis.js       # ~54 s
node research/import-bfree-03-admissible-complexity.js    # ~49 s
```

Both scripts carry formally embedded output
(`node research/qc/embed.js --streams both …`; script 01 is embedded with
`--env BIG=1 --node-flag --max-old-space-size=6000`). Script 01's Stage A
aborts if the limit comb is anything other than `{−1}`; script 02's Stage A
aborts if the closed form for `N_k` disagrees with brute force anywhere; script
03's Stage A aborts if its closure engine disagrees with the level-x refinement
or if `c_x(n)` is not monotone in `x`.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
