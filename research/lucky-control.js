/* Lucky numbers of Ulam against the primes, at volume.
 * Lucky sieve: start 1..N, strike every 2nd slot; then read the value at the
 * next surviving position and strike every k-th slot; repeat. Positional, not
 * divisibility. */

const N = 10000000;

function lucky(N) {
  // Start from the odds, which is the first pass already applied.
  let L = new Int32Array(Math.ceil(N / 2));
  let n = 0;
  for (let v = 1; v <= N; v += 2) L[n++] = v;
  L = L.subarray(0, n);
  let i = 1;
  while (i < L.length && L[i] <= L.length) {
    const k = L[i];
    const out = new Int32Array(L.length);
    let m = 0;
    for (let j = 0; j < L.length; j++) if ((j + 1) % k !== 0) out[m++] = L[j];
    L = out.subarray(0, m);
    i++;
  }
  return L;
}

function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (s[i]) continue; o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  return o;
}

const t0 = Date.now();
const L = lucky(N);
const P = primesUpTo(N);
console.log('N = ' + N.toLocaleString() + '   (' + (Date.now() - t0) + ' ms)\n');

// counts at decades
console.log('counts');
console.log('  x            lucky(x)      pi(x)      ratio    x/ln x');
for (let x = 10; x <= N; x *= 10) {
  let lc = 0; for (let j = 0; j < L.length; j++) if (L[j] <= x) lc++; else break;
  let pc = 0; for (let j = 0; j < P.length; j++) if (P[j] <= x) pc++; else break;
  console.log('  ' + String(x).padStart(11) + String(lc).padStart(12) + String(pc).padStart(12) +
    (lc / pc).toFixed(4).padStart(10) + (x / Math.log(x)).toFixed(0).padStart(11));
}

// twins
function twins(arr) {
  let c = 0;
  for (let j = 0; j + 1 < arr.length; j++) if (arr[j + 1] - arr[j] === 2) c++;
  return c;
}
console.log('\ntwin pairs (difference exactly 2)');
console.log('  lucky twins: ' + twins(L).toLocaleString());
console.log('  prime twins: ' + twins(P).toLocaleString());
console.log('  ratio: ' + (twins(L) / twins(P)).toFixed(4));

// largest gap
function maxGap(arr) {
  let g = 0, at = 0;
  for (let j = 0; j + 1 < arr.length; j++) if (arr[j + 1] - arr[j] > g) { g = arr[j + 1] - arr[j]; at = arr[j]; }
  return { g: g, at: at };
}
const gl = maxGap(L), gp = maxGap(P);
console.log('\nlargest gap below N');
console.log('  lucky: ' + gl.g + ' after ' + gl.at.toLocaleString());
console.log('  prime: ' + gp.g + ' after ' + gp.at.toLocaleString());

// overlap
const setP = new Set(P);
let both = 0;
for (let j = 0; j < L.length; j++) if (setP.has(L[j])) both++;
console.log('\nagreement');
console.log('  lucky total ' + L.length.toLocaleString() + ', prime total ' + P.length.toLocaleString());
console.log('  members of both: ' + both.toLocaleString() +
  '  (' + (100 * both / L.length).toFixed(1) + '% of luckies are prime)');
console.log('  expected overlap if independent at these densities: ' +
  Math.round(L.length * P.length / N).toLocaleString());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/lucky-control.js
//   invocation:  node research/lucky-control.js
//   code-sha256: 92cd7ae4ad32af1ed8e8452c792a71f490a37d8ed55e7c9b5bea1b5431b39ccf
//   out-sha256:  30e43345510634f6dae8694396ec2cf593fa72aa2d4eb05af1e25637a27e1a9b
//   body-lines:  25
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     76.4 s
// ============================================================================
// N = 10,000,000   (76183 ms)
//
// counts
//   x            lucky(x)      pi(x)      ratio    x/ln x
//            10           4           4    1.0000          4
//           100          23          25    0.9200         22
//          1000         153         168    0.9107        145
//         10000        1118        1229    0.9097       1086
//        100000        8772        9592    0.9145       8686
//       1000000       71918       78498    0.9162      72382
//      10000000      609237      664579    0.9167     620421
//
// twin pairs (difference exactly 2)
//   lucky twins: 55,548
//   prime twins: 58,980
//   ratio: 0.9418
//
// largest gap below N
//   lucky: 182 after 8,825,911
//   prime: 154 after 4,652,353
//
// agreement
//   lucky total 609,237, prime total 664,579
//   members of both: 62,446  (10.2% of luckies are prime)
//   expected overlap if independent at these densities: 40,489
// ============================================================================
// READINGS
// ============================================================================
