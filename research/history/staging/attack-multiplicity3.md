# Attack multiplicity-3: the m ≥ 3 instrument, built, and what it refuses to buy

<!-- ledger
id: Q-multiplicity3
status: CLOSED
todo: none
question: Does the m >= 3 multiplicity instrument buy anything for the anchored deficit?
verdict: Closed as an instrument: at @17 the m >= 3 statistic sees the anchored deficit worse than the pair statistic it was to replace (anchored z -0.23 against -2.71 for the overlap credit X), the Bonferroni depth ladder buys one place and dies, and multiplicity 3 in moment order buys a factor 1.3 that does not reach the anchor.
-->

*(2026-08-26. Producer: [`research/attack-multiplicity3-01.js`](../../attack-multiplicity3-01.js),
embed-stamped, 219 lines of output, 61.7 s. Every number below is exact by full
enumeration of the whole rotation ensemble at @11/@13/@17 (2,310 / 30,030 /
510,510 rotations) or by an exact O(W) arithmetic pass at @11..@23; nothing is
sampled and nothing is fitted. Under moratorium: not for circulation.)*

## 0. What this closes, and the two corrections it forces

Lead with the disconfirming half, because it is the whole result.

**The multiplicity axis is closed as an instrument for the anchored deficit.**
The m = 3 statistic sees the anchored deficit *worse* than the pair statistic it
was supposed to replace, not better. At @17, in one ensemble, on one scale:

| statistic | anchored z | corr(·, S) | Var(·)/Var(S) |
|---|---|---|---|
| X (overlap credit) | **−2.71** | 0.987 | 1.01 |
| X₂ = n₂ (the m = 2 cell) | **−2.68** | 0.135 | 0.83 |
| X≥₃ (the m ≥ 3 cells) | **−0.23** | 0.689 | 1.59 |
| B₂ (pair census) | −0.30 | −0.235 | 49.0 |
| B₃ (triple census) | **−0.23** | −0.509 | **99,541** |

So the triple census is 11.8× dimmer than the X-channel and 1.3× dimmer than the
pair census it was meant to beat, and its variance is five orders of magnitude
larger than the survivor count's. A statistic whose noise is 99,541× the noise of
the thing it measures is not an instrument.

**Correction 1, to `paper/wall-note.md` §2 Face 2.** The sentence "the overlap
deficit lives in multiplicity m ≥ 3" does not survive an m-resolved measurement
at the level it cites. Its evidence was that the *pair census* B₂ reads
z = −0.30 while X reads −2.71, from which m ≥ 3 was inferred. Resolving the
X-channel by cell instead shows the opposite: at @17 the anchored X-deficit sits
in the **m = 2 cell** (z = −2.68), and the m ≥ 3 cells carry z = −0.23. B₂'s
dimness is a dilution artifact, not a location: B₂ = Σ_k C(k,2)n_k mixes the
signal-carrying k = 2 cell with high-k cells whose C(k,2) weights are large and
whose contribution is noise. The corpus's own channel split already said the same
thing and was read past: `natal-cap-39-triple-census.js` prints, at @17, X-gap
= −566.70 = m = 2 −507.46 + m ≥ 3 −59.24, and puts the m ≥ 3 share of that gap
at 10.5%. **Scope, exactly:** this is a one-level statement. Of the three
enumerable levels only @17 has a survivor deficit worth attributing at all
(z(S) = −2.49 at @17 against −0.16 at @13 and +1.83 at @11), so the attribution
rests on a single level and must not be written as a trend.

**Correction 2, to `paper/anchored-note.md` §3 Proposition 1 and Face 1's
"factor of 81".** The counting condition ε·|ensemble| < 1 is exact, but the two
factors in the corpus's evaluation of it come from different ensembles. The ε is
E3's (the window ensemble, closed-form variance from J₅, cardinality
∏_{p≤y} p) and the cardinality is E1's (the diagonal rotation ensemble, exactly
W members). Computed self-consistently, each ensemble against its own
cardinality, the gap is larger in both readings:

| x | E3 ε | E3 ε·W (the Face 1 form) | ln \|E3\| = θ(y) | **ln(ε·\|E3\|)** | E1 ε | **E1 εW** |
|---|---|---|---|---|---|---|
| 11 | 6.525e−3 | 15.07 | 41.0 | **35.9** | 9.373e−3 | **21.7** |
| 13 | 9.843e−4 | 29.56 | 157.1 | **150.2** | 6.482e−3 | **194.7** |
| 17 | 1.007e−4 | 51.40 | 679.6 | **670.4** | 3.296e−3 | **1,682.5** |
| 19 | 8.381e−6 | **81.29** | 3,036.7 | **3,025.0** | not enumerated | — |

The 81.29 at @19 reproduces Face 1's figure exactly, which confirms the reading:
Face 1's ε is E3's. In E3's own ensemble the miss at @19 is e^3025, not a factor
of 81. In E1's own ensemble, where the cardinality W is correct, the miss at @17
is 1,682, which is 33× worse than the 51.40 the mixed pairing reports at the same
level. Both self-consistent readings make Proposition 1 *stronger*; neither
weakens it. The number 81 should not be quoted again without its ensemble.

**What is still open and untouched by any of this:** everything Face 1 says about
the anchored bias β, the X-floor, and the Loudness Ceiling Conjecture. This file
moves no exponent, proves no case of TPC, and adds no bound anywhere.

## 1. Definitions, written down before anything is measured

Level x, tile W = x#, Natal@5 comb N with |N| = N̄, scour primes x < q ≤ √W,
K of them. Rotation t: prime q strikes the classes {t, t−2} mod q.

- m_r(t) = #{q : q strikes r at t}; n_k(t) = #{r ∈ N : m_r(t) = k}.
- **S** = n₀ (survivors), **M** = Σ_k k·n_k (strikes with multiplicity).
- **Overlap credit** X = Σ_k (k−1)⁺ n_k = M − #{struck slots}. This is the
  X-channel: the strikes that land on already-dead slots.
- **B_j** = Σ_k C(k,j)·n_k, the j-th coincidence census. B₁ = M; B₂ is cap-12's
  S₂ and cap-31's P2, the pair channel; **B₃ is the triple-overlap term of the
  inclusion–exclusion, the m = 3 instrument proper.**
- The split that matters: X = X₂ + X≥₃ with X₂ = n₂ and X≥₃ = Σ_{k≥3}(k−1)n_k.
- Exact identity (cap-35's I2): S = Σ_{j≥0} (−1)^j B_j, B₀ = N̄, and the series
  **terminates** at j = max_r m_r(t).

**Three ensembles, and they are not interchangeable.** This is the warning
`natal-cap-31-calm-vs-kill.md` closes on, and this file carries it as a rule.

| | E1 diagonal | E2 independent strike | E3 window |
|---|---|---|---|
| member | t ∈ [0,W) | (c_q) ∈ ∏ Z/q | phase of the deep tile |
| cardinality | **W** | ∏_q q | ∏_{p≤y} p = e^{θ(y)} |
| mean at @17 | 3,614.93 | 3,245.51 (= S_CRT) | 3,245.51 |
| anchored z at @17 | −2.49 | — | −4.50 |
| moments | enumeration only | closed form per subset (cap-21 Thm 1) | Var closed form (J₅) |
| whose it is | cap-31, cap-35, this file | cap-14, cap-21, cap-27 | natal5-variance, anchored-note |

Every z in §0 and §2 is E1's. No z from one ensemble is compared with a z from
another anywhere in this file.

**Custody.** The E1 sweep reproduces cap-31's and cap-35's embedded anchored
figures at all three levels, gated in the producer: VR(0), S(0), X(0), X̄,
X(0)/X̄, P2(0) = B₂(0), z(X), z(B₂), corr(X,S), all PASS. The u-form anchored
spectrum is checked cell by cell against the sweep at @11/@13/@17: PASS.

## 2. The m = 3 instrument, and why it is a worse instrument

Full table in the producer's PART 1. The three readings:

1. **B₃ is dominated by a degenerate cell.** In E1 the rotation t = r puts slot r
   at m = K, because every scour prime divides r − t = 0. So max_t max_r m_r = 10,
   34, 120 at @11/@13/@17 (that is exactly K), and C(K,3) weights those rare
   rotations enormously. Var(B₃)/Var(S) = 74.4, 3,466, 99,541 at the three
   levels: the instrument's noise grows two orders of magnitude per level while
   the quantity it measures does not.
2. **B₃'s correlation with S runs the wrong way and is small.** corr(B₃, S) =
   +0.020, −0.262, −0.509; corr(B₂, B₃) = 0.9166, 0.9404, 0.9453, so the pair and
   triple censuses are near-duplicates and the triple adds ~5% of independent
   information over the pair.
3. **The cell split, not the census, is where the signal is.** corr(X≥₃, S) =
   0.241, 0.682, 0.689 against corr(X₂, S) = 0.280, 0.515, 0.135, so the m ≥ 3
   cells do carry most of the *fluctuation* of S at @13 and @17. They do not
   carry the anchor's *offset*, which is the quantity Assumption A is about. Two
   different questions, two different answers, and Face 2 conflates them.

**Pre-registration R1 was BROKEN and the break is informative.** R1 predicted
z(B₃) > 0 at @17, reasoning from cap-35's per-cell z at @17 (−4.43 at k = 3,
+1.90 at k = 4, +10.11 at k = 6) and C(k,3) weights 1, 4, 20 favouring the
positive cells. Measured: z(B₃) = −0.23. The prediction failed because the
per-cell z's are computed against per-cell standard deviations, and B₃'s own
standard deviation is set by the k = K tail, not by the k = 3..6 cells. That is
the same defect that makes B₃ useless as an instrument, arriving as a failed
forecast rather than as an argument.

## 3. The Bonferroni depth ladder at the anchor: the one place m = 3 does buy something, and where it dies

Bonferroni truncation of S = Σ_j (−1)^j B_j gives, at every **odd** depth J, a
deterministic floor S(0) ≥ Σ_{j≤J} (−1)^j B_j(0) — no ensemble, no measure, and
therefore not subject to Proposition 1 at all. Depth 1 is the pure capacity
ledger N̄ − M. **Depth 3 is the first depth that uses multiplicity 3.** Measured
exactly at five levels:

| x | N̄ | S(0) | depth-1 floor | depth-3 floor | depth-3/S(0) | J* | max m(0) | census price C(K,J*) |
|---|---|---|---|---|---|---|---|---|
| 11 | 90 | 45 | 17 | 45 | 1.0000 | 1 | 3 | 1.0e+1 |
| 13 | 990 | 307 | −145 | 274 | 0.8925 | 3 | 5 | 6.0e+3 |
| 17 | 14,850 | 3,099 | −7,282 | 1,351 | 0.4359 | 3 | 6 | 2.8e+5 |
| 19 | 252,450 | 38,380 | −198,245 | **−28,749** | −0.7491 | 5 | 7 | 1.3e+11 |
| 23 | 5,301,450 | 597,475 | −5,581,717 | **−1,854,727** | −3.1043 | 5 | 9 | 1.3e+14 |

Read it in this order.

**The number that kills it: the depth-3 floor is −28,749 at @19.** The
multiplicity-3 certificate is positive at @11, @13 and @17 and negative from @19
on. It is not a route; it is a per-level fact that stops.

**J*(x) = 1, 3, 3, 5, 5 at @11..@23** (pre-registered R2, HELD, forecast from the
@19 and @23 spectra already on cap-39's record). The required depth grows, and
the price of evaluating depth J *without already knowing the answer* is the
C(K,J) coincidence census: 2.8e5 at @17, 1.3e11 at @19, 1.3e14 at @23. The
efficiency also decays where the ladder is alive: the depth-3 floor is 100%,
89.3%, 43.6% of the truth at @11/@13/@17.

**Why this is not a certificate in the form it looks like.** The floor above is
computed from the anchored spectrum n_k(0), and the O(W) pass that produces the
spectrum produces S(0) itself. The non-circular evaluation is the C(K,J) census
over residue classes, which never tests primality and never locates a survivor —
that is the Face 3 proof form, and it is real — but it costs at least as much as
sieving the tile. So the depth-J floor is a proof *form*, not a cheaper route,
which is exactly what Face 3 says about its own K* ladder. For comparison, the
same table at the ensemble mean is negative at depth 3 from @13 on and diverges
(the ensemble's max m is K, not the anchor's ≤ 9), so the anchored ladder works
only because the cofactor trichotomy caps anchored multiplicity at
2 ln W / ln(x+1).

**Prior art, flatly:** this is Brun's sieve at depth J with exact coincidence
counts instead of estimated ones (Brun 1919, 1920). `paper/wall-note.md` Door 1
and Door 4 already name the territory ("the union-bound route with overlap
corrections *is* Brun (1919)"). Nothing in §3 is novel. What is new to this
corpus is only the measurement of J*(x) and of where the depth-3 floor turns
negative. A grep of `research/PRIOR-ART.md` for "Bonferroni" returns nothing; it
should not acquire a row on the strength of this.

**Mechanism collision, flagged:** `REFUTED.md` row 42 (exact-strata re-insertion)
closed on "infinite regress: it terminates at every finite z and at no uniform z;
it survives as a finite theorem". The depth ladder has the identical shape — a
finite theorem at every level, a growing depth, no uniform statement — so it
belongs in that class rather than beside it.

## 4. The certificate ladder: multiplicity 3 in moment order buys a factor of 1.3

"A certificate on moments through multiplicity 3" reads, in moment order, as the
optimal degree-3 certificate for P(S = 0). On the support [0, N̄] the
Markov–Lukács form makes the optimum exact and computable as a Christoffel
function of the enumerated measure: even degree 2m uses p = q(s)², odd degree
2m+1 uses p = (1−s)q(s)², with q(0) = 1 and s = S/N̄. The parts that vanish at
s = 0 can only add nonnegative mass, so these two families *are* the optima, not
relaxations. In E1, exactly:

| x | degree 2 (Chebyshev) | degree 3 (**m = 3**) | degree 4 | degree 6 | deg-2/deg-3 |
|---|---|---|---|---|---|
| 11 | 9.2862e−3 | 5.3058e−3 | 1.6055e−4 | 3.4045e−6 | **1.750** |
| 13 | 6.4403e−3 | 4.4614e−3 | 5.3689e−5 | 5.8195e−7 | **1.444** |
| 17 | 3.2850e−3 | 2.5123e−3 | 1.6897e−5 | 9.0313e−8 | **1.308** |

**The third moment buys a factor of 1.3 at @17 and the factor is shrinking.**
Pre-registration R3 (ratio below 10) HELD at all three levels. The measured skew
μ₃/σ³ is +0.2125, −0.1433, −0.4920, so the distribution is turning
*left*-skewed as the level rises, which is the direction that makes the lower
tail harder, and the third moment's contribution decays accordingly. Two moment
orders buy e^3.96, e^4.66, e^5.25 — the even-degree ladder is where the whole
gain lives, exactly as Door 3 says ("only even degrees exist in this ladder").

**Placement against the campaign's certified bounds, honestly: they are not
comparable, and here is why.** cap-21's 80× (optimal quartic-square at @11) and
4,190× (moments 1..6 at @11), and cap-27's 513× at @13, are all certified over
**E2**, the independent strike ensemble. The ladder above is over **E1**. The
shapes match in magnitude — this file's @11 degree-4 beats Chebyshev by 57.8×
against cap-21's 80×, and its degree-6 by 2,727.7× against cap-21's 4,190× — but
they are bounds on different measures and the corpus should not table them
together. What can be said is that this file's E1 ladder and cap-21's E2 ladder
pay the same rate, about e^4 to e^5 per two moment orders, in both ensembles.

## 5. Does any of it reach the anchor? No, and the dichotomy is sharp

The counting condition is exact: a bound admitting an exceptional fraction ε
admits ε·|ensemble| exceptional members and names none of them, so it decides the
anchor only when ε·|ensemble| < 1.

**In E1, degree 6 crosses — and crossing there is circular.** εW = 4.611e−2 at
@17 and 1.748e−2 at @13, both below 1, so a degree-6 certificate on E1's exact
moments *would* prove S(0) > 0 at those levels. It proves nothing, because E1's
moments are obtainable in this corpus only by enumerating all W rotations, and
that enumeration returns S(0) directly. The closed forms this corpus does hold
are E2's per-subset product (cap-21 Theorem 1) and E3's J₅ variance
(natal5-variance.js); neither is E1's, and this file computes E1's moments by
enumeration for want of anything else. Whether an E1 closed form exists is not
settled here.

**In E2 and E3, where the moments are non-circular, the threshold is
astronomical.** E2's moments are closed-form per subset (cap-21 Theorem 1) and
E3's variance is closed-form (J₅), but their cardinalities are ∏_q q and
e^{θ(y)}:

| x | ln \|E2\| | best certified E2 bound | ln(ε·\|E2\|) | decides? |
|---|---|---|---|---|
| 11 | 33.2 | optimal moments 1..6, 1.49e−6 | **19.8** | no |
| 13 | 146.8 | fourth moment, exact T₄, 1.898e−6 | **133.6** | no |
| 17 | 666.4 | Chebyshev, 1.01e−4 | **657.2** | no |

So the campaign's strongest ensemble bound, cap-27's 513× beat over
39,782,707,965 exact quadruples, misses its own decision threshold by e^133.6 at
@13. Extrapolating the measured ladder rate (3.956, 4.656, 5.251 nats per two
degrees) to E3's threshold gives a required moment degree of about 20, 67 and 257
at @11/@13/@17 — growing like θ(y), which is ≍ √W. That is Door 3's "parity
survives all polynomial certificates at geometrically growing cost", now with the
degree attached.

**The dichotomy, stated once.** Either the moments are cheap and the ensemble is
astronomically large (E2, E3), or the ensemble has exactly W members and the
moments cost a full enumeration that has already answered the question (E1).
Multiplicity 3 changes neither side of that. The m = 3 certificate improves the
ensemble bound by a factor of 1.3 and leaves the anchor exactly as unreachable.

**A wrong-direction arrival, flagged as a candidate.** ε·|ensemble| < 1 at
infinitely many x, for any ensemble containing the anchor, gives S(x) ≥ 1
infinitely often, which is TPC by `paper/anchored-note.md` §8. So "close the
factor-81 gap uniformly" is TPC-strength, not a stepping stone toward it. This
matches the pattern already logged four times in `REFUTED.md` (rows 27, 64, 65,
and the maximal law in Face 4) and should be checked against them before being
recorded as a fifth.

## 6. Verdict, and what would falsify it

**The multiplicity axis is closed as an instrument and as a certificate route.**

- As an instrument for the anchored deficit: closed. z(B₃) = −0.23 against
  z(X) = −2.71 at @17, with Var(B₃)/Var(S) = 99,541. Falsified if some
  m ≥ 3 statistic with variance comparable to Var(S) reads |z| ≳ 2 at @17; the
  natural candidate, X≥₃, was tested here and reads −0.23.
- As a deterministic floor: closed by the number −28,749, the depth-3 floor at
  @19. Falsified if a depth-3 variant (a different truncation, a weighted
  Bonferroni, a Chung–Erdős style bound) is positive at @19; not tested here.
- As an ensemble certificate: closed by 1.308, the degree-2/degree-3 ratio at
  @17. Falsified if a *joint* certificate in (S, B₃) beats the pure-S ladder;
  not tested here, because a joint certificate needs closed-form joint moments of
  (S, B₃) and none exist in this corpus.
- The two corrections in §0 are falsified by re-running the producer.

**Not tested, and worth saying:** E1 at @19 and above (the sweep is O(W·N̄) and
@19 is 2.4e12 slot-touches at the method used here), the joint (S, B₃)
certificate, and any depth-5 census, whose cheapest instance is 1.3e11 triples at
@19.

## 7. Pre-registration outcomes

| | prediction | outcome |
|---|---|---|
| R1 | z(B₃) > 0 at @17 | **BROKEN**, measured −0.23; the reason is B₃'s k = K tail |
| R2 | J* = 1, 3, 3, 5, 5 at @11..@23 | **HELD** |
| R3 | degree-2/degree-3 ratio below 10 at every level | **HELD**, 1.750 / 1.444 / 1.308 |
| R4 | E1 εW exceeds Face 1's 81 | **HELD** at @13 and @17 (194.7, 1,682.5); at @11 it is 21.7, so the claim is level-dependent and was stated too broadly |

R4's own qualification belongs in the record: at @11 the E1 figure is 21.7, below
81, so "E1 εW exceeds 81" is true from @13 up and false at @11. The pre-registered
statement was not level-qualified and should have been.

## 8. Custody

- Producer: `research/attack-multiplicity3-01.js`, embed-stamped. It was embedded
  three times: the second embed added PART 5 and required `--force`, with the
  guard reporting 0 of 486 figures in the replaced block not reproduced; the
  third embed is clean and is what the file carries.
- Cited artifacts, not recomputed (standing compute rule): cap-31's and cap-35's
  anchored figures (used as PASS/FAIL gates, all PASS), cap-39's X-gap channel
  split and @19/@23 spectra, cap-21's and cap-27's E2 bounds (PART 5 inputs,
  labelled as citations in the source).
- `node research/qc.js --full`: 251/251 audit checks pass; the single qc finding
  is `uncited-script` on the producer, which this file clears.
