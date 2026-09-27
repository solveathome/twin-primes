# Import row 15, the anatomy of integers and the analytic theory of rough numbers: the depth law's drift is derived to 0.16 percent by exact Mertens products and NOT by any published next-order term, the one next-order term in print is the wrong term for this object, and u = 2 is one identity seen four times rather than a singular point of the dimension-2 sifting functions

<!-- ledger
id: Q-import-rough-anatomy
status: ANSWERED
todo: none
question: Does the analytic theory of rough numbers derive the depth law's drift, and is u = 2 a singular point of the dimension-2 sifting functions?
verdict: SCRATCHPAD-GRADE throughout, and leaning on three never-red-teamed premises: the drift is derived to 0.16 per cent by exact Mertens products and NOT by any published next-order term (the one in print is the wrong term for this object), and u = 2 is one identity seen four times rather than a singular point of the dimension-2 sifting functions.
-->

> **RIDER 2026-08-30 (orchestrator, from the sealed fifth-decade test
> `blind-0830-quadpoint-c1c2.md` §§4, 6; this note stays HELD).** The §2.1
> comparator now has an embedded producer and a blind confirmation at the
> band-mean level over B9 to B14 (residuals −0.00022, −0.00009, −0.00002,
> −0.00009, −0.00002, −0.00002 on L; 1.62, 1.05, 0.39, 2.82, 1.26, 1.82 se);
> the §3 forward row at 316243 (K 192, y 1187) was reproduced exactly by the
> embedded comparator and the anchor itself measured y* = 1171 (K* = 190).
> None of this touches the premises this note flags as un-red-teamed, the
> asymptote 1/u* (not separable at any decade run), or the main term's
> HEURISTIC status.

*(2026-08-27. Staging note; nothing here is integrated into a live document and
no existing repo file was edited. Two producers were written and run, both to
the **session scratchpad**, neither embedded, neither `qc`-gated:
`rough-depthlaw-check.js`, `variant.js`, `debruijn.js`, `lambda.js`, `fwd.js`.
Every number they produced is marked **`[SCRATCHPAD-GRADE]`** and is not a repo
number; nothing here may be quoted outside this file until it is re-derived
inside an embedded producer. Numbers taken from the corpus are marked
**`[CITED]`** and were never recomputed, per the standing compute rule.
Literature statements are marked **[SOURCED]** when read at page image this
session with the sha256 recorded in §7, **[SOURCED-BIB]** when only the record
was verified, **[NOT REACHED]** otherwise.)*

**UNVERIFIED PREMISES, flagged before anything else, as the brief requires.**
`quadpoint-identity-01.md` and `quadpoint-prior-art.md` are **HELD and have
never been red-teamed**, and `attack-roughpair-error.md` is HELD on the same
footing and itself rests on the capture identity it does not re-verify. This
note leans on three things from them and says which:

1. the **measured** band means of `ln y*/ln h` (0.2624, 0.2705, 0.2720, 0.2740,
   0.2749, 0.2763) — **[CITED]** from the embedded OUTPUT of
   `research/attack-quadpoint-03.js`, SEC 2. Not recomputed. If that producer is
   wrong, §3's agreement is void;
2. the **zero-parameter main term** of `research/attack-roughpair-error-01.js`
   (its lines 20–51), quoted here as an object and then re-derived
   algebraically in §2.1. Its own calibration `T/Tmain(corr) = 1.0019` at B8 is
   **[CITED]**;
3. the **capture identity** `floor_K = T − X(K)`, used ONLY in §5's circularity
   grading and nowhere in §3's arithmetic. §3 stands whether or not the identity
   does.

**Numeric confidence, stated up front.**

| claim | confidence |
|---|---|
| The 0.935 → 0.984 drift is a finite-size artefact of the Mertens asymptotic, reproduced with zero free parameters to ≤ 0.16% at every one of six bands | **0.88** |
| The asymptote of `ln y*/ln h` is `1/u* = 0.280438`, not the identity note's `1/(2e^γ) = 0.280730` | 0.85 (main-term level only) |
| de Bruijn's `μ_y(u)`, the one next-order term in print for `Φ(x,y)`, is the WRONG term for this object (cumulative vs local) | 0.85 |
| No published next-order term exists for the corpus's object (local density, short window, `y ≈ 10²–10³`) | 0.55 — an absence claim; Tenenbaum's book and MathSciNet unreached |
| `u = 2` is NOT a singular point of the dimension-2 sifting functions; the corpus's four arrivals are one elementary identity | 0.85 |
| Gorodetsky 2024 is the owning convention for the corpus's unexplained sub-Poisson dispersion | 0.70 |
| …and that his `λ(u)` **derives** the corpus's measured `χ²/df` | **0.05** — it is 12× to 23× off |
| This row moves the exponent, or opens any route | **0.02** |

---

## 0. The verdict, disconfirming half first

**CALIBRATION RIDER, carried as instructed and stated before the finding.** A
derived next-order term that matches a measured drift on two decades is a
**DERIVED-CONSTANT payoff at best. It is not progress on the exponent.** `Q ≤
10007`, `h ≤ 10⁸`, `ln h ≈ 18`; the quantities that decide the route go like
`1/ln²h`. Two decades decide nothing asymptotic. Nothing below changes
`4.2665 → 2` by any amount.

**Six things that do not hold.**

1. **The published uniformity theory does not derive the drift, and the one
   next-order term it does supply is the wrong term.** de Bruijn's improved
   approximation for `Φ(x,y)` is `W(x,y) = x μ_y(u) Π(y) e^γ log y` with
   `μ_y(u) = ∫₀^u ω(u−v) y^{−v} dv` **[SOURCED**, Weingartner arXiv:2604.22058
   pp. 1–2, quoting de Bruijn, *Ned. Akad. Wet. Proc.* **53** (1950) 803–812**]**.
   `μ_y` is exactly the **cumulative average** of the local density `ω(u_t)/log y`
   over `t ∈ [1, x]` (§4.1 derives this in one line). The corpus counts in a
   **short window at a prescribed height**, where the local density is the right
   object and `μ_y` is not. Priced two ways `[SCRATCHPAD-GRADE]`: at the depth
   (`u ≈ 3.566`, `y ≈ 142`) the correction is `+0.079%`, an order of magnitude
   below the drift and it makes the six-band rms residual *worse* (0.000294 →
   0.000308); at the calibrated point `u = 2` it inflates the twin main term by
   **12.6%** at `Q = 10007`, against a measured `T/Tmain(corr) = 1.0019` `[CITED]`.
   Refuted by magnitude at one end and by a factor 66 at the other.

2. **The corpus's `(h, y*)` pairs sit OUTSIDE the uniformity domain of the
   sharpest published estimate at every measured band.** Tenenbaum,
   *Introduction*, 3rd ed., Thm III.6.10 (`Q(x,y), ∆(x,y) ≪ xρ(u)/L_ε(y)`) holds
   in `exp{(log log x)^{5/3+ε}} ≤ y ≤ x` **[SOURCED**, quoted through
   Weingartner (7) and (8); the book itself **[NOT REACHED]**]. At `ln h = 17.9`
   (B8) the threshold is `y ≥ 346` and `y* ≈ 151`. The domain is first entered
   around `ln h ≈ 25–27`, i.e. `h ≈ 10^{11}–10^{12}` `[SCRATCHPAD-GRADE]` — one
   to two decades past the whole measured range. **The theory permits the drift;
   it does not control it here.**

3. **The explicit branch is trivial at our `y`.** Weingartner's Corollary 2
   **[SOURCED]** gives `|∆(x,y)| ≤ 15.8 x log^{1/4}y / exp{√((log y)/6.315)}`,
   which at `y = 142` evaluates to `≈ 9.7x` — worse than the trivial bound, and
   the corollary's own proof says the stated bounds only beat trivial for
   `y ≥ 10¹⁸` unconditionally and `y ≥ 30000` on RH. Fan, *J. Number Theory*
   **260** (2024) 120–150, Cor. 1.2 is the underlying explicit estimate for
   `Φ(x,y)` **[SOURCED-BIB**, statement seen only as quoted by Weingartner**]**.
   **The numerically explicit rough-number literature does not reach `y ≈ 10²`.**

4. **The second target's premise is stale: this corpus has already aimed at
   `u = 2`, twice, and got most of the answer.** The brief says "nobody has ever
   aimed at it". `research/history/staging/attack-obstruction-audit.md` already
   states, in these words, that *"`u = 2` is exactly where a sieve survivor
   becomes a prime, and exactly where the κ = 1 lower-bound function
   `f(u) = 2e^γ log(u−1)/u` vanishes"*, that the tile target sits at
   `u = 2·ln x′/ln x` and converges to 2 **from above with margin tending to
   zero**, and gives the P1–P5 chain with its own confidence table.
   `research/history/staging/attack-wrongdirection-audit.md` §7 already carries
   the circularity half: *"legal at fixed `u > 2`, TPC-strength if uniform in `u`
   down to 2"*, citing `bv-import-survey.md` §3.3's *"At `u = 2` the statement IS
   the twin conjecture with its HL constant"*. Both are HELD. **Anything in §6
   below that is new is new only in the census coordinate.**

5. **The brief's live-doc warning is stale on all three counts.** All three
   corrections have LANDED in `paper/wall-note.md`, dated 2026-08-27: Face 4 now
   reads "an **upper bound on the sifting limit that the DHR dimension-2 sieve
   attains**"; Face 1 now reads "the operative floor is 8 — the parity floor of
   Selberg's `Λ²` at `κ = 2`"; Face 2's `m ≥ 3` sentence now carries "**That is
   refuted**". §8 below proposes no corrections to those three and instead
   records one *supporting source* Face 4 does not yet carry.

6. **The published short-interval variance theory names the corpus's
   unexplained sub-Poisson dispersion and, once the right member of its family
   is used, still misses its size by a factor of two to three.** Gorodetsky, *Math. Z.* **308** (2024) no. 4, Paper No. 59
   (arXiv:2111.00853) **[SOURCED**, abstract and Thms 1.1/1.3 read at the arXiv
   HTML**]** proves that the variance of `y`-rough integers in short intervals
   is *asymptotically smaller than the naive probabilistic prediction once the
   interval is at least a power of `y`*, with main term
   `M(H,y) = ∏_{2<p≤y}(1−2/p) Σ_{n≥1} g_y(n){H/2n}(1−{H/2n})` and, for large
   `y`, `M(H,y) ∼ H P_y λ(u)`, `u = log H/log y`,
   `λ(u) = e^{−γ}∫_u^∞ ρ(v)dv`. The corpus's own `s = ln W/ln y*` **is** that
   `u` (2.317 to 2.608 across bands, `[CITED]`), and the leading factor
   `∏(1−2/p)` **is** the corpus's `V₂`. But the comparison has to be made
   against the right member of the family, and Gorodetsky's `λ` is not it: his
   theorem excludes **one** class per prime, so his `λ` is `λ₁`, while the
   corpus's census counts rough **pairs**, two excluded classes per prime, whose
   comparand is `λ₂` (`lit-dickman-variance.md` §0, Gorodetsky's `κ = 1` scope
   confirmed at source). At the corpus's own band coordinates `s = 2.317` and
   `s = 2.608`, `λ₂` reads **0.3403** and **0.2508** `[SCRATCHPAD-GRADE]`
   against the measured `χ²/df = 0.718` at B8 `[CITED]` — a factor of **2.11 to
   2.86**. The like-for-like `λ₁` figures at the same 0.718 are **13.9** and
   **25.2**; the 22.7 this note first recorded is the top of a six-band range
   and attaches to a different band's `χ²/df`, so it is not the comparand
   (`redteam-0828-varE.md` §7). Using `λ₂` shrinks the mismatch by a factor of
   about **6.6 to 8.8 and does not close it**. **The transplant is still
   invalid or the two objects are still different; either way the constant is
   not derived**, and nothing here says the residual factor of two is
   explicable — it may be a hypothesis violation, a difference between a census
   error statistic and a uniform-window variance, or a real disagreement.

**Now the confirming half, and it is one finding, not a route.**

**The drift IS a finite-size Mertens artefact, and it is zero-parameter.** In
§2.1 the crossing condition of the corpus's own zero-parameter main term
collapses algebraically — `C`, `V₂`, `κ` and `ρ(2)` all cancel identically — to

> **`ω(ln h / ln y) < ∏_{y < p ≤ Q} (1 − 1/p)`**,

whose asymptotic form (`∏ → ln y/ln Q = 2/u`) is exactly the crossing law
`u ω(u) < 2`. Verified with 0 mismatches in 2,673 tests against the producer's
literal `Xcorr < Tmain` `[SCRATCHPAD-GRADE]`. Evaluating that condition on the
actual prime grid, with no sieving, no `T`, and no fitted quantity, reproduces
the measured band means:

| band | MEASURED `[CITED]` | zero-parameter prediction `[SCRATCHPAD-GRADE]` | meas/pred | share of the deficit vs `1/u*` explained |
|---|---|---|---|---|
| B3 | 0.2624 | 0.26278 | 0.9985 | 0.979 |
| B4 | 0.2705 | 0.27076 | 0.9990 | 0.974 |
| B5 | 0.2720 | 0.27158 | 1.0016 | 1.050 |
| B6 | 0.2740 | 0.27431 | 0.9989 | 0.952 |
| B7 | 0.2749 | 0.27484 | 1.0002 | 1.010 |
| B8 | 0.2763 | 0.27647 | 0.9994 | 0.958 |

**Agreement is 0.9985 to 1.0016, and 95% to 105% of the drift is accounted
for.** `quadpoint-identity-01.md` §6's first NOT-REACHED bullet ("the
finite-size drift has no model") is answered on this range, and
`attack-roughpair-error.md` §6's by-product ("the direct check at the level of
`ln y*/ln h` band means was not run") is now run. **What derives it is
arithmetic — the exact partial products — not an analytic next-order term.**

**And the asymptote moves.** The prediction converges to `1/u* = 0.280438` from
below, **not** to the identity note's `1/(2e^γ) = 0.280730`. Forward, with no
sieving: `ln y*/ln h = 0.27650, 0.27730, 0.27903, 0.27949, 0.27984, 0.28019` at
`Q = 10⁴, 3.16·10⁴, 10⁵, 3.16·10⁵, 10⁶, 10⁷` `[SCRATCHPAD-GRADE]`. Under PNT the
Mertens deviation `m(y) − 1` is `O(exp(−c√log y))`, so **the theory predicts the
drift dies faster than any power of `1/log h`, and the limit is `0.280438`.**

---

## 1. The gate, run before any experiment

### (a) Structural fit: **STRONG-ANALOGY** (not EXACT-IDENTITY)

The temptation is to grade this EXACT-IDENTITY, and that would be wrong twice.

- The **object** is an exact identity and it is **already banked elsewhere**:
  `X(y)` is the dimension-2 sifting function `S(A,z)`, `A_p = {n : p|n(n+2)}`,
  minus the prime-bearing pairs (`quadpoint-prior-art.md` §1.1, Ford §1.7.2
  **[SOURCED**, re-read this session at the same sha256 the corpus recorded**]**:
  *"Here `S(A, √x + 2)` counts the number of twin prime pairs between `x + 2` and
  `x`."*). That identification is not this row's payoff and this row may not
  claim it.
- The **field being imported here** — the analytic theory of `Φ(x,y)`, de Bruijn,
  the saddle-point apparatus, Hildebrand–Tenenbaum uniformity — owns a
  **cumulative** count from 1 with `y → ∞`, in one dimension. The corpus's object
  is a **local** count in a window of length `h^{0.575..0.65}` at height `h`, on
  **pairs**, at `y ≈ 10²–10³`. Each theorem transfers only with a stated
  modification, and §0.1 shows one of them **fails** under that modification.
  That is the definition of STRONG-ANALOGY, and §4.1 states the modification
  exactly: `Φ(x,y) ≈ x μ_y(u)` is the integral of the local density, so the
  short-window object is the integrand and not the integral.

### (b) Circularity: **SPLIT — CLEAN for the payoff actually taken, TPC-STRENGTH for the certificate, and CIRCULAR for the certificate under the capture identity**

The brief warns to be careful here and the warning is correct.

- **CLEAN**, for the half this row actually banks: reproducing a measured drift
  from exact partial products and a published asymptotic needs no hypothesis of
  any strength. It is a finite computation plus a citation.
- **TPC-STRENGTH, unconditionally**, for anything of the form "a bound on `X(y)`
  of the needed strength". This is not a judgement call and it needs no
  machinery: `X(y) ≥ 0` always, so **`X(y) < T` forces `T ≥ 1`** — a twin pair in
  `[Q², Q′²)`. Proving it at every anchor is the Zone Postulate, hence TPC.
- **CIRCULAR**, under the capture identity: `floor_K = T − X(K)` makes
  "`X(y) < T` at every anchor" *literally* "floor ≥ 1 at every anchor", i.e. the
  postulate written in census notation. This is the **fifth** wrong-direction
  arrival by the map's own count (after `L = 1`, `H″(m=1)`, `H″(m=2)`, and any
  constant bound on `δ`). It should be recorded as such.

The consequence is a scoping rule for anyone who reads §0's confirming half as
encouraging: **the drift being derived buys nothing toward the certificate**,
because the derivation is of the main term and the certificate is a statement
about the main term *and* everything else, at TPC strength.

### (c) Expected payoff, by type

**PUBLISHED-ANCHOR + DERIVED-CONSTANT + WALL-ADDRESS.** Not THEOREM (nothing
here is proved), not CLOSURE (no family of routes dies). Priced at 4 h; took
about that.

---

## 2. The algebra: what the corpus's own main term says the crossing is

### 2.1 The collapse

`attack-roughpair-error-01.js` lines 37–51 define, on the wheel-30 channel with
`C` openers, actives `p₁ < p₂ < … = 7, 11, 13, …` up to `Q`, `nR` of them,
`h = Q²`:

```
V2(K) = ∏_{i≤K}(1 − 2/p_i)          U(K) = ∏_{i>K}(1 − 1/p_i)
b_K   = ω(u_K) e^γ,  u_K = ln h/ln p_K       b_Q = ω(2) e^γ = e^γ/2
Xcorr(K)/C = V2(K) b_K² − 2 V2(K) U(K) b_K b_Q + V2(nR) b_Q²
Tmain/C    = V2(nR) b_Q²
```

The third term of `Xcorr` **is** `Tmain`. So

```
Xcorr(K) < Tmain  ⟺  V2(K) b_K (b_K − 2 U(K) b_Q) < 0
                  ⟺  b_K < 2 U(K) b_Q
                  ⟺  ω(u_K) < U(K).
```

`C`, `V2(K)`, `V2(nR)`, `e^γ`, `ρ(2)` and the local factor `κ` all cancel
identically. **Verified numerically: 0 mismatches in 2,673 literal evaluations
of `Xcorr < Tmain` against `ω(u_K) < U(K)` across the anchors `101 ≤ Q ≤ 400`**
`[SCRATCHPAD-GRADE]`. Since `U(K) = ∏_{y<p≤Q}(1−1/p) → ln y/ln Q = 2/u`, the
condition is `u ω(u) < 2` in the limit, which is `quadpoint-prior-art.md` §2.2's
crossing law. **So the identity note's §3 claim that "κ cancels EXACTLY" is
true and understated: `V₂` cancels too, and what is left is a pure dimension-1
Mertens ratio against `ω`.**

### 2.2 The finite-size factor, isolated

Write `m(z) := e^γ (log z) ∏_{p≤z}(1−1/p) → 1`. Then
`U(K) = (ln y/ln Q)·M` with `M = m(Q)/m(y)`, and the exact crossing is

> **`u ω(u) = 2M`,  `M = m(Q)/m(y*)`.**

`M > 1` because `m` is still below 1 at `y ≈ 10²` and essentially 1 at
`Q ≈ 10⁴`; `uω(u)` is increasing (its derivative is `ω(u−1) > 0`); so the root
moves **up** in `u` and `ln y*/ln h` sits **below** `1/u*`. **That is the
measured direction, and it comes out of the sign of one Mertens deviation.**

`[SCRATCHPAD-GRADE]` `m(50) = 0.9664`, `m(100) = 0.9869`, `m(150) = 0.9872`,
`m(200) = 0.9804`, `m(500) = 0.9919`, `m(1000) = 0.9961`, `m(3000) = 0.9977`,
`m(10007) = 0.9987`. Band means of `M`: `1.0997, 1.0534, 1.0430, 1.0302,
1.0256, 1.0181` over B3..B8.

**A caveat that belongs beside that table.** `m` is not monotone at these
scales (`m(150) = 0.9872` then `m(200) = 0.9804`); it oscillates with the
Chebyshev error, and the oscillation amplitude near `y ≈ 10²` is `±0.007`, which
is of the same order as the entire B8 deficit. **Part of the "derivation" is
riding on prime-counting noise at small `y`, not on a smooth analytic term**,
and that is why §0's confidence is 0.88 and not higher.

### 2.3 The three-line decomposition of the B8 number

`[SCRATCHPAD-GRADE]`, band means of `ln y*/ln h`:

| stage | B3 | B8 |
|---|---|---|
| continuous asymptotic `1/u*` | 0.280438 | 0.280438 |
| …with the Mertens factor `M` (continuous root of `uω(u) = 2M`) | 0.2553 | 0.2755 |
| …plus the prime-grid discreteness (least active past the threshold) | 0.26278 | 0.27647 |
| MEASURED `[CITED]` | 0.2624 | 0.2763 |

Two zero-parameter effects, of opposite sign, and their sum lands on the
measurement. Neither was fitted.

---

## 3. The direct check the brief named, in full

Producer: `rough-depthlaw-check.js` (session scratchpad). Gates: `ω(2) = 0.5`,
`3ω(3) = 1 + ln 2 = 1.69314718`, `ω(12) = 0.56145948 = e^{−γ}`, root of
`uω(u) = 2` at `u* = 3.565847`, all to 8 digits `[SCRATCHPAD-GRADE]` — the same
gates `attack-roughpair-error-01.js` uses, reproduced independently at a
`10⁻⁵` grid against its `10⁻⁴`.

The table is §0's. Three readings, each MEASURED-against-derived on this range
and nothing more:

1. **Six bands, agreement 0.9985 to 1.0016.** rms residual over the six band
   means: `0.000294`. The residuals alternate sign (`−, −, +, −, +, −`), which
   is what a discretisation residual looks like and not what a missing
   systematic term looks like.
2. **Ratio to the identity note's candidate**: `0.9347, 0.9636, 0.9689, 0.9760,
   0.9792, 0.9842` — reproducing `[CITED]` `0.935 → 0.984` to the printed
   digits, which is the check that the coordinate is the same one.
3. **Ratio to the corrected asymptote `1/u*`**: `0.9357, 0.9646, 0.9699, 0.9770,
   0.9803, 0.9852`. The drift is toward `1/u*`, and it will overshoot the
   identity note's candidate never, because `1/u* < 1/(2e^γ)`.

**Forward, no sieving, main term only** `[SCRATCHPAD-GRADE]`:

| `Q` | `K*` | `y*` | `ln y*/ln h` | `1/u* −` pred |
|---|---|---|---|---|
| 10007 | 35 | 163 | 0.27650 | 0.003936 |
| 31607 | 62 | 313 | 0.27730 | 0.003142 |
| 100003 | 110 | 617 | 0.27903 | 0.001411 |
| 316243 | 192 | 1187 | 0.27949 | 0.000944 |
| 1000003 | 336 | 2281 | 0.27984 | 0.000595 |
| 10000019 | 1045 | 8369 | 0.28019 | 0.000247 |

**This disagrees with the identity note's own forecast and that is the cheapest
falsification test on the board.** `quadpoint-identity-01.md` §3 forecasts
`y* ≈ 336` at `Q = 31607`, from `y* = h^{1/(2e^γ)}`. The zero-parameter main term
forecasts `y* = 313`, a 7% disagreement in `y*` at a single anchor. Single
anchors are noisy (the prime grid steps `ln y*/ln h` by `≈ 0.0025` at that
size), so **the discriminating statement is the band mean**, and any prereg for
the 31607 tier should seal the band-mean prediction, not the point one.

---

## 4. Pricing the published next-order term

### 4.1 What `μ_y(u)` is, in one line

Let the local density of `y`-rough integers at height `t` be `ω(u_t)/log y`,
`u_t = log t/log y`. Substituting `t = x y^{−v}`:

> `∫₁^x ω(log t/log y)/log y dt = x ∫₀^u ω(u−v) y^{−v} dv = x μ_y(u)`.

**So `Φ(x,y) ≈ x μ_y(u)` is exactly "integrate the local density", and de
Bruijn's refinement `μ_y` is exactly the cumulative-minus-local difference.**
The corpus counts in `[Q², Q′²)`, a window of relative width `h^{−0.35}`. The
right object there is the integrand. There is no term to import.

This is a derivation, not an appeal to authority, and it is the strongest
statement in this section.

### 4.2 The two numerical tests, both negative

Write `Ω_y(u) := (log y) μ_y(u) = ∫₀^{u log y} ω(u − t/log y) e^{−t} dt`, so
`Ω_y(u) → ω(u)`. `[SCRATCHPAD-GRADE]`:

| `y` | `ω(3.566)` | `Ω_y(3.566)` | ratio |
|---|---|---|---|
| 142 | 0.560877 | 0.561318 | 1.000786 |
| 313 | 0.560877 | 0.561210 | 1.000593 |
| 2281 | 0.560877 | 0.561023 | 1.000262 |
| 8369 | 0.560877 | 0.560957 | 1.000143 |

Substituting `Ω` for `ω` in §2.1's crossing condition moves the B8 band mean
from `0.27647` to `0.27661`, i.e. by `0.00014` against a total drift of
`0.00414`, **and raises the six-band rms residual from 0.000294 to 0.000308.**
The term is real, computable, zero-parameter, of the right sign, an order of
magnitude too small, and it makes the fit worse.

At the calibrated point it is worse than useless. `Ω_Q(2)/ω(2) = 1.0788,
1.0710, 1.0658, 1.0612, 1.0537` at `Q = 1499, 3163, 5623, 10007, 31607`, so the
pair-side factor `(Ω_Q(2)e^γ)²` inflates `Tmain` by **16.4%, 14.7%, 13.6%,
12.6%, 11.0%** — against a measured `T/Tmain(corr) = 1.0024` at B7 and `1.0019`
at B8 `[CITED]`. **The one point where the truth of a pair count is known
refuses the term by a factor of 66.**

### 4.3 What the literature does and does not adjudicate

Two published main-term forms for `Φ(x,y)` differ by exactly the factor `m(y)`
this note's §2.2 identifies as the drift's source: de Bruijn's
`W = x μ_y(u) Π(y) e^γ log y` carries the **exact** partial product `Π(y)`,
while the saddle-point / explicit branch (Tenenbaum III.6.4's `W₁`, Fan's
`x μ_y(u)`) does not. **[SOURCED]**, both from Weingartner pp. 1–2. Their
difference is `O(exp(−c√log y))` under PNT, which is below every published error
term, so **the literature cannot adjudicate between them at `y ≈ 10²`, and the
corpus's measurement can: the exact-product form wins, by 0.16% against 1.5%.**
That is a small, genuine, checkable empirical statement about which published
normalisation is the useful one at this scale, and it is the only thing in this
note that the literature does not already own.

---

## 5. The second target: what happens at `u = 2` for dimension 2

### 5.1 The four arrivals are one identity

- the census's `X(√h) = 0` (identity note §2, bullet 2);
- the product form being "exactly right at `u = 2`", `2ω(2) = 1`
  (`quadpoint-prior-art.md` §2.3);
- the tile-side target `G₂(x#) < x′² − 2` asking for positivity at
  `u = 2·ln x′/ln x → 2⁺` (`attack-obstruction-audit.md`);
- Ford §1.7.2's *"`S(A, √x + 2)` counts the number of twin prime pairs"*
  **[SOURCED]**.

All four are the **square rule**: a number below `x` with no prime factor
`≤ √x` is prime. In Buchstab coordinates that is `ω(2) = 1/2`, i.e.
`u ω(u) = 1` at `u = 2`: rough density equals prime density. **This is one
object seen four times, not four objects converging.** The corpus's own
`attack-obstruction-audit.md` says as much for two of the four; this note adds
the census and the product-form arrivals to the same list.

### 5.2 The one genuine singularity at `u = 2`, and it is dimension 1

`ω(u) = 1/u` on `[1,2]` and `uω(u) = 1 + ln(u−1)` on `[2,3]`, so
`ω′(2⁻) = −1/4` and `ω′(2⁺) = +1/4`: **a jump of `1/2` in the first
derivative**, verified numerically to 5 digits `[SCRATCHPAD-GRADE]`. `u = 2` is
a real non-smooth point of the Buchstab function — the `Ω(n) ≤ 1` boundary,
which is the square rule again. It is a singularity of the **counting
function**, in **dimension 1**, and the corpus reaches it only through the
product-form heuristic `ω(u)²`, which `quadpoint-prior-art.md` §8 already flags
as validated at exactly one point.

### 5.3 It is NOT a singular point of the dimension-2 sifting functions

The singular points of the `κ`-dimensional lower-bound sieve function are the
sifting limit `β(κ)` and its translates, where `f_κ` vanishes and the
delay-differential system loses smoothness. Ford, *Sieve methods*, Spring 2023,
§3.1 **[SOURCED**, page image, sha256 in §7 — the same artifact the corpus
already records**]**:

> "The exact value of `β(κ)` is known only for `κ ∈ [0, 1/2] ∪ {1}`, in these
> cases `β(κ) = 1` for `κ ⩽ 1/2` and `β(1) = 2`. … The exact value of `β(κ)` is
> unknown in all cases `κ > 1/2` except for `κ = 1`."

and his Table 1 is headed **"Known upper bounds on the sieving limit `β(κ)`"**,
listing `κ = 0.5 → 1.0`, `κ = 1.0 → 2.0`, `κ = 2.0 → 4.2665`, `κ = 3.0 →
6.6409`.

So at `κ = 2` the method's singular point is `β(2) ≤ 4.2665`, **exact value
unknown, no published lower bound**, and `u = 2` is not it. The numerical
coincidence at `κ = 1` — where the sifting limit `β(1) = 2` equals the square
rule's 2 — is the "miracle of the one-class problem" already quoted in
`covering-dive.md` §1.3, and it does **not** repeat at `κ = 2`. **The `4.2665 →
2` gap is exactly the distance between the method's singular point and the
identity point.** That is the corpus's known wall, restated; it is not new
information and it is not a route.

### 5.4 The circularity, in the census coordinate

If a dimension-2 correction function `W₂(u)` existed with
`S(A, x^{1/u}) ∼ W₂(u) X V₂(x^{1/u})` uniformly down to `u = 2⁺` and
`W₂(2⁺) > 0`, then by Ford §1.7.2's identity the limit at `u = 2` is the twin
count, so `π₂(x) ≫ x/log²x`. **Knowing the dimension-2 Buchstab function at or
below `u = 2` is the Twin Prime Conjecture.** This is the same conclusion
`attack-wrongdirection-audit.md` §7 reached in the `bv-import-survey` coordinate
("TPC-strength if uniform in `u` down to 2"); this note confirms it in the
census coordinate and adds the reason `W₂` must be non-smooth at `u = 2` at
all: for `u < 2` both members are forced prime, for `2 < u < 3` each may carry
two factors, so `u = 2` is a factorisation-type threshold exactly as `u = 2` is
for `ω`. **The one place the answer would be interesting is definitionally out
of reach, and the corpus already knew.**

### 5.5 The direct answer the brief asks for

**The `u = 2` arrival is a normalisation identity, not a singular point of the
two-dimensional sifting functions.** More precisely, and this is the honest
version of the sentence: it *is* a genuine non-smooth point — of the *counting
function*, in *dimension 1*, for an elementary reason (the `Ω ≤ 1` threshold) —
and it is *not* a singular point of the *sifting-limit apparatus* at `κ = 2`,
whose singular point is `β(2) ≤ 4.2665` with the exact value unknown in print.
The corpus's repeated arrivals are the same identity in four coordinates. **No
route opens from either reading.**

---

## 6. What would falsify each claim, and whether the check has run

| claim | falsifier | run? |
|---|---|---|
| The drift is the exact-Mertens finite-size term | a band where meas/pred(3) leaves `[0.99, 1.01]` | **run**, six bands, `0.9985..1.0016` |
| …and not a missing systematic term | residuals with a consistent sign | **run**, signs alternate `−,−,+,−,+,−` |
| The asymptote is `1/u*` | a measured band mean above `1/(2e^γ)` at any `Q` | not run, and cannot be on this range |
| The 31607 forecast | measured band mean at the 31607 tier vs 0.2773 (pred) and 0.2807 (note's candidate) | **NOT RUN — this is the cheapest prereg on the board** |
| de Bruijn's `μ_y` is the wrong term | it improving the fit, or `T/Tmain` being ≈ 1.12 rather than 1.002 | **run**, both negative |
| Gorodetsky's `λ` derives the dispersion | `λ(s) ≈ χ²/df` | **run**, off by 12× to 23× |
| `u = 2` is not the `κ = 2` sifting limit | a published lower bound `β(2) > 2` | **searched, none in print** (Ford §3.1 says the value is unknown) |
| The whole §3 agreement | `attack-quadpoint-03.js`'s band means being wrong | **NOT CHECKED** — cited, never recomputed, and the producer is HELD |

---

## 7. Artifacts read at page image this session

| artifact | source | sha256 |
|---|---|---|
| Weingartner, *A link between error terms when counting smooth and rough numbers*, arXiv:2604.22058v1, 23 Apr 2026 | `arxiv.org/pdf/2604.22058` | `a1c0cc588106ac4838026b00f064b23e01430bc31bbbb6ca305477b252bfd019` |
| Ford, *Sieve methods lecture notes, Spring 2023* | `ford126.web.illinois.edu/sieve2023.pdf` | `a6e8462f1e76606614e5c2891b419515be408d5f11f0b82915f5c24e05c00e06` (matches the sha256 `quadpoint-prior-art.md` §5 recorded — same artifact) |
| Murty–Vatwani, *Twin primes and the parity problem*, J. Number Theory **180** (2017) 643–659 | `mast.queensu.ca/~murty/TwinPrimes-Parity.pdf` | `0d53d7e1ed7879ffb0fbdb958832d9697ea37d2b261ab2db56a3cf62adbe861e` — read, and it does **not** carry a `u`-coordinate statement; it is a Möbius-equidistribution + EH route. Recorded so it is not re-fetched |

Read at the arXiv HTML, not at page image: Gorodetsky arXiv:2111.00853 (Thms
1.1, 1.3, eqs 1.5, 1.10, 1.12). **[NOT REACHED]**: Tenenbaum's *Introduction*
(3rd ed.) itself, at any section — every III.6 statement here is quoted through
Weingartner; Fan, *J. Number Theory* **260** (2024) 120–150, Cor. 1.2, quoted
through Weingartner; de Bruijn 1950 and 1951 themselves; Saias 1989;
Hildebrand–Tenenbaum's survey; Cheer–Goldston on the oscillation of
`ω(u) − e^{−γ}`; MathSciNet, again.

**Channel calibration, per `SEARCH-CONVENTIONS.md`.** WebSearch was calibrated
in the same minutes on the known positive `Kourbatov maximal gaps between twin
primes arXiv 1301.2242`, which returned arXiv:1301.2242 on the first query.

---

## 8. Drafted rows and drafted corrections (NOT APPLIED — this file edits nothing)

### 8.1 DRAFTED `research/IMPORT-MAP.md` §2 row

| # | field | the importable theorem, and where its statement lives | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 15 | the anatomy of integers / analytic theory of rough numbers | de Bruijn's improved approximation `W(x,y) = x μ_y(u) Π(y) e^γ log y`, `μ_y(u) = ∫₀^u ω(u−v)y^{−v}dv`, *Ned. Akad. Wet. Proc.* **53** (1950) 803–812 **[SOURCED**, verbatim via Weingartner arXiv:2604.22058 pp. 1–2**]**; Tenenbaum, *Introduction* 3rd ed. Thm III.6.10 `Q,∆ ≪ xρ(u)/L_ε(y)` in `exp{(loglog x)^{5/3+ε}} ≤ y ≤ x` **[SOURCED**, same route; book **[NOT REACHED]**]**; Fan, *J. Number Theory* **260** (2024) 120–150 Cor. 1.2 **[SOURCED-BIB]**; Gorodetsky, *Math. Z.* **308** (2024) no. 4, Paper 59, Thms 1.1/1.3, `M(H,y) ∼ H P_y λ(u)`, `λ(u) = e^{−γ}∫_u^∞ρ` **[SOURCED**, arXiv HTML**]**; Ford, *Sieve methods* Spring 2023 §3.1 Def. 2 + Table 1 **[SOURCED**, page image**]** | the rough-pair census `X(y)` and the depth law `y*(h)`; the census's error `E` and its sub-Poisson dispersion | `quadpoint-identity-01.md` §6's unmodelled 0.935 → 0.984 drift; `attack-roughpair-error.md` §8's unexplained `χ²/df < 1` | **STRONG-ANALOGY** — the object is an exact identity already banked (`quadpoint-prior-art.md` §1.1), but every theorem in the field is **cumulative from 1, dimension 1**, and transfers only with the stated modification cumulative → local (`import-rough-anatomy.md` §4.1) | **SPLIT: CLEAN** for the drift; **TPC-STRENGTH** for any bound on `X(y)` of the needed strength (`X ≥ 0`, so `X < T ⟹ T ≥ 1`); **CIRCULAR** under the capture identity — the fifth wrong-direction arrival | PUBLISHED-ANCHOR + DERIVED-CONSTANT + WALL-ADDRESS | 4 h | **LANDED 2026-08-27, drift derived / next-order term refuted** — the crossing collapses to `ω(ln h/ln y) < ∏_{y<p≤Q}(1−1/p)` with `C, V₂, κ, ρ(2)` cancelling identically; that zero-parameter condition reproduces the measured band means at `0.9985..1.0016` over six bands and 95–105% of the drift; the asymptote is `1/u* = 0.280438`, **not** the note's `1/(2e^γ) = 0.280730`; de Bruijn's `μ_y`, the one next-order term in print, is a cumulative-vs-local artefact — `+0.079%` at the depth, worsens the rms residual, and inflates `Tmain` by 12.6% at the calibrated `u = 2` against a measured 1.0019; the corpus's `(h,y*)` are outside Tenenbaum III.6.10's domain at every measured band (entered near `h ≈ 10^{11}`); Gorodetsky owns the sub-Poisson convention and shares the coordinate `s = ln W/ln y` and the factor `∏(1−2/p)`, but his `λ` is `λ₁` and the census's comparand is `λ₂`, which sits 2.11 to 2.86× below the measured `χ²/df` (corrected 2026-08-28 from the 12–23× first recorded here, which compared against the wrong member of the family; `lit-dickman-variance.md` §0). **No exponent moved.** `history/staging/import-rough-anatomy.md` |

### 8.2 DRAFTED `research/REFUTED.md` rows (two)

| route | verdict | why, in one clause | closed | record |
|---|---|---|---|---|
| the depth law's 0.935 → 0.984 drift as unmodelled structure | CLOSED | it is the finite-size Mertens factor `M = m(Q)/m(y*)` in the exact crossing `uω(u) = 2M`, reproducing the measured band means at 0.9985–1.0016 over six bands with zero free parameters, and the asymptote is `1/u* = 0.280438` rather than `1/(2e^γ)` | 2026-08-27 | `history/staging/import-rough-anatomy.md` §§2–3 |
| de Bruijn's `μ_y(u)` (the one published next-order term for `Φ(x,y)`) as the explanation of that drift | REFUTED | it is the cumulative-minus-local difference and the corpus counts locally in short windows: `+0.079%` at the depth against a 1.5% drift, it worsens the six-band rms residual, and it inflates the twin main term by 12.6% at the calibrated `u = 2` against a measured 1.0019 | 2026-08-27 | `history/staging/import-rough-anatomy.md` §4 |

### 8.3 Live-doc corrections

**None of the three the brief warned about is still live.** All three landed in
`paper/wall-note.md` on 2026-08-27, before this run: Face 4 now reads *"an
**upper bound on the sifting limit that the DHR dimension-2 sieve attains**"*,
Face 1 now reads *"the operative floor is 8 — the parity floor of Selberg's
`Λ²` at `κ = 2`"*, and Face 2's `m ≥ 3` sentence now carries *"**That is
refuted**"*. Nothing to correct; recorded so the next brief does not re-warn.

**One PROPOSED addition, for the owner of `paper/wall-note.md` §2 Face 4.** Face
4's corrected sentence cites Ford through `research/sift-limit-attack.md` §2.
The primary was re-read at page image this session at the sha256 above, and the
verbatim sentence is worth carrying, because it is stronger than the paraphrase
— it says the value is unknown, not merely that no lower bound is published:

> exact text to add after "…except `κ = 1` (Ford 2023, quoted at source in
> `research/sift-limit-attack.md` §2)":
>
> `Ford's own words, §3.1: "The exact value of β(κ) is known only for κ ∈ [0, 1/2] ∪ {1}, in these cases β(κ) = 1 for κ ⩽ 1/2 and β(1) = 2. … The exact value of β(κ) is unknown in all cases κ > 1/2 except for κ = 1", and his Table 1 is headed "Known upper bounds on the sieving limit β(κ)" (re-read at page image 2026-08-27, sha256 a6e8462f…, `history/staging/import-rough-anatomy.md` §5.3).`

**One PROPOSED correction, for the owner of `research/history/staging/quadpoint-identity-01.md`** (HELD, so this is a note to its owner and not an edit):

> §3's forecast sentence reads *"the forecasts for any future run are `y* ≈ 336`
> at `Q = 31607`, `≈ 642` at `Q = 100003`"*. Those come from the asymptotic
> candidate `h^{1/(2e^γ)}`. The zero-parameter main term forecasts `y* = 313`
> and `y* = 617` at the same two anchors `[SCRATCHPAD-GRADE]`, a 7% and 4%
> disagreement. **The two forecasts should be sealed side by side in any prereg,
> because they are a discriminating test and the note's is the one the
> measurement is already running away from.**

### 8.4 PROPOSED `research/SEARCH-CONVENTIONS.md` rows (NOT applied)

**§1 table:**

| object | our name | canonical | **OWNING convention — search THIS** | where it lives |
|---|---|---|---|---|
| the fluctuation of a rough count in a short window | the census error `E`, `χ²/df` | — | **"the variance of integers without small prime factors in short intervals"**; the coordinate is `u = log H/log y` and the sub-Poisson factor is `λ(u) = e^{−γ}∫_u^∞ρ`. Do **not** search "sub-Poisson" or "dispersion" | Gorodetsky, *Math. Z.* **308** (2024) no. 4, Paper 59 (arXiv:2111.00853), Thms 1.1, 1.3 |
| the next-order term of a rough-number count | "the finite-size correction" | — | **de Bruijn's `μ_y(u)` / the approximation `W(x,y)`**, and the saddle-point `W₁` — but note both are **cumulative from 1**; there is no short-window analogue in this convention | de Bruijn, *Ned. Akad. Wet. Proc.* **53** (1950) 803–812; Tenenbaum, *Introduction* 3rd ed. §III.6.4; Fan, *JNT* **260** (2024) 120–150 |

**§3 "searches already run" rows:**

| question | answer | do not redo |
|---|---|---|
| Does the published `Φ(x,y)` theory supply a next-order term for a **short-window, local** rough count at `y ≈ 10²`? | **No.** The one term in print (`μ_y`) is the cumulative-minus-local difference and is refuted for this object; the sharpest uniform estimate's domain starts near `h ≈ 10^{11}`; the explicit branch is trivial below `y ≈ 10¹⁸` (`y ≈ 3·10⁴` on RH) | settled for this scale; re-enter only with a short-interval statement |
| Is the corpus's sub-Poisson census dispersion a named published phenomenon? | **Yes in kind, no in size.** Gorodetsky 2024 owns it and shares the coordinate and the `∏(1−2/p)` factor; his `λ` is the one-class `λ₁`, and the two-class comparand `λ₂` is 2.11 to 2.86× below the measured `χ²/df` (corrected 2026-08-28; the 12–23× first recorded here was `λ₁` against a two-class count) | do not quote `λ` as the mechanism without a dimension-2, anchor-ensemble derivation |

---

## 9. NOT REACHED

- **Tenenbaum's *Introduction* was never opened.** Every III.6 statement here is
  second-hand through Weingartner. The brief named the book as a primary source
  and it stayed a citation. This is the largest gap in the note.
- **Fan 2024 Cor. 1.2's `h(y)` was not read**, so "the explicit branch is trivial
  at `y ≈ 10²`" rests on Weingartner's Corollary 2 for `∆`, not on Fan's own
  bound for `Φ`. The direction is certain; the crossover `y` is not.
- **Gorodetsky's hypotheses were not read at page level.** §0.6's residual
  mismatch, 2.11 to 2.86× as corrected, may be a hypothesis violation rather
  than a disagreement. The check
  that would settle it — his `y ≥ (2+ε)log H` and the second range condition,
  evaluated at the corpus's `(W, y*)` — was not run.
- **The dimension-2 correction function `W₂(u)` is still not computed anywhere**,
  which `quadpoint-prior-art.md` §8 already recorded. Nothing here changes that,
  and §5.4 says why nobody will.
- **Nothing was re-derived inside an embedded producer.** Every number marked
  `[SCRATCHPAD-GRADE]` needs that before it may be quoted anywhere else, and the
  §3 table in particular should be embedded before any prereg leans on it.
- **The capture identity was not verified.** Z0's standing debt is untouched.
- **No prereg was sealed.** The 31607 band-mean test named in §3 and §6 is the
  cheapest live item this note produces and it is not run.
- **MathSciNet unreached, again.** Every absence claim above rests on WebSearch,
  arXiv and page images.

---

*Producers: `rough-depthlaw-check.js`, `variant.js`, `debruijn.js`,
`lambda.js`, `fwd.js`, all in the session scratchpad, none embedded, none
`qc`-gated, none a repo number. CITED, never recomputed: the `ln y*/ln h` band
means and the `1/(2e^γ)` candidate (`attack-quadpoint-03.js` embedded OUTPUT,
SEC 2); `T/Tmain(corr)`, `χ²/df`, the `s` coordinate and the slack table
(`attack-roughpair-error-01.js` embedded OUTPUT); `β₂ = 4.2665`; the crossing
root `u* = 3.565845` (`quadpoint-prior-art.md` §2.2, reproduced independently
here at a finer grid as `3.565847`). History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
