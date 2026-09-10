# Second far-field pass: eight fields priced, none opens anything, and the one bank is that Holt and Rudd's eigenvalues are in print in closed form while this corpus records only their eigenvectors

<!-- ledger
id: Q-recon-0829-farfields2
status: ANSWERED
todo: 0
question: Do any of eight fields still absent from IMPORT-MAP.md and from the three 2026-08-28 recon notes hold a theorem whose hypothesis the tile or the zone satisfies exactly and whose conclusion is a lower bound on a periodic set's count in every window, a maximal-gap bound for a product-structured periodic set, or a positivity statement at a distinguished point?
verdict: No route from any of the eight; the pass banks one PUBLISHED-ANCHOR (Holt and Rudd's transfer matrix has its full spectrum in print, second eigenvalue a2 = prod_{17<=q<=p}(q-3)/(q-2), printed 0.10206751799779 at p = 999999999989, decaying only like 2.82/ln p, and this corpus's prior-art record names the eigenstructure and the binomial eigenvectors but carries the per-prime eigenvalue (p-j-1)/(p-2) at lit-pdf-holt-rudd.md line 259 but no product-over-primes closed form, no numerical value and no rate), one CLOSURE with mechanism (Beurling-Selberg is the proof device behind the large sieve, whose constant N-1+1/delta is an l2-to-l2 statement and whose error 1/delta exceeds the window at the operative theta_total > 2, so the whole extremal-function family reproduces a row already rejected), and three wall addresses; two angles are TPC-strength at the form that would pay and are labelled (ii).
-->

*(2026-08-29. Staging note, HELD, no adversarial pass. Nothing here is
integrated into a live document and no existing repo file was edited, moved or
deleted. No git command was run and `research/qc.js` was not run. This is a
RECON pass: it prices fields, it opens nothing, and it proposes no work beyond
first experiments. One scratch producer was written and it lives in the session
scratchpad (`a2rate.py`, described in §6, not embedded, not `qc`-gated), so
every figure it printed is marked `[SCRATCHPAD-GRADE]` per the
`attack-lichtman-decomp.md` precedent and may not be quoted outside this file
until it is re-derived inside an embedded producer. Literature statements are
**[SOURCED]** when read this session at a page image, a publisher full text or
an authors' hosted full text with the sha256 in §6, **[SOURCED-BIB]** when only
the record was verified, **[MEMORY]** otherwise, per
`recon-0828-farfields.md` §6. Corpus numbers are **[CITED]** and were never
recomputed, per the standing compute rule. Angle labels **(i)/(ii)/(iii)** are
`attack-wrongdirection-audit.md` §1-§2: (i) strictly weaker than TPC, (ii)
TPC-strength, (iii) undetermined.)*

**Confidence that any angle in this note opens a route on the `4.26645 -> 2`
gap: below 0.5%.** The base rate this note is priced against is the corpus's
own, stated before anything else is read: about 100 imports and recon angles
have run here and every one closed. `IMPORT-MAP.md`'s own calibration cell says
what a fit predicts, and it is narrow: an import fit predicts a banked payoff, a
closure with mechanism or a wall address, and predicts nothing whatever about a
route surviving. Nineteen landed rows, zero routes on the exponent
(`IMPORT-MAP.md` ledger verdict `[CITED]`). This pass is priced to that record
and it matches it.

---

## 0. Verdict, disconfirming half first

**Nothing found opens anything, and the wall is where it was this morning: the
exponent band `(2, 4.26645]` is unchanged and no angle below narrows it by any
amount.** Eight fields were priced. Six die on a sentence that is not about any
of them. Two of the eight are TPC-strength at exactly the form that would pay,
which means pursuing them is legal only under the audit's own rider and the
label has to travel with them.

**The disconfirming facts, in order of how much they cost the pass.**

1. **Two of the eight are (ii) TPC-strength at the paying form, by a result the
   corpus already holds.** `attack-wrongdirection-audit.md` §2 item 6 `[CITED]`
   settles it: a Gaussian maximal law for `R_H` at the operative window is
   TPC-implying, with `need_sharp/z²` measured 0.4913 to 0.6144 at `z = 13..43`,
   below 1 at every level. Both the Beurling-Selberg angle (§3c) and the
   exponent-pair angle (§3d) aim at the sawtooth `R_H`, and at the sup form they
   inherit that label. Only the mean-square form is (i), and the mean-square
   form is already PROVEN and already known to be useless for `G₂`
   (`sift-limit-attack.md` §7e `[CITED]`: the almost-all exponent is 0).
2. **The one genuinely new SOURCED object in the pass is a rate that is too
   slow by the whole distance that matters.** Holt and Rudd's second eigenvalue
   `a₂` decays like `2.82/ln p` `[SCRATCHPAD-GRADE for the constant, SOURCED for
   the closed form]`. Killer 2's threshold is `εW < 1`, i.e. `ε` below
   `e^{-(1+o(1))x}` (`attack-wrongdirection-audit.md` §1 Axis C `[CITED]`). A
   relative error of size `1/ln p` misses that by every order there is.
3. **Six of the eight collapse onto §2's two sentences or onto a landed row.**
   The Gowers angle collapses onto §2a's exact transform. The Bohr-set angle
   collapses onto §2b and re-enters a `[DOA]` line
   (`recon-0828-jacobsthal.md` A8 `[CITED]`) without paying the re-entry price
   in full. The martingale angle is row 7 and `natal-cap-14` in different
   clothes. The large-deviation angle is the ensemble quantifier again. The
   game-theoretic angle collapses onto row 3, Shearer. The renewal angle, moved
   to §4, is the landed thinning row plus a null already measured-refuted in the
   light direction.

**What the pass banks, stated at its own rung and not higher.**

- **PUBLISHED-ANCHOR, and it is the only thing here worth carrying out of the
  note.** The full spectrum of the transfer matrix `M_J` that
  `a3-09-histogram-operator.md` rediscovered is in print, with closed-form
  eigenvalues `a_j = ∏_{17≤q≤p}(q-j-1)/(q-2)`, printed numerical values, and
  the authors' own statement that convergence is governed by `a₂` and is slow.
  The corpus half-holds this and the honest split matters: `PRIOR-ART.md`
  line 194 `[CITED]` already names "transfer matrix `M_J`, binomial
  eigenvectors, 'driving terms'" at 1408.6002 §5, and `ATTACKS3.md`,
  `U-FRAME.md` and `a3-09-histogram-operator.md` each carry the phrase
  "eigenstructure and binomial eigenvectors". What no file in `research/` or
  `paper/` carries is any **eigenvalue**: not the closed form, not a numerical
  value, not the rate. So the brief's question, is the second eigenvalue
  anywhere in print, has the answer YES with a closed form, and what the corpus
  was missing is the eigenvalue half of an eigenstructure it had already
  attributed. §3e.
- **CLOSURE with mechanism, for the extremal-function family.** Selberg's
  majorant `C_E` has the exact property `∫(C_E − χ_E) = 1` at type `2π`
  **[SOURCED, verbatim]**, which scales to error `1/δ` at type `2πδ`. Removing
  any modulus from the Lemma V frequency set needs `δ < 1/(D₁D₂)`, hence error
  above `D₁D₂`, and at the operative `θ_total = 2s/u ≈ 2.4` to `2.8` that
  exceeds the window `H` itself. The family cannot be run at the working point
  at all, before any question of what it would buy. §3c.
- **Three wall addresses**, all restatements of killer 2 in conventions that own
  it: the `1/ln p` mixing rate (§3e), the linear phase (§3d), and the
  single-player collapse of the positional game onto the union bound (§3h).

**What this note does NOT establish.** It does not establish that these fields
hold no relevant theorem. It establishes that no theorem of the three named
shapes was reached in the conventions §1 names, with the channels calibrated
in-pass. Three channels were not reached: MathSciNet, zbMATH beyond public
search, and any paywalled full text. No sentence below is an absence claim
outside §1's conventions.

**Novelty position, stated before §3 rather than after.** Nothing below is
claimed novel. §3e is a reading of a published paper and is the opposite of a
discovery: it is this corpus finding out that a thing it computed was printed in
2014. §3c's arithmetic is elementary and is the kind of statement the
prior-art discipline expects to be folklore in the harmonic-analysis
convention. `PRIOR-ART.md` and `SEARCH-CONVENTIONS.md` were both read before
this pass began.

---

## 1. Channel calibration, before any negative is counted

Per `SEARCH-CONVENTIONS.md`, a clean negative in the wrong convention is the
default failure mode here, and a negative is not counted until the channel has
returned a known positive in the same pass.

| channel | probe | result | state |
|---|---|---|---|
| OpenAlex, single filter | `title_and_abstract.search:Jacobsthal function` | 301, Erdős 1962 first | LIVE |
| OpenAlex, conjunctive (comma is AND) | `almost-periods of convolutions` | 56, Croot-Sisask 2010 first and second | LIVE, conjunction confirmed |
| OpenAlex, conjunctive | `Beurling-Selberg` AND `sieve` | 12 | LIVE |
| OpenAlex, conjunctive negative control | `Beurling-Selberg` AND `Jacobsthal` | **0** | a real 0 on a live channel |
| OpenAlex, conjunctive negative control | `Maker-Breaker` AND `residue` | 5, none in number theory (all protein/chemistry noise on `residue`) | a real 0 in substance, and a demonstration that `residue` is a poisoned token in this channel |
| AMS journals, free full text | Vaaler, *Bull. AMS* 12 (1985) 183-216, PDF | fetched, 2,157,378 bytes, hashed, text extracted, §1 read | LIVE |
| arXiv abstract pages | `1003.2978`, `1408.6002` | both fetched, hashed | LIVE |
| arXiv full text | `1408.6002` PDF, 364,025 bytes | §5.1 and Table 1 extracted verbatim | LIVE |

The 403 the brief warns about did not arise: `terrytao.wordpress.com` was not
needed, because every statement this pass needed was reachable at a publisher
or an arXiv host. MathSciNet was not reached and no line below depends on it.

Conventions searched, by object rather than by house vocabulary, per
`SEARCH-CONVENTIONS.md`'s owning-convention rule:

| object | convention searched | outcome |
|---|---|---|
| the sawtooth remainder `r_{d₁,d₂}(x)` of Lemma V | **extremal majorants and minorants**, **Beurling-Selberg**, **large sieve** | the family is found and read at Vaaler's survey; it is the proof device behind the large sieve constant, and `large sieve` is already a rejected row (`import-map-construction.md` line 72 `[CITED]`) |
| the same remainder, as an exponential sum | **exponent pairs**, **van der Corput's method** | the corpus already owns the convention at row 15 (`SEARCH-CONVENTIONS.md` §1 `[CITED]`) and the phase there is `{W'/q}`, nonlinear in the modulus; the Lemma V phase is `e(−hx/(d₁d₂))`, linear in `x` |
| the fold's histogram operator | **transfer matrix**, **eigenstructure**, **cycles of gaps** | found in print at Holt and Rudd §5.1 with the full spectrum; the generic `transfer matrix` conjunction is unusable (100,518 records, all noise), and the specific `cycle of gaps` phrase is the discriminating one |
| a covering game with one mover | **Maker-Breaker**, **positional games**, **Erdős-Selfridge** | the convention exists and its criterion is a potential-function union bound, which is row 3; the arithmetic conjunction is a real 0 |
| almost-periodicity of `1_T * 1_T` | **almost-periods of convolutions**, **Croot-Sisask**, **Bogolyubov** | found and read at the abstract; the conclusions are all about iterated product sets and Bohr structure, none about a count in an interval |
| higher-order structure of a periodic set | **Gowers norms**, **complexity of a linear system** | already owned by `import-transference.md` §7, which read Green-Tao at source and recorded the twin system as infinite complexity `[CITED]` |

---

## 2. The fit test, applied once, before the rows

The brief's fit test is `recon-0828-farfields.md` §2 and it is used unchanged.
Both halves are PROVEN there and neither is re-derived here.

**2a. The transform has full support** (`recon-0828-farfields.md` §2a
`[CITED]`, PROVEN in one line there, checked numerically at twelve primes).
Under CRT `1_T` is a product of local indicators, every local factor is
`1 + e(2v/q)` up to a unit phase, and that vanishes only when `4v ≡ q (mod 2q)`,
which parity forbids for odd `q`. So `|supp T̂| = W`, maximal. Consequence used
below: any method whose input is "the object's Fourier data is concentrated,
sparse, or has a spectral gap in the additive sense" has no hypothesis to
satisfy here, and any method whose output is a support bound says nothing.

**2b. The interval is a diagonal segment in the box** (`recon-0828-farfields.md`
§2b `[CITED]`). The map `n ↦ (n mod q)_q` is a bijection `Z/W → ∏ Z/q`, and an
interval of length `L` is a segment of the CRT diagonal meeting `L` of the `x#`
cells. Any statement proved by counting, covering, structuring or optimising
over the box is a statement at scale `x#`, and the restriction to the segment
is the missing step. This is the Alon-Füredi rejection of
`import-map-construction.md` §1 restated.

**A third sentence is added here, and it is the one that does the most work in
§3.** It is not new mathematics; it is the corpus's own quantifier line put in a
form that can be pointed at.

> **The precision test.** `G₂` is a maximum over `W` positions in one period.
> A method delivering a relative error `ε` on any window functional decides the
> worst position only if `εW < 1`, i.e. only if `ε < e^{−(1+o(1))x}`
> (`attack-wrongdirection-audit.md` §1 Axis C `[CITED]`, which states the line
> sits at `ε = 1/W` and at no rate polynomial in `x`). Every rate priced below
> is polynomial or polylogarithmic in `x` and therefore fails this test by an
> exponential factor, independently of whatever else is wrong with it.

Six of the eight angles fail on one of these three sentences before their own
mathematics is reached, and the note says which sentence in each case rather
than restating the argument.

---

## 3. The priced angles

Grades use `IMPORT-MAP.md` §0 throughout: structural fit EXACT-IDENTITY /
STRONG-ANALOGY / VOCABULARY-ONLY, circularity CLEAN / TPC-STRENGTH / CIRCULAR,
payoff by TYPE. Cost is the size of a first experiment shaped to four hours, not
the size of the mathematics. Each angle carries its
`attack-wrongdirection-audit.md` label.

### 3a. Higher-order Fourier analysis: Gowers norms of the tile, and Green-Tao complexity, **(i)**

**The theorem that would have been imported.** The `U^k` inverse theorems and
the Green-Tao linear-forms machinery, specifically Green-Tao, *Linear equations
in primes*, *Annals of Math.* 171 (2010) 1753-1850, Definition 1.5 (complexity
of a system of affine-linear forms) and Examples 1 p. 1760 **[CITED, read at
source by `import-transference.md` §7 on 2026-08-27; not reopened this
session]**, together with the generalised von Neumann theorem that a system of
complexity `s` is controlled by `U^{s+1}`.

**Circularity pre-check: CLEAN, and the angle is empty rather than circular.**
Computing `‖1_T − δ‖_{U^k}` at a fixed level is a finite computation carrying no
hypothesis.

**Structural fit: VOCABULARY-ONLY, by two independent sentences.**

The first is about the target functional and it is the deciding one:

> The object wanted is `min_a #(T ∩ [a, a+L))`, which is a count of a single
> linear form in a single variable. In the Green-Tao classification that is a
> system of complexity 0, controlled by `U^1` and `U^2`, and `U^2` on `Z/W` is
> exactly the Fourier data. By §2a the Fourier data is not merely available, it
> is exact in closed form. A `U^k` norm for `k ≥ 3` is therefore a strictly
> coarser summary of information the corpus already holds exactly, and no
> inverse theorem can return more than what it summarises.

The second is the brief's own question, and the answer is that the closure is
already in the corpus rather than that the tile's structure is trivial:

> The place where higher-order machinery would be forced is the step from the
> tile to primes inside the zone, and that configuration is the twin pattern,
> which Green-Tao classify as infinite complexity, their own stated scope limit
> (`recon-0828-sieve.md` §6 `[CITED]`: "the twin pattern is a one-variable,
> infinite-complexity system; this is the method's own known scope limit",
> graded dead on arrival there). `import-transference.md` §7 `[CITED]` also
> records the search-convention trap attached to it: never search "complexity
> 0", which names the trivial case in this convention and returns the
> primes-in-AP literature as a calibrated worthless negative.

So the honest answer to "is the tile's `U^k` structure trivial" is: not trivial,
but irrelevant, because the functional in question is complexity 0 and the
`U^2` data controlling it is already exact. And the honest answer to "does
infinite complexity already close it" is yes, on the zone side, and that closure
was landed on 2026-08-27 and is not new here.

**Payoff type: none new.** It restates two landed closures.
**Cost: 0.** No experiment is proposed.

### 3b. Bohr sets, Bogolyubov, Croot-Sisask almost-periodicity, **(iii)** with a **(ii)** face

**The theorem that would have been imported.** Croot and Sisask, *A
probabilistic technique for finding almost-periods of convolutions*, *GAFA* 20
(2010) 1367-1396, arXiv:1003.2978 **[SOURCED at the arXiv abstract page, the
abstract quoted in §6; the body was not opened]**: a technique giving
"results similar to the Bogolyubov-type estimates established by Fourier
analysis on abelian groups but without the need for a nice Fourier transform to
exist", with conclusions that iterated product sets "contain very large iterated
product sets" and are "rather structured", the results being explicitly
"'local' in nature". Behind it, Bogolyubov's lemma in the form `A − A + A − A`
contains a Bohr set of bounded rank and radius **[MEMORY]**.

**Circularity pre-check: the honest cell is SPLIT.** The almost-periodicity
statement itself is CLEAN. The bridge from a Bohr-set conclusion to an interval
conclusion is the position-uniform discrepancy statement that
`recon-0828-farfields.md` §3f `[CITED]` already priced as the maximal law, and
the maximal law on `R_H` at the operative window is TPC-implying
(`attack-wrongdirection-audit.md` §2 item 6 `[CITED]`). So the paying face is
**(ii)** and the label travels with it.

**Structural fit: VOCABULARY-ONLY, and the row is a re-entry that does not pay
the full re-entry price.** `recon-0828-jacobsthal.md` A8 `[CITED]` already
carries "Additive combinatorics, Bohr sets, the large sieve reversed [DOA]",
with the reason that a Bohr-set covering statement is import row 12 again, and
row 12 is closed with the union bound exactly tight in the multi-obstacle case.
Under `IMPORT-MAP.md` §0a a VOCABULARY-ONLY grade needs new structural evidence
to re-enter. Two pieces of new structural evidence are offered, and neither
reopens it.

> **New evidence 1, and it makes Bogolyubov vacuous rather than weak.**
> `recon-0828-farfields.md` §3c `[CITED]` proves `T + T = Z/W` exactly, because
> `T` is a product set with `|A_q| = q − 2 ≥ 3` and Cauchy-Davenport gives
> `A_q + A_q = Z/q` at every `q ≥ 5`. The same argument gives
> `T − T + T − T = Z/W`. Bogolyubov's conclusion, that this set contains a Bohr
> set, is therefore satisfied by the whole group and carries zero information
> about rank or radius. The hypothesis is met and the conclusion is empty, which
> is §3a of the 2026-08-28 pass in a different family.

> **New evidence 2, and it is the one place where the object is unusually
> favourable, which makes the failure informative.** Croot-Sisask's Bohr-set
> dimension scales with `log(1/α)` in the density `α`. Here
> `α = D/W = ∏(1 − 2/q) ≍ 1/ln²x`, so `log(1/α) ≍ 2 ln ln x`: the tile is only
> polylogarithmically sparse, not polynomially, and the dimension bound is
> therefore about as good as this family ever gets. It still fails, and it fails
> on §2b rather than on any density: the conclusion is a set of almost-periods
> forming a Bohr set `B(S, ρ)` in `Z/W`, and a Bohr set is not an interval. A
> Bohr set of rank `d` and radius `ρ` meets an interval of length `L` in a
> pattern controlled by the discrepancy of `d` rotations, and converting it is
> exactly the missing step §2b names.

**Payoff type: WALL-ADDRESS, already held (row 12), plus one line of new
structural evidence (the vacuity of Bogolyubov here).**
**Cost: 0.** No experiment is proposed; the row does not re-enter.

### 3c. Beurling-Selberg extremal functions and the large sieve, on Lemma V's sawtooth, **(i)** as stated and **(ii)** at the sup form

This is the angle the brief points at most sharply, it is the only one where the
corpus's own live front is the target, and it fails at the working point before
any of its mathematics is used.

**The theorem, [SOURCED, verbatim, at the AMS free full text].** J. D. Vaaler,
*Some extremal functions in Fourier analysis*, *Bull. Amer. Math. Soc.* 12
(1985) 183-216, §1, read at pp. 183-185:

> Beurling's `B(z)` majorises `sgn(x)` with `∫(F(x) − sgn(x))dx ≥ 1` and
> equality only at `B`. For `E = [α, β]`, Selberg's
> `C_E(z) = ½{B(β − z) + B(z − α)}` satisfies `χ_E(x) ≤ C_E(x)` for all real
> `x`, is entire of exponential type `2π`, has Fourier transform `Ĉ_E`
> continuous and **supported on `[−1, 1]`**, and
> `∫(C_E(x) − χ_E(x))dx = 1`. A minorant `c_E` with
> `∫(χ_E − c_E) = 1` exists by the same construction. Using `C_E` Selberg
> established the large sieve `Σ_r |S(ξ_r)|² ≤ A(N, δ) Σ|a(n)|²` with
> `A(N, δ) = N − 1 + δ^{-1}`, which is sharp.

**Circularity pre-check: SPLIT, and the split is the whole story.** Lemma V as
written (`sift-limit-attack.md` §4.5 `[CITED]`) is a mean-value statement with
no quantifier over positions, and its decoupled payoff is exponent
`u > 1 + √e = 2.649`, which is inside the legal band `(2, 4.26645]`, so as
stated the target is **(i)**, a legitimate stepping stone. What is actually
assumed at the corpus's working point is not Lemma V but a Gaussian maximal law
for the sawtooth (`sift-limit-attack.md` §4.5 `[CITED]`, stated there in those
words), and that is **(ii)**: `attack-wrongdirection-audit.md` §2 item 6
`[CITED]` answers YES for `R_H` at the operative window, with `need_sharp/z²`
measured 0.4913 to 0.6144 at `z = 13..43`. Any import aimed at the sup form
carries the TPC-strength label.

**Structural fit: STRONG-ANALOGY at the object, and it dies on arithmetic at
the working point.** Three deciding sentences, and the first alone is enough.

> **The error term exceeds the window.** Selberg's construction pays exactly
> `1/δ` for a majorant of type `2πδ`, an identity and not a bound. To remove any
> modulus from the Lemma V frequency set `{a/e : e | P(z), e ≤ D₁D₂}` the type
> must fall below that set's spacing, i.e. `δ < 1/(D₁D₂)`, and the error is then
> above `D₁D₂`. The corpus's operative point is `θ_total = 2s/u ≈ 2.4` to `2.8`
> (`sift-limit-attack.md` §4.5 `[CITED]`, `s = 3.0`, `u ≈ 2.16` to `2.48`), i.e.
> `D₁D₂ = z^{2s} > H` by a positive power. So the smoothing error exceeds the
> main term `H/m` before it removes a single frequency. `[DERIVED HERE from the
> SOURCED identity and the CITED working point; elementary, and it has had no
> second reader]`

> **The family's payoff is `ℓ² → ℓ²`, and the wall's address is `ℓ¹ → ℓ²`.**
> Vaaler's §1 is explicit that the point of `C_E` is the large sieve constant
> `N − 1 + δ^{-1}`. `import-map-construction.md` line 72 `[CITED]` already
> rejects the large sieve and Gallagher's larger sieve on exactly this ground:
> "both are `ℓ² → ℓ²` devices, and the wall's address is `ℓ¹ → ℓ²`". So the
> extremal-function family is the proof device behind a row this corpus rejected
> a week ago, and importing it reproduces that row rather than adding to it.

> **The exact identity is already held, so the import offers an inequality where
> an equality stands.** `sift-limit-attack.md` §7e `[CITED]` records that L4
> computes the Fejér mass exactly, `Σ_{a ≢ 0 mod e} F_H(a/e) = h(e − h)`, and
> that L4 also proves (V1) and (V2) including the equality case. A Selberg
> majorant replaces that identity with a one-sided bound. This is the same
> rejection shape as the joint-spectral-radius row
> (`recon-0828-farfields.md` §3e `[CITED]`: "a joint-radius bound would be an
> inequality where an equality is held").

**And the step the family does not touch is the step that kills the route.**
`sift-limit-attack.md` §7e `[CITED]` locates the death of the `u_sup` route at
one place: the absolute-value step `|e(ax/e)| = 1`, which removes the position
quantifier and costs `C^{π(z)}` with `C` measured near 2.05, so `u_sat` grows
like `π(z)/ln z` and `u_sup` was measured rising at all eight steps,
2.0617 to 3.2026 at `z = 13..43`, with the constant model's RSS 49 times the
best fit's. A band-limited majorant changes which kernel multiplies the
coefficients; it does not restore a phase that has been discarded. So even
granting the first sentence away, the family lands on the same `C^{π(z)}`.

**Payoff type: CLOSURE with mechanism, for the whole extremal-function family
(Beurling, Selberg, Vaaler, Graham-Vaaler, Carneiro-Littmann and the
Hilbert-space reformulations), plus a PUBLISHED-ANCHOR line for
`SEARCH-CONVENTIONS.md`: the owning convention for the corpus's L4 Fejér-mass
identity is extremal majorants and minorants, and the corpus's own exact form
is the stronger statement.** No THEOREM, no DERIVED-CONSTANT.

**First experiment, and it is 45 minutes rather than four hours, and it is a
falsification attempt rather than a route.** Write an embedded producer that,
at `z = 13..31` and the corpus's own `(s, u)`, prints `D₁D₂/H` and the Selberg
error `1/δ` at the largest `δ` that removes at least one modulus, beside the
main term `H/m`. Pre-registration: `D₁D₂/H > 1` at every level and rising, and
the ratio of Selberg error to main term exceeds 1 at every level.
Kill: a level where the ratio falls below 1 would refute the first deciding
sentence and would reopen the row at the mean-square form only, never at the
sup form.

**The family is already partly inside the corpus, and that is not disclosed
above.** The Lemma V remainder this angle targets is itself Vaaler-completed:
`lemmaV-neighbours.md` states the sum "after Vaaler completion and the
reciprocity split", and `smoothness-front.md` section 3.3 reads Vaaler 1985
through Graham-Kolesnik Theorem A.6 and records that
`attack-sqrt-cancellation.md` section 2 uses the same statement.
`smoothness-front.md`'s own verdict already prices that member's payoff: "the
Vaaler coefficients clear Pascadi's condition maximally but buy nothing". So this
angle prices a family one of whose members is in the working machinery and
already measured to buy nothing; what is new here is the Selberg majorant of an
interval indicator and the `1/delta` arithmetic, not the family.

### 3d. Exponent pairs and van der Corput's method, on the same remainder, **(i)** as stated and **(ii)** at the sup form

**The theorem that would have been imported.** The `A` and `B` processes and
the exponent-pair calculus, Graham and Kolesnik, *Van der Corput's Method of
Exponential Sums*, CUP LMS 126 (1991), DOI 10.1017/cbo9780511661976
**[SOURCED-BIB, already the corpus's own citation at `IMPORT-MAP.md` row 15 and
`SEARCH-CONVENTIONS.md` §1 `[CITED]`; not opened this session]**; the standard
conclusion `Σ_{n≤N} e(f(n)) ≪ N^k T^l` for an exponent pair `(k, l)` under
derivative conditions on `f`.

**Circularity pre-check: identical to §3c.** Same object, same split, same
**(ii)** at the sup form.

**Structural fit: VOCABULARY-ONLY, on one sentence about the phase.**

> Every process in the exponent-pair calculus consumes a derivative condition:
> the `B` process is Poisson summation against a stationary phase and needs
> `f''` bounded above and below, and the `A` process needs `f'''`. The Lemma V
> remainder reduces, verified exactly in BigInt over 2,655 pairs, to a trilinear
> form with Kloosterman fractions times a single window factor `e(−hx/(d₁d₂))`
> (`sift-limit-attack.md` §4.5 `[CITED]`), and that phase is **linear in `x`**.
> A linear phase has `f'' ≡ 0`, so the `B` process returns the sum unchanged and
> every exponent pair collapses to the trivial pair `(0, 1)`, which is the
> absolute-value step already priced at `C^{π(z)}`.

The one place in the corpus where a nonlinear phase does appear is the branch
phase `⌊W/q⌋ mod M`, i.e. `{W'/q}` over primes, and that is map row 15, LANDED
2026-08-28 with the THEOREM column struck because Saffari-Vaughan's range
condition reads `M > W^{1/12}` and fails at every fixed `M`
(`IMPORT-MAP.md` row 15 `[CITED]`). So the convention is already owned, the
landed row already carries the van der Corput citation, and this angle is that
row without new structural evidence.

**Payoff type: WALL-ADDRESS.** The address is new only as a sentence: the
reason the corpus's remainder is beyond the exponent-pair calculus is not size,
it is that the phase carrying the position is linear, and linearity is what
makes the position removable only by absolute values. That is killer 2 in the
exponential-sums convention.
**Cost: 0.** No experiment is proposed.

### 3e. The spectral gap of Holt's transfer operator on gap words, **(i)**, and the one bank of the pass

**The brief's question was whether the second eigenvalue is anywhere in print.
It is, in closed form, with printed numerical values, and this corpus does not
record it.**

**The theorem, [SOURCED, verbatim, at the arXiv full text].** Fred B. Holt and
Helgi Rudd, *Eratosthenes sieve and the gaps between primes*, arXiv:1408.6002,
§5.1 and Table 1, read at pp. 18-20 of the PDF:

> "Fortunately, we can completely describe the eigenstructure for `M_J|p`, and
> even better — the eigenvectors for `M_J` do not depend on the prime `p`."
> `M_J = R · Λ · L` with `LR = I`; "the upper triangular entries of `R` and `L`
> are binomial coefficients, with those in `R` of alternating sign; and the
> eigenvalues are the `a_j`", where
> `a_{kj} = ∏_{q=17}^{p_k} (q − j − 1)/(q − 2)`.
> "We note that `L_{1·} = [1 ··· 1]`, `λ₁ = 1`, and `R_{·1} = e₁`; that the other
> eigenvalues `a_{kj} → 0` with `a_{kj} > a_{k,j+1}`."
> Table 1, values at `p_k = 999,999,999,989` with `p₀ = 13`:
> `a_{k2} = 0.10206751799779`, `a_{k3} = 0.01019996897567`,
> `a_{k4} = 0.00099592269918`, `a_{k5} = 0.00009477093531`,
> `a_{k6} = 0.00000876214163`, `a_{k7} = 0.00000078408120`,
> `a_{k8} = 0.00000006757562`, `a_{k9} = 0.00000000557284`.
> Figure 3 caption: "The dominant eigenvalue for `M_J` is 1, the second
> eigenvalue is `a₂` and the third `a₃`. So the rate of convergence to the
> asymptotic ratio `w_{g,1}(∞) = N_g/N₂` is governed by how quickly
> `a_{k2} → 0`." And in the body: "While `a_{k3}` becomes small pretty quickly,
> the convergence of `a_{k2}` is slow."

**The corpus half-holds this, and the half it holds is narrower than the bank.**
`research/history/staging/lit-pdf-holt-rudd.md` line 259 already records,
verbatim and page-numbered, "M_J written out as a bidiagonal matrix with
`a_j = (p-j-1)/(p-2)`, `b_j = j/(p-2)`, p.18", and for a bidiagonal matrix those
diagonal entries are the eigenvalues. What no file carries is the
product-over-primes closed form `prod_{17<=q<=p}(q-j-1)/(q-2)`, any numerical
value, or the rate. `grep -i eigenvalue` over
`research/a3-09-histogram-operator.md` and `research/PRIOR-ART.md` returns
nothing; `grep -ri "spectral gap"` over `research/` and `paper/` returns one
hit, in `import-bfree.md`, about parity and not about this operator. The
corpus's own note already records that its histogram operator is a rediscovery
of Holt and Rudd §5 and may not be presented as new
(`a3-09-histogram-operator.md` ledger verdict `[CITED]`); what is added here is
that the eigenvalues themselves were also already printed, and that nobody here
had read them.

**The rate, and it is the disconfirming half.** With `a_j` in closed form,
Mertens gives `a₂ = ∏_{17≤q≤z}(1 − 1/(q − 2)) ≍ c/ln z`. Measured
`[SCRATCHPAD-GRADE]` on a sieve to `2 × 10⁷` in the session scratchpad
(`a2rate.py`, §6):

| `z` | `a₂` | `a₂ · ln z` |
|---|---|---|
| `10⁴` | 0.3058012919 | 2.816534 |
| `10⁵` | 0.2448854878 | 2.819348 |
| `10⁶` | 0.2041269181 | 2.820118 |
| `10⁷` | 0.1749712039 | 2.820203 |

The constant is flat to four places over three decades, and extrapolating
`2.820203/ln(999{,}999{,}999{,}989) = 0.1020657` against Holt and Rudd's printed
`0.10206751799779` agrees to a relative `1.8 × 10⁻⁵`, which is a cross-check on
the printed value rather than a new result `[SCRATCHPAD-GRADE]`.

**Circularity pre-check: CLEAN.** An eigenvalue of a finite matrix with an
explicit product formula carries no hypothesis of postulate strength. It also
carries no conclusion about the anchor.

**Structural fit: EXACT-IDENTITY at the operator, and the conclusion is at the
wrong precision and about the wrong functional.** Three deciding sentences.

> **The rate fails the precision test of §2 by every order there is.** The
> spectral gap is `1 − a₂ = 1 − 2.82/ln z + o(1/ln z)`, so relative errors on
> the operator's own conclusions decay like `1/ln z`. `G₂` needs `ε < 1/W`, i.e.
> `ε < e^{−(1+o(1))x}` (`attack-wrongdirection-audit.md` §1 Axis C `[CITED]`).
> A polylogarithmic rate against an exponential requirement is not a gap that a
> sharper analysis narrows.

> **The functional is a population ratio, not a maximum.** Holt and Rudd's own
> statement of what `a₂` governs is the convergence of `w_{g,1}(p#) = N_g/N₂`,
> the ratio of the number of gaps of size `g` to the number of gaps of size 2.
> That is a first-moment statement about how many gaps of each bounded size the
> cycle carries. `G₂` is the maximum, and killer 2 separates them.

> **The state space truncates below `G₂` by construction.** `M_J` acts on
> constellations of length at most `J`, and Holt and Rudd restrict to spans
> `|s| < 2p` throughout, which the corpus already records
> (`a3-09-histogram-operator.md` `[CITED]`: "they restrict to spans `|s| < 2p`
> throughout, and a maximum gap leaves that regime"). So the operator whose
> spectrum is known does not have `G₂` in its state space at all, and taking
> `J → ∞` is not a limit of this eigenstructure: the closed form
> `(q − j − 1)/(q − 2)` is negative for `j ≥ q − 1`, so the family degenerates
> as `J` approaches the small primes.

**Payoff type: PUBLISHED-ANCHOR (the strongest available here), plus a
WALL-ADDRESS.** The anchor is a `SEARCH-CONVENTIONS.md` row owed: the owning
convention for the corpus's histogram operator is "cycles of gaps" and
"eigenstructure of `M_J`", and the eigenvalues are printed at Holt-Rudd §5.1
Table 1. The wall address is that the fold's mixing rate is `1/ln z` and killer
2's threshold is `1/W`, a statement of the same obstruction in the
transfer-operator convention, beside Shearer's criterion being the union bound
(row 3), `b₃` at its own ceiling (row 4), and Janson's lower tail saturating at
`exp(−1/c) ≥ 0.0805` (`recon-0828-farfields.md` §3g `[CITED]`). Four fields,
one mechanism, four different constants.

**First experiment, one hour, and it is a novelty check rather than a route.**
Write an embedded producer that recomputes `a_{kj}` from the printed closed form
at `j = 2..9` and `p_k = 999,999,999,989` from `p₀ = 13`, checks all eight
printed digits strings, and prints `a₂ · ln p_k` across `z = 10³..10⁸`.
Pre-registration: all eight printed values reproduce to the digits printed, and
`a₂ · ln z` sits in `[2.80, 2.84]` at every level. Kill: a mismatch in any
printed value would mean the closed form was mis-transcribed here and the
anchor is not established.

**A second thing this angle owes, and it is a debt rather than a result.**
`a3-09-histogram-operator.md` is ANSWERED in the ledger and its verdict names
the rediscovery. It does not name the eigenvalues. The `PRIOR-ART.md` "Holt and
Rudd" section does not name them either. Until the holder of those files adds
the §5.1 line, this corpus's prior-art record for that operator is incomplete
in a way that a future novelty claim could trip on. This pass may not edit
either file and records the debt in §5.

### 3f. Martingales and optional stopping on the fold recursion, **(i)** at the almost-all form and **(ii)** at the all-positions form

**The theorem that would have been imported.** Doob's optional stopping theorem
and the Azuma-Hoeffding and Freedman martingale tail inequalities, plus Doob's
maximal inequality as the step that would convert a per-position statement into
an all-positions one **[MEMORY; not opened this session, because the row is a
landed row and the fit dies before the statement matters]**.

**Circularity pre-check: SPLIT and already adjudicated.** The almost-all form is
CLEAN and useless (`sift-limit-attack.md` §7e `[CITED]`: the almost-all
exponent is 0, "almost-all is not the currency this problem trades in, and this
is the clearest demonstration yet"). The all-positions form is the maximal law,
**(ii)** by `attack-wrongdirection-audit.md` §2 item 6 `[CITED]`.

**Structural fit: STRONG-ANALOGY, and it is import map row 7 plus two live
files in different clothes.** The brief's framing, that the fold is a
filtration, is correct and is already the corpus's framing for the adjacent
object. Three deciding sentences.

> **The martingale exists, is exact, and has been measured to lose.**
> `research/natal-cap-07-trajectory.js` `[CITED]` builds the Scour march as a
> Doob decomposition with increments `e_q = fresh − (2/q)·alive`, records that
> the normalisation is exact, and records the contest verdict: theorem-valid
> martingale bounds lose to endpoint Chebyshev by one to three orders, and
> `NIGHT-LEDGER-2026-08-14-15.md` `[CITED]` carries the same line. The
> optional-stopping half is also already built:
> `research/natal-cap-14-discrepancy-lemma.md` `[CITED]` runs a stopped
> martingale `Σ_{k<T} e_k f_k` on the split `{T = ∞}` against `{T < ∞}` for the
> zero-survivor event.

> **The family is closed with a named mechanism.** `IMPORT-MAP.md` row 7
> `[CITED]` is LANDED 2026-08-20 and closes "McDiarmid/Azuma/Talagrand/Warnke/
> Kutin/Kim-Vu as a family", with the defeating coordinate identified: the
> first scour prime's worst-case effect `d(q₁)` misses the theorem's own slack
> by a factor growing like `√N`, 174 to 70,576 over `x = 11..23`, and under the
> published repair the exponent is `≍ ln²x/x`, below 1 at every computable level
> and falling. Azuma is in that list by name.

> **Changing the filtration from the Scour march to the fold does not change the
> defeating coordinate.** The fold's own increment is the same object: one prime
> arrives and deletes two classes. The largest single-step effect is again at
> the smallest prime in play, which is what `d(q₁)` measures. Nothing in
> switching the index set from "primes in the Scour" to "folds" alters that,
> and the pass found no statement that it would.

**Payoff type: none new.** It is row 7's closure plus two live files.
**Cost: 0.** No experiment is proposed; re-entry would need new structural
evidence, and the one candidate for that, a maximal inequality rather than a
tail inequality, is `(ii)`.

### 3g. Large-deviation theory for the sub-Poisson error of the rough-pair census, **(i)** at the ensemble form and **(ii)** at the all-anchor form

**The theorem that would have been imported.** Cramér's theorem and the
Gärtner-Ellis theorem, in the form: if the scaled cumulant generating function
`Λ(λ) = lim n^{-1} ln E e^{λ S_n}` exists, is finite in a neighbourhood of 0 and
is differentiable, then `S_n/n` satisfies a large-deviation principle with rate
function `Λ*` **[MEMORY; standard, Dembo-Zeitouni Ch. 2; not opened this
session]**.

**Circularity pre-check: TPC-STRENGTH at the paying form, and this one is
settled rather than argued.** The object is the error of the rough-pair census
`X(y)` against `T`, and `attack-wrongdirection-audit.md` §2 item 8 `[CITED]` is
explicit: "Z2 route (b), beat the twin density in a rough-pair error term —
(ii) TPC-strength, and stronger", because "the error term's only use is to
certify `X(y*) < T`, hence `T ≥ 1`", and in asymptotic form it delivers
Hardy-Littlewood in a short interval. It adds the coordinate: the sieve half
needs a `κ = 2` lower bound at `s = u*/2 = 1.7829` against `β₂ = 4.26645`, short
by `2.393×`.

**Structural fit: VOCABULARY-ONLY, on the hypothesis rather than the
conclusion.**

> Gärtner-Ellis needs a limiting scaled cumulant generating function, which
> needs a sequence of random variables. The rough-pair census error is one
> deterministic number per anchor. The only randomness available is the anchor
> ensemble, and what is measured there is a scatter across 1,206 anchors whose
> dispersion is sub-Poisson (`attack-roughpair-error.md` `[CITED]`, PARTIAL, and
> `object-models-read-0829.md` `[CITED]` records that this dispersion "stays
> unclassified because its own note's control was never run"). A rate function
> fitted to an ensemble whose control has not run is a fit, not a hypothesis
> satisfied.

And even granting the hypothesis, the conclusion is an exponential-in-`n` bound
on an ensemble fraction, which is killer 2: it decides the worst anchor only if
the exceptional fraction is below `1/W`, and the corpus's own second-moment
bound misses that threshold by `e^{3025}` at `x = 19`
(`paper/wall-note.md` §2 Face 1 `[CITED]`).

**Payoff type: none.** The one thing it would be legitimate to want here, the
control that classifies the sub-Poisson dispersion, is a measurement this
corpus owes itself and is not an import.
**Cost: 0** as an import. The owed control is priced elsewhere and is not this
pass's to schedule.

### 3h. Maker-Breaker and positional games as the free two-class adversary, **(i)**

**The theorem that would have been imported.** The Erdős-Selfridge criterion
(Breaker wins the Maker-Breaker game on a hypergraph `H` if
`Σ_{A ∈ H} 2^{−|A|} < 1/2`) and Beck's potential-function refinements, *Tic-Tac-Toe
Theory*, CUP 2008 **[MEMORY; the OpenAlex conjunction `Maker-Breaker` AND
`residue` returned 5 records, none in number theory, on a channel that returned
a known positive in the same pass]**.

**Circularity pre-check: CLEAN, and irrelevant.** A lower bound on the covering
optimum is a lower bound on `G₂`, and lower bounds are free here: the best
PROVEN one is `G₂(x#) ≫ x log x logloglog x/loglog x`
(`object-g2-read-0829.md` §0 `[CITED]`). Nothing on that side can be
TPC-strength.

**Structural fit: VOCABULARY-ONLY, on one sentence about the number of
players.**

> A positional game has two players alternating. The free two-class adversary
> has one: the adversary chooses all `π(x)` pairs of classes and there is no
> opponent making moves between them. The one-player version of the
> Erdős-Selfridge criterion is its potential function evaluated once, which is
> the union bound `Σ 2^{−|A|}`, and the union bound on this object is import map
> row 3, Shearer, LANDED, where `recon-0828-farfields.md` §3g `[CITED]` records
> the mechanism as "Shearer's criterion being the union bound".

The one thing the game convention does own that the corpus does not is the exact
free-choice optimum, and the corpus already has it from the other direction:
A072753 is carried in `research/two-class-lower-bounds.js` and
`research/attack2-rankin2d.js` `[CITED]` with the Resta/Morack ILP optima
`2, 4, 10, 24, 31, 42, 60, 74, 94, 117, 148, 173, 213, 236, 275, 316, 364, 409,
436` for primes `5..p_n`, `n = 3..21`, and `U-FRAME.md` §583 `[CITED]` records
the normalisation `a(n) = 6·A072753(n) + 6`. Exact ILP optima outrank any
game-theoretic bound on the same finite quantity.

**Payoff type: WALL-ADDRESS, and it is the cheapest one in the note.** The
address: `G₂` is a one-player optimum, so every criterion in the positional-game
family degenerates to its potential function, and that potential function is the
union bound, which is exactly the object row 3 proved tight. The
`Maker-Breaker` AND `residue` zero is recorded so the candidate is not proposed
a third time.
**Cost: 0.**

---

## 4. Rejected in one line each, with the deciding sentence

Seven further fields were carried far enough to name what would have been
imported, so that the rejection is reusable and the candidate is not proposed a
third time. The first entry is the ninth candidate the brief named and is given
three lines rather than one, because it is the most subsumed of the nine and the
subsumption is worth stating precisely rather than asserting.

| candidate | the theorem that would have been imported | why it is not a fit |
|---|---|---|
| **renewal theory, Blackwell's theorem, for the zone gap process** | Blackwell's renewal theorem: for a non-lattice inter-arrival law with mean `μ`, the expected number of renewals in `[t, t+h)` tends to `h/μ` **[MEMORY]** | three independent kills, and the third is decisive. (1) The conclusion is a first-moment density statement about a window far out, which is killer 2's wrong functional: `Z₂` is a maximum, and `Z₂(p) = env(p)` with `D(p) ≡ 0`, PROVEN conditional on the adopted ladder and VERIFIED 204 ways (`zonegap-03-model.md` §1 `[CITED]`), i.e. `Z₂` is the record ladder in zone coordinates and a record process is exactly what a renewal theorem does not describe. (2) The renewal null has already been run against the tile's own gap spectrum and it FAILED in the light direction at all nine levels to `x = 31`: tail steeper than exponential, body slope `−1.3302` against `−1`, and the measured maximum a factor 2.087 to 2.241 BELOW the renewal maximum (`gap-spectrum-01.md` `[CITED]`). So the model is not merely unhelpful, it is measured-wrong in the direction that matters. (3) The field already has a landed row, thinning (`import-thinning.md` `[CITED]`), and `object-models-read-0829.md` §D5 `[CITED]` classifies the lighter-than-renewal tail as RESIDUE-LEVEL and unable to touch the wall |
| quantitative equidistribution of nilsequences, Green-Tao-Ziegler inverse theory | the `U^{s+1}` inverse theorem and the nilsequence factorisation | subsumed twice: §3a shows the target functional is complexity 0, and `recon-0828-sieve.md` §6 `[CITED]` already grades Green-Tao-Ziegler dead on arrival on the twin system's infinite complexity |
| Sidon sets, `B_h[g]` sets, and additive energy of the tile | Erdős-Turán and Lindström bounds on `B_2` sets in `[N]` | the tile has maximal additive energy, not minimal: it is a product set with `T + T = Z/W` (`recon-0828-farfields.md` §3c `[CITED]`), so every hypothesis in the family is the opposite of what holds, and the conclusions bound cardinality rather than gaps |
| first-passage percolation and last-passage on the fold DAG | the shape theorem and Alexander's sublinear fluctuation bounds | the KPZ/last-passage rejection of `import-map-construction.md` §1 `[CITED]` applies verbatim: a maximum of moving sums on a one-dimensional cyclic word is a maximum over `D` candidates with no transversal path degrees of freedom, so there is no shape to have a theorem about |
| Furstenberg correspondence and multiple recurrence | Szemerédi's theorem via multiple recurrence, and the Host-Kra structure theory | the correspondence converts a density statement about a set of positive upper density into a recurrence statement, and the conclusion is existence of one good configuration somewhere, never a count in every window; it is §2b's box-to-segment failure with an ergodic average in place of a count |
| random matrix statistics, GUE and the Montgomery pair correlation, for the zone gap | the conjectural GUE spacing law and its proven `k`-level restrictions | conjectural on the side that would pay, so `IMPORT-MAP.md` §0's `[CONJECTURE-ONLY]` grade applies and THEOREM is structurally unavailable; and the corpus's own exact pair correlation already outranks a spacing model (`variance-note.md` Thm 1, `import-repulsive.md` row 17 `[CITED]`) |
| symmetrisation and rearrangement inequalities (Riesz, Brascamp-Lieb-Luttinger) | the conclusion that a rearranged configuration extremises a multiple integral | every such theorem moves mass toward a symmetric arrangement and concludes about the extremiser, while the tile's arrangement is arithmetically fixed and the question is about that arrangement and no other; this is `import-boolean-analysis.md` §4's equivariance wall `[CITED]` in a third costume |

---

## 5. The wall-address table

One row per priced field. "Killer" is `object-g2-read-0829.md` §0's numbering:
1 the class-blind cap at `β₂ = 4.26645`, 2 the wrong quantifier (maximum vs
almost-all, threshold `εW < 1`), 3 the parity floor at exponent 2.

| field | killer it dies on | the exact fact it dies on | cited to |
|---|---|---|---|
| higher-order Fourier, Gowers norms | 1, then 3 | the window count is a system of complexity 0, controlled by `U²`, and `U²` on `Z/W` is Fourier data the corpus holds exactly by §2a; on the zone side the twin pattern is infinite complexity, the method's own scope limit | `recon-0828-farfields.md` §2a; `recon-0828-sieve.md` §6; `import-transference.md` §7 |
| Bohr sets, Bogolyubov, Croot-Sisask | 2 | `T − T + T − T = Z/W` exactly, so Bogolyubov's conclusion is the whole group and carries no rank or radius; the Bohr-to-interval bridge is the position-uniform discrepancy statement, i.e. the maximal law | `recon-0828-farfields.md` §3c; `recon-0828-jacobsthal.md` A8; `attack-wrongdirection-audit.md` §2 item 6 |
| Beurling-Selberg extremal functions | 2, with an arithmetic block in front of it | Selberg's error is exactly `1/δ` at type `2πδ`; removing one modulus needs `δ < 1/(D₁D₂)`, and `D₁D₂ = z^{2s} > H` at the operative `θ_total ≈ 2.4` to `2.8`; behind that, the family's payoff is the `ℓ² → ℓ²` large sieve constant `N − 1 + δ^{-1}` and the wall's address is `ℓ¹ → ℓ²` | Vaaler *Bull. AMS* 12 (1985) §1 [SOURCED]; `sift-limit-attack.md` §4.5, §7e; `import-map-construction.md` line 72 |
| exponent pairs, van der Corput | 2 | the phase carrying the position is `e(−hx/(d₁d₂))`, linear in `x`, so `f'' ≡ 0`, every exponent pair collapses to `(0,1)`, and that is the absolute-value step already priced at `C^{π(z)}` with `C ≈ 2.05` | `sift-limit-attack.md` §4.5, §7e; `IMPORT-MAP.md` row 15 |
| transfer-operator spectral gap | 2 | `a₂ = ∏_{17≤q≤p}(q−3)/(q−2) ≍ 2.82/ln p`, printed 0.10206751799779 at `p = 999,999,999,989`; killer 2's threshold is `ε < 1/W = e^{−(1+o(1))x}`; and `M_J`'s state space truncates at spans `|s| < 2p`, below `G₂` | Holt-Rudd arXiv:1408.6002 §5.1, Table 1, Fig. 3 caption [SOURCED]; `attack-wrongdirection-audit.md` §1 Axis C; `a3-09-histogram-operator.md` |
| martingales, optional stopping on the fold | 2 | the defeating coordinate is `d(q₁)`, the first scour prime's worst-case effect, missing the theorem's own slack by a factor growing like `√N` (174 to 70,576 over `x = 11..23`); the family (McDiarmid, Azuma, Talagrand, Warnke, Kutin, Kim-Vu) is closed with that mechanism | `IMPORT-MAP.md` row 7; `row7-recon.md`; `natal-cap-07-trajectory.js` |
| large deviations, Cramér, Gärtner-Ellis | 2, and 3 at the paying form | no limiting scaled CGF exists for a deterministic per-anchor error; the only ensemble available has an unrun control; and the paying form is Z2 route (b), settled `(ii)` TPC-strength with the sieve half short by `2.393×` at `s = 1.7829` | `attack-roughpair-error.md`; `object-models-read-0829.md`; `attack-wrongdirection-audit.md` §2 item 8, §3.8 |
| Maker-Breaker, positional games | 2 | one player, so the criterion degenerates to its potential function `Σ 2^{−|A|}`, which is the union bound, which is row 3 (Shearer) LANDED and proved tight; the finite optima are already exact from ILP (A072753) | `recon-0828-farfields.md` §3g; `two-class-lower-bounds.js`; `attack2-rankin2d.js`; `U-FRAME.md` §583 |
| renewal theory, Blackwell | 2 | `Z₂(p) = env(p)` with `D(p) ≡ 0`, so `Z₂` is a record process, not a renewal density; and the renewal null is measured-refuted in the light direction at all nine tile levels to `x = 31` | `zonegap-03-model.md` §1; `gap-spectrum-01.md`; `object-models-read-0829.md` §D5 |

**The pattern across the table, stated once.** Eight of the nine rows die on
killer 2 and not on killer 1. That is the opposite of what a reader might expect
from a pass aimed at an exponent: the exponent cap is not what stops these
fields, the quantifier is. The one field with an arithmetic block in front of
the quantifier is Beurling-Selberg, and even there the quantifier is waiting
behind it. This is consistent with `recon-0828-farfields.md`'s finding that half
its candidate list died on one structural sentence, and it is a reason to expect
future far-field passes to bank wall addresses of the same shape and nothing
else.

---

## 6. Provenance ledger

| artifact | what was read | bytes | sha256 |
|---|---|---|---|
| `https://www.ams.org/journals/bull/1985-12-02/S0273-0979-1985-15349-2/S0273-0979-1985-15349-2.pdf` | Vaaler, *Some extremal functions in Fourier analysis*, *Bull. AMS* 12 (1985) 183-216; §1 pp. 183-185 read via `pdftotext`: Beurling's `B(z)`, Selberg's `C_E` and its majorising property, the transform supported on `[−1,1]`, `∫(C_E − χ_E) = 1`, the minorant `c_E`, and the large sieve constant `A(N,δ) = N − 1 + δ^{-1}` with its sharpness; all quoted or paraphrased in §3c | 2157378 | `e606ccef342e72d7e48b59a7da7f8577f72fd351ce32989b23dd85e9e8cd4c1a` |
| `https://arxiv.org/pdf/1408.6002` | Holt and Rudd, *Eratosthenes sieve and the gaps between primes*, full text; §5.1 eigenstructure, the closed form `a_{kj} = ∏_{q=17}^{p_k}(q−j−1)/(q−2)`, Table 1's eight printed values at `p_k = 999,999,999,989` with `p₀ = 13`, the Figure 3 caption, and the "convergence of `a_{k2}` is slow" sentence; all quoted verbatim in §3e | 364025 | `672c4377691ac7f62a4f2942a4fbf1f3f22701d9a4a880e36d5b9ecd2f84ca5c` |
| `https://arxiv.org/abs/1408.6002` | the abstract page, for the record and the authors' own framing of what the recursion is evidence for | 39585 | `bb9282e0fe7654d4bdc6a12f95b0348da246bb1fa2215f3a1e1fa986453b763f` |
| `https://arxiv.org/abs/1003.2978` | Croot and Sisask abstract page; the abstract quoted in §3b, including "without the need for a nice Fourier transform to exist" and the "'local' in nature" clause. The body was NOT opened, so every quantitative statement about Bohr-set rank or radius in §3b stays **[MEMORY]** | 42276 | `f06143467542df303f989234f70ef2b77013866699239b06da9a2f4716249dfc` |

Scratchpad producer: `a2rate.py`, in the session scratchpad, not embedded, not
`qc`-gated, not a repo number. It sieves to `2 × 10⁷` and prints
`a₂ = ∏_{17≤q≤z}(q−3)/(q−2)` and `a₂ · ln z` at `z = 10⁴, 10⁵, 10⁶, 10⁷`. Every
number it produced is `[SCRATCHPAD-GRADE]` and none may be quoted outside this
file until re-derived inside an embedded producer.

Corpus numbers used and never recomputed, per the standing compute rule: the
band `(2, 4.26645]` and the measured exponent `1.50` against the `h₂` control
`1.57` (`object-g2-read-0829.md` §0, `G2-STATE.md` §0); the `εW < 1` threshold
and the `e^{3025}` miss (`paper/wall-note.md` §2 Face 1); `need_sharp/z²` =
0.4913 to 0.6144 (`attack-wrongdirection-audit.md` §2 item 6); `s = 1.7829` and
the `2.393×` shortfall (same, item 8 and §3.8); `u_sup` = 2.0617 to 3.2026 at
`z = 13..43`, the RSS factor 49, and `C ≈ 2.05` per added prime
(`sift-limit-attack.md` §7e); `θ_total ≈ 2.4` to `2.8` at `s = 3.0`,
`u ≈ 2.16` to `2.48`, and `u > 1 + √e = 2.649` decoupled
(`sift-limit-attack.md` §4.5); `d(q₁)` 174 to 70,576 (`IMPORT-MAP.md` row 7);
`T + T = Z/W` and the transform's full support
(`recon-0828-farfields.md` §2a, §3c); A072753's nineteen terms
(`two-class-lower-bounds.js`); `Z₂ = env`, `D ≡ 0`
(`zonegap-03-model.md` §1); the gap-spectrum renewal-null figures
(`gap-spectrum-01.md`).

**Debts this pass may not pay, recorded so the holders can.** This note edits no
existing file, per its fence. Five files have lines owed to them by §3 and §5:
`research/PRIOR-ART.md` and `research/a3-09-histogram-operator.md` (the
Holt-Rudd §5.1 eigenvalues and the `1/ln p` rate, which no file in `research/`
or `paper/` carries, beside the eigenvectors those files already attribute);
`research/SEARCH-CONVENTIONS.md` (two owning-convention rows, "extremal
majorants and minorants" for the L4 Fejér-mass identity, and "cycles of gaps /
eigenstructure of `M_J`" for the histogram operator); `research/IMPORT-MAP.md`
(two draft rows below); and `research/TODO.md` item 0's `Ledger:` line, which
will not carry `Q-recon-0829-farfields2` until its holder adds it, so the
questions gate will say so.

**Two draft rows, proposed and not written, since this pass may not edit the
map.**

- **Row 20 (draft), extremal majorants and minorants.** Theorem: Selberg's
  `C_E` and the large sieve constant `N − 1 + δ^{-1}`, Vaaler *Bull. AMS* 12
  (1985) §1 **[SOURCED]**. Moiré object: the Lemma V sawtooth `r_{d₁,d₂}(x)`.
  Target hole: the position quantifier on `R_H`. Fit: STRONG-ANALOGY at the
  object, blocked arithmetically at the operative `θ_total`. Circularity: SPLIT,
  CLEAN at the mean-square form, TPC-STRENGTH at the sup form. Payoff: CLOSURE +
  PUBLISHED-ANCHOR. Cost: 0.75 h. Status: priced 2026-08-29, not run.
- **Row 21 (draft), the eigenstructure of the gap transfer matrix.** Theorem:
  Holt-Rudd arXiv:1408.6002 §5.1 and Table 1 **[SOURCED, verbatim]**. Moiré
  object: the fold's histogram operator, `a3-09-histogram-operator.md`. Target
  hole: none reached. Fit: EXACT-IDENTITY at the operator, wrong precision and
  wrong functional at the conclusion. Circularity: CLEAN. Payoff:
  PUBLISHED-ANCHOR + WALL-ADDRESS. Cost: 1 h. Status: priced 2026-08-29,
  cross-checked at scratchpad grade.

---

## 7. What would falsify this, and whether that check has run

**§3c's first deciding sentence, that the Selberg error exceeds the window at
the operative point.** Falsified by a level where the ratio of `1/δ` to `H/m`
falls below 1 at a `δ` that removes at least one modulus. That check has **NOT**
run; the sentence is hand arithmetic on a SOURCED identity and a CITED working
point, it has had no second reader, and it is §3c's first experiment. If it
fails, the row reopens at the mean-square form only, and never at the sup form,
because item 6's `(ii)` label is independent of it.

**§3e's anchor, that the eigenvalues are in print and that this corpus carries
the eigenvectors but not the eigenvalues.** Two halves, two different states,
and the second half was already corrected once inside this pass. The in-print
half has run: the closed form and all eight numerical values were read verbatim
at the PDF and are quoted in §3e with the hash in §6. The corpus half has run
as a `grep` over `research/` and `paper/` for `eigenvalue`, `eigenvector`,
`eigenstructure`, `spectral gap`, `mixing` and `Perron`, and it changed the
claim: the first draft of this note said the corpus recorded nothing, which was
wrong, because `PRIOR-ART.md` line 194 attributes the eigenvectors. The
surviving claim is narrower and is what §3e now states. It would still be
refuted by any file carrying a numerical or closed-form eigenvalue of `M_J`
under a name none of those six greps reaches.

**§3e's rate constant `2.8202`.** Falsified by the constant drifting outside
`[2.80, 2.84]` at any larger `z`. The check has run at four decades at
scratchpad grade and passed, with the extrapolation to `10¹²` agreeing with the
printed value to `1.8 × 10⁻⁵`; it has **NOT** run as an embedded producer and
has **NOT** been read by a second person. Nothing in the note's verdict depends
on the constant, only on the `1/ln z` shape, which is Mertens and is not at
issue.

**§3d's phase claim, that the position-carrying phase is linear.** Falsified by
a reading of the Lemma V remainder in which the `x`-dependence is not confined
to `e(−hx/(d₁d₂))`. That check has **NOT** re-run here; it rests on
`sift-limit-attack.md` §4.5's own statement that the reduction was "verified
exactly in BigInt over 2,655 pairs", which is a CITED corpus verification and
not a fresh one.

**§3b's re-entry refusal.** Falsified by a statement in the Croot-Sisask body,
which was not opened, whose conclusion is a count in an interval rather than a
structure in a sumset. The abstract says the results are about iterated product
sets and are "'local' in nature", which points away from that, but the body is
unread and the negative is therefore shallow and marked as such.

**§4's seven one-line rejections.** Each is falsified by a statement of the form
"the moiré object is the foreign object, here is the identification", which is
what re-entry costs under `IMPORT-MAP.md` §0a's regrade rule. None was searched
at more than one conjunction, so each is a shallow negative and is marked as
such rather than as an absence.

**The pass as a whole.** Falsified by any theorem in any of the eight fields
whose hypothesis the tile or the zone satisfies and whose conclusion is one of
the three named shapes. Three channels that could carry such a theorem were not
reached: MathSciNet, zbMATH beyond public search, and any paywalled full text.
The negative is bounded by §1's channels and conventions and by nothing wider.

**The one thing in this note that a reader should not over-read.** §3e banks a
published anchor, not a result. Finding that a 2014 paper printed the
eigenvalues of an operator this corpus rediscovered in 2026 is a prior-art
correction. It moves the exponent band by zero, it moves the `Z₂` state by zero,
and its only forward value is that a future novelty claim about the fold
operator now has one more thing to clear.
