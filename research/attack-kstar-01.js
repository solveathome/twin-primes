// attack-kstar-01.js
//
// K*'S GROWTH: EXTEND THE LADDER, EXACTIFY THE HL FIRST MOMENT, AND TURN
// THE FIRST MOMENT INTO A PERIOD-FREE CERTIFICATE.
//
// THE QUESTION. attack-doubling-01 proved the Bridging Lemma C2 <= K*+1 at
// the eleven enumerable doubling steps and raised THE ALARM: the certificate
// quantity K* (the longest run of consecutive level-s slots all killed by
// the primes entering (s, 2s]) drifts up, raw slope 0.6881 +- 0.1328 in
// ln P(2s), crossing 2^beta2 = 19.2455 near P(2s) ~ 69 on the naive
// extrapolation -- but from ELEVEN points at small levels. Three moves:
//   (a) EXTEND THE DATA. The three next enumerable steps -- 13#->29#
//       (s = 15), 13#->31# (s = 16, ON the base-2 chain, the sup row), and
//       17#->31# (s = 17, 18) -- are walked in full (periods 6.47e9 and
//       2.006e11), re-deriving G2(29#) and G2(31#) with least argmax and
//       multiplicity against the exact ladder as the custody gate, and
//       reading K*, the record anatomy (bridged kills, rho, overlap) on
//       the way. 11 -> 14 points on the drift regression.
//   (b) THE HL ROUTE, MADE EXACT. A run of k consecutive level-s slots all
//       killed is a covering event of the entering primes' two kill classes
//       -- and its probability over the period is EXACTLY an alternating
//       sum of Hardy-Littlewood local products: for a window of slots
//       x_1..x_k, inclusion-exclusion over the subset J that SURVIVES gives
//           P(all k killed) = Sum_J (-1)^|J| Prod_q (1 - nu_q(J)/q),
//       nu_q(J) = #distinct residues of {x_j, x_j+2 : j in J} mod q -- the
//       same nu-case table as W1's twin-twin correlation (w1-singular-
//       series.md), at tuple size 2|J|, restricted to the entering primes.
//       Multiplying by M = Prod q and summing over the D_s tile shapes
//       yields an INTEGER: N_k = the exact number of all-killed k-windows
//       in one period, computed on the TILE ALONE, cost D_s * 2^k * |Q|,
//       independent of the period. So max{k : N_k >= 1} = K* exactly, and
//       N_{k} = 0 is a PROVEN finite-level certificate with no walk.
//       The smooth HL models (iid density product; pairwise singular-series
//       correction) are scored against the exact N_k to decide the growth
//       type: is the alarm's near-linear read structural or small-sample?
//   (c) THE BYPASS, PRICED. Because the count is period-free, the
//       certificate ladder extends past every scannable level: 19#->37#,
//       19#->41#, 19#->43# (periods 7.4e12 .. 6.1e14) and an attempt at
//       23#->43# under a deterministic op budget. Certificates C2 <= K*+1
//       at steps no walk can reach.
//
// HONEST DOUBT. Every new K* here is a finite-level fact; nothing below
// proves an all-s bound, and the growth-type verdict is a model fit over
// <= 18 points at P(2s) <= 43. The N_k route is exact integer arithmetic
// but shares the tile construction with the scan route; the scan route is
// validated against the exact ladder (G2, argmax, nmax at 29# and 31#),
// which is the independent anchor. The smooth models are approximations
// and are scored, not trusted. Pre-registration: the three scan steps'
// predicted K* (exact route) and the model crossings were committed alone
// in attack-kstar-01-prereg.md BEFORE the first period walk ran.
//
// CUSTODY. The 14 exact ladder terms (g, pos as BigInt literal, nmax) are
// PARSED from research/exact-g2-ladder.js; the A144311 column from
// research/import-interp-01-bgt-defect.js; cross-checked on the shared 14.
// The tiles are re-materialized by fold recursion to 23# and their G2 rows
// checked against the ladder (extending attack-doubling-01's fold path,
// which stopped at 13#). The eleven known steps' K* = 2,1,4,2,3,3,5,8,6,
// 10,8 are cross-references to attack-doubling-01.js's embedded table; the
// scan engine here must reproduce all eleven, then the I-E engine must
// reproduce the scan's full run-length census (every k, not just the max)
// at every step where both run.
//
// ARITHMETIC NOTE (width rule). Largest position touched: 31# =
// 200,560,490,130 ~ 2.0e11 < 2^53 (guarded). I-E terms are bounded by
// M <= 1.35e9 and partial sums by 2^k * M <= 8.9e13 < 2^53 (guarded per
// step). N_k totals and histogram counts are bounded by D*M <= 4.7e14
// < 2^53 (guarded). No shift operator is used on values wider than 2^30;
// subset masks stay below 2^25.
//
// usage: node research/attack-kstar-01.js
//        (full run ~ minutes; re-embed with
//         node research/qc/embed.js --timeout 900 research/attack-kstar-01.js)

'use strict';

const fs = require('fs');
const path = require('path');
const WID = require('./qc/widths');
const T0 = Date.now();
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '  n/a');
const pad = (s, n) => String(s).padStart(n);
const el = () => ((Date.now() - T0) / 1000).toFixed(1);
const note = (m) => process.stderr.write('[' + el() + 's] ' + m + '\n');
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
const ladRow = (x) => EXACT.find((e) => e.x === x);

console.log('=== A. CUSTODY ======================================================');
check('14 exact terms parsed (pos BigInt-guarded < 2^53)', EXACT.length === 14);
check('22 A144311 terms parsed', A144311.length === 22);
{
  let agree = true;
  for (let i = 0; i < 14; i++) agree = agree && EXACT[i].x === PR[i] && EXACT[i].g === G2FULL[i];
  check('exact ladder == A144311+1 on all 14 shared terms', agree);
}

// ------------------------------------------------------- B. tiles to 23#, fold path
// Fold recursion (kill r == 0, r == p-2 mod p). attack-doubling-01
// materialized tiles to 13#; here the same recursion is pushed to 23#
// (D_23 = 7,952,175 slots, W_23 = 223,092,870 < 2^31, Int32-safe) so that
// rows 17, 19, 23 of the ladder are re-derived by the FOLD path too, and
// the I-E engine has base tiles for 13, 17, 19, 23.
console.log('');
console.log('=== B. TILES TO 23# (fold recursion, ladder re-derived) =============');
const TILE = { 2: Int32Array.from([1]) };
const WIDTH = { 2: 2 };
const Dexp = (p) => PR.filter((q) => q >= 3 && q <= p).reduce((a, q) => a * (q - 2), 1);
for (const p of [3, 5, 7, 11, 13, 17, 19, 23]) {
  const prev = PR[PR.indexOf(p) - 1];
  const src = TILE[prev], W = WIDTH[prev];
  WID.assertFits('tile width W*p', W * p, Int32Array, 'p=' + p);
  const out = new Int32Array(src.length * (p - 2));
  let n = 0;
  for (let k = 0; k < p; k++) {
    const base = k * W;
    for (let i = 0; i < src.length; i++) {
      const pos = base + src[i], m = pos % p;
      if (m !== 0 && m !== p - 2) out[n++] = pos;
    }
  }
  if (n !== out.length) throw new Error('fold count mismatch at p=' + p);
  TILE[p] = out; WIDTH[p] = W * p;
}
function tileGaps(p) {  // cyclic max-gap scan: {g, least, nmax, starts}
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
for (const p of [3, 5, 7, 11, 13, 17, 19, 23]) {
  GAPS[p] = tileGaps(p);
  const row = ladRow(p);
  check('T_' + p + ' fold: D = ' + TILE[p].length + ', G2 = ' + GAPS[p].g + ' @ ' + GAPS[p].least + ' (x' + GAPS[p].nmax + ') == ladder',
    TILE[p].length === Dexp(p) && GAPS[p].g === row.g && GAPS[p].least === row.pos && GAPS[p].nmax === row.nmax);
  note('tile ' + p + '# done, D=' + TILE[p].length);
}

// ------------------------------------------------------- C. the scan engine
// Streaming kill-run walk over copies of the base tile. Never materializes
// the target level. Per copy: mark the entering primes' kills through
// residue buckets (CSR), then scan the D slots once with a copy-stamp
// array. Returns G2, least argmax a, nmax, alive, kAt (dead run at the
// argmax), K*, and the FULL dead-run-length census hist[] -- the
// instrument the I-E engine is checked against at every k.
const HMAX = 64;   // dead runs longer than this throw (guard, not clamp)
function scanStep(P, Pp) {
  const Q = PR.filter((q) => q > P && q <= Pp);
  const slots = TILE[P], W = WIDTH[P], D = slots.length;
  const M = Q.reduce((a, q) => a * q, 1);
  WID.assertFits('scan position range W*M', W * M, Float64Array, P + '#->' + Pp + '#');
  const WPp = W * M;
  // CSR buckets per entering prime: slot indices grouped by slots[i] mod q
  const BK = Q.map((q) => {
    const cnt = new Int32Array(q + 1);
    for (let i = 0; i < D; i++) cnt[(slots[i] % q) + 1]++;
    for (let r = 0; r < q; r++) cnt[r + 1] += cnt[r];
    const idx = new Int32Array(D), fill = cnt.slice(0, q);
    for (let i = 0; i < D; i++) { const r = slots[i] % q; idx[fill[r]++] = i; }
    return { q, start: cnt, idx, wmod: W % q, bm: 0 };
  });
  const stamp = new Int32Array(D).fill(-1);
  const hist = new Float64Array(HMAX + 1);
  let g = 0, a = -1, nmax = 0, kAt = -1, Kstar = 0;
  let run = 0, prevPos = -1, firstPos = -1, leadRun = 0, alive = 0;
  const NQ = BK.length;
  for (let c = 0; c < M; c++) {
    const base = c * W;
    for (let j = 0; j < NQ; j++) {
      const B = BK[j], q = B.q;
      let r1 = B.bm === 0 ? 0 : q - B.bm;          // (-base) mod q
      let r2 = r1 - 2; if (r2 < 0) r2 += q;        // (-base-2) mod q
      const st = B.start, ix = B.idx;
      for (let t = st[r1], e = st[r1 + 1]; t < e; t++) stamp[ix[t]] = c;
      for (let t = st[r2], e = st[r2 + 1]; t < e; t++) stamp[ix[t]] = c;
      B.bm += B.wmod; if (B.bm >= q) B.bm -= q;    // base mod q for next copy
    }
    for (let i = 0; i < D; i++) {
      if (stamp[i] === c) { run++; continue; }
      const pos = base + slots[i];
      alive++;
      if (prevPos < 0) { firstPos = pos; leadRun = run; }
      else {
        const d = pos - prevPos;
        if (d > g) { g = d; a = prevPos; nmax = 1; kAt = run; }
        else if (d === g) nmax++;
        if (run > Kstar) Kstar = run;
        if (run > HMAX) throw new Error('HMAX exceeded: run=' + run + ' at ' + P + '#->' + Pp + '#');
        hist[run]++;
      }
      run = 0; prevPos = pos;
    }
    if ((c & 0xFFFFF) === 0 && c > 0) note('scan ' + P + '#->' + Pp + '# copy ' + c + '/' + M);
  }
  { // cyclic wrap
    const d = firstPos + WPp - prevPos, wrapRun = run + leadRun;
    if (d > g) { g = d; a = prevPos; nmax = 1; kAt = wrapRun; }
    else if (d === g) nmax++;
    if (wrapRun > Kstar) Kstar = wrapRun;
    if (wrapRun > HMAX) throw new Error('HMAX exceeded at wrap: ' + wrapRun);
    hist[wrapRun]++;
  }
  return { P, Pp, Q, M, D, g, a, b: a + g, nmax, alive, kAt, Kstar, hist, WPp };
}
// census -> exact window count: N_k = Sum_{l>=k} (l-k+1) hist[l]
function histNk(hist, k) {
  let s = 0;
  for (let l = k; l <= HMAX; l++) s += (l - k + 1) * hist[l];
  return s;
}

// ------------------------------------------------------- D. the I-E engine
// Exact N_k on the tile alone. For each window shape i (k consecutive
// slots), N_k(i) = Sum over subsets J of the k slots of
// (-1)^|J| * Prod_q (q - nu_q(J)), nu_q(J) = #distinct residues of
// {x_j, x_j+2 : j in J} mod q. Gray-code walk, residues maintained by
// multiset counts. Integer-exact throughout (guards below). Shapes are
// pruned by monotonicity: N_{k+1}(i) > 0 needs N_k(i) > 0 and
// N_k(i+1) > 0. Deterministic subset budget; a skip is printed, never
// silent.
function nkCurve(P, Q, kmax, budget, wantPerShape) {
  const slots = TILE[P], W = WIDTH[P], D = slots.length;
  const M = Q.reduce((a, q) => a * q, 1);
  const NQ = Q.length;
  const res = { P, Q, M, D, kList: [], nList: [], Kstar: null, budgetHit: false, spent: 0 };
  let aliveFlag = new Uint8Array(D).fill(1);
  let aliveCount = D;
  const cnt = Q.map((q) => new Int32Array(q));
  const nu = new Int32Array(NQ);
  const rA = Q.map(() => new Int32Array(kmax));
  const rB = Q.map(() => new Int32Array(kmax));
  const inSet = new Uint8Array(kmax);
  for (let k = 1; k <= kmax; k++) {
    const pow = Math.pow(2, k);
    WID.assertFits('I-E partial-sum bound 2^k*M', pow * M, Float64Array, P + '# k=' + k);
    const cost = aliveCount * pow;
    if (res.spent + cost > budget) {
      res.budgetHit = true;
      console.log('  [budget] ' + P + '# |Q|=' + NQ + ' k=' + k + ' needs ' + cost.toExponential(2) +
        ' subsets on top of ' + res.spent.toExponential(2) + ' > budget ' + budget.toExponential(1) + ' -- stopped, deterministic');
      break;
    }
    res.spent += cost;
    let total = 0;
    const perShape = wantPerShape || k < kmax ? new Float64Array(D) : null;
    for (let i = 0; i < D; i++) {
      if (!aliveFlag[i]) continue;
      // window setup: absolute positions; the wrap adds W per full turn of
      // the tile (a k-window can lap a tiny tile more than once, e.g. D = 1)
      for (let j = 0; j < k; j++) {
        const ij = i + j, x = slots[ij % D] + W * Math.floor(ij / D);
        for (let u = 0; u < NQ; u++) {
          const q = Q[u];
          rA[u][j] = x % q;
          const rb = rA[u][j] + 2;
          rB[u][j] = rb >= q ? rb - q : rb;
        }
      }
      // Gray walk over the 2^k survivor subsets; empty set term = M
      let acc = M, size = 0;
      for (let m = 1; m < pow; m++) {
        let j = 0, mm = m;
        while ((mm & 1) === 0) { mm = mm / 2; j++; }   // toggled element (no >> on wide values; m < 2^25)
        if (inSet[j] === 0) {
          inSet[j] = 1; size++;
          for (let u = 0; u < NQ; u++) {
            const cu = cnt[u];
            if (cu[rA[u][j]]++ === 0) nu[u]++;
            if (cu[rB[u][j]]++ === 0) nu[u]++;
          }
        } else {
          inSet[j] = 0; size--;
          for (let u = 0; u < NQ; u++) {
            const cu = cnt[u];
            if (--cu[rA[u][j]] === 0) nu[u]--;
            if (--cu[rB[u][j]] === 0) nu[u]--;
          }
        }
        let prod = 1;
        for (let u = 0; u < NQ; u++) prod *= Q[u] - nu[u];
        acc += (size & 1) === 1 ? -prod : prod;
      }
      // walk ends at the Gray code of 2^k - 1; clear state for next shape
      for (let j = 0; j < k; j++) if (inSet[j]) {
        inSet[j] = 0;
        for (let u = 0; u < NQ; u++) {
          const cu = cnt[u];
          if (--cu[rA[u][j]] === 0) nu[u]--;
          if (--cu[rB[u][j]] === 0) nu[u]--;
        }
      }
      if (acc < 0 || acc > M) throw new Error('I-E out of range: shape ' + i + ' k=' + k + ' acc=' + acc);
      if (perShape) perShape[i] = acc;
      total += acc;
    }
    res.kList.push(k); res.nList.push(total);
    if (total === 0) { res.Kstar = k - 1; break; }
    // prune for k+1
    if (perShape) {
      const next = new Uint8Array(D);
      let na = 0;
      for (let i = 0; i < D; i++) {
        const i1 = i + 1 < D ? i + 1 : 0;
        if (perShape[i] > 0 && perShape[i1] > 0) { next[i] = 1; na++; }
      }
      aliveFlag = next; aliveCount = na;
    }
    note('I-E ' + P + '# |Q|=' + NQ + ' k=' + k + ' N_k=' + total + ' alive=' + aliveCount);
    if (aliveCount === 0) {
      // every shape with N_k > 0 has a dead neighbour, so no (k+1)-window
      // can be all-killed: N_{k+1} = 0 follows without computing it.
      res.kList.push(k + 1); res.nList.push(0); res.Kstar = k; break;
    }
  }
  return res;
}

// ------------------------------------------------------- E. validation on the 11 known steps
console.log('');
console.log('=== C/D. ENGINE VALIDATION: THE ELEVEN KNOWN STEPS ==================');
console.log('Scan engine (independent code: bucket-mark + stamp, not the walkStep');
console.log('of attack-doubling-01) must reproduce G2/argmax/nmax/alive from the');
console.log('ladder and K* from the published table; the I-E engine must then');
console.log('reproduce the scan\'s full run census at EVERY k (N_k identity).');
const KNOWN = [
  { P: 2, Pp: 3, Kpub: 2 },  { P: 3, Pp: 5, Kpub: 1 },  { P: 3, Pp: 7, Kpub: 4 },
  { P: 5, Pp: 7, Kpub: 2 },  { P: 5, Pp: 11, Kpub: 3 }, { P: 7, Pp: 13, Kpub: 3 },
  { P: 7, Pp: 17, Kpub: 5 }, { P: 7, Pp: 19, Kpub: 8 }, { P: 11, Pp: 19, Kpub: 6 },
  { P: 11, Pp: 23, Kpub: 10 }, { P: 13, Pp: 23, Kpub: 8 },
];
const VAL = [];
for (const st of KNOWN) {
  const w = scanStep(st.P, st.Pp);
  VAL.push(w);
  const row = ladRow(st.Pp);
  check('scan ' + st.P + '#->' + st.Pp + '#: G2 = ' + w.g + ' @ ' + w.a + ' (x' + w.nmax + '), K* = ' + w.Kstar,
    w.g === row.g && w.a === row.pos && w.nmax === row.nmax && w.alive === Dexp(st.Pp) && w.Kstar === st.Kpub);
}
{
  let allNk = true, checkedK = 0;
  for (const w of VAL) {
    const ie = nkCurve(w.P, w.Q, w.Kstar + 1, 1e9, false);
    const okK = ie.Kstar === w.Kstar;
    let okN = true;
    for (let t = 0; t < ie.kList.length; t++) {
      const k = ie.kList[t];
      if (ie.nList[t] !== histNk(w.hist, k)) okN = false;
      checkedK++;
    }
    allNk = allNk && okK && okN;
    if (!okK || !okN) console.log('  I-E mismatch at ' + w.P + '#->' + w.Pp + '#');
  }
  check('I-E N_k == scan census at every k, and K*_IE == K*_scan, all 11 steps (' + checkedK + ' (step,k) cells)', allNk);
}
{ // the HL language check: nu_q on a pair is W1's case table (q|d, q|d+-2)
  let ok = true, tested = 0;
  for (const q of [17, 19, 23, 29, 31]) {
    for (let d = 4; d <= 120; d += 2) {
      const set = new Set([0 % q, 2 % q, d % q, (d + 2) % q]);
      const cases = 4 - (d % q === 0 ? 2 : 0) - (d % q === 2 ? 1 : 0) - ((d + 2) % q === 0 ? 1 : 0);
      if (set.size !== cases) ok = false;
      tested++;
    }
  }
  check('nu-case identity on pairs: nu = 4 - 2[q|d] - [q|d-2] - [q|d+2] (' + tested + ' cells) -- W1\'s table, one level up', ok);
}
console.log('(the I-E engine is the HL k-tuple first moment made exact: each');
console.log(' subset term Prod_q(1 - nu_q(J)/q) is the singular-series local');
console.log(' product of the 2|J|-tuple {x_j, x_j+2}, truncated to the entering');
console.log(' primes -- the w1-singular-series identification, one level up.)');

// ------------------------------------------------------- E. the smooth HL models
// M0 (iid): every slot killed independently with probability
//   p1 = 1 - Prod_{q in Q} (1 - 2/q); N_k = D*M*p1^k.
// M1 (pairwise singular series): per shape, the Kirkwood superposition
//   N_k(i) = M * p1^k * Prod_{j<j'} R(d_{jj'}), R the exact pair
//   correlation P(A_j & A_j')/p1^2 with P(A&A') = 1 - 2*sigma +
//   Prod_q (1 - nu_q(pair)/q) -- the 4-tuple HL local product. Everything
//   beyond pairs is what M1 does NOT know; its miss measures the
//   higher-order rigidity of the covering.
function models(P, Q, kmax) {
  const slots = TILE[P], W = WIDTH[P], D = slots.length;
  const M = Q.reduce((a, q) => a * q, 1);
  const sigma = Q.reduce((a, q) => a * (1 - 2 / q), 1);
  const p1 = 1 - sigma;
  const lnP1 = Math.log(p1);
  const k0 = Math.log(D * M) / (-lnP1);          // M0 crossing, real
  // M1: incremental in k; lnT[i] = ln(N_k(i)/M)
  const lnT = new Float64Array(D);
  const xs = new Float64Array(kmax);             // window positions per shape, rolling
  const N1 = [];                                  // totals per k
  const lnR = (xa, xb) => {
    let prod = 1;
    for (const q of Q) {
      const s = new Set([xa % q, (xa + 2) % q, xb % q, (xb + 2) % q]);
      prod *= 1 - s.size / q;
    }
    const pab = 1 - 2 * sigma + prod;
    return pab <= 0 ? -Infinity : Math.log(pab) - 2 * lnP1;
  };
  for (let k = 1; k <= kmax; k++) {
    let tot = 0;
    for (let i = 0; i < D; i++) {
      const jn = i + k - 1, xn = slots[jn % D] + W * Math.floor(jn / D);
      let add = lnP1;
      for (let j = 0; j < k - 1; j++) {
        const ij = i + j, xj = slots[ij % D] + W * Math.floor(ij / D);
        add += lnR(xj, xn);
      }
      lnT[i] += add;
      tot += Math.exp(lnT[i]);
    }
    N1.push(tot * M);
  }
  const cross = (arr) => { let k = 0; for (let t = 0; t < arr.length; t++) if (arr[t] >= 1) k = t + 1; return k; };
  return { p1, k0, m1: N1, m1cross: cross(N1), M, D };
}

console.log('');
console.log('=== E. MODEL SCORECARD ON THE ELEVEN KNOWN STEPS ====================');
console.log('The HL first moment, three rungs: M0 iid crossing; M1 pairwise-');
console.log('corrected crossing; the exact K*. The M0-K* gap is the covering\'s');
console.log('rigidity; how much of it M1 recovers decides whether pair-level HL');
console.log('correlations explain the kill-run statistics.');
console.log('step        p1      ln(DM)   M0cross  M1cross  K*   M0-K*  M1-K*');
const SCORE = [];
for (const w of VAL) {
  const md = models(w.P, w.Q, Math.min(40, Math.ceil(Math.log(w.D * w.M) / (-Math.log(1 - w.Q.reduce((a, q) => a * (1 - 2 / q), 1)) + 1e-12)) + 8));
  SCORE.push({ w, md });
  console.log('  ' + (w.P + '#->' + w.Pp + '#').padEnd(10) + F(md.p1) + '  ' + F(Math.log(w.D * w.M), 2) + '   ' +
    F(md.k0, 2) + '  ' + pad(md.m1cross, 5) + '   ' + pad(w.Kstar, 3) + '  ' + F(md.k0 - w.Kstar, 2) + '  ' + pad(md.m1cross - w.Kstar, 4));
}
{
  const mo = SCORE.map((s) => s.md.k0 - s.w.Kstar);
  const m1 = SCORE.map((s) => s.md.m1cross - s.w.Kstar);
  const mean = (v) => v.reduce((a, b) => a + b, 0) / v.length;
  console.log('mean overshoot: M0 ' + F(mean(mo), 2) + '   M1 ' + F(mean(m1), 2) + '   (11 steps)');
  check('M1 tightens M0 at every step with |Q| >= 2', SCORE.filter((s) => s.w.Q.length >= 2).every((s) => s.md.m1cross <= s.md.k0));
}

// ------------------------------------------------------- F. predictions, new steps
// Everything in this section touches the TILE ONLY -- no period is walked.
// These numbers (with the models' crossings) are the pre-registered
// predictions of attack-kstar-01-prereg.md, committed before any scan ran.
console.log('');
console.log('=== F. THE NEW STEPS, PREDICTED (tile-only; pre-registered) =========');
const NEWSCAN = [
  { P: 13, Pp: 29, sList: [15] },
  { P: 13, Pp: 31, sList: [16], chain: true },
  { P: 17, Pp: 31, sList: [17, 18] },
];
const PRED = [];
for (const st of NEWSCAN) {
  const Q = PR.filter((q) => q > st.P && q <= st.Pp);
  const ie = nkCurve(st.P, Q, 26, 2e10, false);
  const md = models(st.P, Q, 26);
  PRED.push({ st, Q, ie, md });
  console.log('');
  console.log('STEP s=' + st.sList.join(',') + '  ' + st.P + '# -> ' + st.Pp + '#   Q = {' + Q.join(',') + '}' + (st.chain ? '   <== base-2 chain (the sup row s = 16)' : ''));
  console.log('  exact N_k (I-E, integer): k = ' + ie.kList.join(', '));
  console.log('                            N = ' + ie.nList.join(', '));
  console.log('  PREDICTED K* = ' + ie.Kstar + '   (cert C2 <= ' + (ie.Kstar + 1) + ')   M0 crossing ' + F(md.k0, 2) + '   M1 crossing ' + md.m1cross);
  check('N_k curve reached zero inside the budget (prediction is total)', ie.Kstar !== null);
}

// ------------------------------------------------------- G. the scans (the test)
// Full cyclic walks of the 29# and 31# periods (6.47e9 and 2.006e11).
// Custody gate: G2, least argmax and nmax must re-derive the exact ladder
// rows 29 and 31 from scratch. Prereg gate: K* and the ENTIRE run census
// must equal section F's tile-only predictions, cell for cell.
console.log('');
console.log('=== G. THE SCANS: 29# AND 31# WALKED, PREREG SCORED =================');
function anatomy(P, w) {
  const W = WIDTH[P], slots = TILE[P];
  const S = new Set(slots);
  const inner = [];
  for (let pos = w.a + 1; pos < w.b; pos++) {
    if (!S.has(((pos % W) + W) % W)) continue;
    const killers = w.Q.filter((q) => pos % q === 0 || pos % q === q - 2);
    inner.push({ pos, killers });
  }
  const chainPos = [w.a, ...inner.map((z) => z.pos), w.b];
  const gaps = [];
  for (let i = 0; i + 1 < chainPos.length; i++) gaps.push(chainPos[i + 1] - chainPos[i]);
  const maxSpan = Math.max(...gaps);
  const G2P = GAPS[P].g, starts = GAPS[P].starts;
  let hasRecordCopy = false;
  for (let i = 0; i + 1 < chainPos.length; i++)
    if (gaps[i] === G2P && starts.has(((chainPos[i] % W) + W) % W)) hasRecordCopy = true;
  const strikes = inner.reduce((x, z) => x + z.killers.length, 0);
  const multi = inner.filter((z) => z.killers.length >= 2).length;
  return { inner, gaps, maxSpan, G2P, hasRecordCopy, strikes, multi };
}
const RUNS = [];
for (let t = 0; t < NEWSCAN.length; t++) {
  const st = NEWSCAN[t], pr = PRED[t];
  const w = scanStep(st.P, st.Pp);
  w.sList = st.sList;
  RUNS.push(w);
  const row = ladRow(st.Pp);
  const A = anatomy(st.P, w);
  w.anat = A;
  const G2P = GAPS[st.P].g;
  const gq = gcd(w.g, G2P);
  const meanSpan = w.g / A.gaps.length, meanTile = WIDTH[st.P] / TILE[st.P].length;
  console.log('');
  console.log('STEP s=' + st.sList.join(',') + '  ' + st.P + '# -> ' + st.Pp + '#   Q = {' + w.Q.join(',') + '}   C2 = ' +
    (w.g / gq) + '/' + (G2P / gq) + ' = ' + F(w.g / G2P) + (st.chain ? '   <== chain' : ''));
  check('G2(' + st.Pp + '#) = ' + w.g + ' @ ' + w.a + ' (x' + w.nmax + '), alive = ' + w.alive + ' == ladder, from scratch',
    w.g === row.g && w.a === row.pos && w.nmax === row.nmax && w.alive === Dexp(st.Pp));
  check('K* = ' + w.Kstar + ' == tile-only prediction ' + pr.ie.Kstar + ' (PREREG)', w.Kstar === pr.ie.Kstar);
  {
    let okAll = true;
    for (let u = 0; u < pr.ie.kList.length; u++)
      if (histNk(w.hist, pr.ie.kList[u]) !== pr.ie.nList[u]) okAll = false;
    check('scan census == predicted N_k at every k = 1..' + pr.ie.kList[pr.ie.kList.length - 1] + ' (PREREG, ' + pr.ie.kList.length + ' cells)', okAll);
  }
  {
    const cen = [];
    for (let l = 1; l <= w.Kstar; l++) if (w.hist[l] > 0) cen.push(l + ':' + w.hist[l]);
    console.log('  maximal-run census (len:count): ' + cen.join('  '));
  }
  console.log('  argmax window [' + w.a + ', ' + w.b + ']  L = ' + w.g + '   bridged level-' + st.P + ' kills k = ' + A.inner.length +
    '   strikes = ' + A.strikes + '   multi-killed = ' + A.multi);
  console.log('  killed copies: ' + A.inner.map((z) => z.pos + '(' + z.killers.join('&') + ')').join(' '));
  console.log('  spanned level-' + st.P + ' gaps: ' + A.gaps.join('+') + ' = ' + A.gaps.reduce((x, y) => x + y, 0) +
    '   max spanned ' + A.maxSpan + (A.maxSpan === G2P ? ' = G2(' + st.P + '#)' : ' < G2(' + st.P + '#) = ' + G2P));
  console.log('  contains a copy of the level-' + st.P + ' RECORD gap: ' + (A.hasRecordCopy ? 'YES' : 'NO') +
    '   inherited share max/L = ' + F(A.maxSpan / w.g) + '   new damage = ' + F(1 - A.maxSpan / w.g));
  console.log('  ground density: mean spanned gap ' + F(meanSpan, 2) + ' vs tile mean ' + F(meanTile, 2) +
    '   rho = ' + F(meanSpan / meanTile, 3));
  console.log('  cert = K*+1 = ' + (w.Kstar + 1) + '   cert/C2 = ' + F((w.Kstar + 1) / (w.g / G2P), 2) +
    '   argmax realizes k = ' + A.inner.length + ' of K* = ' + w.Kstar);
  check('decomposition closes: sum of spanned gaps == L, k+1 gaps', A.gaps.reduce((x, y) => x + y, 0) === w.g && A.gaps.length === A.inner.length + 1);
  check('every bridged copy is killed by an ENTERING prime only', A.inner.every((z) => z.killers.length > 0));
  check('scan kAt (dead run at argmax) == anatomy k', w.kAt === A.inner.length);
}

// ------------------------------------------------------- H. past the scan horizon
// The I-E count is period-free, so the certificate ladder continues where
// no walk can go: 19#->37# (period 7.42e12) fully, 19#->41# under a
// deterministic subset budget. A certificate here is a PROVEN finite-level
// theorem resting on the I-E engine alone -- validated above at 14 steps
// against two scan engines (63 + 45 census cells).
console.log('');
console.log('=== H. CERTIFICATES PAST THE SCAN HORIZON (period-free) =============');
const FAR = [
  { P: 19, Pp: 37, sList: [19, 20], budget: 2.5e10 },
  { P: 19, Pp: 41, sList: [21], budget: 1.6e10 },
];
const FARRES = [];
for (const st of FAR) {
  const Q = PR.filter((q) => q > st.P && q <= st.Pp);
  const ie = nkCurve(st.P, Q, 30, st.budget, false);
  const md = models(st.P, Q, 30);
  FARRES.push({ st, Q, ie, md });
  console.log('');
  console.log('STEP s=' + st.sList.join(',') + '  ' + st.P + '# -> ' + st.Pp + '#   Q = {' + Q.join(',') + '}   period ' +
    (WIDTH[st.P] * ie.M).toExponential(3) + '   subsets spent ' + ie.spent.toExponential(2));
  console.log('  N_k: k = ' + ie.kList.join(', '));
  console.log('       N = ' + ie.nList.join(', '));
  if (ie.Kstar !== null) {
    const G2P = GAPS[st.P].g, g2t = ladRow(st.Pp) ? ladRow(st.Pp).g : null;
    const c2 = g2t ? g2t / G2P : null;
    console.log('  K* = ' + ie.Kstar + '  [PROVEN, I-E route]   cert C2 <= ' + (ie.Kstar + 1) +
      (c2 ? '   measured C2 = ' + g2t + '/' + G2P + ' = ' + F(c2) + '   cert/C2 = ' + F((ie.Kstar + 1) / c2, 2) : ''));
    console.log('  M0 crossing ' + F(md.k0, 2) + '   M1 crossing ' + md.m1cross);
    check('cert holds: C2 <= K*+1 at ' + st.P + '#->' + st.Pp + '#', c2 !== null && c2 <= ie.Kstar + 1);
  } else {
    console.log('  budget stop before N_k = 0: K* >= ' + ie.kList[ie.kList.length - 1] + ' (last computed N > 0); NOT certified');
  }
}

// ------------------------------------------------------- I. the drift, re-read
console.log('');
console.log('=== I. THE K* LADDER AT 14-16 POINTS: GROWTH TYPE ===================');
function ols(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0; for (let i = 0; i < n; i++) ss += (ys[i] - a - b * xs[i]) ** 2;
  return { a, b, se: Math.sqrt((ss / Math.max(1, n - 2)) / sxx) };
}
const LADDER = [];
for (let t = 0; t < KNOWN.length; t++) LADDER.push({ P: KNOWN[t].P, Pp: KNOWN[t].Pp, K: VAL[t].Kstar, src: 'scan' });
for (const w of RUNS) LADDER.push({ P: w.P, Pp: w.Pp, K: w.Kstar, src: 'scan' });
for (const fr of FARRES) if (fr.ie.Kstar !== null) LADDER.push({ P: fr.st.P, Pp: fr.st.Pp, K: fr.ie.Kstar, src: 'I-E' });
console.log('step         K*  cert  ln(DM)   Ieff=ln(DM)/K*   source');
for (const L of LADDER) {
  const D = TILE[L.P].length, M = PR.filter((q) => q > L.P && q <= L.Pp).reduce((a, q) => a * q, 1);
  L.lnDM = Math.log(D * M);
  L.Ieff = L.lnDM / L.K;
  console.log('  ' + (L.P + '#->' + L.Pp + '#').padEnd(10) + pad(L.K, 3) + '  ' + pad(L.K + 1, 3) + '  ' + F(L.lnDM, 2) + '     ' + F(L.Ieff, 3) + '        ' + L.src);
}
{
  const fit = (arr) => ols(arr.map((L) => Math.log(L.Pp)), arr.map((L) => Math.log(L.K + 1)));
  const f11 = fit(LADDER.slice(0, 11));
  const f14 = fit(LADDER.slice(0, 14));
  const fAll = fit(LADDER);
  console.log('');
  console.log('ln(K*+1) on ln P(2s), raw (no null exists for K*):');
  console.log('  11 points (the alarm)   : slope ' + F(f11.b) + ' +- ' + F(f11.se));
  console.log('  14 points (scans added) : slope ' + F(f14.b) + ' +- ' + F(f14.se));
  console.log('  ' + LADDER.length + ' points (I-E certs in): slope ' + F(fAll.b) + ' +- ' + F(fAll.se));
  check('11-point slope reproduces attack-doubling-01: 0.6881 +- 0.1328', Math.abs(f11.b - 0.6881) < 5e-4 && Math.abs(f11.se - 0.1328) < 5e-4, F(f11.b) + ' +- ' + F(f11.se));
  const fI = ols(LADDER.map((L) => Math.log(L.Pp)), LADDER.map((L) => L.Ieff));
  console.log('I_eff on ln P(2s): slope ' + F(fI.b) + ' +- ' + F(fI.se) + '  -- a LOG-type K* needs I_eff ~ P/ln P,');
  console.log('i.e. roughly x2 from P(2s) = 23 to 43; measured I_eff stays in [' +
    F(Math.min(...LADDER.map((L) => L.Ieff)), 2) + ', ' + F(Math.max(...LADDER.map((L) => L.Ieff)), 2) + '].');
  // the ceiling, read directly
  const over = LADDER.filter((L) => L.K + 1 > 19.2455);
  console.log('');
  console.log('THE CEILING, READ WITHOUT ANY FIT. cert = K*+1 against 2^beta2 = 19.2455:');
  console.log('  largest cert on the ladder: ' + Math.max(...LADDER.map((L) => L.K + 1)) + '  at ' +
    (() => { const L = LADDER.reduce((a, b) => (b.K > a.K ? b : a)); return L.P + '#->' + L.Pp + '#'; })());
  console.log('  certs above 19.2455 already: ' + (over.length ? over.map((L) => L.P + '#->' + L.Pp + '# (' + (L.K + 1) + ')').join(', ') : 'none'));
  // the next chain step under the model (ILLUSTRATION, not a claim): 31#->61#
  const Q61 = PR.filter((q) => q > 31 && q <= 61);
  const p61 = 1 - Q61.reduce((a, q) => a * (1 - 2 / q), 1);
  const lnDM61 = Math.log(Dexp(31)) + Q61.reduce((a, q) => a + Math.log(q), 0);   // no 2^53 product formed
  const k061 = lnDM61 / (-Math.log(p61));
  const rig = RUNS.map((w, i) => w.Kstar / PRED[i].md.k0);
  const rigLo = Math.min(...rig), rigHi = Math.max(...rig);
  console.log('  next chain step 31#->61# (|Q| = ' + Q61.length + ', period ~2.3e23, unscannable): M0 crossing ' + F(k061, 1));
  console.log('  x measured rigidity K*/M0 in [' + F(rigLo, 3) + ', ' + F(rigHi, 3) + '] (three new steps) -> model K* ~ ' +
    F(rigLo * k061, 1) + '..' + F(rigHi * k061, 1) + ', cert ~ ' + F(rigLo * k061 + 1, 1) + '..' + F(rigHi * k061 + 1, 1));
  console.log('  every value in that band is ABOVE 2^beta2 = 19.2455: under the HL model the');
  console.log('  bridging-certificate route is already dead at the very next chain step.');
}

// ------------------------------------------------------- J. summary
console.log('');
console.log('=== J. SUMMARY NUMBERS =============================================');
console.log('K* ladder (K*+1), all steps     : ' + LADDER.map((L) => L.K + 1).join(' '));
console.log('prereg score, exact route       : see PREREG checks above (all must be ok)');
console.log('prereg score, M1 model          : ' + PRED.map((p, i) => (p.md.m1cross - RUNS[i].Kstar >= 0 ? '+' : '') + (p.md.m1cross - RUNS[i].Kstar)).join(' ') + '  (crossing - K* at the three scan steps)');
console.log('G2(29#), G2(31#) re-derived     : from scratch, ladder-exact (section G checks)');
console.log('');
console.log('self-test failures: ' + FAILS + (FAILS ? '   <-- DO NOT TRUST THIS OUTPUT' : '   (all checks passed)'));
console.log('total ' + el() + ' s');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-kstar-01.js
//   invocation:  node research/attack-kstar-01.js
//   code-sha256: a3588b3c8ef624bfcd46f86b8d2f3aa3bdb61f9e550ea4781abb7ac22c786e4d
//   out-sha256:  2bfdf89dc371a3fd012fe36d3d2c01bb2092117a0fb858508d547742ffc7444c
//   body-lines:  184
//   inputs:      research/qc/widths.js@9bcca510a863 research/exact-g2-ladder.js@999d2c5fa3ab research/import-interp-01-bgt-defect.js@20ad0a1961c8
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     345.0 s
// ============================================================================
// === A. CUSTODY ======================================================
//   ok    14 exact terms parsed (pos BigInt-guarded < 2^53)
//   ok    22 A144311 terms parsed
//   ok    exact ladder == A144311+1 on all 14 shared terms
//
// === B. TILES TO 23# (fold recursion, ladder re-derived) =============
//   ok    T_3 fold: D = 1, G2 = 6 @ 5 (x1) == ladder
//   ok    T_5 fold: D = 3, G2 = 12 @ 17 (x2) == ladder
//   ok    T_7 fold: D = 15, G2 = 30 @ 71 (x2) == ladder
//   ok    T_11 fold: D = 135, G2 = 42 @ 899 (x4) == ladder
//   ok    T_13 fold: D = 1485, G2 = 66 @ 731 (x12) == ladder
//   ok    T_17 fold: D = 22275, G2 = 108 @ 701 (x20) == ladder
//   ok    T_19 fold: D = 378675, G2 = 150 @ 659 (x20) == ladder
//   ok    T_23 fold: D = 7952175, G2 = 204 @ 76166567 (x4) == ladder
//
// === C/D. ENGINE VALIDATION: THE ELEVEN KNOWN STEPS ==================
// Scan engine (independent code: bucket-mark + stamp, not the walkStep
// of attack-doubling-01) must reproduce G2/argmax/nmax/alive from the
// ladder and K* from the published table; the I-E engine must then
// reproduce the scan's full run census at EVERY k (N_k identity).
//   ok    scan 2#->3#: G2 = 6 @ 5 (x1), K* = 2
//   ok    scan 3#->5#: G2 = 12 @ 17 (x2), K* = 1
//   ok    scan 3#->7#: G2 = 30 @ 71 (x2), K* = 4
//   ok    scan 5#->7#: G2 = 30 @ 71 (x2), K* = 2
//   ok    scan 5#->11#: G2 = 42 @ 899 (x4), K* = 3
//   ok    scan 7#->13#: G2 = 66 @ 731 (x12), K* = 3
//   ok    scan 7#->17#: G2 = 108 @ 701 (x20), K* = 5
//   ok    scan 7#->19#: G2 = 150 @ 659 (x20), K* = 8
//   ok    scan 11#->19#: G2 = 150 @ 659 (x20), K* = 6
//   ok    scan 11#->23#: G2 = 204 @ 76166567 (x4), K* = 10
//   ok    scan 13#->23#: G2 = 204 @ 76166567 (x4), K* = 8
//   ok    I-E N_k == scan census at every k, and K*_IE == K*_scan, all 11 steps (63 (step,k) cells)
//   ok    nu-case identity on pairs: nu = 4 - 2[q|d] - [q|d-2] - [q|d+2] (295 cells) -- W1's table, one level up
// (the I-E engine is the HL k-tuple first moment made exact: each
//  subset term Prod_q(1 - nu_q(J)/q) is the singular-series local
//  product of the 2|J|-tuple {x_j, x_j+2}, truncated to the entering
//  primes -- the w1-singular-series identification, one level up.)
//
// === E. MODEL SCORECARD ON THE ELEVEN KNOWN STEPS ====================
// The HL first moment, three rungs: M0 iid crossing; M1 pairwise-
// corrected crossing; the exact K*. The M0-K* gap is the covering's
// rigidity; how much of it M1 recovers decides whether pair-level HL
// correlations explain the kill-run statistics.
// step        p1      ln(DM)   M0cross  M1cross  K*   M0-K*  M1-K*
//   2#->3#     0.6667   1.10    2.71      1     2   0.71    -1
//   3#->5#     0.4000   1.61    1.76      1     1   0.76     0
//   3#->7#     0.5714   3.56    6.35      4     4   2.35     0
//   5#->7#     0.2857   3.04    2.43      2     2   0.43     0
//   5#->11#    0.4156   5.44    6.20      5     3   3.20     2
//   7#->13#    0.3077   7.67    6.51      4     3   3.51     1
//   7#->17#    0.3891   10.50    11.13      7     5   6.13     2
//   7#->19#    0.4534   13.45    17.00     11     8   9.00     3
//   11#->19#   0.3320   13.25    12.01      7     6   6.01     1
//   11#->23#   0.3901   16.38    17.40     12    10   7.40     2
//   13#->23#   0.2792   16.22    12.71      9     8   4.71     1
// mean overshoot: M0  4.02   M1  1.00   (11 steps)
//   ok    M1 tightens M0 at every step with |Q| >= 2
//
// === F. THE NEW STEPS, PREDICTED (tile-only; pre-registered) =========
//
// STEP s=15  13# -> 29#   Q = {17,19,23,29}
//   exact N_k (I-E, integer): k = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
//                             N = 105221160, 29114520, 6942634, 1470674, 285422, 52048, 9456, 1712, 270, 36, 0
//   PREDICTED K* = 10   (cert C2 <= 11)   M0 crossing  17.61   M1 crossing 12
//   ok    N_k curve reached zero inside the budget (prediction is total)
//
// STEP s=16  13# -> 31#   Q = {17,19,23,29,31}   <== base-2 chain (the sup row s = 16)
//   exact N_k (I-E, integer): k = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
//                             N = 3691273410, 1208132640, 357506328, 98048374, 25570726, 6426266, 1601992, 403958, 103170, 25738, 5568, 1180, 296, 80, 18, 6, 2, 0
//   PREDICTED K* = 17   (cert C2 <= 18)   M0 crossing  23.29   M1 crossing 16
//   ok    N_k curve reached zero inside the budget (prediction is total)
//
// STEP s=17,18  17# -> 31#   Q = {19,23,29,31}
//   exact N_k (I-E, integer): k = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
//                             N = 2524470300, 607806150, 128515868, 25793636, 5037414, 929548, 167144, 29148, 4894, 710, 138, 22, 6, 0
//   PREDICTED K* = 13   (cert C2 <= 14)   M0 crossing  18.42   M1 crossing 13
//   ok    N_k curve reached zero inside the budget (prediction is total)
//
// === G. THE SCANS: 29# AND 31# WALKED, PREREG SCORED =================
//
// STEP s=15  13# -> 29#   Q = {17,19,23,29}   C2 = 43/11 =  3.9091
//   ok    G2(29#) = 258 @ 1205437109 (x2), alive = 214708725 == ladder, from scratch
//   ok    K* = 10 == tile-only prediction 10 (PREREG)
//   ok    scan census == predicted N_k at every k = 1..11 (PREREG, 11 cells)
//   maximal-run census (len:count): 1:53934754  2:16699926  3:4286708  4:951878  5:190782  6:34848  7:6302  8:1208  9:198  10:36
//   argmax window [1205437109, 1205437367]  L = 258   bridged level-13 kills k = 10   strikes = 10   multi-killed = 0
//   killed copies: 1205437139(17) 1205437151(23) 1205437157(19) 1205437169(29) 1205437199(23) 1205437229(29) 1205437241(17) 1205437271(19) 1205437307(17) 1205437349(19)
//   spanned level-13 gaps: 30+12+6+12+30+30+12+30+36+42+18 = 258   max spanned 42 < G2(13#) = 66
//   contains a copy of the level-13 RECORD gap: NO   inherited share max/L =  0.1628   new damage =  0.8372
//   ground density: mean spanned gap  23.45 vs tile mean  20.22   rho =  1.160
//   cert = K*+1 = 11   cert/C2 =  2.81   argmax realizes k = 10 of K* = 10
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//   ok    scan kAt (dead run at argmax) == anatomy k
//
// STEP s=16  13# -> 31#   Q = {17,19,23,29,31}   C2 = 58/11 =  5.2727   <== chain
//   ok    G2(31#) = 348 @ 8813641451 (x4), alive = 6226553025 == ladder, from scratch
//   ok    K* = 17 == tile-only prediction 17 (PREREG)
//   ok    scan census == predicted N_k at every k = 1..18 (PREREG, 18 cells)
//   maximal-run census (len:count): 1:1632514458  2:591168358  3:186980306  4:53333188  5:14320186  6:3626240  7:897246  8:223356  9:57262  10:15782  11:3504  12:668  13:154  14:50  15:8  16:2  17:2
//   argmax window [8813641451, 8813641799]  L = 348   bridged level-13 kills k = 14   strikes = 15   multi-killed = 1
//   killed copies: 8813641469(23) 8813641481(17) 8813641511(19) 8813641517(17&29) 8813641547(19) 8813641559(23) 8813641589(31) 8813641607(23) 8813641619(17) 8813641631(29) 8813641649(31) 8813641691(29) 8813641721(17) 8813641787(17)
//   spanned level-13 gaps: 18+12+30+6+30+12+30+18+12+12+18+42+30+66+12 = 348   max spanned 66 = G2(13#)
//   contains a copy of the level-13 RECORD gap: YES   inherited share max/L =  0.1897   new damage =  0.8103
//   ground density: mean spanned gap  23.20 vs tile mean  20.22   rho =  1.147
//   cert = K*+1 = 18   cert/C2 =  3.41   argmax realizes k = 14 of K* = 17
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//   ok    scan kAt (dead run at argmax) == anatomy k
//
// STEP s=17,18  17# -> 31#   Q = {19,23,29,31}   C2 = 29/9 =  3.2222
//   ok    G2(31#) = 348 @ 8813641451 (x4), alive = 6226553025 == ladder, from scratch
//   ok    K* = 13 == tile-only prediction 13 (PREREG)
//   ok    scan census == predicted N_k at every k = 1..14 (PREREG, 14 cells)
//   maximal-run census (len:count): 1:1437373868  2:376568050  3:81966010  4:16648356  5:3345462  6:624408  7:113742  8:20070  9:3612  10:456  11:100  12:10  13:6
//   argmax window [8813641451, 8813641799]  L = 348   bridged level-17 kills k = 9   strikes = 9   multi-killed = 0
//   killed copies: 8813641469(23) 8813641511(19) 8813641547(19) 8813641559(23) 8813641589(31) 8813641607(23) 8813641631(29) 8813641649(31) 8813641691(29)
//   spanned level-17 gaps: 18+42+36+12+30+18+24+18+42+108 = 348   max spanned 108 = G2(17#)
//   contains a copy of the level-17 RECORD gap: YES   inherited share max/L =  0.3103   new damage =  0.6897
//   ground density: mean spanned gap  34.80 vs tile mean  22.92   rho =  1.518
//   cert = K*+1 = 14   cert/C2 =  4.34   argmax realizes k = 9 of K* = 13
//   ok    decomposition closes: sum of spanned gaps == L, k+1 gaps
//   ok    every bridged copy is killed by an ENTERING prime only
//   ok    scan kAt (dead run at argmax) == anatomy k
//
// === H. CERTIFICATES PAST THE SCAN HORIZON (period-free) =============
//
// STEP s=19,20  19# -> 37#   Q = {23,29,31,37}   period 7.421e+12   subsets spent 1.44e+8
//   N_k: k = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
//        N = 71775574200, 14726572962, 2741100756, 507878268, 92290916, 15643066, 2562766, 419752, 72170, 13384, 2254, 324, 34, 0
//   K* = 13  [PROVEN, I-E route]   cert C2 <= 14   measured C2 = 528/150 =  3.5200   cert/C2 =  3.98
//   M0 crossing  18.91   M1 crossing 14
//   ok    cert holds: C2 <= K*+1 at 19#->37#
//
// STEP s=21  19# -> 41#   Q = {23,29,31,37,41}   period 3.043e+14   subsets spent 1.04e+9
//   N_k: k = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
//        N = 3378657253950, 832252974594, 188967848020, 42211770332, 9321139516, 1969952544, 401598960, 79792252, 15585882, 3039620, 562016, 92018, 12550, 1214, 88, 8, 0
//   K* = 16  [PROVEN, I-E route]   cert C2 <= 17   measured C2 = 546/150 =  3.6400   cert/C2 =  4.67
//   M0 crossing  23.95   M1 crossing 17
//   ok    cert holds: C2 <= K*+1 at 19#->41#
//
// === I. THE K* LADDER AT 14-16 POINTS: GROWTH TYPE ===================
// step         K*  cert  ln(DM)   Ieff=ln(DM)/K*   source
//   2#->3#      2    3   1.10      0.549        scan
//   3#->5#      1    2   1.61      1.609        scan
//   3#->7#      4    5   3.56      0.889        scan
//   5#->7#      2    3   3.04      1.522        scan
//   5#->11#     3    4   5.44      1.814        scan
//   7#->13#     3    4   7.67      2.557        scan
//   7#->17#     5    6   10.50      2.101        scan
//   7#->19#     8    9   13.45      1.681        scan
//   11#->19#    6    7   13.25      2.208        scan
//   11#->23#   10   11   16.38      1.638        scan
//   13#->23#    8    9   16.22      2.027        scan
//   13#->29#   10   11   19.58      1.958        scan
//   13#->31#   17   18   23.02      1.354        scan
//   17#->31#   13   14   22.89      1.761        scan
//   19#->37#   13   14   26.39      2.030        I-E
//   19#->41#   16   17   30.11      1.882        I-E
//
// ln(K*+1) on ln P(2s), raw (no null exists for K*):
//   11 points (the alarm)   : slope  0.6881 +-  0.1328
//   14 points (scans added) : slope  0.8041 +-  0.1098
//   16 points (I-E certs in): slope  0.8184 +-  0.0908
//   ok    11-point slope reproduces attack-doubling-01: 0.6881 +- 0.1328    0.6881 +-  0.1328
// I_eff on ln P(2s): slope  0.3676 +-  0.1400  -- a LOG-type K* needs I_eff ~ P/ln P,
// i.e. roughly x2 from P(2s) = 23 to 43; measured I_eff stays in [ 0.55,  2.56].
//
// THE CEILING, READ WITHOUT ANY FIT. cert = K*+1 against 2^beta2 = 19.2455:
//   largest cert on the ladder: 18  at 13#->31#
//   certs above 19.2455 already: none
//   next chain step 31#->61# (|Q| = 7, period ~2.3e23, unscannable): M0 crossing  37.0
//   x measured rigidity K*/M0 in [ 0.568,  0.730] (three new steps) -> model K* ~  21.0.. 27.0, cert ~  22.0.. 28.0
//   every value in that band is ABOVE 2^beta2 = 19.2455: under the HL model the
//   bridging-certificate route is already dead at the very next chain step.
//
// === J. SUMMARY NUMBERS =============================================
// K* ladder (K*+1), all steps     : 3 2 5 3 4 4 6 9 7 11 9 11 18 14 14 17
// prereg score, exact route       : see PREREG checks above (all must be ok)
// prereg score, M1 model          : +2 -1 +0  (crossing - K* at the three scan steps)
// G2(29#), G2(31#) re-derived     : from scratch, ladder-exact (section G checks)
//
// self-test failures: 0   (all checks passed)
// total 344.9 s
// ============================================================================
// READINGS
// ============================================================
//
// 1. THE LADDER, 11 -> 16 STEPS. Three full period walks (13#->29#,
//    13#->31#, 17#->31#) and two period-free certificates (19#->37#,
//    19#->41#). The custody gate held everywhere: G2(29#) = 258 @
//    1205437109 (x2) and G2(31#) = 348 @ 8813641451 (x4) re-derived from
//    scratch against the exact ladder, alive counts exact, and the
//    fold-recursion path extended to 23# re-derives rows 17, 19, 23 by a
//    second path. The certificate column now reads
//    3 2 5 3 4 4 6 9 7 11 9 11 18 14 14 17. [VERIFIED]
//
// 2. THE HL FIRST MOMENT IS EXACT AND PERIOD-FREE HERE. N_k -- the number
//    of all-killed k-windows of consecutive level-s slots per period -- is
//    an alternating sum of Hardy-Littlewood local products over the tile:
//    nu on pairs is W1's case table (295 cells checked), and the I-E
//    engine reproduces the scan's run census at EVERY k at all 14 scanned
//    steps (63 (step,k) cells at the eleven known steps, then 11 + 18 + 14
//    more at the new three). So K* = max{k : N_k >= 1} exactly, and
//    N_k = 0 is a proven finite-level certificate whose cost is
//    tile-times-2^k, independent of the period. [PROVEN the identity;
//    VERIFIED the engines against each other everywhere both run]
//
// 3. THE PREREG HIT, CELL FOR CELL. Predicted from the tile alone before
//    any walk (attack-kstar-01-prereg.md, committed by itself): K* = 10,
//    17, 13 -- measured K* = 10, 17, 13, with every predicted N_k value
//    reproduced by the scans' censuses. The tile-only route and the walk
//    engines agree to the last integer. [VERIFIED]
//
// 4. THE CHAIN STEP'S CERTIFICATE IS 18. At s = 16 -- the base-2 chain
//    step, the sup row, C2 = 58/11 = 5.2727 -- the longest kill-run is
//    K* = 17, so the bridging certificate reads C2 <= 18 against the
//    ceiling 2^beta2 = 19.2455. The doubling report's extrapolated
//    crossing "near P(2s) ~ 69" was an 11-point artifact: the certificate
//    is nearly consumed already at P(2s) = 31. The slack cert/C2 widens
//    2.81, 3.41, 4.34, 3.98, 4.67 across the five new steps. [VERIFIED]
//
// 5. GROWTH TYPE: NEAR-LINEAR; THE ALARM IS STRUCTURAL, NOT SMALL-SAMPLE.
//    ln(K*+1) on ln P(2s): 0.6881 +- 0.1328 (11 points) -> 0.8041 +-
//    0.1098 (14) -> 0.8184 +- 0.0908 (16): the slope RISES with the new
//    data. The decisive instrument I_eff = ln(DM)/K* stays in
//    [0.55, 2.56] (raw trend 0.3676 +- 0.1400 per ln P), while a log-type
//    K* would need it to double per level; bounded I_eff against
//    linearly-growing ln(DM) forces near-linear K*. Under the model the
//    next chain step 31#->61# reads M0 crossing 37.0 with measured
//    rigidity K*/M0 in [0.568, 0.730], certificate band 22.0..28.0 --
//    every value above 19.2455. The certificate route is dead as a road
//    to any all-s C2 < 19.2455; C2 itself stays flat (the five new values
//    lie in 3.2222..5.2727). [MEASURED; the 31#->61# band is an
//    illustration, not a claim]
//
// 6. THE MODELS, SCORED. M0 (iid) overshoots K* by +4.02 mean on the
//    eleven known steps and misses the three new steps wide (crossings
//    17.61, 23.29, 18.42 against K* = 10, 17, 13); M1 (pairwise singular
//    series) overshoots +1.00 mean and lands +2 -1 +0 at the new steps --
//    inside its pre-registered +-2. The covering's rigidity is mostly
//    pair-level HL correlation; about one slot of higher-order rigidity
//    remains unmodeled. [MEASURED]
//
// 7. THE RECORD AND THE LONGEST RUN DECOUPLE. At 13#->29# the argmax
//    window realizes k = 10 of K* = 10; at 13#->31# only k = 14 of
//    K* = 17; at 17#->31# k = 9 of K* = 13 -- the longest covering run
//    and the record window separate as levels grow, which is the
//    certificate's widening slack made visible. Ground stays near-average
//    (rho = 1.160 and 1.147) except 17#->31# at rho = 1.518, a new
//    maximum; covering efficiency at records persists (strikes/kills
//    10/10, 15/14, 9/9); and the 13#->29# argmax contains NO copy of the
//    level-13 record gap (max spanned 42 < 66) -- the third
//    record-does-not-anchor instance. [MEASURED]
//
// 8. NOT REACHED. No all-s bound on C2 or K*; the near-linear verdict is
//    16 points plus model asymptotics, not a theorem. 19#->43# and the
//    base-23 steps are priced but not run; base 29 is out of I-E reach as
//    written; K*(31#->61#) exactly is out of reach both ways. 19#->41#'s
//    K* = 16 rests on the I-E route alone (no walk can check a 3.043e+14
//    period). The two maximal 17-runs at 13#->31# are predicted mirror
//    partners (Mirror-Sweep); unchecked. No analytic bound on the
//    alternating HL sum is attempted: the self-similarity named by
//    attack-doubling-01 stands; this pass moved the certificate's cost,
//    not the quantifier.
