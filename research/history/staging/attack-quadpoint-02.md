# The decade extension lands inside its own sealed bands: FALL-CONSISTENT fires, no bend, the sup is quiet, and the twin-Q hard cases converge to the mean — the depth-cost constants are now the analytic race's reproduction target

<!-- ledger
id: Q-quadpoint-transplant
status: ANSWERED
todo: Z2
question: Does the anchored-cap family transplanted onto the stretch window S_Q certify every anchor, and what does the depth cost do with height?
verdict: MEASURED: the decade extension to Q = 10007 lands inside the sealed bands and READ-2 fires FALL-CONSISTENT, with the reading weaker than it looks (a plateau at m8 = m7 also fires), the sup at 0.719 of KCAP, and a custody residual on the seal.
-->

*(2026-08-22. Staging note; nothing here is integrated into a live document.
HELD for the end-of-day adversarial roundup. Producer, formally embedded:
`research/attack-quadpoint-02.js` (2.5 s; out-sha256 60815df6...;
`--check` passes bit-honest). Prereg: `quadpoint-decade-prereg.md`, SEALED
ALONE at commit `7800bd2`, with the producer first appearing in git 4m48s
later, so the seal is mitigated and not proven (custody residual in the
tail); all verdicts below are the prereg's own registered readings, scored
mechanically in the producer's SEC 2–3. Calibration marked per claim:
VERIFIED by exact
computation, MEASURED. Conventions identical to
`attack-quadpoint-01.md` (v1).)*

## 1. The engine [VERIFIED]

Segmented per-window sieve replaces v1's full lpf table (which dies at
~400 MB by Q = 10⁴): per-anchor composite mask, march by multiples,
lpf(m) ≥ r by trial division (exact — m ≥ r always holds on the stretch,
closing the √m gap), pool scan capped at KCAP = 64 above the overlap
range, uncapped below it. Reproduction of v1, digit-exact: all 24 shown
rows, the K = 0 certificate list, the three band statistics, max K* = 21,
the bijection assert (full-depth floor = truth) at every anchor Q ≤ 1499,
and an independently-coded T recount agreeing at every anchor of the run.

## 2. The sealed verdict [MEASURED, scored against `7800bd2`]

**READ-2 (trend): FALL-CONSISTENT FIRES.** Band means of K*/pool:
m6 = 0.050, m7 = 0.040, m8 = 0.032 — each inside its registered forecast
band (0.051 / 0.041 / 0.031, all ± 0.012), monotone falling from the
cited m5 = 0.061. The reading is weaker than it looks in two independent
ways: given the measured m7 = 0.040 the admissible m8 is [0.019, 0.040],
a factor 2.10 wide, so a plateau at m8 = m7 lies inside the registered
band and fires FALL-CONSISTENT too; and (per `attack-roughpair-error.md`
§6, cited) a zero-parameter main term passes the same target to 0.2% at
B8 [MEASURED, `redteam-0828-quadpoint.js` §5.2].
**READ-1 (shape): no bend** — both kill conditions false.
**READ-3 (sup): quiet** — band maxes fall 0.090 → 0.075 → 0.065 → 0.045; no anchor reached KCAP, the largest K* anywhere being 46, at
Q = 9281, of a 1146 pool, which is 0.719 of KCAP = 64 and is below the cap
rather than nowhere near it. The prereg's third READ-3 trigger (an anchor
with no K ≤ pool achieving floor ≥ 1) is not scored separately: the
producer's overCap boolean covers it for Q > 1499 and excludes it for
Q ≤ 1499, where v1 established that every anchor certifies, so no false
quiet on this run. **READ-4 (twin-Q): the hard subfamily converges** — the
minimal-width stretches that own the worst small-Q costs (max 0.130 in
B3) sit at the all-band mean by B8 (0.032 vs 0.032, max 0.044). The
narrow-stretch penalty is a small-anchor effect on this range.
Escalation to 31607: NOT triggered, by the prereg's own rule (READ-2
fired cleanly; the run stops at 10007). The prereg's escalation clause is
not a usable pre-commitment: at the measured B8 max/mean ratio 1.47 the
band MAX at Q = 31607 forecasts to ~94 against
KCAP = 64, so READ-3 would fire on the engine cap rather than on a second
death, with no registered rule for telling those apart, and the scorer's
`Kstar >= 0` filter drops a capped anchor from the band mean instead of
entering it as a bound, biasing READ-2 downward, toward FALL-CONSISTENT.
Any run past Q = 10007 needs KCAP above the forecast band MAX (≥ 96 at
31607, ≥ 168 at 100003) and a registered rule for capped anchors in the
means. On this run the filter never bit, so the scored verdict stands as
scored [`redteam-0828-quadpoint.js`; red team §5.3].

## 3. What grows and what falls [MEASURED]

Absolute depth K* rises — band means 12.20 → 16.88 → 23.34 → 31.22 —
while its pool share falls. No law is fitted to K*(Q), deliberately (a
two-decade fit is a range summary; the exponent lesson). The certificate
needs more freshness conditions with height, but a shrinking fraction of
what is available.

## 4. What this decides, and the standing caveat

Two decades of falling cost decide NOTHING asymptotic: the rate-balance
concern (margin ~ 1/ln²h falling vs per-pool-prime HL gains) is open in
both directions exactly as before. What the run buys, per the prereg's
own reading: **Z2 — the analytic race — proceeds, with m6/m7/m8 =
0.050/0.040/0.032 and the K* growth curve as the reproduction target**
any proof-side bound on Σ capU_K must hit before it is believed. The
trend line that called all three bands was a linear-in-ln Q
extrapolation registered from three points; that it landed is a
consistency check on the family's regularity, not evidence of a law.
NO TPC claim; occupancy on this range was never in doubt (known to
9.0e15 from adopted data, stretch-01 §3); Route B closed; ρ(2) adverse.

## 5. NOT REACHED

- Nothing past Q = 10007 (escalation declined by rule); nothing at the
  1e11 zone-sweep scale; no per-anchor K* law extraction.
- The A/B side split of the caps and the ownership of the double-count
  remain unseparated (carried from v1's NOT REACHED).
- The QR refinement (Z3) stays unused; pool order stays
  ascending-smallest, untested against alternatives.

---

*Producer and custody: `research/attack-quadpoint-02.js`, embedded,
`--check` bit-honest; the single advisory READINGS figure (9.0e15) is
stretch-01 §3's adopted-data bound, cited per the FIGURE PROVENANCE
block. Cited, never recomputed: v1's embedded calibration constants, the
sealed forecast bands (`7800bd2`). Custody residual: `attack-quadpoint-02.js`
first exists in git 4m48s after the seal, so "the producer does not exist at
the seal" is unverifiable from git and band-shopping was physically possible
in that gap and before it. Mitigation, not proof: the sealed text and the
coded bands agree on the integers, centers and half-widths, and no band
moved under an independent read (red team §5.1). Recorded as a residual;
future preregs should seal before the measuring producer is even drafted,
with a longer gap. History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
