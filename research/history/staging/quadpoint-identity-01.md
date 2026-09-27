# The capture identity: the transplanted cap family collapses exactly to the rough-pair census, floor_K = T − X(K), and the depth law gets the zero-parameter candidate y* = h^{1/(2e^γ)}

<!-- ledger
id: Q-capture-identity
status: ANSWERED
todo: Z2
question: Does the transplanted cap family collapse onto a classical object, and what does the collapse say about the depth law and the wall?
verdict: PROVEN, elementary: floor_K = T − X(K) on the half-open window with both members in [Q², Q′²), a convention that is load-bearing; the wall is renamed, not weakened; Σ capU counts each member against its own threshold, not against a uniform p_K, the two differing 11% to 37% at K*.
-->

*(2026-08-22. Staging note; nothing here is integrated into a live document.
HELD for the end-of-day adversarial roundup. Producer, formally embedded:
`research/attack-quadpoint-03.js` (2.2 s; out-sha256 196602b1...; a forced
re-embed stamp from adding one printed sanity figure before publication —
0 of 51 figures changed — is disclosed in its tail; `--check` passes
bit-honest). Calibration marked per claim: PROVEN, VERIFIED by exact
computation, MEASURED, HEURISTIC, OPEN. This note is Z2's first
deliverable: the analytic race's object simplified before the race is
run.)*

## 1. The capture identity [PROVEN, elementary; VERIFIED at every depth of all 1,227 anchors]

**Lemma.** Fix anchor Q, the half-open stretch S_Q = [Q², Q′²), capacity C
counting the channel pairs (a, a+2) with BOTH members in S_Q, twins T,
actives p₁ < p₂ < ... = 7, 11, 13, ..., and the pool
convention of `attack-quadpoint-01/02` (prime r at depth K reads the first
min(K, idx(r)) actives below r). Then for every K

> Σ_r capU_K(r) = (C − T) + X(K),  equivalently  **floor_K = T − X(K)**,

where X(K) = #{pairs with both members composite and
min(lpf(a), lpf(a+2)) > p_K}; X(0) = all both-composite pairs (CC).

The window convention is load-bearing, not cosmetic. Every composite
member of such a pair satisfies lpf(v) ≤ √v < Q′, hence lpf(v) ≤ Q, which
is step (i)'s finality. Finality fails at v = Q′², and (Q′² − 2, Q′²) is a
channel pair at 1227 of 1227 anchors, so the loose convention a + 2 ≤ hi
admits a pair whose composite member is a candidate of no r: floor_K moves
by +1 and T − X(K) does not, breaking the identity by exactly one at every
anchor tested [MEASURED, `redteam-0828-quadpoint.js` SEC C; 12 of 12].
`attack-quadpoint-03.js` implements the strict convention on both sides and
is consistent throughout.

*Proof.* (i) *Candidates are composite members, bijectively.* A candidate
of r is v = r·m in the window with lpf(m) ≥ r; since v is coprime to 30,
lpf(m) ≥ r holds iff r = lpf(v). Every composite member has
lpf ∈ [7, Q] (finality: a composite in the window has its least factor
among the actives) and is therefore a candidate of exactly one r; a prime
member is a candidate of none (m ≥ 2 forces v composite; m = 1 puts
v = r below the window). (ii) *The depth condition reads the partner's
lpf.* v survives r's depth-K conditions iff its partner is divisible by
none of the first min(K, idx(r)) actives, i.e. iff
lpf(partner) > p_{min(K, idx(r))}. (iii) *Classify pairs.* A composite
member with a prime partner always survives (a prime partner's lpf
exceeds every active). In a both-composite pair with lpfs r₁ < r₂
(equality is impossible): the r₁-member always survives — its partner's
lpf is r₂ > r₁, clearing r₁'s pool, which never reaches past r₁, at any
K. The r₂-member survives iff r₁ > p_K: if idx(r₂) ≤ K its pool is all
actives below r₂, which include r₁, killing it; if idx(r₂) > K the test
is r₁ > p_K — and r₁ > p_K itself forces idx(r₂) > K, so the two cases
are consistent. (iv) *Sum.* (C − T − CC) singles + CC always-surviving
first members + X(K) surviving second members = (C − T) + X(K). ∎

Producer verification: the caps recomputed on the v2 code path equal
T − X(K) at every K of every one of the 1,227 anchors to Q = 10007
(uncapped below 1499, K ≤ 64 above); the v2-cited K* values, the B8 band
mean, and the maximum (46 at Q = 9281) all reproduce through the identity
path.

## 2. What collapses [consequences, each now one line]

- **K*(Q) is a crossing point, on the set where T ≥ 1:** the least K with
  X(K) ≤ T − 1 — the depth cost is where the rough-pair census falls below
  the twin count. If T = 0 there is no such K, since X ≥ 0, so the
  statement presupposes T ≥ 1 and is written on that set (TODO Z2's
  2026-08-27 quantifier). Measured: 0 of 1,227 anchors have T = 0, so the
  band data lives entirely on {T ≥ 1} and cannot test the quantifier
  [MEASURED, `redteam-0828-quadpoint.js` SEC G].
- **The full-depth bijection** (v1's assert): X vanishes once p_K passes
  the largest composite lpf — both-composite pairs cannot be rough beyond
  Q in a finality window.
- **The K = 0 stretch-grid death:** certificate ⟺ CC ≤ T − 1, i.e.
  both-composite pairs FEWER than twins. Verified exact: the 8-anchor
  list {7, 11, 13, 19, 23, 31, 37, 43} is precisely the CC < T list.
- **The whole cap machinery needs no caps:** the certificate at (Q, y) is
  the statement "X(y) < T in S_Q" — twins outnumber the pairs that are
  composite-on-both-sides yet rough beyond y. The transplant instrument
  was measuring a classical object in disguise.

## 3. The depth law [HEURISTIC derivation; MEASURED-consistent, not confirmed]

Main terms, densities relative to channel positions at height h = Q²:
rough-beyond-y density δ_R(y) ~ (15/4e^γ)/ln y (Mertens over 7..y);
prime density δ_P ~ (15/4)/ln h. The pair correlations carry the SAME
local product κ = ∏_{p≥7} p(p−2)/(p−1)² = 0.9389 on both sides —
X/C ≈ κ(δ_R − δ_P)² and T/C ≈ κδ_P² — so κ cancels EXACTLY and the
certificate condition X < T reduces to

> δ_R(y) < 2δ_P  ⟺  ln y > ln h · (15/4e^γ)/(2·15/4)  ⟺
> **y* = h^{1/(2e^γ)}**,  exponent 1/(2e^γ) = 0.280730.

That exponent is the `u → ∞` form of the crossing, not its limit. Writing
δ_R(y) as the bare Mertens product sets Buchstab's ω(u) to its limit e^{−γ},
while the crossing sits at finite u. Done exactly, the condition is
ω(ln h/ln y) < ∏_{y<p≤Q}(1 − 1/p), asymptotically u·ω(u) < 2, so the asymptote
is the root 1/u* = 0.280438, 0.10% below 1/(2e^γ), and small against the
finite-size effect measured over this range (6.5% at B3, 1.6% at B8)
[SCRATCHPAD-GRADE, `history/staging/import-rough-anatomy.md` §§0, 2.1 and
`history/staging/u2-engine-depth.md` §5; neither has an embedded producer, so
the corrected asymptote may not be quoted outside these notes until one exists].

κ in the literature's notation: it is the Hardy–Littlewood singular series with
the p = 3, 5 factors absorbed into the mod-30 channel normalisation,
𝔖(2) = 2Π₂ = (45/32)·κ = 1.320324 against κ = 0.938897 (Evans arXiv:2102.12297
eq. (1.2) for the definition of 𝔖; VERIFIED as an exact rational identity,
scratchpad-grade numerics in `history/staging/lit-evans.md` §0.7, no embedded
producer yet). The "κ cancels exactly" step is the standard singular-series
cancellation and carries no novelty.

Zero parameters. Measured (producer SEC 2): band means of ln y*/ln h
climb 0.2624 → 0.2763 monotonically across six bands = 0.935 → 0.984 of
the candidate, approaching from below. Consistent with convergence; the
finite-size drift has a zero-parameter account at scratchpad grade only (§6);
six band means are not a confirmation. The
constant is the origin-excess family's e^{−γ} again (2·θ = e^{−γ}); the
further reading (2θ)² = 1/(4ρ(2)) is a tautology in this corpus, which
defines ρ(2) = e^{2γ}/4, so both sides are e^{−2γ} by definition and the
identity restates the constant rather than evidencing a connection. (ρ
here is not Dickman's ρ, whose ρ(2) = 1 − ln 2 = 0.30685.) The two
statements that follow are written on the set where T ≥ 1, since y*(Q)
exists if and only if T(Q) ≥ 1 and the all-Q form otherwise presupposes
the conclusion (TODO Z2's 2026-08-27 quantifier). If the law holds,
y* ~ Q^{0.5615} < Q always, so **the heuristic predicts no second death on
{T ≥ 1}, with exponent margin 0.56 < 1**, and the forecasts for any future
run on that set are y* ≈ 336 at Q = 31607, ≈ 642 at Q = 100003
(K*/pool ≈ 0.0188 / 0.0118), upper-edge numbers to be sealed in a fresh
prereg before any run.

## 4. The wall, relocated with coordinates [the honest reading]

Proving floor ≥ 1 is proving X(y) < T. Equivalently:
Σ_r capU_K(r) = C − T + X(K), and that count is the number of composite
members whose partner is rough beyond min(p_K, the largest active below
that member's own least prime factor). It is NOT the number of composite
members with a p_K-rough partner: at the operative depth K* the two
differ by 11% to 37% over Q = 313..9281 [MEASURED,
`redteam-0828-quadpoint.js` SEC H], the difference being the both-composite
pairs whose LARGER lpf is at most p_K, which clause (iii) keeps whatever
the partner's roughness. A bound on the uniform count is therefore not a
bound on Σ capU. Certifying Σ capU below C − 1 needs that count bounded
above with relative precision at TWIN scale — the margin
(T − X)/C ~ 1/ln²h — on intervals as short as the stretch (down to width
4Q + 4). No sieve upper bound delivers a
constant sharp to 1 + O(1/ln²) — that precision class is the parity
wall's — and short intervals only worsen it. **Z2 in exact form: beat
the twin density in the error term of a rough-pair count on a short
interval.** Fourth frame of the same wall (zones, the origin, the square
anchor, now the rough-pair census). The identity does not weaken the
wall; it names the exact count and the exact precision at which the wall
stands in this coordinate.

## 5. Prior art [SEARCH OWED — no novelty is claimed]

Rough-rough pairs are almost-prime pairs; comparisons of twin counts
against semiprime/almost-prime pair counts are Chen-method territory
(P₂ neighbours of primes, weighted sieves). Whether "X(y) vs T in
prime-square windows" or the crossing law y*(h) appears in print must be
searched in the owning convention (`research/SEARCH-CONVENTIONS.md`
discipline — our words are not the literature's words) BEFORE any
novelty language. The census identity itself is elementary enough that
independent occurrence is likely; treat it as machinery until the search
runs.

## 6. NOT REACHED

- No proof of the depth law; the κ-cancellation is a main-term statement,
  and §3's asymptote is 1/u* = 0.280438 rather than 1/(2e^γ) = 0.280730.
  The finite-size drift (0.935 → 0.984) is **explained at scratchpad grade in
  two notes and by no embedded producer**, so it is an explanation and not yet
  a fact: replacing the Mertens asymptotic by the exact partial product in the
  same zero-parameter main term reproduces the six band means, residual
  −0.0032 → +0.0000 with per-anchor sd fifteen times the mean residual
  (`history/staging/u2-engine-depth.md` §5), and the same condition evaluated
  on the prime grid agrees 0.9985–1.0016 and accounts for 95–105% of the drift
  (`history/staging/import-rough-anatomy.md` §§0, 2–3). What the drift is
  probably not is a classical 1/log secondary term: fitting u·ω(u)(1 + c/ln y)
  = 2 gives c drifting −0.181 → −0.074 across bands and the 1/ln h form
  −0.688 → −0.267, neither stable (`history/staging/lit-evans.md` §0.5), and de
  Bruijn's μ_y(u), the one published next-order term, is refuted by magnitude
  at +0.079% against a 1.5% drift (`history/staging/import-rough-anatomy.md`
  §4). The two notes' forward forecasts disagree at the first anchor: y* = 313
  against y* = 317 at Q = 31607, both scratchpad-grade, agreeing on 617 at
  Q = 100003. So §3's asymptotic forecasts (336, 642) are known-biased upper
  edges and the sharper pair is not yet settled between the two notes.
- The prior-art search of §5.
- No sealed prereg for the 31607/1e5 tiers (forecasts printed, not
  sealed; any run needs the fresh width audit + prereg per v2's rule).
- The A/B side ownership of X, and whether the QR structure (Z3)
  redistributes X inside the stretch, untouched.

---

*Producer and custody: `research/attack-quadpoint-03.js`, embedded,
`--check` bit-honest, forced stamp disclosed (0 of 51 figures changed).
Cited, never recomputed: v2's K* values and band mean
(`attack-quadpoint-02.js` embedded OUTPUT), the v1/v2 conventions.
History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
