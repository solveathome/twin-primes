# Red team C's corrections, applied to the four notes it reviewed

<!-- ledger
id: Q-applied-0829-measure-c
status: ANSWERED
todo: none
question: Were red team C's corrections applied to the notes it reviewed?
verdict: 22 of the 25 items in section 3 target the four HELD staging notes and all 22 are applied (21 as the exact old-text to new-text strings the red team wrote, 1 as a minimal carry because filling its column for all nineteen rows would be a fresh grading judgement rather than a citation), plus 1 directed edit to lit-scourfield-2008.md section 0 that red team section 1g names and section 3 gives no string for; 3 items are flagged HOLD and are left verbatim for the orchestrator (varE-theta2-proof.md, lit-smooth-divisors.md, SEARCH-CONVENTIONS.md); 1 producer item is OWED and untouched, since the producer's readings 13 and 14 still carry the M-P1 failure that E8 and E9 reverse in the note and correcting them needs a re-embed; node research/qc.js returned TOTAL 1 on the run straight after the edits, the one finding being research/measure-g2z2-0829.js:432 in another agent's file, and TOTAL 0 on the run after this note was written, with refs, quotes and ledger clean on both.
-->

*2026-08-29. Application pass over `redteam-0829-measure-c.md` section 3.
Internal, HELD, publication moratorium in force. Four staging notes edited and
this file written; no live document touched, no producer touched, no git command
run.*

---

## 0. Counts

Section 3 of the red team note carries **25 numbered items, E1 to E25**.

| bucket | count |
|---|---|
| flagged APPLY, target one of the four staging notes | 22 (E1 to E22) |
| of those, applied here as the red team's exact old-to-new strings | 21 |
| of those, applied as a minimal carry rather than in full | 1 (E22) |
| directed edits applied from red team section 1g, no string given in section 3 | 1 (recorded as E16b) |
| flagged HOLD, left for the orchestrator | 3 (E23, E24, E25) |
| OWED, needing a producer change and a re-embed | 1 (P1, from red team sections 1b and 5a) |
| residuals flagged but not edited, no item names them | 3 |

Verdicts moved in two ledger blocks: `lit-scourfield-2008.md` (E17, E18) and
`recon-0829-farfields2.md` (E20). `measure-tail-deficit-0829.md`'s ledger verdict
was edited at E13 but its answer, NO, is unchanged. `recon-0829-escapes.md`'s
ledger is untouched, since the red team asks for no verdict change there.

---

## 1. Item by item

Target files are all under `research/history/staging/`. Line numbers are the
red team's, taken against the files as they stood before this pass.

| id | target file:line | flag | state | reason |
|---|---|---|---|---|
| E1 | `measure-tail-deficit-0829.md`:191 | APPLY | **done** | the custody line now reads `--force`, 268 lines and 141.0 s by the header beside 140.9 s by the script's clock; the header on disk was re-checked and reads `body-lines: 268`, `elapsed: 141.0 s` |
| E2 | `measure-tail-deficit-0829.md`:206 | APPLY | **done** | runtime corrected to 141.0 s with the 113.4 s sieve split named |
| E3 | `measure-tail-deficit-0829.md`:209 | APPLY | **done** | the scrubbing claim is false, the `secs` column is printed in full; replaced with the wall-clock and `--force` account |
| E4 | `measure-tail-deficit-0829.md`, after 209's paragraph | APPLY | **done** | new paragraph disclosing the force and the clean `--check`, inserted after the paragraph ending "it computes less" |
| E5 | `measure-tail-deficit-0829.md`:116 | APPLY | **done** | provenance of the registered targets restated as exact from `W`, `D` and the ladder, agreeing with the rounded reciprocals |
| E6 | `measure-tail-deficit-0829.md`:389 | APPLY | **done** | applied together with E7 as one replacement, since the two strings are adjacent lines of the same sentence |
| E7 | `measure-tail-deficit-0829.md`:390 | APPLY | **done** | the truth tail counts 218 and 2 behind the 39.4 to 54.6 range are now printed with the 57.4 / 50.3 sensitivity |
| E8 | `measure-tail-deficit-0829.md`:629 | APPLY | **done** | "fails at that fold" is now "fails on that single draw" |
| E9 | `measure-tail-deficit-0829.md`, after 7b's maximum table | APPLY | **done** | the 40-draw scatter paragraph inserted between the maximum table and the tail-count paragraph |
| E10 | `measure-tail-deficit-0829.md`:663 | APPLY | **done** | the decline is now stated from u = 5 |
| E11 | `measure-tail-deficit-0829.md`:597 | APPLY | **done, with a choice recorded** | the red team says "pick whichever the producer prints"; `grep` over `research/measure-tail-deficit-0829.js` finds none of 0.5437, 0.5438 or 0.5435, so the figure is the note's own hand arithmetic and is set to 0.5438 = 395 / 726.414, the divisor the note's own band [0.5011, 0.5754] uses (364 / 726.414 and 418 / 726.414) |
| E12 | `measure-tail-deficit-0829.md`, section 3e | APPLY | **done** | the "What B is and is not" caveat appended to 3e, carrying the 2/q against 2/(q-2) rate term and the diagnostic status of M1b |
| E13 | `measure-tail-deficit-0829.md`, ledger verdict | APPLY | **done** | verdict now carries the far-tail qualifier, the 7.7 to 14.4 percent rate-matched reading, and the shallow-row reversal; the NO answer is unchanged |
| E14 | `lit-scourfield-2008.md`:79 | APPLY | **done, old string extended** | the red team's old string was extended backwards by its own lead-in clause "and its section 6 verdict says", because applying the replacement under that lead-in would attribute a section 5 fact to section 6, which is the defect E14 exists to remove; the lead-in now reads "and" and the replacement text is otherwise verbatim |
| E15 | `lit-scourfield-2008.md`:146 | APPLY | **done** | the quantifier is corrected to `o(1/ln y)`, strictly stronger than `O(1/ln y)` |
| E16 | `lit-scourfield-2008.md`:336 | APPLY | **done** | match row 8 is now NEAR MISS with the epsilon arithmetic and the narrowed correction |
| E16b | `lit-scourfield-2008.md`:81-84 | APPLY, directed | **done** | no string given in section 3, but red team section 1g names it: "section 4 row 8's 'MATCHES' and section 0's 'exactly the relative precision the open step needs' both over-state it". Section 0's sentence "**`O(1/log x)` is exactly `O(1/ln y)`, the relative precision the open step asks for**. The precision axis is therefore not the obstruction it was recorded as" is replaced by the right-register-one-epsilon-short reading, the `c/log x` arithmetic, and the statement that the surviving correction is the narrow one |
| E17 | `lit-scourfield-2008.md`:57 and ledger | APPLY | **done** | body and ledger both now read two fatal gaps plus one ambiguous; the verdict DOES NOT DELIVER is unchanged |
| E18 | `lit-scourfield-2008.md`, ledger | APPLY | **done** | "exactly the relative precision the open step needs" replaced by "the right register and one epsilon short of the o(1/ln y) the open step needs" |
| E19 | `recon-0829-farfields2.md`:466 | APPLY | **done** | "The corpus does not hold this" replaced by the half-holds reading naming `lit-pdf-holt-rudd.md` line 259; that line was opened here and does carry `a_j = (p-j-1)/(p-2)`, `b_j = j/(p-2)`, p.18 |
| E20 | `recon-0829-farfields2.md`, ledger verdict | APPLY | **done** | the bank clause now concedes the per-prime eigenvalue and banks only the product form, the numerical value and the rate |
| E21 | `recon-0829-farfields2.md`, section 3c | APPLY | **done** | the Vaaler overlap paragraph appended to 3c; the three quoted strings were checked present in `lemmaV-neighbours.md` and `smoothness-front.md` before insertion |
| E22 | `recon-0829-escapes.md`, section 6 table | APPLY | **done as a minimal carry** | a full `(i)/(ii)/(iii)` column would require grading all nineteen literature escapes against an audit whose section 2 grades this programme's own targets, which is a fresh judgement and not a citation. What is added is a three-row audit-label table for the rows the audit does settle (3d and 4c under item 10, 3e under item 3's quantifier distinction and section 1 Axis B), the red team's own reason quoted verbatim, and an explicit `[OPEN]` line saying the other sixteen carry no label and the full column is owed |
| E23 | `varE-theta2-proof.md`:411 | HOLD | **left for the orchestrator** | HELD note under review elsewhere; verbatim at section 2 below |
| E24 | `lit-smooth-divisors.md`, section 5 precision row | HOLD | **left for the orchestrator** | verbatim at section 2 below; its own precondition, that E15 and E16 land first, is now met |
| E25 | `research/SEARCH-CONVENTIONS.md`, section 1 | HOLD | **left for the orchestrator** | live document; verbatim at section 2 below |
| P1 | `research/measure-tail-deficit-0829.js`:1056-1074 | APPLY, code | **OWED** | readings 13 and 14 still carry the M-P1 failure and the not-run line that E8 and E9 reverse in the note; the exact instruction is at section 3 below |

**Three residuals flagged and not edited, because no item in section 3 names
them.**

1. `recon-0829-farfields2.md`'s title still reads "this corpus records only
   their eigenvectors", which E19 and E20 now contradict in the body and the
   ledger. Changing a note's title is outside what the red team asked for and is
   left to the orchestrator.
2. `lit-scourfield-2008.md` section 5 carries the draft row proposed for
   `research/SEARCH-CONVENTIONS.md`. E25 says that draft should carry the
   corrected precision clause before it lands, but E25 is flagged HOLD against
   the live document, so the draft in the staging note is left as written. The
   orchestrator may want it corrected in place at `lit-scourfield-2008.md`
   section 5, which is inside this pass's scope, at the same time it applies E25.
3. `lit-scourfield-2008.md` section 0 still quotes the need as "asymptotic with
   relative error `O(1/ln y)`". That string is verbatim from
   `lit-smooth-divisors.md` line 396's own need column, so it is left standing as
   a quotation rather than silently corrected. E15 shows the need is
   `o(1/ln y)`, so the source column at `lit-smooth-divisors.md` line 396 wants
   the same correction E24 asks for on the row beside it, and the two should move
   together.

---

## 2. Held items, verbatim, for the orchestrator

Reproduced exactly as red team C section 3e writes them.

> ### 3e. To live documents (HOLD)
>
> **E23, `research/history/staging/varE-theta2-proof.md` line 411 (HOLD).**
>
> old: ``u = 2`. `research/SEARCH-CONVENTIONS.md` applies: the words to search are`
>
> new: ``u in (2, 6]`, since `n in (2L, L^3)` and `ln y = (1/2) ln L`. `research/SEARCH-CONVENTIONS.md` applies: the words to search are`
>
> Reason: `lit-scourfield-2008.md` section 1 derives the range correctly and does
> not say that the file it cites states only the lower endpoint. HOLD because
> `varE-theta2-proof.md` is itself a HELD note under review elsewhere.
>
> **E24, `research/history/staging/lit-smooth-divisors.md` section 5's precision
> row (HOLD).** Add Scourfield's entry to the row, as
> `lit-scourfield-2008.md` proposes, but at the corrected register: `O(1/log x)`
> relative for the divisor-sum object, which is the right register and one epsilon
> short of the `o(1/ln y)` the open step needs. HOLD until E15 and E16 are applied
> to the source note, so that the two files do not disagree.
>
> **E25, `research/SEARCH-CONVENTIONS.md` section 1 (HOLD).** The row proposed at
> `lit-scourfield-2008.md` section 5 should carry the corrected precision clause
> before it lands: as drafted it says "asymptotics with relative error
> `O(1/log x)` DO exist in this convention ... so a negative searched on 'no
> asymptotics here' is wrong", which is right, and it should add that the register
> is still one epsilon short of the open step's `o(1/ln y)`, so that a future pass
> does not read the row as clearing the precision axis.

E24's stated precondition is now satisfied: E15 and E16 are applied to
`lit-scourfield-2008.md` in this pass, so the two files will not disagree once
E24 lands.

---

## 3. Owed producer items

One item. Nothing under `research/*.js` was read for edit, run or re-embedded in
this pass.

**P1. `research/measure-tail-deficit-0829.js`, readings 13 and 14.** The note's
section 7b now records, at E8 and E9, that the M-P1 failure at 19 -> 23 is a
single-draw artefact and that the registered prediction holds at all three folds
once averaged over 40 draws. The producer's own readings still say the opposite.
Reading 13 at lines 1056 to 1065 is headed "THE MAXIMUM-BASED SHARE IS DOMINATED
BY REALISATION NOISE AND M-P1 FAILS ON IT AT ONE FOLD", and reading 14 at lines
1067 to 1074 closes "A second draw at a different seed, which would price the
scatter that reading 13 blames, was NOT run."

Exact instruction, for whoever owns the producer:

1. Amend reading 13 to say that M-P1 fails on the single draw taken here and
   that red team C's 40 draws of each word at 19 -> 23 give a shuffled maximum
   of 296.1 (sd 29.1, range [246, 384]) and a Markov maximum of 264.0 (sd 18.4,
   range [234, 324]), so this run's 276 is the 32.5th percentile of the shuffled
   law and its 288 the 90th of the Markov law, and the share from the two draw
   means is 34.9 percent, inside the registered band.
2. Amend reading 14's closing sentence, since the second draw has now been taken
   outside this producer; either point it at
   `research/history/staging/redteam-0829-measure-c.md` section 1b or fold a
   multi-draw loop into the producer itself and re-register the statistic.
3. Because both readings live in comments above the OUTPUT block, either change
   moves `code-sha256`. Re-embed with
   `node research/qc/embed.js --timeout 7200 --force research/measure-tail-deficit-0829.js`
   and, once the block is replaced, update the note's section 2 custody figures
   at E1, E2 and E4 to the new header, since this pass wrote the 268-line,
   141.0 s header into the note.

The red team's own reason, quoted: "A note that identifies the cheap check that
would decide its own reported failure, prices it, and then reports the failure
anyway has left the reader with a conclusion its own next paragraph retracts."

---

## 4. The gate

`node research/qc.js`, the fast gate, run twice: once immediately after the last
edit above, and once after this note was written.

The first run returned **TOTAL 1**, and the single finding was
`tail-does-not-belong-to-this-code` at `research/measure-g2z2-0829.js:432`,
"code changed since the tail was embedded". That file is not in this pass's
scope, is being worked by another agent, and no edit here touches it; no `.js`
file was opened for writing in this pass. The second run returns **TOTAL 0**,
that finding having cleared between the two runs from outside this pass.

```
  refs             0 finding(s)
  quotes           0 finding(s)
  crosslinks       0 finding(s)
  scripts          0 finding(s)
  transfers        0 finding(s)
  calibration      0 finding(s)
  absence          0 finding(s)
  sourcing         0 finding(s)
  embeds           0 finding(s)
  widths           0 finding(s)
  ledger           0 finding(s)
  provenance       0 finding(s)
  search-convention     0 finding(s)
  TOTAL            0
```

No finding in either run names any of the four notes edited here or this note.

The two checks that would catch a defective edit both pass. REFS is clean, so
every pointer added at E9, E12, E19, E21 and E22 resolves to a file and a
section. QUOTES is clean, and the three literature strings inserted at E14, E19
and E21 were separately checked present at their cited files before insertion:
"Not ABSENT-PER-CONVENTION either" at `lit-smooth-divisors.md`, "after Vaaler
completion and the reciprocity split" at `lemmaV-neighbours.md`, "the Vaaler
coefficients clear Pascadi's condition maximally but buy nothing" at
`smoothness-front.md`, and the bidiagonal-matrix sentence at
`lit-pdf-holt-rudd.md` line 259. LEDGER is clean at 443 of 443 notes, so the
three verdict lines edited here still parse.

One caution the gate cannot raise: `lit-pdf-holt-rudd.md` line 259 writes the
eigenvalue with Unicode minus signs, `a_j = (p−j−1)/(p−2)`, and the red team's
replacement string quotes it with ASCII hyphens inside backticks. The quotation
is the red team's own text and is applied verbatim; the difference is one of
character encoding and not of content.

---

## 5. For `research/history/CHANGELOG.md`

Red team C's section 3 was applied to the four HELD notes it named. Twenty-two of
its twenty-five items targeted those notes and all twenty-two landed, twenty-one
as the exact replacement strings the red team wrote and one, the audit-label
column asked of `recon-0829-escapes.md`, as a minimal carry that labels only the
three rows `attack-wrongdirection-audit.md` settles and records the other sixteen
as owed. One further edit was applied to `lit-scourfield-2008.md` section 0 from
the red team's section 1g, which named the over-statement but gave no string.
Three verdict lines moved: `lit-scourfield-2008.md` went from three independently
fatal gaps to two plus one ambiguous and dropped its claim that Scourfield's
`O(1/log x)` is exactly the precision the open step needs,
`recon-0829-farfields2.md` conceded that the per-prime eigenvalue is already on
disk at `lit-pdf-holt-rudd.md` line 259 and banked only the product form, and
`measure-tail-deficit-0829.md` qualified the constraint's share as a far-tail
reading that reverses at shallow abscissae. That note also recorded its custody
correctly for the first time, at 268 lines and 141.0 s with the undisclosed
`--force` now disclosed, and recorded that its reported M-P1 failure at 19 to 23
is a single-draw artefact. Three items flagged HOLD against
`varE-theta2-proof.md`, `lit-smooth-divisors.md` and `research/SEARCH-CONVENTIONS.md`
were left untouched and carried verbatim to the orchestrator, and one producer
item was left owed, since the producer's readings 13 and 14 still carry the
reversed M-P1 verdict and correcting them needs a forced re-embed. The fast gate returned one
finding on the first run, in another agent's file, and zero on the second.
