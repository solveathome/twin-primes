# The mean value of B₂: the mass located, the primitive-mode repair, and a proven qmax ln⁷z bound

<!-- ledger
id: Q-b2mean
status: ANSWERED
todo: none
question: Can the mean value of B2 = Sum e^2 Vabs(e)^2 be bounded below its trivial qmax*B ceiling?
verdict: Yes, by one logarithm: B2 = O(qmax*ln^7 z) against the trivial O(qmax*ln^8 z), with the mass located on primorial-core smooth e nowhere near qmax, the primitive-mode weight J2(e)/12 proved and priced as a flat 1.48x cut of MS3, and the finite forms computed exactly at z = 13..47.
-->

**attack-rhoms-01's NOT-REACHED item — a mean-value bound on B₂ = Σ e²Vabs(e)²
below its trivial qmax·B ceiling — is executed: the mass of B₂ is located
(primorial-core smooth e, mid-scale, nowhere near qmax), one exact repair is
proved and priced (the primitive-mode weight J₂(e)/12, a flat 1.48× cut of
MS3 at every level), and the analytic ceiling is lowered by one logarithm
(B₂ = O(qmax·ln⁷z) against the trivial O(qmax·ln⁸z)), with the finite forms
computed exactly at z = 13..47 and the proven all-z re-entry point of the cap
located for the first time. Producer: `research/attack-b2mean-01.js`
(embedded via `qc/embed.js`; all controls pass; 6.4 s, deterministic). Four
things came out.**

**One: the decay law of Vabs is the envelope shape times a decaying
sign-survival factor (§1).** At fixed ω(e) the slope d lnVabs/d lne is
−0.97 ± 0.15 at ω = 1 (exactly Theorem 1's envelope 3Aρ(e) ~ 2^ω/e) and
steepens to −1.24..−2.08 at higher ω: Vabs runs BELOW its proven envelope by
a factor that itself decays in e. The statistic φ₂ = e·Vabs/2^ω is bounded
(sup 0.39–0.45, attained at the odd-primorial-core e = 105, 1155, 2310) and
its B₂-weighted rms FALLS with z (0.362 → 0.247 over 13..23) — the opposite
sign of drift from B's sup-statistic (`attack-AB-bounded.md` §1.4), so a
uniform φ₂ ≤ 1/2 is not excluded by these levels, though only measured.

**Two: B₂'s mass sits at smooth mid-scale e, and it spreads (§1).** The top
contributor is always the primorial core (2·3·5·7·11 at z = 13..19, growing
to 2·3·5·7·11·13·17·19 at z = 47); the ω-profile peaks two below the maximum
(ω = 7 carries 47.0% at z = 47); e > qmax/8 carries only 9–16% at z ≥ 23; and
75–78% of the mass has 6 | e at every level. Concentration DILUTES: the top
mode's share falls 27.1% → 0.8% and N₉₀ (the e count holding 90% of B₂)
grows 8 → 1233 over z = 13..47. So the e² weight is priced by many smooth
moduli of intermediate size — not by a few e near qmax, which is exactly why
the trivial qmax·B shape wastes a growing factor (13× → 1764× measured).

**Three: two proven reductions, and their price (§2, §3).** (i) **Lemma J +
Theorem MS3′**: the primitive cosecant sum is Σ*_a 1/(4sin²(πa/e)) =
J₂(e)/12 exactly (Möbius inversion; verified to 2.9e-14 over e = 2..200), so
the MS3 chain tightens to ⟨ρ̃²⟩ ≤ B₂ᴶ/12, B₂ᴶ = Σ J₂(e)Vabs(e)² — a strict,
hypothesis-free sharpening. Measured gain B₂/B₂ᴶ = 1.479–1.487, FLAT across
all ten z, at 90–92% of its own ζ(2) ceiling (because the mass is 6-divisible):
**MS3's 18–48× over truth becomes 12.1–32.0×.** (ii) **Theorem MV**: through
the verified steps Vabs ≤ T ≤ 3Aρ(e) plus e ≤ qmax and a divisor-trick count
(one log below Rankin), B₂ ≤ 9A²S(z) ≤ 9A²·qmax·Π_{p<z}(1+h(p)/p) =
O(qmax·ln⁷z) — one logarithm below the trivial qmax·B ≤ qmax·9A²(E−1) =
O(qmax·ln⁸z), and measured 2.1–3.4× below it at z = 13..47. The proof stalls,
named: the remaining 4.6e2–7.6e2× (flat) between the exact sign-free MV0 =
Σe²T(e)² and B₂ is the ONE sign-discard step — the same irreducibly
mean-value object `attack-AB-bounded.md` §1.4 names for B = O(1), now
measured under the e² weight.

**Four: the caps, re-priced (§4).** The MS3′ cap on θ_G reads 2.4335..2.9232
at z = 13..47 (margins −1.8330..−1.3433 against β₂, ~0.05–0.08 better than
MS3's cited column at every level). New unconditional items: the FULLY
ANALYTIC cap via MV1ᴶ — no enumerated coefficient family anywhere — is below
β₂ at z = 13..37 on its own; and the proven all-z re-entry of the crude cap,
previously known finite but not located, is LOCATED: with Rosser–Schoenfeld
constants and the standard M ≥ c_M/ln²z rider, the proven cap re-enters below
β₂ at z* = 2.77e12 (c_M = 0.35; 2.39e13 at 0.1, 1.12e15 at 0.01) and stays
below forever. A by-product kills a route before it is proposed: the
residue-class ℓ² form (bounding Σ*_a|Θ_e(a)|² and paying the a′ = 1 weight)
would read 55.8× → 5594× truth at z = 13..19, diverging — that ladder is dead
on measurement.

---

## 0. CUSTODY

Everything measured is in `research/attack-b2mean-01.js` (`qc/embed.js
--check`: code-sha256 matches, out-sha256 matches, body bit-honest;
deterministic re-run). Division of labour per the standing compute rule:

- **Recomputed (cheap, controls in-pass):** B(z, 3.0) and B₂/12 by my own
  extended sweep, MATCH to the cited `attack-rhoms-01` columns at all ten
  z = 13..47 (B to the printed 4–5 digits, B₂/12 to 5 figures) — the control
  that guards every downstream number here. The spectral ⟨ρ̃²⟩ re-summed
  mode-exactly at z = 13, 17, 19: rel 4.4e-7, 1.9e-7, 7.9e-8 against the
  cited truth (6-digit quotations). The cap3 column recomputed and MATCHED to
  the cited `attack-rhoms-01` S5 values at all ten z (tolerance 6e-4 on
  4-decimal quotations).
- **Cited (custody-bound, not recomputed):** truth ⟨ρ̃²⟩ at z = 13..31
  (exact pair sums) and 37..47 (rmsr², via `theta-ladder.md` §2), the cited
  B/B₂ columns above, β₂ per `paper/beta2-note.md`.
- **Machinery:** the sweep is `attack-rhoms-01.js`'s `sweepB` extended in
  place (same subset enumeration; adds T(e) and per-e metadata);
  `buildTerms` from `sift-limit-lemmaV.js` as everywhere.
- **Estimator controls:** OLS returns slope 3.700000 on a known z^3.7 truth;
  the 2-regressor OLS returns (2.3, −1.7, 0.9) exactly on a planted law; the
  law-fit machinery recovers (ln7, −1, ln2) exactly from a synthetic
  Vabs = 7·2^ω/e planted on the real z = 13 support. Lemma J is verified
  numerically before it is used (worst rel 2.9e-14, e = 2..200, general e).
- **Proven inputs checked at source this session:** Theorem 1's two steps
  (`attack-AB-bounded.md` §1.1) — re-verified per-e on this lattice with
  zero violations, now through z = 47 (max Vabs/T = 0.3333, max T/(3Aρ) =
  0.9927, both ≤ 1 everywhere; the source verified z ≤ 41, so 43 and 47 are
  new); the spectral identity and Θ* ≤ Vabs as re-verified in
  `attack-rhoms-01` S3.
- **Literature-standard inputs (S4 all-z formula scan ONLY, flagged):**
  θ(z) < 1.01624z and Π_{p≤x}(1−1/p)⁻¹ < e^γ lnx(1+1/ln²x) for x ≥ 285
  (Rosser–Schoenfeld 1962), and M ≥ c_M/ln²z (the redteam-0821 §1.4 rider:
  standard vector-sieve positivity, not corpus-machine-verified). The scan
  control verifies the RS formula dominates the exact-prime scan at every
  prime 285..150000.

Units: Vabs, T dimensionless (weight counts); e, qmax, W positions;
strengths as exponents base z. WIDTH: e ≤ qmax ≤ 2.24e8 exact; e² and J₂(e)
reach 5e16 > 2^53 and are floats entering float products only (rel ~1e-16,
stated); all W-dependence runs off lnW = θ(z).

## 1. THE STRUCTURE OF Vabs AND THE MASS OF B₂

**The law.** The single-power fit d lnVabs/d lne = −0.51..−0.83 (z = 13..23)
is not the law — lne and ω(e) are collinear, and the two-regressor fit reads
b = −1.30..−1.57 with c/ln2 = 2.08..2.54 (rmse 0.54–0.82, a factor-2
scatter). The fixed-ω slopes decide:

    z=23:  ω=1: −0.97±0.15   ω=2: −1.26   ω=3: −1.49   ω=4: −1.64   ω=5: −1.81
    z=47:  ω=1: −0.99±0.07   ω=2: −1.24   ω=3: −1.28   ω=4: −1.30   ω=5: −1.58
           ω=6: −1.48        ω=7: −1.44   ω=8: −2.08

Reading: at ω = 1 the decay is exactly the proven envelope's e⁻¹ (T(e) ≈
3Aρ(e) is within 0.7–3.4% of its ceiling, §3); at higher ω the measured
Vabs falls a further e^{−0.2..−1.1} below the envelope — the sign
cancellation inside the e₁-classes deepens with e at fixed ω. Support is
dense, not sparse: 6119 of the 9003 admissible divisors of P(47) below qmax
carry mass (68%; 100% at z ≤ 19). So the correct model is
**Vabs(e) ≈ φ₂(e)·2^{ω(e)}/e with a bounded, slowly-decaying survival factor
φ₂** — sup φ₂ = 0.39–0.45 (at e = 105, 1155, 2310), B₂-weighted rms falling
0.362 → 0.247 over z = 13..23. [MEASURED]

**The mass.** Share of B₂, all ten z [MEASURED]:

- top e is the primorial core at every level (2·3·5·7·11 through
  2·3·5·7·11·13·17·19), holding 27.1% at z = 13 down to 0.8% at z = 47;
- N₉₀ grows 8 → 1233: the mass spreads over ever more moduli;
- ω-profile at z = 47: ω = 7 carries 47.0%, ω = 6 30.7%, ω = 8 13.9% —
  the peak sits two below the attainable maximum ω = 9;
- e > qmax/8 carries 9.9–16.2% at z ≥ 23 (57% at z = 13 where qmax is
  tiny): **the mass is NOT near qmax**, which is why B₂ ≤ qmax·B wastes a
  measured factor 13.5 → 1764 (growing) and why an e-aware mean value can
  beat it;
- 6 | e carries 74.7–77.8%, flat — the fact the ζ(2) repair of §2 monetizes.

This answers the concentration question the a′ = 1 fact posed: the variance
lives at the lowest frequency of MANY smooth mid-scale moduli, not at few
large ones. The e²-weight is a faithful price for each such modulus (its
a′ = 1 weight is ~e²/4π²), and the remaining slack is in Θ* vs Vabs and in
the a-profile, quantified in §2.

## 2. LEMMA J AND THEOREM MS3′ — THE PRIMITIVE-MODE REPAIR

**Lemma J** [PROVEN; verified to 2.9e-14 over e = 2..200]. For e > 1,

    Σ_{0<a<e, gcd(a,e)=1} 1/(4 sin²(πa/e)) = J₂(e)/12,
    J₂(e) = e² Π_{p|e}(1 − 1/p²).

Proof: group a ≠ 0 mod e by g = gcd(a, e); each class is the primitive sum
at modulus e/g, so the classical identity (e²−1)/12 = Σ_{f|e, f>1} Φ(f)
with Φ the primitive sum; Möbius inversion gives Φ(e) =
Σ_{f|e} μ(e/f)(f²−1)/12 = J₂(e)/12 (the −1 dies since Σ μ(e/f) = 0).

**Theorem MS3′** [PROVEN; chain verified exactly at z = 13, 17, 19].
⟨ρ̃²⟩ = Σ_e Σ*_a |Θ_e(a)|²/(4sin²(πa/e)) ≤ Σ_e Θ*(e)²J₂(e)/12 ≤ B₂ᴶ/12,
B₂ᴶ = Σ J₂(e)Vabs(e)². MS3 extended the primitive sum to all a ≠ 0 to buy
the (e²−1)/12 identity; those imprimitive modes are already counted at their
true denominators, and Lemma J refunds them. The chain holds with room at
every verified level (e.g. z = 19: 4.952 ≤ 33.443 ≤ 97.846 ≤ 145.235).

**The price of what remains, measured mode-exactly** (z = 13 / 17 / 19):
max_a step costs 2.08× / 6.04× / 6.75× after the repair (was 3.05 / 8.94 /
9.97); the Θ* → Vabs triangle costs 5.84× / 3.44× / 2.93×; total 12.13× /
20.81× / 19.76× (was 18.00 / 30.94 / 29.33). Gain B₂/B₂ᴶ = **1.479–1.487 at
all ten z, flat**, against the per-z ζ(2) ceiling 1.608–1.638: the repair
realizes 90–92% of everything a totient-type weight can give, because the
mass is 6-divisible (§1). [VERIFIED / MEASURED]

**A route killed on measurement before anyone walks it.** The ℓ² alternative
to the max_a step — bound Σ*_a|Θ_e(a)|² per e and pay the worst (a′ = 1)
weight — would deliver 55.8× / 665× / 5594× truth at z = 13/17/19,
diverging: |Θ_e(·)|² carries substantial mass at high a′ where the true
weight is tiny, so trading the weight profile for an ℓ² norm is ruinous. A
residue-class ℓ² mean value is NOT a useful missing object; the useful one
is the signed class-sum bound below. [MEASURED]

## 3. THEOREM MV — THE MEAN-VALUE LADDER ON B₂

With T(e) = Σ_{i: e|q_i}|w_i|/q_i and Theorem 1's verified steps
(Vabs ≤ T ≤ 3A(z)ρ(e), zero violations through z = 47; ρ(e) = Π_{p|e} r(p),
r(2) = 3/5, r(p) = 2/(p+2), A = (5/2)Π_{2<p<z}(1+2/p)), plus e ≤ qmax:

    B₂ ≤ MV0 = Σ_e e²T(e)²                                  (exact, sign-free)
       ≤ MV1 = 9A²·S(z),   S(z) = Σ_{1<e≤qmax, e|P(z)} Π_{p|e} f(p),
                            f(2) = 36/25, f(p) = 4p²/(p+2)²
       ≤ MV2 = 9A²·qmax·Π_{p<z}(1 + h(p)/p),   h = f − 1 ≥ 0.

The MV1 → MV2 step is the divisor trick (f = h∗1 on squarefree e, count
multiples of each d ≤ X by X/d), which saves one logarithm over Rankin:
h(p) → 3 gives Π(1+h/p) = O(ln³z), so **B₂ = O(qmax·ln⁷z)** against the
trivial qmax·B ≤ qmax·9A²(E−1) = O(qmax·ln⁸z). All inequalities verified
numerically at all ten z. [PROVEN, finite forms VERIFIED]

The ladder at the endpoints (full table in the producer):

```
  z     B₂ (exact)   MV0        MV1        MV2        qmax·B     qmax·9A²(E−1)
 13     2.365e+2    1.166e+5   1.684e+5   3.883e+6   3.195e+3   8.297e+6
 47     1.915e+5    1.125e+8   1.480e+10  3.571e+12  3.377e+8   1.204e+13
```

Readings: **MV2 sits 2.1–3.4× below the proven trivial qmax·9A²(E−1) at
every z** (the one-log gain, already visible at walkable levels and
growing); **MV0 crosses below the measured qmax·B at z = 31** (36.5× above
at 13, 0.33× at 47) — even the sign-free enumerated form beats the trivial
shape once z grows, because the mass is not at qmax. Window slopes 13..47
(local, rising — no single power quoted): d lnB₂/d lnz = 5.10 ± 0.19, MV0
5.28 ± 0.10, MV1 8.76, qmax·B 8.46: **MV0 tracks B₂'s growth; MV1/MV2 track
qmax's.** The support constraint (e ≤ qmax over actual moduli) is what MV0
keeps and MV1 relaxes.

**Where the proof stalls, named and measured.** MV0/B₂ = 4.6e2–7.6e2, flat
across all ten z: the entire remaining gap between the proven ladder and the
truth of B₂ is the single step Vabs ≤ T — discarding the signs inside each
(e; e₁)-class. This is the same object `attack-AB-bounded.md` §1.4 concludes
is irreducibly a mean-value question for B = O(1), now measured under the e²
weight, where it is worth a flat ~600× (≈ e^{6.4}) of constant, not of
exponent. No corpus tool bounds a signed Rosser class sum below its triangle
value: Theorem A and the ℓ¹/ℓ² identity (`import-l1l2.md`) reach Vabs
objects only through Θ* ≤ Vabs, the wrong direction for a ceiling. A proven
mean-square over the class decomposition — Σ_e e²·(signed class ℓ¹)² ≪
polylog·Σ_e e²ρ(e)²/(survival) — is the first genuinely new theorem this
attack would need and did not attempt. [INFERRED from the measured flatness]

## 4. THE PRICE — CAPS RE-PRICED, AND THE PROVEN RE-ENTRY LOCATED

θ_G cap = log_z(2√(2lnW·bound/12)/M), exact lnW and M per level:

```
  z    cap3 (cited)   cap3′     −β₂       capMV1J   −β₂       MS3/tr  MS3′/tr
 13    2.5104         2.4335   −1.8330    3.7368   −0.5296    18.0    12.1
 23    2.7427         2.6798   −1.5866    4.0864   −0.1801    33.5    22.6
 31    2.8129         2.7554   −1.5111    4.2104   −0.0560    47.0    31.7
 37    2.8664         2.8116   −1.4548    4.2084   −0.0581    43.2    29.0
 41    2.8979         2.8449   −1.4216    4.2696   +0.0031    44.9    30.3
 47    2.9740         2.9232   −1.3433    4.4050   +0.1385    44.2    29.9
```

- **cap3′ (via exact B₂ᴶ) is below β₂ at every measured level with margins
  −1.83..−1.34** — uniformly ~0.05–0.08 exponent better than the cited MS3
  column, using nothing measured beyond the exact finite sums. The 18–48×
  gap over truth is now 12–32×: the flat 1.48× slice is closed and banked.
- **capMV1J is FULLY ANALYTIC** — A(z), the f_J subset sum, qmax, lnW, M
  only; no enumerated coefficient family — and it is below β₂ on its own at
  z = 13..37 (down to −0.53 at 13), crossing above only at 41..47 (+0.003 to
  +0.14), where the exact B₂ᴶ cap still covers. [VERIFIED]
- **The all-z window, proven-bounded for the first time.** Exact-prime scan
  (true θ, A, Π-products; M = 0.35/ln²z flagged): the proven MV2-cap exceeds
  β₂ on [13, >1.5e5], peak 5.695 at z = 31 — the window is real and wide in
  proven currency. The Rosser–Schoenfeld formula scan (upper envelope,
  control-verified against the exact scan) locates the re-entry:
  **z\* = 2.77e12 at c_M = 0.35; 2.39e13 at c_M = 0.1; 1.12e15 at
  c_M = 0.01** — the cap then stays below β₂ forever (→ 3.5). The redteam
  rider's sentence — re-entry finite but not located under proven B — is
  retired: located, with stated sensitivity to the one literature-standard
  constant (a factor 35 in c_M moves lnz\* by 6.0). Between z = 47 and z\*
  the composition remains model-covered, exactly as before, but now with a
  proven far end. [VERIFIED, with the flagged M rider]
- Nothing changes on the asymptote: cap → s + 1/2 = 3.5 either way; the F4
  margin 0.766 is untouched (the √(2lnW) factor owns the asymptotics; B₂'s
  improvements move constants and the finite window only, exactly as
  `attack-rhoms-01` §2 predicted).

## 5. READINGS

1. **PROVEN.** Lemma J (primitive cosecant sum = J₂(e)/12) and Theorem MS3′:
   ⟨ρ̃²⟩ ≤ B₂ᴶ/12 = Σ J₂(e)Vabs(e)²/12, a strict hypothesis-free sharpening
   of MS3; chain verified exactly at z = 13, 17, 19. Producer S0, S2.
2. **PROVEN.** Theorem MV: B₂ ≤ 9A²S(z) ≤ 9A²qmax·Π(1+h/p) = O(qmax·ln⁷z),
   one log below the trivial qmax·B's proven O(qmax·ln⁸z); finite forms
   verified at all ten z, 2.1–3.4× below the trivial proven product already
   at walkable z. Theorem 1's steps re-verified with zero violations through
   z = 47 (new at 43, 47). Producer S3.
3. **MEASURED.** The decay law: Vabs ≈ φ₂(e)·2^{ω(e)}/e with sup φ₂ =
   0.39–0.45 and fixed-ω slopes −0.97 (ω = 1, the envelope) steepening to
   −2.08; B₂'s mass at primorial-core smooth mid-scale e (ω peak two below
   max, 9–16% beyond qmax/8, 76% at 6|e, N₉₀ 8 → 1233). The trivial qmax·B
   wastes a measured 13.5× → 1764×. Producer S1.
4. **VERIFIED / MEASURED.** The re-priced caps: MS3′/truth = 12.1–32.0×
   (was 18–48×), gain 1.479–1.487 flat = 90–92% of the ζ(2) ceiling; cap3′
   margins −1.83..−1.34; the fully-analytic capMV1J < β₂ at z = 13..37.
   Producer S4.
5. **VERIFIED (with the flagged M rider).** The proven all-z re-entry is
   located: z\* ≈ 2.8e12 (c_M = 0.35), sensitivity stated; window peak 5.695
   at z = 31; window open at the 1.5e5 exact-scan end. Producer S4.
6. **MEASURED, negative.** The residue-class ℓ² route (Σ*_a|Θ_e(a)|² × the
   a′ = 1 weight) reads 55.8× → 5594× truth, diverging — closed before
   proposal. The useful missing object is not an ℓ² norm bound; it is the
   signed class-sum mean value of reading 7. Producer S2.
7. **INFERRED, the named stall.** The whole remaining proven-to-true gap in
   the B₂ currency is the sign-discard step Vabs ≤ T, measured flat at
   4.6e2–7.6e2× under the e² weight — `attack-AB-bounded.md` §1.4's
   irreducibly-mean-value object. No proof attempted here. Producer S3.

## 6. NOT REACHED

- **The signed class-sum mean value** (reading 7) — the ~600× flat factor
  between MV0 and B₂; the one theorem that would make the analytic ladder
  meet the measured B₂. Same family as the B = O(1) question; not attempted.
- **The max_a residual** (2.1–6.8× after the repair): needs a proven
  a-profile for |Θ_e(a)| beyond the triangle; no corpus tool owns one.
- **The exact-qmax cap on 47 < z < z\*** — still model-covered; MV1ᴶ needs
  buildTerms (for qmax and M) beyond z = 47, deferred under the compute
  ceiling exactly as in `attack-rhoms-01` §6.
- **Mode-exact decomposition at z ≥ 23** (Σφ(e) ~ P(z) modes; z = 19 cost
  seconds, z = 23 would cost ~100× more) — the step-cost columns stop at 19.
- **Any re-pricing of the moment-ladder budget rows** (M2/M3 use measured
  moments, not B₂; untouched) and **the s-freedom** (everything s = 3.0,
  inherited).
- **A uniform φ₂ bound** (sup φ₂ ≤ 1/2 measured at 13..23 with the weighted
  rms falling): would give B₂ ≤ qmax·Σ4^ω/e-type constants directly; only
  measured here, and `attack-AB-bounded.md`'s experience with sup-statistics
  (its φ rose linearly) warns against optimism without the fixed-ω decay
  being understood first.

## 7. GATE

`node research/qc.js` after the producer and this report: TOTAL 2, both
findings on files other agents of this session are mid-writing
(`xchan-at37-01-census.js`, the known standing census red;
`attack-delta37-01.js`, minutes-old, its embed banner mid-repair by its
author — the count fluctuated 2 → 4 → 2 during this attack as the fleet
landed files). Neither names this producer or this file, and both of this
attack's files are clean in every check. `qc/embed.js --check` on the
producer: code-sha256 matches, out-sha256 matches, body bit-honest (6.4 s
run, deterministic).

*History and superseded claims: `research/history/CHANGELOG.md`.*
