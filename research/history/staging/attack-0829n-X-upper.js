// ============================================================================
// ATTACK 0829n X-UPPER — AN UNCONDITIONAL UPPER BOUND ON THE ROUGH-PAIR
// CENSUS X(K) BY SELBERG'S LAMBDA^2 SIEVE ON THE STRETCH WINDOW, WITH EVERY
// CONSTANT EXPLICIT, EVALUATED AGAINST EXACT X(K) AT EVERY ANCHOR Q <= 10007
// ============================================================================
// THE OBJECT (quadpoint-identity-01.md section 1, copied): anchor Q (a prime
// >= 7), Q' the next prime, window S_Q = [Q^2, Q'^2), channel pairs (a, a+2)
// with BOTH members in S_Q and a = 11, 17, 29 mod 30; C their number, T the
// twin (both-prime) pairs, actives p_1 < p_2 < ... = 7, 11, 13, ...;
//   X(K) = #{channel pairs with both members composite and
//            min(lpf(a), lpf(a+2)) > p_K},   X(0) = CC.
//
// THE LEGAL HALF (attack-wrongdirection-audit.md section 3.1): an upper bound
// on X(K) ALONE. This file never compares X against T. T is computed only as
// an engine-identity gate (band sums cited from attack-roughpair-error-01.js)
// and never enters any bound or any ratio.
//
// THE THEOREM (note section 2; proof in section 3). Let z = p_K, P(z) the
// product of the actives <= z, A = the channel openers a of the C pairs, and
// for squarefree d | P(z)  A_d = #{a in A : d | a(a+2)},  g(d) = 2^omega(d)/d,
// r_d = A_d - C g(d),  h(d) = prod_{p|d} 2/(p-2),  G(xi) = sum_{d<=xi, d|P(z)} h(d).
// For EVERY xi >= 1, with the Selberg weights lambda_d (lambda_1 = 1,
// lambda_d = 0 for d > xi, |lambda_d| <= 1):
//
//   X(K) <= S(A; z) <= C/G(xi) + sum_{d1,d2<=xi} lambda_{d1} lambda_{d2} r_[d1,d2]   (T3, exact)
//               <= C/G(xi) + sum_{d1,d2<=xi} |lambda_{d1} lambda_{d2}| |r_[d1,d2]|   (T2, abs)
//               <= C/G(xi) + sum_{d1,d2<=xi} |lambda_{d1} lambda_{d2}| B([d1,d2])   (T1, uniform)
//
// with B(1) = 0 and B(d) = 3 * 2^omega(d) * (1 + 1/d) for d > 1, a bound that
// uses only that A is an interval in three residue classes mod 30. And
// 1/G(xi) = V2(z) (1 + E_z(xi)), V2(z) = prod_{7<=p<=z}(1 - 2/p), E >= 0.
// T1 depends on the anchor only through C; T2 and T3 use the anchor's own r_d.
// Every tier is minimised over a fixed grid of xi; the minimum of valid upper
// bounds is a valid upper bound. The sifting parameter is s = ln(xi^2)/ln z.
//
// WHAT IS MEASURED: each tier against exact X(K) and against the sifting
// function S(K) at the band depths K_b = 4, 8, 12, 17, 23, 31 (the cited
// K* band means 3.88 .. 31.22 of attack-quadpoint-02/03, rounded, used ONLY as
// fixed depths) and along a K profile in the top two bands.
//
// WIDTH AUDIT: hi <= 10009^2 < 2^31; offsets < 2^20; no shifts; moduli
// 30 * xi^2 <= 1.5e7 and CRT products < 2^53 in doubles.
// ============================================================================
'use strict';
const T0 = Date.now();
let failures = 0;
function assertEq(tag, got, want) { if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; } return true; }
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
const f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4);
const pad = (s, w) => String(s).padStart(w);

// ---------------------------------------------------------------- primes ----
const PLIM = 31700;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const QMAX = 10007;
const ANCHORS = ACT.filter(p => p <= QMAX);
const isOpen30 = (c) => c === 11 || c === 17 || c === 29;

const BANDS = [['B3 [101,313]', 101, 313, 4], ['B4 [317,997]', 317, 997, 8], ['B5 [1009,1499]', 1009, 1499, 12],
  ['B6 [1500,3163]', 1500, 3163, 17], ['B7 [3164,5623]', 3164, 5623, 23], ['B8 [5624,10007]', 5624, 10007, 31]];
const KSET = [1, 2, 4, 8, 12, 17, 23, 31, 46];
const KMAX = 46;
const XI_GRID = [1, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 61, 71, 83, 97, 113, 131, 151, 181, 211, 251, 301, 401, 501, 701];
const XI_MAX = XI_GRID[XI_GRID.length - 1];

// ------------------------------------------ Selberg machinery per depth K ----
// squarefree z-smooth d (primes among the first K actives), enumerated to a cap
function smoothList(K, cap) {
  const out = [];
  (function rec(i, d, om, hs, ps) {
    out.push({ d, om, h: hs, ps: ps.slice() });
    for (let j = i; j < K; j++) {
      const p = ACT[j]; if (d * p > cap) break;
      ps.push(p); rec(j + 1, d * p, om + 1, hs * 2 / (p - 2), ps); ps.pop();
    }
  })(0, 1, 0, 1, []);
  out.sort((a, b) => a.d - b.d);
  return out;
}
const gcd = (a, b) => { while (b) { [a, b] = [b, a % b]; } return a; };
function modInv(a, m) { let [g, x, y] = [m, 0, 1], b = a % m; while (b) { const q = Math.floor(g / b); [g, b] = [b, g - q * b]; [x, y] = [y, x - q * y]; } return ((x % m) + m) % m; }
function crt(r1, m1, r2, m2) { // moduli coprime
  const t = ((r2 - r1) % m2 + m2) % m2 * modInv(m1 % m2, m2) % m2;
  return { r: (r1 + m1 * t) % (m1 * m2), m: m1 * m2 };
}
// residues n mod 30d with d | n(n+2) and n in an open class mod 30
function residuesFor(ps) {
  let list = [{ r: 0, m: 1 }];
  for (const p of ps) {
    const nxt = [];
    for (const o of list) for (const rp of [0, p - 2]) nxt.push(crt(o.r, o.m, rp, p));
    list = nxt;
  }
  const res = [];
  for (const o of list) for (const c of [11, 17, 29]) res.push(crt(o.r, o.m, c, 30).r);
  return { M: 30 * list[0].m, res };
}
// Selberg weights at level xi for depth K; returns the d-list (<= xi) with lambda
function selbergWeights(K, xi, smallList) {
  const L = smallList.filter(o => o.d <= xi);
  const G = L.reduce((s, o) => s + o.h, 0);
  const lam = L.map(o => {
    let Gd = 0;
    for (const m of L) if (m.d * o.d <= xi && gcd(m.d, o.d) === 1) Gd += m.h;
    const mu = (o.om % 2) ? -1 : 1;
    let inv = 1; for (const p of o.ps) inv *= 1 / (1 - 2 / p);
    return mu * inv * Gd / G;
  });
  return { L, G, lam };
}
const V2 = (K) => { let v = 1; for (let i = 0; i < K; i++) v *= 1 - 2 / ACT[i]; return v; };

// Precompute, per K in KSET and per xi in the grid: weights, the pair table
// (index into the union lcm list, coefficient lambda*lambda), and R_U (uniform).
const UNION = smoothList(KMAX, XI_MAX * XI_MAX);     // every lcm that can occur, any K
const unionIndex = new Map(UNION.map((o, i) => [o.d, i]));
const unionRes = UNION.map(o => residuesFor(o.ps));
const BU = UNION.map(o => o.d === 1 ? 0 : 3 * Math.pow(2, o.om) * (1 + 1 / o.d));
const PRE = {};                                       // PRE[K][xiIdx] = {G, pairs, RU, nD, maxAbsLam}
for (const K of KSET) {
  const small = smoothList(K, XI_MAX);
  PRE[K] = XI_GRID.map(xi => {
    const { L, G, lam } = selbergWeights(K, xi, small);
    const pairs = new Map();                          // lcm index -> {c: sum lam lam, ca: sum |lam lam|}
    let maxAbsLam = 0;
    for (let i = 0; i < L.length; i++) {
      maxAbsLam = Math.max(maxAbsLam, Math.abs(lam[i]));
      for (let j = 0; j < L.length; j++) {
        const l = L[i].d * L[j].d / gcd(L[i].d, L[j].d);
        const idx = unionIndex.get(l);
        const e = pairs.get(idx) || { c: 0, ca: 0 };
        e.c += lam[i] * lam[j]; e.ca += Math.abs(lam[i] * lam[j]);
        pairs.set(idx, e);
      }
    }
    let RU = 0; for (const [idx, e] of pairs) RU += e.ca * BU[idx];
    return { G, pairs: [...pairs.entries()], RU, nD: L.length, maxAbsLam, lam1: lam[0] };
  });
}

// ------------------------------------------------------------ the window ----
let maxW = 0;
{ let prev = 7; for (const p of ACT) { if (p > 10009) break; maxW = Math.max(maxW, p * p - prev * prev); prev = p; } }
const lpfw = new Int32Array(maxW + 4);
const needR = new Uint8Array(UNION.length);           // which union d's are needed by some pair table
for (const K of KSET) for (const pre of PRE[K]) for (const [idx] of pre.pairs) needR[idx] = 1;
const needList = []; for (let i = 0; i < UNION.length; i++) if (needR[i]) needList.push(i);

function runAnchor(Qi) {
  const Q = ANCHORS[Qi], Qp = PRIMES[PRIMES.indexOf(Q) + 1];
  const lo = Q * Q, hi = Qp * Qp, width = hi - lo, nR = Qi + 1;
  lpfw.fill(0, 0, width + 3);
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri];
    for (let v = Math.ceil(lo / r) * r; v <= hi + 1; v += r) if (lpfw[v - lo] === 0) lpfw[v - lo] = ri + 1;
  }
  let C = 0, T = 0;
  const histX = new Int32Array(nR + 2), histS = new Int32Array(nR + 2);   // by min index
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    C++;
    const iA = lpfw[a - lo], iB = lpfw[a + 2 - lo];
    if (iA === 0 && iB === 0) { T++; histS[nR + 1]++; }
    else if (iA > 0 && iB > 0) { const m = Math.min(iA, iB); histX[m]++; histS[m]++; }
    else histS[iA === 0 ? iB : iA]++;
  }
  // X(K) = #cc with min index > K; S(K) = #pairs with both lpf indices > K (primes count as nR+1)
  const X = new Int32Array(nR + 2), S = new Int32Array(nR + 2);
  for (let K = nR; K >= 0; K--) { X[K] = X[K + 1] + histX[K + 1]; S[K] = S[K + 1] + histS[K + 1]; }
  assertEq(`X(full) = 0 at Q=${Q}`, X[nR], 0);
  assertEq(`S(full) = T at Q=${Q}`, S[nR], T);
  // exact r_d for every needed d
  const hiN = hi - 3;                                  // a + 2 < hi
  const r = new Float64Array(UNION.length);
  for (const idx of needList) {
    const { M, res } = unionRes[idx];
    let cnt = 0;
    for (const rr of res) cnt += Math.floor((hiN - rr) / M) - Math.floor((lo - 1 - rr) / M);
    r[idx] = cnt - C * Math.pow(2, UNION[idx].om) / UNION[idx].d;
  }
  assertTrue(`r_1 = 0 at Q=${Q}`, Math.abs(r[0]) < 1e-9);
  // bounds per K in KSET (K <= nR only)
  const out = {};
  for (const K of KSET) {
    if (K > nR) continue;
    let t1 = Infinity, t2 = Infinity, t3 = Infinity, xi1 = 0, xi2 = 0, xi3 = 0;
    PRE[K].forEach((pre, xiIdx) => {
      const main = C / pre.G;
      let Rex = 0, Rab = 0;
      for (const [idx, e] of pre.pairs) { Rex += e.c * r[idx]; Rab += e.ca * Math.abs(r[idx]); }
      const b1 = main + pre.RU, b2 = main + Rab, b3 = main + Rex;
      if (b1 < t1) { t1 = b1; xi1 = XI_GRID[xiIdx]; }
      if (b2 < t2) { t2 = b2; xi2 = XI_GRID[xiIdx]; }
      if (b3 < t3) { t3 = b3; xi3 = XI_GRID[xiIdx]; }
    });
    out[K] = { t1, t2, t3, xi1, xi2, xi3 };
  }
  return { Q, Qp, C, T, nR, X, S, r, out, lo, hi };
}

// direct Lambda^2 quadratic form at one anchor, for the identity check
function directQuadratic(row, K, xiIdx) {
  const { lo, hi } = row;
  const pre = PRE[K][xiIdx], xi = XI_GRID[xiIdx];
  const small = smoothList(K, xi);
  const { L, lam } = selbergWeights(K, xi, small);
  const lamOf = new Map(L.map((o, i) => [o.d, lam[i]]));
  let sum = 0;
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    const ps = [];
    for (let i = 0; i < K; i++) { const p = ACT[i]; if (a % p === 0 || (a + 2) % p === 0) ps.push(p); }
    let inner = 0;
    (function rec(i, d) {
      const l = lamOf.get(d); if (l !== undefined) inner += l;
      for (let j = i; j < ps.length; j++) if (d * ps[j] <= xi) rec(j + 1, d * ps[j]);
    })(0, 1);
    sum += inner * inner;
  }
  return { sum, G: pre.G };
}

// ============================================================================
console.log('SEC 0 — ENGINE GATES (T-free identity checks against cited artifacts)');
// ============================================================================
const rows = [];
for (let Qi = 0; Qi < ANCHORS.length; Qi++) rows.push(runAnchor(Qi));
assertEq('anchor count', rows.length, 1227);
const bandRows = (b) => rows.filter(r => r.Q >= b[1] && r.Q <= b[2]);
{ // cited from attack-roughpair-error-01.js embedded OUTPUT (band n and sum T) and attack-quadpoint-03.js (Q = 9281)
  const citedN = [40, 103, 71, 208, 292, 491], citedT = [1017, 7086, 8332, 42495, 101763, 280128];
  BANDS.forEach((b, i) => {
    const rs = bandRows(b);
    assertEq(`band ${b[0]} n`, rs.length, citedN[i]);
    assertEq(`band ${b[0]} sum T`, rs.reduce((s, r) => s + r.T, 0), citedT[i]);
  });
  const w = rows.find(r => r.Q === 9281);
  assertEq('Q=9281 T', w.T, 127); assertEq('Q=9281 CC = X(0)', w.X[0], 2357);
  console.log(`  ${rows.length} anchors; band n and band sum-T reproduce attack-roughpair-error-01.js; T = ${w.T}, X(0) = ${w.X[0]} at Q = 9281 reproduce attack-quadpoint-03.js`);
  console.log(`  X(full) = 0 and S(full) = T asserted at every anchor`);
}

// ============================================================================
console.log('\nSEC 1 — THE SIEVE MACHINERY, CHECKED');
// ============================================================================
{
  let worstLam = 0, lam1ok = true;
  for (const K of KSET) for (const pre of PRE[K]) { worstLam = Math.max(worstLam, pre.maxAbsLam); if (Math.abs(pre.lam1 - 1) > 1e-12) lam1ok = false; }
  assertTrue('lambda_1 = 1 at every (K, xi)', lam1ok);
  assertTrue('|lambda_d| <= 1 at every (K, xi)', worstLam <= 1 + 1e-12);
  console.log(`  lambda_1 = 1 and max |lambda_d| = ${f4(worstLam)} over ${KSET.length} depths x ${XI_GRID.length} levels`);
  // G at full level equals 1/V2: K = 3, P = 7*11*13 = 1001
  const full = smoothList(3, 1001), Gfull = full.reduce((s, o) => s + o.h, 0);
  assertTrue('G(P(z)) = 1/V2(z) at K = 3', Math.abs(Gfull * V2(3) - 1) < 1e-12);
  console.log(`  G(1001) * V2(13) = ${Gfull * V2(3)} (exact 1: the tail E_z(xi) vanishes at full level)`);
  // uniform remainder bound holds with room: max |r_d| / B(d) over all anchors and all needed d > 1
  let worstRB = 0, worstAt = null;
  for (const row of rows) for (const idx of needList) if (idx > 0) { const q = Math.abs(row.r[idx]) / BU[idx]; if (q > worstRB) { worstRB = q; worstAt = [row.Q, UNION[idx].d]; } }
  assertTrue('|r_d| < B(d) everywhere', worstRB < 1);
  console.log(`  max |r_d|/B(d) = ${f4(worstRB)} at Q = ${worstAt[0]}, d = ${worstAt[1]} (needs < 1; ${needList.length} moduli x ${rows.length} anchors)`);
  // direct quadratic form == C/G + R_exact at three anchors
  for (const [Q, K, xiIdx] of [[313, 4, 8], [3163, 17, 12], [10007, 31, 15]]) {
    const row = rows.find(r => r.Q === Q);
    const pre = PRE[K][xiIdx];
    let Rex = 0; for (const [idx, e] of pre.pairs) Rex += e.c * row.r[idx];
    const viaR = row.C / pre.G + Rex;
    const dq = directQuadratic(row, K, xiIdx);
    assertTrue(`quadratic form identity at Q=${Q}`, Math.abs(dq.sum - viaR) < 1e-6 * Math.max(1, viaR));
    console.log(`  Q = ${Q}, K = ${K}, xi = ${XI_GRID[xiIdx]}: direct sum_a (sum lambda_d)^2 = ${f4(dq.sum)}, C/G + sum lambda lambda r = ${f4(viaR)}, S(K) = ${row.S[K]}, X(K) = ${row.X[K]}`);
  }
  // the theorem, verified: every tier >= S(K) >= X(K) at every anchor and depth
  let viol = 0, checked = 0;
  for (const row of rows) for (const K of KSET) { if (K > row.nR) continue; checked++; const o = row.out[K]; if (!(o.t1 >= row.S[K] - 1e-9 && o.t2 >= row.S[K] - 1e-9 && o.t3 >= row.S[K] - 1e-9 && row.S[K] >= row.X[K])) viol++; }
  assertEq('bound >= S(K) >= X(K) violations', viol, 0);
  console.log(`  T1 >= S(K) >= X(K), T2 >= S(K), T3 >= S(K) hold at all ${checked} (anchor, depth) pairs`);
}

// ============================================================================
console.log('\nSEC 2 — THE BOUND AGAINST EXACT X(K) AT THE BAND DEPTHS (sums over the band)');
// ============================================================================
console.log('  band            K_b    n   sum X    sum S   sum C*V2   sum T1   sum T2   sum T3   T1/X   T2/X   T3/X    S/X   T1/S  xi1 med  s1 med  xi3 med');
for (const b of BANDS) {
  const K = b[3], rs = bandRows(b);
  let sX = 0, sS = 0, sV = 0, s1 = 0, s2 = 0, s3 = 0; const xi1s = [], xi3s = [];
  for (const r of rs) { const o = r.out[K]; sX += r.X[K]; sS += r.S[K]; sV += r.C * V2(K); s1 += o.t1; s2 += o.t2; s3 += o.t3; xi1s.push(o.xi1); xi3s.push(o.xi3); }
  const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
  const m1 = med(xi1s), m3 = med(xi3s);
  console.log(`  ${b[0].padEnd(15)} ${pad(K, 3)} ${pad(rs.length, 4)} ${pad(sX, 7)} ${pad(sS, 8)} ${pad(f1(sV), 10)} ${pad(f1(s1), 8)} ${pad(f1(s2), 8)} ${pad(f1(s3), 8)} ${pad(f2(s1 / sX), 6)} ${pad(f2(s2 / sX), 6)} ${pad(f2(s3 / sX), 6)} ${pad(f2(sS / sX), 6)} ${pad(f2(s1 / sS), 6)} ${pad(m1, 7)} ${pad(f2(2 * Math.log(m1) / Math.log(ACT[K - 1])), 7)} ${pad(m3, 8)}`);
}
function f1(x) { return x.toFixed(1); }
console.log('  (T1 uniform closed form; T2 exact |r_d|; T3 exact signed Selberg value; each minimised over the xi grid per anchor;');
console.log('   s1 = ln(xi1^2)/ln p_K at the median xi1; C*V2 is the sieve main term at full level, not a bound)');

// ============================================================================
console.log('\nSEC 3 — PER-ANCHOR SPREAD OF T1/X(K) AND T3/X(K) AT THE BAND DEPTHS');
// ============================================================================
console.log('  band            K_b   T1/X min   T1/X med   T1/X max   T3/X min   T3/X med   T3/X max   T1<C share   X(K)=0 anchors');
for (const b of BANDS) {
  const K = b[3], rs = bandRows(b);
  const q1 = [], q3 = []; let nontriv = 0, zeros = 0;
  for (const r of rs) { const o = r.out[K]; if (r.X[K] === 0) { zeros++; continue; } q1.push(o.t1 / r.X[K]); q3.push(o.t3 / r.X[K]); if (o.t1 < r.C) nontriv++; }
  const st = (a) => { const s = [...a].sort((x, y) => x - y); return [s[0], s[Math.floor(s.length / 2)], s[s.length - 1]]; };
  const [a1, b1, c1] = st(q1), [a3, b3, c3] = st(q3);
  console.log(`  ${b[0].padEnd(15)} ${pad(K, 3)} ${pad(f2(a1), 10)} ${pad(f2(b1), 10)} ${pad(f2(c1), 10)} ${pad(f2(a3), 10)} ${pad(f2(b3), 10)} ${pad(f2(c3), 10)} ${pad(nontriv + '/' + q1.length, 12)} ${pad(zeros, 16)}`);
}

// ============================================================================
console.log('\nSEC 4 — THE K PROFILE IN THE TOP TWO BANDS (sums over the band)');
// ============================================================================
for (const b of [BANDS[3], BANDS[5]]) {
  const rs = bandRows(b);
  console.log(`  ${b[0]}  n = ${rs.length}`);
  console.log('     K   p_K   sum X    sum S    sum T1    sum T3   T1/X   T3/X    S/X   T1/S   T3/S   xi1 med   s1 med   Ru(z,xi1)   S/(C V2)');
  for (const K of KSET) {
    if (K > rs[0].nR) continue;
    let sX = 0, sS = 0, s1 = 0, s3 = 0, sV = 0; const xi1s = [];
    for (const r of rs) { const o = r.out[K]; sX += r.X[K]; sS += r.S[K]; s1 += o.t1; s3 += o.t3; sV += r.C * V2(K); xi1s.push(o.xi1); }
    const s = [...xi1s].sort((x, y) => x - y), m1 = s[Math.floor(s.length / 2)];
    const RU = PRE[K][XI_GRID.indexOf(m1)].RU;
    console.log(`  ${pad(K, 4)} ${pad(ACT[K - 1], 5)} ${pad(sX, 7)} ${pad(sS, 8)} ${pad(f1(s1), 9)} ${pad(f1(s3), 9)} ${pad(sX ? f2(s1 / sX) : 'inf', 6)} ${pad(sX ? f2(s3 / sX) : 'inf', 6)} ${pad(sX ? f2(sS / sX) : 'inf', 6)} ${pad(f2(s1 / sS), 6)} ${pad(f2(s3 / sS), 6)} ${pad(m1, 8)} ${pad(f2(2 * Math.log(m1) / Math.log(ACT[K - 1])), 8)} ${pad(f1(RU), 11)} ${pad(f3(sS / sV), 10)}`);
  }
}

// ============================================================================
console.log('\nSEC 5 — THE LEVEL THE WINDOW ALLOWS, AND THE MAIN TERM THE THEOREM CARRIES');
// ============================================================================
// Uniform tier at depth K: the level D = xi^2 at which R_U(z, xi) first exceeds
// the sieve main term C V2(z), for the band's median C; and the structural gap
// between the theorem's main term C V2(z) and the census's own naive main term
// C [V2(K) - 2 V2(K) U(K) + V2(nR)] (attack-roughpair-error.md section 2).
console.log('  band            K_b   C med   C*V2 med   D_max(R_U<=C V2)   s_max   V2(z)/Xnaive_frac   X/Xnaive   S/(C V2)   M/S   sum_{z<p<=Q} 2/p');
for (const b of BANDS) {
  const K = b[3], rs = bandRows(b);
  const Cs = rs.map(r => r.C).sort((x, y) => x - y), Cmed = Cs[Math.floor(Cs.length / 2)];
  const mainMed = Cmed * V2(K);
  let Dmax = 1; for (let i = 0; i < XI_GRID.length; i++) if (PRE[K][i].RU <= mainMed) Dmax = XI_GRID[i] * XI_GRID[i];
  let sX = 0, sS = 0, sV = 0, sXn = 0, sM = 0, sum2p = 0;
  for (const r of rs) {
    let U = 1; for (let i = K; i < r.nR; i++) U *= 1 - 1 / ACT[i];
    const xn = r.C * (V2(K) - 2 * V2(K) * U + V2(r.nR));
    sX += r.X[K]; sS += r.S[K]; sV += r.C * V2(K); sXn += xn; sM += r.S[K] - r.X[K] - r.T;
    let t = 0; for (let i = K; i < r.nR; i++) t += 2 / ACT[i]; sum2p += t;
  }
  console.log(`  ${b[0].padEnd(15)} ${pad(K, 3)} ${pad(Cmed, 7)} ${pad(f1(mainMed), 10)} ${pad(Dmax, 18)} ${pad(f2(Math.log(Dmax) / Math.log(ACT[K - 1])), 7)} ${pad(f2(sV / sXn), 19)} ${pad(f3(sX / sXn), 10)} ${pad(f3(sS / sV), 10)} ${pad(f3(sM / sS), 5)} ${pad(f3(sum2p / rs.length), 17)}`);
}
console.log('  (D_max: largest grid level xi^2 with the uniform remainder R_U(z, xi) at or below the main term C V2(z) for the median C;');
console.log('   s_max = ln D_max / ln p_K; M = S - X - T the mixed pairs; the last column is the composite-route main-term multiplier)');

// ============================================================================
console.log('\nSEC 6 — THE MAIN TERM IS A PARTIAL PRODUCT: ITS RATIO TO THE MERTENS ASYMPTOTIC AT THE BAND DEPTHS (T-free)');
// ============================================================================
// kappa = prod_{p>=7} (1-2/p)/(1-1/p)^2, the twin local product with the 3, 5
// factors absorbed into the channel; asymptotics P(z) ~ (15/4) e^{-gamma}/ln z,
// V2(z) ~ kappa P(z)^2. The ratio exact/asymptotic is the finite-size effect
// u2-engine-depth.md section 5 names as the drift's mechanism, measured here
// on the theorem's own main term and never on the crossing.
{
  const GAMMA = 0.5772156649015329;
  let kappa = 1; for (const p of ACT) kappa *= (1 - 2 / p) / Math.pow(1 - 1 / p, 2);
  console.log(`  kappa (to p <= ${ACT[ACT.length - 1]}) = ${kappa.toFixed(6)}`);
  console.log('  band            K_b   p_K   P(z) exact   P(z) asym   exact/asym   V2(z) exact   V2 asym   exact/asym');
  for (const b of BANDS) {
    const K = b[3], z = ACT[K - 1];
    let P = 1; for (let i = 0; i < K; i++) P *= 1 - 1 / ACT[i];
    const Pa = 3.75 * Math.exp(-GAMMA) / Math.log(z), Va = kappa * Pa * Pa;
    console.log(`  ${b[0].padEnd(15)} ${pad(K, 3)} ${pad(z, 5)} ${pad(f4(P), 12)} ${pad(f4(Pa), 11)} ${pad(f4(P / Pa), 12)} ${pad(f4(V2(K)), 13)} ${pad(f4(Va), 9)} ${pad(f4(V2(K) / Va), 12)}`);
  }
}

console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0829n-X-upper.js
//   invocation:  node research/history/staging/attack-0829n-X-upper.js
//   code-sha256: 3272cd0e86582a3301122a7e73f2b6ff76a275b2216a8426e9fa17ca6b98761d
//   out-sha256:  281a529c783d258da3c41df01c7a8f55593eb2d63e390cc65bb23cbc9ff90ce1
//   body-lines:  80
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     2.8 s
// ============================================================================
// SEC 0 — ENGINE GATES (T-free identity checks against cited artifacts)
//   1227 anchors; band n and band sum-T reproduce attack-roughpair-error-01.js; T = 127, X(0) = 2357 at Q = 9281 reproduce attack-quadpoint-03.js
//   X(full) = 0 and S(full) = T asserted at every anchor
//
// SEC 1 — THE SIEVE MACHINERY, CHECKED
//   lambda_1 = 1 and max |lambda_d| = 1.0000 over 9 depths x 28 levels
//   G(1001) * V2(13) = 0.9999999999999999 (exact 1: the tail E_z(xi) vanishes at full level)
//   max |r_d|/B(d) = 0.4600 at Q = 4111, d = 8137 (needs < 1; 3702 moduli x 1227 anchors)
//   Q = 313, K = 4, xi = 31: direct sum_a (sum lambda_d)^2 = 128.0930, C/G + sum lambda lambda r = 128.0930, S(K) = 110, X(K) = 26
//   Q = 3163, K = 17, xi = 47: direct sum_a (sum lambda_d)^2 = 1021.5420, C/G + sum lambda lambda r = 1021.5420, S(K) = 544, X(K) = 143
//   Q = 10007, K = 31, xi = 71: direct sum_a (sum lambda_d)^2 = 1503.4693, C/G + sum lambda lambda r = 1503.4693, S(K) = 646, X(K) = 153
//   T1 >= S(K) >= X(K), T2 >= S(K), T3 >= S(K) hold at all 10908 (anchor, depth) pairs
//
// SEC 2 — THE BOUND AGAINST EXACT X(K) AT THE BAND DEPTHS (sums over the band)
//   band            K_b    n   sum X    sum S   sum C*V2   sum T1   sum T2   sum T3   T1/X   T2/X   T3/X    S/X   T1/S  xi1 med  s1 med  xi3 med
//   B3 [101,313]      4   40     891     3915     3922.2   6971.3   4899.8   3990.7   7.82   5.50   4.48   4.39   1.78       7    1.37      251
//   B4 [317,997]      8  103    7035    28425    28455.3  56241.1  40229.3  30810.4   7.99   5.72   4.38   4.04   1.98      13    1.49      701
//   B5 [1009,1499]   12   71    7941    32194    32243.3  68871.2  49893.2  37753.1   8.67   6.28   4.75   4.05   2.14      19    1.53      701
//   B6 [1500,3163]   17  208   41172   167264   167437.3 378100.0 277059.9 214190.2   9.18   6.73   5.20   4.06   2.26      31    1.61      701
//   B7 [3164,5623]   23  292  101591   407883   408524.3 968355.1 710933.1 571510.6   9.53   7.00   5.63   4.01   2.37      43    1.63      701
//   B8 [5624,10007]  31  491  279040  1119016  1120968.2 2827454.6 2069508.3 1733352.8  10.13   7.42   6.21   4.01   2.53      61    1.67      701
//   (T1 uniform closed form; T2 exact |r_d|; T3 exact signed Selberg value; each minimised over the xi grid per anchor;
//    s1 = ln(xi1^2)/ln p_K at the median xi1; C*V2 is the sieve main term at full level, not a bound)
//
// SEC 3 — PER-ANCHOR SPREAD OF T1/X(K) AND T3/X(K) AT THE BAND DEPTHS
//   band            K_b   T1/X min   T1/X med   T1/X max   T3/X min   T3/X med   T3/X max   T1<C share   X(K)=0 anchors
//   B3 [101,313]      4       5.36       8.78      20.00       3.32       4.73       8.80        35/40                0
//   B4 [317,997]      8       5.95       8.90      34.96       3.17       4.48      12.99      103/103                0
//   B5 [1009,1499]   12       6.80       9.19      15.41       3.91       4.72       6.95        71/71                0
//   B6 [1500,3163]   17       7.14       9.77      18.78       4.14       5.20       8.00      208/208                0
//   B7 [3164,5623]   23       7.80      10.22      16.86       4.69       5.67       7.59      292/292                0
//   B8 [5624,10007]  31       8.22      10.75      16.08       5.37       6.23       7.90      491/491                0
//
// SEC 4 — THE K PROFILE IN THE TOP TWO BANDS (sums over the band)
//   B6 [1500,3163]  n = 208
//      K   p_K   sum X    sum S    sum T1    sum T3   T1/X   T3/X    S/X   T1/S   T3/S   xi1 med   s1 med   Ru(z,xi1)   S/(C V2)
//      1     7  284578   553200  557471.0  553200.0   1.96   1.94   1.94   1.01   1.00        7     2.00        20.6      1.000
//      2    11  215046   452591  478733.8  452591.0   2.23   2.10   2.10   1.06   1.00       11     2.00        46.3      1.000
//      4    17  139607   337893  418415.9  344702.3   3.00   2.47   2.42   1.24   1.02       17     2.00       103.1      1.000
//      8    31   80513   240390  383864.4  260604.4   4.77   3.24   2.99   1.60   1.08       31     2.00       238.4      1.000
//     12    47   56646   197442  378671.3  231202.7   6.68   4.08   3.49   1.92   1.17       31     1.78       238.4      1.000
//     17    71   41172   167264  378100.0  214190.2   9.18   5.20   4.06   2.26   1.28       31     1.61       238.4      0.999
//     23   101   30663   145322  378100.0  203384.6  12.33   6.63   4.74   2.60   1.40       31     1.49       238.4      1.000
//     31   139   22774   127465  378100.0  196351.0  16.60   8.62   5.60   2.97   1.54       31     1.39       238.4      1.004
//     46   227   15540   109178  378100.0  188361.3  24.33  12.12   7.03   3.46   1.73       31     1.27       238.4      1.016
//   B8 [5624,10007]  n = 491
//      K   p_K   sum X    sum S    sum T1    sum T3   T1/X   T3/X    S/X   T1/S   T3/S   xi1 med   s1 med   Ru(z,xi1)   S/(C V2)
//      1     7 2783762  4884084 4894161.3 4884084.0   1.76   1.75   1.75   1.00   1.00        7     2.00        20.6      1.000
//      2    11 2133723  3996009 4068844.2 3996009.0   1.91   1.87   1.87   1.02   1.00       83     3.69       149.6      1.000
//      4    17 1422361  2983410 3409876.1 3043511.1   2.40   2.14   2.10   1.14   1.02       97     3.23       398.4      1.000
//      8    31  855671  2122716 3020358.8 2301182.1   3.53   2.69   2.48   1.42   1.08       83     2.57       403.4      1.000
//     12    47  623521  1743751 2892086.4 2041301.7   4.64   3.27   2.80   1.66   1.17       47     2.00       406.6      1.000
//     17    71  470118  1478239 2840801.7 1890938.5   6.04   4.02   3.14   1.92   1.28       61     1.93       553.8      1.000
//     23   101  363414  1282647 2828592.4 1795478.9   7.78   4.94   3.53   2.21   1.40       61     1.78       553.8      0.999
//     31   139  279040  1119016 2827454.6 1733352.8  10.13   6.21   4.01   2.53   1.55       61     1.67       553.8      0.998
//     46   227  197389   947785 2827497.3 1662685.3  14.32   8.42   4.80   2.98   1.75       61     1.52       553.8      0.999
//
// SEC 5 — THE LEVEL THE WINDOW ALLOWS, AND THE MAIN TERM THE THEOREM CARRIES
//   band            K_b   C med   C*V2 med   D_max(R_U<=C V2)   s_max   V2(z)/Xnaive_frac   X/Xnaive   S/(C V2)   M/S   sum_{z<p<=Q} 2/p
//   B3 [101,313]      4     184       80.3                169    1.81                5.55      1.261      0.998 0.513             1.068
//   B4 [317,997]      8     714      221.7                841    1.96                5.19      1.283      0.999 0.503             1.124
//   B5 [1009,1499]   12    1427      363.9               1849    1.95                5.31      1.307      0.998 0.495             1.135
//   B6 [1500,3163]   17    2922      631.7               3721    1.93                5.27      1.296      0.999 0.500             1.131
//   B7 [3164,5623]   23    5848     1097.6               6889    1.91                5.18      1.288      0.998 0.501             1.149
//   B8 [5624,10007]  31   10938     1793.2               9409    1.85                5.20      1.294      0.998 0.500             1.148
//   (D_max: largest grid level xi^2 with the uniform remainder R_U(z, xi) at or below the main term C V2(z) for the median C;
//    s_max = ln D_max / ln p_K; M = S - X - T the mixed pairs; the last column is the composite-route main-term multiplier)
//
// SEC 6 — THE MAIN TERM IS A PARTIAL PRODUCT: ITS RATIO TO THE MERTENS ASYMPTOTIC AT THE BAND DEPTHS (T-free)
//   kappa (to p <= 31699) = 0.938899
//   band            K_b   p_K   P(z) exact   P(z) asym   exact/asym   V2(z) exact   V2 asym   exact/asym
//   B3 [101,313]      4    17       0.6770      0.7431       0.9110        0.4363    0.5185       0.8415
//   B4 [317,997]      8    31       0.5732      0.6131       0.9349        0.3105    0.3530       0.8796
//   B5 [1009,1499]   12    47       0.5201      0.5469       0.9511        0.2550    0.2808       0.9083
//   B6 [1500,3163]   17    71       0.4792      0.4939       0.9703        0.2162    0.2291       0.9438
//   B7 [3164,5623]   23   101       0.4467      0.4562       0.9792        0.1877    0.1954       0.9605
//   B8 [5624,10007]  31   139       0.4176      0.4267       0.9788        0.1639    0.1709       0.9591
//
// done in 2.7s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// 1. THE THEOREM HOLDS AND IS VERIFIED [PROVEN, elementary; VERIFIED by
//    exact computation]: X(K) <= S(K) <= T3 <= T2 <= T1 at all 10908
//    (anchor, depth) pairs of the 1227 anchors and nine depths; lambda_1 = 1
//    and max |lambda_d| = 1.0000 over 9 depths x 28 levels; the uniform
//    remainder bound B(d) holds with room, max |r_d|/B(d) = 0.4600 over 3702
//    moduli x 1227 anchors; the Selberg quadratic form computed directly over
//    the window equals C/G + sum lambda lambda r at three anchors (128.0930,
//    1021.5420, 1503.4693). No TPC content: nothing here is compared to T.
// 2. HOW LOOSE, FLATLY [MEASURED, band sums at the fixed depths 4..31]: the
//    uniform tier T1 exceeds exact X(K) by 7.82, 7.99, 8.67, 9.18, 9.53,
//    10.13 (B3..B8), and the factor decomposes as (sieve loss T1/S = 1.78 ->
//    2.53) x (structural loss S/X = 4.39 -> 4.01). The exact-remainder tier
//    T3 is 4.48 -> 6.21 above X, still above the structural floor S/X. Per
//    anchor, T1/X medians run 8.78 -> 10.75 with max 34.96 (B4) and the bound
//    is below the trivial C at every anchor of B4..B8 and 35 of 40 in B3.
// 3. THE LEVEL IS THE KILL [MEASURED]: the uniform remainder stays at or
//    below the main term C V2(z) only up to D_max = 169, 841, 1849, 3721,
//    6889, 9409, i.e. s_max = 1.81 .. 1.96, below 2 at every band, so the
//    level the window allows is below z^2; the minimising xi1 medians
//    7 .. 61 sit below p_K = 17 .. 139 at every band, s1 med = 1.37 .. 1.67.
//    In B6 the T1 band sum is flat at 378100.0 from K = 17 to K = 46 while
//    sum X falls 41172 -> 15540, so T1/X grows 9.18 -> 24.33 with depth: past
//    p_K = 31 the uniform theorem gains nothing from deeper sieving, and past
//    p_K = 61 in B8 likewise (sum T1 2840801.7 -> 2827497.3 over K = 17..46).
// 4. THE MAIN TERM THE THEOREM CARRIES IS THE SIFTING FUNCTION'S, NOT THE
//    CENSUS'S [MEASURED]: S/(C V2) = 0.998 .. 1.004 at the band depths, so the
//    fundamental-lemma main term tracks S to 0.2% there, while the theorem's
//    main term is 5.18 .. 5.55 times the census's naive main term
//    (V2(z)/Xnaive_frac) and X/Xnaive = 1.261 .. 1.307. Mixed pairs are
//    M/S = 0.495 .. 0.513 of S. Recovering them needs a LOWER bound on pairs
//    with a prime member in the window, which no upper-bound sieve gives.
// 5. THE DRIFT IS NOT EVALUATED [by rule]: the 0.923 -> 0.984 drift of
//    u2-engine-depth.md section 5 is a property of the crossing y*, which is
//    defined by comparing X to T, outside the legal half. What is measured,
//    T-free, is the partial-product-vs-asymptotic effect on the theorem's own
//    main term: V2(z) exact/asym = 0.8415 -> 0.9591 and P(z) exact/asym =
//    0.9110 -> 0.9788 across the band depths.
// 6. THE COMPOSITE-STRUCTURE ROUTE IS WORSE [MEASURED]: sum_{z<p<=Q} 2/p =
//    1.068 .. 1.149 exceeds 1 at every band depth, so a switching bound over
//    the larger prime factor has main term above C V2(z) before any remainder.
// ============================================================
// FIGURE PROVENANCE. Band n (40..491), band sum T (1017..280128) are CITED
// from research/attack-roughpair-error-01.js's embedded OUTPUT and asserted;
// T = 127 and X(0) = 2357 at Q = 9281 are CITED from
// research/attack-quadpoint-03.js's embedded OUTPUT and asserted. The band
// depths 4, 8, 12, 17, 23, 31 are the cited K* band means 3.88, 8.42, 12.20,
// 16.88, 23.34, 31.22 (attack-quadpoint-03.js SEC 2) rounded, used only as
// fixed depths. Every other figure is from this producer's own OUTPUT block.
// ============================================================
