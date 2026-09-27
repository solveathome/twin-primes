// ============================================================================
// EXCESS-CHAIN c — the compressed-tail max correction, tested on all eight
// levels at once (TODO item 10; 2026-08-28; SCRATCHPAD-GRADE)
// ============================================================================
// THE OBJECT (cap-25 / cap-29 / cap-33 RUN 1).  E_x(l) = M_x(l) - N*l/W is the
// max sliding-window natal count minus the fair share, on cap-17's scour-length
// grid.  The chain is
//     E_x(l) = c * sigma_x(l) * sqrt(2*ln(W/l)),
// sigma_x(l) exact from J5 over all W rotations of the depth-x tile, and c the
// one scalar the chain never derived.  Per level c = E_med / P_med with
// P_med = med_l( sigma * sqrt(2 ln(W/l)) ).
//
// WHAT THIS FILE DOES.  It writes the max correction the chain's own null
// (Gaussian block maxima, n_eff = W/l) actually prescribes, and scores it
// against the eight measured c.  No census is run; every measured input is
// IMPORTED from an embedded artifact and labelled below.  The only thing
// computed here is cap-17's grid rule (prime sieve + ceil(W/q)), which fixes
// l_med and hence L = ln(W/l_med) per level.  Runtime ~3 s.
//   node research/history/staging/excess-chain-c.js
//
// IMPORTED MEASUREMENTS (provenance per number, nothing re-measured):
//   E_med @7..@29   : natal-cap-25-excess-law.js PART 3 table (col "E_med(meas)")
//   E_med @31       : natal-cap-33-overnight.txt RUN 1 (60.90; 38-min march)
//   P_med @7..@29   : natal-cap-25-excess-law.js PART 3 table (col "P_med")
//   P_med @31       : natal-cap-29-sigma-plateau.js PART 4 (56.68, spot-augmented)
//   med sigma @7..@29: natal-cap-29-sigma-plateau.js P0 ("med Var / med sigma")
//   med sigma @31   : sqrt(132.83), cap-29 PART 3 ("142 direct Var(l): med=132.83")
// ============================================================================
'use strict';
const GAM = 0.5772156649015329, LN4PI = Math.log(4 * Math.PI);

// ---- imported measurements (see provenance block above) --------------------
const LV = [
  // x,  E_med, P_med, medSigma
  {x: 7,  E: 1.19,  P: 1.53,  s: 0.684},
  {x: 11, E: 2.06,  P: 2.35,  s: 0.924},
  {x: 13, E: 4.05,  P: 3.95,  s: 1.330},
  {x: 17, E: 7.18,  P: 7.70,  s: 2.246},
  {x: 19, E: 12.61, P: 11.87, s: 3.030},
  {x: 23, E: 23.20, P: 21.20, s: 5.111},
  {x: 29, E: 36.24, P: 33.63, s: 7.353},
  {x: 31, E: 60.90, P: 56.68, s: Math.sqrt(132.83)},
];

// ---- cap-17 grid rule, verbatim, recomputed here ---------------------------
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1}}return o}
const PR = primesUpTo(460000);
const med = a => {const s=[...a].sort((u,v)=>u-v); return s[Math.floor(s.length/2)]}; // cap-01 convention
function levelWN(x){let W=30,N=2;for(const p of PR){if(p<7)continue;if(p>x)break;W*=p;N*=p-2}return{W,N}}
function gridFor(x,W){
  const lim = Math.floor(Math.sqrt(W));
  const scour = PR.filter(q => q > x && q <= lim && q*q <= W);
  const stride = scour.length > 600 ? Math.ceil(scour.length/140) : 1;
  const qs = stride === 1 ? scour : scour.filter((_,i) => i%stride===0 || i<3 || i>=scour.length-3);
  const ells = [...new Set(qs.map(q => Math.ceil(W/q)))].sort((a,b)=>a-b);
  return {nScour: scour.length, stride, ells};
}

// ---- the max correction ----------------------------------------------------
// Null the chain already uses: the max of n effectively independent Gaussian
// blocks, n = nu * W/l.  Classical EVT normalisation (Leadbetter/Cramer):
//   a_n = sqrt(2 ln n),  b_n = a_n - (ln ln n + ln 4pi)/(2 a_n),
//   E[max] = b_n + gamma/a_n + o(1/a_n).
// The chain's prefactor is E[max]/(sigma sqrt(2L)), L = ln(W/l), so
//   c(L; nu) = ( b_n + gamma/a_n ) / sqrt(2L),   ln n = L + ln nu.
// At nu = 1 this is zero-parameter, and expands to
//   c = 1 - (ln L + ln 4pi - 2 gamma)/(4L) + O(L^-2)  ->  1 from BELOW.
function cGumbel(L, nu){
  const lnn = L + Math.log(nu);
  const a = Math.sqrt(2*lnn);
  const b = a - (Math.log(lnn) + LN4PI)/(2*a);
  return (b + GAM/a) / Math.sqrt(2*L);
}
// Lattice (continuity) correction: C(s) is integer, so the exceedance level
// solving P(C >= m) = 1/n is m = mu + 1/2 + sigma z_n.  In c-units the shift is
// exactly 0.5 / P_med, since c = E/P and E gains 1/2.
const cLattice = lv => 0.5 / lv.P;

// ---- report ----------------------------------------------------------------
const rows = LV.map(lv => {
  const {W,N} = levelWN(lv.x);
  const g = gridFor(lv.x, W);
  const lmed = med(g.ells);
  const L = Math.log(W/lmed);
  const Lcheck = Math.pow(lv.P/lv.s, 2)/2;   // custody: P_med/med_sigma = sqrt(2L)
  return {...lv, W, N, nScour: g.nScour, nEll: g.ells.length, lmed, L, Lcheck, c: lv.E/lv.P};
});

console.log('PART 0 — grid rule recomputed, and the custody check on L');
console.log('   x |            W |  scour |  #l |        l_med |   L=ln(W/l_med) | (P_med/med sigma)^2/2 | rel');
for(const r of rows){
  console.log(`  ${String(r.x).padStart(2)} | ${String(r.W).padStart(12)} | ${String(r.nScour).padStart(6)} | ${String(r.nEll).padStart(3)} | ${String(r.lmed).padStart(12)} | ${r.L.toFixed(4).padStart(15)} | ${r.Lcheck.toFixed(4).padStart(21)} | ${((r.Lcheck-r.L)/r.L*100).toFixed(1)}%`);
}

console.log('\nPART 1 — measured c, and the zero-parameter correction (nu = 1)');
console.log('   x | E_med  | P_med  |  c meas |  c1 = Gumbel(nu=1) | c1 resid | c2 = c1 + lattice | c2 resid | z-lattice 1/sigma');
for(const r of rows){
  const c1 = cGumbel(r.L, 1), c2 = c1 + cLattice(r);
  console.log(`  ${String(r.x).padStart(2)} | ${r.E.toFixed(2).padStart(6)} | ${r.P.toFixed(2).padStart(6)} | ${r.c.toFixed(4).padStart(7)} | ${c1.toFixed(4).padStart(18)} | ${((r.c/c1-1)*100).toFixed(1).padStart(7)}% | ${c2.toFixed(4).padStart(17)} | ${((r.c/c2-1)*100).toFixed(1).padStart(7)}% | ${(1/r.s).toFixed(3).padStart(17)}`);
}

function logrms(pred){let s=0;for(let i=0;i<rows.length;i++)s+=Math.pow(Math.log(rows[i].c/pred[i]),2);return Math.sqrt(s/rows.length)}
function logrmsSub(pred, from){let s=0,n=0;for(let i=from;i<rows.length;i++){s+=Math.pow(Math.log(rows[i].c/pred[i]),2);n++}return Math.sqrt(s/n)}

const c1s = rows.map(r=>cGumbel(r.L,1));
const c2s = rows.map((r,i)=>c1s[i]+cLattice(r));

console.log('\nPART 2 — one-parameter competitors, fitted in log space');
// (a) constant c
const cbar = Math.exp(rows.reduce((a,r)=>a+Math.log(r.c),0)/rows.length);
const cconst = rows.map(()=>cbar);
// (b) A * c1
const A = Math.exp(rows.reduce((a,r,i)=>a+Math.log(r.c/c1s[i]),0)/rows.length);
const cA = c1s.map(v=>A*v);
// (c) fitted nu
let bestNu=1,bestR=1e9;
for(let ln=-2; ln<=8; ln+=0.001){const nu=Math.exp(ln);const p=rows.map(r=>cGumbel(r.L,nu));const R=logrms(p);if(R<bestR){bestR=R;bestNu=nu}}
const cNu = rows.map(r=>cGumbel(r.L,bestNu));
console.log(`  (a) constant c     : c = ${cbar.toFixed(4)}                        log-rms all 8 = ${logrms(cconst).toFixed(4)}   last 5 = ${logrmsSub(cconst,3).toFixed(4)}`);
console.log(`  (b) A * Gumbel     : A = ${A.toFixed(4)}  (A = 1 is the derived claim)  log-rms all 8 = ${logrms(cA).toFixed(4)}   last 5 = ${logrmsSub(cA,3).toFixed(4)}`);
console.log(`  (c) fitted n_eff   : nu = ${bestNu.toFixed(2)}  (nu = 2 is the measured corr. length l/2)  log-rms all 8 = ${logrms(cNu).toFixed(4)}   last 5 = ${logrmsSub(cNu,3).toFixed(4)}`);
console.log(`  (0) Gumbel nu = 1  : zero-parameter                    log-rms all 8 = ${logrms(c1s).toFixed(4)}   last 5 = ${logrmsSub(c1s,3).toFixed(4)}`);
console.log(`  (0') Gumbel+lattice: zero-parameter                    log-rms all 8 = ${logrms(c2s).toFixed(4)}   last 5 = ${logrmsSub(c2s,3).toFixed(4)}`);

console.log('\nPART 3 — the n_eff each measured c demands (invert the correction at nu free)');
console.log('   x |   L    | ln n implied | ln n / L |  nu implied | corr. length l / nu');
for(const r of rows){
  let lo=-3,hi=20;
  for(let k=0;k<200;k++){const mid=(lo+hi)/2; if(cGumbel(r.L,Math.exp(mid))<r.c) lo=mid; else hi=mid;}
  const lnnu=(lo+hi)/2, lnn=r.L+lnnu;
  console.log(`  ${String(r.x).padStart(2)} | ${r.L.toFixed(3).padStart(6)} | ${lnn.toFixed(3).padStart(12)} | ${(lnn/r.L).toFixed(3).padStart(8)} | ${Math.exp(lnnu).toFixed(2).padStart(11)} | ${('l / '+Math.exp(lnnu).toFixed(1)).padStart(19)}`);
}

console.log('\nPART 4 — where the limit goes');
for(const L of [12, 20, 40, 100, 1000]){
  console.log(`  L = ${String(L).padStart(4)} : c1(nu=1) = ${cGumbel(L,1).toFixed(4)}   c(nu=${bestNu.toFixed(0)}) = ${cGumbel(L,bestNu).toFixed(4)}   A*c1 = ${(A*cGumbel(L,1)).toFixed(4)}`);
}
console.log('  every member of the family -> 1 as L -> infinity (nu fixed).');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/excess-chain-c.js
//   invocation:  node research/history/staging/excess-chain-c.js
//   code-sha256: a09b55d4c7a1729747af9914ca4c1a51ec6310f394aa2da39673cb7339136901
//   out-sha256:  2c88b071bd84186db6fb9aa41db73c8edcd3df2a1ca9a4d44e17a89ae5f18ef5
//   body-lines:  47
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     0.1 s
// ============================================================================
// PART 0 — grid rule recomputed, and the custody check on L
//    x |            W |  scour |  #l |        l_med |   L=ln(W/l_med) | (P_med/med sigma)^2/2 | rel
//    7 |          210 |      2 |   2 |           20 |          2.3514 |                2.5017 | 6.4%
//   11 |         2310 |     10 |  10 |           80 |          3.3630 |                3.2342 | -3.8%
//   13 |        30030 |     34 |  34 |          362 |          4.4183 |                4.4102 | -0.2%
//   17 |       510510 |    120 | 120 |         1543 |          5.8017 |                5.8767 | 1.3%
//   19 |      9699690 |    435 | 435 |         6788 |          7.2647 |                7.6734 | 5.6%
//   23 |    223092870 |   1739 | 139 |        32612 |          8.8307 |                8.6026 | -2.6%
//   29 |   6469693230 |   7863 | 143 |       173810 |         10.5247 |               10.4591 | -0.6%
//   31 | 200560490130 |  37534 | 145 |       953421 |         12.2566 |               12.0930 | -1.3%
//
// PART 1 — measured c, and the zero-parameter correction (nu = 1)
//    x | E_med  | P_med  |  c meas |  c1 = Gumbel(nu=1) | c1 resid | c2 = c1 + lattice | c2 resid | z-lattice 1/sigma
//    7 |   1.19 |   1.53 |  0.7778 |             0.7627 |     2.0% |            1.0895 |   -28.6% |             1.462
//   11 |   2.06 |   2.35 |  0.8766 |             0.8075 |     8.6% |            1.0203 |   -14.1% |             1.082
//   13 |   4.05 |   3.95 |  1.0253 |             0.8380 |    22.3% |            0.9646 |     6.3% |             0.752
//   17 |   7.18 |   7.70 |  0.9325 |             0.8649 |     7.8% |            0.9299 |     0.3% |             0.445
//   19 |  12.61 |  11.87 |  1.0623 |             0.8844 |    20.1% |            0.9265 |    14.7% |             0.330
//   23 |  23.20 |  21.20 |  1.0943 |             0.8994 |    21.7% |            0.9229 |    18.6% |             0.196
//   29 |  36.24 |  33.63 |  1.0776 |             0.9114 |    18.2% |            0.9263 |    16.3% |             0.136
//   31 |  60.90 |  56.68 |  1.0745 |             0.9208 |    16.7% |            0.9296 |    15.6% |             0.087
//
// PART 2 — one-parameter competitors, fitted in log space
//   (a) constant c     : c = 0.9838                        log-rms all 8 = 0.1153   last 5 = 0.0851
//   (b) A * Gumbel     : A = 1.1445  (A = 1 is the derived claim)  log-rms all 8 = 0.0629   last 5 = 0.0471
//   (c) fitted n_eff   : nu = 2.14  (nu = 2 is the measured corr. length l/2)  log-rms all 8 = 0.1167   last 5 = 0.1171
//   (0) Gumbel nu = 1  : zero-parameter                    log-rms all 8 = 0.1489   last 5 = 0.1610
//   (0') Gumbel+lattice: zero-parameter                    log-rms all 8 = 0.1703   last 5 = 0.1354
//
// PART 3 — the n_eff each measured c demands (invert the correction at nu free)
//    x |   L    | ln n implied | ln n / L |  nu implied | corr. length l / nu
//    7 |  2.351 |        2.421 |    1.030 |        1.07 |             l / 1.1
//   11 |  3.363 |        3.822 |    1.137 |        1.58 |             l / 1.6
//   13 |  4.418 |        6.137 |    1.389 |        5.57 |             l / 5.6
//   17 |  5.802 |        6.573 |    1.133 |        2.16 |             l / 2.2
//   19 |  7.265 |        9.951 |    1.370 |       14.68 |            l / 14.7
//   23 |  8.831 |       12.448 |    1.410 |       37.25 |            l / 37.2
//   29 | 10.525 |       14.164 |    1.346 |       38.06 |            l / 38.1
//   31 | 12.257 |       16.162 |    1.319 |       49.69 |            l / 49.7
//
// PART 4 — where the limit goes
//   L =   12 : c1(nu=1) = 0.9196   c(nu=2) = 0.9519   A*c1 = 1.0525
//   L =   20 : c1(nu=1) = 0.9453   c(nu=2) = 0.9647   A*c1 = 1.0820
//   L =   40 : c1(nu=1) = 0.9683   c(nu=2) = 0.9780   A*c1 = 1.1083
//   L =  100 : c1(nu=1) = 0.9850   c(nu=2) = 0.9889   A*c1 = 1.1274
//   L = 1000 : c1(nu=1) = 0.9979   c(nu=2) = 0.9983   A*c1 = 1.1422
//   every member of the family -> 1 as L -> infinity (nu fixed).
// ============================================================================
// READINGS
// ============================================================
// (readings live in research/history/staging/excess-chain-c.md; this file is
//  scratchpad-grade and carries only the run.)
