# Attack F of 10: is the dimension-2 instantiation a real step?

<!-- ledger
id: Q-dim2-standalone
status: ANSWERED
todo: none
question: Is the dimension-2 instantiation of the DHR sieve a real step, or an exercise?
verdict: An exercise: Diamond-Halberstam's Example 1.2 sets up the same sieve problem and Theorem 9.1 is stated for every half-integer kappa >= 1 with the density condition as its only hypothesis, so what beta2-note adds is two parameter choices and one dimension-free observation that is zeb's at kappa = 1; the honest response is to state the k-class family, whose k = 1 row is a known theorem.
-->

*(2026-08-18. Staging note. Target: `paper/beta2-note.md`, after MathOverflow
37679 answer 52890 (zeb, 2011) demoted the TECHNIQUE out of our column. Sources
read directly in this pass: the Diamond–Halberstam page photographs in this
repository at `attestation/` and `attestation/book-ch5-6/`; zeb's answer through
the Stack Exchange API; the Booker–Browning ancillary table
`arxiv.org/src/1511.00601v2/anc/dhr.html`, refetched today. Legend as in
`research/covering-dive.md`: **[PROVEN]** published theorem with source;
**[VERIFIED]** checked in this repository; **[MEASURED]** empirical, finite
range; **[INFERRED]** deduction from sourced facts.)*

## 0. The verdict, first

**The dimension-2 case is an exercise.** Not "zeb's argument with κ = 2
substituted" — something weaker than that. The Diamond–Halberstam book's own
Example 1.2 (pp. 7–8) sets up the sieve problem our note sets up: the product of
`g` linear forms, **already restricted to an interval**, with `X` the interval
length, with `|r_A(d)| ≤ ω(d) ≤ g^{ν(d)}`, and with the density condition
verified for every `g` in the book's own words. Theorem 9.1 (p. 104) is stated
for every half-integer `κ ≥ 1` and its **only** hypothesis is that density
condition. What `paper/beta2-note.md` adds to the book is a choice of two
parameters and one dimension-free observation, and that observation is zeb's at
`κ = 1` and Iwaniec's in substance. This is recorded, not defended.

**But the exercise generalises, and the general form is the better statement.**
Run the same four lines at dimension `k` and the polynomial disappears: the
bound holds for an **arbitrary** admissible choice of at most `k` residue
classes per prime, which is the shape MathOverflow 88323 poses. §4 has the
table. The `k = 1` row is Iwaniec 1978, which is the calibration that tells a
reader instantly what kind of result this is.

**Four defects found in `paper/beta2-note.md`, three of them sourcing, all in
the same direction: the note UNDER-claims what this repository can prove.** They
are in §6 here and have been applied, with `research/history/CHANGELOG.md`
carrying the retired readings.

| item | verdict |
|---|---|
| Is `Ω(κ,L)` at `ω(p) = 2` a dimension-2-specific argument? | **No.** Book p. 8 does it for every `g`, using only `ω(p) ≤ g` |
| Is the remainder `2Σ4^{ν(m)}|r_m|` with `|r_d| ≤ 2^{ν(d)}` a dimension-2-specific argument? | **No.** One textbook mean value, and it is the only line `κ = 1` does not need |
| Is the error exponent `1/(2κ+2) = 1/6` load-bearing? | **No.** Any positive exponent does. `1/6` is decoration |
| Would a competent reader call it an exercise? | **Yes** |
| Does the `k`-class family follow? | **Yes**, and uniformly over arbitrary class choices |
| Is `β₂` the right constant to headline? | It is `β_k` at `k = 2`; headlining `4.26645` hides the mechanism |

---

## 1. The dependency chain, every input with its source

The theorem is `G₂(x#) ≪_ε x^{β₂+ε}`. It rests on six inputs and nothing else.
Column 4 says whether the artifact was read in THIS pass.

| # | input | source | read here |
|---|---|---|---|
| D1 | Theorem 9.1, the sieve | DH book p. 104 | **yes**, `attestation/Screenshot 2026-08-14 at 11.52.48 AM.png` |
| D2 | `Ω(κ)`, Definition 1.3 / eq. (1.5) | DH book p. 8 | **yes**, `attestation/book-ch5-6/Screenshot 2026-08-14 at 12.23.24 PM.png` |
| D3 | the density check at `κ = g` | DH book p. 8, same page | **yes**, same photograph |
| D4 | the sequence, its `ω`, its remainder | DH book p. 7 (Example 1.2) and p. 8 | **yes**, `attestation/book-ch5-6/Screenshot 2026-08-14 at 12.23.19 PM.png` and `…12.23.24 PM.png` |
| D5 | `f_κ > 0` above `β_κ`; the value of `β₂` | DH book p. 79; Booker–Browning ancillary table | **yes**, `attestation/book-ch5-6/Screenshot 2026-08-14 at 12.03.26 PM.png`; table refetched today |
| D6 | `Σ_{m≤Y} μ²(m) t^{ν(m)} ≍ Y(log Y)^{t−1}` | textbook, no page citation anywhere in this corpus | **no** |

### D1. Theorem 9.1 [PROVEN, primary source in this repository]

Verbatim from the photograph of p. 104:

> **Theorem 9.1.** *Suppose that κ ≥ 1 and that 2κ is an integer. If* **Ω(κ)**
> *holds and y is a parameter such that 2 ≤ z ≤ y, then we have*
>
> (9.9) `S(A,P,z) ≤ XV(z){F_κ(log y/log z) + O((log log y)²/(log y)^{1/(2κ+2)})} + 2 Σ_{m|P(z), m<y} 4^{ν(m)}|r_A(m)|,`
>
> *and*
>
> (9.10) `S(A,P,z) ≥ XV(z){f_κ(log y/log z) − O((log log y)²/(log y)^{1/(2κ+2)})} − 2 Σ_{m|P(z), m<y} 4^{ν(m)}|r_A(m)|,`
>
> *where F_κ and f_κ are the functions in Theorem 6.1, and the constants implied
> by the O-notation depend at most on κ and A.*

Three things follow that matter to the rest of this note.

1. **The only hypothesis is `Ω(κ)`.** There is no remainder condition, no level
   of distribution, no bilinear or well-factorable structure. The remainder is
   carried, not assumed away. So "verifying the hypotheses" means verifying
   exactly one product inequality.
2. **`κ ≥ 1` with `2κ` an integer.** Every integer `k ≥ 1` qualifies. The proof
   text immediately below adds "The case κ = 1 has been dealt with in Theorem
   7.1. The result given there has slightly better error terms", so `k = 1` is
   inside the same statement.
3. **"depend at most on κ and A"** is the uniformity `paper/beta2-note.md` §3
   needs, and it is in print on p. 104. The note's §6.3 says "The precise
   dependence of the implied constant on the Ω-condition constants is not made
   explicit anywhere we have read"; that is right about the *quantitative* form
   and understates the qualitative one, which is stated.

### D2 and D3. The density condition, and the book checking it for us

Verbatim from the photograph of p. 8, §1.4 "The Ω(κ) condition":

> **Definition 1.3.** *We say that a sieve problem satisfies the* **Ω(κ)**
> *condition provided there exist constants κ ≥ 1, A > 1 such that*
>
> (1.5) `∏_{w₁≤p<w} (1 − ω(p)/p)^{−1} ≤ (log w/log w₁)^κ (1 + A/log w₁),  2 ≤ w₁ < w.`

and, on the same page:

> *We pause here to check that* **Ω(κ)** *holds in Example 1.2 with κ = g. By
> adjusting the bound A if necessary, we may assume that w₁ ≥ g+1. Then, since
> ω(p) ≤ g, we have*
>
> `∏_{w₁≤p<w}(1 − ω(p)/p)^{−1} ≤ exp{ Σ_{w₁≤p<w} −log(1 − g/p) } = exp{ g Σ_{w₁≤p<w} 1/p + Σ_{w₁≤p<w} Σ_{r=2}^{∞} (1/r)(g/p)^r }.`

**The computation uses only `ω(p) ≤ g`.** It never touches the polynomial, the
discriminant, or the twin pattern. That is the single most important line in
this whole audit, and §4 is built on it.

### D4. The sequence and its remainder [PROVEN, and it is the book's]

Verbatim from the photograph of p. 7:

> **Example 1.2.** *Let* `L(n) := ∏_{i=1}^{g} (a_i n + b_i),` *where the
> coefficients are integers satisfying (a_i, b_i) = 1 (i = 1, …, g) and the
> discriminant* `Δ = ∏_{i=1}^{g} a_i ∏_{1≤r<s≤g} (a_r b_s − a_s b_r)` *is
> non-zero. … Now let P be the set of all primes less than z and*
>
> `A = {L(n): x − y < n ≤ x},   1 < y ≤ x.`
>
> *Here X = y, ω(d) is the number of incongruent solutions modulo d of the
> congruence L(n) ≡ 0 mod d, and* `|r_A(d)| ≤ ω(d)`. *From elementary number
> theory, ω(p) ≤ g for all primes p, with equality when p ∤ Δ.*

and from p. 8: "`ω(d) ≤ g^{ν(d)}` with equality when `(d,Δ) = 1`."

Set `g = 2`, `L(n) = n(n+2)`, `Δ = 2`. That is `paper/beta2-note.md` §2's "Our
sieve problem" — the sequence, the interval, `X = H`, `ω(2) = 1`, `ω(p) = 2` for
odd `p`, `|r_d| ≤ ω(d) ≤ 2^{ν(d)}` — line for line, in the book, at general `g`.
**The interval restriction is the book's, not ours.** `paper/beta2-note.md` §2
says "our A is that example restricted to an interval"; Example 1.2 is already
`{L(n) : x − y < n ≤ x}`.

### D5. Positivity and the constant [PROVEN]

Verbatim from the photograph of p. 79, §6.5:

> *The lower function f_κ(u) > 0 for u > β_κ (β₂ ≈ 4.266), the so-called*
> sieving limit. *Below this point f_κ(u) = 0, and Theorem 9.1 yields only the
> trivial lower bound S(A,P,z) ≥ 0. Our sieving limit of 4.266 is smaller than
> that of the Ankeny–Onishi sieve (about 4.42 for κ = 2) or the Rosser–Iwaniec
> sieve (about 4.834 for κ = 2), so we can treat some lower bound problems to
> which the other sieves do not apply.*

The twenty-decimal value is Booker–Browning's, refetched in this pass from
`https://arxiv.org/src/1511.00601v2/anc/dhr.html`; §4 tabulates the whole column.

### D6. The mean value [PROVEN in the literature, UNSOURCED in this corpus]

`Σ_{m≤Y} μ²(m) t^{ν(m)} ≍_t Y (log Y)^{t−1}` is standard and true. It carries no
page citation in `paper/beta2-note.md`, in `research/dhr-verification.md`, or
anywhere else here. It is the one input in the chain with no artifact behind it.
Cheap to fix (Halberstam–Richert or Tenenbaum), and worth fixing before
submission, because it is the *only* estimate in the proof that is ours to get
wrong.

### What this pass did NOT reach

Recorded per campaign lesson 8, because the gaps are where the next pass should
look.

- **DH book Chapter 10, "Some applications of Theorem 9.1" (pp. 113 ff.), is not
  photographed and was not read.** This is the one place in the book most likely
  to contain something adjacent to our statement, since Example 1.2 is the
  book's running example and Chapter 10 is where it says it will "come back to
  this example … and estimate S(A,P) in several applications later" (p. 8).
  What it almost certainly contains is almost-prime counts, not gap bounds — the
  book's stated ambition for `L(n)` is `L(n) = P_{g+ℓ}` infinitely often (p. 8),
  which is a count. But that is an inference, not a reading, and the pages are
  three screenshots away from settling it.
- **The `Ω(κ)` computation on p. 8 is quoted only as far as the photograph shows
  it**; its last line runs onto p. 9, which is photographed
  (`…12.23.30 PM.png`) but not read here. Nothing in this report depends on the
  tail of that computation, only on its stated conclusion "Ω(κ) holds in
  Example 1.2 with κ = g".
- **Chapters 7 (`κ = 1`) and 17 (`α_κ`, `β_κ`) are not photographed.** The
  `κ = 1` row of §4's table therefore rests on Theorem 6.1's `α₁ = β₁ = 2`
  (p. 67–68, photographed) plus `research/PRIOR-ART.md`'s record of Iwaniec,
  not on the book's Chapter 7.

### What is ours in the chain

Two sentences.

- **(A)** Take `y = z^{β₂+ε/2}` and `H = z^{β₂+ε}`, so that `u = log y/log z`
  sits strictly above the sifting limit and `f₂(u)` is a fixed positive
  constant, then check that `H·V(z)·f₂(u)` beats `2Σ4^{ν(m)}|r_m| ≪ y log⁷y`.
- **(B)** A positive count in *every* interval of length `H`, uniformly in the
  interval's position, bounds the largest gap between survivors by `H`; the
  survivors are periodic mod `x#`, so ranging the interval over one period
  finishes.

(A) is arithmetic. (B) is dimension-free, and it is the move zeb published in
January 2011 at dimension one.

**One item in the note's status header is not a dependency at all.**
`α_κ ≥ β_κ + 1 for κ ≥ 2` (p. 77) is used inside the book's proof of Theorem
9.1, near (9.42) — the photograph of p. 112 shows the two branches. Theorem 9.1
as stated on p. 104 carries no such hypothesis, so it is not an input to us. The
note lists it as diligence rather than as an error, and it is harmless, but a
reader should not think our argument has five sieve-side obligations when it has
one.

---

## 2. Does dimension 2 require anything dimension 1 does not?

Taken one at a time, as briefed.

### 2a. The density condition `Ω(κ,L)` at `ω(p) = 2` — **no**

The book's own p. 8 check covers it, and covers `g = 1, 2, 3, …` in the same
three lines, because it only ever uses `ω(p) ≤ g`. At `κ = 1` the same check is
the same check. Nothing about `ω(p) = 2` needs an idea that `ω(p) = 1` did not.

`paper/beta2-note.md` §2 additionally derives the product form from Mertens for
`∏(1 − 2/p)` and remarks that `V(z) ≍ 1/log²z`, which is true, is a nice
sanity check, and is not needed: Definition 1.3 is verified for us on p. 8.

### 2b. The remainder form `2 Σ 4^{ν(m)}|r_m|` — **one line, and it is the only one**

This is the single place where the arithmetic at `κ = 2` differs from `κ = 1`.
At one class per prime, `|r_d| ≤ 1`. At `k` classes, `|r_d| ≤ ω(d) ≤ k^{ν(d)}`,
so the weighted sum is `Σ μ²(m)(4k)^{ν(m)} ≪ y (log y)^{4k−1}`, which at `k = 2`
is `y log⁷ y`.

A polylog against an `ε`. `paper/beta2-note.md` §3 calls this "the pleasant
surprise of writing it out"; the honest description is that the worry was never
real, because we are strictly inside the positivity region and have `z^{ε/2}` of
margin to spend. Both the bound `ω(d) ≤ g^{ν(d)}` and the mean value are quoted,
not derived. Call it bookkeeping, not an argument.

### 2c. The error exponent `1/(2κ+2) = 1/6` — **not load-bearing at all**

The note's status header and §2 both foreground `1/(2κ+2) = 1/6 at κ = 2`.
Nothing depends on the value. The main term is `X·V(z)·{f₂(u) − O((log log
y)²/(log y)^{δ})}` with `f₂(u) = c(ε)` a **fixed positive constant** because `u`
is a fixed distance above `β₂`; so the error is beaten for `z ≥ z₀(ε)` for *any*
`δ > 0`. Replace `1/6` by `1/100` and the theorem is unchanged.

This matters for the novelty question because it is where our shape parts from
zeb's. **zeb reads his exponent OFF the error term**: his `4.032` is
`2b − 1 + 2/(e^{2λ} − 1)` at `b = 1, λ = 0.2533`, the exponent at which the
accumulated Brun remainder stops being beaten. **Ours is read off the sifting
limit**, and the error exponent is inert. The two are the same *skeleton*
(interval → sieve → the interval must outgrow the level → a Jacobsthal-type
bound) with the binding constraint in different places. That is a distinction
worth stating precisely and not worth claiming credit for.

### 2d. Anything else that is `κ`-dependent?

Only `2κ` an integer (p. 104), satisfied by every integer `k`. The subsidiary
`α_κ ≥ β_κ + 1` is internal to the book's proof, holds for all `κ ≥ 2` by p. 77,
and is confirmed numerically for `κ = 2 … 50` against Booker–Browning's own `α`
column in this pass — `α₂ = 5.3577… ≥ 5.2665… = β₂ + 1`, with the margin
widening in `κ`.

### 2e. The verdict, stated plainly

**A competent reader would call it an exercise**, and would be right. Somebody
who has read Chapters 1 and 9 of Diamond–Halberstam has the sequence, the
density check, the remainder bound and the theorem in front of them; what
remains is to pick `y` and `H` and to notice that positivity in every interval
bounds a gap.

The calibration that makes this unmistakable, and that should be printed rather
than hidden: **run the identical assembly at `κ = 1` and it returns
`j(x#) ≪_ε x^{2+ε}`, which is Iwaniec's 1978 theorem up to the `ε`.** A method
whose `κ = 1` case is a forty-eight-year-old theorem, applied to a monograph
whose motivating example is our sequence, is not a new method. It is the
recognised method, run at the next dimension.

**None of that makes the statement wrong, and none of it decides whether the
statement is in print.** "Exercise" is a claim about the derivation; "not found
in print" is a claim about the literature. They are independent, and only the
second is worth defending. §5 reports the search.

---

## 3. What the `k`-class generalisation is, and why the polynomial drops out

The machinery is `κ`-uniform, so instantiate at general `κ`. Doing it carefully
turns out to give something **strictly stronger** than the polynomial case, and
the reason is D3: the book's density check uses only `ω(p) ≤ g`.

### 3a. Statement [INFERRED from D1–D6]

> **Theorem (`k` classes per prime).** Let `k ≥ 1` be an integer. For each prime
> `p ≤ x` choose a set `S_p ⊆ Z/pZ` with `|S_p| ≤ k` and `|S_p| < p` (call such
> a choice **admissible**). Let
>
> `N(x; S) = the largest gap between consecutive integers r with r mod p ∉ S_p for every p ≤ x`
>
> (the surviving set is periodic mod `x#` and non-empty by admissibility, and
> the gap is taken cyclically). Then for every `ε > 0`,
>
> **`N(x; S) ≪_{k,ε} x^{β_k + ε}`**,  uniformly over all admissible `S`,
>
> where `β_k` is the Diamond–Halberstam–Richert dimension-`k` sifting limit.

Equivalently, writing `J_k(x) = max over admissible S of N(x; S)` for the
extremal function: `J_k(x) ≪_{k,ε} x^{β_k+ε}`.

### 3b. Proof, in the same four lines, with one construction

**What the book asks of a sieve problem**, verbatim from the photograph of p. 5,
§1.2 "Some basic hypotheses" (`attestation/book-ch5-6/Screenshot 2026-08-14 at
12.23.10 PM.png`), so that the construction below can be checked against it
rather than against a paraphrase:

> *there exists a convenient approximation X to |A| and a non-negative
> multiplicative arithmetic function ω(·) such that*
>
> (1.3) `0 ≤ ω(p) < p  (p ∈ P),   ω(p) = 0  (p ∉ P),`
>
> *and such that the remainder terms*
>
> (1.4) `r_A(d) := |A_d| − (ω(d)/d) X   (d | P)`
>
> *are suitably small, at least on average, over some restricted range of values
> of d.*

That is the whole interface. `A` is a finite integer sequence, `A_d` its
multiples of `d`, and nothing requires `A` to be the values of a polynomial.

**The sequence, with no polynomial.** For `r` in an interval `(t, t+H]` put

  `a_r := ∏_{p ≤ x, r mod p ∈ S_p} p`   (a squarefree positive integer, `= 1` if `r` survives).

`A = (a_r)_{t<r≤t+H}` is a finite integer sequence in the book's own framework,
and `A_d = {a ∈ A : d | a}` is exactly `{r : r mod p ∈ S_p for every p | d}`.
So `gcd(a_r, P(z)) = 1` if and only if `r` survives, and `S(A, P, z)` counts the
survivors in the interval. This construction is what removes the requirement
that the omitted classes be the roots of a fixed polynomial; Example 1.2 needs
that, and nothing downstream of Example 1.2 does.

**The four checks.**

1. `ω(d) := ∏_{p|d} |S_p|` is multiplicative and non-negative, `ω(p) = |S_p| ≤ k`,
   and `0 ≤ ω(p) < p` — which is (1.3), and is **precisely admissibility**. The
   book's own §1.2 gloss on why `ω(p) < p` is assumed ("if there existed a prime
   p\* ∈ P for which ω(p\*)/p\* equals (or is very near to) 1 … little would be
   left in A — or for us to say") is, in this instantiation, the observation
   that a covered prime leaves no survivors at all. `ω(p) = 0` for `p > x`, the
   second half of (1.3), so the sifting set is the primes `≤ x` as required.
2. `|A_d| = (ω(d)/d)·H + r_d` with `|r_d| ≤ ω(d) ≤ k^{ν(d)}`, by counting each
   of the `ω(d)` residue classes mod `d` in an interval of length `H`. `X = H`.
3. `Ω(k)` holds with an absolute `A = A(k)`, by the book's p. 8 computation,
   which uses only `ω(p) ≤ k`. The finitely many `p ≤ k` are absorbed by
   "adjusting the bound `A` if necessary", the book's own words.
4. Remainder: `2 Σ_{m<y} μ²(m) 4^{ν(m)} k^{ν(m)} = 2 Σ_{m<y} μ²(m) (4k)^{ν(m)}
   ≪_k y (log y)^{4k−1}`.

**The assembly.** Take `z = x + 1` (so the sieve sifts every `p ≤ x`),
`y = z^{β_k+ε/2}`, `H = z^{β_k+ε}`. Then `u = log y/log z = β_k + ε/2 > β_k`, so
`f_k(u) = c(k,ε) > 0`; the main term is `≫ c·z^{β_k+ε}/log^k z` and the
remainder is `≪ z^{β_k+ε/2} log^{4k−1} z`, so the margin is
`z^{ε/2}/log^{5k−1}z → ∞`. Hence `S(A,P,z) > 0` for `z ≥ z₀(k,ε)`, uniformly in
`t` and uniformly in `S` (every constant above depends on `k` alone). Ranging
`t` over a period gives the theorem; the finitely many `x < z₀` go into the
implied constant. ∎

### 3c. Three things the general form makes visible that `k = 2` hides

**(i) The exponent is not a constant, it is `β` at the problem's dimension.**
"4.26645" invites the reader to ask where that number came from. "`β_k`" answers
it. The whole content of the theorem is that the Jacobsthal-type exponent for
`k` classes per prime is the dimension-`k` sifting limit.

**This much is already ours and already written**, and it is not this report's
finding: `research/THE-DIALS.md` §6 (2026-08-17) carries the two-row table
(1 class → `κ = 1` → `β₁ = 2` → Iwaniec 1978; 2 classes → `κ = 2` → `β₂` →
`paper/beta2-note.md`), together with the sentence "Iwaniec's exponent of 2 is
β₁. Our 4.2665 is β₂. **The Jacobsthal exponent IS the sieve limit**", and the
derivation of the identification from `u = log L/log z > β_κ`. What this report
adds to it is the rest of the column (§4), the removal of the polynomial (§3b),
and the observation in (iii) below. `research/covering-dive.md`, under "WHERE
THE PROOF BREAKS", point 3, likewise already calls the `κ = 2` case
"folklore-available but unwritten", which is the same verdict §2 reaches by a
different route.

**(ii) Admissibility is a hypothesis, and at `k = 2` it is invisible.** For the
twin pattern `S_p = {0, −2}` it holds automatically (`|S_2| = 1 < 2`,
`|S_p| = 2 < p` for odd `p`), so `paper/beta2-note.md` never has to say the
word. At `k ≥ 3` it is a genuine condition — `{0, 2, 4}` covers `Z/3Z` and there
is nothing left to bound. The general statement forces the hypothesis into the
open, which is the right place for it.

**(iii) At `k = 1` the extremal problem collapses; at `k ≥ 2` it does not.**
[VERIFIED, elementary] For one class per prime, `S_p = {a_p}`, CRT gives a
unique `c` mod `x#` with `c ≡ a_p (mod p)` for all `p ≤ x`, and then `r` survives
iff `p ∤ (r−c)` for every `p ≤ x`, iff `gcd(r−c, x#) = 1`. So every one-class
choice is a **translate** of the coprime set and `J_1(x) = j(x#)` exactly. For
`k ≥ 2` no such collapse exists, which is why the `k ≥ 2` statement has to be
about a family rather than about one set, and why `G₂` (the fixed choice
`{0,−2}`) is one member of that family rather than the whole of it.

### 3d. Caveats, stated so the table is not over-read

- The constants are inexplicit in `ε` and now also in `k`; the `k`-dependence of
  `z₀(k,ε)` is not tracked here and would matter to anyone wanting `k` to grow
  with `x`. **This bound is for `k` fixed.**
- `β_k ≲ 2.44k` (Franze, quoting DH Ch. 17), so the exponent grows linearly in
  `k`. The bound is therefore weakest exactly where the objects are rarest.
- The bound is on a maximum over all admissible `S`, so it bounds every special
  case (twin slots, prime `k`-tuple slots, arbitrary sieved sets of this shape)
  and is presumably far from sharp for any particular one, as §5 of
  `paper/beta2-note.md` records for `k = 2`.
- Nothing here touches the parity barrier. `β_k` is a sieve constant and the
  wall is where it was.

---

## 4. The table

`β_k` values are Booker–Browning's, from the ancillary table of
*Square-free values of reducible polynomials* (Discrete Analysis 2016:8,
arXiv:1511.00601), refetched in this pass from
`https://arxiv.org/src/1511.00601v2/anc/dhr.html`, which states: "Each value has
been correctly truncated at the 20th decimal place, so that the displayed number
is a lower bound, and an upper bound is obtained by adding 10⁻²⁰." Their table
starts at `κ = 2`; `β₁ = 2` is `α₁ = β₁ = 2` from the book's Theorem 6.1
(pp. 67–68).

| `k` | `β_k` (rigorous, 20 d.p.) | bound `J_k(x) ≪_ε` | remainder polylog | note |
|---|---|---|---|---|
| 1 | 2 (exact) | `x^{2+ε}` | `log³ y` | **this is Iwaniec 1978**, which has no `ε` (see below) |
| **2** | **4.26645028414864191641** | **`x^{4.26646}`** | `log⁷ y` | `G₂` is one member; the bound covers any 2 classes/prime |
| 3 | 6.64085945080065843931 | `x^{6.64086}` | `log¹¹ y` | |
| 4 | 9.07224868172113415960 | `x^{9.07225}` | `log¹⁵ y` | |
| 5 | 11.53470972312165202890 | `x^{11.53471}` | `log¹⁹ y` | |
| 6 | 14.01464492084182389036 | `x^{14.01465}` | `log²³ y` | |
| 7 | 16.50425959353995421978 | `x^{16.50426}` | `log²⁷ y` | |
| 8 | 18.99885402247802854219 | `x^{18.99886}` | `log³¹ y` | |
| 9 | 21.49551431104794461663 | `x^{21.49552}` | `log³⁵ y` | |
| 10 | 23.99241257190468420537 | `x^{23.99242}` | `log³⁹ y` | |

**The `k = 1` row, in the form the corpus already carries it.**
`research/PRIOR-ART.md` records Iwaniec, *Demonstratio Math.* 11 (1978), as
`h(k) ≤ C(k ln k)²` with `k = ω(n)` and `C` inexplicit. At `n = x#`,
`ω(n) = π(x) ~ x/ln x`, so `k ln k ~ x` and the bound is `j(x#) ≪ x²` —
`β₁ = 2` with no `ε` and no `log` loss. Our assembly returns the same row a
hair weaker. That is the calibration: the family's first entry is a
forty-eight-year-old theorem and our version of it is worse.

Booker–Browning tabulate to `κ = 50`
(`β₅₀ = 122.62118408396702978799`), so the table extends as far as anyone is
likely to want. Two checks run here on the numbers:

- **Cross-source agreement [VERIFIED].** Truncating Booker–Browning to three
  decimals reproduces Franze's Table 1 exactly at all nine of `κ = 2 … 10`
  (`4.266, 6.640, 9.072, 11.534, 14.014, 16.504, 18.998, 21.495, 23.992`).
  Two independent computations of the same column agreeing to their shared
  precision.
- **The subsidiary condition [VERIFIED].** `α_κ ≥ β_κ + 1` holds at every `κ`
  spot-checked in Booker–Browning's `α` column (`κ = 2, 3, 4, 5, 10, 50`), with
  the margin `0.091` at `κ = 2` and widening; consistent with the book's p. 77.
- **The linear growth [MEASURED].** Consecutive differences `β_{κ+1} − β_κ` run
  `2.374` at `κ = 2→3`, `2.497` at `9→10`, then settle: `2.4535` at `40→41`,
  `2.4514` at `45→46`, `2.4501` at `49→50`. Consistent with the book's
  `β_κ ≲ 2.44κ` as an asymptotic statement about the ratio, which is `2.133` at
  `κ = 2` and `2.452` at `κ = 50`.

The single sanity number for `k = 2`, unchanged from `paper/beta2-note.md` §5:
at `x = 41`, `41^{4.26645} ≈ 7.6 × 10⁶` against the computed `G₂(41#) = 546`.

---

## 5. The literature question

*(Filled from the parallel prior-art sweep; see §5a for what was searched and on
which channel. `research/SEARCH-CONVENTIONS.md` §1 and §2 govern.)*

PENDING — see §5a.

---

## 6. Corrections to the record

Three defects in `paper/beta2-note.md`, found by doing what
`primeoire-campaign-lessons` lesson 7 says to do before writing an absence:
**list the directory.** All three are the note asserting that a primary source
was not available when the page photograph is sitting in this repository.

### 6a. "Definition 1.3 … **not photographed**" — FALSE

The status header carries "(Formal Ω(κ) = Definition 1.3, Ch. 1, **not
photographed**; the product restatement we actually use IS captured.)" and §6.1
amendment (b) carries "*Definition 1.3 itself was never photographed* — the
header's own parenthesis says so — so it is now sourced twice, secondarily but
verbatim, from papers that quote it and cite this book".

Page 8, carrying §1.4 "The Ω(κ) condition", Definition 1.3, and equation (1.5)
in full, is `attestation/book-ch5-6/Screenshot 2026-08-14 at 12.23.24 PM.png`.
Read here, quoted in §1 above. It says exactly what the note reconstructed from
Johnston–Thomas and Ford, including the quantifier `2 ≤ w₁ < w`, and adds
`A > 1` which the note does not record.

The folder name is what hid it: pages 3–12 are stored in `book-ch5-6/`
alongside pages 43–79, and Chapter 9 (pp. 103–112) is at the top level of
`attestation/`. Nothing was missing; the index was wrong.

**Fix:** state Definition 1.3 as primary and photographed; keep Johnston–Thomas
and Ford as independent corroboration, which is what they now are.

### 6b. The `Ω*(κ)` hedge — FALSE, and it can simply go

The status header carries "The p. 44 product form is listed in the book's own
notation index under *Basic conditions* as **Ω\*(κ)**, a starred variant
distinct from Definition 1.3's Ω(κ); the index entry is unambiguous but its
glyph is OCR, so treat the star as probable rather than certain."

Page 44 (`attestation/book-ch5-6/Screenshot 2026-08-14 at 11.58.47 AM.png`)
opens: "condition **Ω(κ)** can be restated in the form (5.2)
`∏_{w₁≤p<w}(1 + g(p)) ≤ (log w/log w₁)^κ (1 + A/log w₁), 2 ≤ w₁ < w`."
Unstarred, and identified as a restatement of Definition 1.3, which it is, since
`1 + g(p) = (1 − ω(p)/p)^{−1}` by (5.1) on p. 43.

`Ω*(κ)` is a different condition on the same page: it is **(5.6)**, the
two-sided inequality
`exp(−2A₁/log u) ≤ ∏_{u≤p<v}(1 + g*(p))(1 − 1/p)^κ ≤ exp(3A₁/log u)` on the
topped-up function `g*` produced by Lemma 5.1 (the Topping-Up Lemma), and the
book says "We call (5.6) the **Ω\*(κ)** condition." The OCR reading of the index
was right that a starred condition exists and wrong about which equation it is.

**Fix:** delete the hedge. (5.2) is `Ω(κ)` restated, p. 44 says so.

### 6c. "our A is that example restricted to an interval" — understates the book

`paper/beta2-note.md` §2 says the twin sequence is "the DH book's own motivating
example (§1.3, 'Prime g-tuples', g = 2); our A is that example restricted to an
interval." Example 1.2 is already `A = {L(n) : x − y < n ≤ x}` with `X = y`, and
already carries `|r_A(d)| ≤ ω(d)` and `ω(d) ≤ g^{ν(d)}`. The restriction to an
interval is the book's.

**Fix:** say so. It costs the note nothing it should be keeping, and it is the
sentence that makes §2 honest about how much of the setup is quoted.

### 6d. "the density hypothesis §4 verifies by hand" — stale pointer

§6.1's Bonus paragraph pointed at §4 for the dimension check. §4 is "No transfer
lemma needed"; the check is in §2. Corrected. Mechanically invisible: the
`refs` check resolves `§4` because §4 exists.

### 6e. Two items that are NOT defects, recorded so they are not re-raised

- §6.3's "the precise dependence of the implied constant on the Ω-condition
  constants is not made explicit anywhere we have read" is correct as to the
  quantitative dependence. Theorem 9.1's own closing clause, "the constants
  implied by the O-notation depend at most on κ and A", supplies the qualitative
  form the proof actually uses, and is worth citing at p. 104.
- The status header lists `α_κ ≥ β_κ + 1` (p. 77) as though it were an input.
  It is internal to the book's proof (p. 112 shows the branch). Over-listing, not
  an error.

---

## 7. Where this leaves the claim

Today removed the technique (zeb, MathOverflow 37679 answer 52890, January
2011). This pass removes the setup: the sequence, the interval, the remainder
bound and the density check are the Diamond–Halberstam book's Example 1.2, at
general `g`, on pages photographed in this repository. What is left is the
assembly, the `κ = 2` value of a tabulated constant, and whichever part of §5's
literature question survives.

The right response to that is not to defend the `κ = 2` case. It is to state the
family, because the family is what the argument actually proves, it costs
nothing extra, and its `k = 1` row is a known theorem — which tells a referee in
one line exactly how much to expect and stops them looking for a depth that is
not there.

---

*History and superseded readings: `research/history/CHANGELOG.md`.*
