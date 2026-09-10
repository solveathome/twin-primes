# 18 — Heath-Brown edges

**QUESTION.** Is the unreachable corner an artefact of the two-cutoff Vaughan identity, or does an equivalent edge reappear under other standard decompositions of Lambda(n) Lambda(n-2)?

**CALIBRATION AND GLOBAL PAYOFF.** Nil, as expected. No arithmetic estimate, no controlled region, no change to W_dagger, E_dagger or the sufficient margin, all of which remain OPEN. The result is a clean negative plus one actionable classical observation about the front end. Everything below is either an exactly checked identity/combinatorial statement (DERIVED), rational bookkeeping over budgets other notes derived (taken as given), a measured density at small X (MEASURED), or a literature import read at the source.

Files: `research/heath-brown-edges.md` (new), `research/heath-brown-edges-validation.js` (new, 49 checks, 3 active negative controls, 1.1 s, output embedded via `node research/qc/embed.js`).

---

## 1. Where a=1 comes from in Vaughan (Statement V, derived)

Vaughan's bilinear piece is exactly `sum_{d>U, k>V, dk=n} mu(d) beta_V(k)` (checked exactly; dropping it breaks the identity first at n=160). `beta_V(k) != 0` forces a prime power r>V dividing k. The grouped-moment shape needs the coefficient to be a function of one divisor of n with the cofactor unweighted, so `beta_V(k) = log k - sum_{r|k, r<=V} Lambda(r)` puts the coefficient on the expanded divisor `l = d*r`, giving `M ~ D*V` and `a = delta + w <= (1-w) + w = 1`, with equality at the top of the d-range where the cofactor is bounded and k is one prime just above V. Same on the right for b. This is `reachability-coverage §2.3` restated identity-side. **Mechanism: the coefficient variable can swallow the whole of n.**

Measured (one small X, no asymptotic): at X=2^20, w=6/25, eta_0=1/100, a measured 0.0948 of n in (X/2,X] sit in that configuration.

## 2. Heath-Brown, level K

Identity (derived here from `1/zeta = M * sum_j (1-zeta M)^j`, and verified exactly for K=1..5 by resolving log prime by prime so everything is integer):
`Lambda = sum_{j=1..K} (-1)^{j-1} C(K,j) mu_{<=U}^{*j} * 1^{*(j-1)} * L`, valid on n <= U^K. Negative control: deviation 12 above U^K at K=2, U=8.

**No prime detector anywhere in the identity.** So the specific question — "is there an edge where one Mobius variable has size x^{1-1/K} and its cofactor is a single prime?" — is **No on both counts**: individual Mobius variables are capped at x^{1/K}, a variable of size x^{1-1/K} exists only as an aggregate with a divisor-bounded convolution coefficient, and no variable is prime-supported. At that edge the cofactor is a free variable of size x^{1/K} with weight 1 or log — the *good* case.

**Lemma G (derived, proved, exhaustively checked).** For K>=3, if v_i>0 sum to 1 and each v_i <= 1-1/K, some subset sums into [1/K, 1/2]. (Fails at K=2: 0.4,0.4,0.2.) Corollary: every HB(K) piece is Type I with modulus < x^{1/K} and one long free variable, or Type II with min part in [x^{1/K}, x^{1/2}]. Checked on 2,368 compositions at den 30, and 195,009 / 195,299 at K=4 / K=5. Negative control: lifting the cap to 1 gives 94 failing compositions.

## 3. The decisive definitional point

The grouped moment's phase `e(h z'/(g m u))` is the sawtooth of the CRT count of `n <= x` with `m | n` and `u | n-2`. **Both cofactors are summed unweighted inside that count.** Hence, for a piece of any identity,

    a = 1 - (largest FREE-variable exponent)

— not the split exponent of the bilinear form. Misreading a as the split exponent makes HB K=3 give (a,b)=(2/3,1/3), budgets 5/6, 5/6, 2/3, all below 1, i.e. a proof of the twin prime conjecture. It does not, because a Mobius variable cannot serve as the unweighted cofactor. This is the false positive the note exists to block.

## 4. Piece table: sup a over Heath-Brown pieces

With mu_i <= 1/K and sum mu + sum nu = 1, `max nu >= 1/j - 1/K`, so `a <= min(1, 1 - 1/j + 1/K)`, attained at mu_i = 1/K and equal nu_i. Confirmed on an exhaustive rational grid for K=3,4.

| K | j | sup a | zero budget (1+a)/2 |
|---|---|---|---|
| 3 | 1 | 1/3 | 2/3 |
| 3 | 2 | 5/6 | 11/12 |
| 3 | 3 | **1** | **1** |
| 4 | 1 | 1/4 | 5/8 |
| 4 | 2 | 3/4 | 7/8 |
| 4 | 3 | 11/12 | 23/24 |
| 4 | 4 | **1** | **1** |
| K | K | **1** | **1** |

**sup a = 1 at every level K**, attained only at j=K with all K Mobius variables balanced at x^{1/K} and every free variable bounded. The edge is relocated, not removed: from "long Mobius times one prime just above a cutoff" to "balanced K-fold Mobius convolution times a bounded cofactor". It is a block, not one box: free variables below x^{2 eta_0} give a > 1 - 2 eta_0, and at eta_0 = C loglog x / log x the affected set never empties, as at S_0.

Applying HB on both sides gives (a,b)=(1,1). Budgets (gamma enters only the cross term):

| configuration | zero | cross | periods | gamma required |
|---|---|---|---|---|
| Vaughan corner S_0, (1,1) | 1.0000 | 2.0000 | 1.0000 | unbounded |
| HB K=3 corner, (1,1) | 1.0000 | 2.0000 | 1.0000 | unbounded |
| HB K=4 corner, (1,1) | 1.0000 | 2.0000 | 1.0000 | unbounded |
| HB K=3 second worst, (5/6,5/6) | 0.9167 | 1.6667 | 0.8333 | 4/3 |
| HB K=4 second worst, (11/12,11/12) | 0.9583 | 1.8333 | 0.9167 | 5/3 |
| Vaughan target box, (14/25,1/2) | 0.7800 | 1.0300 | 0.5600 | 3/50 |

Even ignoring the corner, HB's second-worst configurations ask 4/3 and 5/3 against the 3/50 currently sought at one box (22x and 28x).

Caveat on the transplant: the moment bound holds for arbitrary bounded coefficients so its *exponents* transfer, but the cut separation, density subtraction and endpoint conventions of `residual-coverage §4` are written for R(x) and would have to be redone. The table is an ASSESSMENT at the level of exponents.

## 5. The HB corner object

Up to bounded cofactors it is `sum_n F_K(n) F_K(n-2) * O(1)` with `F_K(n) = sum_{m_1...m_K = n, m_i ~ x^{1/K}} mu(m_1)...mu(m_K)` — the same species as `corner-correlation.md`'s two-point Mobius correlation at shift 2, with the weight reduced from (log r)(log r') to O(1). Measured at K=3, X=2^22: 0.0505 of n admit a balanced 3-factorization, 0.8204 ordered reps per n, `sum|F_3|/X = 0.1847`. **Random-sign control on the same support gives 0.1362 — slightly SMALLER, so Mobius signs give no extra cancellation at these X**, consistent with `kernel-sign-control.md`. Absolute mass of order x, so triangle inequality misses x/log^K x, same as at S_0.

## 6. Front end (the one actionable item)

Type I supplied by BV at x^{1/2}:

| front end | Type I level needed | hard Type II band (min part) |
|---|---|---|
| Vaughan U=V=x^{6/25} (current programme) | x^{12/25} | [0.24, 0.5] |
| Vaughan, best under BV (u=v=1/4) | x^{1/2} | [0.25, 0.5] |
| Heath-Brown K=3 | x^{1/3} | [1/3, 0.5] |
| Heath-Brown K=4 | x^{1/4} | [0.25, 0.5] |

For Vaughan, min(u,v) is maximised at u=v=1/4 subject to u+v <= 1/2, so **[1/4,1/2] is the narrowest band a two-cutoff Vaughan can leave, and HB K=3 leaves the strictly narrower [1/3,1/2] while asking BV for less**. Classical, not novel. The programme's current 6/25 is below even the best Vaughan value. This is orthogonal to the corner: it does not touch a=1.

## 7. Keeping Lambda(n-2): Maynard Question 17

Read at the source (`mathunion.org/fileadmin/IMU/Prizes/Fields/2022/jm.pdf`, fetched 2026-09-06). Verbatim:

> **Question 17** (Type II estimates for twin primes). Can one estimate a Type II sum associated to Twin Primes, such as sum_{n~N} sum_{m~M} alpha_n beta_m Lambda(nm+2) for arbitrary 1-bounded sequences alpha_n, beta_m?

and immediately after, verbatim:

> One might also try to reduce both prime variables to bilinear terms, but sums such as sum_{n~N} sum_{m~M} sum_{r~R} sum_{s~S}, nm+2=rs, alpha_n beta_m gamma_r delta_s also appear infeasible to handle. (The natural Cauchy-Schwarz argument leads to conditions like n_1 s_2 - s_2 n_1 = d for some d | 2n_2 - 2n_1, and little appears to have been gained.)

Two consequences.

(i) The programme's **B(x) before the second decomposition is already a Question 17 object**, with alpha=mu, beta=beta_V and min split 6/25. Under HB K=3 the requirement narrows to min part in [1/3,1/2].

(ii) **R(x) is precisely the four-variable shape Maynard flags as appearing infeasible**, with our specific coefficients rather than arbitrary ones. Not a refutation — our coefficients are not arbitrary — but a primary-source calibration point against the second decomposition, agreeing with what `reachability-coverage §5.2` reached independently.

**Which is the smaller open object? The Question 17 one, by logical strength.** Question 17 restricted to min part [1/3,1/2] plus BV plus the HB classification would give the twin asymptotic, but it is a statement about bilinear forms with arbitrary coefficients and is not known to be equivalent to twins. The corner, by contrast, is equivalent to the conclusion: `corner-correlation.md`'s verdict records that given the complement at O_H(x/log^H x), the one-sided corner bound implies and is implied by the sufficient margin. **The second decomposition traded a bilinear hypothesis for a statement equivalent to the target — a real loss of reduction budget.** It does not follow that it was avoidable: B(x) itself sits at min split 6/25, wider than [1/4,1/2], and no estimate for it exists either.

Maynard's Lemma 18 (same article, read at source): Type I [0,gamma] plus Type II [alpha,alpha+beta] with beta+gamma>1 gives the asymptotic; with gamma=1/2 and the reflection this needs alpha<1/4, consistent with the table in §6.

## 8. Linnik, for completeness

`Lambda(n)/log n = sum_k ((-1)^{k-1}/k) d_k^{>=2}(n)` — no Mobius at all, every variable free, so the k-th term has a <= 1-1/k. Verified exactly in rationals to N=400,000. It does not help: measured, the peak truncation level moves out with N (k=3 at N=400, k=7 at N=400,000) and total absolute mass per n grows 8.466 -> 567.204. A bounded truncation leaves a tail far above x/log^H x. Vaughan's identity for mu produces only Type II pieces with no free variable at all, so a=1 immediately (`left-divisor-signs §2.1`).

## 9. Decisive statements and scope

1. Under the grouped-moment shape, a = 1 minus the largest free-variable exponent (both cofactors are unweighted inside the CRT count). DERIVED.
2. sup a = 1 for Vaughan at every admissible cutoff pair, for Heath-Brown at every level K, and for Vaughan's mu-identity; a -> 1 for Linnik with an unbounded truncation tail. DERIVED.
3. Hence (a,b)=(1,1) recurs under all four, the zero budget there is exactly 1, no kernel saving of any size enters it, and `reachability-coverage §2.1`'s corner failure recurs unchanged.
4. The HB corner object is a two-point Mobius-type correlation at shift 2 — same species as `corner-correlation.md`'s.
5. HB K=3 does narrow the classical hard Type II band and lowers the Type I demand. Classical, available, orthogonal to 1-4.

**Scope.** Four named identities under one named argument shape. Not an impossibility theorem; no method class, retained statistics, error tolerance or quantifiers for one are supplied and none is asserted. The defensible reading is "the corner is not an artefact of the particular Vaughan cutoffs, and four standard alternatives do not remove it" — not "the corner is intrinsic".

**The one structural change that would convert 'unbounded' to 'finite'.** A moment bound for the four-variable determinant sum with a *weighted* cofactor would make a the split exponent, and HB K=3's worst case would be (a,b)=(2/3,2/3), budgets 5/6, 4/3, 2/3, needing gamma >= 2/3. Not a free swap: the phase in the present moment *is* the CRT count over the free cofactors. And it is exactly the shape Maynard records as appearing infeasible with arbitrary coefficients. Nothing of the kind is derived here.

## 10. Imported sources, with version and hypotheses

| source | taken | checked | hypotheses |
|---|---|---|---|
| Heath-Brown, *Prime numbers in short intervals and a generalized Vaughan identity*, Canad. J. Math. **34** (1982), no. 6, 1365-1377, DOI 10.4153/CJM-1982-095-9 | the identity | bibliographic details + abstract confirmed at Cambridge Core, fetched 2026-09-06; the identity is derived and verified in the validator, not taken on trust | valid only for n <= U^K (negative control fires above) |
| Iwaniec-Kowalski, *Analytic Number Theory*, AMS Colloq. 53 (2004), Prop. 13.3 | same identity, K=10 instance | **NOT checked at the primary source** — located only at second hand in a search summary. Flagged as unverified; nothing depends on it | log placement immaterial by symmetry; both placements checked in the validator |
| Tao, *What's new*, Heath-Brown identity tag | convolution form, valid to U^K | fetched and read 2026-09-06; agrees | none beyond U^K |
| Maynard, *Counting primes*, ICM 2022, §6 | Question 17 and the four-variable remark verbatim; (6.1)-(6.2); Lemma 18 | PDF fetched and read at the source, 2026-09-06 | stated for 1-bounded sequences and a comparison set B; our coefficients are divisor-bounded, so normalisation differs by x^eps |
| `grouped-divisor-moment.md`, `reachability-coverage.md` | block budgets (1+a)/2, a/2+3b/2, a; gamma enters only the cross term | taken as given, not re-derived | if the budget list is wrong or incomplete, §4's table is wrong; `reachability-coverage §5.3` lists that verification as outstanding |

Friedlander-Iwaniec, *Opera de Cribro*, ch. 16/18 were **not** reachable this session and are not cited; nothing depends on them.

## 11. What would change the reading

- **An error in the "unweighted cofactor" claim.** Read off `grouped-divisor-moment §1`'s Phi and the CRT interpretation of its phase. Reviewed once, by me, against that section only; no independent review. If the shape tolerates a cofactor weight, item 1 fails and §4 goes with it. **This is the single highest-leverage thing for a reviewer to check.**
- An identity for Lambda in which every dyadic piece carries a free variable above x^c with a bounded number of pieces and a tail below x/log^H x. Nothing here rules one out. Note a<1 alone would not suffice: the cross budget still binds and clearing it costs gamma near 2.
- A demonstration that the HB balanced configuration carries o(x/log^K x) *signed* mass. §5 measures absolute mass 0.1847 per n with no Mobius-sign advantage over random, so it would have to be signed cancellation, not counting.

## 12. Gate state and work owed (I was fenced from these files)

`node research/qc.js`: TOTAL 2, both requiring edits outside my fence.
- `crosslinks`: `research/heath-brown-edges.md` is not yet referenced by any working document. Needs a citation from `RESEARCH-HANDOFF.md` / `OUTCOMES.md` / `reachability-coverage.md`.
- `ledger`: `TODO.md:61` item C must list `Q-heath-brown-edges` on its `Ledger:` line.
- Also owed and not done: an `OUTCOMES.md` entry under a new heading (Heath-Brown-edges) and regeneration of `QUESTIONS.md`.
