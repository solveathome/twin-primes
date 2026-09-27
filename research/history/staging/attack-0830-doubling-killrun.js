// attack-0830-doubling-killrun.js  --  TODO D: the weighted kill-run, exactly,
// and whether the per-fold L bounds of one doubling step compose to it
//
// THE QUESTION. Yesterday's note (attack-0829n-doubling-bridge.md) left the
// doubling bridge at C2 = 8 resting on one open inequality: the longest run of
// consecutive level-s twin slots the primes in (s, 2s] can kill, weighted by
// the ground it stands on, must stay within 8 records of level s, for all s.
// Item D's first move: bound that weighted run WITHOUT passing through K*,
// by composing the exact per-fold L (prop-exact-fold-L.md: L is the longest
// alternation-legal window of the old gap word) fold by fold across the
// pi(2s) - pi(s) entering primes. This file (1) defines the weighted run in
// yesterday's notation and computes it exactly at the fourteen enumerable
// steps beside its allowance 8 Ghat(s)/gbar(s); (2) computes the exact
// per-fold L_j along the prime-order fold chain of every step, on the
// intermediate tiles, and the composed bound; (3) tests which composition
// rule (product, sum, max) is a theorem, on the run itself and on the
// window that realises the longest run.
//
// NOTATION (attack-0829n-doubling-bridge.md section 3). T_s the level-s tile
// (slot residues mod P(s)#), D_s its census, gbar(s) = P(s)#/D_s its mean gap,
// Ghat(s) = G2(P(s)#), maxsum_m(T_s) the largest sum of m cyclically
// consecutive gaps, Q = primes in (s, 2s] (N = |Q|), K*(s) the longest run of
// consecutive level-s slots all killed by Q. Fold chain in prime order:
// T^(0) = T_s, T^(j) = T^(j-1) folded by q_j, T^(N) = T_{2s};
// L_j = L(T^(j-1), q_j) the longest run of consecutive T^(j-1) slots killed
// by q_j, scanned on the big tile of period P(s)# q_1...q_j.
//
// WHAT IT COMPUTES, section by section:
//  A. custody: ladders parsed from their keepers; the C2 table s = 2..41
//     rebuilt against the table bound in attack-doubling-01.js's OUTPUT
//     block; yesterday's fourteen-row sandwich table and walk rows parsed
//     from attack-0829n-doubling-bridge.js's OUTPUT block, to be reproduced
//     digit for digit by a fresh engine before any new number;
//  B. tiles to 23# by fold recursion, checked against the ladder; maxsum;
//  C. the fold-chain engine: at each of the fourteen steps, one streaming
//     pass per entering prime in prime order gives L_1..L_N exactly, and the
//     last pass gives G2(2s), least argmax, multiplicity, census, k, K* and
//     the location of the longest run; every figure compared with
//     yesterday's rows; the eight diagonal cells L(T_x, next prime) of
//     a3-05-bound-L.md section 4 fall out of the chains and are compared;
//  D. order control: the chain in reverse prime order, and the direct
//     single-fold L(T_s, q) for each q;
//  E. the nesting chain along the longest run: m_0 = K*, m_j = run slots
//     surviving q_1..q_j; the product theorem's inequality checked link by
//     link, which is where the product loses to the truth;
//  F. deliverable (a): the weighted kill-run w(s) = maxsum_{K*+1}(T_s)/gbar(s)
//     and the truth w_true(s) = Ghat(2s)/gbar(s) beside the allowance
//     a(s) = 8 Ghat(s)/gbar(s);
//  G. deliverable (b): the composed bound maxsum_{prod(1+L_j)}(T_s) against
//     the allowance and the truth; the sum and max forms as data;
//  H. the all-s arithmetic: the composed index is at least 2^N, so the
//     composed bound is at least 2^N gbar(s); against 8 Ghat(s) on the chain;
//  I. summary numbers and the self-test count.
//
// HONEST DOUBT. Fourteen steps at P(2s) <= 31 cannot see an all-s
// statement. What they can do is show an exact composed bound beside the
// exact truth, and they do.
//
// ARITHMETIC NOTE (width rule). Positions inside the 31# period reach
// 200,560,490,130 < 2^53 (Number); global slot indices reach 1485 * 6,678,671
// < 2^34 (Number); tile positions to 23# = 223,092,870 in Int32Array under a
// guard. Bitmasks are Uint32Array words; bit tests use 32-bit operators on
// word values only, with Math.clz32 for the index. Timing goes to stderr.
//
// usage: node research/history/staging/attack-0830-doubling-killrun.js

'use strict';

const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const RES = path.resolve(__dirname, '..', '..');            // research/
const WID = require(path.join(RES, 'qc', 'widths.js'));
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '  n/a');
const pad = (s, n) => String(s).padStart(n);
const tlog = (m) => process.stderr.write('[t ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s] ' + m + '\n');
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
const srcY = fs.readFileSync(path.join(RES, 'history', 'staging', 'attack-0829n-doubling-bridge.js'), 'utf8');

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

console.log('=== A. CUSTODY: LADDERS, THE C2 TABLE, AND YESTERDAY\'S ROWS PARSED ====');
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
const ROWS = [];
for (let s = 2; s <= 41; s++) {
  const gs = L.at(s), g2s = L.at(2 * s), g = gcd(g2s, gs);
  ROWS.push({ s, ps: L.pAt(s), p2s: L.pAt(2 * s), gs, g2s, exact: g2s / g + '/' + gs / g, c2: g2s / gs, c2s: F(g2s / gs).trim(), grade: 2 * s <= 46 ? 'CUST' : 'trust' });
}
const D01 = new Map();
{
  const body = srcD01.slice(srcD01.indexOf('// OUTPUT')).split('\n');
  for (const ln of body) {
    const m = /^\/\/\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+\/\d+)\s+([\d.]+)\s+(CUST|trust)/.exec(ln);
    if (m) D01.set(+m[1], { ps: +m[2], p2s: +m[3], gs: +m[4], g2s: +m[5], exact: m[6], c2s: m[7], grade: m[8] });
  }
}
check('doubling-01 OUTPUT block parsed: 40 C2 rows', D01.size === 40, String(D01.size));
{
  let same = 0; const diff = [];
  for (const r of ROWS) {
    const o = D01.get(r.s);
    const eq = o && o.ps === r.ps && o.p2s === r.p2s && o.gs === r.gs && o.g2s === r.g2s && o.exact === r.exact && o.c2s === r.c2s && o.grade === r.grade;
    if (eq) same++; else diff.push(r.s);
  }
  check('C2 table reproduces doubling-01 DIGIT FOR DIGIT on all 40 rows (8 fields each)', same === 40, same + ' of 40' + (diff.length ? ', differing at s = ' + diff.join(',') : ''));
}
const sup = ROWS.reduce((a, b) => (b.c2 > a.c2 ? b : a));
console.log('sup C2 over s = 2..41: ' + sup.exact + ' = ' + F(sup.c2) + ' at s = ' + sup.s + ';  chain rows s = 2,4,8,16,32: ' +
  [2, 4, 8, 16, 32].map((s) => ROWS.find((r) => r.s === s).c2s).join(' '));
check('sup 5.2727 at s = 16, every C2(s) <= 8 on s = 2..41', sup.s === 16 && sup.c2s === '5.2727' && ROWS.every((r) => r.c2 <= 8));
// yesterday's OUTPUT block: the fourteen sandwich rows (section E) and the walk rows (section C)
const Y = { E: new Map(), C: new Map() };
{
  const body = srcY.slice(srcY.indexOf('// OUTPUT')).split('\n');
  for (const ln of body) {
    let m;
    if ((m = /^\/\/\s+(\d+)#->(\d+)#\s+([\d,]+)\s+(\d+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+(yes|NO)/.exec(ln)))
      Y.E.set(m[1] + '>' + m[2], { sList: m[3], N: +m[4], Kstar: +m[5], floor: m[6], c2: m[7], msc: m[8], cert: +m[9] });
    if ((m = /^\/\/\s+(\d+)#->(\d+)#\s+([\d,]+)\s+(\d+) @\s+(\d+) \(x(\d+)\)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+[\d.]+ s/.exec(ln)))
      Y.C.set(m[1] + '>' + m[2], { g: +m[4], a: +m[5], nmax: +m[6], alive: +m[7], k: +m[8], Kstar: +m[9], N: +m[10] });
  }
}
check('yesterday\'s OUTPUT block parsed: 14 sandwich rows and 14 walk rows', Y.E.size === 14 && Y.C.size === 14, Y.E.size + ' / ' + Y.C.size);
{
  const ymsc = [...Y.E.values()].map((r) => r.msc);
  console.log('yesterday\'s fourteen maxsum-certificate values, as parsed: ' + ymsc.join(' '));
}

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
  let g = 0, least = -1, nmax = 0;
  for (let i = 0; i < D; i++) {
    const nxt = i + 1 < D ? t[i + 1] : t[0] + W;
    const d = nxt - t[i];
    if (d > g) { g = d; least = t[i]; nmax = 1; } else if (d === g) nmax++;
  }
  return { g, least, nmax };
}
// maxsum_m(T_p): the largest sum of m cyclically consecutive gaps; for m >= D the
// window wraps floor(m/D) full periods (a3-05-bound-L.md section 5; foldL-02 section 1's convention)
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
const gbarOf = (p) => WIDTH[p] / TILE[p].length;
const GAPS = { 2: { g: 2, least: 1, nmax: 1 } };
for (const p of [3, 5, 7, 11, 13, 17, 19, 23]) {
  GAPS[p] = tileGaps(p);
  const row = ladderRow(p);
  check('T_' + p + ': D = ' + TILE[p].length + ', G2 = ' + GAPS[p].g + ' @ ' + GAPS[p].least + ' (x' + GAPS[p].nmax + ') == ladder',
    TILE[p].length === Dexp(p) && GAPS[p].g === row.g && GAPS[p].least === row.pos && GAPS[p].nmax === row.nmax);
}
check('maxsum_1(T_p) == G2(p#) for p = 3..23', [3, 5, 7, 11, 13, 17, 19, 23].every((p) => maxsum(p, 1) === GAPS[p].g));
check('maxsum_m(T_p) >= m * gbar(p) for p = 5..23, m = 1..200 (the averaging floor, PROVEN; used in section H)',
  [5, 7, 11, 13, 17, 19, 23].every((p) => { for (let m = 1; m <= 200; m++) if (maxsum(p, m) < m * gbarOf(p) - 1e-9) return false; return true; }));

// ------------------------------------------------------- C. the fold-chain engine
console.log('');
console.log('=== C. THE FOLD CHAIN IN PRIME ORDER: PER-FOLD L EXACT, AND THE STEP REPRODUCED ==');
// alive-mask rows: for entering prime q and copy residue r = k mod q, the word
// row of level-P slots NOT killed by q in copy k (bit i set = alive).
function aliveTables(slots, W, Q, nW) {
  const tabs = [];
  for (const q of Q) {
    const tab = new Uint32Array(q * nW);
    for (let r = 0; r < q; r++) {
      const baseRes = (r * (W % q)) % q, off = r * nW;
      for (let i = 0; i < slots.length; i++) {
        let v = baseRes + (slots[i] % q); if (v >= q) v -= q;
        if (v !== 0 && v !== q - 2) tab[off + (i >>> 5)] |= (1 << (i & 31));
      }
    }
    tabs.push(tab);
  }
  return tabs;
}
// One pass per fold j (0-based): copies = q_0 ... q_j of T_P; alivePrev = slots
// alive under q_0..q_{j-1}; L_j = longest run of alivePrev slots killed by q_j,
// cyclic on the big tile. On the last pass also the level-Pp data (G2, argmax,
// nmax, census, k, K*, and where the longest run sits).
function foldChain(P, Q, wantFinal) {
  const slots = TILE[P], W = WIDTH[P], D = slots.length, nW = Math.ceil(D / 32);
  const tabs = aliveTables(slots, W, Q, nW);
  const full = new Uint32Array(nW);
  for (let i = 0; i < D; i++) full[i >>> 5] |= (1 << (i & 31));
  const Ls = [];
  let fin = null;
  for (let j = 0; j < Q.length; j++) {
    const copies = Q.slice(0, j + 1).reduce((a, q) => a * q, 1);
    const WPp = W * copies;
    WID.assertFits('walk position range W*copies', WPp, Float64Array, P + '# fold ' + Q[j]);
    WID.assertFits('global slot index D*copies', D * copies, Float64Array, P + '# fold ' + Q[j]);
    const last = j === Q.length - 1;
    const res = new Int32Array(j + 1);
    let run = 0, lead = -1, maxRun = 0;
    let g = 0, a = -1, nmax = 0, kAt = -1, Kstar = -1, KstarAt = -1, alive = 0;
    let prevGi = -1, prevPos = -1, firstGi = -1, firstPos = -1;
    for (let k = 0; k < copies; k++) {
      const kD = k * D, kW = k * W;
      for (let wi = 0; wi < nW; wi++) {
        let prev = full[wi];
        for (let t = 0; t < j; t++) prev = prev & tabs[t][res[t] * nW + wi];
        const rowj = tabs[j][res[j] * nW + wi];
        const killed = prev & ~rowj;
        let w = prev | 0;
        while (w !== 0) {
          const lsb = w & -w;
          const b = 31 - Math.clz32(lsb);
          w = w ^ lsb;
          if ((killed & lsb) !== 0) { run++; continue; }
          // a survivor of q_j among the alivePrev slots
          if (lead < 0) lead = run; else if (run > maxRun) maxRun = run;
          run = 0;
          if (last) {
            const idx = wi * 32 + b, gi = kD + idx, pos = kW + slots[idx];
            alive++;
            if (prevGi < 0) { firstGi = gi; firstPos = pos; }
            else {
              const d = pos - prevPos, dead = gi - prevGi - 1;
              if (d > g) { g = d; a = prevPos; nmax = 1; kAt = dead; } else if (d === g) nmax++;
              if (dead > Kstar) { Kstar = dead; KstarAt = prevGi; }
            }
            prevGi = gi; prevPos = pos;
          }
        }
      }
      for (let t = 0; t <= j; t++) { res[t]++; if (res[t] === Q[t]) res[t] = 0; }
    }
    if (lead < 0) throw new Error('fold by ' + Q[j] + ' left no survivor');
    const Lj = Math.max(maxRun, lead + run);
    Ls.push(Lj);
    if (last) {
      const d = firstPos + WPp - prevPos, dead = firstGi + D * copies - prevGi - 1;
      if (d > g) { g = d; a = prevPos; nmax = 1; kAt = dead; } else if (d === g) nmax++;
      if (dead > Kstar) { Kstar = dead; KstarAt = prevGi; }
      fin = { g, a, nmax, alive, k: kAt, Kstar, KstarAt, WPp, total: D * copies };
    }
    tlog(P + '# fold ' + Q[j] + ' (' + copies + ' copies): L = ' + Lj);
  }
  return { Ls, fin };
}
// positions and killers of the level-P slots with global indices lo..hi (mod total)
function runSlots(P, Q, fin, lo, len) {
  const slots = TILE[P], W = WIDTH[P], D = slots.length, out = [];
  for (let t = 0; t < len; t++) {
    const G = (lo + t) % fin.total, pos = Math.floor(G / D) * W + slots[G % D];
    out.push({ pos, killers: Q.filter((q) => pos % q === 0 || pos % q === q - 2) });
  }
  return out;
}
const STEPS = [
  { P: 2, Pp: 3, s: [2] }, { P: 3, Pp: 5, s: [3] }, { P: 3, Pp: 7, s: [4] }, { P: 5, Pp: 7, s: [5] },
  { P: 5, Pp: 11, s: [6] }, { P: 7, Pp: 13, s: [7, 8] }, { P: 7, Pp: 17, s: [9] }, { P: 7, Pp: 19, s: [10] },
  { P: 11, Pp: 19, s: [11] }, { P: 11, Pp: 23, s: [12] }, { P: 13, Pp: 23, s: [13, 14] },
  { P: 13, Pp: 29, s: [15] }, { P: 13, Pp: 31, s: [16] }, { P: 17, Pp: 31, s: [17, 18] },
];
const WALK = [];
console.log('step         s      Q                  L_1..L_N (prime order)   prod(1+L)  1+sum L  1+max L   K*+1   N');
for (const st of STEPS) {
  const Q = PR.filter((q) => q > st.P && q <= st.Pp);
  const { Ls, fin } = foldChain(st.P, Q, true);
  const w = Object.assign({ P: st.P, Pp: st.Pp, Q, sList: st.s, Ls, N: Q.length, G2P: GAPS[st.P].g, gbar: gbarOf(st.P) }, fin);
  w.prod = Ls.reduce((a, l) => a * (1 + l), 1);
  w.sum1 = 1 + Ls.reduce((a, l) => a + l, 0);
  w.max1 = 1 + Math.max(...Ls);
  w.c2 = w.g / w.G2P;
  WALK.push(w);
  console.log('  ' + (st.P + '#->' + st.Pp + '#').padEnd(10) + pad(st.s.join(','), 6) + '   ' + ('{' + Q.join(',') + '}').padEnd(18) + '  ' + Ls.join(' ').padEnd(22) +
    pad(w.prod, 8) + pad(w.sum1, 9) + pad(w.max1, 9) + pad(w.Kstar + 1, 7) + pad(w.N, 4));
  const row = ladderRow(st.Pp), yc = Y.C.get(st.P + '>' + st.Pp);
  check('walk ' + st.P + '#->' + st.Pp + '#: G2 = ' + w.g + ' @ ' + w.a + ' (x' + w.nmax + '), D = ' + w.alive + ' == ladder row x = ' + st.Pp,
    w.g === row.g && w.a === row.pos && w.nmax === row.nmax && w.alive === Dexp(st.Pp));
  check('  == yesterday\'s walk row: G2 ' + yc.g + ' @ ' + yc.a + ' (x' + yc.nmax + '), D ' + yc.alive + ', k ' + yc.k + ', K* ' + yc.Kstar + ', N ' + yc.N,
    yc.g === w.g && yc.a === w.a && yc.nmax === w.nmax && yc.alive === w.alive && yc.k === w.k && yc.Kstar === w.Kstar && yc.N === w.N);
}
check('K* + 1 <= prod(1+L_j) at all fourteen steps (the product composition, PROVEN in the note; here its instance)', WALK.every((w) => w.Kstar + 1 <= w.prod));
check('K* >= max_j L_j at all fourteen steps (a run of L_j consecutive T^(j-1) slots is a killed level-s run)', WALK.every((w) => w.Kstar >= w.max1 - 1));
check('K* >= N at all fourteen steps (Lemma 1, hsubpow-explicit-K.md section 2b, CITED)', WALK.every((w) => w.Kstar >= w.N));
{
  const viol = WALK.filter((w) => w.Kstar + 1 > w.sum1).map((w) => 's=' + w.sList[0] + ' (K*+1 = ' + (w.Kstar + 1) + ' > 1+sum L = ' + w.sum1 + ')');
  console.log('the SUM form K*+1 <= 1 + sum_j L_j is NOT a theorem; on the fourteen steps it is violated at: ' + (viol.length ? viol.join('; ') : 'none'));
}
// the eight diagonal cells L(T_x, next prime), a3-05-bound-L.md section 4 (CITED):
// fold 7:2, 11:1, 13:2, 17:2, 19:2, 23:3, 29:2, 31:4. In prime order T^(j-1) is the
// diagonal tile, so each cell is some step's L_j.
{
  const DIAG = { 7: 2, 11: 1, 13: 2, 17: 2, 19: 2, 23: 3, 29: 2, 31: 4 };
  const got = {};
  for (const w of WALK) for (let j = 0; j < w.Q.length; j++) { const q = w.Q[j]; if (!(q in got)) got[q] = w.Ls[j]; else if (got[q] !== w.Ls[j]) got[q] = 'MIXED'; }
  const cells = Object.keys(DIAG).map((q) => q + ':' + got[q]).join(' ');
  check('the eight diagonal cells L(T_x, p) reproduce a3-05 section 4 (7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4), consistently across steps', Object.keys(DIAG).every((q) => got[q] === DIAG[q]), cells);
}

// ------------------------------------------------------- D. order control and direct folds
console.log('');
console.log('=== D. ORDER CONTROL (REVERSE PRIME ORDER) AND THE DIRECT SINGLE-FOLD L(T_s, q) ==');
console.log('step         s      reverse-order L        prod(1+L) rev   prod fwd     direct L(T_s,q) per q     max direct   K*');
for (const w of WALK) {
  const rev = foldChain(w.P, w.Q.slice().reverse(), true);
  w.LsRev = rev.Ls; w.prodRev = rev.Ls.reduce((a, l) => a * (1 + l), 1);
  w.direct = w.Q.map((q) => foldChain(w.P, [q], false).Ls[0]);
  w.maxDirect = Math.max(...w.direct);
  console.log('  ' + (w.P + '#->' + w.Pp + '#').padEnd(10) + pad(w.sList.join(','), 6) + '   ' + w.LsRev.join(' ').padEnd(20) + pad(w.prodRev, 10) + pad(w.prod, 12) + '     ' +
    w.direct.join(' ').padEnd(22) + pad(w.maxDirect, 8) + pad(w.Kstar, 6));
  check('  reverse order re-derives the same level-' + w.Pp + ' data (G2, K*, census) and K*+1 <= prod(1+L) in that order too',
    rev.fin.g === w.g && rev.fin.Kstar === w.Kstar && rev.fin.alive === w.alive && w.Kstar + 1 <= w.prodRev);
}
check('direct L(T_s, q) == first-fold L_1 when q = q_1, at all fourteen steps', WALK.every((w) => w.direct[0] === w.Ls[0]));
check('K* >= max_q L(T_s, q) at all fourteen steps', WALK.every((w) => w.Kstar >= w.maxDirect));

// ------------------------------------------------------- E. the nesting chain along the longest run
console.log('');
console.log('=== E. THE NESTING CHAIN ALONG THE LONGEST RUN: m_0 = K*, m_j = run slots surviving q_1..q_j ==');
console.log('  the product theorem\'s link: m_{j-1} + 1 <= (m_j + 1)(1 + L_j); equality would be needed at every link for the product to be tight');
console.log('step         s      m_0..m_N (prime order)     links (m_{j-1}+1)/((m_j+1)(1+L_j))         K*+1   prod   prod/(K*+1)');
for (const w of WALK) {
  const run = runSlots(w.P, w.Q, w, w.KstarAt + 1, w.Kstar);
  const ms = [w.Kstar];
  for (let j = 0; j < w.Q.length; j++) {
    const Qj = w.Q.slice(0, j + 1);
    ms.push(run.filter((z) => !z.killers.some((q) => Qj.includes(q))).length);
  }
  w.ms = ms;
  const links = []; let ok = true;
  for (let j = 1; j <= w.Q.length; j++) { const lhs = ms[j - 1] + 1, rhs = (ms[j] + 1) * (1 + w.Ls[j - 1]); links.push(F(lhs / rhs, 2).trim()); ok = ok && lhs <= rhs; }
  w.nestOK = ok && ms[w.Q.length] === 0 && run.every((z) => z.killers.length > 0);
  console.log('  ' + (w.P + '#->' + w.Pp + '#').padEnd(10) + pad(w.sList.join(','), 6) + '   ' + ms.join(' ').padEnd(24) + '   ' + links.join(' ').padEnd(40) +
    pad(w.Kstar + 1, 5) + pad(w.prod, 7) + '   ' + F(w.prod / (w.Kstar + 1), 2));
}
check('every link holds, m_N = 0, and every slot of the longest run is killed by an entering prime, at all fourteen steps', WALK.every((w) => w.nestOK));

// ------------------------------------------------------- F. deliverable (a): the weighted kill-run
console.log('');
console.log('=== F. THE WEIGHTED KILL-RUN, EXACT, BESIDE ITS ALLOWANCE (deliverable a) ==');
console.log('  w_true = Ghat(2s)/gbar(s)  [the object: the longest killed run\'s span in mean-gap units, exact]');
console.log('  w      = maxsum_{K*+1}(T_s)/gbar(s) = (K*+1) rho(s,K*+1)  [yesterday\'s certificate in the same units]');
console.log('  a      = 8 Ghat(s)/gbar(s)  [the allowance; (M8) is w <= a, (D8) at this step is w_true <= a]');
console.log('step         s     gbar    w_true       w         a      w_true/a    w/a     msc=w/(Ghat/gbar)  yesterday');
let allA = true;
for (const w of WALK) {
  const gb = w.gbar, wt = w.g / gb, ww = maxsum(w.P, w.Kstar + 1) / gb, aa = 8 * w.G2P / gb;
  w.wt = wt; w.ww = ww; w.aa = aa; w.msc = maxsum(w.P, w.Kstar + 1) / w.G2P; w.floor = maxsum(w.P, w.N + 1) / w.G2P;
  const y = Y.E.get(w.P + '>' + w.Pp);
  allA = allA && wt <= ww + 1e-9 && ww <= aa + 1e-9;
  console.log('  ' + (w.P + '#->' + w.Pp + '#').padEnd(10) + pad(w.sList.join(','), 6) + '  ' + F(gb, 2) + '  ' + F(wt, 2) + '  ' + F(ww, 2) + '  ' + F(aa, 2) + '   ' + F(wt / aa, 3) + '   ' + F(ww / aa, 3) + '      ' + F(w.msc) + '        ' + y.msc);
  check('  == yesterday\'s row: K* ' + y.Kstar + ', N ' + y.N + ', floor ' + y.floor + ', C2 ' + y.c2 + ', msc ' + y.msc + ', K*+1 ' + y.cert,
    y.Kstar === w.Kstar && y.N === w.N && F(w.floor).trim() === y.floor && F(w.c2).trim() === y.c2 && F(w.msc).trim() === y.msc && y.cert === w.Kstar + 1);
}
check('w_true <= w <= a at all fourteen steps (the sandwich in mean-gap units; (M8) holds on the range)', allA);
{
  const supw = WALK.reduce((x, y) => (y.ww / y.aa > x.ww / x.aa ? y : x));
  console.log('sup of w/a over the fourteen steps: ' + F(supw.ww / supw.aa, 4) + ' at s = ' + supw.sList.join(',') + ' (= msc/8 = ' + F(supw.msc / 8, 4) + ')');
}

// ------------------------------------------------------- G. deliverable (b): the composed bound
console.log('');
console.log('=== G. THE PER-FOLD COMPOSITION AGAINST THE TRUTH AND THE ALLOWANCE (deliverable b) ==');
console.log('  composed (product, PROVEN): Ghat(2s) <= maxsum_{M}(T_s), M = prod_j (1+L_j);  w_prod = maxsum_M(T_s)/gbar(s)');
console.log('  pure product certificate: Ghat(2s) <= prod_j (1+L_j) Ghat(s)  [coarser, the fold-by-fold product of per-fold product certificates]');
console.log('  sum form (NOT a theorem, data only): maxsum_{1+sum L_j}(T_s)/gbar;  max form (a FLOOR on K*+1, not a certificate): maxsum_{1+max L_j}/gbar');
console.log('step         s      M=prod   w_prod       a       w_prod/a   w_prod/w    prod    prod/8   w_sum   w_sum>=w_true   w_max');
let allDom = true, firstOver = null;
for (const w of WALK) {
  const gb = w.gbar;
  w.wprod = maxsum(w.P, w.prod) / gb; w.wsum = maxsum(w.P, w.sum1) / gb; w.wmax = maxsum(w.P, w.max1) / gb;
  allDom = allDom && w.wprod >= w.ww - 1e-9;
  if (firstOver === null && w.wprod > w.aa) firstOver = w;
  console.log('  ' + (w.P + '#->' + w.Pp + '#').padEnd(10) + pad(w.sList.join(','), 6) + pad(w.prod, 9) + '  ' + F(w.wprod, 2) + '  ' + F(w.aa, 2) + '   ' + F(w.wprod / w.aa, 3) + '   ' + F(w.wprod / w.ww, 3) +
    pad(w.prod, 8) + '  ' + F(w.prod / 8, 2) + '  ' + F(w.wsum, 2) + '     ' + (w.wsum >= w.wt - 1e-9 ? 'yes' : 'NO ') + '       ' + F(w.wmax, 2));
}
check('the composed bound dominates yesterday\'s certificate at every step (K*+1 <= M and maxsum monotone): it can never be tighter', allDom);
{
  const over = WALK.filter((w) => w.wprod > w.aa);
  console.log('composed bound above the allowance (w_prod > a, i.e. maxsum_M(T_s) > 8 Ghat(s)) at ' + over.length + ' of 14 steps; first at s = ' + (firstOver ? firstOver.sList.join(',') : 'none') +
    '; under it at s = ' + WALK.filter((w) => w.wprod <= w.aa).map((x) => x.sList.join(',')).join(' '));
  const big = WALK[WALK.length - 1], s16 = WALK[12];
  console.log('at the largest enumerable s (s = 17,18): w_prod/a = ' + F(big.wprod / big.aa, 2) + ', w_prod/w_true = ' + F(big.wprod / big.wt, 2) + ', M = ' + big.prod + ' against K*+1 = ' + (big.Kstar + 1));
  console.log('at the sup step (s = 16): w_prod/a = ' + F(s16.wprod / s16.aa, 2) + ', w_prod/w_true = ' + F(s16.wprod / s16.wt, 2) + ', M = ' + s16.prod + ' against K*+1 = ' + (s16.Kstar + 1));
  console.log('the sum form sits above the truth at ' + WALK.filter((w) => w.wsum >= w.wt - 1e-9).length + ' of 14 steps and below it at s = ' +
    (WALK.filter((w) => w.wsum < w.wt - 1e-9).map((x) => x.sList.join(',')).join(' ') || 'none') + ' (so it is false as a certificate, not merely unproven)');
}

// ------------------------------------------------------- H. the all-s arithmetic
console.log('');
console.log('=== H. THE ALL-s ARITHMETIC: M >= 2^N, SO THE COMPOSED BOUND IS >= 2^N gbar(s) ==');
console.log('  L_j >= 1 at every fold (each fold kills a slot: the tile meets every class mod q_j), so M = prod(1+L_j) >= 2^N;');
console.log('  maxsum_M(T_s) >= M gbar(s) (averaging), so the composed certificate is >= 2^N gbar(s) and closure at 8 needs 2^N gbar(s) <= 8 Ghat(s).');
const SIEVE_TO = 4000;
const isP = new Uint8Array(SIEVE_TO + 1).fill(1); isP[0] = 0; isP[1] = 0;
for (let i = 2; i * i <= SIEVE_TO; i++) if (isP[i]) for (let j = i * i; j <= SIEVE_TO; j += i) isP[j] = 0;
const PI = new Int32Array(SIEVE_TO + 1);
for (let i = 1; i <= SIEVE_TO; i++) PI[i] = PI[i - 1] + isP[i];
const Ncount = (s) => PI[2 * s] - PI[s];
const gbarAt = (s) => { let v = 2; for (let p = 3; p <= s; p++) if (isP[p]) v *= p / (p - 2); return v; };   // P(s)#/D_s exactly, as a double
check('gbar(s) by the Mertens-type product equals P(s)#/D_s from the tiles at s = 5..23', [5, 7, 11, 13, 17, 19, 23].every((p) => Math.abs(gbarAt(p) - gbarOf(p)) < 1e-9));
check('N(s) at the fourteen steps equals the entering-prime count of each walk', WALK.every((w) => Ncount(w.sList[0]) === w.N));
console.log('   s     N    2^N gbar(s)     8 Ghat(s)     floor/(8 Ghat)    log2 Ghat needed     log2 s^beta2 (beta2 = 4.26645, CITED ceiling, asymptotic)');
for (const s of [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]) {
  const N = Ncount(s), gb = gbarAt(s), fl = Math.pow(2, N) * gb, gh = L.at(s);
  const known = gh !== null && s <= 79;
  console.log('  ' + pad(s, 4) + pad(N, 6) + '   ' + pad(fl.toExponential(3), 12) + '    ' + (known ? pad(8 * gh, 10) : pad('unknown', 10)) + '     ' +
    (known ? F(fl / (8 * gh), 3) : '     n/a') + '          ' + F(Math.log2(fl / 8), 2) + '               ' + F(4.26645 * Math.log2(s), 2));
}
{
  const chainOver = [2, 4, 8, 16, 32, 64].filter((s) => Math.pow(2, Ncount(s)) * gbarAt(s) > 8 * L.at(s));
  console.log('on the chain rungs with a known Ghat(s), the 2^N gbar floor alone already exceeds 8 Ghat(s) at s = ' + chainOver.join(', ') + ' (no walk needed there)');
  check('the composed bound is provably above the allowance at the chain rungs s = 32 and s = 64 from the floor alone', chainOver.includes(32) && chainOver.includes(64));
  let cross = -1;
  for (let s = 2; s <= 2000; s++) if (Ncount(s) > 4.26645 * Math.log2(s) + 3) { cross = s; break; }
  console.log('N(s) > 3 + beta2 log2 s (so 2^N > 8 s^beta2, the floor beats even the asymptotic ceiling on Ghat) first at integer s = ' + cross + '; N(s)/log2 s then grows like s/(ln s log2 s)');
}

// ------------------------------------------------------- I. summary
console.log('');
console.log('=== I. SUMMARY NUMBERS =============================================');
console.log('C2 table s = 2..41 reproduces doubling-01 digit for digit; yesterday\'s 14 sandwich rows and 14 walk rows reproduced by a fresh engine');
console.log('per-fold L (prime order) : ' + WALK.map((w) => w.Ls.join('.')).join(' '));
console.log('M = prod(1+L_j)          : ' + WALK.map((w) => w.prod).join(' '));
console.log('K*+1                     : ' + WALK.map((w) => w.Kstar + 1).join(' '));
console.log('1+sum L_j                : ' + WALK.map((w) => w.sum1).join(' '));
console.log('w_true (Ghat(2s)/gbar)   : ' + WALK.map((w) => F(w.wt, 2).trim()).join(' '));
console.log('w (maxsum_{K*+1}/gbar)   : ' + WALK.map((w) => F(w.ww, 2).trim()).join(' '));
console.log('a (8 Ghat(s)/gbar)       : ' + WALK.map((w) => F(w.aa, 2).trim()).join(' '));
console.log('w_prod (composed)        : ' + WALK.map((w) => F(w.wprod, 2).trim()).join(' '));
console.log('w_prod/a                 : ' + WALK.map((w) => F(w.wprod / w.aa, 2).trim()).join(' '));
console.log('msc = w/(Ghat/gbar)      : ' + WALK.map((w) => F(w.msc, 4).trim()).join(' '));
console.log('');
console.log('self-test failures: ' + FAILS + (FAILS ? '   <-- DO NOT TRUST THIS OUTPUT' : '   (all checks passed)'));
tlog('done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0830-doubling-killrun.js
//   invocation:  node research/history/staging/attack-0830-doubling-killrun.js
//   code-sha256: 6157827456c298c3391d39088d7d3b2d9802138ea69f78ada4360c9ba5811e3a
//   out-sha256:  abb986f9515eca8719ec5c5ab6769a5fdf37007993237c0003e82b89392fc1c5
//   body-lines:  220
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     423.1 s
// ============================================================================
// === A. CUSTODY: LADDERS, THE C2 TABLE, AND YESTERDAY'S ROWS PARSED ====
//   ok    14 exact terms parsed (pos BigInt-guarded < 2^53)
//   ok    22 A144311 terms parsed
//   ok    exact ladder == A144311+1 on all 14 shared terms
//   ok    doubling-01 OUTPUT block parsed: 40 C2 rows   40
//   ok    C2 table reproduces doubling-01 DIGIT FOR DIGIT on all 40 rows (8 fields each)   40 of 40
// sup C2 over s = 2..41: 58/11 =  5.2727 at s = 16;  chain rows s = 2,4,8,16,32: 3.0000 5.0000 2.2000 5.2727 3.1034
//   ok    sup 5.2727 at s = 16, every C2(s) <= 8 on s = 2..41
//   ok    yesterday's OUTPUT block parsed: 14 sandwich rows and 14 walk rows   14 / 14
// yesterday's fourteen maxsum-certificate values, as parsed: 3.0000 2.0000 5.0000 2.5000 3.5000 2.6000 3.6000 5.0000 4.0000 5.0000 3.6364 4.5455 6.6364 4.2778
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
//   ok    maxsum_1(T_p) == G2(p#) for p = 3..23
//   ok    maxsum_m(T_p) >= m * gbar(p) for p = 5..23, m = 1..200 (the averaging floor, PROVEN; used in section H)
//
// === C. THE FOLD CHAIN IN PRIME ORDER: PER-FOLD L EXACT, AND THE STEP REPRODUCED ==
// step         s      Q                  L_1..L_N (prime order)   prod(1+L)  1+sum L  1+max L   K*+1   N
//   2#->3#         2   {3}                 2                            3        3        3      3   1
//   ok    walk 2#->3#: G2 = 6 @ 5 (x1), D = 1 == ladder row x = 3
//   ok      == yesterday's walk row: G2 6 @ 5 (x1), D 1, k 2, K* 2, N 1
//   3#->5#         3   {5}                 1                            2        2        2      2   1
//   ok    walk 3#->5#: G2 = 12 @ 17 (x2), D = 3 == ladder row x = 5
//   ok      == yesterday's walk row: G2 12 @ 17 (x2), D 3, k 1, K* 1, N 1
//   3#->7#         4   {5,7}               1 2                          6        4        3      5   2
//   ok    walk 3#->7#: G2 = 30 @ 71 (x2), D = 15 == ladder row x = 7
//   ok      == yesterday's walk row: G2 30 @ 71 (x2), D 15, k 4, K* 4, N 2
//   5#->7#         5   {7}                 2                            3        3        3      3   1
//   ok    walk 5#->7#: G2 = 30 @ 71 (x2), D = 15 == ladder row x = 7
//   ok      == yesterday's walk row: G2 30 @ 71 (x2), D 15, k 2, K* 2, N 1
//   5#->11#        6   {7,11}              2 1                          6        4        3      4   2
//   ok    walk 5#->11#: G2 = 42 @ 899 (x4), D = 135 == ladder row x = 11
//   ok      == yesterday's walk row: G2 42 @ 899 (x4), D 135, k 3, K* 3, N 2
//   7#->13#      7,8   {11,13}             1 2                          6        4        3      4   2
//   ok    walk 7#->13#: G2 = 66 @ 731 (x12), D = 1485 == ladder row x = 13
//   ok      == yesterday's walk row: G2 66 @ 731 (x12), D 1485, k 3, K* 3, N 2
//   7#->17#        9   {11,13,17}          1 2 2                       18        6        3      6   3
//   ok    walk 7#->17#: G2 = 108 @ 701 (x20), D = 22275 == ladder row x = 17
//   ok      == yesterday's walk row: G2 108 @ 701 (x20), D 22275, k 5, K* 5, N 3
//   7#->19#       10   {11,13,17,19}       1 2 2 2                     54        8        3      9   4
//   ok    walk 7#->19#: G2 = 150 @ 659 (x20), D = 378675 == ladder row x = 19
//   ok      == yesterday's walk row: G2 150 @ 659 (x20), D 378675, k 8, K* 8, N 4
//   11#->19#      11   {13,17,19}          2 2 2                       27        7        3      7   3
//   ok    walk 11#->19#: G2 = 150 @ 659 (x20), D = 378675 == ladder row x = 19
//   ok      == yesterday's walk row: G2 150 @ 659 (x20), D 378675, k 5, K* 6, N 3
//   11#->23#      12   {13,17,19,23}       2 2 2 3                    108       10        4     11   4
//   ok    walk 11#->23#: G2 = 204 @ 76166567 (x4), D = 7952175 == ladder row x = 23
//   ok      == yesterday's walk row: G2 204 @ 76166567 (x4), D 7952175, k 10, K* 10, N 4
//   13#->23#   13,14   {17,19,23}          2 2 3                       36        8        4      9   3
//   ok    walk 13#->23#: G2 = 204 @ 76166567 (x4), D = 7952175 == ladder row x = 23
//   ok      == yesterday's walk row: G2 204 @ 76166567 (x4), D 7952175, k 8, K* 8, N 3
//   13#->29#      15   {17,19,23,29}       2 2 3 2                    108       10        4     11   4
//   ok    walk 13#->29#: G2 = 258 @ 1205437109 (x2), D = 214708725 == ladder row x = 29
//   ok      == yesterday's walk row: G2 258 @ 1205437109 (x2), D 214708725, k 10, K* 10, N 4
//   13#->31#      16   {17,19,23,29,31}    2 2 3 2 4                  540       14        5     18   5
//   ok    walk 13#->31#: G2 = 348 @ 8813641451 (x4), D = 6226553025 == ladder row x = 31
//   ok      == yesterday's walk row: G2 348 @ 8813641451 (x4), D 6226553025, k 14, K* 17, N 5
//   17#->31#   17,18   {19,23,29,31}       2 3 2 4                    180       12        5     14   4
//   ok    walk 17#->31#: G2 = 348 @ 8813641451 (x4), D = 6226553025 == ladder row x = 31
//   ok      == yesterday's walk row: G2 348 @ 8813641451 (x4), D 6226553025, k 9, K* 13, N 4
//   ok    K* + 1 <= prod(1+L_j) at all fourteen steps (the product composition, PROVEN in the note; here its instance)
//   ok    K* >= max_j L_j at all fourteen steps (a run of L_j consecutive T^(j-1) slots is a killed level-s run)
//   ok    K* >= N at all fourteen steps (Lemma 1, hsubpow-explicit-K.md section 2b, CITED)
// the SUM form K*+1 <= 1 + sum_j L_j is NOT a theorem; on the fourteen steps it is violated at: s=4 (K*+1 = 5 > 1+sum L = 4); s=10 (K*+1 = 9 > 1+sum L = 8); s=12 (K*+1 = 11 > 1+sum L = 10); s=13 (K*+1 = 9 > 1+sum L = 8); s=15 (K*+1 = 11 > 1+sum L = 10); s=16 (K*+1 = 18 > 1+sum L = 14); s=17 (K*+1 = 14 > 1+sum L = 12)
//   ok    the eight diagonal cells L(T_x, p) reproduce a3-05 section 4 (7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4), consistently across steps   7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4
//
// === D. ORDER CONTROL (REVERSE PRIME ORDER) AND THE DIRECT SINGLE-FOLD L(T_s, q) ==
// step         s      reverse-order L        prod(1+L) rev   prod fwd     direct L(T_s,q) per q     max direct   K*
//   2#->3#         2   2                            3           3     2                            2     2
//   ok      reverse order re-derives the same level-3 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   3#->5#         3   1                            2           2     1                            1     1
//   ok      reverse order re-derives the same level-5 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   3#->7#         4   1 2                          6           6     1 1                          1     4
//   ok      reverse order re-derives the same level-7 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   5#->7#         5   2                            3           3     2                            2     2
//   ok      reverse order re-derives the same level-7 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   5#->11#        6   1 2                          6           6     2 1                          2     3
//   ok      reverse order re-derives the same level-11 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   7#->13#      7,8   1 2                          6           6     1 1                          1     3
//   ok      reverse order re-derives the same level-13 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   7#->17#        9   1 2 2                       18          18     1 1 1                        1     5
//   ok      reverse order re-derives the same level-17 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   7#->19#       10   1 2 2 3                     72          54     1 1 1 1                      1     8
//   ok      reverse order re-derives the same level-19 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   11#->19#      11   2 2 2                       27          27     2 2 2                        2     6
//   ok      reverse order re-derives the same level-19 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   11#->23#      12   1 2 2 3                     72         108     2 2 2 1                      2    10
//   ok      reverse order re-derives the same level-23 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   13#->23#   13,14   2 2 3                       36          36     2 2 2                        2     8
//   ok      reverse order re-derives the same level-23 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   13#->29#      15   2 2 3 3                    144         108     2 2 2 2                      2    10
//   ok      reverse order re-derives the same level-29 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   13#->31#      16   2 2 3 3 5                  864         540     2 2 2 2 2                    2    17
//   ok      reverse order re-derives the same level-31 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   17#->31#   17,18   2 2 4 3                    180         180     2 2 2 2                      2    13
//   ok      reverse order re-derives the same level-31 data (G2, K*, census) and K*+1 <= prod(1+L) in that order too
//   ok    direct L(T_s, q) == first-fold L_1 when q = q_1, at all fourteen steps
//   ok    K* >= max_q L(T_s, q) at all fourteen steps
//
// === E. THE NESTING CHAIN ALONG THE LONGEST RUN: m_0 = K*, m_j = run slots surviving q_1..q_j ==
//   the product theorem's link: m_{j-1} + 1 <= (m_j + 1)(1 + L_j); equality would be needed at every link for the product to be tight
// step         s      m_0..m_N (prime order)     links (m_{j-1}+1)/((m_j+1)(1+L_j))         K*+1   prod   prod/(K*+1)
//   2#->3#         2   2 0                        1.00                                        3      3    1.00
//   3#->5#         3   1 0                        1.00                                        2      2    1.00
//   3#->7#         4   4 2 0                      0.83 1.00                                   5      6    1.20
//   5#->7#         5   2 0                        1.00                                        3      3    1.00
//   5#->11#        6   3 1 0                      0.67 1.00                                   4      6    1.50
//   7#->13#      7,8   3 1 0                      1.00 0.67                                   4      6    1.50
//   7#->17#        9   5 3 2 0                    0.75 0.44 1.00                              6     18    3.00
//   7#->19#       10   8 5 3 1 0                  0.75 0.50 0.67 0.67                         9     54    6.00
//   11#->19#      11   6 4 2 0                    0.47 0.56 1.00                              7     27    3.86
//   11#->23#      12   10 7 5 2 0                 0.46 0.44 0.67 0.75                        11    108    9.82
//   13#->23#   13,14   8 5 3 0                    0.50 0.50 1.00                              9     36    4.00
//   13#->29#      15   10 7 5 2 0                 0.46 0.44 0.50 1.00                        11    108    9.82
//   13#->31#      16   17 13 10 7 4 0             0.43 0.42 0.34 0.53 1.00                   18    540    30.00
//   17#->31#   17,18   13 10 6 3 0                0.42 0.39 0.58 0.80                        14    180    12.86
//   ok    every link holds, m_N = 0, and every slot of the longest run is killed by an entering prime, at all fourteen steps
//
// === F. THE WEIGHTED KILL-RUN, EXACT, BESIDE ITS ALLOWANCE (deliverable a) ==
//   w_true = Ghat(2s)/gbar(s)  [the object: the longest killed run's span in mean-gap units, exact]
//   w      = maxsum_{K*+1}(T_s)/gbar(s) = (K*+1) rho(s,K*+1)  [yesterday's certificate in the same units]
//   a      = 8 Ghat(s)/gbar(s)  [the allowance; (M8) is w <= a, (D8) at this step is w_true <= a]
// step         s     gbar    w_true       w         a      w_true/a    w/a     msc=w/(Ghat/gbar)  yesterday
//   2#->3#         2   2.00   3.00   3.00   8.00    0.375    0.375       3.0000        3.0000
//   ok      == yesterday's row: K* 2, N 1, floor 2.0000, C2 3.0000, msc 3.0000, K*+1 3
//   3#->5#         3   6.00   2.00   2.00   8.00    0.250    0.250       2.0000        2.0000
//   ok      == yesterday's row: K* 1, N 1, floor 2.0000, C2 2.0000, msc 2.0000, K*+1 2
//   3#->7#         4   6.00   5.00   5.00   8.00    0.625    0.625       5.0000        5.0000
//   ok      == yesterday's row: K* 4, N 2, floor 3.0000, C2 5.0000, msc 5.0000, K*+1 5
//   5#->7#         5   10.00   3.00   3.00   9.60    0.313    0.313       2.5000        2.5000
//   ok      == yesterday's row: K* 2, N 1, floor 2.0000, C2 2.5000, msc 2.5000, K*+1 3
//   5#->11#        6   10.00   4.20   4.20   9.60    0.438    0.438       3.5000        3.5000
//   ok      == yesterday's row: K* 3, N 2, floor 2.5000, C2 3.5000, msc 3.5000, K*+1 4
//   7#->13#      7,8   14.00   4.71   5.57   17.14    0.275    0.325       2.6000        2.6000
//   ok      == yesterday's row: K* 3, N 2, floor 2.2000, C2 2.2000, msc 2.6000, K*+1 4
//   7#->17#        9   14.00   7.71   7.71   17.14    0.450    0.450       3.6000        3.6000
//   ok      == yesterday's row: K* 5, N 3, floor 2.6000, C2 3.6000, msc 3.6000, K*+1 6
//   7#->19#       10   14.00   10.71   10.71   17.14    0.625    0.625       5.0000        5.0000
//   ok      == yesterday's row: K* 8, N 4, floor 3.2000, C2 5.0000, msc 5.0000, K*+1 9
//   11#->19#      11   17.11   8.77   9.82   19.64    0.446    0.500       4.0000        4.0000
//   ok      == yesterday's row: K* 6, N 3, floor 2.5714, C2 3.5714, msc 4.0000, K*+1 7
//   11#->23#      12   17.11   11.92   12.27   19.64    0.607    0.625       5.0000        5.0000
//   ok      == yesterday's row: K* 10, N 4, floor 3.2857, C2 4.8571, msc 5.0000, K*+1 11
//   13#->23#   13,14   20.22   10.09   11.87   26.11    0.386    0.455       3.6364        3.6364
//   ok      == yesterday's row: K* 8, N 3, floor 2.3636, C2 3.0909, msc 3.6364, K*+1 9
//   13#->29#      15   20.22   12.76   14.84   26.11    0.489    0.568       4.5455        4.5455
//   ok      == yesterday's row: K* 10, N 4, floor 2.5455, C2 3.9091, msc 4.5455, K*+1 11
//   13#->31#      16   20.22   17.21   21.66   26.11    0.659    0.830       6.6364        6.6364
//   ok      == yesterday's row: K* 17, N 5, floor 2.8182, C2 5.2727, msc 6.6364, K*+1 18
//   17#->31#   17,18   22.92   15.18   20.16   37.70    0.403    0.535       4.2778        4.2778
//   ok      == yesterday's row: K* 13, N 4, floor 1.9444, C2 3.2222, msc 4.2778, K*+1 14
//   ok    w_true <= w <= a at all fourteen steps (the sandwich in mean-gap units; (M8) holds on the range)
// sup of w/a over the fourteen steps:  0.8295 at s = 16 (= msc/8 =  0.8295)
//
// === G. THE PER-FOLD COMPOSITION AGAINST THE TRUTH AND THE ALLOWANCE (deliverable b) ==
//   composed (product, PROVEN): Ghat(2s) <= maxsum_{M}(T_s), M = prod_j (1+L_j);  w_prod = maxsum_M(T_s)/gbar(s)
//   pure product certificate: Ghat(2s) <= prod_j (1+L_j) Ghat(s)  [coarser, the fold-by-fold product of per-fold product certificates]
//   sum form (NOT a theorem, data only): maxsum_{1+sum L_j}(T_s)/gbar;  max form (a FLOOR on K*+1, not a certificate): maxsum_{1+max L_j}/gbar
// step         s      M=prod   w_prod       a       w_prod/a   w_prod/w    prod    prod/8   w_sum   w_sum>=w_true   w_max
//   2#->3#         2        3   3.00   8.00    0.375    1.000       3   0.38   3.00     yes        3.00
//   3#->5#         3        2   2.00   8.00    0.250    1.000       2   0.25   2.00     yes        2.00
//   3#->7#         4        6   6.00   8.00    0.750    1.200       6   0.75   4.00     NO         3.00
//   5#->7#         5        3   3.00   9.60    0.313    1.000       3   0.38   3.00     yes        3.00
//   5#->11#        6        6   6.00   9.60    0.625    1.429       6   0.75   4.20     yes        3.00
//   7#->13#      7,8        6   7.71   17.14    0.450    1.385       6   0.75   5.57     yes        4.71
//   7#->17#        9       18   19.71   17.14    1.150    2.556      18   2.25   7.71     yes        4.71
//   7#->19#       10       54   55.71   17.14    3.250    5.200      54   6.75   9.86     NO         4.71
//   11#->19#      11       27   30.16   19.64    1.536    3.071      27   3.38   9.82     yes        5.61
//   11#->23#      12      108   110.45   19.64    5.625    9.000     108   13.50   11.92     yes        6.31
//   13#->23#   13,14       36   40.65   26.11    1.557    3.425      36   4.50   11.27     yes        7.71
//   13#->29#      15      108   112.75   26.11    4.318    7.600     108   13.50   13.95     yes        7.71
//   13#->31#      16      540   543.86   26.11    20.830    25.110     540   67.50   18.10     yes        8.31
//   17#->31#   17,18      180   188.76   37.70    5.007    9.364     180   22.50   17.02     yes        9.16
//   ok    the composed bound dominates yesterday's certificate at every step (K*+1 <= M and maxsum monotone): it can never be tighter
// composed bound above the allowance (w_prod > a, i.e. maxsum_M(T_s) > 8 Ghat(s)) at 8 of 14 steps; first at s = 9; under it at s = 2 3 4 5 6 7,8
// at the largest enumerable s (s = 17,18): w_prod/a =  5.01, w_prod/w_true =  12.43, M = 180 against K*+1 = 14
// at the sup step (s = 16): w_prod/a =  20.83, w_prod/w_true =  31.60, M = 540 against K*+1 = 18
// the sum form sits above the truth at 12 of 14 steps and below it at s = 4 10 (so it is false as a certificate, not merely unproven)
//
// === H. THE ALL-s ARITHMETIC: M >= 2^N, SO THE COMPOSED BOUND IS >= 2^N gbar(s) ==
//   L_j >= 1 at every fold (each fold kills a slot: the tile meets every class mod q_j), so M = prod(1+L_j) >= 2^N;
//   maxsum_M(T_s) >= M gbar(s) (averaging), so the composed certificate is >= 2^N gbar(s) and closure at 8 needs 2^N gbar(s) <= 8 Ghat(s).
//   ok    gbar(s) by the Mertens-type product equals P(s)#/D_s from the tiles at s = 5..23
//   ok    N(s) at the fourteen steps equals the entering-prime count of each walk
//    s     N    2^N gbar(s)     8 Ghat(s)     floor/(8 Ghat)    log2 Ghat needed     log2 s^beta2 (beta2 = 4.26645, CITED ceiling, asymptotic)
//      2     1       4.000e+0            16      0.250          -1.00                4.27
//      4     2       2.400e+1            48      0.500           1.58                8.53
//      8     2       5.600e+1           240      0.233           2.81                12.80
//     16     5       6.471e+2           528      1.226           6.34                17.07
//     32     7       4.123e+3          2784      1.481           9.01                21.33
//     64    13       3.572e+5          8640      41.348           15.45                25.60
//    128    23       4.894e+8       unknown          n/a           25.87                29.87
//    256    43      6.611e+14       unknown          n/a           46.23                34.13
//    512    75      3.591e+24       unknown          n/a           78.57                38.40
//   1024   137      2.029e+43       unknown          n/a           140.86                42.66
// on the chain rungs with a known Ghat(s), the 2^N gbar floor alone already exceeds 8 Ghat(s) at s = 16, 32, 64 (no walk needed there)
//   ok    the composed bound is provably above the allowance at the chain rungs s = 32 and s = 64 from the floor alone
// N(s) > 3 + beta2 log2 s (so 2^N > 8 s^beta2, the floor beats even the asymptotic ceiling on Ghat) first at integer s = 217; N(s)/log2 s then grows like s/(ln s log2 s)
//
// === I. SUMMARY NUMBERS =============================================
// C2 table s = 2..41 reproduces doubling-01 digit for digit; yesterday's 14 sandwich rows and 14 walk rows reproduced by a fresh engine
// per-fold L (prime order) : 2 1 1.2 2 2.1 1.2 1.2.2 1.2.2.2 2.2.2 2.2.2.3 2.2.3 2.2.3.2 2.2.3.2.4 2.3.2.4
// M = prod(1+L_j)          : 3 2 6 3 6 6 18 54 27 108 36 108 540 180
// K*+1                     : 3 2 5 3 4 4 6 9 7 11 9 11 18 14
// 1+sum L_j                : 3 2 4 3 4 4 6 8 7 10 8 10 14 12
// w_true (Ghat(2s)/gbar)   : 3.00 2.00 5.00 3.00 4.20 4.71 7.71 10.71 8.77 11.92 10.09 12.76 17.21 15.18
// w (maxsum_{K*+1}/gbar)   : 3.00 2.00 5.00 3.00 4.20 5.57 7.71 10.71 9.82 12.27 11.87 14.84 21.66 20.16
// a (8 Ghat(s)/gbar)       : 8.00 8.00 8.00 9.60 9.60 17.14 17.14 17.14 19.64 19.64 26.11 26.11 26.11 37.70
// w_prod (composed)        : 3.00 2.00 6.00 3.00 6.00 7.71 19.71 55.71 30.16 110.45 40.65 112.75 543.86 188.76
// w_prod/a                 : 0.38 0.25 0.75 0.31 0.63 0.45 1.15 3.25 1.54 5.63 1.56 4.32 20.83 5.01
// msc = w/(Ghat/gbar)      : 3.0000 2.0000 5.0000 2.5000 3.5000 2.6000 3.6000 5.0000 4.0000 5.0000 3.6364 4.5455 6.6364 4.2778
//
// self-test failures: 0   (all checks passed)
// ============================================================================
// READINGS
//
// 1. CUSTODY HOLDS. The C2 table s = 2..41 matches attack-doubling-01.js digit
//    for digit on 40 rows and 8 fields; a fresh fold-chain engine (one
//    streaming pass per entering prime, survivors tracked by bitmask) re-derives
//    yesterday's fourteen walk rows (G2, least argmax, multiplicity, census, k,
//    K*, N) and the fourteen sandwich rows (floor, C2, msc, K*+1) exactly, the
//    fourteen msc values 3.0000 ... 6.6364 ... 4.2778 included. [VERIFIED]
//
// 2. THE PER-FOLD L IS THE DIAGONAL. In prime order the j-th intermediate tile
//    is T_{q_{j-1}}, so every L_j is a diagonal cell L(T_x, next prime); the
//    chains return 7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4, the a3-05 table,
//    consistently wherever a cell recurs across steps. [VERIFIED]
//
// 3. THE COMPOSITION IS A PRODUCT. K*+1 <= M = prod(1+L_j) holds at all
//    fourteen steps in both fold orders; the sum form K*+1 <= 1+sum L_j fails
//    at seven of fourteen (18 > 14 at s = 16); max_j L_j <= K* holds, as a
//    floor. M runs 3 to 540 against K*+1 of 3 to 18; M/(K*+1) reaches 30.00 at
//    s = 16. The nesting links (m_{j-1}+1)/((m_j+1)(1+L_j)) run 0.34 to 1.00:
//    the product's slack is that a fold's kills inside the run are not
//    maximal runs between every pair of survivors. [VERIFIED]
//
// 4. DELIVERABLE (a). In mean-gap units w_true <= w <= a at every step;
//    w/a peaks at 0.8295 at s = 16 (msc 6.6364 over 8); w_true/a peaks at
//    0.659 there. [VERIFIED; the sandwich is a per-step theorem]
//
// 5. DELIVERABLE (b). The composed bound w_prod = maxsum_M(T_s)/gbar dominates
//    yesterday's certificate at every step (it can never be tighter), exceeds
//    the allowance a at 8 of 14 steps, first at s = 9, and at s = 16 reads
//    20.83 times the allowance and 31.60 times the truth; at s = 17,18 it reads
//    5.01 times the allowance. Order matters both ways (reverse order gives
//    864 against 540 at s = 16 and 72 against 108 at s = 12) but no order can
//    go below K*+1 or below 2^N. [VERIFIED]
//
// 6. THE ALL-s ARITHMETIC. M >= 2^N because every fold kills a slot, and
//    maxsum_M >= M gbar by averaging, so the composed certificate is at least
//    2^N gbar(s); that floor alone exceeds 8 Ghat(s) at the chain rungs
//    s = 16, 32, 64 (ratios 1.226, 1.481, 41.348) with no walk, and it exceeds
//    8 s^beta2 from s = 217 on, so under the cited polynomial ceiling on Ghat
//    the composed bound is above the allowance for all large s. [VERIFIED the
//    rungs; PROVEN the divergence given the cited ceiling]
//
// 7. WHAT IS NOT HERE. No upper bound on K*(s), on maxsum_{K*+1}(T_s), or on
//    C2(s) for any s past 18. The composition closes as a route; the open
//    inequality (M8) is where yesterday left it. [INFERRED]
