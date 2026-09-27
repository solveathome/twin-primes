// Is there a twin prime pair strictly inside (n^2, (n+2)^2)?  And inside the
// tighter (n^2, (n+1)^2)?  Width 4n+4 and 2n+1: LINEAR windows, unlike the
// zone's quadratic one. Streams a segmented sieve and resolves each n against
// the first twin above n^2.
'use strict';
const NMAX = +(process.argv[2] || 1e5);
const LIMIT = (NMAX + 3) * (NMAX + 3);
const SEG = 1 << 22;
const t0 = Date.now();

const lim = Math.floor(Math.sqrt(LIMIT)) + 1;
const sm = new Uint8Array(lim + 1); const base = [];
for (let i = 2; i <= lim; i++) { if (!sm[i]) { base.push(i); for (let j = i * i; j <= lim; j += i) sm[j] = 1; } }

let n = 1, nsq = 1;                  // smallest unresolved n, and n^2
let lastPrime = 0, nTwins = 0;
const fail2 = [], fail1 = [];        // n where (n^2,(n+2)^2) / (n^2,(n+1)^2) has none
let maxD = 0, maxDat = 0;            // worst (first twin top) - n^2

function onTwin(r) {                 // twin pair (r, r+2), r prime, r+2 prime
  nTwins++;
  while (nsq < r && n <= NMAX) {
    const top = r + 2, d = top - nsq;
    if (d > maxD) { maxD = d; maxDat = n; }
    if (top >= (n + 2) * (n + 2)) fail2.push(n);
    if (top >= (n + 1) * (n + 1)) fail1.push(n);
    n++; nsq = n * n;
  }
}

const seg = new Uint8Array(SEG);
outer:
for (let lo = 2; lo <= LIMIT; lo += SEG) {
  const hi = Math.min(lo + SEG - 1, LIMIT);
  seg.fill(0, 0, hi - lo + 1);
  for (const p of base) {
    if (p * p > hi) break;
    const s = Math.max(p * p, Math.ceil(lo / p) * p);
    for (let j = s; j <= hi; j += p) seg[j - lo] = 1;
  }
  for (let i = lo; i <= hi; i++) {
    if (seg[i - lo]) continue;
    if (lastPrime && i - lastPrime === 2) onTwin(lastPrime);
    lastPrime = i;
    if (n > NMAX) break outer;
  }
}

const secs = (Date.now() - t0) / 1000;
console.log(`n up to ${NMAX.toExponential(1)}   (sieved to ${LIMIT.toExponential(3)}, ${nTwins.toLocaleString('en-US')} twin pairs)  [${secs.toFixed(1)}s]`);
console.log(`\n(n^2, (n+2)^2)  width 4n+4 :  ${fail2.length} failures`);
if (fail2.length) console.log(`   n = ${fail2.slice(0, 40).join(', ')}${fail2.length > 40 ? ' ...' : ''}`);
if (fail2.length) console.log(`   LARGEST failure at n = ${fail2[fail2.length - 1]}  (n^2 = ${fail2[fail2.length-1]**2})`);
console.log(`\n(n^2, (n+1)^2)  width 2n+1 :  ${fail1.length} failures`);
if (fail1.length) console.log(`   n = ${fail1.slice(0, 40).join(', ')}${fail1.length > 40 ? ' ...' : ''}`);
if (fail1.length) console.log(`   LARGEST failure at n = ${fail1[fail1.length - 1]}  (n^2 = ${fail1[fail1.length-1]**2})`);
console.log(`\nworst (first twin top - n^2) = ${maxD.toLocaleString('en-US')} at n = ${maxDat.toLocaleString('en-US')}; that window is 4n+4 = ${(4*maxDat+4).toLocaleString('en-US')}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/square-window.js
//   invocation:  node research/square-window.js
//   code-sha256: 835d2ed759a3f8d3c9c666349302d165ff3abb95acbce792ae86f193d03cd611
//   out-sha256:  263cda5ec052e1e87a46b18566221375dd9321e9957d785135da5e0776624c71
//   body-lines:  11
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     46.7 s
// ============================================================================
// n up to 1.0e+5   (sieved to 1.000e+10, 27,412,680 twin pairs)  [46.6s]
//
// (n^2, (n+2)^2)  width 4n+4 :  1 failures
//    n = 26
//    LARGEST failure at n = 26  (n^2 = 676)
//
// (n^2, (n+1)^2)  width 2n+1 :  12 failures
//    n = 1, 9, 19, 26, 27, 30, 34, 39, 49, 53, 77, 122
//    LARGEST failure at n = 122  (n^2 = 14884)
//
// worst (first twin top - n^2) = 3,982 at n = 88,191; that window is 4n+4 = 352,768
// ============================================================================
// READINGS
// ============================================================================
