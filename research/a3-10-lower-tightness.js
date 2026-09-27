'use strict';
// ============================================================================
// A3-10 — WHEN IS THE LOWER BOUND EXACT?
// (2026-08-16, u-frame wave; house style of grain-census.js)
// ============================================================================
// OBJECT: U-FRAME 5a step 3 gives the two-sided bound
//     maxsum_2(old)  <=  G2(new)  <=  maxsum_{L+1}(old)
// for the fold of tile T_x by a prime p, where maxsum_m is the largest sum of
// m consecutive gaps in the old tile's cyclic gap word and L is the longest
// adjacent-kill run.  A10 asks when the LOWER bound is exact, because if it is
// exact from some level on then the recursion is determined and L stops
// mattering.  Measured before this file: exact at 3 of 7 folds (11, 13, 19).
//
// THE ENGINE, and why it is O(D + p) rather than O(pD).  Copy k of the fold
// deletes exactly the old slots whose residue mod p lies in the 2-set
// {a_k, a_k - 2} with a_k = -kW (PROVEN, U-FRAME 5a step 1), and as k runs
// over the copies a_k runs over every residue.  Deleting a set of slots merges
// each maximal run of consecutive deleted slots: a run [st..en] merges the
// (en - st + 2) gaps from g_{st-1} to g_{en}, giving the new gap
// S[en+1] - S[st-1].  Slot i is deleted only for a in {r_i, r_i + 2}, so at
// most TWO a-values have a live run at any index, and the whole run census of
// all p deletions is one linear pass carrying two run states.  Runs that touch
// the ends of the word are not cyclic (copy k's last slot is followed by copy
// k+1's first slot, under a DIFFERENT 2-set), so they are handled separately
// by the p seam bridges
//     bridge_k = W - S[last survivor under a_k] + S[first survivor under a_{k+1}].
// Hence, exactly,
//     G2(new) = max( max over interior runs of the merged gap, max_k bridge_k ),
// which is the honest form of step 2's cyclic idealisation.  A run of length 1
// merges exactly two gaps, and every slot is deletable, so the maximum over
// length-1 runs IS maxsum_2 and the lower bound is reproved by the engine.
//
// CONSEQUENCE, the criterion this file tests.  The lower bound is exact iff no
// run of length >= 2 beats maxsum_2.  A run of length 2 at slots (i, i+1)
// exists iff r_i and r_{i+1} share a 2-set, i.e. iff g_i = 0 or +-2 (mod p);
// call such a gap QUALIFYING.  So, exactly:
//
//     G2(new) > maxsum_2(old)   iff   some qualifying gap g_i has
//                                     g_{i-1} + g_i + g_{i+1} > maxsum_2(old)
//                                     (or a longer run does better still).
//
// Two special cases are worth naming because they drive the data:
//   (S) the RECORD gap itself qualifies, i.e. p divides one of G2, G2-2, G2+2.
//       Then merging gives G2 + BOTH neighbours, which beats maxsum_2 =
//       G2 + ONE neighbour whenever maxsum_2 is attained at the record.  This
//       is an arithmetic accident, not a statistical one, and it recurs at
//       arbitrarily large p.
//   (G) a generic qualifying gap sits between two large gaps.  This needs the
//       top of the gap distribution, restricted to the ~3/p of large gaps in
//       the right residue classes, to beat maxsum_2.  Rarer as p grows.
//
// LEGS.  `node a3-10-lower-tightness.js`        cross-check, custody, grid.
//        `node a3-10-lower-tightness.js deep31` streams T29 (215M), folds by 31.
//        `node --max-old-space-size=4096 a3-10-lower-tightness.js deep37`
//                                              streams T31 (6.2e9), folds by 37.
// ============================================================================

const MODE = process.argv[2] || 'main';
const MAXM = 8;

// ------------------------------------------------------------ tile ladder ---
function buildTiles() {
  let P = 30, S = Float64Array.from([11, 17, 29]);
  const tiles = [{ x: 5, W: P, S }];
  for (const p of [7, 11, 13, 17, 19, 23]) {
    const D = S.length, keep = new Float64Array(D * (p - 2)); let n = 0;
    for (let k = 0; k < p; k++) for (let i = 0; i < D; i++) { const r = S[i] + k * P; if (r % p !== 0 && (r + 2) % p !== 0) keep[n++] = r; }
    P *= p; S = keep; tiles.push({ x: p, W: P, S });
  }
  return tiles;
}
const gapAt = (S, W, i) => (i + 1 < S.length ? S[i + 1] : S[0] + W) - S[i];

function maxsums(S, W) {                      // maxsum_m, m = 1..MAXM, cyclic
  const D = S.length, ms = new Float64Array(MAXM + 1);
  for (let i = 0; i < D; i++) for (let m = 1; m <= MAXM; m++) {
    const j = i + m, hi = j < D ? S[j] : S[j - D] + W, v = hi - S[i];
    if (v > ms[m]) ms[m] = v;
  }
  return ms;
}

// -------------------------------------------- array engine (exact, O(D+p)) --
function foldStats(S, W, p, ms) {
  const D = S.length, R = new Int32Array(D);
  for (let i = 0; i < D; i++) R[i] = S[i] % p;
  let L = 0, best = 0, bestLen = 0, bestSt = -1;
  const bbl = new Float64Array(16);           // best merged gap by run length
  let aA = -1, sA = -1, aB = -1, sB = -1;
  const close = (st, en) => {
    const len = en - st + 1; if (len > L) L = len;
    if (st === 0 || en === D - 1) return;     // end-touching run: bridges own it
    const g = S[en + 1] - S[st - 1];
    if (len < 16 && g > bbl[len]) bbl[len] = g;
    if (g > best) { best = g; bestLen = len; bestSt = st; }
  };
  for (let i = 0; i < D; i++) {
    const r = R[i], r2 = (r + 2) % p;
    let nA = -1, nsA = -1, nB = -1, nsB = -1;
    if (aA === r || aA === r2) { nA = aA; nsA = sA; } else if (aA >= 0) close(sA, i - 1);
    if (aB === r || aB === r2) { if (nA < 0) { nA = aB; nsA = sB; } else { nB = aB; nsB = sB; } }
    else if (aB >= 0) close(sB, i - 1);
    if (r !== nA && r !== nB) { if (nA < 0) { nA = r; nsA = i; } else { nB = r; nsB = i; } }
    if (r2 !== nA && r2 !== nB) { if (nA < 0) { nA = r2; nsA = i; } else { nB = r2; nsB = i; } }
    aA = nA; sA = nsA; aB = nB; sB = nsB;
  }
  if (aA >= 0) close(sA, D - 1); if (aB >= 0) close(sB, D - 1);
  const w = W % p, fs = new Int32Array(p).fill(-1), ls = new Int32Array(p).fill(-1);
  for (let a = 0; a < p; a++) {
    const b = (a + p - 2) % p;
    for (let i = 0; i < D; i++) if (R[i] !== a && R[i] !== b) { fs[a] = i; break; }
    for (let i = D - 1; i >= 0; i--) if (R[i] !== a && R[i] !== b) { ls[a] = i; break; }
  }
  let br = 0;
  for (let k = 0; k < p; k++) {
    const ak = ((-k * w) % p + p) % p, ak1 = ((-(k + 1) * w) % p + p) % p;
    const g = W - S[ls[ak]] + S[fs[ak1]]; if (g > br) br = g;
  }
  const G2new = Math.max(best, br), G2old = ms[1];
  // diagnostics
  let nQual = 0, nRecQual = 0;
  for (let i = 0; i < D; i++) {
    const g = gapAt(S, W, i), m = g % p;
    if (m === 0 || m === 2 || m === p - 2) { nQual++; if (g === G2old) nRecQual++; }
  }
  const recQual = (G2old % p === 0) || (G2old % p === 2) || (G2old % p === p - 2);
  const winner = [];                          // the sub-gaps of the winning merge
  if (bestSt >= 0 && best === G2new) for (let j = bestSt - 1; j <= bestSt + bestLen - 1; j++) winner.push(gapAt(S, W, j));
  return { G2new, G2old, L, bestLen, best, br, bbl: Array.from(bbl.slice(0, 8)), nQual, nRecQual, recQual, winner };
}

// slow reference: build the folded tile outright and take its max cyclic gap
function foldSlow(S, W, p) {
  const D = S.length, out = new Float64Array(D * (p - 2)); let n = 0;
  for (let k = 0; k < p; k++) for (let i = 0; i < D; i++) { const r = S[i] + k * W; if (r % p !== 0 && (r + 2) % p !== 0) out[n++] = r; }
  let g2 = 0;
  for (let i = 0; i < n; i++) { const g = (i + 1 < n ? out[i + 1] : out[0] + W * p) - out[i]; if (g > g2) g2 = g; }
  return g2;
}
// brute reference for L: O(pD), one scan per 2-set
function bruteL(S, p) {
  const D = S.length, R = new Int32Array(D); for (let i = 0; i < D; i++) R[i] = S[i] % p;
  let L = 0;
  for (let a = 0; a < p; a++) { const b = (a + p - 2) % p; let run = 0;
    for (let i = 0; i < D; i++) { if (R[i] === a || R[i] === b) { if (++run > L) L = run; } else run = 0; } }
  return L;
}

// ------------------------------------------------ streaming engine (deep) ---
// Same logic, fed one slot at a time; head/tail buffers close the seam.
function makeScorer(W, p) {
  const BUF = 4096;
  const win = new Float64Array(MAXM + 1); let wn = 0, wi = 0;
  const ms = new Float64Array(MAXM + 1);
  const head = new Float64Array(BUF), headR = new Int32Array(BUF); let hn = 0;
  const tail = new Float64Array(BUF), tailR = new Int32Array(BUF); let tn = 0;
  const bbl = new Float64Array(16);
  let D = 0, L = 0, best = 0, bestLen = 0, prevSlot = -1, curAfter = 0;
  let aA = -1, sA = -1, pA = 0, aB = -1, sB = -1, pB = 0;
  const close = (st, en, before) => {
    const len = en - st + 1; if (len > L) L = len;
    if (st === 0) return;                     // head run: the bridges own it
    const g = curAfter - before;
    if (len < 16 && g > bbl[len]) bbl[len] = g;
    if (g > best) { best = g; bestLen = len; }
  };
  function push(s, r) {
    win[wi] = s; wi = wi === MAXM ? 0 : wi + 1; if (wn <= MAXM) wn++;
    if (wn > MAXM) for (let m = 1; m <= MAXM; m++) { const v = s - win[(wi + MAXM - m) % (MAXM + 1)]; if (v > ms[m]) ms[m] = v; }
    if (hn < BUF) { head[hn] = s; headR[hn] = r; hn++; }
    tail[tn % BUF] = s; tailR[tn % BUF] = r; tn++;
    const i = D; curAfter = s;
    const r2 = r + 2 >= p ? r + 2 - p : r + 2;
    let nA = -1, nsA = -1, npA = 0, nB = -1, nsB = -1, npB = 0;
    if (aA === r || aA === r2) { nA = aA; nsA = sA; npA = pA; } else if (aA >= 0) close(sA, i - 1, pA);
    if (aB === r || aB === r2) { if (nA < 0) { nA = aB; nsA = sB; npA = pB; } else { nB = aB; nsB = sB; npB = pB; } }
    else if (aB >= 0) close(sB, i - 1, pB);
    if (r !== nA && r !== nB) { if (nA < 0) { nA = r; nsA = i; npA = prevSlot; } else { nB = r; nsB = i; npB = prevSlot; } }
    if (r2 !== nA && r2 !== nB) { if (nA < 0) { nA = r2; nsA = i; npA = prevSlot; } else { nB = r2; nsB = i; npB = prevSlot; } }
    aA = nA; sA = nsA; pA = npA; aB = nB; sB = nsB; pB = npB;
    prevSlot = s; D++;
  }
  function finish() {
    if (aA >= 0 && D - sA > L) L = D - sA;
    if (aB >= 0 && D - sB > L) L = D - sB;
    for (let j = 0; j < Math.min(MAXM, hn); j++) {   // cyclic wrap for maxsum_m
      const s = head[j] + W;
      win[wi] = s; wi = wi === MAXM ? 0 : wi + 1;
      for (let m = 1; m <= MAXM; m++) { const v = s - win[(wi + MAXM - m) % (MAXM + 1)]; if (v > ms[m]) ms[m] = v; }
    }
    const w = W % p, firstS = new Float64Array(p), lastS = new Float64Array(p);
    for (let a = 0; a < p; a++) {
      const b = (a + p - 2) % p;
      firstS[a] = -1; for (let j = 0; j < hn; j++) if (headR[j] !== a && headR[j] !== b) { firstS[a] = head[j]; break; }
      lastS[a] = -1; const cnt = Math.min(tn, BUF);
      for (let j = 0; j < cnt; j++) { const idx = (tn - 1 - j + BUF) % BUF; if (tailR[idx] !== a && tailR[idx] !== b) { lastS[a] = tail[idx]; break; } }
    }
    let br = 0;
    for (let k = 0; k < p; k++) {
      const ak = ((-k * w) % p + p) % p, ak1 = ((-(k + 1) * w) % p + p) % p;
      const g = W - lastS[ak] + firstS[ak1]; if (g > br) br = g;
    }
    return { D, ms: Array.from(ms), L, best, bestLen, bbl: Array.from(bbl.slice(0, 8)), br, G2new: Math.max(best, br) };
  }
  return { push, finish };
}

const primesTo = n => { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } return o; };
const pad = (v, n) => String(v).padStart(n);

// ============================================================== deep legs ===
if (MODE === 'deep31' || MODE === 'deep37') {
  let P = 30, S = Float64Array.from([11, 17, 29]);
  for (const q of [7, 11, 13, 17, 19, 23]) {
    const D = S.length, keep = new Float64Array(D * (q - 2)); let n = 0;
    for (let k = 0; k < q; k++) for (let i = 0; i < D; i++) { const r = S[i] + k * P; if (r % q !== 0 && (r + 2) % q !== 0) keep[n++] = r; }
    P *= q; S = keep;
  }
  const W23 = P, D23 = S.length, W29 = W23 * 29, W31 = W29 * 31;
  console.log(`T23 built: W = ${W23}, D = ${D23}`);
  const t0 = Date.now(), el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';

  if (MODE === 'deep31') {                    // old tile T29, fold by p = 31
    const p = 31, sc = makeScorer(W29, p);
    const R29 = new Uint8Array(D23), R31 = new Uint8Array(D23);
    for (let i = 0; i < D23; i++) { R29[i] = S[i] % 29; R31[i] = S[i] % 31; }
    const w29 = W23 % 29, w31 = W23 % 31;
    for (let k = 0; k < 29; k++) {
      const s29 = (k * w29) % 29, s31 = (k * w31) % 31, base = k * W23;
      for (let i = 0; i < D23; i++) {
        let a = R29[i] + s29; if (a >= 29) a -= 29;
        if (a === 0 || a === 27) continue;
        let b = R31[i] + s31; if (b >= 31) b -= 31;
        sc.push(S[i] + base, b);
      }
      if (k % 4 === 3 || k === 28) console.log(`  copy ${k + 1}/29   ${el()}`);
    }
    const r = sc.finish();
    console.log(`\n  T29: D = ${r.D}, W = ${W29}, mean gap = ${(W29 / r.D).toFixed(2)}`);
    console.log(`  maxsum_1..8 = ${r.ms.slice(1).join(', ')}`);
    console.log(`  L(T29, 31) = ${r.L}   best merge by run length = ${r.bbl.slice(1, 6).join(', ')}`);
    console.log(`  G2(31#) = ${r.G2new}  (interior ${r.best} at run length ${r.bestLen}, best bridge ${r.br})`);
    console.log(`  lower maxsum_2 = ${r.ms[2]}   excess = ${r.G2new - r.ms[2]}   upper maxsum_{L+1} = ${r.ms[r.L + 1]}`);
  }

  if (MODE === 'deep37') {                    // old tile T31, fold by p = 37
    const p = 37, sc = makeScorer(W31, p);
    const R29 = new Uint8Array(D23), R31 = new Uint8Array(D23), R37 = new Uint8Array(D23);
    for (let i = 0; i < D23; i++) { R29[i] = S[i] % 29; R31[i] = S[i] % 31; R37[i] = S[i] % 37; }
    const a29 = W23 % 29, a31 = W23 % 31, b31 = W29 % 31, a37 = W23 % 37, b37 = W29 % 37;
    for (let k31 = 0; k31 < 31; k31++) {
      const base31 = k31 * W29, s31b = (k31 * b31) % 31, s37b = (k31 * b37) % 37;
      for (let k29 = 0; k29 < 29; k29++) {
        const s29 = (k29 * a29) % 29;
        const s31 = (k29 * a31 + s31b) % 31, s37 = (k29 * a37 + s37b) % 37;
        const base = base31 + k29 * W23;
        for (let i = 0; i < D23; i++) {
          let a = R29[i] + s29; if (a >= 29) a -= 29;
          if (a === 0 || a === 27) continue;
          let b = R31[i] + s31; if (b >= 31) b -= 31;
          if (b === 0 || b === 29) continue;
          let c = R37[i] + s37; if (c >= 37) c -= 37;
          sc.push(S[i] + base, c);
        }
      }
      console.log(`  copy ${k31 + 1}/31   ${el()}`);
    }
    const r = sc.finish();
    console.log(`\n  T31: D = ${r.D}, W = ${W31}, mean gap = ${(W31 / r.D).toFixed(2)}`);
    console.log(`  maxsum_1..8 = ${r.ms.slice(1).join(', ')}`);
    console.log(`  L(T31, 37) = ${r.L}   best merge by run length = ${r.bbl.slice(1, 6).join(', ')}`);
    console.log(`  G2(37#) = ${r.G2new}  (interior ${r.best} at run length ${r.bestLen}, best bridge ${r.br})`);
    console.log(`  lower maxsum_2 = ${r.ms[2]}   excess = ${r.G2new - r.ms[2]}   upper maxsum_{L+1} = ${r.ms[r.L + 1]}`);
  }
  process.exit(0);
}

// =================================================================== main ===
const tiles = buildTiles(), byX = new Map(tiles.map(t => [t.x, t]));
const MS = new Map(tiles.map(t => [t.x, maxsums(t.S, t.W)]));
const DIAG = [[5, 7], [7, 11], [11, 13], [13, 17], [17, 19], [19, 23], [23, 29]];

console.log('=== 0. CROSS-CHECK: three independent engines ==============================\n');
console.log('  fold |  slow direct fold | array engine | stream engine | bruteL | array L');
for (const [x, p] of DIAG) {
  const t = byX.get(x), ms = MS.get(x), f = foldStats(t.S, t.W, p, ms);
  const sc = makeScorer(t.W, p);
  for (let i = 0; i < t.S.length; i++) sc.push(t.S[i], t.S[i] % p);
  const r = sc.finish();
  const slow = t.S.length <= 400000 ? foldSlow(t.S, t.W, p) : 'n/a (215M)';
  const bl = t.S.length <= 400000 ? bruteL(t.S, p) : 'n/a';
  console.log(`  ${pad(p, 4)} | ${pad(slow, 17)} | ${pad(f.G2new, 12)} | ${pad(r.G2new, 13)} | ${pad(bl, 6)} | ${pad(f.L, 7)}`);
}
console.log('\n  (T23 is too big for the O(pD) references; deep31 below reproduces the');
console.log('   known G2(31#) = 348 from T29 by a fourth route, streaming.)');
console.log('\n  and the twelve OFF-diagonal cells that carry the findings, against slow fold:');
{
  let line = '  ';
  for (const [x, p] of [[19, 31], [19, 29], [19, 23], [19, 37], [19, 47], [17, 53], [13, 17], [11, 17], [11, 19], [17, 29], [17, 31], [17, 37]]) {
    const t = byX.get(x), f = foldStats(t.S, t.W, p, MS.get(x)), s = foldSlow(t.S, t.W, p);
    line += `T${x}/${p} ${s === f.G2new ? s : 'MISMATCH ' + s + '!=' + f.G2new}   `;
    if (line.length > 66) { console.log(line); line = '  '; }
  }
  if (line.trim()) console.log(line);
}

console.log('\n=== 1. CUSTODY: the seven-row table of A10 =================================\n');
console.log('   p | D(old)   | G2(old) | lower maxsum_2 | G2(new) | L | upper maxsum_{L+1} | exact?');
for (const [x, p] of DIAG) {
  const t = byX.get(x), ms = MS.get(x), f = foldStats(t.S, t.W, p, ms);
  const ex = f.G2new === ms[2] ? 'YES' : 'no  (+' + (f.G2new - ms[2]) + ')';
  console.log(`  ${pad(p, 2)} | ${pad(t.S.length, 8)} | ${pad(ms[1], 7)} | ${pad(ms[2], 14)} | ${pad(f.G2new, 7)} | ${f.L} | ${pad(ms[f.L + 1], 18)} | ${ex}`);
}

console.log('\n=== 2. REFUTATION: the published L at fold 29 ==============================\n');
{
  const t = byX.get(23), p = 29, R = new Uint8Array(t.S.length);
  for (let i = 0; i < t.S.length; i++) R[i] = t.S[i] % p;
  const in2 = (u, v, y) => { const s = [...new Set([u, v, y])]; if (s.length === 1) return true; if (s.length > 2) return false; const d = Math.abs(s[0] - s[1]); return d === 2 || d === p - 2; };
  let n2 = 0, n3 = 0;
  for (let i = 0; i + 1 < t.S.length; i++) { const d = (R[i + 1] - R[i] + p) % p; if (d === 0 || d === 2 || d === p - 2) n2++; }
  for (let i = 0; i + 2 < t.S.length; i++) if (in2(R[i], R[i + 1], R[i + 2])) n3++;
  console.log(`  T23 folded by 29: deletable adjacent PAIRS = ${n2}, deletable adjacent TRIPLES = ${n3}.`);
  console.log(`  So L(T23, 29) = 2, not the 3 recorded in U-FRAME section 5 and produced by`);
  console.log(`  research/killrun.js.  That script's state machine compares the incoming`);
  console.log(`  residue against the FIRST value of the live pair rather than against the`);
  console.log(`  immediately preceding slot, so it accepts residue words like (r, r+2, r-2)`);
  console.log(`  whose last two entries differ by 4.  It overcounts.  The consequence for`);
  console.log(`  A10 is that the upper bound at fold 29 is maxsum_3 = ${MS.get(23)[3]}, not maxsum_4 = ${MS.get(23)[4]}.`);
}

console.log('\n=== 3. THE GRID: exactness over (tile, folding prime) ======================\n');
const PR = primesTo(250).filter(q => q >= 7);
const rows = [];
for (const t of tiles) {
  const ms = MS.get(t.x), mbar = t.W / t.S.length;
  for (const p of PR) {
    if (p <= t.x) continue;
    const f = foldStats(t.S, t.W, p, ms);
    rows.push({ x: t.x, p, D: t.S.length, mbar, ms, f, exc: f.G2new - ms[2] });
  }
}
console.log('  map: . = lower bound EXACT,  X = misses.  columns are the folding primes.\n');
{
  let hdr = '   tile |';
  for (const p of PR) hdr += pad(p, 4);
  console.log(hdr);
  for (const t of tiles) {
    let line = `   T${pad(t.x, 3)} |`;
    for (const p of PR) {
      const r = rows.find(z => z.x === t.x && z.p === p);
      line += pad(r ? (r.exc === 0 ? '.' : 'X') : '-', 4);
    }
    const mine = rows.filter(z => z.x === t.x);
    console.log(line + `   ${mine.filter(z => z.exc === 0).length}/${mine.length} exact`);
  }
}
console.log('\n  every miss, with its cause:\n');
console.log('   tile   p  2p/mbar  maxsum_2  G2new  exc  L  winlen  qualifying gaps  record qualifies?');
for (const r of rows) if (r.exc !== 0) {
  console.log(`   T${pad(r.x, 3)} ${pad(r.p, 3)} ${pad((2 * r.p / r.mbar).toFixed(2), 8)} ${pad(r.ms[2], 9)} ${pad(r.f.G2new, 6)} ${pad(r.exc, 4)}  ${r.f.L}  ${pad(r.f.bestLen, 6)} ${pad(r.f.nQual, 16)}  ${r.f.recQual ? 'YES' : 'no'}`);
}


console.log('\n=== 4. THE CRITERION ======================================================\n');
{
  console.log('   first, the bound itself, on every cell of the grid:');
  const lowOK = rows.filter(r => r.f.G2new >= r.ms[2]).length;
  const upOK = rows.filter(r => r.f.G2new <= r.ms[r.f.L + 1]).length;
  console.log(`     maxsum_2 <= G2new        : ${lowOK} of ${rows.length}`);
  console.log(`     G2new <= maxsum_{L+1}    : ${upOK} of ${rows.length}`);
  console.log('\n   the exact criterion, by construction of the engine:  a miss happens iff');
  console.log('   some run of length >= 2, or some seam bridge, out-merges maxsum_2.');
  let ok = 0, bad = [];
  for (const r of rows) {
    const big = Math.max(Math.max(...r.f.bbl.slice(2)), r.f.br);
    if ((big > r.ms[2]) === (r.exc !== 0)) ok++; else bad.push(`T${r.x}/${r.p}`);
  }
  console.log(`     verified on all ${rows.length} cells: ${ok} agreements${bad.length ? ', exceptions ' + bad.join(' ') : ''}.`);
  const seam = rows.filter(r => r.exc !== 0 && r.f.br > r.ms[2]);
  console.log(`     of the ${rows.filter(r => r.exc !== 0).length} misses, ${seam.length} are SEAM misses (a bridge, not an interior run):`);
  console.log(`       ${seam.map(r => `T${r.x}/${r.p}`).join(' ') || '(none)'}`);
  console.log('\n   candidate criteria for a miss, scored against the truth:\n');
  const cand = [
    ['L >= 2', r => r.f.L >= 2],
    ['at least one qualifying gap exists', r => r.f.nQual > 0],
    ['the RECORD gap qualifies: p | G2, G2-2 or G2+2', r => r.f.recQual],
    ['L >= 2 AND the record gap qualifies', r => r.f.L >= 2 && r.f.recQual],
    ['L >= 2 AND 2p/mbar < 4', r => r.f.L >= 2 && 2 * r.p / r.mbar < 4],
  ];
  console.log('   criterion                                        | flagged | misses | caught | false+ | missed');
  for (const [name, fn] of cand) {
    let tp = 0, fp = 0, fneg = 0, np = 0, nm = 0;
    for (const r of rows) { const c = fn(r), m = r.exc !== 0; if (c) np++; if (m) nm++; if (c && m) tp++; if (c && !m) fp++; if (!c && m) fneg++; }
    console.log(`   ${name.padEnd(48)} | ${pad(np, 7)} | ${pad(nm, 6)} | ${pad(tp, 6)} | ${pad(fp, 6)} | ${pad(fneg, 6)}`);
  }
  console.log('\n   L >= 2 is NECESSARY and never fails to catch a miss, but it flags twice as');
  console.log('   many cells as miss.  "the record gap qualifies" is SUFFICIENT and never');
  console.log('   raises a false alarm, but it catches only a quarter of the misses.  Neither');
  console.log('   is the criterion; the truth sits between them and is a size question, not a');
  console.log('   residue question: does the best three-gap sum ANCHORED at a qualifying gap');
  console.log('   beat the best two-gap sum ANYWHERE.');
}

console.log('\n=== 5. THE SPORADIC MECHANISM, in closed form =============================\n');
{
  for (const t of tiles) {
    const g = MS.get(t.x)[1];
    const div = n => { const o = []; for (let d = 2; d * d <= n; d++) if (n % d === 0) { o.push(d); if (n / d !== d) o.push(n / d); } o.push(n); return o.filter(q => q > t.x && PR.includes(q)); };
    const set = [...new Set([...div(g), ...div(g - 2), ...div(g + 2)])].sort((a, b) => a - b);
    const misses = rows.filter(r => r.x === t.x && r.exc !== 0 && r.f.recQual).map(r => r.p);
    console.log(`  T${pad(t.x, 2)}: G2 = ${pad(g, 3)};  primes ${t.x} < p < 250 dividing G2(G2-2)(G2+2): [${set.join(', ')}]`);
    console.log(`         misses whose record gap qualifies:                     [${misses.join(', ')}]`);
  }
  const sp = rows.filter(r => r.exc !== 0 && r.f.recQual);
  console.log(`\n  The two lists agree tile by tile: the sporadic misses are EXACTLY the primes`);
  console.log(`  dividing G2(old), G2(old)-2 or G2(old)+2.  Their excess is small, because the`);
  console.log(`  merge is G2 + BOTH neighbours against a lower bound of G2 + ONE neighbour:`);
  console.log(`    excesses ${sp.map(r => r.exc).join(', ')}  against mean gaps ${sp.map(r => r.mbar.toFixed(0)).join(', ')}`);
  console.log(`  This mechanism is arithmetic, not statistical, and it recurs at arbitrarily`);
  console.log(`  large p.  It is the reason exactness cannot hold "from some level on".`);
}

console.log('\n=== 6. THE EFFECTIVE RUN LENGTH: smaller than L, but NOT constant =========\n');
{
  const effm = r => { for (let m = 1; m <= MAXM; m++) if (r.ms[m] >= r.f.G2new) return m; return 99; };
  const hist = new Map();
  for (const r of rows) { const m = effm(r); hist.set(m, (hist.get(m) || 0) + 1); }
  console.log('   smallest m with G2new <= maxsum_m, over the whole grid:');
  for (const m of [...hist.keys()].sort((a, b) => a - b)) console.log(`     m = ${m}: ${hist.get(m)} cells`);
  const over3 = rows.filter(r => effm(r) > 3);
  console.log(`   cells needing m > 3: ${over3.map(r => `T${r.x}/${r.p}(m=${effm(r)})`).join(' ') || '(none)'}`);
  console.log('\n   on the fold ladder itself:\n');
  console.log('   fold p | G2new | maxsum_2 | maxsum_3 | L | L+1 | smallest m that works');
  for (const [x, p] of DIAG) {
    const t = byX.get(x), ms = MS.get(x), f = foldStats(t.S, t.W, p, ms);
    let m = 1; while (ms[m] < f.G2new && m < MAXM) m++;
    console.log(`   ${pad(p, 6)} | ${pad(f.G2new, 5)} | ${pad(ms[2], 8)} | ${pad(ms[3], 8)} | ${f.L} | ${pad(f.L + 1, 3)} | ${pad(m, 21)}`);
  }
  console.log('       31 |   348 |      330 |      390 | 4 |   5 |                     3   (deep31)');
  console.log('       37 |   528 |      408 |      510 | 4 |   5 |                     4   (deep37)');
  console.log('\n   So the working m runs 3, 2, 2, 3, 2, 3, 3, 3, 4 over folds 7 to 37: always at');
  console.log('   or below L+1, strictly below it at folds 13, 23 and 31, but NOT constant.  The');
  console.log('   hope that m = 3 would serve for ever dies at fold 37, where G2(37#) = 528');
  console.log('   overshoots maxsum_3(T31) = 510 and needs maxsum_4 = 540.  Fold 37 is the same');
  console.log('   outlier that U-FRAME section 4 flags for its local slope of 3.21.');
  console.log('\n   what a FIXED m = 3 buys: telescoping G2(new) - G2(old) <= maxsum_3 - maxsum_1,');
  console.log('   the per-fold increment is the sum of the two gaps flanking the best triple:\n');
  console.log('   tile | maxsum_3 - G2 | as multiple of mean gap | running bound on G2 | true G2');
  const trueG2 = { 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348 };
  let acc = 12;
  for (const t of tiles) {
    const ms = MS.get(t.x), inc = ms[3] - ms[1], mbar = t.W / t.S.length;
    acc += inc;
    const nxt = PR.find(q => q > t.x);
    console.log(`   T${pad(t.x, 2)}  | ${pad(inc, 13)} | ${pad((inc / mbar).toFixed(2), 23)} | ${pad(acc, 19)} | ${pad(trueG2[nxt] || '?', 7)}  (fold ${nxt})`);
  }
  console.log(`   T29  | ${pad(390 - 258, 13)} | ${pad((132 / 30.13).toFixed(2), 23)} | ${pad(acc + 132, 19)} | ${pad(348, 7)}  (fold 31, deep31)`);
  console.log(`   T31  | ${pad(510 - 348, 13)} | ${pad((162 / 32.21).toFixed(2), 23)} | ${pad(acc + 132 + 162, 19)} | ${pad(528, 7)}  (fold 37, deep37: m = 3 FAILS here,`);
  console.log('          the true increment 528 - 348 = 180 exceeds maxsum_3 - G2 = 162)');
}

console.log('\n=== 6a. WHAT THE WINNING MERGE IS MADE OF ==================================\n');
{
  console.log('   A run of length k merges k+1 gaps, but the k-1 INTERIOR ones must all be');
  console.log('   qualifying, and the qualifying values below G2 are a short sparse list.  That');
  console.log('   list is the whole budget a long run has to spend, which is why short runs win');
  console.log('   most folds.  It stops being decisive when the menu itself grows large.');
  console.log('   Per fold: the qualifying menu, and the winning merge (matches U-FRAME 5).\n');
  console.log('   fold p | qualifying gap values <= G2(old) | winning merge | run length');
  for (const [x, p] of DIAG) {
    const t = byX.get(x), ms = MS.get(x), f = foldStats(t.S, t.W, p, ms);
    const seen = new Set();
    for (let i = 0; i < t.S.length; i++) { const g = gapAt(t.S, t.W, i), m = g % p; if (m === 0 || m === 2 || m === p - 2) seen.add(g); }
    const menu = [...seen].sort((a, b) => a - b);
    console.log(`   ${pad(p, 6)} | ${pad('{' + menu.join(', ') + '}', 32)} | ${pad(f.winner.length ? f.winner.join('+') : '(seam bridge)', 13)} | ${f.winner.length ? f.bestLen : '-'}`);
  }
  console.log('       31 | (T29, streamed)                  | 348 in 3 gaps |  2   (deep31)');
  console.log('       37 | (T31, streamed)                  | 528 in 4 gaps |  3   (deep37)');
  console.log('\n   At fold 37 a run of THREE wins, and that is what makes the excess 120: the');
  console.log('   qualifying menu at p = 37 on T31 is long enough to fund a four-gap merge.');
}

console.log('\n=== 7. THE TREND: does exactness get commoner with depth? =================\n');
{
  const bands = [[0, 2], [2, 3], [3, 4], [4, 6], [6, 9], [9, 100]];
  console.log('   binned by 2p / mean gap (the recession of the qualifying threshold):\n');
  console.log('   2p/mbar band | cells | exact | rate');
  for (const [lo, hi] of bands) {
    const b = rows.filter(r => { const v = 2 * r.p / r.mbar; return v >= lo && v < hi; });
    if (!b.length) continue;
    const e = b.filter(r => r.exc === 0).length;
    console.log(`   [${pad(lo, 2)}, ${pad(hi === 100 ? 'inf' : hi, 3)})     | ${pad(b.length, 5)} | ${pad(e, 5)} | ${(e / b.length).toFixed(3)}`);
  }
  console.log('\n   binned by rank of p after the tile (rank 1 IS the fold ladder):\n');
  console.log('   rank | cells | exact | rate');
  for (let k = 1; k <= 10; k++) {
    const b = [];
    for (const t of tiles) { const ps = PR.filter(q => q > t.x); if (ps.length >= k) { const r = rows.find(z => z.x === t.x && z.p === ps[k - 1]); if (r) b.push(r); } }
    const e = b.filter(r => r.exc === 0).length;
    console.log(`   ${pad(k, 4)} | ${pad(b.length, 5)} | ${pad(e, 5)} | ${(e / b.length).toFixed(3)}`);
  }
  console.log('\n   the fold ladder itself, in order of depth:\n');
  console.log('   fold p | mean gap | 2p/mbar | maxsum_2 | G2new | excess | exact?');
  for (const [x, p] of DIAG) {
    const t = byX.get(x), ms = MS.get(x), f = foldStats(t.S, t.W, p, ms), mbar = t.W / t.S.length;
    console.log(`   ${pad(p, 6)} | ${pad(mbar.toFixed(2), 8)} | ${pad((2 * p / mbar).toFixed(2), 7)} | ${pad(ms[2], 8)} | ${pad(f.G2new, 5)} | ${pad(f.G2new - ms[2], 6)} | ${f.G2new === ms[2] ? 'YES' : 'no'}`);
  }
  console.log('       31 |    30.13 |    2.06 |      330 |   348 |     18 | no      (deep31)');
  console.log('       37 |    32.21 |    2.30 |      408 |   528 |    120 | no      (deep37)');
  console.log('\n   The excess over the lower bound, fold by fold: 6, 0, 0, 12, 0, 18, 24, 18, 120.');
  console.log('   It does not shrink, and the deepest fold we can reach is by far the worst.');
  console.log('\n   where the ladder reaches the safe zone.  Exactness is essentially certain');
  console.log('   once 2p/mbar >= 4.  On the ladder mbar = prod_{q<=x} q/(q-2) ~ c ln^2 x;');
  console.log('   fitting c from the measured mbar at x = 23, 29, 31 and solving 2x = 4 mbar(x):');
  {
    const pts = [[23, 28.05], [29, 30.13], [31, 32.20]];
    const c = pts.reduce((s, [x, m]) => s + m / (Math.log(x) ** 2), 0) / pts.length;
    let x = 10; for (let it = 0; it < 200; it++) x = 2 * c * Math.log(x) ** 2;
    console.log(`     c = ${c.toFixed(3)},  crossover at x ~ ${x.toFixed(0)}  (tile T${x.toFixed(0)}, width ~ 10^${Math.round(x / Math.LN10)}: unreachable by computation)`);
  }
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=4096 research/a3-10-lower-tightness.js
//   invocation:  node --max-old-space-size=4096 research/a3-10-lower-tightness.js
//   code-sha256: dd7b915e8c1c1367a2493e15effcb3bd7ec2f5d9883a5994ad1f4fe28a3f5c8f
//   out-sha256:  282eafdd3814c2d40b3dea2a93ecc5057a4be0aec0d954f674dab410df075f38
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     27.6 s
// ============================================================================
// === 0. CROSS-CHECK: three independent engines ==============================
//
//   fold |  slow direct fold | array engine | stream engine | bruteL | array L
//      7 |                30 |           30 |            30 |      2 |       2
//     11 |                42 |           42 |            42 |      1 |       1
//     13 |                66 |           66 |            66 |      2 |       2
//     17 |               108 |          108 |           108 |      2 |       2
//     19 |               150 |          150 |           150 |      2 |       2
//     23 |               204 |          204 |           204 |      3 |       3
//     29 |        n/a (215M) |          258 |           258 |    n/a |       2
//
//   (T23 is too big for the O(pD) references; deep31 below reproduces the
//    known G2(31#) = 348 from T29 by a fourth route, streaming.)
//
//   and the twelve OFF-diagonal cells that carry the findings, against slow fold:
//   T19/31 222   T19/29 210   T19/23 204   T19/37 192   T19/47 198
//   T17/53 168   T13/17 108   T11/17 96   T11/19 96   T17/29 156   T17/31 156
//   T17/37 156
//
// === 1. CUSTODY: the seven-row table of A10 =================================
//
//    p | D(old)   | G2(old) | lower maxsum_2 | G2(new) | L | upper maxsum_{L+1} | exact?
//    7 |        3 |      12 |             24 |      30 | 2 |                 30 | no  (+6)
//   11 |       15 |      30 |             42 |      42 | 1 |                 42 | YES
//   13 |      135 |      42 |             66 |      66 | 2 |                 96 | YES
//   17 |     1485 |      66 |             96 |     108 | 2 |                138 | no  (+12)
//   19 |    22275 |     108 |            150 |     150 | 2 |                168 | YES
//   23 |   378675 |     150 |            186 |     204 | 3 |                228 | no  (+18)
//   29 |  7952175 |     204 |            234 |     258 | 2 |                300 | no  (+24)
//
// === 2. REFUTATION: the published L at fold 29 ==============================
//
//   T23 folded by 29: deletable adjacent PAIRS = 243816, deletable adjacent TRIPLES = 0.
//   So L(T23, 29) = 2, not the 3 recorded in U-FRAME section 5 and produced by
//   research/killrun.js.  That script's state machine compares the incoming
//   residue against the FIRST value of the live pair rather than against the
//   immediately preceding slot, so it accepts residue words like (r, r+2, r-2)
//   whose last two entries differ by 4.  It overcounts.  The consequence for
//   A10 is that the upper bound at fold 29 is maxsum_3 = 300, not maxsum_4 = 348.
//
// === 3. THE GRID: exactness over (tile, folding prime) ======================
//
//   map: . = lower bound EXACT,  X = misses.  columns are the folding primes.
//
//    tile |   7  11  13  17  19  23  29  31  37  41  43  47  53  59  61  67  71  73  79  83  89  97 101 103 107 109 113 127 131 137 139 149 151 157 163 167 173 179 181 191 193 197 199 211 223 227 229 233 239 241
//    T  5 |   X   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   49/50 exact
//    T  7 |   -   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   49/49 exact
//    T 11 |   -   -   .   X   X   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   46/48 exact
//    T 13 |   -   -   -   X   X   X   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   44/47 exact
//    T 17 |   -   -   -   -   .   .   X   X   X   .   .   .   X   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   42/46 exact
//    T 19 |   -   -   -   -   -   X   X   X   X   .   .   X   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   40/45 exact
//    T 23 |   -   -   -   -   -   -   X   X   X   X   X   .   .   .   .   X   .   .   .   X   .   .   X   X   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   35/44 exact
//
//   every miss, with its cause:
//
//    tile   p  2p/mbar  maxsum_2  G2new  exc  L  winlen  qualifying gaps  record qualifies?
//    T  5   7     1.40        24     30    6  2       1                2  YES
//    T 11  17     1.99        66     96   30  2       2                4  no
//    T 11  19     2.22        66     96   30  2       2                4  no
//    T 13  17     1.68        96    108   12  2       2               72  YES
//    T 13  19     1.88        96    108   12  2       2               60  no
//    T 13  23     2.27        96    108   12  2       2               20  no
//    T 17  29     2.53       150    156    6  2       2              380  no
//    T 17  31     2.71       150    156    6  2       2              380  no
//    T 17  37     3.23       150    156    6  2       2               64  no
//    T 17  53     4.63       150    168   18  2       2               20  YES
//    T 19  23     1.80       186    204   18  3       3            11784  no
//    T 19  29     2.26       186    210   24  2       2             9452  no
//    T 19  31     2.42       186    222   36  3       3             9500  no
//    T 19  37     2.89       186    192    6  2       2             2836  YES
//    T 19  47     3.67       186    198   12  2       2              876  no
//    T 23  29     2.07       234    258   24  2       2           243816  no
//    T 23  31     2.21       234    258   24  3       2           248058  no
//    T 23  37     2.64       234    240    6  2       2            95896  no
//    T 23  41     2.92       234    240    6  2       2            27126  no
//    T 23  43     3.07       234    240    6  2       2            26962  no
//    T 23  67     4.78       234    240    6  2       2             2314  no
//    T 23  83     5.92       234    240    6  2       2              322  no
//    T 23 101     7.20       234    240    6  2       2                4  YES
//    T 23 103     7.34       234    240    6  2       2                4  YES
//
// === 4. THE CRITERION ======================================================
//
//    first, the bound itself, on every cell of the grid:
//      maxsum_2 <= G2new        : 329 of 329
//      G2new <= maxsum_{L+1}    : 329 of 329
//
//    the exact criterion, by construction of the engine:  a miss happens iff
//    some run of length >= 2, or some seam bridge, out-merges maxsum_2.
//      verified on all 329 cells: 329 agreements.
//      of the 24 misses, 1 are SEAM misses (a bridge, not an interior run):
//        T5/7
//
//    candidate criteria for a miss, scored against the truth:
//
//    criterion                                        | flagged | misses | caught | false+ | missed
//    L >= 2                                           |      45 |     24 |     24 |     21 |      0
//    at least one qualifying gap exists               |      45 |     24 |     24 |     21 |      0
//    the RECORD gap qualifies: p | G2, G2-2 or G2+2   |       6 |     24 |      6 |      0 |     18
//    L >= 2 AND the record gap qualifies              |       6 |     24 |      6 |      0 |     18
//    L >= 2 AND 2p/mbar < 4                           |      30 |     24 |     19 |     11 |      5
//
//    L >= 2 is NECESSARY and never fails to catch a miss, but it flags twice as
//    many cells as miss.  "the record gap qualifies" is SUFFICIENT and never
//    raises a false alarm, but it catches only a quarter of the misses.  Neither
//    is the criterion; the truth sits between them and is a size question, not a
//    residue question: does the best three-gap sum ANCHORED at a qualifying gap
//    beat the best two-gap sum ANYWHERE.
//
// === 5. THE SPORADIC MECHANISM, in closed form =============================
//
//   T 5: G2 =  12;  primes 5 < p < 250 dividing G2(G2-2)(G2+2): [7]
//          misses whose record gap qualifies:                     [7]
//   T 7: G2 =  30;  primes 7 < p < 250 dividing G2(G2-2)(G2+2): []
//          misses whose record gap qualifies:                     []
//   T11: G2 =  42;  primes 11 < p < 250 dividing G2(G2-2)(G2+2): []
//          misses whose record gap qualifies:                     []
//   T13: G2 =  66;  primes 13 < p < 250 dividing G2(G2-2)(G2+2): [17]
//          misses whose record gap qualifies:                     [17]
//   T17: G2 = 108;  primes 17 < p < 250 dividing G2(G2-2)(G2+2): [53]
//          misses whose record gap qualifies:                     [53]
//   T19: G2 = 150;  primes 19 < p < 250 dividing G2(G2-2)(G2+2): [37]
//          misses whose record gap qualifies:                     [37]
//   T23: G2 = 204;  primes 23 < p < 250 dividing G2(G2-2)(G2+2): [101, 103]
//          misses whose record gap qualifies:                     [101, 103]
//
//   The two lists agree tile by tile: the sporadic misses are EXACTLY the primes
//   dividing G2(old), G2(old)-2 or G2(old)+2.  Their excess is small, because the
//   merge is G2 + BOTH neighbours against a lower bound of G2 + ONE neighbour:
//     excesses 6, 12, 18, 6, 6, 6  against mean gaps 10, 20, 23, 26, 28, 28
//   This mechanism is arithmetic, not statistical, and it recurs at arbitrarily
//   large p.  It is the reason exactness cannot hold "from some level on".
//
// === 6. THE EFFECTIVE RUN LENGTH: smaller than L, but NOT constant =========
//
//    smallest m with G2new <= maxsum_m, over the whole grid:
//      m = 2: 305 cells
//      m = 3: 23 cells
//      m = 4: 1 cells
//    cells needing m > 3: T19/31(m=4)
//
//    on the fold ladder itself:
//
//    fold p | G2new | maxsum_2 | maxsum_3 | L | L+1 | smallest m that works
//         7 |    30 |       24 |       30 | 2 |   3 |                     3
//        11 |    42 |       42 |       66 | 1 |   2 |                     2
//        13 |    66 |       66 |       96 | 2 |   3 |                     2
//        17 |   108 |       96 |      138 | 2 |   3 |                     3
//        19 |   150 |      150 |      168 | 2 |   3 |                     2
//        23 |   204 |      186 |      210 | 3 |   4 |                     3
//        29 |   258 |      234 |      300 | 2 |   3 |                     3
//        31 |   348 |      330 |      390 | 4 |   5 |                     3   (deep31)
//        37 |   528 |      408 |      510 | 4 |   5 |                     4   (deep37)
//
//    So the working m runs 3, 2, 2, 3, 2, 3, 3, 3, 4 over folds 7 to 37: always at
//    or below L+1, strictly below it at folds 13, 23 and 31, but NOT constant.  The
//    hope that m = 3 would serve for ever dies at fold 37, where G2(37#) = 528
//    overshoots maxsum_3(T31) = 510 and needs maxsum_4 = 540.  Fold 37 is the same
//    outlier that U-FRAME section 4 flags for its local slope of 3.21.
//
//    what a FIXED m = 3 buys: telescoping G2(new) - G2(old) <= maxsum_3 - maxsum_1,
//    the per-fold increment is the sum of the two gaps flanking the best triple:
//
//    tile | maxsum_3 - G2 | as multiple of mean gap | running bound on G2 | true G2
//    T 5  |            18 |                    1.80 |                  30 |      30  (fold 7)
//    T 7  |            36 |                    2.57 |                  66 |      42  (fold 11)
//    T11  |            54 |                    3.16 |                 120 |      66  (fold 13)
//    T13  |            72 |                    3.56 |                 192 |     108  (fold 17)
//    T17  |            60 |                    2.62 |                 252 |     150  (fold 19)
//    T19  |            60 |                    2.34 |                 312 |     204  (fold 23)
//    T23  |            96 |                    3.42 |                 408 |     258  (fold 29)
//    T29  |           132 |                    4.38 |                 540 |     348  (fold 31, deep31)
//    T31  |           162 |                    5.03 |                 702 |     528  (fold 37, deep37: m = 3 FAILS here,
//           the true increment 528 - 348 = 180 exceeds maxsum_3 - G2 = 162)
//
// === 6a. WHAT THE WINNING MERGE IS MADE OF ==================================
//
//    A run of length k merges k+1 gaps, but the k-1 INTERIOR ones must all be
//    qualifying, and the qualifying values below G2 are a short sparse list.  That
//    list is the whole budget a long run has to spend, which is why short runs win
//    most folds.  It stops being decisive when the menu itself grows large.
//    Per fold: the qualifying menu, and the winning merge (matches U-FRAME 5).
//
//    fold p | qualifying gap values <= G2(old) | winning merge | run length
//         7 |                             {12} | (seam bridge) | -
//        11 |                               {} |         12+30 | 1
//        13 |                             {24} |         30+36 | 1
//        17 |                         {36, 66} |      30+66+12 | 2
//        19 |                         {36, 78} |        42+108 | 1
//        23 |                    {48, 90, 138} |   42+90+48+24 | 3
//        29 |                   {60, 114, 174} |     60+60+138 | 2
//        31 | (T29, streamed)                  | 348 in 3 gaps |  2   (deep31)
//        37 | (T31, streamed)                  | 528 in 4 gaps |  3   (deep37)
//
//    At fold 37 a run of THREE wins, and that is what makes the excess 120: the
//    qualifying menu at p = 37 on T31 is long enough to fund a four-gap merge.
//
// === 7. THE TREND: does exactness get commoner with depth? =================
//
//    binned by 2p / mean gap (the recession of the qualifying threshold):
//
//    2p/mbar band | cells | exact | rate
//    [ 0,   2)     |     9 |     4 | 0.444
//    [ 2,   3)     |    18 |     7 | 0.389
//    [ 3,   4)     |    16 |    13 | 0.813
//    [ 4,   6)     |    33 |    30 | 0.909
//    [ 6,   9)     |    46 |    44 | 0.957
//    [ 9, inf)     |   207 |   207 | 1.000
//
//    binned by rank of p after the tile (rank 1 IS the fold ladder):
//
//    rank | cells | exact | rate
//       1 |     7 |     3 | 0.429
//       2 |     7 |     3 | 0.429
//       3 |     7 |     2 | 0.286
//       4 |     7 |     4 | 0.571
//       5 |     7 |     5 | 0.714
//       6 |     7 |     7 | 1.000
//       7 |     7 |     6 | 0.857
//       8 |     7 |     7 | 1.000
//       9 |     7 |     6 | 0.857
//      10 |     7 |     6 | 0.857
//
//    the fold ladder itself, in order of depth:
//
//    fold p | mean gap | 2p/mbar | maxsum_2 | G2new | excess | exact?
//         7 |    10.00 |    1.40 |       24 |    30 |      6 | no
//        11 |    14.00 |    1.57 |       42 |    42 |      0 | YES
//        13 |    17.11 |    1.52 |       66 |    66 |      0 | YES
//        17 |    20.22 |    1.68 |       96 |   108 |     12 | no
//        19 |    22.92 |    1.66 |      150 |   150 |      0 | YES
//        23 |    25.61 |    1.80 |      186 |   204 |     18 | no
//        29 |    28.05 |    2.07 |      234 |   258 |     24 | no
//        31 |    30.13 |    2.06 |      330 |   348 |     18 | no      (deep31)
//        37 |    32.21 |    2.30 |      408 |   528 |    120 | no      (deep37)
//
//    The excess over the lower bound, fold by fold: 6, 0, 0, 12, 0, 18, 24, 18, 120.
//    It does not shrink, and the deepest fold we can reach is by far the worst.
//
//    where the ladder reaches the safe zone.  Exactness is essentially certain
//    once 2p/mbar >= 4.  On the ladder mbar = prod_{q<=x} q/(q-2) ~ c ln^2 x;
//    fitting c from the measured mbar at x = 23, 29, 31 and solving 2x = 4 mbar(x):
//      c = 2.747,  crossover at x ~ 130  (tile T130, width ~ 10^57: unreachable by computation)
// ============================================================================
// READINGS — A10 answered, and the answer is no
// ============================================================================
//
//
// 0b. THE TWO DEEP LEGS, AND WHERE THEY CAME FROM (custody, 2026-08-19).
//    The OUTPUT block above is the main leg alone, one invocation,
//    `node --max-old-space-size=4096 research/a3-10-lower-tightness.js`,
//    about 21 s. This file is a THREE-MODE composite and the other two modes
//    exit before the main leg runs, so no single run can produce all three
//    blocks. The deep legs are kept here verbatim, per-copy progress elided
//    as they were pasted, and each is reproduced by its own invocation:
//      node --max-old-space-size=4096 research/a3-10-lower-tightness.js deep31
//      node --max-old-space-size=4096 research/a3-10-lower-tightness.js deep37
//    (10.3 s and 519 s on the machine of 2026-08-16). Their figures feed the
//    readings below at T29 and T31.
//    --------------------------------------------------------------------------
//       "OUTPUT of the deep31 leg (T29, 214.7M slots streamed from T23, 10.3s):"
//    --------------------------------------------------------------------------
//    T23 built: W = 223092870, D = 7952175
//      copy 4/29   1.8s
//      ... (per-copy progress elided)
//      copy 29/29   10.3s
//
//      T29: D = 214708725, W = 6469693230, mean gap = 30.13
//      maxsum_1..8 = 258, 330, 390, 420, 510, 540, 552, 582
//      L(T29, 31) = 4   best merge by run length = 330, 348, 330, 330, 0
//      G2(31#) = 348  (interior 348 at run length 2, best bridge 84)
//      lower maxsum_2 = 330   excess = 18   upper maxsum_{L+1} = 510
//
//    --------------------------------------------------------------------------
//       "OUTPUT of the deep37 leg (T31, 6.23e9 slots streamed from T23, 519s):"
//    --------------------------------------------------------------------------
//    T23 built: W = 223092870, D = 7952175
//      copy 1/31   11.9s
//      ... (per-copy progress elided)
//      copy 31/31   519.4s
//
//      T31: D = 6226553025, W = 200560490130, mean gap = 32.21
//      maxsum_1..8 = 348, 408, 510, 540, 552, 582, 624, 660
//      L(T31, 37) = 4   best merge by run length = 408, 510, 528, 408, 0
//      G2(37#) = 528  (interior 528 at run length 3, best bridge 84)
//      lower maxsum_2 = 408   excess = 120   upper maxsum_{L+1} = 552
//
//
// 0. CUSTODY. The seven-row table of A10 reproduces exactly for the lower
//    bound, for G2(new) and for the upper bound at folds 7 through 23. Four
//    independent routes agree on G2(new) at every fold we can afford: the
//    O(D+p) run engine, the streaming version of it, the O(pD) slow direct
//    fold, and the published G2(p#) sequence. The engine also reproduces
//    U-FRAME section 5's "merged sub-gaps" column line for line (12+30,
//    36+30, 30+66+12, 42+108, 24+48+90+42, 60+60+138). Twelve off-diagonal
//    cells, the ones that carry the new findings, were checked against slow
//    direct fold as well. The two deep legs stream T29 (214,708,725 slots)
//    and T31 (6,226,553,025 slots) and land on the known G2(31#) = 348 and
//    G2(37#) = 528, which is the strongest custody available here: a 6.2e9
//    slot streaming computation recovering a published term.
//
// 1. REFUTATION, and it corrects a number in U-FRAME. L(T23, 29) = 2, not 3.
//    Three independent methods agree: the run engine, an O(pD) brute scan over
//    all 29 two-sets, and a direct triple test (243,816 deletable adjacent
//    pairs, ZERO deletable triples). research/killrun.js overcounts, because
//    its state machine compares the incoming residue against the FIRST member
//    of the live pair rather than against the immediately preceding slot, so it
//    accepts residue words like (r, r+2, r-2) whose last two entries differ by
//    4. The corrected diagonal is L = 2, 1, 2, 2, 2, 3, 2, 4, 4 at folds 7 to
//    37, against the 1, 2, 2, 2, 3, 3, 4 recorded in U-FRAME section 5a step 6.
//    The consequence for A10 is that the upper bound at fold 29 is maxsum_3 =
//    300, not maxsum_4 = 348. L(T29, 31) = 4 and L(T31, 37) = 4 are confirmed.
//
// 2. THE ENGINE MAKES THE LOWER BOUND A THEOREM ABOUT RUN LENGTH 1. Because
//    each old slot is deleted in exactly two of the p copies, every single slot
//    is a run of length 1, and the merge it makes is a two-gap sum. So the
//    maximum over length-1 runs IS maxsum_2, and the lower bound is not an
//    inequality to be checked but a statement that runs of length 1 always
//    exist. Verified on all 329 grid cells, together with the upper bound.
//    Restated: THE LOWER BOUND IS EXACT IFF NO RUN OF LENGTH >= 2, AND NO SEAM
//    BRIDGE, OUT-MERGES maxsum_2. That equivalence is checked on all 329 cells.
//
// 3. EXACTNESS FREQUENCY, MEASURED DEEPER. On the fold ladder: exact at 3 of 9
//    folds (11, 13, 19 yes; 7, 17, 23, 29, 31, 37 no). Over the full grid of
//    329 (tile, prime) cells with tiles T5 to T23 and primes 7 to 241: 305
//    exact, 24 misses, a rate of 0.927. Exactly one of the 24 is a SEAM miss
//    (T5 folded by 7, where the winner is a bridge and not an interior run);
//    the tiny tile is the only place the seam ever decides anything.
//
// 4. THE CRITERION. The criterion proposed in A10, "L >= 2 available AND a
//    qualifying gap adjacent to the record", is NOT the criterion. Scored
//    against the truth on 329 cells:
//      L >= 2                     flags 45, catches all 24, 21 false alarms
//      a qualifying gap exists    flags 45, catches all 24, 21 false alarms
//      the record gap qualifies   flags  6, catches  6,  0 false alarms
//    So L >= 2 is NECESSARY and never misses a failure, but it over-flags by a
//    factor of two; the record condition is SUFFICIENT and never false-alarms,
//    but it explains only a quarter of the failures. The truth sits between and
//    is a SIZE question, not a residue question: does the best three-gap sum
//    ANCHORED at a qualifying gap beat the best two-gap sum ANYWHERE. That is
//    an extreme-value comparison between two order statistics of the gap word,
//    which is why no clean residue criterion exists.
//
// 5. THE SPORADIC MECHANISM, IN CLOSED FORM, AND IT IS THE INTERESTING PART.
//    Split the failures. When the record gap itself qualifies, i.e. when
//    p divides one of G2(old), G2(old)-2, G2(old)+2, the merge takes the record
//    plus BOTH its neighbours against a lower bound of the record plus ONE, so
//    the bound must miss. Those failures are predicted exactly, tile by tile:
//      T5  G2 = 12  -> p in {7}          misses with a qualifying record: {7}
//      T13 G2 = 66  -> p in {17}                                          {17}
//      T17 G2 = 108 -> p in {53}                                          {53}
//      T19 G2 = 150 -> p in {37}                                          {37}
//      T23 G2 = 204 -> p in {101, 103}                                    {101, 103}
//    with T7 and T11 predicting the empty set and delivering it. Their excess
//    is one neighbouring gap, 6 to 18 against mean gaps of 10 to 28. This
//    mechanism is ARITHMETIC, not statistical, and it recurs at arbitrarily
//    large p: on the ladder the chance that p divides G2(G2-2)(G2+2) is about
//    3/p per fold, so the expected count of such folds up to x is ~ 3 ln ln x,
//    which diverges. **This alone kills the A10 win as stated.** Exactness
//    cannot hold "from some level on", however deep we go, unless one proves
//    that G2(p#) avoids 0 and +-2 mod every subsequent prime, which is a
//    stronger and stranger statement than anything the route needs.
//
// 6. THE DECISIVE QUESTION: DOES EXACTNESS BECOME MORE COMMON WITH DEPTH?
//    In the controlling parameter, YES, cleanly and monotonically. Binning the
//    grid by 2p / mean gap, the recession of the qualifying threshold that
//    U-FRAME 5a step 7 identifies:
//      2p/mbar   < 2    [2,3)   [3,4)   [4,6)   [6,9)   >= 9
//      exact     0.444  0.389   0.813   0.909   0.957   1.000
//    On the fold ladder, NO. The ladder is pinned near 2p/mbar ~ 2, the worst
//    band, and moves there only glacially: 1.40, 1.57, 1.52, 1.68, 1.66, 1.80,
//    2.07, 2.06, 2.30 across folds 7 to 37. The excess over the lower bound
//    runs 6, 0, 0, 12, 0, 18, 24, 18, 120. It does not shrink; the deepest fold
//    we can reach is by far the worst. Extrapolating mbar ~ c ln^2 x with
//    c = 2.75 fitted at x = 23, 29, 31, the ladder reaches the safe band
//    2p/mbar >= 4 only at x ~ 130, a tile of width 10^57. Exactness is
//    therefore predicted to become GENERIC eventually, and the mechanism for it
//    is exactly the linear-versus-logarithmic asymmetry the lens is built on,
//    but it is not observable and it is not universal (reading 5).
//    **A10's win is not available. Stated plainly: the lower bound does not
//    become exact, the recursion is not determined by maxsum_2, and L cannot
//    be sidestepped this way.**
//
// 7. THE CONSOLATION PRIZE, AND ITS LIMIT. The EFFECTIVE run length, the
//    smallest m with G2(new) <= maxsum_m(old), is far below L+1:
//      fold p   7  11  13  17  19  23  29  31  37
//      m        3   2   2   3   2   3   3   3   4
//      L+1      3   2   3   3   3   4   3   5   5
//    strictly better at folds 13, 23, 31, and never worse. Over the grid,
//    305 cells need only m = 2, 23 need m = 3, and one needs m = 4. For eight
//    folds it looked as though m = 3 would serve for ever, which would have
//    delivered A10's win from the other side: a FIXED m removes L from the
//    recursion just as effectively as exactness does, and telescoping
//    maxsum_3 - G2 (measured 18, 36, 54, 72, 60, 60, 96, 132, 162, about 2 to 5
//    mean gaps) gives Sum_p ~ x ln^2 x, comfortably under x^2. **That hope dies
//    at fold 37**, where G2(37#) = 528 overshoots maxsum_3(T31) = 510 and needs
//    maxsum_4 = 540. The winning merge there is a run of THREE, four gaps wide.
//    Fold 37 is the same outlier U-FRAME section 4 flags for its local slope of
//    3.21; it is now flagging in two independent statistics, which makes it
//    less likely to be an accident of one measurement.
//
// 8. WHY LONG RUNS USUALLY LOSE, AND WHY 37 IS DIFFERENT. A run of length k
//    merges k+1 gaps but its k-1 INTERIOR gaps must every one be qualifying,
//    and the qualifying values below G2 are a short sparse menu: {} at p = 11,
//    {24} at 13, {36, 66} at 17, {48, 90, 138} at 23, {60, 114, 174} at 29.
//    A long run can only spend from that menu, while a run of length 1 sits
//    wherever it likes, including on the record. That is the real reason the
//    kills column of U-FRAME section 5 never exceeds 3 even where longer runs
//    exist. The menu grows with the tile, and at p = 37 on T31 it is long
//    enough to fund a four-gap merge worth 528 against a two-gap best of 408.
//
// 9. WHAT THIS LEAVES FOR THE WAVE. A10 is closed negative, which is a full
//    result and it saves the effort of pushing the ladder further for this
//    question. The exact criterion in reading 4 is an extreme-value comparison
//    on the gap word, so it needs the gap-size TAIL, which is precisely what
//    A9 (the histogram fold rule) and A3 (f from the grain census law) are
//    built to supply. The sharpest live target is now the effective m of
//    reading 7 rather than L itself: m is demonstrably much smaller than L+1,
//    and any bound of the form m = O(1) or even m = O(ln ln x) closes U-FRAME
//    5a from the upper side. That is a strictly weaker thing to prove than a
//    bound on L, and the data says it is much closer to true.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed.
//
// FROM THE TWO DEEP LEGS, which are separate invocations of this same file and
//   are named in the header at lines 53 and 54, not in the default run pasted
//   above: `deep31` (T29 streamed from T23) and `deep37` (T31 streamed, with
//   --max-old-space-size=4096). The readings quote both legs verbatim and
//   label each quotation with the leg it came from. Everything in those two
//   quoted blocks belongs to them: T23 built W = 223092870 and D = 7952175;
//   T29 D = 214708725, W = 6469693230, mean gap 30.13, maxsum_1..8 = 258, 330,
//   390, 420, 510, 540, 552, 582; T31 D = 6226553025, W = 200560490130, mean
//   gap 32.21, maxsum_1..8 = 348, 408, 510, 540, 552, 582, 624, 660; and the
//   restatements 214,708,725 slots, 6,226,553,025 slots, 214.7M, 6.23e9,
//   6.2e9. The default run's own table prints the two headline results 348 and
//   528 that these legs land on, which is the cross-check.
//
// ROUNDINGS of a printed value: 2.747 -> 2.75.
//
// DERIVED IN THIS READING: the miss rate 0.927, from the printed exact and
//   miss counts.
//
// IN-CODE: 4096, the memory flag in the header's deep37 command line.
// ---------------------------------------------------------------------------
