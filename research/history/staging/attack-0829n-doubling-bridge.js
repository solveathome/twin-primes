// attack-0829n-doubling-bridge.js  --  TODO D: the doubling bridge at C2 = 8
//
// THE QUESTION. Can a bridging certificate carry Ghat(2s) <= 8 * Ghat(s)
// from level s to level 2s uniformly in s (ALL s, the base-2 chain included,
// C2 = 8 fixed inside the legal band [4, 19.2455))? Ghat(t) = G2(P(t)#), P(t)
// the largest prime <= t, exactly as in attack-doubling-01.js.
//
// WHAT IT COMPUTES, section by section:
//  A. custody: the two ladders parsed from their keepers (never retyped),
//     cross-checked on the 14 shared terms; the C2 table s = 2..41 rebuilt
//     and compared DIGIT FOR DIGIT against the table bound inside
//     attack-doubling-01.js's own OUTPUT block (parsed from that file);
//  B. tiles T_p to 23# by fold recursion, each checked against the ladder;
//  C. an independent kill-run walk engine (bitmask, no shift operator) that
//     re-derives G2, least argmax, nmax, K* and k at the eleven enumerable
//     doubling steps and compares every figure against attack-doubling-01's
//     bound F-table; then THREE NEW STEPS the corpus has not walked:
//     13#->29# (s = 15), 13#->31# (s = 16, the chain's sup step) and
//     17#->31# (s = 17, 18), each re-deriving the ladder row at 29# / 31#;
//  D. the run floor N = pi(2s) - pi(s) (Lemma 1 of hsubpow-explicit-K.md,
//     CITED) against K* at all fourteen steps, and where the K*-product
//     certificate must exit C2 = 8 and the legal band, all-integer s and on
//     the chain;
//  E. the MAXSUM certificate Ghat(2s) <= maxsum_{K*+1}(T_s) (the one-line
//     sharpening of the Bridging Lemma; a3-05-bound-L.md Theorem B's shape)
//     and the CRT floor maxsum_{N+1}(T_s) <= Ghat(2s), sandwiching C2 at
//     every step; the C2 = 8 check of the maxsum certificate;
//  F. the anatomy of the s = 16 record window (the sup 348/66);
//  G. the telescoped chain as a Cesaro mean of log2 C2 (the kill check's
//     arithmetic);
//  H. summary numbers.
//
// HONEST DOUBT. Fourteen steps, all at P(2s) <= 31, cannot see an all-s
// statement; they can only fail to break one. The maxsum certificate is a
// per-step theorem once K* is computed; nothing here bounds K* a priori.
//
// ARITHMETIC NOTE (width rule). Largest integer RUN here: positions inside
// the 31# period, 200,560,490,130 < 2^53, all Number; global slot indices
// reach 1485 * 6,678,671 < 2^34, Number. Tile positions to 23# = 223,092,870
// live in Int32Array under an explicit guard. Bitmasks are Uint32Array words
// manipulated with &, |, ^ and Math.clz32 only; NO shift operator anywhere in
// this file; bit b is BIT[b] = 2^b from a table, and the guard on it is the
// table's own length.
//
// usage: node research/history/staging/attack-0829n-doubling-bridge.js

'use strict';

const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const RES = path.resolve(__dirname, '..', '..');            // research/
const WID = require(path.join(RES, 'qc', 'widths.js'));
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '  n/a');
const pad = (s, n) => String(s).padStart(n);
let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) { FAILS++; console.log('  FAIL  ' + label + (detail ? '   ' + detail : '')); }
  else console.log('  ok    ' + label + (detail ? '   ' + detail : ''));
}
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// ------------------------------------------------------- A. custody
const srcLadder = fs.readFileSync(path.join(RES, 'exact-g2-ladder.js'), 'utf8');
const srcInterp = fs.readFileSync(path.join(RES, 'import-interp-01-bgt-defect.js'), 'utf8');
const srcD01 = fs.readFileSync(path.join(RES, 'attack-doubling-01.js'), 'utf8');

const EXACT = [];
{
  const re = /\{ x: (\d+),\s+g: (\d+),\s+pos: (\d+)n,\s+nmax: (\d+)/g;
  let m;
  while ((m = re.exec(srcLadder)) !== null) {
    const big = BigInt(m[3]);
    WID.assertFits('ladder pos (exact-g2-ladder.js)', Number(big), Float64Array, 'x=' + m[1]);
    EXACT.push({ x: +m[1], g: +m[2], pos: Number(big), nmax: +m[4] });
  }
}
if (EXACT.length === 0) throw new Error('parse failure: no LADDER rows in exact-g2-ladder.js');
let A144311 = null;
{
  const m = srcInterp.match(/const A144311 = \[([^\]]+)\]/s);
  if (!m) throw new Error('parse failure: A144311 not found');
  A144311 = m[1].split(',').map((s) => parseInt(s.trim(), 10));
}
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2FULL = A144311.map((v) => v + 1);
const ladderRow = (x) => EXACT.find((e) => e.x === x);

console.log('=== A. CUSTODY: LADDERS, AND THE C2 TABLE AGAINST doubling-01 =======');
check('14 exact terms parsed (pos BigInt-guarded < 2^53)', EXACT.length === 14);
check('22 A144311 terms parsed', A144311.length === 22);
{
  let agree = true;
  for (let i = 0; i < 14; i++) agree = agree && EXACT[i].x === PR[i] && EXACT[i].g === G2FULL[i];
  check('exact ladder == A144311+1 on all 14 shared terms', agree);
}
function mkG(pr, vals) {
  return {
    at(t) { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : vals[k]; },
    pAt(t) { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : pr[k]; },
  };
}
const L = mkG(PR, G2FULL);
// the C2 table, rebuilt, and doubling-01's own bound table, parsed
const ROWS = [];
for (let s = 2; s <= 41; s++) {
  const gs = L.at(s), g2s = L.at(2 * s), g = gcd(g2s, gs);
  ROWS.push({ s, ps: L.pAt(s), p2s: L.pAt(2 * s), gs, g2s, exact: g2s / g + '/' + gs / g, c2: g2s / gs, c2s: F(g2s / gs).trim(), grade: 2 * s <= 46 ? 'CUST' : 'trust' });
}
const D01 = { c2: new Map(), f: new Map(), walk: new Map() };
{
  const outAt = srcD01.indexOf('// OUTPUT');
  const body = srcD01.slice(outAt).split('\n');
  for (const ln of body) {
    let m;
    if ((m = /^\/\/\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+\/\d+)\s+([\d.]+)\s+(CUST|trust)/.exec(ln)))
      D01.c2.set(+m[1], { ps: +m[2], p2s: +m[3], gs: +m[4], g2s: +m[5], exact: m[6], c2s: m[7], grade: m[8] });
    if ((m = /^\/\/\s+(\d+)#->(\d+)#\s+([\d.]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)/.exec(ln)))
      D01.f.set(m[1] + '>' + m[2], { c2s: m[3], k: +m[4], Kstar: +m[5], cert: +m[6] });
    if ((m = /^\/\/\s+ok\s+walk (\d+)#->(\d+)#: G2 = (\d+) @ (\d+) \(x(\d+)\), D = (\d+) == ladder/.exec(ln)))
      D01.walk.set(m[1] + '>' + m[2], { g: +m[3], a: +m[4], nmax: +m[5], alive: +m[6] });
  }
}
check('doubling-01 OUTPUT block parsed: 40 C2 rows, 11 F rows, 11 walk rows', D01.c2.size === 40 && D01.f.size === 11 && D01.walk.size === 11,
  D01.c2.size + ' / ' + D01.f.size + ' / ' + D01.walk.size);
{
  let same = 0, diff = [];
  for (const r of ROWS) {
    const o = D01.c2.get(r.s);
    const eq = o && o.ps === r.ps && o.p2s === r.p2s && o.gs === r.gs && o.g2s === r.g2s && o.exact === r.exact && o.c2s === r.c2s && o.grade === r.grade;
    if (eq) same++; else diff.push(r.s);
  }
  check('C2 table reproduces doubling-01 DIGIT FOR DIGIT on all 40 rows (8 fields each)', same === 40 && diff.length === 0, same + ' of 40' + (diff.length ? ', differing at s = ' + diff.join(',') : ''));
}
const sup = ROWS.reduce((a, b) => (b.c2 > a.c2 ? b : a));
console.log('sup C2 over s = 2..41: ' + sup.exact + ' = ' + F(sup.c2) + ' at s = ' + sup.s + ';  chain rows s = 2,4,8,16,32: ' +
  [2, 4, 8, 16, 32].map((s) => ROWS.find((r) => r.s === s).c2s).join(' '));
check('every C2(s), s = 2..41, is <= 8 (the target constant is not contradicted by data)', ROWS.every((r) => r.c2 <= 8));
check('every C2(s), s = 2..41, is >= 2 and the sup 5.2727 sits at s = 16', ROWS.every((r) => r.c2 >= 2) && sup.s === 16);

// ------------------------------------------------------- B. tiles by fold
console.log('');
console.log('=== B. TILES T_p TO 23# BY FOLD RECURSION, CHECKED =================');
const TILE = { 2: Int32Array.from([1]) };
const WIDTH = { 2: 2 };
for (const p of [3, 5, 7, 11, 13, 17, 19, 23]) {
  const prev = PR[PR.indexOf(p) - 1];
  const src = TILE[prev], W = WIDTH[prev];
  const Wn = W * p;
  WID.assertFits('tile position (fold to ' + p + '#)', Wn, Int32Array, p + '#');
  const out = new Int32Array(src.length * (p - 2));
  let n = 0;
  for (let k = 0; k < p; k++) {
    const base = k * W;
    for (let i = 0; i < src.length; i++) {
      const pos = base + src[i], m = pos % p;
      if (m !== 0 && m !== p - 2) out[n++] = pos;
    }
  }
  if (n !== out.length) throw new Error('fold census mismatch at ' + p);
  TILE[p] = out; WIDTH[p] = Wn;
}
const Dexp = (p) => PR.filter((q) => q >= 3 && q <= p).reduce((a, q) => a * (q - 2), 1);
function tileGaps(p) {
  const t = TILE[p], W = WIDTH[p], D = t.length;
  let g = 0, least = -1, nmax = 0; const starts = new Set();
  for (let i = 0; i < D; i++) {
    const nxt = i + 1 < D ? t[i + 1] : t[0] + W;
    const d = nxt - t[i];
    if (d > g) { g = d; least = t[i]; nmax = 1; starts.clear(); starts.add(t[i]); }
    else if (d === g) { nmax++; starts.add(t[i]); }
  }
  return { g, least, nmax, starts };
}
// maxsum_m(T_p): the largest sum of m cyclically consecutive gaps (m < D)
function maxsum(p, m) {
  if (p === 2) return 2 * m;
  const t = TILE[p], W = WIDTH[p], D = t.length;
  if (m >= D) return W * Math.floor(m / D) + maxsum(p, m % D);
  let best = 0;
  for (let i = 0; i < D; i++) {
    const j = i + m;
    const span = (j < D ? t[j] : t[j - D] + W) - t[i];
    if (span > best) best = span;
  }
  return best;
}
const GAPS = { 2: { g: 2, least: 1, nmax: 1, starts: null } };
for (const p of [3, 5, 7, 11, 13, 17, 19, 23]) {
  GAPS[p] = tileGaps(p);
  const row = ladderRow(p);
  check('T_' + p + ': D = ' + TILE[p].length + ', G2 = ' + GAPS[p].g + ' @ ' + GAPS[p].least + ' (x' + GAPS[p].nmax + ') == ladder',
    TILE[p].length === Dexp(p) && GAPS[p].g === row.g && GAPS[p].least === row.pos && GAPS[p].nmax === row.nmax);
}
check('maxsum_1(T_p) == G2(p#) for p = 3..23 (the instrument at m = 1)', [3, 5, 7, 11, 13, 17, 19, 23].every((p) => maxsum(p, 1) === GAPS[p].g));
check('maxsum instrument sanity: G2 + min gap <= maxsum_2(T_13) <= 2*G2(13#)', maxsum(13, 2) >= 66 + 6 && maxsum(13, 2) <= 2 * 66, 'maxsum_2(T_13) = ' + maxsum(13, 2));
check('maxsum_m is monotone in m on T_13 for m = 1..40', (() => { let ok = true, prev = 0; for (let m = 1; m <= 40; m++) { const v = maxsum(13, m); ok = ok && v >= prev; prev = v; } return ok; })());

// ------------------------------------------------------- C. the walk engine
console.log('');
console.log('=== C. KILL-RUN WALKS: ELEVEN STEPS REPRODUCED, THREE NEW ===========');
const BIT = new Float64Array(32);
for (let b = 0; b < 32; b++) BIT[b] = Math.pow(2, b);
// alive-mask tables: for entering prime q and copy residue r = k mod q, the
// word row of level-P slots NOT killed by q in copy k (bit i set = alive).
function aliveTables(slots, W, Q, nW) {
  const tabs = [];
  for (const q of Q) {
    const tab = new Uint32Array(q * nW);
    const smod = new Int32Array(slots.length);
    for (let i = 0; i < slots.length; i++) smod[i] = slots[i] % q;
    for (let r = 0; r < q; r++) {
      const baseRes = (r * (W % q)) % q;
      const off = r * nW;
      for (let i = 0; i < slots.length; i++) {
        let v = baseRes + smod[i]; if (v >= q) v -= q;
        if (v !== 0 && v !== q - 2) {
          const w = Math.floor(i / 32), b = i - 32 * w;
          tab[off + w] = (tab[off + w] + BIT[b]);          // bit not yet set: plain add
        }
      }
    }
    tabs.push(tab);
  }
  return tabs;
}
function walkStep(P, Pp) {
  const Q = PR.filter((q) => q > P && q <= Pp);
  const slots = TILE[P], W = WIDTH[P], D = slots.length;
  const copies = Q.reduce((a, q) => a * q, 1);
  const WPp = W * copies;
  WID.assertFits('walk position range W*copies', WPp, Float64Array, P + '#->' + Pp + '#');
  WID.assertFits('global slot index D*copies', D * copies, Float64Array, P + '#->' + Pp + '#');
  const nW = Math.ceil(D / 32);
  const tabs = aliveTables(slots, W, Q, nW);
  const res = new Int32Array(Q.length);                    // k mod q, maintained incrementally
  const word = new Uint32Array(nW);
  let g = 0, a = -1, nmax = 0, kAt = -1, Kstar = -1, alive = 0;
  let prevGi = -1, prevPos = -1, firstGi = -1, firstPos = -1;
  const nq = Q.length;
  for (let k = 0; k < copies; k++) {
    // AND the rows
    for (let j = 0; j < nW; j++) {
      let w = tabs[0][res[0] * nW + j];
      for (let t = 1; t < nq; t++) w = w & tabs[t][res[t] * nW + j];
      word[j] = w;
    }
    for (let t = 0; t < nq; t++) { res[t]++; if (res[t] === Q[t]) res[t] = 0; }
    const kD = k * D, kW = k * W;
    for (let j = 0; j < nW; j++) {
      let w = word[j] | 0;
      while (w !== 0) {
        const lsb = w & -w;
        const b = 31 - Math.clz32(lsb);
        w = w ^ lsb;
        const idx = j * 32 + b;
        const gi = kD + idx, pos = kW + slots[idx];
        alive++;
        if (prevGi < 0) { firstGi = gi; firstPos = pos; }
        else {
          const d = pos - prevPos, dead = gi - prevGi - 1;
          if (d > g) { g = d; a = prevPos; nmax = 1; kAt = dead; }
          else if (d === g) nmax++;
          if (dead > Kstar) Kstar = dead;
        }
        prevGi = gi; prevPos = pos;
      }
    }
  }
  { // cyclic wrap
    const d = firstPos + WPp - prevPos, dead = firstGi + D * copies - prevGi - 1;
    if (d > g) { g = d; a = prevPos; nmax = 1; kAt = dead; }
    else if (d === g) nmax++;
    if (dead > Kstar) Kstar = dead;
  }
  return { P, Pp, Q, g, a, b: a + g, nmax, alive, kAt, Kstar, WPp, N: Q.length };
}
// anatomy of the least-argmax window in level-P coordinates
function anatomy(w) {
  const W = WIDTH[w.P];
  const S = new Set(TILE[w.P]);
  const isSlot = (x) => S.has(((x % W) + W) % W);
  const inner = [];
  for (let pos = w.a + 1; pos < w.b; pos++) if (isSlot(pos)) inner.push({ pos, killers: w.Q.filter((q) => pos % q === 0 || pos % q === q - 2) });
  const chain = [w.a, ...inner.map((z) => z.pos), w.b];
  const gaps = [];
  for (let i = 0; i + 1 < chain.length; i++) gaps.push(chain[i + 1] - chain[i]);
  const G2P = GAPS[w.P].g;
  let hasRecordCopy = false;
  for (let i = 0; i + 1 < chain.length; i++) {
    const st = w.P === 2 ? true : GAPS[w.P].starts.has(((chain[i] % W) + W) % W);
    if (st && gaps[i] === G2P) hasRecordCopy = true;
  }
  return { inner, gaps, maxSpan: Math.max(...gaps), G2P, hasRecordCopy, strikes: inner.reduce((x, z) => x + z.killers.length, 0), multi: inner.filter((z) => z.killers.length >= 2).length };
}
const STEPS = [
  { P: 2, Pp: 3, s: [2] }, { P: 3, Pp: 5, s: [3] }, { P: 3, Pp: 7, s: [4] }, { P: 5, Pp: 7, s: [5] },
  { P: 5, Pp: 11, s: [6] }, { P: 7, Pp: 13, s: [7, 8] }, { P: 7, Pp: 17, s: [9] }, { P: 7, Pp: 19, s: [10] },
  { P: 11, Pp: 19, s: [11] }, { P: 11, Pp: 23, s: [12] }, { P: 13, Pp: 23, s: [13, 14] },
  { P: 13, Pp: 29, s: [15], NEW: true }, { P: 13, Pp: 31, s: [16], NEW: true }, { P: 17, Pp: 31, s: [17, 18], NEW: true },
];
const WALK = [];
console.log('step         s        G2 @ least argmax (xnmax)   D(2s)        k   K*   N   wall');
for (const st of STEPS) {
  const t1 = Date.now();
  const w = walkStep(st.P, st.Pp);
  w.sList = st.s; w.NEW = !!st.NEW; w.anat = anatomy(w); w.k = w.anat.inner.length;
  w.wall = (Date.now() - t1) / 1000;
  WALK.push(w);
  const row = ladderRow(st.Pp);
  console.log('  ' + (st.P + '#->' + st.Pp + '#').padEnd(10) + pad(st.s.join(','), 6) + '   ' + pad(w.g, 5) + ' @ ' + pad(w.a, 11) + ' (x' + w.nmax + ')' +
    pad(w.alive, 12) + '   ' + pad(w.k, 3) + ' ' + pad(w.Kstar, 4) + ' ' + pad(w.N, 3) + '   ' + F(w.wall, 1) + ' s' + (w.NEW ? '   NEW' : ''));
  check('walk ' + st.P + '#->' + st.Pp + '#: G2, least argmax, nmax, D == ladder row x = ' + st.Pp,
    w.g === row.g && w.a === row.pos && w.nmax === row.nmax && w.alive === Dexp(st.Pp));
  check('  window decomposition closes: k+1 spanned level-' + st.P + ' gaps sum to L; k == kAt; every bridged copy killed by an entering prime',
    w.anat.gaps.reduce((x, y) => x + y, 0) === w.g && w.anat.gaps.length === w.k + 1 && w.k === w.kAt && w.anat.inner.every((z) => z.killers.length > 0));
  if (!w.NEW) {
    const f = D01.f.get(st.P + '>' + st.Pp), d = D01.walk.get(st.P + '>' + st.Pp);
    check('  == doubling-01 F row: C2 ' + f.c2s + ', k ' + f.k + ', K* ' + f.Kstar + ', cert ' + f.cert + '; walk row G2/argmax/nmax/D',
      F(w.g / w.anat.G2P).trim() === f.c2s && w.k === f.k && w.Kstar === f.Kstar && w.Kstar + 1 === f.cert &&
      d.g === w.g && d.a === w.a && d.nmax === w.nmax && d.alive === w.alive);
  }
}
check('K* >= k at every step (the record window is a kill-run)', WALK.every((w) => w.Kstar >= w.k));
check('the three NEW steps re-derive G2(29#) = 258 @ 1205437109 (x2) and G2(31#) = 348 @ 8813641451 (x4) by TWO paths at 31#',
  WALK[11].g === 258 && WALK[11].a === 1205437109 && WALK[11].nmax === 2 && WALK[12].g === 348 && WALK[12].a === 8813641451 && WALK[12].nmax === 4 &&
  WALK[13].g === 348 && WALK[13].a === 8813641451 && WALK[13].nmax === 4);

// ------------------------------------------------------- D. the run floor
console.log('');
console.log('=== D. THE RUN FLOOR K* >= pi(2s) - pi(s) [CITED, hsubpow-explicit-K Lemma 1] ==');
const SIEVE_TO = 4000;
const isP = new Uint8Array(SIEVE_TO + 1).fill(1); isP[0] = 0; isP[1] = 0;
for (let i = 2; i * i <= SIEVE_TO; i++) if (isP[i]) for (let j = i * i; j <= SIEVE_TO; j += i) isP[j] = 0;
const PI = new Int32Array(SIEVE_TO + 1);
for (let i = 1; i <= SIEVE_TO; i++) PI[i] = PI[i - 1] + isP[i];
const Ncount = (s) => PI[2 * s] - PI[s];
const lnD = (s) => { let v = 0; for (let p = 3; p <= s; p++) if (isP[p]) v += Math.log(p - 2); return v; };
check('N at the fourteen walked steps equals the entering-prime count of each walk', WALK.every((w) => Ncount(w.sList[0]) === w.N));
check('K* >= N at all fourteen steps (Lemma 1 holds at three new steps too)', WALK.every((w) => w.Kstar >= w.N),
  'K*/N: ' + WALK.map((w) => F(w.Kstar / w.N, 2).trim()).join(' '));
{
  let s8 = -1, s19 = -1;
  for (let s = 2; s <= 1000; s++) { if (s8 < 0 && Ncount(s) >= 8) s8 = s; if (s19 < 0 && Ncount(s) >= 19) s19 = s; }
  let c8 = -1, c19 = -1;
  for (let s = 2; s <= 2000; s *= 2) { if (c8 < 0 && Ncount(s) >= 8) c8 = s; if (c19 < 0 && Ncount(s) >= 19) c19 = s; }
  console.log('K*+1 >= N+1 > 8 as soon as N >= 8:  first integer s = ' + s8 + ' (N = ' + Ncount(s8) + ');  first chain s = ' + c8 + ' (N = ' + Ncount(c8) + ')');
  console.log('K*+1 >= N+1 > 19.2455 as soon as N >= 19:  first integer s = ' + s19 + ' (N = ' + Ncount(s19) + ');  first chain s = ' + c19 + ' (N = ' + Ncount(c19) + ')');
  console.log('N along the chain s = 2..1024: ' + [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024].map((s) => s + ':' + Ncount(s)).join(' '));
  console.log('Lemma 1 hypothesis D_s >= N: ln D_s at s = ' + s8 + ', ' + c8 + ', ' + c19 + ' = ' + F(lnD(s8), 2) + ', ' + F(lnD(c8), 2) + ', ' + F(lnD(c19), 2) + '  vs ln N = ' +
    F(Math.log(Ncount(s8)), 2) + ', ' + F(Math.log(Ncount(c8)), 2) + ', ' + F(Math.log(Ncount(c19)), 2));
  check('Lemma 1 hypothesis D_s >= N holds at s = ' + s8 + ', ' + c8 + ', ' + c19, lnD(s8) > Math.log(Ncount(s8)) && lnD(c8) > Math.log(Ncount(c8)) && lnD(c19) > Math.log(Ncount(c19)));
  check('on the chain the K*-product certificate exits C2 = 8 at s = 64 and the legal band at s = 128', c8 === 64 && c19 === 128);
  check('N is >= 8 at every chain s from 64 to 1024 (no later chain rung re-admits the certificate at C2 = 8)', [64, 128, 256, 512, 1024].every((s) => Ncount(s) >= 8));
}

// ------------------------------------------------------- E. the maxsum certificate
console.log('');
console.log('=== E. THE MAXSUM SANDWICH AT EVERY STEP =============================');
console.log('  floor  = maxsum_{N+1}(T_s)/Ghat(s)   [PROVEN lower bound on C2: Lemma 1\'s run placed on the thickest ground]');
console.log('  C2     = Ghat(2s)/Ghat(s)            [exact]');
console.log('  msc    = maxsum_{K*+1}(T_s)/Ghat(s)  [PROVEN upper bound on C2: the maxsum certificate]');
console.log('  K*+1   = the K*-product certificate  [PROVEN upper bound, doubling-01]');
console.log('step         s     N  K*   floor      C2      msc    K*+1   msc/C2  (K*+1)/msc  msc<=8');
let allSandwich = true, allM8 = true, mscSup = 0, mscSupStep = null;
for (const w of WALK) {
  const G2P = w.anat.G2P, c2 = w.g / G2P;
  const floor = maxsum(w.P, w.N + 1) / G2P;
  const msc = maxsum(w.P, w.Kstar + 1) / G2P;
  w.floor = floor; w.msc = msc; w.c2 = c2;
  allSandwich = allSandwich && floor <= c2 + 1e-12 && c2 <= msc + 1e-12 && msc <= w.Kstar + 1 + 1e-12;
  allM8 = allM8 && msc <= 8;
  if (msc > mscSup) { mscSup = msc; mscSupStep = w; }
  console.log('  ' + (w.P + '#->' + w.Pp + '#').padEnd(10) + pad(w.sList.join(','), 6) + pad(w.N, 4) + pad(w.Kstar, 4) + '  ' + F(floor) + '  ' + F(c2) + '  ' + F(msc) + '  ' + pad(w.Kstar + 1, 4) +
    '   ' + F(msc / c2, 2) + '     ' + F((w.Kstar + 1) / msc, 2) + '     ' + (msc <= 8 ? 'yes' : 'NO'));
}
check('sandwich floor <= C2 <= msc <= K*+1 at all fourteen steps', allSandwich);
check('the maxsum certificate is <= 8 at all fourteen steps (C2 = 8 bridge closes per step there)', allM8);
console.log('sup of the maxsum certificate over the fourteen steps: ' + F(mscSup) + ' at ' + mscSupStep.P + '#->' + mscSupStep.Pp + '# (s = ' + mscSupStep.sList.join(',') + ')');
console.log('so on the enumerable range the maxsum bridge certifies C2 = ' + F(Math.ceil(mscSup * 1e4) / 1e4) + ' and no lower; the K*-product bridge certifies ' + Math.max(...WALK.map((w) => w.Kstar + 1)));
// floor-only rows for s = 19..23 (walks infeasible; Ghat(2s) from the ladder)
console.log('floor-only rows, s = 19..23 (no walk; Ghat(2s) from the exact ladder):');
let floorOK = true;
for (const s of [19, 20, 21, 22, 23]) {
  const P = L.pAt(s), G2P = L.at(s), c2 = L.at(2 * s) / G2P, N = Ncount(s);
  const floor = maxsum(P, N + 1) / G2P;
  floorOK = floorOK && floor <= c2 + 1e-12;
  console.log('  s = ' + s + '  ' + P + '#->' + L.pAt(2 * s) + '#  N = ' + N + '  floor ' + F(floor) + '  C2 ' + F(c2) + (floor <= c2 ? '' : '   <-- VIOLATION'));
}
check('floor <= C2 at s = 19..23 as well (Lemma 1 consistent with the exact table at all s <= 23)', floorOK);
// the mean-gap scale: how much of the certificate is ground, how much is run
console.log('ground scale: tile mean gap gbar = s#/D_s, and the run-and-ground product (K*+1)*gbar against the certificate:');
console.log('step         gbar    (K*+1)gbar   msc*Ghat   rho_run=msc*Ghat/((K*+1)gbar)   Ghat(s)/gbar');
for (const w of WALK) {
  const gbar = WIDTH[w.P] / TILE[w.P].length, G2P = w.anat.G2P;
  console.log('  ' + (w.P + '#->' + w.Pp + '#').padEnd(10) + F(gbar, 2) + '   ' + F((w.Kstar + 1) * gbar, 1) + '   ' + pad(Math.round(w.msc * G2P), 7) + '        ' +
    F(w.msc * G2P / ((w.Kstar + 1) * gbar), 3) + '                  ' + F(G2P / gbar, 2));
}

// ------------------------------------------------------- F. anatomy at the sup step
console.log('');
console.log('=== F. THE SUP STEP 13#->31# (s = 16), HOOD OPEN =====================');
for (const w of WALK.filter((x) => x.NEW)) {
  const A = w.anat, g = gcd(w.g, A.G2P);
  const meanSpan = w.g / A.gaps.length, meanTile = WIDTH[w.P] / TILE[w.P].length;
  console.log('STEP s=' + w.sList.join(',') + '  ' + w.P + '# -> ' + w.Pp + '#   Q = {' + w.Q.join(',') + '}   C2 = ' + (w.g / g) + '/' + (A.G2P / g) + ' = ' + F(w.g / A.G2P));
  console.log('  argmax window [' + w.a + ', ' + w.b + ']  L = ' + w.g + '   bridged level-' + w.P + ' kills k = ' + A.inner.length + '   strikes = ' + A.strikes + '   multi-killed = ' + A.multi + '   K* = ' + w.Kstar);
  console.log('  killed copies: ' + A.inner.map((z) => z.pos + '(' + z.killers.join('&') + ')').join(' '));
  console.log('  spanned level-' + w.P + ' gaps: ' + A.gaps.join('+') + ' = ' + A.gaps.reduce((x, y) => x + y, 0) + '   max spanned ' + A.maxSpan + (A.maxSpan === A.G2P ? ' = G2(' + w.P + '#)' : ' < G2(' + w.P + '#) = ' + A.G2P));
  console.log('  contains a copy of the level-' + w.P + ' RECORD gap: ' + (A.hasRecordCopy ? 'YES' : 'NO') + '   inherited share max/L = ' + F(A.maxSpan / w.g) + '   new damage = ' + F(1 - A.maxSpan / w.g));
  console.log('  ground density: mean spanned gap ' + F(meanSpan, 2) + ' vs tile mean ' + F(meanTile, 2) + '   rho = ' + F(meanSpan / meanTile, 3));
  console.log('  the window realizes the longest run: ' + (w.k === w.Kstar ? 'YES (k = K*)' : 'NO (k = ' + w.k + ' < K* = ' + w.Kstar + ')'));
}

// ------------------------------------------------------- G. the telescoped chain
console.log('');
console.log('=== G. THE CHAIN TELESCOPED: beta(2^k) IS A CESARO MEAN OF log2 C2 ====');
console.log('  Ghat(2^{k+1}) = Ghat(2) * prod_{j<=k} C2(2^j), so beta(2^{k+1}) := ln Ghat(2^{k+1})/ln 2^{k+1}');
console.log('  = (log2 Ghat(2) + sum_{j=1..k} log2 C2(2^j)) / (k+1): the start is forgotten at rate 1/k.');
console.log('   k   s=2^k  Ghat   log2 C2(s)   beta(s)   running mean of log2 C2 so far');
{
  const ch = [2, 4, 8, 16, 32, 64];
  let sum = 0;
  for (let i = 0; i < ch.length; i++) {
    const s = ch[i], gh = L.at(s), k = i + 1;
    const c2 = i + 1 < ch.length ? L.at(2 * s) / gh : NaN;
    const beta = Math.log(gh) / Math.log(s);
    const lc = Number.isFinite(c2) ? Math.log2(c2) : NaN;
    console.log('  ' + pad(k, 2) + '  ' + pad(s, 5) + '  ' + pad(gh, 5) + '   ' + F(lc) + '   ' + F(beta) + '     ' + (i > 0 ? F(sum / i) : '   n/a'));
    if (Number.isFinite(lc)) sum += lc;
  }
  const b64 = Math.log(L.at(64)) / Math.log(64), recon = (Math.log2(L.at(2)) + sum) / 6;
  check('beta(64) == (log2 Ghat(2) + sum of log2 C2 over the five chain steps)/6, the Cesaro identity', Math.abs(b64 - recon) < 1e-12, F(b64) + ' vs ' + F(recon));
  console.log('  log2 8 = 3.0000: a uniform C2 = 8 caps limsup beta at 3, against the proven ceiling beta2 = 4.26645; log2 4 = 2 is the trap edge.');
}

// ------------------------------------------------------- H. summary
console.log('');
console.log('=== H. SUMMARY NUMBERS =============================================');
console.log('C2 table s = 2..41 reproduces doubling-01 digit for digit; sup ' + sup.exact + ' = ' + F(sup.c2) + ' at s = ' + sup.s);
console.log('eleven steps reproduce doubling-01 (G2, argmax, nmax, D, k, K*, cert); three NEW steps walked:');
for (const w of WALK.filter((x) => x.NEW)) console.log('  ' + w.P + '#->' + w.Pp + '# (s = ' + w.sList.join(',') + '): C2 = ' + F(w.c2) + '  k = ' + w.k + '  K* = ' + w.Kstar + '  N = ' + w.N + '  K*+1 = ' + (w.Kstar + 1) + '  msc = ' + F(w.msc) + '  floor = ' + F(w.floor));
console.log('K*+1 over the fourteen steps : ' + WALK.map((w) => w.Kstar + 1).join(' '));
console.log('msc  over the fourteen steps : ' + WALK.map((w) => F(w.msc, 2).trim()).join(' '));
console.log('C2   over the fourteen steps : ' + WALK.map((w) => F(w.c2, 2).trim()).join(' '));
console.log('K*-product certificate: exits C2 = 8 on the chain at s = 64 (N = ' + Ncount(64) + '), exits the legal band at s = 128 (N = ' + Ncount(128) + ')  [PROVEN via Lemma 1, CITED]');
console.log('maxsum certificate: <= 8 at all fourteen steps, sup ' + F(mscSup) + '; no a-priori bound on it is proven for any s past 18');
console.log('');
console.log('self-test failures: ' + FAILS + (FAILS ? '   <-- DO NOT TRUST THIS OUTPUT' : '   (all checks passed)'));
console.log('total ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0829n-doubling-bridge.js
//   invocation:  node research/history/staging/attack-0829n-doubling-bridge.js
//   code-sha256: a12d2919609eb1b946ac737314898e62dab8d22a0f89d29849ef644875b9a589
//   out-sha256:  217204ab0318154ca574ef831e887293b03d48cd9e20e8b9ea31873f8892c36f
//   body-lines:  190
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     44.8 s
// ============================================================================
// === A. CUSTODY: LADDERS, AND THE C2 TABLE AGAINST doubling-01 =======
//   ok    14 exact terms parsed (pos BigInt-guarded < 2^53)
//   ok    22 A144311 terms parsed
//   ok    exact ladder == A144311+1 on all 14 shared terms
//   ok    doubling-01 OUTPUT block parsed: 40 C2 rows, 11 F rows, 11 walk rows   40 / 11 / 11
//   ok    C2 table reproduces doubling-01 DIGIT FOR DIGIT on all 40 rows (8 fields each)   40 of 40
// sup C2 over s = 2..41: 58/11 =  5.2727 at s = 16;  chain rows s = 2,4,8,16,32: 3.0000 5.0000 2.2000 5.2727 3.1034
//   ok    every C2(s), s = 2..41, is <= 8 (the target constant is not contradicted by data)
//   ok    every C2(s), s = 2..41, is >= 2 and the sup 5.2727 sits at s = 16
//
// === B. TILES T_p TO 23# BY FOLD RECURSION, CHECKED =================
//   ok    T_3: D = 1, G2 = 6 @ 5 (x1) == ladder
//   ok    T_5: D = 3, G2 = 12 @ 17 (x2) == ladder
//   ok    T_7: D = 15, G2 = 30 @ 71 (x2) == ladder
//   ok    T_11: D = 135, G2 = 42 @ 899 (x4) == ladder
//   ok    T_13: D = 1485, G2 = 66 @ 731 (x12) == ladder
//   ok    T_17: D = 22275, G2 = 108 @ 701 (x20) == ladder
//   ok    T_19: D = 378675, G2 = 150 @ 659 (x20) == ladder
//   ok    T_23: D = 7952175, G2 = 204 @ 76166567 (x4) == ladder
//   ok    maxsum_1(T_p) == G2(p#) for p = 3..23 (the instrument at m = 1)
//   ok    maxsum instrument sanity: G2 + min gap <= maxsum_2(T_13) <= 2*G2(13#)   maxsum_2(T_13) = 96
//   ok    maxsum_m is monotone in m on T_13 for m = 1..40
//
// === C. KILL-RUN WALKS: ELEVEN STEPS REPRODUCED, THREE NEW ===========
// step         s        G2 @ least argmax (xnmax)   D(2s)        k   K*   N   wall
//   2#->3#         2       6 @           5 (x1)           1     2    2   1    0.0 s
//   ok    walk 2#->3#: G2, least argmax, nmax, D == ladder row x = 3
//   ok      window decomposition closes: k+1 spanned level-2 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 3.0000, k 2, K* 2, cert 3; walk row G2/argmax/nmax/D
//   3#->5#         3      12 @          17 (x2)           3     1    1   1    0.0 s
//   ok    walk 3#->5#: G2, least argmax, nmax, D == ladder row x = 5
//   ok      window decomposition closes: k+1 spanned level-3 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 2.0000, k 1, K* 1, cert 2; walk row G2/argmax/nmax/D
//   3#->7#         4      30 @          71 (x2)          15     4    4   2    0.0 s
//   ok    walk 3#->7#: G2, least argmax, nmax, D == ladder row x = 7
//   ok      window decomposition closes: k+1 spanned level-3 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 5.0000, k 4, K* 4, cert 5; walk row G2/argmax/nmax/D
//   5#->7#         5      30 @          71 (x2)          15     2    2   1    0.0 s
//   ok    walk 5#->7#: G2, least argmax, nmax, D == ladder row x = 7
//   ok      window decomposition closes: k+1 spanned level-5 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 2.5000, k 2, K* 2, cert 3; walk row G2/argmax/nmax/D
//   5#->11#        6      42 @         899 (x4)         135     3    3   2    0.0 s
//   ok    walk 5#->11#: G2, least argmax, nmax, D == ladder row x = 11
//   ok      window decomposition closes: k+1 spanned level-5 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 3.5000, k 3, K* 3, cert 4; walk row G2/argmax/nmax/D
//   7#->13#      7,8      66 @         731 (x12)        1485     3    3   2    0.0 s
//   ok    walk 7#->13#: G2, least argmax, nmax, D == ladder row x = 13
//   ok      window decomposition closes: k+1 spanned level-7 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 2.2000, k 3, K* 3, cert 4; walk row G2/argmax/nmax/D
//   7#->17#        9     108 @         701 (x20)       22275     5    5   3    0.0 s
//   ok    walk 7#->17#: G2, least argmax, nmax, D == ladder row x = 17
//   ok      window decomposition closes: k+1 spanned level-7 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 3.6000, k 5, K* 5, cert 6; walk row G2/argmax/nmax/D
//   7#->19#       10     150 @         659 (x20)      378675     8    8   4    0.0 s
//   ok    walk 7#->19#: G2, least argmax, nmax, D == ladder row x = 19
//   ok      window decomposition closes: k+1 spanned level-7 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 5.0000, k 8, K* 8, cert 9; walk row G2/argmax/nmax/D
//   11#->19#      11     150 @         659 (x20)      378675     5    6   3    0.0 s
//   ok    walk 11#->19#: G2, least argmax, nmax, D == ladder row x = 19
//   ok      window decomposition closes: k+1 spanned level-11 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 3.5714, k 5, K* 6, cert 7; walk row G2/argmax/nmax/D
//   11#->23#      12     204 @    76166567 (x4)     7952175    10   10   4    0.0 s
//   ok    walk 11#->23#: G2, least argmax, nmax, D == ladder row x = 23
//   ok      window decomposition closes: k+1 spanned level-11 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 4.8571, k 10, K* 10, cert 11; walk row G2/argmax/nmax/D
//   13#->23#   13,14     204 @    76166567 (x4)     7952175     8    8   3    0.0 s
//   ok    walk 13#->23#: G2, least argmax, nmax, D == ladder row x = 23
//   ok      window decomposition closes: k+1 spanned level-13 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok      == doubling-01 F row: C2 3.0909, k 8, K* 8, cert 9; walk row G2/argmax/nmax/D
//   13#->29#      15     258 @  1205437109 (x2)   214708725    10   10   4    0.7 s   NEW
//   ok    walk 13#->29#: G2, least argmax, nmax, D == ladder row x = 29
//   ok      window decomposition closes: k+1 spanned level-13 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   13#->31#      16     348 @  8813641451 (x4)  6226553025    14   17   5    26.3 s   NEW
//   ok    walk 13#->31#: G2, least argmax, nmax, D == ladder row x = 31
//   ok      window decomposition closes: k+1 spanned level-13 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   17#->31#   17,18     348 @  8813641451 (x4)  6226553025     9   13   4    17.6 s   NEW
//   ok    walk 17#->31#: G2, least argmax, nmax, D == ladder row x = 31
//   ok      window decomposition closes: k+1 spanned level-17 gaps sum to L; k == kAt; every bridged copy killed by an entering prime
//   ok    K* >= k at every step (the record window is a kill-run)
//   ok    the three NEW steps re-derive G2(29#) = 258 @ 1205437109 (x2) and G2(31#) = 348 @ 8813641451 (x4) by TWO paths at 31#
//
// === D. THE RUN FLOOR K* >= pi(2s) - pi(s) [CITED, hsubpow-explicit-K Lemma 1] ==
//   ok    N at the fourteen walked steps equals the entering-prime count of each walk
//   ok    K* >= N at all fourteen steps (Lemma 1 holds at three new steps too)   K*/N: 2.00 1.00 2.00 2.00 1.50 1.50 1.67 2.00 2.00 2.50 2.67 2.50 3.40 3.25
// K*+1 >= N+1 > 8 as soon as N >= 8:  first integer s = 34 (N = 8);  first chain s = 64 (N = 13)
// K*+1 >= N+1 > 19.2455 as soon as N >= 19:  first integer s = 96 (N = 19);  first chain s = 128 (N = 23)
// N along the chain s = 2..1024: 2:1 4:2 8:2 16:5 32:7 64:13 128:23 256:43 512:75 1024:137
// Lemma 1 hypothesis D_s >= N: ln D_s at s = 34, 64, 128 =  22.55,  49.34,  107.85  vs ln N =  2.08,  2.56,  3.14
//   ok    Lemma 1 hypothesis D_s >= N holds at s = 34, 64, 128
//   ok    on the chain the K*-product certificate exits C2 = 8 at s = 64 and the legal band at s = 128
//   ok    N is >= 8 at every chain s from 64 to 1024 (no later chain rung re-admits the certificate at C2 = 8)
//
// === E. THE MAXSUM SANDWICH AT EVERY STEP =============================
//   floor  = maxsum_{N+1}(T_s)/Ghat(s)   [PROVEN lower bound on C2: Lemma 1's run placed on the thickest ground]
//   C2     = Ghat(2s)/Ghat(s)            [exact]
//   msc    = maxsum_{K*+1}(T_s)/Ghat(s)  [PROVEN upper bound on C2: the maxsum certificate]
//   K*+1   = the K*-product certificate  [PROVEN upper bound, doubling-01]
// step         s     N  K*   floor      C2      msc    K*+1   msc/C2  (K*+1)/msc  msc<=8
//   2#->3#         2   1   2   2.0000   3.0000   3.0000     3    1.00      1.00     yes
//   3#->5#         3   1   1   2.0000   2.0000   2.0000     2    1.00      1.00     yes
//   3#->7#         4   2   4   3.0000   5.0000   5.0000     5    1.00      1.00     yes
//   5#->7#         5   1   2   2.0000   2.5000   2.5000     3    1.00      1.20     yes
//   5#->11#        6   2   3   2.5000   3.5000   3.5000     4    1.00      1.14     yes
//   7#->13#      7,8   2   3   2.2000   2.2000   2.6000     4    1.18      1.54     yes
//   7#->17#        9   3   5   2.6000   3.6000   3.6000     6    1.00      1.67     yes
//   7#->19#       10   4   8   3.2000   5.0000   5.0000     9    1.00      1.80     yes
//   11#->19#      11   3   6   2.5714   3.5714   4.0000     7    1.12      1.75     yes
//   11#->23#      12   4  10   3.2857   4.8571   5.0000    11    1.03      2.20     yes
//   13#->23#   13,14   3   8   2.3636   3.0909   3.6364     9    1.18      2.48     yes
//   13#->29#      15   4  10   2.5455   3.9091   4.5455    11    1.16      2.42     yes
//   13#->31#      16   5  17   2.8182   5.2727   6.6364    18    1.26      2.71     yes
//   17#->31#   17,18   4  13   1.9444   3.2222   4.2778    14    1.33      3.27     yes
//   ok    sandwich floor <= C2 <= msc <= K*+1 at all fourteen steps
//   ok    the maxsum certificate is <= 8 at all fourteen steps (C2 = 8 bridge closes per step there)
// sup of the maxsum certificate over the fourteen steps:  6.6364 at 13#->31# (s = 16)
// so on the enumerable range the maxsum bridge certifies C2 =  6.6364 and no lower; the K*-product bridge certifies 18
// floor-only rows, s = 19..23 (no walk; Ghat(2s) from the exact ladder):
//   s = 19  19#->37#  N = 4  floor  1.8800  C2  3.5200
//   s = 20  19#->37#  N = 4  floor  1.8800  C2  3.5200
//   s = 21  19#->41#  N = 5  floor  2.0000  C2  3.6400
//   s = 22  19#->43#  N = 6  floor  2.3200  C2  4.1200
//   s = 23  23#->43#  N = 5  floor  2.2647  C2  3.0294
//   ok    floor <= C2 at s = 19..23 as well (Lemma 1 consistent with the exact table at all s <= 23)
// ground scale: tile mean gap gbar = s#/D_s, and the run-and-ground product (K*+1)*gbar against the certificate:
// step         gbar    (K*+1)gbar   msc*Ghat   rho_run=msc*Ghat/((K*+1)gbar)   Ghat(s)/gbar
//   2#->3#     2.00    6.0         6         1.000                   1.00
//   3#->5#     6.00    12.0        12         1.000                   1.00
//   3#->7#     6.00    30.0        30         1.000                   1.00
//   5#->7#     10.00    30.0        30         1.000                   1.20
//   5#->11#    10.00    40.0        42         1.050                   1.20
//   7#->13#    14.00    56.0        78         1.393                   2.14
//   7#->17#    14.00    84.0       108         1.286                   2.14
//   7#->19#    14.00    126.0       150         1.190                   2.14
//   11#->19#   17.11    119.8       168         1.403                   2.45
//   11#->23#   17.11    188.2       210         1.116                   2.45
//   13#->23#   20.22    182.0       240         1.319                   3.26
//   13#->29#   20.22    222.4       300         1.349                   3.26
//   13#->31#   20.22    364.0       438         1.203                   3.26
//   17#->31#   22.92    320.9       462         1.440                   4.71
//
// === F. THE SUP STEP 13#->31# (s = 16), HOOD OPEN =====================
// STEP s=15  13# -> 29#   Q = {17,19,23,29}   C2 = 43/11 =  3.9091
//   argmax window [1205437109, 1205437367]  L = 258   bridged level-13 kills k = 10   strikes = 10   multi-killed = 0   K* = 10
//   killed copies: 1205437139(17) 1205437151(23) 1205437157(19) 1205437169(29) 1205437199(23) 1205437229(29) 1205437241(17) 1205437271(19) 1205437307(17) 1205437349(19)
//   spanned level-13 gaps: 30+12+6+12+30+30+12+30+36+42+18 = 258   max spanned 42 < G2(13#) = 66
//   contains a copy of the level-13 RECORD gap: NO   inherited share max/L =  0.1628   new damage =  0.8372
//   ground density: mean spanned gap  23.45 vs tile mean  20.22   rho =  1.160
//   the window realizes the longest run: YES (k = K*)
// STEP s=16  13# -> 31#   Q = {17,19,23,29,31}   C2 = 58/11 =  5.2727
//   argmax window [8813641451, 8813641799]  L = 348   bridged level-13 kills k = 14   strikes = 15   multi-killed = 1   K* = 17
//   killed copies: 8813641469(23) 8813641481(17) 8813641511(19) 8813641517(17&29) 8813641547(19) 8813641559(23) 8813641589(31) 8813641607(23) 8813641619(17) 8813641631(29) 8813641649(31) 8813641691(29) 8813641721(17) 8813641787(17)
//   spanned level-13 gaps: 18+12+30+6+30+12+30+18+12+12+18+42+30+66+12 = 348   max spanned 66 = G2(13#)
//   contains a copy of the level-13 RECORD gap: YES   inherited share max/L =  0.1897   new damage =  0.8103
//   ground density: mean spanned gap  23.20 vs tile mean  20.22   rho =  1.147
//   the window realizes the longest run: NO (k = 14 < K* = 17)
// STEP s=17,18  17# -> 31#   Q = {19,23,29,31}   C2 = 29/9 =  3.2222
//   argmax window [8813641451, 8813641799]  L = 348   bridged level-17 kills k = 9   strikes = 9   multi-killed = 0   K* = 13
//   killed copies: 8813641469(23) 8813641511(19) 8813641547(19) 8813641559(23) 8813641589(31) 8813641607(23) 8813641631(29) 8813641649(31) 8813641691(29)
//   spanned level-17 gaps: 18+42+36+12+30+18+24+18+42+108 = 348   max spanned 108 = G2(17#)
//   contains a copy of the level-17 RECORD gap: YES   inherited share max/L =  0.3103   new damage =  0.6897
//   ground density: mean spanned gap  34.80 vs tile mean  22.92   rho =  1.518
//   the window realizes the longest run: NO (k = 9 < K* = 13)
//
// === G. THE CHAIN TELESCOPED: beta(2^k) IS A CESARO MEAN OF log2 C2 ====
//   Ghat(2^{k+1}) = Ghat(2) * prod_{j<=k} C2(2^j), so beta(2^{k+1}) := ln Ghat(2^{k+1})/ln 2^{k+1}
//   = (log2 Ghat(2) + sum_{j=1..k} log2 C2(2^j)) / (k+1): the start is forgotten at rate 1/k.
//    k   s=2^k  Ghat   log2 C2(s)   beta(s)   running mean of log2 C2 so far
//    1      2      2    1.5850    1.0000        n/a
//    2      4      6    2.3219    1.2925      1.5850
//    3      8     30    1.1375    1.6356      1.9534
//    4     16     66    2.3985    1.5111      1.6815
//    5     32    348    1.6339    1.6886      1.8607
//    6     64   1080     n/a    1.6795      1.8154
//   ok    beta(64) == (log2 Ghat(2) + sum of log2 C2 over the five chain steps)/6, the Cesaro identity    1.6795 vs  1.6795
//   log2 8 = 3.0000: a uniform C2 = 8 caps limsup beta at 3, against the proven ceiling beta2 = 4.26645; log2 4 = 2 is the trap edge.
//
// === H. SUMMARY NUMBERS =============================================
// C2 table s = 2..41 reproduces doubling-01 digit for digit; sup 58/11 =  5.2727 at s = 16
// eleven steps reproduce doubling-01 (G2, argmax, nmax, D, k, K*, cert); three NEW steps walked:
//   13#->29# (s = 15): C2 =  3.9091  k = 10  K* = 10  N = 4  K*+1 = 11  msc =  4.5455  floor =  2.5455
//   13#->31# (s = 16): C2 =  5.2727  k = 14  K* = 17  N = 5  K*+1 = 18  msc =  6.6364  floor =  2.8182
//   17#->31# (s = 17,18): C2 =  3.2222  k = 9  K* = 13  N = 4  K*+1 = 14  msc =  4.2778  floor =  1.9444
// K*+1 over the fourteen steps : 3 2 5 3 4 4 6 9 7 11 9 11 18 14
// msc  over the fourteen steps : 3.00 2.00 5.00 2.50 3.50 2.60 3.60 5.00 4.00 5.00 3.64 4.55 6.64 4.28
// C2   over the fourteen steps : 3.00 2.00 5.00 2.50 3.50 2.20 3.60 5.00 3.57 4.86 3.09 3.91 5.27 3.22
// K*-product certificate: exits C2 = 8 on the chain at s = 64 (N = 13), exits the legal band at s = 128 (N = 23)  [PROVEN via Lemma 1, CITED]
// maxsum certificate: <= 8 at all fourteen steps, sup  6.6364; no a-priori bound on it is proven for any s past 18
//
// self-test failures: 0   (all checks passed)
// total 44.8 s
// ============================================================================
// READINGS
//
// 1. CUSTODY HOLDS. The C2 table s = 2..41 rebuilt here matches the table
//    bound inside attack-doubling-01.js digit for digit on all 40 rows and
//    8 fields; the eleven enumerable doubling steps re-derive G2, least
//    argmax, nmax, census, k, K* and the certificate K*+1 exactly as that
//    file's F-table and walk rows carry them; every C2(s) on the range is
//    <= 8 and >= 2, sup 58/11 = 5.2727 at s = 16. [VERIFIED]
//
// 2. THREE NEW STEPS. 13#->29# (s = 15), 13#->31# (s = 16) and 17#->31#
//    (s = 17, 18) are walked for the first time; G2(29#) = 258 @ 1205437109
//    (x2) and G2(31#) = 348 @ 8813641451 (x4) come out of the walks and
//    match the exact ladder, the latter by two independent base tiles.
//    At the chain's sup step s = 16: k = 14, K* = 17, N = 5. [VERIFIED]
//
// 3. THE K*-PRODUCT CERTIFICATE IS ALREADY ABOVE 8 ON THE CHAIN. K*+1 = 18
//    at s = 16, against the target 8, while the true ratio there is 5.2727;
//    the certificate is still inside the legal band (18 < 19.2455), and
//    only just. By the cited run floor K* >= pi(2s) - pi(s) it must exceed 8
//    at every integer s >= 34 and at every chain s >= 64 (N = 13 there),
//    and it must leave the legal band at s = 96 (chain: s = 128, N = 23).
//    The C2 = 8 bridge through K* is closed on the chain by exact data at
//    s = 16 and by proof from s = 64 on. [VERIFIED the data; PROVEN via the
//    cited lemma]
//
// 4. THE MAXSUM CERTIFICATE msc = maxsum_{K*+1}(T_s)/Ghat(s) SITS BETWEEN.
//    floor <= C2 <= msc <= K*+1 at all fourteen steps; msc is <= 8 at every
//    one, sup 6.6364 at s = 16, and its slack over the truth runs 1.00 to
//    1.33 where the K*-product's runs 1.00 to 3.27. On the enumerable range
//    the maxsum bridge certifies C2 = 6.6364, the K*-product bridge 18.
//    The ground factor rho_run = msc*Ghat/((K*+1)gbar) runs 1.000 to 1.440:
//    the certificate is the run length times the tile mean gap times a
//    factor under 1.5. [VERIFIED; the sandwich is a per-step theorem]
//
// 5. THE FLOOR IS LOOSE. Lemma 1's run placed on the thickest ground gives
//    floor 1.9444 to 3.2857 against C2 of 2.0000 to 5.2727: at s = 16 the
//    true window carries 14 kills from 5 entering primes (15 strikes, one
//    slot struck twice), so the primes kill 2.8 slots each, not one. The
//    CRT construction with one kill per prime explains the ratio in full only
//    at the first steps and under half of it at s = 16, and nothing here
//    improves it. [MEASURED]
//
// 6. THE SUP WINDOW DOES NOT REALIZE THE LONGEST RUN (k = 14 < K* = 17 at
//    s = 16; k = 9 < K* = 13 at s = 17), and at s = 15 the record contains no
//    copy of the level-13 record gap (max spanned 42 < 66). Mean spanned
//    gap runs rho = 1.147 to 1.518 times the tile mean. [VERIFIED]
//
// 7. THE CHAIN TELESCOPED IS A CESARO MEAN: beta(64) = 1.6795 equals
//    (log2 Ghat(2) + the five chain values of log2 C2)/6 exactly. A uniform
//    C2 = 8 caps limsup beta at log2 8 = 3.0000; the start is forgotten at
//    rate 1/k, so the per-step inequality at every large s is the whole
//    content and no early rung contributes. [VERIFIED the identity]
//
// 8. WHAT IS NOT HERE. No bound on K*(s), on maxsum_{K*+1}(T_s), or on
//    C2(s) for any s past 18 is proven or measured by this file. Fourteen
//    steps at P(2s) <= 31 cannot see an all-s statement. [INFERRED]
