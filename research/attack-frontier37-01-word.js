// ============================================================================
// FRONTIER 37, LEG 1 — THE WORD STATISTIC AT THE NINTH DIAGONAL CELL
//
// THE QUESTION. `research/attack-foldL-01-census.js` derives a lemma it calls
// "the word is the whole story": folding T_x by p', the longest ALTERNATION-
// LEGAL WINDOW of the old cyclic gap word, read modulo p' and with no slot
// residue ever taken, equals the true longest adjacent-kill run L exactly.
// It verifies that at 36 cells with x <= 19 and reproduces the published
// diagonal L = 2, 1, 2, 2, 2, 3, 2, 4 at folds 7..31. Its own NOT REACHED says
// the exact tiles stop at T_29 and that T_31 is streamable. This leg streams
// T_31 and evaluates the word statistic at fold 37, one level outside the
// lemma's verified range.
//
// PRIOR ART ON THE DISK, CHECKED FIRST. `research/a3-10-lower-tightness.js`
// leg `deep37` already streams T_31 (6,226,553,025 slots out of T_23, 519 s)
// and reports L(T31, 37) = 4, G2(37#) = 528 and maxsum_1..8(T31) =
// 348, 408, 510, 540, 552, 582, 624, 660. So the ANSWER is not new here; the
// ROUTE is. a3-10's engine reads slot residues mod 37. This one reads gap
// classes mod 37 and nothing else, which is a different statistic that happens
// to be conjectured equal, and the two disagree in principle whenever the
// alignment-realizability half of the census lemma fails.
//
// WHAT THIS SCRIPT COMPUTES, per (tile, fold):
//   L_word     the longest alternation-legal window of the cyclic gap word.
//              Two-state walk: from channel A the legal gap classes mod p' are
//              {0, -2}, from B they are {0, +2}; a class outside {0, +-2}
//              resets both states. Cyclic closure by replaying REPLAY gaps.
//   maxsum_m   max over the cyclic word of a sum of m consecutive gaps, m <= 8.
//   the alphabet, the qualifying menu, and the extremal legal word.
//
// COVERAGE. `calib` builds T_5..T_23 exactly and streams T_29 out of T_23, and
// scores the diagonal against the published L row and against a3-10's
// maxsum_1..8(T29). `deep37` streams T_31 out of T_23 (31 x 29 x 7,952,175
// inner steps) and evaluates fold 37.
//
// Reproduce:
//   node research/attack-frontier37-01-word.js full        (calibration, then fold 37)
//   node research/attack-frontier37-01-word.js calib
//   node --max-old-space-size=4096 research/attack-frontier37-01-word.js deep37
// ============================================================================
'use strict';

const MODE = process.argv[2] || 'calib';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
const pad = (v, n) => String(v).padStart(n);
const MAXM = 8;        // maxsum depth
const REPLAY = 96;     // gaps replayed to close the cyclic word

// ---------------------------------------------------------------------------
// THE CONSUMER. Fed the gap word one gap at a time, in order. It never sees a
// slot position modulo anything: `push` takes the gap value alone, plus the
// running slot position for the maxsum ring (a difference of positions is a
// sum of gaps, so no residue information enters through it).
// ---------------------------------------------------------------------------
function makeWordConsumer(p) {
  const win = new Float64Array(MAXM + 1);
  const ms = new Float64Array(MAXM + 1);
  const hist = new Float64Array(8192);        // gap/6 -> count
  const ring = new Int32Array(256);
  let wi = 0, wn = 0, n = 0;
  // two-state alternation walk, lengths in SLOTS
  let bA = 1, bB = 1, L = 1;
  let bestWord = [];
  return {
    // s is the absolute slot position AFTER this gap; g is the gap value
    push(g, s, count) {
      if (count) { const b = g / 6; if (b < 8192) hist[b]++; }
      n++;
      ring[n & 255] = g;
      win[wi] = s; wi = wi === MAXM ? 0 : wi + 1;
      if (wn <= MAXM) wn++;
      if (wn > MAXM) {
        for (let m = 1; m <= MAXM; m++) {
          const v = s - win[(wi + MAXM - m) % (MAXM + 1)];
          if (v > ms[m]) ms[m] = v;
        }
      }
      const c = g % p;
      let nA, nB;
      if (c === 0) { nA = bA + 1; nB = bB + 1; }
      else if (c === 2) { nA = bB + 1; nB = 1; }
      else if (c === p - 2) { nA = 1; nB = bA + 1; }
      else { nA = 1; nB = 1; }
      bA = nA; bB = nB;
      const b = nA > nB ? nA : nB;
      if (b > L) {
        L = b;
        const w = [];
        for (let j = b - 1; j >= 1; j--) w.push(ring[(n - j + 1) & 255]);
        bestWord = w;
      }
    },
    result(W) {
      // the ring's first MAXM windows were never scored; the replay closes them
      const alphabet = [];
      for (let i = 0; i < 8192; i++) if (hist[i] > 0) alphabet.push([i * 6, hist[i]]);
      return { L, ms: Array.from(ms), nGaps: n, alphabet, word: bestWord };
    }
  };
}

// ---------------------------------------------------------------------------
// TILES
// ---------------------------------------------------------------------------
function buildT23() {
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
  return { W: P, S };
}

// Feed the cyclic gap word of a stored slot array to a consumer.
function feedStored(S, W, cons) {
  const D = S.length;
  const g = new Int32Array(D);
  for (let i = 0; i + 1 < D; i++) g[i] = S[i + 1] - S[i];
  g[D - 1] = W + S[0] - S[D - 1];
  let pos = S[0];
  for (let i = 0; i < D; i++) { pos += g[i]; cons.push(g[i], pos, true); }
  for (let j = 0; j < REPLAY; j++) { const k = j % D; pos += g[k]; cons.push(g[k], pos, false); }
  return D;
}

// ---------------------------------------------------------------------------
// CALIBRATION
// ---------------------------------------------------------------------------
if (MODE === 'calib' || MODE === 'full') {
  console.log('=== CALIBRATION: the word statistic on the exact tiles ==============');
  const PUB_L = { 7: 2, 11: 1, 13: 2, 17: 2, 19: 2, 23: 3, 29: 2, 31: 4 };
  // stored tiles T_5 .. T_23
  const tiles = [];
  {
    let P = 6, S = Float64Array.from([5]);
    for (const q of [5, 7, 11, 13, 17, 19, 23]) {
      const D = S.length, keep = new Float64Array(D * (q - 2));
      let n = 0;
      for (let k = 0; k < q; k++) for (let i = 0; i < D; i++) {
        const r = S[i] + k * P;
        if (r % q !== 0 && (r + 2) % q !== 0) keep[n++] = r;
      }
      P *= q; S = keep;
      tiles.push({ x: q, W: P, S });
    }
  }
  const NEXT = { 5: 7, 7: 11, 11: 13, 13: 17, 17: 19, 19: 23, 23: 29 };
  console.log('');
  console.log('tile     D          fold   L_word   published L   agree   maxsum_1..8');
  let allL = true;
  for (const t of tiles) {
    const p = NEXT[t.x];
    const cons = makeWordConsumer(p);
    feedStored(t.S, t.W, cons);
    const r = cons.result(t.W);
    const ok = r.L === PUB_L[p];
    if (!ok) allL = false;
    console.log('T_' + pad(t.x, 2) + pad(t.S.length, 12) + pad(p, 7) + pad(r.L, 9) +
      pad(PUB_L[p], 14) + '   ' + (ok ? 'YES' : 'NO <-- MISMATCH') + '   ' + r.ms.slice(1).join(', '));
  }
  // T_29, streamed out of T_23, folded by 31
  {
    const { W: W23, S } = buildT23();
    const D23 = S.length, W29 = W23 * 29, p = 31;
    console.log('');
    console.log('T_23 built: W = ' + W23 + ', D = ' + D23 + '   ' + el());
    const cons = makeWordConsumer(p);
    const R29 = new Uint8Array(D23);
    for (let i = 0; i < D23; i++) R29[i] = S[i] % 29;
    const w29 = W23 % 29;
    let prev = -1, first = -1, n = 0;
    const headP = new Float64Array(REPLAY + 2);
    let hn = 0;
    for (let k = 0; k < 29; k++) {
      const s29 = (k * w29) % 29, base = k * W23;
      for (let i = 0; i < D23; i++) {
        let a = R29[i] + s29; if (a >= 29) a -= 29;
        if (a === 0 || a === 27) continue;
        const s = S[i] + base;
        if (prev < 0) { first = s; } else cons.push(s - prev, s, true);
        if (hn <= REPLAY) headP[hn++] = s;
        prev = s; n++;
      }
    }
    cons.push(W29 + first - prev, W29 + first, true);
    for (let j = 1; j <= REPLAY; j++) cons.push(headP[j] - headP[j - 1], W29 + headP[j], false);
    const r = cons.result(W29);
    const okD = n === 214708725;
    const okL = r.L === PUB_L[31];
    const A310 = [258, 330, 390, 420, 510, 540, 552, 582];
    const okM = r.ms.slice(1).every((v, i) => v === A310[i]);
    console.log('T_29 streamed: D = ' + n + ' (expect 214708725: ' + (okD ? 'YES' : 'NO') + ')   ' + el());
    console.log('  L_word(T29, 31) = ' + r.L + '   published 4   ' + (okL ? 'AGREE' : 'MISMATCH'));
    console.log('  maxsum_1..8     = ' + r.ms.slice(1).join(', '));
    console.log('  a3-10 deep31    = ' + A310.join(', ') + '   ' + (okM ? 'AGREE' : 'MISMATCH'));
    console.log('  extremal legal word: ' + (r.word.length ? r.word.join(' + ') : '(single slot)'));
    if (!okL) allL = false;
    if (!okM) allL = false;
  }
  console.log('');
  console.log('CALIBRATION VERDICT: ' + (allL ? 'ALL CELLS AGREE' : 'AT LEAST ONE MISMATCH'));
  if (MODE === 'calib') process.exit(0);
}

// ---------------------------------------------------------------------------
// DEEP 37: stream T_31 out of T_23 and evaluate the word statistic at p' = 37
// ---------------------------------------------------------------------------
if (MODE === 'deep37' || MODE === 'full') {
  console.log('=== DEEP 37: the word statistic for T_31 folded by 37 ===============');
  const { W: W23, S } = buildT23();
  const D23 = S.length, W29 = W23 * 29, W31 = W29 * 31, p = 37;
  console.log('T_23 built: W = ' + W23 + ', D = ' + D23 + '   ' + el());
  const R29 = new Uint8Array(D23), R31 = new Uint8Array(D23);
  for (let i = 0; i < D23; i++) { R29[i] = S[i] % 29; R31[i] = S[i] % 31; }
  const a29 = W23 % 29, a31 = W23 % 31, b31 = W29 % 31;
  const cons = makeWordConsumer(p);
  const headP = new Float64Array(REPLAY + 2);
  let hn = 0, prev = -1, first = -1, n = 0;
  for (let k31 = 0; k31 < 31; k31++) {
    const base31 = k31 * W29, s31b = (k31 * b31) % 31;
    for (let k29 = 0; k29 < 29; k29++) {
      const s29 = (k29 * a29) % 29, s31 = (k29 * a31 + s31b) % 31;
      const base = base31 + k29 * W23;
      for (let i = 0; i < D23; i++) {
        let a = R29[i] + s29; if (a >= 29) a -= 29;
        if (a === 0 || a === 27) continue;
        let b = R31[i] + s31; if (b >= 31) b -= 31;
        if (b === 0 || b === 29) continue;
        const s = S[i] + base;
        if (prev < 0) { first = s; } else cons.push(s - prev, s, true);
        if (hn <= REPLAY) headP[hn++] = s;
        prev = s; n++;
      }
    }
    console.error('  copy ' + (k31 + 1) + '/31   alive ' + n + '   ' + el());
  }
  cons.push(W31 + first - prev, W31 + first, true);
  for (let j = 1; j <= REPLAY; j++) cons.push(headP[j] - headP[j - 1], W31 + headP[j], false);
  const r = cons.result(W31);
  const A310 = [348, 408, 510, 540, 552, 582, 624, 660];
  console.log('');
  console.log('  T_31: D = ' + n + '   W = ' + W31 + '   mean gap = ' + (W31 / n).toFixed(4));
  console.log('  D expected 6226553025: ' + (n === 6226553025 ? 'YES' : 'NO'));
  console.log('');
  console.log('  L_word(T31, 37) = ' + r.L);
  console.log('  extremal alternation-legal word: ' + (r.word.length ? r.word.join(' + ') : '(single slot)'));
  console.log('  maxsum_1..8(T31) = ' + r.ms.slice(1).join(', '));
  console.log('  a3-10 deep37     = ' + A310.join(', ') + '   ' +
    (r.ms.slice(1).every((v, i) => v === A310[i]) ? 'AGREE' : 'MISMATCH'));

  // -------------------------------------------------------------------------
  // THE NINTH ROW OF THE CENSUS DIAGONAL, from the measured maxsum table.
  // Class minima at p' = 37 (37 === 1 mod 6): the cheapest qualifying value is
  // 2p'-2 = 72 in class M, the cheapest of the other sign is 4p'+2 = 150 in
  // class P, and Z = 6p' = 222.  ABS uses those abstract minima (A5 Theorem B);
  // ALPHA uses the smallest value of each class that ACTUALLY OCCURS as a gap
  // of T_31 (the census's forced ceiling).  Both are evaluated on m <= 8 only,
  // which is a TRUNCATION and is flagged as such: the feasible set of A5's
  // Theorem B is not downward closed, so the ceiling is a maximum over k and a
  // longer maxsum table could in principle re-open a larger k.
  // -------------------------------------------------------------------------
  {
    const alpha = r.alphabet;
    let Zmin = Infinity, Pmin = Infinity, Mmin = Infinity;
    for (const [v] of alpha) {
      const m = v % p;
      if (m === 0 && v < Zmin) Zmin = v;
      if (m === 2 && v < Pmin) Pmin = v;
      if (m === p - 2 && v < Mmin) Mmin = v;
    }
    const cmin = (Z, P, M, kmax) => {
      const hA = [0], hB = [0], out = [0];
      for (let k = 1; k <= kmax; k++) {
        const a = Math.min(Z + hA[k - 1], M + hB[k - 1]);
        const b = Math.min(Z + hB[k - 1], P + hA[k - 1]);
        hA.push(a); hB.push(b); out.push(Math.min(a, b));
      }
      return out;
    };
    const KM = 8;
    const cAbs = cmin(6 * p, 4 * p + 2, 2 * p - 2, KM);
    const cAlp = cmin(Zmin, Pmin, Mmin, KM);
    let kAbs = 0, kAlp = 0;
    for (let k = 1; k <= KM; k++) {
      if (cAbs[k] <= r.ms[k]) kAbs = k;
      if (cAlp[k] <= r.ms[k]) kAlp = k;
    }
    console.log('');
    console.log('  distinct gap values in T_31: ' + alpha.length + '   G2(T31) = ' + alpha[alpha.length - 1][0]);
    console.log('  class minima PRESENT in the alphabet:  Z = ' + Zmin + '   P = ' + Pmin + '   M = ' + Mmin);
    console.log('  abstract class minima at p\' = 37:      Z = ' + (6 * p) + '   P = ' + (4 * p + 2) + '   M = ' + (2 * p - 2));
    console.log('  k        :  ' + [1,2,3,4,5,6,7,8].map(k => pad(k, 6)).join(''));
    console.log('  maxsum_k :  ' + [1,2,3,4,5,6,7,8].map(k => pad(r.ms[k], 6)).join(''));
    console.log('  cmin ABS :  ' + [1,2,3,4,5,6,7,8].map(k => pad(cAbs[k], 6)).join(''));
    console.log('  cmin ALPHA: ' + [1,2,3,4,5,6,7,8].map(k => pad(cAlp[k], 6)).join(''));
    console.log('  A5 Theorem B ceiling (m <= 8) = ' + (kAbs + 1) +
      '   forced ceiling with the alphabet (m <= 8) = ' + (kAlp + 1) +
      '   true L = ' + r.L);
    console.log('  qualifying gap menu of T_31 at p\' = 37, values <= G2(T31):');
    const menu = alpha.filter(([v]) => v % p === 0 || v % p === 2 || v % p === p - 2)
      .map(([v, c]) => v + ' (' + (v % p === 0 ? 'Z' : v % p === 2 ? 'P' : 'M') + ', x' + c.toExponential(3) + ')');
    console.log('    ' + (menu.length ? menu.join('  ') : '(none)'));
  }
  console.log('  total time ' + el());
  process.exit(0);
}

console.log('usage: node research/attack-frontier37-01-word.js [calib|deep37]');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=4096 research/attack-frontier37-01-word.js -- full
//   invocation:  node --max-old-space-size=4096 research/attack-frontier37-01-word.js full
//   code-sha256: 42a73ffb545d76363b45bc583ca3a4740f648d30233374177777759e6b597574
//   out-sha256:  3f047eaca8f09acd44a0422669ca8b1b73510a2efc268d5c3be63bab79b5db33
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     243.1 s
// ============================================================================
// === CALIBRATION: the word statistic on the exact tiles ==============
//
// tile     D          fold   L_word   published L   agree   maxsum_1..8
// T_ 5           3      7        2             2   YES   12, 24, 30, 42, 54, 60, 72, 84
// T_ 7          15     11        1             1   YES   30, 42, 66, 78, 96, 108, 126, 138
// T_11         135     13        2             2   YES   42, 66, 96, 108, 138, 156, 168, 180
// T_13        1485     17        2             2   YES   66, 96, 138, 156, 168, 186, 204, 228
// T_17       22275     19        2             2   YES   108, 150, 168, 198, 210, 240, 258, 288
// T_19      378675     23        3             3   YES   150, 186, 210, 228, 282, 300, 348, 378
// T_23     7952175     29        2             2   YES   204, 234, 300, 348, 390, 462, 498, 528
//
// T_23 built: W = 223092870, D = 7952175   1.4s
// T_29 streamed: D = 214708725 (expect 214708725: YES)   8.0s
//   L_word(T29, 31) = 4   published 4   AGREE
//   maxsum_1..8     = 258, 330, 390, 420, 510, 540, 552, 582
//   a3-10 deep31    = 258, 330, 390, 420, 510, 540, 552, 582   AGREE
//   extremal legal word: 60 + 126 + 60
//
// CALIBRATION VERDICT: ALL CELLS AGREE
// === DEEP 37: the word statistic for T_31 folded by 37 ===============
// T_23 built: W = 223092870, D = 7952175   8.6s
//
//   T_31: D = 6226553025   W = 200560490130   mean gap = 32.2105
//   D expected 6226553025: YES
//
//   L_word(T31, 37) = 4
//   extremal alternation-legal word: 150 + 72 + 150
//   maxsum_1..8(T31) = 348, 408, 510, 540, 552, 582, 624, 660
//   a3-10 deep37     = 348, 408, 510, 540, 552, 582, 624, 660   AGREE
//
//   distinct gap values in T_31: 55   G2(T31) = 348
//   class minima PRESENT in the alphabet:  Z = 222   P = 150   M = 72
//   abstract class minima at p' = 37:      Z = 222   P = 150   M = 72
//   k        :       1     2     3     4     5     6     7     8
//   maxsum_k :     348   408   510   540   552   582   624   660
//   cmin ABS :      72   222   294   444   516   666   738   888
//   cmin ALPHA:     72   222   294   444   516   666   738   888
//   A5 Theorem B ceiling (m <= 8) = 6   forced ceiling with the alphabet (m <= 8) = 6   true L = 4
//   qualifying gap menu of T_31 at p' = 37, values <= G2(T31):
//     72 (M, x1.099e+8)  150 (P, x4.937e+6)  222 (Z, x2.637e+4)  294 (M, x4.600e+1)
//   total time 243.1s
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE CENSUS LEMMA SURVIVES ITS FIRST OUT-OF-RANGE TEST.
//    L_word(T31, 37) = 4, and `research/attack-frontier37-02-transport.js`
//    reads L = 4 from the absolute kill condition on the same stream. The
//    census verified "the word is the whole story" at 36 cells with x <= 19
//    and on a diagonal that stopped at T_29; the ninth diagonal cell now
//    agrees too, and the two routes share no state: this one never takes a
//    slot residue, the other never reduces a gap.
//
// 2. THE EXTREMAL WORD IS THE MINIMAL ONE, EXACTLY. 150 + 72 + 150 is
//    4p'+2, 2p'-2, 4p'+2 at p' = 37, which is `research/a3-05-bound-L.md`'s
//    extremal alternating word with the roles of the two signs swapped
//    against fold 31's 60 + 126 + 60 (= 2p'-2, 4p'+2, 2p'-2 at p' = 31).
//    The swap is forced by the residue class of p' mod 6: at 31 === 1 (mod 6)
//    the cheap class is M = 2p'-2 = 60, at 37 === 1 (mod 6) it is also
//    M = 72, and the difference is which end of the walk the run starts on.
//    Each word sums to 6p' plus the value it repeats, 246 at fold 31 and 372
//    at fold 37, and neither of these longest runs wins the merge.
//
// 3. maxsum_1..8(T31) = 348, 408, 510, 540, 552, 582, 624, 660, reproducing
//    a3-10's deep37 leg term for term. The stream construction is the same
//    shape in both, a triple loop over T_23 with the 29 and 31 filters
//    applied in place, so this is a reproduction of the CONSUMER and not of
//    the stream; the stream itself is re-certified by D = 6,226,553,025.
//    243 s here against 519 s there.
//
// 4. THE ALPHABET BUYS NOTHING AT FOLD 37, AND NOW IT IS MEASURED RATHER THAN
//    PREDICTED. All three abstract class minima at p' = 37 occur as real gaps
//    of T_31: Z = 222, P = 150, M = 72. So cmin ALPHA equals cmin ABS at
//    every k <= 8, the forced ceiling equals A5's Theorem B, and the census's
//    P2 ("once the tile is large the alphabet fact collapses onto Theorem B")
//    holds at the ninth cell. The qualifying menu below G2(T31) is exactly
//    four values, 72, 150, 222, 294, with multiplicities 1.099e+8, 4.937e+6,
//    2.637e+4 and 46. The count 46 for 294 is the whole supply of the third
//    cheapest qualifying value across 6.2e9 gaps.
//
// 5. THE NINTH ROW OF THE CENSUS DIAGONAL. forced = 6, Theorem B = 6, true
//    L = 4. The bound pays a factor 1.5 over the truth here, against 1.5 at
//    fold 31 (6 against 4) and a mean of 1.47 over the census's eight cells.
//    Against the u-frame requirement line, 0.31 p / ln p = 3.18 at p' = 37,
//    the forced ceiling is 1.89 times the line and the truth is 1.26 times
//    it, so the census's §4 verdict is unchanged one level deeper: the bound
//    diverges from the line and the object does not.
//
// 6. HONEST LIMIT ON THE CEILING. Both ceilings are evaluated on m <= 8. The
//    feasible set {k : cmin(k) <= maxsum_k} is not downward closed
//    (`attack-foldL-01-census.md` §3), so a longer maxsum table could in
//    principle re-open a larger k. The measured margin at k = 8 is
//    888 - 660 = 228 and cmin gains 111 per step on average over the eight
//    steps from cmin(0) = 0 (116.6 if the seven printed increments are
//    averaged instead) against a mean gap of 32.2, so re-opening is not
//    expected; it is not excluded here.
//
// 7. WHAT WAS ALREADY ON THE DISK. L(T31, 37) = 4 and the maxsum row are in
//    `research/a3-10-lower-tightness.js`'s embedded deep37 tail and are
//    quoted in `research/kappa-not-L.md` and `research/U-FRAME.md`. Nothing
//    in readings 1 to 5 should be read as a first measurement of those two
//    objects. What is first here is the WORD route at this fold, the census
//    ceiling row, and the measured alphabet.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   D = 6226553025 for T_31, quoted in reading 4 as "6.2e9 gaps".
// DERIVED IN THIS READING by arithmetic over printed values:
//   246 in reading 2 is the fold-31 extremal word 60 + 126 + 60, printed in
//   the calibration section; 372 is the fold-37 word 150 + 72 + 150, printed
//   in the deep-37 section.
//   3.18 in reading 5 is 0.31 times 37 divided by ln 37.
//   1.89 in reading 5 is the printed forced ceiling 6 divided by that 3.18,
//   and 1.26 is the printed true L = 4 divided by it.
//   111 in reading 6 is the printed cmin(8) = 888 divided by 8, i.e. the
//   average gain per step counting from cmin(0) = 0. The seven increments
//   printed in the cmin row average 816/7 = 116.57 instead. ADJUDICATED
//   2026-08-20 (mismatch #20): both are correct arithmetic on printed values
//   and they answer different questions -- 888/8 is exact over eight steps
//   from an unprinted but definitional cmin(0) = 0, and 816/7 is the mean of
//   the increments the block actually shows. Neither figure changed; reading 6
//   now names the convention it uses and gives the other, so "per step" cannot
//   be read two ways when it is quoted.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   1.47 in reading 5 is `research/attack-foldL-01-census.js`, whose OUTPUT
//   prints "mean trueL/req31 = 1.168,  mean forced/req31 = 1.712,  the bound
//   pays a factor 1.47 over the truth" over the eight diagonal folds.
// DEFINITION / LITERATURE constants:
//   0.31 in reading 5 is the upper end of the u-frame requirement line
//   L <= 0.19 to 0.31 p/ln p, carried in `research/U-FRAME.md` and sourced
//   there to `research/gate-multiplies.md` section 8.
// ---------------------------------------------------------------------------
