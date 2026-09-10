# Red team, 2026-08-21 wave 2 (structural/empirical): kstar-01, delta37-01, c2drift-01

<!-- ledger
id: Q-redteam-0821-wave2
status: ANSWERED
todo: none
question: Do the three held analytic attacks, b2mean, f4weak and quartic, survive an adversarial re-derivation?
verdict: All three survive with every load-bearing number re-derived independently, including four full N_k curves on a different inclusion-exclusion implementation and a c1 column from a freshly fetched OEIS b-file; two sentences are weakened, the cert/C2 widening being non-monotone, and no claim is refuted.
-->

*2026-08-21. Adversarial verifier, independent re-computation throughout —
own engines in scratch (DFS inclusion–exclusion, own tile sieve, own parses,
own RNG for nulls), never the producers' code paths; both published sources
re-read at page images this session. Default was refuted-until-rederived.
Targets: `attack-kstar-01.md` (+ prereg at `552143c`), `attack-delta37-01.md`,
`attack-c2drift-01.md`, all HELD in staging.*

## 0. Verdict summary

**All three targets survive. Every load-bearing number re-derived
independently reproduced exactly — including four full N_k curves recomputed
with a different I–E implementation (validated against brute-force period
enumeration), the delta37 credit arithmetic from an independent parse, and
the c1 column from a b-file fetched fresh from OEIS.** Two sentences
weakened, no claim refuted:

- **WEAKENED** (kstar §1): "cert/C₂ widens monotonically in scale" — the
  five new values run 2.81, 3.41, 4.34, 3.98, 4.67; 17#→31# (4.34) exceeds
  19#→37# (3.98), and 13#→23# (2.91) exceeds 13#→29# (2.81). Corrected:
  *"the slack cert/C₂ trends wider with scale — 1.00 at the first three
  steps to 4.67 at 19#→41# — though not monotonically (4.34 at 17#→31#
  against 3.98 at 19#→37#)."* The producer's READINGS block already states
  it correctly (lists the five values without "monotonically").
- **WEAKENED** (c2drift, commit message `b19d77d` only): "the one-class
  column drifts identically" — the shared facts are direction and shape;
  the rates are 0.15–0.22 (c1) vs 0.23–0.43 (c2') per ln ln x, equal only
  within ~1.6σ. The document's own §1 ("same signature... same direction,
  same order, wide errors") is the supported statement and needs no change.

## 1. TARGET 1 — attack-kstar-01 (K* ladder 11 → 16, I–E certificate engine)

### 1a. Prereg custody at 552143c — CONFIRMED, one nuance
`552143c` (2026-08-21 09:52:26) touches exactly one file, the prereg; the
producer + report land in `fa087d3` at 10:15:04 — a 23-minute gap consistent
with the 345 s run executing after the commit (git cannot prove the walks
did not run earlier; that limit is inherent to any local prereg). The prereg
was never modified after commit. The blemish arithmetic checks: applying the
prereg's own hist[ℓ] = N_ℓ − 2N_{ℓ+1} + N_{ℓ+2} to its own committed tables
gives 36 (not 6) maximal 10-runs at 13#→29# and 6 (not 2) maximal 13-runs at
17#→31# — exactly what the scans found — while the third derived figure
(2 maximal 17-runs) is correct. The slips contradict the prereg's OWN
committed table under its own stated formula, so they are derivation slips,
not failed model predictions; the scoring-rule section (fixed before
measurement) binds only K*, the N_k cells, and M1's ±2, none touched.
Nuance: "illustrative prose" is slightly generous — the sentence uses
binding language ("the scan must find exactly...") — but the disclosure in
§4 is complete and accurate.

### 1b. The I–E identity — CONFIRMED (re-derived analytically)
Slot x_j alive against Q iff t avoids the ν_q(J) = |{x_j, x_j+2 mod q}|
residues; CRT over the entering primes (coprime to the base width) makes the
copy index sweep all M residue combinations exactly once, so per shape
N_k = Σ_J (−1)^{|J|} Π_q (q − ν_q(J)) is an exact integer identity — the HL
2|J|-tuple local product truncated to Q, as claimed. The pair case
ν = 4 − 2[q|d] − [q|d−2] − [q|d+2] holds for all q ≥ 5 (no double collisions
possible), which is w1-singular-series' table one level up. Cost D·2^k·|Q|
and period-independence follow by construction.

### 1c. The period-free certificates — CONFIRMED by full independent re-derivation
Own engine: direct-sieve 19# tile (D = 378675 reproduced) + DFS
inclusion–exclusion with incremental residue counts (no Gray code), first
validated against my own brute-force full-period enumeration at 5#→11#,
7#→13#, 7#→17# (every N_k cell and K* exact). Then:
- **19#→37#: the full 14-value N_k curve reproduced digit-exact, including
  N_14 = 0** (9.6 s, ~1.44e8 subsets) — K* = 13, C₂ ≤ 14 re-derived.
- **19#→41#: the full 17-value curve reproduced digit-exact, including
  N_17 = 0** (79 s, ~1.04e9 subsets) — K* = 16, C₂ ≤ 17 re-derived. The
  report's caveat "rests on the I–E route alone" can now cite a second,
  independent engine.
- **All three prereg tables (13#→29#, 13#→31#, 17#→31#) reproduced
  digit-exact** tile-only (1.3 s) — so K* = 10/17/13 are theorems of two
  independent engines, and the prereg's binding cells are independently
  certified, not merely scan-matched.

### 1d. G2 custody gates — CONFIRMED
`exact-g2-ladder.js` rows: 258 @ 1205437109n (×2), 348 @ 8813641451n (×4),
G2(37#) = 528, G2(41#) = 546 — matching every quoted C₂. Own arithmetic:
both argmax windows verified locally (endpoints alive at 29#/31#, zero alive
positions strictly inside, spans exactly 258 and 348).

### 1e. The near-linear verdict — CONFIRMED, one honesty note
Own regression on the 16-point ladder: 0.6881 ± 0.1328 / 0.8041 ± 0.1098 /
0.8184 ± 0.0908 — all three exact; I_eff range [0.55, 2.56] and trend
0.3676 ± 0.1400 exact. The instrument's logic checks: a log-type K*
anchored at 13#→23# (K* = 8) forces I_eff ≈ 3.53 by P(2s) = 43 (×1.74);
measured I_eff at 19#→41# is 1.88 — flat. Honesty note: the 16 points are
not independent (7#→19# and 11#→19# share a target period, as do the two
31# steps; Q sets nest), so the ±0.0908 understates the true slope
uncertainty — the report's own framing ("raw, no null exists for K*",
verdict [MEASURED]) already carries this. The 31#→61# band is labeled
illustration and stays one. cert = 18 vs 19.2455 at s = 16 (93.5%) is exact
arithmetic on now-independently-proven K*.

## 2. TARGET 2 — attack-delta37-01 (δ decomposition, interior comb, x = 37)

### 2a. Interior 6-tuple comb — CONFIRMED (construction re-proven, numbers reproduced)
The conditional ratio r_q(j) = [(q−ν₆)/(q−ν₄)]·[q/(q−2)] is the correct
endpoint-conditioned survival ratio, and mean-one holds exactly:
Σ_j (q−ν₆) = (q−ν₄)(q−2) (proven by the (t, j) double count; verified
numerically at the producer's q × θ grid) — so the whole effect is indeed
the finite interior range. Own parse of the mp-derive Stage-6 embed (102
rows) + own ell implementation (boolean-array residue counting): ell values
match to 4 decimals (0.5509 at p = 101, 0.4651 at 709); **Pearson 0.907 /
Spearman 0.842 with the D4 train residuals reproduced exactly**; tilt
−0.0208 / +0.0033 / φ_pred 0.0241 exact; not comb-collinear.

### 2b. Combined-credit arithmetic — CONFIRMED, all cells
Own fits (train OLS, own ternary-search deep MLE, own Simpson PLN):
base 1.9485/0.2773/0.1715/0.2526/φ 0.0247; interior credit
0.2565/0.2374/sd 0.0830; both credits **0.1964/0.1879/φ 0.0085/sd 0.0834**;
flags 3.10→2.63, 3.21→2.22, 3.28→2.31, 3.36→2.45, deep |pull|>3 count 4→0;
bands [300,500) 0.480 vs 0.520 and [500,710) 0.351 vs 0.357; deep PLN
−88.0 → −84.3 (+3.6 nats). Every number exact.

### 2c. Finite-size refutation — CONFIRMED
Factorization audited: p | θ+2η always (θ = 2(p−η)), no prime > p divides
θ/2, so only the (θ±2)/2 sides contribute — correct. Worst case re-derived
by hand: p = 101, (θ+2)/2 = 103 prime, dln = ln(98/97)+ln(100/99) =
2.03e-2 ✓; window-edge (1416+4254)/2.2422e11 = 2.53e-8 ✓. Tilt −0.0024 vs
needed −0.277 is 2.05 orders. Nit (producer prose only): the script's
VERDICT line "predicts |s| ≤ ~1e-4 ... REFUTED by ≥ 3 orders" overstates
its own measured −2.44e-3 (2 orders); the report's table says "2 orders
short" correctly and the §0 header's "2–5 orders" spans the edge term.

### 2d. Leave-one-out instrument at x = 37 — CONFIRMED, and conservative
Own parse of both ladder embeds, own LOO: G2 +2.39, h +0.14, h2 −0.10 —
exact. Sensitivity: dropping the noisy head (x ≥ 11 instead of ≥ 5) makes
the G2 reading **+5.01** — the producer's convention is the conservative
one; the spike-real verdict strengthens under the variation.

### 2e. The Wolf negative — CONFIRMED for both arXiv sources; 909/96 not re-verified
I re-read **all 10 pages of math/0105211 at page images this session**: the
characterization is accurate, in places nearly verbatim — m(d,N) defined
(eq. 4), Fig. 1's oscillations plainly visible, champions d = 30 then
d = 210 named with "It will be discussed in more detail in the forthcoming
paper" (p. 7), the only derived separation formulas are
μ(s,N) ~ A(N)e^{−B(N)s} with A ≈ c₂²N/ln³N, B ≈ c₂/lnN (eqs. 7, 13),
s_max ~ (1/c₂)ln²N (eq. 16) vs arithmetic maximal twin gaps ~ ln³N, and the
closing sentence is exactly "the change in the 'measuring sticks' removes
oscillations from Fig.1 and leaves pure exponential decrease." **No
divisor-modulated twin-separation formula appears anywhere** — the NOT-FOUND
stands on my independent read. MS math/0409258 pp. 1–4 also re-read at page
images: Theorem 1 (eq. 15) and Theorem 2 verbatim as quoted, unconditional;
the ψ normality explicitly "Assuming a strong form of the Hardy-Littlewood
conjecture (1)"; nothing indexes by fold depth. NOT re-verified by me:
IFTUWr 909/96 (no local copy, publication page not fetched this pass) and
the "no champions follow-up on his list" check — both rest on the
producer's session.

## 3. TARGET 3 — attack-c2drift-01 (c1 drifts with c2', frame property)

### 3a. c1 column + post-dip slope — CONFIRMED from a fresh OEIS b-file
b048670.txt fetched from OEIS this session: 64 terms, **identical to the
producer's corpus-58 + Bozek-6 array**. Own frames: c1(11) = 0.4712, min
0.3359 at x = 59, c1(311) = 0.3756; window slopes 0.1553 ± 0.0261 (x ≥ 59),
0.1524 ± 0.0182, 0.2187 ± 0.0442 — all exact. Own 4000-replicate nulls with
a DIFFERENT RNG (xorshift vs mulberry32): rank-p = 0.0000 under both noise
models; largest null slope seen 0.119 (logn) / 0.074 (EV) vs observed 0.155.

### 3b. Instrument calibration — CONFIRMED
Own synthetic-truth recovery on the real grid: flat truth reads
b_PLNX = −0.0140 (exact match), Gumbel truth reads −0.1341 (exact) — the
bias direction (down, so measured drifts conservative) verified; Gumbel
b_FS recovery +0.5164 vs theory +0.577 (rounding attenuation, as printed).
The 92.8%/100% power figures were not re-run (same machinery, low stakes).

### 3c. Gumbel finite-size sign-refutation — CONFIRMED
Re-derived: EV theory gives c = c∞(1 + γ/lnD), slope +γ on the 1/lnD
regressor, i.e. a high head and a FALLING column. Both columns rise
post-dip; fitted b_FS: −0.597 (c2' full), −3.522 (c1 x ≥ 59) — both
reproduced exactly, both negative. Implied empirical-mirror limits
c1∞ = 0.3799, c2'∞ = 0.5345 reproduced.

### 3d. The 1d algebra — CONFIRMED
G2/x² = c2'·(m·lnD/x²) is definitional; measured decomposition
−0.2365 = +0.0540 + (−0.2905) exact (residual < 1e-12); drift share 18.6%;
threshold −dF/dlnx = 0.147; b_PLND = 0.0525 (36% of threshold) — all
reproduced. The asymptotic threshold 1 − 2·lnln x/ln x → 1 follows from
m·lnD → 2.40·x·ln²x; every fixed (ln x)^s keeps G2/x² → 0 — sound.

### 3e. Shape-indistinguishability — proven by calibration ON-RANGE; the extension is asserted
The two cross-talk rows are real calibration facts, reproduced exactly with
my own generator: a true (lnD)^0.12 reads b_PLNX = 0.4969, a true
(ln x)^0.30 reads b_PLND = 0.0699; corr(ln lnD, ln ln x) = 0.9956 on the
c1 grid. So the on-range indistinguishability — the only form the verdict
table uses — is demonstrated, not asserted. The further sentence "no
reachable ladder length fixes it" extrapolates beyond the grids the
calibration ran on; plausible from the collinearity mechanism, but it is an
argument, not an in-pass demonstration.

## 4. What this pass did NOT reach

- The three period WALKS themselves (6.47e9, 2.006e11 ×2) were not re-run;
  their custody is the two G2 window checks (§1d), the ladder anchors, and
  the fact that the scans' claimed censuses equal N_k curves I re-derived
  independently. A full walk replay stays the outstanding (expensive) check.
- kstar §5's record-anatomy details (ρ ladder, strikes/kills 86/84 across
  fourteen steps, inherited shares) — not re-derived.
- delta37: the THN r_null formula was re-evaluated as given (tilts match)
  but not re-derived from import-thinning's own derivation; the 5-figure
  Sl = 1.1211·λ₁₁ upgrade was replayed, not re-derived; IFTUWr 909/96 and
  the Wolf publication-list negative (§2e).
- c2drift: AICc tables beyond the key fits, the power figures, and the
  ledger deep-window AICc win were arithmetic-spot-checked (5.5× overshoot,
  13.2% vs 3.1% rise re-derived by hand) but not fully re-run; the
  single-witness status of the c2' tail and Bozek terms stands as the
  report already flags it.
- The null ensembles everywhere treat ladder rows as independent; the rows
  are separate exact computations per level, so this is reasonable, but no
  dependence-aware null was constructed here either.

---

*This is a history/staging record: a process document, superseded-in-place by
later work.*
