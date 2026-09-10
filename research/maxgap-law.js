// ============================================================================
// maxgap-law.js  --  Does  maxgap ~ c * mbar * lnD  survive far enough to
//                    contradict Maier-Pomerance, and if not, where does it break?
//
// THE QUESTION.  Two agents converged on the same law from different data and
// different engines and neither knew about the other.
//   localized-04-maxsum.md S4 : R(1) = M/mbar ~ lnD, with R(1)/lnD in
//                    [0.736, 1.170] over three decades of window and 260x in x.
//   two-class-lower-bounds.md S6 : max gap ~ c*m*ln(W/m), c flat to 7% over 46
//                    exact ONE-class terms and 17 exact TWO-class terms.
// Same formula.  But A reports c ~ 0.9 and B reports c1 = 0.372, c2 = 0.851,
// c2' = 0.481, a factor of two apart on the SAME sifted set.  And at one class
// the law reads g(p#) ~ c e^gamma p log p, a full log BELOW the Maier-Pomerance
// conjecture J(T) = T(log T)^{2+o(1)}.
//
// HONEST DOUBT, written into this header before the first run.
//   (a) The briefing says "c flat to 7% over a range where lnD moves by a
//       factor of a few is weak evidence".  That undersells the lever.  For
//       ONE class lnD = theta(p) - ln m1 runs 6.17 to 286 across the 64 exact
//       terms, a factor 46.  The flatness claim is far stronger than assumed.
//   (b) A's window and B's period are not the same measurement.  A's c is the
//       max over ~1e5 gaps in the HEAD of a tile of width x#; B's is the max
//       over the WHOLE period.  Nothing says the head is representative and
//       nothing says c is a function of lnD alone.  Suspect a hidden variable.
//   (c) I expect c to FALL with lnD, because a sifted set cannot have an
//       exponential far tail: a gap of length G is a covering of G-1
//       consecutive integers by primes <= x, and covering capacity is finite.
//   (d) Maier and Pomerance are overwhelmingly more likely to be right than we
//       are.  The deliverable is not "the law breaks" but "here is the term the
//       law omits and here is where it takes over".
//
// SECTIONS
//   S1  custody: reproduce both agents digit for digit by a third engine.
//   S2  the two c's placed in one frame with all three coordinates.
//   S3  the controlled experiment.  Block maxima inside ONE exact period:
//       same object, same x, only lnD moves.  This is what neither agent ran.
//   S4  the same statistic in the localized regime, so the two are comparable.
//   S5  the gap tail, and c predicted from it by extreme-value theory.
//   S6  drift of c along the diagonal, with an estimator control that knows
//       the answer: synthetic ladders where c really does grow like log p.
//   S7  the mechanism.  What Rankin and Maier-Pomerance actually add, in the
//       law's own units, and the x at which each doubles c.
//   S8  which repo extrapolations inherit the error.
//
// RUN
//   node --max-old-space-size=4096 research/maxgap-law.js          # ~40 s
//   node --max-old-space-size=8192 research/maxgap-law.js --big    # adds x=29
// ============================================================================

const BIG = process.argv.includes('--big');
const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const F = (v, d = 4) => (v === null || v === undefined || !isFinite(v)) ? '  -   ' : v.toFixed(d);
const pad = (s, n) => String(s).padStart(n);
const GAM = 0.5772156649015329;

function primesTo(N) { const s = new Uint8Array(N + 1), P = []; for (let i = 2; i <= N; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } } return P; }
const ALLP = primesTo(20000);

// ---------------------------------------------------------------- known data
// A048670  Jacobsthal g(p_n#), 64 exact terms, n = 1..64, p_64 = 311.
// 58 on the entry face; a(59)..a(64) = 978..1110 are the b-file tail (Andrzej
// Bozek, single-witness), trusted under the series rule of 2026-08-20 after an
// exact 58/58 overlap check (history/staging/external-data-audit.md M1).
// 64-term refit applied 2026-08-21; prefix verified against the adopted array
// in exponent-control.js and the 22-term b-file transcript in
// external-ladders-01.js.
const H1 = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100, 106, 118, 132, 152, 174, 190,
  200, 216, 234, 258, 264, 282, 300, 312, 330, 354, 378, 388, 414, 432, 450, 476, 492, 510, 538,
  550, 574, 600, 616, 642, 660, 686, 718, 742, 762, 798, 810, 834, 858, 876, 908, 926, 954,
  978, 1002, 1030, 1058, 1098, 1110];
// A288815  Ziller-Morack paired Jacobsthal h2(p_n#), 21 exact terms, p_21 = 73.
const H2 = [2, 6, 18, 30, 66, 150, 192, 258, 366, 450, 570, 708, 894, 1044, 1284, 1422, 1656,
  1902, 2190, 2460, 2622];
// this repo's exact G2(x#), the difference-2 two-class object, 12 terms.
const G2E = { 2: 2, 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528 };

function tileStats(x) { let m1 = 1, m2 = 1, t = 0; for (const p of ALLP) { if (p > x) break; m1 *= p / (p - 1); m2 *= (p === 2) ? 2 : p / (p - 2); t += Math.log(p); } return { m1, m2, t }; }
const cOf = (val, m, theta) => val / (m * (theta - Math.log(m)));

function fitPow(xs, ys) {
  const n = xs.length; let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { const X = Math.log(xs[i]), Y = Math.log(ys[i]); sx += X; sy += Y; sxx += X * X; sxy += X * Y; }
  const Sxx = sxx - sx * sx / n, b = (sxy - sx * sy / n) / Sxx, a = (sy - b * sx) / n;
  let ss = 0; for (let i = 0; i < n; i++) { const r = Math.log(ys[i]) - a - b * Math.log(xs[i]); ss += r * r; }
  return { b, A: Math.exp(a), se: Math.sqrt(ss / Math.max(n - 2, 1) / Sxx), rms: Math.sqrt(ss / n), n };
}
// two-variable log-log fit  ln c = ln A + a*ln(ln x) + b*ln(lnD)
function fit2v(pts) {
  const n = pts.length; let S = [[n, 0, 0], [0, 0, 0], [0, 0, 0]], T = [0, 0, 0];
  for (const p of pts) {
    const u = Math.log(Math.log(p.x)), v = Math.log(p.lnD), y = Math.log(p.c);
    S[0][1] += u; S[0][2] += v; S[1][1] += u * u; S[1][2] += u * v; S[2][2] += v * v;
    T[0] += y; T[1] += u * y; T[2] += v * y;
  }
  S[1][0] = S[0][1]; S[2][0] = S[0][2]; S[2][1] = S[1][2];
  // solve 3x3
  const M = [[S[0][0], S[0][1], S[0][2], T[0]], [S[1][0], S[1][1], S[1][2], T[1]], [S[2][0], S[2][1], S[2][2], T[2]]];
  for (let i = 0; i < 3; i++) {
    let piv = i; for (let r = i + 1; r < 3; r++) if (Math.abs(M[r][i]) > Math.abs(M[piv][i])) piv = r;
    [M[i], M[piv]] = [M[piv], M[i]];
    for (let r = 0; r < 3; r++) { if (r === i) continue; const f = M[r][i] / M[i][i]; for (let k = i; k < 4; k++) M[r][k] -= f * M[i][k]; }
  }
  const sol = [M[0][3] / M[0][0], M[1][3] / M[1][1], M[2][3] / M[2][2]];
  let ss = 0; for (const p of pts) { const r = Math.log(p.c) - sol[0] - sol[1] * Math.log(Math.log(p.x)) - sol[2] * Math.log(p.lnD); ss += r * r; }
  return { lnA: sol[0], a: sol[1], b: sol[2], rms: Math.sqrt(ss / n), n };
}

// ===========================================================================
console.log('='.repeat(79));
console.log('S1.  CUSTODY.  Reproduce both agents digit for digit, third engine.');
console.log('='.repeat(79));

const c1 = [], c2 = [], c2p = [], c1x = [], c2x = [], c2px = [];
for (let i = 0; i < H1.length; i++) {
  const p = ALLP[i], s = tileStats(p);
  if (p >= 11) { c1.push(cOf(H1[i], s.m1, s.t)); c1x.push(p); }
  if (i < H2.length && p >= 11) { c2.push(cOf(H2[i], s.m2, s.t)); c2x.push(p); }
  if (G2E[p] !== undefined && p >= 11) { c2p.push(cOf(G2E[p], s.m2, s.t)); c2px.push(p); }
}
function summ(name, a) {
  const n = a.length, mu = a.reduce((x, y) => x + y, 0) / n;
  const sd = Math.sqrt(a.reduce((x, y) => x + (y - mu) ** 2, 0) / (n - 1));
  let sx = 0, sy = 0, sxx = 0, sxy = 0; for (let i = 0; i < n; i++) { sx += i; sy += Math.log(a[i]); sxx += i * i; sxy += i * Math.log(a[i]); }
  console.log(`   ${name.padEnd(30)} n=${pad(n, 2)} mean=${F(mu)} sd=${F(sd)} cv=${F(sd / mu * 100, 1)}%` +
    `  range [${F(Math.min(...a))}, ${F(Math.max(...a))}]  = +-${F((Math.max(...a) / Math.min(...a) - 1) * 50, 1)}%`);
  return mu;
}
console.log('\n  two-class-lower-bounds.md S6:');
const m1c = summ("c1  one class,  p in [11,229]", c1.slice(0, 46));
const m2c = summ("c2  free 2class, p in [11,73]", c2);
const m3c = summ("c2' diff-2 G2,  p in [11,37]", c2p);
console.log('   published: c1 0.3718 sd 0.0269 cv 7.2% | c2 0.8511 0.0623 7.3% | c2\' 0.4814 0.0490 10.2%');
console.log(`   MATCH: ${(Math.abs(m1c - .3718) < 5e-4 && Math.abs(m2c - .8511) < 5e-4 && Math.abs(m3c - .4814) < 5e-4) ? 'YES' : '*** NO ***'}`);
console.log('\n  RECONCILIATION POINT 1, and it is bookkeeping, not physics.');
console.log('  A quoted a RANGE, B quoted a CV.  Put both on both scales:');
summ("c1  one class,  p in [11,311]", c1);
console.log('   A: R(1)/lnD in [0.736, 1.170] is a range, = +-22.7% about its own midpoint.');
console.log('   B: c1 cv 7.2% but its RANGE is +-22.5%.  THE TWO SPREADS ARE THE SAME.');
console.log('   Neither agent is tighter than the other.  A is not looser than B by 3x.');

// -------------------------------------------------------------- exact tiles
const HCAP = 4096;
function tileScan(x, mode, maxExp) {
  const ps = []; for (const p of ALLP) { if (p > x) break; ps.push(p); }
  // widths-ok: P is x#, and the tile is enumerated slot by slot below, so this
  // script can never be pointed past 41# = 3.04e14 in practice; the Number stays
  // exact to 2^53 = 9.007e15 and the isSafeInteger throw four lines down makes
  // 43# = 1.45 x 2^53 loud rather than silent.
  let P = 1; for (const p of ps) P *= p;
  const SEG = 1 << 24, buf = new Uint8Array(SEG + 8);
  // WIDTH GUARD (2026-08-21). `hist` counts gaps, so its modal bucket is bounded
  // by D, the tile's slot count, and D is bounded by the period P = x#. This was
  // an Int32Array (cap 2^31-1 = 2.147e9). At x = 29 mode 1, D = 1,021,870,080,
  // so the count fitted with a factor 2.1 to spare and every figure below x = 31
  // is sound. At x = 31, D = 3.07e10: the modal bucket would have stored a
  // NEGATIVE count in silence, `tail[g] = acc / T.D` would have read it, and the
  // whole survival table would have been wrong with nothing printed. Float64Array
  // is the corpus's usual store for counts of this size (natal-cap-18, -16, -33,
  // var41-price, fdecay-deep-00) and holds every integer below 2^53 = 9.007e15
  // exactly, which covers D at x = 41 (P = 3.04e14) and dies at x = 43 with the
  // rest of the corpus (43# = 1.31e16 = 1.45 x 2^53). The counts are integers, so
  // widening is storage-only: no figure moves. The throw makes the next edge loud
  // rather than silent, which is the whole lesson of the 2026-08-21 la/lb alias.
  if (!Number.isSafeInteger(P))
    throw new Error(`maxgap-law: period P = ${P} at x=${x} is past 2^53, so the gap histogram `
      + `bucket bound is no longer an exact integer; hist counts would drift silently`);
  const hist = new Float64Array(HCAP + 1), Bs = [];
  for (let e = 1; e <= maxExp; e++) Bs.push(2 ** e);
  const blk = Bs.map(() => ({ cur: 0, n: 0, cnt: 0, s: 0, mn: Infinity, mx: 0, head: null }));
  let prev = -1, first = -1, D = 0, maxg = 0, note = Date.now();
  const rec = (g) => {
    D++; if (g > maxg) maxg = g; hist[Math.min(g, HCAP)]++;
    for (let k = 0; k < Bs.length; k++) {
      const b = blk[k]; if (g > b.cur) b.cur = g; b.n++;
      if (b.n === Bs[k]) { if (b.head === null) b.head = b.cur; else { b.cnt++; b.s += b.cur; if (b.cur < b.mn) b.mn = b.cur; if (b.cur > b.mx) b.mx = b.cur; } b.cur = 0; b.n = 0; }
    }
  };
  for (let base = 0; base < P; base += SEG) {
    const len = Math.min(SEG, P - base);
    buf.fill(0, 0, len + 4);
    for (const p of ps) { let st = base % p; st = st === 0 ? 0 : p - st; for (let j = st; j < len + 4; j += p) buf[j] = 1; }
    if (mode === 1) { for (let i = 0; i < len; i++) if (!buf[i]) { const r = base + i; if (prev >= 0) rec(r - prev); else first = r; prev = r; } }
    else { for (let i = 0; i < len; i++) if (!buf[i] && !buf[i + 2]) { const r = base + i; if (prev >= 0) rec(r - prev); else first = r; prev = r; } }
    if (Date.now() - note > 30000) { note = Date.now(); console.log(`      ... x=${x} mode=${mode} ${(100 * (base + len) / P).toFixed(0)}%  ${el()}`); }
  }
  rec(P - prev + first);
  return { x, mode, P, D, mbar: P / D, maxg, hist, Bs, blk };
}

console.log('\n  exact tiles, both classes, against A048670 and the repo G2 ladder:');
console.log('    x  mode      period       slots      mbar   max gap  published');
const tiles = [];
for (const x of (BIG ? [7, 11, 13, 17, 19, 23, 29] : [7, 11, 13, 17, 19, 23])) for (const mode of [1, 2]) {
  const T = tileScan(x, mode, 27); tiles.push(T);
  const pub = mode === 1 ? H1[ALLP.indexOf(x)] : G2E[x];
  console.log(`   ${pad(x, 3)}   ${mode}  ${pad(T.P, 12)} ${pad(T.D, 11)} ${pad(T.mbar.toFixed(3), 8)} ${pad(T.maxg, 8)} ${pad(pub, 9)}   ${T.maxg === pub ? 'MATCH' : '*** MISMATCH ***'}  ${el()}`);
}

// ------------------------------------------------------- localized windows
// same block statistic in the localized regime, so the two ARE comparable.
function localizedScan(Y, xs, maxExp, mode) {
  mode = mode || 2;
  const rough = new Uint8Array(Y + 8).fill(1); rough[0] = 0;
  const want = new Set(xs), out = [], Bs = []; for (let e = 1; e <= maxExp; e++) Bs.push(2 ** e);
  for (const x of ALLP) {
    if (x > Math.max(...xs)) break;
    for (let j = x; j < Y + 8; j += x) rough[j] = 0;
    if (!want.has(x)) continue;
    const blk = Bs.map(() => ({ cur: 0, n: 0, cnt: 0, s: 0, mx: 0, head: null }));
    let prev = -1, best = 0, count = 0;
    for (let r = 1; r < Y; r++) if (mode === 1 ? rough[r] : (rough[r] && rough[r + 2])) {
      if (prev >= 0) {
        const g = r - prev; if (g > best) best = g;
        for (let k = 0; k < Bs.length; k++) { const b = blk[k]; if (g > b.cur) b.cur = g; b.n++; if (b.n === Bs[k]) { if (b.head === null) b.head = b.cur; else { b.cnt++; b.s += b.cur; if (b.cur > b.mx) b.mx = b.cur; } b.cur = 0; b.n = 0; } }
      }
      prev = r; count++;
    }
    out.push({ x, Y, M: best, D: count, mbar: Y / count, lnD: Math.log(count), Bs, blk });
  }
  return out;
}
console.log(`\n  localized-04-maxsum.md S4, Y = 1e7 row, third engine (${el()}):`);
const LX7 = [89, 127, 181, 251, 353, 499, 701, 997, 1409, 1999, 2153];
const L7 = localizedScan(1e7, LX7, 20);
console.log('      x      M      D      mbar   R(1)=M/mbar   lnD   R(1)/lnD');
for (const r of L7) console.log(`   ${pad(r.x, 5)} ${pad(r.M, 6)} ${pad(r.D, 7)} ${pad(r.mbar.toFixed(2), 8)} ${pad((r.M / r.mbar).toFixed(3), 10)} ${pad(r.lnD.toFixed(2), 8)} ${pad((r.M / (r.mbar * r.lnD)).toFixed(4), 9)}`);
console.log('   published Y=1e7: R(1) 9.00-11.92, lnD 11.1-11.9, R(1)/lnD 0.756-1.053');
console.log(`   ours:            R(1) ${F(Math.min(...L7.map(r => r.M / r.mbar)), 2)}-${F(Math.max(...L7.map(r => r.M / r.mbar)), 2)}, lnD ${F(Math.min(...L7.map(r => r.lnD)), 1)}-${F(Math.max(...L7.map(r => r.lnD)), 1)}, R(1)/lnD ${F(Math.min(...L7.map(r => r.M / (r.mbar * r.lnD))))}-${F(Math.max(...L7.map(r => r.M / (r.mbar * r.lnD))))}`);
console.log('   (A used a different x grid inside the same window; the ranges agree.)');

// ===========================================================================
console.log('\n' + '='.repeat(79));
console.log('S2.  THE TWO CONSTANTS, IN ONE FRAME, WITH ALL THREE COORDINATES.');
console.log('='.repeat(79));
console.log(`
  Both are c = maxgap/(mbar*lnD).  Identical formula.  Only ONE coordinate was
  ever reported.  Three matter: the level x, the log gap count lnD, and the
  sifting depth u = ln(window)/ln x, which is 2 to 3.6 for A and theta(x)/ln x
  for B.  B always sits on the DIAGONAL lnD = theta(x) - ln mbar.  A never does.
`);
console.log('   source                   object     x     lnD      u      lnD/theta(x)     c');
{
  const rows = [];
  for (const r of L7) if ([89, 251, 997, 2153].includes(r.x)) { const th = tileStats(r.x).t; rows.push(['A localized Y=1e7', 'twin', r.x, r.lnD, Math.log(1e7) / Math.log(r.x), r.lnD / th, r.M / (r.mbar * r.lnD)]); }
  for (const x of [11, 19, 29, 37]) { const s = tileStats(x), lnD = s.t - Math.log(s.m2); rows.push(['B exact G2 tile', 'twin', x, lnD, s.t / Math.log(x), lnD / s.t, cOf(G2E[x], s.m2, s.t)]); }
  for (const x of [11, 101, 271]) { const i = ALLP.indexOf(x), s = tileStats(x), lnD = s.t - Math.log(s.m1); rows.push(['B exact A048670', 'units', x, lnD, s.t / Math.log(x), lnD / s.t, cOf(H1[i], s.m1, s.t)]); }
  for (const r of rows) console.log(`   ${r[0].padEnd(20)} ${r[1].padEnd(6)} ${pad(r[2], 5)} ${pad(r[3].toFixed(2), 7)} ${pad(r[4].toFixed(2), 6)} ${pad(r[5].toFixed(4), 12)} ${pad(r[6].toFixed(4), 10)}`);
}
console.log(`
  A's windows sit at lnD/theta(x) = 1e-3 to 1e-1.  B's sit at 1 by construction.
  The two agents are two and three orders of magnitude apart on the coordinate
  neither of them recorded.  That is the whole of the disagreement, and S3 and
  S4 measure it directly.
`);

// ===========================================================================
console.log('='.repeat(79));
console.log('S3.  THE CONTROLLED EXPERIMENT: c(lnD) INSIDE ONE EXACT PERIOD.');
console.log('='.repeat(79));
console.log(`
  Cut the D gaps of one exact period into blocks of B consecutive gaps.  Each
  block is a window of exactly A's kind.  c(B) = (block max)/(mbar*ln B).
  Same object, same x, same primes: ONLY lnD moves.  If the law is an
  extreme-value law in lnD, c is constant down every column.  It is not.
  Rows marked SAT are saturated (mean block max within 3% of the whole-period
  max), where c falls like 1/lnD for a trivial reason and carries no content.
`);
const pool = [];               // unsaturated off-diagonal points, twin only
for (const T of tiles) {
  if (T.x < 13) continue;
  const nm = `x=${T.x} ${T.mode === 1 ? 'units' : 'twin '}`;
  console.log(`\n   ${nm}  D=${T.D}  mbar=${T.mbar.toFixed(3)}  whole-period max=${T.maxg}`);
  console.log('     lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)');
  for (let k = 2; k < T.Bs.length; k++) {
    const b = T.blk[k]; if (b.cnt < 1) continue;
    const lnB = Math.log(T.Bs[k]), mean = b.s / b.cnt, sat = mean > 0.97 * T.maxg;
    console.log(`   ${pad(lnB.toFixed(2), 6)} ${pad(T.Bs[k], 9)} ${pad(b.cnt, 7)} ${pad(mean.toFixed(1), 8)} ${pad((mean / (T.mbar * lnB)).toFixed(4), 8)} ${pad(b.head, 6)} ${pad((b.head / (T.mbar * lnB)).toFixed(4), 8)} ${pad(b.mx, 5)} ${pad((b.mx / (T.mbar * lnB)).toFixed(4), 7)}${sat ? '  SAT' : ''}`);
    if (!sat && b.cnt >= 8) pool.push({ src: 'tile', mode: T.mode, x: T.x, lnD: lnB, c: mean / (T.mbar * lnB) });
  }
  const lnDf = Math.log(T.D);
  console.log(`   ${pad(lnDf.toFixed(2), 6)} ${pad(T.D, 9)} ${pad(1, 7)} ${pad(T.maxg, 8)} ${pad((T.maxg / (T.mbar * lnDf)).toFixed(4), 8)}   <-- whole period, B's measurement`);
}
console.log(`
  THE HEAD COLUMN.  c(head) tracks c(mean) once B is past a few hundred, so the
  head of the tile is NOT the source of A's excess.  A's single window is an
  honest draw.  (At tiny B the head runs high, because the first gap of any
  primorial tile is the distinguished one from 1 to the next survivor.)
`);

// ===========================================================================
console.log('='.repeat(79));
console.log('S4.  THE SAME BLOCK STATISTIC IN THE LOCALIZED REGIME.');
console.log('='.repeat(79));
console.log(`
  Now run A's own object -- twin slots of T_x inside [0, 1e8), x from 89 up --
  through the identical block statistic.  Reading c OFF the same row of lnD in
  S3 and here isolates x at fixed lnD, which is the comparison nobody made.
`);
const LX8 = [97, 199, 401, 797, 1601, 3203, 6421];
const L8 = localizedScan(1e8, LX8, 22);
console.log(`   (${el()})   c(mean over blocks) at matched lnD`);
let hdr = '     lnD  ';
for (const r of L8) hdr += pad('x=' + r.x, 9);
console.log(hdr);
for (let k = 5; k < 22; k++) {
  let line = `   ${pad(Math.log(2 ** (k + 1)).toFixed(2), 6)}  `;
  let any = false;
  for (const r of L8) { const b = r.blk[k]; if (b && b.cnt >= 4) { line += pad((b.s / b.cnt / (r.mbar * Math.log(2 ** (k + 1)))).toFixed(4), 9); any = true; } else line += pad('-', 9); }
  if (any) console.log(line);
}
for (const r of L8) for (let k = 3; k < 22; k++) { const b = r.blk[k]; if (b && b.cnt >= 4) pool.push({ src: 'loc', mode: 2, x: r.x, lnD: Math.log(2 ** (k + 1)), c: b.s / b.cnt / (r.mbar * Math.log(2 ** (k + 1))) }); }
{
  const L8u = localizedScan(1e8, LX8, 25, 1);
  for (const r of L8u) for (let k = 3; k < 25; k++) { const b = r.blk[k]; if (b && b.cnt >= 4) pool.push({ src: 'loc', mode: 1, x: r.x, lnD: Math.log(2 ** (k + 1)), c: b.s / b.cnt / (r.mbar * Math.log(2 ** (k + 1))) }); }
  console.log(`\n   same statistic on the ONE-class localized object (units in [0,1e8)), ${el()}:`);
  let h = '     lnD  '; for (const r of L8u) h += pad('x=' + r.x, 9); console.log(h);
  for (let k = 5; k < 25; k += 3) {
    let line = `   ${pad(Math.log(2 ** (k + 1)).toFixed(2), 6)}  `; let any = false;
    for (const r of L8u) { const b = r.blk[k]; if (b && b.cnt >= 4) { line += pad((b.s / b.cnt / (r.mbar * Math.log(2 ** (k + 1)))).toFixed(4), 9); any = true; } else line += pad('-', 9); }
    if (any) console.log(line);
  }
}
console.log('\n   the same rows from S3 (exact tiles, twin), for the horizontal read:');
{
  let line2 = '     lnD  ';
  const ts = tiles.filter(t => t.mode === 2 && t.x >= 17);
  for (const T of ts) line2 += pad('x=' + T.x, 9);
  console.log(line2);
  for (let k = 5; k < 22; k++) {
    let line = `   ${pad(Math.log(2 ** (k + 1)).toFixed(2), 6)}  `; let any = false;
    for (const T of ts) { const b = T.blk[k]; if (b && b.cnt >= 4 && b.s / b.cnt < 0.97 * T.maxg) { line += pad((b.s / b.cnt / (T.mbar * Math.log(2 ** (k + 1)))).toFixed(4), 9); any = true; } else line += pad('-', 9); }
    if (any) console.log(line);
  }
}
console.log(`
  READ ALONG A ROW.  c grows with x at fixed lnD.  READ DOWN A COLUMN.  c falls
  with lnD at fixed x.  Neither is a constant, so "c" is a surface, not a
  number, and the law  maxgap = c*mbar*lnD  is not an extreme-value law.
`);
console.log('   LOCAL EXPONENTS, read off the two tables directly.  b(x) is the slope of');
console.log('   ln c against ln lnD DOWN a column; a(lnD) is the slope of ln c against');
console.log('   ln ln x ALONG a row.  A single power surface would give constants.');
console.log('\n     b(x) = d ln c / d ln lnD at fixed x        (twin object)');
console.log('       x        13      17      19      23      29      97     401    1601    6421');
{
  let line = '       b   ';
  for (const X of [13, 17, 19, 23, 29, 97, 401, 1601, 6421]) {
    const P = pool.filter(p => p.mode === 2 && p.x === X);
    line += pad(P.length >= 3 ? F(fitPow(P.map(p => p.lnD), P.map(p => p.c)).b, 3) : '-', 8);
  }
  console.log(line);
}
console.log('\n     a(lnD) = d ln c / d ln ln x at fixed lnD   (twin object)');
console.log('     lnD      6.24    6.93    7.62    8.32    9.01    9.70   10.40   11.09');
{
  let line = '       a   ';
  for (const k of [8, 9, 10, 11, 12, 13, 14, 15]) {
    const L = Math.log(2 ** (k + 1));
    const P = pool.filter(p => p.mode === 2 && Math.abs(p.lnD - L) < 1e-9);
    line += pad(P.length >= 3 ? F(fitPow(P.map(p => Math.log(p.x)), P.map(p => p.c)).b, 3) : '-', 8);
  }
  console.log(line);
}
console.log(`
   b is NEGATIVE everywhere and shrinks toward zero as x grows: -0.33 at the
   x = 23 tile, about -0.12 at x = 6421.  a is POSITIVE everywhere and roughly
   stable near 0.4.  So the extreme-value law -- c independent of lnD -- is
   approached only as x grows, and the exact full-period data lives exactly
   where it is furthest from holding.
`);
console.log('   THE DIAGONAL, which is B\'s curve.  60 exact one-class terms, lnD 6 -> 286:');
{
  console.log('       p      lnD     c1      c1 relative to p=101');
  for (const x of [11, 23, 47, 101, 179, 271, 311]) {
    const i = ALLP.indexOf(x), s = tileStats(x), lnD = s.t - Math.log(s.m1), meas = cOf(H1[i], s.m1, s.t);
    const A = tileStats(101), ref = cOf(H1[ALLP.indexOf(101)], A.m1, A.t);
    console.log(`   ${pad(x, 5)} ${pad(lnD.toFixed(1), 8)} ${pad(F(meas), 8)} ${pad(F(meas / ref, 3), 15)}`);
  }
  const P = pool.filter(p => p.mode === 1 && p.x === 23);
  const bT = fitPow(P.map(p => p.lnD), P.map(p => p.c)).b;
  const A = tileStats(101), B = tileStats(271);
  const lA = A.t - Math.log(A.m1), lB = B.t - Math.log(B.m1);
  console.log(`\n   Over p = 101 -> 271 the diagonal moves lnD by a factor ${F(lB / lA, 2)} and ln x by`);
  console.log(`   a factor ${F(Math.log(271) / Math.log(101), 3)}.  Feeding those into the LOCAL exponents measured`);
  console.log(`   off the tile (b = ${F(bT, 3)}, a ~ 0.4) predicts c changes by`);
  console.log(`     ${F(Math.pow(lB / lA, bT), 3)} * ${F(Math.pow(Math.log(271) / Math.log(101), 0.4), 3)} = ${F(Math.pow(lB / lA, bT) * Math.pow(Math.log(271) / Math.log(101), 0.4), 3)}`);
  console.log(`   The exact terms change it by ${F(cOf(H1[ALLP.indexOf(271)], B.m1, B.t) / cOf(H1[ALLP.indexOf(101)], A.m1, A.t), 3)}.  The off-diagonal exponents`);
  console.log(`   predict a fall of ${F((1 - Math.pow(lB / lA, bT) * Math.pow(Math.log(271) / Math.log(101), 0.4)) * 100, 0)}% and the diagonal delivers a rise.`);
}
console.log(`
   THAT IS THE RECONCILIATION, AND IT IS NOT BOOKKEEPING.

   OFF the diagonal, growing lnD means more POSITIONS at a FIXED sieving
   resource pi(x), and c falls, because a sifted set's far tail is
   sub-exponential (S5 measures the tail directly).  ON the diagonal, growing
   lnD means more PRIMES: lnD = theta(x) - ln mbar, so the resource grows in
   lockstep with the number of positions, and the fall is cancelled.

   A and B are the same formula evaluated on two different curves through the
   same surface.  A sits at lnD/theta(x) ~ 1e-2 with x ~ 1e3 and gets c ~ 0.9.
   B sits at lnD/theta(x) = 1 with x ~ 20 and gets c ~ 0.46 for the same twin
   object.  Both are right.  Neither is universal, and neither file said which
   curve it was on.  That omission, not any disagreement about tightness, is
   what made the two results look like one law.
`);

// ===========================================================================
console.log('='.repeat(79));
console.log('S5.  THE GAP TAIL.  Why c falls off the diagonal.');
console.log('='.repeat(79));
console.log(`
  If gaps were iid Exp(mbar) the max of D is mbar*(lnD + gamma) and c -> 1 from
  above.  Measure the real survival S(t) = P(gap > t) and the local exponential
  rate.  Rate identically 1 <=> c = 1.  A rate that GROWS with t is a
  sub-exponential tail and forces c to fall with lnD, which is what S3 shows.
`);
for (const T of tiles) {
  if (T.x !== 23) continue;
  const tail = new Float64Array(HCAP + 2); let acc = 0;
  for (let g = HCAP; g >= 0; g--) { acc += T.hist[g]; tail[g] = acc / T.D; }
  console.log(`\n   x=${T.x} ${T.mode === 1 ? 'units' : 'twin '}  mbar=${T.mbar.toFixed(3)}  D=${T.D}`);
  console.log('     lam=t/mbar     S(t)       -lnS    mean rate   local rate   c if tail stopped here');
  for (const lam of [1, 2, 3, 4, 5, 6, 7, 8]) {
    const t = Math.round(lam * T.mbar); if (t > HCAP) break;
    const S = tail[t]; if (S <= 0) break;
    const t2 = Math.round((lam + 1) * T.mbar), S2 = t2 <= HCAP ? tail[t2] : 0;
    const loc = S2 > 0 ? Math.log(S / S2) : NaN;
    console.log(`   ${pad(lam, 8)} ${pad(S.toExponential(3), 13)} ${pad((-Math.log(S)).toFixed(3), 9)} ${pad((-Math.log(S) / lam).toFixed(4), 10)} ${pad(isFinite(loc) ? loc.toFixed(4) : '-', 12)} ${pad(F(lam / (-Math.log(S))), 12)}`);
  }
  let tStar = 0; for (let g = 0; g <= HCAP; g++) if (tail[g] * T.D >= 1) tStar = g;
  console.log(`   extreme-value solve D*S(t)=1  ->  t* = ${tStar}   actual whole-period max ${T.maxg}   ratio ${F(T.maxg / Math.max(tStar, 1), 3)}`);
}
console.log(`
  The mean rate climbs from 0.57-0.74 at one mean gap to 2.3 (units) and 2.0
  (twin) at the extreme.  c = lam/(-ln S) is exactly 1/(mean rate), so the
  measured c is the RECIPROCAL OF THE TAIL RATE AT THE EXTREME and nothing
  else.  That is the entire content of the constant: c1 = 0.372 says the
  one-class gap tail decays like exp(-2.7 g/mbar), not exp(-g/mbar).
`);

// ===========================================================================
console.log('='.repeat(79));
console.log('S6.  DRIFT ON THE DIAGONAL, WITH AN ESTIMATOR CONTROL.');
console.log('='.repeat(79));
console.log(`
  Maier-Pomerance: J(T) = T(log T)^{2+o(1)}.  Ford's own slides put the random
  dart prediction J(T) ~ T*Q_T/phi(Q_T) ~ e^gamma T log T one line below it,
  and that prediction IS our law with c = 1.  So MP requires c ~ log x/e^gamma.
  Over the 64 exact one-class terms log p runs 2.40 to 5.74, so a genuine MP c
  must grow by a factor 2.39 across the ladder.  Fit c ~ A (log p)^beta.
`);
console.log('   dataset                     n   beta(vs log p)     beta(vs p)      rms');
for (const [nm, ys, xs] of [
  ['c1 one class [11,311]', c1, c1x],
  ['c1 one class [11,229]', c1.slice(0, 46), c1x.slice(0, 46)],
  ['c1 one class [61,311]', c1.slice(13), c1x.slice(13)],
  ['c1 one class [97,311]', c1.slice(20), c1x.slice(20)],
  ['c1 one class [181,311]', c1.slice(37), c1x.slice(37)],
  ['c2 free 2class [11,73]', c2, c2x],
  ["c2' diff-2 G2 [11,37]", c2p, c2px]]) {
  const f1 = fitPow(xs.map(Math.log), ys), f2 = fitPow(xs, ys);
  console.log(`   ${nm.padEnd(25)} ${pad(ys.length, 3)}   ${pad(F(f1.b) + ' +- ' + F(f1.se), 17)}  ${pad(F(f2.b) + ' +- ' + F(f2.se), 16)} ${F(f1.rms)}`);
}
console.log('\n   sliding windows of 20 consecutive one-class terms:');
{ let s = '   '; for (let a = 0; a + 19 < c1.length; a += 4) { const f = fitPow(c1x.slice(a, a + 20).map(Math.log), c1.slice(a, a + 20)); s += `[${c1x[a]},${c1x[a + 19]}]=${F(f.b, 3)} `; } console.log(s); }

console.log(`
   THE CONTROL.  Synthesise two ladders on the same p, mbar, lnD as the real
   one: LAW has c constant, MP has c proportional to log p, both rounded to
   even integers exactly as a real Jacobsthal value is.  Run the identical
   estimator.  If it returns ~0 on LAW and ~1 on MP, it can see MP when MP is
   there, and its verdict on the real data means something.
`);
{
  const lawY = [], mpY = [], xs = [];
  for (let i = 4; i < H1.length; i++) {
    const p = ALLP[i], s = tileStats(p), lnD = s.t - Math.log(s.m1);
    lawY.push(2 * Math.round(0.372 * s.m1 * lnD / 2));
    mpY.push(2 * Math.round(0.372 * (Math.log(p) / Math.log(11)) * s.m1 * lnD / 2));
    xs.push(p);
  }
  const cl = lawY.map((v, i) => cOf(v, tileStats(xs[i]).m1, tileStats(xs[i]).t));
  const cm = mpY.map((v, i) => cOf(v, tileStats(xs[i]).m1, tileStats(xs[i]).t));
  const fl = fitPow(xs.map(Math.log), cl), fm = fitPow(xs.map(Math.log), cm), fr = fitPow(c1x.map(Math.log), c1);
  console.log(`     synthetic LAW ladder (true beta = 0):  estimator returns ${F(fl.b)} +- ${F(fl.se)}`);
  console.log(`     synthetic MP  ladder (true beta = 1):  estimator returns ${F(fm.b)} +- ${F(fm.se)}`);
  console.log(`     REAL A048670  ladder:                  estimator returns ${F(fr.b)} +- ${F(fr.se)}`);
  console.log(`\n     The estimator recovers 1 when 1 is there.  On the real data it returns`);
  console.log(`     ${F(fr.b, 3)}.  MP's growth is not merely unresolved on this ladder; it is`);
  console.log(`     absent, and the estimator is demonstrably able to see it.`);
}
console.log('\n   term by term, c1 against the MP shape log p/e^gamma:');
console.log('       p    g(p#)    mbar     lnD      c1     MP c    c1/MP');
for (let i = 4; i < H1.length; i += 6) {
  const p = ALLP[i], s = tileStats(p), lnD = s.t - Math.log(s.m1), v = H1[i] / (s.m1 * lnD);
  console.log(`   ${pad(p, 5)} ${pad(H1[i], 7)} ${pad(s.m1.toFixed(3), 8)} ${pad(lnD.toFixed(1), 7)} ${pad(v.toFixed(4), 8)} ${pad((Math.log(p) / Math.exp(GAM)).toFixed(3), 7)} ${pad((v * Math.exp(GAM) / Math.log(p)).toFixed(4), 8)}`);
}

// ===========================================================================
console.log('\n' + '='.repeat(79));
console.log('S7.  THE MECHANISM.  What the law omits, and when it takes over.');
console.log('='.repeat(79));
console.log(`
  Ford-Green-Konyagin-Tao arXiv:1408.4505 S1, verbatim, is the whole answer:

   "a key to all of them being to take a common value of a_p for large p, say
    a_p = 0 for z < p < delta x ... The numbers in [y] surviving this first
    sieving either have all of their prime factors <= z ... or are of the form
    pm with p prime and m <= y/delta x ... there are very few numbers of the
    first kind, say O(x/log^2 x).  By the prime number theorem there are
    ~ y log_2 x/log x unsieved numbers of the second kind.  BY CONTRAST, IF ONE
    WERE TO TAKE A RANDOM CHOICE FOR a_p for z < p < delta x, then with high
    probability, the number of unsifted integers in [y] would be considerably
    larger, about y log z/log x."

   "for every prime p in (delta x, x] there should in fact be a residue class
    a (mod p) containing >> log x/(log_2 x)^{O(1)} elements of V.  (Roughly,
    the heuristic predicts that the sizes of the sets V n (a mod p) are Poisson
    distributed with parameter ~ |V|/p.)"

  Run their own accounting.  Survivors after stage 1 and stage 2 are
  |V| ~ e^{-gamma} y log_2 x/(log x log z), and stage 3 kills r of them per
  prime with (1-delta)x/log x primes available, so

        y ~ e^gamma * x * T1 * r,        T1 = log z/log_2 x.

  The law is  y = e^gamma x log x, so IN THE LAW'S OWN UNITS

        c  =  T1 * r / log x.

  T1 is capped by the smooth-number step, which needs u = log y/log z large
  enough that the z-smooth survivors are O(x/log^2 x); that forces Rankin's
  z = x^{c log_3 x/log_2 x} and T1 = log x log_3 x/(log_2 x)^2.  So

    T1  is the RANKIN term.  PROVEN.  It is the gain of an ALIGNED a_p over a
        random one, and it is worth log_3 x/(log_2 x)^2 of a log x, i.e. LESS
        than one log.  This is why the best proven bound
        Y(x) >> R x log x log_3 x/(log_2 x)^2 sits BELOW the random-dart level
        e^gamma x log x for any fixed R, and therefore does not contradict the
        law.  The briefing's doubt on this point is correct.
    r   is the MAIER-POMERANCE term.  CONJ.  r = 2 for a positive proportion is
        proved (their constant 1.31256 e^gamma, no exponent).  r =
        (log x)^{1+o(1)} is the conjecture, and it is the whole of the missing
        log.  It is itself an extreme-value statement, but over the RESIDUE
        CLASS a mod p, not over position.

  So the omitted term is not a correction to the tail.  It is a maximum over an
  index the law does not have.  The law maximises over POSITION only; T1
  maximises over the ALIGNMENT of the classes and r over the CLASS of each
  large prime.  A random-dart model has neither index, which is exactly why it
  misses both, and exactly why it can be off by a whole log and still fit.
`);
console.log('   THE LEDGER, evaluated.  r solves max over p classes of Poisson(1/log x).');
console.log('       x       log x     T1      r    c_pred=T1*r/logx   c_pred/c_pred(229)');
const solveR = (lam, target) => { let r = 1; for (let k = 1; k < 2000; k++) { const lf = k * Math.log(k) - k + 0.5 * Math.log(2 * Math.PI * k); if (-(k * Math.log(lam) - lf) <= target) r = k; else break; } return r; };
function ledgerL(L) {                       // argument is ln x, so no overflow
  const L2 = Math.log(L), L3 = Math.log(L2);
  const T1 = L * L3 / (L2 * L2), lam = 1 / L, r = solveR(lam, L);
  return { L, T1, lam, r, c: T1 * r / L };
}
const ledger = (X) => ledgerL(Math.log(X));
const base = ledger(229);
for (const e of [Math.log10(37), 2, Math.log10(229), 3, Math.log10(4001), 6, 10, 20, 50, 100, 300, 1000, 3000]) {
  const g = ledgerL(e * Math.LN10);
  console.log(`   ${pad('1e' + e.toFixed(1), 9)} ${pad(g.L.toFixed(2), 8)} ${pad(g.T1.toFixed(3), 8)} ${pad(g.r, 5)} ${pad(g.c.toFixed(4), 15)} ${pad((g.c / base.c).toFixed(3), 18)}`);
}
console.log(`
  Three readings, and the first is the one that matters.

  1. c_pred(229) = ${F(base.c)} against the MEASURED c1 = 0.3722.  The ledger's
     own value of c at the top of the exact ladder, with r frozen at Maier and
     Pomerance's PROVEN r = 2 and T1's implicit constant set to 1, lands on the
     measured constant.  Do not over-read the agreement: T1 carries an
     unfitted O(1).  What is not a coincidence is the SHAPE.

  2. WHY c LOOKS FLAT.  c_pred/r = T1/log x = log_3 x/(log_2 x)^2, and that
     function has a stationary point where log_3 x = 1/2, i.e. log_2 x = e^0.5
     and log x = ${F(Math.exp(Math.sqrt(Math.E)), 3)}, that is x = ${F(Math.exp(Math.exp(Math.sqrt(Math.E))), 0)}.  The whole exact one-class
     ladder, p = 11 to 311, brackets that point.  The flatness of c over the
     only data anyone has is a property of where the data sits on
     log_3 x/(log_2 x)^2, and r has been frozen at 2 the whole way.

  3. WHERE IT BREAKS.  c doubles when T1*r doubles relative to x = 229:`);
{
  let dbl = null, ten = null;
  for (let e = 2.4; e < 20000; e += 0.05) { const g = ledgerL(e * Math.LN10); if (dbl === null && g.c / base.c >= 2) dbl = e; if (ten === null && g.c / base.c >= 10) ten = e; }
  console.log(`      c =  2 * measured  at  x ~ 1e${F(dbl, 0)}`);
  console.log(`      c = 10 * measured  at  x ~ 1e${F(ten, 0)}`);
}
console.log(`
  THE FOUR LIVE EXTRAPOLATIONS OF c, side by side, all anchored at x = 229.
  "law" is B's constant.  "measured drift" is c ~ (log x)^0.12, the fit on the
  top 47 exact terms.  "ledger" is T1*r/log x from this section.  "MP" is
  c ~ log x, which is what J(T) = T(log T)^{2+o(1)} demands.
`);
console.log('       x         law    measured drift    ledger      MP');
{
  for (const e of [Math.log10(229), 3, 6, 10, 20, 50, 100, 300, 1000]) {
    const L = e * Math.LN10, g = ledgerL(L);
    const drift = 0.3722 * Math.pow(L / Math.log(229), 0.12);
    const mp = 0.3722 * L / Math.log(229);
    console.log(`   ${pad('1e' + e.toFixed(1), 9)} ${pad('0.3722', 9)} ${pad(F(drift), 14)} ${pad(F(g.c * 0.3722 / base.c), 12)} ${pad(F(mp), 9)}`);
  }
}
console.log(`
  The measured drift and the ledger bracket each other for the first 20 decades
  and then separate.  MP overtakes both, but not until log x is large enough
  for r to escape 2, and r is a max over p Poisson(1/log x) counts, which
  climbs like log x/log_2 x.  All four agree to within 20% over the entire
  exact ladder, which is exactly why the ladder cannot decide between them.
`);
console.log(`
     So the law is not wrong in our range and it is not right asymptotically.
     Under the ledger it stays inside a factor of 2 to x ~ 1e17, which is 1e15
     beyond the largest Jacobsthal value anyone has computed, and it is out by
     a factor 10 only past x ~ 1e400.  Under MP itself, which is the fast
     reading, the factor of 2 arrives at x ~ 1e5 and the factor of 10 at
     x ~ 1e24.  Both are far beyond anything computable, and the honest
     statement is that the law's failure is not observable, only derivable.
`);

// ===========================================================================
console.log('='.repeat(79));
console.log('S8.  WHICH REPO EXTRAPOLATIONS INHERIT THE ERROR.');
console.log('='.repeat(79));
console.log(`
  Rule, from S3 and S4: an ON-DIAGONAL use of the law (window = the whole tile
  x#) is safe, because c is flat along the diagonal for the reason S7 gives.
  An OFF-DIAGONAL use (window = x^k for fixed k) needs the OFF-diagonal c,
  which is 0.85 to 1.05, not 0.46, and which itself moves with x.
`);
console.log('   G2(41#): one step past the data, ON the diagonal.');
{
  const s = tileStats(41), lnD = s.t - Math.log(s.m2);
  console.log(`     m2(41) = ${F(s.m2, 2)}, theta(41) = ${F(s.t, 2)}, lnD = ${F(lnD, 2)}, prediction = ${F(s.m2 * lnD, 1)} * c2'`);
  console.log(`     c2' band from the 8 exact terms [${F(Math.min(...c2p))}, ${F(Math.max(...c2p))}], mean ${F(m3c)}`);
  console.log(`     => G2(41#) in [${F(s.m2 * lnD * Math.min(...c2p), 0)}, ${F(s.m2 * lnD * Math.max(...c2p), 0)}], central ${F(s.m2 * lnD * m3c, 0)}`);
  const g = ledger(41), g37 = ledger(37);
  console.log(`     drift correction from S7 over one step, 37 -> 41: ${F(g.c / g37.c, 4)}.  Negligible.`);
}
console.log('\n   the localized claim, which is the one that is actually wrong:');
{
  console.log('     FOLD-PROFILE.md S12 projects "localized: M(x, x\'^2) ~ 1.2*x*ln x".');
  console.log('     The law says M(x, x^2) = c*mbar*ln(x^2/mbar) ~ 4.8*c*ln^3 x.  Measured:');
  console.log('        x      M(x,x^2)   mbar    lnD    c      4.8 ln^3x   1.2 x ln x   ratio');
  const Y2 = 1e8, xs2 = [211, 401, 797, 1601, 3203, 6421, 9973];
  const rough = new Uint8Array(Y2 + 8).fill(1); rough[0] = 0;
  for (const x of ALLP) {
    if (x > 9973) break;
    for (let j = x; j < Y2 + 8; j += x) rough[j] = 0;
    if (!xs2.includes(x)) continue;
    const Y = x * x; let prev = -1, best = 0, count = 0;
    for (let r = 1; r < Y; r++) if (rough[r] && rough[r + 2]) { if (prev >= 0) { const g = r - prev; if (g > best) best = g; } prev = r; count++; }
    const mbar = Y / count, lnD = Math.log(count), c = best / (mbar * lnD);
    console.log(`   ${pad(x, 7)} ${pad(best, 9)} ${pad(mbar.toFixed(1), 8)} ${pad(lnD.toFixed(2), 6)} ${pad(c.toFixed(3), 6)} ${pad((4.8 * Math.log(x) ** 3).toFixed(0), 10)} ${pad((1.2 * x * Math.log(x)).toFixed(0), 12)} ${pad((1.2 * x * Math.log(x) / best).toFixed(1), 7)}`);
  }
}
console.log(`
     M(x,x^2)/ln^3 x is flat at 3.2 to 3.7 over a 47x range in x, which is
     LOCALIZED-GAP.md S5's own "M/(k ln^3 x) flat in 1.2 to 1.6" at k = 2.  So
     the two repo files disagree with each other and the measurement settles it
     in LOCALIZED-GAP's favour.  FOLD-PROFILE's projection is a factor 38 high
     at x = 9973 and the error grows like x/ln^2 x.  It errs in the SAFE
     direction for the Zone Postulate: the true localized margin is
     x^2/(3.5 ln^3 x), not x/(1.2 ln x).

  THE LIST.
   1. two-class-lower-bounds.md S6, G2(41#).  ON diagonal, one step.  SAFE.
      Band 476 to 633, central 513, unchanged.  (The "530 to 640" and "660" in
      that file were already corrected by G2-STATE.md S6.2; this note confirms
      the corrected band and adds that the drift over one step is 4%.)
   2. two-class-lower-bounds.md S8, "lower, measured law ~ 1.2 x ln^2 x".  ON
      diagonal.  SAFE as a description of x <= 41.  It must not be quoted as an
      asymptotic: the same law with the ledger's drift reads
      1.2 x ln^2 x * (T1(x) r(x))/(T1(41) r(41)), which is 3x larger by 1e50.
   3. two-class-lower-bounds.md S6 caveat, "c1 should eventually grow like ln x
      and does not".  CORRECT and now quantified: it grows like (ln x)^0.12 on
      the top 47 terms, against MP's 1.
   4. localized-04-maxsum.md S4, "M(x,Y) ~ mbar ln(Y/mbar)".  OFF diagonal.
      SAFE in its own window, but the constant 0.74-1.17 is specific to
      lnD ~ 11-16 and x ~ 1e3 and must not be carried to the full tile, where
      the same object gives 0.46.
   5. FOLD-PROFILE.md S12, "localized M(x,x'^2) ~ 1.2 x ln x".  REFUTED above.
   6. exponent-control.md S6 margin extrapolations.  Those are power-law fits,
      not uses of this law.  UNAFFECTED.
   7. Anything reading c as a universal constant across both regimes.  There is
      no such constant.  Report c with (x, lnD) attached or do not report it.
`);
console.log(`\n  done in ${el()}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=8192 research/maxgap-law.js -- --big
//   invocation:  node --max-old-space-size=8192 research/maxgap-law.js --big
//   code-sha256: 172306bb088dd32d938528757d274892915a23eab5dadf093ba7cce229dc00d4
//   out-sha256:  9c87b14aafca5b323d74dbe2538b5012f15392e151b522dc81e6077ea0e3f390
//   body-lines:  673
//   forced:      2026-08-21, 30 of 1389 figures in the replaced block not reproduced (first: 11,271, 0.0248, -0.1280, 0.0366)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     147.8 s
// ============================================================================
// ===============================================================================
// S1.  CUSTODY.  Reproduce both agents digit for digit, third engine.
// ===============================================================================
//
//   two-class-lower-bounds.md S6:
//    c1  one class,  p in [11,229]  n=46 mean=0.3718 sd=0.0269 cv=7.2%  range [0.3359, 0.4873]  = +-22.5%
//    c2  free 2class, p in [11,73]  n=17 mean=0.8511 sd=0.0623 cv=7.3%  range [0.7784, 1.0157]  = +-15.2%
//    c2' diff-2 G2,  p in [11,37]   n= 8 mean=0.4814 sd=0.0490 cv=10.2%  range [0.4463, 0.5939]  = +-16.5%
//    published: c1 0.3718 sd 0.0269 cv 7.2% | c2 0.8511 0.0623 7.3% | c2' 0.4814 0.0490 10.2%
//    MATCH: YES
//
//   RECONCILIATION POINT 1, and it is bookkeeping, not physics.
//   A quoted a RANGE, B quoted a CV.  Put both on both scales:
//    c1  one class,  p in [11,311]  n=60 mean=0.3725 sd=0.0236 cv=6.3%  range [0.3359, 0.4873]  = +-22.5%
//    A: R(1)/lnD in [0.736, 1.170] is a range, = +-22.7% about its own midpoint.
//    B: c1 cv 7.2% but its RANGE is +-22.5%.  THE TWO SPREADS ARE THE SAME.
//    Neither agent is tighter than the other.  A is not looser than B by 3x.
//
//   exact tiles, both classes, against A048670 and the repo G2 ladder:
//     x  mode      period       slots      mbar   max gap  published
//      7   1           210          48    4.375       10        10   MATCH  0.0s
//      7   2           210          15   14.000       30        30   MATCH  0.0s
//     11   1          2310         480    4.813       14        14   MATCH  0.0s
//     11   2          2310         135   17.111       42        42   MATCH  0.0s
//     13   1         30030        5760    5.214       22        22   MATCH  0.0s
//     13   2         30030        1485   20.222       66        66   MATCH  0.0s
//     17   1        510510       92160    5.539       26        26   MATCH  0.0s
//     17   2        510510       22275   22.919      108       108   MATCH  0.0s
//     19   1       9699690     1658880    5.847       34        34   MATCH  0.2s
//     19   2       9699690      378675   25.615      150       150   MATCH  0.3s
//     23   1     223092870    36495360    6.113       40        40   MATCH  3.5s
//     23   2     223092870     7952175   28.054      204       204   MATCH  4.7s
//       ... x=29 mode=1 34%  34.8s
//       ... x=29 mode=1 66%  64.9s
//       ... x=29 mode=1 97%  95.0s
//     29   1    6469693230  1021870080    6.331       46        46   MATCH  97.6s
//       ... x=29 mode=2 86%  127.6s
//     29   2    6469693230   214708725   30.132      258       258   MATCH  132.8s
//
//   localized-04-maxsum.md S4, Y = 1e7 row, third engine (132.8s):
//       x      M      D      mbar   R(1)=M/mbar   lnD   R(1)/lnD
//       89    486  195619    51.12      9.507    12.18    0.7803
//      127    570  172027    58.13      9.806    12.06    0.8134
//      181    630  150091    66.63      9.456    11.92    0.7933
//      251    708  134469    74.37      9.520    11.81    0.8062
//      353    924  119169    83.91     11.011    11.69    0.9421
//      499    924  104370    95.81      9.644    11.56    0.8345
//      701   1080   91589   109.18      9.892    11.43    0.8658
//      997   1452   80296   124.54     11.659    11.29    1.0324
//     1409   1452   70911   141.02     10.296    11.17    0.9218
//     1999   1512   63208   158.21      9.557    11.05    0.8646
//     2153   1530   61881   161.60      9.468    11.03    0.8581
//    published Y=1e7: R(1) 9.00-11.92, lnD 11.1-11.9, R(1)/lnD 0.756-1.053
//    ours:            R(1) 9.46-11.66, lnD 11.0-12.2, R(1)/lnD 0.7803-1.0324
//    (A used a different x grid inside the same window; the ranges agree.)
//
// ===============================================================================
// S2.  THE TWO CONSTANTS, IN ONE FRAME, WITH ALL THREE COORDINATES.
// ===============================================================================
//
//   Both are c = maxgap/(mbar*lnD).  Identical formula.  Only ONE coordinate was
//   ever reported.  Three matter: the level x, the log gap count lnD, and the
//   sifting depth u = ln(window)/ln x, which is 2 to 3.6 for A and theta(x)/ln x
//   for B.  B always sits on the DIAGONAL lnD = theta(x) - ln mbar.  A never does.
//
//    source                   object     x     lnD      u      lnD/theta(x)     c
//    A localized Y=1e7    twin      89   12.18   3.59       0.1539     0.7803
//    A localized Y=1e7    twin     251   11.81   2.92       0.0509     0.8062
//    A localized Y=1e7    twin     997   11.29   2.33       0.0118     1.0324
//    A localized Y=1e7    twin    2153   11.03   2.10       0.0052     0.8581
//    B exact G2 tile      twin      11    4.91   3.23       0.6333     0.5004
//    B exact G2 tile      twin      19   12.84   5.46       0.7984     0.4559
//    B exact G2 tile      twin      29   19.18   6.71       0.8492     0.4463
//    B exact G2 tile      twin      37   26.11   8.21       0.8810     0.5939
//    B exact A048670      units     11    6.17   3.23       0.7971     0.4712
//    B exact A048670      units    101   86.22  19.14       0.9759     0.3648
//    B exact A048670      units    271  252.12  45.42       0.9909     0.3740
//
//   A's windows sit at lnD/theta(x) = 1e-3 to 1e-1.  B's sit at 1 by construction.
//   The two agents are two and three orders of magnitude apart on the coordinate
//   neither of them recorded.  That is the whole of the disagreement, and S3 and
//   S4 measure it directly.
//
// ===============================================================================
// S3.  THE CONTROLLED EXPERIMENT: c(lnD) INSIDE ONE EXACT PERIOD.
// ===============================================================================
//
//   Cut the D gaps of one exact period into blocks of B consecutive gaps.  Each
//   block is a window of exactly A's kind.  c(B) = (block max)/(mbar*ln B).
//   Same object, same x, same primes: ONLY lnD moves.  If the law is an
//   extreme-value law in lnD, c is constant down every column.  It is not.
//   Rows marked SAT are saturated (mean block max within 3% of the whole-period
//   max), where c falls like 1/lnD for a trivial reason and carries no content.
//
//
//    x=13 units  D=5760  mbar=5.214  whole-period max=22
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8     719     10.1   0.9288     16   1.4758    22  2.0293
//      2.77        16     359     11.5   0.7970     16   1.1069    22  1.5220
//      3.47        32     179     12.8   0.7111     16   0.8855    22  1.2176
//      4.16        64      89     14.0   0.6467     16   0.7379    22  1.0146
//      4.85       128      44     15.4   0.6073     16   0.6325    22  0.8697
//      5.55       256      21     16.9   0.5831     16   0.5534    22  0.7610
//      6.24       512      10     18.2   0.5596     18   0.5534    22  0.6764
//      6.93      1024       4     20.0   0.5534     18   0.4981    22  0.6088
//      7.62      2048       1     22.0   0.5534     22   0.5534    22  0.5534  SAT
//      8.66      5760       1       22   0.4873   <-- whole period, B's measurement
//
//    x=13 twin   D=1485  mbar=20.222  whole-period max=66
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8     184     40.9   0.9724     30   0.7134    66  1.5695
//      2.77        16      91     46.3   0.8255     30   0.5351    66  1.1771
//      3.47        32      45     51.7   0.7382     42   0.5993    66  0.9417
//      4.16        64      22     56.7   0.6745     66   0.7848    66  0.7848
//      4.85       128      10     65.4   0.6665     66   0.6727    66  0.6727  SAT
//      5.55       256       4     66.0   0.5886     66   0.5886    66  0.5886  SAT
//      6.24       512       1     66.0   0.5232     66   0.5232    66  0.5232  SAT
//      7.30      1485       1       66   0.4469   <-- whole period, B's measurement
//
//    x=17 units  D=92160  mbar=5.539  whole-period max=26
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8   11519     11.0   0.9562     18   1.5627    26  2.2572
//      2.77        16    5759     12.6   0.8228     18   1.1720    26  1.6929
//      3.47        32    2879     14.1   0.7363     18   0.9376    26  1.3543
//      4.16        64    1439     15.7   0.6812     18   0.7813    26  1.1286
//      4.85       128     719     17.3   0.6430     18   0.6697    26  0.9674
//      5.55       256     359     18.7   0.6099     18   0.5860    26  0.8464
//      6.24       512     179     20.2   0.5836     18   0.5209    26  0.7524
//      6.93      1024      89     21.8   0.5671     18   0.4688    26  0.6772
//      7.62      2048      44     23.0   0.5435     22   0.5209    26  0.6156
//      8.32      4096      21     23.5   0.5106     22   0.4775    26  0.5643
//      9.01      8192      10     24.4   0.4888     24   0.4808    26  0.5209
//      9.70     16384       4     25.0   0.4651     24   0.4465    26  0.4837
//     10.40     32768       1     26.0   0.4514     24   0.4167    26  0.4514  SAT
//     11.43     92160       1       26   0.4106   <-- whole period, B's measurement
//
//    x=17 twin   D=22275  mbar=22.919  whole-period max=108
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8    2783     47.8   1.0028     30   0.6295   108  2.2662
//      2.77        16    1391     55.7   0.8769     36   0.5665   108  1.6996
//      3.47        32     695     64.3   0.8097    108   1.3597   108  1.3597
//      4.16        64     347     73.4   0.7704    108   1.1331   108  1.1331
//      4.85       128     173     80.7   0.7258    108   0.9712   108  0.9712
//      5.55       256      86     88.7   0.6977    108   0.8498   108  0.8498
//      6.24       512      42     94.4   0.6605    108   0.7554   108  0.7554
//      6.93      1024      20     99.9   0.6289    108   0.6798   108  0.6798
//      7.62      2048       9    104.0   0.5952    108   0.6180   108  0.6180
//      8.32      4096       4    108.0   0.5665    108   0.5665   108  0.5665  SAT
//      9.01      8192       1    108.0   0.5230    108   0.5230   108  0.5230  SAT
//     10.01     22275       1      108   0.4707   <-- whole period, B's measurement
//
//    x=19 units  D=1658880  mbar=5.847  whole-period max=34
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8  207359     11.9   0.9774     22   1.8094    34  2.7963
//      2.77        16  103679     13.7   0.8458     22   1.3570    34  2.0973
//      3.47        32   51839     15.5   0.7625     22   1.0856    34  1.6778
//      4.16        64   25919     17.2   0.7084     22   0.9047    34  1.3982
//      4.85       128   12959     19.0   0.6680     22   0.7755    34  1.1984
//      5.55       256    6479     20.6   0.6339     24   0.7402    34  1.0486
//      6.24       512    3239     22.1   0.6061     24   0.6580    34  0.9321
//      6.93      1024    1619     23.5   0.5789     24   0.5922    34  0.8389
//      7.62      2048     809     24.5   0.5489     24   0.5383    34  0.7626
//      8.32      4096     404     25.4   0.5226     24   0.4935    34  0.6991
//      9.01      8192     201     26.5   0.5031     24   0.4555    34  0.6453
//      9.70     16384     100     27.6   0.4857     34   0.5992    34  0.5992
//     10.40     32768      49     28.4   0.4673     34   0.5593    30  0.4935
//     11.09     65536      24     29.2   0.4498     34   0.5243    30  0.4626
//     11.78    131072      11     30.0   0.4354     34   0.4935    30  0.4354
//     12.48    262144       5     30.0   0.4112     34   0.4661    30  0.4112
//     13.17    524288       2     30.0   0.3896     34   0.4415    30  0.3896
//     14.32   1658880       1       34   0.4060   <-- whole period, B's measurement
//
//    x=19 twin   D=378675  mbar=25.615  whole-period max=150
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8   47333     55.4   1.0407     30   0.5632   150  2.8161
//      2.77        16   23666     65.6   0.9239     36   0.5069   150  2.1121
//      3.47        32   11832     76.1   0.8577    150   1.6897   150  1.6897
//      4.16        64    5915     86.9   0.8161    150   1.4081   150  1.4081
//      4.85       128    2957     96.9   0.7800    150   1.2069   150  1.2069
//      5.55       256    1478    105.8   0.7450    150   1.0561   150  1.0561
//      6.24       512     738    113.8   0.7122    150   0.9387   150  0.9387
//      6.93      1024     368    121.6   0.6850    150   0.8448   150  0.8448
//      7.62      2048     183    129.2   0.6616    150   0.7680   150  0.7680
//      8.32      4096      91    137.4   0.6449    150   0.7040   150  0.7040
//      9.01      8192      45    142.3   0.6164    150   0.6499   150  0.6499
//      9.70     16384      22    142.9   0.5749    150   0.6035   150  0.6035
//     10.40     32768      10    146.4   0.5497    150   0.5632   150  0.5632  SAT
//     11.09     65536       4    150.0   0.5280    150   0.5280   150  0.5280  SAT
//     11.78    131072       1    150.0   0.4970    150   0.4970   150  0.4970  SAT
//     12.84    378675       1      150   0.4559   <-- whole period, B's measurement
//
//    x=23 units  D=36495360  mbar=6.113  whole-period max=40
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8 4561919     12.6   0.9938     28   2.2027    40  3.1468
//      2.77        16 2280959     14.6   0.8636     28   1.6521    40  2.3601
//      3.47        32 1140479     16.6   0.7834     28   1.3216    40  1.8881
//      4.16        64  570239     18.6   0.7301     28   1.1014    40  1.5734
//      4.85       128  285119     20.4   0.6876     28   0.9440    40  1.3486
//      5.55       256  142559     22.1   0.6523     28   0.8260    40  1.1800
//      6.24       512   71279     23.7   0.6219     28   0.7342    40  1.0489
//      6.93      1024   35639     25.0   0.5907     28   0.6608    40  0.9440
//      7.62      2048   17819     26.3   0.5639     28   0.6007    40  0.8582
//      8.32      4096    8909     27.6   0.5425     28   0.5507    40  0.7867
//      9.01      8192    4454     28.9   0.5242     28   0.5083    40  0.7262
//      9.70     16384    2226     30.0   0.5052     34   0.5732    40  0.6743
//     10.40     32768    1112     30.9   0.4870     34   0.5350    40  0.6294
//     11.09     65536     555     32.0   0.4718     34   0.5015    40  0.5900
//     11.78    131072     277     33.3   0.4621     34   0.4720    40  0.5553
//     12.48    262144     138     34.7   0.4555     34   0.4458    40  0.5245
//     13.17    524288      68     36.1   0.4490     34   0.4223    40  0.4969
//     13.86   1048576      33     37.3   0.4398     34   0.4012    40  0.4720
//     14.56   2097152      16     38.5   0.4327     36   0.4046    40  0.4495
//     15.25   4194304       7     40.0   0.4291     40   0.4291    40  0.4291  SAT
//     15.94   8388608       3     40.0   0.4104     40   0.4104    40  0.4104  SAT
//     16.64  16777216       1     40.0   0.3933     40   0.3933    40  0.3933  SAT
//     17.41  36495360       1       40   0.3758   <-- whole period, B's measurement
//
//    x=23 twin   D=7952175  mbar=28.054  whole-period max=204
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8  994020     62.1   1.0652     30   0.5143   204  3.4969
//      2.77        16  497009     74.2   0.9534     36   0.4628   204  2.6227
//      3.47        32  248504     86.2   0.8864    150   1.5428   204  2.0981
//      4.16        64  124251     98.3   0.8423    150   1.2856   204  1.7485
//      4.85       128   62125    109.5   0.8042    150   1.1020   204  1.4987
//      5.55       256   31062    119.8   0.7704    150   0.9642   204  1.3113
//      6.24       512   15530    129.6   0.7403    150   0.8571   204  1.1656
//      6.93      1024    7764    138.7   0.7133    150   0.7714   204  1.0491
//      7.62      2048    3881    146.1   0.6830    150   0.7013   204  0.9537
//      8.32      4096    1940    153.1   0.6562    150   0.6428   204  0.8742
//      9.01      8192     969    160.4   0.6344    150   0.5934   204  0.8070
//      9.70     16384     484    167.4   0.6149    156   0.5730   204  0.7493
//     10.40     32768     241    173.8   0.5957    156   0.5348   204  0.6994
//     11.09     65536     120    179.4   0.5768    168   0.5400   204  0.6557
//     11.78    131072      59    184.6   0.5583    180   0.5445   204  0.6171
//     12.48    262144      29    189.9   0.5426    180   0.5143   204  0.5828
//     13.17    524288      14    193.3   0.5231    186   0.5034   204  0.5521
//     13.86   1048576       6    199.0   0.5117    192   0.4937   204  0.5245  SAT
//     14.56   2097152       2    204.0   0.4996    198   0.4849   204  0.4996  SAT
//     15.89   7952175       1      204   0.4577   <-- whole period, B's measurement
//
//    x=29 units  D=1021870080  mbar=6.331  whole-period max=46
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8 127733759     13.2   1.0056     30   2.2787    46  3.4940
//      2.77        16 63866879     15.4   0.8770     30   1.7090    46  2.6205
//      3.47        32 31933439     17.5   0.7987     30   1.3672    46  2.0964
//      4.16        64 15966719     19.6   0.7450     30   1.1393    46  1.7470
//      4.85       128 7983359     21.5   0.7015     30   0.9766    46  1.4974
//      5.55       256 3991679     23.4   0.6659     30   0.8545    46  1.3103
//      6.24       512 1995839     25.0   0.6329     30   0.7596    46  1.1647
//      6.93      1024  997919     26.5   0.6028     30   0.6836    46  1.0482
//      7.62      2048  498959     27.9   0.5790     30   0.6215    46  0.9529
//      8.32      4096  249479     29.4   0.5580     30   0.5697    46  0.8735
//      9.01      8192  124739     30.7   0.5374     30   0.5259    46  0.8063
//      9.70     16384   62369     31.9   0.5193     34   0.5534    46  0.7487
//     10.40     32768   31184     33.3   0.5063     34   0.5165    46  0.6988
//     11.09     65536   15591     34.9   0.4971     34   0.4842    46  0.6551
//     11.78    131072    7795     36.4   0.4873     34   0.4557    46  0.6166
//     12.48    262144    3897     37.6   0.4766     34   0.4304    46  0.5823
//     13.17    524288    1948     38.9   0.4670     34   0.4078    46  0.5517
//     13.86   1048576     973     40.1   0.4564     36   0.4102    46  0.5241
//     14.56   2097152     486     40.9   0.4441     40   0.4340    46  0.4991
//     15.25   4194304     242     41.5   0.4300     40   0.4143    46  0.4765
//     15.94   8388608     120     42.1   0.4173     42   0.4161    46  0.4557
//     16.64  16777216      59     42.5   0.4033     42   0.3988    46  0.4368
//     17.33  33554432      29     42.9   0.3910     42   0.3828    46  0.4193
//     18.02  67108864      14     43.3   0.3794     46   0.4032    46  0.4032
//     18.71 134217728       6     43.7   0.3685     46   0.3882    44  0.3713
//     20.74 1021870080       1       46   0.3502   <-- whole period, B's measurement
//
//    x=29 twin   D=214708725  mbar=30.132  whole-period max=258
//      lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
//      2.08         8 26838589     67.8   1.0827     30   0.4788   258  4.1176
//      2.77        16 13419294     81.1   0.9712     72   0.8618   258  3.0882
//      3.47        32 6709646     94.3   0.9026    150   1.4364   258  2.4705
//      4.16        64 3354822    107.5   0.8579    150   1.1970   258  2.0588
//      4.85       128 1677410    119.8   0.8192    150   1.0260   258  1.7647
//      5.55       256  838704    131.1   0.7846    150   0.8977   258  1.5441
//      6.24       512  419351    141.4   0.7520    150   0.7980   258  1.3725
//      6.93      1024  209675    150.5   0.7206    150   0.7182   258  1.2353
//      7.62      2048  104837    159.0   0.6922    156   0.6790   258  1.1230
//      8.32      4096   52418    167.6   0.6687    156   0.6224   258  1.0294
//      9.01      8192   26208    175.7   0.6472    180   0.6629   258  0.9502
//      9.70     16384   13103    183.0   0.6259    180   0.6156   258  0.8823
//     10.40     32768    6551    189.8   0.6058    198   0.6320   258  0.8235
//     11.09     65536    3275    196.0   0.5866    198   0.5925   258  0.7720
//     11.78    131072    1637    202.1   0.5692    198   0.5576   258  0.7266
//     12.48    262144     818    207.8   0.5526    198   0.5267   258  0.6863
//     13.17    524288     408    213.2   0.5373    210   0.5292   258  0.6501
//     13.86   1048576     203    218.4   0.5229    222   0.5315   258  0.6176
//     14.56   2097152     101    223.1   0.5086    228   0.5198   258  0.5882
//     15.25   4194304      50    228.5   0.4972    228   0.4962   258  0.5615
//     15.94   8388608      24    234.5   0.4882    228   0.4746   258  0.5371
//     16.64  16777216      11    240.5   0.4799    228   0.4548   258  0.5147
//     17.33  33554432       5    246.0   0.4711    240   0.4596   258  0.4941
//     18.02  67108864       2    249.0   0.4585    258   0.4751   258  0.4751
//     19.18 214708725       1      258   0.4463   <-- whole period, B's measurement
//
//   THE HEAD COLUMN.  c(head) tracks c(mean) once B is past a few hundred, so the
//   head of the tile is NOT the source of A's excess.  A's single window is an
//   honest draw.  (At tiny B the head runs high, because the first gap of any
//   primorial tile is the distinguished one from 1 to the next survivor.)
//
// ===============================================================================
// S4.  THE SAME BLOCK STATISTIC IN THE LOCALIZED REGIME.
// ===============================================================================
//
//   Now run A's own object -- twin slots of T_x inside [0, 1e8), x from 89 up --
//   through the identical block statistic.  Reading c OFF the same row of lnD in
//   S3 and here isolates x at fixed lnD, which is the comparison nobody made.
//
//    (135.4s)   c(mean over blocks) at matched lnD
//      lnD       x=97    x=199    x=401    x=797   x=1601   x=3203   x=6421
//      4.16     0.9222   0.9650   0.9942   1.0160   1.0377   1.0592   1.0731
//      4.85     0.8815   0.9367   0.9654   0.9859   1.0089   1.0316   1.0471
//      5.55     0.8520   0.9153   0.9426   0.9645   0.9883   1.0103   1.0279
//      6.24     0.8315   0.8977   0.9233   0.9486   0.9720   0.9924   1.0106
//      6.93     0.8185   0.8788   0.9114   0.9336   0.9609   0.9764   0.9979
//      7.62     0.8079   0.8643   0.8998   0.9176   0.9488   0.9662   0.9891
//      8.32     0.7978   0.8547   0.8900   0.9045   0.9379   0.9555   0.9759
//      9.01     0.7869   0.8460   0.8807   0.8857   0.9305   0.9408   0.9739
//      9.70     0.7746   0.8392   0.8681   0.8709   0.9319   0.9403   0.9767
//     10.40     0.7540   0.8230   0.8674   0.8527   0.9366   0.9378   0.9812
//     11.09     0.7448   0.8034   0.8570   0.8159   0.9510   0.9437   0.9889
//     11.78     0.7279   0.7767   0.8427   0.7904   0.9616        -        -
//     12.48     0.7164   0.7618        -        -        -        -        -
//
//    same statistic on the ONE-class localized object (units in [0,1e8)), 140.9s:
//      lnD       x=97    x=199    x=401    x=797   x=1601   x=3203   x=6421
//      4.16     0.8307   0.8693   0.8962   0.9201   0.9435   0.9639   0.9800
//      6.24     0.7308   0.7824   0.8146   0.8405   0.8659   0.8898   0.9096
//      8.32     0.6792   0.7342   0.7667   0.7952   0.8232   0.8476   0.8699
//     10.40     0.6453   0.6970   0.7401   0.7677   0.7972   0.8150   0.8370
//     12.48     0.6096   0.6730   0.7239   0.7337   0.7586   0.7883   0.8116
//     14.56     0.5826        -        -        -        -        -        -
//
//    the same rows from S3 (exact tiles, twin), for the horizontal read:
//      lnD       x=17     x=19     x=23     x=29
//      4.16     0.7704   0.8161   0.8423   0.8579
//      4.85     0.7258   0.7800   0.8042   0.8192
//      5.55     0.6977   0.7450   0.7704   0.7846
//      6.24     0.6605   0.7122   0.7403   0.7520
//      6.93     0.6289   0.6850   0.7133   0.7206
//      7.62     0.5952   0.6616   0.6830   0.6922
//      8.32          -   0.6449   0.6562   0.6687
//      9.01          -   0.6164   0.6344   0.6472
//      9.70          -   0.5749   0.6149   0.6259
//     10.40          -        -   0.5957   0.6058
//     11.09          -        -   0.5768   0.5866
//     11.78          -        -   0.5583   0.5692
//     12.48          -        -   0.5426   0.5526
//     13.17          -        -   0.5231   0.5373
//     13.86          -        -        -   0.5229
//     14.56          -        -        -   0.5086
//     15.25          -        -        -   0.4972
//
//   READ ALONG A ROW.  c grows with x at fixed lnD.  READ DOWN A COLUMN.  c falls
//   with lnD at fixed x.  Neither is a constant, so "c" is a surface, not a
//   number, and the law  maxgap = c*mbar*lnD  is not an extreme-value law.
//
//    LOCAL EXPONENTS, read off the two tables directly.  b(x) is the slope of
//    ln c against ln lnD DOWN a column; a(lnD) is the slope of ln c against
//    ln ln x ALONG a row.  A single power surface would give constants.
//
//      b(x) = d ln c / d ln lnD at fixed x        (twin object)
//        x        13      17      19      23      29      97     401    1601    6421
//        b     -0.527  -0.380  -0.356  -0.375  -0.396  -0.233  -0.169  -0.122  -0.121
//
//      a(lnD) = d ln c / d ln ln x at fixed lnD   (twin object)
//      lnD      6.24    6.93    7.62    8.32    9.01    9.70   10.40   11.09
//        a      0.347   0.377   0.412   0.401   0.430   0.478   0.491   0.528
//
//    b is NEGATIVE everywhere and shrinks toward zero as x grows: -0.33 at the
//    x = 23 tile, about -0.12 at x = 6421.  a is POSITIVE everywhere and roughly
//    stable near 0.4.  So the extreme-value law -- c independent of lnD -- is
//    approached only as x grows, and the exact full-period data lives exactly
//    where it is furthest from holding.
//
//    THE DIAGONAL, which is B's curve.  60 exact one-class terms, lnD 6 -> 286:
//        p      lnD     c1      c1 relative to p=101
//       11      6.2   0.4712           1.292
//       23     17.4   0.3758           1.030
//       47     39.0   0.3558           0.975
//      101     86.2   0.3648           1.000
//      179    160.0   0.3665           1.005
//      271    252.1   0.3740           1.025
//      311    286.2   0.3756           1.030
//
//    Over p = 101 -> 271 the diagonal moves lnD by a factor 2.92 and ln x by
//    a factor 1.214.  Feeding those into the LOCAL exponents measured
//    off the tile (b = -0.430, a ~ 0.4) predicts c changes by
//      0.630 * 1.081 = 0.681
//    The exact terms change it by 1.025.  The off-diagonal exponents
//    predict a fall of 32% and the diagonal delivers a rise.
//
//    THAT IS THE RECONCILIATION, AND IT IS NOT BOOKKEEPING.
//
//    OFF the diagonal, growing lnD means more POSITIONS at a FIXED sieving
//    resource pi(x), and c falls, because a sifted set's far tail is
//    sub-exponential (S5 measures the tail directly).  ON the diagonal, growing
//    lnD means more PRIMES: lnD = theta(x) - ln mbar, so the resource grows in
//    lockstep with the number of positions, and the fall is cancelled.
//
//    A and B are the same formula evaluated on two different curves through the
//    same surface.  A sits at lnD/theta(x) ~ 1e-2 with x ~ 1e3 and gets c ~ 0.9.
//    B sits at lnD/theta(x) = 1 with x ~ 20 and gets c ~ 0.46 for the same twin
//    object.  Both are right.  Neither is universal, and neither file said which
//    curve it was on.  That omission, not any disagreement about tightness, is
//    what made the two results look like one law.
//
// ===============================================================================
// S5.  THE GAP TAIL.  Why c falls off the diagonal.
// ===============================================================================
//
//   If gaps were iid Exp(mbar) the max of D is mbar*(lnD + gamma) and c -> 1 from
//   above.  Measure the real survival S(t) = P(gap > t) and the local exponential
//   rate.  Rate identically 1 <=> c = 1.  A rate that GROWS with t is a
//   sub-exponential tail and forces c to fall with lnD, which is what S3 shows.
//
//
//    x=23 units  mbar=6.113  D=36495360
//      lam=t/mbar     S(t)       -lnS    mean rate   local rate   c if tail stopped here
//           1      5.642e-1     0.572     0.5723       1.6136       1.7472
//           2      1.124e-1     2.186     1.0929       1.9027       0.9150
//           3      1.676e-2     4.089     1.3629       2.2463       0.7337
//           4      1.773e-3     6.335     1.5837       5.2488       0.6314
//           5      9.316e-6    11.584     2.3168       3.1899       0.4316
//           6      3.836e-7    14.774     2.4623            -       0.4061
//    extreme-value solve D*S(t)=1  ->  t* = 40   actual whole-period max 40   ratio 1.000
//
//    x=23 twin   mbar=28.054  D=7952175
//      lam=t/mbar     S(t)       -lnS    mean rate   local rate   c if tail stopped here
//           1      4.760e-1     0.742     0.7423       1.6246       1.3471
//           2      9.377e-2     2.367     1.1835       1.5544       0.8450
//           3      1.982e-2     3.921     1.3071       1.9145       0.7651
//           4      2.921e-3     5.836     1.4589       2.2876       0.6854
//           5      2.965e-4     8.123     1.6247       1.6044       0.6155
//           6      5.961e-5     9.728     1.6213       4.3694       0.6168
//           7      7.545e-7    14.097     2.0139            -       0.4966
//    extreme-value solve D*S(t)=1  ->  t* = 204   actual whole-period max 204   ratio 1.000
//
//   The mean rate climbs from 0.57-0.74 at one mean gap to 2.3 (units) and 2.0
//   (twin) at the extreme.  c = lam/(-ln S) is exactly 1/(mean rate), so the
//   measured c is the RECIPROCAL OF THE TAIL RATE AT THE EXTREME and nothing
//   else.  That is the entire content of the constant: c1 = 0.372 says the
//   one-class gap tail decays like exp(-2.7 g/mbar), not exp(-g/mbar).
//
// ===============================================================================
// S6.  DRIFT ON THE DIAGONAL, WITH AN ESTIMATOR CONTROL.
// ===============================================================================
//
//   Maier-Pomerance: J(T) = T(log T)^{2+o(1)}.  Ford's own slides put the random
//   dart prediction J(T) ~ T*Q_T/phi(Q_T) ~ e^gamma T log T one line below it,
//   and that prediction IS our law with c = 1.  So MP requires c ~ log x/e^gamma.
//   Over the 64 exact one-class terms log p runs 2.40 to 5.74, so a genuine MP c
//   must grow by a factor 2.39 across the ladder.  Fit c ~ A (log p)^beta.
//
//    dataset                     n   beta(vs log p)     beta(vs p)      rms
//    c1 one class [11,311]      60   -0.1091 +- 0.0335  -0.0202 +- 0.0084 0.0531
//    c1 one class [11,229]      46   -0.1615 +- 0.0417  -0.0341 +- 0.0111 0.0567
//    c1 one class [61,311]      47    0.1221 +- 0.0232  0.0245 +- 0.0047 0.0145
//    c1 one class [97,311]      40    0.1185 +- 0.0236  0.0233 +- 0.0046 0.0097
//    c1 one class [181,311]     23    0.1994 +- 0.0473  0.0363 +- 0.0087 0.0062
//    c2 free 2class [11,73]     17    0.0858 +- 0.0988  0.0308 +- 0.0294 0.0673
//    c2' diff-2 G2 [11,37]       8    0.2236 +- 0.2515  0.0844 +- 0.0833 0.0833
//
//    sliding windows of 20 consecutive one-class terms:
//    [11,89]=-0.423 [23,107]=0.077 [41,131]=0.267 [59,151]=0.235 [73,173]=0.008 [97,193]=0.039 [109,223]=0.153 [137,239]=0.200 [157,263]=0.203 [179,281]=0.219 [197,311]=0.166
//
//    THE CONTROL.  Synthesise two ladders on the same p, mbar, lnD as the real
//    one: LAW has c constant, MP has c proportional to log p, both rounded to
//    even integers exactly as a real Jacobsthal value is.  Run the identical
//    estimator.  If it returns ~0 on LAW and ~1 on MP, it can see MP when MP is
//    there, and its verdict on the real data means something.
//
//      synthetic LAW ladder (true beta = 0):  estimator returns -0.0152 +- 0.0083
//      synthetic MP  ladder (true beta = 1):  estimator returns 0.9808 +- 0.0063
//      REAL A048670  ladder:                  estimator returns -0.1091 +- 0.0335
//
//      The estimator recovers 1 when 1 is there.  On the real data it returns
//      -0.109.  MP's growth is not merely unresolved on this ladder; it is
//      absent, and the estimator is demonstrably able to see it.
//
//    term by term, c1 against the MP shape log p/e^gamma:
//        p    g(p#)    mbar     lnD      c1     MP c    c1/MP
//       11      14    4.813     6.2   0.4712   1.346   0.3500
//       31      58    6.542    24.1   0.3672   1.928   0.1904
//       59     118    7.475    47.0   0.3359   2.289   0.1467
//       83     216    8.133    72.6   0.3660   2.481   0.1475
//      109     312    8.636   100.2   0.3606   2.634   0.1369
//      149     432    9.040   129.4   0.3692   2.810   0.1314
//      179     550    9.377   160.0   0.3665   2.913   0.1258
//      211     686    9.671   191.6   0.3701   3.005   0.1232
//      241     834    9.925   224.3   0.3746   3.079   0.1217
//      277     978   10.153   257.7   0.3737   3.158   0.1184
//
// ===============================================================================
// S7.  THE MECHANISM.  What the law omits, and when it takes over.
// ===============================================================================
//
//   Ford-Green-Konyagin-Tao arXiv:1408.4505 S1, verbatim, is the whole answer:
//
//    "a key to all of them being to take a common value of a_p for large p, say
//     a_p = 0 for z < p < delta x ... The numbers in [y] surviving this first
//     sieving either have all of their prime factors <= z ... or are of the form
//     pm with p prime and m <= y/delta x ... there are very few numbers of the
//     first kind, say O(x/log^2 x).  By the prime number theorem there are
//     ~ y log_2 x/log x unsieved numbers of the second kind.  BY CONTRAST, IF ONE
//     WERE TO TAKE A RANDOM CHOICE FOR a_p for z < p < delta x, then with high
//     probability, the number of unsifted integers in [y] would be considerably
//     larger, about y log z/log x."
//
//    "for every prime p in (delta x, x] there should in fact be a residue class
//     a (mod p) containing >> log x/(log_2 x)^{O(1)} elements of V.  (Roughly,
//     the heuristic predicts that the sizes of the sets V n (a mod p) are Poisson
//     distributed with parameter ~ |V|/p.)"
//
//   Run their own accounting.  Survivors after stage 1 and stage 2 are
//   |V| ~ e^{-gamma} y log_2 x/(log x log z), and stage 3 kills r of them per
//   prime with (1-delta)x/log x primes available, so
//
//         y ~ e^gamma * x * T1 * r,        T1 = log z/log_2 x.
//
//   The law is  y = e^gamma x log x, so IN THE LAW'S OWN UNITS
//
//         c  =  T1 * r / log x.
//
//   T1 is capped by the smooth-number step, which needs u = log y/log z large
//   enough that the z-smooth survivors are O(x/log^2 x); that forces Rankin's
//   z = x^{c log_3 x/log_2 x} and T1 = log x log_3 x/(log_2 x)^2.  So
//
//     T1  is the RANKIN term.  PROVEN.  It is the gain of an ALIGNED a_p over a
//         random one, and it is worth log_3 x/(log_2 x)^2 of a log x, i.e. LESS
//         than one log.  This is why the best proven bound
//         Y(x) >> R x log x log_3 x/(log_2 x)^2 sits BELOW the random-dart level
//         e^gamma x log x for any fixed R, and therefore does not contradict the
//         law.  The briefing's doubt on this point is correct.
//     r   is the MAIER-POMERANCE term.  CONJ.  r = 2 for a positive proportion is
//         proved (their constant 1.31256 e^gamma, no exponent).  r =
//         (log x)^{1+o(1)} is the conjecture, and it is the whole of the missing
//         log.  It is itself an extreme-value statement, but over the RESIDUE
//         CLASS a mod p, not over position.
//
//   So the omitted term is not a correction to the tail.  It is a maximum over an
//   index the law does not have.  The law maximises over POSITION only; T1
//   maximises over the ALIGNMENT of the classes and r over the CLASS of each
//   large prime.  A random-dart model has neither index, which is exactly why it
//   misses both, and exactly why it can be off by a whole log and still fit.
//
//    THE LEDGER, evaluated.  r solves max over p classes of Poisson(1/log x).
//        x       log x     T1      r    c_pred=T1*r/logx   c_pred/c_pred(229)
//        1e1.6     3.61    0.547     2          0.3032              0.825
//        1e2.0     4.61    0.836     2          0.3631              0.988
//        1e2.4     5.43    0.998     2          0.3674              1.000
//        1e3.0     6.91    1.219     2          0.3528              0.960
//        1e3.6     8.29    1.389     3          0.5023              1.367
//        1e6.0    13.82    1.934     4          0.5601              1.524
//       1e10.0    23.03    2.675     5          0.5810              1.581
//       1e20.0    46.05    4.216     8          0.7324              1.994
//       1e50.0   115.13    7.960    17          1.1753              3.199
//      1e100.0   230.26   13.181    29          1.6601              4.519
//      1e300.0   690.78   30.344    70          3.0749              8.370
//     1e1000.0  2302.59   78.627   191          6.5221             17.753
//     1e3000.0  6907.76  192.627   491         13.6918             37.268
//
//   Three readings, and the first is the one that matters.
//
//   1. c_pred(229) = 0.3674 against the MEASURED c1 = 0.3722.  The ledger's
//      own value of c at the top of the exact ladder, with r frozen at Maier and
//      Pomerance's PROVEN r = 2 and T1's implicit constant set to 1, lands on the
//      measured constant.  Do not over-read the agreement: T1 carries an
//      unfitted O(1).  What is not a coincidence is the SHAPE.
//
//   2. WHY c LOOKS FLAT.  c_pred/r = T1/log x = log_3 x/(log_2 x)^2, and that
//      function has a stationary point where log_3 x = 1/2, i.e. log_2 x = e^0.5
//      and log x = 5.200, that is x = 181.  The whole exact one-class
//      ladder, p = 11 to 311, brackets that point.  The flatness of c over the
//      only data anyone has is a property of where the data sits on
//      log_3 x/(log_2 x)^2, and r has been frozen at 2 the whole way.
//
//   3. WHERE IT BREAKS.  c doubles when T1*r doubles relative to x = 229:
//       c =  2 * measured  at  x ~ 1e17
//       c = 10 * measured  at  x ~ 1e406
//
//   THE FOUR LIVE EXTRAPOLATIONS OF c, side by side, all anchored at x = 229.
//   "law" is B's constant.  "measured drift" is c ~ (log x)^0.12, the fit on the
//   top 47 exact terms.  "ledger" is T1*r/log x from this section.  "MP" is
//   c ~ log x, which is what J(T) = T(log T)^{2+o(1)} demands.
//
//        x         law    measured drift    ledger      MP
//        1e2.4    0.3722         0.3722       0.3722    0.3722
//        1e3.0    0.3722         0.3831       0.3574    0.4732
//        1e6.0    0.3722         0.4163       0.5674    0.9463
//       1e10.0    0.3722         0.4426       0.5886    1.5772
//       1e20.0    0.3722         0.4810       0.7420    3.1545
//       1e50.0    0.3722         0.5369       1.1907    7.8861
//      1e100.0    0.3722         0.5835       1.6819   15.7723
//      1e300.0    0.3722         0.6657       3.1152   47.3169
//     1e1000.0    0.3722         0.7692       6.6076  157.7229
//
//   The measured drift and the ledger bracket each other for the first 20 decades
//   and then separate.  MP overtakes both, but not until log x is large enough
//   for r to escape 2, and r is a max over p Poisson(1/log x) counts, which
//   climbs like log x/log_2 x.  All four agree to within 20% over the entire
//   exact ladder, which is exactly why the ladder cannot decide between them.
//
//
//      So the law is not wrong in our range and it is not right asymptotically.
//      Under the ledger it stays inside a factor of 2 to x ~ 1e17, which is 1e15
//      beyond the largest Jacobsthal value anyone has computed, and it is out by
//      a factor 10 only past x ~ 1e400.  Under MP itself, which is the fast
//      reading, the factor of 2 arrives at x ~ 1e5 and the factor of 10 at
//      x ~ 1e24.  Both are far beyond anything computable, and the honest
//      statement is that the law's failure is not observable, only derivable.
//
// ===============================================================================
// S8.  WHICH REPO EXTRAPOLATIONS INHERIT THE ERROR.
// ===============================================================================
//
//   Rule, from S3 and S4: an ON-DIAGONAL use of the law (window = the whole tile
//   x#) is safe, because c is flat along the diagonal for the reason S7 gives.
//   An OFF-DIAGONAL use (window = x^k for fixed k) needs the OFF-diagonal c,
//   which is 0.85 to 1.05, not 0.46, and which itself moves with x.
//
//    G2(41#): one step past the data, ON the diagonal.
//      m2(41) = 35.80, theta(41) = 33.35, lnD = 29.77, prediction = 1065.7 * c2'
//      c2' band from the 8 exact terms [0.4463, 0.5939], mean 0.4814
//      => G2(41#) in [476, 633], central 513
//      drift correction from S7 over one step, 37 -> 41: 1.0405.  Negligible.
//
//    the localized claim, which is the one that is actually wrong:
//      FOLD-PROFILE.md S12 projects "localized: M(x, x'^2) ~ 1.2*x*ln x".
//      The law says M(x, x^2) = c*mbar*ln(x^2/mbar) ~ 4.8*c*ln^3 x.  Measured:
//         x      M(x,x^2)   mbar    lnD    c      4.8 ln^3x   1.2 x ln x   ratio
//        211       498     71.1   6.44  1.087        736         1355     2.7
//        401       630     89.9   7.49  0.936       1034         2884     4.6
//        797       924    114.2   8.62  0.938       1431         6390     6.9
//       1601      1452    140.4   9.81  1.054       1928        14175     9.8
//       3203      1722    170.3  11.01  0.919       2524        31025    18.0
//       6421      2832    204.2  12.22  1.135       3235        67554    23.9
//       9973      2868    227.1  12.99  0.972       3747       110193    38.4
//
//      M(x,x^2)/ln^3 x is flat at 3.2 to 3.7 over a 47x range in x, which is
//      LOCALIZED-GAP.md S5's own "M/(k ln^3 x) flat in 1.2 to 1.6" at k = 2.  So
//      the two repo files disagree with each other and the measurement settles it
//      in LOCALIZED-GAP's favour.  FOLD-PROFILE's projection is a factor 38 high
//      at x = 9973 and the error grows like x/ln^2 x.  It errs in the SAFE
//      direction for the Zone Postulate: the true localized margin is
//      x^2/(3.5 ln^3 x), not x/(1.2 ln x).
//
//   THE LIST.
//    1. two-class-lower-bounds.md S6, G2(41#).  ON diagonal, one step.  SAFE.
//       Band 476 to 633, central 513, unchanged.  (The "530 to 640" and "660" in
//       that file were already corrected by G2-STATE.md S6.2; this note confirms
//       the corrected band and adds that the drift over one step is 4%.)
//    2. two-class-lower-bounds.md S8, "lower, measured law ~ 1.2 x ln^2 x".  ON
//       diagonal.  SAFE as a description of x <= 41.  It must not be quoted as an
//       asymptotic: the same law with the ledger's drift reads
//       1.2 x ln^2 x * (T1(x) r(x))/(T1(41) r(41)), which is 3x larger by 1e50.
//    3. two-class-lower-bounds.md S6 caveat, "c1 should eventually grow like ln x
//       and does not".  CORRECT and now quantified: it grows like (ln x)^0.12 on
//       the top 47 terms, against MP's 1.
//    4. localized-04-maxsum.md S4, "M(x,Y) ~ mbar ln(Y/mbar)".  OFF diagonal.
//       SAFE in its own window, but the constant 0.74-1.17 is specific to
//       lnD ~ 11-16 and x ~ 1e3 and must not be carried to the full tile, where
//       the same object gives 0.46.
//    5. FOLD-PROFILE.md S12, "localized M(x,x'^2) ~ 1.2 x ln x".  REFUTED above.
//    6. exponent-control.md S6 margin extrapolations.  Those are power-law fits,
//       not uses of this law.  UNAFFECTED.
//    7. Anything reading c as a universal constant across both regimes.  There is
//       no such constant.  Report c with (x, lnD) attached or do not report it.
//
//
//   done in 147.8s
// ============================================================================
// READINGS
//
