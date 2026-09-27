// ============================================================================
// import-chaining-02.js  —  THE HONESTY GATE, and the maxsum object
// foreign-import attack 1 of 5 (2026-08-19), companion to import-chaining-01.js
// ============================================================================
// TWO THINGS THIS FILE SETTLES.
//
// S1  THE CRUX. Dudley's bound needs SUBGAUSSIAN increments:
//         P_t( |Z_x - Z_y| > u d(x,y) ) <= 2 exp(-u^2/2).
//     For the random-shift process Z_x = R_H(t+x) the increment at lag delta
//     is the EXACT arithmetic object
//         R_H(t+delta) - R_H(t) = R_delta(t+H) - R_delta(t),
//     and at delta = 1 that is  cert(t) - cert(t+H)  where
//         cert(r) = Lm(r)Lp(r+2) + Lp(r)Lm(r+2) - Lp(r)Lp(r+2)
//     is the vector-sieve certificate weight at a single point. So the
//     subgaussian hypothesis at the FINEST chaining scale is a statement about
//     the tail of the certificate weight itself. This file measures it:
//     sup_t |increment| / ( d(delta) sqrt(2 ln W) ) and the moment ratios
//     m4/3, m6/15, m8/105, at every dyadic lag.
//
// S2  THE MAXSUM OBJECT (TODO 0c). maxsum_m(T_x) = max_i (slot[i+m]-slot[i])
//     over the twin-admissible tile. Index set Z/D (cyclic), process
//     X_i = slot[i+m]-slot[i] - m*mbar, random-shift again, and the increment
//     metric is Brownian with a HARD CUTOFF at delta = m:
//         d(delta)^2 = < (X_{i+delta}-X_i)^2 >  ~  2 sigma_g^2 min(delta,m).
//     Dudley on that metric gives sqrt(2 ln(D/m)) where the measured law
//     0c records sqrt(2 ln D). This file tests which one the truth follows,
//     and measures the same subgaussian gate for gap-block sums.
//
//   node research/import-chaining-02.js       (~4 min)
// ============================================================================
'use strict';
const T0=Date.now(); const el=()=>((Date.now()-T0)/1000).toFixed(1)+'s';
const LV=require('./sift-limit-lemmaV.js');

function primesBelow(n){ const s=new Uint8Array(n),o=[]; for(let i=2;i<n;i++){ if(!s[i]){o.push(i); for(let j=i*i;j<n;j+=i)s[j]=1; } } return o; }
function rosserSupport(z,D,upper){ const ps=primesBelow(z).slice().sort((a,b)=>b-a); const out=[];
  (function rec(st,pr,m){ out.push([pr,(m%2===0)?1:-1]);
    for(let i=st;i<ps.length;i++){ const p=ps[i],m2=m+1; if(pr*p>D) continue;
      const isC=upper?(m2%2===1):(m2%2===0); if(isC&&pr*p*p*p>D) continue; rec(i+1,pr*p,m2); } })(0,1,0);
  return out; }
function buildLam(L,supp){ const A=new Int32Array(L); for(const [d,sg] of supp){ for(let n=0;n<L;n+=d) A[n]+=sg; } return A; }

// ---------------------------------------------------------------------------
// S1: the crux
// ---------------------------------------------------------------------------
function crux(z,H){
  const D=Math.round(Math.pow(z,3.0));
  let W=1,lnW=0; for(const p of primesBelow(z)){ W*=p; lnW+=Math.log(p); }
  const L=W+H+10;
  const sp=rosserSupport(z,D,true), sm=rosserSupport(z,D,false);
  const Lp=buildLam(L,sp), Lm=buildLam(L,sm);
  const cc=(r)=>Lm[r]*Lp[r+2]+Lp[r]*Lm[r+2]-Lp[r]*Lp[r+2];
  const t=LV.buildTerms(z,D), HM=H*t.M;
  const R=new Float64Array(W);
  let T=0; for(let r=1;r<=H;r++) T+=cc(r);
  for(let x=0;x<W;x++){ if(x>0) T+=cc(x+H)-cc(x); R[x]=T-HM; }
  const rt=Math.sqrt(2*lnW);
  const stats=(f)=>{ let s2=0,s4=0,s6=0,s8=0,mx=0;
    for(let x=0;x<W;x++){ const v=f(x), v2=v*v; s2+=v2; s4+=v2*v2; s6+=v2*v2*v2; s8+=v2*v2*v2*v2; if(Math.abs(v)>mx) mx=Math.abs(v); }
    const m2=s2/W; return { rms:Math.sqrt(m2), sup:mx, k4:(s4/W)/(m2*m2), k6:(s6/W)/(m2**3), k8:(s8/W)/(m2**4) }; };
  const out={z,H,W,lnW,rt,rows:[]};
  out.R=stats(x=>R[x]);
  const lags=[]; for(let d=1;d<W;d*=2) lags.push(d);
  for(const d of lags){ const st=stats(x=>R[(x+d)%W]-R[x]);
    out.rows.push({d, ...st, ratio: st.sup/(st.rms*rt), rel: st.rms/(2*out.R.rms)}); }
  // certificate weight itself, the delta=1 object
  let cmax=0,cmin=1e18,c2=0; for(let x=1;x<=W;x++){ const v=cc(x); if(v>cmax)cmax=v; if(v<cmin)cmin=v; c2+=v*v; }
  out.cert={max:cmax,min:cmin,rms:Math.sqrt(c2/W)};
  return out;
}

// ---------------------------------------------------------------------------
// S2: the maxsum object
// ---------------------------------------------------------------------------
function tile(x){                       // twin-admissible slots mod x#
  let slots=Float64Array.from([5]), W=6;
  for(const p of primesBelow(x+1)){ if(p<5) continue;
    const Dn=slots.length, rs=new Int32Array(Dn);
    for(let i=0;i<Dn;i++) rs[i]=slots[i]%p;
    const wp=W%p, out=new Float64Array(Dn*(p-2)); let n=0;
    for(let k=0;k<p;k++){ const off=k*W, kw=(k*wp)%p, d0=(p-kw)%p, d2=(2*p-2-kw)%p;
      for(let i=0;i<Dn;i++) if(rs[i]!==d0&&rs[i]!==d2) out[n++]=slots[i]+off; }
    slots=out; W*=p; }
  slots.sort();
  return {slots, W, D:slots.length};
}
function maxsumStats(T, mlist){
  const {slots,W,D}=T, mbar=W/D;
  const at=(i)=>{ const q=Math.floor(i/D), r=i-q*D; return slots[r]+q*W; };
  const rows=[];
  for(const m of mlist){ if(m>=D) continue;
    let mx=-Infinity, s=0, s2=0, s4=0;
    for(let i=0;i<D;i++){ const v=at(i+m)-slots[i]; if(v>mx) mx=v; s+=v; s2+=v*v; }
    const mean=s/D, sd=Math.sqrt(Math.max(0,s2/D-mean*mean));
    // increment metric of the moving-sum process, at dyadic lags
    const met=[];
    for(let dl=1; dl<=4*m && dl<D; dl*=2){
      let q2=0, qmx=0;
      for(let i=0;i<D;i++){ const a=at(i+m)-slots[i], b=at(i+dl+m)-at(i+dl); const w=b-a;
        q2+=w*w; if(Math.abs(w)>qmx) qmx=Math.abs(w); }
      met.push({dl, d:Math.sqrt(q2/D), sup:qmx});
    }
    rows.push({m, maxsum:mx, mean, sd, mbar, met});
  }
  return rows;
}

function main(){
  console.log('IMPORT 1 / part 2 --- THE HONESTY GATE and the maxsum object\n');
  console.log('S1 THE CRUX: subgaussianity of the random-shift increments.');
  console.log('   Dudley needs sup_t|inc| <~ d(delta)*sqrt(2 lnW) at EVERY dyadic lag.');
  // z = 23 added 2026-08-20 (mismatch adjudication #47): reading 1 quoted a
  // lag-1 ratio of 2.5769 at z = 23 and reading 4 a moment pair for R there,
  // both "measured separately" in a run nobody pasted. W(23) is 9,699,690 --
  // nineteen times z = 19 and well inside this engine -- so the level runs
  // here and the readings cite the block.
  for(const [z,H] of [[13,60],[17,126],[19,198],[23,258]]){
    const o=crux(z,H);
    console.log(`\n z=${z} H=${H} W=${o.W} sqrt(2lnW)=${o.rt.toFixed(4)}  cert weight range [${o.cert.min}, ${o.cert.max}] rms=${o.cert.rms.toFixed(4)}`);
    console.log(`   R itself : rms=${o.R.rms.toFixed(5)} sup=${o.R.sup.toFixed(5)} sup/(rms*sqrt(2lnW))=${(o.R.sup/(o.R.rms*o.rt)).toFixed(4)}  m4/3=${(o.R.k4/3).toFixed(3)} m6/15=${(o.R.k6/15).toFixed(3)} m8/105=${(o.R.k8/105).toFixed(3)}`);
    console.log('   lag |   d(lag)   d/(2rms_R) |    sup|inc|   sup/(d*sqrt(2lnW)) |  m4/3   m6/15  m8/105');
    for(const r of o.rows.slice(0,16))
      console.log(`  ${String(r.d).padStart(5)} | ${r.rms.toFixed(5).padStart(9)}  ${r.rel.toFixed(4)}     | ${r.sup.toFixed(4).padStart(10)}   ${r.ratio.toFixed(4).padStart(8)}         | ${(r.k4/3).toFixed(3)} ${(r.k6/15).toFixed(3)} ${(r.k8/105).toFixed(3)}`);
  }
  console.log(`\n[${el()}] S1 done\n`);

  console.log('S2 THE MAXSUM OBJECT: does the fluctuation term carry ln D or ln(D/m)?');
  for(const x of [13,17,19,23]){
    const T=tile(x); const lnD=Math.log(T.D);
    console.log(`\n T_${x}: D=${T.D} W=${T.W} mbar=${(T.W/T.D).toFixed(4)}  ln D=${lnD.toFixed(4)}`);
    const rows=maxsumStats(T,[1,2,3,4,6,8,12,16,24,32]);
    console.log('   m | maxsum   m*mbar   excess |  sd_m    excess/sd |  sqrt(2 lnD)  sqrt(2 ln(D/m))  | increment metric d(lag)/sd_m at lag=1,2,4,8,...');
    for(const r of rows){
      const exc=r.maxsum-r.m*r.mbar;
      const A=Math.sqrt(2*lnD), B=Math.sqrt(2*Math.log(T.D/r.m));
      console.log(`  ${String(r.m).padStart(3)} | ${r.maxsum.toFixed(0).padStart(6)}  ${(r.m*r.mbar).toFixed(1).padStart(7)}  ${exc.toFixed(1).padStart(7)} | ${r.sd.toFixed(3).padStart(6)}  ${(exc/r.sd).toFixed(4).padStart(7)}  |  ${A.toFixed(4)}      ${B.toFixed(4)}       | ` +
        r.met.map(m=>`${m.dl}:${(m.d/r.sd).toFixed(3)}(sup/d=${(m.sup/m.d).toFixed(2)})`).join(' '));
    }
  }
  console.log(`\n[${el()}] done`);
}
if(require.main===module) main();
module.exports={crux,tile,maxsumStats};

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-chaining-02.js
//   invocation:  node research/import-chaining-02.js
//   code-sha256: bed5d5d1162eb74bd41629c2747e8b83e62b76f53b94c15952bf85e2118dfb0c
//   out-sha256:  10acbbe42e206d5353b5d0154da560e95f9742fffbe28a335959dedb0c20926d
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     9.6 s
// ============================================================================
// IMPORT 1 / part 2 --- THE HONESTY GATE and the maxsum object
//
// S1 THE CRUX: subgaussianity of the random-shift increments.
//    Dudley needs sup_t|inc| <~ d(delta)*sqrt(2 lnW) at EVERY dyadic lag.
//
//  z=13 H=60 W=2310 sqrt(2lnW)=3.9357  cert weight range [-1, 1] rms=0.2471
//    R itself : rms=1.19486 sup=2.64935 sup/(rms*sqrt(2lnW))=0.5634  m4/3=0.752 m6/15=0.476 m8/105=0.260
//    lag |   d(lag)   d/(2rms_R) |    sup|inc|   sup/(d*sqrt(2lnW)) |  m4/3   m6/15  m8/105
//       1 |   0.27915  0.1168     |     2.0000     1.8204         | 7.700 54.898 358.302
//       2 |   0.39477  0.1652     |     2.0000     1.2872         | 3.850 13.725 44.788
//       4 |   0.55829  0.2336     |     2.0000     0.9102         | 1.925 3.431 5.598
//       8 |   0.76842  0.3216     |     2.0000     0.6613         | 1.061 1.032 0.901
//      16 |   1.06985  0.4477     |     3.0000     0.7125         | 0.910 0.813 0.677
//      32 |   1.33614  0.5591     |     4.0000     0.7606         | 0.889 0.684 0.469
//      64 |   1.96946  0.8241     |     5.0000     0.6451         | 0.787 0.525 0.308
//     128 |   1.99523  0.8349     |     4.0000     0.5094         | 0.691 0.376 0.170
//     256 |   1.57029  0.6571     |     4.0000     0.6472         | 0.838 0.593 0.365
//     512 |   2.14456  0.8974     |     5.0000     0.5924         | 0.719 0.455 0.258
//    1024 |   1.35863  0.5685     |     4.0000     0.7481         | 0.888 0.733 0.570
//    2048 |   1.72579  0.7222     |     4.0000     0.5889         | 0.792 0.521 0.292
//
//  z=17 H=126 W=30030 sqrt(2lnW)=4.5409  cert weight range [-2, 1] rms=0.2281
//    R itself : rms=1.48854 sup=4.92028 sup/(rms*sqrt(2lnW))=0.7279  m4/3=0.956 m6/15=0.912 m8/105=0.844
//    lag |   d(lag)   d/(2rms_R) |    sup|inc|   sup/(d*sqrt(2lnW)) |  m4/3   m6/15  m8/105
//       1 |   0.29060  0.0976     |     2.0000     1.5156         | 4.395 14.656 53.527
//       2 |   0.41097  0.1380     |     2.0000     1.0717         | 2.198 3.664 6.691
//       4 |   0.58120  0.1952     |     4.0000     1.5156         | 1.272 2.091 7.637
//       8 |   0.75531  0.2537     |     4.0000     1.1662         | 0.930 1.120 2.016
//      16 |   0.98791  0.3318     |     5.0000     1.1146         | 1.039 1.263 1.908
//      32 |   1.40765  0.4728     |     6.0000     0.9387         | 1.092 1.232 1.404
//      64 |   2.11545  0.7106     |     6.0000     0.6246         | 0.901 0.724 0.523
//     128 |   2.55006  0.8566     |     7.0000     0.6045         | 0.826 0.587 0.367
//     256 |   1.98875  0.6680     |     6.0000     0.6644         | 0.948 0.819 0.639
//     512 |   2.49672  0.8386     |     7.0000     0.6174         | 0.824 0.587 0.374
//    1024 |   1.99019  0.6685     |     6.0000     0.6639         | 1.086 1.088 0.963
//    2048 |   2.05239  0.6894     |     6.0000     0.6438         | 0.877 0.677 0.460
//    4096 |   2.52038  0.8466     |     7.0000     0.6116         | 0.818 0.582 0.367
//    8192 |   1.61956  0.5440     |     5.0000     0.6799         | 1.109 1.048 0.834
//   16384 |   1.33679  0.4490     |     4.0000     0.6590         | 0.917 0.743 0.540
//
//  z=19 H=198 W=510510 sqrt(2lnW)=5.1270  cert weight range [-3, 1] rms=0.2193
//    R itself : rms=1.44779 sup=6.84034 sup/(rms*sqrt(2lnW))=0.9215  m4/3=1.179 m6/15=1.648 m8/105=2.574
//    lag |   d(lag)   d/(2rms_R) |    sup|inc|   sup/(d*sqrt(2lnW)) |  m4/3   m6/15  m8/105
//       1 |   0.25331  0.0875     |     3.0000     2.3099         | 6.169 32.087 200.211
//       2 |   0.35824  0.1237     |     3.0000     1.6334         | 3.085 8.022 25.026
//       4 |   0.50160  0.1732     |     6.0000     2.3331         | 2.040 8.241 74.195
//       8 |   0.67578  0.2334     |     5.0000     1.4431         | 1.194 1.795 4.376
//      16 |   0.89292  0.3084     |     5.0000     1.0922         | 0.990 1.063 1.360
//      32 |   1.09654  0.3787     |     6.0000     1.0672         | 1.056 1.229 1.599
//      64 |   1.41670  0.4893     |     7.0000     0.9637         | 1.075 1.315 1.783
//     128 |   1.73307  0.5985     |     7.0000     0.7878         | 1.134 1.430 1.869
//     256 |   2.00040  0.6908     |     8.0000     0.7800         | 0.998 1.011 1.012
//     512 |   2.16796  0.7487     |     9.0000     0.8097         | 1.061 1.169 1.294
//    1024 |   2.07715  0.7173     |     9.0000     0.8451         | 1.055 1.142 1.248
//    2048 |   2.08762  0.7210     |    10.0000     0.9343         | 1.063 1.190 1.361
//    4096 |   2.18056  0.7531     |    10.0000     0.8945         | 1.076 1.220 1.419
//    8192 |   2.04679  0.7069     |     9.0000     0.8576         | 1.134 1.369 1.668
//   16384 |   1.95036  0.6736     |     9.0000     0.9000         | 1.069 1.189 1.319
//   32768 |   1.93719  0.6690     |     8.0000     0.8055         | 1.083 1.208 1.327
//
//  z=23 H=258 W=9699690 sqrt(2lnW)=5.6723  cert weight range [-3, 1] rms=0.2108
//    R itself : rms=1.73648 sup=7.81566 sup/(rms*sqrt(2lnW))=0.7935  m4/3=0.998 m6/15=1.005 m8/105=1.022
//    lag |   d(lag)   d/(2rms_R) |    sup|inc|   sup/(d*sqrt(2lnW)) |  m4/3   m6/15  m8/105
//       1 |   0.27365  0.0788     |     4.0000     2.5769         | 6.081 38.718 339.924
//       2 |   0.38700  0.1114     |     4.0000     1.8222         | 3.040 9.679 42.490
//       4 |   0.54696  0.1575     |     6.0000     1.9339         | 1.760 4.706 25.289
//       8 |   0.74138  0.2135     |     7.0000     1.6646         | 1.214 2.208 6.387
//      16 |   0.99542  0.2866     |     7.0000     1.2397         | 1.041 1.242 1.759
//      32 |   1.31886  0.3798     |     8.0000     1.0694         | 1.017 1.089 1.266
//      64 |   1.77381  0.5107     |     8.0000     0.7951         | 0.994 0.990 0.990
//     128 |   2.16829  0.6243     |    10.0000     0.8131         | 1.047 1.130 1.234
//     256 |   2.64029  0.7602     |    12.0000     0.8013         | 0.981 0.938 0.869
//     512 |   2.70517  0.7789     |    12.0000     0.7820         | 0.946 0.860 0.759
//    1024 |   2.38605  0.6870     |    12.0000     0.8866         | 1.010 1.034 1.071
//    2048 |   2.56584  0.7388     |    12.0000     0.8245         | 1.000 1.007 1.021
//    4096 |   2.64014  0.7602     |    12.0000     0.8013         | 0.964 0.907 0.843
//    8192 |   2.29542  0.6609     |    12.0000     0.9216         | 1.002 1.012 1.039
//   16384 |   2.14113  0.6165     |    11.0000     0.9057         | 1.049 1.153 1.323
//   32768 |   2.27174  0.6541     |    10.0000     0.7760         | 1.019 1.040 1.051
//
// [2.5s] S1 done
//
// S2 THE MAXSUM OBJECT: does the fluctuation term carry ln D or ln(D/m)?
//
//  T_13: D=1485 W=30030 mbar=20.2222  ln D=7.3032
//    m | maxsum   m*mbar   excess |  sd_m    excess/sd |  sqrt(2 lnD)  sqrt(2 ln(D/m))  | increment metric d(lag)/sd_m at lag=1,2,4,8,...
//     1 |     66     20.2     45.8 | 12.033   3.8045  |  3.8218      3.8218       | 1:1.458(sup/d=3.08) 2:1.327(sup/d=3.38) 4:1.558(sup/d=3.20)
//     2 |     96     40.4     55.6 | 16.479   3.3714  |  3.8218      3.6359       | 1:0.969(sup/d=3.38) 2:1.383(sup/d=3.16) 4:1.675(sup/d=2.83) 8:1.341(sup/d=2.99)
//     3 |    138     60.7     77.3 | 20.807   3.7167  |  3.8218      3.5227       | 1:0.855(sup/d=3.37) 2:1.201(sup/d=3.12) 4:1.717(sup/d=3.02) 8:1.323(sup/d=3.27)
//     4 |    156     80.9     75.1 | 23.815   3.1540  |  3.8218      3.4400       | 1:0.787(sup/d=3.20) 2:1.159(sup/d=2.83) 4:1.761(sup/d=2.72) 8:1.312(sup/d=3.07) 16:1.719(sup/d=2.78)
//     6 |    186    121.3     64.7 | 25.384   2.5476  |  3.8218      3.3201       | 1:0.748(sup/d=3.16) 2:1.082(sup/d=2.84) 4:1.634(sup/d=2.89) 8:1.349(sup/d=2.98) 16:1.725(sup/d=2.47)
//     8 |    228    161.8     66.2 | 22.599   2.9303  |  3.8218      3.2323       | 1:0.748(sup/d=3.55) 2:0.978(sup/d=2.99) 4:1.383(sup/d=3.07) 8:1.451(sup/d=3.29) 16:1.616(sup/d=2.96) 32:1.268(sup/d=3.35)
//    12 |    330    242.7     87.3 | 24.746   3.5291  |  3.8218      3.1043       | 1:0.674(sup/d=3.60) 2:0.876(sup/d=3.32) 4:1.200(sup/d=3.44) 8:1.211(sup/d=3.00) 16:1.508(sup/d=3.22) 32:1.431(sup/d=3.56)
//    16 |    390    323.6     66.4 | 31.099   2.1366  |  3.8218      3.0102       | 1:0.592(sup/d=3.26) 2:0.872(sup/d=2.66) 4:1.316(sup/d=2.78) 8:1.174(sup/d=2.96) 16:1.678(sup/d=2.53) 32:1.284(sup/d=3.16) 64:1.440(sup/d=2.81)
//    24 |    576    485.3     90.7 | 33.343   2.7192  |  3.8218      2.8723       | 1:0.532(sup/d=3.04) 2:0.757(sup/d=2.85) 4:1.114(sup/d=2.75) 8:1.009(sup/d=2.85) 16:1.428(sup/d=2.39) 32:1.441(sup/d=2.87) 64:1.528(sup/d=2.71)
//    32 |    750    647.1    102.9 | 33.853   3.0393  |  3.8218      2.7704       | 1:0.468(sup/d=3.79) 2:0.592(sup/d=3.59) 4:0.820(sup/d=3.67) 8:0.847(sup/d=3.35) 16:1.179(sup/d=3.16) 32:1.618(sup/d=2.96) 64:1.634(sup/d=2.93) 128:1.014(sup/d=3.49)
//
//  T_17: D=22275 W=510510 mbar=22.9185  ln D=10.0112
//    m | maxsum   m*mbar   excess |  sd_m    excess/sd |  sqrt(2 lnD)  sqrt(2 ln(D/m))  | increment metric d(lag)/sd_m at lag=1,2,4,8,...
//     1 |    108     22.9     85.1 | 14.586   5.8330  |  4.4746      4.4746       | 1:1.442(sup/d=4.56) 2:1.399(sup/d=5.00) 4:1.550(sup/d=4.51)
//     2 |    150     45.8    104.2 | 20.214   5.1530  |  4.4746      4.3170       | 1:1.010(sup/d=5.00) 2:1.472(sup/d=4.44) 4:1.666(sup/d=3.92) 8:1.203(sup/d=4.19)
//     3 |    168     68.8     99.2 | 24.769   4.0068  |  4.4746      4.2220       | 1:0.898(sup/d=4.59) 2:1.297(sup/d=4.11) 4:1.706(sup/d=3.27) 8:1.145(sup/d=4.02)
//     4 |    198     91.7    106.3 | 27.373   3.8843  |  4.4746      4.1533       | 1:0.826(sup/d=4.51) 2:1.230(sup/d=3.92) 4:1.749(sup/d=3.13) 8:1.133(sup/d=3.87) 16:1.399(sup/d=3.13)
//     6 |    240    137.5    102.5 | 27.805   3.6860  |  4.4746      4.0545       | 1:0.759(sup/d=4.55) 2:1.085(sup/d=3.98) 4:1.516(sup/d=3.42) 8:1.229(sup/d=3.86) 16:1.444(sup/d=3.14)
//     8 |    288    183.3    104.7 | 26.529   3.9447  |  4.4746      3.9829       | 1:0.718(sup/d=5.36) 2:0.917(sup/d=4.19) 4:1.169(sup/d=3.87) 8:1.442(sup/d=4.55) 16:1.485(sup/d=3.96) 32:1.482(sup/d=3.66)
//    12 |    390    275.0    115.0 | 34.562   3.3267  |  4.4746      3.8798       | 1:0.624(sup/d=4.73) 2:0.900(sup/d=3.86) 4:1.239(sup/d=3.50) 8:1.123(sup/d=3.55) 16:1.457(sup/d=3.57) 32:1.543(sup/d=3.49)
//    16 |    528    366.7    161.3 | 36.759   4.3881  |  4.4746      3.8049       | 1:0.557(sup/d=4.69) 2:0.763(sup/d=3.85) 4:1.042(sup/d=3.13) 8:1.072(sup/d=3.96) 16:1.562(sup/d=3.87) 32:1.572(sup/d=3.74) 64:1.436(sup/d=3.86)
//    24 |    708    550.0    158.0 | 43.056   3.6686  |  4.4746      3.6968       | 1:0.497(sup/d=4.76) 2:0.715(sup/d=4.09) 4:1.002(sup/d=3.34) 8:0.946(sup/d=3.39) 16:1.371(sup/d=3.66) 32:1.626(sup/d=3.34) 64:1.432(sup/d=3.60)
//    32 |    882    733.4    148.6 | 45.894   3.2380  |  4.4746      3.6181       | 1:0.471(sup/d=4.72) 2:0.677(sup/d=4.25) 4:0.943(sup/d=3.33) 8:0.857(sup/d=3.66) 16:1.259(sup/d=3.74) 32:1.692(sup/d=3.25) 64:1.478(sup/d=3.72) 128:1.360(sup/d=3.56)
//
//  T_19: D=378675 W=9699690 mbar=25.6148  ln D=12.8444
//    m | maxsum   m*mbar   excess |  sd_m    excess/sd |  sqrt(2 lnD)  sqrt(2 ln(D/m))  | increment metric d(lag)/sd_m at lag=1,2,4,8,...
//     1 |    150     25.6    124.4 | 17.162   7.2478  |  5.0684      5.0684       | 1:1.444(sup/d=5.57) 2:1.445(sup/d=5.81) 4:1.530(sup/d=5.48)
//     2 |    186     51.2    134.8 | 23.755   5.6735  |  5.0684      4.9298       | 1:1.044(sup/d=5.81) 2:1.522(sup/d=4.48) 4:1.618(sup/d=4.21) 8:1.241(sup/d=5.09)
//     3 |    210     76.8    133.2 | 28.422   4.6850  |  5.0684      4.8468       | 1:0.925(sup/d=5.48) 2:1.344(sup/d=4.40) 4:1.658(sup/d=3.69) 8:1.203(sup/d=4.74)
//     4 |    228    102.5    125.5 | 30.814   4.0741  |  5.0684      4.7871       | 1:0.852(sup/d=5.48) 2:1.247(sup/d=4.21) 4:1.695(sup/d=3.56) 8:1.200(sup/d=4.38) 16:1.247(sup/d=4.06)
//     6 |    300    153.7    146.3 | 31.397   4.6600  |  5.0684      4.7016       | 1:0.761(sup/d=6.02) 2:1.046(sup/d=4.38) 4:1.384(sup/d=4.00) 8:1.338(sup/d=5.00) 16:1.336(sup/d=4.58)
//     8 |    378    204.9    173.1 | 32.736   5.2872  |  5.0684      4.6400       | 1:0.692(sup/d=6.36) 2:0.900(sup/d=5.09) 4:1.129(sup/d=4.38) 8:1.514(sup/d=5.33) 16:1.447(sup/d=5.07) 32:1.449(sup/d=5.06)
//    12 |    528    307.4    220.6 | 41.550   5.3098  |  5.0684      4.5518       | 1:0.618(sup/d=5.60) 2:0.893(sup/d=4.20) 4:1.192(sup/d=3.51) 8:1.153(sup/d=4.89) 16:1.387(sup/d=5.21) 32:1.422(sup/d=4.77)
//    16 |    612    409.8    202.2 | 42.767   4.7271  |  5.0684      4.4882       | 1:0.538(sup/d=6.25) 2:0.711(sup/d=4.93) 4:0.899(sup/d=4.06) 8:1.107(sup/d=5.07) 16:1.546(sup/d=4.72) 32:1.504(sup/d=4.94) 64:1.461(sup/d=4.32)
//    24 |    840    614.8    225.2 | 49.871   4.5165  |  5.0684      4.3969       | 1:0.473(sup/d=6.10) 2:0.639(sup/d=4.90) 4:0.822(sup/d=3.81) 8:0.971(sup/d=4.71) 16:1.310(sup/d=4.77) 32:1.548(sup/d=4.51) 64:1.506(sup/d=4.39)
//    32 |   1062    819.7    242.3 | 54.244   4.4673  |  5.0684      4.3310       | 1:0.438(sup/d=6.06) 2:0.595(sup/d=4.65) 4:0.766(sup/d=3.90) 8:0.875(sup/d=5.06) 16:1.186(sup/d=4.94) 32:1.625(sup/d=4.42) 64:1.522(sup/d=4.14) 128:1.530(sup/d=4.34)
//
//  T_23: D=7952175 W=223092870 mbar=28.0543  ln D=15.8890
//    m | maxsum   m*mbar   excess |  sd_m    excess/sd |  sqrt(2 lnD)  sqrt(2 ln(D/m))  | increment metric d(lag)/sd_m at lag=1,2,4,8,...
//     1 |    204     28.1    175.9 | 19.466   9.0388  |  5.6372      5.6372       | 1:1.446(sup/d=7.04) 2:1.466(sup/d=6.73) 4:1.492(sup/d=6.61)
//     2 |    234     56.1    177.9 | 26.898   6.6135  |  5.6372      5.5129       | 1:1.061(sup/d=6.73) 2:1.537(sup/d=5.22) 4:1.554(sup/d=4.74) 8:1.330(sup/d=6.04)
//     3 |    300     84.2    215.8 | 31.814   6.7843  |  5.6372      5.4388       | 1:0.929(sup/d=6.50) 2:1.341(sup/d=4.92) 4:1.587(sup/d=5.11) 8:1.318(sup/d=5.58)
//     4 |    348    112.2    235.8 | 34.422   6.8499  |  5.6372      5.3857       | 1:0.844(sup/d=6.61) 2:1.214(sup/d=4.74) 4:1.612(sup/d=5.51) 8:1.330(sup/d=5.77) 16:1.360(sup/d=5.51)
//     6 |    462    168.3    293.7 | 36.690   8.0042  |  5.6372      5.3098       | 1:0.727(sup/d=7.20) 2:0.981(sup/d=5.33) 4:1.278(sup/d=6.27) 8:1.441(sup/d=6.81) 16:1.409(sup/d=6.27)
//     8 |    528    224.4    303.6 | 40.734   7.4523  |  5.6372      5.2554       | 1:0.652(sup/d=7.23) 2:0.878(sup/d=6.04) 4:1.124(sup/d=5.77) 8:1.537(sup/d=6.13) 16:1.465(sup/d=5.83) 32:1.457(sup/d=5.66)
//    12 |    612    336.7    275.3 | 49.055   5.6131  |  5.6372      5.1777       | 1:0.580(sup/d=6.75) 2:0.822(sup/d=5.21) 4:1.079(sup/d=5.55) 8:1.246(sup/d=6.08) 16:1.460(sup/d=4.86) 32:1.471(sup/d=4.90)
//    16 |    750    448.9    301.1 | 52.145   5.7748  |  5.6372      5.1218       | 1:0.519(sup/d=7.32) 2:0.707(sup/d=5.54) 4:0.898(sup/d=5.51) 8:1.144(sup/d=5.83) 16:1.557(sup/d=4.58) 32:1.505(sup/d=4.82) 64:1.488(sup/d=4.79)
//    24 |    990    673.3    316.7 | 59.463   5.3259  |  5.6372      5.0420       | 1:0.460(sup/d=6.80) 2:0.632(sup/d=5.27) 4:0.805(sup/d=5.64) 8:0.979(sup/d=6.70) 16:1.306(sup/d=5.02) 32:1.541(sup/d=4.98) 64:1.471(sup/d=4.66)
//    32 |   1218    897.7    320.3 | 65.438   4.8941  |  5.6372      4.9846       | 1:0.421(sup/d=6.97) 2:0.583(sup/d=5.35) 4:0.749(sup/d=5.38) 8:0.907(sup/d=5.66) 16:1.200(sup/d=4.82) 32:1.612(sup/d=4.95) 64:1.471(sup/d=4.86) 128:1.512(sup/d=4.67)
//
// [9.6s] done
// ============================================================
// READINGS
// ============================================================
//
// 1. THE SUBGAUSSIAN GATE FAILS AT THE FINE SCALES AND THE FAILURE GROWS.
//    `sup|inc| / (d(lag) sqrt(2 lnW))` at lag 1 reads 1.8204, 1.5156, 2.3099
//    at z = 13, 17, 19 and 2.5769 at z = 23. Dudley's
//    hypothesis is that this quantity is at most about 1. The moment ratios say
//    the same thing far more loudly: `m8/105` at lag 1 is 358.302, 53.527,
//    200.211 — a Gaussian would give 1.
//
// 2. THE MECHANISM IS EXACT AND ARITHMETIC. At lag 1 the increment is
//    cert(t) - cert(t+H), and the certificate weight takes values in [-1, 1],
//    [-2, 1], [-3, 1] at z = 13, 17, 19 with rms 0.2471, 0.2281, 0.2193. It is
//    a sparse bounded integer variable: almost always 0, occasionally a unit.
//    Sparse-and-bounded is exactly heavy-tailed relative to its own rms, and
//    sup/rms grows as the certificate's range widens with z. Nothing about
//    this is a small-z artifact.
//
// 3. THE GATE DOES PASS AT THE COARSE SCALES. The ratio drops below 1 from
//    lag 4 at z = 13 (0.9102), from lag 32 at z = 17 (0.9387) and from lag 64
//    at z = 19 (0.9637), and stays there at every larger lag scanned — 0.5094
//    to 0.7606 at z = 13, 0.6045 to 0.6799 at z = 17, 0.7800 to 0.9343 at
//    z = 19. So the honest statement is not "chaining's hypothesis is false"
//    but "chaining's hypothesis is false on the fine half of the scales", and
//    `import-chaining-03.js` (b) measures how much of the bound that half
//    carries.
//
// 4. R ITSELF IS NEARLY GAUSSIAN, WHICH IS WHY THE UNION BOUND IS THE BETTER
//    TOOL. `m4/3, m6/15, m8/105` for R read 0.752/0.476/0.260 at z = 13,
//    0.956/0.912/0.844 at z = 17, 1.179/1.648/2.574 at z = 19 and
//    0.998/1.005/1.022 at z = 23. Within a factor of about 2.6 of Gaussian at the
//    eighth moment. The single random variable whose tail the union bound needs
//    is far better behaved than the family of increments chaining needs.
//
// 5. THE MAXSUM METRIC IS BROWNIAN WITH A CUTOFF AT m, EXACTLY AS PREDICTED.
//    At T_23, m = 32, `d(lag)/sd_m` reads 0.421, 0.583, 0.749, 0.907, 1.200,
//    1.612 at lag 1, 2, 4, 8, 16, 32 and then flattens at 1.471, 1.512 for
//    lag 64, 128 — square-root growth to lag = m, saturation at sqrt(2) after.
//    So the sqrt(log #positions) shape of TODO 0c's law is the signature of a
//    moving-sum process, which is what chaining reads off the metric.
//
// 6. AND THE SAME GATE FAILS ON THE MAXSUM SIDE, ALSO RISING. `sup/d` at lag 1
//    reads 3.08, 4.56, 5.57, 7.04 at T_13, T_17, T_19, T_23 against
//    sqrt(2 ln D) = 3.822, 4.475, 5.068, 5.637. The ratio of the two is 0.81,
//    1.02, 1.10, 1.25: it crosses 1 between T_13 and T_17 and rises at every
//    step after. The two objects fail chaining's hypothesis the same way.
//
// 7. THE EXCESS DOES NOT FOLLOW sqrt(2 ln D) EITHER. `excess/sd_m` at m = 1 is
//    3.80, 5.83, 7.25, 9.04 across the four tiles against sqrt(2 ln D) =
//    3.822, 4.475, 5.068, 5.637, so the ratio runs 0.99, 1.30, 1.43, 1.60 and
//    rises. At m = 32 it is 3.04, 3.24, 4.47, 4.89 against the same column,
//    i.e. below it. A single Gaussian maximal law with one constant does not
//    describe this family across m, and `import-chaining-03.js` (d) locates why.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own embedded run prints (printed value
// first):
//   3.8218 -> 3.822 and 4.4746 -> 4.475, the sqrt(2 lnD) column at T_13 and
//   T_17, quoted in readings 6 and 7.
//   7.2478 -> 7.25, excess/sd at T_19 m=1, reading 7.
//   9.0388 -> 9.04, excess/sd at T_23 m=1, reading 7.
//   3.2380 -> 3.24, excess/sd at T_17 m=32, reading 7.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   The ratio row 0.81, 1.02, 1.10, 1.25 in reading 6 is the printed lag-1
//   sup/d at m=1 divided by the printed sqrt(2 lnD): 3.08/3.8218 = 0.806,
//   4.56/4.4746 = 1.019, 5.57/5.0684 = 1.099, 7.04/5.6372 = 1.249. Only the
//   1.02 entry fails to appear verbatim elsewhere in the run.
//
// RESOLVED 2026-08-20 (mismatch adjudication #47), by running the level.
//   2.5769, the lag-1 subgaussian ratio at z = 23 in reading 1, and the moment
//   triple for R at z = 23 in reading 4 came from a run "measured separately"
//   that was never pasted anywhere in the corpus; a search of research/ found
//   2.5769 only in research/lp-push-x43.js, where it is an LP solver s-value at
//   m = 622 and unrelated. S1 now runs z = 23 as a fourth level. Two things
//   came out of it:
//     * the figures reproduce exactly. The block prints lag 1 ratio 2.5769 and
//       R's m4/3, m6/15, m8/105 as 0.998, 1.005, 1.022. Reading 4's triple was
//       written "0.998/-/1.022" with the middle term missing and now carries
//       the printed 1.005.
//     * the run cross-checks against a different file. Its
//       sup/(rms*sqrt(2 lnW)) for R at z = 23 comes out 0.7935, which is what
//       research/import-chaining-01.js prints for the same statistic at the
//       same level, from independently written code.
//   The traceability pass's note also said z = 23 "would need W = 223092870".
//   It does not: primesBelow(23) stops at 19, so W(23) = 9,699,690, and the
//   level costs about nine seconds. That mis-estimate is why it was left
//   unrun.
// ---------------------------------------------------------------------------
