# Attack angle 2 on L: prove the bridge, then take the sharpest transportable ceiling

<!-- ledger
id: Q-foldL-bridge
status: ANSWERED
todo: none
question: Does the bridge from a fold's kill count to L hold, and what is the sharpest transportable ceiling it gives?
verdict: The bridge is PROVEN and was already in the corpus, so the job was custody rather than a new theorem; the new pair-window rung is exact at all eight diagonal cells, and the best fully-proven transportable ceiling stays near 0.18p and beats the requirement nowhere.
-->

*(2026-08-19. Engine and embedded output: `research/attack-foldL-02-bridge.js`.
Calibration marked on every claim. STAGING: nothing here has been integrated
into a live document.)*

## 0. Pre-registration, written before the first run

1. The bridge holds at all eight diagonal cells; my recomputation reproduces
   A5 Theorem B's published row digit for digit.
2. R1 tightens six of eight cells against the brief's stated form and **zero**
   cells against published Theorem B.
3. A new pair-window rung will beat both and carry no G2/(3p) cap.
4. The best fully-proven transportable ceiling stays near 0.18p and beats the
   requirement nowhere.

All four held. Item 3 held more strongly than predicted: the new rung is not
merely better, it is **exact at all eight cells**.

## 1. The bridge: PROVEN, and it is already in the corpus

The bridge the brief asks to prove or refute is **A5 Theorem B**
(`research/a3-05-bound-L.md` §5), proven there on 2026-08-16. The brief's
stated form — floor `2p−2` per gap, summed — is the strictly weaker
*condition (i)* form, which that file prints on the row above. So the correct
verdict is not "new theorem" but **PROVEN, already held, and my job was custody
plus sharpening**.

> **Theorem B.** L ≤ 1 + m*, where m* = max{m : maxsum_m(T_x) ≥ c_min(m)}.

Every step of the brief's checklist, settled:

**The definition of L.** `research/kappa-not-L.md` line 7: "L, the longest
adjacent-kill run". `research/a3-05-bound-L.md` §1: *"L = L(T_x, p) is the
largest number of cyclically consecutive slots whose residues modulo p all lie
in one set {a, a−2}."* This is the **covering form**, a free.

**Interior gaps are exactly L−1.** L slots carry L−1 gaps between them. The
"1 +" in the bound is that conversion and nothing else.

**Each gap is ≡ 0 or ±2 (mod p).** A8's Lemma 1, quoted from
`research/a3-05-bound-L.md` §2: *"Suppose s_j and s_{j+1} both lie in {a, a−2}
modulo p, with p > 2. Then g_j is congruent to 0, +2 or −2 modulo p. More
precisely, if s_j = a then g_j is 0 or −2, and if s_j = a−2 then g_j is 0 or
+2."*

**Hence each gap is ≥ 2p − 2η, not 2p − 2.** The brief's "≥ 2p−2" is right only
for p ≡ 1 (mod 6). Re-derived: gaps are multiples of 6, p is coprime to 6, so
each class is one AP of modulus 6p, and with η = +1 for p ≡ 1 and η = −1 for
p ≡ 5 the least members are 6p, (3+η)p+2, (3−η)p−2. The floor is **θ = 2p − 2η**,
which is 2p+2 at p = 11, 17, 23, 29 — four of the eight diagonal cells. Verified
against the qualifying-value sets at all eight (reading 2 of a3-05).

**"Consecutive in the gap word" — the one step that needed real work.** The
fold kills, in the big tile of width pW, exactly the slots v ≡ 0 or −2 (mod p):
a *single* 2-set globally. Per copy k that reads as t ≡ −kW or −kW−2, so the
2-set **changes at every copy boundary**, and a kill run may straddle one. The
pinned form (one fixed a) would miss such a run. Two facts rescue it:

- The big tile's slot sequence before deletion is T_x's cyclic sequence
  traversed p times, so **the big tile's gap word is T_x's cyclic gap word
  repeated p times**, boundary gap included (the wrap gap W − s_N + s_1).
- In T_x coordinates the boundary condition reads
  `t_1 − t_N ≡ −W + {0, ±2}`, hence `g_wrap ≡ {0, ±2} (mod p)` — the same
  condition as every interior gap.

So a straddling run still occupies **consecutive gaps of T_x read cyclically**,
and the covering form is the correct one. **VERIFIED** (reading 7): the big tile
is rebuilt outright at the first five cells and its longest adjacent-kill run
equals the covering-form DP at all five.

**And the straddle path is exercised, not merely assumed absent.** The same
reading counts maximal kill runs of length ≥ 2 and how many cross a copy
boundary: at (T_5, 7) there are 4 such runs and **2 of them straddle**, the
longest straddling run having length 2, which is the extremal run and equals
true L. So the case that would break the pinned form does occur, and the
covering form gets it right. At the other four cells no run of length ≥ 2
straddles (0 of 6, 0 of 73, 0 of 1088), which is expected — a boundary crossing
costs a factor of about 1/N — so fold 7, with N = 3, is the only cell on the
reachable ladder where the path can be stressed at all.

**The off-by-one convention that Theorem B does not state.** maxsum_m(T_x) is a
valid ceiling on m consecutive big-tile gaps only for **m ≤ N(T_x)**; beyond
that one must add ⌊m/N⌋·W. N = 3 at the smallest cell against m* = 1, so it is
satisfied everywhere on the ladder, but it is a hypothesis and the printed
theorem omits it. Recommend adding it.

## 2. The eight-cell verification table

| (T_x, p) | θ | 6p | L0 | **LB** | LR | **LP** | LV | **LVP** | true L |
|---|---|---|---|---|---|---|---|---|---|
| (T_5, 7) | 12 | 42 | 3 | **2** | 3 | **2** | 3 | **2** | 2 |
| (T_7, 11) | 24 | 66 | 2 | **2** | 2 | **2** | 1 | **1** | 1 |
| (T_11, 13) | 24 | 78 | 8 | **2** | 4 | **2** | 2 | **2** | 2 |
| (T_13, 17) | 36 | 102 | 5 | **4** | 3 | **2** | 2 | **2** | 2 |
| (T_17, 19) | 36 | 114 | 11 | **4** | 5 | **3** | 2 | **2** | 2 |
| (T_19, 23) | 48 | 138 | 8 | **4** | 4 | **3** | 3 | **3** | 3 |
| (T_23, 29) | 60 | 174 | 10 | **5** | 5 | **3** | 3 | **2** | 2 |
| (T_29, 31) | 60 | 186 | 13 | **6** | 6 | **4** | 4 | **4** | 4 |

- **L0** = 1 + max{m : maxsum_m ≥ mθ}, the brief's stated bridge.
- **LB** = Theorem B.
- **LR** = 1 + longest run of consecutive gaps ≥ θ (a3-05 §8).
- **LP**, **LV**, **LVP** are new; see §4.
- The last column is computed here by an independent kill-graph DP.

**Custody (reading 10): 47 cross-checks against four embedded artifacts, all
agree.** G2 and D against `research/exact-g2-ladder.js`; maxsum_m(T_x) for
m ≤ 3 against `research/attack-0c0e-01-deleted-family.js`; maxsum_1..6(T_29)
against `research/gate-multiplies-03.js` via `research/gate-multiplies.md` §8;
and the true-L, condition-(i) and Theorem B rows against
`research/a3-05-bound-L.md` line 185. Nothing here contradicts anything bound.

## 3. R1: the alternation constant, and what it moves

R1's exact best constant is Corollary A1 and it is already inside Theorem B:

> c_min(m) = 3pm for m even, and c_min(m) = 3pm − p − 2η for m odd,

from pairing the gaps and applying Theorem A (adjacent pairs sum to ≥ 6p
exactly), with a leftover single gap costing θ = 2p − 2η. The universal weak
form c_min(m) ≥ 3pm − p − 2 is what Theorem B's proof actually uses.

**R1 tightens six of eight cells against the brief's bridge** (8→2, 5→4, 11→4,
8→4, 10→5, 13→6) and **zero cells against published Theorem B**, exactly as
pre-registered — because Theorem A is attained with equality at all seven folds
with L ≥ 2 (a3-05 reading 4). The residue side has nothing further to give *in
the sum form*.

## 4. The new rung, and it is exact

Theorem B spends the two proven facts as **one sum**. Spend them instead as a
**local window condition on the gap word** and three new ceilings appear, all
proven by the same two facts and all computable on the old gap word alone in
O(D) with no fold in memory:

- **LR** = 1 + longest run of consecutive gaps ≥ θ. (Already in a3-05 §8.)
- **LP** = 1 + longest run of consecutive gaps each ≥ θ **and** every adjacent
  pair summing ≥ 6p. **NEW.**
- **LV** = 1 + longest run of consecutive gaps whose *values* all qualify
  (≡ 0, ±2 mod p, and a multiple of 6). **NEW.**
- **LVP** = LV's condition plus the 6p pair floor. **NEW.**

Each is proven because a run of length L exhibits L−1 consecutive gaps meeting
every one of those conditions. The ladder L0 ≥ LB, LR ≥ LP ≥ LVP ≥ LA is forced
and holds at all eight cells (reading 2 checks it).

> **LVP = true L at all eight diagonal cells, slack zero.** Mean over the eight
> cells: 2.250 against Theorem B's 3.625.

**And LVP carries no G2/(3p) structural cap.** a3-05 §7's ceiling —
"Theorem B can never prove L below G2(T_x)/(3p)" — holds because maxsum_m ≥ G2
always, so one record gap subsidises the whole window. LVP is a run-length
statistic with no such floor: it returns 1 the moment no two consecutive gaps
both qualify. **So the 0.18x wall is a property of the SUM form only.** The
obstruction moves entirely onto bounding the run length, which is a3-05 §8's
hypothesis H''. This does not weaken the wall — it relocates it onto an object
that is at least allowed to be polylog.

## 5. R2: the best fully-proven ceiling as a function of (G2, p, k)

**Survey of what is actually proven about maxsum_k** (reading 8, all tested at
all eight cells):

| handle | status | holds? |
|---|---|---|
| maxsum_1 = G2 | definition | — |
| monotone: maxsum_{k+1} ≥ maxsum_k | PROVEN (gaps positive) | yes, 8/8 |
| averaging: maxsum_k ≥ max(G2, k·m̄) | PROVEN (a max beats a mean) | yes, 8/8 |
| **subadditive: maxsum_{a+b} ≤ maxsum_a + maxsum_b** | **PROVEN (split the window)** | **yes, 8/8** |
| super-additive: maxsum_{a+b} ≥ maxsum_a + maxsum_b | not proven | **fails, 8/8** |

**Subadditivity is the only proven UPPER handle**, and there is no
super-additive one to be had — it fails at every cell, so the brief's question
about "corpus-proven super/sub-additivity in k" is settled negatively on the
super side. Iterating subadditivity gives maxsum_k ≤ k·G2, and Theorem B then
reads k·G2 ≥ 3pk − p − 2, i.e.

> **L ≤ 1 + (p+2)/(3p − G2), valid only while G2 < 3p.**

| p | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|---|
| G2 | 12 | 30 | 42 | 66 | 108 | 150 | 204 | 258 |
| 3p | 21 | 33 | 39 | 51 | 57 | 69 | 87 | 93 |
| ceiling | **2.000** | 5.333 | vacuous | vacuous | vacuous | vacuous | vacuous | vacuous |

Exact at fold 7. **G2 ~ 0.55x² overtakes 3p at fold 13 and never returns**, so:

> **There is no nontrivial fully-proven closed-form (G2, p, k) ceiling on L
> beyond fold 11.** a3-05's 0.18p is Theorem B combined with the *measured* G2
> law and an *exactly computed* maxsum table. It is a projection, not a
> closed-form theorem, and it should be quoted that way.

Also settled: **Theorem A's pair-sum does not apply inside maxsum windows.**
maxsum's windows are arbitrary windows of the gap word with no residue
constraint; Theorem A constrains only the gaps of a *run*. It proves no
maxsum-window structure at all.

**Does anything beat 0.18p?** Per-fold, yes and by a lot: the best proven
ceiling is below the 0.18p column at all eight cells (2 against 5.58 at fold
31), averaging 2.250 against a 0.18p column running 1.26 to 5.58.

**Against the u-frame requirement, no.** `research/gate-multiplies.md` §8:
the surviving form goes through iff **L ≤ 0.19 to 0.31 · p/ln p on average over
the ladder**, the two ends being ρ = 2.4 and ρ = 1.5.

| | mean over the 8 diagonal cells |
|---|---|
| best proven ceiling | **2.250** |
| Theorem B alone | 3.625 |
| requirement, favourable end 0.31p/lnp | 1.964 |
| requirement, tight end 0.19p/lnp | 1.204 |

Missed at **both** ends. Cleared at three individual folds (11, 19, 29), missed
at five. **This does not refute the polylog branch** — the requirement is an
asymptotic average, it is hardest at small p, and gate-multiplies §8 has the
polylog branch crossing 1 near p ~ 800. What it does say is that the reachable
ladder cannot exhibit the branch, so no computation on it will ever supply the
evidence.

**And there is nothing left to win on the reachable ladder.** The best proven
ceiling *equals true L* at every cell (slack 0), so the u-frame step-3 chain run
on it is byte-identical to the chain run on true L, which gate-multiplies §8 has
BUSTING at fold 31. **No improvement to an L bound can save the chain below
p ~ 800**, because the bound is already exact.

## 6. R3: the conversion rate from 0c to L, stated

The measured maxsum law (`research/U-FRAME.md`, engine
`research/localized-04-maxsum.js`) is

> maxsum_m = m·m̄ + σ·√(2m·lnD),  σ/m̄ ≈ 0.89 to 0.95,

**calibrated for m ≥ 2·lnD** and matched to within 12% only there.

**Fed into Theorem B**, failure begins at m_c, the larger root of
(3p − m̄)m − σ√(2 lnD)·√m − (p+2) = 0, i.e. with s = σ√(2 lnD) and A = 3p − m̄,

> √m_c = (s + √(s² + 4A(p+2))) / (2A),  L ≤ 1 + m_c.

Asymptotically m̄ = 2.4 ln²p and lnD ~ θ(p) ~ p, so s ~ 3.1 ln²p·√p and A ~ 3p,
giving √m_c → √(1/3) and **m_c → 1/3**. That is L ≤ 1 — a *constant*, better
than polylog, and **false at seven of eight folds**.

The contradiction locates the fault, and it is a **regime mismatch**:

| p | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|---|
| m* where Theorem B is decided | 1 | 1 | 1 | 3 | 3 | 3 | 4 | 5 |
| 2·lnD, the law's floor | 2.20 | 5.42 | 9.81 | 14.61 | 20.02 | 25.69 | 31.78 | 38.37 |
| m* inside the law's range? | no | no | no | no | no | no | no | no |

**Theorem B lives entirely at m ≤ 6; the law lives entirely at m ≥ 2 lnD. The
two never meet at any reachable fold, and the gap widens with p.** And at the m
Theorem B needs, the law is not even the right sign of error: true/EV swings
from 0.668 (fold 23, m = 4, law far too large) to 1.278 (fold 31, m = 1, law too
small).

> **The conversion rate, stated as the brief asks: ZERO.** Proving 0c's maxsum
> law in the regime it is stated for (m ≥ 2 lnD) converts to no progress on L
> whatsoever, because Theorem B never evaluates maxsum there. L progress
> requires the law in the small-m regime m ≤ 6, and that is precisely where the
> measurement shows the law is wrong. **0c and L are not on the same road.**

## 7. What this changes, and what it does not

**Changes.** Three items for the live documents, none integrated:

1. The sharpest proven ceiling on L is not Theorem B but LVP, and it is **exact
   at all eight reachable cells**. `research/kappa-not-L.md`'s "Theorem B is the
   first unconditional bound" stays true; "the alternation condition is worth
   exactly 3/2 and no more" is true *of the sum form* and should be qualified.
2. `research/a3-05-bound-L.md` §7's "Theorem B can never prove L below
   G2/(3p) ≈ 0.18x" is a property of the **sum** form. The window form has no
   such cap. The wall should be restated as sitting on H'', not on 0.18x.
3. Theorem B's statement needs the hypothesis **m ≤ N(T_x)**.

**Does not change.** The wall itself. LVP being exact means the residue side is
exhausted in the strongest available sense, and the chain still busts at fold 31
on the exact value. Everything now rests on H'' — a large-deviation statement
about runs of consecutive grain gaps at scale 3p — which a3-05 §8 already places
at sifting parameter 1 + o(1) against β₂ = 4.26645, and out of reach of every
fixed-order moment tool in the repository.

**Refuted-list discipline observed.** Nothing here re-opens the doubling guess,
adjacent-kill runs as a record-gap bound, or any naive multiplicative recursion.
The target throughout is L itself for the u-frame chain.

---

*STAGING ONLY. Not integrated into any live document.*
