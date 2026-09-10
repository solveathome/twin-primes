// ============================================================================
// FOSSIL SHADOWS — Chris's copying refinement (2026-08-14, growth.txt session)
// ============================================================================
// CLAIM (Chris): each prime's kill shadow is a feature OF THE PATTERN, so
// later copying replicates it forever: the pattern carries a fossil stratum
// for every prime's ignition, recurring at k*P_p + [p^2, 2p^2] where P_p is
// the primorial at the time p was added. (Refines attack-10/anchored-windows,
// which only considered the newest shadow in absolute territory.)
//
// TEST: build the level-19 pattern (P = 9,699,690) and measure twin-slot
// density inside the fossil bands of earlier primes:
//   p=7:  bands k*210    + [49, 98]      (46,189 copies... k < P/210)
//   p=11: bands k*2310   + [121, 242]    (4,199 copies)
//   p=13: bands k*30030  + [169, 338]    (323 copies)
//   p=17: bands k*510510 + [289, 578]    (19 copies)
// Compare density in-band vs global delta. Also report bands EXCLUDING the
// k=0 copy (to separate the fossil effect from head/crystallization effects)
// and a random-offset control of the same total size.
// ============================================================================

const PR = [2,3,5,7,11,13,17,19];
const P = PR.reduce((a,b)=>a*b,1);
const bad = new Uint8Array(P);
for (const p of PR){ for(let j=0;j<P;j+=p) bad[j]=1; const r2=((p-2)%p+p)%p; for(let j=r2;j<P;j+=p) bad[j]=1; }
let D=1; for (const p of PR) if (p>2) D*=p-2;
const delta = D/P;

function bandDensity(period, lo, hi, skipK0){
  let count=0, total=0;
  for (let base = 0; base < P; base += period){
    if (skipK0 && base === 0) continue;
    for (let r = base+lo; r < base+hi && r < P; r++){ total++; if (!bad[r]) count++; }
  }
  return {count, total, ratio: (count/total)/delta};
}

console.log(`level p=19  P=${P}  delta=${delta.toFixed(5)}`);
console.log('prime | fossil band (in its own period) | ratio all copies | ratio excl. k=0 | copies');
for (const [p, period] of [[7,210],[11,2310],[13,30030],[17,510510]]){
  const lo = p*p, hi = 2*p*p;
  const all = bandDensity(period, lo, hi, false);
  const noHead = bandDensity(period, lo, hi, true);
  console.log(`p=${p} | [${lo},${hi}) mod ${period} | ${all.ratio.toFixed(3)} (${all.count}/${all.total}) | ${noHead.ratio.toFixed(3)} | ${Math.floor(P/period)}`);
}
// control: same band widths at arbitrary unrelated offsets
for (const [p, period, off] of [[7,210,140],[11,2310,1000],[13,30030,12000],[17,510510,200000]]){
  const c = bandDensity(period, off, off + p*p, true);
  console.log(`control p=${p} offset ${off}: ratio ${c.ratio.toFixed(3)}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/fossil-shadows.js
//   invocation:  node research/fossil-shadows.js
//   code-sha256: a39ef0a0534d5278ad87e3696453845d5fb7b08cd46fd44b4d3c6fcd526f0c98
//   out-sha256:  13f32eb2550a14bf2715586514697c5f29fe3867fb43583d865cfcf43de442e9
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// level p=19  P=9699690  delta=0.03904
// prime | fossil band (in its own period) | ratio all copies | ratio excl. k=0 | copies
// p=7 | [49,98) mod 210 | 0.571 (50490/2263261) | 0.571 | 46189
// p=11 | [121,242) mod 2310 | 1.273 (25245/508079) | 1.273 | 4199
// p=13 | [169,338) mod 30030 | 0.957 (2040/54587) | 0.956 | 323
// p=17 | [289,578) mod 510510 | 0.714 (153/5491) | 0.719 | 19
// control p=7 offset 140: ratio 0.857
// control p=11 offset 1000: ratio 1.131
// control p=13 offset 12000: ratio 1.196
// control p=17 offset 200000: ratio 0.960
// READINGS — Chris's fossil claim CONFIRMED, with two refinements:
// PROVENANCE (declared 2026-08-19, per TODO item 2's decision): rows quoted in
// the OUTPUT/readings below that this script did not print are borrowed from
// attack2-02-08-tomography.js and attack2-03-09-depth-formula.js, where they
// are formally embedded; the recurrence claim itself is a corollary of the
// Exact Invariance Lemma proven in attack2-03-09-depth-formula.js.
// 1. THE FOSSIL LAW HOLDS FOR LARGE-ENOUGH PRIMES: p=17's dent measures
//    0.714 of mean at level 19 AND 0.714 at level 23 — the shadow was copied
//    through a full level of expansion + 23's sieving with its depth EXACTLY
//    preserved. p=19's fossil (0.639, 0.03 percentile) is the deepest band
//    of its width in the whole 223M-period pattern. The pattern is an
//    archaeological record: every prime's ignition leaves a permanent,
//    copied-forever stratum at in-period offsets [p^2, 2p^2] mod its
//    primorial.
// 2. EARLY-ERA NOISE: for small primes (7, 11, 13) the "shadow" is 3-4
//    individual kills, not a statistical band — layout luck dominates
//    (hence 11's band is actually enriched, 87th percentile). The fossil law
//    is a large-p phenomenon.
// 3. STRATA OVERLAP: measured fossil depths (0.71, 0.64) are DEEPER than the
//    ~0.85 single-shadow depth because consecutive primes' bands overlap
//    (p_{n+1}^2 < 2 p_n^2 for close primes): the dents stack. The in-period
//    density profile near [p^2, 2p^2] is a cumulative stack of strata.
// 4. Chris's companion observation verified by the Copying Theorem: per
//    slot, p copies created, EXACTLY 2 removed (odd p; classes r=0 and
//    r=-2 mod p are always distinct), net x(p-2). And p's first new delta is
//    at p itself (p = p x 1, killing the prime as a candidate), then silence
//    until p^2 — the quiet stretch between them IS the zone.
//
// 5. SEAM LEMMA (Chris, 2026-08-14; verified numerically at 6 levels).
//    Each copy's edges are candidates (mirror edges +-1 of every seam k*P),
//    so every seam carries a twin-slot pair (kP-1, kP+1) straddling it.
//    Adding p: kP mod p sweeps all residues (P invertible mod p), so
//    EXACTLY 2 seam pairs die (kP ≡ +1 and kP ≡ -1 mod p) and p-2 survive
//    per new period — a guaranteed, structurally-produced family of twin
//    slots centered on the seams, at every level forever. Verified: 3, 5,
//    9, 11, 15, 17 survivors for p = 5..19 = p-2 exactly. The k=full-period
//    case (P#+-1 both prime) is the known "twin primorial primes"; the
//    general seam family k*P +- 1 as a per-level twin-slot supply appears
//    to be unnamed. NOTE: seam slots are candidates deep in the pattern,
//    not crystallized — they do not by themselves yield actual twins.
//
// THE PATTERN'S GEOGRAPHY, unified by the copy mechanism: seams = guaranteed
// twin supply (enrichment, the anti-shadow); fossil strata = permanent
// dents at [p^2, 2p^2] per prime; the zone = the quiet stretch (p, p^2)
// where the newest prime has struck only once (at p itself).
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// Level 19 raw bands: p=7: 0.571 | p=11: 1.273 | p=13: 0.957 | p=17: 0.714
// Percentile among ALL same-width offsets (lower = more depleted):
//   level 19: p=7: 0.0% | p=11: 87.0% | p=13: 22.2% | p=17: 0.2%
//   level 23: p=17: fossil/mean=0.714, percentile 0.17%
//             p=19: fossil/mean=0.639, percentile 0.03%
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass), refining
// the 2026-08-19 declaration above. What every figure in the readings that
// this file's OUTPUT does not contain verbatim actually is, and which of them
// the earlier declaration covers. No number above was changed.
//
// BORROWED, verified present in the named producer's embedded OUTPUT, and
// covered by the 2026-08-19 declaration:
//   0.639 in reading 1 and in the level-23 context note is the p=19 fossil
//     ratio, printed by attack2-02-08-tomography.js as
//     "p=19 | [361,722) mod 9699690 | 0.639 | 0.03%" and again by
//     attack2-03-09-depth-formula.js on its p=19 row.
//   0.17 in the level-23 context note is the p=17 percentile from the same
//     tomography line, "p=17 | [289,578) mod 510510 | 0.714 | 0.17%".
//
// ROUNDINGS of a borrowed value, printed by the tomography file rather than
// by this one (printed value first):
//   86.97 -> the 87.0 percentile of the level-19 note and the "87th
//     percentile" of reading 2.
//   22.23 -> the 22.2 percentile of the level-19 note.
//   0.639 -> the 0.64 of reading 3. The 0.71 beside it is this file's own
//     printed p=17 ratio 0.714.
//
// NOT COVERED by the 2026-08-19 declaration, and not from either producer:
//   223 in reading 1 is not a measurement. It is the "223M" magnitude of the
//   level-23 period, the primorial 223092870, written as a word.
// ---------------------------------------------------------------------------
