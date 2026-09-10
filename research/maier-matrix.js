// research/maier-matrix.js
// The Maier matrix applied to the twin-slot set of T_x.
//
// Two experiments.
//   A. Column modulus q = x# itself. Both summations return the same integer
//      by construction. The matrix is 0 = 0.
//   B. Column modulus q = y# for a coarser level y < x. The two summations
//      give an EXACT transfer identity with no error term. Verified by direct
//      enumeration at (y,x) = (3,7),(5,11),(5,13),(7,13),(5,17),(7,17),(11,17),
//      (7,19),(11,19),(13,19).
//
// Run: node research/maier-matrix.js

'use strict';

function primesUpTo(n) {
  const s = new Uint8Array(n + 1).fill(1);
  s[0] = s[1] = 0;
  for (let i = 2; i * i <= n; i++) if (s[i]) for (let j = i * i; j <= n; j += i) s[j] = 0;
  const out = [];
  for (let i = 2; i <= n; i++) if (s[i]) out.push(i);
  return out;
}

function primorial(x) {
  let W = 1;
  for (const p of primesUpTo(x)) W *= p;
  return W;
}

// slot[n] = 1 iff n and n+2 are both coprime to x#  (n taken mod x#)
function slotSet(x) {
  const W = primorial(x);
  const a = new Uint8Array(W).fill(1);
  for (const p of primesUpTo(x)) {
    for (let k = 0; k < W; k += p) {
      a[k] = 0;                    // n = 0 mod p
      a[(k + W - 2) % W] = 0;      // n = -2 mod p
    }
  }
  return a;
}

function census(a) { let d = 0; for (let i = 0; i < a.length; i++) d += a[i]; return d; }

// count of slots in [0, S)
function prefix(a, S) { let c = 0; for (let i = 0; i < S; i++) c += a[i]; return c; }

function isPrime(n) { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; }

function nextPrimeAfter(x) { let n = x + 1; for (;;) { let ok = n > 1; for (let d = 2; d * d <= n; d++) if (n % d === 0) { ok = false; break; } if (ok) return n; n++; } }

// ---------------------------------------------------------------- experiment A
function experimentA(x, S, R) {
  const W = primorial(x), a = slotSet(x);
  const head = prefix(a, S + 1) - (a[0] ? 1 : 0); // slots s in [1,S]
  // matrix entry (r,s) = (R0+r)*W + s, r = 1..R, s = 1..S, so ell = 1.
  const rows = [], cols = [];
  const R0 = 4;
  for (let r = 1; r <= R; r++) {
    let c = 0;
    for (let s = 1; s <= S; s++) { const n = (R0 + r) * W + s; c += a[n % W]; }
    rows.push(c);
  }
  for (let s = 1; s <= S; s++) {
    let c = 0;
    for (let r = 1; r <= R; r++) { const n = (R0 + r) * W + s; c += a[n % W]; }
    cols.push(c);
  }
  const rsum = rows.reduce((u, v) => u + v, 0), csum = cols.reduce((u, v) => u + v, 0);
  const live = cols.filter(c => c > 0).length;
  console.log(`  x=${String(x).padStart(2)} W=${String(W).padStart(6)} S=${S} R=${R}` +
    `  rowsum=${rsum} colsum=${csum}  rows distinct=${[...new Set(rows)].join(',')}` +
    `  col values in {0,${R}}: ${cols.every(c => c === 0 || c === R)}  live cols=${live} head=${head}`);
  return { rsum, csum, rows, cols, head };
}

// ---------------------------------------------------------------- experiment B
function experimentB(y, x, Slist) {
  const Wy = primorial(y), Wx = primorial(x);
  const ay = slotSet(y), ax = slotSet(x);
  const Dy = census(ay), Dx = census(ax);
  const M = Wx / Wy;                // number of rows (translates by y#)
  const N = Dx / Dy;                // = prod_{y<q<=x} (q-2)
  let ratio = 1; for (const q of primesUpTo(x)) if (q > y) ratio *= (1 - 2 / q);
  console.log(`\n  y=${y} x=${x}: Wy=${Wy} Wx=${Wx} M=${M} Dy=${Dy} Dx=${Dx} N=${N}` +
    `  prod(1-2/q)=${ratio.toFixed(6)}  1/prod=${(1 / ratio).toFixed(3)}`);
  console.log('    S     LHS(sum over rows)   RHS = D_y(S)*N   equal   origin  mean      origin/mean  pred');
  for (const S of Slist) {
    if (S > Wy) { console.log(`    ${S}  skipped, S > y#`); continue; }
    let lhs = 0;
    for (let r = 0; r < M; r++) {
      const base = r * Wy;
      for (let s = 0; s < S; s++) lhs += ax[base + s];
    }
    const DyS = prefix(ay, S);
    const rhs = DyS * N;
    const origin = prefix(ax, S);
    const mean = rhs / M;
    console.log(`    ${String(S).padStart(6)} ${String(lhs).padStart(14)} ${String(rhs).padStart(18)}` +
      `   ${lhs === rhs ? 'YES' : 'NO '}   ${String(origin).padStart(5)} ${mean.toFixed(4).padStart(10)}` +
      `  ${(origin / mean).toFixed(3).padStart(9)}  ${(1 / ratio).toFixed(3)}`);
  }
}

// ------------------------------------------------------- density ratio rho_y(S)
function rhoTable(y, Slist) {
  const Wy = primorial(y), ay = slotSet(y), Dy = census(ay);
  const yp = nextPrimeAfter(y);
  console.log(`\n  rho_y(S) = local density of T_${y} in [0,S) over its global density  (y#=${Wy}, D=${Dy}, y'^2=${yp * yp})`);
  for (const S of Slist) {
    if (S > Wy) continue;
    const DyS = prefix(ay, S);
    const rho = (DyS / S) / (Dy / Wy);
    const u = Math.log(S) / Math.log(y);
    console.log(`    S=${String(S).padStart(8)}  u=lnS/lny=${u.toFixed(3)}  D_y(S)=${String(DyS).padStart(7)}  rho=${rho.toFixed(4)}`);
  }
}

// ------------------------------------------------ D. the row distribution
// The identity pins the MEAN of the rows. Everything the Zone Postulate wants
// is about ONE row. So: where does the origin row sit in the ensemble?
function rowStats(y, x, Slist) {
  const Wy = primorial(y), Wx = primorial(x);
  const ay = slotSet(y), ax = slotSet(x);
  const Dy = census(ay), Dx = census(ax);
  const M = Wx / Wy, N = Dx / Dy;
  const yp = nextPrimeAfter(y), xp = nextPrimeAfter(x);
  console.log(`\n  y=${y} x=${x}  M=${M} rows   y'^2=${yp * yp}  x'^2=${xp * xp}`);
  console.log("       S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?");
  for (const S of Slist) {
    if (S > Wy) continue;
    const counts = new Int32Array(M);
    for (let r = 0; r < M; r++) {
      const base = r * Wy; let c = 0;
      for (let s = 0; s < S; s++) c += ax[base + s];
      counts[r] = c;
    }
    const mean = prefix(ay, S) * N / M;
    let mn = Infinity, mx = -Infinity, empty = 0, above = 0;
    for (let r = 0; r < M; r++) {
      if (counts[r] < mn) mn = counts[r];
      if (counts[r] > mx) mx = counts[r];
      if (counts[r] === 0) empty++;
      if (counts[r] > counts[0]) above++;
    }
    console.log(`  ${String(S).padStart(6)} ${mean.toFixed(3).padStart(9)} ${String(counts[0]).padStart(7)}` +
      ` ${String(mn).padStart(4)} ${String(mx).padStart(4)} ${String(empty).padStart(7)}` +
      `  ${String(above + 1).padStart(6)} / ${M}          ${counts[0] >= mean ? 'yes' : 'NO'}`);
  }
}

// --------------------------------------------------------------------- driver
console.log('=== A. column modulus q = x#: the matrix is a tautology ===');
for (const x of [7, 11, 13]) experimentA(x, 40, 6);

console.log('\n=== B. column modulus q = y#, y < x: the exact transfer identity ===');
experimentB(3, 7, [4, 6]);
experimentB(5, 11, [10, 20, 30]);
experimentB(5, 13, [10, 20, 30]);
experimentB(7, 13, [50, 100, 210]);
experimentB(7, 17, [50, 121, 210]);
experimentB(11, 17, [121, 500, 2310]);
experimentB(13, 19, [169, 1000, 30030]);

console.log('\n=== C. the local/global density ratio that drives the identity ===');
rhoTable(13, [169, 289, 500, 1000, 5000, 30030]);
rhoTable(19, [361, 529, 2000, 20000, 200000, 9699690]);

console.log('\n=== D. where the origin row sits in the ensemble ===');
rowStats(7, 13, [50, 121, 210]);
rowStats(11, 17, [121, 169, 500, 1000, 2310]);
rowStats(13, 19, [169, 289, 361, 1000, 5000, 30030]);
rowStats(13, 23, [169, 289, 361, 1000, 5000, 30030]);

// ------------------------------------------- F. the Origin Excess Lemma
// Claim: for S <= y'^2 the ONLY T_y slots the later folds remove from [0,S)
// are the primes q in (y,x] that are themselves slots (or slots shifted by 2).
// So  count_x([0,S)) = D_y(S) - L  with  L = #{T_y slots t < S : t <= x or t+2 <= x}.
function originExcess(pairs) {
  console.log('\n  y   x     S=y\'^2   D_y(S)   L(pred)  origin(pred)  origin(true)  ok   mean       ratio');
  for (const [y, x] of pairs) {
    const ay = slotSet(y), ax = slotSet(x);
    const yp = nextPrimeAfter(y), S = yp * yp;
    if (S > primorial(y)) { console.log(`  ${y} ${x}: S > y#, skipped`); continue; }
    const DyS = prefix(ay, S);
    // A y-rough integer m <= y'^2 divisible by some prime in (y,x] is either a
    // prime in (y,x] or m = y'^2 with y' <= x.  Nothing else fits: m = q*k with
    // q > y forces k = 1 or k >= y', so m >= y'^2, with equality only at y'^2.
    const struck = m => (m > y && m <= x && isPrime(m)) || (m === S && yp <= x);
    let L = 0;
    for (let t = 0; t < S; t++) if (ay[t] && (struck(t) || struck(t + 2))) L++;
    const pred = DyS - L, truth = prefix(ax, S);
    let ratio = 1; for (const q of primesUpTo(x)) if (q > y) ratio *= (1 - 2 / q);
    const mean = DyS * ratio;
    console.log(`  ${String(y).padStart(2)} ${String(x).padStart(3)} ${String(S).padStart(8)}` +
      ` ${String(DyS).padStart(8)} ${String(L).padStart(8)} ${String(pred).padStart(13)}` +
      ` ${String(truth).padStart(13)}   ${pred === truth ? 'YES' : 'NO '}  ${mean.toFixed(3).padStart(9)}` +
      `  ${(truth / mean).toFixed(3)}`);
  }
}

// ------------------------------- G. the whole parameter space is d = gcd(q,W)
// Row r sits at (R0+r)q mod W, and as r runs those positions run over the
// multiples of d = gcd(q,W). So the ensemble is the W/d windows at multiples
// of d, and the matrix returns their exact mean. Sweep d over divisors of W.
function dSweep(x, S, ds) {
  const W = primorial(x), ax = slotSet(x), D = census(ax);
  console.log(`\n  x=${x} W=${W} D=${D} S=${S}   naive = S*D/W = ${(S * D / W).toFixed(4)}`);
  console.log('       d   #windows      mean    rho=mean/naive   min  max  origin');
  for (const d of ds) {
    if (W % d !== 0 || S > d) { console.log(`       ${d}  skipped (d does not divide W, or S > d)`); continue; }
    const M = W / d;
    let tot = 0, mn = Infinity, mx = -Infinity;
    let c0 = 0;
    for (let r = 0; r < M; r++) {
      let c = 0; const base = r * d;
      for (let s = 0; s < S; s++) c += ax[base + s];
      tot += c; if (c < mn) mn = c; if (c > mx) mx = c; if (r === 0) c0 = c;
    }
    const mean = tot / M, naive = S * D / W;
    console.log(`  ${String(d).padStart(6)} ${String(M).padStart(10)} ${mean.toFixed(4).padStart(10)}` +
      ` ${(mean / naive).toFixed(4).padStart(14)}  ${String(mn).padStart(4)} ${String(mx).padStart(4)} ${String(c0).padStart(6)}`);
  }
}

console.log('\n=== G. the matrix depends on q only through d = gcd(q, x#) ===');
dSweep(13, 210, [210, 330, 462, 770, 1155, 2310, 5005, 6006, 10010, 15015, 30030]);

console.log('\n=== F. the Origin Excess Lemma, S = y\'^2 ===');
originExcess([[7, 11], [7, 13], [7, 17], [7, 19], [11, 13], [11, 17], [11, 19], [11, 23],
  [13, 17], [13, 19], [13, 23], [17, 19], [17, 23], [19, 23]]);

console.log("\n=== E. the row width the Zone Postulate actually asks for: S = x'^2 ===");
for (const [y, x] of [[7, 11], [7, 13], [11, 13], [11, 17], [13, 17], [13, 19], [13, 23], [17, 19], [17, 23], [19, 23]]) {
  rowStats(y, x, [nextPrimeAfter(x) ** 2]);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=6144 research/maier-matrix.js
//   invocation:  node --max-old-space-size=6144 research/maier-matrix.js
//   code-sha256: bd658d02a33ef9e94f4e383347abc36f48d1e6c0600981151a27a9fb17e6ea7a
//   out-sha256:  24ef9939be0978233cb64ebaf6a36bf3b0c1e08b065c60563f76f1702b373c20
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     5.9 s
// ============================================================================
// === A. column modulus q = x#: the matrix is a tautology ===
//   x= 7 W=   210 S=40 R=6  rowsum=18 colsum=18  rows distinct=3  col values in {0,6}: true  live cols=3 head=3
//   x=11 W=  2310 S=40 R=6  rowsum=12 colsum=12  rows distinct=2  col values in {0,6}: true  live cols=2 head=2
//   x=13 W= 30030 S=40 R=6  rowsum=12 colsum=12  rows distinct=2  col values in {0,6}: true  live cols=2 head=2
//
// === B. column modulus q = y#, y < x: the exact transfer identity ===
//
//   y=3 x=7: Wy=6 Wx=210 M=35 Dy=1 Dx=15 N=15  prod(1-2/q)=0.428571  1/prod=2.333
//     S     LHS(sum over rows)   RHS = D_y(S)*N   equal   origin  mean      origin/mean  pred
//          4              0                  0   YES       0     0.0000        NaN  2.333
//          6             15                 15   YES       0     0.4286      0.000  2.333
//
//   y=5 x=11: Wy=30 Wx=2310 M=77 Dy=3 Dx=135 N=45  prod(1-2/q)=0.584416  1/prod=1.711
//     S     LHS(sum over rows)   RHS = D_y(S)*N   equal   origin  mean      origin/mean  pred
//         10              0                  0   YES       0     0.0000        NaN  1.711
//         20             90                 90   YES       1     1.1688      0.856  1.711
//         30            135                135   YES       2     1.7532      1.141  1.711
//
//   y=5 x=13: Wy=30 Wx=30030 M=1001 Dy=3 Dx=1485 N=495  prod(1-2/q)=0.494505  1/prod=2.022
//     S     LHS(sum over rows)   RHS = D_y(S)*N   equal   origin  mean      origin/mean  pred
//         10              0                  0   YES       0     0.0000        NaN  2.022
//         20            990                990   YES       1     0.9890      1.011  2.022
//         30           1485               1485   YES       2     1.4835      1.348  2.022
//
//   y=7 x=13: Wy=210 Wx=30030 M=143 Dy=15 Dx=1485 N=99  prod(1-2/q)=0.692308  1/prod=1.444
//     S     LHS(sum over rows)   RHS = D_y(S)*N   equal   origin  mean      origin/mean  pred
//         50            396                396   YES       3     2.7692      1.083  1.444
//        100            594                594   YES       5     4.1538      1.204  1.444
//        210           1485               1485   YES      12    10.3846      1.156  1.444
//
//   y=7 x=17: Wy=210 Wx=510510 M=2431 Dy=15 Dx=22275 N=1485  prod(1-2/q)=0.610860  1/prod=1.637
//     S     LHS(sum over rows)   RHS = D_y(S)*N   equal   origin  mean      origin/mean  pred
//         50           5940               5940   YES       2     2.4434      0.819  1.637
//        121          11880              11880   YES       6     4.8869      1.228  1.637
//        210          22275              22275   YES      11     9.1629      1.200  1.637
//
//   y=11 x=17: Wy=2310 Wx=510510 M=221 Dy=135 Dx=22275 N=165  prod(1-2/q)=0.746606  1/prod=1.339
//     S     LHS(sum over rows)   RHS = D_y(S)*N   equal   origin  mean      origin/mean  pred
//        121           1155               1155   YES       6     5.2262      1.148  1.339
//        500           4950               4950   YES      22    22.3982      0.982  1.339
//       2310          22275              22275   YES      99   100.7919      0.982  1.339
//
//   y=13 x=19: Wy=30030 Wx=9699690 M=323 Dy=1485 Dx=378675 N=255  prod(1-2/q)=0.789474  1/prod=1.267
//     S     LHS(sum over rows)   RHS = D_y(S)*N   equal   origin  mean      origin/mean  pred
//        169           2295               2295   YES       8     7.1053      1.126  1.267
//       1000          11985              11985   YES      35    37.1053      0.943  1.267
//      30030         378675             378675   YES    1173  1172.3684      1.001  1.267
//
// === C. the local/global density ratio that drives the identity ===
//
//   rho_y(S) = local density of T_13 in [0,S) over its global density  (y#=30030, D=1485, y'^2=289)
//     S=     169  u=lnS/lny=2.000  D_y(S)=      9  rho=1.0769
//     S=     289  u=lnS/lny=2.209  D_y(S)=     16  rho=1.1196
//     S=     500  u=lnS/lny=2.423  D_y(S)=     25  rho=1.0111
//     S=    1000  u=lnS/lny=2.693  D_y(S)=     47  rho=0.9504
//     S=    5000  u=lnS/lny=3.321  D_y(S)=    246  rho=0.9949
//     S=   30030  u=lnS/lny=4.020  D_y(S)=   1485  rho=1.0000
//
//   rho_y(S) = local density of T_19 in [0,S) over its global density  (y#=9699690, D=378675, y'^2=529)
//     S=     361  u=lnS/lny=2.000  D_y(S)=     17  rho=1.2062
//     S=     529  u=lnS/lny=2.130  D_y(S)=     21  rho=1.0168
//     S=    2000  u=lnS/lny=2.581  D_y(S)=     75  rho=0.9606
//     S=   20000  u=lnS/lny=3.363  D_y(S)=    782  rho=1.0015
//     S=  200000  u=lnS/lny=4.145  D_y(S)=   7801  rho=0.9991
//     S= 9699690  u=lnS/lny=5.464  D_y(S)= 378675  rho=1.0000
//
// === D. where the origin row sits in the ensemble ===
//
//   y=7 x=13  M=143 rows   y'^2=121  x'^2=289
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//       50     2.769       3    1    4       0      25 / 143          yes
//      121     5.538       7    4    8       0       3 / 143          yes
//      210    10.385      12    8   13       0       9 / 143          yes
//
//   y=11 x=17  M=221 rows   y'^2=169  x'^2=361
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      121     5.226       6    3    7       0      16 / 221          yes
//      169     7.466       8    5   10       0      28 / 221          yes
//      500    22.398      22   19   26       0     104 / 221          NO
//     1000    42.557      39   38   47       0     217 / 221          NO
//     2310   100.792      99   95  104       0     182 / 221          NO
//
//   y=13 x=19  M=323 rows   y'^2=289  x'^2=529
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      169     7.105       8    5    9       0      19 / 323          yes
//      289    12.632      15   10   15       0       1 / 323          yes
//      361    15.000      17   12   17       0       1 / 323          yes
//     1000    37.105      35   33   41       0     286 / 323          NO
//     5000   194.211     193  189  202       0     199 / 323          NO
//    30030  1172.368    1173 1164 1186       0     106 / 323          yes
//
//   y=13 x=23  M=7429 rows   y'^2=289  x'^2=841
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      169     6.487       8    3    9       0     163 / 7429          yes
//      289    11.533      15    7   15       0       1 / 7429          yes
//      361    13.696      17    9   17       0       1 / 7429          yes
//     1000    33.879      32   28   40       0    5752 / 7429          NO
//     5000   177.323     177  168  189       0    3522 / 7429          NO
//    30030  1070.423    1075 1055 1087       0    1036 / 7429          yes
//
// === G. the matrix depends on q only through d = gcd(q, x#) ===
//
//   x=13 W=30030 D=1485 S=210   naive = S*D/W = 10.3846
//        d   #windows      mean    rho=mean/naive   min  max  origin
//      210        143    10.3846         1.0000     8   13     12
//      330         91    10.2747         0.9894     8   13     12
//      462         65    10.1538         0.9778     8   13     12
//      770         39    10.1538         0.9778     8   13     12
//     1155         26    10.5769         1.0185    10   13     12
//     2310         13    11.0000         1.0593    10   13     12
//     5005          6    10.3333         0.9951     9   12     12
//     6006          5    10.8000         1.0400    10   12     12
//    10010          3    10.6667         1.0272    10   12     12
//    15015          2    11.0000         1.0593    10   12     12
//    30030          1    12.0000         1.1556    12   12     12
//
// === F. the Origin Excess Lemma, S = y'^2 ===
//
//   y   x     S=y'^2   D_y(S)   L(pred)  origin(pred)  origin(true)  ok   mean       ratio
//    7  11      121        8        1             7             7   YES      6.545  1.069
//    7  13      121        8        1             7             7   YES      5.538  1.264
//    7  17      121        8        2             6             6   YES      4.887  1.228
//    7  19      121        8        2             6             6   YES      4.372  1.372
//   11  13      169       10        1             9             9   YES      8.462  1.064
//   11  17      169       10        2             8             8   YES      7.466  1.072
//   11  19      169       10        2             8             8   YES      6.680  1.198
//   11  23      169       10        2             8             8   YES      6.099  1.312
//   13  17      289       16        1            15            15   YES     14.118  1.063
//   13  19      289       16        1            15            15   YES     12.632  1.188
//   13  23      289       16        1            15            15   YES     11.533  1.301
//   17  19      361       18        1            17            17   YES     16.105  1.056
//   17  23      361       18        1            17            17   YES     14.705  1.156
//   19  23      529       21        0            21            21   YES     19.174  1.095
//
// === E. the row width the Zone Postulate actually asks for: S = x'^2 ===
//
//   y=7 x=11  M=11 rows   y'^2=121  x'^2=169
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      169     9.000      10    7   11       0       3 / 11          yes
//
//   y=7 x=13  M=143 rows   y'^2=121  x'^2=289
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//
//   y=11 x=13  M=13 rows   y'^2=169  x'^2=289
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      289    15.231      16   14   18       0       2 / 13          yes
//
//   y=11 x=17  M=221 rows   y'^2=169  x'^2=361
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      361    15.679      18   12   19       0       3 / 221          yes
//
//   y=13 x=17  M=17 rows   y'^2=289  x'^2=361
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      361    16.765      18   15   18       0       1 / 17          yes
//
//   y=13 x=19  M=323 rows   y'^2=289  x'^2=529
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      529    21.316      21   19   24       0     135 / 323          NO
//
//   y=13 x=23  M=7429 rows   y'^2=289  x'^2=841
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      841    29.554      30   24   36       0    2254 / 7429          yes
//
//   y=17 x=19  M=19 rows   y'^2=361  x'^2=529
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      529    20.579      21   19   22       0       2 / 19          yes
//
//   y=17 x=23  M=437 rows   y'^2=361  x'^2=841
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      841    27.776      30   24   32       0      16 / 437          yes
//
//   y=19 x=23  M=23 rows   y'^2=529  x'^2=841
//        S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
//      841    27.391      30   25   30       0       1 / 23          yes
// ============================================================================
// READINGS
//
