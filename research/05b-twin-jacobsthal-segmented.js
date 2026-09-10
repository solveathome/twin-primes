// ============================================================================
// 05b — G2(29#) BY SEGMENTED STREAMING (6.47 billion positions)
// ============================================================================
// Same object as 05, but the period no longer fits in memory as one array.
// Process 1e8-position segments, marking the two forbidden strides per prime
// within each segment, and carry the gap bookkeeping across boundaries.
// Run with: node --max-old-space-size=2048 05b-twin-jacobsthal-segmented.js
// ============================================================================

const PR = [2,3,5,7,11,13,17,19,23,29];
const P = PR.reduce((a,b)=>a*b,1); // 6,469,693,230 < 2^53, exact as a double
const SEG = 100_000_000;
const buf = new Uint8Array(SEG);
let firstSlot = -1, prevSlot = -1, maxGap = 0, at = -1, count = 0;
const t0 = Date.now();
for (let base = 0; base < P; base += SEG) {
  const len = Math.min(SEG, P - base);
  buf.fill(0, 0, len);
  for (const p of PR) {
    for (const res of (p === 2 ? [0] : [0, p - 2])) { // r ≡ 0 and r ≡ -2 (mod p)
      let j = res - (base % p); if (j < 0) j += p;
      for (; j < len; j += p) buf[j] = 1;
    }
  }
  for (let i = 0; i < len; i++) {
    if (!buf[i]) {
      const r = base + i; count++;
      if (firstSlot < 0) firstSlot = r;
      else { const g = r - prevSlot; if (g > maxGap) { maxGap = g; at = prevSlot; } }
      prevSlot = r;
    }
  }
  if ((base / SEG) % 10 === 0) console.error(`... ${(100*base/P).toFixed(1)}%  maxGap so far=${maxGap}  (${((Date.now()-t0)/1000).toFixed(0)}s)`);
}
const wrap = (firstSlot + P) - prevSlot; if (wrap > maxGap) { maxGap = wrap; at = prevSlot; }
console.log(`p=29  P#=${P}  twin slots=${count}  G2=${maxGap}  at r=${at}  zone 31^2=961  G2/zone=${(maxGap/961).toFixed(4)}  G2/(p*ln^2 p)=${(maxGap/(29*Math.log(29)**2)).toFixed(2)}`);
console.log(`expected slot count prod(p-2) = ${[1,3,5,9,11,15,17,21,27].reduce((a,b)=>a*b,1)}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --node-flag --max-old-space-size=2048 research/05b-twin-jacobsthal-segmented.js
//   invocation:  node --max-old-space-size=2048 research/05b-twin-jacobsthal-segmented.js
//   code-sha256: 80df82f5db0d2ab7e5c86ed56e2f40c4719c8fe6f15acfa7c02b4d1dd82b8e14
//   out-sha256:  b81e574de9bca3c03882a491e8ba63765f86ff186b8eac647f2a19a3bf839b7c
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     23.1 s
// ============================================================================
// p=29  P#=6469693230  twin slots=214708725  G2=258  at r=1205437109  zone 31^2=961  G2/zone=0.2685  G2/(p*ln^2 p)=0.78
// expected slot count prod(p-2) = 214708725
// ───── stderr ─────
// ... 0.0%  maxGap so far=228  (0s)
// ... 15.5%  maxGap so far=240  (3s)
// ... 30.9%  maxGap so far=258  (6s)
// ... 46.4%  maxGap so far=258  (10s)
// ... 61.8%  maxGap so far=258  (14s)
// ... 77.3%  maxGap so far=258  (18s)
// ... 92.7%  maxGap so far=258  (22s)
// ============================================================================
// READINGS
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// READING. Slot count matches prod(p-2) EXACTLY at 6.5-billion scale (the
// Copying Theorem's strongest numerical check). G2 stays at ~27% of the zone;
// growth still tracks ~0.8 * p * ln^2 p. Next level (31#, 2.0e11) needs ~30x
// this runtime or a faster language — the natural next push.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// DEFINITION constant: 2.0e11 is the primorial 31# = 200,560,490,130, quoted
//   to two figures as the size of the next level. It is printed in full by
//   research/a3-08-adjacent-pairs.js and research/a3-10-lower-tightness.js,
//   verified 2026-08-20.
// ---------------------------------------------------------------------------
