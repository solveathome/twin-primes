# Audit: the same object, two documents, two values (2026-08-18)

<!-- ledger
id: Q-audit-cross-doc
status: ANSWERED
todo: none
question: Where does the corpus carry two values for the same object in two different documents?
verdict: Twenty-six findings ranked A, B and C, eighteen of them the Kourbatov shape where the resolution was already on disk in a document the stale one cites by name, including a retracted theta column quoted as live in nine places and a prior-art collision on the dimension-2 Rankin accounting; the gate read 0 findings before and after.
-->

**The hole this audit covers.** Every existing QC check sweeps for
contradictions *inside* one document. Nothing compares a claim in one document
against the same claim in another. The Kourbatov failure that prompted this
audit is the shape: `ZONE-POSTULATE.md` asserted a maximal-twin-gap law that
`two-class-lower-bounds.md`:103 and `PRIOR-ART.md`:161 already recorded as
published prior art with a different constant. Three files, one object, and the
strongest file lost.

**Scope.** `research/*.md`, `paper/*.md`, `web/*.md`, `TODO.md`, `README.md`,
`attestation/README.md`, `web/bench/README.md` — 70 working documents.
`research/history/**` is excluded by design; it is the append-only archive and is
supposed to hold superseded values. `research/SCRIPTS.md` is excluded as
generated. Scripts were read as evidence, never audited as claims.

**Method.** Object-centric, not string-centric: build the (object, value,
verdict) triples per document, translate house names to canonical names before
grouping (tile = primorial wheel, fold = sieve extension by the next prime,
G₂ = two-class twin Jacobsthal, zone = the interval (x, x′²), θ_true = the exact
all-positions window exponent), then flag only the groups whose members
disagree. Every reported disagreement names which innocent explanations were
ruled out: **(a)** different objects that look alike, **(b)** different
normalisations, **(c)** a legitimate marked supersession, **(d)** rounding or
overlapping bands.

**26 genuine disagreements: 6 rank A, 17 rank B, 3 rank C.** Nothing was fixed
and nothing was decided. Research judgement calls are queued in §Questions.

**A note on my own first pass.** Three of the findings below (A6, B15, B16) were
in my near-miss list until a second, deeper check overturned them. They are the
hardest class in this corpus: two documents that *look* like they are reconciling
a normalisation, and are not. The reconciliation sentence is what makes them look
innocent, and the reconciliation sentence is where the error is. I have left a
note on each saying what I first ruled and what changed it.

---

## Calibration, first, because the brief requires it

The known case was fixed in the working tree earlier today, so calibration ran
against `git show HEAD:research/ZONE-POSTULATE.md` in a scratch copy.

The object-centric sweep for *the maximal twin gap law* — over the house name
(`max A`, "the anchored first-twin distance") and the canonical name ("maximal
twin gap", `0.76 log³p`, `ln³p`) — returns, in one pass:

- scratch `ZONE-POSTULATE.md`:138 — "**max A = (0.49 ± 0.09)·ln³v per decade,
  flat over nine decades**, band 0.321 to 0.571 with no trend"
- `research/PRIOR-ART.md`:166-170 — "**Owns the maximal-twin-gap law outright.**
  Table 1 fits record twin gaps against log³p by decade — slopes 0.4576, 0.4756,
  0.5203, 0.5628 … with the stated ceiling *'Maximal gaps between twin primes are
  less than 0.76 log³ p'*"
- `research/two-class-lower-bounds.md`:103 — "| 11 | Kourbatov's maximal twin-gap
  law | **CONJ**, and it is `0.76 log^3 p`, not `log^2` | arXiv:1301.2242 |"

Grouped, the disagreement is visible on two axes at once: the constant (0.49
against a published ceiling of 0.76) and the verdict (*flat, no trend* against
four published slopes rising monotonically over the same decades). Two files
already carried the resolution. **CALIBRATION PASSES; the method is not widened.**
Re-run against the current tree, the same sweep returns agreement, confirming the
fix. No other document still carries the retracted `max A` figure.

---

## Ranking

**A** — a load-bearing constant or verdict in a live argument, or in a document
headed out of the repo. **B** — a number or label somebody would quote, in a
working document. **C** — a scope word or a pending-work marker.

| # | rank | object | shape |
|---|---|---|---|
| A1 | A | θ_true, the exact all-positions window exponent | retracted at source; 9 sites still quote it, one is a paper |
| A2 | A | "the Rankin accounting in dimension 2" as ours | prior-art collision: published 2024, 5 sites still say ABSENT |
| A3 | A | x²/certificate on the covering ladder | 2 sites carry the pre-repair row and cite the file that repaired it |
| A4 | A | how many exact G₂ terms are known | 12 in seven documents, 13 in five, 14 in a script and no prose |
| A5 | A | s/u at the ladder's measured working point | 1.2 in seven documents, 1.62–1.72 in TODO |
| A6 | A | the localized max gap band M(x,x′²)/ln³x | "flat at 3.2 to 3.7" in four documents against 2.93–4.20 and 2.14–4.39 on two engines |
| B1 | B | the skeleton door's share of the mass | "about a tenth" in three, "essentially none" in the home |
| B2 | B | the best constructed G₂ lower bound, and the ladder's reach | 356,712 at x=4001 / 16 levels vs 479,340 at x=5003 / 17 |
| B3 | B | the @13 beyond-Chebyshev bound | "waiting on compute" vs established |
| B4 | B | what full decoupling at 1+√e buys | "halves the open band" vs "about 71%" |
| B5 | B | seam slot-hood enrichment | "about 25×" vs "20× to 28×, level by level" |
| B6 | B | the seam HL constant's verification tolerance | 0.2–0.6% vs 0.1–0.6% |
| B7 | B | the seam-hierarchy copy-law's accuracy | "four decimals at every depth" vs m ≤ 6 only |
| B8 | B | β₂'s decimal expansion and page attribution | in the OEIS draft, against `dhr-verification.md` |
| B9 | B | the grain census law | "awaits a law" vs "HAS a law as of 2026-08-14" |
| B10 | B | the d ↦ G_d map | listed OPEN vs "studied here and refuted, not an open object" |
| B11 | B | the census ladder D₁₇ | 25,515 in the proposal vs 22,275 everywhere |
| B12 | B | the anchored VR rank at @17 | 2 of 510,510 vs 10 of 510,510 |
| B13 | B | how many levels β is measured at | "nine times" vs ten |
| B14 | B | the control-corrected certificate-ladder exponent | 1.11–1.25 vs 1.15–1.19 |
| B15 | B | the k ≥ 3 localized band M/(k·ln³x) | 1.2–1.6 / 1.2–1.75 against a registered prediction REFUTED at 2.14 |
| B16 | B | whether the k = 2 and k = 3 readings are one number | "this row read at k = 2" against arithmetic that gives 2.4–3.2 |
| B17 | B | the corridor's closing rate | 0.52% at n = 3e6 against the same entry's own closed form, 1.48% |
| C1 | C | the greedy oracle test | pending in TODO, established in the research layer |
| C2 | C | the "8 to 15 σ_X" collapse | unscoped in two papers, "@13 and @17" elsewhere |
| C3 | C | the Unification Law's ρ(u) domain | "u ≤ 2" vs "1 ≤ u ≤ 2" |

**One root cause dominates.** Sixteen of the twenty-two have the Kourbatov
signature exactly: the resolution is already on disk, in a document the stale one
**cites by name**. A1's nine sites all cite `theta-ladder.md` §5b, which is where
the retraction lives. A3's two sites cite `two-class-lower-bounds.md` §10, which
is the section that changed. B14 cites the file it disagrees with, in the
sentence that disagrees.

---

# RANK A

## A1. The retracted θ column, quoted as live in nine places including a paper

**OBJECT.** θ_true, the exact full-period supremum of the window exponent at
which the Brüdern–Fouvry vector-sieve certificate is positive at every position.
House names: "the unconditional column", "the exact suprema", "the decisive
instrument". Derived verdict: "θ crossed 2 upward between z = 23 and z = 29".

**The resolution, in the source document, dated the same day.**
`research/theta-ladder.md`:408-421 —

> **⚠ CORRECTION 2026-08-18: THE CROSSING DOES NOT HAPPEN, AND EVERY `need_true`
> IN THIS SECTION IS MEASURED AT THE WRONG WINDOW.**
> `research/theta-ladder-sup.js`:18 reads `const z=Number(process.argv[2]), u=3.2,
> s=3.0;` — **z comes from the caller and u never does.** … Measured
> self-consistently by exhaustive full-period walk, `need_true/z²` is **0.5485 /
> 0.4877 / 0.4637** at z = 19 / 23 / 29 against the 0.869 / 0.849 / 1.006 printed
> below — overstated by 1.58x, 1.74x and **2.17x**. … **Nothing crosses.** The
> prefix rows past z = 31 are lower bounds on an overstated quantity and therefore
> bound nothing for this question. The numbers below are left in place as the
> custody record of what was run; **do not quote them.**

`research/theta-ladder.md`:683-691 repeats it ("**SUPERSEDED 2026-08-18 — this
was called 'the headline of the run' and it does not survive** … it must not be
quoted"). `TODO.md`:68-78 carries the retraction and :80 draws the consequence:
"**What retires with it:** the theta ladder as a TPC-reachability instrument".
`research/history/CHANGELOG.md`:56-60 records it.

**Still asserting the retracted column, unmarked:**

| file:line | exact text |
|---|---|
| `paper/wall-note.md`:371-376 | "The exact full-period supremum of the window exponent at which the certificate is positive at every position reads 1.9524, 1.9477, 2.0018, 2.0476 at z = 19, 23, 29, 31, with a 4 × 10⁹-position prefix supremum holding above 2.05 through z = 71. … the requirement fits inside the zone budget only at the two smallest points available and misses by at least half again from z = 43 on" |
| `research/G2-STATE.md`:26 | "the all-positions exponent θ, the one place a second route could have moved, is above 2 and rising (§7)" |
| `research/G2-STATE.md`:659 | "θ turning over below 2, the second route to exponent 2 \| **REFUTED**, θ crossed 2 upward between z = 23 and z = 29 and is rising \| `theta-ladder.md` §5b, §6" |
| `research/G2-STATE.md`:722, 735-745 | heading "## 7. The theta ladder: it does not turn over"; the table "\| θ_true \| 1.9524 \| 1.9477 \| 2.0018 \| 2.0476 \| >2.0495 \| …" and "\| need/z² \| 0.8693 \| 0.8487 \| 1.0060 \| 1.1776 \| …"; then "It fitted inside the zone budget z² only at z = 19 and z = 23, crossed 2 upward between z = 23 and z = 29" |
| `research/ZONE-POSTULATE.md`:233-244 | "*The all-positions exponent θ is above 2 and rising, which went against us.* … **1.9524, 1.9477, 2.0018, 2.0476 at z = 19, 23, 29, 31** … crosses upward at z = 29, and exceeds it by at least half again from z = 43 on. **θ does not turn over below 2, and it does not settle at 2.**" |
| `research/sift-limit-attack.md`:40-45 | "theta sits **above 2 and is rising**: the exact full-period suprema are 1.9524, 1.9477, 2.0018, 2.0476 at z = 19, 23, 29, 31, and a 4·10⁹-position prefix supremum holds it above 2.05 through z = 71" |
| `research/sift-limit-attack.md`:306-309 | "the true all-positions requirement at z = 19 and z = 23 is exponent 1.9524 and 1.9477, inside the zone budget, and it crosses 2 by z = 29 and never comes back" |
| `research/sift-limit-attack.md`:383-384 | "The unconditional requirement, which owes nothing to any maximal law, is above 2 from z = 29 on." |
| `research/README.md`:70 | "does the all-positions exponent θ turn over below 2? **Exact suprema say no** \| LIVE" |

**Which is correct, and why.** The correction. The defect is verifiable in one
read: `research/theta-ladder-sup.js`:18 hard-codes `u = 3.2` while `argv[2]`
supplies `z`, `argv[3]` the prefix limit and `argv[4]` the `gauss` flag — `u` is
never taken from a caller, so every `need_true` measures sup|R| over `H = z^3.2`
while every conclusion drawn from it concerns `H ≈ z²`, a window 39× to 62× too
long. The self-consistent values invert the verdict: `need_true/z²` of 0.5485 /
0.4877 / 0.4637 gives θ_true ≈ 1.80 / 1.77 / 1.77, below 2 everywhere. The live
status of "does θ turn over below 2" is **UNKNOWN pending the one-line fix**
(`TODO.md`:95), not REFUTED.

**One file already carries the resolution?** Yes — the very file every one of the
nine sites cites. `G2-STATE.md`:659 and :729 name "`theta-ladder.md` §5b, §6" as
their authority, and §5b is where the correction box sits.

**Aggravating detail.** `ZONE-POSTULATE.md`:236-241 carries its own dated
2026-08-18 correction of a *different* number in the *same sentence* (2.05 →
2.0495). It was edited on the day of the retraction, for a rounding nit, without
the retraction being applied.

**Ruled out.** (a) One object under three house names; every site names the same
four values at the same four z. (b) Not a normalisation — the correction is that
H itself was the wrong length. (c) No site carries a marker; each presents the
column as the run's firmest, least conditional result. (d) 0.5485 against 0.8693
is a factor 1.58 and the sign of the conclusion flips.

**Partly recorded already.** `research/history/staging/audit-self-contradiction.md`
finding 1 lists three of these sites as propagation of a within-file
contradiction. **New here: `paper/wall-note.md`:371-376** — the paper-grade site,
and the one that would leave the repo — plus `G2-STATE.md`:26 and the table at
:735-739, `sift-limit-attack.md`:306-309 and :383-384, and `research/README.md`:70's
router entry. Note also `TODO.md`:234-235 still leans on the ladder ("The theta
ladder's above-2 column is the verdict on the SIEVE version only") 155 lines after
retiring it.

---

## A2. Prior-art collision: the dimension-2 Rankin accounting was published in 2024

**OBJECT.** Whether the Erdős–Rankin / Maier–Pomerance accounting has been run
for a multi-class (dimension-2) sieved set anywhere in the literature.

**The resolution.** `research/covering-dive.md`:130, dated 2026-08-18 —

> "**A multi-class Erdős–Rankin paper DOES exist, and one of its authors is the K
> of FKMPT.** Alexander Kalmynin and Sergei Konyagin, *A polynomial analogue of
> Jacobsthal function*, arXiv:2302.00459v2 …, **published as Izvestiya:
> Mathematics 88:2 (2024) 225-235**, DOI 10.4213/im9467e, MR4727548 … Their
> parameter M(f) … is exactly the average number of classes deleted per prime, and
> **M(x²) = 2**. Their gain over Rankin is the Rankin factor raised to the
> M(f)-th power, so for a quadratic it is squared, landing at y·ln²y up to
> loglog factors — the same shape this document states as its own target …
> **What survives is the narrower claim**: no Erdős–Rankin construction has been
> *written down* for G₂. **[the blanket sentence REFUTED 2026-08-18 by fetching
> the source; the narrowed absence stands …]**"

The same file closes the paragraph "That belongs to
`research/two-class-lower-bounds.md` §4b and §6 and is **handed back** rather than
edited from here", and :178 adds "this target is no longer open ground."

**Still asserting the absence:**

| file:line | exact text |
|---|---|
| `paper/moire-primes.md`:607 | "(iii) The two-class Erdős–Rankin problem: how long an interval can the *unshifted* Scour classes actually cover (Paper IV's experiment; **no literature exists**)." |
| `research/two-class-lower-bounds.md`:97 | "\| 5 \| the same accounting run in dimension 2 \| **ABSENT**; done for the first time in §4 here \| \|" |
| `research/two-class-lower-bounds.md`:207 | "**Nobody has run this accounting in dimension 2.** §4 does it." |
| `research/two-class-lower-bounds.md`:276 | "**The Maier-Pomerance accounting, run in dimension 2 for the first time.**" |
| `research/G2-STATE.md`:797 | "\| the two-class Rankin accounting, giving log x and not a power \| INFERRED \| Maier-Pomerance's own ledger run in dimension 2 **for the first time** \|" |
| `research/PRIOR-ART.md` | **carries no Kalmynin–Konyagin row at all** — the register a reader consults to check exactly this |

**Which is correct, and why.** `covering-dive.md`. It fetched the source, carries
the DOI and MR number, verified publication at the publisher, and states two
distinct corrections to its own earlier reasoning (`covering-dive.md`:132 and
:170). The correct claim is the *narrowed* one, which `covering-dive.md` also
states: no Erdős–Rankin construction has been written down **for G₂**, because
K–K shift the value while G₂ shifts the argument. `paper/moire-primes.md`:607's
blanket "no literature exists" is the sharpest error, because it is in a paper
draft and it is not narrowed.

**One file already carries the resolution?** Yes, and it explicitly hands the fix
to the two files that still carry the old claim, by name and section number. The
handback was not taken.

**Ruled out.** (a) Same accounting on both sides; `covering-dive.md` establishes
the identification through M(x²) = 2. (b) `two-class-lower-bounds.md` says
"ABSENT" flat and "for the first time", with no narrowing clause — so this is not
a scope difference. (c) `covering-dive.md` is the newer document and none of the
five sites is marked. (d) ABSENT and "for the first time" are the corpus's own
legend terms, not hedges.

**Consequence.** This is the novelty boundary, the thing the moratorium exists to
protect, and the register that governs it has no row for the paper.

---

## A3. x²/certificate: two documents carry the pre-repair row and cite the file that repaired it

**OBJECT.** x² divided by the certified two-class covering certificate (a lower
bound on G₂(x#) − 1) — the ratio that measures how much of the zone the best
construction reaches.

**The source, repaired 2026-08-18.** `research/two-class-lower-bounds.md`:850-852 —

> "On the certificate ladder the same ratio climbs monotonically, **2.6, 7.1,
> 17.8, 45.1, 52.2** at `x = 37, 229, 1009, 4001, 5003`."

**Still asserting the pre-repair row:**

- `research/ZONE-POSTULATE.md`:202-206 — "The certificate ladder, a proven lower
  bound on G₂, gives x²/certificate climbing monotonically at **3.8, 7.8, 18.1,
  44.9** at x = 37, 229, 1009, 4001, so the best construction's share of the
  window collapses over a 108-fold range in x
  (`research/two-class-lower-bounds.md` §10)."
- `research/G2-STATE.md`:864-866 — "its growth (**3.8, 7.8, 18.1, 44.9** at
  x = 37, 229, 1009, 4001) does not by itself prove x²/G2 grows."

**Which is correct, and why.** The repaired row. The certificates themselves moved
when the search was fixed — 355 → **527** at x = 37, 6,748 → **7,372** at 229,
56,213 → **57,245** at 1009 (`two-class-lower-bounds.md`:488-494) — and the
arithmetic follows: 1369/527 = 2.598, 52441/7372 = 7.11, 1018081/57245 = 17.78.
The old figures reproduce exactly from the retired certificates
(1369/355 = 3.86, 52441/6748 = 7.77, 1018081/56213 = 18.11), which confirms the
provenance rather than leaving it to inference.

**One file already carries the resolution?** Yes, and `ZONE-POSTULATE.md` cites it
by section in the same sentence. `G2-STATE.md` is worse: its own §5a table at
:622-626 prints the *new* certificates (527, 7,372, 57,245, 479,339) and :609-610
says "the sentence this file used to carry, that the best construction reaches
0.672 of the truth, should read 1.000" — while §9 at :865 still runs on the old
ladder.

**Ruled out.** (a) All three name `x²/certificate` on the same greedy ladder at
the same x. (b) Same x², same normalisation. (c) Neither dependant is marked.
(d) 3.8 against 2.6 is 46%.

**One loose end inside the source, for Chris rather than for the audit.**
`two-class-lower-bounds.md`:851's "45.1 at x = 4001" is computed from the
repaired-search value 354,729, while :516 of the same file rules that "the
certified lower bound at those levels is the larger, older number" (356,711),
which gives 44.9. One of those two lines is wrong within one file.

---

## A4. How many exact G₂ terms are known: twelve, thirteen, or fourteen

**OBJECT.** The exact terms of G₂(p#), the corpus's central sequence and the one
held for OEIS submission.

**Every printed term value agrees, digit for digit, everywhere.** What disagrees
is how many the corpus believes are known.

**Thirteen, carried by:** `paper/beta2-note.md`:61-65 ("G₂ = 2, 6, 12, 30, 42, 66,
108, 150, 204, 258, 348, 528, **546** for pₙ = 2, 3, …, 41. The thirteenth term is
new (2026-08-18)"); `research/two-class-lower-bounds.md`:392-404 and :692 ("at all
thirteen exactly-known terms"; "The exact value is **`G2(41#) = 546`**");
`research/G2-STATE.md`:635-639; `research/covering-dive.md`:177 ("the full
thirteen-term ladder"); `TODO.md`:198.

**Fourteen, in code and nowhere in prose:** `research/exact-g2-ladder.js`:45 —
`{ x: 43, g: 618, pos: 830330079152051n, nmax: 8 }` — committed in `f7dc206`
with a verified lower certificate. **The string 618 as a G₂ term appears in no
body markdown file.** Meanwhile `TODO.md`:197-205 lists "**Extend the EXACT G₂
ladder to 43# and 47#**" as future work with a "price by probe before launching"
instruction.

**Twelve, still asserted:**

| file:line | exact text |
|---|---|
| `research/U-FRAME.md`:529-532 | "exact-term searches on 2,6,12,30,42,66,108,150,204,258,348,528 at three offsets all return nothing, so the drafted submission stands and **G2(41#) still has to be computed by us**." |
| `research/U-FRAME.md`:622-626 | "3. **G₂(41#)**, the thirteenth term. The lattice counter prices it at about 37 hours … the streaming leg … at about 6 hours" |
| `research/G2-STATE.md`:101 | "**All twelve exact terms.**" — heading a twelve-row table (:108-121) stopping at x = 37 |
| `research/G2-STATE.md`:130, :793, :874 | "VERIFIED at all twelve shared terms"; "\| G2 as a studied object, and the twelve exact terms \| VERIFIED \|"; "**6. Compute G2(41#), the thirteenth term.** … **Cost: about 6 hours by the streaming leg**" |
| `research/PRIOR-ART.md`:76-78 | "Our own G2 ladder (2,6,12,30,42,66,108,150,204,258,348,528) is NOT in OEIS, checked at three offsets … **verified at all twelve shared terms**." |
| `research/GLOSSARY.md`:207-209 | "2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528 (T₂..T₃₇; OEIS draft pending)" |
| `research/THE-LENS.md`:86 | "our G₂ (2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528)" |
| `research/README.md`:144 | "G₂(x#)/p′² runs 0.222 to 0.314 over the twelve exact terms (x = 2…37)" |
| `research/oeis-G2-submission.md`:143-144, :158 | "a(13) (41#, 3.0e14 positions) is the natural next term. It needs about 40x this runtime or a compiled implementation"; "All twelve DATA terms are reproduced" |
| `research/exponent-control.md`:23 | "our own G2 (12 terms, out" |
| `paper/moire-primes.md`:501 | "\| G₂ \| 12 \| 30 \| 42 \| 66 \| 108 \| 150 \| 204 \| 258 \| 348 \| 528 \|" under "Computed exactly through T₃₇" |

**Which is correct, and why.** Thirteen are established with two disjoint methods:
direct full-period enumeration (`paper/beta2-note.md`:64-66 gives the certificate
at r = 3,784,200,788,231; `research/exact-g2-ladder.js` reproduces it) and the
repaired covering search, which reaches exactly `G2(41#) − 1 = 545`
(`two-class-lower-bounds.md`:400-404). A fourteenth exists as a certificate in
code and needs a prose home or an explicit "certificate only, maximality not
searched" label.

**The sharpest instances.** `U-FRAME.md`:532 is not a stale count but a false
absence claim — "still has to be computed by us" — of exactly the class
`research/qc/README.md` records as the one thing no mechanical check can verify.
`research/covering-dive.md`:177 already carries the corrected OEIS re-run **on the
thirteen-term ladder**, dated 2026-08-18, so the resolution for U-FRAME's and
PRIOR-ART's OEIS checks is also already on disk. `oeis-G2-submission.md`:143 says
a(13) needs 40× the runtime; `TODO.md`:202 records that 41# actually took **2 min
31 s** against a 5.6 h estimate that was itself a correction of 37 h.

**Why this survived the numeric gate.** `research/audit-numbers.js`:369, :486,
:488 and `research/exponent-control.js`:47 all hard-code
`[2,6,12,30,42,66,108,150,204,258,348,528]`, so `node research/audit-numbers.js`
cannot flag a missing thirteenth or fourteenth term.

**Ruled out.** (a) One object; every list is the same sequence under the same
definition. (b) No normalisation issue. (c) None of the twelve-term sites says "as
of twelve terms" or points at the newer count. `paper/PAPERS.md`:71 ("drafted, 12
terms through a(12) = G₂(37#) = 528") and `TODO.md`:462 ("G₂ ladder (12 terms,
drafted)") are correctly scoped — they describe the *draft artifact*, not the
state of knowledge — and are **not** reported. (d) Integer counts, not bands.

**Partly recorded already.** `research/history/staging/audit-self-contradiction.md`
finding 2 covers the sites *inside* `G2-STATE.md`. **New here: the eight other
documents**, the undocumented fourteenth term, and the harness hard-coding that
makes the gate blind to it.

---

## A5. s/u at the measured working point: 1.2 in seven documents, 1.62–1.72 in TODO

**OBJECT.** s/u, the ratio of the sieve-level exponent to the window exponent at
the ladder's working point (D = z^s, H = z^u), equivalently θ_total = 2s/u. It
decides whether Lemma V's stated range s ≤ u covers the route, and therefore which
unproven input the exponent road is priced against.

**The resolution.** `TODO.md`:82-85 — "and the Lemma V sub-question, as moot and
moving further away — at the corrected working point **s/u = 1.62–1.72, not the
1.2 this item used to record**, so further outside Lemma V's stated range s ≤ u."

**Still asserting 1.2:**

| file:line | exact text |
|---|---|
| `paper/wall-note.md`:355-357 | "At the working point our own ladder measures, the component level exceeds the window, **s/u ≈ 1.2**, which is outside the range s ≤ u that Lemma V is stated in." |
| `research/GLOSSARY.md`:338 | "There **s/u ≈ 1.2**, outside the range s ≤ u that Lemma V is stated in" |
| `research/GLOSSARY.md`:346 | "a Gaussian maximal inequality at the measured working point **s/u ≈ 1.2 to 1.25**" |
| `research/ZONE-POSTULATE.md`:295-296 | "at the measured working point **s/u ≈ 1.2** sits outside Lemma V's stated range s ≤ u" |
| `research/sift-limit-attack.md`:47 | "the working point there has **s/u ≈ 1.2**, **outside the range s ≤ u that Lemma V is stated in** (§4.5)" |
| `research/sift-limit-attack.md`:267 | "That means **s/u ≈ 1.2 to 1.25 > 1**, outside Lemma V's stated s ≥ (0.63+δ)u up to s = u − ε." |
| `research/theta-ladder.md`:609 | "Here **s/u = 3.0/2.4 = 1.25 > 1**." |

**Which is correct, and why.** `TODO.md`'s. Every 1.2 traces to one derivation:
`sift-limit-attack.md`:265-267 takes `u = θ_cond ≈ 2.16 to 2.48` and divides
s = 3.0 by it, substituting the *conditional* window exponent for the window the
ladder actually runs at. With the self-consistent window from A1
(`need_true/z²` ≈ 0.46 to 0.55, so u ≈ 1.76 to 1.85), s/u = 3.0/1.85 to 3.0/1.76 =
1.62 to 1.70, reproducing TODO's band from TODO's own corrected numbers.

**Consequence, stated honestly.** The qualitative conclusion does not reverse —
1.2 and 1.7 are both > 1, so the working point is outside Lemma V's range either
way and the Gaussian maximal law remains the operative unproven input. What is
wrong is a quoted number, by about 40%, in four hub documents, the glossary entry
that owns the term, and one paper-grade note. It is the input that prices the
route.

**Ruled out.** (a) One object with one definition, stated identically in all
seven places; θ_total = 2s/u is defined identically at `sift-limit-attack.md`:264
and `theta-ladder.md`:583-584. (b) No normalisation split. (c) None marked.
(d) The bands do not overlap.

---

## A6. The localized band "flat at 3.2 to 3.7", against both engines that measured it

**OBJECT.** The localized max twin-slot gap at k = 2, `M(x, x′²)/ln³x` — the
quantity the Zone Postulate's localized margin `x²/(3.5 ln³x)` is derived from.

**Four documents state the band:**

- `research/maxgap-law.md`:509 — "`M(x,x^2)/ln^3 x` is **flat at 3.2 to 3.7** over
  a 47-fold range in `x`"
- `research/LOCALIZED-GAP.md`:122 — "gets M/ln³x **flat at 3.2 to 3.7** over a
  47-fold range in x"
- `research/ZONE-POSTULATE.md`:176 — "**different object** from §5's localized
  `M(x, x′²)/ln³x`, **flat at 3.2 to 3.7**"
- `research/ZONE-POSTULATE.md`:208 — "obeys M(x, x′²)/ln³x **flat at 3.2 to 3.7**
  over a 47-fold range"

**Both engines that measured it disagree with the band.**

Recomputing from `maxgap-law.md`'s own pasted table five lines above the claim
(:499-507, x = 211…9973 with M = 498, 630, 924, 1452, 1722, 2832, 2868):

```
3.249  2.925  3.099  3.615  3.274  4.202  3.674     → span 2.93 to 4.20
```

Two of seven rows sit outside the quoted band, one at each end (x = 401 low by
9%, x = 6421 high by 14%). The corpus's second, independent measurement of the
same object is wider still: `research/FOLD-PROFILE.md`:605-607 — "M(x, x′²)/ln³x
reads **2.14, 3.85, 4.39, 3.44, 3.33** at x = 101, 499, 1009, 2003, 4001, flat
with no trend" → span **2.14 to 4.39**.

**Which is correct, and why.** The data. Two engines give 2.93–4.20 and
2.14–4.39; the headline band quoted in four documents is narrower than either.

**The consequence is the part that matters.** The derived constant 3.5 is the
*midpoint*, not a bound. Since margin = x²/(c·ln³x), the honest worst case on this
data is **x²/(4.2 ln³x)**, 20% tighter than what five sites assert:
`maxgap-law.md`:517, `LOCALIZED-GAP.md`:124, `ZONE-POSTULATE.md`:209,
`ZONE-POSTULATE.md`:439 (where it is evidence item 4 in "What would count as
progress"), and `FOLD-PROFILE.md`:596.

**Resolution status — this one is already escalated and stalled.**
`research/history/staging/qc-scope-T.md`:826-847 records it as TA-3, graded HIGH,
with the same recomputation, the same 4.2 conclusion, and the note "**HOME:** the
table in `research/maxgap-law.js`. **NEEDS CHRIS'S JUDGEMENT** on whether 3.5
moves." There is no `applied-T.md` in `research/history/staging/`, and the string
is unchanged in all four live files. **The correction was computed, escalated,
and never landed.** It is repeated here because it is the load-bearing case and
because it is still open, not because it is new.

**Ruled out.** (a) All four sites name `M(x, x′²)/ln³x` and three cite
`maxgap-law.md` §8; FOLD-PROFILE's row is the same object at the same k with the
same window. (b) Same k = 2, same ln³, no per-slot/per-integer switch. (c) No live
document carries a corrected span. (d) The text says "flat at", a measured range,
not an error band — and 2.93 and 4.20 miss it by 8% and 14%.

---

# RANK B

## B1. The skeleton door's share of the mass: "about a tenth" against "essentially none"

**OBJECT.** The fraction of the 30-skeleton's mass governed by the Skeleton
Equidistribution Conjecture's door (the fixed-modulus, M_T ≤ lB branches).

- `research/natal-cap-36-skeleton-door.md`:202-204 — "**[MEASURED, decisive]** The
  branches for which the door is a fixed-modulus question carry **essentially none
  of the skeleton**. Their aggregate is small and of either sign"
- `research/anchored-calm.md`:52-56 — "the branches the door governs carry a small
  aggregate share of the skeleton's mass **of either sign** — +9.2%, −0.9%,
  −10.8% and +5.5% at @13, @17, @19 and @23 — so proving it as named would move
  the bound by a few percent and close nothing", with a dated *(BAND CORRECTED
  2026-08-18)* note retiring "between 9% and 11%"

against, still asserting the retired reading:

- `research/anchored-calm.md`:32 — "| **Skeleton Equidistribution Conjecture** |
  OPEN, door named, measured open, and **the door reaches about a tenth of the
  mass** | all x |" — the status row of the file whose body carries the correction
- `research/anchored-calm.md`:38 — "its all-x form is open behind a door that
  reaches a tenth of the mass"
- `research/GLOSSARY.md`:301-302 — "and the door as named reaches about a tenth of
  the mass"
- `README.md`:108-109 — "its all-x form is open behind a door that reaches about a
  tenth of the mass"

**Correct: the home's form.** "About a tenth" is the magnitude-only reading of a
signed series whose mean is ≈ +0.75% and which includes −0.9%; it is exactly the
"between 9% and 11%" band that `anchored-calm.md`'s own 2026-08-18 note retires,
restated in the singular. Ruled out: (a) same object, both files identify Prop E's
`M_T ≤ lB` column as the door's branches; (b) both are shares of the same total;
(c) inverted — the home says the opposite and the *older* phrasing is the one
propagated, unmarked, into three places including the repo's front page; (d) −0.9%
against "a tenth" is an order of magnitude and a sign flip.

**The file created to prevent exactly this carries the defect.** Its own
correction note says "This file exists because the same status table was written
four times and no summary could copy it correctly."

## B2. The best constructed G₂ lower bound, and the ladder's reach

- `research/G2-STATE.md`:158 — "| lower bound, best constructed | **356,712 at
  x = 4001** | **CERTIFIED** … at all **sixteen** levels | `two-class-lower-bounds.md` §5 |"
- `research/G2-STATE.md`:800 — "| the certified G2 lower-bound ladder to
  x = 4001, **sixteen levels** … extends the two-class data **55-fold** |"
- `research/two-class-lower-bounds.md`:774 — "| lower, best constructed here |
  **`G2(5003#) >= 479,340`** | CERTIFIED, machine-verified |"
- `research/two-class-lower-bounds.md`:894-896 — "a certified `G2` lower-bound
  ladder to `x = 5003`, **seventeen levels** … extending the two-class data
  **68-fold**"

**Correct: 479,340 at x = 5003, seventeen levels.** `G2-STATE.md`'s own §5a
already carries the rung — :626 prints "| 5003 | **479,339** | … | — (new rung) |"
and :633 says "At x = 5003 the best construction reaches 1.9% of the zone" — so §3a
and §8 contradict §5a of the same file as well as the source. The ±1 between
479,339 and 479,340 is the documented covering-length/gap-length conversion and is
innocent; the disagreement is the level and the count. Ruled out: (a) both rows
are titled "lower bound, best constructed" and both cite §5; (b) the ±1 is the
only normalisation difference and it is not the disagreement; (c) unmarked;
(d) 4001 and 5003 are not a rounding of each other. Consequent "sixteen levels"
claims also at `G2-STATE.md`:15, :24, :692 and `two-class-lower-bounds.md`:778
("9 exact + 16 certified points").

## B3. The @13 beyond-Chebyshev bound: waiting on compute, or established

- `research/natal-cap-21-beyond-chebyshev.md`:141-152 — "**DONE, by
  `natal-cap-27-t4-at13.js`.** … giving **P(S=0) ≤ 1.898e−6 at @13** … **So the
  corpus holds two beyond-Chebyshev ensemble bounds, at @11 and @13.** Only the
  @17 rerun is outstanding."
- same file, :82 and :97-101, unmarked — section heading "**The @13/@17 blocker,
  precisely**", then "Honest @13/@17 status: **Chebyshev (9.74e−4 / 1.01e−4)
  remains the best proven bound** … a ~340× / ~3300× beat **waiting on compute
  (@13)** and on an identity (@17)."
- `research/NATAL-CAP-CAMPAIGN.md`:125 — "| natal-cap-21-beyond-chebyshev.md | the
  Beyond-Chebyshev Ensemble Bound at @11, and **the @13/@17 blocker** |"

`README.md`:99-101 and `TODO.md`:287-303 agree that two bounds exist. **Correct:
two bounds, @11 and @13; only @17 is blocked.** Ruled out: (a) one object;
(b) same level, same statistic; (c) the *newer* text is in the same file, above
the stale text, and the stale text is unmarked; (d) 9.74e−4 against 1.898e−6 is a
factor 513. Note `research/qc/README.md`:72 records this exact claim class as a
previously-caught absence bug — "three documents said the @13 beyond-Chebyshev
bound had never been run while `natal-cap-27-t4-at13.js` sat in the same
directory". This is a fourth site, inside the note that entry is about.

## B4. Full decoupling: "halves the open band" against "removes about 71%"

- `research/G2-STATE.md`:528-529 — "Full decoupling would give 1 + √e ≈ 2.649,
  which **halves the open band** without finishing."
- `research/G2-STATE.md`:838-840, `research/ZONE-POSTULATE.md`:298-299,
  `paper/wall-note.md`:363 — all "**removes about 71% of the open band**".

**Correct: 71%.** The band is 4.2665 − 2 = 2.2665 wide, the decrement is
4.2665 − 2.649 = 1.6175, and 1.6175/2.2665 = 71.4% — the same arithmetic as
`theta-ladder.md`:590 ("wins by 1.62") and `sift-limit-attack.md`:249. "Halves"
understates the payoff by a factor 1.4, in the direction that makes the route look
less worth doing. Ruled out: (a) both name the same threshold and the same band;
(b) no reading of the band halves at 2.649 — that needs the band to be (2, 3.3);
(c) both are current text of one file; (d) 50% and 71% are not roundings.

## B5. Seam slot-hood enrichment: "about 25×" against "20× to 28×, level by level"

- `paper/moire-primes.md`:568-571 — "so a seam position is **about 25×** more
  likely than average to be a slot and no more likely than average to carry a twin
  prime."
- `research/GLOSSARY.md`:46 — "roughly **20× to 28×** more likely than average to
  be a slot, level by level (20.2, 22.9, 25.6, 28.1 at T₁₃, T₁₇, T₁₉, T₂₃ …
  **the round '25×' that stood here is the T₁₉ value**)"
- `research/ATTACKS2.md`:18 — "the flat '25×' this cell used to give was one
  level's value"

**Correct: 20×–28× by level.** Two documents name the exact string "25×" as the
retired error. The paper's version is additionally incoherent with its own
paragraph: three lines earlier it writes "10× at P = 30 up to 20× at P = 30030",
and the paragraph's point is that the HL factor *is* the slot factor, so at
P = 30030 = T₁₃ the slot factor must read 20.2. Ruled out: (a) the paper is
explicitly in the slot-level branch, the same branch as GLOSSARY:46 — this is not
the slot-vs-prime conflation the corpus guards; (b) the missing level *is* the
defect; (c) `moire-primes.md` is "DRAFT v2, 2026-08-17", live and unmarked;
(d) the objection is the missing level, not rounding.

## B6. The seam Hardy–Littlewood constant's verification tolerance

- `paper/moire-primes.md`:565 — "a prediction we verified to **0.2–0.6%** across
  four primorials"
- `research/ATTACKS2.md`:18 — "confirmed to **0.1–0.6%** (meas/pred 0.9983,
  0.9989, 0.9944, 0.9940 = 0.17%, 0.11%, 0.56%, 0.60%; **the '0.2–0.6%' this cell
  used to give excluded two of the four and understated the agreement**)"
- `research/ATTACKS2.md`:44 — "*(this verdict read 0.2–0.6% until 2026-08-18…)*";
  `research/GLOSSARY.md`:44 — "VERIFIED to **0.1–0.6%**"

**Correct: 0.1–0.6%.** The four measured residuals are printed; 0.11% and 0.17%
both fall below 0.2%. Ruled out: (a) same object, same four primorials, same
script; (b) same meas/pred normalisation; (c) the paper is unmarked and ATTACKS2
dates the fix; (d) not overlapping bands — two of four points sit outside the
stated interval. The error is in the safe direction: the paper understates our own
agreement.

## B7. The seam-hierarchy copy-law: "exact to four decimals at every depth"

- `paper/moire-primes.md`:583-585 — "the seam-hierarchy copy-law is **exact to
  four decimals at every depth**"
- `research/ATTACKS2.md`:21 — "copy-law prediction E(m)=d_m^loc/δ_m matches
  measurement to 4 decimals at **m = 3..6** and to **0.65% at m = 7** (meas/pred
  0.9935, the deepest measured seam, which has only 18 seams = 3798 window
  positions — **the script's own caveat, dropped when this cell was written**)"

**Correct: four decimals at m = 3..6; 0.65% at m = 7.** 0.65% is roughly 65× worse
than four decimals, so "every depth" is a strict overstatement, and ATTACKS2
records that the caveat has already been dropped once. Ruled out: (a) same law,
same script; (b) depth m is the level parameter the paper generalises over;
(c) unmarked; (d) 0.9935 is not four decimals under any convention.

## B8. β₂'s decimal expansion and page attribution, in the OEIS draft

- `research/oeis-G2-submission.md`:76-77 — "sifting limit **beta_2 = 4.2665...
  (Cambridge Tracts 177, p. 79)**"; :122 — "…CUP 2008, p. 79. **[beta_2 =
  4.2665...]**"
- `research/dhr-verification.md`:23 — "**VERIFIED, decimals corrected.** True value
  β₂ = 4.26645028414864191641 … '4.2665' is the correct 4-d.p. *rounding* but
  **'4.2665…' as a decimal expansion is wrong** (expansion is 4.266450…)"; :283 —
  "**β₂ ≈ 4.266 in print at p. 79**"

**Correct: `dhr-verification.md`.** Two defects on one line — an ellipsis
asserting an expansion that does not continue that way, and a cited page that
prints a different number. `paper/beta2-note.md`:30 quotes the same page as
printing "β₂ ≈ 4.266". `dhr-verification.md`:24 flags this exact pattern by name
for Franze's table ("the string '4.5161' appears nowhere in Franze's paper
(grep-verified)"). Ruled out: (a) one object; (b) not a normalisation; (c) the
draft was last edited *after* `dhr-verification.md` and did not absorb it; (d) the
*rounding* 4.2665 is used correctly everywhere else — what is wrong is the
ellipsis plus the attribution. **This is the one document intended for a permanent
external venue.**

## B9. The grain census law: "awaits a law" against "HAS a law as of 2026-08-14"

- `paper/moire-primes.md`:332-333 — "its size distribution (T₁₁: 6×21, 12×56,
  18×22, 24×6, 30×22, 36×4, 42×4) **awaits a law**"
- `web/PROPOSAL.md`:155-158 — "**1. The grain census law.** **The glossary says**
  the size distribution **'awaits a law'** … This is the strongest candidate on the
  list"; and :423 lists it in Act 10's **open** column
- against `research/GLOSSARY.md`:196-201 ("**HAS a law as of 2026-08-14**", with
  count(6) = ∏(q−4), the "no 6,6" word rule and the forced ratio 8·count(6) =
  3·count(12)), `paper/moire-primes.md`:610 ("the grain census law is derived and
  digit-exact"), `web/PROPOSAL.md`:27-29 ("The grain census **was settled** by
  `research/grain-census.js`"), `TODO.md`:492, and `web/bench/README.md`:105-107,
  which records that the browser kernel checks the two laws live.

**Correct: the law exists.** Both stale sentences are quotations of a GLOSSARY line
that no longer exists, and PROPOSAL's is a live misattribution — it puts words in
GLOSSARY's mouth, then ranks the closed question #1 on its open list, contradicting
its own §0. Ruled out: (a) one object, identical digits in all four places;
(b) same T₁₁ census; (c) the newer statements all say settled and the stale ones
are unmarked inside live documents; (d) not numeric.

## B10. The d ↦ G_d map: an open object, or one whose easy structure is refuted

- `web/PROPOSAL.md`:170-174 — "**3. The d ↦ G_d map.** Already flagged as a new
  object with no prior art, and **already showing** that equal-density differences
  split (G₈ = 198 against G₂ = 150 at 19#) … The question 'what arithmetic
  property of d predicts the split' is **a chart away**."; :423 lists it in the
  **open** column
- `research/ATTACKS.md`:16 — "The map d ↦ G_d is therefore studied here and its
  easy structure **refuted, not an open object**."
- `web/PROPOSAL.md`:29-32, same file — "the 19# pattern that made the map look
  structured **dissolves at 23#**. What survives as visual is the *extremal*
  question, not the map."
- `paper/moire-primes.md`:544-546 — "An apparent 2-adic law at 19# … **dissolves at
  23#**"

**Correct: studied, easy structure refuted.** The novelty half ("new object with no
prior art") is fine and matches `paper/moire-primes.md`:703; the strength half is
wrong. Ruled out: (a) 19# and 23# are different levels, but the disagreement is
the *label*, not the data — PROPOSAL's own §0 states the refutation; (b) no
normalisation; (c) unmarked; (d) not numeric.

## B11. The census ladder D₁₇: 25,515 against 22,275

- `web/PROPOSAL.md`:257-258 — "The counter runs 1, 3, 15, 135, 1485, **25515** and
  keeps going to the 31-tile's 6,226,553,025."

**Correct: 22,275.** D₁₇ = D₁₃·(17−2) = 1485·15 = 22,275, corroborated at
`research/discrepancy-two-class.md`:65, `research/maxgap-law.md`:75,
`research/grain-census.js`:353, `research/verify-ladder.js`:59,
`research/a3-05-bound-L.js`:674, and by `paper/moire-primes.md`:245's cohort
decomposition (14850+5940+1320+150+14+1 = 22275). **25515 appears nowhere else in
the repo, .md or .js.** Ruled out: (a) the sentence's other five terms are the
census ladder exactly and its terminus is T₃₁'s census; (b) no normalisation makes
25515 a census — it is not in A059861 and breaks the (p−2) recursion;
(c) unmarked; (d) a five-digit integer, not a rounding. This is in the
public-facing build spec.

## B12. The anchored VR rank at @17: 2 of 510,510 against 10 of 510,510

- `research/natal-cap-31-calm-vs-kill.md`:15-16 — "measurably (**VR rank 2/510510
  @17**, 14/9.7M @19) in the ensemble's low-variance family"; and :184
- `paper/anchored-note.md`:172-175 — "On VR, the anchored phase sits … 0.002 at
  @17 (**rank 10 of 510,510**, i.e. five mirror pairs calmer). **On the
  equal-weight Z2** at @17 the rank is **2 of 510,510**"
- `research/GLOSSARY.md`:262-263 and `research/anchored-calm.md`:12-13 both scope
  it as "rank 2 of 510,510 at @17 **on equal-weight Z2**"

**Correct: VR rank 10, Z2 rank 2.** The source script's pasted output,
`research/natal-cap-13-anchored-calm.js`:453-454, prints `VR … 10/510510` and
`Z2 … 2/510510`. `natal-cap-31` cites the wrong row, and the same mislabel is in
its script header at :7. The sentence then pairs it with "14/9.7M @19", which *is*
a VR rank, so one label spans two statistics. Ruled out: (a) same script, same
level; (b) the VR-vs-Z2 normalisation is precisely what is being got wrong, so it
is not an innocent explanation here — the dispute is `natal-cap-31` asserting
VR = 2 where the instrument prints VR = 10; (c) cap-13's numbers are unchanged;
(d) 10 and 2 are not a rounding. `anchored-note.md` and `GLOSSARY.md` already
carry the disambiguation; the leaf note the whole X-channel section rests on does
not.

## B13. How many levels β is measured at: nine against ten

- `web/PROPOSAL.md`:402-408 — "the **nine** measured points drop onto it one at a
  time … +0.0046, then +0.0026, then +0.0016, then +0.0010 … It has been
  **measured nine times** and it is drifting towards a specific value"
- against ten at `research/GLOSSARY.md`:234-235, `README.md`:128-129,
  `paper/anchored-note.md`:135 and the §3 table (ten rows, @7 to @41),
  `paper/wall-note.md`:176-181, `TODO.md`:167, `research/THE-LENS.md`:104,
  `paper/moire-primes.md`:487, `research/natal-cap-31-calm-vs-kill.md`:240

**Correct: ten levels, @7 to @41, and five consecutive residual collapses**
(+0.0046, +0.0026, +0.0016, +0.0010, +0.0006 —
`paper/anchored-note.md`:523-524). PROPOSAL freezes the state before the @41
march. Ruled out: (a) not the Var/E ladder — the sentence is explicitly β and the
prediction game, and the nine-level object (certified ensemble variance, @7..@37)
is correctly nine elsewhere; (b) no normalisation; (c) `PROPOSAL.md`:7 carries
"Status: proposal, nothing built. Written 2026-08-15" — a date stamp, not a
retirement marker, and these numbers are the spec for a page to be built;
(d) integer counts.

## B14. The control-corrected certificate-ladder exponent: 1.11–1.25 against 1.15–1.19

- `research/exponent-control.md`:180-183 — "`research/two-class-lower-bounds.md` §5
  runs the same control-corrected estimator on a certified greedy covering ladder
  to x = 4001 … and reads **1.11 to 1.25, falling with range**"
- `research/G2-STATE.md`:165 and :692 — same band
- `research/two-class-lower-bounds.md`:555-556 — "The control reports 1.14 to 1.20
  when the truth is 1 … Subtracting it, **the corrected two-class exponent reads
  1.15 to 1.19 and is falling with range.**"

**Correct: the repaired ladder's 1.15–1.19.** `exponent-control.md` cites the file
that disagrees with it, in the sentence that disagrees. Nothing downstream of
"about 1.2" changes, which is why this is rank B. Ruled out: (a) both are the
greedy ladder; (b) same estimator, same frame; (c) unmarked; (d) partially applies
— the newer band is strictly inside the older — which is the reason for the low
rank, not a reason to drop it.

## B15. The k ≥ 3 localized band, refuted by a run one of its own citers cites

**OBJECT.** `M(x, x³)/(k·ln³x)`, the localized max gap at k = 3.

- `research/LOCALIZED-GAP.md`:102 — "| M(x, x³) / (k·ln³x) | **flat in 1.2 to
  1.6** across the ladder |"
- `research/FOLD-PROFILE.md`:659-661 — "it is only ~c·k·ln³x with **c measured
  flat in 1.2 to 1.75**", used to argue M(x, x^k) for k ≥ 3 is "a concrete
  target"

against the run that tested it as a pre-registered prediction:

- `research/localized-single-alignment.md`:70 — "| P1 | M/ln³x flat in **[3.6,
  4.8]** to x = 1289 | **REFUTED as stated** — climbs to **6.41** (x = 739), falls
  back to 5.51 (x = 1613) |"
- `research/localized-single-alignment.md`:102-103 — "M/ln³x does not stay in the
  registered band. It is 4.63 at x = 307, 6.41 at 739, 6.34 at 1151, 5.51 at 1613."

**Which is correct, and why.** The registered band [3.6, 4.8] is exactly
3 × [1.2, 1.6] — it *is* `LOCALIZED-GAP.md`:102 converted to M/ln³x at k = 3,
frozen before the first run. The deeper run reaches 6.41 at x = 739, i.e.
M/(k·ln³x) = **2.14**, outside both 1.2–1.6 and 1.2–1.75. Custody is clean:
M(307) = 870 and M(491) = 990 reproduce `localized-01-ladder.js` digit for digit
(`localized-single-alignment.md`:174-175).

**The aggravating detail.** `FOLD-PROFILE.md`:663-664 cites
`research/localized-single-alignment.md` *five lines after* quoting the band, and
reports only the other half of that run's verdict ("the single-alignment
multiplier is confirmed different in shape … the growth-law route … is closed by
the window's own boundary term"). The paragraph cites the run that killed its own
constant.

**What the refuting file actually concludes, and why this needs Chris.**
`localized-single-alignment.md`:106-111 does not offer a replacement band. It says
"the crude ln³ constant is the **wrong frame**; the surface law is intact", and
that in the frame the repo actually states the law in — M = c·m̄·ln(Y/m̄) — the
readings are 0.81, 0.86, 1.12, 1.09, 0.98, inside `maxgap-law.md`'s off-diagonal
surface range 0.74 to 1.17. So the fix may be to stop quoting a bare ln³ constant
rather than to widen it. That is a research call, queued below.

**Ruled out.** (a) Same object; the file states it as "Definitions exactly as
`localized-01-ladder.js`". (b) The refuted prediction is literally 3× the asserted
band, so the normalisation is accounted for, not the explanation. (c) Partially
applies to `LOCALIZED-GAP.md`:102, whose §5 header scopes the ladder to x = 307,
where the value is 1.543 and inside the band — but the scope is not carried at
`FOLD-PROFILE.md`:660, which states the band unscoped and reasons from it, and
neither site is marked as retired. (d) 2.14 against a ceiling of 1.6 or 1.75 is a
22–34% overshoot.

**Secondary:** the two live sites give two different upper ends for the same
normalised constant — 1.6 against 1.75 — with no scope attached to either.

**What I first ruled.** I had this in near-misses as "different x-ranges on a
quantity both documents call a surface". What overturned it: the band is not just
loose, it was *registered as a prediction and formally refuted*, and the refuting
document is cited in the same paragraph that asserts it.

## B16. Whether the k = 2 and k = 3 readings are one number

**OBJECT.** Whether M/(k·ln³x) is k-invariant, i.e. whether
`LOCALIZED-GAP.md` §5's k = 3 row and `maxgap-law.md` §8's k = 2 measurement are
the same number.

- `research/LOCALIZED-GAP.md`:120-123 — "**The M/ln³x reading is confirmed
  independently and it is the one that governs the zone.** `research/maxgap-law.md`
  §8 … gets M/ln³x flat at 3.2 to 3.7 over a 47-fold range in x, **which is this
  row read at k = 2**."
- `research/maxgap-law.md`:514-516 — "`LOCALIZED-GAP.md` §5 records `M/(k ln^3 x)`
  flat in 1.2 to 1.6, **which at `k = 2` is `M ~ 2.4` to `3.2 ln^3 x`**"
- `research/history/CHANGELOG.md`:2206-2210 — "**The constant is k-dependent**:
  3.2 to 3.7 at k = 2, while `LOCALIZED-GAP.md` §5 measures M/(k ln³x) at 1.2 to
  1.6 on a k = 3 ladder, which is 3.6 to 4.8 at k = 3. The law is c·m̄·(k ln x −
  ln m̄) and dividing by k ln³x is **not constant across k**. The two agree in
  shape and not in the number."

**Which is correct, and why.** `maxgap-law.md` and the CHANGELOG. "This row read
at k = 2" gives 2 × [1.2, 1.6] = **2.4 to 3.2**, not 3.2 to 3.7 (truly 2.93 to
4.20 — see A6). The bands abut at one endpoint; they do not coincide. The law
M = c·m̄·(k·ln x − ln m̄) leaves a k-dependent residual (1 − ln m̄/(k·ln x)) after
dividing by k·ln³x, and it runs the wrong way for the claimed identity. What the
maxgap-law measurement actually settles is polylog-versus-linear (the refutation
of `x/(1.2 ln x)`), not the constant.

**One file already carries the resolution?** Two — `maxgap-law.md` does the
conversion correctly in the sentence `LOCALIZED-GAP.md` is quoting, and the
CHANGELOG has a dated ruling on exactly this. `LOCALIZED-GAP.md`:123 still asserts
the identity and upgrades the result to "confirmed independently" on the strength
of it.

**Ruled out.** (a) One object. (b) The normalisation difference *is* the finding,
and it is not innocent, because the sentence asserts the two normalisations
coincide. (c) Both sentences are live. (d) 2.4–3.2 and 3.2–3.7 share a single
endpoint and no interior.

**What I first ruled.** Near-miss, "(b) + (c), both documents reconcile in place".
What overturned it: they reconcile to two different numbers, and the CHANGELOG had
already ruled on which reconciliation is right.

## B17. The corridor's closing rate switches denominator at its last point

**OBJECT.** The corridor for the Pane Bound — the twin count as a fraction of pane
slots.

`research/GLOSSARY.md`:386-391 — "Its width is exactly the twin count,
**5·C₂/ln²n = 3.301/ln²n** of the slots (VERIFIED at 3.348, 3.285, 3.386, 3.326,
**3.325** for n = 3e4 to 3e6). MEASURED at 25% at n = 100, 8.2% at n = 1000, 3.2%
at n = 30,000, **0.52% at n = 3e6**. **The corridor closes.**"

**The entry contradicts itself by a factor 2.9.** Its own closed form gives
3.301/ln²(3e6) = **1.48%**, and its own VERIFIED value 3.325 at n = 3e6 gives
**1.49%**. The quoted last point is 0.52% — from the number in the parenthesis
five words earlier.

**Where 0.52% comes from.** `research/a3-07-pane-overlap.js` prints two series:
`CORRIDOR (twins/slots)` runs 25.00%, 16.25%, 8.21%, 3.38%, 4.05%, 3.15%, 2.48%,
2.13%, 1.74%, **1.49%**; `REQUIRED RELATIVE PRECISION on the overlap =
twins/(capacity − slots)` runs 77.8%, 17.3%, 6.16%, 2.10%, 2.15%, 1.48%, 1.06%,
0.84%, 0.64%, **0.52%**. GLOSSARY's first three points are the first series; the
fourth is the second series, a different denominator. The script's own reading 1
says so, under the heading "THE CORRIDOR, RESTATED IN THE ONLY CURRENCY A PANE
BOUND CAN BE PAID IN" — a restatement, not the same number.

**Which is correct.** On GLOSSARY's stated definition ("width is exactly the twin
count … of the slots"), the value at n = 3e6 is **1.49%**. The 0.52% belongs to a
different and also useful quantity. As written, the four-point series makes "the
corridor closes" look about three times faster than the entry's own definition and
closed form support, and the chosen points (100, 1000, 3e4, 3e6) also step over
the non-monotone stretch (3.38% at n = 3000 rising to 4.05% at n = 10⁴).

**Ruled out.** (a) Both quantities are about the pane, but they are not the same
object, and the sentence presents them as one series under one definition. (b) The
denominator change is undeclared, which is the finding. (c) Nothing supersedes it;
the script pre-dates and disagrees. (d) Factor 2.9.

---

# RANK C

**C1. The greedy oracle test: pending in TODO, established in the research layer.**
`TODO.md`:179-195 — "**Validate the corrected greedy against the exact ladder.
This is the decisive instrument test and everything else in this block is gated on
it.** … the greedy reaches the EXACT covering optimum at x = 13, 17, 19, 23, 29,
37 and **0.997 at 31** … **PRE-REGISTER before running**: oracle established if
greedy = optimum at ≥ 12 of 13". Against `research/two-class-lower-bounds.md`:404-407
— "> **VERDICT: ORACLE ESTABLISHED, 13 of 13 exact, minimum ratio 1.0000**", with
ratio 1.000 at x = 31 in the table at :398-402. The test ran in commit `25e961c`,
newer than TODO's last edit. `TODO.md`:219 says item 1d is "gated on 1b and 1c", so
a reader is told to wait for a gate that has opened and to pre-register a test that
has been run. Ruled out: (a) same instrument, same thirteen terms, same
pre-registered rule; (b) none; (c) TODO's own charter at :3-7 says an attempted
item "LEAVES this file entirely", so this is a defect against the file's own rule;
(d) 0.997 → 1.000 is also a value disagreement.

**C2. The "8 to 15 σ_X" collapse, unscoped in both papers.**
`research/GLOSSARY.md`:276-277 and `TODO.md`:339-340 scope it — "an overlap
collapse of 8 to 15 σ_X **at @13 and @17**" — and the source
`research/natal-cap-31-calm-vs-kill.md`:59 prints σ at @13 and @17 only (@19 is
absolute, 46,252). `paper/anchored-note.md`:438-439 ("annihilation requires an
overlap collapse of 8 to 15 σ_X. The theorem is proven at @11, @13, @17 and @19")
and `paper/wall-note.md`:232-233 read as if the σ figure covers all four proven
levels. Ruled out: (a) same object; (b) the σ-vs-absolute normalisation is exactly
what is dropped, so it is not innocent — the σ form does not exist at @19;
(c) GLOSSARY and TODO are the corrected sites; (d) not rounding.

**C3. The Unification Law's ρ(u) domain: "u ≤ 2" against "1 ≤ u ≤ 2".**
`research/GLOSSARY.md`:187 — "ρ(u) = e^{2γ}/u² for u = ln x / ln p **≤ 2**".
`research/ATTACKS2.md`:22 — "ρ(u) = e^{2γ}/u² (**1 ≤ u ≤ 2**; u = ln(position)/ln(level)
so u ≥ 1 structurally, and **the bare 'u ≤ 2' this cell used to give is a domain
on which the formula diverges**)". `paper/moire-primes.md`:303 and
`research/FOLD-PROFILE.md`:171 both carry the two-sided form. Correct: 1 ≤ u ≤ 2.
Ruled out: (a) same curve, same branch; (b) same u definition in all four;
(c) reversed — the vocabulary-owning document is the stale one and three others
carry the fix; (d) not numeric. Reported for the reversal alone: GLOSSARY is the
document every other file defers to on definitions.

---

## Near-misses examined and deliberately not reported

Recorded so the next sweep does not re-open them. Innocent explanation in brackets.

- **"4.2665 proven, 2 needed" (`G2-STATE.md`:526) vs "4.2665 proven, 1 needed"
  (`GLOSSARY.md`:380, `THE-DIALS.md`:30, `ATTACKS3.md`:192).** [a] The *zone*
  needs exponent 2, the *pane* needs 1, and `GLOSSARY.md`:377-381 states the
  contrast. This is the pair the brief warned about; the corpus keeps it right.
- **The anchored gap across a decade vs the localized max gap inside one zone.**
  [a] On the corpus's own instruction, `ZONE-POSTULATE.md`:175-178: "it remains a
  **different object** … the two constants must not be reconciled."
- **`maxgap-law.md`:493 and :533 quoting `FOLD-PROFILE.md` §12 as "`M(x,x'^2) ~
  1.2·x·ln x`", which `FOLD-PROFILE.md`:596 no longer says.** [c] `maxgap-law.md`
  labels it REFUTED and FOLD-PROFILE has been fixed, so the two agree on the
  mathematics. A custody nit — a blockquote attributed to text that no longer
  exists — not a value disagreement. (But see §Found en route: the script that
  section reproduces from still prints the refuted line as live output.)
- **The third `c` in the localized family** — `LOCALIZED-GAP.md`:129's "0.74 to
  1.17" against the on-diagonal 0.46. [b] That is the `c` of M ≈ c·m̄·ln(Y/m̄), a
  different object from the k-normalised constants of A6/B15/B16, and the file
  labels it as such: "The two are the same surface, not a disagreement, and
  neither number may be carried to the other's window."
- **Off-diagonal `c` band 0.85–1.05 (`maxgap-law.md`:525) vs 0.92–1.14 (its own §8
  table) vs 0.74–1.17 (its §9 row).** [b][d] Three sub-regimes at different
  (x, lnD) on a surface the file's own thesis says cannot be quoted without
  coordinates; all three overlap. Recorded because §9's band contains neither
  endpoint of §8's own measurement, and a prior pass reached the same "not cleanly
  one object" verdict (`research/history/staging/audit-self-contradiction.md`:489-491).
- **G₂ growth exponent 1.57 vs 1.54.** [d] `exponent-control.md` and
  `G2-STATE.md`:702-705 direct "Quote 1.57 for h₂, 1.54 for G₂", and 1.57 sits
  inside 1.54 ± 0.09; `U-FRAME.md`:157 and `h2-scoping.md`:122 quote both and then
  state the house figure. Flagged for a second look only at `THE-DIALS.md`:168,
  whose cell reads a bare "1.57 measured" without naming the object.
- **h₂'s 1.567 over 21 terms vs 1.57 ± 0.06 over 19.** [b][d] `U-FRAME.md`:562-564
  explains 1.567 as the corrected x-frame reading on all 21.
- **c₂′ = 0.4814 (8 terms) vs 0.4848 (9 terms).** [b][c] Each carries its n and
  x-range, and 0.4814 is the sealed pre-registration input.
- **β₂ written 4.2665 / 4.26645 / 4.267 / 4.266, and the bound as x^{4.2665+ε} /
  p^{4.267+ε} / (log p#)^{4.2665+ε}.** [b][d] `dhr-verification.md`:60-63 governs
  the convention and log p# = θ(x) ~ x makes the forms identical. Only B8's
  ellipsis breaks it.
- **The two 2.649s.** [a] `theta-ladder.md`:203-205 names the coincidence itself:
  the regression null 2 + ⟨2/ln lnW⟩ and the vector-sieve threshold 1 + √e "have
  nothing to do with each other".
- **Fundamental-lemma fallback 18+ε vs 19+ε, and Franze's Λ²Λ⁻ 4.5161 vs 4.516.**
  [c] Both `dhr-verification.md` corrections have fully propagated; no stale copy
  survives.
- **Var/E across the two processes** (full twin process, u = 2 value 0.251 → 0.321;
  comb-restricted Natal@5, 0.152 → 0.396, limit hypothesis 0.611). [a] Kept apart
  everywhere, on the GLOSSARY's own instruction.
- **"25×" at `discrepancy-two-class.md`:66, `maxgap-law.md`:76,
  `two-class-lower-bounds.md`:673, `U-FRAME.md`:427.** [a] That is m̄, the mean
  twin-slot gap at T₁₉ (9699690/378675 = 25.615), which coincides numerically with
  the T₁₉ enrichment because it is the same quotient. Different object, used
  correctly.
- **"three of four calm sightings dissolved" (`GLOSSARY.md`:263,
  `NATAL-CAP-CAMPAIGN.md`:77-83, `moire-primes.md`:597) vs "two of the four"
  (`anchored-note.md`:200-203, :567).** [a] The third item (the drift toward
  0.793·E) was *reclassified* into β rather than shown false, and `anchored-note.md`
  is β's home, so from inside that note the third reads as a rename. The campaign
  scoreboard enumerates all three. Borderline — recorded here rather than as a
  finding because both counts are defensible from their own vantage, but if Chris
  wants one number, the register's three is the one to standardise on.
- **`natal-cap-31`'s S̄ = 3614.9 / z = −2.49 @17 vs `anchored-note`'s E = 3,245.51
  / z = −4.50 @17.** [a][b] Diagonal strike ensemble vs window ensemble; both files
  state the incomparability in terms.
- **K\* "0, 0, 2, 10 at @11..@19" vs "0, 0, 2, 10, 27, 69 at @11..@29".** [b] Every
  short form is explicitly bounded or immediately continued.
- **`GLOSSARY.md`:201 "8·count(6) = 3·count(12) at every level" fails at T₅.**
  [b] `grain-census.js`:40 sets `LEVELS = [7,…,23]`, and `web/bench/README.md`:113-116
  states the p = 7 exception. A scope word, not a contradiction.
- **`OBSERVATIONS.md`:619 "Natal@5 carries exactly two thirds" vs `GLOSSARY.md`:157
  "each carries exactly one third".** [a][b] Natal@5 is two of the three houses.
- **Seam-neighbourhood runs** (`fold-profile-12`'s 1.016/0.980/1.007/0.986 with one
  control each; `fold-profile-13`'s 400 controls at z = −1.41 to +0.13;
  seam-anchored windows at 1.002 ± 0.005). No document merges them; GLOSSARY and
  the paper both note the two extremes are different tiles at different half-widths.
- **`ZONE-POSTULATE.md` never citing Ziller–Morack for the Gap Reformulation**,
  though `PRIOR-ART.md`:62-81 instructs "DO NOT claim the reduction. Cite them."
  ZONE-POSTULATE does not claim it either, and three other files carry the
  attribution. An un-actioned register instruction, not a contradictory assertion —
  but it is the document a reader is told to start from.
- **A9 / histogram transfer operator demotion, and the Holt attribution.** Fully
  propagated across `PRIOR-ART.md`, `operator-and-pair-count.md`, `U-FRAME.md`,
  `a3-09-histogram-operator.md`, `ATTACKS3.md`, `THE-LENS.md`, `research/README.md`
  and `paper/moire-primes.md`. No survivor claims priority.
- **"Fused-Window Calm Lemma".** Grepped the whole tree: zero live .md uses. The
  name survives only where it is retired and in `qc/checks.js`, which enforces the
  retirement.
- **The driving-term lemma (PROVEN) vs route (REFUTED); the X-limitation Theorem's
  per-level vs all-x forms; the Skeleton Collapse Theorem vs the Equidistribution
  Conjecture; the Origin Excess Lemma's one hypothesis and its three travelling
  statements.** All correctly separated at every site. These are the four traps the
  GLOSSARY warns about by name, and the corpus passes all four.
- **window/G₂ = "3 to 4" (`ZONE-POSTULATE.md`:198) vs "3.3 to 4.1"
  (`FOLD-PROFILE.md`:592) vs "between x′²/4.5 and x′²/3.2" (`LOCALIZED-GAP.md`:49).**
  [d] The true ladder is 3.34, 3.53, 4.12, 3.72, 3.93, 3.18 (T₁₇…T₃₇); all three
  are loose roundings of overlapping subsets, and no site claims a bound the data
  breaks.
- **"the zone (p, p²)" at `ATTACKS.md`:18, `OBSERVATIONS.md`:359,
  `web/PROPOSAL.md`:249, `paper/moire-primes.md`:405-423, against
  `GLOSSARY.md`:60's (p, p′²).** [a] (p, p²) ⊂ (p, p′²), so the pigeonhole
  small-gap theorem holds a fortiori in the glossary's zone. Terminological drift
  only; no number moves.
- **Merge-lemma turn-on: x = 13933 (`LOCALIZED-GAP.md`:53) vs x = 1453
  (`G2-STATE.md`:325).** [a] Two different conditions, and `G2-STATE.md`:318-328
  states the distinction explicitly (hypothesis-side vs conclusion-side, different
  k).
- **Pane exception range "n up to 1e5" (`GLOSSARY.md`:368, `ZONE-POSTULATE.md`:256)
  vs a sieve to 1e8 (`THE-DIALS.md`:195, `G2-STATE.md`:88).** [a] Two scripts —
  `square-window.js` at NMAX = 1e5, `window-exceptions.js` at N = 1e8. Both true in
  their range, and both report the same single exception at n = 26. The pane
  overshoot closed form 2(lnln n − 0.772), the corridor factor 5 = 15/2 × 2/3, the
  "159 corridor widths at n = 3e6" and "HALF the parity floor" all verify against
  `a3-07-pane-overlap.js`.
- **`ZONE-POSTULATE.md`:130's "predicted ~18" at p ≈ 4.3e9**, against ln π₂ ≈ 16.3.
  [d] The companion figure ln(2e8) ≈ 19 checks to the digit, and the load-bearing
  claim of the sentence is the shape. All other §4 numbers verify (8 → 5,540 across
  ten decades; 8,042 at p = 65,095,731,749; mean 470; 17×).

---

## Found en route, not cross-document disagreements

- **2C₂e^{−2γ} is stated as 0.41625 in five places** (`paper/moire-primes.md`:266,
  `paper/beta2-note.md`:181 and :183, `research/sift-limit-attack.md`:177,
  `research/genealogy.js`:21 and :54). With C₂ = 0.6601618158…, the product is
  **0.4162145…**, i.e. 0.41621. Every site agrees with every other, so this is not
  a disagreement — it is one wrong digit, uniformly, which is precisely the class a
  cross-document check can never catch.
- **`research/anchored-calm.md`:31 cites `natal-cap-36-skeleton-door.md` §P6**, a
  section that does not exist in that file (its sections are Theorem A, Corollary B,
  Proposition C, Measurement D, Proposition E, and the refuted decay shortcut).
  `node research/qc.js` refs is clean, so the `§P6` form is outside its pattern.
- **`ZONE-POSTULATE.md`:238-239 cites "`theta-ladder.md`:403 and :427,
  `G2-STATE.md`:701".** The live rows are `theta-ladder.md`:437 and :461 and
  `G2-STATE.md`:737; the 15-line correction box shifted them. Stale line pointers,
  fixable in the same pass as A1.
- **`research/fold-profile-08-zone-localized-gap.js`:117 still prints the refuted
  projection as live output** — "`localized: M(x,x^2) ~ c*2 ln x ~ 1.2*x*ln x
  against x^2 -> margin ~ x/(1.2 ln x)`" — and that script is the one
  `FOLD-PROFILE.md`:730 names as §12's reproduction command. The script's own
  readings block diagnoses it ("THE PROJECTION'S ALGEBRA DOES NOT FOLLOW FROM THE
  SLOPES PRINTED ABOVE IT") and the `console.log` was left deliberately so as not
  to falsify the pasted OUTPUT block. Anyone running §12's reproduction gets the
  refuted number on stdout with no marker. Scripts are outside this audit's remit;
  recorded because the .md was fixed and the runnable artifact was not.
- **`GLOSSARY.md`:399-401's "matching the closed form to three digits"** for the
  pane overshoot. The exact counts (1.32, 1.94, 2.33, 2.61, 2.89, 3.13) are right,
  but the closed form 2(lnln n − 0.772) gives **1.539** at n = 100 against 1.321
  (14% apart) and 1.959 at n = 300 against 1.938. "Three digits" holds only from
  n = 1000 up. `a3-07-pane-overlap.js` over-claims identically at its own reading,
  so the document inherited this rather than introducing it — which is why it is
  not a cross-document disagreement.

---

## Questions queued for Chris — research judgement, not audit judgement

1. **A1's blast radius.** The correction retires "the theta ladder as a
   TPC-reachability instrument" (`TODO.md`:80). Does `G2-STATE.md` §5b's *closed*
   table row ("θ turning over below 2 … **REFUTED**") survive, or does that route
   reopen as UNKNOWN pending the one-line fix? The audit will not rule on whether
   a route is open.
2. **A5's two working points.** Is 1.2 simply wrong, or are there two legitimate
   working points — the conditional one at u = θ_cond and the self-consistent one
   — that should both be stated, the second labelled? The corpus states one and
   calls it "the measured working point".
3. **A2's narrowing.** `covering-dive.md` says the surviving claim is "no
   Erdős–Rankin construction has been *written down* for G₂". Is that the sentence
   the paper should carry, and does Kalmynin–Konyagin get a row in `PRIOR-ART.md`
   under PROVEN or under adjacent-prior-art?
4. **A4's OEIS draft.** Does the submission go at twelve terms, wait for 546 to be
   reproduced, or go at thirteen? The three descriptions of 546 are not obviously
   the same claim: `paper/beta2-note.md`:69-72 is careful that it is "one search's
   exact term with its certificate verified, **not two independent computations of
   a maximum**"; `two-class-lower-bounds.md`:692 calls it "the exact value";
   `G2-STATE.md`:638 says the covering search "independently confirms" it. And
   `research/exact-g2-ladder.js`:45's fourteenth term, G₂(43#) = 618, needs a
   status word before it can be quoted at all.
5. **A6, and it is the oldest open item here.** Does 3.5 move?
   `research/history/staging/qc-scope-T.md` TA-3 asked this, graded it HIGH, and
   never got an answer. On the data the honest worst case is x²/(4.2 ln³x). The
   margin still diverges either way, so the question is what the corpus should
   quote, not whether the conclusion survives.
6. **B15's frame.** `localized-single-alignment.md` concludes that the bare ln³
   constant is "the wrong frame" and that the surface law M = c·m̄·ln(Y/m̄) is
   intact. Should `LOCALIZED-GAP.md` §5 and `FOLD-PROFILE.md` §12b drop the
   k-normalised band entirely and quote the surface with its coordinates, or widen
   the band to cover 2.14? Only Chris should choose between retiring a
   normalisation and re-measuring it.
7. **C1.** Should TODO item 1b leave the file under the forward-only charter, and
   do 1c and 1d get re-gated now that 1b's answer is in?
8. **The calm sighting count.** Three (register) or two (`anchored-note.md`)? Both
   are defensible; one number should be house style.

---

## What this says about the checks

Eighteen of the twenty-six findings share one shape, and it is the Kourbatov shape:
**the resolution was already on disk, in a document the stale one cites by name.**
A1's nine sites all cite `theta-ladder.md` §5b, where the retraction lives. A3's
two sites cite `two-class-lower-bounds.md` §10, the section that changed. B14 cites
the file it disagrees with, inside the disagreeing sentence. B15's asserting
paragraph cites the run that refuted its constant, five lines later. A2's
`covering-dive.md` explicitly hands the fix to two named files and section numbers,
and the handback was not taken. A6 was written up as a HIGH finding in a staging
file that has no `applied-` counterpart.

The mechanical consequence: a cross-document check does not need to understand the
mathematics. It needs to notice that document A cites document B for a claim and
that B's text at that location no longer supports it. The existing `quotes` and
`transfers` checks do this for verbatim quotations; **not one of these twenty-six
is a verbatim quotation**, which is exactly why all twenty-six survived a clean
gate. Four cheaper signals would have caught most of them:

1. **A numeric tuple appearing in two documents with one digit different.**
   `0.8693 / 0.8487 / 1.0060` against `0.5485 / 0.4877 / 0.4637` (A1);
   `3.8, 7.8, 18.1, 44.9` against `2.6, 7.1, 17.8, 45.1` (A3); `356,712` against
   `479,340` (B2). Extract every comma-separated run of three or more decimals per
   document, hash it, and flag hashes that differ between a citing file and the
   file it cites.
2. **A correction banner in a source document, with no matching edit in its
   citers.** `theta-ladder.md` gained a `⚠ CORRECTION` box and `anchored-calm.md`
   gained a `(BAND CORRECTED …)` note; every document citing them by section should
   have been listed as owing a re-read. The corpus already writes these banners in
   a recognisable form.
3. **A pending-work marker whose object exists.** `U-FRAME.md`:532's "still has to
   be computed by us", `natal-cap-21`'s "waiting on compute", `TODO.md` 1b's
   "PRE-REGISTER before running". The `absence` check enumerates this class; it does
   not yet cross-check the named quantity against the values other documents print.
4. **A stated band against the table printed beside it.** A6, B17 and the pane
   overshoot's "three digits" are all a claimed range against a column of numbers
   in the same file, and all three propagate outward before anyone recomputes the
   column. This one is arithmetic, not judgement: parse the pasted table, apply the
   stated normalisation, compare to the stated band. It is the same instinct
   `audit-numbers.js` already has, pointed at ranges rather than at single values.

A fifth, cheaper than all of them: **a `staging/` finding graded HIGH with no
`applied-` counterpart is an open defect.** A6 sat that way, and the file that
recorded it says so in capitals.

`node research/qc.js` reports **0 findings across 8 checks** with all twenty-six of
these present in the corpus, before and after this file was written.

---

*This document is an audit record, not a working document. Nothing in the corpus
was edited to produce it.*
