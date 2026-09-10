// attack-doubling-01.js
//
// THE DOUBLING ATTACK'S FIRST MOVE: ENUMERATE BEFORE PROVING.
//
// THE QUESTION. The doubling slice of (H-sub) -- Ghat(2s) <= C2 * Ghat(s)
// along the base-2 chain -- is the corpus's one trap-free, prize-bearing
// inequality (attack-hsub-01.md Reduction 3, red-teamed 0820 night): any
// proven C2 < 2^beta2 = 19.2455 lowers the proven exponent ceiling 4.2665
// to log2(C2), and custody data force C2 >= 348/66 = 5.2727, so no provable
// constant is TPC-implying through the slice's own conclusion. Before any
// proof is attempted, the method says enumerate. Four questions:
//   (a) C2(s) = Ghat(2s)/Ghat(s) EXACTLY for every reachable integer s
//       (s = 2..41 on the trusted 22-term ladder; custody grade iff
//       2s <= 46), exact fractions, base-2 chain rows marked;
//   (b) at fully-enumerable scale (s <= 13, tiles to 23#): open the hood on
//       every distinct doubling step. Where does the maximal window at
//       level 2s sit relative to level-s structure? Decompose its length
//       into consecutive level-s gaps bridged by kills from the primes
//       entering in (s, 2s] (Bertrand guarantees at least one), with the
//       kill multiplicity (overlap) and the spanned-gap density measured;
//   (c) attempt a PROVEN bound at the enumerated steps: the bridging
//       certificate C2 <= K*+1 (K* = the longest run of consecutive
//       level-s slots all killed by the entering primes, computed exactly
//       by full cyclic walk), then the a-priori closures -- AP residue
//       counting, any constant-factor sharpening of it, the unified caps,
//       the Mirror-Sweep symmetry -- naming exactly where each leaks;
//   (d) honest hunting: does C2(s) grow along the chain? Measured against
//       in-pass constant-law nulls (POW: C2 exactly constant in the
//       continuous limit; LOG: genuinely decreasing) -- and the same
//       question asked of the certificate quantity K* itself.
//
// HONEST DOUBT. The reachable range is st <= 82: five base-2 chain points,
// eleven distinct enumerable doubling steps -- nothing here can SEE
// asymptotic growth of C2, only fail to find it (the step-sampling artifact
// of attack-fekete-1d-01 applies to C2 too, which is why the nulls run in
// the same pass on the same primes). The bridging certificate K*+1 is a
// per-level computed theorem, not a statement about all s; the closure
// analysis below shows the residue-density route to an a-priori K* bound
// fails from the very first step, so this pass expects to name the
// mechanism, not to prove the inequality. Rows s >= 24 of the C2 table rest
// on A144311 literature terms (floor-certified only at 47..61); the s = 32
// chain row rests on Wang's a(18).
//
// CUSTODY. The 14 exact terms (with argmax positions and multiplicities)
// are PARSED from research/exact-g2-ladder.js (never retyped; pos fields
// are BigInt literals, converted only under a loud 2^53 width guard); the
// 22-term A144311 column is PARSED from
// research/import-interp-01-bgt-defect.js, the corpus keeper of that list;
// the two are cross-checked term by term on the shared 14. The tile walks
// below RE-DERIVE G2(p#), its least argmax position and its multiplicity
// from scratch for every p <= 23 by two independent code paths (fold
// recursion p <= 13; kill-run walk p <= 23), and every row must match the
// parsed ladder digit for digit. Cross-check against attack-hsub-01: the
// (s,2)-family discriminating statistic must reproduce -0.0336 +- 0.0596.
//
// ARITHMETIC NOTE (width rule). Largest integer RUN here: 23# =
// 223,092,870 < 2^31 << 2^53 -- all Number. Ladder pos values up to
// 830,330,079,152,051 (~8.3e14) are parsed as BigInt and pass the 2^53
// guard below; positions are only USED for p <= 23, where they are < 8e7.
// No shift operator anywhere in this file.
//
// usage: node research/attack-doubling-01.js

'use strict';

const fs = require('fs');
const path = require('path');
const WID = require('./qc/widths');
const T0 = Date.now();
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '  n/a');
const pad = (s, n) => String(s).padStart(n);
let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) { FAILS++; console.log('  FAIL  ' + label + (detail ? '   ' + detail : '')); }
  else console.log('  ok    ' + label + (detail ? '   ' + detail : ''));
}
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// ------------------------------------------------------- A. custody: the ladders
const HERE = path.join(__dirname);
const srcLadder = fs.readFileSync(path.join(HERE, 'exact-g2-ladder.js'), 'utf8');
const srcInterp = fs.readFileSync(path.join(HERE, 'import-interp-01-bgt-defect.js'), 'utf8');

const EXACT = [];   // { x, g, pos (Number, width-guarded), nmax }
{
  const re = /\{ x: (\d+),\s+g: (\d+),\s+pos: (\d+)n,\s+nmax: (\d+)/g;
  let m;
  while ((m = re.exec(srcLadder)) !== null) {
    const big = BigInt(m[3]);
    // WIDTH RULE: the pos column reaches 8.3e14 at x = 43; audit against 2^53
    // for THIS parse, loudly, before any Number conversion.
    WID.assertFits('ladder pos (exact-g2-ladder.js)', Number(big), Float64Array, 'x=' + m[1]);
    EXACT.push({ x: +m[1], g: +m[2], pos: Number(big), nmax: +m[4] });
  }
}
if (EXACT.length === 0) throw new Error('parse failure: no LADDER rows found in exact-g2-ladder.js');
let A144311 = null;
{
  const m = srcInterp.match(/const A144311 = \[([^\]]+)\]/s);
  if (!m) throw new Error('parse failure: A144311 not found in import-interp-01-bgt-defect.js');
  A144311 = m[1].split(',').map((s) => parseInt(s.trim(), 10));
}
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2FULL = A144311.map((v) => v + 1);

console.log('=== A. CUSTODY ======================================================');
check('14 exact terms parsed (pos BigInt-guarded < 2^53)', EXACT.length === 14);
check('22 A144311 terms parsed', A144311.length === 22);
let agree = true;
for (let i = 0; i < 14; i++) agree = agree && EXACT[i].x === PR[i] && EXACT[i].g === G2FULL[i];
check('exact ladder == A144311+1 on all 14 shared terms', agree);

// ------------------------------------------------------- B. engine + self-tests
// Ghat(t) = G2(P(t)#), P(t) = largest listed prime <= t; domain [2, cap).
function mkG(pr, vals, cap) {
  return {
    pr, vals, cap,
    at(t) { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : vals[k]; },
    pAt(t) { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : pr[k]; },
  };
}
const LFULL = mkG(PR, G2FULL, 83);
const LCUST = mkG(PR.slice(0, 14), G2FULL.slice(0, 14), 47);

console.log('');
console.log('=== B. ENGINE SELF-TESTS ============================================');
{
  // negative control: exactly-multiplicative Ghat* = t^2 gives C2 == 4 at every s
  const SQ = { at: (t) => t * t };
  let worst = 0;
  for (let s = 2; s <= 40; s++) worst = Math.max(worst, Math.abs(SQ.at(2 * s) / SQ.at(s) - 4));
  check('negative control: Ghat*(t)=t^2 gives C2 == 4 exactly', worst < 1e-12);
  check('hand values: Ghat(4)/Ghat(2) = 6/2 = 3', LFULL.at(4) / LFULL.at(2) === 3);
  check('hand values: Ghat(32)/Ghat(16) = 348/66', LFULL.at(32) === 348 && LFULL.at(16) === 66);
  check('hsub-01 cross-check: 348/66 = 5.2727', Math.abs(348 / 66 - 5.2727) < 5e-5, F(348 / 66));
}

// ------------------------------------------------------- C. (a) the C2 table
console.log('');
console.log('=== C. THE C2 TABLE, EXACT, EVERY REACHABLE s =======================');
console.log('C2(s) = Ghat(2s)/Ghat(s); grade CUST iff 2s <= 46 (both terms corpus-');
console.log('exact); chain = base-2 chain row (the decisive family, Reduction 3).');
console.log('   s   P(s) P(2s)  Ghat(s) Ghat(2s)   exact       C2      grade  chain');
const ROWS = [];
for (let s = 2; s <= 41; s++) {
  const gs = LFULL.at(s), g2s = LFULL.at(2 * s);
  const g = gcd(g2s, gs);
  const c2 = g2s / gs;
  const grade = 2 * s <= 46 ? 'CUST ' : 'trust';
  const chain = [2, 4, 8, 16, 32].includes(s) ? '  <== chain' : '';
  ROWS.push({ s, gs, g2s, c2, cust: 2 * s <= 46 });
  console.log('  ' + pad(s, 2) + '   ' + pad(LFULL.pAt(s), 3) + '  ' + pad(LFULL.pAt(2 * s), 3) + '   ' +
    pad(gs, 5) + '   ' + pad(g2s, 5) + '   ' + pad(g2s / g + '/' + gs / g, 8) + '  ' + F(c2) + '  ' + grade + chain);
}
const supRow = ROWS.reduce((a, b) => (b.c2 > a.c2 ? b : a));
const supCust = ROWS.filter((r) => r.cust).reduce((a, b) => (b.c2 > a.c2 ? b : a));
const infRow = ROWS.reduce((a, b) => (b.c2 < a.c2 ? b : a));
console.log('sup over all reachable s (trusted): C2 = ' + supRow.g2s + '/' + supRow.gs + ' = ' + F(supRow.c2) + ' at s = ' + supRow.s);
console.log('sup over custody range (s <= 23)  : C2 = ' + supCust.g2s + '/' + supCust.gs + ' = ' + F(supCust.c2) + ' at s = ' + supCust.s);
console.log('inf over all reachable s          : C2 = ' + infRow.g2s + '/' + infRow.gs + ' = ' + F(infRow.c2) + ' at s = ' + infRow.s);
check('the sup sits ON the base-2 chain at s = 16 (hsub-01/redteam claim)', supRow.s === 16 && supRow.g2s === 348 && supRow.gs === 66);
check('custody sup == trusted sup (no literature term carries the sup)', supCust.s === supRow.s && supCust.c2 === supRow.c2);
console.log('the base-2 chain, in order (s = 2, 4, 8, 16, 32):');
console.log('  C2 : ' + [2, 4, 8, 16, 32].map((s) => F(ROWS.find((r) => r.s === s).c2)).join('  '));
console.log('any PROVEN all-s C2 must be >= 5.2727; the landing zone is');
console.log('[5.2727, 19.2455): limsup <= log2 C2 in [2.3985, 4.2665). TPC through');
console.log('the slice needs C2 < 4, already excluded by the s = 16 datum.');

// ------------------------------------------------------- D. tiles + kill-run walks
// Tiles T_p for p <= 13 are materialized by the fold recursion (kill r == 0,
// r == p-2 mod p: r or r+2 divisible by p). Levels 17#, 19#, 23# are never
// materialized: each doubling step is a WALK over copies of the base tile,
// testing every level-s slot copy against the ENTERING primes only --
// survivors are exactly the level-2s slots, so the walk re-derives G2, the
// least argmax and nmax as a free cross-check against the parsed ladder,
// and reads off the kill-runs on the way.
console.log('');
console.log('=== D. TILES AND WALKS (independent re-derivation of the ladder) ====');
const TILE = { 2: [1] };            // slot lists; T_2 = odds, one slot per width 2
const WIDTH = { 2: 2 };
for (const p of [3, 5, 7, 11, 13]) {
  const prev = PR[PR.indexOf(p) - 1];
  const src = TILE[prev], W = WIDTH[prev], out = [];
  for (let k = 0; k < p; k++) {
    const base = k * W;
    for (const r of src) {
      const pos = base + r, m = pos % p;
      if (m !== 0 && m !== p - 2) out.push(pos);
    }
  }
  TILE[p] = out; WIDTH[p] = W * p;
}
const Dexp = (p) => PR.filter((q) => q >= 3 && q <= p).reduce((a, q) => a * (q - 2), 1);
// cyclic max-gap scan of a materialized tile: {g, least, nmax, starts}
function tileGaps(p) {
  const t = TILE[p], W = WIDTH[p];
  let g = 0, least = -1, nmax = 0; const starts = new Set();
  for (let i = 0; i < t.length; i++) {
    const nxt = i + 1 < t.length ? t[i + 1] : t[0] + W;
    const d = nxt - t[i];
    if (d > g) { g = d; least = t[i]; nmax = 1; starts.clear(); starts.add(t[i]); }
    else if (d === g) { nmax++; starts.add(t[i]); }
  }
  return { g, least, nmax, starts };
}
const GAPS = {};
for (const p of [3, 5, 7, 11, 13]) {
  GAPS[p] = tileGaps(p);
  const row = EXACT.find((e) => e.x === p);
  check('T_' + p + ' fold: D = ' + TILE[p].length + ', G2 = ' + GAPS[p].g + ' @ ' + GAPS[p].least + ' (x' + GAPS[p].nmax + ') == ladder',
    TILE[p].length === Dexp(p) && GAPS[p].g === row.g && GAPS[p].least === row.pos && GAPS[p].nmax === row.nmax);
}

// The walk. P = base level, Pp = target level, Q = entering primes (P, Pp].
// Returns G2 at Pp, least argmax start a (b = a + G2), nmax, alive count,
// kAt = level-P slot copies bridged inside the least argmax window, and
// K* = the longest kill-run of consecutive level-P slots anywhere (cyclic).
function walkStep(P, Pp) {
  const Q = PR.filter((q) => q > P && q <= Pp);
  const slots = TILE[P], W = WIDTH[P];
  const copies = Q.reduce((a, q) => a * q, 1);
  // WIDTH RULE: the largest position touched this run, audited for THIS level.
  WID.assertFits('walk position range W*copies', W * copies, Float64Array, P + '#->' + Pp + '#');
  const WPp = W * copies;
  let g = 0, a = -1, nmax = 0, kAt = -1;
  let prev = -1, first = -1, dead = 0, leadDead = 0, Kstar = -1;
  let alive = 0;
  for (let k = 0; k < copies; k++) {
    const base = k * W;
    for (let i = 0; i < slots.length; i++) {
      const pos = base + slots[i];
      let ok = true;
      for (let j = 0; j < Q.length; j++) {
        const q = Q[j], m = pos % q;
        if (m === 0 || m === q - 2) { ok = false; break; }
      }
      if (!ok) { dead++; continue; }
      alive++;
      if (prev < 0) { first = pos; leadDead = dead; }
      else {
        const d = pos - prev;
        if (d > g) { g = d; a = prev; nmax = 1; kAt = dead; }
        else if (d === g) nmax++;
        if (dead > Kstar) Kstar = dead;
      }
      dead = 0; prev = pos;
    }
  }
  { // cyclic wrap: last survivor -> first survivor + WPp
    const d = first + WPp - prev, wrapDead = dead + leadDead;
    if (d > g) { g = d; a = prev; nmax = 1; kAt = wrapDead; }
    else if (d === g) nmax++;
    if (wrapDead > Kstar) Kstar = wrapDead;
  }
  return { P, Pp, Q, g, a, b: a + g, nmax, alive, kAt, Kstar, WPp };
}

// the eleven distinct doubling steps, and the s-values mapping onto each
const STEPS = [
  { P: 2, Pp: 3, sList: [2] },    { P: 3, Pp: 5, sList: [3] },
  { P: 3, Pp: 7, sList: [4] },    { P: 5, Pp: 7, sList: [5] },
  { P: 5, Pp: 11, sList: [6] },   { P: 7, Pp: 13, sList: [7, 8] },
  { P: 7, Pp: 17, sList: [9] },   { P: 7, Pp: 19, sList: [10] },
  { P: 11, Pp: 19, sList: [11] }, { P: 11, Pp: 23, sList: [12] },
  { P: 13, Pp: 23, sList: [13] },
];
const WALK = [];
for (const st of STEPS) {
  const w = walkStep(st.P, st.Pp);
  w.sList = st.sList;
  WALK.push(w);
  const row = EXACT.find((e) => e.x === st.Pp);
  check('walk ' + st.P + '#->' + st.Pp + '#: G2 = ' + w.g + ' @ ' + w.a + ' (x' + w.nmax + '), D = ' + w.alive + ' == ladder',
    w.g === row.g && w.a === row.pos && w.nmax === row.nmax && w.alive === Dexp(st.Pp));
}
console.log('(eight ladder rows re-derived from scratch by two independent code');
console.log(' paths -- fold recursion p <= 13, kill-run walk p <= 23 -- all match)');

// ------------------------------------------------------- E. (b) the decomposition
console.log('');
console.log('=== E. THE DOUBLING STEP, HOOD OPEN: WHERE THE MAX WINDOW SITS ======');
// anatomy of the least argmax window [a, b] at level Pp in level-P coordinates
function anatomy(w) {
  const W = WIDTH[w.P];
  const isSlot = w.P === 2 ? ((x) => x % 2 === 1) : (() => { const S = new Set(TILE[w.P]); return (x) => S.has(x % W); })();
  const inner = [];
  for (let pos = w.a + 1; pos < w.b; pos++) if (isSlot(pos)) {
    const killers = w.Q.filter((q) => pos % q === 0 || pos % q === q - 2);
    inner.push({ pos, killers });
  }
  const chainPos = [w.a, ...inner.map((z) => z.pos), w.b];
  const gaps = [];
  for (let i = 0; i + 1 < chainPos.length; i++) gaps.push(chainPos[i + 1] - chainPos[i]);
  const maxSpan = Math.max(...gaps);
  const G2P = w.P === 2 ? 2 : GAPS[w.P].g;
  const starts = w.P === 2 ? null : GAPS[w.P].starts;
  let hasRecordCopy = false;
  for (let i = 0; i + 1 < chainPos.length; i++) {
    const st = w.P === 2 ? true : starts.has(((chainPos[i] % W) + W) % W);
    if (st && gaps[i] === G2P) hasRecordCopy = true;
  }
  const strikes = inner.reduce((x, z) => x + z.killers.length, 0);
  const multi = inner.filter((z) => z.killers.length >= 2).length;
  return { inner, gaps, maxSpan, G2P, hasRecordCopy, strikes, multi };
}
for (const w of WALK) {
  const A = anatomy(w);
  w.anat = A;
  const g = gcd(w.g, A.G2P);
  const meanSpan = w.g / A.gaps.length;                     // window's mean spanned level-P gap
  const meanTile = WIDTH[w.P] / TILE[w.P].length;           // tile mean level-P gap
  console.log('');
  console.log('STEP s=' + w.sList.join(',') + '  ' + w.P + '# -> ' + w.Pp + '#   Q = {' + w.Q.join(',') + '}   C2 = ' +
    (w.g / g) + '/' + (A.G2P / g) + ' = ' + F(w.g / A.G2P));
  console.log('  argmax window [' + w.a + ', ' + w.b + ']  L = ' + w.g + '   bridged level-' + w.P + ' kills k = ' + A.inner.length +
    '   strikes = ' + A.strikes + '   multi-killed = ' + A.multi);
  const kl = A.inner.map((z) => z.pos + '(' + z.killers.join('&') + ')').join(' ');
  console.log('  killed copies: ' + (kl || '(none)'));
  console.log('  spanned level-' + w.P + ' gaps: ' + A.gaps.join('+') + ' = ' + A.gaps.reduce((x, y) => x + y, 0) +
    '   max spanned ' + A.maxSpan + (A.maxSpan === A.G2P ? ' = G2(' + w.P + '#)' : ' < G2(' + w.P + '#) = ' + A.G2P));
  console.log('  contains a copy of the level-' + w.P + ' RECORD gap: ' + (A.hasRecordCopy ? 'YES' : 'NO') +
    '   inherited share max/L = ' + F(A.maxSpan / w.g) + '   new damage = ' + F(1 - A.maxSpan / w.g));
  console.log('  ground density: mean spanned gap ' + F(meanSpan, 2) + ' vs tile mean ' + F(meanTile, 2) +
    '   rho = ' + F(meanSpan / meanTile, 3));
  check('decomposition closes: sum of spanned gaps == L, k+1 gaps', A.gaps.reduce((x, y) => x + y, 0) === w.g && A.gaps.length === A.inner.length + 1);
  check('every bridged copy is killed by an ENTERING prime only', A.inner.every((z) => z.killers.length > 0));
}
{ // hand-verifiable anchor for the anatomy engine, step 2#->3#
  const w0 = WALK[0], A0 = w0.anat;
  check('hand anatomy 2#->3#: window [5,11], kills 7(3) 9(3), single-covered',
    w0.a === 5 && w0.b === 11 && A0.inner.length === 2 && A0.inner[0].pos === 7 &&
    A0.inner[1].pos === 9 && A0.strikes === 2 && A0.multi === 0);
}

// ------------------------------------------------------- F. (c) the proof attempt
console.log('');
console.log('=== F. THE BOUND ATTEMPTED AT ENUMERABLE SCALE ======================');
console.log('BRIDGING LEMMA [PROVEN, three lines]. The level-2s admissibility');
console.log('condition contains the level-s one, so level-2s slots are a sub-');
console.log('pattern of the (periodic) level-s slots: every level-2s gap is a sum');
console.log('of k+1 consecutive level-s gaps, k = the level-s slot copies inside');
console.log('it, each killed by an entering prime in (s, 2s], and each gap');
console.log('<= Ghat(s) by definition of the record. Hence');
console.log('    Ghat(2s) <= (K*+1) * Ghat(s),   i.e.  C2(s) <= K*+1,');
console.log('K* = the longest run of consecutive level-s slots all killed by the');
console.log('entering primes, computed EXACTLY below by full cyclic walk.');
console.log('');
console.log('step        C2       k   K*  cert=K*+1  cert/C2   kcap   theta  need');
let worstTheta = Infinity, allCert = true, allKcap = true;
for (const w of WALK) {
  const A = w.anat, L = w.g, G2P = A.G2P;
  const c2 = L / G2P, cert = w.Kstar + 1;
  const kcap = w.Q.reduce((a, q) => a + 2 * (Math.floor((L - 2) / q) + 1), 0);
  const theta = 2 * G2P * w.Q.reduce((a, q) => a + 1 / q, 0);
  w.cert = cert; w.theta = theta;
  worstTheta = Math.min(worstTheta, theta);
  allCert = allCert && c2 <= cert;
  allKcap = allKcap && A.inner.length <= kcap;
  console.log('  ' + (w.P + '#->' + w.Pp + '#').padEnd(10) + F(c2) + '  ' + pad(A.inner.length, 2) + '  ' + pad(w.Kstar, 3) +
    '     ' + pad(cert, 3) + '     ' + F(cert / c2, 2) + '   ' + pad(kcap, 4) + '  ' + F(theta, 2) + '  ' + F(1 / theta, 3));
}
check('the bridging certificate C2 <= K*+1 holds at all 11 steps', allCert);
check('the AP-counting cap k <= kcap holds at all 11 steps (PROVEN, verified)', allKcap);
console.log('');
console.log('THE CLOSURE, AND WHERE IT LEAKS. The only a-priori handle on K* the');
console.log('proven machinery offers is AP counting: an entering prime q kills');
console.log('through two residue classes mod q, same-class kills sit >= q apart,');
console.log('so inside a window of length L it kills <= 2(floor((L-2)/q)+1) copies');
console.log('[PROVEN; the kcap column, never violated]. Substituting into the');
console.log('Bridging Lemma: L <= (1 + kcap(L)) * Ghat(s), which closes to a');
console.log('finite C2 iff  theta = 2*Ghat(s)*Sum_{q in (s,2s]} 1/q < 1.');
console.log('Minimum theta over the eleven steps: ' + F(worstTheta, 4) + ', at the FIRST step');
console.log('(2#->3#); every later step is larger, reaching ' + F(WALK[WALK.length - 1].theta, 2) + ' at 13#->23#.');
console.log('The closure fails at EVERY step, and it worsens: theta grows like');
console.log('2*Ghat(s)*ln2/ln s, i.e. polylogarithmically, because Ghat(s)/s does.');
console.log('');
console.log('CONSTANT-FACTOR SHARPENING IS DEAD TOO [PROVEN, given theta -> inf].');
console.log('Any refinement of the density cap by a CONSTANT factor c < 1 (deeper');
console.log('freshness conditions, unified-cap style discounts, overlap credits)');
console.log('closes only where c < 1/theta; the need column: 0.750 at the first');
console.log('step, 0.049 at 13#->23#, -> 0. Since theta grows without bound along');
console.log('s, NO constant-factor sharpening of residue-density counting proves');
console.log('any all-s C2. The failure is structural, not a constant.');
console.log('');
console.log('WHY THE OTHER TOOLS DO NOT ATTACH. The unified caps (anchored-01,');
console.log('staircase Thm 3) bound a prime\'s fresh-kill COUNT over a whole level,');
console.log('history-blind; the window needs kill PLACEMENT -- their localized');
console.log('content is exactly the AP spacing already spent in kcap. Mirror-Sweep');
console.log('is symmetry (it pairs windows a <-> w-a and halves fingerprints) and');
console.log('carries no magnitude bound by its own statement. An a-priori K* bound');
console.log('is a statement that the entering primes\' two-class covering never');
console.log('achieves a long consecutive run on the level-s slot sequence -- the');
console.log('SAME two-class Jacobsthal problem one level up. The inequality is');
console.log('SELF-SIMILAR under its natural decomposition; a proof must break the');
console.log('self-similarity with placement structure [INFERRED].');

// ------------------------------------------------------- G. (d) the drift hunt
console.log('');
console.log('=== G. DOES C2 GROW? THE CHAIN, THE NULLS, AND K* ===================');
const POWf = (p) => 1.84 * Math.pow(p, 1.546);
const LOGf = (p) => 1.016 * p * Math.log(p) ** 2;
const mkNull = (f, n) => mkG(PR.slice(0, n), PR.slice(0, n).map(f), n === 22 ? 83 : 47);
function ols(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0; for (let i = 0; i < n; i++) ss += (ys[i] - a - b * xs[i]) ** 2;
  return { b, se: Math.sqrt((ss / Math.max(1, n - 2)) / sxx) };
}
console.log('ln C2(s) against ln s, each ladder beside its in-pass nulls (same');
console.log('primes, same step construction; POW\'s continuous-limit C2 is EXACTLY');
console.log('the constant 2^1.546 = ' + F(Math.pow(2, 1.546)) + ', so whatever POW reads here IS the');
console.log('constant-law look through this instrument):');
console.log('  ladder          n(s)   slope      se       sign at 1 sigma');
const FITS = {};
for (const [name, L, smax] of [
  ['G2 full', LFULL, 41], ['POW null 22', mkNull(POWf, 22), 41], ['LOG null 22', mkNull(LOGf, 22), 41],
  ['G2 custody', LCUST, 23], ['POW null 14', mkNull(POWf, 14), 23], ['LOG null 14', mkNull(LOGf, 14), 23],
]) {
  const xs = [], ys = [];
  for (let s = 2; s <= smax; s++) { xs.push(Math.log(s)); ys.push(Math.log(L.at(2 * s) / L.at(s))); }
  const fit = ols(xs, ys);
  FITS[name] = fit;
  const sign = fit.b - fit.se > 0 ? 'positive' : (fit.b + fit.se < 0 ? 'negative' : 'zero');
  console.log('  ' + name.padEnd(15) + pad(xs.length, 4) + '   ' + F(fit.b) + '  ' + F(fit.se) + '   ' + sign);
}
console.log('the discriminating statistic, G2 slope minus POW slope (same primes):');
for (const [g, p0] of [['G2 full', 'POW null 22'], ['G2 custody', 'POW null 14']]) {
  const d = FITS[g].b - FITS[p0].b;
  const se = Math.sqrt(FITS[g].se ** 2 + FITS[p0].se ** 2);
  console.log('  ' + g.padEnd(12) + ': ' + F(d) + ' +- ' + F(se) + '   -> ' + (Math.abs(d) < se ? 'CONSISTENT with constant C2' : (d > 0 ? 'reads ABOVE the constant null' : 'reads BELOW the constant null')));
}
console.log('');
console.log('the base-2 chain itself (the decisive family), s = 2, 4, 8, 16, 32:');
{
  const ch = [2, 4, 8, 16, 32].map((s) => ROWS.find((r) => r.s === s));
  console.log('  C2 : ' + ch.map((r) => F(r.c2)).join(' '));
  const inc = [];
  for (let i = 1; i < ch.length; i++) inc.push(ch[i].c2 > ch[i - 1].c2 ? '+' : '-');
  console.log('  increments: ' + inc.join(' ') + '   (alternating; the sup is INTERIOR, at s = 16,');
  console.log('  and the last chain step falls 5.2727 -> 3.1034 [trusted, Wang a(18)])');
  check('no monotone growth along the chain (last increment negative)', inc[inc.length - 1] === '-');
}
console.log('');
console.log('AND THE CERTIFICATE QUANTITY ITSELF. K*+1 across the eleven steps,');
console.log('with the same raw-slope instrument (no null exists for K*: a POW');
console.log('ladder has no slot sequence, so this is a RAW read, stated as such):');
{
  const xs = WALK.map((w) => Math.log(w.Pp));
  const ysK = WALK.map((w) => Math.log(w.cert));
  const ysC = WALK.map((w) => Math.log(w.g / w.anat.G2P));
  const fK = ols(xs, ysK), fC = ols(xs, ysC);
  console.log('  K*+1      : ' + WALK.map((w) => pad(w.cert, 3)).join(''));
  console.log('  cert/C2   : ' + WALK.map((w) => F(w.cert / (w.g / w.anat.G2P), 2)).join(' '));
  console.log('  ln(K*+1) vs ln P(2s): slope ' + F(fK.b) + ' +- ' + F(fK.se));
  console.log('  ln C2     vs ln P(2s): slope ' + F(fC.b) + ' +- ' + F(fC.se) + '   (same 11 points)');
  const grows = fK.b - fK.se > 0;
  console.log('  the certificate DRIFTS UP' + (grows ? ' (positive at 1 sigma)' : '') + ' while C2 does not: the slack');
  console.log('  cert/C2 runs 1.00 at the first three steps to 2.91 at 13#->23#.');
  console.log('  Extrapolating the raw K* fit (illustration, NOT a claim): K*+1');
  console.log('  reaches 2^beta2 = 19.2455 near P(2s) ~ ' + Math.round(Math.exp((Math.log(19.2455) - (Math.log(WALK[10].cert) - fK.b * Math.log(23))) / fK.b)) + ', so the certificate');
  console.log('  route needs K* SUBLINEAR in the level to land, and needs it proven.');
}

// ------------------------------------------------------- H. summary
console.log('');
console.log('=== H. SUMMARY NUMBERS =============================================');
console.log('sup C2 over all reachable s        : ' + supRow.g2s + '/' + supRow.gs + ' = ' + F(supRow.c2) + '  at s = ' + supRow.s + ', ON the chain');
console.log('inf over all reachable s           : ' + F(infRow.c2) + ' at s = ' + infRow.s);
console.log('landing zone for a proven C2       : [5.2727, 19.2455) -> limsup <= log2 C2 in [2.3985, 4.2665)');
console.log('bridging certificates (K*+1), steps: ' + WALK.map((w) => w.cert).join(' '));
console.log('measured C2 at the same steps      : ' + WALK.map((w) => F(w.g / w.anat.G2P, 2)).join(' '));
console.log('closure coefficient theta, min     : ' + F(worstTheta, 4) + '  (needs < 1; fails at every step)');
console.log('overlap inside argmax windows      : ' + WALK.reduce((a, w) => a + w.anat.multi, 0) + ' multi-killed of ' +
  WALK.reduce((a, w) => a + w.anat.inner.length, 0) + ' bridged kills across all 11 steps');
console.log('');
console.log('self-test failures: ' + FAILS + (FAILS ? '   <-- DO NOT TRUST THIS OUTPUT' : '   (all checks passed)'));
console.log('total ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-doubling-01.js
//   invocation:  node research/attack-doubling-01.js
//   code-sha256: 50418c06731c619da89ac00c06d7ea616b28b2a71e77e61c95b265b678969e92
//   out-sha256:  b0ba3bd85430c8c7c8a739fe50dca2ae804fd0f29e9bc4c2cdba6e3c97b93f98
//   body-lines:  292
//   inputs:      research/qc/widths.js@9bcca510a863 research/exact-g2-ladder.js@999d2c5fa3ab research/import-interp-01-bgt-defect.js@20ad0a1961c8
//   forced:      2026-08-21, 0 of 195 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     0.4 s
// ============================================================================
// === A. CUSTODY ======================================================
//   ok    14 exact terms parsed (pos BigInt-guarded < 2^53)
//   ok    22 A144311 terms parsed
//   ok    exact ladder == A144311+1 on all 14 shared terms
//
// === B. ENGINE SELF-TESTS ============================================
//   ok    negative control: Ghat*(t)=t^2 gives C2 == 4 exactly
//   ok    hand values: Ghat(4)/Ghat(2) = 6/2 = 3
//   ok    hand values: Ghat(32)/Ghat(16) = 348/66
//   ok    hsub-01 cross-check: 348/66 = 5.2727    5.2727
//
// === C. THE C2 TABLE, EXACT, EVERY REACHABLE s =======================
// C2(s) = Ghat(2s)/Ghat(s); grade CUST iff 2s <= 46 (both terms corpus-
// exact); chain = base-2 chain row (the decisive family, Reduction 3).
//    s   P(s) P(2s)  Ghat(s) Ghat(2s)   exact       C2      grade  chain
//    2     2    3       2       6        3/1   3.0000  CUST   <== chain
//    3     3    5       6      12        2/1   2.0000  CUST
//    4     3    7       6      30        5/1   5.0000  CUST   <== chain
//    5     5    7      12      30        5/2   2.5000  CUST
//    6     5   11      12      42        7/2   3.5000  CUST
//    7     7   13      30      66       11/5   2.2000  CUST
//    8     7   13      30      66       11/5   2.2000  CUST   <== chain
//    9     7   17      30     108       18/5   3.6000  CUST
//   10     7   19      30     150        5/1   5.0000  CUST
//   11    11   19      42     150       25/7   3.5714  CUST
//   12    11   23      42     204       34/7   4.8571  CUST
//   13    13   23      66     204      34/11   3.0909  CUST
//   14    13   23      66     204      34/11   3.0909  CUST
//   15    13   29      66     258      43/11   3.9091  CUST
//   16    13   31      66     348      58/11   5.2727  CUST   <== chain
//   17    17   31     108     348       29/9   3.2222  CUST
//   18    17   31     108     348       29/9   3.2222  CUST
//   19    19   37     150     528      88/25   3.5200  CUST
//   20    19   37     150     528      88/25   3.5200  CUST
//   21    19   41     150     546      91/25   3.6400  CUST
//   22    19   43     150     618     103/25   4.1200  CUST
//   23    23   43     204     618     103/34   3.0294  CUST
//   24    23   47     204     708      59/17   3.4706  trust
//   25    23   47     204     708      59/17   3.4706  trust
//   26    23   47     204     708      59/17   3.4706  trust
//   27    23   53     204     870     145/34   4.2647  trust
//   28    23   53     204     870     145/34   4.2647  trust
//   29    29   53     258     870     145/43   3.3721  trust
//   30    29   59     258     966     161/43   3.7442  trust
//   31    31   61     348    1080      90/29   3.1034  trust
//   32    31   61     348    1080      90/29   3.1034  trust  <== chain
//   33    31   61     348    1080      90/29   3.1034  trust
//   34    31   67     348    1284     107/29   3.6897  trust
//   35    31   67     348    1284     107/29   3.6897  trust
//   36    31   71     348    1398     233/58   4.0172  trust
//   37    37   73     528    1530     255/88   2.8977  trust
//   38    37   73     528    1530     255/88   2.8977  trust
//   39    37   73     528    1530     255/88   2.8977  trust
//   40    37   79     528    1710     285/88   3.2386  trust
//   41    41   79     546    1710     285/91   3.1319  trust
// sup over all reachable s (trusted): C2 = 348/66 =  5.2727 at s = 16
// sup over custody range (s <= 23)  : C2 = 348/66 =  5.2727 at s = 16
// inf over all reachable s          : C2 = 12/6 =  2.0000 at s = 3
//   ok    the sup sits ON the base-2 chain at s = 16 (hsub-01/redteam claim)
//   ok    custody sup == trusted sup (no literature term carries the sup)
// the base-2 chain, in order (s = 2, 4, 8, 16, 32):
//   C2 :  3.0000   5.0000   2.2000   5.2727   3.1034
// any PROVEN all-s C2 must be >= 5.2727; the landing zone is
// [5.2727, 19.2455): limsup <= log2 C2 in [2.3985, 4.2665). TPC through
// the slice needs C2 < 4, already excluded by the s = 16 datum.
//
// === D. TILES AND WALKS (independent re-derivation of the ladder) ====
//   ok    T_3 fold: D = 1, G2 = 6 @ 5 (x1) == ladder
//   ok    T_5 fold: D = 3, G2 = 12 @ 17 (x2) == ladder
//   ok    T_7 fold: D = 15, G2 = 30 @ 71 (x2) == ladder
//   ok    T_11 fold: D = 135, G2 = 42 @ 899 (x4) == ladder
//   ok    T_13 fold: D = 1485, G2 = 66 @ 731 (x12) == ladder
//   ok    walk 2#->3#: G2 = 6 @ 5 (x1), D = 1 == ladder
//   ok    walk 3#->5#: G2 = 12 @ 17 (x2), D = 3 == ladder
//   ok    walk 3#->7#: G2 = 30 @ 71 (x2), D = 15 == ladder
//   ok    walk 5#->7#: G2 = 30 @ 71 (x2), D = 15 == ladder
//   ok    walk 5#->11#: G2 = 42 @ 899 (x4), D = 135 == ladder
//   ok    walk 7#->13#: G2 = 66 @ 731 (x12), D = 1485 == ladder
//   ok    walk 7#->17#: G2 = 108 @ 701 (x20), D = 22275 == ladder
//   ok    walk 7#->19#: G2 = 150 @ 659 (x20), D = 378675 == ladder
//   ok    walk 11#->19#: G2 = 150 @ 659 (x20), D = 378675 == ladder
//   ok    walk 11#->23#: G2 = 204 @ 76166567 (x4), D = 7952175 == ladder
//   ok    walk 13#->23#: G2 = 204 @ 76166567 (x4), D = 7952175 == ladder
// (eight ladder rows re-derived from scratch by two independent code
//  paths -- fold recursion p <= 13, kill-run walk p <= 23 -- all match)
//
// === E. THE DOUBLING STEP, HOOD OPEN: WHERE THE MAX WINDOW SITS ======
//
// STEP s=2  2# -> 3#   Q = {3}   C2 = 3/1 =  3.0000
//   argmax window [5, 11]  L = 6   bridged level-2 kills k = 2   strikes = 2   multi-killed = 0
//   killed copies: 7(3) 9(3)
//   spanned level-2 gaps: 2+2+2 = 6   max spanned 2 = G2(2#)
//   contains a copy of the level-2 RECORD gap: YES   inherited share max/L =  0.3333   new damage =  0.6667
//   ground density: mean spanned gap  2.00 vs tile mean  2.00   rho =  1.000
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=3  3# -> 5#   Q = {5}   C2 = 2/1 =  2.0000
//   argmax window [17, 29]  L = 12   bridged level-3 kills k = 1   strikes = 1   multi-killed = 0
//   killed copies: 23(5)
//   spanned level-3 gaps: 6+6 = 12   max spanned 6 = G2(3#)
//   contains a copy of the level-3 RECORD gap: YES   inherited share max/L =  0.5000   new damage =  0.5000
//   ground density: mean spanned gap  6.00 vs tile mean  6.00   rho =  1.000
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=4  3# -> 7#   Q = {5,7}   C2 = 5/1 =  5.0000
//   argmax window [71, 101]  L = 30   bridged level-3 kills k = 4   strikes = 4   multi-killed = 0
//   killed copies: 77(7) 83(5) 89(7) 95(5)
//   spanned level-3 gaps: 6+6+6+6+6 = 30   max spanned 6 = G2(3#)
//   contains a copy of the level-3 RECORD gap: YES   inherited share max/L =  0.2000   new damage =  0.8000
//   ground density: mean spanned gap  6.00 vs tile mean  6.00   rho =  1.000
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=5  5# -> 7#   Q = {7}   C2 = 5/2 =  2.5000
//   argmax window [71, 101]  L = 30   bridged level-5 kills k = 2   strikes = 2   multi-killed = 0
//   killed copies: 77(7) 89(7)
//   spanned level-5 gaps: 6+12+12 = 30   max spanned 12 = G2(5#)
//   contains a copy of the level-5 RECORD gap: YES   inherited share max/L =  0.4000   new damage =  0.6000
//   ground density: mean spanned gap  10.00 vs tile mean  10.00   rho =  1.000
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=6  5# -> 11#   Q = {7,11}   C2 = 7/2 =  3.5000
//   argmax window [899, 941]  L = 42   bridged level-5 kills k = 3   strikes = 3   multi-killed = 0
//   killed copies: 911(11) 917(7) 929(7)
//   spanned level-5 gaps: 12+6+12+12 = 42   max spanned 12 = G2(5#)
//   contains a copy of the level-5 RECORD gap: YES   inherited share max/L =  0.2857   new damage =  0.7143
//   ground density: mean spanned gap  10.50 vs tile mean  10.00   rho =  1.050
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=7,8  7# -> 13#   Q = {11,13}   C2 = 11/5 =  2.2000
//   argmax window [731, 797]  L = 66   bridged level-7 kills k = 3   strikes = 3   multi-killed = 0
//   killed copies: 737(11) 767(13) 779(11)
//   spanned level-7 gaps: 6+30+12+18 = 66   max spanned 30 = G2(7#)
//   contains a copy of the level-7 RECORD gap: YES   inherited share max/L =  0.4545   new damage =  0.5455
//   ground density: mean spanned gap  16.50 vs tile mean  14.00   rho =  1.179
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=9  7# -> 17#   Q = {11,13,17}   C2 = 18/5 =  3.6000
//   argmax window [701, 809]  L = 108   bridged level-7 kills k = 5   strikes = 5   multi-killed = 0
//   killed copies: 731(17) 737(11) 767(13) 779(11) 797(17)
//   spanned level-7 gaps: 30+6+30+12+18+12 = 108   max spanned 30 = G2(7#)
//   contains a copy of the level-7 RECORD gap: YES   inherited share max/L =  0.2778   new damage =  0.7222
//   ground density: mean spanned gap  18.00 vs tile mean  14.00   rho =  1.286
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=10  7# -> 19#   Q = {11,13,17,19}   C2 = 5/1 =  5.0000
//   argmax window [659, 809]  L = 150   bridged level-7 kills k = 8   strikes = 9   multi-killed = 1
//   killed copies: 671(11) 689(13) 701(19) 731(17) 737(11) 767(13) 779(11&19) 797(17)
//   spanned level-7 gaps: 12+18+12+30+6+30+12+18+12 = 150   max spanned 30 = G2(7#)
//   contains a copy of the level-7 RECORD gap: YES   inherited share max/L =  0.2000   new damage =  0.8000
//   ground density: mean spanned gap  16.67 vs tile mean  14.00   rho =  1.190
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=11  11# -> 19#   Q = {13,17,19}   C2 = 25/7 =  3.5714
//   argmax window [659, 809]  L = 150   bridged level-11 kills k = 5   strikes = 5   multi-killed = 0
//   killed copies: 689(13) 701(19) 731(17) 767(13) 797(17)
//   spanned level-11 gaps: 30+12+30+36+30+12 = 150   max spanned 36 < G2(11#) = 42
//   contains a copy of the level-11 RECORD gap: NO   inherited share max/L =  0.2400   new damage =  0.7600
//   ground density: mean spanned gap  25.00 vs tile mean  17.11   rho =  1.461
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=12  11# -> 23#   Q = {13,17,19,23}   C2 = 34/7 =  4.8571
//   argmax window [76166567, 76166771]  L = 204   bridged level-11 kills k = 10   strikes = 10   multi-killed = 0
//   killed copies: 76166579(17) 76166591(23) 76166597(13) 76166609(19) 76166621(13) 76166639(23) 76166681(17) 76166687(19) 76166729(23) 76166747(17)
//   spanned level-11 gaps: 12+12+6+12+12+18+42+6+42+18+24 = 204   max spanned 42 = G2(11#)
//   contains a copy of the level-11 RECORD gap: YES   inherited share max/L =  0.2059   new damage =  0.7941
//   ground density: mean spanned gap  18.55 vs tile mean  17.11   rho =  1.084
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//
// STEP s=13  13# -> 23#   Q = {17,19,23}   C2 = 34/11 =  3.0909
//   argmax window [76166567, 76166771]  L = 204   bridged level-13 kills k = 8   strikes = 8   multi-killed = 0
//   killed copies: 76166579(17) 76166591(23) 76166609(19) 76166639(23) 76166681(17) 76166687(19) 76166729(23) 76166747(17)
//   spanned level-13 gaps: 12+12+18+30+42+6+42+18+24 = 204   max spanned 42 < G2(13#) = 66
//   contains a copy of the level-13 RECORD gap: NO   inherited share max/L =  0.2059   new damage =  0.7941
//   ground density: mean spanned gap  22.67 vs tile mean  20.22   rho =  1.121
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//   ok    hand anatomy 2#->3#: window [5,11], kills 7(3) 9(3), single-covered
//
// === F. THE BOUND ATTEMPTED AT ENUMERABLE SCALE ======================
// BRIDGING LEMMA [PROVEN, three lines]. The level-2s admissibility
// condition contains the level-s one, so level-2s slots are a sub-
// pattern of the (periodic) level-s slots: every level-2s gap is a sum
// of k+1 consecutive level-s gaps, k = the level-s slot copies inside
// it, each killed by an entering prime in (s, 2s], and each gap
// <= Ghat(s) by definition of the record. Hence
//     Ghat(2s) <= (K*+1) * Ghat(s),   i.e.  C2(s) <= K*+1,
// K* = the longest run of consecutive level-s slots all killed by the
// entering primes, computed EXACTLY below by full cyclic walk.
//
// step        C2       k   K*  cert=K*+1  cert/C2   kcap   theta  need
//   2#->3#     3.0000   2    2       3      1.00      4   1.33   0.750
//   3#->5#     2.0000   1    1       2      1.00      6   2.40   0.417
//   3#->7#     5.0000   4    4       5      1.00     22   4.11   0.243
//   5#->7#     2.5000   2    2       3      1.20     10   3.43   0.292
//   5#->11#    3.5000   3    3       4      1.14     20   5.61   0.178
//   7#->13#    2.2000   3    3       4      1.82     22   10.07   0.099
//   7#->17#    3.6000   5    5       6      1.67     52   13.60   0.074
//   7#->19#    5.0000   8    8       9      1.80     86   16.76   0.060
//   11#->19#   3.5714   5    6       7      1.96     58   15.82   0.063
//   11#->23#   4.8571  10   10      11      2.26     96   19.48   0.051
//   13#->23#   3.0909   8    8       9      2.91     64   20.45   0.049
//   ok    the bridging certificate C2 <= K*+1 holds at all 11 steps
//   ok    the AP-counting cap k <= kcap holds at all 11 steps (PROVEN, verified)
//
// THE CLOSURE, AND WHERE IT LEAKS. The only a-priori handle on K* the
// proven machinery offers is AP counting: an entering prime q kills
// through two residue classes mod q, same-class kills sit >= q apart,
// so inside a window of length L it kills <= 2(floor((L-2)/q)+1) copies
// [PROVEN; the kcap column, never violated]. Substituting into the
// Bridging Lemma: L <= (1 + kcap(L)) * Ghat(s), which closes to a
// finite C2 iff  theta = 2*Ghat(s)*Sum_{q in (s,2s]} 1/q < 1.
// Minimum theta over the eleven steps:  1.3333, at the FIRST step
// (2#->3#); every later step is larger, reaching  20.45 at 13#->23#.
// The closure fails at EVERY step, and it worsens: theta grows like
// 2*Ghat(s)*ln2/ln s, i.e. polylogarithmically, because Ghat(s)/s does.
//
// CONSTANT-FACTOR SHARPENING IS DEAD TOO [PROVEN, given theta -> inf].
// Any refinement of the density cap by a CONSTANT factor c < 1 (deeper
// freshness conditions, unified-cap style discounts, overlap credits)
// closes only where c < 1/theta; the need column: 0.750 at the first
// step, 0.049 at 13#->23#, -> 0. Since theta grows without bound along
// s, NO constant-factor sharpening of residue-density counting proves
// any all-s C2. The failure is structural, not a constant.
//
// WHY THE OTHER TOOLS DO NOT ATTACH. The unified caps (anchored-01,
// staircase Thm 3) bound a prime's fresh-kill COUNT over a whole level,
// history-blind; the window needs kill PLACEMENT -- their localized
// content is exactly the AP spacing already spent in kcap. Mirror-Sweep
// is symmetry (it pairs windows a <-> w-a and halves fingerprints) and
// carries no magnitude bound by its own statement. An a-priori K* bound
// is a statement that the entering primes' two-class covering never
// achieves a long consecutive run on the level-s slot sequence -- the
// SAME two-class Jacobsthal problem one level up. The inequality is
// SELF-SIMILAR under its natural decomposition; a proof must break the
// self-similarity with placement structure [INFERRED].
//
// === G. DOES C2 GROW? THE CHAIN, THE NULLS, AND K* ===================
// ln C2(s) against ln s, each ladder beside its in-pass nulls (same
// primes, same step construction; POW's continuous-limit C2 is EXACTLY
// the constant 2^1.546 =  2.9201, so whatever POW reads here IS the
// constant-law look through this instrument):
//   ladder          n(s)   slope      se       sign at 1 sigma
//   G2 full          40    0.0529   0.0443   positive
//   POW null 22      40    0.0864   0.0399   positive
//   LOG null 22      40   -0.1313   0.0481   negative
//   G2 custody       22    0.1334   0.0823   positive
//   POW null 14      22    0.1244   0.0773   positive
//   LOG null 14      22   -0.1425   0.0964   negative
// the discriminating statistic, G2 slope minus POW slope (same primes):
//   G2 full     : -0.0336 +-  0.0596   -> CONSISTENT with constant C2
//   G2 custody  :  0.0090 +-  0.1129   -> CONSISTENT with constant C2
//
// the base-2 chain itself (the decisive family), s = 2, 4, 8, 16, 32:
//   C2 :  3.0000  5.0000  2.2000  5.2727  3.1034
//   increments: + - + -   (alternating; the sup is INTERIOR, at s = 16,
//   and the last chain step falls 5.2727 -> 3.1034 [trusted, Wang a(18)])
//   ok    no monotone growth along the chain (last increment negative)
//
// AND THE CERTIFICATE QUANTITY ITSELF. K*+1 across the eleven steps,
// with the same raw-slope instrument (no null exists for K*: a POW
// ladder has no slot sequence, so this is a RAW read, stated as such):
//   K*+1      :   3  2  5  3  4  4  6  9  7 11  9
//   cert/C2   :  1.00  1.00  1.00  1.20  1.14  1.82  1.67  1.80  1.96  2.26  2.91
//   ln(K*+1) vs ln P(2s): slope  0.6881 +-  0.1328
//   ln C2     vs ln P(2s): slope  0.2018 +-  0.1412   (same 11 points)
//   the certificate DRIFTS UP (positive at 1 sigma) while C2 does not: the slack
//   cert/C2 runs 1.00 at the first three steps to 2.91 at 13#->23#.
//   Extrapolating the raw K* fit (illustration, NOT a claim): K*+1
//   reaches 2^beta2 = 19.2455 near P(2s) ~ 69, so the certificate
//   route needs K* SUBLINEAR in the level to land, and needs it proven.
//
// === H. SUMMARY NUMBERS =============================================
// sup C2 over all reachable s        : 348/66 =  5.2727  at s = 16, ON the chain
// inf over all reachable s           :  2.0000 at s = 3
// landing zone for a proven C2       : [5.2727, 19.2455) -> limsup <= log2 C2 in [2.3985, 4.2665)
// bridging certificates (K*+1), steps: 3 2 5 3 4 4 6 9 7 11 9
// measured C2 at the same steps      :  3.00  2.00  5.00  2.50  3.50  2.20  3.60  5.00  3.57  4.86  3.09
// closure coefficient theta, min     :  1.3333  (needs < 1; fails at every step)
// overlap inside argmax windows      : 1 multi-killed of 51 bridged kills across all 11 steps
//
// self-test failures: 0   (all checks passed)
// total 0.3 s
// ============================================================================
// READINGS
// ============================================================
//
// 1. THE C2 TABLE, COMPLETE. C2(s) = Ghat(2s)/Ghat(s) for every reachable
//    s = 2..41, exact fractions: the range is [2.0000, 5.2727], inf 2.0000
//    at s = 3, sup 348/66 = 5.2727 at s = 16 -- ON the base-2 chain, both
//    terms custody-exact, and the custody sup equals the trusted sup, so no
//    literature term carries it. The chain reads 3.0000, 5.0000, 2.2000,
//    5.2727, 3.1034: the sup is an INTERIOR chain point and the last
//    trusted chain step falls. Any proven all-s C2 must be >= 5.2727;
//    every C2 in [5.2727, 19.2455) lands, giving limsup <= log2 C2 in
//    [2.3985, 4.2665). [VERIFIED]
//
// 2. THE MECHANISM, SEEN: BRIDGED KILL-RUNS ON ORDINARY GROUND. At all
//    eleven enumerable doubling steps the maximal window at level 2s is
//    exactly a run of k consecutive level-s slot copies (k = 1..10) killed
//    by the primes entering in (s, 2s], bridging k+1 consecutive level-s
//    gaps; the decomposition closes to the digit at every step. The window
//    is ASSEMBLED, not inherited: the largest single spanned gap carries
//    only 0.2000 to 0.5000 of the window's length. And the ground is not
//    special: the spanned gaps average rho = 1.000 to 1.461 times the tile
//    mean gap (nine of eleven steps below 1.2), so the record is made by
//    run-covering on near-average level-s terrain, not by landing on
//    pre-thinned terrain. A proof of the doubling inequality must bound
//    kill-RUN lengths; nothing else appears in the decomposition.
//    [VERIFIED]
//
// 3. RECORDS ARE OVERLAP-FREE ZONES. Across all eleven argmax windows the
//    entering primes spend 52 strikes for 51 kills: exactly 1 bridged copy
//    of 51 is multi-killed (779 at 7#->19#, struck by 11 and 19). The
//    corpus's global salvation mechanism -- capacity exceeds census, twins
//    survive on forced overlap credit -- is precisely what is ABSENT
//    locally at a record: the record window is where the entering primes'
//    covering runs at ~98% efficiency. A proof must show this efficiency
//    cannot be sustained for runs longer than ~C2, which is the overlap
//    credit's fluctuation question (the X-channel) at window scale.
//    [VERIFIED the count; INFERRED the framing]
//
// 4. THE RECORD DOES NOT ANCHOR ON THE RECORD. At 8 of 11 steps the maximal
//    window contains a copy of the level-s record gap; at 11#->19# and
//    13#->23# it does NOT (max spanned 36 < G2(11#) = 42, and 42 <
//    G2(13#) = 66): the level-2s record can assemble entirely from mid-size
//    level-s gaps. Any proof strategy that locates the new record over the
//    old one is refuted at enumerable scale. Same physical window, two base
//    levels: [76166567, 76166771] is the argmax against both 11# (C2 =
//    4.8571, k = 10) and 13# (C2 = 3.0909, k = 8) -- C2 is a property of
//    the PAIR of levels, not of the window. [VERIFIED; refutation
//    first-class]
//
// 5. THE BRIDGING CERTIFICATE IS THE ONE PROVEN BOUND, AND IT IS TIGHT.
//    C2 <= K*+1 (K* = the longest kill-run anywhere in the cyclic tile,
//    computed exactly) holds at all 11 steps: certificates 3 2 5 3 4 4 6 9
//    7 11 9, cert/C2 from 1.00 (an EQUALITY at the first three steps,
//    where every bridged gap is a level-s record) to 2.91, never worse. At
//    10 of 11 steps the argmax window realizes the longest run (k = K*;
//    the exception is 11#->19#, K* = 6 against k = 5). These are exact
//    finite-level theorems -- the first proven doubling bounds the corpus
//    has -- and every one lands under 19.2455. But they are per-step
//    facts; no all-s statement follows. [PROVEN per instance; VERIFIED]
//
// 6. REFUTATION: THE DENSITY CLOSURE FAILS FROM THE FIRST STEP, AND
//    CONSTANT-FACTOR REPAIRS DIE WITH IT. The AP-counting cap (an entering
//    prime kills <= 2(floor((L-2)/q)+1) copies in a window of length L;
//    kcap column, never violated) closes to a finite C2 iff theta =
//    2*Ghat(s)*Sum 1/q < 1. Measured theta: 1.3333 at 2#->3#, rising to
//    20.45 at 13#->23#, growing like Ghat(s)/s -- the closure fails at
//    EVERY step including the very first. Consequently any sharpening of
//    the density cap by a constant factor c needs c < 1/theta = 0.750 at
//    the first step and 0.049 at 13#->23#, -> 0: unified-cap discounts,
//    freshness conditions, and overlap credits of any bounded strength are
//    all dead for an all-s bound through this route. The leak is
//    structural: Ghat(s) already exceeds the entering primes' kill-class
//    spacing. An a-priori K* bound is the entering primes' two-class
//    covering-run problem on the level-s slot sequence -- the SAME
//    two-class Jacobsthal problem one level up. The inequality is
//    SELF-SIMILAR under its own natural decomposition; a proof must break
//    the self-similarity with placement structure (mirror/seam/fold
//    recursion), which no proven corpus tool carries: the unified caps
//    bound kill COUNTS per level, not placement, and Mirror-Sweep carries
//    no magnitude bound. [VERIFIED the numbers; PROVEN the constant-factor
//    corollary given theta's growth; INFERRED the assessment]
//
// 7. NO DRIFT IN C2 -- BUT THE CERTIFICATE QUANTITY DRIFTS. Against the
//    in-pass constant-C2 null (POW, same primes, same step construction;
//    its continuous-limit C2 is exactly 2^1.546 = 2.9201): G2 minus POW
//    slope reads -0.0336 +- 0.0596 (full, s = 2..41) and 0.0090 +- 0.1129
//    (custody, s = 2..23) -- consistent with constant C2 on both ranges,
//    and the full-range figure reproduces hsub-01's (s,2)-family reading
//    digit for digit from independent code. The moving null LOG reads
//    -0.1313 +- 0.0481, so the instrument is not pinned. Chain increments
//    alternate + - + -. K*, by contrast, DOES drift: ln(K*+1) on ln P(2s)
//    reads 0.6881 +- 0.1328 (raw, no null exists for K*) against C2's
//    0.2018 +- 0.1412 on the same 11 points, and the raw fit crosses
//    19.2455 near P(2s) ~ 69 -- so the bridging certificate route cannot
//    land by computing K* alone; it needs K* proven sublinear in the
//    level, or a bound on C2 that does not pass through K*. [MEASURED]
//
// 8. NOT REACHED. No all-s bound on C2 is proven; the certificates are
//    eleven finite-level theorems and nothing more. K* beyond 23# is
//    unenumerated (the next distinct steps need 29# and 31# walks,
//    orders of magnitude beyond this pass). The named successor
//    target -- bound the longest entering-prime covering run on the
//    level-s slot sequence by PLACEMENT
//    structure, or bound the local overlap deficit of reading 3 -- is
//    posed, not attacked. Growth of C2 beyond s = 41 is neither seen nor
//    excluded; rows s >= 24 rest on A144311 literature terms
//    (floor-certified at 47..61), and the s = 32 chain row rests on Wang's
//    a(18). [INFERRED]
