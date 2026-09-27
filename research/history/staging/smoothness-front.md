# smoothness-front — three attacks on the fixed-smooth-profile hypothesis

<!-- ledger
id: Q-smoothness-front
status: PARTIAL
todo: none
question: Do the Vaaler coefficients, a completion or decomposition step, or the Kowalski-Michel-Sawin branch clear the fixed-smooth-profile hypothesis?
verdict: Three verdicts, one route surviving as arithmetic and none as an instrument: the Vaaler coefficients clear Pascadi's condition maximally but buy nothing, because the binding dyadic block is h about 1 where Y_N about N is vacuous; what moves the frontier instead is Theorem A's admissible range (1.5), a hypothesis nobody had read.
-->

*(2026-08-20. Follow-up to `lemmaV-neighbours.md`, which priced the smooth-modulus
branch and named the one hypothesis we violate. This pass works the three exits
that file left open: (1) Pascadi's `Y_N > 1` via the Vaaler coefficients, (2)
manufacturing the smooth profile by a completion/decomposition step, (3) the
algebraic-geometry branch, Kowalski–Michel–Sawin. Calibration legend as in
`lemmaV-neighbours.md`: **[READ-AT-SOURCE]** = statement copied off a rendered
page image; **[SECOND-HAND]**; **[NOT REACHED]**; **[DERIVED HERE]** = an
exponent computation done in this pass, not a custody-bound artifact. No repo
file was edited except this one; nothing committed, nothing pushed.)*

---

## 1. HEADLINE

**Three verdicts, one route survives as arithmetic and none as an instrument.**

**(1) Vaaler → `Y_N > 1`: YES on the hypothesis, NO on the payoff — and the
frontier moves anyway, for a different reason.** The Vaaler coefficients do
clear Pascadi's condition, and generously: on every dyadic block `h ∼ A′` they
are a smooth envelope times a parity twist, which is the `α ∈ {0, 1/2}` case of
his Theorem 2 — whose own statement admits the envelope — so `Y_N ≍ N`, the
maximal value, not merely `> 1`. It buys nothing, because the binding dyadic
block is `h ≍ 1`, where `N ≍ 1` and `Y_N ≍ N` is vacuous. What does move the
frontier is a hypothesis nobody had read: **Theorem A's admissible range (1.5)
is `X ≪ max(1, q/N, q²/N³)`, and the third term supplies `Y_N = max(1, q/N²)`
for arbitrary sequences free**, which is large exactly on the small-`h` blocks
where the Vaaler structure is useless. The affordable rough mass rises from
`H^{0.354437}` to `H^{0.393922}` and the shortfall falls from `H^{0.857720}` to
`H^{0.818235}` **[DERIVED HERE, §3.4]**. The branch stays closed; the corpus's
standing "read ALL the hypotheses" lesson fired in the favourable direction
this time.

**(2) Manufacturing the smooth profile: NO, and the failure is impossibility,
not expense.** The smooth profile is a Fourier-concentration demand — Pascadi
says in print that the `c`-smoothness is *necessary* (it feeds Kuznetsov), and
his own Corollary 18 manufactures its `d`-profile by completing a pure-phase
variable, which works only because smooth means Fourier-concentrated. Our
Rosser factor is Möbius-signed, and Möbius is Fourier-flat: any decomposition
into admissible smooth profiles lives in the low-frequency subspace, whose
share of the weight's mass is `≪_A (log C)^{−A}` for the model (Davenport) and
is MEASURED at the random-sign noise floor for the actual weight — 31 of 31
fixed-`s` slices at `0.57×` to `1.15×` the flat null, against the `≫ 100×` a
usable smooth component would need (§4.3). **The exact blocking term is the
high-frequency remainder `ρ_c = Σ_{|k|>Z^ε} γ̂(k) e(kc/C̃)` of the completed
expansion, which retains `1 − o(1)` of the factor's `ℓ²` mass and is exactly as
inadmissible as the original** (§4.2). The Kloosterman-sum branch (Maynard I
Lemma 18.1 = DI Theorem 9) dies in the same place: completing our rough
`d₁`-sum inflates the dual mass by `(d₂/M₁)^{1/2} = H^{0.106079}`, Weil after
completion lands at `H^{1.318236}`, worse than trivial, and the completed
coefficient depends on the modulus factor the lemma needs free (§4.4).
Completing the `h`-sum instead is circular — it resums Vaaler back to the
sawtooth we started from. And the roughness is not a Rosser artifact: every
sieve weight is `μ`-signed (Selberg's `ρ_d = μ(d)·smooth`), so the obstruction
is inclusion–exclusion itself (§4.5).

**(3) Kowalski–Michel–Sawin: fails on the modulus, by the authors' own
scoping, and even its fantasy is weaker than the standing best.** Both papers
require the modulus to be a single fixed PRIME — KMS 2020 p. 2 says so
verbatim, KMS 2017 §1.5.2 names composite moduli as the open extension, and
Pascadi's own overview says an extension "to general moduli" would still give
savings that are "relatively small". Our `d₂` is the exact opposite arithmetic
— squarefree with every prime factor below `z = H^{1/β₂} ≈ H^{0.2344}`, and
summed over with rough weights, an average their framework does not have. The
kernel fails too: they need `K(mn)` with `K = Kl_k`, `k ≥ 2` (big monodromy),
ours is the ratio `h·\overline{d₁}`, a rank-1 pullback, and any reindexing that
fixes the shape destroys the interval-support hypothesis. Even granting the
fantasy — `d₂` prime, kernel admitted — Theorem 1.1's saving is
`q^{−1/64} = H^{−0.011127}` on the largest block and nothing at all on the
binding `h ≍ 1` block, one third of Bettin–Chandee's standing `H^{−0.035608}`
(§5.3). Not a route.

**Scope, stated once.** Everything here prices the aligned-position necessary
subcase of Lemma V, as `lemmaV-neighbours.md` §5.1 did — the positions
`x ≡ 0 (mod d₁d₂)` where the window factor is identically 1. The sup-over-`x`
quantifier, the true Lemma V gap, is not touched by any instrument on this
front, and the non-aligned window factor `e(−hx/(d₁d₂))` with `x` up to
`exp(H^{0.2344})` would violate the same smoothness hypotheses on its own.

---

## 2. THE OBJECT, RESTATED SO EVERY VERDICT BELOW IS CHECKABLE

From `attack-sqrt-cancellation.md` §§1–2 (cited, not recomputed): `H = z^{β₂}`,
`β₂ = 4.26645028414864191641`; Rosser–Iwaniec weights `λ⁺, λ⁻`, 1-bounded,
supported on squarefree `d | P(z)`; the inverted variable `d₁` to
`D⁺ = H^{0.500000}`, the modulus `d₂` to `D⁻ = H^{0.712157}`, the completed
`h`-sum to `A = H^{0.212157}`. After Vaaler completion and the verified
reciprocity split,

> `R(x) = Σ_{0<|h|≤A} c_h Σ_{d₁,d₂} λλ · e(−hx/(d₁d₂)) · e(−2h·\overline{d₁}/d₂)`,

and Lemma V needs `sup_x |R(x)| ≪ H/log³H`. Splitting `h` into `O(log H)`
dyadic blocks `h ∼ A′`, it suffices that every block is `≪ H^{1−o(1)}`, and at
the aligned positions each block bound is necessary. The per-block
identification into the DI/Pascadi index, from `lemmaV-neighbours.md` §5.1:
`n = 2h`, `N ≍ A′`, `|c_h| ≍ 1/A′` on the block; `d₁ = d·r` with `r ∼ R = H^ρ`
rough and `d ∼ D = H^{0.5−ρ}` smooth-profiled; `d₂ = c·s` with `s ∼ S = H^σ`
rough and `c ∼ C = H^{0.712157−σ}` smooth-profiled; the rough factors ride in
`w_{r,s}` (1-bounded), giving `‖w_{r,s}A_{N,r,s}‖₂² ≍ RS/A′`. `(ρ, σ) =
(0.500000, 0.712157)` is our actual object; the frontier question is how much
rough mass `ρ + σ` a theorem tolerates before some block exceeds `H^1`.

One convention note for `n = 2h`: the parity restriction is not smooth, but
`1_{2|n} = (e(n·0) + e(n·½))/2` splits any parity-supported sequence into two
full-support sequences at the cost of a factor 2, and Assumption 14 survives
finite sums (Cauchy–Schwarz on (5.17)'s left side, `Y` the minimum of the
parts). Every `Y_N` claim below is made through that split.

---

## 3. THREAD 1 — Pascadi's full hypothesis list, and whether Vaaler coefficients buy `Y_N > 1`

*(All statements in this section were read off pages rendered from the PDF of
record, arXiv:2404.04239v3, fetched from `export.arxiv.org` this session —
pdfinfo: 51 pages, title matching Forum Math. Pi 14 (2026) e8. Page numbers are
the printed ones, which coincide with PDF page indices in this file.)*

### 3.1 The complete hypothesis list of Corollary 18, from page images

**[READ-AT-SOURCE, pp. 37–38.]** Corollary 18 ("Incomplete Kloosterman bounds
with averaging over `r, s, n, c, d`") assumes, completely:

1. **Parameters.** `R, S, N ≥ 1/2`; `C, D, Z ≫ 1`; `Y_N > 0`; `ε > 0`.
2. **Coprimality of the rough factors.** The outer sum runs over `r ∼ R`,
   `s ∼ S` with `gcd(r, s) = 1`; the inner over `c, d` with `(rd, sc) = 1`.
3. **The large-sieve tuple.** For each such `(r, s)`, the tuple
   `(rs, N, Z, (a_{n,r,s})_{n∼N}, A_{N,r,s}, Y_N)` satisfies Assumption 14
   (§3.2). One `Y_N` serves every pair; `q = rs` throughout.
4. **Rough weights.** `w_{r,s} ∈ ℂ`, arbitrary; the `(a_{n,r,s})` arbitrary
   subject only to item 3.
5. **The smooth profile.** `Φ_{r,s} : (0,∞)³ → ℂ` smooth, `Φ_{r,s}(x,y,z)`
   supported in `x, y, z ≍ 1`, and
   `∂_x^j ∂_y^k ∂_z^ℓ Φ_q(x,y,z) ≪_{j,k,ℓ,ε} Z^{jε}` for `j,k,ℓ ≥ 0`. **The
   exponent is `jε`: only the `x = n/N` derivatives may grow with `Z`. The
   `y = d/D` and `z = c/C` derivatives must be bounded uniformly in every
   parameter** — this asymmetry is load-bearing for §4 (Corollaries 16 and 17
   allow `Z^{(j+k)ε}`; 18 does not).
6. **Sign consistency.** One `±` sign for all terms, in
   `e(±n·\overline{rd}/(sc))`.
7. **The conclusion.** The five-fold sum is
   `≪_ε (RSNCDZ)^{O(ε)} ‖w_{r,s} A_{N,r,s}‖₂ · ℐ` with
   `ℐ² := D²NR + (1 + C²/(R²SY_N))^{2θ_max} CS(C + DR)(RS + N)`, where
   `θ_max ≤ 7/64` (Kim–Sarnak, his Theorem C, p. 30), so `2θ_max ≤ 7/32`.
8. **Norm convention** (Remark, p. 36, for (5.31)/(5.32) and inherited here):
   `‖w_{r,s}A_{N,r,s}‖₂` is a norm over the index `(r, s)` only, not over `n`.

Its proof (p. 38) is one step from Corollary 17's (5.32): "completing
Kloosterman sums, passing from the `d`-variable to a variable `m` of size
`≪_ε (CDS)^ε CS/D`", plus the note that DI Theorem 12 "has a minor error
(replacing `D²NR` with `D²NRS^{−1}`), which has been corrected in [5]" —
`[5]` being Maynard I, whose Lemma 15.1 we re-read at source (§4.4).

### 3.2 Assumption 14 verbatim, and the routes to `Y_N > 1` Pascadi provides

**[READ-AT-SOURCE, p. 31, re-rendered at 200 dpi for this file.]**

> **Assumption 14** (Large sieve for the tuple `(q, N, Z, (a_n)_{n∼N}, A_N,
> Y_N)`). *This applies to complex sequences `(a_n)_{n∼N}` and parameters
> `q ∈ ℤ₊`, `N ≥ 1/2`, `Z ≫ 1`, `A_N ≫ ‖a_n‖₂`, `Y_N > 0`. For any `ε > 0`,
> `ξ ∈ ℝ`, any cusp `𝔞` of `Γ₀(q)` with `μ(𝔞) = q^{−1}` and `σ_𝔞` chosen as in
> (3.9), and any orthonormal basis of Maass cusp forms for `Γ₀(q)`, with
> eigenvalues `λ_j` and Fourier coefficients `ρ_{j𝔞}(n)`, one has*
>
> `Σ_{λ_j<1/4} X^{2θ_j} |Σ_{n∼N} e(nξ/N) a_n ρ_{j𝔞}(n)|² ≪_ε (qNZ)^ε (1 + N/q) A_N²`  (5.17)
>
> *for all `X ≪ max(1, q/N) · Y_N/(1+|ξ|²)`.*

His worked example, same page, verbatim: "For example, Theorem A shows that
the tuple `(q, N, 1, (a_n)_{n∼N}, ‖a_n‖₂², 1)` satisfies Assumption 14 for any
`q ∈ ℤ₊`, `N ≥ 1/2` and any complex sequence `(a_n)_{n∼N}`; attaining higher
values of `Y_N` requires more information about `(a_n)`." And the two supplied
routes to more:

- **(5.18):** `a_n := e(nα)`, `Y_N := N/T_N(α) ≫ √N`, `A_N := √N`, "for any
  `α ∈ ℝ/ℤ` and `q ∈ ℤ₊`, `N ≥ 1/2`, `Z = 1`; note that the phase `ξ/N` can be
  incorporated into `α`, and we implicitly used that
  `T_N(α + ξ/N) ≪ (1+|ξ|²) T_N(α)` by (4.3)." Here
  `T_N(α) ≍ min_{t∈ℤ₊}(t + N‖tα‖)` (p. 29).
- **(5.19):** the dispersion-shaped `a_n = Σ_{h₁ℓ₁−h₂ℓ₂=n} Φ₁(h₁/H)Φ₂(h₂/H)
  e(h₁α₁+h₂α₂)`, with `Y_N := max(1, NH/((H+L)L·min_i T_H(α_i)))`.

**And the two hypotheses behind them, from pp. 3–4 [READ-AT-SOURCE]:**

> **Theorem A** (Large sieve with general sequences [9 = DI 1982]): (1.4) is
> (5.17) without the twist, for any complex sequence, **for any
> `X ≪ max(1, q/N, q²/N³)`** (1.5).
>
> **Theorem 2** (Large sieve with exponential phases): (1.6) holds for all
> `X ≪ max(N, q/a)/min_{t∈ℤ₊}(t + N‖tα‖)` (1.7), and — verbatim — "*The same
> result holds if `e(nα)` is multiplied by `Φ(n/N)`, for any smooth function
> `Φ : (0,4) → ℂ` with `Φ^{(j)} ≪_j 1`.*"

Two consequences the corpus had not extracted:

- **(i) Smooth envelopes are the `α = 0` point of (5.18).** With `α = 0`,
  `T_N(0) = 1` (take `t = 1`), so Theorem 2 with its envelope clause gives
  `Y_N ≍ N` — the largest value the definition can carry — for any sequence of
  the form `Φ(n/N)`, at `a = 1`, any `q`.
- **(ii) Theorem A itself gives more than `Y_N = 1` whenever `q > N²`.**
  Theorem A is uniform in the twist (the twist absorbs into the arbitrary
  sequence at the same `‖·‖₂`), so Assumption 14 holds with
  `Y_N := max(1, q/N, q²/N³)/max(1, q/N) = max(1, q/N²)` for `q ≥ N`, for
  **arbitrary** sequences. Pascadi's example paragraph quotes only the
  `Y_N = 1` tuple — presumably because his own application lives at `N ≍ √q`,
  where `q/N² ≍ 1` and the third term is dead. Ours does not: on the binding
  small-`h` blocks `q/N² ≍ RS/A′²` is a positive power of `H`.

### 3.3 What the Vaaler coefficients actually are

Vaaler's approximation to the sawtooth `ψ(x) = {x} − 1/2` (Vaaler 1985; the
form used here is Graham–Kolesnik, *Van der Corput's Method*, Theorem A.6
**[SECOND-HAND** — the primary was not opened this pass; the corpus's use in
`attack-sqrt-cancellation.md` §2 is the same statement**]**): there is a
trigonometric polynomial `ψ*(x) = Σ_{1≤|h|≤A} c_h e(hx)` with
`|ψ − ψ*| ≤ Σ_{|h|≤A} (A+1)^{−1}(1 − |h|/(A+1)) e(hx)` and

> `c_h = (2πih)^{−1} Ĵ(h/(A+1))`, `Ĵ(t) = πt(1−t)cot(πt) + |t|` on `[−1, 1]`.

`Ĵ` extends real-analytically to `[0, 1]` (`πt·cot(πt)` is analytic at 0;
`(1−t)/sin(π(1−t))` is analytic at 1), so on any dyadic block `h ∼ A′ ≤ A`,

> `c_h = (1/A′)·φ_{A′}(h/A′)`, `φ_{A′}(u) := (A′/h)·Ĵ(h/(A+1))/(2πi)|_{h=uA′}`,

with `φ_{A′}^{(j)} ≪_j 1` **uniformly in `A′` and `A`**: the `1/h` factor
contributes `≪_j 1` in `u ∈ [1, 2)` and `Ĵ`'s derivatives against `h/(A+1)`
enter scaled by `(A′/(A+1))^j ≤ 1`. The Fejér majorant's coefficients
`(A+1)^{−1}(1 − |h|/(A+1))` are linear in `h` on either half — smoother still.
**So on each block, `a_n = c_{n/2}` is (smooth envelope) × (parity comb), and
after the §2 parity split it is exactly the object of Theorem 2's envelope
clause at `α ∈ {0, 1/2}`: `T_N(0) = 1`, `T_N(1/2) ≤ 2`, hence**

> **`Y_N ≍ N` for the Vaaler coefficients, on every dyadic block. The
> condition `Y_N > 1` is cleared, maximally, with no additional structure
> needed.** `A_N ≍ ‖a‖₂ ≍ A′^{−1/2}` (Assumption 14 is homogeneous in
> `(a_n, A_N)`, so the sub-unit normalisation is harmless).

### 3.4 The frontier at `Y_N > 1`, recomputed

**[DERIVED HERE**, scratch calculator, formulas reproduced in full below so the
proposed repo script can carry them; four calibration checks against
`lemmaV-neighbours.md` §5 all reproduce exactly.**]**

Per block `h ∼ A′ = H^{a′}`, `a′ ∈ [0, 0.212157]`, with `δ_D = 0.5 − ρ`,
`δ_C = 0.712157 − σ`, the squared Corollary-18 bound in exponents of `H`:

    pre = ρ + σ − a′                     (‖w A_N‖₂², items 3–4, 8)
    T1  = pre + 2δ_D + a′ + ρ            (D²NR)
    T2  = pre + (7/32)·max(0, 2δ_C − 2ρ − σ − y) + δ_C + σ
              + max(δ_C, δ_D + ρ) + max(ρ+σ, a′)   (exceptional × CS(C+DR)(RS+N))

where `y` is the exponent of `Y_N`. The frontier is the largest `σ` (at given
`ρ`) with `max(T1, T2) ≤ 2` for **every** `a′` in the range. The available `y`:

| source | `y` | where it is large |
|---|---|---|
| example tuple (`Y_N = 1`, the lemmaV reading) | `0` | nowhere |
| Vaaler smoothness via Theorem 2 / (5.18), §3.3 | `a′` | large-`h` blocks |
| Theorem A's third range term, §3.2(ii) | `max(0, ρ+σ−2a′)` | small-`h` blocks |
| both (Assumption 14 takes the max of certified values) | `max(0, a′, ρ+σ−2a′)` | all but `a′ ≈ (ρ+σ)/3` |

Calibration (must-match rows): DI frontier at `ρ = 0` returns `σ = 0.151372`;
Pascadi at `Y_N = 1` returns `0.354437`; the full-rough worst block returns
exponent `1.818235`; the all-smooth fantasy returns `0.867941` (Pascadi) and
`0.962157` (DI). All four match `lemmaV-neighbours.md` §5 to the printed digit.

Results, `ρ = 0` (optimal there and on a flat ridge `ρ + σ = const` up to
`ρ ≈ 0.145`):

| `Y_N` used | frontier `σ_max` | affordable rough mass | shortfall vs `H^{1.212157}` |
|---|---|---|---|
| `1` (lemmaV) | 0.354437 | `H^{0.354437}` | `H^{0.857720}` |
| `≍ N` (Vaaler only) | **0.354437 — unchanged** | `H^{0.354437}` | `H^{0.857720}` |
| `max(1, q/N²)` (Thm A only) | 0.393922 | `H^{0.393922}` | `H^{0.818235}` |
| both | **0.393922** | **`H^{0.393922}`** | **`H^{0.818235}`** |

**Why the Vaaler smoothness moves nothing:** at `Y_N = 1` the binding block is
already `a′ = 0` (for `σ ∈ [0.212157, 0.4748]`, `T2 = 1.523726 + 1.34375σ` at
`a′ = 0`, giving exactly `σ ≤ 0.354437`), and there `Y_N ≍ N ≍ 1` is the
`Y_N = 1` reading again. The smoothness route helps precisely the blocks that
were not binding. Theorem A's term is large exactly where the Vaaler term is
not (`y = σ − 2a′` at `ρ = 0`), and the two together leave one thin worst
band near `a′ ≈ σ/3` (where `y = σ/3`), which is what stops the frontier at
0.393922 rather than higher: at `σ = 0.393922` the constraint is tight at
`a′ = 0` (`T2 = 2.000`, exceptional factor already dead there since
`1.424314 − 4σ < 0`) and slack everywhere else.

**What would be needed instead.** Reaching `σ = 0.712157` at `ρ = 0` needs
`T2 ≤ 2` at `a′ = 0` with the exceptional factor dead, i.e.
`2σ + 1.212157 ≤ 2`: impossible past `σ = 0.393921` **whatever `Y_N` is** —
the post-exceptional main term `CS(C+DR)(RS+N)`, not the exceptional
spectrum, is now the binding object. So the `Y_N` axis is exhausted: **no
coefficient structure of any kind moves the frontier past 0.393922 in this
theorem; further progress must change the main term `CS(C+DR)(RS+N)` itself,
which is DI's regular-spectrum count, not a hypothesis.**

### 3.5 Verdict

**Thread 1 verdict: the hypothesis `Y_N > 1` is cleared at its maximum
(`Y_N ≍ N`, via Theorem 2's envelope clause at `α = 0` after a parity split),
the unread third term of Theorem A's range clears more where it matters, the
frontier moves 0.354437 → 0.393922 and the shortfall `H^{0.857720}` →
`H^{0.818235}` — and the branch stays closed, now with the `Y_N` axis
exhausted rather than unexplored: the binding term is the regular spectrum's
main term, which no property of our coefficients touches.**

---

## 4. THREAD 2 — can a completion step MANUFACTURE the smooth profile?

### 4.1 What the smooth profile is consumed by, in the proofs

Two sightings, both **[READ-AT-SOURCE]**, fix what "smooth" is FOR — and they
say it is Fourier concentration, which is what makes §4.2 decisive.

- Pascadi, Remark on p. 32, verbatim: "*While the smooth weight in the `c`
  variable is necessary here (stemming from Proposition E), the smooth weight
  in `n` only confers additional flexibility.*" The `c`-profile feeds the
  Kuznetsov trace formula (his (5.21)–(5.22): the profile is Fourier-expanded
  and its transform's decay `∂_y^k Ψ̂(ξ;y) ≪ Z^{O(ε)}/(1+ξ⁴)` is what makes
  the `ξ`-integral converge). Not a convenience — his word is *necessary*.
- Pascadi, proof of Corollary 18, p. 38: the `d`-profile exists because the
  `d`-variable is MANUFACTURED by completion from Corollary 17's pure-phase
  `m`-variable, "passing from the `d`-variable to a variable `m` of size
  `≪_ε (CDS)^ε CS/D`". Completion of a smooth-weighted sum is cheap because
  the smooth weight's Fourier dual is supported on `≈ CS/D` frequencies.

So both smooth-profile hypotheses are one demand: **the factor's Fourier mass
must sit on few frequencies.** The question "can a completion step manufacture
the smooth profile from our 1-bounded well-factorable factors" is therefore
the question "is the Rosser factor's Fourier mass low-frequency-concentrated",
and that has an unconditional answer for the model and a measured one for the
actual weight.

### 4.2 The decomposition, worked explicitly

Fix the `c`-slot (the `d`-slot is identical with `CS/D` in place of the cutoff).
The candidate factor is `γ = (γ_c)_{c∼C}`, 1-bounded — Iwaniec
well-factorability delivers exactly this and no more. Write `C̃ ≍ C` for the
block length and expand over the full additive dual, which IS the completion
step:

> `γ_c = Σ_{k mod C̃} γ̂(k) e(kc/C̃)`,  `γ̂(k) = C̃^{−1} Σ_{c∼C} γ_c e(−kc/C̃)`,
> Parseval: `Σ_k |γ̂(k)|² = C̃^{−1} Σ_c |γ_c|² =: m_γ` (the mean square).

**What the theorems can eat.** An admissible profile — Corollary 18 item 5
(`y, z`-derivatives bounded uniformly, no `Z`-growth), or Lemma 6.12's fixed
`g₀` — has `|⟨Φ(·/C), e(k·/C̃)⟩| ≪_A C(1+|k|)^{−A}` by partial summation: its
span is, up to `A`-decay tails, the low-frequency subspace
`V_K = span{e(k·/C̃) : |k| ≤ K}` with `K = O(Z^ε)`. A manufactured
decomposition `γ_c = Σ_j t_j Φ_j(c/C) + ρ_c` therefore has its smooth part in
`V_K` up to negligible tails, **whatever the coefficients `t_j` cost**, and

> `‖P_{V_K} γ‖₂²/‖γ‖₂² ≤ K·max_{|k|≤K}|γ̂(k)|² / m_γ`.

**The model, unconditional.** The Rosser weights are `λ_d = μ(d)·1_{𝒟}(d)`
(Möbius times the support indicator); take the model factor `γ_c = μ(c)` on
the block. Davenport's theorem gives `|Σ_{c≤x} μ(c) e(cθ)| ≪_A x(log x)^{−A}`
uniformly in `θ ∈ ℝ`, so `max_k |γ̂(k)| ≪_A (log C)^{−A}` and

> `‖P_{V_K} γ‖₂²/‖γ‖₂² ≪_A K (log C)^{−2A}` — the smooth-projectable share of
> a Möbius-signed factor is smaller than every power of log, at every
> admissible `K`.

**The exact blocking term.** The remainder of the completed expansion,

> `ρ_c = Σ_{|k| > K} γ̂(k) e(kc/C̃)`,

carries `1 − O_A(K(log C)^{−2A})` of the factor's `ℓ²` mass, and it is exactly
as inadmissible as `γ` itself: high-frequency by construction, so item 5's
derivative condition fails for it by the same margin `γ` failed it. The
manufacture does not cost too much — **it produces nothing: the smooth part is
empty and the remainder is the original problem.** This is the reverse face of
Pascadi's own completion in §4.1: smooth ⇒ dual concentrated ⇒ completion
cheap; Möbius-signed ⇒ dual flat ⇒ completion returns the full dual, verbatim.

### 4.3 The measurement, on the actual weight

The model above is `μ` on an interval; the actual factor is a fixed-`s` slice
`c ↦ λ⁺_{sc}` of the Rosser weight, whose support condition couples `s` and
`c`, so the flatness was measured rather than asserted. **[MEASURED**, scratch
scripts `sf-rosser-dft2.js`, `sf-rosser-slices.js` in this session's shared
scratchpad; construction: `λ⁺_d = μ(d)1_{𝒟⁺}(d)`, `𝒟⁺ = {d = p₁⋯p_r : z >
p₁ > ⋯ > p_r, p₁⋯p_{2ℓ}p_{2ℓ+1}³ ≤ D ∀ℓ}`, at `z = 101`,
`D = z^{3.038} = 1,227,802` — the per-side level of §2 in `z`-currency; support
3,570 elements; not custody-bound, §6 proposes the repo script.**]**

- **Aggregated weight**, per occupied dyadic block (the three heaviest,
  `2^13`–`2^16`; the top blocks near `D` are empty — the Rosser condition
  thins the support before `D` is reached): low-frequency mass fraction
  `Σ_{1≤k≤64}|γ̂(k)|²/m_γ` = 5.6e−3, 2.3e−3, 1.4e−3 against flat-null
  (`K/C̃`) 7.8e−3, 3.9e−3, 2.0e−3 — **at or below noise in all three**.
- **Fixed-`s` slices** — the object the violated hypothesis is actually about:
  all 31 squarefree `s ∈ [64, 128)` with ≥ 120 slice elements, each slice's
  heaviest dyadic `c`-block, `K = 32`: low-mass fraction over flat-null runs
  **0.57 to 1.15, median 0.82**; largest single `|γ̂(k)|` over the random-sign
  benchmark runs 1.36 to 2.42. A usable smooth component would need the
  low-mass ratio at the scale `C̃/K ≫ 100`. **Every slice sits at the noise
  floor.**

### 4.4 The Kloosterman-sum branch: Maynard I Lemma 18.1 (DI Theorem 9)

**[READ-AT-SOURCE**, arXiv:2006.06572v2 PDF pp. 68–69, rendered pages;
Lemma 15.1 re-read at p. 54 and it matches the corpus's quote, including the
`D²NR/S` typo note.**]** Verbatim:

> **Lemma 18.1** (Deshouillers–Iwaniec Bound). *Let `b_m, a_n` be complex
> sequences, and let `g` be a smooth function with `‖g^{(j)}‖_∞ ≪_j 1`. Let
> `r ∈ [R, 2R]`, `s ∈ [S, 2S]` and let `θ_q = max(0, 1 − 4λ₁(q))`, where
> `λ₁(q)` is the least eigenvalue of the congruence subgroup `Γ₀(q)`. We have*
>
> `Σ_{m∼M} b_m Σ_{n∼N} a_n Σ_{(c,r)=1} g(c/C) S(m\overline{r}, n; sc)`
> `≪ x^{o(1)} (1 + √(S²C²R/(MN)))^{θ_{rs}} ‖b_m‖‖a_n‖ (S²RC² + MN + SMC² + SNC² + MNC²/R)^{1/2}.`
>
> **Lemma 18.2** (Kim–Sarnak eigenvalue bound). *Then `θ_q ≤ 7/32`.*

*(Normalisation note, for the record: `max(0, 1 − 4λ₁)` and the bound `7/32`
are consistent only under the reading `θ_q = (1 − 4λ₁)^{1/2}` — Kim–Sarnak is
`λ₁ ≥ 1/4 − (7/64)²`, so `1 − 4λ₁ ≤ 49/1024` while `√(1−4λ₁) ≤ 7/32` — and
then `θ_{rs} = 2θ_max^{Pascadi}`, matching Corollary 18's `2θ_max ≤ 7/32`
exactly. Also `lemmaV-neighbours.md` §4.2 restated the exceptional factor as
`(1 + S²C²R/(MN))^{θ_{rs}}`, dropping the inner square root; since
`(1+√x)² ≍ 1+x`, the two agree up to constants, but the printed form is the
one above.)*

This is the only family member tolerating **two** rough sequences, so the
route is: complete our rough `d₁`-sum modulo `d₂` to reach Kloosterman sums.
The completion identity, exactly:

> `Σ_{d₁∼M₁} λ_{d₁} e(−2h·\overline{d₁}/d₂) = d₂^{−1} Σ_{b mod d₂} λ̃(b)·S(−2h, −b; d₂)`,
> `λ̃(b) := Σ_{d₁∼M₁} λ_{d₁} e(bd₁/d₂)`,

by detecting `d₁ ≡ x (mod d₂)` additively and recognising
`Σ_x^* e((−2h x̄ − b x)/d₂) = S(−2h, −b; d₂)`. Three failures, in order of
finality:

1. **The dual mass inflates by `(d₂/M₁)^{1/2}`.** Parseval:
   `Σ_{b mod d₂} |λ̃(b)|² = d₂ · Σ_{d₁} |λ_{d₁}|² ≍ d₂M₁` (`M₁ ≤ d₂`, no
   wraparound), and for a Fourier-flat `λ` (§4.3) this mass is spread over all
   `d₂` frequencies: the effective coefficient norm grows from `M₁^{1/2}` to
   `(d₂M₁)^{1/2}` against the `d₂^{−1}` prefactor and a `b`-sum now of length
   `d₂`. The completion is lossy by exactly the ratio by which the modulus
   exceeds the summation range: `(d₂/M₁)^{1/2} = H^{(0.712157−0.5)/2} =
   H^{0.106079}`.
2. **Weil after completion, priced.** With `|S(−2h,−b;d₂)| ≤ d₂^{1/2+ε}` and
   `Σ_h |c_h| ≪ log`, Cauchy–Schwarz on the dual gives
   `Σ_b |λ̃(b)| ≤ d₂^{1/2}(Σ_b|λ̃(b)|²)^{1/2} = d₂^{1/2}(d₂M₁)^{1/2} = d₂M₁^{1/2}`,
   so per `d₂` the completed bound is
   `d₂^{−1}·(Σ_h|c_h|)·(Σ_b|λ̃(b)|)·d₂^{1/2} ≍ d₂^{1/2}M₁^{1/2}·log`, and
   summed over `d₂ ≤ D⁻` with 1-bounded `λ_{d₂}`:
   `≍ (D⁻)^{3/2}M₁^{1/2} = H^{1.068236 + 0.25} = H^{1.318236}`
   **[DERIVED HERE]** — worse than the trivial `H^{1.212157}` by exactly the
   item-1 inflation `H^{0.106079}`. The classical fact that Weil is dead when
   the modulus exceeds the range, now with our coordinates on it.
3. **Lemma 18.1 does not accept the completed form anyway, twice.** Its
   modulus is `sc` with the `c`-average smooth-weighted — the same violated
   hypothesis, back — and its `a_n` must not depend on `c`, while our
   `λ̃(b)` depends on the modulus `d₂ = sc` through `e(bd₁/(sc))`: the dual
   variable's meaning changes with the variable the lemma needs free. No
   reindexing removes this: `b/d₂` is the honest variable and it is glued to
   the modulus.

**And the reverse completion is circular.** Completing the `h`-sum instead
(the one variable whose coefficients ARE smooth, §3.3) is free by exactly the
§4.1 mechanism — and returns `Σ_h c_h e(−2ht/d₂) = ψ*(2t/d₂)`, the Vaaler
polynomial of the sawtooth at `t = \overline{d₁} mod d₂`: the completed object
is the interval-count remainder we Vaaler-expanded in the first place.
`R(x)` is a fixed point of that completion, not a beneficiary.

### 4.5 Verdict

**Thread 2 verdict: NO. A completion/Vaaler decomposition cannot manufacture
the smooth profile, and the failure is structural: admissible profiles span
the low-frequency subspace, and the well-factorable factors are Möbius-signed,
hence Fourier-flat — `≪_A (log C)^{−A}` per frequency for the model
(Davenport), measured at the noise floor for the actual weight (31/31 slices,
§4.3). The exact blocking term is the high-frequency remainder
`ρ_c = Σ_{|k|>Z^ε} γ̂(k)e(kc/C̃)`, which keeps `1 − o(1)` of the mass and
re-poses the original sum. The Kloosterman-sum escape (Lemma 18.1) loses
`H^{0.106079}` to dual-mass inflation before it starts and then fails two of
its own hypotheses; the reverse completion is the identity.**

Two boundary remarks, so the closure is not overread. (i) The obstruction is
about REGROUPING the existing weights. It does not forbid replacing the sieve
itself by one with smooth-by-construction weights — but every upper-bound
sieve weight in existence is `μ`-signed (Selberg's `ρ_d = μ(d)·(smooth in
log d)`: the smooth part is there and the `μ` stays), because the sign IS
inclusion–exclusion; a sieve without it is not a sieve. What one could trade
is level against smoothness via the fundamental lemma at `u ≈ 3.04` per side —
whose main-term loss at `κ = 2` destroys the `β₂` optimisation that defines
the working point. Not priced further here (§7). (ii) At non-aligned `x` the
window factor `e(−hx/(d₁d₂))` has `c`- and `d`-derivatives of size
`≍ hx/(d₁d₂) → ∞`, so even a genuinely smooth weight would violate item 5 off
the aligned positions — the quantifier gap outranks the smoothness gap on this
front, as it does everywhere else in Lemma V.

---

## 5. THREAD 3 — Kowalski–Michel–Sawin, hypothesis by hypothesis

*(Both papers fetched from `export.arxiv.org` this session and read from
rendered pages: KMS 2017 = arXiv:1511.01636v5, 66 pp., = Ann. of Math. (2) 186
(2017) 413–500; KMS 2020 = arXiv:1802.09849v5, 58 pp., = Ann. SNS Pisa (5) 21
(2020) 1453–1530. `lemmaV-neighbours.md` §10 listed both as "identified, not
fetched"; that item is now discharged.)*

### 5.1 The 2017 Annals paper: what it bounds and what it requires

**[READ-AT-SOURCE, pp. 1–8.]** The object is `B(K, α, β) = Σ_m Σ_n α_m β_n
K(mn)` — note the **product** `mn` inside the kernel. The two main theorems:

> **Theorem 1.1** (General bilinear forms). *Let `q` be a PRIME. Let `c` be an
> integer coprime to `q`. Let `M, N` be real numbers such that `1 ≤ M ≤
> Nq^{1/4}`, `q^{1/4} < MN < q^{5/4}`. Let `𝒩 ⊂ [1, q−1]` be an INTERVAL of
> length `⌊N⌋` and let `α = (α_m)_{m≤M}`, `β = (β_n)_{n∈𝒩}` be sequences of
> complex numbers. For any `ε > 0`:*
> `B([×c]*Kl_k, α, β) ≪ q^ε ‖α‖₂‖β‖₂ (MN)^{1/2} (M^{−1/2} + (MN)^{−3/16} q^{11/64})`.
>
> **Theorem 1.3** (Special bilinear forms, `β = 1_𝒩`): `1 ≤ M ≤ N²`, `N < q`,
> `MN < q^{3/2}`, `α` 1-bounded:
> `≪ q^ε ‖α‖₁^{1/2}‖α‖₂^{1/2} M^{1/4} N (M²N⁵/q³)^{−1/12}`.

Hypotheses, complete: (i) `q` prime; (ii) kernel `[×c]*Kl_k` — the
hyper-Kloosterman sum, defined "for `k ≥ 2`" (p. 2), with fixed twist `c`;
(iii) coefficients arbitrary but **each supported on an interval** (`m ≤ M`,
`n ∈ 𝒩`); (iv) the stated ranges; (v) the machinery (§1.6): `K` the trace
function of a geometrically irreducible middle-extension sheaf of weight 0,
bounded conductor, and — for (1.7) — "bountiful" in the FKM sense; the whole
proof is the `+ab` shift of Vinogradov–Karatsuba plus complete-sum bounds from
Deligne. Calibration remarks read off the same pages: the saving at
`M = N = q^{1/2}` is `q^{−1/64+ε}` (Remark 1.2); nontrivial only from
`M = N ≥ q^{11/24}` up.

§1.5.1 (extensions): Fouvry–Michel [FM98] handled rational phase functions
`K_f(n) = e_q(f(n))` with `f ∈ F_q(X)` "not a polynomial of degree ≤ 2" (type
I) and quasi-monomials `f = aX^d + bX`, `a ∈ F_q^×`, `d ∈ ℤ − {0,1,2}` (type
II). §1.5.2 (composite moduli), verbatim:

> "In this paper, we have focused our attention on bilinear forms associated
> to functions `K` which are periodic modulo a prime `q`. This is in some
> sense the hardest case, but nevertheless it would be very useful for many
> applications to have bounds similar to those of Theorems 1.3 and 1.1 when
> the modulus `q` is arbitrary, or at least squarefree."

That is the authors naming our modulus arithmetic as the open problem.

### 5.2 The 2020 Pisa paper: what generalizes and what does not

**[READ-AT-SOURCE, pp. 1–5.]** What generalizes: the kernel (to
character-twisted generalized Kloosterman sums `Kl_k(x; χ, q)` with Property
NIO, `k ≥ 2`) and the range (Theorem 1.2: `M, N ≥ q^δ`, `MN ≥ q^{3/4+δ}` gives
saving `(MN)^{−η}`, `η = η(δ)` unspecified — the full FM98-conjectured range).
What does NOT generalize, verbatim from p. 2:

> "When the modulus `q` is composite, a number of techniques exploiting the
> possibility of factoring `q` (starting with the Chinese Remainder Theorem)
> become available, and results exist in fair generality. **In this paper, we
> will only consider the case where `q` is a prime**, and when `K` is a trace
> function."

The kernel is still `Kl_k(amn; χ, q)` — the product `mn`, fixed prime `q`,
fixed twist `a ∈ F_q^×`; the method is again `+ab` shifting (§1.3), now with a
stratification/vanishing-cycles comparison replacing KMS 2017's explicit
cohomology. The extension they envisage (p. 4) is to trace functions in a
family `K_a` with `K_{a^μ}(x) = K(a^ν x)` and "suitable big monodromy
assumptions" — a rank-≥-2 condition in all but name. And the third-party
scoping, Pascadi p. 6 **[READ-AT-SOURCE]**, verbatim: "an extension of the
work of Kowalski–Michel–Sawin [29] to general moduli should improve Theorem A
in the critical range `q ≈ N²`, but even then the final numerical savings
would be relatively small."

### 5.3 Our `(h, d₁, d₂)` pattern against their hypotheses

| their hypothesis | our object | fit |
|---|---|---|
| modulus: one FIXED prime `q` | `d₂ \| P(z)`: squarefree, `P⁺(d₂) < z = H^{1/β₂} ≈ H^{0.2344}` — no large prime factor exists anywhere in it; and `d₂` is SUMMED over with rough 1-bounded `λ_{d₂}` | **fails twice**: wrong arithmetic (the spectral branch wants a smooth factor, this branch wants a prime; ours is smooth-composite, the far end from both), and their framework has no modulus average at all |
| kernel `K(mn)`, `K = Kl_k`, `k ≥ 2` (2017) / NIO-twisted, `k ≥ 2` (2020), big monodromy | our phase is `e_{d₂}(2h·\overline{d₁})` — the RATIO `h·d₁^{−1}`, a rank-1 Artin–Schreier pullback | **fails**: `h·\overline{d₁} = h²·\overline{hd₁}` rewrites it as `K(mn)` only with a twist `[×2m²]` that varies with `m` (their `c`, `a` are fixed); substituting `n → n̄` fixes the shape but scatters the interval support |
| both variables supported on intervals | `h ∼ A′` interval ✓; `d₁ ∼ M₁` interval ✓ — but see kernel row: the fit that repairs the kernel destroys this row, and vice versa | **jointly unsatisfiable** with the kernel row |
| ranges `q^{1/4} < MN < q^{5/4}`, `M ≤ Nq^{1/4}` | fantasy-fit at fixed `q = d₂ ≍ H^{0.712157}`: `M = A′ = q^{0.298}` (at the largest block), `N = M₁ = q^{0.702}`, `MN ≍ q` | inside the range — the ONE hypothesis we meet |
| the FM98 escape for rank-1 phases: `f = aX^d + bX`, `a ∈ F_q^×`, `d ∈ ℤ−{0,1,2}` | `d = −1` is admitted by FM98's family, but with `a ≠ 0` their phase is `x̄ + ax`, not the pure `x̄`; whether the pure-inverse case is covered was NOT verified — FM98 itself was not fetched (§7) | undetermined, and immaterial: the modulus row already fails |

**The fantasy, priced [DERIVED HERE].** Grant `d₂` prime and the kernel
admitted, and apply Theorem 1.1 per modulus (their framework's only mode),
summing trivially over `d₂`. The saving factor is
`M^{−1/2} + (MN)^{−3/16}q^{11/64}`. At the working point,
`(MN)^{−3/16}q^{11/64} = H^{−0.1875a′ − 0.09375 + 0.122402} =
H^{0.028652 − 0.1875a′}`: this is `≥ 1` — **no saving at all** — for every
block with `a′ < 0.152812`, which includes the binding `h ≍ 1` block of §3.4;
and at the largest block `a′ = 0.212157` it is `H^{−0.011127}`, i.e.
`q^{−1/64}`. Compare the standing best in print for our all-rough shape,
Bettin–Chandee's `H^{−0.035608}` (`attack-sqrt-cancellation.md` §4): **the
KMS fantasy delivers less than a third of what the corpus already has, on the
one block where it delivers anything, and the need is `H^{−0.212157}`.**

### 5.4 Verdict

**Thread 3 verdict: not a route, on hypotheses and on strength
independently.** The modulus hypothesis fails structurally (prime vs
z-smooth-composite-and-averaged; the authors and Pascadi both name the
extension as open), the kernel/interval hypotheses are jointly unsatisfiable
for the ratio phase, and the fully granted fantasy yields `q^{−1/64}` on one
block and nothing on the binding block — below Bettin–Chandee, far below the
`H^{−0.212157}` requirement. The algebraic-geometry branch is hereby read,
priced, and closed for Lemma V as posed; what would revive it is a published
KMS-type bound for squarefree smooth moduli with savings a power of the FULL
modulus, which is precisely the open extension named in KMS 2017 §1.5.2, and
which Pascadi already prices as "relatively small" even if it lands.

---

## 6. CORRECTIONS AND PROPOSED ADDITIONS TO THE RECORD

*(Report only; no file outside this one was edited, per the held-headline rule.
For a human to place.)*

**(1) The `H^{0.857720}` shortfall is superseded by `H^{0.818235}`, and the
`Y_N = 1` reading was conservative, not "generous".**
`lemmaV-neighbours.md` §4.3 calls `Y_N = 1` "the generous reading"; it is the
opposite — Theorem A's own range (1.5) carries the third term `q²/N³`, which
supplies `Y_N = max(1, q/N²)` for arbitrary sequences free, and the frontier
moves 0.354437 → 0.393922 (§3.4). Downstream carriers of the old numbers:
`G2-STATE.md` §0 ("shortfall of `H^{0.857720}`", "29.24%" → 32.50% of the
carried rough mass), `SEARCH-CONVENTIONS.md` §1 Lemma V row (points at
lemmaV-neighbours; a one-word pointer update suffices), `lemmaV-neighbours.md`
§§1, 5.2, 5.4, 10 (its last NOT-REACHED item, the `Y_N` question, is now
answered: yes on the hypothesis, exhausted as an axis).

**(2) Two KMS items leave `lemmaV-neighbours.md` §10's NOT-REACHED list.**
Both papers are now read at source (§5); the "obvious next read" is done and
the branch is closed, not live.

**(3) A precision on `lemmaV-neighbours.md` §4.2's restatement of Lemma
18.1.** The printed exceptional factor is `(1 + √(S²C²R/(MN)))^{θ_{rs}}`, not
`(1 + S²C²R/(MN))^{θ_{rs}}`; the two agree up to constants (`(1+√x)² ≍ 1+x`)
so nothing downstream moves, but quotes should carry the printed form. Also
worth a marginal note: Maynard's `θ_q = max(0, 1 − 4λ₁(q))` is consistent with
his own Lemma 18.2 (`θ_q ≤ 7/32`) and with Pascadi's `2θ_max ≤ 7/32` only
under the reading `θ_q = (1 − 4λ₁(q))^{1/2}` — Kim–Sarnak gives
`1 − 4λ₁ ≤ 49/1024` directly. The frontier arithmetic here and in
lemmaV-neighbours already uses `7/32`, i.e. the consistent reading.

**(4) Proposed repo script, `research/smoothness-front-01.js`, to put §3.4 and
§5.3 under custody.** It should implement the block bound (`pre`, `T1`, `T2`,
the `y`-menu) exactly as printed in §3.4, verify the four calibration rows
against `lemmaV-neighbours.md` §5 (0.151372, 0.354437, 1.818235,
0.867941/0.962157), print the frontier table of §3.4 and the fantasy-KMS row
of §5.3, and — the measured half — enumerate the Rosser support
`𝒟⁺(z=101, D=z^{3.038})` and print §4.3's aggregated-block and fixed-`s`-slice
DFT tables. Until it exists those numbers are a reading aid, not corpus
constants. The scratch sources (`sf-frontier.js`, `sf-rosser-dft2.js`,
`sf-rosser-slices.js`) live in this session's scratchpad and every formula
they implement is reproduced in §§3.4, 4.3 above.

**(5) One new positive worth its own line in the live layer if adopted:** the
Vaaler coefficients satisfy Pascadi's Assumption 14 with `Y_N ≍ N` (maximal),
by Theorem 2's envelope clause at `α ∈ {0, ½}` — a clean, citable structural
fact about the corpus's own remainder decomposition, even though it buys no
exponent here.

---

## 7. NOT REACHED

Where the looking stopped, and what a further pass would open first:

- **Pascadi's Theorem 13 and §4** (the engine behind Theorems 2/3 and the
  `T_N(α)` machinery): used as black boxes off their printed statements;
  proofs not verified. The envelope clause of Theorem 2 — load-bearing for
  §3.3 — was taken from the statement on p. 4, not re-derived.
- **Vaaler 1985 primary** (Bull. AMS 12, 183–216): the coefficient formula
  was used in the Graham–Kolesnik form the corpus already carries
  [SECOND-HAND]; the primary was not opened.
- **Fouvry–Michel 1998** (the rational-phase paper KMS cite as [FM98]): not
  fetched; whether the pure-inverse phase (our rank-1 kernel with no linear
  term) is inside their quasi-monomial type-II theorem is undetermined. It
  cannot change §5's verdict (the modulus row fails regardless) but it is the
  one cell of §5.3's table left blank.
- **Deshouillers–Iwaniec 1982 primary** — still unopened, inherited from
  `lemmaV-neighbours.md` §10: every `J²`/`ℐ²` here is Maynard's or Pascadi's
  restatement, each correcting typos in the original (and §6(3) adds one
  normalisation wrinkle of Maynard's own). Anyone attributing the formulas to
  DI directly must open Invent. Math. 70 first.
- **The rebuilt-sieve trade** (§4.5(i)): replacing Rosser weights by
  fundamental-lemma weights at `u ≈ 3.04` per side to buy smoothness at the
  price of the `κ = 2` main term. Not priced beyond the observation that every
  sieve weight is `μ`-signed and the `β₂` optimisation dies; a real pricing
  would re-run the `beta2-note.md` optimisation with degraded sifting
  functions. This is the only thread-2 residue not closed by the Fourier
  argument, because it changes the object rather than regrouping it.
- **KMS-style sum-product methods run per prime factor of a z-smooth modulus**
  (CRT + Deligne at each `p | d₂`): not worked; each factor `p < z` is far
  below its variables' ranges, where complete-sum bounds are classical and
  already inside the corpus's counted losses, so no gain was expected — but no
  computation was done.
- **The `(5.19)` dispersion route for the binding `h ≍ 1` block**: our block
  has no `h₁ℓ₁ − h₂ℓ₂ = n` structure to feed it; noted, not pursued.
- **Jutila 2000** — still paywalled, still off-branch (inherited verdict,
  `lemmaV-neighbours.md` §4.4); nothing here touched it.
- **The quantifier gap itself.** Nothing on this front addresses
  `sup_x`: every bound above lives at the aligned-position necessary subcase,
  and §4.5(ii) notes the window phase would break the smoothness hypotheses
  even for genuinely smooth weights. The live analytic front after this pass
  is unchanged in kind: the mean-square-to-pointwise quantifier, plus TODO
  1d's bounded-defect Fekete target, with the smoothness branch now closed on
  all three of its doors and the affordable-rough-mass frontier resting at
  `H^{0.393922}` against a carried `H^{1.212157}`.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
