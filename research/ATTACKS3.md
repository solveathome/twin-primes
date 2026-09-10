# Attacks 3: the u-frame wave

<!-- ledger
id: Q-attacks3-uframe
status: ANSWERED
todo: none
question: What did the ten-attack u-frame wave (A1-A10) settle about the fold structure and the Zone Postulate?
verdict: The R/I split held: every residue attack returned an exact object and no interval attack moved; the additive chain G2(new) <= G2(old) + L*mbar it was framed around is itself REFUTED (U-FRAME 5a step 4), A5's Theorem B is structurally capped, and A10's exactness route is a dead end (rate 0.927 over 329 cells, excess 6..120 not shrinking).
-->

*(Formulated 2026-08-16, all ten executed the same day. Ten attacks on the
Zone Postulate through the fold structure, organised around Chris's
misalignment principle. Each names the question, the concrete first move, what
a win would have bought, and where it landed. House rules apply: compute
before deriving, custody before extending, calibration on every claim. Full
results in `research/U-FRAME.md` §5a and §§10-12, and in the `a3-*.js`
artifacts.)*

## The organising principle

**Misalignment (PROVEN, and the spine of this wave).** Fold T_x by p. Since
gcd(W, p) = 1, as k runs over the p copies the shift kW mod p runs over every
residue exactly once. So p does not choose its alignment with the tile: it
receives all p alignments, one per copy. Writing w = W mod p and r_i = s_i mod
p, copy k deletes exactly the slots with r_i ≡ −kw or −kw−2 (mod p).

Every new-prime alignment occurs, but this does not prevent adverse alignments
at different primes from combining: CRT realizes every choice of translated
pairs with separation 2 at some phase. `G₂−1` is the maximum covered interval
for exactly those choices (`two-class-lower-bounds.md` §1). A288815 also varies
the common even offset; that extra freedom explains the comparison of the
objects, without a theorem of damping across folds.

The original wave's stronger misalignment premise is withdrawn. Its finite
record-relocation measurements remain valid at their stated levels.

**Where the difficulty actually is (see U-FRAME §9).** Bounding L means
controlling the tail of the gap distribution at scale ~2p, which is an interval
statement, hence the hard kind. The wave was framed around the additive chain
G₂(new) ≤ G₂(old) + L·m̄, which closes iff L is polylog; that chain is itself
REFUTED (U-FRAME §5a step 4) and what survives is step 3's maxsum_{L+1}, so read
the R/I split below as a statement about the attacks rather than about a live
route. Attacks are marked R (residue, expected tractable) or I (interval,
expected hard) so nobody mistakes one for the other.

**How the wave landed.** The R/I split held: every R attack returned an exact
object and no I attack moved. But bounding L is not the target any more. A5's
Theorem B is the first unconditional bound on L and it is structurally capped
at the LINEAR branch, so the whole (L+1)·G₂ chain is closed as a route rather
than open pending a better L bound. A9's transfer operator turned out to be
Holt and Rudd's, not ours. A7's pane came out strictly harder than TPC. What
the wave produced is a set of exact lemmas about the fold, not a road.

---

## A1. The misalignment ledger: does the record gap relocate? [R]

Q: how often do maximum-gap records relocate across the measured folds?
The original proposed inference from CRT to non-compounding was invalid; this
experiment can describe ancestry at finite levels but cannot establish that
all long adverse configurations are impossible. The producer records the
position, copy index and old-gap ancestry of each new maximum.

**Landed (MEASURED, `a3-01-misalignment-ledger.js`).** Neither hypothesis. The
record is never attained at a unique place (2, 4, 12, 20, 20, 4, 2, 4 sites
per fold, half of that forced by the mirror s ↦ W−2−s, which is PROVEN in one
line). At folds 13, 23, 29 and 31 the new record descends from the old record
at ZERO sites: the three deepest folds are total relocations. But at 4 of 8
folds the old record's lineage does keep rank 1, so relocation is not
every-fold either. A hazard model is a possible finite-data interpretation, not a proven
probability law or an asymptotic bound on record persistence. Freezing the T₇ record and following its
best descendant greedily forever gives 1.000, 0.909, 0.778, 0.880, 0.735,
0.651, **0.569** of the record and rank >256 for the last three folds. These data do not bound persistence or worst-case damage at unmeasured folds.

## A2. Extend the diagonal f [R]

Q: f, the fraction of gaps ≡ 0, ±2 (mod p), is 0.0444, 0.0485, 0.0488, 0.0311,
0.0307 along the diagonal. Constant f gives L linear and the route fails;
decaying f gives L polylog and it closes.
First move: stream T₂₉ (215M slots, from T₂₃) and T₃₁ (6.2e9, ~15 min) and
measure f at folds 31 and 37. Report ln(1/f) against 2p/m̄, testing the
prediction that they track.
Win: the cheapest discriminator between the two branches.

**Landed (MEASURED).** T₂₉ and T₃₁ were streamed and f measured at folds 31
and 37. f decays, but not smoothly: the diagonal is a staircase whose treads
are exactly the twin pairs (A8's extension, U-FRAME §12), which is why f
stepped back up where a smooth decay was expected. The branch discrimination
this was meant to settle was overtaken by A5, which closed the L route from
the other side.

## A3. f from the grain census law, without enumeration [R]

Q: `research/grain-census.js` holds an exact CRT inclusion-exclusion identity
for the gap-size distribution, count(d), with its fold covariance. If f can be
computed from that law, we get f at ANY x with no tile in memory, which settles
A2 asymptotically rather than by two more points.
First move: read grain-census.js, express f(x, p) = Σ over qualifying d of
count(d)/D, and check it against the measured diagonal values.
Win: f as a closed form, hence L's growth decided analytically rather than
extrapolated.

**Landed: two lemmas PROVEN, the cheap route structurally CLOSED (U-FRAME
§§10, 12).** *Lemma A:* grain gaps are multiples of 6, so the smallest
qualifying gap is exactly 2p − 2 when p ≡ 1 (mod 3) and 2p + 2 when
p ≡ 2 (mod 3), checked against brute force at all 302 primes from 5 to 1999. *Lemma B:* a
prime q rescales the strata for d only if 2q − 2 > d, and on the diagonal
d = 2p ∓ 2, so the number of safe primes inside the tile is **zero** for every
diagonal fold p ≤ 200. The same lemma that places d_min at 2p ∓ 2 is what
makes the cheap fold-covariance half unavailable. The expensive CENSUS half costs
exp(0.048p) and reaches x ≈ 200 and no further. **That is the census's wall, not
f's**: the deep-window instrument settles f out to x = 829, four times deeper
(`history/staging/fdecay-deep.md`). And the 42 published census points are
DEFECTIVE from x = 37 — the producer's evaluator aliases residues above 32 —
so the corrected law is the 51-level window fit
`ln(1/f) = 1.917 + 1.4016·(2p/m̄) − 1.021·ln s(d_min)`, R² 0.9867
(`research/f-decays.md` header). A closed form is still not available by this
method, at either depth.

## A4. The fold recursion for maxsum_m [R]

Q: the bound uses maxsum_m, the largest sum of m consecutive gaps. G₂ = maxsum₁
has a fold recursion; does maxsum_m have one too? If the family is closed under
folding we get a system rather than a single inequality.
First move: measure maxsum_m for m = 1..8 at T₁₁ through T₂₃, look for
maxsum_m(new) in terms of {maxsum_j(old)}, and test the natural guess
maxsum_m(new) ≤ maxsum_{m+L}(old).
Win: a closed recursion replaces the open dependence on L.

**Landed: win condition NOT met (U-FRAME §5a steps 2, 3 and 3a).** maxsum_m
does fold, and the family is the right one, but the L dependence cannot be
removed — it moves into κ(m) and stays. The naive (L+1)·G₂ recursion is closed as a route.

## A5. Bound L from run-consistency plus CRT independence [R]

Q: a run of L deleted slots needs L−1 consecutive gaps ≡ 0, ±2 (mod p) AND the
residues confined to one 2-set {a, a−2}. The second condition is much stronger
than the first and has not been exploited.
First move: derive the exact condition (the residue must alternate, so the
gaps must alternate ≡ +2, −2, or all ≡ 0). Count how many positions in the
grain can satisfy it, using CRT independence of the gap word from p. Compare
against the measured L = 1, 2, 2, 2, 3, 2, 4.
Win: any proven upper bound on L, at any rate, closes the hole in U-FRAME §5a.

**Landed: the bound exists, and it is the wrong branch (U-FRAME §10).**
*Alternation Lemma (PROVEN):* a run is a walk on two states, so the class word
is a two-state walk, not merely a word avoiding three residues.
*Run Cost, Theorem A (PROVEN, attained with equality at every fold with
L ≥ 2):* any two adjacent gaps of a run sum to at least 6p.
*Theorem B (PROVEN), the first unconditional bound on L:*
L ≤ 1 + max{m : maxsum_m(T_x) ≥ c_min(m)}, giving 2, 2, 2, 4, 4, 4, 5, 6
against the true 2, 1, 2, 2, 2, 3, 2, 4.
**But it is structurally capped.** maxsum_m ≥ G₂ always, so Theorem B can
never prove L below G₂/(3p) ≈ 0.18x, which is LINEAR, the failing branch; its
projection clears x² only to about x = 100. Theorem C carries the same ceiling
over to κ(m), so redirecting L to κ does not move the wall. The alternation
condition is worth exactly 3/2 and no more. What would be needed is a decay
hypothesis on runs of large gaps, and A5 names two sharp reasons it is hard:
it is a two-dimensional lower-bound sieve at sifting parameter 1+o(1) against
a limit of about 4.42, and **no polynomial moment of any fixed order can give
it** — decay needs exponential moments, that is quasi-independence.
**Bounding L is therefore no longer the target.**

## A6. The origin against the maximum [I]

Q: the Zone Postulate needs the FIRST gap from the origin, not the maximum
anywhere. Measured this morning: at x = 37 the anchored margin is 274 against
the worst-case 3.11, and by p = 10⁹ the anchored margin is 2.7e14. The origin
is a distinguished phase and nothing in the G₂ route uses that.
First move: track the first twin slot of T_x across folds and derive its own
fold recursion. Does it grow like the mean gap rather than like G₂?
Win: route B of ZONE-POSTULATE. A bound on the first slot beating the global
G₂ bound at the same level would be new, and the lens is uniquely placed for it.

**Landed: the origin's fold recursion is closed.** The origin has no general
advantage to recurse on. At window S = x'² the origin carries **21% LESS**
than mean density, with ceiling ρ(2) = e^{2γ}/4 = 0.79305; the Origin Excess
Lemma's advertised (ln x/ln y)² factor is capped by an absolute constant of
about 2.2, measured maximum 1.372; and the real window/F advantage is
G₂/F ≈ 7, since window/F is capped at x' and saturated. See
`research/origin-excess.md`.

## A7. The Pane Bound through overlap [I]

Q: the Pane Bound must bound OVERLAP, not capacity (capacity/slots = 2Σ1/q ≈ 3
and rising). Overlap is slots killed by two or more primes, which the copy
theorem should describe exactly.
First move: compute the exact multiplicity distribution of kills inside a pane
by CRT, compare against the measured true removals, and see how tight a
provable overlap bound can get against the corridor width 5*C2/ln^2 n =
3.301/ln^2 n.
Win: the corridor closed at any n would be a certified twin in a short interval
by counting alone.

**Landed: the pane is CLOSED, twice (THE-DIALS §§1-2).** Removing the
redundancy came out strictly harder, not easier: the pane (n², (n+2)²) sits at
u → 1 and needs u > 4.26645, against the zone's 2. "4.267 proven, 1 needed."
Do not reopen it as a corridor question.

## A8. Exact count of adjacent-kill pairs [R]

Q: adjacent kills need g ≡ 0, ±2 (mod p), and the qualifying gap values are the
rare large ones. The count should be exactly computable from the gap histogram.
First move: for each fold, predict the number of adjacent-kill pairs as
Σ over qualifying d of count(d), and check against direct enumeration.
Win: an exact handle on the merging, feeding A5.

**Landed: exact, PROVEN (U-FRAME §§10-12).** The pair count is exactly
computable from the gap histogram, and the Alternation Lemma came out of it.
The extension is the better result: **the f diagonal is a staircase whose
treads are exactly the twin pairs**, which explains the stalls A2 and A3 both
flagged without explaining. Nothing shows min(N_P, N_M) decays, so A5's hole
remains, but it is a narrower hole in a sharper object.

## A9. The gap-histogram fold rule [R]

Q: the grain's gap word evolves by a known rule (copy p times, merge the two
gaps flanking every kill). Derive the exact evolution of the gap-size
HISTOGRAM under folding.
First move: write the transfer operator on the histogram and verify it
reproduces the measured histograms at T₁₁ through T₂₃.
Win: the tail P(gap ≥ 2p) as a function of x, which is what A2 and A3 need and
what the whole L question reduces to.

**Landed: PRIOR ART, and it is the same object, not a near miss (U-FRAME §11
for the engine, §6a for the attribution).** Fred B.
Holt and Helgi Rudd, arXiv:1408.6002 §5 (2014), build the transfer matrix M_J
on the cycle of gaps, eigenstructure and binomial eigenvectors included. Their
fusions are our kills, their cycle of gaps G(p#) is our tile, their R1/R2/R3
recursion (Lemma 2.1) is our fold. **Nothing here may be presented as new
structure.** Ours is the exact head engine and the numbers it produces: the
operator reproduces every measured histogram size for size, satisfies the mass
identity Σcount = D(q−2), and iterated from the T₇ word alone with no sieve it
walks to T₂₃ and past enumeration to T₂₉ and T₃₁. What is not in Holt's corpus
is the spacing between consecutive g = 2 occurrences, which is our G₂: his
machinery is bounded by |s| < 2p throughout, exactly the regime a maximum gap
leaves. See `research/PRIOR-ART.md` §"Holt and Rudd".

## A10. When is the lower bound exact? [R]

Q: G₂(new) = maxsum₂(old) held at three of seven folds. If it becomes exact
from some level on, the recursion is determined and L stops mattering.
First move: measure the frequency of exactness deeper, and characterise the
folds where it fails (all three failures had L ≥ 2 available AND a qualifying
gap adjacent to the record).
Win: an exact recursion G₂(new) = G₂(old) + (neighbour) would settle the growth
law outright.

**Landed: NO, and the reason is arithmetic (U-FRAME §10).** Exactness holds at
3 of 9 folds (11, 13, 19) and at rate 0.927 over a grid of 329 (tile, prime)
cells. Binned by 2p/m̄ the exactness rate is clean and monotone — 0.44, 0.39,
0.81, 0.91, 0.96, 1.000 — but the fold ladder is pinned near 2p/m̄ ≈ 2, the
worst band, moving only 1.40 to 2.30 across folds 7 to 37, and on a Mertens
fit it reaches the safe band 2p/m̄ ≥ 4 only near x ≈ 130, a tile of width
10⁵⁷. The excess over the lower bound runs 6, 0, 0, 12, 0, 18, 24, 18, 120: it
does not shrink, and the deepest reachable fold is by far the worst. A closed
form for one half is PROVEN: a miss whose record carries a qualifying gap
happens iff p divides one of G₂(old), G₂(old)−2, G₂(old)+2, predicted tile by
tile with no errors. It catches 6 of 24 misses. **Exactness of the lower bound
is a dead end.**
