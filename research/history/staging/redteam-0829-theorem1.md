# Red team, 2026-08-29: Theorem 1 of `attack-AB-bounded.md`, re-derived line by line

<!-- ledger
id: Q-redteam-0829-theorem1
status: ANSWERED
todo: none
question: Is Theorem 1 of attack-AB-bounded.md (B <= 9 A(z)^2 (E(z)-1) = O((log z)^8)) a theorem, and at what rung does the corpus carry it?
verdict: PROVEN, and the scope now covers the whole chain: the L1 to L5 mean-square derivation and Theorem 1's bound on B are each re-derived here with no hypothesis, so <R^2>_H <= 9 A(z)^2 (E(z)-1) H holds for every z, s and H as a mean over one period, the record's [INFERRED] is an under-grade, and the live layer's "published as Opera de Cribro 6.18" is wrong on two counts and must be replaced.
-->

*(Internal, HELD under the publication moratorium. Adversarial re-derivation
only: no script in `research/` was edited, no existing document was edited, no
git command was run. Calibration markers follow `CLAUDE.md`.)*

## 0. VERDICT

**PROVEN**, scoped, and the record's own `[INFERRED]` is an under-grade for the
mathematics. The three steps of `attack-AB-bounded.md` §1.1 are a complete
elementary proof of

> `B(z,s) <= 9 A(z)^2 (E(z) - 1)` for every `z >= 3` and every level exponent
> `s > 0`,

where `B` is the corpus's own finite sum, and the asymptotic tail
`9 A^2 (E-1) = O((log z)^8)` follows from Mertens' third theorem plus two
absolutely convergent correction products. Every step was re-derived here from
the definitions and two of the three closed forms were re-checked against an
independent brute-force enumeration to machine precision. Nothing in the chain
is a citation: the one input the record calls sourced, `|lambda_d| <= 1`, is a
property of the repository's own weight construction and holds exactly, not up
to a reference.

**Three caveats, first.**

1. **The scope is the inequality about `B`, not the mean-square lemma.** The
   statement `<R^2>_H <= B(z,s) H` comes from the L1 to L5 chain in
   `research/lemmaV-parseval.js`. That chain was **not** re-derived in this pass
   (§8). The PROVEN ruling here upgrades one link, not the composite.
2. **The bound is a bound, and it is far from the object.** `bound/B` runs
   2.597e+3 at `z = 13` to 2.511e+4 at `z = 41` (reproduced below), so the
   theorem is a proof about `(log z)^8` and carries no information about the
   measured `B ~ 1.5`.
3. **The attribution clause in `research/REFUTED.md` is wrong on two counts, not
   one** (§6). The published Lemma 6.18 does not cover this corpus's `s` range,
   which today's audit already found, **and** its object is not this object even
   where the hypothesis holds. Both halves have to leave the sentence.

The per-`e` verification at the tabled levels is evidence for **instances**, not
for the steps as theorems. Its value after this pass is different and still
real: it confirms that the definitions written in the record's §1.1 are the
definitions the producer implements. It passes that test.

---

## 1. The statement, with every quantifier

Fix a prime cutoff `z >= 3`, write `ps = {p : p < z}` and `P(z) = prod_{p<z} p`,
and fix a level exponent `s > 0` with `D = z^s`.

**The weights.** `Lp = lambda^+` and `Lm = lambda^-` are the Rosser upper- and
lower-bound linear-sieve supports of level `D` built by
`rosserSupport(z, D, upper)` in `research/sift-limit-lemmaV.js`: a set of
squarefree `d | P(z)` with `d <= D`, each carried with sign `mu(d)`.

**The term list.** `research/sift-limit-lemmaV.js:buildTerms(z, D)` enumerates
the index set `i` of triples (block, `d1`, `d2`), where the block runs over the
three vector-sieve combinations `COMB = [(Lm, Lp, +1), (Lp, Lm, +1),
(Lp, Lp, -1)]`, `d1` runs over the block's first support and `d2` over its
second, and the pair is kept if and only if `gcd(d1, d2) | 2`. For a kept term,

```
  q_i = lcm(d1_i, d2_i),   w_i = eps * mu(d1_i) * mu(d2_i) in {+1, -1},
  c_i = the CRT class of  r = 0 mod d1_i,  r = -2 mod d2_i.
```

**The objects.** For `e | P(z)`,

```
  V(e1, e2) = sum over { i : e | q_i and gcd(e, d1_i) = e1 }  of  w_i / q_i,
              taken at e2 = e/e1,
  Vabs(e)   = sum_{e1 | e} | V(e1, e/e1) |,
  T(e)      = sum over { i : e | q_i }  of  1/q_i,
  B(z,s)    = sum_{e | P(z), e > 1}  e * Vabs(e)^2.
```

**The bound's constants.** `r(2) = 3/5`, `r(p) = 2/(p+2)` for odd `p`,
`rho(e) = prod_{p | e} r(p)` (multiplicative, extended by `rho(1) = 1`; the
record states `r` and uses `rho` without defining the extension, and the
producer's line `rho *= (p===2 ? 0.6 : 2/(p+2))` fixes it as the multiplicative
one), and

```
  A(z) = (5/2) prod_{2<p<z} (1 + 2/p),
  E(z) = prod_{p<z} (1 + p r(p)^2) = (43/25) prod_{2<p<z} (1 + 4p/(p+2)^2).
```

**Theorem 1, as this pass rules it.**

> For every prime cutoff `z >= 3` and every level exponent `s > 0`,
> `B(z,s) <= 9 A(z)^2 (E(z) - 1)`. The right side does not depend on `s`, on the
> window length `H`, or on the window position `x`, and there is no hypothesis.
> Moreover `9 A(z)^2 (E(z) - 1) = O((log z)^8)` as `z -> infinity`.

Two quantifier facts worth stating separately, because the record's headline
compresses them. The right side is a fixed function of `z` alone, so the
statement is uniform over `s` in the strong sense that the same number bounds
every level, `D = infinity` included (§5). And the theorem quantifies over
nothing else: `B` itself has no `H` and no `x` in it, so "uniform in `s`" is the
only uniformity claim the object can carry.

**What the theorem is not.** It is not a statement about the *size* of `B`. The
measured `B(z, 3.0)` runs 1.3833 to 1.4963 over `z = 13..41` while the bound runs
3.5917e+3 to 3.7567e+4, a ratio of 2.597e+3 rising to 2.511e+4. `B = O(1)`
remains **open** and is measured rising, per the record's §1.4 and §1.5, which
this pass did not re-examine.

---

## 2. The three steps

Reproduction of the producer's table, this session, read-only, `node
research/attack-beta2-A-B-bounded.js S2`, 5.4 s. Eight levels, not the five the
record quotes; the record's §1.1 table drops `z = 17, 23, 31`, and all eight read
`none`:

```
  z    B(z,3.0)   sum_e e T(e)^2   A(z)      E(z)      9A^2(E-1)   bound/B    viol1     viol2
  13  1.383263    3.3238e+3      8.8636    6.0796  3.5917e+3  2.597e+3   none     none
  17  1.421390    5.4689e+3     10.2273    7.4847  6.1045e+3  4.295e+3   none     none
  19  1.434774    7.5596e+3     11.4305    8.8946  9.2832e+3  6.470e+3   none     none
  23  1.450254    1.0274e+4     12.6337   10.4274  1.3542e+4  9.338e+3   none     none
  29  1.465995    1.3910e+4     13.7323   11.9623  1.8605e+4  1.269e+4   none     none
  31  1.476418    1.6881e+4     14.6793   13.4063  2.4060e+4  1.630e+4   none     none
  37  1.488330    2.1930e+4     15.6264   14.9328  3.0619e+4  2.057e+4   none     none
  41  1.496346    2.5750e+4     16.4710   16.3858  3.7567e+4  2.511e+4   none     none
```

### 2.1 Step 1: partition plus triangle inequality. PROVEN.

**Claim.** For every `z >= 3`, every `s > 0` and every `e | P(z)`,
`Vabs(e) <= T(e)`.

**Proof.** Fix `e`. For each index `i` with `e | q_i` the quantity
`e1(i) := gcd(e, d1_i)` is a well-defined divisor of `e`, so the fibres
`F_{e1} = { i : e | q_i, gcd(e, d1_i) = e1 }` are pairwise disjoint and their
union over `e1 | e` is `{ i : e | q_i }`: a partition, with no term counted twice
and none omitted. Since `e` is squarefree, the factorisations `e = e1 e2` are in
bijection with the divisors `e1 | e`, so `Vabs`'s outer sum is indexed by the
same set. Then

```
  Vabs(e) = sum_{e1|e} | sum_{i in F_{e1}} w_i/q_i |
         <= sum_{e1|e} sum_{i in F_{e1}} |w_i|/q_i          (triangle inequality)
          = sum_{i : e|q_i} |w_i|/q_i                        (the partition)
         <= sum_{i : e|q_i} 1/q_i = T(e),                    (|w_i| <= 1, q_i > 0)
```

the last step using `|w_i| = |eps| |mu(d1_i)| |mu(d2_i)| = 1` on the support and
`q_i = lcm(d1_i, d2_i) > 0`. No gap. The record's own gloss, that this step
discards every sign and is where the looseness lives, is correct and is the
reason the bound is 2.6e+3 to 2.5e+4 times the object.

**Status of the per-`e` check.** `viol1 = max_e (Vabs(e) - T(e))` reads `none` at
all eight levels. That is evidence for the eight instances only. The proof above
covers every `z`, `s` and `e`.

### 2.2 Step 2: the Euler product over `p < z`. PROVEN.

**Claim.** For every `z >= 3`, every `s > 0` and every `e | P(z)`,
`T(e) <= 3 A(z) rho(e)`.

**Proof, in two moves.**

*Move 1, an exact identity with no sieve in it.* Let `Div = { d : d | P(z) }` and
define, for `e | P(z)`,

```
  S(e) = sum over ORDERED pairs (d1, d2) in Div x Div
         with gcd(d1, d2) | 2 and e | lcm(d1, d2)   of   1/lcm(d1, d2).
```

The summand and both constraints are multiplicative across `p < z`, so `S(e)`
factors into local sums. At an odd `p` the local states are (p divides neither),
(p | d1 only), (p | d2 only); the fourth state (p divides both) is barred because
it would put the odd prime `p` into `gcd(d1, d2)`, and `gcd(d1, d2) | 2` allows
only 1 and 2. The three admissible states contribute `1`, `1/p`, `1/p` to
`1/lcm`, giving local sum `1 + 2/p`. If `p | e` the constraint `e | lcm` bars the
first state, leaving `2/p`. At `p = 2` the constraint `gcd | 2` bars nothing, so
all four states are admissible and contribute `1`, `1/2`, `1/2`, `1/2`, giving
`5/2`; if `2 | e` the first state is barred, leaving `3/2`. Hence

```
  S(e) = [ prod_{p<z, p not| e} (local sum, free) ] * [ prod_{p|e} (local sum, forced) ]
       = A(z) * rho(e),   A(z) = (5/2) prod_{2<p<z}(1+2/p),
       r(2) = (3/2)/(5/2) = 3/5,   r(p) = (2/p)/(1+2/p) = 2/(p+2).
```

*Move 2, a relaxation.* The index set of `T(e)` is the disjoint union of three
blocks; in each block `d1` ranges over a subset of `Div` and `d2` over a subset
of `Div`, and every kept pair satisfies `gcd(d1, d2) | 2` and, in the sum
defining `T(e)`, `e | q_i = lcm(d1_i, d2_i)`. Every summand `1/q_i` is positive.
So each block's contribution is at most `S(e)`, and `T(e) <= 3 S(e) = 3 A(z) rho(e)`.

The relaxation is where the level truncation `d <= D` is thrown away, and it is
the only place `s` could have entered. No gap.

**Independent check of Move 1**, this session, scratchpad `check.js`, brute-force
enumeration of all ordered divisor pairs against the closed form, at every `e`:

```
  z=3   #divisors=2    A=2.500000   worst rel dev over all e so far = 0.000e+0
  z=5   #divisors=4    A=4.166667   worst rel dev = 1.332e-16
  z=7   #divisors=8    A=5.833333   worst rel dev = 9.326e-16
  z=11  #divisors=16   A=7.500000   worst rel dev = 1.311e-15
  z=13  #divisors=32   A=8.863636   worst rel dev = 3.758e-15
  z=17  #divisors=64   A=10.227273  worst rel dev = 7.002e-15
```

`S(e) = A(z) rho(e)` is an **identity**, not an inequality, at all 126 pairs
`(z, e)` enumerated. The two inequalities in step 2 are the block count 3 and the
dropped truncation.

### 2.3 Step 3: the sum over `e`. PROVEN.

**Claim.** For every `z >= 3` and every `s > 0`,
`B(z,s) <= 9 A(z)^2 (E(z) - 1)` with `E(z) = prod_{p<z}(1 + p r(p)^2)`.

**Proof.** By steps 1 and 2, `0 <= Vabs(e) <= 3 A(z) rho(e)` for every `e`, and
`t -> e t^2` is increasing on `t >= 0`, so

```
  B = sum_{e|P(z), e>1} e Vabs(e)^2 <= 9 A(z)^2 sum_{e|P(z), e>1} e rho(e)^2.
```

The function `e -> e rho(e)^2` is multiplicative with value `p r(p)^2` at each
prime, so `sum_{e|P(z)} e rho(e)^2 = prod_{p<z} (1 + p r(p)^2)= E(z)`, and
removing the `e = 1` term (value 1) gives `E(z) - 1`. Evaluating the local
factors: at `p = 2`, `1 + 2 (3/5)^2 = 43/25`; at odd `p`,
`1 + p (2/(p+2))^2 = 1 + 4p/(p+2)^2`. Hence
`E(z) = (43/25) prod_{2<p<z}(1 + 4p/(p+2)^2)`. No gap.

**Independent check**, same scratchpad script, brute-force sum over all divisors
of `P(z)` against the Euler form:

```
  z=3   sum_e e rho^2 = 1.7200000000    E(z) = 1.7200000000    rel 0.000e+0
  z=5   sum_e e rho^2 = 2.5456000000    E(z) = 2.5456000000    rel 1.745e-16
  z=13  sum_e e rho^2 = 6.0796356210    E(z) = 6.0796356210    rel 1.461e-16
  z=29  sum_e e rho^2 = 11.9623356502   E(z) = 11.9623356502   rel 5.940e-16
  z=41  sum_e e rho^2 = 16.3858261752   E(z) = 16.3858261752   rel 3.469e-15
```

### 2.4 The asymptotic tail

`A(z) = O((log z)^2)` and `E(z) = O((log z)^4)` need Mertens' third theorem plus
absolute convergence of the correction products, both standard:

```
  (1 + 2/p)(1 - 1/p)^2        = 1 - 3/p^2 + 2/p^3,
  (1 + 4p/(p+2)^2)(1 - 1/p)^4 = 1 + O(1/p^2),
```

so `A(z) ~ c_A (log z)^2` and `E(z) ~ c_E (log z)^4` with
`prod_{p<z}(1-1/p)^{-1} ~ e^gamma log z`. Hence
`9 A^2 (E-1) = O((log z)^8)`. The exponent 8 is `2*2 + 4`, and no cancellation is
claimed anywhere in the chain, so the record's "honest and lossy" reading is
right: the measured looseness exponent 6.15 over `z = 13..41` is the finite-range
approach to 8.

**Ruling on the three steps: each is proved above, unconditionally, for every
`z >= 3`, every `s > 0` and every `e`. The chain is a proof, and `[INFERRED]` is
one rung low.**

## 3. The sourced input `|lambda_d| <= 1`

**Which weights.** The `lambda_d` in question are the entries of the two Rosser
supports `Lp` and `Lm` of level `D = z^s`, for the two congruence systems
`r = 0 mod p` and `r = -2 mod p`, `p < z`. They enter the chain only through
`w_i = eps * lambda^{(a)}_{d1} * lambda^{(b)}_{d2}`, and only through
`|w_i| <= 1` in step 1.

**Where the record sources it.** §3.4 cites Iwaniec, *Lectures on sieves*
(arXiv:math/0209360), "It follows from the relations (2.3) and (2.6) that
|lambda_d| <= 1", corroborated by Motohashi (1.4.1) and Richert (9.29), (11.20).

**Whether it holds for the corpus's weights at every `d`: yes, and not by
citation.** `rosserSupport` generates each squarefree `d | P(z)` at most once,
by a strictly decreasing-index recursion over a sorted prime list, and stamps it
with `(m % 2 === 0) ? 1 : -1`, that is `mu(d)`. So the realised weight vector is
`lambda_d in {0, mu(d)}` and `|lambda_d| <= 1` holds **exactly, by
construction**, with no reference needed. Checked this session, scratchpad
`lam.js`, over 8 levels `z = 13..41` times 4 values `s in {2.0, 2.6, 3.0, 3.4}`
times both supports:

```
  sign != mu(d), or d not | P(z), or d > D : 0 violations
  max multiplicity of any d in a support   : 1
  max |sign|                               : 1
```

**Consequence, and it widens the theorem.** Step 1 never uses any property of
Rosser weights beyond `|lambda_d| <= 1` and `supp(lambda) subset { d : d | P(z) }`.
Steps 2 and 3 use neither. So Theorem 1 holds verbatim for **any** pair of weight
vectors supported on divisors of `P(z)` with sup-norm at most 1, at any level, in
any number of blocks up to 3. The Iwaniec citation is therefore not load-bearing
for the corpus's own `B`, and the theorem is more general than its record states.

**Where the sup-norm hypothesis does fail, and it matters for one reading.**
Selberg weights are **not** covered: the record's own §3.3 delta 4 records
`lambda_d = sum_{[d1,d2]=d} rho_{d1} rho_{d2}` with `|lambda_d| <= 3^{nu(d)}`, so
step 1's final inequality would cost `3^{nu(d1)} 3^{nu(d2)}` rather than 1 and
the Euler products would change. The corpus's three certificate blocks are Rosser
only, so this is not a gap in Theorem 1; it is a limit on how far the theorem can
be quoted.

**One mis-attributed input, flagged rather than closed.** §3.4 also lists
Richert (9.32), `#{(d1,d2) : [d1,d2] = d} = 3^{nu(d)}`, among the "sourced inputs
that Theorem 1 actually rests on". Theorem 1 as derived in §2 does not use it.
The factor 3 in step 2 is the **block count** of `COMB`, not a representation
count, and under the constraint `gcd(d1,d2) | 2` the number of ordered pairs with
`lcm = d` is `2^{nu(d)}` at odd primes rather than `3^{nu(d)}`, since the
both-divide state is barred. The citation is harmless because nothing depends on
it, but it should not be carried as an input to this theorem.

---

## 4. The constants, and the `p = 2` case

Each constant re-derived from the definitions, and each numerically confirmed
against the producer's table at `z = 13`.

| constant | where it comes from | check |
|---|---|---|
| the **3** in `T(e) <= 3 A rho(e)` | the three vector-sieve blocks `COMB = [(Lm,Lp,+1), (Lp,Lm,+1), (Lp,Lp,-1)]`, each of whose pair sums is at most the same relaxed `S(e)` | structural; the block list is `sift-limit-lemmaV.js:94` |
| the **9** in `9 A^2 (E-1)` | `3^2`, from squaring `Vabs(e) <= 3 A rho(e)` in step 3 | structural |
| **5/2** in `A(z)` | the `p = 2` local sum with `2 not| e`: four admissible states contributing `1, 1/2, 1/2, 1/2` | `A(13) = (5/2)(5/3)(7/5)(9/7)(13/11) = 8.863636`, table reads 8.8636 |
| **3/5** for `r(2)` | `(3/2)/(5/2)`, the `2 | e` local sum over the `2 not| e` one | brute force §2.2, 0 violations |
| **2/(p+2)** for odd `p` | `(2/p)/(1 + 2/p)` | brute force §2.2, 0 violations |
| **43/25** in `E(z)` | `1 + 2 r(2)^2 = 1 + 2(9/25) = 43/25` | brute force §2.3, `E(13) = 6.0796356210` against the table's 6.0796 |
| **`1 + 4p/(p+2)^2`** for odd `p` | `1 + p r(p)^2 = 1 + p (2/(p+2))^2` | same |

**The clause "`(p|both)` barred by `gcd | 2`" is correct and is the load-bearing
half of the local analysis.** `gcd(d1, d2) | 2` means `gcd(d1,d2) in {1, 2}`. If
an odd prime `p` divided both `d1` and `d2` it would divide the gcd, which then
has an odd prime factor and divides neither 1 nor 2. So the constraint is exactly
"no odd prime divides both", which is multiplicative across the odd primes and
imposes nothing at `p = 2`. That is why the constraint factors at all, and the
whole Euler product turns on it.

**The `p = 2` case, checked separately.** Three separate things go right at 2 and
each is different from the odd case.

1. **Four states, not three.** `gcd | 2` permits `2 | gcd`, so `(2|d1, 2|d2)` is
   admissible. It contributes `1/lcm` with `2 || lcm`, so weight `1/2`, the same
   as either single state, because `d1` and `d2` are squarefree and `lcm` picks up
   exactly one factor of 2. Local sum `1 + 1/2 + 1/2 + 1/2 = 5/2`.
2. **The joint class is nonempty.** `r = 0 mod 2` and `r = -2 mod 2` are the same
   congruence, so the CRT step `crtPair` does not drop the pair; the `2 | gcd`
   case is the reason the solvability condition is `gcd | 2` rather than
   `gcd = 1`.
3. **The forced sum is `3/2`, not `2/2`.** With `2 | e`, exactly one of the four
   states is barred, leaving three at weight `1/2` each. The odd-prime analogue
   bars one of three and leaves two. Hence `r(2) = 3/5` sits well above the odd
   `r(p) = 2/(p+2)`, and `E`'s first factor is `43/25 = 1.72` against
   `1 + 4*3/25 = 1.48` at `p = 3`.

Note that the `p = 2` behaviour here is the **opposite** of the record's §1.3,
where the two admissible states at `p = 2` cancel exactly and `V_full = 0` for
even `e`. There is no conflict: §1.3 is a signed computation on untruncated
supports, and Theorem 1 discards every sign at step 1, so cancellation at 2 is
invisible to it. The two sections are consistent and describe different objects.

**One edge case in the producer, harmless.**
`attack-beta2-A-B-bounded.js:provedBound` initialises `A = 2.5` and
`E = 1 + 18/25` unconditionally, then multiplies only the odd-prime factors. For
`z = 2`, where `primesBelow(2)` is empty, that returns a bound of 40.5 where the
correct empty-product value is 0; but `B(2, s) = 0` there as well, since there is
no `e > 1`, so the inequality still holds and no corpus reading uses `z = 2`.
Flagged for completeness, not as a defect in the theorem.

---

## 5. Uniformity in `s`

**The bound does not see `s` because step 2's Move 2 throws the level away, not
because `s` was fixed somewhere.**

`s` enters the construction at exactly one point: `D = round(z^s)` decides which
squarefree `d | P(z)` are admitted into `Lp` and `Lm`. Every other object in the
chain (the three blocks, the constraint `gcd | 2`, the CRT class, the weights
`mu(d)`, the exponent set `Div`) is `s`-free. Step 2's relaxation replaces the
two truncated supports by the full divisor set `Div`, which contains every
support at every `D`. Since all summands `1/q_i` are positive, the relaxed sum
`S(e)` dominates each block's sum at every level simultaneously, `D = infinity`
included.

So the answer to the brief's alternative is the first one: `B`'s definition at
every `s` is dominated by the same `T(e)`, and `T(e)` by the same `3 A(z) rho(e)`.
The uniformity is a consequence of the proof discarding the only `s`-dependent
ingredient, and it is genuine rather than an artifact of a fixed column.

**What is not uniform, and the record says so.** `B` itself moves with `s`, and
its maximum over the corpus band `s in [2.0, 3.4]` sits at the low corner:
reproduced here at `z = 29`, `B(29, 2.0) = 1.6718` against `B(29, 3.0) = 1.4660`,
and at `z = 37`, `B = 1.6443` against `1.4883`. Anyone quoting `B` flat at
1.38 to 1.49 is quoting the `s = 3.0` column only. That is the record's own
caveat and it is confirmed by this session's run:

```
  z    B(s=2.0)  B(s=2.6)  B(s=3.0)  B(s=3.4)   bound (s-free)
  13    1.2728    1.3392    1.3833    1.3968   3.592e+3
  19    1.4426    1.4469    1.4348    1.4460   9.283e+3
  29    1.6718    1.4794    1.4660    1.4771   1.861e+4
  37    1.6443    1.5389    1.4883    1.4916   3.062e+4
```

**A scope note on "uniform".** In the corpus's vocabulary "uniform in `s`"
sometimes reads as "uniform in the window position `x`", which is the quantifier
the whole Lemma V problem turns on. Theorem 1 says nothing about positions: `B`
has no `x` in it. The position quantifier lives in the L1 to L5 chain and in the
`u_sup` route, both closed or open elsewhere, and this theorem neither helps nor
hurts there.

## 6. The attribution clause

`research/REFUTED.md`:42 currently reads, in its "why" column:

> `B ≤ 9A²(E−1) = O((log z)⁸) is a theorem with no hypothesis, published as
> Opera de Cribro 6.18, and B was never the binding term`

**"Published as Opera de Cribro 6.18" is wrong on two independent counts, and
only the first was found by today's earlier audit.**

**Count 1: the hypothesis range excludes the corpus's operative range.** As the
record's own §3.3 reports, the corrected Lemma 6.18 is stated for beta-sieve
weights of level `D` with `beta >= 8` and `2 <= z <= D^{1/(beta+1)}`, and the
proof's finish assumes `s = log D / log z >= beta + 1`, so `s >= 9`. This corpus
runs `s` in [2.0, 3.4]. The published lemma therefore says nothing at any level
this corpus computes at. The paper's author flags `beta >= 8` as possibly a proof
artifact, which makes the restriction soft as a research judgement and leaves it
fully in force as a hypothesis.

**Count 2: the object is not the same object, even at `s >= 9`.** Two structural
differences, both recorded in §3.3 and both fatal to a direct attribution.

- *The absolute values sit in a different place.* The published quantity is
  `W = sum_{d|P} d ( sum_{m|P, m = 0 mod d} lambda_m/m )^2`, whose inner sum is
  **signed**: the cancellation the lemma exploits lives inside it. This corpus's
  `Vabs(e) = sum_{e1 e2 = e} |V(e1, e2)|` takes absolute values on the split
  pieces **first**. So `B` is at least the Friedlander-shaped quantity, and an
  upper bound on `W` is not an upper bound on `B`. The implication runs the wrong
  way for an attribution.
- *The corpus's object is two-factor.* Pairs `(d1, d2)` with `gcd | 2` across
  three certificate blocks, against a one-dimensional `lambda_m`.

**Count 3, a difference of direction rather than a defect.** The published
conclusion is `W << prod_{p|P}(1 - 1/p)`, which **decays** like `1/log z`.
Theorem 1's conclusion is `O((log z)^8)`, which grows. Calling the second
"published as" the first conflates a stronger statement about a neighbouring
object with a weaker statement about this one. The two are related in shape and
not in content, and the gap between them is precisely the record's own
"trivial-versus-true" gap.

**Custody caveat, and it is the sharp one for this section.** The record's §0
lists `.../lit/corpus/friedlander-weaker-simpler.txt`, 28,902 bytes, as checked
by line number. **That file is not in this working tree.** A search for
`*friedlander*` across the repository, `~/Files` and the scratchpad root returned
nothing, and `2607.05707` occurs only inside prose and script comments. So every
quotation in §3.2 and §3.3, including the `beta >= 8` and `s >= beta + 1`
readings this section leans on, is **second-hand from the record and was not
re-verified here**, exactly as `refuted-audit-0829-1.md` §8 already recorded for
its own pass. The cited preprint also postdates this assistant's knowledge
horizon, so no independent recall is available either. Rung on the published
lemma: **taken as reported**, one rung below the record's `[PROVEN], with
source`, until the text is back on disk.

**The correct attribution sentence.**

> `B <= 9 A(z)^2 (E(z) - 1) = O((log z)^8)` is proved in this repository, from
> the corpus's own definitions and no hypothesis beyond `|lambda_d| <= 1`, which
> the Rosser construction satisfies exactly. A published estimate of the same
> shape exists for a one-dimensional signed analogue, Opera de Cribro Lemma 6.18,
> corrected in Friedlander arXiv:2607.05707, under `beta >= 8`, that is `s >= 9`,
> against this corpus's `s` in [2.0, 3.4]; it is a neighbour and not a source,
> and pricing its hypothesis against this range is still the open queue item.

---

## 7. Proposed live-layer text

No file was edited by this pass. Each item gives exact old and new text, with no
em dashes in the proposed strings.

### 7.1 `research/history/staging/attack-AB-bounded.md` §1.1, the grade line. **APPLY**

Mechanical, and verified in §2 of this note.

*old*

> `**[INFERRED]** for the chain (our deduction from the sourced bound`
> `` `|lambda_d| <= 1`), **[VERIFIED]** for each step per-`e`. Unconditional, ``
> `` explicit, and uniform in `s`. Three steps: ``

*new*

> `` **[PROVEN]** for the chain, re-derived step by step in ``
> `` `history/staging/redteam-0829-theorem1.md` §2 (2026-08-29); the input ``
> `` `|lambda_d| <= 1` holds exactly by construction for `rosserSupport`, so it ``
> `` is not a citation the chain depends on. **[VERIFIED]** for each step ``
> `` per-`e`, which is evidence for the tabled instances and a check that these ``
> `` definitions match the producer's. Unconditional, explicit, and uniform in ``
> `` `s`. Three steps: ``

*Rider, same file, same flag.* HEADLINE item 1 ends "**[INFERRED]** for the
chain, **[VERIFIED]** for the steps" and must move with the grade line, to
"**[PROVEN]** for the chain, **[VERIFIED]** for the steps". The file's
`<!-- ledger -->` verdict line also carries "turns out to be published as Opera
de Cribro Lemma 6.18"; that clause should be replaced by "has a published
neighbour at `s >= 9`, Opera de Cribro Lemma 6.18", which requires regenerating
`research/QUESTIONS.md`. **HOLD** for the ledger line, since it changes a
generated file.

### 7.2 `research/G2-STATE.md` §0, the PROVEN bullet (:37-39). **APPLY**

The rung on the inequality is unchanged and is now supported by a line-by-line
derivation; the change separates the proven half from the verified half.

*old*

> `- The mean-square Lemma V, with `B ≤ 9A(z)²(E(z)−1) = O((log z)⁸)` and the`
> `  finding that `B` was never the binding term.`
> `  `history/staging/attack-AB-bounded.md`.`

*new*

> `- The mean-square Lemma V, with `B ≤ 9A(z)²(E(z)−1) = O((log z)⁸)`,`
> `  unconditional, explicit and uniform in the level `s`, re-derived`
> `  adversarially on 2026-08-29 and holding for any weights supported on`
> `  divisors of `P(z)` with `|λ_d| ≤ 1`. The companion finding that `B` was`
> `  never the binding term is VERIFIED at z = 13..47, not proven.`
> `  `history/staging/attack-AB-bounded.md` §1.1;`
> `  `history/staging/redteam-0829-theorem1.md`.`

### 7.3 `research/REFUTED.md`:42, the row's "why" clause. **HOLD**

HOLD for a reason of collision rather than of content:
`refuted-audit-0829-1.md` §7 proposes a different replacement for this same cell,
one that keeps the chain at `INFERRED here from published inputs`. This pass
rules the chain proved, so the two proposals disagree on one clause and only one
text should land. Recommended merged text:

*old*

> `B ≤ 9A²(E−1) = O((log z)⁸) is a theorem with no hypothesis, published as Opera de Cribro 6.18, and B was never the binding term`

*new*

> `B was never the binding term, the min taking the B2 branch at every z from 13 to 47; and B ≤ 9A²(E−1) = O((log z)⁸) is a theorem with no hypothesis, proved in-repo and re-derived adversarially 2026-08-29, with Opera de Cribro 6.18 a published neighbour for a one-dimensional signed analogue at s ≥ 9 against this corpus's s in [2.0, 3.4]`

The row's file column should gain `history/staging/redteam-0829-theorem1.md`.

### 7.4 `README.md` §Status, the "now proved" clause (:79-81). **HOLD**

Chris owns §Status, and the existing clause is not wrong: it says "Lemma V's
mean-square form is now proved" and immediately adds "neither yet a theorem for
`G₂`". The only tightening this pass supports is naming the constant, which is a
judgement about how much detail the one-paragraph state carries.

*old*

> `conjecture is exponent 2, and that gap has not moved — though Lemma V's`
> `mean-square form is now proved (`u_sup`, its by-product, was raised and closed`

*new*

> `conjecture is exponent 2, and that gap has not moved, though Lemma V's`
> `mean-square form is now proved with `B ≤ 9A(z)²(E(z)−1) = O((log z)⁸)``
> `(`u_sup`, its by-product, was raised and closed`

---

## 8. What this pass did not check

- **The L1 to L5 chain.** `<R^2>_H <= B(z,s) H` comes from
  `research/lemmaV-parseval.js` and `history/staging/attack-beta2-01-lemmaV-meansquare.md`.
  It was read for definitions only and **not re-derived**. The PROVEN ruling in
  §0 covers the bound on `B`, not the composite statement the live layer lists.
- **The published lemma at source.** `friedlander-weaker-simpler.txt` is not in
  this working tree (§6), so the `beta >= 8` and `s >= beta + 1` readings, and
  every quotation in the record's §3.2 and §3.3, stand at second hand.
- **Every other reading in the record.** §1.3's exact collapse
  `(1-2/p)^2(1+4p/(p-2)^2) = 1 + 4/p^2`, §1.4's `sup phi` ladder and the 247.9x
  RSS comparison, §1.5's z = 73 ladder and the `B/B_model` drift, §D2's
  `min(B H, B2)` correction and the 4.3604 / 4.7087 / 5.0021 reproduction, and the
  whole of §4 on attack B: none re-derived, none re-run.
- **Only one section of the producer was executed.** `node
  research/attack-beta2-A-B-bounded.js S2`, read-only, 5.4 s. S0, S1 and S3 to S6
  were not run, and `node research/qc/embed.js --check` was not run on any record,
  so a stale OUTPUT block elsewhere in that file would not have been caught here.
- **Mertens.** §2.4 states `prod_{p<z}(1-1/p)^{-1} ~ e^gamma log z` as standard
  and verifies only that the two correction products converge absolutely. The
  asymptotic half of Theorem 1 is proved modulo that standard input.
- **Novelty.** No literature search was run in any convention. Theorem 1's
  derivation is elementary, and an equivalent may well be in print; nothing here
  claims otherwise, and `research/SEARCH-CONVENTIONS.md` was not consulted.
- **`B = O(1)`.** Still **open**, and measured rising in the record's §1.5. This
  pass adds nothing to it in either direction.
- **Downstream usefulness.** Whether the proved mean-square form buys anything is
  §1.2's claim, not re-examined; the corpus's own §7e records the almost-all
  exponent as 0 and the ground as already owned about 1.4x more cheaply by the
  elementary second moment.
- **The gate.** `node research/qc.js` was not run: this pass edited no existing
  file, and running the gate risks regenerating `research/QUESTIONS.md`, which the
  brief forbids touching. Whoever applies §7 should run it before and after.

---

## 9. The L1 to L5 chain, re-derived (added after §0's scope note)

**Ruling: PROVEN, no hypothesis.** Every link is an identity or an elementary
inequality over `Z/W`, `W = P(z)`. Combined with §2, the composite
`<R^2>_H <= 9 A(z)^2 (E(z) - 1) * H` is proved for every `z >= 3`, every `s > 0`
and every integer `H >= 1`. The scope caveat that survives is the quantifier, not
a gap: `<.>_H` is the **mean over one period**, never a supremum.

### 9.1 Setup and quantifiers

`c(r) = Lm(r)Lp(r+2) + Lp(r)Lm(r+2) - Lp(r)Lp(r+2)`, with `Lp, Lm` the Rosser
sums of level `D = z^s`. Expanding both factors over divisors,
`c(r) = sum_i w_i * 1[r = c_i mod q_i]` with `i`, `w_i`, `q_i`, `c_i` exactly the
term list of §1; pairs with `gcd(d1,d2) not| 2` contribute an empty class and are
dropped. Every `q_i = lcm(d1_i, d2_i)` divides `W = P(z)`, so `c` is `W`-periodic
and `<c> = M = sum_i w_i/q_i`. All averages below are over `x` in one period.

### 9.2 The links

**L1, identity.** `T(x) = sum_{x<r<=x+H} c(r) = H M + R(x)` with
`R(x) = sum_{m=1..H} (c(x+m) - M)`. Definition of `R`, nothing to prove.

**L2, identity.** With `chat = c - M` of mean zero,
`<R^2>_H = sum_{m,m'<=H} K(m-m') = sum_{|v|<H} (H-|v|) K(v)`, the coefficient
being the number of ordered pairs at lag `v`. For the autocovariance: the joint
class `y = c_i mod q_i`, `y+v = c_j mod q_j` is solvable iff `v = delta mod g`
with `g = gcd(q_i,q_j)`, `delta = c_j - c_i`, and then has density
`1/lcm(q_i,q_j) = g/(q_i q_j)`. Subtracting `M^2` gives
`K(v) = sum_{i,j} w_i w_j [ g 1_{v = delta mod g} - 1 ]/(q_i q_j)`, the record's
form.

**L3, identity.** Writing `1[y = c_i mod q_i] = (1/q_i) sum_{a mod q_i}
e(a(y-c_i)/q_i)` and grouping each `a/q_i` by its reduced form `a'/e`,
`e | q_i`, `gcd(a',e) = 1`, gives `c(y) = sum_{e|P(z)} sum*_{a mod e}
Theta_e(a) e(ay/e)` with `Theta_e(a) = sum_{i : e|q_i} (w_i/q_i) e(-a c_i/e)`.
The `e = 1` term is `M`, so `chat` is the same sum over `e > 1`. Averaging a
product of two such expansions over `y mod W` kills every pair except
`a'/e' = -a/e`, that is `e' = e`, `a' = -a`; since `w_i/q_i` is real,
`Theta_e(-a) = conj(Theta_e(a))`, so
`K(v) = sum_{e>1} sum*_a |Theta_e(a)|^2 e(av/e)`. Feeding that into L2 and using
`sum_{|v|<H}(H-|v|) e(vt) = |sum_{m<=H} e(mt)|^2 = F_H(t)` gives the Parseval
form `<R^2>_H = sum_{e>1} sum*_a |Theta_e(a)|^2 F_H(a/e)`.

**L4, identity.** `sum_{a mod e} F_H(a/e) = e * #{(m,m') in [1,H]^2 : m = m' mod e}`.
With `H = qe + h`, `h = H mod e`, that count is `h(q+1)^2 + (e-h)q^2`, and
subtracting the `a = 0` term `H^2 = (qe+h)^2` leaves exactly `h(e-h)`. Checked
here by direct evaluation for all `2 <= e <= 40` and `1 <= H <= 60`, worst
absolute deviation **5.514e-12** (floating point, 2262 cases).

**Step A, two inequalities.** `F_H >= 0`, so
`sum*_a F_H(a/e) <= sum_{a != 0 mod e} F_H(a/e) = h_e(e-h_e)`, and with
`Theta*(e) = max_{(a,e)=1} |Theta_e(a)|`,
`<R^2>_H <= sum_{e>1} Theta*(e)^2 h_e(e-h_e)`. Since `h_e = H mod e <= H` and
`e - h_e <= e`, `h_e(e-h_e) <= e H`, giving
`<R^2>_H <= H sum_{e>1} e Theta*(e)^2`. The second inequality is lossy once
`H >> e`, where `h(e-h) <= e^2/4`; that is the source of the saturation the record
notes, not a defect.

**Step B, the split.** For `e | q_i`, put `e1 = gcd(e,d1_i)`, `e2 = e/e1`. Then
`e1 | d1_i` by definition and every `p | e2` divides `q_i` but not `d1_i`, so
`p | d2_i`, giving `e2 | d2_i`. Hence `c_i = 0 mod e1` and `c_i = -2 mod e2`, and
since `e` is squarefree the CRT fixes `c_i mod e` from `(e1,e2)` alone:
`c_i/e = -(-2 inv(e1) mod e2)/e2`, so `e(-a c_i/e) = e(2a inv(e1)/e2)`, the
producer's stored phase. Therefore
`Theta_e(a) = sum_{e1 e2 = e} e(2a inv(e1)/e2) V(e1,e2)` and, by the triangle
inequality, `Theta*(e) <= Vabs(e)`.

**Step C.** Combining A and B, `<R^2>_H <= B(z,s) H` for every `z`, `s`, `H`.
With §2, `<R^2>_H <= 9 A(z)^2 (E(z)-1) H = O((log z)^8) H`.

### 9.3 Brute-force check, this session

`chain.js` in the scratchpad rebuilds `Theta_e(a)` from the definition, sums the
Parseval form, and compares against `<R^2>_H` walked position by position over
the **complete** period from `c(r)` itself, with the repository's `buildTerms`
imported rather than recopied:

```
z=7  s=3.0 H=7   <R^2> brute=0.276666667  spectral=0.276666667  rel=2.61e-15  B*H=8.726667   ok
z=7  s=3.0 H=30  <R^2> brute=0.000000000  spectral=0.000000000  (both zero)   B*H=37.400000  ok
z=7  s=3.0 H=101 <R^2> brute=0.223333333  spectral=0.223333333  rel=1.18e-14  B*H=125.913333 ok
z=11 s=3.0 H=101 <R^2> brute=1.996938776  spectral=1.996938776  rel=1.15e-14  B*H=136.769116 ok
z=13 s=3.0 H=7   <R^2> brute=0.289181425  spectral=0.289181425  rel=7.87e-15  B*H=9.682841   ok
z=13 s=3.0 H=30  <R^2> brute=0.655624895  spectral=0.655624895  rel=1.12e-14  B*H=41.497892  ok
z=13 s=3.0 H=101 <R^2> brute=1.991366166  spectral=1.991366166  rel=4.46e-15  B*H=139.709569 ok
z=13 s=2.0 H=101 <R^2> brute=1.594528026  spectral=1.594528026  rel=6.27e-15  B*H=128.550338 ok
   step B worst (|Theta_e(a)| - Vabs(e)) over every e>1 and every primitive a : none, or 5.55e-17 at z=11
   B(13,3.0)=1.3832631   B(13,2.0)=1.2727756
```

Twelve `(z,s,H)` cases, four levels, exhaustive over the period at each. L3's
Parseval identity holds to 3e-14 relative or better wherever `<R^2>` is nonzero;
step B is violated nowhere; `B(13,3.0)` and `B(13,2.0)` reproduce the producer's
1.383263 and 1.2728 independently. The `z=7, H=30` row is the `g | H` case of
(V1), where both sides vanish.

### 9.4 Sourced inputs

**None.** The chain uses the CRT, the finite Fourier expansion on `Z/W`, and the
Fejér count of L4, all proved above from scratch. `|lambda_d| <= 1` is not used
anywhere in L1 to L5; it enters only at §2's step 1. So the composite statement
rests on no citation at all, and `research/G2-STATE.md`:1141's own caution stands
untouched: **prior art has not been checked, and no novelty is claimed here.**

### 9.5 What the ruling does not give

- **The quantifier.** `<R^2>_H` is a mean over one period. Lemma V proper asks
  for `R(x) << H/log^3 H` **uniformly in `x`**, and no line above bounds a
  supremum. The corpus's own §7e records the consequence: the almost-all exponent
  is 0, so the proved statement is useless for `G2` by itself.
- **Tightness.** Step A's `h(e-h) <= eH` and §2's step 1 (which discards every
  sign) leave `bound/B` at 2.6e+3 to 2.5e+4 and `B*H` roughly 30x to 560x above
  `<R^2>_H` in the rows above.
- **Everything in §8** still stands unchecked, minus the first bullet, which this
  section discharges.

### 9.6 Live-layer consequence

The chain does **not** fail, so neither text needs correcting. Both edits made
today on §7 stand as written, and this section adds the missing support for them:

- `research/G2-STATE.md` §0's bullet (:37-43) is now backed at both links, the
  mean-square derivation and the bound on `B`. **No change required.** One
  optional precision, **APPLY** if the adjudicator wants the citation to name the
  second pass: append `§9` to the existing reference, so the line ends
  `` `history/staging/redteam-0829-theorem1.md` §§2, 9. ``
- `research/REFUTED.md`:42 as it now stands says the bound "is a theorem with no
  hypothesis, proved in-repo and re-derived adversarially 2026-08-29". That is
  correct as written and is now true of the mean-square chain as well.
  **No change required, HOLD on any further edit**, since the row is already at
  its correct rung and a third rewrite in one day risks churn.
