// ============================================================================
// RED TEAM 0830 — THE ZONE/Z2 NOTES OF 2026-08-29 EVENING AND 2026-08-30,
// RE-DERIVED ON INDEPENDENT CODE
// ============================================================================
// Targets, all HELD, none edited by this file:
//   (a) attack-0829n-X-upper.md      Theorem U, the three tiers, the looseness
//   (b) blind-0830-quadpoint-31607.md the fourth decade's sealed 76 rows
//   (c) blind-0830-quadpoint-c1c2.md  the fifth decade's sealed D1/D2/D3 rows
//
// NOTHING here is copied from the target producers. The window engine, the
// Selberg weights, the Buchstab omega grid, the comparators and the scorer are
// written from the mathematical definitions quoted in the target NOTES (§ by
// §), not from their code. Where a target declares a PARAMETER rather than an
// algorithm (the xi grid, the band edges, the tolerances, the depths K_b) that
// parameter is taken at its declared value, because reproducing a measurement
// means running the same experiment, not a different one.
//
// STAGES (one embedded tail each; the code above the first tail is shared):
//   --stage a   X-upper: proof gates, band sums B3-B8 at K_b, the tier chain,
//               D_max/s_max, the B6 saturation profile.
//   --stage b   fourth decade: full independent re-run of B9-B12, the two
//               point anchors, and an independent re-score of all 76 rows.
//   --stage c   fifth decade: full independent re-run of B13-B14, the four
//               comparators, the D rows, the paired-se attack, Jensen on y*.
// ============================================================================
'use strict';
const STAGE = (() => { const i = process.argv.indexOf('--stage'); return i >= 0 ? process.argv[i + 1] : null; })();
if (!['a', 'b', 'c', 'd'].includes(STAGE)) { console.error('usage: --stage a|b|c|d'); process.exit(2); }
const log = (s) => console.log(s);
let FAIL = 0;
function ck(tag, cond, got) { if (!cond) { FAIL++; log(`  CHECK FAIL [${tag}] ${got === undefined ? '' : got}`); } return cond; }
const f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4), f5 = (x) => x.toFixed(5), f6 = (x) => x.toFixed(6);

// ---------------------------------------------------------------- primes ---
function sieveTo(n) { const c = new Uint8Array(n + 1), p = []; for (let i = 2; i <= n; i++) { if (!c[i]) { p.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } } return p; }
const PLIM = STAGE === 'a' ? 20000 : 316800;
const PR = sieveTo(PLIM);
const ACT = PR.filter(p => p >= 7);              // actives p_1 = 7, p_2 = 11, ...
const NEXTP = new Map(); for (let i = 0; i + 1 < PR.length; i++) NEXTP.set(PR[i], PR[i + 1]);
function piOf(x) { let lo = 0, hi = PR.length; while (lo < hi) { const m = (lo + hi) >> 1; if (PR[m] <= x) lo = m + 1; else hi = m; } return lo; }

// ------------------------------------------------- the window, first touch --
// Stretch S_Q = [Q^2, Q'^2). Channel openers a = 11, 17, 29 (mod 30) with
// a >= Q^2 and a + 2 < Q'^2. buf[v - lo] = 1-based index of the FIRST active
// dividing v, 0 if none (then v is prime: v < Q'^2 and every prime factor of a
// composite v is <= sqrt(v) < Q', hence <= Q).
let BUF = null;
function window_(Q) {
  const Qn = NEXTP.get(Q), lo = Q * Q, hi = Qn * Qn, W = hi - lo;
  if (W >= 2 ** 31) throw new Error('width overflow');
  if (hi > Number.MAX_SAFE_INTEGER) throw new Error('hi unsafe');
  if (!BUF || BUF.length < W) BUF = new Uint16Array(W); else BUF.fill(0, 0, W);
  let nR = 0; while (nR < ACT.length && ACT[nR] <= Q) nR++;
  if (nR + 1 > 65535) throw new Error('index overflow');
  for (let k = 0; k < nR; k++) { const p = ACT[k]; for (let v = lo + ((p - lo % p) % p); v < hi; v += p) { const i = v - lo; if (BUF[i] === 0) BUF[i] = k + 1; } }
  let C = 0, T = 0, CC = 0, M = 0;
  const bin = new Int32Array(nR + 2);
  for (const c of [11, 17, 29]) for (let a = lo + (((c - lo % 30) % 30 + 30) % 30); a + 2 < hi; a += 30) {
    C++; const x = BUF[a - lo], y = BUF[a + 2 - lo];
    if (x === 0 && y === 0) T++; else if (x !== 0 && y !== 0) { CC++; bin[x < y ? x : y]++; } else M++;
  }
  // X(K) = # both-composite pairs with min lpf index > K ; S(K) = X(K)+M(K)+T
  const X = new Float64Array(nR + 2); for (let k = nR; k >= 0; k--) X[k] = X[k + 1] + bin[k + 1];
  return { Q, Qn, lo, hi, W, nR, C, T, CC, M, bin, X };
}
// S(K): both members rough at depth K (idx 0 = prime, or idx > K)
function Sof(w, K) {
  let s = 0; const lo = w.lo, hi = w.hi;
  for (const c of [11, 17, 29]) for (let a = lo + (((c - lo % 30) % 30 + 30) % 30); a + 2 < hi; a += 30) {
    const x = BUF[a - lo], y = BUF[a + 2 - lo];
    if ((x === 0 || x > K) && (y === 0 || y > K)) s++;
  }
  return s;
}
function kstar(w) { for (let K = 0; K <= w.nR; K++) if (w.T - w.X[K] >= 1) return K; return -1; }

// ============================================================================
// STAGE a — attack-0829n-X-upper.md, Theorem U re-derived and re-measured
// ============================================================================
// Declared parameters taken at face value from the target note: the xi grid
// (§2 "a 28-point grid xi <= 701", read off the target producer's constant),
// the band edges (§1, attack-roughpair-error-01.js) and the band depths
// K_b = 4, 8, 12, 17, 23, 31 (§5).
const XI = [1, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 61, 71, 83, 97, 113, 131, 151, 181, 211, 251, 301, 401, 501, 701];
const BANDS = [['B3', 101, 313, 4], ['B4', 317, 997, 8], ['B5', 1009, 1499, 12], ['B6', 1500, 3163, 17], ['B7', 3164, 5623, 23], ['B8', 5624, 10007, 31]];

// squarefree d | P(z), z = p_K, d <= lim; returns {val, pf[], w}
function divsOf(K, lim) {
  let out = [{ val: 1, pf: [], w: 0 }];
  for (let i = 0; i < K; i++) { const p = ACT[i], add = []; for (const d of out) if (d.val * p <= lim) add.push({ val: d.val * p, pf: d.pf.concat([p]), w: d.w + 1 }); out = out.concat(add); }
  out.sort((x, y) => x.val - y.val); return out;
}
const hOf = (pf) => pf.reduce((a, p) => a * (2 / (p - 2)), 1);
const Bof = (d) => d.val === 1 ? 0 : 3 * (2 ** d.w) * (1 + 1 / d.val);
const gcd = (a, b) => b ? gcd(b, a % b) : a;
function lcm(a, b) { return a / gcd(a, b) * b; }

// per depth K: for every grid level, the weights and the pair table
function buildK(K, full) {
  const all = divsOf(K, XI[XI.length - 1]);
  const hv = all.map(d => hOf(d.pf));
  const valW = new Map(all.map(d => [d.val, d.w]));
  const modIdx = new Map(), MOD = [];
  const levels = XI.map(xi => {
    const idx = []; for (let i = 0; i < all.length; i++) if (all[i].val <= xi) idx.push(i);
    const G = idx.reduce((a, i) => a + hv[i], 0);
    const lam = idx.map(i => {
      const d = all[i]; if (d.val === 1) return 1;
      let Gd = 0; const y = xi / d.val;
      for (let j = 0; j < all.length; j++) { const m = all[j]; if (m.val > y) break; if (m.pf.some(p => d.pf.includes(p))) continue; Gd += hv[j]; }
      const mu = d.w % 2 ? -1 : 1;
      return mu * d.pf.reduce((a, p) => a * (p / (p - 2)), 1) * Gd / G;
    });
    const pm = [], pw = [], pa = []; let RU = 0;
    for (let a = 0; a < idx.length; a++) for (let b = 0; b < idx.length; b++) {
      const va = all[idx[a]].val, vb = all[idx[b]].val, g = gcd(va, vb), L = va / g * vb;
      const w = lam[a] * lam[b], aw = Math.abs(w);
      // omega(lcm) = omega(d1) + omega(d2) - omega(gcd); gcd | d1 so it is in `all`
      const om = all[idx[a]].w + all[idx[b]].w - valW.get(g);
      RU += aw * (L === 1 ? 0 : 3 * (2 ** om) * (1 + 1 / L));
      if (full) { let mi = modIdx.get(L); if (mi === undefined) { mi = MOD.length; modIdx.set(L, mi); MOD.push(L); } pm.push(mi); pw.push(w); pa.push(aw); }
    }
    return { xi, G, lam: Float64Array.from(lam), pm: Int32Array.from(pm), pw: Float64Array.from(pw), pa: Float64Array.from(pa), RU, nd: idx.length, dl: idx.map(i => all[i]) };
  });
  // omega and the B-bound of every modulus, once
  const MW = MOD.map(m => { let w = 0, t = m; for (const p of ACT) { if (p * p > t && t > 1) { w++; break; } if (t % p === 0) { w++; t /= p; } if (t === 1) break; } return w; });
  const MB = MOD.map((m, i) => m === 1 ? 0 : 3 * (2 ** MW[i]) * (1 + 1 / m));
  const V2 = (() => { let v = 1; for (let i = 0; i < K; i++) v *= (1 - 2 / ACT[i]); return v; })();
  return { K, z: ACT[K - 1], levels, MOD, MW, MB, V2 };
}
// A_d exactly: a in [lo, hiA], a = 11/17/29 (mod 30), a = 0 or -2 (mod p) for p | d
function countAd(lo, hiA, d, pf) {
  if (d === 1) { let c = 0; for (const r of [11, 17, 29]) c += Math.floor((hiA - r) / 30) - Math.floor((lo - 1 - r) / 30); return c; }
  let res = [0], mod = 1;
  for (const p of pf) {
    const nx = [], inv = (() => { const m = mod % p; for (let t = 1; t < p; t++) if ((m * t) % p === 1) return t; return 1; })();
    for (const r of res) for (const t of [0, p - 2]) { let k = ((t - r) % p + p) % p; k = (k * inv) % p; nx.push(r + mod * k); }
    res = nx; mod *= p;
  }
  const inv30 = (() => { const m = mod % 30; for (let t = 1; t < 30; t++) if ((m * t) % 30 === 1) return t; return 1; })();
  let c = 0;
  for (const r of res) for (const cc of [11, 17, 29]) {
    let k = ((cc - r) % 30 + 30) % 30; k = (k * inv30) % 30;
    const x = r + mod * k, M = mod * 30;
    c += Math.floor((hiA - x) / M) - Math.floor((lo - 1 - x) / M);
  }
  return c;
}
function tiersAt(w, P, xj) {
  const lo = w.lo, hiA = w.hi - 3, C = w.C, L = P.levels[xj];
  const r = new Float64Array(P.MOD.length);
  for (let i = 0; i < P.MOD.length; i++) {
    const m = P.MOD[i]; if (m === 1) { r[i] = 0; continue; }
    const pf = []; { let t = m; for (const p of ACT) { if (t === 1) break; if (t % p === 0) { pf.push(p); t /= p; } } }
    r[i] = countAd(lo, hiA, m, pf) - C * (2 ** P.MW[i]) / m;
  }
  let s3 = 0; for (let k = 0; k < L.pm.length; k++) s3 += L.pw[k] * r[L.pm[k]];
  return { t3: C / L.G + s3 };
}
function tiers(w, P) {
  const lo = w.lo, hiA = w.hi - 3, C = w.C;
  const r = new Float64Array(P.MOD.length);
  let worstRB = 0;
  for (let i = 0; i < P.MOD.length; i++) {
    const m = P.MOD[i]; if (m === 1) { r[i] = 0; continue; }
    const pf = []; { let t = m; for (const p of ACT) { if (t === 1) break; if (t % p === 0) { pf.push(p); t /= p; } } }
    const Ad = countAd(lo, hiA, m, pf);
    r[i] = Ad - C * (2 ** P.MW[i]) / m;
    const rb = Math.abs(r[i]) / P.MB[i]; if (rb > worstRB) worstRB = rb;
  }
  let t1 = Infinity, t2 = Infinity, t3 = Infinity, x1 = 0, x3 = 0;
  for (const L of P.levels) {
    const main = C / L.G;
    const v1 = main + L.RU; if (v1 < t1) { t1 = v1; x1 = L.xi; }
    let s2 = 0, s3 = 0; for (let k = 0; k < L.pm.length; k++) { const rr = r[L.pm[k]]; s2 += L.pa[k] * Math.abs(rr); s3 += L.pw[k] * rr; }
    if (main + s2 < t2) t2 = main + s2;
    if (main + s3 < t3) { t3 = main + s3; x3 = L.xi; }
  }
  return { t1, t2, t3, x1, x3, worstRB };
}

function med(a) { const b = a.slice().sort((x, y) => x - y); const n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; }
function directQF(w, P, xiIdx) {
  const L = P.levels[xiIdx], lo = w.lo, hi = w.hi, z = P.z; let tot = 0;
  for (const c of [11, 17, 29]) for (let a = lo + (((c - lo % 30) % 30 + 30) % 30); a + 2 < hi; a += 30) {
    const pf = []; for (let i = 0; i < P.K; i++) { const p = ACT[i]; if (a % p === 0 || (a + 2) % p === 0) pf.push(p); }
    let s = 0; for (let j = 0; j < L.dl.length; j++) { const d = L.dl[j]; if (d.pf.every(p => pf.includes(p))) s += L.lam[j]; }
    tot += s * s;
  }
  return tot;
}

if (STAGE === 'a') {
  log('RED TEAM 0830, STAGE a — attack-0829n-X-upper.md: Theorem U and its looseness, on independent code');
  const P = {}; for (const [, , , K] of BANDS) P[K] = buildK(K, true);
  log('\nSEC A0 — CONTROL: THE WINDOW ENGINE AGAINST A TRIAL-DIVISION BRUTE FORCE ON ALL OF B3');
  {
    const lpf = (n) => { for (const p of PR) { if (p * p > n) return n; if (n % p === 0) return p; } return n; };
    const pK = ACT[3]; let bC = 0, bT = 0, bCC = 0, bX = 0, bS = 0;
    for (const Q of PR.filter(q => q >= 101 && q <= 313)) {
      const lo = Q * Q, hi = NEXTP.get(Q) ** 2;
      for (let a = lo; a + 2 < hi; a++) { const r = a % 30; if (r !== 11 && r !== 17 && r !== 29) continue; bC++;
        const la = lpf(a), lb = lpf(a + 2), pa = la === a, pb = lb === a + 2;
        if (pa && pb) bT++;
        if (!pa && !pb) { bCC++; if (Math.min(la, lb) > pK) bX++; }
        if ((pa || la > pK) && (pb || lb > pK)) bS++; }
    }
    let sC = 0, sT = 0, sCC = 0, sX = 0, sS = 0;
    for (const Q of PR.filter(q => q >= 101 && q <= 313)) { const w = window_(Q); sC += w.C; sT += w.T; sCC += w.CC; sX += w.X[4]; sS += Sof(w, 4); }
    log(`  B3 by trial division, no sieve: C ${bC}, T ${bT}, CC ${bCC}, X(4) ${bX}, S(4) ${bS}`);
    log(`  B3 by this file's window engine: C ${sC}, T ${sT}, CC ${sCC}, X(4) ${sX}, S(4) ${sS}`);
    ck('brute-force control', bC === sC && bT === sT && bCC === sCC && bX === sX && bS === sS);
    log(`  the two agree on all five totals: ${bC === sC && bT === sT && bCC === sCC && bX === sX && bS === sS ? 'yes' : 'NO'}`);
  }
  log('\nSEC A1 — THE PROOF GATES (independent re-derivation, checked numerically)');
  let worstLam = 0, worstLam1 = 0;
  for (const [, , , K] of BANDS) for (const L of P[K].levels) { worstLam = Math.max(worstLam, ...Array.from(L.lam, Math.abs)); worstLam1 = Math.max(worstLam1, Math.abs(L.lam[0] - 1)); }
  log(`  |lambda_d| <= 1 over ${BANDS.length} depths x ${XI.length} levels: max |lambda_d| = ${f6(worstLam)}; max |lambda_1 - 1| = ${worstLam1.toExponential(1)}`);
  ck('|lambda| <= 1', worstLam <= 1 + 1e-12, worstLam);
  // Step 4 of the target's proof: at full level G(P(z)) = prod (1 + h(p)) = 1/V2(z).
  // Checked by brute enumeration of every divisor at K = 3 (P(z) = 1001) and K = 6.
  for (const K of [3, 6]) {
    const big = divsOf(K, Infinity).reduce((a, d) => a + hOf(d.pf), 0);
    let v = 1; for (let i = 0; i < K; i++) v *= (1 - 2 / ACT[i]);
    ck(`G(P(z))V2 = 1 at K=${K}`, Math.abs(big * v - 1) < 1e-12);
    log(`  K = ${K}: G(P(z)) by brute enumeration of all ${2 ** K} divisors = ${f6(big)}, 1/V2(z) = ${f6(1 / v)}, product with V2 = ${(big * v).toFixed(15)}`);
  }
  const bandRows = [];
  let worstRB = 0, chainOK = true, nPairs = 0, worstQF = 0;
  for (const [nm, a, b, K] of BANDS) {
    const anchors = PR.filter(q => q >= a && q <= b);
    let sX = 0, sS = 0, sT1 = 0, sT2 = 0, sT3 = 0, sCV = 0, nBelowC = 0, zeroX = 0;
    const rat1 = [], rat3 = [], Cs = [], x1s = [], x3s = [];
    for (const Q of anchors) {
      const w = window_(Q); const X = w.X[K], S = Sof(w, K); const t = tiers(w, P[K]);
      worstRB = Math.max(worstRB, t.worstRB);
      if (!(t.t1 >= t.t2 - 1e-9 && t.t2 >= t.t3 - 1e-9 && t.t3 >= S - 1e-9 && S >= X)) chainOK = false;
      nPairs++;
      sX += X; sS += S; sT1 += t.t1; sT2 += t.t2; sT3 += t.t3; sCV += w.C * P[K].V2;
      if (t.t1 < w.C) nBelowC++; if (X === 0) zeroX++;
      if (X > 0) { rat1.push(t.t1 / X); rat3.push(t.t3 / X); }
      Cs.push(w.C); x1s.push(t.x1); x3s.push(t.x3);
    }
    bandRows.push({ nm, K, n: anchors.length, sX, sS, sT1, sT2, sT3, sCV, rat1, rat3, Cs, x1s, x3s, nBelowC, zeroX });
  }
  log(`  |r_d| < B(d) = 3*2^omega(d)(1 + 1/d): max |r_d|/B(d) = ${f4(worstRB)} over all moduli x all ${nPairs} anchors (r_1 = 0 by construction)`);
  ck('r bound holds', worstRB < 1, worstRB);
  log(`  tier chain T1 >= T2 >= T3 >= S(K) >= X(K) at all ${nPairs} (anchor, depth) pairs: ${chainOK ? 'holds' : 'FAILS'}`);
  ck('tier chain', chainOK);
  // Step 2 + Step 3 as an identity: sum_a (sum_{d | (a(a+2),P), d <= xi} lambda_d)^2 = C/G(xi) + sum lambda lambda r.
  for (const [Q, K, xj] of [[101, 4, 8], [317, 8, 12], [1009, 12, 14]]) {
    const w = window_(Q), L = P[K].levels[xj], d = directQF(w, P[K], xj);
    const rr = (() => { const t = tiersAt(w, P[K], xj); return t; })();
    log(`  Q = ${Q}, K = ${K}, xi = ${XI[xj]}: direct sum_a (sum lambda_d)^2 = ${f4(d)}, C/G + sum lambda lambda r = ${f4(rr.t3)}, S(K) = ${Sof(w, K)}, X(K) = ${w.X[K]}`);
    ck(`Selberg identity at Q=${Q}`, Math.abs(d - rr.t3) < 1e-6 * Math.max(1, Math.abs(d)), `${d} vs ${rr.t3}`);
  }
  // Theorem U's uniformity claim: tier T1 depends on the anchor only through C.
  {
    const K = 8, byC = new Map(); let pairsSameC = 0, worst = 0;
    for (const Q of PR.filter(q => q >= 317 && q <= 997)) { const w = window_(Q); const t = tiers(w, P[K]); if (byC.has(w.C)) { pairsSameC++; worst = Math.max(worst, Math.abs(t.t1 - byC.get(w.C))); } else byC.set(w.C, t.t1); }
    log(`  T1 is a function of C alone at fixed (z, grid): ${pairsSameC} anchor pairs of B4 share a value of C; max |T1 difference| among them = ${worst.toExponential(1)}`);
    ck('T1 through C only', worst < 1e-9, worst);
  }
  log('\nSEC A2 — THE BOUND AGAINST EXACT X(K) AT THE BAND DEPTHS (full bands, sums)');
  log('  band  K_b    n    sum X     sum S       sum T1       sum T2       sum T3    T1/X   T2/X   T3/X    S/X   T1/S  xi1 med  xi3 med');
  for (const r of bandRows) log(`  ${r.nm}   ${String(r.K).padStart(3)} ${String(r.n).padStart(4)} ${String(r.sX).padStart(7)} ${String(r.sS).padStart(8)} ${f1w(r.sT1)} ${f1w(r.sT2)} ${f1w(r.sT3)} ${f2(r.sT1 / r.sX).padStart(6)} ${f2(r.sT2 / r.sX).padStart(6)} ${f2(r.sT3 / r.sX).padStart(6)} ${f2(r.sS / r.sX).padStart(6)} ${f2(r.sT1 / r.sS).padStart(6)} ${String(med(r.x1s)).padStart(8)} ${String(med(r.x3s)).padStart(8)}`);
  log('\nSEC A3 — PER-ANCHOR SPREAD, AND WHETHER THE THEOREM BEATS THE TRIVIAL BOUND C');
  log('  band  K_b   T1/X med   T1/X max   T3/X med   T1 < C at   X(K) = 0 anchors');
  for (const r of bandRows) log(`  ${r.nm}   ${String(r.K).padStart(3)} ${f2(med(r.rat1)).padStart(10)} ${f2(Math.max(...r.rat1)).padStart(10)} ${f2(med(r.rat3)).padStart(10)} ${String(r.nBelowC + '/' + r.n).padStart(11)} ${String(r.zeroX).padStart(18)}`);
  log('\nSEC A4 — THE LEVEL THE WINDOW ALLOWS: D_max AND s_max, AND WHETHER s_max IS MONOTONE IN THE BAND');
  log('  band  K_b  p_K   C med   C*V2 med    D_max   s_max = ln D_max / ln p_K');
  const smaxes = [];
  for (const r of bandRows) {
    const Cm = med(r.Cs), main = Cm * P[r.K].V2;
    let Dmax = 1; for (const L of P[r.K].levels) if (L.RU <= main) Dmax = L.xi * L.xi;
    const s = Math.log(Dmax) / Math.log(P[r.K].z); smaxes.push(s);
    log(`  ${r.nm}   ${String(r.K).padStart(3)} ${String(P[r.K].z).padStart(4)} ${String(Cm).padStart(7)} ${f1w(main)}   ${String(Dmax).padStart(6)}   ${f4(s)}`);
  }
  const monoUp = smaxes.every((s, i) => i === 0 || s >= smaxes[i - 1]);
  const peak = smaxes.indexOf(Math.max(...smaxes));
  log(`  s_max across B3 -> B8: ${smaxes.map(f2).join(', ')}; monotone increasing? ${monoUp ? 'yes' : 'NO'}; peak at ${BANDS[peak][0]}; value at B8 = ${f2(smaxes[5])}; max over bands = ${f2(Math.max(...smaxes))}`);
  log('\nSEC A5 — THE SATURATION IN B6: sum T1 AND sum X ALONG THE DEPTH PROFILE');
  const b6 = PR.filter(q => q >= 1500 && q <= 3163);
  const Ks = [1, 2, 4, 8, 12, 17, 23, 31, 37, 46];
  const light = {}; for (const K of Ks) light[K] = buildK(K, false);
  const cache = b6.map(Q => { const w = window_(Q); return { C: w.C, X: Ks.map(K => w.X[K]) }; });
  log('     K   p_K   sum T1      sum X    T1/X');
  const t1prof = [];
  for (let i = 0; i < Ks.length; i++) {
    const K = Ks[i]; let sT1 = 0, sX = 0;
    for (const c of cache) { let m = Infinity; for (const L of light[K].levels) { const v = c.C / L.G + L.RU; if (v < m) m = v; } sT1 += m; sX += c.X[i]; }
    t1prof.push(sT1);
    log(`  ${String(K).padStart(4)} ${String(ACT[K - 1]).padStart(5)} ${f1w(sT1)} ${String(sX).padStart(10)} ${f2(sT1 / sX).padStart(7)}`);
  }
  const flat = t1prof.slice(5).every(v => Math.abs(v - t1prof[5]) < 0.05);
  log(`  sum T1 constant from K = 17 to K = 46? ${flat ? 'yes, at ' + f1w(t1prof[5]).trim() : 'NO'}`);
  log(`\nassertion failures: ${FAIL}`);
}
function f1w(x) { return x.toFixed(1).padStart(11); }

// ============================================================================
// THE COMPARATORS (stages b, c, d) — written from the NOTES' definitions
// ============================================================================
// Buchstab omega on an independent grid: omega(u) = 1/u on [1,2]; for u > 2,
// F(u) = u omega(u) satisfies F'(u) = omega(u-1), F(2) = 1. Stepped with the
// trapezoid rule on a lag-1 grid, so both endpoint values are already known.
const HW = 1e-4, UMAX = 80;
const NW = Math.round((UMAX - 1) / HW) + 1;
const WG = new Float64Array(NW);                     // WG[i] = omega(1 + i*HW)
{
  for (let i = 0; i <= Math.round(1 / HW); i++) WG[i] = 1 / (1 + i * HW);   // u in [1,2]
  let F = 1;                                                                // F(2) = 2 omega(2) = 1
  const lag = Math.round(1 / HW);
  for (let i = lag; i + 1 < NW; i++) { const u = 1 + i * HW; F += HW / 2 * (WG[i - lag] + WG[i + 1 - lag]); WG[i + 1] = F / (u + HW); }
}
function omega(u) { if (u < 1) return 0; if (u <= 2) return 1 / u; if (u >= UMAX) return Math.exp(-0.5772156649015329); const t = (u - 1) / HW, i = Math.floor(t); return WG[i] + (t - i) * (WG[i + 1] - WG[i]); }
const USTAR = (() => { let a = 3, b = 4; for (let it = 0; it < 200; it++) { const m = (a + b) / 2; if (m * omega(m) < 2) a = m; else b = m; } return (a + b) / 2; })();
const EMG = Math.exp(-0.5772156649015329);
const THETA_OLD = 1 / (2 / EMG), THETA_NEW = 1 / USTAR;   // 1/(2 e^gamma) and 1/u*
// running products over the actives, for C1 and C2
const PRODPREF = new Float64Array(ACT.length + 1); PRODPREF[0] = 1;
for (let i = 0; i < ACT.length; i++) PRODPREF[i + 1] = PRODPREF[i] * (1 - 1 / ACT[i]);
function comparators(Q, nR) {
  const h = Q * Q, lnh = Math.log(h), out = {};
  // C1: least active y with prod_{7<=p<=y} (1 - 1/p) <= 7.5 / ln h
  { const tgt = 7.5 / lnh; let K = nR; for (let k = 1; k <= nR; k++) if (PRODPREF[k] <= tgt) { K = k; break; } out.C1 = { K, y: ACT[K - 1] }; }
  // C2: least K >= 1 with omega(ln h / ln p_K) < prod_{K < i <= nR} (1 - 1/p_i)
  { let K = nR; for (let k = 1; k <= nR; k++) { const tail = PRODPREF[nR] / PRODPREF[k]; if (omega(lnh / Math.log(ACT[k - 1])) < tail) { K = k; break; } } out.C2 = { K, y: ACT[K - 1] }; }
  for (const [nm, th] of [['OLD', THETA_OLD], ['NEW', THETA_NEW]]) { const y = Math.exp(th * lnh); out[nm] = { K: piOf(y) - 3, y }; }
  for (const k of ['C1', 'C2', 'OLD', 'NEW']) out[k].L = Math.log(out[k].y) / lnh;
  return out;
}
const CMP = ['C2', 'C1', 'OLD', 'NEW'];
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const sdev = (a) => { const m = mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) * (x - m), 0) / (a.length - 1)); };
function runBand(name, lo, hi, step) {
  const anchors = PR.filter(q => q > lo && q <= hi).filter((q, i) => i % step === 0);
  const L = [], mm = [], ys = [], ks = [], tw = [], F = { C2: { L: [], m: [], y: [], K: [] }, C1: { L: [], m: [], y: [], K: [] }, OLD: { L: [], m: [], y: [], K: [] }, NEW: { L: [], m: [], y: [], K: [] } };
  let maxK = 0, maxQ = 0, maxPool = 0, nT0 = 0;
  for (const Q of anchors) {
    const w = window_(Q); if (w.T < 1) { nT0++; continue; }
    const K = kstar(w), y = ACT[K - 1], lnh = Math.log(Q * Q);
    L.push(Math.log(y) / lnh); mm.push(K / w.nR); ys.push(y); ks.push(K);
    if (K > maxK) { maxK = K; maxQ = Q; maxPool = w.nR; }
    if (NEXTP.get(Q) === Q + 2) tw.push(K / w.nR);
    const c = comparators(Q, w.nR);
    for (const k of CMP) { F[k].L.push(c[k].L); F[k].m.push(c[k].K / w.nR); F[k].y.push(c[k].y); F[k].K.push(c[k].K); }
  }
  const out = { name, n: L.length, nT0, m: mean(mm), K: mean(ks), y: mean(ys), L: mean(L), sd: sdev(L), max: Math.max(...mm), maxK, maxQ, maxPool, twN: tw.length, twM: mean(tw), twMax: Math.max(...tw), F: {}, Lraw: L, step };
  out.se = out.sd / Math.sqrt(out.n);
  for (const k of CMP) out.F[k] = { L: mean(F[k].L), m: mean(F[k].m), y: mean(F[k].y), K: mean(F[k].K), pairSd: sdev(L.map((v, i) => v - F[k].L[i])) };
  out.sdyLog = sdev(ys.map(Math.log)); out.sdyLogC2 = sdev(F.C2.y.map(Math.log));
  return out;
}
function scoreBand(b, prev) {
  const rows = [];
  for (const k of CMP) rows.push([`R1 ${k}`, Math.abs(b.m - b.F[k].m) <= 0.05 * b.F[k].m, b.m - b.F[k].m]);
  for (const k of CMP) rows.push([`R2 ${k}`, Math.abs(b.L - (k === 'OLD' ? THETA_OLD : k === 'NEW' ? THETA_NEW : b.F[k].L)) <= 0.0015, b.L - (k === 'OLD' ? THETA_OLD : k === 'NEW' ? THETA_NEW : b.F[k].L)]);
  for (const k of CMP) rows.push([`R3 ${k}`, Math.abs(b.y - b.F[k].y) <= 0.05 * b.F[k].y, b.y - b.F[k].y]);
  rows.push(['R4 old', Math.abs(b.L / THETA_OLD - b.F.C1.L / THETA_OLD) <= 0.006, b.L / THETA_OLD - b.F.C1.L / THETA_OLD]);
  rows.push(['R4 new', Math.abs(b.L / THETA_NEW - b.F.C1.L / THETA_NEW) <= 0.006, b.L / THETA_NEW - b.F.C1.L / THETA_NEW]);
  rows.push(['R5 shape', prev === null || b.m <= prev.m, prev === null ? 0 : b.m - prev.m]);
  rows.push(['R6 sup', (prev === null || b.max <= prev.max) && b.maxK <= 2 * b.F.C2.K, b.maxK - 2 * b.F.C2.K]);
  rows.push(['R7 twinQ', Math.abs(b.twM - b.m) <= 0.005, b.twM - b.m]);
  return rows;
}

const BSPEC = { B8: [5623, 10007], B9: [10007, 17783], B10: [17783, 31607], B11: [31607, 56234], B12: [56234, 100003], B13: [100003, 177828], B14: [177828, 316243] };
function bandLine(b) { return `  ${b.name.padEnd(4)} ${String(b.n).padStart(6)} ${f4(b.m)} ${f2(b.K).padStart(8)} ${f2(b.y).padStart(9)} ${f5(b.L)} ${f5(b.sd)} ${b.se.toExponential(2)} ${f3(b.max)} ${String(b.maxK).padStart(5)} (${b.maxQ}, ${b.maxPool}) ${String(b.twN).padStart(5)} ${f4(b.twM)}`; }
function fcastLines(b) { return CMP.map(k => `  ${b.name.padEnd(4)} ${k.padEnd(4)} ${f5(b.F[k].m)} ${f5(b.F[k].L)} ${f2(b.F[k].y).padStart(9)} ${f2(b.F[k].K).padStart(8)}  resid L = ${(b.L - b.F[k].L).toFixed(5)}  z = ${((b.L - b.F[k].L) / b.se).toFixed(2)}`).join('\n'); }
function pointRow(Q) {
  const w = window_(Q), K = kstar(w), c = comparators(Q, w.nR);
  return `  Q = ${Q}: y* = ${ACT[K - 1]} (K* = ${K} of pool ${w.nR}, T = ${w.T}); forecasts C2 ${f1(c.C2.y)} C1 ${f1(c.C1.y)} OLD ${f1(c.OLD.y)} NEW ${f1(c.NEW.y)}; all within +-25%: ${CMP.every(k => Math.abs(ACT[K - 1] - c[k].y) <= 0.25 * c[k].y) ? 'yes' : 'NO'}`;
}
const f1 = (x) => x.toFixed(1);

if (STAGE === 'b' || STAGE === 'c' || STAGE === 'd') {
  log(`RED TEAM 0830, STAGE ${STAGE} — the blind quadpoint notes, re-run on independent code`);
  log('\nSEC B0 — GATES ON THE INDEPENDENT MACHINERY');
  log(`  omega(2) = ${f6(omega(2))} (want 0.500000); 3 omega(3) = ${f6(3 * omega(3))} (want 1 + ln 2 = ${f6(1 + Math.log(2))}); omega(12) = ${f6(omega(12))} (want e^-gamma = ${f6(EMG)})`);
  ck('omega gates', Math.abs(omega(2) - .5) < 1e-6 && Math.abs(3 * omega(3) - 1 - Math.log(2)) < 1e-5 && Math.abs(omega(12) - EMG) < 1e-5);
  log(`  root of u omega(u) = 2: u* = ${USTAR.toFixed(7)}; theta_new = 1/u* = ${f6(THETA_NEW)}; theta_old = 1/(2 e^gamma) = ${f6(THETA_OLD)}; difference = ${f6(THETA_OLD - THETA_NEW)}`);
  log(`  engine gate, four point anchors of the two notes:`);
  for (const Q of [9281, 31607, 100003, 177823, 316243]) log(pointRow(Q));
}
if (STAGE === 'b') {
  log('\nSEC B1 — THE FOURTH DECADE RE-RUN IN FULL, B8 SEED AND B9-B12 (every anchor)');
  log('  band       n      m     K* mean    y* mean       L      sd_L       se_L    max  largest K* (Q, pool)  twinQ n, mean');
  const bands = [], names = ['B8', 'B9', 'B10', 'B11', 'B12'];
  for (const nm of names) { const b = runBand(nm, BSPEC[nm][0], BSPEC[nm][1], 1); bands.push(b); log(bandLine(b)); }
  log(`  anchors with T = 0 anywhere in B8-B12: ${bands.reduce((a, b) => a + b.nT0, 0)} (the quantifier is untested by construction, as both notes say)`);
  log('\nSEC B2 — THE COMPARATORS, RECOMPUTED, AGAINST THE SEALED FORECAST TABLE OF blind-0830-quadpoint-31607.md §2');
  log('  band comp  K*/pool       L        y*       K*   residual and z');
  for (const b of bands.slice(1)) log(fcastLines(b));
  log('\nSEC B3 — INDEPENDENT RE-SCORE OF THE 68 BAND ROWS (R1-R7 x 4 comparators x 4 bands), rules as sealed');
  let H = 0, M = 0; const missList = [];
  for (let i = 1; i < bands.length; i++) {
    const rows = scoreBand(bands[i], bands[i - 1]);
    const h = rows.filter(r => r[1]).length;
    H += h; M += rows.length - h;
    for (const r of rows) if (!r[1]) missList.push(`${bands[i].name} ${r[0]} (residual ${r[2].toExponential(2)})`);
    log(`  ${bands[i].name}: ${h} HIT, ${rows.length - h} MISS of ${rows.length} — ` + rows.map(r => `${r[0]}:${r[1] ? 'H' : 'M'}`).join(' '));
  }
  log(`  band rows total: ${H} HIT, ${M} MISS of ${H + M}`);
  log(`  every MISS: ${missList.join('; ')}`);
  log('\nSEC B4 — THE 8 POINT ROWS (R8), scored at +-25%');
  let H8 = 0;
  for (const Q of [31607, 100003]) { const w = window_(Q), K = kstar(w), c = comparators(Q, w.nR); for (const k of CMP) { const ok = Math.abs(ACT[K - 1] - c[k].y) <= 0.25 * c[k].y; if (ok) H8++; log(`  Q = ${Q}, ${k}: y* = ${ACT[K - 1]} against F = ${f1(c[k].y)}, |y* - F|/F = ${f4(Math.abs(ACT[K - 1] - c[k].y) / c[k].y)} -> ${ok ? 'HIT' : 'MISS'}`); } }
  log(`  R8: ${H8} HIT, ${8 - H8} MISS of 8`);
  log(`  ALL 76 SEALED ROWS ON INDEPENDENT CODE: ${H + H8} HIT, ${M + (8 - H8)} MISS (the note reports 64 HIT, 12 MISS)`);
  log('\nSEC B5 — HOW MUCH ROOM EACH ROW HAD (the tolerance against the sampling error)');
  for (const b of bands.slice(1)) log(`  ${b.name}: se_L = ${b.se.toExponential(2)}, the sealed R2 band +-0.0015 is ${f1(0.0015 / b.se)} se wide; C2 residual ${(b.L - b.F.C2.L).toExponential(2)} = ${((b.L - b.F.C2.L) / b.se).toFixed(2)} se; C1 ${((b.L - b.F.C1.L) / b.se).toFixed(2)} se`);
  log(`\nassertion failures: ${FAIL}`);
}

if (STAGE === 'c' || STAGE === 'd') {
  const nm = STAGE === 'c' ? 'B13' : 'B14', step = STAGE === 'c' ? 3 : 8;
  log(`\nSEC C1 — ${nm} ON A SYSTEMATIC 1-IN-${step} SUBSAMPLE (independent engine, independent comparators)`);
  const b = runBand(nm, BSPEC[nm][0], BSPEC[nm][1], step);
  log('  band       n      m     K* mean    y* mean       L      sd_L       se_L    max  largest K* (Q, pool)  twinQ n, mean');
  log(bandLine(b));
  log(`  anchors with T = 0: ${b.nT0}`);
  log('\nSEC C2 — THE COMPARATORS AND THE SEALED D ROWS, RESCORED');
  log('  band comp  K*/pool       L        y*       K*   residual and z');
  log(fcastLines(b));
  const zC1 = (b.L - b.F.C1.L) / b.se, zC2 = (b.L - b.F.C2.L) / b.se;
  const D1 = zC1 <= -3 && Math.abs(zC2) <= 2, D2 = Math.abs(zC2) >= 3 && Math.abs(zC1) <= 2, D3 = Math.abs(zC2) < Math.abs(zC1);
  const cls = D1 ? 'A' : D2 ? 'B' : (Math.abs(zC1) <= 2 && Math.abs(zC2) <= 2) ? 'N' : 'F';
  log(`  z_C1 = ${zC1.toFixed(2)}, z_C2 = ${zC2.toFixed(2)}; D1 ${D1 ? 'HIT' : 'MISS'}, D2 ${D2 ? 'HIT' : 'MISS'}, D3 ${D3 ? 'HIT' : 'MISS'}; class ${cls}; K3 (|z_C2| > 3) ${Math.abs(zC2) > 3 ? 'fires' : 'no'}`);
  log(`  the C1 - C2 forecast gap in L is ${(b.F.C1.L - b.F.C2.L).toExponential(2)} = ${((b.F.C1.L - b.F.C2.L) / b.se).toFixed(1)} se at this n, so z_C1 = z_C2 - gap/se identically: D1 has one free reading, not two`);
  log('\nSEC C3 — THE SE THE SEALED RULE USES IS THE UNPAIRED ONE. THE PAIRED ONE:');
  for (const k of ['C2', 'C1']) {
    const sep = b.F[k].pairSd / Math.sqrt(b.n);
    log(`  ${k}: sd(L) = ${f5(b.sd)}, sd(L - F_i) = ${f5(b.F[k].pairSd)}, ratio ${f4(b.F[k].pairSd / b.sd)}; unpaired se ${b.se.toExponential(2)} -> z ${((b.L - b.F[k].L) / b.se).toFixed(2)}; paired se ${sep.toExponential(2)} -> z ${((b.L - b.F[k].L) / sep).toFixed(2)}`);
  }
  log('\nSEC C4 — THE UNSCORED y* CHECK CARRIES A JENSEN BIAS (the note reads it as agreeing in direction)');
  log(`  sd(ln y*) = ${f5(b.sdyLog)}, sd(ln y_C2) = ${f5(b.sdyLogC2)}; the arithmetic mean of a spread-out y sits above its geometric mean by about sigma^2/2`);
  log(`  predicted offset of mean y* over the log-scale comparison: ${f2(b.y * (b.sdyLog * b.sdyLog - b.sdyLogC2 * b.sdyLogC2) / 2)} in y, against the measured C1 gap of ${f2(b.y - b.F.C1.y)} and C2 gap of ${f2(b.y - b.F.C2.y)}`);
  log('\nSEC C5 — WHERE THE SEALED RULE GOES AT THE NEXT DECADE, ON THIS BAND ALONE');
  const rC2 = b.L - b.F.C2.L;
  log(`  C2 residual here ${rC2.toExponential(2)}; the note's B11-B14 residuals are all near -2e-5 while se halves each band.`);
  log(`  if the residual stays at this value, |z_C2| reaches 2 at n = ${Math.round((b.sd / (Math.abs(rC2) / 2)) ** 2)} anchors and 3 at n = ${Math.round((b.sd / (Math.abs(rC2) / 3)) ** 2)}; D1 requires |z_C2| <= 2, so the rule that CONFIRMS C2 here fails on its own at a large enough n`);
  log(`\nassertion failures: ${FAIL}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 1 research/history/staging/redteam-0830-zone.js -- --stage a
//   invocation:  node research/history/staging/redteam-0830-zone.js --stage a
//   code-sha256: 3160fb25282a76037d273646ec3a5e820c5277e04d15b309eb71da5e70ff236d
//   out-sha256:  f22118d0360c59b8c6502ae16465bede68abf2ac867ff51ce11ef0d16273431f
//   body-lines:  61
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     6.0 s
// ============================================================================
// RED TEAM 0830, STAGE a — attack-0829n-X-upper.md: Theorem U and its looseness, on independent code
//
// SEC A0 — CONTROL: THE WINDOW ENGINE AGAINST A TRIAL-DIVISION BRUTE FORCE ON ALL OF B3
//   B3 by trial division, no sieve: C 8989, T 1017, CC 3738, X(4) 891, S(4) 3915
//   B3 by this file's window engine: C 8989, T 1017, CC 3738, X(4) 891, S(4) 3915
//   the two agree on all five totals: yes
//
// SEC A1 — THE PROOF GATES (independent re-derivation, checked numerically)
//   |lambda_d| <= 1 over 6 depths x 28 levels: max |lambda_d| = 1.000000; max |lambda_1 - 1| = 0.0e+0
//   K = 3: G(P(z)) by brute enumeration of all 8 divisors = 2.022222, 1/V2(z) = 2.022222, product with V2 = 1.000000000000000
//   K = 6: G(P(z)) by brute enumeration of all 64 divisors = 2.805432, 1/V2(z) = 2.805432, product with V2 = 1.000000000000000
//   |r_d| < B(d) = 3*2^omega(d)(1 + 1/d): max |r_d|/B(d) = 0.4551 over all moduli x all 1205 anchors (r_1 = 0 by construction)
//   tier chain T1 >= T2 >= T3 >= S(K) >= X(K) at all 1205 (anchor, depth) pairs: holds
//   Q = 101, K = 4, xi = 31: direct sum_a (sum lambda_d)^2 = 19.5020, C/G + sum lambda lambda r = 19.5020, S(K) = 17, X(K) = 2
//   Q = 317, K = 8, xi = 47: direct sum_a (sum lambda_d)^2 = 394.0178, C/G + sum lambda lambda r = 394.0178, S(K) = 283, X(K) = 55
//   Q = 1009, K = 12, xi = 61: direct sum_a (sum lambda_d)^2 = 329.7333, C/G + sum lambda lambda r = 329.7333, S(K) = 201, X(K) = 40
//   T1 is a function of C alone at fixed (z, grid): 7 anchor pairs of B4 share a value of C; max |T1 difference| among them = 0.0e+0
//
// SEC A2 — THE BOUND AGAINST EXACT X(K) AT THE BAND DEPTHS (full bands, sums)
//   band  K_b    n    sum X     sum S       sum T1       sum T2       sum T3    T1/X   T2/X   T3/X    S/X   T1/S  xi1 med  xi3 med
//   B3     4   40     891     3915      6971.3      4899.8      3990.7   7.82   5.50   4.48   4.39   1.78        7      251
//   B4     8  103    7035    28425     56241.1     40229.3     30810.4   7.99   5.72   4.38   4.04   1.98       13      701
//   B5    12   71    7941    32194     68871.2     49893.2     37753.1   8.67   6.28   4.75   4.05   2.14       19      701
//   B6    17  208   41172   167264    378100.0    277059.9    214190.2   9.18   6.73   5.20   4.06   2.26       31      701
//   B7    23  292  101591   407883    968355.1    710933.1    571510.6   9.53   7.00   5.63   4.01   2.37       43      701
//   B8    31  491  279040  1119016   2827454.6   2069508.3   1733352.8  10.13   7.42   6.21   4.01   2.53       61      701
//
// SEC A3 — PER-ANCHOR SPREAD, AND WHETHER THE THEOREM BEATS THE TRIVIAL BOUND C
//   band  K_b   T1/X med   T1/X max   T3/X med   T1 < C at   X(K) = 0 anchors
//   B3     4       8.66      20.00       4.69       35/40                  0
//   B4     8       8.90      34.96       4.48     103/103                  0
//   B5    12       9.19      15.41       4.72       71/71                  0
//   B6    17       9.76      18.78       5.20     208/208                  0
//   B7    23      10.21      16.86       5.66     292/292                  0
//   B8    31      10.75      16.08       6.23     491/491                  0
//
// SEC A4 — THE LEVEL THE WINDOW ALLOWS: D_max AND s_max, AND WHETHER s_max IS MONOTONE IN THE BAND
//   band  K_b  p_K   C med   C*V2 med    D_max   s_max = ln D_max / ln p_K
//   B3     4   17     184        80.3      169   1.8106
//   B4     8   31     714       221.7      841   1.9612
//   B5    12   47    1427       363.9     1849   1.9538
//   B6    17   71  2912.5       629.7     3721   1.9288
//   B7    23  101    5825      1093.3     6889   1.9149
//   B8    31  139   10938      1793.2     9409   1.8542
//   s_max across B3 -> B8: 1.81, 1.96, 1.95, 1.93, 1.91, 1.85; monotone increasing? NO; peak at B4; value at B8 = 1.85; max over bands = 1.96
//
// SEC A5 — THE SATURATION IN B6: sum T1 AND sum X ALONG THE DEPTH PROFILE
//      K   p_K   sum T1      sum X    T1/X
//      1     7    557471.0     284578    1.96
//      2    11    478733.8     215046    2.23
//      4    17    418415.9     139607    3.00
//      8    31    383864.4      80513    4.77
//     12    47    378671.3      56646    6.68
//     17    71    378100.0      41172    9.18
//     23   101    378100.0      30663   12.33
//     31   139    378100.0      22774   16.60
//     37   173    378100.0      19274   19.62
//     46   227    378100.0      15540   24.33
//   sum T1 constant from K = 17 to K = 46? yes, at 378100.0
//
// assertion failures: 0
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 2 research/history/staging/redteam-0830-zone.js -- --stage b
//   invocation:  node research/history/staging/redteam-0830-zone.js --stage b
//   code-sha256: 3160fb25282a76037d273646ec3a5e820c5277e04d15b309eb71da5e70ff236d
//   out-sha256:  53b38185b72cc9e5f74532ac517ecaea514f665f1bdbcf2dadc4c60dfa747d6a
//   body-lines:  67
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     88.1 s
// ============================================================================
// RED TEAM 0830, STAGE b — the blind quadpoint notes, re-run on independent code
//
// SEC B0 — GATES ON THE INDEPENDENT MACHINERY
//   omega(2) = 0.500000 (want 0.500000); 3 omega(3) = 1.693147 (want 1 + ln 2 = 1.693147); omega(12) = 0.561459 (want e^-gamma = 0.561459)
//   root of u omega(u) = 2: u* = 3.5658466; theta_new = 1/u* = 0.280438; theta_old = 1/(2 e^gamma) = 0.280730; difference = 0.000291
//   engine gate, four point anchors of the two notes:
//   Q = 9281: y* = 227 (K* = 46 of pool 1146, T = 127); forecasts C2 157.0 C1 157.0 OLD 168.9 NEW 168.0; all within +-25%: NO
//   Q = 31607: y* = 313 (K* = 62 of pool 3398, T = 3867); forecasts C2 313.0 C1 317.0 OLD 336.1 NEW 334.1; all within +-25%: yes
//   Q = 100003: y* = 631 (K* = 112 of pool 9590, T = 7972); forecasts C2 617.0 C1 617.0 OLD 641.7 NEW 637.4; all within +-25%: yes
//   Q = 177823: y* = 853 (K* = 144 of pool 16141, T = 12776); forecasts C2 857.0 C1 859.0 OLD 886.5 NEW 880.2; all within +-25%: yes
//   Q = 316243: y* = 1171 (K* = 190 of pool 27292, T = 20882); forecasts C2 1187.0 C1 1193.0 OLD 1224.7 NEW 1215.7; all within +-25%: yes
//
// SEC B1 — THE FOURTH DECADE RE-RUN IN FULL, B8 SEED AND B9-B12 (every anchor)
//   band       n      m     K* mean    y* mean       L      sd_L       se_L    max  largest K* (Q, pool)  twinQ n, mean
//   B8      491 0.0321    31.22    141.80 0.27632 0.00570 2.57e-4 0.045    46 (9281, 1146)    70 0.0320
//   B9      810 0.0257    41.49    197.22 0.27705 0.00394 1.38e-4 0.036    56 (16691, 1927)   103 0.0256
//   B10    1361 0.0204    54.99    272.88 0.27744 0.00300 8.14e-5 0.028    71 (30491, 3288)   178 0.0205
//   B11    2302 0.0162    73.03    384.70 0.27858 0.00250 5.20e-5 0.023   102 (51197, 5235)   282 0.0164
//   B12    3890 0.0128    96.59    532.71 0.27875 0.00200 3.21e-5 0.017   129 (83561, 8152)   455 0.0127
//   anchors with T = 0 anywhere in B8-B12: 0 (the quantifier is untested by construction, as both notes say)
//
// SEC B2 — THE COMPARATORS, RECOMPUTED, AGAINST THE SEALED FORECAST TABLE OF blind-0830-quadpoint-31607.md §2
//   band comp  K*/pool       L        y*       K*   residual and z
//   B9   C2   0.02568 0.27727    197.65    41.53  resid L = -0.00022  z = -1.62
//   B9   C1   0.02569 0.27728    197.69    41.55  resid L = -0.00023  z = -1.70
//   B9   OLD  0.02689 0.28073    210.92    43.46  resid L = -0.00368  z = -26.59
//   B9   NEW  0.02674 0.28044    209.75    43.23  resid L = -0.00339  z = -24.49
//   B10  C2   0.02045 0.27752    272.91    55.05  resid L = -0.00009  z = -1.05
//   B10  C1   0.02048 0.27762    273.45    55.14  resid L = -0.00018  z = -2.23
//   B10  OLD  0.02140 0.28073    291.13    57.58  resid L = -0.00329  z = -40.45
//   B10  NEW  0.02131 0.28044    289.42    57.33  resid L = -0.00300  z = -36.87
//   B11  C2   0.01620 0.27860    384.47    72.96  resid L = -0.00002  z = -0.39
//   B11  C1   0.01624 0.27876    385.79    73.18  resid L = -0.00018  z = -3.46
//   B11  OLD  0.01674 0.28073    402.27    75.41  resid L = -0.00215  z = -41.41
//   B11  NEW  0.01664 0.28044    399.77    74.98  resid L = -0.00186  z = -35.81
//   B12  C2   0.01277 0.27884    533.39    96.68  resid L = -0.00009  z = -2.82
//   B12  C1   0.01282 0.27903    535.72    97.05  resid L = -0.00028  z = -8.83
//   B12  OLD  0.01318 0.28073    556.04    99.69  resid L = -0.00198  z = -61.76
//   B12  NEW  0.01311 0.28044    552.40    99.16  resid L = -0.00169  z = -52.68
//
// SEC B3 — INDEPENDENT RE-SCORE OF THE 68 BAND ROWS (R1-R7 x 4 comparators x 4 bands), rules as sealed
//   B9: 13 HIT, 4 MISS of 17 — R1 C2:H R1 C1:H R1 OLD:H R1 NEW:H R2 C2:H R2 C1:H R2 OLD:M R2 NEW:M R3 C2:H R3 C1:H R3 OLD:M R3 NEW:M R4 old:H R4 new:H R5 shape:H R6 sup:H R7 twinQ:H
//   B10: 13 HIT, 4 MISS of 17 — R1 C2:H R1 C1:H R1 OLD:H R1 NEW:H R2 C2:H R2 C1:H R2 OLD:M R2 NEW:M R3 C2:H R3 C1:H R3 OLD:M R3 NEW:M R4 old:H R4 new:H R5 shape:H R6 sup:H R7 twinQ:H
//   B11: 15 HIT, 2 MISS of 17 — R1 C2:H R1 C1:H R1 OLD:H R1 NEW:H R2 C2:H R2 C1:H R2 OLD:M R2 NEW:M R3 C2:H R3 C1:H R3 OLD:H R3 NEW:H R4 old:H R4 new:H R5 shape:H R6 sup:H R7 twinQ:H
//   B12: 15 HIT, 2 MISS of 17 — R1 C2:H R1 C1:H R1 OLD:H R1 NEW:H R2 C2:H R2 C1:H R2 OLD:M R2 NEW:M R3 C2:H R3 C1:H R3 OLD:H R3 NEW:H R4 old:H R4 new:H R5 shape:H R6 sup:H R7 twinQ:H
//   band rows total: 56 HIT, 12 MISS of 68
//   every MISS: B9 R2 OLD (residual -3.68e-3); B9 R2 NEW (residual -3.39e-3); B9 R3 OLD (residual -1.37e+1); B9 R3 NEW (residual -1.25e+1); B10 R2 OLD (residual -3.29e-3); B10 R2 NEW (residual -3.00e-3); B10 R3 OLD (residual -1.82e+1); B10 R3 NEW (residual -1.65e+1); B11 R2 OLD (residual -2.15e-3); B11 R2 NEW (residual -1.86e-3); B12 R2 OLD (residual -1.98e-3); B12 R2 NEW (residual -1.69e-3)
//
// SEC B4 — THE 8 POINT ROWS (R8), scored at +-25%
//   Q = 31607, C2: y* = 313 against F = 313.0, |y* - F|/F = 0.0000 -> HIT
//   Q = 31607, C1: y* = 313 against F = 317.0, |y* - F|/F = 0.0126 -> HIT
//   Q = 31607, OLD: y* = 313 against F = 336.1, |y* - F|/F = 0.0687 -> HIT
//   Q = 31607, NEW: y* = 313 against F = 334.1, |y* - F|/F = 0.0630 -> HIT
//   Q = 100003, C2: y* = 631 against F = 617.0, |y* - F|/F = 0.0227 -> HIT
//   Q = 100003, C1: y* = 631 against F = 617.0, |y* - F|/F = 0.0227 -> HIT
//   Q = 100003, OLD: y* = 631 against F = 641.7, |y* - F|/F = 0.0166 -> HIT
//   Q = 100003, NEW: y* = 631 against F = 637.4, |y* - F|/F = 0.0100 -> HIT
//   R8: 8 HIT, 0 MISS of 8
//   ALL 76 SEALED ROWS ON INDEPENDENT CODE: 64 HIT, 12 MISS (the note reports 64 HIT, 12 MISS)
//
// SEC B5 — HOW MUCH ROOM EACH ROW HAD (the tolerance against the sampling error)
//   B9: se_L = 1.38e-4, the sealed R2 band +-0.0015 is 10.8 se wide; C2 residual -2.25e-4 = -1.62 se; C1 -1.70 se
//   B10: se_L = 8.14e-5, the sealed R2 band +-0.0015 is 18.4 se wide; C2 residual -8.58e-5 = -1.05 se; C1 -2.23 se
//   B11: se_L = 5.20e-5, the sealed R2 band +-0.0015 is 28.8 se wide; C2 residual -2.01e-5 = -0.39 se; C1 -3.46 se
//   B12: se_L = 3.21e-5, the sealed R2 band +-0.0015 is 46.8 se wide; C2 residual -9.05e-5 = -2.82 se; C1 -8.83 se
//
// assertion failures: 0
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 3 research/history/staging/redteam-0830-zone.js -- --stage c
//   invocation:  node research/history/staging/redteam-0830-zone.js --stage c
//   code-sha256: 3160fb25282a76037d273646ec3a5e820c5277e04d15b309eb71da5e70ff236d
//   out-sha256:  984e4de53e8c3815b8868a86491ecca710516c9f7adcc31a2684d06ab2527e31
//   body-lines:  39
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     76.0 s
// ============================================================================
// RED TEAM 0830, STAGE c — the blind quadpoint notes, re-run on independent code
//
// SEC B0 — GATES ON THE INDEPENDENT MACHINERY
//   omega(2) = 0.500000 (want 0.500000); 3 omega(3) = 1.693147 (want 1 + ln 2 = 1.693147); omega(12) = 0.561459 (want e^-gamma = 0.561459)
//   root of u omega(u) = 2: u* = 3.5658466; theta_new = 1/u* = 0.280438; theta_old = 1/(2 e^gamma) = 0.280730; difference = 0.000291
//   engine gate, four point anchors of the two notes:
//   Q = 9281: y* = 227 (K* = 46 of pool 1146, T = 127); forecasts C2 157.0 C1 157.0 OLD 168.9 NEW 168.0; all within +-25%: NO
//   Q = 31607: y* = 313 (K* = 62 of pool 3398, T = 3867); forecasts C2 313.0 C1 317.0 OLD 336.1 NEW 334.1; all within +-25%: yes
//   Q = 100003: y* = 631 (K* = 112 of pool 9590, T = 7972); forecasts C2 617.0 C1 617.0 OLD 641.7 NEW 637.4; all within +-25%: yes
//   Q = 177823: y* = 853 (K* = 144 of pool 16141, T = 12776); forecasts C2 857.0 C1 859.0 OLD 886.5 NEW 880.2; all within +-25%: yes
//   Q = 316243: y* = 1171 (K* = 190 of pool 27292, T = 20882); forecasts C2 1187.0 C1 1193.0 OLD 1224.7 NEW 1215.7; all within +-25%: yes
//
// SEC C1 — B13 ON A SYSTEMATIC 1-IN-3 SUBSAMPLE (independent engine, independent comparators)
//   band       n      m     K* mean    y* mean       L      sd_L       se_L    max  largest K* (Q, pool)  twinQ n, mean
//   B13    2184 0.0100   127.94    737.17 0.27895 0.00151 3.23e-5 0.013   159 (169889, 15483)   265 0.0101
//   anchors with T = 0: 0
//
// SEC C2 — THE COMPARATORS AND THE SEALED D ROWS, RESCORED
//   band comp  K*/pool       L        y*       K*   residual and z
//   B13  C2   0.01005 0.27897    737.00   127.91  resid L = -0.00001  z = -0.45
//   B13  C1   0.01009 0.27919    740.91   128.49  resid L = -0.00024  z = -7.33
//   B13  OLD  0.01037 0.28073    768.03   132.01  resid L = -0.00178  z = -55.13
//   B13  NEW  0.01031 0.28044    762.75   131.20  resid L = -0.00149  z = -46.10
//   z_C1 = -7.33, z_C2 = -0.45; D1 HIT, D2 MISS, D3 HIT; class A; K3 (|z_C2| > 3) no
//   the C1 - C2 forecast gap in L is 2.22e-4 = 6.9 se at this n, so z_C1 = z_C2 - gap/se identically: D1 has one free reading, not two
//
// SEC C3 — THE SE THE SEALED RULE USES IS THE UNPAIRED ONE. THE PAIRED ONE:
//   C2: sd(L) = 0.00151, sd(L - F_i) = 0.00151, ratio 0.9989; unpaired se 3.23e-5 -> z -0.45; paired se 3.22e-5 -> z -0.45
//   C1: sd(L) = 0.00151, sd(L - F_i) = 0.00151, ratio 1.0018; unpaired se 3.23e-5 -> z -7.33; paired se 3.23e-5 -> z -7.32
//
// SEC C4 — THE UNSCORED y* CHECK CARRIES A JENSEN BIAS (the note reads it as agreeing in direction)
//   sd(ln y*) = 0.10266, sd(ln y_C2) = 0.09686; the arithmetic mean of a spread-out y sits above its geometric mean by about sigma^2/2
//   predicted offset of mean y* over the log-scale comparison: 0.43 in y, against the measured C1 gap of -3.74 and C2 gap of 0.17
//
// SEC C5 — WHERE THE SEALED RULE GOES AT THE NEXT DECADE, ON THIS BAND ALONE
//   C2 residual here -1.46e-5; the note's B11-B14 residuals are all near -2e-5 while se halves each band.
//   if the residual stays at this value, |z_C2| reaches 2 at n = 42914 anchors and 3 at n = 96556; D1 requires |z_C2| <= 2, so the rule that CONFIRMS C2 here fails on its own at a large enough n
//
// assertion failures: 0
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 4 research/history/staging/redteam-0830-zone.js -- --stage d
//   invocation:  node research/history/staging/redteam-0830-zone.js --stage d
//   code-sha256: 3160fb25282a76037d273646ec3a5e820c5277e04d15b309eb71da5e70ff236d
//   out-sha256:  858e5ae9408fbdc9edd15a0a51fc5c3d7bcae4ca9c2281ed46c211b8898dddeb
//   body-lines:  39
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     103.6 s
// ============================================================================
// RED TEAM 0830, STAGE d — the blind quadpoint notes, re-run on independent code
//
// SEC B0 — GATES ON THE INDEPENDENT MACHINERY
//   omega(2) = 0.500000 (want 0.500000); 3 omega(3) = 1.693147 (want 1 + ln 2 = 1.693147); omega(12) = 0.561459 (want e^-gamma = 0.561459)
//   root of u omega(u) = 2: u* = 3.5658466; theta_new = 1/u* = 0.280438; theta_old = 1/(2 e^gamma) = 0.280730; difference = 0.000291
//   engine gate, four point anchors of the two notes:
//   Q = 9281: y* = 227 (K* = 46 of pool 1146, T = 127); forecasts C2 157.0 C1 157.0 OLD 168.9 NEW 168.0; all within +-25%: NO
//   Q = 31607: y* = 313 (K* = 62 of pool 3398, T = 3867); forecasts C2 313.0 C1 317.0 OLD 336.1 NEW 334.1; all within +-25%: yes
//   Q = 100003: y* = 631 (K* = 112 of pool 9590, T = 7972); forecasts C2 617.0 C1 617.0 OLD 641.7 NEW 637.4; all within +-25%: yes
//   Q = 177823: y* = 853 (K* = 144 of pool 16141, T = 12776); forecasts C2 857.0 C1 859.0 OLD 886.5 NEW 880.2; all within +-25%: yes
//   Q = 316243: y* = 1171 (K* = 190 of pool 27292, T = 20882); forecasts C2 1187.0 C1 1193.0 OLD 1224.7 NEW 1215.7; all within +-25%: yes
//
// SEC C1 — B14 ON A SYSTEMATIC 1-IN-8 SUBSAMPLE (independent engine, independent comparators)
//   band       n      m     K* mean    y* mean       L      sd_L       se_L    max  largest K* (Q, pool)  twinQ n, mean
//   B14    1394 0.0079   169.27   1023.04 0.27925 0.00113 3.02e-5 0.010   208 (306701, 26542)   130 0.0078
//   anchors with T = 0: 0
//
// SEC C2 — THE COMPARATORS AND THE SEALED D ROWS, RESCORED
//   band comp  K*/pool       L        y*       K*   residual and z
//   B14  C2   0.00788 0.27925   1022.48   169.22  resid L = 0.00000  z = 0.15
//   B14  C1   0.00792 0.27949   1028.73   170.10  resid L = -0.00024  z = -7.92
//   B14  OLD  0.00810 0.28073   1060.92   174.08  resid L = -0.00148  z = -49.03
//   B14  NEW  0.00805 0.28044   1053.27   173.02  resid L = -0.00119  z = -39.36
//   z_C1 = -7.92, z_C2 = 0.15; D1 HIT, D2 MISS, D3 HIT; class A; K3 (|z_C2| > 3) no
//   the C1 - C2 forecast gap in L is 2.44e-4 = 8.1 se at this n, so z_C1 = z_C2 - gap/se identically: D1 has one free reading, not two
//
// SEC C3 — THE SE THE SEALED RULE USES IS THE UNPAIRED ONE. THE PAIRED ONE:
//   C2: sd(L) = 0.00113, sd(L - F_i) = 0.00113, ratio 1.0064; unpaired se 3.02e-5 -> z 0.15; paired se 3.03e-5 -> z 0.15
//   C1: sd(L) = 0.00113, sd(L - F_i) = 0.00113, ratio 1.0019; unpaired se 3.02e-5 -> z -7.92; paired se 3.02e-5 -> z -7.91
//
// SEC C4 — THE UNSCORED y* CHECK CARRIES A JENSEN BIAS (the note reads it as agreeing in direction)
//   sd(ln y*) = 0.09622, sd(ln y_C2) = 0.09167; the arithmetic mean of a spread-out y sits above its geometric mean by about sigma^2/2
//   predicted offset of mean y* over the log-scale comparison: 0.44 in y, against the measured C1 gap of -5.69 and C2 gap of 0.56
//
// SEC C5 — WHERE THE SEALED RULE GOES AT THE NEXT DECADE, ON THIS BAND ALONE
//   C2 residual here 4.56e-6; the note's B11-B14 residuals are all near -2e-5 while se halves each band.
//   if the residual stays at this value, |z_C2| reaches 2 at n = 244247 anchors and 3 at n = 549555; D1 requires |z_C2| <= 2, so the rule that CONFIRMS C2 here fails on its own at a large enough n
//
// assertion failures: 0
// ============================================================================
// READINGS
//
