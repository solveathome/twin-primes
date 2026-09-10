// ============================================================================
// ATTACK 9 — CHEN-STYLE ALMOST-TWINS: the price curve of the last step
// ============================================================================
// Chen (1973): infinitely many primes r with r+2 prime OR semiprime. Sieve
// methods certify "r+2 has no small factors"; parity blocks "r+2 prime".
// Measure the interpolation inside zones: for primes r in (p, p^2), count
// N(theta) = #{r : smallest prime factor of r+2 > p^theta}.
// theta=1 is exactly the twins. The shape of N(theta) — and especially the
// drop from theta just below 1 to 1 — prices the parity step numerically.
// ============================================================================

const LIMIT = 100_000_000;
const s = new Uint8Array(LIMIT + 3);
for (let i = 2; i * i <= LIMIT + 2; i++) if (!s[i]) for (let j = i * i; j <= LIMIT + 2; j += i) s[j] = 1;
const primes = []; for (let i = 2; i <= 10000; i++) if (!s[i]) primes.push(i);

function run(p){
  const zoneEnd = p*p;
  const TH = [0.25, 0.5, 0.75, 0.9, 1.0];
  const counts = new Array(TH.length).fill(0);
  let zonePrimes = 0;
  for (let r = p+1; r + 2 < zoneEnd; r++){
    if (s[r]) continue;
    zonePrimes++;
    // smallest prime factor of r+2 (r+2 < p^2, so spf <= p or r+2 is prime)
    const m = r + 2;
    let spf = m; // prime => spf = itself
    for (const q of primes){ if (q*q > m) break; if (m % q === 0){ spf = q; break; } }
    for (let i = 0; i < TH.length; i++) if (spf > Math.pow(p, TH[i])) counts[i]++;
  }
  console.log(`p=${p}  zone primes=${zonePrimes}  N(theta)=` +
    TH.map((t,i)=>`${t}:${counts[i]}`).join('  ') +
    `  [theta=1 = true twins]  N(0.9)/N(1)=${(counts[3]/counts[4]).toFixed(2)}`);
}
for (const p of [499, 1009, 3001]) run(p);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-09-chen-theta.js
//   invocation:  node research/attack-09-chen-theta.js
//   code-sha256: 7e7bf3e2c38e6ca70f89713cd23619105b566969bde10eb199f13aa496f6494e
//   out-sha256:  eea3b1007f34e5d25fa6167439ee2c1aa6df93bd815d3d8eebfa4dcec83d8c71
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.7 s
// ============================================================================
// p=499  zone primes=21869  N(theta)=0.25:10955  0.5:5007  0.75:3385  0.9:2756  1:2557  [theta=1 = true twins]  N(0.9)/N(1)=1.08
// p=1009  zone primes=79661  N(theta)=0.25:29881  0.5:16185  0.75:11149  0.9:8935  1:8278  [theta=1 = true twins]  N(0.9)/N(1)=1.08
// p=3001  zone primes=602398  N(theta)=0.25:188290  0.5:108695  0.75:73755  0.9:58703  1:53804  [theta=1 = true twins]  N(0.9)/N(1)=1.09
// READINGS.
// 1. THE PARITY STEP COSTS 8%. Requiring spf(r+2) > p^0.9 (deep sieve
//    territory) vs r+2 actually prime loses only ~8% of candidates — stable
//    across levels. The objects that parity forever separates from twins are
//    a thin skim, numerically.
// 2. Chen-flavored territory (theta ~ 0.5, r+2 rough) holds almost exactly
//    2.0x the twins at every level — the sieve-countable population is only
//    a factor ~2 above the target population. Matches the known lore that
//    parity costs exactly a factor 2 in the linear sieve; here that factor
//    is visible in raw zone data.
// 3. The N(theta) curve is smooth with no cliff — nothing in the data marks
//    theta=1 as special except the label "prime". The wall is invisible in
//    the statistics; it exists only in what can be CERTIFIED. Strong
//    narrative material: reality is indifferent to parity; only proofs feel it.
// ============================================================================
