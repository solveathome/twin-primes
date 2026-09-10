// ============================================================================
// FOLD PROFILE 09 — NATAL DISPERSION: can the later primes kill the whole cohort?
// ============================================================================
// Chris, 2026-08-17: the natal cohort born at fold p comes from multiplying by
// every previous prime, so it is inherently misaligned with everything that came
// before. Can that be used to show the later primes cannot remove all of it?
//
// THE COHORT. Folding T_x (width W, edge slot at W-1) by p lays p copies, so the
// edge slot appears at kW - 1 for k = 1..p. The k = p copy is the new edge; of
// the other p-1, exactly two are struck (k = W^{-1} and k = -W^{-1} mod p), so
//
//        natal@p = { kW - 1 : 1 <= k <= p-1, k != +-W^{-1} (mod p) },  size p-3.
//
// THE LEMMA CHRIS IS REACHING FOR (PROVEN, one line).
//   For any prime q > p, the fold by q removes AT MOST TWO members of natal@p.
//   Proof: gcd(W,q) = 1 and q > p-1, so k -> kW-1 is injective mod q on
//   k in [1,p-1]. Each of the two struck classes therefore holds at most one
//   member. QED
// Consequence: after the next m folds at least p-3-2m natal slots survive, so
// the cohort cannot be emptied before m = (p-3)/2 further primes.
//
// THE TEST. That is a real dispersion result. The question is whether the budget
// reaches far enough to matter, and whether the cohort contains anything worth
// saving in the first place.
//   S1  the cohort, and how many of its members are GENUINE twin primes
//   S2  the heuristic: expected twin content of natal@p
//   S3  the lemma verified, and the real kill rate against the bound of 2
//   S4  the reach: how deep the cohort survives, against the depth certification needs
//
// Run:  node --max-old-space-size=8000 fold-profile-09-natal-dispersion.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

function primesTo(n) {
  const c = new Uint8Array(n + 1); const o = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { o.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return o;
}
const SMALL = primesTo(700000);              // enough to trial-divide past 4.9e11
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 0; i < SMALL.length; i++) {
    const q = SMALL[i];
    if (q * q > n) return true;
    if (n % q === 0) return n === q;
  }
  throw new Error('trial division range exceeded at ' + n);
}
const modinv = (a, m) => { let [g, x] = [a % m, 1], r = m, y = 0; while (r) { const t = Math.floor(g / r); [g, r] = [r, g - t * r]; [x, y] = [y, x - t * y]; } return ((x % m) + m) % m; };

const C2x2 = 1.3203236316;
const LADDER = [[5, 30, 7], [7, 210, 11], [11, 2310, 13], [13, 30030, 17], [17, 510510, 19],
                [19, 9699690, 23], [23, 223092870, 29], [29, 6469693230, 31]];

console.log('='.repeat(100));
console.log('FOLD PROFILE 09 — natal dispersion: the cohort, its reach, and what is inside it');
console.log('='.repeat(100));

// tile slot density at level x: (1/2) * prod_{3<=q<=x} (1 - 2/q)
function tileDensity(x) {
  let d = 0.5;
  for (const q of SMALL) { if (q > x) break; if (q > 2) d *= (1 - 2 / q); }
  return d;
}

console.log('');
console.log('S1/S2. THE COHORT AND ITS TWIN CONTENT');
console.log('-'.repeat(100));
console.log(' fold p | tile x | cohort size p-3 |  genuine twin pairs |  predicted |  fraction |  height of cohort');
const rows = [];
for (const [x, W, p] of LADDER) {
  const inv = modinv(W % p, p);
  const bad = new Set([inv, (p - inv) % p]);
  const cohort = [];
  for (let k = 1; k <= p - 1; k++) if (!bad.has(k % p)) cohort.push(k * W - 1);
  if (cohort.length !== p - 3) throw new Error('cohort size ' + cohort.length + ' != ' + (p - 3));
  let twins = 0;
  for (const r of cohort) if (isPrime(r) && isPrime(r + 2)) twins++;
  // predicted: among x-rough pairs at height Y, the fraction that are twin primes
  const dens = tileDensity(x);
  let pred = 0;
  for (const r of cohort) pred += (C2x2 / (Math.log(r) ** 2)) / dens;
  rows.push({ x, W, p, n: cohort.length, twins, pred });
  console.log(` ${String(p).padStart(6)} | ${String(x).padStart(6)} | ${String(p - 3).padStart(15)} | ` +
    `${String(twins).padStart(19)} | ${pred.toFixed(3).padStart(10)} | ${(twins / (p - 3)).toFixed(3).padStart(9)} | ` +
    `${(p * W).toExponential(2)}`);
}
console.log('');
console.log('   The predicted column is (twin-prime density at the cohort height) divided by');
console.log('   (x-rough pair density), summed over the cohort. It is the expected number of');
console.log('   GENUINE twin primes among the p-3 newly born slots.');
console.log('');
console.log('   Closed form: expected twin content ~ (p-3) * e^{2gamma} ln^2 x / ln^2 W ~ 3.17 ln^2 x / x,');
console.log('   since p ~ x and ln W = theta(x) ~ x. Projection:');
console.log('        x | expected twins in natal@p');
for (const x of [37, 100, 1000, 1e4, 1e6]) {
  console.log(`   ${String(x).padStart(6)} | ${(3.1722 * Math.log(x) ** 2 / x).toExponential(3)}`);
}

// ---------------------------------------------------------------------------
console.log('');
console.log('S3. THE DISPERSION LEMMA — at most 2 per fold, and the real rate');
console.log('-'.repeat(100));
console.log('   NOTE: a member removed when q equals its own lower or upper prime is a SELF-STRIKE,');
console.log('   i.e. a twin prime being found, not destroyed. Those are counted separately.');
console.log('');
console.log(' fold p | cohort |  q folded to |  max killed by one q |  bound |  destroyed |  self-struck |  half gone by q =');
for (const [x, W, p] of LADDER) {
  const inv = modinv(W % p, p);
  const bad = new Set([inv, (p - inv) % p]);
  let alive = [];
  for (let k = 1; k <= p - 1; k++) if (!bad.has(k % p)) alive.push(k * W - 1);
  const n0 = alive.length;
  let worst = 0, destroyed = 0, selfstruck = 0, halfAt = null, lastQ = 0;
  for (const q of SMALL) {
    if (q <= p) continue;
    const before = alive.length;
    const kept = [];
    for (const r of alive) {
      const hit = (r % q === 0) || ((r + 2) % q === 0);
      if (!hit) { kept.push(r); continue; }
      if (r === q || r + 2 === q) selfstruck++; else destroyed++;
    }
    alive = kept; lastQ = q;
    const killed = before - alive.length;
    if (killed > worst) worst = killed;
    if (halfAt === null && alive.length * 2 <= n0) halfAt = q;
    if (alive.length === 0) break;
    if (q > 200000) break;
  }
  console.log(` ${String(p).padStart(6)} | ${String(n0).padStart(6)} | ${String(lastQ).padStart(12)} | ` +
    `${String(worst).padStart(20)} | ${String(2).padStart(6)} | ${String(destroyed).padStart(10)} | ` +
    `${String(selfstruck).padStart(12)} | ${String(halfAt === null ? 'never' : halfAt).padStart(17)}`);
}
console.log('');
console.log('');
console.log('   The bound of 2 is never exceeded, as the lemma requires. CUSTODY: (still alive at the');
console.log('   fold limit) + (self-struck) equals the genuine twin count of S1 at every row, since a');
console.log('   member is only ever removed by a composite factor or by its own prime.');
console.log('');
console.log('   The half-life column is the point. At q just above p the expected kills per fold are');
console.log('   (p-3)*2/q ~ 2, so the bound of 2 is essentially TIGHT at the start and the cohort');
console.log('   really is emptied on the schedule the lemma permits, by q ~ p^1.3. That is nowhere');
console.log('   near sqrt(W) = e^{x/2}, which is where certification lives.');

// ---------------------------------------------------------------------------
console.log('');
console.log('S4. THE REACH — how deep the cohort survives, against the depth certification needs');
console.log('-'.repeat(100));
console.log('   The lemma permits m = (p-3)/2 further folds before the cohort could be emptied.');
console.log('   Those folds reach roughly the (pi(p) + m)-th prime, so a sift level of about');
console.log('   Q ~ (x ln x)/2. Certification of a slot at height ~W = e^x needs sift level sqrt(W)');
console.log('   = e^{x/2}. In sieve currency u = ln W / ln Q:');
console.log('');
console.log('        x |  guaranteed sift level Q ~ x ln x / 2 |  u there |  u needed | verdict');
for (const x of [23, 37, 100, 1000, 1e6]) {
  const Q = (x * Math.log(x)) / 2;
  const lnW = x;                       // theta(x) ~ x
  const u = lnW / Math.log(Q);
  console.log(`   ${String(x).padStart(6)} | ${Q.toExponential(3).padStart(37)} | ${u.toFixed(1).padStart(8)} | ` +
    `${'2'.padStart(9)} | ${u > 4.26645 ? 'deep inside the region DHR already covers' : 'below beta_2'}`);
}
console.log('');
console.log('   So the dispersion budget runs out at u ~ x/ln x, which is not merely short of the');
console.log('   u = 2 that certification needs: it is far ABOVE beta_2 = 4.26645, meaning the');
console.log('   region the lemma protects is already covered by the standard sieve for free.');

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-09-natal-dispersion.js
//   invocation:  node research/fold-profile-09-natal-dispersion.js
//   code-sha256: a99e5dd783c522a4a3fb83f6ffaaaa5f86558e28ee62b94fe677090987ac06ba
//   out-sha256:  49f851be4b0898d13b0692453a2ecd584963fce54de94f8a1ff4070c938affd8
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.1 s
// ============================================================================
// ====================================================================================================
// FOLD PROFILE 09 — natal dispersion: the cohort, its reach, and what is inside it
// ====================================================================================================
//
// S1/S2. THE COHORT AND ITS TWIN CONTENT
// ----------------------------------------------------------------------------------------------------
//  fold p | tile x | cohort size p-3 |  genuine twin pairs |  predicted |  fraction |  height of cohort
//       7 |      5 |               4 |                   4 |      2.977 |     1.000 | 2.10e+2
//      11 |      7 |               8 |                   2 |      3.112 |     0.250 | 2.31e+3
//      13 |     11 |              10 |                   4 |      2.610 |     0.400 | 3.00e+4
//      17 |     13 |              14 |                   6 |      2.517 |     0.429 | 5.11e+5
//      19 |     17 |              16 |                   2 |      2.096 |     0.125 | 9.70e+6
//      23 |     19 |              20 |                   1 |      2.030 |     0.050 | 2.23e+8
//      29 |     23 |              26 |                   7 |      2.069 |     0.269 | 6.47e+9
//      31 |     29 |              28 |                   1 |      1.780 |     0.036 | 2.01e+11
//
//    The predicted column is (twin-prime density at the cohort height) divided by
//    (x-rough pair density), summed over the cohort. It is the expected number of
//    GENUINE twin primes among the p-3 newly born slots.
//
//    Closed form: expected twin content ~ (p-3) * e^{2gamma} ln^2 x / ln^2 W ~ 3.17 ln^2 x / x,
//    since p ~ x and ln W = theta(x) ~ x. Projection:
//         x | expected twins in natal@p
//        37 | 1.118e+0
//       100 | 6.727e-1
//      1000 | 1.514e-1
//     10000 | 2.691e-2
//    1000000 | 6.055e-4
//
// S3. THE DISPERSION LEMMA — at most 2 per fold, and the real rate
// ----------------------------------------------------------------------------------------------------
//    NOTE: a member removed when q equals its own lower or upper prime is a SELF-STRIKE,
//    i.e. a twin prime being found, not destroyed. Those are counted separately.
//
//  fold p | cohort |  q folded to |  max killed by one q |  bound |  destroyed |  self-struck |  half gone by q =
//       7 |      4 |          179 |                    1 |      2 |          0 |            4 |                59
//      11 |      8 |         1049 |                    2 |      2 |          6 |            2 |                23
//      13 |     10 |        25409 |                    2 |      2 |          6 |            4 |                31
//      17 |     14 |       200003 |                    1 |      2 |          8 |            1 |                89
//      19 |     16 |       200003 |                    2 |      2 |         14 |            0 |                43
//      23 |     20 |       200003 |                    2 |      2 |         19 |            0 |                67
//      29 |     26 |       200003 |                    2 |      2 |         19 |            0 |                89
//      31 |     28 |       200003 |                    2 |      2 |         27 |            0 |               149
//
//
//    The bound of 2 is never exceeded, as the lemma requires. CUSTODY: (still alive at the
//    fold limit) + (self-struck) equals the genuine twin count of S1 at every row, since a
//    member is only ever removed by a composite factor or by its own prime.
//
//    The half-life column is the point. At q just above p the expected kills per fold are
//    (p-3)*2/q ~ 2, so the bound of 2 is essentially TIGHT at the start and the cohort
//    really is emptied on the schedule the lemma permits, by q ~ p^1.3. That is nowhere
//    near sqrt(W) = e^{x/2}, which is where certification lives.
//
// S4. THE REACH — how deep the cohort survives, against the depth certification needs
// ----------------------------------------------------------------------------------------------------
//    The lemma permits m = (p-3)/2 further folds before the cohort could be emptied.
//    Those folds reach roughly the (pi(p) + m)-th prime, so a sift level of about
//    Q ~ (x ln x)/2. Certification of a slot at height ~W = e^x needs sift level sqrt(W)
//    = e^{x/2}. In sieve currency u = ln W / ln Q:
//
//         x |  guaranteed sift level Q ~ x ln x / 2 |  u there |  u needed | verdict
//        23 |                              3.606e+1 |      6.4 |         2 | deep inside the region DHR already covers
//        37 |                              6.680e+1 |      8.8 |         2 | deep inside the region DHR already covers
//       100 |                              2.303e+2 |     18.4 |         2 | deep inside the region DHR already covers
//      1000 |                              3.454e+3 |    122.7 |         2 | deep inside the region DHR already covers
//    1000000 |                              6.908e+6 |  63499.5 |         2 | deep inside the region DHR already covers
//
//    So the dispersion budget runs out at u ~ x/ln x, which is not merely short of the
//    u = 2 that certification needs: it is far ABOVE beta_2 = 4.26645, meaning the
//    region the lemma protects is already covered by the standard sieve for free.
//
//    done in 0.1s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 0. PRICING FIRST, BECAUSE THE PREVIOUS SWEEP COULD NOT. Wave 5's partition
//    report (research/history/staging/qc-scripts-S2.md, "What was not reached")
//    listed this file as the one fold-profile script it did not re-run, on the
//    ground that it "trial-divides past 4.9e11 with a 700,000-prime table" and
//    was therefore "NEEDS COMPUTE, unpriced". Measured: 0.09 s wall, the
//    FASTEST file in the family. The cohorts are p-3 members wide (28 at the
//    largest row) and the trial division stops at sqrt(2e11) = 4.5e5, so the
//    whole S1 loop is a few thousand divisions. The header's
//    --max-old-space-size=8000 is not needed either; the only allocation is a
//    700 KB sieve. The estimate was off by four orders of magnitude, which is
//    worth recording as a caution on pricing from source.
// 1. THE LEMMA HOLDS AT EVERY ROW AND IT IS THE FILE'S PROVEN CORE. "max killed
//    by one q" reads 1, 2, 2, 1, 2, 2, 2, 2 against a bound of 2 across all
//    eight ladder folds. The one-line proof in the header (k -> kW-1 is
//    injective mod q for q > p-1, so each of the two struck classes holds at
//    most one member) is correct and the table is a check on it, not evidence
//    for it.
// 2. CUSTODY HOLDS, BUT ONLY IF YOU DO THE ARITHMETIC YOURSELF. The file
//    asserts "(still alive at the fold limit) + (self-struck) equals the
//    genuine twin count of S1 at every row" and prints no such column and no
//    PASS/FAIL. Doing it by hand from the two tables: cohort - destroyed -
//    self-struck + self-struck against S1's twin count gives 4/4, 2/2, 4/4,
//    6/6, 2/2, 1/1, 7/7, 1/1. It holds at all eight rows. An unprinted custody
//    claim is a claim, not a check, and this one would go on reading true after
//    a regression broke it.
// 3. THE COHORT IS ESSENTIALLY EMPTY OF TWINS AND THAT IS THE ANSWER TO CHRIS'S
//    QUESTION. Genuine twin pairs per cohort: 4, 2, 4, 6, 2, 1, 7, 1 against
//    cohort sizes 4, 8, 10, 14, 16, 20, 26, 28 — fractions 1.000, 0.250, 0.400,
//    0.429, 0.125, 0.050, 0.269, 0.036. The predicted column is flat at
//    1.8-3.1 the whole way and the closed form gives 3.17 ln^2 x / x, which is
//    1.1 at x = 37 and 6.1e-4 at x = 10^6. So the natal cohort's twin content
//    goes to ZERO, and a dispersion result that protects the cohort protects a
//    set that asymptotically contains no twin primes. The dispersion lemma is
//    true and the object it protects is worthless. The file says this in S4 in
//    sieve currency; the S1 fractions say it more directly and are not
//    commented on.
// 4. THE MEASURED TWIN COUNTS SCATTER AROUND THE PREDICTION BY A FACTOR OF 7
//    AND NOTHING SAYS SO. Predicted 2.977, 3.112, 2.610, 2.517, 2.096, 2.030,
//    2.069, 1.780; observed 4, 2, 4, 6, 2, 1, 7, 1. The 7 at p = 29 against a
//    prediction of 2.07 and the 1 at p = 31 against 1.78 are both consistent
//    with Poisson at these counts, so nothing is anomalous — but with expected
//    values near 2 the whole table is a handful of Poisson draws and cannot
//    distinguish the heuristic from anything within a factor of two. No error
//    bars, eight points.
// 5. "THE COHORT REALLY IS EMPTIED" IS CONTRADICTED BY THE TABLE THAT PRECEDES
//    IT, IN FIVE OF EIGHT ROWS. The S3 closing paragraph says the cohort "is
//    emptied on the schedule the lemma permits, by q ~ p^1.3". At the fold
//    limit q = 200,003 the survivors are cohort - destroyed - self-struck =
//    0, 0, 0, 5, 2, 1, 7, 1. Rows p = 17, 19, 23, 29, 31 still hold members,
//    and they always will: the survivors are exactly the genuine twin primes of
//    reading 3, which no later fold can remove. So the cohort is NEVER emptied
//    when it contains a twin, and "emptied" should read "reduced to its twin
//    primes". What the half-life column does support is the DECAY RATE: q at
//    which half is gone reads 59, 23, 31, 89, 43, 67, 89, 149, i.e. p^2.1,
//    p^1.31, p^1.34, p^1.58, p^1.28, p^1.34, p^1.33, p^1.46 — the p^1.3 claim
//    fits six of eight and the p = 7 row (p^2.1) is a four-member cohort.
// 6. S4'S VERDICT IS THE FILE'S REAL RESULT AND IT IS NEGATIVE. The guaranteed
//    sift level from the dispersion budget is Q ~ x ln x / 2, giving u = 6.4,
//    8.8, 18.4, 122.7, 63,499.5 at x = 23, 37, 100, 1000, 10^6 — every one far
//    ABOVE beta_2 = 4.26645, so the region the lemma protects is already
//    covered free by the standard two-dimensional sieve. The budget runs out at
//    u ~ x/ln x and the target is u = 2. This route is closed, and the file is
//    honest about closing it.
// 7. SCOPE. Eight ladder folds, cohorts of 4 to 28 members. The S3 fold loop
//    stops at q = 200,003 (a hard `if (q > 200000) break`), so "destroyed" and
//    "still alive" are as-of that limit, not final; for the five rows with
//    survivors the counts happen to be final because the survivors are twin
//    primes, but the script does not know that and does not say it. Every
//    projection in S1's closed form and all of S4 is asymptotic arithmetic, not
//    measurement. Runtime 0.09 s.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   2.01e+11 -> 2e11 (reading 0, the height of the p = 31 cohort).
//   6.055e-4 -> 6.1e-4 (reading 3, the closed form at x = 10^6).
//   2.069 -> 2.07 (reading 4, the prediction at p = 29).
// DERIVED IN THIS READING by arithmetic over printed values:
//   sqrt(2e11) = 4.5e5 (reading 0) is the square root of the largest printed
//   cohort height, 447,214.
//   p^1.31, p^1.34, p^1.58, p^1.28, p^1.34, p^1.33, p^1.46 (reading 5) are
//   ln q / ln p on the printed half-life column, q = 23, 31, 89, 43, 67, 89,
//   149 against p = 11, 13, 17, 19, 23, 29, 31.
// IN-CODE: 4.9e11 and the 700,000-prime table are the comment on line 43,
//   `primesTo(700000)  // enough to trial-divide past 4.9e11`, which is also
//   the sentence research/history/staging/qc-scripts-S2.md:434 quoted when it
//   priced this file from source. The 700 KB sieve is that same call, one byte
//   per integer. --max-old-space-size=8000 is the Run: line at line 30, and
//   `if (q > 200000) break` is line 133.
// ---------------------------------------------------------------------------
