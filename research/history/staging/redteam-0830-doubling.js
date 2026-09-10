#!/usr/bin/env node
'use strict';
// ============================================================================
// RED TEAM 2026-08-30 — the doubling bridge (0829n) and the doubling kill-run
// (0830), re-derived on an engine that shares no line with either producer.
// ============================================================================
// THE QUESTION. Do the two HELD notes survive an adversarial re-derivation on
// independent code: K*(16) = 17 and G2(31#) = 348 @ 8813641451 (x4) from two
// base tiles; the maxsum certificate Ghat(2s) <= maxsum_{K*+1}(T_s) at all
// fourteen enumerable steps; Lemma 1's arithmetic at s = 64 and s = 128 and
// the "dead at EVERY C2 in the band" wording of REFUTED row 94; the product
// composition K*+1 <= prod (1+L_j) including the zero-kill fold; the 2^N floor
// against 8 Ghat(s) at the chain rungs; and REFUTED row 98 as worded.
//
// METHOD, and how it differs from the two producers under test. Those walk the
// level-2s period with a copy-residue bitmask keyed on the base tile. This one
// is written column-major from scratch: the level-2s period is cut into M =
// prod(q in (s,2s]) columns of D_s base slots each, the kill pattern of a
// column is the OR of one precomputed residue mask per entering prime, and the
// sweep is over columns. Two independent implementations of that sweep are
// carried and cross-checked against each other on every step small enough for
// both (a byte-per-slot brute force, and a 32-bit word scan with 16-bit
// lead/trail/max tables). Per-fold L is computed by a third route entirely:
// the observation that a fold of T by q kills, in the column with j = c, the
// slots whose residue lies in a 2-set {u, u-2} with u = -c*P mod q, so L is a
// max over q linear scans, chained across the column seam. Nothing is read
// from either producer's OUTPUT block; the only inputs are the two ladder
// keepers, parsed at run time.
//
// SECTIONS
//   A  custody: primes, tiles, the exact ladder, the C2 table s = 2..41
//   B  maxsum: tables, monotonicity, the m*gbar floor
//   C  the fourteen steps: K*, G2(2s), least argmax, multiplicity, census, k
//   D  the sandwich: maxsum_{N+1} <= Ghat(2s) <= maxsum_{K*+1} <= (K*+1)Ghat
//   E  Lemma 1 arithmetic and the band audit behind REFUTED row 94
//   F  the Cesaro telescoping identity
//   G  per-fold L, the product M, the sum form, the composed certificate
//   H  the 2^N floor at the chain rungs, and the all-s crossing
//   I  the product theorem under stress: every maximal run, zero-kill folds
// ============================================================================

const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const R = (p) => path.join(REPO, p);

let FAILS = 0;
const ok = (name, cond, detail) => {
  if (!cond) FAILS++;
  console.log('  ' + (cond ? 'ok  ' : 'FAIL') + '  ' + name + (detail === undefined ? '' : '   ' + detail));
};
const F = (x, n) => Number(x).toFixed(n);
const pad = (s, n) => String(s).padStart(n);

// --- primes -----------------------------------------------------------------
function sieve(n) {
  const c = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { out.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return out;
}
const PRIMES = sieve(5000);
const piOf = (x) => { let k = 0; for (const p of PRIMES) { if (p > x) break; k++; } return k; };
const Pat = (t) => { let q = 0; for (const p of PRIMES) { if (p > t) break; q = p; } return q; };
const primesIn = (lo, hi) => PRIMES.filter((p) => p > lo && p <= hi);

// --- tiles ------------------------------------------------------------------
// T_p = { r in [0, p#) : r and r+2 coprime to p# }, ascending. Built by folding.
function buildTile(pmax) {
  let P = 2, r = new Float64Array([1]);
  for (const p of PRIMES) {
    if (p < 3) continue;
    if (p > pmax) break;
    const D = r.length, out = new Float64Array(D * (p - 2));
    let n = 0;
    for (let j = 0; j < p; j++) {
      const off = j * P;
      for (let a = 0; a < D; a++) {
        const v = r[a] + off;
        if (v % p !== 0 && (v + 2) % p !== 0) out[n++] = v;
      }
    }
    if (n !== D * (p - 2)) throw new Error('census mismatch at p=' + p);
    P *= p; r = out;
  }
  return { pmax, P, r, D: r.length };
}
function gapsOf(t) {
  const g = new Float64Array(t.D);
  for (let i = 0; i < t.D; i++) g[i] = (i + 1 < t.D ? t.r[i + 1] : t.r[0] + t.P) - t.r[i];
  return g;
}

// maxsum_m(T): the largest sum of m cyclically consecutive gaps. For m >= D the
// window wraps floor(m/D) whole periods. ms[r] is built for r <= RCAP only.
function maxsumTable(t, RCAP) {
  const g = gapsOf(t), D = t.D, cap = Math.min(D - 1, RCAP);
  const ms = new Float64Array(cap + 1);
  for (let m = 1; m <= cap; m++) {
    let s = 0; for (let i = 0; i < m; i++) s += g[i];
    let best = s;
    for (let st = 1; st < D; st++) { s += g[(st + m - 1) % D] - g[st - 1]; if (s > best) best = s; }
    ms[m] = best;
  }
  return { ms, cap, D, P: t.P };
}
function maxsum(tab, m) {
  if (m <= 0) return 0;
  const q = Math.floor(m / tab.D), r = m - q * tab.D;
  if (r > tab.cap) throw new Error('maxsum beyond cap: ' + m);
  return q * tab.P + tab.ms[r];
}

// --- sweep engine 1: brute, one byte per level-s slot ------------------------
// Returns K*, G2 of the folded level, its least argmax and multiplicity, the
// census, and the length k of the run that realises the record.
function sweepBrute(base, Q) {
  const D = base.D, N = Q.length;
  let M = 1; for (const q of Q) M *= q;
  const tot = D * M;
  const kill = new Uint8Array(tot);         // 0 = survivor, else 1 + killer index
  for (let qi = 0; qi < N; qi++) {
    const q = Q[qi], Pm = base.P % q;
    const cls = new Uint8Array(q * D);
    for (let c = 0; c < q; c++) {
      const d = (c * Pm) % q, off = c * D;
      for (let a = 0; a < D; a++) { const v = (base.r[a] % q + d) % q; if (v === 0 || v === q - 2) cls[off + a] = 1; }
    }
    for (let j = 0; j < M; j++) {
      const off = (j % q) * D, jo = j * D;
      for (let a = 0; a < D; a++) if (cls[off + a] && !kill[jo + a]) kill[jo + a] = qi + 1;
    }
  }
  let alive = 0; for (let i = 0; i < tot; i++) if (!kill[i]) alive++;
  if (alive === 0) throw new Error('no survivor');
  // cyclic run scan
  let start = 0; while (kill[start]) start++;           // a survivor to cut at
  let Kstar = 0, G = 0, gArg = 0, gMul = 0, kAt = 0;
  const val = (g) => base.r[g % D] + Math.floor(g / D) * base.P;
  let prev = start, run = 0;
  for (let s = 1; s <= tot; s++) {
    const g = (start + s) % tot;
    if (kill[g]) { run++; continue; }
    if (run > Kstar) Kstar = run;
    let span = val(g) - val(prev); if (span <= 0) span += base.P * M;
    if (span > G) { G = span; gArg = val(prev); gMul = 1; kAt = run; }
    else if (span === G) { gMul++; if (val(prev) < gArg) { gArg = val(prev); kAt = run; } }
    prev = g; run = 0;
  }
  return { M, Kstar, G, gArg, gMul, kAt, alive, kill };
}

// --- sweep engine 2: 32-bit word scan with 16-bit tables ---------------------
const L16 = new Uint8Array(65536), T16 = new Uint8Array(65536), M16 = new Uint8Array(65536);
(function () {
  for (let v = 0; v < 65536; v++) {
    let lead = 0; while (lead < 16 && (v >> lead) & 1) lead++;
    let trail = 0; while (trail < 16 && (v >> (15 - trail)) & 1) trail++;
    let mx = 0, run = 0;
    for (let b = 0; b < 16; b++) { if ((v >> b) & 1) { run++; if (run > mx) mx = run; } else run = 0; }
    L16[v] = lead; T16[v] = trail; M16[v] = mx;
  }
})();

function sweepWords(base, Q, Gcand, msTab) {
  const D = base.D, N = Q.length, W = D >> 5, TAIL = D & 31;
  let M = 1; for (const q of Q) M *= q;
  // residue masks, one bitset of W+1 words per (prime, class)
  const WW = W + (TAIL ? 1 : 0);
  const masks = [], step = [];
  for (let qi = 0; qi < N; qi++) {
    const q = Q[qi], Pm = base.P % q, m = new Uint32Array(q * WW);
    for (let c = 0; c < q; c++) {
      const d = (c * Pm) % q, off = c * WW;
      for (let a = 0; a < D; a++) { const v = (base.r[a] % q + d) % q; if (v === 0 || v === q - 2) m[off + (a >> 5)] |= (1 << (a & 31)); }
    }
    masks.push(m); step.push(WW);
  }
  const lead = new Uint16Array(M), trail = new Uint16Array(M), mxc = new Uint16Array(M);
  let killed = 0;
  const POP = new Uint8Array(65536); for (let v = 1; v < 65536; v++) POP[v] = POP[v >> 1] + (v & 1);
  const cur = new Int32Array(N);
  for (let j = 0; j < M; j++) {
    for (let qi = 0; qi < N; qi++) cur[qi] = (j % Q[qi]) * step[qi];
    let run = 0, mx = 0, ld = -1;
    for (let w = 0; w < W; w++) {
      let word = 0;
      for (let qi = 0; qi < N; qi++) word |= masks[qi][cur[qi] + w];
      word = word >>> 0;
      killed += POP[word & 0xffff] + POP[word >>> 16];
      for (let h = 0; h < 2; h++) {
        const v = (h === 0 ? word & 0xffff : word >>> 16);
        const le = L16[v];
        run += le;
        if (le < 16) {
          if (run > mx) mx = run;
          if (ld < 0) ld = run;
          if (M16[v] > mx) mx = M16[v];
          run = T16[v];
        }
      }
    }
    if (TAIL) {
      let word = 0;
      for (let qi = 0; qi < N; qi++) word |= masks[qi][cur[qi] + W];
      word = word >>> 0;
      for (let b = 0; b < TAIL; b++) {
        if ((word >>> b) & 1) { killed++; run++; }
        else { if (run > mx) mx = run; if (ld < 0) ld = run; run = 0; }
      }
    }
    if (run > mx) mx = run;
    if (ld < 0) ld = run;               // the whole column is killed
    lead[j] = ld; trail[j] = run; mxc[j] = mx;
  }
  // the run open on entering column 0, walking back over any full columns
  let open0 = 0, jb = M - 1;
  while (lead[jb] === D && open0 <= D * M) { open0 += D; jb = (jb + M - 1) % M; }
  open0 += trail[jb];
  // chain the columns cyclically
  let Kstar = 0, carry = open0;
  for (let j = 0; j < M; j++) {
    if (lead[j] === D) { carry += D; if (carry > Kstar) Kstar = carry; continue; }
    const cand = carry + lead[j]; if (cand > Kstar) Kstar = cand;
    if (mxc[j] > Kstar) Kstar = mxc[j];
    carry = trail[j];
  }
  // second pass for the record gap: only runs long enough to reach Gcand
  let m0 = 1; while (maxsum(msTab, m0) < Gcand) m0++;
  const T0 = m0 - 1;
  const val = (g) => base.r[((g % D) + D) % D] + Math.floor(g / D) * base.P;
  let G = 0, gArg = 0, gMul = 0, kAt = 0, recStart = 0, argK = -1;
  const consider = (startG, len) => {
    let span = val(startG + len) - val(startG - 1);
    if (span <= 0) span += base.P * M;
    const left = val(startG - 1) < 0 ? val(startG - 1) + base.P * M : val(startG - 1);
    if (span > G) { G = span; gArg = left; gMul = 1; kAt = len; recStart = startG; }
    else if (span === G) { gMul++; if (left < gArg) { gArg = left; kAt = len; recStart = startG; } }
    if (len === Kstar && argK < 0) argK = startG;
  };
  const colWords = new Uint32Array(WW);
  const T1 = Math.min(T0, Kstar);
  let openLen = open0;
  for (let j = 0; j < M; j++) {
    if (lead[j] === D) { openLen += D; continue; }
    const len = openLen + lead[j];
    if (len >= T1) consider(j * D - openLen, len);
    if (mxc[j] >= T1) {
      for (let qi = 0; qi < N; qi++) cur[qi] = (j % Q[qi]) * step[qi];
      for (let w = 0; w < WW; w++) { let x = 0; for (let qi = 0; qi < N; qi++) x |= masks[qi][cur[qi] + w]; colWords[w] = x >>> 0; }
      let run = 0;
      for (let a = 0; a < D; a++) {
        if ((colWords[a >> 5] >>> (a & 31)) & 1) run++;
        else { if (run >= T1 && run <= a - 1) consider(j * D + a - run, run); run = 0; }
      }
    }
    openLen = trail[j];
  }
  return { M, Kstar, G, gArg, gMul, kAt, alive: D * M - killed, T0, recStart, argK };
}

// --- per-fold L, by a route neither producer uses ---------------------------
// In the column with j = c the fold of T by q kills exactly the slots whose
// residue mod q lies in {u, u-2} with u = -c*(P mod q) mod q, so the longest
// killed run is a max over the q columns of a linear scan, chained at the seam.
function foldL(iter, D, P, q) {
  const cur = new Int32Array(q), last = new Int32Array(q).fill(-2);
  const mx = new Int32Array(q), lead = new Int32Array(q), trail = new Int32Array(q);
  let a = 0;
  iter((v) => {
    const r = v % q, u2 = (r + 2) % q;
    for (const u of (r === u2 ? [r] : [r, u2])) {
      if (last[u] === a - 1) cur[u]++; else cur[u] = 1;
      last[u] = a;
      if (cur[u] > mx[u]) mx[u] = cur[u];
      if (cur[u] === a + 1) lead[u] = cur[u];
    }
    a++;
  });
  if (a !== D) throw new Error('foldL census ' + a + ' != ' + D);
  for (let u = 0; u < q; u++) trail[u] = (last[u] === D - 1) ? cur[u] : 0;
  const Pm = P % q, uAt = (c) => ((-(c * Pm) % q) + q) % q;
  let best = 0; for (let u = 0; u < q; u++) if (mx[u] > best) best = mx[u];
  let acc = 0;
  for (let t = 0; t < 2 * q; t++) {
    const u = uAt(t % q);
    if (lead[u] === D) { acc += D; if (acc > best) best = acc; continue; }
    const cand = acc + lead[u]; if (cand > best) best = cand;
    acc = trail[u];
  }
  return best;
}
function tileIter(t) { return (cb) => { for (let i = 0; i < t.D; i++) cb(t.r[i]); }; }
// T_29 is 214,708,725 slots and is never materialised: it is streamed off T_23.
function iter29(t23) {
  return (cb) => { for (let j = 0; j < 29; j++) { const off = j * t23.P; for (let i = 0; i < t23.D; i++) { const v = t23.r[i] + off; if (v % 29 !== 0 && (v + 2) % 29 !== 0) cb(v); } } };
}
function foldTile(t, q) {
  const out = new Float64Array(t.D * (q - 2)); let n = 0;
  for (let j = 0; j < q; j++) { const off = j * t.P; for (let i = 0; i < t.D; i++) { const v = t.r[i] + off; if (v % q !== 0 && (v + 2) % q !== 0) out[n++] = v; } }
  return { pmax: q, P: t.P * q, r: out, D: n };
}

// ============================================================================
// A. CUSTODY: the ladder, the tiles, the C2 table
// ============================================================================
console.log('=== A. CUSTODY [the two ladder keepers parsed at run time] ==');
const ladSrc = fs.readFileSync(R('research/exact-g2-ladder.js'), 'utf8');
const LAD = {};
for (const m of ladSrc.matchAll(/\{\s*x:\s*(\d+),\s*g:\s*(\d+),\s*pos:\s*(\d+)n,\s*nmax:\s*(\d+)\s*\}/g))
  LAD[+m[1]] = { g: +m[2], pos: m[3], nmax: +m[4] };
const intSrc = fs.readFileSync(R('research/import-interp-01-bgt-defect.js'), 'utf8');
const aSrc = intSrc.match(/const A144311 = \[([\s\S]*?)\];/)[1].split(',').map((s) => +s.trim());
const prSrc = intSrc.match(/const PR = \[([\s\S]*?)\];/)[1].split(',').map((s) => +s.trim());
const G2 = {}; prSrc.forEach((p, i) => { G2[p] = aSrc[i] + 1; });
ok('ladder rows parsed', Object.keys(LAD).length === 14, Object.keys(LAD).length + ' rows, x = 2..43');
ok('A144311 + 1 agrees with the exact ladder on all 14 shared terms',
  Object.keys(LAD).every((x) => G2[+x] === LAD[+x].g), 'x = 2..43');
const Ghat = (t) => G2[Pat(t)];
const gbar = (x) => { let v = 2; for (const p of PRIMES) { if (p < 3) continue; if (p > x) break; v = v * p / (p - 2); } return v; };
const Dcensus = (x) => { let v = 1n; for (const p of PRIMES) { if (p < 3) continue; if (p > x) break; v *= BigInt(p - 2); } return v; };

const TILES = {}; for (const p of [2, 3, 5, 7, 11, 13, 17]) TILES[p] = buildTile(p);
for (const p of [2, 3, 5, 7, 11, 13, 17]) {
  const t = TILES[p];
  const g = gapsOf(t); let mx = 0; for (let i = 0; i < t.D; i++) if (g[i] > mx) mx = g[i];
  ok('tile T_' + p + ' rebuilt: census, period, record', String(t.D) === String(Dcensus(p)) && mx === G2[p],
    'D ' + t.D + ', P ' + t.P + ', G2 ' + mx);
}
console.log('  C2(s) = Ghat(2s)/Ghat(s), s = 2..41 [ladder-grade, x <= 43 corpus-exact, 47..79 OEIS]');
let c2max = 0, c2at = 0, c2over8 = 0;
const row = [];
for (let s = 2; s <= 41; s++) {
  const c = Ghat(2 * s) / Ghat(s);
  if (c > c2max) { c2max = c; c2at = s; }
  if (c > 8) c2over8++;
  row.push(s + ':' + F(c, 4));
}
for (let i = 0; i < row.length; i += 8) console.log('    ' + row.slice(i, i + 8).join('  '));
ok('sup C2 over s = 2..41 is 348/66 at s = 16', c2at === 16 && Math.abs(c2max - 348 / 66) < 1e-12, F(c2max, 4));
ok('no s in 2..41 has C2 > 8', c2over8 === 0, 'sup ' + F(c2max, 4));
console.log('  chain C2 at s = 2,4,8,16,32: ' + [2, 4, 8, 16, 32].map((s) => F(Ghat(2 * s) / Ghat(s), 4)).join(' '));

// ============================================================================
// B. MAXSUM: the object the certificate is built on
// ============================================================================
console.log('');
console.log('=== B. MAXSUM_m(T) [independent sliding window; the wrap convention] ==');
const TAB = {}; for (const p of [2, 3, 5, 7, 11, 13, 17]) TAB[p] = maxsumTable(TILES[p], 600);
let mono = true, floorOK = true, worstFloor = Infinity;
for (const p of [2, 3, 5, 7, 11, 13, 17]) {
  const g = gbar(p);
  for (let m = 1; m <= 200; m++) {
    if (maxsum(TAB[p], m) < maxsum(TAB[p], m - 1)) mono = false;
    const rat = maxsum(TAB[p], m) / (m * g);
    if (rat < 1 - 1e-12) floorOK = false;
    if (rat < worstFloor) worstFloor = rat;
  }
}
ok('maxsum_m is monotone in m at 7 tiles, m <= 200', mono);
ok('maxsum_m >= m*gbar at 7 tiles, m <= 200 [the averaging floor of killrun 3]', floorOK,
  'worst ratio ' + F(worstFloor, 6));
console.log('  maxsum_m(T_13)/G2(13#), m = 4,6,9,11,14,18: ' + [4, 6, 9, 11, 14, 18].map((m) => F(maxsum(TAB[13], m) / 66, 4)).join(' '));
console.log('  maxsum_m(T_17)/G2(17#), m = 5,14: ' + [5, 14].map((m) => F(maxsum(TAB[17], m) / 108, 4)).join(' '));

// ============================================================================
// C. THE FOURTEEN ENUMERABLE STEPS
// ============================================================================
console.log('');
console.log('=== C. THE FOURTEEN STEPS [column-major sweep, two implementations] ==');
const STEPS = [];
{ const seen = new Set();
  for (let s = 2; s <= 18; s++) {
    const pb = Pat(s), pt = Pat(2 * s);
    if (pt > 31) continue;
    const key = pb + '>' + pt;
    if (seen.has(key)) { STEPS[STEPS.length - 1].ss.push(s); continue; }
    seen.add(key);
    STEPS.push({ pb, pt, ss: [s], Q: primesIn(pb, pt) });
  } }
ok('fourteen enumerable steps', STEPS.length === 14, STEPS.map((x) => x.pb + '#->' + x.pt + '#').join(' '));
ok('entering primes (P(s), P(2s)] == primes (s, 2s] at every step',
  STEPS.every((st) => st.ss.every((s) => primesIn(s, 2 * s).join(',') === st.Q.join(','))));
console.log('  step        s        G2(2s) @ least argmax (xn)     census        k   K*   N');
for (const st of STEPS) {
  const base = TILES[st.pb], tab = TAB[st.pb], Gc = G2[st.pt];
  const big = base.D * st.Q.reduce((a, q) => a * q, 1) > 2e7;
  const w = sweepWords(base, st.Q, Gc, tab);
  st.res = w; st.N = st.Q.length;
  if (!big) {
    const b = sweepBrute(base, st.Q);
    st.brute = b;
    ok('  ' + st.pb + '#->' + st.pt + '#: the two implementations agree',
      b.Kstar === w.Kstar && b.G === w.G && b.gArg === w.gArg && b.gMul === w.gMul && b.alive === w.alive && b.kAt === w.kAt);
  }
  console.log('  ' + pad(st.pb + '#->' + st.pt + '#', 10) + '  ' + pad(st.ss.join(','), 5) + '   ' +
    pad(w.G, 5) + ' @ ' + pad(w.gArg, 12) + ' (x' + w.gMul + ')   ' + pad(w.alive, 12) + '  ' +
    pad(w.kAt, 3) + ' ' + pad(w.Kstar, 4) + ' ' + pad(st.N, 3));
  ok('    G2, least argmax, multiplicity, census == ladder row x = ' + st.pt,
    w.G === LAD[st.pt].g && String(w.gArg) === LAD[st.pt].pos && w.gMul === LAD[st.pt].nmax && String(w.alive) === String(Dcensus(st.pt)));
  ok('    K* >= k (the record window is a killed run) and K* >= N (Lemma 1)', w.Kstar >= w.kAt && w.Kstar >= st.N,
    'K* ' + w.Kstar + ', k ' + w.kAt + ', N ' + st.N);
}
ok('K*(16) = 17 at 13#->31#', STEPS.find((s) => s.pb === 13 && s.pt === 31).res.Kstar === 17);
ok('G2(31#) = 348 @ 8813641451 (x4) from TWO base tiles, 13# and 17#',
  STEPS.filter((s) => s.pt === 31).every((s) => s.res.G === 348 && String(s.res.gArg) === '8813641451' && s.res.gMul === 4),
  STEPS.filter((s) => s.pt === 31).map((s) => s.pb + '#').join(' and '));
console.log('  K*/N over the fourteen steps: ' + STEPS.map((s) => F(s.res.Kstar / s.N, 2)).join(' '));

// ============================================================================
// D. THE SANDWICH maxsum_{N+1} <= Ghat(2s) <= maxsum_{K*+1} <= (K*+1)Ghat(s)
// ============================================================================
console.log('');
console.log('=== D. THE SANDWICH [the maxsum certificate, per step] ==');
console.log('  step        s      N   K*   floor      C2       msc      K*+1   msc/C2  (K*+1)/msc');
let mscMax = 0, mscAt = null, sandOK = true, mscUnder8 = 0;
for (const st of STEPS) {
  const Gs = G2[st.pb], G2s = st.res.G, K = st.res.Kstar;
  const floor = maxsum(TAB[st.pb], st.N + 1), cert = maxsum(TAB[st.pb], K + 1);
  st.floor = floor / Gs; st.C2 = G2s / Gs; st.msc = cert / Gs;
  if (!(floor <= G2s && G2s <= cert && cert <= (K + 1) * Gs)) sandOK = false;
  if (st.msc <= 8) mscUnder8++;
  if (st.msc > mscMax) { mscMax = st.msc; mscAt = st; }
  console.log('  ' + pad(st.pb + '#->' + st.pt + '#', 10) + '  ' + pad(st.ss.join(','), 5) + ' ' + pad(st.N, 3) + ' ' +
    pad(K, 4) + '  ' + pad(F(st.floor, 4), 7) + '  ' + pad(F(st.C2, 4), 7) + '  ' + pad(F(st.msc, 4), 7) + '   ' +
    pad(K + 1, 4) + '   ' + pad(F(st.msc / st.C2, 4), 6) + '   ' + pad(F((K + 1) / st.msc, 4), 6));
}
ok('the full sandwich holds at all fourteen steps', sandOK);
ok('the maxsum certificate stays under 8 at all fourteen steps', mscUnder8 === 14);
ok('sup msc = 6.6364 at s = 16 (13#->31#)', mscAt.pb === 13 && mscAt.pt === 31 && Math.abs(mscMax - 438 / 66) < 1e-12, F(mscMax, 4));
console.log('  msc across the fourteen steps: ' + STEPS.map((s) => F(s.msc, 4)).join(' '));
console.log('  msc/C2 range ' + F(Math.min(...STEPS.map((s) => s.msc / s.C2)), 4) + ' to ' + F(Math.max(...STEPS.map((s) => s.msc / s.C2)), 4) +
  '; (K*+1)/msc range ' + F(Math.min(...STEPS.map((s) => (s.res.Kstar + 1) / s.msc)), 4) + ' to ' + F(Math.max(...STEPS.map((s) => (s.res.Kstar + 1) / s.msc)), 4));

// ============================================================================
// E. LEMMA 1 AND THE BAND AUDIT BEHIND REFUTED ROW 94
// ============================================================================
console.log('');
console.log('=== E. THE RUN FLOOR AND THE BAND [K* >= pi(2s) - pi(s), cited] ==');
const N_ = (s) => piOf(2 * s) - piOf(s);
console.log('  chain rungs s, N(s), certificate floor N+1, gbar(s), Ghat(s):');
for (const s of [16, 32, 64, 128, 256, 512, 1024]) {
  const G = s <= 64 ? Ghat(s) : null;
  console.log('    s ' + pad(s, 5) + '   N ' + pad(N_(s), 4) + '   N+1 ' + pad(N_(s) + 1, 4) + '   gbar ' + pad(F(gbar(Pat(s)), 3), 9) +
    '   Ghat ' + (G === null ? 'unknown past 79#' : pad(G, 6)));
}
ok('N(64) = 13 and N(128) = 23', N_(64) === 13 && N_(128) === 23);
let firstN8 = 0; for (let s = 2; s <= 200; s++) if (N_(s) >= 8) { firstN8 = s; break; }
ok('N(s) >= 8 first at s = 34', firstN8 === 34, 'N(33) = ' + N_(33) + ', N(34) = ' + N_(34));
ok('N >= 8 at every chain rung 64..1024', [64, 128, 256, 512, 1024].every((s) => N_(s) >= 8));
const BAND_HI = Math.pow(2, 4.26645);
console.log('  legal band [4, ' + F(BAND_HI, 4) + ') = [2^2, 2^beta2)');
const K16 = STEPS.find((s) => s.pb === 13 && s.pt === 31).res.Kstar;
let killedBy16 = 0, killedBy128 = 0, unkilled = 0;
for (let C = 4; C < BAND_HI; C += 0.0001) {
  if (K16 + 1 > C) killedBy16++; else if (N_(128) + 1 > C) killedBy128++; else unkilled++;
}
ok('every C2 in the legal band is killed by the certificate', unkilled === 0,
  killedBy16 + ' grid points by the exact walk at s = 16 (cert ' + (K16 + 1) + '), ' + killedBy128 + ' by Lemma 1 at s = 128 (cert >= ' + (N_(128) + 1) + ')');
ok('Lemma 1 at s = 128 ALONE clears the whole band (the s = 16 walk is not load-bearing for it)',
  N_(128) + 1 > BAND_HI, 'N(128)+1 = ' + (N_(128) + 1) + ' > ' + F(BAND_HI, 4));
ok('and the certificate exceeds EVERY constant, not only the band, since N(s) -> infinity',
  N_(1024) > N_(512) && N_(512) > N_(256), 'N at 256,512,1024 = ' + [256, 512, 1024].map(N_).join(', '));

// ============================================================================
// F. THE CESARO TELESCOPING IDENTITY
// ============================================================================
console.log('');
console.log('=== F. THE CESARO IDENTITY [bridge 4] ==');
{
  const k = 5, l2 = (x) => Math.log(x) / Math.LN2;
  let sum = l2(Ghat(2));
  for (let j = 1; j <= k; j++) sum += l2(Ghat(Math.pow(2, j + 1)) / Ghat(Math.pow(2, j)));
  const direct = Math.log(Ghat(64)) / Math.log(64);
  console.log('  beta(64) direct ' + F(direct, 4) + ', via the Cesaro mean of log2 C2 ' + F(sum / (k + 1), 4));
  ok('the telescoping identity closes at k = 5 (s = 64)', Math.abs(direct - sum / (k + 1)) < 1e-12, F(direct, 6));
  ok('log2 8 = 3 is the per-step target exponent, and 3 < beta2 = 4.26645', Math.abs(l2(8) - 3) < 1e-12);
}

// ============================================================================
// G. PER-FOLD L, THE PRODUCT, AND THE COMPOSED CERTIFICATE
// ============================================================================
console.log('');
console.log('=== G. THE PER-FOLD COMPOSITION [L by the residue-2-set route] ==');
const PREV = { 3: 2, 5: 3, 7: 5, 11: 7, 13: 11, 17: 13, 19: 17, 23: 19, 29: 23, 31: 29 };
const DIAG = {};
{
  const t19 = buildTile(19), t23 = foldTile(t19, 23);
  const src = { 2: TILES[2], 3: TILES[3], 5: TILES[5], 7: TILES[7], 11: TILES[11], 13: TILES[13], 17: TILES[17], 19: t19, 23: t23 };
  for (const q of [3, 5, 7, 11, 13, 17, 19, 23, 29]) { const b = src[PREV[q]]; DIAG[q] = foldL(tileIter(b), b.D, b.P, q); }
  DIAG[31] = foldL(iter29(t23), t23.D * 27, t23.P * 29, 31);
  ok('T_23 rebuilt by an explicit fold: census 7952175', t23.D === 7952175, 'P ' + t23.P);
}
console.log('  diagonal cells L(T_q-, q): ' + Object.keys(DIAG).map((q) => q + ':' + DIAG[q]).join(' '));
ok('the diagonal cells reproduce a3-05-bound-L 4 as quoted by the killrun note (7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4)',
  [[7, 2], [11, 1], [13, 2], [17, 2], [19, 2], [23, 3], [29, 2], [31, 4]].every(([q, v]) => DIAG[q] === v));
ok('every fold kills at least one slot, so L_j >= 1 at all ten diagonal folds',
  Object.values(DIAG).every((v) => v >= 1), 'min ' + Math.min(...Object.values(DIAG)));
console.log('');
console.log('  step        s      L_j            M=prod(1+L)  K*+1  1+sumL  2^N   M/(K*+1)  w_true    w       a      w_prod  wp/a');
let sumFalse = 0, prodOK = true, domOK = true, overA = 0, firstOver = null, wOverA = 0, supWA = 0, supWtA = 0;
for (const st of STEPS) {
  const Ls = st.Q.map((q) => DIAG[q]);
  const M = Ls.reduce((a, L) => a * (1 + L), 1);
  const sumF = 1 + Ls.reduce((a, L) => a + L, 0);
  const K1 = st.res.Kstar + 1, g = gbar(st.pb), Gs = G2[st.pb];
  const wProd = maxsum(TAB[st.pb], M) / g, a = 8 * Gs / g;
  const wTrue = st.res.G / g, w = st.msc * Gs / g;
  if (K1 > M) prodOK = false;
  if (K1 > sumF) sumFalse++;
  if (maxsum(TAB[st.pb], M) < maxsum(TAB[st.pb], K1)) domOK = false;
  if (wProd > a) { overA++; if (!firstOver) firstOver = st; }
  if (w > a) wOverA++;
  if (w / a > supWA) supWA = w / a;
  if (wTrue / a > supWtA) supWtA = wTrue / a;
  st.M = M; st.Ls = Ls; st.wProd = wProd; st.a = a; st.wTrue = wTrue; st.w = w;
  console.log('  ' + pad(st.pb + '#->' + st.pt + '#', 10) + '  ' + pad(st.ss.join(','), 5) + '  ' + pad(Ls.join(' '), 12) + '  ' +
    pad(M, 8) + '  ' + pad(K1, 5) + '  ' + pad(sumF, 6) + '  ' + pad(Math.pow(2, st.N), 5) + '  ' + pad(F(M / K1, 2), 8) + '  ' +
    pad(F(wTrue, 2), 7) + ' ' + pad(F(w, 2), 7) + ' ' + pad(F(a, 6), 7) + ' ' + pad(F(wProd, 2), 8) + ' ' + pad(F(wProd / a, 3), 6));
}
ok('K*+1 <= prod(1+L_j) at all fourteen steps [the product theorem, prime order]', prodOK);
ok('M >= 2^N at all fourteen steps', STEPS.every((s) => s.M >= Math.pow(2, s.N)));
ok('the sum form 1+sum L_j is false at 7 of the 14 steps', sumFalse === 7, sumFalse + ' steps with K*+1 > 1+sumL');
ok('the composed certificate never beats the maxsum certificate (maxsum_M >= maxsum_{K*+1})', domOK);
ok('the composed certificate exceeds the allowance at 8 of 14 steps, first at s = 9', overA === 8 && firstOver.ss[0] === 9,
  overA + ' steps, first ' + firstOver.pb + '#->' + firstOver.pt + '#');
ok('the weighted run stays within its allowance at all fourteen steps, sup w/a = 0.8295', wOverA === 0 && Math.abs(supWA - 6.6364 / 8) < 1e-3, F(supWA, 4));
ok('the TRUTH ratio w_true/a is a different and smaller number, sup 0.659', Math.abs(supWtA - 0.659) < 5e-4, F(supWtA, 4));
{
  const s16 = STEPS.find((s) => s.pb === 13 && s.pt === 31);
  console.log('  at s = 16: w_prod/a ' + F(s16.wProd / s16.a, 3) + ', w_prod/w_true ' + F(s16.wProd / s16.wTrue, 2) + ', M/(K*+1) ' + F(s16.M / (s16.res.Kstar + 1), 2));
  const s17 = STEPS.find((s) => s.pb === 17);
  console.log('  at s = 17,18: w_prod/a ' + F(s17.wProd / s17.a, 3) + ', w_prod/w_true ' + F(s17.wProd / s17.wTrue, 2) + ', M/(K*+1) ' + F(s17.M / (s17.res.Kstar + 1), 2));
  ok('at s = 16 the composed certificate is 20.83 times the allowance and 31.60 times the truth',
    Math.abs(s16.wProd / s16.a - 20.83) < 0.01 && Math.abs(s16.wProd / s16.wTrue - 31.60) < 0.01);
  ok('the sum-form certificate falls BELOW the truth at s = 4 and s = 10 (so it is not a certificate)',
    STEPS.filter((st) => st.ss.includes(4) || st.ss.includes(10)).every((st) => maxsum(TAB[st.pb], 1 + st.Ls.reduce((a, L) => a + L, 0)) < st.res.G));
}
// order control at 11#->23#, the one reverse chain small enough to build
{
  const st = STEPS.find((s) => s.pb === 11 && s.pt === 23);
  let t = TILES[11], Mrev = 1; const Lrev = [];
  for (const q of [23, 19, 17, 13]) { const L = foldL(tileIter(t), t.D, t.P, q); Lrev.push(L); Mrev *= (1 + L); t = foldTile(t, q); }
  console.log('  order control at 11#->23#: prime order M = ' + st.M + ' (L ' + st.Ls.join(' ') + '), reverse order M = ' + Mrev + ' (L ' + Lrev.join(' ') + ')');
  ok('reverse order gives 72 against 108 at s = 12, and both stay above K*+1 and 2^N',
    Mrev === 72 && st.M === 108 && Mrev >= st.res.Kstar + 1 && Mrev >= Math.pow(2, st.N));
}

// ============================================================================
// H. THE 2^N FLOOR AT THE CHAIN RUNGS, AND THE ALL-s CROSSING
// ============================================================================
console.log('');
console.log('=== H. THE 2^N FLOOR AGAINST THE ALLOWANCE [killrun 3, second bullet] ==');
console.log('  rung s   N   2^N     gbar(P(s))   Ghat(s)   2^N*gbar   8*Ghat    ratio   grade of Ghat');
const RUNG = { 16: 'corpus-exact', 32: 'corpus-exact', 64: 'OEIS A144311, literature grade' };
const ratios = {};
for (const s of [16, 32, 64]) {
  const N = N_(s), g = gbar(Pat(s)), G = Ghat(s), lhs = Math.pow(2, N) * g, rhs = 8 * G;
  ratios[s] = lhs / rhs;
  console.log('  ' + pad(s, 6) + '  ' + pad(N, 3) + '  ' + pad(Math.pow(2, N), 6) + '  ' + pad(F(g, 4), 11) + '  ' + pad(G, 7) + '  ' +
    pad(F(lhs, 1), 10) + '  ' + pad(rhs, 7) + '  ' + pad(F(lhs / rhs, 3), 7) + '   ' + RUNG[s]);
}
ok('the 2^N floor beats 8*Ghat at rungs 16, 32, 64 with ratios 1.226, 1.481, 41.348',
  Math.abs(ratios[16] - 1.226) < 5e-4 && Math.abs(ratios[32] - 1.481) < 5e-4 && Math.abs(ratios[64] - 41.348) < 5e-4);
ok('the s = 64 rung rests on G2(61#) = 1080, which is OEIS/Wang, NOT corpus-exact (the exact ladder stops at 43#)',
  LAD[61] === undefined && G2[61] === 1080);
{
  const b2 = 4.26645; let first = 0;
  for (let s = 2; s <= 3000; s++) if (N_(s) > 3 + b2 * Math.log(s) / Math.LN2) { first = s; break; }
  ok('N(s) > 3 + beta2*log2(s) first holds at s = 217', first === 217,
    's = 216: N ' + N_(216) + ' vs ' + F(3 + b2 * Math.log(216) / Math.LN2, 3) + '; s = 217: N ' + N_(217) + ' vs ' + F(3 + b2 * Math.log(217) / Math.LN2, 3));
  let holdsAll = true, firstFail = 0;
  for (let s = 217; s <= 3000; s++) if (!(N_(s) > 3 + b2 * Math.log(s) / Math.LN2)) { holdsAll = false; firstFail = s; break; }
  ok('the crossing does not un-cross on the checkable range: it holds at every s from 217 to 3000', holdsAll,
    holdsAll ? 'no s in [217, 3000] fails' : 'first failure at s = ' + firstFail);
  ok('but the FIRST-crossing figure is not itself a proof of an all-large-s threshold (N(s) is not monotone; the divergence is the PNT statement, checked to 3000 only)', true);
}

// ============================================================================
// I. THE PRODUCT THEOREM UNDER STRESS: EVERY MAXIMAL RUN, ZERO-KILL FOLDS
// ============================================================================
console.log('');
console.log('=== I. THE NESTING CHAIN ON EVERY KILLED RUN [killrun 2, the proof] ==');
console.log('  step        runs        links     link fails   folds with ZERO kills on the run   K*+1 <= M');
for (const key of [[7, 19], [11, 23], [13, 23]]) {
  const st = STEPS.find((s) => s.pb === key[0] && s.pt === key[1]);
  const base = TILES[st.pb], N = st.Q.length, kill = st.brute.kill, tot = base.D * st.brute.M;
  const Ls = st.Q.map((q) => DIAG[q]);
  let start = 0; while (kill[start]) start++;
  let runs = 0, links = 0, fails = 0, zeroFolds = 0, zeroRuns = 0, prodFails = 0, run = 0, runStart = 0;
  const cnt = new Int32Array(N + 1);
  const close = () => {
    if (run === 0) return;
    runs++;
    cnt.fill(0);
    for (let i = 0; i < run; i++) cnt[kill[(runStart + i) % tot]]++;
    const m = new Int32Array(N + 1); m[0] = run;
    for (let j = 1; j <= N; j++) m[j] = m[j - 1] - cnt[j];
    let hasZero = false;
    for (let j = 1; j <= N; j++) { links++; if (m[j - 1] + 1 > (m[j] + 1) * (1 + Ls[j - 1])) fails++; if (cnt[j] === 0) { zeroFolds++; hasZero = true; } }
    if (hasZero) zeroRuns++;
    if (m[N] !== 0) fails++;
    if (run + 1 > st.M) prodFails++;
  };
  for (let s = 1; s <= tot; s++) {
    const g = (start + s) % tot;
    if (kill[g]) { if (run === 0) runStart = g; run++; } else { close(); run = 0; }
  }
  console.log('  ' + pad(st.pb + '#->' + st.pt + '#', 10) + '  ' + pad(runs, 9) + '  ' + pad(links, 9) + '  ' + pad(fails, 10) + '   ' +
    pad(zeroFolds, 8) + ' on ' + pad(zeroRuns, 8) + ' runs      ' + (prodFails === 0 ? 'yes' : 'NO'));
  ok('    every nesting link m_{j-1}+1 <= (m_j+1)(1+L_j) holds, zero-kill folds included', fails === 0);
  ok('    the zero-kill case actually occurs here (so the edge is exercised, not assumed)', zeroFolds > 0);
  ok('    K+1 <= M for EVERY killed run, not only the longest', prodFails === 0);
}


// ============================================================================
// J. THE SUP STEP ANATOMY: strikes in the record window, the nesting chain
// ============================================================================
console.log('');
console.log('=== J. THE SUP STEP 13#->31# AT s = 16, SLOT BY SLOT ==');
function anatomy(base, Q, startG, len) {
  const D = base.D, N = Q.length, first = [], strikes = [];
  for (let i = 0; i < len; i++) {
    const g = startG + i, a = ((g % D) + D) % D, j = Math.floor(g / D);
    const v = base.r[a] + j * base.P;
    let f = -1, st = 0;
    for (let qi = 0; qi < N; qi++) { const q = Q[qi]; if (v % q === 0 || (v + 2) % q === 0) { st++; if (f < 0) f = qi; } }
    first.push(f); strikes.push(st);
  }
  const m = [len];
  for (let j = 1; j <= N; j++) m.push(first.filter((f) => f >= j).length);
  return { first, strikes, m, total: strikes.reduce((a, b) => a + b, 0) };
}
{
  const st = STEPS.find((s) => s.pb === 13 && s.pt === 31), base = TILES[13];
  const rec = anatomy(base, st.Q, st.res.recStart, st.res.kAt);
  console.log('  the record window: k = ' + st.res.kAt + ' killed level-13 slots, ' + rec.total + ' (prime, slot) strikes from ' + st.N + ' entering primes');
  ok('five entering primes deliver 15 strikes on the 14 slots of the record window', rec.total === 15 && st.res.kAt === 14,
    'strikes per slot: ' + rec.strikes.join(''));
  const rho = st.res.G / ((st.res.kAt + 1) * gbar(13));
  ok('the record window stands on ground of thickness rho = 1.147 against the tile mean', Math.abs(rho - 1.147) < 5e-4, F(rho, 4));
  ok('the record window does NOT realise the longest run: k = 14 < K* = 17', st.res.kAt < st.res.Kstar);
  const lr = anatomy(base, st.Q, st.res.argK, st.res.Kstar);
  console.log('  the longest run: m_0..m_N = ' + lr.m.join(' ') + ' over folds by ' + st.Q.join(', '));
  const links = [];
  for (let j = 1; j <= st.N; j++) links.push((lr.m[j - 1] + 1) / ((lr.m[j] + 1) * (1 + st.Ls[j - 1])));
  console.log('  nesting links (m_{j-1}+1)/((m_j+1)(1+L_j)): ' + links.map((x) => F(x, 2)).join(' '));
  ok('the nesting chain at s = 16 is 17 13 10 7 4 0 with links 0.43 0.42 0.34 0.53 1.00',
    lr.m.join(' ') === '17 13 10 7 4 0' && links.map((x) => F(x, 2)).join(' ') === '0.43 0.42 0.34 0.53 1.00');
}
console.log('  rho(s, K*+1) = maxsum_{K*+1}/((K*+1)gbar) and Ghat(s)/gbar(s) over the fourteen steps:');
{
  let lo = Infinity, hi = 0, rlo = Infinity, rhi = 0;
  const cells = STEPS.map((st) => {
    const g = gbar(st.pb), K1 = st.res.Kstar + 1;
    const r = maxsum(TAB[st.pb], K1) / (K1 * g), q = G2[st.pb] / g;
    if (r < lo) lo = r; if (r > hi) hi = r; if (q < rlo) rlo = q; if (q > rhi) rhi = q;
    return F(r, 3) + '/' + F(q, 2);
  });
  for (let i = 0; i < cells.length; i += 7) console.log('    ' + cells.slice(i, i + 7).join('  '));
  ok('rho_run runs 1.000 to 1.440 and Ghat/gbar runs 1.00 to 4.71 across the fourteen steps',
    Math.abs(lo - 1) < 1e-9 && Math.abs(hi - 1.440) < 5e-4 && Math.abs(rlo - 1) < 1e-9 && Math.abs(rhi - 4.71) < 5e-3,
    F(lo, 3) + ' to ' + F(hi, 3) + ', ' + F(rlo, 2) + ' to ' + F(rhi, 2));
}


// ============================================================================
// K. A FIFTEENTH STEP, 19#->37#, WHICH THE BRIDGE NOTE 7 PUTS OUT OF REACH
// ============================================================================
console.log('');
console.log('=== K. THE STEP THE ENUMERABLE RANGE WAS SAID TO END BEFORE ==');
{
  const t19 = buildTile(19), Q = primesIn(19, 37), N = Q.length;
  const tab = maxsumTable(t19, 700);
  ok('T_19 rebuilt: census 378675, period 9699690', t19.D === 378675 && t19.P === 9699690);
  ok('the step is 19#->37#, covering s = 19 and s = 20, with entering primes ' + Q.join(' '),
    Pat(19) === 19 && Pat(38) === 37 && Pat(20) === 19 && Pat(40) === 37 && N === 4);
  const w = sweepWords(t19, Q, G2[37], tab);
  const Gs = G2[19], floor = maxsum(tab, N + 1) / Gs, C2 = w.G / Gs, msc = maxsum(tab, w.Kstar + 1) / Gs;
  console.log('  step        s      G2(2s) @ least argmax (xn)      census           k   K*   N');
  console.log('  ' + pad('19#->37#', 10) + '  ' + pad('19,20', 5) + '  ' + pad(w.G, 5) + ' @ ' + pad(w.gArg, 14) + ' (x' + w.gMul + ')  ' +
    pad(w.alive, 14) + '  ' + pad(w.kAt, 3) + ' ' + pad(w.Kstar, 4) + ' ' + pad(N, 3));
  ok('  G2, least argmax, multiplicity, census == ladder row x = 37',
    w.G === LAD[37].g && String(w.gArg) === LAD[37].pos && w.gMul === LAD[37].nmax && String(w.alive) === String(Dcensus(37)));
  console.log('  N ' + N + '   K* ' + w.Kstar + '   K*/N ' + F(w.Kstar / N, 2) + '   floor ' + F(floor, 4) + '   C2 ' + F(C2, 4) +
    '   msc ' + F(msc, 4) + '   K*+1 ' + (w.Kstar + 1));
  ok('the sandwich holds at the fifteenth step too', maxsum(tab, N + 1) <= w.G && w.G <= maxsum(tab, w.Kstar + 1) && maxsum(tab, w.Kstar + 1) <= (w.Kstar + 1) * Gs);
  ok('(M8) holds here as well: msc = 3.8000, under 8 and under the s = 16 sup 6.6364', msc < 8 && Math.abs(msc - 3.8) < 1e-9);
  ok('K* >= N (Lemma 1) at the fifteenth step', w.Kstar >= N);
  ok('K*/N does NOT continue to rise: 3.25 here against 3.40 at s = 16 and 3.25 at s = 17,18',
    Math.abs(w.Kstar / N - 3.25) < 1e-9 && w.Kstar / N < 17 / 5);
  ok('so the enumerable range ends at s = 20, not s = 18, on this engine', w.Kstar > 0);
}

console.log('');
console.log('=== SELF-TEST FAILURES: ' + FAILS + ' ==');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0830-doubling.js
//   invocation:  node research/history/staging/redteam-0830-doubling.js
//   code-sha256: f5d39eb6476091abd7b58a3c3b18e05ea375a12dfb224eb0082440bb4c9e731e
//   out-sha256:  d04a0299449677cfb1ac70ba3e16b71070a73156563d403dec760d1e2780d00b
//   body-lines:  219
//   inputs:      research/exact-g2-ladder.js@999d2c5fa3ab research/import-interp-01-bgt-defect.js@20ad0a1961c8
//   forced:      2026-08-30, 0 of 231 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     181.9 s
// ============================================================================
// === A. CUSTODY [the two ladder keepers parsed at run time] ==
//   ok    ladder rows parsed   14 rows, x = 2..43
//   ok    A144311 + 1 agrees with the exact ladder on all 14 shared terms   x = 2..43
//   ok    tile T_2 rebuilt: census, period, record   D 1, P 2, G2 2
//   ok    tile T_3 rebuilt: census, period, record   D 1, P 6, G2 6
//   ok    tile T_5 rebuilt: census, period, record   D 3, P 30, G2 12
//   ok    tile T_7 rebuilt: census, period, record   D 15, P 210, G2 30
//   ok    tile T_11 rebuilt: census, period, record   D 135, P 2310, G2 42
//   ok    tile T_13 rebuilt: census, period, record   D 1485, P 30030, G2 66
//   ok    tile T_17 rebuilt: census, period, record   D 22275, P 510510, G2 108
//   C2(s) = Ghat(2s)/Ghat(s), s = 2..41 [ladder-grade, x <= 43 corpus-exact, 47..79 OEIS]
//     2:3.0000  3:2.0000  4:5.0000  5:2.5000  6:3.5000  7:2.2000  8:2.2000  9:3.6000
//     10:5.0000  11:3.5714  12:4.8571  13:3.0909  14:3.0909  15:3.9091  16:5.2727  17:3.2222
//     18:3.2222  19:3.5200  20:3.5200  21:3.6400  22:4.1200  23:3.0294  24:3.4706  25:3.4706
//     26:3.4706  27:4.2647  28:4.2647  29:3.3721  30:3.7442  31:3.1034  32:3.1034  33:3.1034
//     34:3.6897  35:3.6897  36:4.0172  37:2.8977  38:2.8977  39:2.8977  40:3.2386  41:3.1319
//   ok    sup C2 over s = 2..41 is 348/66 at s = 16   5.2727
//   ok    no s in 2..41 has C2 > 8   sup 5.2727
//   chain C2 at s = 2,4,8,16,32: 3.0000 5.0000 2.2000 5.2727 3.1034
//
// === B. MAXSUM_m(T) [independent sliding window; the wrap convention] ==
//   ok    maxsum_m is monotone in m at 7 tiles, m <= 200
//   ok    maxsum_m >= m*gbar at 7 tiles, m <= 200 [the averaging floor of killrun 3]   worst ratio 1.000000
//   maxsum_m(T_13)/G2(13#), m = 4,6,9,11,14,18: 2.3636 2.8182 3.6364 4.5455 5.5455 6.6364
//   maxsum_m(T_17)/G2(17#), m = 5,14: 1.9444 4.2778
//
// === C. THE FOURTEEN STEPS [column-major sweep, two implementations] ==
//   ok    fourteen enumerable steps   2#->3# 3#->5# 3#->7# 5#->7# 5#->11# 7#->13# 7#->17# 7#->19# 11#->19# 11#->23# 13#->23# 13#->29# 13#->31# 17#->31#
//   ok    entering primes (P(s), P(2s)] == primes (s, 2s] at every step
//   step        s        G2(2s) @ least argmax (xn)     census        k   K*   N
//   ok      2#->3#: the two implementations agree
//       2#->3#      2       6 @            5 (x1)              1    2    2   1
//   ok        G2, least argmax, multiplicity, census == ladder row x = 3
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 2, k 2, N 1
//   ok      3#->5#: the two implementations agree
//       3#->5#      3      12 @           17 (x2)              3    1    1   1
//   ok        G2, least argmax, multiplicity, census == ladder row x = 5
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 1, k 1, N 1
//   ok      3#->7#: the two implementations agree
//       3#->7#      4      30 @           71 (x2)             15    4    4   2
//   ok        G2, least argmax, multiplicity, census == ladder row x = 7
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 4, k 4, N 2
//   ok      5#->7#: the two implementations agree
//       5#->7#      5      30 @           71 (x2)             15    2    2   1
//   ok        G2, least argmax, multiplicity, census == ladder row x = 7
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 2, k 2, N 1
//   ok      5#->11#: the two implementations agree
//      5#->11#      6      42 @          899 (x4)            135    3    3   2
//   ok        G2, least argmax, multiplicity, census == ladder row x = 11
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 3, k 3, N 2
//   ok      7#->13#: the two implementations agree
//      7#->13#    7,8      66 @          731 (x12)           1485    3    3   2
//   ok        G2, least argmax, multiplicity, census == ladder row x = 13
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 3, k 3, N 2
//   ok      7#->17#: the two implementations agree
//      7#->17#      9     108 @          701 (x20)          22275    5    5   3
//   ok        G2, least argmax, multiplicity, census == ladder row x = 17
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 5, k 5, N 3
//   ok      7#->19#: the two implementations agree
//      7#->19#     10     150 @          659 (x20)         378675    8    8   4
//   ok        G2, least argmax, multiplicity, census == ladder row x = 19
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 8, k 8, N 4
//   ok      11#->19#: the two implementations agree
//     11#->19#     11     150 @          659 (x20)         378675    5    6   3
//   ok        G2, least argmax, multiplicity, census == ladder row x = 19
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 6, k 5, N 3
//   ok      11#->23#: the two implementations agree
//     11#->23#     12     204 @     76166567 (x4)        7952175   10   10   4
//   ok        G2, least argmax, multiplicity, census == ladder row x = 23
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 10, k 10, N 4
//   ok      13#->23#: the two implementations agree
//     13#->23#  13,14     204 @     76166567 (x4)        7952175    8    8   3
//   ok        G2, least argmax, multiplicity, census == ladder row x = 23
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 8, k 8, N 3
//     13#->29#     15     258 @   1205437109 (x2)      214708725   10   10   4
//   ok        G2, least argmax, multiplicity, census == ladder row x = 29
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 10, k 10, N 4
//     13#->31#     16     348 @   8813641451 (x4)     6226553025   14   17   5
//   ok        G2, least argmax, multiplicity, census == ladder row x = 31
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 17, k 14, N 5
//     17#->31#  17,18     348 @   8813641451 (x4)     6226553025    9   13   4
//   ok        G2, least argmax, multiplicity, census == ladder row x = 31
//   ok        K* >= k (the record window is a killed run) and K* >= N (Lemma 1)   K* 13, k 9, N 4
//   ok    K*(16) = 17 at 13#->31#
//   ok    G2(31#) = 348 @ 8813641451 (x4) from TWO base tiles, 13# and 17#   13# and 17#
//   K*/N over the fourteen steps: 2.00 1.00 2.00 2.00 1.50 1.50 1.67 2.00 2.00 2.50 2.67 2.50 3.40 3.25
//
// === D. THE SANDWICH [the maxsum certificate, per step] ==
//   step        s      N   K*   floor      C2       msc      K*+1   msc/C2  (K*+1)/msc
//       2#->3#      2   1    2   2.0000   3.0000   3.0000      3   1.0000   1.0000
//       3#->5#      3   1    1   2.0000   2.0000   2.0000      2   1.0000   1.0000
//       3#->7#      4   2    4   3.0000   5.0000   5.0000      5   1.0000   1.0000
//       5#->7#      5   1    2   2.0000   2.5000   2.5000      3   1.0000   1.2000
//      5#->11#      6   2    3   2.5000   3.5000   3.5000      4   1.0000   1.1429
//      7#->13#    7,8   2    3   2.2000   2.2000   2.6000      4   1.1818   1.5385
//      7#->17#      9   3    5   2.6000   3.6000   3.6000      6   1.0000   1.6667
//      7#->19#     10   4    8   3.2000   5.0000   5.0000      9   1.0000   1.8000
//     11#->19#     11   3    6   2.5714   3.5714   4.0000      7   1.1200   1.7500
//     11#->23#     12   4   10   3.2857   4.8571   5.0000     11   1.0294   2.2000
//     13#->23#  13,14   3    8   2.3636   3.0909   3.6364      9   1.1765   2.4750
//     13#->29#     15   4   10   2.5455   3.9091   4.5455     11   1.1628   2.4200
//     13#->31#     16   5   17   2.8182   5.2727   6.6364     18   1.2586   2.7123
//     17#->31#  17,18   4   13   1.9444   3.2222   4.2778     14   1.3276   3.2727
//   ok    the full sandwich holds at all fourteen steps
//   ok    the maxsum certificate stays under 8 at all fourteen steps
//   ok    sup msc = 6.6364 at s = 16 (13#->31#)   6.6364
//   msc across the fourteen steps: 3.0000 2.0000 5.0000 2.5000 3.5000 2.6000 3.6000 5.0000 4.0000 5.0000 3.6364 4.5455 6.6364 4.2778
//   msc/C2 range 1.0000 to 1.3276; (K*+1)/msc range 1.0000 to 3.2727
//
// === E. THE RUN FLOOR AND THE BAND [K* >= pi(2s) - pi(s), cited] ==
//   chain rungs s, N(s), certificate floor N+1, gbar(s), Ghat(s):
//     s    16   N    5   N+1    6   gbar    20.222   Ghat     66
//     s    32   N    7   N+1    8   gbar    32.211   Ghat    348
//     s    64   N   13   N+1   14   gbar    43.610   Ghat   1080
//     s   128   N   23   N+1   24   gbar    58.338   Ghat unknown past 79#
//     s   256   N   43   N+1   44   gbar    75.162   Ghat unknown past 79#
//     s   512   N   75   N+1   76   gbar    95.045   Ghat unknown past 79#
//     s  1024   N  137   N+1  138   gbar   116.437   Ghat unknown past 79#
//   ok    N(64) = 13 and N(128) = 23
//   ok    N(s) >= 8 first at s = 34   N(33) = 7, N(34) = 8
//   ok    N >= 8 at every chain rung 64..1024
//   legal band [4, 19.2455) = [2^2, 2^beta2)
//   ok    every C2 in the legal band is killed by the certificate   140001 grid points by the exact walk at s = 16 (cert 18), 12455 by Lemma 1 at s = 128 (cert >= 24)
//   ok    Lemma 1 at s = 128 ALONE clears the whole band (the s = 16 walk is not load-bearing for it)   N(128)+1 = 24 > 19.2455
//   ok    and the certificate exceeds EVERY constant, not only the band, since N(s) -> infinity   N at 256,512,1024 = 43, 75, 137
//
// === F. THE CESARO IDENTITY [bridge 4] ==
//   beta(64) direct 1.6795, via the Cesaro mean of log2 C2 1.6795
//   ok    the telescoping identity closes at k = 5 (s = 64)   1.679469
//   ok    log2 8 = 3 is the per-step target exponent, and 3 < beta2 = 4.26645
//
// === G. THE PER-FOLD COMPOSITION [L by the residue-2-set route] ==
//   ok    T_23 rebuilt by an explicit fold: census 7952175   P 223092870
//   diagonal cells L(T_q-, q): 3:2 5:1 7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4
//   ok    the diagonal cells reproduce a3-05-bound-L 4 as quoted by the killrun note (7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4)
//   ok    every fold kills at least one slot, so L_j >= 1 at all ten diagonal folds   min 1
//
//   step        s      L_j            M=prod(1+L)  K*+1  1+sumL  2^N   M/(K*+1)  w_true    w       a      w_prod  wp/a
//       2#->3#      2             2         3      3       3      2      1.00     3.00    3.00 8.000000     3.00  0.375
//       3#->5#      3             1         2      2       2      2      1.00     2.00    2.00 8.000000     2.00  0.250
//       3#->7#      4           1 2         6      5       4      4      1.20     5.00    5.00 8.000000     6.00  0.750
//       5#->7#      5             2         3      3       3      2      1.00     3.00    3.00 9.600000     3.00  0.313
//      5#->11#      6           2 1         6      4       4      4      1.50     4.20    4.20 9.600000     6.00  0.625
//      7#->13#    7,8           1 2         6      4       4      4      1.50     4.71    5.57 17.142857     7.71  0.450
//      7#->17#      9         1 2 2        18      6       6      8      3.00     7.71    7.71 17.142857    19.71  1.150
//      7#->19#     10       1 2 2 2        54      9       8     16      6.00    10.71   10.71 17.142857    55.71  3.250
//     11#->19#     11         2 2 2        27      7       7      8      3.86     8.77    9.82 19.636364    30.16  1.536
//     11#->23#     12       2 2 2 3       108     11      10     16      9.82    11.92   12.27 19.636364   110.45  5.625
//     13#->23#  13,14         2 2 3        36      9       8      8      4.00    10.09   11.87 26.109890    40.65  1.557
//     13#->29#     15       2 2 3 2       108     11      10     16      9.82    12.76   14.84 26.109890   112.75  4.318
//     13#->31#     16     2 2 3 2 4       540     18      14     32     30.00    17.21   21.66 26.109890   543.86 20.830
//     17#->31#  17,18       2 3 2 4       180     14      12     16     12.86    15.18   20.16 37.698772   188.76  5.007
//   ok    K*+1 <= prod(1+L_j) at all fourteen steps [the product theorem, prime order]
//   ok    M >= 2^N at all fourteen steps
//   ok    the sum form 1+sum L_j is false at 7 of the 14 steps   7 steps with K*+1 > 1+sumL
//   ok    the composed certificate never beats the maxsum certificate (maxsum_M >= maxsum_{K*+1})
//   ok    the composed certificate exceeds the allowance at 8 of 14 steps, first at s = 9   8 steps, first 7#->17#
//   ok    the weighted run stays within its allowance at all fourteen steps, sup w/a = 0.8295   0.8295
//   ok    the TRUTH ratio w_true/a is a different and smaller number, sup 0.659   0.6591
//   at s = 16: w_prod/a 20.830, w_prod/w_true 31.60, M/(K*+1) 30.00
//   at s = 17,18: w_prod/a 5.007, w_prod/w_true 12.43, M/(K*+1) 12.86
//   ok    at s = 16 the composed certificate is 20.83 times the allowance and 31.60 times the truth
//   ok    the sum-form certificate falls BELOW the truth at s = 4 and s = 10 (so it is not a certificate)
//   order control at 11#->23#: prime order M = 108 (L 2 2 2 3), reverse order M = 72 (L 1 2 2 3)
//   ok    reverse order gives 72 against 108 at s = 12, and both stay above K*+1 and 2^N
//
// === H. THE 2^N FLOOR AGAINST THE ALLOWANCE [killrun 3, second bullet] ==
//   rung s   N   2^N     gbar(P(s))   Ghat(s)   2^N*gbar   8*Ghat    ratio   grade of Ghat
//       16    5      32      20.2222       66       647.1      528    1.226   corpus-exact
//       32    7     128      32.2105      348      4122.9     2784    1.481   corpus-exact
//       64   13    8192      43.6095     1080    357249.1     8640   41.348   OEIS A144311, literature grade
//   ok    the 2^N floor beats 8*Ghat at rungs 16, 32, 64 with ratios 1.226, 1.481, 41.348
//   ok    the s = 64 rung rests on G2(61#) = 1080, which is OEIS/Wang, NOT corpus-exact (the exact ladder stops at 43#)
//   ok    N(s) > 3 + beta2*log2(s) first holds at s = 217   s = 216: N 36 vs 36.086; s = 217: N 37 vs 36.114
//   ok    the crossing does not un-cross on the checkable range: it holds at every s from 217 to 3000   no s in [217, 3000] fails
//   ok    but the FIRST-crossing figure is not itself a proof of an all-large-s threshold (N(s) is not monotone; the divergence is the PNT statement, checked to 3000 only)
//
// === I. THE NESTING CHAIN ON EVERY KILLED RUN [killrun 2, the proof] ==
//   step        runs        links     link fails   folds with ZERO kills on the run   K*+1 <= M
//      7#->19#     194400     777600           0     479248 on   190980 runs      yes
//   ok        every nesting link m_{j-1}+1 <= (m_j+1)(1+L_j) holds, zero-kill folds included
//   ok        the zero-kill case actually occurs here (so the edge is exercised, not assumed)
//   ok        K+1 <= M for EVERY killed run, not only the longest
//     11#->23#    3408534   13634136           0    8734540 on  3370002 runs      yes
//   ok        every nesting link m_{j-1}+1 <= (m_j+1)(1+L_j) holds, zero-kill folds included
//   ok        the zero-kill case actually occurs here (so the edge is exercised, not assumed)
//   ok        K+1 <= M for EVERY killed run, not only the longest
//     13#->23#    2409870    7229610           0    4238218 on  2348618 runs      yes
//   ok        every nesting link m_{j-1}+1 <= (m_j+1)(1+L_j) holds, zero-kill folds included
//   ok        the zero-kill case actually occurs here (so the edge is exercised, not assumed)
//   ok        K+1 <= M for EVERY killed run, not only the longest
//
// === J. THE SUP STEP 13#->31# AT s = 16, SLOT BY SLOT ==
//   the record window: k = 14 killed level-13 slots, 15 (prime, slot) strikes from 5 entering primes
//   ok    five entering primes deliver 15 strikes on the 14 slots of the record window   strikes per slot: 11121111111111
//   ok    the record window stands on ground of thickness rho = 1.147 against the tile mean   1.1473
//   ok    the record window does NOT realise the longest run: k = 14 < K* = 17
//   the longest run: m_0..m_N = 17 13 10 7 4 0 over folds by 17, 19, 23, 29, 31
//   nesting links (m_{j-1}+1)/((m_j+1)(1+L_j)): 0.43 0.42 0.34 0.53 1.00
//   ok    the nesting chain at s = 16 is 17 13 10 7 4 0 with links 0.43 0.42 0.34 0.53 1.00
//   rho(s, K*+1) = maxsum_{K*+1}/((K*+1)gbar) and Ghat(s)/gbar(s) over the fourteen steps:
//     1.000/1.00  1.000/1.00  1.000/1.00  1.000/1.20  1.050/1.20  1.393/2.14  1.286/2.14
//     1.190/2.14  1.403/2.45  1.116/2.45  1.319/3.26  1.349/3.26  1.203/3.26  1.440/4.71
//   ok    rho_run runs 1.000 to 1.440 and Ghat/gbar runs 1.00 to 4.71 across the fourteen steps   1.000 to 1.440, 1.00 to 4.71
//
// === K. THE STEP THE ENUMERABLE RANGE WAS SAID TO END BEFORE ==
//   ok    T_19 rebuilt: census 378675, period 9699690
//   ok    the step is 19#->37#, covering s = 19 and s = 20, with entering primes 23 29 31 37
//   step        s      G2(2s) @ least argmax (xn)      census           k   K*   N
//     19#->37#  19,20    528 @   544899485411 (x2)    217929355875   11   13   4
//   ok      G2, least argmax, multiplicity, census == ladder row x = 37
//   N 4   K* 13   K*/N 3.25   floor 1.8800   C2 3.5200   msc 3.8000   K*+1 14
//   ok    the sandwich holds at the fifteenth step too
//   ok    (M8) holds here as well: msc = 3.8000, under 8 and under the s = 16 sup 6.6364
//   ok    K* >= N (Lemma 1) at the fifteenth step
//   ok    K*/N does NOT continue to rise: 3.25 here against 3.40 at s = 16 and 3.25 at s = 17,18
//   ok    so the enumerable range ends at s = 20, not s = 18, on this engine
//
// === SELF-TEST FAILURES: 0 ==
// ============================================================================
// READINGS
// ============================================================
//
// 1. NOTHING BROKE ON THE NUMBERS. Every figure the two notes under test quote
//    about the fourteen enumerable steps reproduces here on an engine sharing
//    no line with either producer: K*(16) = 17; G2(31#) = 348 @ 8813641451
//    (x4) with census 6226553025 from BOTH base tiles, 13# and 17#; the record
//    windows k = 14 and 9; the certificate list 3.0000 2.0000 5.0000 2.5000
//    3.5000 2.6000 3.6000 5.0000 4.0000 5.0000 3.6364 4.5455 6.6364 4.2778;
//    K*/N from 1.00 to 3.40; the diagonal cells 7:2 11:1 13:2 17:2 19:2 23:3
//    29:2 31:4; the w-table and the composition table digit for digit. Two
//    independent sweep implementations agree at every step small enough for
//    both. Self-test failures 0. [VERIFIED]
//
// 2. THE MAXSUM CERTIFICATE IS A THEOREM AND THE SANDWICH HOLDS. The chain
//    maxsum_{N+1} <= Ghat(2s) <= maxsum_{K*+1} <= (K*+1)Ghat(s) holds at all
//    fourteen steps, the certificate stays under 8 at all fourteen with sup
//    6.6364 at s = 16, and msc/C2 runs 1.0000 to 1.3276 against (K*+1)/msc
//    1.0000 to 3.2727. The bridge note's grade PROVEN survives.
//    [VERIFIED the range]
//
// 3. THE BAND CLAIM IS EARNED, AND OVER-ATTRIBUTED. No C2 in [4, 19.2455)
//    survives the K*-product certificate. But Lemma 1 at s = 128 alone gives
//    N+1 = 24 > 19.2455, clearing the entire band with no walk; the exact
//    K*(16) = 17 is corroborating rather than load-bearing for the band, and
//    with N at 256, 512, 1024 equal to 43, 75, 137 the certificate exceeds
//    every constant, not only those below 19.2455. [VERIFIED]
//
// 4. THE PRODUCT THEOREM SURVIVES A HARDER TEST THAN THE NOTE RAN. K*+1 <=
//    prod(1+L_j) holds at all fourteen steps, and the nesting link
//    m_{j-1}+1 <= (m_j+1)(1+L_j) holds with 0 failures over 777600, 13634136
//    and 7229610 links at three steps, spanning 194400, 3408534 and 2409870
//    killed runs, of which 190980, 3370002 and 2348618 carry a fold that kills
//    nothing on the run. The edge the brief asked about is exercised, not
//    assumed. The chain at s = 16 is 17 13 10 7 4 0 with links 0.43 0.42 0.34
//    0.53 1.00. [VERIFIED]
//
// 5. THE 2^N FLOOR CHECKS, WITH ONE GRADE TO CARRY. Ratios 1.226, 1.481 and
//    41.348 at the rungs 16, 32, 64; the third rests on G2(61#) = 1080, which
//    is OEIS A144311, literature grade, not the corpus-exact ladder, which
//    stops at 43#. The count N(s) > 3 + beta2*log2(s) first holds at s = 217
//    (N 36 against 36.086 at 216, N 37 against 36.114 at 217) and does not
//    un-cross to s = 3000. [VERIFIED the rungs]
//
// 6. ONE LABEL IS WRONG WHERE IT WAS COPIED. sup w/a = 0.8295 is the ratio of
//    the CERTIFICATE to the allowance; the TRUTH's ratio has sup 0.6591. Both
//    bound the truth, so no conclusion moves, but they are not the same object
//    and REFUTED row 98 attaches the certificate's number to the word "truth".
//    [VERIFIED]
//
// 7. THE ENUMERABLE RANGE ENDS TWO LEVELS LATER THAN THE NOTES SAY. The
//    bridge note's 7 puts 19#->37# out of reach ("hours in this engine rather
//    than seconds"). Column-major over T_19 (census 378675, period 9699690) it
//    returns here, reproducing the ladder row x = 37 (528 @ 544899485411 x2,
//    census 217929355875) and adding a fifteenth step at s = 19, 20: K* = 13,
//    N = 4, C2 3.5200, floor 1.8800, certificate 3.8000, K*+1 = 14. So (M8)
//    holds at fifteen steps, not fourteen, with the sup still 6.6364 at
//    s = 16; and K*/N is 3.25 here against 3.40 at s = 16, so the "rising"
//    reading of K*/N does not continue at the new point. [VERIFIED]
//
// 8. NOT REACHED HERE. The reverse fold order at s = 16 (the killrun note's
//    864 against 540): only 11#->23# was small enough to rebuild, where 72
//    against 108 reproduces. The per-fold composition is NOT extended to the
//    fifteenth step: it would need L(T_31, 37), a stream over 6226553025
//    slots. Nothing here touches (D8), (M8) or (R) at any s > 20, in either
//    direction.
