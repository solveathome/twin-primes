// ============================================================================
// DECIDE-0830 — THE SKELETON DOOR'S "TENTH OF THE MASS", REPRODUCED AND THEN
// MEASURED OVER EVERY SCOUR PRIME. Companion prose: decide-0830-skeleton-door.md.
// Invocation: node research/history/staging/decide-0830-skeleton-door.js
// ----------------------------------------------------------------------------
// This is an adjudication producer, not an attack. TODO item 4 says the
// Skeleton Equidistribution door "reaches ~10% of the mass". That figure is
// natal-cap-36 P4's split of the exact branch ledger on M_T <= lB (the branches
// on which the door is a FIXED-modulus question), printed as 9.2% / -0.9% /
// -10.8% / 5.5% at @13 / @17 / @19 / @23 — and at @19 and @23 cap-36 P4 walked
// a SUBSAMPLE of the scour (40 of 435 primes at step 11; 29 of 1,739 at step
// 60), because its table evaluator allocates an array of size M_T for every
// branch. qc-wave6-Y.md flagged that the two largest magnitudes in the item's
// "~10%" come from those subsamples. Nothing in the corpus has the split over
// every prime at @19 or @23. This producer supplies it.
//
// Setting is cap-36's verbatim: level x, W = x#, scour prime q (q > x, q^2 <= W),
// k = floor(W/q), lA = k+1, lB = floor((W+1)/q), branch T with 30 in T, branch
// modulus M_T | W, kernel Phi_T even and mean-zero mod M_T, and (cap-36 Thm A)
//   Snum_T = 2*Pa*(lA - lB + 2R) + 4*B,  R = lB mod M, l = lA mod M.
// Skeleton total: sum_T sum_q Snum_T = sum_q NUMsk(q)/(15W) (cap-30 Thm A), and
// G30_agg = W * sum_q NUMsk / (2 * 15 * sum_q (IVA+IVB)) (cap-30 Thm B).
//
// SEC A  CUSTODY. Reproduce cap-36 P4 exactly as it printed, prime steps
//        (1, 1, 11, 60), from the CRT evaluator of import-fracparts.js (no
//        table of size M). Printed targets: totals 2.9021e+1, 2.2650e+2,
//        1.8153e+2, 3.8400e+2; closable shares 9.2%, -0.9%, -10.8%, 5.5%; and
//        import-fracparts E1's covered (M_T <= sqrt W) shares 0.2%, -0.9%,
//        -8.1%, -0.3%.
// SEC B  EVERY PRIME. The same split over ALL scour primes at @13..@23. The
//        total comes from cap-30's exact BigInt kernel scan (which also
//        re-certifies G30_agg against 0.1113 / 0.1011 / 0.1259 / 0.0945); the
//        closable side is summed by CRT over the branches with M_T <= lB only;
//        the open side is the difference. At @13, @17, @19 the open side is
//        ALSO summed directly, as a control on the subtraction.
// SEC C  THE LEDGER. Per level: G30_agg, its margin to 1/2, and how much of
//        G30_agg the closable branches contribute (share * G30_agg), which is
//        what a proof of the door AS NAMED could remove from the inequality.
// No wall-clock figures are printed.
// ============================================================================
'use strict';
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
const f=(v,d=4)=>Number.isFinite(v)?v.toFixed(d):String(v);
function meta(x){
  const mids=primesUpTo(x).filter(p=>p>=7);
  const W=30*mids.reduce((a,b)=>a*b,1);
  const N=2*mids.reduce((a,p)=>a*(p-2),1);
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  return{x,mids,W,N,qs};
}
function lens(W,q){const wm=W%q,k=(W-wm)/q,a=q-wm,lA=k+1,lB=(a===1)?lA:k;return{k,a,lA,lB,L:lA+lB};}
// cap-36's phiTab, verbatim
function phiTab(M){
  const mbar=M===30?4/900:((M-2)/M)**2,t=new Float64Array(M);
  for(let u=0;u<M;u++){const c=M===30?(u===0?2:(u===6||u===24)?1:0):(u===0?M-2:(u===2||u===M-2)?M-3:M-4);t[u]=c/M-mbar;}
  return{t,mbar};
}
// import-fracparts.js's CRT branch object and evaluator, verbatim
function kern(mids,S){
  const t30=phiTab(30),tp=mids.map(p=>phiTab(p));
  const mods=[30],tabs=[t30.t];let M=30,out=1,dep=0;
  for(let i=0;i<mids.length;i++){
    if(S&(1<<i)){M*=mids[i];mods.push(mids[i]);tabs.push(tp[i].t);dep++;}
    else out*=tp[i].mbar;
  }
  return{M,dep,mods,tabs,out,S};
}
function snumCRT(K,q,lA,lB){
  const{M,mods,tabs,out}=K,n=mods.length;
  const R=lB%M,l=lA%M;
  const r=new Int32Array(n),st=new Int32Array(n);
  for(let i=0;i<n;i++){st[i]=q%mods[i];r[i]=0;}
  let Pa=0;
  for(let v=0;v<l;v++){
    let val=out;for(let i=0;i<n;i++)val*=tabs[i][r[i]];
    Pa+=val;
    for(let i=0;i<n;i++){let u=r[i]+st[i];if(u>=mods[i])u-=mods[i];r[i]=u;}
  }
  {let val=out;for(let i=0;i<n;i++)val*=tabs[i][0];Pa-=val/2;}
  for(let i=0;i<n;i++)r[i]=(l%mods[i])*st[i]%mods[i];
  let B=0;
  for(let j=0;j<R;j++){
    let val=out;for(let i=0;i<n;i++)val*=tabs[i][r[i]];
    B+=(R-j)*val;
    for(let i=0;i<n;i++){let u=r[i]+st[i];if(u>=mods[i])u-=mods[i];r[i]=u;}
  }
  return 2*Pa*(lA-lB+2*R)+4*B;
}
// cap-30 / cap-36's exact per-q BigInt pass, verbatim (exact through @23)
function scan(lv,q){
  const{mids,W,N}=lv,nm=mids.length;
  const{lA,lB,L}=lens(W,q);
  const rp=new Int32Array(nm),sp=new Int32Array(nm),ps=new Int32Array(nm);
  for(let i=0;i<nm;i++){ps[i]=mids[i];sp[i]=q%mids[i];rp[i]=0;}
  let r30=0;const s30=q%30,FL=4.5e15;
  let aA=0,bA=0n,aB=0,bB=0n,a1=0,b1=0n,a2=0,b2=0n;
  for(let d=1;d<L;d++){
    r30+=s30;if(r30>=30)r30-=30;
    let P=1;
    for(let i=0;i<nm;i++){let u=rp[i]+sp[i];const p=ps[i];if(u>=p)u-=p;rp[i]=u;
      P*=u===0?p-2:(u===2||u===p-2)?p-3:p-4;}
    const c30=r30===0?2:(r30===6||r30===24)?1:0;
    const C=c30*P,K=15*C-2*P;
    if(C){
      if(d<lA){aA+=(lA-d)*C;if(aA>FL){bA+=BigInt(aA);aA=0;}}
      if(d<lB){aB+=(lB-d)*C;if(aB>FL){bB+=BigInt(aB);aB=0;}}}
    if(d<lA){a1+=K;if(a1>FL||a1<-FL){b1+=BigInt(a1);a1=0;}}
    else{const w=L-d;a2+=w*K;if(a2>FL||a2<-FL){b2+=BigInt(a2);a2=0;}}
  }
  const TA2=bA+BigInt(aA),TB2=bB+BigInt(aB);
  const SB1K=b1+BigInt(a1),SB2K=b2+BigInt(a2);
  const WB=BigInt(W),NB=BigInt(N),NB2=NB*NB,lAB=BigInt(lA),lBB=BigInt(lB),LB=BigInt(L);
  const IVA=WB*(lAB*NB+2n*TA2)-NB2*lAB*lAB,IVB=WB*(lBB*NB+2n*TB2)-NB2*lBB*lBB;
  return{IV:IVA+IVB,NUM:LB*(14n*NB+2n*SB1K)+4n*SB2K};
}

// ---- SEC A: cap-36 P4 as printed (subsampled where it was) ----------------
function secA(x,step,tgtTot,tgtSh,tgtCov){
  const lv=meta(x),{mids,W,qs}=lv,nm=mids.length,rt=Math.sqrt(W);
  const ks=[];for(let S=0;S<(1<<nm);S++)ks.push(kern(mids,S));
  let tot=0,sh=0,cov=0,nq=0;
  for(let i=0;i<qs.length;i+=step){
    const q=qs[i],{lA,lB}=lens(W,q);
    for(const b of ks){const v=snumCRT(b,q,lA,lB);tot+=v;if(b.M<=lB)sh+=v;if(b.M<=rt)cov+=v;}
    nq++;
  }
  console.log(`A @${x} (${nq} of ${qs.length} primes, step ${step}): total ${tot.toExponential(4)} [cap-36 P4 printed ${tgtTot.toExponential(4)}, relerr ${(Math.abs(tot-tgtTot)/Math.abs(tgtTot)).toExponential(1)}]`);
  console.log(`     closable M_T <= lB: ${sh.toExponential(3)} = ${f(100*sh/tot,1)}%  [cap-36 printed ${f(tgtSh,1)}%]   SV-covered M_T <= sqrt(W): ${cov.toExponential(3)} = ${f(100*cov/tot,1)}%  [import-fracparts printed ${f(tgtCov,1)}%]`);
}

// ---- SEC B: every scour prime ----------------------------------------------
function secB(x,tgtG,directOpen){
  const lv=meta(x),{mids,W,qs}=lv,nm=mids.length,rt=Math.sqrt(W);
  const ks=[];for(let S=0;S<(1<<nm);S++)ks.push(kern(mids,S));
  let SV=0n,SNUM=0n;
  for(const q of qs){const r=scan(lv,q);SV+=r.IV;SNUM+=r.NUM;}
  const cert=BigInt(W)*SNUM<15n*SV;
  const G=Number(BigInt(W)*SNUM)/(2*Number(15n*SV));
  const tot=Number(SNUM)/(15*W);                 // exact kernel total, Number-rounded
  const Vg=Number(SV)/(W*W);
  let sh=0,cov=0,dpDirect=0;const shDep=new Float64Array(nm+1);
  let nClos=0,nPairs=0;
  for(const q of qs){
    const{lA,lB}=lens(W,q);
    for(const b of ks){
      nPairs++;
      if(b.M<=lB){const v=snumCRT(b,q,lA,lB);sh+=v;shDep[b.dep]+=v;nClos++;if(b.M<=rt)cov+=v;}
      else if(directOpen){dpDirect+=snumCRT(b,q,lA,lB);}
    }
  }
  const dp=tot-sh;
  console.log(`B @${x} (${qs.length} primes, ALL): W=${W}  W*SUM NUMsk < 15*SUM V: ${cert?'CERTIFIED':'FALSE'}  G30_agg=${f(G)} [cap-30 Thm B: ${f(tgtG)}]  margin ${f(0.5-G)}`);
  console.log(`     kernel total sum_T sum_q Snum_T = ${tot.toExponential(4)};  total/(2 Vg) = ${f(tot/(2*Vg))} (= G30_agg, custody of the branch<->kernel identity)`);
  console.log(`     closable M_T <= lB: ${sh.toExponential(3)} = ${f(100*sh/tot,1)}%  over ${nClos} of ${nPairs} (branch, q) pairs;  by depth |T|-1: ${[...shDep].map(v=>v.toExponential(1)).join(' ')}`);
  console.log(`     open M_T > lB (by subtraction): ${dp.toExponential(3)} = ${f(100*dp/tot,1)}%${directOpen?`;  summed directly: ${dpDirect.toExponential(3)} (relerr vs subtraction ${(Math.abs(dp-dpDirect)/Math.abs(dp)).toExponential(1)})`:''}`);
  console.log(`     SV-covered M_T <= sqrt(W): ${cov.toExponential(3)} = ${f(100*cov/tot,1)}%`);
  return{x,G,sh:sh/tot,cov:cov/tot,K:qs.length};
}

// ---- run -------------------------------------------------------------------
console.log('SEC A — cap-36 P4 reproduced as printed (its own prime steps), CRT evaluator:');
secA(13,1,2.9021e1,9.2,0.2);
secA(17,1,2.2650e2,-0.9,-0.9);
secA(19,11,1.8153e2,-10.8,-8.1);
secA(23,60,3.8400e2,5.5,-0.3);

console.log('\nSEC B — the same split over EVERY scour prime; totals from the exact BigInt kernel:');
const R=[];
R.push(secB(13,0.1113,true));
R.push(secB(17,0.1011,true));
R.push(secB(19,0.1259,true));
R.push(secB(23,0.0945,false));

console.log('\nSEC C — the ledger: what the door as named can remove from G30_agg < 1/2:');
console.log('level | K     | G30_agg | margin | closable share | closable part of G30_agg | open part of G30_agg | SV-covered part');
for(const r of R){
  console.log(`@${r.x}   | ${String(r.K).padStart(5)} | ${f(r.G)}  | ${f(0.5-r.G)} | ${f(100*r.sh,1).padStart(6)}%        | ${f(r.sh*r.G)}                   | ${f((1-r.sh)*r.G)}               | ${f(r.cov*r.G)}`);
}
const mx=Math.max(...R.map(r=>Math.abs(r.sh)));
console.log(`largest |closable share| over the four full-prime levels: ${f(100*mx,1)}%;  largest closable part of G30_agg: ${f(Math.max(...R.map(r=>Math.abs(r.sh*r.G))))};  smallest open part: ${f(Math.min(...R.map(r=>(1-r.sh)*r.G)))}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/decide-0830-skeleton-door.js
//   invocation:  node research/history/staging/decide-0830-skeleton-door.js
//   code-sha256: d61bf53c5e71b99b70b7c06b08bd2326aa69b535392a7746ce239343bd24733d
//   out-sha256:  ca739c184d8e5229ddc7e6af1113f50455d6071cbf79ab17838875ff96936b31
//   body-lines:  39
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     87.3 s
// ============================================================================
// SEC A — cap-36 P4 reproduced as printed (its own prime steps), CRT evaluator:
// A @13 (34 of 34 primes, step 1): total 2.9021e+1 [cap-36 P4 printed 2.9021e+1, relerr 1.1e-7]
//      closable M_T <= lB: 2.667e+0 = 9.2%  [cap-36 printed 9.2%]   SV-covered M_T <= sqrt(W): 5.869e-2 = 0.2%  [import-fracparts printed 0.2%]
// A @17 (120 of 120 primes, step 1): total 2.2650e+2 [cap-36 P4 printed 2.2650e+2, relerr 1.3e-5]
//      closable M_T <= lB: -2.004e+0 = -0.9%  [cap-36 printed -0.9%]   SV-covered M_T <= sqrt(W): -1.980e+0 = -0.9%  [import-fracparts printed -0.9%]
// A @19 (40 of 435 primes, step 11): total 1.8153e+2 [cap-36 P4 printed 1.8153e+2, relerr 2.6e-5]
//      closable M_T <= lB: -1.952e+1 = -10.8%  [cap-36 printed -10.8%]   SV-covered M_T <= sqrt(W): -1.474e+1 = -8.1%  [import-fracparts printed -8.1%]
// A @23 (29 of 1739 primes, step 60): total 3.8400e+2 [cap-36 P4 printed 3.8400e+2, relerr 2.7e-6]
//      closable M_T <= lB: 2.099e+1 = 5.5%  [cap-36 printed 5.5%]   SV-covered M_T <= sqrt(W): -1.025e+0 = -0.3%  [import-fracparts printed -0.3%]
//
// SEC B — the same split over EVERY scour prime; totals from the exact BigInt kernel:
// B @13 (34 primes, ALL): W=30030  W*SUM NUMsk < 15*SUM V: CERTIFIED  G30_agg=0.1113 [cap-30 Thm B: 0.1113]  margin 0.3887
//      kernel total sum_T sum_q Snum_T = 2.9021e+1;  total/(2 Vg) = 0.1113 (= G30_agg, custody of the branch<->kernel identity)
//      closable M_T <= lB: 2.667e+0 = 9.2%  over 95 of 272 (branch, q) pairs;  by depth |T|-1: 5.9e-2 2.6e+0 0.0e+0 0.0e+0
//      open M_T > lB (by subtraction): 2.635e+1 = 90.8%;  summed directly: 2.635e+1 (relerr vs subtraction 2.1e-14)
//      SV-covered M_T <= sqrt(W): 5.869e-2 = 0.2%
// B @17 (120 primes, ALL): W=510510  W*SUM NUMsk < 15*SUM V: CERTIFIED  G30_agg=0.1011 [cap-30 Thm B: 0.1011]  margin 0.3989
//      kernel total sum_T sum_q Snum_T = 2.2650e+2;  total/(2 Vg) = 0.1011 (= G30_agg, custody of the branch<->kernel identity)
//      closable M_T <= lB: -2.004e+0 = -0.9%  over 756 of 1920 (branch, q) pairs;  by depth |T|-1: -7.7e-1 -1.2e+0 -2.4e-2 0.0e+0 0.0e+0
//      open M_T > lB (by subtraction): 2.285e+2 = 100.9%;  summed directly: 2.285e+2 (relerr vs subtraction 1.5e-13)
//      SV-covered M_T <= sqrt(W): -1.980e+0 = -0.9%
// B @19 (435 primes, ALL): W=9699690  W*SUM NUMsk < 15*SUM V: CERTIFIED  G30_agg=0.1259 [cap-30 Thm B: 0.1259]  margin 0.3741
//      kernel total sum_T sum_q Snum_T = 2.2425e+3;  total/(2 Vg) = 0.1259 (= G30_agg, custody of the branch<->kernel identity)
//      closable M_T <= lB: 4.166e+0 = 0.2%  over 5948 of 13920 (branch, q) pairs;  by depth |T|-1: 1.2e+0 -6.7e+0 -1.2e+1 2.2e+1 0.0e+0 0.0e+0
//      open M_T > lB (by subtraction): 2.238e+3 = 99.8%;  summed directly: 2.238e+3 (relerr vs subtraction 6.4e-14)
//      SV-covered M_T <= sqrt(W): -4.188e+1 = -1.9%
// B @23 (1739 primes, ALL): W=223092870  W*SUM NUMsk < 15*SUM V: CERTIFIED  G30_agg=0.0945 [cap-30 Thm B: 0.0945]  margin 0.4055
//      kernel total sum_T sum_q Snum_T = 1.6551e+4;  total/(2 Vg) = 0.0945 (= G30_agg, custody of the branch<->kernel identity)
//      closable M_T <= lB: 8.163e+1 = 0.5%  over 47432 of 111296 (branch, q) pairs;  by depth |T|-1: 3.7e+0 5.9e+0 6.1e+1 1.6e+2 -1.5e+2 0.0e+0 0.0e+0
//      open M_T > lB (by subtraction): 1.647e+4 = 99.5%
//      SV-covered M_T <= sqrt(W): 7.082e+1 = 0.4%
//
// SEC C — the ledger: what the door as named can remove from G30_agg < 1/2:
// level | K     | G30_agg | margin | closable share | closable part of G30_agg | open part of G30_agg | SV-covered part
// @13   |    34 | 0.1113  | 0.3887 |    9.2%        | 0.0102                   | 0.1010               | 0.0002
// @17   |   120 | 0.1011  | 0.3989 |   -0.9%        | -0.0009                   | 0.1020               | -0.0009
// @19   |   435 | 0.1259  | 0.3741 |    0.2%        | 0.0002                   | 0.1256               | -0.0024
// @23   |  1739 | 0.0945  | 0.4055 |    0.5%        | 0.0005                   | 0.0941               | 0.0004
// largest |closable share| over the four full-prime levels: 9.2%;  largest closable part of G30_agg: 0.0102;  smallest open part: 0.0941
// ============================================================================
// READINGS
// ============================================================================
// (written in the companion note; the figures quoted there are in the block above)
