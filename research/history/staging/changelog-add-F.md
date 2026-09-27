# CHANGELOG entries, wave 2 partition F (the natal-cap family)

<!-- ledger
id: Q-changelog-add-F
status: ANSWERED
todo: none
question: Which superseded text from wave-2 partition F, the natal-cap family, belongs in the changelog?
verdict: Entries for eleven natal-cap documents and two new files, led by the retirement of the Fused-Window Calm Lemma and the certificate law with it, plus the prose-note index that closes qc-arch E4; staged only, not merged.
-->

*(Staging file. The parent merges these into `research/history/CHANGELOG.md` in
one pass; appliers never edit that file directly. House form: newest first,
grouped by the document changed, each entry naming the claim as it stood, what
replaced it, and the artifact that forced the change.)*

---

## 2026-08-17: the Fused-Window Calm Lemma is retired, and the certificate law with it

### research/anchored-calm.md (new)

**Created as a status-only parent**, the first of its kind, approved as a
document kind in the consistency campaign. It holds one status table over nine
sub-claims that live in five leaf notes, and no mathematics of its own. The
reason it exists is recorded below: the same status table had been written four
times, in four leaf notes, at four different states of knowledge, and no summary
could copy it correctly. `README.md` copied it under the word "Proven".

### research/certificate-engine.md (new)

**Created as the prose home of `natal-cap-28-analytic-certificate.js`**, which
had none. The object it describes gated two TODO items while its only prose
statement was a script comment. It separates the script's nine sub-claims at
five calibrations: three proven lemmas, one open conjecture, one heuristic
transfer, one refutation, three measurements and one set of predictions.

### research/natal-cap-19-calm-lemma.md

**"The Fused-Window Calm Lemma".** RETIRED as a claim name, everywhere. It named
a conjunction of four legs at three calibrations, and the conjunction was the
only thing a summary could copy, so every summary either reproduced the whole
grading or said something false. The nine objects underneath already had their
own names and their own proofs. "The anchored calm" survives as the name of a
*phenomenon*, and may not appear in any list headed Proven, Theorems, or the
proven spine.

**The four-leg status block at §"The Fused-Window Calm Lemma (status: two legs
proven, two measured)"**, which read:

> (i) [PROVEN] fusion — dev(0,q) is ONE cyclic sibling window of length
> L_q ≈ 2W/q. (ii) [PROVEN] duplication — dev(W/2,q) = 2 × one window.
> (iii) [MEASURED, exact finite computation, all scour primes @13/@17] one
> fused window is quieter than two. (iv) [MEASURED] the anchor is
> position-typical of fused windows.

SUPERSEDED. The section is now §"What Lemmas 1–3 do and do not give"; it keeps
the exposition as the derivation of the phenomenon and carries no status verdict.
Status moved to `research/anchored-calm.md`.

**§"The gap, precisely", item 1**, which read that leg (iii) "is not yet a
theorem" and needed "Cov_adj < 0 uniformly in q", calling that "a plausible
general proof target". REFUTED, and this is the correction that matters most in
the partition: the uniform-in-q form is **false**, with six known counterexample
primes, and the target it proposed cannot be reached. Forced by
`natal-cap-23-covadj-proof.js` (four counterexamples @11–@19),
`natal-cap-30-skeleton-bound.js` (q = 2339 @23) and
`natal-cap-36-skeleton-door.js --at29` (q = 173 @29).

**Lemma 3** is named the **Mirror-Phase Doubling Lemma**; it was previously
unnamed. Leg (iv) is named the **Anchored Typicality Measurement**, its
calibration inside its name, so that "Proven: …" cannot be written of it.

### research/natal-cap-23-covadj-proof.md

**§"Consequence: corrected status of the Fused-Window Calm Lemma"** and its
table. DELETED as a superseded status state. It read:

> (i) [PROVEN] fusion. (ii) [PROVEN] duplication. (iii) split by this file:
> (iii-a) [PROVEN] Cov_adj is exact arithmetic (Props 1–4); (iii-b) [CERTIFIED
> EXACT @11–@19] per-prime anticorrelation for 595/599 scour primes, the
> uniform-in-q form of (iii) refuted, the aggregate form standing at all four
> levels; (iii-c) [OPEN] the aggregate anticorrelation as an all-levels theorem.
> (iv) [MEASURED] anchored typicality 0.94.

Replaced by §"Where this sits", four sentences pointing at
`research/anchored-calm.md` for status and at the three successor notes for the
mathematics. The file keeps what it uniquely owns: Props 1–5, and the
refutation.

**The refutation was a clause inside that status block; it is now a named boxed
statement**, §"Uniform-in-q Anticorrelation is refuted", with all six known
counterexample primes listed and their skeleton values. It reached no summary
document in the corpus while it was a clause.

**The title**, "Cov_adj < 0 — the anticorrelation leg of the Fused-Window Calm".
Replaced by "Cov_adj < 0 — anticorrelation proven in aggregate, refuted
uniformly in q", which states the file's two results instead of naming a retired
parent.

**:123, "The brief's candidate mechanism".** REWORDED to "The candidate
mechanism, that most lags sweep the generic (p−4)/p classes", per the
house rule that working documents do not address a brief. All numbers and the
negative verdict unchanged.

### research/natal-cap-26-minus-half.md

**§"Consequence: status of the Fused-Window Calm Lemma"** and its table.
DELETED as a superseded status state. It read:

> (i), (ii) [PROVEN] fusion and duplication — unchanged. (iii-a) [PROVEN] now
> includes the exact −1/2 (Thm 2), the deviation identity (Prop 3) and the
> q-uniform no-30 bound (Prop 4). (iii-b) [CERTIFIED EXACT @11–@19]
> R(q) = −1/2 + skeleton ± 0.007, R_agg ∈ [−0.40, −0.29] < 0 at every level.
> (iii-c) [OPEN, reduced] the all-x aggregate theorem is now exactly
> G30_agg(x) < 1/2. (iv) [MEASURED] anchored typicality 0.94.

Replaced by §"Where this sits", which keeps the one thing that block uniquely
carried — the reduction of the open statement to G30_agg(x) < 1/2 — and points
at the parent for calibration.

**§"Next", items 1 and 2** (skeleton bounds by small-subset Bonferroni; an @23
exact dev pass to test stability one level up). SPENT: the skeleton collapsed to
one closed-form kernel and the ladder now runs to @29. Folded into §"Where this
sits" as pointers to `natal-cap-30` and `natal-cap-36`.

**The title**, "The Minus-Half Theorem — leg (iii) of the calm, aggregate form".
Replaced by "The Minus-Half Theorem — the exact −1/2 anticorrelation constant".
"Leg (iii)" is meaningless once the parent is retired.

### research/natal-cap-30-skeleton-bound.md

**§"Status of the Fused-Window Calm Lemma after this file"** and its table, the
most-cited of the four and the one `qc-status.md` B-2 named as the authority.
DELETED as a superseded status state. It read:

> (i), (ii) [PROVEN] fusion, duplication (cap-19) — unchanged. (iii) [THEOREM at
> x = 11..23; all-x OPEN] −1/2 exact + deviation = skeleton + collapse (Thm A,
> all x, q) + G30_agg < 1/2 certified as an exact integer inequality at all five
> levels (Thm B), margins 0.29–0.41. (iv) [MEASURED] anchored typicality ≈ 0.94
> — this leg has no proof mechanism in sight; it is the calm's last wall.

Replaced by §"What this file owns, and what it does not", which names the two
proven objects and the one open one and points at the parent. **Two of its
numbers were also stale**: the certificate runs to **@29, six levels**, not five,
and the margins run 0.287 to 0.406 with 0.3824 at @29.

**Theorem B's certified table**, five rows ending at @23 with the prose "@23 is
new". EXTENDED to six rows. The @29 row is K = 7,863, G30_agg = +0.1176, margin
0.3824, dev_agg = +0.1180, R_agg = −0.382, one resonance q = 173 (0.511), all
from `natal-cap-36-skeleton-door.js --at29` (18.5 min, W = 6,469,693,230), which
reproduces @23 as its control. The per-prime max|no30| column is empty at @29
because that pass computes the certificate and not the no-30 ledger; the
aggregate no30 there is +0.0004, in line with every level below.

**Prop D's exception list**, five primes. Now six: q = 173 at @29 joins it, and
the count is stated as six in 10,201 scour primes over six levels.

**§"Next" item 2** (run the @29 skeleton pass). SPENT — it is run, and it is the
sixth row of Theorem B.

**The title**, "The Aggregate 30-Skeleton Bound — leg (iii) of the calm, closed
at every computed level". Replaced by "— certified at every computed level, @11
through @29". "Closed" overstated a certificate at listed levels.

### research/natal-cap-36-skeleton-door.md

**§"The decay-law shortcut (refuted)", five-point statistics.** SUPERSEDED by
the six-point ones, which its own script has carried since the `--at29` pass and
which `TODO.md` already reported. The ladder is 0.2132, 0.1113, 0.1011, 0.1259,
0.0945, 0.1176 at @11 through @29; increments −0.1019, −0.0102, +0.0248, −0.0313,
+0.0231, non-monotone **twice**; mean 0.1101, spread 0.0313 (was 0.1082 and
0.0314); fits R² 0.439 / 0.261 / 0.331 against ln ln W / x / ln K (was 0.601 /
0.511 / 0.527), exponent −0.483 against ln ln W (was −0.700), residuals to ±0.27
(was ±0.25). **The refutation is strictly better supported than the note
claimed**: adding @29 makes every fit worse, which is the signature of a fit that
was tracking one outlier. Forced by `natal-cap-36-skeleton-door.js` lines 331–340.

**The door's statement** was unnamed prose. It is now the boxed **Skeleton
Equidistribution Conjecture [OPEN]**, so that the open object has a name a
summary can carry with its calibration attached.

**The title**, "The Named Door — opened, measured, and found not to be the
blocker". Replaced by "The Skeleton Equidistribution Conjecture — the door
opened, measured, and found not to be the blocker", naming the object rather
than a campaign step.

### research/natal-cap-31-calm-vs-kill.md

**Theorem 2, "From @13 on the strike channel is provably too small to
annihilate".** SCOPE CORRECTED. The proof runs per level, from L1–L2 plus the
**enumerated** ensemble maximum of VR, and `natal-cap-31-calm-vs-kill.js` line
184 enumerates exactly three levels: `for (const x of [11,13,17])`. Its own
reading 3 says so in terms — "proven, per level, from L2 + enumerated max VR".
No bound on max VR holding for all x exists in the corpus. So the theorem is
**proven at @11, @13 and @17**, and its extension to every x ≥ 13 rests on two
measured trends over three points: max VR falls 2.78 / 2.35 / 2.14 and the
driver S̄/√(K·V̄) rises 3.1 / 4.9 / 9.8. That extension is now stated as the
named **Loudness Ceiling Conjecture [OPEN]**. This downgrades `qc-status.md`
B-3's HIGH confidence on the x ≥ 13 scope, which rested on three summaries
agreeing — and all three descend from this one home.

**:119, "Assumption A relocated, not removed".** Named the **X-Channel
Restatement of Assumption A** and marked a restatement with measured support,
not a reduction.

**:107, "the Cov_adj < 0 leg cap-23, partial".** Replaced by "the Cov_adj < 0
aggregate result, cap-23"; the aggregate result is not partial, and "leg" names
a retired parent.

### research/natal-cap-21-beyond-chebyshev.md

**Theorem 2's heading**, "(the first beyond-Chebyshev unconditional ensemble
bound)". Level-stamped: "(the Beyond-Chebyshev Ensemble Bound, @11 — the first,
and so far the only one)". **The apparent contradiction with :141 is resolved
rather than corrected**: the two lines name different objects. Theorem 2 is the
first such bound anywhere, at @11, where capacity already settles P(S=0) = 0;
:141's next step would be the first at a level where capacity does *not*, and it
has not been run. The corpus holds exactly one beyond-Chebyshev ensemble bound.

### research/natal-cap-12-overlap-sign.md

**§"Status of 'the anchored calm' … pair component"**, which closed "the
remaining calm sightings (cap-05 variance ratios, cap-09 house splits) are about
second moments and remain open". SUPERSEDED: of the four original sightings only
the strike-variance one survives as the calm, and its mechanism is proven. The
paragraph now points at `research/anchored-calm.md` instead of grading the
siblings.

### research/NATAL-CAP-CAMPAIGN.md

**The `attack-04-fourier-budget.js` standing note.** KEPT and PROMOTED to a
blockquote at the head of the file, with the invalid readings named explicitly
(the "grows like 2ⁿ" growth rate and the "misses the p = 11 zone by only 18%"
near-miss) and with the corrected artifact's reversed conclusion stated. The
note was correct where it stood and the flagship paper never inherited it, which
is the campaign's worst single finding; it is now impossible to read this file
without meeting it.

**Convergent finding 4, "THE ANCHORED CALM (new object, unexplained, four
sightings)".** SUPERSEDED. One sighting, not four. The sub-random house splits
belong to every rotation, the sub-CRT pair/triple overlaps are the dead origin
plus short-window arithmetic (cap-12), and the drift toward 0.793·E is the
anchored bias β with its own home in `paper/anchored-note.md`. What survives is
the anchored strike variance, and its mechanism is proven.

**Open lead 2, "unify the four helpful anomalies; first step is proving the
sub-CRT sign of pair overlaps".** SPENT: the unification is done and the
S₂ ≤ Σ4N/(qq′) sign conjecture is refuted at every granularity (cap-12). What
remains of the lead is the Skeleton Equidistribution Conjecture and the Anchored
Typicality Measurement.

**:31, "predicted limit e^{2γ}/4 = 0.7932".** CORRECTED to 0.79305. The true
value is 0.7930547; the fourth decimal was wrong by two units and the "="
presented it as exact.

**The attack-8 scoreboard row**, "survivors ≥ 34/110/82/1877 @11/13/17/19" and
"K*(x) = 0,0,2,10". LEVEL-STAMPED and extended: the certified twin floors run to
six levels, 34, 110, 82, 1877, 4841 and 31,327 at @11 through @29
(`paper/staircase-note.md` Theorem 8), and the K* ladder continues 27 at @23 and
69 at @29, both measured (`natal-cap-11-kstar23.js`, `natal-cap-18-at29.js`).

**The prose-note index.** ADDED. All twelve `natal-cap-NN-*.md` are now listed
by filename with a one-line description, which closes `qc-arch.md` E4: two of
them, `natal-cap-04-packing-notes.md` and `natal-cap-32-wrap-identity.md`, were
reachable only through their `cap-NN` shorthand.
