# The engine red team's corrections, applied to the five HELD notes

<!-- ledger
id: Q-applied-0828-engine
status: ANSWERED
todo: 11 (retired), 8
question: Were the engine red team's corrections applied to the five HELD notes?
verdict: Applied, 37 edits across the five notes: two numbers corrected (first s >= 10.82 at x = 263 not 239, first non-empty kappa=1 level @37 not @53), two ledger verdict lines and one note title rewritten, one proof step given BV's max-over-y form, the one-class freshness factor restated on P^-(m) >= q so it holds at every scour prime, and two mislabelled columns renamed; six corrections that land on live documents are collected here unapplied, and no producer was touched.
-->

*(2026-08-28. Applying `research/history/staging/redteam-0828-engine.md`. Only
the five audited notes were edited. No producer, no live document, no
`research/QUESTIONS.md`, no other staging note. No git command of any kind was
run and `research/qc.js` was not run. Under the house publication moratorium.)*

---

## 0. What is still open after this pass

**Nothing here was re-derived.** Every corrected number is the red team's, taken
on its word plus its own stated re-derivation; this pass checked internal
consistency and wording, not arithmetic. The one exception is the `ρ` at @29
used in `comb-discrepancy-tight.md` §3, computed here from the definition
(`ρ = 2·∏_{7≤p≤29}(p−2)/29# = 0.022125`) because the red team's table stops at
@23.

**Two numbers the red team could not re-derive are still single-witness.**
`comb-discrepancy-tight.md`'s `D_29 = 81.5492` and its `ρ·(g_max − 1)` at @29
were outside that pass's compute budget, so both remain on one witness, and the
@29 lower-bound figure is now stated as a subtraction rather than a measurement.

**Six corrections are not applied.** They land on live documents, which this
pass may not touch; they are listed in §3 for the primary agent.

**One producer disagreement is recorded, not fixed.**
`comb-discrepancy-tight.js` PART 5 computes its share column on main-term mass
and its constant column as a mean over terms, which is not what the note's old
column headers said. The producer is correct for what it computes; the labels
were wrong and the labels are what changed. The exact-cap₂ share at @17 (28.21%
against the main-term 28.14%) is the red team's, not this producer's.

---

## 1. Edits applied, by file

### `thm-capK-bv.md` — 8 edits

| section | old reading | new reading |
|---|---|---|
| `<!-- ledger -->` verdict | "needs s >= 10.82, first at x = 239" | "first cleared at x = 263; the lemma's floor s >= 10 is first reached at x = 239" |
| §0 ¶1 | "the first primorial level at which `s` clears 10.82 is x = 239, `W ≈ 10^96`" | clears 10.82 at **x = 263** (`W ≈ 10^105.6`); the floor `9κ+1 = 10` is reached at x = 239, where the factor is still above 1 |
| §1, the excluded classes | "`v ≢ 0 (mod p)` automatic (`p < q ≤ m`, both prime)"; "`q_i < q ≤ m` with `m` prime" | both steps restated on `P⁻(m) ≥ q`, with the sentence that neither needs `m` prime, so the one-class count holds at every scour prime and not only in the prime regime |
| §3 Step 2 | `Σ λ^±_d h(d) = (1 ± e^{9κ−s}K^{10})·V`, an equals sign | the two one-sided inequalities FI Lemma 6.8(iii) states, with the note that (ii)'s sandwich makes them sufficient |
| §3 Step 3 | "sub-sums of the Bombieri–Vinogradov sum at level `30D`" | "in its `max_{y ≤ T}` form", plus the clause that the `π(q−1)` term rides the inner maximum since `q ≤ T/2`, and is not BV at the endpoint `q−1`, where `30T^{1/3}` is inadmissible (`2/9 > 1/6`) |
| §4 heading sentence | "the fundamental lemma is silent below `x ≈ 239`" | "the error factor stays above 1 below `x = 263`" |
| §4 table preamble | `D = T^{1/2}` stated, `z` not stated, no reason given for either | states `z = x` at `K = 0` against Step 2's general `z = q_K + 1`, and says `D = T^{1/2}` is BV's ceiling rather than the proof's `D = T^{1/3}`, at which every tabled `s` is two thirds of the printed value, so the table is the generous reading |
| §4 crossings, and §8's `s < 5` row | "First `s ≥ 10` at 239, first `s ≥ 12` at 283" | the `s ≥ 10.82` crossing at `x = 263` (`s = 10.9132`) inserted between them, attributed to `redteam-0828-engine.md` §3.2, and the falsification row now names both crossings |

The §4 table itself is untouched: it is this note's own embedded output and it
reproduced to the digit under the red team's independent re-derivation.

### `thm-mod30-tail.md` — 7 edits

| section | old reading | new reading |
|---|---|---|
| `<!-- ledger -->` verdict | "once S2's freshness factor is corrected to one class per prime" | adds "which needs only `P⁻(m) ≥ q > q_i` and so holds at every scour prime, not only in the prime regime" |
| §0 D1 | "In the prime regime the freshness condition `v ≢ 0 (mod q_i)` is vacuous" | void wherever `P⁻(m) ≥ q > q_i`, which `staircase-note.md` §7 imposes on `#A_K` at every scour prime, so the correction reaches the head and the middle too |
| §5(i), the mid step | "m is a prime ≥ q > p gives p ∤ m" | "`P⁻(m) ≥ q > p` gives `p ∤ m`" |
| §5(i), the freshness step | "m is prime with m ≥ q > q_i, so q_i ∤ m" | "`P⁻(m) ≥ q > q_i`, so `q_i ∤ m`", with the sentence that the step uses no primality and the density `δ` does not depend on it |
| §5(i), unit mod M | "m is prime with m ≥ q > q_K > P₀, hence a unit mod M" | `P⁻(m) ≥ q > q_K > P₀` gives the same, primality not needed |
| §5(iii) main term, and §9's S2(i) row | "one quarter of the `2(π(A)+π(B))/2` shape"; the row's prime-regime phrasing | "one quarter of the `π(A) + π(B)` shape"; the row now asks for a cofactor with `P⁻(m) ≥ q` and cites the red team's independent recount of the same eight cells |

### `thm-sharp-sieve-range.md` — 14 edits

| section | old reading | new reading |
|---|---|---|
| title | "from x = 239 to @53" | "from x = 263 to @37" |
| `<!-- ledger -->` verdict | "kappa=1 is first non-empty @53" | "@37 (a 19.8-wide bracket; @53 is the first narrow one, 1.656)" |
| §0 finding 1 | "the siblings locate at reachable levels `x = 239` and `x = 131`" | `x = 263` and `x = 127`, with 131 named as the κ = 2 sibling's `δ = 0.5` figure at `s* = 22.06` |
| §0 summary table, κ = 1 row | "`x = 239` → **@53**" | "`x = 263` → **@37**, bracket 19.8 wide, @53 the first narrower than 2" |
| §0 numeric confidence | "first non-empty κ = 1 level is @53" | @37, pointing at the red team's sweep of every prime level @11..@103 |
| §3 table | jumped @29 → @53 | @31 (`V·F₁ = 1.018`, still empty) and @37 (`V·F₁ = 0.914`, `f₁ = 0.0877`, bracketed) inserted, attributed in the caption to the red team's sweep, not to SEC 1 |
| §3 reading 1 | "**First non-empty level: @53**, scope `10⁹⁶ → 10¹⁹`" | @37, with its three numbers, the crossing at @31, `f₁`'s `s = 2` threshold, scope `10^105.6 → 10^12.9`, and the 19.8-wide bracket flagged as not an asymptotic |
| §5 reading (L) | "@53 against the sibling's `x = 239`" | "@37, with a 19.8-wide bracket, against the sibling's `x = 263`" |
| §5 reading (F) and its verdict table | "finite-level statement at `x = 239`"; last row "@239 … EMPTY (FL crosses)" | `x = 263`; the row is now @263 "EMPTY (FL factor crosses 1)", and an @37 row was added |
| §7 buys-item 1, §9 sweep row, §10 source ledger | "@53, not from `x = 239`"; "@53"; "`x = 239`" | @37 with the bracket-width caveat; the falsification row now records that the sweep is RUN at every level @11..@103 and that this note's own table skipped @31..@47; a source row for the red team's re-derivation added |

### `comb-discrepancy-tight.md` — 6 edits

| section | old reading | new reading |
|---|---|---|
| §3 heading and bound | "the maximal gap"; `D_x ≥ ρ·g_max` | "the maximal empty run"; `D_x ≥ ρ·(g_max − 1)`, with the @7 comb listed and the one-member argument spelt out |
| §3 values | 1.429 / 2.338 / 2.967 / 4.538 / 5.622 / 7.699 / 9.425 at @7..@29 | 1.381 / 2.299 / 2.934 / 4.509 / 5.596 / 7.676 at @7..@23; @29 stated as one `ρ` (0.0221) below 9.425 and flagged not re-derived |
| §3 share | "explains 64% of `D_x` at @7 and 11.6% at @29" | 61.7% at @7, about 11.5% at @29, with the note that no downstream number moves |
| §4 slack line | "against ρ·g_max: 5.3× / 6.5× / 8.7×" | against `ρ·(g_max − 1)`; the three ratios are unchanged at two digits |
| §5 column headers | "share of Σcap₂"; "per-term constant, max over used dilations" | "share of Σcap₂, main-term mass"; "mean per-term constant, max over certified primes", with a paragraph giving the exact-cap₂ share at @17 (28.21% against 28.14%), why the 9.69% custody assert hides it, and the 17.41 mean against the 18.369 maximum single-dilation range |
| §5 reading; defects list; falsification list | "the certified head roughly triples at @17"; "each term is off by at most 1"; "@29 is the only witness" | "quadruples in count at @17, from 1 to 4"; "off by less than 1"; the @7..@23 independent reproduction recorded, @29 still single-witness |

### `thm-buchstab-transfer-shallow.md` — 2 edits

No red-team verdict refutes or weakens this note; both edits are scope clauses
the red team requires so the corrected glossary line will not read as
contradicting it.

| section | old reading | new reading |
|---|---|---|
| §2(c) | the `κ = 2` table stood against §1's "one class per freshness prime" with no reconciliation | one sentence: §1 counts victims already carrying `P⁻(m) ≥ q`, where `m ≡ 0` is void, while the table sifts for that roughness, where it is a real class; assumed roughness gives dimension 1 (`thm-capK-bv.md` §1), sifted gives 2 |
| §7 defects | `GLOSSARY.md` and `staircase-note.md` §7 lumped together as "misleading as a dimension count" | split: the glossary line is a dimension count and is wrong as one; `staircase-note.md` §7 is a definition whose two-condition set equals its one-condition set, so it is redundant, not wrong, and no `cap_K` value moves |

---

## 2. Declined, and why

- **`thm-capK-bv.md` §8's `K_dim` row was not widened.** The red team searched
  `z₁ ≤ 2·10⁸` against this note's `10⁵` and found the same sup. That is a
  strengthening of someone else's search, not a correction of this note's own,
  and importing it would put a number in the note that its producer did not
  compute. The row still reads "very likely complete, but very likely is not a
  proof", which is the honest state either way.
- **No producer was edited**, per the fence, including
  `comb-discrepancy-tight.js`, whose two column conventions are the reason two
  headers were wrong. The producer computes what it computes correctly; only its
  labels were repaired.
- **`research/QUESTIONS.md` was not edited.** It is generated from the
  `<!-- ledger -->` blocks. The two corrected verdict lines (`Q-capK-bv`,
  `Q-sharp-sieve-range`) will carry through on the next
  `node research/qc.js --index`. TODO items 8 and 11 already list
  `Q-redteam-0828-engine` on their `Ledger:` lines, so this note's block needs no
  TODO edit.
- **`thm-sharp-sieve-range.md` §8's four defect bullets** (about
  `dhr-verification.md`, `covering-dive.md`,
  `attack-wrongdirection-audit.md`) were left alone: they are that note's own
  findings against live documents, not red-team corrections to it.

---

## 3. Corrections the red team proposes to live documents, left for the primary agent

None of these were applied. Sources are sections of `redteam-0828-engine.md`.

| # | target | correction | source |
|---|---|---|---|
| 1 | `research/QUESTIONS.md`, `Q-capK-bv` rows | generated; regenerate after this pass so both rows pick up "first cleared at x = 263, floor s ≥ 10 first reached at x = 239" | §3.2, §8 item 1 |
| 2 | `research/GLOSSARY.md`:354 | "cap_K adds the two forbidden freshness residues" is wrong as a dimension count. Replace with the **one** residue that can fire per scour prime `q′ < q` (`v ≢ −2` on the A side, `+2` on the B side), the void companion `v ≢ 0 (mod q′)` under `P⁻(m) ≥ q`, and the factor `∏(1 − 1/(q′−1))` — **plus the second sentence**: in a formulation that sifts for `P⁻(m) ≥ q` rather than assuming it, `m ≢ 0` is a real second class and the dimension is 2. Without that sentence the line reads as contradicting `thm-buchstab-transfer-shallow.md` §2(c) | §1.3, §8 item 2 |
| 3 | `research/bv-import-survey.md` §3.1 | density factor `∏(1 − 2/(q_i − 1))` → `∏(1 − 1/(q_i − 1))`. REFUTED and measured, 8 exact counts at @17 and @19, the survey's factor 5.00% to 32.37% out | §1.2, §8 item 3 |
| 4 | `research/bv-import-survey.md` §3.2 | "two excluded classes per large freshness prime, dimension 2 in the range `(x, q_K]`" → dimension 1 wherever `q_i < q`, on a sequence that already carries `P⁻(m) ≥ q`. It is 2 only if roughness is sifted, or if `q_i > q`, where `v ≡ 0 (mod q_i)` selects the single value `m = q_i` rather than a class. `thm-capK-bv.md` §7 already says this and marks it NOT AUDITED; the red team does not lift that flag | §1.3, §8 item 4 |
| 5 | `paper/staircase-note.md` §7 | correct as a definition; add one parenthetical after the A-side conditions: the first is void (`q′ ≠ q` and `P⁻(m) ≥ q > q′`), so only `v ≢ −2` excludes a class and the per-prime surviving share is `1 − 1/(q′−1)` | §1.3, §8 item 5 |
| 6 | `research/certificate-engine.md` status table | the Comb Discrepancy Lemma's scope cell, "every Legendre term is off its share by at most `2·3^k`": each term is off by less than 1, and the sum of the `2·3^k` terms is off by at most `2·3^k`. One cell, no downstream number | §6.5 |

Nothing in that list moves an exponent, opens a route, or bears on the twin
prime conjecture.

---

## 4. What would falsify this pass, and whether that check has run

| claim | what would falsify it | has the check run |
|---|---|---|
| the five notes now state the red team's verdicts | a WEAKENED or REFUTED row of `redteam-0828-engine.md` §0's scoreboard with no corresponding edit here | **RUN** by hand against all 24 scoreboard rows; the CONFIRMED rows are untouched by design, and the two CONFIRMED-with-a-nit rows (2c's `2(π(A)+π(B))/2`, 6e's two labels) were applied as well |
| the corrected numbers are right | an arithmetic error in the red team's own re-derivation, which this pass did not repeat | **NOT RUN.** Nothing was recomputed here except `ρ(@29) = 0.022125`, from the definition |
| the @29 lower-bound figure | the maximal empty run at @29 not being `g_max − 1` | **NOT RUN at @29**; the red team verified it by direct pass at @7..@23 only, and the note now says so |
| no producer output moved | an embedded OUTPUT block differing from its file after this pass | **NOT RUN.** `node research/qc/embed.js --check` was not run here; no `.js` file was opened for writing, and the only embedded producers among the five are `thm-mod30-tail.js` and `thm-capK-bv.js`, both untouched |
| no live document moved | any file outside `research/history/staging/` differing after this pass | **RUN** as a rule of the pass: five files were edited and this one written, all in staging |
