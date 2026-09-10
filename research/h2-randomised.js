// h2-randomised.js
//
// A randomised-restart heuristic lower bound for omega2(n), to test whether a
// cheap proxy ladder can track the real one.  No proof of maximality: every
// answer is a verified cover, so a certified LOWER bound omega2(n) >= m.
//
// Each restart: walk the leftmost uncovered position, pick one of the top-K
// candidate classes at random (weighted by newly-covered count), no
// backtracking.  Millions of restarts per minute.
//
// Usage: node h2-randomised.js <nmax> [--restarts R] [--topk K]

'use strict';
const { primeList } = require('./h2-prototype.js');

const TRUE_OMEGA = {3:2,4:4,5:10,6:24,7:31,8:42,9:60,10:74,11:94,12:117,13:148,
  14:173,15:213,16:236,17:275,18:316,19:364,20:409,21:436};

function attempt(primes, M, rng, topk) {
  // M = array length to work in (generous).  Returns the length of the covered
  // prefix and the classes used.
  const np = primes.length;
  const cov = new Uint8Array(M + 2);
  const slots = new Int32Array(np).fill(2);
  const chosen = [];
  let q = 1;
  for (let step = 0; step < 2 * np; step++) {
    while (cov[q]) q++;
    if (q > M) break;
    // candidates: primes with a slot left and q not a multiple
    const ci = [], cv = [];
    for (let i = 0; i < np; i++) {
      if (!slots[i]) continue;
      const p = primes[i];
      const r = q % p;
      if (r === 0) continue;
      let c = 0;
      for (let x = r; x <= M; x += p) if (!cov[x]) c++;
      ci.push(i); cv.push(c);
    }
    if (!ci.length) break;
    // sort desc by coverage, sample among the top K
    const ord = ci.map((_, k) => k).sort((a, b) => cv[b] - cv[a]);
    const k = ord[Math.floor(rng() * Math.min(topk, ord.length))];
    const i = ci[k], p = primes[i], r = q % p;
    slots[i]--;
    for (let x = r; x <= M; x += p) cov[x] = 1;
    chosen.push([p, r]);
  }
  let len = 0;
  while (cov[len + 1]) len++;
  return { len, chosen };
}

function main() {
  const argv = process.argv.slice(2);
  const nmax = parseInt(argv[0] || '30', 10);
  const ri = argv.indexOf('--restarts');
  const restarts = ri >= 0 ? Number(argv[ri + 1]) : 200000;
  const ki = argv.indexOf('--topk');
  const topk = ki >= 0 ? Number(argv[ki + 1]) : 3;

  const P = primeList(nmax + 1);
  let seed = 12345;
  // Math.imul, because (seed * 1103515245) reaches 2.37e18 = 263 x 2^53 and
// is inexact from the second call: the plain-multiply form collapses to a
// period of 10,466 with a tail of ~5,900, against ~2^31 for the real thing,
// and its low three bits sit in one bucket 99.6% of the time. The imul form
// reproduces the exact LCG mod 2^31 step for step. (2026-08-20.)
  const rng = () => { seed = (Math.imul(seed, 1103515245) + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

  console.log(`# restarts=${restarts}  topk=${topk}`);
  console.log('n   p_n   heuristic   h2>=    true   ratio(heur/true)  secs');
  for (let n = 3; n <= nmax; n++) {
    const primes = P.slice(2, n);
    const M = Math.max(64, Math.round(2.2 * (TRUE_OMEGA[n] || 436 * Math.pow(1.14, n - 21))));
    const t0 = Date.now();
    let best = 0, bestC = null;
    for (let t = 0; t < restarts; t++) {
      const a = attempt(primes, M, rng, topk);
      if (a.len > best) { best = a.len; bestC = a.chosen; }
    }
    // verify
    for (let q = 1; q <= best; q++) {
      let hit = false;
      for (const [p, r] of bestC) if (q % p === r) { hit = true; break; }
      if (!hit) throw new Error('bad witness at ' + q);
    }
    const tv = TRUE_OMEGA[n];
    console.log(`${String(n).padEnd(3)} ${String(P[n-1]).padEnd(5)} ${String(best).padEnd(11)} ` +
      `${String(6*best+6).padEnd(7)} ${String(tv||'-').padEnd(6)} ${(tv?(best/tv).toFixed(4):'-').padEnd(17)} ` +
      `${((Date.now()-t0)/1000).toFixed(2)}`);
  }
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/h2-randomised.js
//   invocation:  node research/h2-randomised.js
//   code-sha256: 176aa4ed3ee44cccfb16eccde51ee5025e6cb366fa4fca2ad1035d16f0aa9aba
//   out-sha256:  7dc411c3297b2a8092408811a3549a0fbadd44bd6669869459e63363aac7f8d7
//   body-lines:  30
//   inputs:      research/h2-prototype.js@4c7bdd5fff62
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     232.9 s
// ============================================================================
// # restarts=200000  topk=3
// n   p_n   heuristic   h2>=    true   ratio(heur/true)  secs
// 3   5     2           18      2      1.0000            0.08
// 4   7     4           30      4      1.0000            0.15
// 5   11    10          66      10     1.0000            0.22
// 6   13    24          150     24     1.0000            0.33
// 7   17    31          192     31     1.0000            0.45
// 8   19    42          258     42     1.0000            0.64
// 9   23    57          348     60     0.9500            0.92
// 10  29    69          420     74     0.9324            1.20
// 11  31    83          504     94     0.8830            1.57
// 12  37    96          582     117    0.8205            2.00
// 13  41    113         684     148    0.7635            2.55
// 14  43    129         780     173    0.7457            3.11
// 15  47    146         882     213    0.6854            3.82
// 16  53    169         1020    236    0.7161            4.49
// 17  59    176         1062    275    0.6400            5.31
// 18  61    204         1230    316    0.6456            6.28
// 19  67    229         1380    364    0.6291            7.32
// 20  71    248         1494    409    0.6064            8.40
// 21  73    249         1500    436    0.5711            9.45
// 22  79    275         1656    -      -                 10.85
// 23  83    299         1800    -      -                 12.44
// 24  89    329         1980    -      -                 14.25
// 25  97    328         1974    -      -                 16.18
// 26  101   358         2154    -      -                 18.37
// 27  103   379         2280    -      -                 20.90
// 28  107   395         2376    -      -                 23.80
// 29  109   453         2724    -      -                 26.96
// 30  113   440         2646    -      -                 30.77
// ============================================================================
// READINGS
// ============================================================================
