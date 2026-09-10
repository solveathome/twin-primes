# phase1-W1b — applying the unapplied findings, partition B (the research notes)

<!-- ledger
id: Q-phase1-W1b
status: ANSWERED
todo: none
question: Which unapplied wave-6 findings on the research notes were still live, and what did applying them change?
verdict: Most of wave 6 was already applied, so the yield is the residue plus one code defect nobody had fixed: a3-05-bound-L.js's truncated cyclic replay was printing a FALSE PASS on kappa(m) <= L+2 at fold 7, and fixing it kills a claim; the gate reads 0 findings across all seven checks at hand-back.
-->

**Headline: the corpus had already applied more of wave 6 than the brief assumed —
all fifteen of partition U's findings and Y-4 and V-1 were live on disk this
morning — so the real yield of this pass is the residue those sweeps left behind,
and the single most consequential item is a code defect nobody had fixed: the
truncated cyclic replay in `a3-05-bound-L.js`, which was printing a FALSE PASS on
`kappa(m) <= L+2` at fold 7.**

Scope: `research/*.md` and unowned `research/*.js`, excluding the eleven files and
three trees the brief reserved. Sources: `qc-wave6-{U,V,W,X,Y}.md` and the ten
`attack-block-*.md`, read after `attack-block-00-ADJUDICATION.md`.

`node research/qc.js` at hand-back: **0 findings across all seven checks.** The
tree was at 1 finding when I started (`level-ledger-tight.md`:261, an unverified
absence claim), so the gate is one better than I found it.

---

## The extraction list: 40 findings whose target file is mine, plus the brief's code item

| source | findings landing on my files |
|---|---|
| `qc-wave6-U` | 15 (U-1 … U-15; `ATTACKS.md` + `ATTACKS2.md` are wholly mine) |
| `qc-wave6-V` | 4 (V-1, V-3, V-18's index item, V-18's `:200` item) |
| `qc-wave6-W` | 1 (item 4, `SCRIPTS.md`'s script count) |
| `qc-wave6-X` | 2 of section E (E7 `sift-limit-attack.md`, E9 `ATTACKS2.md` row 7) |
| `qc-wave6-Y` | 16 (Y-2, Y-4, Y-5, Y-6, YA-2, YA-6, YB-1, YB-2, YB-3, YB-4, YB-6, and YB-7/9/10/11/12) |
| attack blocks | 1 addition (block 9's `max A` constant) + the L ≤ 111 check, which needed nothing |
| **live handoff** | 1 (`natal-cap-31-calm-vs-kill.md`:197) |
| **brief item 4** | 1 (`a3-05-bound-L.js`'s maxsum truncation — a code fix, not a report finding) |

**Of the 40, eighteen were already applied on disk before I started.** That is
the single most useful thing this report can tell the next wave, and it inverts
the brief's premise. Partition U's report opens "**every prior finding against
`ATTACKS2.md` is still live, verbatim**" — that was true when U wrote it and is
false now; commit `760a558` swept both files, and commit `5c1ac06` took YB-1.
Re-reading the target before applying a report's finding saved eighteen wrong
edits.

**Counts: 21 applied (20 findings + the code fix), 2 refused, 18 already applied,
9 handed back.** A third refusal is recorded below against my own first attempt
at the code fix.

---

## THE THREE THAT CHANGE WHAT SOMEBODY DOES

### 1. The `a3-05-bound-L.js` truncation was printing a false PASS, and fixing it kills a claim

The brief named the symptom: the T_5 maxsum row printed `12,24,30,42,48,0,0,0`
where the cyclic truth for the gap word 6, 12, 12 is `12,24,30,42,54,60,72,84`.
It was annotated and not fixed. It is now fixed, re-run and re-pasted.

The annotation's own impact assessment was right about Theorem B and **understated
everything else**. Two functions carried the defect, not one — `runTile`'s
`min(N,128)` for the maxsum table and `kappaProfile`'s `min(N,64)` for kappa, and
the annotation named only the second while describing the first. With both fixed:

| reading 9, fold 7 | before | after |
|---|---|---|
| true kappa(1..8) | 2 2 2 1 0 0 0 0 | **2 2 4 4 5 5 6 6** |
| Theorem C | 2 2 3 3 2 1 1 1 | 2 2 4 4 5 6 6 8 |
| printed verdict | `kappa(m)<=L+2 OK` | **`kappa(m)<=L+2 FAIL`** |

**So `kappa(m) <= L + 2` has a second and larger counter-example than the corpus
knew.** It was recorded as failing only at fold 11 (L = 1, kappa(6) = 4). At fold
7, L = 2 and kappa(7) = kappa(8) = 6 — a miss of 2, hidden by the truncation.
Applied to `a3-05-bound-L.md` §9 and to `U-FRAME.md` §10, the two sites that state
the refutation.

**Three independent confirmations, none of them the fixed code.** (i) The cyclic
gap word by hand gives the maxsum row. (ii) A brute force written from the
definition over eight unrolled periods of 210, sharing no code with the script,
returns `kappa(1..8) = 2 2 4 4 5 5 6 6` and `true L = 2`. (iii)
`attack-block-07-kappa.md` §2 computed the same row on its own code and printed
the disagreement — "7 over T_5 | 2 2 4 4 5 5 6 6 | a3-05 reading 9: 2 2 2 1 0 0 0
0 | m >= 3 differ". **The attack was right and this file was wrong, and nobody had
adjudicated which.**

**What I tried and rejected, because it matters more than what I applied.** My
first fix extended the replay on every short tile. It made T_7 *worse*: the
fold-11 moment fraction went from 4/29 = 0.1379 to 6/39 = 0.1538 against a true
cyclic 2/15 = 0.1333, which I computed directly from T_7's gap word. The replay
biases every fraction on a short tile and the bias is not monotone in replay
length. I narrowed the fix to fire only when one copy is too short for the longest
window — T_5 alone — and the run confirms it: exactly nine printed lines move, all
of them T_5 or fold-7. **The phase bias on short tiles is a separate, pre-existing
defect and is logged in the code, not fixed.** The right fix counts only windows
whose start lies in the first N gaps; it would move T_11 and T_13 as well.

Custody: pasted OUTPUT block re-generated, then the script re-run a third time and
the pasted bytes string-compared against the fresh run — 272 lines, **0 mismatches**
with elapsed timers normalised. The new block lists all nine moved lines with their
old values beside the new.

### 2. A "clean" verdict in a staging report is an artifact a later wave trusts

Three of my applied findings sit on rows a prior wave marked clean, and the
mechanism is the same each time.

- **`localized-04-maxsum.md` "to within 6%" is 11.9%.** The file prints its own
  refutation one screen away: `R/EV ∈ [0.981, 1.110]`, `[1.038, 1.119]`,
  `[0.990, 1.064]`. Not one of the three grids reaches 6%; the narrowest is 6.4%.
  `applied-P.md` row 43 marked it "clean at both ends" — P checked that the SCOPE
  (`m ∈ [2 lnD, 1024]`) travelled intact to `U-FRAME.md` and never compared the
  value against the interval beside it. Corrected at all four sites.
- **`a3-05-bound-L.md`'s Markov band "0.32 to 0.44" is 0.32 to 0.48.** Reading 6's
  column opens at 0.4762. `applied-P.md` row 13 marked it clean because
  `kappa-not-L.md` "agrees" — but that second site descends from the same reading,
  so the agreement carried no evidential weight. Both corrected, and each now says
  the other is not independent.
- **`ATTACKS2.md`'s verdict still said 0.2–0.6% after row 1 and `GLOSSARY.md` were
  both fixed to 0.1–0.6%.** Fix applied at two of three sites; the survivor was the
  campaign-verdict sentence, which is the one a reader lifts. Same shape as YB-5.

If one instrument comes out of this: **a `clean` row must name what was compared
against what.** "Scope travelled" is not "value checked".

### 3. Two monotone claims in one document break at @19, and only one of them was written up

This is the live handoff, and I verified both ends before applying. Confirmed at
the artifact: `natal-cap-35-x-multiplicity.js`:616 prints X(0)/X̄ = **0.9558** at
@19 against 0.9482 at @17, so the sequence is 1.4541, 0.9908, 0.9482, 0.9558 —
down twice, then up. Applied at `natal-cap-31-calm-vs-kill.md`:197 with three
things the adjudicator asked to travel with it, all re-verified here:

- **The provenance qualifier.** cap-35's @19 row is a **u-form means row, not a
  sweep**. The u-form is checked against brute force at @11, @13, @17 and passes
  all three (`[u-form vs sweep: PASS]`); the @19 line carries no such tag because
  the sweep is what the u-form replaces there (cap-35 readings, :679-681).
- **The pattern, not the coincidence.** The *same document* already records max VR
  breaking at @19 in the same direction — 2.78, 2.35, 2.14, **2.293** — a hundred
  lines above. One was written up as a correction and the other left standing.
  Wave 5 logged the ρ case as a third instance. The entry now says so.
- **β does not break**, and the entry says that too: 1.1458, 1.0089, 0.9549,
  0.9261 at the same four levels, and ten levels to 0.846 at @41 in
  `paper/anchored-note.md`. The X-channel turns; the anchored bias does not.

**One thing worth recording that the handoff did not mention: the break was
predicted in advance.** cap-35's header P5 says "since X̄/S̄ grows like the overlap
capacity, X(0)/X̄ must flatten back toward 1 even while β keeps descending.
Predicted: the 'descending through 1' reading of X(0)/X̄ = 1.45, 0.991, 0.948
breaks at @19." The script called it, ran it, and the home document never read its
own artifact's header. That is a different defect class from a stale trend and
should be logged as one.

No fifth site. Grepped the four figures and the phrase across `research/`,
`paper/`, `TODO.md` and `README.md`; the only other hit is `TODO.md`:316, which
already says X(0)/X̄ "crosses 1 and flattens" and is consistent.

---

## The rest, unranked

**Applied (14 more).**

| # | file | before → after |
|---|---|---|
| YB-2 | `a3-05-bound-L.md`:228 | "within one at all **seven** folds" → within one at five of **eight**; folds 17, 29, 31 miss by 1.51, 1.02, 1.38 |
| YB-6 | `certificate-engine.md`:82 | tail conjecture routed to `TODO.md` **11(b)** → **8(b)**; 11(b) is Siegel-Walfisz, a different object. Verified against `TODO.md`:303-306 |
| YB-7 | `localized-04-maxsum.md`:283 | "x/(4m̄) = **15 to 18** folds" → **13.9 to 15.3**; the 18 is the §7 heuristic printed next to it in the script |
| YB-10 | `localized-04-maxsum.md`:324 + script reading 13 | "at x = **1009**" → **997**; 2p′ = 2018 forces p′ = 1009 hence x = 997. Conclusion unchanged, M = 2052 clears both |
| YB-11 | `level-ledger-tight.md`:248 | "\|S(1)\|/2 = ∏\|cos\|·2^{π(x)−1}" → that product **is** \|S(1)\|; checked at x = 11, 1.29666 against a printed 1.297. Third ratio 0.0334 → **0.0335** |
| YB-12 | `localized-04-maxsum.md`:266 | 9.6 ln x column "66.2, **78.7**" → 66.3, **78.3** |
| Y-2 | `theta-ladder.md` §1 | custody warning added: which half of `sift-limit-lemmaV.js` S6 is void, that the θ column this file owns is the surviving half, that the log carries no flag and the CHANGELOG no entry |
| Y-5 | `natal-cap-30-skeleton-bound.md`:5 | "1.5e−7 @19" → "@19 over a **58-of-435 sample chosen to include every exception**", beside a neighbouring clause that does say "all 164 primes" |
| Y-6 | `anchored-calm.md`:53 | "between **9% and 11%**" → the four signed values **+9.2%, −0.9%, −10.8%, +5.5%**, "of either sign", which is the home's own safe wording |
| YA-2 | `ZONE-POSTULATE.md`:307 | "the lemma carries an **unstated third hypothesis**" → the lemma has **one**, S ≤ y′²; the threshold is the **Corollary's**. Last live body instance of a framing `CHANGELOG.md`:744 and :843 retired |
| YA-6 | `ZONE-POSTULATE.md`:191 | "above **2.05** at every z from 37 to 71" → "at least **2.0495**"; z = 37 is exactly 2.0495 |
| V-3 | `FOLD-PROFILE.md`:393 | three sampling conventions named (0.8926 = fp-05 at y = 14,929; 0.8927 = fp-06's u = 2.000 row; 0.8929 = fp-06's y = √W summary). **Corrects wave 5's S2-19**, which called 0.8929 a digit slip; it is fp-06's number |
| V-18 | `FOLD-PROFILE.md` §10 | index stopped at 11 and said "All eleven"; **12 to 16 added with one line each and the negative result they carry**, "All sixteen … 34.6 s for the whole family" |
| V-18b | `FOLD-PROFILE.md`:200 | "**1.0000** from Y = 10³p² to the end" → 1.0000, **0.9989**, 1.0000, 1.0000 |
| — | `ZONE-POSTULATE.md` §4 | ADDITION, not a correction: the "call it ln³p to be safe" guard now carries block 9's **max A = (0.49 ± 0.09)·ln³v**, with an explicit custody warning that the generating scripts are in a scratch directory and not in this repo |

**Refused (2 from the list, plus 1 against myself). A refused finding is a result.**

1. **W item 4, `SCRIPTS.md`'s count. REFUSED — the premise is stale on both
   halves.** W reported "Scripts: **128**" against 132 `.js` files. The file now
   reads **129**, and I regenerated it to check: `gen-scripts-index.js` reports
   129 and is *correct*, because discovery comes from `qc/corpus.js`, which
   deliberately excludes three tooling files — `qc.js`, `gen-scripts-index.js` and
   `gen-natal5-17tile-scour.js`. I enumerated the difference rather than assuming
   it. The generator's own header records that this exact double-count was the
   first defect the framework caught. **I reverted the regeneration**: it changed
   152 lines, all citation tallies, the count did not move, and another agent's
   commit re-stales them within the hour.
2. **YB-9, `certificate-engine.md`'s Li-versus-π band "2–5%". REFUSED — cannot
   verify at the artifact.** YB cites "5.4, 2.2, 0.9, 0.3 % over @13…@23" from
   `natal-cap-28-analytic-certificate.js`. Those four numbers are not in that
   script by any grep I could construct; what the script *does* carry, at :37, is
   the identical "~2-5% at these small ranges" the `.md` has. So the two sites
   agree and neither is checkable from here. YB itself rated it MEDIUM and noted
   "'these small ranges' is not pinned to the level list". Not applied.
3. **The first form of my own `a3-05` fix. REFUSED against myself**, and it is the
   near-miss worth reporting: extending every short tile's replay moved T_7's
   fold-11 fraction *away* from its true cyclic value. Caught by computing the true
   value directly rather than by assuming a longer replay is a better one.

**Already applied before this pass (18), listed so nobody re-checks them.**
All fifteen of `qc-wave6-U` (U-1 … U-15, both `ATTACKS.md` and `ATTACKS2.md`,
including X's E9 Pierre Cami b-file note at row 7 — the one survivor was U-11's
third site, applied above); `Y-4` (`NATAL-CAP-CAMPAIGN.md`'s "K\*(x) at @23" open
lead, now struck with its own artifacts); `V-1`'s `a3-06-origin-vs-max.js` half
(the false A6 lemma now carries a dated CORRECTION block pointing at the Head
Lemma); and `YB-1`, the c_min sign, applied in commit `5c1ac06`.

**Handed back (9), with the exact text where I have it.**

1. `paper/moire-primes.md`:565 — still "verified to **0.2–0.6%**". Should read
   **0.1–0.6%**; the four deviations are 0.17, 0.11, 0.56, 0.60%. Last site of
   three; `ATTACKS2.md` and `GLOSSARY.md` are now correct.
2. `research/PRIOR-ART.md`:274 (YB-5) — "**Twelve** arXiv manuscripts read or
   searched in full text" under a heading declaring a **fourteen**-row sweep
   COMPLETE. R-4's fix landed at four of five sites and the survivor is the
   coverage guarantee itself, which is the sentence the novelty boundary rests on.
3. `research/PRIOR-ART.md`:381 (YB-8) — "We reached Iwaniec 1978 without ever
   citing Erdős 1962. **Should be cited.**" It is cited five times now.
4. `research/oeis-G2-submission.md`:37 — states the reduction as
   `a(n) < prime(n+1)^2 - prime(n)` where the settled form is `G₂(x#) < x′² − 2`.
   Held under the moratorium; not opened.
5. `research/oeis-seam-submission.md` CROSSREFS (X-E8) — should list **A367739**
   and probably **A384545**. Held; not opened.
6. `research/natal-cap-10-sieve-cap.md`:227 (X-E1) — "Riesel–Vaughan, BIT 23
   (1983)" → **Arkiv för matematik 21 (1983), 45–74**.
7. `research/natal-cap-10-sieve-cap.md`:47 (X-E3) — "twin side by halving" is not
   how Wu gets 3.3996; half of Theorem 1's 7.8209 is 3.910.
8. `research/covering-dive.md` — four bibliographic corrections, X-E2/E4/E5/E6/E10
   (DHR book authorship, Cummings–Filaseta–Trifonov now published, the corrigendum's
   real cause, Vaughan PEMS pages, Granville arXiv:2010.01211).
9. `research/history/` items — Y-1, Y-3, Y-7, Y-8 and YA-1/3/4/5 all target
   `WAVE7-RESULTS-2026-08-15.md`, `TODO.md`, `G2-STATE.md` or `GLOSSARY.md`.
   Y-1 is the one I would move first: "sup|R|/(H·M) stays between 0.025 and
   0.106" against a seventh full-period row at **0.5965**, 5.6× outside.

**The L ≤ 111 correction needed no application in my partition.** Grepped
`research/*.md`, `paper/*.md` and `TODO.md` for `L <= 62 / 111 / 120 / 158` and
every Unicode variant: **zero hits anywhere**. None of the four disputed values
ever reached a body document. Nothing to correct and nothing to hand back.

---

## COVERAGE — what I did not reach, what I could not prove, where I am most likely wrong

**What I did not reach.**

- **`research/audit-numbers.js` was not run** (~152 s, and the brief reserves the
  full gate). Several of my edits change printed numbers that instrument may check:
  the Markov band, the 6% → 12% tolerance, the 0.8929 citation, 78.7 → 78.3.
  YB's sweep recorded it passing 90/90 and firing on none of this class, so I
  expect it silent — **but that is an expectation, not a measurement.**
- **`localized-04-maxsum.js` still has not been re-executed by anybody.**
  `qc-slopes-K.md`:32 records it unrun in a prior wave and YB did not run it
  either, so its pasted output has now gone **three** waves unre-executed while
  three of my corrections were checked against that output. If the pasted block is
  stale against the current code, every one of those corrections inherits the
  staleness. This is the largest single hole in this report and it costs one run.
- **`level-ledger-tight.js`'s printed slips were annotated, not fixed.** Its OUTPUT
  block is a merge of a 30.7 s run with the R\*(19) row from a 2,717 s `--deep`
  run, so a plain re-run and re-paste would silently drop the deep row. The right
  fix is a `--deep` re-run, which I did not price.
- **I did not open `a3-04-maxsum-recursion.js`'s own output** beyond confirming it
  drops T_5 from its tables by an explicit filter (`:110-111`), which is why the
  corrected T_5 maxsums do not disturb A4's "covers every measured case".

**What I suspect and could not prove.**

- **The replay phase bias is corpus-wide and larger than anyone has priced.**
  `a3-05-bound-L.js` computes gap-fraction statistics over `N + EXT − 1` gaps
  instead of the N cyclic ones. At T_11 (135 slots, 128 replayed) that is nearly a
  factor two of over-counting, and at T_13 about 8%. I proved it matters at T_7
  (0.1379 printed against a true 0.1333) and stopped there. **Every fraction in
  readings 6 and 7 for T_11 and T_13 is suspect at the third digit and I did not
  quantify it.**
- **The @19 break may be three instances of one thing, not two.** X(0)/X̄ and max
  VR both turn at @19; wave 5's ρ case is logged as a third. If @19 is where a
  systematic effect switches sign rather than where three short runs happen to end,
  that is a finding about the fourth level and not about three sentences. I wrote
  the entry to say the pattern exists and deliberately did **not** claim a
  mechanism, because I have no evidence for one.

**Where I think I am most likely wrong.**

1. **The narrow `a3-05` fix is a judgement call and could be the wrong one.** I
   fixed T_5 and left T_7's known-biased fractions alone, on the ground that
   extending T_7 made a checkable number worse. A reviewer could reasonably say the
   whole window-counting scheme should have been made exactly cyclic in one pass.
   I chose the smaller blast radius because this campaign's own lesson 13 is that
   corrections introduce corrections. **If that call is wrong, it is wrong in the
   direction of leaving a known defect in place, and I have named it in the code.**
2. **The `ZONE-POSTULATE.md` §4 addition imports a number this repository cannot
   reproduce.** `max A = (0.49 ± 0.09) ln³v` comes from scripts in a deleted
   scratch directory. I judged the adjudication's independent survival of the
   figure sufficient and wrapped it in an explicit custody warning, but this is
   exactly the shape of U-12's `growth.txt` defect — a cited artifact that is not
   in the repo — and a reviewer may prefer it removed rather than caveated.
3. **My "already applied" count rests on reading the files, not the commits.** I
   confirmed each of the seventeen by opening the target and finding the corrected
   text, which is the right check. I did **not** verify that the applied wording
   matches what the finding asked for in every case; for U-1 through U-15 I read
   both files end to end and am confident, but I spot-checked rather than diffed.
