**Question.** Does Bettin–Chandee, *Trilinear forms with Kloosterman fractions*,
Adv. Math. 328 (2018) 1234–1262 (arXiv:1502.00769v1), **Corollary 1**, applied
directly to the determinant equation `dk − et = 2` after the non-smooth part of
`β_V` and `β_Z` is moved onto the arbitrary-coefficient side, control any part of
the endpoint remainder `E_dagger` that the current estimates do not?

**Calibration and global payoff.** DERIVED, negative: the transfer is legal and
exact — the smoothness hypothesis the wave literature scout recorded as the
blocker is removable — but priced it adds **zero** area; `W_dagger` does not
shrink, `E_dagger` is unchanged, the required saving in grouped-divisor-moment
(21) is unchanged, and the sufficient twin margin `C_2 x + E_dagger ≥ c_0 x/log^K x`
remains OPEN.

Deliverables: `research/determinant-corollary.md` (new, ledger id
`Q-determinant-corollary`, status ANSWERED, todo C) and
`research/determinant-corollary-validation.js` (new, 0.2 s, output under
`node research/qc/embed.js` custody, 28 checks + 4 negative controls, all pass).
No existing repo file was edited and no git state was changed.

---

## 1. The decomposition

`β_W(k) = 0` for `k ≤ W`, so the constraints `k>V`, `t>Z` may be **deleted from
R(x) first**. This is load-bearing: kept, `k>V` would become `r k' > V`, a sharp
condition coupling the smooth variable to the coefficient index, which no dyadic
decomposition separates. After deletion, `d>U` and `e>Y` are the only sharp
divisor conditions and they sit on the arbitrary coefficients, where they are free.

Then `β_W(k) = log k − Σ_{r|k, r≤W} Λ(r)` on both cofactors, with the exact
bijection `(d,r) → l = dr` of endpoint-fourier §2, gives exactly

    R(x) = T_11 − T_10 − T_01 + T_00,

every sum over `m_1 n_2 − m_2 n_1 = 2`, `m_1 n_2 ∈ J_x`:

| piece | `β` on `n_2` | `α` on `n_1` | `f(m_1)` | `g(m_2)` |
|---|---|---|---|---|
| T_11 | `µ(d)1_{d>U}`, `n_2 = d` | `µ(e)1_{e>Y}`, `n_1 = e` | `log m_1` | `log m_2` |
| T_10 | `B_V(n_2)=Σ_{n_2=dr, d>U, r≤V} µ(d)Λ(r)` | `µ(e)1_{e>Y}` | `1` | `log m_2` |
| T_01 | `µ(d)1_{d>U}` | `A_Z(n_1)=Σ_{n_1=er', e>Y, r'≤Z} µ(e)Λ(r')` | `log m_1` | `1` |
| T_00 | `B_V(n_2)` | `A_Z(n_1)` | `1` | `1` |

`|B_V| ≤ Σ_{r|n_2}Λ(r) = log n_2`, so `‖α‖‖β‖ ≪ √(N_1N_2) log²x`. The sparse
prime-power support improves this only to `√(N_2 log x)` — a log gain, no power.

Supports: `n_2 ~ x^(δ+ρ)`, `ρ∈[0,6/25]`; `n_1 ~ x^(ν+ζ)`, `ζ∈[0,1/20]`;
`m_1 ~ x^(1−δ−ρ)`, `m_2 ~ x^(1−ν−ζ)`. Write `A = δ+ρ`, `B = ν+ζ`. The worst band
`(ρ,ζ)=(6/25,1/20)` reproduces exactly the repo's expanded exponents `a`, `b`.

**Parity / `g ∈ {1,2}`: it does not arise.** Corollary 1 acts on the equation, so
the CRT origin `n_0`, the inverse residue and the two gcd branches are never
formed. Its main term already carries `(n_1,n_2) | Δ`, which at `Δ=2` is exactly
our compatibility `g=(a,b)|2`; incompatible pairs contribute nothing because the
equation has no solution. This is a bookkeeping simplification, not a saving.

**Main term: it matches.** Corollary 1's main term has density factor
`(n_1,n_2)/(n_1n_2) = g/(ab)` and modulus `[n_1,n_2] = ab/g` — identical to
`M_>` of signed-divisor-grouping §5. The only difference is the continuous
integral against the inserted smooth weights vs. the discrete sharp count, and
that difference is bounded by the same smoothing error priced below. At fixed
`e,r,r'` it is a coprimality-restricted `Σ µ(d)/d` against a bounded-variation
weight, i.e. the shape endpoint-fourier §3 already discharges with the uniform
excluded-prime Möbius mean, so it is `O_H(x/log^H x)`. **No mismatch to report.**
DERIVED by citation, not rewritten line by line; nothing in the verdict depends
on it, since the error term fails first.

**Meeting the smoothness hypothesis.** The remaining coupling `dk ∈ J_x` is
separated by truncated Perron at height `T_P = x^κ`, `c = 1/log x`:
`(x/n)^s = x^s · n_2^{-s} · m_1^{-s}`, the `n_2^{-s}` joining the arbitrary
coefficient (modulus ≤ 1) and `m_1^{-s}` joining `f`. Boundary/truncation error
`O(x^(1−κ) log^C x)`; `f = φ(m_1/M_1)(m_1/M_1)^{-s}` gives `|f| = O(1)` and
`f^(j) ≪_j (1+T_P)^j M_1^{-j}`, i.e. `η ≍ x^κ > 1`. `log m_1 = log M_1 +
log(m_1/M_1)` factors the log-weight into a constant `≪ log x` times a smooth
`O(1)` function with `η ≍ 1`. `R = M_1N_2/(M_2N_1) + M_2N_1/(M_1N_2) = O(1)`,
because `m_1n_2 = dk ≍ x` and `m_2n_1 = dk−2`. This is the one structural
advantage of the determinant formulation here.

## 2. The decisive inequality, exact rationals

One application costs `x^(3κ/2 + (17/20)(A+B) + (1/4)max(A,B) + ε)`; the
`O(log^C x)` applications and the Perron error do not move the exponent, and `κ>0`
is fixed but arbitrarily small. So, with a fixed margin,

    (17/20)(A+B) + (1/4)max(A,B) < 1   ⟺   22·max(A,B) + 17·min(A,B) < 20.

Since `22max + 17min ≥ (39/2)(A+B)`, this forces `A+B < 40/39`. At the worst band
`A=a=δ+6/25`, `B=b=ν+1/20`:

    δ + ν < 40/39 − 6/25 − 1/20 = 2869/3900 = 0.735641… < 19/25.

**So the all-pieces region is strictly inside `δ+ν < 19/25`, which is already the
first of the three controlled regions. It adds nothing.**

## 3. Region table

| object | region in (δ,ν) | vertices | area | added area |
|---|---|---|---|---|
| all four pieces, all bands | `2200δ+1700ν<1387` **and** `1700δ+2200ν<1482` | (6/25,1/20), (651/1100,1/20), (266/975,361/780), (6/25,537/1100) | 342383/4290000 = 0.079810 | **0 (exactly)** |
| log-log piece only (ρ=ζ=0) | `22δ+17ν<20` **and** `17δ+22ν<20` | (6/25,1/20), (19/25,1/20), (19/25,82/425), (20/39,20/39), (6/25,199/275) | 167659/729300 = 0.229890 | 17013209/280280000 = 0.060701 |

Domain area 117/250. The log-log added area is **12.97 %** of the domain; its
vertices are (3263/4900,771/2450), (20/39,20/39), (6/25,199/275), (6/25,63/100),
(47/150,67/150), (67/200,17/40), and in the reachability report's coordinates
`p=19/25−δ`, `q=19/20−ν` (area-preserving) (461/4900,3113/4900),
(241/975,341/780), (13/25,249/1100), (13/25,8/25), (67/150,151/300), (17/40,21/40).

Named points (error exponent at `κ=ε=0`):

| point | a, b | all pieces | log-log | currently controlled |
|---|---|---|---|---|
| benchmark (2/5,2/5) | 16/25, 9/20 | **2173/2000 = 1.0865, fails** | 39/50, passes | yes |
| next target (8/25,9/20) | 14/25, 1/2 | **1041/1000, fails by 41/1000** | 767/1000, passes | no |
| (1/2,1/2) | 37/50, 11/20 | **2563/2000 = 1.2815, fails** | 39/40, passes | no |
| corner (19/25,19/20) | 1, 1 | **39/20 = 1.95, fails** | **1691/1000, fails** | no |
| diagonal δ=ν | — | passes iff δ < 1387/3900 = 0.35564 | passes iff δ < 20/39 = 0.51282 | — |

**The log-log row is not a gain for R.** `T_11` on one box is a divisor
correlation; summed over *all* boxes with `d>U, e>Y` it reconstructs a truncated
form of the twin sum. The region for `R` is governed by the worst piece.
The witness (8/25,11/25) is outside the all-pieces region
(`22·14/25 + 17·49/100 = 413/20 > 20`) even though its log-log piece is inside —
one controlled piece of four leaves it uncontrolled.

Cross-check: `a+b < 40/39` is the same constraint endpoint-fourier's use of BC
**Theorem 1** already forces (per review 06). Not a coincidence — Corollary 1 is
proved from Theorem 1 and inherits its `(N_1N_2)^{7/20}(N_1+N_2)^{1/4}` bracket.

## 4. The r-size split adds nothing either

Per-band budgets, **derived here** (the owning notes state only the full box):
the band coefficient `A_1^{(s),ρ}(l) = −Σ_{r|l, r~x^ρ, 2≤r≤W} µ(l/r)(l/r)^{-s}
1_I(l/r)Λ(r)` is pointwise `≤ Σ_{r|l}Λ(r) = log l` and supported on `l ≪ D x^ρ`,
and grouped-divisor-moment (1),(3) is stated for arbitrary `M,N,A ≥ 1` and
arbitrary bounded coefficients. So (14) applies verbatim with
`M = x^(δ+ρ)`, `N = x^(ν+ζ)`, giving right budgets
`(1+δ+ρ)/2`, `(δ+ρ)/2 + 3(ν+ζ)/2`, `δ+ρ`; residual-coverage (9) per band
replaces `W → x^ζ`, `N → x^(δ+ρ)`, `D → x^ν`. At the top band these reproduce
exactly `δ<19/25` and `δ+3ν<161/100` (grid-verified).

Every one of these budgets, and the Corollary 1 exponent, is **nondecreasing in
both ρ and ζ** (grid-verified). Hence each estimate's per-band admissible set is
downward closed in `(ρ,ζ)`, so a split covers `(δ,ν)` iff the **top** band is
admissible for *some* estimate. That set is `current ∪ BC_all = current`.
**The split region equals the current region** (grid-verified).

Not closed by this: a decomposition of `β` other than log-minus-Λ, or an estimate
using the band structure jointly rather than band by band.

For the record, at (8/25,9/20) Corollary 1 covers `ρ < 223/1100` at `ζ=1/20`,
and `ζ < 3/1700` at `ρ=6/25`; the top band misses by 41/1000. Covering a sub-band
does not reduce the saving needed on the binding band, so the `> 3/50`
requirement of grouped-divisor-moment (21) is unchanged.

## 5. Global consumer, and the corner

`W_dagger` does not shrink; the cuts (17)–(19) of grouped-divisor-moment are
untouched; `E_dagger` and (20) read exactly as before; the uniform product
threshold is still every fixed exponent below 19/25.

The corner (19/25,19/20) fails at exponent **39/20**, and no smoothing choice
repairs it. At `δ=19/25` the cofactor `k = n/d ≍ V`, and `β_V(k) ≠ 0` forces the
prime-power part of `k` to exceed `V`. In the log-minus-Λ decomposition all mass
then sits in the top band `ρ = 6/25`, so `A = a = 1` and the exponent is at least
`(17/20)(1+B) + 1/4 ≥ 11/10 > 1`; in the direct decomposition `k = r k'` with
`r > V` we get `N_2 = dr > x` and `m_1 = k'` short, so `A → 1` again. So the
scout's "fails on smoothness" is right at the corner for a sharper reason: the
weight cannot be moved to either side without driving a coefficient exponent to 1.
This is the same `a=1, b=1` edge report 04 Q1 identifies as unreachable by
nonzero-kernel improvement, reached by a different route.

**A larger controlled area is not a lower bound on twins.** Said once.

## 6. Imported theorem: version, number, hypotheses

**Bettin–Chandee, arXiv:1502.00769v1 (3 Feb 2015; Adv. Math. 328 (2018)
1234–1262), Corollary 1.** Read 2026-09-06 at the primary source — arXiv PDF
downloaded and extracted with `pdftotext -layout`, statement read in the
extracted text (p. 4), proof read in its §9 (p. 27). Statement:

> Let `Δ ≠ 0` and let `T(M_1,M_2,N_1,N_2) := ΣΣΣΣ_{m_1n_2−m_2n_1=Δ}
> f(m_1)g(m_2)α_{n_1}β_{n_2}`, supports `M_i := [M_i/2,M_i]`, `N_i := [N_i/2,N_i]`.
> Moreover, assume `f^{(j)} ≪ η^j M_1^{−j}`, `g^{(j)} ≪ η^j M_2^{−j}`, for all
> `j ≥ 0` and some `η > 1`. Then `T = Σ_{(n_1,n_2)|Δ} ((n_1,n_2)/(n_1n_2))
> α_{n_1}β_{n_2} ∫_R f((x+Δ)/n_2) g(x/n_1) dx + O((ηR)^{3/2}‖α‖‖β‖
> (N_1N_2)^{7/20}(N_1+N_2)^{1/4+ε}(M_1M_2)^ε)`, where
> `R := M_1N_2/(M_2N_1) + M_2N_1/(M_1N_2)`.

Hypotheses **checked**: `Δ = 2 ≠ 0` (its §9 additionally notes one may assume
`|Δ| ≤ 4(M_1N_2+M_2N_1)`, satisfied with room; there is a two-term sum over
`d|Δ`); dyadic supports after an `O(1)` resplit of `n_2 = dr` (ratio 4 → ratio 2);
`α, β` arbitrary complex, so `d>U, e>Y, r≤V, r'≤Z`, the Perron twists `d^{-s}`,
the sparse support, the prime 2, repeated prime powers and every low sector are
admissible with no further hypothesis; `f, g` satisfy the derivative bounds with
`η = x^κ > 1`; `R = O(1)`; **no coprimality between `n_1, n_2` is required**.
**No hypothesis fails.** Hypotheses **assumed, not verified**: the corollary's own
proof and Theorem 1 beneath it; the `L²`-norm convention was read, not re-derived.

**Duke–Friedlander–Iwaniec.** Both primary texts **FETCH FAILED today** (a
statement about the fetcher): Invent. Math. 128 (1997) 23–43,
DOI 10.1007/s002220050135, returns the Springer paywall page; no open copy of
*Representations by the determinant and mean values of L-functions* (1995) was
located. Their statements are taken from Bettin–Chandee's own text, read at the
primary source: DFI 1997 (1.1) `B_a(M,N) ≪ ‖α‖‖β‖(a+MN)^{3/8}(M+N)^{11/48+ε}`;
DFI 1995 obtained the same determinant corollary with error
`(ηR)^{19/8}‖α‖‖β‖(N_1N_2)^{3/8}(N_1+N_2)^{11/48+ε}(M_1M_2)^ε`. Priced the same
way it needs `(7/8)(A+B) + (11/48)max(A,B) < 1`: diagonal threshold
**48/95 = 0.505263** against BC's **20/39 = 0.512821**, its all-pieces region is
contained in BC's, and it likewise adds nothing. Reading the DFI originals would
not change the verdict.

**Was Corollary 1 already applied here? No.** endpoint-fourier §5,
endpoint-pairing, coefficient-structure, dispersion-range and
prime-power-dispersion all import BC **Theorem 1 + Remark 1**, applied to the
post-Vaaler trilinear Kloosterman fraction. small-divisor-kernel §5A prices
Theorem 1 (129/125) and DFI (1.1) (1267/1200) on the post-reciprocity kernel.
structural-literature-audit §3 does **not** mention Bettin–Chandee at all — §3B
is Blomer–Pascadi/Pascadi, §3F is Friedlander–Iwaniec's asymptotic sieve. The
wave scout report §F located Corollary 1 and recorded the smoothness failure but
did not attempt the transfer. **New here:** that the smoothness hypothesis is
removable, the exact four-piece decomposition, the pricing, and the split
argument — all negative.

## 7. Uncontrolled sectors, and what would change the verdict

Everything in `E_dagger` remains uncontrolled; nothing is added to
grouped-divisor-moment (19). Two dependencies inside the note are cited rather
than rewritten: the identification of the corollary's main term with `M_>`
(reuses endpoint-fourier §3 + the excluded-prime Möbius mean), and the per-band
budgets (a re-application of grouped-divisor-moment (1),(3), not a statement in
that note). Neither affects the verdict.

Would change it, none established:
* an error `‖α‖‖β‖(N_1N_2)^γ(N_1+N_2)^κ` with smaller exponents. At (8/25,9/20)
  the requirement is `(1/2+γ)(a+b)+κa<1`: holding `κ=1/4`, `γ < 33/106 = 0.31132`
  against 7/20; holding `γ=7/20`, `κ < 99/560 = 0.17679` against 1/4. Same order
  as small-divisor-kernel §5A's `γ<9/28`, `κ<27/140` for Theorem 1 on its own
  object at the same box;
* a version averaged over `Δ` (BC point at one, citing Bettin–Chandee–Radziwiłł);
  our `Δ=2` is fixed, so unavailable;
* a decomposition of `β_V` other than log-minus-Λ keeping both coefficient
  exponents inside the boundary at the top band;
* an estimate exploiting the band structure jointly rather than band by band.

A failed upper bound closes its own scope: nothing above shows the determinant
formulation is dead, that Möbius cancellation is necessary, or that any other
method is obstructed.

## 8. Validation and repo state

`node research/determinant-corollary-validation.js` — 0.2 s, 28 checks + 4
negative controls, all pass; output embedded via `node research/qc/embed.js`
(`--check` reports code-sha, body and out-sha all matching). Exact BigInt
rationals for every region number; finite enumeration for `β_W(k) = log k −
Σ_{r|k,r≤W}Λ(r)`, the vanishing below `W`, the four-piece identity on five
parameter sets, and `|B_V(n_2)| ≤ log n_2`. Controls that fire: swapping
max/min in the error term; using `(δ,ν)` for `(a,b)`; re-imposing `m_1>V, m_2>Z`
inside the four pieces; dropping the norm factor.

`node research/qc.js`: TOTAL 2, both requiring files I was told not to edit —
(i) `crosslinks/unreachable`: `research/determinant-corollary.md` is not yet
cited by any working document; (ii) `ledger/ledger-todo-unlisted`: TODO.md item C
must list `Q-determinant-corollary` on its `Ledger:` line. **Integrating agent
must fix both**, plus add the OUTCOMES.md entry and regenerate QUESTIONS.md.
`node research/qc/selftest.js`: 58 positives fire, 47 controls silent.
`node research/audit-numbers.js`: 251/251 in 168.0 s.
(The `embeds` finding on `research/kernel-sign-control.js` seen mid-session
belongs to a concurrent agent and cleared on its own.)

These certify exponent bookkeeping, finite identities and documentation scope.
They cannot establish an asymptotic saving, an effective onset, or anything about
the sign or size of `E_dagger`.
