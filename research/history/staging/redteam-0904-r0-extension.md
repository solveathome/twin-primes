# Red team on the R0 forbidden-extension note: the criterion re-derived at source, one claim refuted against a live producer, and the word "parity" doing work the criterion cannot

<!-- ledger
id: Q-redteam-0904-r0-extension
status: ANSWERED
todo: Z2
question: Do the seven load-bearing claims of derive-0904-r0-extension.md survive an adversarial re-derivation against Tao's own text, and do its proposed live-layer changes survive?
verdict: Six of seven survive at their stated rung and one is refuted: Proposition A, the scope slip, row e'' and the equivariance transfer are CONFIRMED (the slip is strengthened, since Tao's own Example 2 is the target note's missing one-coordinate witness), Propositions B and D are WEAKENED (B's stated mechanism proves too much and its proposed insertion drops the qualifier that saves it; D's "same trigger" is near-definitional and its causal reading of the exponent band does not hold), and the claim that no corpus artifact certifies the window-count variance at width p'^2 is REFUTED by research/06-variance-theorem.js, which computes exactly that, brute-force verified at two levels; separately, EXEMPT throughout means "Claim 1's H5 fails", which is not the parity statement wall-note Face 1 is priced against, and the note's proposed live-layer text carries no H6 conditional.
-->

*(2026-09-04. Staging note, adversarial review. It edits no live document and no
existing file of any kind. Target:
`research/history/staging/derive-0904-r0-extension.md` (HELD, same day).
Calibration per claim: PROVEN, VERIFIED, MEASURED, DERIVED, SOURCED, OPEN,
REFUTED. Grades on the target's claims are CONFIRMED / WEAKENED / REFUTED and
each carries its own derivation rather than an assent. One producer was written
and formally embedded, `redteam-0904-r0-extension.js`.)*

## 0. The verdict, disconfirming half first

**One claim of the target note is refuted outright, and it is a corpus-search
failure rather than a mathematical one.** §7d states that "no corpus artifact
certifies the variance of the window-count statistic at window width `p'^2`, so
the zone anchor's `z` is **not computed anywhere**", and rests its OPEN verdict
on that. `research/06-variance-theorem.js` computes the exact variance of the
twin-slot count in windows of length `L = p_{n+1}^2` over all `p_n#` window
positions — that ensemble, that width — with a brute-force verification against
all window positions at `p = 13` and `p = 17`. The producer is live, embedded,
and its own header calls the resulting statement "no wide conspiracy". So the
missing quantity was on disk, the OPEN was declared without it, and the anchor's
`z`-score is one division away from two embedded artifacts. §7 below computes it.
The target note says it checked `research/window-check.js` and "no other producer
found"; that is the failure mode the campaign record already names, an absence
asserted before the disk was searched.

**Second, and it is the scoping item that should travel with every row of the
target's table.** EXEMPT in that note means one thing only: **Claim 1's H5 fails**
for the statement's target property. It does **not** mean "no parity obstruction".
Tao's 2007 statement of the parity problem is a different and coarser statement —
sieve theory cannot give non-trivial *lower bounds* on the size of a set on which
`λ` is constant, and any upper bound is off by a factor of at least 2 — and that
is the statement `paper/wall-note.md` §2 Face 1 is actually priced against, at
floor 8 through Riesel–Vaughan. The two come apart at `k = 1`: for
`P(l_1) = "l_1 is prime"` the forbidden set is `{(+1)}`, its convex hull is
`{+1}`, the origin is not in it, H5 **fails**, and Claim 1 says nothing — while
the 2007 parity problem plainly does apply to lower-bounding primes. [SOURCED,
both posts read at source this session; the `k = 1` computation is two lines of
Tao's own definitions.] So H5-exemption does not imply parity-exemption in the
sense the corpus's own faces use, and the target note's column header "parity"
overstates its own content. Every EXEMPT verdict in that table should be read
"H5 fails", and nothing more.

**Third, Proposition B's stated mechanism proves too much.** §1d argues that the
tile form is safe because it "is a finite decidable statement about `Z/x#`, and
reweighting cannot falsify it". By that argument every fixed-`p` statement in the
frame is safe too, including every COVERED row, since `head(p) <= B` and
"the zone of `p` is occupied" are also finite decidable facts whose truth value
no weight can change. The mechanism does not separate the rows it is used to
separate. What actually does the work is the note's own next sentence — Claim 1's
contradiction is not that `P` becomes false but that the argument claims a
witness in `supp(nu w)`, which carries only forbidden patterns — and that
sentence is **dropped** from the text §8 proposes for `paper/wall-note.md`:187.
The proposed insertion is therefore looser than the section it cites.

**Fourth, the target's one-line classification tool is false as stated.** "*Two
forced primes trigger the obstruction; one does not*" is offered as "the whole
classification tool". Tao's Examples 4 and 5 are obstructed properties with
**zero** monochromatic coordinates, and the corpus already holds both
(`history/staging/import-proof-complexity.md`:516–519). Proposition A itself is
scoped to confined-rough and product properties and survives; the slogan is not
scoped and does not. A confined-rough property with exactly one monochromatic
coordinate can also satisfy H5 once the further condition `R` is allowed to see
`λ`, and §2 exhibits one, which upgrades the target's §9 item 2 from "unchecked"
to "false in general, and true in this frame only because no R0 row has a
`λ`-sensitive `R`".

**What survives, and most of it does.** Proposition A as scoped, the scope slip
(strengthened: Tao's Example 2 is the source's own one-coordinate witness and the
target note never cites it), row e''s one-property finding, and the equivariance
transfer by restriction all CONFIRMED by independent re-derivation. Of the five
proposed live-layer changes, three survive as drafted, two need rewording, and
none is refuted outright except the variance clause inside change 3. §8 has the
table.

**What this note does not do.** It does not promote or close anything, it does
not edit `derive-0904-r0-extension.md` or any live file, and it does not lift the
target note's HELD status. It computes one number that was previously called
uncomputable and it grades seven claims.

---

## 1. Provenance, and one channel note

**Reached at source this session, by `curl` from Bash:**

| artifact | HTTP | bytes | sha256 of the HTML as served |
|---|---|---|---|
| Tao, *A general parity problem obstruction*, What's new, 21 Nov 2014 | 200 | 295,376 | `73685b3edb2ba64336c3485c0d2e96af5bf6e54e066ff2b1be6620f113401fc5` |
| Tao, *Open question: The parity problem in sieve theory*, What's new, 5 Jun 2007 | 200 | 318,047 | `e39ba502076df61925a0072cce257a1cd6b9ff4aec59ea64405d695ef98591a3` |

Both were read end to end after rewriting Tao's LaTeX `<img alt="...">` tags back
into their alt text, the same extraction `lit-tao-parity.md` describes. Claim 1,
its proof, its Hahn–Banach converse, Examples 1 through 5 and Remark 1 were read
at the page, not through the corpus's transcription.

**The 2014 hash differs from the corpus's record and the reason is benign.**
`lit-tao-parity.md` §Provenance records
`7867a797ee33d1a5d370f2263a076f03718f32da8bdfaaad7a143cc4c6ded27e` at 295,372
bytes on 2026-08-27; this session got 295,376 bytes and a different digest. The
served page carries a comment thread and a rendering timestamp, so a byte-level
drift of that size across eight days is expected. **Every quotation
`lit-tao-parity.md` attributes to that page was checked against the page as
served today and every one matches verbatim**, including Claim 1 with its
duplicated "that that", the "not precisely a theorem" sentence, the
`j >= k/2 + 1` corollary, the E2 "additional sieve axioms" sentence and Remark 1.
[SOURCED.] The corpus's transcription is faithful; what follows disagrees with
its *use*, never with its text.

**The producer.** `research/history/staging/redteam-0904-r0-extension.js`,
formally embedded (`node research/qc/embed.js`), 112 lines of output, 1.4 s,
`code-sha256 dbd4851b…`, `out-sha256 18568dce…`, node v22.21.0. Every number in
§§2, 3 and 7 below is read off that embedded block. Nothing here was
hand-pasted.

---

## 2. (a) Proposition A: CONFIRMED as scoped, its one-line reading REFUTED

**The proposition re-derives.** Taking H4 at Tao's own wording — "there does not
exist any natural numbers `l_1,…,l_k` **obeying** `P(l_1,…,l_k)`" — the extension
of a pure product `AND_i [l_i in A_i]` realises exactly the sign patterns
`Lambda_1 x … x Lambda_k`, so the forbidden set is the complement. The forward
half is the target note's two-point midpoint argument and it is correct: with
`i != j` monochromatic, the patterns `u` (disagreeing at `i`) and `v` (disagreeing
at `j`, and negated everywhere else) are both forbidden and average to the
origin, and shrinking the extension under any further condition `R` only enlarges
the forbidden set, so the same two patterns stay forbidden. The `|S| <= 1` half is
also correct: every forbidden pattern then carries the same value `-e_i` in
coordinate `i`, and so does every convex combination. [DERIVED, re-derived here
independently; I reach the target's statement and its scope.]

**Two source checks the target note does not run, and both pass.** The producer's
Part C evaluates the exact `k = 2` hull test (for a subset of the four corners of
the square, the origin lies in the hull iff the subset has three or more members,
or contains an antipodal pair — any three corners of a square contain its
centre):

- **Tao's Example 3**, both prime: forbidden `(+1,+1), (+1,-1), (-1,+1)`, H5
  holds. Matches the source's own list verbatim. The target note checks this one.
- **Tao's Example 2**, `l_1` prime and `l_2` almost prime: forbidden `(+1,+1),
  (+1,-1)`, H5 fails, and Tao says in his own sentence that Examples 1 and 2 are
  *not* subject to the obstruction. **This is the source's own one-coordinate
  witness, and `derive-0904` never cites it.** It is the exact shape of the scope
  slip §3 below is about, which makes the slip's correctness a matter of reading
  the source's second example rather than of new derivation.

**Where the target overreaches, and it is not the proposition.** §1c closes with
"**The one-line reading, and it is the whole classification tool.** *Two forced
primes trigger the obstruction; one does not.* Every verdict in §§2-5 is that
sentence applied." As a statement about Claim 1 that is **false**, and the
counterexamples are in the source and already in this corpus:

- **Example 4** (Tao 2014): `P(l_1,…,l_k)` = "some edge `{i,j}` of a graph `G`
  has `l_i, l_j` both prime". Obstructed **exactly when `G` is two-colourable**.
  No coordinate is monochromatic — the extension contains tuples in which any
  named `l_i` is composite — and yet H5 holds for every two-colourable `G`. Zero
  forced primes, obstruction present.
- **Example 5** (Tao 2014, credited to Zeb Brady): an obstructed property that is
  not two-colourable, on six coordinates, again with no monochromatic coordinate.

Both are already transcribed in `history/staging/import-proof-complexity.md`
lines 516–519, which calls them out as "corpus-relevant". So the corpus held the
counterexamples to its own new slogan before the slogan was written. [SOURCED for
both examples; the observation that neither has a monochromatic coordinate is
one line of H4.]

**And Proposition A's converse is false outside the product class, with a
witness.** The target's §9 item 2 says the converse "is stated for products and
is **unchecked** outside them", and lists no falsifier. Here is one. Take
`P(l_1,l_2) = [l_1 is p-rough and p < l_1 < p'^2] AND [l_2 is p-rough] AND
[lambda(l_2) = +1]`. This is confined-rough in the target's own sense with
`R = "lambda(l_2) = +1"`, `Lambda_1 = {-1}`, `Lambda_2 = {+1,-1}`, so `|S| = 1`
and (A1) would read "not H5". The extension realises only `(-1,+1)`, so the
forbidden set is `{(+1,+1), (+1,-1), (-1,-1)}` and the origin is
`(1/2)(+1,+1) + (1/2)(-1,-1)`: **H5 holds**. [Verified in the producer, Part C.]
The condition is admissible under H4, which places no restriction on `P` beyond
being a property of `k` natural numbers.

**Grade: CONFIRMED for Proposition A as stated and scoped; REFUTED for the
one-line reading; the converse's exposure is now witnessed rather than
speculative.** The classification in §§2-5 of the target does not depend on the
slogan, because every R0 row it touches is confined-rough with an `R` that does
not read `lambda` — but the slogan must not leave that note, and the target's own
"Every verdict in §§2-5 is that sentence applied" is the sentence that would
carry it out.

**Does it depend on the product structure?** Yes, and only in the converse. The
forward half (`|S| >= 2` ⟹ H5) holds for any `P` whose extension is contained in
`A_1 x … x A_k` with two monochromatic factors, product or not, because the
argument only ever uses that the extension is *contained* in the box. The
converse (`|S| <= 1` ⟹ not H5) is a statement about the extension being the
*whole* box and fails the moment `R` can cut it, as the witness above shows.

---

## 3. (b) The scope slip: CONFIRMED, and one repair of the three does not work

**The criterion reads the extension coordinate-wise, and the source says so
twice.** H4's wording quantifies over "any natural numbers `l_1,…,l_k` obeying
`P`" — the `l_i` are bound by `P` and by nothing else. The linear forms
`L_1,…,L_k` appear only in Claim 1's *conclusion* ("the existence of an `n` such
that `P(L_1(n),…,L_k(n))` holds") and never in the forbidden-set computation.
Tao's own Example 3 is the demonstration: the twin problem's forms are `n` and
`n+2`, and the property he tests is "`l_1` and `l_2` are both prime", with the
difference-2 relation living entirely in the forms. [SOURCED.] So the difference
relation cannot be relied on to bound `l_2` inside the property, and the slip at
`lit-tao-parity.md`:313, `paper/wall-note.md`:181-182 and
`object-bridge-read-0829.md`:471 is **not cosmetic**.

**The forbidden set as written, computed exactly.** With
`P(l_1,l_2) = [both coprime to x#] AND [x < l_1 < x'^2]`, coordinate 1 is a set
of primes and coordinate 2 is a union of reduced classes carrying both Liouville
values. Forbidden `= {(+1,+1), (+1,-1)}`, hull `= {+1} x [-1,1]`, origin outside,
**H5 fails**. [Producer, Part C.] That is character for character Tao's Example 2,
the example he names as *not* obstructed. The target note reaches the same
forbidden set by its own route and is right.

**Three repairs exist, and they do not agree.** The target proposes one and does
not mention that the choice matters.

1. **Bound both coordinates** — `x < l_i < x'^2` for `i = 1, 2`. Both coordinates
   monochromatic, `|S| = 2`, H5 holds. This is the target's repair and it is the
   one the reduction actually needs, since the Zone Postulate requires `a` **and**
   `a+2` inside `(p, p'^2)` (`ZONE-POSTULATE.md` §1, `zonegap-01` conventions:
   `p < a` and `a + 2 < p'^2`, both strict). **CONFIRMED as the correct repair.**
2. **Keep the property and read the extension as "twin prime pairs"**, which is
   what the three sites' following sentence asserts. That sentence is a second
   error of the same kind: the extension of the property as written is a
   *product*, not a set of pairs at difference 2. The target note's proposed
   "pairs of primes in `(x, x'^2)`" phrasing fixes it and matches Tao's own
   Example 3 convention. **CONFIRMED.**
3. **Add `l_2 = l_1 + 2` to the property and keep only `l_1` bounded.** This is
   the repair the brief asks about, and it **fails, level-dependently**. Under it
   `Lambda_2 = { lambda(l_1+2) }` over `p`-rough `l_1` in `(p, p'^2)` with
   `l_1 + 2` also `p`-rough. Every such `l_2` below `p'^2` is prime, so `-1` is
   there; `+1` enters exactly through `l_1 = p'^2 - 2`, because `p'^2` is itself
   `p`-rough (its only prime factor is `p' > p`) and composite. So `+1` is in
   `Lambda_2` **iff `p'^2 - 2` is `p`-rough**, which is an arithmetic accident of
   the level. The producer decides it: over the 43 levels `p = 7..199` the
   verdict **flips 27 times** — H5 FAILS at `p = 11, 17, 23, 31, 41, 43, 59, 67,
   83, 101, 103, 113, 127, 137, 167, 181, 199` and HOLDS at the rest. [MEASURED,
   exact roughness test, producer Part B.]

**So the criterion is sensitive to the statement's confinement at two-integer
resolution**, which is the target's own row d' seen from the other side, and it
is a reason to prefer repair 1 that the target does not give. A criterion whose
answer alternates with the level is not one to build a table on.

**Grade: CONFIRMED, and strengthened.** The slip is genuine, the criterion is
coordinate-wise by the source's own wording, and the repair the target chose is
the only one of the three that is both correct and level-uniform.

---

## 4. (c) Proposition B: WEAKENED — a restatement whose stated mechanism proves too much

**Is it new content, a restatement, or a contradiction of `wall-note.md`:184-187?**
Mostly a **restatement**, with one new sentence and one defective mechanism. The
live text already says: "The exemption is real and it is one step narrower than
it looks: it covers Door 5, which uses no sieve weight to reweight, and it does
not cover any route that proves the zone statement by bounding sums against a
non-negative sieve weight." That sentence already carries the whole operational
content of Proposition B. It is not a contradiction: the two agree on the
conclusion and on Door 5 being the entire residue. What Proposition B adds that
is genuinely not in the live text is the *general* formulation — H5-failure for a
statement is not inherited by its consequences — which the live sentence states
only for the one pair (tile form, zone form).

**Where the argument fails, and it is the mechanism.** §1d argues:

> The tile form `G_2(x#) < x'^2 - 2` is such a fact: it is a finite decidable
> statement about `Z/x#`, and reweighting cannot falsify it.

Applied consistently that argument exempts every row in the table. "`head(p) <= B`"
at a fixed `p` is also a finite decidable statement, and so is "the zone of `p`
holds a twin pair"; no reweighting of any `nu` changes the truth value of either.
The criterion "reweighting cannot falsify the conclusion" therefore does not
separate the rows §1d uses it to separate. **It also misplaces Tao's
contradiction.** Read at the source, the contradiction in Claim 1's proof is
never that `P` becomes false. It is: "by reweighting all sieve weights by the
additional multiplicative factor of `w(n)`, the same arguments should also be
able to locate `n` in the support of `nu(n) w(n)` for which `P(…)` holds. But `w`
is only supported on those `n` whose Liouville sign pattern is forbidden, a
contradiction." [SOURCED, verbatim.] The clash is between the argument's claimed
**witness** and the support it now sits in, not between the weight and the
statement's truth value. The target note's own next sentence gets this right —
"but only if the argument concludes it without ever locating an `n` in the
support of a weight" — and that sentence is where Proposition B's content
actually lives.

**Which makes the proposed insertion at `wall-note.md`:187 the wrong text.** As
drafted it reads, in part: "Exemption therefore does not close under deduction:
an argument establishing the tile statement establishes its zone consequences
too, and those satisfy H5." That is false without the qualifier: an argument
establishing the tile statement **by a means that never locates an `n` in the
support of a non-negative weight** does not fall to the reweighting, which is
precisely the case the very next sentence of the insertion is about. The
insertion drops the qualifier that its own source section supplies, and then
restores the conclusion by fiat.

**And the insertion carries no conditional.** Its final sentence — "What survives
is only a route with no non-negative sieve weight anywhere, which is why the
exemption's whole extent is Door 5" — is a flat statement about what no method
can do. Claim 1 is CONJECTURED by its author. The rung marker sits in a bracket
*outside* the block quote, so it is not part of the text proposed for the live
layer. See §8 for the reword.

**Is the insertion needed?** No. `wall-note.md`:184-187 already scopes the
exemption to Door 5 correctly and in fewer words. If anything is worth inserting
it is the one-clause generalisation, and it must arrive with both the qualifier
and the conditional. §8 gives a two-sentence version.

**Grade: WEAKENED.** Conclusion CONFIRMED (and already live); mechanism as
written proves too much and misplaces the contradiction; proposed insertion
REWORD or drop.

---

## 5. (d) Row e'': CONFIRMED, with one sentence over-narrow

**The Zone Restriction Lemma checks out, at the source and by re-derivation.**
`zonegap-02-reduction.md` §1 states it as Lemma A, PROVEN and VERIFIED at
`p = 7, 11, 13, 17, 23`, and its own ledger verdict carries the exact phrase the
target quotes: "**Z2(p) IS the whole-tile gap object restricted to the head
window (p, p'^2)**". Re-derived here: (⊇) a prime exceeding `p` is coprime to
`p#`; (⊆) a hole `n` with `1 < n < p'^2` has no prime factor `<= p`, so if
composite its least prime factor exceeds `p`, forcing `n >= p'^2`. Both members
of an in-zone slot pair are therefore prime. The two coordinate sets
`A^slot = {l : gcd(l, p#) = 1, p < l < p'^2}` and
`A^prime = {l prime, p < l < p'^2}` are **equal as sets**, and since H4 computes
the forbidden set from the extension alone, equal coordinate sets under the same
`R` give identical forbidden sets. **There is no data by which the criterion
could tell the two readings apart.** [PROVEN, given Lemma A and H4. CONFIRMED.]

**The monotonicity claim is right, and is in fact stronger than the target
states.** "A consecutiveness clause can only shrink the extension, and shrinking
the extension can only add forbidden patterns" — correct, and the consequence is
that the forbidden set is monotone under **any** strengthening of `P`, and the
convex hull is monotone under inclusion, so **H5 is monotone: once it holds for
`P`, it holds for every `P'` implying `P` on the same coordinates.** No clause of
any kind can move a statement from COVERED to EXEMPT. [DERIVED; two lines.]

**The one over-narrow sentence.** The target then writes: "The only operation
that moves a statement to the exempt side is **removing** a confinement." Two
other operations do it, and the target's own table uses both. *Removing any
constraint* enlarges the extension, not only a confinement — dropping the
roughness clause would do it too. And *changing the statement's shape so that H2
fails* moves it to the exempt side without touching the confinements at all,
which is exactly rows c', f1 and f4' ("EXEMPT by type"). The sentence should read
"removing a constraint, or leaving H2's existential shape". [Correction, minor.]

**One scope note on Part 2's 4-tuple.** `P_{Z2,4}` carries the clause
"no in-zone opener strictly between `l_1` and `l_3`", and the gap `l_3 - l_1` is
not fixed. Tao's frame requires `k` **fixed** affine-linear forms, none a
constant multiple of another (H1), so the 4-tuple reading engages Claim 1 only
after the gap is fixed, one system of forms per gap. The verdict is unaffected —
H5 holds for every fixed gap, by the forward half — but the statement "the
between-pairs reading is not a different parity object" is a statement about a
family of instances, not about one instance of Tao's setup. [DERIVED.]

**Grade: CONFIRMED**, with one sentence to narrow and one scope note.

---

## 6. (e) Proposition D: WEAKENED — near-definitional, and the causal reading does not hold

**The "shared trigger" is a property of the frame's construction, not a finding.**
Proposition D says the two axes have the same trigger: forcing two coordinates
into a range where roughness implies primality also forces a twin pair into a
bounded window, which is what makes a statement (ii). But "a twin pair inside
`(p, p'^2)` at infinitely many `p`" **is** the weak Zone Postulate, which
`ZONE-POSTULATE.md` §2 proves equivalent to TPC, both directions, elementary. So
the trigger for COVERED (two coordinates confined to the zone) and the trigger
for (ii) (occupancy at infinitely many `p`) are the same condition written twice.
The coincidence is built into the frame by the Zone Restriction Lemma, and the
proposition records it rather than discovering it. That is not a criticism of its
truth; it is a correction of its billing as a finding about two independent
axes. [DERIVED.]

**The single separation at row a is correct as a reading of the target's own
table**, and its exposure is the table's completeness, which the target states.
I re-checked the table row by row and found no second (ii)+EXEMPT cell: rows a',
c', d', f1, f3' and f4' are all (i), and every COVERED row is (ii). [DERIVED,
by inspection, not an independent construction of the frame.]

**The exponent band claim equivocates on "content", and the honest version is
more disconfirming.** The target's §0 says "the one `(i)+EXEMPT` statement with
content is the exponent band itself". Trace what the exemption is worth there:

- An unconditional two-class exponent strictly inside `(2, 4.26645]` is EXEMPT
  because it does not force any twin pair into any window — that is the same fact
  that makes it (i). The exemption and the shortfall are the **same property of
  the statement**.
- At exponent 2 with constant below 1 the statement becomes row a, (ii), and
  still H5-exempt as a statement — but Proposition B then removes the exemption
  from every route carrying a non-negative sieve weight, leaving Door 5.
- And the route the corpus actually holds to `4.26645` is the DHR dimension-2
  sieve (`paper/beta2-note.md`, `wall-note.md` §2 Face 4), and the one live road
  inside the band is the Brüdern–Fouvry vector sieve with Rosser weights
  (`research/sift-limit-attack.md`). Both are `nu`-bearing. So the exemption buys
  those routes nothing at the point where it would matter.

**Stated flatly: in this frame the H5 exemption's width is exactly the width of
the shortfall.** It is worth everything while the statement proves nothing, and
worth only Door 5 the moment the statement proves the target. That is a sharper
statement of Proposition D than the target's and it points the same way as the
target's own verdict, only harder.

**The causal sentence does not hold.** §6a writes that "the exponent band is
where the programme stands **because** it is the only place in this frame where
the obstruction's hypothesis is unsatisfiable". The band is where the programme
stands because `beta_2 = 4.26645` is what the dimension-2 sieve delivers and
because no published bound sits inside the band (`wall-note.md` §2 Face 4). The
H5-exemption is a **consonance** discovered after the fact, and the note's own
§0 says the search "ends where the programme already stands". Calling it the
reason converts a coincidence into a cause. [The consonance is CONFIRMED; the
causal reading is REFUTED as unsupported.]

**Grade: WEAKENED.** True as a description of the table, near-definitional as a
proposition, and its strategic reading should be replaced by the sharper one
above.

---

## 7. (f) Part 2: the transfer CONFIRMED, the "no producer" claim REFUTED, and the number computed

### 7a. The equivariance transfer is by restriction, and the group identification is exact

**CONFIRMED, and the group check is tighter than the target states it.** The
tile-side ensemble in `import-boolean-analysis.md` §4 is
`(prod_{q <= y} Z_q, uniform)` acting by translating each prime's strike classes.
The zone-side ensemble is the `p#` translates of a fixed-width window in `T_p`.
These are the same action, not an analogy and not merely an isomorphism of
groups: translating the window by `sigma in Z/p#` is identical to translating the
tile's pattern by `-sigma`, which moves prime `q`'s strike pair from `{0, -2}` to
`{sigma mod q, sigma - 2 mod q}`, and by CRT the map
`sigma |-> (sigma mod q)_{q <= p}` is a bijection onto `prod_q Z_q`. So window
translation **is** the full rotation ensemble, the action is simply transitive on
the `p#` window positions, and the measure, the degree filtration, all `L^q`
norms and all influences are preserved. Any theorem with an equivariant
hypothesis and a norm-or-exceptional-set conclusion therefore cannot distinguish
the zone's position, for the same reason and by the same argument. [DERIVED; the
CRT step is the only content and it is one line.]

**The `eps * |ensemble| < 1` threshold is identical, and self-consistently
paired.** Both `eps` and the cardinality are `E_p`'s, `|E_p| = p#`, so the
2026-08-27 mixed-ensemble correction at `wall-note.md` Face 1 does not arise
here. [CONFIRMED.]

**One qualification the target does not make.** The *argument* transfers; the
*statistic* does not. `wall-note.md` Face 1's `S(x)` is a whole-period survivor
count at a phase, window width `W = x#`; the zone-side statistic is a count in a
window of width `~ p^2`. Equivariance is indifferent to which, so the transfer
holds — but no number from Face 1 transfers with it, and in particular Face 1's
`z = -22,633` at `x = 37` is not a zone-side figure and must never be quoted as
one. §7b shows the two are not even the same sign story.

**So `z2-state-draft-0829.md`:1141's "imported to the zone side by analogy" does
understate the transfer.** CONFIRMED, on the group identification above.

### 7b. "The anchor's z-score at window width p'^2 is computed nowhere" — REFUTED

**The variance was on disk.** `research/06-variance-theorem.js` computes, for
`L = p_{n+1}^2` over all `P = p_n#` window positions, the exact
`Var[N] = sum_{|d|<L} (L - |d|)(J(d) - delta^2)` with `J` the exact CRT pair
correlation, and brute-forces it against every window position at `p = 13` and
`p = 17`. That is the ensemble, the width and the statistic §7d of the target
calls uncertified. The target checked `research/window-check.js`, found nothing,
and recorded an absence; `grep -l "variance" research/*.js` returns 67 producers
and this is one of them, sitting at `research/06-variance-theorem.js` under the
title "THE VARIANCE THEOREM (\"no wide conspiracy\")".

**So the z-score is one division away, and here it is.** The producer for this
note re-derives the same second-moment formula independently, re-verifies it by
brute force over **all** `p#` window positions at `p = 7` and `p = 11` (exact
match to `1e-9` on both mean and variance), evaluates it at the zone's own
opener window `L_zone = p'^2 - p - 3` in `zonegap-01` conventions, and counts the
in-zone twin slots directly. First and last rows of 43, `p = 7..199`:

| p | p' | L_zone | N_zone | E[N] | sigma | z | z at L = p'^2 |
|---|---|---|---|---|---|---|---|
| 7 | 11 | 111 | 8 | 7.9286 | 1.4175 | 0.0504 | −0.4778 |
| 13 | 17 | 273 | 16 | 13.5000 | 1.4793 | 1.6899 | 1.1124 |
| 41 | 43 | 1805 | 50 | 50.4228 | 3.2778 | −0.1290 | −0.1994 |
| 79 | 83 | 6807 | 152 | 139.5092 | 5.8684 | **2.1285** | 1.8378 |
| 157 | 163 | 26409 | 411 | 416.1104 | 10.4719 | **−0.4880** | −0.7271 |
| 199 | 211 | 44319 | 626 | 632.0960 | 13.1449 | −0.4638 | −0.6056 |

Over all 43 levels: **z ranges −0.4880 to +2.1285, mean +0.5855**, and at the
`L = p'^2` width the range is −0.7410 to +1.9221, mean +0.3699. Split at the
median level, the first half's mean `z` is +0.8466 and the second half's is
+0.3363, so what trend there is runs **toward** the ensemble, not away.
[MEASURED, exact at 43 levels, producer `redteam-0904-r0-extension.js` Parts A0
and A, `out-sha256 18568dce…`.]

**Reading, calibrated, and the caveat first.** This is 43 exact points to
`p = 199` and nothing more; it is not an asymptotic statement, the two columns
are two different window conventions and they differ by up to 0.5 in `z`, and
`lit-tao-parity.md` §2.3's rule stands — no finite level is evidence about the
obstruction in either direction. Within that scope: **the zone anchor is not a
diverging outlier of its own window ensemble at the zone's own width.** It sits
inside two sigma at every computed level, with no drift. That is the opposite
shape from the tile anchor's `z = +1.05 -> -22,633` over nine levels
(`wall-note.md` §2 Face 1), and the two are different statistics at different
window widths, so the contrast is a fact about two measurements and not yet a
fact about the objects.

**What this does to the target's §7d.** Its measured half stands — the density
ratio at `S = x'^2` reverses to about 21% below the ensemble mean, ceiling
`rho(2) = e^{2 gamma}/4 = 0.793055` (`research/origin-excess.md`,
`stretch-01.md`), and Route B is CLOSED and ADVERSE. Its OPEN half does not: the
`z` coordinate is now MEASURED at 43 levels and it is *not* adverse. The target's
closing sentence "**The wall is not located differently on this object**" was
reached with the one discriminating coordinate declared uncomputable; with the
coordinate computed, the honest statement is that the equivariance argument
transfers verbatim while the anchor's deviation does not, and whether that
matters is open. [The disagreement is about §7d's status, not about the
equivariance transfer, which §7a confirms.]

**What the density reversal and the flat `z` say together.** They are consistent:
a 21% density deficit at `u = 2` is an asymptotic statement about the survival
curve on the stretch grid at `x = 1487` and beyond, while these 43 `z` values are
at `p <= 199` where `E[N]` is 8 to 632 and `sigma` is 1.4 to 13.1. A constant
ratio deficit of 21% would show as `z ~ -0.21 E/sigma`, which at `p = 199` is
about −10, not −0.46. So either the deficit has not switched on at these levels
or the two coordinates are measuring different windows. **That is the next thing
to compute and this note does not compute it**; it needs the same exact formula
carried to the levels `origin-excess.md` works at.

---

## 8. (g) The H6 conditional, and the table of proposed live-layer changes

### 8a. Inside the note: carried. In the text it proposes for the live layer: not carried

**Inside the target note the conditional is carried three times and no COVERED
row is quoted as an impossibility.** §0's last paragraph ("Claim 1 is at rung
**CONJECTURED** by its author's own sentence … no COVERED verdict may be quoted
as a proof that a route is impossible"), §6b's rider, and §9 item 5 ("it is the
reason no row of §5 may be quoted as an impossibility"). I read §§2-7 for a row
used as a barrier and found none: every COVERED verdict is written as a verdict
on a property, and the strongest route-level sentence, §0's "The exemption
survives only for routes that have no non-negative sieve weight anywhere",
appears in the same section as the conditional that scopes it. **CONFIRMED.**

**The proposed live-layer text does not carry it.** In §8 Change 1 the rung
marker `[Rung of the inserted claim: DERIVED …]` sits *outside* the block quote,
so what would land in `paper/wall-note.md` is the block quote alone, and that
block quote ends: "What survives is only a route with no non-negative sieve
weight anywhere, which is why the exemption's whole extent is Door 5." That is an
unconditional claim about what no method can do, sourced to a claim its author
says is not a theorem. **This is the one place where the target's own rule is
broken by its own proposal.** The rule's own §0 wording — "no COVERED verdict may
be quoted as a proof that a route is impossible" — is exactly what the insertion
would do once the bracket is stripped.

**The standing live text has the same defect and the target does not propose
fixing it.** `paper/wall-note.md`:183-184 reads "the zone form carries exactly
the forbidden set of 'both prime' and the obstruction applies to it in full",
with no conditional anywhere in §2's opening paragraph. If Change 1 is applied,
the conditional clause belongs in the same paragraph.

**And the column header.** The target's §5 table names its second axis "parity".
Per §0's second item that axis is Claim 1's H5 and nothing more, and the parity
statement `wall-note.md` Face 1 is priced against is the 2007 one, about
quantitative lower bounds where `lambda` is constant. The header should read
"Claim 1 (H5)". Without that, an EXEMPT row will be read as a parity exemption by
the next person to open the table, which is how the corpus's four same-day
integration corrections happened.

### 8b. The table

Grades: **SURVIVE** = apply as drafted. **REWORD** = the finding stands, the
drafted text does not. **REFUTE** = the finding does not stand.

| # | site | what the target proposes | grade | why |
|---|---|---|---|---|
| 1 | `paper/wall-note.md`:187 | insert the two-tests / non-closure paragraph | **REWORD** | conclusion already live at :184-187; drafted text drops the "only if the argument locates an `n` in `supp(nu)`" qualifier its own §1d supplies, and carries no H6 conditional. Not needed; if inserted, use §8c |
| 2 | `paper/wall-note.md`:182 | replace "the property's extension *is* the set of twin prime pairs" with "the set of pairs of primes in `(x, x'^2)`", noting the twin phrasing borrows the conjecture | **SURVIVE** | correct, and it matches Tao's own Example 3 convention, where the difference-2 relation lives in the forms and not in `P` |
| 3 | `research/history/staging/lit-tao-parity.md`:313 | restate `P_zone` with **both** coordinates in `(x, x'^2)`, because H4 quantifies over the `l_i` independently | **SURVIVE** | confirmed at the source: "any natural numbers `l_1,…,l_k` obeying `P`", and the forms never enter H4. As written the property is Tao's Example 2, which he names as *not* obstructed. Worth adding: the alternative repair "add `l_2 = l_1 + 2`, keep only `l_1` bounded" does **not** work — its verdict flips 27 times over `p = 7..199` (§3) |
| 4 | `research/history/staging/object-bridge-read-0829.md`:471 | same replacement | **SURVIVE** | same reason |
| 5 | `research/history/staging/z2-state-draft-0829.md`:1141 | replace "imported by analogy" with the restriction/group/threshold statement, ending "What is genuinely open on the zone side is the anchor's `z`-score at window width `p'^2`, for which no corpus artifact certifies the variance" | **REWORD** | first three clauses CONFIRMED (§7a). The final clause is **REFUTED**: `research/06-variance-theorem.js` certifies exactly that variance and brute-forces it at `p = 13, 17`, and the `z` is now measured at 43 levels (§7b). Use §8c |
| 6 | `TODO.md`:287 | append `Q-derive-0904-r0-extension` to item Z2's `Ledger:` line | **SURVIVE** | mechanical, and the gate is working as designed. Outside this note's remit; not applied here either |
| 7 | `derive-0904-r0-extension.md` §5 header and §1c | — (not proposed by the target) | **REWORD, new** | rename the "parity" column to "Claim 1 (H5)" and delete or scope "*Two forced primes trigger the obstruction; one does not* … the whole classification tool", which Tao's Examples 4 and 5 refute (§2) |

### 8c. The two replacement texts, offered and not applied

**For row 1**, if `paper/wall-note.md`:187 gets an insertion at all:

> These are two tests, not one. H5 is a test on a statement's target property;
> Claim 1's proof is a test on an argument's shape, and its reweighting bites
> only an argument whose conclusion is "there exists n in the support of ν".
> So an H5-exempt statement licenses a route only if the route never locates
> such an n: an argument proving the tile statement by exhibiting a surviving n
> in a window that sits inside the zone has exhibited a twin prime pair, and the
> obstruction applies to that. What survives is the route with no non-negative
> sieve weight anywhere, which is Door 5. All of this is conditional — Claim 1
> is not a theorem, it presumes Liouville pseudorandomness, and none of it says
> any route is impossible.

**For row 5**, at `z2-state-draft-0829.md`:1141:

> currently described as imported to the zone side by analogy. It is not an
> analogy. By CRT, translating a window by σ in Z/p# is exactly the rotation
> that carries every prime q's strike pair from {0, −2} to {σ, σ−2} mod q, so
> the window ensemble and the rotation ensemble are one action, simply
> transitive on the p# window positions, and the ε·|ensemble| < 1 threshold is
> identical on both sides. The anchor's *deviation*, however, does not
> transfer. Measured at the zone's own window width over 43 levels to p = 199
> it stays inside two sigma with no drift, z from −0.49 to +2.13, mean +0.59
> (`research/history/staging/redteam-0904-r0-extension.js`, on the exact
> second-moment formula of `research/06-variance-theorem.js`), against the tile
> anchor's z = +1.05 to −22,633. Those are two different statistics at two
> different window widths, so the contrast is a fact about two measurements and
> not yet a fact about the objects.

---

## 9. What would falsify this red team, and whether the check has run

Each item names the check and its status. The gradings in §§2-6 are DERIVED with
one adversarial pass, mine; §7's numbers are MEASURED and exact.

1. **§0's second item falls** if Claim 1 and the 2007 parity problem are the same
   statement after all, so that H5-exemption does imply parity-exemption. The
   check is the `k = 1` computation: `P(l_1) = "l_1 is prime"` has forbidden set
   `{(+1)}`, hull `{+1}`, origin outside, H5 fails, while the 2007 post says
   plainly that sieve theory cannot lower-bound a set on which `lambda` is
   constant. **Check has run, at both sources, this session.** What has *not* run
   is any attempt to state the 2007 obstruction as a criterion on this frame's
   rows; that would be a second classification and this note does not attempt it.

2. **§2's refutation of the one-line reading falls** if Examples 4 and 5 have a
   monochromatic coordinate after all. They do not: in Example 4 the extension
   contains, for any named vertex `i`, a tuple with `l_i` composite, as long as
   some other edge is doubly prime. **Check has run, by inspection of the
   source's own text.** It is one line and could be wrong if Tao's `P` there is
   read as a conjunction rather than an existential over edges; his wording is
   "one can find an edge `{i,j}` of `G` with `l_i, l_j` both prime", which is the
   existential.

3. **§3's flip result falls** if the roughness test is wrong. It is a trial
   division of `p'^2 - 2` by every prime `<= p` and the producer prints the
   number tested at every level, so the check is inspectable row by row. The
   *interpretation* — that `+1` enters `Lambda_2` only through `l_1 = p'^2 - 2` —
   rests on `p'^2` being the unique `p`-rough composite below `p'^2 + 2`, which
   is the Zone Restriction Lemma's own argument. **Check has run.**

4. **§4's charge that Proposition B proves too much falls** if there is a reading
   of "reweighting cannot falsify it" that distinguishes the tile form from a
   fixed-`p` zone statement. I did not find one, and the target's own next
   sentence supplies a different and working distinction, so the charge is about
   the writing rather than the conclusion. **Not run against the target's
   author.**

5. **§6's "the exemption's width is the shortfall's width" falls** if some
   statement in the frame is H5-exempt, TPC-strength, and reachable by a
   `nu`-bearing route. Row a is exempt and TPC-strength; the claim is that
   Proposition B removes its exemption from `nu`-bearing routes. A falsifier
   would be a `nu`-bearing argument for the tile form that never locates an `n`
   in `supp(nu)`. **Not run: I could not construct one and did not prove none
   exists.** That is the weakest claim in this note.

6. **§7b's numbers fall** if the second-moment formula is misapplied at the
   zone's window. The producer brute-forces mean and variance over **all** `p#`
   window positions at `p = 7` and `p = 11` and matches the formula to `1e-9`,
   and `research/06-variance-theorem.js` does the same at `p = 13` and `p = 17`
   at its own width. **Check has run at four levels.** What has **not** run is
   any check above `p = 199`, and the 43 points say nothing asymptotic; the
   apparent conflict with `origin-excess.md`'s 21% deficit at `u = 2` (§7b, last
   paragraph) is unresolved and is the single highest-value follow-up here.

7. **Everything in §§2-6 inherits H6.** Claim 1 is CONJECTURED by its author.
   Nothing in this note, and nothing in the note it reviews, may be quoted as a
   proof that a route is impossible. **This is a standing hypothesis, not a
   check.**

8. **Nothing here is falsified by a computation at any finite level**, except
   §7b, which *is* a finite-level computation and is therefore evidence about the
   zone anchor's ensemble position and about nothing else — not about the
   obstruction, in either direction (`lit-tao-parity.md` §2.3).

---

## 10. The gate, run against this note

`node research/qc.js` returns **one** finding against this file, and it is the
re-run guard working as designed:

> `item Z2 does not list Q-redteam-0904-r0-extension`
> `(research/history/staging/redteam-0904-r0-extension.md, ANSWERED)`
> `on its Ledger: line`

**Not applied.** This note edits no existing file, and `TODO.md` is already
modified in the working tree by other work in this wave, so an edit here would
collide. The other twelve checks return zero against this file: refs, quotes,
crosslinks, transfers, calibration, absence, sourcing, embeds, widths,
provenance and search-convention all read 0, and the single `scripts` finding in
that run belongs to another agent's file
(`redteam-0904-item0.js`, missing a banner title).

---

*Staging note, adversarial review. It edits no live file and no existing file.
`README.md` §Status, `research/G2-STATE.md` §0 and `research/ZONE-POSTULATE.md`
remain canonical and win against anything here.*
