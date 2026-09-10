// Scoping: can Brady/Li fractional retention rules be applied at kappa = 2?
//
// Companion computation for research/history/staging/scope-fractional-retention.md.
// Brady, "Sieves and iteration rules", Stanford PhD 2017, section 9.6 (p. 133),
// states the applicability window for his Corollary 10 (the upper-bound
// retention rule of Theorem 34, p. 109, which Runbo Li arXiv:2504.07974
// Theorem 2.3 generalises):
//
//   "When kappa = 3/2, we have alpha^D_kappa = 3.9114..., beta^D_kappa =
//    3.11582... In particular, we have alpha^D_kappa < beta^D_kappa + 1, so
//    Corollary 10 can be applied to s in the range alpha^D_kappa < s <
//    beta^D_kappa + 1 with t = s/(s - beta^D_kappa)."
//
// The window is (alpha_kappa, beta_kappa + 1). Diamond-Halberstam 2008 p. 77
// proves alpha_kappa >= beta_kappa + 1 for kappa >= 2, so the window is empty
// at every kappa >= 2, ours included. This script prints the two windows and
// prices what the surviving half of the rule family could be worth.
//
// Run: node research/scope-fractional-retention.js
// No dependencies, instant.

'use strict';

// Third-party constants. Sources, in order:
//   alpha_2, beta_2 (20 decimals): Booker-Browning arXiv:1511.00601 ancillary
//     table, quoted verbatim in research/dhr-verification.md section 1.1.
//   alpha, beta at kappa = 3/2, and the three improved beta(3/2) values:
//     Brady thesis section 9.6, p. 133.
const DHR = {
  '3/2': { alpha: 3.9114, beta: 3.11582 },
  '2': { alpha: 5.35772744559446184227, beta: 4.26645028414864191641 },
};

// Brady's realised improvements at kappa = 3/2, section 9.6 p. 133.
const BRADY_32 = {
  baseline: 3.11582, // DHR
  cor10only: 3.11570, // upper-bound retention rule (Theorem 34) alone
  cor11only: 3.11554, // lower-bound retention rule (Theorem 35) alone
  combined: 3.11549, // both, iteratively combined
};

const f = (x, n = 6) => x.toFixed(n);

console.log('=== 1. Corollary 10 applicability window (alpha_kappa, beta_kappa + 1) ===\n');
for (const k of ['3/2', '2']) {
  const { alpha, beta } = DHR[k];
  const width = beta + 1 - alpha;
  console.log(
    `kappa = ${k.padEnd(3)}  alpha = ${f(alpha, 8)}  beta + 1 = ${f(beta + 1, 8)}  ` +
      `width = ${width >= 0 ? ' ' : ''}${f(width, 8)}  ${width > 0 ? 'NONEMPTY' : 'EMPTY'}`
  );
}
console.log(
  '\nDiamond-Halberstam 2008 p. 77: alpha_kappa >= beta_kappa + 1 for kappa >= 2.'
);
console.log(
  'So the emptiness at kappa = 2 is a theorem, not a numerical accident, and it'
);
console.log('holds at every kappa >= 2. The crossover sits between 3/2 and 2.\n');

console.log('=== 2. What the rules actually bought where they were run ===\n');
const gain = (v) => BRADY_32.baseline - v;
const rel = (v) => gain(v) / BRADY_32.baseline;
for (const [name, v] of [
  ['Cor 10 alone (upper rule)', BRADY_32.cor10only],
  ['Cor 11 alone (lower rule)', BRADY_32.cor11only],
  ['both combined', BRADY_32.combined],
]) {
  console.log(
    `${name.padEnd(28)} beta(3/2) ${f(BRADY_32.baseline, 5)} -> ${f(v, 5)}  ` +
      `absolute ${f(gain(v), 5)}  relative ${rel(v).toExponential(3)}`
  );
}

console.log('\n=== 3. Transfer to kappa = 2, at the same relative yield ===\n');
const b2 = DHR['2'].beta;
const projFull = b2 * rel(BRADY_32.combined);
const projCor11 = b2 * rel(BRADY_32.cor11only);
console.log(`beta_2 baseline                      ${f(b2, 8)}`);
console.log(`projected gain, whole rule family    ${projFull.toExponential(3)}`);
console.log(
  `projected gain, Cor-11 half only      ${projCor11.toExponential(3)}   <- the half that survives kappa >= 2`
);
console.log(`projected beta_2                     ${f(b2 - projCor11, 8)}`);

console.log('\n=== 4. Against the two gaps that matter ===\n');
const gapToTPC = b2 - 2; // exponent 2 is the twin-prime-strength target
const gapToSelberg = b2 - 4; // Selberg's conjectured sifting limit 2*kappa = 4
console.log(`gap 4.26645 -> 2 (twin-strength)     ${f(gapToTPC, 6)}`);
console.log(
  `  fraction closed by this door        ${(projCor11 / gapToTPC).toExponential(3)}  ` +
    `(${f((100 * projCor11) / gapToTPC, 4)} %)`
);
console.log(`gap 4.26645 -> 4 (Selberg's 2*kappa) ${f(gapToSelberg, 6)}`);
console.log(
  `  fraction closed by this door        ${(projCor11 / gapToSelberg).toExponential(3)}  ` +
    `(${f((100 * projCor11) / gapToSelberg, 4)} %)`
);

console.log(
  '\nVerdict: the surviving half of the rule family projects to about 4e-4 of\n' +
    'exponent, which is 0.02 % of the distance to twin-prime strength. The door\n' +
    'opens onto a band the project has already priced as not worth entering.'
);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/scope-fractional-retention.js
//   invocation:  node research/scope-fractional-retention.js
//   code-sha256: 562991c7dbdf63135e45eb7ffd1a5d5650996ca23818cdcf876910a0c433a782
//   out-sha256:  d0b7e0d0dc881bd1e2e56c24ee5bb40c66b67ff7195e59a04a58dbeade0f0c3d
//   body-lines:  32
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     0.1 s
// ============================================================================
// === 1. Corollary 10 applicability window (alpha_kappa, beta_kappa + 1) ===
//
// kappa = 3/2  alpha = 3.91140000  beta + 1 = 4.11582000  width =  0.20442000  NONEMPTY
// kappa = 2    alpha = 5.35772745  beta + 1 = 5.26645028  width = -0.09127716  EMPTY
//
// Diamond-Halberstam 2008 p. 77: alpha_kappa >= beta_kappa + 1 for kappa >= 2.
// So the emptiness at kappa = 2 is a theorem, not a numerical accident, and it
// holds at every kappa >= 2. The crossover sits between 3/2 and 2.
//
// === 2. What the rules actually bought where they were run ===
//
// Cor 10 alone (upper rule)    beta(3/2) 3.11582 -> 3.11570  absolute 0.00012  relative 3.851e-5
// Cor 11 alone (lower rule)    beta(3/2) 3.11582 -> 3.11554  absolute 0.00028  relative 8.986e-5
// both combined                beta(3/2) 3.11582 -> 3.11549  absolute 0.00033  relative 1.059e-4
//
// === 3. Transfer to kappa = 2, at the same relative yield ===
//
// beta_2 baseline                      4.26645028
// projected gain, whole rule family    4.519e-4
// projected gain, Cor-11 half only      3.834e-4   <- the half that survives kappa >= 2
// projected beta_2                     4.26606688
//
// === 4. Against the two gaps that matter ===
//
// gap 4.26645 -> 2 (twin-strength)     2.266450
//   fraction closed by this door        1.692e-4  (0.0169 %)
// gap 4.26645 -> 4 (Selberg's 2*kappa) 0.266450
//   fraction closed by this door        1.439e-3  (0.1439 %)
//
// Verdict: the surviving half of the rule family projects to about 4e-4 of
// exponent, which is 0.02 % of the distance to twin-prime strength. The door
// opens onto a band the project has already priced as not worth entering.
// ============================================================================
// READINGS
// ============================================================================
