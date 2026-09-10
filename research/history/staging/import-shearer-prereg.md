# Pre-registration: foreign import 3 of 5, the repulsive lattice gas

<!-- ledger
id: Q-import-shearer-prereg
status: ANSWERED
todo: none
question: Where does Shearer's region actually end on the repulsive lattice gas model of our window?
verdict: Sealed before any line of the producer existed; scored in import-shearer.md, where the exact criterion says the local lemma is the union bound on a complete dependency graph, and the two levels it buys over the local lemma's own sufficient condition are the only thing it buys.
-->

*(Written 2026-08-19, **before any line of `research/import-shearer-01-region.js`
existed and before any figure in this experiment was computed by machine**. The
experiment is `research/IMPORT-MAP.md` row 3; its record will be
`research/history/staging/import-shearer.md`. Nothing in this file may be edited
after the run. Corrections belong in the record, quoting this file.)*

---

## 0. Why a separate file

`research/IMPORT-MAP.md` §4 pre-registers row 3 in two sentences, and those two
sentences make **two** claims that this experiment can separate:

> *Pre-registration:* predict that the feasible boundary coincides with the
> Mertens threshold `Σ_{5≤p≤x} 2/p < 1`, so that `x = 5` is the last feasible
> level and the wall arrives at `x = 7`, matching the asymmetric-weights
> computation already on record.

The "so that" does not follow from its own antecedent, and the map's own
calibration table is what shows it: `import-suen-01-transfer.js`'s embedded PART
D block prints `Σ_{5≤p≤x} 2/p` as **0.4000, 0.6857, 0.8675, 1.0214** at
`x = 5, 7, 11, 13`. The Mertens threshold is crossed between `x = 11` and
`x = 13`, not between `x = 5` and `x = 7`. The `x = 5 / x = 7` pair is the
largest feasible level of a *different* condition, the asymmetric local lemma
under the weight ansatz `x_q = c/q`, printed in the same block. So the map
pre-registered a coincidence between two thresholds that its own table already
separates by two levels, and this experiment must report on each half
separately. Both halves are registered below, as stated by the map, so that the
verdict is on the record rather than on a rewritten target.

---

## 1. The model, restated from the Suen import

Taken verbatim in structure from `history/staging/import-suen.md` §3 and §8, not
re-derived. Level `x`; the scour primes are `5 ≤ p ≤ x` (the corpus's Natal@5
convention, `p = 3` carried by the comb); `K = π(x) − 2` of them.

- **Events.** Two per prime: `A_p^L = {p | r}` and `A_p^R = {p | r + 2}`.
- **Marginals.** `P(A_p^L) = P(A_p^R) = 1/p`, exactly, and the two are mutually
  exclusive because `p | r` and `p | r+2` would force `p | 2`.
- **Dependency graph, parameterised by the window length `H`.** `A_p^• ∼ A_p^•`
  always (same prime). `A_p^• ∼ A_q^•` for `p ≠ q` iff the window fails to
  equidistribute modulo `pq`, i.e. iff `pq > H`. This is import-suen §8's rule
  and it interpolates between two extremes the corpus already names: at
  `H ≥ x²` the cross-prime edges all vanish and the graph is a **perfect
  matching**; when no cross-prime pair is separable the graph is **complete** on
  the `2K` events.

Shearer's criterion, as this experiment will use it: `p ∈ R(G)` iff
`Z_{G[S]}(−p) = Σ_{I independent in G[S]} ∏_{v∈I}(−p_v) > 0` for every
`S ⊆ V`. The statement is taken from Scott–Sokal Theorem 4.1 as recorded in
`history/staging/import-map-construction.md` §3; Shearer's own paper is to be
read at source during this experiment, which is that file's §6 NOT-REACHED item.

---

## 2. What is registered

Every item is a prediction about a number this file's author has **not** run.
Two exceptions are declared here rather than hidden: the complete-graph identity
in **P3** was derived by hand while designing the experiment, and the single
value `H*(13) = 35` in **P5** was hand-checked on four primes. Both are marked.

**P1 — the reduction.** The Shearer condition on the `2K`-vertex two-class graph
is *identical* to the Shearer condition on the `K`-vertex one-event-per-prime
graph with marginals `2/p`. Reason offered: the two events of a prime are
adjacent, so an independent set takes at most one of each pair, and the two
choices carry equal weight `−1/p`, so the pair contributes `−2/p`; the induced
subgraphs that keep only one event of a prime are dominated because `R(G)` is a
down-set. **To be verified by brute force on all `2^{2K}` subsets at every level
with `2K ≤ 20`, not assumed.**

**P2 — the matching graph is feasible at every level.** With `H ≥ x²` the graph
is a perfect matching, `Z = ∏_p (1 − 2/p) > 0` for every `x`, and Shearer's
region contains the true marginals at every level with room to spare. Registered
as the prediction that the pairwise-drawn reading certifies a survivor at
`H = x²` at every level, which is `import-suen.md` §8(i)'s diagnosis restated in
the exact criterion rather than in the sufficient one. It is a wrong proof of
the twin prime conjecture and the experiment's job is to price *how* wrong.

**P3 — the complete graph is exactly the union bound.** *(Hand-derived before
the run: the only independent sets of `K_n` are `∅` and the singletons, so
`Z_{K_n[S]}(−p) = 1 − Σ_{v∈S} p_v`, minimised at `S = V`.)* Therefore
`R(K_n) = {p : Σ_v p_v < 1}` exactly, and feasibility at level `x` is exactly
`Σ_{5≤p≤x} 2/p < 1`. **Predicted consequence: the last feasible level is
`x = 11` (0.8675) and the wall arrives at `x = 13` (1.0214)**, against the map's
registered `x = 5` and `x = 7`. The map's half-claim *"the feasible boundary
coincides with the Mertens threshold"* is predicted **CONFIRMED, and as an
identity rather than a numerical coincidence**; its half-claim *"so `x = 5` is
the last feasible level and the wall arrives at `x = 7`"* is predicted
**REFUTED, by two levels**.

**P4 — where the map's `x = 5` actually comes from.** Predicted: `x = 5` is the
last feasible level of the *sufficient* asymmetric local lemma on the complete
graph, and this survives dropping the `c/q` ansatz. Registered numerically:
optimising over **all** weight vectors `(x_v)` in the asymmetric condition
`p_v ≤ x_v ∏_{w∼v}(1 − x_w)` will still fail at `x = 7` and succeed at `x = 5`,
for both the `2K`-event and the `K`-event forms. If that holds, the two levels
Shearer buys are exactly the gap between the local lemma's sufficient condition
and the exact criterion, and cost no hypothesis at all.

**P5 — the exact Shearer threshold on the true `H`-graph.** Define
`H*(x) = min{H : the true marginals lie in R(G(H))}` and
`θ_Shearer(x) = ln H*(x) / ln x`. Predictions:

1. `H*(x) = 0` for `x ≤ 11`, since the complete graph already passes there.
2. `H*(x) < x²` strictly for every `x ≥ 13`: the exact criterion certifies a
   survivor in a window **shorter than the `p²` rule**, which is a sharper form
   of import-suen §8(i)'s diagnosis than the empty-graph reading gives.
3. `θ_Shearer(x) ≥ 2/√e = 1.21306` asymptotically, and this half is a
   *proof*, not a measurement: the primes in `(√H, x]` form a clique of `G(H)`,
   a clique needs `Σ_{√H<p≤x} 2/p < 1` by P3, and Mertens turns that into
   `ln(ln x / ln √H) < 1/2`, i.e. `ln H > 2 e^{−1/2} ln x`.
4. Registered as a measurement: `θ_Shearer(x)` at `x = 13, 17, 19, 23, 29` will
   land in `[1.2, 2.0]` and will **decrease** with `x`, drifting toward
   `2/√e`. *(Hand-checked before the run at one level only: at `x = 13` the sole
   removable edge is `{5,7}`, so `H*(13) = 35` and `θ = ln 35/ln 13 = 1.386`.
   The values at `17, 19, 23, 29` are not computed.)*

**P6 — the closure, and where it can fail.** The map's closure claim is that
Shearer's tightness closes entropy compression, Moser–Tardos and resampling
oracles as a class. Registered predictions, to be adjudicated against sources
and not against memory:

1. Shearer's tightness holds as the map states it, **with the qualifier stated
   out loud**: it is a statement about the worst probability space compatible
   with a given dependency graph and given marginals. Predicted: the qualifier
   is load-bearing and the map's parenthetical *"given only the dependency graph
   and the marginals"* is doing all the work.
2. Predicted **failure mode of the closure as written**: the variable model is
   more than a graph plus marginals, and the local lemma is known to hold in it
   strictly beyond Shearer's bound. If a published theorem says so, the closure
   must be re-scoped to "no argument that uses only the graph and the marginals",
   and Moser–Tardos is *not* closed by tightness but by its own variable-model
   hypothesis, which import-suen §8 already prices as `H ≥ x#`.
3. Achlioptas–Iliopoulos, *JACM* 63 (2016) art. 22, predicted **not** to escape:
   its unstructured state space is expected to buy generality in the state
   space, not in the condition, with a convergence criterion of Shearer type on
   a causality/flaw graph. Registered as a prediction that its main theorem's
   hypothesis contains a per-flaw charge or amortised-degree condition that
   reduces to the same `Σ p < 1` shape on a complete flaw graph.

**Kill criterion, as the map wrote it.** *"If `R(G)` extends past the Mertens
threshold at any level, the family is not closed and Regts's zero-free route is
live."* Registered unchanged. Note the asymmetry this file has already exposed:
`R(G)` extending past `x = 5` is expected and is **not** the map's kill, while
`R(G)` extending past the Mertens threshold is the map's kill and is predicted
not to happen on the complete graph, because P3 makes the two the same set.

---

## 3. What would make this experiment worthless

Written down in advance, in the corpus's habit.

- If P1 fails, every table computed on the `K`-vertex reduction is about a
  different object and must be recomputed on `2K` vertices.
- If the closure adjudication is written from memory rather than from opened
  theorem statements, it repeats exactly the defect
  `history/staging/import-map-construction.md` §6 flags: Shearer's own paper was
  never read and is load-bearing for this row.
- If `θ_Shearer` is reported without saying that the underlying graph rule
  (`p ∼ q` iff `pq > H`) is a *modelling choice* of import-suen §8 and not a
  theorem, the number will be read as a bound on `G₂`. It is not one. It is a
  measurement of how badly the pairwise-drawn dependency graph over-certifies.
