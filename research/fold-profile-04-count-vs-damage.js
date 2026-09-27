// ============================================================================
// FOLD PROFILE 04 — DOES THE KILL COUNT PREDICT THE DAMAGE?
// ============================================================================
// 01 found no correlation on the seven ladder folds between how many slots a
// copy loses and how big a gap that copy ends up carrying. Seven points is not
// a result. This file runs the grid.
//
// For a tile T_x and a fold prime p, every anchor a in Z/p defines one copy: it
// deletes the residue 2-set {a, a-2}. Two numbers per anchor:
//     kills(a)  = h(a) + h(a-2)                        (how much is lost)
//     dmg(a)    = largest gap left after that deletion  (how bad it is)
// and G2(new) = max_a dmg(a) by the copy theorem. If kills predicted dmg we
// would have a cheap proxy for the fold multiplier: pick the fattest residue
// class and look only there. The question is whether that works.
//
//   S1  Pearson correlation of kills against dmg, over a grid of (x, p)
//   S2  the rank of the max-kill anchor in the damage order, against the
//       uniform null (p+1)/2
//   S3  the converse: the rank of the record-making anchor in the kill order
//   S4  the same for maxsum-style near-records: top-3 damage anchors
//
// Run:  node fold-profile-04-count-vs-damage.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

function primesTo(n) {
  const c = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { out.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return out;
}
const PR = primesTo(500);

function tileT5() { return { x: 5, W: 30, s0: 11, D: 3, gaps: Uint16Array.from([6, 12, 12]) }; }
function fold(T, p) {
  const { W, s0, D, gaps } = T;
  const Dn = D * (p - 2), Wn = W * p;
  const ng = new Uint16Array(Dn);
  const w = W % p, dead2 = p - 2;
  let idx = 0, prev = -1, first = -1;
  for (let k = 0; k < p; k++) {
    const base = k * W, shift = (k * w) % p;
    let r = (s0 + shift) % p, pos = base + s0;
    for (let j = 0; j < D; j++) {
      if (r !== 0 && r !== dead2) { if (first < 0) first = pos; else ng[idx++] = pos - prev; prev = pos; }
      const g = gaps[j]; pos += g; r += g % p; if (r >= p) r -= p;
    }
  }
  ng[idx++] = (first + Wn) - prev;
  if (idx !== Dn) throw new Error('census mismatch');
  return { x: p, W: Wn, s0: first, D: Dn, gaps: ng };
}

const TILES = {};
{ let T = tileT5(); TILES[5] = T; for (const p of [7, 11, 13, 17, 19, 23]) { T = fold(T, p); TILES[p] = T; } }

// kills(a) and dmg(a) for every anchor a
function cell(x, p) {
  const T = TILES[x], { s0, D, gaps, W } = T;
  const rs = p < 256 ? new Uint8Array(D) : new Uint16Array(D);
  const h = new Float64Array(p);
  { let r = s0 % p; for (let j = 0; j < D; j++) { rs[j] = r; h[r]++; const g = gaps[j] % p; r += g; if (r >= p) r -= p; } }
  const kills = new Float64Array(p), dmg = new Float64Array(p);
  for (let a = 0; a < p; a++) {
    const b = (a - 2 + p) % p;
    kills[a] = h[a] + h[b];
    let best = 0, acc = 0, started = false, lead = 0;
    for (let j = 0; j < D; j++) {
      if (rs[j] !== a && rs[j] !== b) {
        if (started) { if (acc > best) best = acc; } else { started = true; lead = acc; }
        acc = 0;
      }
      acc += gaps[j];
    }
    const wrapGap = acc + lead;
    if (started) { if (wrapGap > best) best = wrapGap; } else best = W;
    dmg[a] = best;
  }
  return { kills, dmg, D, W };
}

function pearson(a, b) {
  const n = a.length; let ma = 0, mb = 0;
  for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; } ma /= n; mb /= n;
  let sab = 0, saa = 0, sbb = 0;
  for (let i = 0; i < n; i++) { const da = a[i] - ma, db = b[i] - mb; sab += da * db; saa += da * da; sbb += db * db; }
  return saa === 0 || sbb === 0 ? NaN : sab / Math.sqrt(saa * sbb);
}

console.log('='.repeat(104));
console.log('FOLD PROFILE 04 — kill count against damage, over a grid of folds');
console.log('='.repeat(104));
console.log('');
console.log(' tile |  fold p |  G2(new) | corr(kills,dmg) |  2/sqrt(p) | rank of max-kill anchor | rank of record anchor');
console.log('      |         |          |                 |   (noise)  |   by damage (null=(p+1)/2) |  by kills (null same)');
console.log('-'.repeat(104));

const rows = [];
const GRID = [
  [11, [13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61]],
  [13, [17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61]],
  [17, [19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61]],
  [19, [23, 29, 31, 37, 41, 43, 47, 53]],
  [23, [29, 31, 37, 41]],
];
for (const [x, ps] of GRID) {
  for (const p of ps) {
    const c = cell(x, p);
    const K = Array.from(c.kills), M = Array.from(c.dmg);
    const rho = pearson(K, M);
    const byDmg = Array.from({ length: p }, (_, a) => a).sort((u, v) => M[v] - M[u] || u - v);
    const byKill = Array.from({ length: p }, (_, a) => a).sort((u, v) => K[v] - K[u] || u - v);
    const aK = byKill[0], aG = byDmg[0];
    const rankMaxKill = byDmg.indexOf(aK) + 1;
    const rankRecord = byKill.indexOf(aG) + 1;
    rows.push({ x, p, G2: M[aG], rho, rankMaxKill, rankRecord, null: (p + 1) / 2 });
    console.log(
      ` T${String(x).padEnd(3)} | ${String(p).padStart(7)} | ${String(M[aG]).padStart(8)} | ${rho.toFixed(4).padStart(15)} | ` +
      `${(2 / Math.sqrt(p)).toFixed(3).padStart(10)} | ${String(rankMaxKill + ' of ' + p).padStart(26)} | ${rankRecord} of ${p}`);
  }
}

console.log('');
console.log('AGGREGATE');
console.log('-'.repeat(104));
const rhos = rows.map((r) => r.rho).filter((v) => !isNaN(v));
const mean = (v) => v.reduce((a, b) => a + b, 0) / v.length;
const mr = mean(rhos);
const sd = Math.sqrt(mean(rhos.map((v) => (v - mr) * (v - mr))));
console.log(`   cells: ${rows.length}`);
console.log(`   mean corr(kills, dmg) = ${mr.toFixed(4)}   sd = ${sd.toFixed(4)}   (a real signal would sit well above +0.3)`);
console.log(`   cells with |corr| > 2/sqrt(p): ${rows.filter((r) => Math.abs(r.rho) > 2 / Math.sqrt(r.p)).length} of ${rows.length}`);
const rmk = mean(rows.map((r) => r.rankMaxKill / ((r.p + 1) / 2)));
const rrc = mean(rows.map((r) => r.rankRecord / ((r.p + 1) / 2)));
console.log(`   mean (rank of max-kill anchor) / null   = ${rmk.toFixed(3)}   (1.000 = no information, <1 = predictive)`);
console.log(`   mean (rank of record anchor by kills)/null = ${rrc.toFixed(3)}`);
const hits = rows.filter((r) => r.rankMaxKill === 1).length;
console.log(`   cells where the max-kill anchor IS the record anchor: ${hits} of ${rows.length}` +
  `   (expected by chance: ${rows.reduce((a, r) => a + 1 / r.p, 0).toFixed(2)})`);

// restrict to the deeper tiles, where D/p is large enough for the counts to be meaningful
const deep = rows.filter((r) => r.x >= 17);
const dr = mean(deep.map((r) => r.rho));
console.log('');
console.log(`   restricted to T17 and deeper (${deep.length} cells): mean corr = ${dr.toFixed(4)}, ` +
  `mean rank ratio = ${mean(deep.map((r) => r.rankMaxKill / ((r.p + 1) / 2))).toFixed(3)}`);

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-04-count-vs-damage.js
//   invocation:  node research/fold-profile-04-count-vs-damage.js
//   code-sha256: 471b4d828bea1cdac2ce6ca95b6955de7b383a7cdcd2d125b486d143b073c353
//   out-sha256:  e0c5d35ded4d4973d3bcbbf12f4e5cebcde4037d3a2c79b7c2a4b83b1bcecb0a
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     2.6 s
// ============================================================================
// ========================================================================================================
// FOLD PROFILE 04 — kill count against damage, over a grid of folds
// ========================================================================================================
//
//  tile |  fold p |  G2(new) | corr(kills,dmg) |  2/sqrt(p) | rank of max-kill anchor | rank of record anchor
//       |         |          |                 |   (noise)  |   by damage (null=(p+1)/2) |  by kills (null same)
// --------------------------------------------------------------------------------------------------------
//  T11  |      13 |       66 |          0.2494 |      0.555 |                   11 of 13 | 3 of 13
//  T11  |      17 |       96 |         -0.1835 |      0.485 |                    5 of 17 | 7 of 17
//  T11  |      19 |       96 |          0.1748 |      0.459 |                    3 of 19 | 8 of 19
//  T11  |      23 |       66 |          0.4767 |      0.417 |                    2 of 23 | 8 of 23
//  T11  |      29 |       66 |          0.0370 |      0.371 |                   21 of 29 | 10 of 29
//  T11  |      31 |       66 |         -0.0928 |      0.359 |                   21 of 31 | 31 of 31
//  T11  |      37 |       66 |         -0.3311 |      0.329 |                   34 of 37 | 28 of 37
//  T11  |      41 |       66 |          0.2057 |      0.312 |                    4 of 41 | 8 of 41
//  T11  |      43 |       66 |          0.0812 |      0.305 |                   20 of 43 | 6 of 43
//  T11  |      47 |       66 |          0.3814 |      0.292 |                   16 of 47 | 28 of 47
//  T11  |      53 |       66 |          0.1671 |      0.275 |                   24 of 53 | 4 of 53
//  T11  |      59 |       66 |          0.5346 |      0.260 |                    5 of 59 | 13 of 59
//  T11  |      61 |       66 |          0.3259 |      0.256 |                    3 of 61 | 31 of 61
//  T13  |      17 |      108 |         -0.0273 |      0.485 |                    7 of 17 | 12 of 17
//  T13  |      19 |      108 |          0.0258 |      0.459 |                   10 of 19 | 6 of 19
//  T13  |      23 |      108 |         -0.5366 |      0.417 |                   13 of 23 | 16 of 23
//  T13  |      29 |       96 |         -0.4771 |      0.371 |                   17 of 29 | 20 of 29
//  T13  |      31 |       96 |          0.0900 |      0.359 |                   20 of 31 | 10 of 31
//  T13  |      37 |       96 |          0.1123 |      0.329 |                   24 of 37 | 22 of 37
//  T13  |      41 |       96 |          0.3393 |      0.312 |                    4 of 41 | 40 of 41
//  T13  |      43 |       96 |          0.1138 |      0.305 |                   29 of 43 | 5 of 43
//  T13  |      47 |       96 |          0.2462 |      0.292 |                    3 of 47 | 31 of 47
//  T13  |      53 |       96 |          0.3971 |      0.275 |                   16 of 53 | 52 of 53
//  T13  |      59 |       96 |         -0.0237 |      0.260 |                   17 of 59 | 20 of 59
//  T13  |      61 |       96 |          0.2716 |      0.256 |                    6 of 61 | 46 of 61
//  T17  |      19 |      150 |          0.1910 |      0.459 |                    5 of 19 | 5 of 19
//  T17  |      23 |      150 |          0.0755 |      0.417 |                    2 of 23 | 10 of 23
//  T17  |      29 |      156 |          0.3537 |      0.371 |                   15 of 29 | 7 of 29
//  T17  |      31 |      156 |         -0.0447 |      0.359 |                   14 of 31 | 3 of 31
//  T17  |      37 |      156 |         -0.4817 |      0.329 |                   17 of 37 | 8 of 37
//  T17  |      41 |      150 |         -0.0840 |      0.312 |                   15 of 41 | 26 of 41
//  T17  |      43 |      150 |          0.1216 |      0.305 |                   13 of 43 | 10 of 43
//  T17  |      47 |      150 |         -0.2228 |      0.292 |                   13 of 47 | 32 of 47
//  T17  |      53 |      168 |         -0.0641 |      0.275 |                   52 of 53 | 20 of 53
//  T17  |      59 |      150 |          0.0346 |      0.260 |                   43 of 59 | 34 of 59
//  T17  |      61 |      150 |         -0.1095 |      0.256 |                   48 of 61 | 45 of 61
//  T19  |      23 |      204 |         -0.0398 |      0.417 |                    6 of 23 | 8 of 23
//  T19  |      29 |      210 |          0.2982 |      0.371 |                    1 of 29 | 1 of 29
//  T19  |      31 |      222 |         -0.2136 |      0.359 |                    5 of 31 | 30 of 31
//  T19  |      37 |      192 |         -0.0384 |      0.329 |                   14 of 37 | 12 of 37
//  T19  |      41 |      186 |         -0.2190 |      0.312 |                   26 of 41 | 18 of 41
//  T19  |      43 |      186 |          0.2463 |      0.305 |                   11 of 43 | 39 of 43
//  T19  |      47 |      198 |          0.2683 |      0.292 |                    1 of 47 | 1 of 47
//  T19  |      53 |      186 |          0.2043 |      0.275 |                   11 of 53 | 36 of 53
//  T23  |      29 |      258 |         -0.1685 |      0.371 |                   26 of 29 | 18 of 29
//  T23  |      31 |      258 |         -0.0041 |      0.359 |                   15 of 31 | 24 of 31
//  T23  |      37 |      240 |         -0.0678 |      0.329 |                    8 of 37 | 36 of 37
//  T23  |      41 |      240 |          0.1551 |      0.312 |                    1 of 41 | 1 of 41
//
// AGGREGATE
// --------------------------------------------------------------------------------------------------------
//    cells: 48
//    mean corr(kills, dmg) = 0.0573   sd = 0.2413   (a real signal would sit well above +0.3)
//    cells with |corr| > 2/sqrt(p): 11 of 48
//    mean (rank of max-kill anchor) / null   = 0.763   (1.000 = no information, <1 = predictive)
//    mean (rank of record anchor by kills)/null = 0.931
//    cells where the max-kill anchor IS the record anchor: 3 of 48   (expected by chance: 1.47)
//
//    restricted to T17 and deeper (23 cells): mean corr = 0.0083, mean rank ratio = 0.745
//
//    done in 2.5s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THE HEADLINE ANSWER IS NO, AND IT REPRODUCES INTO FOLD-PROFILE section 6
//    EXACTLY. Over 48 cells, mean corr(kills, dmg) = 0.0573 with sd 0.2413, and
//    restricted to T17 and deeper (23 cells) it falls to 0.0083. The rank of
//    the max-kill anchor by damage averages 0.763 of the uniform null, 0.745 at
//    depth, and the max-kill anchor is the record anchor in 3 of 48 cells
//    against 1.47 expected. Every one of those figures is quoted in
//    FOLD-PROFILE section 6 and every one matches.
// 2. THE CHEAP PROXY IS DEAD, WHICH IS THE POINT. If kills predicted damage the
//    fold multiplier would have an O(1) shortcut: find the fattest residue
//    class, look only there. corr is zero on average and its sign flips freely
//    (-0.5366 at T13 by 23, +0.5346 at T11 by 59), so no such shortcut exists.
//    This is a genuine negative result and it prunes a line of attack.
// 3. THE PER-CELL CORRELATIONS ARE NOT NOISE, EVEN THOUGH THEIR MEAN IS. The
//    script prints its own noise scale, 2/sqrt(p), and then prints "cells with
//    |corr| > 2/sqrt(p): 11 of 48". 2/sqrt(p) is the two-sigma width for a
//    Pearson r over p points, so under a pure null roughly 4.6% of cells should
//    exceed it: about 2.2 of 48. Eleven is five times that. So the correct
//    reading is not "no relationship" but "a relationship of random sign,
//    cell by cell, that averages to nothing" — which kills the proxy just as
//    dead but is a different statement. CAVEAT: the p anchors within one cell
//    are not independent draws (dmg(a) is a max over a common gap word), so the
//    sampling width of r may exceed 1/sqrt(p-1) and the excess may be smaller
//    than 5x. Nothing in the file estimates that width. UNRESOLVED, and the
//    file does not mention the exceedance count in any conclusion.
// 4. THE TWO RANK STATISTICS DISAGREE WITH EACH OTHER AND WITH THE CORRELATION.
//    Under the null, rank/((p+1)/2) has mean 1 and sd about 2/sqrt(12) = 0.577,
//    so over 48 cells the standard error of the mean is about 0.083. The
//    max-kill-anchor rank ratio, 0.763, is therefore about 2.8 of those below
//    1 (2.1 at depth over 23 cells). The CONVERSE statistic, the record
//    anchor's rank by kills, is 0.931 — about 0.8 below 1, i.e. nothing. A
//    forward-but-not-backward asymmetry on the same 48 cells. Both are
//    inflated by cell dependence (the same tile appears with up to 13 folding
//    primes, and the T11 row's G2(new) is pinned at 66 in ten of thirteen
//    cells), so I would not call 2.8 sigma a detection. It is the one number
//    in the file that argues against its own conclusion and it goes unremarked.
// 5. S4 IS ADVERTISED AND DOES NOT EXIST. Header line 20 lists "S4 the same for
//    maxsum-style near-records: top-3 damage anchors". There is no top-3 code
//    in the file and no such block in the output above. S1, S2 and S3 all exist
//    but are unlabelled: the run prints one table and one AGGREGATE block, so a
//    reader cannot match output to the advertised sections. LOGGED, not fixed —
//    writing S4 is new work, not a repair.
// 6. THE GRID IS SHALLOW WHERE IT MATTERS. 48 cells, but T19 gets 8 and T23
//    gets 4, and the T23 sweep stops at p = 41. The "T17 and deeper" restriction
//    that gives the cleanest answer (mean corr 0.0083) is 23 cells of which 12
//    are T17. The prime table is primesTo(500) and the largest fold used is 61,
//    so the sweep is nowhere near its own limit; the constraint is tile size,
//    not the prime list. Runtime 2.5 s.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// DEFINITION constant: 0.577 in reading 4 is 2/sqrt(12) = 0.5774, the standard
// deviation of a uniform draw on [0,2], which is what rank/((p+1)/2) is under
// the null. It comes from the null model, not from any run.
//
// DERIVED IN THIS READING by arithmetic: 0.083 is that null sd spread over the
// 48 cells the table above contains, 0.5774/sqrt(48) = 0.0833. The 0.0812 in
// the T11 row of the printed table is a different quantity and a digit
// coincidence.
//
// IN-CODE: 500 in reading 6 is the argument of primesTo(500) at line 35, the
// prime table this sweep draws folds from.
// ---------------------------------------------------------------------------
