# Second attack wave: the copy-geography campaign (2026-08-14)

<!-- ledger
id: Q-attacks2
status: ANSWERED
todo: none
question: What did the ten copy-geography attacks of the second wave find?
verdict: All ten complete: one theorem-grade result (the Exact Invariance Lemma, fossil depth frozen at birth, proved independently twice) and one MEASURED, Hardy-Littlewood-conditional law (the Unification Law, to about 1 percent); no unexplained novelty survives and the wall stands.
-->

Based on the unified geography from the growth.txt session (**that file is not in this repository** — `find` for it returns nothing and its only three mentions are prose; what survives of the session is recorded in `research/history/CHRONICLE.md`, which is the place to read for it): **seams** (guaranteed
twin supply at copy boundaries, Seam Lemma: p−2 survive per level), **fossil
strata** (permanent dents at [p², 2p²] per prime, depth-preserved under
copying), and the **quiet stretch** on **(p, p²)**, struck exactly once at p. (Note the interval. `GLOSSARY.md` defines "the zone" as (p, p′²) with p′ the next prime after p, which is strictly larger. The arithmetic in this file is right on (p, p²) — that is where p strikes exactly once among the slots — but the name is borrowed from the glossary and there it denotes more.)
Artifacts land as research files in code>output>readings style.

**Two `attack2-` artifacts have no row below**, and the table's "all ten complete"
verdict does not account for them. `research/attack2-rich-vein.js` is the
same-day follow-up that solved the rich vein and so refutes what row 2 and the
verdict used to say. `research/attack2-rankin2d.js` carries the prefix but
belongs to `research/covering-dive.md` Q4, as the constructive/adversary side of
it, rather than to these ten.

| # | Attack | Idea | Status |
|---|---|---|---|
| 1 | **Seam-twin census** | Are seam pairs (kP±1) actual twin primes at enhanced rates? Derive the Hardy–Littlewood constant for this family (every small prime automatically avoided → boost ∏ over p\|P) and verify empirically. | ✅ DONE (attack2-01-06-seam-census.js): E(P) = 2·∏_{odd p\|P} p/(p−2) confirmed to 0.1–0.6% (meas/pred 0.9983, 0.9989, 0.9944, 0.9940 = 0.17%, 0.11%, 0.56%, 0.60%; the "0.2–0.6%" this cell used to give excluded two of the four and understated the agreement) (10×/14×/17×/20× at P=30..30030, sieved to 3·10⁹). The enrichment is measured against random integers and is entirely the singular-series factor, i.e. it is a SLOT-level effect: conditional on being a twin slot a seam is not enriched at all (survival 1.016, 0.980, 1.007, 0.986 × the tile mean at half-widths 300 to 3e5, and 1 genuine twin pair from 20 seam slots against 2.25 expected — `fold-profile-12-anatomy-survival.js`). A seam position is far more likely than average to be a SLOT, and **conditional on being a slot** it is no more likely than average to be a twin PRIME. Both qualifiers matter: unconditionally a seam position IS 10× to 20× more likely to be a twin prime, which is this row's own headline and this script's reading 1 ("THE SEAMS ARE REAL-TWIN FACTORIES, AT EXACTLY THE PREDICTED RATE"). The slot enrichment is level-dependent and no script prints a single figure for it: recomputed from the census it is 20.2 at T₁₃, 22.9 at T₁₇, 25.6 at T₁₉ and 28.1 at T₂₃, so the flat "25×" this cell used to give was one level's value. The 2.25 expected twins is derivable from `fold-profile-12`'s printed 0.0500 = 0.44× mean over 20 seam slots, not printed by it. |
| 2 | **Strata tomography** | Map the full in-period density profile at level 23; identify every prime's stratum; measure depth vs stratum age (17's held 0.714→0.714 — is depth constant forever?). Track 13's stratum through levels 17/19/23. | ✅ DONE (attack2-02-08-tomography.js): 13's depth identical at 4 levels — CRT identity (independent proof of the Invariance Lemma). Seams = anti-shadow (4× over-represented in richest windows) — **SUPERSEDED, and it is not a separate phenomenon**: `attack2-rich-vein.js` reading 4 shows the 62 seam-containing max windows are the wrap-runs 2063-2267, the ceiling-plateau segment that straddles 0. The rich vein [1667,1956) mod 2310 was logged here as an unexplained novelty and is **SOLVED**: same script, reading 5, "REAL STRUCTURE, KNOWN MECHANISM, NO NEW PHYSICS" — 20-of-135 T₁₁ slots in 289 positions, propagated by uniform CRT survival, and 57 other offsets do the same. Both cells are faces of the T₁₁ ceiling plateau. |
| 3 | **Fossil depth formula** | Derive the fresh-stratum depth (~0.85) from first principles (density of p×survivors head / two-dimensional Buchstab). Predict the stacked depths (0.64–0.71) from overlap. | ✅ DONE (attack2-03-09-depth-formula.js): birth depth = band-average of pair-Buchstab (e^γω(u))², exact to 3 decimals at p=4999; u=2 endpoint = e^{2γ}/4. Deep strata INHERIT dents from overlapping predecessors (fresh factor → 1.000). HL-conditional. |
| 4 | **Seam hierarchy** | Seams exist at every historical period (multiples of 30, 210, 2310…). Quantify twin-slot enrichment near k·P_m# as a function of seam depth m; derive the enrichment constant. | DONE (attack2-04-10-hierarchy-oeis.js): copy-law prediction E(m)=d_m^loc/δ_m matches measurement to 4 decimals at m = 3..6 and to **0.65% at m = 7** (meas/pred 0.9935, the deepest measured seam, which has only 18 seams = 3798 window positions — the script's own caveat, dropped when this cell was written). E(m) → c_W·C·log²p_m at **fixed W**, the numerator freezing once p_m > 2W+2. |
| 5 | **The 0.79 constant as the integral of the fossil record** | The zone's e^{2γ}/4 deficit should equal the accumulated dents of all crystallized strata. Derive it as a product/integral over strata; verify numerically. | ✅ DONE, CLOSED (attack2-05-07-integral-ladder.js): **THE UNIFICATION LAW** ρ(u) = e^{2γ}/u² (**1 ≤ u ≤ 2**; u = ln(position)/ln(level) so u ≥ 1 structurally, and the bare "u ≤ 2" this cell used to give is a domain on which the formula diverges), continuing as (e^γω(u))² on 2 ≤ u ≤ 3; verified ~1% everywhere. **MEASURED, HL-conditional, and the [2,3] step is a conjecture** (the script's own reading A5-1); ω(u) is Buchstab's. Unifies the anchored cap (u=1), zone trough e^{2γ}/4 (u=2), the kill shadow (= curve average over first octave — no longer a separate object; now SCORED against a pre-registered rule, shape 10/10, magnitude 9/10, **VERDICT SHAPE-ONLY** (corrected from DERIVED at the thirty-sixth pass by the prereg's own rule, y ~ 1000 missing deciding level D1 by 1.49×; confirmed SHAPE-ONLY at the thirty-eighth), and the depth is a drift 0.850 → 0.823 with coefficient 2 − 1/ln 2, not a 0.85 constant — amplitude's first term derived (÷K(y), the Mertens partial-product error; remainder 0 at 2σ); `history/staging/shadow-buchstab.md`), and p³ equidistribution (u ≥ 3). Strata = discrete increments of the pair-Buchstab delay integral. |
| 6 | **Seam-anchored windows** | Positions after a seam kP have the SAME candidate pattern as the head [0, x]. Prediction: absolute twin-prime density in [kP, kP+x] is enriched vs random intervals by the head ratio. Verify with real twin counts. | ✅ DONE — prediction REFUTED and corrected (attack2-01-06): windows measure 1.002 ± 0.005 (young-wheel Phase-1 argument). Seam enrichment is a point phenomenon (20× at the pair), not a neighborhood one. |
| 7 | **Seam ladder** | A seam pair (kP#±1) that survives forever = an actual twin prime pair. Compute min k per level (twin primorial-multiple primes); growth law of min-k; another equivalent wall-form but new data. | ✅ DONE (attack2-05-07; **scale VALIDATED on 500 trusted terms 2026-08-20, `a060256-seam-ladder.js`**): m(n) computed in-house to n=35; sequence = OEIS A060256 (**verified at oeis.org 2026-08-18: it genuinely carries no %F formula and no %C comment, record frozen at #15 Nov 09 2024**, so the growth scale is contributable as a comment). Cami's 500-term b-file adopted under the series rule (custody overlap 35/35 exact): the HL scale m(n) ~ (pₙ/(e^γ ln pₙ))² holds with slope 0.9756 ± 0.0281 of ln m against ln scale and per-level drift +0.00004 ± 0.00040, and m/scale matches the model's own Exp(1) law on every moment checked (mean 0.992 against 1, median 0.692 against ln 2, mass below ln 2 = 0.504). The old 35-term caveat ("'Matches' overstates a ratio spanning two and a half orders") was the waiting-time distribution showing, not a failed fit. What is contributable is the scale plus its Exp(1) law, not the terms. |
| 8 | **The 11 anomaly** | Why was 11's fossil band ENRICHED (87th pct)? Hypothesis: its band [121,242) contains the 210-seam (209, 211) — seam enrichment colliding with fossil depletion. Decompose band content into seam/fossil parts; find when the fossil law kicks in. | ✅ DONE — hypothesis REFUTED in its specific form (209 = 11·19, killed by 11 itself). Verdict: genuine small-number luck in both components. Exact fact recovered: near-seam slot classes carry 2.000δ, interiors 0.800δ. Fossil law onset at p=17, mechanism decomposed. |
| 9 | **Stacking calculus** | If strata depths compose multiplicatively under overlap, predict measured 0.639/0.714 from fresh depths; then PREDICT the level-29 stratum depth and verify by segmented measurement at 29#. | ✅ DONE — superseded by something better: the **EXACT INVARIANCE LEMMA** (unconditional, 1-line CRT proof): every band scales by exactly (p−2) per level, so in-period depth is frozen at birth — 0.714→0.714 was an identity, not a law. 29# check passed exactly (378 = 378). |
| 10 | **Seam sequences for OEIS** | min{k : kPₙ#±1 both prime} per n, and #{k ≤ p : seam pair is an actual twin} — compute, check OEIS, draft submission if new. | DONE (attack2-04-10-hierarchy-oeis.js): min-k = A060256 (exists); the count sequence returned nothing on an exact-term search **run in our own wording**, which after A144311 is no longer good enough to call it absent — `research/SEARCH-CONVENTIONS.md` §1 records no owning convention for a seam count, and the ladder was never searched shifted. Re-run it that way before `oeis-seam-submission.md` is sent. |

## Campaign verdict (all ten complete, 2026-08-14)

**One theorem-grade result and one measured law, and the two must not be quoted
at the same strength.** The **Exact Invariance Lemma** (fossil depth frozen at
birth) is unconditional and was proved independently twice. The **Unification
Law** ρ(u) = e^{2γ}/u² → (e^γω(u))² is **MEASURED to ~1% and
Hardy-Littlewood-conditional**, and its [2,3] continuation rests on an
independence-squared step that `attack2-05-07-integral-ladder.js` calls a
conjecture in terms; `origin-excess.md` §3 marks the u = 2 argmin INFERRED and
"not proven here", and ω(u) is Buchstab's survival function
(`PRIOR-ART.md`, via Cheer–Goldston), not a new object. What it does is explain
one curve across the cap, the trough, the kill shadow and the p³ law, and it was
derived independently by two agents. That is a strong measured unification and
it is not a theorem. Its home calibration is `GLOSSARY.md`'s.
One quantitative confirmation: seam-twin enrichment E(P) = 2·∏p/(p−2) to
0.1–0.6% *(this verdict read 0.2–0.6% until 2026-08-18, after row 1 above and
`GLOSSARY.md`:44 had both been corrected; the four measured deviations are
0.17%, 0.11%, 0.56% and 0.60%, so the old floor excluded two of them. The one
site still carrying the old band is `paper/moire-primes.md`:565)*. One new OEIS
submission drafted (per-level seam-twin count; min-k
turned out to be A060256, formula-less — our scale contributable). Three of
our own hypotheses refuted and corrected (seam-window enrichment, the
11-anomaly seam collision, multiplicative stacking). **No unexplained novelty
survives.** This verdict used to log one, the rich vein at [1667,1956) mod 2310;
`research/attack2-rich-vein.js`, a same-day follow-up this file never cited,
solved it — "REAL STRUCTURE, KNOWN MECHANISM, NO NEW PHYSICS", a T₁₁ ceiling
plateau, with 57 other offsets doing the same thing. The wall stands; the map is
now a geography with a differential equation.
