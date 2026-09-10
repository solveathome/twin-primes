# Adversarial verification of the Tail-Count Transport

<!-- ledger
id: Q-tailcount-transport
status: ANSWERED
todo: none
question: Does the Tail-Count Transport survive an independent adversarial re-derivation?
verdict: The inequality, the certificates and the NO-CHAIN verdict all STAND on an implementation written from the operator definition, with a seventh fold added exact (31: 348 = 348); three corrections follow, the stated equivalence is false at fold 29, zero loss is exactness-by-relaxation rather than a tail fact, and the measured spends are 1, 1, 2, (1 or 2), 3, 2.
-->

*2026-08-19. Deep-success validation of the held positive in
`attack-foldL-03-transport.md` (producer `research/attack-foldL-03-transport.js`).
Everything below was recomputed from an independent implementation written from
the operator definition in `research/a3-09-histogram-operator.md`, never from the
producer's code. Scratch: `advtct-lib.js`, `advtct-cert.js` in the session
scratchpad. IN PROGRESS -- probes (a) and (b) complete.*

## (a) The inequality, derived here from scratch: SOUND

Operator (A9, Holt-Rudd 2014 §5): a new gap is a maximal kill run, left endpoint
the lift of old slot i at absolute position s in Z/(qW), interior the lifts of
i+1..i+L, right endpoint i+L+1. With `a = -s mod q`,

    nu_q(i,L) = #{ a in Z/q : G_j in {a, a-2} for j=1..L;  a not in {0,2};
                              a not in {G_{L+1}, G_{L+1}+2} }.

**L=0.** No interior condition, so `nu_q(i,0) = q - |{0,2} u {g_i, g_i+2}| <= q-2`,
with equality iff `q | g_i`. PROVEN, one line.

**L>=1.** The j=1 condition alone forces `a in {G_1, G_1+2}`, a 2-element set, and
the later conditions only intersect into it. So `nu_q(i,L) <= 2`. PROVEN, one line.

**The qualifying-interior implication.** If `nu_q(i,L) > 0` then some a has
`G_j in {a,a-2}` for every j=1..L, so `g_{i+j} = G_{j+1}-G_j = 0, +2 or -2 (mod q)`
for j=1..L-1. So `#{i : nu_q(i,L)>0, G_{L+1}(i)>=theta} <= Q_L(theta)`, and
summing the operator over d >= theta gives

    N_new(theta) <= (q-2) N(theta) + 2 * SUM_{L>=1} Q_L(theta).

**No double counting.** For fixed (i,a) with a not in {0,2} exactly one L
qualifies -- L is the least j>=1 with `G_j not in {a,a-2}`, minus 1. Hence the
exact identity `SUM_{L>=0} nu_q(i,L) = q-2` for every i, giving `D_new = D(q-2)`.
The operator is an equality and the inequality is a term-by-term relaxation of it.

**The copy boundary wraps correctly.** The operator is stated in absolute
position in Z/(qW), and for fixed old slot i the q lifts `S[i]+kW` have residues
`S[i]+kW mod q` running over all of Z/q exactly once (gcd(W,q)=1). The sum over
alignments a IS the sum over copies. Old-word windows are cyclic with one turn
adding W, so a run straddling the copy boundary (angle 2, `attack-foldL-02-bridge.md`)
is the same term as any other. No hole here.

**One thing the record states loosely and my derivation states exactly:** the
qualifying condition is on the L-1 gaps `g_{i+1}..g_{i+L-1}`, not on L gaps. The
record's formula says L-1 correctly; a paraphrase saying "all L interior gaps"
would be wrong (it would be a strictly stronger, unproven, condition).

## (b) Independent numerics: REPRODUCED, and one claim strengthened

Ladder rebuilt from T_5 with my own fold: D = 3, 15, 135, 1485, 22275, 378675,
7952175 and G2 = 12, 30, 42, 66, 108, 150, 204. Matches the record's calibration.

| fold q | 11 | 13 | 17 | 19 | 23 | 29 |
|---|---|---|---|---|---|---|
| certificate, mine | 42 | 66 | 108 | 150 | 204 | 270 |
| certificate, record | 42 | 66 | 108 | 150 | 204 | 270 |
| true G2(new), mine | 42 | 66 | 108 | 150 | 204 | 258 |
| true L, mine | 1 | 2 | 2 | 2 | 3 | 2 |
| violations, all theta | 0/9 | 0/13 | 0/20 | 0/27 | 0/36 | 0/45 |
| max N_new/RHS | 1.0000 | 1.0000 | 0.8881 | 0.8975 | 0.9180 | 0.9324 |

Exact agreement on every published number. The record checked the inequality at
five folds with the `L <= 8` truncation; I ran it **untruncated** (the sum over L
terminates on its own at `L = R+1` where R is the longest run of qualifying gaps,
measured R = 0, 1, 1, 1, 2, 2) and at **six** folds including q=29, still 0
violations. So the record's honest limit about the L<=8 truncation is discharged
at this range: no truncation was needed.

**A structural fact the record does not state, and it matters.** At the
certificate the first term is inert. `N(theta) = 0` for every `theta > G2(old)`,
and the transported max `M` exceeds `G2(old)` at every fold (42>30, 66>42,
108>66, 150>108, 204>150, 270>204). So

    certificate = M = max over i of [ g_i + (maximal qualifying run after i) + one free gap ],

exactly, at all six folds -- the `(q-2)N(theta)` term never binds. The
certificate is therefore a **restricted-maxsum** quantity, not a tail-count one;
the tail-count framing is the derivation, not the instrument. This does not
weaken the result (the restriction to qualifying interiors is exactly what makes
it beat the standing `maxsum_{L+1}` route) but it renames what has to be bounded.

## Seventh fold, outside the record's range: still exact

The old word for fold 31 is T₂₉, streamed from T₂₃ and never stored
(`advtct-f31.js`, 13 s, 214,708,725 gaps). Certificate **348**, truth
**348** (`a3-09-histogram-operator.md`'s independently derived G₂(T₃₁)).
Loose and alternation-refined agree there. Longest qualifying run in T₂₉ at
q=31 is 3, the word 60, 126, 60, which is `a3-05`'s extremal alternating word
`2p−2, 4p+2, 2p−2` reproduced from a code path with nothing in common with it.

## (c) The zero-loss mechanism: NOT a deep fact, and not a granularity artifact

Loss in absolute units, folds 11..31: **0, 0, 0, 0, 0, 12, 0**; in slots (gaps
are multiples of 6): **0, 0, 0, 0, 0, 2, 0**. Not granularity: at six of seven
folds the certificate equals the truth as integers, not merely to within 6.

The mechanism is visible once three certificates are separated. All three are
maxima of the same window sums; they differ only in which of `nu_q(i,L) > 0`'s
conditions are kept.

| | conditions kept | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|---|
| `M_loose` (the record's `Q_L`) | interiors qualify mod q | 42 | 66 | 108 | 150 | 204 | **270** | 348 |
| `M_alt` | + the interiors' walk stays inside a 2-set `{a−2,a}` | 42 | 66 | 108 | 150 | 204 | **258** | 348 |
| `M_full` | + both endpoints live | 42 | 66 | 108 | 150 | 204 | 258 | 348 |
| truth G₂(new) | — | 42 | 66 | 108 | 150 | 204 | 258 | 348 |

`M_full` is **identically** the truth, at all seven folds, because
`max{G_{L+1}(i) : nu_q(i,L) ≥ 1}` *is* the largest new gap. So the certificate
is the operator evaluated on its own support with two conditions dropped, and
the "zero loss" is that near-tautology rather than a fact about tails. This is
`operator-and-pair-count.md`'s "exact simulator rather than a source of bounds",
restated: the transport is a source of bounds only to the extent that it throws
those two conditions away, and at six of seven folds it throws away nothing.

**What breaks first as θ grows: the alternation constraint.** It is the only
one that has ever cost anything (12 units at fold 29). The endpoint-live
conditions have cost 0 at every fold. Second in line is the truncation index:
the longest qualifying run R runs 0, 1, 1, 1, 2, 2, **3** at folds 11..31, so
the required L index is R+1 = 1, 2, 2, 2, 3, 3, **4** and rising; the producer's
`L ≤ 8` truncation first becomes unsound at R > 7.

**Correction available at zero cost, and it should be taken.** Restricting
`Q_L` to interiors whose class word admits a legal walk on a 2-set is still a
valid relaxation of `nu_q(i,L) > 0` (it *is* the exact non-emptiness of A_L
minus the endpoint conditions), it costs one state bit, and it makes the
certificate exact at all seven folds. The record's headline "exact at five of
six, 0.045 nats at the deepest" is then replaced by "exact at seven of seven",
and the Alternation Lemma moves from a post-hoc remark in §4 into the
instrument itself.

**Correction required: the `⟺` in §1 is false as an iff.** At fold 29 the
truth is 258 while an old window with qualifying interiors sums to 270. So
"G₂ < x'² ⟺ no such window reaches x'²" fails in the ⟸ direction at the one
fold where the two numbers differ. The record hedges it with "to within the 0
to 12 units measured", but the symbol says more than the hedge. With the
alternation refinement the two sides agree at every fold in reach and the
biconditional is at least not contradicted by data -- still not proven.

## (d) The K-cap: re-derived, correct, and NOT what carries the no-chain verdict

`K ≤ 1 + θ/(3q)` re-derives: K kills means K−1 interior gaps, each ≥ 2q−2, and
by the Alternation Lemma each adjacent pair of them sums to ≥ 6q, so the
interiors alone contribute ≥ 3q(K−1) to θ. Sound, and slightly conservative
(the window's own first and last gaps are additional).

**Measured spends, corrected.** The L attaining the certificate, with ties
listed:

| fold | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|
| record's K | 1 | 1 | 2 | 2 | 3 | 3 | — |
| mine (alternation-refined) | 1 | 1 | 2 | **1 or 2 (tie)** | 3 | **2** | 2 |
| true L of the fold | 1 | 2 | 2 | 2 | 3 | 2 | 4 |
| cap `1+M/(3q)` | 2.27 | 2.69 | 3.12 | 3.63 | 3.96 | 3.97 | 4.74 |

Two corrections. Fold 19 is a tie between L=1 and L=2, so the record's 2 is
defensible but not the only reading. Fold 29's K=3 is an artifact of the loose
certificate: the L=3 window that scores 270 is not realizable, and the
realizable maximum spends K=2, which is also the fold's true L.

**Is the cap tight?** The operationally required truncation index is R+1 =
1, 2, 2, 2, 3, 3, 4 against `floor(cap)` = 2, 2, 3, 3, 3, 3, 4. The two track
each other within one throughout and coincide at folds 13, 23, 29 and 31. So
there is no slack for alternation to recover -- alternation is already inside
the cap, by construction, and the measured index sits on it.

**But the no-chain verdict does not rest on the cap at all,** and saying "the
rate is A5's cap" over-credits it. What kills the chain is §4's structural
observation: with a fixed index M the chain's certificate is bounded by
`maxsum_M(base)`, a constant, against a diverging truth. That argument needs no
cap, and it survives any sharpening of the index estimate. The cap's real role
is the opposite one -- it is an upper bound on how much index a would-be prover
must carry, which is the useful direction, and it is the one the record's own
"0.18p wall" framing wants. The verdict stands; its stated reason is
mis-attributed.

## (e) The cross-frame question: the cap collapses, and the transport still does not chain

Angle 4's localized inputs were re-measured here from my own sieve
(`advtct-loc.js` / `advtct-loc2.js`, window [0, 2·10⁹), n ≡ 5 mod 6, 20 s) and
reproduce exactly: **last fold with a kill run ≥ 2 is p = 421, with exactly one
adjacent kill pair and 105,790 kills**; **last fold with any gap ≥ θ_p = 2p−2
is p = 1021**; max L over the range is 3; Σ(L−1) = 62 over the 233 folds from
17 up, which is angle 4's 64 minus the two units folds 7 and 13 contribute.

**The K-cap arithmetic in the two frames.**

- *Tile.* Needed θ = x'², divisor 3q ≈ 3x'. Cap `1 + θ/(3q) ≈ 1 + x'/3`, and the
  measured index sits on it (previous section). The index diverges, so no fixed
  index certifies, so the chain dies. This is the record's finding and it holds.
- *Window.* Needed θ is the zone budget, but the object that has to reach it is
  the localized word, whose gaps are ~ln³ scale. The cap is not what bites; the
  **qualifying supply** is. An interior gap must be ≥ 2p−2, and the localized
  max gap crosses below 2p−2 at p = 1021 and never returns. Measured
  qualifying-gap counts in the window: 5,124,285 at p=17; 2,690,464 at 31;
  461,439 at 61; 29,080 at 101; 5,035 at 211; **42 at 421; 0 at 701 and at
  every fold beyond.** From p = 701 on, `Q_L ≡ 0 for every L ≥ 2` identically,
  so the required index is **1, fixed, forever**. The thing that kills the tile
  chain is gone.

**And the chain still fails, at L = 1.** The L=1 term has no interior condition
and therefore no hypothesis can remove it: the transport must allow any adjacent
pair to merge. Measured in the window, the L=1 term against the truth:

| fold p | 17 | 31 | 61 | 101 | 211 | 421 | 701 | 1103 | 1499 |
|---|---|---|---|---|---|---|---|---|---|
| G_loc(p) | 108 | 300 | 498 | 642 | 900 | 1170 | 1446 | 2052 | 2220 |
| maxsum₂ (the L=1 bound) | 150 | 372 | 588 | 798 | 1080 | 1470 | 1848 | 2220 | 2262 |
| ratio | 1.389 | 1.240 | 1.181 | 1.243 | 1.200 | 1.256 | 1.278 | 1.082 | 1.019 |

The bound multiplies the record by about **1.20 per fold**. The truth
multiplies it by `(2220/108)^{1/233} = 1.0130` per fold. Chaining the transport
over the 233 folds therefore gives up `233 · ln(1.20/1.013) ≈ 39 nats` against a
lifetime budget of about 0.6. **The transport does not chain in the window frame
either, and the failing step is the L = 1 term.**

**Why it fails there and not on the tile, which is the inversion worth keeping.**
On the tile the fold sums over all q alignments, so every adjacent pair that
*could* merge *does* merge in some copy -- which is exactly why `M_full` is
identically the truth and why the certificate is exact. In a window the
alignment is fixed by the actual residues, so almost no adjacent pair merges
(about 2/p of them), and a bound that maximizes over alignments throws that away
at every fold. **The tile frame's exactness and the window frame's
chainability are the same property with opposite signs.**

**The one conditional statement that would be worth proving.** The multiplicity
change is real and is what the window frame buys: the coefficient on `N(θ)`
drops from `q−2` (the tile grows by a factor q, so a factor q is forced) to
**1** (the window does not grow). That converts an iterated product into an
iterated sum. Written out, and exact rather than a relaxation:

> **Localized Transport Chain.** Let the zone be a window of length Z at height
> x, `g^{(p)}` its gap word after folding by every prime ≤ p, and θ the zone
> budget. Then for each fold p
>
> `N^{(p)}(θ) ≤ N^{(p−1)}(θ) + Σ_{L≥1} R_L^{(p)}(θ)`,
> `R_L^{(p)}(θ) = #{i : G_{L+1}(i) ≥ θ and slots i+1..i+L all ≡ 0 or −2 (mod p)}`,
>
> hence `N^{(x)}(θ) ≤ N^{(x₀)}(θ) + Σ_{p ≤ x} Σ_{L≥1} R_L^{(p)}(θ)`. If the
> right-hand sum is < 1 the zone is occupied and the Zone Postulate holds at x.
> Beyond the fold where no gap reaches 2p−2 every `L ≥ 2` term vanishes
> identically and the hypothesis reduces to
> `Σ_p #{i : g_i + g_{i+1} ≥ θ and slot i+1 ≡ 0 or −2 (mod p)} < 1`.

The first display is PROVEN here in one line (a level-p gap is a merge of old
gaps; if it merges one, that old gap was already ≥ θ, and distinct new gaps come
from distinct old ones). The second sentence is exactly the K-cap collapse,
MEASURED at p = 701 in the 2·10⁹ window. What is not proven, and is the whole
of the remaining content, is the hypothesis itself -- and note it is stated on
**residues**, not on the gap word. That is precisely the information the
tail-count transport is built to avoid needing. So the honest reading is: the
window frame does not rescue this instrument, it replaces it with angle 4's
amortized ledger, and the two attacks meet at the same counting hypothesis from
opposite sides.

## (f) Structure claims

**Count shape.** Summing a statistic over all q alignments of the old tile with
its `{d, d−2}` slots deleted reproduces the new tile's statistic **exactly**,
with a boundary term that is precisely the **q** gaps of the new tile that
straddle a copy boundary: the alignment sum has `D(q−2) − q` gaps against the
new tile's `D(q−2)`. Measured relative shortfalls with the boundary excluded are
0.081481, 0.008754, 0.000763, 0.000050, 0.000003 at folds 11..23 on slot count,
against `q/(D(q−2))` = 0.081481, 0.008754, 0.000763, 0.000050, 0.000003. Exact
match, five for five. So the shape is confirmed, and one wording in §5 item 1
should be tightened: the copy-boundary term is not special to fold 11, it is
present at every fold and is exactly q gaps; fold 11 is only where it is
relatively large.

**Shuffle, my own seed and 10× the draws.** My operator implementation
reproduces the unshuffled fold exactly (G₂ = 204, Σg² = 9.2718598e+9,
N(≥120) = 22790, 7,952,175 slots -- all identical to the true T₂₃), which is the
calibration for what follows. 50 shuffles of the T₁₉ word at fixed histogram,
seed 12345: new G₂ has min 264, median 288, mean 294.6, max 354, and **not one
of the 50 draws returns the truth 204**; the smallest is 29% above it. The
record's five values 282, 324, 276, 330, 324 sit at the 32nd to 90th percentile
of that distribution, so they are ordinary draws and the record's spread was not
lucky. Σg² and N(≥120) move only from 9.2719e+9 to about 9.2890e+9 and from
22790 to about 21000, as recorded. **Histogram-closure refuted, confirmed and
strengthened.**

## Verdicts

| claim | verdict |
|---|---|
| The transport inequality `N_new(θ) ≤ (q−2)N(θ) + 2·Σ_{L≥1} Q_L(θ)` | **STANDS.** Re-derived here from the operator; both multiplicity bounds are one-line theorems; no double counting; the copy boundary is inside the alignment sum by construction |
| `ν_q(i,0) ≤ q−2`, `ν_q(i,L) ≤ 2` for L ≥ 1 | **STAND**, PROVEN, trivially from the definition |
| Certificates 42, 66, 108, 150, 204, 270 | **STAND**, reproduced exactly, independently |
| Truth 42, 66, 108, 150, 204, 258; zero loss at five folds, 0.045 nats at 29 | **STANDS**, and a seventh fold (31: 348 = 348) is added |
| 0 violations at every θ | **STANDS**, and strengthened: 0 violations at six folds, with the L-sum untruncated |
| Sharper than `maxsum_{L+1}` by 3× to 8× in nats | **STANDS** |
| The equivalence stated as `⟺` | **CORRECTION.** The ⟸ direction is false at fold 29 as written (270 vs 258); it holds only with the alternation refinement, and then only as measured |
| Zero loss is the instrument's merit | **CORRECTION.** `M_full` is identically the truth, so the certificate is the operator on its support minus two conditions; the merit is real but it is exactness-by-relaxation, not a tail fact |
| NO-CHAIN on the tile | **STANDS.** But its stated reason ("the rate is A5's cap") is mis-attributed: the fixed-index-gives-a-constant argument carries it, with no cap needed |
| Measured spends K = 1,1,2,2,3,3 | **CORRECTION.** 1, 1, 2, (1 or 2), 3, 2 -- fold 19 is a tie and fold 29's 3 is an artifact of the loose certificate |
| "The 0.18p wall is coordinate-free" | **STANDS**, and the required index is measured to sit within one of the cap at every fold |
| Only max-shape and sum-shape transport at index cost zero | **STANDS**; count shape verified exactly, with the boundary term identified as exactly q gaps |
| Histogram not closed | **STANDS**, strengthened to 50 draws, 0 of 50 reach the truth |

**Overall: STANDS WITH CORRECTIONS.** No soundness hole was found in the
inequality, and every published number reproduced. The corrections are three:
the `⟺` is not an iff at the one fold where the numbers differ; the measured
spend at fold 29 is 2, not 3; and the no-chain verdict's stated reason should be
the fixed-index argument rather than the cap. The one substantive improvement is
free: refining `Q_L` by the alternation walk makes the certificate exact at all
seven folds in reach, and folds the Alternation Lemma into the instrument.

## What should enter the live layer if this stands

Drafted, not applied:

> **The Tail-Count Transport [PROVEN].** Folding T_x by q, the count of new
> windows with sum at least θ satisfies
> `N_new(θ) ≤ (q−2)·N(θ) + 2·Σ_{L≥1} Q_L(θ)`, where `Q_L(θ)` counts old windows
> of L+1 gaps with sum at least θ whose L−1 interior gaps admit a legal walk on
> a 2-set mod q; so `G₂(new)` is at most the largest such window sum. Exact at
> folds 11 through 31, and the exactness is structural rather than fortunate:
> keeping the two endpoint-live conditions as well turns the certificate into
> `G₂(new)` itself, which is why the instrument is a sharp per-level evaluator
> and not a source of a chained bound.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
