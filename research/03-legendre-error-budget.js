// ============================================================================
// 03 — THE FORMULA THAT KNOWS BUT CANNOT PROVE (Legendre's error budget)
// ============================================================================
//
// There IS an exact formula for the number of twin slots in any window:
// Legendre's inclusion–exclusion over the squarefree divisors of the
// primorial. Its main term is exactly the fair share
//     x * (1/2) * prod_{2<q<=p} (1 - 2/q),
// and every one of the 2*3^n correction terms carries a rounding error of at
// most 1 (x/d is not an integer). Individually harmless; collectively the
// certified error budget is 2*3^n — exponential — while the signal in the
// zone is only ~p^2/ln^2 p.
//
// This script compares, per level: the EXACT count (direct sieve of the
// window), the MAIN TERM, and the certified ERROR BUDGET. The point:
// observed cancellation is near-perfect (~1-2 units), certified cancellation
// is nonexistent. A century of sieve theory (Brun's truncation, Selberg's
// weights, the large sieve) is the project of shrinking this budget; the
// parity problem is the proof that it cannot be squeezed below the signal
// for lower bounds on twins.
// ============================================================================

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const P = primesUpTo(200);

function stats(pn){
  const idx = P.indexOf(pn), pNext = P[idx+1], x = pNext*pNext;
  // exact: sieve window by primes <= pn, count twin-slot pairs (r, r+2)
  const hit = new Uint8Array(x+3);
  for(let i=0;i<=idx;i++){const p=P[i];for(let j=p;j<x+3;j+=p)hit[j]=1}
  let exact=0; for(let r=3;r+2<x;r++) if(!hit[r]&&!hit[r+2]) exact++;
  // main term of Legendre's identity
  let dens=0.5; for(let i=1;i<=idx;i++) dens*=(P[i]-2)/P[i];
  const main = dens*x;
  // error budget: one bounded-by-1 term per squarefree divisor/residue combo
  const terms = 2*Math.pow(3, idx);
  console.log(`p_n=${pn}  window=${x}  exact=${exact}  main=${main.toFixed(1)}  error budget=±${terms}  budget/main=${(terms/main).toFixed(1)}x`);
}
for (const p of [7,11,13,17,19,23,29,31,37,41]) stats(p);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/03-legendre-error-budget.js
//   invocation:  node research/03-legendre-error-budget.js
//   code-sha256: b81734cdf233630b916689d428745ddae86a8684f9fe82f84f06eb1ef8e47e75
//   out-sha256:  95d359269dc8f26223289d4c1ec36dea7c7489dfbc2ea0cc10ee76882e8a1f53
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// p_n=7  window=121  exact=8  main=8.6  error budget=±54  budget/main=6.2x
// p_n=11  window=169  exact=9  main=9.9  error budget=±162  budget/main=16.4x
// p_n=13  window=289  exact=16  main=14.3  error budget=±486  budget/main=34.0x
// p_n=17  window=361  exact=17  main=15.8  error budget=±1458  budget/main=92.6x
// p_n=19  window=529  exact=21  main=20.7  error budget=±4374  budget/main=211.8x
// p_n=23  window=841  exact=29  main=30.0  error budget=±13122  budget/main=437.7x
// p_n=29  window=961  exact=30  main=31.9  error budget=±39366  budget/main=1234.3x
// p_n=31  window=1369  exact=41  main=42.5  error budget=±118098  budget/main=2778.7x
// p_n=37  window=1681  exact=48  main=49.4  error budget=±354294  budget/main=7176.7x
// p_n=41  window=1849  exact=50  main=51.7  error budget=±1062882  budget/main=20577.8x
// ============================================================================
// READINGS
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// READING. Reality: exact hugs the main term to within ~2 at every level —
// the roundings cancel almost perfectly. Certification: the provable budget
// is already 20,000x the signal at p_n=41 and grows like 3^n against p^2.
// The formula knows the answer; it cannot certify the answer is positive.
// This is the quantitative anatomy of the wall.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// DERIVED IN THIS READING: 20,000x is the ratio of the printed provable budget
//   to the printed signal at p_n = 41, formed in the reading from two printed
//   columns. The run prints both terms and not their quotient.
// ---------------------------------------------------------------------------
