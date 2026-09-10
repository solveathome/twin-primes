# Red team 2026-08-20 — the three held mathematical headlines, adversarial pass

<!-- ledger
id: Q-redteam-0820-math
status: ANSWERED
todo: none
question: Do fekete-1d, smoothness-front and import-hypergraph survive an adversarial pass before integration?
verdict: Mostly CONFIRMED, with one REFUTED as stated (import-hypergraph's "the engine can never carry a ln-power" is false for bounded-size edges, though the row's verdict survives for FGKMT-sized edges) and one WEAKENED (the freeze survives, the frozen value does not, under the trusted ladder).
-->

*2026-08-20. Adversarial verifier, branch `opus-try`. Brief: break, before
integration, (1) `fekete-1d.md`, (2) `smoothness-front.md`,
(3) `import-hypergraph.md` (+ its prereg at 469aaa3 and producers). Method:
refuted-until-rederived; every checked claim graded CONFIRMED / WEAKENED
(with the corrected sentence) / REFUTED (with the counterexample). Independent
re-derivations live in this session's scratchpad as `rt0820-*.js`; published
math re-read from rendered page images only (pages re-rendered by this pass
from the PDFs of record already on disk; identities of the PDFs re-checked
with `pdfinfo`). This file is the pass's only repo write. Nothing committed,
nothing pushed.*

---

## 0. Verdict summary

**The single most load-bearing correction:** `import-hypergraph.md` §0.3/§5(3)
— "the engine can never carry a ln-power; leftover floor 1/log₂x" is
**REFUTED as a universal claim**: (4.1) with bounded-size edges permits depth
`m ≈ 0.434·log₂x` and a leftover floor `(ln x)^{−log₁₀5} ≈ (ln x)^{−0.699}`;
the printed floor is correct only for Cor 4 (its own hypothesis (4.21)) and
for FGKMT-sized edges (`r ≍ log x`). The row's verdict survives on the
corrected floor (0.699 of a log is still short of Maier–Pomerance's +1 log
and two logs short of the K–K reading, and the C-window wall is intact), but
the sentence must change before integration (§3.2 has the corrected wording).

Scoreboard (details in the numbered sections):

| # | claim | verdict |
|---|---|---|
| 1a | fekete threshold/freeze arithmetic (S(16), caps, flip, sensitivity) | **CONFIRMED** (all re-derived from scratch; §1.1) |
| 1a′ | trusted A144311 note: freeze survives, but riser has FIRED at trusted grade — operative threshold 1.3946 at b=66, trap window widens to [1.0761, 1.3946) | **WEAKENED** — corrected sentence in §1.2 |
| 1b | bounded-defect Fekete lemma, 8-line proof + (H-mono) discharge | **CONFIRMED** (§1.3) |
| 1c | "1.3946 literature-conditional on Wang 2024" | **CONFIRMED** + trust rider (§1.4) |
| 1d | boundedness instrument null design | **CONFIRMED** (§1.5) |
| 2a | H^0.818235 exponent chain, frontier 0.354437→0.393922 | **CONFIRMED** (independent implementation; §2.1) |
| 2b | Y_N-axis exhausted; Theorem A third-term reading | **CONFIRMED at source** — (1.5), Assumption 14, Thm 2 envelope, Cor 18's ℐ² all verbatim (§2.2) |
| 2c | smooth-profile impossibility + Fourier null | **CONFIRMED**, one nit: k=0 mode omitted from the null (measured ≤ 2.8e−3 of mass — verdict unchanged; §2.3) |
| 2d | KMS prime-modulus quote | **CONFIRMED verbatim** (§2.4) |
| 3a | C-window closed form (5/4)ln5 vs 2ln(5/3) | **CONFIRMED at source** (§3.1) |
| 3b | yield cap 10^{m+2} ⟹ floor 1/log₂x | **REFUTED as stated / row verdict survives** (§3.2) |
| 3c | held theorem G₂(x#) ≫ x ln x | **CONFIRMED** — every ingredient at source, chain re-derived, finite cover independently rebuilt and replay-clean (§3.3–3.4) |
| 3d | verdict-vs-prereg grading | **CONFIRMED no overgrade**, one asymmetric-label nit on N3 (§3.5) |

## 1. TARGET 1 — fekete-1d.md

### 1.1 Threshold and freeze arithmetic, re-derived from scratch — CONFIRMED

`rt0820-t1-threshold.js`, a from-scratch implementation sharing no code with
the producers (data: custody values + A144311+1, parity-guarded). Every number
reproduces:

- `S(16) = ln(256/66) = 1.35552`, and it IS the custody max over all integer
  bases `b ∈ [2,47)` (runner-up `b = 28` at 1.34629 — not close to the caps).
- Window caps from the greedy floors (floors are corpus certificates, CITED):
  `ln(2704/705) = 1.34429`, `ln(3364/870) = 1.35239`, `ln(3600/954) =
  1.32803` — all `< 1.35552`, so the freeze is real: since `S(b) = ln(b²/Ĝ)`
  falls as `Ĝ` rises and the enumeration can only return `G₂ ≥ floor`, **no
  enumeration outcome at 47, 53 or 59 can raise the custody threshold.** The
  refutation of 1c's "each new ladder x raises 1d's TPC threshold" stands, and
  the certification logic (floor ⟹ upper cap on the window's best S) is
  valid as an inference.
- Riser condition: `S(66) > S(16) ⟺ G₂(61#) ≤ ⌊66³/256⌋ = 1123`. Confirmed.
- Sensitivity: `ln(708/705) = 0.00425`; sup `R = 2.93333` at `(4,10)` on the
  custody, `st ≤ 79` and `st ≤ 82` domains alike (pair counts 50/104/111,
  matching); flip value `G₂(47#) ≥ 740` (A144311 low by 32 = 4.5%); the
  47-window's ten pairs reproduce to every printed digit, including
  `D(4,12) = 1.0330` and `(7,7) = −0.2400`; TPC window
  `ln C ∈ [1.07614, 1.35552)`, width 0.27938; the floor-7 domain-cap repair
  (`1.5533` at `(8,9)`, `st ≤ 79` → `1.9000` at `(8,10)`, `st ≤ 82`) exact.

One wording nit, not a defect: §2's parenthetical names p = 37 and p = 71
around the 47-window's rank; the actual #2 window is **p = 23 at 1.0415**
(71's 1.0202 is #4). "Ranks 3rd of 21" itself is correct (re-derived).

### 1.2 The trusted ladder moves the operative threshold — WEAKENED (freeze survives; the frozen VALUE does not)

Since the report was written, the full A144311 ladder (22 terms to x = 79) was
adopted as trusted (`research/a144311-full-ladder.js`, hard-gated on the
14-term custody overlap). Re-derived consequences:

- `S(61) = ln(3721/1080) = 1.23703` — the base 61 itself raises nothing; the
  riser base is 66, in the window `[61,67)` where `Ĝ = G₂(61#)`.
- `S(66) = ln(4356/1080) = 1.39459 > 1.35552`: the published 1080 sits under
  the fire line 1123, so **at trusted grade the riser has FIRED**. Full-ladder
  threshold: 1.39459 at b = 66 (top-5: 66:1.39459, 78:1.38039, 82:1.36919,
  65:1.36406, 16:1.35552) — re-derived, matches the producer's cross-check.
- **The freeze claim survives verbatim** — 47/53/59 certified unable, first
  riser x = 61 — but the report's correction (ii), "the custody-grade
  threshold is 1.3555 and is **effectively frozen there**", is now misleading
  as a statement about the repo's operative number. Corrected sentence: *the
  custody-grade threshold is 1.3555 and no in-reach enumeration can move it;
  at trusted grade (series rule 2026-08-20) the operative threshold is
  1.3946 at b = 66, so the trap window is `ln C ∈ [1.0761, 1.3946)`, 0.3185
  nats wide, its top 0.039 nats resting on trusted-not-custody terms.*
- The §3 sentence "with no literature term anywhere in it" (about the TPC
  window) survives only for the custody window `[1.0761, 1.3555)`; the
  trusted window's extension is literature-borne by construction.
- Robustness worth recording: beating custody's 1.3555 does not hang on a(18)
  alone — b = 78 (a(21), `G₂(73#) = 1530`) gives 1.38039 and b = 82 (a(22))
  gives 1.36919. All three risers are Wang-2024 terms, so the custody/trusted
  split is really a custody/Wang split.

### 1.3 The bounded-defect Fekete lemma — CONFIRMED (proof correct, hypotheses honestly discharged)

The eight-line proof in `attack-fekete-1d-02-lemma.js` was re-derived line by
line, not re-read:

- limsup: `f(b^{k+1}) ≤ (k+1)f(b) + kK` by induction on (H-sub); for
  `n ∈ [b^k, b^{k+1})`, (H-mono) gives `f(n) ≤ f(b^{k+1})` and `ln n ≥ k ln b`,
  so `f(n)/ln n ≤ ((k+1)f(b)+kK)/(k ln b) → (f(b)+K)/ln b`; taking inf over
  integer bases b ≥ 2 (which is the same index set as the inf defining L)
  gives limsup ≤ L. liminf ≥ L − K/ln n → L from the definition of inf.
  Correct; `f ≥ 0` is used only for `L ≥ 0`; no circularity.
- (H-mono) discharge: the one-line argument is sound. Slots of `T_next` mod
  the old period satisfy a superset of the old kill conditions, so the new
  slot set is contained in the periodized old one; a subset's maximal
  circular gap is ≥ the superset's (the superset's maximal gap contains no
  subset point); the set is nonempty (`x#−1` is always a twin slot). The
  seven-fold computational check is corroboration, not the proof's load.
- The two equivalences of §6 re-derived exactly: `β < 2 ⟺ ∃n: S(n) > K`
  (strictness both ways checks), and `(ln 66 + ln 2.93333)/ln 16 = 1.8992`
  reproduces.
- (H-sub) is correctly carried as OPEN and correctly identified as the entire
  remaining content; the report never uses it unconditionally. The BGT
  remark (no split needed) is accurate: the proof never decomposes an integer.

Not re-run: the POW/LOG finite-inf calibration (+2.9%/+53%) — control-only,
not load-bearing for any verdict.

### 1.4 "1.3946 is literature-conditional on Wang 2024" — CONFIRMED, with the trust-adoption rider

The value 1.3946 needs `Ĝ(66) = G₂(61#) = 1080` = A144311 a(18), which is a
Wang-2024 term (provenance read at the OEIS entry per
`a144311-full-ladder.js`). Correct as written. Rider from §1.2: after the
series-rule adoption the corpus's own grading of that number is now
"trusted", so the report's custody/literature dichotomy should be restated as
custody/trusted — and the weaker claim "the threshold exceeds 1.3555" is
robust across three independent Wang terms (a(18), a(21), a(22)), while the
exact 1.3946 is a(18) alone.

### 1.5 The bounded-consistent instrument — CONFIRMED as designed and as bounded-CONSISTENCY only

`rt0820-t1-instrument.js`, independent re-implementation: slopes and
contrasts reproduce to all printed digits (G2-full +0.1661 ± 0.0637 vs POW
+0.2075 ± 0.0558, contrast −0.0414 ± 0.0846; custody contrast −0.0188 ±
0.1466; LOG null −0.2415 ± 0.0554, so the instrument is genuinely not pinned
positive). The null design is like-for-like (same primes, same step-function
construction, same windows, same pass), which is exactly the discipline the
step-sampling artifact demands. The verdict text correctly claims only
consistency-with-bounded at 1 s.e. and §4's blind-spot paragraph correctly
concedes the diagonal. Nothing here is overclaimed; the [MEASURED] grade is
apt. (Minor: the custody LOG null slope −0.1433 ± 0.0999 is unquoted in the
report; immaterial.)

## 2. TARGET 2 — smoothness-front.md

### 2.1 The exponent chain H^0.818235 — CONFIRMED (independent implementation, all five calibration rows exact)

`rt0820-t2-frontier.js` implements the block bound from the report's printed
`pre`/`T1`/`T2` formulas and, separately, a DI form
`J² = CS(RS+N)(C+DR) + C²DS√((RS+N)R) + D²NR`, with a fresh scan (10⁻⁵ grid
in `a′`, bisection in `σ`). Everything lands on the printed digit:

- Calibration: Pascadi `Y_N = 1` frontier 0.354437; full-rough worst block
  1.818235; all-smooth 0.867941 (Pascadi) and 0.962157 (DI); DI frontier
  0.151372. All five match `lemmaV-neighbours.md` §5.
- The new rows: Vaaler-only frontier **0.354437 — unchanged**, exactly as
  claimed; Theorem-A-third-term-only and both: **0.393922**; shortfalls
  0.857720 → **0.818235**. Binding at `a′ = 0` (`T2 = 2.000000` there, slack
  at every other block), exceptional factor dead there for
  `σ > 1.424314/4 = 0.356079`, and the `Y_N`-free ceiling
  `1.212157 + 2σ ≤ 2 ⟹ σ ≤ 0.3939215` reproduces — the "impossible past
  0.393921 whatever `Y_N`" sentence is exact arithmetic, not rhetoric.
- The ridge claim checks: total affordable rough mass stays 0.393922 for
  `ρ ∈ [0, 0.145]`, collapses by `ρ = 0.2`.
- The KMS-fantasy row: `(MN)^{−3/16}q^{11/64}` = `H^{0.028652 − 0.1875a′}`,
  ≥ 1 for `a′ < 0.152812`, `H^{−0.011127}` at `a′ = 0.212157`; and the
  Kloosterman-completion prices `(D⁻)^{3/2}M₁^{1/2} = H^{1.318236}` =
  trivial × `H^{0.106079}` — both re-derived.
- Downstream percentages: 0.393922/1.212157 = 32.50%, 0.354437/1.212157 =
  29.24% — the §6(1) correction figures are right.

### 2.2 The Y_N axis and the Theorem A third term — CONFIRMED at source (pages re-rendered and read by this pass)

Read from page images rendered by this pass from the PDF of record
(`pdfinfo` title/author verified; arXiv:2404.04239v3):

- **Theorem A, p. 3:** (1.4) is exactly as the report renders it, and the
  range (1.5) is verbatim `X ≪ max(1, q/N, q²/N³)` — the third term is real,
  unconditional, for arbitrary complex sequences, any `q ∈ ℤ₊`. (P. 6's
  (2.3) even shows its mechanism: Weil + Cauchy–Schwarz.) The derived move
  `Y_N := max(1, q/N, q²/N³)/max(1, q/N)` (= `max(1, q/N²)` for `q ≥ N`) is
  airtight: (1.4)'s sequence is arbitrary, so the twist `e(nξ/N)` absorbs at
  the same ℓ²-norm, and Assumption 14's `(1+|ξ|²)` divisor only shrinks the
  required range. Re-derived, not just re-read.
- **Assumption 14, p. 31:** verbatim as quoted, including the range
  `X ≪ max(1, q/N)·Y_N/(1+|ξ|²)`, the `Y_N = 1` example-tuple sentence, and
  (5.18)/(5.19). A tuple certified at `Z = 1` also serves any `Z ≫ 1` (the
  RHS `(qNZ)^ε` only grows), so feeding Cor 18's `Z` is legitimate.
- **Theorem 2, p. 4:** the envelope clause is verbatim: "*The same result
  holds if `e(nα)` is multiplied by `Φ(n/N)`, for any smooth function
  `Φ : (0,4) → ℂ` with `Φ^{(j)} ≪_j 1`*", range (1.7) as quoted; the parity
  split at `α ∈ {0, ½}` with `T_N(½) ≤ 2` checks.
- **Corollary 18, pp. 37–38:** hypothesis list matches the report's item
  1–8 rendering, including the load-bearing derivative asymmetry (the
  printed condition is `∂_x^j∂_y^k∂_z^ℓ Φ_q ≪_{j,k,ℓ,ε} Z^{jε}` — only `j`
  in the exponent) and the norm remark on p. 36 (norms over `(r,s)`, "but
  not `n ∼ N`"). The conclusion (5.35) with
  `ℐ² = D²NR + (1 + C²/(R²SY_N))^{2θ_max} CS(C+DR)(RS+N)` is verbatim, so
  the `T1`/`T2` translation is faithful, and since `Y_N` enters ℐ² ONLY in
  the exceptional factor, the "Y_N axis exhausted at 0.393922; the binding
  object is the regular-spectrum main term `CS(C+DR)(RS+N)`" claim is a
  theorem about Cor 18's printed shape, airtight. (It is, as the report
  itself scopes, a statement about this corollary, not about all possible
  spectral inputs.)

### 2.3 The Fourier-flatness impossibility and its null — CONFIRMED, one instrument nit (k = 0 excluded)

- **The "necessary" quote, p. 32:** verbatim, including the word "here":
  "*While the smooth weight in the `c` variable is necessary here (stemming
  from Proposition E), the smooth weight in `n` only confers additional
  flexibility.*" The report quotes it in full and uses it only for what it
  says (necessity as input to the Kuznetsov step of THIS machinery); the
  impossibility verdict rests on the Fourier argument, not on overreading
  the word. The completion mechanism (p. 32's proof of Cor 15,
  `∂_y^k Ψ̂ ≪ Z^{O(ε)}/(1+ξ⁴)`) matches the report's §4.1 reading.
- **The measurement, re-derived from the stated definition alone**
  (`rt0820-t2-rosser.js`, fresh enumeration of `𝒟⁺(z=101, D=z^{3.038})`):
  support 3,569 elements (+ d = 1 = the reported 3,570); aggregated-block
  low-mass fractions 5.65e−3 / 2.29e−3 / 1.43e−3 against flat nulls
  7.81e−3 / 3.91e−3 / 1.95e−3 — the printed 5.6e−3/2.3e−3/1.4e−3 vs
  7.8/3.9/2.0e−3 reproduce; exactly **31 slices** qualify, and the
  low-mass/null ratios come out **0.57–1.15, median 0.82** — the printed
  numbers to the digit. The flat null `K/C̃` is the correct expectation for
  a sign-flat sequence (K of C̃ modes), and the LOG/random-sign benchmarks
  behave as claimed.
- **The nit:** the instrument sums `1 ≤ k ≤ 64` and omits `k = 0`, the mode
  where a smooth DC component would live. Measured here: the DC share is up
  to 2.75e−3 of the mass (2^14 block) — ~45× its flat per-mode share, i.e.
  a real small bias the instrument was blind to — but still two orders
  below the ≳0.4 mass share a usable smooth component needs. Corrected
  sentence for §4.3, if adopted: *including k = 0, every mode's share stays
  ≤ 2.8e−3 of the factor's mass, two orders under a usable smooth
  component; the k ≥ 1 rows are at the flat noise floor as printed.* The
  verdict is unchanged; the null design should say so explicitly.
- The §4.2 chain (admissible ⟹ low-frequency up to A-decay tails;
  Davenport ⟹ `max_k |γ̂| ≪_A (log C)^{−A}` for the μ-model; remainder
  keeps `1 − o(1)` mass and is exactly as inadmissible) re-derives cleanly;
  the §4.4 completion Parseval (`Σ_b|λ̃|² = d₂·Σ|λ|²`, no wraparound since
  `M₁ ≤ d₂`) and the Weil pricing re-derive (2.1). The scope guards in
  §4.5(i)–(ii) prevent the overread this pass went looking for.

### 2.4 KMS prime-modulus quote — CONFIRMED verbatim

KMS 2020 (arXiv:1802.09849v5, `pdfinfo` title/author verified), p. 2, read at
a page image rendered by this pass: "*When the modulus `q` is composite, a
number of techniques exploiting the possibility of factoring `q` (starting
with the Chinese Remainder Theorem) become available, and results exist in
fair generality. In this paper, we will only consider the case where `q` is a
prime, and when `K` is a trace function*". Pascadi p. 6's pricing is also
verbatim: "*an extension of the work of Kowalski–Michel–Sawin [29] to general
moduli should improve Theorem A in the critical range `q ≈ N²`, but even then
the final numerical savings would be relatively small.*"

## 3. TARGET 3 — import-hypergraph.md

### 3.1 The C-window closed form — CONFIRMED at source

FGKMT arXiv:1412.5029 (v3 PDF on disk; pp. 12, 15, 16 re-rendered and read by
this pass). Corollary 4, p. 15, is verbatim as the report lists it: `P′, Q′`
are ABSTRACT sets ("Let `P′, Q′` be sets with `#P′ ≤ x` and
`#Q′ > (log₂x)³`") — so instantiating `P′` as any ≤ x primes is inside the
statement, not a stretch; (4.16)–(4.21) all match, including (4.17)
`P(q ∈ e_p) ≤ x^{−1/2−1/10}`, (4.19) `(5/4)log 5 ≤ C ≪ 1`, and the
hypothesis (4.21) `m ≤ log₃x/log 5`. P. 16 confirms the deduction: (4.22)
`|ℐ_j| = 5^{1−j}log5/C` DISJOINT in [0,1] — which needs
`C ≥ log5·Σ_{j≥1}5^{1−j} = (5/4)log5`, exactly the report's "forced by
disjointness" reading — and (4.23) `δ := x^{−1/20}`.

The closed form re-derives: exact marginal `2/q ≤ x^{−3/5}` forces
`q ≥ 2x^{3/5}`; the sup of `Σ 2/q` over ≤ x primes above that line is the x
smallest such primes, largest `(1+o(1))x ln x`, giving
`C → 2 ln((ln x)/((3/5)ln x)) = 2 ln(5/3) = 1.021651` against
`(5/4)ln5 = 2.011797`: short by 1.9692, at every scale. On the FGKMT-shaped
range `(x/2, x]`: `2 ln(1/(1−ln2/ln x)) = (2ln2+o(1))/ln x → 0`. Both
CONFIRMED as closed forms. (Also corroborated: `ps89.pdf` on disk is an HTML
bot page, not a PDF — the report's "PS 1989 NOT REACHED" is true.)

### 3.2 The yield-cap argument — WEAKENED: the 1/log₂x floor is r-dependent, not a consequence of polynomial marginals alone

Theorem 3's (4.1)–(4.9) were read verbatim at p. 12. Re-deriving the cap:
polynomial marginals with polynomial block sizes force polynomial `δ`
((4.3): `δ ≥ marginal·(#I_j)^{1/2}`), so `ln(1/δ) ≍ ln x`; (4.1) then needs

> `10^{m+2}·(A·ln(1/κ) + AD + ln C₀) ≤ ln(1/δ) ≍ c·ln x`, with `A ≥ 2rm+1`
> (Cor 2's covering depth) and `κ ≍ 5^{−m}`, i.e. `10^{m}·r·m² ≲ ln x`.

- At FGKMT's own `r ≍ log x·log₃x/log₂²x` this gives `10^m ≲ (log₂x)²` ⟹
  `m ≍ log₃x` and floor `≍ 1/log₂x` — the report's arithmetic, and (4.21)
  says the same inside Cor 4. CONFIRMED for that regime.
- **But for an "ideal" family with bounded a.s. edge sizes (`r = O(1)`) the
  same quantifiers allow `10^m ≲ ln x`, i.e. `m ≤ (1+o(1))·log₂x/ln 10`,
  floor `5^{−m} = (ln x)^{−log₁₀5+o(1)} = (ln x)^{−0.699+o(1)}` — a genuine
  ln-power.** So §0.3's "it can never carry a `ln`-power" and §5(3)'s
  "flooring the leftover fraction at `1/log₂x` … ONE factor of lnln, ever"
  are REFUTED as universal statements about the engine; they are true of
  Cor 4 (by hypothesis (4.21)) and of FGKMT-sized edges, not of (4.1) plus
  polynomial marginals in general. Corrected sentence: *(4.1) caps the depth
  at `10^m ≲ ln x`; with FGKMT's `r ≍ log x` that is `m ≍ log₃x` (leftover
  floor `1/log₂x`), and even with ideal bounded-size edges it is
  `m ≲ 0.434·log₂x` (leftover floor `(ln x)^{−log₁₀5} ≈ (ln x)^{−0.699}`) —
  still short of the one full log the Maier–Pomerance target needs and two
  logs short of the K–K reading, so the row verdict stands, on a weaker
  floor.* The verdict-relevant conclusions (K–K residual not dischargeable;
  the priced THEOREM mispriced) survive because they also rest on §5(1)'s
  C-window arithmetic and the named missing concentration input, and because
  even the corrected ceiling `(ln x)^{0.699}` is below both targets.
- Two subsidiary defects in §5(2), safe-direction but worth the record: (i)
  "raw traces do satisfy its (4.2)–(4.4) over ranges `(x^θ, x]`" glosses
  (4.2): at `q ≍ x^{1/2+ε}` a trace meets `≍ x^{1/2−ε}/polylog` survivors,
  so `r` is polynomial and (4.1) is then UNSATISFIABLE for any `m ≥ 1` —
  Theorem 3 cannot actually run on untruncated raw traces over that range,
  making the claimed "gain ×0.52" an over-credit to the machine (the true
  yield is smaller, so the "constant, not a log" conclusion holds a
  fortiori). (ii) The interior numbers `e^{−2.05}` and `×0.52` have no
  producer artifact and did not re-derive here (a base-5 packaging of a
  1.386 budget actually yields leftover ≥ 0.31, WORSE than independent
  `e^{−1.386}`; a base-2 packaging can do better; the report does not say
  which it priced). Constant-vs-log is unaffected; the specific numbers are
  unbacked.

### 3.3 The held theorem chain `G₂(x#) ≫ x ln x` — CONFIRMED, every ingredient verified at its source

Treated as a claimed theorem at the door. Ingredients:

1. **K–K Corollary 1** — re-read by this pass at a page image of
   arXiv:2302.00459v2 p. 4, fetched fresh and md5-matched to the corpus's
   recorded artifact (`b5d7d2a2…`). Verbatim: "*Let κ, z, g(d), V(z) and X
   be as above. Suppose that for any p ≤ z the set Ω_p ⊂ ℤ/pℤ contains g(p)
   elements. Let S(X, Ω) be the number of n ≤ X such that n mod p ∉ Ω_p for
   all p ≤ z. Then S(X, Ω) ≪ XV(z).*" "As above" = Lemma 1's hypotheses: `g`
   multiplicative, `g(p) ≤ κ`, `g(p) < p` for ALL primes, `z ≪ X`, constant
   `≪_κ`. The instantiation `Ω₂ = {0}` (g(2) = 1 < 2), `Ω_p = {0, −2}`
   (g(p) = 2 < p, classes distinct for odd p), `κ = 2`, `z = √y ≪ y = X`
   discharges every hypothesis. Lemma 1 is proved by citation to
   Halberstam–Richert Thm 2.2 inside a refereed paper (Izv. Math. 88:2
   (2024)) — "published theorem consumed as a theorem" is the right grade.
2. **Mertens step** — elementary and re-derived: `(1−2/p) =
   (1−1/p)²·[(1−2/p)/(1−1/p)²]` with the bracket convergent, so
   `∏_{2<p≤z}(1−2/p) = (C₂+o(1))/ln²z`; `z = √y` gives the factor 4.
3. **PNT step** — `π(x) − π(√y) = (1+o(1))x/ln x` since `√y = o(x/ln x)`;
   `y/ln²y = (1+o(1))c₀x/ln x`; `c₀ = 1/(8C₃)` makes the injection
   available with room. Effectivity survives (all constants effective).
4. **CRT identity** — re-derived from `two-class-lower-bounds.md` §1's
   proof, which is checked line by line and correct: choose
   `s ≡ −a_p (mod p)` for all `p ≤ x`; `j ≡ a_p ⟹ p | s+j`,
   `j ≡ a_p−2 ⟹ p | s+j+2`, so a full cover of `[1,y]` leaves no twin slot
   in a run of `y` consecutive residues; twin slots exist (`x#−1`), hence
   `G₂(x#) ≥ y+1`. The report's `y − O(1)` is conservative.

Composition re-derived end to end; no step is INFERRED; the finite echo is
independently reproduced (§3.4). **The HELD theorem survives this pass** and,
in this verifier's judgment, its grade does not hang on the N3 label
question: the Branch-A chain never uses N3 (only K–K + Mertens + PNT + CRT,
with N5 as finite echo). Placement arithmetic also checks: above the free
FGKMT transfer by `ll x/lll x`, below the unrefereed K–K reading by
`ln²x·(lll x)²/(ll x)⁴ ≈ ln²x`.

### 3.4 The finite cover, brute-forced independently — CONFIRMED

`rt0820-t3-cover.js` rebuilds the whole registered pipeline from the prereg
text alone (own sieve, own splitmix64, seed 13, 200 trials, greedy mop-up),
then replays the assembled cover through a separately-written per-residue
scan. Results: `|V| = 9889`; degree 1.708115; `∏(1−2/q) = 0.1750499`;
`E = 1731.07`; mean leftover 1730.83; trial variance ratio 0.43 (the
sub-Poisson sighting is real); best trial 1654; mop-up 1153 primes at 1.43
slots/prime; `x′ = 10861`; **uncovered in [1, 200000]: 0**;
`y/(x′ ln x′) = 1.9816`. Every printed N-check figure reproduces, including
the N3 population: 4,762,138 short pairs, and a deterministic re-computation
(`rt0820-t3-codeg.js`) gives short-pair 99.9th percentile 0.1494 of degree
(report: 0.1496 on the mixed population) — the failed prereg prediction is
real, honestly reported, and mechanically explained (short even distances
pick up the small covering primes). The true all-pairs codegree max is
safely under the 0.25 line: maximizing `Σ_{q|d}2/q` needs
`d ≥ 2·17·19·23 = 14858` for three small primes (≈ 0.18 of degree), and four
small odd primes cannot fit under `d ≤ 2·10⁵` with `d` even.

### 3.5 Verdict-vs-prereg grading — CONFIRMED (no overgrade), one label nit

Scored against the prereg at 469aaa3 (its custody is provable — committed
alone before the producers): **K1** does not fire by its own letter (the
C-window is a hard-coded unreachable hypothesis, but Theorem 3 is the same
paper's variant without it — and the prereg's K1 required that no variant
exist). **K2** does not fire (§3.3 completes from published + elementary).
**K3** does not fire (N1 zero exceptions over 1,602,018 = 9889×162 cells;
N2 at z = −0.12). The record grades itself LANDED, banks WALL-ADDRESS, and
holds the §4 theorem — it does NOT claim LANDED-THEOREM, which is the
correct restraint given the strict all-gates reading of "N1–N5 pass".

The one wording defect: the prereg words BOTH N3 figures identically
("Registered predictions: 99.9th percentile ≤ 0.02 × degree; max ≤ 0.25 ×
degree") and gives N3 no explicit PASS-gate clause, unlike N1/N5. The
record's asymmetric treatment — max as a "threshold" it "PASSES", 99.9-pct
as a "prediction" that failed — is a reading the prereg's text does not
distinguish. Symmetric readings: both gates (then N3 fails a gate, and the
THEOREM grade waits exactly as the record holds it) or both predictions
(then all N-gates pass). Either way the record's posture is compatible; the
sentence in §0.5/§6 should be corrected to say the prereg labels the two
figures identically. Recommendation to the shepherd: with this pass's §3.3
verification in hand, the HELD theorem can take its grade on the strength
of the chain itself; the N3 miss stays recorded as a wrong toy-scale
prediction and touches nothing the theorem uses.

## 4. NOT REACHED

- **Vaaler 1985 primary** — the `c_h` coefficient formula stays SECOND-HAND
  (Graham–Kolesnik form), as in both target reports; §3.3's smoothness
  analysis of `Ĵ` was re-derived here but from that same form. (One
  observation logged: `Ĵ(1) = 0`, so `|c_h| ≍ 1/A′` degrades to `≪ 1/A′`
  near `h ≈ A` — upper-bound direction only, nothing moves.)
- **Maynard I Lemma 18.1 / Lemma 15.1 pages** — not re-rendered by this
  pass; the §4.4 completion arithmetic was re-derived independently, but the
  lemma's verbatim text is taken from the report's [READ-AT-SOURCE].
- **KMS 2017 (1511.01636) pages** — only the KMS 2020 p. 2 and Pascadi p. 6
  quotes were spot-checked per the brief; the §5.1 hypothesis table
  (Theorem 1.1/1.3 ranges, §1.5.2 quote) was not re-read at image.
- **FGKMT p. 19's codegree wording** — rendered but not re-quoted; the
  one-prime argument was re-derived independently instead.
- **fekete-1d §5's POW/LOG finite-inf calibration** (+2.9%/+53%) — control
  numbers, not load-bearing, not re-run.
- **N3's random-pair half** — reproduced deterministically for short pairs
  only; the 10⁶-random-pair RNG stream was not replayed (the max statistic
  is population-specific; the true all-pairs max was bounded analytically
  instead, §3.4).
- **`embed.js --check` fingerprint replays** — deliberately skipped (a
  gate-repair implementer is editing `qc/` concurrently); every load-bearing
  embedded number was instead re-derived by independent code, which is the
  stronger check.
- **The 47#/61# enumerations** — out of scope, priced elsewhere; nothing in
  this pass needed them (that is Target 1's own point).
- **`e^{−2.05}`/`×0.52`** — flagged unbacked in §3.2; not reproduced; a
  correct repricing of the constant-yield claim was not attempted beyond
  showing the direction is safe.

---

*Scratch artifacts for this pass (session scratchpad): `rt0820-t1-threshold.js`,
`rt0820-t1-instrument.js`, `rt0820-t2-frontier.js`, `rt0820-t2-rosser.js`,
`rt0820-t3-cover.js`, `rt0820-t3-codeg.js`, and page images `rt0820-*.png`
(Pascadi pp. 3, 4, 6, 31, 32, 36, 37, 38; KMS 2020 p. 2; FGKMT pp. 1, 12, 15,
16, 19; K–K p. 4). PDFs identity-checked with `pdfinfo`; K–K fetched fresh,
md5 `b5d7d2a2…` matching the corpus record.*
