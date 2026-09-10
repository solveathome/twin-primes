// ============================================================================
// 02 — HOW DEEP IN THE ZONE DOES THE FIRST TWIN SIT? (the safety margin)
// ============================================================================
//
// The window form of the Twin Prime Conjecture (see README: Zone Equivalence)
// needs a twin prime in (p_n, p_{n+1}^2). This measures how close the claim
// comes to failing: find the FIRST twin prime after p_n and compare it to the
// zone width. margin = p_{n+1}^2 / r.
// ============================================================================

const LIMIT = 50_000_000;
const sieve = new Uint8Array(LIMIT + 3);
for (let i = 2; i * i <= LIMIT + 2; i++) if (!sieve[i]) for (let j = i * i; j <= LIMIT + 2; j += i) sieve[j] = 1;
const isPrime = (n) => n >= 2 && !sieve[n];

function nextPrime(n) { let m = n + 1; while (!isPrime(m)) m++; return m; }
function firstTwinAfter(n) { for (let r = n + 1; r + 2 <= LIMIT; r++) if (!sieve[r] && !sieve[r + 2]) return r; return null; }

const levels = [5, 13, 31, 71, 149, 311, 631, 1277, 2557, 5119, 10243, 20479, 40961, 81919, 163841, 327673, 655357, 1310719, 2621443, 5242883];
console.log('p_n | p_{n+1}^2 (zone) | first twin r > p_n | zone/r (safety margin)');
for (const raw of levels) {
  const pn = isPrime(raw) ? raw : nextPrime(raw);
  const pNext = nextPrime(pn);
  const zone = pNext * pNext;
  const r = firstTwinAfter(pn);
  console.log(`${pn} | ${zone} | ${r},${r + 2} | ${(zone / r).toExponential(2)}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/02-first-twin-margin.js
//   invocation:  node research/02-first-twin-margin.js
//   code-sha256: fa1bfd421bd845bd3b058de14f91aa5c22bff704ec1c83db13c344ea674c7248
//   out-sha256:  cca4382ddae350fc93d076e92e48c37c36263645e50e5fd7f8155e32ee65a00f
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.2 s
// ============================================================================
// p_n | p_{n+1}^2 (zone) | first twin r > p_n | zone/r (safety margin)
// 5 | 49 | 11,13 | 4.45e+0
// 13 | 289 | 17,19 | 1.70e+1
// 31 | 1369 | 41,43 | 3.34e+1
// 71 | 5329 | 101,103 | 5.28e+1
// 149 | 22801 | 179,181 | 1.27e+2
// 311 | 97969 | 347,349 | 2.82e+2
// 631 | 410881 | 641,643 | 6.41e+2
// 1277 | 1635841 | 1289,1291 | 1.27e+3
// 2557 | 6651241 | 2591,2593 | 2.57e+3
// 5119 | 26491609 | 5231,5233 | 5.06e+3
// 10243 | 105001009 | 10271,10273 | 1.02e+4
// 20479 | 419553289 | 20507,20509 | 2.05e+4
// 40961 | 1678786729 | 41141,41143 | 4.08e+4
// 81919 | 6712361041 | 81929,81931 | 8.19e+4
// 163841 | 26845839409 | 163859,163861 | 1.64e+5
// 327673 | 107380080721 | 327737,327739 | 3.28e+5
// 655357 | 429513769129 | 655559,655561 | 6.55e+5
// 1310719 | 1717994782729 | 1310807,1310809 | 1.31e+6
// 2621447 | 6872047288681 | 2621921,2621923 | 2.62e+6
// 5242883 | 27487906037881 | 5242967,5242969 | 5.24e+6
// ============================================================================
// READINGS
//
