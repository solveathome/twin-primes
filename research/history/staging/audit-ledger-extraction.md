# Ledger extraction: the project's data is out of the QC engine

<!-- ledger
id: Q-ledger-extraction
status: ANSWERED
todo: none
question: Can the QC engine's three suppression ledgers be moved out of the checks and into data?
verdict: Moved: all three now live in research/qc/ledgers.js, the fast gate and the selftest are byte-identical to their pre-change output, and all 25 entries were verified verbatim against git HEAD by key, order and reason text.
-->

**Headline.** All three suppression ledgers now live in `research/qc/ledgers.js`;
the fast gate and the selftest are byte-identical to their pre-change output, and
all 25 entries were verified verbatim against `git HEAD` by key, order and reason
text.

## What moved

| Ledger | From | Owning check | Entries |
|---|---|---|---|
| `INTENDED_MISSING` | `qc/corpus.js` | `refs` | 3 |
| `ADJUDICATED` | `qc/checks.js` | `transfers` | 13 |
| `ABSENCE_VERIFIED` | `qc/checks.js` | `absence` | 9 |

Each moved with its explanatory comment. The `transfers` docstring, the
`INTENDED_MISSING` "why this is in code and not in prose" paragraph and the
absence-claim TRAP paragraph all travelled with their data. What stayed in
`checks.js` is only the *mechanism* by which each suppression lapses, which is
engine rather than data.

`checks.js` and `corpus.js` reach the ledgers through `L.*`; `corpus.js` no
longer exports `INTENDED_MISSING`.

## The gate, before and after

Captured before any edit and re-run after. Diffed with timings normalised;
**no other difference**.

```
BEFORE                                  AFTER
  refs             0 finding(s)           refs             0 finding(s)
  quotes           0 finding(s)           quotes           0 finding(s)
  crosslinks       0 finding(s)           crosslinks       0 finding(s)
  scripts          0 finding(s)           scripts          0 finding(s)
  transfers        0 finding(s)           transfers        0 finding(s)
  calibration      0 finding(s)           calibration      0 finding(s)
  absence          0 finding(s)           absence          0 finding(s)
  sourcing         0 finding(s)           sourcing         0 finding(s)
  TOTAL            0                      TOTAL            0
```

The two description strings that carry the ledger counts are unchanged, which is
the part that would have moved had an entry been lost:

- `transfers` — `(13 adjudicated KEEP and suppressed; they return if either side is edited)`
- `absence` — `(22 absence phrases, 9 verified and dated, 0 unverified)`

Selftest, before and after, `diff` clean:

```
All 15 known positives fire and all 7 controls stay silent. A zero from qc.js means something.
```

## Calibration: the ledgers are load-bearing

Per the standing rule that a zero proves nothing until the instrument is checked
against a known positive, `ledgers.js` was moved aside and the gate re-run:

```
refs 0 → 4      transfers 0 → 13      absence 0 → 9      TOTAL 0 → 26
```

`refs` returns 4 rather than 3 because one exempt path is cited from two sites.
So the wiring is live, the suppressions are real, and losing the file **returns**
findings rather than hiding them, which is the safe direction.

## Judgement calls, not mechanical moves

**1. `INTENDED_MISSING` moved, and it was the one real decision.** The case for
leaving it in `corpus.js` is that it is keyed on repository paths and `corpus.js`
owns paths. That is not the right cut. Everything else in `corpus.js` is true
whether or not a check ever runs — `ROOT`, the walk, the generated set, the
shorthand grammar. `INTENDED_MISSING` has no meaning outside the `refs` check:
its own docstring calls it an allowlist earned entry by entry, which is an
adjudication, not a layout fact. `ABSENCE_VERIFIED` is also keyed on a repo path
and nobody would call that config. The practical test is porting: `corpus.js` is
**rewritten** for a new project, `ledgers.js` is **emptied**, and leaving one
ledger behind would make a porter edit `corpus.js` for two unrelated reasons and
plausibly carry this project's exemptions into a corpus nobody had read.

**2. `ledgers.js` is loaded tolerantly, and this was forced.** `selftest.js`
builds its fixture by copying exactly `['checks.js', 'corpus.js']` into a temp
root, so a plain `require('./ledgers')` throws there. `selftest.js` was outside
this task's ownership, so `checks.js` falls back to three empty maps when the
file is genuinely absent. That is correct in both places: no fixture passage
carries a real fingerprint or a real `file|phrase` key, so an empty ledger
suppresses nothing there and changes no case — confirmed by the identical
selftest output. A `ledgers.js` that exists but throws is still a hard error.
**The tidier fix is one line in `selftest.js`**: add `'ledgers.js'` to that copy
list and drop the `fs.existsSync` guard. Worth doing when that file is free.

**3. The README's porting claim was weakened deliberately.** The obvious edit was
"nothing project-specific is left in the engine". That is false, so it says
instead that the project's *data* is out and names the three config literals
still in `checks.js`: the top-level directory names `research|paper|web|attestation`
in `PATH_RE` and in the relative-path guard, the `ENTRY` set used by `crosslinks`,
and `INTENTIONAL` in `transfers`. `MARKER` and `SETTLED` are argued as a
deliberate exception rather than an oversight: a project that does not adopt that
calibration vocabulary has not adopted the check.

## COVERAGE

- **Not run: `node research/qc.js --full`.** The brief reserves it. So
  `audit-numbers.js` has not been run against this change. The risk is close to
  nil — nothing here touches a number, a computation or a `.js` under
  `research/` outside `qc/` — but it is unrun, not clean.
- **The three config literals in point 3 were found by grep, not by an
  exhaustive read of `checks.js`.** There may be a fourth. The claim in the
  README is scoped to what was measured.
- **Where I am most likely wrong: the `fs.existsSync` guard.** It is a silent
  fallback, and silent fallbacks are how blindfolds get installed. It is
  defensible here only because the failure direction is un-suppression, and it
  should be deleted as soon as `selftest.js` can be edited.
- **Entry content was not re-adjudicated**, by instruction. The nine
  `ABSENCE_VERIFIED` entries carry a standing re-verification duty that this
  move does not discharge; the two dated 2026-08-18 are the freshest, the seven
  dated 2026-08-17 are the ones a new wave would stale first.
