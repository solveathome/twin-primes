// A3-05: BOUND L FROM RUN-CONSISTENCY PLUS CRT INDEPENDENCE
//
// L = longest run of CONSECUTIVE twin slots of T_x that a single 2-set
// {a, a-2} mod p can delete when folding T_x by p.
//
// Condition (i)  each of the L-1 gaps in the run is = 0, +-2 (mod p).
// Condition (ii) the residues lie in ONE 2-set, so from residue a only gaps
//                = 0 or -2 are legal, and from a-2 only gaps = 0 or +2.
//
// Sections
//   1  custody: reproduce the measured diagonal L (and correct it at fold 29)
//   2  the qualifying-value law, derived and checked by enumeration
//   3  what condition (ii) buys over condition (i), measured
//   4  the Run Cost Theorem: any two ADJACENT gaps of a run sum to >= 6p
//   5  the maxsum reduction  L <= 1 + max{m : maxsum_m >= c_min(m)}
//   6  the run-of-large-gaps reduction, the moment test, and hypothesis H''
//   7  the gap tail itself
//   8  what the proven bound gives asymptotically, both branches
//   9  kappa(m) and Theorem C, the same law without adjacency
//
// Custody: tiles built exactly as research/Lgrowth.js builds them.
'use strict';

const t0 = Date.now();
const tick = (m) => console.log(`      [${((Date.now() - t0) / 1000).toFixed(1)}s] ${m}`);
const pad = (s, n) => String(s).padStart(n);

// ============================================================ construction ==
function buildTiles(upto) {
  let P = 30, slots = Float64Array.from([11, 17, 29]);
  const tiles = [{ x: 5, W: 30, S: slots }];
  for (const p of [7, 11, 13, 17, 19, 23].filter(q => q <= upto)) {
    const D = slots.length, keep = new Float64Array(D * (p - 2));
    let n = 0;
    for (let k = 0; k < p; k++)
      for (let i = 0; i < D; i++) {
        const r = slots[i] + k * P;
        if (r % p !== 0 && (r + 2) % p !== 0) keep[n++] = r;
      }
    P *= p; slots = keep;
    tiles.push({ x: p, W: P, S: slots });
  }
  return tiles;
}

// ==================================================== the qualifying law ====
// PROVEN.  Gaps of T_x are positive multiples of 6 for x >= 5.  A gap can sit
// inside a run only if g = 0, +2 or -2 (mod p).  Write eps = +1 if p = 1 (mod 6)
// and eps = -1 if p = 5 (mod 6).  Then, solving 6 | g together with the
// congruence:
//     class  0 : g in { 6p, 12p, 18p, ... }
//     class +2 : g in { (3+eps)p + 2 } + 6p*N
//     class -2 : g in { (3-eps)p - 2 } + 6p*N
// and the identity that drives everything below:
//     min(class +2) + min(class -2) = (3+eps)p + 2 + (3-eps)p - 2 = 6p.
function qualLaw(p) {
  const eps = (p % 6 === 1) ? 1 : -1;
  const plus = (3 + eps) * p + 2, minus = (3 - eps) * p - 2, z = 6 * p;
  return { eps, z, plus, minus, theta: Math.min(plus, minus), big: Math.max(plus, minus) };
}
function qualLawCheck(p, upTo) {
  const out = { z: [], plus: [], minus: [] };
  for (let g = 6; g <= upTo; g += 6) {
    const m = g % p;
    if (m === 0) out.z.push(g); else if (m === 2) out.plus.push(g); else if (m === p - 2) out.minus.push(g);
  }
  return out;
}
// c_min(m): least possible sum of m consecutive gaps inside a run.
// DP on the residue state: from a, a gap = 0 stays and a gap = -2 switches;
// from a-2, a gap = 0 stays and a gap = +2 switches.
function cmin(p, m) {
  const q = qualLaw(p);
  let A = [0, 0];
  for (let i = 0; i < m; i++) A = [Math.min(A[0] + q.z, A[1] + q.plus), Math.min(A[1] + q.z, A[0] + q.minus)];
  return Math.min(A[0], A[1]);
}

// ============================================================== analyser ====
// One streaming pass over the slots of a tile in increasing order.
class Analyzer {
  constructor(p, theta, maxm) {
    this.p = p; this.theta = theta; this.M = maxm;
    this.prev = -1;
    this.pa1 = -1; this.pa2 = -1; this.pv1 = 0; this.pv2 = 0;
    this.bestL = 0; this.bestAt = -1; this.bestRun = null;
    this.qbest = 0; this.qrun = 0;          // condition (i) only
    this.tbest = 0; this.trun = 0;          // gaps >= theta only
    this.n = 0; this.ngap = 0; this.total = 0;
    this.hist = new Int32Array(8192);
    this.cls = { z: 0, plus: 0, minus: 0 };
    this.RING = 64;
    this.ring = new Int32Array(this.RING); this.rp = 0;
    this.win = new Float64Array(maxm + 1);
    this.maxsum = new Float64Array(maxm + 1);
    this.hitm = new Float64Array(maxm + 1);   // windows of m gaps with sum >= c_min(m)
    this.bigm = new Float64Array(maxm + 1);   // windows of m gaps EACH >= theta
    this.cm = []; for (let m = 0; m <= maxm; m++) this.cm.push(m === 0 ? 0 : cmin(p, m));
  }
  push(s) {
    const p = this.p, r = s % p, R = this.RING;
    // ---- gap bookkeeping FIRST, so the ring already holds the gap that ends
    // ---- at this slot when the run DP looks back
    if (this.prev >= 0) {
      const g = s - this.prev;
      this.ngap++; this.total += g;
      if (g / 6 < 8192) this.hist[g / 6]++;
      const m = g % p;
      if (m === 0 || m === 2 || m === p - 2) {
        this.qrun++; if (this.qrun > this.qbest) this.qbest = this.qrun;
        if (m === 0) this.cls.z++; else if (m === 2) this.cls.plus++; else this.cls.minus++;
      } else this.qrun = 0;
      if (g >= this.theta) {
        this.trun++; if (this.trun > this.tbest) this.tbest = this.trun;
        const lim = this.trun < this.M ? this.trun : this.M;
        for (let mm = 1; mm <= lim; mm++) this.bigm[mm]++;
      } else this.trun = 0;
      for (let mm = this.M; mm >= 1; mm--) {
        this.win[mm] += g;
        if (this.ngap > mm) this.win[mm] -= this.ring[((this.rp - mm) % R + R) % R];
        if (this.ngap >= mm) {
          if (this.win[mm] > this.maxsum[mm]) this.maxsum[mm] = this.win[mm];
          if (this.win[mm] >= this.cm[mm]) this.hitm[mm]++;
        }
      }
      this.ring[this.rp] = g; this.rp = (this.rp + 1) % R;
    }
    // ---- run DP over 2-sets ----
    const a1 = r, a2 = (r + 2) % p;
    let v1 = 1, v2 = 1;
    if (this.prev >= 0) {
      if (a1 === this.pa1) v1 = this.pv1 + 1; else if (a1 === this.pa2) v1 = this.pv2 + 1;
      if (a2 === this.pa1) v2 = this.pv1 + 1; else if (a2 === this.pa2) v2 = this.pv2 + 1;
    }
    const best = v1 > v2 ? v1 : v2;
    if (best > this.bestL) {
      this.bestL = best; this.bestAt = s;
      const k = best - 1, out = [];
      for (let j = k; j >= 1; j--) out.push(this.ring[((this.rp - j) % R + R) % R]);
      this.bestRun = out;
    }
    this.pa1 = a1; this.pa2 = a2; this.pv1 = v1; this.pv2 = v2;
    this.prev = s; this.n++;
  }
}

function runTile(S, W, p, maxm, label) {
  const q = qualLaw(p);
  const A = new Analyzer(p, q.theta, maxm);
  const N = S.length;
  for (let i = 0; i < N; i++) A.push(S[i]);
  // FIX 2026-08-18. The wrap replay used to be `min(N, 128)` slots, i.e. ONE
  // copy of the tile at most. On T_5, N = 3, so the replay gave 6 slots = 5
  // gaps and no window of 6 or more gaps ever completed: the maxsum row
  // printed 12,24,30,42,48,0,0,0 where the cyclic truth for the gap word
  // 6,12,12 is 12,24,30,42,54,60,72,84. When the single copy is too short for
  // the longest window the replay now runs for a WHOLE NUMBER OF PERIODS,
  // enough for every one of the N phases at every m <= maxm, so the window
  // statistics stay exactly cyclic instead of being cut off mid-period.
  // Scope, checked by running both ways rather than reasoned: the guard fires
  // on T_5 alone. T_7 is the next shortest at N = 15 and already reaches
  // 15 + 15 - 1 = 29 gaps against maxm = 24. Extending T_7 as well was tried
  // and REJECTED: its one-copy replay gives 4/29 = 0.1379 for the fold-11
  // moment fraction against a true cyclic 2/15 = 0.1333, and a longer replay
  // moves it to 6/39 = 0.1538, i.e. further away. The replay's phase bias on
  // the short tiles is a separate, pre-existing defect and is NOT fixed here.
  let EXT = Math.min(N, 128);
  if (N + EXT - 1 < maxm) EXT = Math.ceil((maxm + N - 1) / N) * N + 1 - N;
  for (let i = 0; i < EXT; i++) A.push(S[i % N] + W * (1 + Math.floor(i / N)));
  return A;
}

// T_29 is 214.7M slots.  Generate it from T_23 on the fly, block by block.
function runT29(t23, p, maxm) {
  const q = qualLaw(p);
  const A = new Analyzer(p, q.theta, maxm);
  const S = t23.S, W = t23.W, N = S.length;
  const head = [];
  for (let k = 0; k < 29; k++) {
    const off = k * W;
    for (let i = 0; i < N; i++) {
      const s = S[i] + off;
      if (s % 29 === 0 || (s + 2) % 29 === 0) continue;
      A.push(s);
      if (head.length < 128) head.push(s);
    }
    tick(`  T29 block ${k + 1}/29, slots so far ${A.n}`);
  }
  const W29 = W * 29;
  // CORRECTION 2026-08-17. A.n is a PUSH counter, and the wrap replay below
  // pushes the 128-slot head a second time to close the cycle. Record the true
  // census here, before the replay, or the slots column of reading 1 reports
  // D + 128 = 214,708,853 where D(T29) = 214,708,725 = 3*prod_{7<=q<=29}(q-2).
  // The same run's own progress line prints the correct 214,708,725.
  A.D = A.n;
  for (const s of head) A.push(s + W29);
  return A;
}

// kappa(m): the largest number of slots a single 2-set can delete inside a
// stretch of the old tile that becomes m consecutive NEW gaps.  kappa(1) = L.
// Exact.  For each 2-set a, walk the slots once and build r_1, r_2, ..., the
// number of deleted slots strictly between consecutive SURVIVING slots (most
// of them zero).  A window of m new gaps absorbs r_i + ... + r_{i+m-1}, so
// kappa(m) is the largest such window sum, maximised over a as well.
function kappaProfile(S, W, p, maxm) {
  const N = S.length;
  // FIX 2026-08-18, the same defect as runTile's: the extension used to be
  // `min(N, 64)`, one copy of the tile at most, so on T_5 (N = 3) the walk saw
  // six slots, produced only a handful of survivor gaps, and kappa(m) was read
  // as 0 for every m past them. It now runs for at least 2*maxm + 1 slots,
  // wrapping as often as that needs. Scope, checked by running both ways: only
  // the fold-7 row of reading 9 moves; every other fold prints what it did.
  const EXT = Math.max(N < 64 ? N : 64, 2 * maxm + 1);
  const res = new Int32Array(N + EXT);
  for (let i = 0; i < N; i++) res[i] = S[i] % p;
  // residues SHIFT at each seam, so the wrap count has to be carried through
  for (let i = 0; i < EXT; i++)
    res[N + i] = (S[i % N] + W * (1 + Math.floor(i / N))) % p;
  const kap = new Int32Array(maxm + 1);
  const r = new Int32Array(N + EXT + 2);
  for (let a = 0; a < p; a++) {
    const b = (a - 2 + p) % p;
    let nr = 0, pending = 0, seen = false;
    for (let i = 0; i < N + EXT; i++) {
      const v = res[i];
      if (v === a || v === b) pending++;
      else { if (seen) r[nr++] = pending; seen = true; pending = 0; }
    }
    for (let m = 1; m <= maxm; m++) {
      let s = 0;
      for (let t = 0; t < nr; t++) {
        s += r[t];
        if (t >= m) s -= r[t - m];
        if (t >= m - 1 && s > kap[m]) kap[m] = s;
      }
    }
  }
  return kap;
}

// Independent brute force: for each of the p 2-sets {a, a-2}, scan for the
// longest run.  O(p*N), only used on the small tiles, as a check on the DP.
function bruteL(S, W, p) {
  let best = 0, bestA = -1;
  for (let a = 0; a < p; a++) {
    const b = (a - 2 + p) % p; let run = 0;
    for (let i = 0; i < S.length + 64; i++) {
      const s = (i < S.length) ? S[i] : S[i - S.length] + W;
      if (s % p === a || s % p === b) { run++; if (run > best) { best = run; bestA = a; } } else run = 0;
    }
  }
  return { best, bestA };
}
// The RETIRED run finder: a verbatim copy of what research/Lgrowth.js held
// before 2026-08-16, kept here because it is what produced the published
// diagonal and because a refuted scanner is worth keeping runnable next to the
// thing that refutes it. STATUS OF THE SIBLING, checked 2026-08-17:
// research/Lgrowth.js and research/killrun.js were both corrected on
// 2026-08-16, and research/a3-02-diagonal-f.js on 2026-08-17. Neither this
// column nor the U-FRAME column below describes any live file; both are the
// retired values, and the DP and brute-force columns are the current answer.
const okPairLg = (a, b, p) => { if (a === b) return true; const d = Math.abs(a - b); return d === 2 || d === p - 2; };
function runForLgrowth(S, p) {
  let best = 0, run = 0, prev = -1, other = -1;
  for (let i = 0; i < S.length; i++) {
    const r = S[i] % p;
    if (run === 0) { run = 1; prev = r; other = -1; }
    else if (other === -1) { if (okPairLg(prev, r, p)) { if (r !== prev) other = r; run++; } else { run = 1; prev = r; other = -1; } }
    else if (r === prev || r === other) run++;
    else { const q = prev; run = okPairLg(prev, r, p) ? 2 : 1; prev = r; other = (run === 2) ? q : -1; }
    if (run > best) best = run;
  }
  return best;
}

// ================================================================== main ====
function main() {
  const HR = '  ' + '-'.repeat(74);
  console.log('\n================ A3-05  BOUND L FROM RUN-CONSISTENCY ================\n');

  tick('building tiles T_5 .. T_23');
  const tiles = buildTiles(23);
  const byX = new Map(tiles.map(t => [t.x, t]));
  tick(`built: ${tiles.map(t => `T${t.x}=${t.S.length}`).join(' ')}`);

  // diagonal: fold T_x by the next prime p
  const diag = [[5, 7], [7, 11], [11, 13], [13, 17], [17, 19], [19, 23], [23, 29]];
  const MAXM = 24;
  const res = [];

  for (const [x, p] of diag) {
    const t = byX.get(x);
    tick(`analysing T_${x} folded by ${p}  (${t.S.length} slots)`);
    const A = runTile(t.S, t.W, p, MAXM, `T${x}/${p}`);
    res.push({ x, p, t, A, streamed: false });
  }
  if (process.env.SKIP31 !== '1') {
    tick('streaming T_29 (214.7M slots, from T_23) for the fold by 31 ...');
    const A31 = runT29(byX.get(23), 31, MAXM);
    const W29 = byX.get(23).W * 29;
    res.push({ x: 29, p: 31, t: { x: 29, W: W29, S: { length: A31.D } }, A: A31, streamed: true });
  }

  // ---------------------------------------------------------------- 1 ------
  console.log('\n  READING 1.  CUSTODY: the measured diagonal L, three independent ways.\n');
  console.log('   tile  fold p   slots        G2   mean gap   DP   brute   retired scan   retired U-FRAME');
  console.log(HR);
  // The diagonal U-FRAME 5a step 6 carried before this file refuted it. Kept as
  // the object of the refutation; U-FRAME now reads 2 at fold 29.
  const uframe = { 7: 2, 11: 1, 13: 2, 17: 2, 19: 2, 23: 3, 29: 3, 31: 4 };
  let disagree = 0;
  for (const r of res) {
    const G2 = r.A.maxsum[1], mbar = r.t.W / r.t.S.length;
    const bf = r.streamed ? { best: '-' } : bruteL(r.t.S, r.t.W, r.p);
    const lg = r.streamed ? '-' : runForLgrowth(r.t.S, r.p);
    if (!r.streamed && bf.best !== lg) disagree++;
    console.log(`   T${pad(r.x, 2)}     ${pad(r.p, 3)}  ${pad(r.t.S.length, 9)} ${pad(G2, 8)} ${pad(mbar.toFixed(2), 10)} ${pad(r.A.bestL, 4)} ${pad(bf.best, 7)} ${pad(lg, 12)} ${pad(uframe[r.p], 9)}${(!r.streamed && bf.best !== lg) ? '   <-- DISAGREE' : ''}`);
    r.trueL = r.A.bestL; r.mbar = mbar; r.G2 = G2;
  }
  if (disagree) console.log(`\n   ${disagree} disagreement(s): the DP and the independent brute force always agree;\n   the retired scanner over-reports, so the published diagonal had an error.\n   Repaired since: research/Lgrowth.js and research/killrun.js on 2026-08-16,\n   research/a3-02-diagonal-f.js on 2026-08-17, U-FRAME 5a step 6 in wave 1.`);

  // ---------------------------------------------------------------- 2 ------
  console.log('\n  READING 2.  THE QUALIFYING-VALUE LAW (derived, then enumerated).\n');
  console.log('   fold p  p mod 6   min +2   min -2   min 0    sum(+2,-2)   qualifying values <= G2');
  console.log(HR);
  for (const r of res) {
    const q = qualLaw(r.p), G2 = r.A.maxsum[1];
    const enum_ = qualLawCheck(r.p, G2);
    const vals = [...enum_.z, ...enum_.plus, ...enum_.minus].sort((a, b) => a - b);
    // check the law predicts exactly these
    const pred = [];
    for (let g = q.z; g <= G2; g += 6 * r.p) pred.push(g);
    for (let g = q.plus; g <= G2; g += 6 * r.p) pred.push(g);
    for (let g = q.minus; g <= G2; g += 6 * r.p) pred.push(g);
    pred.sort((a, b) => a - b);
    const ok = JSON.stringify(pred) === JSON.stringify(vals) ? 'OK' : 'MISMATCH';
    console.log(`   ${pad(r.p, 5)}   ${pad(r.p % 6, 5)}    ${pad(q.plus, 6)}  ${pad(q.minus, 7)}  ${pad(q.z, 6)}  ${pad(q.plus + q.minus, 9)}=${6 * r.p}   {${vals.join(', ')}}  [${ok}]`);
  }
  console.log('\n   Present in the tile (value: count / share of all gaps):');
  console.log(HR);
  for (const r of res) {
    const q = qualLaw(r.p), G2 = r.A.maxsum[1];
    const parts = [];
    for (let g = 6; g <= G2; g += 6) {
      const m = g % r.p;
      if (m !== 0 && m !== 2 && m !== r.p - 2) continue;
      const c = r.A.hist[g / 6];
      const cl = m === 0 ? '0' : (m === 2 ? '+' : '-');
      if (c > 0) parts.push(`${g}${cl}:${c}`);
      else parts.push(`${g}${cl}:absent`);
    }
    const f = (r.A.cls.z + r.A.cls.plus + r.A.cls.minus) / r.A.ngap;
    console.log(`   T${pad(r.x, 2)} @${pad(r.p, 2)}  f=${f.toFixed(5)}   ${parts.join('  ')}`);
  }

  // ---------------------------------------------------------------- 3 ------
  console.log('\n  READING 3.  WHAT CONDITION (ii) BUYS OVER CONDITION (i).\n');
  console.log('   fold p   L_i = 1 + longest qualifying-gap run   L_ii = true L   saving');
  console.log(HR);
  for (const r of res)
    console.log(`   ${pad(r.p, 5)}  ${pad(r.A.qbest + 1, 32)} ${pad(r.A.bestL, 15)} ${pad(r.A.qbest + 1 - r.A.bestL, 8)}`);

  // ---------------------------------------------------------------- 4 ------
  console.log('\n  READING 4.  THE RUN COST THEOREM, CHECKED ON THE ACHIEVING RUN.\n');
  console.log('   Claim (PROVEN): any two ADJACENT gaps of a run sum to >= 6p, hence');
  console.log('   span(run of L) >= c_min(L-1) = 3p(L-1) for L-1 even, 3p(L-1)-p-2eps otherwise.\n');
  // Sign corrected 2026-08-18: this banner printed -p+2eps and disagreed with
  // the DP below at all eight folds (m=1 prints 2p-2eps). Reading 5's numbers
  // were always right; only this printed closed form was wrong. Theorem B is
  // unaffected, using only c_min >= 3pm-p-2, which holds under either sign.
  console.log('   fold p   L   the L-1 gaps (class)                span   c_min(L-1)   adj-pair sums vs 6p');
  console.log(HR);
  for (const r of res) {
    const g = r.A.bestRun || [];
    const cl = g.map(v => { const m = v % r.p; return `${v}${m === 0 ? '0' : (m === 2 ? '+' : (m === r.p - 2 ? '-' : '?'))}`; });
    const span = g.reduce((a, b) => a + b, 0);
    const c = cmin(r.p, Math.max(0, r.A.bestL - 1));
    const pairs = [];
    for (let i = 0; i + 1 < g.length; i++) pairs.push(g[i] + g[i + 1]);
    const okp = pairs.every(v => v >= 6 * r.p) ? 'all >= 6p' : 'VIOLATION';
    console.log(`   ${pad(r.p, 5)} ${pad(r.A.bestL, 3)}   ${(cl.join(' ') || '-').padEnd(32)} ${pad(span, 5)} ${pad(c, 11)}    ${pairs.join(',') || '-'} (6p=${6 * r.p}) ${okp}`);
  }

  // ---------------------------------------------------------------- 5 ------
  console.log('\n  READING 5.  THE MAXSUM REDUCTION.  L <= 1 + max{m : maxsum_m >= c_min(m)}.\n');
  console.log('   c_min(m) = least possible sum of m consecutive gaps of a run:');
  console.log('   fold p ' + Array.from({ length: 8 }, (_, i) => pad('m=' + (i + 1), 8)).join(''));
  console.log(HR);
  for (const r of res)
    console.log(`   ${pad(r.p, 5)} ` + Array.from({ length: 8 }, (_, i) => pad(cmin(r.p, i + 1), 8)).join(''));
  // DEFECT 2026-08-18, found by the block-kappa attack. FIXED IN CODE THE SAME
  // DAY; see the FIX note in runTile. What it used to say, kept so the move is
  // visible: "The T_5 row of this table is wrong from m=5 on: it prints
  // 12,24,30,42,48,0,0,0 where the truth for gaps 6,12,12 cyclic is
  // 12,24,30,42,54,60,72,84. Cause is the cyclic extension EXT = min(N,64),
  // which is only 3 on the 3-slot tile T_5, so windows longer than the tile are
  // truncated and then read as 0. IMPACT CHECKED, NOT ASSUMED: Theorem B at
  // fold 7 is unaffected, because c_min(2)=42 > maxsum_2=24 already, so m*=1
  // and the bound L<=2 stands against the true L=2. Only consumers that read
  // m>=5 of the T_5 row are affected, which is the fold-7 entry of the Theorem
  // C row in reading 9. Every other tile has N >= 15 and is unaffected."
  // The impact assessment was right about Theorem B and understated the rest:
  // the fold-7 kappa row moves from 2,2,2,1,0,0,0,0 to 2,2,4,4,5,5,6,6, and
  // that turns the printed verdict kappa(m)<=L+2 at fold 7 from OK into FAIL.
  // The named cause is also one line off: EXT = min(N,64) is kappaProfile's
  // constant, and the maxsum table is truncated by runTile's min(N,128).
  console.log('\n   maxsum_m(T_x), the largest sum of m consecutive gaps:');
  console.log('   tile   ' + Array.from({ length: 8 }, (_, i) => pad('m=' + (i + 1), 8)).join(''));
  console.log(HR);
  for (const r of res)
    console.log(`   T${pad(r.x, 2)}    ` + Array.from({ length: 8 }, (_, i) => pad(r.A.maxsum[i + 1], 8)).join(''));
  console.log('\n   the bound:');
  console.log('   fold p   m* = max{m : maxsum_m >= c_min(m)}   bound L <= 1+m*   true L   slack');
  console.log(HR);
  for (const r of res) {
    let ms = 0;
    for (let m = 1; m <= MAXM; m++) if (r.A.maxsum[m] >= cmin(r.p, m)) ms = m;
    console.log(`   ${pad(r.p, 5)}  ${pad(ms, 32)} ${pad(ms + 1, 16)} ${pad(r.A.bestL, 8)} ${pad(ms + 1 - r.A.bestL, 7)}`);
  }
  console.log('\n   comparison: the same bound with condition (i) only, c_min replaced by');
  console.log('   m * theta where theta = min qualifying value (~2p):');
  console.log('   fold p   m*(i)   bound(i)    m*(ii)   bound(ii)   true L');
  console.log(HR);
  for (const r of res) {
    const q = qualLaw(r.p);
    let mi = 0, mii = 0;
    for (let m = 1; m <= MAXM; m++) { if (r.A.maxsum[m] >= m * q.theta) mi = m; if (r.A.maxsum[m] >= cmin(r.p, m)) mii = m; }
    console.log(`   ${pad(r.p, 5)}  ${pad(mi, 6)}  ${pad(mi + 1, 8)}   ${pad(mii, 7)}  ${pad(mii + 1, 9)}   ${pad(r.A.bestL, 7)}`);
  }

  // ---------------------------------------------------------------- 6 ------
  console.log('\n  READING 6.  THE LARGE-GAP-RUN REDUCTION AND THE TAIL.\n');
  console.log('   fold p  theta=min qual   R(theta)=longest run of gaps>=theta   1+R   true L   P(g>=theta)   P(g>=3p)');
  console.log(HR);
  for (const r of res) {
    const q = qualLaw(r.p);
    let c1 = 0, c2 = 0;
    for (let i = 0; i < r.A.hist.length; i++) { const g = 6 * i; if (g >= q.theta) c1 += r.A.hist[i]; if (g >= 3 * r.p) c2 += r.A.hist[i]; }
    console.log(`   ${pad(r.p, 5)}  ${pad(q.theta, 12)}   ${pad(r.A.tbest, 30)}  ${pad(r.A.tbest + 1, 5)} ${pad(r.A.bestL, 8)}   ${pad((c1 / r.A.ngap).toExponential(3), 11)}  ${pad((c2 / r.A.ngap).toExponential(3), 10)}`);
  }
  console.log('\n   the exponential-tail model.  If P(g >= d) ~ exp(-d/mbar) then condition (i)');
  console.log('   gives rate 2p/mbar and condition (ii) gives 3p/mbar, a factor 3/2.');
  console.log('   fold p   mbar    2p/mbar   3p/mbar   ln(1/f_i)   ln(1/f_ii)   ratio');
  console.log(HR);
  for (const r of res) {
    const mbar = r.t.W / r.t.S.length, q = qualLaw(r.p);
    const fi = (r.A.cls.z + r.A.cls.plus + r.A.cls.minus) / r.A.ngap;
    // effective per-gap rate under (ii): geometric mean of the two switch rates
    const fp = r.A.cls.plus / r.A.ngap, fm = r.A.cls.minus / r.A.ngap;
    const fii = Math.sqrt(fp * fm);
    console.log(`   ${pad(r.p, 5)} ${pad(mbar.toFixed(2), 7)} ${pad((2 * r.p / mbar).toFixed(2), 9)} ${pad((3 * r.p / mbar).toFixed(2), 9)} ${pad(Math.log(1 / fi).toFixed(2), 11)} ${pad((fii > 0 ? Math.log(1 / fii).toFixed(2) : 'inf'), 12)} ${pad((fii > 0 ? (Math.log(1 / fii) / Math.log(1 / fi)).toFixed(3) : '-'), 7)}`);
  }
  console.log('\n   class shares among qualifying gaps (0 / +2 / -2), and which class holds');
  console.log('   the cheapest value.  Alternation forbids two of the SAME nonzero class in');
  console.log('   a row, and the cheapest value lives in one class only:');
  console.log('   fold p   n(0)      n(+2)     n(-2)    cheapest class   share of cheapest');
  console.log(HR);
  for (const r of res) {
    const q = qualLaw(r.p), tot = r.A.cls.z + r.A.cls.plus + r.A.cls.minus;
    const cheap = q.plus < q.minus ? '+2' : '-2';
    const cheapN = q.plus < q.minus ? r.A.cls.plus : r.A.cls.minus;
    console.log(`   ${pad(r.p, 5)}  ${pad(r.A.cls.z, 8)}  ${pad(r.A.cls.plus, 8)}  ${pad(r.A.cls.minus, 8)}  ${pad(cheap, 12)}   ${pad(tot ? (cheapN / tot).toFixed(4) : '-', 14)}`);
  }
  console.log('\n   the moment test.  #windows of m gaps with sum >= c_min(m), as a fraction');
  console.log('   of all windows.  Markov on the first moment gives mbar/(3p) with NO decay');
  console.log('   in m; the measured fraction decays geometrically.  That gap is the wall.');
  console.log('   fold p   markov bound   ' + Array.from({ length: 6 }, (_, i) => pad('m=' + (i + 1), 11)).join(''));
  console.log(HR);
  for (const r of res) {
    const mbar = r.t.W / r.t.S.length;
    const row = Array.from({ length: 6 }, (_, i) => pad((r.A.hitm[i + 1] / r.A.ngap).toExponential(2), 11)).join('');
    console.log(`   ${pad(r.p, 5)}  ${pad((mbar / (3 * r.p)).toFixed(4), 12)}   ${row}`);
  }

  // --------------------------------------------------------------- 6b ------
  console.log('\n   the conditional-decay test, which is the hypothesis a proof would need.');
  console.log('   N_m = #{i : g_i .. g_{i+m-1} all >= theta}.  Hypothesis H": N_m <= delta*N_{m-1}');
  console.log('   with delta <= exp(-c*theta/mbar).  Measured ratios N_m/N_{m-1}, and the');
  console.log('   value exp(-theta/mbar) they would have to beat:\n');
  console.log('   fold p   exp(-theta/mbar)  ' + Array.from({ length: 6 }, (_, i) => pad('N' + (i + 2) + '/N' + (i + 1), 11)).join(''));
  console.log(HR);
  for (const r of res) {
    const q = qualLaw(r.p);
    const row = Array.from({ length: 6 }, (_, i) => {
      const a = r.A.bigm[i + 1], b = r.A.bigm[i + 2];
      return pad(a > 0 ? (b / a).toExponential(2) : '-', 11);
    }).join('');
    console.log(`   ${pad(r.p, 5)}  ${pad(Math.exp(-q.theta / r.mbar).toFixed(4), 16)}  ${row}`);
  }

  // ---------------------------------------------------------------- 7 ------
  console.log('\n  READING 7.  THE TAIL ITSELF.  Fit ln(1/P(g >= d)) = lambda*d over the');
  console.log('  upper half of the range; a pure exponential tail at the mean-gap scale');
  console.log('  would give lambda*mbar = 1.  Larger means a thinner tail, hence smaller L.\n');
  console.log('   tile   mbar    lambda      lambda*mbar   P(g>=2p)     P(g>=3p)     ratio ln');
  console.log(HR);
  for (const r of res) {
    const n = r.A.ngap;
    let tot = 0; const tail = [];
    const hi = r.A.maxsum[1] / 6;
    for (let i = hi; i >= 1; i--) { tot += r.A.hist[i]; tail[i] = tot; }
    // least squares of ln(tail/n) against d over d in [G2/3, 2G2/3]
    let sx = 0, sy = 0, sxx = 0, sxy = 0, k = 0;
    for (let i = Math.ceil(hi / 3); i <= Math.floor(2 * hi / 3); i++) {
      if (!tail[i]) continue;
      const d = 6 * i, y = Math.log(tail[i] / n);
      sx += d; sy += y; sxx += d * d; sxy += d * y; k++;
    }
    const lam = k > 1 ? -(k * sxy - sx * sy) / (k * sxx - sx * sx) : NaN;
    const at = (d) => { const i = Math.ceil(d / 6); return (tail[i] || 0) / n; };
    const p2 = at(2 * r.p), p3 = at(3 * r.p);
    console.log(`   T${pad(r.x, 2)}  ${pad(r.mbar.toFixed(2), 7)} ${pad(lam.toFixed(5), 10)} ${pad((lam * r.mbar).toFixed(3), 12)}   ${pad(p2.toExponential(2), 10)}   ${pad(p3.toExponential(2), 10)}  ${pad((p2 > 0 && p3 > 0 ? (Math.log(p2 / p3) / (r.p / r.mbar)).toFixed(3) : '-'), 8)}`);
  }

  // ---------------------------------------------------------------- 8 ------
  console.log('\n  READING 8.  WHAT THE PROVEN BOUND GIVES ASYMPTOTICALLY.\n');
  console.log('  Theorem B is L <= 1 + m*, m* = max{m : maxsum_m >= c_min(m)} ~ 3pm.');
  console.log('  Since maxsum_m >= G2 always, and maxsum_m ~ G2 + (m-1)*mbar in the data,');
  console.log('  m* ~ (G2 - mbar)/(3p - mbar).  A single record gap subsidises the whole');
  console.log('  window, so the bound is O(G2/p), which on the diagonal is LINEAR in x.\n');
  console.log('   fold p    G2/(3p)   model m*=(G2-mbar)/(3p-mbar)   measured m*   true L');
  console.log(HR);
  for (const r of res) {
    let ms = 0;
    for (let m = 1; m <= MAXM; m++) if (r.A.maxsum[m] >= cmin(r.p, m)) ms = m;
    const model = (r.G2 - r.mbar) / (3 * r.p - r.mbar);
    console.log(`   ${pad(r.p, 5)}  ${pad((r.G2 / (3 * r.p)).toFixed(2), 9)}  ${pad(model.toFixed(2), 26)}  ${pad(ms, 12)}  ${pad(r.trueL, 7)}`);
  }
  console.log('\n  Projection, with the EXACT mean gap mbar(x) = 6*prod_{5<=q<=x} q/(q-2).');
  console.log('  Branch B (what Theorem B proves): L <= G2/(3p), so G2 picks up a factor');
  console.log('  (1 + mbar/(3p)) at each fold and ln G2 <= ln 12 + sum mbar/(3p).');
  console.log('  Branch P (what the route needs): L ~ mbar/3, so G2 <= 12 + sum mbar^2/3.');
  console.log('  The requirement is ln G2 < 2 ln x, i.e. G2 < x^2.\n');
  console.log('     x       ln(12)+sum mbar/(3p)    2 ln x   B closes?      sum mbar^2/3        x^2   P closes?');
  console.log(HR);
  {
    const LIM = 1000000;
    const sieve = new Uint8Array(LIM + 1);
    const marks = [37, 100, 1000, 10000, 100000, 1000000];
    let mbar = 14, SB = Math.log(12), SP = 12, mi = 0;   // mbar(T_7) = 14, fold by 11 next
    const out = [];
    for (let n = 2; n <= LIM; n++) {
      if (!sieve[n]) {
        for (let j = 2 * n; j <= LIM; j += n) sieve[j] = 1;
        if (n >= 11) { SB += mbar / (3 * n); SP += mbar * mbar / 3; mbar *= n / (n - 2); }
      }
      while (mi < marks.length && n === marks[mi]) {
        const lx = Math.log(n);
        out.push(`   ${pad(n, 7)} ${pad(SB.toFixed(2), 21)} ${pad((2 * lx).toFixed(2), 9)}   ${pad(SB < 2 * lx ? 'yes' : 'NO', 8)} ${pad(SP.toExponential(2), 16)} ${pad((n * n).toExponential(2), 10)}   ${pad(Math.log(SP) < 2 * lx ? 'yes' : 'NO', 8)}`);
        mi++;
      }
    }
    for (const l of out) console.log(l);
  }

  // ---------------------------------------------------------------- 9 ------
  // A4 reports that L is not the object the recursion needs: kappa(m), the
  // largest kill count inside a stretch that becomes m new gaps, is.  The
  // alternation law does not care whether the deleted slots are adjacent, so
  // Theorem A generalises verbatim with "gap" replaced by "separation between
  // consecutive DELETED slots".  Theorem C below is the result.
  console.log('\n  READING 9.  kappa(m), AND THEOREM C.\n');
  console.log('  Theorem A never used adjacency: if one 2-set deletes slots j_1 < ... < j_k,');
  console.log('  then consecutive SEPARATIONS d_t = s_{j_{t+1}} - s_{j_t} are all = 0,+-2 (mod p)');
  console.log('  and obey the same two-state walk, so any two adjacent separations sum to');
  console.log('  >= 6p and s_{j_k} - s_{j_1} >= c_min(k-1).  A stretch that becomes m new gaps');
  console.log('  spans m+kappa old gaps, and the first and last kill sit strictly inside, so');
  console.log('');
  console.log('     THEOREM C.   kappa(m) <= max{ k >= 1 : maxsum_{m+k-2}(T_x) >= c_min(k-1) }.');
  console.log('');
  console.log('  With m = 1 this is Theorem B.  Measured kappa(m) against it:\n');
  console.log('   fold p  m:      1     2     3     4     5     6     7     8');
  console.log(HR);
  const KM = 8;
  for (const r of res) {
    if (r.streamed) { console.log(`   ${pad(r.p, 5)}  (fold 31 not computed: 31 passes over 214.7M slots)`); continue; }
    tick(`kappa profile at fold ${r.p}`);
    const kap = kappaProfile(r.t.S, r.t.W, r.p, KM);
    const bnd = [];
    for (let m = 1; m <= KM; m++) {
      let k = 1;
      let capped = false;
      for (let kk = 2; ; kk++) {
        const mm = m + kk - 2;
        if (mm > MAXM) { capped = true; break; }
        if (r.A.maxsum[mm] >= cmin(r.p, kk - 1)) k = kk; else break;
      }
      bnd.push(capped ? k + '+' : k);
    }
    r.kap = kap; r.kbnd = bnd;
    console.log(`   ${pad(r.p, 5)}  true  ` + Array.from({ length: KM }, (_, i) => pad(kap[i + 1], 6)).join(''));
    console.log(`   ${pad('', 5)}  Thm C ` + bnd.map(v => pad(v, 6)).join(''));
    console.log(`   ${pad('', 5)}  L+2   ` + Array.from({ length: KM }, () => pad(r.trueL + 2, 6)).join(''));
  }
  console.log('\n   checks:');
  for (const r of res) {
    if (!r.kap) continue;
    const ok1 = r.kap[1] === r.trueL;
    const ok2 = Array.from({ length: KM }, (_, i) => r.kap[i + 1] <= parseInt(r.kbnd[i])).every(Boolean);
    const ok3 = Array.from({ length: KM }, (_, i) => r.kap[i + 1] <= r.trueL + 2).every(Boolean);
    console.log(`   fold ${pad(r.p, 2)}   kappa(1)=L ${ok1 ? 'OK' : 'FAIL'}   Theorem C holds ${ok2 ? 'OK' : 'FAIL'}   kappa(m)<=L+2 ${ok3 ? 'OK' : 'FAIL'}`);
  }

  console.log('\n' + HR);
  tick('done');
}

if (require.main === module) main();
module.exports = { buildTiles, Analyzer, qualLaw, qualLawCheck, cmin };

/* ===========================================================================
   PASTED OUTPUT of this script, RE-RUN 2026-08-18 on node v22.21.0, 111 seconds.

   WHAT MOVED SINCE THE 2026-08-17 PASTE, and it is one tile only. The wrap
   replay in runTile and in kappaProfile was one copy of the tile at most, so
   on T_5 (3 slots) the windows were cut off mid-period. Both now replay whole
   periods when one copy is too short; see the two FIX notes in the code. Nine
   printed lines changed, every one of them a T_5 or fold-7 line, and the old
   value is given here beside the new one so the move is visible:

     reading 1  T 5 @ 7   f=0.60000  12-:3    ->  f=0.66667  12-:18
     reading 5  maxsum T 5  12 24 30 42 48 0 0 0
                         ->  12 24 30 42 54 60 72 84
     reading 5  fold 7 hit fraction  6.000e-1  ->  6.667e-1
     reading 6  fold 7 ln(1/f_i)     0.51      ->  0.41
     reading 6  fold 7 n(-2)         3         ->  18
     reading 6  fold 7 m=1 fraction  6.00e-1   ->  6.67e-1
     reading 6  fold 7 N_1/N_0       3.33e-1   ->  5.00e-1
     reading 9  fold 7 true kappa    2 2 2 1 0 0 0 0  ->  2 2 4 4 5 5 6 6
     reading 9  fold 7 Theorem C     2 2 3 3 2 1 1 1  ->  2 2 4 4 5 6 6 8
     reading 9  fold 7 verdict  kappa(m)<=L+2 OK  ->  FAIL

   THE FAIL IS REAL AND IT IS THE POINT. At fold 7, L = 2 and kappa(7) = 6, so
   kappa(m) <= L + 2 breaks by 2. The rule was already known non-universal
   (it fails at fold 11, L = 1 and kappa(6) = 4, recorded in
   research/a3-05-bound-L.md section 9 and research/U-FRAME.md section 10);
   fold 7 is a SECOND and larger counter-example that the truncation was
   hiding. Theorem C itself still holds at all 56 cases, and kappa(1) = L
   still holds at every fold.

   THREE INDEPENDENT CONFIRMATIONS of the new fold-7 row, none of them this
   code. (i) The cyclic gap word of T_5 is 6, 12, 12, so maxsum_m for m = 1..8
   is 12, 24, 30, 42, 54, 60, 72, 84 by hand. (ii) A brute force written from
   the definition over eight unrolled periods of 210 returns kappa(1..8) =
   2 2 4 4 5 5 6 6 and true L = 2. (iii) The block-kappa attack computed the
   same row independently on 2026-08-18 and reported the disagreement:
   research/history/staging/attack-block-07-kappa.md section 2 prints
   "7 over T_5 | 2 2 4 4 5 5 6 6 | a3-05 reading 9: 2 2 2 1 0 0 0 0 | m >= 3
   differ". The attack was right and this file was wrong.

   NOT FIXED, and logged rather than assumed away: the replay still biases the
   FRACTIONS on the short tiles, because it counts windows over N + EXT - 1
   gaps instead of over the N cyclic ones. At T_7 the fold-11 moment fraction
   reads 4/29 = 0.1379 against a true cyclic 2/15 = 0.1333. Extending T_7's
   replay was tried and rejected: it moves the figure to 6/39 = 0.1538, which
   is further away. The right fix is to count only windows whose start lies in
   the first N gaps, which would move T_11 and T_13 as well, and it is a
   separate job from this one.

   STILL TRUE OF THE EARLIER PASTES. The c_min sign fix of 2026-08-18 changed
   the reading 4 banner from `3p(L-1)-p+2eps` to `-2eps` and changed no
   number; this block now shows the corrected banner. The 2026-08-17 run fixed
   two labels: reading 1's slots column read 214,708,853 for the streamed T29,
   which is D + 128 because A.n counted the wrap replay, and reading 1's third
   and fourth columns were labelled as if research/Lgrowth.js and U-FRAME
   still held those values.
   ===========================================================================


================ A3-05  BOUND L FROM RUN-CONSISTENCY ================

      [0.0s] building tiles T_5 .. T_23
      [0.8s] built: T5=3 T7=15 T11=135 T13=1485 T17=22275 T19=378675 T23=7952175
      [0.8s] analysing T_5 folded by 7  (3 slots)
      [0.8s] analysing T_7 folded by 11  (15 slots)
      [0.8s] analysing T_11 folded by 13  (135 slots)
      [0.8s] analysing T_13 folded by 17  (1485 slots)
      [0.8s] analysing T_17 folded by 19  (22275 slots)
      [0.8s] analysing T_19 folded by 23  (378675 slots)
      [0.9s] analysing T_23 folded by 29  (7952175 slots)
      [3.1s] streaming T_29 (214.7M slots, from T_23) for the fold by 31 ...
      [...]   T29 blocks 1..28 elided
      [92.2s]   T29 block 29/29, slots so far 214708725

  READING 1.  CUSTODY: the measured diagonal L, three independent ways.

   tile  fold p   slots        G2   mean gap   DP   brute   retired scan   retired U-FRAME
  --------------------------------------------------------------------------
   T 5       7          3       12      10.00    2       2            2         2
   T 7      11         15       30      14.00    1       1            1         1
   T11      13        135       42      17.11    2       2            2         2
   T13      17       1485       66      20.22    2       2            2         2
   T17      19      22275      108      22.92    2       2            2         2
   T19      23     378675      150      25.61    3       3            3         3
   T23      29    7952175      204      28.05    2       2            3         3   <-- DISAGREE
   T29      31  214708725      258      30.13    4       -            -         4

   1 disagreement(s): the DP and the independent brute force always agree;
   the retired scanner over-reports, so the published diagonal had an error.
   Repaired since: research/Lgrowth.js and research/killrun.js on 2026-08-16,
   research/a3-02-diagonal-f.js on 2026-08-17, U-FRAME 5a step 6 in wave 1.

  READING 2.  THE QUALIFYING-VALUE LAW (derived, then enumerated).

   fold p  p mod 6   min +2   min -2   min 0    sum(+2,-2)   qualifying values <= G2
  --------------------------------------------------------------------------
       7       1        30       12      42         42=42   {12}  [OK]
      11       5        24       42      66         66=66   {24}  [OK]
      13       1        54       24      78         78=78   {24}  [OK]
      17       5        36       66     102        102=102   {36, 66}  [OK]
      19       1        78       36     114        114=114   {36, 78}  [OK]
      23       5        48       90     138        138=138   {48, 90, 138}  [OK]
      29       5        60      114     174        174=174   {60, 114, 174}  [OK]
      31       1       126       60     186        186=186   {60, 126, 186, 246}  [OK]

   Present in the tile (value: count / share of all gaps):
  --------------------------------------------------------------------------
   T 5 @ 7  f=0.66667   12-:18
   T 7 @11  f=0.00000   24+:absent
   T11 @13  f=0.04580   24-:12
   T13 @17  f=0.04777   36+:64  66-:13
   T17 @19  f=0.04883   36-:1028  78+:66
   T19 @23  f=0.03112   48+:10467  90-:1236  1380:86
   T23 @29  f=0.03066   60+:243376  114-:440  1740:6
   T29 @31  f=0.03737   60-:7815773  126+:205068  1860:2090  246-:absent

  READING 3.  WHAT CONDITION (ii) BUYS OVER CONDITION (i).

   fold p   L_i = 1 + longest qualifying-gap run   L_ii = true L   saving
  --------------------------------------------------------------------------
       7                                 3               2        1
      11                                 1               1        0
      13                                 2               2        0
      17                                 2               2        0
      19                                 2               2        0
      23                                 3               3        0
      29                                 3               2        1
      31                                 4               4        0

  READING 4.  THE RUN COST THEOREM, CHECKED ON THE ACHIEVING RUN.

   Claim (PROVEN): any two ADJACENT gaps of a run sum to >= 6p, hence
   span(run of L) >= c_min(L-1) = 3p(L-1) for L-1 even, 3p(L-1)-p-2eps otherwise.

   fold p   L   the L-1 gaps (class)                span   c_min(L-1)   adj-pair sums vs 6p
  --------------------------------------------------------------------------
       7   2   12-                                 12          12    - (6p=42) all >= 6p
      11   1   -                                    0           0    - (6p=66) all >= 6p
      13   2   24-                                 24          24    - (6p=78) all >= 6p
      17   2   36+                                 36          36    - (6p=102) all >= 6p
      19   2   36-                                 36          36    - (6p=114) all >= 6p
      23   3   48+ 90-                            138         138    138 (6p=138) all >= 6p
      29   2   60+                                 60          60    - (6p=174) all >= 6p
      31   4   60- 126+ 60-                       246         246    186,186 (6p=186) all >= 6p

  READING 5.  THE MAXSUM REDUCTION.  L <= 1 + max{m : maxsum_m >= c_min(m)}.

   c_min(m) = least possible sum of m consecutive gaps of a run:
   fold p      m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
  --------------------------------------------------------------------------
       7       12      42      54      84      96     126     138     168
      11       24      66      90     132     156     198     222     264
      13       24      78     102     156     180     234     258     312
      17       36     102     138     204     240     306     342     408
      19       36     114     150     228     264     342     378     456
      23       48     138     186     276     324     414     462     552
      29       60     174     234     348     408     522     582     696
      31       60     186     246     372     432     558     618     744

   maxsum_m(T_x), the largest sum of m consecutive gaps:
   tile        m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
  --------------------------------------------------------------------------
   T 5          12      24      30      42      54      60      72      84
   T 7          30      42      66      78      96     108     126     138
   T11          42      66      96     108     138     156     168     180
   T13          66      96     138     156     168     186     204     228
   T17         108     150     168     198     210     240     258     288
   T19         150     186     210     228     282     300     348     378
   T23         204     234     300     348     390     462     498     528
   T29         258     330     390     420     510     540     552     582

   the bound:
   fold p   m* = max{m : maxsum_m >= c_min(m)}   bound L <= 1+m*   true L   slack
  --------------------------------------------------------------------------
       7                                 1                2        2       0
      11                                 1                2        1       1
      13                                 1                2        2       0
      17                                 3                4        2       2
      19                                 3                4        2       2
      23                                 3                4        3       1
      29                                 4                5        2       3
      31                                 5                6        4       2

   comparison: the same bound with condition (i) only, c_min replaced by
   m * theta where theta = min qualifying value (~2p):
   fold p   m*(i)   bound(i)    m*(ii)   bound(ii)   true L
  --------------------------------------------------------------------------
       7       2         3         1          2         2
      11       1         2         1          2         1
      13       7         8         1          2         2
      17       4         5         3          4         2
      19      10        11         3          4         2
      23       7         8         3          4         3
      29       9        10         4          5         2
      31      12        13         5          6         4

  READING 6.  THE LARGE-GAP-RUN REDUCTION AND THE TAIL.

   fold p  theta=min qual   R(theta)=longest run of gaps>=theta   1+R   true L   P(g>=theta)   P(g>=3p)
  --------------------------------------------------------------------------
       7            12                                2      3        2      6.667e-1    0.000e+0
      11            24                                1      2        1      1.379e-1    0.000e+0
      13            24                                3      4        2      2.710e-1    3.053e-2
      17            36                                2      3        2      1.259e-1    1.551e-2
      19            36                                4      5        2      1.852e-1    3.928e-2
      23            48                                3      4        3      9.951e-2    2.502e-2
      29            60                                4      5        2      9.377e-2    1.643e-2
      31            60                                5      6        4      1.188e-1    1.705e-2

   the exponential-tail model.  If P(g >= d) ~ exp(-d/mbar) then condition (i)
   gives rate 2p/mbar and condition (ii) gives 3p/mbar, a factor 3/2.
   fold p   mbar    2p/mbar   3p/mbar   ln(1/f_i)   ln(1/f_ii)   ratio
  --------------------------------------------------------------------------
       7   10.00      1.40      2.10        0.41          inf       -
      11   14.00      1.57      2.36    Infinity          inf       -
      13   17.11      1.52      2.28        3.08          inf       -
      17   20.22      1.68      2.52        3.04         4.02   1.323
      19   22.92      1.66      2.49        3.02         4.45   1.475
      23   25.61      1.80      2.69        3.47         4.66   1.342
      29   28.05      2.07      3.10        3.48         6.64   1.907
      31   30.13      2.06      3.09        3.29         5.13   1.562

   class shares among qualifying gaps (0 / +2 / -2), and which class holds
   the cheapest value.  Alternation forbids two of the SAME nonzero class in
   a row, and the cheapest value lives in one class only:
   fold p   n(0)      n(+2)     n(-2)    cheapest class   share of cheapest
  --------------------------------------------------------------------------
       7         0         0        18            -2           1.0000
      11         0         0         0            +2                -
      13         0         0        12            -2           1.0000
      17         0        64        13            +2           0.8312
      19         0        66      1028            -2           0.9397
      23        86     10467      1236            +2           0.8879
      29         6    243376       440            +2           0.9982
      31      2090    205068   7815773            -2           0.9742

   the moment test.  #windows of m gaps with sum >= c_min(m), as a fraction
   of all windows.  Markov on the first moment gives mbar/(3p) with NO decay
   in m; the measured fraction decays geometrically.  That gap is the wall.
   fold p   markov bound           m=1        m=2        m=3        m=4        m=5        m=6
  --------------------------------------------------------------------------
       7        0.4762       6.67e-1    0.00e+0    0.00e+0    0.00e+0    0.00e+0    0.00e+0
      11        0.4242       1.38e-1    0.00e+0    0.00e+0    0.00e+0    0.00e+0    0.00e+0
      13        0.4387       2.71e-1    0.00e+0    0.00e+0    0.00e+0    0.00e+0    0.00e+0
      17        0.3965       1.26e-1    0.00e+0    3.10e-3    0.00e+0    0.00e+0    0.00e+0
      19        0.4021       1.85e-1    5.62e-3    5.09e-3    0.00e+0    0.00e+0    0.00e+0
      23        0.3712       9.95e-2    5.79e-3    4.46e-4    0.00e+0    0.00e+0    0.00e+0
      29        0.3225       9.38e-2    7.68e-4    2.77e-5    5.03e-7    0.00e+0    0.00e+0
      31        0.3240       1.19e-1    9.20e-4    1.19e-4    2.14e-6    1.49e-7    0.00e+0

   the conditional-decay test, which is the hypothesis a proof would need.
   N_m = #{i : g_i .. g_{i+m-1} all >= theta}.  Hypothesis H": N_m <= delta*N_{m-1}
   with delta <= exp(-c*theta/mbar).  Measured ratios N_m/N_{m-1}, and the
   value exp(-theta/mbar) they would have to beat:

   fold p   exp(-theta/mbar)        N2/N1      N3/N2      N4/N3      N5/N4      N6/N5      N7/N6
  --------------------------------------------------------------------------
       7            0.3012      5.00e-1    0.00e+0          -          -          -          -
      11            0.1801      0.00e+0          -          -          -          -          -
      13            0.2460      2.25e-1    2.50e-1    0.00e+0          -          -          -
      17            0.1686      1.23e-1    0.00e+0          -          -          -          -
      19            0.2079      2.08e-1    1.18e-1    7.84e-2    0.00e+0          -          -
      23            0.1535      1.01e-1    1.68e-2    0.00e+0          -          -          -
      29            0.1178      7.53e-2    1.02e-2    1.40e-2    0.00e+0          -          -
      31            0.1365      9.51e-2    2.40e-2    3.62e-2    3.32e-2    0.00e+0          -

  READING 7.  THE TAIL ITSELF.  Fit ln(1/P(g >= d)) = lambda*d over the
  upper half of the range; a pure exponential tail at the mean-gap scale
  would give lambda*mbar = 1.  Larger means a thinner tail, hence smaller L.

   tile   mbar    lambda      lambda*mbar   P(g>=2p)     P(g>=3p)     ratio ln
  --------------------------------------------------------------------------
   T 5    10.00        NaN          NaN      0.00e+0      0.00e+0         -
   T 7    14.00    0.17601        2.464      1.38e-1      0.00e+0         -
   T11    17.11    0.07597        1.300      2.25e-1      3.05e-2     2.630
   T13    20.22    0.08840        1.788      1.26e-1      1.55e-2     2.491
   T17    22.92    0.07804        1.789      1.39e-1      3.93e-2     1.527
   T19    25.61    0.06383        1.635      9.95e-2      2.50e-2     1.538
   T23    28.05    0.05798        1.627      9.38e-2      1.64e-2     1.685
   T29    30.13    0.06222        1.875      8.24e-2      1.71e-2     1.531

  READING 8.  WHAT THE PROVEN BOUND GIVES ASYMPTOTICALLY.

  Theorem B is L <= 1 + m*, m* = max{m : maxsum_m >= c_min(m)} ~ 3pm.
  Since maxsum_m >= G2 always, and maxsum_m ~ G2 + (m-1)*mbar in the data,
  m* ~ (G2 - mbar)/(3p - mbar).  A single record gap subsidises the whole
  window, so the bound is O(G2/p), which on the diagonal is LINEAR in x.

   fold p    G2/(3p)   model m*=(G2-mbar)/(3p-mbar)   measured m*   true L
  --------------------------------------------------------------------------
       7       0.57                        0.18             1        2
      11       0.91                        0.84             1        1
      13       1.08                        1.14             1        2
      17       1.29                        1.49             3        2
      19       1.89                        2.50             3        2
      23       2.17                        2.87             3        3
      29       2.34                        2.98             4        2
      31       2.77                        3.62             5        4

  Projection, with the EXACT mean gap mbar(x) = 6*prod_{5<=q<=x} q/(q-2).
  Branch B (what Theorem B proves): L <= G2/(3p), so G2 picks up a factor
  (1 + mbar/(3p)) at each fold and ln G2 <= ln 12 + sum mbar/(3p).
  Branch P (what the route needs): L ~ mbar/3, so G2 <= 12 + sum mbar^2/3.
  The requirement is ln G2 < 2 ln x, i.e. G2 < x^2.

     x       ln(12)+sum mbar/(3p)    2 ln x   B closes?      sum mbar^2/3        x^2   P closes?
  --------------------------------------------------------------------------
        37                  5.45      7.22        yes          1.62e+3    1.37e+3         NO
       100                  8.38      9.21        yes          9.83e+3    1.00e+4        yes
      1000                 18.85     13.82         NO          4.22e+5    1.00e+6        yes
     10000                 33.64     18.42         NO          1.11e+7    1.00e+8        yes
    100000                 52.70     23.03         NO          2.29e+8   1.00e+10        yes
   1000000                 76.02     27.63         NO          4.12e+9   1.00e+12        yes

  READING 9.  kappa(m), AND THEOREM C.

  Theorem A never used adjacency: if one 2-set deletes slots j_1 < ... < j_k,
  then consecutive SEPARATIONS d_t = s_{j_{t+1}} - s_{j_t} are all = 0,+-2 (mod p)
  and obey the same two-state walk, so any two adjacent separations sum to
  >= 6p and s_{j_k} - s_{j_1} >= c_min(k-1).  A stretch that becomes m new gaps
  spans m+kappa old gaps, and the first and last kill sit strictly inside, so

     THEOREM C.   kappa(m) <= max{ k >= 1 : maxsum_{m+k-2}(T_x) >= c_min(k-1) }.

  With m = 1 this is Theorem B.  Measured kappa(m) against it:

   fold p  m:      1     2     3     4     5     6     7     8
  --------------------------------------------------------------------------
      [105.4s] kappa profile at fold 7
       7  true       2     2     4     4     5     5     6     6
          Thm C      2     2     4     4     5     6     6     8
          L+2        4     4     4     4     4     4     4     4
      [105.4s] kappa profile at fold 11
      11  true       1     2     2     2     3     4     4     4
          Thm C      2     3     4     4     5     6     6     6
          L+2        3     3     3     3     3     3     3     3
      [105.4s] kappa profile at fold 13
      13  true       2     2     2     2     3     3     3     4
          Thm C      2     4     5     6     6     6     8     8
          L+2        4     4     4     4     4     4     4     4
      [105.4s] kappa profile at fold 17
      17  true       2     2     2     3     3     3     3     4
          Thm C      2     4     4     5     6     6     8     8
          L+2        4     4     4     4     4     4     4     4
      [105.4s] kappa profile at fold 19
      19  true       2     2     3     3     3     3     3     4
          Thm C      4     4     5     7     8     8    10    10
          L+2        4     4     4     4     4     4     4     4
      [105.4s] kappa profile at fold 23
      23  true       3     4     4     4     5     5     5     5
          Thm C      4     5     6     6     8     8     9    10
          L+2        5     5     5     5     5     5     5     5
      [105.6s] kappa profile at fold 29
      29  true       2     3     3     3     4     4     4     4
          Thm C      5     6     7     7     8     8     8     8
          L+2        4     4     4     4     4     4     4     4
      31  (fold 31 not computed: 31 passes over 214.7M slots)

   checks:
   fold  7   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 FAIL
   fold 11   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 FAIL
   fold 13   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK
   fold 17   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK
   fold 19   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK
   fold 23   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK
   fold 29   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK

  --------------------------------------------------------------------------
      [111.0s] done

*/

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/a3-05-bound-L.js
//   invocation:  node research/a3-05-bound-L.js
//   code-sha256: f91213500f12bb8d92659d765257833ae305d569d1ca9be9e13f7b118d4d4122
//   out-sha256:  916f6fb6cf33b18afa03474719888a9bb2cb8d36aaf247ffb449af918a323259
//   body-lines:  338
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     70.3 s
// ============================================================================
//
// ================ A3-05  BOUND L FROM RUN-CONSISTENCY ================
//
//       [0.0s] building tiles T_5 .. T_23
//       [0.6s] built: T5=3 T7=15 T11=135 T13=1485 T17=22275 T19=378675 T23=7952175
//       [0.6s] analysing T_5 folded by 7  (3 slots)
//       [0.6s] analysing T_7 folded by 11  (15 slots)
//       [0.6s] analysing T_11 folded by 13  (135 slots)
//       [0.6s] analysing T_13 folded by 17  (1485 slots)
//       [0.6s] analysing T_17 folded by 19  (22275 slots)
//       [0.6s] analysing T_19 folded by 23  (378675 slots)
//       [0.6s] analysing T_23 folded by 29  (7952175 slots)
//       [2.0s] streaming T_29 (214.7M slots, from T_23) for the fold by 31 ...
//       [3.8s]   T29 block 1/29, slots so far 7403764
//       [5.6s]   T29 block 2/29, slots so far 14807504
//       [7.4s]   T29 block 3/29, slots so far 22211237
//       [9.3s]   T29 block 4/29, slots so far 29614975
//       [11.1s]   T29 block 5/29, slots so far 37018748
//       [13.0s]   T29 block 6/29, slots so far 44422507
//       [14.8s]   T29 block 7/29, slots so far 51826244
//       [16.7s]   T29 block 8/29, slots so far 59229978
//       [18.6s]   T29 block 9/29, slots so far 66633738
//       [20.5s]   T29 block 10/29, slots so far 74037500
//       [22.4s]   T29 block 11/29, slots so far 81441252
//       [24.3s]   T29 block 12/29, slots so far 88844988
//       [26.2s]   T29 block 13/29, slots so far 96248725
//       [28.1s]   T29 block 14/29, slots so far 103652490
//       [30.0s]   T29 block 15/29, slots so far 111056235
//       [31.9s]   T29 block 16/29, slots so far 118460000
//       [33.9s]   T29 block 17/29, slots so far 125863736
//       [35.8s]   T29 block 18/29, slots so far 133267473
//       [37.7s]   T29 block 19/29, slots so far 140671225
//       [39.6s]   T29 block 20/29, slots so far 148074987
//       [41.4s]   T29 block 21/29, slots so far 155478747
//       [43.4s]   T29 block 22/29, slots so far 162882481
//       [45.3s]   T29 block 23/29, slots so far 170286218
//       [47.2s]   T29 block 24/29, slots so far 177689977
//       [49.1s]   T29 block 25/29, slots so far 185093750
//       [51.1s]   T29 block 26/29, slots so far 192497488
//       [53.0s]   T29 block 27/29, slots so far 199901221
//       [54.9s]   T29 block 28/29, slots so far 207304961
//       [56.8s]   T29 block 29/29, slots so far 214708725
//
//   READING 1.  CUSTODY: the measured diagonal L, three independent ways.
//
//    tile  fold p   slots        G2   mean gap   DP   brute   retired scan   retired U-FRAME
//   --------------------------------------------------------------------------
//    T 5       7          3       12      10.00    2       2            2         2
//    T 7      11         15       30      14.00    1       1            1         1
//    T11      13        135       42      17.11    2       2            2         2
//    T13      17       1485       66      20.22    2       2            2         2
//    T17      19      22275      108      22.92    2       2            2         2
//    T19      23     378675      150      25.61    3       3            3         3
//    T23      29    7952175      204      28.05    2       2            3         3   <-- DISAGREE
//    T29      31  214708725      258      30.13    4       -            -         4
//
//    1 disagreement(s): the DP and the independent brute force always agree;
//    the retired scanner over-reports, so the published diagonal had an error.
//    Repaired since: research/Lgrowth.js and research/killrun.js on 2026-08-16,
//    research/a3-02-diagonal-f.js on 2026-08-17, U-FRAME 5a step 6 in wave 1.
//
//   READING 2.  THE QUALIFYING-VALUE LAW (derived, then enumerated).
//
//    fold p  p mod 6   min +2   min -2   min 0    sum(+2,-2)   qualifying values <= G2
//   --------------------------------------------------------------------------
//        7       1        30       12      42         42=42   {12}  [OK]
//       11       5        24       42      66         66=66   {24}  [OK]
//       13       1        54       24      78         78=78   {24}  [OK]
//       17       5        36       66     102        102=102   {36, 66}  [OK]
//       19       1        78       36     114        114=114   {36, 78}  [OK]
//       23       5        48       90     138        138=138   {48, 90, 138}  [OK]
//       29       5        60      114     174        174=174   {60, 114, 174}  [OK]
//       31       1       126       60     186        186=186   {60, 126, 186, 246}  [OK]
//
//    Present in the tile (value: count / share of all gaps):
//   --------------------------------------------------------------------------
//    T 5 @ 7  f=0.66667   12-:18
//    T 7 @11  f=0.00000   24+:absent
//    T11 @13  f=0.04580   24-:12
//    T13 @17  f=0.04777   36+:64  66-:13
//    T17 @19  f=0.04883   36-:1028  78+:66
//    T19 @23  f=0.03112   48+:10467  90-:1236  1380:86
//    T23 @29  f=0.03066   60+:243376  114-:440  1740:6
//    T29 @31  f=0.03737   60-:7815773  126+:205068  1860:2090  246-:absent
//
//   READING 3.  WHAT CONDITION (ii) BUYS OVER CONDITION (i).
//
//    fold p   L_i = 1 + longest qualifying-gap run   L_ii = true L   saving
//   --------------------------------------------------------------------------
//        7                                 3               2        1
//       11                                 1               1        0
//       13                                 2               2        0
//       17                                 2               2        0
//       19                                 2               2        0
//       23                                 3               3        0
//       29                                 3               2        1
//       31                                 4               4        0
//
//   READING 4.  THE RUN COST THEOREM, CHECKED ON THE ACHIEVING RUN.
//
//    Claim (PROVEN): any two ADJACENT gaps of a run sum to >= 6p, hence
//    span(run of L) >= c_min(L-1) = 3p(L-1) for L-1 even, 3p(L-1)-p-2eps otherwise.
//
//    fold p   L   the L-1 gaps (class)                span   c_min(L-1)   adj-pair sums vs 6p
//   --------------------------------------------------------------------------
//        7   2   12-                                 12          12    - (6p=42) all >= 6p
//       11   1   -                                    0           0    - (6p=66) all >= 6p
//       13   2   24-                                 24          24    - (6p=78) all >= 6p
//       17   2   36+                                 36          36    - (6p=102) all >= 6p
//       19   2   36-                                 36          36    - (6p=114) all >= 6p
//       23   3   48+ 90-                            138         138    138 (6p=138) all >= 6p
//       29   2   60+                                 60          60    - (6p=174) all >= 6p
//       31   4   60- 126+ 60-                       246         246    186,186 (6p=186) all >= 6p
//
//   READING 5.  THE MAXSUM REDUCTION.  L <= 1 + max{m : maxsum_m >= c_min(m)}.
//
//    c_min(m) = least possible sum of m consecutive gaps of a run:
//    fold p      m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//   --------------------------------------------------------------------------
//        7       12      42      54      84      96     126     138     168
//       11       24      66      90     132     156     198     222     264
//       13       24      78     102     156     180     234     258     312
//       17       36     102     138     204     240     306     342     408
//       19       36     114     150     228     264     342     378     456
//       23       48     138     186     276     324     414     462     552
//       29       60     174     234     348     408     522     582     696
//       31       60     186     246     372     432     558     618     744
//
//    maxsum_m(T_x), the largest sum of m consecutive gaps:
//    tile        m=1     m=2     m=3     m=4     m=5     m=6     m=7     m=8
//   --------------------------------------------------------------------------
//    T 5          12      24      30      42      54      60      72      84
//    T 7          30      42      66      78      96     108     126     138
//    T11          42      66      96     108     138     156     168     180
//    T13          66      96     138     156     168     186     204     228
//    T17         108     150     168     198     210     240     258     288
//    T19         150     186     210     228     282     300     348     378
//    T23         204     234     300     348     390     462     498     528
//    T29         258     330     390     420     510     540     552     582
//
//    the bound:
//    fold p   m* = max{m : maxsum_m >= c_min(m)}   bound L <= 1+m*   true L   slack
//   --------------------------------------------------------------------------
//        7                                 1                2        2       0
//       11                                 1                2        1       1
//       13                                 1                2        2       0
//       17                                 3                4        2       2
//       19                                 3                4        2       2
//       23                                 3                4        3       1
//       29                                 4                5        2       3
//       31                                 5                6        4       2
//
//    comparison: the same bound with condition (i) only, c_min replaced by
//    m * theta where theta = min qualifying value (~2p):
//    fold p   m*(i)   bound(i)    m*(ii)   bound(ii)   true L
//   --------------------------------------------------------------------------
//        7       2         3         1          2         2
//       11       1         2         1          2         1
//       13       7         8         1          2         2
//       17       4         5         3          4         2
//       19      10        11         3          4         2
//       23       7         8         3          4         3
//       29       9        10         4          5         2
//       31      12        13         5          6         4
//
//   READING 6.  THE LARGE-GAP-RUN REDUCTION AND THE TAIL.
//
//    fold p  theta=min qual   R(theta)=longest run of gaps>=theta   1+R   true L   P(g>=theta)   P(g>=3p)
//   --------------------------------------------------------------------------
//        7            12                                2      3        2      6.667e-1    0.000e+0
//       11            24                                1      2        1      1.379e-1    0.000e+0
//       13            24                                3      4        2      2.710e-1    3.053e-2
//       17            36                                2      3        2      1.259e-1    1.551e-2
//       19            36                                4      5        2      1.852e-1    3.928e-2
//       23            48                                3      4        3      9.951e-2    2.502e-2
//       29            60                                4      5        2      9.377e-2    1.643e-2
//       31            60                                5      6        4      1.188e-1    1.705e-2
//
//    the exponential-tail model.  If P(g >= d) ~ exp(-d/mbar) then condition (i)
//    gives rate 2p/mbar and condition (ii) gives 3p/mbar, a factor 3/2.
//    fold p   mbar    2p/mbar   3p/mbar   ln(1/f_i)   ln(1/f_ii)   ratio
//   --------------------------------------------------------------------------
//        7   10.00      1.40      2.10        0.41          inf       -
//       11   14.00      1.57      2.36    Infinity          inf       -
//       13   17.11      1.52      2.28        3.08          inf       -
//       17   20.22      1.68      2.52        3.04         4.02   1.323
//       19   22.92      1.66      2.49        3.02         4.45   1.475
//       23   25.61      1.80      2.69        3.47         4.66   1.342
//       29   28.05      2.07      3.10        3.48         6.64   1.907
//       31   30.13      2.06      3.09        3.29         5.13   1.562
//
//    class shares among qualifying gaps (0 / +2 / -2), and which class holds
//    the cheapest value.  Alternation forbids two of the SAME nonzero class in
//    a row, and the cheapest value lives in one class only:
//    fold p   n(0)      n(+2)     n(-2)    cheapest class   share of cheapest
//   --------------------------------------------------------------------------
//        7         0         0        18            -2           1.0000
//       11         0         0         0            +2                -
//       13         0         0        12            -2           1.0000
//       17         0        64        13            +2           0.8312
//       19         0        66      1028            -2           0.9397
//       23        86     10467      1236            +2           0.8879
//       29         6    243376       440            +2           0.9982
//       31      2090    205068   7815773            -2           0.9742
//
//    the moment test.  #windows of m gaps with sum >= c_min(m), as a fraction
//    of all windows.  Markov on the first moment gives mbar/(3p) with NO decay
//    in m; the measured fraction decays geometrically.  That gap is the wall.
//    fold p   markov bound           m=1        m=2        m=3        m=4        m=5        m=6
//   --------------------------------------------------------------------------
//        7        0.4762       6.67e-1    0.00e+0    0.00e+0    0.00e+0    0.00e+0    0.00e+0
//       11        0.4242       1.38e-1    0.00e+0    0.00e+0    0.00e+0    0.00e+0    0.00e+0
//       13        0.4387       2.71e-1    0.00e+0    0.00e+0    0.00e+0    0.00e+0    0.00e+0
//       17        0.3965       1.26e-1    0.00e+0    3.10e-3    0.00e+0    0.00e+0    0.00e+0
//       19        0.4021       1.85e-1    5.62e-3    5.09e-3    0.00e+0    0.00e+0    0.00e+0
//       23        0.3712       9.95e-2    5.79e-3    4.46e-4    0.00e+0    0.00e+0    0.00e+0
//       29        0.3225       9.38e-2    7.68e-4    2.77e-5    5.03e-7    0.00e+0    0.00e+0
//       31        0.3240       1.19e-1    9.20e-4    1.19e-4    2.14e-6    1.49e-7    0.00e+0
//
//    the conditional-decay test, which is the hypothesis a proof would need.
//    N_m = #{i : g_i .. g_{i+m-1} all >= theta}.  Hypothesis H": N_m <= delta*N_{m-1}
//    with delta <= exp(-c*theta/mbar).  Measured ratios N_m/N_{m-1}, and the
//    value exp(-theta/mbar) they would have to beat:
//
//    fold p   exp(-theta/mbar)        N2/N1      N3/N2      N4/N3      N5/N4      N6/N5      N7/N6
//   --------------------------------------------------------------------------
//        7            0.3012      5.00e-1    0.00e+0          -          -          -          -
//       11            0.1801      0.00e+0          -          -          -          -          -
//       13            0.2460      2.25e-1    2.50e-1    0.00e+0          -          -          -
//       17            0.1686      1.23e-1    0.00e+0          -          -          -          -
//       19            0.2079      2.08e-1    1.18e-1    7.84e-2    0.00e+0          -          -
//       23            0.1535      1.01e-1    1.68e-2    0.00e+0          -          -          -
//       29            0.1178      7.53e-2    1.02e-2    1.40e-2    0.00e+0          -          -
//       31            0.1365      9.51e-2    2.40e-2    3.62e-2    3.32e-2    0.00e+0          -
//
//   READING 7.  THE TAIL ITSELF.  Fit ln(1/P(g >= d)) = lambda*d over the
//   upper half of the range; a pure exponential tail at the mean-gap scale
//   would give lambda*mbar = 1.  Larger means a thinner tail, hence smaller L.
//
//    tile   mbar    lambda      lambda*mbar   P(g>=2p)     P(g>=3p)     ratio ln
//   --------------------------------------------------------------------------
//    T 5    10.00        NaN          NaN      0.00e+0      0.00e+0         -
//    T 7    14.00    0.17601        2.464      1.38e-1      0.00e+0         -
//    T11    17.11    0.07597        1.300      2.25e-1      3.05e-2     2.630
//    T13    20.22    0.08840        1.788      1.26e-1      1.55e-2     2.491
//    T17    22.92    0.07804        1.789      1.39e-1      3.93e-2     1.527
//    T19    25.61    0.06383        1.635      9.95e-2      2.50e-2     1.538
//    T23    28.05    0.05798        1.627      9.38e-2      1.64e-2     1.685
//    T29    30.13    0.06222        1.875      8.24e-2      1.71e-2     1.531
//
//   READING 8.  WHAT THE PROVEN BOUND GIVES ASYMPTOTICALLY.
//
//   Theorem B is L <= 1 + m*, m* = max{m : maxsum_m >= c_min(m)} ~ 3pm.
//   Since maxsum_m >= G2 always, and maxsum_m ~ G2 + (m-1)*mbar in the data,
//   m* ~ (G2 - mbar)/(3p - mbar).  A single record gap subsidises the whole
//   window, so the bound is O(G2/p), which on the diagonal is LINEAR in x.
//
//    fold p    G2/(3p)   model m*=(G2-mbar)/(3p-mbar)   measured m*   true L
//   --------------------------------------------------------------------------
//        7       0.57                        0.18             1        2
//       11       0.91                        0.84             1        1
//       13       1.08                        1.14             1        2
//       17       1.29                        1.49             3        2
//       19       1.89                        2.50             3        2
//       23       2.17                        2.87             3        3
//       29       2.34                        2.98             4        2
//       31       2.77                        3.62             5        4
//
//   Projection, with the EXACT mean gap mbar(x) = 6*prod_{5<=q<=x} q/(q-2).
//   Branch B (what Theorem B proves): L <= G2/(3p), so G2 picks up a factor
//   (1 + mbar/(3p)) at each fold and ln G2 <= ln 12 + sum mbar/(3p).
//   Branch P (what the route needs): L ~ mbar/3, so G2 <= 12 + sum mbar^2/3.
//   The requirement is ln G2 < 2 ln x, i.e. G2 < x^2.
//
//      x       ln(12)+sum mbar/(3p)    2 ln x   B closes?      sum mbar^2/3        x^2   P closes?
//   --------------------------------------------------------------------------
//         37                  5.45      7.22        yes          1.62e+3    1.37e+3         NO
//        100                  8.38      9.21        yes          9.83e+3    1.00e+4        yes
//       1000                 18.85     13.82         NO          4.22e+5    1.00e+6        yes
//      10000                 33.64     18.42         NO          1.11e+7    1.00e+8        yes
//     100000                 52.70     23.03         NO          2.29e+8   1.00e+10        yes
//    1000000                 76.02     27.63         NO          4.12e+9   1.00e+12        yes
//
//   READING 9.  kappa(m), AND THEOREM C.
//
//   Theorem A never used adjacency: if one 2-set deletes slots j_1 < ... < j_k,
//   then consecutive SEPARATIONS d_t = s_{j_{t+1}} - s_{j_t} are all = 0,+-2 (mod p)
//   and obey the same two-state walk, so any two adjacent separations sum to
//   >= 6p and s_{j_k} - s_{j_1} >= c_min(k-1).  A stretch that becomes m new gaps
//   spans m+kappa old gaps, and the first and last kill sit strictly inside, so
//
//      THEOREM C.   kappa(m) <= max{ k >= 1 : maxsum_{m+k-2}(T_x) >= c_min(k-1) }.
//
//   With m = 1 this is Theorem B.  Measured kappa(m) against it:
//
//    fold p  m:      1     2     3     4     5     6     7     8
//   --------------------------------------------------------------------------
//       [66.1s] kappa profile at fold 7
//        7  true       2     2     4     4     5     5     6     6
//           Thm C      2     2     4     4     5     6     6     8
//           L+2        4     4     4     4     4     4     4     4
//       [66.1s] kappa profile at fold 11
//       11  true       1     2     2     2     3     4     4     4
//           Thm C      2     3     4     4     5     6     6     6
//           L+2        3     3     3     3     3     3     3     3
//       [66.1s] kappa profile at fold 13
//       13  true       2     2     2     2     3     3     3     4
//           Thm C      2     4     5     6     6     6     8     8
//           L+2        4     4     4     4     4     4     4     4
//       [66.1s] kappa profile at fold 17
//       17  true       2     2     2     3     3     3     3     4
//           Thm C      2     4     4     5     6     6     8     8
//           L+2        4     4     4     4     4     4     4     4
//       [66.1s] kappa profile at fold 19
//       19  true       2     2     3     3     3     3     3     4
//           Thm C      4     4     5     7     8     8    10    10
//           L+2        4     4     4     4     4     4     4     4
//       [66.1s] kappa profile at fold 23
//       23  true       3     4     4     4     5     5     5     5
//           Thm C      4     5     6     6     8     8     9    10
//           L+2        5     5     5     5     5     5     5     5
//       [66.3s] kappa profile at fold 29
//       29  true       2     3     3     3     4     4     4     4
//           Thm C      5     6     7     7     8     8     8     8
//           L+2        4     4     4     4     4     4     4     4
//       31  (fold 31 not computed: 31 passes over 214.7M slots)
//
//    checks:
//    fold  7   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 FAIL
//    fold 11   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 FAIL
//    fold 13   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK
//    fold 17   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK
//    fold 19   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK
//    fold 23   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK
//    fold 29   kappa(1)=L OK   Theorem C holds OK   kappa(m)<=L+2 OK
//
//   --------------------------------------------------------------------------
//       [70.3s] done
// ============================================================================
// READINGS
// ============================================================================
