# Verify the verifier: what `qc/embed.js`'s fingerprint binds, and what it leaves loose

<!-- ledger
id: Q-embed-binding
status: ANSWERED
todo: none
question: What does the embed fingerprint actually bind, and what does it leave loose?
verdict: It binds the code to a claim about the output and does not bind the output block to anything: code-sha256 covers every byte above the banner, out-sha256 is only ever compared against another run, timeouts and failures write nothing, a prose line can unbind a tail and one did during this pass, and 37 cited scripts have no output custody at all.
-->

*(2026-08-20, custody forensics on the embed mechanism itself. Nothing here
edits `embed.js` or any script. Every claim below is demonstrated on a scratch
copy or replayed out of git, not argued. `node research/qc.js` reads TOTAL 0
before and after this pass.)*

**Headline. The fingerprint binds the code to a claim about the output. It does
not bind the output block to anything.** `code-sha256` covers every byte above
the OUTPUT banner. `out-sha256` covers the *normalised stdout of a run*, and the
only thing that ever compares against it is another run. Nothing in this
repository compares `out-sha256` to the bytes pasted in the file. So a
fabricated row inserted into a bound tail passes `embed.js --check` **and**
`qc.js embeds`, both green, and that is exactly the `attack-lower-bound.js`
defect of 2026-08-18 that the mechanism exists to make impossible. Demonstrated
in §1.4.

**And the check is cheap to close.** A body reader that keeps the `====` rule
lines reproduces `out-sha256` from the pasted block on **197 of the 198 bound
tails** in the repository, today, with nothing executed. The one exception is
`attack-growth-law.js`, and it is a writer/reader disagreement rather than a
tampered block: that script's stdout ends with a rule line, and `locate()`
re-reads it as the tail's closing banner (§1.5). A static body check is
available for the price of one loop.

**The `--force` forensics come back clean.** Thirteen tails were bound over a
pre-existing block, twelve of them with an explicit `--force`. Every stated cost in
the custody ledgers reproduces token for token when the pre-bind version is
replayed out of git against the bound block (§2.2). `genealogy.js` lost exactly
one token, `0.41625`, which is the adjudicated correction, and nothing else rode
in with it (§2.3). Six of the thirteen were re-checked by a fresh run and all six
match on both hashes; three were priced over the budget and one, `natal-cap-27`,
was launched and timed out at 2,400 s under a load average near 190 (§2.4). Four tokens are absent from the repository altogether, all
four from `lp-push-x43.js`, and all four are quoted in
`history/staging/lp-push-x43.md:271-272`. Nothing is lost.

**A binding can evaporate silently, and one did during this pass.**
`tailfmt.locate()` finds the tail by scanning **backwards** for the last line
matching `/^\s*\/\/\s*OUTPUT\b/` (`tailfmt.js:79`). Any comment line anywhere
below the tail that begins with the bare word `OUTPUT` captures the banner, and
`\s*` eats the indentation that `custody-wave3.md` §3 proposed as the mitigation.
When that happens `fingerprint()` returns null, the file is reclassified as a
legacy hand-pasted tail, `embeds()` stops checking its code hash entirely, and
`qc.js` still reads TOTAL 0. Commit `1c42a16` did exactly this to
`research/a3-08-adjacent-pairs.js` this morning and a later commit repaired it;
`natal-cap-32-wrap-identity.js` carried the same defect from `81593bf` onward.
Running `embed.js` on a file in that state destroys everything below the
captured line and writes a **second** OUTPUT-EMBEDDED header with a different
`code-sha256`, exit 0. Demonstrated in §3.4.

**The reported "silent exit-0 no-op" is half right and the half that is wrong
matters.** A script with no OUTPUT banner exits **2** and writes nothing, and it
has done so since the first commit of the tool. But the scaffold it prints goes
to **stderr**, and stdout is empty, so an operator or an agent capturing stdout
sees literal silence (§3.2). The larger version of the same hole: **37 scripts
in `research/` carry no OUTPUT banner at all, and they are invisible to both
`embeds` and the `embed-backlog` migration counter.** The counter reads 3. The
population that has no output custody is 40. `sift-limit-lemmaV.js` is cited in
21 documents, `exponent-control.js` in 17, `Lgrowth.js` in 16 (§3.3).

**`--force` leaves no trace anywhere.** It is one boolean read at one line, it
is never written into the fingerprint, the tail, or the file, and after the
commit lands the only record that a guard was overridden is a human sentence in
a staging report (§2.1).

---

## 1. What the two hashes actually cover

`code-sha256` is `T.sha(T.headText(src))` — `embed.js:101`, where `headText` is
`lines.slice(0, tailStart).join('\n')` (`tailfmt.js:131-134`) and `tailStart` is
the OUTPUT banner rule, or the OUTPUT line itself if no rule sits above it
(`tailfmt.js:83-84`).

`out-sha256` is `T.sha(T.normalize(captured))` — `embed.js:135-136`, where
`captured` is the child's stdout, plus stderr under a marker when
`--streams both` (`embed.js:130-134`), and `normalize` blanks six volatile
classes: bracketed timings, bare `N ms`/`N s`, unit-before-number JSON timings,
ISO dates, `vN.N.N` version strings and `N MB`/`GB`/`KB`
(`tailfmt.js:51-60`).

| thing | in `code-sha256` | in `out-sha256` | recorded but unhashed | not recorded at all |
|---|---|---|---|---|
| every byte of the script above the OUTPUT banner | **yes** | — | — | — |
| the OUTPUT block's own pasted bytes | no | **no** (see §1.4) | — | — |
| the READINGS prose | no | no | — | — |
| anything below READINGS | no | no | — | — |
| the script's stdout | — | **yes**, normalised | — | — |
| the script's stderr | — | only with `--streams both` | — | default drops it |
| the invocation line, args, node flags, `--env` pairs | no | no | `invocation:` line, `embed.js:102,206` | — |
| the `--streams` mode | no | no | `streams:` line, and `--check` obeys it (`embed.js:146`) | — |
| the node version | no | no | `node:` line, `embed.js:210`; **`--check` never reads it** | — |
| elapsed wall time | no | normalised away | `elapsed:` line | — |
| the embed date | no | normalised away | `embedded:` line | — |
| the ambient environment the child inherited | no | no | — | **yes** (§4.1) |
| the working directory | no | no | — | pinned to `REPO`, `embed.js:111`; harmless (§4.2) |
| `nice` level | no | no | — | harmless (§4.2) |
| whether `--force` was used | no | no | — | **yes** (§2.1) |
| files the script reads | no | no | — | **yes** (§5) |
| modules the script `require`s | no | no | — | **yes** (§5) |

### 1.1 What `--check` re-runs

`--check` (`embed.js:143-154`) reads the fingerprint, then compares
`fp['code-sha256']` to a freshly computed head hash and `fp['out-sha256']` to the
hash of **this invocation's** run. It obeys the recorded `streams` mode. It does
**not** read the recorded `invocation`.

The consequence is measured: **33 of the 198 bound tails record an invocation
that is not the bare `node research/<file>`** — args, node flags, or in two cases
a leading environment assignment. Run `--check` on any of them the obvious way
and it manufactures a mismatch. Demonstrated on `a3-04-maxsum-recursion.js`,
whose fingerprint records `node research/a3-04-maxsum-recursion.js --t29`:

```
$ node research/qc/embed.js --check research/a3-04-maxsum-recursion.js
  code-sha256  matches
  out-sha256   DIFFERS — this run does not reproduce the pasted block
$ node research/qc/embed.js --check research/a3-04-maxsum-recursion.js -- --t29
  code-sha256  matches
  out-sha256   matches
```

A checker that manufactures findings is the failure `embed.js:139-142` names in
its own comment about the streams mode. The invocation is the same class of
defect and it is not handled the same way.

### 1.2 What `--check` cannot see

If the script reads a file, `--check` re-runs against **today's** version of that
file. A match therefore certifies "the current code plus the current inputs
reproduce the recorded hash", which is a weaker statement than the tail's own
header claims, and a mismatch cannot distinguish a code edit from an input
drift. §5 lists the affected scripts.

### 1.3 Timeouts and failures write nothing

`embed.js:124-128` exits 1 before any write on a timeout, a non-zero exit status,
or a spawn error. Verified on scratch copies: a script killed at `--timeout 3`
mid-output left the file untouched, and so did a script that printed a row and
then `process.exit(3)`. **No partial output is ever written.** This is the one
part of the failure path that is airtight.

### 1.4 The pasted block is not covered by anything

`--check` compares the recorded `out-sha256` to a fresh run. It never compares it
to the block in the file. `embeds()` (`checks.js:1101-1124`) compares only
`code-sha256`. Neither reads the body.

Demonstrated on a scratch copy. A bound tail was hand-edited to change one
printed figure and to insert a row the script has never printed; the code-sha
line was recomputed from the (unchanged) head, as a forger would:

```
//   code-sha256: c03b510a106a1048e7f8cb5dbf483b88e6fb4a76640242cf2701ca29dec03139
//   out-sha256:  39403f43c2401afc30168a96da67f0edf08a5f79e7b25dcf07649a1cfaed0de1
// ============================================================================
// alpha 123.456
// beta  789.012
// gamma 42.0 -- THE HEADLINE, never printed by any run
```

```
$ node research/qc/embed.js --check research/t1-forged.js
  code-sha256  matches
  out-sha256   matches      exit=0
qc.js embeds:  none — green
```

Only `qc/tails.js` would catch this, by figure presence rather than by hash. It
is in neither gate: `qc.js --full` is `qc.js` plus `selftest.js` plus
`audit-numbers.js` (`qc.js:251-254`), and `tails.js` is not among them. It runs
at a 30 s default timeout that no expensive tail survives, and it matches by
substring.

The answer to "can an OUTPUT block be hand-extended after a bind without
detection" is therefore **yes, anywhere inside it**, with three sub-cases worth
separating:

- inside the body: undetected by `embeds` and by `--check`, as above;
- below the READINGS banner: unhashed **by design**, and this is the sanctioned
  device — `lemmaV-sup-extension.js` carries a dated CORRECTION block there, and
  `lp-push-x43.js`, `natal-cap-27-t4-at13.js` and `verify-ladder-big.js` carry
  their traceability notes there;
- between the body and a file that has **no** READINGS banner: silently deleted
  on the next embed. `embed.js:218` computes `after` as `[]` when
  `loc.readStart === -1`, so everything below the OUTPUT block is dropped and
  replaced by a bare `// READINGS`. Verified on a scratch copy: a hand-written
  provenance note under an OUTPUT block with no READINGS banner was destroyed,
  exit 0, no warning. The legacy guard did not fire because the old body carried
  no figures of the shape `figures()` counts.

### 1.5 The writer and the reader disagree on one line

Of the 198 bound tails, 136 reproduce their `out-sha256` from the pasted body
using `T.outputText`, and **197** reproduce it once the `====` rule lines that
`outputText` filters (`tailfmt.js:164`) are kept. The 62-file gap is entirely
that filter: every one of the 62 has rule lines inside its output body and no
non-comment lines.

`attack-growth-law.js` is the single true mismatch, and the cause is structural
rather than dishonest. Its stdout ends with a `=`-rule. `embed.js:218-219` wrote
that rule as the body's last line and then appended `// READINGS` with no rule
of its own, because the pre-embed file had a blank comment line above READINGS
rather than a rule. On the next parse, `locate()` sees a banner immediately above
READINGS and assigns it to the tail (`tailfmt.js:126`), so the body loses its
last line. Confirmed against a fresh run: the file's body and the run differ on
exactly one line, the trailing rule. Harmless here. It is the writer and the
reader drifting apart, which is the defect `tailfmt.js:5-8` warns about in its
own header.

---

## 2. `--force`: what it skips, and every forced bind on record

### 2.1 What the flag does

`--force` is read once, at `embed.js:178`, inside a block that is entered only
when the file has **no fingerprint** and its existing body is non-empty
(`embed.js:169`). What it skips is a single test: whether every figure in the
old pasted block appears in this run's output (`embed.js:176-177`). It skips
nothing else. It does not affect the run, the hashes, the write, or the READINGS
warning.

Three consequences follow, and all three are demonstrated:

1. **`--force` is a no-op on an already-bound file.** Re-embedding a
   fingerprinted tail overwrites the old block with no comparison, no flag and
   no diff, exit 0. The only signal is the transient
   `(CHANGED from the previous embed)` suffix on stdout (`embed.js:228`), which
   is never written to the file. Verified on a scratch copy: a bound tail's block
   was replaced with different numbers by a plain re-embed.
2. **`--force` leaves no mark.** The header written at `embed.js:200-214` has no
   force field. After the commit lands, nothing in the artefact says a guard was
   overridden. The audit trail is entirely the staging reports.
3. **The flag has no scope.** `has()` is `argv.includes('--' + n)`
   (`embed.js:45`), which scans the whole argv including everything after the
   `--` separator. Verified: `embed.js research/t6.js -- --force` disabled the
   guard *and* passed `--force` to the script. The same holds for `--check`,
   which run after `--` put the tool in check mode. Any script that silently
   ignores an unknown argument would take a false invocation into its
   fingerprint this way.

### 2.2 The forensics table

Every bind performed over a pre-existing OUTPUT block was recovered by finding
the first commit whose blob carries `code-sha256`, extracting the parent version,
and replaying the guard's own test (`figures(old block)` against the bound block,
`presentIn` semantics) — the same comparison `embed.js:176-177` makes. The
"cost" column is that replay, not a quotation from the ledger, and it reproduces
what the ledgers state in every row.

| script | ledger | forced | re-check now | replayed cost | tokens absent from the whole file |
|---|---|---|---|---|---|
| `attack-01-gap-cartography.js` | migration §4.1 | yes | **both hashes match** (3 s) | 1 of 26 | 1 — `11,16,14,11,12,12,11,3,6,4`, the same list the run prints with spaces |
| `attack-06-difference-hierarchy.js` | migration §4.2 | yes | **both match** (0.6 s) | 2 of 10 | 1 — `6,12,18,24`, a hand-written row label |
| `attack-06b-difference-map.js` | migration §4 | yes | **both match** (3 s) | 3 of 154 | 2 — `22,10,4,1,1,1,1` and `-5.29` |
| `attack2-01-06-seam-census.js` | migration §4 | yes | **both match** (2 s) | 5 of 48 | 4 — `3.0e8`, `2.1e9`, `1.3e6`, `3.0e9`, all `e+0`-notation reflows |
| `attack2-05-07-integral-ladder.js` | external-evidence §2.3 | yes | **both match** (0.5 s) | 2 of 52 | 2 — two comma-joined sequences, one reflowed spacing |
| `genealogy.js` | wave3 §2 | yes | **both match** (0.1 s) | 1 of 11 | 0 — `0.41625` survives in the header note and READINGS (§2.3) |
| `a3-02-diagonal-f.js` | consolidation §2 | yes | not re-run (268 s recorded, argument- and flag-driven) | 1 of 309 | 0 — `8000`, the node flag, now in the header |
| `a3-08-adjacent-pairs.js` | consolidation §2 | yes | not re-run | 23 of 195 | 0 — all 23 in READINGS, the `--t31` leg |
| `attack2-rankin2d.js` | consolidation §2 | yes | not re-run (168 s recorded) | 30 of 131 | 0 — all 30 in READINGS, the `--deep` leg |
| `natal-cap-35-x-multiplicity.js` | external-evidence §4.2 | **no — the guard was inert** | not re-run (95 s) | 1 of 520 | 0 |
| `lp-push-x43.js` | consolidation §1.2 | yes | **skipped, 33 min, over budget** | 20 of 154 | **4** — `1.2227`, `0.2227`, `1.1131`, `0.1131`, quoted at `history/staging/lp-push-x43.md:271-272` |
| `natal-cap-27-t4-at13.js` | consolidation §1.4 | yes | **launched, timed out at 2,400 s under load; unverified by re-run**, §2.4 | 3 of 50 | 0 — three clock readings, `11.5`, `50.7`, `15.4` |
| `verify-ladder-big.js` | consolidation §1.3 | yes | **skipped, 55 min, over budget** | 1 of 7 | 0 — `54.1`, the 2024 stopwatch |

The four migration forcings sum to 11 tokens, which is the figure
`custody-embed-migration.md` §4 states. `lp-push-x43`'s 20 of 154,
`natal-cap-27`'s 3 of 50 and `verify-ladder-big`'s 1 of 7 are the figures
`consolidation-wave.md` states. Nothing in the ledgers is overstated and nothing
is understated.

**One row does not match its ledger line, and it is a bookkeeping point rather
than a loss.** `consolidation-wave.md`:307-309 records `a3-08-adjacent-pairs.js`
as bound with `-- --t31` and `--node-flag --max-old-space-size=8192` at about 44
minutes, and `attack2-rankin2d.js` with `-- --deep` at about 30 minutes. The
fingerprints on disk record the plain default invocations, at 89.6 s and 168.3 s.
The long legs live in READINGS, where §3 of that report says they were moved.
The bound tails are therefore the cheap runs and the expensive legs are prose
with a provenance line, which is the documented outcome; the table in §2 of that
report reads as though the expensive invocation was the one bound.

### 2.3 `genealogy.js`: the one forced figure, checked

The pre-bind block (commit `7800b3e`) carries 11 figures. Replaying the guard
against the current run gives exactly one absentee:

```
old block figures: 11
NOT produced by the current run: ["0.41625"]
```

`0.41625` is the adjudicated correction. The code has always printed
`2*C2*e^(-2gamma) = 0.41621`, the six-entry convergence table
(`0.3253, 0.3661, 0.4007, 0.4093, 0.4140, 0.4150`) reproduces exactly, and the
four `slots/orphans/edge-children` rows reproduce with reflowed spacing.
`embed.js --check` on the file today returns both hashes matching. **Nothing rode
in with the correction.**

One qualification that belongs on the record. The same commit that forced the
tail also rewrote the code above it: `d6c5a9b` added the sieve that computes the
convergence table, so `code-above-tail unchanged` is **false** for this file
where it is true for nine of the thirteen. The guard's test is
old-block-against-new-run, which cannot separate "the code was corrected" from
"the block was wrong". A force applied in the same commit as a code change is
auditable only through the human ledger, and here the ledger does the work:
`custody-wave3.md` §2 quotes the replaced block verbatim.

### 2.4 `natal-cap-27-t4-at13.js`: launched, and it did not finish

Launched at `nice 15` with `--streams both` and `--timeout 2400`, which is
56 per cent over the 1,537.1 s the fingerprint records. It **timed out at 2,400 s
and returned nothing**:

```
research/natal-cap-27-t4-at13.js: the script did not complete (timed out after 2400s).
Nothing was written. A tail is a record of a completed run or it is not a record.
EXIT=1
```

**This is not a mismatch and must not be read as one.** The file self-spawns
eight workers, and the machine carried a load average near 190 for the whole
window because an agent fleet was running concurrently (§7). A run priced at 26
minutes on an idle laptop does not fit in 40 minutes at that load. The honest
verdict is **unverified by re-run**, alongside `lp-push-x43.js` and
`verify-ladder-big.js`.

What is verified for this file, statically and from git: its `code-sha256`
matches the code above its tail; its pre-bind block carried 50 figures of which
exactly three, `11.5`, `50.7` and `15.4`, are absent from the bound block; all
three are wall-clock readings; all three still appear elsewhere in the file. That
is the cost `consolidation-wave.md` §1.4 states, reproduced independently. It
leaves the *content* of the bound block unre-earned, which is precisely the state
repair item 1 of §6 would make cheap to check without a 40-minute run.

---

## 3. Failure paths

### 3.1 What happens with no OUTPUT banner

`embed.js:89-98`. The banner is located **before** the script is run, so nothing
expensive is wasted, and the tool exits 2 having written nothing. The scaffold
and the reason are printed. This has been the behaviour since `3f0ccd6`, the
first commit of the tool.

**So the reported "silent exit-0 no-op" is not what the code does.** The closest
thing on record to an exit-0 no-op is a different and now-fixed defect:
`custody-external-evidence.md` §4.2 demonstrated `embed.js` exiting **0** and
silently replacing a composite tail on `natal-cap-36-skeleton-door.js`, because
`outputText()` returned an empty body for 50 of 113 tails and the guard read that
as "nothing to protect". `tailfmt.js:89-122` fixed it and the selftest carries a
fixture. The two are worth keeping apart: the parser hole destroyed evidence, and
the banner path destroys nothing.

### 3.2 What is silent about it

Everything the no-banner path prints goes to `console.error`. Capturing stdout
gives the empty string:

```
$ OUT=$(node research/qc/embed.js research/nobanner.js 2>/dev/null); echo "[$OUT]"
[]
```

The success path prints to stdout (`embed.js:224-228`). An agent that captures
stdout and does not read the exit code sees a successful embed and an empty
report as the same thing. Exit 2 is also shared with the usage error at
`embed.js:80-81`, so the code alone does not say which happened.

### 3.3 The blast radius: 37 cited scripts with no output custody at all

`embeds()` opens with `if (!loc) continue` (`checks.js:1107`) and so does
`embedBacklog()` (`checks.js:1151`). A script with no OUTPUT banner is therefore
in neither the gate nor the migration counter. The comment at `checks.js:1107`
says `// no tail: 'scripts' owns that`. It does not: `scriptProvenance()`
(`checks.js:366-411`) checks that a script parses, has a title, and is cited by
some document, and says nothing about a missing output block.

238 scripts in `research/`. 198 bound, 3 legacy hand-pasted, **37 with no OUTPUT
banner**. The advisory reads `3 hand-pasted-tail`, which invites the reading that
custody is three files from complete. The population with no custody is 40.

Some of the 37 are tooling (`qc.js`, `audit-numbers.js`, `gen-scripts-index.js`,
`killrun.js`) where a tail is meaningless. Several are not:

| script | documents citing it |
|---|---|
| `sift-limit-lemmaV.js` | 21 |
| `exponent-control.js` | 17 |
| `Lgrowth.js` | 16 |
| `a3-05-bound-L.js` | 15 |
| `two-class-lower-bounds.js` | 15 |
| `localized-04-maxsum.js` | 13 |
| `maxgap-law.js` | 10 |
| `block-L-first-dead.js` | 9 |
| `origin-excess.js` | 7 |
| `attack-beta2-03-exact-strata.js` | 6 |

Four of these are also `require`d by bound scripts, so their bytes are load
bearing twice over (§5).

### 3.4 A prose line can unbind a tail, and one did during this pass

`tailfmt.js:79`:

```js
for (let i = lines.length - 1; i >= 0; i--) if (OUT_HEAD.test(lines[i])) { outHead = i; break; }
```

with `OUT_HEAD = /^\s*\/\/\s*OUTPUT\b/` (`tailfmt.js:47`). The scan runs from the
end of the file, so the **last** matching line wins, and `\s*` after `//` means
indentation does not protect anything. `custody-wave3.md` §3 saw the hazard and
proposed indenting and quoting moved banner lines; indenting does not work.

This is not hypothetical. Tracing the four `readings traceability` commits that
landed while this pass was running:

| commit | `a3-08-adjacent-pairs.js` | banner-matching lines |
|---|---|---|
| `ab8934f` (session start) | legacy | 591 |
| `81593bf` batch 1 | **BOUND** | 599 |
| `5717e58` batch 2 | **BOUND** | 599 |
| `1c42a16` batch 3 | **legacy — unbound** | 599, **1079** |
| `f56e318` batch 4 | legacy | 599, 1079 |
| working tree now | **BOUND**, repaired | 599 |

Line 1079 was `//   OUTPUT, which is a cross-check rather than a second source:
109884182,`, appended to a provenance note far below READINGS. Neutralising that
one word restores the fingerprint and the code hash matches. The same pattern
hit `natal-cap-32-wrap-identity.js` at line 996
(`//        OUTPUT reads "T4 = 352253669.87624449 …`) in batch 1 and it was still
present at batch 4.

Two things happened for the duration, and neither raised a finding:

1. `embeds()` stopped verifying those files' `code-sha256` at all
   (`checks.js:1116-1117` only fires when `fp` is truthy). A file whose binding
   has evaporated is silently demoted to the advisory backlog, and the gate reads
   the same TOTAL either way.
2. An embed run in that window would have been destructive. Demonstrated on a
   scratch copy: a bound tail with an `//   OUTPUT, read as a cross-check …` line
   appended below READINGS was re-embedded, and the file came back with **two**
   OUTPUT-EMBEDDED headers carrying **different** `code-sha256` values, the
   provenance note's text destroyed, exit 0, no warning. `fingerprint()` then
   reads the second header, whose code hash covers the first tail as if it were
   code, so `embeds()` reports "matches" on a file that now contradicts itself.

The repair is small and belongs with item 2 of §6: tighten `OUT_HEAD` to
require the banner to own its line (`/^\s*\/\/\s*OUTPUT\s*(?:$|[—-]|\()/`, or
simply anchor the embedded form), and have `embeds()` raise a finding when a file
that once carried `OUTPUT — EMBEDDED` no longer parses as bound, instead of
letting it drop into the advisory.

---

## 4. Environmental reproducibility

### 4.1 The child inherits the whole ambient environment, and the tail does not say so

`embed.js:103` copies `process.env` wholesale into the child, then overlays the
`--env` pairs. Only the `--env` pairs reach the recorded `invocation`
(`embed.js:102`). **32 distinct environment variables are read by scripts in
`research/`**, and the names include `CHUNK`, `BIG`, `CAP`, `DEEP`, `SEED`,
`STAGE`, `WIN`, `WINY`, `XMAX`, `NMAX`, `FOLDS`, `SKIP29`, `SKIP31`, `SKIPBIG`,
`SKIPCAL`, `SKIP_BIG`, `QMAX`, `BIGY`, `REPS7`, `REPS8` — generic enough to
collide with a real shell.

Demonstrated on `fold-profile-01-per-copy.js`, which reads `process.env.DEEP`:

```
$ node research/qc/embed.js --check --streams both research/fold-profile-01-per-copy.js
  code-sha256  matches
  out-sha256   matches                                    exit=0

$ DEEP=1 node research/qc/embed.js --check --streams both research/fold-profile-01-per-copy.js
  research/fold-profile-01-per-copy.js: the script did not complete (timed out after 120s).
```

In the check direction this is a false mismatch or a false timeout. In the
**write** direction it is worse: a bind performed with a stray ambient variable
writes a tail whose recorded invocation cannot reproduce it, and nothing in the
fingerprint records why. That tail is permanently unverifiable and looks
identical to a good one.

### 4.2 `nice` and the working directory are neutral, and by construction

Three cheap bound scripts, `02-first-twin-margin.js`,
`attack-03-higher-moments.js` and `genealogy.js`, were re-checked at nice 0 from
the repo, nice 15 from `/`, and nice 19 from `/private/tmp`. **Nine of nine:
both hashes match.** The reason is in the code and worth keeping: `cwd` is pinned
to `REPO` at `embed.js:111`, computed from `__dirname`, so the caller's directory
cannot reach the child; and `normalize` blanks every timing class, so scheduler
pressure cannot move a hash.

The node version is recorded (`embed.js:210`) and never compared: `--check` reads
only `streams`, `code-sha256` and `out-sha256` (`embed.js:144-148`). A tail bound
under one Node and checked under another that formats a float differently would
report a content mismatch with no hint of the cause.

---

## 5. The dependency hole

`code-sha256` covers one file's bytes. Every dependency sits outside it.
**20 bound scripts read something outside their own source**, and the static gate
is blind to all of it.

Demonstrated on a scratch pair: `main.js` requires `helper.js` and prints a
derived constant. After binding `main.js`, `helper.js` alone was edited.

```
static gate view (what qc.js embeds does):
  code-sha256 still matches: true
block still says:  // derived constant 301.500
--check (which does re-run):
  out-sha256   DIFFERS
```

The fast gate stays green. Only a re-run catches it, and re-running is precisely
what the expensive tails cannot afford, which is the whole reason `embeds` exists.

### 5.1 The bound scripts with an input outside themselves

| bound script | reads | dependency's own custody |
|---|---|---|
| `scanstat-t37-04-run.js` | `research/t37-partials/t37-shard-37-{0..4}-of-5.json` (recorded invocation is `--combine-only`, so the shards **are** the result), plus `import-scanstat-03-prereg.js`, `import-scanstat-04-score.js`, `exact-g2-ladder.js` as text, plus `history/staging/scanstat-t37-prereg.md` | shards tracked in git, unhashed by the tail; engine below |
| `scanstat-t37-02-validate.js` | `require ./scanstat-t37-01-engine.js`, `import-scanstat-04-score.js` as text | **engine has no OUTPUT banner** |
| `import-chaining-01/02/03.js` | `require ./sift-limit-lemmaV.js` | **no OUTPUT banner**, cited in 21 documents |
| `import-scanstat-01/02/03/04.js`, `scanstat2-01-t31.js`, `scanstat2-02-crossover.js` | `require ./import-chaining-02.js` (itself bound, transitively on `sift-limit-lemmaV.js`) | bound, but nothing links the two fingerprints |
| `import-scanstat-04-score.js` | `history/staging/import-scanstat-prereg.md` | a prose document gates a run |
| `scanstat2-01-t31.js` | `history/staging/scanstat2-prereg.md` | same |
| `fdecay-deep-01/02/03/04.js` | `require ./fdecay-deep-00-core.js` | **no OUTPUT banner** |
| `greedy-oracle-validation.js` | an instrument file, plus `exact-g2-ladder.js` as text | ladder bound, unlinked |
| `import-talagrand-01-price-c.js` | a prereg file and a note file | prose gates a run |
| `y2-ladder-recompute.js` | a `.js` and a `.md` pair, plus a per-level file set | unhashed |
| `natal-cap-27-t4-at13.js` | its own worker JSONs under `NC27_DIR`, defaulting to `os.tmpdir()` | self-produced, but the directory is ambient (§4.1) |
| `natal-cap-32-wrap-identity.js` | worker JSONs under `NC32_DIR`, defaulting to `os.tmpdir()`; also loads `natal-cap-32`'s own source as a module by string surgery | self-produced, outside the repo, ambient directory |

Unbound but load-bearing, for completeness: `natal-cap-33/34/37` read worker
JSONs from `os.tmpdir()`, `/tmp`, or `~/Files/primeoire-runs/at41`, outside the
repo entirely, and `audit-numbers.js` reads `research/t37-partials/*.json` and
`research/foldL-window5-01-extinction.raw.txt`. `natal-cap-34` additionally reads
`natal-cap-32-wrap-identity.js`'s **source** and appends a `module.exports` line
to it before evaluating it, which is a dependency no path-based input hash would
miss but which no instrument currently records either.

That is 20 bound tails counting `natal-cap-32`, and it is the count the repair
list uses.

### 5.2 What the bind should record

An `inputs:` block in the fingerprint, one line per dependency, path and sha256,
captured at bind time. Two ways to capture it, and the cheap one is enough:

- **static**, today: resolve `require('./…')` targets and literal
  `readFileSync`/`readdirSync` paths out of the source above the tail. Covers
  every row in the table above except the three computed-path cases
  (`shardFile(x,n,i)`, `partPath(s)`, the `natal-cap-*` worker files).
- **observed**, better and not much harder: run the child under
  `NODE_OPTIONS=--require <shim>` that logs `fs.readFileSync`,
  `fs.readdirSync` and `Module._load` resolutions to a side channel, then hash
  everything the run actually touched inside the repo. This catches the computed
  paths and needs no heuristics.

Either way `--check` gains a third line, and a dependency drift becomes visible
statically instead of costing a 33-minute re-run.

---

## 6. The repair list, ranked

The ranking is by how much a defect can cost before anyone notices, not by how
hard the fix is.

**1. A bound OUTPUT block must be hashed against its own bytes.** This is the
one hole that lets an invented figure pass every instrument green, and it is the
exact defect the tool was built for. Add `bodyMatchesOutSha` to `embeds()`:
read the body with the `====` rules kept, normalise, hash, compare to
`out-sha256`. It runs in milliseconds, it needs nothing executed, and it is
**green on 197 of the 198 bound tails today**. Make `--check` report the same
line, so the operator sees three verdicts: code, body, run. Fixing the writer so
`attack-growth-law.js` round-trips (§1.5, emit the tail's closing rule
unconditionally, or refuse to attribute a body's own last rule line to the
header) is a prerequisite and is a two-line change.

**2. No banner must fail loudly, unbound scripts must be counted, and a binding
must not be able to evaporate.** Three parts. In `embed.js`, print the refusal to stdout as well as stderr and use a
distinct exit code, so it cannot be confused with the usage error at
`embed.js:80`. In `checks.js`, stop discarding `!loc` silently: emit a
`no-output-block` advisory in `embedBacklog()` so the migration counter's
denominator is 40 rather than 3, and correct the `// 'scripts' owns that`
comment at `checks.js:1107`, which is not true. And tighten `OUT_HEAD`
(`tailfmt.js:47`) so a prose line beginning with the word `OUTPUT` cannot capture
the banner, plus a `binding-lost` finding for any file containing the string
`OUTPUT — EMBEDDED` that no longer parses as bound (§3.4). That last check is
three lines and would have caught this morning's regression the moment it landed.

**3. `--force` must stamp a visible marker in the tail.** A `forced:` line in
the fingerprint header carrying the date and the count of tokens the guard
flagged — `forced: 2026-08-19, 20 of 154 figures in the replaced block not
reproduced` — plus the first few tokens. It costs one line at
`embed.js:200-214`, it survives the commit, and it turns the audit performed in
§2.2 from an hour of git archaeology into a grep. The ledgers did their job this
time; the artefact should not depend on that.

**4. Input hashes for dependent scripts.** §5.2. Twenty bound tails whose
code-sha can match while their inputs moved, five of them depending on a file
that carries no OUTPUT block at all.

**5. `--check` must re-run the recorded invocation.** Parse `fp['invocation']`
and use it, warning when the command line disagrees. 33 of 198 tails currently
give a false `DIFFERS` when checked the obvious way, and a checker that cries
wolf on one tail in six is a checker people stop running. The same fix belongs
in `qc/tails.js`, whose own regex (`tails.js:86`) misreads a node flag as the
filename: **35 of 198 bound tails would be re-run by `tails.js` with the wrong
command**, most harmlessly as `node research/foo.js research/foo.js`, but
`attack-frontier37-01/02` lose their `full` argument's position and
`a3-01-misalignment-ledger.js` loses its `FOLDS=` environment entirely.

**6. Flag scope.** `has()` at `embed.js:45` must stop scanning past the `--`
separator, and the same for `optOf` at `embed.js:46`. `--force` and `--check`
placed among a script's own arguments currently reach the tool.

**7. Record and compare the environment.** Two halves. Pass a minimal, explicit
environment to the child rather than a copy of `process.env`, or at minimum
detect which of the 32 known variable names are set at bind time and either
refuse or record them in the invocation. And have `--check` compare the recorded
`node:` version, warning rather than failing when it differs, so a formatting
change in a runtime is diagnosed instead of being read as a content mismatch.

**8. Re-embedding a bound tail should show what changed.** Today it is silent
apart from a transient suffix. Print the figures the previous block carried that
the new run does not produce, exactly as the legacy guard does, and require
`--force` for that case too. `attack-lower-bound.js` was a *first* paste; the
second paste over a bound tail is currently the softer path.

**9. Two ledger corrections.** `consolidation-wave.md` §2's table records
`a3-08-adjacent-pairs.js` and `attack2-rankin2d.js` as bound with their
expensive invocations; the fingerprints on disk are the cheap default runs and
the expensive legs live in READINGS. Worth a line, since the table is what a
later reader will price a re-verification from.

---

## 7. A note on the moving corpus

Five `readings traceability` commits, one depth-axis commit and a large
uncommitted working set landed in this repository while this pass ran, and the
counts moved under it: the bound population read 198, then 195, then 198 again
inside two hours, entirely because of §3.4. Every count in this report was
re-measured at the close and is stated against the working tree at that moment.
§3.4's table is the one place where the movement is the finding rather than
noise. The machine also carried a load average near 190 throughout, which is why
§2.4's run did not fit in 40 minutes.

**The gate reads TOTAL 0 at the open and TOTAL 4 at the close, and none of the
four is this pass's doing.** All four are `tail-does-not-belong-to-this-code`, on
`attack-ab-coupling-02-lp.js:992`, `attack-ford-halberstam.js:634`,
`fold-profile-13-hotspot-sweep.js:214` and `attack-theta-margin.js:368`, every one of them a file
with **uncommitted** edits above its OUTPUT banner made by a concurrent pass that
is replacing a broken linear congruential generator with `Math.imul`. Those are
real code corrections, and `embeds` flagging them is the check working exactly as
designed: the code changed, so the tail no longer belongs to it, and the owner
has to re-embed. Reported, not touched, per the standing rule on a persistent
nonzero this pass did not cause. This pass wrote one file,
`research/history/staging/verify-the-verifier-embeds.md`, and no script.

---

## 8. What was run

- `node research/qc.js` at the open: **TOTAL 0**. At the close: **TOTAL 4**, all
  four caused by another agent's in-flight RNG correction, itemised in §7.
  `node research/qc/selftest.js` green at the close: 24 known positives fire, 14
  controls silent. This pass edited no script and no check.
- `embed.js --check`: `attack-01-gap-cartography`,
  `attack-06-difference-hierarchy`, `attack-06b-difference-map`,
  `attack2-01-06-seam-census`, `attack2-05-07-integral-ladder`, `genealogy`,
  `attack-growth-law`, `fold-profile-01-per-copy`, `a3-04-maxsum-recursion`
  (with and without `--t29`), and `02-first-twin-margin`,
  `attack-03-higher-moments`, `genealogy` again at three nice levels and three
  working directories. All match except the two deliberate false-mismatch
  demonstrations.
- `natal-cap-27-t4-at13.js` at `nice 15`, `--streams both`, `--timeout 2400`:
  did not complete, §2.4. This was the one run inside the budget on its recorded
  cost (26 min) and outside it on the machine's actual state.
- **Not re-run, priced over budget:** `lp-push-x43.js` (33 min recorded),
  `verify-ladder-big.js` (55 min recorded). Both are reported as unverified by
  re-run; their forced costs in §2.2 are replayed from git against the bound
  block, which is a weaker check and is labelled as such.
- Not re-run, cheaper but not reached: `a3-02-diagonal-f.js` (268 s, needs a
  node flag and five arguments), `a3-08-adjacent-pairs.js` (90 s),
  `attack2-rankin2d.js` (168 s), `natal-cap-35-x-multiplicity.js` (95 s).
- Scratch demonstrations, all on copies under the session scratchpad, none in
  the repository: the forged tail, the dependency edit, the no-READINGS
  deletion, the timeout, the non-zero exit, the post-`--` flag leak, and the
  re-embed of a bound tail.
