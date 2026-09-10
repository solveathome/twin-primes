# The monotonicity sweep: one unsound artifact, one invalid inference, and the model treatments beside them

<!-- ledger
id: Q-monotonicity-sweep
status: ANSWERED
todo: 3 (retired)
question: Does anything in the corpus assume certificate validity is monotone in L?
verdict: One unsound artifact and one invalid inference: attack-beta2-04-loss-budget.js section 6 bisects on a predicate measured not upward-closed and is wrong at 3 of 5 levels, true first-crossings 30/72/132/174/210 against the reported 36/72/144/174/354, and redteam-DP1-certificate.js draws a global minimality conclusion from a two-point local check; corrected, worst-casing certifies within 1.00 to 2.00 of true G2 and the exponent penalty runs 0 to 0.27 and falls with x.
-->

*(2026-08-19, Fable session, executing what was TODO item 3 / old item 7: "check
whether anything in the corpus assumes certificate validity is monotone in L."
Producer of the finding's verification: independent re-implementation of
`sumMax` (session scratchpad `mono-h1.js`), reproducing the defective bisection
outputs exactly and then scanning consecutively; cross-checked against
`research/attack-beta2-03-exact-strata.js`'s j = 0 row, an independent
computation of the same object. Legend: **[VERIFIED]** checked computationally;
**[MEASURED]** empirical, finite range.)*

## The object

The non-monotone quantity is the sharp degree-2 Boole–Fréchet certificate
`V₂(L)` of the moment LP: it certifies `G₂(x#) ≤ 6L` iff `V₂(L) < 1`, and at
`x = 17` it reads 1.000818, 0.987479, 1.020035 at `L = 3149, 3150, 3151` —
valid at 3150, invalid on both sides, so the valid set is not an interval in
either direction. Mechanism: the degree-2 criterion carries
`frac(t)(1 − frac(t))` with `t = L·d`, which oscillates in `L`. This is the
certificate-ladder `L` (slots on the 6-lattice), distinct from the covering-run
`L` (whose feasibility IS downward-closed, `sift-limit-attack.md` §7a) and from
the u-frame fold multiplier; no document conflates them.

## Findings

**F1 [VERIFIED], the one unsound artifact.**
`research/attack-beta2-04-loss-budget.js` §6 bisects on
`Σ_i max_t B_i(H) < H`, a predicate measured NOT upward-closed (15 to 146
revivals per level above the first success), and reports the result as
`min H`. Wrong at 3 of 5 levels: reported 36/72/144/174/354 against true
first-crossings 30/72/132/174/210. Three computations agree on the truth (the
independent rescan, and `attack-beta2-03-exact-strata.js`'s j = 0 row, which
states the non-monotonicity and reports first- and stable-crossing as separate
columns — the model treatment). Corrected consequences: worst-casing certifies
within a factor **1.00 to 2.00** of true `G₂` (not 1.2 to 2.4), the exponent
penalty runs **0 to 0.27 and falls with x** (not "about 0.25"), and at `x = 7`
the certificate is **sharp** (`H₁ = G₂ = 30`). **Containment:** the `β` floor
3.195/3.3152 comes from §7's level-`D` LP and does not consume §6; the only
live echo sits inside `sift-limit-attack.md`'s "⚠ SUPERSEDED — kept for the
reasoning" box, which already instructs adjudication before use. The script
now carries a CORRECTION banner; its tail is retained as the custody record.
A secondary defect in the same lines: the bisection seed `hi = 1 << 22` is
never tested, so the loop invariant rests on an unasserted assumption.

**F2 [VERIFIED], the invalid inference.** `research/redteam-DP1-certificate.js`
verifies `V₂(L) < 1 ≤ V₂(L−1)` at the reported `L` and concludes each is
"genuinely the first" — a two-point local check used for a global minimum,
which needs exactly the upward-closure its own printed values refute. The
"first" claims stay true because both producers scan consecutively from
`L = 1`, but the red team is not independent of the producers on minimality —
the opposite of its purpose. Correction appended to its READINGS
(fingerprint-safe, below the embedded tail).

**F3, the unapplied drafted caveat.** `attack-bonferroni-degree.md` §9
correction 2 drafted the monotonicity caveat for `attack-DP1-mechanism.md`
§5's "crossing" language on 2026-08-18 and marked it "drafted here and not
applied"; it remains unapplied in the frozen layer. Recorded here and in the
changelog rather than edited in place.

**Sound, checked and worth naming [VERIFIED]:** `attack-D-twopoint.js` and
`attack-bonferroni-degree.js` (exhaustive consecutive scans, non-monotonicity
declared up front); `attack-L-law.js` (declares its one monotonicity use and
re-tests closure rather than citing it); `attack-beta2-05-covering-prune.js`
(separates criterion from feasibility, measures the revivals);
`attack-beta2-03-exact-strata.js` (the model: two crossing columns);
the K-ladder (`cap_K` monotone by proof, `paper/staircase-note.md`
Prop. 7); TODO 1b's `maxM` repair landed with the defective version retained
as a labelled control; every other corpus bisection runs on a declared- or
proven-monotone predicate.

## What this does not show

The staging layer beyond the three documents the live layer cites was not
swept (~40 files). `x = 23`'s H₁ (420 first / 574 stable per
`attack-beta2-03`) was not independently re-verified. Whether `V₂` has valid
`L` below 3149 at `x = 17` was not re-scanned (irrelevant to the verdicts:
both producers scan from `L = 1`).
