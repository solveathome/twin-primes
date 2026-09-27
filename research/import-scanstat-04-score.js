// ============================================================================
// import-scanstat-04-score.js  —  SCORING THE PRE-REGISTERED PREDICTIONS
// foreign-import experiment, IMPORT-MAP row 1 (scan statistics), part 4 of 4
// ============================================================================
// Computes the moving-sum family at T_23 (in memory) and at T_29 (segmented
// streaming, the compute lever: 6.47e9 positions, 2.15e8 slots, ring buffer of
// depth 64, no gap word ever materialised), then scores the two laws frozen by
// research/import-scanstat-03-prereg.js into
// research/history/staging/import-scanstat-prereg.md.
//
//   MODEL A   sd_m = c* m^H*        the import's two-parameter fix
//   MODEL B   sd_m = sd_1* sqrt(m)  TODO 0c's incumbent
//   riders    A' and B' anchored at the target level's EXACT sd_1, so that the
//             comparison is the exponent alone
//   maxsum_m = m*mbar + sd_m*sqrt(2 ln D) in every case
//   KILL      A must beat B on ln-RMS of excess_m = maxsum_m - m*mbar at T_23
//
// CUSTODY. The fit is recomputed here from T_13, T_17, T_19 by the same rule
// and checked against the frozen file row by row before anything is scored; a
// mismatch aborts.
//
//   node --max-old-space-size=8192 research/import-scanstat-04-score.js
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const fs=require('fs'), path=require('path');
const C2=require('./import-chaining-02.js');

const MS=[1,2,3,4,6,8,12,16,24,32,48,64];
const MMAX=64, RING=128, MASK=127;
const FIT=[13,17,19];

function primesTo(n){ const s=[]; for(let i=2;i<=n;i++){ let p=true; for(let j=2;j*j<=i;j++) if(i%j===0){p=false;break;} if(p) s.push(i);} return s; }
function tileDW(x){ let D=1,W=6; for(const p of primesTo(x)) if(p>=5){ D*=(p-2); W*=p; } return {D,W}; }
function ols(xs,ys){ const n=xs.length; const mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0,sxx=0; for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; }
  const b=sxy/sxx, a=my-b*mx; let ss=0; for(let i=0;i<n;i++) ss+=(ys[i]-a-b*xs[i])**2;
  const se=n>2?Math.sqrt(ss/(n-2)/sxx):NaN; return {a,b,se}; }

// ---- exact moving-sum family by streaming the slot sequence -----------------
function streamStats(x){
  const PR=primesTo(x);
  const {D:Dexp,W}=tileDW(x);
  const SEG=100_000_000;
  const buf=new Uint8Array(Math.min(SEG,W));
  const ring=new Float64Array(RING);
  const nM=MS.length;
  const mx=new Float64Array(nM).fill(-Infinity), sm=new Float64Array(nM), s2=new Float64Array(nM);
  const mn=new Float64Array(nM).fill(Infinity);
  const head=new Float64Array(MMAX);            // first MMAX slots, for the wrap
  let j=0;                                      // global slot index
  const emit=(s)=>{ ring[j&MASK]=s; if(j<MMAX) head[j]=s;
    for(let t=0;t<nM;t++){ const m=MS[t], i=j-m; if(i>=0&&i<Dexp){ const v=s-ring[i&MASK];
      if(v>mx[t])mx[t]=v; if(v<mn[t])mn[t]=v; sm[t]+=v; s2[t]+=v*v; } }
    j++; };
  for(let base=0;base<W;base+=SEG){
    const len=Math.min(SEG,W-base); buf.fill(0,0,len);
    for(const p of PR){ const rs = p===2?[0]:[0,p-2];
      for(const res of rs){ let k=res-(base%p); if(k<0)k+=p; for(;k<len;k+=p) buf[k]=1; } }
    for(let i=0;i<len;i++) if(!buf[i]) emit(base+i);
  }
  const D=j;
  if(D!==Dexp) throw new Error(`slot count ${D} != prod(p-2) ${Dexp}`);
  for(let k=0;k<MMAX;k++) emit(head[k]+W);      // cyclic completion, window starts < D only
  const rows=[];
  for(let t=0;t<nM;t++){ const mean=sm[t]/D, sd=Math.sqrt(Math.max(0,s2[t]/D-mean*mean));
    rows.push({m:MS[t], maxsum:mx[t], minsum:mn[t], mean, sd}); }
  return {D,W,rows};
}

function score(actual, pred){ // arrays aligned to MS
  let s=0,mxr=0; for(let i=0;i<actual.length;i++){ const r=Math.log(pred[i]/actual[i]); s+=r*r;
    const rel=Math.abs(pred[i]/actual[i]-1); if(rel>mxr) mxr=rel; }
  return {rms:Math.sqrt(s/actual.length), maxrel:mxr}; }

function main(){
console.log('IMPORT-MAP row 1 / part 4 --- computing T_23 and T_29, scoring the frozen laws\n');

// ---- refit and check against the frozen file
const fr=[];
for(const x of FIT){ const T=C2.tile(x); const st=C2.maxsumStats(T,MS);
  const f=ols(MS.map(Math.log), st.map(r=>Math.log(r.sd)));
  fr.push({x,D:T.D,lnD:Math.log(T.D),sd1:st[0].sd,a:f.a,H:f.b}); }
const fa=ols(fr.map(r=>r.lnD), fr.map(r=>r.a));
const fH=ols(fr.map(r=>r.lnD), fr.map(r=>r.H));
const fb=ols(fr.map(r=>r.lnD), fr.map(r=>Math.log(r.sd1)));
const frozen=fs.readFileSync(path.resolve(__dirname,'history','staging','import-scanstat-prereg.md'),'utf8');
console.log('(0) CUSTODY: refit vs the frozen pre-registration file');
let bad=0;
for(const x of [23,29]){
  const {D,W}=tileDW(x); const lnD=Math.log(D), mbar=W/D, tail=Math.sqrt(2*lnD);
  const A=Math.exp(fa.a+fa.b*lnD), H=fH.a+fH.b*lnD, B=Math.exp(fb.a+fb.b*lnD);
  for(const m of MS){ const sdA=A*Math.pow(m,H), sdB=B*Math.sqrt(m);
    const want=`| ${m} | ${sdA.toFixed(3)} | ${(m*mbar+sdA*tail).toFixed(1)} | ${sdB.toFixed(3)} | ${(m*mbar+sdB*tail).toFixed(1)} |`;
    if(!frozen.includes(want)){ bad++; console.log('   MISMATCH  '+want); } }
}
if(bad) throw new Error(`${bad} pre-registered rows do not match the refit`);
console.log(`   all ${2*MS.length} pre-registered rows reproduce exactly.  [${el()}]`);

// ---- the two target levels
const out={};
for(const x of [23,29]){
  const t=streamStats(x); out[x]=t;
  console.log(`\n(${x===23?'1':'2'}) T_${x} COMPUTED.  D = ${t.D}   W = ${t.W}   mbar = ${(t.W/t.D).toFixed(5)}   sqrt(2 lnD) = ${Math.sqrt(2*Math.log(t.D)).toFixed(4)}   [${el()}]`);
  const s1=t.rows[0].sd;
  const f=ols(MS.map(Math.log), t.rows.map(r=>Math.log(r.sd)));
  console.log(`    measured exponent H(T_${x}) = ${f.b.toFixed(4)} +/- ${f.se.toFixed(4)}     exact sd_1 = ${s1.toFixed(4)}`);
  console.log('    m |  maxsum_m | excess_m |   sd_m   | sd_m/(sd_1 sqrt m) | excess/sd_m');
  for(const r of t.rows){ const exc=r.maxsum-r.m*t.W/t.D;
    console.log(`  ${String(r.m).padStart(3)} | ${String(r.maxsum).padStart(9)} | ${exc.toFixed(1).padStart(8)} | ${r.sd.toFixed(3).padStart(8)} |       ${(r.sd/(s1*Math.sqrt(r.m))).toFixed(4)}       |   ${(exc/r.sd).toFixed(3)}`); }
}

// ---- the exponent, in and out of sample, in one place
console.log('\n(3) THE EXPONENT SERIES AND THE PRE-REGISTERED PREDICTION');
console.log('  level |   lnD   | measured H  +/- se | pre-registered H* | miss (in s.e.)');
for(const r of fr) console.log(`  T_${String(r.x).padStart(2)} | ${r.lnD.toFixed(4)} |   ${r.H.toFixed(4)} (in sample) |        --         |    --`);
for(const x of [23,29]){ const t=out[x]; const lnD=Math.log(t.D);
  const f=ols(MS.map(Math.log), t.rows.map(r=>Math.log(r.sd)));
  const Hs=fH.a+fH.b*lnD;
  console.log(`  T_${String(x).padStart(2)} | ${lnD.toFixed(4)} |   ${f.b.toFixed(4)} +/- ${f.se.toFixed(4)}  |      ${Hs.toFixed(4)}       |   ${Math.abs(f.b-Hs).toFixed(4)} = ${(Math.abs(f.b-Hs)/f.se).toFixed(2)} s.e.`); }

console.log('\n(4) THE OUT-OF-SAMPLE SCORE, against the frozen predictions');
console.log('  level | quantity | model | ln-RMS  | max |rel err| | verdict');
for(const x of [23,29]){
  const t=out[x], mbar=t.W/t.D, lnD=Math.log(t.D), tail=Math.sqrt(2*lnD), s1=t.rows[0].sd;
  const A=Math.exp(fa.a+fa.b*lnD), H=fH.a+fH.b*lnD, B=Math.exp(fb.a+fb.b*lnD);
  const actSd=t.rows.map(r=>r.sd), actEx=t.rows.map(r=>r.maxsum-r.m*mbar);
  const mk=(c,h)=>MS.map(m=>c*Math.pow(m,h));
  const cases=[['A  c* m^H*        ', mk(A,H)], ['B  sd_1* sqrt m   ', mk(B,0.5)],
               ["A' sd_1 m^H*      ", mk(s1,H)], ["B' sd_1 sqrt m    ", mk(s1,0.5)]];
  for(const [name,sd] of cases){
    const ex=sd.map((v,i)=>v*tail);
    const a=score(actSd,sd), b=score(actEx,ex);
    console.log(`  T_${String(x).padStart(2)} |   sd_m   | ${name} | ${a.rms.toFixed(4)} |    ${(a.maxrel*100).toFixed(1)}%     |`);
    console.log(`  T_${String(x).padStart(2)} | excess_m | ${name} | ${b.rms.toFixed(4)} |    ${(b.maxrel*100).toFixed(1)}%     |`);
  }
  const exA=score(actEx, mk(A,H).map(v=>v*tail)), exB=score(actEx, mk(B,0.5).map(v=>v*tail));
  const exA2=score(actEx, mk(s1,H).map(v=>v*tail)), exB2=score(actEx, mk(s1,0.5).map(v=>v*tail));
  console.log(`  T_${x} KILL CRITERION on excess_m: A ${exA.rms.toFixed(4)} vs B ${exB.rms.toFixed(4)}  ->  ${exA.rms<exB.rms?'A WINS, import survives':'A LOSES, import fails'}`);
  console.log(`  T_${x} anchored rider          : A' ${exA2.rms.toFixed(4)} vs B' ${exB2.rms.toFixed(4)}  ->  ${exA2.rms<exB2.rms?"A' wins":"A' loses"}   (ratio B'/A' = ${(exB2.rms/exA2.rms).toFixed(2)})`);
}
console.log(`\n[${el()}] done`);
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=8192 research/import-scanstat-04-score.js
//   invocation:  node --max-old-space-size=8192 research/import-scanstat-04-score.js
//   code-sha256: 8e862e4a180b1393245c8fddb7d4febd8a51bdfcbde1a9ea34eb512a791df9b9
//   out-sha256:  c7692a58457d16227c4f0c70545aa06c4c4c32564a95cb41fe9a72d90ed71be3
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     39.0 s
// ============================================================================
// IMPORT-MAP row 1 / part 4 --- computing T_23 and T_29, scoring the frozen laws
//
// (0) CUSTODY: refit vs the frozen pre-registration file
//    all 24 pre-registered rows reproduce exactly.  [0.5s]
//
// (1) T_23 COMPUTED.  D = 7952175   W = 223092870   mbar = 28.05432   sqrt(2 lnD) = 5.6372   [1.4s]
//     measured exponent H(T_23) = 0.3216 +/- 0.0096     exact sd_1 = 19.4656
//     m |  maxsum_m | excess_m |   sd_m   | sd_m/(sd_1 sqrt m) | excess/sd_m
//     1 |       204 |    175.9 |   19.466 |       1.0000       |   9.039
//     2 |       234 |    177.9 |   26.898 |       0.9771       |   6.614
//     3 |       300 |    215.8 |   31.814 |       0.9436       |   6.784
//     4 |       348 |    235.8 |   34.422 |       0.8842       |   6.850
//     6 |       462 |    293.7 |   36.690 |       0.7695       |   8.004
//     8 |       528 |    303.6 |   40.734 |       0.7399       |   7.452
//    12 |       612 |    275.3 |   49.055 |       0.7275       |   5.613
//    16 |       750 |    301.1 |   52.145 |       0.6697       |   5.775
//    24 |       990 |    316.7 |   59.463 |       0.6236       |   5.326
//    32 |      1218 |    320.3 |   65.438 |       0.5943       |   4.894
//    48 |      1710 |    363.4 |   71.557 |       0.5306       |   5.078
//    64 |      2160 |    364.5 |   77.435 |       0.4973       |   4.707
//
// (2) T_29 COMPUTED.  D = 214708725   W = 6469693230   mbar = 30.13242   sqrt(2 lnD) = 6.1943   [38.9s]
//     measured exponent H(T_29) = 0.3367 +/- 0.0080     exact sd_1 = 21.4409
//     m |  maxsum_m | excess_m |   sd_m   | sd_m/(sd_1 sqrt m) | excess/sd_m
//     1 |       258 |    227.9 |   21.441 |       1.0000       |   10.628
//     2 |       330 |    269.7 |   29.549 |       0.9745       |   9.128
//     3 |       390 |    299.6 |   34.751 |       0.9358       |   8.621
//     4 |       420 |    299.5 |   37.662 |       0.8783       |   7.951
//     6 |       540 |    359.2 |   41.335 |       0.7870       |   8.690
//     8 |       582 |    340.9 |   46.659 |       0.7694       |   7.307
//    12 |       726 |    364.4 |   54.105 |       0.7285       |   6.735
//    16 |       882 |    399.9 |   59.474 |       0.6935       |   6.724
//    24 |      1134 |    410.8 |   68.381 |       0.6510       |   6.008
//    32 |      1428 |    463.8 |   75.274 |       0.6206       |   6.161
//    48 |      1902 |    455.6 |   82.721 |       0.5569       |   5.508
//    64 |      2442 |    513.5 |   89.348 |       0.5209       |   5.747
//
// (3) THE EXPONENT SERIES AND THE PRE-REGISTERED PREDICTION
//   level |   lnD   | measured H  +/- se | pre-registered H* | miss (in s.e.)
//   T_13 | 7.3032 |   0.2661 (in sample) |        --         |    --
//   T_17 | 10.0112 |   0.2804 (in sample) |        --         |    --
//   T_19 | 12.8444 |   0.3001 (in sample) |        --         |    --
//   T_23 | 15.8890 |   0.3216 +/- 0.0096  |      0.3181       |   0.0036 = 0.37 s.e.
//   T_29 | 19.1848 |   0.3367 +/- 0.0080  |      0.3383       |   0.0016 = 0.21 s.e.
//
// (4) THE OUT-OF-SAMPLE SCORE, against the frozen predictions
//   level | quantity | model | ln-RMS  | max |rel err| | verdict
//   T_23 |   sd_m   | A  c* m^H*         | 0.0592 |    14.6%     |
//   T_23 | excess_m | A  c* m^H*         | 0.1952 |    29.6%     |
//   T_23 |   sd_m   | B  sd_1* sqrt m    | 0.4532 |    116.8%     |
//   T_23 | excess_m | B  sd_1* sqrt m    | 0.5013 |    159.6%     |
//   T_23 |   sd_m   | A' sd_1 m^H*       | 0.0991 |    13.2%     |
//   T_23 | excess_m | A' sd_1 m^H*       | 0.2669 |    37.6%     |
//   T_23 |   sd_m   | B' sd_1 sqrt m     | 0.3899 |    101.1%     |
//   T_23 | excess_m | B' sd_1 sqrt m     | 0.4612 |    140.8%     |
//   T_23 KILL CRITERION on excess_m: A 0.1952 vs B 0.5013  ->  A WINS, import survives
//   T_23 anchored rider          : A' 0.2669 vs B' 0.4612  ->  A' wins   (ratio B'/A' = 1.73)
//   T_29 |   sd_m   | A  c* m^H*         | 0.1496 |    23.9%     |
//   T_29 | excess_m | A  c* m^H*         | 0.1998 |    33.8%     |
//   T_29 |   sd_m   | B  sd_1* sqrt m    | 0.5275 |    132.0%     |
//   T_29 | excess_m | B  sd_1* sqrt m    | 0.5136 |    150.1%     |
//   T_29 |   sd_m   | A' sd_1 m^H*       | 0.0747 |    10.5%     |
//   T_29 | excess_m | A' sd_1 m^H*       | 0.3044 |    41.7%     |
//   T_29 |   sd_m   | B' sd_1 sqrt m     | 0.3608 |    92.0%     |
//   T_29 | excess_m | B' sd_1 sqrt m     | 0.4211 |    106.9%     |
//   T_29 KILL CRITERION on excess_m: A 0.1998 vs B 0.5136  ->  A WINS, import survives
//   T_29 anchored rider          : A' 0.3044 vs B' 0.4211  ->  A' wins   (ratio B'/A' = 1.38)
//
// [38.9s] done
// ============================================================
// READINGS
// ============================================================
//
// 1. THE ENGINE IS RIGHT, ON TWO INDEPENDENT CHECKS. [VERIFIED] The streaming
//    ring-buffer walker gives maxsum_1 = 204 at T_23 and 258 at T_29, which are
//    G2(23#) and G2(29#) as carried by research/exact-g2-ladder.js and by
//    research/05b-twin-jacobsthal-segmented.js. Its slot counts reproduce
//    prod(p-2) = 7952175 and 214708725 exactly, and it never materialises a gap
//    word: T_29 is W = 6469693230 positions in 38.9 s and constant memory.
//
// 2. THE T_23 EXPONENT REPRODUCES. [VERIFIED] H(T_23) = 0.3216 +/- 0.0096 here
//    against 0.3216 +/- 0.0096 in import-chaining-03.js (d), from a different
//    code path (streaming ring buffer against an in-memory slot array), and the
//    column sd_m/(sd_1 sqrt m) matches it to four figures at all twelve m.
//
// 3. THE BLIND LEVEL LANDS ON THE PREDICTION. [MEASURED] T_29 has never been
//    computed in this corpus for any moving-sum statistic. The pre-registered
//    H* was 0.3383; the measured H(T_29) is 0.3367 +/- 0.0080. The miss is
//    0.0016, a fifth of one standard error. The exponent series is now 0.2661,
//    0.2804, 0.3001, 0.3216, 0.3367 at five exactly computable levels.
//
// 4. THE KILL CRITERION IS PASSED, AT BOTH LEVELS, WIDELY. [MEASURED] On
//    excess_m the ln-RMS is A 0.1952 against B 0.5013 at T_23 and A 0.1998
//    against B 0.5136 at T_29. On sd_m alone it is 0.0592 against 0.4532 and
//    0.1496 against 0.5275. The anchored riders, which differ from each other
//    in exactly one number, give A' 0.2669 against B' 0.4612 at T_23 and A'
//    0.3044 against B' 0.4211 at T_29. Every comparison goes the same way.
//
// 5. THE INCUMBENT IS NOT MERELY BEATEN, IT IS OUT BY A FACTOR OF TWO.
//    [MEASURED] Model B's worst relative error on excess_m is 159.6% at T_23
//    and 150.1% at T_29; sd_m/(sd_1 sqrt m) reaches 0.4973 at T_23 and 0.5209
//    at T_29 at m = 64. sigma sqrt(m) overstates the fluctuation by a factor
//    two at the top of the grid, at every level tested.
//
// 6. AND THE REPLACEMENT IS NOT A LAW EITHER. [MEASURED] Model A still carries
//    a 29.6% worst-case error at T_23 and 33.8% at T_29 on excess_m, because
//    the tail factor is not sqrt(2 ln D): excess/sd_m runs 9.039 down to 4.707
//    at T_23 and 10.628 down to 5.747 at T_29 against sqrt(2 lnD) = 5.6372 and
//    6.1943. The m-dependence has moved out of the sd factor and into the tail
//    factor; it has not been removed. What is established is the exponent, not
//    the law.
//
// 7. WHAT THIS SETTLES FOR TODO 0c. The sqrt(m) in
//    maxsum_m = m*mbar + sigma sqrt(2 m ln D) is refuted out of sample at two
//    further levels, one of them blind, and the replacement exponent is
//    level-dependent: H rises from 0.2661 at T_13 to 0.3367 at T_29 with no
//    sign of settling. "Fit H as a function of D and m" is now backed
//    by a prediction that worked, and no single-sigma form should be quoted.
