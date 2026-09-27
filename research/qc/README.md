# qc: the body of work checks itself

Run it:

```
node research/qc.js              # the fast checks
node research/qc.js --full       # all three gates below, exits 1 if any fails
node research/qc.js refs quotes  # named checks only
node research/qc.js --pending    # also the two checks not yet in the gate
node research/qc.js --list       # what each check is, and what it caught
node research/qc.js --strict     # exit 1 if any finding survives
node research/qc.js --index      # also regenerate research/SCRIPTS.md
```

## The formal embed: why a pasted output is now evidence

Chris, 2026-08-18: *"not trust AI to copy correctly data over, but have a formal
embed"*. That is the difference between a rule and a mechanism, and it exists
because of the worst custody failure this corpus has recorded.

`research/attack-lower-bound.js` was written complete with an OUTPUT block and
eight numbered READINGS **before the file had ever been executed**. The agent ran
it once afterwards, said "several results differ from what I expected", began
repairing at the wrong end, and died on an API error. Ten figures in that tail
were wrong, two with the sign reversed, and not one of them appeared anywhere in
its own 140-entry transcript. **The code was correct throughout** and reproduces
byte-identically across four runs in two sessions. Only the transcription was
invented, and nothing here could see it: `qc.js scripts` confirmed the file
parsed, was titled and was cited, all true; `audit-numbers.js` never saw it
because the figures had not reached a document; and a reader saw a number, a
script beside it, and a plausible table.

So the transcription step is gone.

```
node research/qc/embed.js research/<file>.js [-- args]    run it, write the tail
node research/qc/embed.js --check research/<file>.js      verify without writing
```

The tool runs the script and writes the OUTPUT block itself. The block is the
run's real output, verbatim, because a reader has to be able to read it, and it
carries a fingerprint:

| field | what it binds | who checks it |
|---|---|---|
| `code-sha256` | every byte above the OUTPUT banner | `qc.js embeds`, statically, in milliseconds |
| `out-sha256` | the normalised stdout | `qc/tails.js`, by re-running |
| `invocation` | the exact command, arguments included | both, and a human |

`code-sha256` is what makes a tail non-transferable: edit the code and leave the
old output beside it and the gate says so, with nothing executed. It found
`05-twin-jacobsthal.js` the day it landed — committed code that stops at p = 23,
carrying a tail with a p = 29 row whose numbers are correct. Right numbers,
broken provenance, invisible to every other instrument.

**What embed deliberately does not do is write the READINGS.** Those are the
interpretation, they are the part worth a human's attention, and a tool that
generated them would invent exactly what this one exists to stop.

### Two things this does not cover, said plainly

**Code that is wrong but self-consistent.** An embed proves the output came from
the code. It says nothing about whether the code is right. That is
`audit-numbers.js` and the self-tests, and it always was.

**Readings.** `embed-backlog`'s `readings-not-traceable` ranks files by how many
figures in their READINGS are absent from their own OUTPUT block, and it is
**advisory and never gated**, because its false-positive floor is real: prose
arithmetic over printed values lands in it, as `a3-06-origin-vs-max.js`'s
"230.6M copy-slots" over a printed 214,708,725 does. Use it as a reading order,
not a defect list. The top of that ranking is where it earns itself: the first
two files it surfaced, `natal-cap-34-wrap-precision.js` and
`natal-cap-37-at41-march.js`, have OUTPUT blocks that are not output at all but
honest provenance notes saying the real logs live **outside this repository**.
That is a separate fragility — evidence that cannot be re-run — and nothing had
counted it before.

### The parser was blind to half the corpus, and the guard was inert there

**Recorded here because the failure was in the safety mechanism itself.** On
2026-08-19 attack 9 measured `tailfmt.outputText()` returning an **empty body**
for a large fraction of tails, which both consumers silently skip. Two shapes
were invisible: a legacy tail whose output begins on the line after `OUTPUT`
with no rule between (47 files), and one whose body is a `/* … */` block rather
than `//` lines (21 more). Three consequences, all measured: the migration
counter under-read by more than half; `qc/tails.js`, which then carried its own
copy of the parser, disagreed with this one on 29 scripts; and — the one that
matters — **`embed.js`'s guard against overwriting legacy evidence was INERT on
exactly those files**, demonstrated on a scratch copy where it exited 0 while
destroying a row. A safety mechanism with a silent hole is worse than none,
because it is trusted.

Fixed: a header is now recognised only when it announces itself, by a rule
immediately after `OUTPUT` or by carrying a `code-sha256:` line; `outputText`
reads both comment shapes; `tails.js` requires `tailfmt` instead of
reimplementing it. All 126 tails now parse with a non-empty body, and the guard
was re-tested on one file of each formerly invisible shape and refuses both.
`selftest.js` carries a fixture of each, which fire `hand-pasted-tail` — a
finding only reachable when the body parses — so a parser that goes blind again
fails there instead of silently.

### The migration, and its counter

Tails predate the mechanism. They are not accusations, they are a backlog,
and `embed-backlog` prints the count on every run so it stays visible and can
only fall. Re-embed a script when you next touch it, and when the count reaches
zero the corpus is bound end to end.

`node research/qc/tails.js` is the dynamic half and is slow, so it is not in the
fast gate. Its first full pass, at a 20 s per-script tier: 89 scripts reachable,
**28 reproduced every figure**, 34 had at least one figure absent, 27 were too
slow for the tier, none failed to run. The dominant causes in the 34 are
structural rather than dishonest — argument-driven scripts run with arguments
nobody recorded, and overnight runs pasted from logs — which is exactly what the
`invocation` field now removes.

## The gate is three commands, not one

| command | what it establishes | cost |
|---|---|---|
| `node research/qc.js` | the checks below find nothing | 0.4 s |
| `node research/qc/selftest.js` | those checks still fire on defects we know are defects | instant |
| `node research/audit-numbers.js` | every load-bearing number recomputes, retired values included | ~152 s |

**Run all three, or `--full`, before believing the corpus is clean.** This is not
belt and braces. Through four waves of the campaign `qc.js` printed TOTAL 0 while
`audit-numbers.js` was failing 2 of its 39 checks, because nothing ran it and
nobody remembered it existed. **A green gate that omits an instrument is a partial
green, and a partial green read as a full one is precisely the defect class this
framework exists to catch, committed by the framework itself.**

Worse, and found the same day: `audit-numbers.js` printed `FAILURES:` and then
**exited 0**. It reported failure in prose and success in its exit code, so every
wrapper, every CI and every agent that trusted the exit status saw a pass. It now
exits 1, verified by injecting a wrong expectation and confirming the status. An
instrument whose verdict lives only in its prose cannot be gated on, and a gate
nobody can automate is a gate somebody eventually skips.

The fast gate is under half a second, so there is no reason not to run it before
committing a documentation change. Run the full gate before believing a wave is
finished, and whenever you have touched a number.

## Why this exists

The consistency campaign of 2026-08-17 found that this corpus's characteristic
defect is not a wrong number. It is a claim that was **fixed in the research
layer while the summary layer above it went on asserting the old thing.** Three
independent passes found the same shape, turning up six dropped hypotheses in the
paper suite alone, and the worst case had stood for three days: a door of the
flagship paper rested on a computation whose own source file carried a banner
saying it was not a valid certificate.

The count matters and is stated carefully on purpose. An earlier version of this
paragraph read "six independent audits", attaching the number of *defects* to the
word *audits* and so claiming twice the independent confirmation the record
supports. The campaign's own third lesson is that agreement is not independence,
and the file explaining that lesson should not be the file that breaks it.

Those defects survive every check a careful reader performs, because the citation
resolves, the calibration marker is intact and the numbers agree. What fails is
the relationship between two documents. That is what these checks test, and it is
why they are mechanical rather than a review checklist: a human reading either
document alone cannot see it.

## The checks, and the defect each was written to catch

| check | catches | found on day one |
|---|---|---|
| `refs` | references to a file or section that does not exist | `maier-matrix.md:282` cites `origin-excess.md` §6c; that file has §§0-11 and no §6c |
| `quotes` | a quotation attributed to a document that no longer contains it | `OBSERVATIONS.md` quotes `GLOSSARY.md` for "the grain census awaits a law", a sentence the glossary no longer contains: the census was settled and the note recording the old state stayed behind |
| `transfers` | near-duplicate passages that **differ**, where a hypothesis goes missing in the copy | `G2-STATE.md` dropped "with y′² > x" from a PROVEN lemma, which makes it vacuous (at S = y′² ≤ x it reads 0 = 0). **Fixed 2026-08-17, so this example no longer reproduces**; the condition now sits inside the boxed statement, where it cannot be transferred away |
| `crosslinks` | a working document no reader can reach from an entry point | enforces Chris's condition for moving things around |
| `scripts` | a script that does not parse, has no title, or that nothing references | surfaces the 18 scripts whose header carries a correction banner (the count is `gen-scripts-index.js`'s own, printed at the top of `SCRIPTS.md`; do not re-count it by hand with a narrower pattern and "correct" it). The parse check compiles without running, costs 85 ms for all 131, and found nothing on the day it was added: an unparseable script is a cited artifact nobody can reproduce, and it was the one property of the evidence base nothing tested |
| `calibration` | the same named object carried at one strength in its home and a stronger one above it | `natal-cap-23`'s banner was retitled "the anticorrelation **proven** in aggregate" while the artifact's own status table reads `[OPEN] the aggregate theorem … for all x` |
| `absence` | claims that an artifact does NOT exist, which **nothing can verify** | three documents said the @13 beyond-Chebyshev bound had never been run while `natal-cap-27-t4-at13.js` sat in the same directory, having computed it and printed the theorem |
| `sourcing` | a number of ours with no producing script named anywhere in its file | four documents carried substantive numbers that no script claimed; literature numbers are exempt by the rule |
| `parity` | a new attack note omits its arithmetic input and method declaration, or uses a placeholder | checks documentation only; no universal method obstruction is inferred from a residue-only label |
| `widths` | a fixed-width container that is too small **on its face**: a literal shift past 31, a literal that does not fit, an array length stored in sixteen bits. Plus the two ways a `widths-ok` annotation goes bad | nothing, by construction, as `embeds` did on its first day. The shapes the three real incidents had need to know what level the script is about to run at, so they are in the `widths-scan` advisory instead |

`transfers` is the highest-value and the noisiest, by design. It cannot know
whether a difference between two copies is an improvement or a lost hypothesis,
so it reports the pair and asks for a word diff. Both dropped hypotheses found in
the campaign were in pairs that looked unremarkable until diffed.

**Its noise does not decay, so verdicts are recorded.** An adjudicated pair
otherwise reappears on every run forever and costs every future agent the same
read, which is the opposite of the goal. `ADJUDICATED` in `qc/ledgers.js` holds
the pairs that have been word-diffed and ruled KEEP, each with its reason, and
the check reports how many it suppressed.

The key is a **content fingerprint of both passages, never a file and line**, and
that is the entire safety property. Edit either side and the fingerprint changes,
the suppression lapses, and the pair comes back for re-adjudication. A ledger
keyed on position would go on hiding a pair after someone quietly dropped a
hypothesis from it, which is precisely the defect the check exists to catch, so it
would convert the corpus's best instrument into a blindfold. The lapse was tested
by editing an adjudicated passage and confirming the finding returned. Run
`QC_FINGERPRINTS=1 node research/qc.js transfers` to print the fingerprints of
live findings when adding an entry.

Two of the thirteen wave-3 entries record a REPAIR rather than a KEEP. Recording
those is deliberate: the pair still near-duplicates after the fix, so without an
entry it would come back forever looking exactly like the defect that was already
mended.


## Fixed-width containers, and the rule that came out of three incidents

> **Audit every fixed-width container against the level you are about to RUN,
> not the level you last ran. And prefer a loud throw to a silent truncation,
> because the difference between those two is one dead run versus a false
> refutation.**

The class bit three times in three days:

| date | container | outcome |
|---|---|---|
| 2026-08-19 | `1 << r` for a residue `r` mod `q`; JS takes a shift count mod 32 | **silent.** Every `q > 32` aliased, and a3-03's census went wrong from x = 37 up |
| 2026-08-21 | `la`/`lb` were `Uint16Array` holding INDICES into a scour-prime list of size K: 37,534 at @31, 198,274 at @37 | **silent.** Two thirds of the primes read back as the wrong prime, the measurement came out 18% low, and it looked like a clean refutation of a pre-registered law. Five hours, and a false refutation |
| 2026-08-21 | the divisor-list capacity `LC = 7`, exceeded at @37 | **threw.** One dead run, fixed in minutes |

Same class, same week, orders of magnitude apart in cost, and the only
thing separating the second from the third is that one truncated and the other
threw.

### A COUNT identity cannot see a WHICH-value corruption

This is the part that has to be understood before anyone writes another
in-script check. Every internal check in the corrupted script was a count
identity: the slot count against a closed form, sub + sup = total, the CRT
residues and the missing mass against pre-registered values. **Every one of them
stayed PASS while the values were corrupt**, because an aliased container
changes WHICH prime a slot names, never HOW MANY slots there are.
`research/audit-numbers.js` is blind to it for a different reason and just as
completely: it recomputes through the same code, so it reproduces the corruption
exactly and calls it agreement.

So the rule that follows is a design rule, not a checking rule:

> **A script needs at least one identity that touches the aliased quantity
> itself.** Read a sample of the stores back and re-derive them from the source
> they came from; multiply the primes a slot names and check the product divides
> what it should; compare against a level whose answer is already recorded. A
> gate made entirely of count identities certifies only that the counting is
> right.

### The two-line runtime guard

`qc/widths.js` is the cheap version of that, and it is the only thing on this
page that would have stopped incident 2 on the day it happened:

```js
const W = require('./qc/widths');
W.assertFits('la/lb scour index', K, Uint32Array, `@${x}`);   // throws, naming the level
W.assertCapacity('divisor list per side', maxDivisors, LC, `@${x}`);
W.assertBitIndex('residue bit', r, `@${x}`);                  // 0..30, or it means something else
W.assertExactInteger('primorial', P, `@${x}`);                // 2^53
```

Every one of them takes the LEVEL as an argument, and that is the point rather
than decoration: both silent incidents were containers that were correct at @31
and wrong at @37, so the message a reader gets has to name the run that broke
it. `research/xchan-at37-01-census.js` is the worked example. It throws on the
scour index before allocating, and throws again on `LC` inside the loop:

```js
if(K>0xFFFFFFFF)throw new Error(`scour index ${K} exceeds the la/lb container width`);
...
if(av>=LC||bv>=LC)throw new Error(`divisor list capacity ${LC} exceeded: a=${av} b=${bv} at slot ${idx}`);
```

Adopting the guard is also what clears a `widths-scan` entry: the check treats a
`throw` or an `assertFits` naming the container as a ruling, so the advisory list
stays a work queue rather than a census. That is why `xchan-at37-01-census.js`
appears nowhere in it despite carrying two of the exact shapes.

### The annotation

A store that is genuinely safe is signed off once, in the file, on the store:

```js
// widths-ok: the fold index is 0..12 at every level this script can reach
const akey = new Uint8Array(n);
```

It covers its own line and the four below it, and it suppresses both tiers.
**The annotation is itself the audit trail**, so a bare `// widths-ok:` with no
reason signs nothing off and is a finding, and an annotation that has drifted
away from any fixed-width store is a finding too. A suppression that has lost
its target is a blindfold rather than a ruling, which is the same rule
`ADJUDICATED` obeys one section down.

### Why the tiers split where they do

`widths` is GATED and holds only what is provable from the source alone. It
reads **0** today. `widths-scan` is ADVISORY and holds the shapes the three
incidents actually had: a bit index mod a variable modulus, a narrow container
read back as a subscript, a prime stored in sixteen bits, a primorial
accumulated in a `Number`. It had **57** live entries the day it landed, in
about twenty scripts, and not one of them is known to be wrong right now. Every
one is "correct at the level it was last run, unproven at the level it will be
run next", which is a reading order for a human and not a defect list. Gating on
it would put a red that nobody can clear in front of every commit, and the house
rule is that a red gate which cannot be cleared is how a team learns to ignore a
red gate.

Run it with `node research/qc.js widths-scan` before taking any script to a
level it has not run at.


## The one class that cannot be automated, and what to do instead

`refs` confirms that what is cited exists. **Nothing confirms that what is said
not to exist does not exist**, because the claim is about the absence of a file
rather than the content of one. That asymmetry is permanent.

So `absence` does not verify. It **enumerates**: every "never run", "not yet
computed", "does not exist", "nobody has tried" whose paragraph names a
resolvable artifact, minus the ones carrying a dated entry in `ABSENCE_VERIFIED`
in `qc/ledgers.js`.
That turns an act of faith into a bounded job. The corpus holds 21 such phrases;
three name an artifact and are verified with the evidence and the date.

**The trap, which is subtle and is exactly how the wave-4 finding happened: an
absence claim can be falsified without its sentence changing, by a new artifact
appearing.** A content fingerprint therefore cannot make a verification
permanent, unlike the `transfers` ledger where both sides are text. Re-verify the
dated entries whenever a wave adds scripts. The check prints that instruction on
every run rather than trusting anyone to remember it.

Two shapes are excluded because they belong to someone else. An absence **in the
literature** is `PRIOR-ART.md`'s job and is settled by searching journals, not by
listing a directory. An absence of a **quoted named mechanism**, as in `none
("Buchstab with exact strata" does not exist)`, asserts that an idea has no
instance, which a directory cannot settle either way. Both are controls in the
selftest.

## Two checks that are built, calibrated, and deliberately not in the gate

`provenance` and `search-convention` exist, fire, and are excluded from the
default run. `node research/qc.js --pending` runs them; `--list` prints them
under their own heading; every default run names them and their counts.

**Why they are out.** Both were specified before they were built —
`provenance` in [../PRIOR-ART.md](../PRIOR-ART.md), "Provenance: what artifact
was actually read"; `search-convention` in
[../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §6 — and both were deferred
twice on 2026-08-18 for the same honest reason: an attack agent is still running
against the very claims they fire on, and reports against a clean eight-check
gate. Turning them on mid-flight buys either a red gate nobody can act on, or a
suppression ledger written to hide findings nobody has read.

**This is not a partial green, and the difference is the whole point of the house
rule.** A partial green is a gate that omits an instrument *and does not say so*.
Nothing here is hidden: the checks are named on every run, their live finding
counts are recorded, and the condition that flips them on is written down.

**The flip is one line.** `PENDING_IN_GATE` in [../qc.js](../qc.js), immediately
above the `PENDING` map: change `false` to `true`. That promotes both into the
gate, into `--full`, and into `--strict`'s exit code. Do it when the running
attack agent lands and its findings have been applied, and expect red until the
queues are worked.

| check | catches | calibrated against |
|---|---|---|
| `provenance` | a quotation of external work that does not say **which artifact it was read from**, and a provenance note that names only a rendering, an abstract or a third paper | the five hand-read known positives in `qc/lit-extract.js`, all in `two-class-lower-bounds.md`. The first extractor matched only surnames and arXiv ids, missed every quote introduced by possessive ("Their Definition 1, verbatim:"), and undercounted by 61% |
| `search-convention` | a claim that a **result is absent from the literature** whose paragraph neither cites `SEARCH-CONVENTIONS.md` nor names the convention it searched | `two-class-lower-bounds.md` §2 rows 3 and 5 as they stood before 2026-08-18, recovered from `git show`. Both read `ABSENT` with no owning convention named; **both were false**, and both were corrected the same day |

`search-convention` is the check `absence` explicitly does not do. `absence`
drops any claim whose paragraph mentions the literature, because settling it
means searching journals rather than listing a directory — so a claim that a
*result* is absent was checked by nothing at all. That is the failure class that
cost five audit waves: every search this project ran was calibrated, was a
genuine clean negative, and was worthless, because it was run in *our*
vocabulary. **A calibrated negative in our own vocabulary does not clear it**,
and the fixture proves that with a control paragraph written entirely in house
terms.

**The owning vocabulary is parsed out of `SEARCH-CONVENTIONS.md` §1, never copied
into the engine.** A copy would give the corpus two lists of what counts as
searching properly, and the copy would go stale the first time the table gained a
row. `SEARCH_CONVENTIONS` in `qc/corpus.js` holds only the document's path and
its column layout. Single-word conventions are not accepted as clearing phrases:
one row's owning convention is the bare word "Jacobsthal", which is also the
canonical name and appears in nearly every literature paragraph here, so
admitting it would leave a check that reads zero for the same reason the five
waves did.

**One extractor, in `qc/`.** `provenance` does not own a scanner. It requires
`qc/lit-extract.js`, which `research/lit-provenance.js` also requires and reports
over. Two copies of those regexes would give two answers to "how many attributed
quotations are there" and the corpus would then have none. It sits under `qc/`
rather than beside the report because `selftest.js` rebuilds the framework in a
temp directory from a fixed copy list and cannot resolve a shared file outside
it. **The require is hard**, like `ledgers.js` and for the same reason: an
extractor probed with `existsSync` and silently resolving to nothing would make
the check report zero and read as clean while checking nothing at all.

**Its calibration is keyed on content, and that correction cost a false alarm
within two hours.** The first version keyed each known positive to a *line
number*. Three commits the same afternoon edited the document above those quotes,
every anchor drifted by 6 to 18 lines, and the script began shouting CALIBRATION
FAILED about five quotes the extractor was still finding perfectly well. A
position key describes where a sentence sat, not which sentence it is. The
`transfers` ledger says the same thing and said it first.

## The layer the gate does not protect, and the rule that covers it

The gate defends the **corpus**. It does not defend the **briefs and arguments**
that decide what goes into the corpus, and on 2026-08-18 that is where the
damage was done.

The adjudicator made eight errors in one session. Every one was a unit, scale,
quantifier or configuration slip; **not one was arithmetic**; and none was caught
by re-reading. All eight were caught by an agent re-deriving independently, by
the gate, or by recomputing from scratch. Sorted by where they lived:

| # | error | layer | gate could see it? |
|---|---|---|---|
| 1 | `log(v²#) ~ 2v` | agent brief | no |
| 2 | "capacity vacuous by 10×" | agent brief | no |
| 3 | "exponent 2 is TPC-equivalent" | chat + brief | partly |
| 4 | "anchored 3–4 orders below global" | chat | no |
| 5 | counting bound 120 | chat | no |
| 6 | two broken relative paths | `TODO.md` | **yes, caught in seconds** |
| 7 | K–K "fixed pair for every p" | `covering-dive.md` | semantic, no |
| 8 | `localized-04` default-vs-recorded run | shell + chat | no |

**Six of eight never entered the corpus.** The one that did and was mechanically
detectable, `refs` caught immediately. So adding a check would have caught at
most one of the eight, and that one was already caught. **The gate is not the
weak point.** Writing a new check here would be treating the healthy layer.

### The rule

> **A number in an agent brief carries the same custody as a number in the
> corpus.** Cite a script, cite a `file:line`, or compute it in the same turn and
> quote the output. Prose from memory is not custody, and unlike a bad line in a
> document it propagates to every agent at once — errors 1 and 2 were read by ten
> agents simultaneously.

Three supporting rules, each earned by one of the eight:

1. **State the units of both sides before comparing them.** Errors 1, 2 and 4 are
   all one shape: two quantities named the same, measured in different things.
   `node research/qc/units.js` prints the confusable ones with their units and
   conversions, and carries the wrong value beside the right one wherever an
   error has actually occurred. Run it before writing a brief.
2. **When comparing a run to a record, state the invocation on both sides.**
   Error 8: an argument-driven script has no single "the output". A default run
   compared against a recorded explicit run showed 213 of 224 lines missing and
   looked like total reproduction failure; matched invocation reproduced every
   digit.
3. **A second opinion beats a second reading.** Re-reading caught zero of eight.
   Independent re-derivation caught all of them. Where a claim is load-bearing
   and cheap to recompute, recompute it rather than checking it.

### Why this is not solved by more checking

Errors 3 and 7 are semantic: the same name carrying two different strengths
(`o()` against `O()`), and the same symbols `{0, −2}` carrying two different
roles (the sieve form, where the pair is fixed for every prime, against the
covering form, where CRT makes it a free translate). No pattern match separates
those. `units.js` §5 and §6 name both pairs explicitly, which is the only
defence available: a lookup, consulted before the comparison is made.

## Rules the framework itself obeys

These are house rules, and a check that violates one is broken:

- **`research/history/` is never audited as a working document.** It is the
  process record and is supposed to be full of superseded claims. Checks may read
  it as evidence about which version of a claim is current.
- **A script's CORRECTION banner is never a defect.** It is that artifact's
  current status and the only guard between a reader and a runnable superseded
  number. `audit-numbers.js` is a regression test *against* retired numbers, so
  stripping them would delete the enforcement behind the changelog. The framework
  surfaces these banners in `SCRIPTS.md`; it never flags them.
- **Generated files are outputs, not evidence.** `SCRIPTS.md` is excluded from
  citation scanning, or every script would appear to cite itself. The `qc/` tools
  and `gen-*.js` are excluded from the evidence corpus for the same reason.
- **Findings are candidates, not verdicts.** Open the target before editing. A
  paraphrase inside quote marks is a style defect; a changed claim is a
  correctness defect; the two get different fixes.

## What the zeros mean, and the audit that established it

The campaign's fifth lesson is that **a grep returning nothing proves nothing
until the pattern is checked against a known positive.** That lesson applies to
this framework before it applies to anything the framework measures, because by
wave 3 the whole campaign was resting on `refs` and `crosslinks` reading zero.
Nobody had tested them.

On 2026-08-17 every check was run against a fixture corpus of deliberate defects,
one per known class, each copied from a defect this campaign actually found. Four
checks fired correctly. Three blind spots turned up, and all three are now closed:

- **`refs` could not see the prose form.** It matched a filename followed by a
  section sign, but not the words "U-FRAME section 4 and section 6a", which is the
  form running text uses and the
  exact shape of the orphan `gate-multiplies.md`:332 carried. The corpus holds 20
  such pointers. All 20 resolved, so the blind spot was not hiding a live defect,
  but nothing was stopping the next edit from making one.
- **`crosslinks` let history confer reachability.** It counted a mention in any
  file, and `research/history/staging/` alone holds sixteen reports that name most
  of the corpus by path. A document cited only by the record of its own retirement
  was scoring clean.
- **`crosslinks` accepted orphan cliques.** Counting inbound edges lets documents
  clear each other. It now walks transitively from the entry set over body-only
  edges, which is what "a reader can get there" means. Within minutes of the fix
  it caught three real files in exactly that state.

**`quotes` was the weak one, and the number is the point.** It reported "3
checked" against a corpus holding 125 quoted spans: 2.4% coverage of the
campaign's dominant defect class. The description now prints the denominator and
the reason for every span it drops, because 3 with no denominator reads like a
corpus with three quotations rather than an instrument that looked at almost
nothing. Widening the document-token search to the paragraph and accepting the
possessive and noun attribution forms took it to 8, and two of the newly reachable
spans were live dead quotations.

**The audit is now a standing test, not a one-off.** `node research/qc/selftest.js`
rebuilds the fixture in a temp directory, asserts that every known positive
still fires, asserts that every control stays silent, and deletes it. It prints
both counts rather than hardcoding them in its own message, because a count in
prose drifts from the list it describes. It exits 1 if
any case is wrong. Run it after touching anything in `qc/`, and add a case
whenever a check is extended: a defect class with no case in the selftest is a
class nobody has proved the instrument can see.

The fixture is built and destroyed rather than committed, on purpose. It is full
of deliberately broken references, and committing it would give every check a
permanent set of findings to explain.

Both controls matter as much as the positives. A check that flags everything is
as useless as one that flags nothing, and the framework has already produced one
false positive in the wild, on `THE-DIALS.md`:121, from a shorthand grammar that
disagreed between the scanner and the resolver.

## Porting this framework to another body of work

Chris, 2026-08-18: this is turning into a formal way to certify a body of work,
and it should be reusable. It nearly is. The boundary, measured rather than
asserted:

**The engine** — `checks.js`, `selftest.js`, `qc.js` — is now free of this
project's *script-family vocabulary* in every live regex, and free of its
*adjudications* entirely. Three sites used to hard-code
`natal-cap|fold-profile|attack|a3|localized|cap`; they build from config now, and
the rebuilt regexes were compared string-for-string against the originals before
the change was accepted.

**The config** — `corpus.js` — holds what is genuinely this project's layout:
`ROOT`, which files are generated, and the script-family naming conventions.
Everything in it is true whether or not a check ever runs. Porting means
rewriting this file.

**The verdicts** — `qc/ledgers.js` — hold the three suppression ledgers:
`INTENDED_MISSING` for `refs`, `ADJUDICATED` for `transfers`, `ABSENCE_VERIFIED`
for `absence`. Every entry exists only because a check fired and a human ruled on
it, so none of it is true anywhere else. Porting means **emptying** this file,
which is a different act from rewriting the config, which is why they are
different files. Inheriting another project's adjudications would suppress
findings nobody on the new corpus had ever looked at — the one failure mode a
suppression list has.

The split was verified by deleting `ledgers.js` and re-running the fast gate:
`refs` 0 → 4, `transfers` 0 → 13, `absence` 0 → 9. The ledgers are load-bearing
and the failure direction is safe, because a missing ledger returns findings
rather than hiding them.

**What remains, stated exactly rather than declared done.** The project's DATA is
now fully out of the engine; the ledgers were the last of it. What is still in
`checks.js` is project *config* that never moved with the family names, and it is
three literals, each a one-line lift into `corpus.js` for whoever ports next:

- the top-level directory names `research|paper|web|attestation`, in `refs`'
  `PATH_RE` and again in the relative-path guard beside it;
- `ENTRY`, the set of documents `crosslinks` treats as entry points
  (`README.md`, `TODO.md`, `research/README.md`, `paper/PAPERS.md`, …);
- `INTENTIONAL` in `transfers`, three regexes matching boilerplate this corpus
  repeats on purpose, such as the doc-convention header.

`MARKER` and `SETTLED` in `calibration` are a judgement call rather than an
oversight. `PROVEN|THEOREM|CERTIFIED|VERIFIED|OPEN|…` is a calibration
vocabulary, and a project that adopts this framework without adopting those words
has not adopted the check either. They are left in the engine deliberately.

### What ports, and what does not

Portable: the eight checks, the three-gate structure, the selftest discipline,
the ledger pattern, the generated provenance and capability index, the
`audit-numbers` idea of recomputing every load-bearing number from scratch with
retired values kept as regression guards, the `units.js` lookup pattern, the
doc convention, and the brief-custody rule.

**Not portable, and this is the important half: the known-positive set.** Every
case in `selftest.js` is copied from a defect this corpus actually had. That is
what licenses a zero from `qc.js` — the checks demonstrably fire on real
defects, so silence is evidence. A new project inherits the machinery with an
empty fixture, which means checks that have never been shown to fire on
anything. **You earn the checks by making the mistakes.** The scar tissue is the
asset and it does not transfer.

The honest advice for a second project is therefore: take the engine, take the
structure, and then let the first few defects you find write your fixture. A
check adopted before it has caught anything is a check nobody has tested.

## Adding a check

Write a function in `qc/checks.js` returning
`{ name, description, findings: [{ file, line, kind, detail, note }] }`, register
it in the `ALL` map in `qc.js`, and add a line to the `WHY` map saying which real
defect it catches. If it cannot name one, it is probably a style preference rather
than a check.

Shared primitives (file discovery, the body/history split, prose normalisation,
section parsing, shorthand resolution) live in `qc/corpus.js`. Use them rather
than re-implementing, because the body/history distinction and the shorthand
grammar are exactly the things that drift.

If the new check will suppress findings a human has ruled on, put the ledger in
`qc/ledgers.js` and not in `checks.js`, and state with it **how a suppression
lapses**. Only `ADJUDICATED` re-opens itself, because it is keyed on content.
`INTENDED_MISSING` goes inert instead, being consulted only while its target is
missing. `ABSENCE_VERIFIED` can do neither and must be re-verified by hand. That
difference is the only thing standing between a ledger and a blindfold.

## Known false-positive shapes

Kept here so nobody re-fixes them:

- Forward-looking references, where pointing at a file that does not exist yet is
  the intended meaning. These live in `INTENDED_MISSING` in `qc/ledgers.js`, each with
  its reason, and are exempt from `refs`. They are kept **in code, not here**:
  a prose note listing the paths contains the paths, so it trips the very check it
  documents, which is how one fact came to produce four findings.
- `quotes` requires the ATTRIBUTION CUE (`says`, `reports`, `per`, …) on the same
  line as the quotation, or on the previous line when it continues the paragraph.
  An earlier version used a ±2 line window and bled across markdown list items,
  testing a quotation of an external author against a neighbouring item's
  citation. **Do not widen the cue window back.** The DOCUMENT TOKEN is a separate
  matter and is searched across the whole paragraph, which is safe because
  clearing is disjunctive: a paragraph naming two documents clears the quotation
  if either contains it. `anchored-note.md`:368 is the case that proves the point,
  quoting `natal5-variance.js` in a paragraph whose previous sentence names
  `two-moire-argument.md`.
- `calibration` only counts a marker that is **attached** to the name: inside the
  bracket or parenthesis that follows it, or the next table cell, and never across
  a sentence break. The first draft used paragraph scope and reported 22 objects,
  every one of them noise, because a status table legitimately carries a dozen
  markers for a dozen objects and pairing them all produces a finding per row.
  Widening this window back will make the check useless rather than stricter.
- A quotation carried **in order to be corrected** is not a dead quotation. The
  house rule is that refutations stay visible, so `staircase-note.md`:287 quotes
  `natal-cap-08-staircase.js` saying "exact < RS < PNT at all four levels"
  precisely because the script's own output refutes it at @19. Flagging those
  would ask an applier to delete the correction, so a refutation cue in the
  paragraph suppresses the finding. The cost is real and is accepted: the same
  suppressor hides genuine orphans of the form "X still recommends Y", and one
  such was found by hand in `h2-scoping.md` on the day the suppressor was added.
- `transfers` reports the six-way identical attribution block across `paper/*.md`
  only if it stops being identical. Byte-identical pairs are skipped, because
  nothing can have been lost in transfer.

---

Full campaign record, including everything these checks were built from:
[../history/staging/qc-CAMPAIGN.md](../history/staging/qc-CAMPAIGN.md).


## The question ledger: what has already been attacked

Chris, 2026-08-28: *"We keep re-running things. Restructure repo so that does not
happen."* Three briefs that day re-posed questions the corpus had already
answered, because 316 notes answered questions and nothing indexed them by
question. Every note that answers one now carries a `<!-- ledger -->` block
(id, status, todo, question, verdict; format at the top of `qc/questions.js`),
`research/QUESTIONS.md` is generated from those blocks (`--index`), and the
`ledger` check gates one thing: a TODO item must list, on its `Ledger:` line,
every question id whose note names that item. `ledger-backlog` (advisory)
counts the legacy notes still without a block; they are listed by title in
QUESTIONS.md §3 so a grep finds them meanwhile.

**The parity line (2026-09-05, scope corrected after review).** A new attack
note carries `parity: <arithmetic inputs and method scope>` in its ledger block,
or exactly `parity: residue-only`. An obstruction claim must additionally
identify retained statistics, errors and quantifiers. The checker enforces the
declaration's presence and rejects placeholders; it does not decide feasibility.
Exact residue arrangements encode primality, while classical parity barriers
concern specified classes of estimates. Legacy notes remain exempt by their
git add date. The current specification is `../../README.md` §Status.
