#!/usr/bin/env node
// ============================================================================
// ATTACK beta2-05 — THE COVERING PRUNE: what A144311's branch-and-bound proves,
// and the exact point at which the same inequality stops proving anything
// ============================================================================
// THE OBJECT. `two-class-lower-bounds.md` section 1 (PROVEN, elementary, CRT):
// G2(x#) - 1 is the maximum length of an interval coverable by choosing, for
// each prime p <= x, one class pair {a_p, a_p - 2}, with a_p FREE. OEIS A144311
// tabulates exactly this, 22 terms to x = 79, produced by the branch-and-bound
// program a144311.cpp (Andrew Carter). Exhaustive enumeration at x = 79 is
// 2.8e10 years, so every term above x = 43 rests on that program's PRUNING TEST
// being admissible. This script states the test as a theorem, checks it, and
// then tries to run it backwards into an upper bound on G2.
//
// THE PRUNING TEST, lifted from the source. In slot coordinates j (a twin slot
// is 6j+5; prime p kills j when j = r or j = r - s_p mod p, with s_p = 3^{-1}
// mod p, the program's `pskip`, since 6*pskip = 2 mod p), the search keeps
//   v[q][r] = # of still-uncovered j in [1,L] lying in C^q_r = {r, r - s_q},
//   s      = sum over not-yet-chosen q of max_r v[q][r],
// and prunes the branch unless s >= (number of still-uncovered j).
//
// THEOREM P (the pruning inequality). Let U be a finite set and Q a set of
// primes, each q in Q carrying legal candidate sets C^q_r, r in R_q. If some
// choice (r_q) has U contained in the union of the C^q_{r_q}, then
//        |U| <= sum_{q in Q} max_{r in R_q} |U ∩ C^q_r|.
// PROOF. |U| = |union of (U ∩ C^q_{r_q})| <= sum |U ∩ C^q_{r_q}| <= sum max_r.
// Sub-additivity of a union, then term-by-term maximisation. QED
// MONOTONE. U' contained in U implies max_r |U' ∩ C^q_r| <= max_r |U ∩ C^q_r|,
// so evaluating the right side at the CURRENT residual is valid for every
// deeper state of the search. Hence the contrapositive (s < |U| => prune) never
// discards a completion that would have covered. The test is ADMISSIBLE.
//
// The search is therefore exact, and one detail makes it so: at the last prime
// the sum s is empty, so the test reads 0 >= |U|, i.e. the leaf is reached only
// on a COMPLETE cover. The leaf never has to re-check coverage, and it does not.
//
// WHAT THIS SCRIPT MEASURES.
// (A) faithful port of a144311.cpp; reproduces the published terms.
// (B) exhaustive enumeration at the levels where it is affordable: the pruned
//     optimum equals the brute-force optimum, so the prune loses nothing there.
// (C) Theorem P checked directly at every prefix of every covering assignment.
// (D) THE ATTACK. Theorem P with U = [1,L] and Q = all primes 5..x is the only
//     phase-free, sieve-free upper-bound mechanism the covering formulation
//     owns. Swept, never bisected. Two facts have to be kept apart here and
//     `attack-block-00-ADJUDICATION.md` merged them: the CRITERION is not
//     monotone in L (it dies, revives, dies again), but COVERABILITY is
//     downward closed, because restricting a cover of [1,L'] to [1,L] is a
//     cover. So the FIRST dead L is the bound and every later live L is
//     irrelevant. Measured here: at x = 11 the criterion revives at 3 values
//     of L above the first dead one, and the first-dead reading is the one
//     that is true.
// (E) the cheapest repair: Bonferroni truncation of the same count = Brun's
//     pure sieve, evaluated exactly, and the exponent it yields.
// (F) the price of the sieve error term: the main term alone is FALSE from
//     x = 13 on, so the error term is not a correction but the whole problem.
// (G) the residual deficit realised by the optimal adversary, which is the
//     error term made concrete.
//
// USAGE:  node research/attack-beta2-05-covering-prune.js          (~3 s, n <= 13)
//         node research/attack-beta2-05-covering-prune.js --full   (~22 s, n <= 15)
// ============================================================================

'use strict';

const FULL = process.argv.includes('--full');

// ---------------------------------------------------------------------------
// primes and modular inverse
// ---------------------------------------------------------------------------
function primesUpTo(n) {
  const s = new Uint8Array(n + 1);
  const out = [];
  for (let i = 2; i <= n; i++) {
    if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  }
  return out;
}
function modinv(a, p) { let r = 1; for (let e = p - 2; e > 0; e--) r = (r * a) % p; return r; }

const ALLP = primesUpTo(2000000);            // 148933 primes; enough for (E)
const PR = ALLP.filter(p => p >= 5);          // the primes the covering uses

// published, oeis.org/A144311 (22 terms, n = 1..22, x = 2..79)
const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
                 707, 869, 965, 1079, 1283, 1397, 1529, 1709];

// ---------------------------------------------------------------------------
// (A) faithful port of a144311.cpp.  `nP` = number of primes taken from 5 up,
// so nP = n - 2 in the OEIS indexing.  Returns the optimum in slot units.
// ---------------------------------------------------------------------------
function a144311Search(nP, budget) {
  const plist = PR.slice(0, nP);
  const pskip = plist.map(p => modinv(3, p));      // 6*pskip = 2 (mod p)
  const K = nP;
  let maxm = 1, nodes = 0, prunes = 0, leaves = 0, aborted = false;
  const remainders = new Array(K).fill(0);
  let bestRem = null, bestM = 0;

  const bump = (v, j, from, d) => {
    for (let q = from; q < K; q++) {
      v[q][j % plist[q]] += d;
      v[q][(j + pskip[q]) % plist[q]] += d;
    }
  };

  function dfs(arr, depth, num, v) {
    if (aborted) return;
    if (depth < K) {
      const p = plist[depth], skip = pskip[depth];
      for (let i = 1; i < p; i++) {
        if (i === skip) continue;
        if (++nodes > budget) { aborted = true; return; }
        const arr1 = arr.slice();
        const v1 = v.map(a => a.slice());
        let num1 = num;
        for (let j = i; j <= maxm; j += p)
          if (arr1[j] === 0) { arr1[j] = 1; num1--; bump(v1, j, depth + 1, -1); }
        let j0 = i - skip; if (j0 < 0) j0 += p;
        for (let j = j0; j <= maxm; j += p)
          if (arr1[j] === 0) { arr1[j] = 1; num1--; bump(v1, j, depth + 1, -1); }
        let s = 0;
        for (let q = depth + 1; q < K; q++) {
          let si = v1[q][1];
          for (let r = 2; r < plist[q]; r++) if (v1[q][r] > si) si = v1[q][r];
          s += si;
        }
        if (s >= num1) {
          remainders[depth] = i;
          dfs(arr1, depth + 1, num1, v1);
          if (aborted) return;
          for (let j = arr.length; j <= maxm; j++) {          // maxm may have grown
            arr.push(0);
            for (let q = 0; q < depth; q++)
              if (j % plist[q] === remainders[q] || (j + pskip[q]) % plist[q] === remainders[q]) { arr[j] = 1; break; }
            if (arr[j] === 0) { num++; bump(v, j, depth + 1, +1); }
          }
        } else prunes++;
      }
    } else {
      leaves++;
      let flag = true;
      while (flag) {
        maxm++; flag = false;
        for (let q = 0; q < K; q++)
          if (maxm % plist[q] === remainders[q] || (maxm + pskip[q]) % plist[q] === remainders[q]) { flag = true; break; }
      }
      maxm--;
      if (maxm >= bestM) { bestM = maxm; bestRem = remainders.slice(); }
    }
  }

  const v0 = [];
  for (let q = 0; q < K; q++) {
    const p = plist[q], sk = pskip[q], row = new Int32Array(p);
    for (let r = 1; r < p; r++) {
      row[r] = Math.floor((maxm + p - r) / p) + Math.floor((maxm + p - r + sk) / p);
      if (r === sk) row[r] = 0; else if (r < sk) row[r]--;
    }
    v0.push(row);
  }
  dfs(new Array(maxm + 1).fill(0), 0, maxm, v0);
  return { m: maxm, nodes, prunes, leaves, aborted, plist, pskip, rem: bestRem };
}

// ---------------------------------------------------------------------------
// (B) brute force: every legal assignment, no pruning at all
// ---------------------------------------------------------------------------
function bruteForce(nP, cap) {
  const plist = PR.slice(0, nP), pskip = plist.map(p => modinv(3, p));
  const choice = plist.map((p, q) => {
    const c = []; for (let r = 1; r < p; r++) if (r !== pskip[q]) c.push(r); return c;
  });
  const cov = new Uint8Array(cap + 2);
  let best = 0, count = 0;
  const rec = (q) => {
    if (q === nP) {
      count++;
      let j = 1; while (j <= cap && cov[j]) j++;
      if (j - 1 > best) best = j - 1;
      return;
    }
    const p = plist[q], sk = pskip[q];
    for (const r of choice[q]) {
      const added = [];
      for (let j = r; j <= cap; j += p) if (!cov[j]) { cov[j] = 1; added.push(j); }
      let j0 = r - sk; if (j0 < 0) j0 += p;
      for (let j = j0; j <= cap; j += p) if (j >= 1 && !cov[j]) { cov[j] = 1; added.push(j); }
      rec(q + 1);
      for (const j of added) cov[j] = 0;
    }
  };
  rec(0);
  return { m: best, assignments: count };
}

// ---------------------------------------------------------------------------
// (C) Theorem P, checked directly.  For an assignment that covers [1,L], walk
// the prefixes and verify  |U_k| <= sum_{q>k} max_r |U_k ∩ C^q_r|  at every k.
// ---------------------------------------------------------------------------
function checkTheoremP(plist, pskip, rem, L) {
  const K = plist.length;
  const cov = new Uint8Array(L + 2);
  const rows = [];
  for (let k = 0; k <= K; k++) {
    if (k > 0) {
      const p = plist[k - 1], sk = pskip[k - 1], r = rem[k - 1];
      for (let j = r; j <= L; j += p) if (j >= 1) cov[j] = 1;
      let j0 = r - sk; if (j0 < 0) j0 += p;
      for (let j = j0; j <= L; j += p) if (j >= 1) cov[j] = 1;
    }
    let U = 0; for (let j = 1; j <= L; j++) if (!cov[j]) U++;
    let s = 0;
    for (let q = k; q < K; q++) {
      const p = plist[q], sk = pskip[q], cnt = new Int32Array(p);
      for (let j = 1; j <= L; j++) if (!cov[j]) cnt[j % p]++;
      let si = 0;
      for (let r = 1; r < p; r++) { if (r === sk) continue; const c = cnt[r] + cnt[(r - sk + p) % p]; if (c > si) si = c; }
      s += si;
    }
    rows.push({ k, U, s, ok: s >= U });
  }
  return rows;
}

// ---------------------------------------------------------------------------
// (D) THEOREM P AS AN UPPER BOUND.  cap_p(L) = max over LEGAL r of
// |[1,L] ∩ C^p_r| — the most a single prime can ever contribute. L is provably
// uncoverable when sum_p cap_p(L) < L.
// ---------------------------------------------------------------------------
function capSum(plist, pskip, L) {
  let s = 0;
  for (let q = 0; q < plist.length; q++) {
    const p = plist[q], sk = pskip[q];
    let best = 0;
    for (let r = 1; r < p; r++) {
      if (r === sk) continue;
      const r2 = (r - sk + p) % p;
      const c = (r <= L ? Math.floor((L - r) / p) + 1 : 0) + (r2 >= 1 && r2 <= L ? Math.floor((L - r2) / p) + 1 : 0);
      if (c > best) best = c;
    }
    s += best;
  }
  return s;
}

// ---------------------------------------------------------------------------
// (E) Brun's pure sieve on the same sets, exact.  With P = {5..x} and each
// A_p a union of 2 classes mod p, N_d = 2^w(d) L/d + theta, |theta| <= 2^w(d).
// Odd-order Bonferroni gives  S >= L*A_m - B_m  with
//   A_m = sum_{j<=m} (-1)^j e_j({2/p}),   B_m = sum_{j<=m} C(pi,j) 2^j.
// A survivor is forced as soon as L > B_m / A_m, for any odd m with A_m > 0.
// ---------------------------------------------------------------------------
function brunBound(plist) {
  const n = plist.length;
  const M = Math.min(n, 90);
  // e_j by the generating polynomial prod (1 + t*2/p)
  const e = new Float64Array(M + 2); e[0] = 1;
  for (const p of plist) {
    const w = 2 / p;
    for (let j = Math.min(M, n); j >= 1; j--) e[j] += w * e[j - 1];
  }
  // log C(n,j) 2^j, cumulative in log space
  const lg = (a) => Math.log(a);
  let logC = 0, best = null;
  const logB = [];
  let acc = -Infinity;
  for (let j = 0; j <= M; j++) {
    if (j > 0) logC += lg(n - j + 1) - lg(j);
    const t = logC + j * Math.LN2;
    acc = acc === -Infinity ? t : Math.max(acc, t) + Math.log1p(Math.exp(-Math.abs(acc - t)));
    logB.push(acc);
  }
  let A = 1, m0 = null;
  for (let m = 1; m <= M; m++) {
    A += (m % 2 ? -1 : 1) * e[m];
    if (m % 2 === 1 && A > 0) {
      if (m0 === null) m0 = m;
      const logL = logB[m] - Math.log(A);
      if (best === null || logL < best.logL) best = { m, A, logL };
    }
  }
  if (best) best.m0 = m0;
  return best;
}

// ---------------------------------------------------------------------------
// (F) the price of the error term.  The sieve's MAIN term on its own forbids
// covering anything longer than 1/prod_{5<=p<=x}(1-2/p) slots.  That is about
// 2.4 ln^2 x in integer units, against a truth of order x ln^2 x, so the main
// term is false by a factor of order x and EVERYTHING a proof buys here is the
// error term.  (G) shows the adversary realising exactly that error.
// ---------------------------------------------------------------------------
function mainTermOnly(x) {
  let d = 1; for (const p of PR) { if (p > x) break; d *= (1 - 2 / p); }
  return { dens: d, Lslot: 1 / d, Lint: 6 / d + 5 };
}

// ===========================================================================
console.log('=== (A) faithful port of a144311.cpp, against the published terms ===');
console.log('n | x  | search m | 6m+5 | A144311(n) | match | nodes | prunes | leaves | ms');
const searches = {};
const topN = FULL ? 15 : 13;
for (let n = 3; n <= topN; n++) {
  const t0 = Date.now();
  const r = a144311Search(n - 2, 4e8);
  searches[n] = r;
  const val = 6 * r.m + 5;
  console.log(`${n} | ${PR[n - 3]} | ${r.m} | ${val} | ${A144311[n - 1]} | ${val === A144311[n - 1] ? 'YES' : 'NO'} | ` +
              // the unit, so the wall clock in this column is scrubbed out of the
              // tail's out-sha256 like every other elapsed time in the corpus.
              // A bare integer was not, which is why this file could never go
              // green under `embed.js --check` on a second machine (2026-08-20).
              `${r.nodes} | ${r.prunes} | ${r.leaves} | ${Date.now() - t0} ms`);
}

console.log('\n=== (B) exhaustive enumeration: does the prune ever lose the optimum? ===');
console.log('n | x  | pruned m | brute m | assignments enumerated | equal');
for (let n = 3; n <= 9; n++) {
  const b = bruteForce(n - 2, 240);
  console.log(`${n} | ${PR[n - 3]} | ${searches[n].m} | ${b.m} | ${b.assignments} | ${b.m === searches[n].m ? 'YES' : 'NO'}`);
}

console.log('\n=== (C) Theorem P at every prefix of the optimal assignment ===');
console.log('n | x  | L | prefixes checked | violations | s/|U| at k=0,1,2 | slack at the last prime');
for (let n = 3; n <= topN; n++) {
  const r = searches[n];
  if (!r.rem) { console.log(`${n} | ${PR[n - 3]} | (no certificate recorded)`); continue; }
  const rows = checkTheoremP(r.plist, r.pskip, r.rem, r.m);
  const bad = rows.filter(z => !z.ok).length;
  const rat = rows.slice(0, 3).map(z => (z.U ? (z.s / z.U).toFixed(2) : '-')).join(', ');
  const last = rows[rows.length - 2];
  console.log(`${n} | ${PR[n - 3]} | ${r.m} | ${rows.length} | ${bad} | ${rat} | ${last.s} vs ${last.U}`);
}

console.log('\n=== (D) THE ATTACK: Theorem P as a phase-free upper bound on L ===');
console.log('Coverability of [1,L] is DOWNWARD CLOSED (restrict a cover of [1,L\'] to [1,L]),');
console.log('so the FIRST dead L is the bound and later live L are irrelevant.');
console.log('x | sum 2/p (5..x) | first dead L | bound 6(L-1)+5 | truth | ratio | live L above first dead | last dead L <= 40000');
for (const x of [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41]) {
  const plist = PR.filter(p => p <= x), pskip = plist.map(p => modinv(3, p));
  let dens = 0; for (const p of plist) dens += 2 / p;
  let firstDead = 0, lastDead = 0, liveAbove = 0;
  const SWEEP = 40000;
  for (let L = 1; L <= SWEEP; L++) {
    const dead = capSum(plist, pskip, L) < L;
    if (dead) { if (!firstDead) firstDead = L; lastDead = L; }
    else if (firstDead) liveAbove++;
  }
  const n = ALLP.indexOf(x) + 1, truth = A144311[n - 1];
  const bnd = firstDead ? 6 * (firstDead - 1) + 5 : null;
  console.log(`${x} | ${dens.toFixed(4)} | ${firstDead || 'none'} | ${bnd === null ? 'INFINITE' : bnd} | ${truth} | ` +
              `${bnd === null ? '-' : (bnd / truth).toFixed(2)} | ${firstDead ? liveAbove : '-'} | ${lastDead || '-'}`);
}

console.log('\n=== (E) Brun pure sieve on the same sets: the cheapest admissible repair ===');
console.log('x | pi(x)-2 | W=sum 2/p | first odd m with A_m>0 | best m | m/W | A_m | log10 L_bound | beta_pure = ln(6L+5)/ln x | beta_pure/W | vs 4.2665');
const XS = [13, 31, 101, 199, 211, 251, 307, 401, 1009, 10007, 100003, 1000003];
for (const x of XS) {
  const plist = PR.filter(p => p <= x);
  const b = brunBound(plist);
  if (!b) { console.log(`${x} | ${plist.length} | none`); continue; }
  let W = 0; for (const p of plist) W += 2 / p;
  const expo = (b.logL + Math.log(6)) / Math.log(x);
  console.log(`${x} | ${plist.length} | ${W.toFixed(3)} | ${b.m0} | ${b.m} | ${(b.m / W).toFixed(2)} | ${b.A.toExponential(3)} | ` +
              `${(b.logL / Math.LN10).toFixed(1)} | ${expo.toFixed(2)} | ${(expo / W).toFixed(2)} | ${expo < 4.2665 ? 'BETTER' : 'worse'}`);
}

console.log('\n(E2) the truncation threshold in the idealised Poisson model, exactly (BigInt).');
console.log('sum_{j<=m}(-1)^j W^j/j! > 0 iff T_m > 0 with T_m = m*T_{m-1} + (-1)^m W^m, T_0 = 1.');
// the threshold constant is the root of a*ln(a/e) = 1, i.e. a*(ln a - 1) = 1.
// It is COMPUTED here rather than quoted: bisection on [2, 8], where the left
// side is strictly increasing, to machine precision. Before 2026-08-29 this
// header quoted a = 3.594, which is not the root of its own equation.
const aRoot = (() => {
  const g = a => a * (Math.log(a) - 1) - 1;
  let lo = 2, hi = 8;
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (g(m) > 0) hi = m; else lo = m; }
  return (lo + hi) / 2;
})();
console.log('W | first odd m with T_m > 0 | m/W   (asymptotic: a*ln(a/e) = 1, a = ' +
            aRoot.toFixed(10) + ', 2a = ' + (2 * aRoot).toFixed(4) +
            '; the superseded 3.594 returns ' + (3.594 * (Math.log(3.594) - 1)).toFixed(5) + ')');
for (const W of [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]) {
  const Wb = BigInt(W); let T = 1n, Wp = 1n, hit = null;
  for (let m = 1; m <= 6000; m++) {
    Wp *= Wb;
    T = BigInt(m) * T + (m % 2 ? -Wp : Wp);
    if (m % 2 === 1 && T > 0n) { hit = m; break; }
  }
  console.log(`${W} | ${hit} | ${(hit / W).toFixed(2)}`);
}

console.log('\n(E3) sweep: the largest x at which beta_pure still beats the proven 4.2665');
{
  let lastBetter = null, firstWorse = null;
  for (const x of ALLP) {
    if (x < 13) continue;
    if (x > 5000) break;
    const b = brunBound(PR.filter(p => p <= x));
    if (!b) continue;
    const expo = (b.logL + Math.log(6)) / Math.log(x);
    if (expo < 4.2665) lastBetter = { x, expo };
    else if (firstWorse === null) firstWorse = { x, expo };
  }
  console.log(`largest x with beta_pure < 4.2665: x = ${lastBetter.x} (beta_pure = ${lastBetter.expo.toFixed(3)})`);
  console.log(`first x with beta_pure >= 4.2665: x = ${firstWorse.x} (beta_pure = ${firstWorse.expo.toFixed(3)})`);
}

console.log('\n=== (F) what the error term costs: main term, truth, and the certificate ===');
console.log('x | main-term-only "bound" (integers) | truth or 1.2 x ln^2 x | truth/main | Brun certificate | log(cert/truth)/log x');
for (const x of [13, 31, 41, 79, 101, 1009, 10007, 100003]) {
  const mt = mainTermOnly(x);
  const n = ALLP.indexOf(x) + 1;
  const exact = n >= 1 && n <= 22;
  const truth = exact ? A144311[n - 1] : 1.2 * x * Math.log(x) ** 2;
  const b = brunBound(PR.filter(p => p <= x));
  const cert = Math.exp(b.logL) * 6 + 5;
  console.log(`${x} | ${mt.Lint.toFixed(1)} | ${truth.toExponential(3)}${exact ? ' (exact)' : ' (law)'} | ${(truth / mt.Lint).toFixed(1)} | ` +
              `${cert.toExponential(3)} | ${((Math.log(cert) - Math.log(truth)) / Math.log(x)).toFixed(2)}`);
}

console.log('\n=== (G) the residual deficit the optimal adversary actually realises ===');
console.log('n | x  | L | k | |U_k| | density prediction L*prod(1-2/p) | deficit | ratio');
for (const n of [10, 11, topN]) {
  const r = searches[n];
  if (!r.rem) continue;
  const rows = checkTheoremP(r.plist, r.pskip, r.rem, r.m);
  let dens = 1;
  for (let k = 0; k < rows.length; k++) {
    if (k > 0) dens *= (1 - 2 / r.plist[k - 1]);
    const pred = r.m * dens;
    if (k === 0 || k === Math.floor(rows.length / 2) || k === rows.length - 1)
      console.log(`${n} | ${PR[n - 3]} | ${r.m} | ${k} | ${rows[k].U} | ${pred.toFixed(2)} | ${(pred - rows[k].U).toFixed(2)} | ${(rows[k].U / pred).toFixed(3)}`);
  }
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-beta2-05-covering-prune.js -- --full
//   invocation:  node research/attack-beta2-05-covering-prune.js --full
//   code-sha256: 28149f5a488dc0fd3dc6fa78911ceac808f696a2ac7e5b3bcfb29927177b9ec8
//   out-sha256:  fbaf77b874d73cb17399c2be15f00a409c2f97f37199075442534e297a545154
//   body-lines:  114
//   forced:      2026-08-29, 0 of 236 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     23.4 s
// ============================================================================
// === (A) faithful port of a144311.cpp, against the published terms ===
// n | x  | search m | 6m+5 | A144311(n) | match | nodes | prunes | leaves | ms
// 3 | 5 | 1 | 11 | 11 | YES | 3 | 1 | 2 | 0 ms
// 4 | 7 | 4 | 29 | 29 | YES | 18 | 11 | 4 | 0 ms
// 5 | 11 | 6 | 41 | 41 | YES | 54 | 38 | 9 | 0 ms
// 6 | 13 | 10 | 65 | 65 | YES | 339 | 264 | 41 | 0 ms
// 7 | 17 | 17 | 107 | 107 | YES | 602 | 512 | 43 | 1 ms
// 8 | 19 | 24 | 149 | 149 | YES | 1245 | 1132 | 23 | 1 ms
// 9 | 23 | 33 | 203 | 203 | YES | 2125 | 1951 | 18 | 4 ms
// 10 | 29 | 42 | 257 | 257 | YES | 9727 | 9056 | 67 | 23 ms
// 11 | 31 | 57 | 347 | 347 | YES | 31677 | 29856 | 97 | 47 ms
// 12 | 37 | 87 | 527 | 527 | YES | 47048 | 44626 | 193 | 63 ms
// 13 | 41 | 90 | 545 | 545 | YES | 262763 | 249636 | 403 | 457 ms
// 14 | 43 | 102 | 617 | 617 | YES | 1551892 | 1483379 | 368 | 3301 ms
// 15 | 47 | 117 | 707 | 707 | YES | 7868575 | 7553327 | 504 | 17802 ms
//
// === (B) exhaustive enumeration: does the prune ever lose the optimum? ===
// n | x  | pruned m | brute m | assignments enumerated | equal
// 3 | 5 | 1 | 1 | 3 | YES
// 4 | 7 | 4 | 4 | 15 | YES
// 5 | 11 | 6 | 6 | 135 | YES
// 6 | 13 | 10 | 10 | 1485 | YES
// 7 | 17 | 17 | 17 | 22275 | YES
// 8 | 19 | 24 | 24 | 378675 | YES
// 9 | 23 | 33 | 33 | 7952175 | YES
//
// === (C) Theorem P at every prefix of the optimal assignment ===
// n | x  | L | prefixes checked | violations | s/|U| at k=0,1,2 | slack at the last prime
// 3 | 5 | 1 | 2 | 0 | 1.00, - | 1 vs 1
// 4 | 7 | 4 | 3 | 0 | 1.00, 1.00, - | 2 vs 2
// 5 | 11 | 6 | 4 | 0 | 1.17, 1.00, 1.00 | 1 vs 1
// 6 | 13 | 10 | 5 | 0 | 1.20, 1.33, 1.00 | 1 vs 1
// 7 | 17 | 17 | 6 | 0 | 1.29, 1.20, 1.20 | 2 vs 2
// 8 | 19 | 24 | 7 | 0 | 1.42, 1.14, 1.13 | 2 vs 2
// 9 | 23 | 33 | 8 | 0 | 1.45, 1.21, 1.15 | 3 vs 3
// 10 | 29 | 42 | 9 | 0 | 1.50, 1.36, 1.22 | 2 vs 2
// 11 | 31 | 57 | 10 | 0 | 1.54, 1.38, 1.32 | 2 vs 2
// 12 | 37 | 87 | 11 | 0 | 1.59, 1.31, 1.23 | 3 vs 3
// 13 | 41 | 90 | 12 | 0 | 1.62, 1.37, 1.28 | 3 vs 3
// 14 | 43 | 102 | 13 | 0 | 1.70, 1.41, 1.33 | 1 vs 1
// 15 | 47 | 117 | 14 | 0 | 1.72, 1.44, 1.35 | 2 vs 2
//
// === (D) THE ATTACK: Theorem P as a phase-free upper bound on L ===
// Coverability of [1,L] is DOWNWARD CLOSED (restrict a cover of [1,L'] to [1,L]),
// so the FIRST dead L is the bound and later live L are irrelevant.
// x | sum 2/p (5..x) | first dead L | bound 6(L-1)+5 | truth | ratio | live L above first dead | last dead L <= 40000
// 5 | 0.4000 | 2 | 11 | 11 | 1.00 | 0 | 40000
// 7 | 0.6857 | 5 | 29 | 29 | 1.00 | 0 | 40000
// 11 | 0.8675 | 14 | 83 | 41 | 2.02 | 3 | 40000
// 13 | 1.0214 | none | INFINITE | 65 | - | - | -
// 17 | 1.1390 | none | INFINITE | 107 | - | - | -
// 19 | 1.2443 | none | INFINITE | 149 | - | - | -
// 23 | 1.3312 | none | INFINITE | 203 | - | - | -
// 29 | 1.4002 | none | INFINITE | 257 | - | - | -
// 31 | 1.4647 | none | INFINITE | 347 | - | - | -
// 37 | 1.5188 | none | INFINITE | 527 | - | - | -
// 41 | 1.5676 | none | INFINITE | 545 | - | - | -
//
// === (E) Brun pure sieve on the same sets: the cheapest admissible repair ===
// x | pi(x)-2 | W=sum 2/p | first odd m with A_m>0 | best m | m/W | A_m | log10 L_bound | beta_pure = ln(6L+5)/ln x | beta_pure/W | vs 4.2665
// 13 | 4 | 1.021 | 3 | 3 | 2.94 | 2.935e-1 | 2.3 | 2.80 | 2.75 | BETTER
// 31 | 9 | 1.465 | 3 | 3 | 2.05 | 1.295e-1 | 3.8 | 3.08 | 2.10 | BETTER
// 101 | 24 | 1.959 | 5 | 5 | 2.55 | 9.646e-2 | 7.2 | 3.98 | 2.03 | BETTER
// 199 | 44 | 2.231 | 5 | 5 | 2.24 | 3.713e-2 | 9.0 | 4.25 | 1.91 | BETTER
// 211 | 45 | 2.241 | 5 | 5 | 2.23 | 3.465e-2 | 9.1 | 4.24 | 1.89 | BETTER
// 251 | 52 | 2.301 | 5 | 5 | 2.17 | 1.814e-2 | 9.7 | 4.36 | 1.90 | worse
// 307 | 61 | 2.366 | 7 | 7 | 2.96 | 7.099e-2 | 11.9 | 5.11 | 2.16 | worse
// 401 | 77 | 2.456 | 7 | 7 | 2.85 | 6.249e-2 | 12.7 | 5.18 | 2.11 | worse
// 1009 | 167 | 2.731 | 7 | 7 | 2.56 | 3.360e-2 | 15.4 | 5.38 | 1.97 | worse
// 10007 | 1228 | 3.300 | 9 | 9 | 2.73 | 1.989e-2 | 26.6 | 6.85 | 2.08 | worse
// 100003 | 9591 | 3.744 | 11 | 11 | 2.94 | 1.566e-2 | 41.3 | 8.42 | 2.25 | worse
// 1000003 | 78497 | 4.108 | 11 | 11 | 2.68 | 1.160e-3 | 52.5 | 8.88 | 2.16 | worse
//
// (E2) the truncation threshold in the idealised Poisson model, exactly (BigInt).
// sum_{j<=m}(-1)^j W^j/j! > 0 iff T_m > 0 with T_m = m*T_{m-1} + (-1)^m W^m, T_0 = 1.
// W | first odd m with T_m > 0 | m/W   (asymptotic: a*ln(a/e) = 1, a = 3.5911214767, 2a = 7.1822; the superseded 3.594 returns 1.00368)
// 1 | 3 | 3.00
// 2 | 5 | 2.50
// 4 | 13 | 3.25
// 8 | 27 | 3.38
// 16 | 55 | 3.44
// 32 | 113 | 3.53
// 64 | 227 | 3.55
// 128 | 457 | 3.57
// 256 | 915 | 3.57
// 512 | 1835 | 3.58
// 1024 | 3673 | 3.59
//
// (E3) sweep: the largest x at which beta_pure still beats the proven 4.2665
// largest x with beta_pure < 4.2665: x = 227 (beta_pure = 4.253)
// first x with beta_pure >= 4.2665: x = 229 (beta_pure = 4.281)
//
// === (F) what the error term costs: main term, truth, and the certificate ===
// x | main-term-only "bound" (integers) | truth or 1.2 x ln^2 x | truth/main | Brun certificate | log(cert/truth)/log x
// 13 | 25.2 | 6.500e+1 (exact) | 2.6 | 1.334e+3 | 1.18
// 31 | 37.2 | 3.470e+2 (exact) | 9.3 | 3.869e+4 | 1.37
// 41 | 40.8 | 5.450e+2 (exact) | 13.4 | 1.127e+5 | 1.44
// 79 | 53.8 | 1.709e+3 (exact) | 31.8 | 3.118e+7 | 2.25
// 101 | 58.3 | 2.581e+3 (law) | 44.3 | 9.626e+7 | 2.28
// 1009 | 120.8 | 5.793e+4 (law) | 479.7 | 1.478e+16 | 3.80
// 10007 | 209.4 | 1.019e+6 (law) | 4866.5 | 2.634e+27 | 5.35
// 100003 | 323.7 | 1.591e+7 (law) | 49145.0 | 1.236e+42 | 6.98
//
// === (G) the residual deficit the optimal adversary actually realises ===
// n | x  | L | k | |U_k| | density prediction L*prod(1-2/p) | deficit | ratio
// 10 | 29 | 42 | 0 | 42 | 42.00 | 0.00 | 1.000
// 10 | 29 | 42 | 4 | 10 | 12.46 | 2.46 | 0.802
// 10 | 29 | 42 | 8 | 0 | 8.36 | 8.36 | 0.000
// 11 | 31 | 57 | 0 | 57 | 57.00 | 0.00 | 1.000
// 11 | 31 | 57 | 5 | 9 | 14.92 | 5.92 | 0.603
// 11 | 31 | 57 | 9 | 0 | 10.62 | 10.62 | 0.000
// 15 | 47 | 117 | 0 | 117 | 117.00 | 0.00 | 1.000
// 15 | 47 | 117 | 7 | 18 | 25.02 | 7.02 | 0.719
// 15 | 47 | 117 | 13 | 0 | 17.90 | 17.90 | 0.000
// ============================================================================
// READINGS
//
// 1. THE PRUNING TEST IS ADMISSIBLE, SO A144311'S TERMS ABOVE x = 43 ARE
//    PROVEN MAXIMAL. Theorem P in the banner is the whole content of the test:
//    a union bound, evaluated on the CURRENT residual, which is legitimate at
//    every deeper state because the residual only shrinks. Three independent
//    confirmations: the port reproduces all thirteen terms it reaches, n=3..15,
//    including n=15 (x=47), which is past this repo's own exact ladder, that
//    ladder stopping at 43# (A);
//    the pruned optimum equals the brute-force optimum over all 8.35 million
//    complete assignments at n <= 9 (B); and the inequality holds at all 104
//    prefixes of the optimal assignments with zero violations (C). The one
//    structural detail that makes the search exact rather than merely sound is
//    that at the LAST prime the sum is empty, so the test degenerates to
//    0 >= |U| and a leaf is reachable only on a complete cover — which is why
//    the leaf code never re-checks coverage and does not need to.
//
// 2. RUN BACKWARDS, THE SAME INEQUALITY IS EXACT AT x = 5 AND 7 AND DEAD AT 13.
//    Phase-free (each prime free to take its best class against [1,L]), the
//    criterion gives G2(5#) <= 11 and G2(7#) <= 29 — the truth, both times, by
//    pure counting with no sieve. At x = 11 it gives 83 against 41. At x = 13
//    it gives nothing at all, and at every x above 13 it gives nothing. The
//    threshold is exactly sum_{5<=p<=x} 2/p crossing 1, which happens between
//    11 (0.8675) and 13 (1.0214). By Mertens the sum diverges, so this is not
//    a hard level to push past — it is the end of the mechanism.
//
// 3. THE WHEEL IS THE ONLY REASON IT WORKS AT ALL. In integer coordinates the
//    budget is 1/2 + 2/3 + sum_{p>=5} 2/p > 1 from x = 3, so the raw union
//    bound is vacuous immediately. Factoring 2 and 3 out exactly buys the
//    range 5..11 and nothing more. Factoring out a longer wheel does not help:
//    it needs a LOWER bound on the survivors of the wheel inside a window, and
//    the only sieve-free one available is |U| >= L/G2(y#), which is weaker than
//    the density by a factor of order y/ln y.
//
// 4. THE SEARCH'S REAL STRENGTH IS NOT IN THE INEQUALITY, IT IS IN THE
//    CONCRETE RESIDUAL, AND THAT DOES NOT SURVIVE QUANTIFICATION. The prune
//    is powerful because it is evaluated on the set the partial assignment
//    actually left behind, where overlaps have already happened. To make it an
//    asymptotic theorem one has to quantify over all residuals, i.e. bound
//    |U_k| from below for every adversarial choice — which is precisely the
//    sieve. (G) measures how much the adversary takes: at x = 47 the optimal
//    assignment ends with 0 survivors where the density insists on 17.90,
//    a 15.3% deficit against L. That deficit IS the sieve error term.
//
// 5. THE MAIN TERM ALONE IS ALREADY FALSE AT x = 13. If the sieve's main term
//    could be used with no error term, the covering economy would forbid any
//    cover longer than 1/prod(1-2/p) ~ 2.4 ln^2 x integers. At x = 13 that
//    reads 25.2 against a truth of 65, and the gap grows like x: 13.4x at
//    x = 41, 49145x at x = 100003 (F). So there is no version of this attack in
//    which the error term is a correction. It is the entire problem.
//
// 6. THE CHEAPEST ADMISSIBLE REPAIR IS BONFERRONI = BRUN, AND IT DIVERGES.
//    Truncating the same inclusion-exclusion at odd order m is still pure
//    counting and CRT, no analytic input. Exactly optimised, it certifies
//    G2(x#) < 6*B_m/A_m + 5 and yields beta_pure(x) = 2.80, 3.08, 3.98, 4.25,
//    5.38, 6.85, 8.42, 8.88 at x = 13, 31, 101, 199, 1009, 10007, 1e5, 1e6.
//    It BEATS the proven 4.2665 up to x = 227 and loses from x = 229 on (E3),
//    and it grows without bound: the optimal truncation sits at the threshold
//    m0 ~ a*W with W = sum 2/p = 2 lnln x - 1.1437 and a -> 3.5911214767 (E2),
//    giving beta_pure ~ 7.1822 lnln x. Over the computed range beta_pure ~ 2.1*W.
//    The approach to a = 3.5911214767 is astronomically slow: for the actual
//    prime set e_j sits below the Poisson W^j/j! by a bounded factor of order
//    exp(-a^2 * sum_p (2/p)^2 / 2), which is O(1) and so vanishes against W in
//    the limit but is comparable to W at every computable x. W only reaches 4.1
//    at x = 10^6, so nothing in reach is asymptotic. Both readings are worth
//    quoting and they must not be substituted for each other.
//    A NUMBER, not a "does not work": the covering economy's own exponent is
//    beta_pure(x) -> infinity, and it is below 4.2665 only for x <= 227.
//
// 7. THE 62-vs-111 QUESTION HAS AN ANSWER AND IT IS 62. The same revival
//    pattern appears here: at x = 11 the criterion is dead at L = 14 and 15,
//    LIVE again at 16, 17, 18, and dead from 19 to the end of the sweep. But
//    coverability of [1,L] is downward closed — restrict a cover of [1,L'] to
//    [1,L] — so the FIRST dead L is the bound and the revivals are irrelevant.
//    Taking the last dead L instead would give 239999 here against a truth of
//    41, a factor 5854 where the correct reading gives 2.02.
//    `attack-block-00-ADJUDICATION.md` overturned attack 3's L <= 62 in favour
//    of L <= 111 on exactly the reasoning this refutes. L <= 111 is true (it is
//    implied by L <= 62); it is not the settled value, and the "overshoot 2.12x
//    rather than 1.19x" consequence drawn from it reverts. Flagged for human
//    adjudication: the block-1 instrument was not re-run here.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   8.35 million in reading 1 is the total of section (B)'s "assignments
//   enumerated" column, 3 + 15 + 135 + 1485 + 22275 + 378675 + 7952175 =
//   8,354,763. The 8.36 in section (G) is a coincidence, not the source.
//   104 in reading 1 is the total of section (C)'s "prefixes checked" column,
//   2 through 14 inclusive, which sums to 104.
//   15.3% in reading 4 is section (G)'s last row, deficit 17.90 over L = 117,
//   which is 15.299%.
//   7.1822 lnln x in reading 6 is 2 * a with a = 3.5911214767, the root of
//   a*ln(a/e) = 1 that the (E2) header computes and prints, since W = 2 lnln x
//   to leading order.
//   The 7.2 in the log10 L_bound column of (E) is a coincidence.
//   239999 in reading 7 is 6(L-1)+5 at the last dead L = 40000 that section
//   (D) prints for x = 11, and 6 * 39999 + 5 = 239999.
//   5854 in reading 7 is 239999 over the printed truth 41, which is 5853.6.
//   All five check out.
// BORROWED, verified present in the named producer:
//   62, 111, 2.12 and 1.19 in reading 7 are all in
//   research/history/staging/attack-block-00-ADJUDICATION.md, at its lines 51
//   to 90: "the counting bound is L <= 111, not 62" and "an overshoot of
//   2.12x. Attack 3 reported 1.19x". The reading names that file without its
//   path, which is research/history/staging/.
// TOKENIZER ARTIFACT, not a figure: the -111 is the second half of the
//   hyphenated phrase "62-vs-111" in reading 7's title.
// DEFINITION / LITERATURE constants: the 1.1437 of reading 6 is the Mertens
//   offset for the tail sum with 2 and 3 removed, 1 + 2/3 - 2M with
//   M = 0.2614972, which is 1.143672.
// ---------------------------------------------------------------------------
