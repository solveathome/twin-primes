# import-transference — the transference principle and relative Szemerédi theory, graded: VOCABULARY-ONLY, and the field's own founding paper names our pattern as out of scope in one printed sentence

<!-- ledger
id: Q-import-transference
status: CLOSED
todo: none
question: Does the transference principle and relative Szemeredi theory reach the twin pattern?
verdict: VOCABULARY-ONLY and closed by an exclusion in print: the founding paper names our configuration as out of scope in one printed sentence, the theorem degenerates at k = 2 which is the case we want, and the W-trick removes the tile before the argument starts; re-entry costs a finite-complexity system whose solvability implies the Zone Postulate.
-->

*(Staging note, 2026-08-27. Nothing here is integrated into a live document and
**no existing repo file was edited, moved or deleted**. No git command was run.
One producer was written; it lives in the session scratchpad, is not embedded,
is not `qc`-gated and is not a repo number, so every figure it produced is
marked `[SCRATCHPAD-GRADE]` per the `attack-lichtman-decomp.md` §0 precedent.
Every quotation below was read this session at a page image or an authors'
hosted full text; the artifacts and their sha256 are in §8. Calibration marked
per claim: PROVEN, MEASURED, SCRATCHPAD, SOURCED, SOURCED-BIB,
ABSENT-PER-CONVENTION, NOT REACHED.)*

**Gate outcome, stated first because the brief made it the deliverable.**
The structural gate returned **VOCABULARY-ONLY**, so per `research/IMPORT-MAP.md`
§0 the route stops before any route-testing experiment and **no row enters
`IMPORT-MAP.md`**. It enters the rejection table of
`history/staging/import-map-construction.md` §1 instead, as candidate thirteen.
The one computation that did run is not a route test — it is the quantification
the brief asked for and the closure needs, and it is scratchpad-grade.

**Numeric confidence, per claim, before the working.**

| claim | confidence | what would falsify it | has that check run? |
|---|---|---|---|
| the twin pattern is **infinite** complexity in Green–Tao's sense, not complexity 0 | **0.99** | a printed Green–Tao statement assigning it a finite `s` | yes — read at the Annals page image, §2.1; the opposite is printed |
| no transference/relative-Szemerédi theorem in this family has a `k = 2` fixed-shift case | **0.97** | such a theorem, in print | partial — CFZ Thm 2.4 read at source, `k ≥ 3` in the quantifier; the family was not exhaustively swept |
| relative density of twin slots inside the tile's holes is `∏_{2<p≤x}(1 − 1/(p−1)) ~ 0.7413085/ln x` | **0.98** (arithmetic), SCRATCHPAD-GRADE (numbers) | a re-derivation inside an embedded producer disagreeing | no — the producer is scratchpad-only |
| the density hypothesis of CFZ Thm 2.4 quantifies `δ` before `ε` and `c` | **0.95** | the published GAFA text quantifying otherwise | partial — ar5iv full text, not the GAFA page image |
| the tile is precisely what the `W`-trick deletes, so transference cannot be *posed on* the tile | **0.90** | a transference argument that keeps the small-prime bias | no exhaustive sweep; one 2023 paper's §4.1 read at source |
| the route closes, and the whole family closes with it | **0.93** | a finite-complexity reformulation of the twin question that is not itself TPC-strength | no — §6 states the one escape and prices it |
| `u = 2` has anything to do with Gowers complexity | **0.02** | a printed statement linking sifting depth to complexity `s` | searched, §7; nothing found, and the numerals index different objects |

---

## 0. The verdict, disconfirming half first

**Six things go against this run, and they are stated before anything it found.**

1. **The brief's central framing is inverted, and correcting it is the main
   deliverable.** The brief proposed that "the twin-prime pattern is complexity
   0 … precisely the regime where the Gowers norms carry no information", and
   proposed installing that sentence in `paper/wall-note.md` as a
   WALL-ADDRESS. **It is wrong at source, in the exact opposite direction.**
   Green–Tao, *Annals* 171 (2010), p. 1760, Examples 1, verbatim: *"The system
   `Ψ(n₁) := (n₁, n₁+2)`, which counts twin primes, has infinite complexity."*
   And, in the same paragraph, *"More generally, any system with `d = 1` and
   `t > 1` has infinite complexity."* Complexity **0** is the opposite end and
   is the easy case: p. 1760, *"The system `Ψ(n₁,…,n_d) := (n₁,…,n_d)`, which
   counts `d`-tuples of independent primes, has complexity 0"*, and the
   abstract, p. 1753, *"The case `s = 0` is somewhat degenerate, and follows
   from the prime number theorem in APs."* Had the brief's sentence been
   written into `wall-note.md` it would have installed a false address **and**
   a search convention that leads to the PNT-in-APs literature. §2.1.

2. **The result was known and the value is only the mechanism.** The brief said
   so, and it holds: nothing here moves an exponent, a constant, a certificate
   or a bound. The row banks CLOSURE, a WALL-ADDRESS, a PUBLISHED-ANCHOR and
   two SEARCH-CONVENTIONS rows, and nothing else.

3. **The route does not even reach the density hypothesis the brief expected it
   to die on.** It dies earlier, twice, and the density failure is the *third*
   thing wrong with it, not the first. Leading with density would have left
   two escapes open that are in fact shut (§6). The brief's expectation was
   directionally right and structurally misordered.

4. **The one place the tile looked like an advantage is the place it is
   disqualified.** The brief hoped the tile's *exactly computable* correlation
   structure would beat the estimated one. The tile's two-point correlation at
   the twin shift is exactly computable and its exact value is
   `2∏_{2<p≤x}(1 − 1/(p−1)²) → 2C₂ = 1.3203241` `[SCRATCHPAD]`, never
   `1 + o(1)`. The exactness is real and it is the obstruction, not the tool:
   the number that is computable is the singular series, and the singular
   series being ≠ 1 is the entire arithmetic content of the twin problem. §4.2.

5. **The row is adjacent to two already-rejected rows and must not be counted
   as new evidence about them.** `hypergraph containers` and `ℓ² decoupling`
   are both VOCABULARY-ONLY in `import-map-construction.md` §1. Conlon–Fox–Zhao's
   proof of the relative Szemerédi theorem runs through the **hypergraph removal
   lemma**, one step from the container rejection. This row is structurally
   distinct — it is rejected for a different reason (the *pattern* is outside
   the theorem, and the *ambient* is what the machine deletes), not for the
   containers' reason (no independent-set formulation, no supersaturation
   input) — but it lands at the same grade, which is weak confirmation of that
   neighbourhood's pricing and nothing more.

6. **Two verification gaps are open and are not papered over.** The CFZ
   statement was read at ar5iv full text, **not** at the GAFA page image
   (`[SOURCED]`, ambient not publisher). The `k ≥ 3` claim is a reading of one
   theorem plus the abstracts of two others; the family was **not** swept
   exhaustively for a `k = 2` fixed-shift variant, and §5's argument for why
   none can exist is elementary rather than a search result.

**What this run banks, in five flat statements.**

- **(T1)** The twin pattern has **infinite** Cauchy–Schwarz complexity, in
  print, with the mechanism printed alongside it (Green–Tao Lemma 1.6: two
  affinely related forms cannot be separated by any partition, so Cauchy–Schwarz
  can never isolate one from the other). Every `d = 1, t > 1` system is
  covered, which is every pattern this programme targets, the prime tuples
  conjecture included. §2.
- **(T2)** The relative Szemerédi theorem **degenerates to Cauchy–Schwarz at
  `k = 2`**: the conclusion `E_{x,d}[f(x)f(x+d)] ≥ c` is `(E f)² ≥ δ²`, true and
  empty, and it averages over the shift `d`, which is exactly where all the
  arithmetic of the twin problem lives. There is no `k = 2` theorem to import
  because the `k = 2` statement carries no information. PROVEN, one line. §5.
- **(T3)** Relative density of twin slots inside the tile's holes, exactly:
  `δ(x) = ∏_{2<p≤x} (p−2)/(p−1)`, with `δ(x)·ln x → 2C₂e^{−γ} = 0.7413085`.
  Measured convergence `0.719571` at `x = 79` to `0.741172` at `x = 199999`
  `[SCRATCHPAD]`. In the tile's own ambient this reads `δ ~ 0.7413/lnln W`,
  which is an **exponential improvement** over the integer problem's
  `2C₂/ln N = 1.3203/ln N`, and it is still `0`, so the hypothesis of CFZ
  Theorem 2.4 — `δ` fixed, quantified before `ε` and `c` — still fails. §3.
- **(T4)** The `W`-trick's first move is to delete the tile. Bienvenu–Shao–
  Teräväinen, arXiv:2106.09001v2 §4.1, verbatim: *"an initial problem is that
  the indicator functions of almost twin primes are not bounded by a
  pseudorandom majorant, as they are **biased modulo small primes**. We will
  first have to **remove these biases modulo small primes** to obtain a
  pseudorandomly majorized function."* The bias modulo small primes **is** the
  tile. Transference cannot be posed *on* the tile because its opening step is
  to quotient the tile away. §4.1. This is the same shape as
  `attack-bilinear-transplant.md`'s (N1) — periodicity is the disqualifier in
  both — reached from a different technology, which is the only thing that
  makes the two readings mutually informative.
- **(T5)** A PUBLISHED-ANCHOR the corpus did not have, from the transference
  paper itself, on the constant the corpus is fighting. Green–Tao, *Annals*
  171 (2010), p. 1830, on their own Theorem D.3, verbatim: *"Thus we can use
  Theorem D.3 to obtain upper bounds for the expression (1.7) which lose a
  multiplicative factor of `(c_{χ,2}/χ(0)²)^t`, which is independent of `N`.
  … As is well-known there are significant barriers (the "parity problem") to
  reducing this multiplicative loss to something approaching 1."* Green and Tao
  reach the twin **upper** bound with a `Λ²`-type weight, lose exactly a
  multiplicative constant, and name the parity problem as the barrier to
  driving it to 1. That is `paper/wall-note.md`'s Face 4 and Lichtman's
  `3.29956`, written into the founding transference paper's appendix. §4.3.

---

## 1. The grade

**(a) Structural fit: VOCABULARY-ONLY.**

By `IMPORT-MAP.md` §0's definitions, in order.

*Not EXACT-IDENTITY.* The candidate identification would be "the tile's hole
indicator, normalised, **is** a pseudorandom majorant." It is not, on two
counts, either of which alone is fatal. First, the linear forms condition
(Green–Tao Definition 6.2) is a hypothesis of the form
`E_n[∏_i ν(ψ_i(n))] = 1 + o(1)`, which for a `W`-periodic `ν` fails at the
shift `W` by the factor `W/φ(W)` — `5.847132` at `x = 19`, `8.035259` at
`x = 79` `[SCRATCHPAD]` — because `ν(n)ν(n+W) = ν(n)²` identically and
`E[ν²] = W/φ(W)`. Second, and more to the point, the object is *defined* by
its exact periodicity, and periodicity is what the hypothesis forbids.

*Not STRONG-ANALOGY.* That grade requires "a named theorem transfers with one
stated modification, which the row names." No named theorem in this family
transfers with any number of stated modifications, because the conclusion of
every one of them is a count of a **finite-complexity** configuration and the
twin pattern is printed as infinite complexity. There is nothing to modify;
the target is outside the quantifier.

*VOCABULARY-ONLY.* The coinciding words are **pseudorandom**, **density**,
**majorant**, **sieve** and **correlation condition**, and each names a
different object here than there. The mathematics does not coincide.

**Per the map's regrade rule, re-entry costs new structural evidence** — a
statement of the form "the moiré object is the foreign object, here is the
identification". For this field that means exhibiting a **finite-complexity**
system whose solvability implies the Zone Postulate, which §6 prices.

**(b) Circularity pre-check: CLEAN**, and the reasoning matters more than the
verdict. The payoff sought is CLOSURE + WALL-ADDRESS + PUBLISHED-ANCHOR — a
finite reading of printed statements — and needs no hypothesis of any strength,
so it cannot be circular. The *route's* hypothesis, had it been pursued, would
have been **TPC-STRENGTH at best**: any transference statement whose conclusion
is `E_n[f(n)f(n+2)] > 0` for `f` majorized by a prime majorant **is** the twin
prime conjecture, not a step toward it. This is the fifth wrong-direction
arrival the corpus has logged (after the `L = 1` residue count, `H″` at `m = 1`
and `m = 2`, and any constant bound on `δ` — `REFUTED.md` rows 64, 65, 66),
and it is worth naming as the same failure mode: *the transferred conclusion
at `k = 2` is the postulate.*

**(c) Payoff type: CLOSURE + WALL-ADDRESS + PUBLISHED-ANCHOR.** No THEOREM,
no DERIVED-CONSTANT. The three constants in this note (`0.7413085`,
`1.3203241`, `8.035259`) are all classical and none is derived here; they are
re-computed to place our object against the hypothesis, which is a
quantification and not a derivation.

**Cost, before the run: 4 h. Actual: one session, one scratchpad producer, six
sourced artifacts.**

---

## 2. The pattern is outside the theorem, and the paper says so

### 2.1 The complexity assignment, read at the page image

Green–Tao, *Linear equations in primes*, **Annals of Mathematics 171 (2010)
1753–1850**, downloaded and read this session (§8 artifact `A1`).

**Definition 1.5 (Complexity), p. 1759–1760, verbatim:**

> Let `Ψ = (ψ₁,…,ψ_t)` be a system of affine-linear forms. If `1 ⩽ i ⩽ t` and
> `s ⩾ 0`, we say that `Ψ` has `i`-complexity at most `s` if one can cover the
> `t−1` forms `{ψ_j : j ∈ [t]\{i}}` by `s+1` classes, such that `ψ_i` does not
> lie in the affine-linear span of any of these classes. The complexity of the
> `Ψ` is defined to be the least `s` for which the system has `i`-complexity at
> most `s` for all `1 ⩽ i ⩽ t`, or `∞` if no such `s` exists.

**Examples 1, p. 1760, verbatim** (three sentences, in the order printed):

> The system `Ψ(n₁,…,n_d) := (n₁,…,n_d)`, which counts `d`-tuples of
> independent primes, has complexity 0 …
>
> For any `k ⩾ 2`, the system `Ψ(n₁,n₂) := (n₁, n₁+n₂, …, n₁+(k−1)n₂)`, which
> counts arithmetic progressions of primes of length `k`, has complexity `k−2` …
>
> The system `Ψ(n₁) := (n₁, n₁+2)`, which counts twin primes, has infinite
> complexity. So too does the system `Ψ(n₁) := (n₁, N−n₁)`, which counts pairs
> of primes which sum to a fixed number `N`, as well as `Ψ(n₁) = (n₁, 2n₁+1)`,
> which counts Sophie Germain primes. **More generally, any system with `d = 1`
> and `t > 1` has infinite complexity.**

`[SOURCED, verbatim, at page image]`

**The last sentence is the closure of the whole family in one line.** Every
configuration this programme targets — twin slots, prime pairs at a fixed even
shift, admissible `k`-tuples at fixed offsets — is a `d = 1, t > 1` system.
There is no member of the target family that is finite complexity.

**Lemma 1.6 and its proof, p. 1761, verbatim** (the mechanism, and it is one
sentence):

> If two of the forms `ψ_i` and `ψ_j` are affinely related, then it is not
> possible for the `i`-complexity to be finite, as `ψ_i` will lie in the affine
> span of any collection of forms which contain `ψ_j`.

**Remark after Lemma 1.6, p. 1761, verbatim:**

> It asserts that the infinite complexity systems are precisely those which
> encode a "binary" problem such as the twin prime, Goldbach, Sophie Germain,
> or prime tuples conjectures.

**p. 1764, verbatim:**

> The only unresolved case of the generalised Hardy-Littlewood conjecture would
> then be the presumably very hard "binary" or "infinite complexity" case in
> which two or more of the forms are affinely related.

**§6, after Definition 6.2, p. 1780, verbatim:**

> One should compare this condition with the much more difficult prime tuples
> conjecture, which is part of the "infinite complexity" case `d = 1, t > 1` of
> the generalised Hardy-Littlewood conjecture.

`[SOURCED, verbatim, at page image]` for all four.

### 2.2 The correction this forces on the brief, stated plainly

The brief's proposed WALL-ADDRESS sentence — "the twin pattern's complexity is
below the range the technology sees" — is **REFUTED at source**. The three
things it gets wrong:

| the brief says | the source says | where |
|---|---|---|
| twin pattern is complexity 0 | twin pattern is complexity `∞` | Annals 171, p. 1760 |
| complexity 0 is where Gowers norms carry no information | complexity 0 "follows from the prime number theorem in APs"; it is the trivial case | Annals 171, p. 1753 (abstract), p. 1760 |
| the pattern is *below* the range the technology sees | the pattern is *outside* the quantifier at the top end; the technology's range is `s < ∞` and the pattern's `s` is `∞` | Definition 1.5 + Lemma 1.6 |

The corrected sentence, and the proposed live-doc text, is in §9.

**Why this correction has search value and not only cosmetic value.** "Complexity
0" is a live phrase in this literature and it names the *easy* case. Searching
the owning convention with the brief's phrasing returns Siegel–Walfisz,
Bombieri–Vinogradov and the primes-in-AP literature — a clean, calibrated,
completely worthless negative, which is exactly the failure mode
`research/SEARCH-CONVENTIONS.md` was written to prevent. The phrases that own
this obstruction are **"infinite complexity"**, **"binary" system**,
**"affinely related forms"**, and **"non-translation-invariant configuration"**.
A SEARCH-CONVENTIONS row is drafted in §9.

---

## 3. The density hypothesis, quantified for our object

### 3.1 The theorem's hypothesis, quoted, with its quantifier order

Conlon–Fox–Zhao, *A relative Szemerédi theorem*, **GAFA 25 (2015) 733–762**
= arXiv:1305.5440, **Theorem 2.4**, read at the authors'/ar5iv full text this
session `[SOURCED — full text, not the GAFA page image]`:

> For every `k ≥ 3` and `δ > 0`, there exists `c > 0` such that if
> `ν : Z_N → R_{≥0}` satisfies the `k`-linear forms condition, `N` is
> sufficiently large, and `f : Z_N → R_{≥0}` satisfies `0 ≤ f(x) ≤ ν(x)` for all
> `x ∈ Z_N` and `E[f] ≥ δ`, then
> `E[f(x)f(x+d)f(x+2d)⋯f(x+(k−1)d) | x, d ∈ Z_N] ≥ c`.

Two features of the quantifier decide the row.

- **`δ` is chosen before `c` and before the pseudorandomness parameter.** There
  is no version of this statement in which `δ` is allowed to depend on `N`.
  This is what "positive relative density" means in the family's own phrasing;
  the CFZ abstract's improvement is to the **ambient** sparsity (they reach
  pseudorandom sets of density `N^{−c_k}`), never to `δ`.
- **`k ≥ 3`.** §5.

### 3.2 Our object's relative density, exactly, and its rate

The tile at level `x` is `Z/W`, `W = x#`. Holes = `φ(W) = ∏_{p≤x}(p−1)`. Twin
slots = `#{n mod W : n(n+2) coprime to W} = ∏_{2<p≤x}(p−2)` (the `p = 2` factor
is `1`, not `0`, since only `n` odd is required). So the relative density of
twin slots inside the holes is, exactly,

> **`δ(x) = ∏_{2<p≤x} (p−2)/(p−1) = ∏_{2<p≤x} (1 − 1/(p−1))`.**

PROVEN (elementary CRT count). Its rate follows from Mertens plus the twin
constant:
`δ(x) = [∏(1−2/p)] / [∏(1−1/p)] = C₂·∏_{2<p≤x}(1−1/p)·(1+o(1)) ~ 2C₂e^{−γ}/ln x`,
with `C₂ = ∏_{p>2}(1 − 1/(p−1)²) = 0.6601618…`. So

> **`δ(x) ~ 0.7413085/ln x` — decay `1/ln x`, constant `2C₂e^{−γ}`.**

Measured `[SCRATCHPAD-GRADE]`, session producer `transference-density.js`:

| `x` | holes `φ(x#)` | twin slots | `δ(x)` | `δ(x)·ln x` | `E[ν(n)ν(n+2)]` |
|---|---|---|---|---|---|
| 13 | 5 760 | 1 485 | 0.25781250 | 0.661276 | 1.34411621 |
| 19 | 1 658 880 | 378 675 | 0.22827148 | 0.672131 | 1.33473346 |
| 29 | 1 021 870 080 | 214 708 725 | 0.21011353 | 0.707514 | 1.33027679 |
| 41 | 4.41448e13 | 8.49924e12 | 0.19253111 | 0.714978 | 1.32694354 |
| 79 | 4.00440e33 | 6.59455e32 | 0.16468235 | 0.719571 | 1.32326536 |
| 1009 | — | — | 0.10680788 | 0.738760 | 1.32049019 |
| 99991 | — | — | 0.06436968 | 0.741078 | 1.32032469 |
| 199999 | — | — | 0.0607216 | 0.741172 | — |

against `2C₂e^{−γ} = 0.7413085` and `2C₂ = 1.3203241`. The convergence is clean
and monotone in both columns from `x ≈ 29` on.

### 3.3 The comparison the brief asked for, and it is the one favourable reading in the note

The tile's ambient parameter is `ln W = θ(x) ~ x`, so `ln x ~ lnln W` and

> **on the tile, `δ ~ 2C₂e^{−γ}/lnln W`, against `2C₂/ln N` for twin primes
> inside the primes up to `N`.**

Measured `δ·lnln W` `[SCRATCHPAD]`: `0.634149` at `x = 19`, `0.675211` at
`x = 41`, `0.700230` at `x = 79`, `0.733794` at `x = 1009` — converging to the
same `0.7413085`.

**This is a genuine, exponential-size structural difference between the tile
ambient and the integer ambient on precisely the hypothesis under test, and it
changes nothing.** The tile at `x = 79` carries relative twin density
`0.1646824`, which on the prime side would require `N ~ 3.03 × 10³`
`[SCRATCHPAD, asymptotic-formula extrapolation]` — the tile buys the density
hypothesis a factor `lnln` where the integers pay `ln`, and the hypothesis is
still a *fixed* `δ`, and `1/lnln W → 0`. To reach even `δ = 0.05` on the tile
takes `x ~ 2.75 × 10⁶`, and `δ = 0.01` takes `x ~ 1.57 × 10³²`
`[SCRATCHPAD, extrapolated from δ ~ c/ln x, not measured]`.

**So the density hypothesis does fail, exactly as the brief expected, at rate
`1/lnln W` on our object rather than `1/ln N` on the integers.** It is the
third-order reason the route dies, and §4 and §5 are the first two.

---

## 4. The ambient is what the machine deletes

### 4.1 The `W`-trick removes the tile before the argument starts

Bienvenu–Shao–Teräväinen, *A transference principle for systems of linear
equations, and applications to almost twin primes*, arXiv:2106.09001v2
(published *Algebra & Number Theory* 17 (2023) no. 2; **page range NOT
REACHED**), §4.1, verbatim:

> **4.1. `W`-trick.** We wish to apply Theorem 3.2 to prove our main theorem,
> but an initial problem is that the indicator functions of almost twin primes
> are not bounded by a pseudorandom majorant, as they are biased modulo small
> primes. We will first have to remove these biases modulo small primes to
> obtain a pseudorandomly majorized function.

`[SOURCED, verbatim]`

Their `W = ∏_{p≤w} p` is a primorial and the trick replaces `n` by `Wn + b`
with `(ψ_i(b) + h_j, W) = 1` for all `i, j`. **In this programme's vocabulary
that is: pick one twin-admissible slot of the tile at level `w`, rescale, and
throw the rest of the tile away.** The bias modulo small primes that the
`W`-trick exists to remove is, verbatim in our terms, the tile.

**Consequence, and it answers the brief's central question directly.** *Can a
transference argument be posed on the tile?* No — not because the tile is a bad
ambient, but because the machine's first step is to quotient the tile out and
work on the rescaled residue class. There is no version of the argument that
runs *inside* the periodic structure; the periodic structure is the input the
argument normalises away. Confidence 0.90; the gap is that this is one paper's
§4.1 plus Green–Tao §5, not an exhaustive sweep of the family.

**This is the same finding as `attack-bilinear-transplant.md`'s (N1), reached
from a different technology.** There: *"The tile side of the frame is Type-I by
construction, and the mechanism is periodicity plus the absence of any signed
prime-detecting weight."* Here: the tile side cannot host a pseudorandom
majorant, and the mechanism is periodicity. Two independent machines, one
disqualifier. That is worth one sentence in the corpus and no more than one:
**periodicity is what makes the tile exactly computable and it is what
disqualifies the tile from both parity-relevant technologies.**

### 4.2 The exact correlation is the obstruction, not the tool

The brief's best hope was that the tile's correlations, being exactly
computable rather than estimated, would satisfy the linear-forms/correlation
conditions where an estimated majorant only nearly does. Work it out.

Take the tile's own majorant, `ν(n) = (W/φ(W))·1_{(n,W)=1}`, `W = x#`, so
`E[ν] = 1`. Then, exactly,

> `E[ν(n)ν(n+2)] = (W/φ(W))² · (1/W)·#{n : n(n+2) coprime to W}`
> `= 2·∏_{2<p≤x}(1 − 1/(p−1)²) → 2C₂ = 1.3203241…`

PROVEN (elementary), values in §3.2's last column `[SCRATCHPAD]`: `1.3441` at
`x = 13`, `1.3233` at `x = 79`, `1.320325` at `x = 99991`. **It is never
`1 + o(1)`; it converges to the twin-prime singular series.**

Two readings of that, and the second is the correct one.

- The naive reading — "the majorant violates the linear forms condition" — is
  **wrong as stated**. Green–Tao's Definition 6.2, p. 1779–1780, quantifies the
  condition over **finite complexity systems only**, verbatim: *"given
  `1 ⩽ d ⩽ d₀`, `1 ⩽ t ⩽ m₀`, and any finite complexity system
  `Ψ = (ψ₁,…,ψ_t)` of affine-linear forms on `Z^d` with all coefficients of `Ψ̇`
  bounded in magnitude by `L₀`, we have `E_{n∈Z_{N'}^d}[∏_{i∈[t]} ν(ψ_i(n))] =
  1 + o_{m₀,d₀,L₀}(1)`."* `[SOURCED, verbatim]` The twin system is `d = 1,
  t = 2` and infinite complexity, so it is not in the quantifier and there is
  no violation.
- The correct reading: **to run the argument for twins you would have to
  strengthen the hypothesis to cover our pattern, and the strengthened
  hypothesis is false — by exactly `2C₂`.** And its falsity is not a defect of
  the majorant that a better majorant could repair. `E[ν(n)ν(n+2)] = 2C₂ ≠ 1`
  is the statement that twin slots are *not* independent coordinates, which is
  the whole arithmetic content of the twin problem. **A majorant for which the
  strengthened condition held would be a majorant in which twins are the random
  count, and there would be nothing left to prove.**

So exact computability is real and it computes the obstruction. The tile does
not sit on a different side of this hypothesis; it sits on the same side, and
knows the number to arbitrary precision.

*(Consistency check, worth recording: `2C₂ = 1.3203241` here is the same
constant as import-map row 14's `C_{2,H} = 2∏p(p−2)/(p−1)² ≈ 1.32032363`,
reached by a different route. Agreement to 7 digits `[SCRATCHPAD]`.)*

### 4.3 The anchor the transference paper carries on our constant

Green–Tao, *Annals* 171 (2010), **p. 1830**, Remark following Theorem D.3
(their Goldston–Yıldırım estimate), verbatim:

> Observe that if `R = N^γ`, then `0 ⩽ Λ'(n) ⩽ χ(0)^{−2} Λ_{χ,R,2}(n)` for all
> `n`, `R < n ⩽ N`. Thus we can use Theorem D.3 to obtain upper bounds for the
> expression (1.7) which lose a multiplicative factor of `(c_{χ,2}/χ(0)²)^t`,
> which is independent of `N`. This observation, coupled with a good choice of
> `χ` and `γ`, is rather close to the Selberg `Λ²` sieving technique. **As is
> well-known there are significant barriers (the "parity problem") to reducing
> this multiplicative loss to something approaching 1.**

`[SOURCED, verbatim, at page image]`

And, p. 1758, verbatim:

> These cases are probably well beyond the reach of current technology, although
> we remark that if one replaces the von Mangoldt function `Λ` with
> substantially simpler weight functions arising from the Selberg `Λ²` sieve
> then such asymptotics can be obtained by standard sieve theory methods (see
> Theorem D.3). This in turn leads to upper bounds on (1.2) which differ from
> (1.7) only by a multiplicative constant depending only on `d, t, L`.

`[SOURCED, verbatim, at page image]`

**What this is worth to the corpus.** It is an independent, published
statement, inside the flagship transference paper, that (i) the twin *upper*
bound off by a multiplicative constant is reachable by `Λ²`-sieve methods, and
(ii) the barrier to driving that constant to 1 is the parity problem, named. It
does **not** supply a number — Green and Tao do not evaluate their loss — so it
neither confirms nor competes with Lichtman's `3.29956`
(`attack-lichtman-decomp.md`). It anchors the *shape* of `wall-note.md` Face 4
in a second literature, and it is the only thing in this note that touches a
live document's content rather than its scope.

---

## 5. The theorem degenerates at `k = 2`, which is the case we want

PROVEN, and it is one line. Set `k = 2` in CFZ Theorem 2.4's conclusion:

> `E[f(x)f(x+d) | x, d ∈ Z_N] = (E[f])² ≥ δ²`.

The conclusion at `k = 2` is Cauchy–Schwarz, true for every `f ≥ 0`, and it
carries no information whatsoever about any *fixed* shift `d`. **The average
over `d` is where all the arithmetic of the twin problem lives**: the twin
question is precisely the statement that the `d = 2` term of that average is
not `0`, and the average being `≥ δ²` says nothing about any single term.

This is why the family has no `k = 2` member and cannot have one. It also
explains the complexity assignment from the other side: `k`-APs have complexity
`k − 2`, so `k = 2` would be complexity `0` — which is Green–Tao's *trivial*
case, `d`-tuples of independent primes, and *not* the twin system, which is
`d = 1` and therefore `∞`. The `k = 2` slot of the AP family and the twin
system are different objects that both index to "2", and conflating them is
what produced the brief's inverted framing.

`[Confidence 0.97 on "no `k = 2` fixed-shift theorem exists in this family".
The elementary degeneration above is PROVEN; the claim that no author has
posed a variant that evades it is a reading of three papers, not a sweep.]`

---

## 6. The two escapes, priced and shut

A closure is only worth writing if it shuts the re-proposals. There are exactly
two, and both were checked.

**Escape 1: "run it at fixed `x`, where `δ(x)` really is a positive
constant."** At fixed `x`, the tile is a finite object, `δ(x) > 0` is a genuine
constant (`0.16468` at `x = 79`), and one could work in `[1, N]` with `N → ∞`
and the holes mod `x#` as the ambient. **This is empty and the reason is
one line.** The set whose relative density is `δ(x)` is the set of twin
*slots*, and twin slots mod `x#` are a finite union of arithmetic progressions:
they contain `k`-APs for every `k` trivially, by inspection, and a relative
Szemerédi conclusion about them is a restatement of that inspection. The set
one actually wants — twin *primes* — has relative density `~2C₂/ln N` inside
the holes for **every** fixed `x`, so the hypothesis fails at fixed `x` exactly
as it fails uniformly. Fixing `x` moves the density failure from the tile
coordinate to the interval coordinate and does not remove it.

**Escape 2: "reformulate the twin question as a finite-complexity system."**
This is the only re-entry the map's regrade rule would accept, and it is
**TPC-STRENGTH or worse**. The reformulations that exist in print all move the
*sequence*, never the *configuration*: Bienvenu–Shao–Teräväinen put almost twin
primes (Chen primes, bounded-gap primes) into the coefficient sequence and still
require `Ψ` to be finite complexity — their abstract, verbatim, *"we provide a
transference principle which applies to general affine-linear configurations of
**finite complexity**"* `[SOURCED]`. Their §1.1, verbatim: *"The papers
[22, 25, 26, 30, 33], in turn, all use the Green–Tao transference principle, and
hence the proofs do not adapt to any non-translation-invariant configurations
`Ψ`."* `[SOURCED]` To reformulate the twin question with `d ≥ 2` is to
introduce a second free variable, i.e. to average over the shift, which is
Escape 1's failure again; and Green–Tao name that move themselves, p. 1758,
verbatim: *"it is possible to establish the case `d = 1`, `t > 1` of the
Hardy-Littlewood conjecture on average over the choice of forms … This
essentially amounts to increasing `d`, which can place one back in the "finite
complexity" regime discussed below."* `[SOURCED]` **Averaging over the shift is
the only known road back into finite complexity, and the corpus's target is a
statement at one fixed shift.**

**Therefore the family closes as a unit**: "use a pseudorandom majorant",
"transfer a density result to the primes", "Gowers-norm control", "relative
Szemerédi", "dense model theorem", "densification", "inverse conjecture for the
Gowers norms". All of them terminate at the same place — the configuration must
be finite complexity, and ours is printed as infinite.

---

## 7. The `u = 2` cross-check, which returned nothing

The brief asked whether Gowers-norm complexity or transference has anything to
say about depth-2 patterns, given four independent objects converging on
sifting depth `u = 2`. **It does not, and the check is worth recording so it is
not run again.**

The "2"s in this field index three different things, none of them a sieve
depth:

| the "2" | what it indexes | where |
|---|---|---|
| complexity `s = 2` | the `U³` Gowers norm; `k = 4` APs; the case Green–Tao made unconditional | Annals 171, abstract and Cor. 1.7 |
| `t = 2` | a binary system: two forms — the twin/Goldbach case, infinite complexity | Annals 171, p. 1760 |
| `k = 2` | the degenerate AP length, Cauchy–Schwarz | §5 |

The corpus's `u = ln h / ln y = 2` is a *sifting parameter* — the ratio of the
log of the height to the log of the sifting range (`attack-bilinear-transplant.md`
§1). It is not a count of forms, not a Gowers order, and not an AP length.
Nothing in this literature is indexed by sifting depth at all: Green–Tao's only
sieve-side parameter is `R = N^γ` with `γ` "sufficiently small", and they say
explicitly, p. 1830, that the cutoff choice "is not" critically important to
them, in contrast to Goldston–Pintz–Yıldırım `[SOURCED, verbatim]`.

**Verdict: no connection, and matching the numerals would be numerology.** The
map's own precedent is binding here — `import-map-construction.md` §1 rejected
KPZ universality on exactly this ground: *"the measured 0.27–0.32 and the KPZ
1/3 are exponents of different objects, and matching the numerals is
numerology."* Same rule, same answer. Confidence 0.98 that there is nothing
here.

---

## 8. Artifacts and verification level

| id | artifact | sha256 | level |
|---|---|---|---|
| `A1` | `annals.math.princeton.edu/wp-content/uploads/annals-v171-n3-p08-p.pdf` — Green–Tao, *Linear equations in primes*, Annals 171 (2010) 1753–1850, full text | `ec126f9c9e189cc0308b83fb4f9f93c29a47d11ad875391aff4ce4c42aef1001` | **[SOURCED, verbatim, page image]** — every Green–Tao quotation above is from this file |
| `A2` | `arxiv.org/pdf/2106.09001` v2 — Bienvenu–Shao–Teräväinen, *A transference principle for systems of linear equations, and applications to almost twin primes* | `b12d0ba1896ef841d5ae1937709f8eff696292d2b0e4df8a40c921aebd43ce7f` | **[SOURCED, verbatim]** — arXiv v2; the *Algebra & Number Theory* 17 (2023) no. 2 record is **[SOURCED-BIB]** and the **page range was NOT REACHED** |
| `A3` | Conlon–Fox–Zhao, *A relative Szemerédi theorem*, arXiv:1305.5440, Theorem 2.4 and Definition 2.2 | — | **[SOURCED]** at ar5iv full text; the GAFA 25 (2015) 733–762 record is **[SOURCED-BIB]**, DOI `10.1007/s00039-015-0324-9`; **page image NOT REACHED** |
| `A4` | Green–Tao, *The primes contain arbitrarily long arithmetic progressions*, arXiv:math/0404188, Theorem 3.5 and the pseudorandom-measure definitions | — | **[SOURCED]** at ar5iv; used only for orientation, no claim above rests on it alone |
| `A5` | Green–Tao–Ziegler, inverse conjecture for the Gowers norms | — | **NOT REACHED.** Named in the brief, not opened. No claim above rests on it; it enters only as a member of the closed family, which closes on the configuration's complexity and not on the inverse conjecture's status |
| `A6` | Zhao, lecture notes on the transference principle | — | **NOT REACHED.** Same |
| `P1` | session producer `transference-density.js` + `extrap.js`, scratchpad | — | **[SCRATCHPAD-GRADE]** — not embedded, not `qc`-gated, not a repo number. Every table cell marked `[SCRATCHPAD]` above comes from these two and must be re-derived inside an embedded producer before being quoted outside this file |

**Verification gaps, restated so they are not lost:** CFZ at ar5iv not GAFA;
BST page range unreached; GTZ and Zhao's notes unopened; the "no `k = 2`
variant" claim is a three-paper reading and not a sweep.

---

## 9. Drafts. Nothing below is applied.

### 9.1 DRAFTED — `research/history/staging/import-map-construction.md` §1, thirteenth rejection row

*(The candidate is VOCABULARY-ONLY, so per `IMPORT-MAP.md` §0 it does **not**
enter the map's table. It enters the rejection table, which is what makes the
rejection reusable. The section's header count "Twelve candidates" would need to
read "Thirteen candidates".)*

> | candidate | the theorem that would have been imported | why it is not a fit |
> |---|---|---|
> | the transference principle and relative Szemerédi theory (pseudorandom majorants, Green–Tao, Conlon–Fox–Zhao, densification, the inverse conjecture for the Gowers norms) | Conlon–Fox–Zhao, *GAFA* **25** (2015) 733–762, **Theorem 2.4**: for every `k ≥ 3` and `δ > 0` there is `c > 0` such that a `ν` obeying the `k`-linear forms condition and an `f` with `0 ≤ f ≤ ν`, `E[f] ≥ δ`, have `E[f(x)⋯f(x+(k−1)d)] ≥ c` | the **configuration** is outside the quantifier, in print and by name: Green–Tao, *Annals* **171** (2010) p. 1760, *"The system `Ψ(n₁) := (n₁, n₁+2)`, which counts twin primes, has infinite complexity … More generally, any system with `d = 1` and `t > 1` has infinite complexity."* Three further failures, each independently fatal: the theorem **degenerates at `k = 2`** to `E_{x,d}[f(x)f(x+d)] = (E f)² ≥ δ²`, which averages over the shift where the arithmetic lives; the **ambient is what the machine deletes** — the `W`-trick's stated purpose is to remove the bias modulo small primes, which *is* the tile (Bienvenu–Shao–Teräväinen arXiv:2106.09001v2 §4.1); and the **density hypothesis fails** — twin slots have relative density `∏_{2<p≤x}(1−1/(p−1)) ~ 2C₂e^{−γ}/ln x = 0.7413/lnln W` in the tile's holes, against a `δ` quantified before `ε` and `c`. Full working, sources and the corrected complexity reading: `history/staging/import-transference.md` |

### 9.2 DRAFTED — `research/REFUTED.md`, one line

> | the transference / relative-Szemerédi family (pseudorandom majorants, Green–Tao transference, Gowers-norm control, densification) as a route to the twin pattern | CLOSED (an exclusion in print) | the configuration is outside every theorem in the family by name — Green–Tao, *Annals* 171 (2010) p. 1760, *"any system with `d = 1` and `t > 1` has infinite complexity"* — and three further independent failures: the theorem degenerates to Cauchy–Schwarz at `k = 2`, the `W`-trick's opening step is to delete the tile (the bias modulo small primes it removes IS the tile), and the relative density of twin slots in the tile's holes is `2C₂e^{−γ}/ln x → 0` against a `δ` quantified first; the brief's own framing was inverted at source (the twin pattern is infinite complexity, not complexity 0, which is the trivial PNT-in-APs case) | 2026-08-27 | `history/staging/import-transference.md` |

### 9.3 DRAFTED — `research/SEARCH-CONVENTIONS.md` §1, one new object row

> | the twin pattern's exclusion from higher-order Fourier / transference methods | "the parity wall for Green–Tao methods" | a binary system of affine-linear forms | **"infinite complexity"**; **"binary" case**; **"affinely related forms"**; **"non-translation-invariant configuration"**. **NEVER search "complexity 0"** — in this convention that names the *trivial* case (`d`-tuples of independent primes, "follows from the prime number theorem in APs", Green–Tao p. 1753/1760) and returns the primes-in-AP literature: a calibrated, clean, worthless negative. **"Parity problem" also fails here** — it reaches sieve theory, a different literature with a different obstruction | Green–Tao, *Annals of Math.* **171** (2010) 1753–1850, Def. 1.5, Lemma 1.6, Examples 1 (p. 1760), and Appendix D p. 1830 for the `Λ²`/parity remark; Conlon–Fox–Zhao, *GAFA* **25** (2015) 733–762; Bienvenu–Shao–Teräväinen, *Algebra & Number Theory* **17** (2023) no. 2 = arXiv:2106.09001 |

### 9.4 DRAFTED — `research/SEARCH-CONVENTIONS.md` §3, two rows for the already-run table

> | Is there a transference / relative-Szemerédi theorem covering a fixed even shift (`k = 2`)? | **No**, and there cannot be: the conclusion degenerates to `(E f)² ≥ δ²`. The configuration is named "infinite complexity" in the founding paper | settled 2026-08-27 by arithmetic plus one printed sentence; do not re-search on "complexity 0", which names the easy case |
> | Does the tile's exact periodicity help a pseudorandom majorant? | **No, it disqualifies it.** The `W`-trick exists to delete the bias modulo small primes, i.e. the tile; and the tile majorant's exact twin correlation is `2∏(1−1/(p−1)²) → 2C₂ = 1.3203241`, never `1+o(1)` — the computable number is the singular series | settled 2026-08-27; `history/staging/import-transference.md` §4 |

### 9.5 DRAFTED — `paper/wall-note.md`, one live-doc correction, with exact text

**The brief's proposed sentence must not be installed.** "The twin pattern's
complexity is below the range the technology sees" is false at source in the
direction it points. Proposed replacement text, to be added to §2 Face 4 after
the paragraph ending *"Saying otherwise would be a lower-bound claim with no
lower-bound source."* — exact text, unapplied:

> **What the higher-order Fourier technology says about this face, and it is a
> scope statement rather than a barrier theorem.** The other machine that
> produces prime patterns where naive sieving cannot — the Green–Tao
> transference principle and relative Szemerédi theory — does not reach this
> face, and its founding paper says why, by name. Green and Tao classify a
> system of affine-linear forms by its complexity, and record that *"the system
> `Ψ(n₁) := (n₁, n₁+2)`, which counts twin primes, has infinite complexity"*,
> adding that *"any system with `d = 1` and `t > 1` has infinite complexity"*
> (*Annals of Math.* 171 (2010), p. 1760). The twin pattern is therefore not
> *below* the range that machinery sees but outside it at the top: the
> technology is quantified over systems of complexity at most `s < ∞`, and two
> forms that are affinely related cannot be separated by any Cauchy–Schwarz
> partition (their Lemma 1.6). The same paper's appendix reaches a twin upper
> bound with a `Λ²`-type weight and loses a multiplicative constant independent
> of `N`, remarking that *"there are significant barriers (the "parity
> problem") to reducing this multiplicative loss to something approaching 1"*
> (p. 1830) — the same shape as this face, in a second literature, and with no
> number attached. **This adds no barrier result to this face.** It records that
> a second technology declines the problem in print, and it fixes the address:
> the phrase that owns this obstruction is **"infinite complexity"**, never
> "complexity 0", which in that convention names the trivial case.
> (`research/history/staging/import-transference.md`, 2026-08-27.)

**Two notes on the live docs the brief warned about, for the record.** Face 4's
`β₂` sentence has **already been corrected in the live file** (dated
2026-08-27, citing `attack-lichtman-decomp.md` §8), as has Face 1's parity
floor, which now reads **8** with the dimension-2 reasoning. Nothing in this
note builds on either sentence in any version, and nothing here bears on Face
2's `m ≥ 3` claim.

---

## 10. What a future session should not re-propose

Written so that the closure holds without re-reading the argument.

1. **Do not propose a pseudorandom majorant for the tile.** The `W`-trick's
   purpose is to delete the tile; the tile majorant's exact twin correlation is
   `2C₂ ≠ 1`; and a majorant for which it were `1` would make twins the random
   count, leaving nothing to prove.
2. **Do not propose transferring a density theorem.** There is no density
   theorem for a fixed even shift to transfer, and the relative Szemerédi
   conclusion at `k = 2` is Cauchy–Schwarz.
3. **Do not propose that low relative density is the fixable part.** It is real
   (`0.7413/ln x`), it is *better* on the tile than on the integers by an
   exponential (`lnln W` against `ln N`), and it is the third reason the route
   dies, not the first.
4. **Do not write "complexity 0" anywhere near the twin pattern.** It is the
   trivial case in the owning convention and it will send a search into the
   PNT-in-APs literature.
5. **Do not read `u = 2` as a Gowers complexity.** Different index, different
   object; the map's KPZ rejection is the governing precedent.
6. **Re-entry, if ever, costs exactly one thing:** a finite-complexity system
   whose solvability implies the Zone Postulate, exhibited, and shown not to be
   the average-over-shifts restatement that Green–Tao already name on p. 1758.
