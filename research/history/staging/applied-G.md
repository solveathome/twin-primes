# applied-G.md — wave 3, partition G

<!-- ledger
id: Q-applied-G
status: ANSWERED
todo: none
question: Which wave-3 partition G findings were applied, and what did the pass find on its own?
verdict: Applied to the eleven owned files: the OEIS off-by-one confirmed and provable four ways, a factor of two found in the seam draft's Hardy-Littlewood heuristic, the L gap corrected in three files from a flat 0.58 ln p to the home's 0.58 to 0.95 ln p range, seven orphans swept, and one supplied answer refused as wrong before it reached a header banner.
-->

Files owned and edited: `research/a3-03-f-from-census.md`,
`research/a3-05-bound-L.md`, `research/a3-09-histogram-operator.md`,
`research/localized-04-maxsum.md`, `research/localized-single-alignment.md`,
`research/level-ledger-tight.md`, `research/exponent-control.md`,
`research/discrepancy-two-class.md`, `research/OBSERVATIONS.md`,
`research/oeis-G2-submission.md`, `research/oeis-seam-submission.md`, the header
banners of six `research/*.js`, and the regenerated `research/SCRIPTS.md`.
Nothing outside that list was touched.

**Gate.** Before: refs 0, quotes 1, crosslinks 0, **scripts 2**, transfers 13.
After: **0, 0, 0, 0, 0**. The two `scripts` findings were mine and are closed.
The single `quotes` finding was routed to me mid-run and is closed. `refs` and
`crosslinks` held at zero across a session in which `U-FRAME.md` was split into
three new children under me.

**Lead with what must be decided or routed:** §6 below. The one item that is not
cleanup is a second externally-visible error in `oeis-seam-submission.md`, a
factor of two in a stated Hardy-Littlewood heuristic, found by the method that
found W3 and proved four ways.

---

## 1. Part 2, the OEIS off-by-one: W3 confirmed, and it is provable four ways

W3 was reproduced from scratch before applying, not taken on trust
(`scratchpad/verify-oeis.js`). It stands, and two of the four confirmations were
not in the report:

| # | confirmation | result |
|---|---|---|
| 1 | brute-force count of twin candidates mod P, n = 1..6 | 1, 1, 3, 15, 135, 1485 = `A059861(n)` exactly; `A059861(n-1)` gives 1, 1, 1, 3, 15, 135 |
| 2 | the file's own fitted constant | `m = P/A059861(n)` reproduces `maxgap-law.md`'s `c2'` row digit for digit, both range endpoints included. See §1a: the brief's *phrasing* of this proof was garbled, the proof is not. |
| 3 | **the file's own EXAMPLE** (new) | "twin candidates mod 30 are 11, 17, 29" is three at n = 3; `A059861(3) = 3`, `A059861(2) = 1` |
| 4 | **the file's own provenance table** (new) | it already records the slot counts as `A059861 = 6226553025` (n = 11) and `217929355875` (n = 12), which are `A059861(11)` and `A059861(12)`. The table and the prose contradicted each other inside one file. |

Both occurrences fixed. The qualifier "for n >= 2" went with them: it was an
artifact of the wrong index, and with `(n)` the identity holds from n = 1
(verified by brute force at n = 1).

### 1a. The second proof, reproduced rather than quoted

The shepherd is right that the brief garbled this, in two ways, and right that
0.4814 at CV 9.5% appears nowhere. Here is the computation and the output, so the
record carries the reproduction and not the conclusion.

Computed: the extreme-value fit `a(n) = c·m·(log P − log m)`, solved for c at each
n over n = 5..12, using the twelve DATA terms of `oeis-G2-submission.md` and
`m = P/A059861(idx)`. Script: `scratchpad/verify-oeis.js`.

With **`idx = n`**, the eight values are

    0.5004, 0.4469, 0.4707, 0.4559, 0.4577, 0.4463, 0.4791, 0.5939

giving **mean 0.4814, sd 0.0490, cv 10.2%, range [0.4463, 0.5939]**.

That is `maxgap-law.md`:66 verbatim — "c2' diff-2 G2, p in [11,37] n= 8
mean=0.4814 sd=0.0490 cv=10.2% range [0.4463, 0.5939]" — and the same row in
`two-class-lower-bounds.md`:437 and `G2-STATE.md`:223. **Both range endpoints
match**, which the mean and CV alone would not have shown.

With **`idx = n-1`**, the same fit gives 0.1007, 0.0605, 0.0430, 0.0344, 0.0270,
0.0200, 0.0194, 0.0196: mean 0.0406 at cv 69.4%, and a monotone collapse rather
than a constant.

**The two garbles.** First, 9.5% is the *population* sd of that fit (dividing by
n rather than n−1); the corpus quotes the sample sd, 10.2%. `qc-refs` used the
population convention throughout, which is also why its "CV 65%" for the `(n-1)`
case is 69.4% in the sample convention. Second, the four-digit constant is not in
either `oeis-*.md`. The submission draft rounds to "c averages 0.48 … coefficient
of variation of 10%", one significant figure, which is consistent with either
convention; 0.4814 lives in `maxgap-law.md`, `two-class-lower-bounds.md` and
`G2-STATE.md`.

**So the second proof exists and is stronger than the brief stated**, once
restated as: the OEIS draft's rounded 0.48/10% is the corpus's `c2'` row, and
that row reproduces only with `A059861(n)`. It is not "0.4814 at CV 9.5% in the
submission file", which is not a thing. Recorded this way so nobody re-derives
the discrepancy.

The fix does not rest on it in any case: proofs 1, 3 and 4 are independent of the
fit and each settles the index on its own.

**Everything else in both drafts was re-checked against oeis.org** (`curl` with
`fmt=text`; WebFetch does get a 403, as W3 noted). Reproduced independently and
correct: DATA and the EXAMPLE, `a(n) >= A048670(n)` and the ten measured ratios
2.00 … 8.00, `a(n)/(p log²p)` in [0.66, 1.13] with mean 0.89, `a(n)/prime(n+1)²`
from 0.222 to 0.314 with max 0.314 < 0.32, the FGKMT bound as A048670's own
comment states it, the 21/12/58 term counts, and the seam file's companion
sequence against A060256 digit for digit.

Three further defects found and fixed, listed with the reasoning in
`changelog-add-G.md`: the stale A288815 comparison list (ended at n = 10 with
twelve terms in DATA), the ambiguous `[A002110(n+1) is in A057706 + 1]`, and the
A087651 gloss, which called a sequence of primorials a sequence of twin primes.

**One checked non-defect, recorded so it is not "fixed" later.** The gloss
"A288815 and A072753 (paired Jacobsthal function, all even differences)" looks
wrong, because A072753 is named "Maximum gap in two-stage prime-sieves" and is
defined by a free choice of two residues per prime. It is right:
`A288815(n) = 6·A072753(n) + 6` at all nineteen shared terms, verified against
both sequences as fetched. One object in two coordinates. I nearly corrected it.

---

## 2. The new finding: a factor of two in the seam draft's HL heuristic

Not in any report, found by reproducing the file's own numbers.

`oeis-seam-submission.md`:47-52 stated the per-seam twin probability as
`(2*C2 / log²(k*P)) * ∏_{2<p≤prime(n)} p/(p-2)` and the expected count as
`e^{2γ}·prime(n+1)·(log prime(n) / log P)² / 2`. Both are wrong by a factor of
two, and it is one error propagated:

- The twin candidates mod P have density `A059861(n)/P`, which is
  `(1/2)·∏_{2<p≤p_n}(1−2/p)`. The stated probability drops the 1/2, i.e. the
  contribution of the prime 2.
- Carrying it through: `P/A059861(n) ~ e^{2γ}log²(p_n)/(2C2)`, so the twin
  constant `2C2` cancels exactly and the expected count is
  `e^{2γ}·p_{n+1}·(log p_n / log P)²`, with no `/2`.

Checked against the file's own twenty terms: corrected 57.3 by the asymptotic and
52.5 by the exact k-sum, against **48 observed**. The retired form predicted 26.3,
low by 1.8x. The corrected form is the one the data supports.

**And the repo already knew about this exact slip.** `research/audit-numbers.js`
line 63 carries a regression check labelled "the retired factor-2-slipped value"
on `e^{2γ}/(4C2) = 1.2013`, against the correct mean twin-slot gap constant
`e^{2γ}/(2C2) = 2.4026` (`a3-03-f-from-census.md`:55). It is the same 2, in the
same constant. The audit does not reach the OEIS drafts, which is why an
independent instance survived there.

I applied the fix, and I state plainly why I did not merely flag it: the error is
forced by two independent arguments (the density identity and the twenty-term
count), it sits in a COMMENTS field addressed to an OEIS editor, and the
corrected statement is *shorter* and checkable in one line. If the shepherd wants
a second pair of eyes on a heuristic before submission, this is the paragraph.

---

## 3. Part 1, the residual history migration

Every removal is in `changelog-add-G.md`, verbatim, with file and line. Summary:

| file | what went |
|---|---|
| `level-ledger-tight.md` | the 21-line agent-to-parent handoff block (`:47-67`), "branch `opus-try`", two "the briefing" sentences, one heading |
| `exponent-control.md` | five "the briefing" sites plus one orphan |
| `localized-single-alignment.md` | "the brief asked", "was my wrong frame", one heading |
| `a3-09` | "the brief's skeleton", "the **corrected** budget" |
| `a3-05` | "all previously proven", "now used to the last unit" |
| `a3-03` | "before this morning" |
| `discrepancy-two-class.md` | "branch `opus-try`", the retired 8-draw parenthesis |
| `localized-04-maxsum.md` | "night" |
| `OBSERVATIONS.md` | the 32-line triage statement |

**The handoff block, and the one judgement call inside it.** The block claimed
"nothing was edited" while all three of its items had been applied. Items 1 and 3
are gone outright: FOLD-PROFILE.md:73 now heads the column "K-level bound
4·3^{π(x)−1}" and :79 states the K-level convention, and item 3 was a note about
where a file moved. **Item 2 I kept, restated as a scope note on the custody row
it qualifies rather than as a correction owed to another file.** Reasons, both
checked: `FOLD-PROFILE.md`:110-119 carries the three maxima and the conclusion
but *not* the primes attaining them (47, 149, 37) or the ranges searched, and
`discrepancy-two-class.md` §9 cites this file's §1 for the refutation. Deleting
it would have destroyed unique data and orphaned a live inbound pointer.
`FOLD-PROFILE.md` is not mine, so relocating the columns there was not available.

**Dates in headings, U3.** I applied a narrow reading and it is a judgement call.
Every one of my files carries a header date beside a companion script whose
pasted OUTPUT block is stamped with the same date, so a reader does use it to
date another artifact: those dates stay. What went is the process words welded to
them, "night" and "branch `opus-try`". No U3 site named in `qc-history` falls
inside my partition. Two that do not are listed in §6.

**Attribution to Chris is untouched everywhere**, including
`exponent-control.md`:177, where only the route being rejected was renamed.

---

## 4. The orphan sweep: seven found, all the predicted shape

All seven are the wave-1 inverse: the claim was fixed correctly in the sister
document and the note about fixing it stayed, so the note attributes to that
sister a statement it no longer makes. Every one is invisible to `refs` by
construction. Each was verified at both ends, and every negative grep was checked
against a known positive of the same pattern first.

| # | site | what it quoted | what the sister says now |
|---|---|---|---|
| G-O1 | `a3-03-f-from-census.md`:47 | U-FRAME's "the smallest qualifying value is about 2p" | `U-FRAME.md` §10 and `kappa-not-L.md`:24 both say "exactly **2p ∓ 2**, not 'about 2p'". U-FRAME carries the sharpened form *and* the disavowal. |
| G-O2 | `level-ledger-tight.md`:49 | FOLD-PROFILE §2's column headed "Möbius bound" | `FOLD-PROFILE.md`:73 heads it "K-level bound 4·3^{π(x)−1}". Dissolved with the handoff block. |
| G-O3 | `exponent-control.md`:219 | "1.62, comfortably below the critical 2" | The phrase is in **no** working document. `U-FRAME.md` §6a now states the frame correction itself and cites this file back; `THE-DIALS.md` §6 carries 1.57/1.567. A second instance of the orphan partition E fixed in `two-class-lower-bounds.md`, uncaught until now. |
| G-O4 | `localized-04-maxsum.md`:392 | U-FRAME §9 "one rung, no ladder" | §9 now reads "**Solid, and a hole that has since closed.** The growth law of maxsum_m is no longer missing", citing this very file as what closed it. |
| G-O5 | `level-ledger-tight.md`:97 | discrepancy-two-class §9's "loose end worth one hour" | §9 is headed "Loose end, since settled" and cites `level-ledger-tight.md` as what settled it. Mutual: the two files agreed and only the quotation was dead. |
| G-O6 | `discrepancy-two-class.md`:299 | FOLD-PROFILE §3 "reads it as 'the base is nearer 2 than 3'" | §3 says "No exponential base should be fitted to either sequence". |
| G-O7 | `OBSERVATIONS.md`:675 | GLOSSARY's "the grain census awaits a law" | GLOSSARY's grain entry states the law and links `grain-census.js`. Routed to me by the shepherd; both ends checked before deciding. |

**Two stale pointers, which look like orphans and are not.**
`localized-04-maxsum.md`:291 and :305 pointed at `U-FRAME.md` §11 for Theorem B's
structural cap and for the A9 tail fit. Per the shepherd's routing I checked
whether the moved text survived the move rather than assuming it. It did,
verbatim: `kappa-not-L.md`:85-86 carries "**Theorem B is structurally capped**,
since maxsum_m ≥ G₂ always, so it can never prove L below G₂/(3p) ≈ 0.18x" word
for word, and `operator-and-pair-count.md`:38 carries the fit as
`−0.235 + 1.2992·(2p′/m̄)`. So these are pointer repairs, not quotation repairs,
and I repointed at the two child documents rather than at a U-FRAME section
number, because U-FRAME's §§10-12 were being rewritten under me and the children
are the stable homes that U-FRAME §10 itself names.

**One near-miss recorded so nobody "fixes" it.** `discrepancy-two-class.md`:299
says "across five folds" beside six listed values. That is correct: the six
values sit at x = 7, 11, 13, 17, 19, 23, which is five fold steps, and the
geometric mean the sentence quotes, 1.655, is `(16.9/1.36)^(1/5)` exactly. I was
one edit from breaking it.

---

## 5. Part 4, scope and status

**The dominant defect class showed up on schedule, and it hit three files at
once.** `a3-05-bound-L.md`:254, `a3-09-histogram-operator.md`:184 and
`a3-03-f-from-census.md`:112 all stated the L gap as a factor **0.58 ln p**. The
home states a range: `gate-multiplies.md`:466 and `U-FRAME.md` (three sites) all
say **0.58 to 0.95 ln p** (0.18/0.31 and 0.18/0.19), and U-FRAME §9 adds that
"since ρ is not monotone in the level neither end can be presented as the one the
trend favours". Three files agreeing was not three sources: all three descend
from `gate-multiplies.md` §8 as it read before the range was measured. Fixed in
all three, with the reason carried in a3-05, which is the home of the three.

I checked `gate-multiplies.md`:384 and :494, which also read `0.58 ln p`, and
they are **not** defects: :384 carries the two-ended parenthetical two lines
below it, and :494 is a claim about the branch, which 0.58 against 0.95 does not
change. No edit, and it is outside my partition anyway.

**A second scope flattening, and my own two files disagreed because of it.**
`localized-04-maxsum.md`:121 quoted LOCALIZED-GAP §5's "M/(k ln³x) flat in 1.2 to
1.6" with the scope stripped. Its home scopes it in the line above: "k = 3,
window Y = x³, 61 folds to x = 307". And `localized-single-alignment.md` §5 — the
same partition — carries the same object to x = 1613 and records M/ln³x reaching
6.41, outside the band, with P1 marked REFUTED as stated. The scope now travels
with the quotation, and the pointer to the deeper ladder with it.

**`exponent-control.md`, cross-document check.** Every outbound claim was checked
against its home: `two-class-lower-bounds.md` §5's 1.11-1.25 falling with range,
`h2-scoping.md` §5b's −0.09 and its 3.4 months / 85 years costing and eight
reproduced terms, `maxgap-law.md`'s `(log p)^{0.12 ± 0.03}` on the top 41 terms,
`paper/beta2-note.md`'s 4.2665, `U-FRAME.md` §6a's 1.653 on 21 terms (present,
verified), and `THE-DIALS.md` §0 (readings 1 and 3 verbatim, reading 2 present as
the margin table). One defect found, G-O3. Also verified against oeis.org: 58
terms of A048670 out to p = 271, 21 of A288815 out to p = 73, and the custody
line `A288815 = 6·A072753 + 6` at all nineteen shared terms.

**`OBSERVATIONS.md`: the approved edit and nothing else.** The 32-line triage
statement is now the rule in two operational sentences plus a pointer to
`THE-LENS.md` §5, which owns it and carries every removed part — the CRT
argument, the working test, and the Holt Conjecture 2.1 payout. The ten entries
are untouched, entry 5 included.

**I did not apply three `qc-history` items for this file**: `:253` "REFUTED
**same day**", `:624` "the bench session of 2026-08-15", and `:655-659`'s session
self-assessment. The wave-2 verdict ("leave it exactly as it is … one edit only")
post-dates and overrides them, and my brief restates that verdict in terms. The
G-O7 fix at `:675` is a fourth site of the same kind that the shepherd routed
explicitly, so I treated it as a second approved edit rather than as reopening
the file. **If the shepherd wants those three after all, they are three
one-liners and the replacements are already written in `qc-history.md`:448-450.**

---

## 6. Outside my files: seven items handed back

Nothing below was touched.

1. **`web/PROPOSAL.md`:25 carries a stale CLAIM, not just a dead quotation.** It
   lists "the framework's open questions" as including "the grain census 'awaits
   a law'". The law is settled (`grain-census.js`, `GLOSSARY.md`). This is worse
   than the OBSERVATIONS instance I fixed, because it presents a closed question
   as open in a document about what to publish. **Highest-priority item here.**
2. **`web/bench/README.md`:121-123** still reads "GLOSSARY.md **still said** the
   grain census 'awaits a law', **which was true when written and stale by the
   time of the grain session**". `qc-history.md`:457 wrote the disposition for it
   in wave 1 and it was never applied. Third site of the same orphan.
3. **`research/LOCALIZED-GAP.md`:155 and `research/G2-STATE.md`:397** both carry
   G-O4's dead quotation, "described there as one rung with no ladder", pointing
   at `U-FRAME.md` §9. Neither is mine. They and `localized-04-maxsum.md` are
   three descendants of one home, so fixing one did not fix the class.
4. **U3 sites still open**: `research/two-moire-argument.md`:40 "(2026-08-14,
   **later same day**)", which `qc-history` named explicitly, and
   `research/THE-DIALS.md`:235 "## 6. What a sufficient gap bound actually costs
   (2026-08-17)".
5. **`research/certificate-engine.md`:11 says the cap-28 banner is false** and
   names it: "There is no 'fully analytic certificate law', and nothing here is
   'closed'." I retired the banner (G-4), so that sentence now describes a title
   that no longer exists. It needs a pass, and the file is not mine.
6. **The `SCRIPTS.md` title column truncates at the first banner line, silently.**
   The generator takes the title from one `//` line and caps long ones with an
   ellipsis, but a title wrapped across two comment lines is cut mid-sentence
   with no ellipsis at all. `natal-cap-30`'s old banner had exactly this defect,
   and two of my first drafts reproduced it before I caught it in the regenerated
   output. I worked around it by keeping every title on one line. **The generator
   should either join continuation lines or flag a wrapped banner**, because the
   failure is silent and looks like a short title.
7. **`natal-cap-30-skeleton-bound.js` certifies @11..@23; its @29 comes from
   `natal-cap-36-skeleton-door.js --at29`.** I applied G-3's "@11 through @29"
   because it matches the companion prose title verbatim and cap-36's @29 pass is
   CERTIFIED (G30_agg = 0.1176, 7,863 primes), and because the script's own line
   208 already states the finer scope. Flagging it so the choice is visible: the
   banner now names a level the script itself does not compute.

---

## 7. The one supplied answer I refused, and why

**G-1 as supplied was wrong, and it would have entered a header banner.**

Supplied: `Cov_adj < 0: the anticorrelation **proven** in aggregate, refuted
uniformly in q`.

`natal-cap-23-covadj-proof.md`'s own status table ends with "**[OPEN]** the
aggregate theorem Σ_q 2Cov / Σ_q (V_A+V_B) < 0 for all x: needs provable
equidistribution of the spectral weight", and the script's reading 7 is "NEXT
STEP: prove the aggregate form". Cap-23 does not prove the aggregate; it is what
cap-26 and cap-30 were written to attack, and even there the result is
**certified at every computed level**, not proven for all x — which is exactly
what G-3's own replacement text says two rows down in the same handover table.
The supplied G-1 would have contradicted the supplied G-3.

Applied instead: `NATAL-CAP-23 — Cov_adj < 0: certified in aggregate, refuted
uniformly in q`. One word changed, the parent's structure kept, and the
calibration now matches both the script's own verdict lines (aggregate
2Cov/(V_A+V_B) = −0.287, −0.389, −0.399, −0.374 at four levels) and
`applied-F`'s own E-1 text, which grades the same object "**CERTIFIED at six
levels**".

G-2, G-3 and G-4 were verified and applied. G-2 and G-3 match their companion
prose titles verbatim. G-4 is corroborated line by line against
`certificate-engine.md`'s status table: one PROVEN Certified-Head Theorem, two
unproven ingredients (Tail Comb Equidistribution Conjecture, **OPEN**; Buchstab
Transfer Hypothesis, **HEURISTIC**), and "Deep-Level K\* Predictions | PREDICTED,
conditional on the two unproven ingredients".

**G-5, the two untitled scripts.** Titles written from the code and its own
output, not invented. `exponent-control.js`: "the exponent of G2(x#), calibrated
against a control whose answer is known", with the control named on the line
below. `audit-numbers.js`: "every load-bearing number recomputed independently,
retired values included" — the last clause matters, because the retired values
are checked, not merely mentioned (line 63 asserts the superseded 1.2013, line
348 prints the retired G2(41#) bands), and that is the enforcement behind the
changelog.

`research/SCRIPTS.md` was regenerated **last**, after the header edits and after
partition I's `paper/wall-note.md` landed, so it picked up both. cap-28's empty
companion column is filled: I added "Companion prose: certificate-engine.md" to
its header, which is the mechanism the generator reads, rather than editing the
generated table. 128 scripts, 0 orphans.

---

## 7a. Coverage: what is complete and what is not

Asked for an honest list rather than an implication of full coverage. I did not
run out of room; every file got a full read.

**Part 1, the residual history migration: COMPLETE on ten of eleven files.**
`a3-03`, `a3-05`, `a3-09`, `localized-04-maxsum`, `localized-single-alignment`,
`level-ledger-tight`, `exponent-control`, `discrepancy-two-class` and both
`oeis-*.md` are done. A grep over all eleven for "the brief", "briefing", "this
session", "the agent", "for the parent", "nothing was edited", "was my", "same
day", "corrections to the", "opus-try" now returns **three hits, all in
`OBSERVATIONS.md`, all deliberate**:

| line | text | why left |
|---|---|---|
| 232 | `## 3. A closed form for the half word instead of the whole — REFUTED same day` | `qc-history`:448 wanted "REFUTED"; the wave-2 verdict says one edit only |
| 613 | table header "the route taken **this session**" | `qc-history`:449's site, same reason |
| 657 | "The one thing **this session** surfaced that nobody has examined" | `qc-history`:450's site, marked AMBIGUOUS there, same reason |

So Part 1 is complete except for three one-line rewords in one file, left because
my brief and `qc-CAMPAIGN`:995-1000 both say `OBSERVATIONS.md` gets one approved
edit. The shepherd routed a second (G-O7); these three would be a third, fourth
and fifth. **They are yours to authorise, replacements already written in
`qc-history.md`:448-450, five minutes of work.** I would take them, since the
file now has two edits anyway and "REFUTED same day" is the sort of thing the
convention exists to remove — but that is the shepherd's call, not mine.

**Part 4, the scope-and-status pass: COMPLETE on all three named files.**

- `exponent-control.md` — every outbound claim checked against its home
  document, seven homes, listed in §5. One defect (G-O3), fixed. Also
  re-verified against oeis.org, since it is the file the OEIS drafts lean on.
- `discrepancy-two-class.md` — §9 checked against `FOLD-PROFILE.md` §3 and
  `level-ledger-tight.md` §1 at both ends; one defect (G-O6), fixed; one
  near-miss deliberately not "fixed" (the "five folds" count, §4).
- `OBSERVATIONS.md` — the approved triage shrink applied; the ten entries read
  and left, per the verdict; the shepherd's G-O7 fixed.

**What Part 4 did NOT cover, and this is a real gap, not a wording one.** The
scope-and-status pass was scoped to those three files. The 0.58-vs-0.95 defect in
§5 turned up in `a3-05`, `a3-09` and `a3-03`, which were only in Part 1's scope,
and I found it by accident while chasing an orphan. **Three files of mine got a
migration pass and an orphan sweep but not a systematic claim-by-claim
calibration check against their homes**: `a3-05-bound-L.md` (457 lines),
`localized-04-maxsum.md` (417) and `level-ledger-tight.md` (426). Given that a
targeted sweep of one number across three of them found a live flattening in all
three, I would not assume they are clean. That is the highest-value follow-up in
my partition and I am naming it rather than leaving it implied.

**Gate, final.** `node research/qc.js` — refs 0, quotes 0, crosslinks 0, scripts
0, transfers 0. `node research/qc/selftest.js` — exit 0, all eleven known
positives fire, both controls silent. **No `transfers` finding returned**, so
none of my edits touched either side of an adjudicated pair; I added nothing to
the ledger.

## 8. What I did not do

- **No .js content was migrated**, per the exemption. No READINGS block, no
  pasted OUTPUT, and no CORRECTION or superseded banner was touched. The six
  edits to scripts are six title lines and one added companion-prose reference.
- **I did not touch `U-FRAME.md`, `paper/moire-primes.md`, `FOLD-PROFILE.md`,
  `LOCALIZED-GAP.md`, `G2-STATE.md`, `gate-multiplies.md`, `THE-LENS.md`,
  `GLOSSARY.md`, `certificate-engine.md`, `web/`** or anything else outside the
  list at the top, including where I found work. It is all in §6.
- **I did not hand-edit `research/SCRIPTS.md`.**
- **I did not strip header dates that identify a companion script's dated
  output.** Judgement call, argued in §3.
- **I did not reopen `OBSERVATIONS.md` beyond its two approved edits.** The three
  `qc-history` one-liners for it are listed at the end of §5 if wanted.
- **Nothing was committed and nothing was pushed.**
