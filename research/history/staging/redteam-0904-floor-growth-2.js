'use strict';
// ============================================================================
// redteam-0904-floor-growth-2.js
//
// SECOND adversarial pass on the GROWTH half of the adverse pointwise floor:
// the quantifier (certificate remainder vs true remainder), the CRT step and
// the dyadic family's membership on exact integers, the exit-chain LP by exact
// vertices, the count at a different s, the corollary's constant, and the
// planted class against the PROVEN mean square.
// ============================================================================
/*
 * QUESTION (one line). Does the growth half of the adverse pointwise floor of
 * `attack-0830-rec-cheapest.md` section 4.2 -- Omega(z,s) >> z^{16s/9}/ln^8 z
 * from four-prime Rosser exit chains -- survive a SECOND adversarial pass, and
 * does a floor on the CERTIFICATE at a CRT-planted window make REC(s,u0) false
 * (a truth gap) or only unprovable by that certificate (a proof gap)?
 *
 * INDEPENDENCE. This file requires nothing. It shares no code with
 * `attack-0830-rec-cheapest.js`, `redteam-0830-floor-growth.js`,
 * `redteam-0830-floor-sign.js`, `blind-0830-omega-floor.js` or
 * `research/sift-limit-lemmaV.js`: own prime sieve (odd-only bitset), own
 * statement of the Rosser D+/D- prefix conditions, own lambda by direct
 * Moebius summation over divisors, own first-exit-chain enumeration, own
 * CRT counting, own LP by exact vertex enumeration (NOT a grid), own
 * segmented box counts. Every sieve-level comparison is done in EXACT
 * INTEGER arithmetic (BigInt) by writing s = A/B and replacing "X <= z^{A/B}"
 * by "X^B <= z^A", so no floating-point boundary can decide a membership.
 *
 * SECTIONS
 *   S0  constants, the death thresholds, and the corollary's crossing
 *   S1  the exit-chain LP by exact vertex enumeration (P1, P2, P3)
 *   S2  own Rosser support, own lambda, sign check and the exit-chain identity
 *   S3  the CRT step: planted positions counted, and the identity of objects
 *       T = H.M + R_H and sup|R_1| = Omega + M (P5, P6)
 *   S4  the literal dyadic family: EXACT integer membership, several levels,
 *       at s = 3.0, 2.8, 2.7 (P7, P9)
 *   S5  the family's count at a DIFFERENT s, with pre-registered slopes (P8)
 *   S6  the planted positions' density against the PROVEN mean square (P10)
 *
 * CALIBRATION. Everything printed is a computation (VERIFIED where it is an
 * exhaustive exact check, MEASURED where it is a count at finite levels).
 * Nothing here is a proof of an asymptotic statement.
 */

const BETA2 = 4.26645028414864;
const SQE = 1 + Math.sqrt(Math.E);
const out = [];
const P = (s) => { out.push(s); };

/* ---------------------------------------------------------------- helpers */

function ipow(b, e) { let r = 1n, x = BigInt(b), n = BigInt(e); while (n > 0n) { if (n & 1n) r *= x; x *= x; n >>= 1n; } return r; }

// largest integer u >= 1 with u^(k*B) <= z^A   (i.e. u <= D^{1/k}, D = z^{A/B})
function rootFloor(z, A, B, k) {
  const rhs = ipow(z, A);
  const e = BigInt(k * B);
  let lo = 1n, hi = 2n;
  while (ipow(hi, Number(e)) <= rhs) { lo = hi; hi *= 2n; }
  while (lo + 1n < hi) { const mid = (lo + hi) / 2n; if (ipow(mid, Number(e)) <= rhs) lo = mid; else hi = mid; }
  return lo;
}

// odd-only bit sieve up to N; returns {bits, N} with isPrime(n) for odd n
function makeSieve(N) {
  const half = (N >> 1) + 1;                 // index i <-> number 2i+1
  const bits = new Uint8Array((half >> 3) + 1);
  const get = (i) => (bits[i >> 3] >> (i & 7)) & 1;
  const set = (i) => { bits[i >> 3] |= (1 << (i & 7)); };
  for (let i = 1; (2 * i + 1) * (2 * i + 1) <= N; i++) {
    if (get(i)) continue;
    const p = 2 * i + 1;
    for (let j = (p * p - 1) >> 1; j < half; j += p) set(j);
  }
  return {
    N,
    isPrime(n) { if (n < 2) return false; if (n === 2) return true; if ((n & 1) === 0) return false; return !get((n - 1) >> 1); }
  };
}

function primesBelow(n) { const s = makeSieve(Math.max(n, 4)); const r = []; for (let i = 2; i < n; i++) if (s.isPrime(i)) r.push(i); return r; }

/* ================================================================== S0 === */

P('SEC 0  constants, death thresholds, and the corollary crossing');
P(`beta2 = ${BETA2}   1+sqrt(e) = ${SQE.toFixed(12)}`);
P(`9*beta2/16 = ${(9 * BETA2 / 16).toFixed(10)}   (the corollary crossing s*)`);
P(`16*(1+sqrt(e))/9 = ${(16 * SQE / 9).toFixed(6)}   (the threshold at the cheapest legal s)`);
P(`margin (1+sqrt(e)) - s* = ${(SQE - 9 * BETA2 / 16).toFixed(6)}`);
P('');

/* ================================================================== S1 === */
/* The exit-chain LP, by EXACT VERTEX ENUMERATION.
 * variables a_1..a_n (n = 2k), objective max sum a_i, constraints
 *   odd-m Rosser:  a_1+..+a_{j-1} + 3 a_j <= s   for odd j <= n
 *   ordering:      a_j - a_{j+1} >= 0
 *   nonneg:        a_n >= 0
 *   cap:           a_i <= 1                      (primes must be below z)
 * optional exit-window constraint (P2):  sum a + 3 a_n >= s
 */

function lpMax(n, s, withWindow) {
  const rows = [], rhs = [];
  const push = (g, h) => { rows.push(g); rhs.push(h); };
  for (let j = 1; j <= n; j += 2) { const g = new Array(n).fill(0); for (let i = 0; i < j - 1; i++) g[i] = 1; g[j - 1] = 3; push(g, s); }
  for (let j = 1; j < n; j++) { const g = new Array(n).fill(0); g[j - 1] = -1; g[j] = 1; push(g, 0); }
  { const g = new Array(n).fill(0); g[n - 1] = -1; push(g, 0); }
  for (let i = 0; i < n; i++) { const g = new Array(n).fill(0); g[i] = 1; push(g, 1); }
  if (withWindow) { const g = new Array(n).fill(-1); g[n - 1] = -4; push(g, -s); }
  const m = rows.length;
  const idx = new Array(n).fill(0);
  let best = -Infinity, bestPt = null;
  const solve = (sel) => {
    const A = sel.map((r) => rows[r].slice()), b = sel.map((r) => rhs[r]);
    for (let c = 0; c < n; c++) {
      let piv = -1, bv = 1e-9;
      for (let r = c; r < n; r++) if (Math.abs(A[r][c]) > bv) { bv = Math.abs(A[r][c]); piv = r; }
      if (piv < 0) return null;
      [A[c], A[piv]] = [A[piv], A[c]]; [b[c], b[piv]] = [b[piv], b[c]];
      for (let r = 0; r < n; r++) { if (r === c) continue; const f = A[r][c] / A[c][c]; if (f === 0) continue; for (let k2 = c; k2 < n; k2++) A[r][k2] -= f * A[c][k2]; b[r] -= f * b[c]; }
    }
    const x = new Array(n); for (let i = 0; i < n; i++) x[i] = b[i] / A[i][i];
    return x;
  };
  const rec = (start, depth) => {
    if (depth === n) {
      const x = solve(idx.slice());
      if (!x) return;
      for (let r = 0; r < m; r++) { let v = 0; for (let i = 0; i < n; i++) v += rows[r][i] * x[i]; if (v > rhs[r] + 1e-9) return; }
      let obj = 0; for (let i = 0; i < n; i++) obj += x[i];
      if (obj > best + 1e-12) { best = obj; bestPt = x.slice(); }
      return;
    }
    for (let r = start; r < m; r++) { idx[depth] = r; rec(r + 1, depth + 1); }
  };
  rec(0, 0);
  return { max: best, pt: bestPt };
}

P('SEC 1  the exit-chain LP by exact vertex enumeration (P1, P2, P3)');
P('  four primes: max sum a_i under 3a1<=s, a1+a2+3a3<=s, a1>=a2>=a3>=a4>=0, a_i<=1');
P('     s     LP4     closed form   diff      LP4+window   opt pattern');
let p1fail = 0, p2fail = 0;
for (const s of [2.3999, 2.4, 2.5, SQE, 2.7, 2.8, 2.9, 3.0, 3.0001, 3.25, 3.5, 4.0, 4.999, 5.0, 6.0, 10.0]) {
  const a = lpMax(4, s, false), b = lpMax(4, s, true);
  const closed = s <= 3 ? 8 * s / 9 : (s <= 5 ? (2 * s + 2) / 3 : 4);
  const d = a.max - closed;
  if (Math.abs(d) > 1e-7) p1fail++;
  if (b.max < a.max - 1e-7) p2fail++;
  P(`  ${s.toFixed(4).padStart(7)} ${a.max.toFixed(6).padStart(9)} ${closed.toFixed(6).padStart(11)} ${d.toExponential(1).padStart(10)} ${b.max.toFixed(6).padStart(12)}   (${a.pt.map((v) => v.toFixed(4)).join(', ')})`);
}
P(`  P1 violations (LP4 != closed form): ${p1fail}`);
P(`  P2: the exit window never LOWERS a finite optimum; it can make the polytope EMPTY.`);
P('  P2b  four-prime construction: is there any legal p* at all? (need sum a + 3 a4 > s)');
P('     s     LP4      sum a + 3 a4   legal p* window?');
for (const s of [2.7, 3.0, 3.5, 4.0, 5.0, 6.0, 6.9, 7.0, 7.1, 8.0, 10.0]) {
  const a = lpMax(4, s, false);
  const v = a.pt.reduce((x, y) => x + y, 0) + 3 * a.pt[3];
  P(`  ${s.toFixed(4).padStart(7)} ${a.max.toFixed(6).padStart(9)} ${v.toFixed(6).padStart(13)}   ${v > s + 1e-9 ? 'YES' : 'NO  (four-prime family EMPTY: no exit prime below z)'}`);
}
P('  P2c  the threshold curve with the exit window enforced, best over chain length 2k');
P('       (constructive lower bound: the all-ones 2k pattern, feasible iff 2k+1 <= s and 2k+3 > s;');
P('        plus the four-prime windowed LP where it is feasible)');
P('     s      best per-side   doubled     vs beta2');
let p4bad = 0;
for (const s of [SQE, 2.7, 3.0, 3.5, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 12.0, 20.0]) {
  let best = -Infinity, how = '';
  const a4 = lpMax(4, s, false);
  if (a4.pt.reduce((x, y) => x + y, 0) + 3 * a4.pt[3] > s + 1e-9) { best = a4.max; how = '4-prime LP'; }
  for (let k = 1; k <= 30; k++) {
    const n2 = 2 * k;
    if (n2 + 1 <= s + 1e-9 && n2 + 3 > s + 1e-9) { if (n2 > best) { best = n2; how = `all-ones 2k=${n2}`; } }
  }
  const dbl = 2 * best;
  if (!(dbl > BETA2)) p4bad++;
  P(`  ${s.toFixed(4).padStart(7)} ${best.toFixed(6).padStart(13)} ${dbl.toFixed(6).padStart(11)}   ${dbl > BETA2 ? 'ABOVE' : 'BELOW'}   [${how}]`);
}
P(`  P4 extended: legal s at which the windowed doubled threshold is NOT above beta2: ${p4bad}`);
P('  2k primes, capped, at s = 3.0 and s = 2.8:');
for (const s of [2.8, 3.0]) {
  for (const k of [1, 2, 3, 4]) {
    const n = 2 * k, r = lpMax(n, s, false);
    const closed = Math.min(s * (1 - Math.pow(3, -k)), n);
    P(`    s=${s}  2k=${n}  LP = ${r.max.toFixed(6)}   s(1-3^-k) = ${(s * (1 - Math.pow(3, -k))).toFixed(6)}   cap-min = ${closed.toFixed(6)}   doubled = ${(2 * r.max).toFixed(6)}`);
  }
}
P('  the corollary: 2 x cappedLP4(s) vs beta2');
{
  let cross = null;
  let lo = 2.0, hi = 3.0;
  for (let it = 0; it < 200; it++) { const mid = (lo + hi) / 2; const v = 2 * lpMax(4, mid, false).max; if (v < BETA2) lo = mid; else hi = mid; }
  cross = (lo + hi) / 2;
  P(`    bisected crossing 2*LP4(s) = beta2 at s = ${cross.toFixed(10)}   (9*beta2/16 = ${(9 * BETA2 / 16).toFixed(10)}, diff ${(cross - 9 * BETA2 / 16).toExponential(2)})`);
  let bad = 0;
  for (const s of [SQE, 2.7, 2.8, 3.0, 3.2, 3.5, 4.0, 5.0, 8.0, 20.0]) { if (2 * lpMax(4, s, false).max <= BETA2) bad++; }
  P(`    P4: legal s with 2*cappedLP4(s) <= beta2: ${bad}`);
}
P('');

/* ================================================================== S2 === */
/* Own Rosser support, own lambda, sign check, exit-chain identity.
 * s is rational A/B so every condition is an exact BigInt comparison:
 *   p_1..p_{j-1} p_j^3 <= z^{A/B}   <=>   (p_1..p_{j-1})^B p_j^{3B} <= z^A
 */

function inSupportExact(descPrimes, z, A, B, plus) {
  const rhs = ipow(z, A);
  let pref = 1n;                              // product of p_1..p_{j-1}
  for (let j = 1; j <= descPrimes.length; j++) {
    const pj = BigInt(descPrimes[j - 1]);
    const odd = (j % 2 === 1);
    if (odd === plus) { if (ipow(pref, B) * ipow(pj, 3 * B) > rhs) return false; }
    pref *= pj;
  }
  return true;
}

P('SEC 2  own Rosser support, own lambda, sign check, exit-chain identity');
P('  (this repeats the first pass s attack 5 as INFRASTRUCTURE; declared as a repeat)');
P('   z   s=A/B   divisors  lam+<0  lam-<0>0  identity mismatches  even-exit(D+)  odd-exit(D-)');
const lamStore = {};
for (const z of [13, 17, 19, 23, 29, 31, 37, 41]) {
  for (const [A, B, lab] of [[27, 10, '2.7'], [14, 5, '2.8'], [3, 1, '3.0']]) {
    const pr = primesBelow(z);                    // primes p < z
    const n = pr.length;
    const lamP = new Array(1 << n).fill(0), lamM = new Array(1 << n).fill(0);
    const inP = new Array(1 << n).fill(false), inM = new Array(1 << n).fill(false);
    for (let mask = 0; mask < (1 << n); mask++) {
      const desc = []; for (let i = n - 1; i >= 0; i--) if (mask & (1 << i)) desc.push(pr[i]);
      inP[mask] = inSupportExact(desc, z, A, B, true);
      inM[mask] = inSupportExact(desc, z, A, B, false);
    }
    for (let mask = 0; mask < (1 << n); mask++) {
      let sp = 0, sm = 0;
      for (let sub = mask; ; sub = (sub - 1) & mask) {
        const mu = ((popcount(sub) & 1) ? -1 : 1);
        if (inP[sub]) sp += mu;
        if (inM[sub]) sm += mu;
        if (sub === 0) break;
      }
      lamP[mask] = sp; lamM[mask] = sm;
    }
    let negP = 0, posM = 0, mism = 0, evenExit = 0, oddExit = 0;
    for (let mask = 1; mask < (1 << n); mask++) {
      if (lamP[mask] < 0) negP++;
      if (lamM[mask] > 0) posM++;
      // exit chains of D+ ending at the least prime of mask
      let lowBit = mask & (-mask);
      let cnt = 0;
      for (let sub = mask; ; sub = (sub - 1) & mask) {
        if (sub & lowBit) {
          const rest = sub & ~lowBit;
          if (inP[rest] && !inP[sub]) { cnt++; if ((popcount(sub) % 2) === 0) evenExit++; }
          if (inM[rest] && !inM[sub]) { if ((popcount(sub) % 2) === 1) oddExit++; }
        }
        if (sub === 0) break;
      }
      if (cnt !== lamP[mask]) mism++;
    }
    P(`  ${String(z).padStart(3)}  ${lab.padStart(5)}  ${String(1 << n).padStart(8)}  ${String(negP).padStart(6)}  ${String(posM).padStart(8)}  ${String(mism).padStart(19)}  ${String(evenExit).padStart(13)}  ${String(oddExit).padStart(12)}`);
    lamStore[`${z}|${lab}`] = { pr, lamP, lamM, n };
  }
}
function popcount(x) { x = x - ((x >> 1) & 0x55555555); x = (x & 0x33333333) + ((x >> 2) & 0x33333333); x = (x + (x >> 4)) & 0x0f0f0f0f; return (x * 0x01010101) >> 24; }
P('');

/* ================================================================== S3 === */
/* The CRT step and the identity of objects. */

P('SEC 3  the CRT step, the planted positions counted, and T = H.M + R_H  (P5, P6)');
P('   z   s    W        Omega  M           sup|R_1|   Omega+M    E4 viol  CRT formula vs walk');
let p5fail = 0, p6fail = 0;
for (const z of [13, 17, 19, 23]) {
  for (const [A, B, lab] of [[27, 10, '2.7'], [3, 1, '3.0']]) {
    const st = lamStore[`${z}|${lab}`]; const { pr, lamP, lamM, n } = st;
    let W = 1; for (const p of pr) W *= p;
    // gcd masks: for each r in Z/W, mask1 = primes dividing r, mask2 = primes dividing r+2
    const cc = new Float64Array(W);
    const m1 = new Int32Array(W), m2 = new Int32Array(W);
    for (let i = 0; i < n; i++) { const p = pr[i]; for (let r = 0; r < W; r += p) m1[r] |= (1 << i); for (let r = (p - 2) % p; r < W; r += p) m2[r] |= (1 << i); }
    let sum = 0, minc = Infinity, argmin = -1, maxc = -Infinity;
    for (let r = 0; r < W; r++) {
      const a1 = lamP[m1[r]], b1 = lamM[m1[r]], a2 = lamP[m2[r]], b2 = lamM[m2[r]];
      const v = b1 * a2 + a1 * b2 - a1 * a2;
      cc[r] = v; sum += v; if (v < minc) { minc = v; argmin = r; } if (v > maxc) maxc = v;
    }
    const M = sum / W, Omega = -minc;
    let supR1 = 0; for (let r = 0; r < W; r++) { const v = Math.abs(cc[r] - M); if (v > supR1) supR1 = v; }
    if (Math.abs(supR1 - (Omega + M)) > 1e-9) p6fail++;
    // E4 control over the full period with the wrap, several H
    let e4 = 0;
    for (const H of [1, 2, 3, Math.max(1, Omega), Omega + 1, 10]) {
      if (H > W) continue;
      // prefix sums with wrap
      let T = 0; for (let k = 1; k <= H; k++) T += cc[k % W];
      for (let x = 0; x < W; x++) {
        let mn = Infinity; for (let k = 1; k <= H; k++) { const v = cc[(x + k) % W]; if (v < mn) mn = v; }
        if (T > mn + (H - 1) + 1e-9) e4++;
        T += cc[(x + 1 + H) % W] - cc[(x + 1) % W];
      }
    }
    // CRT count check: take the argmin's own (n1, n2) and count positions two ways
    const M1 = m1[argmin], M2 = m2[argmin];
    let walk = 0; for (let r = 0; r < W; r++) if (m1[r] === M1 && m2[r] === M2) walk++;
    let form = 1; for (let i = 0; i < n; i++) { const p = pr[i]; if (p === 2) continue; if (((M1 >> i) & 1) || ((M2 >> i) & 1)) continue; form *= (p - 2); }
    if (form !== walk) p5fail++;
    const aA1 = lamP[M1], aB1 = -lamM[M1], aA2 = lamP[M2], aB2 = -lamM[M2];
    const predMin = -(aA1 * aA2 + aA1 * aB2 + aB1 * aA2);
    const rough = (M1 === 0 || M2 === 0);
    const signsOk = rough ? 'ROUGH SIDE (n=1, B=-lam-(1)=-1; E3 non-negativity is for doubly NON-rough points)'
      : ((aA1 >= 0 && aB1 >= 0 && aA2 >= 0 && aB2 >= 0) ? 'ok' : 'VIOLATION');
    P(`  ${String(z).padStart(3)} ${lab}  ${String(W).padStart(8)} ${String(Omega).padStart(6)}  ${M.toFixed(7)}  ${supR1.toFixed(7)}  ${(Omega + M).toFixed(7)}  ${String(e4).padStart(7)}   ${form} vs ${walk}   argmin (A1,B1,A2,B2)=(${aA1},${aB1},${aA2},${aB2}) signs ${signsOk} pred ${predMin} vs min ${minc}`);
  }
}
P('  S3b  explicit CRT planting: two disjoint odd prime sets, the position solved, cc(r) predicted');
P('     z   s    n1          n2          r          A1  B1  A2  B2   cc(r) walked  -(A1A2+A1B2+B1A2)  #positions');
let p5bfail = 0;
for (const z of [19, 23]) {
  for (const [A, B, lab] of [[27, 10, '2.7'], [3, 1, '3.0']]) {
    const st = lamStore[`${z}|${lab}`]; const { pr, lamP, lamM, n } = st;
    let W = 1; for (const q of pr) W *= q;
    // side split by index parity over the ODD primes (index 0 is the prime 2, excluded)
    let mask1 = 0, mask2 = 0;
    for (let i = 1; i < n; i++) { if ((i % 2) === 1) mask1 |= (1 << i); else mask2 |= (1 << i); }
    const n1 = pr.filter((_, i) => (mask1 >> i) & 1).reduce((a, b) => a * b, 1);
    const n2 = pr.filter((_, i) => (mask2 >> i) & 1).reduce((a, b) => a * b, 1);
    // solve by direct search over Z/W for the exact gcd pair
    let r = -1, cnt = 0;
    for (let x = 0; x < W; x++) {
      let g1 = 0, g2 = 0;
      for (let i = 0; i < n; i++) { const q = pr[i]; if (x % q === 0) g1 |= (1 << i); if ((x + 2) % q === 0) g2 |= (1 << i); }
      if (g1 === mask1 && g2 === mask2) { if (r < 0) r = x; cnt++; }
    }
    let form = 1; for (let i = 0; i < n; i++) { const q = pr[i]; if (q === 2) continue; if (((mask1 >> i) & 1) || ((mask2 >> i) & 1)) continue; form *= (q - 2); }
    const a1 = lamP[mask1], b1 = -lamM[mask1], a2 = lamP[mask2], b2 = -lamM[mask2];
    const walked = r < 0 ? NaN : (lamM[mask1] * lamP[mask2] + lamP[mask1] * lamM[mask2] - lamP[mask1] * lamP[mask2]);
    const pred = -(a1 * a2 + a1 * b2 + b1 * a2);
    if (r < 0 || walked !== pred || cnt !== form) p5bfail++;
    P(`  ${String(z).padStart(4)} ${lab} ${String(n1).padStart(11)} ${String(n2).padStart(11)} ${String(r).padStart(10)} ${String(a1).padStart(3)} ${String(b1).padStart(3)} ${String(a2).padStart(3)} ${String(b2).padStart(3)}   ${String(walked).padStart(12)}  ${String(pred).padStart(17)}  ${cnt} (formula ${form})`);
  }
}
P(`  S3b failures (no position, or cc(r) != -(A1A2+A1B2+B1A2), or count mismatch): ${p5bfail}`);
P(`  P5 violations (CRT formula vs brute-force walk): ${p5fail}`);
P(`  P6 violations (sup|R_1| != Omega + M): ${p6fail}`);
P('');

/* ================================================================== S4 === */
/* The literal dyadic family, EXACT integer membership, several levels. */

P('SEC 4  the literal dyadic family: exact integer membership at several levels  (P7, P9)');

const SIEVE_N = 101000000;
const sv = makeSieve(SIEVE_N);
function boxPrimes(loEx, hiIn, cap) {          // primes p with loEx < p <= hiIn and p < cap
  const res = { count: 0, min: 0, max: 0, lnsum: 0 };
  const hi = Math.min(hiIn, cap - 1);
  for (let p = loEx + 1; p <= hi; p++) if (sv.isPrime(p)) { if (!res.count) res.min = p; res.max = p; res.count++; res.lnsum += Math.log(p); }
  return res;
}
function boxCount(loEx, hiIn, cap) {           // count only, no lnsum (fast path)
  const hi = Math.min(hiIn, cap - 1);
  let c = 0, mn = 0, mx = 0, ls = 0;
  for (let p = loEx + 1; p <= hi; p++) if (sv.isPrime(p)) { if (!c) mn = p; mx = p; c++; ls += Math.log(p); }
  return { count: c, min: mn, max: mx, lnsum: ls };
}

function familyAt(z, A, B) {
  const U1 = rootFloor(z, A, B, 3), U3 = rootFloor(z, A, B, 9), U27 = rootFloor(z, A, B, 27);
  const b1 = boxCount(Number(U1 / 2n), Number(U1), z);
  const b2 = boxCount(Number(U1 / 4n), Number(U1 / 2n), z);
  const b3 = boxCount(Number(U3 / 2n), Number(U3), z);
  const b4 = boxCount(Number(U3 / 4n), Number(U3 / 2n), z);
  const pstarLo = Number(4n * U27), pstarHi = Number(U3 / 4n);
  // ANALYTIC window of the source note, kept for comparison
  const psAn = [];
  for (let p = pstarLo + 1; p < pstarHi && psAn.length < 4; p++) if (sv.isPrime(p)) psAn.push(p);
  // EXACT window: p* < min(B4) and dmin * p*^3 > D, on the real primes found
  const ps = [];
  if (b1.count && b2.count && b3.count && b4.count) {
    const dmin = BigInt(b1.min) * BigInt(b2.min) * BigInt(b3.min) * BigInt(b4.min);
    const rhs = ipow(z, A);
    for (let p = 2; p < b4.min && ps.length < 4; p++) {
      if (!sv.isPrime(p)) continue;
      if (ipow(dmin, B) * ipow(BigInt(p), 3 * B) > rhs) ps.push(p);
    }
  }
  return { U1, U3, U27, b1, b2, b3, b4, pstarLo, pstarHi, ps, psAn };
}

// exact membership check on the extreme corners (all conditions are monotone
// in each p_i, so the corners decide the whole box)
function cornerCheck(z, A, B, f) {
  const rhs = ipow(z, A);
  const fails = [];
  if (!f.b1.count || !f.b2.count || !f.b3.count || !f.b4.count || f.ps.length < 2) return { fails: ['EMPTY'], ok: false };
  const p1 = BigInt(f.b1.max), p2 = BigInt(f.b2.max), p3 = BigInt(f.b3.max), p4 = BigInt(f.b4.max);
  const q1 = BigInt(f.b1.min), q2 = BigInt(f.b2.min), q3 = BigInt(f.b3.min), q4 = BigInt(f.b4.min);
  const pstar = BigInt(f.ps[0]), pstar2 = BigInt(f.ps[1]);
  // C1  p1^3 <= D          (worst corner: largest p1)
  if (ipow(p1, 3 * B) > rhs) fails.push('C1 p1^3<=D');
  // C2  p1 p2 p3^3 <= D    (worst: largest p1,p2,p3)
  if (ipow(p1 * p2, B) * ipow(p3, 3 * B) > rhs) fails.push('C2 p1p2p3^3<=D');
  // C3  ordering p1 > p2 > p3 > p4 > pstar   (worst: min of upper box vs max of lower)
  if (!(q1 > p2 && q2 > p3 && q3 > p4 && q4 > pstar2 && pstar !== pstar2)) fails.push('C3 ordering');
  // C4  d' > D / pstar^3   (worst: smallest d', both pstars) -> d'^B pstar^{3B} > z^A
  const dmin = q1 * q2 * q3 * q4;
  if (!(ipow(dmin, B) * ipow(pstar, 3 * B) > rhs)) fails.push('C4a');
  if (!(ipow(dmin, B) * ipow(pstar2, 3 * B) > rhs)) fails.push('C4b');
  // C7  the appended p* must NOT already be in D+ as a 5-chain: that IS C4 (exit), plus
  //     the prefix d' must be in D+, which is C1 and C2. Check the 5-chain fails at m=5 only:
  if (ipow(p1, 3 * B) > rhs) fails.push('C7 prefix m=1');
  // C5  d' <= D (implied, checked): worst = largest d'
  const dmax = p1 * p2 * p3 * p4;
  if (ipow(dmax, B) > rhs) fails.push('C5 d<=D');
  // C6  all box primes < z
  if (!(p1 < BigInt(z))) fails.push('C6 p1<z');
  return { fails, ok: fails.length === 0, dmin, dmax, pstar, pstar2 };
}

P('   s     z          U1=D^1/3   U3=D^1/9  analytic p* window / exact p*                |B1|     |B2|     |B3| |B4|  corner check');
const levels = [1000003, 3000017, 10000019, 30000001, 100000007];
const runs = [];
for (const [A, B, lab] of [[3, 1, '3.0'], [14, 5, '2.8'], [27, 10, '2.7']]) {
  for (const z of levels) {
    const f = familyAt(z, A, B);
    const c = cornerCheck(z, A, B, f);
    P(`  ${lab}  ${String(z).padStart(9)}  ${String(f.U1).padStart(10)} ${String(f.U3).padStart(9)}  analytic(${f.pstarLo},${f.pstarHi})=${f.psAn.length}  exact p*=[${f.ps.slice(0, 2).join(',')}]`.padEnd(88)
      + ` ${String(f.b1.count).padStart(7)} ${String(f.b2.count).padStart(8)} ${String(f.b3.count).padStart(4)} ${String(f.b4.count).padStart(4)}  ${c.ok ? 'ALL PASS' : c.fails.join(';')}`);
    runs.push({ lab, A, B, z, f, c });
  }
}
P('  P7b  random-sample verification: 400 real tuples per level checked as first-exit chains');
P('     s     z          tuples  membership failures  min ln-margin on d\' > D/p*^3');
for (const r of runs) {
  if (!r.c.ok) continue;
  const { z, A, B, f } = r;
  const rhs = ipow(z, A);
  const boxes = [f.b1, f.b2, f.b3, f.b4].map((b) => { const l = []; for (let q = b.min; q <= b.max; q++) if (sv.isPrime(q)) l.push(q); return l; });
  const pstar = BigInt(f.ps[0]);
  let fail = 0, minMargin = Infinity, tried = 0;
  let seed = 12345 + z;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  for (let t = 0; t < 400; t++) {
    const q = boxes.map((L) => L[Math.floor(rnd() * L.length)]);
    if (!(q[0] > q[1] && q[1] > q[2] && q[2] > q[3] && BigInt(q[3]) > pstar)) { fail++; continue; }
    const bq = q.map(BigInt);
    const dp = bq[0] * bq[1] * bq[2] * bq[3];
    const c1 = ipow(bq[0], 3 * B) <= rhs;                                   // m=1 of d'
    const c2 = ipow(bq[0] * bq[1], B) * ipow(bq[2], 3 * B) <= rhs;          // m=3 of d'
    const c3 = ipow(dp, B) * ipow(pstar, 3 * B) > rhs;                      // m=5 of d'p* FAILS -> exit
    if (!(c1 && c2 && c3)) fail++;
    // margin in ln units on the exit condition
    const m = (Math.log(Number(dp)) + 3 * Math.log(Number(pstar))) - (A / B) * Math.log(z);
    if (m < minMargin) minMargin = m;
    tried++;
  }
  P(`  ${r.lab}  ${String(z).padStart(9)}  ${String(tried).padStart(6)}  ${String(fail).padStart(19)}  ${minMargin.toFixed(4)}`);
}
P('  P7c  EXACT onset: first z (scanned on a 0.5%% log grid) at which the exact family is non-empty');
for (const [A, B, lab] of [[3, 1, '3.0'], [14, 5, '2.8'], [27, 10, '2.7']]) {
  let z0 = 0;
  for (let e = 3.5; e <= 7.2 && !z0; e += 0.005) {
    const z = Math.max(5, Math.round(Math.pow(10, e)));
    const f = familyAt(z, A, B);
    const c = cornerCheck(z, A, B, f);
    if (c.ok) z0 = z;
  }
  P(`    s=${lab}  exact family first non-empty at z ~ ${z0}   (source note s analytic bound at s=2.6987 was 1.055e6)`);
}
P('  P9 onset: first z with a NON-EMPTY p* window and with TWO primes in it');
for (const [A, B, lab] of [[3, 1, '3.0'], [14, 5, '2.8'], [27, 10, '2.7']]) {
  const s = A / B;
  const analytic = Math.pow(16, 27 / (2 * s));
  let z1 = 0, z2 = 0;
  for (let e = 4.0; e <= 7.5 && (!z1 || !z2); e += 0.005) {
    const z = Math.max(3, Math.round(Math.pow(10, e)));
    const U3 = rootFloor(z, A, B, 9), U27 = rootFloor(z, A, B, 27);
    const lo = Number(4n * U27), hi = Number(U3 / 4n);
    if (!z1 && hi > lo + 1) z1 = z;
    if (!z2) { let c = 0; for (let p = lo + 1; p < hi; p++) if (sv.isPrime(p)) c++; if (c >= 2) z2 = z; }
  }
  P(`    s=${lab}  analytic 16^{27/2s} = ${analytic.toExponential(3)}   window non-empty from z ~ ${z1}   two primes from z ~ ${z2}`);
}
P('  P1b  is the LP pattern (s/3,s/3,s/9,s/9) also the best at a REACHABLE level?');
P('       exhaustive search over ALL dyadic box quadruples (2^{t-1}, 2^t], t1>t2>t3>t4, with every');
P('       Rosser and exit condition checked in EXACT integer arithmetic on the real primes found');
{
  const plist = [];
  for (let q = 2; q <= SIEVE_N; q++) if (sv.isPrime(q)) plist.push(q);
  const PA = Uint32Array.from(plist);
  const ub = (x) => { let lo = 0, hi = PA.length; while (lo < hi) { const m = (lo + hi) >> 1; if (PA[m] <= x) lo = m + 1; else hi = m; } return lo; };
  const cntBox = (loEx, hiIn, cap) => { const h = Math.min(hiIn, cap - 1); if (h <= loEx) return null; const i = ub(loEx), j = ub(h); if (j <= i) return null; return { c: j - i, mn: PA[i], mx: PA[j - 1] }; };
  P('     s     z          best (t1,t2,t3,t4)  best log10 A1A2   note pattern log10 A1A2   gap');
  for (const [A, B, lab] of [[3, 1, '3.0'], [14, 5, '2.8']]) {
    const sVal = A / B, z = 100000007, rhs = ipow(z, A);
    const score = (bx) => {
      if (bx.some((b2) => !b2)) return null;
      const q = bx.map((b2) => BigInt(b2.mn)), pm = bx.map((b2) => BigInt(b2.mx));
      if (!(q[0] > pm[1] && q[1] > pm[2] && q[2] > pm[3])) return null;
      if (ipow(pm[0], 3 * B) > rhs) return null;
      if (ipow(pm[0] * pm[1], B) * ipow(pm[2], 3 * B) > rhs) return null;
      const dmin = q[0] * q[1] * q[2] * q[3];
      const lo = Math.exp((Math.log(z) * sVal - Math.log(Number(dmin))) / 3);
      let star = 0;
      for (let t = Math.max(0, ub(lo) - 2); t < PA.length && PA[t] < bx[3].mn; t++) { if (ipow(dmin, B) * ipow(BigInt(PA[t]), 3 * B) > rhs) { star = PA[t]; break; } }
      if (!star) return null;
      const cs = bx.map((b2) => b2.c);
      const A1 = cs.reduce((x, c) => x * Math.ceil(c / 2), 1), A2 = cs.reduce((x, c) => x * Math.floor(c / 2), 1);
      if (A2 === 0) return null;
      return { l10: Math.log10(A1) + Math.log10(A2), star, cs };
    };
    let best = -Infinity, bestT = null, bestStar = 0;
    const TMAX = Math.floor(Math.log2(z));
    for (let t1 = 4; t1 <= TMAX; t1++) for (let t2 = 3; t2 < t1; t2++) for (let t3 = 2; t3 < t2; t3++) for (let t4 = 1; t4 < t3; t4++) {
      const bx = [t1, t2, t3, t4].map((t) => cntBox(Math.pow(2, t - 1), Math.pow(2, t), z));
      const r2 = score(bx);
      if (r2 && r2.l10 > best) { best = r2.l10; bestT = [t1, t2, t3, t4]; bestStar = r2.star; }
    }
    // the source note's own pattern, at the same level
    const f = familyAt(z, A, B);
    const cs = [f.b1.count, f.b2.count, f.b3.count, f.b4.count];
    const nA1 = cs.reduce((x, c) => x * Math.ceil(c / 2), 1), nA2 = cs.reduce((x, c) => x * Math.floor(c / 2), 1);
    const noteVal = Math.log10(nA1) + Math.log10(nA2);
    P(`  ${lab}  ${String(z).padStart(9)}  (${bestT.join(',')})   ${best.toFixed(4).padStart(13)}   ${noteVal.toFixed(4).padStart(21)}   ${(best - noteVal).toFixed(4)} dex   best p* = ${bestStar}`);
  }
}
P('');

/* ================================================================== S5 === */

P('SEC 5  the count at a DIFFERENT s, with the pre-registered slope band  (P8)');
P('   s      z          c1        c2      c3   c4   A1           A2           A1*A2        log_z    step slope   model 16s/9-8/lnz');
for (const [A, B, lab] of [[3, 1, '3.0'], [14, 5, '2.8'], [27, 10, '2.7']]) {
  const s = A / B; let prev = null;
  for (const r of runs.filter((x) => x.lab === lab)) {
    const f = r.f;
    if (!r.c.ok) { P(`  ${lab}  ${String(r.z).padStart(9)}   family empty (${r.c.fails.join(';')})`); continue; }
    const cs = [f.b1.count, f.b2.count, f.b3.count, f.b4.count];
    const A1 = cs.reduce((a, c) => a * Math.ceil(c / 2), 1);
    const A2 = cs.reduce((a, c) => a * Math.floor(c / 2), 1);
    const prod = A1 * A2, lz = Math.log(prod) / Math.log(r.z);
    let slope = NaN;
    if (prev) slope = (Math.log(prod) - Math.log(prev.prod)) / (Math.log(r.z) - Math.log(prev.z));
    const model = 16 * s / 9 - 8 / Math.log(r.z);
    P(`  ${lab}  ${String(r.z).padStart(9)} ${String(cs[0]).padStart(9)} ${String(cs[1]).padStart(9)} ${String(cs[2]).padStart(4)} ${String(cs[3]).padStart(4)}  ${A1.toExponential(4)}  ${A2.toExponential(4)}  ${prod.toExponential(4)}  ${lz.toFixed(4)}  ${isNaN(slope) ? '     -   ' : slope.toFixed(4).padStart(9)}   ${model.toFixed(4)}`);
    prev = { prod, z: r.z };
  }
}
P('');

/* ================================================================== S6 === */

P('SEC 6  the planted positions density against the PROVEN mean square  (P10)');
P('   s      z          ln(n1n2)      log10(A1A2)  log10 upper bound on the planted contribution to <R_1^2>');
for (const [A, B, lab] of [[3, 1, '3.0'], [14, 5, '2.8']]) {
  for (const r of runs.filter((x) => x.lab === lab)) {
    if (!r.c.ok) continue;
    const f = r.f;
    // recompute the boxes WITH their ln-sums (theta over the four boxes)
    const U1 = f.U1, U3 = f.U3;
    const g1 = boxPrimes(Number(U1 / 2n), Number(U1), r.z), g2 = boxPrimes(Number(U1 / 4n), Number(U1 / 2n), r.z);
    const g3 = boxPrimes(Number(U3 / 2n), Number(U3), r.z), g4 = boxPrimes(Number(U3 / 4n), Number(U3 / 2n), r.z);
    const lnN = g1.lnsum + g2.lnsum + g3.lnsum + g4.lnsum + Math.log(f.ps[0]) + Math.log(f.ps[1]);
    const cs = [f.b1.count, f.b2.count, f.b3.count, f.b4.count];
    const A1 = cs.reduce((a, c) => a * Math.ceil(c / 2), 1), A2 = cs.reduce((a, c) => a * Math.floor(c / 2), 1);
    const l10 = Math.log10(A1) + Math.log10(A2);
    const bound = 2 * l10 - (lnN / Math.LN10) - Math.log10(2);
    P(`  ${lab}  ${String(r.z).padStart(9)}  ${lnN.toExponential(5)}  ${l10.toFixed(3).padStart(11)}  ${bound.toExponential(5)}`);
  }
}
P('');

/* ================================================================== S7 === */

P('SEC 7  the death table: which (s, u0) the floor kills, and RML(alpha)');
P('   s      threshold 16s/9 (s<=3) or capped   legal u0 band (2, beta2]   killed?   RML alpha killed below');
for (const s of [SQE, 2.7, 2.8, 2.9, 3.0, 3.0001, 3.5, 4.0, 5.0, 8.0]) {
  const lp = lpMax(4, s, false).max, th = 2 * lp;
  P(`  ${s.toFixed(4).padStart(7)}  ${th.toFixed(6).padStart(10)}   (2, ${BETA2.toFixed(5)}]   ${th > BETA2 ? 'ALL KILLED' : 'SOME SURVIVE'}   alpha < ${th.toFixed(6)}`);
}
P('');
P('SEC 8  the crossing level of the literal construction against H = z^{u0}');
{
  // A1A2 ~ C * z^{16s/9} / ln^8 z ; fit C from the measured runs at each s, then solve
  for (const [A, B, lab] of [[3, 1, '3.0'], [14, 5, '2.8']]) {
    const s = A / B; const rs = runs.filter((x) => x.lab === lab && x.c.ok);
    if (!rs.length) continue;
    const last = rs[rs.length - 1], f = last.f;
    const cs = [f.b1.count, f.b2.count, f.b3.count, f.b4.count];
    const A1 = cs.reduce((a, c) => a * Math.ceil(c / 2), 1), A2 = cs.reduce((a, c) => a * Math.floor(c / 2), 1);
    const lnz = Math.log(last.z);
    const C = Math.log(A1 * A2) - (16 * s / 9) * lnz + 8 * Math.log(lnz);
    // solve C + (16s/9) L - 8 ln L = u0 L for u0 = beta2
    let lo = lnz, hi = 5000;
    for (let it = 0; it < 300; it++) { const mid = (lo + hi) / 2; const v = C + (16 * s / 9) * mid - 8 * Math.log(mid) - BETA2 * mid; if (v < 0) lo = mid; else hi = mid; }
    P(`  s=${lab}  fitted lnC = ${C.toFixed(4)} (C = ${Math.exp(C).toExponential(3)})  crossing A1A2 = z^{beta2} at z ~ 10^${((lo + hi) / 2 / Math.LN10).toFixed(2)}`);
  }
}

console.log(out.join('\n'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0904-floor-growth-2.js
//   invocation:  node research/history/staging/redteam-0904-floor-growth-2.js
//   code-sha256: 221413ef962a9911e11681b04dfc3a617e42906b37d2304a760469ecf358a9de
//   out-sha256:  04ce4789add159d231749a194541db0a342c2ec6945da5de08d5d07a2b9adce5
//   body-lines:  210
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-04
//   elapsed:     5.1 s
// ============================================================================
// SEC 0  constants, death thresholds, and the corollary crossing
// beta2 = 4.26645028414864   1+sqrt(e) = 2.648721270700
// 9*beta2/16 = 2.3998782848   (the corollary crossing s*)
// 16*(1+sqrt(e))/9 = 4.708838   (the threshold at the cheapest legal s)
// margin (1+sqrt(e)) - s* = 0.248843
//
// SEC 1  the exit-chain LP by exact vertex enumeration (P1, P2, P3)
//   four primes: max sum a_i under 3a1<=s, a1+a2+3a3<=s, a1>=a2>=a3>=a4>=0, a_i<=1
//      s     LP4     closed form   diff      LP4+window   opt pattern
//    2.3999  2.133244    2.133244     0.0e+0     2.133244   (0.8000, 0.8000, 0.2667, 0.2667)
//    2.4000  2.133333    2.133333     0.0e+0     2.133333   (0.8000, 0.8000, 0.2667, 0.2667)
//    2.5000  2.222222    2.222222     0.0e+0     2.222222   (0.8333, 0.8333, 0.2778, 0.2778)
//    2.6487  2.354419    2.354419   -4.4e-16     2.354419   (0.8829, 0.8829, 0.2943, 0.2943)
//    2.7000  2.400000    2.400000     0.0e+0     2.400000   (0.9000, 0.9000, 0.3000, 0.3000)
//    2.8000  2.488889    2.488889     0.0e+0     2.488889   (0.9333, 0.9333, 0.3111, 0.3111)
//    2.9000  2.577778    2.577778    4.4e-16     2.577778   (0.9667, 0.9667, 0.3222, 0.3222)
//    3.0000  2.666667    2.666667    4.4e-16     2.666667   (1.0000, 1.0000, 0.3333, 0.3333)
//    3.0001  2.666733    2.666733     0.0e+0     2.666733   (1.0000, 1.0000, 0.3334, 0.3334)
//    3.2500  2.833333    2.833333   -4.4e-16     2.833333   (1.0000, 1.0000, 0.4167, 0.4167)
//    3.5000  3.000000    3.000000     0.0e+0     3.000000   (1.0000, 1.0000, 0.5000, 0.5000)
//    4.0000  3.333333    3.333333   -4.4e-16     3.333333   (1.0000, 1.0000, 0.6667, 0.6667)
//    4.9990  3.999333    3.999333    4.4e-16     3.999333   (1.0000, 1.0000, 0.9997, 0.9997)
//    5.0000  4.000000    4.000000     0.0e+0     4.000000   (1.0000, 1.0000, 1.0000, 1.0000)
//    6.0000  4.000000    4.000000     0.0e+0     4.000000   (1.0000, 1.0000, 1.0000, 1.0000)
//   10.0000  4.000000    4.000000     0.0e+0    -Infinity   (1.0000, 1.0000, 1.0000, 1.0000)
//   P1 violations (LP4 != closed form): 0
//   P2: the exit window never LOWERS a finite optimum; it can make the polytope EMPTY.
//   P2b  four-prime construction: is there any legal p* at all? (need sum a + 3 a4 > s)
//      s     LP4      sum a + 3 a4   legal p* window?
//    2.7000  2.400000      3.300000   YES
//    3.0000  2.666667      3.666667   YES
//    3.5000  3.000000      4.500000   YES
//    4.0000  3.333333      5.333333   YES
//    5.0000  4.000000      7.000000   YES
//    6.0000  4.000000      7.000000   YES
//    6.9000  4.000000      7.000000   YES
//    7.0000  4.000000      7.000000   NO  (four-prime family EMPTY: no exit prime below z)
//    7.1000  4.000000      7.000000   NO  (four-prime family EMPTY: no exit prime below z)
//    8.0000  4.000000      7.000000   NO  (four-prime family EMPTY: no exit prime below z)
//   10.0000  4.000000      7.000000   NO  (four-prime family EMPTY: no exit prime below z)
//   P2c  the threshold curve with the exit window enforced, best over chain length 2k
//        (constructive lower bound: the all-ones 2k pattern, feasible iff 2k+1 <= s and 2k+3 > s;
//         plus the four-prime windowed LP where it is feasible)
//      s      best per-side   doubled     vs beta2
//    2.6487      2.354419    4.708838   ABOVE   [4-prime LP]
//    2.7000      2.400000    4.800000   ABOVE   [4-prime LP]
//    3.0000      2.666667    5.333333   ABOVE   [4-prime LP]
//    3.5000      3.000000    6.000000   ABOVE   [4-prime LP]
//    4.0000      3.333333    6.666667   ABOVE   [4-prime LP]
//    5.0000      4.000000    8.000000   ABOVE   [4-prime LP]
//    6.0000      4.000000    8.000000   ABOVE   [4-prime LP]
//    7.0000      6.000000   12.000000   ABOVE   [all-ones 2k=6]
//    8.0000      6.000000   12.000000   ABOVE   [all-ones 2k=6]
//    9.0000      8.000000   16.000000   ABOVE   [all-ones 2k=8]
//   12.0000     10.000000   20.000000   ABOVE   [all-ones 2k=10]
//   20.0000     18.000000   36.000000   ABOVE   [all-ones 2k=18]
//   P4 extended: legal s at which the windowed doubled threshold is NOT above beta2: 0
//   2k primes, capped, at s = 3.0 and s = 2.8:
//     s=2.8  2k=2  LP = 1.866667   s(1-3^-k) = 1.866667   cap-min = 1.866667   doubled = 3.733333
//     s=2.8  2k=4  LP = 2.488889   s(1-3^-k) = 2.488889   cap-min = 2.488889   doubled = 4.977778
//     s=2.8  2k=6  LP = 2.696296   s(1-3^-k) = 2.696296   cap-min = 2.696296   doubled = 5.392593
//     s=2.8  2k=8  LP = 2.765432   s(1-3^-k) = 2.765432   cap-min = 2.765432   doubled = 5.530864
//     s=3  2k=2  LP = 2.000000   s(1-3^-k) = 2.000000   cap-min = 2.000000   doubled = 4.000000
//     s=3  2k=4  LP = 2.666667   s(1-3^-k) = 2.666667   cap-min = 2.666667   doubled = 5.333333
//     s=3  2k=6  LP = 2.888889   s(1-3^-k) = 2.888889   cap-min = 2.888889   doubled = 5.777778
//     s=3  2k=8  LP = 2.962963   s(1-3^-k) = 2.962963   cap-min = 2.962963   doubled = 5.925926
//   the corollary: 2 x cappedLP4(s) vs beta2
//     bisected crossing 2*LP4(s) = beta2 at s = 2.3998782848   (9*beta2/16 = 2.3998782848, diff -4.44e-16)
//     P4: legal s with 2*cappedLP4(s) <= beta2: 0
//
// SEC 2  own Rosser support, own lambda, sign check, exit-chain identity
//   (this repeats the first pass s attack 5 as INFRASTRUCTURE; declared as a repeat)
//    z   s=A/B   divisors  lam+<0  lam-<0>0  identity mismatches  even-exit(D+)  odd-exit(D-)
//    13    2.7        32       0         0                    0              0             0
//    13    2.8        32       0         0                    0              0             0
//    13    3.0        32       0         0                    0              0             0
//    17    2.7        64       0         0                    0              0             0
//    17    2.8        64       0         0                    0              0             0
//    17    3.0        64       0         0                    0              0             0
//    19    2.7       128       0         0                    0              0             0
//    19    2.8       128       0         0                    0              0             0
//    19    3.0       128       0         0                    0              0             0
//    23    2.7       256       0         0                    0              0             0
//    23    2.8       256       0         0                    0              0             0
//    23    3.0       256       0         0                    0              0             0
//    29    2.7       512       0         0                    0              0             0
//    29    2.8       512       0         0                    0              0             0
//    29    3.0       512       0         0                    0              0             0
//    31    2.7      1024       0         0                    0              0             0
//    31    2.8      1024       0         0                    0              0             0
//    31    3.0      1024       0         0                    0              0             0
//    37    2.7      2048       0         0                    0              0             0
//    37    2.8      2048       0         0                    0              0             0
//    37    3.0      2048       0         0                    0              0             0
//    41    2.7      4096       0         0                    0              0             0
//    41    2.8      4096       0         0                    0              0             0
//    41    3.0      4096       0         0                    0              0             0
//
// SEC 3  the CRT step, the planted positions counted, and T = H.M + R_H  (P5, P6)
//    z   s    W        Omega  M           sup|R_1|   Omega+M    E4 viol  CRT formula vs walk
//    13 2.7      2310      1  0.0506494  1.0506494  1.0506494        0   5 vs 5   argmin (A1,B1,A2,B2)=(1,-1,0,1) signs ROUGH SIDE (n=1, B=-lam-(1)=-1; E3 non-negativity is for doubly NON-rough points) pred -1 vs min -1
//    13 3.0      2310      1  0.0558442  1.0558442  1.0558442        0   3 vs 3   argmin (A1,B1,A2,B2)=(0,1,1,-1) signs ROUGH SIDE (n=1, B=-lam-(1)=-1; E3 non-negativity is for doubly NON-rough points) pred -1 vs min -1
//    17 2.7     30030      2  0.0437895  2.0437895  2.0437895        0   3 vs 3   argmin (A1,B1,A2,B2)=(0,2,1,-1) signs ROUGH SIDE (n=1, B=-lam-(1)=-1; E3 non-negativity is for doubly NON-rough points) pred -2 vs min -2
//    17 3.0     30030      2  0.0469863  2.0469863  2.0469863        0   1 vs 1   argmin (A1,B1,A2,B2)=(1,-1,0,2) signs ROUGH SIDE (n=1, B=-lam-(1)=-1; E3 non-negativity is for doubly NON-rough points) pred -2 vs min -2
//    19 2.7    510510      3  0.0353509  3.0353509  3.0353509        0   3 vs 3   argmin (A1,B1,A2,B2)=(1,2,1,0) signs ok pred -3 vs min -3
//    19 3.0    510510      3  0.0395977  3.0395977  3.0395977        0   1 vs 1   argmin (A1,B1,A2,B2)=(1,-1,0,3) signs ROUGH SIDE (n=1, B=-lam-(1)=-1; E3 non-negativity is for doubly NON-rough points) pred -3 vs min -3
//    23 2.7   9699690      6  0.0307005  6.0307005  6.0307005        0   1 vs 1   argmin (A1,B1,A2,B2)=(3,0,1,1) signs ok pred -6 vs min -6
//    23 3.0   9699690      3  0.0341692  3.0341692  3.0341692        0   15 vs 15   argmin (A1,B1,A2,B2)=(1,-1,3,3) signs ROUGH SIDE (n=1, B=-lam-(1)=-1; E3 non-negativity is for doubly NON-rough points) pred -3 vs min -3
//   S3b  explicit CRT planting: two disjoint odd prime sets, the position solved, cc(r) predicted
//      z   s    n1          n2          r          A1  B1  A2  B2   cc(r) walked  -(A1A2+A1B2+B1A2)  #positions
//     19 2.7         273         935     180453   0   0   0   0              0                  0  1 (formula 1)
//     19 3.0         273         935     180453   0   0   1   0              0                  0  1 (formula 1)
//     23 2.7        5187         935    5285553   0   0   0   0              0                  0  1 (formula 1)
//     23 3.0        5187         935    5285553   0   0   1   0              0                  0  1 (formula 1)
//   S3b failures (no position, or cc(r) != -(A1A2+A1B2+B1A2), or count mismatch): 0
//   P5 violations (CRT formula vs brute-force walk): 0
//   P6 violations (sup|R_1| != Omega + M): 0
//
// SEC 4  the literal dyadic family: exact integer membership at several levels  (P7, P9)
//    s     z          U1=D^1/3   U3=D^1/9  analytic p* window / exact p*                |B1|     |B2|     |B3| |B4|  corner check
//   3.0    1000003     1000003       100  analytic(16,25)=3  exact p*=[19,23]                36960    19494   10    6  ALL PASS
//   3.0    3000017     3000017       144  analytic(20,36)=3  exact p*=[23,29]               102660    53918   14    9  ALL PASS
//   3.0   10000019    10000019       215  analytic(20,53)=4  exact p*=[29,31]               316066   165441   19   12  ALL PASS
//   3.0   30000001    30000001       310  analytic(24,77)=4  exact p*=[29,31]               887155   462443   27   15  ALL PASS
//   3.0  100000007   100000007       464  analytic(28,116)=4  exact p*=[31,37]             2760321  1435207   40   20  ALL PASS
//   2.8    1000003      398108        73  analytic(16,18)=1  exact p*=[17]                   15795     8363   10    4  EMPTY
//   2.8    3000017     1109980       103  analytic(16,25)=3  exact p*=[19,23]                40745    21465   12    6  ALL PASS
//   2.8   10000019     3414554       150  analytic(20,37)=3  exact p*=[23,29]               115899    60765   14    9  ALL PASS
//   2.8   30000001     9520209       211  analytic(20,52)=4  exact p*=[29,31]               301970   157951   20   12  ALL PASS
//   2.8  100000007    29286447       308  analytic(24,77)=4  exact p*=[29,31]               867147   452090   27   15  ALL PASS
//   2.7    1000003      251189        63  analytic(12,15)=1  exact p*=[]                     10350     5481    7    5  EMPTY
//   2.7    3000017      675167        87  analytic(16,21)=2  exact p*=[19]                   25697    13605    9    6  EMPTY
//   2.7   10000019     1995265       125  analytic(20,31)=2  exact p*=[19,23]                70259    36887   12    7  ALL PASS
//   2.7   30000001     5363016       175  analytic(20,43)=4  exact p*=[23,29]               176592    92470   17    9  ALL PASS
//   2.7  100000007    15848932       251  analytic(24,62)=4  exact p*=[29,31]               486938   254337   24   12  ALL PASS
//   P7b  random-sample verification: 400 real tuples per level checked as first-exit chains
//      s     z          tuples  membership failures  min ln-margin on d' > D/p*^3
//   3.0    1000003     400                    0  0.5297
//   3.0    3000017     400                    0  0.7087
//   3.0   10000019     400                    0  0.9699
//   3.0   30000001     400                    0  0.5312
//   3.0  100000007     400                    0  0.6114
//   2.8    3000017     400                    0  0.5016
//   2.8   10000019     400                    0  0.6627
//   2.8   30000001     400                    0  0.8462
//   2.8  100000007     400                    0  0.7751
//   2.7   10000019     400                    0  0.3588
//   2.7   30000001     400                    0  0.4208
//   2.7  100000007     400                    0  0.9771
//   P7c  EXACT onset: first z (scanned on a 0.5%% log grid) at which the exact family is non-empty
//     s=3.0  exact family first non-empty at z ~ 441570   (source note s analytic bound at s=2.6987 was 1.055e6)
//     s=2.8  exact family first non-empty at z ~ 1122018   (source note s analytic bound at s=2.6987 was 1.055e6)
//     s=2.7  exact family first non-empty at z ~ 1862087   (source note s analytic bound at s=2.6987 was 1.055e6)
//   P9 onset: first z with a NON-EMPTY p* window and with TWO primes in it
//     s=3.0  analytic 16^{27/2s} = 2.621e+5   window non-empty from z ~ 175792   two primes from z ~ 512861
//     s=2.8  analytic 16^{27/2s} = 6.391e+5   window non-empty from z ~ 416869   two primes from z ~ 1318257
//     s=2.7  analytic 16^{27/2s} = 1.049e+6   window non-empty from z ~ 676083   two primes from z ~ 2213095
//   P1b  is the LP pattern (s/3,s/3,s/9,s/9) also the best at a REACHABLE level?
//        exhaustive search over ALL dyadic box quadruples (2^{t-1}, 2^t], t1>t2>t3>t4, with every
//        Rosser and exit condition checked in EXACT integer arithmetic on the real primes found
//      s     z          best (t1,t2,t3,t4)  best log10 A1A2   note pattern log10 A1A2   gap
//   3.0  100000007  (26,25,9,8)         28.1235                 28.5937   -0.4702 dex   best p* = 41
//   2.8  100000007  (24,23,9,8)         25.8595                 25.9908   -0.1313 dex   best p* = 29
//
// SEC 5  the count at a DIFFERENT s, with the pre-registered slope band  (P8)
//    s      z          c1        c2      c3   c4   A1           A2           A1*A2        log_z    step slope   model 16s/9-8/lnz
//   3.0    1000003     36960     19494   10    6  2.7019e+9  2.7019e+9  7.3001e+18  3.1439       -      4.7543
//   3.0    3000017    102660     53918   14    9  4.8433e+10  3.8747e+10  1.8766e+21  3.2844     5.0512   4.7969
//   3.0   10000019    316066    165441   19   12  7.8436e+11  7.0591e+11  5.5369e+23  3.3919     4.7237   4.8370
//   3.0   30000001    887155    462443   27   15  1.1487e+13  9.3334e+12  1.0721e+26  3.4813     4.7933   4.8687
//   3.0  100000007   2760321   1435207   40   20  1.9808e+14  1.9808e+14  3.9236e+28  3.5742     4.9025   4.8990
//   2.8    1000003   family empty (EMPTY)
//   2.8    3000017     40745     21465   12    6  3.9359e+9  3.9354e+9  1.5489e+19  2.9627       -      4.4414
//   2.8   10000019    115899     60765   14    9  6.1624e+10  4.9297e+10  3.0379e+21  3.0689     4.3845   4.4814
//   2.8   30000001    301970    157951   20   12  7.1545e+11  7.1544e+11  5.1186e+23  3.1709     4.6667   4.5131
//   2.8  100000007    867147    452090   27   15  1.0977e+13  8.9186e+12  9.7898e+25  3.2488     4.3636   4.5435
//   2.7    1000003   family empty (EMPTY)
//   2.7    3000017   family empty (EMPTY)
//   2.7   10000019     70259     36887   12    7  1.5551e+10  1.1662e+10  1.8135e+20  2.8941       -      4.3037
//   2.7   30000001    176592     92470   17    9  1.8371e+11  1.3064e+11  2.3999e+22  2.9932     4.4468   4.3353
//   2.7  100000007    486938    254337   24   12  2.2292e+12  2.2292e+12  4.9695e+24  3.0870     4.4296   4.3657
//
// SEC 6  the planted positions density against the PROVEN mean square  (P10)
//    s      z          ln(n1n2)      log10(A1A2)  log10 upper bound on the planted contribution to <R_1^2>
//   3.0    1000003  7.49010e+5       18.863  -3.25253e+5
//   3.0    3000017  2.24948e+6       21.273  -9.76896e+5
//   3.0   10000019  7.49750e+6       23.743  -3.25608e+6
//   3.0   30000001  2.24980e+7       26.030  -9.77071e+6
//   3.0  100000007  7.49934e+7       28.594  -3.25692e+7
//   2.8    3000017  8.31888e+5       19.190  -3.61246e+5
//   2.8   10000019  2.56097e+6       21.483  -1.11217e+6
//   2.8   30000001  7.13881e+6       23.709  -3.10030e+6
//   2.8  100000007  2.19601e+7       25.991  -9.53710e+6
//
// SEC 7  the death table: which (s, u0) the floor kills, and RML(alpha)
//    s      threshold 16s/9 (s<=3) or capped   legal u0 band (2, beta2]   killed?   RML alpha killed below
//    2.6487    4.708838   (2, 4.26645]   ALL KILLED   alpha < 4.708838
//    2.7000    4.800000   (2, 4.26645]   ALL KILLED   alpha < 4.800000
//    2.8000    4.977778   (2, 4.26645]   ALL KILLED   alpha < 4.977778
//    2.9000    5.155556   (2, 4.26645]   ALL KILLED   alpha < 5.155556
//    3.0000    5.333333   (2, 4.26645]   ALL KILLED   alpha < 5.333333
//    3.0001    5.333467   (2, 4.26645]   ALL KILLED   alpha < 5.333467
//    3.5000    6.000000   (2, 4.26645]   ALL KILLED   alpha < 6.000000
//    4.0000    6.666667   (2, 4.26645]   ALL KILLED   alpha < 6.666667
//    5.0000    8.000000   (2, 4.26645]   ALL KILLED   alpha < 8.000000
//    8.0000    8.000000   (2, 4.26645]   ALL KILLED   alpha < 8.000000
//
// SEC 8  the crossing level of the literal construction against H = z^{u0}
//   s=3.0  fitted lnC = -9.0964 (C = 1.121e-4)  crossing A1A2 = z^{beta2} at z ~ 10^15.30
//   s=2.8  fitted lnC = -8.5403 (C = 1.954e-4)  crossing A1A2 = z^{beta2} at z ~ 10^25.01
// ============================================================================
// READINGS
// ============================================================
//
//  1. VERIFIED (exact vertex enumeration, S1). The four-prime exit-chain LP
//     maximum is 8s/9 for s <= 3, (2s+2)/3 for 3 <= s <= 5 and 4 for s >= 5,
//     with 0 deviations at 16 values of s (largest residual 4.4e-16) and the
//     optimal vertex printed as (s/3, s/3, s/9, s/9) at every s <= 3. Found by
//     vertices, not by a grid.
//  2. VERIFIED, NEW (S1, P2b). The four-prime construction has NO legal exit
//     prime below z once s >= 7: at the optimum sum(a) + 3 a4 = 7 for every
//     s >= 5, so the exit condition sum(a) + 3 a4 > s fails. The first pass's
//     "threshold 8 beyond s = 5" is available only on 5 <= s < 7; the all-ones
//     2k chains carry s >= 7 with a larger threshold (12 at s = 7, 36 at 20).
//  3. VERIFIED (S1, P4). The corollary's crossing 2 x cappedLP4(s) = beta2
//     bisects to s* = 2.3998782848 against 9 beta2/16 = 2.3998782848, agreeing
//     to 4.4e-16; 1+sqrt(e) clears it by 0.248843; 0 of 10 legal s fail.
//  4. VERIFIED (S2, 24 rows). Over all 2^{pi(z)-1} divisors at z = 13..41 and
//     three values of s: 0 negative lambda+, 0 positive lambda-, 0 mismatches
//     between lambda+ and the first-exit-chain count, 0 even-length exits from
//     D+, 0 odd-length exits from D-. Declared a repeat, kept as infrastructure.
//  5. VERIFIED, NEW (S3, S3b). The planted class has exactly
//     prod_{odd p not dividing n1 n2}(p - 2) members -- a product of positive
//     integers, so a planted position always exists and needs no estimate.
//     0 disagreements with a brute-force walk of the whole of Z/W at 8 (z,s)
//     rows and at 4 explicit planted splits. E4 has 0 violations over four
//     complete periods with the wrap at six values of H. sup|R_1| = Omega + M
//     exactly at all 8 rows, which is the identity REC and the floor share.
//  6. VERIFIED, NEW (S4, P7 and P7b). Every member of the literal dyadic family
//     is a genuine first-exit chain of D+, checked in EXACT integer arithmetic
//     (s = A/B rational, so no floating-point boundary decides a membership):
//     corners pass at all 12 live (s, z) levels, and 400 random real tuples per
//     level give 0 failures with a minimum ln-margin of 0.3588. The first pass
//     checked the numeric inequality lambda+ >= family at one level (z = 601);
//     this is the subset relation the inequality actually needs, at twelve.
//  7. VERIFIED, NEW (S4). The analytic p* window (4 D^{1/27}, D^{1/9}/4) is
//     neither necessary nor sufficient at reachable levels: at (3.0, 1e6) it
//     admits 17, which FAILS the exact exit condition; at (2.7, 1e7) it misses
//     19, which PASSES. The exact onset of the family is z ~ 441570 at s = 3.0,
//     1122018 at s = 2.8 and 1862087 at s = 2.7, against the analytic figure
//     the record quotes (an artifact quotation, not produced here).
//  8. MEASURED, pre-registered (S5, P8). At the NEW s = 3.0 the step slopes of
//     ln(A1 A2) over 1e6..1e8 read 5.0512, 4.7237, 4.7933, 4.9025 against the
//     model 16s/9 - 8/ln z = 4.7969..4.8990; the pre-registered top-step band
//     [4.6, 5.6] holds: 4.9025 against a model 4.8990. At s = 2.8 the top step is
//     4.3636 against 4.5435. Four steps over two decades is a consistency
//     reading of the CONSTRUCTION's count, not evidence for the law.
//  9. MEASURED, NEW, and it moves a live figure (S8). Fitting
//     A1 A2 = C z^{16s/9}/ln^8 z gives C = 1.121e-4 at s = 3.0 and puts the
//     crossing A1A2 = z^{beta2} at z ~ 10^15.30, against 10^25.01 at s = 2.8;
//     the record's own figure is at a third s and is an artifact quotation, not
//     produced here. A1A2 is a LOWER bound on Omega, so the true
//     crossing is earlier still: the correction is adverse to REC.
// 10. VERIFIED, NEW (S6, P10). The planted class's own contribution to <R_1^2>
//     is at most (A1A2)^2/(2 n1 n2) with ln(n1 n2) = 7.49934e+7 at (3.0, 1e8):
//     log10 = -3.25692e+7, against B = O(ln^8 z), a polylog. No contradiction
//     with Lemma V, by an exponential in D^{1/3}. The first pass used density
//     1/W, which understates the planted class by the factor W/(n1 n2); the
//     escape still fails and the arithmetic is corrected.
// 11. VERIFIED, NEW (S4, P1b). At a reachable level the LP SHAPE is also the
//     best: an exhaustive search over all dyadic quadruples returns (26,25,9,8)
//     at s = 3.0, z = 1e8 and (24,23,9,8) at s = 2.8 -- an adjacent pair at
//     D^{1/3} and an adjacent pair at D^{1/9} -- found by a search not told the
//     answer. The note's own non-aligned boxes beat the best aligned quadruple
//     by 0.4702 and 0.1313 dex.
// 12. UNCHANGED. No exponent moved. The growth half stays DERIVED; the best
//     log_z(A1 A2) reached is 3.5742 at (3.0, 1e8), against the u0 just under
//     beta2 = 4.26645028414864 that a failing window needs.
