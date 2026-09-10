# The hyperuniformity conflation leaves the vocabulary: GLOSSARY split in two, one staging note corrected, ten loose uses in nine documents left addressed but untouched

<!-- ledger
id: Q-applied-0828-glossary
status: ANSWERED
todo: none
question: Was the hyperuniformity conflation corrected?
verdict: In the vocabulary yes: GLOSSARY's single entry is split into Sub-Poisson window counts (Var/E), which keeps every measured value, and Hyperuniformity, which now carries Torquato's definition, the class I/II/III taxonomy, the tile's vacuous class I by periodicity and the sub-Poisson-not-hyperuniform reading at L = y^u; in the corpus no, one staging note is corrected here and ten further loose uses in nine .md files plus eighteen in seven scripts sit outside the fence with their replacement sentences listed below.
-->

*(2026-08-28. Integration of the taxonomy correction from
`history/staging/import-repulsive.md` §3 and `redteam-0828-litimports.md` §7b,
§7d. Fence: this pass edited `research/GLOSSARY.md` and
`research/history/staging/excess-chain-c.md`, and wrote only this file. It
edited no other `research/*.md`, no `paper/` file, no script, no `TODO.md`, no
`README.md`, and not `research/history/CHANGELOG.md`, whose text is in §4 for
the holder. It ran no git command and did not run `research/qc.js`. Every number
below is carried from the source notes; nothing is recomputed here, and both
source notes remain HELD.)*

---

## 0. What is still open after this pass

**The correction is a vocabulary correction and nothing else.** No route opened,
no exponent moved, no measurement changed. What changed is which word names
which object. The measured `Var/E` readings, the extremal-excess law and the
HEURISTIC limit 0.45546 are carried verbatim from the old entry into the new
`Var/E` one and are neither re-verified nor re-derived here.

**Ten loose uses survive in files this pass could not touch**, across eight
`research/*.md` documents plus `paper/wall-note.md`, and eighteen more in seven
scripts. Until they are edited the corpus still says "hyperuniformity" for a
sub-Poisson variance ratio in the live layer, which is the defect this pass
fixes only in the lookup document. §2 lists every one with the sentence that
should replace it.

**Nothing here was re-verified at a source.** The Torquato pages now in the
GLOSSARY are `import-repulsive.md` §6's, as corrected by
`redteam-0828-litimports.md` §7b: they are arXiv:1801.06924 pages, and the
journal article's pagination is different. The entry says so in its own text. If
that page reading is wrong, the citation is wrong and the mathematics is not.

**The gate has not run.** `research/QUESTIONS.md` is generated and is stale for
`Q-applied-0828-glossary` until `node research/qc.js --index` runs. This note's
ledger block names no TODO item, so no `Ledger:` line is owed.

---

## 1. The edits

### 1a. `research/GLOSSARY.md`, the one entry split into two

The entry at line 393 defined **Hyperuniformity** as "the natal field's
suppressed large-scale density fluctuation: window counts are sub-Poisson,
`Var/E` drifting 0.152 → 0.396 across @7..@37 rather than sitting at 1", and
then spent twenty lines on the `Var/E` ladders, the refuted 0.611 reading and the
standing 0.45546 closed form. By Torquato's definition that is not
hyperuniformity, so the entry named one object with another object's word.

**Edit 1, the term renamed.** The entry keeping all of the quantitative content
is now **Sub-Poisson window counts (Var/E)**. Its opening gains one sentence:
"This is NOT hyperuniformity; see that entry below." Nothing else in it changed:
the extremal-excess law, both ladders, the refuted fit inference and the
HEURISTIC closed form are the old text, word for word.

**Edit 2, a new Hyperuniformity entry**, placed immediately after it. It carries,
in this order:

| the entry says | rung | source |
|---|---|---|
| a configuration is hyperuniform when its structure factor vanishes at zero wavenumber | definition | Torquato, *Phys. Rep.* **745** (2018) 1–95, at arXiv:1801.06924 eq. (14) p. 10 |
| the taxonomy is by the growth of the local number variance `Var[N_L]`: class I as the window surface area, bounded in one dimension; class II with an extra `ln L`; class III as `L^{1−α}` | definition | §5.3, arXiv p. 23 |
| every periodic configuration is class I | cited theorem | §5.5, arXiv p. 28 |
| the tile is periodic with period `W`, so `Var[N_L]` is `W`-periodic and `Var[N_W] = 0` exactly, which puts every level in class I and carries no arithmetic, since no window any live document reasons about exceeds one period | PROVEN, and vacuous | `import-repulsive.md` §3 |
| at `L = y^u` with `u` fixed the twin-slot count variance grows linearly in `L` with `Var/E` between 0.152 and 0.396, which is the Poisson scaling with a reduced prefactor: sub-Poisson, not hyperuniform | MEASURED | `import-repulsive.md` §3, `paper/variance-note.md` §§6, 7 |
| that reading is a statement about the diagonal family of configurations, one per level, not a class for any one tile, and the values live under **Sub-Poisson window counts (Var/E)** | calibration | `redteam-0828-litimports.md` §7d |
| the effective-hyperuniformity fallback `S(0)/S(k_peak) ≲ 10⁻⁴` fails too, the ratio being of order `10⁻¹` to `10⁰` | MEASURED | §11.1.6 eq. (252), arXiv p. 78 |
| what is genuinely small-`k` is the comb's structure factor `S(ν) = δŴ(ν)`, which `natal-cap-29-sigma-plateau.js` computes under another name | MEASURED | `import-repulsive.md` §3, PART 7 |

The entry states in its own text that the page numbers are the preprint's and not
the journal's, per `redteam-0828-litimports.md` §7b, so the citation defect that
pass found is not propagated into the vocabulary.

**No other GLOSSARY sentence uses the word.** `grep -n -i hyperuniform
research/GLOSSARY.md` returned line 393 only before this pass.

### 1b. `research/history/staging/excess-chain-c.md`, 2 edits

| section | old reading | new reading |
|---|---|---|
| §1(ii) | "the single scalar by which the extreme-value law of a **hyperuniform** field misses the measured maximum" | "of a **sub-Poisson** field", the rest unchanged |
| §2, the tail object | "`Var(W) = 0` identically, so the field is hyperuniform, and cap-25's pre-registered discrepancy lemma caps every deviation at `2·3^k`" | "`Var(W) = 0` identically, which makes `σ²(l)` `W`-periodic and puts the field in Torquato's class I by periodicity alone, a classification that is exact and arithmetically empty; at the window scales read here the counts are sub-Poisson, not hyperuniform (GLOSSARY, Hyperuniformity; `import-repulsive.md` §3). cap-25's pre-registered discrepancy lemma caps every deviation at `2·3^k`" |

The second is the sharper of the two: the note used `Var(W) = 0` as the *reason*
the field is hyperuniform, which is exactly the periodicity argument that makes
the classification vacuous. The note's own mathematics is untouched, and its
verdict on `c` does not depend on the word.

---

## 2. Every hit, and what was left for its holder

`grep -rn "hyperuniform" research/*.md research/history/staging/*.md paper/*.md`
hits 22 files, this note excluded. The case-sensitive form missed
`GLOSSARY.md`'s own capitalised entry before this pass, which is why the brief's
grep did not report the entry it was sent to correct. Sorted by what the hits
do:

### 2a. Loose, outside the fence, replacement sentence offered

| file, line | the sentence | offered replacement |
|---|---|---|
| `research/G2-STATE.md`:792 | "so the pipeline reports non-hyperuniformity when it is there" | "so the pipeline reports Poisson-scale fluctuation when it is there" |
| `research/FOLD-PROFILE.md`:108 | "This is hyperuniformity in the copy index." | "This is sub-Poisson dispersion in the copy index, and not hyperuniformity in Torquato's sense (GLOSSARY, Hyperuniformity)." |
| `research/discrepancy-two-class.md`:242 | "The pipeline reports non-hyperuniformity when it is there." | "The pipeline reports Poisson-scale fluctuation when it is there." |
| `research/level-ledger-tight.md`:310 | the same sentence | the same replacement |
| `research/maier-matrix.md`:494 | "which is the same hyperuniformity FOLD-PROFILE §3 measured, but small measured dispersion is not a bound" | "which is the same sub-Poisson dispersion FOLD-PROFILE §3 measured, but small measured dispersion is not a bound" |
| `research/origin-excess.md`:226 | "because the ensemble is hyperuniform" | "because the ensemble's window counts are sub-Poisson" |
| `research/sift-limit-attack.md`:23 | "exact J₅, the hyperuniform plateau, the mod-30 five-lag rigidity" | "exact J₅, the sub-Poisson σ-plateau, the mod-30 five-lag rigidity" |
| `paper/wall-note.md`:394 | "the correlation function, the hyperuniformity, the mod-30 rigidity" | "the correlation function, the sub-Poisson window variance, the mod-30 rigidity" |
| `research/SCRIPTS.md`:75, 330 | "NATAL-CAP-29 — THE σ-PLATEAU DERIVED: the hyperuniform variance's level law" | generated from the script's own header line 2; it changes when the script does, not before |

Five of these are the five `applied-0828-litimports.md` §5 lists
(`level-ledger-tight.md`, `FOLD-PROFILE.md` §3, `discrepancy-two-class.md`,
`sift-limit-attack.md`, `natal-cap-29-sigma-plateau.js`). The other four
(`G2-STATE.md`, `maier-matrix.md`, `origin-excess.md`, `paper/wall-note.md`) are
found by this pass's grep and were not on that list.

### 2b. Correct use, no edit owed

- `research/SEARCH-CONVENTIONS.md`:46 and `research/IMPORT-MAP.md`:143 name
  hyperuniformity as the *literature's* owning convention for sub-`√m`
  fluctuation. That is what the word is for, and the rows are right.
- `research/sift-limit-attack.md`:385 cites Torquato, Zhang and de
  Courcy-Ireland on primes as effectively limit-periodic hyperuniform point
  sets. A citation of somebody else's classification of a different object.
- `research/IMPORT-MAP.md`:159 (row 17) already carries the corrected reading.
- `research/QUESTIONS.md`:41, 70, 104, 118 are generated from ledger blocks that
  are themselves correct.
- `research/history/staging/`: `import-repulsive.md` (the source),
  `redteam-0828-litimports.md`, `applied-0828-litimports.md`,
  `applied-0828-registries.md`, `recon-0828-rough.md` and
  `identifications-prior-art.md` all use the word for the taxonomy or report the
  demotion. No edit.
- `research/PRIOR-ART.md`:648, "our variance and hyperuniformity front", names
  the front by its convention rather than classifying the tile. Borderline and
  left as it stands; if a holder wants it tightened, "our variance and
  window-fluctuation front" says the same thing without the taxonomy word.

### 2c. Deliberately not edited, though inside the fence

`research/history/staging/import-map-rows-15-17.md` §§1, 17, 6(a) (lines 58, 125,
141, 144, 365) reads the sub-Poisson `Var/E` as a hyperuniformity statement. That
file is the **pre-registration** for row 17, and `import-repulsive.md` §7 records
the reading as DEMOTED by the row's own run. Editing a prereg after its result is
in destroys the record of what was predicted. Left as written, with the demotion
already recorded downstream.

### 2d. Scripts, outside the fence

Eighteen further loose uses sit in `research/natal-cap-25-excess-law.js` (3),
`research/natal-cap-29-sigma-plateau.js` (3, including the title line SCRIPTS.md
regenerates from), `research/natal-cap-17-cheap-laws.js`,
`research/natal-cap-18-at29.js`, `research/natal-cap-33-overnight.js`,
`research/discrepancy-two-class.js` (4) and `research/level-ledger-tight.js` (5).
Most are comments, but several sit inside `console.log` strings and inside the
embedded OUTPUT blocks that mirror them, so any edit there has to go through
`node research/qc/embed.js` rather than through a text substitution. Not
attempted here.

---

## 3. What is not claimed

The tile's class I membership is proven and empty, and calling it out does not
make the tile more or less structured than the day before. The sub-Poisson
reading is a measurement over a finite range of levels on two different ladders,
its limit is open, and `paper/variance-note.md` §4 already records that `Var/E`
says nothing about the one anchored window the twin problem needs. This pass
moved a word.

---

## 4. CHANGELOG entry text, for the holder of `research/history/CHANGELOG.md`

```
## 2026-08-28 — the hyperuniformity conflation leaves the vocabulary

`research/GLOSSARY.md`: the Hyperuniformity entry is split in two. The
quantitative content, the sub-Poisson window counts with Var/E drifting
0.152 → 0.396 across @7..@37, the extremal-excess law E = 0.97·σ(ℓ)·√(2ln(W/ℓ)),
the two ladders, the refuted 0.611 fit inference and the HEURISTIC limit
0.45546, keeps its text under the new term **Sub-Poisson window counts
(Var/E)**. A new **Hyperuniformity** entry carries Torquato's definition
(the structure factor vanishing at zero wavenumber) and the class I/II/III
taxonomy by the growth of Var[N_L], cited to Physics Reports 745 (2018) 1–95
read at arXiv:1801.06924 and by ITS pages, eq. (14) p. 10, §5.3 p. 23, §5.5
p. 28 and eq. (252) p. 78, with the entry stating that the journal pagination
differs. It records that the tile is periodic with period W, so Var[N_L] is
W-periodic and Var[N_W] = 0 exactly, which makes every level class I by
periodicity alone, PROVEN and arithmetically empty since no live document
reasons about a window longer than one period; and that at L = y^u with u fixed
the twin-slot count variance is linear in L with Var/E between 0.152 and 0.396,
which is sub-Poisson and NOT hyperuniform, MEASURED, and is a statement about
the diagonal family of configurations rather than a class for any one tile. The
effective-hyperuniformity fallback S(0)/S(k_peak) ≲ 10⁻⁴ fails at order 10⁻¹ to
10⁰. Per `history/staging/import-repulsive.md` §3 and
`redteam-0828-litimports.md` §7b, §7d, routed by
`applied-0828-glossary.md`.

`research/history/staging/excess-chain-c.md`, §1(ii) and §2: "the extreme-value
law of a hyperuniform field" becomes "of a sub-Poisson field", and "Var(W) = 0
identically, so the field is hyperuniform" is replaced by the periodicity
reading, that Var(W) = 0 makes σ²(l) W-periodic and puts the field in class I
vacuously, with the counts at the window scales read there being sub-Poisson.
The note's verdict on c is unchanged. Per `import-repulsive.md` §3.

Not applied, and listed with their replacement sentences at
`applied-0828-glossary.md` §2: nine further loose uses of the word in
`research/G2-STATE.md`, `research/FOLD-PROFILE.md`,
`research/discrepancy-two-class.md`, `research/level-ledger-tight.md`,
`research/maier-matrix.md`, `research/origin-excess.md`,
`research/sift-limit-attack.md`, `paper/wall-note.md` and the generated
`research/SCRIPTS.md`, plus eighteen in seven scripts whose embedded OUTPUT
blocks mirror them. `research/history/staging/import-map-rows-15-17.md` is left as written
because it is row 17's pre-registration.
```

---

*This document states current understanding at 2026-08-28.*
