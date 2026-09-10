// ============================================================================
// import-scanstat-01-identity.js  —  ADJUDICATING THE OFFERED IDENTITY
// foreign-import experiment, IMPORT-MAP row 1 (scan statistics), part 1 of 4
// ============================================================================
// THE CLAIM ON TRIAL. history/staging/import-map-construction.md sec.4(a)
// offers, for adjudication and not as a result:
//
//   "Let g_0..g_{D-1} be the cyclic gap word with sum g_i = W and mbar = W/D,
//    and gamma(k) = (1/D) sum_i (g_i - mbar)(g_{i+k} - mbar). Then
//    sum_{k=0}^{D-1} gamma(k) = 0 identically. Autocovariances summing to
//    exactly zero force Var(S_m)/m -> 0, so sd_m = sigma sqrt(m) is not merely
//    mis-measured, it is impossible at the top of the range."
//
// It has two halves and they get different verdicts. This script separates
// them and tests each on the real tiles.
//
//  (A) THE IDENTITY ITSELF. sum_k gamma(k) = (1/D)(sum_i c_i)^2 with
//      c_i = g_i - mbar, and sum_i c_i = W - D*mbar = 0. TRUE, and it is the
//      cyclic Parseval statement that the periodogram vanishes at frequency 0.
//      Verified here by brute force at two levels and by the algebraic route
//      at four.
//
//  (B) THE IMPLICATION "therefore Var(S_m)/m -> 0". This is what the script
//      is really for. THE COUNTEREXAMPLE IS THE SAME MULTISET IN A DIFFERENT
//      ORDER: sum_k gamma(k) = 0 depends only on sum_i c_i, so it is invariant
//      under every permutation of the gap word, while sd_m is not. For a
//      uniformly random permutation the exact finite-population variance is
//
//          Var(S_m) = m sigma^2 (D - m) / (D - 1),
//
//      i.e. Var(S_m)/m -> sigma^2 whenever m/D -> 0. So a hypothesis obeyed by
//      every permutation cannot forbid the sqrt(m) law that one of them obeys
//      exactly. The identity is verified below on shuffles of the REAL tile
//      gaps, which have the same gamma-sum and measure exponent ~0.5.
//
//  (C) WHAT THE IDENTITY DOES BUY, exactly. Its whole content is a budget:
//      sum_{k>=1} gamma(k) = -gamma(0), spread over D-1 lags. Spent uniformly
//      that is the without-replacement factor (D-m)/(D-1), which at m = 64 and
//      D = 3.8e5 is a 0.017% variance deficit. The measured deficit at the same
//      point is 79%. The ratio of those two is the number that decides the
//      adjudication, and it is computed per level below.
//
//  (D) WHERE THE IDENTITY IS RIGHT. It does forbid sqrt(m) at the TOP of the
//      range, and the sharp form of that is a duality, proved here and new to
//      the corpus:  S_m(i) + S_{D-m}(i+m) = W  for cyclic windows, hence
//          maxsum_m = W - minsum_{D-m},   sd_m = sd_{D-m}.
//      The variance curve is symmetric about m = D/2 and vanishes at both ends.
//      Checked at every m on T_13.
//
//   node --max-old-space-size=8192 research/import-scanstat-01-identity.js
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const C2=require('./import-chaining-02.js');

const MS=[1,2,3,4,6,8,12,16,24,32,48,64];   // the grid of import-chaining-03.js

function gapsOf(T){ const {slots,W,D}=T; const g=new Float64Array(D);
  for(let i=0;i<D-1;i++) g[i]=slots[i+1]-slots[i];
  g[D-1]=slots[0]+W-slots[D-1]; return g; }

// exact moving-sum stats straight off a gap word (cyclic), no slot array
function blockStats(g,mlist){ const D=g.length; const pre=new Float64Array(D+1);
  for(let i=0;i<D;i++) pre[i+1]=pre[i]+g[i]; const W=pre[D];
  const out=[];
  for(const m of mlist){ if(m>=D) continue;
    let mx=-Infinity,mn=Infinity,s=0,s2=0;
    for(let i=0;i<D;i++){ const j=i+m; const v = j<=D ? pre[j]-pre[i] : pre[j-D]+W-pre[i];
      if(v>mx)mx=v; if(v<mn)mn=v; s+=v; s2+=v*v; }
    const mean=s/D; out.push({m,max:mx,min:mn,mean,sd:Math.sqrt(Math.max(0,s2/D-mean*mean))}); }
  return out; }

function ols(xs,ys){ const n=xs.length; const mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0,sxx=0; for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; }
  const b=sxy/sxx, a=my-b*mx; let ss=0; for(let i=0;i<n;i++) ss+=(ys[i]-a-b*xs[i])**2;
  const se=Math.sqrt(ss/(n-2)/sxx); return {a,b,se}; }

function autocov(g,K){ const D=g.length; let s=0; for(let i=0;i<D;i++) s+=g[i]; const mb=s/D;
  const c=new Float64Array(D); for(let i=0;i<D;i++) c[i]=g[i]-mb;
  const out=new Float64Array(K+1);
  for(let k=0;k<=K;k++){ let t=0; for(let i=0;i<D;i++) t+=c[i]*c[(i+k)%D]; out[k]=t/D; }
  return {gam:out, mb}; }

// deterministic PRNG (mulberry32) so the shuffle control is reproducible
function rng(seed){ let a=seed>>>0; return ()=>{ a=(a+0x6D2B79F5)>>>0; let t=a;
  t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
function shuffled(g,seed){ const h=Float64Array.from(g), r=rng(seed);
  for(let i=h.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); const t=h[i]; h[i]=h[j]; h[j]=t; } return h; }

const LEVELS=[11,13,17,19];

function main(){
console.log('IMPORT-MAP row 1 / part 1 --- adjudicating "sum_k gamma(k) = 0 forbids sqrt(m)"\n');

const tiles={};
for(const x of LEVELS){ const T=C2.tile(x); tiles[x]={T,g:gapsOf(T)}; }

// ---------------------------------------------------------------- (A)
console.log('(A) IS THE IDENTITY TRUE?   sum_{k=0}^{D-1} gamma(k) = (1/D)(sum_i c_i)^2');
console.log('  tile |      D |        W | mbar     | sum_i c_i        | sum_k gamma(k) brute | gamma(0)');
for(const x of LEVELS){ const {T,g}=tiles[x]; const D=T.D;
  let s=0; for(let i=0;i<D;i++) s+=g[i]; const mb=s/D;
  let sc=0; for(let i=0;i<D;i++) sc+=g[i]-mb;
  let brute=NaN;
  if(D<=400000){ // sum_k gamma(k) = (1/D) sum_i c_i * sum_k c_{i+k} = (1/D)(sum c)^2 ; brute the O(D) way
    let tot=0; for(let i=0;i<D;i++) tot+=(g[i]-mb); brute=tot*tot/D; }
  const g0=(()=>{ let t=0; for(let i=0;i<D;i++) t+=(g[i]-mb)*(g[i]-mb); return t/D; })();
  console.log(`  T_${String(x).padStart(2)} | ${String(D).padStart(6)} | ${String(T.W).padStart(8)} | ${mb.toFixed(5)} | ${sc.toExponential(3).padStart(10)} | ${brute.toExponential(3).padStart(20)} | ${g0.toFixed(4)}`);
}
// full O(D^2) confirmation at the two smallest levels
for(const x of [11,13]){ const {T,g}=tiles[x]; const D=T.D;
  const {gam}=autocov(g,D-1); let s=0; for(let k=0;k<D;k++) s+=gam[k];
  console.log(`      O(D^2) confirmation at T_${x}: sum over all ${D} lags of gamma(k) = ${s.toExponential(3)}  (gamma(0)=${gam[0].toFixed(4)})`);
}
console.log('  VERDICT (A): the identity is TRUE, and trivially so: it is one line from sum_i c_i = 0.');
console.log('               It holds for EVERY word of D gaps summing to W, in EVERY order.');

// ---------------------------------------------------------------- (B)
console.log('\n(B) DOES IT FORBID sqrt(m)?  THE COUNTEREXAMPLE IS THE SAME MULTISET RESHUFFLED.');
console.log('    sum_k gamma(k) depends only on sum_i c_i, so it is permutation-invariant: every');
console.log('    row below has sum_k gamma(k) = 0 exactly. Only the ORDER differs.');
console.log('  tile | real word: OLS slope of ln sd_m on ln m | 3 seeded shuffles of the SAME gaps | without-replacement prediction');
for(const x of LEVELS){ const {T,g}=tiles[x];
  const real=blockStats(g,MS);
  const fr=ols(MS.map(Math.log),real.map(r=>Math.log(r.sd)));
  const sl=[];
  for(const seed of [12345,777001,20260819]){ const h=shuffled(g,seed);
    let sc=0; { let s=0; for(let i=0;i<h.length;i++) s+=h[i]; const mb=s/h.length;
      for(let i=0;i<h.length;i++) sc+=h[i]-mb; }
    const st=blockStats(h,MS); const f=ols(MS.map(Math.log),st.map(r=>Math.log(r.sd)));
    sl.push(`${f.b.toFixed(4)}(sum c=${sc.toExponential(1)})`); }
  // exact finite-population law: sd_m = sigma sqrt(m (D-m)/(D-1)), slope over the grid
  const D=T.D; let s=0; for(let i=0;i<D;i++) s+=g[i]; const mb=s/D;
  let v=0; for(let i=0;i<D;i++) v+=(g[i]-mb)**2; const sig=Math.sqrt(v/D);
  const wr=MS.map(m=>Math.log(sig*Math.sqrt(m*(D-m)/(D-1))));
  const fw=ols(MS.map(Math.log),wr);
  console.log(`  T_${String(x).padStart(2)} |            ${fr.b.toFixed(4)} +/- ${fr.se.toFixed(4)}            | ${sl.join('  ')} | ${fw.b.toFixed(4)}`);
}
console.log('  VERDICT (B): REFUTED. The hypothesis is permutation-invariant and the conclusion is not,');
console.log('               so the implication cannot hold. The shuffles obey the identity and measure ~0.5.');

// ---------------------------------------------------------------- (C)
console.log('\n(C) HOW MUCH OF THE MEASURED DEFICIT DOES THE IDENTITY EXPLAIN?');
console.log('    identity share of the variance deficit at m = 1 - (D-m)/(D-1) = (m-1)/(D-1).');
console.log('  tile |  m | sd_m/(sd_1 sqrt m) | measured var deficit | identity-forced deficit | measured / forced');
for(const x of LEVELS){ const {T,g}=tiles[x]; const D=T.D; const st=blockStats(g,MS); const s1=st[0].sd;
  for(const m of [8,16,32,64]){ const r=st.find(z=>z.m===m); if(!r) continue;
    const rel=r.sd/(s1*Math.sqrt(m)); const meas=1-rel*rel; const forced=(m-1)/(D-1);
    console.log(`  T_${String(x).padStart(2)} | ${String(m).padStart(2)} |       ${rel.toFixed(4)}       |       ${(meas*100).toFixed(2)}%        |        ${(forced*100).toExponential(2)}%        |  ${(meas/forced).toFixed(0)}x`); }
}

// ---------------------------------------------------------------- (C2)
console.log('\n(C2) WHERE THE REAL DEFICIT LIVES: the lag-covariance budget, spent.');
console.log('     Lam(K) = 2 sum_{k=1..K} gamma(k) / gamma(0).  The identity says Lam(D-1) = -1 exactly.');
console.log('  tile | Lam(1)  Lam(2)  Lam(4)  Lam(8)  Lam(16) Lam(32) Lam(64) | uniform-spend Lam(64) | gamma(1)/gamma(0)');
for(const x of LEVELS){ const {T,g}=tiles[x]; const D=T.D; const K=Math.min(64,D-1);
  const {gam}=autocov(g,K); let acc=0; const row=[];
  const want=new Set([1,2,4,8,16,32,64]);
  for(let k=1;k<=K;k++){ acc+=2*gam[k]/gam[0]; if(want.has(k)) row.push(acc.toFixed(4).padStart(7)); }
  const unif=-2*64/(D-1);
  console.log(`  T_${String(x).padStart(2)} |${row.join(' ')} |       ${unif.toExponential(2)}       | ${(gam[1]/gam[0]).toFixed(4)}`); }
console.log('  READ: the budget is spent at lags of order 10, not spread over D lags. That is a REAL');
console.log('        short-range anticorrelation of the tile word and it is not what the identity says.');

// ---------------------------------------------------------------- (D)
console.log('\n(D) WHAT THE IDENTITY DOES PROVE: the complementary-window duality (PROVEN here).');
console.log('    S_m(i) + S_{D-m}(i+m) = W  =>  maxsum_m + minsum_{D-m} = W,  sd_m = sd_{D-m}.');
{ const x=13; const {T,g}=tiles[x]; const D=T.D, W=T.W;
  const grid=[1,2,4,8,16,64,256,742,743,1000,1400,1477,1481,1483,1484];
  const st=blockStats(g,grid); const stc=blockStats(g,grid.map(m=>D-m).filter(m=>m>0&&m<D));
  console.log('    T_13 (D=1485, W=30030)');
  console.log('      m  | maxsum_m | minsum_{D-m} | sum vs W | sd_m     | sd_{D-m} | rel diff');
  for(const m of grid){ const a=st.find(z=>z.m===m); const b=stc.find(z=>z.m===D-m); if(!a||!b) continue;
    console.log(`    ${String(m).padStart(4)} | ${String(a.max).padStart(8)} | ${String(b.min).padStart(12)} | ${String(a.max+b.min).padStart(8)} | ${a.sd.toFixed(4).padStart(8)} | ${b.sd.toFixed(4).padStart(8)} | ${(Math.abs(a.sd-b.sd)/a.sd).toExponential(2)}`); }
}
// the full sd_m curve on T_13: rise, peak, fall to zero
{ const {T,g}=tiles[13]; const D=T.D; const all=blockStats(g,Array.from({length:D-1},(_,i)=>i+1));
  const s1=all[0].sd; let pk=0,pm=0; for(const r of all) if(r.sd>pk){pk=r.sd;pm=r.m;}
  console.log(`\n    full curve on T_13: sd_m peaks at m = ${pm} (= D/2 to within ${Math.abs(pm-D/2).toFixed(0)}), sd_peak/sd_1 = ${(pk/s1).toFixed(3)}`);
  const pts=[1,4,16,64,148,371,742,1113,1337,1421,1484];
  console.log('      m           :  ' + pts.map(m=>String(m).padStart(9)).join(''));
  console.log('      sd_m        :  ' + pts.map(m=>all[m-1].sd.toFixed(3).padStart(9)).join(''));
  console.log('      sd_1 sqrt(m):  ' + pts.map(m=>(s1*Math.sqrt(m)).toFixed(3).padStart(9)).join(''));
  console.log('      ratio       :  ' + pts.map(m=>(all[m-1].sd/(s1*Math.sqrt(m))).toFixed(3).padStart(9)).join(''));
  console.log(`    so the identity bites where it says it bites: at m of order D. At m <= 64, m/D = ${(64/D).toExponential(2)}.`);
}

// ---------------------------------------------------------------- (E)
console.log('\n(E) THE REPAIR: what the identity forces ONCE A LAG SCALE IS ADDED.');
console.log('    Exactly:  Var(S_m) = m*P(m) - Q(m),   P(m) = gamma(0) + 2 sum_{k<m} gamma(k),');
console.log('                                          Q(m) = 2 sum_{k<m} k gamma(k).');
console.log('    The identity says P(D) = 0. If gamma also DECAYS on a lag scale L then P(m) ~ 0');
console.log('    already for m >> L, the linear term dies, and Var(S_m) -> Q(inf): a PLATEAU, i.e.');
console.log('    exponent 0, not 0.5 and not the measured 0.27-0.34. The grid m <= 64 straddles the');
console.log('    crossover, which is why the exponent sits between and rises with the tile.');
for(const x of [13,17,19]){
  const {T,g}=tiles[x]; const D=T.D; const KMAX=Math.min(D-1, x===13?D-1:(x===17?2048:1024));
  const {gam}=autocov(g,KMAX);
  const grid=[2,4,8,16,32,64,128,256,512,1024].filter(m=>m<=KMAX&&m<D);
  const st=blockStats(g,grid);
  console.log(`  T_${x}  (D = ${D}, gamma(0) = ${gam[0].toFixed(3)})`);
  console.log('     m   |  Var(S_m)  |   m*P(m)   |   -Q(m)    | check  | P(m)/gamma(0) | sd_m');
  for(const m of grid){ let P=gam[0],Q=0; for(let k=1;k<m;k++){ P+=2*gam[k]; Q+=2*k*gam[k]; }
    const r=st.find(z=>z.m===m); const V=r.sd*r.sd;
    console.log(`  ${String(m).padStart(5)} | ${V.toFixed(1).padStart(10)} | ${(m*P).toFixed(1).padStart(10)} | ${(-Q).toFixed(1).padStart(10)} | ${((m*P-Q)/V).toFixed(4)} |   ${(P/gam[0]).toFixed(4)}      | ${r.sd.toFixed(3)}`); }
}
console.log('    READ, and it cuts both ways. The decomposition is exact at all 30 rows (check = 1.0000).');
console.log('    On T_19 the linear term does collapse where the corpus measures: P(m)/gamma(0) runs');
console.log('    0.9159, 0.4812, 0.2482, 0.1384, 0.0293, -0.0104 at m = 2..64, so at m ~ 32-64 the');
console.log('    variance is carried entirely by -Q(m) and the identity IS doing work there. But it does');
console.log('    not stay collapsed -- P wanders back to -0.1522 at m = 512 -- and gamma(k) has no decay');
console.log('    scale, so there is no single L, no plateau inside m <= 1024 at T_17 or T_19, and no');
console.log('    warrant for "Var(S_m)/m -> 0". Only T_13, whose m reaches a fixed fraction of D, shows');
console.log('    the plateau: sd_m sits at 29.867 to 40.771 across m = 128..512 while sqrt(m) doubles.');

console.log(`\n[${el()}] done`);
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=8192 research/import-scanstat-01-identity.js
//   invocation:  node --max-old-space-size=8192 research/import-scanstat-01-identity.js
//   code-sha256: 7fff64a258171953d277ee2c9312d17afd99c8883b93e261970983d7ca02d138
//   out-sha256:  c54a0f1feb5eb1c01742abe884b261c7fd0d00dfb2c5058789800dd308aebde7
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.9 s
// ============================================================================
// IMPORT-MAP row 1 / part 1 --- adjudicating "sum_k gamma(k) = 0 forbids sqrt(m)"
//
// (A) IS THE IDENTITY TRUE?   sum_{k=0}^{D-1} gamma(k) = (1/D)(sum_i c_i)^2
//   tile |      D |        W | mbar     | sum_i c_i        | sum_k gamma(k) brute | gamma(0)
//   T_11 |    135 |     2310 | 17.11111 |  6.040e-14 |            2.702e-29 | 88.2765
//   T_13 |   1485 |    30030 | 20.22222 |  1.151e-12 |            8.922e-28 | 144.7829
//   T_17 |  22275 |   510510 | 22.91852 |  4.986e-11 |            1.116e-25 | 212.7601
//   T_19 | 378675 |  9699690 | 25.61481 | -9.551e-10 |            2.409e-24 | 294.5268
//       O(D^2) confirmation at T_11: sum over all 135 lags of gamma(k) = 8.509e-13  (gamma(0)=88.2765)
//       O(D^2) confirmation at T_13: sum over all 1485 lags of gamma(k) = 7.292e-12  (gamma(0)=144.7829)
//   VERDICT (A): the identity is TRUE, and trivially so: it is one line from sum_i c_i = 0.
//                It holds for EVERY word of D gaps summing to W, in EVERY order.
//
// (B) DOES IT FORBID sqrt(m)?  THE COUNTEREXAMPLE IS THE SAME MULTISET RESHUFFLED.
//     sum_k gamma(k) depends only on sum_i c_i, so it is permutation-invariant: every
//     row below has sum_k gamma(k) = 0 exactly. Only the ORDER differs.
//   tile | real word: OLS slope of ln sd_m on ln m | 3 seeded shuffles of the SAME gaps | without-replacement prediction
//   T_11 |            0.2176 +/- 0.0487            | 0.3715(sum c=-8.5e-14)  0.5513(sum c=-1.6e-13)  0.3407(sum c=-1.8e-14) | 0.4355
//   T_13 |            0.2661 +/- 0.0230            | 0.5116(sum c=-5.7e-12)  0.4814(sum c=-5.1e-12)  0.5128(sum c=-6.1e-12) | 0.4953
//   T_17 |            0.2804 +/- 0.0189            | 0.5005(sum c=-3.4e-10)  0.4936(sum c=-6.1e-10)  0.5006(sum c=-5.8e-10) | 0.4997
//   T_19 |            0.3001 +/- 0.0130            | 0.4989(sum c=-3.5e-8)  0.4974(sum c=-3.0e-8)  0.5021(sum c=-2.2e-8) | 0.5000
//   VERDICT (B): REFUTED. The hypothesis is permutation-invariant and the conclusion is not,
//                so the implication cannot hold. The shuffles obey the identity and measure ~0.5.
//
// (C) HOW MUCH OF THE MEASURED DEFICIT DOES THE IDENTITY EXPLAIN?
//     identity share of the variance deficit at m = 1 - (D-m)/(D-1) = (m-1)/(D-1).
//   tile |  m | sd_m/(sd_1 sqrt m) | measured var deficit | identity-forced deficit | measured / forced
//   T_11 |  8 |       0.7923       |       37.23%        |        5.22e+0%        |  7x
//   T_11 | 16 |       0.5900       |       65.19%        |        1.12e+1%        |  6x
//   T_11 | 32 |       0.5161       |       73.36%        |        2.31e+1%        |  3x
//   T_11 | 64 |       0.3996       |       84.03%        |        4.70e+1%        |  2x
//   T_13 |  8 |       0.6640       |       55.91%        |        4.72e-1%        |  119x
//   T_13 | 16 |       0.6461       |       58.25%        |        1.01e+0%        |  58x
//   T_13 | 32 |       0.4974       |       75.26%        |        2.09e+0%        |  36x
//   T_13 | 64 |       0.4132       |       82.93%        |        4.25e+0%        |  20x
//   T_17 |  8 |       0.6430       |       58.65%        |        3.14e-2%        |  1866x
//   T_17 | 16 |       0.6300       |       60.31%        |        6.73e-2%        |  896x
//   T_17 | 32 |       0.5562       |       69.06%        |        1.39e-1%        |  496x
//   T_17 | 64 |       0.4196       |       82.39%        |        2.83e-1%        |  291x
//   T_19 |  8 |       0.6744       |       54.52%        |        1.85e-3%        |  29493x
//   T_19 | 16 |       0.6230       |       61.19%        |        3.96e-3%        |  15447x
//   T_19 | 32 |       0.5587       |       68.78%        |        8.19e-3%        |  8402x
//   T_19 | 64 |       0.4607       |       78.78%        |        1.66e-2%        |  4735x
//
// (C2) WHERE THE REAL DEFICIT LIVES: the lag-covariance budget, spent.
//      Lam(K) = 2 sum_{k=1..K} gamma(k) / gamma(0).  The identity says Lam(D-1) = -1 exactly.
//   tile | Lam(1)  Lam(2)  Lam(4)  Lam(8)  Lam(16) Lam(32) Lam(64) | uniform-spend Lam(64) | gamma(1)/gamma(0)
//   T_11 |-0.2354  0.3025 -0.0414 -2.0705 -0.0991 -1.8778  0.0506 |       -9.55e-1       | -0.1177
//   T_13 |-0.1245  0.1147 -0.5002 -1.4402 -1.2211 -0.4419 -0.4839 |       -8.63e-2       | -0.0622
//   T_17 |-0.0795 -0.0370 -0.7650 -0.8152 -1.0941 -0.9563 -0.9182 |       -5.75e-3       | -0.0397
//   T_19 |-0.0841 -0.1732 -0.8600 -0.4923 -0.6615 -0.8895 -0.9886 |       -3.38e-4       | -0.0421
//   READ: the budget is spent at lags of order 10, not spread over D lags. That is a REAL
//         short-range anticorrelation of the tile word and it is not what the identity says.
//
// (D) WHAT THE IDENTITY DOES PROVE: the complementary-window duality (PROVEN here).
//     S_m(i) + S_{D-m}(i+m) = W  =>  maxsum_m + minsum_{D-m} = W,  sd_m = sd_{D-m}.
//     T_13 (D=1485, W=30030)
//       m  | maxsum_m | minsum_{D-m} | sum vs W | sd_m     | sd_{D-m} | rel diff
//        1 |       66 |        29964 |    30030 |  12.0326 |  12.0326 | 3.23e-11
//        2 |       96 |        29934 |    30030 |  16.4786 |  16.4786 | 8.55e-11
//        4 |      156 |        29874 |    30030 |  23.8148 |  23.8148 | 8.42e-11
//        8 |      228 |        29802 |    30030 |  22.5990 |  22.5990 | 1.01e-10
//       16 |      390 |        29640 |    30030 |  31.0986 |  31.0986 | 3.59e-11
//       64 |     1410 |        28620 |    30030 |  39.7762 |  39.7762 | 1.24e-11
//      256 |     5298 |        24732 |    30030 |  35.0051 |  35.0051 | 1.98e-11
//      742 |    15102 |        14928 |    30030 |  42.7673 |  42.7673 | 8.15e-12
//      743 |    15120 |        14910 |    30030 |  42.7673 |  42.7673 | 8.15e-12
//     1000 |    20316 |         9714 |    30030 |  37.6344 |  37.6344 | 5.26e-12
//     1400 |    28398 |         1632 |    30030 |  35.9308 |  35.9308 | 3.57e-11
//     1477 |    29928 |          102 |    30030 |  22.5990 |  22.5990 | 1.01e-10
//     1481 |    29994 |           36 |    30030 |  23.8148 |  23.8148 | 8.42e-11
//     1483 |    30012 |           18 |    30030 |  16.4786 |  16.4786 | 8.55e-11
//     1484 |    30024 |            6 |    30030 |  12.0326 |  12.0326 | 3.23e-11
//
//     full curve on T_13: sd_m peaks at m = 742 (= D/2 to within 1), sd_peak/sd_1 = 3.554
//       m           :          1        4       16       64      148      371      742     1113     1337     1421     1484
//       sd_m        :     12.033   23.815   31.099   39.776   35.962   37.430   42.767   36.536   35.962   39.776   12.033
//       sd_1 sqrt(m):     12.033   24.065   48.130   96.261  146.383  231.764  327.764  401.427  439.971  453.582  463.528
//       ratio       :      1.000    0.990    0.646    0.413    0.246    0.162    0.130    0.091    0.082    0.088    0.026
//     so the identity bites where it says it bites: at m of order D. At m <= 64, m/D = 4.31e-2.
//
// (E) THE REPAIR: what the identity forces ONCE A LAG SCALE IS ADDED.
//     Exactly:  Var(S_m) = m*P(m) - Q(m),   P(m) = gamma(0) + 2 sum_{k<m} gamma(k),
//                                           Q(m) = 2 sum_{k<m} k gamma(k).
//     The identity says P(D) = 0. If gamma also DECAYS on a lag scale L then P(m) ~ 0
//     already for m >> L, the linear term dies, and Var(S_m) -> Q(inf): a PLATEAU, i.e.
//     exponent 0, not 0.5 and not the measured 0.27-0.34. The grid m <= 64 straddles the
//     crossover, which is why the exponent sits between and rises with the tile.
//   T_13  (D = 1485, gamma(0) = 144.783)
//      m   |  Var(S_m)  |   m*P(m)   |   -Q(m)    | check  | P(m)/gamma(0) | sd_m
//       2 |      271.5 |      253.5 |       18.0 | 1.0000 |   0.8755      | 16.479
//       4 |      567.1 |      536.8 |       30.3 | 1.0000 |   0.9270      | 23.815
//       8 |      510.7 |     -542.6 |     1053.3 | 1.0000 |   -0.4684      | 22.599
//      16 |      967.1 |      276.6 |      690.5 | 1.0000 |   0.1194      | 31.099
//      32 |     1146.0 |     1358.1 |     -212.1 | 1.0000 |   0.2931      | 33.853
//      64 |     1582.1 |     2931.8 |    -1349.6 | 1.0000 |   0.3164      | 39.776
//     128 |      892.0 |    10648.2 |    -9756.2 | 1.0000 |   0.5746      | 29.867
//     256 |     1225.4 |   -10429.9 |    11655.2 | 1.0000 |   -0.2814      | 35.005
//     512 |     1662.3 |    27593.5 |   -25931.2 | 1.0000 |   0.3722      | 40.771
//    1024 |     1013.2 |   -55543.8 |    56557.0 | 1.0000 |   -0.3746      | 31.830
//   T_17  (D = 22275, gamma(0) = 212.760)
//      m   |  Var(S_m)  |   m*P(m)   |   -Q(m)    | check  | P(m)/gamma(0) | sd_m
//       2 |      408.6 |      391.7 |       16.9 | 1.0000 |   0.9205      | 20.214
//       4 |      749.3 |      543.2 |      206.1 | 1.0000 |   0.6383      | 27.373
//       8 |      703.8 |     -190.3 |      894.1 | 1.0000 |   -0.1118      | 26.529
//      16 |     1351.2 |     -425.2 |     1776.4 | 1.0000 |   -0.1249      | 36.759
//      32 |     2106.3 |     1618.9 |      487.4 | 1.0000 |   0.2378      | 45.894
//      64 |     2397.6 |     -750.9 |     3148.5 | 1.0000 |   -0.0551      | 48.965
//     128 |     2702.0 |     1680.1 |     1021.9 | 1.0000 |   0.0617      | 51.981
//     256 |     3871.0 |    -1953.4 |     5824.4 | 1.0000 |   -0.0359      | 62.218
//     512 |     4566.6 |    -5624.6 |    10191.2 | 1.0000 |   -0.0516      | 67.577
//    1024 |     4943.6 |     6326.5 |    -1383.0 | 1.0000 |   0.0290      | 70.310
//   T_19  (D = 378675, gamma(0) = 294.527)
//      m   |  Var(S_m)  |   m*P(m)   |   -Q(m)    | check  | P(m)/gamma(0) | sd_m
//       2 |      564.3 |      539.5 |       24.8 | 1.0000 |   0.9159      | 23.755
//       4 |      949.5 |      567.0 |      382.6 | 1.0000 |   0.4812      | 30.814
//       8 |     1071.6 |      584.7 |      486.9 | 1.0000 |   0.2482      | 32.736
//      16 |     1829.0 |      652.2 |     1176.9 | 1.0000 |   0.1384      | 42.767
//      32 |     2942.4 |      275.9 |     2666.5 | 1.0000 |   0.0293      | 54.244
//      64 |     4000.5 |     -195.6 |     4196.0 | 1.0000 |   -0.0104      | 63.249
//     128 |     5581.3 |     1194.9 |     4386.4 | 1.0000 |   0.0317      | 74.708
//     256 |     6540.4 |    -4880.7 |    11421.1 | 1.0000 |   -0.0647      | 80.873
//     512 |     8870.3 |   -22945.0 |    31815.3 | 1.0000 |   -0.1522      | 94.182
//    1024 |    12398.3 |    30096.8 |   -17698.4 | 1.0000 |   0.0998      | 111.348
//     READ, and it cuts both ways. The decomposition is exact at all 30 rows (check = 1.0000).
//     On T_19 the linear term does collapse where the corpus measures: P(m)/gamma(0) runs
//     0.9159, 0.4812, 0.2482, 0.1384, 0.0293, -0.0104 at m = 2..64, so at m ~ 32-64 the
//     variance is carried entirely by -Q(m) and the identity IS doing work there. But it does
//     not stay collapsed -- P wanders back to -0.1522 at m = 512 -- and gamma(k) has no decay
//     scale, so there is no single L, no plateau inside m <= 1024 at T_17 or T_19, and no
//     warrant for "Var(S_m)/m -> 0". Only T_13, whose m reaches a fixed fraction of D, shows
//     the plateau: sd_m sits at 29.867 to 40.771 across m = 128..512 while sqrt(m) doubles.
//
// [0.8s] done
// ============================================================
// READINGS
// ============================================================
//
// 1. THE IDENTITY IS TRUE, AND IT IS ONE LINE. [PROVEN] sum_k gamma(k)
//    = (1/D)(sum_i c_i)^2 and sum_i c_i = W - D*mbar = 0. The residuals are
//    6.040e-14, 1.151e-12, 4.986e-11, -9.551e-10 at T_11..T_19, against
//    gamma(0) = 88.2765, 144.7829, 212.7601, 294.5268; the O(D^2) confirmation
//    over every lag reads 8.509e-13 at T_11 and 7.292e-12 at T_13. Nothing in
//    the corpus disputes this half and nothing needed to.
//
// 2. THE IMPLICATION IS FALSE, AND THE COUNTEREXAMPLE COSTS NOTHING.
//    [PROVEN + VERIFIED] sum_k gamma(k) depends on the gap word only through
//    sum_i c_i, so it is invariant under every permutation of the word, while
//    sd_m is not. Reshuffling the SAME multiset of tile gaps therefore gives a
//    word obeying the hypothesis exactly, and it measures 0.4989, 0.4974,
//    0.5021 at T_19 against the real word's 0.3001 +/- 0.0130. The exact
//    finite-population law Var(S_m) = m sigma^2 (D-m)/(D-1) predicts the slope
//    0.5000 there, and the shuffles land on it. A hypothesis satisfied by every
//    ordering cannot forbid a conclusion that one ordering satisfies exactly.
//
// 3. THE IDENTITY EXPLAINS A VANISHING SHARE OF THE MEASURED DEFICIT, AND THE
//    SHARE VANISHES FASTER AS THE TILE GROWS. [MEASURED] At m = 64 the
//    measured variance deficit is 82.93%, 82.39%, 78.78% at T_13, T_17, T_19
//    while the deficit the identity forces, (m-1)/(D-1), is 4.25e+0%,
//    2.83e-1%, 1.66e-2%. The ratio is 20x, 291x, 4735x and grows by an order of
//    magnitude per level. An explanation whose share of the effect falls by a
//    factor of ten per level is not the explanation.
//
// 4. THE REAL ANTICORRELATION IS SHORT-RANGE AND IS NOT WHAT THE IDENTITY
//    SAYS. [MEASURED] Lam(K) = 2 sum_{k<=K} gamma(k)/gamma(0) reaches -0.4839,
//    -0.9182, -0.9886 by K = 64 at T_13, T_17, T_19, where spending the budget
//    uniformly over all D-1 lags would give -8.63e-2, -5.75e-3, -3.38e-4. So
//    the tile word really is strongly anticorrelated at lags of order ten; that
//    is a fact about this word and not about its sum.
//
// 5. WHAT THE IDENTITY DOES PROVE: A COMPLEMENTARY-WINDOW DUALITY, EXACT AND
//    NEW TO THE CORPUS. [PROVEN, VERIFIED] On the cyclic word,
//    S_m(i) + S_{D-m}(i+m) = W, hence maxsum_m + minsum_{D-m} = W and
//    sd_m = sd_{D-m}. Checked at fifteen values of m on T_13: every
//    maxsum_m + minsum_{D-m} column reads 30030 = W exactly, and the sd pair
//    agrees to 3.23e-11 or better. The variance curve is symmetric about D/2,
//    peaks at m = 742 with sd 3.554 times sd_1, and returns to sd_1 at
//    m = D-1. The identity is the m = D endpoint of this duality.
//
// 6. THE REPAIR, AND WHY IT IS NOT AVAILABLE HERE. [MEASURED] The exact split
//    Var(S_m) = m*P(m) - Q(m) reproduces the variance at all 30 rows to
//    check = 1.0000. On T_19, P(m)/gamma(0) falls 0.9159, 0.4812, 0.2482,
//    0.1384, 0.0293, -0.0104 across m = 2..64, so the linear term really is
//    destroyed on exactly the range the corpus measures, and the surviving
//    -Q(m) is what a sub-sqrt(m) exponent looks like. But P does not stay
//    destroyed -- -0.1522 at m = 512 -- and gamma has no decay scale, so the
//    step from "P(m) is small here" to "Var(S_m)/m -> 0" is not available.
//    The correct sufficient hypothesis is the identity PLUS a lag scale L with
//    m >> L, and supplying that L is a separate and unsolved problem.
//
// 7. NET VERDICT FOR IMPORT-MAP ROW 1 AND TODO 0c. The offered one-liner is
//    HALF RIGHT and its stated conclusion is REFUTED. sqrt(m) is not forbidden
//    by an identity; it is forbidden by measurement, which is what
//    import-chaining-03.js already said. TODO 0c's instruction should be "fit
//    H as a function of D and m" for the reason given in reading 6, not for
//    the reason given in the map.
