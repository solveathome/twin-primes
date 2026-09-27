# qc transfers, partition J: thirteen findings adjudicated by word diff

<!-- ledger
id: Q-qc-transfers-J
status: ANSWERED
todo: none
question: Are the thirteen transfers findings real defects or benign restatements?
verdict: Adjudicated by word diff with the diff pasted under each finding: 11 KEEP, 2 DEFECT, both in gate-multiplies.md and both one root cause, 0 false positives, and nothing needing compute or a human decision.
-->

Wave 3 of the consistency campaign. Every one of the thirteen `transfers` findings
was extracted to a pair of scratch files and run through
`git diff --no-index --word-diff=plain`. The diff output is pasted under each
finding. Verdict counts:

| verdict | count |
|---|---|
| KEEP | 11 |
| DEFECT | 2 (findings 11 and 12, both in `gate-multiplies.md`, one root cause) |
| FALSE POSITIVE | 0 |
| NEEDS COMPUTE / NEEDS CHRIS | 0 |

Three further defects were found off the list of thirteen and are recorded in
§B: one in `gate-multiplies.md` §8, and three staleness items in
`research/qc/README.md` itself.

---

## A. Defects, ranked by consequence

### D-1 (findings 11 and 12). `gate-multiplies.md` states the copy theorem as an identity where the home document states it only as VERIFIED at 40 computed cells

**Home document: `research/U-FRAME.md` §5a step 2.** It owns the theorem, the
verification and the scope. `gate-multiplies.md` is the analysis layer that
consumes it; `TODO.md` 0c is the index layer.

What the home document says, verbatim:

> **And it holds for the whole maxsum family, exactly (VERIFIED 40 of 40, over
> five folds and m ≤ 8):**
>
> > maxsum_m(new) = max over the p 2-sets {a, a−2} of maxsum_m(old minus those
> > classes).
>
> No straddling window ever beats a single-copy one, and the reformulation above
> is the m = 1 case.

Note what the verification covers: it is an empirical statement that no window
straddling two copies ever beats a single-copy window. There is no proof of this
anywhere in the corpus. `U-FRAME.md` never marks the family version PROVEN, only
VERIFIED, and only over five folds and m ≤ 8.

**The defective site, part one: `research/gate-multiplies.md` §6, the paragraph
opening "5a steps 1 and 2, the copy theorem for the whole family."** (line 232 at
time of audit). Word diff against `U-FRAME.md` §5a step 2:

```
@@ -1,2 +1,8 @@
[-> maxsum_m(new)-]{+**5a steps 1 and 2, the copy theorem for the whole family.** These are+}
{+identities. `maxsum_m(new)+} = max over the p 2-sets {a, [-a−2}-]{+a-2}+} of maxsum_m(old minus
those [-> classes).-]{+classes)` is the one object in the family whose **index does not grow under+}
{+folding**: m stays m. There is no accumulating index, no floor to stay above, and+}
{+no gate. NFP cannot touch it and neither can the Overshoot Budget, because an+}
{+identity overshoots by nothing. **This is the strongest survivor in the branch.**+}
{+Its price is that the difficulty moves out of index bookkeeping and into+}
{+evaluating a residue-deleted maxsum, which is a two-dimensional sieve question.+}
```

Nature: **no calibration marker at all**, and the missing marker is load-bearing.
"These are identities" and "an identity overshoots by nothing" is what carries the
immunity conclusion. The same section's table row (line 223) reads
`| 5a step 2 (A4) | copy theorem for the family, exact | **no (m stays m)** | no (exact) | no | **SURVIVES** |`,
where "exact" appears twice as a hypothesis-grade fact. The home document has it
at VERIFIED, over five folds and m ≤ 8, with an unproven no-straddling claim
underneath.

**The defective site, part two: `research/gate-multiplies.md` §9 item 1** (line
445). Word diff against the same home passage:

```
@@ -1,2 +1,8 @@
[-> maxsum_m(new)-]{+**1. The exact copy theorem for the whole maxsum family (U-FRAME section 5a,+}
{+step 2).** `maxsum_m(new)+} = max over the p 2-sets {a, [-a−2}-]{+a-2}+} of maxsum_m(old minus those
[-> classes).-]{+classes)`, VERIFIED 40 of 40. **The only object in the branch whose index cost is+}
{+zero**: m stays m under folding. It is immune to NFP (no accumulating index, no+}
{+deficit, no gate) and immune to the Overshoot Budget (an identity overshoots by+}
{+nothing). What it needs is a way to bound a residue-deleted maxsum without going+}
{+through a kill count, which is a genuinely different question from anything the+}
{+branch has attacked. Nobody has tried it directly.+}
```

Nature: **flattened scope**. "VERIFIED 40 of 40" survives; "over five folds and
m ≤ 8" does not. 40 of 40 without the range reads as saturation of a test suite;
with the range it reads as five folds and eight values of m, which is what it is.
§9 is the section a reader opens to learn what survives, so this is the copy most
likely to be quoted onward.

**Why this ranks first.** The immunity claim is the branch's only live entry
point: `TODO.md` 0c is built on it, `U-FRAME.md` §7 item 2 repeats it, and
`G2-STATE.md`:359 lists it as one of the three escapes from the no-fixed-point
argument. All of that rests on the statement being an identity. The home document
does not say it is one; it says it was checked at forty cells.

**Evidence that `TODO.md` is clean and shows the correct shape.** Finding 13
diffs `TODO.md` 0c against the same home passage, and 0c is the only downstream
copy that preserves the whole scope, including the no-straddling clause:

> VERIFIED 40 of 40 over five folds and m <= 8: maxsum_m(new) = max over the
> p 2-sets {a, a-2} of maxsum_m(old minus those classes), and no straddling
> window ever beats a single-copy one

`TODO.md` also cites `gate-multiplies.md` §9 correctly for the immunity, and §9
is indeed the section that argues it.

**What governs.** `research/U-FRAME.md` §5a step 2 is the home and its calibration
is the one that stands. Nothing here supplies replacement wording. There are two
separate questions for the router, and they should not be merged: whether the
downstream copies should carry the home's scope, and whether the identity is in
fact provable, which would change the home document rather than the copies.

A third site with the same shape is inside the home document itself:
`U-FRAME.md` §7 item 2 restates "The exact copy theorem for the whole maxsum
family (§5a step 2)" with no calibration marker, five hundred lines from §5a's
VERIFIED. It is not a `transfers` finding because the two passages share too
little text, but it is the same defect and should travel with D-1.

---

## B. Off-list findings

### B-1. `gate-multiplies.md` §8's boxed marker names two measured laws; §10 of the same file says the threshold uses three

§8, the boxed survivor:

> **The survivor, stated as a threshold (PROVEN, given the measured G2 and mbar
> laws).** The surviving form goes through iff **`L <= 0.31 p / ln p`**, on
> average over the ladder. A5 Theorem B proves `L <= 0.18 p`. The gap is a factor
> **`0.58 ln p`**, and nothing else. (That is rho = 1.5, the central reading; at
> T_29's rho = 2.4 the threshold tightens to `L <= 0.19 p / ln p` and the gap
> widens to `0.95 ln p`.)

§10 of the same file:

> **Section 8's threshold uses three measured laws at once** (G2, mbar, rho), so
> its constants 0.19 to 0.31 should be read as one significant figure.

The marker's "given" clause lists G2 and mbar. rho is the third input and it is
the one that produces the whole 0.19-to-0.31 spread; the box uses rho = 1.5 in
the very next sentence. A reader who takes the marker at face value will price
the threshold as resting on two measured laws when it rests on three, and will
not know that one significant figure is the honest precision.

Secondary, same box: the headline reads "The gap is a factor `0.58 ln p`, and
nothing else", where every other statement of this quantity in the corpus reads
"0.58 to 0.95 ln p" (`U-FRAME.md` 384, 593, 688; `TODO.md` 80;
`gate-multiplies.md` §9 line 466). The parenthetical does restore the range, so
this is a weaker item than the marker, but the emphatic "and nothing else"
attaches to the flattened value.

Home for this quantity: `research/gate-multiplies.md` §8, which is also where the
defect sits, so there is no summary layer to blame.

### B-2. `research/qc/README.md` is stale in three places, and it is the document the next agent reads

The brief asked specifically whether the README's own example is stale enough to
mislead. It is, in three ways.

**(a) The `quotes` row's evidence is now false.** README:36 reads:

> | `quotes` | a quotation attributed to a document that no longer contains it | `maxgap-law.md:502` quotes `two-class-lower-bounds.md` §8 for a "measured law `~1.2 x ln^2 x`"; that file contains no 1.2 |

`research/two-class-lower-bounds.md`:594, inside §8 (§8 begins at line 583), now
reads:

> `| lower, measured law | ≈ 1.2 x ln²x | MEASURED on the diagonal, 8 exact + 16 certified points; a description of x <= 41, not an asymptotic |`

So the file does contain 1.2, and has since the wave-2 fixes. The citing line has
also moved from 502 to `maxgap-law.md`:530 and now itself prints `≈ 1.2 x ln^2 x`
with an explicit note that "The `≈` is the target's own symbol and carries the
distinction: this is a measured approximation, not an asymptotic `~`."

The live `quotes` finding is therefore against the README's own historical example
text, which still prints the retired `~` form. As briefed, the defect is `~`
against `≈` and nothing should be written in. But the README's stated evidence
"that file contains no 1.2" is now a wrong statement in the documentation, and a
future agent reading it will conclude a number is missing from
`two-class-lower-bounds.md` and go to add one. The risk named in the brief, that
1.90 is h₂'s constant and not G₂'s, is exactly the wrong repair this stale row
invites.

The `transfers` row two lines below already carries the right pattern: "**Fixed
2026-08-17, so this example no longer reproduces**". The `quotes` row has no
equivalent note. That asymmetry is the whole problem.

**(b) The `scripts` row's count disagrees with the tree.** README:39 says the
check "surfaces the 18 scripts whose header carries a correction banner". The
count of files under `research/*.js` containing `CORRECTION` is **14**.

**(c) README:18 turns "six dropped hypotheses across three passes" into "six
independent audits".** README:18-20 reads "Six independent audits found the same
shape". `research/history/staging/qc-CAMPAIGN.md`:945-947 reads:

> Six dropped hypotheses in the suite, all six invisible to every check that was
> not a word-diff. That makes three independent passes finding the same signature,
> so it is now the campaign's confirmed dominant defect class

Six is the count of defects; three is the count of independent passes. The README
attached six to the wrong noun. It overstates the independence of the evidence
behind the framework's central claim, which is the one number a reader of that
paragraph is being asked to trust.

None of B-2 changes any mathematics. All of it changes what the next agent will do.

---

## C. The eleven KEEP verdicts, with diffs

### Finding 1. `paper/anchored-note.md` §1 vs `paper/staircase-note.md` §1 (j=0.93 c=0.96). KEEP

```
@@ -1,2 +1,2 @@
[->-]  N_x = { r ∈ [0, W) : r ≡ 11 or 17 (mod 30), and r mod p ∉ {0, p−2}
          for[->-] every prime 7 ≤ p ≤ x [-},-]{+}.+}
```

The entire difference is a blockquote marker, a line wrap and a comma against a
period. The set, the modulus, the excluded residues and the prime range are
identical. Home is `paper/staircase-note.md` §1, which owns the object: it gives
the equivalent gcd form, the House-29 exclusion and the census
N = 10, 90, 990, 14850, 252450. `anchored-note.md` states this in its own words
and then points at the home explicitly, in the surrounding prose:

> the same comb, with the gcd form and the House-29 exclusion spelled out, opens
> `paper/staircase-note.md` §1

That is a restatement that names its home and says what the home adds. It earns
its tokens: a self-contained paper cannot define its central object by reference.

### Finding 2. `research/ATTACKS3.md` vs `research/THE-LENS.md` §3 (j=0.49 c=1.00). KEEP

```
@@ -1,4 +1,2 @@
[-The second is why our G₂ sits far below the adversarial bound A288815, whose-]
[-adversary aligns every prime's worst case at one place.-]It is also the likely
reason the adjacent-kill run L stays small: a long run needs several slots
deleted in ONE copy, and CRT scatters them.
```

c = 1.00 because `THE-LENS.md`'s two lines are a paragraph split, not a shortened
copy. `THE-LENS.md` §3 makes the same two-consequence argument at greater length
one paragraph earlier, and there it carries more, not less: both ladders printed
in full (ours 2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528 against A288815's
2, 6, 18, 30, 66, 150, 192, 258, 366, 450, 570, 708) and the statement that
A288815 "dominates ours at every level". `ATTACKS3.md` compresses that to "far
below the adversarial bound A288815", which agrees.

No hypothesis, quantifier or calibration marker differs. Both say "the likely
reason", which is the right hedge in both. `ATTACKS3.md` adds context the lens
note does not carry: it continues straight into where the difficulty actually
sits, with the pointer to `U-FRAME.md` §9 and the note that the additive chain
G₂(new) ≤ G₂(old) + L·m̄ is REFUTED at `U-FRAME.md` §5a step 4.

### Finding 3. `research/covering-dive.md` §2.3 vs `research/two-class-lower-bounds.md` §2 (j=0.23 c=0.75). KEEP, and the FKMPT constant is correct in both

```
@@ -1,7 +1,10 @@
[-- Ford–Konyagin–Maynard–Pomerance–Tao (FKMPT), *Long gaps in sieved sets*, ... Main Theorem 1 (text-extracted verbatim from the arXiv **v4** PDF, dated 19 Sep 2022, which is the corrigendum-corrected text) ...-]
[-  **C(ρ) := sup{δ ∈ (0, 1/2) : 6·10^{2δ}/log(1/(2δ)) < ρ}**, and **C(ρ) > e^{−1−6/ρ}**.-]
[-  *(The constant is 6, not 4. arXiv v2 and v3 print (4 + δ)·10^{2δ} and e^{−1−4/ρ} ...-]
[-  > "Unfortunately-]{+Unfortunately+} our methods only seem to give good results in the
{+>+} one-dimensional case. Consider for instance the set [-{n-]{+`{n+} ∈ P : n + 2 ∈ [-P}-]{+P}`+} of
{+>+} (the lower) twin primes. ... The [-'trivial'-]{+"trivial"+} bound
{+>+} coming from these methods would give a bound of [-≫-]{+`>>+} log X log log [-X-]{+X`+} for the
{+>+} largest gap between lower twin primes up to [-X …,-]{+`X` ...,+} and one could possibly
{+>+} hope to improve this bound by a small power of {+`log+} log [-log X-]{+X`+} using a variant of
{+>+} the methods in this paper. However, a sieve upper bound (e.g., [-[7 = Halberstam–Richert,-]{+[7,+} Cor.
{+>+} 2.4.1]) combined with the pigeonhole principle already gives a bound of
[-≫ log² X-]{+> `>> log^2 X`+} in this [-case."-]{+case.+}
```

The shared material is FKMPT's Remark 7, quoted verbatim in both. The remaining
diff is the bibliographic apparatus that only `covering-dive.md` carries, which is
what a literature dive is for.

**The constant is 6 in both, and both name the version.** The 4-for-6 reversal did
not re-enter:

- `covering-dive.md`: `C(ρ) := sup{δ ∈ (0, 1/2) : 6·10^{2δ}/log(1/(2δ)) < ρ}`,
  `C(ρ) > e^{−1−6/ρ}`, sourced to the arXiv **v4** PDF of 19 Sep 2022, with the
  corrigendum at JEMS 25 (2023) no. 6, 2483–2485, DOI 10.4171/JEMS/1305, and the
  standing instruction "Any 4 in this repository is the retracted value."
- `two-class-lower-bounds.md`:85 sources the row to "arXiv:1802.07604 **v4**,
  JEMS 23 (2021) 667-700 + Corrigendum, JEMS 25 (2023) 2483-2485"; line 116-121
  states `C(ρ) > e^{-1-6/ρ}` and records that v2 and v3 print `(4 + δ)·10^{2δ}`
  and `e^{-1-4/ρ}`; line 125-128 prints **`C(1/2) > 1/325565`** as "the paper's own
  corrected figure, printed at v4 (1.7) and Corollary 2", and notes that the v3
  text gave `1/6001`, 54x larger.

Both also agree on the remark's numbering across versions: Remark 8 in v2,
Remark 7 from v3 on, text unchanged.

One fidelity nit, not a defect and not worth a routing slot: the two "verbatim"
renderings differ in typography (`≫` and `log² X` against `` `>>` `` and
`` `log^2 X` ``) and in one bracket expansion. Both files declare their
convention, `covering-dive.md` with "Square brackets mark one editorial expansion"
and `two-class-lower-bounds.md` with an explicit note that `[7]` is Halberstam and
Richert, *Sieve Methods*, Academic Press, London, 1974. Nothing mathematical
differs.

### Finding 4. `research/G2-STATE.md` §4c vs `research/LOCALIZED-GAP.md` §4, "the obvious repair" (j=0.75 c=0.86). KEEP

```
@@ -1,6 +1,6 @@
**The obvious repair is closed (PROVEN).** Weakening the gate to M ≤ α·p [-does not-]
[-help-]{+fails+} at
[-any-]{+every+} α, because the gate feeds back. If the chain proves M ≤ B(x), Fact B permits
B/x kills per gap, the telescope index is B/ln x, and the bound returned is about
2.4·R·B·ln x. [-The-]{+**The+} map B ↦ 2.4·R·B·ln x is expanding for every x ≥ [-2,-]{+2**,+} so there
is no fixed point. [-The-]{+**The+} obstruction is not the size of the [-gate, it-]{+gate. It+} is that [-**the-]{+the+}
gate multiplies wherever the index accumulates against a fixed base.**
```

Every difference is bold markers, sentence punctuation, and "does not help at any
α" against "fails at every α". The quantifier is universal on both sides. Same
calibration marker (PROVEN), same numbers (B/x, B/ln x, 2.4·R·B·ln x, x ≥ 2), same
conclusion.

Home is `research/LOCALIZED-GAP.md` §4, which owns the chain. It adds what
`G2-STATE.md` does not carry at this spot: the reach of the principle, that it does
not touch a chain re-basing at every fold, plus the Overshoot Budget as the
statement that closes the tile analogue instead. `G2-STATE.md` adds what
`LOCALIZED-GAP.md` does not: the four hypotheses at `gate-multiplies.md` §2 and the
three escapes, with the note that the u-frame recursion occupies one of them. The
two restatements pull in different directions and both earn their place.

### Finding 5. `research/G2-STATE.md` §4c vs `research/LOCALIZED-GAP.md` §4, Traverse Bound and chain survival (j=0.30 c=0.89). KEEP

```
@@ -1,6 +1,2 @@
[-**Traverse Bound (PROVEN).** Telescoping the merge lemma forces j·m̄ ≤ α·q_{j+1}-]
[-with α = 1/4, so **j ≤ x₀/(9.6 ln²x₀) folds whatever C is, even C = 1**, against-]
[-the π(x) ≈ x/ln x folds the route needs. Short by a factor 9.6 ln x, which is 93-]
[-at x = 16001. Measured-]{+**MEASURED+} chain [-survival is **0-]{+survival: 0+} folds for every x ≤ 12143 at Y = 10⁹, and exactly 1
fold at x = 13933 and x = 16001, against the 1863 that π(16001) [-requires**.-]{+requires.**+}
```

c = 0.89 because `LOCALIZED-GAP.md`'s unit is only the MEASURED sentence;
`G2-STATE.md` runs the Traverse Bound and the measurement together in one
paragraph. The MEASURED numbers are identical on both sides: 0 folds for x ≤ 12143
at Y = 10⁹, exactly 1 fold at x = 13933 and x = 16001, against 1863 required by
π(16001). Both carry a measurement marker.

I checked the two Traverse Bound statements separately, since the flagged unit
straddles them:

- `LOCALIZED-GAP.md`: "**Traverse Bound (PROVEN).** Given the Deficit Lemma, the
  telescope's own hypothesis caps a block at j ≤ x/(9.6 ln²x) folds **for any
  constant C, including C = 1**, against the π(x) ≈ x/ln x folds needed. Short by
  9.6·ln x, which is 93 at x = 16001 and grows."
- `G2-STATE.md`: "**Traverse Bound (PROVEN).** Telescoping the merge lemma forces
  j·m̄ ≤ α·q_{j+1} with α = 1/4, so **j ≤ x₀/(9.6 ln²x₀) folds whatever C is, even
  C = 1**…"

`G2-STATE.md` does not name the Deficit Lemma as an input. It is not a dropped
hypothesis: the step it writes instead, j·m̄ ≤ α·q_{j+1}, is the Deficit Lemma's
content spelled out rather than cited, and the Deficit Lemma is stated in full in
the immediately preceding paragraph of the same subsection, with its own PROVEN
marker and its VERIFIED minima 1.187, 1.280, 1.296. 9.6·ln(16001) = 92.9, so the
93 checks on both sides. Home is `LOCALIZED-GAP.md` §4.

### Finding 6. `research/G2-STATE.md` §4b vs `research/LOCALIZED-GAP.md` §3, the Localized Merge Lemma (j=0.60 c=0.82). KEEP

```
@@ -1,2 +1 @@
> **Lemma [-(PROVEN, `LOCALIZED-GAP.md` §3).**-]{+(PROVEN).**+} If M(T_x, Y) ≤ (p − 2)/4 then[->-] M(T_p, Y) ≤ maxsum₂(T_x, Y).
```

The only difference is that `G2-STATE.md` names its source and
`LOCALIZED-GAP.md`, being the source, does not. The hypothesis M(T_x, Y) ≤ (p−2)/4
is present on both sides, and it is the hypothesis this whole check exists to
protect (the README's day-one example is the sibling case where "with y′² > x" went
missing). Home is `research/LOCALIZED-GAP.md` §3, which carries the proof.
`G2-STATE.md` adds the two-conditions-a-decade-apart analysis and the hypothesis
side / conclusion side distinction, which the home document does not make.

### Finding 7. `research/G2-STATE.md` §4d vs `research/LOCALIZED-GAP.md`, maxsum growth law (j=0.61 c=0.79). KEEP

```
@@ -1,2 +1,2 @@
> [-maxsum_m-]{+**maxsum_m+} = m·m̄ + [-σ·√(2 m ln D),-]{+σ·√(2m·ln D)**,+} so R(m) = 1 + (σ/m̄)·√(2 ln D / m),
> with σ/m̄ = 0.892, 0.920, 0.949 at x = 997, 3499, 16001.
```

Bold markers and one interpunct. Formula identical, all three σ/m̄ values identical
and attached to the same three levels. Both sides carry a measurement marker;
`G2-STATE.md` prefixes "**MEASURED, and not a fit**" with the source at
`localized-04-maxsum.md` §3.

### Finding 8. `research/G2-STATE.md` §5 vs `research/ZONE-POSTULATE.md`, the elementary-literature floor (j=0.60 c=0.81). KEEP

```
@@ -1,10 +1,11 @@
[-**CLOSED-]{+**And the floor holds: CLOSED+} by inspection of the [-sources, and the floor stands.**-]{+sources.**+} The question was
whether an explicit elementary bound already delivers g(x#) < x′² **at the
needed constant**, since the constant is the whole question and an inexplicit
one decides nothing. The answer is no, and the three papers usually named do not
even reach the exponent: Kanold gives 2^{√k}, Stevens k^{Θ(log k)} and Paseman
(arXiv:1311.5944) k^{O(log log k)}, all far weaker than exponent [-2.-]{+2, and at the+}
{+primorial k = π(x) ~ x/log x they miss by orders of magnitude.+} The only
exponent-2 statements are Vaughan 1977 for general n and Iwaniec 1971 Theorem 2
/ 1978 at primorials, [-`g-]{+g+} ≪ (k log [-k)²`,-]{+k)²,+} both with inexplicit constants. So no
explicit-constant route to g(x#) < x′² exists in this literature, [-and-] the floor does
not [-collapse (`TODO.md` 000b).-]{+collapse, and route A carries both prices.+}

```

Every attribution matches: Kanold 2^{√k}, Stevens k^{Θ(log k)}, Paseman
(arXiv:1311.5944) k^{O(log log k)}, Vaughan 1977 and Iwaniec 1971 Theorem 2 / 1978
at `g ≪ (k log k)²`, both inexplicit. The "at the needed constant" qualifier, which
is the load-bearing one, is on both sides in bold. Neither side drops it.

Each adds something. `ZONE-POSTULATE.md` adds the size of the miss at the
primorial, k = π(x) ~ x/log x, and the closing statement that route A carries both
prices. `G2-STATE.md` adds the `TODO.md` 000b pointer and sits the paragraph inside
the numbered list of route A's two independent difficulty floors, where floor 2 is
stated as "The Jacobsthal shadow (PROVEN as an implication)" with the citation to
`two-class-lower-bounds.md` §9. Both point back at the same home,
`research/two-class-lower-bounds.md` §9, which owns the implication and the source
table.

### Finding 9. `research/G2-STATE.md` §5a vs `research/two-class-lower-bounds.md` §8, the construction-side verdict (j=0.34 c=0.72). KEEP

```
@@ -1,5 +1,8 @@
> **VERDICT: SAFE against the construction [-side.**-]{+side**, which is the only side this+}
{+> note is about; §9 states what that does not cover.+} The gap between the best
> available lower bound and the threshold is [-x^{1−o(1)}-]{+`x^{1-o(1)}`+} and widening. {+No+}
{+> construction in the literature, no construction we could build, and no+}
{+> heuristic anyone has written reaches `x^{1+δ}` for any `δ > 0`.+} To threaten
> the Zone Postulate a two-class construction would have to beat the one-class
> construction by a **power** of [-x,-]{+`x`,+} and every route checked, theoretical and
> computational, says the second class[->-] is worth exactly one [-logarithm.-]{+**logarithm**.+}
```

This is the one finding where the scope question needed real work, because
`G2-STATE.md` drops "which is the only side this note is about; §9 states what that
does not cover."

It is not a flattening, for two reasons. First, the scope survives in the verdict
line itself: `G2-STATE.md` prints "SAFE **against the construction side**", so the
restriction is in the claim and not only in the discarded clause. Second,
`G2-STATE.md` carries the §9 caveat in full, in the same section, seventy lines
above, as route A's second difficulty floor, with the explicit pointer:

> 2. **The Jacobsthal shadow (PROVEN as an implication).** G2 ≥ g pointwise runs
>    backward as well as forward, so G2(x#) < x′² − 2 **implies** g(x#) < x′² − 2 …
>    (`two-class-lower-bounds.md` §9.)

Both are inside `G2-STATE.md` §5. The dropped material beyond the scope clause is
supporting evidence, not hypothesis: "No construction in the literature, no
construction we could build, and no heuristic anyone has written reaches x^{1+δ}",
and "theoretical and computational" on the routes checked. Home is
`research/two-class-lower-bounds.md` §8, and it keeps the fuller statement, which
is the right way round.

The shared numbers agree: x^{1−o(1)} and widening on both sides, and both files
print 2.2% of the zone at x = 4001 down from 26% at x = 37.

### Finding 10. `research/PRIOR-ART.md` vs `research/U-FRAME.md` §6a, the A288815 comment (j=0.21 c=1.00). KEEP

```
@@ -1,7 +1,2 @@
[-OEIS **A288815** "Paired Jacobsthal function applied to the product of the-]
[-first n primes" (Mario Ziller 2017, 21 terms, keyword `hard,more`) carries the-]
[-comment: *"If-]{+> "If+} a(n) < p_n^2 - p_n holds for n>=3 then Goldbach's conjecture and the twin
{+>+} prime conjecture hold as [-well."* That is exactly the Zone Postulate-]
[-condition of research/ZONE-POSTULATE.md, published nine years before we-]
[-reached it, and in the STRONGER adversarial form (max over all choices of two-]
[-residues per prime, against our single arithmetic choice {0, -2}).-]{+well."+}
```

c = 1.00 because the flagged `U-FRAME.md` unit is the quotation alone, set as a
blockquote, with its attribution on the preceding lines rather than inline. The
quoted OEIS comment is byte-identical.

The attribution is complete on both sides and consistent. `PRIOR-ART.md`: "Mario
Ziller 2017, 21 terms, keyword `hard,more`", papers arXiv:1706.00317 and
arXiv:1706.03668, companion A072753 with a(n) = 6*A072753(n)+6.
`U-FRAME.md` §6a: "Mario Ziller, 2017; Ziller and Morack, arXiv:1706.00317…;
keyword `hard,more`", same companion relation a(n) = 6*A072753(n) + 6.

The strength claim agrees and is not flattened. `PRIOR-ART.md` says "in the
STRONGER adversarial form (max over all choices of two residues per prime, against
our single arithmetic choice {0, -2})"; `U-FRAME.md` says "in a form STRICTLY
STRONGER than ours. Their a(n) is the ADVERSARIAL paired Jacobsthal, the maximum
over ALL choices of two residues per prime, while our G2 is the single arithmetic
choice {0, -2}. So a(n) >= G2(p_n#) always, VERIFIED at all twelve shared terms."
Both also agree that our G2 ladder is not in OEIS, checked at three offsets, and
both give the same twelve terms of the shared range.

Home is `research/U-FRAME.md` §6a, and `PRIOR-ART.md` says so: "Full discussion and
the numbers in research/U-FRAME.md section 6a." `PRIOR-ART.md` adds the one thing
the home does not, which is the publication instruction: "DO NOT claim the
reduction. Cite them."

### Finding 13. `TODO.md` 0c vs `research/U-FRAME.md` §5a step 2 (j=0.05 c=0.90). KEEP

```
@@ -1,18 +1,2 @@
[-0c. **Bound a residue-deleted maxsum without going through a kill count.**-]
[-   Q: the exact copy theorem for the whole maxsum family (U-FRAME §5a Step 2,-]
[-   VERIFIED 40 of 40 over five folds and m <= 8:-]{+>+} maxsum_m(new) = max over the p 2-sets {a, [-a-2}-]{+a−2}+} of maxsum_m(old minus those
[-classes), and no straddling-]
[-   window ever beats a single-copy one) is the one object in the u-frame branch-]
[-   whose index cost is zero — m stays m under folding — so it is immune both-]
[-   to the no-fixed-point argument and to the Overshoot Budget-]
[-   (gate-multiplies.md §9). What the chain lacks is a PROVEN upper bound on-]
[-   maxsum_m(T_x) as a function of x that is not G2 itself …-]
```

`TODO.md` 0c is the only downstream copy of the copy theorem that carries the
complete scope from `U-FRAME.md` §5a step 2: the marker (VERIFIED 40 of 40), the
range (five folds and m ≤ 8), and the no-straddling clause that the verification
actually rests on. It also states honestly what is missing, "a PROVEN upper bound
on maxsum_m(T_x) as a function of x that is not G2 itself", and marks the growth
law as "measured, unfitted, and unproven". Its citation of `gate-multiplies.md` §9
resolves: §9 begins at line 441 and is the section that argues the immunity.

This is the shape findings 11 and 12 should match. It is the control case for D-1.

---

## D. Two things checked because the brief named them, both now clean

**rho, and the refuted "rising with level" claim.** Wave 1 refuted the assertion
that rho rises with level, on medians 1.332, 1.261, 1.152, 1.272, 1.711. The fix
has landed in both files, and both now name the statistic:

- `research/gate-multiplies.md` §8: "Per-level typical values, **the median over
  m**, run 1.33, 1.26, 1.15, 1.27, 1.71 at T_11 to T_23, so rho is higher at the
  top of the reachable ladder than at the bottom but **does not rise level by
  level**".
- `research/gate-multiplies.md` §10: "**rho is measured on six tiles and it has no
  trend.** Its per-level median runs 1.33, 1.26, 1.15, 1.27, 1.71 at T_11 to T_23
  and its **per-level max** 1.58, 1.78, 1.83, 1.41, 1.84, 2.39 to T_29: neither is
  monotone, and the high readings sit at the deepest tile rather than on a rise …
  Do not extrapolate rho in either direction."
- `research/U-FRAME.md` §5a step 4: "Taken as **the median over j ≤ 8** that slope
  measures 1.33 at T₁₁ and 1.71 at T₂₃, and over individual (tile, j) cells it
  ranges 1.02 to 1.84 across that span, reaching 2.39 at T₂₉. It is larger at the
  top of the reachable ladder than at the bottom but not monotone in the level".
- `research/U-FRAME.md` §10: "**the maximum over m ≤ 8**, which is not monotone in
  the level".
- `TODO.md` 0b: "Rho is measured non-monotone, so neither end may be quoted as the
  one the trend favours."

The statistic is named at every site, the two statistics are no longer confused,
and the falling stretch is stated rather than contradicted. Nothing to route.

One wording risk, below the defect line and recorded only so it is not
re-discovered: `U-FRAME.md` §10 writes "on the tile the related ratio ρ … is larger
and **does not fall**", of a sequence that does fall from 1.83 to 1.41. In context
"does not fall" means "does not decay toward 1", contrasted with R(m) which "falls
to 1 from above" in the previous sentence, and the same sentence goes on to say
"which is not monotone in the level". A reader is not misled. Not a defect.

**The FKMPT constant.** 6 in both files, both naming arXiv v4 of 19 Sep 2022 and
the JEMS 25 (2023) 2483-2485 corrigendum, with the retracted 4 recorded as
retracted. `C(1/2) > 1/325565` is printed in `two-class-lower-bounds.md` with the
v3 value 1/6001 marked as superseded. The backwards "correction" did not re-enter.
Detail under finding 3.
