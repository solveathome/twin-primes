# PRE-REGISTRATION — importing Ojaroudi's two elementary lemmas onto our tile

<!-- ledger
id: Q-import-bridge-prereg
status: SUPERSEDED
todo: none
question: Do Ojaroudi's two elementary lemmas, imported onto our tile, beat the incumbent per-prime discrepancy numbers?
verdict: Pre-registration only, sealed before any number was computed: the predictions, the incumbents, the win condition and five declared traps are fixed here, and the null result is the expected result because P4 is an identity; the outturn is import-bridge.md.
-->

*Written and committed BEFORE any number in this experiment was computed. Nothing
below is a result. The outturn will be `import-bridge.md`; the producers will be
`research/import-bridge-01-verify.js` and `research/import-bridge-02-experiment.js`.
Sealed 2026-08-19.*

Parents: `research/history/staging/ojaroudi-read.md` §6(d) (the two tools, with
their hypotheses as the read recorded them) and §7 (the divergence remark);
`research/discrepancy-two-class.md` §3 and §10 (the ×3 per-fold ceiling, and the
`L²`→`L∞` gap named as the corpus's own); `research/level-ledger-tight.md` Thm 1,
§3 and §4(a) (the certified per-prime numbers, and the Parseval sup route the
corpus already owns).

---

## 1. The objects, pinned in OUR notation

Fix a level `x` (a prime, or `x = 3`). Write

```
  W   = x#            = prod_{q <= x} q
  T_x = { r mod W : r !≡ 0 and r !≡ -2  (mod q)  for every prime q <= x }
  D   = |T_x|         = prod_{3 <= q <= x} (q - 2)
  p   = p(x)          = the least prime > x           (the FOLD prime)
```

`T_x` is the twin-slot tile of `research/discrepancy-two-class.md` §2 and
`research/level-ledger-tight.md`. The fold by `p` replicates `T_x` into `p`
blocks `a + bW`, `0 <= b <= p-1`, and deletes from block `b` the two **kill
classes** `{a_p, a_p - 2}` with `a_p = -bW mod p` — the convention of
`research/import-chaining-02.js`'s `tile()`.

**The lift.** Ojaroudi's `U_i` is the fold's replication with the `b = 0` block
dropped:

```
  U_x = { a + bW : a in T_x, 1 <= b <= p-1 } ⊂ (W, pW),      |U_x| = (p-1) D
```

**The AP counts and the AP variance** (his `c^{(m)}`, `D_i(m)`; our
`h(a)` of `level-ledger-tight.md` Thm 1):

```
  h_q(a) = #{ r in T_x : r ≡ a (mod q) }
  D_x(q) = sum_{a mod q} ( h_q(a) - D/q )^2
```

**The kill count of an auxiliary modulus:**

```
  B_q = #{ n in U_x : q | n  or  q | n+2 }
```

**LEMMA A (BRIDGE), to be proved in our notation.** For `q` coprime to `W`,
`q > 2`:

```
  | B_q - (2/q)|U_x| |  <=  2 sqrt(p-1) sqrt( D_x(q) )
```

**LEMMA B (COLLISION), to be proved in our notation.** For `j in {0,2}` let
`b_j(a) = -(a+j) W^{-1} mod p` be the unique block index in which `p` kills the
copy of `a` through the class `-j`, and `n_j(a) = a + W b_j(a)` that killed
element. For a modulus `L`, with `k_{j,L}(r) = #{ a in T_x : n_j(a) ≡ r mod L }`:

```
  sum_r k_{j,L}(r)^2  <=  p * sum_r h_L(r)^2  =  p ( D_x(L) + D^2/L )
```

## 2. The incumbents this is measured against

All from `research/level-ledger-tight.md`, which is the file the read named as
the live neighbour.

**`LL(x)`, the certified per-residue sup** — Thm 1 plus the §3 exhaustion table,
valid for every prime `q > x` and every residue simultaneously:

```
  LL(x) = R*(x) + D/W      x <= 19,  R* = 1, 1, 1.8, 3, 6.584416, 14.384615,
                                            27.019392, 53.972817  at x = 2,3,5,7,11,13,17,19
  LL(23) = 3 R*(19) + D/W  = 161.918451 + D/W        (Thm 2 transfer, x = 23 not exhaustible)
```

**`TRI(x,q) = 2(p-1) LL(x)`** — the incumbent bound on `|B_q - 2|U_x|/q|`, got by
the triangle inequality over the `2(p-1)` residue counts the window identity
exposes. This is what the Bridge has to beat.

**`CERTD(x,q) = q LL(x)^2`** — the only certified upper bound on `D_x(q)` the
corpus owns for `x` beyond exhaustion, being `q` terms each `<= LL(x)^2`.

**`PAR(x,q) = sqrt( D_x(q) )`** — the Parseval sup route, already written down in
`level-ledger-tight.md` §4(a) ("sup <= sqrt(sum_a (h - D/p)^2)"). It is the
incumbent on the sup channel, and it is NOT new to this import.

## 3. The chain under test, and what would count as a win

```
  chain:   exhaustive D_x(q)  ->  LEMMA A  ->  bound on |B_q - 2|U_x|/q|
  chain':  CERTD(x,q)         ->  LEMMA A  ->  bound on |B_q - 2|U_x|/q|
```

**WIN CONDITION (the only one that counts as "a new certified number").** A
level `x` and modulus `q` at which `chain'` — every input a-priori certified, no
measurement — produces a strictly smaller bound than `TRI(x,q)`. One such pair is
a win. Zero such pairs is a null result and must be reported as one.

**SECONDARY (weaker, recorded but not a win).** A pair at which `chain` (measured
`D_x(q)`) beats `TRI(x,q)`. This is weaker because `D_x(q)` costs `O(D)` to
compute exactly and `B_q` costs `O(D)` as well, so a bound built from a measured
`D_x(q)` never certifies anything that direct exhaustion at the same level does
not certify better. It is reported as a measurement of *how much room the Bridge
would have if the L² input were ever supplied by theorem*.

## 4. Pre-registered predictions

**P1 — both lemmas go through.** Both proofs are claimed three-liners. Predicted:
LEMMA A goes through exactly as stated, and its unstated injectivity requirement
(`b -> -bW mod q` injective on `1..p-1`, needing `q >= p-1`) is automatic from
`gcd(q,W) = 1`, as the read's §5 already argues. Predicted: LEMMA B goes through
and **its stated hypotheses are strictly stronger than its proof needs** — no step
uses `L` squarefree, `gcd(L,W) = 1`, or `gcd(L,p) = 1`.

**P2 — numerical verification, extended.** >= 400 `(x,q)` pairs over
`x in {3,5,7,11,13,17,19,23}`, `q` prime and coprime to `W`. Predicted: **zero
violations**. Reproducing his own grid (`x in {3,5,7,11,13}`, 11 moduli each = 55
pairs) predicted to give a max ratio LHS/RHS in `[0.25, 0.40]`, his figure being
0.31. Over the extended grid the max ratio is predicted `<= 0.6`.

**P3 — the coprimality hypothesis is load-bearing, and demonstrably.** For
`q <= x` (so `q | W`) every `n in U_x` is coprime to `q(q+2)` by construction, so
`B_q = 0` while `2|U_x|/q > 0`; the ratio LHS/RHS is then
`sqrt(p-1) / sqrt(2 + 4/(q-2))`. Predicted: **violations at every level with
`x >= 11`**, largest at `q` nearest `x`. This is the control that shows the
hypothesis is not decorative.

**P4 — the certified verdict is an identity, and it is negative.**

```
  BRIDGE_cert / TRI  =  2 sqrt((p-1)q) LL(x) / ( 2 (p-1) LL(x) )  =  sqrt( q/(p-1) )
```

and every admissible `q` satisfies `q >= p` (all prime factors of an admissible
`q` exceed `x`), so the ratio is `>= sqrt(p/(p-1)) > 1` at every level and every
modulus. **Predicted: ZERO new certified numbers, at every level, and the margin
is smallest — never below 1 — at the smallest admissible `q`.** To be confirmed
numerically to `1e-12` rather than discovered.

**P5 — the measured-input chain does have room, and it runs out.** `chain` beats
`TRI` exactly when `D_x(q) < (p-1) LL(x)^2`. Predicted: it beats `TRI` at every
tested `q` for `x <= 19`, and at `x = 23` there is a **crossover**, because
`(p-1)LL(23)^2 = 28 * 161.92^2 ≈ 7.34e5` while `D <= 7.95e6`. Predicted crossover
at `D_23(q)/D ≈ 0.092`.

**P6 — the Bridge is not an L² -> L∞ conversion, and the sup endpoint of its own
family is already ours.** Running the identical proof with `b` restricted to a
set `S` of size `s` gives `2 sqrt(s) sqrt(D_x(q))`; at `s = 1` that IS
`level-ledger-tight.md` §4(a)'s Parseval sup bound, up to the factor 2 for the
two classes. Predicted: the Bridge is the corpus's own §4(a) statement plus
Cauchy-Schwarz over the block index, buying `sqrt(s)` where the triangle
inequality pays `s`; the read's phrase "a pointwise bound" is predicted to be an
overstatement, since `B_q` is an aggregate over `2(p-1)` residue classes.

**P7 — the collision bound is loose by exactly a factor `p`.** Predicted:
`sum_r k_{j,L}(r)^2 / ( p (D_x(L) + D^2/L) )` has median `1/p` and lies in
`[0.7/p, 1.3/p]` for every tested `(x, j, L)`; equivalently the slack
`p * ratio` is predicted in `[0.7, 1.3]` throughout, with the maximum `<= 1.5`.
Mechanism claimed in advance: the `p` fibres `A_b = {a : b_j(a) = b}` are each of
size `≈ D/p` and near-equidistributed mod `L`, so Cauchy-Schwarz over them is
lossless in shape and costs its full `p`.

**P8 — the divergence rider.** Ojaroudi's remark is that the unweighted
`Q(L) = sum_{L' <= L} L' D_x(L')` diverges once `L' > W`, on forced 0/1
occupancy. Predicted, in our notation: `max_r h_L(r) = 1` for **every**
`L > maxdiff(x) := max T_x - min T_x = W - 12` and hence `D_x(L) = D - D^2/L`
exactly there, so `L D_x(L) = LD - D^2` grows linearly and
`Q(L) / (D L^2/2) -> 1`. Predicted further, and this sharpens his remark: the
linear regime starts **far below** `W`, at the `L` where `D_x(L)` first reaches
the binomial line `D(1 - 1/L)`, which is predicted to be `O(D * polylog)` and not
`O(W)`. The threshold `L` at which `D_x(L) >= 0.9 D(1-1/L)` is the number to be
reported; no band is pre-registered for it, because the corpus has no prior on it.

## 5. Traps declared in advance

1. **Custody first.** Every tile is rebuilt from scratch and `D` checked against
   `discrepancy-two-class.md` §2's column (3, 15, 135, 1485, 22275, 378675,
   7952175) and against `import-chaining-02.js`'s `tile()` before any new number
   is read.
2. **`B_q` computed two ways.** Once by direct enumeration over the `(a,b)` pairs
   of `U_x`, which uses no identity, and once by the window identity
   `B_q = sum_{b=1}^{p-1} [ h_q(-bW) + h_q(-2-bW) ]`. They must agree exactly, at
   every level where direct enumeration is affordable. Disagreement kills the
   window identity, not the Bridge.
3. **Exact arithmetic where it decides.** `B_q`, `sum_r h^2`, `sum_r k^2` are
   integers and are accumulated as integers; only the final ratios are floating.
4. **No re-derivation of embedded numbers.** `R*(y)` is quoted from
   `level-ledger-tight.md` §3, not recomputed; `D_x` from `discrepancy-two-class.md`
   §2. The 2717 s `--deep` run is not repeated.
5. **The null result is the expected result.** P4 is an identity, so the headline
   is predicted to be negative before anything runs. If a positive comes out, the
   first suspicion is a definition slip, and the direct-enumeration control of
   trap 2 is what would catch it.
