# CHANGELOG entries, wave 3 partition I (the flagship split)

<!-- ledger
id: Q-changelog-wave3-I
status: ANSWERED
todo: none
question: What changelog entries does wave-3 partition I, the flagship split, owe research/history/CHANGELOG.md?
verdict: Staged entries for the split of the flagship's wall chapter into the new paper/wall-note.md and the pointer repairs that split forces, in house form, newest first and grouped by the document changed.
-->

*(Staging file. The parent merges these into `research/history/CHANGELOG.md` in
one pass; appliers never edit that file directly. House form: newest first,
grouped by the document changed, each entry naming the claim as it stood, what
replaced it, and the artifact that forced the change.)*

---

## 2026-08-17: the flagship's wall chapter becomes a companion note

### paper/wall-note.md (new)

**Created as the child of `paper/moire-primes.md` §7 and §7A**, on the split
approved in the consistency campaign (`qc-CAMPAIGN.md`:337-345: Chris permits
breaking papers into sub-papers, with bidirectional crosslinks as the
condition). It holds the five door paragraphs and the four face paragraphs at
full grain, 362 lines, and the flagship falls from 1,097 to 778.

The condition of the split was that no inbound pointer breaks. Both headings
stayed in the flagship at their own numbers, with their text unchanged, so every
document that cites `paper/moire-primes.md` §7 or §7A still resolves;
`node research/qc.js` reports `refs` and `crosslinks` at zero before and after.

Every moved block was word-diffed against its original. The only differences the
diffs found are four bare section references made explicit, since `(§8, …)`,
`(§4)` and `(§9)` twice would have read as references to the note's own sections
once moved. No constant, calibration marker, level stamp or script citation
changed. Door 2's *Retracted, and left visible* block, Door 5's expert-read note
and Face 3's double self-reversal on K* all travelled byte-identical.

### paper/moire-primes.md §7

**"What this project adds is a *surveyed perimeter*: five independent routes,
each rigorous until its last step"** had already been retired in wave 2. The
paragraph that replaced it, the door-failure map, is now compressed into the
stub and gains the five door names, which it did not carry: Door 1 is Legendre's
budget (3ⁿ), Door 2 the Fourier budget (2ⁿ), Door 3 the moment ceiling, Door 4
the removal ledger, Door 5 coverings and constructions. All eleven content items
of the retired paragraph survive, audited one by one in
`research/history/staging/applied-I.md`. A flagship reader still learns that
there are five doors, what each is called, that Doors 1 and 4 are one classical
object at two truncation depths, that Doors 1, 3 and 5 run to a final inequality,
that Door 2 fails structurally at x = 11 and that Door 4 reverses on the numbers
before any limit is taken.

**The section's two-moiré conclusion and the blockquote, "The Scour never
achieves perfect local alignment with the Grain", stayed.** It is the paper's
native-form restatement of the conjecture, promised by name in the abstract and
echoed in the coda, and a flagship whose body never states its own headline
reformulation would be a shorter paper and a worse one.

### paper/moire-primes.md §7A

**Stubbed to the section's own opening parenthetical and its own closing
summary**, both verbatim but for four inserted face names and three words forced
by the move ("Each face below" lost "below"; calibration is marked "throughout
the note"; the reversals "stay visible there"). The summary already stated in one
clause each what every face establishes, so no paraphrase was written to replace
it. A flagship reader still learns that there are four faces and what each is
called: Face 1 the anchored bias, Face 2 the overlap channel, Face 3 certificate
depth, Face 4 the exponent.

### paper/moire-primes.md §8

**"the real tile is consistently *quieter* or luckier than its ensemble in four
places"**, which stood at `:910`. Replaced by the surviving count and the
measured range: the tile is quieter than its ensemble on the per-prime strike
variance, at 0.34 to 0.62× ensemble, and the campaign's other three sightings
dissolved under exact control. `research/NATAL-CAP-CAMPAIGN.md`:77-83 is headed
**"THE ANCHORED CALM — one sighting, not four"** and lists what each of the three
turned out to be: the sub-random house splits belong to every rotation rather
than to the anchor, the sub-CRT pair and triple overlaps are the dead origin plus
short-window arithmetic, and the drift toward 0.793·E is the anchored bias β,
a separate object. The flagship was claiming four surviving sightings where one
survives.

This is the unlanded half of `applied-F.md`'s handoff C-5. Wave 2 applied the
pointer half, adding `research/anchored-calm.md` beside the campaign scoreboard,
and left the count.

**`(§7A, Face 2)`**, the pointer for corr(VR, S) ≈ 0 at all three exactly
enumerated levels, is now ``(`paper/wall-note.md` §2, Face 2)``, because that
measurement moved.

---

## Checked and found already correct, recorded so the work is not repeated

Three defects the campaign carried as open inside this file were verified at
their home documents and needed no edit, all three having landed in wave 2.

**Door 5 and the distinct-moduli hypothesis (`qc-papers2` P-11).** The door
states that Hough (2015) and Balister–Bollobás–Morris–Sahasrabudhe–Tiba (2022)
require distinct moduli, that our classes `{0, −2 mod q}` use each modulus twice
so neither theorem applies to our object, and cites
Klein–Koukoulopoulos–Lemieux (2024) Theorem 3 as the theorem that does cover
multiplicity 2, **with no numeric constant available at s = 2**. Verified against
`research/covering-dive.md`:91-92, the home, which carries Theorem 3 verified
from PDF and marks the translation to our setting `[INFERRED]`; the paper
reproduces both the bound and the marker, and names the gap that matters, that
KKL says a multiplicity-2 system cannot cover ℤ and says nothing about covering
a finite interval, which is all a zone is.

**Face 4 and Lemma V (`qc-papers2` P-3, `qc-status` A-1).** "Missing exactly one
ingredient" is gone. The text says that at the working point the ladder measures,
s/u ≈ 1.2 sits outside the range s ≤ u that Lemma V is stated in, so the
operative assumption is a Gaussian maximal law for the sawtooth and that maximal
inequality is the whole price of the route. Verified against
`research/sift-limit-attack.md`:47-53, which declares itself the home and the
authority for that distinction.

**§8 against Face 2 on the anchored calm (`qc-papers2` S-3).** The two sections
describe the same object and now agree: the mechanism is proven, the anchor's
two strike classes being mirror-adjacent and gluing into a single cyclic window,
and the calm is uncorrelated with survival. Verified against
`research/anchored-calm.md`, which grades the mechanism PROVEN at all x and all
q and says in terms that the calm is not a route to the conjecture and must not
be read as one.
