# The quadpoint red team's corrections, applied to the four HELD notes

<!-- ledger
id: Q-applied-0828-quadpoint
status: ANSWERED
todo: Z0, Z2
question: Were the quadpoint red team's corrections applied to the four HELD notes?
verdict: Applied: the nine REFUTED and WEAKENED verdicts that target the four notes are written into them in present tense, with ledger blocks added; the tenth targets the sealed prereg, outside the fence, and is recorded in attack-quadpoint-02.md instead; three corrections owed by TODO.md Z2 and one by Z0 are listed here and are NOT applied.
-->

*(2026-08-28. Staging note; a process record of an edit pass, not a result.
Source: `redteam-0828-quadpoint.md`. Scope: the four HELD notes only. No
producer, no prereg and no live document was edited; `research/qc.js` was not
run and no git command was run, per the brief. Nothing here opens or closes a
route.)*

## 1. What was applied, note by note

| file | section | old reading | new reading |
|---|---|---|---|
| `quadpoint-identity-01.md` | head | no ledger block | block added: id `Q-capture-identity`, ANSWERED, todo Z2 |
| `quadpoint-identity-01.md` | §1 Lemma | "capacity C (channel pairs)", window convention unstated | "the half-open stretch S_Q = [Q², Q′²), capacity C counting the channel pairs (a, a+2) with BOTH members in S_Q", plus a paragraph stating why the convention is load-bearing: finality fails at v = Q′², (Q′² − 2, Q′²) is a channel pair at 1227 of 1227 anchors, and the loose convention breaks the identity by +1 at 12 of 12 anchors tested |
| `quadpoint-identity-01.md` | §2 bullet 1 | "K*(Q) is a crossing point: the least K with X(K) ≤ T − 1" | the same, written on the set where T ≥ 1, with the reason (X ≥ 0, so T = 0 admits no such K) and the note that 0 of 1,227 anchors have T = 0, so the data cannot test the quantifier |
| `quadpoint-identity-01.md` | §3 | "(2θ)² = 1/(4ρ(2))" carried as the origin-excess connection | the identity is a tautology under this corpus's ρ(2) = e^{2γ}/4, both sides being e^{−2γ} by definition, and ρ here is not Dickman's ρ |
| `quadpoint-identity-01.md` | §3 | "the heuristic predicts no second death" and the y* forecasts, unconditional | both written on the set where T ≥ 1, since y*(Q) exists if and only if T(Q) ≥ 1 (TODO Z2's 2026-08-27 quantifier) |
| `quadpoint-identity-01.md` | §4 | "Σ capU = C − T + X = #{composite members whose partner is y-rough}" | the red team's corrected sentence: the count is of composite members whose partner is rough beyond min(p_K, the largest active below that member's own least prime factor), NOT of members with a p_K-rough partner, the two differing 11% to 37% at K* over Q = 313..9281; a bound on the uniform count is not a bound on Σ capU |
| `attack-quadpoint-01.md` | head | no ledger block | block added: id `Q-quadpoint-transplant`, ANSWERED, todo Z2 |
| `attack-quadpoint-01.md` | §2 | "Σ capU_0/C climbs 0.720 → 1.474 across bands — smaller than the zone budget's B/C → 2 because lpf-freshness is built into capU_0" | the ratio is 1 − T/C + CC/C by the capture identity, CC/C climbs 0.223 → 0.622 and T/C falls 0.268 → 0.041, so the limit is 2, the zone budget's own limit; lpf-freshness buys a slower approach, not a lower ceiling, and the limit rests on T/C → 0, which is Hardy-Littlewood-grade and unproven here |
| `attack-quadpoint-02.md` | head | no ledger block | block added: id `Q-quadpoint-transplant`, ANSWERED, todo Z2, same question text as v1 |
| `attack-quadpoint-02.md` | §2 READ-2 | "each inside its registered forecast band", no power statement | the red team's corrected sentence: the admissible m8 given the measured m7 is [0.019, 0.040], a factor 2.10 wide and containing the flat outcome m8 = m7, and a zero-parameter main term passes the same target to 0.2% at B8 |
| `attack-quadpoint-02.md` | §2 READ-3 | "no anchor approaches KCAP" | no anchor reached KCAP; the largest K* is 46 of KCAP = 64, which is 0.719 of the cap, below it rather than nowhere near it. The prereg's third READ-3 trigger is not scored separately, the producer's overCap boolean covering it for Q > 1499 and excluding it for Q ≤ 1499, where every anchor certifies |
| `attack-quadpoint-02.md` | §2 escalation | "Escalation to 31607: NOT triggered, by the prereg's own rule" | the same, plus: the clause is not a usable pre-commitment, since at max/mean 1.47 the band MAX at 31607 forecasts to ~94 against KCAP = 64, so READ-3 would fire on the engine cap, and the scorer's `Kstar >= 0` filter drops capped anchors from the band mean and biases READ-2 toward FALL-CONSISTENT. On this run the filter never bit, so the scored verdict stands as scored |
| `attack-quadpoint-02.md` | preamble and tail | "SEALED ALONE at commit `7800bd2` before the producer existed" | the seal is recorded with its residual: the producer first exists in git 4m48s after the seal, so "the producer does not exist at the seal" is unverifiable from git and band-shopping was physically possible in that gap and before it. Mitigation, not proof: the sealed text and the coded bands agree on the integers, centers and half-widths, and no band moved under an independent read. Recorded as a residual; future preregs should seal before the measuring producer is even drafted, with a longer gap |
| `quadpoint-prior-art.md` | head | no ledger block | block added: id `Q-quadpoint-prior-art`, ANSWERED, todo Z2 |
| `quadpoint-prior-art.md` | §2.2 | correction `0.000 29`, "residual of `0.0144` ... The correction is 2% of that residual" | correction `0.000 291`, top-band residual `0.004 414` and bottom-band `0.018 344`, so 6.6% of the top-band residual and 1.6% of the bottom; the closing instruction stands with the corrected number |
| `quadpoint-prior-art.md` | §3 | "Conditioning on one component with the partner's factorization in hand is the switching principle, Chen 1973" | the partner condition is adjacent to switching and is not an instance of it: Lichtman's own definition switches the sifted SET, while the partner condition is already inside `A_p = {n : p ∣ n(n+2)}` and the reading of min(lpf(a), lpf(a+2)) is Buchstab for the dimension-2 problem. Ford Lemma 3.8 carries the weight; ADJACENT-STANDARD is unaffected |
| `quadpoint-prior-art.md` | §7, §1 table row 2 | "numerics in arXiv:2607.21883" | the §2.2 numerics are a session script, not that paper; arXiv:2607.21883 (Weingartner, *Explicit bounds for Buchstab's function*) is a real identifier confirmed by fetch and on point for certifying u*, but it is read nowhere in the file and appears in no query row and no §5 artifact row, so it belongs in §6 with its fetch recorded before it enters a convention row |
| `quadpoint-prior-art.md` | §7, §1 table row 3 and §3 table row | "plus the switching principle (Chen 1973)" as co-owner of the identity | Buchstab's identity owns it; the partner condition sits inside `A_p`, and Chen's switching principle is adjacent rather than the owner |
| `quadpoint-prior-art.md` | Summary | "the partner condition is the switching principle"; "closes only 2% of the gap to the measured band means" | the partner condition is inside `A_p`, switching adjacent; the root closes 6.6% of the top-band residual and 1.6% of the bottom |

## 2. Declined, and why

- **The prereg's escalation clause and its `Kstar >= 0` filter**
  (`quadpoint-decade-prereg.md`, `attack-quadpoint-02.js`). REFUTED as a
  pre-commitment by the red team, but both files are outside the fence. The
  consequence is written into `attack-quadpoint-02.md` §2 instead, where the
  clause is quoted.
- **`quadpoint-prior-art.md` §8's "`0.280 438` is scratchpad-grade" bullet.**
  The red team observes that its re-derivation now exists in a staging
  companion, which is not a gated producer, so the rule still binds unchanged
  and the bullet stays as written.
- **`quadpoint-identity-01.md` §5's "SEARCH OWED".** The prior-art note's §4.3
  proposes closing it. No red-team verdict grades that sentence, and closing
  it is an integration decision, not a correction.

## 3. Live-document corrections, collected and NOT applied

| document | reading | correction owed |
|---|---|---|
| `TODO.md` Z2 (line ~141) | "moves the target only 2% of the measured residual" | **already applied by the primary agent**: now reads 6.6%, `0.000291` against a top-band residual of `0.004414`. Verified in place, no action |
| `TODO.md` Z2 (line ~135) | "the identity is standard Buchstab bookkeeping + Chen's switching principle" | switching is ADJACENT, not the owner: the partner condition sits inside `A_p = {n : p ∣ n(n+2)}` and the decomposition is Buchstab's identity for the dimension-2 problem. The "no novelty language" instruction is unaffected |
| `TODO.md` Z2 (lines ~113-115) | "the CAPTURE IDENTITY — floor_K = T − X(K) EXACTLY ... (proven elementary; verified at every depth of all 1,227 anchors)" | add the window convention the proof needs: the half-open stretch with BOTH members in [Q², Q′²). Without it the statement is one clause short, and the loose convention breaks it by +1 at every anchor |
| `TODO.md` Z2 `Ledger:` line (line ~180) | carries `Q-redteam-0828-quadpoint` only | the four notes' blocks name Z2, so the line owes `Q-capture-identity`, `Q-quadpoint-transplant` and `Q-quadpoint-prior-art` as well, or `node research/qc.js --index` flags them |
| `TODO.md` Z0 (lines ~269-274) | lists `attack-quadpoint-01.md`, `attack-quadpoint-02.md` (+ prereg scoring), `quadpoint-identity-01.md` and `quadpoint-prior-art.md` as owed passes | the pass ran on 2026-08-28; the standing debt now names `destroyer-census-01.md`, `stretch-01.md` and `records-placement-01.md` only |

No other live document carries any of the defective readings: the §4 gloss on
Σ capU, "no anchor approaches KCAP" and the escalation clause appear nowhere
under `research/*.md`, `paper/*.md` or `README.md` (grepped on the object
words). `TODO.md` Z2 already carries the T ≥ 1 quantifier, so the unconditional
y* sentences were a staging-only defect.

---

*History layer: process record, staging. No producer: this note reports edits,
computes nothing, and every figure in it is quoted from
`redteam-0828-quadpoint.md` or from the note being edited. See
`research/history/CHANGELOG.md` for the corpus rule.*
