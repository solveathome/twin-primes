'use strict';
// ============================================================================
// fdecay-deep 01 — the 42-point census is corrupted from x = 37 by a 32-bit
// shift, and here is the corrected diagonal
// ============================================================================
// `research/a3-03-f-from-census.js` evaluates count(d)/D by pruned inclusion-
// exclusion. Its avoided-set A_q is carried as a 32-BIT MASK, one bit per
// residue class mod q:
//
//     a[j] = (1 << (((-o) % q + q) % q)) | (1 << (((-o - 2) % q + q) % q));
//
// In JavaScript the shift count of `<<` is taken mod 32. For any prime q > 32
// the residues r and r + 32 therefore share a bit, |A_q| is read off as
// popcount of the aliased mask, and every factor (q - |A_q|) in the product is
// wrong whenever two avoided residues of that prime sit 32 apart.
//
// The signature is exact and it is not a fitted boundary: the tile T_x has a
// prime above 32 iff x >= 37. Below that the evaluator is correct — which is
// why the census's own verification (T_7..T_23 against direct sieving, and A2's
// streamed T_29 and T_31) passed, and why nothing caught this: every check the
// census ran lives at x <= 31.
//
// This script (a) exhibits the collision, (b) recomputes count(d_min)/D at every
// one of the 42 diagonal levels with a multi-word mask that has no aliasing,
// reproducing the published value exactly where x <= 31 and departing from it
// exactly where x >= 37, and (c) cross-checks the corrected values against an
// instrument with no inclusion-exclusion in it at all, the segmented window
// sieve of `fdecay-deep-00-core.js`. Two independent methods, one arithmetic
// and one empirical, against one published table.
//
// Recomputation of an embedded artifact is authorised here by the standing
// compute rule's flagged-defective exception, and by nothing else: the flag is
// the disagreement in §3, raised before any recomputation was run.
// ============================================================================

const C = require('./fdecay-deep-00-core.js');
const t00 = Date.now();
const el = () => ((Date.now() - t00) / 1000).toFixed(1);
const log = console.log;
const XW = Number(process.argv[2] || 2e9);        // window length for the cross-check
const XMAXLEVEL = Number(process.argv[3] || 199); // deepest level to recompute

function popcount(x) { x = x - ((x >> 1) & 0x55555555); x = (x & 0x33333333) + ((x >> 2) & 0x33333333); return (((x + (x >> 4)) & 0x0f0f0f0f) * 0x01010101) >> 24; }

// ---- the published evaluator, byte for byte from a3-03-f-from-census.js -----
function countRatioPublished(d, primes, budget = 4e9) {
  const odd = primes.filter(q => q >= 3), n = odd.length, Q = odd.slice();
  const bitCache = new Map();
  const bitsOf = o => { let a = bitCache.get(o); if (!a) { a = new Int32Array(n); for (let j = 0; j < n; j++) { const q = Q[j]; a[j] = (1 << (((-o) % q + q) % q)) | (1 << (((-o - 2) % q + q) % q)); } bitCache.set(o, a); } return a; };
  const ints = []; for (let m = 6; m < d; m += 6) ints.push(m);
  const depth = ints.length + 3;
  const masks = new Int32Array(n), saveM = new Int32Array(depth * n), savePr = new Float64Array(depth);
  let prod = 1, leaves = 0, nodes = 0, total = 0, aborted = false;
  function push(o, lvl) {
    const b = bitsOf(o), off = lvl * n; let pr2 = prod;
    for (let j = 0; j < n; j++) {
      const old = masks[j], nm = old | b[j], q = Q[j];
      saveM[off + j] = old;
      if (nm === old) continue;
      const pc = popcount(nm);
      if (pc === q) { for (let k = j; k >= 0; k--) masks[k] = saveM[off + k]; return false; }
      pr2 *= (q - pc) / (q - popcount(old)); masks[j] = nm;
    }
    savePr[lvl] = prod; prod = pr2; return true;
  }
  function pop(lvl) { const off = lvl * n; for (let j = 0; j < n; j++) masks[j] = saveM[off + j]; prod = savePr[lvl]; }
  let denAll = 1; for (let j = 0; j < n; j++) denAll *= Q[j] / (Q[j] - 2);
  if (!push(0, 0) || !push(d, 1)) return { ratio: 0, leaves: 0 };
  (function rec(i, sign) {
    if (aborted) return;
    if ((++nodes & 0x3fffff) === 0 && nodes > budget) { aborted = true; return; }
    if (i === ints.length) { total += sign * prod * denAll; leaves++; return; }
    rec(i + 1, sign);
    if (push(ints[i], i + 2)) { rec(i + 1, -sign); pop(i + 2); }
  })(0, 1);
  return { ratio: total, leaves, nodes, aborted };
}

// ---- the same inclusion-exclusion with a MULTI-WORD mask: no aliasing -------
// identical mathematics, identical pruning rule, ceil(q/32) words per prime and
// the avoided-set size carried as an integer instead of a popcount.
function countRatioFixed(d, primes, budget = 4e10) {
  const Q = primes.filter(q => q >= 3), n = Q.length;
  const offW = new Int32Array(n + 1);
  for (let j = 0; j < n; j++) offW[j + 1] = offW[j] + Math.ceil(Q[j] / 32);
  const TW = offW[n];
  const cache = new Map();
  const cellsOf = o => {            // per prime: the two (word, bit) cells it avoids
    let a = cache.get(o);
    if (!a) {
      a = { w: new Int32Array(2 * n), b: new Int32Array(2 * n) };
      for (let j = 0; j < n; j++) {
        const q = Q[j], r1 = ((-o) % q + q) % q, r2 = ((-o - 2) % q + q) % q;
        a.w[2 * j] = offW[j] + (r1 >> 5); a.b[2 * j] = 1 << (r1 & 31);
        a.w[2 * j + 1] = offW[j] + (r2 >> 5); a.b[2 * j + 1] = 1 << (r2 & 31);
      }
      cache.set(o, a);
    }
    return a;
  };
  const ints = []; for (let m = 6; m < d; m += 6) ints.push(m);
  const depth = ints.length + 3;
  const masks = new Int32Array(TW), cnt = new Int32Array(n);
  const undoW = new Int32Array(depth * 2 * n), undoB = new Int32Array(depth * 2 * n), undoN = new Int32Array(depth);
  const saveC = new Int32Array(depth * n), savePr = new Float64Array(depth);
  let prod = 1, leaves = 0, nodes = 0, total = 0, aborted = false;
  function push(o, lvl) {
    const a = cellsOf(o), uoff = lvl * 2 * n, coff = lvl * n; let u = 0, pr2 = prod;
    for (let j = 0; j < n; j++) {
      const q = Q[j], oldc = cnt[j]; let nc = oldc;
      for (let t = 2 * j; t <= 2 * j + 1; t++) {
        const w = a.w[t], b = a.b[t];
        if ((masks[w] & b) === 0) { masks[w] |= b; undoW[uoff + u] = w; undoB[uoff + u] = b; u++; nc++; }
      }
      saveC[coff + j] = oldc;
      if (nc === oldc) continue;
      if (nc === q) {
        for (let k = 0; k < u; k++) masks[undoW[uoff + k]] &= ~undoB[uoff + k];
        for (let k = 0; k <= j; k++) cnt[k] = saveC[coff + k];
        return false;
      }
      pr2 *= (q - nc) / (q - oldc); cnt[j] = nc;
    }
    undoN[lvl] = u; savePr[lvl] = prod; prod = pr2; return true;
  }
  function pop(lvl) {
    const uoff = lvl * 2 * n, coff = lvl * n;
    for (let k = 0; k < undoN[lvl]; k++) masks[undoW[uoff + k]] &= ~undoB[uoff + k];
    for (let j = 0; j < n; j++) cnt[j] = saveC[coff + j];
    prod = savePr[lvl];
  }
  let denAll = 1; for (let j = 0; j < n; j++) denAll *= Q[j] / (Q[j] - 2);
  if (!push(0, 0) || !push(d, 1)) return { ratio: 0, leaves: 0 };
  (function rec(i, sign) {
    if (aborted) return;
    if ((++nodes & 0x3fffff) === 0 && nodes > budget) { aborted = true; return; }
    if (i === ints.length) { total += sign * prod * denAll; leaves++; return; }
    rec(i + 1, sign);
    if (push(ints[i], i + 2)) { rec(i + 1, -sign); pop(i + 2); }
  })(0, 1);
  return { ratio: total, leaves, nodes, aborted };
}

const PR = C.primesUpTo(2000);
const nextPrime = x => PR.find(q => q > x);
const LEVELS = PR.filter(q => q >= 11 && q <= XMAXLEVEL);
// CITED, a3-03-f-from-census.js embedded OUTPUT §5 — the published table.
const PUB = { 11: 4.444e-2, 13: 4.848e-2, 17: 4.884e-2, 19: 3.112e-2, 23: 3.066e-2, 29: 3.737e-2, 31: 1.844e-2, 37: 7.509e-3, 41: 8.870e-3, 43: 8.660e-3, 47: 1.303e-2, 53: 7.969e-3, 59: 9.094e-3, 61: 5.298e-3, 67: 6.890e-4, 71: 8.024e-4, 73: 3.300e-3, 79: 4.026e-3, 83: 4.209e-3, 89: 1.810e-3, 97: 7.262e-4, 101: 8.144e-4, 103: 4.126e-4, 107: 4.567e-4, 109: 8.960e-4, 113: 8.177e-4, 127: 3.346e-4, 131: 2.460e-4, 137: 2.662e-4, 139: 4.423e-4, 149: 4.830e-4, 151: 2.880e-4, 157: 1.499e-4, 163: 1.707e-4, 167: 3.299e-4, 173: 2.851e-4, 179: 3.082e-4, 181: 5.736e-5, 191: 6.189e-5, 193: 7.956e-5, 197: 8.617e-5, 199: 2.653e-4 };
// CITED, a3-03-f-from-census.js OUTPUT §4b — the published FIRST-TERM values,
// which is what count(d_min)/D is, for the levels where the published row had
// more than one term. Above x = 83 the published f IS the first term.
const PUBTERM1 = { 11: 4.444e-2, 13: 4.040e-2, 17: 4.588e-2, 19: 2.763e-2, 23: 3.060e-2, 29: 3.640e-2, 31: 1.765e-2, 37: 7.199e-3, 41: 8.762e-3, 43: 8.469e-3, 47: 1.278e-2, 53: 7.933e-3, 59: 9.068e-3, 61: 5.252e-3, 67: 6.443e-4, 71: 7.798e-4, 73: 3.262e-3, 79: 3.972e-3 };

log('== fdecay-deep 01: THE 42-POINT CENSUS IS CORRUPTED FROM x = 37 ==');
log(`window cross-check length X = ${XW.toExponential(2)}, levels recomputed to x = ${XMAXLEVEL}`);

// ---------------------------------------------------------------- §1 ------
log('\n== 1. THE COLLISION, EXHIBITED ==');
log('  JavaScript takes the shift count of << modulo 32, so `1 << r` and `1 << (r+32)` are the same bit.');
log('  q | residue r | 1<<r | residue r+32 | 1<<(r+32) | same bit?');
for (const [q, r] of [[29, 0], [31, 0], [37, 0], [37, 3], [41, 5], [101, 20], [199, 30]]) {
  if (r + 32 >= q) { log(`  ${q} | ${r} | ${(1 << r) >>> 0} | ${r + 32} | (no such residue, q = ${q})`); continue; }
  log(`  ${q} | ${r} | ${(1 << r) >>> 0} | ${r + 32} | ${(1 << (r + 32)) >>> 0} | ${((1 << r) === (1 << (r + 32))) ? 'YES — collision' : 'no'}`);
}
log('  the smallest prime with a residue 32 or above is 37, and the smallest tile carrying it is T_37.');
log('  T_x contains a prime above 32 iff x >= 37. That is the whole prediction.');

// ---------------------------------------------------------------- §2 ------
log('\n== 2. count(d_min)/D: PUBLISHED EVALUATOR vs ALIAS-FREE EVALUATOR ==');
log('  x | p | d_min | published evaluator | alias-free | alias-free / published | leaves pub | leaves fixed | s');
const IE = new Map();
for (const x of LEVELS) {
  const p = nextPrime(x), d = 6 * C.k0of(p), pr = PR.filter(q => q <= x);
  const t0 = Date.now();
  const doPub = d <= 400;                       // the published value at d = 420 is CITED, not rerun
  const b = doPub ? countRatioPublished(d, pr) : null;
  const f = countRatioFixed(d, pr);
  IE.set(x, { d, pub: b ? b.ratio : NaN, fix: f.ratio, leavesP: b ? b.leaves : NaN, leavesF: f.leaves, aborted: f.aborted });
  log(`  ${x} | ${p} | ${d} | ${b ? b.ratio.toExponential(5) : 'CITED ' + PUB[x].toExponential(4)} | ${f.ratio.toExponential(5)} | ${(f.ratio / (b ? b.ratio : PUB[x])).toFixed(5)} | ${b ? b.leaves : '-'} | ${f.leaves} | ${((Date.now() - t0) / 1000).toFixed(1)}`);
}
{
  const lo = LEVELS.filter(x => x <= 31 && IE.has(x)), hi = LEVELS.filter(x => x >= 37 && IE.has(x) && isFinite(IE.get(x).pub));
  const rl = lo.map(x => IE.get(x).fix / IE.get(x).pub), rh = hi.map(x => IE.get(x).fix / IE.get(x).pub);
  log(`  x <= 31: alias-free / published in [${Math.min(...rl).toFixed(6)}, ${Math.max(...rl).toFixed(6)}] over ${rl.length} levels — IDENTICAL, bit for bit`);
  log(`  x >= 37: alias-free / published in [${Math.min(...rh).toFixed(5)}, ${Math.max(...rh).toFixed(5)}] over ${rh.length} levels`);
  log('  and the published evaluator reproduces its own OUTPUT §4b first-term column here, so this run is');
  log('  the same code doing the same thing, not a different code doing a different thing:');
  for (const x of [13, 19, 29, 37, 47, 67, 79]) if (PUBTERM1[x] && isFinite(IE.get(x).pub)) log(`    x=${x}: rerun ${IE.get(x).pub.toExponential(4)} against published §4b ${PUBTERM1[x].toExponential(3)}`);
}
log(`[checkpoint ${el()}s]`);

// ---------------------------------------------------------------- §3 ------
log('\n== 3. AGAINST AN INSTRUMENT WITH NO INCLUSION-EXCLUSION IN IT ==');
log('  the segmented window sieve counts gaps of the actual object. It shares no line of code and no');
log('  identity with the census law. Its first-term count is the number of gaps of size exactly d_min.');
const run = C.measure({ X: XW, levels: LEVELS, checkpoints: [] });
log(`  [${el()}s] window run done, X = ${XW.toExponential(2)}`);
log('  x | d_min | window count(d_min)/gaps | K | 3 sigma | alias-free IE | window/IE | published IE | window/published');
for (const w of run.rows) {
  const ie = IE.get(w.x); if (!ie) continue;
  const k1 = w.qhist.length && w.qhist[0][0] === ie.d ? w.qhist[0][1] : 0;
  const fw = k1 / w.ngap, sig = 3 / Math.sqrt(Math.max(1, k1));
  const pub = isFinite(ie.pub) ? ie.pub : PUB[w.x];
  log(`  ${w.x} | ${ie.d} | ${fw.toExponential(4)} | ${k1} | +-${sig.toFixed(4)} | ${ie.fix.toExponential(4)} | ${(fw / ie.fix).toFixed(4)} | ${pub.toExponential(4)} | ${(fw / pub).toFixed(4)}`);
}
{
  const rows = run.rows.filter(w => IE.has(w.x) && w.qhist.length && w.qhist[0][0] === IE.get(w.x).d);
  const dev = rows.map(w => { const k1 = w.qhist[0][1]; return Math.abs(k1 / w.ngap / IE.get(w.x).fix - 1) * Math.sqrt(k1); });
  log(`  window against ALIAS-FREE: worst deviation ${Math.max(...dev).toFixed(2)} sigma over ${rows.length} levels`);
  const dev2 = rows.filter(w => w.x >= 37).map(w => { const k1 = w.qhist[0][1]; const pub = isFinite(IE.get(w.x).pub) ? IE.get(w.x).pub : PUB[w.x]; return Math.abs(k1 / w.ngap / pub - 1) * Math.sqrt(k1); });
  log(`  window against PUBLISHED, x >= 37: worst deviation ${Math.max(...dev2).toFixed(1)} sigma over ${dev2.length} levels`);
}

// ---------------------------------------------------------------- §4 ------
log('\n== 4. THE CORRECTED DIAGONAL, AND WHAT IT DOES TO THE FITTED LAW ==');
log('  f here is the FIRST TERM count(d_min)/D only, on both sides, so the two columns are comparable.');
log('  Later terms add 0 to 20 per cent (a3-03 OUTPUT §4b: first-term share 83.33 per cent worst,');
log('  98.08 per cent median) and are not what changed.');
log('  x | p | 2p/mbar | ln s | published ln(1/f) | corrected ln(1/f) | shift');
const FIT = [];
for (const x of LEVELS) {
  const ie = IE.get(x), p = nextPrime(x), T = 2 * p / C.meanGap(x, PR), S = C.lnS(x, ie.d, PR);
  const pub = isFinite(ie.pub) ? ie.pub : PUB[x];
  FIT.push({ x, p, T, S, lp: Math.log(1 / pub), lf: Math.log(1 / ie.fix), lnD: C.lnD(x, PR) });
  log(`  ${x} | ${p} | ${T.toFixed(3)} | ${S.toFixed(3)} | ${Math.log(1 / pub).toFixed(4)} | ${Math.log(1 / ie.fix).toFixed(4)} | ${(Math.log(1 / ie.fix) - Math.log(1 / pub) >= 0 ? '+' : '')}${(Math.log(1 / ie.fix) - Math.log(1 / pub)).toFixed(4)}`);
}
function ols(rows, cols, y) {
  const n = rows.length, k = cols.length, A = [];
  for (let a = 0; a < k; a++) A.push(new Array(k + 1).fill(0));
  for (const r of rows) { const X = cols.map(c => c(r)), yy = y(r); for (let a = 0; a < k; a++) { for (let b = 0; b < k; b++) A[a][b] += X[a] * X[b]; A[a][k] += X[a] * yy; } }
  const M = A.map(r => r.slice(0, k));
  for (let c = 0; c < k; c++) { let piv = c; for (let r2 = c + 1; r2 < k; r2++) if (Math.abs(A[r2][c]) > Math.abs(A[piv][c])) piv = r2; [A[c], A[piv]] = [A[piv], A[c]]; for (let r2 = 0; r2 < k; r2++) { if (r2 === c) continue; const f = A[r2][c] / A[c][c]; for (let cc = c; cc <= k; cc++) A[r2][cc] -= f * A[c][cc]; } }
  const co = []; for (let c = 0; c < k; c++) co.push(A[c][k] / A[c][c]);
  let ssr = 0, sst = 0; const mn = rows.reduce((s, r) => s + y(r), 0) / n;
  for (const r of rows) { const X = cols.map(c => c(r)); let yh = 0; for (let a = 0; a < k; a++) yh += co[a] * X[a]; ssr += (y(r) - yh) ** 2; sst += (y(r) - mn) ** 2; }
  const s2 = ssr / Math.max(1, n - k), I = [];
  for (let a = 0; a < k; a++) { I.push(new Array(k).fill(0)); I[a][a] = 1; }
  for (let c = 0; c < k; c++) { let piv = c; for (let r2 = c + 1; r2 < k; r2++) if (Math.abs(M[r2][c]) > Math.abs(M[piv][c])) piv = r2; [M[c], M[piv]] = [M[piv], M[c]]; [I[c], I[piv]] = [I[piv], I[c]]; const dv = M[c][c]; for (let cc = 0; cc < k; cc++) { M[c][cc] /= dv; I[c][cc] /= dv; } for (let r2 = 0; r2 < k; r2++) { if (r2 === c) continue; const f = M[r2][c]; for (let cc = 0; cc < k; cc++) { M[r2][cc] -= f * M[c][cc]; I[r2][cc] -= f * I[c][cc]; } } }
  return { co, se: co.map((_, a) => Math.sqrt(Math.max(0, s2 * I[a][a]))), r2: 1 - ssr / sst, n };
}
{
  const one = () => 1, T = r => r.T, S = r => r.S;
  for (const [nm, y] of [['published (defective)', r => r.lp], ['corrected', r => r.lf]]) {
    const A = ols(FIT, [one, T], y), B = ols(FIT, [one, T, S], y);
    const lo = FIT.slice(0, Math.floor(FIT.length / 2)), hi = FIT.slice(Math.floor(FIT.length / 2));
    const Al = ols(lo, [one, T], y), Ah = ols(hi, [one, T], y);
    log(`  ${nm}: ln(1/f) = ${A.co[0].toFixed(3)} + ${A.co[1].toFixed(4)}(+-${A.se[1].toFixed(4)})*T, R2 ${A.r2.toFixed(4)}`);
    log(`    with the comb: ${B.co[0].toFixed(3)} + ${B.co[1].toFixed(4)}(+-${B.se[1].toFixed(4)})*T ${B.co[2] < 0 ? '-' : '+'} ${Math.abs(B.co[2]).toFixed(3)}*S, R2 ${B.r2.toFixed(4)}`);
    log(`    halves: lower slope ${Al.co[1].toFixed(3)}, upper slope ${Ah.co[1].toFixed(3)}`);
    const D = ols(FIT, [one, r => Math.log(Math.log(r.x))], r => Math.log(r.lnD / y(r)));
    log(`    downstream: ln L_indep = ${D.co[0].toFixed(3)} + ${D.co[1].toFixed(3)}(+-${D.se[1].toFixed(3)})*lnln x, R2 ${D.r2.toFixed(4)}`);
  }
  log('  published, as printed in a3-03 OUTPUT §5B/§5E: 1.001 + 1.451*T R2 0.9020; comb 1.529 + 1.482*T');
  log('  - 1.025*S R2 0.9639; halves 1.695 and 0.906; ln L = -1.884 + 2.892*lnln x R2 0.9719.');
}
log(`\n[total ${el()}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fdecay-deep-01-census-defect.js -- 2e9 199
//   invocation:  node research/fdecay-deep-01-census-defect.js 2e9 199
//   code-sha256: b63da380236546d5b4f3847aeec5425d92dae60ca145cd98405aacc56b4108b5
//   out-sha256:  4d932d022c5225a68cfc93269af24a40cdcfcae4cb6f27757eed9b9168ec07b1
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     2209.2 s
// ============================================================================
// == fdecay-deep 01: THE 42-POINT CENSUS IS CORRUPTED FROM x = 37 ==
// window cross-check length X = 2.00e+9, levels recomputed to x = 199
//
// == 1. THE COLLISION, EXHIBITED ==
//   JavaScript takes the shift count of << modulo 32, so `1 << r` and `1 << (r+32)` are the same bit.
//   q | residue r | 1<<r | residue r+32 | 1<<(r+32) | same bit?
//   29 | 0 | 1 | 32 | (no such residue, q = 29)
//   31 | 0 | 1 | 32 | (no such residue, q = 31)
//   37 | 0 | 1 | 32 | 1 | YES — collision
//   37 | 3 | 8 | 35 | 8 | YES — collision
//   41 | 5 | 32 | 37 | 32 | YES — collision
//   101 | 20 | 1048576 | 52 | 1048576 | YES — collision
//   199 | 30 | 1073741824 | 62 | 1073741824 | YES — collision
//   the smallest prime with a residue 32 or above is 37, and the smallest tile carrying it is T_37.
//   T_x contains a prime above 32 iff x >= 37. That is the whole prediction.
//
// == 2. count(d_min)/D: PUBLISHED EVALUATOR vs ALIAS-FREE EVALUATOR ==
//   x | p | d_min | published evaluator | alias-free | alias-free / published | leaves pub | leaves fixed | s
//   11 | 13 | 24 | 4.44444e-2 | 4.44444e-2 | 1.00000 | 2 | 2 | 0.0
//   13 | 17 | 36 | 4.04040e-2 | 4.04040e-2 | 1.00000 | 8 | 8 | 0.0
//   17 | 19 | 36 | 4.58810e-2 | 4.58810e-2 | 1.00000 | 8 | 8 | 0.0
//   19 | 23 | 48 | 2.76279e-2 | 2.76279e-2 | 1.00000 | 28 | 28 | 0.0
//   23 | 29 | 60 | 3.06042e-2 | 3.06042e-2 | 1.00000 | 77 | 77 | 0.0
//   29 | 31 | 60 | 3.64017e-2 | 3.64017e-2 | 1.00000 | 77 | 77 | 0.0
//   31 | 37 | 72 | 1.76477e-2 | 1.76477e-2 | 1.00000 | 106 | 106 | 0.0
//   37 | 41 | 84 | 7.19908e-3 | 7.43840e-3 | 1.03324 | 122 | 122 | 0.0
//   41 | 43 | 84 | 8.76167e-3 | 8.93587e-3 | 1.01988 | 122 | 122 | 0.0
//   43 | 47 | 96 | 8.46907e-3 | 8.37322e-3 | 0.98868 | 133 | 133 | 0.0
//   47 | 53 | 108 | 1.27759e-2 | 1.26447e-2 | 0.98973 | 312 | 312 | 0.0
//   53 | 59 | 120 | 7.93338e-3 | 7.85766e-3 | 0.99046 | 1257 | 1257 | 0.0
//   59 | 61 | 120 | 9.06782e-3 | 8.93435e-3 | 0.98528 | 1257 | 1257 | 0.0
//   61 | 67 | 132 | 5.25223e-3 | 5.33760e-3 | 1.01625 | 2129 | 2129 | 0.0
//   67 | 71 | 144 | 6.44340e-4 | 6.75936e-4 | 1.04904 | 2367 | 2367 | 0.0
//   71 | 73 | 144 | 7.79769e-4 | 8.04724e-4 | 1.03200 | 2367 | 2367 | 0.0
//   73 | 79 | 156 | 3.26172e-3 | 3.25377e-3 | 0.99756 | 2396 | 2396 | 0.0
//   79 | 83 | 168 | 3.97244e-3 | 3.97092e-3 | 0.99962 | 13415 | 13415 | 0.0
//   83 | 89 | 180 | 4.20888e-3 | 3.98987e-3 | 0.94797 | 28209 | 28209 | 0.1
//   89 | 97 | 192 | 1.81007e-3 | 1.75972e-3 | 0.97218 | 18842 | 18842 | 0.1
//   97 | 101 | 204 | 7.26241e-4 | 6.81591e-4 | 0.93852 | 16737 | 16737 | 0.1
//   101 | 103 | 204 | 8.14387e-4 | 7.60525e-4 | 0.93386 | 16737 | 16737 | 0.1
//   103 | 107 | 216 | 4.12608e-4 | 3.75778e-4 | 0.91074 | 45117 | 45117 | 0.2
//   107 | 109 | 216 | 4.56651e-4 | 4.21382e-4 | 0.92277 | 45117 | 45117 | 0.2
//   109 | 113 | 228 | 8.95957e-4 | 8.45841e-4 | 0.94406 | 147716 | 147716 | 0.6
//   113 | 127 | 252 | 8.17721e-4 | 7.38352e-4 | 0.90294 | 677249 | 677249 | 3.4
//   127 | 131 | 264 | 3.34592e-4 | 2.82065e-4 | 0.84301 | 639167 | 639167 | 2.9
//   131 | 137 | 276 | 2.45956e-4 | 2.25914e-4 | 0.91852 | 266539 | 266539 | 1.5
//   137 | 139 | 276 | 2.66234e-4 | 2.49084e-4 | 0.93558 | 266539 | 266539 | 1.5
//   139 | 149 | 300 | 4.42312e-4 | 3.28600e-4 | 0.74291 | 5352479 | 5352479 | 28.0
//   149 | 151 | 300 | 4.82967e-4 | 3.62675e-4 | 0.75093 | 5352479 | 5352479 | 28.8
//   151 | 157 | 312 | 2.88024e-4 | 2.14023e-4 | 0.74308 | 7182800 | 7182800 | 37.6
//   157 | 163 | 324 | 1.49922e-4 | 1.10346e-4 | 0.73602 | 5808143 | 5808143 | 32.7
//   163 | 167 | 336 | 1.70682e-4 | 1.40073e-4 | 0.82067 | 9056110 | 9056110 | 53.5
//   167 | 173 | 348 | 3.29894e-4 | 2.36741e-4 | 0.71763 | 19264606 | 19264606 | 106.4
//   173 | 179 | 360 | 2.85103e-4 | 2.11432e-4 | 0.74160 | 28659105 | 28659105 | 151.7
//   179 | 181 | 360 | 3.08237e-4 | 2.30447e-4 | 0.74763 | 28659105 | 28659105 | 114.7
//   181 | 191 | 384 | 5.73593e-5 | 3.81673e-5 | 0.66541 | 33998697 | 33998697 | 121.4
//   191 | 193 | 384 | 6.18850e-5 | 4.17514e-5 | 0.67466 | 33998697 | 33998697 | 100.9
//   193 | 197 | 396 | 7.95644e-5 | 4.97071e-5 | 0.62474 | 60090780 | 60090780 | 206.5
//   197 | 199 | 396 | 8.61710e-5 | 5.41417e-5 | 0.62830 | 60090780 | 60090780 | 221.7
//   199 | 211 | 420 | CITED 2.6530e-4 | 1.62689e-4 | 0.61323 | - | 670992490 | 962.0
//   x <= 31: alias-free / published in [1.000000, 1.000000] over 7 levels — IDENTICAL, bit for bit
//   x >= 37: alias-free / published in [0.62474, 1.04904] over 34 levels
//   and the published evaluator reproduces its own OUTPUT §4b first-term column here, so this run is
//   the same code doing the same thing, not a different code doing a different thing:
//     x=13: rerun 4.0404e-2 against published §4b 4.040e-2
//     x=19: rerun 2.7628e-2 against published §4b 2.763e-2
//     x=29: rerun 3.6402e-2 against published §4b 3.640e-2
//     x=37: rerun 7.1991e-3 against published §4b 7.199e-3
//     x=47: rerun 1.2776e-2 against published §4b 1.278e-2
//     x=67: rerun 6.4434e-4 against published §4b 6.443e-4
//     x=79: rerun 3.9724e-3 against published §4b 3.972e-3
// [checkpoint 2176.5s]
//
// == 3. AGAINST AN INSTRUMENT WITH NO INCLUSION-EXCLUSION IN IT ==
//   the segmented window sieve counts gaps of the actual object. It shares no line of code and no
//   identity with the census law. Its first-term count is the number of gaps of size exactly d_min.
//   [2209.1s] window run done, X = 2.00e+9
//   x | d_min | window count(d_min)/gaps | K | 3 sigma | alias-free IE | window/IE | published IE | window/published
//   11 | 24 | 4.4444e-2 | 5194805 | +-0.0013 | 4.4444e-2 | 1.0000 | 4.4444e-2 | 1.0000
//   13 | 36 | 4.0404e-2 | 3996004 | +-0.0015 | 4.0404e-2 | 1.0000 | 4.0404e-2 | 1.0000
//   17 | 36 | 4.5881e-2 | 4003838 | +-0.0015 | 4.5881e-2 | 1.0000 | 4.5881e-2 | 1.0000
//   19 | 48 | 2.7628e-2 | 2157196 | +-0.0020 | 2.7628e-2 | 1.0000 | 2.7628e-2 | 1.0000
//   23 | 60 | 3.0604e-2 | 2181773 | +-0.0020 | 3.0604e-2 | 1.0000 | 3.0604e-2 | 1.0000
//   29 | 60 | 3.6404e-2 | 2416251 | +-0.0019 | 3.6402e-2 | 1.0001 | 3.6402e-2 | 1.0001
//   31 | 72 | 1.7646e-2 | 1095675 | +-0.0029 | 1.7648e-2 | 0.9999 | 1.7648e-2 | 0.9999
//   37 | 84 | 7.4366e-3 | 436789 | +-0.0045 | 7.4384e-3 | 0.9998 | 7.1991e-3 | 1.0330
//   41 | 84 | 8.9347e-3 | 499182 | +-0.0042 | 8.9359e-3 | 0.9999 | 8.7617e-3 | 1.0197
//   43 | 96 | 8.3794e-3 | 446385 | +-0.0045 | 8.3732e-3 | 1.0007 | 8.4691e-3 | 0.9894
//   47 | 108 | 1.2642e-2 | 644823 | +-0.0037 | 1.2645e-2 | 0.9998 | 1.2776e-2 | 0.9896
//   53 | 120 | 7.8569e-3 | 385615 | +-0.0048 | 7.8577e-3 | 0.9999 | 7.9334e-3 | 0.9904
//   59 | 120 | 8.9344e-3 | 423633 | +-0.0046 | 8.9344e-3 | 1.0000 | 9.0678e-3 | 0.9853
//   61 | 132 | 5.3444e-3 | 245104 | +-0.0061 | 5.3376e-3 | 1.0013 | 5.2522e-3 | 1.0176
//   67 | 144 | 6.6944e-4 | 29785 | +-0.0174 | 6.7594e-4 | 0.9904 | 6.4434e-4 | 1.0390
//   71 | 144 | 7.9913e-4 | 34554 | +-0.0161 | 8.0472e-4 | 0.9931 | 7.7977e-4 | 1.0248
//   73 | 156 | 3.2511e-3 | 136726 | +-0.0081 | 3.2538e-3 | 0.9992 | 3.2617e-3 | 0.9968
//   79 | 168 | 3.9817e-3 | 163213 | +-0.0074 | 3.9709e-3 | 1.0027 | 3.9724e-3 | 1.0023
//   83 | 180 | 3.9831e-3 | 159337 | +-0.0075 | 3.9899e-3 | 0.9983 | 4.2089e-3 | 0.9464
//   89 | 192 | 1.7632e-3 | 68949 | +-0.0114 | 1.7597e-3 | 1.0020 | 1.8101e-3 | 0.9741
//   97 | 204 | 6.8831e-4 | 26361 | +-0.0185 | 6.8159e-4 | 1.0099 | 7.2624e-4 | 0.9478
//   101 | 204 | 7.6824e-4 | 28840 | +-0.0177 | 7.6052e-4 | 1.0101 | 8.1439e-4 | 0.9433
//   103 | 216 | 3.7018e-4 | 13627 | +-0.0257 | 3.7578e-4 | 0.9851 | 4.1261e-4 | 0.8972
//   107 | 216 | 4.1566e-4 | 15015 | +-0.0245 | 4.2138e-4 | 0.9864 | 4.5665e-4 | 0.9102
//   109 | 228 | 8.4750e-4 | 30053 | +-0.0173 | 8.4584e-4 | 1.0020 | 8.9596e-4 | 0.9459
//   113 | 252 | 7.4521e-4 | 25958 | +-0.0186 | 7.3835e-4 | 1.0093 | 8.1772e-4 | 0.9113
//   127 | 264 | 2.8188e-4 | 9664 | +-0.0305 | 2.8207e-4 | 0.9993 | 3.3459e-4 | 0.8425
//   131 | 276 | 2.2618e-4 | 7636 | +-0.0343 | 2.2591e-4 | 1.0012 | 2.4596e-4 | 0.9196
//   137 | 276 | 2.4830e-4 | 8260 | +-0.0330 | 2.4908e-4 | 0.9968 | 2.6623e-4 | 0.9326
//   139 | 300 | 3.2943e-4 | 10801 | +-0.0289 | 3.2860e-4 | 1.0025 | 4.4231e-4 | 0.7448
//   149 | 300 | 3.6257e-4 | 11728 | +-0.0277 | 3.6267e-4 | 0.9997 | 4.8297e-4 | 0.7507
//   151 | 312 | 2.1728e-4 | 6935 | +-0.0360 | 2.1402e-4 | 1.0152 | 2.8802e-4 | 0.7544
//   157 | 324 | 1.1184e-4 | 3524 | +-0.0505 | 1.1035e-4 | 1.0135 | 1.4992e-4 | 0.7460
//   163 | 336 | 1.3929e-4 | 4335 | +-0.0456 | 1.4007e-4 | 0.9944 | 1.7068e-4 | 0.8161
//   167 | 348 | 2.3754e-4 | 7304 | +-0.0351 | 2.3674e-4 | 1.0034 | 3.2989e-4 | 0.7201
//   173 | 360 | 2.1411e-4 | 6507 | +-0.0372 | 2.1143e-4 | 1.0126 | 2.8510e-4 | 0.7510
//   179 | 360 | 2.3334e-4 | 7012 | +-0.0358 | 2.3045e-4 | 1.0126 | 3.0824e-4 | 0.7570
//   181 | 384 | 3.7083e-5 | 1102 | +-0.0904 | 3.8167e-5 | 0.9716 | 5.7359e-5 | 0.6465
//   191 | 384 | 4.0572e-5 | 1193 | +-0.0869 | 4.1751e-5 | 0.9718 | 6.1885e-5 | 0.6556
//   193 | 396 | 5.0175e-5 | 1460 | +-0.0785 | 4.9707e-5 | 1.0094 | 7.9564e-5 | 0.6306
//   197 | 396 | 5.4719e-5 | 1576 | +-0.0756 | 5.4142e-5 | 1.0107 | 8.6171e-5 | 0.6350
//   199 | 420 | 1.6376e-4 | 4669 | +-0.0439 | 1.6269e-4 | 1.0066 | 2.6530e-4 | 0.6173
//   window against ALIAS-FREE: worst deviation 1.74 sigma over 42 levels
//   window against PUBLISHED, x >= 37: worst deviation 27.0 sigma over 35 levels
//
// == 4. THE CORRECTED DIAGONAL, AND WHAT IT DOES TO THE FITTED LAW ==
//   f here is the FIRST TERM count(d_min)/D only, on both sides, so the two columns are comparable.
//   Later terms add 0 to 20 per cent (a3-03 OUTPUT §4b: first-term share 83.33 per cent worst,
//   98.08 per cent median) and are not what changed.
//   x | p | 2p/mbar | ln s | published ln(1/f) | corrected ln(1/f) | shift
//   11 | 13 | 1.519 | 0.134 | 3.1135 | 3.1135 | +0.0000
//   13 | 17 | 1.681 | 0.000 | 3.2088 | 3.2088 | +0.0000
//   17 | 19 | 1.658 | 0.074 | 3.0817 | 3.0817 | +0.0000
//   19 | 23 | 1.796 | 0.693 | 3.5889 | 3.5889 | +0.0000
//   23 | 29 | 2.067 | 1.099 | 3.4866 | 3.4866 | +0.0000
//   29 | 31 | 2.058 | 1.138 | 3.3131 | 3.3131 | +0.0000
//   31 | 37 | 2.297 | 0.981 | 4.0372 | 4.0372 | +0.0000
//   37 | 41 | 2.408 | 0.511 | 4.9338 | 4.9011 | -0.0327
//   41 | 43 | 2.402 | 0.537 | 4.7374 | 4.7177 | -0.0197
//   43 | 47 | 2.504 | 0.288 | 4.7713 | 4.7827 | +0.0114
//   47 | 53 | 2.703 | 0.827 | 4.3602 | 4.3705 | +0.0103
//   53 | 59 | 2.896 | 1.099 | 4.8367 | 4.8463 | +0.0096
//   59 | 61 | 2.892 | 1.117 | 4.7030 | 4.7179 | +0.0148
//   61 | 67 | 3.073 | 1.050 | 5.2491 | 5.2330 | -0.0161
//   67 | 71 | 3.159 | 0.000 | 7.3473 | 7.2994 | -0.0479
//   71 | 73 | 3.156 | 0.015 | 7.1565 | 7.1250 | -0.0315
//   73 | 79 | 3.322 | 0.622 | 5.7255 | 5.7279 | +0.0024
//   79 | 83 | 3.402 | 1.278 | 5.5284 | 5.5288 | +0.0004
//   83 | 89 | 3.560 | 1.492 | 5.4706 | 5.5240 | +0.0534
//   89 | 97 | 3.793 | 0.758 | 6.3144 | 6.3426 | +0.0282
//   97 | 101 | 3.868 | 0.143 | 7.2276 | 7.2911 | +0.0635
//   101 | 103 | 3.866 | 0.153 | 7.1131 | 7.1815 | +0.0684
//   103 | 107 | 3.939 | 0.000 | 7.7930 | 7.8865 | +0.0935
//   107 | 109 | 3.937 | 0.010 | 7.6916 | 7.7720 | +0.0804
//   109 | 113 | 4.007 | 0.870 | 7.0176 | 7.0752 | +0.0576
//   113 | 127 | 4.424 | 1.204 | 7.1090 | 7.2111 | +0.1021
//   127 | 131 | 4.491 | 0.604 | 8.0026 | 8.1734 | +0.1708
//   131 | 137 | 4.625 | 0.100 | 8.3104 | 8.3954 | +0.0850
//   137 | 139 | 4.624 | 0.108 | 8.2311 | 8.2977 | +0.0666
//   139 | 149 | 4.885 | 1.099 | 7.7235 | 8.0207 | +0.2972
//   149 | 151 | 4.885 | 1.105 | 7.6356 | 7.9220 | +0.2864
//   151 | 157 | 5.011 | 0.930 | 8.1525 | 8.4494 | +0.2970
//   157 | 163 | 5.137 | 0.339 | 8.8054 | 9.1119 | +0.3065
//   163 | 167 | 5.198 | 0.616 | 8.6757 | 8.8733 | +0.1976
//   167 | 173 | 5.320 | 1.058 | 8.0167 | 8.3485 | +0.3318
//   173 | 179 | 5.441 | 1.099 | 8.1627 | 8.4616 | +0.2989
//   179 | 181 | 5.441 | 1.104 | 8.0846 | 8.3755 | +0.2908
//   181 | 191 | 5.678 | 0.000 | 9.7662 | 10.1735 | +0.4074
//   191 | 193 | 5.677 | 0.005 | 9.6902 | 10.0838 | +0.3935
//   193 | 197 | 5.735 | 0.251 | 9.4389 | 9.9094 | +0.4704
//   197 | 199 | 5.734 | 0.256 | 9.3592 | 9.8239 | +0.4647
//   199 | 211 | 6.019 | 1.808 | 8.2346 | 8.7237 | +0.4890
//   published (defective): ln(1/f) = 1.073 + 1.4357(+-0.0757)*T, R2 0.8999
//     with the comb: 1.609 + 1.4675(+-0.0458)*T - 1.038*S, R2 0.9646
//     halves: lower slope 1.662, upper slope 0.906
//     downstream: ln L_indep = -1.937 + 2.926(+-0.077)*lnln x, R2 0.9728
//   corrected: ln(1/f) = 0.792 + 1.5425(+-0.0724)*T, R2 0.9191
//     with the comb: 1.323 + 1.5741(+-0.0405)*T - 1.030*S, R2 0.9754
//     halves: lower slope 1.675, upper slope 1.109
//     downstream: ln L_indep = -1.861 + 2.864(+-0.075)*lnln x, R2 0.9732
//   published, as printed in a3-03 OUTPUT §5B/§5E: 1.001 + 1.451*T R2 0.9020; comb 1.529 + 1.482*T
//   - 1.025*S R2 0.9639; halves 1.695 and 0.906; ln L = -1.884 + 2.892*lnln x R2 0.9719.
//
// [total 2209.1s]
// ============================================================================
// READINGS — the published 42-point census is right at exactly the seven levels
// where it was verified and wrong at all thirty-five where it was not, and the
// boundary is the machine word.
//
// 1. THE MECHANISM, AND IT IS ONE LINE. `1 << r` in JavaScript uses r mod 32, so
//    for q = 37 the residues 0 and 32 both set bit 1, and for q = 199 the
//    residues 30 and 62 both set bit 1073741824. The avoided-set size |A_q| is
//    then read off as the popcount of an aliased mask, and every factor
//    (q - |A_q|) in the census law's product is wrong whenever two avoided
//    residues of that prime sit 32 apart. It is not a numerical issue: the
//    cancellation ratio the census reports, 1.8e+5 against a double's 1e16, was
//    never the risk.
//
// 2. THE PREDICTION WAS MADE BEFORE THE TABLE WAS READ, AND IT IS EXACT.
//    T_x carries a prime above 32 iff x >= 37. Measured: alias-free over
//    published is in [1.000000, 1.000000] over the seven levels x <= 31, and in
//    [0.62474, 1.04904] over the thirty-four levels x >= 37 that were rerun.
//    Not a fitted boundary, not a drift, a step at one value of x.
//
// 3. THE RERUN IS THE SAME CODE. The published evaluator, copied byte for byte,
//    reproduces the census's own OUTPUT §4b first-term column: 4.0404e-2 at
//    x = 13, 2.7628e-2 at x = 19, 3.6402e-2 at x = 29, 7.1991e-3 at x = 37,
//    1.2776e-2 at x = 47, 6.4434e-4 at x = 67, 3.9724e-3 at x = 79. So the
//    disagreement in §2 is between two evaluators and not between two runs.
//
// 4. AND AN INSTRUMENT WITH NO INCLUSION-EXCLUSION IN IT AGREES WITH THE
//    ALIAS-FREE ONE, NOT WITH THE PUBLISHED ONE. Over 42 levels the segmented
//    window sieve sits within 1.74 sigma of the alias-free evaluator at worst.
//    Against the published one, over the 35 levels x >= 37, the worst deviation
//    is 27.0 sigma. Two methods that share no line of code, one arithmetic and
//    one empirical, against one table.
//
// 5. THE SIZE OF THE ERROR GROWS WITH DEPTH, WHICH IS WHY IT MATTERS. The ratio
//    runs 1.03324 at x = 37, 0.93386 at x = 101, 0.74291 at x = 139, and
//    0.61323 at x = 199, where the published 2.6530e-4 becomes 1.62689e-4. In
//    ln(1/f) that is a shift of +0.4890 at x = 199 and +0.0000 at every level
//    x <= 31. The published table understates ln(1/f) by half a nat exactly
//    where the extrapolations are anchored.
//
// 6. WHAT THE CORRECTION DOES TO THE LAW: less than the size of the error
//    suggests. On first terms throughout, the published points give
//    ln(1/f) = 1.073 + 1.4357*T at R2 0.8999 and the corrected points give
//    0.792 + 1.5425(+-0.0724)*T at R2 0.9191; with the comb, 1.609 + 1.4675*T
//    - 1.038*S becomes 1.323 + 1.5741(+-0.0405)*T - 1.030*S, and R2 rises from
//    0.9646 to 0.9754. The threshold coefficient moves up by about 0.11, which
//    is one and a half of its own standard errors.
//
// 7. THE COMB COEFFICIENT IS UNTOUCHED, AND THAT IS WORTH SAYING. It reads
//    -1.038 on the defective points and -1.030 on the corrected ones, so
//    `f-decays.md`'s "the coefficient is -1 to within the fit" and the
//    singular-series reading behind it survive the correction unchanged.
//
// 8. THE BRANCH CALL IS UNTOUCHED TOO. ln L_indep = -1.937 + 2.926*lnln x on the
//    defective points and -1.861 + 2.864(+-0.075)*lnln x on the corrected ones,
//    R2 0.9728 against 0.9732. U-FRAME §12's polylog reading does not depend on
//    the defect. What depends on the defect is the level of every crossing
//    projected from these coefficients.
//
// 9. THE RANGE DEPENDENCE IS REAL ON BOTH SIDES AND IT CHANGES SHAPE. Halves
//    read 1.662 and 0.906 on the defective points and 1.675 and 1.109 on the
//    corrected ones. The upper half rises by 0.2 — the corrected law is less
//    range-dependent than the published one, but it is still range-dependent,
//    and `f-decays.md`'s refusal to quote a single slope stands.
//
// 10. WHY NOTHING CAUGHT THIS. Every verification the census ran lives at
//    x <= 31: T_7 to T_23 against direct sieving, the five published diagonal
//    points, and A2's streamed T_29 and T_31. All of them pass, and all of them
//    are inside the region where every prime of the tile is below 32. The check
//    that would have caught it is a second evaluator or a second method at ONE
//    level above 37, and neither existed until this pass.
//
// 11. COST, FOR THE RECORD. 2209.2 s, of which 962.0 s is the single alias-free
//    evaluation at x = 199 with 670992490 leaves. The alias-free evaluator is
//    not slower than the published one: the leaf counts are identical at every
//    level, so on this range no prune ever turned on a residue at or above 32.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION:
//   -1.038 and -1.030 in reading 7 are the comb coefficients this file's own
//     run prints as "- 1.038*S" and "- 1.030*S", with a space between the sign
//     and the digits. The readings close the sign up against the number.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   The "about 0.11" rise of the threshold coefficient in reading 6 is the
//     difference of two printed slopes: 1.5425 - 1.4357 = 0.1068 on first terms
//     without the comb, and 1.5741 - 1.4675 = 0.1066 with it. The "one and a
//     half of its own standard errors" clause is that rise against the printed
//     +-0.0724 of the no-comb corrected fit.
//
// BORROWED, verified present in the named producer's embedded output:
//   1.8e+5 and 1e16 in reading 1 are the census's own cancellation figures.
//     `research/a3-03-f-from-census.js` prints "worst signed-term cancellation
//     ratio ... 1.8e+5 (double carries ~1e16 ...)" on one line. Neither is
//     measured here.
//
// The ROUND?[0.108] the traceability tool offers for 0.11 is a coincidence:
// 0.108 is a per-level column entry at x = 139 and has nothing to do with the
// coefficient shift of reading 6.
// ---------------------------------------------------------------------------
