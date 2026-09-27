# ojaroudi-read — the Zenodo preprint that builds our frame, read end to end

<!-- ledger
id: Q-ojaroudi-read
status: ANSWERED
todo: none
question: Does Ojaroudi's Zenodo preprint prove an unconditional twin-prime theorem, and is anything in it importable?
verdict: No: the fatal step imports a Selberg quadratic-form LOWER bound from Opera de Cribro Chapter 7 where none exists, and a second independent gap leaves the Kloosterman hypothesis never checked; the venue is an unrefereed self-deposit, and the only payoff is two elementary lemmas that are importable onto our tile.
-->

Read-only literature check, 2026-08-19. No repo file edited except this one. Nothing
committed, nothing pushed. The PDF was fetched from Zenodo's public API; a newer
version (v5) was discovered during the read and fetched as well.

**Target.** Javid Ojaroudi (ORCID 0009-0001-7216-8916, no affiliation listed),
*The Replication–Deletion Primorial Sieve: A Generative Stage-Based Sieve (No Prelisted
Inputs) and an Unconditional Twin-Prime Theorem*.

| version | DOI | date | size | read |
|---|---|---|---|---|
| v1 | 10.5281/zenodo.18441736 | 2026-01-31 | 566 KB | no |
| v2 | 10.5281/zenodo.18457627 | 2026-01-31 | 593 KB | no |
| v3 | 10.5281/zenodo.18474706 | 2026-02-03 | 635 KB | no |
| **v4** | **10.5281/zenodo.18509488** | **2026-02-06** | **693 KB** | **yes, end to end** |
| v5 | 10.5281/zenodo.18528635 | 2026-02-09 | 744 KB | yes, targeted diff |

**Venue status: Zenodo self-deposit, resource type "preprint", not peer reviewed, no
journal version listed, no related identifiers beyond OpenAIRE indexing.** Rights are
reserved by the author ("All rights reserved"), which matters for any quotation beyond
fair use. `proposals-prior-art.md` §7(a) named v4; v5 existed three days later and was
not known to that pass.

---

## 1. Headline

**The frame is genuinely ours, the analysis is real work, and the theorem is not proved.**
The single load-bearing step — the one that turns everything else into a twin-prime
theorem — is a **false import**: the paper takes "Selberg's quadratic-form inequality"
as a black-box **lower** bound. Selberg's Λ² sieve is an upper-bound sieve, and the
paper's own §8.3 derives it correctly as an upper bound (`S(A,Z) ≤ Σ Λ(n)²`) two pages
before §8.4 flips it. The flip is asserted, never proved. It survives unchanged into v5.

Everything downstream of that flip is worthless; everything upstream is a competent,
mostly correct, and in two places genuinely useful piece of elementary and Fourier work
on **our tile**.

**Custody: their arithmetic is clean.** Every column of their Appendix A stage table
reproduces exactly from our own engine, including their `|T_i|` column, which is our
`D_x` to the digit. One displayed Proposition is wrong (see §5), but no table entry is.

---

## 2. What is actually proved, and what is only claimed

**Proved, and checked here:**

- The replication–deletion axioms and `Set'(i) = ` the reduced residue system mod `F_i`
  (§5.3, induction, correct).
- The prime-fetch proposition: for `i ≥ 3` the three smallest elements of `Set(i)` are
  `1, p_i, p_{i+1}` (§5.3, uses Bertrand; correct).
- The general pattern lift law `|T_{i+1}(H)| = (p_{i+1} − ν_H(p_{i+1}))·|T_i(H)|`, with
  `ν_H(p) = #{−h_j mod p}` ("The sieve as a general technique" (i); correct, elementary,
  and the standard admissible-tuple count in stage clothing).
- The Parseval identity `Σ_{t=1}^{m−1} |S_A(t/m)|² = m·D_A(m)` for `(m, F) = 1` (§6.2;
  textbook, correct, and **not** our §4 identity — see §6 below).
- The window identity `|B_q| = Σ_{b=1}^{p−1} [c(−bF) + c(−2−bF)]` (§7.2; correct).
- The **Bridge inequality** (§7.3) and the **Universal collision bound** (§9/(18)) —
  the two importable pieces. Stated with full hypotheses in §7 below.
- The Selberg-weighted remainder *identity* `R_i(D;λ) = Σ_ℓ β_λ(ℓ) r_i(ℓ)` and the
  Cauchy–Schwarz bound `|R_i| ≤ (p−1)√(C_Sel/G(D))·√(W_i(D))` (§8, App. C). These are
  bookkeeping on an upper-bound sieve and are fine as far as they go.

**Claimed, not proved:**

- **The twin-prime theorem** (v4 Thm in §15.6; v5 Thm 14.30). Fails at the flip, below.
- **The one-step energy recursion** `W̃_{i+1}(D) ≤ (3/p)W̃_i(D) + C₀/p` (v4 §15.4). The
  algebra of the recursion checks out *given* its two inputs, but one input — the
  averaged local Fourier bound (19), the paper's own "main nontrivial imported
  ingredient" — has an unverified and, as far as this read can tell, unsatisfiable
  hypothesis. See §4.
- **`W̃_i(Z_i) → 0`** (Cor. 15.5), which inherits the above.

---

## 3. The fatal step, quoted

§8.3 derives the Selberg inequality correctly:

> "Summing this pointwise bound over `n ∈ A` yields the Selberg inequality
> `S(A, Z) ≤ Σ_{n∈A} Λ(n)²`."

It then offers the lower-bound leg:

> "To obtain a lower bound for `S(A, Z)` one uses the complementary inequality
> `S(A, Z) ≥ Σ Λ(n) − Σ |Λ(n) − 1_{gcd(n(n+2),P(Z))=1}|`."

That inequality is true and useless, and **the term `Σ|Λ(n) − 1|` never appears again
anywhere in the paper** (one occurrence in v4, one in v5, both here). It is stated and
abandoned.

§8.4 then asserts, with no derivation:

> "*Selberg remainder domination criterion.* Assume there exists a constant `κ ∈ (0,1)`
> such that the weights `λ_d` produced by Selberg's minimization satisfy
> `Σ λ_{d1} λ_{d2} r([d1,d2]) ≤ κ U/G(D)`. Then `S(A,Z) ≥ (1−κ) U/G(D)`."

and the closing theorem restates it as an identity:

> "Selberg's lower bound then gives `S(A_i, Z_i) = P_i(Z_i) + R_i(Z_i) ≥ ½P_i(Z_i) > 0`."

The author names the import explicitly in §13:

> "This paper treats that step as an imported, proven theorem (Selberg's quadratic-form
> inequality; see [3, Ch. 7] or [5, Ch. 5])."

**[3, Ch. 7] is Friedlander–Iwaniec, *Opera de Cribro*, "The Selberg sieve"; [5, Ch. 5]
is Halberstam–Richert, *Sieve Methods*, Selberg's method. Neither contains a lower bound
of this shape, because none exists — the Λ² sieve is one-sided by construction.** The
book cited as the source of the import is also the book whose Ch. 16 ("The parity
phenomenon") proves that no lower bound of this kind can follow from level-of-distribution
data alone.

**Corroborating tell:** §8 is titled *"Selberg sieve lower bound at the cutoff and the
remaining parity barrier"*, and the word **parity appears nowhere in the body of either
version** — only in that title and its table-of-contents line. `grep -i parity` returns
two hits in v4 and two in v5, both the heading.

**v5 is identical here.** The numbering collapse was fixed, the step was not.

---

## 4. The second, independent gap: the Kloosterman hypothesis is never checked

The paper's own referee checklist calls the bilinear Kloosterman input "the main
nontrivial imported ingredient". The imported bound (v4 Lemma D.2 ⇒ (41)) requires the
**dyadic range condition**

> `M ≤ 4C^{1/2}` and `N ≤ 4C^{1/2}`,

with `C ≍ ℓ` the Kloosterman modulus. The paper applies it with `ℓ ≤ D²` ranging over
*all* squarefree `ℓ ≤ D²` and with completed coefficients supported on `m, n ≪ D`
(hypothesis map row (H5), and the "Local checklist" box in App. D). Those two are
compatible only when `C ≳ M² ≍ D²`, i.e. **only at the extreme top of the modulus
range**. For the bulk of `ℓ` — including the small and mid-range `ℓ` where `D_i(ℓ)` is
largest — the hypothesis fails and the bound is not available. Row (H5) of the paper's
own "no-flip verification" table records only `M, N ≪ D` and never compares it to
`C^{1/2}`; §9's parameter ledger, which (H5) defers to, does not do it either.

The reduction into that bound is also the one place the paper stops being explicit:

> "Carrying out the standard dispersion manipulations (completion of the k–sums,
> reciprocity, and Poisson in residue classes) decomposes the modulus-average into a
> diagonal main term … and an off-diagonal term…"

in a document that is otherwise written to a full-detail standard.

**v4 additionally has broken cross-references throughout** — the string "Lemma 15.4"
resolves 86 distinct statements, including every step of the audit map, so v4's
"External-input audit map (no-flip verification)" cannot actually be followed. **v5 fixes
this** (numbering is distinct there); the substantive gap is unchanged.

---

## 5. Custody spot-check: their numbers against ours

Their Appendix A table was recomputed here from scratch (segmented sieve to `9 699 690`,
independent code) and **every cell reproduces**:

| stage `i` | `p_{i+1}` | `F_i` | `F_{i+1}` | `Z_i` | `|T_i|` | `|T_{i+1}|` | `S_i^win` | `π₂(F_{i+1})` | `π̂₂(F_{i+1})` |
|---|---|---|---|---|---|---|---|---|---|
| 2 | 3 | 2 | 6 | 2 | 1 | 1 | 1 | 1 | 1.000000000000 |
| 3 | 5 | 6 | 30 | 5 | 1 | 3 | 2 | 4 | 3.000000000000 |
| 4 | 7 | 30 | 210 | 14 | 3 | 15 | 10 | 15 | 10.384615384615 |
| 5 | 11 | 210 | 2 310 | 48 | 15 | 135 | 54 | 69 | 58.910324644033 |
| 6 | 13 | 2 310 | 30 030 | 173 | 135 | 1 485 | 398 | 468 | 456.423213028205 |
| 7 | 17 | 30 030 | 510 510 | 714 | 1 485 | 22 275 | 4 168 | 4 636 | 4868.268953161051 |
| 8 | 19 | 510 510 | 9 699 690 | 3114 | 22 275 | 378 675 | 52 817 | 57 453 | 62161.780929823515 |

(The last two `π̂₂` digits differ from his print in floating-point noise only; every
integer column is exact.) His definitions are strict-window: `S_i^win = #{p : F_i < p,
p+2 < F_{i+1}, p, p+2 prime}` and `π₂(y) = #{p : p+2 ≤ y}`, both of which had to be
read off the text rather than guessed — the naive readings disagree at rows 2 and 3.

**Their `|T_i|` column is our `D_x` exactly.** `research/discrepancy-two-class.md` §2
prints `D_x = 3, 15, 135, 1485, 22275, 378675` at `x = 5,7,11,13,17,19`; his column
prints the same six integers at stages 4 through 8 plus `|T_9| = 378 675`. Independent
custody on the same object, both directions clean.

**One displayed Proposition is wrong.** v4 §4.2 (v5 Prop. 4.5) states

> `|T_i| = ∏_{k=2}^{i−1} (p_k − 2)`,  empty product `= 1`.

With his own dictionary (`p_2 = 2`, `p_3 = 3`, `F_i = ∏_{k=2}^{i} p_k`) this evaluates to
**0 for every `i ≥ 3`**, because the `k = 2` factor is `p_2 − 2 = 0`; and the upper limit
is off by one besides. The correct form is `|T_i| = ∏_{3 ≤ q ≤ p_i}(q − 2)`, which the
paper itself states correctly in §8.1 and which every table obeys. Two index errors in
one display, unchanged in v5. **It touches no conclusion of his and none of ours** — it
is the clerical class, exactly like the three Holt cells in `discrepancy-two-class.md` §1.
Also in that proof: the CRT display `Z/F_iZ ≅ ∏_{k=1}^{i−1} Z/p_kZ` (wrong range) and the
prose "`p_1 = 2` … `p_2 = 3`" (contradicts his own dictionary).

**A near-miss defect that is not one, recorded so nobody re-raises it.** The Bridge
inequality's proof needs `b ↦ −bF (mod q)` to be injective on `b = 1..p−1`, i.e.
`p − 1 ≤ q`, and the lemma is stated only under "`q` prime, `q ∤ F`". That looks like a
missing hypothesis. It is not: `F_i` is the product of *all* primes `≤ p_i`, so `q ∤ F_i`
forces `q > p_i`, hence `q ≥ p_{i+1} = p` and `p − 1 < q` automatically. The proof is
valid as written. (Checked numerically as well, five stages × four moduli, zero
violations.)

**His prediction function drifts, and he does not say so.** `π̂₂(F_{i+1}) := |T_{i+1}|·
∏_{p_{i+1} < q ≤ Z_i}(1 − 2/q)` is the naive Mertens product with no twin-prime-constant
correction. Its ratio to the true `π₂` runs 1.000, 0.750, 0.692, 0.854, 0.975, 1.050,
1.082 across stages 2..8 — it crosses 1 at stage 7 and is climbing. The paper presents it
as "a cumulative prediction function" and never compares it to the truth in print.

---

## 6. The four deciding questions

### (a) Does it carry a two-class discrepancy object?

**YES — but not ours, and the distinction is the whole answer.**

He defines, for `A ⊂ Z/FZ` and `gcd(m, F) = 1`,

> `c_A^{(m)}(r) := #{a ∈ A : a ≡ r (mod m)}`,
> `D_A(m) := Σ_{r mod m} ( c_A^{(m)}(r) − |A|/m )²`,  written `D_i(m)` for `A = T_i`.

That is an **`L²` arithmetic-progression discrepancy of the twin-admissible set** —
a variance over residue classes to a *coprime* modulus.

Our `ΔΦ₂(y, x) = Ψ(y, x) − (D_x/x#)·y` is a **signed interval discrepancy** — a counting
function against a linear main term, measured along the cycle. Different object, different
norm, different index set.

**So the OPEN absence in `research/discrepancy-two-class.md` resolves as follows:**

- The **`ΔΦ₂` interval object itself** — the two-class analogue of Holt's `ΔΦ` table, with
  its `D_x/x#` main term, its `max/min` mirror law `max + min = −(1 − 2δ₂)`, its half-range
  statistic, its measured growth ladder and its `√R_k` law — **is not in this preprint.**
  Nothing in it counts twin slots below a bound, and it has no growth law for any sup.
- The **`L²` AP-energy on the same set** — variance of `T_x` counts in residue classes mod
  `ℓ` — **is** in this preprint, named, and is the object his whole analytic engine
  propagates. Our own `research/level-ledger-tight.md` Thm 1 works with the AP discrepancy
  of the tile, so this is the file that now has a live neighbour, not `discrepancy-two-class.md`.

Neither claim may be written as an absence without naming the owning convention. The
convention that owns his object is the **sieve-remainder / large-sieve** convention:
`D_A(m)` is the `m`-th term of a large-sieve variance, and searching it means searching
"variance of a sifted set in arithmetic progressions", not "discrepancy". `SEARCH-CONVENTIONS.md`
carries no row for it.

### (b) Does it prove any bound in Lemma V territory?

**NO. It imports, and it imports a different instrument.**

Our Lemma V row (`SEARCH-CONVENTIONS.md` §1) points at **bilinear forms with Kloosterman
*fractions*** — `Σ α_m β_n e(a·m̄/n)` — Duke–Friedlander–Iwaniec *Invent. Math.* 128
(1997) 23–43, and Bettin–Chandee arXiv:1502.00769 for the trilinear version with a free
average over `a`.

Ojaroudi's input is **bilinear forms in classical Kloosterman *sums* averaged over the
modulus** — `Σ_c (w(c)/c) W(c/C) Σ_{m,n} α_m β_n S(m,n;c)` — recorded verbatim from
Bombieri–Friedlander–Iwaniec *Acta Math.* 156 (1986), Lemma 1, itself resting on
Deshouillers–Iwaniec's Kuznetsov machinery. **Different object, different theorem,
different literature branch.** He proves nothing new in it; his App. D is a symbol-matching
exercise from BFI Lemma 1 to his own smoothed `1/c`-average form. DFI 1997 and
Bettin–Chandee appear nowhere in either version's bibliography.

The *level* he needs is also not one our window cares about: he wants remainder control
for all squarefree `ℓ ≤ D² = Z_i² ≈ F_{i+1}`, i.e. the full length of his interval. That
is a 100%-level demand, and it is on his own explicit residue-defined set rather than on
the primes — so it is not a Bombieri–Vinogradov question at all, and comparing his "level"
to our vector-sieve window is a category error. Nothing here moves our `4.2665 → 2`
exponent or our `L` question.

**Verdict: does not touch Lemma V. The DFI/Bettin–Chandee row stands unchallenged.**

### (c) Does it touch the localized max-gap / zone question?

**NO, and the earlier scan was right.** Confirmed by exhaustive grep across both versions:
zero occurrences of "Jacobsthal", "maximal gap", "longest run", or "run", and no interval
of the form `[p², 2p²]` anywhere. Enumerating every substring containing "gap" in each
version returns **nine hits on `C_gap` and one on the bibliography title "Small gaps
between primes"**, and nothing else. `C_gap` is the constant in his second-moment
lift-kernel lemma — a Dirichlet-kernel concentration constant with no connection to prime
gaps. "consecutive" occurs only for consecutive replication blocks and consecutive
integers in a Lipschitz step. His windows are the primorial
windows `(F_i, F_{i+1})`, never the zone `(x, x'²)`. Nothing here bears on `G₂`, on `L`,
on the Zone Postulate, or on `research/two-class-lower-bounds.md` §7 (whose driving-term
material has no counterpart in his paper at all).

### (d) Is there a tool we can import?

**Two, both elementary, both fully proved, neither requiring any of his analytic machinery
or his false step.**

> **TOOL 1 — the Bridge inequality** (his §7.3). *Hypotheses:* fix a stage, write
> `F = F_i`, `p = p_{i+1}`, `T_i ⊂ Z/FZ` the twin-admissible classes, `U_i = {a + bF :
> a ∈ T_i, 1 ≤ b ≤ p−1}` so `|U_i| = (p−1)|T_i|`. Let `q` be a prime with `q ∤ F` (which
> forces `q ≥ p`). Let `c(r) = #{a ∈ T_i : a ≡ r mod q}`,
> `D_i(q) = Σ_{r mod q}(c(r) − |T_i|/q)²`, and
> `B_q = #{n ∈ U_i : q | n or q | n+2}`. *Conclusion:*
>
> `| B_q − (2/q)|U_i| | ≤ 2·√(p − 1)·√(D_i(q))`.
>
> *Proof shape:* window identity, `(x+y)² ≤ 2x² + 2y²`, then Cauchy–Schwarz over
> `b = 1..p−1`. No sieve theory, no Fourier. Verified numerically here over 55
> `(stage, q)` pairs at `F = 6, 30, 210, 2310, 30030`; it holds every time, and the
> largest LHS/RHS observed was **0.31**, most falling below 0.2. It is a loose bound.

Why it might matter to us: it converts an `L²` AP-discrepancy of the tile directly into a
**pointwise** bound on how far one prime's kill count departs from `2/q`. That is the
same `L²`-to-`L^∞` conversion our `discrepancy-two-class.md` §10 flags as the shape of
our own open gap ("an `L^∞` bound derived from an `L¹` term count against an `L²` truth"),
here done in the other direction and cheaply. It is a per-prime statement, not a sup over
primes, so it does not close anything on its own.

> **TOOL 2 — the Universal collision bound** (his (18)). *Hypotheses:* fix a stage `i` and
> `j ∈ {0, 2}`; let `b_j(a)` be the unique `b mod p_{i+1}` with `a + F_i b ≡ −j`; let
> `ℓ` be squarefree with `(ℓ, F_{i+1}) = 1`. Set
> `c_{j,ℓ}(r) = #{a ∈ T_i : a + F_i b_j(a) ≡ r mod ℓ}` and `c_ℓ(r) = #{a ∈ T_i : a ≡ r mod ℓ}`.
> *Conclusion:*
>
> `Σ_r c_{j,ℓ}(r)² ≤ p_{i+1} · Σ_r c_ℓ(r)² = p_{i+1}·( D_i(ℓ) + |T_i|²/ℓ )`.
>
> *Proof shape:* fibre `T_i` by the value of `b_j(a)`, Cauchy–Schwarz over the `p_{i+1}`
> fibres, then drop cross terms (all counts non-negative). Three lines, unconditional.

Why it might matter to us: it is exactly the statement that **the deleted set is no worse
than `p` times the tile in `L²`**, i.e. a proven ceiling on how badly the fold's own kill
pattern can concentrate. Compare `discrepancy-two-class.md` §3's proven `×3`-per-fold
ceiling: same genre of statement, different norm and different constant, arrived at
independently.

Both tools are stated on his `T_i`, which **is** our tile: `T_i = T_x` for `x = p_i`.

---

## 7. What is *not* importable: the Selberg-weighted energy itself

The advertised object — `W_i(D;λ) = Σ_{ℓ ≤ D²} β_λ(ℓ)² ℓ D_i(ℓ)` and its normalisation
`W̃_i = G(D)W_i/|T_i|²` — is a reasonable-looking definition, and his §"Frequency routing"
appendix gives an honest reason for it (the unweighted `Q_i(D) = Σ ℓ D_i(ℓ)` diverges once
`ℓ` exceeds `F_i`, because you enter the forced `0/1`-occupancy regime — a point our corpus
has not written down anywhere and which is worth knowing). But the only theorem about it
is the `(3/p)`-contraction, and that rests on the unverified Kloosterman hypothesis of §4
above. **Do not import `W̃_i → 0`. Do not cite the recursion.** The definition and the
divergence observation are safe to cite; nothing that follows from them is.

---

## 8. Bibliography: unknown neighbours

v4 cites 8 items, all already known to the corpus in substance (BFI 1986,
Deshouillers–Iwaniec 1982, *Opera de Cribro*, Matomäki–Shao arXiv:1512.03213,
Halberstam–Richert 1974, Iwaniec–Kowalski, Dusart). One is **mis-cited**: v4's [7] is
given as "J. Maynard, *Small gaps between primes*, Ann. of Math. 181 (2015), 383–413", but
the content attributed to it — "Def. 2, p. 1", "Prop. 9.1, pp. 23–25", "Lemma 8.1, p. 16",
"Prop. 8.4", well-factorable dispersion for primes in progressions with sharpened ranges —
is not in that paper. **v5 corrects it**, splitting it into Maynard's *Primes in arithmetic
progressions to large moduli* I and II.

**v5's bibliography grows to 11 and adds four items with zero hits in this repository:**

| item | why it may matter |
|---|---|
| **J. Maynard, *Primes in AP to large moduli II: well-factorable estimates*** (Oxford ORA, uuid d75350eb-1358-474a-b070-0b4b5ad720b2); he points at **Lemma 6.12, "Deshouillers–Iwaniec estimate"** | the closest live neighbour to our Lemma V row that is not DFI/Bettin–Chandee; well-factorable Kloosterman averaging is the branch our `attack-sqrt-cancellation` work sits beside. **Unread.** |
| **J. Maynard, *Primes in AP to large moduli I: fixed residue classes*, arXiv:2006.06572** | same branch, the fixed-class case | 
| **A. Pascadi, *Large sieve inequalities for exceptional Maass forms and the greatest prime factor of `n²+1`*, arXiv:2404.04239v3 (2026)** | a 2026 spectral large-sieve improvement; nothing in the repo mentions Pascadi | 
| **M. Jutila, *On the spectral large sieve inequalities*, Funct. Approx. Comment. Math. 28 (2000), 7–18** | the spectral large sieve our `IMPORT-MAP.md` Kuznetsov line gestures at without a citation | 
| **K. Matomäki & X. Shao, *When the sieve works II*, arXiv:1509.02371** | different from the Matomäki–Shao already in the corpus — 1512.03213 is *Vinogradov's three primes theorem with almost twin primes*, Compositio Math. 153 (2017) 1220–1256, a different subject; 1509.02371 carries no journal reference (corrected 2026-08-19, `lemmaV-neighbours.md`) | 

None of these is prior art on our objects. All five are **Lemma-V-adjacent instruments**,
and the two Maynard papers are the ones a future Lemma V pass should read first. That is
the one genuinely useful thing this preprint's bibliography gives us.

---

## 9. NOT REACHED

- **v1, v2, v3** — not opened. v4 read end to end; v5 diffed only at the load-bearing
  passages (the closure theorem, the parity word, the closed-form proposition, the
  numbering, the bibliography). v5's new appendices (its numbering reaches J.5) were not
  read; whether they contain new mathematics beyond v4 is **open**.
- **Whether the author has other deposits or arXiv items** — not searched.
- **Maynard PAP I and II, Pascadi, Jutila, Matomäki–Shao II** — identified, not fetched.
- **Any forward citation of this preprint** — not searched; Google Scholar unreachable
  this session, as in the officer pass.
- **The `L²`-AP-discrepancy-of-a-sifted-set convention** — `SEARCH-CONVENTIONS.md` has no
  row for it, and none was built here. Until it has one, no absence may be written about
  `D_i(ℓ)`-shaped objects.

---

*This document states current understanding. Superseded claims, retired numbers and the
reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
