// The LOCALIZED gap ladder.  See research/LOCALIZED-GAP.md §5.
//
// M(x, Y) = largest gap between consecutive twin slots of T_x among gaps
// starting below Y.  A twin slot is r with r and r+2 both x-rough.
//
// The point: M(x, x^k) needs only a sieve of [0, x^k) by primes <= x.  It does
// NOT need the tile of width x#.  So the ladder is not capped at x = 41.
//
// Question under test: is the LOCALIZED fold increment ADDITIVE?
//   step 4 (G2new <= G2old + L*mbar) was REFUTED on the full tile (A2/A4).
//   Localized to the head, the extremal statistics are governed by k*ln x
//   instead of theta(x) ~ x, so the same step has x/(k ln x) more room.

const N = Number(process.argv[2] || 1.2e8);   // sieve length
const K = Number(process.argv[3] || 3);       // window exponent

// ---- primes to sqrt(N) not needed; we only strike by ladder primes <= xmax.
// xmax is set by x^K <= N.
const XMAX = Math.floor(Math.pow(N, 1 / K));

// primes up to XMAX
function primesUpTo(n) {
  const s = new Uint8Array(n + 1);
  const out = [];
  for (let i = 2; i <= n; i++) {
    if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  }
  return out;
}
const ladder = primesUpTo(XMAX);

// rough[r] = 1 while r has no prime factor among the primes folded in so far.
const rough = new Uint8Array(N + 3).fill(1);
rough[0] = 0;

// M(x, Y): scan twin slots of the current rough array up to Y, largest gap
// whose LEFT endpoint is < Y.  Also return the slot count and the last slot.
function localized(Y) {
  let prev = -1, best = 0, bestAt = -1, count = 0;
  for (let r = 1; r < Y + 4096; r++) {
    if (rough[r] && rough[r + 2]) {
      if (prev >= 0 && prev < Y) {
        const g = r - prev;
        if (g > best) { best = g; bestAt = prev; }
      }
      prev = r; count++;
      if (prev >= Y && best > 0) break;
    }
  }
  return { M: best, at: bestAt, count };
}

console.log(`# N=${N.toExponential(2)}  K=${K}  ladder to x=${ladder[ladder.length-1]}`);
console.log('x\tY=x^K\t\tM(x,x^K)\tdM\tmbar\tdM/ln^2x\tM/(k ln^3 x)\tM/x^2');

let prevM = null;
const rows = [];
for (const x of ladder) {
  // fold x in
  for (let j = x; j <= N + 2; j += x) rough[j] = 0;
  if (x < 3) continue;
  const Y = Math.pow(x, K);
  if (Y > N) break;
  const { M, count } = localized(Y);
  const mbar = Y / count;
  const dM = prevM === null ? NaN : M - prevM;
  const L2 = Math.log(x) ** 2, L3 = Math.log(x) ** 3;
  rows.push({ x, Y, M, dM, mbar, count });
  console.log(
    `${x}\t${Y.toExponential(3)}\t${M}\t\t${isNaN(dM) ? '-' : dM}\t${mbar.toFixed(1)}\t` +
    `${isNaN(dM) ? '-' : (dM / L2).toFixed(3)}\t\t${(M / (K * L3)).toFixed(3)}\t\t${(M / (x * x)).toFixed(4)}`
  );
  prevM = M;
}

// summary
const inc = rows.map(r => r.dM).filter(v => !isNaN(v));
const pos = inc.filter(v => v > 0);
console.log(`\n# folds: ${inc.length}, folds with dM>0: ${pos.length}, max dM: ${Math.max(...inc)}`);
console.log(`# mean dM: ${(inc.reduce((a,b)=>a+b,0)/inc.length).toFixed(3)}`);
const last = rows[rows.length - 1];
console.log(`# last: x=${last.x}  M=${last.M}  mbar=${last.mbar.toFixed(1)}  M/mbar=${(last.M/last.mbar).toFixed(2)}  M/x^2=${(last.M/(last.x*last.x)).toFixed(5)}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/localized-01-ladder.js
//   invocation:  node research/localized-01-ladder.js
//   code-sha256: f450dfc4bfff7493d3847912e5e00deaee20a93a3f1c8d9eaf35634cd31227f7
//   out-sha256:  d973897a597c86906699bbb2fbf403d096ca96799f9e02bbb578651fcd330c77
//   body-lines:  99
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     3.7 s
// ============================================================================
// # N=1.20e+8  K=3  ladder to x=491
// x	Y=x^K		M(x,x^K)	dM	mbar	dM/ln^2x	M/(k ln^3 x)	M/x^2
// 3	2.700e+1	6		-	5.4	-		1.508		0.6667
// 5	1.250e+2	12		6	9.6	2.316		0.959		0.4800
// 7	3.430e+2	30		18	14.3	4.754		1.357		0.6122
// 11	1.331e+3	42		12	16.8	2.087		1.015		0.3471
// 13	2.197e+3	66		24	20.3	3.648		1.304		0.3905
// 17	4.913e+3	108		42	23.0	5.232		1.583		0.3737
// 19	6.859e+3	150		42	25.7	4.844		1.959		0.4155
// 23	1.217e+4	150		0	27.8	0.000		1.622		0.2836
// 29	2.439e+4	150		0	30.1	0.000		1.310		0.1784
// 31	2.979e+4	150		0	32.1	0.000		1.235		0.1561
// 37	5.065e+4	204		54	33.8	4.142		1.444		0.1490
// 41	6.892e+4	204		0	35.6	0.000		1.328		0.1214
// 43	7.951e+4	204		0	37.4	0.000		1.278		0.1103
// 47	1.038e+5	204		0	38.9	0.000		1.191		0.0923
// 53	1.489e+5	300		96	40.5	6.090		1.598		0.1068
// 59	2.054e+5	300		0	41.8	0.000		1.475		0.0862
// 61	2.270e+5	300		0	43.2	0.000		1.439		0.0806
// 67	3.008e+5	318		18	44.7	1.018		1.426		0.0708
// 71	3.579e+5	318		0	45.9	0.000		1.369		0.0631
// 73	3.890e+5	318		0	47.4	0.000		1.342		0.0597
// 79	4.930e+5	318		0	48.5	0.000		1.271		0.0510
// 83	5.718e+5	318		0	49.7	0.000		1.229		0.0462
// 89	7.050e+5	378		60	50.8	2.978		1.393		0.0477
// 97	9.127e+5	378		0	51.8	0.000		1.316		0.0402
// 101	1.030e+6	402		24	52.9	1.127		1.363		0.0394
// 103	1.093e+6	402		0	54.0	0.000		1.346		0.0379
// 107	1.225e+6	402		0	55.0	0.000		1.313		0.0351
// 109	1.295e+6	432		30	56.0	1.363		1.395		0.0364
// 113	1.443e+6	432		0	57.0	0.000		1.363		0.0338
// 127	2.048e+6	432		0	57.8	0.000		1.267		0.0268
// 131	2.248e+6	432		0	58.7	0.000		1.243		0.0252
// 137	2.571e+6	432		0	59.6	0.000		1.209		0.0230
// 139	2.686e+6	456		24	60.4	0.986		1.265		0.0236
// 149	3.308e+6	462		6	61.3	0.240		1.229		0.0208
// 151	3.443e+6	498		36	62.1	1.430		1.314		0.0218
// 157	3.870e+6	552		54	62.8	2.112		1.423		0.0224
// 163	4.331e+6	552		0	63.6	0.000		1.392		0.0208
// 167	4.657e+6	552		0	64.4	0.000		1.373		0.0198
// 173	5.178e+6	552		0	65.1	0.000		1.345		0.0184
// 179	5.735e+6	630		78	65.9	2.899		1.504		0.0197
// 181	5.930e+6	630		0	66.6	0.000		1.495		0.0192
// 191	6.968e+6	630		0	67.2	0.000		1.449		0.0173
// 193	7.189e+6	630		0	67.9	0.000		1.441		0.0169
// 197	7.645e+6	630		0	68.6	0.000		1.424		0.0162
// 199	7.881e+6	630		0	69.3	0.000		1.416		0.0159
// 211	9.394e+6	630		0	70.0	0.000		1.370		0.0142
// 223	1.109e+7	708		78	70.7	2.668		1.493		0.0142
// 227	1.170e+7	708		0	71.3	0.000		1.478		0.0137
// 229	1.201e+7	708		0	71.9	0.000		1.471		0.0135
// 233	1.265e+7	708		0	72.5	0.000		1.457		0.0130
// 239	1.365e+7	708		0	73.2	0.000		1.437		0.0124
// 241	1.400e+7	708		0	73.8	0.000		1.430		0.0122
// 251	1.581e+7	708		0	74.4	0.000		1.399		0.0112
// 257	1.697e+7	708		0	74.9	0.000		1.381		0.0107
// 263	1.819e+7	708		0	75.5	0.000		1.364		0.0102
// 269	1.947e+7	708		0	76.1	0.000		1.348		0.0098
// 271	1.990e+7	708		0	76.6	0.000		1.342		0.0096
// 277	2.125e+7	852		144	77.2	4.553		1.597		0.0111
// 281	2.219e+7	852		0	77.7	0.000		1.584		0.0108
// 283	2.267e+7	852		0	78.2	0.000		1.578		0.0106
// 293	2.515e+7	852		0	78.8	0.000		1.550		0.0099
// 307	2.893e+7	870		18	79.3	0.549		1.544		0.0092
// 311	3.008e+7	924		54	79.8	1.639		1.629		0.0096
// 313	3.066e+7	924		0	80.3	0.000		1.623		0.0094
// 317	3.186e+7	924		0	80.8	0.000		1.613		0.0092
// 331	3.626e+7	924		0	81.3	0.000		1.577		0.0084
// 337	3.827e+7	924		0	81.8	0.000		1.562		0.0081
// 347	4.178e+7	924		0	82.3	0.000		1.539		0.0077
// 349	4.251e+7	924		0	82.7	0.000		1.534		0.0076
// 353	4.399e+7	924		0	83.2	0.000		1.526		0.0074
// 359	4.627e+7	924		0	83.7	0.000		1.512		0.0072
// 367	4.943e+7	924		0	84.1	0.000		1.496		0.0069
// 373	5.190e+7	924		0	84.6	0.000		1.483		0.0066
// 379	5.444e+7	924		0	85.0	0.000		1.471		0.0064
// 383	5.618e+7	924		0	85.5	0.000		1.464		0.0063
// 389	5.886e+7	924		0	85.9	0.000		1.452		0.0061
// 397	6.257e+7	924		0	86.4	0.000		1.437		0.0059
// 401	6.448e+7	924		0	86.8	0.000		1.430		0.0057
// 409	6.842e+7	924		0	87.2	0.000		1.416		0.0055
// 419	7.356e+7	924		0	87.6	0.000		1.399		0.0053
// 421	7.462e+7	924		0	88.0	0.000		1.396		0.0052
// 431	8.006e+7	924		0	88.5	0.000		1.380		0.0050
// 433	8.118e+7	924		0	88.9	0.000		1.377		0.0049
// 439	8.460e+7	924		0	89.2	0.000		1.367		0.0048
// 443	8.694e+7	924		0	89.6	0.000		1.361		0.0047
// 449	9.052e+7	924		0	90.0	0.000		1.352		0.0046
// 457	9.544e+7	924		0	90.5	0.000		1.341		0.0044
// 461	9.797e+7	948		24	90.8	0.638		1.370		0.0045
// 463	9.925e+7	948		0	91.2	0.000		1.367		0.0044
// 467	1.018e+8	948		0	91.6	0.000		1.361		0.0043
// 479	1.099e+8	948		0	92.0	0.000		1.344		0.0041
// 487	1.155e+8	948		0	92.4	0.000		1.333		0.0040
// 491	1.184e+8	990		42	92.7	1.094		1.387		0.0041
//
// # folds: 92, folds with dM>0: 23, max dM: 144
// # mean dM: 10.696
// # last: x=491  M=990  mbar=92.7  M/mbar=10.67  M/x^2=0.00411
// ============================================================================
// READINGS
// ============================================================================
