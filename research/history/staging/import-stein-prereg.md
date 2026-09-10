# Pre-registration — foreign import row 4, Stein's method for Poisson approximation

<!-- ledger
id: Q-import-stein-prereg
status: CLOSED
todo: none
question: Does Stein's method for Poisson approximation bound the extinction law or the ~3.8 constant?
verdict: Sealed before any producer ran; scored in import-stein.md, where the pre-registered kill criterion fires at both targets for one structural reason, that both objects are driven by exactly one shared uniform draw, which is precisely the dependence the b3 term measures.
-->

*Written to disk before any `research/import-stein-*.js` was executed. The only
thing that had run when this file was closed was the source verification of §1.
Nothing in §3, §4 or §5 was computed before this file existed.*

## 1. The formulas, verified at source before anything was computed

Opened this pass: Arratia, Goldstein and Gordon, *Poisson Approximation and the
Chen–Stein Method*, **Statistical Science 5 (1990) 403–434**, scanned full text
(Project Euclid / JSTOR deposit, 22 pages, image-only PDF, read page by page as
images, not by text extraction). Page 406 states in the authors' own words
"The following theorems are proved in Arratia, Goldstein and Gordon (1989)",
which is the *Ann. Probab.* 17 (1989) 9–25 paper the import map cites. The
*Ann. Probab.* full text itself was **not** opened; it is behind a paywall at
Project Euclid. So the definitions below are quoted from the authors' own 1990
restatement of their 1989 theorems, and the map's row-4 grade moves from
**[SOURCED-BIB]** to **[SOURCED, verbatim, via the authors' 1990 restatement]**
and not to a clean [SOURCED] on the 1989 paper.

Framework, p. 405 verbatim: "There is a finite or countable index set `I`. For
each `α ∈ I`, let `X_α` be a Bernoulli random variable with `p_α = P(X_α = 1)
> 0`. Let `W = Σ_{α∈I} X_α` and `λ = EW`. We assume `λ ∈ (0, ∞)`. `Z` will
denote a Poisson random variable with the same mean as `W`. For each `α ∈ I`,
suppose we have chosen `B_α ⊂ I` with `α ∈ B_α`. We think of the set `B_α` as a
neighborhood of `α` consisting of the set of indices `β` such that `X_α` and
`X_β` are dependent."

> (4) `b₁ = Σ_{α∈I} Σ_{β∈B_α} p_α p_β`
>
> (5) `b₂ = Σ_{α∈I} Σ_{α≠β∈B_α} p_{αβ}`, where `p_{αβ} = E[X_α X_β]`
>
> (6) `b₃ = Σ_{α∈I} E | E{ X_α − p_α | σ(X_β : β ∉ B_α) } |`

and, p. 405 verbatim: "Loosely, `b₁` measures the neighborhood size, `b₂`
measures the expected number of neighbors of a given occurrence and `b₃`
measures the dependence between an event and the number of occurrences outside
its neighborhood. … In applications where `X_α` is independent of the collection
`{X_β : β ∉ B_α}`, the term `b₃ = 0`. When `b₃ = 0`, `b₂ − b₁ = E(W²) − E(Z²)`."

Theorem 1, p. 406 verbatim (the first display's second subscript is rendered
`b₁` by the scan; the line below it forces `b₂`, and the identity
`b₂ − b₁ = EW² − EZ²` quoted above confirms the pairing, so it is read as `b₂`
and that reading is flagged rather than hidden):

> **THEOREM 1.** *Let `W = Σ_{α∈I} X_α` be the number of occurrences of
> dependent events, and let `Z` be a Poisson random variable with `EZ = EW =
> λ < ∞`. Then*
>
> `‖L(W) − L(Z)‖ ≤ 2[ (b₁ + b₂)(1 − e^{−λ})/λ + b₃(1 ∧ 1.4 λ^{−1/2}) ] ≤ 2(b₁ + b₂ + b₃)`,
>
> *and*
>
> `|P(W = 0) − e^{−λ}| ≤ (b₁ + b₂ + b₃)(1 − e^{−λ})/λ < (1 ∧ λ^{−1})(b₁ + b₂ + b₃)`.

Theorem 3, p. 406 verbatim: "*For `α ∈ I`, let `X′_α` have the same distribution
as `X_α`, with the `X′_α` mutually independent. The total variation distance
between the dependent Bernoulli process `X = (X_α)_{α∈I}` and the independent
Bernoulli process `X′ = (X′_α)_{α∈I}` having the same marginals, satisfies*
`‖L(X) − L(X′)‖ ≤ 2(2b₁ + 2b₂ + b₃) + 2 Σ p²_α`."

The constant 1.4 the map's construction record flags as unopened is present and
is the `b₃(1 ∧ 1.4λ^{−1/2})` factor of Theorem 1. `‖·‖` is total variation on
the scale `‖L(Y₀) − L(Y₁)‖ = 2 sup_A |P(Y₀∈A) − P(Y₁∈A)|`, i.e. a number in
`[0, 2]`, stated on p. 405 — the factor-of-two convention matters when reading
the bounds and is stated here so it is not silently halved.

## 2. The two objects, and the randomisation each one is priced under

**Object 1, multi-kill extinction (target: the extinction law's `A` and `c`).**
Fix a window `[0, Y)` and a fold `p`. The index set is `I = ` the gaps of the
level-`p` word that qualify, i.e. `g ≡ 0` or `±2 (mod p)`; a gap that does not
qualify has `p_α = 0` and is excluded by AGG's own `p_α > 0` requirement.
`X_α = 1` iff both endpoints of gap `α` are killed at fold `p`. Then
`W = Σ_α X_α = X_p`, the record's adjacent-kill-pair count.

The randomisation is the corpus's own and is not invented here: by the Merge
Rate Identity (`attack-foldL-04-amortized.md` §2, PROVEN there, restated in
`import-thinning.md` §2.1) the two endpoints of a gap die together in exactly
`ω ∈ {0,1,2}` of the `p` copies of the fold, `ω ≥ 1` exactly on the qualifying
gaps. So the offset `u ∈ Z/p` is drawn uniformly, a slot `n` is killed at offset
`u` iff `n + u ≡ 0` or `−2 (mod p)`, and `u = 0` is the arithmetic truth. Hence
`p_α = ω_α/p`, and with `L` the gap's left endpoint,

> `g ≡ 0 (mod p) → S_α = {−L, −L−2}, ω = 2`;
> `g ≡ 2 (mod p) → S_α = {−L−2}, ω = 1`;
> `g ≡ −2 (mod p) → S_α = {−L}, ω = 1`; otherwise `ω = 0`.

Three neighbourhood choices are priced, because the choice is where all the
content of `b₃` lives:

- **N1**, `B_α = {α}`. The minimal legal choice.
- **N2**, `B_α = {α−1, α, α+1} ∩ I`, the adjacent gaps in the word. **This is
  the choice the import map pre-registered** ("the neighbourhood of dependence
  taken from the Fold Moment Identity's pair structure"): `Ψ` is the
  adjacent-pair moment and `import-thinning.md` §2.3 shows the recursion closes
  at the pair level with `Δ` second order.
- **N3**, `B_α = I`. Then `σ(X_β : β ∉ B_α)` is the trivial σ-algebra, so
  `b₃ = 0` **exactly**, `b₁ = λ²` and `b₂ = E[W(W−1)]`.

**Object 2, the mixed super-`W` joint deficit (target: the `~3.8` constant).**
`W = x#`, natal set `N ⊂ [0, W)`, scour primes `x < q ≤ √W`. The index set is
`I = {(q, L), (q, R) : q` scour`}`, `X_{(q,L)} = 1{q | r}` and
`X_{(q,R)} = 1{q | r+2}` for `r` drawn uniformly from `N`, so `p_α = 1/q`. The
neighbourhood is `B_{(q,·)} = {(q,L), (q,R)}`: the two orientations of one
prime are the pair the construction forces to be dependent, since a prime `q > 2`
cannot divide both `r` and `r+2`. That mutual exclusion is the whole of the
forced scale `F = ∏_{q>x}(1 + 1/(q(q−2))) − 1` of `import-suen.md` §3.

## 3. Pre-registered predictions — object 1, the extinction law

`attack-foldL-06-scaling.md` §3.2 fits `E[X_p] = kills(Y,p)·A·exp(−c·θ_p/m̄_before(p))`
by Poisson MLE over folds `p ≥ 100` and reports **A = 2.4312e−2, c = 1.0818 ±
0.0317**. Those numbers were on the record and were read before this file was
written, so what follows is a **stated criterion on a zero-parameter
construction, not a blind forecast** — the precedent and the wording are
`xchannel-triples.md` §4's. What makes it a test at all is that the construction
below has no free parameter to move.

- **P1 (the primary, and it is parameter-free).** The AGG first moment
  `λ_p = Σ_{α∈I} p_α = (1/p)·Σ_{qualifying gaps} ω_α`, computed exactly from the
  window, IS the extinction rate. Predict `λ_p` reproduces the measured `X_p`
  fold by fold with no fitting: over folds `p ≥ 100`, the ratio `Σ X_p / Σ λ_p`
  lies in `[0.8, 1.25]` at all four windows, and `X_p` lies within `±3√λ_p` of
  `λ_p` at ≥ 90% of folds with `λ_p ≥ 1`.
- **P2 (the two constants).** Fit the record's own two-parameter form to the
  derived `λ_p` curve with the record's own estimator (Poisson MLE, folds
  `p ≥ 100`, `θ_p/m̄_before(p)` as the covariate) and read off `A_pred`, `c_pred`
  at `Y = 2·10⁹`. Predict `c_pred` inside the record's `1.0818 ± 3×0.0317 =
  [0.987, 1.177]`, and `A_pred` within a factor 1.5 of `2.4312e−2`.
- **P3 (the thinning import's null is beaten).** `import-thinning.md` §1.4's
  zero-parameter geometric null gives `A = 4.7843e−2, c = 1.0577` by OLS in log,
  a factor 1.97 high on the amplitude. Predict the AGG first moment, which uses
  the window's actual gap word instead of a geometric law for it, lands closer
  to the record on **both** constants than the geometric null does.
- **P4 (the Poisson assumption gets an error bar).** Under N3, `b₃ = 0` exactly,
  so Theorem 1's second display gives a **rigorous** bound on the record's
  extinction-band machinery, which computes `P(last pair ≥ p) = 1 − exp(−Σ_{q≥p}
  E[X_q])` and therefore assumes exactly `P(W_q = 0) = e^{−λ_q}` at every fold.
  Predict `Σ_{p≥300} (b₁+b₂)_p (1−e^{−λ_p})/λ_p < 0.10`, i.e. the extinction
  band is Poisson-licensed to better than one tenth of a probability over the
  decade that decides where extinction lands.

## 4. Pre-registered prediction — object 2, the `~3.8` constant

`xchannel-triples.md` R3 reports `(1−J)/F = 7.040 ± 1.152, 3.691 ± 0.324,
3.863 ± 0.081` at @17, @19, @23, with @19 and @23 agreeing to 0.52σ and @17
sitting 2.75σ high. Those were read before this file was written; same
disclosure as §3.

Under §2's object 2, `b₂ = 0` **exactly and provably** (mutual exclusion:
`p_{(q,L)(q,R)} = P(q|r and q|r+2) = 0` for `q > 2`), and

> `b₁ = Σ_{α∈I} Σ_{β∈B_α} p_α p_β = Σ_q [ (1/q)(1/q) + (1/q)(1/q) ] × 2 = 4 Σ_q 1/q² = 4 S₂`,

the sum running over the scour primes `x < q ≤ √W`. By the quoted identity
`b₂ − b₁ = E(W²) − E(Z²)` this is not a bound but an exact statement: the total
strike count `a(r)+b(r)` is under-dispersed against Poisson by exactly `4S₂`,
which is `Var = λ − 4S₂` for `λ = 2S₁`.

- **P5 (the constant).** Predict the joint deficit equals AGG's `b₁` for the
  strike process: `1 − J = b₁ = 4 S₂`, hence `(1−J)/F = 4 S₂ / F`. This has no
  free parameter: `S₂` and `F` are both determined by the scour prime list.
  Scored as a HIT at a level if the predicted `(1−J)/F` lies inside the measured
  value's own `±1σ` from R3's table, as a NEAR MISS if inside `±2σ`, a MISS
  otherwise. Scored at @19 and @23, the two levels R3 calls the law; @17 is
  reported and is informational, exactly as R3 treats it.
- **P6 (the shape, which is weaker and should survive even if P5 fails).**
  Predict `(1−J)/F` is asymptotically constant because `4S₂/F → 4` as `x → ∞`
  (since `1/(q(q−2)) = q^{−2}(1 + 2/q + …)`), so the ratio rises with `x` and
  approaches 4 from below. Predict the measured ratio is **increasing** from @19
  to @23, which it is (3.691 → 3.863), and predict the predicted ratio is
  increasing over the same step.

## 5. THE KILL CRITERION, as the import map wrote it

> *Kill:* if `b₃` is not small at the windows where the law was validated, the
> Poisson approximation has no error term there and the derivation is not
> available.

Made operational, and stated before any `b₃` was computed:

- **`b₃` is SMALL** at a fold if `b₃ ≤ 0.1·(b₁ + b₂)` under the pre-registered
  neighbourhood N2. **`b₃` is NOT SMALL** if `b₃ > (b₁ + b₂)`.
- If `b₃` is NOT SMALL under N2 at a majority of the folds `p ≥ 100` at a
  majority of the four windows, **the kill fires for the N2 route**, P1–P3 are
  declared void as *Stein-derived* results whatever their numerical outcome,
  and the report says so plainly in its first paragraph. The numbers are still
  reported, relabelled as a first-moment computation that owes nothing to
  Stein's method.
- N3 is exempt from the kill by construction, because `b₃ = 0` there is an
  identity and not a measurement. If the kill fires for N2 and N3's bound is
  non-vacuous somewhere, the surviving payoff is P4 and P4 alone.
- The same criterion applies to object 2 with its own neighbourhood, and P5 is
  void as a *Stein-derived* constant if `b₃ > (b₁ + b₂)` there. A numerical
  agreement in that case is recorded as an unexplained coincidence of scale, not
  as a derivation. This clause is written down now precisely because P5's
  arithmetic is cheap and its agreement, if it comes, will be tempting.

## 6. What is allowed to be written

`research/import-stein-01-multikill.js`, `research/import-stein-02-strikes.js`,
this file, and `research/history/staging/import-stein.md`. No live document is
touched, and the IMPORT-MAP regrade is reported for adjudication rather than
applied.

---

*Pre-registration only. The measured outcome, the scoring and the verdict are in
[import-stein.md](import-stein.md).*
