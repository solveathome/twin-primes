// ============================================================================
// ATTACK PARITY ADVERSARY 01 — THE PARITY OBSTRUCTION AS A FINITE LP ON OUR
// OWN STRETCHES: DOES A TWIN-FREE MEASURE MATCHING THE LEVEL-D SIEVE DATA
// EXIST, AND IF SO HOW MUCH DISTORTION DOES IT COST?
// ============================================================================
// THE QUESTION (TODO Z2 first move (b), in exact form). The certificate at
// (Q, y) is X(y) < T (capture identity, quadpoint-identity-01.md, HELD —
// UNVERIFIED PREMISE, never red-teamed; nothing below depends on the identity
// being right, only on the stretch/channel convention it fixes, which is
// cross-checked in SEC 1). Z2 (b) asks whether any machinery reaches the
// precision class that certificate needs. This producer answers the
// information-theoretic half CONSTRUCTIVELY, on the finite grid, by linear
// programming.
//
// THE OBJECT. Anchor Q (prime >= 7), Q' = next prime, stretch S_Q = [Q^2, Q'^2),
// channel positions a in S_Q with a = 11, 17, 29 (mod 30) and a+2 < Q'^2, so
// both members are coprime to 30. C = #channel, T = #twins. For a channel
// position a let sig(a) = { p in [7, Q] : p | a(a+2) } (the SIEVE SIGNATURE).
// By finality sig(a) = {} iff a is a twin. A sieve of level D sees exactly the
// numbers |A_d| = #{a : d | a(a+2)} for squarefree d | P(y), d <= D; a level-D
// lower-bound sieve is a vector (lambda_d) with sum_{d | a(a+2)} lambda_d <= 1_{a twin}
// for every a, and it certifies T >= sum_d lambda_d |A_d|.
//
// MODEL A (EXACT DATA). variables nu(a) >= 0; constraints sum_{a in A_d} nu(a)
// = |A_d| for every d | P(y), 1 < d <= D, plus the census row sum nu = C.
//   m*(D) = min twin mass over that polytope = max(0, C - max sum_{nontwin} nu).
//   M*(D) = max twin mass = C - min sum_{nontwin} nu.
// LP DUALITY, exactly: m*(D) is the best lower bound and M*(D) the best upper
// bound on T obtainable from the level-D data by ANY linear certificate.
// m*(D) = 0 <=> a twin-free adversary exists <=> no level-D lower-bound sieve
// certificate exists on this stretch. D*(Q) = least D with m*(D) >= 1.
// (Twin columns are all the SAME column — a twin's only divisor is d = 1 — so
// the LP is over the non-twin signature classes with the census row on top.)
//
// MODEL B (WHAT A SIEVE ACTUALLY HAS). Model A gives the sieve the counts
// EXACTLY. A real sieve has main terms plus remainders. So: how far must the
// level-D data be moved for a twin-free measure to appear?
//   Delta(D) = min sum_d |dev_d|   (L1 distortion; the sieve's own currency,
//              since a certificate with |lambda_d| <= 1 loses at most sum|dev|)
//   theta(D) = min max_d |dev_d|   (Linf; per-modulus error tolerance)
// subject to nu >= 0, sum nu = C, zero twin mass. Compare theta against 1: if
// theta < 1, the certificate is destroyed by moving every divisor count by
// less than a single integer's worth.
//
// MODEL C (the literal first-move formulation). Constraints are residue-class
// counts: for every prime p <= y and every b mod p, sum_{a = b (p)} nu(a) =
// truth. This is STRICTLY MORE than a sieve sees (a sieve reads only the
// sifted classes), so it is an upper bound on sieve-accessible information.
//
// CONTROL. Every measurement is repeated on the RANDOM-CLASS surrogate (two
// uniformly chosen residues per active prime instead of {0, -2}), the control
// this corpus requires before any twin-specific reading (REFUTED.md row "any
// twin-specific discrepancy law"). Same C, same interval, seeded PRNG.
//
// WHAT THIS IS NOT. m*(D) >= 1 at one anchor is a certificate for THAT
// stretch, where T is already known by direct count; it is not an ingredient
// for TPC. Infeasibility uniform in Q would BE the Zone Postulate and is
// therefore TPC-strength, not a sub-target (the wrong-direction trap this
// corpus has hit four times — REFUTED.md rows import-suen, import-thinning,
// attack-l1-residue, phase1-T4-maximal-law). Nothing here is asymptotic. All
// arithmetic is exact: integer counting, exact rational simplex over BigInt.
//
// PRIOR ART ON DISK: paper/wall-note.md Section 1 Door 1 (Legendre's 3^n
// budget) and Door 4 (the union bound dying at x = 11) and Section 2 Face 3
// (history-blind cap depth); research/PRIOR-ART.md line on the parity problem
// (Selberg 1949; Tao 2007); research/OBSERVATIONS.md Section 4 (the lucky-number
// control) and Section 5 (parity in the Omega grading); research/sift-limit-attack.md
// Section 4.1 (Bombieri's asymptotic sieve). The classical statement being
// instantiated is named in the staging note; NO novelty is claimed here.
// ============================================================================
'use strict';
const T0 = Date.now();

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
const f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4);

// ---------------------------------------------------------------- primes ---
const PLIM = 9400;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const isOpen30 = (c) => c === 11 || c === 17 || c === 29;

// ------------------------------------------------- exact rational BigInt ---
function bgcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { const t = a % b; a = b; b = t; } return a; }
function R(n, d) {
  if (d === undefined) d = 1n;
  if (typeof n === 'number') n = BigInt(n);
  if (typeof d === 'number') d = BigInt(d);
  if (d < 0n) { n = -n; d = -d; }
  if (n === 0n) return { n: 0n, d: 1n };
  const k = bgcd(n, d); return { n: n / k, d: d / k };
}
const radd = (x, y) => R(x.n * y.d + y.n * x.d, x.d * y.d);
const rsub = (x, y) => R(x.n * y.d - y.n * x.d, x.d * y.d);
const rmul = (x, y) => R(x.n * y.n, x.d * y.d);
const rdiv = (x, y) => R(x.n * y.d, x.d * y.n);
const rsgn = (x) => (x.n > 0n ? 1 : (x.n < 0n ? -1 : 0));
const rcmp = (x, y) => rsgn(rsub(x, y));
const rnum = (x) => Number(x.n) / Number(x.d);
const R0 = R(0n), R1 = R(1n), RM1 = R(-1n);

// Exact simplex: maximize c.x subject to Ax = b (b >= 0 componentwise), x >= 0.
// Two phase, Bland's rule throughout (no cycling, exact arithmetic, no tolerance).
function simplex(A, b, c, m, n) {
  const W = n + m + 1, T = [];
  for (let i = 0; i < m; i++) {
    const row = new Array(W).fill(R0);
    for (let j = 0; j < n; j++) row[j] = A[i][j];
    row[n + i] = R1; row[W - 1] = b[i]; T.push(row);
  }
  const basis = new Array(m); for (let i = 0; i < m; i++) basis[i] = n + i;
  let z = new Array(W).fill(R0);
  for (let i = 0; i < m; i++) for (let j = 0; j < W; j++) z[j] = radd(z[j], T[i][j]);
  for (let j = 0; j < n + m; j++) z[j] = rsub(R0, z[j]);
  const pivot = (r, cc) => {
    const pv = T[r][cc];
    for (let j = 0; j < W; j++) T[r][j] = rdiv(T[r][j], pv);
    for (let i = 0; i < m; i++) {
      if (i === r) continue; const f = T[i][cc]; if (rsgn(f) === 0) continue;
      for (let j = 0; j < W; j++) T[i][j] = rsub(T[i][j], rmul(f, T[r][j]));
    }
    const f = z[cc]; if (rsgn(f) !== 0) for (let j = 0; j < W; j++) z[j] = rsub(z[j], rmul(f, T[r][j]));
    basis[r] = cc;
  };
  const run = (lim) => {
    let it = 0;
    while (true) {
      if (++it > 500000) throw new Error('simplex iteration cap');
      let e = -1;
      for (let j = 0; j < lim; j++) if (rsgn(z[j]) < 0) { e = j; break; }
      if (e < 0) return 'opt';
      let r = -1, best = null;
      for (let i = 0; i < m; i++) {
        if (rsgn(T[i][e]) > 0) {
          const rt = rdiv(T[i][W - 1], T[i][e]);
          if (best === null || rcmp(rt, best) < 0 || (rcmp(rt, best) === 0 && basis[i] < basis[r])) { best = rt; r = i; }
        }
      }
      if (r < 0) return 'unbounded';
      pivot(r, e);
    }
  };
  run(n + m);
  let art = R0; for (let i = 0; i < m; i++) if (basis[i] >= n) art = radd(art, T[i][W - 1]);
  if (rsgn(art) > 0) return { status: 'infeasible' };
  for (let i = 0; i < m; i++) {
    if (basis[i] >= n) { let e = -1; for (let j = 0; j < n; j++) if (rsgn(T[i][j]) !== 0) { e = j; break; } if (e >= 0) pivot(i, e); }
  }
  z = new Array(W).fill(R0);
  for (let j = 0; j < n; j++) z[j] = rsub(R0, c[j]);
  for (let j = n; j < n + m; j++) z[j] = R1;
  for (let i = 0; i < m; i++) { const f = z[basis[i]]; if (rsgn(f) !== 0) for (let j = 0; j < W; j++) z[j] = rsub(z[j], rmul(f, T[i][j])); }
  if (run(n) === 'unbounded') return { status: 'unbounded' };
  let val = R0; for (let i = 0; i < m; i++) if (basis[i] < n) val = radd(val, rmul(c[basis[i]], T[i][W - 1]));
  return { status: 'opt', value: val };
}

// ------------------------------------------------------- the stretch -------
// mode 'true': p strikes a iff p | a(a+2).  mode 'ctrl': p strikes a iff
// a is in one of two uniformly chosen residue classes mod p (seeded).
let rngState = 0;
function rnd() { rngState = (rngState * 1103515245 + 12345) >>> 0; return rngState / 4294967296; }
function buildAnchor(Qi, mode, seed) {
  const Q = ACT[Qi], Qp = ACT[Qi + 1], lo = Q * Q, hi = Qp * Qp;
  const nR = Qi + 1;
  let cls = null;
  if (mode === 'ctrl') { rngState = (seed >>> 0) || 1; for (let i = 0; i < 20; i++) rnd(); cls = []; }
  const r1 = new Int32Array(nR), r2 = new Int32Array(nR);
  if (mode === 'ctrl') for (let i = 0; i < nR; i++) { const p = ACT[i]; const a = Math.floor(rnd() * p); let b = Math.floor(rnd() * (p - 1)); if (b >= a) b++; r1[i] = a; r2[i] = b; }
  const byKey = new Map(); let C = 0, T = 0; const posSig = [];
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    C++;
    const s = [];
    for (let i = 0; i < nR; i++) {
      const p = ACT[i];
      const hit = mode === 'ctrl' ? (a % p === r1[i] || a % p === r2[i]) : (a % p === 0 || (a + 2) % p === 0);
      if (hit) s.push(p);
    }
    if (s.length === 0) { T++; posSig.push(null); continue; }
    posSig.push(s);
    const k = s.join(','); const e = byKey.get(k);
    if (e) e.n++; else byKey.set(k, { primes: s, n: 1 });
  }
  return { Q, Qp, lo, hi, width: hi - lo, C, T, cls: [...byKey.values()], posSig, nR };
}

// divisor rows: d -> {cols (class indices, with multiplicity 1), rhs = |A_d|}
function divisorRows(B) {
  const m = new Map();
  B.cls.forEach((c, ci) => {
    const k = c.primes.length;
    if (k > 24) throw new Error('signature too wide');
    for (let msk = 1; msk < (1 << k); msk++) {
      let d = 1n; for (let j = 0; j < k; j++) if (msk & (1 << j)) d *= BigInt(c.primes[j]);
      let w = 0; for (let j = 0; j < k; j++) if (msk & (1 << j)) w++;
      let e = m.get(d); if (!e) { e = { cols: [], rhs: 0, w }; m.set(d, e); }
      e.cols.push(ci); e.rhs += c.n;
    }
  });
  return m;
}
// Distinct d with the SAME column support impose the SAME constraint, so the
// feasible set only needs one of them — but the L1 objective sums over d, so
// the survivor carries the multiplicity of the class it represents.
function activeRows(rows, D) {
  const out = [], seen = new Map();
  for (const [d, e] of rows) {
    if (d > D) continue;
    const k = e.cols.join(',');
    const prev = seen.get(k);
    if (prev !== undefined) { out[prev].mult++; continue; }
    seen.set(k, out.length); out.push({ cols: e.cols, rhs: e.rhs, mult: 1 });
  }
  return out;
}

// ---- MODEL A: exact data.  dir = +1 max sum nu, -1 min sum nu -------------
function modelA(B, rows, D, dir) {
  const nC = B.cls.length;
  const fixed = new Array(nC).fill(null);
  const act = activeRows(rows, D).map(r => ({ cols: r.cols, rhs: r.rhs, done: false }));
  let changed = true;
  while (changed) {
    changed = false;
    for (const r of act) {
      if (r.done) continue;
      const uc = []; let s = 0;
      for (const c of r.cols) { if (fixed[c] !== null) s += fixed[c]; else uc.push(c); }
      const res = r.rhs - s;
      if (uc.length === 0) { r.done = true; changed = true; if (res !== 0) return { status: 'inconsistent' }; continue; }
      if (res === 0) { for (const c of uc) fixed[c] = 0; r.done = true; changed = true; continue; }
      if (uc.length === 1) { fixed[uc[0]] = res; r.done = true; changed = true; continue; }
      r.uc = uc; r.res = res;
    }
  }
  let base = 0; for (let i = 0; i < nC; i++) if (fixed[i] !== null) base += fixed[i];
  const idx = new Array(nC).fill(-1); let nf = 0;
  for (let i = 0; i < nC; i++) if (fixed[i] === null) idx[i] = nf++;
  const live = act.filter(r => !r.done);
  if (nf === 0) return { status: 'opt', value: base, m: 0, n: 0 };
  if (live.length === 0) return dir > 0 ? { status: 'unbounded', m: 0, n: nf } : { status: 'opt', value: base, m: 0, n: nf };
  const m = live.length, n = nf;
  const A = live.map(r => { const row = new Array(n).fill(R0); for (const c of r.uc) row[idx[c]] = R1; return row; });
  const b = live.map(r => R(BigInt(r.res)));
  const c = new Array(n).fill(dir > 0 ? R1 : RM1);
  const res = simplex(A, b, c, m, n);
  if (res.status !== 'opt') return { status: res.status, m, n };
  return { status: 'opt', value: base + dir * rnum(res.value), m, n };
}
function mStar(B, rows, D) { const r = modelA(B, rows, D, 1); return r.status === 'unbounded' ? 0 : Math.max(0, B.C - r.value); }
function MStar(B, rows, D) { const r = modelA(B, rows, D, -1); return r.status === 'opt' ? B.C - r.value : null; }

// ---- MODEL B: L1 distortion and Linf per-modulus tolerance ----------------
function deltaL1(B, rows, D) {
  const act = activeRows(rows, D), nC = B.cls.length, nD = act.length;
  const n = nC + 2 * nD, m = 1 + nD, A = [], b = [], c = new Array(n).fill(R0);
  const r0 = new Array(n).fill(R0); for (let j = 0; j < nC; j++) r0[j] = R1;
  A.push(r0); b.push(R(BigInt(B.C)));
  act.forEach((e, i) => {
    const row = new Array(n).fill(R0);
    for (const cc of e.cols) row[cc] = R1;
    row[nC + 2 * i] = RM1; row[nC + 2 * i + 1] = R1;
    A.push(row); b.push(R(BigInt(e.rhs)));
    const w = R(BigInt(-e.mult)); c[nC + 2 * i] = w; c[nC + 2 * i + 1] = w;
  });
  const res = simplex(A, b, c, m, n);
  return { status: res.status, value: res.status === 'opt' ? -rnum(res.value) : null, m, n };
}
function thetaMin(B, rows, D) {
  const act = activeRows(rows, D), nC = B.cls.length, nD = act.length;
  const TH = nC, n = nC + 1 + 2 * nD, m = 1 + 2 * nD;
  const A = [], b = [], c = new Array(n).fill(R0); c[TH] = RM1;
  const r0 = new Array(n).fill(R0); for (let j = 0; j < nC; j++) r0[j] = R1;
  A.push(r0); b.push(R(BigInt(B.C)));
  act.forEach((e, i) => {
    const r1 = new Array(n).fill(R0); for (const cc of e.cols) r1[cc] = R1; r1[nC + 1 + 2 * i] = R1; r1[TH] = RM1;
    A.push(r1); b.push(R(BigInt(e.rhs)));
    const r2 = new Array(n).fill(R0); for (const cc of e.cols) r2[cc] = R1; r2[nC + 1 + 2 * i + 1] = RM1; r2[TH] = R1;
    A.push(r2); b.push(R(BigInt(e.rhs)));
  });
  const res = simplex(A, b, c, m, n);
  return { status: res.status, value: res.status === 'opt' ? -rnum(res.value) : null, m, n };
}

// ---- MODEL C: residue classes mod p, every p <= y, every class ------------
// Variables are individual non-twin positions (residue data separates them).
// Variables are ALL channel positions (residue data separates twins, so the
// twin columns are no longer a single column and the SEC-2 collapse is void).
// Objective: minimise the mass sitting on twin positions.
function modelC(B) {
  const posOf = [], isTwin = [];
  { let k = 0; for (let a = B.lo; a + 2 < B.hi; a++) if (isOpen30(a % 30)) { posOf[k] = a; isTwin[k] = B.posSig[k] === null; k++; } }
  const nC = posOf.length;
  const rowsArr = [];
  for (let i = 0; i < B.nR; i++) {
    const p = ACT[i];
    const rhs = new Int32Array(p), sup = []; for (let b = 0; b < p; b++) sup.push([]);
    for (let k = 0; k < nC; k++) { const b = posOf[k] % p; rhs[b]++; sup[b].push(k); }
    for (let b = 0; b < p; b++) if (rhs[b] > 0) rowsArr.push({ cols: sup[b], rhs: rhs[b] });
  }
  const all = []; for (let k = 0; k < nC; k++) all.push(k);
  rowsArr.push({ cols: all, rhs: B.C });
  // presolve: fix singletons and zero rows
  const fixed = new Array(nC).fill(null);
  const act = rowsArr.map(r => ({ cols: r.cols, rhs: r.rhs, done: false }));
  let changed = true;
  while (changed) {
    changed = false;
    for (const r of act) {
      if (r.done) continue;
      const uc = []; let s = 0;
      for (const c of r.cols) { if (fixed[c] !== null) s += fixed[c]; else uc.push(c); }
      const res = r.rhs - s;
      if (uc.length === 0) { r.done = true; changed = true; if (res !== 0) return { status: 'inconsistent' }; continue; }
      if (res === 0) { for (const c of uc) fixed[c] = 0; r.done = true; changed = true; continue; }
      if (uc.length === 1) { fixed[uc[0]] = res; r.done = true; changed = true; continue; }
      r.uc = uc; r.res = res;
    }
  }
  let base = 0; for (let k = 0; k < nC; k++) if (fixed[k] !== null && isTwin[k]) base += fixed[k];
  const idx = new Array(nC).fill(-1); let nf = 0;
  for (let k = 0; k < nC; k++) if (fixed[k] === null) idx[k] = nf++;
  const live = act.filter(r => !r.done);
  if (nf === 0) return { status: 'opt', mstar: base, m: 0, n: 0 };
  if (live.length === 0) return { status: 'opt', mstar: base, m: 0, n: nf };
  const A = live.map(r => { const row = new Array(nf).fill(R0); for (const c of r.uc) row[idx[c]] = R1; return row; });
  const b = live.map(r => R(BigInt(r.res)));
  const c = new Array(nf).fill(R0);
  for (let k = 0; k < nC; k++) if (fixed[k] === null && isTwin[k]) c[idx[k]] = RM1;   // minimise twin mass
  const res = simplex(A, b, c, live.length, nf);
  if (res.status !== 'opt') return { status: res.status, m: live.length, n: nf };
  return { status: 'opt', mstar: base - rnum(res.value), m: live.length, n: nf };
}

// ============================================================================
console.log('SEC 1 — CONVENTION, BOUND TO THE CUSTODY ARTEFACT');
// ============================================================================
// The stretch/channel/finality convention must be the one attack-quadpoint-03
// used, or nothing below speaks to Z2. Cross-checked against that producer's
// EMBEDDED OUTPUT (cited, not recomputed there): Q = 9281 carries T = 127 and
// CC = 2357, and the K = 0 certificate list (CC < T) is exactly 8 anchors.
{
  const Qi9281 = ACT.indexOf(9281);
  const B = buildAnchor(Qi9281, 'true', 0);
  let cc = 0;
  for (let a = B.lo; a + 2 < B.hi; a++) {
    if (!isOpen30(a % 30)) continue;
    let ia = 0, ib = 0;
    for (let i = 0; i < B.nR; i++) { const p = ACT[i]; if (!ia && a % p === 0) ia = 1; if (!ib && (a + 2) % p === 0) ib = 1; if (ia && ib) break; }
    if (ia && ib) cc++;
  }
  assertEq('quadpoint-03 cited T at Q=9281', B.T, 127);
  assertEq('quadpoint-03 cited CC at Q=9281', cc, 2357);
  console.log(`  Q = 9281: C = ${B.C}, T = ${B.T}, CC = ${cc} — matches the cited figures`);
  const okList = [];
  for (let Qi = 0; Qi <= ACT.indexOf(101); Qi++) {
    const b = buildAnchor(Qi, 'true', 0);
    let c2 = 0;
    for (let a = b.lo; a + 2 < b.hi; a++) {
      if (!isOpen30(a % 30)) continue;
      let ia = 0, ib = 0;
      for (let i = 0; i < b.nR; i++) { const p = ACT[i]; if (!ia && a % p === 0) ia = 1; if (!ib && (a + 2) % p === 0) ib = 1; if (ia && ib) break; }
      if (ia && ib) c2++;
    }
    if (c2 <= b.T - 1) okList.push(b.Q);
  }
  assertEq('K=0 certificate list (CC < T)', okList.join(','), '7,11,13,19,23,31,37,43');
  console.log(`  CC < T anchors below 101: ${okList.join(', ')} — the cited 8-anchor list`);
  // finality: sig(a) empty <=> twin
  let bad = 0;
  const b43 = buildAnchor(ACT.indexOf(43), 'true', 0);
  for (const s of b43.posSig) if (s !== null && s.length === 0) bad++;
  assertEq('finality: empty signature only for twins', bad, 0);
  // Legendre in the stretch: C + sum_{d>1} mu(d)|A_d| = T.  This is why the
  // full-level LP pins T, and it forces Delta >= T in SEC 3 (lambda = mu is a
  // certificate with |lambda_d| <= 1, so any adversary must move the data by
  // at least T in L1).  Only d with |A_d| > 0 contribute, so the sum is finite.
  let legOK = 0, legN = 0;
  for (let Qi = 0; Qi < ACT.length && ACT[Qi] <= 200; Qi++) {
    const b = buildAnchor(Qi, 'true', 0), rw = divisorRows(b);
    let s = b.C; for (const [, e] of rw) s += (e.w % 2 ? -1 : 1) * e.rhs;
    legN++; if (s === b.T) legOK++;
  }
  assertEq('Legendre identity C + sum mu(d)|A_d| = T at every anchor Q <= 200', legOK, legN);
  console.log(`  Legendre identity holds at all ${legN} anchors Q <= 200 — the full-level certificate is exact and lambda = mu attains it`);
}

// ============================================================================
console.log('\nSEC 2 — MODEL A: THE EXACT-DATA ADVERSARY, AND THE LEVEL D* THAT KILLS IT');
// ============================================================================
// m*(D) = best level-D lower bound on T; M*(D) = best level-D upper bound.
// D* = least level at which the twin-free adversary dies (m* >= 1).
const ANCHORS = [];
for (let Qi = 0; Qi < ACT.length; Qi++) { const Q = ACT[Qi]; if (Q > 200) break; ANCHORS.push(Qi); }
const rowsA = [];
{
  console.log('    Q  width     C    T | m*(Q) m*(w) m*(Q^2) | M*(Q) M*(w) M*(Q^2) |      D*   D*/w  lnD*/lnQ');
  for (const Qi of ANCHORS) {
    const B = buildAnchor(Qi, 'true', 0);
    const rows = divisorRows(B);
    const ds = [...rows.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    const DQ = BigInt(B.Q), DW = BigInt(B.width), DQ2 = BigInt(B.Q) * BigInt(B.Q);
    const mQ = mStar(B, rows, DQ), mW = mStar(B, rows, DW), mQ2 = mStar(B, rows, DQ2);
    const MQ = MStar(B, rows, DQ), MW = MStar(B, rows, DW), MQ2 = MStar(B, rows, DQ2);
    // D* by bisection on the sorted divisor list (m* is monotone non-decreasing in D)
    let Dstar = null;
    if (ds.length && mStar(B, rows, ds[ds.length - 1]) >= 1) {
      let lo = 0, hi = ds.length - 1;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (mStar(B, rows, ds[mid]) >= 1) hi = mid; else lo = mid + 1; }
      Dstar = ds[lo];
    }
    const sD = Dstar === null ? null : Math.log(Number(Dstar)) / Math.log(B.Q);
    const INF = ds[ds.length - 1];
    assertEq(`full-level pin m* = T at Q=${B.Q}`, mStar(B, rows, INF), B.T);
    assertEq(`full-level pin M* = T at Q=${B.Q}`, MStar(B, rows, INF), B.T);
    rowsA.push({ Q: B.Q, C: B.C, T: B.T, width: B.width, Dstar, sD, mQ, mW, mQ2, MQ, MW, MQ2, nD: ds.length, nCls: B.cls.length });
    console.log(`  ${String(B.Q).padStart(4)} ${String(B.width).padStart(6)} ${String(B.C).padStart(5)} ${String(B.T).padStart(4)} | ` +
      `${String(mQ).padStart(5)} ${String(mW).padStart(5)} ${String(mQ2).padStart(7)} | ` +
      `${f2(MQ).padStart(6)} ${f2(MW).padStart(6)} ${f2(MQ2).padStart(7)} | ` +
      `${String(Dstar === null ? '-' : Dstar).padStart(7)} ${(Dstar === null ? '  -' : f2(Number(Dstar) / B.width)).padStart(6)} ${(sD === null ? '  -' : f3(sD)).padStart(8)}`);
  }
  const big = rowsA.filter(r => r.Q >= 53);
  const zeroAtQ = big.filter(r => r.mQ === 0).length;
  console.log(`  level D = Q (single primes only): m* = 0 at ${zeroAtQ} of ${big.length} anchors Q >= 53 — the adversary survives level 1`);
  const pinned = rowsA.filter(r => r.mQ2 === r.T && r.MQ2 === r.T).length;
  console.log(`  level D = Q^2: m* = M* = T (the data DETERMINES the twin count) at ${pinned} of ${rowsA.length} anchors`);
  const sv = rowsA.filter(r => r.sD !== null).map(r => r.sD);
  console.log(`  D* exponent ln D*/ln Q over ${sv.length} anchors: min ${f3(Math.min(...sv))}, mean ${f3(sv.reduce((a, b) => a + b, 0) / sv.length)}, max ${f3(Math.max(...sv))}`);
  const dw = rowsA.filter(r => r.Dstar !== null).map(r => Number(r.Dstar) / r.width);
  console.log(`  D*/width: mean ${f3(dw.reduce((a, b) => a + b, 0) / dw.length)} — the killing level sits INSIDE the interval length`);
  const up = big.map(r => r.MQ / r.T);
  console.log(`  M*(D = Q)/T over ${up.length} anchors Q >= 53: mean ${f3(up.reduce((a, b) => a + b, 0) / up.length)}, max ${f3(Math.max(...up))} ` +
    `— the best level-1 UPPER bound this grid permits, against Lichtman 2025's asymptotic 3.29956 (cited, quadpoint-prior-art.md)`);
}

// ============================================================================
console.log('\nSEC 3 — MODEL B: WHAT THE ADVERSARY COSTS ONCE THE DATA IS NOT EXACT');
// ============================================================================
// Delta = min total L1 distortion of the level-D divisor counts admitting a
// twin-free measure; theta = min per-modulus distortion. Both at FULL level
// (every d that divides some a(a+2)) — the strongest data a sieve of any level
// could hold on this stretch.
const rowsB = [];
{
  console.log('    Q     T  #rows | Delta(w) Delta(Q^2) Delta(all) /T | theta_min(all)  #moduli | reading');
  for (const Qi of ANCHORS) {
    const B = buildAnchor(Qi, 'true', 0);
    const rows = divisorRows(B);
    const ds = [...rows.keys()]; if (!ds.length) continue;
    let INF = 0n; for (const d of ds) if (d > INF) INF = d;
    const act = activeRows(rows, INF);
    if (act.length > 200) continue;                    // LP size cap
    const dW = deltaL1(B, rows, BigInt(B.width));
    const dQ2 = deltaL1(B, rows, BigInt(B.Q) * BigInt(B.Q));
    const dA = deltaL1(B, rows, INF);
    const th = thetaMin(B, rows, INF);
    const nMod = ds.length;
    rowsB.push({ Q: B.Q, C: B.C, T: B.T, nrows: act.length, dW: dW.value, dQ2: dQ2.value, delta: dA.value, theta: th.value, nMod });
    console.log(`  ${String(B.Q).padStart(4)} ${String(B.T).padStart(5)} ${String(act.length).padStart(6)} | ` +
      `${f2(dW.value).padStart(8)} ${f2(dQ2.value).padStart(10)} ${f2(dA.value).padStart(10)} ${f3(dA.value / B.T).padStart(6)} | ` +
      `${f4(th.value).padStart(14)} ${String(nMod).padStart(8)} | ` +
      `${th.value < 1 ? 'sub-unit per modulus' : 'needs >= 1 per modulus'}`);
  }
  const ok = rowsB.filter(r => r.theta !== null);
  console.log(`  Delta(all) = T at ${ok.filter(r => r.delta === r.T).length} of ${ok.length} anchors (Legendre forces Delta >= T; the LP attains it)`);
  console.log(`  theta_min < 1 at ${ok.filter(r => r.theta < 1).length} of ${ok.length}; max theta_min = ${f4(Math.max(...ok.map(r => r.theta)))}`);
  const late = ok.filter(r => r.Q >= 79);
  console.log(`  Q >= 79 subset (n = ${late.length}): mean theta_min ${f4(late.reduce((a, b) => a + b.theta, 0) / late.length)}, ` +
    `mean Delta(w)/T ${f3(late.reduce((a, b) => a + b.dW / b.T, 0) / late.length)}, mean Delta(Q^2)/T ${f3(late.reduce((a, b) => a + b.dQ2 / b.T, 0) / late.length)}`);
}

// ============================================================================
console.log('\nSEC 4 — THE SIEVE\'S OWN ERROR BUDGET ON THE SAME STRETCH');
// ============================================================================
// Door 1 re-instantiated in the stretch coordinate: the truncated Legendre main
// term against the worst-case remainder sum it carries. r_d = |A_d| - C*prod(2/p).
{
  const budg = [];
  console.log('    Q     T |     D | main term  sum|r_d|   #moduli | budget/Delta (= /T)');
  for (const Qi of ANCHORS) {
    const B = buildAnchor(Qi, 'true', 0);
    if (B.Q < 23 || B.Q > 150) continue;
    const rows = divisorRows(B);
    const prs = []; for (let i = 0; i < B.nR; i++) prs.push(ACT[i]);
    for (const [lab, D] of [['Q', BigInt(B.Q)], ['w', BigInt(B.width)], ['Q^2', BigInt(B.Q) * BigInt(B.Q)]]) {
      // enumerate EVERY squarefree d | P(y) with d <= D (empty A_d included)
      let main = 0, rsum = 0, cnt = 0;
      const dfs = (start, d, dens, mu) => {
        cnt++; main += mu * B.C * dens;
        const Ad = rows.has(d) ? rows.get(d).rhs : 0;
        rsum += Math.abs(Ad - B.C * dens);
        for (let i = start; i < prs.length; i++) {
          const nd = d * BigInt(prs[i]); if (nd > D) break;
          dfs(i + 1, nd, dens * 2 / prs[i], -mu);
        }
      };
      dfs(0, 1n, 1, 1);
      if (lab === 'Q^2' || lab === 'w') {
        budg.push({ Q: B.Q, lab, main, rsum, ratio: rsum / B.T });
        console.log(`  ${String(B.Q).padStart(4)} ${String(B.T).padStart(5)} | ${lab.padStart(5)} | ${f2(main).padStart(9)} ${f2(rsum).padStart(9)} ${String(cnt).padStart(9)} | ` +
          `${f1safe(rsum / B.T)}`);
      }
    }
  }
  {
    const q2 = budg.filter(r => r.lab === 'Q^2'), w = budg.filter(r => r.lab === 'w');
    console.log(`  budget/Delta at D = Q^2: ${f1safe(q2[0].ratio)} at Q = ${q2[0].Q} rising to ${f1safe(q2[q2.length - 1].ratio)} at Q = ${q2[q2.length - 1].Q} ` +
      `(min ${f1safe(Math.min(...q2.map(r => r.ratio)))}, max ${f1safe(Math.max(...q2.map(r => r.ratio)))})`);
    console.log(`  truncated Legendre main term is NEGATIVE at ${w.filter(r => r.main < 0).length} of ${w.length} anchors at D = width, ` +
      `${q2.filter(r => r.main < 0).length} of ${q2.length} at D = Q^2 — at level = interval length the signal has the wrong sign`);
  }
  console.log('  (main term = C * sum_{d<=D} mu(d) prod 2/p, the truncated Legendre signal;');
  console.log('   sum|r_d| = the worst-case remainder a level-D sieve must survive;');
  console.log('   budget/Delta = how many times the sieve\'s own error budget exceeds the');
  console.log('   distortion the adversary needs)');
}
function f1safe(x) { return (x >= 1e6 ? x.toExponential(2) : x.toFixed(1)); }

// ============================================================================
console.log('\nSEC 5 — MODEL C: THE LITERAL FORMULATION (ALL RESIDUE CLASSES MOD p, p <= y)');
// ============================================================================
{
  const modC = [];
  console.log('    Q    C    T | m*_classes | verdict');
  for (const Qi of ANCHORS) {
    const B = buildAnchor(Qi, 'true', 0);
    if (B.C > 120) continue;
    const r = modelC(B);
    modC.push({ Q: B.Q, T: B.T, mstar: r.mstar, status: r.status });
    console.log(`  ${String(B.Q).padStart(4)} ${String(B.C).padStart(4)} ${String(B.T).padStart(4)} | ${(r.mstar === undefined ? r.status : f2(r.mstar)).padStart(10)} | ` +
      `${r.mstar === B.T ? 'data determines T exactly' : (r.mstar === 0 ? 'ADVERSARY EXISTS' : 'partial: ' + f3(r.mstar / B.T) + ' of T')}`);
  }
  const okC = modC.filter(r => r.mstar !== undefined);
  console.log(`  m*_classes = T at ${okC.filter(r => r.mstar === r.T).length} of ${okC.length}; = 0 at ${okC.filter(r => r.mstar === 0).length}`);
  console.log('  (residue-class data mod every p <= y is STRICTLY MORE than a sieve reads;');
  console.log('   this row is an upper bound on sieve-accessible information, not a sieve)');
}

// ============================================================================
console.log('\nSEC 6 — THE RANDOM-CLASS CONTROL (two uniform residues per prime)');
// ============================================================================
{
  console.log('    Q     C  T_ctrl  #rows | Delta/T  theta_min |  m*(Q) m*(Q^2)  lnD*/lnQ');
  const ctl = [];
  for (const Qi of ANCHORS) {
    const B = buildAnchor(Qi, 'ctrl', 1000 + Qi);
    if (B.T === 0) continue;
    const rows = divisorRows(B);
    const ds = [...rows.keys()]; if (!ds.length) continue;
    let INF = 0n; for (const d of ds) if (d > INF) INF = d;
    const act = activeRows(rows, INF);
    if (act.length > 200 || B.Q < 23) continue;
    const dsS = ds.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    const d1 = deltaL1(B, rows, INF), th = thetaMin(B, rows, INF);
    const mQ = mStar(B, rows, BigInt(B.Q)), mQ2 = mStar(B, rows, BigInt(B.Q) * BigInt(B.Q));
    let Dstar = null;
    if (mStar(B, rows, dsS[dsS.length - 1]) >= 1) {
      let lo = 0, hi = dsS.length - 1;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (mStar(B, rows, dsS[mid]) >= 1) hi = mid; else lo = mid + 1; }
      Dstar = dsS[lo];
    }
    const sD = Dstar === null ? null : Math.log(Number(Dstar)) / Math.log(B.Q);
    ctl.push({ Q: B.Q, T: B.T, delta: d1.value, theta: th.value, sD });
    console.log(`  ${String(B.Q).padStart(4)} ${String(B.C).padStart(5)} ${String(B.T).padStart(6)} ${String(act.length).padStart(6)} | ` +
      `${(d1.value === null ? 'NA' : f3(d1.value / B.T)).padStart(7)}  ${(th.value === null ? 'NA' : f4(th.value)).padStart(9)} | ` +
      `${String(mQ).padStart(6)} ${String(mQ2).padStart(7)}  ${(sD === null ? '-' : f3(sD)).padStart(8)}`);
  }
  const okc = ctl.filter(r => r.theta !== null);
  console.log(`  control: theta_min < 1 at ${okc.filter(r => r.theta < 1).length} of ${okc.length}; mean theta_min ${f4(okc.reduce((a, b) => a + b.theta, 0) / okc.length)}; mean Delta/T ${f3(okc.reduce((a, b) => a + b.delta / b.T, 0) / okc.length)}`);
  // matched comparison on exactly the anchors both sides carry
  const qs = okc.map(r => r.Q).filter(q => rowsB.some(x => x.Q === q) && rowsA.some(x => x.Q === q && x.sD !== null));
  const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  const cT = mean(qs.map(q => okc.find(r => r.Q === q).theta)), tT = mean(qs.map(q => rowsB.find(r => r.Q === q).theta));
  const cS = mean(qs.filter(q => okc.find(r => r.Q === q).sD !== null).map(q => okc.find(r => r.Q === q).sD));
  const tS = mean(qs.map(q => rowsA.find(r => r.Q === q).sD));
  console.log(`  MATCHED on the ${qs.length} anchors both sides carry: theta_min true ${f4(tT)} vs control ${f4(cT)} (ratio ${f3(tT / cT)});` +
    ` ln D*/ln Q true ${f3(tS)} vs control ${f3(cS)} (ratio ${f3(tS / cS)})`);
  // paired sign test on theta_min (T differs between arms, so this is a
  // direction test only, not an effect size)
  {
    let lo = 0, hi = 0;
    for (const q of qs) { const a = rowsB.find(r => r.Q === q).theta, b = okc.find(r => r.Q === q).theta; if (a < b) lo++; else if (a > b) hi++; }
    const n = lo + hi, k = Math.min(lo, hi);
    let p = 0; for (let i = 0; i <= k; i++) { let c = 1; for (let j = 0; j < i; j++) c = c * (n - j) / (j + 1); p += c; }
    p = Math.min(1, 2 * p / Math.pow(2, n));
    console.log(`  paired sign test on theta_min: true lower at ${lo} of ${n} tied-free anchors, two-sided p = ${p < 1e-4 ? p.toExponential(2) : f4(p)}`);
  }
  console.log('  (agreement means the measurement is about SIEVES, not about twins — the');
  console.log('   random-class control this corpus requires before any twin-specific reading)');
}

console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-parity-adversary-01.js
//   invocation:  node research/attack-parity-adversary-01.js
//   code-sha256: 1a6c78aae28109df6443b0e60a3082a45880ae9aa82b87c18c104af3e61c73db
//   out-sha256:  8cfa8c1aff8f6f085e7e45db32c597768dfa8645d46a36ad5008e67ec545fc57
//   body-lines:  247
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-26
//   elapsed:     75.2 s
// ============================================================================
// SEC 1 — CONVENTION, BOUND TO THE CUSTODY ARTEFACT
//   Q = 9281: C = 3712, T = 127, CC = 2357 — matches the cited figures
//   CC < T anchors below 101: 7, 11, 13, 19, 23, 31, 37, 43 — the cited 8-anchor list
//   Legendre identity holds at all 43 anchors Q <= 200 — the full-level certificate is exact and lambda = mu attains it
//
// SEC 2 — MODEL A: THE EXACT-DATA ADVERSARY, AND THE LEVEL D* THAT KILLS IT
//     Q  width     C    T | m*(Q) m*(w) m*(Q^2) | M*(Q) M*(w) M*(Q^2) |      D*   D*/w  lnD*/lnQ
//      7     72     6    4 |     4     4       4 |   4.00   4.00    4.00 |       7   0.10    1.000
//     11     48     4    2 |     2     2       2 |   2.00   2.00    2.00 |       7   0.15    0.812
//     13    120    11    7 |     7     7       7 |   7.00   7.00    7.00 |      13   0.11    1.000
//     17     72     6    2 |     1     1       2 |   3.00   3.00    2.00 |      11   0.15    0.846
//     19    168    16    4 |     4     4       4 |   4.00   4.00    4.00 |      19   0.11    1.000
//     23    312    30    8 |     3     8       8 |  15.00   8.00    8.00 |      19   0.06    0.939
//     29    120    11    2 |     1     1       2 |   3.00   3.00    2.00 |      23   0.19    0.931
//     31    408    40   11 |     0    11      11 |  20.00  11.00   11.00 |      77   0.19    1.265
//     37    312    30    7 |     0     7       7 |  13.00   7.00    7.00 |      91   0.29    1.249
//     41    168    16    3 |     0     2       3 |   5.00   4.00    3.00 |      91   0.54    1.215
//     43    360    35   11 |     4    11      11 |  16.00  11.00   11.00 |      31   0.09    0.913
//     47    600    59   13 |     0    13      13 |  30.50  13.00   13.00 |     143   0.24    1.289
//     53    672    66   13 |     0    10      13 |  36.00  15.00   13.00 |     203   0.30    1.338
//     59    240    23    5 |     3     5       5 |   7.00   5.00    5.00 |      43   0.18    0.922
//     61    768    76   19 |     0    17      19 |  40.00  21.00   19.00 |     209   0.27    1.300
//     67    552    54   11 |     0    10      11 |  23.00  12.00   11.00 |     133   0.24    1.163
//     71    288    28    3 |     0     2       3 |   5.00   4.00    3.00 |      91   0.32    1.058
//     73    912    90   15 |     0    13      15 |  41.00  17.00   15.00 |     247   0.27    1.284
//     79    648    64   14 |     0    11      14 |  30.00  16.00   14.00 |     161   0.25    1.163
//     83   1032   102   14 |     0    11      14 |  49.00  17.00   14.00 |     451   0.44    1.383
//     89   1488   148   21 |     0    17      21 |  76.77  25.00   21.00 |     517   0.35    1.392
//     97    792    78   15 |     0    13      15 |  37.00  17.00   15.00 |     209   0.26    1.168
//    101    408    40    7 |     4     7       7 |  11.00   7.00    7.00 |      77   0.19    0.941
//    103    840    83   10 |     0     8      10 |  35.80  12.00   10.00 |     377   0.45    1.280
//    107    432    42    6 |     0     6       6 |  13.00   6.00    6.00 |     203   0.47    1.137
//    109    888    88   11 |     0     7      11 |  31.00  15.00   11.00 |     323   0.36    1.232
//    113   3360   335   42 |     0    40      41 | 189.17  45.00   43.00 |     899   0.27    1.439
//    127   1032   102   12 |     0    11      12 |  39.17  13.00   12.00 |     391   0.38    1.232
//    131   1608   160   27 |     0    18      27 |  80.40  34.00   27.00 |     611   0.38    1.316
//    137    552    54    6 |     0     4       6 |  14.50   8.00    6.00 |     287   0.52    1.150
//    139   2880   287   45 |     0    41      45 | 150.28  50.00   45.00 |     901   0.31    1.379
//    149    600    59   10 |     4    10      10 |  15.00  10.00   10.00 |     149   0.25    1.000
//    151   1848   184   20 |     0    13      20 |  82.87  27.00   20.00 |    1079   0.58    1.392
//    157   1920   191   17 |     0    12      17 |  85.00  24.00   17.00 |    1309   0.68    1.419
//    163   1320   131   21 |     0    20      21 |  50.00  22.00   21.00 |     427   0.32    1.189
//    167   2040   203   23 |     0    17      23 |  85.88  28.00   23.00 |    1189   0.58    1.384
//    173   2112   210   25 |     0    16      25 |  93.00  36.00   25.00 |     949   0.45    1.330
//    179    720    71   13 |     5    13      13 |  20.00  13.00   13.00 |     179   0.25    1.000
//    181   3720   371   49 |     0    37      49 | 182.00  62.00   49.00 |    1261   0.34    1.373
//    191    768    76    7 |     0     5       7 |  17.00   9.00    7.00 |     517   0.67    1.190
//    193   1560   155   20 |     0    16      20 |  59.83  23.00   20.00 |     629   0.40    1.224
//    197    792    78    8 |     0     6       8 |  17.00  10.00    8.00 |     377   0.48    1.123
//    199   4920   491   52 |     0    41      52 | 245.67  66.00   52.00 |    1781   0.36    1.414
//   level D = Q (single primes only): m* = 0 at 27 of 31 anchors Q >= 53 — the adversary survives level 1
//   level D = Q^2: m* = M* = T (the data DETERMINES the twin count) at 42 of 43 anchors
//   D* exponent ln D*/ln Q over 43 anchors: min 0.812, mean 1.181, max 1.439
//   D*/width: mean 0.321 — the killing level sits INSIDE the interval length
//   M*(D = Q)/T over 31 anchors Q >= 53: mean 2.876, max 5.000 — the best level-1 UPPER bound this grid permits, against Lichtman 2025's asymptotic 3.29956 (cited, quadpoint-prior-art.md)
//
// SEC 3 — MODEL B: WHAT THE ADVERSARY COSTS ONCE THE DATA IS NOT EXACT
//     Q     T  #rows | Delta(w) Delta(Q^2) Delta(all) /T | theta_min(all)  #moduli | reading
//      7     4      1 |     4.00       4.00       4.00  1.000 |         4.0000        1 | needs >= 1 per modulus
//     11     2      1 |     2.00       2.00       2.00  1.000 |         2.0000        1 | needs >= 1 per modulus
//     13     7      3 |     7.00       7.00       7.00  1.000 |         2.3333        3 | needs >= 1 per modulus
//     17     2      4 |     1.00       2.00       2.00  1.000 |         0.6667        5 | sub-unit per modulus
//     19     4      5 |     4.00       4.00       4.00  1.000 |         0.8000        5 | sub-unit per modulus
//     23     8      9 |     8.00       8.00       8.00  1.000 |         0.8889        9 | sub-unit per modulus
//     29     2      7 |     1.00       2.00       2.00  1.000 |         0.3333       10 | sub-unit per modulus
//     31    11     19 |    11.00      11.00      11.00  1.000 |         0.7857       25 | sub-unit per modulus
//     37     7     15 |     7.00       7.00       7.00  1.000 |         0.5833       20 | sub-unit per modulus
//     41     3     14 |     2.00       3.00       3.00  1.000 |         0.3000       32 | sub-unit per modulus
//     43    11     20 |    11.00      11.00      11.00  1.000 |         0.7857       28 | sub-unit per modulus
//     47    13     35 |    13.00      13.00      13.00  1.000 |         0.5217       59 | sub-unit per modulus
//     53    13     37 |    10.00      13.00      13.00  1.000 |         0.4643       48 | sub-unit per modulus
//     59     5     16 |     5.00       5.00       5.00  1.000 |         0.4545       39 | sub-unit per modulus
//     61    19     54 |    17.00      19.00      19.00  1.000 |         0.6129       85 | sub-unit per modulus
//     67    11     37 |    10.00      11.00      11.00  1.000 |         0.4400       65 | sub-unit per modulus
//     71     3     26 |     2.00       3.00       3.00  1.000 |         0.2143       48 | sub-unit per modulus
//     73    15     55 |    13.00      15.00      15.00  1.000 |         0.4167       94 | sub-unit per modulus
//     79    14     46 |    11.00      14.00      14.00  1.000 |         0.4828      117 | sub-unit per modulus
//     83    14     71 |    11.00      14.00      14.00  1.000 |         0.2642      128 | sub-unit per modulus
//     89    21     96 |    17.00      21.00      21.00  1.000 |         0.3333      192 | sub-unit per modulus
//     97    15     54 |    13.00      15.00      15.00  1.000 |         0.4167      160 | sub-unit per modulus
//    101     7     36 |     7.00       7.00       7.00  1.000 |         0.5000       64 | sub-unit per modulus
//    103    10     61 |     8.00      10.00      10.00  1.000 |         0.2632      168 | sub-unit per modulus
//    107     6     42 |     6.00       6.00       6.00  1.000 |         0.2857       77 | sub-unit per modulus
//    109    11     65 |     7.00      11.00      11.00  1.000 |         0.2683      178 | sub-unit per modulus
//    113    42    193 |    39.67      41.00      42.00  1.000 |         0.3484      417 | sub-unit per modulus
//    127    12     85 |    11.00      12.00      12.00  1.000 |         0.2927      192 | sub-unit per modulus
//    131    27    114 |    18.00      27.00      27.00  1.000 |         0.3176      267 | sub-unit per modulus
//    137     6     51 |     3.00       6.00       6.00  1.000 |         0.1875      122 | sub-unit per modulus
//    149    10     49 |     9.00      10.00      10.00  1.000 |         0.3571      144 | sub-unit per modulus
//    151    20    143 |    13.00      20.00      20.00  1.000 |         0.2030      332 | sub-unit per modulus
//    157    17    139 |     8.00      17.00      17.00  1.000 |         0.1700      373 | sub-unit per modulus
//    163    21    108 |    20.00      21.00      21.00  1.000 |         0.3684      321 | sub-unit per modulus
//    167    23    157 |    16.00      23.00      23.00  1.000 |         0.2072      405 | sub-unit per modulus
//    173    25    166 |    16.00      25.00      25.00  1.000 |         0.2451      347 | sub-unit per modulus
//    179    13     64 |    13.00      13.00      13.00  1.000 |         0.5000      167 | sub-unit per modulus
//    191     7     69 |     4.00       7.00       7.00  1.000 |         0.1707      136 | sub-unit per modulus
//    193    20    137 |    14.00      20.00      20.00  1.000 |         0.2667      289 | sub-unit per modulus
//    197     8     78 |     6.00       8.00       8.00  1.000 |         0.1905      232 | sub-unit per modulus
//   Delta(all) = T at 40 of 40 anchors (Legendre forces Delta >= T; the LP attains it)
//   theta_min < 1 at 37 of 40; max theta_min = 4.0000
//   Q >= 79 subset (n = 22): mean theta_min 0.3018, mean Delta(w)/T 0.775, mean Delta(Q^2)/T 0.999
//
// SEC 4 — THE SIEVE'S OWN ERROR BUDGET ON THE SAME STRETCH
//     Q     T |     D | main term  sum|r_d|   #moduli | budget/Delta (= /T)
//     23     8 |     w |     11.56     41.76        19 | 5.2
//     23     8 |   Q^2 |     12.51     42.71        22 | 5.3
//     29     2 |     w |      1.42     14.61        11 | 7.3
//     29     2 |   Q^2 |      4.53     19.27        29 | 9.6
//     31    11 |     w |     14.29     55.96        29 | 5.1
//     31    11 |   Q^2 |     16.49     58.61        37 | 5.3
//     37     7 |     w |      7.54     45.10        25 | 6.4
//     37     7 |   Q^2 |     12.05     51.25        48 | 7.3
//     41     3 |     w |      0.72     28.36        17 | 9.5
//     41     3 |   Q^2 |      6.35     40.67        60 | 13.6
//     43    11 |     w |      7.69     52.03        32 | 4.7
//     43    11 |   Q^2 |     13.84     62.74        73 | 5.7
//     47    13 |     w |     18.70     86.11        49 | 6.6
//     47    13 |   Q^2 |     23.64     98.32        86 | 7.6
//     53    13 |     w |     20.84     95.69        55 | 7.4
//     53    13 |   Q^2 |     25.59    110.64       106 | 8.5
//     59     5 |     w |     -0.44     32.01        26 | 6.4
//     59     5 |   Q^2 |      8.68     51.56       128 | 10.3
//     61    19 |     w |     23.85    118.75        67 | 6.3
//     61    19 |   Q^2 |     28.99    143.90       146 | 7.6
//     67    11 |     w |     11.18     89.53        55 | 8.1
//     67    11 |   Q^2 |     20.03    117.52       173 | 10.7
//     71     3 |     w |     -1.36     46.82        33 | 15.6
//     71     3 |   Q^2 |     10.32     79.95       198 | 26.7
//     73    15 |     w |     27.99    145.56        85 | 9.7
//     73    15 |   Q^2 |     33.65    183.51       220 | 12.2
//     79    14 |     w |     11.71    105.04        66 | 7.5
//     79    14 |   Q^2 |     23.22    154.35       255 | 11.0
//     83    14 |     w |     31.15    164.50        99 | 11.8
//     83    14 |   Q^2 |     36.78    215.43       286 | 15.4
//     89    21 |     w |     53.75    228.19       129 | 10.9
//     89    21 |   Q^2 |     51.96    289.58       326 | 13.8
//     97    15 |     w |     15.79    128.54        84 | 8.6
//     97    15 |   Q^2 |     26.20    197.15       376 | 13.1
//    101     7 |     w |     -2.45     66.30        50 | 9.5
//    101     7 |   Q^2 |     13.29    118.39       416 | 16.9
//    103    10 |     w |     16.13    136.49        92 | 13.6
//    103    10 |   Q^2 |     28.01    215.92       447 | 21.6
//    107     6 |     w |     -3.38     77.00        54 | 12.8
//    107     6 |   Q^2 |     14.13    133.70       488 | 22.3
//    109    11 |     w |     15.99    143.95        99 | 13.1
//    109    11 |   Q^2 |     29.87    231.56       525 | 21.1
//    113    42 |     w |    143.16    501.40       261 | 11.9
//    113    42 |   Q^2 |    112.88    611.59       572 | 14.6
//    127    12 |     w |     20.44    173.87       116 | 14.5
//    127    12 |   Q^2 |     31.32    284.69       671 | 23.7
//    131    27 |     w |     50.61    256.92       167 | 9.5
//    131    27 |   Q^2 |     49.01    384.02       724 | 14.2
//    137     6 |     w |     -3.49     94.74        71 | 15.8
//    137     6 |   Q^2 |     16.17    182.42       790 | 30.4
//    139    45 |     w |    114.70    446.85       259 | 9.9
//    139    45 |   Q^2 |     87.09    627.82       836 | 14.0
//    149    10 |     w |     -3.40    101.05        78 | 10.1
//    149    10 |   Q^2 |     16.92    207.70       934 | 20.8
//   budget/Delta at D = Q^2: 5.3 at Q = 23 rising to 20.8 at Q = 149 (min 5.3, max 30.4)
//   truncated Legendre main term is NEGATIVE at 6 of 27 anchors at D = width, 0 of 27 at D = Q^2 — at level = interval length the signal has the wrong sign
//   (main term = C * sum_{d<=D} mu(d) prod 2/p, the truncated Legendre signal;
//    sum|r_d| = the worst-case remainder a level-D sieve must survive;
//    budget/Delta = how many times the sieve's own error budget exceeds the
//    distortion the adversary needs)
//
// SEC 5 — MODEL C: THE LITERAL FORMULATION (ALL RESIDUE CLASSES MOD p, p <= y)
//     Q    C    T | m*_classes | verdict
//      7    6    4 |       4.00 | data determines T exactly
//     11    4    2 |       2.00 | data determines T exactly
//     13   11    7 |       7.00 | data determines T exactly
//     17    6    2 |       2.00 | data determines T exactly
//     19   16    4 |       4.00 | data determines T exactly
//     23   30    8 |       8.00 | data determines T exactly
//     29   11    2 |       2.00 | data determines T exactly
//     31   40   11 |      11.00 | data determines T exactly
//     37   30    7 |       7.00 | data determines T exactly
//     41   16    3 |       3.00 | data determines T exactly
//     43   35   11 |      11.00 | data determines T exactly
//     47   59   13 |      13.00 | data determines T exactly
//     53   66   13 |      13.00 | data determines T exactly
//     59   23    5 |       5.00 | data determines T exactly
//     61   76   19 |      19.00 | data determines T exactly
//     67   54   11 |      11.00 | data determines T exactly
//     71   28    3 |       3.00 | data determines T exactly
//     73   90   15 |      15.00 | data determines T exactly
//     79   64   14 |      14.00 | data determines T exactly
//     83  102   14 |      14.00 | data determines T exactly
//     97   78   15 |      15.00 | data determines T exactly
//    101   40    7 |       7.00 | data determines T exactly
//    103   83   10 |      10.00 | data determines T exactly
//    107   42    6 |       6.00 | data determines T exactly
//    109   88   11 |      11.00 | data determines T exactly
//    127  102   12 |      12.00 | data determines T exactly
//    137   54    6 |       6.00 | data determines T exactly
//    149   59   10 |      10.00 | data determines T exactly
//    179   71   13 |      13.00 | data determines T exactly
//    191   76    7 |       7.00 | data determines T exactly
//    197   78    8 |       8.00 | data determines T exactly
//   m*_classes = T at 31 of 31; = 0 at 0
//   (residue-class data mod every p <= y is STRICTLY MORE than a sieve reads;
//    this row is an upper bound on sieve-accessible information, not a sieve)
//
// SEC 6 — THE RANDOM-CLASS CONTROL (two uniform residues per prime)
//     Q     C  T_ctrl  #rows | Delta/T  theta_min |  m*(Q) m*(Q^2)  lnD*/lnQ
//     23    30     11     12 |   1.000     0.8462 |      3      11     1.000
//     29    11      5      8 |   1.000     2.0000 |      4       5     0.712
//     31    40     11     20 |   1.000     0.9167 |      3      11     1.000
//     37    30     10     13 |   1.000     1.0000 |      4      10     0.815
//     41    16      3     14 |   1.000     0.3333 |      0       3     1.170
//     43    35      6     26 |   1.000     0.3000 |      0       6     1.391
//     47    59     13     36 |   1.000     0.5000 |      0      13     1.359
//     53    66     14     42 |   1.000     0.5000 |      0      14     1.318
//     59    23      5     19 |   1.000     0.4545 |      0       5     1.065
//     61    76     17     43 |   1.000     0.5161 |      0      17     1.309
//     67    54     15     37 |   1.000     0.6818 |      0      15     1.073
//     71    28      9     22 |   1.000     0.9000 |      5       9     0.871
//     73    90     16     56 |   1.000     0.3404 |      0      16     1.347
//     79    64     17     56 |   1.000     0.7083 |      0      17     1.032
//     83   102     24     68 |   1.000     0.5227 |      0      24     1.258
//     89   148     27     97 |   1.000     0.4426 |      0      27     1.349
//     97    78     16     65 |   1.000     0.4103 |      0      16     1.246
//    101    40      6     38 |   1.000     0.3000 |      0       6     1.101
//    103    83     14     55 |   1.000     0.3684 |      0      14     1.230
//    107    42      8     37 |   1.000     0.3478 |      0       8     1.047
//    109    88     18     58 |   1.000     0.5625 |      0      18     1.019
//    127   102     16     77 |   1.000     0.4324 |      0      16     1.168
//    131   160     28    117 |   1.000     0.4179 |      0      28     1.242
//    137    54     10     63 |   1.000     0.4167 |      5      10     0.985
//    139   287     45    191 |   1.000     0.3729 |      0      45     1.381
//    149    59     10     53 |   1.000     0.4000 |      1      10     1.000
//    151   184     33    142 |   1.000     0.5424 |      0      33     1.228
//    157   191     37    164 |   1.000     0.4684 |      0      37     1.248
//    163   131     25    119 |   1.000     0.5102 |      0      25     1.138
//    167   203     31    174 |   1.000     0.3263 |      0      31     1.286
//    173   210     33    181 |   1.000     0.3626 |      0      33     1.270
//    179    71     10     66 |   1.000     0.3030 |      0      10     1.100
//    191    76     10     62 |   1.000     0.2564 |      0      10     1.087
//    193   155     26    140 |   1.000     0.3230 |      0      26     1.230
//    197    78     11     82 |   1.000     0.3333 |      0      11     1.018
//   control: theta_min < 1 at 33 of 35; mean theta_min 0.5262; mean Delta/T 1.000
//   MATCHED on the 34 anchors both sides carry: theta_min true 0.3851 vs control 0.5307 (ratio 0.726); ln D*/ln Q true 1.192 vs control 1.139 (ratio 1.047)
//   paired sign test on theta_min: true lower at 25 of 33 tied-free anchors, two-sided p = 0.0046
//   (agreement means the measurement is about SIEVES, not about twins — the
//    random-class control this corpus requires before any twin-specific reading)
//
// done in 75.2s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// 1. THE ATTACK'S OWN PREMISE IS REFUTED ON THESE GRIDS [MEASURED, exact
//    arithmetic, 43 anchors Q <= 200]: the twin-free measure matching the
//    exact level-D data does NOT exist at every level. It dies at
//    ln D*/ln Q = 1.181 on average (min 0.812, max 1.439) and at
//    D*/width = 0.321, so the killing level sits INSIDE the interval length,
//    and at D = Q^2 the data determines the twin count outright at 42 of 43
//    anchors. Congruence data to a level below the stretch's own width does
//    contain the occupancy fact. Whatever blocks TODO Z2 (b), it is not
//    information. The exponent RISES across the computed range and has no
//    model; nothing here extrapolates.
// 2. THE CERTIFICATE THAT KILLS THE ADVERSARY IS SUB-UNIT [MEASURED;
//    the L1 floor PROVEN by Legendre]: Delta(all) = T at 40 of 40 anchors,
//    with C + sum mu(d)|A_d| = T asserted at all 43 anchors, so lambda = mu
//    attains the floor and no adversary can move the level-infinity data by
//    less than T in L1. Per modulus the tolerance is theta_min < 1 at 37 of
//    40 anchors, mean 0.3018 over the 22 anchors Q >= 79, individual
//    readings down to 0.1700. Perturbing every divisor count by a third of
//    one integer destroys the certificate.
// 3. THE SIEVE'S OWN BUDGET IS FIVE TO THIRTY TIMES THAT [MEASURED, 27
//    anchors]: at D = Q^2 the worst-case remainder sum|r_d| against the
//    truncated Legendre main term runs 5.3 x Delta at Q = 23 to 20.8 x at
//    Q = 149, max 30.4, rising with Q; and at D = width the main term itself
//    is NEGATIVE at 6 of 27 anchors, so at level equal to the interval
//    length the classical signal points the wrong way. Door 1's budget,
//    instantiated in the stretch coordinate.
// 4. THE MEASUREMENT IS ABOUT SIEVES, NOT ABOUT TWINS, WITH ONE EXCEPTION
//    [MEASURED, random-class control, 34 matched anchors]: Delta/T = 1.000
//    on the control too, and ln D*/ln Q is 1.192 true against 1.139 control
//    (ratio 1.047). The one separation is theta_min, true 0.3851 against
//    control 0.5307, ratio 0.726, with the true arithmetic's certificate the
//    MORE fragile of the two at 25 of 33 tied-free anchors (paired sign
//    test, two-sided p = 0.0046). NOT PRE-REGISTERED, the two arms carry
//    different T, and no dispersion model exists: a measurement to chase,
//    not a finding.
// 5. THE UPPER-BOUND COLUMN IS NOT COMPARABLE TO THE LITERATURE'S CONSTANT
//    [MEASURED, and a warning]: M*(D = Q)/T has mean 2.876 and max 5.000
//    over the 31 anchors Q >= 53. Lichtman 2025's 3.29956 is a uniform
//    ASYMPTOTIC constant over all x; this is a per-stretch LP optimum on
//    exact single-prime data whose maximum already exceeds it by 1.5x. The
//    two numbers must never be quoted against each other.
// 6. THE UNIFORM STATEMENT IS TPC-STRENGTH [PROVEN]: m*(D(Q)) >= 1 for all
//    large Q implies T(Q) >= 1 for all large Q, which is the strong Zone
//    Postulate; it is strictly stronger than TPC since it demands a
//    certificate and not merely existence. The LP is a diagnostic and never
//    a sub-target. Fifth wrong-direction arrival in this corpus.
// ============================================================
// FIGURE PROVENANCE. The stretch/channel convention and the cross-check
// figures T = 127, CC = 2357 at Q = 9281 and the eight-anchor CC < T list
// are CITED from the embedded OUTPUT of research/attack-quadpoint-03.js
// (HELD, never red-teamed) and asserted here against an independent
// recomputation. The kappa = 2 sifting limit beta_2 and Lichtman's constant
// are cited in the staging note, not computed here. Every other figure is from this
// producer's own OUTPUT block, all of it exact integer or exact rational
// arithmetic. Staging note: research/history/staging/attack-parity-adversary.md
// ============================================================
