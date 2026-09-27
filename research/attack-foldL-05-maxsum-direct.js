#!/usr/bin/env node
'use strict';
// ============================================================================
// ATTACK foldL-05 -- THE DIRECT 0c ATTACK: a proven upper bound on maxsum_m
// (plain and residue-deleted) by an argument that never counts kills.
// TODO.md item 0c.   Run:  node research/attack-foldL-05-maxsum-direct.js
// ----------------------------------------------------------------------------
// FOUR ROUTES, PRICED HERE
//   R1  the certificate at threshold m: drive research/theta-ladder-sup.js
//       (rewritten 2026-08-19, window from the caller) and read minT_H, the
//       certified all-positions LOWER bound on the window count. minT_H >= m
//       IS the statement maxsum_m <= H. Not rebuilt here; spawned.
//   R2  the mean-square / Chebyshev route, at threshold m, in TWO currencies:
//       over POSITIONS (exact tile variance, plus Lemma V's proved B) and over
//       ALIGNMENTS (the copy theorem's max over the p 2-sets, Samuelson).
//   R3  the residue-deleted structure: the Localized Merge Lemma's kill-gap
//       floor, sharpened here, and the bridge from maxsum to L -- including the
//       bridge's own unconditional FLOOR, which no maxsum bound can go under.
//   R4  prior art: run separately, reported in the staging note.
//
// CONVENTIONS (units.js sec 5, sieve form throughout).
//   T_x  = twin slots mod W_x = x#, D_x = prod_{3<=q<=x}(q-2), mbar = W/D.
//   maxsum_m(T) = max over positions of the sum of m consecutive cyclic gaps.
//   All slots are ==5 (mod 6) for x>=3, so every gap is a multiple of 6.
// ============================================================================

const { execFileSync } = require('child_process');
const path = require('path');
const REPO = path.resolve(__dirname, '..');
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);
const f = (v, d = 4) => Number.isFinite(v) ? v.toFixed(d) : String(v);
const pad = (s, n) => String(s).padStart(n);

let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) FAILS++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${label}${detail ? '   ' + detail : ''}`);
}

// ---------------------------------------------------------------- tiles -----
const PRIMES = [3, 5, 7, 11, 13, 17, 19, 23];
function buildTiles(upTo) {
  const out = new Map();
  let slots = Float64Array.from([5]), W = 6;          // T_3
  out.set(3, { slots, W, D: 1 });
  for (const p of PRIMES.slice(1)) {
    if (p > upTo) break;
    const D = slots.length, rs = new Int32Array(D);
    for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
    const wp = W % p, next = new Float64Array(D * (p - 2));
    let n = 0;
    for (let k = 0; k < p; k++) {
      const off = k * W, kw = (k * wp) % p;
      const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
      for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) next[n++] = slots[i] + off;
    }
    slots = next; W *= p;
    out.set(p, { slots, W, D: slots.length });
  }
  return out;
}

// maxsum_m for m = 1..M over a cyclic slot list
function maxsums(slots, W, M) {
  const D = slots.length, best = new Float64Array(M + 1);
  for (let i = 0; i < D; i++) {
    for (let m = 1; m <= M; m++) {
      const j = i + m;
      const v = (j < D ? slots[j] : slots[j - D] + W) - slots[i];
      if (v > best[m]) best[m] = v;
    }
  }
  return best;
}
// maxsum over the tile with residues {a, a-2} mod p deleted (streamed, cyclic)
function maxsumsDeleted(slots, W, p, a, M) {
  const D = slots.length;
  const d0 = ((a % p) + p) % p, d2 = ((a - 2) % p + p) % p;
  const buf = new Float64Array(M + 1); let head = 0, cnt = 0;
  const best = new Float64Array(M + 1);
  const firstV = new Float64Array(M + 1); let nf = 0;
  const push = (v) => {
    buf[head] = v; head = (head + 1) % (M + 1); cnt++;
    for (let m = 1; m <= M; m++) {
      if (cnt <= m) continue;
      const idx = (head - 1 - m + 2 * (M + 1)) % (M + 1);
      const s = v - buf[idx];
      if (s > best[m]) best[m] = s;
    }
  };
  for (let i = 0; i < D; i++) {
    const r = slots[i] % p;
    if (r === d0 || r === d2) continue;
    if (nf <= M) firstV[nf++] = slots[i];
    push(slots[i]);
  }
  for (let k = 0; k < nf && k <= M; k++) push(firstV[k] + W);   // wrap
  return best;
}

// The exact G2 ladder = OEIS A144311 + 1 (SEARCH-CONVENTIONS.md sec 1: A144311
// tabulates G2 - 1), x = 2..79. Used wherever an exact term exists; the
// 0.55*theta(x)^2 model is labelled at every row that uses it.
const LADDER = { 2: 2, 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204,
                 29: 258, 31: 348, 37: 528, 41: 546, 43: 618, 47: 708, 53: 870,
                 59: 966, 61: 1080, 67: 1284, 71: 1398, 73: 1530, 79: 1710 };
function theta(x) { const n = Math.floor(x), s = new Uint8Array(n + 1); let t = 0;
  for (let i = 2; i <= n; i++) { if (!s[i]) { t += Math.log(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return t; }

const tiles = buildTiles(23);
const MMAX = 24;
const MS = new Map();
for (const [x, t] of tiles) MS.set(x, maxsums(t.slots, t.W, MMAX));

console.log('='.repeat(78));
console.log('0. SELF-TESTS AND CONVENTIONS');
console.log('='.repeat(78));
{
  const wantD = { 3: 1, 5: 3, 7: 15, 11: 135, 13: 1485, 17: 22275, 19: 378675, 23: 7952175 };
  const wantG = { 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204 };
  for (const [x, t] of tiles) {
    check(`D(T_${x}) = prod (q-2)`, t.D === wantD[x], `D = ${t.D}`);
    check(`G2(${x}#) = ${wantG[x]}`, MS.get(x)[1] === wantG[x], `maxsum_1 = ${MS.get(x)[1]}`);
  }
  for (const [x, t] of tiles) check(`LADDER (A144311+1) agrees with the computed G2 at x = ${x}`,
    LADDER[x] === MS.get(x)[1], `${LADDER[x]} vs ${MS.get(x)[1]}`);
  // every slot == 5 mod 6, so every gap is a multiple of 6
  let all6 = true;
  for (const [x, t] of tiles) for (let i = 0; i < Math.min(t.D, 5000); i++) if (t.slots[i] % 6 !== 5) all6 = false;
  check('every twin slot == 5 (mod 6), so every gap == 0 (mod 6)', all6);
}

console.log('');
console.log('='.repeat(78));
console.log('0a. THE WINDOW-COUNT EQUIVALENCE, DERIVED AND VERIFIED');
console.log('='.repeat(78));
console.log('  CLAIM (elementary).  For half-open windows,');
console.log('      min_t #{ twin slots in [t, t+H) }  >=  m     <=>     H >= maxsum_m(T).');
console.log('  Proof.  (<=) given t take s_i the largest slot < t; then s_{i+m} <= s_i + maxsum_m');
console.log('  <= t-1+H < t+H and s_{i+1}..s_{i+m} all lie in the window.  (=>) if H <= maxsum_m - 1,');
console.log('  the window [s_i+1, s_i+1+H) at the extremal i holds only s_{i+1}..s_{i+m-1}.  QED');
console.log('  So "maxsum_m <= H" IS "every window of length H contains at least m twin slots",');
console.log('  an ALL-POSITIONS window-count lower bound at threshold m.  Verified by brute force:');
for (const x of [3, 5, 7, 11]) {
  const t = tiles.get(x), W = t.W, D = t.D;
  const inW = new Uint8Array(W); for (let i = 0; i < D; i++) inW[t.slots[i]] = 1;
  let worst = null;
  for (let m = 1; m <= Math.min(6, D); m++) {
    const target = MS.get(x)[m];
    for (const H of [target - 1, target]) {
      if (H < 1) continue;
      let mn = Infinity, run = 0;
      for (let s = 0; s < H; s++) run += inW[s % W];
      mn = run;
      for (let tt = 1; tt < W; tt++) { run += inW[(tt + H - 1) % W] - inW[tt - 1]; if (run < mn) mn = run; }
      const shouldBe = (H >= target);
      if ((mn >= m) !== shouldBe) worst = `m=${m} H=${H} minN=${mn}`;
    }
  }
  check(`T_${x}: min_t N([t,t+H)) >= m  <=>  H >= maxsum_m, both signs, m <= ${Math.min(6, D)}`,
        worst === null, worst === null ? `W = ${W}` : worst);
}

console.log('');
console.log('='.repeat(78));
console.log('1. R3 -- THE KILL-GAP FLOOR, SHARPENED, AND THE BRIDGE FROM maxsum TO L');
console.log('='.repeat(78));
console.log('  Fold T_x by p.  The kills are exactly the slots in classes {a, a-2} mod p');
console.log('  (U-FRAME 5a step 1, PROVEN).  So the difference of two killed slots is == 0 or');
console.log('  +-2 (mod p), AND it is a multiple of 6 because every twin slot is == 5 (mod 6).');
console.log('  CRT on those two conditions gives the exact floor for each transition:');
{
  const rows = [];
  for (const p of [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]) {
    // smallest positive d with 6|d and d == delta (mod p)
    const smallest = (delta) => { for (let k = 1; k <= 6 * p; k++) { const d = k * 6; if (((d - delta) % p + p) % p === 0) return d; } return NaN; };
    const same = smallest(0), toMinus = smallest(-2), toPlus = smallest(2);
    rows.push({ p, mod6: p % 6, same, toMinus, toPlus, minGap: Math.min(same, toMinus, toPlus), pair: Math.min(same + same, same + toMinus, same + toPlus, toMinus + toPlus, toPlus + toMinus) });
  }
  console.log('    p  p%6   a->a   a->a-2   a-2->a   min gap   min pair   2p-2   3p');
  for (const r of rows) console.log(`  ${pad(r.p, 3)} ${pad(r.mod6, 4)} ${pad(r.same, 7)} ${pad(r.toMinus, 8)} ${pad(r.toPlus, 9)} ${pad(r.minGap, 9)} ${pad(r.pair, 10)} ${pad(2 * r.p - 2, 6)} ${pad(3 * r.p, 4)}`);
  const okSame = rows.every(r => r.same === 6 * r.p);
  const okMin = rows.every(r => r.minGap >= 2 * r.p - 2);
  const okPair = rows.every(r => r.pair >= 6 * r.p);
  check('same-class transition costs exactly 6p', okSame);
  check('every kill-gap is >= 2p-2  (2p-2 if p==1 mod 6, 2p+2 if p==5 mod 6)', okMin);
  check('every CONSECUTIVE PAIR of kill-gaps costs >= 6p, so the long-run rate is 3p', okPair);
}
console.log('');
console.log('  THEOREM K (PROVEN here).  A run of k+1 adjacent kills spans k consecutive old');
console.log('  gaps whose total is >= 3pk - p - 2.  [cost 6p per same-class step, 2p-2 and 4p+2');
console.log('  (p==1 mod 6) or 4p-2 and 2p+2 (p==5 mod 6) for the two cross steps, whose counts');
console.log('  differ by at most 1; maximising the discount gives 3pk + p + 2 off 6pk.]');
console.log('  BRIDGE (PROVEN).  L(x,p) <= 1 + max{ k >= 1 : maxsum_k(T_x) >= 3pk - p - 2 }.');
console.log('  Verified against the true L, and against A5 Theorem B\'s 3p\'k form:');
{
  // The fold 3->5 is excluded and the reason is stated rather than hidden: D_3 = 1,
  // so T_3 minus two classes mod 5 is EMPTY and "adjacent kill run" is not defined
  // (a single cyclic slot reads as a run of 2). Every fold with D_x >= p is kept.
  const folds = [[5, 7], [7, 11], [11, 13], [13, 17], [17, 19], [19, 23], [23, 29]];
  console.log('     x    p   trueL  minKillGap  minSpan/k floor   bridge K  A5 3pk   floor 1+G2/(3p)');
  for (const [x, p] of folds) {
    const t = tiles.get(x), D = t.D;
    // true L and the true minimum span of k consecutive kill-gaps, over all a
    let trueL = 0, minKG = Infinity, minSpanK = new Float64Array(MMAX + 1).fill(Infinity);
    for (let a = 0; a < p; a++) {
      const d0 = a % p, d2 = ((a - 2) % p + p) % p;
      const killed = [];
      for (let i = 0; i < D; i++) { const r = t.slots[i] % p; if (r === d0 || r === d2) killed.push(t.slots[i]); }
      // adjacency in slot index: recompute runs
      let run = 0;
      for (let i = 0; i < 2 * D; i++) {
        const j = i % D, r = t.slots[j] % p;
        if (r === d0 || r === d2) { run++; if (run > trueL) trueL = run; } else run = 0;
      }
      for (let i = 0; i + 1 < killed.length; i++) { const g = killed[i + 1] - killed[i]; if (g < minKG) minKG = g; }
      // spans of k consecutive kill-gaps
      for (let i = 0; i < killed.length; i++)
        for (let k = 1; k <= MMAX && i + k < killed.length; k++) {
          const s = killed[i + k] - killed[i]; if (s < minSpanK[k]) minSpanK[k] = s;
        }
    }
    let bridgeK = 0, a5K = 0;
    for (let k = 1; k <= MMAX; k++) {
      if (MS.get(x)[k] >= 3 * p * k - p - 2) bridgeK = k;
      if (MS.get(x)[k] >= 3 * p * k) a5K = k;
    }
    const G2 = MS.get(x)[1];
    const floorK = Math.floor((G2 + p + 2) / (3 * p));
    let ratios = [];
    for (let k = 1; k <= 4; k++) ratios.push((minSpanK[k] / (3 * p * k - p - 2)).toFixed(3));
    console.log(`  ${pad(x, 4)} ${pad(p, 4)} ${pad(trueL, 7)} ${pad(minKG, 11)}  ${pad(ratios.join(' '), 24)} ${pad(1 + bridgeK, 8)} ${pad(1 + a5K, 7)} ${pad(1 + floorK, 12)}`);
    check(`fold ${x}->${p}: min kill-gap >= 2p-2 = ${2 * p - 2}`, minKG >= 2 * p - 2, `min = ${minKG}`);
    let thmK = true; for (let k = 1; k <= MMAX; k++) if (Number.isFinite(minSpanK[k]) && minSpanK[k] < 3 * p * k - p - 2) thmK = false;
    check(`fold ${x}->${p}: Theorem K span >= 3pk-p-2 for all k <= ${MMAX}`, thmK);
    check(`fold ${x}->${p}: bridge holds, trueL <= 1+K`, trueL <= 1 + bridgeK, `trueL=${trueL} 1+K=${1 + bridgeK}`);
  }
}
console.log('');
console.log('  THE BRIDGE HAS AN UNCONDITIONAL FLOOR, AND NO maxsum UPPER BOUND CAN GO UNDER IT.');
console.log('  maxsum_k is non-decreasing in k, so maxsum_k >= maxsum_1 = G2(T_x) for every k.');
console.log('  Hence every k <= (G2(T_x)+p+2)/(3p) satisfies the bridge\'s inequality, and');
console.log('      bridge output  >=  1 + floor( (G2(T_x)+p+2) / (3p) )   ~   G2(T_x)/(3p)  ~  0.183 x.');
console.log('  The u-frame needs L <= 0.19 to 0.31 * p/ln p (gate-multiplies.md sec 8).');
{
  console.log('       x     G2(T_x)   bridge floor   uframe need 0.31p/lnp   0.19p/lnp   floor/need(0.31)   G2 source');
  for (const x of [11, 13, 17, 19, 23, 29, 37, 79, 101, 1009, 10007, 1e6]) {
    const p = x;                    // p ~ x' ~ x for the pricing
    const G2 = LADDER[x] !== undefined ? LADDER[x] : 0.55 * theta(x) * theta(x);
    const floorK = 1 + Math.floor((G2 + p + 2) / (3 * p));
    const need31 = 0.31 * p / Math.log(p), need19 = 0.19 * p / Math.log(p);
    console.log(`  ${pad(x, 7)} ${pad(f(G2, 1), 11)} ${pad(floorK, 14)} ${pad(f(need31, 2), 23)} ${pad(f(need19, 2), 11)} ${pad(f(floorK / need31, 3), 18)}   ${LADDER[x] !== undefined ? 'exact, A144311' : 'model 0.55*theta(x)^2'}`);
  }
}

console.log('');
console.log('  1b. THE SELF-CONSISTENT MERGE INEQUALITY, SOLVED, AND PRICED IN NATS.');
console.log('  Theorem K inverted: a window of span S holds at most 1 + floor((S+p+2)/(3p))');
console.log('  kills, so m consecutive NEW gaps are at most m + that many OLD gaps, and');
console.log('      S := maxsum_m(T_p)  <=  maxsum_{ m + 1 + floor((S+p+2)/(3p)) }(T_x),');
console.log('  an implicit inequality in S alone.  Its LEAST fixed point above maxsum_m(T_x) is');
console.log('  the bound the Merge Lemma can prove with no kill count anywhere. Iterated from');
console.log('  S_0 = maxsum_m(T_x) upward. "burn" = ln(bound/true), against a per-fold');
console.log('  replenishment 2 ln(p/x) and a LIFETIME Overshoot Budget of 0.88-1.19 nats');
console.log('  (gate-multiplies.md sec 5).');
{
  console.log('     x    p   m   true maxsum_m(T_p)   fixed point   index used   ratio    burn nats   2ln(p/x)');
  for (const [x, p] of [[7, 11], [11, 13], [13, 17], [17, 19], [19, 23]]) {
    const old = MS.get(x), tru = MS.get(p);
    for (const m of [1, 2, 4]) {
      let S = old[m], idx = 0, it = 0, blew = false;
      for (; it < 60; it++) {
        const j = m + 1 + Math.floor((S + p + 2) / (3 * p));
        if (j > MMAX) { blew = true; idx = j; break; }
        const S2 = old[j];
        if (S2 === S) { idx = j; break; }
        S = S2; idx = j;
      }
      const rep = 2 * Math.log(p / x);
      console.log(`  ${pad(x, 4)} ${pad(p, 4)} ${pad(m, 3)} ${pad(tru[m], 20)} ${pad(blew ? '>maxsum_' + MMAX : S, 13)} ${pad(idx, 12)} ${pad(blew ? '-' : f(S / tru[m], 4), 8)} ${pad(blew ? '-' : f(Math.log(S / tru[m]), 4), 11)} ${pad(f(rep, 4), 10)}`);
    }
  }
}

console.log('');
console.log('='.repeat(78));
console.log('2. R2-ALIGNMENTS -- the copy theorem\'s max over the p 2-sets, priced by Samuelson');
console.log('='.repeat(78));
console.log('  Delta_m(x,p,a) = maxsum_m(T_x minus classes {a,a-2} mod p).  Copy theorem');
console.log('  (U-FRAME 5a step 2): maxsum_m(T_p) = max_a Delta_m.  min/mean/max reproduce the');
console.log('  embedded table of research/attack-0c0e-01-deleted-family.js; sd_a is new here.');
console.log('  SAMUELSON (PROVEN, exact for any finite list): max <= mean + sd*sqrt(n-1), n = p.');
const MA = 8;
const alignRows = [];
{
  const folds = [[7, 11], [11, 13], [13, 17], [17, 19], [19, 23], [23, 29]];
  console.log('     x    p   m     min_a     mean_a       sd_a      max_a    Samuelson   Sam/max   (max-mean)/sd   sqrt(p-1)   #within 2%');
  for (const [x, p] of folds) {
    const t = tiles.get(x);
    const vals = [];
    for (let a = 0; a < p; a++) vals.push(maxsumsDeleted(t.slots, t.W, p, a, MA));
    for (let m = 1; m <= MA; m++) {
      const v = vals.map(b => b[m]);
      const n = v.length;
      const mean = v.reduce((s, q) => s + q, 0) / n;
      const sd = Math.sqrt(v.reduce((s, q) => s + (q - mean) * (q - mean), 0) / n);
      const mx = Math.max(...v), mn = Math.min(...v);
      const sam = mean + sd * Math.sqrt(n - 1);
      const within = v.filter(q => q >= 0.98 * mx).length;
      alignRows.push({ x, p, m, mn, mean, sd, mx, sam });
      console.log(`  ${pad(x, 4)} ${pad(p, 4)} ${pad(m, 3)} ${pad(mn, 9)} ${pad(f(mean, 2), 10)} ${pad(f(sd, 3), 10)} ${pad(mx, 10)} ${pad(f(sam, 2), 12)} ${pad(f(sam / mx, 4), 9)} ${pad(f((mx - mean) / sd, 3), 15)} ${pad(f(Math.sqrt(n - 1), 3), 11)} ${pad(within + '/' + n, 12)}`);
    }
    // custody: the copy theorem
    const ms = MS.has(p) ? MS.get(p) : null;
    if (ms) { let ok = true; for (let m = 1; m <= MA; m++) if (Math.max(...vals.map(b => b[m])) !== ms[m]) ok = false;
      check(`copy theorem max_a Delta_m = maxsum_m(T_${p}), m <= ${MA}`, ok); }
    console.log('');
  }
}
{
  console.log('  Chebyshev over the p ALIGNMENTS: an almost-all-alignments bound survives the max');
  console.log('  iff the exceptional fraction is < 1/p.  Chebyshev gives frac <= sd^2/(max-mean)^2.');
  console.log('       x    p   m   sd^2/(max-mean)^2    1/p     survives max?   Sam/max');
  for (const r of alignRows) if (r.m <= 3) {
    const frac = (r.sd * r.sd) / ((r.mx - r.mean) * (r.mx - r.mean));
    console.log(`  ${pad(r.x, 5)} ${pad(r.p, 4)} ${pad(r.m, 3)} ${pad(f(frac, 4), 17)} ${pad(f(1 / r.p, 4), 8)} ${pad(frac < 1 / r.p ? 'YES' : 'NO', 15)} ${pad(f(r.sam / r.mx, 4), 9)}`);
  }
}

console.log('');
console.log('='.repeat(78));
console.log('3. R2-POSITIONS -- Chebyshev at threshold m, exact tile variance and Lemma V\'s B');
console.log('='.repeat(78));
console.log('  Exact second moment of the window count N(t) = #{slots in [t,t+H)} over t in Z/W.');
console.log('  Bad set = { t : N(t) < m }.  maxsum_m <= H IS "the bad set is EMPTY", so a');
console.log('  Chebyshev bound on its MEASURE has to be pushed below 1/W, not below any constant.');
{
  console.log('       x       W        D    H=A*m*mbar  m    mean    Var    Fano   Cheb frac    TRUE frac    1/W       Cheb/(1/W)');
  for (const x of [7, 11, 13, 17, 19]) {
    const t = tiles.get(x), W = t.W, D = t.D, mbar = W / D;
    for (const m of [1, 4]) {
      const A = 2, H = Math.round(A * m * mbar);
      // exact Sum_t N(t)^2 = Sum_{i,j} (H - d_ij)^+ ; scan forward neighbours
      let s2 = 0;
      for (let i = 0; i < D; i++) {
        for (let k = 0; ; k++) {
          const j = i + k, v = (j < D ? t.slots[j] : t.slots[j - D] + W) - t.slots[i];
          if (v >= H) break;
          s2 += (k === 0 ? (H - v) : 2 * (H - v));
        }
      }
      const mean = H * D / W, Var = s2 / W - mean * mean;
      const deficit = mean - (m - 1);
      const cheb = deficit > 0 ? Var / (deficit * deficit) : 1;
      // exact bad fraction
      const inW = new Uint8Array(W); for (let i = 0; i < D; i++) inW[t.slots[i]] = 1;
      let run = 0; for (let s = 0; s < H; s++) run += inW[s % W];
      let bad = run < m ? 1 : 0;
      for (let tt = 1; tt < W; tt++) { run += inW[(tt + H - 1) % W] - inW[tt - 1]; if (run < m) bad++; }
      console.log(`  ${pad(x, 5)} ${pad(W, 9)} ${pad(D, 8)} ${pad(H, 10)} ${pad(m, 4)} ${pad(f(mean, 3), 7)} ${pad(f(Var, 3), 7)} ${pad(f(Var / mean, 3), 6)} ${pad(f(cheb, 5), 11)} ${pad(f(bad / W, 5), 12)} ${pad((1 / W).toExponential(2), 10)} ${pad((cheb * W).toExponential(2), 12)}`);
    }
  }
}
console.log('');
console.log('  LEMMA V\'s MEAN SQUARE, at threshold m.  <R^2>_H <= B(z,s)*H unconditionally');
console.log('  (B <= 9A^2(E-1) = O((log z)^8), history/staging/attack-AB-bounded.md, PROVED).');
console.log('  Certificate count T_H(x) = H*M + R_H(x), so T_H < m only when R_H < m - H*M, and');
console.log('      frac{ x : T_H(x) < m }  <=  B*H / (H*M - m)^2.');
console.log('  With H = A*m/M the deficit is m(A-1) and the fraction is  A*B / (M*m*(A-1)^2).');
console.log('  ALL positions needs that below 1/W, i.e.  m  >  A*B*W / (M*(A-1)^2).  Compare D:');
{
  // B(z,3.0) MEASURED, quoted from history/staging/attack-AB-bounded.md sec 1.1
  const Btab = { 13: 1.383263, 19: 1.434774, 29: 1.465995, 37: 1.488330, 41: 1.496346 };
  const primesBelow = (n) => { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; };
  console.log('       z     B(z,3.0)         W          M          D      m needed for ALL positions   m/D');
  for (const z of [13, 19, 29, 37, 41]) {
    const ps = primesBelow(z);
    let W = 1, M = 1, D = 1;
    for (const p of ps) { W *= p; if (p === 2) { M *= 0.5; D *= 1; } else { M *= (1 - 2 / p); D *= (p - 2); } }
    const A = 2, B = Btab[z];
    const mNeed = A * B * W / (M * (A - 1) * (A - 1));
    console.log(`  ${pad(z, 5)} ${pad(f(B, 6), 12)} ${pad(W.toExponential(3), 11)} ${pad(f(M, 6), 10)} ${pad(D.toExponential(3), 10)} ${pad(mNeed.toExponential(3), 26)} ${pad((mNeed / D).toExponential(2), 10)}`);
  }
}

console.log('');
console.log('='.repeat(78));
console.log('4. R1 -- THE CERTIFICATE AT THRESHOLD m (driving research/theta-ladder-sup.js)');
console.log('='.repeat(78));
console.log('  minT_H is the certified all-positions MINIMUM of the vector-sieve count over the');
console.log('  FULL period.  minT_H >= m  is exactly  maxsum_m(T_{z-}) <= H, where z- is the');
console.log('  largest prime BELOW z (the script sieves by primes < z).  Windows are scanned on');
console.log('  a stride-6 grid because every gap is a multiple of 6; the reported H is the least');
console.log('  scanned window with minT >= m at it and at every larger scanned window, so it is');
console.log('  the true threshold rounded UP to the grid (stride 6, 12 at z=23, 48 at z=29).');
{
  const map = [[13, 11], [17, 13], [19, 17], [23, 19], [29, 23]];
  const runH = (z, H) => {
    const out = execFileSync('node', [path.join(REPO, 'research', 'theta-ladder-sup.js'), String(z), `--H=${H}`],
      { cwd: REPO, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 26 });
    const j = JSON.parse(out.slice(out.lastIndexOf('SUPJSON ') + 8).split('\n')[0]);
    return { minT: j.rows[0].minT, sup: j.rows[0].sup, M: j.M };
  };
  console.log('      z   tile     m   maxsum_m(true)   H_cert   H_cert/true   H_cert-true   walks');
  for (const [z, x] of map) {
    const grid = [];
    const mbar = tiles.get(x).W / tiles.get(x).D;
    const hi = Math.round(MS.get(x)[MA] * 1.6);
    const stride = z >= 29 ? 48 : (z >= 23 ? 12 : 6);
    for (let H = 6 * Math.floor(MS.get(x)[1] / 6); H <= hi; H += stride) grid.push(H);
    const minT = [];
    for (const H of grid) minT.push(runH(z, H).minT);
    process.stderr.write(`  z=${z}: ${grid.length} walks done [${el()}s]\n`);
    for (let m = 1; m <= MA; m++) {
      let idx = -1;
      for (let k = grid.length - 1; k >= 0; k--) { if (minT[k] < m) break; idx = k; }
      const Hc = idx < 0 ? null : grid[idx];
      const tr = MS.get(x)[m];
      console.log(`  ${pad(z, 5)} ${pad('T_' + x, 6)} ${pad(m, 5)} ${pad(tr, 16)} ${pad(Hc === null ? '>' + grid[grid.length - 1] : Hc, 8)} ${pad(Hc === null ? '-' : f(Hc / tr, 4), 13)} ${pad(Hc === null ? '-' : Hc - tr, 13)} ${pad(grid.length, 7)}`);
    }
    console.log('');
  }
}

console.log('='.repeat(78));
console.log('5. R1 PRICED ASYMPTOTICALLY: where the threshold-m certificate turns linear');
console.log('='.repeat(78));
console.log('  The unconditional two-class sieve certifies N(t) >> H*V for every t once');
console.log('  H >= z^(beta2+eps), beta2 = 4.26645028414864191641 (DHR, SEARCH-CONVENTIONS 4).');
console.log('  So the threshold-m certificate sits at H ~ z^beta2 for every m up to');
console.log('      m* = z^beta2 * V   (V = prod_{p<=z}(1-2/p) = 1/mbar),');
console.log('  and only above m* does it become the linear-in-m bound maxsum_m << m*mbar.');
console.log('  The L-bridge needs maxsum_k < 3pk from k ~ 0.19 x/ln x upward.  Compare:');
{
  const beta2 = 4.26645028414864191641;
  const primesUpTo = (n) => { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; };
  console.log('        x         mbar           V          m* = z^b2 * V     m needed 0.19x/lnx     m*/m needed');
  for (const x of [23, 29, 101, 1009, 10007, 100003, 1e6]) {
    const ps = primesUpTo(Math.floor(x));
    let V = 1; for (const p of ps) V *= (p === 2 ? 0.5 : 1 - 2 / p);
    const mbar = 1 / V;
    const mstar = Math.pow(x, beta2) * V;
    const need = 0.19 * x / Math.log(x);
    console.log(`  ${pad(x, 9)} ${pad(f(mbar, 3), 12)} ${pad(V.toExponential(3), 12)} ${pad(mstar.toExponential(3), 20)} ${pad(f(need, 3), 22)} ${pad((mstar / need).toExponential(2), 15)}`);
  }
}

console.log('');
console.log(`SELF-TESTS: ${FAILS === 0 ? 'ALL PASS' : FAILS + ' FAILURE(S)'}   elapsed ${el()}s`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-foldL-05-maxsum-direct.js
//   invocation:  node research/attack-foldL-05-maxsum-direct.js
//   code-sha256: 6fcfefcc7294b9745f65c25cf96592834b07a51250eade53ba84df8691280a81
//   out-sha256:  e7af4267bbc7c9cea6f9f907b08cfa2f06471da4b7581155e843ddf2de7a4f50
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     270.0 s
// ============================================================================
// ==============================================================================
// 0. SELF-TESTS AND CONVENTIONS
// ==============================================================================
//   ok    D(T_3) = prod (q-2)   D = 1
//   ok    G2(3#) = 6   maxsum_1 = 6
//   ok    D(T_5) = prod (q-2)   D = 3
//   ok    G2(5#) = 12   maxsum_1 = 12
//   ok    D(T_7) = prod (q-2)   D = 15
//   ok    G2(7#) = 30   maxsum_1 = 30
//   ok    D(T_11) = prod (q-2)   D = 135
//   ok    G2(11#) = 42   maxsum_1 = 42
//   ok    D(T_13) = prod (q-2)   D = 1485
//   ok    G2(13#) = 66   maxsum_1 = 66
//   ok    D(T_17) = prod (q-2)   D = 22275
//   ok    G2(17#) = 108   maxsum_1 = 108
//   ok    D(T_19) = prod (q-2)   D = 378675
//   ok    G2(19#) = 150   maxsum_1 = 150
//   ok    D(T_23) = prod (q-2)   D = 7952175
//   ok    G2(23#) = 204   maxsum_1 = 204
//   ok    LADDER (A144311+1) agrees with the computed G2 at x = 3   6 vs 6
//   ok    LADDER (A144311+1) agrees with the computed G2 at x = 5   12 vs 12
//   ok    LADDER (A144311+1) agrees with the computed G2 at x = 7   30 vs 30
//   ok    LADDER (A144311+1) agrees with the computed G2 at x = 11   42 vs 42
//   ok    LADDER (A144311+1) agrees with the computed G2 at x = 13   66 vs 66
//   ok    LADDER (A144311+1) agrees with the computed G2 at x = 17   108 vs 108
//   ok    LADDER (A144311+1) agrees with the computed G2 at x = 19   150 vs 150
//   ok    LADDER (A144311+1) agrees with the computed G2 at x = 23   204 vs 204
//   ok    every twin slot == 5 (mod 6), so every gap == 0 (mod 6)
//
// ==============================================================================
// 0a. THE WINDOW-COUNT EQUIVALENCE, DERIVED AND VERIFIED
// ==============================================================================
//   CLAIM (elementary).  For half-open windows,
//       min_t #{ twin slots in [t, t+H) }  >=  m     <=>     H >= maxsum_m(T).
//   Proof.  (<=) given t take s_i the largest slot < t; then s_{i+m} <= s_i + maxsum_m
//   <= t-1+H < t+H and s_{i+1}..s_{i+m} all lie in the window.  (=>) if H <= maxsum_m - 1,
//   the window [s_i+1, s_i+1+H) at the extremal i holds only s_{i+1}..s_{i+m-1}.  QED
//   So "maxsum_m <= H" IS "every window of length H contains at least m twin slots",
//   an ALL-POSITIONS window-count lower bound at threshold m.  Verified by brute force:
//   ok    T_3: min_t N([t,t+H)) >= m  <=>  H >= maxsum_m, both signs, m <= 1   W = 6
//   ok    T_5: min_t N([t,t+H)) >= m  <=>  H >= maxsum_m, both signs, m <= 3   W = 30
//   ok    T_7: min_t N([t,t+H)) >= m  <=>  H >= maxsum_m, both signs, m <= 6   W = 210
//   ok    T_11: min_t N([t,t+H)) >= m  <=>  H >= maxsum_m, both signs, m <= 6   W = 2310
//
// ==============================================================================
// 1. R3 -- THE KILL-GAP FLOOR, SHARPENED, AND THE BRIDGE FROM maxsum TO L
// ==============================================================================
//   Fold T_x by p.  The kills are exactly the slots in classes {a, a-2} mod p
//   (U-FRAME 5a step 1, PROVEN).  So the difference of two killed slots is == 0 or
//   +-2 (mod p), AND it is a multiple of 6 because every twin slot is == 5 (mod 6).
//   CRT on those two conditions gives the exact floor for each transition:
//     p  p%6   a->a   a->a-2   a-2->a   min gap   min pair   2p-2   3p
//     5    5      30       18        12        12         30      8   15
//     7    1      42       12        30        12         42     12   21
//    11    5      66       42        24        24         66     20   33
//    13    1      78       24        54        24         78     24   39
//    17    5     102       66        36        36        102     32   51
//    19    1     114       36        78        36        114     36   57
//    23    5     138       90        48        48        138     44   69
//    29    5     174      114        60        60        174     56   87
//    31    1     186       60       126        60        186     60   93
//    37    1     222       72       150        72        222     72  111
//    41    5     246      162        84        84        246     80  123
//    43    1     258       84       174        84        258     84  129
//   ok    same-class transition costs exactly 6p
//   ok    every kill-gap is >= 2p-2  (2p-2 if p==1 mod 6, 2p+2 if p==5 mod 6)
//   ok    every CONSECUTIVE PAIR of kill-gaps costs >= 6p, so the long-run rate is 3p
//
//   THEOREM K (PROVEN here).  A run of k+1 adjacent kills spans k consecutive old
//   gaps whose total is >= 3pk - p - 2.  [cost 6p per same-class step, 2p-2 and 4p+2
//   (p==1 mod 6) or 4p-2 and 2p+2 (p==5 mod 6) for the two cross steps, whose counts
//   differ by at most 1; maximising the discount gives 3pk + p + 2 off 6pk.]
//   BRIDGE (PROVEN).  L(x,p) <= 1 + max{ k >= 1 : maxsum_k(T_x) >= 3pk - p - 2 }.
//   Verified against the true L, and against A5 Theorem B's 3p'k form:
//      x    p   trueL  minKillGap  minSpan/k floor   bridge K  A5 3pk   floor 1+G2/(3p)
//      5    7       2          12  1.000 Infinity Infinity Infinity        2       1            2
//   ok    fold 5->7: min kill-gap >= 2p-2 = 12   min = 12
//   ok    fold 5->7: Theorem K span >= 3pk-p-2 for all k <= 24
//   ok    fold 5->7: bridge holds, trueL <= 1+K   trueL=2 1+K=2
//      7   11       2          24  1.200 1.698 1.535 Infinity        2       1            2
//   ok    fold 7->11: min kill-gap >= 2p-2 = 20   min = 24
//   ok    fold 7->11: Theorem K span >= 3pk-p-2 for all k <= 24
//   ok    fold 7->11: bridge holds, trueL <= 1+K   trueL=2 1+K=2
//     11   13       2          24   1.000 1.619 1.765 1.660        3       2            2
//   ok    fold 11->13: min kill-gap >= 2p-2 = 24   min = 24
//   ok    fold 11->13: Theorem K span >= 3pk-p-2 for all k <= 24
//   ok    fold 11->13: bridge holds, trueL <= 1+K   trueL=2 1+K=3
//     13   17       2          36   1.125 1.663 1.791 1.654        4       2            2
//   ok    fold 13->17: min kill-gap >= 2p-2 = 32   min = 36
//   ok    fold 13->17: Theorem K span >= 3pk-p-2 for all k <= 24
//   ok    fold 13->17: bridge holds, trueL <= 1+K   trueL=2 1+K=4
//     17   19       2          36   1.000 1.613 1.760 2.029        4       3            3
//   ok    fold 17->19: min kill-gap >= 2p-2 = 36   min = 36
//   ok    fold 17->19: Theorem K span >= 3pk-p-2 for all k <= 24
//   ok    fold 17->19: bridge holds, trueL <= 1+K   trueL=2 1+K=4
//     19   23       3          48   1.091 1.221 1.022 1.458        4       4            3
//   ok    fold 19->23: min kill-gap >= 2p-2 = 44   min = 48
//   ok    fold 19->23: Theorem K span >= 3pk-p-2 for all k <= 24
//   ok    fold 19->23: bridge holds, trueL <= 1+K   trueL=3 1+K=4
//     23   29       2          60   1.071 1.217 1.774 1.647        5       5            3
//   ok    fold 23->29: min kill-gap >= 2p-2 = 56   min = 60
//   ok    fold 23->29: Theorem K span >= 3pk-p-2 for all k <= 24
//   ok    fold 23->29: bridge holds, trueL <= 1+K   trueL=2 1+K=5
//
//   THE BRIDGE HAS AN UNCONDITIONAL FLOOR, AND NO maxsum UPPER BOUND CAN GO UNDER IT.
//   maxsum_k is non-decreasing in k, so maxsum_k >= maxsum_1 = G2(T_x) for every k.
//   Hence every k <= (G2(T_x)+p+2)/(3p) satisfies the bridge's inequality, and
//       bridge output  >=  1 + floor( (G2(T_x)+p+2) / (3p) )   ~   G2(T_x)/(3p)  ~  0.183 x.
//   The u-frame needs L <= 0.19 to 0.31 * p/ln p (gate-multiplies.md sec 8).
//        x     G2(T_x)   bridge floor   uframe need 0.31p/lnp   0.19p/lnp   floor/need(0.31)   G2 source
//        11        42.0              2                    1.42        0.87              1.406   exact, A144311
//        13        66.0              3                    1.57        0.96              1.909   exact, A144311
//        17       108.0              3                    1.86        1.14              1.613   exact, A144311
//        19       150.0              4                    2.00        1.23              2.000   exact, A144311
//        23       204.0              4                    2.27        1.39              1.759   exact, A144311
//        29       258.0              4                    2.67        1.64              1.498   exact, A144311
//        37       528.0              6                    3.18        1.95              1.889   exact, A144311
//        79      1710.0              8                    5.60        3.44              1.427   exact, A144311
//       101      4292.5             15                    6.78        4.16              2.211   model 0.55*theta(x)^2
//      1009    510224.5            169                   45.22       27.72              3.737   model 0.55*theta(x)^2
//     10007  53962169.2           1798                  336.79      206.42              5.339   model 0.55*theta(x)^2
//   1000000 548333856277.1         182779                22438.55    13752.66              8.146   model 0.55*theta(x)^2
//
//   1b. THE SELF-CONSISTENT MERGE INEQUALITY, SOLVED, AND PRICED IN NATS.
//   Theorem K inverted: a window of span S holds at most 1 + floor((S+p+2)/(3p))
//   kills, so m consecutive NEW gaps are at most m + that many OLD gaps, and
//       S := maxsum_m(T_p)  <=  maxsum_{ m + 1 + floor((S+p+2)/(3p)) }(T_x),
//   an implicit inequality in S alone.  Its LEAST fixed point above maxsum_m(T_x) is
//   the bound the Merge Lemma can prove with no kill count anywhere. Iterated from
//   S_0 = maxsum_m(T_x) upward. "burn" = ln(bound/true), against a per-fold
//   replenishment 2 ln(p/x) and a LIFETIME Overshoot Budget of 0.88-1.19 nats
//   (gate-multiplies.md sec 5).
//      x    p   m   true maxsum_m(T_p)   fixed point   index used   ratio    burn nats   2ln(p/x)
//      7   11   1                   42            78            4   1.8571      0.6190     0.9040
//      7   11   2                   66           108            6   1.6364      0.4925     0.9040
//      7   11   4                  108           150            9   1.3889      0.3285     0.9040
//     11   13   1                   66           138            5   2.0909      0.7376     0.3341
//     11   13   2                   96           168            7   1.7500      0.5596     0.3341
//     11   13   4                  156           204           10   1.3077      0.2683     0.3341
//     13   17   1                  108           168            5   1.5556      0.4418     0.5365
//     13   17   2                  150           204            7   1.3600      0.3075     0.5365
//     13   17   4                  198           282           10   1.4242      0.3536     0.5365
//     17   19   1                  150           240            6   1.6000      0.4700     0.2225
//     17   19   2                  186           258            7   1.3871      0.3272     0.2225
//     17   19   4                  228           390           12   1.7105      0.5368     0.2225
//     19   23   1                  204           300            6   1.4706      0.3857     0.3821
//     19   23   2                  234           378            8   1.6154      0.4796     0.3821
//     19   23   4                  348           540           13   1.5517      0.4394     0.3821
//
// ==============================================================================
// 2. R2-ALIGNMENTS -- the copy theorem's max over the p 2-sets, priced by Samuelson
// ==============================================================================
//   Delta_m(x,p,a) = maxsum_m(T_x minus classes {a,a-2} mod p).  Copy theorem
//   (U-FRAME 5a step 2): maxsum_m(T_p) = max_a Delta_m.  min/mean/max reproduce the
//   embedded table of research/attack-0c0e-01-deleted-family.js; sd_a is new here.
//   SAMUELSON (PROVEN, exact for any finite list): max <= mean + sd*sqrt(n-1), n = p.
//      x    p   m     min_a     mean_a       sd_a      max_a    Samuelson   Sam/max   (max-mean)/sd   sqrt(p-1)   #within 2%
//      7   11   1        30      34.36      4.498         42        48.59    1.1568           1.698       3.162         2/11
//      7   11   2        42      55.64     10.577         66        89.08    1.3497           0.980       3.162         4/11
//      7   11   3        66      78.55     11.850         96       116.02    1.2085           1.473       3.162         2/11
//      7   11   4        78      97.09     12.745        108       137.40    1.2722           0.856       3.162         6/11
//      7   11   5        96     117.27     17.041        138       171.16    1.2403           1.216       3.162         2/11
//      7   11   6       108     135.27     16.454        156       187.31    1.2007           1.260       3.162         2/11
//      7   11   7       126     148.91     15.940        168       199.32    1.1864           1.198       3.162         2/11
//      7   11   8       138     163.09     13.494        180       205.76    1.1431           1.253       3.162         2/11
//   ok    copy theorem max_a Delta_m = maxsum_m(T_11), m <= 8
//
//     11   13   1        48      64.62      4.796         66        81.23    1.2308           0.289       3.464        12/13
//     11   13   2        78      91.85      6.395         96       114.00    1.1875           0.650       3.464         8/13
//     11   13   3       108     121.85     11.857        138       162.92    1.1806           1.362       3.464         4/13
//     11   13   4       138     143.54      8.308        156       172.32    1.1046           1.500       3.464         4/13
//     11   13   5       156     161.54      4.971        168       178.76    1.0640           1.300       3.464         4/13
//     11   13   6       168     179.08      5.181        186       197.02    1.0593           1.336       3.464         2/13
//     11   13   7       180     194.77      7.298        204       220.05    1.0787           1.265       3.464         2/13
//     11   13   8       198     210.92      8.435        228       240.14    1.0533           2.025       3.464         2/13
//   ok    copy theorem max_a Delta_m = maxsum_m(T_13), m <= 8
//
//     13   17   1        90     102.71      6.470        108       128.58    1.1906           0.818       4.000        10/17
//     13   17   2       120     137.29      9.404        150       174.91    1.1661           1.351       4.000         4/17
//     13   17   3       156     163.06      5.139        168       183.61    1.0929           0.962       4.000         8/17
//     13   17   4       174     183.88      6.807        198       211.11    1.0662           2.074       4.000         2/17
//     13   17   5       180     200.47      7.716        210       231.34    1.1016           1.235       4.000         4/17
//     13   17   6       210     219.88     10.278        240       260.99    1.0875           1.957       4.000         2/17
//     13   17   7       228     244.24      8.915        258       279.89    1.0849           1.544       4.000         2/17
//     13   17   8       258     277.76     11.599        288       324.16    1.1256           0.882       4.000         6/17
//   ok    copy theorem max_a Delta_m = maxsum_m(T_17), m <= 8
//
//     17   19   1       138     144.95      5.925        150       170.08    1.1339           0.853       4.243        11/19
//     17   19   2       168     175.58      7.500        186       207.40    1.1150           1.390       4.243         4/19
//     17   19   3       192     201.16      5.958        210       226.44    1.0783           1.484       4.243         5/19
//     17   19   4       210     222.00      6.156        228       248.12    1.0882           0.975       4.243         8/19
//     17   19   5       240     252.00     12.913        282       306.78    1.0879           2.323       4.243         2/19
//     17   19   6       282     287.68      5.667        300       311.73    1.0391           2.173       4.243         4/19
//     17   19   7       300     330.95     14.073        348       390.65    1.1226           1.212       4.243         6/19
//     17   19   8       348     365.05      7.352        378       396.24    1.0483           1.761       4.243         6/19
//   ok    copy theorem max_a Delta_m = maxsum_m(T_19), m <= 8
//
//     19   23   1       180     189.91      7.424        204       224.74    1.1017           1.897       4.690         3/23
//     19   23   2       210     217.83      5.983        234       245.89    1.0508           2.703       4.690         1/23
//     19   23   3       240     259.57     19.237        300       349.80    1.1660           2.102       4.690         2/23
//     19   23   4       300     323.74     16.453        348       400.91    1.1520           1.475       4.690         4/23
//     19   23   5       348     370.43     14.720        390       439.48    1.1269           1.329       4.690         6/23
//     19   23   6       384     402.52     21.950        462       505.48    1.0941           2.710       4.690         2/23
//     19   23   7       408     434.35     27.792        498       564.70    1.1339           2.290       4.690         2/23
//     19   23   8       450     476.61     22.015        528       579.87    1.0982           2.334       4.690         2/23
//   ok    copy theorem max_a Delta_m = maxsum_m(T_23), m <= 8
//
//     23   29   1       222     234.00      8.338        258       278.12    1.0780           2.878       5.292         2/29
//     23   29   2       288     304.97     15.683        330       387.95    1.1756           1.596       5.292         6/29
//     23   29   3       348     361.24     15.865        390       445.19    1.1415           1.813       5.292         4/29
//     23   29   4       390     398.69     10.521        420       454.36    1.0818           2.025       5.292         4/29
//     23   29   5       420     454.97     29.774        510       612.52    1.2010           1.848       5.292         4/29
//     23   29   6       462     502.55     24.240        540       630.82    1.1682           1.545       5.292         4/29
//     23   29   7       504     535.45     13.151        552       605.03    1.0961           1.259       5.292         8/29
//     23   29   8       540     563.79     15.235        582       644.41    1.1072           1.195       5.292         8/29
//
//   Chebyshev over the p ALIGNMENTS: an almost-all-alignments bound survives the max
//   iff the exceptional fraction is < 1/p.  Chebyshev gives frac <= sd^2/(max-mean)^2.
//        x    p   m   sd^2/(max-mean)^2    1/p     survives max?   Sam/max
//       7   11   1            0.3469   0.0909              NO    1.1568
//       7   11   2            1.0416   0.0909              NO    1.3497
//       7   11   3            0.4609   0.0909              NO    1.2085
//      11   13   1           12.0000   0.0769              NO    1.2308
//      11   13   2            2.3704   0.0769              NO    1.1875
//      11   13   3            0.5388   0.0769              NO    1.1806
//      13   17   1            1.4933   0.0588              NO    1.1906
//      13   17   2            0.5478   0.0588              NO    1.1661
//      13   17   3            1.0816   0.0588              NO    1.0929
//      17   19   1            1.3750   0.0526              NO    1.1339
//      17   19   2            0.5179   0.0526              NO    1.1150
//      17   19   3            0.4541   0.0526              NO    1.0783
//      19   23   1            0.2778   0.0435              NO    1.1017
//      19   23   2            0.1368   0.0435              NO    1.0508
//      19   23   3            0.2263   0.0435              NO    1.1660
//      23   29   1            0.1207   0.0345              NO    1.0780
//      23   29   2            0.3925   0.0345              NO    1.1756
//      23   29   3            0.3043   0.0345              NO    1.1415
//
// ==============================================================================
// 3. R2-POSITIONS -- Chebyshev at threshold m, exact tile variance and Lemma V's B
// ==============================================================================
//   Exact second moment of the window count N(t) = #{slots in [t,t+H)} over t in Z/W.
//   Bad set = { t : N(t) < m }.  maxsum_m <= H IS "the bad set is EMPTY", so a
//   Chebyshev bound on its MEASURE has to be pushed below 1/W, not below any constant.
//        x       W        D    H=A*m*mbar  m    mean    Var    Fano   Cheb frac    TRUE frac    1/W       Cheb/(1/W)
//       7       210       15         28    1   2.000   0.533  0.267     0.13333      0.01905    4.76e-3      2.80e+1
//       7       210       15        112    4   8.000   2.000  0.250     0.08000      0.00000    4.76e-3      1.68e+1
//      11      2310      135         34    1   1.987   0.695  0.350     0.17605      0.01732    4.33e-4      4.07e+2
//      11      2310      135        137    4   8.006   1.684  0.210     0.06717      0.00000    4.33e-4      1.55e+2
//      13     30030     1485         40    1   1.978   0.797  0.403     0.20363      0.02930    3.33e-5      6.12e+3
//      13     30030     1485        162    4   8.011   1.481  0.185     0.05898      0.00000    3.33e-5      1.77e+3
//      17    510510    22275         46    1   2.007   0.911  0.454     0.22606      0.03905    1.96e-6      1.15e+5
//      17    510510    22275        183    4   7.985   1.547  0.194     0.06224      0.00019    1.96e-6      3.18e+4
//      19   9699690   378675         51    1   1.991   0.997  0.501     0.25140      0.05199    1.03e-7      2.44e+6
//      19   9699690   378675        205    4   8.003   1.716  0.214     0.06857      0.00017    1.03e-7      6.65e+5
//
//   LEMMA V's MEAN SQUARE, at threshold m.  <R^2>_H <= B(z,s)*H unconditionally
//   (B <= 9A^2(E-1) = O((log z)^8), history/staging/attack-AB-bounded.md, PROVED).
//   Certificate count T_H(x) = H*M + R_H(x), so T_H < m only when R_H < m - H*M, and
//       frac{ x : T_H(x) < m }  <=  B*H / (H*M - m)^2.
//   With H = A*m/M the deficit is m(A-1) and the fraction is  A*B / (M*m*(A-1)^2).
//   ALL positions needs that below 1/W, i.e.  m  >  A*B*W / (M*(A-1)^2).  Compare D:
//        z     B(z,3.0)         W          M          D      m needed for ALL positions   m/D
//      13     1.383263    2.310e+3   0.058442   1.350e+2                   1.094e+5    8.10e+2
//      19     1.434774    5.105e+5   0.043633   2.228e+4                   3.357e+7    1.51e+3
//      29     1.465995    2.231e+8   0.035645   7.952e+6                  1.835e+10    2.31e+3
//      37     1.488330   2.006e+11   0.031046   6.227e+9                  1.923e+13    3.09e+3
//      41     1.496346   7.421e+12   0.029368  2.179e+11                  7.562e+14    3.47e+3
//
// ==============================================================================
// 4. R1 -- THE CERTIFICATE AT THRESHOLD m (driving research/theta-ladder-sup.js)
// ==============================================================================
//   minT_H is the certified all-positions MINIMUM of the vector-sieve count over the
//   FULL period.  minT_H >= m  is exactly  maxsum_m(T_{z-}) <= H, where z- is the
//   largest prime BELOW z (the script sieves by primes < z).  Windows are scanned on
//   a stride-6 grid because every gap is a multiple of 6; the reported H is the least
//   scanned window with minT >= m at it and at every larger scanned window, so it is
//   the true threshold rounded UP to the grid (stride 6, 12 at z=23, 48 at z=29).
//       z   tile     m   maxsum_m(true)   H_cert   H_cert/true   H_cert-true   walks
//      13   T_11     1               42       60        1.4286            18      42
//      13   T_11     2               66       72        1.0909             6      42
//      13   T_11     3               96      108        1.1250            12      42
//      13   T_11     4              108      126        1.1667            18      42
//      13   T_11     5              138      150        1.0870            12      42
//      13   T_11     6              156      162        1.0385             6      42
//      13   T_11     7              168      174        1.0357             6      42
//      13   T_11     8              180      180        1.0000             0      42
//
//      17   T_13     1               66      126        1.9091            60      50
//      17   T_13     2               96      138        1.4375            42      50
//      17   T_13     3              138      156        1.1304            18      50
//      17   T_13     4              156      180        1.1538            24      50
//      17   T_13     5              168      198        1.1786            30      50
//      17   T_13     6              186      210        1.1290            24      50
//      17   T_13     7              204      234        1.1471            30      50
//      17   T_13     8              228      270        1.1842            42      50
//
//      19   T_17     1              108      198        1.8333            90      59
//      19   T_17     2              150      228        1.5200            78      59
//      19   T_17     3              168      270        1.6071           102      59
//      19   T_17     4              198      300        1.5152           102      59
//      19   T_17     5              210      360        1.7143           150      59
//      19   T_17     6              240      372        1.5500           132      59
//      19   T_17     7              258      390        1.5116           132      59
//      19   T_17     8              288      414        1.4375           126      59
//
//      23   T_19     1              150      258        1.7200           108      38
//      23   T_19     2              186      282        1.5161            96      38
//      23   T_19     3              210      306        1.4571            96      38
//      23   T_19     4              228      366        1.6053           138      38
//      23   T_19     5              282      390        1.3830           108      38
//      23   T_19     6              300      414        1.3800           114      38
//      23   T_19     7              348      438        1.2586            90      38
//      23   T_19     8              378      486        1.2857           108      38
//
//      29   T_23     1              204      396        1.9412           192      14
//      29   T_23     2              234      444        1.8974           210      14
//      29   T_23     3              300      492        1.6400           192      14
//      29   T_23     4              348      540        1.5517           192      14
//      29   T_23     5              390      588        1.5077           198      14
//      29   T_23     6              462      636        1.3766           174      14
//      29   T_23     7              498      636        1.2771           138      14
//      29   T_23     8              528      636        1.2045           108      14
//
// ==============================================================================
// 5. R1 PRICED ASYMPTOTICALLY: where the threshold-m certificate turns linear
// ==============================================================================
//   The unconditional two-class sieve certifies N(t) >> H*V for every t once
//   H >= z^(beta2+eps), beta2 = 4.26645028414864191641 (DHR, SEARCH-CONVENTIONS 4).
//   So the threshold-m certificate sits at H ~ z^beta2 for every m up to
//       m* = z^beta2 * V   (V = prod_{p<=z}(1-2/p) = 1/mbar),
//   and only above m* does it become the linear-in-m bound maxsum_m << m*mbar.
//   The L-bridge needs maxsum_k < 3pk from k ~ 0.19 x/ln x upward.  Compare:
//         x         mbar           V          m* = z^b2 * V     m needed 0.19x/lnx     m*/m needed
//          23       28.054     3.565e-2             2.300e+4                  1.394         1.65e+4
//          29       30.132     3.319e-2             5.757e+4                  1.636         3.52e+4
//         101       53.278     1.877e-2             6.680e+6                  4.158         1.61e+6
//        1009      115.752     8.639e-3            5.655e+10                 27.717         2.04e+9
//       10007      204.355     4.893e-3            5.711e+14                206.419        2.77e+12
//      100003      318.659     3.138e-3            6.745e+18               1650.364        4.09e+15
//     1000000      458.617     2.180e-3            8.655e+22              13752.659        6.29e+18
//
// SELF-TESTS: ALL PASS   elapsed 269.9s
// ───── stderr ─────
//   z=13: 42 walks done [68.9s]
//   z=17: 50 walks done [73.9s]
//   z=19: 59 walks done [81.5s]
//   z=23: 38 walks done [115.7s]
//   z=29: 14 walks done [269.9s]
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE OBJECT IS A WINDOW-COUNT STATEMENT, EXACTLY. Both directions of
//    "min_t N([t,t+H)) >= m  <=>  H >= maxsum_m" hold at T_3, T_5, T_7 and T_11,
//    tested at H = maxsum_m - 1 and H = maxsum_m for every m <= 6 over all W
//    positions (W = 6, 30, 210, 2310). So a bound "maxsum_m <= H" is an
//    ALL-POSITIONS window-count lower bound at threshold m, with no slack in the
//    translation. [PROVEN, and VERIFIED here at four tiles]
//
// 2. THE KILL-GAP FLOOR IS EXACT -- AND research/kappa-not-L.md ALREADY PROVED
//    IT, AT 302 PRIMES TO 1999 RATHER THAN THIS RUN'S TWELVE. Recorded as an
//    independent second route, not as a new result; its qualifying-gap law is
//    the table below verbatim, and its Theorem A is the pair floor 6p. Twin
//    slots are == 5 (mod 6), so a kill-gap must satisfy 6 | d AND d == 0 or +-2
//    (mod p). The CRT table reads: same-class step exactly 6p at all 12 primes
//    5..43; the two cross steps 2p-2 and 4p+2 (p == 1 mod 6) or 4p-2 and 2p+2
//    (p == 5 mod 6); minimum single gap 12, 24, 36, 48, 60, 72, 84 at
//    p = 7, 13, 19, 23, 29, 37, 41; and minimum PAIR exactly 6p at every p. So
//    the single-gap floor is 2p-2 but the long-run rate is 3p, and the exact
//    statement is span >= 3pk - p - 2, which is never violated at any of the
//    seven folds for any k <= 24.
//
// 3. THE BRIDGE FROM maxsum TO L HAS AN UNCONDITIONAL FLOOR (a3-05-bound-L.md
//    sec 7, kappa-not-L.md "The wall, located precisely"; kappa(m) inherits it
//    via Theorem C), AND THE NEW PART IS THAT IT IS ABOVE WHAT THE u-FRAME NEEDS
//    AT EVERY EXACT LEVEL. Because maxsum_k >= maxsum_1
//    = G2(T_x) for every k, the bridge's own output is >= 1 + floor((G2+p+2)/(3p))
//    whatever upper bound on maxsum is supplied. That floor reads
//    2, 3, 3, 4, 4, 4, 6, 8 at x = 11, 13, 17, 19, 23, 29, 37, 79 against the
//    u-frame's 0.31p/ln p = 1.42, 1.57, 1.86, 2.00, 2.27, 2.67, 3.18, 5.60.
//    floor/need runs 1.406, 1.909, 1.613, 2.000, 1.759, 1.498, 1.889, 1.427 --
//    ABOVE 1 at all eight exact levels, and with NO trend across them. On the
//    0.55*theta(x)^2 model it rises to 2.211, 3.737, 5.339, 8.146 at
//    x = 101, 1009, 10007, 10^6. Read the exact column as the finding and the
//    model column as a model: what is PROVEN is failure at every level we can
//    compute, and what the model adds is only the direction.
//
// 4. THE SELF-CONSISTENT MERGE INEQUALITY CLOSES, AND THEN BUSTS THE BUDGET.
//    S <= maxsum_{m+1+floor((S+p+2)/(3p))}(T_x) has a genuine least fixed point at
//    every cell tested -- index 4 to 13, no runaway -- so the recursion is
//    well-posed and kill-count-free. Its cost is 1.3077 to 2.0909 times the truth,
//    i.e. 0.2683 to 0.7376 nats per fold, against a per-fold replenishment
//    2 ln(p/x) of 0.2225 to 0.9040 nats. At the m = 1 rows the burn exceeds the
//    replenishment at three of the five folds (0.7376 vs 0.3341, 0.4700 vs
//    0.2225, 0.3857 vs 0.3821), and the LIFETIME Overshoot Budget is 0.88 to 1.19
//    nats in total. So the closure is real and the chain is dead inside ~20 folds.
//
// 5. THE CERTIFICATE IS SOUND AT EVERY CELL. H_cert >= maxsum_m at all 40 (z, m)
//    cells -- the H_cert/true column is >= 1.0000 everywhere, with 1.0000 exactly
//    once (z = 13, m = 8, both 180). A single cell below 1 would have falsified
//    the pointwise minorant; none is.
//
// 6. THE THRESHOLD-m CERTIFICATE AMORTISES, AND THAT IS THE ONE POSITIVE RESULT.
//    The OVERHEAD H_cert - maxsum_m is roughly flat in m while maxsum_m grows:
//    at z = 29 it reads 192, 210, 192, 192, 198, 174, 138, 108 for m = 1..8, and
//    at z = 23 it reads 108, 96, 96, 138, 108, 114, 90, 108. The multiplicative
//    overshoot therefore falls: 1.9412 -> 1.2045 at z = 29, 1.7200 -> 1.2857 at
//    z = 23, 1.9091 -> 1.1842 at z = 17, 1.4286 -> 1.0000 at z = 13. The m = 1
//    certificate is the expensive one; every higher threshold is nearly free.
//    (Grid caveat: the stride is 6, 6, 6, 12, 48 at z = 13, 17, 19, 23, 29, so
//    H_cert is the true threshold rounded UP, and the rounding is relatively
//    larger at LARGE m, which understates the fall rather than manufacturing it.)
//
// 7. SAMUELSON IS THE ONLY SURVIVING ALIGNMENT INSTRUMENT, AND IT IS LOOSE BY
//    4 TO 35 PERCENT. mean_a + sd_a*sqrt(p-1) over max_a reads 1.0391 to 1.3497
//    across the 48 (fold, m) cells, best at (17->19, m = 6) and worst at
//    (7->11, m = 2). It is never near-tight: (max-mean)/sd runs 0.289 to 2.878
//    against sqrt(p-1) = 3.162 to 5.292, so the extremal one-outlier
//    configuration never occurs.
//
// 8. AND CHEBYSHEV OVER THE ALIGNMENTS CANNOT WORK, TAUTOLOGICALLY. Samuelson
//    says max - mean <= sd*sqrt(p-1) for ANY list of p numbers, so the Chebyshev
//    exceptional fraction sd^2/(max-mean)^2 is >= 1/(p-1) > 1/p ALWAYS. The
//    "survives max?" column is therefore NO at all 18 cells by necessity, not by
//    accident: measured 0.1207 to 12.0000 against 1/p = 0.0345 to 0.0909. An
//    almost-all-over-alignments bound can never be upgraded by a union bound over
//    the p 2-sets. [PROVEN, one line]
//
// 9. AND CHEBYSHEV OVER THE POSITIONS CANNOT WORK EITHER, QUANTITATIVELY. The
//    tile is under-dispersed (Fano 0.185 to 0.501, rising with x), and Chebyshev
//    over-states the true bad fraction by about 5x at m = 1 (0.25140 against
//    0.05199 at T_19). That is not the problem. The problem is that maxsum_m <= H
//    demands the bad set be EMPTY, i.e. the fraction be below 1/W, and
//    Cheb/(1/W) reads 2.80e+1, 4.07e+2, 6.12e+3, 1.15e+5, 2.44e+6 at
//    x = 7, 11, 13, 17, 19 -- a factor of ~20 lost per fold, forever.
//
// 10. LEMMA V AT THRESHOLD m IS VACUOUS BY THREE ORDERS AND WIDENING. With the
//    PROVED mean square <R^2>_H <= B*H, the threshold m at which the exceptional
//    fraction drops below 1/W is 1.094e+5, 3.357e+7, 1.835e+10, 1.923e+13,
//    7.562e+14 at z = 13, 19, 29, 37, 41 -- which is 8.10e+2, 1.51e+3, 2.31e+3,
//    3.09e+3, 3.47e+3 times the total number of slots D. A threshold above D is
//    not a statement about the tile at all, and the ratio rises at every level.
//
// 11. R1's CROSSOVER IS IN THE WRONG PLACE BY A GROWING POWER. The threshold-m
//    certificate stays at H ~ z^beta2 until m* = z^beta2 * V, which reads
//    2.300e+4, 5.757e+4, 6.680e+6, 5.655e+10, 5.711e+14, 6.745e+18, 8.655e+22 at
//    x = 23, 29, 101, 1009, 10007, 100003, 10^6, against the L-bridge's needed
//    0.19x/ln x of 1.394 to 13752.659. The ratio m*/m_needed runs 1.65e+4 to
//    6.29e+18 -- growth x^(beta2-1)*ln x, i.e. the 4.2665-against-2 wall, in
//    threshold coordinates.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints: 4.2665 is beta_2, printed
// in full as "beta2 = 4.26645028414864191641 (DHR, SEARCH-CONVENTIONS 4)".
//
// BORROWED, verified present in the named producer: the 302 primes to 1999 are
// research/kappa-not-L.md's brute-force check, which reads "Checked against
// brute force at all 302 primes from 5 to 1999" at that file's line 27. This
// run covers twelve primes, 5 to 43, which is the contrast the reading draws.
// ---------------------------------------------------------------------------
