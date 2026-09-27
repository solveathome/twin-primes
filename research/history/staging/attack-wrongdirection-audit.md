# The wrong-direction audit: testing the ten live targets for secret TPC-strength before the sessions are spent

<!-- ledger
id: Q-wrongdirection-audit
status: ANSWERED
todo: 1e (retired)
question: Are any of the ten live targets secretly TPC-strength, before the sessions are spent on them?
verdict: The audit closes no target: two of the ten come out TPC-strength and three more carry a TPC-strength face under a quantifier they are likely to drift into, which is a labelling result and not a reason to drop them; item 1e is settled only because the answer was already on disk, and one route-blocking number in it is hand arithmetic and unstamped.
-->

*(2026-08-26. Staging note; nothing here is integrated into a live document,
and no live file was edited. This is an ANALYSIS pass: it runs no producer and
computes nothing that needed one. Every number is either cited to the artifact
that measured it, or is hand arithmetic on cited constants and is marked
[ARITHMETIC] with its inputs. Calibration marked per claim: PROVEN, MEASURED,
HEURISTIC, OPEN. The corpus has recorded four wrong-direction arrivals —
sub-targets pursued as stepping stones that turned out TPC-strength
(`REFUTED.md` rows 27, 64, 65, 66). Nobody had run the test in the forward
direction. This note does.)*

## 0. What is still open, and what this note does not do

- **It does not close a single target.** Two of the ten come out TPC-strength
  and three more carry a TPC-strength face under a quantifier they are likely
  to drift into. None of that is a reason to drop them; the head of a
  programme is allowed to be TPC-strength. The deliverable is the label.
- **It settles item 1e, and only because the answer was already on disk.**
  No new mathematics decided it; two existing artifacts did, and item 1e was
  stale against `REFUTED.md` row 27 for eight days.
- **It contains one route-blocking number that is mine and unstamped**
  (§3.8's sieve parameter s = 1.7829 for Z2's route (b)). It is hand
  arithmetic on two cited constants, it is an obstruction statement about one
  route rather than a theorem, and it has had no adversarial pass.
- **No separation here is a model-theoretic separation.** Every target and TPC
  are statements about the same arithmetic; "strictly weaker" below always
  means *the target does not imply TPC through any bridge this corpus holds*,
  and is witnessed either by an explicit function satisfying the hypothesis
  with TPC undecided, or by the target already being PROVEN while TPC is open.
  That is a weaker notion than the phrase suggests and it is used deliberately.
- **The error direction guarded against.** Declaring a legitimate target
  TPC-strength on a loose implication kills it for nothing. Every (ii) verdict
  below carries a derivation with no unstated hypothesis; where an extra
  hypothesis is needed, the verdict is (iii) and the hypothesis is named.

## 1. The test, which is the corpus's own

`history/staging/attack-block-08-secondmoment.md` §1.1–§1.5 already states the
criterion, and it is used here unchanged [PROVEN, cited not re-derived]:

- **Axis A (tile vs integers).** A statement "every window of length H holds a
  survivor" is TPC-implying exactly when `H ≤ w² − w` and it holds for
  infinitely many w. Above that it is legal, and 4.2665 is a theorem. The open
  band (2, 4.2665] is entirely legal territory. The precise line, verbatim:
  `G₂(w#) = o((log w#)²)` or `≤ (1−ε)(log w#)² i.o.` ⟹ TPC;
  `G₂(w#) = O((log w#)²)` with an unspecified constant ⟹ nothing, OPEN.
- **Axis B (quantifier over w).** Buys nothing. Infinitely-many is already
  fatal; almost-all, for-all and averaged forms are subsets of it.
- **Axis C (all positions vs almost all).** The line sits at empty-density
  ε = 1/W = e^{−(1+o(1))w}, not at any rate polynomial in w.
- **Axis D (which functional).** Only `min_x N(x) ≥ 1` is the target. `E[N] ≥ 1`
  is capacity counting; `P(N = 0) ≤ ε` is Axis C.

Two corpus-specific bridges are added, both PROVEN and both transitioning at
exponent 2 and nowhere else:

- **The Gap Reformulation** (`G2-STATE.md` §1b): `G₂(x#) < x′² − 2` ⟹ Zone
  Postulate at x ⟹ (i.o.) TPC. Exponent 2 **with constant strictly below 1**.
- **The capture identity** (`quadpoint-identity-01.md` §1): `floor_K = T − X(K)`
  exactly, on the stretch `S_Q = [Q², Q′²)`.

## 2. Verdict table

Verdicts: **(i)** strictly weaker than TPC, legitimate stepping stone;
**(ii)** TPC-strength (implies TPC, or more); **(iii)** undetermined.

| # | target | verdict | the argument, one line | what settles it / what to police |
|---|---|---|---|---|
| 1 | Z2's certificate, `Σ_r capU_K(r) ≤ C − 1` ⟺ `X(y) < T` | **(ii) TPC-strength** | the capture identity makes the certificate `T ≥ X(K) + 1`, and `X ≥ 0` forces `T ≥ 1`: a twin pair inside `[Q², Q′²)`, at i.o. Q with Q → ∞, is TPC | settled; carry the label. The legal half is an upper bound on X alone — the *comparison* is the wall |
| 2 | Z2's depth law `y* = h^{1/(2e^γ)}` | **(ii) TPC-strength, and stronger, in the all-Q form** | `y*(Q)` is the least K with `X(K) ≤ T − 1`; since `X ≥ 0` and X vanishes at full depth, **y\*(Q) exists ⟺ T(Q) ≥ 1**, so an asymptotic for y* over all large Q *presupposes* the strong stretch postulate | re-quantify before spending: the conditional form ("on the set where T ≥ 1, ln y*/ln h → 1/(2e^γ)") is legal and is what the 1,227 anchors measure |
| 3 | Item D, `Ĝ(2s) ≤ C₂·Ĝ(s)`, `C₂ < 19.2455` | **(i) trap-free AS WRITTEN — and (ii) under the eventual form** | all-s: the witness `Ĝ(32)/Ĝ(16) = 348/66 = 5.2727` is ON the base-2 chain and `log₂ 5.2727 = 2.3985 > 2`, so the conclusion can never reach limsup < 2. Eventual form (same conclusion): the witness drops out, and past s = 16 the chain carries one datum, `1080/348 = 3.1034 < 4` | keep the all-s quantifier explicit. Trap window under the eventual form: `C₂ ∈ (3.1034, 4)`, `ln C₂ ∈ [1.1325, 1.3863)`, 0.254 nats, floor resting on one literature-grade term |
| 4 | Item A, anchored-aware floor family | **(i) strictly weaker** | Theorem 8's floors are finite per-level certified counts; `staircase-note.md` §10.1: "Nothing here bears on infinitude". A finite-level floor is decidable by enumeration, so it cannot imply TPC | the boundary: any *all-x* floor family with `floor(x) → ∞` certifies unboundedly many twin pairs below x#, hence TPC. Item A is safe exactly while it stays at named levels |
| 5 | Item 1d, (H-sub-pow) | **(i) with unnamed K; (ii) with explicit K < 1.3555** | separation: `f(n) = 2 ln n` satisfies (H-sub-pow) with K = 0 and gives β = 2, so the hypothesis is compatible with TPC undecided. Explicit K < S(16) = 1.3555 gives `β = inf_n (f(n)+K)/ln n < 2` ⟹ TPC | already labelled (`fekete-1d.md` §6; TODO carries the windows). Added: the legal landing zone `K ∈ [1.3555, 7.6394)` is 6.28 nats against the trap's 0.386 — 1d is not a wrong-direction target |
| 6 | Item 1e, is the sieve Gaussian maximal law TPC-implying? | **ANSWERED — and the question is under-specified: two objects, opposite answers** | on `R_H` at the operative window (S-sharp): **YES**, `phase1-T4-maximal-law.md` §2's four-link chain, with `need_sharp/z²` = 0.4913–0.6144 at z = 13..43, below 1 at every level. On the H-free potential `ρ̃` (RML/F4, λ = 0): **NO**, it forfeits the lag-H cancellation and its win condition is α < β₂, never < 2 | nothing further to measure. Item 1e's first move re-measures two things already measured (`rho-maximal-law.md` §4 at z = 13..29; T4 §3 at z = 13..43). Retire it |
| 7 | Item 8, the Buchstab transfer | **(iii) undetermined — legal at fixed u > 2, TPC-strength if uniform in u down to 2** | `bv-import-survey.md` §3.3: "At u = 2 the statement IS the twin conjecture with its HL constant"; the engine runs at u ≈ 2.3–3.4, inside the legal band (2, 4.266). But an asymptotic uniform over u ∈ (2, U] recovers u = 2 by Buchstab iteration, hence HL | cheap and decisive: track the engine's operative u across @17..@97. If u(x) → 2 with the level, item 8's payout form is TPC-strength. If u(x) stays bounded away from 2, it is legal |
| 8 | Z2 route (b), beat the twin density in a rough-pair error term | **(ii) TPC-strength, and stronger** | it is target 1 restated: the error term's only use is to certify `X(y*) < T`, hence `T ≥ 1`. In asymptotic form it delivers T itself, i.e. Hardy–Littlewood in a short interval, strictly above TPC | settled. Added coordinate: the sieve half needs a κ = 2 **lower** bound at s = u*/2 = **1.7829** against β₂ = 4.26645, short by **2.393×** [ARITHMETIC, §3.8] |
| 9 | X-limitation's all-x form (level-uniform max VR) | **(i) strictly weaker — and non-terminal** | the theorem concludes `S(t) = 0` *requires an overlap collapse*; it never concludes `S > 0`. Closing one of two annihilation channels implies no positivity, hence no twin statement | the second channel is the TPC-strength one: bounding `X̄ − X` too gives non-annihilation at the anchor, which is `anchored-note.md` Prop 2 / `REFUTED.md` row 64. Never quote the all-x form as "annihilation is impossible" |
| 10 | Item 0, any exponent below 4.2665 | **(i) the band (2, 4.2665] is genuinely legal** | separation is exhibited, not modelled: α = 4.26645 is PROVEN while TPC is open. Both bridges transition at 2 and nowhere else — the Gap Reformulation needs constant < 1 at exponent 2, and `G₂ ≥ g` gives nothing new above 2 since Iwaniec 1978 already has `g(x#) ≪ x²` | police the *instrument*, not the exponent: RML's legality rests on the **measured** floor crossing in (31, 47], not on a proof, and the ρ → R_H step that turns it TPC-implying is invisible in the delivered exponent |

## 3. The arguments

### 3.1 Z2's certificate [verdict (ii)]

The capture identity is PROVEN and verified at every depth of all 1,227
anchors: `Σ_r capU_K(r) = (C − T) + X(K)`, equivalently `floor_K = T − X(K)`,
with `X(K) ≥ 0` and `X(0) = CC` (`quadpoint-identity-01.md` §1). The
certificate is `Σ_r capU_K(r) ≤ C − 1`, i.e. `floor_K ≥ 1`, i.e.
`T ≥ X(K) + 1 ≥ 1`. So the certificate at Q asserts a twin pair inside
`[Q², Q′²)`. Holding it at infinitely many Q, with Q → ∞, gives unboundedly
many twin pairs, hence TPC by `ZONE-POSTULATE.md` §2's forward direction read
on stretches. No extra hypothesis enters, and the implication does not depend
on K(Q) growing slowly — slow growth is an affordability condition, not a
logical one.

**Why this needs saying even though the corpus half-knows it.** TODO's TARGET
rider does carry "every form above is TPC-strength", and
`quadpoint-identity-01.md` §4 relocates the wall. Item Z2's own body does
not, and it contains the sentence that makes the trap live: "capU_K(r) is an
elementary count ... a Legendre/Buchstab object, no sieve limit invoked in its
statement." That is true and it is about the *statement*. The certificate is
not the statement; it is the *comparison* of that count against C, and the
comparison is the conjecture. The one-line label in §4 fixes this.

The legal residue: an upper bound on `X(y)` alone, or an asymptotic for the
rough-rough census with no comparison to T, is a sieve statement and is not
TPC-strength. Everything on the T side is.

### 3.2 Z2's depth law [verdict (ii), and stronger]

`y*(Q)` is defined as the crossing point: the least K with `X(K) ≤ T − 1`
(`quadpoint-identity-01.md` §2, first bullet). Two facts from the same section
make its existence a biconditional:

- `X(K) ≥ 0` always, so `T = 0` makes `X(K) ≤ −1` unsatisfiable at every K;
- X vanishes at full depth (the full-depth bijection: both-composite pairs
  cannot be rough beyond Q in a finality window), so `T ≥ 1` makes it
  satisfiable at K = full depth.

Hence **`y*(Q)` exists if and only if `T(Q) ≥ 1`** [PROVEN, from the cited
lemma and the definition; one line]. Therefore:

- "`ln y*/ln h → 1/(2e^γ)` along all large Q" ⟹ `T(Q) ≥ 1` for all large Q,
  which is the strong stretch postulate — strictly stronger than TPC
  (`ZONE-POSTULATE.md` §2's strong/weak split, transplanted).
- "… along infinitely many Q" ⟹ TPC.

**The measurement cannot see this.** y* is measured only where it is defined,
so every one of the 1,227 anchors that contributed a band mean has `T ≥ 1` by
construction. The 0.935 → 0.984 approach-from-below is data about the law's
*shape* on the set where it is defined, and carries zero information about the
set. That is worth stating in the item because the item's move (c) proposes a
blind test at 31607 and 1e5: a blind test of the shape is legal and useful; a
blind test cannot bear on the quantifier, and no run ever will.

**The repair is free.** State the law conditionally — "on the set of Q with
`T ≥ 1`, `ln y*/ln h → 1/(2e^γ)`" — and it is legal, it is exactly what is
measured, and work toward proving it is not work toward proving TPC. The
zero-parameter derivation in §3 of that note is a main-term density
computation (`δ_R(y) < 2δ_P`, κ cancelling exactly) and is untouched by the
change; only the quantifier moves.

Item Z2's first move (a), "read Evans at page level, then decide the depth
law's product-form correction", is legal under either quantifier. It is move
(c)'s framing and any future "prove the depth law" that need the conditional
form fixed first.

### 3.3 Item D, the doubling target [verdict (i) as written, (ii) under the eventual form]

**The TRAP-FREE claim verifies, for the target exactly as written.** Re-derived
here from the cited data: `Ĝ(t) = G₂(P(t)#)`; the base-2 chain ratios are
3.0000, 5.0000, 2.2000, 5.2727, 3.1034 at s = 2, 4, 8, 16, 32
(`attack-doubling-01.md` §1, VERIFIED there and independently re-derived in
`redteam-0820-night-proofs.md` §2b). The sup 348/66 = 5.2727 sits at s = 16 =
2⁴, so it lies on the chain and is not dropped by Reduction 3's restriction of
the hypothesis to power pairs `(2^k, 2)`. `log₂(348/66) = 2.3985 > 2`
[ARITHMETIC], so `limsup ≤ log₂C₂` can never deliver limsup < 2 whatever C₂ is
eventually proven. The claim is correct and correctly scoped ("through the
slice's own conclusion").

**The disconfirming half, which the trap grading does not cover.** The
conclusion `limsup ln G₂(x#)/ln x ≤ log₂C₂` does not need the hypothesis at
every s. It needs it eventually: from `Ĝ(2^{k+1}) ≤ C₂·Ĝ(2^k)` for all
`k ≥ k₀` one gets `Ĝ(2^k) ≤ C₂^{k−k₀}·Ĝ(2^{k₀})`, so
`ln Ĝ(2^k)/(k ln 2) → ≤ log₂C₂`, and (H-mono) — PROVEN, `fekete-1d.md` §5 —
bridges to all real x. The eventual form yields the identical prize.

Under the eventual form the s = 16 witness is not binding, and the base-2 chain
past s = 16 carries **exactly one measured ratio**: `Ĝ(64)/Ĝ(32) = 1080/348 =
3.1034` [ARITHMETIC on the cited ladder terms], and it rests on Wang 2024's
A144311 a(18) — literature grade, not custody. `log₂ 3.1034 = 1.6338 < 2`
[ARITHMETIC]. So every `C₂ ∈ (3.1034, 4)` is consistent with all data past the
witness **and** TPC-implying: trap window `ln C₂ ∈ [1.1325, 1.3863)`, width
0.254 nats.

This is a live risk rather than a formal quibble, for two reasons. First, an
asymptotic argument produces the eventual form by default; "for large s the
entering primes cannot make a run longer than …" is the natural shape of any
attack, and `attack-doubling-01.md` §3's own Bridging-Lemma route
(`Ĝ(2s) ≤ (K*+1)·Ĝ(s)`) delivers per-step certificates whose all-s statement
would have to be proven asymptotically. Second, the next chain datum is
`Ĝ(128) = G₂(127#)`, which is out of reach by many orders of magnitude, so no
computation will ever close the eventual window.

**The label, therefore, is a quantifier discipline, not a demotion.** Item D
stays live and stays the best-shaped target in the queue. It carries: *the
trap is void for the all-s form only; state and keep the all-s quantifier, or
the target becomes TPC-implying at every C₂ < 4.*

A second observation, not a trap: `attack-doubling-01.md` §3 records that an
a-priori K* bound is "the entering primes' two-class covering-run problem on
the level-s slot sequence — the same two-class Jacobsthal problem one level
up", and that C₂ shows no drift while K* drifts up (`ln(K*+1)` slope
0.6881 ± 0.1328). That is self-similarity, which is a hardness signal short of
circularity, and it is already on the record.

### 3.4 Item A, the anchored floors [verdict (i)]

The deliverable is named in the source and is finite: `paper/staircase-note.md`
§10.1, verbatim — "**Finite results only.** Theorems 3, 6 hold for all x; the
certified floors (Theorem 8) are six finite computations. **Nothing here bears
on infinitude**, and the K* escalation is evidence *against* this route
scaling, not for it." The unified-cap lemma `fresh(q) ≤ capU_K(q) ≤ cap_K(q)`
is PROVEN and red-team re-derived; the floors 36@11 and 115@13 at K = 0 are
per-level numbers at the anchored point, reaching truth 45/307 at K = 8/28.
A statement of that shape is decidable by enumeration at its own level, so it
cannot imply an infinitude statement. Verdict (i), and the value is
methodological: the separation from the class-uniform ceiling advmin@11 = 16
(`REFUTED.md` row 77) is real and every unified floor at @11 exceeds it.

**The boundary, which the item should carry.** Theorem 8's conclusion is a
count of **twin prime pairs** in the tile. So any all-x floor family with
`floor(x) → ∞` certifies unboundedly many twin prime pairs below x#, hence
TPC. Both of item A's stated first moves point that way — (a) the unified
ladder at @17+ extends the level list, which is safe; (b) "does the depth-cost
curve improve with level" is the beginning of a law in x, which is not. The
label distinguishes them.

### 3.5 Item 1d, the Fekete route [verdict (i) unnamed K, (ii) explicit K]

The corpus already labels this correctly and TODO already carries the trap
windows; nothing here overturns that. Two additions.

**The separation, made explicit.** (H-sub-pow) with an unnamed K does not
imply TPC, and the witness is one function: `f(n) = 2 ln n` (i.e.
`Ĝ(n) = n²`) satisfies `f(b^{k+1}) ≤ f(b^k) + f(b) + K` with equality at
K = 0, and yields β = 2, on which TPC is undecided
(`attack-block-08-secondmoment.md` §1.1: exponent 2 with unspecified constant
implies nothing). So the hypothesis's conclusion — limit existence — is
compatible with TPC undecided, and the honest prize is exactly what
`fekete-1d.md` §6 says it is.

**The legal landing zone is wide, and this is the reason 1d is not a
wrong-direction target.** From `β = inf_{n≥2}(f(n)+K)/ln n` evaluated at the
best reachable base n = 16, with `f(16) = ln 66 = 4.18965` and
`ln 16 = 2.77259` [ARITHMETIC on custody terms]:

- `K < S(16) = ln(256/66) = 1.3555` gives β < 2: TPC-implying, the known trap.
- `K < 4.26645·ln 16 − ln 66 = 7.6394` gives β < β₂: an unconditional
  improvement of the proven exponent ceiling, no TPC.

So the trap is a 0.386-nat sliver (custody floor 0.9694 to ceiling 1.3555)
against a 6.28-nat legal band, and the inf is over all n so a better base only
widens the legal band further. That is the same shape as item D's landing
zone and it should be quoted beside the trap windows, which currently appear
in TODO without it.

### 3.6 Item 1e, answered [the question is under-specified; both answers exist]

**"The sieve Gaussian maximal law" names two different objects in this corpus,
and they have opposite verdicts.** That is the answer to item 1e, and it makes
the item's stated first move ("same method, sieve version, on the same 18
exact levels") a re-measurement of two things already measured.

**(a) On the remainder `R_H` at the operative window — TPC-implying.**
`sup_x |R_H(x)| ≤ √(2 lnW)·√(⟨R²⟩_H)`, the exact analogue of the elementary
law. `phase1-T4-maximal-law.md` §2 gives the chain in four links, all PROVEN
except the law: (1) the law gives `HM > √(2 lnW ⟨R²⟩_H)` hence
`T(x) = HM + R_H(x) > 0` at every x; (2) the Brüdern–Fouvry pointwise
inequality makes T(x) a lower bound on the twin-admissible count in
(x, x+H]; (3) `H = need_sharp < z²`, so the window anchored at x = w sits
inside the zone (w, z²); (4) a z-rough pair below z² is a twin prime pair.
Strong Zone Postulate at every z, hence TPC. The load-bearing measurement is
`need_sharp/z²` = 0.5917, 0.4913, 0.5291, 0.6144, 0.5184, 0.5931, 0.5179,
0.5431, 0.6106 at z = 13..43 — below 1 at every level, mean 0.5566, OLS slope
against ln z `+0.0104 ± 0.0414` [MEASURED, T4 §3]. It survives the stricter
w² convention (0.661–0.900, below 1 at every level) and it survives a loose
constant: `C_crit` = 1.36–2.23, so a law loose by 50% is still TPC-implying.

**(b) On the H-free potential `ρ̃` — not TPC-implying, and measured TRUE.**
F4 at λ = 0, C = 1: `sup|ρ̃_z| ≤ √⟨ρ²⟩·√(2 lnW)`. `C_true` = 0.6362, 0.6044,
0.8022, 0.7554, 0.7830 at z = 13..29, exact over complete periods, margin
20–40% [MEASURED, `rho-maximal-law.md` §4]. Its win condition is α < β₂, not
α < 2, and the mechanism of the difference is named and is not bookkeeping:
the ρ form forfeits the lag-H cancellation between ρ(x) and ρ(x+H), which
fact V1 (`g | H` kills a pair's contribution) identifies as where all the
cancellation lives.

**So the asymmetry is the answer**: the legal law is so far true; the
TPC-implying law is already false as literally stated (violated at z = 19 by
0.6%, T4 §4), which is the sharpest possible statement of "it is as hard as
the truth, and the truth there is TPC".

**Item 1e is also stale.** Its stated win — "death retires item 0's ladder and
shrinks the programme honestly" — was collected on 2026-08-18: `REFUTED.md`
row 27 retired the θ ladder citing exactly this. The item should be retired
into a one-line pointer rather than worked.

**Carried caveat, from T4 itself (§6):** S-sharp is a strictly stronger
hypothesis than the one the corpus writes down (S-crude, the ρ form), and T4
flags this as the strongest objection to its own report. Its defence is that
both are the same template on members of the same sawtooth family and that
the elementary criterion attack 8 used is the H-dependent one. That defence is
an argument, not a proof, and the (a)/(b) split above is the honest way to
carry it: the verdict is per-object, and each object has its own.

### 3.7 Item 8, the Buchstab transfer [verdict (iii)]

The object is the multiplicative factor
`B(q,K) = ⟨ω(ln n/ln y_K)⟩/⟨ω(ln n/ln x)⟩` transferred to the conditioned
ensemble of shifted rough pairs (`certificate-engine.md` §"Buchstab Transfer
Hypothesis"). ω itself is a theorem; the transfer is the heuristic.

The corpus already prices the boundary, `bv-import-survey.md` §3.3: for
`y = T^{o(1)}` the two-dimensional fundamental lemma gives the pair-Buchstab
asymptotic now, elementarily; for `y = T^{1/u}` with u bounded it is open,
one-sided only, with lower bounds for `u > β₂ = 4.26645`; and **"At u = 2 the
statement IS the twin conjecture with its HL constant."** The engine runs at
`u ≈ 3.4` (bare positivity) and `u ≈ 2.3` (90% depth) at @97 — inside the open
band (2, 4.266), so at those fixed u the transfer is not TPC-strength by the
corpus's own line.

**Where it turns.** An asymptotic uniform over `u ∈ (2, U]` reaches u = 2 by
the Buchstab identity `S(A,z) = S(A,z₁) − Σ_{z₁≤p<z} S(A_p,p)`, whose terms
run at varying level: uniformity over the range is exactly what lets the
recursion be summed down to `z = √T`, where rough equals prime and the
statement is Hardy–Littlewood. So a uniform-in-u transfer is TPC-strength and
more; a fixed-u transfer at u bounded away from 2 is not.

**What settles it, and it is cheap.** Track the engine's operative
`u = ln W/ln y_K` across @17, @19, @23, @29, @97 at the depth where the
certificate actually binds. Two outcomes: if `u(x) → 2` as the level rises,
item 8's *payout* form is TPC-strength and the item should carry that label
before any proof attempt; if `u(x)` stays bounded above 2, the item is legal.
The numbers exist at @97 (2.3 and 3.4) and the per-level values are a re-read
of `natal-cap-28-analytic-certificate.js` outputs, not a new run. This is the
single highest-value cheap check the audit generated.

**A naming defect, already adjudicated and never applied.** TODO item 8 reads
"the certificate law's one heuristic". QC CC-3
(`history/staging/qc-compound.md`, and applied-F D-10) found there are **two**
independent unproven ingredients and prescribed replacement wording, which
TODO:307 already uses and TODO's item-8 title does not. The proposed line in
§4 folds that fix in.

### 3.8 Z2 route (b), beating the twin density in a short-interval error term [verdict (ii), and stronger]

**It is target 1 restated.** The error term's only consumer is the comparison
`X(y*) < T`; by the capture identity that is `floor ≥ 1`, hence `T ≥ 1`. In
its asymptotic form it is stronger still: an asymptotic for the rough-pair
census on the stretch, at relative precision `o(1/ln²h)`, together with the
mixed-pair count, returns T asymptotically — Hardy–Littlewood for twins in a
short interval, strictly above TPC. `quadpoint-identity-01.md` §4 already
names the precision class as the parity wall's; this note adds only that the
implication is exact, not a hardness analogy.

**The sieve coordinate, which is new here and is mine.** [ARITHMETIC, unstamped,
no adversarial pass.] Through the identity `T = R(y) − M(y) − X(y)` — R the
y-rough pairs, M the mixed pairs — the only sieve-theoretic path to `X < T` is
a **lower** bound on R, which is a dimension-2 lower-bound sieve on the
stretch. Its parameter: the stretch has length `N = Q′² − Q² ≈ 2Q ln Q`, so
`ln N = (1 + o(1)) ln Q = (1/2 + o(1)) ln h`; the level of distribution for an
interval sieve with two classes per prime is `D = N^{1−o(1)}`; and the
crossing law's exact form `u·ω(u) = 2` puts the operative roughness at
`ln y* = ln h/u*` with `u* = 3.565845` (both cited from
`quadpoint-prior-art.md` via TODO Z2). Hence

> `s = ln D/ln y* → u*/2 = 1.7829`, against `β₂ = 4.26645028414864191641`.

Short by a factor **2.393**. For comparison, a direct twin lower bound in the
same window needs `y = √h ≈ Q ≈ N`, i.e. `s ≈ 1`, short by 4.266. So the
census reformulation buys a factor 1.78 in the sieve parameter and still leaves
2.39, and no κ = 2 lower bound below β₂ is available
(`sift-limit-attack.md` §2: the exact value of β(κ) is unknown for κ > 1/2
except κ = 1, and no example blocks the band, but no lower-bound sieve below
4.2665 has been exhibited either).

**So TODO Z2's move (b) has its honest answer: the wall's fourth naming, with
a number.** That is a real deliverable — the frame now says *how far* short,
in the one currency the sieve literature trades in — and it is not a route.

### 3.9 The X-limitation theorem's all-x form [verdict (i), non-terminal]

**Lead with the disconfirming evidence.** Of the two trends that motivated the
Loudness Ceiling Conjecture, one is REFUTED: max VR reads 2.777, 2.352, 2.143,
**2.293** at @11/@13/@17/@19 — down then up, so "max VR falls" is dead
(`natal-cap-31-calm-vs-kill.md`). Only the driver `S̄/√(K·V̄)` trend survives
(3.12, 4.88, 9.75, 24.96). The theorem itself is PROVEN at exactly four levels
and nowhere else, and the corpus already forbids writing "from x = 13 upward"
as a proven scope.

**The verdict.** The all-x form — the Loudness Ceiling Conjecture,
`max_t VR(t) < S̄²/(K·V̄)` for every x ≥ 13, which the note shows is exactly
the theorem's own per-level hypothesis — is **not** TPC-strength. The
theorem's conclusion is conditional: `S(t) = 0` *requires* an overlap collapse
`X̄ − X ≥ S̄ − max|D|` (213 = 8.2 σ_X at @13, 3073 = 14.7 σ_X at @17, 46,252 at
@19). It never concludes `S > 0`. Closing the strike channel while leaving the
overlap channel open yields no positivity statement, hence no statement about
twins, at any level or in the limit. Legal, and legal for a reason that also
caps its value.

**The boundary to police.** The natural next step — bounding the overlap
collapse as well, so that `X̄ − X < S̄ − max|D|` and therefore `S(t) > 0` at
every rotation including the anchor — **is** TPC-strength: non-annihilation at
the anchored point, infinitely often, is `paper/anchored-note.md` Proposition
2, the weakest sufficient statement on the β side, and `REFUTED.md` row 64
records that any constant bound on the anchored δ is TPC-strength through the
exact identity `(1+δ)(1+F) = 1+ρ`. So the item is safe while it stays on the
strike channel and crosses the line the moment it touches the overlap channel.

### 3.10 Item 0, the exponent band (2, 4.2665] [verdict (i), with the instrument flagged]

**The band is legal, and the separation is exhibited rather than modelled.**
`G₂(x#) ≪_ε x^{4.26645+ε}` is PROVEN and TPC is open, so at least one point of
the band is demonstrably not TPC-strength. `attack-block-08-secondmoment.md`
§1.2 states the general form: the open band (2, 4.2665] is entirely legal
territory. Both bridges this corpus holds transition at 2 and at no
intermediate value:

- **Gap Reformulation.** `G₂(x#) ≪ x^α` with α > 2 never falls below `x′² − 2`
  at any x, so it certifies no zone. The transition needs exponent 2 with
  constant strictly below 1; with an unspecified constant it implies nothing.
- **The Jacobsthal shadow.** `G₂ ≥ g` pointwise means a G₂ upper bound at α
  gives `g(x#) ≪ x^α`. Iwaniec 1978 already gives `g(x#) ≪ x²`, so no α > 2
  produces a new one-class consequence and Erdős #687 is untouched. The
  shadow's prize-adjacency (`ZONE-POSTULATE.md` §6, route A) is an
  exponent-2 phenomenon only.

So intermediate improvements to 4.0 or 3.5 are not secretly blocked, and the
band is partially reachable in principle. That answers the question as posed.

**The disconfirming half, and it is where the risk actually lives.** Item 0's
named legal target is the ρ maximal law, and *its* legality is a property of
the instrument, not of the exponent it delivers. Two flags:

1. **RML's legality is MEASURED, not proven.** `rho-maximal-law.md` Rider 2:
   the deliverable exponent floor `th(nP)` reads 1.5963, 1.7070, 1.7960,
   1.7710, 1.7718, 1.8569 at z = 13..31 — **below 2** — and `≥ 2.0106` at
   z = 47. It is the crossing in (31, 47] that removes the TPC-grade
   deliverable and keeps the target legal asymptotically. That crossing is a
   measurement on a prefix bound at one level, not a theorem. If the floor sat
   below 2 for all z, RML(α) would be TPC-implying at every reachable level.
   The guard to carry beside item 0 is Rider 2's floor, not β₂.
2. **The instrument boundary is invisible in the exponent.** The step from
   `ρ̃` to `R_H` at the operative lag is the whole difference between legal and
   TPC-implying (§3.6), and a sharpening that recovers the lag cancellation
   crosses it without changing the exponent the law advertises. Any future
   strengthening of RML must state, in the same sentence, whether it prices
   the certificate with the lag cancellation forfeited.

## 4. Proposed one-line labels — PROPOSED TEXT ONLY, no file edited

Each is a single line to be appended to the named TODO item by whoever owns
the edit. Nothing below has been applied.

**Z2 (after "The certificate is Σ_r capU_K(r) ≤ C − 1 with K = K(Q) growing
slowly."):**
> CALIBRATION: the certificate is TPC-STRENGTH by the capture identity —
> `floor_K ≥ 1` is `T ≥ X(K)+1` hence `T ≥ 1`, a twin in the stretch — so
> "elementary count" describes the statement of capU, never the comparison
> against C, which is the conjecture. The legal half of this item is an upper
> bound on X alone (`attack-wrongdirection-audit.md` §3.1).

**Z2's depth law (after the y* = h^{1/(2e^γ)} sentence):**
> QUANTIFIER: `y*(Q)` exists ⟺ `T(Q) ≥ 1`, so the ALL-Q asymptotic form of
> this law is stronger than TPC and the i.o. form is TPC. State it
> conditionally — on the set where T ≥ 1 — before any proof work; the measured
> band means live on that set by construction and can never test the
> quantifier (`attack-wrongdirection-audit.md` §3.2).

**Z2's move (b) (replacing the "decide honestly whether …" clause):**
> ANSWERED (`attack-wrongdirection-audit.md` §3.8): TPC-strength, and stronger
> in asymptotic form. The sieve half needs a κ = 2 LOWER bound at
> `s = u*/2 = 1.7829` against `β₂ = 4.26645`, short by 2.393× — against 4.266×
> for a direct twin bound in the same window. Deliverable is the wall's fourth
> naming with a number, not a route.

**D (after the trap-free sentence):**
> TRAP-FREE FOR THE ALL-s FORM ONLY. The eventual form
> (`∀k ≥ k₀: Ĝ(2^{k+1}) ≤ C₂Ĝ(2^k)`) yields the identical limsup conclusion,
> drops the s = 16 witness, and past it the chain carries one datum
> `1080/348 = 3.1034 < 4` at literature grade — so every `C₂ ∈ (3.1034, 4)` is
> data-consistent and TPC-implying (trap `ln C₂ ∈ [1.1325, 1.3863)`, 0.254
> nats). Keep the all-s quantifier explicit in any attack
> (`attack-wrongdirection-audit.md` §3.3).

**A (after "Anchored-point quantifier discipline per Theorem 8."):**
> SCOPE: finite per-level counts only (`staircase-note.md` §10.1). Any all-x
> floor family with `floor(x) → ∞` certifies unboundedly many twin PRIME pairs
> below x# and is therefore TPC-strength; first move (a) is safe, first move
> (b) begins a law in x and must be posed at named levels
> (`attack-wrongdirection-audit.md` §3.4).

**1d (after the trap windows):**
> …and the LEGAL landing zone beside them: an explicit `K ∈ [1.3555, 7.6394)`
> gives `β ≤ (ln 66 + K)/ln 16 < β₂` with no TPC content — 6.28 nats against
> the trap's 0.386. Unnamed K is separated from TPC outright (`f(n) = 2 ln n`
> satisfies (H-sub-pow) at K = 0 with β = 2)
> (`attack-wrongdirection-audit.md` §3.5).

**1e (replacing the item):**
> **1e. ANSWERED and RETIRED** (`attack-wrongdirection-audit.md` §3.6). The
> phrase names two objects with opposite verdicts: on `R_H` at the operative
> window the law is TPC-IMPLYING (`phase1-T4-maximal-law.md` §2;
> `need_sharp/z²` = 0.49–0.61 at z = 13..43, `C_crit` 1.36–2.23) and is already
> false as literally stated at z = 19 by 0.6%; on the H-free potential `ρ̃` it
> is LEGAL and measured TRUE (`C_true` = 0.60–0.78 at z = 13..29,
> `rho-maximal-law.md` §4), because it forfeits the lag-H cancellation. The
> item's stated win was collected 2026-08-18 (`REFUTED.md` row 27).

**8 (replacing the item's first clause, folding in QC CC-3's unapplied fix):**
> **8. Prove the Buchstab transfer** (one of the certificate engine's TWO
> unproven ingredients; the other is the Tail Comb Equidistribution
> Conjecture, item 11c). CALIBRATION: legal at fixed `u > 2` (engine runs
> u ≈ 2.3–3.4 at @97), TPC-strength if quantified uniformly over `u ∈ (2, U]`,
> since Buchstab iteration then reaches u = 2 where the statement IS Hardy–
> Littlewood (`bv-import-survey.md` §3.3). CHEAP DECIDER: track the engine's
> operative u across @17..@97 from existing outputs; `u(x) → 2` means the
> payout form is TPC-strength (`attack-wrongdirection-audit.md` §3.7).

**X (added to the X-channel item, or to the X-limitation's home line):**
> The all-x form (Loudness Ceiling) is LEGAL and NON-TERMINAL: it closes the
> strike channel only, and `S(t) = 0` remains possible by overlap collapse, so
> no positivity and no twin statement follows. Closing the overlap channel too
> IS TPC-strength (`anchored-note.md` Prop 2; `REFUTED.md` row 64). Never
> quote it as "annihilation is impossible"
> (`attack-wrongdirection-audit.md` §3.9).

**0 (after "Named legal target: the ρ maximal law."):**
> The BAND is legal — 4.26645 is proven while TPC is open, and both bridges
> transition at exponent 2 with constant < 1 and nowhere else — but the
> INSTRUMENT's legality is MEASURED, not proven: it rests on the deliverable
> floor `th(nP)` crossing 2 in (31, 47] (`rho-maximal-law.md` Rider 2; below 2
> at every z ≤ 31). Any sharpening that recovers the lag-H cancellation
> crosses into the TPC-implying class without changing the advertised exponent
> (`attack-wrongdirection-audit.md` §3.10).

## 5. NOT REACHED

- **No producer was written and none was run.** §3.8's sieve parameter and the
  §3.3/§3.5 windows are hand arithmetic on cited constants. If any of them
  enters a live document it needs a stamped producer first.
- **No adversarial pass** on any verdict here, and the Z0 roundup already owes
  seven documents. §3.2 and §3.3 are the two that most need one: each turns on
  a quantifier reading, and a quantifier reading is exactly the class of error
  this note is about.
- **§3.7's decider was not run.** The engine's operative u across levels was
  not extracted; the @97 pair (2.3, 3.4) is cited from
  `bv-import-survey.md` §3.3 and nothing else was read.
- **Items Z3, Z4, Z5, Z5b, Z6, 1c, 1, 4, 6, 9, 10, 11 were not audited.** The
  brief named ten targets and this note answers those ten. Z5b's closing
  question ("whether any structural property of these columns is FORCED rather
  than expected") reads like the same shape and was not tested.
- **The prior-art question was not touched anywhere.** Nothing here claims
  novelty for any observation, and §3.8's sieve-parameter framing in
  particular is routine sieve bookkeeping that a specialist would write down
  in one line.

---

*Staging note; process record. No live document carries any of this yet, and
the labels in §4 are proposed text awaiting the owner's edit. See
`research/history/CHANGELOG.md` for the corpus rule.*
