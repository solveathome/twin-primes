# PRE-REGISTRATION — import 13 (hypergraph covering), row 13 of IMPORT-MAP

<!-- ledger
id: Q-import-hypergraph
status: OPEN
todo: none
question: Does hypergraph covering (Pippenger-Spencer / FGKMT) apply to the adversary's construction?
verdict: Pre-registration only, committed alone by exact filename before any producer script or report existed; source status is declared in advance, the file may not be edited after the run, and nothing here is measured.
-->

*Written 2026-08-20, BEFORE any producer script or report exists, and committed
ALONE, by exact filename, before either. The experiment is `research/IMPORT-MAP.md`
row 13, the last UNTRIED row; the record will be
`research/history/staging/import-hypergraph.md`; the producers will be
`research/import-hypergraph-01-instance.js` (the finite instance) and, if the
ledger stage needs its own run, `research/import-hypergraph-02-ledger.js`.
Nothing in this file may be edited after the run. Corrections belong in the
record, quoting this file.*

---

## 0. Source status, declared before anything is read

The two sources are the Pippenger–Spencer covering theorem, *JCTA* 51 (1989)
24–42 **[SOURCED-BIB at map construction; the statement below is MEMORY]**, and
the FGKMT hypergraph covering theorem inside *Long gaps between primes*, *JAMS*
31 (2018) 65–105, arXiv:1412.5029 **[the paper SOURCED at map level; the
covering theorem's exact hypothesis list is MEMORY]**.

**Declared rule of this experiment:** both theorem statements are to be read
from rendered page images (the Read tool on downloaded PDFs, page by page),
never from `pdftotext`, before any verdict is scored. Every hypothesis name in
this file is a *prediction about what the sources say*; the kill line K1 is
scored against the sources, not against this file's memory of them. Past
imports evaporated when the unquoted constraints were finally read, and the
standing rule applies: where the published formulation looks suboptimal for us,
assume the authors optimised and find the constraint we have not read.
**Fallback:** if neither source can be reached at page-image grade, the run
aborts, the row stays UNTRIED, and the record says so; no verdict is issued
from memory.

**Hand-derived before the run, declared (three items, all elementary):**

- **D1 (the exact marginal).** For the two-class edge
  `e_q(a) = {r ∈ V : r ≡ a or a−2 (mod q)}` with `a` uniform on `Z/q` and `q`
  an odd prime, `P(r ∈ e_q) = 2/q` **exactly, for every integer r**, because
  the two good translates `a = r mod q` and `a = r+2 mod q` are distinct when
  `q` is odd.
- **D2 (the first-moment identity).** The `a_q` are chosen independently across
  primes (the adversary's freedom, PROVEN by CRT in
  `two-class-lower-bounds.md` §1), so
  `E[#uncovered] = |V| · ∏_q (1 − 2/q)` exactly, over any set of odd covering
  primes.
- **D3 (the codegree support).** For `r ≠ r'`, `P(r, r' ∈ e_q) ≠ 0` iff
  `q | (r−r')` (value `2/q`) or `q | (r−r'±2)` (value `1/q` each); zero
  otherwise.

---

## 1. The dictionary, registered (STRONG-ANALOGY: the mapping IS the work)

| their object | our object | predicted grade |
|---|---|---|
| vertex set `V` | the stage-1 twin-slot survivors of `[1, y]`: slots `r` with `gcd(r(r+2), P(z)) = 1` after the fixed choice `a_p = 0` for `p ≤ z` | EXACT by construction |
| a (random) edge `e_i ⊆ V` | the two-progression trace `e_q(a_q) = {r ∈ V : r ≡ a_q or a_q−2 (mod q)}`, `a_q` uniform — the adversary's free translate per prime | EXACT (P-EX0) |
| vertex degree `Σ_i P(v ∈ e_i)` | `Σ_q 2/q`, **the same number for every vertex** — perfectly uniform, by D1 | EXACT (P-EX1) |
| codegree `Σ_i P(u, v ∈ e_i)` | supported on `q | (r−r')(r−r'−2)(r−r'+2)`, by D3 — sparse and small against the degree | EXACT support; smallness MEASURED (P-EX2) |
| fractional cover / near-perfect covering efficiency | the capacity ledger `Σ_q |e_q|` against `|V|`, waste priced by the coupon-collector factor | ANALOGY — this is where the theorem must earn its keep |
| edge multiset free to repeat | **one edge per prime, each prime spendable once** — a partition constraint | predicted LEAK L1 if the theorem assumes freely repeatable edges; predicted REPAIRED for free because each prime contributes exactly one independent random edge |
| their one class per prime (FGKMT's use of the theorem) | our two classes at fixed separation 2 | predicted CLASS-COUNT-AGNOSTIC (P-MEM1) — **the load-bearing memory claim**: the covering theorem's hypotheses are predicted to mention only edge sizes, degrees and codegrees, never the arithmetic shape of the edges |

**Predicted EXACT:** the marginals (D1), the codegree support (D3), and the
independence across primes (CRT). **Predicted LEAKS, named in advance:**

- **L1 (edge-size hypothesis).** Pippenger–Spencer is a statement about
  `r`-uniform hypergraphs with `r` fixed; our edge sizes are random with mean
  `2|V|/q`, unbounded across the `q`-range. Predicted: the FGKMT
  generalisation carries an edge-size bound as an explicit hypothesis and our
  instance meets it only after truncating the `q`-range or the edge, and the
  truncation cost must be priced, not waved.
- **L2 (the conclusion adds nothing at our degree scale).** At per-vertex
  degree `≍ lnln` (which is all `Σ 2/q` gives between polynomial thresholds),
  the covering theorem's conclusion is predicted to match the plain
  first-moment bound D2 to `(1+o(1))`. If so, Branch A below needs only D2 and
  Markov — the *theorem* content of the import then lives entirely in Branch B,
  and Branch A's chain is elementary on the covering side.
- **L3 (the iterated form needs structured leftovers).** The nibble/iterated
  version needs the uncovered set to stay quasi-random inside progressions.
  The one-class case (FGKMT) buys that with Maynard–Tao primes-in-APs — a
  number-theoretic input, not a covering input. The two-class analogue needs a
  LOWER bound on twin-slot survivors inside a single progression mod `q` with
  `q` near `x` — predicted to be the branch-B wall (see §2).

---

## 2. The two branches, registered

**Branch A — the row's stated target: replace the K–K reading with a theorem
chain.** The corpus's strongest lower bound, `G₂(P(y)) ≫ y ln³y (lll y)²/(ll y)⁴`,
is DERIVED HERE by substitution into Kalmynin–Konyagin's *proof* and is NOT
refereed (`two-class-lower-bounds.md` §4c; `covering-dive.md` §Q4's residual).
Branch A asks for the strongest bound whose every step is either a published
theorem read at source or elementary and written out in the record. Registered
chain: dimension-2 Selberg/Brun **upper** sieve (published; no sifting-limit
obstruction on the upper side) for `|V| ≪ y/ln²z`; D2 + Markov (elementary) for
the existence of translates leaving `≤ |V|·∏_{z<q≤x'}(1−2/q)` survivors; Mertens
(published) to evaluate the product; greedy mop-up, one prime per survivor
(elementary); the CRT identity of `two-class-lower-bounds.md` §1 to convert a
full cover into a `G₂` bound.

- **Registered prediction A1:** the chain closes at `G₂(x#) ≫ x ln x`
  (constant explicit), which is **asymptotically ABOVE the free FGKMT transfer**
  `x ln x lllx/llx` (by `llx/lllx → ∞`) and **below the K–K reading** by
  `≈ ln²x`. So the landing, if it lands, trades two logs of strength for
  refereed-source provenance — the record must say that trade out loud, and
  IMPORT-MAP row 13's payoff cell is scored against it.
- **Registered honesty note:** §4b of `two-class-lower-bounds.md` already
  *sketches* this accounting (INFERRED, ours, `y ≍ x log x`). Branch A's claim
  to a THEOREM payoff is the upgrade from sketch to a written proof with every
  constant carried and every citation at source, plus the dictionary that makes
  it an instance of the covering frame. If the written-out chain hits a step
  that is neither published nor elementary, A fails to K2.

**Branch B — the ambitious half: can the covering theorem add the
Maier–Pomerance multi-kill log unconditionally?** FGKMT's gain over Rankin is
that each large prime kills `≍ ln x` survivors, delivered by the covering
theorem plus Maynard–Tao. FKMPT Remark 7's pessimism ("only … the
one-dimensional case") is about sifting twin PRIMES; our covering target is
twin SLOTS, so primality of the covered points is not required, and the
question is genuinely open on the disk. Registered question: does the FGKMT
covering theorem, hypotheses verified for two-progression edges, extend the
two-class ledger by a log (toward the CONJ ceiling `x ln⁴x`, or at least
reproduce `x ln³x⁻` at theorem grade)?

- **Registered prediction B1: FAIL, with the wall named.** Predicted failure
  point: the multi-kill stage needs a lower bound on leftover survivors inside
  one progression pair mod `q ≍ x` over a window `y ≍ x·polylog`, i.e. sieving
  a set of size `y/q ≍ polylog` down to `z`; at that size the sieve remainder
  (`3^{π(z)}`-type, or the CRT/primorial ambient that closed row 8) swamps the
  main term at every admissible parameter choice. The record must write the
  two-constraint incompatibility out with the actual exponents, not assert it.
- **Held-headline rule, registered:** if B's ledger appears to CLOSE, the
  result is marked HELD, enters no corpus document, and waits for a dedicated
  adversarial pass. Four of five same-day integrations needed correcting within
  12 h; this would be a major claim and gets the full treatment.

---

## 3. The numeric checks, fixed here

**Registered finite instance** (producer `research/import-hypergraph-01-instance.js`):
`y = 200000`; stage-1 primes `p ≤ 13` with `a_p = 0` (so
`V = {1 ≤ r ≤ y : gcd(r(r+2), 2·3·5·7·11·13) = 1}`); covering primes
`17 ≤ q ≤ 997` (162 primes), `a_q` i.i.d. uniform on `Z/q` from a seeded
64-bit generator (seed fixed in the script header before first run); `T = 200`
trials. Predictions computed from D1–D3 and Mertens arithmetic before any
producer existed:

- density of `V`: `(1/2)(1/3)(3/5)(5/7)(9/11)(11/13) = 9/182 = 0.049451`, so
  `|V|` predicted in `[9790, 9990]` (band ±1% around 9890);
- degree: `2 Σ_{17≤q≤997} 1/q = 1.7081`;
- `∏_{17≤q≤997}(1 − 2/q) = 0.17505`, so `E[#uncovered] ≈ 0.17505·|V| ≈ 1731`.

**N1 (degree exactness, scores P-EX1).** For every `r ∈ V` and every covering
`q`: `#{a mod q : r ∈ e_q(a)} = 2`, verified by direct enumeration (not by
formula). PASS = zero exceptions over all `|V| × 162` cells.

**N2 (first moment, scores D2 and the dictionary).** Mean `#uncovered` over the
200 trials within 3 standard errors of `|V| · 0.17505`; the trial variance is
reported beside the Poisson-heuristic variance rather than assumed equal.

**N3 (codegree smallness, scores P-EX2).** Over all pairs at distance
`|r−r'| ≤ 10⁴` plus 10⁶ random pairs: report max and 99.9th percentile of
`Σ_q P(r, r' ∈ e_q)`. Registered predictions: 99.9th percentile
`≤ 0.02 × degree`; max `≤ 0.25 × degree` (driven by pairs whose difference is
`17·19·23`-smooth). The max is additionally scored against the source
theorem's own codegree threshold once that threshold has been read from page
images; this file deliberately does not guess its value.

**N4 (edge sizes, prices L1).** Mean `|e_q|` against `2|V|/q` per `q`-decade
(within 3 s.e.), max `|e_q|` reported; these are the numbers the source's
edge-size hypothesis is priced against.

**N5 (the assembled certificate, end to end).** Take the best of the 200
trials, mop up every remaining survivor greedily with one prime each from
`(997, x']`, minimal `x'`, and **replay the full cover from scratch** with an
independent routine (the §5 replay discipline). Registered arithmetic: leftover
`≈ 1731` needs `π(x') − π(997) ≥ leftover`, predicting `x' ≈ 16400`, so the
certificate reads `y / (x' ln x') ≈ 1.2`. PASS = a replay-clean explicit cover
with `y/(x' ln x') ≥ 1.0`. This is the finite-scale echo of Branch A's
`G₂ ≫ x ln x` shape; the record must also state (citing §4c) why finite scale
can never exhibit the K–K bands, so N5 is evidence about A's shape only.

**Standing constraints:** exact `G₂`/A144311 values are CITED, never
recomputed; anything past `2^53` is BigInt; no `<<` on values that can reach 32
bits of shift; outputs embedded with `node research/qc/embed.js`, never
hand-pasted.

---

## 4. The kill lines, fixed here

- **K1 (source kill — the analogy leaks at the theorem's door).** After the
  FULL hypothesis lists are read from page images: a hypothesis hard-codes
  structure the two-progression instance cannot meet at ANY parameter scale
  (an edge-size regime disjoint from ours with no usable truncation, a
  one-class/partition structure baked into the statement, a degree regime our
  `Σ 2/q ≍ lnln` can never reach), and neither paper states a variant without
  it. Verdict then: **the import dies**, row 13 → WALL-ADDRESS with the leak
  named; no THEOREM is claimed.
- **K2 (payoff kill).** Branch A's chain cannot be completed from published +
  elementary steps — e.g. the dimension-2 upper-sieve citation does not
  deliver the range used, or the cover-to-`G₂` conversion double-counts.
  Verdict then: the row banks the dictionary and the wall, grade at most
  WALL-ADDRESS; the prereg's A1 is recorded FAILED.
- **K3 (numeric kill).** N1 fails at a single cell, or N2 misses at 3 s.e.
  Then the dictionary itself is wrong and the row closes with nothing banked
  but the record. Predicted: cannot fire; if it does, the code is audited
  FIRST and the criterion scored only after the audit, so an implementation
  bug is not read as mathematics.

**Verdict grammar, fixed now, so the record cannot overgrade itself:**

- **LANDED, THEOREM** — only if Branch A is written to proof grade in the
  record (every step published-at-source or elementary-written-out), N1–N5
  pass, and no K fires.
- **LANDED, WALL-ADDRESS** — dictionary exact where claimed, but K1 or K2
  fires, or any chain step remains INFERRED. This is the honest grade for a
  mapping-is-the-work row that maps cleanly and pays less than priced.
- **REFUTED** — K3 fires and survives the code audit.
- Branch B **cannot raise the verdict** in this record regardless of outcome
  (held-headline rule, §2); it can only add a named wall or a HELD lead.

---

## 5. What would make this experiment worthless

Written down in advance, in the corpus's habit.

- Scoring K1 against this file's memory of the theorems instead of against
  rendered page images — the exact defect that produced two false findings
  here before.
- Grading THEOREM while any chain step is still INFERRED — the overgrade
  defect the last wave corrected.
- Asserting Branch B's wall from memory without writing the two-constraint
  arithmetic in the record.
- Letting the N5 mop-up reuse a prime the random stage already spent, or
  certifying the cover with the same code that built it.
- Reading the sources with `pdftotext` and calling it reading.
