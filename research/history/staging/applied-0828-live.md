# The engine and head red-team corrections that reached the live layer

<!-- ledger
id: Q-applied-0828-live
status: ANSWERED
todo: 11 (retired), 8, Z4
question: Which engine and head red-team corrections reached the live layer?
verdict: Nineteen edits across four documents: the glossary's cap_K dimension count with its mandatory sifted-versus-assumed clause plus three new entries (twin opener, head, tail); the survey's one-class density factor, S1's restored pi(q-1) terms and r in N_x hypothesis, the dropped Chen absorption, Theorem C with its emptiness, dimension 1 for q_i < q, the comb-conditioning qualifier and the inverted shallow-band bullet; the certificate engine's equidistribution status cell, the q = T^{o(1)} second hypothesis and the Comb Discrepancy scope cell; and the census's R as the continuum functional with its three comparators; paper/staircase-note.md, TODO.md and QUESTIONS.md are owed and untouched.
-->

*(2026-08-28. A record of edits, not a result. Nothing here is measured or
derived; every number moved into a live document comes from
`redteam-0828-engine.md`, `redteam-0828-head.md` and the notes those passes
audited, cited in place. Sources routed through `applied-0828-engine.md` §3,
`applied-0828-head.md` §3 and `coherence-0828.md` §5a. No git command was run,
`research/qc.js` was not run, and no producer was opened for writing. Under the
house publication moratorium.)*

---

## 0. What is still open after this pass

**Nothing was re-derived here.** Every corrected number is the red teams', taken
on their word plus their own stated re-derivations. This pass checked that the
corrected sentence says what its source says, and that the document around it
does not then contradict itself.

**Three owed corrections are outside the fence and were not made.**
`paper/staircase-note.md` §7 (one added parenthetical), `TODO.md` item Z4's
`Ledger:` line, and `research/QUESTIONS.md` (generated). They are listed in §3.

**Four proposals inside the fence were deliberately not applied**, all of them
second-reader grade or outside this brief. They are listed in §4, the
load-bearing one being the certificate engine's certified-head row (1 / 3 / 6 at
9.69 / 17.40 / 22.93% against a proposed 4 / 6 / 9 at 28.14 / 27.97 / 29.40%),
which rests on a scratchpad-grade producer with no embedded OUTPUT block and
whose new counts are floors.

**No number in these four documents was recomputed**, and no figure from a
producer without an embedded OUTPUT block was quoted into a live document. The
Comb Discrepancy scope cell therefore names the attained optimum
(`max G − min G`) without its measured slack values, which live only in
`comb-discrepancy-tight.md`.

---

## 1. Edits applied, by file

### `research/GLOSSARY.md` — 4 edits

| entry | old reading | new reading |
|---|---|---|
| Staircase cap (cap₁, cap₂, cap_K) | "cap_K adds the two forbidden freshness residues modulo the first K scour primes" | one forbidden residue per scour prime `q′ < q` that can fire (`v ≢ −2` A side, `v ≢ +2` B side), the companion `v ≢ 0 (mod q′)` void under `P⁻(m) ≥ q`, density factor `∏(1 − 1/(q′−1))`, dimension 1; plus the mandatory second sentence, that a formulation which *sifts* for `P⁻(m) ≥ q` has a real second class and dimension 2, pointed at `thm-buchstab-transfer-shallow.md` §2(c) |
| Twin opener | absent | the lower member of a realized twin pair; consecutive openers define the twin gaps the Z4 head statistics run on |
| Head | absent | one word, three objects, each named: the scour head (`q³ ≤ W+1`), the head window `[0, x]` of `attack-02-head-bias.js`, and the zone head `F(p)` of TODO Z4 and `destroyer-census-01.md` §6 |
| Tail | absent | the scour primes with `q³ > W+1`, where the cofactor is prime and the tail sum is a prime-counting statement; distinguished from a statistic's distributional tail |

The Var/E entry was edited earlier today by the primary agent and was not
touched here.

### `research/bv-import-survey.md` — 8 edits

| section | old reading | new reading |
|---|---|---|
| §3.1, S1 statement | no hypothesis on the comb | `r ∈ N_x` stated, with the full mod-30 census's contrast ({11,17,29}/{13,19,1}, tail factor 8/3, constant `(3/4)·ln 2`) so the class lists cannot be read as census-wide |
| §3.1, S1 display | `π(⌊(W−1)/q⌋; 30, ·)` with no subtraction | the sharp form with `− π(q−1; 30, ·)` restored, and the measurement that the loose form is not below cap₁ (1 of 9, 5 of 29, 16 of 105, 60 of 396 tail primes at @11/@13/@17/@19); the asymptotic unaffected |
| §3.1, S2 density factor | `∏_{i≤K}(1 − 2/(q_i − 1))` | `∏_{i≤K}(1 − 1/(q_i − 1))`, with the reason (`v ≢ 0 (mod q_i)` void under `P⁻(m) ≥ q > q_i`, so the one-class factor holds in head and middle too) and the measurement (within 0.40%; the two-class factor 5.00% to 32.37% out) |
| §3.2, the remainder | "the same absorption of divisor weights as in Chen's proof, Halberstam–Richert Ch. 11" | a plain sum of AP errors, `|λ_d| ≤ 1`, unweighted BV in its `max_{y ≤ T}` form; Chen's absorption belongs to the linear sieve at level `T^{1/2}` |
| §3.2, the headline | `q_K = T^{o(1)}` is a BV theorem, "one ingredient closes", no cost stated | attributed to Theorem C (`thm-capK-bv.md` §2, PROVEN short-note grade, `q_K = W^{o(1)}`), followed by what it does not buy: nothing finite (`s ≥ 10.82` needed, first cleared at `x = 263`, against `s < 5` everywhere reachable) and nothing effective (BV's constant is ineffective) |
| §3.2, the deep ladder | "two excluded classes per large freshness prime, dimension 2 in the range `(x, q_K]`" | dimension 1 wherever `q_i < q` on a sequence already carrying `P⁻(m) ≥ q`; 2 only if roughness is sifted, or if `q_i > q`, where `v ≡ 0 (mod q_i)` picks the single value `m = q_i`; the source's NOT AUDITED flag carried, not lifted; `ln q_{K*}/ln T = 0.562` at @97 added as the reason the hypothesis fails there |
| §3.3, the remainder | "`O(1)`, unconditionally and trivially" | the same, qualified: that is a property of the formulation with the comb inside the sieve; conditioning on the comb gives `2·3^k` per Legendre term by the repo's own Comb Discrepancy Lemma, which is what makes the Certified-Head Theorem head-only |
| §3.3, bullet 1 | "covers the B-factor in the band where cap-28 validated it best" | inverted: `|B − 1| < 10⁻⁵` in the shallow band and the uncorrected product is already accurate, so the validation payoff sits at the deep end; the bullet also gains the second hypothesis `q = T^{o(1)}` |

### `research/certificate-engine.md` — 6 edits

| section | old reading | new reading |
|---|---|---|
| status table, equidistribution row | "Tail Comb Equidistribution Conjecture — OPEN, and the obvious tool is vacuous" | "PROVEN in the shallow regime (`q_K = W^{o(1)}`), empty at every run level; deep ladder open", scope naming the `s ≥ 10.82` threshold, the `x = 263` crossing and `s < 5` everywhere reached |
| status table, Comb Discrepancy row | "every Legendre term is off its share by at most `2·3^k`" | each of the `2·3^k` terms is off by less than 1, so a window count is off by at most `2·3^k`; the constant named as the trivial per-block bound whose attained optimum is `max G − min G` per level |
| status table, Buchstab row, and §3's box | "provable now at `y = T^{o(1)}`" | the same with the second hypothesis `q = T^{o(1)}`, without which the ensemble is not in the fundamental-lemma regime at all |
| §2 heading and box | "the ingredient that is open there"; the conjecture box | "proven there only in the limit"; the box carries Theorem C, then the three things it does not buy (nothing finite, nothing effective, nothing in the deep ladder) |
| §2, the envelope | "What exists instead is the Tail Envelope Measurement" | the envelope named as the only finite-level statement |
| the sentence after the table, and §2's TODO routing | "the two rows marked OPEN and HEURISTIC"; "the item that would retire it is 11(c)" | the HEURISTIC row plus the still-open half of the equidistribution row; and Theorem C recorded as 11(c) delivered in the shallow regime and in the limit, with 8(b) keeping the deep ladder and every finite level |

### `research/history/staging/destroyer-census-01.md` §6(b) — 1 edit

| section | old reading | new reading |
|---|---|---|
| §6(b), the decomposition | "`R = E[g²]/2E[g]` the uniform-origin forward recurrence"; `h/R = 1.09 → 1.03` read against it | `R` is the CONTINUUM inspection-paradox functional; a uniform integer origin sees `R + 1/2` exactly, an odd origin `R + 1`, the coprime-to-30 residues primes ≥ 7 occupy `R + 2.754` at [1e7,1e8); the ratio is flagged as read against a population no prime belongs to, and `h − R` is given at all three nulls (5.679, 5.179, 2.925), about half the quoted excess against the population primes occupy |

No other section of that file was touched.

---

## 2. Three edits made for coherence, beyond the corrected sentences

Each is forced by a correction above; without it the document would contradict
its own new line.

1. `certificate-engine.md`'s post-table sentence said the PREDICTED status
   follows from "the two rows marked OPEN and HEURISTIC". One of those rows is
   no longer marked OPEN, so the sentence now names the HEURISTIC row and the
   open half of the equidistribution row.
2. `certificate-engine.md` §2's heading and its 8(b)/11(c) routing paragraph
   were restated on the new status. The routing itself did not move: 8(b) keeps
   the deep ladder and every finite level.
3. `bv-import-survey.md` §3.3 bullet 1 took the `q = T^{o(1)}` hypothesis as
   well as `certificate-engine.md` §3, since the bullet is the survey's own
   statement of the same "provable NOW" claim. The proposing note
   (`thm-buchstab-transfer-shallow.md` §3.5) states the hypothesis as
   `ln q ≤ (1−ε) ln T / s*(δ)`, which is that condition.

---

## 3. Owed elsewhere, not applied here

| target | correction | source |
|---|---|---|
| `paper/staircase-note.md` §7 | correct as a definition; add one parenthetical after the A-side conditions: the first is void (`q′ ≠ q` and `P⁻(m) ≥ q > q′`), so only `v ≢ −2` excludes a class and the per-prime surviving share is `1 − 1/(q′−1)`. Redundant, not wrong; no `cap_K` value moves | `redteam-0828-engine.md` §1.3, §8 item 5 |
| `TODO.md` item Z4 | its `Ledger:` line reads `Q-head-residual` only; the gate wants `Ledger: Q-head-residual, Q-redteam-0828-head` | `redteam-0828-head.md` §2, `applied-0828-head.md` §3 |
| `research/QUESTIONS.md` | generated. `Q-capK-bv` picks up "first cleared at `x = 263`; the floor `s ≥ 10` first reached at `x = 239`" and the three head notes' verdict lines now agree, on the next `node research/qc.js --index`. Not run here | `applied-0828-engine.md` §2, `applied-0828-head.md` §3 |

---

## 4. Inside the fence and deliberately not applied

- **`certificate-engine.md`'s certified-head row.** The proposal is 1 / 3 / 6
  primes at 9.69 / 17.40 / 22.93% becoming 4 / 6 / 9 at 28.14 / 27.97 / 29.40%
  under a per-dilation blocked bound (`comb-discrepancy-tight.md` §5,
  `coherence-0828.md` §5a item 14). Second-reader grade, from a producer with no
  embedded OUTPUT block, and the new counts are floors. It changes a PROVEN
  row's headline numbers, which is the last place to accept a single witness.
- **`bv-import-survey.md` §3.1's heading**, "Provable now by Siegel–Walfisz".
  Over-names the tool for S1, where PNT in progressions at the fixed modulus 30
  suffices and is effective; Siegel–Walfisz is needed only for S2
  (`thm-mod30-tail.md` D4). Not in this brief's list; one heading, no number.
- **`bv-import-survey.md` §3.1's attribution of S1's gain** to
  `staircase-note.md` §8 factor (a), which conflates a kill ratio with a cap
  ratio (`thm-mod30-tail.md` §3, §8). Not in this brief's list.
- **`bv-import-survey.md` §1's BMOR 1/160 constant**, stated for `θ` where the
  abstract says only "inequalities of the same shape" for `π`
  (`thm-mod30-tail.md` §8). Second reader, body not read.

No producer was edited, `research/QUESTIONS.md` was not edited, `TODO.md`,
`README.md` and `paper/staircase-note.md` were not edited, and the glossary's
Var/E entry was left as the primary agent wrote it.

---

## 5. What would falsify this pass, and whether that check has run

| claim | what would falsify it | has the check run |
|---|---|---|
| every corrected sentence says what its source says | a live-doc sentence differing in substance from the corrected sentence in `redteam-0828-engine.md` §1.3/§3.3/§6.5 or `redteam-0828-head.md` §2 | **RUN** by hand, sentence against source, for all nineteen edits |
| the corrected numbers are right | an arithmetic error in a red team's own re-derivation, which this pass did not repeat | **NOT RUN.** Nothing was recomputed here |
| the four documents do not contradict themselves after the edits | a surviving sentence in the same file asserting the old reading | **RUN** by reading each edited file's affected section end to end; the three consequences found are §2 above. NOT run across other live documents, which may still quote the old readings |
| no producer moved | an embedded OUTPUT block differing from its file after this pass | **NOT RUN.** `node research/qc/embed.js --check` was not run; no `.js` file was opened for writing |
| no file outside the fence moved | any file other than the four edited documents and `research/history/CHANGELOG.md` differing after this pass | **RUN** as a rule of the pass; five files written in total, this record being the sixth and the only new one |
