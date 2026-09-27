# TODO 1d: (H-sub-pow) with an explicit K attacked at three mechanisms, all three closed, and the quoted legal zone corrected at both ends

<!-- ledger
id: Q-hsubpow-K
status: CLOSED
todo: 1d
question: Can (H-sub-pow) be proven with an explicit K in the legal zone?
verdict: NO by three mechanisms: the CRT lift (K* >= pi(y') - pi(y) diverges), anchored caps (diverge at every base), Iwaniec at two classes (it IS beta2-note); TODO 1d's legal zone is mis-stated, the trusted zone is [1.3946, 11.3568).
-->

*2026-08-28. Producer: `research/history/staging/hsubpow-explicit-K.js` (0.7 s,
`code-sha256 117343ac`, `out-sha256 8aa25d0f`, `body-lines 109`, formal embed,
seven numbered readings; fingerprint verified with `embed.js --check` after
writing). The embed used `--force` once (the tool's corrected-code path: SEC G
was added and its sieve limit raised from 8e7 to 1.6e8 so the last row would
resolve rather than print a limit notice; 0 of 75 figures in the replaced block
failed to reproduce), and the override is stamped in the tail. The producer
reads its ladders through a path helper, so the embed's static `inputs` line is
empty: the two ladder files are named in the header and cross-checked in SEC A
at run time instead. Nothing was committed; no git command was run; no existing
corpus document was edited. HELD, not integrated, awaiting the standing
one-pass adversarial review. Legend as in `research/sift-limit-attack.md`:
**[PROVEN]** proof given here or published; **[VERIFIED]** checked
computationally here; **[MEASURED]** empirical, finite range; **[INFERRED]**
deduction from sourced facts; **[CITED]** taken from a corpus artifact, not
recomputed.*

---

## 0. The verdict, up front

> **No K is proven, at any base, by any of the three mechanisms. The attempt
> fails, and this pass locates the failure exactly at each of the three: the
> CRT lift dies on a proven divergence of its own certificate, the anchored
> and unified-cap family dies on a density ratio that diverges at every base
> and not only at base 2, and the Iwaniec-shaped route cannot produce an
> inequality of (H-sub-pow) shape at all because the shape needs matching
> upper and lower exponents and the corpus's gap between them is 3.27. The
> route's own arithmetic also needs correcting: the quoted legal zone is
> stated at one base and is wrong at both ends.**
>
> 1. **The quoted legal zone `K ∈ [1.3555, 7.6394)` mixes a single base into
>    an all-bases hypothesis, and both endpoints move.** `S(16) = 1.3555` and
>    `β₂ ln 16 − ln 66 = 7.639457` reproduce exactly, but (H-sub-pow) is
>    quantified over all integer bases and its conclusion is
>    `β = inf_{n≥2}(f(n)+K)/ln n`, so the endpoints are argmaxes, not base
>    16's values. At trusted grade the operative zone is
>    **`[1.3946, 11.3568)`** (floor at `b = 66`, ceiling at `b = 82`). The
>    quoted floor therefore calls a **0.0391-nat TPC-implying sliver legal**,
>    and the quoted ceiling forfeits **3.7173 nats** of genuinely legal room.
>    At custody grade the zone is `[1.3555, 9.9082)`. **[VERIFIED]**
> 2. **Mechanism (a), the CRT lift, is closed by a proven divergence.** The
>    corpus's Bridging Lemma gives `Ĝ(y′) ≤ (K*+1)·Ĝ(y)` with `K*` the
>    longest run of consecutive level-`y` slots killed by the primes entering
>    in `(y, y′]`. This pass proves **`K* ≥ π(y′) − π(y)`** in three lines of
>    CRT, which holds at all eleven enumerable doubling steps (ratio `K*/N`
>    1.00 to 2.67) and diverges like `(b−1)y/ln y` at every fixed base. That
>    settles `attack-doubling-01.md` §4's open condition in the negative: `K*`
>    is **unbounded**, so no constant `e^K·Ĝ(b)` dominates it and the
>    certificate route delivers no finite `K` at any base. (Sublinearity is not
>    the property the route needs: Lemma 1's own floor `(b−1)y/ln y` is `o(y)`.)
>    At `b = 16` it exits the whole legal zone by rung 6.
>    **[PROVEN / VERIFIED]**
> 3. **Mechanism (b), the anchored and unified-cap family, was already closed
>    at `b = 2` and this pass closes it at every base.** The density ratio
>    `θ_b(y) = 2Ĝ(y)·Σ_{y<q≤by} 1/q` must fall below 1; by Mertens it is
>    `~ 2Ĝ(y)·ln b/ln y`, and the elementary floor `Ĝ(y) ≥ 1/V(y) ~ ln²y/0.41621`
>    already forces `θ_b(y) → ∞` at every base, monotonically worse as `b`
>    grows (`1.3333` at `y = 2, b = 2`; `568.8063` at `y = 41, b = 16`).
>    **[PROVEN the growth law; VERIFIED the table]**
> 4. **Mechanism (c), the two-class Iwaniec argument, is `paper/beta2-note.md`
>    and must not be redone; and it cannot yield (H-sub-pow) shape.** Any
>    proof by an unconditional upper bound `Ĝ(n) ≤ A n^γ` against a lower
>    bound `Ĝ(n) ≥ a n^λ` carries defect `≥ (γ−λ)k ln b + O(1)`, finite only
>    if `γ ≤ λ`. The corpus's proven pair is `γ = β₂ = 4.26645` and `λ = 1`,
>    gap `3.26645`, so `K = +∞`. At `b = 16` the defect grows `9.0565` nats
>    per rung against a zone `9.9622` nats wide: rung 2 exhausts it.
>    **[PROVEN for that proof shape]**
> 5. **The structural reason all three fail, and it is one sentence.**
>    (H-sub-pow) at base `b` with constant `K` is a **sup** statement on the
>    chain increments `δ_k = f(b^{k+1}) − f(b^k)`, while the `β` bound it
>    delivers is the **average** statement `limsup δ_k/ln b`. So a proof of
>    the legal-zone version is strictly stronger than an unconditional
>    `β < β₂`, which is TODO item 1b and has not moved in forty years. The
>    legal landing zone is not a cheaper prize; it is 1b's prize plus a
>    uniformity burden. **[PROVEN the implication; INFERRED the pricing]**

---

## 1. The statements, exactly, and the arithmetic checked

### 1a. What (H-sub-pow) says

Write `Ĝ(n) = G₂(P(n)#)` for `P(n)` the largest prime `≤ n`, and
`f(n) = ln Ĝ(n)`. The hypothesis, after `attack-hsub-01.md`'s Reduction 1
(**[PROVEN]** there by inspection of the lemma's own proof, confirmed by
`redteam-0820-night-proofs.md` §2a):

> **(H-sub-pow).** There is a constant `K ≥ 0` such that
> `f(b^{k+1}) ≤ f(b^k) + f(b) + K` for all integers `b ≥ 2`, `k ≥ 1`.

Multiplicatively: `Ĝ(b^{k+1}) ≤ e^K · Ĝ(b) · Ĝ(b^k)`. "sub-pow" is the
restriction of the full sub-multiplicative hypothesis (H-sub), which asks the
same at all integer pairs `(s,t)`, to power pairs `(b^k, b)`. The restriction
is free because the lemma's proof consumes no other pair.

`f ≥ 0` is trivial and (H-mono) is **[PROVEN]** one line plus verified at seven
folds (`fekete-1d.md` §5): folding only deletes slots and deletion only merges
gaps.

### 1b. The lemma and the pricing chain

> **Lemma (multiplicative Fekete with bounded defect).** For `f : {2,3,…} → [0,∞)`
> nondecreasing and satisfying (H-sub-pow) with constant `K`,
> `lim_{n→∞} f(n)/ln n` exists and equals `L = inf_{n≥2}(f(n)+K)/ln n`.

**[PROVEN]**, eight lines, in `research/attack-fekete-1d-02-lemma.js`, and
re-derived line by line rather than re-read by `redteam-0820-math.md` §1.3.
The pricing chain is then:

| step | statement | rung |
|---|---|---|
| P1 | (H-sub-pow) at base `b` with `K` gives `limsup f(n)/ln n ≤ (f(b)+K)/ln b` | PROVEN |
| P2 | (H-sub-pow) at all bases gives `β = lim f(n)/ln n` exists, `β = inf_n (f(n)+K)/ln n` | PROVEN |
| P3 | `β < 2 ⟺ S(n) > K` at a single integer, `S(n) = ln(n²/Ĝ(n))` | PROVEN |
| P4 | `β < 2 ⟹ G₂(x#)/x² → 0 ⟹` the Zone Postulate `⟹` TPC | PROVEN (`THE-DIALS.md`; `ZONE-POSTULATE.md` §3) |

P3 is the trap: an explicit `K` below the ladder's best `S` is TPC-strength.
P1 alone, at one base, is where any legal-zone claim lives.

### 1c. The legal-zone arithmetic, and it is wrong at both ends

Base-16 values reproduce exactly (SEC B of the producer): `Ĝ(16) = 66`,
`ln 16 = 2.772589`, `ln 66 = 4.189655`, `S(16) = 1.355523` and
`β₂ ln 16 − ln 66 = 7.639457`. The quoted `7.6394` is a truncation rather than a
round; for a strict upper endpoint that is the conservative direction, so it is
a display nit, not a defect. Zone width `6.2839` nats against the custody trap's
`0.3861` also reproduces. **[VERIFIED]**

The defect is not in those numbers but in the quantifier. (H-sub-pow) is stated
over **all** integer bases and P2 concludes with an inf over **all** integers,
so a proven `K` is priced at the best base, not at base 16:

| grade | `max_b S(b)` | at | `max_b (β₂ ln b − f(b))` | at | operative legal zone |
|---|---|---|---|---|---|
| custody (14 exact terms, `Ĝ` on `[2,47)`) | 1.3555 | 16 | 9.9082 | 46 | `[1.3555, 9.9082)` |
| trusted (22-term A144311, `Ĝ` on `[2,83)`) | **1.3946** | **66** | **11.3568** | **82** | **`[1.3946, 11.3568)`** |

Two consequences, both **[VERIFIED]**:

- **The quoted floor calls a TPC-implying sliver legal.** Any all-bases
  `K ∈ [1.3555, 1.3946)` gives `β ≤ (f(66)+K)/ln 66 < 2` through base 66, hence
  TPC. Width `0.0391` nats. TODO 1d already carries `1.3946` as the trusted trap
  ceiling in the sentence immediately before the legal-zone sentence, so the two
  halves of one TODO entry contradict each other; the same base-16-only framing
  is in `attack-wrongdirection-audit.md` §3.5.
- **The quoted ceiling forfeits legal room.** `K ∈ [7.6395, 11.3568)` is legal
  and still delivers `β < β₂`, through base 82. Width `3.7173` nats. Even at
  pure custody grade the ceiling is `9.9082` at `b = 46`, not `7.6394`.

Restated for the record: **the trusted-grade legal landing zone is
`K ∈ [1.3946, 11.3568)`, 9.9622 nats wide, against a trusted trap
`[1.0033, 1.3946)` 0.3913 nats wide.** The qualitative reading of §3.5, that the
legal band dwarfs the trap and 1d is therefore not a wrong-direction target,
survives and is in fact strengthened.

**One rider that no source states and that matters for how "legal" is read.**
The legality of a zone is a statement about what is known, not about the
mathematics. `K ≥ 1.3946` is legal only because `S(n) > 1.3946` is unverified
for every `n`; if `β < 2` is true then `S(n) → ∞`, so some unknown `n` witnesses
it. A proof of (H-sub-pow) with a legal `K` plus a single future ladder term
with `S(n) > K` is TPC. The zone is legal today and one enumeration away from
not being. The relevant freeze is already on record: no enumeration at 47, 53 or
59 can raise the custody threshold, and the first riser base is 66
(`fekete-1d.md` §3, **[CERTIFIED]**).

### 1d. The base the zone is quoted at has no reachable rung

The base-16 chain's first instance, `k = 1`, is `Ĝ(256) ≤ e^K·66²`, that is
`G₂(251#) ≤ 16,896` at the quoted floor and `≤ 9,053,930` at the quoted ceiling.
`Ĝ` is known on `[2,83)`; `16² = 256` is already outside it, and every higher
rung more so. The 43# enumeration costs about an hour on ten cores and 47# is
priced at 1.49 days per run with two runs required
(`phase1-T2b-exact-ladder.md`, **[CITED]**). So not one instance of the
hypothesis at the quoted base can be checked, now or on any horizon this
programme owns. This is `attack-hsub-01.md` §2's "the decisive chains are
dataless" with the numbers attached. **[VERIFIED]**

---

## 2. Mechanism (a): the CRT lift, and the exact line it dies on

### 2a. What the corpus already proves

`attack-doubling-01.md` §3 proves, in three lines, the

> **Bridging Lemma.** Level-`y′` slots are a sub-pattern of the periodized
> level-`y` slots, so every level-`y′` gap is a sum of `k+1` consecutive
> level-`y` gaps; hence `Ĝ(y′) ≤ (K*+1)·Ĝ(y)`, where `K*` is the longest run
> of consecutive level-`y` slots all killed by the primes entering in `(y, y′]`.

Stated there for `y′ = 2y`; the proof uses nothing about the ratio, so it holds
verbatim for `y′ = by` at any base. This is the CRT lift in its exact form: the
Copying Theorem's transfer identity is the first-moment version of the same
decomposition (`G2-STATE.md` §4f) and gives averages, while a maximal gap needs
a bound in **every** window, so the identity does not attach. The Exact
Invariance Lemma freezes stratum depth at birth and carries no window-scale
magnitude. **[CITED / INFERRED]**

The inequality (H-sub-pow) needs is `Ĝ(b^{k+1}) ≤ e^K·Ĝ(b)·Ĝ(b^k)`. The
Bridging Lemma supplies `Ĝ(b^{k+1}) ≤ (K*+1)·Ĝ(b^k)`. **The needed inequality
follows if and only if `K* + 1 ≤ e^K·Ĝ(b)`, a constant in `k`.** That is the
whole of the route, and it is the line where it dies.

### 2b. The new ingredient: `K*` has a proven divergent floor

> **Lemma 1 (run floor).** Let `2 ≤ y < y′`, `P = ∏_{p≤y} p`,
> `Q = {q prime : y < q ≤ y′}`, `N = |Q| = π(y′) − π(y)`, and let `D_y` be the
> level-`y` census `∏_{2<p≤y}(p−2)`. If `D_y ≥ N` then `K*(y,y′) ≥ N`.

*Proof.* Pick `N` consecutive level-`y` twin slots `s_1 < … < s_N`, lifted to
integers in `[0,P)`; possible since `D_y ≥ N`. Enumerate `Q = {q_1,…,q_N}` and
choose `n` by CRT with `n ≡ 0 (mod P)` and `n ≡ −s_i (mod q_i)` for each `i`;
the moduli are pairwise coprime, so `n` exists. Since `n ≡ 0 (mod P)`, the
level-`y` slots in `[n+s_1, n+s_N]` are exactly the `n+s_i` (the interval is
shorter than `P`). Each `n+s_i` is divisible by `q_i`, hence is not a hole at
level `y′`, hence not a level-`y′` twin slot. So `n+s_1,…,n+s_N` is a run of `N`
consecutive level-`y` slots all killed by entering primes. ∎ **[PROVEN]**

The freedom used is the CRT adversary of `two-class-lower-bounds.md` §1
(**[PROVEN]** there; recorded earlier still in `research/attack2-rankin2d.js`
under the name PAIRED), restricted to the entering primes with the level-`y`
classes held fixed. The restriction, and its application to `K*`, is what is new
here; the freedom is not.

The hypothesis `D_y ≥ N` is not binding asymptotically: `D_y` grows
superexponentially in `y` while `N ~ (b−1)y/ln y`. It does bind at small `y`
(at `y = 5`, `b = 16`, `D_5 = 3 < N = 19`), so Lemma 1 is a statement about all
large `y`, which is what a hypothesis quantified over all `k` requires.

Checked against the corpus's own eleven exact certificates
(`attack-doubling-01.md` §3, cited not recomputed): `K* ≥ π(2s) − π(s)` holds at
all eleven, `K*/N` running 1.00 to 2.67, rising slowly. **[VERIFIED]**

### 2c. The failure line, stated as an inequality

- **needed:** `K* + 1 ≤ e^K·Ĝ(b)`, constant in `k`.
- **available:** `K* ≥ π(b^{k+1}) − π(b^k) ~ (b−1)b^k/(k ln b)`, divergent.
- **gap:** unbounded, and quantitatively at `b = 16` the floor breaks the cap
  `66 e^K` at `y = 122` for `K = 1.3946` (chain rung 2), at `y = 117` for the
  custody floor `K = 1.3555` (also rung 2), at `y = 124,978` for `K = 7.6394`
  (rung 5) and at `y = 6,639,931` for `K = 11.3568` (rung 6). Since (H-sub-pow)
  is quantified over all `k`, truncating the chain does not help.
  **[PROVEN given Lemma 1; VERIFIED the rungs]**

The producer's READING 4 and its SEC G table carry the same four rows, and
READING 4 quotes `y = 117` against `K = 1.3946`: 117 is the `K = 1.3555` row.
The rung labels are unaffected, since `⌈ln 117/ln 16⌉ = ⌈ln 122/ln 16⌉ = 2`. The
`.js` is left as it stands and the correction lives here.

This answers the open condition `attack-doubling-01.md` §4 registered: "the
certificate route cannot land by computing `K*`; it needs `K*` proven sublinear
in the level, or a bound on `C₂` that does not pass through `K*`." Sublinearity
is not the property the route needs, and Lemma 1's floor is itself sublinear at
rate `y/ln y`, which is `o(y)`. What dies is boundedness: `K*` is unbounded, so
no constant `e^K·Ĝ(b)` dominates `K*+1`. The first alternative is closed on that
reading; only the second survives, and nothing in the corpus supplies it. The
measured drift `0.6881 ± 0.1328` in `ln P(2s)` (**[MEASURED]**, eleven points, no
null exists) is reading that same rate, since
`d ln(y/ln y)/d ln y = 1 − 1/ln y ≈ 0.67` at `y ≈ 20`, and was the right alarm.

### 2d. Why the certificate is loose, which is the same fact from the other side

`K*` diverges while `C₂ = Ĝ(2y)/Ĝ(y)` reads flat (`−0.0336 ± 0.0596` against the
in-pass constant null, **[MEASURED, CITED]**). Under the measured exponent 1.50
the true ratio at base `b` tends to `b^{1.50}`, a constant, so the certificate
`K*+1` overshoots by a factor that itself diverges. A bound that is provably
loose by a divergent factor cannot deliver a constant. Nothing about this is
repairable by sharpening the constant in front of `K*`. **[INFERRED]**

---

## 3. Mechanism (b): the anchored and composed-floor family

### 3a. It was already closed at base 2

`attack-doubling-01.md` §3 refutes the residue-density closure and, with it,
"every constant-factor sharpening (unified-cap style included)". The mechanism:
an entering prime `q` kills at most `2(⌊(L−2)/q⌋+1)` level-`y` slot copies in a
window of length `L`, so the AP cap closes the Bridging Lemma exactly when

  `θ(y) = 2·Ĝ(y)·Σ_{q ∈ (y, 2y]} 1/q < 1`,

and `θ` reads `1.3333` at the first step and `20.45` at `13# → 23#`. A
refinement by a constant factor `c` closes only where `c < 1/θ`, which runs
`0.750 → 0.049 → 0`. The unified caps additionally bound kill **counts** per
level, history-blind, while a window needs kill **placement**; Mirror-Sweep is
symmetry and carries no magnitude. **[CITED]**

Using the anchored family as a lower-bound ingredient rather than an all-`x` law
does not change this. The anchored objects floor the count of survivors in a
window; the Bridging Lemma needs a ceiling on a run of consecutive kills. A
floor on survivors would suffice only if it were a floor **in every window**,
which is the Zone Postulate in the window coordinate, not an ingredient for it.
The `a3-05-bound-L.md` §7 price rider is the same obstruction one level out: the
bridge floors at `≈ 0.183x` for any input bound whatsoever. **[INFERRED]**

### 3b. What this pass adds: it fails at every base, monotonically worse

The corpus computed `θ` at `b = 2`. Generalising, `θ_b(y) = 2Ĝ(y)·Σ_{y<q≤by} 1/q`,
and by Mertens `Σ_{y<q≤by} 1/q = ln(1 + ln b/ln y) + o(1/ln y) ~ ln b/ln y`. The
elementary floor `Ĝ(y) ≥ 1/V(y)` (a maximum is at least a mean;
`V(y) = ½∏_{2<p≤y}(1−2/p) ~ 0.41621/ln²y`, the constant verified in
`research/genealogy.js`) then gives

  `θ_b(y) ≳ (2/0.41621)·ln b·ln y → ∞`, at **every** fixed base `b ≥ 2`.

**[PROVEN]**, and larger bases are strictly worse. The table confirms the
direction on the reachable range: `θ_2` runs `1.3333 → 166.1038` over
`y = 2…41`, `θ_4` runs `2.7048 → 315.0659`, `θ_16` runs `4.2628 → 568.8063`.
**[VERIFIED]**

- **needed:** `θ_b(y) < 1` for all large `y`.
- **available:** `θ_b(y) ≥ c·ln b·ln y`, divergent, with `c = 4.805`.
- **gap:** a factor `ln y` and growing, before any of the true `Ĝ ≈ y^{1.5}`
  size is spent. The density closure is not near-miss at any base.

---

## 4. Mechanism (c): the Jacobsthal covering / Iwaniec route

### 4a. The two-class Iwaniec-shaped argument is already in the repo

Iwaniec 1978's one-class bound `g(n) ≪ ω(n)² log²ω(n)` reads, at the primorial
`n = x#` with `ω = π(x)`, as `g(x#) ≪ x²`: exponent exactly 2 in the tile
coordinate, with an inexplicit constant (`THE-DIALS.md`; `ZONE-POSTULATE.md` §6,
both **[CITED]**). The two-class adaptation of that shape (force a survivor in
every window by a lower-bound sieve, then read the exponent off the sifting
limit) **is `paper/beta2-note.md`**, which sets `A = {r(r+2) : x < r ≤ x+H}`,
`z = p_n+1`, applies the DHR κ = 2 lower-bound sieve at `u = β₂ + ε/2 > β₂`, and
concludes that every interval of length `z^{β₂+ε}` holds a twin candidate, hence
`G₂(x#) ≪_ε x^{β₂+ε}`. Its §3 says explicitly why the two-class remainder does
not explode where Iwaniec's could not afford an `ε`. The identification of the
Jacobsthal exponent with the sieve dimension's limit (`β₁ = 2`, `β₂ = 4.26645`)
is `THE-DIALS.md`'s table. **The adapted Iwaniec argument at two classes is
therefore done, and this pass does not redo it.** **[CITED]**

Prior art is one-class on both sides: Iwaniec's upper bound, and the
Ford–Green–Konyagin–Maynard–Tao lower bound `g(x#) ≫ x log x logloglog x/loglog x`
(JAMS 31 (2018), via Rankin 1938 and Pintz 1997), which transfers to `G₂` only
through the pointwise `G₂(x#) ≥ g(x#)` (`two-class-lower-bounds.md` §3,
**[CITED]**). Kalmynin–Konyagin 2024 owns the multi-class construction side
(`covering-dive.md` §4.2). **[MEMORY]** for Iwaniec's exact statement: it is
quoted here from the corpus's own reading, not read at source in this pass.

### 4b. Why no bound of that kind can have (H-sub-pow) shape

> **Lemma 2 (exponent gap).** Suppose a proof of (H-sub-pow) at base `b`
> proceeds only by an unconditional upper bound `Ĝ(n) ≤ A n^γ` applied at
> `b^{k+1}` and an unconditional lower bound `Ĝ(n) ≥ a n^λ` applied at `b^k`.
> The largest defect such a proof leaves unbounded is
> `(γ−λ)k ln b + γ ln b + ln(A/a) − f(b)`, so the smallest constant it can
> certify is the `sup` of that over `k`, finite if and only if `γ ≤ λ`.

*Proof.* `f(b^{k+1}) − f(b^k) − f(b) ≤ [ln A + γ(k+1)ln b] − [ln a + λk ln b] − f(b)`.
∎ **[PROVEN]**

That displayed line proves `≤` on the defect, which is what the corrected
statement claims: it bounds what the proof shape can certify. Turning it into a
lower bound on the true `K` would need an admissible extremal `Ĝ` attaining both
envelopes, and none is exhibited here; that is not routine, since `Ĝ` must stay
non-decreasing and cannot alternate freely between the two envelopes. The
closure below rests on the `≤` reading only.

The corpus's proven pair is `γ = β₂ = 4.26645` (§4a) and `λ = 1` (FGKMT, §4a),
gap `3.26645`. So this proof shape yields `K = +∞` at every base. At `b = 16` the
defect grows `9.0565` nats per rung against a trusted legal zone `9.9622` nats
wide: **rung 2 already exhausts the entire zone.** **[PROVEN / VERIFIED]**

- **needed:** matching exponents, `γ ≤ λ`.
- **available:** `γ − λ = 3.26645`.
- **gap:** the whole open exponent band and more. A finite `K` by this shape is
  the statement that the true `β` is known from both sides to `o(1)`, which is
  strictly more than TODO 1d is trying to buy.

An Iwaniec-type argument therefore does not land above 7.6394 either. It lands
nowhere: it produces no `K` at all, not a large one. The question "is the `K` it
gives legal but useless" has no instance to be asked of.

---

## 5. The structural reason, and the pricing of the route

**(H-sub-pow) at base `b` with constant `K` is a sup statement; the `β` bound it
delivers is an average statement.** With `δ_k = f(b^{k+1}) − f(b^k) ≥ 0`
(nonnegative by (H-mono)), the hypothesis says `sup_k δ_k ≤ f(b) + K`, while P1's
conclusion needs only `limsup_k (1/k)Σ_{j<k} δ_j ≤ f(b) + K`. So:

> **(H-sub-pow) at base `b` with explicit `K` ⟹ `β ≤ (f(b)+K)/ln b`, and the
> converse fails.** **[PROVEN]**

Two consequences, both worth carrying beside the legal-zone quote:

- **The legal-zone version of 1d is at least as hard as TODO item 1b.** Landing
  a legal `K` proves an unconditional `β < β₂`, which is the first movement of
  the sifting limit's exponent in forty years, and it proves it the expensive
  way, with a uniform bound on every rung rather than an asymptotic one. 1d's
  legal prize is a strict subset of 1b's, not an alternative to it.
  **[INFERRED, from a proven implication]**
- **The honest prize is limit existence, and it is unchanged.** P2 buys `β`
  exists, hence 1d's question is well posed; it buys no value of `β`. The
  separation witness stands: `f(n) = 2 ln n` satisfies (H-sub-pow) at `K = 0`
  with `β = 2`, on which TPC is undecided
  (`attack-wrongdirection-audit.md` §3.5, **[CITED]**).

**Calibration against the truth, so nobody reads the legal zone as slack.** Under
the measured exponent the asymptotic base-16 increment is `β ln 16 ≈ 4.16`
against `f(16) = 4.19`, so the true `K` at base 16 is near zero or negative, well
inside the trap. Any argument that is asymptotically sharp at base 16 therefore
lands in the trap and is TPC-strength; the legal zone is reachable only by an
argument that is deliberately loose, by a factor between `e^{1.3946}/e^{K_true}`
and `e^{11.3568}/e^{K_true}`. That is a wide band and not a knife's edge, but it
does mean the legal zone is not where a sharp argument naturally lands.
**[INFERRED, on a MEASURED exponent]**

---

## 6. What K is proven, and the sharpest conditional

**No `K`. Not at base 2, not at base 16, not at any base, not by any of the three
mechanisms, and this pass proves none.** The finite-level certificates that do
exist are `attack-doubling-01.md`'s eleven `C₂ ≤ K*+1` bounds, which are
per-instance theorems and imply nothing about a limsup.

The sharpest statement the corpus can make, with its hypothesis named at its
rung:

> **Conditional.** If (H-sub-pow) holds with a constant `K`
> [**CONJECTURED**; no instance proven, no counterexample found over the 111
> reachable pairs, the power-pair sup defect is `1.0033` trusted and `0.9694`
> custody, and the decisive chains carry no data at all], then
> `β = lim ln G₂(x#)/ln x` exists [**PROVEN** given the hypothesis], and
> `β ≤ (ln Ĝ(b) + K)/ln b` at every base `b`; with `K ∈ [1.3946, 11.3568)` that
> is an unconditional-in-form improvement of `β₂ = 4.26645` with no TPC content,
> and with `K < 1.3946` it is TPC.

Nothing in that sentence moved this pass except the two endpoints.

---

## 7. Against the measured ratio and the trap

The measured ratio is flat. `attack-block-01-ladder.md` gives
`d ln G₂/d ln b = 1.797 ± 0.064` on eleven exact terms; the flatness statistic
quoted in TODO 1d as `+0.05 ± 0.11 over eleven exact terms` is, per
`phase1-T3prep-decision-rule.md` §7.1, a **nine-term** figure (`b = 11..41`), and
the eleven-term fit of the closest computable quantity `G₂/x²` is
`−0.203 ± 0.064` rather than `−0.069 ± 0.075`. **That correction is already on
record and this pass neither re-runs nor re-litigates it**; it is flagged here
only because the number appears in the brief for this task in its uncorrected
form. **[CITED]**

Read against the mechanisms: flatness of the ratio is exactly the statement that
`δ_k` is bounded, that is, (H-sub-pow) at reachable scale. So the data are
consistent with the hypothesis and say nothing about the constant, because the
reachable range contains no rung of any decisive chain (§1d). The trap window at
trusted grade is `[1.0033, 1.3946)`, `0.3913` nats; the truth, under `β ≈ 1.5`,
sits below it. So a correct sharp proof lands in the trap, and the legal zone is
reached only by a lossy one, per §5.

Resulting `β` bound from this pass: **none**. The standing bound is unchanged at
`β ≤ β₂ + ε = 4.26645…` (**[PROVEN]**, `paper/beta2-note.md`, conditional on the
cited sieve per its §6).

---

## 8. Defects noticed in passing

- `TODO.md` item 1d contradicts itself within four lines: it gives the trusted
  trap ceiling `1.3946` and then a legal-zone floor `1.3555`, which overlap on
  `[1.3555, 1.3946)`. Same framing in `attack-wrongdirection-audit.md` §3.5.
  Fixing it means quoting the argmax bases, per §1c above.
- `attack-wrongdirection-audit.md` §3.5's ceiling `7.6394` is `7.639457`
  truncated, not rounded. Conservative direction, display only.
- The brief for this task quotes `+0.05 ± 0.11 over eleven exact terms`, already
  corrected to a nine-term figure by `phase1-T3prep-decision-rule.md` §7.1 and
  still circulating.

---

## 9. NOT REACHED, and what would falsify this

**Not reached.**

- No instance of (H-sub-pow) is proven or refuted. The hypothesis stands open in
  both directions, as it did before this pass.
- The fourth mechanism named in `attack-doubling-01.md` §4 is untouched: a bound
  on the ratio `Ĝ(b^{k+1})/Ĝ(b^k)` that passes through neither `K*`, nor a
  density cap, nor a pair of unconditional power bounds. Lemma 1 and Lemma 2
  close three roads and say nothing about a fourth.
- No new `G₂` value; no enumeration; `Ĝ` past 82 is untouched.
- Iwaniec 1978's statement is taken from the corpus's reading and is
  **[MEMORY]** at source level in this pass.
- The `D_y ≥ N` hypothesis of Lemma 1 is stated but its threshold `y₀(b)` is not
  computed; only that it is eventually satisfied.

**What would falsify each claim, and whether the check has run.**

| claim | falsifier | has it run |
|---|---|---|
| Lemma 1, `K* ≥ π(y′) − π(y)` | one enumerable step with `K*` below the count | yes, all eleven enumerable doubling steps, all hold (SEC D) |
| the certificate route is closed | a proof that `K*` is bounded in the level, or an exhibited base where `K*+1` stays under `66e^K` | the first is refuted by Lemma 1; the second is impossible given Lemma 1 |
| `θ_b → ∞` at every base | a base and a range where `θ_b < 1` | no such point exists on the reachable range; the growth law is proven, so no |
| Lemma 2 kills the sieve route | an unconditional lower bound on `Ĝ` at exponent `β₂` | none exists; the best proven is exponent 1. Lemma 2 as corrected bounds what the two-envelope shape can certify, not the true `K`, so it closes that shape and not the object |
| the legal zone is `[1.3946, 11.3568)` | a base `b < 83` with larger `S(b)` or larger `β₂ ln b − f(b)` | yes, exhaustive over `b ∈ [2,83)` (SEC B) |
| the corrected floor matters | showing `S(66)` rests on a term the corpus does not trust | `G₂(61#) = 1080` is Wang 2024's a(18), adopted trusted by the series rule 2026-08-20 (`redteam-0820-math.md` §1.2); at custody grade the floor reverts to 1.3555 |
| "no `K` is proven" | any derivation of an explicit constant | none produced here; the trap grading below is therefore vacuous |

**Trap grading.** No explicit `K` was derived, at any base, so nothing in this
document trips the explicit-constant trap. What moved is the zone's arithmetic,
in the direction that makes the trap slightly wider (floor `1.3555 → 1.3946`) and
the legal band substantially wider (ceiling `7.6394 → 11.3568`).

---

## 10. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/history/staging/hsubpow-explicit-K.js` | the legal-zone rescan at both grades, the base-16 chain rungs, Lemma 1 against the eleven cited certificates, `θ_b` at three bases, the exponent-gap arithmetic, the rung at which the certificate exits the zone (SEC A–G) |
| `research/history/staging/fekete-1d.md` §§5–6 | the lemma, the hypotheses discharged, the two faces, the threshold freeze |
| `research/history/staging/attack-hsub-01.md` §§1–4 | Reduction 1 to power pairs, the dataless decisive chains, the fold-budget identity, the slice ladder |
| `research/history/staging/attack-doubling-01.md` §§2–4 | the Bridging Lemma, the eleven `K*` certificates cited here, the `θ` refutation at `b = 2`, the `K*` drift |
| `research/history/staging/redteam-0820-math.md` §§1.2–1.3, `redteam-0820-night-proofs.md` §2 | the trusted-grade threshold 1.3946 at `b = 66`, the lemma re-derived line by line |
| `research/history/staging/attack-wrongdirection-audit.md` §3.5 | the legal-zone statement this document corrects, and the `f(n) = 2 ln n` separation witness |
| `paper/beta2-note.md` §§2–3 | the two-class Iwaniec-shaped argument, `β₂ = 4.26645028414864191641` |
| `research/two-class-lower-bounds.md` §§1, 3 | the CRT adversary Lemma 1 restricts, and the FGKMT lower bound `λ = 1` |
| `research/THE-DIALS.md`, `research/ZONE-POSTULATE.md` §§3, 6 | `β₁ = 2` from Iwaniec 1978, the Jacobsthal-exponent-is-the-sieve-limit table, `G₂(x#) < x′² − 2 ⟹` TPC |
| `research/exact-g2-ladder.js`, `research/import-interp-01-bgt-defect.js` | the two ladders, parsed at run time and cross-checked on the 14-term overlap |

Reproduce with `node research/qc/embed.js --check
research/history/staging/hsubpow-explicit-K.js`; the fingerprint matches as of
2026-08-28.
