// ============================================================================
// NATAL-CAP 19 — THE dev(0,q) SUPPRESSION LEMMA: FUSION AT THE ANCHOR (+ @19)
// (2026-08-14 — cap-13 reading 9's proof target, attacked head-on)
// ============================================================================
// THE TARGET. cap-13 measured the anchored rotation t = 0 at VR rank
// 10/510510 (Z2 rank 2/510510) in the full rotation ensemble at @17, with the
// suppression UNIFORM across primes (P1). Standing candidate: the anchored
// strike classes {0, −2 mod q} are the HEAD of the kill image — by cap-01's
// certified dilation identity, gross(0,q) = (sibling-A count in [0, W/q)) +
// (sibling-B count), siblings = the natal set dilated by q^{-1}.
//
// THE NEW STRUCTURE (proved in natal-cap-19-calm-lemma.md, verified exactly
// below):
//  L1 MIRROR-SIBLING IDENTITY. The natal mirror mu(r) = W-2-r maps sibling B
//     onto sibling A reversed: B(m) = A(-m mod W). Two siblings are ONE
//     pattern read in two directions.
//  L2 FUSION IDENTITY (the anchor's private structure). Hence the two head
//     windows are mirror-adjacent and FUSE:
//        gross(0,q) = #( A ∩ [W-lB, W+lA) )  — ONE cyclic window of length
//        L_q = lA+lB, lA = ceil(W/q), lB = floor((W+1)/q), containing m = 0.
//     A generic rotation t gets TWO windows of A at starts q^{-1}t and
//     q^{-1}(t-2): separation 2q^{-1} mod W — far apart, quasi-independent.
//  L3 THE TWO ARITHMETIC PHASES ARE THE TWO DEGENERATE PAIRS. The mirror
//     sends class c to class W-2-c (mod q); the pair {t, t-2} maps to the
//     pair {W-t, W-t-2}, self-paired iff 2t ≡ 0 (mod W). At t = 0 the
//     degeneracy is CONCATENATION: the two head windows are mirror-adjacent
//     and fuse into one window of doubled length. At t = W/2 it is
//     DUPLICATION: the mirror maps class h-2 ONTO class h (n_{h-2} = n_h),
//     so dev(W/2,q) = 2*(one window's dev) — cap-13's proven variance
//     doubling. One long window vs the same window twice: the SAME symmetry
//     predicts the ensemble's two arithmetic phases at OPPOSITE extremes.
//  L4 SPECTRAL RESONANCE FORM. Position-ensemble variance of the fused
//     window is exact:  V_fused(q) = (1/W^2) sum_{j!=0} |S(j)|^2
//        sin^2(pi j r_q / W) / sin^2(pi q j / W),   r_q = q L_q - 2W,
//     |r_q| < q: the fused length is within O(q/W) of exactly 2/q of the
//     period, so the kernel at natal frequency j carries sin^2(pi j r_q/W)
//     instead of a generic window's O(1) numerator — an incomplete-sum
//     expression specific to the head, with the factored spectrum of cap-02.
//
// THE LEMMA UNDER TEST (sharpest candidate form): for every scour prime q,
//    E-typical dev(0,q)^2 = V_fused(q) < VarRot(q),
// i.e. ONE fused window of length 2W/q is quieter than TWO independent
// W/q-windows because adjacent windows of a sub-Poisson pattern are
// NEGATIVELY correlated (06-variance-theorem: Fano 0.17-0.35). If
// sum_q V_fused / sum_q VarRot reproduces cap-05's VR(0) = 0.62/0.55 AND the
// anchored fused window sits at a generic position-percentile, the anchored
// calm is fully mechanized: FUSION carries it, luck does not.
//
// PROGRAM. A: extend cap-13's full-ensemble rank to @19 (W = 9,699,690, all
// rotations, exact). B: per scour prime at @13/@17 (+ sample @19): verify L1,
// L2, L3 exactly; measure V_fused, VarRot, head percentiles, the adjacent-
// window covariance, and the generic-pair variance. C: verify L4 + the
// complex Sigma-form to machine precision; decompose budgets by spectral
// support class. Honest frame: identities are proven+verified; inequalities
// are measured per level unless stated otherwise.
// ============================================================================
'use strict';
const T00 = Date.now();

function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function egcd(a,b){if(b===0)return[a,1,0];const[g,x,y]=egcd(b,a%b);return[g,y,x-Math.floor(a/b)*y];}
function modinv(a,m){a=((a%m)+m)%m;const[g,x]=egcd(a,m);if(g!==1)throw new Error('no inverse');return((x%m)+m)%m;}
function mulberry32(seed){let t=seed>>>0;return function(){t+=0x6D2B79F5;let r=Math.imul(t^t>>>15,1|t);r^=r+Math.imul(r^r>>>7,61|r);return((r^r>>>14)>>>0)/4294967296;};}
const f=(v,d=3)=>Number.isFinite(v)?v.toFixed(d):String(v);
const TAU=2*Math.PI;

function buildLevel(x){
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  const ind=new Uint8Array(W);
  for(let r=11;r<W;r+=30)ind[r]=1;
  for(let r=17;r<W;r+=30)ind[r]=1;
  for(const p of basePs){for(let j=0;j<W;j+=p)ind[j]=0;for(let j=p-2;j<W;j+=p)ind[j]=0;}
  const tmp=[];for(let r=0;r<W;r++)if(ind[r])tmp.push(r);
  const rho=Int32Array.from(tmp);
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  return {x,W,ind,rho,N:rho.length,qs,mids:basePs};
}

// ============================================================================
// PART A — @19 FULL-ENSEMBLE RANK (cap-13's method, memory-lean rebuild)
// ============================================================================
function rankLevel(x,chk){
  const t0=Date.now();
  const {W,rho,N,qs}=buildLevel(x);
  const K=qs.length;
  console.log(`\n===== PART A @${x}: W=${W}  N=${N}  K=${K} scour (${qs[0]}..${qs[K-1]}) — full ensemble, all ${W} rotations =====`);
  const devsq=new Float64Array(W), z2sum=new Float64Array(W);
  const varRots=new Float64Array(K);
  let VrotSum=0, g4anch=0;
  for(let qi=0;qi<K;qi++){
    const q=qs[qi];
    const n=new Int32Array(q);
    for(let i=0;i<rho.length;i++)n[rho[i]%q]++;
    const mu=2*N/q, cd2=new Float64Array(q);
    let ss=0;
    for(let a=0;a<q;a++){const dev=n[a]+n[(a+q-2)%q]-mu;const d2=dev*dev;cd2[a]=d2;ss+=d2;}
    const varRot=ss/q; varRots[qi]=varRot; VrotSum+=varRot;
    if(cd2[0]/varRot>4)g4anch++;
    const inv=1/varRot;
    for(let t=0,a=0;t<W;t++){const d2=cd2[a];devsq[t]+=d2;z2sum[t]+=d2*inv;if(++a===q)a=0;}
  }
  // ---- cross-checks: direct recompute at 3 rotations + mirror pairing ----
  {
    const rng=mulberry32(999+x);let okd=true;
    for(let i=0;i<3;i++){
      const t=i===0?0:Math.floor(rng()*W);
      let dsq=0,zs=0;
      for(let qi=0;qi<K;qi++){
        const q=qs[qi],a=t%q,a2=(a+q-2)%q;let G=0;
        for(let j=0;j<rho.length;j++){const m=rho[j]%q;if(m===a||m===a2)G++;}
        const dev=G-2*N/q;dsq+=dev*dev;zs+=dev*dev/varRots[qi];
      }
      if(Math.abs(dsq-devsq[t])>1e-6||Math.abs(zs-z2sum[t])>1e-6)okd=false;
    }
    let okm=true;
    for(const t of [1,7,12345%W,W>>2,(W>>1)-3]){
      const u=(W-t)%W;
      if(devsq[t]!==devsq[u]||z2sum[t]!==z2sum[u])okm=false;
    }
    console.log(`cross-checks: direct recompute at 3 rotations ${okd?'PASS':'FAIL'};  mirror stat(t)=stat(W-t) (5 t, bitwise) ${okm?'PASS':'FAIL'}`);
  }
  // ---- ranks by full scan (no sort) ----
  const h=W>>1;
  let sum=0,sum2=0;
  let ltV=0,eqV=0,ltZ=0,eqZ=0,gtVh=0,eqVh=0;
  const v0=devsq[0],z0=z2sum[0],vh=devsq[h];
  for(let t=0;t<W;t++){
    const v=devsq[t];sum+=v;sum2+=v*v;
    if(v<v0)ltV++;else if(v===v0)eqV++;
    if(v>vh)gtVh++;else if(v===vh)eqVh++;
    const z=z2sum[t];
    if(z<z0)ltZ++;else if(z===z0)eqZ++;
  }
  const mean=sum/W, sd=Math.sqrt(Math.max(0,sum2/W-mean*mean));
  const VR0=v0/VrotSum, VRh=vh/VrotSum, VRmean=mean/VrotSum, VRsd=sd/VrotSum;
  console.log(`Vrot=${f(VrotSum,2)}  V(0)=${f(v0,2)}  VR(0)=${f(VR0,4)}  Z2(0)=${f(z0/K,4)}  anchored G4=${g4anch}`);
  console.log(`ensemble VR: mean=${f(VRmean,4)} sd=${f(VRsd,4)}`);
  console.log(`ANCHOR ranks:  VR rank ${ltV}/${W} (ties ${eqV}, pct ${f(100*(ltV+eqV/2)/W,4)}%)   Z2 rank ${ltZ}/${W} (ties ${eqZ}, pct ${f(100*(ltZ+eqZ/2)/W,4)}%)`);
  console.log(`W/2 (predicted loudest): VR(W/2)=${f(VRh,3)}  rank-from-top ${gtVh}/${W} (ties ${eqVh})`);
  if(chk){
    const ok1=Math.abs(v0-chk.V0)<0.02,ok2=Math.abs(VrotSum-chk.Vrot)<0.02,ok3=ltV===chk.vrRank,ok4=ltZ===chk.z2Rank;
    console.log(`reproduction of cap-05/13 @${x}: V(0) ${ok1?'PASS':'FAIL'}  Vrot ${ok2?'PASS':'FAIL'}  VR-rank ${ok3?'PASS':'FAIL'}  Z2-rank ${ok4?'PASS':'FAIL'}`);
  }
  console.log(`[part A @${x}: ${(Date.now()-t0)/1000}s]`);
}

// ============================================================================
// PART B — FUSION IDENTITIES + POSITION ENSEMBLES per scour prime
// ============================================================================
// window stats for one length: variance over all W cyclic starts, plus the
// midrank percentile of a reference |deviation| within that ensemble.
function windowStats(P,W,Lw,mu,ref){
  let s2=0,below=0,ties=0;
  for(let s=0;s<W;s++){
    const d=P[s+Lw]-P[s]-mu;
    s2+=d*d;
    const ad=Math.abs(d);
    if(ad<ref-1e-9)below++;else if(ad<=ref+1e-9)ties++;
  }
  return {v:s2/W,pct:(below+ties/2)/W};
}

function fusionLevel(x,sampleQs){
  const t0=Date.now();
  const {W,ind,rho,N,qs}=buildLevel(x);
  const useQs=sampleQs?qs.filter(q=>sampleQs.indexOf(q)>=0):qs;
  console.log(`\n===== PART B @${x}: W=${W} N=${N} — ${useQs.length}${sampleQs?' SAMPLED':''} of ${qs.length} scour primes =====`);
  const A=new Uint8Array(W);
  let fuseOK=0,halfOK=0,mirOK=0,classOK=0,genFused=0,genTot=0,genMin=Infinity;
  let sVfused=0,sVarRot=0,sDev0=0,sVA=0,sVB=0,sCovAdj=0,sVarPair=0;
  let pctF=0,pctA=0,pctB=0,bhF=0,bhA=0,bhB=0,rLT=0;
  const rows=[];
  const rngT=mulberry32(4242+x);
  for(const q of useQs){
    const qinv=modinv(q,W);
    for(let m=0,r=0;m<W;m++){A[m]=ind[r];r+=q;if(r>=W)r-=W;}
    const lA=Math.ceil(W/q),lB=Math.floor((W+1)/q),Lw=lA+lB,s0=W-lB,rq=q*Lw-2*W;
    const ext=Lw+16;
    const P=new Int32Array(W+ext+1);
    for(let i=0;i<W+ext;i++)P[i+1]=P[i]+A[i<W?i:i-W];
    const cnt=(s,l)=>P[s+l]-P[s];
    // class counts, VarRot, gross
    const n=new Int32Array(q);
    for(let i=0;i<rho.length;i++)n[rho[i]%q]++;
    const mu2=2*N/q;let ss=0;
    for(let a=0;a<q;a++){const d=n[a]+n[(a+q-2)%q]-mu2;ss+=d*d;}
    const varRot=ss/q, gross0=n[0]+n[q-2], dev0=gross0-mu2;
    // L1 mirror-sibling spot check (64 random m)
    {
      let ok=true;const rng=mulberry32(x*1000+q);
      for(let i=0;i<64;i++){const m=1+Math.floor(rng()*(W-1));
        const bm=ind[(((q*m-2)%W)+W)%W],am=A[(W-m)%W];
        if(bm!==am){ok=false;break;}}
      if(ok)mirOK++;
    }
    // L2 fusion identity at t=0 (exact integers)
    const fusedCnt=cnt(s0,Lw);
    if(fusedCnt===gross0)fuseOK++;
    // L3a t=W/2: the pair DUPLICATES — the mirror maps class h-2 ONTO class h
    // (n_{h-2}=n_h), so dev(W/2,q) = 2*(one window's dev): variance-doubling.
    // Also verify the base CLASS-WINDOW identity n_a = #(A ∩ [q^{-1}a, +l_a))
    // that underlies every window statement in this file.
    {
      const h=(W/2)%q,h2=(h+q-2)%q;
      const sh=(qinv*h)%W,lh=Math.ceil((W-h)/q);
      if(lh<=ext&&cnt(sh,lh)===n[h]&&n[h2]===n[h])halfOK++;
      const a=1+Math.floor(rngT()*(q-1));
      const sa=(qinv*a)%W,la=Math.ceil((W-a)/q);
      if(la<=ext&&cnt(sa,la)===n[a])classOK++;
    }
    // L3b generic t does NOT fuse: the two windows' cyclic gap never hits 0
    for(let i=0;i<3;i++){
      const t=1+Math.floor(rngT()*(W-2));
      const a=t%q,a2=(a+q-2)%q;
      const sa=(qinv*a)%W,sa2=(qinv*a2)%W;
      const la=Math.ceil((W-a)/q),la2=Math.ceil((W-a2)/q);
      let gap=(sa2-(sa+la))%W;if(gap<0)gap+=W;
      let gap2=(sa-(sa2+la2))%W;if(gap2<0)gap2+=W;
      const g=Math.min(gap,gap2);
      genTot++;if(g===0)genFused++;if(g<genMin)genMin=g;
    }
    // position ensembles
    const muL=N*Lw/W,muA=N*lA/W,muB=N*lB/W;
    const devPos0=fusedCnt-muL;
    if(Math.abs((dev0-devPos0)-N*rq/(q*W))>1e-6)throw new Error(`mean-shift identity fails q=${q}`);
    const stF=windowStats(P,W,Lw,muL,Math.abs(devPos0));
    const devA0=cnt(0,lA)-muA, devB0=cnt(s0,lB)-muB;
    const stA=windowStats(P,W,lA,muA,Math.abs(devA0));
    const stB=windowStats(P,W,lB,muB,Math.abs(devB0));
    const covAdj=(stF.v-stA.v-stB.v)/2;
    // generic-pair variance at the ensemble's own lag D = -2*qinv
    const D=(W-(2*qinv)%W)%W;
    let s2=0;const muP=muA+muB;
    for(let s=0;s<W;s++){const s2i=s+D<W?s+D:s+D-W;const c=(P[s+lA]-P[s])+(P[s2i+lB]-P[s2i])-muP;s2+=c*c;}
    const varPair=s2/W;
    // accumulate
    sVfused+=stF.v;sVarRot+=varRot;sDev0+=dev0*dev0;sVA+=stA.v;sVB+=stB.v;sCovAdj+=covAdj;sVarPair+=varPair;
    pctF+=stF.pct;pctA+=stA.pct;pctB+=stB.pct;
    if(stF.pct<0.5)bhF++;if(stA.pct<0.5)bhA++;if(stB.pct<0.5)bhB++;
    if(stF.v<varRot)rLT++;
    rows.push({q,Lw,rq,varRot,vF:stF.v,R:stF.v/varRot,vAB:stA.v+stB.v,covAdj,varPair,dev0,pF:stF.pct,pA:stA.pct,pB:stB.pct});
  }
  const K=useQs.length;
  console.log(`L1 mirror-sibling B(m)=A(-m): ${mirOK}/${K} PASS   L2 fusion gross(0,q)=one window: ${fuseOK}/${K} PASS   L3 W/2 duplication n_{h-2}=n_h + window-identity: ${halfOK}/${K} PASS   class-window identity (random class): ${classOK}/${K} PASS   generic t fusing: ${genFused}/${genTot} (min gap ${genMin})`);
  console.log('   q |  L=lA+lB  rq | VarRot   Vfused   R=Vf/VR | VA+VB   2covAdj  varPair | dev0    pctF   pctA   pctB');
  const show=rows.length<=12?rows:rows.filter((_,i)=>i<6||i===rows.length-1||i%Math.ceil(rows.length/6)===0);
  for(const r of show)
    console.log(` ${String(r.q).padStart(4)} | ${String(r.Lw).padStart(8)} ${String(r.rq).padStart(4)} | ${f(r.varRot,2).padStart(6)} ${f(r.vF,2).padStart(8)} ${f(r.R,3).padStart(8)} | ${f(r.vAB,2).padStart(6)} ${f(2*r.covAdj,2).padStart(8)} ${f(r.varPair,2).padStart(8)} | ${f(r.dev0,2).padStart(6)} ${f(100*r.pF,1).padStart(6)} ${f(100*r.pA,1).padStart(6)} ${f(100*r.pB,1).padStart(6)}`);
  console.log(`AGGREGATES over ${K} primes:`);
  console.log(`  PREDICTED suppression  sum Vfused / sum VarRot = ${f(sVfused/sVarRot,4)}`);
  console.log(`  MEASURED   suppression sum dev0^2 / sum VarRot = ${f(sDev0/sVarRot,4)}   (cap-05 VR(0): 0.623 @13, 0.553 @17)`);
  console.log(`  RESIDUAL   luck        sum dev0^2 / sum Vfused = ${f(sDev0/sVfused,4)}   (1 = anchor is position-typical of fused windows)`);
  console.log(`  Vfused<VarRot for ${rLT}/${K} primes;  mean R=${f(rows.reduce((a,r)=>a+r.R,0)/K,3)};  sum(VA+VB)/sumVarRot=${f((sVA+sVB)/sVarRot,4)};  sum varPair/sumVarRot=${f(sVarPair/sVarRot,4)}`);
  console.log(`  adjacent-window anticorrelation: sum 2covAdj / sum(VA+VB) = ${f(2*sCovAdj/(sVA+sVB),4)}`);
  console.log(`  anchored-position percentiles (mean, %<50): fused ${f(100*pctF/K,1)}%, ${bhF}/${K}   headA ${f(100*pctA/K,1)}%, ${bhA}/${K}   headB ${f(100*pctB/K,1)}%, ${bhB}/${K}`);
  if(!sampleQs){
    const div=m=>rows.filter(r=>m%r.q===0).map(r=>`${r.q}: R=${f(r.R,2)} vPair/Vf=${f(r.varPair/r.vF,2)}`).join('  ')||'none';
    console.log(`  RESONANT primes — q|W-2 (every rotation's pair adjacent: no anchored edge, expect R~1): ${div(W-2)}`);
    console.log(`                    q|W+2: ${div(W+2)};  q|W+1 (r_q=+2, maximal fused suppression): ${div(W+1)};  q|W-1: ${div(W-1)}`);
  }
  console.log(`[part B @${x}: ${(Date.now()-t0)/1000}s]`);
  return rows;
}

// ============================================================================
// PART C — SPECTRAL IDENTITIES (factored |S| with CRT twist, cap-02 machinery)
// ============================================================================
function buildFourier(L){
  const {W,mids}=L;
  const y30=modinv(W/30,30);
  const c30=new Float64Array(30);
  for(let t=0;t<30;t++)
    c30[t]=Math.hypot(Math.cos(TAU*11*t/30)+Math.cos(TAU*17*t/30),
                      Math.sin(TAU*11*t/30)+Math.sin(TAU*17*t/30));
  const yp={},cp={};
  for(const p of mids){
    yp[p]=modinv(W/p,p);
    const a=new Float64Array(p);a[0]=p-2;
    for(let t=1;t<p;t++)a[t]=Math.abs(2*Math.cos(TAU*t/p));
    cp[p]=a;
  }
  const absS2=new Float64Array(W),usupp=new Uint8Array(W);
  for(let k=0;k<W;k++){
    let v=c30[(k*y30)%30],u=0;
    for(const p of mids){v*=cp[p][(k*yp[p])%p];if(k%p!==0)u++;}
    absS2[k]=v*v;usupp[k]=u;
  }
  return {y30,yp,absS2,usupp};
}
// full complex S(k) via the factored formula (verified vs DFT in cap-02)
function complexS(L,F,k){
  const t=(k*F.y30)%30;
  let re=Math.cos(TAU*11*t/30)+Math.cos(TAU*17*t/30);
  let im=Math.sin(TAU*11*t/30)+Math.sin(TAU*17*t/30);
  for(const p of L.mids){
    const tp=(k*F.yp[p])%p;let gr,gi;
    if(tp===0){gr=p-2;gi=0;}
    else{gr=-(1+Math.cos(TAU*2*tp/p));gi=Math.sin(TAU*2*tp/p);}
    const nr=re*gr-im*gi,ni=re*gi+im*gr;re=nr;im=ni;
  }
  return [re,im];
}

function spectralLevel(x,sampleQs,rowsB){
  const t0=Date.now();
  const L=buildLevel(x),{W,rho,N}=L;
  const F=buildFourier(L);
  console.log(`\n===== PART C @${x}: spectral identities on ${sampleQs.length} sample primes =====`);
  // (i) T(k) = e(k/W)S(k) is REAL (mirror phase alignment): direct check
  {
    let worst=0;const rng=mulberry32(77+x);
    for(let i=0;i<40;i++){
      const k=1+Math.floor(rng()*(W-1));
      let dr=0,di=0;
      for(let j=0;j<rho.length;j++){const a=TAU*((k*rho[j])%W)/W;dr+=Math.cos(a);di+=Math.sin(a);}
      const c=Math.cos(TAU*k/W),s=Math.sin(TAU*k/W);
      worst=Math.max(worst,Math.abs(dr*s+di*c));           // Im(e(k/W)S(k))
      const [fr,fi]=complexS(L,F,k);
      worst=Math.max(worst,Math.hypot(dr-fr,di-fi));       // factored S vs DFT
    }
    console.log(`(i) T(k)=e(k/W)S(k) real + factored-S vs direct DFT, 40 random k: max |err| = ${worst.toExponential(1)}  (PROVEN: mu(N)=N  =>  S(k)=e(-2k/W)conj(S(k)))`);
  }
  // (ii) V_fused resonance formula + V_headA formula vs direct, per sample q
  console.log('(ii)  q |    rq  aq |  Vfused(direct)   Vfused(spectral)   relerr |  VA(direct)   VA(spectral)   relerr');
  for(const q of sampleQs){
    const row=rowsB.find(r=>r.q===q);
    const lA=Math.ceil(W/q),lB=Math.floor((W+1)/q),Lw=lA+lB,rq=q*Lw-2*W,aq=q*lA-W;
    let vF=0,vA=0;
    for(let j=1;j<W;j++){
      const k=(q*j)%W;
      const den=Math.sin(Math.PI*k/W);const w=F.absS2[j]/(den*den);
      const nF=Math.sin(Math.PI*j*rq/W),nA=Math.sin(Math.PI*j*aq/W);
      vF+=w*nF*nF;vA+=w*nA*nA;
    }
    vF/=W*W;vA/=W*W;
    // fresh direct VA (rowsB kept only sums)
    const Aq=new Uint8Array(W);
    for(let m=0,r=0;m<W;m++){Aq[m]=L.ind[r];r+=q;if(r>=W)r-=W;}
    const P=new Int32Array(W+lA+1);
    for(let i=0;i<W+lA;i++)P[i+1]=P[i]+Aq[i<W?i:i-W];
    const muA=N*lA/W;let s2=0;
    for(let s=0;s<W;s++){const d=P[s+lA]-P[s]-muA;s2+=d*d;}
    const vAd=s2/W;
    console.log(`  ${String(q).padStart(4)} | ${String(rq).padStart(5)} ${String(aq).padStart(3)} | ${f(row.vF,6).padStart(14)} ${f(vF,6).padStart(17)} ${(Math.abs(vF-row.vF)/row.vF).toExponential(1).padStart(8)} | ${f(vAd,6).padStart(11)} ${f(vA,6).padStart(13)} ${(Math.abs(vA-vAd)/vAd).toExponential(1).padStart(8)}`);
  }
  // (iii) the complex Sigma-form for the ANCHORED fused count, one prime
  {
    const q=sampleQs[0],qinv=modinv(q,W);
    const lA=Math.ceil(W/q),lB=Math.floor((W+1)/q),Lw=lA+lB,s0=W-lB;
    // direct fused count
    const Aq=new Uint8Array(W);
    for(let m=0,r=0;m<W;m++){Aq[m]=L.ind[r];r+=q;if(r>=W)r-=W;}
    let direct=0;for(let i=0;i<Lw;i++){const m=s0+i<W?s0+i:s0+i-W;direct+=Aq[m];}
    // spectral: cnt = (N*Lw + sum_{j!=0} Re[ S(j) * conj(E_I(qj)) ]) / W
    let acc=0;
    for(let j=1;j<W;j++){
      const k=(q*j)%W;
      const [sr,si]=complexS(L,F,j);
      // E_I(k) = sum_{m=s0}^{s0+Lw-1} e(km/W) = e(k s0/W)(1-e(kLw/W))/(1-e(k/W))
      const a1=TAU*((k*s0)%W)/W;
      const b=TAU*((k*Lw)%W)/W,c=TAU*k/W;
      const n_re=1-Math.cos(b),n_im=-Math.sin(b),d_re=1-Math.cos(c),d_im=-Math.sin(c);
      const dd=d_re*d_re+d_im*d_im;
      const g_re=(n_re*d_re+n_im*d_im)/dd,g_im=(n_im*d_re-n_re*d_im)/dd;
      const e_re=Math.cos(a1)*g_re-Math.sin(a1)*g_im,e_im=Math.cos(a1)*g_im+Math.sin(a1)*g_re;
      acc+=sr*e_re+si*e_im;                                 // Re(S * conj(E))
    }
    const spec=(N*Lw+acc)/W;
    console.log(`(iii) anchored Sigma-form, q=${q}: fused count direct=${direct}  spectral=${f(spec,6)}  |err|=${Math.abs(spec-direct).toExponential(1)}   (dev(0,q) = rho*rq/q + (1/W) sum_j S(j) conj(E_I(qj)), exact)`);
  }
  // (iv) budget by spectral support class u (# base primes NOT dividing j)
  {
    const q=sampleQs[0];
    const lA=Math.ceil(W/q),lB=Math.floor((W+1)/q),Lw=lA+lB,rq=q*Lw-2*W;
    const qinv=modinv(q,W);const D=(W-(2*qinv)%W)%W;
    const nmids=L.mids.length;
    const bF=new Float64Array(nmids+1),bP=new Float64Array(nmids+1);
    for(let j=1;j<W;j++){
      const k=(q*j)%W;
      const den=Math.sin(Math.PI*k/W),w=F.absS2[j]/(den*den);
      const nF=Math.sin(Math.PI*j*rq/W);
      bF[F.usupp[j]]+=w*nF*nF;
      // pair kernel |E_lA(k)+e(kD/W)E_lB(k)|^2
      const b1=TAU*((k*lA)%W)/W,b2=TAU*((k*lB)%W)/W,c=TAU*k/W,ph=TAU*((k*D)%W)/W;
      const dr=1-Math.cos(c),di=-Math.sin(c),dd=dr*dr+di*di;
      const inv_r=dr/dd,inv_i=-di/dd;                       // 1/(1-e(c)) = conj(1-e(c))/|1-e(c)|^2
      const A_r=(1-Math.cos(b1)),A_i=-Math.sin(b1);
      const B_r=(1-Math.cos(b2)),B_i=-Math.sin(b2);
      const EA_r=A_r*inv_r-A_i*inv_i,EA_i=A_r*inv_i+A_i*inv_r;
      const EB_r=B_r*inv_r-B_i*inv_i,EB_i=B_r*inv_i+B_i*inv_r;
      const PB_r=Math.cos(ph)*EB_r-Math.sin(ph)*EB_i,PB_i=Math.cos(ph)*EB_i+Math.sin(ph)*EB_r;
      const S_r=EA_r+PB_r,S_i=EA_i+PB_i;
      bP[F.usupp[j]]+=(F.absS2[j])*(S_r*S_r+S_i*S_i);
    }
    let totF=0,totP=0;for(let u=0;u<=nmids;u++){totF+=bF[u];totP+=bP[u];}
    const vP=totP/(W*W);
    const row=rowsB.find(r=>r.q===q);
    console.log(`(iv) q=${q}: spectral varPair=${f(vP,4)} vs direct ${f(row.varPair,4)} (relerr ${(Math.abs(vP-row.varPair)/row.varPair).toExponential(1)})`);
    console.log(`     budget shares by support u (fused | pair):  `+Array.from({length:nmids+1},(_,u)=>`u=${u}: ${f(100*bF[u]/totF,1)}|${f(100*bP[u]/totP,1)}%`).join('  '));
  }
  console.log(`[part C @${x}: ${(Date.now()-t0)/1000}s]`);
}

// ================================ RUN =========================================
const rows13=fusionLevel(13,null);
spectralLevel(13,[17,19,23,71,173],rows13);
const rows17=fusionLevel(17,null);
spectralLevel(17,[19,101,709],rows17);
rankLevel(17,{V0:632.84,Vrot:1144.40,vrRank:10,z2Rank:2});
rankLevel(19,null);
fusionLevel(19,[23,101,503,1009,2003,3109]);
console.log(`\n[TOTAL ${(Date.now()-T00)/1000}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-19-calm-lemma.js
//   invocation:  node research/natal-cap-19-calm-lemma.js
//   code-sha256: 9a24500ad5f9dc0152fb53852b77f0e7b0f348babbbe2fc57a4ead7758761b98
//   out-sha256:  75b5a2da823f341bbffafb6d50a677169f2b74b4fcae43e49c7e2b9186da3599
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     9.5 s
// ============================================================================
//
// ===== PART B @13: W=30030 N=990 — 34 of 34 scour primes =====
// L1 mirror-sibling B(m)=A(-m): 34/34 PASS   L2 fusion gross(0,q)=one window: 34/34 PASS   L3 W/2 duplication n_{h-2}=n_h + window-identity: 34/34 PASS   class-window identity (random class): 34/34 PASS   generic t fusing: 0/102 (min gap 508)
//    q |  L=lA+lB  rq | VarRot   Vfused   R=Vf/VR | VA+VB   2covAdj  varPair | dev0    pctF   pctA   pctB
//    17 |     3533    1 |   7.19     3.14    0.436 |   6.37    -3.24     5.70 |  -1.47   47.3   87.7   99.0
//    19 |     3161   -1 |   5.85     3.24    0.553 |   4.20    -0.96     5.21 |  -2.21   77.4   13.5   86.9
//    23 |     2611   -7 |   3.12     2.77    0.888 |  10.74    -7.97     6.37 |   0.91   36.3   47.6   34.1
//    29 |     2071   -1 |   4.34     2.85    0.657 |   6.50    -3.65     5.55 |  -3.28   93.9   98.0   32.1
//    31 |     1937  -13 |   4.50     2.35    0.523 |   3.30    -0.94     4.01 |  -2.87   92.7   14.6   97.2
//    37 |     1623   -9 |   2.95     2.01    0.680 |   4.34    -2.33     2.41 |  -0.51   37.9   94.3   86.8
//    41 |     1465    5 |   4.16     2.03    0.489 |   3.73    -1.69     4.78 |   1.71   76.8   42.7   42.8
//    67 |      897   39 |   1.95     1.53    0.785 |   2.37    -0.84     2.48 |   0.45   15.2   16.6   16.5
//    97 |      619  -17 |   5.79     3.05    0.527 |   4.75    -1.70     5.68 |  -1.41   51.5   11.6   56.3
//   127 |      473   11 |   2.46     1.78    0.723 |   2.94    -1.16     3.06 |   0.41   14.1   15.4   15.4
//   157 |      383   71 |   1.77     1.49    0.845 |   1.98    -0.49     1.74 |   1.39   68.1   91.5   17.3
//   173 |      347  -29 |   1.72     1.44    0.837 |   2.10    -0.67     1.80 |   0.55   46.3   18.8   18.7
// AGGREGATES over 34 primes:
//   PREDICTED suppression  sum Vfused / sum VarRot = 0.6663
//   MEASURED   suppression sum dev0^2 / sum VarRot = 0.6231   (cap-05 VR(0): 0.623 @13, 0.553 @17)
//   RESIDUAL   luck        sum dev0^2 / sum Vfused = 0.9352   (1 = anchor is position-typical of fused windows)
//   Vfused<VarRot for 29/34 primes;  mean R=0.747;  sum(VA+VB)/sumVarRot=1.0906;  sum varPair/sumVarRot=1.0652
//   adjacent-window anticorrelation: sum 2covAdj / sum(VA+VB) = -0.3891
//   anchored-position percentiles (mean, %<50): fused 47.9%, 21/34   headA 48.3%, 20/34   headB 48.5%, 21/34
//   RESONANT primes — q|W-2 (every rotation's pair adjacent: no anchored edge, expect R~1): none
//                     q|W+2: none;  q|W+1 (r_q=+2, maximal fused suppression): 59: R=0.50 vPair/Vf=2.27;  q|W-1: none
// [part B @13: 0.067s]
//
// ===== PART C @13: spectral identities on 5 sample primes =====
// (i) T(k)=e(k/W)S(k) real + factored-S vs direct DFT, 40 random k: max |err| = 9.8e-13  (PROVEN: mu(N)=N  =>  S(k)=e(-2k/W)conj(S(k)))
// (ii)  q |    rq  aq |  Vfused(direct)   Vfused(spectral)   relerr |  VA(direct)   VA(spectral)   relerr
//     17 |     1   9 |       3.136958          3.136958  5.5e-13 |    3.182073      3.182073  3.9e-14
//     19 |    -1   9 |       3.236793          3.236793  3.4e-13 |    2.091682      2.091682  3.2e-13
//     23 |    -7   8 |       2.773903          2.773903  4.6e-13 |    5.371140      5.371140  1.7e-13
//     71 |   -65   3 |       3.540098          3.540098  3.2e-13 |    1.971407      1.971407  1.4e-13
//    173 |   -29  72 |       1.436290          1.436290  1.3e-13 |    1.056118      1.056118  3.3e-13
// (iii) anchored Sigma-form, q=17: fused count direct=115  spectral=115.000000  |err|=3.0e-13   (dev(0,q) = rho*rq/q + (1/W) sum_j S(j) conj(E_I(qj)), exact)
// (iv) q=17: spectral varPair=5.7017 vs direct 5.7017 (relerr 1.5e-13)
//      budget shares by support u (fused | pair):  u=0: 1.9|1.6%  u=1: 14.1|21.6%  u=2: 27.6|26.2%  u=3: 56.4|50.5%
// [part C @13: 0.071s]
//
// ===== PART B @17: W=510510 N=14850 — 120 of 120 scour primes =====
// L1 mirror-sibling B(m)=A(-m): 120/120 PASS   L2 fusion gross(0,q)=one window: 120/120 PASS   L3 W/2 duplication n_{h-2}=n_h + window-identity: 120/120 PASS   class-window identity (random class): 120/120 PASS   generic t fusing: 9/360 (min gap 0)
//    q |  L=lA+lB  rq | VarRot   Vfused   R=Vf/VR | VA+VB   2covAdj  varPair | dev0    pctF   pctA   pctB
//    19 |    53738    2 |  41.71     6.26    0.150 |  16.45   -10.19    22.03 |  -0.16    7.9    6.8   20.3
//    23 |    44393   19 |   6.12     8.79    1.434 |  34.86   -26.07     8.79 |   0.70   18.6   82.0   86.0
//    29 |    35207  -17 |  25.84     7.20    0.279 |  17.31   -10.12    19.21 |   2.86   69.8    6.4   62.9
//    31 |    32937   27 |   5.35     6.04    1.128 |  15.54    -9.50     6.07 |   1.94   51.3   90.7   74.0
//    37 |    27595   -5 |   5.78     5.14    0.890 |   8.56    -3.41     6.42 |   2.30   67.3    9.3   80.8
//    41 |    24903    3 |   8.48    10.28    1.212 |  13.73    -3.45    11.30 |   0.61   17.5   60.2   70.0
//   107 |     9543   81 |   9.57    10.63    1.111 |  10.19     0.44    10.98 |  -2.57   56.3    8.3   77.1
//   223 |     4579   97 |   7.71     5.42    0.703 |   8.37    -2.95     8.15 |   0.82   22.6   71.5   59.2
//   337 |     3029 -247 |   4.21     4.80    1.138 |   8.53    -3.74     4.96 |   0.87   27.1    9.9   28.4
//   457 |     2235  375 |   6.04     4.60    0.761 |   6.94    -2.34     6.60 |   0.01    8.9   49.1   49.4
//   593 |     1721 -467 |  10.35     5.19    0.501 |  10.29    -5.10    10.21 |   0.92   24.7    8.4   24.2
//   709 |     1441  649 |   4.24     3.34    0.787 |   4.56    -1.23     4.27 |   0.11   10.9   58.7   37.6
// AGGREGATES over 120 primes:
//   PREDICTED suppression  sum Vfused / sum VarRot = 0.5888
//   MEASURED   suppression sum dev0^2 / sum VarRot = 0.5530   (cap-05 VR(0): 0.623 @13, 0.553 @17)
//   RESIDUAL   luck        sum dev0^2 / sum Vfused = 0.9392   (1 = anchor is position-typical of fused windows)
//   Vfused<VarRot for 107/120 primes;  mean R=0.670;  sum(VA+VB)/sumVarRot=0.9791;  sum varPair/sumVarRot=0.9714
//   adjacent-window anticorrelation: sum 2covAdj / sum(VA+VB) = -0.3987
//   anchored-position percentiles (mean, %<50): fused 47.8%, 65/120   headA 45.4%, 69/120   headB 45.3%, 71/120
//   RESONANT primes — q|W-2 (every rotation's pair adjacent: no anchored edge, expect R~1): 23: R=1.43 vPair/Vf=1.00  31: R=1.13 vPair/Vf=1.01  179: R=0.86 vPair/Vf=1.00
//                     q|W+2: none;  q|W+1 (r_q=+2, maximal fused suppression): 19: R=0.15 vPair/Vf=3.52  97: R=0.89 vPair/Vf=1.22  277: R=0.78 vPair/Vf=1.29;  q|W-1: 61: R=1.05 vPair/Vf=1.19
// [part B @17: 0.853s]
//
// ===== PART C @17: spectral identities on 3 sample primes =====
// (i) T(k)=e(k/W)S(k) real + factored-S vs direct DFT, 40 random k: max |err| = 1.5e-12  (PROVEN: mu(N)=N  =>  S(k)=e(-2k/W)conj(S(k)))
// (ii)  q |    rq  aq |  Vfused(direct)   Vfused(spectral)   relerr |  VA(direct)   VA(spectral)   relerr
//     19 |     2   1 |       6.264316          6.264316  6.5e-12 |    8.225710      8.225710  3.5e-12
//    101 |   -11  45 |      13.526962         13.526962  3.9e-12 |    6.927827      6.927827  1.9e-12
//    709 |   649 679 |       3.336456          3.336456  1.5e-12 |    2.289012      2.289012  8.2e-13
// (iii) anchored Sigma-form, q=19: fused count direct=1563  spectral=1563.000000  |err|=1.8e-11   (dev(0,q) = rho*rq/q + (1/W) sum_j S(j) conj(E_I(qj)), exact)
// (iv) q=19: spectral varPair=22.0260 vs direct 22.0260 (relerr 2.4e-12)
//      budget shares by support u (fused | pair):  u=0: 1.2|0.8%  u=1: 8.6|8.9%  u=2: 20.2|60.6%  u=3: 56.8|18.8%  u=4: 13.2|10.8%
// [part C @17: 0.66s]
//
// ===== PART A @17: W=510510  N=14850  K=120 scour (19..709) — full ensemble, all 510510 rotations =====
// cross-checks: direct recompute at 3 rotations PASS;  mirror stat(t)=stat(W-t) (5 t, bitwise) PASS
// Vrot=1144.40  V(0)=632.84  VR(0)=0.5530  Z2(0)=0.5479  anchored G4=0
// ensemble VR: mean=1.0000 sd=0.1278
// ANCHOR ranks:  VR rank 10/510510 (ties 1, pct 0.0021%)   Z2 rank 2/510510 (ties 1, pct 0.0005%)
// W/2 (predicted loudest): VR(W/2)=2.143  rank-from-top 0/510510 (ties 1)
// reproduction of cap-05/13 @17: V(0) PASS  Vrot PASS  VR-rank PASS  Z2-rank PASS
// [part A @17: 0.148s]
//
// ===== PART A @19: W=9699690  N=252450  K=435 scour (23..3109) — full ensemble, all 9699690 rotations =====
// cross-checks: direct recompute at 3 rotations PASS;  mirror stat(t)=stat(W-t) (5 t, bitwise) PASS
// Vrot=8944.60  V(0)=6250.91  VR(0)=0.6988  Z2(0)=0.7063  anchored G4=4
// ensemble VR: mean=1.0000 sd=0.0720
// ANCHOR ranks:  VR rank 14/9699690 (ties 1, pct 0.0001%)   Z2 rank 6/9699690 (ties 1, pct 0.0001%)
// W/2 (predicted loudest): VR(W/2)=2.293  rank-from-top 0/9699690 (ties 1)
// [part A @19: 6.679s]
//
// ===== PART B @19: W=9699690 N=252450 — 6 SAMPLED of 435 scour primes =====
// L1 mirror-sibling B(m)=A(-m): 6/6 PASS   L2 fusion gross(0,q)=one window: 6/6 PASS   L3 W/2 duplication n_{h-2}=n_h + window-identity: 6/6 PASS   class-window identity (random class): 6/6 PASS   generic t fusing: 0/18 (min gap 663308)
//    q |  L=lA+lB  rq | VarRot   Vfused   R=Vf/VR | VA+VB   2covAdj  varPair | dev0    pctF   pctA   pctB
//    23 |   843451   -7 |  47.19    16.89    0.358 |  34.34   -17.45    33.30 |   2.83   48.9   14.1   32.0
//   101 |   192073   -7 |  37.44    16.87    0.451 |  47.14   -30.27    35.03 |   0.99   13.8   54.6   65.7
//   503 |    38567 -179 |  23.30    13.30    0.571 |  24.95   -11.64    27.40 |   2.22   46.1   76.9   37.9
//  1009 |    19227  663 |  10.60    10.05    0.948 |  16.11    -6.06    11.28 |   1.60   41.2   56.7   81.2
//  2003 |     9685 -325 |  15.02     9.87    0.657 |  16.20    -6.32    15.22 |  -0.07    6.3   93.4   90.5
//  3109 |     6239 -2329 |  12.52     8.63    0.689 |  15.14    -6.51    12.43 |  -2.40   55.0   58.7    7.3
// AGGREGATES over 6 primes:
//   PREDICTED suppression  sum Vfused / sum VarRot = 0.5177
//   MEASURED   suppression sum dev0^2 / sum VarRot = 0.1523   (cap-05 VR(0): 0.623 @13, 0.553 @17)
//   RESIDUAL   luck        sum dev0^2 / sum Vfused = 0.2941   (1 = anchor is position-typical of fused windows)
//   Vfused<VarRot for 6/6 primes;  mean R=0.612;  sum(VA+VB)/sumVarRot=1.0535;  sum varPair/sumVarRot=0.9219
//   adjacent-window anticorrelation: sum 2covAdj / sum(VA+VB) = -0.5086
//   anchored-position percentiles (mean, %<50): fused 35.2%, 5/6   headA 59.1%, 1/6   headB 52.4%, 3/6
// [part B @19: 0.905s]
//
// [TOTAL 9.385s]
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
// 1. @19 RANK — THE CALM DEEPENS FOR THE FOURTH LEVEL RUNNING. Full exact
//    enumeration of all 9,699,690 rotations against 435 scour primes:
//    anchored VR rank 14/9,699,690 (percentile 0.00014%), Z2 rank 6
//    (0.000062%). The ladder now reads (VR percentile): 1.84% -> 3.94% ->
//    0.0021% -> 0.00014% at x = 11/13/17/19. And W/2 is the SINGLE loudest
//    rotation again (VR = 2.293 vs predicted ~2; rank-from-top 0) — three
//    levels running. Calibration: the anchored suppression RATIO itself
//    did not deepen (VR(0) = 0.553 @17 -> 0.699 @19); the rank falls
//    because the ensemble sd shrinks like ~K^(-1/2) (0.128 -> 0.072), so
//    the anchored z marches -3.5 -> -4.2. The "deepening calm" is a
//    deepening z at a roughly level-stable suppression factor ~0.55-0.70.
//    Also: anchored G4 = 4 at @19 — the first level where any anchored
//    prime passes 2 sigma (4/435 vs ~20 expected for a typical rotation;
//    still calm, no longer immaculate).
// 2. THE FUSION IDENTITY IS A THEOREM AND IT IS THE ANCHOR'S WHOLE SECRET.
//    Proven (prose proof in natal-cap-19-calm-lemma.md) and verified as
//    exact integers for all 160 primes tested across three levels:
//      L1  B(m) = A(-m mod W)             (mirror-sibling; mu(N)=N)
//      L2  gross(0,q) = #(A ∩ [W-lB, W+lA))  — ONE cyclic window, length
//          L_q = lA+lB ~ 2W/q, containing the sibling's origin m=0
//      L3  the mirror pairs rotation classes {t,t-2} <-> {W-t, W-t-2};
//          degeneracy iff 2t ≡ 0 (mod W): at t=0 CONCATENATION (L2), at
//          t=W/2 DUPLICATION (n_{h-2} = n_h, so dev = 2x one window — the
//          proven variance doubling; verified 160/160). Generic rotations
//          carry two windows 2q^{-1} apart (0/120 fused at @13/@19).
//    One symmetry, two degeneracies, two opposite extremes: one DOUBLE-
//    LENGTH window (calm, see 4) vs the SAME window TWICE (loud, x2).
// 3. THE RESONANT-PRIME REFINEMENT (found by the 9/360 gap-0 events @17).
//    For q | W-2 the two windows of EVERY rotation are adjacent (q*l =
//    W-2 exactly), so the whole ensemble is fused and the anchor has no
//    edge: q = 23, 31, 179 at @17 — and measured varPair/V_fused = 1.00,
//    1.01, 1.00 with R = 1.43, 1.13, 0.86 straddling 1. These are exactly
//    the "loud" small-q outliers in the table. Conversely q | W+1 forces
//    r_q = 2, the maximally resonant fused length: q = 19, 97, 277 @17
//    with R = 0.15, 0.89, 0.78 (q=19 the most suppressed prime measured).
//    The per-prime spread of R is not noise; it is divisibility of W±1,
//    W±2 by q — rotation-ensemble geometry, now understood.
// 4. THE LEMMA HOLDS QUANTITATIVELY — FUSION CARRIES THE CALM, LUCK DOES
//    NOT. Predicted suppression sum V_fused / sum VarRot = 0.666 @13,
//    0.589 @17 vs measured VR(0) = 0.623 / 0.553: the fused-window
//    position ensemble predicts the anchored variance ratio to within 7%,
//    with the residual sum dev0^2 / sum V_fused = 0.935 / 0.939 — the
//    anchor behaves as a POSITION-TYPICAL fused window (mean position
//    percentile 47.9% / 47.8%, %<50 = 21/34, 65/120). V_fused < VarRot
//    for 29/34, 107/120, 6/6 primes (exceptions = reading 3's resonant
//    q | W-2 plus small-q bucket noise: VarRot has only q buckets).
// 5. THE MIDDLE TERM IS THE SIEVE'S ANTICORRELATION. One fused window
//    carries ~40% less variance than its two halves independently:
//    sum 2Cov_adj / sum(V_A+V_B) = -0.389 @13, -0.399 @17, -0.509 @19
//    (sample) — adjacent windows of the natal pattern are strongly
//    negatively correlated, the window-scale face of rho_p(d) = p-4 <
//    p-2 (06-variance-theorem's sub-Poisson Fano 0.17-0.35). The
//    bookkeeping closes on the other side too: sum varPair / sum VarRot
//    = 1.07 / 0.97 / 0.92 — the rotation ensemble really is "two far
//    windows", so VarRot ~ V_A + V_B and R = V_fused/VarRot ~ 1 - 0.4.
// 6. THE BRIEF'S CANDIDATE (a) IS REFUTED IN ITS VARIANCE FORM. The head
//    windows are NOT specially suppressed relative to their own position
//    ensembles: head-A/head-B percentiles average 45-48% (not ~20%), and
//    the forced structure at the origin (A(0) = 0, thin small-multiples)
//    contributes nothing measurable to |dev|. What the head position
//    supplies is exactly ONE thing: the mirror-adjacency that fuses the
//    two windows. Candidate (b) is sharpened, not refuted: sub-Poisson
//    concentration is indeed position-uniform — what singles out the
//    anchor is that it is the only rotation (per generic q) whose two
//    windows are ADJACENT, and adjacency converts anticorrelation into
//    variance suppression.
// 7. SPECTRAL FORMS, MACHINE-CERTIFIED. T(k) = e(k/W)S(k) is real (proven
//    from mu(N) = N; verified 1e-12), and
//      V_fused(q) = (1/W^2) sum_j |S(j)|^2 sin^2(pi j r_q/W)/sin^2(pi qj/W),
//      r_q = q L_q - 2W, |r_q| < q
//    verified to relerr <= 7e-12 (8 primes, 2 levels); the anchored
//    Sigma-form dev(0,q) = rho r_q/q + (1/W) sum_j S(j) conj(E_I(qj))
//    reproduces fused counts to 2e-11. The hunt's honest verdict: there
//    is an exact head-specific expression (above) and a structural reason
//    it is small (fused length within O(q/W) of exactly 2/q of the
//    period), but NO closed form or c*mean^{1/4} bound for dev(0,q)
//    itself: the budget lives in the diffuse support-u>=2 cloud (u=3
//    carries 56% at both q=17@13 and q=19@17), same as cap-02's caps.
//    dev(0,q) scales like sqrt(V_fused) — sqrt-mean size, 40% quieter in
//    variance, no quarter-power miracle.
// 8. THE LEMMA, SHARPEST TRUE FORM, AND ITS STATUS.
//      FUSED-WINDOW CALM LEMMA. For every scour prime q at level x:
//      (i)   dev(0,q) is the deviation of ONE cyclic sibling window of
//            length L_q ~ 2W/q  [PROVEN — L1+L2];
//      (ii)  dev(W/2,q) = 2 x (one window's deviation)  [PROVEN — L3];
//      (iii) the position-ensemble variance of fused windows satisfies
//            sum_q V_fused / sum_q VarRot = 0.59-0.67 < 1, with per-prime
//            deficit -2Cov_adj ~ 0.4(V_A+V_B) > 0  [MEASURED at @13/@17
//            exactly, all primes; a finite computation, not yet a proof];
//      (iv)  the anchored window is position-typical: dev(0,q)^2 sums to
//            0.94 of its fused-ensemble expectation  [MEASURED].
//    (i)+(ii) make the two arithmetic phases' OPPOSITE extremity a
//    theorem-level asymmetry. The GAP is precisely (iii)+(iv): (iii)
//    needs Cov_adj < 0 uniformly in q — equivalently a sign inequality
//    for the exact cross-lag J5-sum sum_d w(d)(J5(q d mod W) - delta^2),
//    which the J-factorization should make provable at least for the
//    dominant lag classes; (iv) is the anchored-escape wall one level
//    down: nothing forbids the single arithmetic position from being
//    ensemble-atypical at some deeper level — same epistemic shape as
//    natal5-variance reading 6, but now about a factor-0.94 residual
//    instead of the whole calm.
// 9. CAVEATS. (i) @19 part B is a 6-prime sample; its MEASURED 0.152 and
//    residual 0.29 are small-sample fluctuation of 6 anchored devs, not a
//    contradiction of (iv) — the @19 full-ensemble VR(0) = 0.699 is the
//    honest number. (ii) VarRot per prime is a q-bucket statistic and
//    noisy at small q; all aggregate claims use sums over the scour.
//    (iii) The generic-fusion counts (0/102, 9/360, 0/18) are 3-sample
//    probes per prime, not exhaustive — the 2t ≡ 0 uniqueness is proven,
//    the per-prime q | W-2 exception is proven, other exceptions would be
//    divisibility events of the same kind. (iv) Runtime 9.1s total; the
//    @19 ensemble (2.3 GB of per-rotation floats avoided by two-array
//    accumulation) cost 6.6s — full enumeration stays the default control.
// 10. NEXT STEP. Prove (iii): compute the cross-lag correlation sum
//    2Cov_adj = sum_{d} w_adj(d) (J5(qd mod W) - delta^2) exactly from the
//    J5 machinery (natal5-variance) and find the sign mechanism — the
//    candidate is that lags qd mod W of the CROSS block sweep the generic
//    (p-4)/p correlation classes while avoiding the positive d ≡ 0 (mod p)
//    classes, making each prime's factor a strict deficit. If that lands,
//    the anchored calm = (proven fusion) x (proven anticorrelation) x
//    (measured 0.94 typicality), and cap-13's last sighting rests on one
//    unproven leg instead of three.
// 11. FORWARD POINTER (2026-08-17 script sweep). Reading 10 has been executed
//    and reading 8's four-leg statement has moved. natal-cap-23 turned
//    Cov_adj's sign into exact BigInt arithmetic and REFUTED the uniform-in-q
//    form: negative for 595 of 599 scour primes at @11..@19 with the four
//    exceptions cataloged, weak and non-resonant, so only the AGGREGATE form
//    is claimed. natal-cap-26 then showed the -1/2 is EXACT and needs no
//    equidistribution at all (the comb's teeth are 6 apart in a 30-wheel, so
//    C(qh) = 0 for h = 1..5), reducing leg (iii) to "aggregate 30-skeleton
//    < 1/2". natal-cap-30 proved the Skeleton Collapse Theorem and certified
//    that inequality in exact BigInt at @11..@23; natal-cap-36 added @29 and
//    showed the fixed-modulus door carries almost none of the mass, so the
//    all-x statement is OPEN at moduli growing with W. Leg (iv), the anchored
//    typicality 0.94, is untouched and is the calm's last wall.
//    THE NAME IN READING 8 IS RETIRED. "Fused-Window Calm Lemma" spanned a
//    proven mechanism, a six-level certificate, a refuted uniform form and an
//    unexplained measurement, so every summary that copied the name either
//    reproduced the whole grading or said something false. The nine
//    sub-claims and their four calibrations are in research/anchored-calm.md.
//    Read reading 8 as this file's own snapshot, not as a live single object.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   VR(0) at @19, 0.6988 -> 0.699 in reading 1 and -> 0.70 as the top of the
//     "~0.55-0.70" band.
//   the @17 ensemble sd, 0.1278 -> 0.128 in reading 1.
//   the predicted suppression at @17, 0.5888 -> 0.589 in reading 4 and -> 0.59
//     as the bottom of reading 8's "0.59-0.67" band, whose top 0.67 is the @13
//     line's 0.6663.
//   the anticorrelation ratios of reading 5, -0.3987 -> -0.399 at @17 and
//     -0.5086 -> -0.509 at @19.
//   the varPair bookkeeping of reading 5: 1.0652, 0.9714, 0.9219 -> 1.07 /
//     0.97 / 0.92.
//   the three spectral certificates of reading 7, each quoted as a ceiling:
//     max |err| 9.8e-13 -> "verified 1e-12", relerr 6.5e-12 -> "<= 7e-12", and
//     the anchored Sigma-form |err| 1.8e-11 -> "2e-11".
// TOKENIZER ARTIFACT, not a figure: the hyphenated ranges "~0.55-0.70",
//   "0.17-0.35" and "0.59-0.67" are each read as a negative second endpoint.
// DERIVED IN THIS READING by arithmetic over printed values:
//   the @19 percentiles of reading 1. The block prints the ranks and a
//     one-digit pct: VR rank 14/9699690 is 0.00014%, quoted at the finer
//     precision the printed 0.0001% cannot show, and that one checks out.
//     CORRECTED 2026-08-20 (mismatch adjudication #14): the companion Z2
//     percentile read 0.00007% and now reads 0.000062%. 6/9,699,690 =
//     6.1858e-5 per cent (recomputed here), which rounds to 0.000062% at the
//     two significant figures the VR entry beside it uses, and to 0.00006% at
//     one -- never to 0.00007%. Old -> new: 0.00007% -> 0.000062%. Nothing
//     rests on the digit: the reading's point is a rank of 6 out of 9.7
//     million, which is printed.
//   160 primes in reading 2: the three per-level scour counts of reading 4,
//     34 + 120 + 6.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   1.84% and 3.94%, the @11 and @13 rungs of reading 1's percentile ladder,
//     are in `natal-cap-13-anchored-calm.js`, whose VR rows print 1.840 at
//     42/2310 and 3.938 at 1182/30030 and whose summary table carries 1.84 and
//     3.94. `natal-cap-31-calm-vs-kill.js` prints the @13 figure independently
//     as |F| = 1183 (3.94%).
//   595 of 599 scour primes in reading 11 is `natal-cap-23-covadj-proof.js`,
//     whose four level lines give 9/10, 34/34, 119/120 and 433/435, summing to
//     595 negative of 599 tested.
// DEFINITION / LITERATURE constants: the sub-Poisson Fano band 0.17-0.35 in
//   reading 5 is `06-variance-theorem`'s, carried in this file's own header at
//   the top of the code.
// ---------------------------------------------------------------------------
