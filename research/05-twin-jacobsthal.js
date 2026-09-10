// ============================================================================
// 05 — THE TWIN JACOBSTHAL FUNCTION G2(n): measuring the wall itself
// ============================================================================
//
// DEFINITION. G2(n) = the largest (cyclic) gap between consecutive twin slots
// in the pattern mod P_n#. A twin slot is r with gcd(r, P#) = gcd(r+2, P#) = 1
// — i.e. r avoids the residues {0, p-2} for every stacked prime p.
//
// WHY IT MATTERS — THE GAP REFORMULATION (rigorous reduction):
//   If G2(n) < p_{n+1}^2 - p_n for infinitely many n, then the frontier zone
//   (p_n, p_{n+1}^2) always contains a twin slot; by crystallization
//   (see 04) that slot is an ACTUAL twin prime; hence the Twin Prime
//   Conjecture follows.
// The worst gap ANYWHERE in the pattern bounds the conspiracy: if even the
// worst gap is smaller than the zone, no window — including the zone — can be
// empty.
//
// SINGLE-PRIME ANALOG. With ONE forbidden residue per prime (r coprime to P#)
// the analogous G1 is Jacobsthal's function g(P#). Iwaniec (1978) proved
// g(q) = O(log^2 q) — for q = P_n# that is O(p_n^2): EXACTLY the critical
// exponent. In gap language the single-prime version of this program closes
// (up to constants). The twin wall = extending Iwaniec's exponent from one
// forbidden residue per prime to two. (See literature notes in README.)
//
// This script computes G2 exactly by materializing one full period.
// Feasible through p = 23 (period 223,092,870). For 29# (6.47e9) see the
// segmented variant 05b.
// ============================================================================

const PR = [2,3,5,7,11,13,17,19,23,29];
function run(upto) {
  const idx = PR.indexOf(upto), pNext = PR[idx+1];
  let P = 1; for (let i = 0; i <= idx; i++) P *= PR[i];
  const bad = new Uint8Array(P); // bad[r]=1 if p | r or p | r+2 for some stacked p
  for (let i = 0; i <= idx; i++) {
    const p = PR[i];
    for (let j = 0; j < P; j += p) bad[j] = 1;                    // r ≡ 0 (mod p)
    for (let j = ((p - 2) % p + p) % p; j < P; j += p) bad[j] = 1; // r ≡ -2 (mod p)
  }
  let first = -1, prev = -1, maxGap = 0, at = -1, count = 0;
  for (let r = 0; r < P; r++) {
    if (!bad[r]) {
      count++;
      if (first < 0) first = r;
      else { const g = r - prev; if (g > maxGap) { maxGap = g; at = prev; } }
      prev = r;
    }
  }
  // cyclic wrap: the pattern repeats, so close the loop from last slot to first+P
  const wrap = (first + P) - prev; if (wrap > maxGap) { maxGap = wrap; at = prev; }
  const zone = pNext * pNext;
  console.log(`p=${upto}  P#=${P}  twin slots=${count}  G2=${maxGap}  at r=${at}  zone p_next^2=${zone}  G2/zone=${(maxGap/zone).toFixed(4)}  G2/(p*ln^2 p)=${(maxGap/(upto*Math.log(upto)**2)).toFixed(2)}`);
}
for (const p of [5,7,11,13,17,19,23]) run(p);

// ----------------------------------------------------------------------------
// THE 29# ROW IS NOT THIS SCRIPT'S. Line 54 stops the loop at p = 23, so the
// 29# level below comes from research/05b-twin-jacobsthal-segmented.js, which
// streams 6.47 billion positions and carries the row in its own bound tail.
// It sits above the banner so an embed of this file cannot overwrite it:
// p=29  P#=6469693230 twin slots=214708725 G2=258 at r=1205437109  zone 31^2=961     G2/zone=0.2685  G2/(p*ln^2 p)=0.78
// ----------------------------------------------------------------------------

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/05-twin-jacobsthal.js
//   invocation:  node research/05-twin-jacobsthal.js
//   code-sha256: 1d24cd276aad1e3d0bc19658598c6f0c4ba66c49363996864956b16875f4ddc4
//   out-sha256:  571154f6d37474992f350316b8eda215615a14be996da50e9dbbf586d337cc0a
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.8 s
// ============================================================================
// p=5  P#=30  twin slots=3  G2=12  at r=17  zone p_next^2=49  G2/zone=0.2449  G2/(p*ln^2 p)=0.93
// p=7  P#=210  twin slots=15  G2=30  at r=71  zone p_next^2=121  G2/zone=0.2479  G2/(p*ln^2 p)=1.13
// p=11  P#=2310  twin slots=135  G2=42  at r=899  zone p_next^2=169  G2/zone=0.2485  G2/(p*ln^2 p)=0.66
// p=13  P#=30030  twin slots=1485  G2=66  at r=731  zone p_next^2=289  G2/zone=0.2284  G2/(p*ln^2 p)=0.77
// p=17  P#=510510  twin slots=22275  G2=108  at r=701  zone p_next^2=361  G2/zone=0.2992  G2/(p*ln^2 p)=0.79
// p=19  P#=9699690  twin slots=378675  G2=150  at r=659  zone p_next^2=529  G2/zone=0.2836  G2/(p*ln^2 p)=0.91
// p=23  P#=223092870  twin slots=7952175  G2=204  at r=76166567  zone p_next^2=841  G2/zone=0.2426  G2/(p*ln^2 p)=0.90
// READINGS.
// 1. Slot counts match prod(p-2) exactly at every level (214,708,725 at 29#) —
//    the Copying Theorem verified at 6.5 billion scale.
// 2. G2/zone plateaus around 0.23–0.30: the worst gap in the ENTIRE pattern is
//    only about a quarter of the zone width. TPC follows if this ratio merely
//    stays below 1 forever.
// 3. G2 tracks ~0.8 * p * ln^2(p) — the same order as Jacobsthal-type growth,
//    far below the p^2 danger line (and the known single-prime lower bounds of
//    Rankin/Ford–Green–Konyagin–Maynard–Tao live at p * ln p * (small factors)).
// 4. Curious structure: for p = 13, 17, 19 the worst gap sat at nearly the
//    same small position (r ≈ 659–731) before jumping to r ≈ 1.2e9 at 29#.
//    The early worst-gaps live near the start of the pattern; unexplored.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed. The loop here
// stops at p = 23, so both 29# figures come from the row carried above the
// banner and credited there to 05b-twin-jacobsthal-segmented.js.
//
// ROUNDINGS of a value this file's own run prints (printed value first):
//   0.2284 at p=13 -> "0.23" and 0.2992 at p=17 -> "0.30" in reading 2. Those
//   two rows are the minimum and the maximum of the printed G2/zone column, so
//   the quoted plateau is the full range of the table.
//
// IN-CODE, above the banner and credited there:
//   214,708,725 in reading 1 and 1.2e9 in reading 4 are both read off the 29#
//   row that sits above the banner: "p=29 P#=6469693230 twin slots=214708725
//   G2=258 at r=1205437109 zone 31^2=961 G2/zone=0.2685". That row is printed
//   verbatim by research/05b-twin-jacobsthal-segmented.js, verified in its own
//   embedded tail, which also prints "expected slot count prod(p-2) =
//   214708725". So 1.2e9 is r = 1205437109 quoted to two figures.
// ---------------------------------------------------------------------------
