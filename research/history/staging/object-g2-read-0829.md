# G₂ read, 2026-08-29: the object, its variants, its wall, its legal open set

<!-- ledger
id: Q-object-g2-read
status: PARTIAL
todo: none
question: What is actually known about G2, at what calibration, where do the corpus's documents disagree about it, and which questions about it have not been asked?
verdict: The band is unchanged: exponent 4.26645 proven above, 2 needed, and the reading found no document that moves it; what this note adds is a variant table, a legal open set for section 4, seven drift items including one live target that is TPC-strength and unlabelled, and eight unasked understanding questions.
-->

> **RIDER 2026-09-04 (orchestrator, from `recon-0904-sifting-limit-floor.md`
> and `redteam-0904-sifting-limit.md`).** §4a's last paragraph (lines ~532-534)
> reproduces Face 4's sentence and inherits its defect: "no κ = 2 extremal
> example is in print" stands (Halberstam 2003 p. 117), but lower bounds on
> β(κ) at κ > 1 ARE in print in Selberg's reciprocal convention, Brady 2017
> gives β₂ ≥ 1.8196, and β(2) ≥ 2 is immediate from the one-sided dimension
> axiom; so the sentence reads "no lower bound on β(2) above 2 is known". Also
> §8 Q2 (line ~1000): the multiplicity of the maximum is NOT unknown, it is on
> the ladder to x = 43 in `exact-g2-ladder.js` (`nmax`), `measure-g2z2-0829.js`
> and `ATTACKS3.md` §A1; only the positional half of Q2 was open, and
> `measure-0904-argmax.md` measures it.

*(Reading note, HELD, internal. Wave of 2026-08-29, one of four parallel object
reads. It computes nothing new: every number carries a pointer to the file that
produced it. Calibration markers per `CLAUDE.md`: PROVEN, VERIFIED (exact
computation), CERTIFIED, MEASURED, HEURISTIC, INFERRED, CONJECTURED, REFUTED,
OPEN. Where this note and `README.md` §Status or `research/G2-STATE.md` §0
disagree, those two win and this note is the thing to fix.)*

## 0. What is open

**The band is the whole content, and nothing in this reading moved it.**
`G₂(x#) ≪_ε x^{4.26645+ε}` is PROVEN (`paper/beta2-note.md` §1, §3), the
Gap Reformulation needs exponent 2 with a constant strictly below 1
(`research/G2-STATE.md` §1b), and the open band is `(2, 4.26645]`. The corpus
has run roughly fifty recorded passes at it and the band has not narrowed once
(`research/G2-STATE.md` §0; `README.md` §Status). Below, the best PROVEN lower
bound is `G₂(x#) ≫ x log x logloglog x/loglog x`, free by `G₂ ≥ g` plus FGKMT;
the two rungs above it are DERIVED HERE and NOT REFEREED
(`research/two-class-lower-bounds.md` §§3, 4c). Measured, the exponent reads
1.50 ± 0.05 stat on 22 trusted terms with the systematic unquantified, against
1.57 ± 0.06 on the h₂ control (`research/exponent-control.md` §5). So the
distance between what is measured and what is proven is about 2.8 in the
exponent, and the distance between what is measured and what is needed is about
0.5 in the other direction.

**The three killers, as they bite this object specifically.**

1. **The class-blind cap (killer 1, the operative one).** Every upper-bound
   argument the corpus has produced consumes exactly one property of the tile:
   that each odd prime removes two residue classes. That is a dimension-2 sieve
   hypothesis, it caps at β₂ = 4.26645 by construction, and it is blind to
   where the two classes sit. Coordinates and the exact hypothesis list are §4
   below. [PROVEN that the current bound uses only this; `paper/beta2-note.md`
   §2, §6 item 1.]
2. **The wrong quantifier (killer 2).** G₂ is a maximum over positions in one
   period. Every "almost all intervals" theorem, every ensemble statement and
   every measure-theoretic bound admitting an exceptional fraction ε decides the
   worst position only if `εW < 1`, and the corpus's own second-moment bound
   misses that by e^3025 at x = 19 read self-consistently in the window ensemble
   (`paper/wall-note.md` §2 Face 1, corrected 2026-08-27). Lemma V's mean-square
   form is PROVEN and the missing piece is named as the quantifier, not a factor
   (`research/G2-STATE.md` §5 route A).
3. **The parity floor at the finish (killer 3).** Exponent 2 with constant below
   1 is TPC-strength by the Gap Reformulation
   (`history/staging/attack-wrongdirection-audit.md` §1 Axis A, verbatim:
   `G₂(w#) = o((log w#)²)` or `≤ (1−ε)(log w#)² i.o.` ⟹ TPC). Tao's general
   parity obstruction does not name the bare tile statement, because a property
   defined by congruences alone forbids no Liouville sign pattern; it does name
   the zone form in full, because there the extension is the set of twin prime
   pairs (`paper/wall-note.md` §2 head, read at source 2026-08-27). The exemption
   is one step narrower than it looks and does not cover any route that bounds
   sums against a non-negative sieve weight.

**What this note does not do.**

- It computes nothing new. Every number carries a pointer to the file that
  produced it, and §6 lists the cheap unknowns without running them. No producer
  script was written and none was run.
- It does not close, open or re-price any route. `research/REFUTED.md` is the
  authority on what is closed and `TODO.md` on what is queued; this note edits
  neither.
- It is not a prior-art claim. Everything in §7 is checked against
  `research/PRIOR-ART.md` and `research/SEARCH-CONVENTIONS.md` first, and where
  the reading is this corpus's framing rather than an owning convention's, it says so.
- Its §8 questions are **understanding** questions. None of them is a proposed
  attack, and each was checked against `research/REFUTED.md` and against the
  full `Q-` id list of `research/QUESTIONS.md`.
- One class of check it did not run: it did not re-execute any producer to
  confirm that a quoted number matches its embedded OUTPUT block. The
  inconsistencies in §5 are all document-against-document, not
  document-against-artifact.

## 1. Definitions: every named variant of the object

**What is wrong here first: the corpus carries at least three naming defects on
this object, and one of them is a genuine definitional collision rather than a
typographical one.** They are listed under the table and repeated in §5.

| symbol | exact definition | where defined | relation to `G₂(x#)` |
|---|---|---|---|
| `G₂(x#)` | largest cyclic gap between consecutive twin slots of the tile `T_x`, a twin slot being `r` with `gcd(r(r+2), x#) = 1` | `G2-STATE.md` §1a; `paper/beta2-note.md` §1 | the object |
| `A144311(n)` | "longest sequence of consecutive integers, each ≡ 1 or −1 mod at least one of the first n primes", Carter 2008, 22 terms to x = 79 | `G2-STATE.md` §8; `U-FRAME.md` §6a | **equality**, `G₂(x#) = A144311(n) + 1`. The object is published and has been since 2008 |
| `Ĝ(s)`, `s` a real ≥ 2 | `Ĝ(s) = G₂(P(s)#)` with `P(s)` the largest prime ≤ s: `G₂` re-indexed on the integers, a step function | `attack-wrongdirection-audit.md` §3.3; `fekete-1d.md` §5 | **equality at prime arguments**, a right-continuous step interpolation elsewhere. Custody chain: Ĝ(2,4,8,16,32,64) = 2, 6, 30, 66, 348, 1080 |
| `S(s)` | `S(s) = ln(s²/Ĝ(s))`, the Overshoot slack | `fekete-1d.md` §§3, 5 | an exact reparametrisation: `S > 0` at s ⟺ `Ĝ(s) < s²` at s |
| `g(x#)`, written `h(x#)` in most tables | one-class Jacobsthal at primorials, largest gap between consecutive x-rough residues, OEIS A048670 | `G2-STATE.md` §2; `covering-dive.md` §1.1 | **`G₂ ≥ g` pointwise, PROVEN**, twin slots ⊂ holes. VERIFIED at all 22 shared terms |
| `H(r)` (literature's `h(k)`) | `max_{ω(n)=r} j(n)`, Jacobsthal maximised over all n with r prime factors; carries Iwaniec's `≪ (k log k)²` | `covering-dive.md` §1.1 (Hajdu–Saradha at source) | **no direct relation**. `H(r) = g(p_r#)` is a theorem for r ≤ 23 and FALSE at r = 24 (Hajdu–Saradha 2012), so the two must not be written as one symbol |
| `h₂(x#)` | Ziller–Morack paired Jacobsthal at primorials, OEIS A288815 = 6·A072753 + 6, 21 terms to x = 73 | `covering-dive.md` §2.1 (their Def. 2.2, read from the PDF); `GLOSSARY.md` §G₂ | **`G₂ ≤ h₂` pointwise, VERIFIED at all 21 shared terms.** The *reason* is stated two incompatible ways in the corpus: see defect (ii) below |
| free two-class | any pair `{a_p, b_p}` per prime, Resta's ILP, A072753 | `two-class-lower-bounds.md` §1 table | `≥ h₂` "up to the 6a+6 bridge", per that table; OEIS states the bridge as an identity. Both readings give `≥ G₂` |
| `Z₂(p)` | the same maximum-gap question restricted to the zone `(p, p′²)` rather than the whole tile; one number per zone | `GLOSSARY.md` §"Zone gap"; `G2-STATE.md` §1a | **not `G₂`.** Its *interior* gaps are gaps of the tile's slot sequence, so the interior part satisfies `Z₂ ≤ G₂(p#)`; the boundary convention belongs to `zonegap-01.js` |
| `M(T_x, Y)` | largest twin-slot gap of `T_x` among gaps **starting below** Y: the localized gap | `LOCALIZED-GAP.md` §3; `G2-STATE.md` §4b | `M(T_x, Y) ≤ G₂(x#)`, with equality once `Y` reaches the whole period. `M(x, x^k)` is the same object at `Y = x^k` |
| `maxsum_m` | largest sum of `m` consecutive twin-slot gaps (of `T_x`, or of the gaps starting below Y) | `localized-04-maxsum.md` §3; `G2-STATE.md` §4b | **`maxsum₁ = G₂` on the whole period, by definition.** `maxsum_m ≥ G₂` for every m ≥ 1 |
| the scan statistic | the circular scan: the maximum count of slots in a window, dual to `maxsum` by `maxsum_m + minsum_{D−m} = W` | `IMPORT-MAP.md` row 1 (Cressie 1977); `history/staging/scanstat-t37.md` | the duality is **PROVEN and NOT OURS**; `maxsum₁ = 528` over all 217,929,355,875 gaps of `T₃₇` is the exhaustive maximality certificate for `G₂(37#)` |
| `Y2(x)` | the certified greedy lower construction: the largest `[1, m]` covered by an explicit `(a_p)` with classes `{a_p, a_p − 2}` | `two-class-lower-bounds.md` §5 | **`Y2 ≤ G₂(x#) − 1` always** (each run is a certified covering), with equality PROVEN at thirteen levels x ≤ 43. The certificate ladder runs to x = 5003 |
| `θ` (the ladder's) | the window exponent `z^θ` at which the vector-sieve certificate is positive at **every** position of the period | `theta-ladder.md`; `G2-STATE.md` §7 | an upper-bound *instrument* for `G₂`: `θ < 2` would give the Gap Reformulation. Measured above 2 and rising, no visible asymptote |
| `need/z²` | the certificate's own required window as a fraction of `z²`, measured self-consistently on exhaustive full-period walks | `history/staging/theta-selfconsistent.md`; `G2-STATE.md` §7 | 0.3550 to 0.6119 at z = 13..31, all exact, all inside budget; the crossing sits in (31, 47] |
| `ρ̃_z(y)` | the H-free sawtooth potential of the Brüdern–Fouvry certificate at s = 3.0 | `history/staging/rho-maximal-law.md` §1 | RML(α): `sup_y \|ρ̃_z(y)\| ≤ C·z^α`. The pricing lemma turns any α < β₂ into `G₂(z#) ≪ z^α ln²z`, every step PROVEN except the law |
| `R_H(x)` | the H-dependent remainder of the same certificate, at the operative window | `history/staging/phase1-T4-maximal-law.md` §2 | its **sharp** Gaussian maximal law is TPC-implying and already false as literally stated (violated at z = 19 by 0.6%). `ρ̃` and `R_H` are two objects; the corpus's phrase "the sieve Gaussian maximal law" names both |
| `m₂(x)` | the mean twin-slot gap, `x#/∏(q−2) ~ e^{2γ}ln²x/(2C₂) ≈ 2.40 ln²x` | `ZONE-POSTULATE.md` §6 | VERIFIED. The normaliser in every extreme-value reading of `G₂` |
| `c₂′` | the diagonal extreme-value coefficient in `max ≈ c·m·(θ(x) − ln m)` for `G₂` | `maxgap-law.md` §4; `G2-STATE.md` §3c | **a surface `c(x, lnD)`, not a constant.** Quote it with coordinates or not at all |

**Defect (i): one object, two letters, and one of the letters is the
literature's name for a different object.** The one-class Jacobsthal at
primorials appears as `g(x#)` in `two-class-lower-bounds.md` §1 and as `h(x#)`
in `G2-STATE.md` §2's table header, and `G2-STATE.md` §2 writes
"`G2 ≥ g(x#) = h(x#)`" to reconcile them in place. Meanwhile the literature's
`h(k)`, the one carrying Iwaniec's `≪ (k log k)²`, is `H(r) = max_{ω(n)=r} j(n)`
and is a **different function**: `covering-dive.md` §1.1 records, from
Hajdu–Saradha 2012 read at source, that the identification holds for r ≤ 23 and
fails at r = 24. Nothing measured moves, since every computed level is below
r = 24, but the identity is a theorem with a known counterexample and the corpus
writes it as a definition. [PROVEN false as a definition; `covering-dive.md`
§1.1.]

**Defect (ii): `h₂` is defined two incompatible ways in the live layer, and the
corpus records both without noticing.** `covering-dive.md` §2.1, verified from
the arXiv PDF, gives Ziller–Morack's Def. 2.2: `j₂(n)` is the least m such that
every paired progression `⟨a,b⟩_m` with `2 | (b−a)` contains a coprime pair, so
the offset `d = b − a` is **one global even number** and the kill pair mod p is
`{−a, −a−d}` at that same d for every p. Under that reading `h₂` is a maximum
over even offsets, `G₂` is its `d = 2` slice, and `G₂ ≤ h₂` because 2 is one of
the offsets, which is exactly what `G2-STATE.md` §2 and
`two-class-lower-bounds.md` §1 say. But `GLOSSARY.md` §G₂, `U-FRAME.md` §6a and
`G2-STATE.md` §1a all define `h₂` as **free choice of two residues per prime**,
which is a strictly larger adversary (it permits different distances at
different primes) and is the object `two-class-lower-bounds.md` §1 lists on a
*separate row* as A072753, above `h₂`. Since OEIS gives
`A288815 = 6·A072753 + 6` as an exact renormalisation, the corpus is
simultaneously asserting that the two are the same sequence and that one
dominates the other through a bridge. **No downstream number moves**: both
readings deliver `G₂ ≤ h₂`, which is all any consumer uses. What is at stake is
whether the h₂ control measures a d = 2-free adversary or a fully free one, and
therefore what the 1.57 control exponent is an exponent *of*. [OPEN,
definitional. Settled by reading A072753's OEIS definition line and ZM Def. 2.2
side by side; not attempted here.]

**Defect (iii): "the sieve Gaussian maximal law" names two objects with
opposite verdicts.** On `R_H` at the operative window it is TPC-implying; on the
H-free `ρ̃` it is not, its win condition being α < β₂ rather than α < 2. That
was adjudicated at `attack-wrongdirection-audit.md` §3.6 and the resolution is
per-object. Any sentence about "the maximal law" that does not name `R_H` or
`ρ̃` is under-specified. [ANSWERED there; carried here because the ambiguous
phrase still appears in prose.]

**One symbol the corpus uses cleanly, recorded because it is easy to confuse.**
`maxsum₁` and `G₂` are the same number on the whole period and different numbers
on a bounded window `[0, Y)`, where `maxsum₁ = M(T_x, Y) ≤ G₂(x#)`. Every
localized reading in `localized-04-maxsum.md` is the windowed one, and
`G2-STATE.md` §3c flags that the localized `c` of 0.74 to 1.17 and the tile `c`
of 0.45 to 0.59 are the same surface at different coordinates, not two
measurements of one constant.

## 2. Proven statements, with direction

**What is wrong here first: exactly one of the statements below is refereed, and
it is not one of ours.** `β₂ = 4.26645028414864191641` is Diamond–Halberstam's,
with the digits due to Booker–Browning; the DHR Theorem 9.1 that carries it is
published. Everything the corpus derived on top of it, in both directions, is
either PROVEN-here-and-unreviewed-outside or explicitly NOT REFEREED, and two of
the three lower bounds say so on their own face
(`research/G2-STATE.md` §3a rows 6 and 7).

### 2a. The upper bound, and exactly which hypothesis it uses

> **`G₂(x#) ≪_ε x^{β₂+ε}` for every ε > 0.** [PROVEN, sieve input verified line
> by line against the primary source; `paper/beta2-note.md` §§2–3, honesty
> section §6.]

Checked against `paper/beta2-note.md` §2, the hypothesis list is exactly this
and nothing more:

1. `A = {r(r+2) : x < r ≤ x+H}`, `X = H`, `z = p_n + 1`.
2. `ω(2) = 1`, `ω(p) = 2` for odd p, `ω(d) = ∏_{p|d} ω(p)`; the two classes mod
   an odd p are distinct because `0 ≢ −2`.
3. `|A_d| = (ω(d)/d)·H + r_d` with `|r_d| ≤ ω(d) ≤ 2^{ν(d)}`.
4. Condition Ω(κ) at κ = 2 in the product form (DH Definition 1.3, eq. (1.5),
   p. 8), quantified over **all** pairs `2 ≤ w₁ < w`, which follows from Mertens
   applied to `∏(1 − 2/p)`.
5. `0 ≤ ω(p) < p`.

**The precise statement of "two classes per prime and nothing else" is: the
distance 2 between the two classes enters at exactly one place, item 2, and only
to certify that there are two of them rather than one.** Nowhere in §2, §3 or the
assembly does the value 2 appear again; the density product
`V(z) = (1/2)∏_{2<p≤z}(1 − 2/p)` depends on the *count* of removed classes, not
their positions, and the DH book's own worked example (Example 1.2, pp. 7–8) is
checked there to use "only `ω(p) ≤ g` and nothing about the polynomial". So the
theorem as proved bounds any sieve of dimension 2 with the same remainder
control, at the same exponent, whatever the two classes are. That is killer 1 in
one sentence, and it is a reading of the proof rather than a barrier theorem: §4
states what would be needed to escape it. [PROVEN as a description of the
argument; the *impossibility* of doing better inside the band is NOT proven and
no such result exists in print, `paper/wall-note.md` §2 Face 4.]

Three riders that must travel with the bound.

- **`β₂` is an upper bound on the sifting limit the DHR sieve attains, not a
  proven floor on what the sieve axioms permit.** `β(κ)` is unknown for every
  κ > 1/2 except κ = 1 (Ford 2023, quoted at source), and a κ = 2 extremal
  example is recorded ABSENT in the owning convention. Corrected 2026-08-27;
  earlier drafts read it as a floor. [`paper/wall-note.md` §2 Face 4;
  `research/SEARCH-CONVENTIONS.md` §3.]
- **The constants are inexplicit**, as in Iwaniec's own theorem, and the
  dependence of the `O((log log y)²/(log y)^{1/6})` implied constant on the
  Ω-condition constants is not explicit in anything the corpus has read.
  [`paper/beta2-note.md` §6 items 3, 4.]
- **The technique is not ours.** MO 37679 answer 52890 (zeb, 2011) already reads
  `j(x#) ≪ x^{4.032}` off a sieve's error exponent at dimension one. Claim the
  dimension-2 instantiation, never the method, and never table 4.032 beside
  4.26645. [`research/G2-STATE.md` §8.]

### 2b. Finite-level upper bounds

> `G₂(19#) ≤ 210` and `G₂(23#) ≤ 420`. [PROVEN, exact-strata re-insertion, which
> survives as a finite theorem after the route around it was CLOSED for infinite
> regress; `research/REFUTED.md`, `history/staging/attack-beta2-03-exact-strata.md`.]

Recorded because it is the only unconditional upper bound on `G₂` at a named
level that is not the asymptotic one, and because it is loose by a factor of
1.40 and 2.06 against the truths 150 and 204.

### 2c. Lower bounds, each with its status

| statement | direction | refereed? |
|---|---|---|
| `G₂(x#) ≥ g(x#)` pointwise | floor | **PROVEN, trivial, ours**; the ingredient (twin slots ⊂ holes) is one line. Absent from the literature and from both OEIS entries. VERIFIED at all 22 shared terms per `G2-STATE.md` §2 |
| `G₂(x#) ≫ x log x logloglog x/loglog x` | floor | **PROVEN**, free by monotonicity from the row above plus FGKMT (JAMS 31, 2018) via Rankin 1938 and Pintz 1997. The ingredients are refereed; the transfer is one line and is ours. Per the audit, the first lower bound of any kind for a two-class Jacobsthal function |
| `G₂(x#) ≫ x·ln x`, effective constant | floor | **PROVEN from published ingredients consumed as theorems** (K–K Corollary 1, Mertens, PNT, the CRT identity). Composition ours, adversary-confirmed at every ingredient's page image, **NOT REFEREED** |
| `G₂(P(y)) ≫ y(ln y)³(lnlnln y)²/(lnln y)⁴` for `y ≥ 10^{134.1}` | floor | **DERIVED HERE, NOT REFEREED**, and on weaker provenance than the row above: it re-derives the inside of Kalmynin–Konyagin's §2 trichotomy at `Ω_p = {a_p, a_p − 2}`, where Case 2 is empty and `\|Ω^III_p\| = 2` (verified to 10⁶). The referee gap is named: Halberstam–Richert Thm 2.2 and the Selberg remainder's ξ-versus-z condition at κ = 4 |
| `G₂(5003#) ≥ 479,340` | floor, one level | **CERTIFIED**, explicit `(a_p)` replayed by an independent routine, zero uncovered. Seventeen levels; `two-class-lower-bounds.md` §5 |

The three asymptotic floors are nested and the corpus states the nesting
correctly: FGKMT's is free, `x ln x` sits above it, and the K–K substitution sits
about `ln²x` above that. All three are **below** the measured ladder by a wide
margin and none of them constrains the upper side.

### 2d. The elementary reformulations, each PROVEN

- **The CRT collapse.** `G₂(x#) − 1` equals the maximum length of an interval
  `[1, m]` coverable by choosing, for each prime `p ≤ x`, the residue pair
  `{a_p, a_p − 2}` mod p. [PROVEN, elementary, `two-class-lower-bounds.md` §1.]
  **Not new to the repo**: `research/attack2-rankin2d.js` already records it
  under the name PAIRED.
- **The Gap Reformulation.** `G₂(x#) < x′² − 2 ⟹` Zone Postulate at x `⟹`
  (i.o.) TPC. [PROVEN, `ZONE-POSTULATE.md` §3; `G2-STATE.md` §1b.] The Zone
  Postulate's weak form is **equivalent** to TPC and its strong form is strictly
  stronger; every `G₂` bound proves the strong form, because a gap bound is
  uniform by construction.
- **Fact A.** For x ≥ 3, no two twin slots of `T_x` are 2 apart (else s, s+2, s+4
  cover every class mod 3). [PROVEN.]
- **Fact B.** Folding by p deletes exactly the classes `{0, −2}` mod p, and an
  interval of length below `p − 2` contains at most one kill. [PROVEN,
  `LOCALIZED-GAP.md` §2.] MEASURED loose by 3.5× to 6.7× at a single fold.
- **The Mirror-Sweep Lemma.** `σ(s) = W − 2 − s` conjugates the fold's deletion
  classes, so the residue-deleted maxsum family satisfies
  `Δ_m(x,p,a) = Δ_m(x,p,(w−a) mod p)` outside at most four specials, and the
  per-copy degradation curve is a palindrome. [PROVEN 2026-08-20, re-derived from
  scratch and verified exhaustively by an independent engine;
  `history/staging/attack-0c-holesweep.md` §4.]
- **The Deficit Lemma and the Traverse Bound.** `maxsum_m ≥ m·m̄·(1 − O(m/D))`
  by averaging, and telescoping the merge lemma forces
  `j ≤ x₀/(9.6 ln²x₀)` folds against the `π(x)` the route needs. [PROVEN,
  `localized-04-maxsum.md` §7.]
- **The Overshoot Budget.** Any valid chain of upper bounds ending in
  `G₂(x#) < x²` has total multiplicative overshoot capped at `x²/G₂(x#)`.
  [PROVEN as an implication, on a MEASURED input: the slack `ln(x²/G₂(x#))` reads
  0.878 to 1.182 nats across x = 11..37, flat, predicted asymptote 0.598 nats;
  `gate-multiplies.md` §5.]
- **The pricing lemma for RML.** Any `RML(α)` with `α < β₂` gives
  `G₂(z#) ≪ z^α ln²z`. [PROVEN except the law itself;
  `history/staging/rho-maximal-law.md` §2.]

### 2e. The ladder and its certificates

Fourteen exact terms in custody to `x = 43`; 22 trusted terms to `x = 79` by
adopting A144311 (`research/a144311-full-ladder.js`, 2026-08-20). Grades, which
are not uniform:

| levels | grade |
|---|---|
| `x = 37` | **EXHAUSTIVE maximality certificate here**: `maxsum₁ = 528` over all 217,929,355,875 gaps of `T₃₇`, from a scan-statistic engine sharing no code with either exact-ladder producer. The strongest custody fact on the ladder, because it certifies the maximum over the whole tile rather than agreeing with a published term. [`history/staging/scanstat-t37.md`] |
| `x ≤ 43` | computed here, `31#` by the segmented method, `41#` and `43#` each twice on disjoint natal masks; and independently in A144311 by a branch-and-bound sharing no method. Agreement is a check on both sides, so these are recomputations, not new values |
| `x ≤ 43` | additionally, the repaired greedy attains `G₂ − 1` exactly at thirteen levels, and at `x = 43` reaches the optimum 617 at the uniform R = 2048 budget (14 of 14 sealed-scope exact) |
| `x = 47..53` | A144311, Alekseyev 2009. Literature grade, single effort |
| `x = 59..79` | A144311 a(17)–a(22), Wang 2024. Literature grade, single effort, and the doubling chain's `Ĝ(64) = 1080` rests on a(18) alone |

**No level above 43 has been reproduced here**, and the corpus says so: the
greedy oracle, exact at 14 of 14 sealed-scope terms, matches the published optima
at only 1 of 8 over `x = 47..79`, with slope −0.0235 ± 0.007 per level, which
CLOSED it as an exact solver past `x ≈ 53` [`research/REFUTED.md`;
`history/staging/greedy-oracle-validation.md`]. The corpus reads that as the
greedy failing, which is the right reading given the budget model, but it leaves
the eight literature terms uncorroborated inside this repository.

## 3. Measured laws

**What is wrong here first: not one of the numbers below is a proof, and one of
them is provably an artefact of its own estimator.** The exponent's estimator
returns 1.282 when run on 58 terms of an object whose true exponent is 1, with
white residuals and no drift, so a clean power-law fit at these sizes carries no
evidence about an asymptotic exponent (`research/exponent-control.md` §§1–2).
Every reading here is quoted with its n and its artifact, and the house rule is
that any ladder exponent travels beside the control line: *58 terms, true
exponent 1, measured 1.282 ± 0.008, no drift.*

### 3a. The exponent

| reading | n, range | value | artifact |
|---|---|---|---|
| raw log-log fit, `G₂`, x-frame | 20 fitted points, x ∈ [5, 79] | 1.777 ± 0.029 nominal, **and the standard error is worthless** | `exponent-control.md` §5 |
| control-corrected, `G₂` | same, bias read at matched width 20 | **1.50 ± 0.05 stat, systematic unquantified** | `exponent-control.md` §5 |
| control-corrected, `h₂` | 19 terms, x ∈ [5, 73] | **1.57 ± 0.06 stat** | `exponent-control.md` §5 |
| θ-frame corrected, `G₂` / `h₂` | same | 1.43 / 1.49 | `exponent-control.md` §5 |
| certificate ladder | 16 levels to x = 4001 | 1.11 to 1.25, **falling with range** | `two-class-lower-bounds.md` §5 |
| hard floor | — | **≥ 1, PROVEN** via `h₂ ≥ h` and exponent(h) = 1 + o(1) | `exponent-control.md` §3 |

**Why the raw fit cannot be trusted, stated as the corpus states it.** The
control's bias grows and then sticks: +0.262, +0.267, +0.280, +0.282, +0.283 at
window widths 10, 12, 19, 21, 30, while the scatter collapses by a factor of
three [MEASURED, 58 terms of A048670]. The estimator converges, and it converges
to 1.28. On the same data the pure power law beats the family containing the
truth by 47 AIC units with white residuals (27 sign runs against 28.5 expected,
lag-1 autocorrelation 0.118) and its exponent is wrong by 0.28. On nineteen terms
of `h₂` the models `c·p^{1.847}` and `c·p·log^{2.448}p` are separated by **0.1
AIC units** while differing by `x^{0.85}` in the limit. [All
`research/exponent-control.md` §§1–2.]

**Exponent 2 is disfavoured by one-sidedness, not by a standard error.** The
control's bias is positive in all 40 windows, minimum 1.197, because a positive
power of log inside the truth biases a finite-range power fit upward; nothing
about the two-class object suggests a negative log power, so the true exponent
lies **below** the raw 1.777. [MEASURED + INFERRED, `exponent-control.md` §3.]

**The residual 0.2 between the trusted ladders (1.50) and the certificates
(≈ 1.29 once the greedy's own downward bias is added back) is unexplained**, and
`G2-STATE.md` §6.1 rules it not worth chasing: every reading, corrected or raw,
sits below 2 and above 1. A third of the gap is priced as a certified
lower-bound ladder's downward bias of about 0.09 at a 28% terminal shortfall,
against a +0.04 upward from the short ladders' own prefix effect
[`h2-scoping.md` §5b].

### 3b. Per-fold growth

The right budget for a per-fold multiplier `c(p) = G₂(p#)/G₂(p_prev#)` is
`ln c(p) ≤ 2 ln p/p`, obtained by differentiating the partial-sum condition
rather than dividing it by π(u) [PROVEN, `gate-multiplies.md` §7]. Against it:

- this corpus's ladder, folds p = 7..37: `ln c/sharp` = 1.65, 0.77, 1.15, 1.48, 1.06, 1.13,
  1.01, 1.35, 2.14 [MEASURED, 9 folds, `gate-multiplies.md` §7];
- Ziller–Morack's 21 exact terms, folds p = 41..73: 1.39, 0.97, 1.36, 0.75, 1.15,
  1.10, 1.18, 1.00, 0.61, **mean 1.06** [MEASURED, 9 folds, same section].

> **The multiplier spends 77% to 214% of its sharp budget and is not trending
> down**, on both ladders, with no exponent fit entering the reading. Read
> instead against the softer `2 ln²p/p` the same folds spend 30% to 85%, which is
> where the impression of a falling trend came from, and that softer budget is
> REFUTED as sufficient (TODO 0b as stated is false by a factor `ln u`;
> `research/REFUTED.md`).

The asymptotic headroom is `α/2` and nothing else: 100% of budget at α = 2, 75%
at the calibrated 1.50, 65% at the bottom of the bracket. So whether headroom
exists asymptotically **is** the exponent question. [INFERRED from a PROVEN
identity, `gate-multiplies.md` §7.]

### 3c. The extreme-value law, and `c` as a surface

`max ≈ c·m·(θ(x) − ln m)`, tested against every exact value that exists:

| c | object | terms | range | mean | cv | range |
|---|---|---|---|---|---|---|
| `c₁` | one class, A048670 | 46 | x ∈ [11, 229] | 0.3718 | 7.2% | [0.3359, 0.4873] |
| `c₂` | free two-class, A288815 | 17 | x ∈ [11, 73] | 0.8511 | 7.3% | [0.7784, 1.0157] |
| `c₂′` | `G₂` | 8 | x ∈ [11, 37] | 0.4814 | 10.2% | [0.4463, 0.5939] |

[MEASURED, `two-class-lower-bounds.md` §6.] On the diagonal over all 20 exact
terms to x = 79, `c₂′ = 0.4983`, cv 7.4%, trend `(ln x)^{+0.227}`
[`G2-STATE.md` §6.2].

> **`c` is a surface `c(x, lnD)`, and the constancy on the diagonal is a
> cancellation rather than a law** [MEASURED, and it REFUTES any universal `c`;
> `maxgap-law.md` §4]. At fixed x = 29, cutting one exact period into blocks and
> growing `lnD` makes `c` fall monotonically 1.083 → 0.446. At fixed `lnD ≈ 11`,
> growing x makes it rise 0.577 → 0.989 over x = 23..6421. The off-diagonal
> exponents predict a 32% fall along the diagonal leg x = 101 → 271 where the
> exact terms deliver a 2.5% rise.

**Report `c` with its coordinates `(x, lnD, lnD/θ(x))` or do not report it.** The
localized files read 0.74 to 1.17 and the exact tiles read 0.45 to 0.59 for the
same object; on matched statistics both spreads are ±22.5%.

**The best single description of the ladder** is `G₂(x#) ≈ 0.76 x ln²x lnln x`
over x = 11..79, two significant figures and not three, with
`G₂(x#) = x ln^{2+o(1)}x` and the o(1) positive. The claim that two independent
instruments agreed on this is **REFUTED**: the exact frame cancels out of every
reported offset, so the diagonal is the same comparison in a sharper error bar
rather than a second witness. The AICc exclusions 31.8 and 10.6 must not be
quoted either. [`G2-STATE.md` §6.2; `history/staging/redteam-2026-08-18.md`
§§1–2.]

### 3d. The doubling data

`Ĝ` on the base-2 chain, custody plus one literature term:

| s | 2 | 4 | 8 | 16 | 32 | 64 |
|---|---|---|---|---|---|---|
| `Ĝ(s)` | 2 | 6 | 30 | 66 | 348 | 1080 |
| `Ĝ(2s)/Ĝ(s)` | 3.0000 | 5.0000 | 2.2000 | **5.2727** | 3.1034 | — |

[VERIFIED at `history/staging/attack-doubling-01.md` §1, independently re-derived
at `redteam-0820-night-proofs.md` §2b and again in
`attack-wrongdirection-audit.md` §3.3.] The sup 5.2727 = 348/66 sits at s = 16,
on the chain, so `log₂ C₂ ≥ 2.3985 > 2`: no provable doubling constant is
TPC-implying through the all-s slice. `Ĝ(64) = 1080` rests on A144311 a(18),
literature grade, and the next chain datum is `G₂(127#)`, out of reach.

A second measured reading beside it, and it is a hardness signal rather than a
result: `C₂` shows no drift while the a-priori per-step bound `K*` drifts up,
`ln(K*+1)` slope 0.6881 ± 0.1328, and an a-priori `K*` bound is itself "the
entering primes' two-class covering-run problem on the level-s slot sequence, the
same two-class Jacobsthal problem one level up" [MEASURED + self-similarity
observation, `attack-doubling-01.md` §3, quoted at
`attack-wrongdirection-audit.md` §3.3].

### 3e. Two ratio readings that are often quoted and should not travel alone

- **`G₂/g` drifts slowly upward.** The 14-term reading "peaks at x = 37 and then
  falls twice, no trend established" was an artefact of the data ending at 43;
  on the full trusted ladders seven of the eight terms x ≥ 53 sit above the old
  8.00 peak and the maximum moves to the last term, 8.55 at x = 79. [MEASURED,
  `research/external-ladders-01.js`, reported `G2-STATE.md` §2.]
- **`G₂/x²` is flat on the exact terms**, slope +0.05 ± 0.11 over eleven exact
  terms with the instrument sharp at 11.6σ on its control [MEASURED, `TODO.md`
  1d]. On the certificate ladder `Y2/x²` falls by a factor 20.1 monotonically
  while `Y2/(x ln²x)` rises by only 1.21, so the construction is `x·polylog`
  [MEASURED, `G2-STATE.md` §5a]. Those two are not in tension: the first is the
  object, the second is a lower certificate whose fidelity degrades with level.
- **The zone margin `x′²/G₂` is flat over the whole computed ladder**, minimum
  3.18 at x = 37; on `h₂` the same margin against `p_{n+1}²` is flat at about
  2.2 over nineteen terms, slope +0.018 ± 0.045 on [23, 73] [MEASURED,
  `exponent-control.md` §6]. Flat margin is budget, never evidence
  (`TODO.md` §THE TARGET).

## 4. The wall on G₂, and the legal open set

**What is wrong here first: the corpus's own ranked list of "what would count as
progress" contains an entry that is TPC-strength and is not labelled as such.**
`research/ZONE-POSTULATE.md` §8 item 4 and `research/G2-STATE.md` §9 item 4 both
read "a proof that the window/`G₂` ratio is unbounded, which is weaker than route
A". It is weaker than route A, and it is **not** weaker than TPC: `x′²/G₂`
unbounded means `G₂(x#) ≤ ε·x′²` for infinitely many x at every ε, hence
`G₂(x#) < x′² − 2` at infinitely many x, hence the Zone Postulate at infinitely
many x, hence TPC by `ZONE-POSTULATE.md` §2's forward direction. That is verdict
**(ii)** on the audit's scheme, and it matches Axis A verbatim
(`≤ (1−ε)(log w#)² i.o. ⟹ TPC`). The item was not among the ten the
wrong-direction audit tested, so nothing has flagged it. [PROVEN as an
implication, one line, from statements the corpus already holds. §5 carries the
file:line pair.]

### 4a. Killer 1: what every argument so far has used

**The property consumed, stated exactly.** Reading `paper/beta2-note.md` §2 and
§6 against the rest of the upper-bound corpus, every upper-bound argument the
programme has produced consumes one or more of the following, and nothing else:

| P1 | **the class count.** Each odd prime removes exactly two residue classes; `ω(p) = 2`, `ω(2) = 1`. This is the whole input to β₂: the distance 2 appears once, to certify `0 ≢ −2` so that there are two classes and not one |
| P2 | **the density product** `V(z) = (1/2)∏(1 − 2/p) ≍ 1/log²z`, which is a function of P1 alone |
| P3 | **per-divisor remainder control**, `\|r_d\| ≤ ω(d) ≤ 2^{ν(d)}`, again a function of P1 |
| P4 | **the constant shift**: twin slots are `S₁ ∩ (S₁ − 2)`, so the two classes sit at distance exactly 2. Used by Fact A, Fact B, the Mirror-Sweep Lemma, the covering economy and the greedy |
| P5 | **an L¹ count over positions**: the union bound over the period, the Möbius term count `3^{π(x)}`, the Level Ledger majorant |

**What each buys, and where it stops.**

- **P1–P3 alone cap at 4.26645 by construction.** The bound is class-blind: it
  proves the same exponent for any dimension-2 sieve with the same remainder
  control, whatever the two classes are, so it is really a bound on the free
  two-class adversary and pays that adversary's price. [PROVEN as a reading of
  the proof, §2a.] The corpus's own summary agrees: "any argument that uses only
  'two classes per prime' is a dimension-2 sieve statement and caps at 4.26645 by
  construction" (`README.md` §Status).
- **P4's three uses at the anchor are tested and all three return nothing.**
  Mirror symmetrisation gains **exactly 0** and the zero is structural, not
  empirical, since `σ(K_q(a)) = K_q(w−a)` is a one-line theorem; the ensemble
  does not localise; and the QR-immune classes at the quadratic point deliver
  exactly the guardrail's `r/(r−2)` and nothing past it, pre-registered with a
  matched control that voided a 6.5σ surplus. [`research/REFUTED.md`, rows on
  mirror symmetrization and the QR refinement.]
- **P4 on the covering side dies at `x = 13`**, where `Σ 2/p` crosses 1, and
  `β_pure` diverges like `7.182 lnln x` (7.19 until the root was corrected 2026-08-29); the exact head reaches only
  `x₀ = O(ln x)`, so no exponent moves. [`research/REFUTED.md`;
  `sift-limit-attack.md` §7.]
- **P5 is provably the sharp instrument, not a lossy one.** The `ℓ¹ → ℓ²√log`
  conversion **is** the sharp maximal law: `‖Θ·S_H‖₂ = rms(R_H)` exactly, and its
  true constant (0.56–0.92) sits below the TPC line (1.36–2.23). Generic chaining
  is worse: the entropy integral of the true metric already exceeds the union
  bound at every level, 1.04–1.10×, so chaining's ceiling sits below the union
  bound's floor. [`research/REFUTED.md`; `history/staging/import-l1l2.md`,
  `import-chaining.md`.]

**What an argument would have to use beyond P1–P5.** Three constraints, each
proven or measured somewhere in the corpus, and together they say what the shape
of a winning argument is:

1. **It must survive the sieve's first discard point.** The entire distance from
   4.2665 to 2 is a positivity problem and zero percent a distribution problem:
   distribution hypotheses (EH, GRH, bilinear inputs) enter the dimension-2 sieve
   at exactly one of its five discard points and the primorial formulation
   already saturates that point for free, so a perfect distribution oracle moves
   the exponent by nothing. The programme's own exact structure, the correlation function, the
   sub-Poisson window variance, the mod-30 rigidity, the mirror, the fusion
   identity, is quotiented away at the first discard point, where the sieve
   reduces the set to divisor counts. [Analysis of the method, marked as such at
   `paper/wall-note.md` §2 Face 4.]
2. **It must be positional, not ensemble.** The tile's transform vanishes
   nowhere and its dependency graph is complete, so no ensemble statement
   localises; one shared uniform residue draw defeats every local neighbourhood,
   which is what kills the whole concentration family and the whole local-lemma
   family. A measure-theoretic bound decides the anchored position only if
   `εW < 1`, and the corpus's best miss that by e^3025 at x = 19 in the window
   ensemble. [`README.md` §Status; `paper/wall-note.md` §2 Face 1;
   `research/REFUTED.md`.]
3. **It must not be an L¹ count over positions**, by the ℓ¹→ℓ² closure above.

**And the one thing that is NOT proven, stated so it is not mis-cited.** There is
no barrier theorem, in this corpus or in print, saying an axiom-only argument
cannot do better inside `(2, 4.26645]`. `β(κ)` is unknown for every κ > 1/2
except κ = 1, no κ = 2 extremal example is in print, and the programme's one
barrier statement (`β_interval(2) ≥ 2` on Granville's Siegel-zero hypothesis)
sits **below** the band, at the point where it begins. [`paper/wall-note.md` §2
Face 4, corrected 2026-08-27; `history/staging/attack-barrier-kappa2.md`.] So
killer 1 is a description of every attempt so far, not an impossibility result.

### 4b. The legal open set

Statements about `G₂` that are (a) not proven, (b) not TPC-strength on the
wrong-direction audit's axes, and (c) not in `research/REFUTED.md`. Verdicts use
the audit's scheme: **(i)** strictly weaker than TPC, legitimate stepping stone;
**(ii)** TPC-strength; **(iii)** undetermined. Only (i) and (iii) belong in a
legal open set; the (ii) rows are listed at the end so they are not mistaken for
members.

**(i) Legal.**

| # | statement | argument, one line | status |
|---|---|---|---|
| L1 | any unconditional `G₂(x#) ≪_ε x^{α+ε}` with `α ∈ (2, 4.26645)` | separation is exhibited rather than modelled: `α = 4.26645` is PROVEN while TPC is open, and both bridges transition at 2 and nowhere else | audit target 10, verdict (i); `TODO.md` item 0 |
| L2 | `RML(α)`: `sup_y \|ρ̃_z(y)\| ≤ C·z^α` uniformly in z, any `α < β₂` | the pricing lemma is PROVEN except the law, and its win condition is `α < β₂`, not `α < 2`; the `ρ̃` form forfeits the lag-H cancellation, which is exactly why it is legal | `rho-maximal-law.md` §§1–2; audit §3.6(b) |
| L3 | `Ĝ(2s) ≤ C₂·Ĝ(s)` **for all s**, any `C₂ < 19.2455` | custody forces `C₂ ≥ 5.2727`, so `log₂C₂ ≥ 2.3985 > 2` and the slice's own conclusion can never reach limsup < 2 | audit §3.3, verdict (i) as written |
| L4 | (H-sub-pow) with an **unnamed** K, giving existence of `β = lim ln G₂/ln x` | `f(n) = 2 ln n` satisfies it at K = 0 and yields β = 2, on which TPC is undecided | audit §3.5; `TODO.md` 1d |
| L5 | (H-sub-pow) with an **explicit** `K` in the legal zone | `K ∈ [1.3946, 11.3568)` trusted gives `β < β₂` with no TPC content; the floor sits at base 66 and the ceiling at base 82, and the single-base pairing `(ln 66 + K)/ln 16` that produced the superseded `[1.3555, 7.6394)` must not travel with the corrected zone (`hsubpow-explicit-K.md` §2; corrected per redteam-0829-objects-gb.md §2 E1). **The explicit-K route is CLOSED for three named mechanisms** (`hsubpow-explicit-K.md`); the statement stays legal and unproven by a fourth | `TODO.md` 1d |
| L6 | **any** improvement of the lower bounds: refereeing the K–K substitution, running Maier–Pomerance's ledger at κ = 2 to a proof, extending the certificate ladder | a lower bound on `G₂` is compatible with TPC being false, so no statement in this family can be TPC-strength. This is the one wholly safe direction on the object | `two-class-lower-bounds.md` §§4b, 4c, 5 |
| L7 | `G₂(x#) ≪ g(x#)·(ln x)^A` for some fixed A ≥ 0 | with Iwaniec/Vaughan's `g(x#) ≪ x²` (inexplicit constant) this would give `G₂ ≪ x²ln^A x`, above 2 and hence carrying no TPC content by Axis A, while being **below 4.26645** and therefore an improvement of the proven exponent. Three independent routes in the corpus say the second class is worth exactly one logarithm (`G2-STATE.md` §3d), which is the conjectural `A = 1` | **not asked**: no `Q-` id in `research/QUESTIONS.md` poses a `G₂`-to-`g` transfer, and `REFUTED.md` closes no such row |
| L8 | the exact value `G₂(47#)`, or an exhaustive maximality certificate at any level 41 ≤ x ≤ 79 | a finite computation, decidable by enumeration, hence not an infinitude statement | `TODO.md` item 1 prices the arithmetic ceiling at `W = 1.308e16 > 2^53` |
| L9 | whether `G₂ ≤ h₂` is strict from some level on, and the law of `h₂/G₂` | a comparison of two finite ladders; measured 1.63–1.81 at x = 47..73 with a low outlier 1.341 at x = 37 | `G2-STATE.md` §2 |
| L10 | whether the corpus's `h₂` is the offset-max object or the free-per-prime object (defect (ii) of §1) | a definitional reading of two published definitions; no theorem depends on the answer, only the interpretation of the 1.57 control | **not asked**: no `Q-` id in `QUESTIONS.md` |

**(iii) Undetermined.**

| # | statement | why it is undetermined |
|---|---|---|
| U1 | whether `sup/sd` stays bounded in the two-class discrepancy channel `ΔΦ₂` | the corpus holds the ×2 and ×3 Möbius-count ceilings and the measured ×1.8356 per fold, but **no bridge from `ΔΦ₂` to `G₂` exists in the corpus**, so whether a bound there is TPC-strength cannot be read off. `G2-STATE.md` §9 item 7 poses it without the label |
| U2 | whether `G₂(x#)/x²` **falls** (as against tends to 0) | falling monotonically is legal and decidable-looking; falling **to zero** is verdict (ii) by Axis A. `TODO.md` 1d and `Q-g2-falls-decision-rule` (PARTIAL) do not separate the two, and the measured slope is +0.05 ± 0.11 over eleven exact terms, consistent with flat |
| U3 | whether the diagonal cancellation that makes `c` look constant is exact or a coincidence of the reachable range | if `c` is bounded above on the diagonal then `G₂ ≪ x ln²x`, exponent 1, which is far stronger than TPC, so the *upper* half of this is (ii) and the *lower* half and the mechanism are legal. `maxgap-law.md` §4 states the surface, not the bound |

**(ii) TPC-strength, listed so they are not mistaken for legal targets.**

- `x′²/G₂` unbounded, or `G₂ = o(x²)`, or `G₂ ≤ (1−ε)x′²` i.o., **including
  `ZONE-POSTULATE.md` §8 item 4 and `G2-STATE.md` §9 item 4 as written**, which
  currently carry no label.
- the extreme-value law read as an **upper bound**: `G₂ ≤ C·m₂·(θ(x) − ln m₂)`
  gives exponent 1.
- `Ĝ(2s) ≤ C₂Ĝ(s)` in the **eventual** form with `C₂ ∈ (3.1034, 4)`: the trap
  window, 0.254 nats, and no computation will ever close it since the next chain
  datum is `G₂(127#)` (audit §3.3).
- (H-sub-pow) with explicit `K < 1.3946` trusted / `< 1.3555` custody
  (`TODO.md` 1d; note the audit §3.5 states the superseded numbers, §5 below).
- the sharp Gaussian maximal law on `R_H` at the operative window
  (`phase1-T4-maximal-law.md` §2), which is additionally already false as
  literally stated, violated at z = 19 by 0.6%.

## 5. Inconsistencies found

Seven items. Expected output: the corpus runs to roughly 420 notes and drift is
normal. **None of them moves a proven statement**, and that is the first thing to
say; five are staleness or label collapse inside a file that also carries the
corrected number, one is a missing label on a live target, and one is a genuine
definitional collision.
The ranking is by what a reader would get wrong, not by size.

**(1) A live target is TPC-strength and carries no label.** [Most consequential.]

- `research/ZONE-POSTULATE.md:526`: "A proof that the window/G₂ ratio is
  unbounded, which is weaker than route A but would show the Gap Reformulation is
  not asymptotically self-defeating."
- `research/G2-STATE.md:1212`: "**4. Prove that window/G2 is unbounded.**
  `ZONE-POSTULATE.md` §8 item 4. Strictly weaker than route A".

Against `history/staging/attack-wrongdirection-audit.md:47` (Axis A, verbatim):
"`G₂(w#) = o((log w#)²)` or `≤ (1−ε)(log w#)² i.o.` ⟹ TPC". `x′²/G₂` unbounded is
exactly `G₂ ≤ ε·x′²` i.o., so the item implies TPC. Both files describe it as a
modest sub-goal. The audit tested ten targets and this was not among them, so
nothing has caught it. [PROVEN as an implication; §4 carries the one-line
argument. Fix is a label, not a deletion: the item is still worth wanting, it is
simply not cheap.]

**(2) `h₂` is defined two incompatible ways in the live layer.** Detailed at §1
defect (ii).

- `research/GLOSSARY.md:278`: "The adversarial version, where each prime may
  choose its class pair freely, is Ziller and Morack's h₂, OEIS A288815."
  Same reading at `research/U-FRAME.md:579-580` ("the ADVERSARIAL paired Jacobsthal, the
  maximum over ALL choices of two residues per prime") and `research/G2-STATE.md` §1a.
- `research/two-class-lower-bounds.md:80`: "`h2(x#)` | Ziller-Morack paired
  Jacobsthal, **worst over even offsets**, A288815", with **free 2-class** listed
  on the next row (`:83`) as A072753, dominating `h₂`.
- `research/covering-dive.md:56` reads ZM's Def. 2.2 from the PDF and gives the
  offset reading: `j₂(n)` quantifies over paired progressions `⟨a,b⟩_m` with
  `2 | (b−a)`, so the offset is one global even number, not a per-prime choice.

OEIS states `A288815 = 6·A072753 + 6`, an exact renormalisation, so the corpus
simultaneously says the two rows are one sequence and that one dominates the
other. No downstream number moves; what is unresolved is what the 1.57 control
exponent is an exponent of. [OPEN, definitional.]

**(3) The certificate ladder's top rung is stale in three places inside
`G2-STATE.md`, against `G2-STATE.md`'s own §5a.**

- stale: `research/G2-STATE.md:421` "lower bound, best constructed | **356,712 at
  x = 4001**"; `:1026` "certified greedy ladder | ... | x ≤ 4001, **16 levels**";
  `:1148` "the certified G2 lower-bound ladder to **x = 4001, sixteen levels**".
- current, same file: `research/G2-STATE.md:919` "| 5003 | **479,339** | 0.01915
  | 1.3206 | — (new rung) |".
- source: `research/two-class-lower-bounds.md:975` "lower, best constructed here |
  `G2(5003#) >= 479,340`"; `:1100` "a certified `G2` lower-bound ladder to
  `x = 5003`, **seventeen levels**".

[Staleness, not contradiction: the §3a row and the §8 row were not updated when
§5a gained the rung. The 356,712/356,711 pair is not an error, one is the
covering length, the other `+1` is the `G₂` floor it certifies.]

**(4) The wrong-direction audit's 1d landing zone is superseded by TODO's.**

- `history/staging/attack-wrongdirection-audit.md:82` and `:250`: legal zone
  `K ∈ [1.3555, 7.6394)`, trap floor 0.9694 to ceiling 1.3555, "0.386-nat
  sliver ... against a 6.28-nat legal band".
- `TODO.md:366`: "the trusted legal zone is `K ∈ [1.3946, 11.3568)`, **not** the
  `[1.3555, 7.6394)` this item used to state" (CORRECTED 2026-08-28,
  `hsubpow-explicit-K.md`).

The audit is a HELD staging note dated 2026-08-26 and TODO records the
supersession explicitly, so the live layer is right; the note is not marked. The
custody-versus-trusted split behind the two ceilings is set out at
`history/staging/fekete-1d.md:114–116` and is not itself a defect: 1.3946 rests
on Wang 2024's a(18) and 1.3555 on `G₂(13#) = 66`. [Staleness in a HELD note.]

**(5) Three different shared-term counts for the same two pointwise relations.**

- `research/G2-STATE.md:365`: "`G2 ≥ g(x#) = h(x#)` (PROVEN, VERIFIED at all
  **22** shared terms)"; `:375`: "`G2 ≤ h2(x#)` (VERIFIED at all **21** shared
  terms, to x = 73)".
- `research/two-class-lower-bounds.md:84`: "**VERIFIED** at all **eleven** shared
  terms" for `G2 ≥ g`, with the eleven ratios printed.
- `research/exponent-control.md:151`: "**G2 ≤ h2 pointwise**, verified at all
  **12** shared terms".

The lower counts predate the 2026-08-20 adoption of A144311's 22 trusted terms
and both are in live files. Nothing is wrong at any count, since a relation
verified at eleven terms is verified at eleven terms; the defect is that a reader
comparing the two live files sees two different evidence bases for one relation.
[Staleness in the live layer.]

**(6) `paper/beta2-note.md` is one ladder term behind the object.** Its §1 lists
the exact terms "for `pₙ = 2, …, 41`" (thirteen) and its §5 sanity check is "at
the largest computed level (`pₙ = 41`)", while `G2-STATE.md` §2's custody ladder
runs to `G₂(43#) = 618`, fourteen terms. The note's §5 already carries one
in-place correction for the 37 → 41 move and its numerical conclusion is
unaffected (the slack widens further at 43). [Staleness in a paper draft under
moratorium.]

**(7) Two conjectural truths for `G₂`, in one file and propagated into
`G2-STATE.md`.**

- `research/two-class-lower-bounds.md:979`: "lower, conjectural truth |
  `x (log x)^{3+o(1)}` | CONJ".
- `research/two-class-lower-bounds.md:401` (the §4c ledger, immediately after
  the table whose two-class total reads "**4 (CONJ); 3 unconditional**"): "the
  conjectural two-class ceiling is **`G₂(x#) = x (log x)^{4+o(1)}` (CONJ)**, one
  log above the unconditional floor".
- propagated: `research/G2-STATE.md:423` "lower bound, conjectural truth |
  `x(log x)^{3+o(1)}`" and `:434` "conjectural shape | `G2(x#) =
  x(log x)^{3+o(1)}`".

The reconciliation is that 3 is the ledger's unconditional total and 4 is the
total with Maier–Pomerance's conjectural multi-kill row, so the rows labelled
"conjectural truth = 3" have collapsed the two. Both are `x^{1+o(1)}` and
nothing downstream turns on it, but a reader taking `G2-STATE.md` §3a at face
value gets the unconditional number under a conjectural label. [Staleness /
label collapse.]

**Where the reading looked and found nothing.** The exponent readings 1.50 /
1.57 / 1.777 / 1.11–1.25 are quoted identically in `README.md` §Status,
`research/G2-STATE.md` §§0, 3a, 6.1, `research/exponent-control.md` §5,
`research/GLOSSARY.md` §G₂, `research/THE-DIALS.md` and `paper/beta2-note.md` §5,
with the same n and the same control line in each. β₂'s twenty digits agree
between `paper/beta2-note.md` §2 and `research/G2-STATE.md` §3a. The ladder's
fourteen exact terms agree between `G2-STATE.md` §2, `GLOSSARY.md` §G₂ and
`paper/beta2-note.md` §1 term for term. The doubling ratios agree across
`attack-doubling-01.md` §1, `redteam-0820-night-proofs.md` §2b, `TODO.md` D and
`attack-wrongdirection-audit.md` §3.3. `REFUTED.md` holds exactly 67 rows and
`QUESTIONS.md` exactly 392 distinct `Q-` ids, matching `README.md` §Status and
the brief. **No document-against-artifact check was run**: this note did not
re-execute a producer to confirm that a quoted number matches its embedded OUTPUT
block, so every item above is document-against-document only.

## 6. Cheap unknowns

**What is wrong here first: none of these was run.** The brief permitted running
only a measurement decisive for §4 or §5 and costing under about twenty minutes;
the one candidate that is decisive for §4 (C1) needs a matched control to avoid a
confound this corpus has already been bitten by once (the `M_p` field's raw twin
contrast 0.155-vs-0.764 was confounded until non-twin pairs matched on predicted
`M` were built, `G2-STATE.md` §0), and building that control is not a
twenty-minute job. So this section is a specification, not a result, and nothing
below carries a number that did not already exist.

Ranked by what the answer would say about the wall. Each row names the grep that
shows it has not run, and its verdict on the wrong-direction audit's scheme.

**C1. Is `G₂` generic among two-class configurations at matched level?**
[verdict **(i)**: a percentile carries no infinitude content.]

The measurement §4a asks for. Killer 1 says every upper-bound argument discards
the class *positions* and keeps only the class *count*. Nothing in the corpus
measures what those positions are worth. Specification, with the confound named:
by the CRT collapse `G₂(x#) − 1` is already a **maximum over the shift ensemble**
`(a_p)`, so comparing it to a single random configuration is not a comparison at
all. The matched control draws an offset vector `(d_p)` with each `d_p` even and
`d_p ≠ 2`, takes the same maximum over shifts using classes `{a_p, a_p − d_p}`,
and places `G₂ − 1` in the resulting distribution. The greedy oracle is the right
instrument for the maximisation, exact at 14 of 14 sealed-scope terms to `x = 43`
(`greedy-oracle-validation.md`), and its budget schedule is already tuned.

- **What it decides.** If `G₂` sits at a typical percentile, the constant shift is
  worth nothing even to an adversary, and §4a's "what an argument must use beyond
  P1" has no target in the class positions, which would strengthen killer 1 from
  a description of the attempts into a property of the object. If `G₂` sits low
  in the tail, there is a coordinate and the corpus has never looked at it.
- **Grep showing it is unasked.** `research/QUESTIONS.md` has zero hits for
  "random two-class", "free two-class", "class configuration". The nearest is
  `Q-discrepancy-two-class` (ANSWERED), which ran a random-class control on the
  **discrepancy** `ΔΦ₂` and refuted any twin-specific discrepancy law; it did not
  run one on the maximum gap. `Q-c2prime-drift` (PARTIAL) reports the `c₂′` drift
  as "class-count-blind", which is the closest thing on record and is a different
  statistic.
- **Cost.** Minutes per draw per level with the existing oracle to `x ≤ 31`;
  a few hundred draws fits well inside four hours. Nothing needs the tile in
  memory.
- **Not run**, and the reason is the confound above: a version without the
  matched offset control would reproduce the `M_p` mistake.

**C2. Where does the maximum gap sit inside the tile, and how many positions
attain it?** [verdict **(i)**: a position law at named levels is decidable by
enumeration.]

Killer 2 is a quantifier: worst position against almost all. The corpus has never
measured whether the worst position is structurally distinguished. Two data points
exist and they are isolated: `G₂(43#) = 618` is "at least position
830,330,079,152,051 and attained at **8 positions** of the period"
(`Q-g2-43-term`, ANSWERED), and the Mirror-Sweep Lemma forces the gap multiset to
be mirror-symmetric under `σ(s) = W − 2 − s`, so attaining positions come in
pairs outside the fixed point. Specification: at every exact level, record the
full argmax set, its multiplicity, its positions as fractions of `W`, and whether
the multiplicity is exactly twice the number of mirror orbits.

- **What it decides.** If the record positions are generic modulo the forced
  mirror pairing, the almost-all/worst-position gap is as wide as the corpus
  assumes and no positional argument has a target. If they cluster (near the
  origin, near `W/2`, near the mirror fixed point), a positional argument has one,
  and the mirror pairing is a free control that says whether any observed
  structure is more than the lemma already guarantees.
- **Grep showing it is unasked.** Zero hits in `QUESTIONS.md` for "argmax",
  "position of the maximum", "where the maximum". `Q-gap-spectrum` (ANSWERED)
  covers the gap-length **distribution** to `x = 31` and the excess functional,
  not positions. `Q-records-placement` (ANSWERED) is about twin **prime** gap
  records above 2^53 landing inside stretches, a different object.
- **Cost.** `research/maxgap-law.js --big` already walks exact periods to `29#` in
  147 s in O(1) memory; recording the argmax set is a small change to an existing
  walk. Under twenty minutes to `x = 29`. This is the cheapest of the three.

**C3. Does the free-per-prime two-class adversary beat the offset-max one?**
[verdict **(i)**: a finite comparison of two ladders.]

Settles §1 defect (ii) and §5 item (2), and prices `P4` from the adversary's side
rather than ours. Specification: exhaustive or branch-and-bound maximum gap over
**all** per-prime class pairs `{a_p, b_p}` at `x ≤ 17`, compared against A288815.
At `x = 13` the configuration count is `3·10·21·55·78 ≈ 2.7·10⁶`, exhaustible;
`x = 17` multiplies by 136 and needs the B&B the corpus already has for
`advmin@11`.

- **What it decides.** Whether ZM's `h₂` is the free adversary or a strictly
  weaker offset-max one, hence what the 1.57 control exponent is an exponent of;
  and whether the distance-2 constraint costs an adversary anything at all.
- **Grep showing it is unasked.** Zero hits for "free two-class", "free-choice",
  "class configuration". `Q-advmin-1113` (CLOSED) is the free-class adversary
  against the **anchored Natal@5 comb**, a different object and a different
  functional (survivor count, not maximum gap).
- **Cost.** Minutes at `x = 13`; hours at `x = 17` with the B&B. A page read of
  A072753's OEIS definition line beside ZM Def. 2.2 may settle it for free and
  should be tried first.

**C4. Does the 1.50 exponent survive dropping the literature-grade terms?**
[verdict **(i)**: a refit on a prefix.]

The headline is measured on 22 trusted terms of which fourteen are custody-grade,
six are Alekseyev 2009 and, decisively for the doubling chain, `a(17)–a(22)` are
Wang 2024 single-effort. `Q-greedy-oracle` (ANSWERED) records that the corpus's
own oracle matches the published optima at only 1 of 8 over `x = 47..79`.
Specification: refit on custody-only (14 terms), custody+Alekseyev (16), and full
(22), each against the control's bias at its own matched width, and report the
three centrals.

- **What it decides.** Whether the repository's most-quoted number about this
  object depends on eight terms it has never reproduced. It also prices `Ĝ(64)`,
  on which item D's eventual-form trap window rests.
- **Grep showing it is unasked.** `Q-exponent-control` (PARTIAL) reports the
  22-term reading and the bias; `Q-external-data-audit` (ANSWERED) adopts the
  external series and reports what adopting them changed; neither poses the
  provenance-block split. Zero hits for "custody-only refit" or an equivalent.
- **Cost.** Seconds. `research/exponent-control.js` already carries the
  sliding-window control and the refit machinery.

**C5. Not a cheap unknown, recorded so it is not mistaken for one.**
`G₂(47#)` is priced by direct probe at **1.49 days per run** and stays out of
session reach (`Q-g2-43-term`, ANSWERED). `L8` in §4b is legal but not cheap.

## 7. The conjectural true size of `G₂(x#)`

**What is wrong here first: the corpus quotes two different conjectural truths
for this object, `x(log x)^{3+o(1)}` and `x(log x)^{4+o(1)}`, in the same file.**
The reconciliation is that 3 is the ledger's *unconditional* total and 4 is its
total *with* Maier–Pomerance's conjectural multi-kill row; the rows that say
"conjectural truth = 3+o(1)" have collapsed the two. §5 item (7) carries the
file:line pair. Nothing in the shape below turns on which of the two is meant,
because both are `x^{1+o(1)}`.

### 7a. What the one-class literature conjectures, at its own rungs

- **Jacobsthal's order conjecture, `H(r) ≪ r²`:** OPEN, and it is about
  `H(r) = max_{ω(n)=r} j(n)`, not about the primorial function. Erdős problem
  #970. His *second* conjecture, that the maximum is attained at the primorial,
  is **PROVEN FALSE at r = 24** (Hajdu–Saradha, Math. Comp. 81 (2012)), so
  `H(r) = g(p_r#)` is a theorem with a counterexample and not a definition.
  [`covering-dive.md` §1.1, read at source.]
- **Proven upper for one class:** `g(x#) ≪ x²`, inexplicit constant, Iwaniec 1971
  Thm 2 / 1978 at primorials and Vaughan 1977 for general n. The elementary line
  is far weaker than exponent 2: Kanold `2^{√k}`, Stevens `k^{Θ(log k)}`, Paseman
  `k^{O(loglog k)}`. [PROVEN; `covering-dive.md` §1.1.]
- **Proven lower for one class:** `g(x#) ≫ x log x logloglog x/loglog x`,
  Ford–Green–Konyagin–Maynard–Tao (JAMS 31, 2018) via Rankin 1938 and Pintz 1997.
  [PROVEN.]
- **Conjectured truth for one class:** `g(x#) = x(log x)^{2+o(1)}`, i.e. exponent
  `1 + o(1)`, from Maier–Pomerance, TAMS 322 (1990) 201–237, p. 205, quoted
  verbatim in `two-class-lower-bounds.md` §2c. Their exponent decomposes as
  **1 + 1**: one log from the classical one-element-per-large-prime step, one more
  from the conjectural `(log x)^{1+o(1)}` elements per large prime, which they
  explicitly do not prove. A048670's own OEIS comment draws the same conclusion.
  Ford's 2018 Montreal slides record that even a uniform Hardy–Littlewood
  conjecture buys only `J(T) ≫ T(log T)^{1+c}`, not exponent 2. [CONJ.]

### 7b. What the two-class analogue reads

The corpus's ledger, run for the first time in dimension 2 with Maier–Pomerance's
own three-entry accounting (`two-class-lower-bounds.md` §4c; the qualifier
"*their* ledger" is load-bearing, because Kalmynin–Konyagin run a dimension-2
Mertens ledger of their own on a different family, theirs has fixed centre and
varying separation, ours varying centre and separation fixed at 2):

| source of a `log` | one class | two classes |
|---|---|---|
| Erdős–Rankin base, one survivor per large prime | 1 | 1 |
| survivor density after the small primes, `1/(log z)^κ` | 0 | **+1** |
| the band-2 device, `M(f) = 2`, unconditional | 0 | **+1** |
| Maier–Pomerance multi-kill, `(log x)^{1+o(1)}` per large prime | +1 (CONJ) | +1 (CONJ) |
| **total exponent of `log x` above `x`** | **2 (CONJ)** | **4 (CONJ); 3 unconditional** |

So the two-class analogue reads `G₂(x#) = x(log x)^{3 or 4 + o(1)}`, and in both
readings the second class is worth **one logarithm, not a power of x**, a
finding three independent routes in the corpus agree on (the Rankin accounting,
the certificate ladder's `(Y2/Y1)/ln x` plateau at 2.18, and the Poisson law's
`m₂/m₁ ~ 1.35 ln x`; `G2-STATE.md` §3d). [INFERRED, and the ledger's own
unconditional rows are PROVEN or DERIVED-HERE; the multi-kill row is CONJ.]

**Not in print.** No published statement about A144311's asymptotic growth was
found, searched in the owning convention (`Q-a144311-vocabulary`, ANSWERED); no
lower bound of any kind is attached to A288815 or A072753; and Ziller–Morack's
Conjecture 6, `h₂(n) < p_n² − p_n`, is the only quantitative statement in the
direct literature and is an upper bound with nothing proven about it. [ABSENT in
the owning convention; `two-class-lower-bounds.md` §2 rows 7, 8;
`covering-dive.md` §2.1.] Do not confuse any of this with Kourbatov's maximal
twin-gap law: that is `0.76 log³p` for gaps between actual twin **primes**, a
different object under a different owning convention (`SEARCH-CONVENTIONS.md`
"maximal gaps between prime k-tuples, fitted against `log^{k+1}p`"), and it is
CONJ.

### 7c. What the corpus's own measurements say against that

- **The measured law is BELOW the conjectured one on everything computable.**
  `G₂(x#) = x ln^{2+o(1)}x` with the o(1) positive, best single description
  `≈ 0.76 x ln²x lnln x` over x = 11..79, two significant figures
  [MEASURED, `G2-STATE.md` §6.2]. Against `x ln³x` or `x ln⁴x`, the o(1) is
  strongly negative across the whole reachable range, which is exactly what the
  one-class control does too: over the whole available ladder `h(p#)` tracks
  `p·log p`, not `p·log²p`, and the frozen Maier–Pomerance shape is **refuted on
  this range** at rms 0.281 and maximum log residual 1.239, a factor of 3.5
  [MEASURED, `exponent-control.md` §2].
- **The missing log is visible at a tenth of the required rate, and that is a
  measurement rather than a resolution limit.** `c₁ ~ (log p)^{0.12 ± 0.02}` on
  the top 47 exact one-class terms against the exponent 1 Maier–Pomerance needs;
  a synthetic ladder built to have exponent exactly 1 returns 0.981 ± 0.006 from
  the identical estimator [MEASURED, `maxgap-law.md` §6].
- **The two candidate shapes are not separable here in principle.** `x ln²x lnln x`
  and `x ln³x` cannot be told apart on this data, and attack E's §7 says so
  directly; the AICc figures 31.8 and 10.6 must not be quoted as exclusions
  [`G2-STATE.md` §6.2; `redteam-2026-08-18.md` §§1–2]. On the two-class side the
  same non-separability appears as `c·p^{1.847}` and `c·p·log^{2.448}p` differing
  by 0.1 AIC units while differing by `x^{0.85}` in the limit
  [`exponent-control.md` §2].
- **So the measured 1.50 is not evidence against exponent 1 plus logs.** The
  estimator returns 1.282 on 58 terms of an object whose exponent is 1, and the
  bias is upward in all 40 windows because a positive power of log inside the
  truth biases a finite-range power fit up. An object with three or four logs
  would be biased further up still. [MEASURED + INFERRED,
  `exponent-control.md` §§1, 3.]

### 7d. The shape, stated

> **Conjectured `x·(log x)^{3 or 4 + o(1)}`, i.e. exponent 1 plus logs;
> PROVEN upper `x^{4.26645+ε}`; NEEDED `x^{2}` with constant below 1; MEASURED
> exponent 1.50 ± 0.05 stat on a demonstrably upward-biased estimator.**

That is the shape the reading supports, with three qualifications that must
travel with it.

1. **The proven lower bounds are nowhere near the conjecture either.** The free
   FGKMT floor is `x log x logloglog x/loglog x`, one log below the one-class
   conjecture and two or three below the two-class one. So "1-plus-logs" is
   conjectured at both ends and proven at neither: the proven bracket on `G₂` is
   roughly `x log x` to `x^{4.267}`, four orders of exponent wide.
2. **The gap that matters is 4.26645 against 2, and it is a proof gap rather
   than a truth gap**, provided the conjecture is right, which nothing here
   establishes. `research/sift-limit-attack.md` §2 finds nothing published that
   blocks the band and no κ = 2 extremal example in print.
   [`G2-STATE.md` §9 item 1.]
3. **"Consistent with" is doing real work in 7c and is not "implies".** Every
   measurement above is compatible with exponent 1 plus logs; none of them
   distinguishes it from exponent 1.2, and the estimator provably cannot at these
   sizes. What would distinguish them is not more ladder: adding an eleventh term
   to a ten-term fit moves the exponent by 0.022 on average and 0.078 at worst,
   against a bias of +0.262 [MEASURED on 48 control cases, `G2-STATE.md` §9
   item 6].

## 8. Questions about `G₂` not in `QUESTIONS.md`

**What is wrong here first: none of these is a route, and the base rate says each
is probably worth less than it looks.** They are understanding questions about
what the object is, posed because §4 could not answer them from the corpus. Each
was checked against all 392 `Q-` ids of `research/QUESTIONS.md` and against all 67
rows of `research/REFUTED.md`; the grep that shows the absence is quoted. Ranked
by what an answer would do for §4, not by cost. Verdicts use the wrong-direction
audit's scheme.

**Q1. Is `G₂` generic in the coordinate the sieve discards?** [(i)]
Every upper-bound argument keeps the class count and discards the class
positions (§4a, P1 against P4). Nobody has measured what the positions are worth
for the maximum gap. The question is not whether they can be exploited but whether there is
anything there: where does `G₂ − 1` sit in the distribution of the same
maximisation run on offset vectors `(d_p)` with `d_p ≠ 2`? A typical percentile
would say killer 1 describes the object and not just the attempts on it; a low
percentile would say there is a coordinate nobody has looked at. Specification
and the matched control it needs are §6 C1.
*Grep:* zero hits in `QUESTIONS.md` for "random two-class", "free two-class",
"class configuration". `Q-discrepancy-two-class` (ANSWERED) ran the random-class
control on `ΔΦ₂` and refuted any twin-specific **discrepancy** law; it did not
touch the maximum gap. Nothing in `REFUTED.md` closes it.

**Q2. Where does the maximum sit inside the tile, and with what multiplicity?**
[(i)]
Killer 2 is a quantifier, and the corpus has never measured whether the worst
position is distinguished. Two isolated facts exist: `G₂(43#) = 618` is attained
at **8 positions** and one of them is recorded (`Q-g2-43-term`), and the
Mirror-Sweep Lemma forces the gap multiset to be symmetric under
`σ(s) = W − 2 − s`, so the multiplicity should be even outside the fixed point.
Whether the positions are otherwise generic, and whether the multiplicity grows,
is unknown. The multiplicity is the union bound's own coordinate: a maximum
attained once over `W` positions is where an L¹ count over positions is most
lossy, and §4a records that the ℓ¹→ℓ² conversion **is** the sharp maximal law,
so how lossy it is at the extreme is a live descriptive question.
*Grep:* zero hits for "argmax", "position of the maximum", "where the maximum".
`Q-gap-spectrum` (ANSWERED) covers the gap-length distribution to `x = 31` and
the excess functional `|B_N|`, not positions. `Q-records-placement` (ANSWERED)
is twin **prime** gap records above 2^53 inside stretches, a different object.

**Q3. Is there any structural reason `G₂/g` should stay polylog?** [(i)]
`G₂ ≥ g` is PROVEN and one line; the reverse comparison has never been posed.
Three independent routes say the second class is worth one logarithm
(`G2-STATE.md` §3d), and the measured ratio drifts slowly up to 8.55 at `x = 79`
with the maximum at the last term. What is absent is any argument, even
heuristic, that bounds the ratio: `G₂ ≪ g·(ln x)^A` for a fixed A would give
`G₂ ≪ x²ln^A x` from Iwaniec/Vaughan, which is **above** exponent 2 and so
carries no TPC content, while sitting **below** 4.26645. That the corpus holds
the trivial direction of a comparison and has never asked about the other is the
gap; whether the reverse is provable is a route and is not asked here.
*Grep:* zero hits for "one-class to two-class", "transfer from g"; no `Q-` id
poses a `G₂`-to-`g` upper transfer; `REFUTED.md` closes no such row.
[This is L7 of §4b, stated as an understanding question.]

**Q4. Why do three independent instruments single out `x = 37`?** [(i)]
`G2-STATE.md` §2 records that `x = 37` spikes `G₂/h` (8.00, the old peak),
spikes `c₂′` (0.5939, the top of the eight-term range), and is the low outlier of
the `h₂/G₂` column at 1.341 against [1.63, 1.81] at `x = 47..73`: "three
instruments now point at `x = 37` as a `G₂`-side anomaly", and then does nothing
with it. If the coincidence is arithmetic it is the only named structural
irregularity on the ladder; if it is one draw seen three ways, saying so retires
a standing observation. Note that the three readings are not independent: all
three are ratios with `G₂(37#) = 528` in them, so a single high `G₂` at 37
produces all three signs at once, and the honest first move is to check whether
any instrument **without** `G₂(37#)` in it also flags 37.
*Grep:* `Q-delta37` (ANSWERED) asks what sources the `M_p` law's depth term and
whether `x = 37` falls out under the Hardy–Littlewood lens, a different object
(the extinction law's fold field). `Q-c2prime-drift` (PARTIAL) reports the `c₂′`
drift as class-count-blind and does not treat 37 as a level. `Q-frontier37`
(ANSWERED) is the fold-L instruments at fold 37. None poses the coincidence.

**Q5. What is the `h₂` the corpus is controlling against?** [(i)]
§1 defect (ii) and §5 item (2): `h₂` is defined as offset-max in one set of live
files and as free-per-prime in another, and A288815 = 6·A072753 + 6 is asserted
as an identity between two rows the corpus also separates by an inequality. The
1.57 control exponent is quoted in `README.md` §Status, `G2-STATE.md` §§0, 6.1
and `paper/beta2-note.md` §5, and nothing says which object it is an exponent of.
*Grep:* zero hits for "free two-class", "free-choice". `Q-a144311-vocabulary`
(ANSWERED) settles the *vocabulary* question for `G₂` and the sifting limit, not
this one.

**Q6. Does the headline exponent depend on terms this repository has never
reproduced?** [(i)]
Fourteen of the 22 trusted terms are custody-grade; six are Alekseyev 2009 and
six are Wang 2024, and the corpus's own greedy oracle matches the published
optima at only 1 of 8 over `x = 47..79` (`Q-greedy-oracle`, ANSWERED, which reads
that as the oracle failing). `Ĝ(64) = 1080` rests on a(18) alone and item D's
eventual-form trap window rests on `Ĝ(64)`. A provenance-block refit is seconds
of work and nobody has asked for it.
*Grep:* `Q-exponent-control` (PARTIAL) reports the 22-term reading and the bias;
`Q-external-data-audit` (ANSWERED) reports what adopting the external series
changed; neither splits the ladder by provenance. [§6 C4.]

**Q7. How much of `G₂` is ever realised inside the zone?** [(iii), see the
caveat.]
`GLOSSARY.md` §"Zone gap" records that an interior gap of the zone is a gap of
the tile's slot sequence, so the interior part of `Z₂` never exceeds `G₂(p#)`,
and stops there. What is unknown is the other direction as a description: at each
level, what fraction of `G₂(p#)` does the largest zone gap reach, and does the
tile's record gap ever lie inside the zone? The caveat that makes this (iii)
rather than (i): the zone is where a twin slot is a twin prime, so any statement
about occupancy there is TPC-adjacent, and a version of this question phrased as
"is the zone gap always below the width" is the Zone Postulate itself. The
descriptive version, a measured ratio at named levels, is legal.
*Grep:* the `Q-zonegap-*` family (model, reduction, witnesses, prior art, Z2)
treats `Z₂`'s own law and its reduction; none poses the `Z₂`-realised fraction of
`G₂`. **Flagged for the orchestrator:** a sibling agent owns `Z₂` in this wave,
so this row may be answered on the other side.

**Q8. Is there a level at which the mirror is the only structure, and does that
matter?** [(i)]
The Mirror-Sweep Lemma is PROVEN and the mirror gains **exactly 0** at the
anchored cap, structurally rather than empirically (`REFUTED.md`). But the mirror
is the one exact symmetry `G₂` has, and the corpus has only ever asked what it
buys as an *improvement channel*. The descriptive question is what it constrains:
which statistics of the gap sequence are forced by mirror symmetry alone, so that
observing them is not evidence of anything further. That is the free control for
Q2 and for any future positional measurement, and the corpus has run positional
measurements without it.
*Grep:* "mirror" has 8 hits in `QUESTIONS.md`, all under
`Q-0c-holesweep` (ANSWERED, the sweep and the palindrome),
`Q-anchored-unify`/`Q-history-dial` (the cap families) and the red teams; none
poses the mirror as a null model.

**Not proposed, and why.** The genealogy of the record gap (is the maximum born
at its fold or inherited) is not listed: `attack-foldL-04-amortized.md` already
records "births are maximal, not scarce", which answers the descriptive half, and
the amortization route around it is CLOSED in `REFUTED.md`. Anything phrased as
"prove `G₂ = o(x²)`", "prove `x′²/G₂ → ∞`", or "prove the extreme-value law as an
upper bound" is omitted deliberately: all three are verdict (ii) by §4b and
belong in the wall's ledger, not in a question list.
