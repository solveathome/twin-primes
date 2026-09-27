# 13 — Consumer comparison: Murty–Vatwani, Tao's delta_x, Chowla, Siegel zeros

**Read-only with respect to the repository. No repo file was created, edited or
deleted.** Baseline read: `CLAUDE.md`, `research/SEARCH-CONVENTIONS.md` §1,
`research/RESEARCH-HANDOFF.md` §§1–4, `research/endpoint-target-audit.md` §§1–5,
and the wave reports `07-corner-correlation.md` and `09-literature-scout.md` §A.

**Nothing here supplies the OPEN consumer, changes the controlled region, or
moves any budget.** Twin-prime infinitude remains OPEN; `C_2 x + E_dagger(x) >=
c_0 x/(log x)^K` on unbounded dyadic `x` remains OPEN. Everything below is
either a reading of a primary source or an elementary derivation flagged as
derived here.

**Status vocabulary**
- `CHECKED IN PRIMARY SOURCE` — I downloaded the PDF or page and read the
  statement in extracted text on this machine.
- `CHECKED IN A SECOND PRIMARY SOURCE` — the statement is quoted verbatim
  inside a different paper I did read at byte level; the original was not opened.
- `SNIPPET ONLY` — search-result text; not a source.
- `FETCH FAILED` — a statement about the fetcher, not the paper.

Notation used throughout. `J_x = (x/2, x]`, `S(x) = sum_{n in J_x}
Lambda(n)Lambda(n-2)`, `C_2 = prod_{p>2}(1 - 1/(p-1)^2)`, so the Hardy–Littlewood
prediction on `J_x` is `C_2 x` (handoff §3). `Pi_2 = C_2` in Tao's notation, and
the singular series in the Murty–Vatwani and Tao normalisations is
`S(2) = 2 Pi_2 = 2 C_2`.

---

## 1. Murty–Vatwani, and how their pair compares with our consumer

### 1.1 What is in the paper

| item | exact statement | status |
|---|---|---|
| **Murty & Vatwani, "Twin primes and the parity problem", J. Number Theory 180 (2017) 643–659**, DOI 10.1016/j.jnt.2017.05.011. Read from the author-page PDF via the Wayback capture 20250808094448 of `mast.queensu.ca/~murty/TwinPrimes-Parity.pdf` (the live URL now 404s). | See rows below. | `CHECKED IN PRIMARY SOURCE` (pdftotext of the publisher PDF) |
| `EH_Lambda(x^theta)` (their (1.3)) | "For any `A > 0`, we have `sum_{q <= x^theta} max_{y<=x} max_{(a,q)=1} \| sum_{n<=y, n = a (q)} Lambda(n) - y/phi(q) \| <<_A x/(log x)^A`." Their remark: "This conjecture is true and is called the Bombieri–Vinogradov theorem when `theta < 1/2`." | `CHECKED IN PRIMARY SOURCE` |
| `EH_{mu_h}(x^eta)` (their (1.4)), the new hypothesis | "For any `A > 0`, we have `sum_{q <= x^eta} max_{y<=x} max_{(a,q)=1} \| sum_{n<=y, n = a (q)} Lambda(n)mu(n+h) - (1/phi(q)) sum_{n<=y} Lambda(n)mu(n+h) \| <<_A x/(log x)^A`." Note the main term is the *unknown* total, so the hypothesis does not presuppose `sum_{n<=x} Lambda(n)mu(n+h) = o(x)`. | `CHECKED IN PRIMARY SOURCE` |
| **Theorem 1.1** | "Let `h != 0` be a fixed even integer. Suppose that the conjectures `EH_Lambda(x^theta (log x)^C)` and `EH_{mu_h}(x^{1-theta})` are true for some fixed `theta < 1` and a suitably large fixed `C`. We then obtain the following: (a) The assertions (1.1) and (1.2) are equivalent. (b) We have `sum_{n<=x} Lambda(n)Lambda(n+h) >= (1-o(1)) S(h)(1-A(h)) x`, where `A_h = prod_{p not\| h, p>2} (1 - 1/(p(p-1)))`." Here (1.1) is `sum_{n<=x} Lambda(n)Lambda(n+h) ~ S(h)x` and (1.2) is `sum_{n<=x} Lambda(n)mu(n+h) = o(x)`. | `CHECKED IN PRIMARY SOURCE` |
| their own remark after Theorem 1.1 | "Note that if the Elliott–Halberstam conjecture holds, that is, we have `EH_Lambda(x^{1-eps})` for any small `eps>0`, then we only need `EH_{mu_2}(x^eps)` for any small positive `eps` in order to show the infinitude of twin primes!" And: the proof "goes through if we frame the equidistribution conjectures ... for the fixed residue class `n = -h (mod q)` instead of taking the maximum over all residue classes co-prime to `q`." | `CHECKED IN PRIMARY SOURCE` |
| structure of the proof (checked, because it decides the interval question below) | `sum Lambda(n)Lambda(n+h) = S_1(y) + S_2(y) + O(x^{1/2} log x)` with `y = x^theta` (their (2.1)); Lemma 3.4 gives `S_1(y) ~ S(h)x` from `EH_Lambda(x^theta (log x)^C)`; Lemma 4.4 gives `S_2(y) = (-S(h)+o(1)) sum_{n<=x} Lambda(n)mu(n+h) + O(x/(log x)^A) + O((x^eta + y)(log x)^2)` provided `x/y <= x^eta` and `EH_{mu_h}(x^eta)`; §5 sets `y = x^theta`, `eta = 1-theta` and concludes `sum Lambda(n)Lambda(n+h) ~ (S(h)+o(1))(x - sum_{n<=x} Lambda(n)mu(n+h))`; (b) then follows from `\|sum Lambda(n)mu(n+h)\| <= sum Lambda(n)mu^2(n+h) ~ A_h x`. | `CHECKED IN PRIMARY SOURCE` |

Numerically, `A_2 = prod_{p>2}(1 - 1/(p(p-1))) = 0.74791...` and `1 - A_2 =
0.25209...` (computed here over primes up to `10^7`; the tail is below `10^{-7}`).
So conclusion (b) at `h = 2` is `sum_{n<=x} Lambda(n)Lambda(n+2) >= (1-o(1)) *
0.2521 * 2C_2 x`, i.e. a fixed fraction `0.2521` of the Hardy–Littlewood main term.

### 1.2 The `theta < 1/2` reading

Theorem 1.1 permits any fixed `theta < 1`. Take `theta = 1/2 - eps`. Then
`EH_Lambda(x^{1/2-eps}(log x)^C)` is the Bombieri–Vinogradov theorem, and the
remaining hypothesis is the single statement `EH_{mu_2}(x^{1/2+eps})`. Every
error term in their §5 stays admissible at that choice (`y = x^{1/2-eps}` and
`x^eta = x^{1/2+eps}` are both `o(x)` against `(log x)^2`). The same reading is
stated explicitly in print for the Goldbach analogue: Huang & Li, "On the
connection between the Goldbach conjecture and the Elliott–Halberstam
conjecture", Springer Proc. Math. Stat. 347 (2021), DOI
10.1007/978-3-030-67996-5_17 (arXiv:2005.03811v2), Corollary 1: "in view of the
Bombieri–Vinogradov theorem, the above conclusion holds if the conjecture
`EH_mu(N^{theta'})` is true for some `theta' > 1/2`." Their `EH_mu` is the
Goldbach-shaped twist `Lambda(n)mu(N-n)`, and their Theorem 1 is the Goldbach
analogue of Murty–Vatwani Theorem 1.1 with the same `A(N)` constant.
`CHECKED IN PRIMARY SOURCE` (arXiv PDF read at byte level).

So the Murty–Vatwani route reduces, unconditionally-modulo-BV, to **one** open
hypothesis: an equidistribution statement for `Lambda(n)mu(n+2)` in progressions
to level just past `x^{1/2}`. I located **no theorem establishing
`EH_{mu_h}(x^eta)` for any fixed `eta > 0`**, and Murty–Vatwani claim none.
Related current work: Cantarini, arXiv:2607.09110v1 (2026, unrefereed, no journal
ref), studies weighted *averages* of the diagonal Goldbach-shaped version under
GRH plus a weak Gonek–Hejhal conjecture; that is not a case of the conjecture.
`CHECKED IN PRIMARY SOURCE` (arXiv PDF, abstract and §1 read at byte level).
N. A. Carella, arXiv:2206.12956v3, claims `sum_{p<=x} mu(p+a) = O(x(log x)^{-c})`
unconditionally; it is unrefereed, has no journal reference, and the refereed
literature of 2022 (Lichtman–Teräväinen, Forum Math. Sigma 10 (2022) e57;
Tao–Teräväinen, JLMS 106 (2022)) treats that statement as open. **Hold at the
door; do not cite.** `CHECKED` at abstract level only.

### 1.3 The comparison with our consumer

Our consumer (handoff §3, and endpoint-target-audit (3)): fixed `c_0, K > 0` with
`C_2 x + E_dagger(x) >= c_0 x/(log x)^K` on an unbounded set of dyadic `x`.
By the reduction `S(x) = C_2 x + E_dagger(x) + O_H(x/log^H x)` with `H > K`, this
is equivalent to `S(x) >= (c_0/2) x/(log x)^K` on an unbounded set of dyadic `x`
— a statement about the twin correlation itself and about nothing else.

| axis | Murty–Vatwani | our consumer |
|---|---|---|
| what is hypothesised | two *equidistribution* statements, about `Lambda` and about `Lambda·mu_2`, in progressions to complementary levels summing to 1 | one *lower bound on the twin correlation* on a dyadic block |
| object hypothesised about | not the twin correlation | the twin correlation |
| range | `[1,x]`, all large `x` | `(x/2,x]`, an unbounded set of dyadic `x` |
| conclusion delivered | `>= (1-o(1)) * 0.2521 * S(2) x`, i.e. positive proportion (their `K = 0`) | `>= c_0 x/(log x)^K`, `K > 0` allowed |
| known to hold in any case | `EH_Lambda` half is BV for `theta<1/2`; `EH_{mu_2}` half: no case located | no case |

**Which is logically weaker.** Our consumer is weaker in both senses. As
hypotheses: the Murty–Vatwani pair implies our consumer, subject to the interval
transfer in the next paragraph; the converse is not known and there is no visible
route to it (a single-scale lower bound on a correlation says nothing about
equidistribution of `Lambda·mu_2` in progressions). As conclusions: theirs
(positive proportion, every large `x`) is strictly stronger than ours
(`log^{-K}` fraction, unbounded set of dyadic `x`).

**The interval transfer — DERIVED HERE, not stated by Murty–Vatwani, medium
confidence.** Their conclusion (b) is over `[1,x]` and does not by itself give
the dyadic statement: `sum_{n<=x} >= 0.2521 * 2C_2 x` combined with the best
available upper bound `sum_{n<=x/2} <= (4+o(1)) * 2C_2 * (x/2)` (Selberg sieve
with BV, or `(2+o(1))` on EH) leaves the difference unsigned. What does transfer
is the *proof*: both hypotheses carry `max_{y<=x}`, so applying them at `y = x`
and at `y = x/2` and subtracting gives Lemma 3.4 and Lemma 4.4 on `J_x`, and the
trivial bound `|sum_{n in J_x} Lambda(n)mu(n+h)| <= sum_{n in J_x}
Lambda(n)mu^2(n+h) ~ A_h x/2` is interval-local. That yields
`S(x) >= (1-o(1)) (1-A_2) C_2 x`, i.e. our consumer with `K = 0` and
`c_0 = 0.2521 C_2`. I checked the three places where the range enters; I did not
re-run their whole argument. **This is a derivation we would own, not a
citation.**

### 1.4 Vatwani, Math. Z. 293 (2019) 285–317

Abstract read verbatim from the publisher page via the Wayback capture
20200212205018 of `link.springer.com/article/10.1007/s00209-018-2177-z`
(`CHECKED IN PRIMARY SOURCE` for the abstract; **body `FETCH FAILED`** — Springer
303s to an IdP, no arXiv preprint exists under the author's name, no thesis copy
located, no open-access PDF in Unpaywall or Semantic Scholar):

> "We show that Bombieri–Vinogradov type theorems for a certain class of
> functions `f` in arithmetic progressions can be extended to the product
> `f(n) mu^2(n+h_1) ... mu^2(n+h_k)`, up to almost the same level of distribution
> as that for `f`. As an application of this result, we show equidistribution of
> tuples of squarefree integers in arithmetic progressions with a level of
> distribution up to 2/3. This generalizes a result of Orr (J Number Theory 3:
> 474–497, 1971). We also formulate arithmetic progression analogues of the
> Chowla conjecture on correlations of the Möbius function. We are able to prove
> this for some special cases, thereby generalizing a result of Siebert and Wolke
> (Math Z 122(4):327–341, 1971). We also show the relevance of such conjectures
> to the twin prime problem."

Reading, with the caveat that the body was not opened: the BV extension is for
the *squarefree indicator* `mu^2`, not for `mu`, so it does not touch
`EH_{mu_h}`; the "special cases" of the AP-Chowla analogues are unidentified and
cannot be priced. **Not usable as an input, and not usable as evidence that
`EH_{mu_h}` is approachable, until the body is read.** Side note for report 09 §C:
Siebert & Wolke, Math. Z. 122 (1971) 327–341, "Über einige Analoga zum
Bombierischen Primzahlsatz", is named here as prior art for AP analogues of
Möbius correlations; it is a plausible published locator for the Möbius
Bombieri–Vinogradov statement report 09 §C could not find. I did not open it
(`FETCH FAILED`), and this is a lead, not a citation.

---

## 2. Tao's `delta_x`, and the exact dictionary to `E_dagger`

### 2.1 The statement, verbatim

Source: Tao, "Notes on the Bombieri asymptotic sieve", blog post 2016-07-17,
`terrytao.wordpress.com/2016/07/17/notes-on-the-bombieri-asymptotic-sieve/`.
I downloaded the page HTML and extracted the text, keeping the `alt` attributes
in which WordPress renders the LaTeX. **`CHECKED IN PRIMARY SOURCE`** (blog, not
refereed). Quotations are from that extraction.

The axioms of his Theorem 1, on a sequence `a_n` (all four verbatim):

> "(i) (Non-negativity) One has `a_n >= 0` for all `n`.
> (ii) (Crude size bound) One has `a_n << tau(n)^{O(1)} log^{O(1)} n` for all `n`.
> (iii) (Size) We have `sum_{n<=x} a_n = (C+o(1))x` for some constant `C>0`.
> (iv) (Elliott-Halberstam type conjecture) For any `eps, A > 0`, one has
> `sum_{d <= x^{1-eps}} |sum_{n<=x: d|n} a_n - C x g(d)/d| <<_{eps,A} x log^{-A} x`
> where `g` is a multiplicative function with `g(p^j) = 1 + O(1/p)` for all primes
> `p` and `j >= 1`."

For `a_n = Lambda(n+2)` axiom (iv) is the Elliott–Halberstam conjecture; he says
so explicitly ("one of course needs EH to justify axiom (iv) in this case").
Theorem 1 then gives the asymptotic for `sum_{n<=x} Lambda_{vec k}(n) a_n` for
every fixed tuple `vec k != (1,...,1)`.

The `delta_x` sentences, verbatim:

> "In particular, we have `sum_{n<=x} Lambda(n)Lambda(n+2) = (delta_x + o(1)) 2
> Pi_2 x` and the twin prime conjecture would be proved if one could show that
> `delta_x` is bounded away from zero, while (1) is equivalent to the assertion
> that `delta_x` is equal to `1+o(1)`. Unfortunately, no additional bound beyond
> the inequalities `0 <= delta_x <= 2` provided by the Bombieri asymptotic sieve
> is known, even if one assumes all other major conjectures in number theory than
> the prime tuples conjecture and its variants (e.g. GRH, GEH, GUE, abc, Chowla,
> ...)."

Where `delta_x` comes from, verbatim (his §"Having proved Theorem 1"):

> "If we define `delta_x` (up to an error of `o(1)`) by the formula `sum_{n<=x}
> Lambda(n) a_n = (delta_x G(1) + o(1)) C x` ... In particular, after adjusting
> `delta_x` by `o(1)` if necessary, we have `0 <= delta_x <= 2` since the
> left-hand sides are non-negative."

Three hypotheses that must travel with the quotation:
1. `delta_x` is only defined **up to `o(1)`**. Any assertion finer than `o(1)`
   — in particular any `log^{-K} x` statement with `K > 0` — is not expressible
   in this normalisation.
2. The interval `0 <= delta_x <= 2` and the whole asymptotic-sieve machinery are
   **conditional on EH** (axiom (iv)). Unconditionally the only bounds are
   `delta_x >= 0` (non-negativity) and `delta_x <= 4 + o(1)` from Selberg's sieve
   with Bombieri–Vinogradov; Tao states the `4` at his (4) and notes EH improves
   it to `2`.
3. Remark 4 of the post: the single-scalar description needs the level of
   distribution to tend to 1; with a fixed level `x^{1-c}` "the asymptotics ...
   are not determined by a single scalar parameter `delta_x`" (he attributes the
   constructions to Ford). **Our reduction has no level-of-distribution
   hypothesis at all, so we are not inside the regime where `delta_x` is even the
   right parametrisation.** This is the most important caveat for the mapping
   below.

Also verbatim from the same post, and directly relevant to §5 and to report 07's
D4:

> "on GEH the asymptotic (1) is equivalent to the asymptotic `sum_{n<=x} mu(n)
> 1_R(n) mu(n+2) 1_R(n+2) = o(x/log^2 x)` for some fixed `alpha>0`, and similarly
> with `1_R` replaced by other sieves."

(`R` is defined earlier in the post as "the set of numbers that are rough in the
sense that they have no prime factors less than `x^alpha` for some fixed
`alpha>0`".) He continues:

> "Unfortunately, the recent progress on the Chowla conjecture relies heavily on
> the multiplicativity of `mu` at small primes, which is completely destroyed by
> inserting a weight such as `1_R`, so this does not yet yield a viable path
> towards the twin prime conjecture even assuming GEH."

And the `p_1 p_2 - p_3 p_4 = 2` statement, verbatim:

> "on GEH one can use two such applications of the Bombieri asymptotic sieve to
> show that the twin prime conjecture would follow if one could show that there
> are `>> x/log^2 x` solutions to the equation `p_1 p_2 - p_3 p_4 = 2` in primes
> with `p_1,p_2,p_3,p_4 >= x^alpha` and `p_1 p_2 <= x`, for some `alpha > 0`."

### 2.2 The dictionary — DERIVED HERE, elementary

Write `T(y) = sum_{n<=y} Lambda(n)Lambda(n+2)`, so Tao's normalisation is
`T(y) = (delta_y + o(1)) 2 Pi_2 y` with `Pi_2 = C_2`.

Our sum is over `J_x = (x/2,x]` and uses `n-2`. Substituting `m = n-2`,

    S(x) = sum_{x/2 < n <= x} Lambda(n)Lambda(n-2)
         = sum_{x/2-2 < m <= x-2} Lambda(m)Lambda(m+2)
         = T(x-2) - T(x/2-2)
         = T(x) - T(x/2) + O(log^2 x),

because each of the two boundary windows of length 2 contributes `O(log^2 x)`.
Hence

    S(x) = 2 C_2 [ delta_x * x - delta_{x/2} * (x/2) ] + o(x)
         = C_2 x (2 delta_x - delta_{x/2}) + o(x).

Define the **dyadic scalar** `delta^{(2)}_x := 2 delta_x - delta_{x/2}`, so that
`S(x) = (delta^{(2)}_x + o(1)) C_2 x`. Then, from
`S(x) = C_2 x + E_dagger(x) + O_H(x/log^H x)`,

    **E_dagger(x) / x = C_2 ( delta^{(2)}_x - 1 ) + o(1)
                      = C_2 ( 2 delta_x - delta_{x/2} - 1 ) + o(1).**

Consequences, all elementary:

- The mapping floated in the brief, `E_dagger/x = (delta_x - 1) C_2 + o(1)`, does
  **not** hold in general. It is correct only if `delta` is asymptotically
  constant across the dyadic step (`delta_x - delta_{x/2} -> 0`), which is not
  part of any hypothesis. The correct object is the dyadic difference.
- Ranges. `S(x) >= 0` gives `delta^{(2)}_x >= 0`. The Selberg upper-bound sieve
  applied on `J_x` gives `delta^{(2)}_x <= 4 + o(1)` unconditionally (`2 + o(1)`
  on EH). I did **not** verify an interval-uniform form of the sieve upper bound
  in a primary source; Tao's (4) is stated for `[1,x]`. From the pointwise
  interval `delta_y in [0,2]` one only gets `delta^{(2)}_x in [-2,4]`, which is
  weaker than the direct non-negativity.
- **Resolution.** `delta_x` is defined up to `o(1)`. Our consumer with `K > 0`
  asks for `S(x) >= c_0 x/log^K x`, which is `o(x)` — **below the resolution of
  the `delta_x` normalisation entirely.** So the `delta_x in [0,2]` sentence
  cannot be read as a statement about our `K>0` consumer; it is a statement about
  the `K = 0` case. In the lower direction it does cover the `K=0` case a
  fortiori: nothing better than `delta_x >= 0` is known.
- **Interval.** Our consumer at `K = 0` implies `delta_x >= c_0/(2C_2) > 0`
  along an unbounded set of `x`, hence implies Tao's sufficient condition along
  that set. The converse fails: `delta_x >= c` for all large `x` gives
  `T(x) - T(x/2) >= 2C_2 c x - T(x/2)`, and the best available upper bound
  `T(x/2) <= (4+o(1)) C_2 x` (`(2+o(1)) C_2 x` on EH) never closes, since
  `c <= 2`. **Our dyadic consumer is therefore strictly stronger than the
  literature's `delta_x`-bounded-away-from-zero condition.**
- **A weaker sufficient consumer exists and the repo does not state it —
  DERIVED HERE, elementary.** Summing the reduction over dyadic blocks,
  `T(2^j) = 2 C_2 * 2^j + sum_{i<=j} E_dagger(2^i) + O_H(2^j / j^H)`
  (the accumulated errors are dominated by the top block). So it suffices to
  prove `2 C_2 * 2^j + sum_{i<=j} E_dagger(2^i) >= c_0 * 2^j / j^K` on an
  unbounded set of `j`. Because `S >= 0` this is implied by the per-scale
  consumer and is strictly weaker than it (the mass may be spread over the top
  `O(1)` blocks). At `K = 0` it is exactly "`delta_x` bounded away from zero
  along an unbounded set of `x`" — the object the literature names. This is a
  specification observation, not an estimate; it costs nothing and it lands the
  repo's target on the literature's own scalar.

---

## 3. Does a quantitative two-point Möbius/Liouville bound imply twins?

**No theorem over `Z` of that form was found.** What exists is: one unconditional
theorem over `F_q[T]`, in which Chowla and twins are parallel consequences of a
third input rather than one implying the other; two conditional theorems over `Z`
whose hypotheses are Möbius/Liouville correlations **equidistributed in
arithmetic progressions to a high level** — an EH-shaped input, strictly stronger
than a bound on the correlation; and one blog assertion that plain Chowla is not
known to help.

| source | exact statement | hypotheses | bearing on twins | status |
|---|---|---|---|---|
| **Pintz, "Are there arbitrarily long arithmetic progressions in the sequence of twin primes? II", Proc. Steklov Inst. Math. 276 (2012) 222–227, DOI 10.1134/s008154381201018x = arXiv:1004.1067v1** | "**Theorem 1.** Suppose that with a `theta = theta_1 > 3/4`, the relations (1.2), (1.5), further the analogues of (1.5) with `lambda(n)` replaced by `lambda(n)lambda(n+h)`, `lambda(p-h)log p` and `lambda(p+h)log p` hold, where `h` is any positive even integer. Then `p+h` is prime for infinitely many primes `p`." **Theorem 2**: at `theta >= 0.7284`, `#{p<=N: p, p+h in P} >= c S_0(h) N/log^2 N`. **Theorem 3**: at `theta_1 >= 0.7231`, arbitrarily long APs of generalised twins. | (1.5) is `sum_{q<=N^{theta-eps}} max_a \| sum_{n<=N, n=a(q)} lambda(n) \| <<_{eps,A} N/log^A N`, and the hypothesis is that the **same** BV-shaped bound holds for all five of `log p`, `lambda(n)`, `lambda(n)lambda(n+h)`, `lambda(p+h)log p`, `lambda(p-h)log p` | **This is the closest published integer-side theorem of the requested form.** Its hypothesis list contains the two-point Liouville correlation, and the conclusion is infinitude (Thm 1) or a positive-proportion count (Thm 2). But the hypothesis is *equidistribution in progressions to level > 3/4*, not a bound on the correlation. Pintz states the plain bounds as open: "**Problem 1.** Is `sum_{n<=x} lambda(n)lambda(n+2) = o(x)` ... or even whether we have an absolute constant `c` such that `sum_{n<=x} lambda(n)lambda(n+2) < (1-c)x` for `x > x_0`." | `CHECKED IN PRIMARY SOURCE` (arXiv PDF read at byte level; journal reference confirmed via Crossref) |
| **Murty & Vatwani, Theorem 1.1** (see §1) | as quoted in §1.1 | `EH_Lambda(x^theta (log x)^C)` and `EH_{mu_h}(x^{1-theta})` | conditional twins with a positive proportion. Hypothesis is a `Lambda·mu_h` correlation **in progressions**, not two-point Chowla | `CHECKED IN PRIMARY SOURCE` |
| **Sawin & Shusterman, "On the Chowla and twin primes conjectures over `F_q[T]`", Ann. of Math. 196 (2022) no. 2 = arXiv:1808.04001v2** | Thm 1.1: for `q` a power of an odd prime `p` with `q > 685090 p^2`, and any nonzero `h`, `#{f : \|f\| = X, f and f+h prime} ~ S_q(h) X/log_q^2 X` with a power saving. Thm 1.3: Chowla for `k` shifts when `q > p^2 k^2 e^2`. | function field, large `q` relative to `p` | **Not an implication from Chowla to twins.** The subagent read §6: Thm 1.1 is proved from a Vaughan-type identity plus a level-of-distribution corollary for `mu` and a **mixed `Lambda·mu`** correlation bound; Chowla and twins are parallel consequences of one geometric input (`mu` on lines `r+s^p` behaves like a quadratic character), and the twins half additionally needs a function-field Fouvry–Michel estimate giving `Lambda` level `1/2+delta`, `delta < 1/126`, with no integer analogue | `CHECKED IN PRIMARY SOURCE` by the sub-search (§6 read); I did not re-read it |
| **Tao, "Notes on the Bombieri asymptotic sieve", 2016** | "no additional bound beyond the inequalities `0 <= delta_x <= 2` ... is known, even if one assumes all other major conjectures in number theory than the prime tuples conjecture and its variants (e.g. GRH, GEH, GUE, abc, Chowla, ...)" | — | **The "even assuming Chowla" clause carries no reference, link or argument** anywhere in the post body or comments (checked in the raw HTML: "GUE" and "abc" are hyperlinked, "Chowla" is not). Informed assertion by an expert; **not a theorem**, and no paper proving it was located | `CHECKED IN PRIMARY SOURCE`; **calibrated as a blog assertion** |
| **Tao, arXiv:1509.05422 / Forum Math. Pi 4 (2016) e8**, §1 | "The arguments in this paper extend to other bounded multiplicative functions than the Liouville function, though as they rely in an essential fashion on multiplicativity at small primes, they **unfortunately do not appear to have any bearing as yet on twin prime-type sums** such as (1.2)." | — | The author of the strongest two-point Chowla result says it does not bear on twins | `CHECKED IN PRIMARY SOURCE` |
| **Tao, "Open question: The parity problem in sieve theory" (blog, 2007-06-05)** | "**Parity problem.** If `A` is a set whose elements are all products of an odd number of primes (or are all products of an even number of primes), then (without injecting additional ingredients), sieve theory is unable to provide non-trivial lower bounds on the size of `A`. Also, any upper bounds must be off from the truth by a factor of 2 or more." | — | An obstruction statement about sieve methods, with the `1 +/- lambda(n)` weighting argument given explicitly. **The word "Chowla" does not occur in the post** | `CHECKED IN PRIMARY SOURCE` (grep: 0 hits for "Chowla") |
| **Heath-Brown, "Prime twins and Siegel zeros", PLMS (3) 47 (1983) 193–224** | Quoted in Tao–Teräväinen arXiv:2109.06291v2 Theorem 1.5(i) as: `E_{n<=x} Lambda(n+h_1)Lambda(n+h_2) = S + O(1/log log eta)` "uniformly for all `q_chi^250 <= x <= q_chi^300`". Quoted in Matomäki–Merikoski arXiv:2112.11412 §1 as the same asymptotic "for any `h>=1` and `X in [q^250, q^500]`". Both add that Heath-Brown proved a more general two-linear-form version. | a Siegel zero `beta_0 = 1 - 1/(eta log q)`, `eta >= 10` | Infinitely many Siegel zeros of unbounded quality ⟹ infinitely many twins. **The input is an exceptional zero, not a Möbius correlation bound.** | original **`FETCH FAILED`** (Oxford Academic 403, Wiley 403, no Wayback capture). Statement `CHECKED IN A SECOND PRIMARY SOURCE`, twice — and **the two quoted ranges disagree (`q^300` vs `q^500`)**; treat the upper exponent as unverified |
| **Tao & Teräväinen, JLMS 106 (2022) 3317–3378 = arXiv:2109.06291v2**, Theorem 1.6 and Corollary 1.8 | Thm 1.6: for `0<=k<=2`, `ell>=0`, given a Siegel zero of quality `eta`, `E_{n<=x} Lambda(n+h_1)...Lambda(n+h_k) lambda(n+h'_1)...lambda(n+h'_ell) = S + O(log^{-1/(10 max(1,k))} eta)` for `q_chi^{10k+1/2+eps_0} <= x <= q_chi^{eta^{1/2}}`, `S` the singular series if `ell=0` and `0` otherwise. Cor 1.8(i): the twin case with `O(log^{-1/20} eta)` for `q_chi^{41/2+eps_0} <= x <= q_chi^{eta^{1/2}}`. | a Siegel zero | Chowla-type and HL-type correlations are **both derived from a common third hypothesis**; neither is deduced from the other. The paper says so: "Only the `k + ell <= 1` cases of Conjecture 1.3 are currently known, even if one assumes the generalized Riemann hypothesis." | `CHECKED IN PRIMARY SOURCE` |
| **Matomäki & Merikoski, arXiv:2112.11412** (IMRN 2023) | improves Cor 1.8(i); Corollary 1.2: if for some even `h in [q^10, q^{eta^{99/100}}]` with `q \| h` one has `delta S_h h <= sum_{n_1+n_2=h} Lambda(n_1)Lambda(n_2) <= (2-delta) S_h h`, then `L(s,chi)` has no zero `beta_0 >= 1 - 1/(eta log q)` | — | A proved **converse-direction** result, but for Goldbach and needing a **two-sided** bound; the conclusion is a zero-free region, not Chowla | `CHECKED IN PRIMARY SOURCE` |
| **Friedlander, Goldston, Iwaniec & Suriajaya, J. Number Theory 233 (2022) 78–86**, restated in **Friedlander & Iwaniec, Essential Number Theory 1 (2022) 13–39** | "**Weak Hardy–Littlewood–Goldbach conjecture.** For all sufficiently large even `n`, `delta S(n) n < G(n) < (2-delta) S(n) n`, for some fixed `0 < delta < 1`." "**Theorem.** Assume [it] ... Then, there are no zeros of any Dirichlet `L`-function in the region (1-1) with a positive constant `c` which is now allowed to depend on `delta`." | — | Same shape as the previous row; again Goldbach and again two-sided | `CHECKED IN PRIMARY SOURCE` (open access) |
| **Friedlander & Iwaniec, "Twin primes via exceptional characters", arXiv:1607.03261** | "**THEOREM 1.** Let `x >= D^3500`. For any even positive number `h` we have `S_h(x) = BC(h)x + O(L(1,chi) x log x + x/log x)`." "**COROLLARY 1.1.** If there are infinitely many exceptional characters then there are infinitely many twin prime numbers." | primitive real `chi (mod D)`; Thm 1 is unconditional but vacuous unless `L(1,chi)` is small | second exceptional-character route; no Möbius-correlation hypothesis | `CHECKED IN PRIMARY SOURCE` |
| **Frantzikinakis, "Ergodicity of the Liouville system implies the Chowla conjecture", Discrete Analysis 2017:19 = arXiv:1611.09338** | Thm 1.1: ergodicity of the measure-preserving system generated by `lambda` implies logarithmically averaged Chowla on the same sequence of intervals | an unproved ergodic hypothesis | **the word "twin" does not occur in the paper**; no twin consequence is claimed | `CHECKED IN PRIMARY SOURCE` (grep: 0 hits) |
| **Sarnak, "Three Lectures on the Möbius Function, Randomness and Dynamics"** (IAS) | "Theorem 5: Conjecture 1 implies Conjecture 4" (Chowla ⟹ Sarnak). On why the randomness conjecture avoids the issue: "The point is that Conjecture 4 refers only to correlations of `mu` with deterministic sequences and avoids the difficulties associated with self correlations." | — | **No implication from Möbius randomness to twin primes, and the source itself gives the structural reason**: it is about correlations with deterministic sequences and explicitly sidesteps self-correlations, which is where twin primes live. The word "twin" does not occur | `CHECKED IN PRIMARY SOURCE` (grep: 0 hits) |
| **Ng, E. K.-S., "A conditional resolution of the parity problem in sieve theory", J. Number Theory 40 (1992) 329–335**, DOI 10.1016/0022-314X(92)90005-A | this is the "Ng" Tao credits in the Bombieri post (the post's hyperlink resolves to MR1154043; the bibliographic item was recovered via Crossref). Not Nathan Ng | — | unread | `FETCH FAILED` (ScienceDirect 403); bibliographic identity only |
| **Smith, T., arXiv:2511.14810v1 (2025)** | posits a "GEH-2" level of distribution for correlations of `Lambda` and claims it implies twins | — | single author, no journal, unrefereed; **hold at the door**, no assessment made | `CHECKED` at skim level only |

### Verdict for §3

**(a) Unconditional "quantitative Chowla-type bound ⟹ twins".** Over `Z`:
**none found.** Over `F_q[T]`: one, Sawin–Shusterman, and internally it is not an
implication from Chowla — both conclusions come from a common geometric input,
and the twins half needs a level-of-distribution estimate for `Lambda` with no
integer analogue.

**(b) Conditional, over `Z`.** Two, and in both the hypothesis is the correlation
**equidistributed in progressions to a high level**, not a bound on it:
Pintz (level `> 3/4`, five sequences including `lambda(n)lambda(n+h)`) and
Murty–Vatwani (levels `theta` and `1-theta`, the object `Lambda·mu_h`). A third,
different family: Siegel zeros ⟹ twins (Heath-Brown; Friedlander–Iwaniec
Cor. 1.1; Tao–Teräväinen Cor. 1.8(i)), where the input is an exceptional zero.

**(c) Folklore / blog only.** The assertion that Chowla gives nothing beyond
`0 <= delta_x <= 2` — verbatim in Tao's 2016 post, with no reference and no
argument. The slide from "twins is Chowla restricted to almost primes on GEH" to
"Chowla is essentially twins" — blocked by Tao himself in the same paragraph.

**(d) The converse (twins ⟹ a Chowla-type bound).** Nothing found in that form.
The nearest proved converse-direction results are for a **different pair** and
need a **two-sided** bound: weak Hardy–Littlewood–Goldbach ⟹ no exceptional
zeros (Friedlander–Goldston–Iwaniec–Suriajaya 2022; Matomäki–Merikoski Cor. 1.2).

**Methodological flag carried over from the sub-search, and it matters here.**
Both integer-side conditional theorems need the correlation *equidistributed in
progressions*, not merely bounded. Any local work in this programme aimed at "a
two-point cancellation bound" matches neither hypothesis; the uniformity in `q`
to level `> 3/4` (Pintz) or `x^{1-theta}` (Murty–Vatwani) is where the difficulty
sits in both papers, and neither claims otherwise.

**Fetch failures, stated as failures.** Heath-Brown 1983 original (OUP 403, Wiley
403, no Wayback capture) — statement known here only through two citing primary
sources that disagree on the upper range exponent. Ng 1992 content (ScienceDirect
403). *Opera de Cribro* chapter bodies (AMS paywall); its table of contents was
read and **there is no chapter on twin primes and Siegel zeros** — the relevant
chapters are 3 ("Bombieri's Sieve"), 16 ("Asymptotic Sieve and the Parity
Principle", incl. §16.4 "The Parity Phenomenon"), 18 ("Asymptotic Sieve for
Primes") and 24 ("The Least Prime in an Arithmetic Progression", incl. §24.2 "The
Exceptional Case", §24.3 "A Parity-Preserving Sieve Inequality"). Bombieri's own
1975/76 papers (no open copy). Friedlander–Iwaniec IMRN 2003 / Selecta 2004 /
IJNT 2005 not fetched; note the second is "…in **short intervals**", not "in
sparse sets". MathSciNet and zbMATH were blocked throughout; Semantic Scholar
returned HTTP 429; Google Scholar and arXiv full-text search were not run.

---

## 4. The logical map

### 4.1 The statements being compared

| tag | statement | quantifiers that matter |
|---|---|---|
| **(P)** our consumer | `C_2 x + E_dagger(x) >= c_0 x/(log x)^K` for fixed `c_0,K>0` on an unbounded set of dyadic `x`; equivalently (`H>K` in the reduction) `S(x) >= (c_0/2) x/(log x)^K` there | fixed `h=2`; dyadic block `(x/2,x]`; unbounded set of scales, not all scales; `K>0` allowed |
| **(P0)** our consumer at `K=0` | the same with `K=0` | as above, fixed positive fraction |
| **(P')** block-summed consumer (derived in §2.2, weaker than (P)) | `2C_2 2^j + sum_{i<=j} E_dagger(2^i) >= c_0 2^j / j^K` on an unbounded set of `j` | equivalent at `K=0` to (T0) |
| **(A)** absolute endpoint target | `E_dagger(x) = o(x)`; equivalently `S(x) = C_2 x + o(x)` | all large dyadic `x` |
| **(MV)** Murty–Vatwani hypothesis pair | `EH_Lambda(x^theta (log x)^C)` and `EH_{mu_2}(x^{1-theta})` for some fixed `theta<1`, `C` large | all `q <= x^level`, max over `y<=x` and over reduced classes; fixed `h=2` |
| **(MVb)** their conclusion (b) | `sum_{n<=x} Lambda(n)Lambda(n+2) >= (1-o(1)) * 0.2521 * 2C_2 x` | `[1,x]`, all large `x`, positive proportion |
| **(T0)** Tao's sufficient condition | `delta_x` bounded away from zero | `[1,x]`; `delta_x` defined only up to `o(1)`; conditional on EH for the `<=2` half of `delta_x in [0,2]` |
| **(HL)** Hardy–Littlewood twin asymptotic | `sum_{n<=x} Lambda(n)Lambda(n+2) ~ 2C_2 x`; equivalently `delta_x = 1+o(1)` | all large `x` |
| **(SZ)** Siegel-zero hypothesis | there exist primitive quadratic `chi` of conductor `q_chi` with `L(beta,chi)=0`, `beta = 1 - 1/(eta log q_chi)`, and quality `eta` unbounded | infinitely many, `eta -> infinity` |
| **(PZ)** Pintz's hypothesis set | BV-shaped equidistribution at level `theta > 3/4` for all five of `log p`, `lambda(n)`, `lambda(n)lambda(n+h)`, `lambda(p+h)log p`, `lambda(p-h)log p` | fixed even `h`; max over classes; level `>3/4` (or `>=0.7284` for the counting form) |
| **(CH2)** two-point Chowla with a rate at shift 2 | `sum_{n<=x} mu(n)mu(n+2) << x/(log x)^{K'}`, any fixed `K'>0`, natural average | fixed shift, unweighted |
| **(D6)** corner one-sided target | `E_dagger\|_{S_0}(x) >= -C_2 x + c_0 x/(log x)^K` | plus the *unproved* hypothesis that `W_dagger \ S_0` contributes `O_H(x/log^H x)`, `H>K` |
| **(D4abs)** corner absolute target | `\|E_dagger\|_{S_0}(x)\| = o(x)` | same unproved complement hypothesis |
| **(TaoGEH)** Tao's GEH equivalence | on GEH: (HL) `<=>` `sum_{n<=x} mu(n)1_R(n)mu(n+2)1_R(n+2) = o(x/log^2 x)` for some fixed `alpha>0`, `R` = the `x^alpha`-rough numbers | conditional on GEH throughout |

### 4.2 The relations

`=>` means "implies", with the proof named. "unknown" means no implication either way is known to me after this search; it is not a claim of independence.

| pair | relation | why, and the caveat |
|---|---|---|
| (P0) → (P) | implies | trivial |
| (P) → twin infinitude | implies | endpoint-target-audit (4): subtract the `O(sqrt x log^3 x)` prime-power contribution, choose `H>K`, get `>= (c_0/2) x/log^{K+2} x` genuine pairs |
| twin infinitude → (P) | unknown, and not expected | infinitude gives no count |
| (P) → (P') | implies | `S >= 0`, so a single block bounds the block sum |
| (P') → (P) | does **not** follow | mass may be spread over the top `O(1)` blocks |
| (P0) → (T0) | implies | `S(x) <= T(x)` gives `delta_x >= c_0/(2C_2)` along that set |
| (T0) → (P0) | does **not** follow | derived §2.2: even with `T(x/2) <= (2+o(1))C_2 x` on EH, `delta_x <= 2` cannot beat the subtraction. **Our dyadic consumer is strictly stronger than the literature's condition.** |
| (A) → (HL) | equivalent | by the reduction, both directions |
| (MV) → (MVb) | implies | their Theorem 1.1(b), `CHECKED IN PRIMARY SOURCE` |
| (MVb) → (P0) | does **not** follow directly | full-range lower bound minus the available upper bound at `x/2` does not close (§1.3) |
| (MV) → (P0) | implies, **by a transfer we would own** | derived §1.3, medium confidence: their hypotheses carry `max_{y<=x}`, so Lemmas 3.4 and 4.4 apply at `y=x` and `y=x/2`; the `A_h` bound is interval-local |
| (P) → (MV) or any part of it | unknown, no route visible | (P) is a single-scale lower bound on one correlation; (MV) is equidistribution of two different objects in progressions |
| (MV) → (HL) | **not** implied; only (HL) `<=>` `sum Lambda(n)mu(n+2)=o(x)` | their Theorem 1.1(a). This is a second published equivalence of the Tao/GEH kind, with a different unproved conditional |
| (SZ) → (P0) | implies, **derived here**, medium-high confidence | Tao–Teräväinen, JLMS 106 (2022) 3317–3378 = arXiv:2109.06291v2, Corollary 1.8(i): `E_{n<=x} Lambda(n+h_1)Lambda(n+h_2) = S + O(log^{-1/20} eta)` uniformly for `q^{41/2+eps} <= x <= q^{eta^{1/2}}`. With `{h_1,h_2}={0,2}`, `S = 2C_2`. Apply at `x` and `x/2`, both inside the range (which is long in log-scale once `eta` is large), subtract: `S(x) = C_2 x + O(x/log^{1/20} eta)`, so `S(x) >= C_2 x/2` for `eta` large. The conductors escape to infinity because `eta <<_eps q^eps`. |
| (P) → any statement about (SZ) | does **not** follow | under (SZ), Heath-Brown's asymptotic already gives `delta ≈ 1` in those ranges, so a twin lower bound is consistent with (SZ). Contrast Matomäki–Merikoski, arXiv:2112.11412 Corollary 1.2, which rules out a Siegel zero from a **two-sided** Goldbach bound `delta S_h h <= ... <= (2-delta) S_h h`; no one-sided bound suffices there either |
| (PZ) → twin infinitude | implies | Pintz, Proc. Steklov Inst. Math. 276 (2012), Theorem 1; Theorem 2 at `theta>=0.7284` gives `>= c S_0(h) N/log^2 N`, which is our (P0) shape on `[1,N]` (same interval caveat as (MVb)) |
| (P) → (PZ) | unknown, no route visible | (PZ) is equidistribution in progressions of four objects we never form |
| (CH2) → (PZ) | does **not** follow | (PZ) needs the correlation uniform in `q` to level `>3/4`; Pintz lists even `sum_{n<=x} lambda(n)lambda(n+2) < (1-c)x` as his open Problem 1 |
| (CH2) → (P) or (HL) | **no such implication is known** | Tao's post, verbatim: no bound beyond `0 <= delta_x <= 2` "is known, even if one assumes all other major conjectures in number theory than the prime tuples conjecture and its variants (e.g. GRH, GEH, GUE, abc, Chowla, ...)". Blog assertion, no reference or proof attached; see §3 for the sweep result |
| (HL) → (CH2) | unknown | not located |
| (D6) `<=>` (P), given the complement | equivalent | tautologically: if `E_dagger\|_{complement} = O_H(x/log^H x)` with `H>K` then `S(x) = C_2 x + E_dagger\|_{S_0} + O_H`. Correct as stated in report 07 |
| (D4abs) → (HL), given the complement | equivalent | same substitution: `E_dagger\|_{S_0} = o(x)` and complement `O_H` give `E_dagger = o(x)`, i.e. (A), i.e. (HL); and conversely |
| (TaoGEH) vs (D4abs) | same shape of object, different weight and different required saving | see §5 and the flag list below |

### 4.3 What report 07's D6 states more strongly than the logic supports

Four flags. None of them is an error in the derivation; three are about labelling
and scope, one is a missing prior-art attribution.

1. **The strength ordering of the two corner targets is inverted by the labels.**
   D6 calls the one-sided target "the theorem, not a lemma" and the absolute
   target "the one that behaves like a lemma". Given the same complement
   hypothesis, the one-sided target is equivalent to `S(x) >= c_0 x/log^K x`
   (a quantitative twin lower bound) and the absolute target is equivalent to
   `S(x) = C_2 x + o(x)` (the full Hardy–Littlewood asymptotic). The absolute
   target is therefore **strictly stronger** than the one-sided one, not weaker.
   The report's own text says it gives "far more than needed", so this is a word
   choice rather than a contradiction, but "behaves like a lemma" is the wrong
   description of a statement strictly stronger than the conclusion. The
   defensible version of the triage is not logical strength but convention: the
   absolute target is a recognisable open problem in an owning convention with
   partial results, while the one-sided target has no literature at all.

2. **D6 is a property of the framing, not of `S_0`.** The equivalence holds
   verbatim for *any* subregion whose complement is controlled to `O_H` with
   `H>K` — including `E_dagger` itself, and including every piece of every
   exhaustive decomposition. Stated as "the one-sided target is the theorem", it
   reads as a finding about the corner. It is a finding about the sufficient
   consumer. The report's "Payoff, exactly" section is consistent with this; the
   D6 headline is not.

3. **The equivalence is conditional on an unproved input that is harder than
   anything currently priced.** D6 says "given the complement"; wave-1 D2 puts
   the complement at a uniform moment saving `gamma = 2` against the `3/50`
   priced at one box. Any downstream summary that drops the conditional
   overstates D6 by that entire gap.

4. **Missing prior art on D4.** The object in D4 — `sum_n mu(n)mu(n-2) L(n)
   L'(n-2)` with nonnegative sieve weights killing the small-prime part of the
   twin problem — is the object in Tao's 2016 GEH statement
   `sum_{n<=x} mu(n)1_R(n)mu(n+2)1_R(n+2) = o(x/log^2 x)`, quoted verbatim in
   §2.1 above, which he states is **equivalent to the twin asymptotic on GEH**,
   and about which he states the reason recent Chowla progress does not transfer.
   Report 07's D4 and its ASSESSMENT are independent rediscoveries of the same
   framing. Under CLAUDE.md's rule this must be recorded as novel-to-us. Two
   differences that must travel with the attribution: (i) Tao's weight `1_R` is a
   *rough-number* indicator, which does destroy multiplicativity of `mu` at small
   primes; our `L` is a *large-prime-factor* weight, which leaves `n`'s small
   prime factors unrestricted, so Tao's stated reason for non-transfer does not
   apply to our weight verbatim and would have to be re-argued; (ii) the required
   savings differ, see the next point.

5. **A quantitative comparison report 07 does not make.** Tao's rough-Möbius sum
   has trivial size `≍ x/log^2 x` (Buchstab density of `x^alpha`-rough numbers,
   squared) and his target is `o(x/log^2 x)` — an `o(1)` *relative* saving.
   Report 07's D5 puts the corner's term-wise mass at `≍ eta_0^4 x log^4 x`
   against a target of `o(x)` — a `log^{-4-eps}` *relative* saving. **The present
   decomposition asks for roughly `log^4` more relative cancellation than the
   closest literature reduction of the same shape.** That difference comes from
   summing the whole prime band with `log r` weights instead of fixing one sieve
   weight. Whether a re-derivation could land on the cheaper shape is not
   addressed here; the size difference is arithmetic and is checkable.

---

## 5. Is the leftover two-Möbius bilinear form a published reformulation of two-point Chowla?

Short answer: **the shape is published; the identification with a Vaughan /
Heath-Brown Type II remainder is not.** The one place the equivalence appears is
Tao's 2016 blog post, conditional on GEH.

| source | exact statement | direction and conditional | status |
|---|---|---|---|
| **Tao, "Notes on the Bombieri asymptotic sieve", 2016-07-17** | "on GEH the asymptotic (1) is equivalent to the asymptotic `sum_{n<=x} mu(n)1_R(n)mu(n+2)1_R(n+2) = o(x/log^2 x)` for some fixed `alpha>0`, and similarly with `1_R` replaced by other sieves." `R` = the `x^alpha`-rough numbers, `(1)` = the HL twin asymptotic. He adds: "the recent progress on the Chowla conjecture relies heavily on the multiplicativity of `mu` at small primes, which is completely destroyed by inserting a weight such as `1_R`, so this does not yet yield a viable path towards the twin prime conjecture even assuming GEH." | **Equivalence**, conditional on GEH throughout. Obtained by two applications of the Bombieri asymptotic sieve, one per Möbius factor — **not** by a Vaughan or Heath-Brown split. Asserted in the post, not proved there. | `CHECKED IN PRIMARY SOURCE` (page HTML downloaded and text extracted; blog, not refereed) |
| same post, the EH-only version | "the Bombieri asymptotic sieve can be used to show that the asymptotic (1) is equivalent to the asymptotic `sum_{n<=x} mu(n)1_R(n)Lambda(n+2) = o(x/log x)`" | equivalence, conditional on EH, **one** Möbius factor | `CHECKED IN PRIMARY SOURCE` |
| **Maynard, "Counting primes", ICM 2022 Proceedings vol. 1, DOI 10.4171/icm2022/206**, Question 17 and the paragraph after it | "**Question 17 (Type II estimates for twin primes).** Can one estimate a Type II sum associated to Twin Primes, such as `sum_{n~N} sum_{m~M} alpha_n beta_m Lambda(nm+2)` for arbitrary 1-bounded sequences `alpha_n, beta_m`? One might also try to reduce both prime variables to bilinear terms, but sums such as `sum_{n~N,m~M,r~R,s~S, nm+2=rs} alpha_n beta_m gamma_r delta_s` also appear infeasible to handle. (The natural Cauchy-Schwarz argument leads to conditions like `n_1 s_2 - s_2 n_1 = d` for some `d \| 2n_2 - 2n_1`, and little appears to have been gained.)" (the index typo is in the source) | An **open question**, not an equivalence, and **no** link to Chowla is drawn. This is the determinant-2 four-variable object with arbitrary 1-bounded coefficients on all four variables. | `CHECKED IN PRIMARY SOURCE` (IMU-hosted PDF, pdftotext) |
| **Friedlander & Iwaniec, "Asymptotic sieve for primes", Ann. of Math. 148 (1998) 1041–1065 = arXiv:math/9811186**, hypothesis (B) | "(B) `sum_m \| sum_{N<n<=2N, mn<=x} gamma(n) mu(mn) a_{mn} \| <= A(x)(log x)^{-2^22}`" for `Delta^{-1} sqrt D < N < delta^{-1} sqrt x`, with `gamma(n,C) = sum_{d\|n, d<=C} mu(d)`, for every `1 <= C <= x/D`. With `a_n = Lambda(n-2)` this is the twin-prime bilinear hypothesis, but it carries **one** Möbius factor, an `ell^1` absolute value over `m` rather than a signed estimate, and needs their §9 to drop squarefree support. They state explicitly: "The stumbling block is that in this case we have no idea how to prove that the relevant sequence satisfies the condition (B)"; and "the source of cancellation in the bilinear form in (B) comes from the sign changes of the Möbius function `mu(mn)`". | **One direction only**: (R)+(B) ⟹ prime asymptotic. No equivalence claimed. | `CHECKED IN PRIMARY SOURCE` (full 25 pp. PDF) |
| **Murty & Vatwani, Theorem 1.1(a)** | given `EH_Lambda(x^theta (log x)^C)` and `EH_{mu_2}(x^{1-theta})`, the HL twin asymptotic and `sum_{n<=x} Lambda(n)mu(n+2) = o(x)` are **equivalent** | refereed equivalence, conditional on two unproved distribution conjectures, **one** Möbius factor, no rough or prime-band weight. Their method is a Vaughan-style split `Lambda = Lambda_y + Lambda^y`, so it is in the same family as the decomposition we run, but the leftover correlation is `Lambda(n)mu^2(n+h)Lambda^y(n+h)`-shaped, not two-Möbius | `CHECKED IN PRIMARY SOURCE` |
| **Friedlander & Iwaniec, *Opera de Cribro*, AMS Colloq. 57 (2010)** | Table of contents confirmed: Ch. 16 "Asymptotic Sieve and the Parity Principle" (§16.4 "The Parity Phenomenon", p. 337; §16.5 "The Dichotomy in Action", p. 338); Ch. 18 "Asymptotic Sieve for Primes", p. 355 | Chapter bodies not obtained; cannot certify whether the book says in so many words that the leftover bilinear form *is* the parity obstruction | TOC `CHECKED IN PRIMARY SOURCE`; chapter text `FETCH FAILED` |
| **Preobrazhenskiĭ & Preobrazhenskaya, arXiv:1405.0682v7** | describes "a binary problem which may be considered as an **interpolation** between Chowla's conjecture for two-point correlations of the Möbius function and the twin prime conjecture", via weights `kappa_1^{omega_-(n,y)} kappa_2^{omega_+(n,y)}` interpolating in the count of small and large prime factors | an interpolating family, explicitly **not** an equivalence; theorems not verified beyond the setup | setup `CHECKED`; theorems not read |
| **Ford, "On Bombieri's asymptotic sieve", arXiv:math/0401215** | constructs sequences showing that weakening the well-distribution hypothesis kills the conclusion; this is the source of Tao's Remark 4 | a negative about the sieve's hypotheses, not about the equivalence | `ABSTRACT ONLY` |
| **Debouzy, arXiv:1907.06393** | on EH, localises variables in Bombieri's asymptotic sieve; obtains infinitely many `p` with `p-2` prime or `p-2 = p_1 p_2` with `p_1 < X^eps` | one direction, weaker conclusion, no Chowla equivalence | `ABSTRACT ONLY` |

**Verdict.** The specific claim — that the Type II remainder of a Vaughan or
Heath-Brown decomposition of `sum Lambda(n)Lambda(n+2)`, with both Möbius factors
and prime-detecting cofactors, is equivalent to or a reformulation of weighted
two-point Chowla at shift 2 — **was not found**. Tao reaches the same *shape*
by a different route (the Bombieri asymptotic sieve, twice, on GEH); Maynard
poses the four-variable determinant-2 object as open without linking it to
Chowla; Friedlander–Iwaniec's (B) is one-Möbius and `ell^1`; Murty–Vatwani's
refereed equivalence is one-Möbius and doubly conditional. So the identification
report 07 makes in D4 is novel-to-the-channels-searched **as an identification**
and is **not novel as a shape**: any write-up must cite Tao's post as the prior
statement of the shape.

**Calibration of the negative.** Conventions actually run: "Type II sums twin
primes", "Type II information twin primes", "bilinear forms twin primes",
"parity obstruction bilinear form twin primes", "parity problem bilinear form",
"Bombieri asymptotic sieve twin primes bilinear", "asymptotic sieve for primes
bilinear hypothesis", "Chowla conjecture restricted to almost primes", "Chowla
for rough numbers", "rough Chowla", "mu(n)mu(n+2) rough numbers", "Heath-Brown
identity twin primes", "Vaughan identity Lambda(n)Lambda(n+2)", "twin primes
equivalent bilinear estimate", plus author sweeps on Ng, Pintz, Granville, Murty
and Vatwani. Channels: WebSearch, DuckDuckGo HTML, the arXiv API
(title/abstract/comment only), direct PDF fetches, Wayback. **Not run:** Google
Scholar, MathSciNet or zbMATH review text, Semantic Scholar (HTTP 429
throughout), arXiv full-text search. **Not read:** *Opera de Cribro* Ch. 16 and
Ch. 18 bodies, Vatwani's Math. Z. paper, Bombieri's original 1975/76 papers.
Treat this as "not found on the channels used", not "absent from the literature".

One loose end worth recording: Tao's post credits a similar EH-level reduction to
"**Ng**" with no hyperlink and no citation in the page HTML; the reference could
not be resolved.

---

## 6. Ranked: at most three items that change what the live assessment should say

**1. The corner object has prior art, and the arbitrary-coefficient version of it
is a named open question.** Report 07's D4 identity — the corner is
`sum_n mu(n)mu(n-2) L(n) L'(n-2)` with nonnegative sieve weights — is the shape
Tao states in his 2016 post as **equivalent on GEH** to the twin asymptotic
(`sum_{n<=x} mu(n)1_R(n)mu(n+2)1_R(n+2) = o(x/log^2 x)`), together with his
stated reason why Chowla progress does not transfer; and Maynard's ICM 2022
Question 17 poses the four-variable determinant-2 sum with arbitrary 1-bounded
coefficients as apparently infeasible, adding that "the natural Cauchy-Schwarz
argument ... little appears to have been gained" — which is the step this
programme has already run. *Why it changes the assessment:* under CLAUDE.md's
novel-versus-novel-to-us rule the corner framing must be recorded as an
independent rediscovery with those two citations attached, and the note that
Tao's weight `1_R` restricts small primes while ours does not, so his stated
non-transfer reason would have to be re-argued for our weight, not inherited.

**2. The `delta_x` dictionary in the brief is wrong by one dyadic step, and a
strictly weaker sufficient consumer is available at zero cost.** The correct
relation is `E_dagger(x)/x = C_2(2 delta_x - delta_{x/2} - 1) + o(1)`, not
`(delta_x - 1) C_2 + o(1)`; and because `delta_x` is defined only up to `o(1)`,
the `K > 0` consumer is below the resolution of that normalisation entirely.
Consequently the repo's dyadic consumer at `K=0` is **strictly stronger** than
the literature's "`delta_x` bounded away from zero", and the block-summed form
`2C_2 2^j + sum_{i<=j} E_dagger(2^i) >= c_0 2^j/j^K` is a strictly weaker
sufficient condition that lands exactly on the literature's scalar. *Why it
changes the assessment:* the current target statement asks for more than the
minimum, and the weaker version is free — a specification improvement of the
same kind as endpoint-target-audit §2, with the same calibration (sufficiency
derived, the estimate itself untouched and still OPEN).

**3. Every published route from a two-point Möbius/Liouville object to twins
needs equidistribution in progressions, not a bound — and Murty–Vatwani reduces
to a single hypothesis just past level `1/2`.** Pintz (Proc. Steklov Inst. Math.
276 (2012), Thms 1–3) needs BV-shaped uniformity at level `> 3/4` for five
sequences including `lambda(n)lambda(n+h)`; Murty–Vatwani needs `EH_Lambda` and
`EH_{mu_2}` at complementary levels, which at `theta = 1/2 - eps` collapses to
BV plus `EH_{mu_2}(x^{1/2+eps})` alone. Both are strictly stronger hypotheses
than our consumer, which they imply (with a routine interval transfer we would
own) and which implies neither. *Why it changes the assessment:* it fixes the
calibration of "our consumer is the weakest known sufficient statement of this
family" — it is, but that is because it is a bare lower bound on the object
itself, which is also why no external theorem can be plugged into it. Any future
brief that proposes "prove a two-point cancellation bound" must say whether it
means a bound or uniformity in `q`; the published routes need the latter.

**Also worth recording, outside the ranked three (derived here, medium-high
confidence).** The Siegel-zero hypothesis **implies** our consumer at `K=0`:
apply Tao–Teräväinen Corollary 1.8(i) at `x` and at `x/2`, both inside
`[q^{41/2+eps}, q^{eta^{1/2}}]`, and subtract, giving
`S(x) = C_2 x + O(x/log^{1/20} eta)`. Two consequences. First, any purported
proof of the consumer must be consistent with the Siegel-zero world, so no
argument that implicitly assumes no exceptional characters can be complete
without saying so. Second, a proof of the consumer would **not** disprove Siegel
zeros: the known converse-direction results (Matomäki–Merikoski Cor. 1.2;
Friedlander–Goldston–Iwaniec–Suriajaya) all need a **two-sided** bound, and a
one-sided lower bound is exactly what a Siegel zero predicts.

---

## 7. What was not done

- Heath-Brown's 1983 original was not opened; the two citing primary sources
  disagree on the range (`q^300` vs `q^500`).
- Vatwani's Math. Z. 293 (2019) body was not opened; only the publisher abstract.
- *Opera de Cribro* chapter bodies were not opened; its TOC shows **no** chapter
  on twin primes and Siegel zeros.
- Bombieri's 1975/76 papers, and Ng, J. Number Theory 40 (1992) 329–335, were not
  opened.
- MathSciNet, zbMATH, Google Scholar, Semantic Scholar (HTTP 429) and arXiv
  full-text search were not used. Every negative in §§3 and 5 is "not found on
  the channels used", not "absent from the literature".
- No arithmetic was attempted on `E_dagger`, on the corner, or on any budget.
  Nothing in this report is an estimate.
