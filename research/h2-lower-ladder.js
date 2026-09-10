// h2-lower-ladder.js
//
// The cheap half of the h2 computation.
//
// Measured fact behind this script (see research/h2-scoping.md): in the exact
// solver, FINDING an optimal cover costs about 2.5% of the run and PROVING no
// longer one exists costs the other 97.5%.  So drop the proof.  Every m for
// which the search returns a verified witness is a certified LOWER bound
// omega2(n) >= m, hence h2(n) >= 6m + 6.
//
// A lower-bound ladder is not A288815.  It is a different sequence, and its
// growth exponent is only the exponent of h2 if the shortfall is relatively
// bounded.  This script measures the shortfall on the 19 terms where the true
// answer is known, which is the only way to find out.
//
// Usage: node h2-lower-ladder.js <nmax> [--budget NODES] [--from n0]

'use strict';
const { primeList, makeSolver } = require('./h2-prototype.js');

// Ziller and Morack 2017, table 1: omega2(n) for n = 3..21.
const TRUE_OMEGA = {
  3: 2, 4: 4, 5: 10, 6: 24, 7: 31, 8: 42, 9: 60, 10: 74, 11: 94, 12: 117,
  13: 148, 14: 173, 15: 213, 16: 236, 17: 275, 18: 316, 19: 364, 20: 409, 21: 436
};

function main() {
  const argv = process.argv.slice(2);
  const nmax = parseInt(argv[0] || '30', 10);
  const bi = argv.indexOf('--budget');
  const budget = bi >= 0 ? Number(argv[bi + 1]) : 2e6;
  const fi = argv.indexOf('--from');
  const n0 = fi >= 0 ? parseInt(argv[fi + 1], 10) : 3;

  const P = primeList(nmax + 1);
  console.log(`# node budget per feasibility call: ${budget.toExponential(1)}`);
  console.log('n   p_n   lower(omega2)  h2>=   true   shortfall%  secs  cum-secs');
  let best = 1;
  let cum = 0;
  const seedTrue = argv.includes('--seed-true');
  for (let n = n0; n <= nmax; n++) {
    const primes = P.slice(2, n);
    // --seed-true isolates the PER-TERM shortfall: start each climb from the
    // published omega2(n-1) instead of from our own previous (short) answer,
    // so a stall at n = 13 does not cap every later term.
    if (seedTrue && TRUE_OMEGA[n - 1]) best = Math.max(best, TRUE_OMEGA[n - 1]);
    const t0 = Date.now();
    for (;;) {
      const cand = best + 1;
      const s = makeSolver(primes, cand);
      let res;
      try { res = s.run(0, budget); }
      catch (e) { break; }            // budget blown: stop climbing at this n
      if (!res.ok) break;             // genuinely infeasible (exact result)
      // verify the witness before accepting the lower bound
      const w = res.witness;
      const used = new Map();
      for (const [p, r] of w) {
        if (r === 0) throw new Error('zero class');
        if (!used.has(p)) used.set(p, new Set());
        used.get(p).add(r);
      }
      for (const [p, st] of used) if (st.size > 2) throw new Error('>2 classes mod ' + p);
      for (let q = 1; q <= cand; q++) {
        let hit = false;
        for (const [p, r] of w) if (q % p === r) { hit = true; break; }
        if (!hit) throw new Error('miss at ' + q);
      }
      best = cand;
    }
    const secs = (Date.now() - t0) / 1000;
    cum += secs;
    const tv = TRUE_OMEGA[n];
    const shortfall = tv ? (100 * (tv - best) / tv).toFixed(2) : '-';
    console.log(
      `${String(n).padEnd(3)} ${String(P[n - 1]).padEnd(5)} ${String(best).padEnd(14)} ` +
      `${String(6 * best + 6).padEnd(6)} ${String(tv || '-').padEnd(6)} ${String(shortfall).padEnd(11)} ` +
      `${secs.toFixed(2).padEnd(5)} ${cum.toFixed(1)}`
    );
  }
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/h2-lower-ladder.js
//   invocation:  node research/h2-lower-ladder.js
//   code-sha256: fff396ad731bcf27b54abef9cab5ca6d95a891736b78eed866520b358a9bd0d1
//   out-sha256:  7968048da9751ac505055742d50f7df1f709f303795040f9595a9daa5e550e12
//   body-lines:  30
//   inputs:      research/h2-prototype.js@4c7bdd5fff62
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     101.4 s
// ============================================================================
// # node budget per feasibility call: 2.0e+6
// n   p_n   lower(omega2)  h2>=   true   shortfall%  secs  cum-secs
// 3   5     2              18     2      0.00        0.00  0.0
// 4   7     4              30     4      0.00        0.00  0.0
// 5   11    10             66     10     0.00        0.00  0.0
// 6   13    24             150    24     0.00        0.00  0.0
// 7   17    31             192    31     0.00        0.00  0.0
// 8   19    42             258    42     0.00        0.02  0.0
// 9   23    60             366    60     0.00        0.81  0.8
// 10  29    74             450    74     0.00        1.14  2.0
// 11  31    94             570    94     0.00        2.11  4.1
// 12  37    112            678    117    4.27        1.08  5.2
// 13  41    133            804    148    10.14       2.39  7.6
// 14  43    158            954    173    8.67        1.04  8.6
// 15  47    173            1044   213    18.78       3.87  12.5
// 16  53    179            1080   236    24.15       1.38  13.9
// 17  59    189            1140   275    31.27       1.46  15.3
// 18  61    223            1344   316    29.43       7.03  22.3
// 19  67    253            1524   364    30.49       4.77  27.1
// 20  71    298            1794   409    27.14       13.47 40.6
// 21  73    313            1884   436    28.21       3.71  44.3
// 22  79    313            1884   -      -           1.35  45.6
// 23  83    357            2148   -      -           5.68  51.3
// 24  89    379            2280   -      -           9.69  61.0
// 25  97    393            2364   -      -           5.19  66.2
// 26  101   417            2508   -      -           20.50 86.7
// 27  103   438            2634   -      -           8.15  94.9
// 28  107   438            2634   -      -           1.97  96.8
// 29  109   487            2928   -      -           2.34  99.2
// 30  113   487            2928   -      -           2.13  101.3
// ============================================================================
// READINGS
// ============================================================================
