# 2026-08-28: the proof-shaped wave. Twenty-one agents, zero routes, four items closed, one held headline

<!-- ledger
id: Q-session-0828
status: ANSWERED
todo: none
question: What did the 2026-08-28 wave establish?
verdict: 21 agents, zero routes, four TODO items closed or answered, one HELD headline (Var/E = 0.45546, heuristic).
-->

*(HELD. Written by the primary agent at the end of an autonomous session; Chris
was away. Every file named here is HELD in `research/history/staging/` and
nothing was promoted to a live doc. No git command ran in any agent; the
primary agent ran the gate twice (251/251 at start, 251/251 at end with all
new files present) and nothing else. The cross-file coherence pass is
`coherence-0828.md` and its correction table is the integration queue.)*

## What is still open, first

- **The wall did not move.** No two-class exponent below 4.26645, no all-x
  statement about Z₂, nothing about the conjecture. Twenty-one attacks today
  on top of twenty-one over 08-26/27: **42 for 0 over three days.**
- **The certificate engine's two unproven ingredients are now theorems with
  empty computable range** (`thm-capK-bv.md`, `thm-buchstab-transfer-shallow.md`,
  `thm-sharp-sieve-range.md`). The κ=1 statement needs s ≥ 10.82 under the
  fundamental lemma and is first non-empty at @53 as a limit statement; the
  κ=2 statement needs s ≥ 22.06 and is first non-empty at @23 as a limit
  statement, at 3 primes' worth of depth. At the engine's own depth (@97,
  ln q_K/ln T = 0.562) the hypotheses fail outright. The sharp sieve functions
  do not help at finite level because Diamond–Halberstam Thm 9.1's constant is
  not written; the crude lemma is strictly better there.
- **The Z4 head residual does not close.** Three files deep
  (`head-residual-factor.md`, `-null.md`, `-hl3.md`): the residual h − R
  decomposes exactly, its forced part derives, and the remainder is a prime
  deficit at the two openers that Hardy–Littlewood prices to 5% with no
  parameter, over-predicting at 5.5 s.e. with the same sign across three
  decades. Measured consistent with HL to 5%, nothing derived beyond HL.
- **One headline is HELD behind an adversarial pass Chris has to call.**
  `varE-spectral.md`: lim Var/E on the diagonal = Pr[GD(2) > 2] =
  1 − e^{−2γ}(9/2 − 4 ln 2) = **0.45546**, HEURISTIC, one named unproven step
  (the mean-coefficient replacement is an identity at one excluded class and
  false pointwise at two), zero fitted parameters, residuals at the nine exact
  points within 0.002 from x = 13 up, and the θ = 1 case reproduces
  Gorodetsky's published λ(u) exactly. Prior art (`lit-dickman-variance.md`):
  not in print at θ = 2; the nearest is Aryan, Mathematika 61 (2015) Lemma
  1.2, an upper bound with our main term and no asymptotic. The published
  0.611 reading is **refuted as an inference**: the same fit protocol run on
  the model returns 0.6151. The number 0.611 reaches `paper/variance-note.md`'s
  abstract, `GLOSSARY.md`, `README.md` and `TODO.md`. Nothing is changed until
  the pass runs.

## What moved, calibrated

**Closed or answered (four TODO items).**
- **Item 11, all three prizes, WRITTEN as theorems** (`thm-mod30-tail.md`,
  `thm-capK-bv.md`): S1 at modulus 30 by PNT in APs, S2 at fixed (P₀, K) by
  Siegel–Walfisz, cap_K over the full wheel by the fundamental lemma over
  Bombieri–Vinogradov. Short-note grade, no second reader. Tail constant
  2 ln 2 → (ln 2)/2 proven; nothing in the head. **The survey's freshness
  factor is wrong**: one class per freshness prime, ∏(1 − 1/(q_i − 1)), not
  two; found independently by two agents, measured 5–32% off at @17/@19.
- **Item 10, NEGATIVE** (`excess-chain-c.md`): the compressed-tail correction
  tends to 1 for any correlation length and has the same sign as Gumbel
  centering; 1.074 is outside the family. c = 1.05 ± 0.06, flat, MEASURED.
- **Item 1c, CLOSED at the data's level** (`c2prime-refit-22.md`): the drift
  is class-count-blind (control 0.334 vs 0.375 per ln ln x, gap 0.63 of the
  control's own sd); the rate is not measurable on the band.
- **Item Z5, PRIOR-ART-EXPLAINED** (`record-location-null.md`,
  `lit-kourbatov-shortfall.md`): the 6.0% survives the corrected null
  (z = −3.3) and then turns out to be Kourbatov's published shortfall
  coefficient b = 1.2597 in the same normalisation on the same data (our
  median z reads −1.2597). Reproduction, not confirmation. Unexplained as a
  mechanism in both corpora.

**Refuted premises in my own briefs (three).** Item 0's first move had run on
08-21 (`attack-rhoms-01.md`; `rho2-analytic-bound.md` named the constant
170.88 and showed Chebyshev off any second moment diverges from RML). The
sharp-sieve premise failed on its central claim. The "two live positions
= 52%" and "left-heavy" readings in `head-residual-null.md` were corrected by
`head-residual-hl3.md` (16%; binning artefact).

**Proven, small.** Fourteen forced ledger constraints (`fold-ledger-forced.md`;
"by_new = O(1)" is MEASURED, forced only in the prime gap); the Comb
Discrepancy Lemma is the trivial per-block bound and its attained optimum is
max G − min G (`comb-discrepancy-tight.md`; slack 29× @23, 54× @29, growing;
term-by-term pricing lifts the certified head share to ~28–29%, under the 50%
hoped); Lemma 1 K* ≥ π(y′) − π(y) kills the CRT lift as an (H-sub-pow)
mechanism at every base (`hsubpow-explicit-K.md`; TODO 1d's legal zone is
mis-stated, trusted zone [1.3946, 11.3568)); Var/E = δ·X with
δ ln²W → 1.109905 and the MS main term exactly L (`varE-asymptotic.md`).

**Imports (Chris's steer), as the record predicted.** Three rows priced
(`import-map-rows-15-17.md`); row 15 run (`import-fracparts.md`): prediction
HIT, PUBLISHED-ANCHOR and a sharper WALL-ADDRESS banked, the theorem overpriced
(Thm 10 controls a marginal, Ψ_M is joint), no route. Row 16 is stale: Z5
closed under it while it was being priced. VC prior art read
(`lit-vc-multiples.md`): DISJOINT at theorem level; HSW 1992 Thm 3.1 owed.

## The integration queue

`coherence-0828.md` §5: 46 corrections, 41 to live docs, 34 mechanical and 12
needing a second reader. The two that matter most are the Var/E constant
(reaches a paper abstract) and the freshness density factor (reaches
`GLOSSARY.md`, `staircase-note.md` §7, `bv-import-survey.md`). Also owed from
08-27 and still unapplied: the six drafted corrections in that resume block.


## The adversarial pass, same day (Chris's call)

Seven red teams (`redteam-0828-{varE,engine,head,closures,litimports,quadpoint,census}.md`)
covered all 24 notes above and the seven-note Z0 debt owed since 08-22; seven
apply passes wrote the corrections into the HELD notes (`applied-0828-*.md`,
about 260 edits) and two more carried the confirmed ones into the live layer
(`applied-0828-live.md`, `applied-0828-registries.md`; every live edit has a
CHANGELOG entry). Gate after all of it: full pass. Verdicts that matter:

- **0.45546 survives at HEURISTIC with TWO open steps, not one** (the θ = 2
  mean-coefficient replacement and the model's own limit theorem). The
  closed form is confirmed to 2.9e−11 by three routes; the θ = 1 branch is
  an exact identity with Gorodetsky's (1.5)/(1.6). The 0.611 refutation is
  strengthened: it fails the frozen out-of-sample protocol too. GLOSSARY,
  README row 06 and TODO item 9 now say so; `paper/variance-note.md`'s
  abstract and §7 still carry 0.611 and are Chris's to edit.
- **The one-class freshness factor is confirmed and holds at every scour
  prime.** GLOSSARY, bv-import-survey and certificate-engine are corrected;
  `paper/staircase-note.md` §7 is Chris's.
- **The capture identity is PROVEN once its window clause is stated**
  (half-open, both members in [Q², Q′²)); the loose reading breaks by +1.
- **records-placement READ-3 was vacuous** (75 of 82 fractions were fixed
  before the seal); the bands were not moved; the two reads with power stand.
- **Saffari–Vaughan Thm 10 reads y > x^{6/11}, not x^{1/11}**: row 15's
  banked THEOREM is void, its anchor and wall-address stand.
- **Scope numbers moved**: first s ≥ 10.82 at x = 263 (not 239); κ = 1 first
  non-empty at @37 (not @53); the head chain is "rate, not limit", with R the
  continuum functional and an integer origin seeing R + 1/2; c2prime-refit
  is PARTIAL, not CLOSED; "5.5 s.e." is dropped (inside HL's own 1/ln x term).
- **Custody residual on both sealed preregs**: producers first exist in git
  4m48s and 10m56s after their seals; mitigated, not proven.

Nothing in the pass moved the wall.


## The cleanup phase, same evening (Chris: "clean up the body of work; close the two Var/E steps")

- **Var/E.** Step 2, the decoupled model's own limit theorem, is PROVEN
  (`varE-limit-theorem.md`: GD(2) convergence with rate, E[g] → λ₂(u) with
  no correction, the n < L band exact at nine levels at 0.063/ln y). Step 1,
  the θ = 2 identification, stays OPEN (`varE-theta2-proof.md`): two of
  three groups close unconditionally; the CRT-mixed lags reduce by an exact
  identity to the distribution of y-smooth divisors of C(C²−4) above 2L,
  a Ford/Hooley-convention question not yet searched. Exact ratios extended
  to x = 29, 31 (`research/varE-exact-ladder-01.js`, 42 min), still falling.
  0.45546 remains HEURISTIC for the true variance.
- **The ledger is complete**: 388 questions, 412 indexed notes, none left by
  title (four backfill passes; chained notes share ids; registries carry
  `Q-registry-*` blocks).
- **TODO pruned to its charter**: 11, 10, 1e, Z5b retired; 1c parked; nine
  items restated on what remains.
- **Corrections applied**: the six drafted on 08-27 (18 edits, six files),
  four SEARCH-CONVENTIONS rows plus a row-parse defect, IMPORT-MAP counts,
  the hyperuniformity/sub-Poisson conflation across GLOSSARY and eight
  documents. Every entry in CHANGELOG.
- **Pushed**: `main` at the cleanup commit, clean tree, full gate green.

Next, in order: search the Ford/Hooley divisor convention for step 1; write up
the K–K lower bound; restructure Paper III around the proven model theorem.

## What would falsify this, and whether that check has run

Each file carries its own section. The one check none of them can run is the
adversarial pass on `varE-spectral.md`; it has not run and it is not mine to
call.
