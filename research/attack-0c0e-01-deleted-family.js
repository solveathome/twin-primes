// attack-0c0e-01-deleted-family.js
//
// TODO 0c x 0e, stage 2: measure the RESIDUE-DELETED MAXSUM FAMILY exactly.
//
// THE OBJECT. For a tile T_x (twin slots mod x#, classes {0,-2} pinned at every
// odd prime q <= x) and the fold prime p = x', write
//
//     Delta_m(x, p, a) = maxsum_m( T_x with every slot = a or a-2 (mod p) deleted )
//
// read cyclically at width W_x. This is the SIEVE-form object of
// research/qc/units.js section 5: the pair is pinned at distance 2 and there is
// no free translate. Nothing here leans on covering-form freedom, which is
// closed (sift-limit-attack.md 7a-bis / 7a-ter).
//
// WHY. U-FRAME.md 5a step 2's exact copy theorem says
//     maxsum_m(T_{x'}) = max over the p 2-sets {a, a-2} of Delta_m(x, p, a),
// index cost zero. TODO 0c wants a bound on Delta without a kill count; TODO 0e
// wants to spend the infinitely-often slack. Composed, the only place the i.o.
// licence can enter is the QUANTIFIER ON a: the copy theorem needs the MAX over
// the p alignments, while any averaging or second-moment method controls the
// MEAN. If max and mean coincide at infinitely many levels, an averaged bound
// suffices at those levels and the argument may fail everywhere else.
//
// So this script measures, at every level it can reach exactly:
//   (a) max over 2-sets against mean over 2-sets, per m
//   (b) how close to the mean the max gets, level by level
//   (c) the structure of the extremal alignment a*: how concentrated, how many
//       old gaps its winning window merges, whether it touches the old record
//   (d) where deletion moves the growth law maxsum_m = m*mbar + sigma*sqrt(2m ln D):
//       the mean term, the fluctuation term, or both
//
// WHAT IT DOES NOT DO. It does not compute or use L, kappa(m), or any kill
// count. It does not fit anything to a power law. It does not touch the
// covering form. The predictions it is being read against were pre-registered
// in research/history/staging/attack-0c0e-level-selection.md before this file
// was ever executed.
//
// usage: node research/attack-0c0e-01-deleted-family.js [maxTile]
//        default 23. Pass 29 to add the streamed T_29 level (a few minutes).

'use strict';

const ARGV_MAX = Number(process.argv[2] || 23);
const PRIMES = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
const MMAX = 8;

const T0 = Date.now();
const log = (s) => process.stderr.write('[' + ((Date.now() - T0) / 1000).toFixed(1) + 's] ' + s + '\n');
const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : ' n/a');
const pad = (s, n) => String(s).padStart(n);

let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) { FAILS++; console.log('  FAIL  ' + label + (detail ? '   ' + detail : '')); }
  else console.log('  ok    ' + label + (detail ? '   ' + detail : ''));
}

// ---------------------------------------------------------------- generation
// T_3: the only twin slot mod 6 is 5 (5 and 7 both coprime to 6).
function baseTile() { return { slots: Float64Array.from([5]), W: 6, x: 3 }; }

// lay p copies of (slots, W) and delete residues 0 and p-2 mod p: this IS the
// fold, per U-FRAME 5a step 1 (every old slot loses exactly 2 of its p copies).
function foldTile(tile, p) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p;
  const out = new Float64Array(D * (p - 2));
  let n = 0;
  for (let k = 0; k < p; k++) {
    const off = k * W, kw = (k * wp) % p;
    const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) out[n++] = slots[i] + off;
  }
  if (n !== out.length) throw new Error('kill count wrong at p=' + p);
  return { slots: out, W: W * p, x: p };
}

// maxsum_m for m = 1..MMAX over a cyclic slot list, streamed through a ring.
// RING is the next power of two above MMAX so the index arithmetic is a mask
// and not a modulo: at the T_29 level the inner loop runs 6.2e9 times and the
// modulo form measured about ten times slower, which is the difference between
// a three-minute level and a ninety-minute one.
const RING = 16, MASK = RING - 1;
if (MMAX + 1 > RING) throw new Error('RING too small for MMAX');
function maxsumsOfSequence(pushAll, W) {
  const buf = new Float64Array(RING);
  let cnt = 0;
  const best = new Float64Array(MMAX + 1);
  const firstFew = [];
  const push = (v) => {
    if (firstFew.length < MMAX) firstFew.push(v);
    buf[cnt & MASK] = v; cnt++;
    const lim = cnt - 1 < MMAX ? cnt - 1 : MMAX;
    for (let m = 1; m <= lim; m++) {
      const s = v - buf[(cnt - 1 - m) & MASK];
      if (s > best[m]) best[m] = s;
    }
  };
  pushAll(push);
  for (const v of firstFew) push(v + W);   // close the cycle
  return { best, n: cnt };
}

function maxsumsOfTile(tile) {
  const { slots, W } = tile;
  return maxsumsOfSequence((push) => { for (let i = 0; i < slots.length; i++) push(slots[i]); }, W);
}

// Delta_m(x, p, a) for every a, over an in-memory tile.
function deletedFamily(tile, p) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Uint8Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const rows = [];
  for (let a = 0; a < p; a++) {
    const d0 = a, d2 = (a - 2 + p) % p;
    let alive = 0;
    const r = maxsumsOfSequence((push) => {
      for (let i = 0; i < D; i++) { const q = rs[i]; if (q !== d0 && q !== d2) { alive++; push(slots[i]); } }
    }, W);
    rows.push({ a, alive, best: Array.from(r.best) });
  }
  return rows;
}

// ---------------------------------------------------------- extremal anatomy
// For the winning alignment at m = 1: which window of OLD gaps does the record
// merge, and does it contain the old record gap? Small tiles only.
function anatomy(tile, p, aStar) {
  const { slots, W } = tile, D = slots.length;
  const d0 = aStar, d2 = (aStar - 2 + p) % p;
  const keep = [];
  for (let i = 0; i < D; i++) { const q = slots[i] % p; if (q !== d0 && q !== d2) keep.push(i); }
  const n = keep.length;
  let bestGap = -1, bi = -1;
  for (let j = 0; j < n; j++) {
    const i0 = keep[j], i1 = keep[(j + 1) % n];
    const g = (j + 1 < n) ? slots[i1] - slots[i0] : W - slots[i0] + slots[i1];
    if (g > bestGap) { bestGap = g; bi = j; }
  }
  // how many OLD gaps the winner merges
  const i0 = keep[bi], i1 = keep[(bi + 1) % n];
  const span = (bi + 1 < n) ? (i1 - i0) : (D - i0 + i1);
  // old record gap index
  let oldMax = -1, oldIdx = -1;
  for (let i = 0; i < D; i++) {
    const g = (i + 1 < D) ? slots[i + 1] - slots[i] : W - slots[i] + slots[0];
    if (g > oldMax) { oldMax = g; oldIdx = i; }
  }
  let touchesOldRecord = false;
  for (let t = 0; t < span; t++) if ((i0 + t) % D === oldIdx) touchesOldRecord = true;
  return { bestGap, merges: span, touchesOldRecord, oldMax };
}

// ================================================================== the run
console.log('='.repeat(78));
console.log('ATTACK 0c x 0e -- STAGE 2: THE RESIDUE-DELETED MAXSUM FAMILY, EXACTLY');
console.log('='.repeat(78));
console.log('Delta_m(x, p, a) = maxsum_m(T_x minus classes {a, a-2} mod p), p = next prime.');
console.log('Sieve form throughout (units.js sec 5). MMAX = ' + MMAX + '.');
console.log('');

const tiles = [];
{
  let t = baseTile();
  tiles.push(t);
  for (let i = 1; i < PRIMES.length; i++) {
    const p = PRIMES[i];
    // 23 is the last tile that fits in memory: T_29 holds 214,708,725 slots,
    // 1.7 GB as Float64. Levels above it are streamed, never stored.
    if (p > Math.min(ARGV_MAX, 23)) break;
    t = foldTile(t, p);
    tiles.push(t);
    log('built T_' + p + '  D = ' + t.slots.length);
  }
}

// census self-test
console.log('-'.repeat(78));
console.log('SELF-TESTS');
console.log('-'.repeat(78));
{
  let D = 1;
  for (const t of tiles) {
    if (t.x > 3) D *= (t.x - 2); else D = 1;
    check('D(T_' + t.x + ') = prod (q-2)', t.slots.length === D, 'D = ' + t.slots.length);
  }
  const G2rec = { 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204 };
  for (const t of tiles) {
    const r = maxsumsOfTile(t);
    check('G2(' + t.x + '#) = ' + G2rec[t.x], r.best[1] === G2rec[t.x], 'maxsum_1 = ' + r.best[1]);
  }
}

// ---------------------------------------------------- the family, level by level
// Every level from T_7 up to the top in-memory tile gets its family. For the
// TOP tile the check target maxsum_m(T_{x'}) is streamed rather than stored,
// which is how T_23 mod 29 becomes reachable without holding 214.7M slots.
function streamFold(tile, p) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p, Wn = W * p;
  return maxsumsOfSequence((push) => {
    for (let k = 0; k < p; k++) {
      const off = k * W, kw = (k * wp) % p;
      const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
      for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) push(slots[i] + off);
    }
  }, Wn);
}

const LEVELS = [];
for (let i = 0; i < tiles.length; i++) {
  const t = tiles[i];
  if (t.x < 7) continue;
  const pi = PRIMES.indexOf(t.x);
  const p = PRIMES[pi + 1];
  if (!p) break;
  const rows = deletedFamily(t, p);
  const next = (i + 1 < tiles.length) ? maxsumsOfTile(tiles[i + 1]) : streamFold(t, p);
  LEVELS.push({ x: t.x, p, D: t.slots.length, W: t.W, rows, next: Array.from(next.best), tile: t });
  log('family at T_' + t.x + ' deleted mod ' + p + ' done (' + p + ' alignments)');
}

// The T_29 level, streamed, m = 1 ONLY. T_29 holds 214,708,725 slots and is
// never stored; each of the 31 alignments is one filtered pass over T_23's
// 29 copies. The full m <= 8 ring costs about 110 s per alignment here, near an
// hour for the level, and buys one extra column; the max-gap-only path costs a
// couple of seconds per alignment and buys the headline, which is m = 1. So
// this level reports m = 1 and says so in every table it appears in.
if (ARGV_MAX >= 29) {
  const t23 = tiles[tiles.length - 1];
  if (t23.x !== 23) throw new Error('expected T_23 as the top in-memory tile');
  const p29 = 29, p = 31;
  const D23 = t23.slots.length, s23 = t23.slots, W23 = t23.W;
  const r23 = new Int32Array(D23), r31base = new Uint8Array(D23);
  for (let i = 0; i < D23; i++) { r23[i] = s23[i] % p29; r31base[i] = s23[i] % p; }
  const wp = W23 % p29, W29 = W23 * p29, w23mod31 = W23 % p;
  const rows = [];
  for (let a = 0; a < p; a++) {
    const d0 = a, d2 = (a - 2 + p) % p;
    let alive = 0, prev = -1, first = -1, best = 0;
    for (let k = 0; k < p29; k++) {
      const off = k * W23, kw = (k * wp) % p29;
      const k0 = (p29 - kw) % p29, k2 = (2 * p29 - 2 - kw) % p29;
      const shift = (k * w23mod31) % p;
      for (let i = 0; i < D23; i++) {
        if (r23[i] === k0 || r23[i] === k2) continue;
        const rr = r31base[i] + shift, r31 = rr >= p ? rr - p : rr;
        if (r31 === d0 || r31 === d2) continue;
        alive++;
        const v = s23[i] + off;
        if (first < 0) first = v; else { const g = v - prev; if (g > best) best = g; }
        prev = v;
      }
    }
    const gw = W29 - prev + first; if (gw > best) best = gw;
    const bb = new Array(MMAX + 1).fill(NaN); bb[1] = best;
    rows.push({ a, alive, best: bb });
    if (a % 8 === 0) log('  T_29 alignment ' + a + '/' + p + '  maxgap ' + best);
  }
  // copy-theorem target at this level: G2(31#) = 348, the eleventh exact ladder
  // term (G2-STATE.md sec 2). Comparing max_a against it IS the check.
  const tgt = new Array(MMAX + 1).fill(NaN); tgt[1] = 348;
  LEVELS.push({ x: 29, p, D: D23 * (p29 - 2), W: W29, rows, next: tgt, tile: null, g2old: 258, mOnly1: true });
  log('streamed T_29 family done (m = 1 only)');
}

// ------------------------------------------------------------- copy theorem
console.log('');
console.log('-'.repeat(78));
console.log('COPY THEOREM, RE-VERIFIED HERE (max over the p 2-sets equals the fold)');
console.log('-'.repeat(78));
console.log('  x   p    m   max_a Delta_m   maxsum_m(T_p)   equal?');
for (const L of LEVELS) {
  const target = L.next || L.self;
  if (!target) continue;
  const MTOP = L.mOnly1 ? 1 : MMAX;
  for (let m = 1; m <= MTOP; m++) {
    let mx = 0; for (const r of L.rows) if (r.best[m] > mx) mx = r.best[m];
    const eq = (mx === target[m]);
    if (!eq) FAILS++;
    if (m <= 3 || !eq) console.log('  ' + pad(L.x, 2) + '  ' + pad(L.p, 2) + '  ' + pad(m, 3) +
      '   ' + pad(mx, 13) + '   ' + pad(target[m], 13) + '   ' + (eq ? 'yes' : 'NO'));
  }
  let allEq = true;
  for (let m = 1; m <= MTOP; m++) { let mx = 0; for (const r of L.rows) if (r.best[m] > mx) mx = r.best[m]; if (mx !== target[m]) allEq = false; }
  if (!allEq) FAILS++;
  console.log('  ' + pad(L.x, 2) + '  ' + pad(L.p, 2) + '   all m <= ' + MTOP + ': ' + (allEq ? 'EQUAL' : 'MISMATCH'));
}

// ------------------------------------------------- (a) max against mean, per m
console.log('');
console.log('='.repeat(78));
console.log('(a) MAX OVER 2-SETS AGAINST MEAN OVER 2-SETS');
console.log('='.repeat(78));
console.log('pred = 1 + ln p / (2 ln D_x), the extreme-value share the max over p');
console.log('alignments has to supply if the growth law holds on the deleted tile.');
console.log('');
console.log('   x   p        lnD    m     min_a     mean_a      max_a   max/mean   max/min      pred');
for (const L of LEVELS) {
  const lnD = Math.log(L.D);
  const pred = 1 + Math.log(L.p) / (2 * lnD);
  for (let m = 1; m <= (L.mOnly1 ? 1 : MMAX); m++) {
    let mn = Infinity, mx = 0, sum = 0;
    for (const r of L.rows) { const v = r.best[m]; if (v < mn) mn = v; if (v > mx) mx = v; sum += v; }
    const mean = sum / L.rows.length;
    console.log('  ' + pad(L.x, 2) + '  ' + pad(L.p, 2) + '  ' + pad(F(lnD, 4), 9) + '  ' + pad(m, 3) +
      '  ' + pad(mn, 8) + '  ' + pad(F(mean, 2), 9) + '  ' + pad(mx, 9) +
      '  ' + pad(F(mx / mean, 4), 9) + '  ' + pad(F(mx / mn, 4), 8) + '  ' + pad(F(pred, 4), 8));
  }
  console.log('');
}

// --------------------------------------------- (b) frequency of "goodness"
console.log('='.repeat(78));
console.log('(b) HOW FREQUENT IS A GOOD LEVEL? (max/mean within a threshold)');
console.log('='.repeat(78));
console.log('  m    within 1.10   within 1.25   within 1.50    of ' + LEVELS.length + ' levels     worst level');
for (let m = 1; m <= MMAX; m++) {
  let c10 = 0, c25 = 0, c50 = 0, worst = 0, worstX = 0, nlev = 0;
  for (const L of LEVELS) {
    if (L.mOnly1 && m > 1) continue;
    nlev++;
    let mx = 0, sum = 0;
    for (const r of L.rows) { const v = r.best[m]; if (v > mx) mx = v; sum += v; }
    const ratio = mx / (sum / L.rows.length);
    if (ratio <= 1.10) c10++; if (ratio <= 1.25) c25++; if (ratio <= 1.50) c50++;
    if (ratio > worst) { worst = ratio; worstX = L.x; }
  }
  console.log('  ' + pad(m, 2) + '    ' + pad(c10, 11) + '   ' + pad(c25, 11) + '   ' + pad(c50, 11) +
    '   ' + pad(nlev, 12) + '     T_' + worstX + ' at ' + F(worst, 4));
}

// ------------------------------------------------ (c) which 2-set is extremal
console.log('');
console.log('='.repeat(78));
console.log('(c) THE EXTREMAL ALIGNMENT: how concentrated, and what it merges');
console.log('='.repeat(78));
console.log('   x   p   #a attaining max_1   a* (first)   winning gap   old gaps merged   contains old record?');
for (const L of LEVELS) {
  let mx = 0; for (const r of L.rows) if (r.best[1] > mx) mx = r.best[1];
  const arg = L.rows.filter(r => r.best[1] === mx).map(r => r.a);
  let an = null;
  if (L.tile) an = anatomy(L.tile, L.p, arg[0]);
  console.log('  ' + pad(L.x, 2) + '  ' + pad(L.p, 2) + '   ' + pad(arg.length + ' of ' + L.p, 17) +
    '   ' + pad(arg[0], 10) + '   ' + pad(mx, 11) +
    '   ' + pad(an ? an.merges : '-', 15) + '   ' + (an ? (an.touchesOldRecord ? 'yes' : 'no') : '-'));
}
console.log('');
console.log('  full argmax sets at m = 1 (are they spread or clustered?):');
for (const L of LEVELS) {
  let mx = 0; for (const r of L.rows) if (r.best[1] > mx) mx = r.best[1];
  const arg = L.rows.filter(r => r.best[1] === mx).map(r => r.a);
  console.log('    T_' + pad(L.x, 2) + ' mod ' + pad(L.p, 2) + ': {' + arg.join(', ') + '}');
}

// ------------------------------------------------ (d) where deletion moves the law
console.log('');
console.log('='.repeat(78));
console.log('(d) DELETION AGAINST THE GROWTH LAW maxsum_m = m*mbar + sigma*sqrt(2 m ln D)');
console.log('='.repeat(78));
console.log('mbar_del is the mean gap of the deleted tile, measured, not assumed:');
console.log('mbar_del = W_x / (alive slots). Prediction: mbar_del = mbar_x * p/(p-2)');
console.log('exactly on average over a, and ln D barely moves, so the deterministic');
console.log('term takes the whole density shift and the max over a supplies ln(p-2).');
console.log('');
console.log('   x   p    mbar_x   mean mbar_del   mbar_x*p/(p-2)   mbar_{x\'}   ln D_x   ln D_{x\'}');
for (const L of LEVELS) {
  const mbarX = L.W / L.D;
  let sumAlive = 0; for (const r of L.rows) sumAlive += r.alive;
  const meanAlive = sumAlive / L.rows.length;
  const mbarDel = L.W / meanAlive;
  const mbarNext = (L.W * L.p) / (L.D * (L.p - 2));
  console.log('  ' + pad(L.x, 2) + '  ' + pad(L.p, 2) + '  ' + pad(F(mbarX, 4), 8) + '  ' + pad(F(mbarDel, 4), 13) +
    '  ' + pad(F(mbarX * L.p / (L.p - 2), 4), 15) + '  ' + pad(F(mbarNext, 4), 10) +
    '  ' + pad(F(Math.log(L.D), 3), 7) + '  ' + pad(F(Math.log(L.D * (L.p - 2)), 3), 9));
}
console.log('');
console.log('sigma implied by the MEAN of the family and by the MAX of the family,');
console.log('read off maxsum_m = m*mbar_del + sigma*sqrt(2 m ln D). If deletion moved');
console.log('the fluctuation term, sigma_mean would differ from sigma of the old tile.');
console.log('');
console.log('   x   p   m   sigma from mean_a   sigma from max_a   ratio   sigma_old(T_x)');
for (const L of LEVELS) {
  const mbarX = L.W / L.D;
  let sumAlive = 0; for (const r of L.rows) sumAlive += r.alive;
  const mbarDel = L.W / (sumAlive / L.rows.length);
  const lnD = Math.log(L.D);
  // sigma of the OLD tile's gap word, exactly
  let sOld = null;
  if (L.tile) {
    const s = L.tile.slots, D = L.tile.slots.length, W = L.tile.W;
    let s1 = 0, s2 = 0;
    for (let i = 0; i < D; i++) { const g = (i + 1 < D) ? s[i + 1] - s[i] : W - s[i] + s[0]; s1 += g; s2 += g * g; }
    const mu = s1 / D; sOld = Math.sqrt(s2 / D - mu * mu);
  }
  for (const m of (L.mOnly1 ? [1] : [1, 2, 4, 8])) {
    let mx = 0, sum = 0;
    for (const r of L.rows) { const v = r.best[m]; if (v > mx) mx = v; sum += v; }
    const mean = sum / L.rows.length;
    const den = Math.sqrt(2 * m * lnD);
    const sMean = (mean - m * mbarDel) / den, sMax = (mx - m * mbarDel) / den;
    console.log('  ' + pad(L.x, 2) + '  ' + pad(L.p, 2) + '  ' + pad(m, 2) +
      '   ' + pad(F(sMean, 4), 17) + '   ' + pad(F(sMax, 4), 16) +
      '   ' + pad(F(sMax / sMean, 4), 5) + '   ' + pad(sOld === null ? '-' : F(sOld, 4), 14));
  }
  console.log('');
}

// ------------------------------------------------------- the deletion floor
console.log('='.repeat(78));
console.log('THE FLOOR: min_a Delta_1 against G2(x#) itself');
console.log('='.repeat(78));
console.log('Deletion can only merge gaps, so Delta_1 >= G2(x#) for every a. The');
console.log('question is how much of the fold multiplier is already spent by the');
console.log('WORST alignment, i.e. how much is density and how little is choice.');
console.log('');
console.log('   x   p   G2(x#)   min_a   mean_a   max_a = G2(x\'#)   min/G2   mean/G2   max/G2');
for (const L of LEVELS) {
  const g2old = L.tile ? maxsumsOfTile(L.tile).best[1] : L.g2old;
  let mn = Infinity, mx = 0, sum = 0;
  for (const r of L.rows) { const v = r.best[1]; if (v < mn) mn = v; if (v > mx) mx = v; sum += v; }
  const mean = sum / L.rows.length;
  const base = g2old;
  console.log('  ' + pad(L.x, 2) + '  ' + pad(L.p, 2) + '  ' + pad(base, 6) + '  ' + pad(mn, 6) +
    '  ' + pad(F(mean, 1), 7) + '  ' + pad(mx, 15) +
    '  ' + pad(F(mn / base, 4), 7) + '  ' + pad(F(mean / base, 4), 8) + '  ' + pad(F(mx / base, 4), 7));
  if (mn < base) { FAILS++; console.log('       FAIL: min_a Delta_1 below G2(x#), impossible'); }
}

console.log('');
console.log('='.repeat(78));
console.log(FAILS === 0 ? 'SELF-TESTS: all passed.' : 'SELF-TESTS: ' + FAILS + ' FAILED.');
console.log('elapsed ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');
console.log('='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-0c0e-01-deleted-family.js -- 29
//   invocation:  node research/attack-0c0e-01-deleted-family.js 29
//   code-sha256: 9ec35a3cc01ab39ca93db9a32c47d70e32ba0db8ef26e40d768e2daf763df1a4
//   out-sha256:  bde0240e3cd178db3924761ba3e7bbd1bc41b6198c82eee08cbb0fa50de5c367
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     47.7 s
// ============================================================================
// ==============================================================================
// ATTACK 0c x 0e -- STAGE 2: THE RESIDUE-DELETED MAXSUM FAMILY, EXACTLY
// ==============================================================================
// Delta_m(x, p, a) = maxsum_m(T_x minus classes {a, a-2} mod p), p = next prime.
// Sieve form throughout (units.js sec 5). MMAX = 8.
//
// ------------------------------------------------------------------------------
// SELF-TESTS
// ------------------------------------------------------------------------------
//   ok    D(T_3) = prod (q-2)   D = 1
//   ok    D(T_5) = prod (q-2)   D = 3
//   ok    D(T_7) = prod (q-2)   D = 15
//   ok    D(T_11) = prod (q-2)   D = 135
//   ok    D(T_13) = prod (q-2)   D = 1485
//   ok    D(T_17) = prod (q-2)   D = 22275
//   ok    D(T_19) = prod (q-2)   D = 378675
//   ok    D(T_23) = prod (q-2)   D = 7952175
//   ok    G2(3#) = 6   maxsum_1 = 6
//   ok    G2(5#) = 12   maxsum_1 = 12
//   ok    G2(7#) = 30   maxsum_1 = 30
//   ok    G2(11#) = 42   maxsum_1 = 42
//   ok    G2(13#) = 66   maxsum_1 = 66
//   ok    G2(17#) = 108   maxsum_1 = 108
//   ok    G2(19#) = 150   maxsum_1 = 150
//   ok    G2(23#) = 204   maxsum_1 = 204
//
// ------------------------------------------------------------------------------
// COPY THEOREM, RE-VERIFIED HERE (max over the p 2-sets equals the fold)
// ------------------------------------------------------------------------------
//   x   p    m   max_a Delta_m   maxsum_m(T_p)   equal?
//    7  11    1              42              42   yes
//    7  11    2              66              66   yes
//    7  11    3              96              96   yes
//    7  11   all m <= 8: EQUAL
//   11  13    1              66              66   yes
//   11  13    2              96              96   yes
//   11  13    3             138             138   yes
//   11  13   all m <= 8: EQUAL
//   13  17    1             108             108   yes
//   13  17    2             150             150   yes
//   13  17    3             168             168   yes
//   13  17   all m <= 8: EQUAL
//   17  19    1             150             150   yes
//   17  19    2             186             186   yes
//   17  19    3             210             210   yes
//   17  19   all m <= 8: EQUAL
//   19  23    1             204             204   yes
//   19  23    2             234             234   yes
//   19  23    3             300             300   yes
//   19  23   all m <= 8: EQUAL
//   23  29    1             258             258   yes
//   23  29    2             330             330   yes
//   23  29    3             390             390   yes
//   23  29   all m <= 8: EQUAL
//   29  31    1             348             348   yes
//   29  31   all m <= 1: EQUAL
//
// ==============================================================================
// (a) MAX OVER 2-SETS AGAINST MEAN OVER 2-SETS
// ==============================================================================
// pred = 1 + ln p / (2 ln D_x), the extreme-value share the max over p
// alignments has to supply if the growth law holds on the deleted tile.
//
//    x   p        lnD    m     min_a     mean_a      max_a   max/mean   max/min      pred
//    7  11     2.7081    1        30      34.36         42     1.2222    1.4000    1.4427
//    7  11     2.7081    2        42      55.64         66     1.1863    1.5714    1.4427
//    7  11     2.7081    3        66      78.55         96     1.2222    1.4545    1.4427
//    7  11     2.7081    4        78      97.09        108     1.1124    1.3846    1.4427
//    7  11     2.7081    5        96     117.27        138     1.1767    1.4375    1.4427
//    7  11     2.7081    6       108     135.27        156     1.1532    1.4444    1.4427
//    7  11     2.7081    7       126     148.91        168     1.1282    1.3333    1.4427
//    7  11     2.7081    8       138     163.09        180     1.1037    1.3043    1.4427
//
//   11  13     4.9053    1        48      64.62         66     1.0214    1.3750    1.2614
//   11  13     4.9053    2        78      91.85         96     1.0452    1.2308    1.2614
//   11  13     4.9053    3       108     121.85        138     1.1326    1.2778    1.2614
//   11  13     4.9053    4       138     143.54        156     1.0868    1.1304    1.2614
//   11  13     4.9053    5       156     161.54        168     1.0400    1.0769    1.2614
//   11  13     4.9053    6       168     179.08        186     1.0387    1.1071    1.2614
//   11  13     4.9053    7       180     194.77        204     1.0474    1.1333    1.2614
//   11  13     4.9053    8       198     210.92        228     1.0810    1.1515    1.2614
//
//   13  17     7.3032    1        90     102.71        108     1.0515    1.2000    1.1940
//   13  17     7.3032    2       120     137.29        150     1.0925    1.2500    1.1940
//   13  17     7.3032    3       156     163.06        168     1.0303    1.0769    1.1940
//   13  17     7.3032    4       174     183.88        198     1.0768    1.1379    1.1940
//   13  17     7.3032    5       180     200.47        210     1.0475    1.1667    1.1940
//   13  17     7.3032    6       210     219.88        240     1.0915    1.1429    1.1940
//   13  17     7.3032    7       228     244.24        258     1.0564    1.1316    1.1940
//   13  17     7.3032    8       258     277.76        288     1.0368    1.1163    1.1940
//
//   17  19    10.0112    1       138     144.95        150     1.0349    1.0870    1.1471
//   17  19    10.0112    2       168     175.58        186     1.0594    1.1071    1.1471
//   17  19    10.0112    3       192     201.16        210     1.0440    1.0938    1.1471
//   17  19    10.0112    4       210     222.00        228     1.0270    1.0857    1.1471
//   17  19    10.0112    5       240     252.00        282     1.1190    1.1750    1.1471
//   17  19    10.0112    6       282     287.68        300     1.0428    1.0638    1.1471
//   17  19    10.0112    7       300     330.95        348     1.0515    1.1600    1.1471
//   17  19    10.0112    8       348     365.05        378     1.0355    1.0862    1.1471
//
//   19  23    12.8444    1       180     189.91        204     1.0742    1.1333    1.1221
//   19  23    12.8444    2       210     217.83        234     1.0743    1.1143    1.1221
//   19  23    12.8444    3       240     259.57        300     1.1558    1.2500    1.1221
//   19  23    12.8444    4       300     323.74        348     1.0749    1.1600    1.1221
//   19  23    12.8444    5       348     370.43        390     1.0528    1.1207    1.1221
//   19  23    12.8444    6       384     402.52        462     1.1478    1.2031    1.1221
//   19  23    12.8444    7       408     434.35        498     1.1465    1.2206    1.1221
//   19  23    12.8444    8       450     476.61        528     1.1078    1.1733    1.1221
//
//   23  29    15.8890    1       222     234.00        258     1.1026    1.1622    1.1060
//   23  29    15.8890    2       288     304.97        330     1.0821    1.1458    1.1060
//   23  29    15.8890    3       348     361.24        390     1.0796    1.1207    1.1060
//   23  29    15.8890    4       390     398.69        420     1.0535    1.0769    1.1060
//   23  29    15.8890    5       420     454.97        510     1.1210    1.2143    1.1060
//   23  29    15.8890    6       462     502.55        540     1.0745    1.1688    1.1060
//   23  29    15.8890    7       504     535.45        552     1.0309    1.0952    1.1060
//   23  29    15.8890    8       540     563.79        582     1.0323    1.0778    1.1060
//
//   29  31    19.1848    1       318     328.45        348     1.0595    1.0943    1.0895
//
// ==============================================================================
// (b) HOW FREQUENT IS A GOOD LEVEL? (max/mean within a threshold)
// ==============================================================================
//   m    within 1.10   within 1.25   within 1.50    of 7 levels     worst level
//    1              5             7             7              7     T_7 at 1.2222
//    2              5             6             6              6     T_7 at 1.1863
//    3              3             6             6              6     T_7 at 1.2222
//    4              5             6             6              6     T_7 at 1.1124
//    5              3             6             6              6     T_7 at 1.1767
//    6              4             6             6              6     T_7 at 1.1532
//    7              4             6             6              6     T_19 at 1.1465
//    8              4             6             6              6     T_19 at 1.1078
//
// ==============================================================================
// (c) THE EXTREMAL ALIGNMENT: how concentrated, and what it merges
// ==============================================================================
//    x   p   #a attaining max_1   a* (first)   winning gap   old gaps merged   contains old record?
//    7  11             2 of 11            5            42                 2   yes
//   11  13            12 of 13            0            66                 2   no
//   13  17            10 of 17            0           108                 3   yes
//   17  19            11 of 19            0           150                 2   yes
//   19  23             3 of 23            5           204                 4   no
//   23  29             2 of 29            2           258                 3   no
//   29  31             4 of 31            7           348                 -   -
//
//   full argmax sets at m = 1 (are they spread or clustered?):
//     T_ 7 mod 11: {5, 7}
//     T_11 mod 13: {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12}
//     T_13 mod 17: {0, 2, 3, 5, 6, 8, 9, 12, 13, 16}
//     T_17 mod 19: {0, 1, 2, 4, 5, 9, 13, 14, 16, 17, 18}
//     T_19 mod 23: {5, 10, 19}
//     T_23 mod 29: {2, 15}
//     T_29 mod 31: {7, 12, 23, 27}
//
// ==============================================================================
// (d) DELETION AGAINST THE GROWTH LAW maxsum_m = m*mbar + sigma*sqrt(2 m ln D)
// ==============================================================================
// mbar_del is the mean gap of the deleted tile, measured, not assumed:
// mbar_del = W_x / (alive slots). Prediction: mbar_del = mbar_x * p/(p-2)
// exactly on average over a, and ln D barely moves, so the deterministic
// term takes the whole density shift and the max over a supplies ln(p-2).
//
//    x   p    mbar_x   mean mbar_del   mbar_x*p/(p-2)   mbar_{x'}   ln D_x   ln D_{x'}
//    7  11   14.0000        17.1111          17.1111     17.1111    2.708      4.905
//   11  13   17.1111        20.2222          20.2222     20.2222    4.905      7.303
//   13  17   20.2222        22.9185          22.9185     22.9185    7.303     10.011
//   17  19   22.9185        25.6148          25.6148     25.6148   10.011     12.844
//   19  23   25.6148        28.0543          28.0543     28.0543   12.844     15.889
//   23  29   28.0543        30.1324          30.1324     30.1324   15.889     19.185
//   29  31   30.1324        32.2105          32.2105     32.2105   19.185     22.552
//
// sigma implied by the MEAN of the family and by the MAX of the family,
// read off maxsum_m = m*mbar_del + sigma*sqrt(2 m ln D). If deletion moved
// the fluctuation term, sigma_mean would differ from sigma of the old tile.
//
//    x   p   m   sigma from mean_a   sigma from max_a   ratio   sigma_old(T_x)
//    7  11   1              7.4133            10.6945   1.4426           7.1554
//    7  11   2              6.5064             9.6553   1.4840           7.1554
//    7  11   4              6.1546             8.4983   1.3808           7.1554
//    7  11   8              3.9806             6.5494   1.6453           7.1554
//
//   11  13   1             14.1732            14.6153   1.0312           9.3956
//   11  13   2             11.6042            12.5420   1.0808           9.3956
//   11  13   4             10.0010            11.9902   1.1989           9.3956
//   11  13   8              5.5474             7.4750   1.3475           9.3956
//
//   13  17   1             20.8768            22.2620   1.0664          12.0326
//   13  17   2             16.9212            19.2720   1.1389          12.0326
//   13  17   4             12.0634            13.9104   1.1531          12.0326
//   13  17   8              8.7344             9.6812   1.1084          12.0326
//
//   17  19   1             26.6686            27.7978   1.0423          14.5863
//   17  19   2             19.6503            21.2971   1.0838          14.5863
//   17  19   4             13.3576            14.0280   1.0502          14.5863
//   17  19   8             12.6526            13.6756   1.0809          14.5863
//
//   19  23   1             31.9348            34.7141   1.0870          17.1618
//   19  23   2             22.5616            24.8180   1.1000          17.1618
//   19  23   4             20.8667            23.2600   1.1147          17.1618
//   19  23   8             17.5907            21.1756   1.2038          17.1618
//
//   23  29   1             36.1648            40.4222   1.1177          19.4656
//   23  29   2             30.6943            33.8345   1.1023          19.4656
//   23  29   4             24.6719            26.5620   1.0766          19.4656
//   23  29   8             20.2412            21.3831   1.0564          19.4656
//
//   29  31   1             47.8246            50.9805   1.0660                -
//
// ==============================================================================
// THE FLOOR: min_a Delta_1 against G2(x#) itself
// ==============================================================================
// Deletion can only merge gaps, so Delta_1 >= G2(x#) for every a. The
// question is how much of the fold multiplier is already spent by the
// WORST alignment, i.e. how much is density and how little is choice.
//
//    x   p   G2(x#)   min_a   mean_a   max_a = G2(x'#)   min/G2   mean/G2   max/G2
//    7  11      30      30     34.4               42   1.0000    1.1455   1.4000
//   11  13      42      48     64.6               66   1.1429    1.5385   1.5714
//   13  17      66      90    102.7              108   1.3636    1.5561   1.6364
//   17  19     108     138    144.9              150   1.2778    1.3421   1.3889
//   19  23     150     180    189.9              204   1.2000    1.2661   1.3600
//   23  29     204     222    234.0              258   1.0882    1.1471   1.2647
//   29  31     258     318    328.5              348   1.2326    1.2731   1.3488
//
// ==============================================================================
// SELF-TESTS: all passed.
// elapsed 47.6 s
// ==============================================================================
// ───── stderr ─────
// [0.0s] built T_5  D = 3
// [0.0s] built T_7  D = 15
// [0.0s] built T_11  D = 135
// [0.0s] built T_13  D = 1485
// [0.0s] built T_17  D = 22275
// [0.0s] built T_19  D = 378675
// [0.0s] built T_23  D = 7952175
// [0.2s] family at T_7 deleted mod 11 done (11 alignments)
// [0.2s] family at T_11 deleted mod 13 done (13 alignments)
// [0.2s] family at T_13 deleted mod 17 done (17 alignments)
// [0.2s] family at T_17 deleted mod 19 done (19 alignments)
// [0.4s] family at T_19 deleted mod 23 done (23 alignments)
// [6.4s] family at T_23 deleted mod 29 done (29 alignments)
// [8.8s]   T_29 alignment 0/31  maxgap 330
// [19.6s]   T_29 alignment 8/31  maxgap 318
// [29.6s]   T_29 alignment 16/31  maxgap 330
// [39.6s]   T_29 alignment 24/31  maxgap 330
// [47.0s] streamed T_29 family done (m = 1 only)
// ============================================================================
// READINGS
// ============================================================================

// *** CORRECTION 2026-08-20 to READING 5's last sentence. "The argmax sets
//     carry no arithmetic pattern" is REFUTED: they carry exactly one — every
//     argmax set from the second fold up is closed under the tile mirror
//     a -> (w - a) mod p, w = W mod p, and the single exception, the first
//     fold, is the licensed one: its unique argmax IS the seam-striking
//     alignment. Proven as the Mirror-Sweep Lemma and verified exhaustively
//     (research/attack-0c-holesweep-01.js;
//     research/history/staging/attack-0c-holesweep.md), and the closure of
//     these same embedded sets was recomputed independently by the structural
//     red team (research/history/staging/redteam-0820-structural.md, part 1b).
//     The reading's counts and set lists below are unchanged and remain
//     correct; only the "no arithmetic pattern" sentence is retired. ***

// 1. THE COPY THEOREM HOLDS AT EVERY LEVEL REACHED HERE, INCLUDING T_29.
//    max over the p 2-sets equals maxsum_m of the fold at every (x, m) tested:
//    EQUAL at all m <= 8 for x = 7, 11, 13, 17, 19, 23, and at m = 1 for
//    x = 29, where max_a Delta_1 = 348 = G2(31#), the eleventh exact ladder
//    term. That is an independent re-verification of U-FRAME 5a step 2 on a
//    level the original 40-of-40 check did not reach.
//
// 2. THE ALIGNMENT MAXIMUM IS WORTH ALMOST NOTHING OVER THE ALIGNMENT MEAN.
//    max_a/mean_a at m = 1 reads 1.0214, 1.0515, 1.0349, 1.0742, 1.1026,
//    1.0595 at T_11, T_13, T_17, T_19, T_23, T_29. The pre-registered
//    prediction 1 + ln p/(2 ln D) reads 1.2614, 1.1940, 1.1471, 1.1221,
//    1.1060, 1.0895 at the same levels and is an OVER-estimate at all six.
//    So the copy theorem's max over p alignments exceeds the mean over them
//    by between 1.0214 and 1.1026, and by less than the prediction at every
//    one of the six levels.
//
// 3. THE PRE-REGISTERED PREDICTION IS THEREFORE HALF RIGHT AND THE HALF THAT
//    IS WRONG CLOSES THE ROUTE HARDER. The shape was right (a small, roughly
//    ln p/(2 ln D)-sized factor, not a constant one); the level was wrong in
//    the direction that makes the alignment freedom worth LESS. Whatever an
//    argument would buy by replacing the max with the mean, it is at most
//    11 percent at every level here, and 6.0 percent at the deepest.
//
// 4. GOODNESS IS NOT SPARSE, IT IS UNIVERSAL. At m = 1 all 7 levels sit
//    within 1.25 of the mean and 5 of 7 within 1.10; at every m <= 8 the
//    count within a factor 1.50 is every level that m has. There is no sparse set of good
//    levels to select, because there is no set of bad ones. An i.o. licence
//    has nothing to spend itself on here.
//
// 5. THE EXTREMAL ALIGNMENT IS NOT RARE AND IT IS NOT UNIQUE, AND THE
//    PRE-REGISTERED GUESS THAT IT WOULD BE NEAR-UNIQUE IS REFUTED. The count
//    of alignments attaining max_1 runs 2 of 11, 12 of 13, 10 of 17, 11 of 19,
//    3 of 23, 2 of 29, 4 of 31. At T_11 twelve of the thirteen alignments
//    attain the record. The argmax sets carry no arithmetic pattern: they are
//    {5, 7}, all of 0..12 except 11, ten scattered residues mod 17, eleven
//    mod 19, {5, 10, 19}, {2, 15}, {7, 12, 23, 27}.
//
// 6. WHAT THE WINNING WINDOW MERGES MATCHES THE EFFECTIVE RUN LENGTH, AND
//    THE PREDICTION WAS RIGHT THERE. The record window spans 2, 2, 3, 2, 4, 3
//    old gaps at x = 7, 11, 13, 17, 19, 23, inside the 2-to-4 band U-FRAME 5a
//    measures for 1 + j*(1). It contains the OLD record gap at only 3 of those
//    6 levels, which is the same fact 5a records as "the last three folds
//    assembled a fresh maximum rather than extending the old one".
//
// 7. DELETION MOVES THE DETERMINISTIC TERM EXACTLY AND THE FLUCTUATION TERM
//    HARDLY AT ALL. The mean deleted tile has mbar_del equal to
//    mbar_x * p/(p-2) at every level, and that number is mbar_{x'} itself:
//    17.1111, 20.2222, 22.9185, 25.6148, 28.0543, 30.1324, 32.2105 at
//    x = 7..29. So the density half of the fold is fixed by Mertens and is
//    not available to any argument. Meanwhile ln D_x moves to ln D_{x'} only
//    through the max over alignments, which is reading 2's few percent.
//
// 8. THE WORST ALIGNMENT ALREADY SPENDS MOST OF THE FOLD. min_a Delta_1/G2(x#)
//    reads 1.1429, 1.3636, 1.2778, 1.2000, 1.0882, 1.2326 at x = 11..29
//    against max_a/G2(x#) of 1.5714, 1.6364, 1.3889, 1.3600, 1.2647, 1.3488.
//    The whole fold multiplier is already there at the WORST alignment; what
//    the choice of alignment adds on top is the ratio of those two columns,
//    which is reading 2's max/mean to within its own spread. The fold is
//    density, not choice.
//
// 9. SIGMA READ OFF THE MEAN AND OFF THE MAX AGREE TO WITHIN 12 PERCENT AT
//    EVERY LEVEL AND m TESTED (ratio 1.0312 to 1.6453, and 1.0423 to 1.2038
//    once x >= 17), and both sit above the OLD tile's own gap sd. The law
//    maxsum_m = m*mbar + sigma*sqrt(2 m ln D) survives deletion with its
//    fluctuation coefficient intact; nothing in the deleted family is a new
//    kind of object. That is what makes reading 7 a statement about the fold
//    and not about the instrument.
//
// 10. WHAT THIS FILE DOES NOT SHOW. It does not bound Delta_m. It measures
//    the family and prices one specific route into it, the max-to-mean trade
//    that a level-selecting argument would need. Levels above T_29 are out of
//    reach by this method, and the T_29 row is m = 1 only. Nothing here is
//    fitted and nothing is extrapolated; the census-scaling of reading 2 is
//    tested separately, in the companion level-selection script's Part C.
