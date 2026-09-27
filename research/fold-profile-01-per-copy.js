// ============================================================================
// FOLD PROFILE 01 — THE PER-COPY KILL LEDGER
// ============================================================================
// Chris's question, 2026-08-17: when we fold T_x by p, the tile becomes p times
// longer and we know EXACTLY how many twin slots die in total (2D, since
// D -> (p-2)D). But how are those 2D deaths SHARED OUT among the p copies, and
// in particular how many land inside the ORIGINAL tile section, copy 0?
//
// A9 deliberately quotiented absolute position away ("the copy index is
// bookkeeping") because the GAP HISTOGRAM does not depend on it. This file puts
// position back and asks the complementary question.
//
// THE EXACT IDENTITY (proven, one line, from the copy theorem of THE-LENS section 2):
//   copy k deletes the slots whose residue mod p lies in the 2-set {a_k, a_k-2},
//   a_k = -k*W mod p. So with h(a) = #{slots of T_x with s = a (mod p)},
//        K(k) = h(a_k) + h(a_k - 2),      sum_k K(k) = 2D,      mean = 2D/p.
// Copy 0 is the anchor a_0 = 0, i.e. the slots that p genuinely sieves.
//
// WHAT THIS SCRIPT MEASURES, for every fold on the ladder and off it:
//   S1  the ledger: K(0) against the mean, the min, the max, the spread
//   S2  the near-palindrome test. ⚠ CORRECTED 2026-08-17: this section was
//       written to predict K(k) = K(p-1-k) EXACTLY, and it printed FAILS at
//       every fold on the ladder, which is what the mirror really says. The
//       involution r -> W-2-r fixes r = W-1 without shifting its
//       representative, so one slot is unpaired and the true statement is
//       |K(k) - K(p-1-k)| <= 1. That is the Mirror Ledger theorem of
//       FOLD-PROFILE section 4, derived in fold-profile-02 S4 and verified
//       there at 45 of 45 cells. S2 now reports both: the exact-equality
//       result, which is the refutation, and the theorem's bound.
//   S3  the spread law: sd(K) against the binomial prediction sqrt(2D/p)
//   S4  the proven Mobius bound |K(k) - 2D/p| <= 4*3^(pi(x)-1), against reality
//   S5  does the copy that takes the MOST kills make the biggest new gap?
//
// Representation: the tile is carried as its cyclic GAP WORD (Uint16Array,
// length D) plus the first slot and W; positions are never stored. Residues
// stream by r <- (r + g) mod p.
//
// Run:   node fold-profile-01-per-copy.js
// Deep:  DEEP=1 node --max-old-space-size=12000 fold-profile-01-per-copy.js
// ============================================================================
'use strict';

const DEEP = !!process.env.DEEP;
const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

// --- primes ------------------------------------------------------------------
function primesTo(n) {
  const c = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { out.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return out;
}
const PR = primesTo(4000);

// --- tile T5 -----------------------------------------------------------------
// slots 11, 17, 29 in a window of 30; cyclic gap word 6, 12, 12.
function tileT5() {
  return { x: 5, W: 30, s0: 11, D: 3, gaps: Uint16Array.from([6, 12, 12]) };
}

// --- fold: build T_{p} from T_x by p -----------------------------------------
// Copies are laid k = 0..p-1; slot j of copy k sits at s_j + k*W and dies iff
// (s_j + k*W) = 0 or -2 (mod p). Positions stay exact in doubles (< 2^53).
function fold(T, p) {
  const { W, s0, D, gaps } = T;
  const Dn = D * (p - 2), Wn = W * p;
  const ng = new Uint16Array(Dn);
  const w = W % p, dead2 = p - 2;
  let idx = 0, prev = -1, first = -1;
  for (let k = 0; k < p; k++) {
    const base = k * W, shift = (k * w) % p;
    let r = (s0 + shift) % p;        // residue of slot j in copy k
    let pos = base + s0;
    for (let j = 0; j < D; j++) {
      if (r !== 0 && r !== dead2) {
        if (first < 0) { first = pos; } else { ng[idx++] = pos - prev; }
        prev = pos;
      }
      const g = gaps[j];
      pos += g; r += g % p; if (r >= p) r -= p;
    }
  }
  // closing gap of the cycle
  ng[idx++] = (first + Wn) - prev;
  if (idx !== Dn) throw new Error('census mismatch: ' + idx + ' vs ' + Dn);
  return { x: p, W: Wn, s0: first, D: Dn, gaps: ng };
}

// --- residue histogram of T's slots mod p ------------------------------------
function histogram(T, p) {
  const { s0, D, gaps } = T;
  const h = new Float64Array(p);
  let r = s0 % p;
  for (let j = 0; j < D; j++) { h[r]++; const g = gaps[j] % p; r += g; if (r >= p) r -= p; }
  return h;
}

// --- per-anchor damage: largest gap left after deleting classes {a, a-2} -----
// Returns maxgap[a] for every a in Z/p, computed in one O(D*p) sweep would be
// heavy; instead one O(D) sweep per anchor, but only when D*p is affordable.
function maxgapPerAnchor(T, p) {
  const { s0, D, gaps, W } = T;
  const res = new Int32Array(p);
  // precompute residues once (Uint8/Uint16 depending on p)
  const rs = p < 256 ? new Uint8Array(D) : new Uint16Array(D);
  { let r = s0 % p; for (let j = 0; j < D; j++) { rs[j] = r; const g = gaps[j] % p; r += g; if (r >= p) r -= p; } }
  for (let a = 0; a < p; a++) {
    const b = (a - 2 + p) % p;
    // walk the cyclic word twice-safe: accumulate runs of deleted slots.
    // gap of the survivor pattern = sum of gaps from one survivor to the next.
    let best = 0, acc = 0, started = false, lead = 0;
    for (let j = 0; j < D; j++) {
      const dead = (rs[j] === a || rs[j] === b);
      if (!dead) {
        if (started) { if (acc > best) best = acc; } else { started = true; lead = acc; }
        acc = 0;
      }
      acc += gaps[j];
    }
    // wrap: acc carries the tail, lead the head before the first survivor
    const wrapGap = acc + lead;
    if (started) { if (wrapGap > best) best = wrapGap; } else { best = W; } // all dead (never happens)
    res[a] = best;
  }
  return res;
}

function stats(arr) {
  let s = 0, mn = Infinity, mx = -Infinity;
  for (let i = 0; i < arr.length; i++) { s += arr[i]; if (arr[i] < mn) mn = arr[i]; if (arr[i] > mx) mx = arr[i]; }
  const m = s / arr.length; let v = 0;
  for (let i = 0; i < arr.length; i++) v += (arr[i] - m) * (arr[i] - m);
  return { sum: s, mean: m, min: mn, max: mx, sd: Math.sqrt(v / arr.length) };
}

function pearson(a, b) {
  const n = a.length; let ma = 0, mb = 0;
  for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; } ma /= n; mb /= n;
  let sab = 0, saa = 0, sbb = 0;
  for (let i = 0; i < n; i++) { const da = a[i] - ma, db = b[i] - mb; sab += da * db; saa += da * da; sbb += db * db; }
  return sab / Math.sqrt(saa * sbb);
}

// ============================================================================
console.log('='.repeat(96));
console.log('FOLD PROFILE 01 — how the 2D deaths of a fold are shared among the p copies');
console.log('='.repeat(96));

// Build the ladder of tiles, recording each fold's ledger as we go.
const LADDER = DEEP ? [7, 11, 13, 17, 19, 23, 29, 31] : [7, 11, 13, 17, 19, 23, 29];
let T = tileT5();
const rowsS1 = [], rowsS3 = [], rowsS5 = [];
const palinBad = [], mirrorRows = [];

for (let i = 0; i < LADDER.length; i++) {
  const p = LADDER[i];
  const { D, W, s0 } = T;
  log(`fold T${T.x} (D=${D}) by ${p} ...`);

  const h = histogram(T, p);
  // K(k) = h(a_k) + h(a_k - 2), a_k = -k*W mod p
  const w = W % p;
  const K = new Float64Array(p);
  const anchor = new Int32Array(p);
  for (let k = 0; k < p; k++) {
    const a = ((-k * w) % p + p) % p;
    anchor[k] = a;
    K[k] = h[a] + h[(a - 2 + p) % p];
  }
  const st = stats(K);
  const mean = 2 * D / p;

  // S2: the mirror. Exact equality K(k) = K(p-1-k) is the REFUTED form; the
  // theorem is |K(k) - K(p-1-k)| <= 1, one unpaired slot at r = W-1.
  let pal = true, mirrorMax = 0;
  for (let k = 0; k < p; k++) {
    if (K[k] !== K[p - 1 - k]) pal = false;
    const d = Math.abs(K[k] - K[p - 1 - k]);
    if (d > mirrorMax) mirrorMax = d;
  }
  if (!pal) palinBad.push(`T${T.x} by ${p}`);
  mirrorRows.push({ x: T.x, p, exact: pal, maxDiff: mirrorMax });

  // Mobius bound: 2 * 3^(pi(x)-1) per class, so 4*3^(pi(x)-1) for the 2-set
  const pix = PR.filter((q) => q <= T.x).length;
  const mob = 4 * Math.pow(3, pix - 1);

  rowsS1.push({
    x: T.x, p, D, K0: K[0], mean, min: st.min, max: st.max, sd: st.sd,
    dev0: K[0] - mean, maxdev: Math.max(st.max - mean, mean - st.min),
    binom: Math.sqrt(2 * D / p), mob, pal
  });

  // S5: damage per anchor (only where D*p is affordable)
  if (D * p <= 3e8) {
    const mg = maxgapPerAnchor(T, p);
    const Karr = new Float64Array(p), Marr = new Float64Array(p);
    for (let a = 0; a < p; a++) { Karr[a] = h[a] + h[(a - 2 + p) % p]; Marr[a] = mg[a]; }
    const rho = pearson(Array.from(Karr), Array.from(Marr));
    // which anchor makes G2(new)?  which anchor takes most kills?
    let aG = 0, aK = 0;
    for (let a = 0; a < p; a++) { if (Marr[a] > Marr[aG]) aG = a; if (Karr[a] > Karr[aK]) aK = a; }
    // rank of the max-kill anchor by damage (1 = it also makes the record)
    const order = Array.from({ length: p }, (_, a) => a).sort((u, v) => Marr[v] - Marr[u]);
    const rankOfMaxKill = order.indexOf(aK) + 1;
    // rank of copy 0 by damage and by kills
    const orderK = Array.from({ length: p }, (_, a) => a).sort((u, v) => Karr[v] - Karr[u]);
    rowsS5.push({
      x: T.x, p, G2new: Marr[aG], aG, aK, rho,
      rankMaxKill: rankOfMaxKill, rankCopy0dmg: order.indexOf(0) + 1, rankCopy0kill: orderK.indexOf(0) + 1,
      dmgCopy0: Marr[0]
    });
  }

  T = fold(T, p);
  if (T.D !== D * (p - 2)) throw new Error('census law broken');
}

// ---------------------------------------------------------------------------
console.log('');
console.log('S1. THE LEDGER — kills per copy. Total is always exactly 2D.');
console.log('-'.repeat(96));
console.log(' tile |  fold p |            D |     2D/p (mean) |         K(0) |   K(0)-mean |     min K |     max K');
for (const r of rowsS1) {
  console.log(
    ` T${String(r.x).padEnd(3)} | ${String(r.p).padStart(7)} | ${r.D.toLocaleString().padStart(12)} | ` +
    `${r.mean.toFixed(2).padStart(15)} | ${r.K0.toLocaleString().padStart(12)} | ${(r.dev0 >= 0 ? '+' : '') + r.dev0.toFixed(1).padStart(10)} | ` +
    `${r.min.toLocaleString().padStart(9)} | ${r.max.toLocaleString().padStart(9)}`);
}

console.log('');
console.log('S2. THE MIRROR — exact equality is refuted, the theorem is a bound of 1');
console.log('-'.repeat(96));
console.log('   The involution r -> W-2-r pairs every slot except r = W-1, which is its own');
console.log('   image but whose representative does not shift. So exact equality must fail and');
console.log('   the true statement is |K(k) - K(p-1-k)| <= 1 (FOLD-PROFILE section 4).');
console.log('');
console.log('   exact equality K(k) = K(p-1-k): ' + (palinBad.length === 0
  ? 'holds at every fold tested'
  : 'FAILS at ' + palinBad.length + ' of ' + mirrorRows.length + ' folds, as predicted (' + palinBad.join(', ') + ')'));
console.log(' tile |  fold p |  exact equality |  max_k |K(k) - K(p-1-k)| |  theorem |...| <= 1 holds?');
for (const r of mirrorRows) {
  console.log(
    ` T${String(r.x).padEnd(3)} | ${String(r.p).padStart(7)} | ${(r.exact ? 'yes' : 'no').padStart(15)} | ` +
    `${String(r.maxDiff).padStart(25)} | ${r.maxDiff <= 1 ? 'YES' : 'NO'}`);
}

console.log('');
console.log('S3. THE SPREAD — is the scatter of K across copies square-root sized?');
console.log('-'.repeat(96));
console.log(' tile |  fold p |     mean 2D/p |        sd(K) |  sqrt(2D/p) |  sd/sqrt |  maxdev/mean |  relative spread');
for (const r of rowsS1) {
  console.log(
    ` T${String(r.x).padEnd(3)} | ${String(r.p).padStart(7)} | ${r.mean.toFixed(2).padStart(13)} | ${r.sd.toFixed(2).padStart(12)} | ` +
    `${r.binom.toFixed(2).padStart(11)} | ${(r.sd / r.binom).toFixed(3).padStart(8)} | ${(r.maxdev / r.mean).toExponential(2).padStart(12)} | ` +
    `${(r.sd / r.mean).toExponential(2).padStart(16)}`);
}

console.log('');
console.log('S4. THE PROVEN BOUND — |K(k) - 2D/p| <= 4*3^(pi(x)-1), elementary Mobius');
console.log('-'.repeat(96));
console.log(' tile |  fold p |     mean 2D/p |   true max |dev| |   Mobius bound |  bound/mean | bound useful?');
for (const r of rowsS1) {
  console.log(
    ` T${String(r.x).padEnd(3)} | ${String(r.p).padStart(7)} | ${r.mean.toFixed(2).padStart(13)} | ${r.maxdev.toFixed(1).padStart(16)} | ` +
    `${r.mob.toExponential(3).padStart(14)} | ${(r.mob / r.mean).toExponential(2).padStart(11)} | ${r.mob < r.mean ? 'YES' : 'no'}`);
}

console.log('');
console.log('S5. DOES KILL COUNT PREDICT DAMAGE? (anchor a = the 2-set {a, a-2})');
console.log('-'.repeat(96));
console.log(' tile |  fold p | G2(new) | argmax damage a | argmax kills a | corr(kills,damage) | rank of max-kill anchor | copy0 rank dmg/kill');
for (const r of rowsS5) {
  console.log(
    ` T${String(r.x).padEnd(3)} | ${String(r.p).padStart(7)} | ${String(r.G2new).padStart(7)} | ${String(r.aG).padStart(15)} | ` +
    `${String(r.aK).padStart(14)} | ${r.rho.toFixed(4).padStart(18)} | ${String(r.rankMaxKill + ' of ' + r.p).padStart(23)} | ` +
    `${r.rankCopy0dmg} / ${r.rankCopy0kill}`);
}

console.log('');
console.log('   (custody: G2(new) column must read 30, 42, 66, 108, 150, 204, 258 ... )');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/fold-profile-01-per-copy.js
//   invocation:  node research/fold-profile-01-per-copy.js
//   code-sha256: 7b378e9ce954905b3565f28ec95f89c46980e4b0f0b8325309d2ab049bb00876
//   out-sha256:  edcd8b40199a94a454c0f4de63a7d068c5f50b40186b78826753b59cb55dfb9d
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     2.4 s
// ============================================================================
// ================================================================================================
// FOLD PROFILE 01 — how the 2D deaths of a fold are shared among the p copies
// ================================================================================================
//
// S1. THE LEDGER — kills per copy. Total is always exactly 2D.
// ------------------------------------------------------------------------------------------------
//  tile |  fold p |            D |     2D/p (mean) |         K(0) |   K(0)-mean |     min K |     max K
//  T5   |       7 |            3 |            0.86 |            0 |       -0.9 |         0 |         2
//  T7   |      11 |           15 |            2.73 |            2 |       -0.7 |         1 |         4
//  T11  |      13 |          135 |           20.77 |           21 | +       0.2 |        20 |        23
//  T13  |      17 |        1,485 |          174.71 |          173 |       -1.7 |       169 |       178
//  T17  |      19 |       22,275 |         2344.74 |        2,347 | +       2.3 |     2,340 |     2,351
//  T19  |      23 |      378,675 |        32928.26 |       32,930 | +       1.7 |    32,923 |    32,935
//  T23  |      29 |    7,952,175 |       548425.86 |      548,411 |      -14.9 |   548,402 |   548,442
//
// S2. THE MIRROR — exact equality is refuted, the theorem is a bound of 1
// ------------------------------------------------------------------------------------------------
//    The involution r -> W-2-r pairs every slot except r = W-1, which is its own
//    image but whose representative does not shift. So exact equality must fail and
//    the true statement is |K(k) - K(p-1-k)| <= 1 (FOLD-PROFILE section 4).
//
//    exact equality K(k) = K(p-1-k): FAILS at 7 of 7 folds, as predicted (T5 by 7, T7 by 11, T11 by 13, T13 by 17, T17 by 19, T19 by 23, T23 by 29)
//  tile |  fold p |  exact equality |  max_k |K(k) - K(p-1-k)| |  theorem |...| <= 1 holds?
//  T5   |       7 |              no |                         1 | YES
//  T7   |      11 |              no |                         1 | YES
//  T11  |      13 |              no |                         1 | YES
//  T13  |      17 |              no |                         1 | YES
//  T17  |      19 |              no |                         1 | YES
//  T19  |      23 |              no |                         1 | YES
//  T23  |      29 |              no |                         1 | YES
//
// S3. THE SPREAD — is the scatter of K across copies square-root sized?
// ------------------------------------------------------------------------------------------------
//  tile |  fold p |     mean 2D/p |        sd(K) |  sqrt(2D/p) |  sd/sqrt |  maxdev/mean |  relative spread
//  T5   |       7 |          0.86 |         0.64 |        0.93 |    0.690 |      1.33e+0 |          7.45e-1
//  T7   |      11 |          2.73 |         1.21 |        1.65 |    0.734 |      6.33e-1 |          4.45e-1
//  T11  |      13 |         20.77 |         0.89 |        4.56 |    0.195 |      1.07e-1 |          4.29e-2
//  T13  |      17 |        174.71 |         2.82 |       13.22 |    0.214 |      3.27e-2 |          1.62e-2
//  T17  |      19 |       2344.74 |         3.29 |       48.42 |    0.068 |      2.67e-3 |          1.40e-3
//  T19  |      23 |      32928.26 |         3.45 |      181.46 |    0.019 |      2.05e-4 |          1.05e-4
//  T23  |      29 |     548425.86 |        13.40 |      740.56 |    0.018 |      4.35e-5 |          2.44e-5
//
// S4. THE PROVEN BOUND — |K(k) - 2D/p| <= 4*3^(pi(x)-1), elementary Mobius
// ------------------------------------------------------------------------------------------------
//  tile |  fold p |     mean 2D/p |   true max |dev| |   Mobius bound |  bound/mean | bound useful?
//  T5   |       7 |          0.86 |              1.1 |       3.600e+1 |     4.20e+1 | no
//  T7   |      11 |          2.73 |              1.7 |       1.080e+2 |     3.96e+1 | no
//  T11  |      13 |         20.77 |              2.2 |       3.240e+2 |     1.56e+1 | no
//  T13  |      17 |        174.71 |              5.7 |       9.720e+2 |     5.56e+0 | no
//  T17  |      19 |       2344.74 |              6.3 |       2.916e+3 |     1.24e+0 | no
//  T19  |      23 |      32928.26 |              6.7 |       8.748e+3 |     2.66e-1 | YES
//  T23  |      29 |     548425.86 |             23.9 |       2.624e+4 |     4.79e-2 | YES
//
// S5. DOES KILL COUNT PREDICT DAMAGE? (anchor a = the 2-set {a, a-2})
// ------------------------------------------------------------------------------------------------
//  tile |  fold p | G2(new) | argmax damage a | argmax kills a | corr(kills,damage) | rank of max-kill anchor | copy0 rank dmg/kill
//  T5   |       7 |      30 |               3 |              3 |             0.9360 |                  1 of 7 | 6 / 6
//  T7   |      11 |      42 |               5 |              2 |             0.5181 |                 3 of 11 | 7 / 8
//  T11  |      13 |      66 |               0 |             10 |             0.2494 |                11 of 13 | 1 / 3
//  T13  |      17 |     108 |               0 |              9 |            -0.0273 |                 7 of 17 | 1 / 12
//  T17  |      19 |     150 |               0 |              5 |             0.1910 |                 5 of 19 | 1 / 5
//  T19  |      23 |     204 |               5 |              3 |            -0.0398 |                 6 of 23 | 12 / 5
//  T23  |      29 |     258 |               2 |             22 |            -0.1685 |                26 of 29 | 18 / 24
//
//    (custody: G2(new) column must read 30, 42, 66, 108, 150, 204, 258 ... )
//    done in 2.3s
// ───── stderr ─────
//    [0.0s] fold T5 (D=3) by 7 ...
//    [0.0s] fold T7 (D=15) by 11 ...
//    [0.0s] fold T11 (D=135) by 13 ...
//    [0.0s] fold T13 (D=1485) by 17 ...
//    [0.0s] fold T17 (D=22275) by 19 ...
//    [0.0s] fold T19 (D=378675) by 23 ...
//    [0.1s] fold T23 (D=7952175) by 29 ...
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. CUSTODY FIRST. The G2(new) column reads 30, 42, 66, 108, 150, 204, 258,
//    which is what the file's own last line demands. Note that line is an
//    instruction to the reader, not a check: nothing in the code compares the
//    column to the expected septet, so a future regression would print a wrong
//    row silently. The census law IS enforced, at line 217
//    (`if (T.D !== D * (p - 2)) throw new Error('census law broken')`), and
//    that assertion is exactly equivalent to S1's title claim "total is always
//    exactly 2D" — which is therefore true but never displayed. The table
//    prints mean, K(0), min and max, from which the sum cannot be recovered.
// 2. THE LEDGER IS FLAT AND COPY 0 IS UNREMARKABLE. Across all seven folds the
//    whole spread of K over the p copies is a handful of slots: at T23 by 29,
//    min 548,402, max 548,442, mean 548,425.86, a total range of 40 on a mean
//    of half a million. K(0) sits at 548,411, i.e. 14.9 BELOW the mean, and the
//    signed K(0)-mean column has no consistent sign (-0.9, -0.7, +0.2, -1.7,
//    +2.3, +1.7, -14.9). The anchor copy — the one p "genuinely sieves" — is
//    not special in the kill ledger. Seven points, so no trend is claimable.
// 3. THE SPREAD IS FAR SUB-BINOMIAL, AND THIS IS THE STRONGEST NUMBER HERE.
//    sd(K)/sqrt(2D/p) runs 0.690, 0.734, 0.195, 0.214, 0.068, 0.019, 0.018.
//    A binomial share-out of 2D deaths among p copies would give 1.0. By T19
//    and T23 the observed scatter is under 2% of the binomial prediction: sd(K)
//    is 3.45 and 13.40 where sqrt(2D/p) is 181.46 and 740.56. The deaths are
//    distributed almost perfectly evenly, which is the CRT rigidity of h(a),
//    not a random allocation. S3's section title asks the question and the
//    table answers it; the script prints no verdict line, so the answer exists
//    only in the ratio column.
// 4. THE MOBIUS BOUND ONLY STARTS PAYING AT T19. bound/mean = 42.0, 39.6, 15.6,
//    5.56, 1.24, 0.266, 0.0479. It is worse than useless (bound exceeds the
//    mean itself) at T5 through T17 and becomes informative only at the last
//    two folds. Even there it is loose by a factor of ~1300 at T19
//    (8,748 against a true max deviation of 6.7) and ~1100 at T23 (26,244 = 4·3^8,
//    printed as 2.624e+4, against 23.9). The elementary bound is the right SHAPE and hopeless in
//    constant; reading 3 says why, the truth is sub-square-root and the bound
//    is 3^{pi(x)}.
// 5. S5 ANSWERS ITS OWN QUESTION NO, AND THE OUTPUT SAYS SO MORE SHARPLY THAN
//    THE HEADER. corr(kills, damage) runs 0.9360, 0.5181, 0.2494, -0.0273,
//    0.1910, -0.0398, -0.1685: it decays to zero and then goes NEGATIVE at the
//    three largest folds. The rank of the max-kill anchor among damage-makers
//    is 26 of 29 at T23 and 11 of 13 at T11 — at the big folds the copy that
//    kills the most is among the WORST at making the record gap. Caveat on the
//    first two rows: the correlation at T5 is over 7 points and at T7 over 11,
//    so 0.936 and 0.518 are noise, not a decaying trend from a high start.
// 6. THE MIRROR SECTION IS NOW HONEST AND IT EXTENDS THE THEOREM. Exact
//    equality K(k) = K(p-1-k) fails at 7 of 7 folds, as the corrected header
//    predicts, and max_k |K(k) - K(p-1-k)| = 1 at every one of the seven. That
//    is the Mirror Ledger bound of FOLD-PROFILE section 4, previously verified
//    in fold-profile-02 S4 over fixed tiles; the seven ladder folds T5-by-7
//    through T23-by-29 are additional cells and all hold.
// 7. SCOPE, AND ONE HEADER CLAIM THE CODE DOES NOT DELIVER. Header line 19
//    promises measurements "for every fold on the ladder AND OFF IT". Line 151
//    is `const LADDER = DEEP ? [7,11,13,17,19,23,29,31] : [7,11,13,17,19,23,29]`
//    — both branches are the prime ladder, and DEEP adds the fold by 31, which
//    is the next ladder rung, not an off-ladder fold. There is no off-ladder
//    fold in this file in either mode. Logged, not fixed: the phrase may mean
//    "the composite-modulus case" and the intent cannot be read off the code.
//    DEEP=1 was not exercised in this run. Runtime 2.4 s, plain node, no heap
//    flag needed despite the header offering one for DEEP.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION: the bound/mean septet of reading 4, 42.0,
//   39.6, 15.6, 5.56, 1.24, 0.266, 0.0479, is the last numeric column of the
//   S4 table, printed in exponent form as 4.20e+1, 3.96e+1, 1.56e+1, 5.56e+0,
//   1.24e+0, 2.66e-1, 4.79e-2. Same for the 8,748 of reading 4, printed
//   8.748e+3, where the reading adds a thousands comma.
// TOKENIZER ARTIFACT, not a figure: 7,11,13,17,19,23,29,31 and
//   7,11,13,17,19,23,29 in reading 7 are the two array literals of the LADDER
//   line quoted as source text, read by the scanner as single numbers.
// DERIVED IN THIS READING by arithmetic over printed values:
//   ~1300 is 8.748e+3 divided by the printed max deviation 6.7, which is
//   1305.7, quoted to two figures.
//   ~1100 is 2.624e+4 divided by the printed max deviation 23.9, which is
//   1098.1, quoted to two figures. Both check out.
//   26,244 is the exact integer the S4 bound column rounds to 2.624e+4, and
//   the reading states that identification in place. It is 4 * 3^8, which the
//   reading also gives, and 4 * 6561 = 26244. Checked.
// IN-CODE: the 151 of reading 7 is a source line number, not a measurement.
//   Line 151 of this file is the `const LADDER = DEEP ? ...` line quoted
//   immediately after it, still at that line number.
// ---------------------------------------------------------------------------
