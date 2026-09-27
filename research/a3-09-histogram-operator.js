'use strict';
// ============================================================================
// A9 — THE GAP-HISTOGRAM FOLD RULE, as an exact transfer operator
// (2026-08-16, u-frame wave; house style of grain-census.js)
// run: node --max-old-space-size=8000 research/a3-09-histogram-operator.js
//      (201 s; the T29 word is a 215 MB typed array, hence the heap flag)
// ============================================================================
// OBJECT. T_p is the twin-slot tile mod W = p#; its GRAIN is the cyclic word of
// gaps between consecutive twin slots (grain-census.js). Folding by the next
// prime q copies the tile q times and deletes the slots that q strikes; the
// gaps flanking a deleted slot merge. A9 asks for the exact evolution of the
// gap-size histogram under that operation.
//
// THE OPERATOR (derived here, verified below at every fold T7..T31).
// Write the old grain cyclically as g_0, g_1, ... (indices mod D, values summed
// as integers so that one full turn adds W). Partial sums from slot i:
//     G_j(i) = g_i + g_{i+1} + ... + g_{i+j-1},    G_0 = 0.
// A new gap is a maximal run: slot i survives, the next L slots die, slot i+L+1
// survives, and the new gap has size d = G_{L+1}(i).
//
// Step 1 (kill law, PROVEN in U-FRAME 5a). The new tile is Z/(qW) and q strikes
// exactly the positions v ≡ 0 or −2 (mod q). Copy k of old slot s sits at
// s + kW, so the strike is a single uniform rule on the new tile — the "copy"
// bookkeeping never enters. Writing a = v_1 mod q for the first killed slot of
// a run, the run condition is G_j ≡ a or a−2 (mod q) for j = 1..L.
//
// Step 2 (the alignment variable is free). Shift by the residue of slot i:
// put a' = a − (s_i mod q). Every condition becomes a condition on the GAPS
// alone. As k runs over the q copies, a' runs over Z/q exactly once
// (gcd(W,q) = 1): the misalignment principle. Hence
//
//     nu_q(g_i, ..., g_{i+L})
//        = #{ a' in Z/q :  G_j ≡ a' or a'−2 (mod q) for j = 1..L,     [interior dies]
//                          a' ∉ {0, 2},                               [left end lives]
//                          a' ∉ {G_{L+1}, G_{L+1}+2} }                [right end lives]
//
// and THE HISTOGRAM OPERATOR IS
//
//     count_q(d) = SUM over i in [0,D)  SUM over L >= 0  [G_{L+1}(i) = d] · nu_q(...)
//
// It depends on the old gap word and on q alone — not on the tile's residues,
// not on W mod q, not on the copy order. That is the whole content of
// misalignment, in one line.
//
// Step 3 (the L = 0 term is the copy law). For L = 0,
//     nu_q(g) = q − |{0, 2, g, g+2}| = q−2 (q | g), q−3 (g ≡ ±2), q−4 (else)
// which is exactly the adapted pair correlation rho_q(g) of grain-census.js.
// So the diagonal part of the operator is multiplication by rho_q(d):
//     count_q(d) = rho_q(d) · count_p(d)  +  (merge terms, L >= 1).
// Of the q copies of a gap, |{0,2,g,g+2}| in {2,3,4} have an endpoint struck,
// the rest survive intact — the skeleton stated in the brief, now with the
// exact multiplicity.
//
// Step 4 (why merges are rare, and the tail question). For L >= 1 the candidate
// set A_L = {a' : G_j in {a', a'−2} for all j <= L} \ {0,2} has |A_1| <= 2 and
// shrinks; A_L nonempty for L >= 2 forces every interior gap g_{i+1}..g_{i+L−1}
// ≡ 0 or ±2 (mod q). Since grain gaps are multiples of 6, the smallest such gap
// is about 2q. So the merge mass is carried by P(gap >= 2q), and the whole L
// question is the tail of the histogram at threshold 2q. Sections 6 and 7
// compute that tail exactly and analytically.
// ============================================================================

const T_START = Date.now();
const el = () => ((Date.now() - T_START) / 1000).toFixed(2) + 's';
const log = (...a) => console.log(...a);
const tick = m => process.stderr.write(`[${el()}] ${m}\n`);

function primesTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}
const PL = primesTo(4000);
const nextPrime = p => PL[PL.indexOf(p) + 1];
const prod = a => a.reduce((x, y) => x * y, 1);
const showHist = h => [...h].sort((a, b) => a[0] - b[0]).map(([d, c]) => `${d}:${c}`).join(' ');

// ------------------------------------------------- 1. grains by direct sieve --
function sieveGrain(p) {
  const pr = PL.filter(q => q <= p), P = prod(pr);
  const bad = new Uint8Array(P);
  for (const q of pr) {
    if (q < 5) continue;
    for (let j = 0; j < P; j += q) bad[j] = 1;
    for (let j = q - 2; j < P; j += q) bad[j] = 1;
  }
  const gaps = []; let first = -1, prev = -1;
  for (let r = 5; r < P; r += 6) {
    if (bad[r]) continue;
    if (first < 0) first = r; else gaps.push(r - prev);
    prev = r;
  }
  gaps.push(first + P - prev);                       // the grain is cyclic
  const g8 = new Uint8Array(gaps.length);
  for (let i = 0; i < gaps.length; i++) g8[i] = gaps[i] / 6;
  return { p, W: P, D: gaps.length, gaps: g8, s0: first };
}
function histOf(g8, D) { const h = new Map(); for (let i = 0; i < D; i++) { const d = g8[i] * 6; h.set(d, (h.get(d) || 0) + 1); } return h; }

// ------------------------------------------------------- 2. THE OPERATOR -----
// gaps stored as d/6 in a Uint8Array; all arithmetic on true values.
function foldHist(g8, D, q, opts = {}) {
  const h = new Map(), byL = new Map();
  let total = 0, maxL = 0;
  const report = opts.progress | 0;
  for (let i = 0; i < D; i++) {
    if (report && (i % report) === 0 && i) tick(`  foldHist q=${q}: ${(100 * i / D).toFixed(1)}%`);
    let d = g8[i] * 6;
    const G1 = d % q;
    // L = 0 : nu = rho_q(g)
    let nu = (G1 === 0) ? q - 2 : (G1 === 2 || G1 === q - 2) ? q - 3 : q - 4;
    h.set(d, (h.get(d) || 0) + nu); total += nu; byL.set(0, (byL.get(0) || 0) + nu);
    // L >= 1
    // A_1 = {G1, G1+2} \ {0, 2}   (G1 and G1+2 are distinct for q > 2)
    let a0 = G1, a1 = (G1 + 2) % q, n = 2;
    const b0 = (a0 === 0 || a0 === 2), b1 = (a1 === 0 || a1 === 2);
    if (b0 && b1) n = 0;                 // happens exactly when q | g_i
    else if (b0) { a0 = a1; n = 1; }
    else if (b1) n = 1;
    let L = 1, j = i;
    while (n > 0) {
      j++; d += g8[j % D] * 6;
      const Gn = d % q, e2 = (Gn + 2) % q;
      let v = 0;
      if (a0 !== Gn && a0 !== e2) v++;
      if (n === 2 && a1 !== Gn && a1 !== e2) v++;
      if (v) { h.set(d, (h.get(d) || 0) + v); total += v; byL.set(L, (byL.get(L) || 0) + v); if (L > maxL) maxL = L; }
      // A_L = A_{L-1} ∩ {Gn, Gn+2}
      const k0 = (a0 === Gn || a0 === e2), k1 = (n === 2) && (a1 === Gn || a1 === e2);
      if (k0 && k1) { /* both stay */ }
      else if (k0) { n = 1; }
      else if (k1) { a0 = a1; n = 1; }
      else { n = 0; }
      L++;
      if (L > 5000) throw new Error('runaway run');
    }
  }
  return { h, total, byL, maxL };
}

// explicit fold producing the new grain WORD (needs W and s0; order matters here)
function foldWord(g8, D, W, s0, q, out) {
  const w = W % q, t = new Uint8Array(D);
  let s = s0 % q;
  for (let i = 0; i < D; i++) { t[i] = s; s = (s + g8[i] * 6) % q; }
  let n = 0, acc = 0, started = false, leading = 0, kw = 0;
  const b2 = q - 2;
  for (let k = 0; k < q; k++) {
    for (let i = 0; i < D; i++) {
      const u = (t[i] + kw) % q;
      if (u !== 0 && u !== b2) { if (started) out[n++] = acc / 6; else { started = true; leading = acc; } acc = 0; }
      acc += g8[i] * 6;
    }
    kw = (kw + w) % q;
  }
  out[n++] = (acc + leading) / 6;
  return n;
}

// -------------------------------- 6. head-CRT engine: count(d)/D at any level --
// count(d) = sum_{S ⊆ {6..d-6}} (−1)^{|S|} prod_q (q − |A_q(S∪{0,d})|)   (exact,
// grain-census.js). Primes q > d have |A_q| = 2m exactly (m = #forced slots), so
// only q <= d need class bookkeeping; the rest give a closed factor. Ratios to
// D = prod(q−2) are formed factor by factor, so nothing overflows.
function countOverD(d, p) {
  const small = PL.filter(q => q >= 3 && q <= Math.min(d, p));
  const big = PL.filter(q => q > d && q <= p);
  const ns = small.length;
  const base = new Int32Array(ns + 1);
  for (let i = 0; i < ns; i++) base[i + 1] = base[i] + small[i];
  const cnt = new Int32Array(base[ns]), dist = new Int32Array(ns);
  let deadCnt = 0, leaves = 0;
  const add = o => {
    for (let i = 0; i < ns; i++) {
      const q = small[i], b = base[i];
      const c1 = ((-o) % q + q) % q, c2 = ((-o - 2) % q + q) % q;
      let ch = 0;
      if (cnt[b + c1]++ === 0) ch++;
      if (c2 !== c1 && cnt[b + c2]++ === 0) ch++;
      if (ch) { const a = dist[i]; dist[i] = a + ch; if (a < q && a + ch === q) deadCnt++; }
    }
  };
  const rem = o => {
    for (let i = 0; i < ns; i++) {
      const q = small[i], b = base[i];
      const c1 = ((-o) % q + q) % q, c2 = ((-o - 2) % q + q) % q;
      let ch = 0;
      if (--cnt[b + c1] === 0) ch++;
      if (c2 !== c1 && --cnt[b + c2] === 0) ch++;
      if (ch) { const a = dist[i]; dist[i] = a - ch; if (a === q) deadCnt--; }
    }
  };
  add(0); add(d);
  if (deadCnt) return { v: 0, leaves: 0 };
  const ints = []; for (let m = 6; m < d; m += 6) ints.push(m);
  const byM = new Float64Array(ints.length + 3);
  (function rec(i, m, sign) {
    if (i === ints.length) {
      let t = sign;
      for (let j = 0; j < ns; j++) t *= (small[j] - dist[j]) / (small[j] - 2);
      byM[m] += t; leaves++; return;
    }
    rec(i + 1, m, sign);
    add(ints[i]);
    if (!deadCnt) rec(i + 1, m + 1, -sign);
    rem(ints[i]);
  })(0, 2, 1);
  let v = 0;
  for (let m = 0; m < byM.length; m++) {
    if (!byM[m]) continue;
    let f = byM[m];
    for (const q of big) f *= (q - 2 * m) / (q - 2);
    v += f;
  }
  return { v, leaves };
}
function meanGap(p) { let m = 2; for (const q of PL) { if (q < 3) continue; if (q > p) break; m *= q / (q - 2); } return m; }
function lnD(p) { let s = 0; for (const q of PL) { if (q < 3) continue; if (q > p) break; s += Math.log(q - 2); } return s; }
function tailAt(t, p) { let head = 0, ml = 0; for (let d = 6; d < t; d += 6) { const r = countOverD(d, p); head += r.v; if (r.leaves > ml) ml = r.leaves; } return { tail: 1 - head, maxLeaves: ml }; }
function tailFromHist(h, D, t) { let s = 0; for (const [d, c] of h) if (d >= t) s += c; return s / D; }

// ================================================================== main ====
const LEVELS = [7, 11, 13, 17, 19, 23];
const grains = new Map();
log('== 1. GRAINS T7..T23 (direct sieve, the ground truth) ==');
for (const p of LEVELS) {
  const g = sieveGrain(p); grains.set(p, g);
  const h = histOf(g.gaps, g.D);
  const Dth = prod(PL.filter(q => q >= 3 && q <= p).map(q => q - 2));
  log(`T${p}  W=${g.W}  D=${g.D}${g.D === Dth ? '' : ' D-FAIL'}  G2=${Math.max(...h.keys())}  meanGap=${(g.W / g.D).toFixed(2)}`);
  if (p <= 11) log(`   ${showHist(h)}`);
}
log('glossary check T11 = 6:21 12:56 18:22 24:6 30:22 36:4 42:4  ->',
  showHist(histOf(grains.get(11).gaps, grains.get(11).D)) === '6:21 12:56 18:22 24:6 30:22 36:4 42:4' ? 'MATCH' : 'MISMATCH');

log('\n== 2. THE OPERATOR VERSUS THE TRUE FOLD (histograms) ==');
log('fold | new gaps predicted | expected D(q-2) | histogram | run-length spectrum');
for (const p of LEVELS.slice(0, -1)) {
  const q = nextPrime(p), a = grains.get(p), b = grains.get(q);
  const { h, total, byL, maxL } = foldHist(a.gaps, a.D, q);
  const hb = histOf(b.gaps, b.D);
  let ok = h.size === hb.size;
  for (const [d, c] of hb) if ((h.get(d) || 0) !== c) ok = false;
  for (const [d, c] of h) if ((hb.get(d) || 0) !== c) ok = false;
  log(`T${p} --${q}--> T${q}: ${total} | ${a.D * (q - 2)} ${total === a.D * (q - 2) ? 'ok' : 'FAIL'} | ${ok ? 'EXACT, every size' : 'MISMATCH'} | ` +
    [...byL].sort((x, y) => x[0] - y[0]).map(([l, n]) => `L=${l}:${n}`).join(' ') + ` (maxL=${maxL})`);
  if (!ok) { log('  pred ' + showHist(h)); log('  true ' + showHist(hb)); }
}

log('\n== 3. ITERATED FROM T7 UPWARD (operator on words, no sieve) ==');
{
  let cur = grains.get(7), okAll = true;
  for (const q of [11, 13, 17, 19, 23]) {
    const out = new Uint8Array(cur.D * (q - 2));
    const n = foldWord(cur.gaps, cur.D, cur.W, cur.s0, q, out);
    const h = histOf(out, n), ref = histOf(grains.get(q).gaps, grains.get(q).D);
    let ok = n === grains.get(q).D && h.size === ref.size;
    for (const [d, c] of ref) if ((h.get(d) || 0) !== c) ok = false;
    okAll = okAll && ok;
    log(`  T7 -> ... -> T${q}: D=${n}, histogram ${ok ? 'EXACT' : 'MISMATCH'}, G2=${Math.max(...h.keys())}`);
    // the new word's first slot: the smallest surviving absolute position
    let s0n = -1;
    { const w = cur.W % q; let best = Infinity;
      let s = cur.s0 % q; const t = new Uint8Array(cur.D); const pos = new Float64Array(cur.D); let acc = cur.s0;
      for (let i = 0; i < cur.D; i++) { t[i] = s; pos[i] = acc; s = (s + cur.gaps[i] * 6) % q; acc += cur.gaps[i] * 6; }
      for (let k = 0; k < q; k++) for (let i = 0; i < cur.D; i++) { const u = (t[i] + k * w) % q; if (u !== 0 && u !== q - 2) { const v = pos[i] + k * cur.W; if (v < best) best = v; } }
      s0n = best; }
    cur = { p: q, W: cur.W * q, D: n, gaps: out, s0: s0n };
  }
  log(`  all five folds from the T7 word alone: ${okAll ? 'EXACT' : 'FAILURE ABOVE'}`);
}

log('\n== 4. THE DIAGONAL PART IS rho_q, THE REST IS MERGE ==');
log('fold | L=0 mass = sum_d rho_q(d)count(d) | merge mass | merge share | check');
for (const p of LEVELS.slice(0, -1)) {
  const q = nextPrime(p), a = grains.get(p);
  const ha = histOf(a.gaps, a.D);
  const { h, total, byL } = foldHist(a.gaps, a.D, q);
  let diag = 0;
  const hd = new Map();
  for (const [d, c] of ha) {
    const r = (d % q === 0) ? q - 2 : (d % q === 2 || d % q === q - 2) ? q - 3 : q - 4;
    diag += r * c; hd.set(d, r * c);
  }
  // verify the L=0 slice of the operator equals rho_q(d)*count(d) size by size
  const { h: hOnly0 } = (() => {
    const hh = new Map();
    for (let i = 0; i < a.D; i++) { const d = a.gaps[i] * 6, m = d % q;
      const r = (m === 0) ? q - 2 : (m === 2 || m === q - 2) ? q - 3 : q - 4;
      hh.set(d, (hh.get(d) || 0) + r); }
    return { h: hh };
  })();
  let sizeOk = true;
  for (const [d, c] of hd) if ((hOnly0.get(d) || 0) !== c) sizeOk = false;
  log(`  ${p}->${q}: ${diag} | ${total - diag} | ${((total - diag) / total * 100).toFixed(3)}% | rho-law per size ${sizeOk ? 'exact' : 'FAIL'}, L=0 slice ${byL.get(0) === diag ? 'ok' : 'FAIL'}`);
}

log('\n== 5. DEEP FOLDS: T23 -> T29 (word) -> T31 (histogram) ==');
let g29 = null, h29 = null, h31 = null, maxL31 = 0;
{
  const a = grains.get(23);
  const out = new Uint8Array(a.D * 27);
  const n = foldWord(a.gaps, a.D, a.W, a.s0, 29, out);
  g29 = { p: 29, W: a.W * 29, D: n, gaps: out };
  h29 = histOf(out, n);
  let sum = 0; for (const [d, c] of h29) sum += d * c;
  log(`T29: D=${n} (=D23*27 ${n === a.D * 27 ? 'ok' : 'FAIL'})  sum(d*c)=${sum} (=W29 ${sum === g29.W ? 'ok' : 'FAIL'})  G2=${Math.max(...h29.keys())}  meanGap=${(g29.W / n).toFixed(2)}  [${el()}]`);
  log('  ' + showHist(h29));
  // cross-check: the operator's histogram for the same fold
  const chk = foldHist(a.gaps, a.D, 29);
  let ok = chk.h.size === h29.size; for (const [d, c] of h29) if ((chk.h.get(d) || 0) !== c) ok = false;
  log(`  operator vs explicit fold at 23->29: ${ok ? 'EXACT' : 'MISMATCH'}; run spectrum ` +
    [...chk.byL].sort((x, y) => x[0] - y[0]).map(([l, m]) => `L=${l}:${m}`).join(' '));
  tick('T29 done, folding to T31');
  const r31 = foldHist(out, n, 31, { progress: 50e6 });
  h31 = r31.h; maxL31 = r31.maxL;
  let s31 = 0; for (const [d, c] of h31) s31 += d * c;
  const W31 = g29.W * 31;
  log(`T31: D=${r31.total} (=D29*29 ${r31.total === n * 29 ? 'ok' : 'FAIL'})  sum(d*c)=${s31} (=W31 ${s31 === W31 ? 'ok' : 'FAIL'})  G2=${Math.max(...h31.keys())}  meanGap=${(W31 / r31.total).toFixed(2)}  [${el()}]`);
  log('  run spectrum ' + [...r31.byL].sort((x, y) => x[0] - y[0]).map(([l, m]) => `L=${l}:${m}`).join(' '));
  log('  ' + showHist(h31));
}

log('\n== 6. THE ANALYTIC TAIL, VALIDATED AGAINST THE EXACT HISTOGRAMS ==');
log('level | threshold t=2p\' | tail from exact histogram | tail from head-CRT law | abs diff');
{
  const exact = new Map(LEVELS.map(p => [p, histOf(grains.get(p).gaps, grains.get(p).D)]));
  exact.set(29, h29); exact.set(31, h31);
  const Dof = new Map(LEVELS.map(p => [p, grains.get(p).D]));
  Dof.set(29, g29.D); Dof.set(31, g29.D * 29);
  for (const p of [7, 11, 13, 17, 19, 23, 29, 31]) {
    const t = 2 * nextPrime(p);
    const a = tailFromHist(exact.get(p), Dof.get(p), t), b = tailAt(t, p).tail;
    log(`  T${p} | ${t} | ${a.toExponential(6)} | ${b.toExponential(6)} | ${Math.abs(a - b).toExponential(2)}`);
  }
}

log('\n== 7. P(gap >= 2p\') ALONG THE FOLD DIAGONAL ==');
log("p | p' | t=2p' | mean gap mbar | t/mbar | TAIL | ln(1/TAIL) | slope d ln(1/T)/d(t/mbar) | lnD/ln(1/T) | cost");
{
  // THE DIAGONAL'S LAST ROW IS A FIXED PRIME, NOT A STOPWATCH (2026-08-19,
  // custody migration wave 3). Until today this loop ran to p <= 160 and broke
  // when a level cost more than 33 WALL-CLOCK seconds, so the number of points
  // in the two regressions below — and therefore both fitted constants — was a
  // property of the machine and its load, not of the arithmetic. A loaded
  // machine stops at p = 137 and reads 0.767 / 0.729; an idle one reaches
  // p = 139 and reads 0.770 / 0.738. Neither is reproducible.
  //
  // The bound is now the prime DIAGONAL_MAX_P = 139, which is the level the
  // 2026-08-16 run reached and the one the corpus quotes. It is the largest
  // affordable level: the inclusion-exclusion roughly doubles per prime step,
  // so p = 139 costs ~75 s of this script's ~200 s and p = 149 would add ~150 s
  // more. Raising it is a deliberate edit here, and it moves both constants.
  const DIAGONAL_MAX_P = 139;
  let prevX = null, prevY = null; const XS = [], YS = [], PS = [];
  for (const p of PL.filter(q => q >= 7 && q <= DIAGONAL_MAX_P)) {
    const t0 = Date.now(), pn = nextPrime(p), t = 2 * pn;
    const { tail } = tailAt(t, p);
    const mb = meanGap(p), x = t / mb, y = Math.log(1 / tail);
    const slope = prevX === null ? NaN : (y - prevY) / (x - prevX);
    // the trailing column is this level's cost. It carries an `s` so that
    // qc/tailfmt.js normalises it as volatile; it decides nothing.
    log(`${p} | ${pn} | ${t} | ${mb.toFixed(2)} | ${x.toFixed(3)} | ${tail.toExponential(4)} | ${y.toFixed(3)} | ${isNaN(slope) ? '-' : slope.toFixed(3)} | ${(lnD(p) / y).toFixed(2)} | ${((Date.now() - t0) / 1000).toFixed(2)}s`);
    prevX = x; prevY = y; XS.push(x); YS.push(y); PS.push(p);
  }
  log(`(the diagonal stops at the fixed bound p <= ${DIAGONAL_MAX_P}, not at a wall-clock budget; the inclusion-exclusion roughly doubles per prime step)`);
  const fit = (xs, ys) => {
    const n = xs.length; let sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
    const b = (n * sxy - sx * sy) / (n * sxx - sx * sx), a = (sy - b * sx) / n;
    let ssr = 0, sst = 0; const yb = sy / n;
    for (let i = 0; i < n; i++) { const yh = a + b * xs[i]; ssr += (ys[i] - yh) ** 2; sst += (ys[i] - yb) ** 2; }
    return { a, b, r2: 1 - ssr / sst, n };
  };
  const all = fit(XS, YS);
  const k = XS.findIndex(( _, i) => PS[i] >= 37);
  const late = fit(XS.slice(k), YS.slice(k));
  log(`regression ln(1/TAIL) = a + b*(2p'/mbar):`);
  log(`  all ${all.n} points (p=7..${PS[PS.length - 1]}): a=${all.a.toFixed(3)}  b=${all.b.toFixed(4)}  R2=${all.r2.toFixed(5)}  -> tail ~ exp(-2p'/(${(1 / all.b).toFixed(3)}*mbar))`);
  log(`  p>=37 only (${late.n} points): a=${late.a.toFixed(3)}  b=${late.b.toFixed(4)}  R2=${late.r2.toFixed(5)}  -> tail ~ exp(-2p'/(${(1 / late.b).toFixed(3)}*mbar))`);
  // the L cap implied by the operator's own criterion, against ln^2 p
  log('implied cap lnD/ln(1/TAIL) against ln^2 p:');
  log('  ' + PS.map((p, i) => `p=${p}:${(lnD(p) / YS[i] / Math.log(p) ** 2).toFixed(3)}`).filter((_, i) => i % 4 === 0).join(' '));
}

log('\n== 7b. IS THE THRESHOLD RECEDING? 2p\' AGAINST THE MEAN GAP ==');
log("p | 2p' | mbar | 2p'/mbar | mbar/ln^2 p | 2p'/ln^2 p");
for (const target of [7, 11, 13, 19, 23, 29, 37, 53, 71, 97, 127, 199, 401, 1009, 2003]) {
  const pp = PL.filter(q => q <= target).pop();               // largest prime <= target
  const pn = nextPrime(pp), mb = meanGap(pp), l2 = Math.log(pp) ** 2;
  log(`  ${pp} | ${2 * pn} | ${mb.toFixed(2)} | ${(2 * pn / mb).toFixed(3)} | ${(mb / l2).toFixed(3)} | ${(2 * pn / l2).toFixed(2)}`);
}

log('\n== 8. THE TAIL SHAPE AT FIXED LEVEL (is it exponential?) ==');
log('level | mbar | fit of ln P(g>=t) on t over t in [1.5,3.5]*mbar: scale theta | theta/mbar | R2');
for (const p of [23, 29, 31, 41, 53, 71, 97]) {
  const mb = meanGap(p);
  const tmax = 6 * Math.floor(3.5 * mb / 6), tmin = 6 * Math.ceil(1.5 * mb / 6);
  const cum = new Map(); let head = 0;                 // one pass, cumulative
  for (let d = 6; d <= tmax; d += 6) { cum.set(d, head); head += countOverD(d, p).v; }
  const ts = [], ys = [];
  for (let t = tmin; t <= tmax; t += 6) { ts.push(t); ys.push(Math.log(1 - cum.get(t))); }
  let n = ts.length, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sx += ts[i]; sy += ys[i]; sxx += ts[i] * ts[i]; sxy += ts[i] * ys[i]; }
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx), a = (sy - b * sx) / n;
  let ssr = 0, sst = 0; const ybar = sy / n;
  for (let i = 0; i < n; i++) { const yh = a + b * ts[i]; ssr += (ys[i] - yh) ** 2; sst += (ys[i] - ybar) ** 2; }
  log(`  T${p} | ${mb.toFixed(2)} | theta=${(-1 / b).toFixed(2)} | ${(-1 / (b * mb)).toFixed(3)} | ${(1 - ssr / sst).toFixed(5)}  [${el()}]`);
}

log('\n== 9. THE MERGE CRITERION f AGAINST THE TAIL ==');
log("level | p' | f = P(gap ≡ 0,±2 mod p') | tail P(gap>=2p') | f/tail | measured L");
{
  const exact = new Map(LEVELS.map(p => [p, histOf(grains.get(p).gaps, grains.get(p).D)]));
  exact.set(29, h29); exact.set(31, h31);
  const Dof = new Map(LEVELS.map(p => [p, grains.get(p).D]));
  Dof.set(29, g29.D); Dof.set(31, g29.D * 29);
  const Lmeas = { 7: 1, 11: 2, 13: 2, 17: 2, 19: 3, 23: 2, 29: 4, 31: '-' };  // verified, section 10
  for (const p of [7, 11, 13, 17, 19, 23, 29, 31]) {
    const q = nextPrime(p), h = exact.get(p), D = Dof.get(p);
    let f = 0; for (const [d, c] of h) { const m = d % q; if (m === 0 || m === 2 || m === q - 2) f += c; }
    f /= D;
    const tl = tailFromHist(h, D, 2 * q);
    log(`  T${p} | ${q} | ${f.toExponential(4)} | ${tl.toExponential(4)} | ${(f / tl).toFixed(3)} | ${Lmeas[p]}`);
  }
}

log('\n== 10. L, THE LONGEST ADJACENT-KILL RUN, FROM THE OPERATOR ==');
// The operator already carries L: byL is the exact spectrum of merged-run
// lengths, so max{L : byL(L) > 0} IS the longest adjacent-kill run. Checked
// against direct enumeration of the folded tile.
function trueL(g8, D, W, s0, q) {
  const t = new Uint8Array(D); let s = s0 % q;
  for (let i = 0; i < D; i++) { t[i] = s; s = (s + g8[i] * 6) % q; }
  const w = W % q, b2 = q - 2;
  let cur = 0, mx = 0, lead = -1, kw = 0;
  for (let k = 0; k < q; k++) {
    for (let i = 0; i < D; i++) {
      const u = (t[i] + kw) % q;
      if (u === 0 || u === b2) { cur++; if (cur > mx) mx = cur; } else { if (lead < 0) lead = cur; cur = 0; }
    }
    kw = (kw + w) % q;
  }
  if (lead >= 0 && cur + lead > mx) mx = cur + lead;
  return mx;
}
log('fold | L from operator spectrum | L by direct enumeration of the folded tile | U-FRAME 5 table');
{
  const uframe = { 7: 2, 11: 1, 13: 2, 17: 2, 19: 2, 23: 3, 29: 3, 31: 4 };
  const g5 = sieveGrain(5);
  const chain = [[g5, 7], ...LEVELS.slice(0, -1).map(p => [grains.get(p), nextPrime(p)])];
  for (const [g, q] of chain) {
    const { byL } = foldHist(g.gaps, g.D, q);
    const Lop = Math.max(...[...byL.keys()]);
    const Lbf = trueL(g.gaps, g.D, g.W, g.s0, q);
    log(`  T${g.p} --${q}--> : ${Lop} | ${Lbf} ${Lop === Lbf ? 'agree' : 'DISAGREE'} | ${uframe[q]}${uframe[q] === Lop ? '' : '  <-- U-FRAME DISAGREES'}`);
  }
  const g23 = grains.get(23);
  const Lop29 = foldHist(g23.gaps, g23.D, 29).maxL;
  const Lbf29 = trueL(g23.gaps, g23.D, g23.W, g23.s0, 29);
  log(`  T23 --29--> : ${Lop29} | ${Lbf29} ${Lop29 === Lbf29 ? 'agree' : 'DISAGREE'} | ${uframe[29]}${uframe[29] === Lop29 ? '' : '  <-- U-FRAME DISAGREES, the true value is ' + Lop29}`);
  log(`  T29 --31--> : operator spectrum gives L = ${maxL31} (U-FRAME 5 table: 4${maxL31 === 4 ? ', agree' : ', DISAGREE'})`);
}
tick('done');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=8000 research/a3-09-histogram-operator.js
//   invocation:  node --max-old-space-size=8000 research/a3-09-histogram-operator.js
//   code-sha256: 22739da5b183b3dcbef0c1efcaeaca6285d0c893a6de62bc2fd3b7cd8c064b22
//   out-sha256:  42a7aa4137c0af9b31bea8820b0062f9527233e983156ebd3f771bcb8db5e385
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     197.7 s
// ============================================================================
// == 1. GRAINS T7..T23 (direct sieve, the ground truth) ==
// T7  W=210  D=15  G2=30  meanGap=14.00
//    6:3 12:8 18:2 30:2
// T11  W=2310  D=135  G2=42  meanGap=17.11
//    6:21 12:56 18:22 24:6 30:22 36:4 42:4
// T13  W=30030  D=1485  G2=66  meanGap=20.22
// T17  W=510510  D=22275  G2=108  meanGap=22.92
// T19  W=9699690  D=378675  G2=150  meanGap=25.61
// T23  W=223092870  D=7952175  G2=204  meanGap=28.05
// glossary check T11 = 6:21 12:56 18:22 24:6 30:22 36:4 42:4  -> MATCH
//
// == 2. THE OPERATOR VERSUS THE TRUE FOLD (histograms) ==
// fold | new gaps predicted | expected D(q-2) | histogram | run-length spectrum
// T7 --11--> T11: 135 | 135 ok | EXACT, every size | L=0:105 L=1:30 (maxL=1)
// T11 --13--> T13: 1485 | 1485 ok | EXACT, every size | L=0:1221 L=1:258 L=2:6 (maxL=2)
// T13 --17--> T17: 22275 | 22275 ok | EXACT, every size | L=0:19377 L=1:2826 L=2:72 (maxL=2)
// T17 --19--> T19: 378675 | 378675 ok | EXACT, every size | L=0:335213 L=1:42374 L=2:1088 (maxL=2)
// T19 --23--> T23: 7952175 | 7952175 ok | EXACT, every size | L=0:7206695 L=1:733672 L=2:11746 L=3:62 (maxL=3)
//
// == 3. ITERATED FROM T7 UPWARD (operator on words, no sieve) ==
//   T7 -> ... -> T11: D=135, histogram EXACT, G2=42
//   T7 -> ... -> T13: D=1485, histogram EXACT, G2=66
//   T7 -> ... -> T17: D=22275, histogram EXACT, G2=108
//   T7 -> ... -> T19: D=378675, histogram EXACT, G2=150
//   T7 -> ... -> T23: D=7952175, histogram EXACT, G2=204
//   all five folds from the T7 word alone: EXACT
//
// == 4. THE DIAGONAL PART IS rho_q, THE REST IS MERGE ==
// fold | L=0 mass = sum_d rho_q(d)count(d) | merge mass | merge share | check
//   7->11: 105 | 30 | 22.222% | rho-law per size exact, L=0 slice ok
//   11->13: 1221 | 264 | 17.778% | rho-law per size exact, L=0 slice ok
//   13->17: 19377 | 2898 | 13.010% | rho-law per size exact, L=0 slice ok
//   17->19: 335213 | 43462 | 11.477% | rho-law per size exact, L=0 slice ok
//   19->23: 7206695 | 745480 | 9.375% | rho-law per size exact, L=0 slice ok
//
// == 5. DEEP FOLDS: T23 -> T29 (word) -> T31 (histogram) ==
// T29: D=214708725 (=D23*27 ok)  sum(d*c)=6469693230 (=W29 ok)  G2=258  meanGap=30.13  [7.20s]
//   6:17506125 12:46683000 18:27184430 24:14178528 30:39735054 36:10497320 42:22680468 48:8256720 54:2479200 60:7815766 66:5067262 72:3197558 78:3028200 84:1026404 90:1711068 96:948278 102:264346 108:1194016 114:54546 120:387506 126:205068 132:150588 138:278558 144:1180 150:88548 156:29724 162:15172 168:24418 174:2054 180:10862 186:2090 192:2764 198:748 204:548 210:442 216:38 222:84 228:22 234:12 240:8 258:2
//   operator vs explicit fold at 23->29: EXACT; run spectrum L=0:199048197 L=1:15416706 L=2:243822
// T31: D=6226553025 (=D29*29 ok)  sum(d*c)=200560490130 (=W31 ok)  G2=348  meanGap=32.21  [25.25s]
//   run spectrum L=0:5805160589 L=1:413380422 L=2:7999018 L=3:12992 L=4:4
//   6:472665375 12:1260441000 18:749635250 24:398923200 30:1125566730 36:299202120 42:677184012 48:258098688 54:87682824 60:260576152 66:159343546 72:109884182 78:108939976 84:38474924 90:65936260 96:34015314 102:12947814 108:44744420 114:3748744 120:17717092 126:9020104 132:7757284 138:12709164 144:174704 150:4937476 156:1788652 162:1132112 168:1531470 174:216494 180:851204 186:177640 192:262524 198:93644 204:52242 210:70782 216:3152 222:26366 228:6296 234:4362 240:5868 246:134 252:1602 258:860 264:130 270:318 276:146 282:226 288:228 294:46 300:54 306:36 312:10 318:34 330:34 348:4
//
// == 6. THE ANALYTIC TAIL, VALIDATED AGAINST THE EXACT HISTOGRAMS ==
// level | threshold t=2p' | tail from exact histogram | tail from head-CRT law | abs diff
//   T7 | 22 | 1.333333e-1 | 1.333333e-1 | 8.33e-17
//   T11 | 26 | 2.222222e-1 | 2.222222e-1 | 1.11e-16
//   T13 | 34 | 1.265993e-1 | 1.265993e-1 | 1.11e-16
//   T17 | 38 | 1.393490e-1 | 1.393490e-1 | 2.78e-16
//   T19 | 46 | 9.949429e-2 | 9.949429e-2 | 2.91e-16
//   T23 | 58 | 9.376982e-2 | 9.376982e-2 | 3.89e-16
//   T29 | 62 | 8.240054e-2 | 8.240054e-2 | 4.72e-16
//   T31 | 74 | 5.899732e-2 | 5.899732e-2 | 2.43e-16
//
// == 7. P(gap >= 2p') ALONG THE FOLD DIAGONAL ==
// p | p' | t=2p' | mean gap mbar | t/mbar | TAIL | ln(1/TAIL) | slope d ln(1/T)/d(t/mbar) | lnD/ln(1/T) | cost
// 7 | 11 | 22 | 14.00 | 1.571 | 1.3333e-1 | 2.015 | - | 1.34 | 0.00s
// 11 | 13 | 26 | 17.11 | 1.519 | 2.2222e-1 | 1.504 | 9.833 | 3.26 | 0.00s
// 13 | 17 | 34 | 20.22 | 1.681 | 1.2660e-1 | 2.067 | 3.477 | 3.53 | 0.00s
// 17 | 19 | 38 | 22.92 | 1.658 | 1.3935e-1 | 1.971 | 4.123 | 5.08 | 0.00s
// 19 | 23 | 46 | 25.61 | 1.796 | 9.9494e-2 | 2.308 | 2.445 | 5.57 | 0.00s
// 23 | 29 | 58 | 28.05 | 2.067 | 9.3770e-2 | 2.367 | 0.218 | 6.71 | 0.00s
// 29 | 31 | 62 | 30.13 | 2.058 | 8.2401e-2 | 2.496 | -13.144 | 7.69 | 0.00s
// 31 | 37 | 74 | 32.21 | 2.297 | 5.8997e-2 | 2.830 | 1.393 | 7.97 | 0.00s
// 37 | 41 | 82 | 34.05 | 2.408 | 5.3016e-2 | 2.937 | 0.965 | 8.89 | 0.00s
// 41 | 43 | 86 | 35.80 | 2.402 | 5.6175e-2 | 2.879 | 10.098 | 10.34 | 0.00s
// 43 | 47 | 94 | 37.54 | 2.504 | 5.0004e-2 | 2.996 | 1.148 | 11.18 | 0.00s
// 47 | 53 | 106 | 39.21 | 2.703 | 4.4141e-2 | 3.120 | 0.625 | 11.95 | 0.00s
// 53 | 59 | 118 | 40.75 | 2.896 | 3.4922e-2 | 3.355 | 1.217 | 12.29 | 0.01s
// 59 | 61 | 122 | 42.18 | 2.892 | 3.1762e-2 | 3.449 | -28.504 | 13.12 | 0.01s
// 61 | 67 | 134 | 43.61 | 3.073 | 2.5997e-2 | 3.650 | 1.111 | 13.52 | 0.02s
// 67 | 71 | 142 | 44.95 | 3.159 | 2.1411e-2 | 3.844 | 2.250 | 13.92 | 0.03s
// 71 | 73 | 146 | 46.25 | 3.156 | 2.4008e-2 | 3.729 | 45.670 | 15.49 | 0.04s
// 73 | 79 | 158 | 47.56 | 3.322 | 1.7599e-2 | 4.040 | 1.872 | 15.35 | 0.07s
// 79 | 83 | 166 | 48.79 | 3.402 | 1.7281e-2 | 4.058 | 0.228 | 16.35 | 0.10s
// 83 | 89 | 178 | 50.00 | 3.560 | 1.4167e-2 | 4.257 | 1.257 | 16.62 | 0.19s
// 89 | 97 | 194 | 51.15 | 3.793 | 8.7435e-3 | 4.739 | 2.073 | 15.87 | 0.43s
// 97 | 101 | 202 | 52.22 | 3.868 | 7.9398e-3 | 4.836 | 1.286 | 16.50 | 0.65s
// 101 | 103 | 206 | 53.28 | 3.866 | 8.3044e-3 | 4.791 | 29.605 | 17.61 | 0.76s
// 103 | 107 | 214 | 54.33 | 3.939 | 6.6156e-3 | 5.018 | 3.151 | 17.73 | 1.48s
// 107 | 109 | 218 | 55.37 | 3.937 | 7.1031e-3 | 4.947 | 51.665 | 18.93 | 1.73s
// 109 | 113 | 226 | 56.40 | 4.007 | 6.5137e-3 | 5.034 | 1.245 | 19.53 | 2.55s
// 113 | 127 | 254 | 57.42 | 4.424 | 3.4648e-3 | 5.665 | 1.515 | 18.18 | 10.89s
// 127 | 131 | 262 | 58.34 | 4.491 | 3.4282e-3 | 5.676 | 0.157 | 19.00 | 14.87s
// 131 | 137 | 274 | 59.24 | 4.625 | 3.0243e-3 | 5.801 | 0.936 | 19.43 | 28.67s
// 137 | 139 | 278 | 60.12 | 4.624 | 3.1379e-3 | 5.764 | 37.410 | 20.40 | 31.94s
// 139 | 149 | 298 | 61.00 | 4.885 | 2.3685e-3 | 6.046 | 1.076 | 20.27 | 75.70s
// (the diagonal stops at the fixed bound p <= 139, not at a wall-clock budget; the inclusion-exclusion roughly doubles per prime step)
// regression ln(1/TAIL) = a + b*(2p'/mbar):
//   all 31 points (p=7..139): a=-0.235  b=1.2992  R2=0.99292  -> tail ~ exp(-2p'/(0.770*mbar))
//   p>=37 only (23 points): a=-0.452  b=1.3550  R2=0.99355  -> tail ~ exp(-2p'/(0.738*mbar))
// implied cap lnD/ln(1/TAIL) against ln^2 p:
//   p=7:0.355 p=19:0.642 p=37:0.682 p=53:0.780 p=71:0.852 p=89:0.788 p=107:0.867 p=131:0.817
//
// == 7b. IS THE THRESHOLD RECEDING? 2p' AGAINST THE MEAN GAP ==
// p | 2p' | mbar | 2p'/mbar | mbar/ln^2 p | 2p'/ln^2 p
//   7 | 22 | 14.00 | 1.571 | 3.697 | 5.81
//   11 | 26 | 17.11 | 1.519 | 2.976 | 4.52
//   13 | 34 | 20.22 | 1.681 | 3.074 | 5.17
//   19 | 46 | 25.61 | 1.796 | 2.955 | 5.31
//   23 | 58 | 28.05 | 2.067 | 2.854 | 5.90
//   29 | 62 | 30.13 | 2.058 | 2.657 | 5.47
//   37 | 82 | 34.05 | 2.408 | 2.612 | 6.29
//   53 | 118 | 40.75 | 2.896 | 2.585 | 7.49
//   71 | 146 | 46.25 | 3.156 | 2.546 | 8.04
//   97 | 202 | 52.22 | 3.868 | 2.495 | 9.65
//   127 | 262 | 58.34 | 4.491 | 2.486 | 11.17
//   199 | 422 | 70.11 | 6.019 | 2.502 | 15.06
//   401 | 818 | 87.83 | 9.314 | 2.445 | 22.77
//   1009 | 2026 | 115.75 | 17.503 | 2.420 | 42.35
//   2003 | 4022 | 139.68 | 28.795 | 2.417 | 69.59
//
// == 8. THE TAIL SHAPE AT FIXED LEVEL (is it exponential?) ==
// level | mbar | fit of ln P(g>=t) on t over t in [1.5,3.5]*mbar: scale theta | theta/mbar | R2
//   T23 | 28.05 | theta=18.52 | 0.660 | 0.98995  [195.59s]
//   T29 | 30.13 | theta=20.33 | 0.675 | 0.99323  [195.60s]
//   T31 | 32.21 | theta=22.59 | 0.701 | 0.99315  [195.60s]
//   T41 | 35.80 | theta=25.95 | 0.725 | 0.99488  [195.61s]
//   T53 | 40.75 | theta=30.94 | 0.759 | 0.99766  [195.63s]
//   T71 | 46.25 | theta=35.05 | 0.758 | 0.99550  [195.70s]
//   T97 | 52.22 | theta=39.76 | 0.761 | 0.99605  [196.04s]
//
// == 9. THE MERGE CRITERION f AGAINST THE TAIL ==
// level | p' | f = P(gap ≡ 0,±2 mod p') | tail P(gap>=2p') | f/tail | measured L
//   T7 | 11 | 0.0000e+0 | 1.3333e-1 | 0.000 | 1
//   T11 | 13 | 4.4444e-2 | 2.2222e-1 | 0.200 | 2
//   T13 | 17 | 4.8485e-2 | 1.2660e-1 | 0.383 | 2
//   T17 | 19 | 4.8844e-2 | 1.3935e-1 | 0.351 | 2
//   T19 | 23 | 3.1119e-2 | 9.9494e-2 | 0.313 | 3
//   T23 | 29 | 3.0660e-2 | 9.3770e-2 | 0.327 | 2
//   T29 | 31 | 3.7367e-2 | 8.2401e-2 | 0.453 | 4
//   T31 | 37 | 1.8445e-2 | 5.8997e-2 | 0.313 | -
//
// == 10. L, THE LONGEST ADJACENT-KILL RUN, FROM THE OPERATOR ==
// fold | L from operator spectrum | L by direct enumeration of the folded tile | U-FRAME 5 table
//   T5 --7--> : 2 | 2 agree | 2
//   T7 --11--> : 1 | 1 agree | 1
//   T11 --13--> : 2 | 2 agree | 2
//   T13 --17--> : 2 | 2 agree | 2
//   T17 --19--> : 2 | 2 agree | 2
//   T19 --23--> : 3 | 3 agree | 3
//   T23 --29--> : 2 | 2 agree | 3  <-- U-FRAME DISAGREES, the true value is 2
//   T29 --31--> : operator spectrum gives L = 4 (U-FRAME 5 table: 4, agree)
// ============================================================================
// READINGS. A9 asked for the histogram fold rule as a transfer operator, and
// then for the tail P(gap >= 2p) that A2, A3 and A5 all need. Both are here.
// The operator is exact; the tail is computed exactly level by level and its
// LAW is a fit, flagged as such in reading 7.
//
// 1. THE OPERATOR EXISTS AND IS CLOSED ON THE GAP WORD (derived, header).
//      count_q(d) = SUM_i SUM_{L>=0} [G_{L+1}(i) = d] * nu_q(g_i..g_{i+L})
//      nu_q = #{ a in Z/q : G_j = a or a-2 (mod q) for j=1..L;  a not in {0,2};
//                           a not in {G_{L+1}, G_{L+1}+2} }
//    The three clauses are: interior of the run dies, left end lives, right end
//    lives. The derivation needs one idea beyond the kill law: the folded tile
//    is Z/(qW) and q strikes the positions congruent to 0 or -2 THERE, so the
//    strike is one uniform rule and the copy index is bookkeeping. Shifting the
//    alignment by the residue of the run's left endpoint kills the last trace of
//    absolute position. Hence THE NEW HISTOGRAM IS A FUNCTION OF THE OLD GAP
//    WORD AND OF q, AND OF NOTHING ELSE — not of W mod q, not of the tile's
//    residues, not of the copy order. That is the misalignment principle in its
//    sharpest form: as k runs over the q copies the shifted alignment runs over
//    Z/q exactly once, so the operator integrates over all alignments with
//    weight one each.
//
// 2. IT VERIFIES EXACTLY, AT EVERY FOLD (section 2, 3, 5). Histogram equality
//    size for size against the true fold at T7->T11, T11->T13, T13->T17,
//    T17->T19, T19->T23 and T23->T29, with the mass identity
//    sum_d count_q(d) = D(q-2) exact each time. Iterated from the T7 word
//    alone, with no sieve, it walks to T23 and reproduces every glossary
//    census, G2 = 42, 66, 108, 150, 204. Two folds past the enumerable range it
//    gives T29 (D = 214,708,725, G2 = 258) and T31 (D = 6,226,553,025,
//    G2 = 348), both passing sum(d * count(d)) = W. Total cost 27 s.
//
// 3. THE DIAGONAL PART OF THE OPERATOR IS THE PAIR CORRELATION (section 4).
//    At L = 0, nu_q(g) = q - |{0, 2, g, g+2}| = rho_q(g), the adapted pair
//    correlation of grain-census.js. So
//        count_q(d) = rho_q(d) * count_p(d)  +  merge terms,
//    verified size by size at every fold. This is the brief's skeleton with the
//    multiplicity filled in: of the q copies of a gap, exactly 2, 3 or 4 have an
//    endpoint struck (2 iff q | g, 3 iff g = +-2 mod q, 4 otherwise) and the
//    rest survive intact. The merge share of the new gaps falls 22.2%, 17.8%,
//    13.0%, 11.5%, 9.4%, 7.3%, 6.8% at folds 11 to 31, sitting just above 2/q.
//
// 4. THE MERGE TERMS ARE THE TAIL, AND THAT IS THE WHOLE REDUCTION. For L >= 1
//    the candidate set A_L has at most two elements and only shrinks; nonempty
//    A_L with L >= 2 forces every interior gap of the run to be 0 or +-2 mod q.
//    Grain gaps are multiples of 6, so the smallest admissible interior gap is
//    about 2q. Order-L merging therefore lives on runs of L-1 consecutive gaps
//    drawn from above 2q. The operator's own structure says the L question is
//    the tail question at threshold 2q and nothing else.
//
// 5. THE TAIL WITHOUT A TILE (section 6). Extending the grain-census
//    inclusion-exclusion gives count(d)/D at ANY level with nothing in memory.
//    Two facts make it cheap: primes q > d have |A_q| = 2m exactly (m = number
//    of forced slots), so they contribute a closed factor and only q <= d need
//    class bookkeeping; and ratios to D = prod(q-2) are formed factor by factor,
//    so nothing overflows at any level. Validated against the exact enumerated
//    tails at T7, T11, T13, T17, T19, T23, T29 and T31 to 5e-16 absolute, which
//    is round-off.
//
// 6. THE PAYOFF: P(gap >= 2p') COLLAPSES ALONG THE DIAGONAL (section 7).
//    The six values the brief asked to reproduce come back exactly:
//      T7@11  0.13333   T11@13 0.22222   T13@17 0.12660
//      T17@19 0.13935   T19@23 0.099494  T23@29 0.093770
//    and the mean gaps 14.00, 17.11, 20.22, 22.92, 25.61, 28.05. Continued with
//    the law rather than with tiles, the diagonal runs
//      T29@31 8.24e-2   T31@37 5.90e-2   T37@41 5.30e-2   T53@59 3.49e-2
//      T71@73 2.40e-2   T97@101 7.94e-3  T127@131 3.43e-3  T139@149 2.37e-3.
//    Thirty-one exact points over a range of 20 in x, against the five the
//    u-frame had. The collapse is not fast, and it is not monotone (the dips at
//    T11@13 and T41@43 are the same singular-series comb that shapes the head),
//    but over the range it is a factor of 56.
//
// 7. THE DECAY RATE (section 7 regression, section 8 cross-check). FIT, not
//    theorem. Along the diagonal,
//        ln(1/P(gap >= 2p')) = -0.235 + 1.2992 * (2p'/mbar),  R2 = 0.993, n = 31
//    and on the last 23 points alone the slope is 1.355, R2 = 0.994. So
//        P(gap >= t)  ~  exp( -t / (0.77 * mbar) ).
//    Cross-checked WITHIN each level, which is an independent measurement:
//    fitting ln P(gap >= t) against t over t in [1.5, 3.5]*mbar gives
//    theta/mbar = 0.660, 0.675, 0.701, 0.725, 0.759, 0.758, 0.761 at T23, T29,
//    T31, T41, T53, T71, T97, with R2 from 0.990 to 0.998. The two fits, one
//    across levels and one within a level, agree to three percent. The tail is
//    exponential and its scale is a fixed fraction of the mean gap, settling
//    near 0.76.
//
// 8. THE THRESHOLD RECEDES, WHICH IS THE STRUCTURAL CLAIM (section 7b).
//    mbar/ln^2 p falls 3.70, 2.85, 2.61, 2.50, 2.50, 2.42 at p = 7, 23, 37, 97,
//    199, 2003, drifting toward the Mertens value e^{2 gamma}/(4 C_2) = 1.20
//    but very slowly, and not strictly: the printed column dips to 2.486 at
//    p = 127 and comes back to 2.502 at p = 199. The threshold in the same units, 2p'/ln^2 p, rises without
//    bound: 5.8, 5.9, 6.3, 9.7, 15.1, 42.4, 69.6. So 2p'/mbar grows roughly
//    linearly in p/ln^2 p and the tail is the exponential of minus that.
//    CONFIRMED as measured behaviour over p = 7 to 2003 for the mean gap, and
//    over p = 7 to 139 for the tail itself.
//
// 9. WHAT IT SAYS ABOUT L (section 9, and the implied-cap row of section 7).
//    The merge criterion f is a roughly constant fraction of the tail:
//    f / P(gap >= 2p') = 0.20, 0.38, 0.35, 0.31, 0.33, 0.45, 0.31 at T11 to
//    T31, so ln(1/f) = ln(1/tail) + about 1.1. Feeding the tail law into
//    U-FRAME step 6,
//        L ~ lnD/ln(1/f) <= lnD/ln(1/tail) ~ theta(p)*0.77*mbar/(2p) ~ 0.4*mbar,
//    which is polylog because mbar is. Measured directly, lnD/ln(1/tail) divided
//    by ln^2 p is 0.36, 0.64, 0.68, 0.78, 0.85, 0.79, 0.87, 0.82 at p = 7, 19,
//    37, 53, 71, 89, 107, 131: FLAT near 0.8 over the whole range. Hence
//        SUM_{p<=x} L*mbar ~ SUM 0.8 ln^2 p * 2.4 ln^2 p ~ 2 x ln^3 x  <<  x^2,
//    and on this evidence the u-frame route closes. EXTRAPOLATED, and the two
//    weak links are named in reading 11.
//
// 10. REFUTATION, and it stays visible (section 10). U-FRAME section 5 lists
//    the longest adjacent-kill run at fold 29 as 3, and section 5a repeats it in
//    the diagonal series 1, 2, 2, 2, 3, 3, 4. IT IS 2. The operator's run-length
//    spectrum for T23 folded by 29 stops at L = 2, and direct enumeration over
//    all 29 copies of the folded tile agrees. Every other entry checks out two
//    ways. The corrected diagonal is
//        fold   7   11   13   17   19   23   29   31
//        L      2    1    2    2    2    3    2    4
//    so L is not monotone, and the dip at 29 is a second instance of the dip at
//    11 that section 5 already noticed. Note that the operator carries L for
//    free: max{L : byL(L) > 0} IS the longest adjacent-kill run, so any fold the
//    operator can do reports L without a separate experiment.
//
// 11. LIMITS, stated plainly. Exact: the operator, its histograms to T31, and
//    count(d)/D from the head engine. NOT exact: (a) the tail LAW of reading 7
//    is a fit over p = 7 to 139, and the head engine's leaf count roughly
//    doubles per prime step, so p = 139 costs 76 s and p = 200 is out of reach
//    at this cost; (b) the step from tail to L is an independence heuristic, and
//    the measured L (1, 2, 2, 2, 3, 2, 4) runs far below its cap (1.3, 3.3, 3.5,
//    5.1, 5.6, 6.7, 7.7), so the tail bounds L comfortably but only under that
//    heuristic; (c) SUM L*mbar is U-FRAME step 4's approximation, not an
//    identity. What is established outright is the SHAPE of the reduction: no
//    merge of order L can occur without L-1 consecutive gaps above 2q, so any
//    genuine tail bound at 2p is a genuine bound on merging, and the interval
//    difficulty is now concentrated in one scalar we can compute exactly.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   17.778% -> 17.8% and 11.477% -> 11.5%, the third and fourth merge shares
//     of reading 3, from the section 4 table.
//   Section 7's TAIL column supplies the whole continued diagonal of reading 6:
//     8.2401e-2 -> 8.24e-2, 5.8997e-2 -> 5.90e-2, 5.3016e-2 -> 5.30e-2,
//     3.4922e-2 -> 3.49e-2, 2.4008e-2 -> 2.40e-2, 7.9398e-3 -> 7.94e-3,
//     3.4282e-3 -> 3.43e-3, 2.3685e-3 -> 2.37e-3.
//   0.99766 at T53 -> the 0.998 top of reading 7's "R2 from 0.990 to 0.998".
//   Section 7b's 2p'/ln^2 p column -> reading 8's threshold series:
//     15.06 at p=199 -> 15.1, 42.35 at p=1009 -> 42.4, 69.59 at p=2003 -> 69.6.
//   Section 7's implied-cap row -> reading 9's flat-near-0.8 series:
//     0.355 -> 0.36, 0.788 -> 0.79, 0.867 -> 0.87, 0.817 -> 0.82.
//
// SAME VALUE, DIFFERENT NOTATION: the six diagonal tails written in reading 6
//   as 0.13333, 0.22222, 0.12660, 0.13935, 0.099494 and 0.093770 are section
//   7's 1.3333e-1, 2.2222e-1, 1.2660e-1, 1.3935e-1, 9.9494e-2 and 9.3770e-2.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   5e-16 in reading 5 is a rounded-up bound on section 6's abs-diff column,
//   whose largest entry is 4.72e-16 at T29.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// CORRECTED 2026-08-20 (mismatch adjudication #21). Reading 8's mbar/ln^2 p
// ladder had 2.49 at p = 199 and now has 2.50. Section 7b's printed column
// reads 2.495 at p = 97, 2.486 at p = 127 and 2.502 at p = 199, so 2.49 is
// p = 127's entry, one row above the prime the reading names, and p = 199
// rounds to 2.50. Old -> new: 2.49 -> 2.50 at p = 199. Correcting it removes
// the last apparent fall in the quoted six, which is why the reading now says
// the drift is not strictly monotone and names the dip at p = 127; the other
// five entries (3.697, 2.854, 2.612, 2.495, 2.417) all check out at the
// precision quoted. Reading 8's claim -- that mbar/ln^2 p drifts toward
// e^{2 gamma}/(4 C_2) = 1.20 very slowly -- is unaffected and is what the
// whole twelve-row column shows.
// ---------------------------------------------------------------------------
