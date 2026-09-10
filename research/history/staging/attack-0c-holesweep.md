# Attack 0c hole-sweep: the per-copy degradation curve of a fold, in full

<!-- ledger
id: Q-0c-holesweep
status: ANSWERED
todo: 0c
question: At a fold, how does maxsum degrade copy by copy as the two deleted residues sweep through their possible positions?
verdict: The full curve is on disk for nine folds (5->7 through 31->37, every copy) and it is a PALINDROME: the Mirror-Sweep Lemma is proven here and verified exhaustively, giving the fingerprint any kill-count-free bound must reproduce, but no such bound was produced by this pass.
-->

*2026-08-20. The probe Chris asked for on TODO item 0c: at the fold from level
5 to level 7, measure how maxsum degrades copy by copy as the two deleted
residues sweep through their possible positions — and produce the full curve,
embedded. Producer: `research/attack-0c-holesweep-01.js`, formally embedded
(`node research/qc/embed.js --streams both --timeout 2400
research/attack-0c-holesweep-01.js -- 37`, 617.9 s), all
self-tests pass. Legend as in `research/sift-limit-attack.md`: **[PROVEN]**
derived or published theorem; **[VERIFIED]** checked computationally here;
**[MEASURED]** empirical, finite range; **[INFERRED]** deduction from sourced
facts. This is a HELD headline: no live document was touched.*

---

## HEADLINE

**The fingerprint any kill-count-free bound on the residue-deleted maxsum must
reproduce is now on disk in full — nine folds, 5→7 through 31→37, every copy
printed — and it has one exact structure in it that the corpus had explicitly
recorded as absent: the curve is a PALINDROME.** The tile's known mirror
(GLOSSARY "Mirror") conjugates the hole pair `{a, a−2}` into `{w−a, w−a−2}`
where `w = W mod p`, so `Δ_m(x,p,a) = Δ_m(x,p,(w−a) mod p)` for every `m` and
every alignment outside four specials — and the ONLY symmetry-breaking point is
the edge slot `W−1`, the natal cohort's birth canal, where the identity degrades
to the one-sided `Δ_m(edge-striking a) ≥ Δ_m(its mirror)` with an exact
correction term (the Mirror-Sweep Lemma, §4, PROVEN and VERIFIED exhaustively).
`attack-0c0e-01`'s reading 5 states the argmax sets "carry no arithmetic
pattern"; they carry exactly this one — every argmax set at every fold from
7→11 up, measured here and there, is closed under `a ↦ w−a`, and the single
exception, 5→7, is the licensed one: its unique argmax IS the seam-striking
alignment. That reading-5 sentence is a held correction candidate for the
integration pass.

Second finding, and it bears directly on 0c's framing: **at depth the kill
count carries no information about the degradation.** At folds 5→7 and 7→11 the
copies with more kills degrade more; by 17→19 the split is exactly flat
(144.7 against 144.7); at 23→29 it has REVERSED (232.3 against 235.7). A bound
that goes through a kill count is conditioning on a variable the object has
decoupled from — measured support, not proof, for 0c's premise that the
kill-free frame is the right one.

**What this is not.** Nothing here bounds `Δ_m`. Per the PRICE RIDER (TODO 0c,
2026-08-19) nothing here re-prices the exact levels — the L-bridge still floors
at ≈ 0.183x whatever the curve shows — and the 0c×0e composition stays CLOSED;
no level-selection claim is made. Per the standing blind-kill record
(`scanstat2.md`, `scanstat-t37.md`) nothing here is fitted: the deliverable is
the values, the proven symmetry that halves them, and words.

---

## 1. Brief correction: "natal@5→7", corpus reading

The brief wrote "natal@5→7 — the natal frame passing from level 5 to 7". In
the corpus **natal@p is a cohort, not a frame**: the born-at-p slots
`{kW−1 : 1 ≤ k ≤ p−1, k ≢ ±W^{−1} (mod p)}` (GLOSSARY "Natal set @p",
`FOLD-PROFILE.md`). The frame in which two holes sweep is the **copy
decomposition of a fold** (`U-FRAME.md` §5a step 1, PROVEN): folding `T_x` by
`p` lays `p` copies of the old tile and copy `k` deletes exactly the old slots
whose residue mod `p` lies in `{a(k), a(k)−2}`, `a(k) = −k·(W mod p) mod p`.
The brief is read as **the fold 5→7 (T_5 → T_7) seen copy by copy**, extended
up the ladder to 31→37 for the fingerprint to be a curve rather than seven
points. The reading keeps the word "natal" honest, because the probe's one
structural surprise (§4) lives exactly at the seam slot the natal vocabulary
names. [Correction recorded; the producer's header carries the same note.]

## 2. The re-pricing, cited not re-derived (the brief's first move)

All numbers in this section are quoted from formally embedded artifacts; none
were recomputed here (standing compute rule).

**The plain exact maxsum family (`maxsum_m(T_x)`) — where it lives and what it
cost.** One pointer in the brief needs correcting: the 7-level exact H ladder's
home is `history/staging/scanstat2.md` + `history/staging/scanstat-t37.md`
(producers `import-scanstat-04-score.js`, `scanstat2-01-t31.js`,
`scanstat-t37-04-run.js`), not `attack-foldL-05-maxsum-direct.md` — foldL-05 is
the bridge-floor and threshold-certificate home, and its tables are `H_cert`,
not the exact family.

| level | `ln D` | `maxsum₁ = G₂` | H ± se | engine cost | artifact |
|---|---|---|---|---|---|
| T₁₃ | 7.3032 | 66 | 0.2661 ± 0.0230 | in-memory | `scanstat2.md` table |
| T₁₇ | 10.0112 | 108 | 0.2804 ± 0.0189 | in-memory | ibid. |
| T₁₉ | 12.8444 | 150 | 0.3001 ± 0.0130 | in-memory | ibid. |
| T₂₃ | 15.8890 | 204 | 0.3216 ± 0.0096 | `import-scanstat-04-score.js` | ibid. |
| T₂₉ | 19.1848 | 258 | 0.3367 ± 0.0080 | ibid. | ibid. |
| T₃₁ | 22.5521 | 348 | 0.3460 ± 0.0068 | **3029.3 s, one stream, constant memory** | `scanstat2-01-t31.js` |
| T₃₇ | 26.1074 | 528 | 0.3565 ± 0.0068 | **5 shards × 35.2 min**, 2.179·10¹¹ slots | `scanstat-t37-04-run.js` |

T₃₁'s family beyond m = 1 (from `scanstat2.md`): maxsum_m = 408, 540, 660,
1002, 1638, 2700 at m = 2, 4, 8, 16, 32, 64. T₃₇ carries the exhaustive
maximality certificate for `G₂(37#) = 528`. No exponent is quoted per the
twice-blind kill of the linear rule.

**The residue-deleted family (`Δ_m`, the 0c object).** Exact at folds
7→11 .. 29→31 in `attack-0c0e-01-deleted-family.js` (47.7 s total; m ≤ 8 in
memory to 23→29, m = 1 streamed at 29→31), min/mean/max embedded there. **This
run adds** the fold 5→7 (below 0c0e's range), the full per-copy curves at every
fold (0c0e embedded only summaries), and **31→37 as a new deepest exact family
level**, via a one-pass walker that computes all `p` alignments in a single
stream (§5; measured cost in the producer's tail — the whole nine-fold run,
6.23·10⁹-slot stream included, is one script execution).

**The next price points, stated so the CHEAP rule can bite later.** Fold 37→41
by the same one-pass walker is a single stream of T₃₇ (2.65·10¹¹ T₂₃-slot
visits against 7.15·10⁹ here); the 31→37 pass measured 588 s, so 37→41 prices
at roughly six hours unsharded, and it shards trivially by outer copy exactly
as `scanstat-t37` sharded. The m ≤ 8
ring at 29→31 (the column 0c0e priced at "near an hour") is unchanged by this
run — the walker is m = 1 only.

## 3. The named probe: fold 5→7, every copy, every meaningful m

`T_5 = {11, 17, 29}` mod 30, `w = 30 mod 7 = 2`, `G₂(5#) = 12`, edge slot 29
with residue 1 mod 7. The full table (killed slots, `Δ_1..Δ_3`, anatomy) is in
the producer's tail; the curve:

| copy k | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| holes a(k) | 0 | 5 | 3 | 1 | 6 | 4 | 2 |
| `Δ₁` | 12 | 18 | **30** | 24 | 18 | 18 | 12 |
| degradation | 0 | 6 | **18** | 12 | 6 | 6 | 0 |

Read: two copies are UNDEGRADED (their 2-set catches no slot — possible only
while `D < p`); the argmax is unique, at the copy whose holes `{3, 1}` kill
both 17 and the edge slot 29, leaving the single survivor 11 and the gap 30 =
`G₂(7#)` (copy theorem, re-verified); and the curve is the palindrome
`C(k) = C(6−k)` at `k = 0↔6, 1↔5`, broken exactly at the seam pair `k = 2↔4`
(30 against 18) — the fold's whole record is a seam-strike event at this level.
[VERIFIED, exact]

## 4. The Mirror-Sweep Lemma [PROVEN here; VERIFIED exhaustively]

> **Lemma.** Let `σ(s) = W−2−s` on `T_x` (the corpus mirror: it maps the tile
> to itself, reverses cyclic order — so every `maxsum_m` is invariant — and
> fixes exactly one slot, the edge `W−1`). Let `w = W mod p`. Then σ is
> integer-exact on every non-edge slot, so it conjugates the deletion classes
> `{a, a−2} (mod p)` into `{w−a, w−a−2}`. Hence
>
> (i) `Δ_m(x,p,a) = Δ_m(x,p,(w−a) mod p)` for **all m**, for every `a` outside
> the specials `{1, w−1, w+1, p−1}`;
>
> (ii) in copy order the sweep curve is a **palindrome**, `C(k) = C(p−1−k)`
> (since `a(k) + a(p−1−k) ≡ w`), broken only at seam-striking copies;
>
> (iii) at `a ∈ {w−1, w+1}` — precisely the two alignments that strike the
> edge slot — the exact anomaly
> `Δ_m(a) = maxsum_m(config(w−a) minus the edge slot)` holds, so
> `Δ_m(a) ≥ Δ_m(w−a)`: **the seam side never loses.**
>
> *Proof.* σ(del_a) agrees with del_{w−a} on non-edge slots because
> `s ≡ a ⇒ σ(s) ≡ w−2−a` and `s ≡ a−2 ⇒ σ(s) ≡ w−a`, with no representative
> wrap for `s ≤ W−3` (slots are ≡ 5 mod 6, so only `W−1` wraps); the edge slot
> is σ-fixed but its residue `w−1` transforms wrongly, which is (iii)'s extra
> deleted slot; deleting one more slot only merges gaps. ∎

Verified: every non-special mirror pair equal **at every m ≤ 8** at all seven
in-memory folds (2/2, 4/4, 5/5, 7/7, 8/8, 10/10, 13/13 pairs), the exact
anomaly (iii) equal at every fold, mirror pairs equal at m = 1 on both streamed
folds, and the one-sided inequality never violated. Strict breaks are RARE at m = 1:
exactly one in the whole nine-fold run — at 5→7 itself (30 against 18), where
the seam-strike IS the fold's record. At every fold above it the seam anomaly
degrades to equality at m = 1: at 29→31 the seam copies read 330/318 against
mirrors 330/318, at 31→37 they read 510/420 against 510/420. [VERIFIED]

**What the lemma is worth.** It halves the fingerprint — `(p+1)/2` free values
per fold — and it is inherited FREE by any kill-count-free argument, since it
never mentions kills. And it corrects a recorded reading: `attack-0c0e-01`
reading 5's "the argmax sets carry no arithmetic pattern" — the sets
`{5,7}@7→11 (w=1)`, all-but-11`@11→13 (w=9`, 11 is the mirror-fixed point`)`,
`{5,10,19}@19→23 (w=15)`, `{2,15}@23→29 (w=17)`, `{7,12,23,27}@29→31 (w=19)`
are each closed under `a ↦ w−a`. HELD, not integrated.

## 5. The full curves, and the shape in words

All nine curves are embedded in the producer's tail (SEC 1, 3, 4). Summary
descriptors, m = 1 (SEC 5 of the tail; 29→31 and 31→37 rows from SEC 4):

| fold | min/G₂old | mean/G₂old | max/G₂old | max/min | #atMax | #distinct values |
|---|---|---|---|---|---|---|
| 5→7 | 1.0000 | 1.5714 | 2.5000 | 2.5000 | 1 of 7 | 4 |
| 7→11 | 1.0000 | 1.1455 | 1.4000 | 1.4000 | 2 of 11 | 3 |
| 11→13 | 1.1429 | 1.5385 | 1.5714 | 1.3750 | 12 of 13 | 2 |
| 13→17 | 1.3636 | 1.5561 | 1.6364 | 1.2000 | 10 of 17 | 3 |
| 17→19 | 1.2778 | 1.3421 | 1.3889 | 1.0870 | 11 of 19 | 2 |
| 19→23 | 1.2000 | 1.2661 | 1.3600 | 1.1333 | 3 of 23 | 5 |
| 23→29 | 1.0882 | 1.1471 | 1.2647 | 1.1622 | 2 of 29 | 5 |
| 29→31 | 1.2326 | 1.2731 | 1.3488 | 1.0943 | 4 of 31 | 3 |
| 31→37 | 1.1552 | 1.2549 | 1.5172 | 1.3134 | 2 of 37 | 8 |

**The shape, in words.** The curve is not a bump and not a noise floor: it is a
**flat quantized plateau structure with rare spikes**. Every value is a
multiple of 6 (all tile gaps are), the number of distinct values is tiny (2 to
8 among up to 37 copies), the bulk of every curve from 17→19 up sits within a
factor ≤ 1.10 of its own floor, and the floor sits strictly ABOVE the old
record from 11→13 on —
every copy's holes merge enough somewhere to beat `G₂(old)` outright. On top of
the plateau sit one to a few spikes (the argmax copies plus, at 31→37, a
second tier at 510 and 462 against a 402-426 bulk), at positions that are
mirror-symmetric but carry no other visible arithmetic; the mirror pairs force
the whole picture to read the same left-to-right as right-to-left, with the
seam copies the only licensed asymmetry. The spike amplitude carries no trend:
max/min reads 2.5000, 1.4000, 1.3750, 1.2000, 1.0870, 1.1333, 1.1622, 1.0943
over 5→7 .. 29→31 — falling overall but non-monotone — and then jumps back to
1.3134 at 31→37, where the record copy degrades by 180 against a bulk of
60-84. Undegraded copies exist only while
`D < p` (5→7 and 7→11), i.e. only while a 2-set can be empty; from 11→13 the
kill law's two-per-slot coverage makes zero degradation impossible in every
copy. [MEASURED; the D < p mechanism is one line and PROVEN]

**Kill-count decoupling.** Splitting each fold's copies at the median kill
count, the high-kill half's mean `Δ₁` against the low-kill half's reads
22.0/14.0 at 5→7, 36.0/31.2 at 7→11, 105.0/102.0 at 13→17, 144.7/144.7 at
17→19, 189.3/189.3 at 19→23, and **232.3/235.7 at 23→29 — reversed**. At depth
the per-copy kill count concentrates at `2D/p` and stops predicting anything;
what moves `Δ₁` is where the holes land relative to the record-gap
neighbourhoods, not how many slots they take. [MEASURED]

## 6. What a kill-count-free argument must reproduce

The fingerprint, enumerated, for any candidate 0c bound `Δ_m(x,p,a) ≤ B(x,p,a)`:

1. **The floor.** `min_a Δ₁/G₂(old)` = 1.09 to 1.36 at every fold from 11→13 —
   a bound family that cannot see the worst alignment already exceeding the old
   record by ~10-35% is measuring something else.
2. **The mirror.** `B` must be (or may be assumed) invariant under
   `a ↦ w−a` away from the four specials, and one-sidedly seam-favouring at
   them — free structure, PROVEN, use it.
3. **The quantized plateau.** 2 to 8 distinct values per fold, the bulk within
   a factor 1.10 of the floor from 17→19 up; a bound with per-alignment
   resolution finer than the plateau is wasted resolution, and one with a
   spread factor ≫ 1.4 is loose by more than the whole curve varies.
4. **The spike multiplicity carries no law.** #atMax runs 1, 2, 12, 10, 11, 3,
   2, 4, 2 (5→7 .. 31→37) and max/min is non-monotone (1.09 at 29→31, 1.31 at
   31→37) — no trend; the argmax's position is mirror-closed
   and otherwise patternless on the evidence; do not build an argument that
   needs the extremal alignment to be special.
5. **No kill-count proxy.** The decoupling of §5 means any bound whose
   alignment-dependence enters through the copy's kill count is flat at depth
   and cannot reproduce 1-4.

## 7. NOT REACHED

- **No bound on `Δ_m`.** TODO 0c's ask remains untouched; this run built the
  target its answer must hit.
- **m ≥ 2 above fold 23→29.** The streamed folds are m = 1 only; the one-pass
  walker's ring generalisation was not built.
- **Fold 37→41.** Priced (§2), not run.
- **The plateau's value set.** WHY the curve takes 2-6 values (which merges are
  realisable) was not characterised; the anatomy columns (merges 2-4, old
  record contained at some folds not others) reproduce 0c0e's reading 6 and go
  no further.
- **The mirror-law refinement is HELD.** `attack-0c0e-01` reading 5 and any
  GLOSSARY note on the sweep symmetry await the adversarial pass; nothing
  live was edited.

## 8. Reproduction and custody

```
node research/attack-0c-holesweep-01.js 37     # full run, one process
node research/qc/embed.js --streams both --timeout 2400 research/attack-0c-holesweep-01.js -- 37
```

Custody inside the run: `D = ∏(q−2)` and the `G₂` ladder 6..204 from a
generator that never sieves; per-fold kill law `Σ_k alive = D(p−2)` exact; the
copy theorem re-verified at all m ≤ 8 for folds 5→7 .. 23→29 and at m = 1 at
29→31 (`max = 348 = G₂(31#)`) and 31→37 (`max = 528 = G₂(37#)`, whose
exhaustive certificate is `scanstat-t37.md`'s); min/mean/max reproduce
`attack-0c0e-01`'s embedded figures figure for figure at all six folds it
reached; and the one-pass walker is validated against the naive per-alignment
engine, all alignments, at all seven in-memory folds before either streamed
fold is trusted. The tail carries `code-sha256`/`out-sha256` and the exact
invocation.
