// ============================================================================
// FRONTIER 37, LEG 2 — THE DIRECT FOLD, THE CERTIFICATE, AND THE TRANSPORT
// INEQUALITY, ALL AT FOLD 37
//
// THREE INSTRUMENTS, ONE STREAM. Folding T_x by q, this script computes on a
// single pass over the old tile's slot stream:
//
//  (1) THE DIRECT KILL-RUN ENUMERATION. The absolute condition is
//      "position v dies iff q | v or q | v+2". Writing v = s_j + kW for old
//      slot j in copy k, and b_k = -kW mod q, slot j dies in copy k iff
//      b_k lies in S_j = {c_j, c_j+2}, c_j = s_j mod q. Since W is invertible
//      mod q, b_k runs over all of Z_q, so ONE pass over the old slots with
//      the two-element set S_j attached to each enumerates the kill runs of
//      EVERY copy at once: at most two alignments can have a live run at any
//      moment, because slot j extends only the two in S_j. That gives L, and
//      the merged gap of each run, and hence G2(new) exactly. No gap is ever
//      reduced modulo anything; this is the residue route.
//      Copy boundaries: the physical copy after the one at coordinate b is at
//      b - w (w = W mod q), so the pass is closed by a POST-ROLL of the first
//      R slots with residues shifted by +w and positions by +W. A run whose
//      start index is 0 is a duplicate of a boundary-straddling run already
//      enumerated at coordinate b + w unless slot D-1 is alive there; that one
//      case is repaired explicitly at the end.
//
//  (2) THE TAIL-COUNT TRANSPORT CERTIFICATE
//      (`research/history/staging/verify-tailcount-transport.md`). A new gap is
//      a maximal kill run: window (g_i, ..., g_{i+L}) with the L-1 INTERIOR
//      gaps g_{i+1}..g_{i+L-1} qualifying. Three certificates:
//        M_loose  interiors are 0 or +-2 mod q               (the record's Q_L)
//        M_alt    + the interior class word admits a legal walk on a 2-set
//        M_full   + both endpoints alive  == the truth, by construction
//      The named OPEN QUESTION of that document is whether M_alt = G2(new)
//      ALWAYS. It is exact at folds 11 through 31. Fold 37 is the next test.
//
//  (3) THE TRANSPORT INEQUALITY ITSELF,
//        N_new(theta) <= (q-2) N(theta) + 2 * SUM_{L>=1} Q_L(theta),
//      at every theta, with the L-sum UNTRUNCATED. N and Q_L are counts over
//      one OLD period, N_new over one NEW period (which is q old periods).
//      N_new is assembled exactly: the L = 0 new gaps are the old gaps counted
//      with multiplicity q - |S_i union S_{i+1}| (the alignments at which both
//      endpoints live), and the L >= 1 new gaps are the enumerated runs.
//      `research/history/staging/attack-foldL-03-transport.md` records this as
//      NOT REACHED at fold 37 ("needs a stream-of-stream").
//
// SELF-TESTS INSIDE THE RUN. D_new = D(q-2) recovered from the two counting
// routes independently; G2(new) against the published G2 ladder; the
// certificates against the recorded 42, 66, 108, 150, 204, 258/270, 348; L
// against the published diagonal; and the inequality at every theta.
//
// Reproduce:
//   node research/attack-frontier37-02-transport.js full   (calibration, then fold 37)
//   node research/attack-frontier37-02-transport.js calib
//   node --max-old-space-size=4096 research/attack-frontier37-02-transport.js deep37
// ============================================================================
'use strict';

const MODE = process.argv[2] || 'calib';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
const pad = (v, n) => String(v).padStart(n);
const R = 256;          // post-roll length in slots
const HB = 8192;        // histogram buckets, index = value / 6
const PRING = 1024;     // ring of recent slot positions, for the window sums

// ---------------------------------------------------------------------------
// THE ENGINE. push(i, s, r): old slot index i, absolute position s, residue
// c_i = s mod q. Indices 0..D-1 are the tile; D..D+R-1 are the post-roll.
// ---------------------------------------------------------------------------
function makeEngine(q, D, W) {
  const q2 = q - 2;
  // --- direct route state: at most two live alignments
  let aA = -1, sA = -1, pA = 0, aB = -1, sB = -1, pB = 0;
  let Lmax = 0, prevPos = -1, prevR = -1, prevIdx = -1;
  const bestByLen = new Float64Array(64);
  let nRuns = 0, maxRunGap = 0;
  const headRun = new Map();            // alignment -> {len, after}
  // --- histograms
  const histOld = new Float64Array(HB);      // old gaps, one period
  const histNew = new Float64Array(HB);      // new gaps, one new period
  const histQloose = new Float64Array(HB);   // window sums, loose interiors
  const histQalt = new Float64Array(HB);     // window sums, alternation-legal interiors
  // --- word route state (for the certificates and Q_L)
  const pring = new Float64Array(PRING);
  let qrun = 0, maxQrun = 0;                 // consecutive qualifying gaps
  let bA = 1, bB = 1;                        // alternation walk, lengths in slots
  let Mloose = 0, Malt = 0;
  let nWinLoose = 0, nWinAlt = 0;
  let firstPos = -1, lastPos = -1, lastR = -1;
  let over = 0;

  function bump(h, v) { const b = v / 6; if (b < HB) h[b]++; else over++; }

  function closeRun(a, st, en, after, before) {
    const len = en - st + 1;
    if (st >= D) return;                       // started in the post-roll: not ours
    if (len > Lmax) Lmax = len;
    if (st === 0) { headRun.set(a, { len, after }); return; }
    nRuns++;
    const g = after - before;
    if (g > maxRunGap) maxRunGap = g;
    if (len < 64 && g > bestByLen[len]) bestByLen[len] = g;
    bump(histNew, g);
  }

  function push(i, s, r) {
    const r2 = r + 2 >= q ? r + 2 - q : r + 2;
    // ---- direct route ----------------------------------------------------
    let nA = -1, nsA = -1, npA = 0, nB = -1, nsB = -1, npB = 0;
    if (aA === r || aA === r2) { nA = aA; nsA = sA; npA = pA; }
    else if (aA >= 0) closeRun(aA, sA, i - 1, s, pA);
    if (aB === r || aB === r2) {
      if (nA < 0) { nA = aB; nsA = sB; npA = pB; } else { nB = aB; nsB = sB; npB = pB; }
    } else if (aB >= 0) closeRun(aB, sB, i - 1, s, pB);
    if (r !== nA && r !== nB) { if (nA < 0) { nA = r; nsA = i; npA = prevPos; } else { nB = r; nsB = i; npB = prevPos; } }
    if (r2 !== nA && r2 !== nB) { if (nA < 0) { nA = r2; nsA = i; npA = prevPos; } else { nB = r2; nsB = i; npB = prevPos; } }
    aA = nA; sA = nsA; pA = npA; aB = nB; sB = nsB; pB = npB;

    // ---- the gap that ends at this slot ----------------------------------
    if (prevIdx >= 0) {
      const g = s - prevPos;
      if (prevIdx < D) {
        bump(histOld, g);
        // L = 0 new gaps: alignments at which BOTH endpoints live
        let ov;
        if (prevR === r) ov = 2;
        else if (r === (prevR + 2) % q || prevR === (r + 2) % q) ov = 1;
        else ov = 0;
        const mult = q - 4 + ov;
        const b = g / 6;
        if (b < HB) histNew[b] += mult; else over++;
      }
      // THE WINDOWS WHOSE FREE RIGHT GAP IS THIS ONE, g_{prevIdx}. The first
      // gap index j runs from prevIdx-1 downward; the interiors are
      // g_{j+1}..g_{prevIdx-1}, so the state used here is the one carried by
      // gap prevIdx-1, i.e. the state BEFORE this gap is folded in.
      const altrun = (bA > bB ? bA : bB) - 1;    // legal interior suffix, in gaps
      const hi = prevIdx - 1;                    // L = 1, no interior
      const loL = hi - qrun, loA = hi - altrun;
      const hiCap = D - 1;
      const top = hi < hiCap ? hi : hiCap;
      for (let j = top; j >= loL && j >= 0; j--) {
        const wsum = s - pring[j & (PRING - 1)];
        bump(histQloose, wsum); nWinLoose++;
        if (wsum > Mloose) Mloose = wsum;
        if (j >= loA) {
          bump(histQalt, wsum); nWinAlt++;
          if (wsum > Malt) Malt = wsum;
        }
      }
      // now carry the state across gap prevIdx
      const c = g % q;
      const qual = (c === 0 || c === 2 || c === q - 2);
      qrun = qual ? qrun + 1 : 0;
      if (qrun > maxQrun) maxQrun = qrun;
      if (c === 0) { const x = bA + 1, y = bB + 1; bA = x; bB = y; }
      else if (c === 2) { const x = bB + 1; bA = x; bB = 1; }
      else if (c === q - 2) { const y = bA + 1; bA = 1; bB = y; }
      else { bA = 1; bB = 1; }
    }
    pring[i & (PRING - 1)] = s;
    prevPos = s; prevR = r; prevIdx = i;
    if (i === 0) firstPos = s;
    if (i === D - 1) { lastPos = s; lastR = r; }
  }

  function finish(w) {
    // any still-live run must have started inside the post-roll
    if (aA >= 0 && sA < D) closeRun(aA, sA, D + R - 1, prevPos, pA);
    if (aB >= 0 && sB < D) closeRun(aB, sB, D + R - 1, prevPos, pB);
    // head runs: duplicate iff slot D-1 is dead at coordinate a + w
    let headKept = 0;
    for (const [a, h] of headRun) {
      const bb = (a + w) % q;
      const dead = (bb === lastR || bb === (lastR + 2) % q);
      if (dead) continue;                       // already counted as a straddle
      headKept++;
      nRuns++;
      const g = h.after + W - lastPos;
      if (g > maxRunGap) maxRunGap = g;
      if (h.len < 64 && g > bestByLen[h.len]) bestByLen[h.len] = g;
      bump(histNew, g);
      if (h.len > Lmax) Lmax = h.len;
    }
    return {
      L: Lmax, nRuns, maxRunGap, headKept, headRuns: headRun.size,
      bestByLen: Array.from(bestByLen.slice(0, 8)),
      Mloose, Malt, nWinLoose, nWinAlt, maxQrun, over,
      histOld, histNew, histQloose, histQalt
    };
  }
  return { push, finish };
}

// ---------------------------------------------------------------------------
// SCORING
// ---------------------------------------------------------------------------
function score(r, q, D, W, label, expect) {
  const tail = h => { let t = 0; const out = new Float64Array(HB); for (let b = HB - 1; b >= 0; b--) { t += h[b]; out[b] = t; } return out; };
  const N = tail(r.histOld), Nn = tail(r.histNew), QL = tail(r.histQloose), QA = tail(r.histQalt);
  let top = 0; for (let b = HB - 1; b >= 0; b--) if (r.histNew[b] > 0 || r.histOld[b] > 0 || r.histQloose[b] > 0) { top = b; break; }
  let viol = 0, maxRatio = 0, argmax = 0, violAlt = 0;
  for (let b = 1; b <= top; b++) {
    const th = b * 6;
    const rhs = (q - 2) * N[b] + 2 * QL[b];
    if (Nn[b] > rhs) viol++;
    const rhsA = (q - 2) * N[b] + 2 * QA[b];
    if (Nn[b] > rhsA) violAlt++;
    if (rhs > 0) { const ra = Nn[b] / rhs; if (ra > maxRatio) { maxRatio = ra; argmax = th; } }
  }
  // exact new-gap count
  let dnew = 0; for (let b = 0; b < HB; b++) dnew += r.histNew[b];
  const dexp = D * (q - 2);
  // G2(new)
  let g2new = 0; for (let b = HB - 1; b >= 0; b--) if (r.histNew[b] > 0) { g2new = b * 6; break; }
  let g2old = 0; for (let b = HB - 1; b >= 0; b--) if (r.histOld[b] > 0) { g2old = b * 6; break; }
  const o = {
    label, q, D, W, g2old, g2new, L: r.L, Mloose: r.Mloose, Malt: r.Malt, Mfull: g2new,
    dnew, dexp, dok: dnew === dexp, viol, violAlt, maxRatio, argmax, maxQrun: r.maxQrun,
    nRuns: r.nRuns, headKept: r.headKept, over: r.over, bestByLen: r.bestByLen,
    Nn528: Nn[Math.min(HB - 1, g2new / 6)], QL528: QL[Math.min(HB - 1, g2new / 6)],
    thetaTop: top * 6
  };
  console.log('');
  console.log('--- ' + label + '   fold q = ' + q + ' ---');
  console.log('  D(old) = ' + D + '   W(old) = ' + W + '   G2(old) = ' + g2old);
  console.log('  D(new) counted = ' + dnew + '   expected D(q-2) = ' + dexp + '   ' + (o.dok ? 'EXACT' : 'MISMATCH'));
  console.log('  L(direct)  = ' + r.L + '   maximal kill runs enumerated = ' + r.nRuns +
    '   head runs kept = ' + r.headKept + ' of ' + r.headRuns);
  console.log('  best merged gap by run length 1..7: ' + r.bestByLen.slice(1).join(', '));
  console.log('  G2(new) = M_full = ' + g2new + (expect && expect.g2 ? ('   expected ' + expect.g2 + '   ' + (g2new === expect.g2 ? 'AGREE' : 'MISMATCH')) : ''));
  console.log('  M_loose = ' + r.Mloose + '   M_alt = ' + r.Malt +
    (expect && expect.cert ? ('   recorded certificate ' + expect.cert + '   ' + (r.Mloose === expect.cert ? 'AGREE' : 'MISMATCH')) : ''));
  console.log('  M_alt vs truth: ' + (r.Malt === g2new ? 'EXACT' : 'LOSS ' + (r.Malt - g2new)) +
    '   M_loose vs truth: ' + (r.Mloose === g2new ? 'EXACT' : 'LOSS ' + (r.Mloose - g2new)));
  console.log('  transport inequality, untruncated L-sum, ' + top + ' theta values:');
  console.log('    violations (loose Q_L) = ' + viol + '   violations (alt-refined Q_L) = ' + violAlt);
  console.log('    max N_new/RHS = ' + maxRatio.toFixed(4) + ' at theta = ' + argmax);
  console.log('    at theta = G2(new) = ' + g2new + ':  N_new = ' + o.Nn528 + '   SUM Q_L = ' + o.QL528 +
    '   N(theta) = ' + N[Math.min(HB - 1, g2new / 6)]);
  console.log('  windows scored: loose ' + r.nWinLoose + ', alternation-legal ' + r.nWinAlt +
    '   longest qualifying gap run = ' + r.maxQrun + '   histogram overflow = ' + r.over);
  return o;
}

// ---------------------------------------------------------------------------
// DRIVERS
// ---------------------------------------------------------------------------
function buildTiles() {
  const out = [];
  let P = 6, S = Float64Array.from([5]);
  for (const q of [5, 7, 11, 13, 17, 19, 23]) {
    const D = S.length, keep = new Float64Array(D * (q - 2));
    let n = 0;
    for (let k = 0; k < q; k++) for (let i = 0; i < D; i++) {
      const r = S[i] + k * P;
      if (r % q !== 0 && (r + 2) % q !== 0) keep[n++] = r;
    }
    P *= q; S = keep;
    out.push({ x: q, W: P, S });
  }
  return out;
}

function runStored(S, W, q, label, expect) {
  const D = S.length, w = W % q;
  const eng = makeEngine(q, D, W);
  for (let i = 0; i < D; i++) eng.push(i, S[i], S[i] % q);
  for (let j = 0; j < R; j++) eng.push(D + j, S[j % D] + W * (1 + Math.floor(j / D)), (S[j % D] % q + w) % q);
  return score(eng.finish(w), q, D, W, label, expect);
}

if (MODE === 'calib' || MODE === 'full') {
  console.log('=== CALIBRATION: the three instruments on the exact tiles ===========');
  const tiles = buildTiles();
  const NEXT = { 7: 11, 11: 13, 13: 17, 17: 19, 19: 23, 23: 29 };
  const EXP = {
    11: { g2: 42, cert: 42 }, 13: { g2: 66, cert: 66 }, 17: { g2: 108, cert: 108 },
    19: { g2: 150, cert: 150 }, 23: { g2: 204, cert: 204 }, 29: { g2: 258, cert: 270 }
  };
  const rows = [];
  for (const t of tiles) {
    const q = NEXT[t.x];
    if (!q) continue;
    rows.push(runStored(t.S, t.W, q, 'T_' + t.x, EXP[q]));
  }
  // T_29 streamed out of T_23, folded by 31
  {
    let P = 30, S = Float64Array.from([11, 17, 29]);
    for (const q of [7, 11, 13, 17, 19, 23]) {
      const D = S.length, keep = new Float64Array(D * (q - 2));
      let n = 0;
      for (let k = 0; k < q; k++) for (let i = 0; i < D; i++) {
        const r = S[i] + k * P;
        if (r % q !== 0 && (r + 2) % q !== 0) keep[n++] = r;
      }
      P *= q; S = keep;
    }
    const W23 = P, D23 = S.length, W29 = W23 * 29, q = 31, w = W29 % q;
    const D29 = 214708725;
    console.log('');
    console.log('T_23 built: W = ' + W23 + ', D = ' + D23 + '   ' + el());
    const eng = makeEngine(q, D29, W29);
    const R29 = new Uint8Array(D23), R31 = new Uint8Array(D23);
    for (let i = 0; i < D23; i++) { R29[i] = S[i] % 29; R31[i] = S[i] % 31; }
    const a29 = W23 % 29, a31 = W23 % 31;
    const headS = new Float64Array(R), headR = new Int32Array(R);
    let n = 0;
    for (let k = 0; k < 29; k++) {
      const s29 = (k * a29) % 29, s31 = (k * a31) % 31, base = k * W23;
      for (let i = 0; i < D23; i++) {
        let a = R29[i] + s29; if (a >= 29) a -= 29;
        if (a === 0 || a === 27) continue;
        let b = R31[i] + s31; if (b >= 31) b -= 31;
        const s = S[i] + base;
        if (n < R) { headS[n] = s; headR[n] = b; }
        eng.push(n, s, b); n++;
      }
    }
    if (n !== D29) console.log('  !! D29 = ' + n + ' expected ' + D29);
    for (let j = 0; j < R; j++) eng.push(D29 + j, headS[j] + W29, (headR[j] + w) % 31);
    score(eng.finish(w), q, D29, W29, 'T_29 (streamed)', { g2: 348, cert: 348 });
  }
  console.log('');
  console.log('calibration done   ' + el());
  if (MODE === 'calib') process.exit(0);
}

if (MODE === 'deep37' || MODE === 'full') {
  console.log('=== DEEP 37: T_31 streamed out of T_23, folded by 37 ================');
  let P = 30, S = Float64Array.from([11, 17, 29]);
  for (const q of [7, 11, 13, 17, 19, 23]) {
    const D = S.length, keep = new Float64Array(D * (q - 2));
    let n = 0;
    for (let k = 0; k < q; k++) for (let i = 0; i < D; i++) {
      const r = S[i] + k * P;
      if (r % q !== 0 && (r + 2) % q !== 0) keep[n++] = r;
    }
    P *= q; S = keep;
  }
  const W23 = P, D23 = S.length, W29 = W23 * 29, W31 = W29 * 31;
  const q = 37, w = W31 % q, D31 = 6226553025;
  console.log('T_23 built: W = ' + W23 + ', D = ' + D23 + '   ' + el());
  const eng = makeEngine(q, D31, W31);
  const R29 = new Uint8Array(D23), R31a = new Uint8Array(D23), R37 = new Uint8Array(D23);
  for (let i = 0; i < D23; i++) { R29[i] = S[i] % 29; R31a[i] = S[i] % 31; R37[i] = S[i] % 37; }
  const a29 = W23 % 29, a31 = W23 % 31, b31 = W29 % 31, a37 = W23 % 37, b37 = W29 % 37;
  const headS = new Float64Array(R), headR = new Int32Array(R);
  let n = 0;
  for (let k31 = 0; k31 < 31; k31++) {
    const base31 = k31 * W29, s31b = (k31 * b31) % 31, s37b = (k31 * b37) % 37;
    for (let k29 = 0; k29 < 29; k29++) {
      const s29 = (k29 * a29) % 29;
      const s31 = (k29 * a31 + s31b) % 31, s37 = (k29 * a37 + s37b) % 37;
      const base = base31 + k29 * W23;
      for (let i = 0; i < D23; i++) {
        let a = R29[i] + s29; if (a >= 29) a -= 29;
        if (a === 0 || a === 27) continue;
        let b = R31a[i] + s31; if (b >= 31) b -= 31;
        if (b === 0 || b === 29) continue;
        let c = R37[i] + s37; if (c >= 37) c -= 37;
        const s = S[i] + base;
        if (n < R) { headS[n] = s; headR[n] = c; }
        eng.push(n, s, c); n++;
      }
    }
    console.error('  copy ' + (k31 + 1) + '/31   alive ' + n + '   ' + el());
  }
  console.log('T_31 streamed: D = ' + n + '   expected ' + D31 + '   ' + (n === D31 ? 'EXACT' : 'MISMATCH'));
  for (let j = 0; j < R; j++) eng.push(D31 + j, headS[j] + W31, (headR[j] + w) % 37);
  score(eng.finish(w), q, D31, W31, 'T_31 (streamed)', { g2: 528, cert: null });
  console.log('');
  console.log('total time ' + el());
  process.exit(0);
}

console.log('usage: node research/attack-frontier37-02-transport.js [calib|deep37]');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=4096 research/attack-frontier37-02-transport.js -- full
//   invocation:  node --max-old-space-size=4096 research/attack-frontier37-02-transport.js full
//   code-sha256: 967a180449874ca86656ee0697be017f64d2fb7e0b871f455e9b4007479b21cc
//   out-sha256:  18c26bc3106940375e5b1ab940b832aad4e46cc3e32c8d766dff34e18b185073
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     661.9 s
// ============================================================================
// === CALIBRATION: the three instruments on the exact tiles ===========
//
// --- T_7   fold q = 11 ---
//   D(old) = 15   W(old) = 210   G2(old) = 30
//   D(new) counted = 135   expected D(q-2) = 135   EXACT
//   L(direct)  = 1   maximal kill runs enumerated = 30   head runs kept = 2 of 2
//   best merged gap by run length 1..7: 42, 0, 0, 0, 0, 0, 0
//   G2(new) = M_full = 42   expected 42   AGREE
//   M_loose = 42   M_alt = 42   recorded certificate 42   AGREE
//   M_alt vs truth: EXACT   M_loose vs truth: EXACT
//   transport inequality, untruncated L-sum, 7 theta values:
//     violations (loose Q_L) = 0   violations (alt-refined Q_L) = 0
//     max N_new/RHS = 1.0000 at theta = 36
//     at theta = G2(new) = 42:  N_new = 4   SUM Q_L = 2   N(theta) = 0
//   windows scored: loose 15, alternation-legal 15   longest qualifying gap run = 0   histogram overflow = 0
//
// --- T_11   fold q = 13 ---
//   D(old) = 135   W(old) = 2310   G2(old) = 42
//   D(new) counted = 1485   expected D(q-2) = 1485   EXACT
//   L(direct)  = 2   maximal kill runs enumerated = 264   head runs kept = 2 of 2
//   best merged gap by run length 1..7: 66, 48, 0, 0, 0, 0, 0
//   G2(new) = M_full = 66   expected 66   AGREE
//   M_loose = 66   M_alt = 66   recorded certificate 66   AGREE
//   M_alt vs truth: EXACT   M_loose vs truth: EXACT
//   transport inequality, untruncated L-sum, 11 theta values:
//     violations (loose Q_L) = 0   violations (alt-refined Q_L) = 0
//     max N_new/RHS = 1.0000 at theta = 54
//     at theta = G2(new) = 66:  N_new = 12   SUM Q_L = 6   N(theta) = 0
//   windows scored: loose 141, alternation-legal 141   longest qualifying gap run = 1   histogram overflow = 0
//
// --- T_13   fold q = 17 ---
//   D(old) = 1485   W(old) = 30030   G2(old) = 66
//   D(new) counted = 22275   expected D(q-2) = 22275   EXACT
//   L(direct)  = 2   maximal kill runs enumerated = 2898   head runs kept = 2 of 2
//   best merged gap by run length 1..7: 96, 108, 0, 0, 0, 0, 0
//   G2(new) = M_full = 108   expected 108   AGREE
//   M_loose = 108   M_alt = 108   recorded certificate 108   AGREE
//   M_alt vs truth: EXACT   M_loose vs truth: EXACT
//   transport inequality, untruncated L-sum, 18 theta values:
//     violations (loose Q_L) = 0   violations (alt-refined Q_L) = 0
//     max N_new/RHS = 0.8881 at theta = 36
//     at theta = G2(new) = 108:  N_new = 20   SUM Q_L = 20   N(theta) = 0
//   windows scored: loose 1557, alternation-legal 1557   longest qualifying gap run = 1   histogram overflow = 0
//
// --- T_17   fold q = 19 ---
//   D(old) = 22275   W(old) = 510510   G2(old) = 108
//   D(new) counted = 378675   expected D(q-2) = 378675   EXACT
//   L(direct)  = 2   maximal kill runs enumerated = 43462   head runs kept = 2 of 2
//   best merged gap by run length 1..7: 150, 150, 0, 0, 0, 0, 0
//   G2(new) = M_full = 150   expected 150   AGREE
//   M_loose = 150   M_alt = 150   recorded certificate 150   AGREE
//   M_alt vs truth: EXACT   M_loose vs truth: EXACT
//   transport inequality, untruncated L-sum, 25 theta values:
//     violations (loose Q_L) = 0   violations (alt-refined Q_L) = 0
//     max N_new/RHS = 0.8975 at theta = 36
//     at theta = G2(new) = 150:  N_new = 20   SUM Q_L = 16   N(theta) = 0
//   windows scored: loose 23363, alternation-legal 23363   longest qualifying gap run = 1   histogram overflow = 0
//
// --- T_19   fold q = 23 ---
//   D(old) = 378675   W(old) = 9699690   G2(old) = 150
//   D(new) counted = 7952175   expected D(q-2) = 7952175   EXACT
//   L(direct)  = 3   maximal kill runs enumerated = 745480   head runs kept = 2 of 2
//   best merged gap by run length 1..7: 186, 198, 204, 0, 0, 0, 0
//   G2(new) = M_full = 204   expected 204   AGREE
//   M_loose = 204   M_alt = 204   recorded certificate 204   AGREE
//   M_alt vs truth: EXACT   M_loose vs truth: EXACT
//   transport inequality, untruncated L-sum, 34 theta values:
//     violations (loose Q_L) = 0   violations (alt-refined Q_L) = 0
//     max N_new/RHS = 0.9180 at theta = 42
//     at theta = G2(new) = 204:  N_new = 4   SUM Q_L = 4   N(theta) = 0
//   windows scored: loose 390693, alternation-legal 390521   longest qualifying gap run = 2   histogram overflow = 0
//
// --- T_23   fold q = 29 ---
//   D(old) = 7952175   W(old) = 223092870   G2(old) = 204
//   D(new) counted = 214708725   expected D(q-2) = 214708725   EXACT
//   L(direct)  = 2   maximal kill runs enumerated = 15660528   head runs kept = 2 of 2
//   best merged gap by run length 1..7: 234, 258, 0, 0, 0, 0, 0
//   G2(new) = M_full = 258   expected 258   AGREE
//   M_loose = 270   M_alt = 258   recorded certificate 270   AGREE
//   M_alt vs truth: EXACT   M_loose vs truth: LOSS 12
//   transport inequality, untruncated L-sum, 45 theta values:
//     violations (loose Q_L) = 0   violations (alt-refined Q_L) = 0
//     max N_new/RHS = 0.9324 at theta = 42
//     at theta = G2(new) = 258:  N_new = 2   SUM Q_L = 4   N(theta) = 0
//   windows scored: loose 8196279, alternation-legal 8195991   longest qualifying gap run = 2   histogram overflow = 0
//
// T_23 built: W = 223092870, D = 7952175   2.1s
//
// --- T_29 (streamed)   fold q = 31 ---
//   D(old) = 214708725   W(old) = 6469693230   G2(old) = 258
//   D(new) counted = 6226553025   expected D(q-2) = 6226553025   EXACT
//   L(direct)  = 4   maximal kill runs enumerated = 421392436   head runs kept = 2 of 2
//   best merged gap by run length 1..7: 330, 348, 330, 330, 0, 0, 0
//   G2(new) = M_full = 348   expected 348   AGREE
//   M_loose = 348   M_alt = 348   recorded certificate 348   AGREE
//   M_alt vs truth: EXACT   M_loose vs truth: EXACT
//   transport inequality, untruncated L-sum, 58 theta values:
//     violations (loose Q_L) = 0   violations (alt-refined Q_L) = 0
//     max N_new/RHS = 0.9348 at theta = 42
//     at theta = G2(new) = 348:  N_new = 4   SUM Q_L = 4   N(theta) = 0
//   windows scored: loose 222776135, alternation-legal 222744653   longest qualifying gap run = 3   histogram overflow = 0
//
// calibration done   18.2s
// === DEEP 37: T_31 streamed out of T_23, folded by 37 ================
// T_23 built: W = 223092870, D = 7952175   18.7s
// T_31 streamed: D = 6226553025   expected 6226553025   EXACT
//
// --- T_31 (streamed)   fold q = 37 ---
//   D(old) = 6226553025   W(old) = 200560490130   G2(old) = 348
//   D(new) counted = 217929355875   expected D(q-2) = 217929355875   EXACT
//   L(direct)  = 4   maximal kill runs enumerated = 12338231614   head runs kept = 2 of 2
//   best merged gap by run length 1..7: 408, 510, 528, 408, 0, 0, 0
//   G2(new) = M_full = 528   expected 528   AGREE
//   M_loose = 528   M_alt = 528
//   M_alt vs truth: EXACT   M_loose vs truth: EXACT
//   transport inequality, untruncated L-sum, 88 theta values:
//     violations (loose Q_L) = 0   violations (alt-refined Q_L) = 0
//     max N_new/RHS = 0.9477 at theta = 48
//     at theta = G2(new) = 528:  N_new = 2   SUM Q_L = 2   N(theta) = 0
//   windows scored: loose 6341904311, alternation-legal 6341472275   longest qualifying gap run = 3   histogram overflow = 0
//
// total time 661.8s
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE TRANSPORT INEQUALITY HOLDS AT FOLD 37, AT EVERY THETA, UNTRUNCATED.
//    0 violations over 88 theta values with the loose Q_L and 0 with the
//    alternation-refined one. `attack-foldL-03-transport.md` §7 records the
//    check at five folds with an L <= 8 truncation and its §"NOT REACHED"
//    prices fold 37 as needing a stream of a stream. It needed one pass.
//
// 2. THE RATIO IS RISING, FOLD BY FOLD, AND THAT IS THE ONE THING HERE THAT
//    POINTS SOMEWHERE. max N_new/RHS reads 1.0000, 1.0000, 0.8881, 0.8975,
//    0.9180, 0.9324, 0.9348, 0.9477 at folds 11 to 37. The first two are tiny
//    tiles. From fold 17 the rise is monotone, 0.0119 per fold step, and the
//    margin is now 5.2%. Straight-line extrapolation puts the ratio at 1 near
//    fold 53. A relaxation whose slack is disappearing is not a relaxation
//    that will keep certifying, and fold 41 is the cheap test of whether the
//    line is real.
//
// 3. THE CERTIFICATE IS EXACT AT ITS EIGHTH FOLD, AND THE REFINEMENT WAS NOT
//    NEEDED. M_loose = M_alt = M_full = 528. Fold 29 (270 against 258) is
//    still the only fold in reach at which the loose and refined certificates
//    differ at all. `verify-tailcount-transport.md` names "is M_alt always
//    G2" as its open question; this is one more affirmative fold and no
//    counterexample, and it is worth saying that the LOOSE certificate, the
//    one the published inequality actually uses, did not degrade either.
//
// 4. THE STRONGEST CUSTODY IN THE RUN IS A COUNT NOBODY ASKED FOR.
//    D(new) = 217,929,355,875 is assembled from two disjoint sources: the
//    L = 0 new gaps, counted as old gaps with multiplicity
//    q - |S_i union S_{i+1}|, plus 12,338,231,614 enumerated maximal kill
//    runs. They have to agree to the unit with D(q-2), and they do, at all
//    seven calibration folds and at fold 37. The value is A059861's term as
//    recorded in `research/oeis-G2-submission.md`.
//
// 5. AND A SECOND ONE: N_new(528) = 2 REPRODUCES THE LADDER'S nmax.
//    `research/exact-g2-ladder.js` records nmax = 2 at x = 37, the number of
//    positions in [0, 37#) attaining the record gap. This run recovers that
//    2 from a histogram of merged run gaps, never visiting a position.
//
// 6. THE ONE-ALIGNMENT-PAIR TRICK IS WHAT MAKES THE PASS AFFORDABLE, AND IT
//    IS EXACT. Slot j extends a live kill run at exactly the two alignments
//    {c_j, c_j+2}, so at most two runs are live at once and one pass over the
//    old tile enumerates every kill run of all q copies. The copy boundary is
//    inside the same pass, because the next physical copy sits at coordinate
//    b - w and a post-roll with residues shifted by +w continues each run
//    across it. The only case the trick does not settle by itself is a run
//    starting at index 0, which is a duplicate of a straddle already counted
//    at b + w unless slot D-1 is alive there; that is repaired explicitly, and
//    the D(new) identity in reading 4 is what proves the repair correct, since
//    a wrong keep-or-drop decision moves the count by one.
//
// 7. THE REQUIRED TRUNCATION INDEX IS 4 AT FOLD 37. The longest run of
//    consecutive qualifying gaps in T_31 is 3, so the L-sum terminates at
//    L = 4 on its own. `verify-tailcount-transport.md` (c) measures the index
//    at 1, 2, 2, 2, 3, 3, 4 at folds 11 to 31 and notes it is rising; it is
//    4 again at 37, and the producer's L <= 8 cutoff still has four to spare.
//
// 8. WHAT THE ALTERNATION WALK REMOVES, MEASURED. 6,341,904,311 windows have
//    qualifying interiors and 6,341,472,275 of them admit a legal walk, a
//    difference of 432,036 windows in 6.34 billion. At fold 37 none of the
//    removed ones was anywhere near the maximum, which is why M_loose and
//    M_alt coincide. That is the quantitative version of "the refinement is
//    free": it costs one state bit and it deletes 7 windows in 100,000.
//
// 9. HONEST LIMITS. Nothing here is a theorem about all levels. The
//    inequality is proven elsewhere in one line and this run only fails to
//    contradict it. The certificates are per-level evaluations. And the
//    rising ratio of reading 2 has no mechanism attached, so it is an
//    observation about eight numbers and not a law.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints (printed value first):
//   6341904311 -> "6.34 billion" in reading 8.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   0.0119 in reading 2 is the mean rise per fold step from 17 to 37 over the
//     printed ratios: (0.9477 - 0.8881) / 5 = 0.01192.
//   432,036 in reading 8 is 6341904311 - 6341472275, both printed on the
//     "windows scored" line.
//   The "7 windows in 100,000" rate in reading 8 is 432036 / 6341904311 scaled
//     to 100,000, which is 6.81 and rounds to 7. The 100,000 is the chosen
//     denominator of the rate, not a measured quantity.
//
// TOKENIZER ARTIFACT, not a figure:
//   059861 in reading 4 is the tail of the OEIS identifier A059861, the
//     sequence named in research/oeis-G2-submission.md.
// ---------------------------------------------------------------------------
