# The Natal-Cap Campaign — ten attacks on "how much can prime q remove?"

<!-- ledger
id: Q-natal-cap-campaign
status: ANSWERED
todo: none
question: What is the mathematical upper limit on the number of Natal@5 slots a prime q can remove from an X-tile as the Scour drags across it?
verdict: Per-prime removal is boxed by four instruments (max overshoot +7.7% over the fair share 2N/q, worst conceivable dilation +0.7% at @17 over 92,160 tuples, certified Selberg caps 1.13-2.5x truth, and a proven prime-counting cap for q > W^(1/3)), but no per-prime cap, even an oracle, closes the first-order union bound for x >= 13 because Sum 2/q crosses 1 between @11 and @13.
-->

> ## ⚠ `attack-04-fourier-budget.js`'s "certified" column is NOT a valid certificate
>
> It pairs moduli with kernel values missing the k·(W/p)⁻¹ index twist, so the
> pointwise |F| is wrong by up to N/2 at x = 11. **Every number in that column
> is invalid, including the "grows like 2ⁿ" reading and the "misses the p = 11
> zone by only 18%" near-miss.** Any document citing `attack-04` for a certified
> bound, a growth rate, or a near-miss percentage is citing an invalidated
> computation and must be repointed. The corrected artifact is
> `natal-cap-02-fourier-budget.js`, and it **reverses the conclusion**: at
> x = 11 even an oracle fails (cap 117.3 against N = 90), the per-prime union
> bound is structurally dead from there on, and the real near-miss is 15% at
> x = 7 and moot. attack-04's qualitative readings stand; its certified numbers
> do not.

**The question (Chris):** establish a mathematical upper limit on the number of
Natal@5 slots a prime q can remove from an X-tile as the Scour drags across it.

**The answer, one paragraph.** Per-prime removal is now boxed by four
independent rigorous instruments, and the box is tight: gross(q) sits within a
few percent of its fair share 2N/q (max observed overshoot +7.7%, attack 1);
the worst *conceivable* dilation at @17 exceeds the mean by 0.7% (attack 3,
full enumeration of 92,160 tuples); certified Selberg caps run 1.13–2.5×
truth, assumption-free (attack 10); and for every q > W^(1/3) fresh kills obey
the pure prime-counting cap 2(π(W/q)−π(q−1))+1 (attack 8, proven). **But no
per-prime cap — even an oracle handing us exact gross(q) — can close the
first-order union bound for x ≥ 13**, because Σ 2/q crosses 1 between @11 and
@13 (Mertens divergence; found independently by attacks 1, 2, 4, 5, 10): the
Scour's raw strike capacity exceeds the census, and survival is paid entirely
by OVERLAP CREDIT (strikes landing on already-dead slots: 47% of all strikes
at @17). The campaign therefore relocates the entire twin question into one
object: **the overlap credit of the head primes q ∈ (x, W^(1/3)]** — the tail
is provably negligible (attack 8's tail theorem). The wall was met three times
and priced exactly: Bonferroni depth escalates K* = 0, 0, 2, 10 at @11..@19
(attack 8; the ladder continues 27 at @23 and 69 at @29, both measured);
the fresh-cap sieve constant needed is 1.28 vs the parity floor 2 (attack 10);
flat inclusion–exclusion cost reaches 10^327 terms by x=127 (attack 6).

Companion result, same day: **research/natal5-variance.js** — exact Natal@5
variance over rotations (J₅ pair-correlation with comb factor ρ₃₀ = 2/1/0 for
d ≡ 0/±6/other mod 30; brute-verified @7, MC-verified @11/@13). Almost-all
theorem: ≤ 1.0e-4 of rotations empty at @17, ≤ 8.4e-6 at @19; zeroing a random
rotation is a ≥100σ event. And the anchored escape MEASURED: the real tile's
z-score marches +1.05, +1.81, +0.28, −4.50, −25.52 (x=7..19), a deterministic
proportional drift (predicted limit e^{2γ}/4 = 0.79305) that diverges in σ-units
— no almost-all bound can ever capture the anchored tile, and now we know it
quantitatively, not just in principle.

## Scoreboard

| # | file (research/) | verdict | keepers |
|---|------------------|---------|---------|
| 1 | natal-cap-01-window-cartography.js | delivered; cap-sum dead x≥13 | window excess M(ℓ)−Nℓ/W is O(1) (≈2/4/7 @11/13/17, ~doubles per level); max gross/(2N/q)=1.077; dilation identity certified integer-exact |
| 2 | natal-cap-02-fourier-budget.js | certification door closes 3 ways | exact factored spectrum (local index k·(W/p)⁻¹, which is what `attack-04-fourier-budget.js`'s "certified" column is missing); comb factor values {2, φ, 1/φ}; effective base → 4/π; certified gap widens N^0.45 vs true N^0.23 |
| 3 | natal-cap-03-dilation-ensemble.js | clean null — no conspiracy possible | actual primes ensemble-typical (percentile 50.4); worst dilation @17 q=19: +0.7% over mean, unconditional; killer classes unoccupiable (smallest prime in them > √W) |
| 4 | natal-cap-04-packing-cap.js/.md | universal cap REFUTED at head (embedding reversed: ρ*₅ ≤ M_x) | safe-tail lemma (cap holds level-independently once x ≥ 2·M_x(ℓ)); NEW SEQUENCE: minimal two-class k-pair diameters 2,8,32,38,62,86,116,… — **compared at its owning convention A008407 on 2026-08-20** (`natal-cap-04-packing-notes.md`): w(k) ≥ A008407(2k) at all 17 terms, equality only at k=1,2 where the classical minimal patterns are twin-pair shaped, excess growing 16 → 236 from k=3, and no run of 3+ consecutive terms matches A008407 at any offset or stride — the ABSENT reading is calibrated, the sequence is genuinely a distinct, more constrained object (`research/SEARCH-CONVENTIONS.md` §2) (w(3)=32≠20 — classical cluster uses seam class 29, outside Natal@5); superdensity crosses 1 at ℓ≈1000 |
| 5 | natal-cap-05-second-moment.js | budget dies at Σ2/q; identity lands | **exact finite two-class BDH identity** (verified 1e-10, all 164 primes); 2N/q is exact ensemble mean (theorem); Fano 0.26→0.10 (sub-Poisson deepening); ANCHORED QUIETNESS: real rotation at 0.34–0.62 of ensemble variance, 0/164 primes >2σ — unexplained |
| 6 | natal-cap-06-bonferroni.js | certificates real, non-scaling | depth-3 @13 certifies ≥274 (truth 307); depth-5 @17 ≥3058; Brun tier threshold z₀=(√W)^{e^{−1/2}} measured exactly (53 works, 47 fails); hit-histogram identity S_k=ΣC(h,k); pair/triple terms run 3–15% BELOW CRT (helpful, unexplained); dies unpayably (10^10.9 @19 → 10^326 @127) |
| 7 | natal-cap-07-trajectory.js | Azuma loses to Chebyshev (refuted); framing exact | E[fresh\|past]=(2/q)·alive is exact; endpoint identity to the digit; increments uncorrelated (99% of Var); conditional variance 0.02–0.85× binomial; empirical Freedman e^−311 hangs on ONE unproven discrepancy lemma (pair-class counts O(√(alive/q))) — target for attack-2 machinery |
| 8 | natal-cap-08-staircase.js | **HEADLINE: Staircase Theorem + pigeonhole closures** | fresh(q) ≤ Φ*(⌊(W±1)/q⌋,q)+s(q), proven, 599 primes verified, 0 violations; q>W^(1/3) ⟹ exact prime-count cap; mod-30 lemma: q ≡ 1,7,23,29 can NEVER self-strike; refined ladder proves survivors ≥ **34/110/82/1877** @11/13/17/19, since extended to **4841 @23 and 31,327 @29** (six certified levels in all, `paper/staircase-note.md` Theorem 8) — elementary per-prime-cap proofs of twins per tile; tail theorem: Σ_{q>W^(1/3)} cap ~ 2ln2·W/lnW, negligible vs N; K*(x) = 0,0,2,10 @11..@19 (27 @23, 69 @29) = the wall's quantitative shape |
| 9 | natal-cap-09-mirror.js | mirror shortcut REFUTED | strike sets not μ-invariant (needs q\|W — brief's algebra corrected); \|H11\|=\|H17\| exact (fixed-point-free involution); survivors NOT mirror-paired (319 vs 323.4 chance); house splits SUB-RANDOM (0.3√gross vs 0.8 binomial) — unexplained keeper |
| 10 | natal-cap-10-sieve-cap.js/.md | double refutation, both priced | gross door MERTENS-barred: C*(x)=1/Σ(2/q) = 0.87 @13 < 1, → 1/(2lnx); fresh door PARITY-barred by exactly 2 (needs 1.28 @17, floor is 2 — Selberg/Tao); literature corrected: parity floor 2 not 4; chronology → Lichtman 2025 record 3.29956; Σcap = 2.30N @17 = harmonic 1.494 × fluctuation 0.998 × certification 1.545 |

## Convergent findings (independent instruments agreeing)

1. **The Mertens crossing.** Σ_scour 2/q passes 1 between @11 and @13 — found
   five times independently (1, 2, 4, 5, 10). At @11 first-order budgets still
   certify survivors (three different proofs); from @13 on, never again.
2. **Head/tail split at W^(1/3).** The tail is provably harmless (8's theorem;
   4's safe-tail lemma; 10's cap sums); the head (a dozen primes) carries the
   whole problem. The twin question in this program = overlap accounting for
   q ∈ (x, W^(1/3)].
3. **Fluctuations cost nothing.** 10's decomposition: fluctuation factor 0.998.
   5: max dev 7.1 vs budget 25. 1: max overshoot 7.7%. 3: worst case +0.7%.
   The Scour cannot even in principle be lumpy enough to matter per-prime.
4. **THE ANCHORED CALM — one sighting, not four.** The campaign found the real
   tile quieter or luckier than its own ensemble in four places, and exact
   control dissolved three of them. The sub-random house splits (9) belong to
   every rotation, not to the anchor; the sub-CRT pair/triple overlaps (6) are
   the dead origin plus short-window arithmetic (12); and the drift toward
   0.793·E with z→−∞ is the anchored bias β, a separate measured object whose
   home is `paper/anchored-note.md`. What survives is the anchored per-prime
   strike variance at 0.34–0.62× ensemble (5, 13), and its mechanism is now
   proven: the anchor's two strike classes fuse into a single window. The
   calm is a phenomenon and never a claim; its nine sub-claims and their
   separate calibrations are in [anchored-calm.md](anchored-calm.md).

## Open leads ranked

1. **K*(x) beyond @29** (attack 8): does the freshness-moduli count grow
   linearly or faster? The K* curve is the honest quantitative shape of the
   wall — a new object. **@23 and @29 are DONE, not open**: this file already
   records K*(x) = 0, 0, 2, 10 at @11..@19 continuing 27 at @23 and 69 at @29,
   "both measured", at two places above (the attack-8 row and the ladder
   summary). This lead used to read "K*(x) at @23" and was answered by its own
   document. The open question is the shape beyond @29.
2. **The anchored calm**: spent as posed. The unification asked for is done and
   the S₂ ≤ Σ4N/(qq′) sign conjecture is refuted at every granularity (12).
   What is left of the lead is one open statement and one wall, both named in
   [anchored-calm.md](anchored-calm.md): the Skeleton Equidistribution
   Conjecture, and the Anchored Typicality Measurement.
3. **The discrepancy lemma** (7→2): ensemble-wide O(√(alive/q)) control of
   alive-set pair-class counts via the corrected Fourier spectrum would
   upgrade ensemble bounds from polynomial to e^−311-grade.
4. **Certified depth-2 Bonferroni on the head** (6+2 composition): pair
   intersections are natal-type CRT patterns; price them with certified
   Fourier caps → a scaling-friendlier certificate family.
5. **Write-ups**: Staircase Theorem + tail theorem (paper-grade, elementary,
   verified); exact two-class BDH identity (short note); two-class minimal
   diameters sequence (OEIS draft — HOLD under moratorium).

## The campaign's prose notes

The scoreboard above names scripts. The mathematics is written up here, and this
is the full list, so no note is reachable only by its `cap-NN` shorthand.

| note | what it holds |
|---|---|
| [natal-cap-04-packing-notes.md](natal-cap-04-packing-notes.md) | literature: does a two-class dense-packing function exist in print? Apparently not |
| [natal-cap-10-sieve-cap.md](natal-cap-10-sieve-cap.md) | the rigorous sieve cap: literature, exact statements, the double refutation |
| [natal-cap-12-overlap-sign.md](natal-cap-12-overlap-sign.md) | the sub-CRT overlap sign; the Window Dilation Lemma; the Structured-Bias Theorem |
| [natal-cap-14-discrepancy-lemma.md](natal-cap-14-discrepancy-lemma.md) | the Discrepancy Lemma: statements and proofs |
| [natal-cap-19-calm-lemma.md](natal-cap-19-calm-lemma.md) | the fused window: three proven identities, and the Anchored Typicality Measurement |
| [natal-cap-21-beyond-chebyshev.md](natal-cap-21-beyond-chebyshev.md) | the Beyond-Chebyshev Ensemble Bound at @11, and the @13/@17 blocker |
| [natal-cap-23-covadj-proof.md](natal-cap-23-covadj-proof.md) | the exact arithmetic of Cov_adj, and the refutation of its uniform-in-q form |
| [natal-cap-26-minus-half.md](natal-cap-26-minus-half.md) | the Minus-Half Theorem: the −1/2 constant is exact |
| [natal-cap-30-skeleton-bound.md](natal-cap-30-skeleton-bound.md) | the Skeleton Collapse Theorem, and the Aggregate 30-Skeleton Bound at six levels |
| [natal-cap-31-calm-vs-kill.md](natal-cap-31-calm-vs-kill.md) | what the calm buys against annihilation: the @11 closure and the X-Limitation Theorem |
| [natal-cap-32-wrap-identity.md](natal-cap-32-wrap-identity.md) | the wrap identity: T₄ without quadruple enumeration |
| [natal-cap-36-skeleton-door.md](natal-cap-36-skeleton-door.md) | the Skeleton Equidistribution Conjecture: the door opened, and not the blocker |

Two status parents sit above the notes, because their claims are spread across
several of them: [anchored-calm.md](anchored-calm.md) holds the calm's nine
sub-claims and their calibrations, and [certificate-engine.md](certificate-engine.md)
is the prose home of `natal-cap-28-analytic-certificate.js`.

## Standing notes on the artifacts

- The `attack-04` warning at the head of this file governs every citation of
  that script. The certified numbers come from attack 2 instead.
- Reference figures established by the campaign, for anyone recomputing:
  the @13 scour is 34 primes; @17 has 105 of 120 primes in the prime-cofactor
  regime; mirror strike-invariance needs q | W (attack 9); the packing
  embedding runs ρ*₅ ≤ M_x (attack 4); the parity floor is 2 (attack 10).

Moratorium respected throughout: nothing committed by agents, nothing posted;
OEIS candidates drafted-in-place only. All artifacts run standalone in
seconds; every cap claim is machine-asserted against the actual march.
