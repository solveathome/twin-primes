# The Chronicle — dated discovery log

What was found, when, in order — including what was refuted, because the
refutations are part of the method. Compressed from the full working sessions
of 2026-08-13/14; every entry has its artifact in this repo.

## Prehistory: 2020–2026 (the corpus)

Six years of independent experiments in ~/Math/Prime (26 folders): the moiré
intuition; hand-derived ∏(p−1) and ∏(p−2) ladders (notes.txt, 2024 — the
value 217,929,355,875 for 37# appears there in pencil); wheel gap words and
the merge rule (jumps.txt); Fermat factorization rediscovered three ways; the
folder-17 twin proof attempt with its honest `<INSERT ANSWER>` placeholders.

## Day 1 — 2026-08-13

- **Corpus digested** (four agents): every discovery mapped to canonical math
  (Smith 1857, Schemmel 1869, Euler, Sundaram, Carmichael, Hardy–Littlewood,
  Iwaniec) — independent rediscovery as credential, not flaw.
- **Spine proven**: Copying Theorem (D → (p−2)D, removal exactly 2);
  Redundancy Lemma (new kills = p × holes, ignition at p²); Crystallization
  (below p², possible = actual, forever); Euclid-in-moiré; Zone Equivalence
  (TPC ⟺ occupied zones i.o.).
- **Measured** (scripts 01–06): zone share → e^{2γ}/4; first-twin margin ~p;
  Legendre's 3ⁿ certified-error budget vs ~2-unit observed cancellation;
  Hardy–Littlewood accuracy to ±1σ at 10⁸ (crystallization check 8/8);
  G₂ = 12…258 through 29#; exact Variance Theorem (CRT pair correlation,
  verified vs brute force; certified almost-all-windows bounds).
- **First attack wave** (ten attacks): monster gaps migrate deep — zone
  decoupled from G₂'s growth; head enriched, equidistribution locks at ~p³;
  Gaussian moments, min window count 9–12; Fourier budget ~2ⁿ (18% short of
  certifying the p=11 zone); zero empty prime-square annuli to 10⁸; d↦G_d
  splits at equal density (later shown a coincidence); certificate ceiling;
  **THEOREM: every zone (p,p²) contains two primes within 2(1+o(1))·ln p —
  unconditional**; parity step costs 8% (Chen factor 2 visible raw); anchored
  origin three-phase law (partly corrected next day).
- **Audit** (three agents): wave framing published up to PRL 2019; Ziller–
  Morack 2017 = near-miss of the gap reduction (all-differences form);
  candidate novelties: G₂ (not in OEIS), exact two-class variance, the
  synthesis. Framing decision: rediscovery + new lens, honestly cited.
- **Deep-research batch** (five agents): Paper I draft; variance note —
  REFUTED our own "≈0.2 constant" (drift + scaling law); anchored-windows
  formalization — CORRECTED our own attack-10 divergence claim, resolved the
  trough constant (e^{2γ}/4), discovered the kill shadow (~0.85 dip past the
  frontier); d↦G_d definitive map — the v₂ "law" was a level-19 coincidence;
  OEIS G₂ draft with a(11) = G₂(31#) = 348 computed over 2×10¹¹ positions.

## Day 2 — 2026-08-14

- **growth.txt session** (shared understanding): fossil strata CONFIRMED
  (17's dent 0.714 at levels 19 AND 23 — copied through folds unchanged);
  **Seam Lemma** (every seam carries a pair; each fold kills exactly 2,
  p−2 survive) — anticipated by Chris's 2025 folder-17 row notes.
- **Second attack wave** (five agents, ten attacks): **THE UNIFICATION LAW**
  ρ(u) = e^{2γ}/u² → (e^γω(u))², derived independently twice, absorbing the
  kill shadow as its first-octave average; **EXACT INVARIANCE LEMMA** (bands
  scale by exactly (p−2); fossil depth frozen at birth) — also proven twice
  independently; seam-twin census E(P) = 2·∏p/(p−2) verified to 0.2–0.6%
  (seams are 10–20× hotspots as POINTS; window enrichment refuted); seam
  ladder = A060256 (known, formula-less); per-level seam-twin count NOT in
  OEIS (draft written); 11-anomaly = small-number luck (seam-collision
  hypothesis refuted); tomography unified the "richest windows contain
  seams" reading with the rich vein (resolved below).
- **T₃₇ census verified**: 217,929,355,875 over 7.42 trillion positions —
  exact match with the 2024 pencil value. Mod-30 lattice counter 57× faster.
- **Genealogy**: zero orphans — one family from the ancestor (5,7) in T₃;
  the ancestor dies at fold 5 (self-strike); **the three houses** (11 & 17
  mirror pair, 29 = edge/womb; exact thirds forever; @5 the unique tile
  crystallized at birth); **birth cohorts** (cohort(5)=2, cohort(p)=p−3;
  count(@p,Tₓ) = cohort(p)·Dₓ/Dₚ; frozen shares — 2/3 of everything ever
  is @5-born). Verified exactly at T₁₃/T₁₇.
- **Vocabulary adopted**: tile, fold, width |Tₚ|, census (A059861/Schemmel),
  seam, mirror, zone, frontier, stratum, kill image, family, houses, cohorts,
  **Twin Prime Grain**, **the Scour**, remover window, overlap credit.
  Official positioning: "a new framework and vocabulary over classical
  sieve-theoretic objects — a new lens."
- **The removal ledger**: capacity EXCEEDS census (1.14× at T₁₃, growing
  ~2 ln x) — scarcity routes dead; survival = overlap credit; folder-17's
  `<FORMULA(PI#)>` finally written and its step-7 inequality REVERSES.
  Family-restricted union bound fails 2.66× at T₃₁ (= Brun's first line);
  house-blindness (68.7/69.3/69.9%) closes the family-targeting escape.
- **Two-Moiré Argument**: Grain and Scour from disjoint prime alphabets ⇒
  exact CRT independence (theorem in the joint tile); TPC = "the Scour never
  achieves perfect local alignment with the Grain" (a 10⁻⁶⁹ sliver of a
  guaranteed pattern). Five doors of the wall now surveyed with prices.
- **The covering arena** (Chris's pick): Hough/BBMST (no all-large-moduli
  covering of ℤ); Erdős–Rankin/FGKMT constructions fall short of the zone by
  ~p/ln p; **the dive**: Iwaniec's β₁ = 2 = twin-critical exponent is the
  linear sieve's sifting limit (the 1978 luck); two classes = dimension 2 =
  β₂ = 4.26645028414864191641 (Booker–Browning, rigorous); FGKMT Remark 7
  fences dimension 1 — frontier confirmed empty at every exponent.
- **THE β₂ THEOREM drafted and verified**: G₂(n) ≪ pₙ^{4.267+ε} — first
  two-class Jacobsthal bound in history; remainders don't explode (slack vs
  Iwaniec's zero-slack); primorial form avoids the contested transfer lemma;
  seven verification edits applied; n(n+2) is the DH book's own example.
  ONE item outstanding: line-level check of DH Theorem 9.1 (library card).
- **d2=d4 PROVEN**: Labos's 2001 unproven A059861 remark — triples
  impossible mod 3, both counts ∏(p−2), bijection = doubling on the odd
  part. Grain analog refuted (T₇/T₁₁ equalities break at T₁₃).
- **Rich vein solved**: a T₁₁ ceiling plateau (20/135 slots = width-289 max;
  58 tying offsets in 5 mirror-pair runs; the seam-alignment reading was the
  same plateau).
- **Grain census law**: exact CRT inclusion–exclusion for every gap count
  (94 sizes, six levels, digit-exact); count(6) = ∏(q−4); the grain never
  contains "6,6"; **locked ratio 8·c(6) = 3·c(12) forever** (the Grain's
  Labos analog); m-strata fold-covariance ×(q−2m). The CRT predictions
  caught a bug in the sieve code — the theory debugged the instrument.
- **Paper suite** (paper/PAPERS.md): flagship (v2 rewritten in tile-language)
  + β₂ note + variance note + experimental paper + OEIS drafts (waiting).
- **Attestation**: OpenTimestamps proofs (Bitcoin-anchored, hash-only) +
  full-repo backup to iPhone via USB (roundtrip-verified). PUBLICATION
  MORATORIUM in force until Chris declares done.

## Day 2, evening — the Natal@5 campaign (2026-08-14)

- **Vocabulary landed**: Natal set @p, carried set, eternal edge; self-strike
  = twin FOUND not a kill (proven, all levels); √W tooth-loss (the p² rule
  from the kill side); the 17-tile Natal@5 march (14,850 → 3,099, all
  survivors genuine twins). Folder-17's "more twins than we can remove"
  VINDICATED with the overlap-corrected ∏(1−2/q) (the naive sum triple-counts).
- **Exact Natal@5 variance** (natal5-variance.js): comb factor ρ₃₀ = 2/1/0
  (d ≡ 0/±6/other mod 30) — natal gaps only ever ≡ 0, ±6 mod 30; verified
  brute-force @7 and Monte-Carlo @11/@13. E/σ = 100σ @17, 345σ @19; empty
  rotations ≤ 1.0e-4 @17. **The anchored escape MEASURED**: the real tile's
  z-score marches +1.05, +1.81, +0.28, −4.50, −25.52 (x = 7..19) — a
  deterministic proportional drift (predicted limit e^{2γ}/4) that diverges
  in σ-units; no almost-all bound can ever capture the anchor.
- **The ten-attack cap campaign** (natal-cap-01..10 + NATAL-CAP-CAMPAIGN.md),
  on Chris's question "how much can prime q remove?": per-prime removal
  BOXED four independent ways (max overshoot +7.7%; worst possible dilation
  +0.7% @17 by full enumeration; certified Selberg caps; prime-count caps).
  **Staircase Theorem** (proven, 599 primes verified): fresh(q) ≤ pure prime
  counting for q > W^(1/3); q ≡ 1,7,23,29 mod 30 never self-strike; refined
  ladder closes the pigeonhole — survivors ≥ 34/110/82/1877 at @11..@19,
  elementary per-tile twin-existence proofs. **Exact finite two-class BDH
  identity** (verified 1e-10). **The wall priced three ways**: Σ2/q crosses 1
  between @11/@13 (Mertens — first-order budgets dead forever after);
  fresh-caps need constant 1.28 vs parity floor 2; Bonferroni depth K* =
  0,0,2,10 escalating. Survival = overlap credit (47% of strikes hit dead
  slots @17). New unexplained object: **the anchored calm** (real tile
  quieter than its ensemble — four independent sightings).
- **Housekeeping**: TODO.md charter (forward-only list; the body of work is
  the record); attestation v5 + all prior proofs Bitcoin-anchored; backup
  policy fixed (raw work only, never recursive — the v1–v5 snapshots had
  snowballed to 240MB by archiving each other).

## Day 2, night — waves 2 and 3, all landed (2026-08-14, autonomous loop)

Fourteen artifacts (natal-cap-11..21 + notes), every agent home:
- **β(x) formalized** (paper/anchored-note.md): the whole conjecture = one
  number's positivity; conditional theorem complete; drift table to @29
  (β = 0.8752, z = −762); pinned-linear dead, zero-knob classical
  correction (e^{2γ}/4)(1+2/lnW+6/ln²W) residuals collapsing to +0.003.
- **Staircase note** (paper/staircase-note.md): print-grade; Lemma 5
  upgraded to all x (mod-4, one line); source-script RS/PNT overclaim
  caught and corrected in place.
- **K* law**: K*(29) = 69, phi-band confirmed, K* SUB-linear in the scour;
  wall = efficiency collapse (floor/truth → 0.0025), not ladder cost.
  [CORRECTED 2026-08-15: the efficiency-collapse half of that sentence is
  refuted. natal-cap-24 measured bound/truth at fixed RELATIVE depth and it
  IMPROVES with level; the collapse was an artifact of reading only the
  crossing point K*. The K*-is-sub-linear half stands.]
  Hybrid floors 39/238/2227/25978 = best elementary; head-exactness ≤0.1%.
- **First beyond-Chebyshev ensemble theorem**: @11 P(S=0) ≤ 1.49e−6
  (4190× beat) via exact endpoint moment ladder; @11 fully closed
  (P(S=0) = 0 exactly, capacity door, @11-only). Per-step chains dead.
- **Fused-Window Calm Lemma**: the anchor's two strike windows are
  mirror-adjacent and fuse (proven); W/2 duplicates (proven
  variance-doubled per prime — NOT proven loudest, and measurably not the
  loudest at @13);
  fusion predicts the calm within 7%; rank 14/9.7M at @19. The calm's
  four sightings reduced to one mechanism + one wall-leg.
- **Structured-Bias Theorem** (overlap sign): S₂ ≤ ΣCRT refuted; each
  combo = anchored window of a dilated pattern; S₂ formula-priceable.
- **Zone-share expansion DERIVED**: aⱼ = (j+1)!/2^j exact; out-of-sample
  p = 200,003 hit at 2e−5; thread closed.
- **Variance to @31** (product-sieve, exact): Var/E 0.152→0.388; full-period
  Var = 0 proven in BigInt; anchored z ladder −25.5/−144.9/−762.1.
- Window-excess multiplier is NOT constant (×1.96→×1.56, drifting).
Refutations this wave: mirror invariance, universal packing head, S₂ sign,
Azuma>Chebyshev, per-step chains, fixed excess multiplier, pinned-linear
drift, partial-period calm candidate, three of four calm sightings.

## Day 2, deep night — waves 4 to 6 (2026-08-14/15)

The overnight queue landed, all three runs. Full data record in
research/history/NIGHT-LEDGER-2026-08-14-15.md; headlines only here.
- **β(37) = 0.8530**, hitting the on-record zero-knob classical forecast
  exactly. Fourth consecutive residual collapse: +0.0046, +0.0026, +0.0016,
  +0.0010. Nine levels now, W = 7.42e12, z(37) = −22,633.
- **Var/E(37) = 0.3958** separated the two limit fits 10:1 in favour of the
  lnlnW form. Limit ≈ 0.611 is live; the 0.44 reading is demoted.
- **E_med(31) = 60.90** against the a-priori 61.22 from the derived excess
  law: the chain's first fully-in-advance test, passed at 0.5%.
- **Skeleton Collapse Theorem** (cap-30): the 2ⁿ ledger collapses to one
  kernel K = 15C − 2P, all x, all q; G30_agg < 1/2 certified in BigInt at
  @11..@23. The all-x door is now named and analytic.
- **X-limitation Theorem** (cap-31, extended to @19 by cap-38): at the
  enumerated levels @11, @13, @17 and @19, strikes alone cannot annihilate at
  any loudness. **Not "from @13 on"** — the proof runs per level and needs the
  enumerated max VR at each; the all-x form is the Loudness Ceiling Conjecture
  and is open. Assumption A relocated to the overlap-credit
  channel, where it provably lives; the drift sits at multiplicity m ≥ 3.
- **Wrap obstruction dissolved** (cap-32): T₄@17 computed for the first
  time, 4,616,850,623,332, in 10 minutes against a 4.9e16-term naive sum.
- **The exponent road mapped** (sift-limit-attack): the distance from 4.2665
  to 2 is 100% a positivity problem and 0% a distribution problem. One
  lemma named, Lemma V, with the pilot certificate positive at all 9,699,690
  positions of the p < 20 period.

## Day 3 — 2026-08-15, morning: integration, no new compute

The night's 23 artifacts had never been read end to end. This session read
the ledger and the notes, then made the body of work agree with itself.
- Eight superseded READINGS now carry forward pointers naming what replaced
  them, one per reversal: efficiency collapse, the calm reduction, the S₂
  sign, the excess multiplier.
- research/GLOSSARY.md gains an anchored-layer section: the rotation
  ensemble, the anchor, β, Assumption A, fused window, the X-channel, the
  skeleton, staircase caps, K and K*, hyperuniformity, Lemma V.
- Three papers folded the results in. anchored-note: variance to nine
  certified levels, the mod-4 upgrade in Lemma 2, the X-channel subsection.
  variance-note: a new §7 with the comb-restricted J₅, the BigInt sum rule,
  and the nine-point diagonal that reduces the open question to one
  constant. moire-primes: a new §7A, the wall located as four faces with
  coordinates. staircase-note: Theorem 8 extended to @23 and @29.
- paper/PAPERS.md carries the paper-grade assessment; three calls are
  Chris's and sit in the TODO's moratorium block.

## Day 5 — 2026-08-17, evening: the localized chain, and finding Holt

- **The Localized Merge Lemma (PROVEN, VERIFIED at 820 folds).** Two
  elementary facts, that no two twin slots are 2 apart and that the kill
  classes {0, −2} mod p are themselves 2 apart, give at most one kill per
  interval of length below p − 2. Bootstrapped: if M(T_x, Y) ≤ (p−2)/4 then
  M(T_p, Y) ≤ maxsum₂(T_x, Y). One index per fold, against A5's proven
  L ≈ 0.18x. The condition turns on at x = 1453 and holds forever after, with
  zero violations over 820 folds. research/LOCALIZED-GAP.md.
- **The index budget moves from failing by a log to clearing by x/ln x.** Full
  tile: 0.43·x²·ln x against a window of x². Localized: 2.4·x·ln x. That is
  Chris's x/(2 ln x) localization payoff carried by a mechanism instead of a
  measurement.
- **And it still dies in the same place.** The chain reduces to maxsum_m ≤
  C·m·m̄ for m up to x/ln²x, which read as an interval statement sits at
  sifting parameter u = 1, below β₁ = 2 and far below β₂ = 4.2665.
- **The compute cap was self-imposed.** Localized objects need a segmented
  sieve of [0, x^k), never the tile of width x#. 820 folds to x = 6323 in 27
  seconds, against the nine-point ladders the rest of the repo uses.
- **PRIOR ART, and it is large.** Fred B. Holt with Helgi Rudd, about fifteen
  manuscripts from 2007 to 2026: the cycle of gaps G(p#), the three-step
  fold recursion, fusions, the CRT closure theorem, N₂ = ∏(q−2), the transfer
  matrix with binomial eigenstructure, and the "interval of survival"
  [p_k², p_{k+1}²] which is our zone. A9's transfer operator is demoted to a
  rediscovery of his 2014 dynamic system. The merge mechanism is his Lemma
  3.1. What survives as ours is the two-class form and the application to a
  maximum gap, which is on his own list of open problems. His Legendre result
  rests on an explicit unproven uniformity conjecture, which is the exact
  failure mode ZONE-POSTULATE §7 named in advance. research/PRIOR-ART.md.
- Found by searching before publishing, having worked in a vacuum. Several of
  these results were not in print until the late 2010s, and two not until 2026.

## Day 6 — 2026-08-18: the object turns out to have been published

Planned as a five-attack wave on the 4.2665 exponent, and overtaken by
mid-morning, when the central object turned out to have been in OEIS since 2008.

- **G₂ was published in 2008, as a shifted sequence.** A144311, Andrew
  Carter: their m is our r+1, so their a(n) is our G₂ − 1 — same covering
  optimum, same fixed classes {0, −2}, no free translate. The same object,
  not an analogue. Twenty-two terms to our fourteen, all fourteen agreeing,
  so the exact ladder runs to **x = 79**, and G₂(41#) and G₂(43#) were
  recomputations. The OEIS submission retired under a do-not-submit banner,
  and Day 1's "G₂ (not in OEIS)" retired with it.
- **Why five calibrated waves missed it, which is the part that transfers.**
  Every search was run on `G₂` and never on `G₂ − 1`, and those negatives
  are genuinely clean: a calibrated search of the wrong convention is a
  clean negative every time. A144311 cites A048670, which we cite, but
  one-directionally, and every walk we ran followed references forward.
- **What survives is confirmation with disjoint failure modes.** Their
  branch-and-bound over the residue choice is our own CRT covering identity
  as an algorithm; ours is a full-period enumeration, and neither can
  produce the other's terms. G₂(43#) = 618 landed the same day and retired
  its own check, the maximum not being unique, and the greedy oracle took
  its first miss at 13 of 14, later shown to be budget and not structure.
- **Then the new vocabulary paid, and reversed the direction of the day.**
  Searched in the convention that owns the object, no published upper bound
  on G₂ exists at any exponent and β₂ is unimproved since DHR 2008, so our
  constant is the best available rather than a default. The unwelcome half:
  a 2011 MathOverflow answer already derives j(x#) ≪ x^{4.032} at dimension
  **one**, our exact shape, so the technique is not ours and only the
  dimension-2 instantiation is. Its author is Brady, whose thesis names our
  system on page 1 and proves no bound, and whose Problem 3 — read that
  morning as our covering problem proved NP-complete — was retired by the
  afternoon, his twin instance shifting the value where ours shifts the
  argument.
- **Attack 1 landed a theorem: the mean-square Lemma V is PROVED**,
  ⟨R²⟩_H ≤ B(z,s)·H for every H, z and s, from five identities and two
  triangle inequalities; attacks A and B made it unconditional and useful
  with B = O((log z)⁸), and found the estimate published as Opera de Cribro
  Lemma 6.18. The honest negative rode with it, an almost-all exponent of 0,
  and its by-product `u_sup` read below β₂ on four points, entered four
  documents, and died the same day on nine. What moved was the **status** of
  Lemma V, not the gap.
- **Attacks 2 to 5, and the exponent stayed where it was.** Brüdern–Fouvry
  priced against the source PDFs: θ_total reaches 1 against a break-even of
  1.2090, and the factor everyone expected to be the obstruction is
  unimodular, so Parseval kills it free and the price is the quantifier.
  Strata are provably self-similar, but the dilation preserves congruence
  and not order, so exact pricing is an infinite regress. The loss budget
  inverted §1's ordering: DP1, the master discard, is the master cost, and
  the covering economy closed on the Mertens wall, met independently for the
  sixth time. Two ceilings were withdrawn the day they were written — Blight
  never writes 4, so the band (4, 4.2665] is not a thing, and fractional
  retention, open because it carries no regress, has an empty window at
  every κ ≥ 2 and a surviving half worth 0.017% of the gap.
- **The certificate route retired, and the theta ladder with it.** The sharp
  Gaussian maximal law for the sawtooth is not a generous hypothesis but an
  approximately exact description, and in that form it **is** the Gap
  Reformulation, so it implies TPC and no weak form is both soft-provable
  and sufficient. The crossing its own reading had called the headline of
  the run does not occur: `theta-ladder-sup.js` took z from its caller and u
  from a hard-coded 3.2, so every supremum was measured 39× to 62× too wide.
- **The worst custody failure the corpus has recorded, and the instrument it
  produced.** `attack-lower-bound.js` carried an OUTPUT block and eight
  numbered readings written **before the file had ever been executed**: ten
  figures wrong, two sign-reversed, one range out by eleven orders. The code
  was never wrong, only the prose was invented. On Chris's instruction that
  day, "not trust AI to copy correctly data over, but have a formal embed",
  `qc/embed.js` now runs the script and writes the block itself, hashed over
  code and over output, under an eleventh check. Of 89 scripts reachable on
  the first pass, 28 reproduced every figure.
- **The literature was read at the source rather than through it.** Seven
  PDFs: nothing was fabricated, and every defect was numbering, elision or
  gloss. Two absence rows fell to Kalmynin–Konyagin, the Diamond–Halberstam
  book had been in this repository as page photographs the whole time the
  note called it unreachable, and the Kourbatov retraction is recorded
  because the failure was procedural: an unreproducible in-house
  re-measurement asserted over a published result the repo already cited
  twice. The guard is stronger after it. The measured growth law
  G₂ ≈ 1.2·x ln²x did not survive the 22-term ladder either, giving way to
  the lnln x form. And this chronicle was corrected in the same sweep, "W/2
  the loudest rotation" being false at @13.

Refutations this day: the ladder's OEIS novelty, the greedy oracle's clean
sweep, the 1.2·x ln²x growth law, the theta-ladder crossing, the certificate
route, the sifting-limit floor at 4, fractional retention, exact strata
pricing, `u_sup`, Brady's Problem 3 as our problem, and the belief that a
pasted OUTPUT block is a record of a run.

## Days 7 and 8 — 2026-08-19/20: the registries, and the night the programme learned to bet in advance

The work changed shape rather than direction. The second night ran an
eleven-agent wave plus its adversary, with four more overnight launches
behind it. Twenty attacks over two nights had
left the 4.2665 exponent exactly where it was, and the response was to stop
attacking by inspiration and start keeping books.

- **Four registries opened, and they are now the map.** `research/REFUTED.md`
  (forty closed routes, one line each: name, verdict, mechanism in one clause,
  record pointer — fifty by the following evening); `paper/proposals/PROPOSALS.md`
  (the publication queue under the moratorium, seven proposals, each with a grade
  and triggers written in advance that say what would move it in either
  direction); `research/IMPORT-MAP.md` (thirteen graded candidate imports, each
  with a structural-fit gate, a circularity pre-check and a payoff type); and
  `research/SEARCH-CONVENTIONS.md`, extended row by row all week. TODO.md got its
  forward-only charter back when the closed-routes block migrated out.
- **The five foreign imports landed, and none moved the exponent.** Chaining,
  Suen, thinning, max-plus and B-free. All five banked something anyway — a
  proven identity, a derived constant, a published anchor, a wall address — and
  that hit rate is the reason the map exists.
- **Four hypotheses were unmasked in one wave as the Zone Postulate in other
  clothes**: the `L = 1` residue count, `H″` at `m = 1` and at `m = 2`, and any
  constant bound on `δ`. The circularity pre-check on every import row is the
  scar from that day.
- **The concentration family closed as a family.** McDiarmid, Azuma, Talagrand,
  Warnke, Kutin and Kim–Vu all die on the same mechanism: one shared uniform
  residue draw that the non-neighbourhood indicators reconstruct. Talagrand alone
  evades that and dies on the Lipschitz constant instead. And the prior art was
  waiting — Banks, Ford and Tao had run the concentration programme on this exact
  ensemble in 2019, five checkpoints and Azuma on a normalised martingale, with
  their own "most delicate part" sitting at the coordinate that defeats us.
- **The blind-test programme began, and it bit.** Pre-registrations were
  committed alone, before any producer existed, with anchor, ceiling, predictions
  and every consequence fixed in advance. The scoreboard is mixed on purpose: the
  extinction law's fifth window HIT at `W = 2·10¹¹` (631 inside the sealed
  [571, 877]); the joint deficit's closed form HIT at @29 and survived @31 while
  two rivals died at 6.35σ and 20.81σ; and the linear-in-`ln D` exponent rule,
  validated one level out at T₂₉, was **killed twice blind** — T₃₁ at 4.96
  band-s.e., T₃₇ at 3.63 s.e., two engines and one verdict. Its derived-constant
  claim was withdrawn the same day. A law that is only ever fitted is never in
  danger; these were.
- **What the seals also bought was honesty about the survivors.** The extinction
  law's own record now carries a ~20% count overprediction at five of five
  windows and a per-fold dispersion far wider than Poisson. The 3.8 constant's
  closed form is the last law standing and is measurably not exact, off by
  −0.41% to −0.48% at the only precision that can see it.
- **The census had a bug, and it had been invisible for the right reason.**
  `a3-03-f-from-census.js` held each prime's avoided set in one 32-bit word, and
  JavaScript's shift takes its count modulo 32, so residues aliased for every
  prime above 32. T_x carries such a prime exactly when `x ≥ 37`, and the
  prediction was written before the table was read and proved exact: published
  points off by 0.62× to 1.05× from `x = 37` up. Nothing had caught it because
  every verification had lived at `x ≤ 31`. The standing lesson entered the
  method: **verify at a level where the feared mechanism can fire.**
- **The adversarial pass, which is now house practice.** Every same-day headline
  was held for one hostile read before it was allowed into a live document.
  Nothing broke, three verdicts were corrected in the sentence, and one closed
  form was found in the doing. The Kalmynin–Konyagin lower bound — the strongest
  thing the project has produced — was deliberately held out of every corpus
  document overnight until its adversary reported.
- **One alarm was stale when it was raised.** The FKMPT corrigendum "live risk"
  had already been read a day earlier, and a verification pass found nothing
  load-bearing affected. An alarm about missing prior art now checks the disk
  before it is raised.

Refutations this wave: the localized chain's every repair, the LLL family, the
concentration family, generic chaining, the ℓ¹→ℓ² conversion, the covering
economy, thinning as a route, the greedy oracle past `x ≈ 53`, the one-parameter
extinction density law, the linear-in-`ln D` exponent rule, and Ford and
Halberstam's dual decomposition — which said in print it should win, and carried
out, loses.

---

**Judgment call for the orchestrator.** The brief named an **eleven-agent wave**.
The corpus records a nine-agent parallel wave on 2026-08-18 and a six-agent wave
on 2026-08-17, and no agent count for 2026-08-19/20 appears anywhere in
`CHANGELOG.md`, `TODO.md` or the staging records. The draft therefore says "two
nights" and "the wave" and names no number. If the count is known from the
session rather than from the disk, it belongs in the chapter and needs an
orchestrator to supply it; this audit will not write a number it cannot source.

---

## The refutation ledger (kept with pride)

Our own claims killed by our own deeper work: the attack-10 divergence
(capped at e^{2γ}, then falls); the sub-Poisson "≈0.2 constant" (a scaling
law with open limit); the d↦G_d v₂ pattern (level-19 coincidence); the
seam-window enrichment prediction (point phenomenon only); the 11-anomaly
seam-collision hypothesis (small-number luck); the grain equalities at
T₇/T₁₁ (break at T₁₃); attack-04's Fourier "certificate" (wrong CRT index
— missing the (P/p)⁻¹ twist; corrected in natal-cap-02); the mirror
strike-invariance claim (needs q | W — natal-cap-09); the universal packing
cap at the scour's head (embedding runs the other way — natal-cap-04); the
"parity floor 4" briefing error (it is 2 — natal-cap-10); the naive
kill-shadow narrative (absorbed into the
Unification Law); the efficiency collapse of certificates (an artifact of
reading only the crossing point K* — natal-cap-24); the pair-correction
hypothesis for deep-K certificate deviation (the correlation is all-orders
Buchstab — natal-cap-28); calm implies survivor concentration (corr ≈ 0; the
survivor fluctuation lives in a channel the calm statistic cannot see —
natal-cap-31); the fixed window-excess multiplier (it drifts, and the drift
is now derived — natal-cap-25). Each refutation produced better mathematics
than the claim it replaced.
