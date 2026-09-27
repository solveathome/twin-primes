# Pre-registration: foreign import, IMPORT-MAP row 8, the distortion method

<!-- ledger
id: Q-import-distortion-prereg
status: ANSWERED
todo: none
question: What does the distortion method certify on our window, and does it speak at one class per modulus or at two?
verdict: Sealed before any line of the producer existed; scored in import-distortion.md, where the deciding question comes back opposite to the row's expectation: BBMST's criterion carries no distinctness, multiplicity or minimum-modulus hypothesis, so the method speaks at two classes and the one-versus-two-class wall is not its wall.
-->

*(Written 2026-08-19, **before any line of `research/import-distortion-01-ladder.js`
existed and before any figure in this experiment was computed by machine**. The
experiment is `research/IMPORT-MAP.md` row 8; its record will be
`research/history/staging/import-distortion.md`. Nothing in this file may be
edited after the run. Corrections belong in the record, quoting this file.)*

---

## 0. What was read before this file was written, and what was derived by hand

The sources were opened first, at source, and this file is written after reading
them and before running anything. Declaring that order is the point of the file:
everything below that is a *number* is either hand-derived (marked) or unrun.

Opened and read in full: Balister–Bollobás–Morris–Sahasrabudhe–Tiba, *Erdős
covering systems*, arXiv:2211.01417v1 (the expository note on the distortion
method, 8 pp.); the same authors' *On the Erdős covering problem: the density of
the uncovered set*, arXiv:1811.03547 = Invent. Math. 228 (2022) 377–414, §§1–3
and §8; Klein–Koukoulopoulos–Lemieux, arXiv:2212.01299v2 = Int. J. Number Theory
20 (2024) 471–479, §§1–3.

Hand-derived before the run, and therefore not evidence produced by this
experiment:

- **(H1)** For a system whose moduli are *primes*, the distortion method's fibre
  statistic is exact rather than bounded: at the prime `p` the fibre is `Z/pZ`
  and the two chosen classes occupy exactly two of its points, so
  `α_p(x) = 2/p` identically, `M⁽¹⁾_p = 2/p` and `M⁽²⁾_p = 4/p²`.
- **(H2)** With `δ_j = 1/2` the criterion's denominator `4δ(1−δ)` is `1`, so
  `η(x) = Σ_{5≤p≤x} min(2/p, 4/p²) = Σ_{5≤p≤x} 4/p²`, and its supremum over `x`
  is `4·(P(2) − 1/4 − 1/9)` where `P(2) = Σ_p p^{−2}`.
- **(H3)** The only bridge in print from "cannot cover an interval" to "cannot
  cover `Z`" is Crittenden–Vanden Eynden, quoted inside KKL §1 verbatim as *"if
  a set of n arithmetic progressions does not cover Z, then it does not cover
  the interval {1, 2, . . . , 2ⁿ}"*. Contrapositive plus a non-covering
  criterion gives an interval statement with `n` = the number of **progressions**,
  which for our object is `2(π(x) − 2)` on the Natal@5 window and `2π(x) − 1` on
  the full sifted set (`p = 2` contributes one progression, since `0 ≡ −2 mod 2`).

---

## 1. The object, restated

Level `x`. The adversary picks, for each prime `5 ≤ p ≤ x`, two residue classes
mod `p`, and tries to cover a window `[0, H)` of consecutive integers. The Zone
Postulate needs a statement of the form *the adversary cannot cover `[0, H)`
once `H` is large*. The corpus's exact instruments for the same object, all
cited and none recomputed here (STANDING COMPUTE RULE):

- the exact `G₂` ladder, `research/attack-0c0e-02-level-selection.js` embedded
  block, `x = 2..43` computed in this repo and `x = 47..79` OEIS A144311 read
  through `G₂ = a(n) + 1`;
- the exact Shearer threshold `H*(x) = 35 … 481` over `x = 13 … 79`,
  `research/import-shearer-01-region.js` embedded PART C block;
- the block bound `L ≤ 62` at its level, `research/sift-limit-attack.md` §7a;
- the proven sieve exponent `β₂ = 4.26645028414864191641`,
  `research/dhr-verification.md` row 1a.

---

## 2. What is registered

**P0 — a correction to the corpus's live layer, predicted.** `covering-dive.md`
§6 bullet 6 reads *"BBMST's own Theorem 2.1 remark shows |S_k| ≍ k
(prime-sized alphabets) is exactly the critical growth where their covering
obstruction fails — the primes sit on the knife's edge of the distortion
method."* Predicted **REFUTED at source**: Theorem 2.1's hypothesis is
`lim inf |S_k|/k > 3`, and with `S_k = {1, …, p_k}` the ratio is `p_k/k ∼ log k`,
which diverges. Predicted: the survey says so in as many words, and the
`|S_k| ∼ k` counterexample is a sequence growing *more slowly* than the primes,
so the primes clear the hypothesis rather than sitting on the edge.

**P1 — the deciding question: does the engine speak at two classes per
modulus?** Predicted **YES**, and predicted to be checkable purely from
hypotheses rather than from any adaptation of ours: BBMST's Theorem 3.1 (the
non-covering criterion plus the density bound) is predicted to carry **no
distinctness and no multiplicity hypothesis at all**, its only hypotheses being
a finite collection of progressions, `δ_i ∈ [0, 1/2]`, and `η < 1`. Predicted
that the distinctness hypothesis lives one level down, in the *moment* bound
(BBMST Theorem 3.2), whose proof identifies a hyperplane from its set of fixed
coordinates and needs "no two parallel" to do it.

**P2 — the k-class answer from KKL, registered as a prediction about what the
paper says.** Predicted: KKL generalise to multiplicity `s` (each modulus used
at most `s` times, their Definition 2.2), predicted to state in the text that
the criterion is quoted unchanged from BBMST and only the moment bound is
re-proved, with the cost of multiplicity predicted to be exactly `s^k` in the
`k`-th moment — `s` in the first, `s²` in the second. Predicted conclusion
statement: smallest modulus `≤ exp(c log²(s+1)/log log(s+2))`, with `c`
unspecified, so **no numeric consequence at `s = 2` is available**. Predicted
that the conclusion is about covering `Z`, not an interval, at every `s`.

**P3 — the cleanest true statement, and its constant.** Predicted deliverable,
in this shape: for every `x`, and every choice of two classes per prime
`5 ≤ p ≤ x`, the criterion `η < 1` holds, hence the system does not cover `Z`,
hence by Crittenden–Vanden Eynden it does not cover any interval of
`2^{2(π(x)−2)}` consecutive integers. On the full sifted set (`2 ≤ p ≤ x`) the
same argument gives `G₂(x#) < 2^{2π(x)−1}`. Predicted that this is
**unconditional and constant-free**, and that it is the *only* interval
statement the method yields without new mathematics.

**P4 — `η` is bounded, and this is where the method beats the union bound.**
Predicted: `η(x) < 1` at **every** `x`, with `sup_x η = 4(P(2) − 1/4 − 1/9)`,
predicted numerically `0.3645` to four places *(hand-derived, H2)*, against the
union-bound economy `Σ_{5≤p≤x} 2/p` which crosses `1` between `x = 11` and
`x = 13` (`import-suen-01-transfer.js` PART D). So the distortion method is
predicted to **clear the Mertens wall that closed the covering economy at
`x = 13`** (`sift-limit-attack.md` §7), and to be the first import in this map
that does.

**P5 — and where it pays for it. The numeric verdict, predicted in advance.**
Predicted that the certified `H` loses to every exact instrument at every level:

1. `2^{2π(x)−1} > G₂(x#)` at all 22 ladder levels, and the ratio grows without
   bound;
2. `2^{2(π(x)−2)} > H*(x)` at all 17 levels `x = 13 … 79`;
3. therefore **distortion certifies no `H` that the exact ladders do not already
   dominate**, at any level in the computable range.

**P6 — the exponent, which is the question that matters.** Define
`θ_dist(x) = ln(2^{2(π(x)−2)}) / ln x = 2(π(x) − 2) ln 2 / ln x`. Predicted:

1. `θ_dist` is **not an exponent at all** in the limit; it grows like
   `2 ln 2 · x / ln²x`, so the certified window is superpolynomial in `x` and
   the method cannot address the `4.2665 → 2` gap even in principle;
2. `θ_dist(x) > β₂ = 4.26645` at **every** level `x = 13 … 79`, so it never
   beats the proven sieve exponent in the computable range either;
3. hand-computed before the run and registered as such: `θ_dist(13) ≈ 4.3`,
   `θ_dist(79) ≈ 6.3`.

**P7 — one thing it does beat, registered because it would be the row's only
positive.** Predicted: `2^{2π(x)−1}` is **smaller than the trivial period bound**
`x#` at every level from `x = 13` on, and asymptotically by an exponential
factor, since `2 ln 2 · π(x) ∼ 1.386 x/ln x` while `ln x# = θ(x) ∼ x`. So the
distortion method is predicted to deliver a genuine, unconditional improvement
over "a gap is shorter than the period", which is the only thing the corpus has
that is free of sieve hypotheses. Predicted magnitude at `x = 79`: many orders,
to be printed.

**P8 — the in-window variant, and the predicted mechanism of its death.**
Distortion's ambient is a CRT product `Z/QZ`; a window `[0, H)` is `Q`-measurable
only when `Q | H`-ish, i.e. only when the window is at least as long as the
primorial of the primes being disciplined. Predicted hybrid: run distortion on
the primes `5 ≤ p ≤ y` with `∏_{5≤p≤y} p ≤ H`, and union-bound the primes in
`(y, x]` against the surviving measure. Predicted condition
`2 Σ_{y<p≤x} 1/p < 1 − η`, i.e. `2 ln(ln x / ln y) < 1 − η` by Mertens, i.e.
`ln y ≥ ln x · e^{−(1−η)/2}`. Predicted consequences:

1. the exponent `e^{−(1−η)/2}` with `η = sup η`, predicted `0.73` to two places
   *(hand-computed, and to be recomputed exactly)*;
2. the window then must satisfy `H ≥ exp(θ(y)) = exp(x^{0.73+o(1)})`, which is
   **superpolynomial**, so the hybrid dies too;
3. the mechanism of death is `Σ 2/p` over the *untreated* primes — predicted to
   be the **seventh** independent arrival at the Mertens wall in this corpus
   (`sift-limit-attack.md` §7 counts six).

**P9 — the exchange rate, which is the wall address this row is graded on.**
Predicted statement of the wall in the distortion method's own convention: *the
distortion method buys a convergent covering economy `Σ 4/p²` in place of the
divergent `Σ 2/p`, and charges for it in ambient length: every prime it
disciplines must have its modulus fully resolved inside the ambient, so the
certified window is at least the primorial of those primes. The union bound is
the opposite trade — it needs no ambient and pays the divergent sum. Neither
economy is polynomial in `x`, and the one-vs-two-class distinction is priced by
neither.* Predicted: the one-class/two-class wall that the corpus keeps meeting
is **not** where this method dies, and saying so is the row's payoff.

**P10 — the density statement, and its direction.** BBMST Theorem 3.1's second
half bounds the density of the uncovered set from below. Predicted: applied to
our object it gives a density bound of the form
`(1 − η) exp(−(2/(1−η)) Σ_{d} ν(d)/d)`, predicted to decay like a fixed negative
power of `log x`, and predicted to be **weaker than the exact product**
`∏(1 − 2/p) ≍ (log x)^{−2}` at every level, because with prime moduli the
uncovered density is a product that needs no method at all. Predicted, and this
is the structural point: a density lower bound bounds the *average* gap, and our
object is the *maximum* gap, so the direction is wrong and no `H` follows.

---

## 3. Kill criterion, and what would make this experiment worthless

**LANDED-with-payoff** requires one of: (a) a certified `H` below the exact
ladder at some level; (b) a certified exponent below `4.26645`; (c) a wall
address stated in the owning convention that the corpus did not have. Predicted:
(a) and (b) fail, (c) succeeds, so the predicted verdict is **CLOSED with
mechanism, banking a WALL-ADDRESS and one unconditional but astronomically weak
theorem**.

Worthless if:

- the record reports `2^{2π(x)}` as an improvement without saying that the
  proven sieve bound `x^{4.2665+ε}` beats it at every level anyone can compute;
- the record compares against `H*(x)` without repeating that `H*` is **not a
  certificate**: it is the reading of an exact criterion on a dependency graph
  the corpus has not verified (`import-shearer.md` §5), and it certifies a
  survivor in windows shorter than `G₂` itself;
- the multiplicity question is answered from the survey's exposition rather than
  from the two theorem statements that carry the hypotheses (BBMST Theorem 3.1
  and Theorem 3.2, KKL Lemma 3.1 and Lemma 3.3);
- any number in the record is recomputed rather than cited when an embedded
  artifact already carries it.
