# Red team of the three 2026-08-30 engine notes: 26 of 26 headline figures reproduce on independent code, and one DERIVED implication does not — the correction-versus-sifting-limit inequality fails at @23 for the engine's own model B and for the measured B, so its "level-free" clause and REFUTED row 97's "best sigma any level has" both have to go

<!-- ledger
id: Q-redteam-0830-engine
status: ANSWERED
todo: 8, A
question: Do attack-0830-buchstab-deep.md, attack-0830-comb-tail.md and attack-0830-anchored-ladder-17.md survive an adversarial re-derivation on code that shares nothing with their producers, and does REFUTED row 97 stand as worded?
verdict: Every headline number in the three notes reproduces exactly on independent code (26 of 26 comparisons, including F2/f2 = 3.6682 at sigma = 4.7088 by a near-analytic route, the 0-of-1512930 pair count, the tail defect at five levels, the full 419328-term Legendre split, and the whole @23 anchored ladder including K* = 27, floorU = 5364, truth 597475 and the minimal pool 1543 proven exact); one load-bearing DERIVATION is REFUTED — "|B - 1| >= c forces sigma(q) < u_c - 1" fails at @23 on 21134 (q, K) pairs for the engine's model B at c = 0.1 and on 33875 high-count pairs for the measured B at c = 0.01, because the step bounds every u in a weighted average by the largest one and treats the denominator as e^-gamma, so the "level-free" clause of buchstab-deep section 4 and REFUTED row 97's "|B - 1| >= 0.01 forces sigma < 1.798" must be re-graded from DERIVED to MEASURED-at-@23 (where the conclusion survives: the worst sigma is 2.159, still far below beta2 = 4.26645); row 97's "the best sigma any level has" is separately WEAKENED, since @29's head sigma is 5.5785 with width 1.5325 and @97's is 17.1422 with width 1.0000; comb-tail derives its main-term factor from prod (1 - 1/q_i) and measures it against prod (1 - 1/(q_i - 1)), which is what natal-cap-28 line 283 computes against its own line 20 and against certificate-engine.md section 1, a 0.9% difference at @23 that moves nothing certified; comb-tail also misquotes its own cited source as F1 in [1.5, 4] where that source says [1.5, 3] and says there is no bound at all at s < 1; four smaller slips are listed and none opens or closes a route.
-->

*(2026-08-30. Staging note; HELD under the publication moratorium. No existing
repo file was edited, moved or deleted; no git command was run. One producer,
formally embedded: `research/history/staging/redteam-0830-engine.js` (31.8 s,
195 output lines, code-sha256 4eca6e6d..., out-sha256 15b47182...). One
`--force` was used, on this session's own file, to append SEC 6 after the block
was first bound; the stamp is in the fingerprint and reads "0 of 389 figures in
the replaced block not reproduced". Method: refuted-until-re-derived. Nothing in
that producer is copied from the three notes' producers; the sieve functions
come from a hand-integrated closed form plus Gauss quadrature and an AB2/AM3
march rather than a uniform trapezoid, and every tile quantity is rebuilt from
the comb's definition. The three notes' figures are printed BESIDE the
recomputed value, never asserted into it, so a mismatch prints rather than
aborts. Calibration per claim: PROVEN, VERIFIED by exact computation, MEASURED,
DERIVED, REFUTED. Scope guard, `attack-wrongdirection-audit.md` section 3.4:
every count below is a finite per-level count at a named level and every sieve
value is a limit-form value at a fixed sigma; no sentence here is a law in x,
and one sentence in the notes that reads as one is flagged in row 2.)*

---

## 0. VERDICT

**The disconfirming half first.** One derivation is REFUTED, three clauses are
WEAKENED (REFUTED row 97's "best sigma", the Comb Discrepancy main term's
product, and a misquoted `F1` range), and four smaller things are wrong. None of
the eight opens a route, closes a route, or moves an exponent, and none touches
a certified number.

1. **REFUTED: the correction-versus-sifting-limit implication.**
   `attack-0830-buchstab-deep.md:38-43` and `:213-229` derive, and
   `research/REFUTED.md:97` repeats, that a departure `|B - 1| >= c` can only
   occur at `sigma(q) < u_c - 1`, and call the inequality **level-free**. It is
   not a valid implication. The step bounds every `u` inside a weighted average
   by the largest one and treats the average's denominator as `e^-gamma`.
   Tested exhaustively over all 1,512,930 `(q, K)` pairs at @23 [SEC 5a], the
   implication **fails for the engine's own model B** at `c = 0.10` (21,134
   pairs, worst `sigma = 1.042` against the allowed `1.022`), at `c = 0.05`
   (471,679 pairs, `1.270` against `1.171`) and at `c = 0.02` (821,675 pairs,
   `1.454` against `1.315`); it holds for the model only at the one value the
   note headlines, `c = 0.01` (`1.545` against `1.798`). For the **measured**
   `B_true` it fails at every `c`, including on pairs with `cap_K >= 1000`
   where counting noise cannot be the cause: `c = 0.05` on 148 pairs at
   `sigma` up to `1.468`, `c = 0.01` on 33,875 pairs at `sigma` up to `2.159`.
2. **The conclusion those lines carry survives, at one level, as a
   measurement.** The largest `sigma` at which `|B_true - 1| >= 0.01` anywhere
   at @23 is `2.159`, and `beta2 = 4.26645`, so the correction and the region
   where a `kappa = 2` lower bound exists are still disjoint **at @23** by a
   margin of `2.1` in `sigma` [SEC 5a, MEASURED]. What is gone is the claim
   that the separation follows at every level from a level-free inequality.
3. **WEAKENED: `REFUTED.md:97`'s "the best sigma any level has (4.7088, @23
   head)".** `4.7088` is the largest head `sigma` only among the levels whose
   per-`q` ladder this corpus enumerates. @29 has an embedded march
   (`research/natal-cap-18-at29.js`) and its head `sigma` is `5.5785` with
   width `F2/f2 = 1.5325`; @97's is `17.1422` with width `1.0000` to five
   places [SEC 1, VERIFIED]. The row's own note prints exactly this table.
4. **WEAKENED: the Comb Discrepancy Lemma's main term is measured against a
   product the theorem does not state.** `attack-0830-comb-tail.md:160-180`
   derives its factor from the Mertens product `prod (1 - 1/q_i)` — the form
   `research/certificate-engine.md` section 1 and
   `research/natal-cap-28-analytic-certificate.js:20` both state — and then
   measures the ratio against `prod (1 - 1/(q_i - 1))`, which is what
   `attack-0830-comb-tail.js:92` and `natal-cap-28-analytic-certificate.js:283`
   compute. On the same tile the two give `1.1343` and `1.1443` at @23 [SEC 6];
   the `(q_i - 1)` column reproduces the note's five quoted figures exactly. I
   re-derived the theorem's Legendre sum and get `prod (1 - 1/q_i)`, so the code
   is the odd one out; but the head certificate's error bound is `1.5 x 10^27`
   times its main term, so **nothing certified moves either way**, and I have
   not re-derived the Certified-Head Theorem's proof. Flagged for the live
   layer, not acted on.
5. **Four smaller defects**, rows 12, 13, 17 and one citation habit: `q_27` is
   `151`, not the `131` `attack-0830-comb-tail.md:145` uses; that note's ledger
   attributes a head-only ratio (`10^27 x main`) to the tail;
   `attack-0830-anchored-ladder-17.md` uses the word "waste" for two different
   numbers (`868` at `:163`, `693` at `:77`); and both notes cite staging files
   by bare filename as if they sat in `research/`.

**And then what stands.** Every headline figure in the three notes reproduces
on code that shares nothing with their producers: **26 of 26 comparisons agree,
0 disagree** [SEC 0-4]. That includes the two exact sieve anchors
(`F2(1) = 2(2e^gamma)^2 = 25.3778`, `F2(2) = 6.3444`), `F2/f2 = 3.6682` at
`sigma = 4.7088` against the note's `3.6684` by a route with no marching grid
at all, the `0 of 1,512,930` pair count and the `1.475 at q = 31` least ratio,
the whole tail-defect table at five levels to the printed digit, the 419,328-term
Legendre split (`11.20%` L1, `1.97 / 7.72 / 1.51` by range) with zero exactness
failures, and the entire @23 anchored ladder — `K* = 27 = K_first_positive`,
classic floor `4841`, unified floor `5364`, margin `523`, truth `597475`,
minimal pool `1543` with the sole-killer lower bound meeting the greedy upper
bound, `159` dead, `37` redundant, `1732` ascending, zero hard-cap and zero
margin-identity violations at all `1740 x 1739` depths. The sealed 14-of-14 at
`:112` scores 14 of 14 on this engine too.

**One thing I could not break and want to say so plainly.** The brief asked
whether a ratio of two sifted counts can be bounded better than the ratio of
brackets, by a common-factor cancellation or by a Buchstab identity applied to
the ratio. The answer is no, and the note's own sections 3.2 and 3.3 are the
reason, not section 4's item 1. The certificate needs an **upper** bound on
`#A_K`, so a Bonferroni expansion must **lower**-bound every subtracted sieve
`S(A^(i))`, which needs `f2(sigma_i) > 0`; at @23 `sigma_i` exceeds `beta2` at
**0 of 1,511,191** `(q, i)` pairs, on **0** scour primes, so the legal
Bonferroni side collapses to the trivial `#A_K <= #A_0` at every `q` [SEC 5e,
VERIFIED]. The `kappa = 1` recast that would cancel the common factor sifts
`A_0` by the `K` partner classes, and its remainder is the discrepancy of
`A_0` in progressions mod `d | q_1...q_K`, which is a `kappa = 2` sifted count
at level `D/d` and is therefore bracketed by `[f2, F2]` and not estimated —
main-term-sized, so `sum_d |r_d|` cannot be `o(main)`. That is the note's
section 3.3 argument and it is correct. Section 4 item 1's stronger sentence,
"the only instrument that turns a bracket into an asymptotic at kappa = 2 is
the fundamental lemma", is a statement about this corpus's instrument shelf,
not a theorem, and should say so.

---

## 1. CLAIMS TABLE

Every row quotes the claim, names the file and line, gives the independent
re-derivation, and — where the grade is not STANDS — the sentence that should
replace it. `SEC n` is a section of this note's producer OUTPUT block.

| # | claim, quoted, with file:line | independent re-derivation | grade | replacement sentence |
|---|---|---|---|---|
| 1 | "the transfer is an asymptotic for a ratio of two `kappa = 2` sifting functions sharing `z = q`, so any sieve bracket enters the ratio undivided" — `REFUTED.md:97`, `attack-0830-buchstab-deep.md:29-36, 205-212` | The structural half is right and the argument for it is section 3.2/3.3, not section 4 item 1. Bonferroni in the certificate's legal direction needs `f2(sigma_i) > 0` on every subtracted term; at @23 that holds at **0 of 1,511,191** `(q, i)` pairs [SEC 5e]. The `kappa = 1` recast needs `A_0`'s discrepancy in progressions, itself a `kappa = 2` bracket at level `D/d`, so `sum_d \|r_d\|` is main-term-sized | **STANDS** (with one clause weakened) | keep as is, but replace section 4 item 1's "the only instrument that turns a bracket into an asymptotic at `kappa = 2` is the fundamental lemma's `s -> infinity`" with "no instrument on this corpus's shelf turns a bracket into an asymptotic at `kappa = 2` except the fundamental lemma's `s -> infinity`; that is a survey statement, not a theorem" |
| 2 | "`\|B - 1\| >= 0.01` needs `u ... < 2.798`, which forces `sigma(q) < 1.798`" and "The two conditions never overlap, **at any level**, since the inequality is level-free" — `attack-0830-buchstab-deep.md:38-41, 213-229`; repeated in `REFUTED.md:97` | Exhaustive over all 1,512,930 `(q, K)` pairs at @23. Model `B`: FAILS at `c = 0.10` (21,134 pairs, worst `sigma` `1.042` vs `1.022`), `c = 0.05` (471,679, `1.270` vs `1.171`), `c = 0.02` (821,675, `1.454` vs `1.315`); HOLDS only at `c = 0.01` (`1.545` vs `1.798`). Measured `B_true`: FAILS at every `c`, and at `cap_K >= 1000` still fails at `c = 0.05` (148 pairs, `1.468`) and `c = 0.01` (33,875 pairs, `2.159`) [SEC 4, SEC 5a] | **REFUTED** as a derivation; the conclusion survives as a measurement at @23 | "MEASURED at @23: over all 1,512,930 `(q, K)` pairs the largest `sigma` carrying `\|B_true - 1\| >= 0.01` is `2.159`, and `beta2 = 4.26645`, so the correction and the region where a `kappa = 2` lower bound exists are disjoint at this level by `2.1` in `sigma`. The `u_c - 1` table is an ordering of the `omega` grid, not an implication: `B` is a ratio of two weighted averages of `omega` over a range of `u`, so a correction can come from the low-`u` end while `u_max` is above `u_c`, and the denominator is not `e^-gamma` at finite level. Whether the separation holds at every level is OPEN." |
| 3 | "`F2/f2 = 3.668` at the best `sigma` any level has (`4.7088`, @23 head)" — `REFUTED.md:97`; "the best `sigma` any **run** level has" — `attack-0830-buchstab-deep.md:33-35` | `sigma(q0)` and `F2/f2` recomputed at ten levels [SEC 1]: @23 `4.7088 / 3.6684`, @29 `5.5785 / 1.5325`, @31 `6.2071 / 1.1811`, @37 `6.9803 / 1.0432`, @97 `17.1422 / 1.0000`. @29 carries an embedded march in `research/natal-cap-18-at29.js`. Ours `3.6682` against the note's `3.6684` | **WEAKENED** (the width number itself STANDS) | "`F2/f2 = 3.668` at the @23 head prime (`sigma = 4.7088`), the deepest level whose per-`q` ladder is enumerated here; the head width falls to `1.533` at @29 and to `1.000` at @97, and the argument that closes the route is not the head width but that `sigma > beta2` needs `q < W^(1/(1+beta2)) = 38.5`, so `1,736` of the @23 scour's `1,739` primes sit below `beta2` [ARITHMETIC], where `f2 = 0` and there is no lower side at all" |
| 4 | "`F2` ... is above the trivial `#A_K <= #A_0` at 0 of 1,512,930 `(q, K)` pairs; the least ratio is `1.475` at `q = 31`" and "the floor ... is `-1,733,138` at every `K`" — `attack-0830-buchstab-deep.md:44-51` | Rebuilt from the comb: pairs `= n(n+1)/2 = 1,512,930` exactly; `0` pairs below `#A_0` and `0` below `#A_K` itself; least ratio `1.475 at q = 31`; sharp floor `-1733138` at `K = 0, 27, 60, 100, 150, 250, 500, 1000, 1739` against true floors `-1733138 ... 596782` [SEC 4] | **STANDS** | — |
| 5 | "Bonferroni-1 with `F2` ... gives `B >= 0.792` at `(q = 31, K = 1)` and `-0.308` already at `(q = 37, K = 1)`, `-1.628` at `K = 2`" — `attack-0830-buchstab-deep.md:52-55, 171-184` | The stated formula re-derived from the identity and re-evaluated on independent `F2`, `f2`: `0.792`, `-0.308`, `-1.628`; at `q = 41` `f2(sigma) = 0` and there is no lower side [SEC 5b] | **STANDS** | — |
| 6 | "The per-`q` true `B` ... stays within `0.007` of 1 for `q <= 1009`, departs by `0.022` at `q = 2003` (`0.9780`) and reaches `0.9044` at `q = 4001` against a model `0.9586` ... counts of order `10^3`" — `attack-0830-buchstab-deep.md:69-73`, table at `:259-266` | Fresh @23 sieve: `B_true / B_model` at `(31,1) 1.0000/1.0000`, `(401,69) 0.9958/1.0036`, `(2003,294) 0.9780/0.9881`, `(4001,541) 0.9044/0.9586`, `(8009,998) 0.9697/0.9222`; `cap_K` there `318450, 8044, 1305, 557, 216` [SEC 4] | **STANDS**; "counts of order `10^3`" is generous | "on counts of `216` to `1305` at the four deep-tail rows, so the departures carry a relative counting error of `3` to `7` percent" |
| 7 | the tail defect: "`-0.01%` ... `-0.00%`" signed, "`0.60%` / `0.25%`" unsigned, tail `n` `9 / 29 / 105 / 396 / 1638` — `attack-0830-comb-tail.md:116-123` | Rebuilt from `dP (pi(A) + pi(B) - 2 pi(q-1))` with a fresh tile and a fresh `pi` table. @11 `9 / -6.03 / 14.92`, @13 `29 / 1.09 / 6.50`, @17 `105 / 0.50 / 2.85`, @19 `396 / -0.01 / 1.42`, @23 `1638 / -0.01 / 0.60`; sign split `813/825` at @23; max `\|E\|/cap2` `26.59%` at `q = 14401` [SEC 3]. @29 not enumerated here | **STANDS** at @11-@23; @29's `0.25%` NOT RE-DERIVED | — |
| 8 | "`e^gamma (1/u - q^(1-u))`" as the Comb Discrepancy Lemma's main-term factor, and "the exact ratio ... reads `0.9585 / 1.0254 / 1.0824 / 1.1202 / 1.1443`" — `attack-0830-comb-tail.md:160-180` | The factor is re-derived symbolically here from `dP/(N/W) = (15/4)/prod(1-1/p)`, `prod_{p<q}(1-1/p) ~ e^-gamma/ln q` and `pi(T)-pi(q-1) ~ T/ln T - q/ln q`; the ratio collapses to `[(pi(T)-pi(q-1))/T] / prod_{p<q}(1-1/p)`, which is the factor. **But the derivation and the measurement use different products.** The derivation uses `prod (1 - 1/q_i)` (the Mertens product, as the note itself writes at `:167-168` and as `research/certificate-engine.md` section 1 states the theorem). The producer computes `Pj *= (1 - 1/(q-1))` (`attack-0830-comb-tail.js:92`), and so does `research/natal-cap-28-analytic-certificate.js:283`, against its own header line 20. On the same rebuilt tile [SEC 6] the `(q_i - 1)` form reproduces the note's five figures exactly and the stated form gives `0.9440 / 1.0102 / 1.0684 / 1.1084 / 1.1343` | **WEAKENED**: the factor STANDS, the measured column is against a different main term | "the exact ratio, computed against the theorem's stated main term `prod (1 - 1/q_i)`, is `1.1343` at @23; the `1.1443` on the engine's own `prod (1 - 1/(q_i - 1))` is the same object to `0.9%`. About one point of the unexplained `10 to 12%` gap between the exact ratio and the asymptotic form is this product mismatch and not a finite-level correction" |
| 9 | "the long ones ... whose term-by-term sum is `11.2%` of main at @23", split `1.97 / 7.72 / 1.51%` by BV / EH / short, `269504 of 419328` short — `attack-0830-comb-tail.md:200-208, 228` | Full independent Legendre decomposition over the mids, `2^(k+2)` terms per tail prime, `419,328` terms at @23. L1 `11.20%`, split `1.97 / 7.72 / 1.51`, signed by range `-1.3 / -305.4 / 109.0`, short `269,504 of 419,328`, `L1/sum\|E\| = 18.6x`, and **0** exactness failures at every tail prime at five levels [SEC 3] | **STANDS**, digit for digit | — |
| 10 | "short terms ... asserted `< 1` at every term at every level" — `attack-0830-comb-tail.md:196-197, 297` | `0` short terms with `\|delta\| >= 1` at five levels; worst `0.999905` at @23, and `0` exactness failures in the decomposition at every tail prime [SEC 3]. Half the bound is a theorem: `count in {0,1}` and `share > 0` give `delta <= 1 - share < 1` with nothing run. The other half, `delta > -1`, needs `share < 1`, which is not automatic (`phi(30d)/(30d) = 0.164` at @23) and is what the run checks | **STANDS**; the positive side is stronger than measured | add "on the positive side this is a theorem — `count <= 1` and `share > 0` force `delta < 1`; only `delta > -1`, i.e. `pi(T) - pi(q-1) < phi(30d)`, is a checked inequality" |
| 11 | "loose by `F1 in [1.5, 4]` (`attack-0830-buchstab-deep.md` section 6 [CITED])" at `attack-0830-comb-tail.md:30-31`, and "`F1(s) = 2e^gamma/s`, i.e. `1.5` to `4.0` times the main term across the tail under BV or EH" at `:240-242` | Arithmetic on `rho = 0.422 -> 0.562`: `s_BV = 1.185 -> 0.890`, `s_EH = 2.370 -> 1.779`, `F1 = 2e^gamma/s = 1.503 -> 2.002` across the EH range [SEC 3]. The `4.0` is `2e^gamma/0.889`, i.e. `F1` evaluated at `s < 1`, **outside the range where `F1` is a bound at all**; `attack-0830-buchstab-deep.md:311-313` says so explicitly ("no statement at its end (`s < 1`)") and its own section 6 grade at `:320-321` reads `F1 in [1.5, 3]`, not `[1.5, 4]` | **WEAKENED**; the cited source is misquoted | "loose by `F1 in [1.50, 2.00]` across the EH range, and by `F1 = 3.00` at the tail's start under BV; under BV the tail's end has `s = 0.889 < 1`, where the linear sieve gives no upper bound at all rather than a loose one (`attack-0830-buchstab-deep.md` section 6, which grades the same object `F1 in [1.5, 3]`)" |
| 12 | "`ln q_{27}/ln T = ln 131/ln T` runs `0.38 to 0.51`" — `attack-0830-comb-tail.md:143-146` | The 27th @23 scour prime is `151`; `131` is the 23rd [SEC 5d]. With `y = 151` the range is `0.392 to 0.522` | **WEAKENED** (numeric slip; the conclusion is unaffected) | "`ln q_{27}/ln T = ln 151/ln T` runs `0.392` to `0.522` across the @23 tail" |
| 13 | ledger `verdict:` "before its error term (`10^27 x main`)" — `attack-0830-comb-tail.md:8`, body at `:156-158` | `2^(j+1)(2*3^k+1)` summed over the `101` head primes is `7.40e33` against a head `sum cap2` of `4,913,297`, ratio `1.51e27` [SEC 3]. That is the **head** ratio, used as a lower bound for the tail because `j` is larger there. The body says so; the ledger verdict does not | **WEAKENED** (attribution) | "before its error term, which is already `1.5 x 10^27` times the main term on the **head** and larger in the tail" |
| 14 | the @23 anchored ladder: `K* = 27`, floor `4841`, unified `5364`, margin `523`, truth `597475`, minimal pool `1543`, plateau `596782`, waste `868 = 372 + 321 + 175`, killers/dead/sole/redundant `1580/159/1543/37`, `14 HIT of 14` — `attack-0830-anchored-ladder-17.md:155-166, 112, 190-196` | Rebuilt from the comb at @11, @13, @17, @19, @23: every one of those figures reproduces, plus `sum cap1 48424543`, `sum cap2 7034588`, candidates `7034216`, incidences `3082915`, classic sums `5312453` at `K = 26` and `5296609` at `K = 27`, ascending plateau `1242`, greedy plateau `1227`, ascending truth `1732`, and `0` hard-cap and `0` margin-identity violations at all `1740 x 1739` depths. All nine EXTRAPOLATED bands contain the recomputed value [SEC 2] | **STANDS**, every column | — |
| 15 | "the exact minimal pool is `4` and `21`" and the record's "`1863` primes" at @23 — `attack-0830-anchored-ladder-17.md:37-48` | Minimal pool `4` at @11 and `21` at @13, each PROVEN exact by the sole-killer lower bound meeting the greedy upper bound; the same coincidence holds at @17 (`88`), @19 (`350`) and @23 (`1543`) [SEC 2]. The @23 scour is `1739 = pi(sqrt W) - pi(23)`; `attack-anchored-02.md:164` does say "5.3M slots x 1863 primes" | **STANDS** | — |
| 16 | "The block's final line reads `1 CHECK(S) FAILED`: that is the refuted expectation of section 0 (line 631)" — `attack-0830-anchored-ladder-17.md:295-298`, and the reading refuted at `:50-55` | Line `631` of that producer is the single `FAIL`, line `643` is the final `1 CHECK(S) FAILED`, and the counter at `:117` increments only on a printed `FAIL`, so the count and the cause are what the note says. The last-killer table reproduces here at all five levels: `41, 139, 641, 2887, 14867`, with `q+2` in the scour at @11/@17/@23 and not at @13/@19 [SEC 2] | **STANDS** | — |
| 17 | "waste = wheel-excluded + shadows + fresh-self \| ... `868 = 372 + 321 + 175`" at `:163` against "Waste = `868` minus `175` = `693`" at `:77` | Both numbers are right and they are different quantities: `868` is the allowance count `sum s`, `693` is the full-depth margin. The producer's own line says "`868` allowances = ..." and is unambiguous; the note's table header is not | **WEAKENED** (one word used for two numbers) | rename the `:163` row "allowances = wheel-excluded + shadows + fresh-self" and keep "waste" for the `693` of D1 |

---

## 2. The one REFUTED derivation, in full

**The sentence.** `attack-0830-buchstab-deep.md:213-229`:

> "`B != 1` needs `e^gamma omega(u) != 1` at `u = ln n/ln y_K <= ln W/ln y_K`,
> and `q > y_K` gives `sigma(q) = ln W/ln q - 1 < u - 1`. ... The two
> conditions never overlap, at any level, since the inequality is level-free."

**The two gaps.** `B(q,K)` is defined in that note's own Transfer Statement D2
as `<omega(ln n/ln y_K)> / <omega(ln n/ln x)>`, a ratio of two weighted
averages of `omega` over `n` in `[q^2, W]`.

1. **The denominator is not `e^-gamma`.** `B - 1 = (<omega_K> - <omega_0>)/<omega_0>`,
   and `<omega_0>` is an average of `omega(ln n/ln x)` over `u_0` running from
   `2 ln q/ln x` to `ln W/ln x`, which at @23 starts at `2.19` for `q = 31`.
   So `|B - 1| >= c` does not imply `|e^gamma omega(u) - 1| >= c` at any `u`.
2. **The bound is taken at the largest `u` in the average.** The step
   `sigma(q) + 1 = ln W/ln q < ln W/ln y_K = u_max` is correct, but converting
   `|B - 1| >= c` into `u_max <= u_c` requires that the whole average sit below
   the threshold. A correction can be produced by the small-`n` end of the
   range while `u_max` is well above `u_c`, and at @23 it is.

**The test, exhaustive** [SEC 4, SEC 5a]. Over all `1,512,930` `(q, K)` pairs:

| `c` | allowed `sigma < u_c - 1` | model `B`: worst `sigma` / pairs | `B_true`, `cap_K >= 100` | `B_true`, `cap_K >= 1000` |
|---|---|---|---|---|
| 0.10 | 1.022 | 1.042 / 21,134 — FAILS | 1.307 / 60,173 — FAILS | vacuous |
| 0.05 | 1.171 | 1.270 / 471,679 — FAILS | 1.468 / 264,359 — FAILS | 1.468 / 148 — FAILS |
| 0.02 | 1.315 | 1.454 / 821,675 — FAILS | 1.960 / 557,864 — FAILS | 1.960 / 11,272 — FAILS |
| 0.01 | 1.798 | 1.545 / 954,044 — holds | 2.159 / 715,892 — FAILS | 2.159 / 33,875 — FAILS |

The `cap_K >= 1000` column exists because the deep-tail `B_true` values sit on
counts of order `10^2`, where a departure of a few percent is counting noise;
the implication still fails there, on pairs with at least a thousand survivors.

**What survives.** The conclusion the note draws from the inequality — that the
correction lives where `f2 = 0` — is a true MEASURED statement at @23: the
largest `sigma` carrying `|B_true - 1| >= 0.01` anywhere is `2.159`, and
`beta2 = 4.26645`. The margin is `2.1` in `sigma`, which is large. What does
not survive is the words "at any level" and "level-free", and the `c = 0.10`,
`0.05` and `0.02` rows of the note's own section 4 table, which are false as
implications even for the engine's model. `REFUTED.md:97` carries the `c = 0.01`
row, the one that happens to hold for the model at @23; it should carry the
measurement, not the implication.

---

## 3. What the independent instruments agreed on

Listed so that a later reader can tell what was actually attacked and failed to
break, as distinct from what was read.

**The sieve functions, three independent routes** [SEC 0]. `sigma_2` was
integrated by hand on `(0, 4]` — `(u^-2 sigma)' = -2 u^-3 sigma(u-2)` gives
`int_2^u (t-2)^2/t^3 dt = ln(u/2) + 4/u - 2/u^2 - 3/2` — then extended to
`(4, 6]` by composite Gauss-Legendre, with `F2 = 1/sigma_2` up to `alpha2` and
`f2`, `F2` past their limits by quadrature of the integrated DDE. Independently,
an AB2/AM3 predictor-corrector march at `h = 2 x 10^-5`. The two agree with each
other and with the note to `2 x 10^-5` relative at every `sigma` tabled. Two of
the note's figures are exactly checkable and check exactly:
`F2(1) = 2(2e^gamma)^2 = 25.3778` and `F2(2) = 6.3444`. `beta2` was re-pinned by
shooting: at `beta2 - 0.02` the pair converges to `1.007963`, at `beta2 + 0.02` to
`0.992085`, at `beta2` to `1.000002`. The `kappa = 1` closed forms
`F1 = 2e^gamma/u` on `[1,3]` and `f1 = (2e^gamma/u) ln(u-1)` on `[2,4]` are
reproduced to `10^-9` at seven points.

**The tile, rebuilt from the comb** [SEC 2, SEC 3, SEC 4]. `N`, the anchored
march, the cofactor candidates, the first-killer histograms, the greedy and
sole-killer pools, the per-prime `cap_K` ladder, the tail prime counts and the
Legendre decomposition are all built here from the definition of the Natal@5
comb, with no figure taken from the three producers. Anchors from the notes are
printed beside the recomputed value rather than asserted into it. Every one of
the 26 comparisons agrees.

**The one thing the notes measured that this pass makes half-provable.** The
Comb Discrepancy Lemma's "off its share by less than 1" on short terms is
measured in `attack-0830-comb-tail.md:196-197` and asserted per term. Half of it
is a theorem and half is a checked inequality, and the note treats both halves as
measurement. A progression to modulus `30d >= T - q + 1` holds at most one
integer of `[q, T]`, so `count in {0, 1}`; with `delta = count - share` and
`share > 0` this gives `delta <= 1 - share < 1` **outright**, on the positive
side, with nothing run. The negative side needs `share < 1`, i.e.
`pi(T) - pi(q-1) < phi(30d)`, which is not automatic: `phi(30d)/(30d) =
prod_{p <= x}(1 - 1/p) = 0.164` at @23. That half is what the run checks, and it
passes: `0` short terms at or above `1` across five levels, worst `|delta| =
0.999905` at @23, and `0` exactness failures in the decomposition itself at
every tail prime [SEC 3].

---

## 4. NOT REACHED

- The @29 rows of `attack-0830-comb-tail.md` (tail `n = 7589`, `sum cap2 =
  51660643`, signed `-0.00%`, unsigned `0.25%`, `L1 5.67%`): the tile is
  `W = 6469693230`, above the flat-array range this producer uses. Cited from
  the note, NOT re-derived here.
- `attack-0830-buchstab-deep.md` SEC 4, the exact finite-level remainder
  `2 sum 4^nu(m) |r_A(m)|` (`97,080` against `X V f2 = 53,299` at `q = 31`;
  `250,017` against `8,133` at `q = 37`): NOT re-derived. Its ratios
  (`1.82`, `30.7`) are arithmetic on the note's own two columns and are correct
  as arithmetic.
- `attack-0830-anchored-ladder-17.md` section 5's @29 pricing, and section 6's
  transfer to item Z2: read, not attacked.
- The Certified-Head Theorem's proof. Section 0 item 4 re-derives the Legendre
  main term from the theorem's own one-paragraph description in
  `research/certificate-engine.md` section 1; it does not re-derive the Comb
  Discrepancy Lemma or the Window Dilation Lemma the theorem composes.
- Whether the `prod (1 - 1/(q_i - 1))` convention appears anywhere else in the
  corpus's code: two occurrences found by grep, not a survey.
- `research/qc.js --full` was run; see the report line.

---

## 5. What would falsify this note, and whether the check has run

| claim of this note | what would falsify it | has it run |
|---|---|---|
| the `sigma < u_c - 1` implication fails at @23 | a `(q, K)` pair count of `0` at every `c`, or a definition of `B` under which the counts vanish | RUN, exhaustive over all 1,512,930 pairs, on `B_true` and on the model `B`, with a count floor at 100 and 1000 |
| the conclusion survives at @23 as a measurement | a pair with `\|B_true - 1\| >= 0.01` at `sigma > beta2 = 4.26645` | RUN; the worst is `sigma = 2.159` |
| `F2/f2 = 3.6682` at `sigma = 4.7088` | a third route disagreeing past `10^-4` | RUN, three routes; and the two closed-form anchors `F2(1)`, `F2(2)` check exactly |
| the @23 anchored ladder reproduces | any column differing | RUN, five levels, every column, plus `0` hard-cap and `0` margin-identity violations at all `1740 x 1739` depths |
| the tail defect and Legendre split reproduce | a level where the signed or unsigned percentage differs | RUN at @11-@23; @29 NOT RUN |
| the Legendre decomposition is exact | a tail prime where the signed term sum differs from the direct sifted count | RUN at every tail prime at five levels, `0` failures |
| the two Legendre products differ by about 1% | the note's five quoted ratios matching the `(1 - 1/q_i)` column | RUN; they match the `(1 - 1/(q_i - 1))` column exactly and the other column not at all |
| `REFUTED.md:97`'s "best sigma any level has" is wrong as worded | @29 or @97 having a head `sigma` below `4.7088` | RUN; `5.5785` and `17.1422` |
| the Bonferroni upper side is trivial at @23 | one `(q, i)` pair with `sigma_i > beta2` | RUN; `0` of `1,511,191` |
| nothing here opens or closes a route | a route named | none is named; this note proposes no `REFUTED.md` row and reopens none |
