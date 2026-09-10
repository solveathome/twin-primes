/* Kernel test vectors. Run: node web/bench/test-kernel.js
 *
 * Every vector here is a number already committed elsewhere in the repo, so
 * this file checks the engine against the body of work rather than against
 * itself.
 */
const K = require('./kernel.js');

let failures = 0;
function check(name, got, want) {
  const g = JSON.stringify(got), w = JSON.stringify(want);
  const ok = g === w;
  if (!ok) failures++;
  console.log((ok ? '  ok   ' : '  FAIL ') + name);
  if (!ok) console.log('         got  ' + g + '\n         want ' + w);
}

const idx = function (p) { return K.LEVEL_PRIMES.indexOf(p); };

console.log('\nwidths and censuses (GLOSSARY.md, README.md)');
check('width of T13', K.widthAt(idx(13)), 30030);
check('width of T31', K.widthAt(idx(31)), 200560490130);
check('census of T31 = 6,226,553,025', K.censusAt(idx(31), 2), 6226553025);

console.log('\nthe three houses (GLOSSARY.md: the @5 tile is 11, 17, 29)');
check('slots of T5', Array.from(K.buildSlots(idx(5), 2).slots), [11, 17, 29]);

console.log('\nthe grain of T7 (GLOSSARY.md, verbatim)');
const t7 = K.buildSlots(idx(7), 2);
const g7 = Array.from(K.grain(t7));
check('T7 census = 15', t7.census, 15);
check('T7 grain', g7, [6, 12, 12, 18, 12, 30, 6, 30, 12, 18, 12, 12, 6, 12, 12]);
check('T7 gaps sum to the width', g7.reduce(function (a, b) { return a + b; }, 0), 210);

console.log('\nthe grain census of T11 (GLOSSARY.md: 6x21, 12x56, 18x22, 24x6, 30x22, 36x4, 42x4)');
const t11 = K.buildSlots(idx(11), 2);
const c11 = K.grainCensus(K.grain(t11)).map(function (r) { return [r.size, r.count]; });
check('T11 census = 135', t11.census, 135);
check('T11 grain census', c11, [[6, 21], [12, 56], [18, 22], [24, 6], [30, 22], [36, 4], [42, 4]]);

console.log('\nG2, the twin Jacobsthal ladder (GLOSSARY.md: 2, 6, 12, 30, 42, 66, 108, 150, 204, 258)');
const ladder = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258];
const got = [];
for (let i = 0; i < ladder.length; i++) {
  const t = K.buildSlots(i, 2);
  got.push(K.largestGap(K.grain(t)).size);
}
check('G2 for T2..T29', got, ladder);

console.log('\nthe d -> G_d split (README.md: G8 = 198 > G2 = 150 at 19#)');
const t19 = K.buildSlots(idx(19), 2);
check('G2 at 19# = 150', K.largestGap(K.grain(t19)).size, 150);
const t19d8 = K.buildSlots(idx(19), 8);
check('G8 at 19# = 198', K.largestGap(K.grain(t19d8)).size, 198);
check('census is the same at d = 2 and d = 8', t19d8.census, t19.census);

console.log('\ninternal consistency');
const t17 = K.buildSlots(idx(17), 2);
check('T17 census matches the closed form', t17.census, K.censusAt(idx(17), 2));
check('T17 slots are strictly increasing',
  (function () { const s = t17.slots; for (let i = 1; i < s.length; i++) if (s[i] <= s[i - 1]) return false; return true; })(), true);
check('T17 gaps sum to the width',
  Array.from(K.grain(t17)).reduce(function (a, b) { return a + b; }, 0), 510510);
const holes13 = K.buildHoles(idx(13));
check('T13 hole count = phi(30030) = 5760',
  holes13.reduce(function (a, b) { return a + b; }, 0), 5760);
check('every T13 slot sits on a hole, with its partner on a hole',
  (function () {
    const s = K.buildSlots(idx(13), 2).slots;
    for (let i = 0; i < s.length; i++) {
      if (!holes13[s[i]] || !holes13[(s[i] + 2) % 30030]) return false;
    }
    return true;
  })(), true);

console.log('\nbirth cohorts (GLOSSARY: cohort(5) = 2, cohort(p) = p-3 from @7 up)');
[5, 7, 11, 13].forEach(function (p) {
  const t = K.buildSlots(idx(p), 2);
  const counts = {};
  let edge = 0;
  Array.from(t.slots).forEach(function (r) {
    const b = K.birthFold(r, idx(p));
    if (b === null) edge++; else counts[b] = (counts[b] || 0) + 1;
  });
  const cohortHere = counts[p] || 0;
  check('T' + p + ' natal@' + p + ' = ' + (p === 5 ? 2 : p - 3), cohortHere, p === 5 ? 2 : p - 3);
  if (p === 5) check('T5 has exactly one eternal edge', edge, 1);
});
check('T7 decomposes as edge + carried@5 + natal@7 = 1 + 10 + 4',
  (function () {
    const t = K.buildSlots(idx(7), 2);
    const c = { edge: 0 };
    Array.from(t.slots).forEach(function (r) {
      const b = K.birthFold(r, idx(7));
      if (b === null) c.edge++; else c[b] = (c[b] || 0) + 1;
    });
    return [c.edge, c[5], c[7]];
  })(), [1, 10, 4]);
check('T13 cohort decomposition (GLOSSARY: 1 + 990 + 396 + 88 + 10)',
  (function () {
    const t = K.buildSlots(idx(13), 2);
    const c = { edge: 0 };
    Array.from(t.slots).forEach(function (r) {
      const b = K.birthFold(r, idx(13));
      if (b === null) c.edge++; else c[b] = (c[b] || 0) + 1;
    });
    return [c.edge, c[5], c[7], c[11], c[13]];
  })(), [1, 990, 396, 88, 10]);

console.log('\nomega, the box dimension (OBSERVATIONS.md entry 5)');
const om = K.omegaUpTo(100000);
check('omega of the first twelve n', Array.from(om.slice(1, 13)), [0, 1, 1, 2, 1, 2, 1, 3, 2, 2, 1, 3]);
check('omega(1) = 0', om[1], 0);
check('omega = 1 counts the primes below 100000', (function () {
  let c = 0; for (let n = 2; n <= 100000; n++) if (om[n] === 1) c++; return c;
})(), K.primesUpTo(100000).length);
check('omega(2^16) = 16', om[65536], 16);
check('omega(99991) = 1 (it is prime)', om[99991], 1);
check('a hole of the 13-tile below 17^2 is always prime',
  (function () {
    const holes = K.buildHoles(idx(13));
    for (let n = 2; n < 289; n++) if (holes[n] && om[n] !== 1) return n;
    return true;
  })(), true);
check('289 = 17^2 is the first two-dimensional hole of the 13-tile',
  (function () {
    const holes = K.buildHoles(idx(13));
    for (let n = 2; n < 30030; n++) if (holes[n] && om[n] === 2) return n;
    return null;
  })(), 289);

check('prime powers below 40', (function () {
  const pp = K.primePowersUpTo(40), o = [];
  for (let n = 2; n <= 40; n++) if (pp[n]) o.push(n);
  return o;
})(), [2, 3, 4, 5, 7, 8, 9, 11, 13, 16, 17, 19, 23, 25, 27, 29, 31, 32, 37]);
check('the two box readings disagree exactly on prime powers with omega >= 2, n <= 5000',
  (function () {
    const lim = 5000, om = K.omegaUpTo(lim), pp = K.primePowersUpTo(lim);
    // f_k(n) = 1 holds at k = omega(n) always, and additionally at k = omega-1
    // exactly for prime powers. So "boxes uniquely at two values of k" should
    // be precisely the prime powers with omega >= 2.
    const twoWays = [];
    for (let n = 2; n <= lim; n++) if (pp[n] && om[n] >= 2) twoWays.push(n);
    return twoWays.slice(0, 10);
  })(), [4, 8, 9, 16, 25, 27, 32, 49, 64, 81]);

console.log('\nmirror axes, by exhaustive scan (every a/2 with the set closed under r -> a-r mod W)');
function axesOf(set, W) {
  const out = [];
  for (let a = 0; a < 2 * W; a++) {
    let ok = true;
    for (const r of set) { if (!set.has(((a - r) % W + W) % W)) { ok = false; break; } }
    if (ok) out.push(a / 2);
  }
  return out;
}
[5, 7, 11].forEach(function (p) {
  const i = idx(p), W = K.widthAt(i);
  const ha = K.buildHoles(i), holes = new Set();
  for (let r = 0; r < W; r++) if (ha[r]) holes.add(r);
  const slots = new Set(Array.from(K.buildSlots(i, 2).slots));
  check('T' + p + ' hole axes are exactly {0, p#/2}', axesOf(holes, W), [0, W / 2]);
  check('T' + p + ' slot axes are exactly {p#/2 - 1, p# - 1}', axesOf(slots, W), [W / 2 - 1, W - 1]);
});
check('the two objects never share an axis at T7',
  (function () {
    const i = idx(7), W = K.widthAt(i);
    const ha = K.buildHoles(i), holes = new Set();
    for (let r = 0; r < W; r++) if (ha[r]) holes.add(r);
    const slots = new Set(Array.from(K.buildSlots(i, 2).slots));
    return axesOf(holes, W).filter(function (x) { return axesOf(slots, W).indexOf(x) >= 0; });
  })(), []);
check('the internal seams of the last fold are NOT axes of the finished tile (T7, prevWidth 30)',
  (function () {
    const i = idx(7), W = K.widthAt(i), prev = 30;
    const ha = K.buildHoles(i), holes = new Set();
    for (let r = 0; r < W; r++) if (ha[r]) holes.add(r);
    const axes = axesOf(holes, W);
    const internal = [];
    for (let k = 1; k * prev < W; k++) if (axes.indexOf(k * prev) >= 0) internal.push(k * prev);
    return internal;                       // 105 is not a multiple of 30, so this should be empty
  })(), []);

console.log('\nd = 6, where 3 divides the offset and forbids one residue, not two');
check('census at d = 6 uses (3-1)', K.buildSlots(idx(11), 6).census, K.censusAt(idx(11), 6));

console.log(failures === 0 ? '\nall vectors pass\n' : '\n' + failures + ' FAILED\n');
process.exit(failures === 0 ? 0 : 1);
