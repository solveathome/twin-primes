# The Equidistribution Import Survey: BV, EH, and GRH against the program's open legs

<!-- ledger
id: Q-bv-import-survey
status: ANSWERED
todo: none
question: Which unproven legs of the tile programme become theorems if Bombieri-Vinogradov, Elliott-Halberstam or GRH is imported?
verdict: Two legs become provable now, the fixed-modulus tail refinements S1/S2 by Siegel-Walfisz and the full-wheel prime-comb equidistribution in the tail regime by BV; the Buchstab transfer at bounded u and Assumption A for d = 2 are parity-blocked at every one of the four inputs.
-->

*(Research note, 2026-08-14. Under the house publication moratorium: not for
circulation. Question: which unproven legs of the tile program become theorems
if we import Bombieri–Vinogradov (BV, a theorem), Elliott–Halberstam (EH,
conjectural), or GRH? The historical template is Chen and Zhang/Maynard:
bounded-gaps and almost-prime results were reached by feeding BV-strength
equidistribution into a sieve. This file audits our legs against those inputs.
Citation tags follow covering-dive.md: [PROVEN], [CONJ], [ABSENT], [INFERRED];
unverified bibliographic details are flagged in §7.)*

## 1. The four inputs, stated

**Siegel–Walfisz (SW).** For any fixed A, π(T; k, a) = Li(T)/φ(k) +
O_A(T exp(−c_A √log T)) uniformly for k ≤ (log T)^A (Walfisz 1936; Davenport,
Multiplicative Number Theory, 3rd ed., §22). Unconditional; the constant is
ineffective (Siegel's theorem). For our purposes the effective substitute at
small fixed modulus matters more: Bennett, Martin, O'Bryant, and Rechnitzer,
Explicit bounds for primes in arithmetic progressions, Illinois J. Math. 62
(2018), 427–532, give explicit numerical bounds on π(T; k, a) for every
modulus 3 ≤ k ≤ 10⁵ and T ≥ 8·10⁹. Both our comb moduli 30 and 210 are in
range. [PROVEN]

**Bombieri–Vinogradov (BV).** For any A there is B with
Σ_{k ≤ x^{1/2}/log^B x} max_a |ψ(x; k, a) − x/φ(k)| ≪_A x/log^A x
(Bombieri, On the large sieve, Mathematika 12 (1965), 201–225; A. I.
Vinogradov, Izv. Akad. Nauk SSSR Ser. Mat. 29 (1965), 903–934). Equidistribution
level θ = 1/2, on average over moduli. A theorem: everything below marked
"BV-provable" is unconditionally provable today. [PROVEN]

**Elliott–Halberstam (EH).** The same with moduli up to x^{1−ε} (Elliott and
Halberstam, A conjecture in prime number theory, Symposia Mathematica IV
(INDAM, Rome, 1968/69), Academic Press, 1970, 59–72). Open; known false at
x/log^A x by Friedlander–Granville. [CONJ]

**GRH.** ψ(x; k, a) = x/φ(k) + O(x^{1/2} log² x) for every individual modulus
k (Davenport, op. cit., §20). Pointwise where BV is on-average, effective, but
the same level θ = 1/2.

The wall, first, per house rule. None of these inputs implies the
Hardy–Littlewood twin asymptotic, nor any positive lower bound for twins, nor
Assumption A. That is the parity obstruction, and it survives EH and GRH: the
sharpest published consequences are gaps ≤ 12 under EH (Maynard, Small gaps
between primes, Ann. of Math. (2) 181 (2015), 383–413) and ≤ 6 under
generalized EH (Polymath, Variants of the Selberg sieve, and bounded intervals
containing many primes, Res. Math. Sci. 1 (2014), Art. 12), with the authors
stating that going below requires passing the parity problem. What the inputs
do buy, leg by leg, is the content of this survey, and two legs turn out to be
provable now.

## 2. Leg 1: the drift program (β and Assumption A)

**The negative statement, plainly.** Assumption A's sharp form is the HL
asymptotic on the comb (anchored-note.md §8), and its weak form is a
positive-proportion twin lower bound in [0, W]. Neither follows from BV, EH,
GEH, or GRH. This is not folklore pessimism: Maynard (op. cit.) and Polymath8b
extract the extreme known consequences of EH-type inputs by optimized sieves,
and the output is a disjunction over differences (some even d ≤ 12, resp.
d ∈ {2, 4, 6}), never the single difference d = 2. The parity examples of
Selberg (Halberstam and Richert, Sieve Methods, Academic Press, 1974, p. 239;
Tao's 2007 account) show level-1 remainder information, which is what BV/EH/GRH
supply, cannot separate the twin count from its parity twin. Verdict for
Assumption A, both forms: none suffice.

**The averaged theorem that does exist: Lavrik.** The HL asymptotic for prime
pairs holds for almost all even differences: for every A,
π₂(x; 2k) = S(2k) Li₂(x) + O(x log^{−A} x) for all but O(x log^{−A} x) of the
differences 2k ≤ x (Lavrik, Dokl. Akad. Nauk SSSR 132 (1960), 1013–1015;
Soviet Math. Dokl. 1 (1960), 700–702; circle method, after Tchudakoff).
Refinements: Wolke, Über das Primzahl-Zwillingsproblem, Math. Ann. 283 (1989),
529–538; Mikawa, On prime twins, Tsukuba J. Math. 15 (1991), 19–29 (averaging
over short ranges of the difference); Balog, The prime k-tuplets conjecture on
average, in Analytic Number Theory (Allerton Park 1989), Progr. Math. 85,
Birkhäuser, 1990, 47–75 (all tuplets). These are unconditional; BV-strength
inputs enter their proofs as the major-arc technology. [PROVEN]

**Tile translation.** The comb family indexed by difference d is the family of
two-class systems {0, −d} mod each wheel prime; our Natal@5 comb is the d = 2
member. Define β_d(x) as the anchored bias of the d-comb. Lavrik's theorem is
then: *the analog of Assumption A's sharp form is true for almost all members
of the comb family*, in the strong form β_d(x) → (HL limit for d), with a
power-of-log exceptional set. This is a real import and we state it as such.
It does not touch d = 2, but it certifies that Assumption A asserts nothing
generically false: the assertion fails, if it fails, only on a vanishing
exceptional set of combs that conspiracy would have to single out. [INFERRED
from Lavrik; the translation is bookkeeping between π₂(W; 2) and S(x)/E(x),
Mertens normalization as in anchored-note.md §8.]

**Rotation averaging is not difference averaging, and we already own it.** The
task brief asked whether a rotation-averaged Lavrik analog ("for almost all
rotations t, the rotated tile carries the HL count") is provable by
circle-method/BV tools. The answer is that it is already a theorem in this
repository, by exact computation rather than analytic input: the rotated tile
at phase t counts shifted two-class rough pairs, and the exact mean and
variance (natal5-variance.js; anchored-note.md §2) give, by Chebyshev, that at
most a Var/(ε²E²) fraction of rotations miss the ensemble mean by more than εE.
At @19 that fraction is at most 8.38·10⁻⁶. **Which ensemble those moments belong
to is load-bearing.** The moments are the deep one's, period ∏_{p≤y}p, which natal5-variance.js averages over by its
own header, and only that ensemble is a product measure over the scour primes.
The W-member phase set of anchored-note.md §1, distinct for every t ∈ [0, W) by
CRT, is a diagonal inside that product and is not the product measure: measured
by full enumeration its variance exceeds the deep ensemble's by 1.36× at @11 and
6.87× at @13, and the anchored z changes sign at @13 (−0.155 on the diagonal
against +0.285 on the product measure) [SCRATCHPAD-GRADE,
`research/history/staging/import-boolean-analysis.md` §0 item 5 and §7; no embedded
producer, and that note asks for a second reader before its reading is relied
on]. So the almost-all statement below is the deep ensemble's, and the fraction
must be paired with that ensemble's cardinality, not with W.

That is still the almost-all HL analog over rotations, per level, with exact constants: the classical toolbox cannot
improve it, because the classical objects (primes) do not even appear in the
rotated members; only the anchored member crystallizes into primes. The two
averages are orthogonal: Lavrik averages over the comb's difference parameter,
our ensemble averages over phase. A phase-averaged statement about actual twin
primes ("almost all windows of length H contain a twin") would imply TPC
outright and is open at every strength; no equidistribution input reaches it.

**What the classical toolbox adds to the ensemble layer: nothing.** Higher
moments: our J₅-product machinery computes them exactly (third moment in
natal-cap-20). All-x simultaneity: no classical input provides it, and
Proposition 1 of anchored-note.md shows measure bounds cannot decide the
anchored member anyway. The one classical comparison worth recording: the
exact two-class Barban–Davenport–Halberstam identity of natal-cap-05 is the
tile analog of a theorem that classically requires the large sieve (Davenport
and Halberstam, Michigan Math. J. 13 (1966), 485–489); in the tile it is an
identity. Equidistribution inputs are for actual primes in unbounded ranges;
inside one periodic tile, CRT enumeration is strictly stronger.

**One counterpoint from the same literature.** Heath-Brown proved that if
Siegel zeros exist (infinitely often, in a quantified sense), then there are
infinitely many twin primes (Prime twins and Siegel zeros, Proc. London Math.
Soc. (3) 47 (1983), 193–224; quantified by Tao and Teräväinen,
arXiv:2112.11412). So a catastrophic *failure* of equidistribution would also
settle our question, in our favor. Either the L-functions behave and parity
stands, or they misbehave and twins fall out: the program's Assumption A is
pinched from both sides by the same theory it cannot use. [PROVEN]

## 3. Leg 2: the staircase and certificate legs

cap-28's READINGS name the certificate engine's two unproven ingredients:
prime equidistribution over the comb, and the Buchstab transfer to the
conditioned ensemble. We audit them separately; the first splits into three
regimes with different verdicts, and the shallowest regime is provable now.

### 3.1 Provable now by Siegel–Walfisz: the fixed-modulus tail refinements

The Staircase tail theorem (staircase-note.md §6) caps the scour tail
q > W^{1/3} at (2 ln 2 + o(1)) W/ln W by pure prime counting. The refined cap₂
folds in the victim's residue conditions, and the mod-30 and mod-210 slices of
those conditions are conditions at a *fixed* modulus on a prime count in
[q, (W±1)/q]: exactly SW territory, with the range W/q enormous against the
modulus 30. Precisely:

**Statement S1 (mod-30 tail theorem; unconditionally provable).** Let q be a
prime-regime scour prime and let the strikes be counted on the Natal@5 comb,
r ∈ N_x. Every non-self fresh victim satisfies v = qm with m prime and
v ≡ 11 or 17 (mod 30) (A-side) or v ≡ 13 or 19 (mod 30) (B-side); hence m lies
in 2 of the 8 unit classes mod 30 on each side, and, with A = ⌊(W−1)/q⌋ and
B = ⌊(W+1)/q⌋,

  fresh(q) ≤ s(q) + Σ_{a ∈ {11,17}} [ π(A; 30, q⁻¹a) − π(q−1; 30, q⁻¹a) ]
                  + Σ_{a ∈ {13,19}} [ π(B; 30, q⁻¹a) − π(q−1; 30, q⁻¹a) ].

The hypothesis r ∈ N_x is load-bearing: those class lists are the Natal@5
comb's, which excludes House 29 by construction. Over the full mod-30 twin
census the lists are {11, 17, 29} and {13, 19, 1}, three classes of eight per
side, the tail factor is 8/3 rather than 4, and the constant in the display
below would read (3/4)·ln 2 in place of (ln 2)/2
(history/staging/thm-mod30-tail.md D3). The subtracted π(q−1; 30, ·)
terms are load-bearing too: without them the display still caps fresh(q), but it
is not below cap₁, so it is not a refinement of the Staircase cap at the top of
the tail. Measured, the form with them dropped exceeds cap₁ at 1 of 9, 5 of 29,
16 of 105 and 60 of 396 tail primes at @11/@13/@17/@19, and the sharp form is
≤ cap₁ at all 539 (thm-mod30-tail.md D2). The asymptotic is unaffected either
way, the subtracted mass being O(W/ln²W).

By PNT in progressions mod 30 each count is (1/4 + o(1)) π(W/q), so the tail
sum drops by an exact factor 4:

  Σ_{q³ > W+1} cap ≤ ((ln 2)/2 + o(1)) · W/ln W.

The proof is the Staircase Theorem's injection (already proven) plus SW at
modulus 30; the finite-x form is explicit via Bennett–Martin–O'Bryant–
Rechnitzer for W/q ≥ 8·10⁹. This matches the measured cap₂ gain: the measured
fresh/cap₁ ratio's factor (a) (the 1/4 of staircase-note.md §8) is exactly
what S1 proves. [INFERRED from proven parts + SW; a short-note-grade theorem.]

**Statement S2 (fixed truncation and fixed depth).** Fold in the wheel
conditions for 7 ≤ p ≤ P₀ (P₀ fixed) and the freshness conditions for the
first K scour primes (K fixed). The relevant modulus is
M = 30·∏_{7≤p≤P₀} p·∏_{i≤K} q_i. The freshness primes are of size
≈ x ~ ln W ≤ log(W/q)·2, so M = O((log(W/q))^{K+O(1)}): inside the SW range
for every fixed (P₀, K). Hence the prime-regime cap_K closed form (the "prod"
column of natal-cap-28, tail regime) is an unconditional asymptotic theorem at
every fixed truncation and depth, with the density factor
(1/4)·∏_{7≤p≤P₀}(1 − 1/(p−1))·∏_{i≤K}(1 − 1/(q_i − 1)) exactly as the engine
uses. One class is excluded per freshness prime, not two: the companion
condition v ≢ 0 (mod q_i) is void wherever P⁻(m) ≥ q > q_i, which
staircase-note.md §7 imposes on #A_K at every scour prime, so the one-class
factor holds in the head and the middle as well as in the tail. Measured against
8 exact depth-K counts at @17 and @19 the one-class factor is within 0.40% and
the two-class factor is 5.00% to 32.37% out
(history/staging/thm-mod30-tail.md §5(i) and §6, re-measured independently in
history/staging/redteam-0828-engine.md §1.2).
[INFERRED from SW; each instance is routine.]

What S1 and S2 do for the ledger: the elementary tail constant 2 ln 2 drops to
(ln 2)/2 at modulus 30, to (5/12) ln 2 at 210, and to
(ln 2 / 2)·∏_{7≤p≤P₀}(1 − 1/(p−1)) at any fixed P₀; the crossover level where
the proven tail cap sinks below N moves down accordingly from the x = 149 of
the elementary theorem (the measured cap₂ tail is 0.44–0.49·N already at
x = 11–19, and S1+S2 make a proven fraction of that refinement). They do not
touch the head, where the twin question lives.

### 3.2 Provable by BV: the full-wheel prime-comb equidistribution, tail regime

cap-28's reading 4 phrases the missing ingredient as "prime equidistribution
over the W-modulus comb" and correctly notes Brun–Titchmarsh is vacuous at
modulus W. But the comb is not one progression at an enormous modulus: it is a
sifted set whose sifting primes are tiny. The count behind the prime-regime
cap₂ is: primes m ≤ T = W/q, in 2 fixed classes mod 30, avoiding one class mod
each wheel prime 7 ≤ p ≤ x, avoiding two classes mod each of the first K
freshness primes. The sifting primes are all of size ≤ q_K, and x ~ ln W ≈
ln T. Run the fundamental lemma of sieve theory (Halberstam–Richert, op. cit.,
Ch. 2; Friedlander and Iwaniec, Opera de Cribro, AMS Colloq. Publ. 57, 2010,
Ch. 6) on the sequence of primes in [q, T] with sieve level D = T^{1/3}: the
sifting variable is u = ln D / ln q_K → ∞ whenever q_K = T^{o(1)}, so the
lemma's error factor 1 + O(e^{−u}) is 1 + o(1), and the remainder is a plain
sum of AP errors over moduli 30d ≤ T^{1/3+o(1)}: exactly what BV bounds, in its
max_{y ≤ T} form. No divisor-weight machinery is needed, the fundamental
lemma's weights satisfying |λ_d| ≤ 1; Chen's absorption of divisor weights
belongs to the linear sieve at level T^{1/2}, not here
(history/staging/thm-capK-bv.md §7). Conclusion: the prime-regime cap_K
asymptotic with the FULL wheel product and any depth K with q_K = W^{o(1)}
(equivalently T^{o(1)} in the tail) is a BV theorem, hence unconditional. That
assembly is now written out as Theorem C of history/staging/thm-capK-bv.md §2,
at PROVEN short-note grade, and one of cap-28's two named unproven ingredients
closes in the regime that carries the tail.

**It closes it in the limit and nowhere a march can reach.** The fundamental
lemma's error factor is 1 + O(e^{9κ−s}·K_dim^{10}) with s = ln D / ln q_K, and
with K_dim = 1.2000 measured for this sieve the factor is below 1 only for
s ≥ 10.82, first cleared at level x = 263 (W ≈ 10^105.6); s first reaches the
lemma's floor 9κ+1 = 10 at x = 239, where the factor is still above 1. Every
certificate and every march that exists sits at s < 5. The theorem also buys no
effectivity, BV's implied constant being ineffective through Siegel–Walfisz at
the small moduli (thm-capK-bv.md §0, §4). What EH adds here: nothing qualitative
(the moduli in play are microscopic against T); what GRH adds: effective
constants and a pointwise statement, i.e. certificate-grade error terms without
the SW ineffectivity, though the fundamental-lemma factor is untouched by it.
[INFERRED: assembly of standard tools; each step classical.]

The regime that does NOT close this way is the deep ladder: at the depths the
positivity certificates actually need, q_K is a power of T (ln q_{K*}/ln T =
0.562 at @97, so Theorem C's hypothesis fails outright there). The dimension in
the range (x, q_K] is 1, not 2, wherever q_i < q: on a sequence already carrying
P⁻(m) ≥ q the condition v ≡ 0 (mod q_i) is void. It is 2 only where the
roughness is sifted rather than assumed, or where q_i > q, and there
v ≡ 0 (mod q_i) selects the single value m = q_i rather than a class. Whether
the deep-ladder object meant here is that same object is NOT AUDITED
(thm-capK-bv.md §7). Either way the asymptotics hit the sifting-limit wall
(next subsection); BV
still controls all remainders up to level T^{1/2−ε} and EH up to T^{1−ε}, so
upper and lower bounds with DHR constants are available, but not asymptotics.
The wall is not the remainder term. It is the sieve.

### 3.3 The Buchstab transfer: equidistribution is the wrong currency

cap-28's second unproven ingredient prices the deep-K deviation by the
Buchstab function: the victim's partner n ± 2 must stay y-rough as y = q_K
climbs, so the engine needs asymptotics for shifted rough PAIRS: counts of n
in a range with n and n + 2 both y-rough. Here the entire BV/EH/GRH axis is
inert, for a clean reason: these are integer counts, not prime counts. The
remainder of "integers ≡ a mod d in an interval" is O(1), unconditionally and
trivially: there is no equidistribution of primes to import because no primes
occur in the statement. That O(1) is a property of the formulation in which the
comb sits *inside* the sieve, as its ω(p) = 2 primes. Condition on the comb
instead, taking it as the ambient sequence and sifting only the freshness
primes, and the remainder becomes a comb's discrepancy in a progression, which
the repo's own Comb Discrepancy Lemma prices at 2·3^k per Legendre term with
k the number of mids; that accumulation is what makes the Certified-Head Theorem
head-only (history/staging/thm-buchstab-transfer-shallow.md §3.2, §3.3). The
obstruction sits entirely in the sieve dimension:

- For y = T^{o(1)} (shallow depth), the two-dimensional fundamental lemma
  gives the pair-Buchstab asymptotic with error 1 + O(e^{−u}), u → ∞:
  provable NOW, elementarily, given the second hypothesis q = T^{o(1)}, without
  which the ensemble is not in the fundamental-lemma regime at all. It covers
  the B-factor in the band where B does nothing: |B − 1| < 10⁻⁵ there and the
  uncorrected independence product is already accurate, so the validation
  payoff sits at the deep end instead
  (history/staging/thm-buchstab-transfer-shallow.md §4, §7).
- For y = T^{1/u} with u bounded (the deep ladder), the asymptotic is open.
  What exists is one-sided: upper bounds at every u (Selberg/Brun), lower
  bounds only for u > β₂ = 4.26645… (Diamond–Halberstam–Richert sifting
  limit; the value verified against the book and Booker–Browning in
  beta2-note.md and dhr-verification.md). At u = 2 the statement IS the twin
  conjecture with its HL constant. EH and GRH do not move β₂ by an epsilon:
  the parity examples live at exactly the remainder quality (level 1) that
  rough-pair counts already possess. Verdict: none suffice; the honest
  frontier is the open band 2 < u < 4.266 of two-dimensional sieve theory.

**Where our certificates sit in that band, measured.** From cap-28's engine at
@97 (measured-envelope, not theorem): bare positivity needs K* ≈ 7.4·10⁸
freshness moduli, so q_{K*} ≈ 1.7·10¹⁰ by the PNT, against ln T ≈ 79 for head
victims: u = ln T / ln q_{K*} ≈ 3.4. The 90%-certification depth K₀.₉ ≈
3.0·10¹³ gives u ≈ 2.3. Both depths land inside (2, 4.266): below the proven
sifting limit, above the twin point. The ladder's price, translated into the
classical coordinate, is that certifying survivors requires running a
two-dimensional sieve past its published positivity threshold but short of
parity; this locates our wall and Chen's wall as the same wall, with numbers
attached. [INFERRED arithmetic on engine outputs; flagged as extrapolation.]

## 4. Leg 3: a tile-native Chen

**Chen's theorem.** There are infinitely many primes p with p + 2 = P₂ (at
most two prime factors); moreover the count below X is ≫ C₂ X/ln²X (Chen, Sci.
Sinica 16 (1973), 157–176; simplified in Ross, J. London Math. Soc. (2) 10
(1975), 500–506; textbook account Halberstam–Richert Ch. 11). The inputs are
the linear sieve, BV for the remainders, and the switching principle. [PROVEN]

**The tile-native statement.** Call the following the *lenient Scour*: every
scour prime strikes its class {0} (the lower tooth) at full depth, but strikes
{−2} (the partner tooth) only for q ≤ W^{1/10}; survivors whose partner ends
with at most two prime factors, both exceeding W^{1/10}, are *lenient
survivors*. In this vocabulary Chen's theorem reads: the anchored bias of the
lenient comb is bounded below,

  β_Chen(x) = S_Chen(x)/E(x) ≥ c > 0 for all large x,

with S_Chen the anchored lenient-survivor count and E(x) our usual ensemble
mean (the normalizations differ by bounded factors that fold into c). That is:
**Assumption A is a theorem for the P₂-weakened comb, and BV is what proves
it.** The self-strike and crystallization lemmas adapt: a lenient survivor
below the frontier is a genuine pair (prime, P₂). The distance from Chen to
twins, in tile terms, is exactly the removal of the almost-prime allowance on
one tooth, and that removal is the parity wall of §2; nothing in the BV-to-EH
range crosses it (under GEH the disjunction sharpens to a comb family
d ∈ {2, 4, 6}, Polymath8b, still never to the single comb d = 2).

**Could our machinery reprove it?** Not with the current instruments alone:
the staircase/ladder technology is upper-bound machinery (history-blind caps
on kills), while Chen needs a lower-bound sieve plus the switching principle,
which in tile language is a change of tooth: count the rare bad events from
the partner's side of the comb, where they are semiprime-slot counts that a
BV-controlled upper sieve can afford. A native reproof therefore means adding
two classical components to the framework: linear-sieve lower weights on the
alive set, and the switched count on the partner tooth, with BV entering
exactly where the freshness moduli exceed the fundamental-lemma band (§3.2).
We assess this as feasible and worth doing: it would not strengthen Chen, but
it would demonstrate that the tile formulation carries the strongest known
unconditional technology with no loss, and it would make the framework's
distance to twins the same measured distance as classical sieve theory's,
u from 2.3–3.4 down to 2 in the coordinate of §3.3. The vector sieve
(Brüdern–Fouvry style, two combs sieved jointly) is the natural follow-on and
is untried in tile form. [ASSESSMENT]

## 5. Verdict table

Legend: NOW = unconditionally provable with today's theorems (SW or
elementary); BV = provable with Bombieri–Vinogradov (hence also
unconditional, but via the heavier tool and generally ineffective constants);
EH/GRH = would need the conjecture; none = parity-blocked at every input.

| Leg | Verdict | Enabling theorem / obstruction |
|---|---|---|
| Assumption A, weak (β ≥ c) | none | Parity: Selberg's examples (HR p. 239); even GEH stops at the d ∈ {2,4,6} disjunction (Polymath8b, Res. Math. Sci. 1 (2014)) |
| Assumption A, sharp (β → e^{2γ}/4) | none for d = 2; NOW on average over the comb family | HL itself; Lavrik (Soviet Math. Dokl. 1 (1960), 700–702), Wolke (Math. Ann. 283 (1989)), Mikawa (Tsukuba J. Math. 15 (1991)), Balog (Progr. Math. 85 (1990)) |
| Rotation-averaged HL over tiles | NOW, and already ours | natal5-variance.js exact moments + Chebyshev; classical tools add nothing (rotated members are rough pairs, not primes) |
| Prime-comb equidistribution (cap-28 ing. 1), fixed modulus 30/210, fixed depth | NOW | Siegel–Walfisz; explicit via Bennett–Martin–O'Bryant–Rechnitzer (Illinois J. Math. 62 (2018)) |
| Prime-comb equidistribution, full wheel, depth q_K = T^{o(1)} (tail regime) | BV | Fundamental lemma (HR Ch. 2; Opera de Cribro Ch. 6) + BV (Mathematika 12 (1965)); GRH makes it pointwise/effective |
| Prime-comb equidistribution, deep ladder (q_K = T^θ) | BV/EH give bounds, none give asymptotics | Remainders fine to T^{1/2−ε} (BV) resp. T^{1−ε} (EH); the block is the κ = 2 sifting limit, not equidistribution |
| Buchstab transfer (shifted rough pairs), y = T^{o(1)} | NOW | Two-dimensional fundamental lemma; remainders are O(1), elementary |
| Buchstab transfer, y = T^{1/u}, u bounded | none (open sieve problem, not an equidistribution problem) | Lower bounds only for u > β₂ = 4.26645 (DHR; Booker–Browning); u = 2 endpoint is TPC; BV/EH/GRH inert (no primes in the statement) |
| Skeleton bound (G30_agg < 1/2, cap-26 leg iii-c) | none bear (orthogonal) | A deterministic correlation inequality for the fixed comb; no prime-distribution content; route is elementary (cap-26 §Next) |
| Drift series' error term (β vs (e^{2γ}/4)(1 + 2/lnW + 6/ln²W)) | none for d = 2; NOW on d-average | Secondary-term HL; Lavrik-type averaging gives the expansion for almost all d |
| Chen-native (β_Chen ≥ c, lenient comb) | BV: theorem | Chen (Sci. Sinica 16 (1973)); EH improves constants; still none for twins |
| Engine calibration b·ln³W ≈ 47 (cap-28 reading 4) | none identified | A secondary-term statement about the conditioned ensemble; below current technology at any input |

The two NOW-provable discoveries, named: **S1/S2 of §3.1** (the fixed-modulus
tail refinements: a factor-4 tail theorem at modulus 30 via SW, explicit via
BMOR, and the fixed-depth cap_K asymptotics), and **the §3.2 closure**: the
full-wheel prime-regime comb equidistribution is a BV theorem, retiring one of
cap-28's two named unproven ingredients everywhere except the deep head.

## 6. Next steps

1. Write S1 as a short addendum to the staircase note (staircase-note.md §6):
   statement, SW proof, BMOR-explicit finite form, new crossover level. Small,
   clean, unconditional, and it upgrades a heuristic column of cap-28 to
   theorem in the tail.
2. Draft the §3.2 lemma (fundamental lemma + BV for the full-wheel prime
   count) with the divisor-weight absorption written out; this is the one
   assembly here long enough to hide an error, so it gets a referee-grade
   writeup before we claim it in any paper file.
3. The Chen-native reproof as a paper-strengthening project: add linear-sieve
   lower weights and the switched partner-tooth count to the tile framework;
   target statement β_Chen ≥ c with the constant tracked.
4. Do not spend equidistribution effort on the skeleton bound or the Buchstab
   transfer at bounded u; the first is elementary combinatorics, the second is
   the κ = 2 sifting-limit problem (covering-dive.md already prices it).

## 7. Honesty

- Nothing here moves Assumption A for d = 2. The prize legs are tail-side and
  averaged-side; the head overlap credit and the anchored drift stand exactly
  where the campaign left them.
- §3.1 and §3.2 are assemblies of standard theorems around our proven
  injections; we call them provable, not proven. No script verifies them yet;
  until one exists with a written proof, they are [INFERRED], one rung below
  the staircase theorems they extend.
- The u ≈ 3.4 / 2.3 placements of §3.3 rest on cap-28's extrapolated engine
  (measured-envelope) plus PNT sizing of q_K; treat as calibrated estimates.
- Bibliographic details verified this session against web sources: Lavrik
  (Dokl. 132), BMOR (Illinois J. Math. 62, moduli to 10⁵, T ≥ 8·10⁹), Wolke
  (Math. Ann. 283, 529–538), Mikawa (Tsukuba J. Math. 15, 19–29), Heath-Brown
  (PLMS (3) 47, 193–224), Maynard EH ⇒ 12 and Polymath8b GEH ⇒ 6. NOT
  re-verified against primary PDFs: the precise exceptional-set exponents in
  Wolke and Mikawa (we cite only their existence and ranges qualitatively),
  and the Ross page numbers. Chen, BV, EH, SW citations are standard and
  quoted from memory of the primary literature.
- Publication moratorium respected: nothing committed, nothing posted.

## Sources

Web (this session): [Lavrik citation confirmations](https://arxiv.org/abs/2102.12297),
[BMOR abstract](https://ui.adsabs.harvard.edu/abs/2018arXiv180200085B/abstract),
[Polymath wiki, bounded gaps](https://michaelnielsen.org/polymath/index.php?title=Bounded_gaps_between_primes),
[Polymath8b paper](https://arxiv.org/pdf/1407.4897),
[Wolke, Math. Ann.](https://link.springer.com/article/10.1007/BF01442852),
[Mikawa, Tsukuba J. Math.](https://projecteuclid.org/euclid.tkbjm/1496161564),
[Heath-Brown, PLMS](https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/plms/s3-47.2.193),
[Tao–Teräväinen](https://arxiv.org/pdf/2112.11412),
[Balog chapter](https://link.springer.com/chapter/10.1007/978-1-4612-3464-7_5),
[Davenport–Halberstam](https://projecteuclid.org/euclid.mmj/1028999608).
Repo: anchored-note.md, staircase-note.md, beta2-note.md, covering-dive.md,
natal-cap-28-analytic-certificate.js, natal-cap-26-minus-half.md, GLOSSARY.md.
