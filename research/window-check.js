// SANITY CHECK. For every prime p, does the zone window (p, p_next^2) contain a
// genuine twin prime pair? Report the WORST margin seen, where
//   margin = (window length) / (distance from p to the top of the first twin above p).
// margin > 1 everywhere == the Gap Reformulation's inequality holds at the origin
// at every level checked. This is the ANCHORED quantity (the actual first twin),
// not the worst-case gap G2 over the whole tile, which is what a proof would need.
'use strict';
const N = +(process.argv[2] || 1e9);
const SEG = 1 << 22;                       // 4M per segment
const t0 = Date.now();

// base primes to sqrt(N)
const lim = Math.floor(Math.sqrt(N)) + 1;
const sm = new Uint8Array(lim + 1);
const base = [];
for (let i = 2; i <= lim; i++) { if (!sm[i]) { base.push(i); for (let j = i * i; j <= lim; j += i) sm[j] = 1; } }

let lastPrime = 0;          // previous prime seen
let prevPrime = 0;          // the one before that
const pend = [];            // {p, pnext} awaiting the first twin strictly above p
let worst = Infinity, worstAt = 0, worstD = 0, worstW = 0;
const dec = [];   // per-decade minimum margin
let nPrimes = 0, nTwins = 0, maxD = 0, maxDat = 0;

const winExact = (pn, p) => BigInt(pn) * BigInt(pn) - BigInt(p);

function onPrime(q) {
  nPrimes++;
  // the pair (prevPrime, lastPrime) now has its successor known: window uses lastPrime
  if (prevPrime) pend.push(prevPrime, lastPrime);   // flat pairs: p, p_next
  // twin detected with lower member `a = lastPrime`, top q
  if (lastPrime && q - lastPrime === 2) {
    nTwins++;
    const a = lastPrime, top = q;
    let k = 0;
    while (k < pend.length) {
      const p = pend[k], pn = pend[k + 1];
      if (p < a) {                                   // this twin lies strictly above p
        // pn*pn crosses 2^53 at pn = 94,906,266, i.e. through the whole top
        // decade of the default N = 1e9, where the double window is wrong by up
        // to 102. The MARGIN is a ratio and does not care (1e-16 relative), so
        // it keeps the cheap double; every window that is PRINTED is re-formed
        // exactly in BigInt, which costs nothing because the two minima below
        // update only a handful of times. (2026-08-20.)
        const d = top - p, w = pn * pn - p, m = w / d;
        if (d > maxD) { maxD = d; maxDat = p; }
        if (m < worst) { worst = m; worstAt = p; worstD = d; worstW = winExact(pn, p); }
        const e = Math.floor(Math.log10(p));
        if (!dec[e] || m < dec[e].m) dec[e] = { m, p, d, w: winExact(pn, p) };
        k += 2;
      } else break;                                  // pend is ascending in p
    }
    if (k) pend.splice(0, k);
  }
  prevPrime = lastPrime; lastPrime = q;
}

const seg = new Uint8Array(SEG);
for (let lo = 2; lo <= N; lo += SEG) {
  const hi = Math.min(lo + SEG - 1, N);
  seg.fill(0, 0, hi - lo + 1);
  for (const p of base) {
    if (p * p > hi) break;
    let s = Math.max(p * p, Math.ceil(lo / p) * p);
    for (let j = s; j <= hi; j += p) seg[j - lo] = 1;
  }
  for (let i = lo; i <= hi; i++) if (!seg[i - lo]) onPrime(i);
}

const secs = (Date.now() - t0) / 1000;
console.log(`checked every prime p up to ${N.toExponential(2)}  (${nPrimes.toLocaleString('en-US')} primes, ${nTwins.toLocaleString('en-US')} twin pairs)  [${secs.toFixed(1)}s]`);
console.log(`WORST margin = ${worst.toFixed(1)}  at p = ${worstAt.toLocaleString('en-US')}`);
console.log(`   there the window is ${worstW.toLocaleString('en-US')} and the first twin above p tops out ${worstD.toLocaleString('en-US')} past p`);
console.log(`largest distance to the first twin above p: ${maxD.toLocaleString('en-US')} at p = ${maxDat.toLocaleString('en-US')}`);
console.log('\n  decade of p |  worst margin in it |   at p        | window        | dist to first twin');
for (let e = 0; e < dec.length; e++) { const r = dec[e]; if (!r) continue;
  console.log(`   10^${String(e).padStart(2)}      | ${r.m.toFixed(0).padStart(19)} | ${String(r.p).padStart(13)} | ${String(r.w).padStart(13)} | ${String(r.d).padStart(6)}`); }
console.log(`VERDICT: ${worst > 1 ? 'every window checked CONTAINS a twin pair, with the stated worst-case slack' : 'A WINDOW FAILED'}`);
console.log(`still pending (no twin found above them yet, i.e. beyond the sieve): ${pend.length / 2}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/window-check.js
//   invocation:  node research/window-check.js
//   code-sha256: 979db6d2973295a7c6861caa4fb62412941e9d7c0b6260671b3a3d6c9327d3ae
//   out-sha256:  b802eaf7712f50a052c22d17a76ed7fbf35ddfb4293383c9add5ab3442861515
//   body-lines:  17
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     5.3 s
// ============================================================================
// checked every prime p up to 1.00e+9  (50,847,534 primes, 3,424,506 twin pairs)  [5.2s]
// WORST margin = 2.3  at p = 2
//    there the window is 7 and the first twin above p tops out 3 past p
// largest distance to the first twin above p: 4,772 at p = 698,542,487
//
//   decade of p |  worst margin in it |   at p        | window        | dist to first twin
//    10^ 0      |                   2 |             2 |             7 |      3
//    10^ 1      |                  20 |            11 |           158 |      8
//    10^ 2      |                 368 |           107 |         11774 |     32
//    10^ 3      |               15852 |          1319 |       1743722 |    110
//    10^ 4      |              609294 |         10529 |     110891432 |    182
//    10^ 5      |            23483463 |        120077 |   14418846164 |    614
//    10^ 6      |          1448093674 |       1022507 | 1045523632574 |    722
//    10^ 7      |         70851917525 |      10170731 | 103443799586558 |   1460
//    10^ 8      |       3839902284752 |     100263971 | 10052864181480758 |   2618
// VERDICT: every window checked CONTAINS a twin pair, with the stated worst-case slack
// still pending (no twin found above them yet, i.e. beyond the sieve): 29
// ============================================================================
// READINGS
// ============================================================================
