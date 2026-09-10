# The stretch decomposition: S_k = [q_k^2, q_{k+1}^2) formalized, the Stretch Postulate placed strictly above the strong Zone Postulate, the delta split into a bounded rho(2) deficit and a diverging width margin, occupancy certified to 9.0e15, and the square anchor read exactly — real QR structure, zero advantage

<!-- ledger
id: Q-stretch-structure
status: ANSWERED
todo: Z3 (retired)
question: What is the stretch S_q = [q^2, q'^2) as an object, where does the Stretch Postulate sit against the Zone Postulate, and does the square anchor's QR structure buy any density advantage?
verdict: The implication chain and the QR kill law re-derive independently arrow by arrow; the anchor's structure is real, deterministic and redistribution-only (exactly two killed offset classes at every prime anchor checked), so there is structure and no advantage, and SP sits strictly above the strong Zone Postulate.
-->

*(2026-08-21. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/stretch-01.js` (0.9 s;
code-sha256 446167b9..., out-sha256 fb0be535...; the tail carries a forced
re-embed stamp from adding two printed figures before first publication —
0 of 152 figures in the replaced block changed, stamped in the fingerprint).
The frame is Chris's, from live discussion: between consecutive prime
squares the active destroyer set is frozen, the stretch is a finite window
of the periodic tile, and it is a finality window, so tile survivors there
are true twins. The producer verifies his hand anchors before printing
anything — 11 wakes at 121 with first prime 127, 13 wakes at 169 with first
prime 173, and [169, 289) feels only the moire of {7, 11, 13} — ABORTING on
any mismatch, then calibrates against natal-onset-01 (999 channel pairs,
203 survivors over 1..1e4), zonegap-01 (Z2(11) = 30, Z2(13) = 30, head and
tail digit-exact) and the adopted TOS/A113274 custody (sha-checked, 4051
rows, 75 starred records, record 41 = 8040 at 65095731749). Calibration
marked per claim: PROVEN, VERIFIED by exact computation, MEASURED, OPEN,
REFUTED. Conventions: pairs named by opener a; a pair is in S_q iff
q^2 <= a and a+2 < q'^2; offsets t = a - q^2.)*

## 0. The object, and whose vocabulary it is

For consecutive primes q < q', the **stretch** is S_q = [q^2, q'^2). This is
the GLOSSARY's *onset shell* of q read as a first-class interval object;
"stretch" is Chris's term for it and is adopted here. The stretches
partition [4, infinity), no twin pair straddles a boundary (a < q'^2 <= a+2
forces a+2 = q'^2, composite, or a+2 = q'^2 + 1, even — VERIFIED at every
boundary in the sieve range), and from q = 7 on the stretch is an UNWRAPPED
window of the tile T_q, since q'^2 < q# (121 < 210, 169 < 2310, 289 < 30030,
then ln q# ~ q against 2 ln q').

## 1. The decomposition, formalized and verified [PROVEN + VERIFIED]

- **Freeze (S1).** For every n in S_q, the destructive influencer set
  {r prime : r^2 <= n} is exactly {r <= q} — the wheel-frame reading is
  Chris's frozen {7..q}. One line from the q^2 first-fresh-kill rule
  (`research/natal-onset-01.js` §0 frame); verified integer by integer at
  all 25 stretches to q = 97. This is zonegap-02's D1 onset desert made
  into the grid itself: a stretch's interior contains no onset tread by
  construction.
- **Finality (S2).** Every destroyer of every position in S_q is active, so
  wheel-survivors are certified: openers a in S_q with lpf(a) > q and
  lpf(a+2) > q are EXACTLY the twin-prime openers there, as sets — the Zone
  Restriction Lemma (`zonegap-02-reduction.md` §1, Lemma A) restricted to
  S_q, which sits inside zone q. Verified set-equal at all 25 stretches.
- **Zone identity (S3).** With r0 the least prime whose square exceeds p,
  
  (p, p'^2) = (p, r0^2) ⊔ S_{r0} ⊔ ... ⊔ S_p,
  
  exactly pi(p) - pi(sqrt p) full stretches plus a head fragment (the
  fragment is the tail of the stretch containing p itself). The zone's LAST
  stretch is S_p = [p^2, p'^2). Verified digit-exact at p = 7, 11, 13, 17,
  23, 53, 97. Conversely one stretch serves many zones: S_q lies wholly
  inside zone p for every prime p in [q, q^2) — the overlap redundancy
  zonegap-01 §3 measured is exact and structural on this grid.

## 2. The Stretch Postulate, and its exact logical position

> **Stretch Postulate (SP).** Every stretch S_q contains a twin pair.
> **Weak form.** Infinitely many stretches do.

- **SP implies the strong Zone Postulate [PROVEN, containment].** S_p is a
  subset of zone p, and the tile's first hole above 1 is p' (zonegap-02 §1),
  so a pair in S_p is an in-zone pair: SP at p forces zone p occupied.
- **The converse containment FAILS [PROVEN].** No zone fits inside any
  stretch (p >= q^2 and p' <= q' force q^2 <= p <= q' < q^2 for q >= 3), so
  the strong Zone Postulate does not deliver SP by any interval argument —
  a zone can be occupied entirely below p^2 while its last stretch starves.
  Whether some non-containment derivation closes the gap is OPEN; the
  honest grade is **SP >= strong ZP, strictly positioned above it**.
- **Weak SP <=> TPC [PROVEN, both directions, elementary].** Occupied
  stretches are disjoint and finite, so infinitely many occupied stretches
  give infinitely many twins; conversely every twin pair with opener >= 5
  lies in exactly one stretch, and infinitely many twins cannot fit in
  finitely many finite stretches. The weak forms of SP and ZP coincide at
  TPC, exactly as ZONE-POSTULATE §2 has it for zones.
- **The upper neighbour [PROVEN implication, conjecture-conditional
  premise].** S_q is a union of consecutive integer-square windows
  [n^2, (n+1)^2), n = q..q'-1. So the A091592-completeness conjecture
  (no twin-free window (n^2, (n+1)^2) for n > 122; OEIS, tested to 1e7,
  keyword hard — ZONE-POSTULATE §5a carries the prior art) plus the finite
  check for q <= 109, which SEC B2's direct occupancy sweep to q = 9973
  subsumes, implies SP. The chain is
  
  A091592-complete ==> SP ==> strong ZP ==> weak ZP <=> TPC <=> weak SP.
  
- **The honest grade.** SP is TPC-strength (it implies TPC) and per-level
  strictly more demanding than zone occupancy: SP(p) demands a pair in the
  zone's DEEPEST stretch — the tread-free tail where zonegap-01 measured
  the binding gap loading. It is adopted as structure, not as need; the
  programme's minimal requirement stays the weak form, per ZONE-POSTULATE
  §2's own discipline.

## 3. The delta, split honestly [MEASURED, guardrail built in]

**REFUTATION FIRST, the guardrail.** The density delta is a BOUNDED
constant, and it is ADVERSE. Route B (density advantage at the origin/zone
scale) is CLOSED (`REFUTED.md`; the rho(2) reversal, ZONE-POSTULATE §6) and
nothing below reopens it: no claim toward TPC is made from any density in
this note.

- **The bounded constant [MEASURED, four bands to 1e8].** The stretch's
  survivor density is the tile density d(q) = (1/10) prod_{7<=r<=q}(1-2/r);
  the measured twin density in the stretches, divided by d(q), reads
  0.7980, 0.7978, 0.8021, 0.7946 across q-bands [101,313] to [3163,9973],
  against the limit rho(2) = e^{2gamma}/4 = 0.793055 — with measured/HL at
  0.9813..1.0057, i.e. Hardy-Littlewood accounts for everything. The
  stretch sits at u = 2, the MINIMUM of the survival curve: certification
  is bought at the worst point of the only curve in the problem. The tile
  overcounts its own certified twins by the bounded factor 1/rho(2) = 1.261
  and no more.
- **The diverging margin [MEASURED, decades 10^1..10^8].** M = width/env,
  width = q'^2 - q^2 ~ 2q ln q, env = largest published record gap wholly
  below the stretch top (= the zone envelope Z2(q); zonegap-03's identity).
  Per decade, min M runs 0.80 (at q = 29) -> 1.45 -> 2.81 -> 13.96 ->
  66.44 -> 351.26 -> 2175.84, mean M reaches 67968.9 at decade 10^7..10^8,
  and env/ln^3 q holds 3.67..4.65 from decade 10^2 on (the zonegap band
  constants, echoed). The
  mean margin diverges like q/ln^2 q — the attack's budget — and the MIN
  margin like q/ln^3 q, owned by twin-q stretches of minimal width 4q + 4.
  Per the square-window lesson (ZONE-POSTULATE §5a), none of this
  divergence is evidence at the gap scale; it is the budget, not the proof.
- **Occupancy, certified nearly eight decades past the 1e8 sieve [VERIFIED
  from adopted data].** Direct: all 1229 stretches with q <= 9973 (tops to 1e8) are
  occupied; minimum 1 pair, at the degenerate pre-wheel S_2 = [4, 9). The
  finer-than-zones pass the task priced cost one bit sieve to 1e8 and
  under a second. Beyond the sieve, the straddle criterion: an empty S_q
  forces an in-table twin gap >= width - 2 starting below q^2, so
  width - 2 > runmax(q^2) certifies occupancy from the adopted TOS table
  alone. That inequality holds at 5,484,595 of 5,484,596 stretches with
  q'^2 < 2^53 ~ 9.007e15; the SOLE exception is q = 29 (width - 2 = 118
  against record 8's 150 at F = 659), where the direct sieve holds 2
  pairs. **Every stretch with q'^2 < 2^53 is occupied**, conditional only
  on the adopted TOS/A113274 custody (zonegap-01 §1). Zone occupancy to
  1e11 (zonegap-01 §2) does not give this — the stretch grid is finer —
  which is why the dedicated pass existed.

## 4. The square anchor: real structure, exactly bookkeeping

- **(i) The QR kill law [PROVEN; VERIFIED r = 7..31, all prime anchors to
  2000].** Inside S_q, active prime r kills opener q^2 + t iff
  t ≡ -alpha or -alpha - 2 (mod r), with alpha = (q mod r)^2 a NONZERO
  quadratic residue. So only (r-1)/2 of the r generic forbidden-offset
  pairs can ever occur at a square anchor, and any offset class t with -t
  and -t-2 both nonresidues (or 0) is IMMUNE to r at EVERY square anchor:
  {0, 2} mod 7, {1, 3, 9} mod 11, up to 8 of 31 classes mod 31. A generic
  window has no immune classes; the anchor's kill pattern is genuinely
  non-generic.
- **The guardrail is a theorem [PROVEN].** Summing the kill incidence over
  all r offset classes gives 2(r-1) exactly — ensemble mean 2/r, identical
  to a generic window. The QR structure REDISTRIBUTES kills over offsets;
  it removes none. There is no density advantage at the square anchor, and
  Route B stays closed from this side too.
- **(ii) The measured signature [MEASURED, 439,644 openers, heights
  1e5..1e8].** Zero twin openers land in forbidden classes (certification
  restated in offset coordinates). The aggregate offset histograms are
  non-flat exactly as the character null predicts: against the CONDITIONAL
  null (realized anchors and per-stretch totals fixed, only offset
  placement tested) chi2/df reads 0.52..1.63 across r = 7..23, worst
  single class 2.40%. The marginal null's excess (chi2/df 21.85 at r = 7)
  is anchor-sampling variance, not offset structure. **Verdict: the
  square anchor's moire is real, deterministic, character-determined — and
  it is EXACTLY the CRT null. Structure, not advantage.**
- **The deep-end reconciliation [MEASURED + cited].** zonegap-01's u -> 1
  loading (binding gap just under p'^2) is NOT square-anchor attraction:
  Z2 = env identically (zonegap-03 §1, D = 0), the deep end is an onset
  desert (zonegap-02 §4), and here the record process itself is
  square-blind — record starts sit uniformly inside their stretches (mean
  placement fraction 0.479 against null 0.5, deciles consistent over 75
  records), 8 record intervals contain a prime square against a null
  expectation of 9.92 (all at n <= 20 where gaps are widest relative to
  square spacing), and no record contains two consecutive prime squares
  (none may — that would be an occupancy failure). The frontier p'^2 IS a
  prime square, so "the binding gap sits near the squares" is the envelope
  entering at the frontier: bookkeeping, exactly as zonegap-03 resolved.
- **(iii) Adjacent published machinery, named in the owning convention
  (`research/SEARCH-CONVENTIONS.md` discipline; no absence claim is made
  here).** The forbidden condition "q lands on a root of x^2 ≡ -t (mod r)"
  belongs to the *roots of quadratic congruences to prime moduli*
  literature: Duke-Friedlander-Iwaniec, Ann. of Math. 141 (1995) 423-441
  (MR1324141), equidistribution of those roots, with a living successor
  line (e.g. arXiv:2107.13301). Per-modulus pattern discrepancy is
  character-sum territory: Polya-Vinogradov and Burgess bounds, and the
  Burgess least-nonresidue bound r^{1/(4 sqrt e) + eps} governs the first
  killable offset class. Named as adjacent instruments only — nothing here
  imports a theorem, so no page-image obligation is triggered; the honest
  limit is that ALL of this machinery is per-modulus, while the wall is
  the JOINT placement over all r <= q, where per-character bounds compose
  into exactly the C^{pi(z)}-class loss the corpus already owns
  (`history/staging/import-l1l2.md`). "The quadratic point is
  equidistributed at gap scale" would be the Holt-Conjecture-2.1 failure
  shape ZONE-POSTULATE §7 warns on, and it is not argued here.

## 5. The attack statement, with its honest hardness

> **Target (SP, kill-side form).** For every prime q, the frozen moire of
> {7..q} cannot place a twin-slot gap covering the square-anchored window
> [q^2, q'^2) — the tile window anchored at the quadratic CRT point
> (q^2 mod r)_{r<=q} always retains a slot.

- **Budget.** Width ~ 2q ln q against danger env ~ 3.7..4.7 ln^3 q
  (measured, §3): margin ~ q/ln^2 q in the mean, q/ln^3 q at the twin-q
  minimum, both diverging; occupancy is already certified to 9.0e15 from
  adopted data, so any counterexample lives beyond the reach of every
  table now published.
- **Provably harder than it looks [the honest sentence].** The tile HAS
  gaps far wider than the stretch: G2(q#) reads exponent 1.50 on the
  trusted terms (`exponent-control.md` §5 via ZONE-POSTULATE §5) and
  carries the proven lower bound G2(x#) >> x ln x lnlnln x / lnln x
  (ZONE-POSTULATE §3) — both >> 2q ln q. **No whole-tile gap bound can
  ever prove SP.** The question is pure PLACEMENT: whether the tile's rare
  wide gaps can sit exactly at the quadratic point. That is the
  anchored-versus-worst-case split again — the wall's exact shape, third
  frame (zones, origin, now the square anchor) — and the density delta is
  even ADVERSE here (rho(2), §3), so no statistical argument helps.
- **What would prove it.** (1) An anchored-family cap at the quadratic
  point: the unified per-prime caps of `attack-anchored-01.md` transplant
  from the origin comb (anchor vector 0) to the stretch window (anchor
  vector -q^2 mod r, known and QR-structured); the caps are history-blind
  and per-prime, which is the only proof form that has ever certified
  survivors in this corpus. (2) The stretch's own destruction ledger: the
  Phi* transplant (zonegap-02 §3.4, W -> q'^2) bounds every prime's fresh
  kills in the stretch exactly — but it bounds destruction, not placement,
  and zonegap-02 §5 already says so. (3) QR equidistribution of the anchor
  against the tile's big-gap set — measure-versus-placement, the
  conjecture-shaped step, named above and not available.
- **Cheapest falsifiable next probe.** Extend SEC C3 to records 76-82
  (starts above 2^53; BigInt isqrt, minutes): seal the placement-fraction
  band [0, 1) uniform, 7 fresh points, before computing. A clustering of
  the unswept records against their stretch boundaries would be the first
  measured square-anchor coupling anywhere; a uniform read closes the
  fourth decade of the square-blindness measurement. Second probe, same
  cost class: replicate the SEC C2 conditional-null test on stretches
  q in [10^4, 3.16*10^4] (heights 1e8..1e9) with the bands sealed first.

## 6. NOT REACHED

- Records 76-82 (starts beyond 2^53) are outside SEC C3; the straddle
  criterion stops at q'^2 < 2^53 although maxF = 9.99e15 would carry it
  slightly further with BigInt widths.
- The offset signature is measured at heights 1e5..1e8 only; no second
  decade, no sealed bands (that is §5's probe, deliberately left).
- The anchored-cap transplant to the quadratic point is named, not
  attempted; no cap was computed at any square anchor.
- Whether strong ZP implies SP by any non-containment route is untouched
  beyond the disproof of the interval argument.
- The Phi* ledger was not instantiated on the stretch grid (it is proven
  for zones at zonegap-02 §3.4; the W -> q'^2 substitution is verbatim but
  unexecuted here).
- Nothing anywhere about WHERE survivors sit inside a stretch beyond the
  offset-class marginals; the supply question is the postulate, unchanged.

---

*Producer and custody: `research/stretch-01.js`, embedded
(`node research/qc/embed.js --check` passes bit-honest; the tail carries a
forced-re-embed stamp, disclosed above). Calibration inside the run, all
abort-on-mismatch: TOS sha256 prefix 78767cad d001b1b0 and 4051-row parse
with 75 starred records equal to A113274 1..75 at the anchors checked
(records 1-6, 41, 75); Chris's hand anchors 127 and 173; natal-onset window
totals 999/203; zonegap Z2(11) = 30 and Z2(13) = 30 with head/tail
digit-exact; rho(2) recomputed from gamma. Cited, not recomputed: the
Z2 = env identity (zonegap-03), the zonegap band constants and u-deciles
(zonegap-01), G2's exponent 1.50 and lower bound (ZONE-POSTULATE §3, §5),
the unified floors (attack-anchored-01) — per the standing compute rule.*
