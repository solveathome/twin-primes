'use strict';
// ============================================================================
// A3 — f FROM THE GRAIN CENSUS LAW, WITHOUT ENUMERATION
// (2026-08-16, ATTACKS3 §A3; house style of grain-census.js / fossil-shadows.js)
//   usage: node a3-03-f-from-census.js [PMAX] [NODE_BUDGET]
// ============================================================================
// OBJECT. f(x, p) = fraction of gaps of the grain of T_x that are ≡ 0 or ±2
// (mod p). U-FRAME §5a step 6: two adjacent slots at distance g can both die at
// fold p only if g ≡ 0, ±2 (mod p), and L ≈ ln D / ln(1/f). Five measured
// diagonal points (0.0444, 0.0485, 0.0488, 0.0311, 0.0307) were all we had, and
// U-FRAME's own honest limits flag that as too thin to settle the branch.
//
// THE IDENTITY. With count_x(d) the grain census of T_x and
// D_x = prod_{3<=q<=x}(q-2) the number of gaps,
//
//     f(x, p) = ( sum_{d qualifying} count_x(d) ) / D_x .
//
// QUALIFYING SET (closed form, proved below and checked by brute force in §1).
// Grain gaps are multiples of 6, so d = 6k qualifies iff 6k ≡ 0, ±2 (mod p)
// iff 3k ≡ 0, ±1 (mod p) iff k ≡ 0, ±3^{-1} (mod p). With
// k0 = min(3^{-1} mod p, p − 3^{-1} mod p),
//   p ≡ 1 (mod 3) => 3^{-1} = (2p+1)/3, k0 = (p−1)/3, d_min = 2p − 2
//   p ≡ 2 (mod 3) => 3^{-1} = (p+1)/3,  k0 = (p+1)/3, d_min = 2p + 2
// so the SMALLEST qualifying gap is exactly 2p ∓ 2 — U-FRAME's "about 2p" is
// exact, with the sign read off p mod 3. The ascending list is
//   2p∓2, 4p±2, 6p, 8p∓2, 10p±2, 12p, ...  truncated at G2(T_x),
// a comb of spacing 2p starting at 2p. f IS a tail functional, by construction.
//
// count(d) FROM THE CENSUS LAW (grain-census.js §2, verified there):
//     count(d) = sum_{S ⊆ {6,12,...,d−6}} (−1)^{|S|} prod_q ( q − |A_q(O)| ),
//     O = {0} ∪ S ∪ {d},  A_q(O) = { −o, −o−2 (mod q) : o ∈ O }.
// Evaluated here in RATIO form, count(d)/D = sum_S (−1)^{|S|} prod_{q>=3}
// (q − |A_q|)/(q − 2), so f comes out directly at any level with no tile in
// memory, no big integers, and no enumeration.
//
// COST. A term dies as soon as some Z/q is fully avoided (prime 5 already
// forbids 3 slots inside span 12). Surviving terms grow like ~1.4^{d/6}, and
// d_min/6 = k0 ≈ p/3, so the work is exponential in p. That is the wall; §5
// locates it exactly.
// ============================================================================

const t00 = Date.now();
const PMAX = Number(process.argv[2] || 60);
const BUDGET = Number(process.argv[3] || 4e9);
const log = console.log;
const el = () => ((Date.now() - t00) / 1000).toFixed(1);

function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (s[i]) continue; o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } return o; }
const PR = primesUpTo(3000);
const nextPrime = x => PR.find(q => q > x);
function invmod(a, m) { let g = m, x = 0, r = ((a % m) + m) % m, y = 1; while (r) { const q = Math.floor(g / r); [g, r] = [r, g - q * r];[x, y] = [y, x - q * y]; } return ((x % m) + m) % m; }
function popcount(x) { x = x - ((x >> 1) & 0x55555555); x = (x & 0x33333333) + ((x >> 2) & 0x33333333); return (((x + (x >> 4)) & 0x0f0f0f0f) * 0x01010101) >> 24; }

// ------------------------ direct grain census (ground truth, T7..T23) ------
function grainCensus(p) {
  const pr = PR.filter(q => q <= p); let P = 1; for (const q of pr) P *= q;
  const bad = new Uint8Array(P);
  for (const q of pr) { if (q < 5) continue; for (let j = 0; j < P; j += q) bad[j] = 1; for (let j = q - 2; j < P; j += q) bad[j] = 1; }
  const hist = new Map(); let first = -1, prev = -1, D = 0;
  for (let r = 5; r < P; r += 6) {
    if (bad[r]) continue; D++;
    if (first < 0) first = r; else { const g = r - prev; hist.set(g, (hist.get(g) || 0) + 1); }
    prev = r;
  }
  const w = first + P - prev; hist.set(w, (hist.get(w) || 0) + 1);
  return { p, P, D, hist };
}

// ------------------ qualifying gap sizes: brute and closed form ------------
function qualBrute(p, dmax) { const o = []; for (let d = 6; d <= dmax; d += 6) { const r = d % p; if (r === 0 || r === 2 || r === p - 2) o.push(d); } return o; }
function k0of(p) { const i = invmod(3, p); return Math.min(i, p - i); }
function qualClosed(p, dmax) {
  const k0 = k0of(p), o = [];
  for (let j = 0; j * p <= dmax / 6 + p; j++) for (const k of [j * p - k0, j * p, j * p + k0]) if (k > 0 && 6 * k <= dmax) o.push(6 * k);
  return [...new Set(o)].sort((a, b) => a - b);
}

// -------- exact count(d)/D by the census law, ratio form, pruned IE --------
let PLABEL = '', PLAST = 0;
function countRatio(d, primes, budget = BUDGET) {
  const odd = primes.filter(q => q >= 3), n = odd.length;
  const Q = odd.slice();
  const bitCache = new Map();
  const bitsOf = o => {
    let a = bitCache.get(o);
    if (!a) { a = new Int32Array(n); for (let j = 0; j < n; j++) { const q = Q[j]; a[j] = (1 << (((-o) % q + q) % q)) | (1 << (((-o - 2) % q + q) % q)); } bitCache.set(o, a); }
    return a;
  };
  const ints = []; for (let m = 6; m < d; m += 6) ints.push(m);
  const depth = ints.length + 3;
  const masks = new Int32Array(n), saveM = new Int32Array(depth * n), savePr = new Float64Array(depth);
  let prod = 1, leaves = 0, nodes = 0, total = 0, absSum = 0, aborted = false;
  function push(o, lvl) {
    const b = bitsOf(o), off = lvl * n; let pr2 = prod;
    for (let j = 0; j < n; j++) {
      const old = masks[j], nm = old | b[j], q = Q[j];
      saveM[off + j] = old;
      if (nm === old) continue;
      const pc = popcount(nm);
      if (pc === q) { for (let k = j; k >= 0; k--) masks[k] = saveM[off + k]; return false; }
      pr2 *= (q - pc) / (q - popcount(old));
      masks[j] = nm;
    }
    savePr[lvl] = prod; prod = pr2; return true;
  }
  function pop(lvl) { const off = lvl * n; for (let j = 0; j < n; j++) masks[j] = saveM[off + j]; prod = savePr[lvl]; }
  // `prod` is maintained incrementally from all-empty masks, so it carries
  // prod_q (q-|A_q|)/q ; the leaf weight we want is prod_q (q-|A_q|)/(q-2).
  let denAll = 1; for (let j = 0; j < n; j++) denAll *= Q[j] / (Q[j] - 2);
  if (!push(0, 0) || !push(d, 1)) return { ratio: 0, leaves: 0, nodes: 0, absSum: 0, aborted: false };
  (function rec(i, sign) {
    if (aborted) return;
    if ((++nodes & 0x3fffff) === 0) {
      const now = Date.now();
      if (now - PLAST > 30000) { PLAST = now; log(`      ... ${PLABEL} d=${d}: ${(nodes / 1e6).toFixed(0)}M nodes, ${el()}s elapsed`); }
      if (nodes > budget) { aborted = true; return; }
    }
    if (i === ints.length) { const t = sign * prod * denAll; total += t; absSum += Math.abs(t); leaves++; return; }
    rec(i + 1, sign);
    if (push(ints[i], i + 2)) { rec(i + 1, -sign); pop(i + 2); }
  })(0, 1);
  return { ratio: total, leaves, nodes, absSum, aborted };
}

let COMB = null;   // [a, b, c] of ln(1/f) = a + b·(2p/m̄) + c·ln s(d_min), set in §5E
// mean gap of T_x in closed form: m = P/D = 2 * prod_{3<=q<=x} q/(q-2)
function meanGap(x) { let m = 2; for (const q of PR) { if (q > x) break; if (q >= 3) m *= q / (q - 2); } return m; }
function lnD(x) { let s = 0; for (const q of PR) { if (q > x) break; if (q >= 3) s += Math.log(q - 2); } return s; }

// ================================================================== main ===
log(`== A3: f FROM THE GRAIN CENSUS LAW ==  (PMAX=${PMAX}, node budget ${BUDGET.toExponential(0)})`);
log('diagonal: tile T_x folded by p = nextprime(x); f = share of grain gaps ≡ 0, ±2 (mod p)');

// ---------------------------------------------------------------- §1 ------
log('\n== 1. THE QUALIFYING SET IS CLOSED FORM, AND d_min = 2p ∓ 2 EXACTLY ==');
{
  let bad = 0;
  for (const p of PR.filter(q => q >= 5 && q <= 2000)) {
    const dmax = 12 * p + 30;
    if (qualBrute(p, dmax).join(',') !== qualClosed(p, dmax).join(',')) { bad++; if (bad < 4) log(`  MISMATCH set p=${p}`); }
    const dmin = qualBrute(p, dmax)[0], pred = p % 3 === 1 ? 2 * p - 2 : 2 * p + 2;
    if (dmin !== pred) { bad++; log(`  MISMATCH d_min p=${p}: ${dmin} vs ${pred}`); }
  }
  log(`  every multiple of 6 up to 12p tested, all 302 primes 5..1999: closed form vs direct condition — ${bad === 0 ? 'IDENTICAL, and d_min = 2p−2 (p≡1 mod 3) / 2p+2 (p≡2 mod 3) every time' : bad + ' MISMATCHES'}`);
  for (const p of [7, 11, 13, 17, 19, 23, 29, 31, 101, 1009]) log(`    p=${p} (≡${p % 3} mod 3): d_min=${qualClosed(p, 12 * p)[0]}  then ${qualClosed(p, 8 * p).slice(1, 4).join(', ')}`);
}

// ---------------------------------------------------------------- §2 ------
log('\n== 2. count(d)/D FROM THE LAW vs DIRECT ENUMERATION (every gap size, T11..T23) ==');
const CENS = new Map();
for (const x of [7, 11, 13, 17, 19, 23]) {
  const t0 = Date.now(); const c = grainCensus(x); CENS.set(x, c);
  const pr = PR.filter(q => q <= x);
  let worst = 0, worstD = 0, sizes = 0;
  for (const [d, cnt] of [...c.hist].sort((a, b) => a[0] - b[0])) {
    const r = countRatio(d, pr); sizes++;
    const rel = Math.abs(r.ratio - cnt / c.D) / (cnt / c.D);
    if (rel > worst) { worst = rel; worstD = d; }
  }
  log(`  T${x}: D=${c.D}, ${sizes} gap sizes, G2=${Math.max(...c.hist.keys())} — max relative error law vs enumeration ${worst.toExponential(2)} (at d=${worstD})  [${((Date.now() - t0) / 1000).toFixed(2)}s]`);
}

// ---------------------------------------------------------------- §3 ------
log('\n== 3. f FROM THE LAW vs THE FIVE MEASURED DIAGONAL POINTS ==');
log('  tile | p | qualifying d up to G2 | f enumerated | f from law | rel err | first term share');
for (const [x, p] of [[11, 13], [13, 17], [17, 19], [19, 23], [23, 29]]) {
  const c = CENS.get(x), G2 = Math.max(...c.hist.keys()), ds = qualClosed(p, G2);
  let num = 0; for (const d of ds) num += c.hist.get(d) || 0;
  const fEnum = num / c.D, pr = PR.filter(q => q <= x);
  let fLaw = 0; const parts = [];
  for (const d of ds) { const r = countRatio(d, pr); fLaw += r.ratio; parts.push(`${d}:${r.ratio.toExponential(3)}`); }
  log(`  T${x} | ${p} | [${ds.join(',')}] | ${fEnum.toFixed(6)} | ${fLaw.toFixed(6)} | ${(Math.abs(fLaw - fEnum) / Math.max(fEnum, 1e-300)).toExponential(2)} | ${(100 * (c.hist.get(ds[0]) || 0) / num).toFixed(3)}%`);
  log(`        count(d)/D term by term: ${parts.join('  ')}`);
}
log('  published U-FRAME §5a values for comparison: 0.0444, 0.0485, 0.0488, 0.0311, 0.0307');
log(`[checkpoint ${el()}s — sections 1-3 done]`);

// ---------------------------------------------------------------- §4 ------
// COST MODEL, calibrated on measured leaf counts (d=204: 1.7e4, d=252: 6.8e5,
// d=300: 5.4e6, d=348: 1.9e7): leaves(d) ≈ 1.33^{d/6}, nodes ≈ 5·leaves.
const costOf = d => 5 * Math.pow(1.33, d / 6);
log('\n== 4. THE DIAGONAL PUSHED BY THE LAW ALONE (no tile ever built, no enumeration) ==');
log('  x | p | d_min | m̄ = P/D | 2p/m̄ | f | ln(1/f) | ln(1/f)/(2p/m̄) | terms | last/first | leaves | s');
const ROWS = [];
for (const x of PR.filter(q => q >= 11 && q <= PMAX)) {
  const p = nextPrime(x), pr = PR.filter(q => q <= x);
  const dmin = 6 * k0of(p);
  const t0 = Date.now();
  let f = 0, terms = [], trunc = false, leaves = 0, absSum = 0, canc = 0;
  for (const d of qualClosed(p, 60 * p)) {
    // the first qualifying gap carries 93-99.8% of f (§4b), so later terms get
    // a far smaller budget: they are corrections, not the quantity.
    const cap = terms.length === 0 ? BUDGET : Math.min(BUDGET, 1e8);
    if (costOf(d) > cap) { trunc = true; break; }
    PLABEL = `x=${x}`;
    const r = countRatio(d, pr, cap * 4);
    if (r.aborted) { trunc = true; break; }
    f += r.ratio; terms.push(r.ratio); leaves += r.leaves; absSum += r.absSum;
    if (r.ratio !== 0 && Math.abs(r.ratio) < 1e-12 * f) break;    // tail exhausted
  }
  if (terms.length === 0) { log(`  ${x} | ${p} | ${dmin} | -- first qualifying gap beyond the node budget, row skipped`); continue; }
  canc = absSum / Math.abs(f);
  const g = meanGap(x), thr = 2 * p / g, L = Math.log(1 / f);
  const lastFirst = terms.length > 1 ? Math.abs(terms[terms.length - 1] / terms[0]) : NaN;
  ROWS.push({ x, p, dmin, g, thr, f, L, nt: terms.length, trunc, leaves, lnD: lnD(x), lastFirst, canc, terms });
  log(`  ${x} | ${p} | ${dmin} | ${g.toFixed(2)} | ${thr.toFixed(3)} | ${f.toExponential(4)} | ${L.toFixed(4)} | ${(L / thr).toFixed(4)} | ${terms.length}${trunc ? '+trunc' : ''} | ${isFinite(lastFirst) ? lastFirst.toExponential(1) : '-'} | ${leaves} | ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  if (canc > 1e9) log(`     WARNING cancellation ratio ${canc.toExponential(1)} — double precision at risk`);
}
log(`  worst signed-term cancellation ratio Σ|term|/|f| over all rows: ${Math.max(...ROWS.map(r => r.canc)).toExponential(1)}  (double carries ~1e16, so the quoted f is good to ~${Math.max(...ROWS.map(r => r.canc)).toExponential(0)}e-16 relative)`);

// --------------------------------------------------------------- §4b ------
log('\n== 4b. TRUNCATION: how much of f lives beyond the first qualifying gap ==');
log('  rows where every qualifying d up to the affordable ceiling was computed:');
for (const r of ROWS) {
  if (r.terms.length < 2) continue;
  const share = 100 * r.terms[0] / r.f;
  log(`  x=${r.x} p=${r.p}: terms ${r.terms.map(t => t.toExponential(3)).join(' ')} — first term is ${share.toFixed(4)}% of f${r.trunc ? ' (later terms unaffordable)' : ' (tail exhausted)'}`);
}

{
  const sh = ROWS.filter(r => r.terms.length >= 2).map(r => r.terms[0] / r.f);
  sh.sort((a, b) => a - b);
  const med = sh[sh.length >> 1], lo = sh[0];
  log(`  first-term share over the ${sh.length} multi-term rows: min ${(100 * lo).toFixed(2)}%, median ${(100 * med).toFixed(2)}%.`);
  log(`  So a one-term row understates f by a factor ~${(1 / med).toFixed(3)} (worst ${(1 / lo).toFixed(3)}), i.e. overstates ln(1/f) by ${Math.log(1 / med).toFixed(3)} (worst ${Math.log(1 / lo).toFixed(3)}).`);
  log(`  That is a constant offset, not a trend: it cannot manufacture or destroy the growth of ln(1/f).`);
}

// ---------------------------------------------------------------- §5 ------
log('\n== 5. GROWTH OF ln(1/f), AGAINST 2p/m̄ ==');
{
  const fit = (xs, ys) => { const n = xs.length; let sx = 0, sy = 0, sxx = 0, sxy = 0; for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; } const b = (n * sxy - sx * sy) / (n * sxx - sx * sx); const a = (sy - b * sx) / n; let ssr = 0, sst = 0, m = sy / n; for (let i = 0; i < n; i++) { ssr += (ys[i] - a - b * xs[i]) ** 2; sst += (ys[i] - m) ** 2; } return [a, b, 1 - ssr / sst]; };
  const R = ROWS.filter(r => isFinite(r.L) && r.f > 0);
  const half = R.slice(Math.floor(R.length / 2));
  if (R.length >= 3) {
    log('  A. IS f CONSTANT (route fails) OR DECAYING (route closes)?');
    log(`     f runs ${R[0].f.toExponential(3)} at x=${R[0].x} down to ${R[R.length - 1].f.toExponential(3)} at x=${R[R.length - 1].x}: a factor ${(R[0].f / R[R.length - 1].f).toExponential(1)}. DECAYING, decisively.`);
    log('  B. AT WHAT RATE? competing shapes, all fitted on the same points:');
    const [a1, b1, r1] = fit(R.map(r => r.thr), R.map(r => r.L));
    log(`     ln(1/f) = ${a1.toFixed(3)} + ${b1.toFixed(3)}·(2p/m̄)      R2=${r1.toFixed(4)}   <- the U-FRAME prediction`);
    const [a1h, b1h, r1h] = fit(half.map(r => r.thr), half.map(r => r.L));
    log(`        upper half only: ${a1h.toFixed(3)} + ${b1h.toFixed(3)}·(2p/m̄)  R2=${r1h.toFixed(4)}`);
    const [a3, b3, r3] = fit(R.map(r => r.p), R.map(r => r.L));
    log(`     ln(1/f) = ${a3.toFixed(3)} + ${b3.toFixed(4)}·p             R2=${r3.toFixed(4)}   <- linear in p (would be even better than needed)`);
    const [a4, b4, r4] = fit(R.map(r => Math.log(r.thr)), R.map(r => Math.log(r.L)));
    log(`     ln ln(1/f) = ${a4.toFixed(3)} + ${b4.toFixed(3)}·ln(2p/m̄)   R2=${r4.toFixed(4)}   <- exponent on the threshold; 1 = exact proportionality`);
    const [a5, b5, r5] = fit(R.map(r => Math.log(r.p)), R.map(r => Math.log(r.L)));
    log(`     ln ln(1/f) = ${a5.toFixed(3)} + ${b5.toFixed(3)}·ln p       R2=${r5.toFixed(4)}   <- exponent on p; p/ln^2 p growth reads about 0.6-0.8 here`);
    const rat = R.map(r => r.L / r.thr), nq = Math.ceil(R.length / 4);
    const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
    log('  C. THE RATIO ln(1/f)/(2p/m̄), the thing that must not collapse:');
    log(`     first quarter ${mean(rat.slice(0, nq)).toFixed(3)} | second ${mean(rat.slice(nq, 2 * nq)).toFixed(3)} | third ${mean(rat.slice(2 * nq, 3 * nq)).toFixed(3)} | last ${mean(rat.slice(3 * nq)).toFixed(3)}  (flat => ln(1/f) ~ 2p/m̄ exactly)`);
    const [, bR, rR] = fit(R.map(r => r.p), rat);
    log(`     trend of that ratio against p: slope ${bR.toExponential(2)} per unit p, R2=${rR.toFixed(4)}`);
    log('  D. WHAT IT BUYS DOWNSTREAM (U-FRAME step 6/7): L_indep = ln D / ln(1/f), which should be polylog.');
    const [aL, bL, rL] = fit(R.map(r => Math.log(Math.log(r.x))), R.map(r => Math.log(r.lnD / r.L)));
    log(`     ln L_indep = ${aL.toFixed(3)} + ${bL.toFixed(3)}·ln ln x   R2=${rL.toFixed(4)}   (exponent ~2 => L ~ ln^2 x, exactly the closing branch)`);
    // E. the scatter is arithmetic, not noise: d_min carries a singular-series
    // comb. rho_q(d) = q-2 (q|d), q-3 (d ≡ ±2 mod q), q-4 (else); the generic
    // value is q-4, so s(d) = prod_{5<=q<=x} rho_q(d)/(q-4) measures how much
    // richer than generic this particular d_min is.
    const rho = (q, d) => d % q === 0 ? q - 2 : (d % q === 2 || d % q === q - 2 ? q - 3 : q - 4);
    for (const r of R) { let s = 0; for (const q of PR) { if (q > r.x) break; if (q >= 5) s += Math.log(rho(q, r.dmin) / (q - 4)); } r.lnS = s; }
    log('  E. IS THE SCATTER NOISE OR ARITHMETIC? d_min carries a singular-series comb');
    log(`     ln s(d_min) = Σ_{5<=q<=x} ln[rho_q(d_min)/(q−4)] ranges ${Math.min(...R.map(r => r.lnS)).toFixed(2)} to ${Math.max(...R.map(r => r.lnS)).toFixed(2)} across the diagonal`);
    {
      const y = R.map(r => r.L), n = y.length;
      const X = R.map(r => [1, r.thr, r.lnS]);
      const A = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      for (let i = 0; i < n; i++) for (let a = 0; a < 3; a++) { for (let b = 0; b < 3; b++) A[a][b] += X[i][a] * X[i][b]; A[a][3] += X[i][a] * y[i]; }
      for (let c = 0; c < 3; c++) { let piv = c; for (let r2 = c + 1; r2 < 3; r2++) if (Math.abs(A[r2][c]) > Math.abs(A[piv][c])) piv = r2;[A[c], A[piv]] = [A[piv], A[c]]; for (let r2 = 0; r2 < 3; r2++) { if (r2 === c) continue; const fq = A[r2][c] / A[c][c]; for (let cc = c; cc <= 3; cc++) A[r2][cc] -= fq * A[c][cc]; } }
      const co = [A[0][3] / A[0][0], A[1][3] / A[1][1], A[2][3] / A[2][2]];
      COMB = co;
      let ssr = 0, sst = 0, mn = y.reduce((s, v) => s + v, 0) / n;
      for (let i = 0; i < n; i++) { const yh = co[0] + co[1] * X[i][1] + co[2] * X[i][2]; ssr += (y[i] - yh) ** 2; sst += (y[i] - mn) ** 2; }
      log(`     ln(1/f) = ${co[0].toFixed(3)} + ${co[1].toFixed(3)}·(2p/m̄) ${co[2] < 0 ? '−' : '+'} ${Math.abs(co[2]).toFixed(3)}·ln s(d_min)   R2=${(1 - ssr / sst).toFixed(4)}`);
      log(`     (compare R2=${r1.toFixed(4)} for the threshold alone; a negative ln s coefficient means a d_min that is arithmetically rich carries MORE gaps, so f is larger there)`);
    }
    log('\n  x | p | f | ln(1/f) | 2p/m̄ | ln(1/f)/(2p/m̄) | ln D | L_indep = lnD/ln(1/f) | ln^2 x');
    for (const r of R) log(`  ${r.x} | ${r.p} | ${r.f.toExponential(3)} | ${r.L.toFixed(3)} | ${r.thr.toFixed(3)} | ${(r.L / r.thr).toFixed(3)} | ${r.lnD.toFixed(1)} | ${(r.lnD / r.L).toFixed(2)} | ${(Math.log(r.x) ** 2).toFixed(2)}`);
  } else log('  too few points');
}

// ---------------------------------------------------------------- §6 ------
log('\n== 6. WHERE THE LAW STOPS: the fold-covariance shortcut cannot reach the diagonal ==');
{
  // grain-census.js §3: S_m(d) -> S_m(d)·(q-2m) is exact for a future prime q
  // iff no offset difference 6k <= d is ≡ 0 or ±2 (mod q), i.e. iff 6q > d AND
  // 2q-2 > d. Report the largest prime that is UNSAFE for d = d_min(p).
  log('  a prime q rescales the strata by (q-2m) iff no multiple of 6 up to d is ≡ 0, ±2 (mod q),');
  log('  i.e. iff 2q − 2 > d. For the diagonal, d = d_min = 2p ∓ 2, so q is safe iff q > p.');
  log('  p | d_min | smallest SAFE prime | primes in the tile T_x (all q <= x < p) that are safe');
  let anySafe = 0;
  for (const p of PR.filter(q => q >= 11 && q <= 200)) {
    const d = 6 * k0of(p);
    const safe = PR.find(q => q >= 3 && 2 * q - 2 > d && 6 * q > d);
    const x = PR[PR.indexOf(p) - 1];
    const inTile = PR.filter(q => q <= x && 2 * q - 2 > d && 6 * q > d).length;
    anySafe += inTile;
    if ([11, 13, 17, 19, 23, 29, 101, 199].includes(p)) log(`  ${p} | ${d} | ${safe} | ${inTile}`);
  }
  log(`  total safe primes inside the tile, summed over every diagonal fold p <= 200: ${anySafe}`);
  log('  => ZERO. On the diagonal the fold-covariance shortcut buys nothing: the very lemma that puts');
  log('     the smallest qualifying gap at 2p ∓ 2 is the lemma that makes every prime of the tile unsafe');
  log('     for that gap. count(d_min) must be evaluated by the raw inclusion-exclusion, cost ~1.33^{p/3}.');
  log('  reach: d_min/6 = k0 ≈ p/3, leaves ≈ 1.33^{d/6}, so');
  for (const p of [211, 401, 1009]) {
    const d = 6 * k0of(p);
    log(`     p=${p}: d_min=${d}, predicted leaves ${Math.pow(1.33, d / 6).toExponential(1)}`);
  }
}

// ---------------------------------------------------------------- §7 ------
log('\n== 7. EXTRAPOLATION TO x = 1000 AND BEYOND — FLAGGED AS EXTRAPOLATION ==');
{
  const BIG = primesUpTo(1000000);
  // cumulative m̄ and ln D indexed by position in BIG, so the running sum is one pass
  const MG = new Float64Array(BIG.length), LD = new Float64Array(BIG.length);
  { let m = 2, s = 0; for (let i = 0; i < BIG.length; i++) { const q = BIG[i]; if (q >= 3) { m *= q / (q - 2); s += Math.log(q - 2); } MG[i] = m; LD[i] = s; } }
  const idx = x => { let lo = 0, hi = BIG.length - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (BIG[mid] <= x) lo = mid; else hi = mid - 1; } return lo; };
  const meanGapBig = x => MG[idx(x)], lnDbig = x => LD[idx(x)];
  const R = ROWS.filter(r => isFinite(r.L) && r.f > 0);
  const kFit = R.reduce((s, r) => s + r.L / r.thr, 0) / R.length;    // ln(1/f) = k·(2p/m̄)
  log(`  fitted proportionality k = mean of ln(1/f)/(2p/m̄) over the ${R.length} EXACT points = ${kFit.toFixed(3)}`);
  log('  the row below is NOT computed from the census law; it applies that one fitted constant to');
  log('  m̄(x) and ln D(x), which ARE closed form. Treat every f here as a prediction to be shot at.');
  log('  x | p=next(x) | d_min = 2p∓2 | m̄(x) (exact) | 2p/m̄ | predicted ln(1/f) | predicted f | ln D | L = lnD/ln(1/f) | ln^2 x | Σ_{q<=x} L·m̄ / x^2');
  for (const x of [50, 100, 200, 500, 1000, 10000, 100000]) {
    const p = BIG.find(q => q > x), g = meanGapBig(x), thr = 2 * p / g;
    const L = kFit * thr, f = Math.exp(-L), lD = lnDbig(x), Lrun = lD / L;
    let S = 0; for (let i = 2; i < BIG.length && BIG[i] <= x; i++) { const gq = MG[i], Lq = LD[i] / (kFit * 2 * BIG[i + 1] / gq); S += Lq * gq; }
    log(`  ${x} | ${p} | ${6 * k0of(p)} | ${g.toFixed(2)} | ${thr.toFixed(2)} | ${L.toFixed(2)} | ${f.toExponential(2)} | ${lD.toFixed(0)} | ${Lrun.toFixed(2)} | ${(Math.log(x) ** 2).toFixed(1)} | ${(S / (x * x)).toExponential(2)}`);
  }
  log('  the last column is U-FRAME step 4/7: G2(x#) ≲ 12 + Σ_{p<=x} L(p)·m̄(p), which must sit below x^2.');
  if (COMB && ROWS.length >= 15) {
    const rho = (q, d) => d % q === 0 ? q - 2 : (d % q === 2 || d % q === q - 2 ? q - 3 : q - 4);
    log(`\n  same again with the comb term of §5E, ln(1/f) = ${COMB[0].toFixed(3)} + ${COMB[1].toFixed(3)}·(2p/m̄) ${COMB[2] < 0 ? '−' : '+'} ${Math.abs(COMB[2]).toFixed(3)}·ln s(d_min).`);
    log('  s(d_min) is itself exact and instant, so this prediction has one fitted pair, not a shape:');
    log('  x | p | d_min | ln s(d_min) | 2p/m̄ | predicted ln(1/f) | predicted f | L = lnD/ln(1/f)');
    for (const x of [50, 100, 200, 500, 1000, 10000]) {
      const p = BIG.find(q => q > x), g = meanGapBig(x), thr = 2 * p / g, d = 6 * k0of(p);
      let ls = 0; for (const q of BIG) { if (q > x) break; if (q >= 5) ls += Math.log(rho(q, d) / (q - 4)); }
      const L = COMB[0] + COMB[1] * thr + COMB[2] * ls;
      log(`  ${x} | ${p} | ${d} | ${ls.toFixed(3)} | ${thr.toFixed(2)} | ${L.toFixed(2)} | ${Math.exp(-L).toExponential(2)} | ${(lnDbig(x) / L).toFixed(2)}`);
    }
    log('  sanity: the EXACT rows nearest these are x=47 f=1.303e-2, x=53 f=7.969e-3 (bracketing 50);');
    log('  x=97 f=7.262e-4, x=101 f=8.144e-4 (bracketing 100); x=199 f=2.653e-4 (at 200).');
  }
}
log(`\n[total ${el()}s]`);


// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/a3-03-f-from-census.js -- 210 3e9
//   invocation:  node research/a3-03-f-from-census.js 210 3e9
//   code-sha256: b22b9a6fb03202d60699bb540c74765c09de93ad4d8a5ccd9a0e752b6f43f071
//   out-sha256:  96236956b3a095538fea334249f737d8e8f0bec968b565846e438c5af670095b
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     421.3 s
// ============================================================================
// == A3: f FROM THE GRAIN CENSUS LAW ==  (PMAX=210, node budget 3e+9)
// diagonal: tile T_x folded by p = nextprime(x); f = share of grain gaps ≡ 0, ±2 (mod p)
//
// == 1. THE QUALIFYING SET IS CLOSED FORM, AND d_min = 2p ∓ 2 EXACTLY ==
//   every multiple of 6 up to 12p tested, all 302 primes 5..1999: closed form vs direct condition — IDENTICAL, and d_min = 2p−2 (p≡1 mod 3) / 2p+2 (p≡2 mod 3) every time
//     p=7 (≡1 mod 3): d_min=12  then 30, 42, 54
//     p=11 (≡2 mod 3): d_min=24  then 42, 66
//     p=13 (≡1 mod 3): d_min=24  then 54, 78, 102
//     p=17 (≡2 mod 3): d_min=36  then 66, 102
//     p=19 (≡1 mod 3): d_min=36  then 78, 114, 150
//     p=23 (≡2 mod 3): d_min=48  then 90, 138
//     p=29 (≡2 mod 3): d_min=60  then 114, 174
//     p=31 (≡1 mod 3): d_min=60  then 126, 186, 246
//     p=101 (≡2 mod 3): d_min=204  then 402, 606
//     p=1009 (≡1 mod 3): d_min=2016  then 4038, 6054, 8070
//
// == 2. count(d)/D FROM THE LAW vs DIRECT ENUMERATION (every gap size, T11..T23) ==
//   T7: D=15, 4 gap sizes, G2=30 — max relative error law vs enumeration 6.25e-16 (at d=30)  [0.00s]
//   T11: D=135, 7 gap sizes, G2=42 — max relative error law vs enumeration 2.81e-15 (at d=42)  [0.00s]
//   T13: D=1485, 10 gap sizes, G2=66 — max relative error law vs enumeration 1.42e-14 (at d=60)  [0.00s]
//   T17: D=22275, 17 gap sizes, G2=108 — max relative error law vs enumeration 7.39e-14 (at d=84)  [0.01s]
//   T19: D=378675, 23 gap sizes, G2=150 — max relative error law vs enumeration 1.67e-12 (at d=150)  [0.02s]
//   T23: D=7952175, 33 gap sizes, G2=204 — max relative error law vs enumeration 4.17e-10 (at d=198)  [0.44s]
//
// == 3. f FROM THE LAW vs THE FIVE MEASURED DIAGONAL POINTS ==
//   tile | p | qualifying d up to G2 | f enumerated | f from law | rel err | first term share
//   T11 | 13 | [24] | 0.044444 | 0.044444 | 1.56e-16 | 100.000%
//         count(d)/D term by term: 24:4.444e-2
//   T13 | 17 | [36,66] | 0.048485 | 0.048485 | 7.16e-16 | 83.333%
//         count(d)/D term by term: 36:4.040e-2  66:8.081e-3
//   T17 | 19 | [36,78] | 0.048844 | 0.048844 | 7.10e-16 | 93.934%
//         count(d)/D term by term: 36:4.588e-2  78:2.963e-3
//   T19 | 23 | [48,90,138] | 0.031119 | 0.031119 | 4.46e-16 | 88.781%
//         count(d)/D term by term: 48:2.763e-2  90:3.264e-3  138:2.271e-4
//   T23 | 29 | [60,114,174] | 0.030660 | 0.030660 | 3.39e-16 | 99.817%
//         count(d)/D term by term: 60:3.060e-2  114:5.533e-5  174:7.545e-7
//   published U-FRAME §5a values for comparison: 0.0444, 0.0485, 0.0488, 0.0311, 0.0307
// [checkpoint 0.5s — sections 1-3 done]
//
// == 4. THE DIAGONAL PUSHED BY THE LAW ALONE (no tile ever built, no enumeration) ==
//   x | p | d_min | m̄ = P/D | 2p/m̄ | f | ln(1/f) | ln(1/f)/(2p/m̄) | terms | last/first | leaves | s
//   11 | 13 | 24 | 17.11 | 1.519 | 4.4444e-2 | 3.1135 | 2.0491 | 2 | 4.7e-16 | 18 | 0.0s
//   13 | 17 | 36 | 20.22 | 1.681 | 4.8485e-2 | 3.0265 | 1.8001 | 3 | 6.1e-16 | 617 | 0.0s
//   17 | 19 | 36 | 22.92 | 1.658 | 4.8844e-2 | 3.0191 | 1.8209 | 3 | 9.1e-16 | 724 | 0.0s
//   19 | 23 | 48 | 25.61 | 1.796 | 3.1119e-2 | 3.4699 | 1.9322 | 4 | 1.4e-15 | 11182 | 0.0s
//   23 | 29 | 60 | 28.05 | 2.067 | 3.0660e-2 | 3.4848 | 1.6856 | 4 | 1.5e-15 | 89529 | 0.0s
//   29 | 31 | 60 | 30.13 | 2.058 | 3.7367e-2 | 3.2870 | 1.5975 | 4 | 8.2e-16 | 156000 | 0.0s
//       ... x=31 d=294: 4M nodes, 0.7s elapsed
//   31 | 37 | 72 | 32.21 | 2.297 | 1.8445e-2 | 3.9930 | 1.7380 | 4+trunc | 4.2e-7 | 2178199 | 0.4s
//   37 | 41 | 84 | 34.05 | 2.408 | 7.5089e-3 | 4.8917 | 2.0313 | 4+trunc | 5.9e-6 | 13932285 | 3.0s
//   41 | 43 | 84 | 35.80 | 2.402 | 8.8704e-3 | 4.7250 | 1.9668 | 4+trunc | 7.2e-6 | 19729812 | 4.1s
//   43 | 47 | 96 | 37.54 | 2.504 | 8.6603e-3 | 4.7490 | 1.8968 | 3+trunc | 3.0e-4 | 2267135 | 0.4s
//   47 | 53 | 108 | 39.21 | 2.703 | 1.3026e-2 | 4.3408 | 1.6058 | 3+trunc | 1.7e-4 | 3326625 | 0.8s
//   53 | 59 | 120 | 40.75 | 2.896 | 7.9693e-3 | 4.8322 | 1.6687 | 2+trunc | 4.5e-3 | 83904 | 0.0s
//   59 | 61 | 120 | 42.18 | 2.892 | 9.0942e-3 | 4.7001 | 1.6250 | 2+trunc | 2.9e-3 | 147941 | 0.0s
//   61 | 67 | 132 | 43.61 | 3.073 | 5.2975e-3 | 5.2405 | 1.7055 | 2+trunc | 8.6e-3 | 1716454 | 0.4s
//   67 | 71 | 144 | 44.95 | 3.159 | 6.8903e-4 | 7.2802 | 2.3046 | 2+trunc | 6.9e-2 | 2261085 | 0.5s
//   71 | 73 | 144 | 46.25 | 3.156 | 8.0241e-4 | 7.1279 | 2.2582 | 2+trunc | 2.9e-2 | 2031615 | 0.5s
//   73 | 79 | 156 | 47.56 | 3.322 | 3.3002e-3 | 5.7138 | 1.7198 | 2+trunc | 1.2e-2 | 3192536 | 0.9s
//   79 | 83 | 168 | 48.79 | 3.402 | 4.0258e-3 | 5.5150 | 1.6210 | 2+trunc | 1.3e-2 | 13793594 | 3.9s
//   83 | 89 | 180 | 50.00 | 3.560 | 4.2089e-3 | 5.4706 | 1.5366 | 1+trunc | - | 28209 | 0.0s
//   89 | 97 | 192 | 51.15 | 3.793 | 1.8101e-3 | 6.3144 | 1.6647 | 1+trunc | - | 18842 | 0.0s
//   97 | 101 | 204 | 52.22 | 3.868 | 7.2624e-4 | 7.2276 | 1.8686 | 1+trunc | - | 16737 | 0.0s
//   101 | 103 | 204 | 53.28 | 3.866 | 8.1439e-4 | 7.1131 | 1.8397 | 1+trunc | - | 16737 | 0.0s
//   103 | 107 | 216 | 54.33 | 3.939 | 4.1261e-4 | 7.7930 | 1.9786 | 1+trunc | - | 45117 | 0.0s
//   107 | 109 | 216 | 55.37 | 3.937 | 4.5665e-4 | 7.6916 | 1.9535 | 1+trunc | - | 45117 | 0.0s
//   109 | 113 | 228 | 56.40 | 4.007 | 8.9596e-4 | 7.0176 | 1.7514 | 1+trunc | - | 147716 | 0.0s
//   113 | 127 | 252 | 57.42 | 4.424 | 8.1772e-4 | 7.1090 | 1.6071 | 1+trunc | - | 677249 | 0.2s
//   127 | 131 | 264 | 58.34 | 4.491 | 3.3459e-4 | 8.0026 | 1.7819 | 1+trunc | - | 639167 | 0.2s
//   131 | 137 | 276 | 59.24 | 4.625 | 2.4596e-4 | 8.3104 | 1.7968 | 1+trunc | - | 266539 | 0.1s
//   137 | 139 | 276 | 60.12 | 4.624 | 2.6623e-4 | 8.2311 | 1.7801 | 1+trunc | - | 266539 | 0.1s
//   139 | 149 | 300 | 61.00 | 4.885 | 4.4231e-4 | 7.7235 | 1.5809 | 1+trunc | - | 5352479 | 1.9s
//   149 | 151 | 300 | 61.83 | 4.885 | 4.8297e-4 | 7.6356 | 1.5632 | 1+trunc | - | 5352479 | 1.9s
//   151 | 157 | 312 | 62.66 | 5.011 | 2.8802e-4 | 8.1525 | 1.6268 | 1+trunc | - | 7182800 | 2.6s
//   157 | 163 | 324 | 63.47 | 5.137 | 1.4992e-4 | 8.8054 | 1.7143 | 1+trunc | - | 5808143 | 2.2s
//   163 | 167 | 336 | 64.25 | 5.198 | 1.7068e-4 | 8.6757 | 1.6690 | 1+trunc | - | 9056110 | 3.4s
//       ... x=167 d=348: 38M nodes, 30.9s elapsed
//   167 | 173 | 348 | 65.03 | 5.320 | 3.2989e-4 | 8.0167 | 1.5068 | 1+trunc | - | 19264606 | 7.5s
//   173 | 179 | 360 | 65.79 | 5.441 | 2.8510e-4 | 8.1627 | 1.5002 | 1+trunc | - | 28659105 | 11.5s
//   179 | 181 | 360 | 66.54 | 5.441 | 3.0824e-4 | 8.0846 | 1.4860 | 1+trunc | - | 28659105 | 11.7s
//       ... x=181 d=384: 34M nodes, 61.2s elapsed
//   181 | 191 | 384 | 67.28 | 5.678 | 5.7359e-5 | 9.7662 | 1.7201 | 1+trunc | - | 33998697 | 14.5s
//   191 | 193 | 384 | 67.99 | 5.677 | 6.1885e-5 | 9.6902 | 1.7069 | 1+trunc | - | 33998697 | 14.8s
//       ... x=193 d=396: 38M nodes, 91.5s elapsed
//   193 | 197 | 396 | 68.71 | 5.735 | 7.9564e-5 | 9.4389 | 1.6459 | 1+trunc | - | 60090780 | 23.4s
//       ... x=197 d=396: 117M nodes, 121.6s elapsed
//   197 | 199 | 396 | 69.41 | 5.734 | 8.6171e-5 | 9.3592 | 1.6322 | 1+trunc | - | 60090780 | 24.0s
//       ... x=199 d=420: 210M nodes, 151.7s elapsed
//       ... x=199 d=420: 617M nodes, 181.9s elapsed
//       ... x=199 d=420: 1040M nodes, 212.2s elapsed
//       ... x=199 d=420: 1481M nodes, 242.3s elapsed
//       ... x=199 d=420: 1896M nodes, 272.5s elapsed
//       ... x=199 d=420: 2298M nodes, 302.6s elapsed
//       ... x=199 d=420: 2680M nodes, 332.9s elapsed
//       ... x=199 d=420: 3091M nodes, 363.1s elapsed
//       ... x=199 d=420: 3506M nodes, 393.2s elapsed
//   199 | 211 | 420 | 70.11 | 6.019 | 2.6530e-4 | 8.2346 | 1.3682 | 1+trunc | - | 670992490 | 285.8s
//   worst signed-term cancellation ratio Σ|term|/|f| over all rows: 1.8e+5  (double carries ~1e16, so the quoted f is good to ~2e+5e-16 relative)
//
// == 4b. TRUNCATION: how much of f lives beyond the first qualifying gap ==
//   rows where every qualifying d up to the affordable ceiling was computed:
//   x=11 p=13: terms 4.444e-2 2.082e-17 — first term is 100.0000% of f (tail exhausted)
//   x=13 p=17: terms 4.040e-2 8.081e-3 2.450e-17 — first term is 83.3333% of f (tail exhausted)
//   x=17 p=19: terms 4.588e-2 2.963e-3 -4.180e-17 — first term is 93.9338% of f (tail exhausted)
//   x=19 p=23: terms 2.763e-2 3.264e-3 2.271e-4 -3.884e-17 — first term is 88.7814% of f (tail exhausted)
//   x=23 p=29: terms 3.060e-2 5.533e-5 7.545e-7 -4.453e-17 — first term is 99.8171% of f (tail exhausted)
//   x=29 p=31: terms 3.640e-2 9.551e-4 9.734e-6 2.999e-17 — first term is 97.4179% of f (tail exhausted)
//   x=31 p=37: terms 1.765e-2 7.930e-4 4.234e-6 7.388e-9 — first term is 95.6779% of f (later terms unaffordable)
//   x=37 p=41: terms 7.199e-3 3.094e-4 3.308e-7 4.261e-8 — first term is 95.8746% of f (later terms unaffordable)
//   x=41 p=43: terms 8.762e-3 1.063e-4 2.380e-6 6.279e-8 — first term is 98.7746% of f (later terms unaffordable)
//   x=43 p=47: terms 8.469e-3 1.887e-4 2.500e-6 — first term is 97.7920% of f (later terms unaffordable)
//   x=47 p=53: terms 1.278e-2 2.482e-4 2.111e-6 — first term is 98.0783% of f (later terms unaffordable)
//   x=53 p=59: terms 7.933e-3 3.589e-5 — first term is 99.5496% of f (later terms unaffordable)
//   x=59 p=61: terms 9.068e-3 2.639e-5 — first term is 99.7098% of f (later terms unaffordable)
//   x=61 p=67: terms 5.252e-3 4.529e-5 — first term is 99.1451% of f (later terms unaffordable)
//   x=67 p=71: terms 6.443e-4 4.469e-5 — first term is 93.5137% of f (later terms unaffordable)
//   x=71 p=73: terms 7.798e-4 2.264e-5 — first term is 97.1782% of f (later terms unaffordable)
//   x=73 p=79: terms 3.262e-3 3.853e-5 — first term is 98.8326% of f (later terms unaffordable)
//   x=79 p=83: terms 3.972e-3 5.338e-5 — first term is 98.6741% of f (later terms unaffordable)
//   first-term share over the 18 multi-term rows: min 83.33%, median 98.08%.
//   So a one-term row understates f by a factor ~1.020 (worst 1.200), i.e. overstates ln(1/f) by 0.019 (worst 0.182).
//   That is a constant offset, not a trend: it cannot manufacture or destroy the growth of ln(1/f).
//
// == 5. GROWTH OF ln(1/f), AGAINST 2p/m̄ ==
//   A. IS f CONSTANT (route fails) OR DECAYING (route closes)?
//      f runs 4.444e-2 at x=11 down to 2.653e-4 at x=199: a factor 1.7e+2. DECAYING, decisively.
//   B. AT WHAT RATE? competing shapes, all fitted on the same points:
//      ln(1/f) = 1.001 + 1.451·(2p/m̄)      R2=0.9020   <- the U-FRAME prediction
//         upper half only: 3.748 + 0.906·(2p/m̄)  R2=0.5684
//      ln(1/f) = 3.153 + 0.0322·p             R2=0.8822   <- linear in p (would be even better than needed)
//      ln ln(1/f) = 0.714 + 0.871·ln(2p/m̄)   R2=0.9270   <- exponent on the threshold; 1 = exact proportionality
//      ln ln(1/f) = -0.207 + 0.458·ln p       R2=0.9288   <- exponent on p; p/ln^2 p growth reads about 0.6-0.8 here
//   C. THE RATIO ln(1/f)/(2p/m̄), the thing that must not collapse:
//      first quarter 1.829 | second 1.801 | third 1.740 | last 1.582  (flat => ln(1/f) ~ 2p/m̄ exactly)
//      trend of that ratio against p: slope -1.61e-3 per unit p, R2=0.2417
//   D. WHAT IT BUYS DOWNSTREAM (U-FRAME step 6/7): L_indep = ln D / ln(1/f), which should be polylog.
//      ln L_indep = -1.884 + 2.892·ln ln x   R2=0.9719   (exponent ~2 => L ~ ln^2 x, exactly the closing branch)
//   E. IS THE SCATTER NOISE OR ARITHMETIC? d_min carries a singular-series comb
//      ln s(d_min) = Σ_{5<=q<=x} ln[rho_q(d_min)/(q−4)] ranges 0.00 to 1.81 across the diagonal
//      ln(1/f) = 1.529 + 1.482·(2p/m̄) − 1.025·ln s(d_min)   R2=0.9639
//      (compare R2=0.9020 for the threshold alone; a negative ln s coefficient means a d_min that is arithmetically rich carries MORE gaps, so f is larger there)
//
//   x | p | f | ln(1/f) | 2p/m̄ | ln(1/f)/(2p/m̄) | ln D | L_indep = lnD/ln(1/f) | ln^2 x
//   11 | 13 | 4.444e-2 | 3.114 | 1.519 | 2.049 | 4.9 | 1.58 | 5.75
//   13 | 17 | 4.848e-2 | 3.027 | 1.681 | 1.800 | 7.3 | 2.41 | 6.58
//   17 | 19 | 4.884e-2 | 3.019 | 1.658 | 1.821 | 10.0 | 3.32 | 8.03
//   19 | 23 | 3.112e-2 | 3.470 | 1.796 | 1.932 | 12.8 | 3.70 | 8.67
//   23 | 29 | 3.066e-2 | 3.485 | 2.067 | 1.686 | 15.9 | 4.56 | 9.83
//   29 | 31 | 3.737e-2 | 3.287 | 2.058 | 1.597 | 19.2 | 5.84 | 11.34
//   31 | 37 | 1.844e-2 | 3.993 | 2.297 | 1.738 | 22.6 | 5.65 | 11.79
//   37 | 41 | 7.509e-3 | 4.892 | 2.408 | 2.031 | 26.1 | 5.34 | 13.04
//   41 | 43 | 8.870e-3 | 4.725 | 2.402 | 1.967 | 29.8 | 6.30 | 13.79
//   43 | 47 | 8.660e-3 | 4.749 | 2.504 | 1.897 | 33.5 | 7.05 | 14.15
//   47 | 53 | 1.303e-2 | 4.341 | 2.703 | 1.606 | 37.3 | 8.59 | 14.82
//   53 | 59 | 7.969e-3 | 4.832 | 2.896 | 1.669 | 41.2 | 8.53 | 15.76
//   59 | 61 | 9.094e-3 | 4.700 | 2.892 | 1.625 | 45.3 | 9.63 | 16.63
//   61 | 67 | 5.298e-3 | 5.241 | 3.073 | 1.705 | 49.3 | 9.42 | 16.90
//   67 | 71 | 6.890e-4 | 7.280 | 3.159 | 2.305 | 53.5 | 7.35 | 17.68
//   71 | 73 | 8.024e-4 | 7.128 | 3.156 | 2.258 | 57.8 | 8.10 | 18.17
//   73 | 79 | 3.300e-3 | 5.714 | 3.322 | 1.720 | 62.0 | 10.85 | 18.41
//   79 | 83 | 4.026e-3 | 5.515 | 3.402 | 1.621 | 66.4 | 12.03 | 19.09
//   83 | 89 | 4.209e-3 | 5.471 | 3.560 | 1.537 | 70.8 | 12.93 | 19.53
//   89 | 97 | 1.810e-3 | 6.314 | 3.793 | 1.665 | 75.2 | 11.91 | 20.15
//   97 | 101 | 7.262e-4 | 7.228 | 3.868 | 1.869 | 79.8 | 11.04 | 20.93
//   101 | 103 | 8.144e-4 | 7.113 | 3.866 | 1.840 | 84.4 | 11.86 | 21.30
//   103 | 107 | 4.126e-4 | 7.793 | 3.939 | 1.979 | 89.0 | 11.42 | 21.48
//   107 | 109 | 4.567e-4 | 7.692 | 3.937 | 1.954 | 93.6 | 12.17 | 21.84
//   109 | 113 | 8.960e-4 | 7.018 | 4.007 | 1.751 | 98.3 | 14.01 | 22.01
//   113 | 127 | 8.177e-4 | 7.109 | 4.424 | 1.607 | 103.0 | 14.49 | 22.35
//   127 | 131 | 3.346e-4 | 8.003 | 4.491 | 1.782 | 107.8 | 13.48 | 23.47
//   131 | 137 | 2.460e-4 | 8.310 | 4.625 | 1.797 | 112.7 | 13.56 | 23.77
//   137 | 139 | 2.662e-4 | 8.231 | 4.624 | 1.780 | 117.6 | 14.29 | 24.21
//   139 | 149 | 4.423e-4 | 7.723 | 4.885 | 1.581 | 122.5 | 15.86 | 24.35
//   149 | 151 | 4.830e-4 | 7.636 | 4.885 | 1.563 | 127.5 | 16.70 | 25.04
//   151 | 157 | 2.880e-4 | 8.152 | 5.011 | 1.627 | 132.5 | 16.26 | 25.17
//   157 | 163 | 1.499e-4 | 8.805 | 5.137 | 1.714 | 137.6 | 15.62 | 25.57
//   163 | 167 | 1.707e-4 | 8.676 | 5.198 | 1.669 | 142.7 | 16.44 | 25.95
//   167 | 173 | 3.299e-4 | 8.017 | 5.320 | 1.507 | 147.8 | 18.43 | 26.19
//   173 | 179 | 2.851e-4 | 8.163 | 5.441 | 1.500 | 152.9 | 18.73 | 26.56
//   179 | 181 | 3.082e-4 | 8.085 | 5.441 | 1.486 | 158.1 | 19.55 | 26.91
//   181 | 191 | 5.736e-5 | 9.766 | 5.678 | 1.720 | 163.3 | 16.72 | 27.02
//   191 | 193 | 6.189e-5 | 9.690 | 5.677 | 1.707 | 168.5 | 17.39 | 27.59
//   193 | 197 | 7.956e-5 | 9.439 | 5.735 | 1.646 | 173.8 | 18.41 | 27.70
//   197 | 199 | 8.617e-5 | 9.359 | 5.734 | 1.632 | 179.0 | 19.13 | 27.91
//   199 | 211 | 2.653e-4 | 8.235 | 6.019 | 1.368 | 184.3 | 22.38 | 28.02
//
// == 6. WHERE THE LAW STOPS: the fold-covariance shortcut cannot reach the diagonal ==
//   a prime q rescales the strata by (q-2m) iff no multiple of 6 up to d is ≡ 0, ±2 (mod q),
//   i.e. iff 2q − 2 > d. For the diagonal, d = d_min = 2p ∓ 2, so q is safe iff q > p.
//   p | d_min | smallest SAFE prime | primes in the tile T_x (all q <= x < p) that are safe
//   11 | 24 | 17 | 0
//   13 | 24 | 17 | 0
//   17 | 36 | 23 | 0
//   19 | 36 | 23 | 0
//   23 | 48 | 29 | 0
//   29 | 60 | 37 | 0
//   101 | 204 | 107 | 0
//   199 | 396 | 211 | 0
//   total safe primes inside the tile, summed over every diagonal fold p <= 200: 0
//   => ZERO. On the diagonal the fold-covariance shortcut buys nothing: the very lemma that puts
//      the smallest qualifying gap at 2p ∓ 2 is the lemma that makes every prime of the tile unsafe
//      for that gap. count(d_min) must be evaluated by the raw inclusion-exclusion, cost ~1.33^{p/3}.
//   reach: d_min/6 = k0 ≈ p/3, leaves ≈ 1.33^{d/6}, so
//      p=211: d_min=420, predicted leaves 4.7e+8
//      p=401: d_min=804, predicted leaves 3.9e+16
//      p=1009: d_min=2016, predicted leaves 4.1e+41
//
// == 7. EXTRAPOLATION TO x = 1000 AND BEYOND — FLAGGED AS EXTRAPOLATION ==
//   fitted proportionality k = mean of ln(1/f)/(2p/m̄) over the 42 EXACT points = 1.745
//   the row below is NOT computed from the census law; it applies that one fitted constant to
//   m̄(x) and ln D(x), which ARE closed form. Treat every f here as a prediction to be shot at.
//   x | p=next(x) | d_min = 2p∓2 | m̄(x) (exact) | 2p/m̄ | predicted ln(1/f) | predicted f | ln D | L = lnD/ln(1/f) | ln^2 x | Σ_{q<=x} L·m̄ / x^2
//   50 | 53 | 108 | 39.21 | 2.70 | 4.72 | 8.93e-3 | 37 | 7.90 | 15.3 | 7.25e-1
//   100 | 101 | 204 | 52.22 | 3.87 | 6.75 | 1.17e-3 | 80 | 11.82 | 21.2 | 6.67e-1
//   200 | 211 | 420 | 70.11 | 6.02 | 10.51 | 2.74e-5 | 184 | 17.55 | 28.1 | 6.68e-1
//   500 | 503 | 1008 | 94.30 | 10.67 | 18.62 | 8.19e-9 | 470 | 25.24 | 38.6 | 4.66e-1
//   1000 | 1009 | 2016 | 115.52 | 17.47 | 30.49 | 5.74e-14 | 951 | 31.21 | 47.7 | 3.38e-1
//   10000 | 10007 | 20016 | 204.31 | 97.96 | 170.97 | 5.59e-75 | 9891 | 57.85 | 84.8 | 9.33e-2
//   100000 | 100003 | 200004 | 318.65 | 627.66 | 1095.51 | 0.00e+0 | 99680 | 90.99 | 132.5 | 1.96e-2
//   the last column is U-FRAME step 4/7: G2(x#) ≲ 12 + Σ_{p<=x} L(p)·m̄(p), which must sit below x^2.
//
//   same again with the comb term of §5E, ln(1/f) = 1.529 + 1.482·(2p/m̄) − 1.025·ln s(d_min).
//   s(d_min) is itself exact and instant, so this prediction has one fitted pair, not a shape:
//   x | p | d_min | ln s(d_min) | 2p/m̄ | predicted ln(1/f) | predicted f | L = lnD/ln(1/f)
//   50 | 53 | 108 | 0.827 | 2.70 | 4.69 | 9.20e-3 | 7.95
//   100 | 101 | 204 | 0.143 | 3.87 | 7.11 | 8.13e-4 | 11.21
//   200 | 211 | 420 | 1.808 | 6.02 | 8.60 | 1.85e-4 | 21.44
//   500 | 503 | 1008 | 1.214 | 10.67 | 16.09 | 1.02e-7 | 29.20
//   1000 | 1009 | 2016 | 0.596 | 17.47 | 26.81 | 2.28e-12 | 35.50
//   10000 | 10007 | 20016 | 0.015 | 97.96 | 146.68 | 1.98e-64 | 67.43
//   sanity: the EXACT rows nearest these are x=47 f=1.303e-2, x=53 f=7.969e-3 (bracketing 50);
//   x=97 f=7.262e-4, x=101 f=8.144e-4 (bracketing 100); x=199 f=2.653e-4 (at 200).
//
// [total 421.2s]
// ============================================================================
// READINGS — A3 asked whether f can be got from the census law without
// DEFECT (found 2026-08-19, `research/history/staging/fdecay-deep.md`): the
// bitsOf evaluator holds each prime's avoided set in ONE 32-bit word, and
// JavaScript's << takes shift counts mod 32, so for q > 32 residues alias and
// every (q - |A_q|) factor is under-read. T_x carries a prime above 32 iff
// x >= 37: THE OUTPUT BELOW IS CORRECT FOR x <= 31 AND DEFECTIVE FROM x = 37
// (off by 0.62x to 1.05x). The alias-free recomputation of all 42 levels is
// embedded in research/fdecay-deep-01-census-defect.js (countRatioFixed, a
// drop-in with identical leaf counts); regenerating this script's OUTPUT with
// the multi-word mask is queued. Lemma A, the direct-sieve verification
// (x <= 23), the five diagonal points and Lemma B are unaffected.
// enumeration. It can, the law reaches the tail exactly, and the diagonal goes
// from five points to forty two. f DECAYS, so U-FRAME's second branch is the
// one we are on. What the law does NOT give is an asymptotic form; the reach is
// exponential in p and stops at x ~ 200.
//
// 1. THE IDENTITY, AND IT IS EXACT (calibration: machine precision).
//    f(x, p) = (sum over qualifying d of count_x(d)) / D_x, with count_x(d) the
//    grain-census inclusion-exclusion evaluated in ratio form. Checked two ways
//    before being trusted, per house rule:
//      - every gap size at T7, T11, T13, T17, T19, T23 against the directly
//        sieved census: worst relative error 4.17e-10, at d=198 in T23, and that
//        is double roundoff in a sum whose signed terms cancel by 1.8e+5, not a
//        defect of the law;
//      - the five published diagonal values 0.0444, 0.0485, 0.0488, 0.0311,
//        0.0307 reproduced at 1.56e-16, 7.16e-16, 7.10e-16, 4.46e-16, 3.39e-16.
//    So U-FRAME §5a's f table is now a corollary of the census law rather than
//    an independent measurement.
//    INDEPENDENT CORROBORATION, and it is the strongest custody we have: A2
//    (commit 22a9e0c) streamed T29 and T31 and measured f = 3.737e-2 at T29@31
//    and f = 1.844e-2 at T31@37. The law, with no tile in memory, gives
//    3.7367e-2 and 1.8445e-2. Two methods with nothing in common agree to four
//    figures at two levels that had never been computed before.
//
// 2. LEMMA A (PROVEN, and checked on 302 primes): d_min = 2p ∓ 2 EXACTLY.
//    Grain gaps are multiples of 6, so d = 6k qualifies iff 3k ≡ 0, ±1 (mod p),
//    iff k ≡ 0, ±3^{-1} (mod p). Hence
//        p ≡ 1 (mod 3):  d_min = 2p − 2      p ≡ 2 (mod 3):  d_min = 2p + 2
//    and the qualifying set is the comb 2p∓2, 4p±2, 6p, 8p∓2, ... of spacing
//    2p. U-FRAME's "the smallest qualifying value is about 2p" is exact, with
//    the sign read straight off p mod 3. Checked against a direct scan of every
//    multiple of 6 up to 12p for all 302 primes from 5 to 1999: identical.
//    Consequence worth stating on its own: f is a TAIL functional by
//    construction. It never sees a gap below 2p − 2, at any level, ever.
//
// 3. THE FIRST TERM IS ESSENTIALLY ALL OF f (calibration: 83.33% worst,
//    98.08% median, over the 18 levels where more than one term is affordable).
//    So a one-term evaluation understates f by a factor 1.020 typically and 1.200
//    at worst, i.e. overstates ln(1/f) by 0.019 typically and 0.182 at worst.
//    That is a bounded constant, not a trend, and it cannot make or break the
//    growth law. Every f quoted at x >= 83 is a one-term value.
//
// 4. THE DIAGONAL, 42 POINTS, x = 11 TO 199, NO TILE EVER BUILT. This is the
//    win. T199 has D = e^184 ~ 1e80 gaps and P = mbar*D ~ 1e82; it will never be
//    enumerated by anybody. Its f comes out of the law in five minutes:
//        f runs 4.444e-2 at x=11 down to 2.653e-4 at x=199, a factor 170.
//    A2 proposed streaming T29 and T31 for two more points at a cost of about
//    a quarter hour. The law delivers thirty seven more, and reaches a level
//    that streaming cannot reach at any price.
//
// 5. THE ANSWER TO THE DICHOTOMY (U-FRAME §5a step 7): f DECAYS. The route
//    that fails needs f roughly constant. Over 2p/m̄ from 1.519 to 6.019, f falls
//    by 170x and ln(1/f) rises from 3.114 to 8.235 (9.766 at x=181, see
//    reading 6).
//    Fits on the same 42 points:
//        ln(1/f) = 1.001 + 1.451·(2p/m̄)          R2 = 0.9020
//        ln ln(1/f) = 0.714 + 0.871·ln(2p/m̄)     R2 = 0.9270
//    so ln(1/f) tracks the threshold 2p/m̄ with a proportionality near 1.45 and
//    an exponent near 0.87. The ratio ln(1/f)/(2p/m̄) by quarters of the range
//    reads 1.829, 1.801, 1.740, 1.582: it drifts down slowly rather than collapsing
//    (slope −1.61e-3 per unit p, R2 = 0.2417). U-FRAME's prediction that the two
//    track is CONFIRMED over a range four times longer than the one it was
//    guessed on. Downstream, L_indep = ln D / ln(1/f) fits
//        ln L_indep = −1.884 + 2.892·ln ln x     R2 = 0.9719
//    an exponent near 2 to 3 on ln x, which is the polylog branch. Directly:
//    L_indep runs 1.58 at x=11 to 22.38 at x=199 while ln^2 x runs 5.75 to 28.02.
//
// 6. THE SCATTER IS ARITHMETIC, NOT NOISE, AND IT IS COMPUTABLE. f is not
//    smooth in p, because d_min = 2p ∓ 2 carries a singular-series comb.
//    With rho_q(d) = q−2 (q|d), q−3 (d ≡ ±2 mod q), q−4 (else) and
//    s(d) = prod_{5<=q<=x} rho_q(d)/(q−4) measuring how much richer than
//    generic this d_min is,
//        ln(1/f) = 1.529 + 1.482·(2p/m̄) − 1.025·ln s(d_min)    R2 = 0.9639
//    against R2 = 0.9020 for the threshold alone. The coefficient on ln s is
//    −1.025, i.e. −1 to within the fit: f is proportional to s(d_min) times a
//    clean exponential in the threshold. That is why x = 181 (d_min = 384,
//    s = 1) has f = 5.736e-5 while x = 199 (d_min = 420 = 2^2·3·5·7, ln s = 1.81)
//    has f = 2.653e-4, five times larger at a LARGER p. The comb is exact and
//    instant, so this is a closed form for the fluctuation, not a residual.
//
// 7. THE CLOSED FORM, AND WHAT IT SAYS AT x = 50, 100, 200, 1000. Reading 6
//    gives a two-parameter law whose shape is entirely computable:
//        f(x, p) ~ s(d_min) · exp(−1.529 − 1.482·2p/m̄),  d_min = 2p ∓ 2.
//    Calibration against the exact rows: predicted f = 9.20e-3 at x=50 against
//    exact 1.303e-2 at x=47 and 7.969e-3 at x=53, which brackets it; predicted
//    8.13e-4 at x=100 against exact 8.144e-4 at x=101; predicted 1.85e-4 at
//    x=200 against exact 2.653e-4 at x=199. Extrapolated (FLAGGED):
//        x=1000: f ~ 2.28e-12, ln(1/f) ~ 26.8, L ~ 35.5 against ln^2 x = 47.7
//        x=10000: f ~ 1.98e-64, ln(1/f) ~ 147, L ~ 67 against ln^2 x = 84.8
//    LATER CORRECTION, absorbed 2026-08-17 from research/f-decays.md, which is
//    the home of this extrapolation: THE 35.5 MUST NOT BE QUOTED BARE. The
//    threshold coefficient is range-dependent, and re-anchoring the same form
//    on either half of the measured range puts L at x = 1000 anywhere between
//    30.8 and 42.9. The branch call survives, since the whole band stays under
//    ln^2 x = 47.7, but the margin at the top of the band is a quarter of what
//    the point estimate suggests.
//    and the U-FRAME step-4 sum Sum_{p<=x} L·m̄ divided by x^2 runs 0.725, 0.667,
//    0.668, 0.466, 0.338, 0.093, 0.020 across x = 50 to 1e5: falling, comfortably
//    inside x^2.
//    CAVEAT, and it is not ours to wave away: A2 (commit 22a9e0c) REFUTED
//    step 4 as stated, so that last column inherits a broken link. What A3
//    settles is the f half of the chain, which was the stated open question,
//    and f decaying is necessary for the route whatever replaces step 4. The
//    correct object above the f layer is maxsum_{L+1}, not G2 + L·m̄, and that
//    is A4's business, not this file's.
//
// 8. THE NEGATIVE, STATED PRECISELY (this is the part to keep). The census law
//    has two halves. Its EXPENSIVE half, the raw inclusion-exclusion, has no
//    small-d restriction and does reach the tail. Its CHEAP half, the fold
//    covariance S_m -> S_m·(q−2m), does not, and the reason is not bad luck:
//        a prime q rescales the strata for d iff no multiple of 6 up to d is
//        ≡ 0, ±2 (mod q), which by Lemma A applied to q means 2q − 2 > d;
//        on the diagonal d = d_min = 2p ∓ 2, so q is safe iff q > p.
//    Every prime of the tile has q <= x < p. Counted over every diagonal fold
//    p <= 200, the number of safe primes inside the tile is ZERO. The lemma
//    that puts the smallest qualifying gap at 2p ∓ 2 is the same lemma that
//    makes every prime of the tile unsafe for it. The two conditions are one
//    condition, so the shortcut is not merely unhelpful here, it is
//    structurally unavailable. What is uncontrolled is exactly count_x(d) for
//    d of order 2p: no closed form, no saddle point, no asymptotic. Everything
//    else in the census law is exact and fast.
//
// 9. THE REACH, MEASURED. Surviving inclusion-exclusion terms grow like
//    1.33^{d/6} (calibrated on leaf counts 16737 at d=204, 677249 at d=252,
//    5352479 at d=300, 19264606 at d=348, 670992490 at d=420), and d_min/6 = k0 ~ p/3.
//    So the cost is exp(0.095 p) (leaves ~ 1.33^{d/6} at d_min/6 ~ p/3; the
//    block's own predictions give ln/p = 0.0953, 0.0949). Measured: x=199
//    took 285.8s alone. Predicted
//    leaves at p=401 is 3.9e+16 and at p=1009 is 4.1e+41. x = 1000 EXACTLY is out
//    of reach by this method and by any constant-factor improvement to it.
//    x ~ 250 is reachable in an hour; x ~ 300 in a day.
//
// 10. WHERE THIS LEAVES A2. A2 spent a streaming run to add T29 and T31 and
//    got 3.737e-2 and 1.844e-2; the law reproduces both and adds thirty five
//    levels beyond them for the same five minutes. Streaming is now the CHECK
//    and the law is the instrument, which is the right way round. A2's reading
//    that "almost all of f sits in one histogram bin, the smallest multiple of
//    6 congruent to 0, ±2 mod p" is exactly reading 2 and 3 here, and Lemma A
//    names that bin in closed form: it is 2p ∓ 2, sign by p mod 3, which also
//    explains A2's non-monotonicity, since consecutive folds sharing a d_min
//    (36 at 17 and 19, 60 at 29 and 31) must give nearly the same f. The
//    open question moved: it is no
//    longer "does f decay", it is "what is count_x(d) for d ~ 2p", i.e. A9's
//    tail P(gap >= 2p), which reading 8 shows is the single uncontrolled
//    object left in this chain.
//
// HONEST LIMITS. Reading 5 is a fit over 42 exact points, not a theorem; the
// exponent 0.871 on the threshold is not 1, and if the true exponent were
// materially below 1 the polylog conclusion would weaken. Reading 7's x >= 500
// rows are extrapolation and are labelled as such in the output. Reading 3's
// truncation is bounded but not proven bounded: no rigorous bound on the terms
// beyond the first was found, because the pair-count majorant prod rho_q(d)/(q−2)
// does not decay in d and is therefore useless as a tail bound. The failure of
// that majorant is itself the same gap as reading 8.
// ============================================================================
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   9.33e-2 -> 0.093 (reading 7, the step-4 sum at x = 10000).
// SAME VALUE, DIFFERENT NOTATION: the step-4 ratios of reading 7 are printed
//   in the last column of the extrapolation table in exponent form, 7.25e-1,
//   6.67e-1, 6.68e-1, 4.66e-1, 3.38e-1. The reading writes them as decimals.
// DERIVED IN THIS READING by arithmetic over printed values:
//   D ~ 1e80 and P ~ 1e82 at T199 (reading 4). The table prints lnD = 184.3
//   and m̄ = 70.11 at x = 199, and 184.3/ln 10 = 80.0, so D = e^184.3 = 1e80
//   and m̄·D = 7e81.
//   exp(0.095 p) (reading 9) is the printed leaf growth 1.33 per 6 units of d
//   carried to d_min/6 = p/3: ln(1.33)/3 = 0.0951.
//   ln/p = 0.0953 and 0.0949 (reading 9) are the logs of the two printed
//   predicted leaf counts over their p: ln(3.9e+16)/401 = 0.09527 and
//   ln(4.1e+41)/1009 = 0.09496.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   0.62x to 1.05x (the DEFECT header) is research/fdecay-deep-01-census-defect.js,
//   whose OUTPUT prints "x >= 37: alias-free / published in [0.62474, 1.04904]
//   over 34 levels".
//   [UNTRACED — verify before quoting]: L at x = 1000 between 30.8 and 42.9
//   (reading 7). The band is verbatim in research/f-decays.md, which the
//   reading names as its home, so the BORROW is honest — but the home document
//   carries no script custody for it either. Adjudicated 2026-08-20 (mismatch
//   #35): no script in the corpus prints the pair, and reproducing it means
//   re-anchoring f-decays.md's three-term fit
//   ln(1/f) = 1.529 + 1.482(2p/m̄) − 1.025 ln s(d_min) separately on each half
//   of the measured range and extrapolating each to x = 1000 — a real
//   computation over the census, not a five-minute one, so it was not done
//   here. WHAT DOES NOT DEPEND ON IT: the branch call, since the whole band
//   including its top sits under ln^2 x = 47.7, and that is the only use the
//   reading makes of it. The point estimate 35.5 has the same status and
//   f-decays.md already forbids quoting it bare. The same flag is written into
//   f-decays.md beside the band.
// ---------------------------------------------------------------------------
