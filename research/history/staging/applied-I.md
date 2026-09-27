# Wave 3, partition I: the flagship split, and the three defects inside it

<!-- ledger
id: Q-applied-wave3-I
status: ANSWERED
todo: none
question: Was the flagship paper split as wave 3 partition I directed, and what did the split expose?
verdict: Split into paper/moire-primes.md and the new paper/wall-note.md, with every deliberate change to moved text word-diffed; three open defects sit inside the split, two of them already landed and one not, and the judgement calls are listed so they can be overruled.
-->

Scope: `paper/moire-primes.md` and one new file, `paper/wall-note.md`. Nothing
else was edited. Nothing was committed and nothing was pushed. Line numbers
below are post-edit unless marked "old".

Sources read in full before touching anything: `qc-CAMPAIGN.md` §"State at the
end of wave 2", `qc-papers2.md` (the 23-finding report), `applied-C.md` §`paper/`
(the wave-2 applier that owned this file), `applied-D.md` and the paper-relevant
handoff tables of `applied-E.md` and `applied-F.md`, `paper/PAPERS.md`,
`research/qc/README.md` and `research/qc/checks.js`. Primary artifacts opened
rather than trusted: `research/anchored-calm.md`, `research/NATAL-CAP-CAMPAIGN.md`
§4, `research/covering-dive.md` §3.3, `research/sift-limit-attack.md` §0.

## qc.js, before and after

| | refs | quotes | crosslinks | scripts | transfers | total |
|---|---|---|---|---|---|---|
| before | 0 | 1 | 0 | 2 | 13 | 16 |
| after | 0 | 1 | 0 | 2 | 13 | 16 |

`refs` and `crosslinks` are at zero before and after, which was the gate. The
corpus was being edited by other partitions throughout, so the totals move for
reasons that are not mine: the `quotes` finding cleared mid-session and a
different one opened at `research/OBSERVATIONS.md`:675, and `research/qc/checks.js`
itself changed under me. What is mine: **`paper/` contributes zero refs, zero
quotes and zero crosslink findings, before and after**. The one `transfers`
finding inside `paper/` is still the pre-existing `anchored-note.md`:26 versus
`staircase-note.md`:32 pair, unchanged and untouched. **The split introduced no
new finding of any class.**

## Line counts

| file | before | after |
|---|---|---|
| `paper/moire-primes.md` | 1,097 | 778 |
| `paper/wall-note.md` | — | 362 |

The flagship is 29% shorter. The suite total rises by 43 lines, which is the
price of a child header, two section leads, two stub pointers and the two
paragraphs that now exist in a stub form as well as a worked-out one.

## The split, and where the boundary was drawn

**The headings did not move.** `## 7. The wall, surveyed: five doors` and
`### 7A. The wall, located: four faces with coordinates` are byte-identical to
what they were, at their own numbers. Every inbound pointer that names §7 or §7A
still resolves, and `refs` confirms it mechanically.

**What moved to `paper/wall-note.md`:**

- §1 of the note: the five door paragraphs, old `:448-577`, and the raw-data
  paragraph that closed §7, old `:589-595`.
- §2 of the note: the four face paragraphs, old `:611-802`.

**What stayed in the flagship, verbatim:**

- §7's parity-problem paragraph, old `:428-434`. It is the reason the section
  exists and it is seven lines. Irreducible.
- §7's two-moiré conclusion and the blockquote, old `:579-587`. This is the
  paper's native-form restatement of the conjecture, promised by name in the
  abstract at `:36` and echoed in the coda at `:713`. A flagship whose body never
  states its own headline reformulation would be a worse paper, not a shorter
  one, so this stayed.
- §7A's own opening parenthetical, old `:599-609`.
- §7A's closing summary, "What the four faces have in common", old `:804-811`.
  That paragraph already says in one clause each what every face establishes, so
  it is the roster the stub needs and no paraphrase was written to replace it.

**What was rewritten:** old `:436-446`, the door-failure map, replaced by
`:436-450`. See the audit below.

**The two stubs.** §7's is `:428-450` plus the retained conclusion, §7A's is
`:465-490`. Both are longer than the 6-to-15-line target in the brief, and the
reason is the brief's own harder constraint: a reader of the flagship alone must
learn that there are five doors and four faces, what each is called, and which
are open. Naming five doors and four faces and saying where each stops does not
compress below about twenty lines without dropping one of them. The retained
conclusion accounts for the rest of §7's stub and is a claim, not a stub.

## Every deliberate change to moved text, and the word diff that proves it

Each block was written to the scratchpad before and after and compared with
`git diff --no-index --word-diff`. The full output of all four diffs is
reproduced in the session scratchpad. Below is every difference the diffs found.
There are no others.

**Doors block, old `:448-577` plus `:589-595`. Two changes, both repointings.**
Bare section references to the parent had to be made explicit or they would read
as references to the note's own sections:

- `(§8, Paper III)` became ``(`paper/moire-primes.md` §8, Paper III)``.
- `House-blindness (§4)` became ``House-blindness (`paper/moire-primes.md` §4)``.

Nothing else differs. Every constant, every calibration marker, every level
stamp and every script citation is byte-identical, including Door 2's
*Retracted, and left visible* block and Door 5's expert-read note.

**Faces block, old `:611-802`. Two changes, both the same repointing.** `(§9)`
in Face 1's Maier paragraph and `, §9)` in Face 2's Holt-fusion parenthesis both
became ``paper/moire-primes.md` §9`. Nothing else differs. The protected honesty
passage, Face 3's double self-reversal on K*, is byte-identical at
`paper/wall-note.md`:288-296.

**§7A's opening parenthetical, kept in the flagship. Three word-level changes,
all forced by the move:** "Each face below is" lost "below", since the faces are
no longer below it; "Calibration is marked throughout" became "throughout the
note"; "stay visible" became "stay visible there". No claim changed.

**§7A's closing summary, kept in the flagship. Four insertions, no deletions.**
The four face names were inserted, because the original wrote "Face 1 says…",
"Face 2 says…" and named none of them, and the brief requires a flagship reader
to learn what each face is called. The diff is pure insertion.

**Old `:436-446`, rewritten.** The old paragraph carried eleven content items and
named no door. The replacement carries all eleven and names all five. Item by
item, with where each landed:

| # | item | in `:436-450`? |
|---|---|---|
| 1 | the five are not independent of each other | yes |
| 2 | they do not all fail at the last step | yes |
| 3 | Doors 1 and 4 are one classical object at two truncation depths, Door 4's union bound is Brun (1919)'s first line, Door 1's budget is what Brun's truncation tames | yes, verbatim |
| 4 | Doors 1, 3 and 5 run to a final inequality | yes, verbatim |
| 5 | Door 2 fails structurally at x = 11 | yes, verbatim |
| 6 | Door 4 reverses on the numbers before any limit is taken | yes, verbatim |
| 7 | naming where each route stops is the point of the survey | yes, verbatim |
| 8 | three parts, calibration of each stated separately: mechanism, toll, where it stops | yes, verbatim |
| 9 | a door is a route and never a result | yes, verbatim |
| 10 | no door may be cited for a number except through its toll | yes, verbatim |
| 11 | a toll always carries the levels it was measured or certified at | yes, verbatim |

The word diff's only deletions across the whole paragraph are "The five",
superseded by the explicit roster, a comma, and the word "below". Both stub and
note carry item 8, because the note has to tell its own reader how to read a
door; that is the one deliberate duplication in the split and it is thirteen
words.

## The three open defects: two were already landed, one was not

The brief named P-11, P-3 and S-3 as open and told me to check whether wave 2
landed them first. It landed all three. Each was verified at the home document
rather than taken from `applied-C.md`.

**P-11, Door 5: LANDED, verified, no edit.** The door now states the
distinct-moduli hypothesis, states that our classes `{0, −2 mod q}` violate it,
cites Klein–Koukoulopoulos–Lemieux (2024) Theorem 3 as the theorem that does
cover multiplicity 2, prints **no numeric constant at s = 2**, marks the
translation inferred, and names the gap (KKL is about ℤ; a zone is a finite
interval). Checked against `research/covering-dive.md`:91-92, which is the home:
the paper's statement of Theorem 3 matches the home's verified-from-PDF quotation
word for word on the bound, and the home's `[INFERRED]` marker on the translation
is reproduced. The paragraph beginning **"This door wants an expert read before
it goes anywhere"** is intact and travelled to
`paper/wall-note.md`:148-155. **I did not touch the door's strength.** See the
handoff list.

**P-3, Face 4: LANDED, verified, no edit.** "Missing exactly one ingredient" is
gone. The text now says that at the measured working point s/u ≈ 1.2, outside
the range s ≤ u that Lemma V is stated in, so the operative assumption is a
Gaussian maximal law for the sawtooth, and that this maximal inequality is the
whole price of the route. Checked against `research/sift-limit-attack.md`:47-53,
which declares itself the home and the authority for exactly that distinction;
the paper now says what the home says. The word "maximal law" now exists in the
suite, which was the second half of the defect.

**S-3, §8 versus Face 2: LANDED, verified, and one residual found and fixed.**
§8 no longer calls the anchored calm an unexplained bias in the helpful
direction; it says the mechanism is proven and the calm is uncorrelated with
survival, which is what Face 2 says. The two sections describe the same object
and now agree. Settled against `research/anchored-calm.md`, which grades the
mechanism PROVEN at all x and all q and says in terms that the calm is not a
route to the conjecture.

**The residual, which was live.** `applied-F.md`'s handoff C-5 to partition C
was applied only in half: the pointer gained `research/anchored-calm.md` but the
count "four places" survived. `research/NATAL-CAP-CAMPAIGN.md`:77-83 is
unambiguous, headed **"THE ANCHORED CALM — one sighting, not four"**: the
campaign found the tile quieter or luckier in four places and exact control
dissolved three, leaving the anchored per-prime strike variance at 0.34 to 0.62×
ensemble. The flagship was claiming four surviving sightings where one survives.
Fixed at `:589-593`, with the surviving sighting named and its measured range
printed, and with the three dissolutions stated rather than deleted. The
0.34-to-0.62 figure is read off the home, not off any summary.

## Other changes

`:598`, §8's pointer `(§7A, Face 2)` for corr(VR, S) ≈ 0 now reads
``(`paper/wall-note.md` §2, Face 2)``, because that measurement moved. §7A is
still cited by name everywhere else it is cited.

The note gains one sentence the parent never had, at
`paper/wall-note.md`:147-148, introducing the raw-data paragraph, which in the
parent followed the two-moiré blockquote and would otherwise have landed in the
note straight after Door 5's expert-read note with no lead-in. It asserts nothing
the paragraph does not already assert.

## Judgement calls, listed so they can be overruled

1. **The two-moiré conclusion stays in the flagship.** Argued above. The
   alternative, moving it, would make the split cleaner and the paper worse.
2. **The raw-data paragraph goes to the note.** It is toll-grade measurement,
   8% and 2.0× and 1.96 and 2.02 with a script citation, and it is the one
   paragraph in §7 that is data rather than argument. Its closing sentence, "the
   wall exists only in what can be certified, never in the statistics", travels
   with it rather than being orphaned from its evidence.
3. **The β table did not stay in the flagship.** Ten values across ten levels is
   the paper's most striking single artifact and it is now one hop away. This is
   the judgement most worth a second opinion, and it interacts with the
   spine question below.
4. **The note is one file, not two.** The doors and the faces overlap by
   construction, the §7A parenthetical says which face is which door, and
   splitting them would put that sentence across a file boundary.
5. **The stubs run past the brief's line target.** Argued above.
6. **The note's sections are numbered 1 and 2, not 7 and 7A.** Its own numbering
   is what a reader of the note sees; the parent relationship is carried by the
   Parent line and by both stubs. `refs` resolves `wall-note.md` §1 and §2.
7. **New prose avoids "we".** `paper/PAPERS.md`:187 permits authorial "we" in the
   math papers and the moved text is full of it, unchanged. The house rule in my
   brief forbids it, so every sentence I wrote does without. The result is not
   inconsistent in tone, but the two rules do disagree and Chris owns that.

## Handed to the shepherd: outside my files

1. **`research/SCRIPTS.md` is now stale and needs `node research/qc.js --index`.**
   Its "cited by" column attributes `attack-04-fourier-budget.js`,
   `attack-07-certificate-ceiling.js`, `removal-ledger.js`,
   `natal-cap-24-boundK-curve.js`, `attack-09-chen-theta.js` and others to
   `paper/moire-primes.md`; every one of them is now cited from
   `paper/wall-note.md` instead. No script lost its citation, so `qc.js scripts`
   is unaffected and still reports the same two banner-title findings.
2. **`paper/PAPERS.md`:21 is stale.** Paper I's contents line still promises
   "the five-door survey of the parity wall with measured numbers at each door".
   The survey is still Paper I's; the measured numbers are now in the companion
   note. PAPERS.md is not mine and I did not touch it. It should also gain a line
   for `wall-note.md` under Paper I.
3. **`TODO.md`:360-367 item 12** describes the split as pending and lists it
   alongside the em-dash job. The split half is done. Not my file.
4. **`README.md`:122-123** points at "`paper/moire-primes.md` §7A" for the four
   faces. It still resolves and still reads correctly, since §7A still names all
   four. Worth a pointer to the note, but it is not wrong and it is not mine.
5. **`research/qc/checks.js` `crosslinks`** treats `paper/PAPERS.md` as an entry
   point. `paper/wall-note.md` is reachable from both stubs, so it needs nothing,
   but any future paper child must be linked or it will trip the check.

## Handed to Chris

1. **Door 5's claim strength, which is P-11's open half.** The citation is now
   correct. How much the door claims is not settled and I did not settle it, per
   the brief. The door's infinite half rests on a 2024 theorem with no computed
   constant at multiplicity 2, its finite half on Ziller and Morack's measured
   1.90·x·ln²x over 21 exact terms plus a literature search that came back empty.
   The door says all of that in place, at `paper/wall-note.md`:148-155, and says
   that neither statement is a bound we could hand a referee. This wants an
   expert read, and the note now makes that visible on the page rather than in a
   staging file.
2. **Whether §7A becomes the paper's spine.** `paper/PAPERS.md`:112-116
   recommends it and `qc-CAMPAIGN.md`:342-345 records it as CHRIS-DECIDES and
   explicitly separate from the split. **This split moves in the opposite
   direction**, and I want that said plainly rather than discovered: the most
   original section of the flagship is now the one that lives outside it. The
   split is reversible in one edit, since the note's two sections are the old §7
   and §7A bodies unchanged, so nothing here forecloses the spine decision. But
   if the answer is yes, the note gets folded back and something else gets cut
   instead.
3. **The "we" conflict**, item 7 above.

## What I did not do, and why

- **I did not touch any file but `paper/moire-primes.md` and the new
  `paper/wall-note.md`.** Four stale sites outside them are listed above.
- **I did not restate Door 5.** The brief forbade it and the campaign's own
  decision at `qc-CAMPAIGN.md`:347-353 keeps the door in place with its gap
  named.
- **I did not re-audit the twelve `qc-papers2` findings that wave 2 landed
  inside §§7 and 7A.** I verified the three the brief named, at their homes, plus
  the one residual I found while doing so. The other twelve are recorded as
  applied in `applied-C.md` and were not independently re-derived here. If a
  spot-check of that work is wanted, P-1 and P-12 are the two worth the money,
  since P-1 was the campaign's only false claim and P-12 is a constant.
- **I did not renumber anything.** §7 and §7A keep their numbers, per the
  pointer-safety rule.
- **I did not commit and did not push.**
