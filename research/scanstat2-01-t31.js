// ============================================================================
// scanstat2-01-t31.js  —  THE SIXTH EXACT LEVEL, AND THE TAIL-FACTOR TEST
// follow-up to the foreign import at IMPORT-MAP row 1, part 1 of 2
// ============================================================================
// research/history/staging/import-scanstat.md sec.6 named exactly two things it
// did not reach: T_31 was not computed, and the tail factor was not explained.
// This file does both, against predictions frozen and committed BEFORE it was
// written, at research/history/staging/scanstat2-prereg.md (commit "prereg:
// scanstat2", that file alone in the commit).
//
// (1) T_31 BY THE STREAMING ENGINE. W = 200560490130 positions, D =
//     6226553025 slots, ring buffer of depth 128, no gap word materialised.
//     Custody gates, all of which abort the run: slot count = prod(p-2);
//     maxsum_1 = 348 = G2(31#), the eleventh exact ladder entry
//     (research/exact-g2-ladder.js); mbar*D = W exactly. The same engine is run
//     first at T_23 and T_29, where it must return 204 and 258 and reproduce
//     H = 0.3216 and 0.3367 to four decimals. That recomputation of embedded
//     artifacts is deliberate: the five-level refit that the pre-registration
//     rests on has T_23 and T_29 among its inputs, and a producer that took
//     them on trust could not check its own premise.
//
// (2) THE TAIL FACTOR. excess_m/sd_m is not the constant sqrt(2 lnD): it falls
//     from 9.039 to 4.707 across the grid at T_23. The candidate on file is
//     Leadbetter's extremal-index correction, sqrt(2 ln(theta_m D)). theta is
//     measured here at T_23 (where it must reproduce the embedded values of
//     research/import-scanstat-02-leadbetter.js), at T_29 and at T_31, by the
//     same estimators, from HISTOGRAMS accumulated in the single streaming
//     pass. The identity that makes the runs estimator streamable is
//
//       #{i : X_i > u, max(X_{i+1..i+r}) <= u}
//              = #{i : max(X_{i..i+r}) > u} - #{i : max(X_{i+1..i+r}) > u},
//
//     i.e. the difference of the exceedance counts of the sliding maxima at
//     window lengths r+1 and r, and both of those are one-dimensional
//     histograms. The blocks estimator needs only the histogram of block
//     maxima. So no exceedance position is ever stored.
//
// The verdict rule, the flatness statistic Delta, and the sign gate are all
// fixed in the pre-registration and are not restated as choices here.
//
//   node --max-old-space-size=8192 research/scanstat2-01-t31.js      (~40 min)
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const fs=require('fs'), path=require('path');
const C2=require('./import-chaining-02.js');

const MS=[1,2,3,4,6,8,12,16,24,32,48,64];       // the frozen grid
const MTH=[1,8,32];                              // the theta grid, from the prereg
const PTAIL=1e-2;                                // the threshold's target exceedance rate
const MMAX=64, RING=128, MASK=127, HB=4096;
const FIT=[13,17,19];                            // in-memory levels
const ANCHOR=[23,29];                            // streamed anchors, also refit inputs
const TARGETS=[31];                              // the new level
const T975_3=3.182446305284264;

// published, four decimals, from the embedded outputs cited in the prereg
const PUB_H ={13:0.2661,17:0.2804,19:0.3001,23:0.3216,29:0.3367};
const PUB_SD1={13:12.0326,17:14.5863,19:17.1618,23:19.4656,29:21.4409};
// embedded theta at T_23, research/import-scanstat-02-leadbetter.js, p = 1e-2
const PUB_TH_RUNS ={1:0.9998,8:0.5188,32:0.2350};
const PUB_TH_BLOCKS={1:0.9988,8:0.5292,32:0.2334};

function primesTo(n){ const s=[]; for(let i=2;i<=n;i++){ let p=true; for(let j=2;j*j<=i;j++) if(i%j===0){p=false;break;} if(p) s.push(i);} return s; }
function tileDW(x){ let D=1,W=6; for(const p of primesTo(x)) if(p>=5){ D*=(p-2); W*=p; } return {D,W}; }
function ols(xs,ys){ const n=xs.length; const mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0,sxx=0; for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; }
  const b=sxy/sxx, a=my-b*mx; let ss=0; for(let i=0;i<n;i++) ss+=(ys[i]-a-b*xs[i])**2;
  const s=n>2?Math.sqrt(ss/(n-2)):NaN;
  return {a,b,se:n>2?s/Math.sqrt(sxx):NaN, s, mx, sxx, n}; }
function bandAt(f,x0,t){ const se=f.s*Math.sqrt(1/f.n+(x0-f.mx)**2/f.sxx); const p=f.a+f.b*x0;
  const sep=f.s*Math.sqrt(1+1/f.n+(x0-f.mx)**2/f.sxx);
  return {p, se, lo:p-t*se, hi:p+t*se, plo:p-t*sep, phi:p+t*sep}; }
function popsd(v){ const n=v.length, m=v.reduce((a,b)=>a+b)/n; return Math.sqrt(v.reduce((a,b)=>a+(b-m)**2,0)/n); }
function lnrms(actual,pred){ let s=0,mr=0; for(let i=0;i<actual.length;i++){ const r=Math.log(pred[i]/actual[i]); s+=r*r;
  const rel=Math.abs(pred[i]/actual[i]-1); if(rel>mr) mr=rel; } return {rms:Math.sqrt(s/actual.length), maxrel:mr}; }

// ---------------------------------------------------------------------------
// the engine: exact moving-sum family + theta histograms, one streaming pass
// ---------------------------------------------------------------------------
function streamStats(x){
  const PR=primesTo(x);
  const {D:Dexp,W}=tileDW(x);
  const SEG=100_000_000;
  const buf=new Uint8Array(Math.min(SEG,W));
  const ring=new Float64Array(RING);
  const nM=MS.length, nT=MTH.length;
  const mx=new Float64Array(nM).fill(-Infinity), mn=new Float64Array(nM).fill(Infinity);
  const sm=new Float64Array(nM), s2=new Float64Array(nM);
  const head=new Float64Array(MMAX);

  // --- theta state, flattened; counts are Float64 because D exceeds 2^31 ----
  const hX=new Float64Array(nT*HB), hA=new Float64Array(nT*HB),
        hB=new Float64Array(nT*HB), hK=new Float64Array(nT*HB);
  const dqCap=new Int32Array(nT), dqOff=new Int32Array(nT),
        dqHead=new Int32Array(nT), dqN=new Int32Array(nT);
  const xCap=new Int32Array(nT), xOff=new Int32Array(nT);
  const blkB=new Int32Array(nT), blkLim=new Float64Array(nT), blkMax=new Int32Array(nT),
        blkCnt=new Int32Array(nT);
  const iLim=new Float64Array(nT);
  let dqTot=0, xTot=0;
  for(let t=0;t<nT;t++){ const m=MTH[t];
    let c=1; while(c<m+2) c<<=1; dqCap[t]=c; dqOff[t]=dqTot; dqTot+=c;
    let xc=1; while(xc<m+4) xc<<=1; xCap[t]=xc; xOff[t]=xTot; xTot+=xc;
    blkB[t]=4*m; blkCnt[t]=4*m; blkLim[t]=Math.floor(Dexp/(4*m))*(4*m); iLim[t]=Dexp+m-1; }
  const dqV=new Int32Array(dqTot), dqI=new Float64Array(dqTot), xR=new Int32Array(xTot);

  let j=0;
  const emit=(s)=>{
    ring[j&MASK]=s; if(j<MMAX) head[j]=s;
    for(let t=0;t<nM;t++){ const m=MS[t], i=j-m;
      if(i>=0&&i<Dexp){ const v=s-ring[i&MASK];
        if(v>mx[t])mx[t]=v; if(v<mn[t])mn[t]=v; sm[t]+=v; s2[t]+=v*v; } }
    for(let t=0;t<nT;t++){ const m=MTH[t], i=j-m;
      if(i<0||i>iLim[t]) continue;
      const v=s-ring[i&MASK];
      if(v>=HB) throw new Error(`histogram overflow: X_${m} = ${v} at i = ${i}`);
      const base=t*HB;
      if(i<Dexp) hX[base+v]++;
      // block maxima, non-overlapping blocks of length 4m, index < floor(D/4m)
      if(i<blkLim[t]){ if(v>blkMax[t]) blkMax[t]=v;
        if(--blkCnt[t]===0){ hK[base+blkMax[t]]++; blkMax[t]=0; blkCnt[t]=blkB[t]; } }
      // sliding maximum over the window of length m, monotonic deque held as
      // (ring head, count) so that every index into it stays a small integer:
      // a raw counter would pass 2^31 at this D and a mask on it would be wrong
      const off=dqOff[t], msk=dqCap[t]-1;
      let h=dqHead[t], n=dqN[t];
      while(n>0 && dqV[off+((h+n-1)&msk)]<=v) n--;
      const wp=off+((h+n)&msk); dqV[wp]=v; dqI[wp]=i; n++;
      const lo=i-m+1;
      while(dqI[off+h]<lo){ h=(h+1)&msk; n--; }
      dqHead[t]=h; dqN[t]=n;
      const xo=xOff[t], xm=xCap[t]-1;
      xR[xo+(i&xm)]=v;
      if(i>=m-1){ const Mm=dqV[off+h];
        if(lo<Dexp) hA[base+Mm]++;
        if(lo>=1 && lo-1<Dexp){ const xs=xR[xo+((i-m)&xm)];
          hB[base+(xs>Mm?xs:Mm)]++; } }
    }
    j++;
  };

  for(let base=0;base<W;base+=SEG){
    const len=Math.min(SEG,W-base); buf.fill(0,0,len);
    for(const p of PR){ const rs = p===2?[0]:[0,p-2];
      for(const res of rs){ let k=res-(base%p); if(k<0)k+=p; for(;k<len;k+=p) buf[k]=1; } }
    for(let i=0;i<len;i++) if(!buf[i]) emit(base+i);
  }
  const D=j;
  if(D!==Dexp) throw new Error(`slot count ${D} != prod(p-2) ${Dexp}`);
  for(let k=0;k<MMAX;k++) emit(head[k]+W);

  const rows=[];
  for(let t=0;t<nM;t++){ const mean=sm[t]/D, sd=Math.sqrt(Math.max(0,s2[t]/D-mean*mean));
    rows.push({m:MS[t], maxsum:mx[t], minsum:mn[t], mean, sd}); }

  // --- thresholds and the two extremal-index estimators --------------------
  const theta=[];
  for(let t=0;t<nT;t++){ const base=t*HB, Kt=Math.max(1,Math.round(D*PTAIL));
    let hi=0; for(let v=HB-1;v>=0;v--) if(hX[base+v]>0){ hi=v; break; }
    let acc=0,u=hi;
    for(let v=hi;v>=0;v--){ if(acc+hX[base+v]>Kt){ u=v; break; } acc+=hX[base+v]; u=v-1; }
    const tail=(arr)=>{ let s=0; for(let v=u+1;v<HB;v++) s+=arr[base+v]; return s; };
    const K=tail(hX), nA=tail(hA), nB=tail(hB), nK=tail(hK);
    theta.push({m:MTH[t], u, K, nb:Math.floor(D/(4*MTH[t])),
      runs:(nB-nA)/K, blocks:nK/K}); }
  return {D,W,rows,theta};
}

// ---------------------------------------------------------------------------
function tailFactorRows(lbl,D,W,rows,theta){
  const mbar=W/D, lnD=Math.log(D), t0=Math.sqrt(2*lnD);
  const byM={}; for(const r of rows) byM[r.m]=r;
  const out=[];
  for(const th of theta){ const r=byM[th.m];
    const R=(r.maxsum-th.m*mbar)/r.sd;
    const tr=Math.sqrt(2*(lnD+Math.log(th.runs))), tb=Math.sqrt(2*(lnD+Math.log(th.blocks)));
    out.push({lbl,m:th.m,R,t0,tr,tb,thr:th.runs,thb:th.blocks,u:th.u,K:th.K,
      need:Math.exp(R*R/2)/D, sign:R>t0}); }
  const S0=popsd(out.map(o=>Math.log(o.R/o.t0)));
  const Sr=popsd(out.map(o=>Math.log(o.R/o.tr)));
  const Sb=popsd(out.map(o=>Math.log(o.R/o.tb)));
  return {rows:out,S0,Sr,Sb,dR:1-Sr/S0,dB:1-Sb/S0,lnD,t0};
}
function verdict(d){ return d>=0.50?'FLATTENS':(d>=0.20?'PARTIAL':'DOES NOT FLATTEN'); }

// ---------------------------------------------------------------------------
function main(){
console.log('scanstat2 part 1 --- T_31 by the streaming engine, and the tail-factor test\n');

const pre=fs.readFileSync(path.resolve(__dirname,'history','staging','scanstat2-prereg.md'),'utf8');

// (0) the three in-memory levels
console.log('(0) THE THREE IN-MEMORY LEVELS, recomputed, checked against the published four decimals');
console.log('  level |      D |   ln D  |   sd_1   |    H     | published H | published sd_1');
const lv={};
for(const x of FIT){ const T=C2.tile(x); const st=C2.maxsumStats(T,MS);
  const f=ols(MS.map(Math.log), st.map(r=>Math.log(r.sd)));
  lv[x]={D:T.D,W:T.W,lnD:Math.log(T.D),sd1:st[0].sd,H:f.b,se:f.se,rows:st.map(r=>({m:r.m,maxsum:r.maxsum,sd:r.sd}))};
  const okH=Math.abs(+f.b.toFixed(4)-PUB_H[x])<1e-9, okS=Math.abs(+st[0].sd.toFixed(4)-PUB_SD1[x])<1e-9;
  console.log(`  T_${String(x).padStart(2)} | ${String(T.D).padStart(6)} | ${Math.log(T.D).toFixed(4)} | ${st[0].sd.toFixed(4).padStart(8)} |  ${f.b.toFixed(4)}  |   ${PUB_H[x].toFixed(4)} ${okH?'ok':'MISMATCH'}   |  ${PUB_SD1[x].toFixed(4)} ${okS?'ok':'MISMATCH'}`);
  if(!okH||!okS) throw new Error(`T_${x} does not reproduce its published row`); }
console.log(`  [${el()}]`);

// (1)(2) the two streamed anchors
const st={};
for(const x of ANCHOR){
  const t=streamStats(x); st[x]=t;
  const f=ols(MS.map(Math.log), t.rows.map(r=>Math.log(r.sd)));
  lv[x]={D:t.D,W:t.W,lnD:Math.log(t.D),sd1:t.rows[0].sd,H:f.b,se:f.se,rows:t.rows,theta:t.theta};
  const g2={23:204,29:258}[x];
  const okD=t.D===tileDW(x).D, okG=t.rows[0].maxsum===g2, okW=Math.abs(t.W/t.D*t.D-t.W)<1e-6;
  const okH=Math.abs(+f.b.toFixed(4)-PUB_H[x])<1e-9, okS=Math.abs(+t.rows[0].sd.toFixed(4)-PUB_SD1[x])<1e-9;
  console.log(`\n(${x===23?'1':'2'}) T_${x} STREAMED (anchor).  D = ${t.D} ${okD?'ok':'MISMATCH'}   W = ${t.W}   maxsum_1 = ${t.rows[0].maxsum} vs G2(${x}#) = ${g2} ${okG?'ok':'MISMATCH'}   mbar*D = W ${okW?'ok':'MISMATCH'}   [${el()}]`);
  console.log(`    H = ${f.b.toFixed(4)} +/- ${f.se.toFixed(4)} vs published ${PUB_H[x].toFixed(4)} ${okH?'ok':'MISMATCH'}      sd_1 = ${t.rows[0].sd.toFixed(4)} vs ${PUB_SD1[x].toFixed(4)} ${okS?'ok':'MISMATCH'}`);
  if(!(okD&&okG&&okW&&okH&&okS)) throw new Error(`T_${x} custody gate failed`);
  console.log('     m |  theta u |         K | theta runs(m) | theta blocks(4m)');
  for(const th of t.theta) console.log(`    ${String(th.m).padStart(2)} | ${String(th.u).padStart(8)} | ${String(th.K).padStart(9)} |    ${th.runs.toFixed(4)}     |     ${th.blocks.toFixed(4)}`);
}
// theta custody at T_23 against the embedded leadbetter values
console.log('\n    THETA CUSTODY at T_23, against research/import-scanstat-02-leadbetter.js (p = 1e-2)');
let tbad=0;
for(const th of st[23].theta){
  const a=Math.abs(+th.runs.toFixed(4)-PUB_TH_RUNS[th.m]), b=Math.abs(+th.blocks.toFixed(4)-PUB_TH_BLOCKS[th.m]);
  const ok=a<1e-9&&b<1e-9; if(!ok) tbad++;
  console.log(`    m = ${String(th.m).padStart(2)}   runs ${th.runs.toFixed(4)} vs ${PUB_TH_RUNS[th.m].toFixed(4)}   blocks ${th.blocks.toFixed(4)} vs ${PUB_TH_BLOCKS[th.m].toFixed(4)}   ${ok?'ok':'MISMATCH'}`);
}
if(tbad) throw new Error(`${tbad} theta rows do not reproduce the embedded values: the streaming estimator is not the same estimator`);

// (3) the refit, checked against the frozen pre-registration
console.log('\n(3) THE FIVE-LEVEL REFIT, and the frozen pre-registration');
const LV5=[13,17,19,23,29];
const xs=LV5.map(l=>lv[l].lnD);
const fH=ols(xs, LV5.map(l=>PUB_H[l]));
const fS=ols(xs, LV5.map(l=>Math.log(PUB_SD1[l])));
const {D:D31,W:W31}=tileDW(31); const lnD31=Math.log(D31);
const bH=bandAt(fH,lnD31,T975_3), bS=bandAt(fS,lnD31,T975_3);
console.log(`  on the published four decimals:  H = ${fH.a.toFixed(6)} + ${fH.b.toFixed(6)} * lnD    s = ${fH.s.toExponential(4)}`);
console.log(`  H*(T_31) = ${bH.p.toFixed(6)}   95% band on the line = [${bH.lo.toFixed(6)}, ${bH.hi.toFixed(6)}]   95% prediction band = [${bH.plo.toFixed(6)}, ${bH.phi.toFixed(6)}]`);
console.log(`  ln sd_1 = ${fS.a.toFixed(6)} + ${fS.b.toFixed(6)} * lnD   ->   ln sd_1*(T_31) = ${bS.p.toFixed(6)}  (sd_1* = ${Math.exp(bS.p).toFixed(4)}),  band [${Math.exp(bS.lo).toFixed(4)}, ${Math.exp(bS.hi).toFixed(4)}]`);
const wants=[`H = ${fH.a.toFixed(6)} + ${fH.b.toFixed(6)} * lnD`,
             `(T₃₁) = ${bH.p.toFixed(6)}`,
             `[${bH.lo.toFixed(6)}, ${bH.hi.toFixed(6)}]`,
             `ln sd_1 = ${fS.a.toFixed(6)} + ${fS.b.toFixed(6)} * lnD`,
             `sd_1* = ${Math.exp(bS.p).toFixed(4)}`];
let miss=0; for(const w of wants){ const ok=pre.includes(w); if(!ok){miss++; console.log('   NOT IN THE FROZEN FILE: '+w);} }
if(miss) throw new Error(`${miss} refit lines are absent from the frozen pre-registration`);
console.log(`  all ${wants.length} pre-registered lines reproduce from the published inputs.`);
const fHx=ols(xs, LV5.map(l=>lv[l].H));
const bHx=bandAt(fHx,lnD31,T975_3);
console.log(`  robustness, same refit on FULL PRECISION H: ${fHx.a.toFixed(6)} + ${fHx.b.toFixed(6)} * lnD  ->  H* = ${bHx.p.toFixed(6)}, band [${bHx.lo.toFixed(6)}, ${bHx.hi.toFixed(6)}]`);

// (4) the target level
for(const x of TARGETS){
  const t=streamStats(x); st[x]=t;
  const f=ols(MS.map(Math.log), t.rows.map(r=>Math.log(r.sd)));
  lv[x]={D:t.D,W:t.W,lnD:Math.log(t.D),sd1:t.rows[0].sd,H:f.b,se:f.se,rows:t.rows,theta:t.theta};
  const okD=t.D===D31, okG=t.rows[0].maxsum===348, okW=t.W===W31;
  console.log(`\n(4) T_31 COMPUTED.  D = ${t.D} ${okD?'ok':'MISMATCH'}   W = ${t.W} ${okW?'ok':'MISMATCH'}   maxsum_1 = ${t.rows[0].maxsum} vs G2(31#) = 348 ${okG?'ok':'MISMATCH'}   mbar = ${(t.W/t.D).toFixed(5)}   sqrt(2 lnD) = ${Math.sqrt(2*Math.log(t.D)).toFixed(4)}   [${el()}]`);
  if(!(okD&&okG&&okW)) throw new Error('T_31 custody gate failed');
  console.log(`    measured exponent H(T_31) = ${f.b.toFixed(4)} +/- ${f.se.toFixed(4)}     exact sd_1 = ${t.rows[0].sd.toFixed(4)}`);
  console.log('    m |    maxsum_m | excess_m |   sd_m   | sd_m/(sd_1 sqrt m) | excess/sd_m |   minsum_m');
  const s1=t.rows[0].sd, mbar=t.W/t.D;
  for(const r of t.rows){ const exc=r.maxsum-r.m*mbar;
    console.log(`  ${String(r.m).padStart(3)} | ${String(r.maxsum).padStart(11)} | ${exc.toFixed(1).padStart(8)} | ${r.sd.toFixed(3).padStart(8)} |       ${(r.sd/(s1*Math.sqrt(r.m))).toFixed(4)}       |    ${(exc/r.sd).toFixed(3).padStart(6)}   | ${String(r.minsum).padStart(10)}`); }
  console.log('     m |  theta u |          K | theta runs(m) | theta blocks(4m)');
  for(const th of t.theta) console.log(`    ${String(th.m).padStart(2)} | ${String(th.u).padStart(8)} | ${String(th.K).padStart(10)} |    ${th.runs.toFixed(4)}     |     ${th.blocks.toFixed(4)}`);
}

// (5) the six-level exponent table and the score
console.log('\n(5) THE SIX-LEVEL EXPONENT SERIES, AND THE PRE-REGISTERED SCORE');
console.log('  level |      D          |   ln D  |    sd_1  | measured H +/- se | sd_64/(sd_1 sqrt 64) | status');
const sd64=(x)=>{ const r=lv[x].rows.find(q=>q.m===64); return r.sd/(lv[x].sd1*8); };
for(const x of [13,17,19,23,29]) console.log(`  T_${String(x).padStart(2)} | ${String(lv[x].D).padStart(15)} | ${lv[x].lnD.toFixed(4).padStart(7)} | ${lv[x].sd1.toFixed(4).padStart(8)} |  ${lv[x].H.toFixed(4)} +/- ${isNaN(lv[x].se)?'  --  ':lv[x].se.toFixed(4)}  |        ${sd64(x).toFixed(4)}        | in the refit`);
{ const x=31, m=lv[x];
  console.log(`  T_31 | ${String(m.D).padStart(15)} | ${m.lnD.toFixed(4).padStart(7)} | ${m.sd1.toFixed(4).padStart(8)} |  ${m.H.toFixed(4)} +/- ${m.se.toFixed(4)}  |        ${sd64(31).toFixed(4)}        | OUT OF SAMPLE, BLIND`);
  const inside=m.H>=bH.lo&&m.H<=bH.hi;
  console.log(`\n  pre-registered H*(T_31) = ${bH.p.toFixed(6)}   band [${bH.lo.toFixed(6)}, ${bH.hi.toFixed(6)}]`);
  console.log(`  measured        H(T_31) = ${m.H.toFixed(6)}   miss = ${(m.H-bH.p).toFixed(6)} = ${(Math.abs(m.H-bH.p)/m.se).toFixed(2)} measurement s.e. = ${(Math.abs(m.H-bH.p)/bH.se).toFixed(2)} band s.e.`);
  console.log(`  VERDICT: ${inside?'INSIDE the 95% band -> the linear-in-lnD rule is a description over six exact levels':'OUTSIDE the 95% band -> the linear-in-lnD rule was a coincidence of a short ladder'}`);
  const killed=m.H+3*m.se<0.5;
  console.log(`  sqrt(m) at T_31: H + 3 se = ${(m.H+3*m.se).toFixed(4)} vs 0.5  ->  ${killed?'REFUTED':'not refuted'}`);
  const sdIn=m.sd1>=Math.exp(bS.lo)&&m.sd1<=Math.exp(bS.hi);
  console.log(`  secondary (registered weak): sd_1* = ${Math.exp(bS.p).toFixed(4)}, band [${Math.exp(bS.lo).toFixed(4)}, ${Math.exp(bS.hi).toFixed(4)}], measured ${m.sd1.toFixed(4)}  ->  ${sdIn?'inside':'OUTSIDE'}`);
  // the anchored riders
  const tail=Math.sqrt(2*m.lnD), mbar=m.W/m.D;
  const actEx=m.rows.map(r=>r.maxsum-r.m*mbar), actSd=m.rows.map(r=>r.sd);
  const A=MS.map(v=>m.sd1*Math.pow(v,bH.p)), B=MS.map(v=>m.sd1*Math.sqrt(v));
  const eA=lnrms(actEx,A.map(v=>v*tail)), eB=lnrms(actEx,B.map(v=>v*tail));
  const sA=lnrms(actSd,A), sB=lnrms(actSd,B);
  console.log(`  anchored riders at T_31, ln-RMS:  sd_m    A' ${sA.rms.toFixed(4)} (max ${(sA.maxrel*100).toFixed(1)}%)   B' ${sB.rms.toFixed(4)} (max ${(sB.maxrel*100).toFixed(1)}%)`);
  console.log(`                                    excess  A' ${eA.rms.toFixed(4)} (max ${(eA.maxrel*100).toFixed(1)}%)   B' ${eB.rms.toFixed(4)} (max ${(eB.maxrel*100).toFixed(1)}%)   ->  ${eA.rms<eB.rms?"A' wins":"A' loses"}   (ratio B'/A' = ${(eB.rms/eA.rms).toFixed(2)})`);
}

// (5b) the grid-fraction test at the deep levels
console.log('\n(5b) THE GRID-FRACTION TEST AT THE DEEP LEVELS (prereg sec.4 registered it at the');
console.log('     in-memory levels; the same comparison is free here because the rows are already computed)');
console.log('  level |  H(m<=16) +/- se  |  H(m<=32) +/- se  |  H(m<=64) +/- se  | H(16)-H(64) | in s.e. of H(64) |   64/D');
for(const x of [13,17,19,23,29,31]){ const f={};
  for(const g of [16,32,64]){ const sub=lv[x].rows.filter(r=>r.m<=g);
    f[g]=ols(sub.map(r=>Math.log(r.m)), sub.map(r=>Math.log(r.sd))); }
  const d=f[16].b-f[64].b;
  console.log(`  T_${String(x).padStart(2)} |  ${f[16].b.toFixed(4)} +/- ${f[16].se.toFixed(4)} |  ${f[32].b.toFixed(4)} +/- ${f[32].se.toFixed(4)} |  ${f[64].b.toFixed(4)} +/- ${f[64].se.toFixed(4)} |   ${d>=0?'+':''}${d.toFixed(4)}   |      ${(d/f[64].se).toFixed(2)}        | ${(64/lv[x].D).toExponential(3)}`); }

// (6) the tail-factor test
console.log('\n(6) THE TAIL-FACTOR TEST.  R_m = excess_m/sd_m against sqrt(2 lnD) and against sqrt(2 ln(theta_m D))');
console.log('  level |  m |    R_m  | sqrt(2 lnD) | theta runs | tau^theta | R/tau0 | R/tau^th | theta needed | sign');
const tf={};
for(const x of [23,29,31]){ const m=lv[x]; const r=tailFactorRows('T_'+x,m.D,m.W,m.rows,m.theta); tf[x]=r;
  for(const o of r.rows)
    console.log(`  T_${String(x).padStart(2)} | ${String(o.m).padStart(2)} | ${o.R.toFixed(3).padStart(7)} |   ${o.t0.toFixed(4)}    |   ${o.thr.toFixed(4)}   |  ${o.tr.toFixed(4)}   | ${(o.R/o.t0).toFixed(4)} |  ${(o.R/o.tr).toFixed(4)}  |  ${o.need.toExponential(3).padStart(10)}  | ${o.sign?'FAILURE (theta<=1 moves the level the wrong way)':'ok'}`);
  console.log(`  T_${x}   S(tau0) = ${r.S0.toFixed(4)}   S(tau^theta runs) = ${r.Sr.toFixed(4)}   Delta = ${r.dR.toFixed(4)}  ->  ${verdict(r.dR)}`);
  console.log(`  T_${x}   robustness, blocks column: S = ${r.Sb.toFixed(4)}   Delta = ${r.dB.toFixed(4)}  ->  ${verdict(r.dB)}   (|Delta_runs - Delta_blocks| = ${Math.abs(r.dR-r.dB).toFixed(4)}, stable if <= 0.05)`);
}
{ const ds=[23,29,31].map(x=>tf[x].dR), worst=Math.min(...ds);
  const signFails=[23,29,31].flatMap(x=>tf[x].rows.filter(o=>o.sign).map(o=>`T_${x} m=${o.m}`));
  console.log(`\n  OVERALL, on the pre-registered rule (worst level): Delta = ${worst.toFixed(4)}  ->  ${verdict(worst)}`);
  console.log(`  SIGN GATE: ${signFails.length} failure(s): ${signFails.join(', ')||'none'}`);
  const blind=[29,31].map(x=>`T_${x} Delta = ${tf[x].dR.toFixed(4)}`).join(', ');
  console.log(`  on the levels whose theta was blind (${blind}) the verdict is ${verdict(Math.min(tf[29].dR,tf[31].dR))}.`);
}

// (7) the whole tail-factor picture on the full grid, for the record
console.log('\n(7) excess_m/sd_m ACROSS THE FULL GRID, three levels, against their sqrt(2 lnD)');
console.log('  level |' + MS.map(v=>String(v).padStart(7)).join('') + '  |  sqrt(2 lnD)');
for(const x of [23,29,31]){ const m=lv[x], mbar=m.W/m.D;
  console.log(`  T_${String(x).padStart(2)} |` + m.rows.map(r=>((r.maxsum-r.m*mbar)/r.sd).toFixed(3).padStart(7)).join('') + `  |    ${Math.sqrt(2*m.lnD).toFixed(4)}`); }

console.log(`\n[${el()}] done`);
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=8192 research/scanstat2-01-t31.js
//   invocation:  node --max-old-space-size=8192 research/scanstat2-01-t31.js
//   code-sha256: f098ca432af9840e4dd7620c53dc600c78139398f38cf7f57bd5452f25a4e7d7
//   out-sha256:  167d46c303f9bc7ea3bfd9f3c2b175d75fbc19b1bd642d8973b71d8605ba792f
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     3029.4 s
// ============================================================================
// scanstat2 part 1 --- T_31 by the streaming engine, and the tail-factor test
//
// (0) THE THREE IN-MEMORY LEVELS, recomputed, checked against the published four decimals
//   level |      D |   ln D  |   sd_1   |    H     | published H | published sd_1
//   T_13 |   1485 | 7.3032 |  12.0326 |  0.2661  |   0.2661 ok   |  12.0326 ok
//   T_17 |  22275 | 10.0112 |  14.5863 |  0.2804  |   0.2804 ok   |  14.5863 ok
//   T_19 | 378675 | 12.8444 |  17.1618 |  0.3001  |   0.3001 ok   |  17.1618 ok
//   [0.6s]
//
// (1) T_23 STREAMED (anchor).  D = 7952175 ok   W = 223092870   maxsum_1 = 204 vs G2(23#) = 204 ok   mbar*D = W ok   [2.8s]
//     H = 0.3216 +/- 0.0096 vs published 0.3216 ok      sd_1 = 19.4656 vs 19.4656 ok
//      m |  theta u |         K | theta runs(m) | theta blocks(4m)
//      1 |       96 |     59940 |    0.9998     |     0.9988
//      8 |      336 |     73826 |    0.5188     |     0.5292
//     32 |     1056 |     70990 |    0.2350     |     0.2334
//
// (2) T_29 STREAMED (anchor).  D = 214708725 ok   W = 6469693230   maxsum_1 = 258 vs G2(29#) = 258 ok   mbar*D = W ok   [70.1s]
//     H = 0.3367 +/- 0.0080 vs published 0.3367 ok      sd_1 = 21.4409 vs 21.4409 ok
//      m |  theta u |         K | theta runs(m) | theta blocks(4m)
//      1 |      108 |   1254982 |    0.9997     |     0.9977
//      8 |      372 |   1621644 |    0.4730     |     0.4875
//     32 |     1146 |   1854614 |    0.2182     |     0.2202
//
//     THETA CUSTODY at T_23, against research/import-scanstat-02-leadbetter.js (p = 1e-2)
//     m =  1   runs 0.9998 vs 0.9998   blocks 0.9988 vs 0.9988   ok
//     m =  8   runs 0.5188 vs 0.5188   blocks 0.5292 vs 0.5292   ok
//     m = 32   runs 0.2350 vs 0.2350   blocks 0.2334 vs 0.2334   ok
//
// (3) THE FIVE-LEVEL REFIT, and the frozen pre-registration
//   on the published four decimals:  H = 0.220795 + 0.006146 * lnD    s = 2.4468e-3
//   H*(T_31) = 0.359402   95% band on the line = [0.350777, 0.368027]   95% prediction band = [0.347782, 0.371022]
//   ln sd_1 = 2.177678 + 0.048380 * lnD   ->   ln sd_1*(T_31) = 3.268747  (sd_1* = 26.2784),  band [22.3736, 30.8646]
//   all 5 pre-registered lines reproduce from the published inputs.
//   robustness, same refit on FULL PRECISION H: 0.220889 + 0.006140 * lnD  ->  H* = 0.359365, band [0.350639, 0.368091]
//
// (4) T_31 COMPUTED.  D = 6226553025 ok   W = 200560490130 ok   maxsum_1 = 348 vs G2(31#) = 348 ok   mbar = 32.21052   sqrt(2 lnD) = 6.7160   [3029.3s]
//     measured exponent H(T_31) = 0.3460 +/- 0.0068     exact sd_1 = 23.4155
//     m |    maxsum_m | excess_m |   sd_m   | sd_m/(sd_1 sqrt m) | excess/sd_m |   minsum_m
//     1 |         348 |    315.8 |   23.415 |       1.0000       |    13.486   |          6
//     2 |         408 |    343.6 |   32.200 |       0.9724       |    10.670   |         18
//     3 |         510 |    413.4 |   37.758 |       0.9310       |    10.948   |         30
//     4 |         540 |    411.2 |   41.078 |       0.8772       |    10.009   |         36
//     6 |         582 |    388.7 |   46.092 |       0.8036       |     8.434   |         60
//     8 |         660 |    402.3 |   52.256 |       0.7890       |     7.699   |        102
//    12 |         882 |    495.5 |   59.542 |       0.7341       |     8.321   |        180
//    16 |        1002 |    486.6 |   66.261 |       0.7074       |     7.344   |        264
//    24 |        1302 |    528.9 |   75.956 |       0.6621       |     6.964   |        420
//    32 |        1638 |    607.3 |   83.562 |       0.6309       |     7.267   |        636
//    48 |        2112 |    565.9 |   93.573 |       0.5768       |     6.048   |       1068
//    64 |        2700 |    638.5 |  101.365 |       0.5411       |     6.299   |       1530
//      m |  theta u |          K | theta runs(m) | theta blocks(4m)
//      1 |      114 |   58542494 |    0.9991     |     0.9958
//      8 |      390 |   58142964 |    0.4341     |     0.4484
//     32 |     1230 |   58804494 |    0.2055     |     0.2076
//
// (5) THE SIX-LEVEL EXPONENT SERIES, AND THE PRE-REGISTERED SCORE
//   level |      D          |   ln D  |    sd_1  | measured H +/- se | sd_64/(sd_1 sqrt 64) | status
//   T_13 |            1485 |  7.3032 |  12.0326 |  0.2661 +/- 0.0230  |        0.4132        | in the refit
//   T_17 |           22275 | 10.0112 |  14.5863 |  0.2804 +/- 0.0189  |        0.4196        | in the refit
//   T_19 |          378675 | 12.8444 |  17.1618 |  0.3001 +/- 0.0130  |        0.4607        | in the refit
//   T_23 |         7952175 | 15.8890 |  19.4656 |  0.3216 +/- 0.0096  |        0.4973        | in the refit
//   T_29 |       214708725 | 19.1848 |  21.4409 |  0.3367 +/- 0.0080  |        0.5209        | in the refit
//   T_31 |      6226553025 | 22.5521 |  23.4155 |  0.3460 +/- 0.0068  |        0.5411        | OUT OF SAMPLE, BLIND
//
//   pre-registered H*(T_31) = 0.359402   band [0.350777, 0.368027]
//   measured        H(T_31) = 0.345957   miss = -0.013445 = 1.99 measurement s.e. = 4.96 band s.e.
//   VERDICT: OUTSIDE the 95% band -> the linear-in-lnD rule was a coincidence of a short ladder
//   sqrt(m) at T_31: H + 3 se = 0.3663 vs 0.5  ->  REFUTED
//   secondary (registered weak): sd_1* = 26.2784, band [22.3736, 30.8646], measured 23.4155  ->  inside
//   anchored riders at T_31, ln-RMS:  sd_m    A' 0.0468 (max 8.0%)   B' 0.3421 (max 84.8%)
//                                     excess  A' 0.3577 (max 50.2%)   B' 0.4264 (max 97.0%)   ->  A' wins   (ratio B'/A' = 1.19)
//
// (5b) THE GRID-FRACTION TEST AT THE DEEP LEVELS (prereg sec.4 registered it at the
//      in-memory levels; the same comparison is free here because the rows are already computed)
//   level |  H(m<=16) +/- se  |  H(m<=32) +/- se  |  H(m<=64) +/- se  | H(16)-H(64) | in s.e. of H(64) |   64/D
//   T_13 |  0.2921 +/- 0.0487 |  0.2739 +/- 0.0322 |  0.2661 +/- 0.0230 |   +0.0260   |      1.13        | 4.310e-2
//   T_17 |  0.3030 +/- 0.0368 |  0.3051 +/- 0.0235 |  0.2804 +/- 0.0189 |   +0.0226   |      1.19        | 2.873e-3
//   T_19 |  0.3097 +/- 0.0283 |  0.3093 +/- 0.0180 |  0.3001 +/- 0.0130 |   +0.0095   |      0.73        | 1.690e-4
//   T_23 |  0.3417 +/- 0.0181 |  0.3345 +/- 0.0119 |  0.3216 +/- 0.0096 |   +0.0200   |      2.09        | 8.048e-6
//   T_29 |  0.3545 +/- 0.0134 |  0.3499 +/- 0.0087 |  0.3367 +/- 0.0080 |   +0.0179   |      2.25        | 2.981e-7
//   T_31 |  0.3636 +/- 0.0111 |  0.3570 +/- 0.0075 |  0.3460 +/- 0.0068 |   +0.0177   |      2.61        | 1.028e-8
//
// (6) THE TAIL-FACTOR TEST.  R_m = excess_m/sd_m against sqrt(2 lnD) and against sqrt(2 ln(theta_m D))
//   level |  m |    R_m  | sqrt(2 lnD) | theta runs | tau^theta | R/tau0 | R/tau^th | theta needed | sign
//   T_23 |  1 |   9.039 |   5.6372    |   0.9998   |  5.6372   | 1.6034 |  1.6034  |   6.926e+10  | FAILURE (theta<=1 moves the level the wrong way)
//   T_23 |  8 |   7.452 |   5.6372    |   0.5188   |  5.5196   | 1.3220 |  1.3502  |    1.443e+5  | FAILURE (theta<=1 moves the level the wrong way)
//   T_23 | 32 |   4.894 |   5.6372    |   0.2350   |  5.3741   | 0.8682 |  0.9107  |    1.999e-2  | ok
//   T_23   S(tau0) = 0.2561   S(tau^theta runs) = 0.2368   Delta = 0.0755  ->  DOES NOT FLATTEN
//   T_23   robustness, blocks column: S = 0.2366   Delta = 0.0761  ->  DOES NOT FLATTEN   (|Delta_runs - Delta_blocks| = 0.0006, stable if <= 0.05)
//   T_29 |  1 |  10.628 |   6.1943    |   0.9997   |  6.1943   | 1.7157 |  1.7157  |   1.565e+16  | FAILURE (theta<=1 moves the level the wrong way)
//   T_29 |  8 |   7.307 |   6.1943    |   0.4730   |  6.0722   | 1.1796 |  1.2034  |    1.830e+3  | FAILURE (theta<=1 moves the level the wrong way)
//   T_29 | 32 |   6.161 |   6.1943    |   0.2182   |  5.9435   | 0.9946 |  1.0366  |    8.138e-1  | ok
//   T_29   S(tau0) = 0.2277   S(tau^theta runs) = 0.2113   Delta = 0.0719  ->  DOES NOT FLATTEN
//   T_29   robustness, blocks column: S = 0.2115   Delta = 0.0710  ->  DOES NOT FLATTEN   (|Delta_runs - Delta_blocks| = 0.0009, stable if <= 0.05)
//   T_31 |  1 |  13.486 |   6.7160    |   0.9991   |  6.7158   | 2.0081 |  2.0081  |   5.022e+29  | FAILURE (theta<=1 moves the level the wrong way)
//   T_31 |  8 |   7.699 |   6.7160    |   0.4341   |  6.5905   | 1.1464 |  1.1682  |    1.193e+3  | FAILURE (theta<=1 moves the level the wrong way)
//   T_31 | 32 |   7.267 |   6.7160    |   0.2055   |  6.4761   | 1.0821 |  1.1222  |    4.719e+1  | FAILURE (theta<=1 moves the level the wrong way)
//   T_31   S(tau0) = 0.2789   S(tau^theta runs) = 0.2654   Delta = 0.0484  ->  DOES NOT FLATTEN
//   T_31   robustness, blocks column: S = 0.2656   Delta = 0.0475  ->  DOES NOT FLATTEN   (|Delta_runs - Delta_blocks| = 0.0009, stable if <= 0.05)
//
//   OVERALL, on the pre-registered rule (worst level): Delta = 0.0484  ->  DOES NOT FLATTEN
//   SIGN GATE: 7 failure(s): T_23 m=1, T_23 m=8, T_29 m=1, T_29 m=8, T_31 m=1, T_31 m=8, T_31 m=32
//   on the levels whose theta was blind (T_29 Delta = 0.0719, T_31 Delta = 0.0484) the verdict is DOES NOT FLATTEN.
//
// (7) excess_m/sd_m ACROSS THE FULL GRID, three levels, against their sqrt(2 lnD)
//   level |      1      2      3      4      6      8     12     16     24     32     48     64  |  sqrt(2 lnD)
//   T_23 |  9.039  6.614  6.784  6.850  8.004  7.452  5.613  5.775  5.326  4.894  5.078  4.707  |    5.6372
//   T_29 | 10.628  9.128  8.621  7.951  8.690  7.307  6.735  6.724  6.008  6.161  5.508  5.747  |    6.1943
//   T_31 | 13.486 10.670 10.948 10.009  8.434  7.699  8.321  7.344  6.964  7.267  6.048  6.299  |    6.7160
//
// [3029.3s] done
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE ENGINE IS RIGHT, ON SIX CHECKS BEFORE T_31 AND FOUR AT IT. [VERIFIED]
//    Run first at the two levels whose answers are already published, it
//    returns maxsum_1 = 204 and 258, D = 7952175 and 214708725, H = 0.3216 and
//    0.3367, sd_1 = 19.4656 and 21.4409, each matching the embedded record to
//    the digits published. At T_31 it returns D = 6226553025 = prod(p-2),
//    W = 200560490130, mbar*D = W, and maxsum_1 = 348 = G2(31#), the eleventh
//    exact ladder entry. 3029.3 s, constant memory, no gap word materialised.
//
// 2. THE STREAMING EXTREMAL INDEX IS THE SAME ESTIMATOR, NOT A COUSIN OF IT.
//    [VERIFIED] From histograms of sliding maxima rather than stored exceedance
//    positions, it returns 0.9998, 0.5188, 0.2350 on the runs column and
//    0.9988, 0.5292, 0.2334 on the blocks column at T_23: the embedded values
//    of research/import-scanstat-02-leadbetter.js to four decimals at all six
//    entries. That is what licenses reading theta at T_29 and T_31, where no
//    estimate existed.
//
// 3. THE PRE-REGISTERED PREDICTION FAILS. [MEASURED] The rule refitted on all
//    five existing levels put H*(T_31) at 0.359402 with a 95% band on the line
//    of [0.350777, 0.368027]. The measured value is 0.345957 +/- 0.0068. The
//    miss is -0.013445, which is 1.99 of the measurement's own standard error
//    and 4.96 of the band's. It is OUTSIDE, and by the criterion sealed in
//    research/history/staging/scanstat2-prereg.md that means the
//    linear-in-lnD rule was a coincidence of a short ladder.
//
// 4. THE SERIES SAYS WHY: THE SLOPE HAS FALLEN. [MEASURED] The six exact values
//    are 0.2661, 0.2804, 0.3001, 0.3216, 0.3367, 0.3460 at lnD = 7.3032,
//    10.0112, 12.8444, 15.8890, 19.1848, 22.5521. A straight line through the
//    first five overshoots the sixth. The last two gaps in H are the smallest
//    in the series while the last two gaps in lnD are the largest, so the local
//    slope in lnD is well under the fitted 0.006146 at the top of the ladder.
//    Whether it is heading to zero is NOT settled by six points: reading 12
//    carries a seventh where the local slope flattens rather than keeps falling.
//
// 5. THE sqrt(m) KILL IS CONFIRMED AT A SIXTH LEVEL AND IS NOT IN DOUBT.
//    [REFUTED, of sqrt(m)] H + 3 s.e. = 0.3663 against 0.5. The direct reading
//    is sd_64/(sd_1 sqrt 64), which runs 0.4132, 0.4196, 0.4607, 0.4973,
//    0.5209, 0.5411 across the six levels: sigma sqrt(m) still overstates the
//    fluctuation at m = 64 by a factor of nearly two at T_31. That ratio is
//    rising with level, so the deficit is shrinking, but 0.5411 at lnD = 22.55
//    is not a series about to reach 1.
//
// 6. THE ANCHORED RIDER'S MARGIN IS COLLAPSING. [MEASURED] On excess_m the
//    ln-RMS is A' 0.3577 against B' 0.4264 at T_31, a ratio of 1.19, where the
//    same comparison gave 1.73 at T_23 and 1.38 at T_29 in
//    research/import-scanstat-04-score.js. A' still wins every comparison, and
//    on sd_m alone it wins hugely, 0.0468 against 0.3421. The narrowing is on
//    excess_m only, and reading 7 is why: the tail factor's error now dominates
//    the sd factor's, so the two models are being scored mostly on a term they
//    share.
//
// 7. THE TAIL FACTOR IS NOT THE EXTREMAL INDEX. [REFUTED] On the
//    pre-registered flatness statistic, Delta = 0.0755 at T_23, 0.0719 at T_29
//    and 0.0484 at T_31, against a registered threshold of 0.20 for "partial"
//    and 0.50 for "flattens". The blocks estimator agrees with the runs
//    estimator to 0.0009 or better at every level, so this is not an estimator
//    artifact. Two of the three levels had never had theta measured at all, so
//    this is not a rediscovery of a known answer either.
//
// 8. AND THE CORRECTION POINTS THE WRONG WAY, WHICH IS THE HARDER FAILURE.
//    [PROVEN, given the measurements] theta <= 1 forces sqrt(2 ln(theta D)) <=
//    sqrt(2 ln D), so wherever the measurement already exceeds sqrt(2 ln D) the
//    theta correction moves the prediction further from it. That happens at 7
//    of the 9 (level, m) pairs, and at T_31 it happens at all three: R_1 =
//    13.486 against sqrt(2 lnD) = 6.7160, R_8 = 7.699 and R_32 = 7.267. The
//    theta that would be needed at T_31, m = 1 is 5.022e+29.
//
// 9. THE DEPARTURE FROM sqrt(2 ln D) GROWS WITH D. [MEASURED] R_1/tau0 is
//    1.6034 at T_23, 1.7157 at T_29 and 2.0081 at T_31. Whatever the tail
//    factor is, it is not a finite-size correction dying out as D grows; it is
//    widening. Across the grid at T_31 the ratio runs 13.486 down to 6.299,
//    against sqrt(2 lnD) = 6.7160, so the whole m-dependence sits above the
//    incumbent level at the low end and crosses it near the top.
//
// 10. THE GRID-FRACTION TEST FIRES AT EVERY LEVEL, WHICH IS NOT WHAT ITS
//    REGISTRATION EXPECTED. [MEASURED] H(m<=16) - H(m<=64) is +0.0260, +0.0226,
//    +0.0095, +0.0200, +0.0179, +0.0177 at T_13 through T_31, that is 1.13,
//    1.19, 0.73, 2.09, 2.25 and 2.61 standard errors. The size is flat across
//    six levels while 64/D falls from 4.310e-2 to 1.028e-8. So the difference
//    is not the approach to the m = D/2 turnover, which is the alternative
//    research/scanstat2-02-crossover.js registered: it is a fixed concavity of
//    ln sd_m in ln m at small m, present at every level. The consequence is
//    the same either way and is now stronger: H is a grid-dependent summary of
//    a curve, everywhere, and "the exponent at level x" is not a level
//    invariant. That is an independent reason not to fit H(lnD) with a line.
//
// 11. WHAT THIS LEAVES STANDING. [MEASURED] TODO 0c's sqrt(m) is refuted at a
//    sixth level. Its replacement c m^H is refuted as a LAW in D, since the
//    pre-registered form failed out of sample. The tail factor sqrt(2 ln D) is
//    refuted, and so is its one named repair. What survives is a bound-free
//    empirical statement: at every level computed, sd_m grows more slowly than
//    sqrt(m), and the maxsum excess is larger than sqrt(2 ln D) sd_m at small m
//    by a factor that grows with D.
//
// 12. AN INDEPENDENT SEVENTH LEVEL AGREES, FROM A DIFFERENT ENGINE.
//    [MEASURED, cited not recomputed] A sibling pass in this repository,
//    research/scanstat-t37-04-run.js, computed T_37 at lnD = 26.107437 and
//    measured H = 0.3565 +/- 0.0068 against its own five-level pre-registration
//    of 0.381254 with band [0.369866, 0.392641]: OUTSIDE, missing by 3.63 of its
//    own standard error. So the linear-in-lnD form fails blind at TWO further
//    levels, computed independently, and both failures have the same sign: the
//    line overshoots. That pass's driver takes --h31 and is waiting on this
//    run's number, 0.345957, for its labelled post-hoc seven-level refit, which
//    was not run here because that file is not this pass's to embed.
//    The joint series 0.2661, 0.2804, 0.3001, 0.3216, 0.3367, 0.3460, 0.3565 is
//    monotone, and between the last two levels the rise per unit lnD is close to
//    what it is between T_29 and T_31, so "bending" is established here and
//    "saturating" is not. Its sqrt(m) kill agrees with this one: H + 3 se =
//    0.3770 at T_37, still far below 0.5.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed. Every one of them is
// borrowed; reading 12 already carries the custody tag "[MEASURED, cited not
// recomputed]" and names its source, and the check below confirms it.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   1.73 and 1.38 in reading 6 are `research/import-scanstat-04-score.js`,
//   whose OUTPUT prints "T_23 anchored rider : A' 0.2669 vs B' 0.4612 -> A'
//   wins (ratio B'/A' = 1.73)" and the matching T_29 line with 1.38.
//   the seven T_37 figures in reading 12 are all
//   `research/scanstat-t37-04-run.js`, whose OUTPUT prints lnD = 26.107437,
//   "measured exponent H(T_37) = 0.3565 +/- 0.0068", "H*_5(T_37) = 0.381254
//   band [0.369866, 0.392641]", "miss 0.024706 = 3.63 of its own s.e.", and
//   "sqrt(m) kill: H + 3 se = 0.3770 < 0.5".
// ---------------------------------------------------------------------------
