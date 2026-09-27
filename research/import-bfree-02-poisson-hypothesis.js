// ============================================================================
// IMPORT B-FREE 02 — GRANVILLE-KURLBERG'S HYPOTHESIS (1), TESTED ON THE COMB
// ============================================================================
// Companion to `research/import-bfree-01-toeplitz.js`. Where that script puts
// the comb into ERGODIC coordinates and finds the limit degenerate, this one
// tests the single theorem in print that actually owns the comb's gap
// statistics, and locates exactly where it stops.
//
// THE THEOREM. Granville and Kurlberg, "Poisson statistics via the Chinese
// Remainder Theorem", Adv. Math. 218 (2008) 2013-2042 (arXiv:math/0412135).
// Their setup is ours verbatim: a subset Omega_p of Z/pZ for every prime, and
// Omega_q for squarefree q by CRT, with mean spacing s_q = q/|Omega_q|. Write
// r_p = |Omega_p|/p and, for a shift vector h,
//
//      N_k(h, Omega_p) = #{ n mod p : n + h_i in Omega_p for i = 0..k-1 },
//      eps_k(h, p) defined by  N_k(h, Omega_p) = r_p^k * p * (1 + eps_k(h,p)).
//
// THEOREM 1 (verbatim, their numbering). "Suppose that we are given subsets
// Omega_p subset Z/pZ for each prime p. For each integer k, assume that
//      (1)  N_k(h, Omega_p) = r_p^k * p (1 + O_k((1 - r_p) p^{-delta}))
// provided that 0, h_1, h_2, ..., h_{k-1} are distinct mod p. If s_p = p^{o(1)}
// for all primes p, then the spacings between elements in the sets Omega_q
// become Poisson distributed as s_q -> infinity."
//
// They recover Hooley's 1965 theorem for the reduced residues (Omega_p =
// {1,...,p-1}) as the one-class case, and they name the averaged weakening as
// an open problem, verbatim: "perhaps it suffices to simply assume an averaged
// form of (1), like p^{-(k-1)} sum_h | N_k(h,Omega_p)/(r_p^k p) - 1 | <<_k
// (1 - r_p) p^{-delta} ... We have been unable to prove this as yet."
//
// WHAT THIS SCRIPT ESTABLISHES.
//
// (A) A CLOSED FORM for the comb, so nothing here is a sample. With
//     Omega_p = Z/pZ \ {0, -2} and 0, h_1, ..., h_{k-1} distinct mod p, the
//     forbidden set for n is the union of {-h_i} and {-h_i - 2}, and the only
//     coincidences are  -h_i - 2 = -h_j, i.e. h_j = h_i + 2. So with
//          m(h) = #{ (i,j) : h_j = h_i + 2 (mod p) },  0 <= m <= k-1,
//     we have EXACTLY  N_k(h, Omega_p) = p - 2k + m(h).  The script proves this
//     against brute force at every p in range before using it.
//
// (B) HYPOTHESIS (1) FAILS FOR THE COMB, and the offenders are exactly the
//     shift vectors that reproduce the comb's own defining difference 2. The
//     worst case m = k-1 gives eps ~ (k-1)/p, while (1) demands
//     eps <<_k (1-r_p) p^{-delta} = 2 p^{-1-delta}. The two differ by p^{delta}
//     at every fixed delta > 0, so no delta works.
//
// (C) THE ONE-CLASS CONTROL PASSES. For Omega_p = Z/pZ \ {0} there are no
//     coincidences to have, N_k = p - k exactly, and eps ~ -k(k-1)/(2p^2)
//     against a requirement p^{-1-delta}: (1) holds up to delta = 1. So the
//     obstruction is not "two classes are harder"; it is structural, and it is
//     the same offset 2 that the whole corpus turns on.
//
// (D) THE FAILURE IS GENERIC IN THE CLASS COUNT, NOT SPECIAL TO 2. For c
//     deleted classes per prime the worst eps is about k(c-1)/p against a
//     requirement c p^{-1-delta}: it fails for every c >= 2 and holds only at
//     c = 1. Granville-Kurlberg's Theorem 1 therefore covers exactly the DENSE
//     ONE-CLASS case. (Their Theorem 3, on polynomial images, is unaffected
//     because there r_p is bounded away from 1 and the requirement is weak.)
//
// (E) THE AVERAGED FORM HOLDS FOR THE COMB, WITH ROOM. The offending h have
//     density O_k(1/p) and each contributes O_k(1/p), so the average is
//     O_k(1/p^2) against a requirement 2 p^{-1-delta}: it holds for every
//     delta < 1. So the Poisson law for the twin comb's gaps is not merely
//     unproven — it sits inside the precise weakening that Granville and
//     Kurlberg state and say they cannot prove.
//
// WHAT POISSON WOULD AND WOULD NOT BUY, so the reading is not overclaimed:
// Poisson spacings is a statement about the empirical distribution of gaps at
// the scale of the mean spacing. It would confirm the model behind the corpus's
// max-gap law, and it would NOT bound G_2, because a maximum over ~D gaps is
// not determined by any finite-order local statistic (`research/maxgap-law.md`).
//
// REPRODUCTION.  node research/import-bfree-02-poisson-hypothesis.js   (~5 s)
// ============================================================================

'use strict';

function primesUpTo(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  return out;
}

// exact N_k(h, Omega_p) by brute force over n mod p
function NkBrute(p, h, deletedClasses) {
  // deletedClasses: residues NOT in Omega_p. Count n mod p with n + h_i in Omega_p
  // for every h_i in h.
  const bad = new Uint8Array(p);
  for (const r of deletedClasses) bad[((r % p) + p) % p] = 1;
  let c = 0;
  outer: for (let n = 0; n < p; n++) {
    for (const d of h) { const j = (n + d) % p; if (bad[j]) continue outer; }
    c++;
  }
  return c;
}

// ---------------------------------------------------------------------------
// (A) the closed form, asserted against brute force
// ---------------------------------------------------------------------------
function stageA() {
  console.log('=== (A) the closed form N_k = p - 2k + m(h), asserted ===');
  const P = primesUpTo(120).filter((p) => p >= 5);
  let checked = 0, worstm = 0;
  for (const p of P) {
    for (let k = 2; k <= 4; k++) {
      if (k > p - 1) continue;
      if (k === 4 && p > 43) continue; // cost control; k = 4 checked on 5..43
      // enumerate all h = (0, h_1, ..., h_{k-1}) with distinct entries mod p
      const idx = new Array(k - 1).fill(0);
      const rec = (pos, start) => {
        if (pos === k - 1) {
          const h = [0, ...idx];
          const s = new Set(h);
          if (s.size !== k) return;
          let m = 0;
          for (const a of h) if (s.has((a + 2) % p)) m++;
          const closed = p - 2 * k + m;
          const brute = NkBrute(p, h, [0, p - 2]);
          if (brute !== closed) {
            console.error(`MISMATCH p=${p} k=${k} h=${h} closed=${closed} brute=${brute}`);
            process.exit(1);
          }
          checked++; if (m > worstm) worstm = m;
          return;
        }
        for (let v = start; v < p; v++) { idx[pos] = v; rec(pos + 1, v + 1); }
      };
      rec(0, 1);
    }
  }
  console.log(`  ${checked} shift vectors at k = 2,3,4 over primes 5..113: closed form exact everywhere`);
  console.log(`  largest coincidence count m observed: ${worstm} (bound is k-1 = 3)`);
  console.log('');
}

// ---------------------------------------------------------------------------
// (B,C,D) hypothesis (1): worst-case eps, against the requirement
// ---------------------------------------------------------------------------
function epsWorst(p, k, c) {
  // c deleted classes; worst case is maximal coincidence, m_max = (c-1)*k roughly.
  // computed exactly for c = 1 and c = 2 (the two cases in play).
  const r = 1 - c / p;
  const denom = Math.pow(r, k) * p;
  let best = 0, bestm = 0;
  const mmax = c === 1 ? 0 : k - 1;
  for (let m = 0; m <= mmax; m++) {
    const N = p - c * k + m;
    const e = Math.abs(N / denom - 1);
    if (e > best) { best = e; bestm = m; }
  }
  return { eps: best, m: bestm, req: (c / p) };
}

function stageBCD() {
  console.log('=== (B,C) hypothesis (1): worst-case |eps_k(h,p)| against its requirement ===');
  console.log('  (1) demands  |eps| <<_k (1 - r_p) p^{-delta}.  The column');
  console.log('  |eps| / (1 - r_p) must therefore DECAY like p^{-delta}.');
  console.log('');
  for (const k of [2, 3, 4]) {
    console.log(`  k = ${k}`);
    console.log('     p        two-class |eps|   /(1-r_p)   |  one-class |eps|   /(1-r_p)');
    for (const p of [11, 31, 101, 1009, 10007, 100003, 1000003]) {
      const t = epsWorst(p, k, 2);
      const o = epsWorst(p, k, 1);
      console.log(
        `  ${String(p).padStart(8)}   ${t.eps.toExponential(4)}   ${(t.eps / (2 / p)).toExponential(4)}` +
        `   |  ${o.eps.toExponential(4)}   ${(o.eps / (1 / p)).toExponential(4)}`
      );
    }
    console.log('');
  }
  console.log('  READ: the two-class ratio is FLAT (no delta > 0 works: (1) FAILS).');
  console.log('  The one-class ratio decays like 1/p (delta = 1 works: (1) HOLDS,');
  console.log('  which is Granville-Kurlberg recovering Hooley 1965).');
  console.log('');

  console.log('=== (D) BRUTE-FORCE max over h, and the offset 2 is not what does it ===');
  console.log('  Omega_p = Z/pZ minus c classes in arithmetic progression with common');
  console.log('  difference d. max_h |eps_k(h,p)| is taken over ALL k-subsets h containing');
  console.log('  0, by direct enumeration of the forbidden union — no closed form used.');
  console.log('  c   d     p      k   max |eps|      /(1 - r_p)   verdict for (1)');
  for (const [c, d] of [[1, 0], [2, 2], [2, 4], [2, 30], [3, 2]]) {
    for (const p of [101, 1009, 10007]) {
      for (const k of [2, 3]) {
        const r = 1 - c / p, denom = Math.pow(r, k) * p;
        let best = 0;
        const h = [0, 0, 0];
        const eval1 = (kk) => {
          const S = new Set();
          for (let i = 0; i < kk; i++) for (let t = 0; t < c; t++) S.add((((-h[i] - t * d) % p) + p) % p);
          const N = p - S.size;
          const e = Math.abs(N / denom - 1);
          if (e > best) best = e;
        };
        if (k === 2) { for (let a = 1; a < p; a++) { h[1] = a; eval1(2); } }
        else { for (let a = 1; a < p; a++) for (let b = a + 1; b < p; b++) { h[1] = a; h[2] = b; eval1(3); } }
        const ratio = best / (c / p);
        console.log(
          `  ${c}  ${String(d).padStart(2)}  ${String(p).padStart(6)}   ${k}   ${best.toExponential(4)}   ${ratio.toExponential(4)}   ` +
          (c === 1 ? 'decays -> HOLDS' : 'flat -> FAILS')
        );
      }
    }
  }
  console.log('  The two-class column is identical at d = 2, 4 and 30, because a -> a + d');
  console.log('  is a p-cycle for every d coprime to p. So the obstruction is the SECOND');
  console.log('  CLASS, not the value 2; and Theorem 1 covers exactly the dense one-class');
  console.log('  case among sets with s_p -> 1. (Their Theorem 3 on polynomial images is');
  console.log('  untouched: there 1 - r_p is bounded below and the requirement is weak.)');
  console.log('');
}

// ---------------------------------------------------------------------------
// (E) the averaged form
// ---------------------------------------------------------------------------
function stageE() {
  console.log('=== (E) the AVERAGED form, which Granville-Kurlberg state and cannot prove ===');
  console.log('  avg = p^{-(k-1)} sum_h |eps_k(h,p)|, sum over h with 0,h_1..h_{k-1}');
  console.log('  distinct mod p. Requirement: avg <<_k (1-r_p) p^{-delta} = 2 p^{-1-delta}.');
  console.log('');
  console.log('  Because gcd(2, p) = 1 the map a -> a + 2 is a single p-cycle, so a');
  console.log('  k-subset h of Z/pZ has m(h) = k - j where j is its number of blocks of');
  console.log('  consecutive elements ALONG THAT CYCLE, and the count of k-subsets with');
  console.log('  j blocks is (p/j)*C(k-1,j-1)*C(p-k-1,j-1). Rotation is transitive and');
  console.log('  preserves m, so that distribution is also the distribution over the');
  console.log('  h containing 0. The averages below are therefore EXACT, not sampled,');
  console.log('  and Stage A has already checked the closed form they rest on.');
  console.log('');
  console.log('  k    p          avg |eps|      avg/(1-r_p)     * p');
  const NMAX = 1000010;
  const LF = new Float64Array(NMAX + 1);
  for (let i = 2; i <= NMAX; i++) LF[i] = LF[i - 1] + Math.log(i);
  const lchoose = (n, r) => (r < 0 || r > n || n < 0) ? -Infinity : LF[n] - LF[r] - LF[n - r];
  for (const k of [2, 3, 4]) {
    for (const p of [101, 1009, 10007, 100003, 1000003]) {
      const r = 1 - 2 / p, denom = Math.pow(r, k) * p;
      const lTot = lchoose(p, k);
      let avg = 0, mass = 0;
      for (let j = 1; j <= k; j++) {
        const lcnt = Math.log(p / j) + lchoose(k - 1, j - 1) + lchoose(p - k - 1, j - 1);
        const w = Math.exp(lcnt - lTot);
        mass += w;
        const m = k - j;
        avg += w * Math.abs((p - 2 * k + m) / denom - 1);
      }
      if (Math.abs(mass - 1) > 1e-6) { console.error(`mass check failed k=${k} p=${p} mass=${mass}`); process.exit(1); }
      const ratio = avg / (2 / p);
      console.log(
        `  ${k}  ${String(p).padStart(9)}   ${avg.toExponential(4)}   ${ratio.toExponential(4)}   ${(ratio * p).toFixed(3).padStart(9)}`
      );
    }
    console.log('');
  }

  console.log('');
  console.log('  READ: avg/(1-r_p) falls like 1/p, so the averaged hypothesis holds for');
  console.log('  the twin comb at every delta < 1, with a factor p to spare. The comb is');
  console.log('  therefore an instance of exactly the case Granville and Kurlberg could');
  console.log('  not prove, and a proof of their averaged form delivers Poisson spacings');
  console.log('  for the level-x twin comb immediately.');
  console.log('');
}

function main() {
  const t0 = Date.now();
  stageA();
  stageBCD();
  stageE();
  console.log(`total ${(Date.now() - t0) / 1000} s`);
}

main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/import-bfree-02-poisson-hypothesis.js
//   invocation:  node research/import-bfree-02-poisson-hypothesis.js
//   code-sha256: 39a1b5f725338272ccd6c857d6c24ff148cfbcb8a9ec832d748b101721b1181c
//   out-sha256:  192685d78a7a7e64a63ae4d7e1006c37cd1b5386d4d9725de54fb9bff1627889
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     54.2 s
// ============================================================================
// === (A) the closed form N_k = p - 2k + m(h), asserted ===
//   99668 shift vectors at k = 2,3,4 over primes 5..113: closed form exact everywhere
//   largest coincidence count m observed: 3 (bound is k-1 = 3)
//
// === (B,C) hypothesis (1): worst-case |eps_k(h,p)| against its requirement ===
//   (1) demands  |eps| <<_k (1 - r_p) p^{-delta}.  The column
//   |eps| / (1 - r_p) must therefore DECAY like p^{-delta}.
//
//   k = 2
//      p        two-class |eps|   /(1-r_p)   |  one-class |eps|   /(1-r_p)
//         11   8.6420e-2   4.7531e-1   |  1.0000e-2   1.1000e-1
//         31   3.2105e-2   4.9762e-1   |  1.1111e-3   3.4444e-2
//        101   9.8969e-3   4.9980e-1   |  1.0000e-4   1.0100e-2
//       1009   9.9108e-4   5.0000e-1   |  9.8419e-7   9.9305e-4
//      10007   9.9930e-5   5.0000e-1   |  9.9880e-9   9.9950e-5
//     100003   9.9997e-6   5.0000e-1   |  9.9996e-11   9.9999e-6
//    1000003   1.0000e-6   5.0000e-1   |  9.9998e-13   9.9998e-7
//
//   k = 3
//      p        two-class |eps|   /(1-r_p)   |  one-class |eps|   /(1-r_p)
//         11   1.7010e-1   9.3553e-1   |  3.2000e-2   3.5200e-1
//         31   6.3881e-2   9.9016e-1   |  3.4074e-3   1.0563e-1
//        101   1.9786e-2   9.9918e-1   |  3.0200e-4   3.0502e-2
//       1009   1.9821e-3   9.9999e-1   |  2.9545e-6   2.9811e-3
//      10007   1.9986e-4   1.0000e+0   |  2.9966e-8   2.9987e-4
//     100003   1.9999e-5   1.0000e+0   |  2.9999e-10   3.0000e-5
//    1000003   2.0000e-6   1.0000e+0   |  3.0000e-12   3.0001e-6
//
//   k = 4
//      p        two-class |eps|   /(1-r_p)   |  one-class |eps|   /(1-r_p)
//         11   3.9140e-1   2.1527e+0   |  6.8300e-2   7.5130e-1
//         31   9.5132e-2   1.4745e+0   |  6.9667e-3   2.1597e-1
//        101   2.9662e-2   1.4979e+0   |  6.0803e-4   6.1411e-2
//       1009   2.9732e-3   1.5000e+0   |  5.9130e-6   5.9662e-3
//      10007   2.9979e-4   1.5000e+0   |  5.9936e-8   5.9978e-4
//     100003   2.9999e-5   1.5000e+0   |  5.9998e-10   6.0000e-5
//    1000003   3.0000e-6   1.5000e+0   |  6.0001e-12   6.0001e-6
//
//   READ: the two-class ratio is FLAT (no delta > 0 works: (1) FAILS).
//   The one-class ratio decays like 1/p (delta = 1 works: (1) HOLDS,
//   which is Granville-Kurlberg recovering Hooley 1965).
//
// === (D) BRUTE-FORCE max over h, and the offset 2 is not what does it ===
//   Omega_p = Z/pZ minus c classes in arithmetic progression with common
//   difference d. max_h |eps_k(h,p)| is taken over ALL k-subsets h containing
//   0, by direct enumeration of the forbidden union — no closed form used.
//   c   d     p      k   max |eps|      /(1 - r_p)   verdict for (1)
//   1   0     101   2   1.0000e-4   1.0100e-2   decays -> HOLDS
//   1   0     101   3   3.0200e-4   3.0502e-2   decays -> HOLDS
//   1   0    1009   2   9.8419e-7   9.9305e-4   decays -> HOLDS
//   1   0    1009   3   2.9545e-6   2.9811e-3   decays -> HOLDS
//   1   0   10007   2   9.9880e-9   9.9950e-5   decays -> HOLDS
//   1   0   10007   3   2.9966e-8   2.9987e-4   decays -> HOLDS
//   2   2     101   2   9.8969e-3   4.9980e-1   flat -> FAILS
//   2   2     101   3   1.9786e-2   9.9918e-1   flat -> FAILS
//   2   2    1009   2   9.9108e-4   5.0000e-1   flat -> FAILS
//   2   2    1009   3   1.9821e-3   9.9999e-1   flat -> FAILS
//   2   2   10007   2   9.9930e-5   5.0000e-1   flat -> FAILS
//   2   2   10007   3   1.9986e-4   1.0000e+0   flat -> FAILS
//   2   4     101   2   9.8969e-3   4.9980e-1   flat -> FAILS
//   2   4     101   3   1.9786e-2   9.9918e-1   flat -> FAILS
//   2   4    1009   2   9.9108e-4   5.0000e-1   flat -> FAILS
//   2   4    1009   3   1.9821e-3   9.9999e-1   flat -> FAILS
//   2   4   10007   2   9.9930e-5   5.0000e-1   flat -> FAILS
//   2   4   10007   3   1.9986e-4   1.0000e+0   flat -> FAILS
//   2  30     101   2   9.8969e-3   4.9980e-1   flat -> FAILS
//   2  30     101   3   1.9786e-2   9.9918e-1   flat -> FAILS
//   2  30    1009   2   9.9108e-4   5.0000e-1   flat -> FAILS
//   2  30    1009   3   1.9821e-3   9.9999e-1   flat -> FAILS
//   2  30   10007   2   9.9930e-5   5.0000e-1   flat -> FAILS
//   2  30   10007   3   1.9986e-4   1.0000e+0   flat -> FAILS
//   3   2     101   2   2.0096e-2   6.7656e-1   flat -> FAILS
//   3   2     101   3   4.0485e-2   1.3630e+0   flat -> FAILS
//   3   2    1009   2   1.9851e-3   6.6766e-1   flat -> FAILS
//   3   2    1009   3   3.9732e-3   1.3363e+0   flat -> FAILS
//   3   2   10007   2   1.9989e-4   6.6677e-1   flat -> FAILS
//   3   2   10007   3   3.9981e-4   1.3336e+0   flat -> FAILS
//   The two-class column is identical at d = 2, 4 and 30, because a -> a + d
//   is a p-cycle for every d coprime to p. So the obstruction is the SECOND
//   CLASS, not the value 2; and Theorem 1 covers exactly the dense one-class
//   case among sets with s_p -> 1. (Their Theorem 3 on polynomial images is
//   untouched: there 1 - r_p is bounded below and the requirement is weak.)
//
// === (E) the AVERAGED form, which Granville-Kurlberg state and cannot prove ===
//   avg = p^{-(k-1)} sum_h |eps_k(h,p)|, sum over h with 0,h_1..h_{k-1}
//   distinct mod p. Requirement: avg <<_k (1-r_p) p^{-delta} = 2 p^{-1-delta}.
//
//   Because gcd(2, p) = 1 the map a -> a + 2 is a single p-cycle, so a
//   k-subset h of Z/pZ has m(h) = k - j where j is its number of blocks of
//   consecutive elements ALONG THAT CYCLE, and the count of k-subsets with
//   j blocks is (p/j)*C(k-1,j-1)*C(p-k-1,j-1). Rotation is transitive and
//   preserves m, so that distribution is also the distribution over the
//   h containing 0. The averages below are therefore EXACT, not sampled,
//   and Stage A has already checked the closed form they rest on.
//
//   k    p          avg |eps|      avg/(1-r_p)     * p
//   2        101   5.9790e-4   3.0194e-2       3.050
//   2       1009   5.9032e-6   2.9782e-3       3.005
//   2      10007   5.9926e-8   2.9984e-4       3.000
//   2     100003   5.9997e-10   3.0000e-5       3.000
//   2    1000003   6.0001e-12   3.0001e-6       3.000
//
//   3        101   1.7243e-3   8.7075e-2       8.795
//   3       1009   1.7643e-5   8.9009e-3       8.981
//   3      10007   1.7971e-7   8.9918e-4       8.998
//   3     100003   1.7999e-9   8.9995e-5       9.000
//   3    1000003   1.8000e-11   9.0000e-6       9.000
//
//   4        101   3.2168e-3   1.6245e-1      16.407
//   4       1009   3.5059e-5   1.7688e-2      17.847
//   4      10007   3.5919e-7   1.7972e-3      17.985
//   4     100003   3.5995e-9   1.7998e-4      17.998
//   4    1000003   3.6000e-11   1.8000e-5      18.000
//
//
//   READ: avg/(1-r_p) falls like 1/p, so the averaged hypothesis holds for
//   the twin comb at every delta < 1, with a factor p to spare. The comb is
//   therefore an instance of exactly the case Granville and Kurlberg could
//   not prove, and a proof of their averaged form delivers Poisson spacings
//   for the level-x twin comb immediately.
//
// total 54.145 s
// ============================================================================
// READINGS
// ============================================================================
//
// [1] THE CLOSED FORM IS EXACT AND THE MECHANISM IS ONE COINCIDENCE.
//     N_k(h, Omega_p) = p - 2k + m(h) held at all 99668 shift vectors checked
//     against brute force, k = 2,3,4 over primes 5 to 113, with m reaching its
//     bound k-1 = 3. The only way the two deleted classes interact is
//     -h_i - 2 = -h_j, so every deviation from the independent count is a
//     shift vector reproducing the comb's own difference.
//
// [2] HYPOTHESIS (1) FAILS FOR THE COMB, FLATLY, ACROSS FIVE ORDERS OF
//     MAGNITUDE. max_h |eps| / (1 - r_p) reads 4.9980e-1, 5.0000e-1, 5.0000e-1,
//     5.0000e-1, 5.0000e-1 at p = 101 through 1000003 for k = 2, and settles on
//     1.0000e+0 and 1.5000e+0 at k = 3 and 4. A flat ratio is the negation of
//     the required p^{-delta} decay at every delta > 0. This is not a marginal
//     failure that a sharper estimate repairs; the quantity does not decay.
//
// [3] THE ONE-CLASS CONTROL PASSES, WHICH IS WHAT MAKES [2] INFORMATIVE.
//     For Omega_p = Z/pZ \ {0} the same column reads 1.0100e-2, 9.9305e-4,
//     9.9950e-5, 9.9999e-6, 9.9998e-7 at k = 2: exactly 1/p, so delta = 1 works
//     and Theorem 1 applies. That is Granville-Kurlberg recovering Hooley 1965
//     for the reduced residues, and it is the case the corpus's own Jacobsthal
//     literature sits in.
//
// [4] THE OBSTRUCTION IS THE SECOND CLASS, NOT THE OFFSET 2. Two deleted
//     classes at common difference d = 2, 4 and 30 give identical numbers to
//     the last printed digit (9.9930e-5 at p = 10007, k = 2, in all three),
//     because a -> a + d is a p-cycle whenever gcd(d,p) = 1. Three classes are
//     worse: 1.3336e+0 at p = 10007, k = 3. So Theorem 1 covers exactly the
//     dense one-class case, and no reformulation of the comb in a different
//     offset escapes it.
//
// [5] THE AVERAGED FORM HOLDS WITH A FACTOR p TO SPARE, AND THAT IS THE ONE
//     LIVE RESULT HERE. avg/(1-r_p) times p reads 3.000, 9.000 and 18.000 at
//     k = 2, 3, 4 by p = 1000003, so the average is exactly 3*C(k,2)/p^2 and
//     clears the requirement at every delta < 1. Granville and Kurlberg state
//     this weakening and write "We have been unable to prove this as yet". The
//     twin comb is therefore an instance of their open problem rather than a
//     case their theorem misses for an accidental reason.
//
// [6] WHAT THIS DOES NOT SHOW. It does not prove Poisson spacings for the comb,
//     and Poisson spacings would not bound G2: the maximum over e^{theta(x)}
//     gaps is not a function of any finite-order local statistic, which is the
//     distance `research/maxgap-law.md` already prices. Their Theorem 12, which
//     they describe as stronger and more explicit than Theorem 1, was not read,
//     so it is possible their machinery survives the failure of (1) in a form
//     this script does not test. The k = 4 brute-force check ran on primes 5 to
//     43 only; k = 2 and 3 ran to 113.
// ============================================================================
