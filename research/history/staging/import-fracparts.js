// ============================================================================
// IMPORT ROW 15 — SAFFARI–VAUGHAN THEOREM 10 AGAINST THE SKELETON DOOR.
// Scratchpad-grade. Companion prose: import-fracparts.md. 2026-08-28.
// Invocation: node research/history/staging/import-fracparts.js
// ----------------------------------------------------------------------------
// Setting is natal-cap-36's verbatim: level x, W = x#, scour prime q (q > x,
// q^2 <= W), k = floor(W/q), lA = k+1, lB = floor((W+1)/q), branch T subset of
// {30, 7..x} with 30 in T, branch modulus M_T = 30*prod_{p in T} p | W, branch
// kernel Phi_T EVEN and MEAN-ZERO mod M_T, and
//   Snum_T = 2*Pa*(lA - lB + 2R) + 4*B      (cap-36 Theorem A),
//   R = lB mod M, l = lA mod M, Pa = sum_{v<l} G(v) - G(0)/2, G(v)=F(qv mod M),
//   B = sum_{j<R} (R-j) G(l+j).
// Nothing here recomputes cap-36's certified levels. The @23 and (optionally)
// @19 TOTALS are cited from cap-36's embedded OUTPUT block; what is computed
// here is the SPLIT of that ledger on a different threshold.
//
// WHAT THIS SCRIPT DOES:
//  E0 CONTROL. Reproduce cap-36 P4's total sum_T sum_q Snum_T at @13, @17, @19
//     with the same prime steps (1, 1, 11), from an independent CRT evaluator
//     that builds no table of size M. Cap-36 prints 2.9021e+1, 2.2650e+2,
//     1.8153e+2. Also checks the CRT evaluator against a direct table
//     evaluation of the same closed form at @13.
//  E1 THE COVERAGE SPLIT. Saffari-Vaughan Theorem 10 needs y <= x, which under
//     the dictionary x_SV = W/M, y_SV = sqrt(W) reads M <= sqrt(W). Split the
//     branch ledger on M_T <= sqrt(W) (a FIXED per-branch condition) instead of
//     cap-36 P4's M_T <= lB (a per-(T,q) condition), and print the per-branch
//     mass of every covered branch as a share of the level total.
//  E2 THE COVERAGE CONDITION ALONE, at @17..@37, which is free arithmetic:
//     how many branch moduli sit below sqrt(W), below W^(1/4) (the resolution
//     condition derived in the .md), and the count of branches in total.
// ============================================================================
'use strict';
const T00 = Date.now();
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
// A branch as a CRT object: no array of size M is ever allocated.
function kern(mids,S){
  const t30=phiTab(30),tp=mids.map(p=>phiTab(p));
  const mods=[30],tabs=[t30.t];let M=30,out=1,dep=0;
  for(let i=0;i<mids.length;i++){
    if(S&(1<<i)){M*=mids[i];mods.push(mids[i]);tabs.push(tp[i].t);dep++;}
    else out*=tp[i].mbar;
  }
  return{M,dep,mods,tabs,out,S};
}
// cap-36's snumClosed, but with F(c) evaluated by CRT instead of by table.
function snumCRT(K,q,lA,lB){
  const{M,mods,tabs,out}=K,n=mods.length;
  const R=lB%M,l=lA%M;
  const r=new Int32Array(n),st=new Int32Array(n);
  for(let i=0;i<n;i++){st[i]=q%mods[i];r[i]=0;}
  let Pa=0;
  {let v=0;
   // v = 0 term is F(0), and Pa = sum_{v<l} F(vq mod M) - F(0)/2
   for(;v<l;v++){
     let val=out;for(let i=0;i<n;i++)val*=tabs[i][r[i]];
     Pa+=val;
     for(let i=0;i<n;i++){let u=r[i]+st[i];if(u>=mods[i])u-=mods[i];r[i]=u;}
   }
  }
  {let val=out;for(let i=0;i<n;i++)val*=tabs[i][0];Pa-=val/2;}
  // B: c starts at (q*l) mod M
  for(let i=0;i<n;i++)r[i]=(l%mods[i])*st[i]%mods[i];
  let B=0;
  for(let j=0;j<R;j++){
    let val=out;for(let i=0;i<n;i++)val*=tabs[i][r[i]];
    B+=(R-j)*val;
    for(let i=0;i<n;i++){let u=r[i]+st[i];if(u>=mods[i])u-=mods[i];r[i]=u;}
  }
  return 2*Pa*(lA-lB+2*R)+4*B;
}
// cap-36's table version, for the E0 evaluator control only (small M only)
function branchTable(mids,S){
  const t30=phiTab(30),tp=mids.map(p=>phiTab(p));
  let M=30,out=1;const idx=[];
  for(let i=0;i<mids.length;i++){if(S&(1<<i)){M*=mids[i];idx.push(i);}else out*=tp[i].mbar;}
  const F=new Float64Array(M);
  for(let m=0;m<M;m++){let v=t30.t[m%30]*out;for(const i of idx)v*=tp[i].t[m%mids[i]];F[m]=v;}
  return{M,F};
}
function snumTable(F,M,q,lA,lB){
  const qm=q%M,R=lB%M,l=lA%M;let Pa=-F[0]/2,B=0,c=0;
  for(let v=0;v<l;v++){Pa+=F[c];c+=qm;if(c>=M)c-=M;}
  c=(qm*l)%M;
  for(let j=0;j<R;j++){B+=(R-j)*F[c];c+=qm;if(c>=M)c-=M;}
  return 2*Pa*(lA-lB+2*R)+4*B;
}

// ---- E0: evaluator control at @13 -----------------------------------------
function E0check(){
  const lv=meta(13),{mids,W,qs}=lv;let worst=0,n=0;
  for(const q of qs){
    const{lA,lB}=lens(W,q);
    for(let S=0;S<(1<<mids.length);S++){
      const bt=branchTable(mids,S),kc=kern(mids,S);
      const a=snumTable(bt.F,bt.M,q,lA,lB),b=snumCRT(kc,q,lA,lB);
      worst=Math.max(worst,Math.abs(a-b)/Math.max(1e-300,Math.abs(a),Math.abs(b)));n++;
    }
  }
  console.log(`E0a @13: CRT evaluator vs cap-36 table evaluator on ${n} (q,branch) pairs — max relerr ${worst.toExponential(1)}`);
}

// ---- E0/E1: the ledger, split on M_T <= sqrt(W) ----------------------------
function run(x,step,cited,doFull){
  const lv=meta(x),{mids,W,qs}=lv,nm=mids.length;
  const rt=Math.sqrt(W),q4=Math.pow(W,0.25);
  const ks=[];for(let S=0;S<(1<<nm);S++)ks.push(kern(mids,S));
  const cov=ks.filter(k=>k.M<=rt),unc=ks.filter(k=>k.M>rt);
  const per=new Float64Array(ks.length);
  let tot=0,nq=0;
  const list=doFull?ks:cov;
  for(let i=0;i<qs.length;i+=step){
    const q=qs[i],{lA,lB}=lens(W,q);
    for(let b=0;b<list.length;b++){
      const v=snumCRT(list[b],q,lA,lB);
      per[ks.indexOf(list[b])]+=v;
      if(doFull)tot+=v;
    }
    nq++;
  }
  const covSum=cov.reduce((a,k)=>a+per[ks.indexOf(k)],0);
  const total=doFull?tot:cited;
  const ctl=doFull?`  [cap-36 P4 prints ${cited.toExponential(4)}; here ${tot.toExponential(4)}; relerr ${(Math.abs(tot-cited)/Math.abs(cited)).toExponential(1)}]`:`  [total CITED from cap-36 P4 embedded OUTPUT: ${cited.toExponential(4)}; not recomputed here]`;
  console.log(`\nE1 @${x} (${nq} primes, step ${step}): W=${W} sqrt(W)=${f(rt,1)} W^(1/4)=${f(q4,1)}  branches ${ks.length}, covered by Thm 10 (M<=sqrt(W)) ${cov.length}, uncovered ${unc.length}${ctl}`);
  console.log(`     covered aggregate sum_{M_T<=sqrt(W)} sum_q Snum_T = ${covSum.toExponential(3)} = ${f(100*covSum/total,1)}% of the level total`);
  if(doFull)console.log(`     uncovered aggregate                              = ${(tot-covSum).toExponential(3)} = ${f(100*(tot-covSum)/total,1)}%`);
  const rows=cov.map(k=>({M:k.M,dep:k.dep,v:per[ks.indexOf(k)]})).sort((a,b)=>Math.abs(b.v)-Math.abs(a.v));
  console.log(`     covered branches by |share|: `+rows.map(r=>`M=${r.M}(d${r.dep}) ${f(100*r.v/total,2)}%`).join('  '));
  const mx=rows.length?Math.abs(100*rows[0].v/total):0;
  console.log(`     KILL STATISTIC: largest |share| of a single covered branch = ${f(mx,2)}%  (kill fires at >10%)  => ${mx>10?'KILL FIRES':'kill does not fire'}`);
  return{x,covSum,total,mx,ncov:cov.length,nbr:ks.length};
}

// ---- E2: the coverage condition alone, free arithmetic ---------------------
function E2(x){
  const mids=primesUpTo(x).filter(p=>p>=7);
  const W=30*mids.reduce((a,b)=>a*b,1);
  const rt=Math.sqrt(W),q4=Math.pow(W,0.25),lw=Math.log(W);
  let nb=0,nc=0,n4=0,dmax=-1;const cl=[];
  for(let S=0;S<(1<<mids.length);S++){
    let M=30,d=0;for(let i=0;i<mids.length;i++)if(S&(1<<i)){M*=mids[i];d++;}
    nb++;if(M<=rt){nc++;if(d>dmax)dmax=d;cl.push(M);}
    if(M<=q4)n4++;
  }
  console.log(`E2 @${x}: W=${W}  sqrt(W)=${f(rt,0)}  W^(1/4)=${f(q4,1)}  exp((ln W)^(1/3))=${f(Math.exp(Math.cbrt(lw)),1)}  |  branches ${nb}  covered (M<=sqrt W) ${nc} (max depth ${dmax})  resolvable-main-term (M<=W^(1/4)) ${n4}  largest covered M ${cl.length?Math.max(...cl):'-'}`);
}


// ---- E3: two exact checks the .md leans on ---------------------------------
// (a) the hyperbola identity floor(W/q) = M*floor(W'/q) + (floor(W/q) mod M)
//     with W' = W/M, i.e. floor(W/q) === floor(M*{W/(Mq)}) (mod M), in exact
//     integer arithmetic, over every (branch, scour prime) pair;
// (b) cap-36 Prop E's threshold M_T > lB is EXACTLY the no-wrap condition
//     q > W' = W/M_T, so the open half is the half where {W'/q} = W'/q and
//     no fractional part wraps at all;
// (c) the strict inclusion {M_T <= sqrt(W)} subset {M_T <= lB}, as PAIR counts.
function E3(x){
  const lv=meta(x),{mids,W,qs}=lv,nm=mids.length,rt=Math.sqrt(W);
  const Ms=[];for(let S=0;S<(1<<nm);S++){let M=30;for(let i=0;i<nm;i++)if(S&(1<<i))M*=mids[i];Ms.push(M);}
  let n=0,bad=0,badThr=0,nCov=0,nLB=0;
  for(const q of qs){
    const{lA,lB}=lens(W,q),k=lA-1;
    for(const M of Ms){
      const Wp=W/M,r=k-M*Math.floor(Wp/q);
      if(r<0||r>=M||r!==k%M)bad++;
      if((M>lB)!==(q>Wp))badThr++;
      if(M<=rt)nCov++;
      if(M<=lB)nLB++;
      n++;
    }
  }
  console.log(`E3 @${x}: ${n} (branch,q) pairs — identity floor(W/q) = M*floor(W'/q) + (floor(W/q) mod M) exceptions: ${bad}; threshold (M_T > lB) <=> (q > W/M_T) exceptions: ${badThr}; pairs with M_T <= sqrt(W): ${nCov}, pairs with M_T <= lB: ${nLB} (${nCov<=nLB?'inclusion holds':'INCLUSION FAILS'}${nCov<nLB?', strict':''})`);
}

// ---- driver ----------------------------------------------------------------
console.log('E0 — evaluator control (CRT form against cap-36\'s table form):');
E0check();
console.log('\nE1 — the ledger split on Saffari–Vaughan Theorem 10\'s range condition M <= sqrt(W):');
const R=[];
R.push(run(13,1,2.9021e+1,true));
R.push(run(17,1,2.2650e+2,true));
R.push(run(19,11,1.8153e+2,true));
R.push(run(23,60,3.8400e+2,true));
console.log('\nE3 — the identity, the threshold, and the inclusion (exact integer checks):');
[13,17,19,23,29].forEach(E3);
console.log('\nE2 — the coverage condition alone, @17..@37 (no ledger needed):');
[17,19,23,29,31,37].forEach(E2);
console.log(`\nSUMMARY: covered share of the level total = ${R.map(r=>`@${r.x} ${f(100*r.covSum/r.total,1)}%`).join(', ')}; largest single covered branch = ${R.map(r=>`@${r.x} ${f(r.mx,2)}%`).join(', ')}`);
console.log(`TOTAL ${((Date.now()-T00)/1000).toFixed(1)}s`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/import-fracparts.js
//   invocation:  node research/history/staging/import-fracparts.js
//   code-sha256: 4cb20f13d5174b867e7daa626a408c78f8d3012c20c19e7d32f8b66c29dbf275
//   out-sha256:  750e9b80ab2c21a2655665e553b6be164f90b9e04dff9f9859606124438f77e6
//   body-lines:  46
//   forced:      2026-08-28, 0 of 114 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     5.8 s
// ============================================================================
// E0 — evaluator control (CRT form against cap-36's table form):
// E0a @13: CRT evaluator vs cap-36 table evaluator on 272 (q,branch) pairs — max relerr 6.7e-12
//
// E1 — the ledger split on Saffari–Vaughan Theorem 10's range condition M <= sqrt(W):
//
// E1 @13 (34 primes, step 1): W=30030 sqrt(W)=173.3 W^(1/4)=13.2  branches 8, covered by Thm 10 (M<=sqrt(W)) 1, uncovered 7  [cap-36 P4 prints 2.9021e+1; here 2.9021e+1; relerr 1.1e-7]
//      covered aggregate sum_{M_T<=sqrt(W)} sum_q Snum_T = 5.869e-2 = 0.2% of the level total
//      uncovered aggregate                              = 2.896e+1 = 99.8%
//      covered branches by |share|: M=30(d0) 0.20%
//      KILL STATISTIC: largest |share| of a single covered branch = 0.20%  (kill fires at >10%)  => kill does not fire
//
// E1 @17 (120 primes, step 1): W=510510 sqrt(W)=714.5 W^(1/4)=26.7  branches 16, covered by Thm 10 (M<=sqrt(W)) 5, uncovered 11  [cap-36 P4 prints 2.2650e+2; here 2.2650e+2; relerr 1.3e-5]
//      covered aggregate sum_{M_T<=sqrt(W)} sum_q Snum_T = -1.980e+0 = -0.9% of the level total
//      uncovered aggregate                              = 2.285e+2 = 100.9%
//      covered branches by |share|: M=330(d1) -0.70%  M=510(d1) 0.64%  M=30(d0) -0.34%  M=210(d1) -0.33%  M=390(d1) -0.14%
//      KILL STATISTIC: largest |share| of a single covered branch = 0.70%  (kill fires at >10%)  => kill does not fire
//
// E1 @19 (40 primes, step 11): W=9699690 sqrt(W)=3114.4 W^(1/4)=55.8  branches 32, covered by Thm 10 (M<=sqrt(W)) 8, uncovered 24  [cap-36 P4 prints 1.8153e+2; here 1.8153e+2; relerr 2.6e-5]
//      covered aggregate sum_{M_T<=sqrt(W)} sum_q Snum_T = -1.474e+1 = -8.1% of the level total
//      uncovered aggregate                              = 1.963e+2 = 108.1%
//      covered branches by |share|: M=2310(d2) -5.68%  M=2730(d2) -3.63%  M=390(d1) 1.16%  M=210(d1) 0.70%  M=570(d1) -0.63%  M=330(d1) -0.54%  M=510(d1) 0.40%  M=30(d0) 0.10%
//      KILL STATISTIC: largest |share| of a single covered branch = 5.68%  (kill fires at >10%)  => kill does not fire
//
// E1 @23 (29 primes, step 60): W=223092870 sqrt(W)=14936.3 W^(1/4)=122.2  branches 64, covered by Thm 10 (M<=sqrt(W)) 22, uncovered 42  [cap-36 P4 prints 3.8400e+2; here 3.8400e+2; relerr 2.7e-6]
//      covered aggregate sum_{M_T<=sqrt(W)} sum_q Snum_T = -1.025e+0 = -0.3% of the level total
//      uncovered aggregate                              = 3.850e+2 = 100.3%
//      covered branches by |share|: M=5610(d2) 1.10%  M=11730(d2) -0.98%  M=3570(d2) -0.97%  M=2310(d2) -0.97%  M=4830(d2) 0.69%  M=8970(d2) 0.60%  M=6270(d2) -0.46%  M=7590(d2) 0.41%  M=210(d1) -0.39%  M=3990(d2) 0.35%  M=13110(d2) 0.31%  M=2730(d2) 0.21%  M=330(d1) -0.20%  M=390(d1) -0.19%  M=30(d0) 0.16%  M=4290(d2) 0.16%  M=7410(d2) 0.10%  M=6630(d2) -0.08%  M=9690(d2) -0.08%  M=690(d1) -0.04%  M=510(d1) 0.01%  M=570(d1) -0.01%
//      KILL STATISTIC: largest |share| of a single covered branch = 1.10%  (kill fires at >10%)  => kill does not fire
//
// E3 — the identity, the threshold, and the inclusion (exact integer checks):
// E3 @13: 272 (branch,q) pairs — identity floor(W/q) = M*floor(W'/q) + (floor(W/q) mod M) exceptions: 0; threshold (M_T > lB) <=> (q > W/M_T) exceptions: 0; pairs with M_T <= sqrt(W): 34, pairs with M_T <= lB: 95 (inclusion holds, strict)
// E3 @17: 1920 (branch,q) pairs — identity floor(W/q) = M*floor(W'/q) + (floor(W/q) mod M) exceptions: 0; threshold (M_T > lB) <=> (q > W/M_T) exceptions: 0; pairs with M_T <= sqrt(W): 600, pairs with M_T <= lB: 756 (inclusion holds, strict)
// E3 @19: 13920 (branch,q) pairs — identity floor(W/q) = M*floor(W'/q) + (floor(W/q) mod M) exceptions: 0; threshold (M_T > lB) <=> (q > W/M_T) exceptions: 0; pairs with M_T <= sqrt(W): 3480, pairs with M_T <= lB: 5948 (inclusion holds, strict)
// E3 @23: 111296 (branch,q) pairs — identity floor(W/q) = M*floor(W'/q) + (floor(W/q) mod M) exceptions: 0; threshold (M_T > lB) <=> (q > W/M_T) exceptions: 0; pairs with M_T <= sqrt(W): 38258, pairs with M_T <= lB: 47432 (inclusion holds, strict)
// E3 @29: 1006464 (branch,q) pairs — identity floor(W/q) = M*floor(W'/q) + (floor(W/q) mod M) exceptions: 0; threshold (M_T > lB) <=> (q > W/M_T) exceptions: 0; pairs with M_T <= sqrt(W): 314520, pairs with M_T <= lB: 447287 (inclusion holds, strict)
//
// E2 — the coverage condition alone, @17..@37 (no ledger needed):
// E2 @17: W=510510  sqrt(W)=714  W^(1/4)=26.7  exp((ln W)^(1/3))=10.6  |  branches 16  covered (M<=sqrt W) 5 (max depth 1)  resolvable-main-term (M<=W^(1/4)) 0  largest covered M 510
// E2 @19: W=9699690  sqrt(W)=3114  W^(1/4)=55.8  exp((ln W)^(1/3))=12.5  |  branches 32  covered (M<=sqrt W) 8 (max depth 2)  resolvable-main-term (M<=W^(1/4)) 1  largest covered M 2730
// E2 @23: W=223092870  sqrt(W)=14936  W^(1/4)=122.2  exp((ln W)^(1/3))=14.6  |  branches 64  covered (M<=sqrt W) 22 (max depth 2)  resolvable-main-term (M<=W^(1/4)) 1  largest covered M 13110
// E2 @29: W=6469693230  sqrt(W)=80434  W^(1/4)=283.6  exp((ln W)^(1/3))=16.9  |  branches 128  covered (M<=sqrt W) 40 (max depth 3)  resolvable-main-term (M<=W^(1/4)) 2  largest covered M 79170
// E2 @31: W=200560490130  sqrt(W)=447840  W^(1/4)=669.2  exp((ln W)^(1/3))=19.4  |  branches 256  covered (M<=sqrt W) 90 (max depth 3)  resolvable-main-term (M<=W^(1/4)) 6  largest covered M 406410
// E2 @37: W=7420738134810  sqrt(W)=2724103  W^(1/4)=1650.5  exp((ln W)^(1/3))=22.1  |  branches 512  covered (M<=sqrt W) 180 (max depth 4)  resolvable-main-term (M<=W^(1/4)) 10  largest covered M 2698410
//
// SUMMARY: covered share of the level total = @13 0.2%, @17 -0.9%, @19 -8.1%, @23 -0.3%; largest single covered branch = @13 0.20%, @17 0.70%, @19 5.68%, @23 1.10%
// TOTAL 5.7s
// ============================================================================
// READINGS
//
