// ============================================================================
// MEASURE-G2-GENERIC 01 — IS G2 GENERIC IN THE COORDINATE THE SIEVE DISCARDS?
// THE CLASS POSITIONS, AGAINST A CENSUS-MATCHED TWO-CLASS ENSEMBLE
// ============================================================================
// THE QUESTION. `object-g2-read-0829.md` §8 Q1 and §6 C1: every upper-bound
// argument on G2 keeps the class COUNT (two classes per odd prime) and discards
// the class POSITIONS. Nobody has measured what the positions are worth for the
// MAXIMUM GAP itself. Where does G2(x#) sit in the distribution of the same
// maximum taken over other class configurations with the same census
// D_x = prod_{3<=q<=x}(q-2)?
//
// THE DOUBT, FIRST. Three of them, and the first is fatal to the naive design.
//  (a) The ensemble is not what the brief assumed. E1 (free pairs) and E2
//      (constant shift {0,-d}) are the SAME ensemble up to translation, proven
//      in the pre-registration §1c before this file existed: the orbit of a
//      census-matched two-class configuration under global translation is
//      exactly its per-prime difference vector modulo an INDEPENDENT sign flip
//      at each prime, so there are prod_{3<=p<=x}(p-1)/2 orbits and the map
//      d -> orbit is uniform and onto. So "is E2 generic inside E1" is settled
//      a priori and the run's job on that head is CUSTODY, not measurement.
//  (b) A percentile carries no infinitude content. Verdict label (i). Nothing
//      here bears on the exponent or on the band (2, 4.26645].
//  (c) Five levels, x <= 23, and the corpus's own record on small-level
//      readings (covering-dive.md §164) is that they cross laws rather than
//      reveal them. Every number below is a finite-level number.
//
// PRE-REGISTRATION: `research/history/staging/measure-g2-generic-0829.md` §1,
// written 2026-08-29 07:00:02Z before this file existed (created 07:02:57Z). This agent runs no git
// command, so §1's custody is that it was on disk first and nothing more.
//
// SETTING AND CONVENTIONS.
//   W = x#, one period. Twin slot: r with gcd(r(r+2), x#) = 1.
//   G2(x#): largest CYCLIC gap between consecutive twin slots (G2-STATE §1a).
//   A configuration: one class {a_2} at p = 2 (the twin pattern has one there,
//     since {0,-2} coincide mod 2) and an unordered pair {a_p, b_p} at each odd
//     p <= x. Census is then exactly D_x = prod_{3<=q<=x}(q-2), asserted per
//     sieve below and never assumed.
//   Orbit: a configuration modulo global translation r -> r + t. Represented
//     here by the difference vector e_p in [1, (p-1)/2], as classes {0, e_p}.
//   The twin tile is the orbit e_p = min(2, p-2), that is e_3 = 1 and e_p = 2
//     for p >= 5. SEC A checks that this representative returns the LADDER.
//   Constant shift d: classes {0, -d}, d even, and CENSUS-MATCHED means
//     p does not divide d for every odd p <= x.
//
// TWO ENGINES, SHARING NO SIEVE CODE.
//   FAST: works on the half-period of positions r odd (a_2 = 0), array of W/2
//     bytes, marks i = (c-1)*inv2 mod p for each killed class c, scans once.
//   NAIVE: works on the full period, array of W bytes, marks residues directly
//     in r-coordinates with an arbitrary a_2, scans once. Used for the LADDER
//     custody, for the free-pair sampler, and for a head-to-head on identical
//     configurations.
//
// WIDTH AUDIT. Largest period 23# = 223,092,870 < 2^31; every index, gap,
// count and product below is an exact int32 or an exact double (largest
// integer handled: 223,092,870). No BigInt needed and none used. Sums of gaps
// are never taken. The PRNG is mulberry32 on a printed fixed seed.
//
// PRIOR ART AND SOURCES ON DISK (cited, not re-derived):
//   LADDER G2(x#) = 42, 66, 108, 150, 204 at x = 11..23:
//     research/exact-g2-ladder.js LADDER, = A144311 + 1.
//   h2 = A288815 (Ziller-Morack paired Jacobsthal, worst over even offsets),
//     terms at x = 11..23: 66, 150, 192, 258, 366:
//     research/external-ladders-01.js H2.
//   The E1/E2 collapse is elementary CRT and is NOT claimed as new; the owning
//     convention was not searched, per SEARCH-CONVENTIONS.md §1.
// ============================================================================

'use strict';

const SEED = 20260829;
let _s = SEED >>> 0;
function rnd() { // mulberry32
  _s = (_s + 0x6D2B79F5) >>> 0;
  let t = _s;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function rint(n) { return Math.floor(rnd() * n); }

const ALLP = [2, 3, 5, 7, 11, 13, 17, 19, 23];
const oddPrimes = (x) => ALLP.filter(p => p > 2 && p <= x);
const period = (x) => ALLP.filter(p => p <= x).reduce((a, b) => a * b, 1);
const census = (x) => oddPrimes(x).reduce((a, p) => a * (p - 2), 1);
const orbitCount = (x) => oddPrimes(x).reduce((a, p) => a * ((p - 1) / 2), 1);
const shiftCount = (x) => oddPrimes(x).reduce((a, p) => a * (p - 1), 1);

const LADDER = { 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204 };
const H2 = { 3: 6, 5: 18, 7: 30, 11: 66, 13: 150, 17: 192, 19: 258, 23: 366 };

// ---------------------------------------------------------------- FAST ENGINE
// evec[k] is the second killed class mod oddPrimes(x)[k]; the first is 0.
// evec[k] = 0 means the two classes COINCIDE (one class killed at that prime),
// which is legal input and breaks the census; the caller decides.
function fastMaxGap(x, evec, buf) {
  const ps = oddPrimes(x), H = period(x) / 2;
  buf.fill(0, 0, H);
  for (let k = 0; k < ps.length; k++) {
    const p = ps[k], inv2 = (p + 1) / 2;
    const cls = [0, evec[k]];
    for (let j = 0; j < 2; j++) {
      const c = cls[j];
      const s = ((((c - 1) % p) + p) % p) * inv2 % p;
      for (let i = s; i < H; i += p) buf[i] = 1;
    }
  }
  let first = -1, last = -1, max = 0, cnt = 0;
  for (let i = 0; i < H; i++) {
    if (buf[i] === 0) {
      cnt++;
      if (first < 0) first = i; else { const g = i - last; if (g > max) max = g; }
      last = i;
    }
  }
  if (cnt === 0) return { max: -1, cnt: 0 };
  const wrap = first + H - last; if (wrap > max) max = wrap;
  return { max: 2 * max, cnt };
}

// --------------------------------------------------------------- NAIVE ENGINE
// classes[k] is an array of killed residues mod ALLP[k] (k over ALL primes <= x,
// p = 2 included). Full period, r-coordinates, no half-period trick.
function naiveMaxGap(x, classes, buf) {
  const ps = ALLP.filter(p => p <= x), W = period(x);
  buf.fill(0, 0, W);
  for (let k = 0; k < ps.length; k++) {
    const p = ps[k];
    for (const c of classes[k]) for (let r = ((c % p) + p) % p; r < W; r += p) buf[r] = 1;
  }
  let first = -1, last = -1, max = 0, cnt = 0;
  for (let r = 0; r < W; r++) {
    if (buf[r] === 0) {
      cnt++;
      if (first < 0) first = r; else { const g = r - last; if (g > max) max = g; }
      last = r;
    }
  }
  if (cnt === 0) return { max: -1, cnt: 0 };
  const wrap = first + W - last; if (wrap > max) max = wrap;
  return { max, cnt };
}

// ------------------------------------------------------------------- STATS
function stats(v) {
  const n = v.length, mean = v.reduce((a, b) => a + b, 0) / n;
  const sd = n > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - mean) * (b - mean), 0) / (n - 1)) : 0;
  const s = v.slice().sort((a, b) => a - b);
  const q = (f) => s[Math.min(n - 1, Math.max(0, Math.round(f * (n - 1))))];
  return { n, mean, sd, min: s[0], max: s[n - 1], p05: q(0.05), p50: q(0.5), p95: q(0.95) };
}
function placement(v, g) {
  const n = v.length;
  let below = 0, eq = 0;
  for (const t of v) { if (t < g) below++; else if (t === g) eq++; }
  return {
    below: below / n, atOrBelow: (below + eq) / n, mid: (below + 0.5 * eq) / n,
    ties: eq
  };
}
const f3 = (t) => t.toFixed(3);
const pc = (t) => (100 * t).toFixed(2) + '%';

let lastTick = Date.now();
function tick(msg) {
  if (Date.now() - lastTick > 30000) { process.stderr.write(msg + '\n'); lastTick = Date.now(); }
}

console.log('MEASURE-G2-GENERIC 01 — G2 against the census-matched two-class ensemble');
console.log('PRNG mulberry32, SEED = ' + SEED + ' (fixed, printed per house rule)');
console.log('');

// ============================================================================
// SEC A. CUSTODY: BOTH ENGINES, THE LADDER, AND THE CENSUS
// ============================================================================
console.log('SEC A. CUSTODY');
console.log('A1. The twin tile on both engines against research/exact-g2-ladder.js LADDER.');
console.log('  x   W            G2(fast) G2(naive) LADDER  match  census  D_x    match');
let aOK = true;
for (const x of [3, 5, 7, 11, 13, 17, 19, 23]) {
  const W = period(x), ps = ALLP.filter(p => p <= x);
  const fbuf = new Uint8Array(W / 2);
  // fast: the ORBIT REPRESENTATIVE of the twin tile, e_p = min(2, p-2)
  const ev = oddPrimes(x).map(p => Math.min(2, p - 2));
  const rf = fastMaxGap(x, ev, fbuf);
  // naive: the LITERAL twin classes {0, -2} at every prime, p = 2 included
  const cls = ps.map(p => (p === 2 ? [0] : [0, p - 2]));
  const nbuf = new Uint8Array(W);
  const rn = naiveMaxGap(x, cls, nbuf);
  const ok = rf.max === LADDER[x] && rn.max === LADDER[x];
  const ok2 = rf.cnt === census(x) && rn.cnt === census(x);
  aOK = aOK && ok && ok2;
  console.log('  ' + String(x).padEnd(3) + ' ' + String(W).padEnd(12) + ' ' +
    String(rf.max).padEnd(8) + ' ' + String(rn.max).padEnd(9) + ' ' +
    String(LADDER[x]).padEnd(7) + ' ' + String(ok).padEnd(6) + ' ' +
    String(rf.cnt).padEnd(7) + ' ' + String(census(x)).padEnd(6) + ' ' + ok2);
}
console.log('  A1 VERDICT: ' + (aOK ? 'PASS' : 'FAIL') +
  '  (the fast engine is run on the ORBIT REPRESENTATIVE e_p = min(2,p-2),');
console.log('   the naive engine on the LITERAL classes {0,-2}: agreement is the first');
console.log('   check of the §1c collapse, since those are different configurations.)');
console.log('');

console.log('A2. Head-to-head on identical random configurations (fast vs naive), x = 13, 17.');
for (const x of [13, 17]) {
  const W = period(x), ps = ALLP.filter(p => p <= x);
  const fbuf = new Uint8Array(W / 2), nbuf = new Uint8Array(W);
  let agree = 0, tot = 0;
  for (let s = 0; s < 200; s++) {
    const ev = oddPrimes(x).map(p => 1 + rint((p - 1) / 2));
    const rf = fastMaxGap(x, ev, fbuf);
    const cls = ps.map((p, k) => (p === 2 ? [0] : [0, ev[k - 1]]));
    const rn = naiveMaxGap(x, cls, nbuf);
    tot++; if (rf.max === rn.max && rf.cnt === rn.cnt) agree++;
  }
  console.log('  x = ' + x + ': ' + agree + ' of ' + tot + ' identical (max gap and census)');
}
console.log('');

// ============================================================================
// SEC B. THE EXHAUSTIVE ENSEMBLE AT x <= 19
// ============================================================================
console.log('SEC B. EXHAUSTIVE ENSEMBLE OVER ALL prod (p-1)/2 ORBITS, x = 3..19');
console.log('  Every orbit sieved once. The percentile of G2 is EXACT here, not a sample.');
console.log('');
const EXH = {};
for (const x of [3, 5, 7, 11, 13, 17, 19]) {
  const ps = oddPrimes(x), W = period(x), nOrb = orbitCount(x);
  const buf = new Uint8Array(W / 2);
  const half = ps.map(p => (p - 1) / 2);
  const ev = ps.map(() => 1);
  const vals = new Array(nOrb);
  for (let idx = 0; idx < nOrb; idx++) {
    let t = idx;
    for (let k = 0; k < ps.length; k++) { ev[k] = 1 + (t % half[k]); t = (t - (t % half[k])) / half[k]; }
    const r = fastMaxGap(x, ev, buf);
    if (r.cnt !== census(x)) throw new Error('census break at x=' + x + ' idx=' + idx);
    vals[idx] = r.max;
    if ((idx & 255) === 0) tick('  [SEC B] x=' + x + ' orbit ' + idx + '/' + nOrb);
  }
  EXH[x] = vals;
  const st = stats(vals), pl = placement(vals, LADDER[x]);
  console.log('  x = ' + x + '  orbits = ' + nOrb + '  W = ' + W);
  console.log('    ensemble: mean ' + f3(st.mean) + '  sd ' + f3(st.sd) +
    '  min ' + st.min + '  p05 ' + st.p05 + '  median ' + st.p50 +
    '  p95 ' + st.p95 + '  max ' + st.max);
  console.log('    G2(x#) = ' + LADDER[x] + '   z = ' + f3((LADDER[x] - st.mean) / (st.sd || 1)) +
    '   percentile: below ' + pc(pl.below) + ', at-or-below ' + pc(pl.atOrBelow) +
    ', MIDRANK ' + pc(pl.mid) + '  (ties ' + pl.ties + ')');
  console.log('    ensemble max ' + st.max + '  vs A288815 h2 = ' + H2[x] +
    '  ' + (st.max === H2[x] ? 'MATCH' : 'MISMATCH by ' + (st.max - H2[x])));
  if (nOrb <= 200) {
    const hist = new Map();
    for (const v of vals) hist.set(v, (hist.get(v) || 0) + 1);
    const keys = [...hist.keys()].sort((a, b) => a - b);
    console.log('    full distribution: ' + keys.map(k => k + 'x' + hist.get(k)).join('  '));
  }
  console.log('');
}

// ============================================================================
// SEC C. THE d-PARAMETRISATION (E2), AND WHETHER h2 SITS INSIDE IT
// ============================================================================
console.log('SEC C. E2, THE CONSTANT SHIFTS d');
console.log('C1. All census-matched d (d even, p does not divide d) at x = 11, 13:');
console.log('    each orbit must receive exactly 2^(pi(x)-1) values of d (§1c step 4).');
for (const x of [11, 13]) {
  const ps = oddPrimes(x), W = period(x), buf = new Uint8Array(W / 2);
  const vals = [];
  const perOrbit = new Map();
  for (let d = 2; d < W; d += 2) {
    let okd = true; for (const p of ps) if (d % p === 0) okd = false;
    if (!okd) continue;
    const ev = ps.map(p => Math.min(d % p, p - (d % p)));
    const r = fastMaxGap(x, ev, buf);
    if (r.cnt !== census(x)) throw new Error('census break in C1');
    vals.push(r.max);
    const key = ev.join(',');
    perOrbit.set(key, (perOrbit.get(key) || 0) + 1);
  }
  const counts = [...perOrbit.values()];
  const expect = Math.pow(2, ps.length);
  const st = stats(vals), pl = placement(vals, LADDER[x]);
  const stE = stats(EXH[x]);
  console.log('  x = ' + x + '  #d = ' + vals.length + ' (= prod(p-1) = ' + shiftCount(x) + ')' +
    '  orbits hit = ' + perOrbit.size + ' of ' + orbitCount(x) +
    '  d per orbit: min ' + Math.min(...counts) + ' max ' + Math.max(...counts) +
    ' (expect ' + expect + ')');
  console.log('    E2 over d: mean ' + f3(st.mean) + ' sd ' + f3(st.sd) + ' min ' + st.min +
    ' max ' + st.max + '   E1 over orbits: mean ' + f3(stE.mean) + ' sd ' + f3(stE.sd) +
    ' min ' + stE.min + ' max ' + stE.max);
  console.log('    G2 midrank in E2 ' + pc(pl.mid) + '  vs in E1 ' + pc(placement(EXH[x], LADDER[x]).mid));
}
console.log('');
console.log('C2. ALL even d, census-matched or not, at x = 11, 13: does h2 live inside');
console.log('    the census-matched family, or at a d divisible by some odd p <= x?');
for (const x of [11, 13]) {
  const ps = oddPrimes(x), W = period(x), buf = new Uint8Array(W / 2);
  let best = -1, bestD = -1, bestMatched = null, bestUnmatched = -1;
  for (let d = 2; d < W; d += 2) {
    const ev = ps.map(p => d % p);
    const r = fastMaxGap(x, ev, buf);
    const matched = ev.every(e => e !== 0);
    if (r.max > best) { best = r.max; bestD = d; bestMatched = matched; }
    if (!matched && r.max > bestUnmatched) bestUnmatched = r.max;
  }
  console.log('  x = ' + x + ': max over ALL even d = ' + best + ' at d = ' + bestD +
    ' (census-matched: ' + bestMatched + ');  best NON-matched d gives ' + bestUnmatched +
    ';  A288815 h2 = ' + H2[x]);
}
console.log('');

// ============================================================================
// SEC D. THE FREE-PAIR SAMPLER (E1 AS BRIEFED), INDEPENDENT ENGINE
// ============================================================================
console.log('SEC D. E1 SAMPLED AS BRIEFED (free pairs, naive full-period engine)');
console.log('  a_2 drawn from {0,1}; at each odd p an unordered pair drawn uniformly from');
console.log('  the C(p,2) pairs. Compared against SEC B\'s EXACT orbit distribution.');
console.log('  x    N     mean     sd      min  max   G2 midrank   exact midrank   max|CDF diff|');
for (const x of [11, 13, 17, 19]) {
  const ps = ALLP.filter(p => p <= x), W = period(x), buf = new Uint8Array(W);
  const N = 500, vals = [];
  for (let s = 0; s < N; s++) {
    const cls = ps.map(p => {
      if (p === 2) return [rint(2)];
      const a = rint(p); let b = rint(p - 1); if (b >= a) b++;
      return [a, b];
    });
    const r = naiveMaxGap(x, cls, buf);
    if (r.cnt !== census(x)) throw new Error('census break in SEC D');
    vals.push(r.max);
    tick('  [SEC D] x=' + x + ' sample ' + s + '/' + N);
  }
  const st = stats(vals), pl = placement(vals, LADDER[x]);
  const ex = EXH[x];
  const allv = [...new Set([...vals, ...ex])].sort((a, b) => a - b);
  let ks = 0;
  for (const t of allv) {
    const c1 = vals.filter(v => v <= t).length / vals.length;
    const c2 = ex.filter(v => v <= t).length / ex.length;
    ks = Math.max(ks, Math.abs(c1 - c2));
  }
  console.log('  ' + String(x).padEnd(4) + ' ' + String(N).padEnd(5) + ' ' +
    f3(st.mean).padEnd(8) + ' ' + f3(st.sd).padEnd(7) + ' ' + String(st.min).padEnd(4) + ' ' +
    String(st.max).padEnd(5) + ' ' + pc(pl.mid).padEnd(12) + ' ' +
    pc(placement(ex, LADDER[x]).mid).padEnd(15) + ' ' + f3(ks));
}
console.log('');

// ============================================================================
// SEC E. x = 23, SAMPLED
// ============================================================================
console.log('SEC E. x = 23 (W = 223,092,870), SAMPLED: 142,560 orbits is 11.6 h exhaustive');
{
  const x = 23, ps = oddPrimes(x), W = period(x), nOrb = orbitCount(x);
  const buf = new Uint8Array(W / 2);
  const N = 5000, vals = [];
  for (let s = 0; s < N; s++) {
    const ev = ps.map(p => 1 + rint((p - 1) / 2));
    const r = fastMaxGap(x, ev, buf);
    if (r.cnt !== census(x)) throw new Error('census break in SEC E');
    vals.push(r.max);
    tick('  [SEC E] orbit sample ' + s + '/' + N);
  }
  const st = stats(vals), pl = placement(vals, LADDER[x]);
  console.log('  E1/E2 (identical ensembles), N = ' + N + ' of ' + nOrb + ' orbits, uniform:');
  console.log('    mean ' + f3(st.mean) + '  sd ' + f3(st.sd) + '  min ' + st.min +
    '  p05 ' + st.p05 + '  median ' + st.p50 + '  p95 ' + st.p95 + '  max ' + st.max);
  console.log('    G2(23#) = 204   z = ' + f3((204 - st.mean) / st.sd) +
    '   percentile: below ' + pc(pl.below) + ', at-or-below ' + pc(pl.atOrBelow) +
    ', MIDRANK ' + pc(pl.mid) + '  (ties ' + pl.ties + ')');
  console.log('    sampled max ' + st.max + ' (a LOWER bound on the ensemble max) vs h2 = ' + H2[23]);

  // independent path: free pairs on the naive engine
  const nbuf = new Uint8Array(W), psAll = ALLP.filter(p => p <= x);
  const N2 = 200, v2 = [];
  for (let s = 0; s < N2; s++) {
    const cls = psAll.map(p => {
      if (p === 2) return [rint(2)];
      const a = rint(p); let b = rint(p - 1); if (b >= a) b++;
      return [a, b];
    });
    const r = naiveMaxGap(x, cls, nbuf);
    if (r.cnt !== census(x)) throw new Error('census break in SEC E free-pair');
    v2.push(r.max);
    tick('  [SEC E] free-pair sample ' + s + '/' + N2);
  }
  const st2 = stats(v2);
  let ks = 0;
  const allv = [...new Set([...vals, ...v2])].sort((a, b) => a - b);
  for (const t of allv) {
    const c1 = vals.filter(v => v <= t).length / vals.length;
    const c2 = v2.filter(v => v <= t).length / v2.length;
    ks = Math.max(ks, Math.abs(c1 - c2));
  }
  console.log('    free-pair check, N = ' + N2 + ' on the naive engine: mean ' + f3(st2.mean) +
    '  sd ' + f3(st2.sd) + '  min ' + st2.min + '  max ' + st2.max +
    '  max|CDF diff| vs the orbit sampler ' + f3(ks));
  console.log('    two-sample z on the means: ' +
    f3((st.mean - st2.mean) / Math.sqrt(st.sd * st.sd / st.n + st2.sd * st2.sd / st2.n)));
}
console.log('');

// ============================================================================
// SEC F. THE ONE-LINE SUMMARY TABLE
// ============================================================================
console.log('SEC F. SUMMARY: G2 IN ITS OWN CENSUS-MATCHED ENSEMBLE');
console.log('  x    orbits    kind        mean     sd      min  max   G2    z        MIDRANK');
for (const x of [11, 13, 17, 19]) {
  const st = stats(EXH[x]), pl = placement(EXH[x], LADDER[x]);
  console.log('  ' + String(x).padEnd(4) + ' ' + String(orbitCount(x)).padEnd(9) +
    ' exhaustive  ' + f3(st.mean).padEnd(8) + ' ' + f3(st.sd).padEnd(7) + ' ' +
    String(st.min).padEnd(4) + ' ' + String(st.max).padEnd(5) + ' ' +
    String(LADDER[x]).padEnd(5) + ' ' + f3((LADDER[x] - st.mean) / st.sd).padEnd(8) + ' ' + pc(pl.mid));
}
console.log('  (x = 23 is SEC E, sampled at N = 5000 of 142,560 orbits.)');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/measure-g2-generic-0829.js
//   invocation:  node research/measure-g2-generic-0829.js
//   code-sha256: 453d2733ea90fdd49e033c9eda491ba3b8da32bd75380573f7f8f13baf08cf4e
//   out-sha256:  f9a29ea814b6d1690124e479efc6df627523b5ccb8f7f59e981bb282c16a552f
//   body-lines:  104
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     1874.6 s
// ============================================================================
// MEASURE-G2-GENERIC 01 — G2 against the census-matched two-class ensemble
// PRNG mulberry32, SEED = 20260829 (fixed, printed per house rule)
//
// SEC A. CUSTODY
// A1. The twin tile on both engines against research/exact-g2-ladder.js LADDER.
//   x   W            G2(fast) G2(naive) LADDER  match  census  D_x    match
//   3   6            6        6         6       true   1       1      true
//   5   30           12       12        12      true   3       3      true
//   7   210          30       30        30      true   15      15     true
//   11  2310         42       42        42      true   135     135    true
//   13  30030        66       66        66      true   1485    1485   true
//   17  510510       108      108       108     true   22275   22275  true
//   19  9699690      150      150       150     true   378675  378675 true
//   23  223092870    204      204       204     true   7952175 7952175 true
//   A1 VERDICT: PASS  (the fast engine is run on the ORBIT REPRESENTATIVE e_p = min(2,p-2),
//    the naive engine on the LITERAL classes {0,-2}: agreement is the first
//    check of the §1c collapse, since those are different configurations.)
//
// A2. Head-to-head on identical random configurations (fast vs naive), x = 13, 17.
//   x = 13: 200 of 200 identical (max gap and census)
//   x = 17: 200 of 200 identical (max gap and census)
//
// SEC B. EXHAUSTIVE ENSEMBLE OVER ALL prod (p-1)/2 ORBITS, x = 3..19
//   Every orbit sieved once. The percentile of G2 is EXACT here, not a sample.
//
//   x = 3  orbits = 1  W = 6
//     ensemble: mean 6.000  sd 0.000  min 6  p05 6  median 6  p95 6  max 6
//     G2(x#) = 6   z = 0.000   percentile: below 0.00%, at-or-below 100.00%, MIDRANK 50.00%  (ties 1)
//     ensemble max 6  vs A288815 h2 = 6  MATCH
//     full distribution: 6x1
//
//   x = 5  orbits = 2  W = 30
//     ensemble: mean 15.000  sd 4.243  min 12  p05 12  median 18  p95 18  max 18
//     G2(x#) = 12   z = -0.707   percentile: below 0.00%, at-or-below 50.00%, MIDRANK 25.00%  (ties 1)
//     ensemble max 18  vs A288815 h2 = 18  MATCH
//     full distribution: 12x1  18x1
//
//   x = 7  orbits = 6  W = 210
//     ensemble: mean 28.000  sd 3.098  min 24  p05 24  median 30  p95 30  max 30
//     G2(x#) = 30   z = 0.645   percentile: below 33.33%, at-or-below 100.00%, MIDRANK 66.67%  (ties 4)
//     ensemble max 30  vs A288815 h2 = 30  MATCH
//     full distribution: 24x2  30x4
//
//   x = 11  orbits = 30  W = 2310
//     ensemble: mean 48.400  sd 6.856  min 36  p05 42  median 48  p95 60  max 66
//     G2(x#) = 42   z = -0.933   percentile: below 3.33%, at-or-below 36.67%, MIDRANK 20.00%  (ties 10)
//     ensemble max 66  vs A288815 h2 = 66  MATCH
//     full distribution: 36x1  42x10  48x9  54x7  60x2  66x1
//
//   x = 13  orbits = 180  W = 30030
//     ensemble: mean 77.667  sd 12.079  min 60  p05 60  median 78  p95 90  max 150
//     G2(x#) = 66   z = -0.966   percentile: below 13.33%, at-or-below 22.78%, MIDRANK 18.06%  (ties 17)
//     ensemble max 150  vs A288815 h2 = 150  MATCH
//     full distribution: 60x24  66x17  72x19  78x61  84x34  90x16  96x1  102x3  108x3  120x1  150x1
//
//   x = 17  orbits = 1440  W = 510510
//     ensemble: mean 117.896  sd 16.945  min 84  p05 90  median 114  p95 150  max 192
//     G2(x#) = 108   z = -0.584   percentile: below 21.32%, at-or-below 31.39%, MIDRANK 26.35%  (ties 145)
//     ensemble max 192  vs A288815 h2 = 192  MATCH
//
//   x = 19  orbits = 12960  W = 9699690
//     ensemble: mean 167.382  sd 18.074  min 120  p05 138  median 168  p95 198  max 258
//     G2(x#) = 150   z = -0.962   percentile: below 11.13%, at-or-below 23.15%, MIDRANK 17.14%  (ties 1558)
//     ensemble max 258  vs A288815 h2 = 258  MATCH
//
// SEC C. E2, THE CONSTANT SHIFTS d
// C1. All census-matched d (d even, p does not divide d) at x = 11, 13:
//     each orbit must receive exactly 2^(pi(x)-1) values of d (§1c step 4).
//   x = 11  #d = 480 (= prod(p-1) = 480)  orbits hit = 30 of 30  d per orbit: min 16 max 16 (expect 16)
//     E2 over d: mean 48.400 sd 6.748 min 36 max 66   E1 over orbits: mean 48.400 sd 6.856 min 36 max 66
//     G2 midrank in E2 20.00%  vs in E1 20.00%
//   x = 13  #d = 5760 (= prod(p-1) = 5760)  orbits hit = 180 of 180  d per orbit: min 32 max 32 (expect 32)
//     E2 over d: mean 77.667 sd 12.046 min 60 max 150   E1 over orbits: mean 77.667 sd 12.079 min 60 max 150
//     G2 midrank in E2 18.06%  vs in E1 18.06%
//
// C2. ALL even d, census-matched or not, at x = 11, 13: does h2 live inside
//     the census-matched family, or at a d divisible by some odd p <= x?
//   x = 11: max over ALL even d = 66 at d = 82 (census-matched: true);  best NON-matched d gives 48;  A288815 h2 = 66
//   x = 13: max over ALL even d = 150 at d = 688 (census-matched: true);  best NON-matched d gives 90;  A288815 h2 = 150
//
// SEC D. E1 SAMPLED AS BRIEFED (free pairs, naive full-period engine)
//   a_2 drawn from {0,1}; at each odd p an unordered pair drawn uniformly from
//   the C(p,2) pairs. Compared against SEC B's EXACT orbit distribution.
//   x    N     mean     sd      min  max   G2 midrank   exact midrank   max|CDF diff|
//   11   500   48.408   7.155   36   66    21.70%       20.00%          0.037
//   13   500   77.556   11.989  60   150   19.10%       18.06%          0.019
//   17   500   117.816  16.631  84   180   25.70%       26.35%          0.016
//   19   500   167.796  18.222  126  234   17.40%       17.14%          0.016
//
// SEC E. x = 23 (W = 223,092,870), SAMPLED: 142,560 orbits is 11.6 h exhaustive
//   E1/E2 (identical ensembles), N = 5000 of 142560 orbits, uniform:
//     mean 223.385  sd 20.186  min 174  p05 198  median 222  p95 258  max 318
//     G2(23#) = 204   z = -0.960   percentile: below 9.04%, at-or-below 18.36%, MIDRANK 13.70%  (ties 466)
//     sampled max 318 (a LOWER bound on the ensemble max) vs h2 = 366
//     free-pair check, N = 200 on the naive engine: mean 224.400  sd 21.994  min 180  max 300  max|CDF diff| vs the orbit sampler 0.041
//     two-sample z on the means: -0.642
//
// SEC F. SUMMARY: G2 IN ITS OWN CENSUS-MATCHED ENSEMBLE
//   x    orbits    kind        mean     sd      min  max   G2    z        MIDRANK
//   11   30        exhaustive  48.400   6.856   36   66    42    -0.933   20.00%
//   13   180       exhaustive  77.667   12.079  60   150   66    -0.966   18.06%
//   17   1440      exhaustive  117.896  16.945  84   192   108   -0.584   26.35%
//   19   12960     exhaustive  167.382  18.074  120  258   150   -0.962   17.14%
//   (x = 23 is SEC E, sampled at N = 5000 of 142,560 orbits.)
// ============================================================================
// READINGS
// ============================================================
// 1. WHAT IS WRONG HERE FIRST: FIVE LEVELS, x <= 23, AND THE ENSEMBLE IS TINY
//    AT THE BOTTOM OF IT. 30 orbits at x = 11 puts the percentile grid at
//    3.33%, so the two smallest levels cannot resolve a tail placement even in
//    principle. Nothing below bears on the exponent, on the band (2, 4.26645],
//    or on any infinitude statement: verdict label (i) throughout.
// 2. THE REGISTERED PREDICTION P1 IS A HIT AT ALL FIVE LEVELS AND IT IS NOT A
//    CLEAN "TYPICAL". G2's MIDRANK percentile in its own census-matched
//    ensemble reads 20.00, 18.06, 26.35, 17.14 (exhaustive, x = 11..19) and
//    13.70 (sampled, N = 5000, x = 23). Registered band [5%, 95%]: inside at
//    every level, so the registered falsifier (below 2% or above 98% at two or
//    more levels) does NOT fire. The direction is the same at all five: G2 sits
//    BELOW the ensemble mean by z = -0.933, -0.966, -0.584, -0.962, -0.960.
//    [MEASURED, exact at x <= 19.] The levels are nested and are not five
//    independent draws, so no significance attaches to the repeated sign.
// 3. THE E1/E2 COLLAPSE OF §1c HOLDS ON THE ENGINES, FOUR WAYS. The 480 and
//    5,760 census-matched shifts d hit all 30 and all 180 orbits with exactly
//    2^(pi(x)-1) = 16 and 32 values of d each, min = max (SEC C1); the E2 and
//    E1 exhaustive means agree to the digit (48.400, 77.667) and the midranks
//    agree exactly (20.00%, 18.06%); the briefed free-pair sampler on the
//    independent naive engine returns max|CDF difference| 0.037, 0.019, 0.016,
//    0.016 against the exact distributions at N = 500 (SEC D); and at x = 23
//    the two samplers differ by 0.041 in CDF and z = -0.642 on the means.
//    So "is E2 generic inside E1" has the answer PROVEN-IDENTICAL, not
//    measured-consistent, and the run's role there was custody.
// 4. THE ENSEMBLE MAXIMUM IS A288815 AT EVERY EXHAUSTIVE LEVEL: 6, 18, 30, 66,
//    150, 192, 258 at x = 3..19, seven terms, MATCH at all seven. Registered
//    P3: HIT. That is an independent reproduction of seven h2 terms from a
//    definition (max over census-matched two-class configurations) that is not
//    the one A288815 is computed from (Ziller-Morack's paired progressions,
//    Resta's ILP over class pairs). [VERIFIED by exhaustion at x <= 19.]
// 5. AND h2's OPTIMUM SITS INSIDE THE CENSUS-MATCHED FAMILY, MEASURED. Over
//    ALL even d at x = 11 and 13, matched or not, the maximum is 66 at d = 82
//    and 150 at d = 688, both census-matched, while the best NON-matched d
//    reaches only 48 and 90 (SEC C2). Two levels only, and no argument is
//    offered that this persists. [MEASURED at x = 11, 13.]
// 6. THE ADVERSARY IS FAR ABOVE THE TYPICAL AND THE GAP WIDENS. h2/mean reads
//    66/48.400 = 1.36, 150/77.667 = 1.93, 192/117.896 = 1.63, 258/167.382 =
//    1.54; in sd units the ensemble max sits at z = +2.57, +5.99, +4.37, +5.01.
//    The distribution is right-skewed at every level (x = 13: one orbit at 150
//    against a median of 78). So the ensemble mean is not the object the
//    upper-bound literature is bounding, and a percentile of G2 says nothing
//    about h2's own growth.
// 7. G2 IS NOT THE ENSEMBLE MINIMUM ANYWHERE ABOVE x = 5. The exhaustive minima
//    are 36, 60, 84, 120 at x = 11..19 against G2 = 42, 66, 108, 150, and the
//    strictly-below fractions are 3.33%, 13.33%, 21.32%, 11.13%. The hand
//    prediction P2 registered x = 5 at the minimum and x = 7 at the top, and
//    the engine confirms both (25.00% and 66.67% midrank at those two levels):
//    the object moves across the range at the smallest levels and settles into
//    the lower quarter over x = 11..23, which is a description of five points
//    and not a law.
// 8. WHAT WOULD BREAK READING 2. An exhaustive run at x = 23 (142,560 orbits,
//    priced at 11.6 h single-threaded from the 294 ms per sieve measured here)
//    replaces the sampled 13.70% by an exact figure; if that exact figure came
//    in below 2%, the falsifier would still need a second level to fire. A
//    level x >= 29 is out of reach for exhaustion (W = 6.5e9 and 1,995,840
//    orbits, which is 142,560 x 14) and would have to be sampled.
// ============================================================
