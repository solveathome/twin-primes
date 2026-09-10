#!/usr/bin/env node
'use strict';
// Independent review falsifiers for sharp-corner-transition.md.
// Three steps that the two existing validators do not exercise:
//   F1  the UPPER divisor cut at its true floors floor(x/(W+1)) and
//       floor((x-2)/(Z+1)) is redundant on I_0=(x/2,x] and I_2=(x/2-2,x-2],
//       the region it would cut is non-empty, and the strict threshold r>W
//       is what makes that floor the correct one;
//   F2  the shifted diagonal bookkeeping behind (14): for b in {0,2} the
//       m>=2 sum over pm in I equals S((x-b)/p,D)-S((x/2-b)/p,D), and the
//       real endpoint difference is x/(2p) with b cancelling exactly;
//   F3  the exact rational arithmetic of (16): 9B eta^2 <= L_0 w eta/16
//       iff eta <= L_0 w/(144B), the retained margin is L_0 w eta/16, and
//       eta_0=min(1/400,L_0/(2880B)) is admissible for both w=6/25, w=1/20.
// Finite proxies and exact rationals only. Nothing here certifies (3), (4),
// Graham's (10), PNT, any implied constant or any asymptotic statement.
const assert = require('node:assert/strict');

const X = 4096;
const ds = Array.from({length: X + 1}, () => []);
for (let d = 1; d <= X; d++) for (let n = d; n <= X; n += d) ds[n].push(d);
const primes = [];
for (let n = 2; n <= X; n++) if (ds[n].length === 2) primes.push(n);
const mu = Array(X + 1).fill(1), base = Array(X + 1).fill(0);
for (const p of primes) {
  for (let n = p; n <= X; n += p) mu[n] *= -1;
  for (let n = p * p; n <= X; n += p * p) mu[n] = 0;
  for (let r = p; r <= X; r *= p) base[r] = p;
}
const M = (m, D) => ds[m].reduce((s, d) => s + (d <= D ? mu[d] : 0), 0);
const controls = new Set();

// Exact prime-log coefficients as integer vectors keyed by the prime base:
// beta_W(k) is nonzero exactly when this map is non-empty.
const betaVec = (k, W) => {
  const v = new Map();
  for (const r of ds[k]) if (r > W && base[r]) v.set(base[r], (v.get(base[r]) || 0) + 1);
  return v;
};
const coeff = (n, W, D, Dplus) => {
  const v = new Map();
  for (const d of ds[n]) {
    if (!mu[d] || d <= D || (Dplus !== null && d > Dplus)) continue;
    for (const [p, c] of betaVec(n / d, W)) v.set(p, (v.get(p) || 0) + mu[d] * c);
  }
  for (const [p, c] of [...v]) if (c === 0) v.delete(p);
  return v;
};
const same = (a, b) => a.size === b.size && [...a].every(([p, c]) => b.get(p) === c);

// ---------------------------------------------------------------- F1
let redundancyPoints = 0, aboveCutSeen = 0, windowTerms = 0, topLoss = 0, laxThreshold = 0;
const f1 = [[4096, 7, 256, 0], [4096, 3, 512, 2], [2048, 5, 128, 0], [2048, 3, 256, 2]];
for (const [x, W, D, b] of f1) {
  assert(x / D < D && x / (W * W) < D);                   // hypothesis (11) holds here
  const top = x - b, Dplus = Math.floor(top / (W + 1));
  assert(D < Dplus);
  let dMax = 0;
  for (let n = x / 2 - b + 1; n <= top; n++) {
    for (const d of ds[n]) {
      if (d > Dplus) {
        assert.equal(betaVec(n / d, W).size, 0); redundancyPoints++;
        if (mu[d]) aboveCutSeen++;
        // Control: with the non-strict threshold r>=W the same floor fails.
        if (mu[d] && betaVec(n / d, W - 1).size) laxThreshold++;
      } else if (d > D && mu[d] && betaVec(n / d, W).size) {
        windowTerms++; if (d > dMax) dMax = d;
      }
    }
    assert(same(coeff(n, W, D, null), coeff(n, W, D, Dplus)));
  }
  assert(dMax > D);
  for (let n = x / 2 - b + 1; n <= top; n++)
    if (!same(coeff(n, W, D, dMax - 1), coeff(n, W, D, Dplus))) topLoss++;
}
assert(aboveCutSeen > 0); controls.add('squarefree divisors above the upper cut exist');
assert(windowTerms > 0); controls.add('the retained divisor window is non-empty');
assert(topLoss > 0); controls.add('the top of the retained window is load-bearing');
assert(laxThreshold > 0); controls.add('a non-strict r>=W threshold breaks the same floor');

// ---------------------------------------------------------------- F2
let diagonalChecks = 0; const shiftsSeen = new Set();
const f2 = [[4096, 256, 7], [4096, 512, 3], [2048, 128, 5]];
for (const [x, D, W] of f2) {
  const S = Array(X + 1).fill(0);
  for (let m = 1; m <= X; m++) S[m] = S[m - 1] + M(m, D) ** 2;
  const Spref = y => S[Math.min(X, Math.floor(y))];
  for (const b of [0, 2]) {
    const lo = x / 2 - b, hi = x - b;
    for (const p of primes) {
      if (p <= W || p >= x / D) continue;                 // the note's range W<p<R
      let lhs = 0;
      for (let m = 2; p * m <= hi; m++) if (p * m > lo) lhs += M(m, D) ** 2;
      assert.equal(lhs, Spref(hi / p) - Spref(lo / p));
      assert.equal(2 * (hi - lo), x);                     // the shift b cancels exactly
      assert(lo / p > 1);                                 // m=1 lies outside I here
      diagonalChecks++; shiftsSeen.add(b);
    }
  }
}
assert.equal(shiftsSeen.size, 2);
// Control: above the prime band m=1 re-enters and the m>=2 sum differs from the
// prefix difference by exactly M(1,D)^2=1. Outside the note's range: a control.
{
  const D = 10, x = 100, p = 97;
  const S = m => { let s = 0; for (let j = 1; j <= m; j++) s += M(j, D) ** 2; return s; };
  for (const b of [0, 2]) {
    const lo = x / 2 - b, hi = x - b;
    let lhs = 0;
    for (let m = 2; p * m <= hi; m++) if (p * m > lo) lhs += M(m, D) ** 2;
    assert(lo / p < 1 && hi / p >= 1);
    assert.equal(S(Math.floor(hi / p)) - S(Math.floor(lo / p)) - lhs, M(1, D) ** 2);
  }
  controls.add('m=1 re-enters above the prime band');
}

// ---------------------------------------------------------------- F3
const Q = (a, b) => [BigInt(a), BigInt(b)];
const mulq = ([a, b], [c, d]) => [a * c, b * d];
const subq = ([a, b], [c, d]) => [a * d - c * b, b * d];
const leq = ([a, b], [c, d]) => a * d <= c * b;            // positive denominators
let algebraChecks = 0, weakerFailed = 0;
const etas = [[1, 400], [1, 3000], [1, 100000], [7, 20000], [1, 2880], [1, 2]];
const L0s = [[4407, 10000], [1, 10], [1, 2]], Bs = [[1, 1], [3, 2], [10, 1]];
for (const w of [[6, 25], [1, 20]]) for (const l of L0s) for (const bb of Bs) {
  const Wq = Q(w[0], w[1]), Lq = Q(l[0], l[1]), Bq = Q(bb[0], bb[1]);
  const LW = mulq(Lq, Wq);
  const threshold = [LW[0] * Bq[1], LW[1] * 144n * Bq[0]];   // L_0 w / (144 B)
  const weak = [LW[0] * Bq[1], LW[1] * 72n * Bq[0]];         // deliberately wrong
  for (const e of etas) {
    const Eq = Q(e[0], e[1]);
    const cross = mulq(mulq(Q(9, 1), Bq), mulq(Eq, Eq));     // 9 B eta^2
    const half = mulq(LW, [Eq[0], Eq[1] * 16n]);             // L_0 w eta / 16
    const diag = mulq(LW, [Eq[0], Eq[1] * 8n]);              // L_0 w eta / 8
    assert.equal(leq(cross, half), leq(Eq, threshold));
    // under the restriction the retained margin (16) is at least L_0 w eta/16
    if (leq(Eq, threshold)) assert(leq(half, subq(diag, cross)));
    if (leq(cross, half) !== leq(Eq, weak)) weakerFailed++;
    algebraChecks++;
  }
  const alt = [Lq[0] * Bq[1], Lq[1] * 2880n * Bq[0]];        // L_0 / (2880 B)
  const eta0 = leq(Q(1, 400), alt) ? Q(1, 400) : alt;        // min(1/400, .)
  assert(eta0[0] > 0n && leq(eta0, threshold));              // admissible for both w
}
assert(weakerFailed > 0); controls.add('the 144B threshold is not interchangeable with 72B');

const required = ['squarefree divisors above the upper cut exist',
  'the retained divisor window is non-empty',
  'the top of the retained window is load-bearing',
  'a non-strict r>=W threshold breaks the same floor',
  'm=1 re-enters above the prime band',
  'the 144B threshold is not interchangeable with 72B'];
for (const key of required) assert(controls.has(key), `inactive control: ${key}`);
console.log('Review falsifiers F1-F3 PASS: no defect found in the checked steps');
console.log(`F1 upper-cut redundancy points: ${redundancyPoints}; squarefree divisors above the cut: ${aboveCutSeen}; retained-window terms: ${windowTerms}; coefficients lost by tightening to the top divisor: ${topLoss}; lax-threshold violations: ${laxThreshold}`);
console.log(`F2 shifted diagonal identities: ${diagonalChecks}, over both shifts b=0 and b=2`);
console.log(`F3 exact rational (16) equivalences: ${algebraChecks}; grid points where the 72B variant disagrees: ${weakerFailed}`);
console.log(`Active controls (${required.length}): ${required.join('; ')}`);
console.log('The uniform mean-square inputs (3)-(4), Graham (10), PNT and every implied constant remain unverified by this script.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/transition-energy-review-validation.js
//   invocation:  node research/transition-energy-review-validation.js
//   code-sha256: d84be60021cb2550492436bed5194336fa307c1df6ea3de6eede54834dee2d94
//   out-sha256:  8963164f46d62068663b5ac79dcec9c97979eec0abc0ace744b227b3dde30e36
//   body-lines:  6
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// Review falsifiers F1-F3 PASS: no defect found in the checked steps
// F1 upper-cut redundancy points: 12053; squarefree divisors above the cut: 7319; retained-window terms: 1490; coefficients lost by tightening to the top divisor: 4; lax-threshold violations: 393
// F2 shifted diagonal identities: 14, over both shifts b=0 and b=2
// F3 exact rational (16) equivalences: 108; grid points where the 72B variant disagrees: 3
// Active controls (6): squarefree divisors above the upper cut exist; the retained divisor window is non-empty; the top of the retained window is load-bearing; a non-strict r>=W threshold breaks the same floor; m=1 re-enters above the prime band; the 144B threshold is not interchangeable with 72B
// The uniform mean-square inputs (3)-(4), Graham (10), PNT and every implied constant remain unverified by this script.
// ============================================================================
// READINGS
// Exact finite identities, active counterexamples and exact rational algebra
// only. The imported mean-square theorems, PNT and every asymptotic constant
// are checked against their primary sources in transition-energy-review.md,
// not here.
