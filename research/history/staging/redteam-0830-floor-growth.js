#!/usr/bin/env node
'use strict';
// ============================================================================
// redteam-0830-floor-growth.js
//
// ADVERSARIAL, INDEPENDENT re-derivation of the GROWTH half of
// research/history/staging/attack-0830-rec-cheapest.md sec.4.2 - 4.3:
//   (i)   Omega(z,s) >> z^{16s/9} / ln^8 z from four-prime Rosser exit chains;
//   (ii)  therefore REC(s, u0) is FALSE for every u0 < 16s/9;
//   (iii) the certified counts "track the model at 0.012 -> 0.35" and the
//         blind slope rows of blind-0830-omega-floor.md.
//
// Shares no code with attack-0830-rec-cheapest.js, blind-0830-omega-floor.js
// or research/sift-limit-lemmaV.js: own sieve, own statement of the Rosser
// conditions, own support DFS, own lambda by direct Moebius summation over ALL
// divisors, own exit-chain enumeration, own loop order for the chain counts,
// own segmented sieve for the dyadic boxes.
//
// A  THE BRIDGE, re-derived and re-checked. For every subset of the primes
//    below z: lambda^+(n) computed two ways that share nothing (direct
//    Moebius sum over every divisor with a membership test; and a count of
//    first-exit chains ending at the least prime of n). Also: does D+ ever
//    exit at even length, does D- ever exit at odd length, is lambda^+ >= 0.
// B  THE EXPONENT, as a linear program. Maximise the z-exponent of a
//    four-prime chain under the D+ prefix conditions AND the constraint every
//    prime divides P(z), i.e. exponent <= 1. This is where the note's 8s/9
//    per side comes from, and where its scope ends.
// C  THE CONSTRUCTION AS LITERALLY WRITTEN. The four dyadic boxes, the p*
//    window (4 D^{1/27}, D^{1/9}/4), exact prime counts by segmented sieve,
//    the parity split, the corner inequalities verified on real integers, the
//    turn-on level, and the measured local slope against 16s/9 - 8/ln z.
// D  THE CERTIFIED FAMILY RECOUNTED. The source's S4b object (primes above
//    47 split by parity, best p* <= 47 per side, exit chains of length 2 and
//    4) recounted with a different loop order, cross-checked at small z
//    against a brute-force quadruple loop, and its ratio to the model.
// E  THE IMPLICATION. Both routes from Omega to a contradiction with REC
//    (via min T >= 1 and via sup/rms directly), the exact threshold, the
//    margin the proven mean square leaves, and the size of the planted
//    windows' own contribution to <R_H^2> - the escape "the rms is as large".
// F  IS THE BLIND TEST A TEST OF THE LAW OR OF THE CONSTRUCTION? A control
//    family built by dropping one D+ condition, so the slope test is shown to
//    discriminate exponents of the counted object - and only of that.
//
//   node research/history/staging/redteam-0830-floor-growth.js
// Progress on stderr; stdout carries no timing figure.
// ============================================================================

const BETA2 = 4.26645028414864;
const SE = 1 + Math.sqrt(Math.E);
const ETA = 0.05;
const S = SE + ETA;          // 2.698721..., the source's working s
const U0 = BETA2 - ETA;      // 4.216450...
const S3 = 3.0;

const f = (x, d) => Number(x).toFixed(d);
const e3 = (x) => Number(x).toExponential(3);
const T0 = Date.now();
// deterministic PRNG: the hill climb must reproduce bit for bit under embed --check
let RNGSTATE = 20260830 >>> 0;
const rnd = () => { RNGSTATE = (RNGSTATE * 1664525 + 1013904223) >>> 0; return RNGSTATE / 4294967296; };
const prog = (m) => process.stderr.write(`  [${((Date.now() - T0) / 1000).toFixed(1)}s] ${m}\n`);
let FAIL = 0;
const must = (cond, msg) => { if (!cond) { FAIL++; console.log(`  *** ASSERTION FAILED: ${msg}`); } };

// ---------------------------------------------------------------- primes
function smallPrimes(n) {
  const c = new Uint8Array(n + 1), out = [];
  for (let i = 2; i <= n; i++) {
    if (!c[i]) { out.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; }
  }
  return out;
}
// segmented count of primes in (lo, hi], and the least prime > lo
function segCount(lo, hi, base) {
  if (hi <= lo) return 0;
  let total = 0;
  const CH = 1 << 20;
  for (let a = Math.floor(lo) + 1; a <= hi; a += CH) {
    const b = Math.min(hi, a + CH - 1), len = b - a + 1;
    const c = new Uint8Array(len);
    for (const p of base) {
      if (p * p > b) break;
      let st = Math.max(p * p, Math.ceil(a / p) * p);
      for (let j = st; j <= b; j += p) c[j - a] = 1;
    }
    for (let i = 0; i < len; i++) if (!c[i] && a + i >= 2) total++;
  }
  return total;
}
function leastPrimeAbove(x, base) {
  let n = Math.floor(x) + 1; if (n < 2) n = 2;
  for (;; n++) {
    let ok = true;
    for (const p of base) { if (p * p > n) break; if (n % p === 0) { ok = false; break; } }
    if (ok && n > 1) return n;
  }
}

// ================================================================== SEC A
// OWN statement of the Rosser supports. d = q1 > q2 > ... > qm squarefree,
// all qi < z. d in D+ iff  q1..qj <= D for every j, and q1..q_{j-1} qj^3 <= D
// for every ODD j <= m. d in D- iff the same with EVEN j. (beta = 2 Rosser.)
function inSupport(qs, D, upper) {  // qs descending
  let pr = 1;
  for (let j = 1; j <= qs.length; j++) {
    const q = qs[j - 1];
    if (pr * q > D) return false;
    const cond = upper ? (j % 2 === 1) : (j % 2 === 0);
    if (cond && pr * q * q * q > D) return false;
    pr *= q;
  }
  return true;
}
function secA() {
  console.log('SEC A  THE BRIDGE: lambda^+(n) by direct Moebius summation vs a count of first-exit chains, over EVERY subset of the primes below z');
  console.log('  (own membership test, own divisor enumeration; "chain" = d0 = q1..qm, q1..q_{m-1} in support, d0 not in support, qm = least prime of n)');
  console.log('    s        z    k    subsets   lam+ mismatch   lam- mismatch   D+ even-exits   D- odd-exits   lam+<0   lam->0   lam+(P(z))   max lam+');
  for (const s of [S, S3]) for (const z of [13, 19, 23, 29, 31, 37, 41]) {
    const ps = smallPrimes(z - 1), k = ps.length, D = Math.pow(z, s);
    const desc = ps.slice().reverse();               // descending
    let misP = 0, misM = 0, evenExit = 0, oddExit = 0, negP = 0, posM = 0, maxP = 0, lamPfull = 0;
    for (let mask = 1; mask < (1 << k); mask++) {
      // the subset, descending
      const qs = [];
      for (let i = k - 1; i >= 0; i--) if ((mask >> i) & 1) qs.push(ps[i]);
      const pmin = qs[qs.length - 1];
      // (1) direct Moebius sum over ALL divisors (submasks), membership tested
      let lp = 0, lm = 0;
      for (let sub = mask; ; sub = (sub - 1) & mask) {
        const ds = [];
        for (let i = 0; i < k; i++) if ((sub >> i) & 1) ds.push(ps[i]);
        ds.sort((a, b) => b - a);
        const mu = ds.length % 2 ? -1 : 1;
        if (inSupport(ds, D, true)) lp += mu;
        if (inSupport(ds, D, false)) lm += mu;
        if (sub === 0) break;
      }
      // (2) first-exit chains ending exactly at pmin
      let cp = 0, cm = 0;
      for (let sub = mask; ; sub = (sub - 1) & mask) {
        if (sub === 0) break;
        const ds = [];
        for (let i = 0; i < k; i++) if ((sub >> i) & 1) ds.push(ps[i]);
        ds.sort((a, b) => b - a);
        if (ds[ds.length - 1] !== pmin) continue;      // must end at the least prime of n
        const pre = ds.slice(0, ds.length - 1);
        for (const up of [true, false]) {
          if (!inSupport(pre, D, up) || inSupport(ds, D, up)) continue;
          if (up) { cp++; if (ds.length % 2 === 0) evenExit++; }
          else { cm++; if (ds.length % 2 === 1) oddExit++; }
        }
      }
      if (lp !== cp) misP++;      // identity: lam+(n) = +#chains  (all mu = -1)
      if (lm !== -cm) misM++;     // identity: lam-(n) = -#chains  (all mu = +1)
      if (lp < 0) negP++;
      if (lm > 0) posM++;
      if (lp > maxP) maxP = lp;
      if (mask === (1 << k) - 1) lamPfull = lp;
    }
    must(misP === 0 && misM === 0 && evenExit === 0 && oddExit === 0 && negP === 0 && posM === 0,
      `SEC A z=${z} s=${f(s, 4)}`);
    console.log(`  ${f(s, 6)}  ${String(z).padStart(3)}  ${String(k).padStart(3)}  ${String((1 << k) - 1).padStart(8)}   ${String(misP).padStart(13)}   ${String(misM).padStart(13)}   ${String(evenExit).padStart(13)}   ${String(oddExit).padStart(12)}   ${String(negP).padStart(6)}   ${String(posM).padStart(6)}   ${String(lamPfull).padStart(10)}   ${String(maxP).padStart(7)}`);
  }
  console.log('');
}

// ================================================================== SEC B
// The exponent as an LP. a_i = log_z p_i, descending, a_i <= 1 (p_i | P(z)),
// prefix conditions a_1+..+a_{j-1} + 3 a_j <= s at odd j. Maximise sum a_i.
function lp4(s, cap) {
  const N = 1200; let best = 0, arg = null;
  const hi1 = Math.min(cap, s / 3);
  for (let i = 0; i <= N; i++) {
    const a1 = hi1 * i / N;
    for (let j = 0; j <= N; j++) {
      const a2 = a1 * j / N;
      const a3 = Math.min(a2, (s - a1 - a2) / 3);
      if (a3 < 0) continue;
      const v = a1 + a2 + 2 * a3;
      if (v > best) { best = v; arg = [a1, a2, a3, a3]; }
    }
  }
  return { best, arg };
}
function lp2k(s, cap, k, restarts) {   // 2k primes, seeded-restart hill climb
  RNGSTATE = (20260830 + 1000 * k + Math.round(1000 * s)) >>> 0;
  const n = 2 * k;
  const feas = (a) => {
    for (let i = 1; i < n; i++) if (a[i] > a[i - 1] + 1e-12) return false;
    for (const x of a) if (x < -1e-12 || x > cap + 1e-12) return false;
    let pr = 0;
    for (let j = 1; j <= n; j++) { if (j % 2 === 1 && pr + 3 * a[j - 1] > s + 1e-12) return false; pr += a[j - 1]; }
    return true;
  };
  const patt = []; for (let i = 1; i <= k; i++) { patt.push(Math.min(cap, s / Math.pow(3, i)), Math.min(cap, s / Math.pow(3, i))); }
  let best = feas(patt) ? patt.reduce((x, y) => x + y, 0) : -1, arg = patt.slice();
  for (let r = 0; r < restarts; r++) {
    let a = new Array(n).fill(0).map(() => rnd() * Math.min(cap, s / 3));
    a.sort((x, y) => y - x);
    if (!feas(a)) continue;
    let step = 0.2;
    while (step > 1e-6) {
      let moved = false;
      for (let i = 0; i < n; i++) for (const d of [step, -step]) {
        const b = a.slice(); b[i] += d;
        if (feas(b) && b.reduce((x, y) => x + y, 0) > a.reduce((x, y) => x + y, 0) + 1e-12) { a = b; moved = true; }
      }
      if (!moved) step /= 2;
    }
    const v = a.reduce((x, y) => x + y, 0);
    if (v > best) { best = v; arg = a.slice(); }
  }
  return { best, arg };
}
function secB() {
  console.log('SEC B  THE EXPONENT AS AN LP. a_i = log_z p_i, descending, a_i <= 1 because p_i | P(z); D+ prefix conditions sum_{i<j} a_i + 3 a_j <= s at odd j.');
  console.log('  per-side max over 4 primes, with and without the cap a_i <= 1, against the note\'s 8s/9; doubled column against beta_2 = 4.266450');
  console.log('     s      4-prime max (capped)   pattern                      8s/9      (2s+2)/3   uncapped max   2 x capped max   16s/9    2 x capped > beta_2?');
  for (const s of [2.4, SE, S, 2.9, S3, 3.2, 3.5, 4.0, 5.0, 6.0]) {
    const c = lp4(s, 1), u = lp4(s, 1e9);
    const pat = c.arg.map(x => f(x, 4)).join(', ');
    console.log(`  ${f(s, 4)}   ${f(c.best, 6).padStart(18)}   (${pat})   ${f(8 * s / 9, 4)}    ${f((2 * s + 2) / 3, 4)}    ${f(u.best, 6).padStart(10)}   ${f(2 * c.best, 6).padStart(12)}   ${f(16 * s / 9, 4)}   ${2 * c.best > BETA2 ? 'yes' : 'NO'}`);
  }
  console.log('  longer chains (random-restart hill climb: a SEARCH lower bound on the LP max, exact only where it meets the note\'s pattern; s > 3 rows are not converged and are shown to place the ceiling, not to value it):');
  console.log('     s    2k   per-side max   note pattern s(1-3^{-k})   doubled   2s');
  for (const s of [S, S3, 3.5, 5.0]) for (const k of [2, 3, 4, 5, 6]) {
    const r = lp2k(s, 1, k, 40), pat = s * (1 - Math.pow(3, -k));
    console.log(`  ${f(s, 4)}  ${String(2 * k).padStart(3)}   ${f(r.best, 6).padStart(12)}   ${f(pat, 6).padStart(20)}   ${f(2 * r.best, 6).padStart(7)}   ${f(2 * s, 4)}   ${r.best < pat - 1e-6 ? 'pattern ILLEGAL (a_i > 1)' : ''}`);
  }
  console.log('');
}

// ================================================================== SEC C
function secC(base) {
  console.log('SEC C  THE CONSTRUCTION AS LITERALLY WRITTEN (source sec.4.2), exact prime counts by segmented sieve, s = 2.698721');
  console.log('  boxes B1 = (D^{1/3}/2, D^{1/3}], B2 = (D^{1/3}/4, D^{1/3}/2], B3 = (D^{1/9}/2, D^{1/9}], B4 = (D^{1/9}/4, D^{1/9}/2]; p* in (4 D^{1/27}, D^{1/9}/4)');
  console.log('  turn-on: the p* window is non-empty only when D^{2/27} > 16, i.e. ln D > 27 ln 16 / 2 = ' + f(27 * Math.log(16) / 2, 4));
  const zOn = Math.exp(27 * Math.log(16) / 2 / S);
  console.log(`  => the literal construction is EMPTY for every z < ${e3(zOn)} at s = ${f(S, 6)} (before any question of primes existing in the boxes)`);
  const rows = [];
  for (const z of [1e6, 2e6, 5e6, 1e7, 3e7, 1e8, 3e8, 1e9]) {
    prog(`C z=${e3(z)}`);
    const D = Math.pow(z, S), c3 = Math.pow(D, 1 / 3), c9 = Math.pow(D, 1 / 9), c27 = Math.pow(D, 1 / 27);
    const lo = 4 * c27, hi = c9 / 4;
    const n1 = segCount(c3 / 2, c3, base), n2 = segCount(c3 / 4, c3 / 2, base);
    const n3 = segCount(c9 / 2, c9, base), n4 = segCount(c9 / 4, c9 / 2, base);
    const nStar = hi > lo ? segCount(lo, hi, base) : 0;
    const h = [n1, n2, n3, n4].map(n => Math.floor(n / 2));
    const A = h[0] * h[1] * h[2] * h[3];              // per side after the parity split
    const prod = A * A;
    const model = Math.pow(z, 16 * S / 9) / Math.pow(Math.log(z), 8);
    rows.push({ z, D, c3, c9, lo, hi, n1, n2, n3, n4, nStar, A, prod, model });
    console.log(`   z = ${e3(z)}  D = ${e3(D)}  D^{1/3} = ${e3(c3)}  D^{1/9} = ${f(c9, 1)}  p* window (${f(lo, 2)}, ${f(hi, 2)})  primes B1..B4 = ${n1}, ${n2}, ${n3}, ${n4}  p* candidates = ${nStar}  A_i = ${e3(A)}  A1A2 = ${e3(prod)}  ratio to model = ${e3(prod / model)}`);
    // corner inequalities on real integers, worst case in each box
    if (n1 && n2 && n3 && n4 && nStar >= 2) {
      const p1 = Math.floor(c3), p2 = Math.floor(c3 / 2), p3 = Math.floor(c9), p4 = Math.floor(c9 / 4) + 1;
      const pst = leastPrimeAbove(lo, base);
      must(p1 * p1 * p1 <= D, `C p1^3 <= D at z=${z}`);
      must(p1 * p2 * p3 * p3 * p3 <= D, `C p1 p2 p3^3 <= D at z=${z}`);
      const dmin = (c3 / 2) * (c3 / 4) * (c9 / 2) * (c9 / 4);
      must(dmin * pst * pst * pst > D, `C exit d' p*^3 > D at z=${z}`);
      must(pst < c9 / 4, `C p* below box B4 at z=${z}`);
      must(c3 / 4 > c9, `C box B2 above box B3 at z=${z}`);
    }
  }
  console.log('  local slope of ln(A1A2) on ln z against the law\'s log-corrected slope 16s/9 - 8/ln z:');
  console.log('     z_from -> z_to      step slope    16s/9 - 8/ln z (mid)    excess');
  for (let i = 1; i < rows.length; i++) {
    const a = rows[i - 1], b = rows[i];
    if (!(a.prod > 0 && b.prod > 0)) { console.log(`   ${e3(a.z)} -> ${e3(b.z)}   (one endpoint empty)`); continue; }
    const sl = (Math.log(b.prod) - Math.log(a.prod)) / (Math.log(b.z) - Math.log(a.z));
    const mid = Math.sqrt(a.z * b.z), sm = 16 * S / 9 - 8 / Math.log(mid);
    console.log(`   ${e3(a.z)} -> ${e3(b.z)}    ${f(sl, 4).padStart(9)}    ${f(sm, 4).padStart(18)}    ${f(sl - sm, 4).padStart(7)}`);
  }
  console.log('');
  console.log('  how many primes the LITERAL 2k-prime construction can carry at each z: the smallest box is (D^{3^{-k}}/4, D^{3^{-k}}/2],');
  console.log('  so it needs D^{3^{-k}} >= 8, i.e. 3^k <= ln D / ln 8. Best exponent then available is 2s(1 - 3^{-k}), against the limit 2s = ' + f(2 * S, 4) + ':');
  console.log('      z         ln D      max k    best available exponent 2s(1-3^{-k})    16s/9 = ' + f(16 * S / 9, 4));
  for (const z of [1e6, 1e9, 1e12, 1e18, 1e27, 1e40]) {
    const lnD = S * Math.log(z);
    let k = 1; while (Math.pow(3, k + 1) <= lnD / Math.log(8)) k++;
    console.log(`      ${e3(z)}   ${f(lnD, 2).padStart(7)}   ${String(k).padStart(4)}     ${f(2 * S * (1 - Math.pow(3, -k)), 6).padStart(24)}`);
  }
  console.log('  (k = 2, the four-prime chain, is the only one available at every z below about 1.1e9; k = 4 needs z above 1e27)');
  console.log('');
  const cr = rows.filter(r => r.prod > 0 && r.nStar >= 2);
  const cmean = cr.reduce((a, r) => a + r.prod / r.model, 0) / cr.length;
  console.log(`  the implied constant in ">>": mean of A1A2 / (z^{16s/9}/ln^8 z) over the ${cr.length} live rows = ${e3(cmean)} (flat, no trend over three decades)`);
  let w = 10; while (U0 * w > Math.log(cmean) + (16 * S / 9) * w - 8 * Math.log(w)) w += 0.05;
  console.log(`  on that constant the literal construction's floor first exceeds H = z^{u0} at ln z = ${f(w, 1)}, i.e. z = ${e3(Math.exp(w))}`);
  console.log('');
  console.log(`  the counterexample window's modulus: q = d1 d2 = (d' p*1)(d'' p*2) ~ D^{16/9} p*1 p*2 ~ z^{16s/9 + 2s/27} = z^{${f(16 * S / 9 + 2 * S / 27, 4)}}, against the reduced range (z^{u0-delta}, z^{2s}] = (z^{${f(U0, 4)}-delta}, z^{${f(2 * S, 4)}}]`);
  console.log('');
  return rows;
}

// ================================================================== SEC D
// The source's certified family, recounted. Own loop order: outer (p3, p4),
// then p2 ascending with p1 counted by binary search; own prefix-count table.
function idxLE(arr, x) { let lo = 0, hi = arr.length; while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] <= x) lo = m + 1; else hi = m; } return lo; }
function chains24(Q, pst, D) {
  const t = D / (pst * pst * pst), cb = Math.cbrt(D);
  let c2 = 0, c4 = 0;
  // length 2: p1 > p2, p1^3 <= D, p1 p2 > t
  for (let a = 0; a < Q.length; a++) {
    const p2 = Q[a]; if (p2 >= cb) break;
    const lo = Math.max(p2, t / p2);
    const n = idxLE(Q, cb) - idxLE(Q, lo);
    if (n > 0) c2 += n;
  }
  // length 4: p1 > p2 > p3 > p4, p1^3 <= D, p1 p2 p3^3 <= D, p1 p2 p3 p4 > t
  for (let i3 = 0; i3 < Q.length; i3++) {
    const p3 = Q[i3]; if (Math.pow(p3, 5) > D) break;
    for (let i4 = 0; i4 < i3; i4++) {
      const p4 = Q[i4], u = t / (p3 * p4);
      for (let i2 = i3 + 1; i2 < Q.length; i2++) {
        const p2 = Q[i2]; if (p2 >= cb) break;
        const hi = Math.min(cb, D / (p2 * p3 * p3 * p3)); if (hi <= p2) break;
        const lo = Math.max(p2, u / p2);
        if (hi > lo) c4 += idxLE(Q, hi) - idxLE(Q, lo);
      }
    }
  }
  return { c2, c4, tot: c2 + c4 };
}
function chains24brute(Q, pst, D) {   // O(n^4) with pruning, small z only
  const t = D / (pst * pst * pst), cb = Math.cbrt(D);
  let c2 = 0, c4 = 0;
  for (let i1 = 0; i1 < Q.length; i1++) {
    const p1 = Q[i1]; if (p1 > cb) break;
    for (let i2 = 0; i2 < i1; i2++) {
      const p2 = Q[i2];
      if (p1 * p2 > t) c2++;
      for (let i3 = 0; i3 < i2; i3++) {
        const p3 = Q[i3]; if (p1 * p2 * p3 * p3 * p3 > D) continue;
        for (let i4 = 0; i4 < i3; i4++) if (p1 * p2 * p3 * Q[i4] > t) c4++;
      }
    }
  }
  return { c2, c4, tot: c2 + c4 };
}
function secD() {
  console.log('SEC D  THE CERTIFIED FAMILY RECOUNTED (source S4b), own loop order, s = 2.698721; primes above 47 split by index parity, best p* <= 47 per side');
  console.log('  control at z = 601 and 1000: the same counts from an independent O(n^4) brute force over quadruples');
  console.log('      z       p*1    A1            p*2    A2            A1 A2         log_z      model z^{16s/9}/ln^8 z   ratio     16s/9 - log_z');
  const rows = [];
  for (const z of [601, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000]) {
    prog(`D z=${z}`);
    const D = Math.pow(z, S), ps = smallPrimes(z - 1);
    const small = ps.filter(p => p >= 3 && p <= 47);
    const Q1 = [], Q2 = [];
    ps.forEach((p, i) => { if (p > 47) ((i & 1) ? Q1 : Q2).push(p); });
    // the count is nondecreasing in p* (t = D/p*^3 falls, the slab widens), so the
    // source's greedy max over p* <= 47 is attained at 47 on side 1 and 43 on side 2;
    // the monotonicity is CHECKED by an explicit scan at three levels below.
    const p1s = 47, p2s = 43;
    const b1 = chains24(Q1, p1s, D), b2 = chains24(Q2, p2s, D);
    if (z === 601 || z === 5000 || z === 50000) {
      const sc = small.map(p => chains24(Q1, p, D).tot);
      let mono = true; for (let i = 1; i < sc.length; i++) if (sc[i] < sc[i - 1]) mono = false;
      must(mono, `D monotonicity in p* at z=${z}`);
      must(sc[sc.length - 1] === b1.tot, `D max at p*=47 at z=${z}`);
      console.log(`   p* scan side 1 at z = ${z} over p* = 3..47: ${sc.join(', ')}   monotone = ${mono}`);
    }
    if (z <= 1000) {
      const g1 = chains24brute(Q1, p1s, D), g2 = chains24brute(Q2, p2s, D);
      must(g1.tot === b1.tot && g2.tot === b2.tot, `D brute-force mismatch at z=${z}`);
      console.log(`   brute force z = ${z}: side1 ${g1.tot} (2ch ${g1.c2}, 4ch ${g1.c4}) vs fast ${b1.tot} (${b1.c2}, ${b1.c4});  side2 ${g2.tot} (${g2.c2}, ${g2.c4}) vs fast ${b2.tot} (${b2.c2}, ${b2.c4})   ${g1.tot === b1.tot && g2.tot === b2.tot ? 'MATCH' : 'MISMATCH'}`);
    }
    const prod = b1.tot * b2.tot;
    const model = Math.pow(z, 16 * S / 9) / Math.pow(Math.log(z), 8);
    const lz = prod > 0 ? Math.log(prod) / Math.log(z) : 0;
    rows.push({ z, prod, model, lz });
    console.log(`   ${String(z).padStart(7)}   ${String(p1s).padStart(3)}   ${String(b1.tot).padStart(11)}   ${String(p2s).padStart(3)}   ${String(b2.tot).padStart(11)}   ${e3(prod)}   ${f(lz, 4)}   ${e3(model).padStart(20)}   ${f(prod / model, 4).padStart(7)}   ${f(16 * S / 9 - lz, 4)}`);
  }
  console.log('  step slopes of ln(A1 A2) on ln z, against 16s/9 - 8/ln z at the step midpoint:');
  console.log('     z_from -> z_to     step slope    16s/9 - 8/ln z     excess');
  for (let i = 1; i < rows.length; i++) {
    const a = rows[i - 1], b = rows[i];
    const sl = (Math.log(b.prod) - Math.log(a.prod)) / (Math.log(b.z) - Math.log(a.z));
    const mid = Math.sqrt(a.z * b.z), sm = 16 * S / 9 - 8 / Math.log(mid);
    console.log(`   ${String(a.z).padStart(7)} -> ${String(b.z).padStart(7)}    ${f(sl, 4).padStart(9)}    ${f(sm, 4).padStart(12)}    ${f(sl - sm, 4).padStart(8)}`);
  }
  console.log('');
  return rows;
}

// ================================================================== SEC E
function secE() {
  console.log('SEC E  THE IMPLICATION, both routes, and the two escapes the brief names');
  console.log(`  constants: 1+sqrt(e) = ${f(SE, 12)}   beta_2 = ${f(BETA2, 14)}   eta = ${ETA}   s = ${f(S, 12)}   u0 = ${f(U0, 12)}`);
  console.log('     s        16s/9      u0 = beta_2 - eta   16s/9 - u0   is every legal u0 in (2, beta_2) below 16s/9?   4-prime LP threshold 2*max   is beta_2 below THAT?');
  for (const eta of [0, 0.01, 0.05, 0.1, 0.35]) {
    const s = SE + eta, u = BETA2 - eta, thr = 16 * s / 9, lpthr = 2 * lp4(s, 1).best;
    console.log(`  ${f(s, 6)}   ${f(thr, 6)}   ${f(u, 6).padStart(17)}   ${f(thr - u, 6).padStart(10)}   ${BETA2 < thr ? 'yes' : 'NO'}                                       ${f(lpthr, 6)}   ${BETA2 < lpthr ? 'yes' : 'NO'}`);
  }
  for (const s of [S3, 3.5, 4.0, 5.0]) {
    const thr = 16 * s / 9, lpthr = 2 * lp4(s, 1).best;
    console.log(`  ${f(s, 6)}   ${f(thr, 6)}   ${'(u0 < beta_2)'.padStart(17)}   ${'-'.padStart(10)}   ${BETA2 < thr ? 'yes' : 'NO'}                                       ${f(lpthr, 6)}   ${BETA2 < lpthr ? 'yes' : 'NO'}`);
  }
  console.log('');
  console.log('  route 1 (the note\'s): REC => sup|R_H| <= z^{u0/2-eps} rms, rms <= z^{u0/2} ln^4 z O(1) [C1-C2, B = O(ln^8 z), PROVEN]');
  console.log('    => sup|R_H| <= z^{u0-eps} ln^4 z < HM - 1 ~ c z^{u0}/ln^2 z, so min_x T >= 1; but T(r-1) <= -Omega + H - 1 <= -1 once H <= Omega.');
  console.log('    the margin the proven B leaves: the step needs B < c^2 z^{2 eps} / ln^4 z, and B = O(ln^8 z), so it needs z^{2 eps} > ln^{12} z:');
  console.log('      eps      least z0 with z^{2eps} > ln^{12} z (c = 1); finite for every eps > 0, but not effective');
  for (const eps of [0.5, 0.2, 0.1, 0.05, 0.01]) {
    let w = 3; for (let it = 0; it < 400; it++) w = 12 * Math.log(w) / (2 * eps);   // 2 eps w = 12 ln w
    console.log(`      ${f(eps, 3)}    ln z0 = ${f(w, 1).padStart(10)}   log10 z0 = ${f(w / Math.LN10, 1).padStart(10)}`);
  }
  console.log('    (finite in eps, so route 1 survives for every fixed eps > 0; it is NOT an asymptotic-order slip)');
  console.log('');
  console.log('  route 2 (independent of C4-C6): sup|R_H| >= Omega - H + 1 + HM, so sup/rms >= (Omega - H)/(z^{u0/2} ln^4 z).');
  console.log('    REC allows z^{u0/2 - eps}. With Omega = z^{16s/9 - o(1)} and H = z^{u0} the contradiction needs 16s/9 - u0/2 > u0/2, i.e. u0 < 16s/9 - the SAME threshold.');
  console.log('     s        16s/9 - u0/2 (floor on log_z sup/rms)   REC allowance u0/2   contradiction?');
  for (const eta of [0, 0.05, 0.35]) {
    const s = SE + eta, u = BETA2 - eta;
    console.log(`  ${f(s, 6)}   ${f(16 * s / 9 - u / 2, 6).padStart(37)}   ${f(u / 2, 6).padStart(18)}   ${16 * s / 9 - u / 2 > u / 2 ? 'yes' : 'NO'}`);
  }
  console.log('');
  console.log('  escape (a) "the rms is as large, so the ratio does not grow". The planted windows are H positions out of W = P(z);');
  console.log('    their own contribution to <R_H^2> is at most H (Omega + HM)^2 / W. Against the PROVEN <R_H^2> <= B H:');
  console.log('      z        ln W = theta(z)     log10 of H Omega^2 / W  (Omega = z^{16s/9}, H = z^{u0})    verdict');
  for (const z of [1e3, 1e6, 1e9]) {
    let th;
    if (z <= 1e6) { th = 0; for (const p of smallPrimes(z)) th += Math.log(p); }
    else th = z;           // theta(z) = (1+o(1)) z, PNT; the exact value only helps the point
    const lg = (U0 * Math.log(z) + 2 * (16 * S / 9) * Math.log(z) - th) / Math.LN10;
    console.log(`      ${e3(z)}   ${f(th, 1).padStart(14)}    ${e3(lg).padStart(14)}                                     ${lg < -10 ? 'negligible' : 'NOT negligible'}`);
  }
  console.log('    so the planted window cannot lift the period rms; and the rms is capped ABOVE by C1-C2 anyway, which is a theorem, not a model.');
  console.log('');
  console.log('  escape (b) "the floor is at one position, the rms at another H". Both are at the SAME H = z^{u0}: E4 bounds T(x) for EVERY window containing r,');
  console.log('    and REC quantifies the sup over ALL x at that same H. No H-mismatch is available.');
  console.log('');
}

// ================================================================== SEC F
// Does the blind slope test discriminate the exponent of the counted family?
// Control: the same family with the D+ condition p1 p2 p3^3 <= D DROPPED (only
// p1^3 <= D, product <= D, product > t). Its LP exponent per side is larger.
function chains4noCube(Q, pst, D) {
  const t = D / (pst * pst * pst), cb = Math.cbrt(D);
  let c4 = 0;
  for (let i3 = 0; i3 < Q.length; i3++) {
    const p3 = Q[i3]; if (Math.pow(p3, 4) > D) break;
    for (let i4 = 0; i4 < i3; i4++) {
      const p4 = Q[i4], u = t / (p3 * p4);
      for (let i2 = i3 + 1; i2 < Q.length; i2++) {
        const p2 = Q[i2]; if (p2 >= cb) break;
        const hi = Math.min(cb, D / (p2 * p3 * p4)); if (hi <= p2) break;
        const lo = Math.max(p2, u / p2);
        if (hi > lo) c4 += idxLE(Q, hi) - idxLE(Q, lo);
      }
    }
  }
  return c4;
}
function secF(dRows) {
  console.log('SEC F  IS THE SLOPE TEST A TEST OF THE LAW OR OF THE CONSTRUCTION?');
  console.log('  Control family: the SAME loops with one D+ condition dropped (p1 p2 p3^3 <= D removed, only p1^3 <= D and the product <= D kept).');
  console.log('  It is not a Rosser exit-chain family, so no floor follows from it; its LP exponent per side is higher, so a slope test SHOULD separate them.');
  console.log('      z        family A1A2 (D)    control A1A2       family step slope   control step slope   LP: 2 x 8s/9 = ' + f(16 * S / 9, 4) + '   LP control 2 x s = ' + f(2 * S, 4));
  const ctrl = [];
  for (const z of [5000, 10000, 20000, 50000, 100000]) {
    prog(`F z=${z}`);
    const D = Math.pow(z, S), ps = smallPrimes(z - 1);
    const Q1 = [], Q2 = [];
    ps.forEach((p, i) => { if (p > 47) ((i & 1) ? Q1 : Q2).push(p); });
    const b1 = chains4noCube(Q1, 47, D), b2 = chains4noCube(Q2, 43, D);
    ctrl.push({ z, prod: b1 * b2 });
  }
  for (let i = 0; i < ctrl.length; i++) {
    const dr = dRows.find(r => r.z === ctrl[i].z);
    let sf = '', sc = '';
    if (i > 0) {
      const dp = dRows.find(r => r.z === ctrl[i - 1].z);
      sf = f((Math.log(dr.prod) - Math.log(dp.prod)) / (Math.log(ctrl[i].z) - Math.log(ctrl[i - 1].z)), 4);
      sc = f((Math.log(ctrl[i].prod) - Math.log(ctrl[i - 1].prod)) / (Math.log(ctrl[i].z) - Math.log(ctrl[i - 1].z)), 4);
    }
    console.log(`   ${String(ctrl[i].z).padStart(7)}   ${e3(dr.prod).padStart(14)}   ${e3(ctrl[i].prod).padStart(14)}   ${sf.padStart(17)}   ${sc.padStart(18)}`);
  }
  console.log('  What the test therefore does and does not reach:');
  console.log('    reached  : the asymptotic COUNT of the constructed family (an exponent error there would move the slope by ~0.6, as the control shows).');
  console.log('    not reached: (1) that lambda^+ of the side equals or exceeds that count [SEC A, and the source checks it at ONE level, z = 601];');
  console.log('                 (2) that Omega >= A1 A2, which is E1-E3, an exact-half claim, not a growth claim;');
  console.log('                 (3) that some r in Z/W realises the split, which is CRT and carries no z-dependence the slope could see.');
  console.log('');
}

function main() {
  console.log('============================================================================');
  console.log('RED TEAM 2026-08-30 - GROWTH HALF of attack-0830-rec-cheapest.md sec.4.2-4.3');
  console.log('Independent code. Nothing here lowers or raises any exponent of record.');
  console.log('============================================================================');
  console.log('');
  secA();
  secB();
  const base = smallPrimes(20000);
  secC(base);
  const dRows = secD();
  secE();
  secF(dRows);
  console.log(`ASSERTIONS FAILED: ${FAIL}`);
  console.log('DONE');
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0830-floor-growth.js
//   invocation:  node research/history/staging/redteam-0830-floor-growth.js
//   code-sha256: 4f4d053e0a0cfa4bad39be58cf28ccd11243a90f32132ebebdca08c65b2f9af1
//   out-sha256:  850bbb33f76f26fe29ec1094fe0efda5901cf34f368125cd0ccc0d45b994ddb3
//   body-lines:  186
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     3.1 s
// ============================================================================
// ============================================================================
// RED TEAM 2026-08-30 - GROWTH HALF of attack-0830-rec-cheapest.md sec.4.2-4.3
// Independent code. Nothing here lowers or raises any exponent of record.
// ============================================================================
//
// SEC A  THE BRIDGE: lambda^+(n) by direct Moebius summation vs a count of first-exit chains, over EVERY subset of the primes below z
//   (own membership test, own divisor enumeration; "chain" = d0 = q1..qm, q1..q_{m-1} in support, d0 not in support, qm = least prime of n)
//     s        z    k    subsets   lam+ mismatch   lam- mismatch   D+ even-exits   D- odd-exits   lam+<0   lam->0   lam+(P(z))   max lam+
//   2.698721   13    5        31               0               0               0              0        0        0            0         1
//   2.698721   19    7       127               0               0               0              0        0        0            0         3
//   2.698721   23    8       255               0               0               0              0        0        0            0         3
//   2.698721   29    9       511               0               0               0              0        0        0            0        10
//   2.698721   31   10      1023               0               0               0              0        0        0            0         9
//   2.698721   37   11      2047               0               0               0              0        0        0            0        11
//   2.698721   41   12      4095               0               0               0              0        0        0            0        10
//   3.000000   13    5        31               0               0               0              0        0        0            0         1
//   3.000000   19    7       127               0               0               0              0        0        0            0         6
//   3.000000   23    8       255               0               0               0              0        0        0            0         8
//   3.000000   29    9       511               0               0               0              0        0        0            0        10
//   3.000000   31   10      1023               0               0               0              0        0        0            0        15
//   3.000000   37   11      2047               0               0               0              0        0        0            0        20
//   3.000000   41   12      4095               0               0               0              0        0        0            0        26
//
// SEC B  THE EXPONENT AS AN LP. a_i = log_z p_i, descending, a_i <= 1 because p_i | P(z); D+ prefix conditions sum_{i<j} a_i + 3 a_j <= s at odd j.
//   per-side max over 4 primes, with and without the cap a_i <= 1, against the note's 8s/9; doubled column against beta_2 = 4.266450
//      s      4-prime max (capped)   pattern                      8s/9      (2s+2)/3   uncapped max   2 x capped max   16s/9    2 x capped > beta_2?
//   2.4000             2.133333   (0.8000, 0.8000, 0.2667, 0.2667)   2.1333    2.2667      2.133333       4.266667   4.2667   yes
//   2.6487             2.354419   (0.8829, 0.8829, 0.2943, 0.2943)   2.3544    2.4325      2.354419       4.708838   4.7088   yes
//   2.6987             2.398863   (0.8996, 0.8996, 0.2999, 0.2999)   2.3989    2.4658      2.398863       4.797727   4.7977   yes
//   2.9000             2.577778   (0.9667, 0.9667, 0.3222, 0.3222)   2.5778    2.6000      2.577778       5.155556   5.1556   yes
//   3.0000             2.666667   (1.0000, 1.0000, 0.3333, 0.3333)   2.6667    2.6667      2.666667       5.333333   5.3333   yes
//   3.2000             2.800000   (1.0000, 1.0000, 0.4000, 0.4000)   2.8444    2.8000      2.844444       5.600000   5.6889   yes
//   3.5000             3.000000   (1.0000, 1.0000, 0.5000, 0.5000)   3.1111    3.0000      3.111111       6.000000   6.2222   yes
//   4.0000             3.333333   (1.0000, 1.0000, 0.6667, 0.6667)   3.5556    3.3333      3.555556       6.666667   7.1111   yes
//   5.0000             4.000000   (1.0000, 1.0000, 1.0000, 1.0000)   4.4444    4.0000      4.444444       8.000000   8.8889   yes
//   6.0000             4.000000   (1.0000, 1.0000, 1.0000, 1.0000)   5.3333    4.6667      5.333333       8.000000   10.6667   yes
//   longer chains (random-restart hill climb: a SEARCH lower bound on the LP max, exact only where it meets the note's pattern; s > 3 rows are not converged and are shown to place the ceiling, not to value it):
//      s    2k   per-side max   note pattern s(1-3^{-k})   doubled   2s
//   2.6987    4       2.398863               2.398863   4.797727   5.3974
//   2.6987    6       2.598769               2.598769   5.197537   5.3974
//   2.6987    8       2.665404               2.665404   5.330807   5.3974
//   2.6987   10       2.687615               2.687615   5.375231   5.3974
//   2.6987   12       2.695019               2.695019   5.390039   5.3974
//   3.0000    4       2.666667               2.666667   5.333333   6.0000
//   3.0000    6       2.888889               2.888889   5.777778   6.0000
//   3.0000    8       2.962963               2.962963   5.925926   6.0000
//   3.0000   10       2.987654               2.987654   5.975309   6.0000
//   3.0000   12       2.995885               2.995885   5.991770   6.0000
//   3.5000    4       2.999973               3.111111   5.999945   7.0000   pattern ILLEGAL (a_i > 1)
//   3.5000    6       3.315588               3.370370   6.631175   7.0000   pattern ILLEGAL (a_i > 1)
//   3.5000    8       3.398528               3.456790   6.797056   7.0000   pattern ILLEGAL (a_i > 1)
//   3.5000   10       3.438605               3.485597   6.877211   7.0000   pattern ILLEGAL (a_i > 1)
//   3.5000   12       3.161866               3.495199   6.323731   7.0000   pattern ILLEGAL (a_i > 1)
//   5.0000    4       3.999997               4.444444   7.999993   10.0000   pattern ILLEGAL (a_i > 1)
//   5.0000    6       4.657622               4.814815   9.315244   10.0000   pattern ILLEGAL (a_i > 1)
//   5.0000    8       4.811682               4.938272   9.623364   10.0000   pattern ILLEGAL (a_i > 1)
//   5.0000   10       4.917930               4.979424   9.835859   10.0000   pattern ILLEGAL (a_i > 1)
//   5.0000   12       4.951800               4.993141   9.903600   10.0000   pattern ILLEGAL (a_i > 1)
//
// SEC C  THE CONSTRUCTION AS LITERALLY WRITTEN (source sec.4.2), exact prime counts by segmented sieve, s = 2.698721
//   boxes B1 = (D^{1/3}/2, D^{1/3}], B2 = (D^{1/3}/4, D^{1/3}/2], B3 = (D^{1/9}/2, D^{1/9}], B4 = (D^{1/9}/4, D^{1/9}/2]; p* in (4 D^{1/27}, D^{1/9}/4)
//   turn-on: the p* window is non-empty only when D^{2/27} > 16, i.e. ln D > 27 ln 16 / 2 = 37.4299
//   => the literal construction is EMPTY for every z < 1.055e+6 at s = 2.698721 (before any question of primes existing in the boxes)
//    z = 1.000e+6  D = 1.557e+16  D^{1/3} = 2.497e+5  D^{1/9} = 63.0  p* window (15.91, 15.74)  primes B1..B4 = 10296, 5457, 8, 6  p* candidates = 0  A_i = 1.685e+8  A1A2 = 2.840e+16  ratio to model = 6.165e-4
//    z = 2.000e+6  D = 1.011e+17  D^{1/3} = 4.658e+5  D^{1/9} = 77.5  p* window (17.06, 19.38)  primes B1..B4 = 18235, 9671, 10, 5  p* candidates = 2  A_i = 4.408e+8  A1A2 = 1.943e+17  ratio to model = 2.243e-4
//    z = 5.000e+6  D = 1.199e+18  D^{1/3} = 1.062e+6  D^{1/9} = 102.0  p* window (18.69, 25.51)  primes B1..B4 = 39072, 20638, 12, 7  p* candidates = 3  A_i = 3.629e+9  A1A2 = 1.317e+19  ratio to model = 3.058e-4
//    z = 1.000e+7  D = 7.781e+18  D^{1/3} = 1.982e+6  D^{1/9} = 125.6  p* window (20.03, 31.40)  primes B1..B4 = 69811, 36653, 13, 8  p* candidates = 4  A_i = 1.535e+10  A1A2 = 2.357e+20  ratio to model = 2.797e-4
//    z = 3.000e+7  D = 1.509e+20  D^{1/3} = 5.324e+6  D^{1/9} = 174.6  p* window (22.36, 43.65)  primes B1..B4 = 175358, 91867, 18, 10  p* candidates = 7  A_i = 1.812e+11  A1A2 = 3.284e+22  ratio to model = 3.395e-4
//    z = 1.000e+8  D = 3.888e+21  D^{1/3} = 1.572e+7  D^{1/9} = 250.5  p* window (25.22, 62.63)  primes B1..B4 = 483397, 252458, 24, 13  p* candidates = 10  A_i = 2.197e+12  A1A2 = 4.825e+24  ratio to model = 2.656e-4
//    z = 3.000e+8  D = 7.540e+22  D^{1/3} = 4.225e+7  D^{1/9} = 348.3  p* window (28.14, 87.07)  primes B1..B4 = 1224443, 637866, 30, 18  p* candidates = 15  A_i = 2.636e+13  A1A2 = 6.948e+26  ratio to model = 3.124e-4
//    z = 1.000e+9  D = 1.943e+24  D^{1/3} = 1.248e+8  D^{1/9} = 499.7  p* window (31.74, 124.93)  primes B1..B4 = 3403122, 1768240, 43, 24  p* candidates = 20  A_i = 3.791e+14  A1A2 = 1.437e+29  ratio to model = 3.233e-4
//   local slope of ln(A1A2) on ln z against the law's log-corrected slope 16s/9 - 8/ln z:
//      z_from -> z_to      step slope    16s/9 - 8/ln z (mid)    excess
//    1.000e+6 -> 2.000e+6       2.7744                4.2328    -1.4585
//    2.000e+6 -> 5.000e+6       4.6012                4.2632     0.3380
//    5.000e+6 -> 1.000e+7       4.1618                4.2905    -0.1286
//    1.000e+7 -> 3.000e+7       4.4939                4.3177     0.1761
//    3.000e+7 -> 1.000e+8       4.1445                4.3488    -0.2043
//    1.000e+8 -> 3.000e+8       4.5237                4.3760     0.1477
//    3.000e+8 -> 1.000e+9       4.4286                4.4001     0.0285
//
//   how many primes the LITERAL 2k-prime construction can carry at each z: the smallest box is (D^{3^{-k}}/4, D^{3^{-k}}/2],
//   so it needs D^{3^{-k}} >= 8, i.e. 3^k <= ln D / ln 8. Best exponent then available is 2s(1 - 3^{-k}), against the limit 2s = 5.3974:
//       z         ln D      max k    best available exponent 2s(1-3^{-k})    16s/9 = 4.7977
//       1.000e+6     37.28      2                     4.797727
//       1.000e+9     55.93      2                     4.797727
//       1.000e+12     74.57      3                     5.197537
//       1.000e+18    111.85      3                     5.197537
//       1.000e+27    167.78      3                     5.197537
//       1.000e+40    248.56      4                     5.330807
//   (k = 2, the four-prime chain, is the only one available at every z below about 1.1e9; k = 4 needs z above 1e27)
//
//   the implied constant in ">>": mean of A1A2 / (z^{16s/9}/ln^8 z) over the 7 live rows = 2.930e-4 (flat, no trend over three decades)
//   on that constant the literal construction's floor first exceeds H = z^{u0} at ln z = 73.1, i.e. z = 5.584e+31
//
//   the counterexample window's modulus: q = d1 d2 = (d' p*1)(d'' p*2) ~ D^{16/9} p*1 p*2 ~ z^{16s/9 + 2s/27} = z^{4.9976}, against the reduced range (z^{u0-delta}, z^{2s}] = (z^{4.2165-delta}, z^{5.3974}]
//
// SEC D  THE CERTIFIED FAMILY RECOUNTED (source S4b), own loop order, s = 2.698721; primes above 47 split by index parity, best p* <= 47 per side
//   control at z = 601 and 1000: the same counts from an independent O(n^4) brute force over quadruples
//       z       p*1    A1            p*2    A2            A1 A2         log_z      model z^{16s/9}/ln^8 z   ratio     16s/9 - log_z
//    p* scan side 1 at z = 601 over p* = 3..47: 0, 0, 0, 159, 228, 287, 296, 300, 300, 300, 300, 300, 300, 300   monotone = true
//    brute force z = 601: side1 300 (2ch 300, 4ch 0) vs fast 300 (300, 0);  side2 300 (300, 0) vs fast 300 (300, 0)   MATCH
//        601    47           300    43           300   9.000e+4   1.7828               7.649e+6    0.0118   3.0149
//    brute force z = 1000: side1 780 (2ch 780, 4ch 0) vs fast 780 (780, 0);  side2 780 (780, 0) vs fast 780 (780, 0)   MATCH
//       1000    47           780    43           780   6.084e+5   1.9281               4.770e+7    0.0128   2.8697
//       2000    47          2536    43          2456   6.228e+6   2.0583               6.173e+8    0.0101   2.7395
//    p* scan side 1 at z = 5000 over p* = 3..47: 0, 289, 535, 544, 546, 2522, 3803, 5978, 8181, 8705, 9872, 10422, 10644, 11017   monotone = true
//       5000    47         11017    43         10500   1.157e+8   2.1799              2.015e+10    0.0057   2.6179
//      10000    47         41668    43         36374   1.516e+9   2.2951              2.997e+11    0.0051   2.5026
//      20000    47        228508    43        190436   4.352e+10   2.4735              4.665e+12    0.0093   2.3242
//    p* scan side 1 at z = 50000 over p* = 3..47: 0, 154317, 1183772, 2227874, 2362451, 2452624, 2468216, 2481868, 2507853, 2531122, 2608598, 2655376, 2676269, 2713375   monotone = true
//      50000    47       2713375    43       2306291   6.258e+12   2.7232              1.865e+14    0.0336   2.0745
//     100000    47      16969634    43      14892829   2.527e+14   2.8805              3.156e+15    0.0801   1.9172
//     200000    47     100547603    43      90685180   9.118e+15   3.0107              5.499e+16    0.1658   1.7870
//     500000    47     979017225    43     905294776   8.863e+17   3.1493              2.500e+18    0.3545   1.6485
//   step slopes of ln(A1 A2) on ln z, against 16s/9 - 8/ln z at the step midpoint:
//      z_from -> z_to     step slope    16s/9 - 8/ln z     excess
//        601 ->    1000       3.7533          3.5953      0.1580
//       1000 ->    2000       3.3558          3.6949     -0.3392
//       2000 ->    5000       3.1886          3.8051     -0.6164
//       5000 ->   10000       3.7117          3.8952     -0.1834
//      10000 ->   20000       4.8436          3.9606      0.8829
//      20000 ->   50000       5.4224          4.0256      1.3967
//      50000 ->  100000       5.3358          4.0813      1.2545
//     100000 ->  200000       5.1731          4.1232      1.0499
//     200000 ->  500000       4.9949          4.1660      0.8289
//
// SEC E  THE IMPLICATION, both routes, and the two escapes the brief names
//   constants: 1+sqrt(e) = 2.648721270700   beta_2 = 4.26645028414864   eta = 0.05   s = 2.698721270700   u0 = 4.216450284149
//      s        16s/9      u0 = beta_2 - eta   16s/9 - u0   is every legal u0 in (2, beta_2) below 16s/9?   4-prime LP threshold 2*max   is beta_2 below THAT?
//   2.648721   4.708838            4.266450     0.442388   yes                                       4.708838   yes
//   2.658721   4.726616            4.256450     0.470165   yes                                       4.726616   yes
//   2.698721   4.797727            4.216450     0.581276   yes                                       4.797727   yes
//   2.748721   4.886616            4.166450     0.720165   yes                                       4.886616   yes
//   2.998721   5.331060            3.916450     1.414610   yes                                       5.331060   yes
//   3.000000   5.333333       (u0 < beta_2)            -   yes                                       5.333333   yes
//   3.500000   6.222222       (u0 < beta_2)            -   yes                                       6.000000   yes
//   4.000000   7.111111       (u0 < beta_2)            -   yes                                       6.666667   yes
//   5.000000   8.888889       (u0 < beta_2)            -   yes                                       8.000000   yes
//
//   route 1 (the note's): REC => sup|R_H| <= z^{u0/2-eps} rms, rms <= z^{u0/2} ln^4 z O(1) [C1-C2, B = O(ln^8 z), PROVEN]
//     => sup|R_H| <= z^{u0-eps} ln^4 z < HM - 1 ~ c z^{u0}/ln^2 z, so min_x T >= 1; but T(r-1) <= -Omega + H - 1 <= -1 once H <= Omega.
//     the margin the proven B leaves: the step needs B < c^2 z^{2 eps} / ln^4 z, and B = O(ln^8 z), so it needs z^{2 eps} > ln^{12} z:
//       eps      least z0 with z^{2eps} > ln^{12} z (c = 1); finite for every eps > 0, but not effective
//       0.500    ln z0 =       45.9   log10 z0 =       19.9
//       0.200    ln z0 =      150.4   log10 z0 =       65.3
//       0.100    ln z0 =      351.8   log10 z0 =      152.8
//       0.050    ln z0 =      802.5   log10 z0 =      348.5
//       0.010    ln z0 =     5125.1   log10 z0 =     2225.8
//     (finite in eps, so route 1 survives for every fixed eps > 0; it is NOT an asymptotic-order slip)
//
//   route 2 (independent of C4-C6): sup|R_H| >= Omega - H + 1 + HM, so sup/rms >= (Omega - H)/(z^{u0/2} ln^4 z).
//     REC allows z^{u0/2 - eps}. With Omega = z^{16s/9 - o(1)} and H = z^{u0} the contradiction needs 16s/9 - u0/2 > u0/2, i.e. u0 < 16s/9 - the SAME threshold.
//      s        16s/9 - u0/2 (floor on log_z sup/rms)   REC allowance u0/2   contradiction?
//   2.648721                                2.575613             2.133225   yes
//   2.698721                                2.689502             2.108225   yes
//   2.998721                                3.372835             1.958225   yes
//
//   escape (a) "the rms is as large, so the ratio does not grow". The planted windows are H positions out of W = P(z);
//     their own contribution to <R_H^2> is at most H (Omega + HM)^2 / W. Against the PROVEN <R_H^2> <= B H:
//       z        ln W = theta(z)     log10 of H Omega^2 / W  (Omega = z^{16s/9}, H = z^{u0})    verdict
//       1.000e+3            956.2         -3.739e+2                                     negligible
//       1.000e+6         998484.2         -4.336e+5                                     negligible
//       1.000e+9     1000000000.0         -4.343e+8                                     negligible
//     so the planted window cannot lift the period rms; and the rms is capped ABOVE by C1-C2 anyway, which is a theorem, not a model.
//
//   escape (b) "the floor is at one position, the rms at another H". Both are at the SAME H = z^{u0}: E4 bounds T(x) for EVERY window containing r,
//     and REC quantifies the sup over ALL x at that same H. No H-mismatch is available.
//
// SEC F  IS THE SLOPE TEST A TEST OF THE LAW OR OF THE CONSTRUCTION?
//   Control family: the SAME loops with one D+ condition dropped (p1 p2 p3^3 <= D removed, only p1^3 <= D and the product <= D kept).
//   It is not a Rosser exit-chain family, so no floor follows from it; its LP exponent per side is higher, so a slope test SHOULD separate them.
//       z        family A1A2 (D)    control A1A2       family step slope   control step slope   LP: 2 x 8s/9 = 4.7977   LP control 2 x s = 5.3974
//       5000         1.157e+8        3.650e+11
//      10000         1.516e+9        2.960e+13              3.7117               6.3417
//      20000        4.352e+10        1.761e+15              4.8436               5.8948
//      50000        6.258e+12        3.093e+17              5.4224               5.6405
//     100000        2.527e+14        1.393e+19              5.3358               5.4934
//   What the test therefore does and does not reach:
//     reached  : the asymptotic COUNT of the constructed family (an exponent error there would move the slope by ~0.6, as the control shows).
//     not reached: (1) that lambda^+ of the side equals or exceeds that count [SEC A, and the source checks it at ONE level, z = 601];
//                  (2) that Omega >= A1 A2, which is E1-E3, an exact-half claim, not a growth claim;
//                  (3) that some r in Z/W realises the split, which is CRT and carries no z-dependence the slope could see.
//
// ASSERTIONS FAILED: 0
// DONE
// ============================================================================
// READINGS
// ============================================================================
// (written in research/history/staging/redteam-0830-floor-growth.md; this
//  script carries none of its own, so no figure can precede its run)
