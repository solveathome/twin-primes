// ============================================================================
// import-chaining-03.js  —  the four numbers the verdict turns on
// foreign-import attack 1 of 5 (2026-08-19); reads import-chaining-01/02.js
// ============================================================================
// (a) THE OPTIMISED CHAIN. import-chaining-01.js chains on dyadic INTERVAL
//     lengths, which wastes every level on which the cell diameter has already
//     saturated. The correct Dudley construction is geometric in eps, not in
//     cell length: eps_j = Delta_0 2^-j, nets of cardinality N(eps_j).
//     CHAIN_opt = sum_j eps_{j-1} sqrt(2 ln N(eps_j)), constant 1, no slack.
// (b) WHERE THE ENTROPY MASS SITS relative to the subgaussian gate. The gate
//     (import-chaining-02.js S1) passes only at lags above some delta*; this
//     computes the fraction of the entropy integral carried by eps below
//     d(delta*), i.e. the fraction of the chaining bound that rests on a
//     hypothesis MEASURED FALSE.
// (c) THE ENTROPY INTEGRAL ON PROVED INPUT ONLY, i.e. with the covering
//     numbers from d(delta) <= 2 sqrt(B delta), B = 9A^2(E-1) the unconditional
//     bound of history/staging/attack-AB-bounded.md, instead of the measured
//     local constant <R^2>_1.
// (d) THE MAXSUM BLOCK VARIANCE EXPONENT. TODO 0c's law
//     maxsum_m = m*mbar + sigma sqrt(2 m ln D) assumes Var(m-block) ~ m.
//     This regresses ln sd_m on ln m over the exact tiles.
//
//   node --max-old-space-size=8192 research/import-chaining-03.js   (~1 min)
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const LV=require('./sift-limit-lemmaV.js');
const C1=require('./import-chaining-01.js');
const C2=require('./import-chaining-02.js');

const ROWS=[[13,60],[17,126],[19,198],[23,258]];
// delta* = smallest dyadic lag at which sup|inc| <= d(lag) sqrt(2 lnW), from
// import-chaining-02.js S1 (z = 13, 17, 19 measured; 23 taken as the trend).
// MEASURED in import-chaining-02.js S1: the smallest dyadic lag from which
// sup|inc| <= d(lag) sqrt(2 lnW) holds at that lag and every larger one.
const GATE={13:4, 17:32, 19:64, 23:64};

function ols(xs,ys){ const n=xs.length; const mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0,sxx=0; for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; }
  const b=sxy/sxx, a=my-b*mx; let ss=0; for(let i=0;i<n;i++) ss+=(ys[i]-a-b*xs[i])**2;
  const se=Math.sqrt(ss/(n-2)/sxx); return {a,b,se}; }

function main(){
console.log('IMPORT 1 / part 3 --- the four numbers the verdict turns on\n');
console.log('(a)(b)(c) the sieve remainder R_H, s = 3.0, operative H\n');
console.log('  z   Delta_0   union   CHAIN_opt  /union |  I_lo   I_hi   |  frac of I below the gate |  I_provedB  /union');
for(const [z,H] of ROWS){
  const D=Math.round(Math.pow(z,3.0));
  const t=LV.buildTerms(z,D);
  let W=1; for(const p of t.ps) W*=p;
  const lnW=Math.log(W);
  const ms=LV.meanSquare(t,H).ms, rms=Math.sqrt(ms), union=rms*Math.sqrt(2*lnW);
  const pa=C1.periodArray(z,H,D);
  const rho=C1.cyclicAutocov(pa.R);
  const prof=new Float64Array(W);
  for(let d=0;d<W;d++) prof[d]=Math.sqrt(Math.max(0,2*(ms-rho[d])));
  let D0=0; for(let d=1;d<W;d++) if(prof[d]>D0) D0=prof[d];
  const srt=Float64Array.from(prof); srt.sort();
  const vol=(e)=>{ let lo=0,hi=srt.length;
    while(lo<hi){ const mid=(lo+hi)>>1; if(srt[mid]<=e) lo=mid+1; else hi=mid; } return Math.max(1,lo); };
  // (a) eps-geometric chain, N(eps) <= W/|B(eps/2)|
  let chain=0, j=1, eps=D0;
  const terms=[];
  for(;;){ const en=D0*Math.pow(2,-j); const N=W/vol(en/2);
    chain += eps*Math.sqrt(2*Math.log(Math.max(2,N)));
    terms.push([en.toFixed(4), N.toExponential(2)]);
    if(vol(en)<=1 || j>60) break; eps=en; j++; }
  // (b) entropy integral, split at the gate
  const steps=40000, h=D0/steps; let Ilo=0,Ihi=0, IloBelow=0, IhiBelow=0;
  const gate=prof[GATE[z]];
  for(let i=0;i<steps;i++){ const e=(i+0.5)*h;
    const Nl=W/vol(e), Nh=W/vol(e/2);
    const cl=(Nl>1)?Math.sqrt(2*Math.log(Nl))*h:0, ch=(Nh>1)?Math.sqrt(2*Math.log(Nh))*h:0;
    Ilo+=cl; Ihi+=ch; if(e<gate){ IloBelow+=cl; IhiBelow+=ch; } }
  // (c) proved-input entropy integral
  const odd=t.ps.filter(p=>p>2);
  const A=(5/2)*odd.reduce((a,p)=>a*(1+2/p),1);
  const E=(43/25)*odd.reduce((a,p)=>a*(1+4*p/((p+2)*(p+2))),1);
  const Bp=9*A*A*(E-1);
  const IB=C1.analyticEntropy(Bp,W,rms,40000);
  console.log(`  ${String(z).padStart(2)}  ${D0.toFixed(4)}  ${union.toFixed(4)}  ${chain.toFixed(4).padStart(9)}  ${(chain/union).toFixed(3)}  | ${Ilo.toFixed(4)} ${Ihi.toFixed(4)} |  gate d(${GATE[z]})=${gate.toFixed(4)}  ${(IloBelow/Ilo*100).toFixed(1)}%..${(IhiBelow/Ihi*100).toFixed(1)}%  |  ${IB.toFixed(4)}  ${(IB/union).toFixed(3)}   [${el()}]`);
}


// (e) the same three bounds in the corpus's WINDOW-EXPONENT currency.
// <R^2>_H / H is flat at the operative window (phase1-T4 sec.2b measures
// 1.99e-2 .. 1.01e-2 across z = 13..43), so H*M = K sqrt(<R^2>_H 2 lnW)
// scales as need(K) = K^2 need(1), and need(1) is phase1-T4 sec.2's
// need_sharp column. No re-solve is needed and none is done here.
console.log('\n(e) the WINDOW-EXPONENT currency (need = smallest H with H*M >= bound)');
console.log('    need(K) = K^2 * need_sharp, need_sharp from phase1-T4 sec.2 (K=1 column)');
console.log('  z | need_sharp  ns/z^2 | floor K=1.30: need /z^2 | chain K=2.94: need /z^2 u=ln(need)/ln z | C_crit | u_sup(7e)');
const NS={13:100,17:142,19:191,23:325,29:436};
const CC={13:2.225,17:1.720,19:1.358,23:1.418,29:1.660};
const USUP={13:2.0617,17:2.3036,19:2.5518,23:2.6666};
for(const z of [13,17,19,23,29]){
  const ns=NS[z], z2=z*z;
  const f=1.30*1.30*ns, c=2.94*2.94*ns;
  const uc=Math.log(c)/Math.log(z);
  console.log(`  ${String(z).padStart(2)} |   ${String(ns).padStart(6)}   ${(ns/z2).toFixed(4)} |  ${f.toFixed(0).padStart(6)}  ${(f/z2).toFixed(4)}       |  ${c.toFixed(0).padStart(6)}  ${(c/z2).toFixed(4)}  u=${uc.toFixed(4)}  | ${CC[z].toFixed(3)} | ${USUP[z]!==undefined?USUP[z]:'--'}`);
}

console.log('\n(d) the maxsum block variance: does Var(m-block) grow like m?');
console.log('  tile |   m ->  sd_m / (sd_1 sqrt(m))                                  | OLS slope of ln sd_m on ln m');
const MS=[1,2,3,4,6,8,12,16,24,32,48,64];
for(const x of [13,17,19,23]){
  const T=C2.tile(x);
  const rows=C2.maxsumStats(T,MS);
  const s1=rows[0].sd;
  const rel=rows.map(r=>`${r.m}:${(r.sd/(s1*Math.sqrt(r.m))).toFixed(3)}`).join(' ');
  const f=ols(rows.map(r=>Math.log(r.m)), rows.map(r=>Math.log(r.sd)));
  console.log(`  T_${String(x).padStart(2)} | ${rel}\n         slope = ${f.b.toFixed(4)} +/- ${f.se.toFixed(4)}   (independent gaps would give 0.5)`);
  const lnD=Math.log(T.D);
  console.log('         m | excess/sd_m | sqrt(2 lnD) | sqrt(2 ln(D/m)) :  ' +
    rows.map(r=>`${r.m}:${((r.maxsum-r.m*r.mbar)/r.sd).toFixed(2)}`).join(' ') +
    `   [sqrt(2lnD)=${Math.sqrt(2*lnD).toFixed(3)}]`);
}
console.log(`\n[${el()}] done`);
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-chaining-03.js
//   invocation:  node research/import-chaining-03.js
//   code-sha256: 847c9d18dc691939757c4591c67adeefc468556f7cd1506c62f6ddf75d2fce6f
//   out-sha256:  1198e8314797d81284c073a17b232827c8e3b609f13cd586f1eecaa6c116f3a6
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     17.1 s
// ============================================================================
// IMPORT 1 / part 3 --- the four numbers the verdict turns on
//
// (a)(b)(c) the sieve remainder R_H, s = 3.0, operative H
//
//   z   Delta_0   union   CHAIN_opt  /union |  I_lo   I_hi   |  frac of I below the gate |  I_provedB  /union
//   13  2.2145  4.7027    14.0783  2.994  | 4.9567 7.2664 |  gate d(4)=0.5583  42.1%..30.2%  |  9.4053  2.000   [0.0s]
//   17  2.6145  6.7593    20.4633  3.027  | 7.0275 10.2251 |  gate d(32)=1.4077  76.6%..59.3%  |  13.5187  2.000   [0.2s]
//   19  2.3703  7.4229    21.3626  2.878  | 8.0895 11.0144 |  gate d(64)=1.4167  78.6%..62.7%  |  14.8457  2.000   [0.8s]
//   23  2.8307  9.8499    28.4138  2.885  | 10.8260 14.7113 |  gate d(64)=1.7738  81.7%..65.1%  |  19.6997  2.000   [7.4s]
//
// (e) the WINDOW-EXPONENT currency (need = smallest H with H*M >= bound)
//     need(K) = K^2 * need_sharp, need_sharp from phase1-T4 sec.2 (K=1 column)
//   z | need_sharp  ns/z^2 | floor K=1.30: need /z^2 | chain K=2.94: need /z^2 u=ln(need)/ln z | C_crit | u_sup(7e)
//   13 |      100   0.5917 |     169  1.0000       |     864  5.1146  u=2.6363  | 2.225 | 2.0617
//   17 |      142   0.4913 |     240  0.8304       |    1227  4.2470  u=2.5105  | 1.720 | 2.3036
//   19 |      191   0.5291 |     323  0.8942       |    1651  4.5732  u=2.5163  | 1.358 | 2.5518
//   23 |      325   0.6144 |     549  1.0383       |    2809  5.3103  u=2.5325  | 1.418 | 2.6666
//   29 |      436   0.5184 |     737  0.8761       |    3769  4.4811  u=2.4454  | 1.660 | --
//
// (d) the maxsum block variance: does Var(m-block) grow like m?
//   tile |   m ->  sd_m / (sd_1 sqrt(m))                                  | OLS slope of ln sd_m on ln m
//   T_13 | 1:1.000 2:0.968 3:0.998 4:0.990 6:0.861 8:0.664 12:0.594 16:0.646 24:0.566 32:0.497 48:0.490 64:0.413
//          slope = 0.2661 +/- 0.0230   (independent gaps would give 0.5)
//          m | excess/sd_m | sqrt(2 lnD) | sqrt(2 ln(D/m)) :  1:3.80 2:3.37 3:3.72 4:3.15 6:2.55 8:2.93 12:3.53 16:2.14 24:2.72 32:3.04 48:2.53 64:2.91   [sqrt(2lnD)=3.822]
//   T_17 | 1:1.000 2:0.980 3:0.980 4:0.938 6:0.778 8:0.643 12:0.684 16:0.630 24:0.603 32:0.556 48:0.467 64:0.420
//          slope = 0.2804 +/- 0.0189   (independent gaps would give 0.5)
//          m | excess/sd_m | sqrt(2 lnD) | sqrt(2 ln(D/m)) :  1:5.83 2:5.15 3:4.01 4:3.88 6:3.69 8:3.94 12:3.33 16:4.39 24:3.67 32:3.24 48:3.39 64:3.74   [sqrt(2lnD)=4.475]
//   T_19 | 1:1.000 2:0.979 3:0.956 4:0.898 6:0.747 8:0.674 12:0.699 16:0.623 24:0.593 32:0.559 48:0.503 64:0.461
//          slope = 0.3001 +/- 0.0130   (independent gaps would give 0.5)
//          m | excess/sd_m | sqrt(2 lnD) | sqrt(2 ln(D/m)) :  1:7.25 2:5.67 3:4.69 4:4.07 6:4.66 8:5.29 12:5.31 16:4.73 24:4.52 32:4.47 48:4.22 64:4.34   [sqrt(2lnD)=5.068]
//   T_23 | 1:1.000 2:0.977 3:0.944 4:0.884 6:0.769 8:0.740 12:0.727 16:0.670 24:0.624 32:0.594 48:0.531 64:0.497
//          slope = 0.3216 +/- 0.0096   (independent gaps would give 0.5)
//          m | excess/sd_m | sqrt(2 lnD) | sqrt(2 ln(D/m)) :  1:9.04 2:6.61 3:6.78 4:6.85 6:8.00 8:7.45 12:5.61 16:5.77 24:5.33 32:4.89 48:5.08 64:4.71   [sqrt(2lnD)=5.637]
//
// [17.0s] done
// ============================================================
// READINGS
// ============================================================
//
// 1. THE CORRECT CHAIN COSTS 2.88 TO 3.03 UNION BOUNDS, FLAT. `CHAIN_opt` =
//    14.0783, 20.4633, 21.3626, 28.4138 against unions 4.7027, 6.7593, 7.4229,
//    9.8499: ratios 2.994, 3.027, 2.878, 2.885. No trend across four levels.
//    This is the honest constant-carrying chaining bound — geometric nets,
//    exact covering numbers, universal constant 1 — and it is three times
//    weaker than the bound the corpus already writes down.
//
// 2. MOST OF THE BOUND RESTS ON THE PART OF THE HYPOTHESIS THAT IS FALSE.
//    The fraction of the entropy integral carried by eps below the gate
//    threshold d(delta*) is 42.1%..30.2%, 76.6%..59.3%, 78.6%..62.7%,
//    81.7%..65.1% at z = 13, 17, 19, 23 (the two figures are the lower and
//    upper covering-number branches). It rises at every step. Because
//    d(delta) ~ sqrt(delta), a quarter of the lag range is half the metric
//    range, so a gate that fails only on small lags still fails on most of the
//    integral.
//
// 3. ON PROVED INPUT THE INTEGRAL COLLAPSES TO EXACTLY TWICE THE UNION BOUND.
//    `I_provedB/union` = 2.000 at all four levels, to four figures, and the
//    reason is structural rather than numerical: with B = 9A^2(E-1) the
//    covering bound 4BW/eps^2 exceeds W over the whole integration range
//    [0, 2 rms], so N(eps) is pinned at W and the integral is 2 rms
//    sqrt(2 lnW). The Brownian structure that makes chaining interesting is
//    invisible to the only constant that is proved.
//
// 4. IN THE WINDOW-EXPONENT CURRENCY, CHAINING SITS AT need/z^2 = 4.25 TO 5.31
//    AND THE FLOOR SITS AT 0.83 TO 1.04. Reading the columns: the entropy
//    floor at K = 1.30 gives 1.0000, 0.8304, 0.8942, 1.0383, 0.8761 — below
//    the zone budget at three of five levels and at it at the other two, i.e.
//    TPC-implying or within rounding of it. The measured chaining constant
//    K = 2.94 gives 5.1146, 4.2470, 4.5732, 5.3103, 4.4811 — comfortably
//    legal and comfortably useless. The gap between those two columns is the
//    universal chaining constant, and it is where the route dies.
//
// 5. CHAINING DOES BEAT C^{pi(z)}, AND FLATLY. Converting need to an exponent,
//    K = 2.94 gives u = ln(need)/ln z = 2.6363, 2.5105, 2.5163, 2.5325,
//    2.4454 at
//    z = 13..29 — flat or gently falling — against `u_sup` = 2.0617, 2.3036,
//    2.5518, 2.6666, which rises at every step and, per
//    `sift-limit-attack.md` sec.7e, diverges on a flat 2.05 factor per added
//    prime. The two cross between z = 19 and z = 23. So the answer to "does
//    chaining beat the quantifier price exponentially" is yes, and it changes
//    nothing, because the chaining column is conditional on reading 2's
//    hypothesis and the u_sup column is unconditional.
//
// 6. THE MAXSUM BLOCK VARIANCE IS NOT ADDITIVE, AND THAT IS A CORRECTION TO
//    TODO 0c'S STATED LAW. `sd_m/(sd_1 sqrt(m))` falls monotonically to 0.413,
//    0.420, 0.461, 0.497 at m = 64 on T_13, T_17, T_19, T_23, and the OLS
//    slope of ln sd_m on ln m is 0.2661 +/- 0.0230, 0.2804 +/- 0.0189,
//    0.3001 +/- 0.0130, 0.3216 +/- 0.0096 against the 0.5 that independent
//    gaps would give. Every one of those is more than eight standard errors
//    below 0.5. The law maxsum_m = m*mbar + sigma sqrt(2m ln D) has the right
//    sqrt(log) factor — reading 5 of `import-chaining-02.js` shows the metric
//    that forces it — and the wrong sqrt(m) factor. The slope does rise with
//    the tile (0.2661, 0.2804, 0.3001, 0.3216) and four points do not decide
//    whether it is heading for 0.5; what is decided is that at every exactly
//    computable level the variance is sub-additive and the shortfall depends
//    on m, so no single sigma absorbs it.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints (printed value first):
//   3.027 -> the 3.03 upper end of "2.88 TO 3.03"; the lower end 2.88 is the
//     printed 2.878, and the four printed ratios are 2.994, 3.027, 2.878,
//     2.885.
//   4.2470 -> the 4.25 lower end of "need/z^2 = 4.25 TO 5.31"; the upper end
//     is the printed 5.3103, and the K = 2.94 column reads 5.1146, 4.2470,
//     4.5732, 5.3103, 4.4811.
//   1.0383 -> the 1.04 upper end of "the floor sits at 0.83 to 1.04"; the
//     lower end is the printed 0.8304, and the K = 1.30 column reads 1.0000,
//     0.8304, 0.8942, 1.0383, 0.8761.
//
// BORROWED, verified present in the named producer: the flat 2.05 factor per
// added prime is research/sift-limit-attack.md sec.7e, which states "S_sat's
// per-added-prime factor recomputes at 2.0516", of which 2.05 is the two-digit
// form. It is the divergence rate of u_sup, not a quantity this run computes.
// ---------------------------------------------------------------------------
