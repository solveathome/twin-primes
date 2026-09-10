# Prime-comb equidistribution in the tail regime: the defect measured exactly at @11..@29, and what the Comb Discrepancy Lemma's own method says there

<!-- ledger
id: Q-comb-tail-0830
status: PARTIAL
todo: 8
question: Can TODO item 8's remaining part (b), prime-comb equidistribution in the tail regime, be proven at the depths the certificate needs, or at least measured and priced at the enumerable levels (8b)?
verdict: Not proven and no exponent moves: the tail defect is measured exactly for the first time (signed -0.01% of the tail main term at @23, -0.00% at @29, unsigned 0.60% and 0.25%, smaller than the head's 1.00% in aggregate but 8 to 37% per prime at its worst), the Comb Discrepancy Lemma's method fails in the tail on its MAIN TERM (off by a derived factor e^gamma(1/u - q^(1-u)), measured aggregate 1.14x at @23) before its error term (10^27 x main), the prime-comb Legendre form has 2^(k+2) terms of which the short ones obey the lemma's <1 bound and the long ones are prime-in-AP discrepancies whose term-by-term sum is 11.2% of main at @23 against a signed -0.01%; the all-x form at K = 0 is Theorem C (PROVEN, limit only) and at the certificate's depth K* the non-closing step is a kappa = 1 asymptotic at sifting parameter s < 2, a proof gap on data that show B_tail = 0.998-1.000 at K* through @29; the full-depth half is 8(a), CLOSED.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-engine.md`, which
> reproduced the tail defect at @11–@23 and the 419,328-term Legendre split
> with zero exactness failures).** Two corrections: the main-term factor is
> DERIVED from ∏(1 − 1/q_i) but MEASURED against ∏(1 − 1/(q_i − 1)) — which is
> also what `natal-cap-28…js`:283 and `certificate-engine.md` §1 compute
> against — a 0.9% difference at @23 that moves nothing certified; and §30's
> "F₁ ∈ [1.5, 4]" misquotes its source, which says [1.5, 3] and makes no
> statement at s < 1.

**2026-08-30. TODO item 8, remaining part (b). Staging note, HELD, no
adversarial pass. Producer: `attack-0830-comb-tail.js`, embedded (121 output
lines), every anchor asserted before a new number prints. No live file was
touched. Every number below is quoted from that OUTPUT block or from an
embedded artifact cited by file, and every inequality's direction is stated.**

## 0. What is open, and only then what moved

- **Nothing is proven here and no exponent moves.** The deliverable is a
  finite-level table with the tail's defect measured for the first time, a
  derivation of why the Comb Discrepancy Lemma's method cannot be carried
  into the tail, and a located non-closing step. That is the base rate the
  brief named, and it is what happened.
- **The head is still the only certified region.** The tail's mass is 30.16%
  of Σcap₂ at @23 and 25.56% at @29 (OUTPUT, SUMMARY column 4), falling with
  x; certifying it would lift the certified share from the engine's 22.93%
  to at most 53.09% at @23 [ARITHMETIC on two OUTPUT figures]. No instrument
  in this corpus delivers that certificate at any finite level: the tightest
  legal upper bound in the tail at the certificate's depth is loose by
  F₁ ∈ [1.5, 4] (`attack-0830-buchstab-deep.md` §6 [CITED], re-derived in §5
  below), against a budget of 0.34% of the tail's own mass at @23.
- **Part (b) splits three ways and two of the three are already settled
  elsewhere.** At K = 0 and shallow K in the limit it is Theorem C
  (`thm-capK-bv.md` §2, PROVEN, empty at every run level). At full depth in
  the tail (q_K → q) the naive statement with main term δ_K is FALSE on the
  record (B_true = 0.9044 at q = 4001, `attack-0830-buchstab-deep.md` SEC 3
  [CITED]) and its corrected form is 8(a), CLOSED as a sieve route on
  2026-08-30. What is left to (b), and is measured here, is the finite-level
  form at K = 0 and at the certificate's own depth K*. §6.
- **What moved.** (i) The tail defect E(q) = cap₂(q) − s − dP·(π(A) + π(B)
  − 2π(q−1)) is computed exactly at every tail prime at @11..@29 (9 to 7589
  primes per level), together with its Legendre decomposition over the mids
  into 2^{k+2} prime-in-AP terms, split by modulus range. (ii) The same at
  depth K* against the δ_{K*} main term. (iii) The engine's head-share and
  tail-envelope figures reproduce to the printed digit as custody. §3.

## 1. The statement, as `attack-0830-buchstab-deep.md` §6 scopes it (deliverable a)

Level x, W = x#, mids 7 ≤ p ≤ x, k = #mids, scour primes x < q ≤ √W. Tail:
q³ > W + 1, where every admissible cofactor m of a fresh victim v = qm is
prime with m ≥ q (`thm-mod30-tail.md` §2(a) via `staircase-note.md` Lemma 1,
[CITED]). With A = ⌊(W−1)/q⌋, B = ⌊(W+1)/q⌋ and T for either,

    cap₂(q) − s(q) = #{m prime, q ≤ m ≤ A, qm ≡ 11,17 (30), qm ≢ −2 (p) ∀ mids}
                   + #{m prime, q ≤ m ≤ B, qm ≡ 13,19 (30), qm ≢ +2 (p) ∀ mids},

and at depth K the K freshness classes m ≢ ∓2q⁻¹ (mod q_i), i ≤ K, are
added (one class per prime, `thm-capK-bv.md` §1 [CITED]). **Statement
(b), K = 0:** cap₂(q) − s = dP·(π(A) + π(B) − 2π(q−1))·(1 + η(q)) with
dP = (1/4)∏_{mids}(1 − 1/(p−1)), and Σ_{tail}(cap₂ − s)·|η| small against
the floor N − Σ_q cap_{K*}(q), uniformly in the tail. **At depth K:** the
same with dP replaced by δ_K = dP·∏_{i≤K}(1 − 1/(q_i − 1)). The quantifier
the certificate needs is **for every x** at **K = K*(x)**, and only the
**upper** half, cap_K(q) ≤ main·(1 + η), enters the pigeonhole floor
N − Σ cap_K (the legal direction, `attack-wrongdirection-audit.md` §1
[CITED]; an upper bound on a cap is a lower bound on survivors).

**Rung.** At K = 0 and q_K = W^{o(1)}: PROVEN in the limit, ineffective,
empty below x = 263 (Theorem C, `thm-capK-bv.md` §4 [CITED]). At K = K*
with q_{K*} a power of T: OPEN, HEURISTIC in the engine. At full depth:
the δ_K form is REFUTED on the data and the B-corrected form is 8(a), CLOSED.
Finite level, any K: MEASURED only (this note and the Tail Envelope
Measurement).

**What it would buy the engine, from the engine's own ledger.** The certified
head carries 9.69 / 17.40 / 22.93% of Σcap₂ at @17 / @19 / @23
(`natal-cap-28` OUTPUT [CITED], reproduced here to the digit). The tail
carries 43.32 / 35.81 / 30.16% of Σcap₂ and 42.65 / 33.61 / 26.70% of
Σcap_{K*} at the same levels, 25.56% and 21.06% at @29 (OUTPUT SUMMARY). A
proven tail bound with error η would add the tail's share to the certified
share at that level, so at most 22.93 + 30.16 = 53.09% at @23, and the
budget it must meet is floor / Σ_{tail}(cap_{K*} − s) = 4841 / 1413605 =
0.34% at @23 and 31327 / 30129475 = 0.10% at @29 [ARITHMETIC on OUTPUT
figures]. The tail's share falls with x (75% at @11 to 25.56% at @29), so
this is a finite-level gain that shrinks, not a route.

## 2. Legality and direction

Every statement attacked below is a finite computation or a per-prime
asymptotic for a κ = 1 sifted prime count; none is a window statement, so
Axis A of the wrong-direction test does not apply. The all-x K = 0 form is
already a theorem in the limit, hence not TPC-strength. The full-depth
form is a count of primes m ≤ T with qm ± 2 ∈ P₂, parity-blocked
(`bv-import-survey.md` §3.3 [CITED]); whether it is TPC-strength is NOT
DETERMINED here and it is not attacked here. The only inequality used in
the certificate's direction is cap_K(q) ≤ main·(1 + η): an upper bound on
the cap, which lowers Σcap and raises the floor, legal.

## 3. The finite-level measurement (deliverable b)

Custody first, all asserted in the producer before any new figure prints:
Σcap₂ = 56 / 880 / 16135 / 308401 / 7034588 at @11..@23 (cap-08, cap-28
CHECK); tail counts and tail Σcap₂ = (9, 42) / (29, 485) / (105, 6989) /
(396, 110439) / (1638, 2121291) / (7589, 51660643) at @11..@29 (cap-08
bands, cap-11, cap-18 OUTPUT); CERT n = 0/1/3/6 with shares 0.00 / 9.69 /
17.40 / 22.93%, PRIME agg π-form −1.05 / −0.49 / 0.01 / 0.01% and maxrel
8.33 / 15.26 / 26.31 / 26.59% (cap-28 OUTPUT, matched as printed strings);
the nine @11 per-prime tail rows (cap-08); floors 34 / 110 / 82 / 1877 /
4841 at K* = 0/0/2/10/27. All pass. At @29 the head is not enumerated (the
lpf array would be 2.1·10⁸ entries) and Σcap_{69} = 143107823 is cited from
cap-18's floor.

**The tail defect at K = 0** (OUTPUT, SUMMARY; percentages of the tail main
term Σ dP·(π(A) + π(B) − 2π(q−1))):

| level | tail n | E signed | Σ\|E\| | max \|E\|/cap₂ at cap₂ ≥ 20 | sign split +/− | head Σ\|cap₂ − mainC\| (all head q) |
|---|---|---|---|---|---|---|
| @11 | 9 | −6.03% | 14.92% | 0.00% (no q with cap₂ ≥ 20) | 4/5 | 5.744% |
| @13 | 29 | 1.09% | 6.50% | 8.33% | 16/13 | 1.252% |
| @17 | 105 | 0.50% | 2.85% | 15.26% | 54/51 | 0.694% |
| @19 | 396 | −0.01% | 1.42% | 26.31% | 183/213 | 0.911% |
| @23 | 1638 | −0.01% | 0.60% | 26.59% | 813/825 | 0.999% |
| @29 | 7589 | −0.00% | 0.25% | 37.41% | 3772/3817 | not enumerated |

**Reading, calibrated MEASURED.** Per prime the tail defect is LARGER than
the head's: its worst relative error grows with level (8.33% to 37.41%,
attained at small caps of order 20 where a prime count fluctuates by
its own square root) against 0.01 to 0.40% at the certified head (cap-28
OUTPUT). In aggregate it is SMALLER from @23 on: Σ|E| is 0.60% of main at
@23 and 0.25% at @29 against the head's 1.00% at @23, and it falls roughly
by half per fold while the head's holds near 1%. The signed aggregate is
below 0.01% from @19 on, the sign split is even at every level, and the
signed value is inside the floor's budget of §1 at @19, @23 and @29 while
the unsigned one is not (0.60% against 0.34% at @23, 0.25% against 0.10%
at @29). So an aggregate certificate is consistent with the data and a
per-prime one is not, at every level that exists.

**At depth K*** (OUTPUT, "tail K=K*" lines): Σ_{tail}(cap_{K*} − s) against
the δ_{K*} main term reads −6.03 / 1.09 / 0.39 / −0.19 / 0.00 / −0.07%
signed and 14.92 / 6.50 / 3.33 / 2.42 / 1.08 / 0.54% unsigned at @11..@29,
and the engine's product form (cap₂ − s)·∏_{i≤K*}(1 − 1/(q_i − 1)) gives
B_tail = 1.0000 / 1.0000 / 0.9989 / 0.9983 / 1.0001 / 0.9994. At K* the
tail is in the regime where the Buchstab factor is 1 to four digits,
although Theorem C's hypothesis q_K = T^{o(1)} is formally violated there
(ln q_{27}/ln T = ln 131/ln T runs 0.38 to 0.51 across the @23 tail
[ARITHMETIC]).

## 4. The Comb Discrepancy Lemma's method in the tail (deliverable c)

**4.1 The lemma as the engine uses it, carried into the tail, is true and
says nothing, and it fails on the main term before the error term.** The
Certified-Head Theorem's bound |cap₂(q) − mainC(q)| ≤ 2^{j+1}(2·3^k + 1),
mainC = s + (A + B)·(N/W)·∏_{i<j}(1 − 1/q_i) − [1 ∈ comb_A] − [1 ∈ comb_B],
holds at every scour prime including the tail (Legendre over the j scour
primes below q, `certificate-engine.md` §1). In the tail j is 102 to 1738 at
@23, so the bound is 7.40·10³³ summed over the head alone and 1.50·10²⁷
times the head's main term (OUTPUT @23 "head" line); in the tail it is
larger still. That is the vacuity everyone expected. The point not on the
record before is the main term: **mainC is not asymptotic to cap₂ in the
tail.** Legendre's main term T·(N/W)·∏_{x<q_i<q}(1 − 1/q_i) sifts by all
primes below q while T < q², so it carries the Mertens product where the
count carries a prime count. With u = ln T/ln q ∈ (1, 2]:

    (mP − s)/(mainC − s) = dP·(π(T) − π(q−1)) / ((N/W)·T·∏_{x<q_i<q}(1 − 1/q_i))
                         → e^γ · (1/u − q^{1−u})          as x → ∞,  [DERIVED]

using dP/(N/W) = (15/4)/∏_{mids}(1 − 1/p), ∏_{x<q_i<q}(1 − 1/q_i) =
∏_{p<q}(1 − 1/p)/((4/15)∏_{mids}(1 − 1/p)), Mertens ∏_{p<q}(1 − 1/p) ~
e^{−γ}/ln q and π(T) − π(q−1) ~ T/ln T − q/ln q. On [1, 2] this is
e^γ·ω(u) minus the q^{1−u} tail correction, so the lemma's own main term is
off by the Buchstab factor 0.89 at the tail's start (u = 2) and by an
unbounded factor at its end (u → 1, where the count vanishes and the
Legendre main term does not). MEASURED: the exact ratio Σ(mP − s)/Σ(mainC −
s) reads 0.9585 / 1.0254 / 1.0824 / 1.1202 / 1.1443 / 1.1623 at @11..@29,
per prime 0.9827 at q = 607 and 0.0093 at q = 14897 at @23 (OUTPUT). The
asymptotic form, weighted the same way, reads 1.0262 at @23 and 1.0607 at
@29, 10 to 12% below the exact ratio; the gap is the finite-level
π(T)/(T/ln T) and Mertens corrections and is NOT separately verified here.
So the method that certifies the head cannot be extended into the tail by
any improvement of its constant: its main term is the wrong object there.

**4.2 The prime-comb Legendre form, which has the right main term, and
where its per-term bound survives.** For prime m ≥ q the comb in
m-coordinates is one forbidden class per mid (m ≢ ∓2q⁻¹ (mod p); m ≡ 0 is
impossible) and one of two unit classes c mod 30, so Legendre over the mids
alone gives, per (side, c),

    Σ_{d | M} (−1)^{ω(d)} · #{m prime in [q, T] : m ≡ c (30), m ≡ ω_p (p) ∀ p | d},

2^k terms per (side, c), 2^{k+2} in all (256 at @23 against the integer
comb's 2·3^k = 1458), each a prime count in ONE arithmetic progression to
modulus 30d against its share (π(T) − π(q−1))/φ(30d); the shares sum to the
dP main term exactly [DERIVED, and asserted per prime in the producer:
signed term sum = cap₂ − s, signed defect sum = E(q), to 10⁻⁶]. The lemma's
per-term bound "off its share by less than 1" is a theorem exactly for the
terms whose progression holds at most one integer of [q, T], i.e. 30d ≥
T − q + 1 (**short** terms; asserted < 1 at every term at every level). The
remaining (**long**) terms are prime-in-AP discrepancies at moduli 30d < T:
BV range 30d ≤ √T, EH range √T < 30d < T. Measured, as a share of the tail
main term (OUTPUT, SUMMARY column 7 and the "lemma-method" lines):

| level | terms per q | L1 = Σ\|terms\| | of which BV / EH / short | signed E by range BV / EH / short | L1 / Σ\|E\| |
|---|---|---|---|---|---|
| @13 | 32 | 57.86% | 0.00 / 30.10 / 27.76% | 0.0 / 4.8 / 0.2 (counts) | 8.9× |
| @17 | 64 | 34.74% | 5.70 / 17.38 / 11.67% | 21.0 / 10.1 / 3.3 | 12.2× |
| @19 | 128 | 20.39% | 3.07 / 13.03 / 4.28% | 3.3 / 13.1 / −30.0 | 14.3× |
| @23 | 256 | 11.20% | 1.97 / 7.72 / 1.51% | −1.3 / −305.4 / 109.0 | 18.6× |
| @29 | 512 | 5.67% | 1.60 / 3.60 / 0.47% | −782.2 / 240.4 / 21.8 | 23.0× |

**What the lemma's method gives in the tail, then, is this finite-level
theorem and nothing past it:** |E(q) − Σ_{long} (−1)^{ω(d)} Δ_d| < #short
terms ≤ 2^{k+2}, PROVEN per prime, with the long terms left as computed
prime-in-AP discrepancies. At @23 the short part is bounded by 256 per prime
and measured at 1.51% of main in L1 with a signed total of +109 on a main
of 2.12·10⁶; the long part is 9.69% of main in L1 and −306.7 signed. The
term-by-term sum is 19 to 23 times the actual unsigned defect at @23 and
@29 and 33 times the @23 budget; the EH-range moduli carry the most of it
at every level from @17. So even with every long term evaluated exactly,
absolute-value summation certifies nothing at any level that exists, and the
whole of the tail's accuracy is cancellation among signed prime-in-AP
discrepancies, which no lemma of this shape prices.

**The brief's "the tail regime's blocks are longer and fewer."** Fewer, yes:
2^{k+2} against 2·3^k, because the class m ≡ 0 (p) drops for prime m.
Longer, no: the window T = W/q is shorter in the tail (T < W^{2/3}) than
in the head, and the moduli 30d are the same objects; what is true is that
more of the terms are short in the lemma's sense (30d ≥ T − q + 1),
269504 of 419328 at @23 [OUTPUT counts].

## 5. The single step that does not close for the all-x form (deliverable d)

Take the statement at the quantifier the certificate needs, every x at
K = K*(x), upper half. Its proof would run: fundamental lemma on the
primes in [q, T] sifted by the primes in [7, q_{K*}], remainder by a
distribution theorem to level D. The sifting parameter is s = ln D/ln
q_{K*}. At the engine's own crossing depth ρ = ln q_{K*}/ln T runs 0.422 to
0.562 at @97 (`attack-0830-buchstab-deep.md` §6, from `natal-cap-28`'s y*
column [CITED]), so s = 1.186 → 0.889 under BV and 2.372 → 1.779 under EH.
**The step that does not close is the asymptotic itself at s < 2:** the
linear sieve gives an upper bound F₁(s) = 2e^γ/s, i.e. 1.5 to 4.0 times the
main term across the tail under BV or EH, a lower bound only for s > 2, and
an asymptotic only as s → ∞ (the fundamental lemma, whose factor is below 1
first at x = 263 even at K = 0, `thm-capK-bv.md` §4 [CITED]). The
certificate's budget is 0.34% at @23 and 0.10% at @29 (§1), against a
loss factor of 1.5 at best.

**Grade: a proof gap, not a truth gap, on the data.** At K* the δ_{K*} main
term matches the tail to 0.00% signed at @23 and −0.07% at @29 with
B_tail within 0.002 of 1 at every level (§3), so the asymptotic the step
would prove is consistent with everything measured; what is missing is an
instrument for a κ = 1 asymptotic at bounded s below the sifting limit,
which the corpus has searched for at κ = 2 (`REFUTED.md`, β₂ row) and which
does not exist at κ = 1 either below s = 2 (Iwaniec's linear sieve is the
sharp instrument, and its f₁(s) = 0 for s ≤ 2 is the statement). It becomes
a truth gap only at full depth, where the δ_K form is refuted by B_true =
0.9044 (q = 4001, @23 [CITED]); that is 8(a)'s object and is CLOSED. Whether
the certificate's depth stays at ρ ≈ 0.42 to 0.56 for all x, or drifts
toward the full-depth regime, is the open question of `u2-engine-depth.md`
(measured u = 4.191 → 3.557 and falling, ANSWERED as not yet at 2 [CITED]).

## 6. Kill check: does (b) reduce to 8(a) or to a REFUTED row

Partly, and the note marks it. (i) The full-depth tail statement IS 8(a)'s
object at tail q (the Buchstab factor between the product and the count),
CLOSED as a sieve route, 2026-08-30; nothing here reopens it. (ii) The
shallow-K limit statement IS Theorem C, PROVEN and empty. (iii) The
finite-level and K* form measured here is neither: it is what
`certificate-engine.md` §2 calls the Tail Envelope Measurement, now with the
per-prime defect, its Legendre anatomy and its K* form on the record. No
`REFUTED.md` row covers it; none is proposed, since a measurement is not a
route. Status of 8(b): PARTIAL, and the part that is still open is a proof
gap at bounded sifting parameter that no instrument in the corpus addresses.

## 7. Brief errors and defects noticed in passing

- "the tail regime's blocks are longer and fewer": fewer holds, longer does
  not (§4.2).
- "head share is certified at 28-29%": that is `comb-discrepancy-tight.md`
  §5's per-dilation figure, scratchpad-grade with no embedded OUTPUT; the
  engine's embedded figure is 22.93% at @23, and the sum 53.09% in §1 uses
  the embedded one.
- `certificate-engine.md` §2 says the K = 0 tail statement "is exactly the
  statement above" of Theorem C; at finite level the statement the engine
  uses is at K = K*, where q_{K*} is already T^{0.38..0.51} at @23 and
  Theorem C's hypothesis does not hold. Wording; nothing downstream moves.
- The engine's tail envelope quotes "aggregate |err| 0.0-1.1% of tail mass":
  that is the signed aggregate. The unsigned one is 6.50 / 2.85 / 1.42 /
  0.60% at @13..@23, and it is the unsigned one a per-prime certificate
  would have to pay.

## 8. What would falsify this, and whether the check has run

| claim | falsifier | check |
|---|---|---|
| the per-prime defect E(q) is computed correctly | a mismatch with cap-08's @11 rows, the tail Σcap₂ anchors, or cap-28's PRIME agg and maxrel strings | RUN, all asserted, six levels |
| the Legendre decomposition is exact | signed term sum ≠ cap₂ − s, or signed defect sum ≠ E(q) | RUN, asserted at every tail prime, tolerance 10⁻⁶ |
| short terms obey the lemma's < 1 bound | any short term with \|Δ\| ≥ 1 | RUN, asserted at every short term |
| the main-term factor e^γ(1/u − q^{1−u}) | the exact ratio departing from it by more than the finite corrections | PARTIALLY: measured 10-12% above at @23-@29 with the corrections named, not separately computed |
| B_tail = 1 at K* | a level where Σ_{tail}(cap_{K*} − s) departs from the product by > 1% | RUN at six levels, worst 0.0017 |
| the non-closing step is a proof gap | a tail prime at K* where the δ_{K*} main term is off by an amount a sieve constant could not absorb | NOT RUN per prime at K*; only the aggregates are on the record |
| no @29 head figure | none computed | flagged, not a claim |
