# The d=2 / d=4 identity in the hole gap word — proved

<!-- ledger
id: Q-d2-d4-bijection
status: ANSWERED
todo: none
question: Is Labos Elemer's 2001 remark on OEIS A059861, that d = 2 and d = 4 differences are equinumerous in the hole gap word, a theorem?
verdict: Proven, with a three-line proof and an explicit bijection (doubling on the odd part), both counts equal prod_{3<=p<=p_n}(p-2) = A059861(n), verified at P = 30, 210, 2310, 30030; the grain (twin gap word) analog is REFUTED, the apparent equalities at T_7 and T_11 breaking at T_13.
-->

Labos Elemer's unexplained 2001 remark on OEIS A059861 ("a(n) is the exact
number of d=2 and also d=4 differences in dRRS[modulus = n-th primorial]") is
a theorem with a three-line proof and an explicit bijection. Verified
numerically at P = 30, 210, 2310, 30030. The grain (twin gap word) analog is
REFUTED — the apparent equalities at T₇/T₁₁ break at T₁₃.

## Theorem

In the cyclic gap word of the holes (reduced residues) of the tile Tₙ (n ≥ 2,
i.e. 3 | width), the number of gaps of size 2 and the number of gaps of size 4
are both equal to ∏_{3≤p≤pₙ}(p−2) = A059861(n).

## Proof

**Lemma 1 (size-2 gaps are exactly distance-2 hole pairs).** A gap of size 2
at r requires only that r, r+2 be holes: the unique middle r+1 is even, hence
never a hole. The count of such pairs by CRT: mod 2, r odd (1 class); mod each
odd p, r must avoid {0, −2} — two distinct classes (p ∤ 2), leaving p−2. Total
∏(p−2). (This is the twin-slot census — Schemmel.)

**Lemma 2 (no hole triples in arithmetic progression of difference 2).** If
r, r+2, r+4 were all holes, then mod 3 they are r, r+2, r+1 — all three
residue classes, so one is ≡ 0 (mod 3) and is not a hole. Contradiction. So
for every tile with 3 in the wheel, NO configuration r, r+2, r+4 of three
holes exists. (Verified: zero triples at all four test levels.)

**Lemma 3 (size-4 gaps are exactly distance-4 hole pairs).** A gap of size 4
at r requires r, r+4 holes and r+1, r+2, r+3 non-holes. The middles r+1, r+3
are even (automatic); the middle r+2 must be a non-hole — which is automatic
by Lemma 2 (else r, r+2, r+4 would be a hole triple). The count of distance-4
pairs by CRT: mod 2, r odd; mod 3, r must avoid {0, −4} ≡ {0, 2} — leaving 1
class = 3−2; mod each p ≥ 5, r avoids {0, −4}, two distinct classes (p ∤ 4),
leaving p−2. Total ∏(p−2). ∎

## The explicit bijection (doubling on the odd part)

Define ψ(r) by CRT: ψ(r) ≡ 2r (mod width/2) and ψ(r) odd. For every odd
p | width: ψ(r) avoids {0, −4} mod p ⟺ 2r avoids {0, −4} ⟺ r avoids
{0, −2}. So ψ maps distance-2 hole pairs bijectively onto distance-4 hole
pairs (inverse: halving on the odd part). Verified exhaustively at P = 30
(11→7, 17→19, 29→13 — exactly the three d=4 starts) and P = 210 (all 15 map
to valid d=4 starts, distinct).

More generally the same map shows distance-d and distance-2d HOLE-PAIR counts
agree whenever d and 2d have the same odd part — but only sizes 2 and 4 have
automatic middle exclusion, so only they transfer to GAP counts. (Size-6+ gap
counts involve genuine middle combinatorics.)

## Verification (code + output)

```js
// gap word of holes mod P; count gaps by size; count hole triples r,r+2,r+4
// (script as run 2026-08-14; see conversation for full listing)
```
```
P=30:    gap2=3    gap4=3    predicted=3    triples=0
P=210:   gap2=15   gap4=15   predicted=15   triples=0
P=2310:  gap2=135  gap4=135  predicted=135  triples=0
P=30030: gap2=1485 gap4=1485 predicted=1485 triples=0
P=30  bijection: 11→7, 17→19, 29→13 — all valid d=4 starts
P=210 bijection: all 15 starts map to distinct valid d=4 starts
```

## The grain analog: REFUTED

The Twin Prime Grain (gap word of twin slots) showed suggestive equalities at
small tiles — #18 = #30 and #36 = #42 at both T₇ (2=2, absent) and T₁₁
(22=22, 4=4) — but they BREAK at T₁₃:

```
T11: 6x21  12x56  18x22  24x6  30x22  36x4  42x4      (#18=#30, #36=#42)
T13: 6x189 12x504 18x238 24x96 30x270 36x60 42x84 ... (#18≠#30: 238 vs 270)
T17: 6x2457 ... 18x3374 ... 30x4230 ...               (no equal pairs at all)
```

No forced equal-count law exists in the grain; the small-tile equalities were
coincidences (consistent with the mod-5 local factors differing for distances
18 and 30: the pair-level counts already disagree, so any equality had to be
a middle-combinatorics accident). The d2=d4 phenomenon is specific to the
single-hole word, where Lemma 2's mod-3 obstruction does the magic.

## Status

- The identity: PROVEN (elementary; suitable as an OEIS comment on A059861
  with the one-line mechanism, or a remark in Paper I/IV).
- The bijection: explicit, verified.
- Grain analog: refuted with data (a useful negative — the grain census
  distribution remains lawless pending the correlation computation).
