# 06 — Adversarial review: the E_> → E_* transfer, and report 04's derived claims

Read-only review, 2026-09-06, working tree at `6e4a4fc`. No repo file was read
that I was told to avoid, no repo file was written, no git state changed. All my
own numbers are **measurements on finite ranges** from scripts in
`scratchpad/wave-0906/rc/` (`c1.js`–`c5.js`); they can falsify an identity, never
establish an asymptotic rate.

## Verdicts (one line each)

**PART 1 (E_> → E_*, `research/residual-coverage.md` §§1–5): NO DEFECT FOUND IN SCOPE.**
Two steps in the assembly are correct but unwritten (listed below), and five
imports remain ASSUMED-UNVERIFIED. Twin-prime infinitude and the sufficient
signed margin remain OPEN; nothing here bears on either.

**PART 2 (`scratchpad/wave-0906/04-reachability-coverage.md`): DEFECT FOUND —
three derived statements are wrong.**
1. `04-reachability-coverage.md` Q3.1 table rows S_R/S_T and Q4.1 D3 rows
   "the whole d-edge | 11/10" and "the whole e-edge | 37/25": γ = 11/10 and
   γ = 37/25 are the **cheapest single points** of those edges, not the values at
   which the edge strips vanish. The strips S_R\S_0 and S_T\S_0 are nonempty for
   every γ < 2 − 2·η_0.
2. Q2.2: "sum_{P>x^(1/40)} x/P^2 << x^(39/40) log^C x, which is **not** negligible
   against x/log^H x". It is negligible: x^(−1/40)·log^(C+H) x → 0. J4 rests
   partly on this.
3. Q3.1: "{p+q <= 19/20} ∩ {5p+2q <= 81/25}  [the old de<=x^(3/4) and
   d^5e^2<=x^(49/20) cuts, in p,q]". Those two numbers are the **limiting-region**
   boundaries 19/25 and 123/50, not the concrete cuts. In p,q the concrete cuts
   read p+q < 24/25 and 5p+2q < 13/4.

The headline claims of report 04 — Q1 (S_0 unreachable), Q1.5 (mass >> η_0² x log² x),
Q3.5 (γ = 2 exact, no smaller) — **survive** these corrections. The Q3.3 area table
is reproduced exactly and independently.

---

## PART 1 — pressure-point table

Notation as in the notes: w = 6/25, v = 1/20, a = δ+w, b = ν+v, U=V=⌊x^w⌋,
Y=Z=⌊x^v⌋, D_0=⌊x/(V+1)⌋, E_0=⌊(x−2)/(Z+1)⌋, A = {de ≤ ⌊x^θ⌋},
B = {d⁵e² ≤ ⌊x^λ⌋}.

| # | pressure point | status | decisive inequality / what I actually checked |
|---|---|---|---|
| (i) | Block shape `Σ_m A_left(g m) Y(m)` with `Y` as grouped-divisor-moment (1) | **CHECKED** | The shape is derived, not assumed, and the derivation is distributed over three notes. (a) `endpoint-fourier.md` (4)–(5) is an exact bijection (d,r) ↔ (l=dr,r): I re-derived it and verified 5,995 instances (`c1.js`, five (I,W) pairs, n ≤ 1200, 0 failures). (b) `signed-divisor-grouping.md` (15)–(18) gives the exact discrete-Abel endpoint kernel; toy assembly R = M + E and E = (Abel form) agree to 1e−12 at x=1024, box d∈(5,10], e∈(4,8], V=3, Z=2 (`c2.js`). (c) The CRT origin identity `n_0/q ≡ (2/g)·m̄/n (mod 1)` for compatible l=gm, j=gn, (m,n)=1, q=gmn: verified exactly over 30,550 (l,j) pairs, l,j ≤ 200, both g branches (`c2.js`). (d) The block form itself: with ψ replaced by the Vaaler polynomial ψ_T, `Σ_{l,j compatible} ξ_l ζ_j [ψ_T((z_0−n_0)/q) − ψ_T((t−n_0)/q)] = Σ_{g∈{1,2}} Σ_{(m,u)=1} A_left(gm) A_right(gu) Σ_h c_h e_u(−θh m̄)[e(hz_0/(gmu)) − e(ht/(gmu))]`, i.e. exactly grouped (1) with **σ = −1**, θ = 2/g, c_h = −W(h/(T+1))/(2πih) depending on h only. Max discrepancy 2.1e−14 over three endpoints t, T=9, arbitrary bounded ξ,ζ (`c3.js`). The CRT compatibility `(l,j) | 2` becomes `1_{(m,u)=1}` because g = (l,j) and l=gm, j=gn forces (m,n)=1 exactly, and conversely; both g branches are enumerated, not assumed. This closes the largest unreviewed dependency flagged by review 01. |
| (i′) | Left orientation by inverse reciprocity | **CHECKED** | `m̄/u + ū/m ≡ 1/(mu) (mod 1)` for (m,u)=1 gives `−θh·m̄/u + hz/(gmu) ≡ +θh·ū/m + h(z−2)/(gmu) (mod 1)`, using θg = 2. So the left orientation has **σ reversed** and **both** endpoints shifted by 2, exactly as `residual-coverage.md`:194 and `grouped-divisor-moment.md`:257–259 state, and as `prime-power-dispersion.md` (5) writes them (z_0−2, z−2, +θ). Verified exactly mod 1 over 39,654 cases (g∈{1,2}, m,u ≤ 60 coprime, three h, three z; `c1.js`). This also confirms report 03's "reciprocity interchanges the two endpoint conventions". |
| (ii) | Vaaler/Fejér majorant, D_T, T = ⌈x^(2τ)max(1,MN/x)⌉, \|c_h\| ≤ C/A | **CHECKED** | D_T = F_T/(2T+2) with F_T the Fejér kernel, so D_T ≥ 0 and D_T ≤ min(1/2, 1/(8(T+1)²‖v‖²)) using sin(πv) ≥ 2‖v‖ — the exact form `endpoint-pairing.md` §5 needs. At integers ψ = −1/2, ψ_T = 0, D_T = 1/2: the inequality is **tight**, so the ψ(integer) = −1/2 convention is load-bearing and correct. 2,025 sampled points incl. integer arguments, T ∈ {1,2,4,8,17}, 0 failures (`c1.js`). \|c_h\| = \|W(h/(T+1))\|/(2π\|h\|) with W bounded on (−1,1) (W(0)=1 continuous, W(1)=0), so \|c_h\| ≤ C/A on a band h ~ A — C absolute. Zero mode P/T ≤ x^(1−2τ) in both regimes of T; (1+Ax/P)^(1/2) ≤ O(x^(3τ/2)) for A ≤ T given P > x^(1−τ). All arithmetic re-derived. |
| (ii′) | The full-majorant divisor-count bound, `endpoint-pairing.md` (12)–(13) | **CHECKED** | q = gmn ≤ 8P and w = 8P/(T+1) give D_T ≤ 2(1+\|k−z\|/w)^(−2) at the nearest CRT solution k (checked both branches \|k−z\| ≤ w and > w). Enlarging to all CRT solutions and swapping the nonnegative sums, the pair count at integer k is ≤ d(\|k\|)d(\|k−2\|); at k = 0 and k = 2 there are **no** pairs precisely because every original divisor exceeds 2 (d > U = x^(6/25), e > Y = x^(1/20)). Inner sum O(w x^ε), dyadic tails O(w² x^(ε−1)) ≤ O(w x^ε) since w ≤ x. With T as above, w ≤ 8x^(1−2τ) and w ≥ 1 eventually. `residual-coverage.md`:220–223 uses this without a paired factor, correctly — and the rejected pairing shortcut is explicitly refuted in `endpoint-pairing.md` §3. Twists preserve \|ξ\|,\|ζ\| ≤ 1 pointwise since \|d^(−s)\| = d^(−Re s) ≤ 1. |
| (iii) | Coupled cuts and Perron separation, §4 | **CHECKED** for the logic and arithmetic; two steps **unwritten but routine** | Truncated Perron (14): u = log((K+1/2)/q); integer spacing gives \|u\| >> 1/(K+1); exp(cu) ≤ (K+1/2)^(1/log x) = O(1) for polynomially bounded K; tails by parts. Error O((K+1)/T_P) per term, T_P = x^10. Absolute mass: D_0E_0 = x^(19/25+19/20) = x^(171/100), times VZ = x^(29/100) gives **exactly** x², and \|E_{d,e,r,s}\| ≤ \|F(B)\| + TV(F) = O(log²x) since F is nondecreasing and ≤ log²x. Total separation error O(x^(2+49/20−10) log^C x) = O(x^(−111/20) log^C x). Double cut via \|P_K\| ≤ 1 + O((K+1)/T_P). **Order of operations:** the separation must be applied box-by-box (a box not meeting A contributes nothing; a box meeting A has DE < ⌊x^θ⌋ from its lower endpoints, hence fixed margin). The note establishes the per-box margin in the paragraph before (14) but never says "box by box" at the Perron step; the reading is forced by that paragraph and is correct. **Untwisted density before separation:** at fixed e, A gives d ≤ L_θ/e, B gives d ≤ (K_λ/e²)^(1/5), ∩ takes the min, ∪ the max — all initial d-segments with lower endpoint ≥ U ≥ U/2, which is the shape `signed-divisor-grouping.md` (7)–(8) needs (that lemma itself: not re-derived here; review 02 checked it). |
| (iii′) | Assembly `E_> − E_* = O_H(x/log^H x)` | **CHECKED**, one step unwritten | W_* ⊂ W_> because ⌊x^(3/4)⌋ ≥ L = ⌊x^(7/10)⌋. E_> − E_* is the kernel on W_> ∩ (A ∪ B). Since {de ≤ L} ⊂ A, E_> − E_* = E_{A∪B} − E_{A∪B ∩ {de≤L}}, and both pieces sit on boxes meeting A or B, hence both are covered by (15). Equivalently the second piece is bounded absolutely by L·VZ·log⁴x ≤ x^(99/100)log⁴x. `residual-coverage.md` §5 asserts the substitution from "(15)" without writing this two-line reduction. Not a defect; worth one sentence in the note. |
| (iv) | Budget table §3 and (12) | **CHECKED**, recomputed in exact rationals | Derived independently from (9) `F x^ε[√(Dx) + x^(3τ/2)(D^(5/4)W^(3/2) + √(DN))]` with F ≤ √N log^C, D = x^δ, W = x^w, N = x^b: zero ↦ (δ+b+1)/2 = 1/2+(a+b)/2−w/2; cross ↦ b/2+5δ/4+3w/2 = 5a/4+b/2+w/4; periods ↦ b+δ/2 = b+a/2−w/2. Right swaps (a,b),(w,v). Exactly the table. (12): J_R = 31/50+θ/2 identically; W_R ≤ 5θ/4+3/200 with slack 3δ/4−9/50 ≥ 0 **using δ ≥ w** (equality at δ = 6/25); P_R ≤ θ+43/200 with slack ν/2−1/40 ≥ 0 **using ν ≥ v** (equality at ν = 1/20). At θ = 19/25: (1, 193/200, 39/40) — J_R reaches 1 and J_R < 1 ⟺ θ < 19/25, both correct. W_L = (5δ+2ν)/4+77/200, so W_L < 1 ⟺ 5δ+2ν < 123/50 **identically**; W_L < 1 plus δ ≥ w gives δ+ν < 87/100, J_L < 24/25, P_L < 4/5. At the concrete cuts θ = 3/4, λ = 49/20: J_R = 199/200, W_R ≤ 381/400, P_R ≤ 193/200, W_L ≤ 399/400 — all four match the note. Benchmark (2/5,2/5): 179/200, 51/50, 21/25, 217/200 — match. Containment claims: `dispersion-range.md` (2), `sparse-dispersion.md` (1) and `prime-power-dispersion.md` (14) each carry W_L < 1 as an explicit hypothesis, so they lie in the left region; `endpoint-fourier`'s 𝔟 < 1 forces a+b < 40/39 and `endpoint-pairing`'s 𝔠 < 1 forces a+b < 34/33, both < 21/20, hence θ < 19/25, the right region. The note's "does not discard an earlier controlled corner" holds. Also checked §2's substitutions: (5) is (13) of prime-power-dispersion with D ↦ D/P term by term; (6) follows from (4) with R ≥ 1, R ≤ PW, P ≤ W; (7) is the singleton (P=1) case; (8) is the P=R=1 case and matches the direct Cauchy-in-n-then-d route via f/√A ≤ √(x/(DN)). All four reproduce exactly. |
| (v) | Both endpoint conventions and σ | **CHECKED** | See (i′). `residual-coverage.md` (10) is the native right phase (σ = −1, unshifted z_0 = x/2, z ∈ [x/2,x]); the left is the reciprocal (σ = +1, both endpoints shifted by 2), which is what `prime-power-dispersion.md` (5) actually uses. `grouped-divisor-moment.md` §1 is stated for arbitrary σ ∈ {−1,1}, θ ∈ {1,2} and arbitrary \|z_0′\|,\|z′\| ≤ x, \|z′−z_0′\| ≤ x, so both conventions are inside one lemma. **Residual ASSUMED-UNVERIFIED sub-item:** the *right-orientation* version of the prime-power/first-branch moment is asserted ("Absolute completion and gcd estimates are unchanged by that sign"), not rewritten. Its ingredients (Ramanujan/Weil completion, gcd averages, endpoint sup+TV) are manifestly sign- and shift-agnostic given the endpoint bounds, and grouped (1) supplies the generic statement, so I judge the assertion sound; but it is an assertion. |
| (vi) | ψ(integer) = −1/2 and incompatible congruences | **CHECKED, exact** | `#{A<n≤m : n≡n_0 (q)} − (m−A)/q = ψ((A−n_0)/q) − ψ((m−n_0)/q)` is an identity for ψ(u)={u}−1/2, since ⌊y⌋ = y − ψ(y) − 1/2. Verified over 59,232 cases (a,b ≤ 40, A=13, B=60, all m), 0 failures. For incompatible (a,b) (g ∤ 2) the **actual count is exactly 0**, not approximately zero: 366 incompatible pairs enumerated, every count 0 (`c1.js`). So setting Δ = 0 there is exact, and the Vaaler majorant is never applied to a phantom class. |
| extra | `residual-coverage.md` (3) and the sector allocation | **CHECKED** | (3) verified with complex twists s ∈ {0, 0.3+2.7i, 1/log(1000)+13.5i, −8.2i}: 8,096 instances, 0 failures; the two interval indicators are disjoint in every instance (I has ratio ≤ 2, and this survives the clipped last interval); ℓ with ≥2 repeated primes give A₁ ≡ 0 (158 instances). The sector list is exhaustive: A₀ and the ℓ∈I part of A₁ (support O(D)) → (8); squarefree first-power → prime-power-dispersion k=1, D^(5/4)W^(3/2); nonsquarefree first branch (original divisor pm, expanded p^k m) → (5)–(6), D^(5/4)W^(3/4); nonsquarefree negative branch → k ≥ 2, D^(5/4)W; p = 2 → (7), D^(5/4)W^(1/4). All dominated by D^(5/4)W^(3/2), so (9) covers the whole coefficient. `Λ(p^k) = log p` (not k log p) is used correctly. |

### Imported theorems, hypotheses, met or not (Part 1)

| import | primary source as cited | hypotheses | met here? |
|---|---|---|---|
| Vaaler polynomial + Fejér majorant, ψ_T and D_T | Baier–Zhao, Lemma 2.2, p. 344 (IMPAN) | T ≥ 1 integer; inequality for all real u incl. integers with ψ(k) = −1/2 | **Not fetched.** I verified the *stated* inequality numerically (2,025 points, T up to 17, tight at integers) and re-derived D_T ≤ min(1/2, 1/(8(T+1)²‖v‖²)) from the closed Fejér form. The content is classical (Vaaler 1985); the page/lemma numbering is unverified by me. |
| Ramanujan sum \|S(0,r;c)\| ≤ (r,c) and composite-modulus Weil \|S(t,r;c)\| <<_ε c^ε√(c(t,r,c)) | Pascadi, Lemmas 3.2–3.3, GAFA DOI 10.1007/s00039-026-00746-0 | any c ≥ 1, r possibly nonprimitive, t possibly 0 | **ASSUMED-UNVERIFIED here.** Review 01 verified both inequalities independently over 1.27M complete sums (max ratio 1.0000) and could not fetch the paper. Same status. |
| Bettin–Chandee Thm 1 + Remark 1 | arXiv:1502.00769 | dyadic supports, (m,n)=1, ϑ ≠ 0, arbitrary coefficients, C¹ perturbation with parameter X | Used by `endpoint-fourier`/`endpoint-pairing`, **not** by the residual-coverage §§2–3 route (which uses dispersion + Weil completion). Report 03 read v1 via ar5iv and found no hypothesis failure. Not re-checked here. |
| Uniform excluded-prime Möbius mean (untwisted density) | `signed-divisor-grouping.md` §2 (7)–(8) | fixed e; d-interval with lower endpoint ≥ U/2; exclusion parameter m ≤ x² | **Applicability CHECKED** (all four sets A, B, A∩B, A∪B, and W_>∩(A∪B), are initial/interval d-segments at fixed e with lower endpoint ≥ U). **The lemma itself: not re-derived here**; review 02 checked it. |
| `prime-power-dispersion.md` (13) | derived in that note from (6)+(11)+(8)–(10) | k fixed before the moment; power bands R ≤ p^k < 2R, P = R^(1/k); odd p; F = ‖right‖₂ | **Consistency CHECKED**: (13) follows from (12)+(6) with the stated envelope f/√A ≤ √(x/(DRN)); the D ↦ D/P substitution in residual-coverage (5) is term-by-term correct; the k=1 / k≥2 table entries follow from P=R and P ≤ √R. **The interior derivation of (12) — the collision counts (8), the prime-power gcd identity (9) and the harmonic averages (10) — was NOT re-derived here.** |
| `sparse-dispersion.md` (1), `dispersion-range.md` (2) | those notes | W_L < 1 among the strict hypotheses | Used only for the containment remark in §3, which is **CHECKED** at the level of the stated hypotheses. Their derivations were not audited. |

### What Part 1 does *not* establish

`E_>(x) − E_*(x) = O_H(x/log^H x)` holds **conditional on** the six imports above,
of which two (Pascadi 3.2–3.3, Baier–Zhao 2.2) are external and unfetched here,
and one (`prime-power-dispersion` (8)–(12)) is an internal derivation I did not
re-run. The transfer adds no information about the sign or size of E_*. The
sufficient margin C₂x + E_*(x) ≥ c·x/log^K x remains OPEN.

---

## PART 2 — claim-by-claim on `04-reachability-coverage.md`

Every number below was recomputed in exact BigInt rationals in `rc/c4.js`,
independently of the report's `poly.js` (different clipper, different order of
constraints).

| claim | status | check |
|---|---|---|
| Budgets from grouped (14): right (1+a)/2, a/2+3b/2, a; left swaps a,b | **CONFIRMED** | √(Mx) → (1+a)/2, √M N^(3/2) → a/2+3b/2, M → a, with M = x^a, N = x^b. In (p,q) = (1−a, 1−b): right 1−p/2, 2−p/2−3q/2, 1−p; left 1−q/2, 2−q/2−3p/2, 1−q. All reproduce. |
| Q1: cross term enters neither the zero nor the period budget; zero forces p ≥ 2η₀ (right), q ≥ 2η₀ (left); S_0 unreachable for every γ incl. +∞ | **CONFIRMED (derived, within the stated shape)** | (1+a)/2 ≤ 1−η₀ ⟺ a ≤ 1−2η₀ ⟺ p ≥ 2η₀; period a ≤ 1−η₀ is implied. No γ appears in either. Correct. |
| Q1.2: S_0 ⊂ W_dagger for η₀ < 1/400 | **CONFIRMED** | On S_0: de → 171/100−4η₀ > 3/4; d⁵e² → 57/10−14η₀ > 49/20; d → 19/25−2η₀ = 152/200−2η₀ > 151/200 ⟺ η₀ < 1/400. Exact. |
| Q1.4: neither the trivial MN ≤ x^(1−τ) branch nor the density reaches E_dagger on S_0; residual-coverage §3's zero budgets at a=b=1 are 59/40 and 69/50 | **CONFIRMED**, with one wrong exponent | 59/40 and 69/50 reproduce exactly, both > 1, and grouped's (1+a)/2 = 1 is strictly the best at the edge. **Slip:** the report writes "a+b = 171/100 − 4·η₀" and "MN ≥ x^(1.71−4η₀)". On S_0, a+b = 2−4η₀ (171/100 is δ+ν, not a+b), so MN ~ x^(2−4η₀). The conclusion is unaffected and in fact stronger. |
| Q1.6 item 3: the diagonal u₁=u₂, h₁=h₂ is nonnegative and of exact order B²C²f²MN/A, so the zero budget is attained, not wasteful | **CONFIRMED as an order statement, with a genericity caveat** | The diagonal is Σ_u \|b_u\|² Σ_h \|c_h\|² Σ_{m,(m,u)=1} \|Φ_{u,h}(m)\|² ≥ 0. \|Φ\| = 2\|sin(π h(z′−z₀′)/(gmu))\|; for v ≤ 1 this is ≍ v = f pointwise, for v ≥ 1 it averages to ≍ 1 = f over m. So the order is right **provided \|z′−z₀′\| ≍ x**, which holds at the endpoint t ~ x that the supremum over t selects. At t near z₀ the diagonal is genuinely smaller — that is a caveat on "exact order", not on the conclusion, since the estimate must hold uniformly in t. f²MN/A = x on A ~ MN/x, and A ~ MN/x ≤ T is inside the retained harmonic range. |
| Q1.6 item 2: F = ‖A_left‖₂ << √M log x, "sharp" | **OVERSTATED by √(log x)** | A_left is supported on l = dr with d ∈ I, r a prime power ≤ W, i.e. ~D·π(W) ≍ M/log W values, not ~M values, with sizes ≍ log r. So ‖A_left‖₂ ≍ √(M log x), not √M · log x. The **exponent** claim — that the √M cannot be removed — is correct and is all that D1/D2 use. Word "sharp" is wrong at the log level. |
| Q1.5 item 1: S_0 carries (1−o(1)) of the crude O(x² log^C x) mass | **CONFIRMED** | (D₀ − x^(19/25−2η₀))(E₀ − x^(19/20−2η₀)) = (1+o(1))D₀E₀ for fixed η₀ > 0. |
| Q1.5 item 2: absolute term mass of R on S_0 is >> η₀² x log² x | **CONFIRMED arithmetically; one standard input asserted** | Σ_{r prime ∈ (x^(6/25), x^(6/25+2η₀)]} 1/r = log(1+(25/3)η₀)+o(1) and Σ_{r′} 1/r′ = log(1+40η₀)+o(1) by Mertens — both reproduce. β_V(r)β_Z(r′) = (log r)(log r′) ≥ (6/25)(1/20)log²x = (3/250)log²x — exact. Product gives >> η₀² x log² x for small η₀. **Asserted, not proved in the report:** "for fixed coprime r,r′ the count of n ≤ x with r\|n, r′\|n−2 and both cofactors squarefree is >> x/(rr′)". That is a standard two-condition squarefree sieve, but it is an input, not a derivation. |
| Q4.3's flagged gap: the O(1/log x)-thin top dyadic boxes were not covered by Q1.5 | **The gap is real (unchecked in the report) and it closes in the same direction** | Take η₀ ≍ 1/log x (one dyadic box). By Mertens on a dyadic prime band, Σ_{P<r≤2P} 1/r ≍ log 2/log P, giving (25 log2/6)/log x and (20 log2)/log x. Product × (3/250)log²x × x ≍ (500 log²2/6)(3/250)·x ≈ 0.48x. So a **single** top dyadic box still carries absolute term mass >> x with an absolute constant. Q1.5's conclusion therefore extends to the last box; the report was right to flag that it had not checked, and wrong only in leaving open which way it would go. |
| Q3.2 required savings at nine named boxes | **CONFIRMED, all exact** | γ_req = min{δ+3ν−161/100, 3δ+ν−123/100}. Reproduced: (2/5,2/5) → (−1/100, 37/100); (47/150,67/150) → (13/300, 47/300); (8/25,9/20) → (3/50, 9/50); (1/2,1/2) → (39/100, 77/100); (6/25,63/100) → (13/25, 3/25); (1/2,7/10) → (99/100, 97/100); (19/25,1/20) → (unusable, 11/10); (6/25,19/20) → (37/25, unusable). |
| Q3.3 polygon areas and vertices | **CONFIRMED, all exact** | Independent Sutherland–Hodgman clipper over exact BigInt rationals reproduces every row: γ=0 → 35347/120000 (62.9%), 3/50 → 27863/97500 (61.1%), 1/5 → 651/2500, 39/100 → 25871/120000, 1/2 → 3/16, 1 → 1/12, 11/10 → 27/400, 37/25 → 169/7500, 7/4 → 1/192, 2 → 0, and the same vertex lists. Domain area 117/250. Relative reduction 0 → 3/50 is **2.98%** — the report's "about 3 percent" is right. |
| Q3.5: γ = 2 is the exact threshold at which the leftover reduces to S_0, and no smaller γ works | **CONFIRMED** | At γ=2, added = {p ≥ 2η₀} ∪ {q ≥ 2η₀} (the cross conditions are implied), complement = S_0; my clipper gives bulk area 0 at γ=2 and a single vertex (19/25,19/20). For γ < 2−8η₀ the bulk contains p = q = (2−γ)/4 > 2η₀, in the domain (p ≤ 13/25, q ≤ 9/10 both satisfied). Correct. |
| Q3.1 rows S_R, S_T: "vanishes when γ ≥ 11/10 − 4η₀ / 37/25 − 4η₀ (full edge cleared)"; Q4.1 D3 rows "the whole d-edge \| 11/10", "the whole e-edge \| 37/25"; and "S_T needs 2−γ > 13/25 and S_R needs 2−γ > 9/10" | **DEFECTIVE** | S_R \ S_0 = {p < 2η₀, q ≥ 2η₀, 3p+q < 2−γ+2η₀}. Its cheapest point to clear is p→0, q→2η₀, requiring γ ≥ 2−2η₀, **not** 11/10. γ = 11/10 = 2 − 9/10 clears only q = 9/10, i.e. the single point (δ,ν) = (19/25, 1/20) — which Q3.2's own table correctly labels "cheapest point of the d-edge". Symmetrically 37/25 = 2 − 13/25 clears only (6/25, 19/20). The report used the domain **maximum** of q (resp. p) where it needed the **minimum**. Concretely: at (δ,ν) = (19/25, 1/2), which is on the d-edge and inside W_dagger, γ_req = 2 − 1/2 = 3/2 > 11/10. Consequence: D3's "18.3×" and "24.7×" rows are not the cost of clearing those edges; the cost of clearing either edge (minus the corner) is γ → 2, i.e. the same 33.3× as the S_0 row. This makes J1's conclusion *stronger*, not weaker, and does not disturb Q3.3 (whose strips have measure O(η₀) and vanish as η₀ → 0). |
| Q2.2: the e-edge proper-prime-power class costs x^(39/40) and is "**not** negligible against x/log^H x ... must be carried as an explicit separate class" | **DEFECTIVE** | x^(39/40) log^C x / (x/log^H x) = x^(−1/40) log^(C+H) x → 0. A fixed power saving beats every fixed log power — the same principle the notes use for L·VZ ≤ x^(99/100) in `signed-divisor-grouping.md` (2) and for E_L. The class is negligible and need not be carried. The size x^(39/40) itself is right (dominant j = 2: Σ_{P > Z^(1/2)} x/P² << x/x^(1/40)). J4's "its proper-prime-power class alone costs x^(39/40) and must be handled, not discarded" inherits the error; J4's other three reasons for deprioritising the e-edge (worse split, smaller short variable, largest clearing price) are unaffected. |
| Q3.1: "{p+q ≤ 19/20} ∩ {5p+2q ≤ 81/25}  [the old de≤x^(3/4) and d⁵e²≤x^(49/20) cuts, in p,q]" | **DEFECTIVE label** (arithmetic self-consistent) | p+q = 171/100 − (δ+ν) and 5p+2q = 57/10 − (5δ+2ν). δ+ν > 3/4 gives p+q < 24/25; 5δ+2ν > 49/20 gives 5p+2q < 13/4. The report's 19/20 and 81/25 correspond to δ+ν ≥ 19/25 and 5δ+2ν ≥ 123/50 — the **limiting sufficient region** (11), not the concrete cuts of (19). Q3.3 is computed consistently at the limiting level (my clipper reproduces its vertices using 19/25 and 123/50), and Q3.3 does say "eta_0 → 0", so the areas are internally consistent; only the bracketed identification is wrong. Size of the discrepancy, for the record: the genuine W_dagger area (concrete cuts 3/4, 49/20, and the (19) disjunction d > x^(151/200) or de³ > x^(321/200)) is **142537/480000 = 0.29695 (63.45% of the domain)** versus the report's 35347/120000 = 0.29456 (62.94%) — 0.51 percentage points, 0.8% relative. |
| Q3.4 exact coupled cuts with saving γ | **CONFIRMED** | κ < 19/25, λ < 161/100+γ, ρ < 19/20, σ < 123/100+γ match the budgets. At γ = 1/10: 151/200 < 152/200, 341/200 < 342/200, 189/200 < 190/200, 265/200 < 266/200 — all four strict; and (8/25,9/20) has de³ = x^(167/100) = x^(334/200) ≤ x^(341/200) and d = x^(64/200) ≤ x^(151/200), so it is inside C. At γ = 3/50 exactly, λ = 167/100 and the box is on the boundary — "no fixed slack", correct. The Perron template (four integrals, combined twist d^(−s₁−5s₂−s₃−3s₄) e^(−s₁−2s₂−3s₃−s₄), all Re ≥ 0, cost O(log⁴x), error O(x^(2+max−10))) is a correct reuse of residual-coverage §4. |
| Q1.3: a ≤ 1 for every admissible w; the a=1/b=1 edges survive w → 1/4 and v → 3/50 | **CONFIRMED** | a = δ+w ≤ (1−w)+w = 1 with equality at δ = 1−w. Structural. |
| Q2.1/Q2.3 algebra (k = rs with exactly one prime power above V; the corner reduces to Σ_{m~x^(71/100)} μ(d₀+r′m)μ(c₀+rm) over x^(29/100) dilation pairs, total mass x) | **CONFIRMED** | k < x^(6/25+2η₀) < V² for η₀ < 3/25; d-edge proper powers cost x^(22/25). d = d₀+r′m with d ~ x^(76/100), r′ ~ x^(5/100) gives m ~ x^(71/100); e = c₀+rm ~ x^(95/100); x^(29/100)·x^(71/100) = x. All exact. |

### DERIVED vs JUDGEMENT in report 04, as I read it

- **Derived and correct:** Q1.1–Q1.4 (modulo the a+b slip), Q1.5 (modulo the
  asserted squarefree count), Q1.6 items 1 and 3, Q2.1/Q2.3's algebra, Q3.1's
  region definitions, Q3.2, Q3.3, Q3.4, Q3.5, D1, D2, D4, D5, D6, D7.
- **Derived and wrong:** the S_R/S_T clearing thresholds in Q3.1 and their
  restatement in D3; the "not negligible" claim about x^(39/40) in Q2.2 (and its
  reuse in J4); the p,q translation label in Q3.1. Plus the two imprecisions
  above (a+b = 171/100; ‖A_left‖₂ "sharp").
- **Judgement, correctly flagged as such:** J1–J5, Q2.4's pricing table, Q3.5's
  heuristic square-root-cancellation diagnostic.
- **One modelling choice worth naming, not an error:** η₀ is treated throughout
  as a *fixed constant*. The consumer only needs O_H(x/log^H x), so a per-box
  saving of log^(−K) x suffices, i.e. η₀ ≍ (log log x)/(log x) is admissible.
  Under that weaker requirement the unreachable corner is not a fixed-width
  strip but the top O(log log x) × O(log log x) block of dyadic boxes — it does
  **not** disappear (the very last box has zero budget 1 − O(1/log x), i.e. no
  saving at all), and by my extension of Q1.5 it still carries absolute mass >> x.
  So D1 survives; the *size* of S_0 as written is overstated.

---

## What I did not check

- The interior of `prime-power-dispersion.md` §§4–5 — the zero-numerator count
  (8), the prime-power gcd identity (9), the harmonic averages (10), and the
  assembly (12). I checked only that (13) follows from (12)+(6), that the
  D ↦ D/P substitution into residual-coverage (5)–(6) is term-by-term correct,
  and that the k=1/k≥2 table entries follow.
- `sparse-dispersion.md` and `dispersion-range.md` beyond reading their
  hypothesis lists to verify the containment remark in residual-coverage §3.
- Pascadi Lemmas 3.2–3.3 and Baier–Zhao Lemma 2.2 as *published statements*
  (numbering, page, exact wording). I verified their mathematical content
  numerically and by re-derivation from the Fejér closed form.
- `signed-divisor-grouping.md` §2's excluded-prime Möbius lemma itself
  (review 02 checked it); I checked only that residual-coverage's four sets
  present it with the interval shape it requires.
- The right-orientation rewrite of the prime-power moment (asserted in
  residual-coverage §3, generic statement available in grouped (1)).
- `residual-coverage-validation.js` and the other repo validators: not run. I
  wrote independent checks instead so a shared implementation bug could not hide.
- Whether the sufficient margin is plausible. Out of scope; nothing here bears
  on it.

## Falsifiers, and whether they ran

| falsifier | ran? | outcome |
|---|---|---|
| endpoint-fourier (5) failing for some (n, I, W) | yes, 5,995 cases | none found |
| residual-coverage (3) failing, or its two indicators overlapping, under a complex twist | yes, 8,096 cases + 158 zero-cases | none found |
| the CRT origin identity n₀/q ≢ (2/g)m̄/n | yes, 30,550 pairs | none found |
| reciprocity not shifting **both** endpoints by 2, or not flipping σ | yes, 39,654 cases exact mod 1 | none found (a wrong-shift variant fails immediately) |
| the block form ≠ Σ_m A_left(gm)Y(m) after Vaaler | yes, 3 endpoints, max error 2.1e−14 | none found |
| ψ(integer) ≠ −1/2 breaking the Vaaler inequality | yes, tight at 1/2 on both sides | none found |
| an incompatible (a,b) contributing a nonzero count | yes, 366 pairs | every count exactly 0 |
| a budget-table entry in §3 or (12) not matching its bound (9) | yes, exact rationals | all match |
| report 04's areas/vertices differing from an independent clipper | yes, all ten γ values | all match |
| a γ < 2 clearing an edge strip | yes, by construction | **γ = 11/10 does not clear the d-edge**; counterexample (19/25, 1/2), γ_req = 3/2 |
| x^(39/40) being non-negligible against x/log^H x | yes, by inspection | it is negligible; report 04's Q2.2 is wrong |

## Standing caveat

Finding no defect in the E_> → E_* transfer is not evidence that a proof is near.
The transfer moves the summation domain and changes nothing about the sign or
size of the remaining endpoint sum. Both the concrete consumer
C₂x + E_*(x) ≥ c·x/log^K x and twin-prime infinitude remain OPEN. The three
corrections to report 04 make its negative conclusion (a succession of local
kernel improvements does not exhaust W_dagger) stronger, not weaker.
