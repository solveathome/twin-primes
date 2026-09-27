# The certificate engine — what natal-cap-28 assembled, and at what calibration

<!-- ledger
id: Q-certificate-engine
status: PARTIAL
todo: none
question: What did natal-cap-28 assemble, and at what calibration does the certificate engine stand?
verdict: There is no fully analytic certificate law and nothing here is closed: what reads as one object is nine at five calibrations with one of the nine refuted, the Certified-Head Theorem is PROVEN on 1/3/6 certified primes at @17/@19/@23, and every engine output carries the status of its weakest input, the HEURISTIC Buchstab Transfer Hypothesis.
-->

*(Companion prose for `natal-cap-28-analytic-certificate.js`, which had none.
The script composes cap-08 (the cap₂ definition), cap-12 (the Window Dilation
Lemma), cap-24 (the bound(K) machinery) and cap-25 (the 2·3^k discrepancy
lemma). Notation: level x, tile width W = x#, scour prime q, j = idx(q) = the
number of scour primes below q, k = the number of mids, cap₂(q) the second
staircase cap of `paper/staircase-note.md`, K the ladder depth, K\* the least
depth at which the pigeonhole closes.)*

**There is no "fully analytic certificate law", and nothing here is "closed".**
What reads as one object is nine, at five calibrations, and one of the nine is
refuted. The script's banner said otherwise until 2026-08-17 and now names the
head theorem, the two unproven ingredients and the predictions they condition.
**"The certificate engine" is an informal umbrella for
the machinery**, meaning the Certified-Head Theorem, the two lemmas it composes
and the Li-integral evaluator, and it is not a claim. The standing rule for it: **the
engine's outputs carry the status of their weakest input**, which is the Buchstab
Transfer Hypothesis, HEURISTIC. Predictions produced by the engine are PREDICTED,
never proven, at any quality of validation.

## Status

| sub-claim | status | scope | where the mathematics is |
|---|---|---|---|
| **Certified-Head Theorem** | PROVEN, explicit error term | the head only: 1 / 3 / 6 certified primes at @17 / @19 / @23, carrying 9.69% / 17.40% / 22.93% of Σcap₂ | §1 below, from `natal-cap-28-analytic-certificate.js` Result 1 |
| **Window Dilation Lemma** | PROVEN | every combo class; dilation preserves comb type and census | [natal-cap-12-overlap-sign.md](natal-cap-12-overlap-sign.md) §L1 |
| **Comb Discrepancy Lemma** | PROVEN | each of the 2·3^k Legendre terms is off its share by less than 1, so a window count is off by at most 2·3^k. That constant is the trivial per-block bound; the attained optimum is max G − min G, a computed number at each level rather than a formula | `natal-cap-25-excess-law.js`; the optimum in `history/staging/comb-discrepancy-tight.md` (SCRATCHPAD-GRADE, no embedded OUTPUT block) |
| **Tail Comb Equidistribution** | **PROVEN in the shallow regime (q_K = W^{o(1)}), empty at every run level; deep ladder open** | the tail regime q³ > W+1, in the limit only: the fundamental lemma's error factor needs s ≥ 10.82, first cleared at level x = 263, against s < 5 at every level reached or predicted | §2 below, from `history/staging/thm-capK-bv.md` §2 Theorem C |
| **Tail Envelope Measurement** | MEASURED | aggregate \|err\| 0.0–1.1% of tail mass, @13..@23 | §2 below |
| **Buchstab Transfer Hypothesis** | **HEURISTIC** — ω(u) itself is a theorem, the transfer to this conditioned ensemble is not | provable now at y = T^{o(1)} *and* q = T^{o(1)}, the second hypothesis being what puts the ensemble in the fundamental-lemma regime at all; open at y = T^{1/u} with u bounded | §3 below, [bv-import-survey.md](bv-import-survey.md) §3.3 |
| **Pair-Correlation Hypothesis for the deep-K deviation** | **REFUTED** | the deviation is all-orders, at every level measured | §3 below |
| **Priced-Deviation Measurement** | MEASURED | max \|err\| 3.41 → 0.21% at @23, 4.11 → 0.99% at @19, 3.39 → 0.62% at @17 | §3 below |
| **Analytic-Swap Calibration** | MEASURED envelope | b = 2.15 / 1.16 / 0.64% of Σcap₂ at @17 / @19 / @23, with b·ln³W flat at 47 ± 2 | §4 below |
| **Deep-Level K\* Predictions** | PREDICTED, conditional on the two unproven ingredients | @29 through @97, W to ~2.3·10³⁶ | §4 below |

The Window Dilation Lemma and the Comb Discrepancy Lemma are proven at every
level and need no qualifier. The Certified-Head Theorem is proven at every level
too, but it is **vacuous below @17**: at @13 it certifies nothing, the 34-prime
scour being too short, and its certified share is the head only. Read its scope
column with it. Everything
the engine says about a level no march has reached is PREDICTED, and the reason
is the HEURISTIC row and the half of the equidistribution row that is still
open at the depths the certificates need.

## 1. The Certified-Head Theorem

cap₂(q) has a closed form in three regimes, and the head — where the heaviest
caps are — is covered by a theorem. In m-coordinates each side of cap₂ is a
natal-type comb of density exactly N/W, by the Window Dilation Lemma. Legendre
over the j scour primes below q, with the Comb Discrepancy Lemma pricing each of
the 2^j terms, gives

**|cap₂(q) − main| ≤ 2^{j+1}·(2·3^k + 1)**,

with main = s(q) + (A+B)·(N/W)·∏_{i<j}(1 − 1/q_i) minus the two unit
corrections, A = ⌊(W−1)/q⌋, B = ⌊(W+1)/q⌋. Coverage is asserted at every
certified prime at every level. The certified share **grows with x**, because N
grows past 3^k: 9.69% at @17 (1 prime, max relative error 0.01%), 17.40% at @19
(3 primes, 0.34%), 22.93% at @23 (6 primes, 0.40%). At @13 the theorem certifies
nothing, the 34-prime scour being too short.

`README.md` lists this object under "Proven" as the Legendre-comb head
certificate. That is correct as to status; what it needs is the scope, which is
the head and not the sum.

## 2. The tail, and the ingredient that is proven there only in the limit

For q³ > W+1 the cofactor is prime and cap₂(q) ~ s(q) + d(x)·(π(A) + π(B) −
2π(q−1)), with d(x) = (1/4)∏_{7≤p≤x}(1 − 1/(p−1)) the cap-08 prediction factor.

> **Tail Comb Equidistribution [PROVEN in the shallow regime, in the limit
> only].** The primes equidistribute over the natal comb's classes in the tail
> range, well enough to control the main term above. **The obvious tool is
> vacuous**: the combined modulus is 30 × (the mids product) = W itself while
> the range is W/q < W, so Brun–Titchmarsh says nothing here. The route that
> works is the fundamental lemma of sieve theory over Bombieri–Vinogradov, and
> it is written out as Theorem C of `history/staging/thm-capK-bv.md` §2: for the
> FULL wheel and any depth K with q_K = W^{o(1)}, the prime-regime cap_K
> asymptotic is unconditional, at PROVEN short-note grade, and its K = 0
> corollary is exactly the statement above.

**What that theorem does not buy.** Anything finite: the fundamental lemma's
error factor is 1 + O(e^{9κ−s}·K_dim^{10}) with s = ln D/ln q_K, and with
K_dim = 1.2000 (measured, scratchpad-grade) it is below 1 only for s ≥ 10.82,
first cleared at level x = 263, while every march and every certificate here
sits at s < 5. Anything effective: BV's implied constant is ineffective.
Anything in the deep ladder: at @97 the bare-positivity depth gives
ln q_{K*}/ln T = 0.562, so q_K is a power of T and the hypothesis fails
outright. That is the half of the ingredient the certificates actually need, and
it is open.

The only finite-level statement is still the **Tail Envelope Measurement**:
the aggregate error is 0.0% to 1.1% of tail mass, with per-prime granularity at the deep tail where
cap₂ is O(1). A Li-based variant, fully computation-free, adds the classical
Li-versus-π offset, 2–5% at these small ranges and shrinking with x.

`TODO.md` item **8(b)** is this ingredient — "prime-comb equidistribution in the
tail regime (Brun–Titchmarsh vacuous at modulus W — needs another route)", which
is the box built above, Brun–Titchmarsh vacuity included. The item that would
*retire* it is 11(c), the cap₂ prime-regime asymptotic via Bombieri–Vinogradov,
and Theorem C is 11(c) delivered in the shallow regime and in the limit; what
8(b) keeps is the deep ladder and every finite level.

*(RE-ROUTED 2026-08-18. This line used to say "`TODO.md` item 11(b) is this
conjecture". Item 11(b) is "Fixed-depth cap_K as Siegel-Walfisz theorems", a
different object. The mis-route mattered because it hid the shape of §4's claim
below: item 8 covers **both** of the engine's unproven ingredients, (a) the
Buchstab transfer and (b) this conjecture, so pointing the tail conjecture
somewhere else made item 8 look like a single-ingredient item.)*

## 3. The deep-K deviation: one refutation, one heuristic, one measurement

**Refuted first.** The natural hypothesis was that the −3 to −4% deep-K
deviation is pair correlation, priced by a second-order inclusion–exclusion with
cap-12's pair terms. Exact violation statistics at four levels refute it: the
pair excess X₂ over the independence product is small and **sign-varying**
(+0.79% of truth at @19 full depth, −0.36% at @23), the triple excess X₃ is as
large as X₂ (−1.9%, −1.1%), and truncating at any fixed order does not converge
— even exact measured marginals plus an exponentiated pair excess left −3.4%.
cap-12's structured bias is real, and it is not where this deficit lives. **The
deviation is an all-orders correlation.**

**What prices it instead.** A fresh victim is n = q·m whose partner n ± 2, of
size ~W and x-rough, must stay q_K-rough as the ladder deepens. Buchstab's ω
counts y-rough integers, and the sharp-cutoff independence product misses exactly
the ω-oscillation, so the multiplicative correction is
B(q,K) = ⟨ω(ln n/ln y_K)⟩ / ⟨ω(ln n/ln x)⟩, averaged over n ∈ [q², W] with
cofactor weight 1/ln(n/q). One function prices both error lobes: the +1 to +2%
mid-curve bump where ω(u) > e^{−γ} near u ≈ 3, and the −3 to −4% deep deficit,
B → ω(2)/e^{−γ} = 0.890 as y → √n.

> **Buchstab Transfer Hypothesis [HEURISTIC].** That B(q,K) transfers to *this*
> conditioned ensemble — shifted rough pairs, conditioned on the freshness
> ladder. ω itself is a theorem and is not in question. The transfer is provable
> now at y = T^{o(1)} together with the second hypothesis q = T^{o(1)}, without
> which the ensemble is not in the fundamental-lemma regime at all, and it is
> open at y = T^{1/u} with u bounded
> ([bv-import-survey.md](bv-import-survey.md) §3.3,
> `history/staging/thm-buchstab-transfer-shallow.md` §3.5, §7).

**Priced-Deviation Measurement.** With the correction in, the maximum error over
the whole K-curve drops from 3.41% to 0.21% at @23, 4.11% to 0.99% at @19, 3.39%
to 0.62% at @17 and 2.54% to 1.67% at @13 — a residual that shrinks with level.
`TODO.md` item 8 is the proof of the transfer; it is one of the engine's **two**
unproven ingredients, the other being the tail conjecture of §2.

## 4. The engine, its calibration, and what it predicts

The engine turns (x, W, K) into a bound with no sieve and no march: sums become
Li integrals, cap₂ becomes the Result 1 main terms, the product becomes
exp ∫ ln(1 − 1/(v−1)) dLi(v), and the Buchstab factor becomes an ω-ratio. It is
hybrid by necessity: a purely continuous engine misprices the discrete head by
30–60% of bound(0), measured and discarded.

**Analytic-Swap Calibration [MEASURED].** Swapping exact cap₂ for its closed
form leaves a stable systematic overshoot b = 2.15% / 1.16% / 0.64% of Σcap₂ at
@17 / @19 / @23, with b·ln³W flat at 47 ± 2. This is declared as the engine's one
measured-envelope calibration, and it is what "fully analytic" actually costs.

**Validated where truth is known**: K\* = 2 / 9 / 26 against truth 2 / 10 / 27 at
@17 / @19 / @23; the floor at 10% depth 0.659 / 0.711 / 0.788 of truth against
0.652 / 0.713 / 0.787; ceilings within −0.8% to +0.2%. @13 is excluded from the
fit as too short.

**Deep-Level K\* Predictions [PREDICTED].** Central values K\* = 69, 171, 431,
1090, 2.15·10⁴, 7.41·10⁸ at @29, @31, @37, @41, @53, @97, where the tile reaches
W ~ 2.3·10³⁶ and the predicted surviving twin slots reach 2.74·10³². The
certificate technology gets relatively cheaper without limit in this
extrapolation: K\*/scour falls from 0.88% to 2·10⁻⁸ and the 10%-depth floor rises
from 0.85 to 0.996 of the prediction, so there is no efficiency collapse anywhere
in the range.

**One of these predictions has since been tested and passed.** The @29 march
(`natal-cap-18-at29.js`) measures K\*(29) = 69 against the engine's 69, and
certifies a floor of 31,327 twin pairs in the 29-tile. That is the engine's first
true falsification test, and it survived it. It does not upgrade the predictions'
calibration: the two unproven ingredients are unaffected by one confirmed point,
and every deeper number remains measured-envelope rather than theorem.

**Honest limits.** Nothing here approaches a twin-prime proof. The ladder still
cannot beat the march; it can now be priced without running it. The real
uncertainty at @53 and @97 is the model — whether b keeps falling like ln⁻³W, and
whether the two unproven equidistributions hold at 10³⁶ — not the arithmetic.

---

Cited from: [NATAL-CAP-CAMPAIGN.md](NATAL-CAP-CAMPAIGN.md),
[natal-cap-12-overlap-sign.md](natal-cap-12-overlap-sign.md). The object being
certified, cap₁/cap₂/cap_K, is defined in `paper/staircase-note.md`.
