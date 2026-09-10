# The import map: which foreign mathematics is worth aiming at this object

<!-- ledger
id: Q-import-map
status: PARTIAL
todo: none
question: Which foreign mathematics is worth aiming at this object, and what did each landed import actually buy?
verdict: Nineteen landings, zero routes opened on the exponent; every one banked a proven identity, a derived constant, a published anchor or a wall address, which is why payoff is graded by TYPE rather than by probability, and the map is live with rows still unrun.
-->

**Scope.** This file is the standing, graded map of candidate mathematics
imports, and that is all it is. It holds no mathematics of its own beyond the
pricing of each candidate. One row per candidate field, one short paragraph per
row. The five imports that have already run are carried as the calibration set,
with their landed verdicts, so a new row can be graded against something rather
than against nothing. What to work on next is [../TODO.md](../TODO.md); what is
closed is [OUTCOMES.md](OUTCOMES.md); how to search is
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md); which candidates became paper
proposals is [../paper/proposals/PROPOSALS.md](../paper/proposals/PROPOSALS.md).

**Why this file exists.** Five foreign imports ran on 2026-08-19 (chaining,
Suen, thinning, max-plus, B-free), and twelve more rows ran across the two
nights following. None moved the exponent. Every one banked something: a
proven identity, a derived constant, a published anchor, or a wall address.
That hit rate is the reason to do this structurally instead of by
inspiration, and the reason to grade expected payoff by TYPE rather than by
probability of success.

---

## 0. How to read a row

**Structural fit** is the first gate and the one that kills most candidates.

- **EXACT-IDENTITY** — the moiré object *is* the foreign object, up to notation.
  The copy theorem is a max-plus semiring identity; the fold is 2-of-`p`
  thinning; `maxsum_m` is a scan statistic. A vocabulary match is not this.
- **STRONG-ANALOGY** — the two objects share a mechanism and a named theorem
  transfers with one stated modification, which the row names.
- **VOCABULARY-ONLY** — the words coincide and the mathematics does not. These
  are rejected and do not appear in this table; they are listed with their
  reasons in `history/staging/import-map-construction.md`, so the same candidate
  is not proposed twice.

**Circularity pre-check** is the second gate, and it is the day's hardest-won
lesson: four candidate hypotheses were unmasked in one wave as the Zone
Postulate wearing different clothes (the `L = 1` residue count, `H″` at `m = 1`
and at `m = 2`, and any constant bound on `δ`). Every row carries a verdict on
the question *does the import's needed hypothesis, written honestly, imply the
postulate?*

- **CLEAN** — the payoff does not need a hypothesis of that strength. A finite
  computation, a derived constant, a published anchor, a wall address.
- **TPC-STRENGTH** — the hypothesis implies the postulate and is not known to be
  weaker. Legal to pursue only if there is an independent reason to think it
  softly provable, and the row must say what that reason is.
- **CIRCULAR** — the hypothesis is the postulate restated. Reject or re-scope.

**Expected payoff, by type.** Grade the type, not the probability.

- **THEOREM** — a proved statement the corpus did not have.
- **DERIVED-CONSTANT** — a number that was fitted becomes a number that is derived.
- **WALL-ADDRESS** — the obstruction restated in a convention that owns it, so
  the next attempt starts at the wall instead of walking to it.
- **PUBLISHED-ANCHOR** — the corpus's object located in print, or an
  owning-convention row for [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md).
- **CLOSURE** — a family of routes closed at once, with a mechanism.

**Cost** is the size of a first experiment shaped to four hours, not the size of
the mathematics.

**Verification legend on the theorem column.** **[SOURCED]** the statement was
read at a publisher page, an arXiv abstract page, or an authors' hosted full
text during map construction. **[SOURCED-BIB]** the bibliographic data was
verified but the statement itself was not opened. **[MEMORY]** written from
memory and not reached at any source. **[CONJECTURE-ONLY]** (added 2026-08-21
with row 14, the first wholly-conjectural source): every statement in the
source is conditional or heuristic — the row is priceable only as
PUBLISHED-ANCHOR and/or WALL-ADDRESS, and THEOREM / DERIVED-CONSTANT are
structurally unavailable to it. The per-row provenance is in
`history/staging/import-map-construction.md`.

## 0a. The regrade rule, and the prune rule

**Every landed import regrades its own row.** A row leaves UNTRIED the moment an
experiment runs against it, and its verdict is written in as LANDED with the
payoff that was actually banked, whether or not the route survived. The five
calibration rows are what that looks like.

**A row graded VOCABULARY-ONLY needs new structural evidence to re-enter.** Not
a new argument for why it would be nice, and not a different theorem from the
same field. A statement of the form "the moiré object is the foreign object,
here is the identification" is what re-entry costs.

**All thirteen original rows have run (the last landed 2026-08-20), so the map
is SPENT as a queue and stands as the calibration record.** The standing rule
for anything new: a future import gets a graded row here, with its circularity
pre-check, BEFORE it runs — never a run out of inspiration. Four rows have been
added under that rule and all four are resolved: row 14 landed 2026-08-21, rows
15 and 17 landed 2026-08-28, and row 16 is STALE — it was priced as an
experiment two in-house notes had already executed, which is the failure mode
the rule is meant to catch on the other side.

**The map is pruned on every visit, under the corpus's forward-only charter.**
A row whose route is closed leaves this file and becomes one line in
[OUTCOMES.md](OUTCOMES.md), pointing at its record. This file holds candidates and
the calibration set, never a history of candidates. *Amended 2026-08-20: a
closed row is retained here with its closing mechanism when the mechanism is
what stops the route being re-proposed; it still gets its OUTCOMES.md line.
Rows leave only when the line alone suffices.*

---

## 1. The calibration set: what a landed import looks like

Five ran, none moved the exponent, all five banked payoff (the twelve
landings since have not overturned any of this table's lessons; the
EXACT-IDENTITY reading in particular held at every one). Read this table
before grading a new row, because it is the only calibration the grades have.

| field | the theorem imported | moiré object | target hole | fit | circularity | payoff banked | status |
|---|---|---|---|---|---|---|---|
| probability in metric spaces | Dudley's entropy bound; Talagrand's generic chaining | the position supremum in the maximal law | the `ℓ¹ → ℓ²√log` wall | EXACT-IDENTITY | CLEAN | WALL-ADDRESS + DERIVED-CONSTANT + CLOSURE | **LANDED, route closed** |
| correlation inequalities | Suen's inequality; Janson RSA 13 (1998); the lopsided local lemma | the anchored `δ`, the kill events | Assumption A | STRONG-ANALOGY | the `δ` target came back **TPC-STRENGTH** | WALL-ADDRESS + PUBLISHED-ANCHOR + CLOSURE | **LANDED, target refuted** |
| point-process thinning | renewal thinning, `φ → qφ/(1−rφ)` | the fold as 2-of-`p` deletion | `H″` | EXACT-IDENTITY | `H″(m=2)` in moment form came back **CIRCULAR** | THEOREM (Fold Moment Identity) + DERIVED-CONSTANT | **LANDED, coupling closed** |
| max-plus algebra | tropical Perron–Frobenius; Fekete; Kingman | the copy theorem, the tile transfer matrix | TODO 1d, limit existence | EXACT-IDENTITY | constant-free CLEAN; with any constant **TPC-STRENGTH** | THEOREM (A5 Theorem A sharpened) + WALL-ADDRESS | **LANDED, 1d lead live** |
| B-free dynamics | Mirsky measures, tautness, heredity, complexity | the twin comb as a two-class sieve | Assumption A, `H″` | EXACT-IDENTITY at period scale | CLEAN | PUBLISHED-ANCHOR (an exclusion in print) + CLOSURE | **LANDED, route closed** |

Records: `history/staging/import-chaining.md`, `import-suen.md`,
`import-thinning.md`, `import-maxplus.md`, `import-bfree.md`.

**What the calibration set teaches, in three lines.** An EXACT-IDENTITY fit
predicts a banked payoff and predicts nothing about the route surviving: four of
five were exact fits and four of five routes closed. The circularity check fired
on three of five rows and would have saved most of the wasted motion had it run
first. And the payoff that recurred most was WALL-ADDRESS, which is the
cheapest thing an import produces and the one the corpus keeps using.

---

## 2. The live map

Ordered by expected payoff. All seventeen original rows have now run or been
overtaken: rows 1 to 13 landed by 2026-08-20, row 14 on 2026-08-21, rows 15 and
17 on 2026-08-28, and row 16 is stale, its experiment executed elsewhere before
the row could be scheduled. Rows 22 and 23 are the 2026-09-06 full-coefficient follow-ups and are outside the original-row counts. Rows 20 and 21 were added 2026-08-29 under §0a's
standing rule; both were priced by a recon pass and are resolved at recon grade,
not by an experiment, so neither is counted as a landing. Their numbers are the
ones their drafts carry, which leaves 18 and 19 reserved for
`history/staging/recon-0828-farfields.md` §5's two drafts, still unwritten. The
cost column is the price set BEFORE each run, kept for calibration; what a
resolved row actually took is in its status cell.

| # | field | the importable theorem, and where its statement lives | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | extreme value theory of scan statistics | Leadbetter's `D(u_n)`/`D′(u_n)` conditions and the extremal index; Berman's condition `r_h = o(1/log h)`; Berman, *Ann. Math. Statist.* 35 (1964) 502–516 **[SOURCED]**; Leadbetter–Lindgren–Rootzén, Springer 1983, chs. 3–4 **[SOURCED-BIB]** | `maxsum_m(T_x)`, the maximum of a moving sum over the cyclic gap word | the disputed `√m` factor (TODO 0c) | EXACT-IDENTITY | CLEAN | THEOREM + DERIVED-CONSTANT + PUBLISHED-ANCHOR | 4 h | **LANDED 2026-08-19** — kill criterion passed at T₂₃ and blind T₂₉ (H = 0.3216/0.3367 vs √m's 0.5); banked the complementary-window duality `maxsum_m + minsum_{D−m} = W`; the rule `H = 0.2205 + 0.0061 ln D` was pre-registered, validated one level out (T₂₉, 0.21 s.e.), and then KILLED TWICE blind — H(T₃₁) = 0.3460 misses its sealed band at 4.96 band-s.e. and H(T₃₇) = 0.3565 misses its own at 3.63 s.e., two engines, one verdict (`history/staging/scanstat2.md`, `scanstat-t37.md`); the DERIVED-CONSTANT claim is withdrawn — no single exponent should be quoted at all, since H is a grid-dependent summary of a curve (H(m≤16) − H(m≤64) > 0 at all six levels) and the ladder bends below every line (post-hoc six-level refit accommodates T₃₇ only at 2.20 s.e.); the tail factor √(2 ln D) and its one named repair √(2 ln θD) are REFUTED by magnitude and by sign (the measurement sits ABOVE the θ ≤ 1 ceiling at small m and widens with D); what stands: √m refuted at seven exact levels (0.2661 → 0.3565), the duality verified at all 1484 m, the crossover measured as a plateau with mirrored ramps, and the streaming extremal-index method; the row's own offered identity Σγ(k)=0 is TRUE and its conclusion REFUTED (permutation-invariance counterexample); `history/staging/import-scanstat.md`; adversarial pass: `history/staging/adversary-wave2.md`.  PRIOR-ART (2026-08-19, `history/staging/identifications-prior-art.md`): the duality is OWNED — it is the complement identity of the circular scan statistic (Cressie, J. Appl. Probab. 14 (1977); Naus; Wallenstein–Naus; GNW 2001 chs. 8–10, 17) — so no live sentence may present it as new; the exponent law H = a + b·ln D is NOVEL-SO-FAR, absent in the conditional-scan convention BY ARITHMETIC (exchangeability forces (D−m)/(D−1)), adjacent owner hyperuniformity / local number variance, where no sieved-set instance exists |
| 2 | constrained coding and symbolic dynamics | capacity `= log` of the Perron root of the constraint graph: Shannon, BSTJ 27 (1948) **[MEMORY]**, Lind–Marcus, CUP 1995, ch. 4 **[SOURCED-BIB]**; the longest-run law, Flajolet–Sedgewick Prop. V.2 **[SOURCED, verbatim]** | the alternation-legal window of the old gap word, which IS the per-fold `L` | `H″`, the window statistic's growth (TODO 0b) | EXACT-IDENTITY | TPC-STRENGTH at the target; CLEAN for the shape | DERIVED-CONSTANT + WALL-ADDRESS | 4 h | **LANDED 2026-08-19** — graph EXACT (strictly sofic, capacity ln 2 p-free, word count 2^{n+1}−1, PAIRS census reproduced 7/7; PRIOR-ART 2026-08-19: the strict-soficity and the capacity are REPRODUCTIONS of printed results — the language is the B = 1 charge constraint / alternate-mark-inversion, Marcus–Roth–Siegel §2.3 p. 47 and §3.2 p. 75 — what stays banked is the 3/p → 2/p rate correction, the weight-(1,1,2) multiplicity, and the wall address); the map's own rate formula KILLED by its own criterion (t = 2.69 on ln p) and the corrected first-moment law predicts exact L to a flat 1.50 ONLY with the measured letter weights — the shape claim dies with the f = 3/p input (f falls 170× where 3/p falls 16× — the corrected census makes the fall LARGER, `fdecay-deep.md` — so L ≍ polylog); `history/staging/import-sofic.md`; adversarial pass: `history/staging/adversary-wave2.md` |
| 3 | the repulsive lattice gas | Shearer's exact criterion, *Combinatorica* 5 (1985) 241–245 **[SOURCED-BIB]**, with its tightness; Scott–Sokal, *J. Stat. Phys.* 118 (2005) 1151–1261 **[SOURCED]**; Regts, *PTRF* 186 (2023) 621–641 **[SOURCED]** | the sieve's own inclusion–exclusion as a hard-core partition function; Bonferroni depth as cluster-expansion truncation | the local-lemma wall, the `4.2665 → 2` gap | EXACT-IDENTITY | CLEAN | CLOSURE (a family) + WALL-ADDRESS | 4 h | **LANDED 2026-08-19, route closed** — on the complete dependency graph Shearer's exact criterion IS the union bound (Scott–Sokal Ex. 3.1), so the wall is x = 13 as an identity, not x = 7; the family closes by three mechanisms — tightness for resampling oracles, chordality + mutual exclusivity for Moser–Tardos, and for Achlioptas–Iliopoulos the sequel's unconditional γ_i ≥ μ(f_i) (the record's atomicity lemma has an unproven hypothesis here; the closure survives without it, per the adversarial pass); Regts's zero-free polydisc reaches exactly to Mertens; banked θ_Shearer ≈ 1.41 (proven floor 2/√e = 1.21306), NOVEL-SO-FAR: the H* ladder is absent from OEIS at six indexings and no exactly-computed Shearer region on an arithmetic family exists in zbMATH/arXiv/OEIS full text, searched as "Shearer's region" (`history/staging/identifications-prior-art.md`; MathSciNet unreached); `history/staging/import-shearer.md`; adversarial pass: `history/staging/adversary-wave2.md` |
| 4 | Stein's method for Poisson approximation | Arratia–Goldstein–Gordon, *Ann. Probab.* 17 (1989) 9–25 **[SOURCED-BIB]**; Barbour–Holst–Janson, OUP 1992 **[SOURCED-BIB]** | multi-kill extinction in a fixed window; the mixed super-`W` joint deficit | the two-parameter extinction form; the `~3.8` joint-deficit constant | STRONG-ANALOGY | CLEAN for both constants; TPC-STRENGTH if pushed to `H″` | DERIVED-CONSTANT, twice | 4 h | **LANDED 2026-08-19, kill FIRED** — b₃ sits at 0.85–0.9998 of its own ceiling at every window (both objects share ONE uniform residue draw, so the non-neighbourhood reconstructs the indicator and Chen–Stein's error term is void; the same product-space hypothesis that closed rows 3/10); AGG formulas now [SOURCED, verbatim, via the authors' 1990 Statistical Science restatement, constant 1.4 real]; what the first-moment arithmetic banked anyway, relabelled: extinction A DERIVED at 2.2091e-2 vs the record's fitted 2.4312e-2 (c at 0.37σ, beats the geometric null both ways), and a zero-parameter candidate for the ~3.8 — 4·Σ_{x<q≤√W} q⁻², which then SPENT both blind tests the same night — @29 HIT at z = −0.90, @31 shows it is the last law standing and NOT exact (−0.45% offset), and "asymptote exactly 4" got no support from the measured ratio (`history/staging/xchan-at29.md`); NOT derived (b₃ is 73× the pair terms); `history/staging/import-stein.md` |
| 5 | spectral theory of automorphic forms | Deshouillers–Iwaniec, *Invent. Math.* 70 (1982) 219–288 **[SOURCED-BIB]**; Bombieri–Friedlander–Iwaniec, *Acta Math.* 156 (1986) 203–251 **[SOURCED-BIB]** | the `Σ_{e,a}|Θ_e(a)||S_H(a/e)|` triangle inequality | the `ℓ¹ → ℓ²√log` statement on `Θ_e(a)`'s arithmetic | STRONG-ANALOGY | TPC-STRENGTH | WALL-ADDRESS + PUBLISHED-ANCHOR | 4 h | **LANDED 2026-08-19, route closed** — the pre-registered kill line (ρ ≥ 0.5) does NOT fire (ρ = 0.4352 → 0.0645 at z = 13..41) and its inference was inverted (Cauchy–Schwarz makes the flat family the favourable case); what closes it: ‖Θ·S_H‖₂ = rms(R_H) exactly, so the ℓ¹→ℓ²√log conversion IS the sharp maximal law, with C_true = 0.5634–0.9215 BELOW C_crit = 1.358–2.225 — every true version is TPC-implying; banked: ‖Θ‖₁/‖Θ‖₂ grows 2.01 per added prime against S_sat's 2.0516 (the C^{π(z)} price, measured twice independently); `history/staging/import-l1l2.md`. Family read at source 2026-08-19 (`lemmaV-neighbours.md`): the closure stands on two independent grounds, and the same machine (DI 1982 Thms 9/11/12 via Maynard Lemma 6.12, sharpened by Pascadi Cor 18) is LIVE on the finer (h,d₁,d₂) index, where it fails on a fixed-smooth-profile hypothesis, not on strength — with both variables smooth either theorem would clear Lemma V outright |
| 6 | discrepancy theory | Spencer, *Trans. AMS* 289 (1985) 679–706 **[SOURCED]**; Banaszczyk, *RSA* 12 (1998) 351–360 **[SOURCED-BIB]**; Lovett–Meka, FOCS 2012 **[SOURCED-BIB]** | the same `(e,a)` sum | the same wall | STRONG-ANALOGY | CLEAN | CLOSURE + WALL-ADDRESS | 2 h | **CLOSED 2026-08-19 with row 5** — same conversion, same output, so the target's TPC-strength is independent of the machine; the arithmetic's signs already behave like a discrepancy theorem's output (C_true against 1); `history/staging/import-l1l2.md` |
| 7 | concentration on product spaces | Talagrand's convex distance inequality, *Publ. Math. IHÉS* 81 (1995) 73–205 **[SOURCED-BIB]**; the certifiable-function corollary, Molloy–Reed, Springer 2002, p. 234 **[SOURCED, verbatim via a citing paper]** | the anchored survivor deficit over the rotation ensemble | Assumption A's `ρ`; the `S(0)/S̄` variance face | STRONG-ANALOGY | **TPC-STRENGTH** (corrected 2026-08-20; priced CLEAN) | DERIVED-CONSTANT | 4 h | **LANDED 2026-08-20, closed with mechanism (confirmation producer queued)** — Talagrand's certifiable-function corollary genuinely EVADES the shared-draw mechanism that closed rows 3/4/10 (no dependency hypothesis at all; the row was a correctly distinct bet), and dies on the Lipschitz constant instead: the first scour prime's worst-case effect d(q₁) misses the theorem's own slack by a factor growing like √N (174 → 70,576 over x = 11..23), and under the published repair (Bruhn–Joos Lemma 9 with every benefit) the exponent is ≍ ln²x/x, below 1 at every computable level and FALLING — the McDiarmid failure again, closing McDiarmid/Azuma/Talagrand/Warnke/Kutin/Kim–Vu as a family; the struck-slot count IS certifiable at ℓ = 1 but both named targets are unreachable in principle (Assumption A is single-member vs ensemble, and a sharper tail bound moves the anchor the WRONG way; ρ is TPC-STRENGTH, correcting this row's circularity cell); DERIVED-CONSTANT withdrawn; banked: WALL-ADDRESS (d(q₁) as the single defeating coordinate) + PUBLISHED-ANCHOR (Banks–Ford–Tao arXiv:1908.08613 §5's five-checkpoint programme — Buchstab, large sieve + Bennett, Azuma on a normalised martingale — whose 'most delicate part', primes near log x, is exactly this coordinate, and whose four papers contain ZERO occurrences of Talagrand/McDiarmid/bounded differences, full texts scanned) + CLOSURE; §3-table numbers are scratchpad-grade until the pre-registered §9 producer runs; `history/staging/row7-recon.md` |
| 8 | Erdős covering systems, the distortion method | Balister–Bollobás–Morris–Sahasrabudhe–Tiba, *Invent. Math.* 228 (2022) 377–414, Thm 1.1 **[SOURCED, verbatim]**; Klein–Koukoulopoulos–Lemieux, *IJNT* 20 (2024) 471–479, Thm 3 **[SOURCED]** | the adversary's free translate `a_p` per prime | the `4.2665 → 2` gap, from the covering side | STRONG-ANALOGY | CLEAN | WALL-ADDRESS | 4 h | Priced with the field already dived ([covering-dive.md](covering-dive.md) §Q3); **LANDED 2026-08-19, closed with mechanism** — the engine speaks at TWO classes (BBMST Thm 3.1 carries no distinctness hypothesis; KKL pay s^k in the k-th moment), its economy Σ4/p² < 0.3646 is CONVERGENT and clears the Mertens wall — the first import to do so — and it dies on the AMBIENT: the measures live on a CRT product, so the certified window is at least a primorial, the only interval bridge is exponential in the progression count, and the whole yield G₂(x#) ≤ 6·2^{2(π(x)−2)}+6 beats only the period bound (loss vs the exact ladder 23× → 3.9e9×); the row was priced through Thm 1.1's divergent C, which is the wrong theorem — the criterion underneath prices convergent second moments; `history/staging/import-distortion.md` |
| 9 | the interpolation method | Bayati–Gamarnik–Tetali, *Ann. Probab.* 41 (2013) 4080–4115 **[SOURCED]** | the rotation ensemble's exponent, not `G₂` itself | TODO 1d, limit existence | STRONG-ANALOGY | CLEAN | THEOREM, for the model + WALL-ADDRESS | 4 h | **LANDED 2026-08-19, machine closed / reframing banked** — BGT closes on H1 (π(st)−π(s)−π(t) is never 0 past st = 25, max 12; fails for the rotation ensemble too), and the coordinate that DOES split (n = π(x)) normalises to +∞; banked: the identity D(s,t) = S(s)+S(t)−S(st) with S(x) = ln(x²/Ĝ(x)) — the exponent cancels, so the 1d candidate is a statement about the log correction alone; the TPC-implication is the single inequality ln C < S(x) at a ladder-known x (corrected 2026-08-20: the custody threshold is 1.3555 and certified frozen — the greedy floors cap the 47/53/59 windows below it — and the operative 1.3946 at b = 66 is TRUSTED-grade, moved by the adopted A144311 terms, not by enumeration; "each new ladder x raises the threshold" is refuted as a mechanism, `history/staging/fekete-1d.md` §3, `history/staging/redteam-0820-math.md` §1.2); BGT's own closing step IS de Bruijn–Erdős Thm 22, no longer needed since the measured defect reads BOUNDED once the step-sampling artifact is calibrated out and the bounded-defect Fekete lemma is now proven with (H-mono) discharged (`history/staging/fekete-1d.md` §5); `history/staging/import-interp.md` |
| 10 | algorithmic local lemma | Moser–Tardos, *JACM* 57 (2010) art. 11, Thm 1.2 **[SOURCED, verbatim]**; Harvey–Vondrák, FOCS 2015 **[SOURCED]**; Kolipaka–Szegedy, STOC 2011 **[SOURCED-BIB]** | the kill events of the primes `q ≤ x` on a window | the local-lemma wall | STRONG-ANALOGY | CLEAN | CLOSURE | 2 h | **CLOSED 2026-08-19 with row 3** — the causality digraph is complete here and the A–I escape needs one-prime moves, i.e. H ≥ x#; the binding inequality is the sequel's unconditional γ_i ≥ μ(f_i), NOT tightness and not the record's atomicity lemma (unproven hypothesis, per the adversarial pass); three mechanisms carry the family, `history/staging/import-shearer.md` §4 |
| 11 | combinatorial optimization | Călinescu–Chekuri–Pál–Vondrák, *SICOMP* 40 (2011) 1740–1766 **[SOURCED]**; Fisher–Nemhauser–Wolsey, *Math. Prog. Studies* 8 (1978) 73–87 **[SOURCED]** | the covering optimum: a monotone submodular coverage function over a partition matroid | a certified finite-level ceiling for `G₂` | EXACT-IDENTITY | CLEAN | WALL-ADDRESS | 1 h | **CLOSED 2026-08-19, dead on arithmetic** — the certificate cannot fire at any level, length, or constant: greedy's coverage is at least L(1 − ∏(1−2/p)) for EVERY L by an exact average-marginal argument (0.800 at x = 5 rising to 0.959 at x = 79 against a largest usable threshold of 0.704 falling to 0.641), and at L = G₂(x#) plain greedy reaches 1704 of 1710 at x = 79 against the optimum 1709, so the test must separate 1.000 from 0.9965 with a constant of 0.64; citation corrected — the (1 − 1/e) greedy bound is Nemhauser–Wolsey–Fisher PART I (Math. Prog. 14 (1978) 265–294) and only for a cardinality constraint, while FNW part II gives 1/2 for this instance's partition matroid, both 1978 papers demoted to [SOURCED-BIB], CCPV [SOURCED, verbatim]; `history/staging/row11-closure.md` |
| 12 | Diophantine approximation | the lonely runner conjecture; Cusick, *Aequationes Math.* 9 (1973) 165–170 **[SOURCED-BIB]**; Tao, *Contrib. Discrete Math.*, arXiv:1701.02048 **[SOURCED]** | one class per prime with fixed offsets, on the torus | calibration of the `4.2665 → 2` gap | STRONG-ANALOGY | CLEAN | PUBLISHED-ANCHOR | 2 h | **LANDED 2026-08-20, closed with mechanism** — the multi-obstacle generalisation is answered in print and the union bound is EXACTLY TIGHT there (Perarnau–Serra §11.3 quoting Schoenberg 1976 — Schoenberg himself NOT REACHED, read before any REFUTED row); the shifted LRC (our free a_p) is FALSE from n = 5 (Blanco–Criado–Santos 2026); and the field's own diagnosis of its sixty-year factor of 2 names PRIME velocities — our configuration — as the obstruction (Tao §1: the escape uses composite velocities' medium prime factors, which our moduli never have). The Birkhoff/BRS branch fails its hypotheses (rational rotation number, worst-possible continued fraction) AND is dominated 5454× by the corpus's own Level Ledger at x = 29, widening (q−2)/3 per fold. Payoff realised: WALL-ADDRESS, not the priced PUBLISHED-ANCHOR — except the LONELY RABBIT find (Cusick 1972/Schark 1974: the integer-time variant, closed form, extremal object a primorial wheel, constant e^{−2γ} Mertens — zero corpus mentions before this pass). Repairs: Bedert arXiv:2511.16636 is polynomial (n^{−5/3}, unrefereed); thirteen runner cases with six in twelve months, all computational; the every-window mismatch is Rifford's Timely LRC / Problem 8, open there too. `history/staging/row12-recon.md` |
| 13 | hypergraph covering | the Pippenger–Spencer covering theorem, *JCTA* 51 (1989) 24–42 **[SOURCED-BIB]**, and its FGKMT generalisation, *JAMS* 31 (2018) 65–105 **[SOURCED]** | the adversary's construction | the lower bound on `G₂` (the Now-queue's K–K item; its residual 1 — replacing a reading of a published proof with a theorem — is exactly this row's target, `covering-dive.md` §Q4) | STRONG-ANALOGY | CLEAN | THEOREM | 4 h | **LANDED 2026-08-20** — the covering theorem is class-count-agnostic (Theorem 3 / Cor 4 hypotheses read at page images: sizes, marginals, codegrees, a degree recursion — no arithmetic shape anywhere), and the two-class dictionary is EXACT at the hypothesis level (marginal exactly `2/q` at all 1.6M cells, empty exceptional set where (4.18) tolerates `#Q′/log₂²x`; codegree support on `q \| d(d−2)(d+2)`, FGKMT's own one-prime argument transferring verbatim); the priced THEOREM-against-K–K-residual is unreachable IN PRINCIPLE — Cor 4's C-window `(5/4)ln5` is missed by raw two-progression traces by a factor 1.97 at every scale (sup `C = 2ln(5/3)` under (4.17), confirmed at source by the adversarial pass), the `ln x` concentration boost that closes the gap is Maynard–Tao primality machinery with no two-class analogue in print, and (4.1) caps the depth at `10^m ≲ ln x`: with FGKMT's `r ≍ log x` that is `m ≍ log₃x` (leftover floor `1/log₂x`), and even with ideal bounded-size edges it is `m ≲ 0.434·log₂x` (leftover floor `(ln x)^{−log₁₀5} ≈ (ln x)^{−0.699}`) — still short of the one full log the Maier–Pomerance target needs and two logs short of the K–K reading, so the covering side and the K–K smooth-band side stay disjoint mechanisms, on that weaker floor (the record's own "never a ln-power / floor 1/log₂x" is corrected per `history/staging/redteam-0820-math.md` §3.2); banked: WALL-ADDRESS (the C-window arithmetic + the named missing two-class concentration input) + the theorem-provenance chain `G₂(x#) ≫ x ln x` from published ingredients only (K–K Cor 1 + Mertens + PNT + the CRT identity — above the free FGKMT transfer, below the unrefereed §4c reading), CONFIRMED by a dedicated adversarial pass — every ingredient verified at page image, the composition re-derived end to end, the finite cover independently rebuilt and replayed clean (`redteam-0820-math.md` §3.3–3.4) — and registered at `paper/proposals/prop-xlnx-lower-bound.md`; prereg committed alone (469aaa3, custody PROVABLE); N3's 99.9-pct toy-scale prediction failed and is recorded; `history/staging/import-hypergraph.md` |
| 14 | maximal-gap heuristics for prime k-tuples | **NO THEOREM EXISTS TO IMPORT — the framework is wholly conjectural.** Statements at page image: trend `G_c(x) ∼ (x/π_c(x))·(log π_c(x) + O_k(1))` (abstract, p. 1); upper trend `T̄_c(x) = ā_c(x)·log(x/ā_c(x))`, `ā_c(x) = (ϕ_{k,H}(q)/C_{k,H})·log^k x` (Defs 4–5, eqs (12), (14), pp. 7–8); **Generalized Cramér: "Almost all maximal gaps `G_c(p)` satisfy `G_c(p) < C_{k,H}^{−1} ϕ_{k,H}(q) log^{k+1} p`"** (eq (20), p. 8); **Generalized Shanks: the same right side as the asymptote** (eq (21), p. 8); trend conjecture, positive proportion in `[T_c, T̄_c]` and `G_c − T̄_c` changes sign infinitely often (eq (19), p. 8); Gumbel rescaling `h = (G_c − T_c)/a_c` "a possible limit law … an open question" (eq (48), p. 16; p. 24); `N_c(x) < C log x`, `C > k+1` (p. 24); `C_{2,H} = 2∏p(p−2)/(p−1)² ≈ 1.32032363` (p. 27, = 2C₂, ceiling coefficient `1/C_{2,H} = 0.7574` at `q = 2, ϕ = 1`). Kourbatov–Wolf, *Mathematics* 7 (2019) 400 = arXiv:1901.03785 **[SOURCED, verbatim, at page image; CONJECTURE-ONLY — the paper contains zero theorems]** | `Z₂(p)`'s envelope process — CUSTODY 3's identity `env(p)` = largest record wholly below `p′²`, EXACT at all 27,292 zones (`zonegap-01.js`), makes the OBJECT identification exact; the zone indexing is OURS (§2 below) | the staircase-correction model `zonegap-01.md` §7 names as not-reached; prereg band-setting for the next sweep; guard duty on measurements | fit: **EXACT-IDENTITY at the object, CONJECTURE-ONLY at every statement** | circularity: **SPLIT — CIRCULAR in any proof chain, CLEAN as instrument** (the binding cell, §3 below) | payoff: PUBLISHED-ANCHOR + WALL-ADDRESS (the almost-all quantifier wall) | 4 h | **LANDED 2026-08-21** — parameter-free calibration ran (`research/import-kw-01-calibrate.js`): `G/T̄ ∈ [0.78, 1.05]` from record 10 to record 82 (p ~ 6·10³ to 7·10¹⁶), records split 33/37/12 below-`T_c`/inside/above-`T̄`, 15 sign changes of `G − T̄`; 0 of 82 records breach eq (20), ceiling load creeps 0.544 → 0.685 → 0.759 by ladder thirds (the Shanks shape, → 1); **the recon's "their 0.7574 vs our 0.7504" is a RANGE ACCIDENT** (coefficient vs load; the same load statistic reads 0.8463 at record 75 and tends to 1 under their own eq (21)); band check `c3` vs `T̄(p²)/ln³p`: measured/trend 0.943, 0.904, 0.921, 0.867 (over-read 6–13%, `T_c` bracketing below); Gumbel sign-level consistent only (skew +0.588 on a correlated running-max path, not their ensemble); `history/staging/import-kw-zonegap.md` |
| 15 | the distribution of the fractional parts of `x/n` and `x/p` | Saffari–Vaughan II, *Ann. Inst. Fourier* **27** (1977) 1–30, DOI 10.5802/aif.649, **Theorem 10 (p. 7)** and **(1.27)**; `c_α` defined in part I (1.9), DOI 10.5802/aif.634 **[SOURCED, both re-fetched and hashed 2026-08-28]** | the branch phase `⌊W/q⌋ mod M_T`, which cap-36 reduces to `⌊M·{W'/q}⌋`, `W' = W/M_T` | the Skeleton Equidistribution Conjecture; TODO item 4 | **EXACT-IDENTITY at the marginal face**, confirmed at the page: `x_SV = W/M_T`, `y = √W`, `α = j/M_T`. The joint face has no theorem in the source | **SPLIT.** CLEAN where the theorem reaches, and measured to be worth `≤ 5.68%` of one branch there; the deep half stays UNRESOLVED, read at the lower rung as **suspected TPC-STRENGTH** | PUBLISHED-ANCHOR + WALL-ADDRESS; **no THEOREM**, the column struck because Theorem 10's lower range condition reads `M > W^{1/12}` and fails at every fixed `M` | 4 h, spent | **LANDED 2026-08-28, no route; prediction HIT** — the prereg's kill (any single covered branch above 10% of `Σ_T Σ_q Snum_T`) did not fire: the largest covered branch is 0.20% / 0.70% / 5.68% / 1.10% at @13, @17, @19, @23, covered aggregate `+0.2% / −0.9% / −8.1% / −0.3%`, and the containment `{M_T ≤ √W} ⊆ {M_T ≤ lB}` is strict, machine-checked on 1,133,872 pairs. The THEOREM column is struck rather than repriced: Theorem 10's range condition `x^{6/11+ε} < y ⩽ x` reads `W^{1/12} < M_T ≤ √W` under the dictionary, so no fixed-`M` asymptotic follows, no line of `natal-cap-36-skeleton-door.md` Measurement D is upgraded, and the `exp(−C(log x/log log x)^{1/3})` saving certifies no finite level; the surviving statement is also one marginal while the door is joint. The wall is sharper than the priced range-condition failure: `M_T > lB` is exactly `q > W/M_T`, so on the open side the phase never wraps and there is no fractional part left to equidistribute. `history/staging/import-fracparts.md`, `import-map-rows-15-17.md` |
| 16 | the theory of records | Rényi's record theorem: for an i.i.d. sequence with continuous marginal the record indicators are independent with `P(record at n) = 1/n`, so every record-TIME statistic is distribution-free (Rényi, *Théorie des éléments saillants d'une suite d'observations*, Aarhus colloquium 1962, 104–117 **[MEMORY]**; the same statement as developed in Arnold–Balakrishnan–Nagaraja, *Records*, Wiley 1998, DOI 10.1002/9781118150412 **[SOURCED-BIB]**, and restated in the survey Godrèche–Majumdar–Schehr, *J. Phys. A* **50** (2017) 333001, DOI 10.1088/1751-8121/aa71c1 **[SOURCED-BIB]**). The trended replacements: the `F^α` scheme, Deheuvels–Nevzorov, *J. Math. Sci.* **81** (1996) 2368–2378 and **88** (1998) 29–35, DOIs 10.1007/bf02362342 and 10.1007/bf02363259 **[SOURCED-BIB]**; Ballerini–Resnick, *Records from improving populations*, *J. Appl. Probab.* **22** (1985) 487–502, DOI 10.1017/s0021900200029272, and *Records in the presence of a linear trend*, *Adv. Appl. Probab.* **19** (1987) 801–828 **[SOURCED-BIB]** | the record ladder of `Z₂`, which `zonegap-03-model.md` §1 makes the whole of the object (`D ≡ 0`, so `Z₂ = env` exactly), read as a record process rather than as an envelope | **TODO Z5**, the 6.0% record-location deficit: `z` mean `−1.298` against a matched-null `−0.212 ± 0.244` and trend load `A = 0.9295` against `0.9895 ± 0.0182`, measured against one specific null (exponential gaps at `ābar = ln²x/(2C₂)`, Gumbel block maxima, 200 reps) | **STRONG-ANALOGY.** The theorems are for independent draws and the twin-gap sequence is neither independent nor stationary; the modification the row names is that the import is used to price the NULL, never the object | **CLEAN.** A record-time law is a statement about the observed prime record sequence and carries no bound on `G₂`; it cannot imply an every-window statement in either direction. The row-14 caution applies in its instrument form and is adopted verbatim: legitimate as an instrument, never as a link in a proof chain | WALL-ADDRESS only; the DERIVED-CONSTANT half is spent elsewhere and is not banked here | 4 h | **STALE.** The row proposes as an experiment a move that had already run: `record-location-null.md` executed the null side on 2026-08-28 and the 6.0% survives every correction available from the ensemble at `z` between −3.3 and −4.3, and `lit-kourbatov-shortfall.md` closed the prior-art half the same day by identifying the deficit with Kourbatov's published `b` (JIS 16 (2013) 13.5.2 §§5.1–5.2, `b ≈ 1.2597`, `μ* = −1.659` below `10^15`). Z5's null branch is closed; its mechanism branch is open. Both notes are outside output custody — no OUTPUT banner, figures hand-pasted — so their numbers stay in their files. **Updated 2026-08-29:** the null branch is not closed as flatly as this cell says: `measure-record-null2-0829.md` (inside output custody, unlike the two notes above) makes the lattice share a law-dependent bracket, 16.1% to 25.1% of b, and leaves the shape assumption behind every b reading open at 1.6 sigma |
| 17 | repulsive point processes, and hyperuniformity as the surviving half | the two-point inequality for Hermitian determinantal measures, `P(i,j∈S) = K_ii K_jj − \|K_ij\|² ≤ P(i)P(j)`, proven in house from the `2×2` determinant and anchored in Soshnikov, *Russian Math. Surveys* **55** (2000) 923–975 and Lyons, *Publ. Math. IHÉS* **98** (2003) 167–212 **[SOURCED at abstract, theorem numbers MEMORY]**; the positive half is the Torquato–Stillinger classification by the growth of the local number variance, Torquato, *Physics Reports* **745** (2018) 1–95, read at the author's arXiv full text and cited by ITS pages, not the journal's: arXiv:1801.06924 eq. (14) p. 10, §5.3 p. 23, §5.3.1 eq. (88) p. 25, §5.5 p. 28, eq. (252) p. 78 **[SOURCED at the page image; the published article is 95 pages on different pagination and these are not its page numbers]** | the tile `T_x ⊂ ℤ/W` as a stationary point process under a uniform translate, with pair correlation `g = W(d)` (`variance-note.md` Thm 1) and structure factor `S(ν) = δ∏_p f̂_p(ν_p)` (`varE-spectral.md` §1) both exact | the family of routes modelling the survivor process as repulsive, and the owning-convention row for the local number variance | **EXACT-IDENTITY at the statistic; NEGATIVE at the model**, and two-sided rather than one-sided | **CLEAN.** A pair-correlation evaluation at a fixed level is a finite computation | CLOSURE (a family, both signs, with a mechanism) + PUBLISHED-ANCHOR | 2 h | **LANDED 2026-08-28** — the prereg `g(6) > 2` at every level passed and the kill criterion (`g(d) > 1` at any `d`, any level) fired on the first line: `g` takes the value 0 or a value at least `2.3812`, nothing in `(0,1)`, at every level, with `d = 6` the exact minimiser and `g(6) = 6∏_{5≤p≤x}(1−4/(p−2)²) = 2.661728` at `x = 11`. The closure is two-sided: Hermitian determinantal, negatively-associated and strongly Rayleigh models die on `g(6) ≥ 2.38 > 1`, permanental and positively-associated models die on `g(2) = 0 < 1`. Two of the row's own claims were corrected by its run — the extension to one-dimensional Gibbs and Coulomb gases is WITHDRAWN (a repulsive pair potential does not force `g ≤ 1` at finite density), and the reading of the sub-Poisson `Var/E` as hyperuniformity is DEMOTED: every fixed level is class I only because it is periodic, exact and empty, while along the diagonal family `L = y^u` the variance is linear in `L` with ratio 0.152 to 0.396 and no member approaches a hyperuniform limit, so the word for the family is sub-Poisson. Also banked: the distance correction to `import-map-construction.md` §1 and the `Var/E = Σ_{ν≠0} S(ν)K_L(ν/M)` identity. Nothing about the conjecture. `history/staging/import-repulsive.md`; producer `history/staging/import-repulsive.js` |
| 20 | extremal majorants and minorants: Beurling, Selberg, Vaaler, Graham-Vaaler, Carneiro-Littmann, and the Hilbert-space reformulations | Selberg's majorant `C_E(z) = ½{B(β − z) + B(z − α)}`, entire of exponential type `2π`, with `χ_E ≤ C_E` everywhere, transform continuous and supported on `[−1, 1]`, and the identity `∫(C_E − χ_E) = 1`; and the large sieve constant it establishes, `A(N, δ) = N − 1 + δ^{-1}`, sharp. Vaaler, *Some extremal functions in Fourier analysis*, *Bull. Amer. Math. Soc.* **12** (1985) 183-216, §1 pp. 183-185 **[SOURCED, verbatim at the AMS free full text, sha256 in the record's §6]** | the Lemma V sawtooth `r_{d₁,d₂}(x)` and its frequency set `{a/e : e \| P(z), e ≤ D₁D₂}` | the position quantifier on `R_H` | **STRONG-ANALOGY at the object**, and blocked arithmetically at the working point before any of the mathematics is used | **SPLIT.** CLEAN at the mean-square form, which is the form Lemma V is written in and which is already PROVEN and already known useless for `G₂` (`sift-limit-attack.md` §7e, the almost-all exponent is 0). **TPC-STRENGTH** at the sup form, which is what the corpus's working point actually assumes and which inherits `attack-wrongdirection-audit.md` §2 item 6, `need_sharp/z²` measured 0.4913 to 0.6144 at `z = 13..43` | CLOSURE with mechanism, for the family; plus a PUBLISHED-ANCHOR line owed to `SEARCH-CONVENTIONS.md`, the owning convention for the corpus's L4 Fejér-mass identity being extremal majorants and minorants. No THEOREM, no DERIVED-CONSTANT | 0.75 h | **PRICED 2026-08-29, resolved at recon grade, no experiment run.** The deciding arithmetic: Selberg's construction pays exactly `1/δ` at type `2πδ`, removing one modulus from the Lemma V frequency set needs `δ < 1/(D₁D₂)`, and at the operative `θ_total = 2s/u ≈ 2.4` to `2.8` that puts the error above `D₁D₂ = z^{2s} > H`, i.e. above the window itself. That step is **[DERIVED HERE]** hand arithmetic on a SOURCED identity and a CITED working point, it has had no second reader, and its falsification check (a producer printing `D₁D₂/H` and `1/δ` beside `H/m`) has **NOT** run; if it failed the row would reopen at the mean-square form only, never at the sup form. Two further blocks stand behind it and do not depend on it: the family's payoff is the `ℓ² → ℓ²` large sieve constant while the wall's address is `ℓ¹ → ℓ²`, which is the ground `import-map-construction.md` line 72 already rejected the large sieve on; and `sift-limit-attack.md` §7e holds the Fejér mass exactly, `Σ_{a ≢ 0 mod e} F_H(a/e) = h(e − h)`, so the import offers an inequality where an equality stands, and it does not touch the absolute-value step that kills the `u_sup` route at `C^{π(z)}`, `C ≈ 2.05`. **The CLOSURE is graded no higher than a family already partly resident**, per the red team: the Lemma V remainder is itself Vaaler-completed (`lemmaV-neighbours.md`, and `smoothness-front.md` §3.3 reading Vaaler 1985 through Graham-Kolesnik Theorem A.6), and `smoothness-front.md`'s own verdict already prices that member, "the Vaaler coefficients clear Pascadi's condition maximally but buy nothing". What is new is the Selberg majorant of an interval indicator and the `1/δ` arithmetic, not the field. `history/staging/recon-0829-farfields2.md` §3c, §5, §7; red team `history/staging/redteam-0829-measure-c.md` §4c, §5g |
| 21 | the eigenstructure of the gap transfer matrix, in the cycles-of-gaps convention | `M_J = R · Λ · L` with `LR = I`, upper-triangular entries of `R` and `L` binomial and independent of the prime, and eigenvalues `a_{kj} = ∏_{q=17}^{p_k} (q − j − 1)/(q − 2)` with `a_{kj} > a_{k,j+1}` and `a_{kj} → 0`; Table 1 prints eight values at `p_k = 999,999,999,989` from `p₀ = 13`, `a_{k2} = 0.10206751799779` first among them, and the authors state that convergence of the gap ratios is governed by `a_{k2}` and is slow. Holt and Rudd, *Eratosthenes sieve and the gaps between primes*, arXiv:1408.6002 §5.1, Table 1 and the Figure 3 caption **[SOURCED, verbatim at the arXiv full text, sha256 in the record's §6]** | the fold's histogram operator, `a3-09-histogram-operator.md`, whose own ledger already records it as a rediscovery of Holt-Rudd §5 | none reached; the row is an anchor and a wall address and was never priced as a target | **EXACT-IDENTITY at the operator**, and wrong precision and wrong functional at the conclusion | **CLEAN.** An eigenvalue of a finite matrix with an explicit product formula carries no hypothesis of postulate strength, and it carries no conclusion about the anchor either | PUBLISHED-ANCHOR, which is the strongest available here, plus a WALL-ADDRESS; and a `SEARCH-CONVENTIONS.md` row owed, "cycles of gaps" and "eigenstructure of `M_J`". No THEOREM, no DERIVED-CONSTANT | 1 h | **PRICED 2026-08-29, resolved at recon grade; the novelty-check producer has NOT been written.** Three deciding facts, none of which a sharper analysis narrows. The spectral gap is `1 − a₂ = 1 − 2.82/ln z + o(1/ln z)`, a polylogarithmic rate against killer 2's threshold `ε < 1/W = e^{−(1+o(1))x}` (`attack-wrongdirection-audit.md` §1 Axis C). The functional `a₂` governs is the population ratio `w_{g,1}(∞) = N_g/N₂`, a first-moment count of gaps of each bounded size, and `G₂` is a maximum. And `M_J` is restricted to spans `\|s\| < 2p` throughout, so `G₂` is outside its state space, while `J → ∞` is not a limit of this eigenstructure because `(q − j − 1)/(q − 2)` turns negative for `j ≥ q − 1`. **The anchor is graded below the recon's first draft, and the correction is the red team's:** `history/staging/lit-pdf-holt-rudd.md` line 259 already carries, verbatim and page-numbered, the per-prime eigenvalue `a_j = (p − j − 1)/(p − 2)` for the bidiagonal `M_J`, so what this row adds to the corpus is the product-over-primes closed form, the printed numerical values and the rate, beside the binomial eigenvectors `PRIOR-ART.md` had already attributed (`redteam-0829-measure-c.md` §1h row 1). The rate constant is **[SCRATCHPAD-GRADE]**: `a₂ · ln z` reads 2.816534, 2.819348, 2.820118, 2.820203 at `z = 10⁴` to `10⁷` from a scratchpad producer, reproduced digit for digit on an independent sieve by the red team (`redteam-0829-measure-c.md` §1h row 5), with the extrapolation to `p_k` matching the printed `a_{k2}` at a relative `1.8 × 10⁻⁵`; two measurements, no embedded producer, and nothing in the row's verdict rests on the constant rather than on the `1/ln z` shape, which is Mertens. `history/staging/recon-0829-farfields2.md` §3e, §5, §6, §7 |
| 22 | two-parameter quadratic sieve / Barban–Vehov mean square | Graham estimate, integer case: Chen An [2206.10104v1](https://arxiv.org/html/2206.10104v1), (1.1) and Theorem 1.1, primary statement read | logarithmically averaged full corner coefficient after Mobius inversion | unsigned full-coefficient energy before signed correlation | EXACT-IDENTITY for the smoothed cofactor weight | CLEAN for the auxiliary norm | DERIVED bound, not a twin margin | analytic derivation and bounded algebra check; not a timed census | **LANDED 2026-09-06**: [corner-coefficient-energy.md](corner-coefficient-energy.md) gives O_eta(x log x) squared norms and product bound, retaining all branches; short-endpoint range repaired explicitly. Signed saving and complement OPEN; row 23 prices the sharp transition norm. The easy quadratic-main-term O(D2^2) remainder fails at these long cutoffs. Imported proof not independently re-proved. |
| 23 | sharp truncated Mobius divisor sums | de la Breteche–Dress–Tenenbaum [author PDF](https://tenenb.perso.math.cnrs.fr/PPP/Sxz.pdf), (1.5), Theorem 1.1; full source read | full sharp corner after inversion | long-cutoff finite mean square | EXACT-IDENTITY for the coefficient | CLEAN for one-point norms | DERIVED bounds, not a signed margin | analytic derivation and exact finite identities | **LANDED 2026-09-06**: [sharp-corner-transition.md](sharp-corner-transition.md) prices sharp norms and refutes negligible L2 smoothing transfer for sufficiently small fixed eta; signed correlation OPEN. |

**Counts (recounted 2026-08-28; the seventeen original rows only, since rows 20 and 21 were added 2026-08-29 at recon grade and are not counted as landings; their own cells are STRONG-ANALOGY/SPLIT and EXACT-IDENTITY/CLEAN).** Seventeen rows, none UNTRIED: fourteen
resolved by 2026-08-21, rows 15 and 17 landed 2026-08-28, and row 16 is STALE,
priced as an experiment that had already run in house. Fits: seven
EXACT-IDENTITY (row 14 at the object only, row 15 at the marginal face only,
row 17 at the statistic only), ten STRONG-ANALOGY, zero VOCABULARY-ONLY (twelve
rejected at that grade and listed with reasons in
`history/staging/import-map-construction.md`, one of which — determinantal
point processes — is not rejected but promoted to row 17). Circularity as now
graded, one grade per row by the grade its cell leads with: twelve CLEAN, three
TPC-STRENGTH (rows 2, 5, 7), two SPLIT (rows 14 and 15), which is the
seventeen; no row is graded CIRCULAR outright, though row 14's split half is
CIRCULAR in any proof chain. Four cells are split rather than single, and rows
2 and 4 are counted under the grade they lead with: rows 2, 4, 14 and 15.
Payoff, counted as the payoff column now reads: three THEOREM (rows 1, 9, 13),
four DERIVED-CONSTANT (rows 1, 2, 4, 7), ten WALL-ADDRESS, six
PUBLISHED-ANCHOR, four CLOSURE. Row 15 was priced with a THEOREM before the
range exponent was read at the page image, so the as-first-priced THEOREM count
was four; row 16's payoff cell names DERIVED-CONSTANT only to say it is not
banked here, and it is not counted.
Payoff AS BANKED differs again, and the difference is the point: rows 1 and 7
withdrew DERIVED-CONSTANT, row 12 banked WALL-ADDRESS instead of the priced
PUBLISHED-ANCHOR, row 7 banked a PUBLISHED-ANCHOR it was not priced for, row 15
lost its THEOREM to a misread range exponent, and row 16 banked only the wall
address its two executing notes left standing.

---

## 3. The rows, one paragraph each

### 1. Extreme value theory of scan statistics

`maxsum_m(T_x) = max_i (g_i + … + g_{i+m−1})` is the maximum of a moving sum,
and the owning convention for that object is **scan statistic** in probability
and **MOSUM** in change-point analysis, neither of which appears anywhere in
this corpus. Leadbetter's `D(u_n)`/`D′(u_n)` machinery applies directly, and it
says something specific about the corpus's own dispute: `D′` fails at lags
below `m`, because consecutive windows share `m−1` summands, so the extremal
index is below 1, but the extremal index enters only as `+ln θ/√(2 ln D)`, which
is lower order. **Both halves of the form break ON THE CYCLIC TILE FAMILY — `sd_m = σ√m` at seven levels, and the tail factor `√(2 ln D)` by magnitude and by sign (`history/staging/scanstat2.md`; the head/anchored window setting is a different object with its own constants, per U-FRAME's no-transfer rule).md` §5 measured it (`0.2661, 0.2804, 0.3001, 0.3216, 0.3367, 0.3460,
0.3565` against `0.5` over seven exact levels, each more than eight standard
errors low; `history/staging/scanstat2.md`, `scanstat-t37.md`). There is a
one-line identity offered during map construction, now ADJUDICATED (2026-08-19,
`history/staging/import-scanstat.md` §1): the identity `Σ_{k=0}^{D−1} γ(k) = 0`
is TRUE and trivial (it is Parseval at frequency zero), and its offered
conclusion `Var(S_m)/m → 0` is REFUTED — the hypothesis is invariant under
every permutation of the gap word while `sd_m` is not, and a reshuffled real
tile measures exponent 0.499 against the real word's 0.300. What the identity
actually proves is the complementary-window duality
`maxsum_m + minsum_{D−m} = W`, `sd_m = sd_{D−m}`, which forces any growth law
to turn over at `m = D/2`; the sub-0.5 exponent is real, level-dependent, and
its explanation still needs a decay scale the identity does not supply. Two independent recon lines during construction
disagreed about where the exponent is heading — one read the rise `0.266 → 0.322`
with tile size as a finite-size crossover toward `0.5`, the other argued
periodicity forces it to `0` once `m` approaches `D` — and the identity above is
what reconciles them, so the honest instruction is to fit `H` as a function of
`D` and `m` rather than quote one number. Circularity is CLEAN because
`a3-05-bound-L.md` §7's floor already says a maxsum law does not deliver the
u-frame; the payoff is the object.

### 2. Constrained coding and symbolic dynamics

The Alternation Lemma of [kappa-not-L.md](kappa-not-L.md) is literally a
right-resolving two-state labelled graph: from residue `a` only gaps `≡ 0` or
`−2` are legal, from `a−2` only `0` or `+2`, so the class word is a walk on two
states and the legal language is a sofic shift. That is an exact identification,
not a resemblance, and it gives the per-fold `L` a name in a mature field. The
honest caution is what capacity theory does *not* give: it bounds the count of
legal words of length `n` by `λⁿ`, never the length of the longest legal window,
and no theorem was found bounding the longest word of a sofic shift that is also
a factor of a given periodic word. What transfers instead is the first-moment
composition with the longest-run law, and the shape it predicts is the row's
whole value. The qualifying-gap density is exactly `3` residues in `p`
([kappa-not-L.md](kappa-not-L.md), three progressions of modulus `6p` with
weights 1, 1, 2), and `ln D = Σ_{q ≤ p} ln(q−2) ≍ p` by Chebyshev, so the
first-moment longest legal run WOULD sit at `≍ p/ln p` — IF the qualifying
fraction were `3/p`. **The experiment killed exactly that input (LANDED
2026-08-19, `history/staging/import-sofic.md`): the map's rate formula fails
its own pre-registered flatness test (t = 2.69), the corrected law
`ln(pD)/ln(p/2)` predicts exact L to a flat factor 1.50 only when fed the
MEASURED letter weights, and the measured qualifying fraction falls 170×
(more, after the census's shift-alias correction, `fdecay-deep.md`)
where 3/p falls 16× — so the first-moment prediction is `L ≍ polylog`, a
DOWNGRADE of U-FRAME §12's reading, not an advance on §5a's requirement.**
The map's constant arithmetic was also wrong (it substituted `p` for
`ln D(T₉₇) = 79.77`; the corrected factor was 3.2 to 5.2, before the shape
died). What the row banked instead: the graph is exact and strictly sofic,
capacity `ln 2` independent of `p`, legal-word count `2^{n+1}−1`, the
weight-(1,1,2) multiplicity derived, and the wall restated — `L` is governed
entirely by the letter measure, which is `f-decays`' problem, not symbolic
dynamics'. Circularity: proving `L ≤ c p/ln p`
unconditionally closes the u-frame chain and therefore implies the postulate, so
the target is TPC-STRENGTH and legal only as the corpus's declared live route;
the CLEAN payoff is the derivation of the shape and of A5's constant, which
needs no such hypothesis. Price the row against
[gate-multiplies.md](gate-multiplies.md) §8 first: even a perfect `L` does not
save the tile chain below `p ≈ 800`.

### 3. The repulsive lattice gas, and Shearer's tightness

`history/staging/import-suen.md` §8 located the local-lemma wall at the
**admissible conditioning-set modulus**: the lopsided hypothesis is quantified
over all subsets `S` of non-neighbours, which needs the window to equidistribute
modulo `∏_{q∈S} q = x#`, while the pairwise-drawn graph is empty already at
`H = x²`. Scott–Sokal is the theorem that makes that address canonical — the
local lemma's conclusion holds for a dependency graph and probabilities **if and
only if** the independent-set polynomial is non-vanishing in the corresponding
polydisc — and Shearer's criterion is the exact threshold, with a tightness
clause that decides a whole family at once: outside Shearer's region there is a
probability space realising the same graph and the same probabilities in which
the good event has probability zero. **Given only the dependency graph and the
marginals, the set-wise quantifier is not removable.** That closes entropy
compression, Moser–Tardos and the resampling-oracle programme as a class, which
is row 10. What stays live is the other direction: Regts's theorem that absence
of complex zeros implies strong spatial mixing, which would substitute
quantitative decoupling between distant prime constraints for the joint
independence the product-space local lemma gets free. The first thing to compute
is whether the zero-free radius for the corpus's own structure reaches past the
Mertens threshold `Σ 2/q < 1`, which is where six independent routes already
land ([sift-limit-attack.md](sift-limit-attack.md) §7).

### 4. Stein's method for Poisson approximation

Two named constants in [../TODO.md](../TODO.md) are fitted and want deriving:
the extinction law's two-parameter form, and the `~3.8` multiple of the forced
mutual-exclusion scale that the mixed super-`W` joint deficit sits at. Both are
first-moment objects with a pair correction, which is exactly the shape
Arratia–Goldstein–Gordon's `b₁`, `b₂`, `b₃` decomposition prices, and the pair
sum the method needs is already proven in this corpus as the Fold Moment
Identity's `Ψ`. The fit is STRONG-ANALOGY rather than exact because the kill
events are not indicators of a single independent field, and `b₃` is only zero
when the neighbourhood is a genuine independence neighbourhood, which for kills
mod `q` it is not below the CRT scale. Circularity needs care and the row states
where the line is: a Poisson approximation for kills in a window at `λm̄ ≥ 1`
would be `H″`, and `H″` in moment form is already recorded as implying the
postulate; the two constants are finite-window objects and are CLEAN. Take the
constants and stop there.

### 5. Spectral theory of automorphic forms

`history/staging/import-chaining.md` §4.3 relocated the maximal law's loss off
the position supremum and onto the `(e,a)` sum over moduli and frequencies, and
named the missing statement: an `ℓ¹ → ℓ²√log` bound on the arithmetic of
`Θ_e(a)`. Map construction searched for a theorem of that shape in four
conventions and found one family only. The large sieve is `ℓ² → ℓ²` and does not
have the shape; Gallagher's larger sieve is a different object; `ℓ²`-decoupling
requires a positive-definite second fundamental form and carries an `N^ε` loss
that would eat the saving even if the geometry were there; Weil and Deligne give
pointwise square-root bounds whose sum is still `ℓ¹`. **The one published
machine that extracts cancellation from an `ℓ¹` sum over moduli is spectral:
Deshouillers–Iwaniec via the Kuznetsov formula, as used in
Bombieri–Friedlander–Iwaniec.** Its saving is a power of the modulus in a
restricted range rather than a clean `√log`, so this row is an address and an
anchor rather than a route, and the sharp maximal law it would serve is
TPC-implying (`history/staging/phase1-T4-maximal-law.md` §2). The cheap and
decisive first move does not need any of that machinery: measure whether
`Θ_e(a)` exhibits square-root cancellation across the family at all.

### 6. Discrepancy theory

Spencer's theorem is the canonical statement that removes exactly a `√log` from
a union bound over a family, in the author's own words improving "the basic
probabilistic method with which `K = c(ln n)^{1/2}`", and that is the wall's
exact shape. The row is nonetheless graded STRONG-ANALOGY and priced as a
closure, because the failing step is named and is not repairable inside the
field: **every theorem in this family asserts the existence of a good sign
vector, and the corpus does not get to choose its signs — arithmetic hands them
over.** Banaszczyk, Bansal and Lovett–Meka all inherit that hypothesis. Two
hours spent writing this down properly is two hours that stops the family being
re-proposed, and the same paragraph disposes of decoupling and of the large
sieve for the same wall.

### 7. Concentration on product spaces

McDiarmid's bounded-differences inequality lost to Chebyshev on this object once
already (`paper/anchored-note.md`), and the reason is the variance proxy: `n`
coordinates each with a bounded effect. Talagrand's convex distance inequality
has a different exposure, and the certifiable-function corollary is the one to
reach for, because the survivor deficit over the rotation ensemble is exactly a
certifiable statistic — a witness that the count is at least `k` is a set of
primes, of size proportional to `k`, not a reading of all `π(x)` coordinates.
The variance proxy becomes `c²ℓ·E[X]` rather than `n`. The caveat belongs in the
row rather than in a footnote: `c` is the worst-case effect of one prime's class
choice, and if one prime can swing the statistic hard then `c` blows up and this
loses to Chebyshev for the same reason McDiarmid did. The published repair for
exactly that failure is the exceptional-set variant in Bruhn–Joos, and the
experiment should price `c` before anything else. *Outcome (2026-08-20, `history/staging/row7-recon.md`): it did — d(q₁) misses the theorem's own slack by a factor growing like √N, the published repair's exponent is ≍ ln²x/x and falling, and the family closed.*

### 8. Erdős covering systems, the distortion method

The corpus has already dived this field ([covering-dive.md](covering-dive.md)
§3) and recorded the negative: no covering-systems result bounds the length of a
finite interval coverable by two classes per prime at polynomial scale, searched
in the covering-systems convention and tabled in
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md) §3. *Outcome (2026-08-19,
`history/staging/import-distortion.md`): the technique was tried — it speaks
at two classes and dies on the CRT ambient; the whole yield is
G₂ ≤ 6·2^{2(π(x)−2)}+6, beating only the period bound.* BBMST's distortion method is the only
machinery found anywhere in this map that already handles **an adversary
choosing the shifts**, without paying a union bound, by tracking the uncovered
set's measure through the CRT tower prime by prime. Two hypotheses block a
direct application and the row states both: the theorem needs distinct moduli
while two classes mod `p` is multiplicity 2, and the corpus's
`C = Σ µ(p)·2/p` diverges like `2 lnln x`, so `e^{−4C}/2` degrades to about
`(log x)^{−8}` — a density, and density says nothing about the longest run.
Klein–Koukoulopoulos–Lemieux handle multiplicity `s` by a modification of the
same method, which is the half of the repair that exists.

### 9. The interpolation method

TODO 1d wants limit existence for the exponent without a numerical value,
because a value would be too strong. Bayati–Gamarnik–Tetali is the canonical
machine for exactly that: it establishes scaling limits for combinatorial optima
without computing them. Its hypotheses are the row's whole content, and the
third one is fatal in the obvious form — it needs a **random ensemble with
exchangeable hyperedges**, which is what manufactures the composition law that
`history/staging/import-maxplus.md` §3 showed the fold does not have. So the
method cannot touch `G₂(x#)` directly. What it can touch is the rotation
ensemble, which is a genuine random model this corpus already uses, and a proof
that the ensemble's exponent has a limit is a theorem about an object the
programme quotes. Circularity is CLEAN because limit existence carries no
number.

### 10. Algorithmic local lemma

Kept as its own row because it was an explicit seed and because the pricing is
worth recording rather than re-deriving. Moser–Tardos does not weaken the
set-wise quantifier; it buys it with product structure, requiring every event to
be determined by a subset of mutually independent variables with dependency
equal to shared variables. Applied here that asks the window to be a product
space over the residues mod every `q ≤ x`, which is `H ≥ x#` and not `H = x²` —
the same address in different coordinates. Harvey–Vondrák's resampling oracles
need lopsided association, which quantifies over all monotone events on the
non-neighbours and is strictly stronger than all subsets. Kolipaka–Szegedy show
Moser–Tardos is efficient exactly up to Shearer's bound, which by row 3 is where
the quantifier becomes unremovable. One sub-item was not verified during
construction and is the only reason this row is not simply closed:
Achlioptas–Iliopoulos claim a framework that "works when the underlying state
space is entirely unstructured", and their main theorem's hypotheses were not
opened. *Outcome (2026-08-19/20): it IS now closed — A–I's hypotheses were opened, the causality digraph is complete here, and the binding inequality is the sequel's unconditional γ_i ≥ μ(f_i); `history/staging/import-shearer.md` §4.*

### 11. Combinatorial optimization

The identification is exact and pleasant: coverage of a fixed interval `[1, L]`
is a monotone submodular function, choosing one pair `{a_p, a_p−2}` per prime is a
partition matroid, and `[1, L]` is coverable if and only if the optimum equals
`L`. A `(1 − 1/e)` guarantee would then certify non-coverability whenever an
algorithm's coverage falls below `0.632 L`, turning the greedy oracle — which
[OUTCOMES.md](OUTCOMES.md) records as exact to `x ≈ 53` and unreliable beyond —
into a certified upper bound at levels past A144311's `x = 79`. **The row is
dead on arithmetic and is carried so that it is not proposed again.** The
achievable coverage of a long interval is `1 − ∏_{3≤p≤x}(1−2/p)`, which reads
`0.800` at `x = 5` and rises to `0.959` at `x = 79`. It never falls below
`0.632` at any level, so the certificate cannot fire anywhere, and the reason is
structural: the problem asks to distinguish 100% coverage from 98% coverage, and
a constant-factor approximation guarantee cannot see that difference. One hour
writes it up as a wall address.

### 12. Diophantine approximation

The kinship with the lonely runner problem is real rather than verbal: both ask
that a line in a torus miss a union of axis-parallel obstacles, and both sit in
the regime where the total obstacle measure exceeds 1 so that union bounds fail.
Three mismatches stop it being an instance, and they are worth having written
down: the lonely runner has no shifts, since all runners start together, while
the adversary here picks `a_p` freely; the lonely runner asks for one good time
while the postulate asks that every window of `H` contain a survivor; and the
whole toolkit is calibrated to small `n`, with thirteen cases settled in sixty
years and the general lower bound improved only by a `1/(n² (lnln n)²)` nudge.
**The value is calibration, and it is worth two hours: the one-class-per-modulus
version of this corpus's covering question is a famous open problem with a
sixty-year record of case-by-case progress, which is independent evidence about
what `4. *Outcome (2026-08-20, `history/staging/row12-recon.md`): spent — WALL-ADDRESS realised (the field's own stuck factor of 2 is caused by prime velocities; the multi-obstacle version is answered with the union bound exactly tight), plus the Lonely Rabbit published anchor.*2665 → 2` will not come from.**

### 13. Hypergraph covering

The corpus already cites the Pippenger–Spencer covering theorem once, inside
[covering-dive.md](covering-dive.md) §4.1 as the ingredient behind FGKMT's lower
bound for one class per prime. What is untried is the two-class version as a
construction: FGKMT's stated main new ingredient is a generalisation of
Pippenger–Spencer used to cover an interval by one residue class per prime, and
the corpus's own live lower bound is a transfer of Kalmynin–Konyagin that
`covering-dive.md` §Q4 flags as a reading of a published proof rather than a
consequence of a published theorem. A two-class Pippenger–Spencer would replace
that reading with a theorem. Circularity is CLEAN in the strongest sense: no
lower bound on `G₂` can imply the postulate, which is an upper-bound statement.

*Outcome (2026-08-20, `history/staging/import-hypergraph.md`, adversarial pass
`history/staging/redteam-0820-math.md` §3): the priced THEOREM against the K–K
residual was mispriced — the covering engine and the K–K smooth-band reading
live on disjoint mechanisms at disjoint scales — but the first-moment half of
the dictionary landed the row's real prize: the theorem-provenance chain
`G₂(x#) ≫ x ln x` from published ingredients only, adversary-confirmed, now
registered at `paper/proposals/prop-xlnx-lower-bound.md`. Status cell above
carries the corrected yield-cap floor.*

---

## 4. The top five: what was pre-registered and what happened

Rows 1, 2, 3, 4 and 5. Each has a three-sentence experiment below: the mapping,
what is pre-registered, and what kills it. Pre-registration is not optional here
and the reason is on the record: `G₂(41#) = 546` meant something only because
its window was written down first.

**Row 1, scan statistics.** *Mapping:* identify `maxsum_m` with the scan
statistic of the cyclic gap word, check `D(u_n)` directly on `T_13..T_23`, and
prove or refute the identity `Σ_k γ(k) = 0` and its consequence
`Var(S_m)/m → 0`. *Pre-registration:* fit `sd_m = c·m^{H}` with `H` allowed to
depend on `D` on `T_13..T_19`, and write down the predicted `maxsum_m` at `T_23`
for `m = 1, 2, 4, 8, 16, 32, 64` before computing it. *Kill:* if the
two-parameter fit does not beat the one-parameter `σ√m` law out of sample at
`T_23` by more than its own error bar, the correction is measured but not
established, and the row closes with the identity as its only payoff. *Outcome (2026-08-19/20, `history/staging/import-scanstat.md`, `scanstat2.md`, `scanstat-t37.md`): the kill criterion passed at T₂₃ and blind T₂₉; the offered identity was TRUE and its conclusion REFUTED; and the rule the run derived was itself killed twice blind at T₃₁ and T₃₇ — the banked payoff is the duality, the seven-level refutation of √m, and the method.*

**Row 2, constrained coding.** *Mapping:* build the two-state labelled graph
from the qualifying-gap law, compute its Perron root and the first-moment
longest legal run `ln D / ln(1/f)` at each of the nine computable folds.
*Pre-registration:* predict the ratio of that first moment to the exact per-fold
`L` at all nine folds before looking, and predict that the ratio is flat in `p`
rather than growing like `ln p`. *Kill:* if the ratio grows with `p` at all, the
`p/ln p` shape claim is wrong and the row drops to a wall address; if it is flat
but above 5, the constant is out of reach and the row closes. *Outcome (2026-08-19, `history/staging/import-sofic.md`): the graph is exact and strictly sofic, the map's own rate formula died by its own flatness criterion, and the shape claim died with the f = 3/p input; the language family is printed (MRS B = 1 charge constraint).*

**Row 3, the repulsive lattice gas.** *Mapping:* write the corpus's kill events
as a hard-core lattice gas on the dependency graph of
`history/staging/import-suen.md` §8 and compute Shearer's region `R(G)` exactly
at `x = 5, 7, 11, 13, 17, 19, 23, 29`. *Outcome (2026-08-19,
`history/staging/import-shearer.md`):* the pre-registered coincidence with the
Mertens threshold `Σ_{5≤p≤x} 2/p < 1` CONFIRMED and upgraded to an identity —
on the complete dependency graph Shearer's exact region IS the union bound
(Scott–Sokal Ex. 3.1). The rider was wrong twice: the last feasible level is
x = 11 and the wall is x = 13 (the map's x = 7 was the SUFFICIENT asymmetric
LLL, which stays at x = 7 under free weight optimisation — two levels earlier
than the exact criterion, and a property of the sufficient condition only).
The kill clause cannot fire on the complete graph, and its matching-graph
firing is §8(i)'s wrong TPC proof, not evidence for Regts, whose zero-free
polydisc reaches exactly to Mertens and not past it.

**Row 4, Stein's method.** *Mapping:* write the multi-kill count in a fixed
window as `W = Σ X_a` with the neighbourhood of dependence taken from the
Fold Moment Identity's pair structure, and compute `b₁`, `b₂`, `b₃` at the four
windows where the extinction law was validated. *Pre-registration:* predict the
two-parameter extinction form's parameters from `b₁` and `b₂` alone, and predict
the joint deficit's multiple of the forced scale, before comparing either to the
measured `~3.8` and to the fitted extinction parameters. *Kill:* if `b₃` is not
small at the windows where the law was validated, the Poisson approximation has
no error term there and the derivation is not available. *Outcome (2026-08-19, `history/staging/import-stein.md`): the kill clause FIRED — b₃ sits at 0.85–0.9998 of its own ceiling at every window, so no Stein-derived constant exists; the first-moment arithmetic banked the derived (A, c) and the 3.8 candidate anyway, relabelled.*

**Row 5, the `Θ_e(a)` measurement.** *Mapping:* compute `Θ_e(a)` over the full
`(e,a)` family at `z = 13, 17, 19, 23` and form the ratio
`‖Θ‖₁ / (‖Θ‖₂ · √(#(e,a)))`, which is 1 under perfect alignment and `O(1/√#)`
under square-root cancellation. *Pre-registration:* write down which of the two
regimes is expected at each level, and the threshold ratio below which an
`ℓ¹ → ℓ²` theorem could deliver the needed `√log`, before computing.
*Kill:* a ratio at or above 0.5 at every level kills the whole `ℓ¹ → ℓ²`
programme for this wall, which is worth more than a partial success and retires
rows 5 and 6 together. *Outcome (2026-08-19, `history/staging/import-l1l2.md`): the kill line (ρ ≥ 0.5) did NOT fire — ρ falls 0.435 → 0.065 — and the prereg's own sealed note records that its inference was INVERTED (Cauchy–Schwarz makes the flat family the favourable case); the row closed anyway on the identity ‖Θ·S_H‖₂ = rms(R_H).*

---

*This document states current understanding. Superseded rows, retired grades and
the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md),
indexed by document; the construction record, including the twelve candidates
rejected as VOCABULARY-ONLY, is `history/staging/import-map-construction.md`.*
