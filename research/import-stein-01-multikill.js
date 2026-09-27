// ============================================================================
// IMPORT-STEIN 01 — AGG's b1, b2, b3 FOR THE MULTI-KILL EVENTS OF A FOLD
// ============================================================================
// Foreign import row 4 of `research/IMPORT-MAP.md`: Stein's method for Poisson
// approximation, Arratia-Goldstein-Gordon. The pre-registration, including the
// verbatim b1/b2/b3 definitions read at source and the kill criterion, is
// `research/history/staging/import-stein-prereg.md`, on disk before this file
// was ever executed.
//
// THE OBJECT. Fix a window [A, A+Y) and a fold p. Conventions are angle 4's and
// are reused verbatim from `research/attack-foldL-06-scaling.js`: positions
// n = 5 (mod 6), key(n) = min{q prime >= 5 : q | n(n+2)} with key 0 for the
// survivors of every fold <= 1499, the level-p object is {n : key(n) = 0 or
// key(n) >= p}, fold p deletes the n with key(n) = p, a kill run is a maximal
// block of slots adjacent at the current level and all killed at p,
// X_p = kills - runs is the number of adjacent kill pairs, mbar = Y/N, and
// theta_p = 2p - 2*eta with eta = +1 for p = 1 (mod 6), -1 for p = 5 (mod 6).
//
// THE AGG SETUP, and the randomisation it is priced under. The index set I is
// the set of QUALIFYING gaps of the level-p word: g = 0 or +-2 (mod p). A gap
// that does not qualify has p_alpha = 0 and is excluded, which is AGG's own
// requirement (Statistical Science 5 (1990) 405: "let X_alpha be a Bernoulli
// random variable with p_alpha = P(X_alpha = 1) > 0"). X_alpha = 1 iff both
// endpoints of gap alpha die at fold p, so W = sum X_alpha = X_p exactly.
//
// The randomisation is the corpus's own and is not invented here: by the Merge
// Rate Identity (`attack-foldL-04-amortized.md` §2, PROVEN there; restated in
// `import-thinning.md` §2.1) the two endpoints of a gap die together in exactly
// omega of the p copies of the fold, omega = 2/1/0 by residue. So the offset u
// in Z/p is uniform, a slot n dies at offset u iff n + u = 0 or -2 (mod p), and
// u = 0 is the arithmetic truth. With L the gap's left endpoint:
//
//    g =  0 (mod p)  ->  S_alpha = {-L, -L-2},  omega = 2
//    g =  2 (mod p)  ->  S_alpha = {-L-2},      omega = 1
//    g = -2 (mod p)  ->  S_alpha = {-L},        omega = 1
//
// and p_alpha = omega/p. W(u) = #{alpha : u in S_alpha}, so W(0) = X_p. That
// identity is the strongest gate in the file and is asserted at every fold.
//
// THREE NEIGHBOURHOODS, because the choice is where all of b3 lives:
//    N1  B_alpha = {alpha}
//    N2  B_alpha = {alpha-1, alpha, alpha+1} cap I, the adjacent gaps -- the
//        choice the import map pre-registered, from the Fold Moment Identity's
//        pair structure (`import-thinning.md` §2.3: Psi is the adjacent-pair
//        moment and Delta is second order)
//    N3  B_alpha = I, so sigma(X_beta : beta not in B_alpha) is the trivial
//        sigma-algebra, b3 = 0 EXACTLY, b1 = lambda^2, b2 = E[W(W-1)]
//
// b3 UNDER N1 AND N2, COMPUTED EXACTLY (with one stated approximation). Every
// X_alpha is a function of the single variable u, so the conditioning
// sigma-algebra is the partition of Z/p by the reduced firing set
// T(u) \ B_alpha, where T(u) = {beta : u in S_beta}. Two facts make it cheap:
//   (a) any u0 whose firing set lies inside B_alpha has cell
//       C = {u : T(u) subset B_alpha}, which contains every u with W(u) = 0, so
//       |C| = Z + #{u in the S-sets of B_alpha : W(u) = #(B_alpha firing at u)};
//   (b) any u0 with some beta outside B_alpha firing has its cell contained in
//       S_beta, hence of size at most 2, and is counted as a singleton. That is
//       the file's ONE approximation, and it is bounded rather than hoped: a
//       true cell of size 2 changes that alpha's contribution by at most
//       2*p_alpha, so the whole error is at most 2*sum_alpha omega_alpha*p_alpha/p
//       = 2*b1(N1), which is printed beside b3 at every window.
// Everything else is exact:
//   b3 = (1/p) sum_alpha [ |inC - p_a*|C||  +  (omega-inC)*(1-p_a)
//                          +  p_a*(p - |C| - (omega-inC)) ].
//
// THE ENGINE. The streaming decreasing-key stack of `attack-foldL-06-scaling.js`
// §1, reused: one left-to-right pass computes every run at every fold at once,
// the stack carries across chunk boundaries so chunking is exact, and each pop
// contributes one genuine gap to a contiguous BAND of levels. What is new is
// that this file needs each gap's left endpoint and its residues, so every gap
// is dispatched to the levels of its band at which it qualifies. The dispatch
// is cheap because a gap can qualify at level p only if p divides one of
// g, g-2, g+2, so a precomputed divisor table replaces any scan over the band.
//
// TWO PASSES. Pass 1 builds W(u) for every fold; pass 2 needs W(u) complete, so
// b1/b2/b3 are accumulated in a second identical traversal.
//
// COMPUTE LEVER. Only folds p >= P0 carry the AGG work. P0 = 100 is the fit
// range of `attack-foldL-06-scaling.md` §3.2 and the whole extinction regime.
// Stage A drops the floor to 5 at Y = 2e9 once, so that W(0) = X_p is tested
// where X_p is in the tens of millions.
//
// RUN:  node --max-old-space-size=6000 research/import-stein-01-multikill.js
//       STAGE=predict ... stops before the four-window measurement
//       SKIPCAL=1  ...... skips the deep stage-A window (fast smoke test)
// ============================================================================

'use strict';

const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);

const QMAX = 1500;
const CHUNK = Number(process.env.CHUNK || 1e8);
const BIGY = Number(process.env.BIGY || 2e10);
const VMAX = 8192;
const STAGE = process.env.STAGE || 'all';
let P0 = 100;                                    // mutable AGG floor

// ---- primes, folds, conventions (angle 4's, verbatim) --------------------
const comp = new Uint8Array(QMAX + 1), primes = [];
for (let i = 2; i <= QMAX; i++) { if (!comp[i]) { primes.push(i); for (let j = i * i; j <= QMAX; j += i) comp[j] = 1; } }
const folds = primes.filter(q => q >= 5);
const F = folds.length;
const fidx = new Int32Array(QMAX + 2).fill(-1);
folds.forEach((q, j) => { fidx[q] = j; });
const INFK = QMAX + 1;
const theta = folds.map(p => 2 * p - 2 * ((p % 6 === 1) ? 1 : -1));
function modInv(a, m) { let g = m, x = 0, x1 = 1, a1 = a; while (a1 !== 0) { const qq = (g / a1) | 0; [g, a1] = [a1, g - qq * a1]; [x, x1] = [x1, x - qq * x1]; } return ((x % m) + m) % m; }
const inv6 = new Int32Array(QMAX + 1);
for (const q of folds) inv6[q] = modInv(6 % q, q);

const cbase = new Int32Array(F + 1);
for (let j = 0; j < F; j++) cbase[j + 1] = cbase[j] + folds[j];
const CTOT = cbase[F];

// ---- divisor table: fold primes dividing v, for v <= VMAX+2 --------------
const dcnt = new Int32Array(VMAX + 4);
for (const p of folds) for (let v = p; v <= VMAX + 2; v += p) dcnt[v]++;
const doff = new Int32Array(VMAX + 5);
for (let v = 0; v <= VMAX + 3; v++) doff[v + 1] = doff[v] + dcnt[v];
const dpri = new Int32Array(doff[VMAX + 4]);
{
  const fill = new Int32Array(VMAX + 4);
  for (const p of folds) for (let v = p; v <= VMAX + 2; v += p) dpri[doff[v] + fill[v]++] = p;
}
const hiP3 = new Int32Array(VMAX + 1);
for (let g = 6; g <= VMAX; g++) {
  let m = 0;
  for (const v of [g, g - 2, g + 2]) { if (v < 5 || v > VMAX + 2) continue; for (let o = doff[v]; o < doff[v + 1]; o++) if (dpri[o] > m) m = dpri[o]; }
  hiP3[g] = m;
}

console.log('folds: ' + F + ' primes from ' + folds[0] + ' to ' + folds[F - 1] +
  ';  chunk = ' + CHUNK.toExponential(0) + ' slots;  W(u) table = ' + CTOT + ' cells');

// ==========================================================================
// THE ENGINE
// ==========================================================================
function traverse(A, Y, pass, st) {
  if (A % 6 !== 0) throw new Error('anchor A must be a multiple of 6, got ' + A);
  const M = Math.floor((Y - 5) / 6) + 1;
  const stK = new Int32Array(F + 4), stPos = new Float64Array(F + 4), stRun = new Float64Array(F + 4);
  let sp = 0;
  const csize = Math.min(M, CHUNK);
  const key = new Uint16Array(csize);
  const P0P = P0;
  const cnt = st.cnt, hL = st.hL, hR = st.hR, hOm = st.hOm, hU0 = st.hU0, hU1 = st.hU1, hN = st.hN, rS = st.rS;
  const US = new Int32Array(8), UC = new Int32Array(8);

  function finalise(j, hasLeft, hasRight, rightLeft) {
    const p = folds[j], b = cbase[j], Z = st.Z[j];
    const om = hOm[2 * j + 1], u0 = hU0[2 * j + 1], u1 = hU1[2 * j + 1];
    const pa = om / p;
    st.b1N1[j] += pa * pa;
    const adjL = hasLeft && hR[2 * j] === hL[2 * j + 1];
    const adjR = hasRight && rightLeft === hR[2 * j + 1];
    const omL = adjL ? hOm[2 * j] : 0;
    // each adjacent pair is visited once, from the right member, and its two
    // ordered contributions are added together: this is exactly
    // sum_alpha p_alpha*(p_{alpha-1} + p_alpha + p_{alpha+1}).
    st.b1N2[j] += pa * pa + 2 * pa * (omL / p);
    if (adjL) {
      const l0 = hU0[2 * j], l1 = hU1[2 * j], lom = hOm[2 * j];
      let inter = 0;
      if (u0 === l0 || (lom === 2 && u0 === l1)) inter++;
      if (om === 2 && (u1 === l0 || (lom === 2 && u1 === l1))) inter++;
      st.b2N2[j] += 2 * inter / p;
      st.adjQ[j]++;
    }
    for (let mode = 0; mode < 2; mode++) {
      let nu = 0;
      US[nu] = u0; UC[nu] = 1; nu++;
      if (om === 2) { US[nu] = u1; UC[nu] = 1; nu++; }
      if (mode === 1 && adjL) {
        const lom = hOm[2 * j], l0 = hU0[2 * j], l1 = hU1[2 * j];
        for (let t = 0; t < lom; t++) {
          const uu = t === 0 ? l0 : l1;
          let f = -1; for (let z = 0; z < nu; z++) if (US[z] === uu) { f = z; break; }
          if (f >= 0) UC[f]++; else { US[nu] = uu; UC[nu] = 1; nu++; }
        }
      }
      if (mode === 1 && adjR) {
        const rom = rS[0], r0 = rS[1], r1 = rS[2];
        for (let t = 0; t < rom; t++) {
          const uu = t === 0 ? r0 : r1;
          let f = -1; for (let z = 0; z < nu; z++) if (US[z] === uu) { f = z; break; }
          if (f >= 0) UC[f]++; else { US[nu] = uu; UC[nu] = 1; nu++; }
        }
      }
      let big = Z, inC = 0;
      for (let z = 0; z < nu; z++) if (cnt[b + US[z]] === UC[z]) big++;
      const kmax = (om === 2) ? 2 : 1;
      for (let k = 0; k < kmax; k++) {
        const uu = k === 0 ? u0 : u1;
        for (let w = 0; w < nu; w++) if (US[w] === uu) { if (cnt[b + uu] === UC[w]) inC++; break; }
      }
      const singles = om - inC;
      if (mode === 1) st.sing[j] += singles;
      const contrib = Math.abs(inC - pa * big) + singles * (1 - pa) + pa * (p - big - singles);
      if (mode === 0) st.b3N1[j] += contrib / p; else st.b3N2[j] += contrib / p;
    }
  }

  function handle(j, om, u0, u1, gl, gr) {
    if (pass === 1) {
      const b = cbase[j];
      cnt[b + u0]++; if (om === 2) cnt[b + u1]++;
      st.sumOm[j] += om; st.sumOm2[j] += om * om; st.Q[j]++;
      return;
    }
    if (hN[j] >= 1) {
      finalise(j, hN[j] >= 2, true, gl);
      hL[2 * j] = hL[2 * j + 1]; hR[2 * j] = hR[2 * j + 1]; hOm[2 * j] = hOm[2 * j + 1];
      hU0[2 * j] = hU0[2 * j + 1]; hU1[2 * j] = hU1[2 * j + 1];
    }
    hL[2 * j + 1] = gl; hR[2 * j + 1] = gr; hOm[2 * j + 1] = om; hU0[2 * j + 1] = u0; hU1[2 * j + 1] = u1;
    if (hN[j] < 2) hN[j]++;
  }

  function emit(gl, gr, lo, hi) {
    const g = gr - gl;
    if (g > VMAX) throw new Error('gap ' + g + ' exceeds VMAX ' + VMAX);
    if (hiP3[g] < P0P) return;
    for (let t = 0; t < 3; t++) {
      const v = t === 0 ? g : (t === 1 ? g - 2 : g + 2);
      if (v < 5) continue;
      for (let o = doff[v]; o < doff[v + 1]; o++) {
        const p = dpri[o];
        if (p < P0P) continue;
        const j = fidx[p];
        if (j < lo || j > hi) continue;
        const Lm = gl % p;
        const a = (p - Lm) % p;
        const c = (a + p - 2) % p;
        if (t === 0) { rS[0] = 2; rS[1] = a; rS[2] = c; handle(j, 2, a, c, gl, gr); }
        else if (t === 1) { rS[0] = 1; rS[1] = c; rS[2] = -1; handle(j, 1, c, -1, gl, gr); }
        else { rS[0] = 1; rS[1] = a; rS[2] = -1; handle(j, 1, a, -1, gl, gr); }
      }
    }
  }

  for (let i0 = 0; i0 < M; i0 += csize) {
    const i1 = Math.min(M, i0 + csize), len = i1 - i0;
    key.fill(0, 0, len);
    for (let fi = F - 1; fi >= 0; fi--) {
      const q = folds[fi], iv = inv6[q], Aq = A % q, off = i0 % q;
      for (let tt = 0; tt < 2; tt++) {
        const t = tt === 0 ? 0 : q - 2;
        let s = (((t - 5 - Aq) % q) + q) % q;
        s = (s * iv) % q;
        let stt = ((s - off) % q + q) % q;
        for (let i = stt; i < len; i += q) key[i] = q;
      }
    }
    for (let i = 0; i < len; i++) {
      const kk = key[i];
      const k = kk === 0 ? INFK : kk;
      const n = A + 6 * (i0 + i) + 5;
      let bidx = 0;
      while (sp > 0 && stK[sp - 1] < k) {
        sp--;
        const j = fidx[stK[sp]], rl = stRun[sp];
        if (pass === 1) { st.runs[j]++; if (rl > st.maxL[j]) st.maxL[j] = rl; }
        emit(stPos[sp], n, bidx, j);
        if (pass === 1) { const g = n - stPos[sp]; if (bidx < F && g > st.candG[bidx]) st.candG[bidx] = g; }
        bidx = j + 1;
      }
      if (sp > 0) {
        const kj = (k === INFK) ? F - 1 : fidx[k];
        if (kj >= bidx) emit(stPos[sp - 1], n, bidx, kj);
        if (pass === 1) { const g = n - stPos[sp - 1]; if (bidx < F && g > st.candG[bidx]) st.candG[bidx] = g; }
      }
      if (sp > 0 && stK[sp - 1] === k) { stRun[sp - 1]++; stPos[sp - 1] = n; }
      else { stK[sp] = k; stPos[sp] = n; stRun[sp] = 1; sp++; }
      if (pass === 1 && kk !== 0) st.kills[fidx[kk]]++;
    }
  }
  while (sp > 0) {
    sp--;
    if (stK[sp] === INFK) continue;
    if (pass === 1) { const j = fidx[stK[sp]], rl = stRun[sp]; st.runs[j]++; if (rl > st.maxL[j]) st.maxL[j] = rl; }
  }
  if (pass === 2) { for (let j = 0; j < F; j++) if (hN[j] >= 1) { rS[0] = 0; finalise(j, hN[j] >= 2, false, -1); } }
  return M;
}

function runWindow(A, Y, label, p0) {
  const save = P0; P0 = p0;
  const t0 = Date.now();
  const st = {
    cnt: new Float64Array(CTOT), sumOm: new Float64Array(F), sumOm2: new Float64Array(F),
    Q: new Float64Array(F), kills: new Float64Array(F), runs: new Float64Array(F),
    maxL: new Int32Array(F), candG: new Float64Array(F), Z: new Float64Array(F),
    b1N1: new Float64Array(F), b3N1: new Float64Array(F),
    b1N2: new Float64Array(F), b2N2: new Float64Array(F), b3N2: new Float64Array(F),
    adjQ: new Float64Array(F), sing: new Float64Array(F),
    hL: new Float64Array(2 * F), hR: new Float64Array(2 * F), hOm: new Int32Array(2 * F),
    hU0: new Int32Array(2 * F), hU1: new Int32Array(2 * F), hN: new Int32Array(F),
    rS: new Int32Array(4),
  };
  const M = traverse(A, Y, 1, st);
  for (let j = 0; j < F; j++) { let z = 0; const b = cbase[j], p = folds[j]; for (let u = 0; u < p; u++) if (st.cnt[b + u] === 0) z++; st.Z[j] = z; }
  traverse(A, Y, 2, st);
  const G2b = new Float64Array(F);
  { let m = 0; for (let j = 0; j < F; j++) { if (st.candG[j] > m) m = st.candG[j]; G2b[j] = m; } }
  const rows = [];
  let surv = M;
  for (let j = 0; j < F; j++) {
    const p = folds[j], b = cbase[j], Nb = surv; surv -= st.kills[j];
    let s2 = 0; for (let u = 0; u < p; u++) { const c = st.cnt[b + u]; s2 += c * (c - 1); }
    const lam = st.sumOm[j] / p;
    rows.push({
      p, j, theta: theta[j], kills: st.kills[j], runs: st.runs[j],
      X: st.kills[j] - st.runs[j], L: Math.max(1, st.maxL[j]),
      Nbefore: Nb, Nafter: surv, mbarB: Y / Nb, thr: theta[j] / (Y / Nb), G2: G2b[j],
      W0: st.cnt[b], lam, Q: st.Q[j], Z: st.Z[j],
      b1N1: st.b1N1[j], b2N1: 0, b3N1: st.b3N1[j],
      b1N2: st.b1N2[j], b2N2: st.b2N2[j], b3N2: st.b3N2[j],
      b1N3: lam * lam, b2N3: s2 / p, b3N3: 0,
      adjQ: st.adjQ[j], sing: st.sing[j],
    });
  }
  const secs = (Date.now() - t0) / 1000;
  P0 = save;
  console.log('[' + el() + 's] ' + label + ': Y = ' + Y.toExponential(1) + ', slots = ' + M +
    ', AGG floor p >= ' + p0 + ', ' + secs.toFixed(1) + ' s (two passes)');
  return { A, Y, M, rows, secs, label, p0 };
}

function summarise(w) {
  let lastLive = null, n2 = 0, s1 = 0, n2d = 0, s1d = 0, sx = 0, lastQual = null;
  for (const x of w.rows) {
    if (x.L >= 2) { lastLive = x.p; n2++; s1 += x.L - 1; if (x.p >= 100) { n2d++; s1d += x.L - 1; } }
    if (x.theta <= x.G2) lastQual = x.p;
    sx += x.X;
  }
  return { lastLive, lastQual, n2, s1, n2d, s1d, sx, maxL: Math.max(...w.rows.map(x => x.L)) };
}

function fit2(sel, field) {
  let a = 0, c = 1.5;
  for (let it = 0; it < 400; it++) {
    let g1 = 0, g2 = 0, h11 = 0, h12 = 0, h22 = 0;
    for (const r of sel) {
      const y = r[field], e = r.kills * Math.exp(a - c * r.thr);
      g1 += y - e; g2 += -y * r.thr + e * r.thr; h11 += -e; h12 += e * r.thr; h22 += -e * r.thr * r.thr;
    }
    const det = h11 * h22 - h12 * h12;
    const da = (h22 * g1 - h12 * g2) / det, dc = (-h12 * g1 + h11 * g2) / det;
    a -= da; c -= dc; if (Math.abs(da) + Math.abs(dc) < 1e-14) break;
  }
  let h11 = 0, h12 = 0, h22 = 0;
  for (const r of sel) { const e = r.kills * Math.exp(a - c * r.thr); h11 += e; h12 += -e * r.thr; h22 += e * r.thr * r.thr; }
  const det = h11 * h22 - h12 * h12;
  return { A: Math.exp(a), c, seC: Math.sqrt(h11 / det) };
}
const f3 = (x, n) => Number(x).toFixed(n === undefined ? 4 : n);
const fe = (x, n) => Number(x).toExponential(n === undefined ? 3 : n);

// ==========================================================================
// STAGE A — CALIBRATION AND THE W(0) = X_p IDENTITY, Y = 2e9, ALL FOLDS
// ==========================================================================
console.log('');
console.log('############ STAGE A — CALIBRATION, Y = 2e9, AGG floor dropped to p >= 5 ############');
console.log('Two gates. (i) the record\'s embedded figures, digit for digit, from an engine');
console.log('that shares no data structure with the one that produced them. (ii) the AGG');
console.log('model\'s own identity W(0) = X_p at EVERY fold, which is what licenses the');
console.log('uniform-offset randomisation as a description of the true arithmetic.');
const CALY = Number(process.env.CALY || 2e9);
const CAL = runWindow(0, CALY, 'calibration', process.env.SKIPCAL ? 100 : 5);
const calRow = p => CAL.rows[fidx[p]];
const S = summarise(CAL);

console.log('');
console.log('--- A1. against the embedded tail of attack-foldL-04-localized.js / -06-scaling.js ---');
const EXPECT = CALY !== 2e9 ? [] : [
  ['slots (n = 5 mod 6)', CAL.M, 333333333],
  ['fold 5   N after', calRow(5).Nafter, 200000000],
  ['fold 7   kills', calRow(7).kills, 57142857],
  ['fold 7   runs', calRow(7).runs, 38095238],
  ['fold 7   X', calRow(7).X, 19047619],
  ['fold 23  kills', calRow(23).kills, 6789558],
  ['fold 23  X', calRow(23).X, 106418],
  ['fold 23  L', calRow(23).L, 3],
  ['fold 29  N after', calRow(29).Nafter, 66373676],
  ['fold 29  X', calRow(29).X, 75336],
  ['fold 31  G2 (= G2 after fold 29)', calRow(31).G2, 258],
  ['fold 421 N after', calRow(421).Nafter, 22433554],
  ['fold 421 kills', calRow(421).kills, 105790],
  ['fold 421 runs', calRow(421).runs, 105789],
  ['fold 421 X', calRow(421).X, 1],
  ['fold 421 theta', calRow(421).theta, 840],
  ['fold 1451 kills', calRow(1451).kills, 21565],
  ['last fold with L >= 2', S.lastLive, 421],
  ['last fold with theta <= G2', S.lastQual, 1021],
  ['folds with L >= 2', S.n2, 58],
  ['max L over all folds', S.maxL, 3],
  ['sum over folds of (L-1)', S.s1, 64],
  ['sum over folds of X', S.sx, 20317943],
];
let bad = 0;
for (const [name, got, want] of EXPECT) {
  const ok = got === want; if (!ok) bad++;
  console.log('  ' + (ok ? 'OK  ' : 'FAIL') + '  ' + name.padEnd(38) + ' got ' + String(got).padStart(11) + '   record ' + String(want).padStart(11));
}
console.log('  mbar at fold 421 (before) = ' + calRow(421).mbarB.toFixed(4) + '   record 89.1522 (after)');
console.log('  ' + (bad === 0 ? 'CALIBRATION CLEAN: ' + EXPECT.length + ' of ' + EXPECT.length + ' record figures reproduced.'
  : 'CALIBRATION BROKEN: ' + bad + ' figure(s) disagree. STOP.'));
if (bad !== 0) process.exit(1);

console.log('');
console.log('--- A2. the AGG identity W(0) = X_p, every fold with the AGG floor in force ---');
{
  let n = 0, mism = 0, worst = null;
  for (const r of CAL.rows) {
    if (r.p < CAL.p0) continue;
    n++;
    if (r.W0 !== r.X) { mism++; if (worst === null) worst = r; }
  }
  console.log('  folds tested: ' + n + '   mismatches: ' + mism + (worst ? ('   first at p = ' + worst.p + ': W(0) = ' + worst.W0 + ' vs X = ' + worst.X) : ''));
  for (const p of [5, 7, 11, 13, 17, 19, 23, 29, 101, 211, 421]) {
    const r = calRow(p); if (r.p < CAL.p0) continue;
    console.log('    p = ' + String(p).padStart(4) + '   W(0) = ' + String(r.W0).padStart(9) + '   X_p = ' + String(r.X).padStart(9) +
      '   qualifying gaps Q = ' + String(r.Q).padStart(10) + '   lambda = ' + fe(r.lam));
  }
  if (mism !== 0) { console.log('  IDENTITY BROKEN — the randomisation does not describe the arithmetic. STOP.'); process.exit(1); }
  console.log('  IDENTITY HOLDS at ' + n + ' of ' + n + ' folds.');
}

console.log('');
console.log('--- A3. the record\'s own fit reproduced (Poisson MLE, two parameters, folds p >= 100) ---');
{
  const sel = CAL.rows.filter(r => r.p >= 100);
  const f = fit2(sel, 'X');
  console.log('  fitted on measured X:  A = ' + fe(f.A, 4) + '   c = ' + f3(f.c) + ' +- ' + f3(f.seC) +
    '     record: A = 2.4312e-2, c = 1.0818 +- 0.0317');
}

if (STAGE === 'predict') { console.log(''); console.log('STAGE=predict: stopping before the four-window measurement.'); process.exit(0); }

// ==========================================================================
// STAGE B — THE FOUR VALIDATED WINDOWS
// ==========================================================================
console.log('');
console.log('############ STAGE B — b1, b2, b3 AT THE FOUR VALIDATED WINDOWS ############');
const WINS = [];
for (const Y of [2e7, 2e8, 2e9, BIGY]) WINS.push(runWindow(0, Y, 'Y = ' + Y.toExponential(0), 100));

function agg(w, field, lo) { let s = 0; for (const r of w.rows) if (r.p >= (lo || 100)) s += r[field]; return s; }

console.log('');
console.log('--- B1. the b-table, aggregated over the folds the law is fitted on (p >= 100) ---');
console.log('  N1 = {alpha}   N2 = adjacent gaps (the pre-registered choice)   N3 = all of I');
console.log('    Y        sum lambda  sum X     |  N1: b1        b3        |  N2: b1        b2        b3        |  N3: b1        b2        b3');
for (const w of WINS) {
  console.log('  ' + w.Y.toExponential(0).padStart(7) + '  ' + fe(agg(w, 'lam')).padStart(10) + '  ' + String(agg(w, 'X')).padStart(8) +
    '  |  ' + fe(agg(w, 'b1N1')).padStart(9) + ' ' + fe(agg(w, 'b3N1')).padStart(9) +
    '  |  ' + fe(agg(w, 'b1N2')).padStart(9) + ' ' + fe(agg(w, 'b2N2')).padStart(9) + ' ' + fe(agg(w, 'b3N2')).padStart(9) +
    '  |  ' + fe(agg(w, 'b1N3')).padStart(9) + ' ' + fe(agg(w, 'b2N3')).padStart(9) + ' ' + fe(agg(w, 'b3N3')).padStart(9));
}

console.log('');
console.log('--- B2. per fold at Y = 2e9, the folds that decide extinction ---');
console.log('     p  theta  theta/mbar    Q      lambda      X   |  N2: b1        b2        b3        b3/(b1+b2) |  N3: b1        b2       TV bound');
{
  const w = WINS[2];
  for (const p of [101, 127, 151, 199, 211, 251, 307, 331, 401, 421, 457, 499, 601, 701]) {
    const r = w.rows[fidx[p]]; if (!r) continue;
    const t1 = (r.b1N2 + r.b2N2) > 0 ? r.b3N2 / (r.b1N2 + r.b2N2) : NaN;
    const lam = r.lam;
    const tv = lam > 0 ? 2 * ((r.b1N3 + r.b2N3) * (1 - Math.exp(-lam)) / lam) : 0;
    console.log('  ' + String(p).padStart(4) + ' ' + String(r.theta).padStart(6) + '  ' + f3(r.thr, 3).padStart(9) + ' ' +
      String(r.Q).padStart(8) + ' ' + fe(lam).padStart(10) + ' ' + String(r.X).padStart(7) + '   |  ' +
      fe(r.b1N2).padStart(9) + ' ' + fe(r.b2N2).padStart(9) + ' ' + fe(r.b3N2).padStart(9) + ' ' + fe(t1).padStart(10) + '  |  ' +
      fe(r.b1N3).padStart(9) + ' ' + fe(r.b2N3).padStart(9) + ' ' + fe(tv).padStart(9));
  }
}

console.log('');
console.log('--- B3. THE KILL CRITERION, as pre-registered in §5 of the prereg ---');
console.log('  SMALL: b3 <= 0.1*(b1+b2) under N2.   NOT SMALL: b3 > (b1+b2) under N2.');
for (const w of WINS) {
  let nf = 0, small = 0, notsmall = 0, mid = 0, worst = 0;
  for (const r of w.rows) {
    if (r.p < 100) continue; if (r.Q === 0) continue;
    nf++;
    const d = r.b1N2 + r.b2N2, ratio = d > 0 ? r.b3N2 / d : Infinity;
    if (ratio > worst) worst = ratio;
    if (ratio <= 0.1) small++; else if (ratio > 1) notsmall++; else mid++;
  }
  console.log('  Y = ' + w.Y.toExponential(0).padStart(7) + '   folds with I nonempty and p >= 100: ' + String(nf).padStart(4) +
    '   SMALL ' + String(small).padStart(4) + '   between ' + String(mid).padStart(4) + '   NOT SMALL ' + String(notsmall).padStart(4) +
    '   max b3/(b1+b2) = ' + fe(worst));
}

console.log('');
console.log('--- B4. P1, the parameter-free prediction: lambda_p against measured X_p ---');
console.log('    Y      sum lambda    sum X    ratio   |  folds with lambda >= 1:  within 3 sqrt(lambda)  /  total');
for (const w of WINS) {
  const sl = agg(w, 'lam'), sx = agg(w, 'X');
  let tot = 0, ok = 0;
  for (const r of w.rows) { if (r.p < 100 || r.lam < 1) continue; tot++; if (Math.abs(r.X - r.lam) <= 3 * Math.sqrt(r.lam)) ok++; }
  console.log('  ' + w.Y.toExponential(0).padStart(7) + '  ' + fe(sl).padStart(11) + ' ' + String(sx).padStart(9) + '  ' + f3(sx / sl).padStart(7) +
    '   |   ' + String(ok).padStart(4) + ' / ' + String(tot).padStart(4) + (tot ? '   = ' + f3(100 * ok / tot, 1) + '%' : ''));
}

console.log('');
console.log('--- B5. P2, the two constants, from the derived lambda curve, record estimator ---');
console.log('     Y      fitted on lambda: A          c        |  fitted on measured X: A          c        +- se');
for (const w of WINS) {
  const sel = w.rows.filter(r => r.p >= 100 && r.kills > 0);
  const fl = fit2(sel, 'lam'), fx = fit2(sel, 'X');
  console.log('  ' + w.Y.toExponential(0).padStart(7) + '        ' + fe(fl.A, 4).padStart(11) + ' ' + f3(fl.c).padStart(8) +
    '   |            ' + fe(fx.A, 4).padStart(11) + ' ' + f3(fx.c).padStart(8) + ' ' + f3(fx.seC).padStart(8));
}
console.log('  record, Y = 2e9, fitted on measured X (attack-foldL-06-scaling.md §3.1): A = 2.4312e-2, c = 1.0818 +- 0.0317');
console.log('  geometric null (import-thinning.md §1.4, OLS in log):                    A = 4.7843e-2, c = 1.0577');

console.log('');
console.log('--- B6. P4, the Poisson licence on the extinction band, under N3 (b3 = 0 exactly) ---');
console.log('  AGG Theorem 1: |P(W=0) - e^{-lambda}| <= (b1+b2+b3)(1-e^{-lambda})/lambda, and b3 = 0 under N3.');
console.log('  The record\'s band uses P(last pair >= p) = 1 - exp(-sum_{q>=p} E[X_q]), i.e. exactly P(W_q=0) = e^{-lambda_q}.');
console.log('     Y      sum over p >= 300   sum over p >= 100   worst single fold (p, bound)');
for (const w of WINS) {
  let s300 = 0, s100 = 0, wp = 0, wv = 0;
  for (const r of w.rows) {
    if (r.p < 100 || r.lam <= 0) continue;
    const bnd = (r.b1N3 + r.b2N3 + r.b3N3) * (1 - Math.exp(-r.lam)) / r.lam;
    s100 += bnd; if (r.p >= 300) s300 += bnd;
    if (bnd > wv) { wv = bnd; wp = r.p; }
  }
  console.log('  ' + w.Y.toExponential(0).padStart(7) + '   ' + fe(s300).padStart(17) + '   ' + fe(s100).padStart(17) + '   p = ' + String(wp).padStart(4) + ', ' + fe(wv));
}

console.log('');
console.log('--- B7. the approximation ledger: singleton cells assumed in b3, and their weight ---');
console.log('     Y      qualifying gaps (p>=100)   offsets treated as singleton cells   share');
for (const w of WINS) {
  const q = agg(w, 'Q'), s = agg(w, 'sing');
  console.log('  ' + w.Y.toExponential(0).padStart(7) + '   ' + String(q).padStart(22) + '   ' + String(s).padStart(35) + '   ' + f3(q ? s / q : 0) +
    '   |  rigorous error ceiling 2*b1(N1) = ' + fe(2 * agg(w, 'b1N1')) + '   against b3(N2) = ' + fe(agg(w, 'b3N2')));
}

console.log('');
console.log('--- B9. why b2 vanishes under N2, and where b3 sits against its own ceiling ---');
console.log('  b3 <= sum_alpha 2 p_alpha (1-p_alpha) = 2*lambda - 2*b1(N1) always, with equality exactly when');
console.log('  the non-neighbour indicators reconstruct the offset u. That ceiling is the diagnostic.');
console.log('     Y      adjacent qualifying gap pairs   b2(N2)      b3(N2)      ceiling 2L-2b1   b3/ceiling');
for (const w of WINS) {
  const ceil = 2 * agg(w, 'lam') - 2 * agg(w, 'b1N1');
  console.log('  ' + w.Y.toExponential(0).padStart(7) + '   ' + String(agg(w, 'adjQ')).padStart(27) + '   ' + fe(agg(w, 'b2N2')).padStart(9) +
    '   ' + fe(agg(w, 'b3N2')).padStart(9) + '   ' + fe(ceil).padStart(13) + '   ' + f3(ceil > 0 ? agg(w, 'b3N2') / ceil : 0));
}

console.log('');
console.log('--- B8. record cross-check on the four windows (last L>=2 fold, N2, S1) ---');
console.log('  record: last fold 181 / 331 / 421 / 457,  N2(p>=100) 8 / 21 / 37 / 50,  S1 8 / 21 / 37 / 50');
for (const w of WINS) {
  const s = summarise(w);
  console.log('  Y = ' + w.Y.toExponential(0).padStart(7) + '   last L>=2 fold ' + String(s.lastLive).padStart(5) +
    '   N2(p>=100) ' + String(s.n2d).padStart(4) + '   S1(p>=100) ' + String(s.s1d).padStart(4) +
    '   folds with L>=2 ' + String(s.n2).padStart(4) + '   sum(L-1) ' + String(s.s1).padStart(4) + '   max L ' + s.maxL);
}

console.log('');
console.log('[' + el() + 's] done.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-stein-01-multikill.js
//   invocation:  node research/import-stein-01-multikill.js
//   code-sha256: a28b71e7d52605e777b481ef98bf78174ee98bb45aa0cc1e8033f3168db5d5cf
//   out-sha256:  19973086c63808abd9c1e4f985d87e2bee18eae427fea658b8b981e085939e9c
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     386.5 s
// ============================================================================
// folds: 237 primes from 5 to 1499;  chunk = 1e+8 slots;  W(u) table = 165035 cells
//
// ############ STAGE A — CALIBRATION, Y = 2e9, AGG floor dropped to p >= 5 ############
// Two gates. (i) the record's embedded figures, digit for digit, from an engine
// that shares no data structure with the one that produced them. (ii) the AGG
// model's own identity W(0) = X_p at EVERY fold, which is what licenses the
// uniform-offset randomisation as a description of the true arithmetic.
// [69.8s] calibration: Y = 2.0e+9, slots = 333333333, AGG floor p >= 5, 69.8 s (two passes)
//
// --- A1. against the embedded tail of attack-foldL-04-localized.js / -06-scaling.js ---
//   OK    slots (n = 5 mod 6)                    got   333333333   record   333333333
//   OK    fold 5   N after                       got   200000000   record   200000000
//   OK    fold 7   kills                         got    57142857   record    57142857
//   OK    fold 7   runs                          got    38095238   record    38095238
//   OK    fold 7   X                             got    19047619   record    19047619
//   OK    fold 23  kills                         got     6789558   record     6789558
//   OK    fold 23  X                             got      106418   record      106418
//   OK    fold 23  L                             got           3   record           3
//   OK    fold 29  N after                       got    66373676   record    66373676
//   OK    fold 29  X                             got       75336   record       75336
//   OK    fold 31  G2 (= G2 after fold 29)       got         258   record         258
//   OK    fold 421 N after                       got    22433554   record    22433554
//   OK    fold 421 kills                         got      105790   record      105790
//   OK    fold 421 runs                          got      105789   record      105789
//   OK    fold 421 X                             got           1   record           1
//   OK    fold 421 theta                         got         840   record         840
//   OK    fold 1451 kills                        got       21565   record       21565
//   OK    last fold with L >= 2                  got         421   record         421
//   OK    last fold with theta <= G2             got        1021   record        1021
//   OK    folds with L >= 2                      got          58   record          58
//   OK    max L over all folds                   got           3   record           3
//   OK    sum over folds of (L-1)                got          64   record          64
//   OK    sum over folds of X                    got    20317943   record    20317943
//   mbar at fold 421 (before) = 88.7337   record 89.1522 (after)
//   CALIBRATION CLEAN: 23 of 23 record figures reproduced.
//
// --- A2. the AGG identity W(0) = X_p, every fold with the AGG floor in force ---
//   folds tested: 237   mismatches: 0
//     p =    5   W(0) =         0   X_p =         0   qualifying gaps Q =          0   lambda = 0.000e+0
//     p =    7   W(0) =  19047619   X_p =  19047619   qualifying gaps Q =  133333332   lambda = 1.905e+7
//     p =   11   W(0) =         0   X_p =         0   qualifying gaps Q =          0   lambda = 0.000e+0
//     p =   13   W(0) =    399600   X_p =    399600   qualifying gaps Q =    5194805   lambda = 3.996e+5
//     p =   17   W(0) =    282072   X_p =    282072   qualifying gaps Q =    4795205   lambda = 2.821e+5
//     p =   19   W(0) =    224336   X_p =    224336   qualifying gaps Q =    4262402   lambda = 2.243e+5
//     p =   23   W(0) =    106418   X_p =    106418   qualifying gaps Q =    2429781   lambda = 1.064e+5
//     p =   29   W(0) =     75336   X_p =     75336   qualifying gaps Q =    2185770   lambda = 7.537e+4
//     p =  101   W(0) =       282   X_p =       282   qualifying gaps Q =      26557   lambda = 2.629e+2
//     p =  211   W(0) =        29   X_p =        29   qualifying gaps Q =       4669   lambda = 2.213e+1
//     p =  421   W(0) =         1   X_p =         1   qualifying gaps Q =         42   lambda = 9.976e-2
//   IDENTITY HOLDS at 237 of 237 folds.
//
// --- A3. the record's own fit reproduced (Poisson MLE, two parameters, folds p >= 100) ---
//   fitted on measured X:  A = 2.4312e-2   c = 1.0818 +- 0.0317     record: A = 2.4312e-2, c = 1.0818 +- 0.0317
//
// ############ STAGE B — b1, b2, b3 AT THE FOUR VALIDATED WINDOWS ############
// [70.0s] Y = 2e+7: Y = 2.0e+7, slots = 3333333, AGG floor p >= 100, 0.3 s (two passes)
// [72.7s] Y = 2e+8: Y = 2.0e+8, slots = 33333333, AGG floor p >= 100, 2.7 s (two passes)
// [98.6s] Y = 2e+9: Y = 2.0e+9, slots = 333333333, AGG floor p >= 100, 25.8 s (two passes)
// [386.3s] Y = 2e+10: Y = 2.0e+10, slots = 3333333333, AGG floor p >= 100, 287.8 s (two passes)
//
// --- B1. the b-table, aggregated over the folds the law is fitted on (p >= 100) ---
//   N1 = {alpha}   N2 = adjacent gaps (the pre-registered choice)   N3 = all of I
//     Y        sum lambda  sum X     |  N1: b1        b3        |  N2: b1        b2        b3        |  N3: b1        b2        b3
//      2e+7    1.861e+1        17  |   1.534e-1  3.138e+1  |   1.534e-1  0.000e+0  3.138e+1  |   3.042e+1  3.052e+1  0.000e+0
//      2e+8    1.923e+2       194  |   1.586e+0  3.752e+2  |   1.586e+0  0.000e+0  3.752e+2  |   3.317e+3  3.311e+3  0.000e+0
//      2e+9    1.919e+3      2006  |   1.580e+1  3.799e+3  |   1.581e+1  0.000e+0  3.799e+3  |   3.289e+5  3.287e+5  0.000e+0
//     2e+10    1.912e+4     19293  |   1.575e+2  3.792e+4  |   1.575e+2  0.000e+0  3.792e+4  |   3.259e+7  3.259e+7  0.000e+0
//
// --- B2. per fold at Y = 2e9, the folds that decide extinction ---
//      p  theta  theta/mbar    Q      lambda      X   |  N2: b1        b2        b3        b3/(b1+b2) |  N3: b1        b2       TV bound
//    101    204      3.906    26557   2.629e+2     282   |   2.603e+0  0.000e+0  5.207e+2   2.000e+2  |   6.914e+4  6.911e+4  1.052e+3
//    127    252      4.389    25997   2.047e+2     215   |   1.613e+0  0.000e+0  4.062e+2   2.518e+2  |   4.190e+4  4.187e+4  8.185e+2
//    151    300      4.852    11730   7.768e+1      78   |   5.148e-1  0.000e+0  1.543e+2   2.998e+2  |   6.035e+3  6.030e+3  3.106e+2
//    199    396      5.703     1578   7.930e+0       7   |   3.985e-2  0.000e+0  1.578e+1   3.960e+2  |   6.288e+1  6.317e+1  3.178e+1
//    211    420      5.987     4669   2.213e+1      29   |   1.049e-1  0.000e+0  4.405e+1   4.200e+2  |   4.896e+2  4.856e+2  8.814e+1
//    251    504      6.754      439   1.749e+0       2   |   6.968e-3  0.000e+0  3.378e+0   4.847e+2  |   3.059e+0  3.203e+0  5.915e+0
//    307    612      7.670      206   6.710e-1       0   |   2.186e-3  0.000e+0  9.912e-1   4.535e+2  |   4.503e-1  4.430e-1  1.301e+0
//    331    660      8.062      257   7.764e-1       1   |   2.346e-3  0.000e+0  1.217e+0   5.190e+2  |   6.029e-1  5.801e-1  1.645e+0
//    401    804      9.193       11   2.743e-2       0   |   6.841e-5  0.000e+0  1.096e-2   1.602e+2  |   7.525e-4  4.988e-3  1.132e-2
//    421    840      9.467       42   9.976e-2       1   |   2.370e-4  0.000e+0  4.387e-2   1.851e+2  |   9.953e-3  1.425e-2  4.607e-2
//    457    912     10.002       13   2.845e-2       0   |   6.225e-5  0.000e+0  1.494e-3   2.400e+1  |   8.092e-4  0.000e+0  1.596e-3
//    499    996     10.610        2   4.008e-3       0   |   8.032e-6  0.000e+0  1.606e-5   2.000e+0  |   1.606e-5  0.000e+0  3.206e-5
//    601   1200     12.122        0   0.000e+0       0   |   0.000e+0  0.000e+0  0.000e+0        NaN  |   0.000e+0  0.000e+0  0.000e+0
//    701   1404     13.522        0   0.000e+0       0   |   0.000e+0  0.000e+0  0.000e+0        NaN  |   0.000e+0  0.000e+0  0.000e+0
//
// --- B3. THE KILL CRITERION, as pre-registered in §5 of the prereg ---
//   SMALL: b3 <= 0.1*(b1+b2) under N2.   NOT SMALL: b3 > (b1+b2) under N2.
//   Y =    2e+7   folds with I nonempty and p >= 100:   47   SMALL   11   between    0   NOT SMALL   36   max b3/(b1+b2) = 2.469e+2
//   Y =    2e+8   folds with I nonempty and p >= 100:   65   SMALL    8   between    0   NOT SMALL   57   max b3/(b1+b2) = 4.168e+2
//   Y =    2e+9   folds with I nonempty and p >= 100:   76   SMALL    3   between    0   NOT SMALL   73   max b3/(b1+b2) = 5.533e+2
//   Y =   2e+10   folds with I nonempty and p >= 100:  108   SMALL   14   between    0   NOT SMALL   94   max b3/(b1+b2) = 7.980e+2
//
// --- B4. P1, the parameter-free prediction: lambda_p against measured X_p ---
//     Y      sum lambda    sum X    ratio   |  folds with lambda >= 1:  within 3 sqrt(lambda)  /  total
//      2e+7     1.861e+1        17   0.9137   |      6 /    6   = 100.0%
//      2e+8     1.923e+2       194   1.0087   |     18 /   18   = 100.0%
//      2e+9     1.919e+3      2006   1.0455   |     34 /   35   = 97.1%
//     2e+10     1.912e+4     19293   1.0090   |     49 /   49   = 100.0%
//
// --- B5. P2, the two constants, from the derived lambda curve, record estimator ---
//      Y      fitted on lambda: A          c        |  fitted on measured X: A          c        +- se
//      2e+7          2.0511e-2   1.0545   |              2.6478e-2   1.1340   0.3578
//      2e+8          2.1773e-2   1.0667   |              1.4631e-2   0.9741   0.0947
//      2e+9          2.2091e-2   1.0701   |              2.4312e-2   1.0818   0.0317
//     2e+10          2.2010e-2   1.0698   |              2.1867e-2   1.0662   0.0101
//   record, Y = 2e9, fitted on measured X (attack-foldL-06-scaling.md §3.1): A = 2.4312e-2, c = 1.0818 +- 0.0317
//   geometric null (import-thinning.md §1.4, OLS in log):                    A = 4.7843e-2, c = 1.0577
//
// --- B6. P4, the Poisson licence on the extinction band, under N3 (b3 = 0 exactly) ---
//   AGG Theorem 1: |P(W=0) - e^{-lambda}| <= (b1+b2+b3)(1-e^{-lambda})/lambda, and b3 = 0 under N3.
//   The record's band uses P(last pair >= p) = 1 - exp(-sum_{q>=p} E[X_q]), i.e. exactly P(W_q=0) = e^{-lambda_q}.
//      Y      sum over p >= 300   sum over p >= 100   worst single fold (p, bound)
//      2e+7            3.716e-4            2.656e+1   p =  103, 4.910e+0
//      2e+8            4.474e-2            3.737e+2   p =  103, 5.686e+1
//      2e+9            2.451e+0            3.823e+3   p =  103, 5.613e+2
//     2e+10            6.777e+1            3.823e+4   p =  103, 5.547e+3
//
// --- B7. the approximation ledger: singleton cells assumed in b3, and their weight ---
//      Y      qualifying gaps (p>=100)   offsets treated as singleton cells   share
//      2e+7                     2362                                  1533   0.6490   |  rigorous error ceiling 2*b1(N1) = 3.069e-1   against b3(N2) = 3.138e+1
//      2e+8                    24442                                 23224   0.9502   |  rigorous error ceiling 2*b1(N1) = 3.172e+0   against b3(N2) = 3.752e+2
//      2e+9                   244129                                242135   0.9918   |  rigorous error ceiling 2*b1(N1) = 3.161e+1   against b3(N2) = 3.799e+3
//     2e+10                  2432055                               2429067   0.9988   |  rigorous error ceiling 2*b1(N1) = 3.150e+2   against b3(N2) = 3.792e+4
//
// --- B9. why b2 vanishes under N2, and where b3 sits against its own ceiling ---
//   b3 <= sum_alpha 2 p_alpha (1-p_alpha) = 2*lambda - 2*b1(N1) always, with equality exactly when
//   the non-neighbour indicators reconstruct the offset u. That ceiling is the diagnostic.
//      Y      adjacent qualifying gap pairs   b2(N2)      b3(N2)      ceiling 2L-2b1   b3/ceiling
//      2e+7                             0    0.000e+0    3.138e+1        3.690e+1   0.8503
//      2e+8                             1    0.000e+0    3.752e+2        3.815e+2   0.9834
//      2e+9                            24    0.000e+0    3.799e+3        3.806e+3   0.9984
//     2e+10                           221    0.000e+0    3.792e+4        3.793e+4   0.9998
//
// --- B8. record cross-check on the four windows (last L>=2 fold, N2, S1) ---
//   record: last fold 181 / 331 / 421 / 457,  N2(p>=100) 8 / 21 / 37 / 50,  S1 8 / 21 / 37 / 50
//   Y =    2e+7   last L>=2 fold   181   N2(p>=100)    8   S1(p>=100)    8   folds with L>=2   29   sum(L-1)   31   max L 3
//   Y =    2e+8   last L>=2 fold   331   N2(p>=100)   21   S1(p>=100)   21   folds with L>=2   42   sum(L-1)   46   max L 3
//   Y =    2e+9   last L>=2 fold   421   N2(p>=100)   37   S1(p>=100)   37   folds with L>=2   58   sum(L-1)   64   max L 3
//   Y =   2e+10   last L>=2 fold   457   N2(p>=100)   50   S1(p>=100)   50   folds with L>=2   71   sum(L-1)   81   max L 4
//
// [386.4s] done.
// ============================================================================
// READINGS
//
