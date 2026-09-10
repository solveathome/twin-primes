// ============================================================================
// NATAL-CAP 31 — CALM vs KILL: does the anchored calm forbid annihilation?
// (2026-08-14 — the framework's unplayed card, made precise)
// ============================================================================
// THE TENSION. TPC failing at level x = the anchored rotation's survivor count
// S(0) hitting zero — an extreme LOWER-TAIL event of S over the rotation
// ensemble. The anchor is provably (cap-19 fusion) + measured (VR rank
// 2/510510 @17, 14/9.7M @19) in the ensemble's LOW-VARIANCE family. Intuition:
// calm members hug their mean, hence sit FAR from the S = 0 tail. This file
// derives what is exact in that intuition and measures the rest.
//
// OBJECTS (rotation ensemble of cap-13: t ∈ [0,W), prime q strikes classes
// {t, t−2} mod q; anchor t = 0). Per rotation, exact integers:
//   S(t)  = survivors of the natal set N (|N| = N̄),
//   M(t)  = Σ_q G(t,q), total strikes with multiplicity (G = pair-class count),
//   X(t)  = M − (N̄ − S), the overlap credit (strikes absorbed by dead slots),
//   P2(t) = Σ_r C(m_r,2) = Σ_{q<q′}|A_q∩A_q′|, pairwise co-strikes (cap-12's
//           S₂ read at rotation t; m_r = # primes striking r),
//   VR(t) = Σ_q dev(t,q)² / Σ_q VarRot(q), cap-13's loudness statistic,
//           dev(t,q) = G(t,q) − 2N̄/q, V̄ = Σ_q VarRot(q).
// EXACT LEDGER (verified per rotation, brute-forced at sampled t):
//   (L1) S = N̄ − M + X,  M = H·N̄ + D,  H = 2Σ_q 1/q,  D(t) = Σ_q dev(t,q)
//        ⇒ S(t) = N̄(1−H) + X(t) − D(t): S's fluctuation IS overlap-credit
//        fluctuation minus strike-surplus fluctuation. Var(S) = Var(X) +
//        Var(D) − 2Cov(X,D) exactly.
//   (L2) Cauchy–Schwarz loudness bridge: |D(t)| ≤ √(K·V̄·VR(t)).
//   (L3) X ≥ 0 and X ≤ P2 pointwise (m−1 ≤ C(m,2) for m ≥ 1); Bonferroni
//        N̄ − M ≤ S ≤ N̄ − M + P2.
//   (L4) CALM FLOOR: S(t) ≥ N̄(1−H) − √(K·V̄·VR(t)).  Contrapositive, when
//        H < 1 (true only @11): S(t) = 0 ⇒ VR(t) ≥ N̄²(1−H)²/(K·V̄) — a
//        PROVEN annihilation-loudness bound. @13+ has H > 1 (overlap credit
//        mandatory, the ~2lnx capacity excess): the proven leg dies and
//        S = 0 ⟺ X − D = N̄(H−1) — an overlap-collapse/strike-surplus event
//        whose depth below the mean is exactly E[S].
// THE MISSING LEMMA, to be priced empirically here (c_obs): an overlap floor
//   |X(t) − X̄| ≤ c·√(K·V̄·VR(t))  would give, at every level,
//   S = 0 ⇒ VR ≥ (E[S]/(1+c))²/(K·V̄) =: v_min(x), with v_min growing iff
//   E[S]/√(K·V̄) grows. We measure c_obs = max_t |X−X̄|/√(K·V̄·VR(t)).
// MEASUREMENTS: full enumeration @11/@13/@17 (2310 / 30030 / 510510
// rotations, all exact): S-vs-VR correlation + regression, VR-decile table,
// the calm family F = {VR ≤ VR(0)} (conditional mean/sd/min/tail of S),
// minimizer loudness (are low-S rotations loud?), empirical loudness floor
// min{VR : S ≤ s}. Cross-checks: VR(0) and S(0) vs cap-13/anchored-note,
// mirror S(t) = S(W−t), independent brute recompute, cap-12 pair-sum = P2.
// ============================================================================
'use strict';
const T00=Date.now();
function primesUpTo(n){const s=new Uint8Array(n+1),o=[];for(let i=2;i<=n;i++){if(!s[i]){o.push(i);for(let j=i*i;j<=n;j+=i)s[j]=1;}}return o;}
function mulberry32(seed){let t=seed>>>0;return function(){t+=0x6D2B79F5;let r=Math.imul(t^t>>>15,1|t);r^=r+Math.imul(r^r>>>7,61|r);return((r^r>>>14)>>>0)/4294967296;};}
const f=(v,d=3)=>Number.isFinite(v)?v.toFixed(d):String(v);
function lowerBound(a,v){let lo=0,hi=a.length;while(lo<hi){const m=(lo+hi)>>1;if(a[m]<v)lo=m+1;else hi=m;}return lo;}
function upperBound(a,v){let lo=0,hi=a.length;while(lo<hi){const m=(lo+hi)>>1;if(a[m]<=v)lo=m+1;else hi=m;}return lo;}
const pctile=(s,v)=>100*(lowerBound(s,v)+upperBound(s,v))/(2*s.length);
function msd(arr){const n=arr.length;let s=0,s2=0;for(let i=0;i<n;i++){s+=arr[i];s2+=arr[i]*arr[i];}const m=s/n;return[m,Math.sqrt(Math.max(0,s2/n-m*m))];}
function corr(x,y){const n=x.length;let sx=0,sy=0;for(let i=0;i<n;i++){sx+=x[i];sy+=y[i];}const mx=sx/n,my=sy/n;
  let A=0,B=0,C=0;for(let i=0;i<n;i++){const dx=x[i]-mx,dy=y[i]-my;A+=dx*dy;B+=dx*dx;C+=dy*dy;}return A/Math.sqrt(B*C);}
function cov(x,y){const n=x.length;let sx=0,sy=0;for(let i=0;i<n;i++){sx+=x[i];sy+=y[i];}const mx=sx/n,my=sy/n;
  let A=0;for(let i=0;i<n;i++)A+=(x[i]-mx)*(y[i]-my);return A/n;}
const CHK={11:{vr:0.344,s:45},13:{vr:0.623,s:307},17:{vr:0.553,s:3099}};

function bruteAt(t,rho,qs,N){let cv=0,M=0,p2=0;
  for(const r of rho){let m=0;
    for(const q of qs){const c=((r-t)%q+q)%q;if(c===0||c===q-2)m++;}
    if(m>0)cv++;M+=m;p2+=m*(m-1)/2;}
  return{S:N-cv,M,p2};}
function pairSumAt(t,rho,qs){let s=0;
  for(let i=0;i<qs.length;i++)for(let j=i+1;j<qs.length;j++){const q1=qs[i],q2=qs[j];
    for(const r of rho){const c1=((r-t)%q1+q1)%q1;if(c1!==0&&c1!==q1-2)continue;
      const c2=((r-t)%q2+q2)%q2;if(c2===0||c2===q2-2)s++;}}
  return s;}

function runLevel(x){
  const t0=Date.now();
  const basePs=primesUpTo(x).filter(p=>p>=7);
  const W=30*basePs.reduce((a,b)=>a*b,1);
  const A=new Uint8Array(W);
  for(let r=11;r<W;r+=30)A[r]=1;for(let r=17;r<W;r+=30)A[r]=1;
  for(const p of basePs){for(let j=0;j<W;j+=p)A[j]=0;for(let j=p-2;j<W;j+=p)A[j]=0;}
  const rho=[];for(let r=0;r<W;r++)if(A[r])rho.push(r);
  const N=rho.length;
  const qs=primesUpTo(Math.floor(Math.sqrt(W))+1).filter(q=>q>x&&q*q<=W);
  const K=qs.length;
  // per-prime buckets (natal indices by class) + class dev tables
  const Pidx=[],Pst=[],Pcd1=[],Pcd2=[];let Vbar=0,H=0;
  for(const q of qs){
    const n=new Int32Array(q);for(const r of rho)n[r%q]++;
    const st=new Int32Array(q+1);for(let a=0;a<q;a++)st[a+1]=st[a]+n[a];
    const idx=new Int32Array(N),pos=st.slice(0,q);
    for(let i=0;i<N;i++){const a=rho[i]%q;idx[pos[a]++]=i;}
    const mu=2*N/q,cd1=new Float64Array(q),cd2=new Float64Array(q);let ss=0;
    for(let a=0;a<q;a++){const a2=(a+q-2)%q,dev=n[a]+n[a2]-mu;cd1[a]=dev;cd2[a]=dev*dev;ss+=dev*dev;}
    Vbar+=ss/q;H+=2/q;Pidx.push(idx);Pst.push(st);Pcd1.push(cd1);Pcd2.push(cd2);
  }
  console.log(`\n===== @${x}: W=${W} N=${N} K=${K} (${qs[0]}..${qs[K-1]})  H=2Σ1/q=${f(H,4)}  V̄=ΣVarRot=${f(Vbar,2)}  N(1−H)=${f(N*(1-H),1)} =====`);
  // ---------------- the sweep: S, M, P2, VR for every rotation ----------------
  const S=new Int32Array(W),Marr=new Int32Array(W),P2a=new Float64Array(W),VR=new Float64Array(W),Darr=new Float64Array(W);
  const mult=new Int32Array(N),touched=new Int32Array(N),cls=new Int32Array(K);
  for(let t=0;t<W;t++){
    let cv=0,M=0,vr=0,dd=0;
    for(let j=0;j<K;j++){
      const a=cls[j],st=Pst[j],ix=Pidx[j],q=st.length-1,a2=a>=2?a-2:a+q-2;
      vr+=Pcd2[j][a];dd+=Pcd1[j][a];
      for(let k=st[a],e=st[a+1];k<e;k++){const i=ix[k];if(mult[i]===0)touched[cv++]=i;mult[i]++;}
      for(let k=st[a2],e=st[a2+1];k<e;k++){const i=ix[k];if(mult[i]===0)touched[cv++]=i;mult[i]++;}
      M+=(st[a+1]-st[a])+(st[a2+1]-st[a2]);
      cls[j]=a+1===q?0:a+1;
    }
    let p2=0;
    for(let i=0;i<cv;i++){const u=touched[i],m=mult[u];p2+=(m*(m-1))/2;mult[u]=0;}
    S[t]=N-cv;Marr[t]=M;P2a[t]=p2;VR[t]=vr/Vbar;Darr[t]=dd;
  }
  // ---------------- cross-checks ----------------
  {
    const c=CHK[x];
    const ok1=Math.abs(VR[0]-c.vr)<0.002,ok2=S[0]===c.s;
    const rng=mulberry32(3100+x);let okb=true,okp=true;
    for(let i=0;i<3;i++){const t=i===0?0:Math.floor(rng()*W);
      const b=bruteAt(t,rho,qs,N);
      if(b.S!==S[t]||b.M!==Marr[t]||b.p2!==P2a[t])okb=false;
      if(x<=13||i<2){if(pairSumAt(t,rho,qs)!==P2a[t])okp=false;}}
    let okm=true;for(const t of [1,7,W>>2,(W>>1)-3])if(S[t]!==S[(W-t)%W]||Math.abs(VR[t]-VR[(W-t)%W])>1e-9)okm=false;
    let okl=0;for(let t=0;t<W;t++){const xo=Marr[t]-(N-S[t]);if(xo<0||xo>P2a[t]+1e-9)okl++;}
    console.log(`checks: VR(0)=${f(VR[0])} (cap13 ${c.vr} ${ok1?'PASS':'FAIL'})  S(0)=${S[0]} (${c.s} ${ok2?'PASS':'FAIL'})  brute@3t ${okb?'PASS':'FAIL'}  P2=cap12-pairsum ${okp?'PASS':'FAIL'}  mirror ${okm?'PASS':'FAIL'}  0≤X≤P2 all t ${okl===0?'PASS':'FAIL'}`);
  }
  // ---------------- ensemble moments + exact decomposition ----------------
  const Xa=new Float64Array(W);for(let t=0;t<W;t++)Xa[t]=Marr[t]-(N-S[t]);
  const Sf=Float64Array.from(S);
  const [mS,sdS]=msd(Sf),[mD,sdD]=msd(Darr),[mX,sdX]=msd(Xa),[mP2,sdP2]=msd(P2a),[mVR]=msd(VR);
  const cDX=cov(Darr,Xa);
  const relerr=Math.abs(sdS*sdS-(sdD*sdD+sdX*sdX-2*cDX))/(sdS*sdS);
  let sMin=1e9,sArg=-1,sMax=-1;for(let t=0;t<W;t++){if(S[t]<sMin){sMin=S[t];sArg=t;}if(S[t]>sMax)sMax=S[t];}
  console.log(`ENSEMBLE: S mean=${f(mS,2)} sd=${f(sdS,2)} min=${sMin}@t=${sArg} max=${sMax} | D sd=${f(sdD,2)} | X mean=${f(mX,1)} sd=${f(sdX,2)} | P2 mean=${f(mP2,1)} | meanVR=${f(mVR)}`);
  console.log(`  Var(S)=Var(D)+Var(X)−2Cov(D,X): ${f(sdS*sdS,2)} = ${f(sdD*sdD,2)}+${f(sdX*sdX,2)}−2·${f(cDX,2)} (relerr ${relerr.toExponential(1)})  Cov(D,X)/sdDsdX=${f(cDX/(sdD*sdX))}  Var(D)/V̄=${f(sdD*sdD/Vbar)}`);
  // ---------------- anchor decomposition ----------------
  console.log(`ANCHOR: S(0)=${S[0]} (z=${f((S[0]-mS)/sdS,2)})  VR(0)=${f(VR[0])}  D(0)=${f(Darr[0],2)} (z=${f((Darr[0]-mD)/sdD,2)})  X(0)=${Xa[0]} (z=${f((Xa[0]-mX)/sdX,2)})  P2(0)=${P2a[0]} (z=${f((P2a[0]-mP2)/sdP2,2)})  drift split S−S̄=${f(S[0]-mS,1)} = X̂(${f(Xa[0]-mX,1)}) − D̂(${f(Darr[0]-mD,1)})`);
  // ---------------- the VR-vs-S law ----------------
  const dev2=new Float64Array(W);for(let t=0;t<W;t++){const d=Sf[t]-mS;dev2[t]=d*d;}
  const b=cov(VR,Sf)/ (msd(VR)[1]**2);
  console.log(`LAW: corr(VR,S)=${f(corr(VR,Sf))}  corr(VR,(S−S̄)²)=${f(corr(VR,dev2))}  corr(D,S)=${f(corr(Darr,Sf))}  corr(X,S)=${f(corr(Xa,Sf))}  corr(P2,X)=${f(corr(P2a,Xa))}  slope S on VR: ${f(b,2)} (=${f(b/sdS,2)}σS per VR unit)`);
  const ord=new Uint32Array(W);for(let t=0;t<W;t++)ord[t]=t;ord.sort((a,c)=>VR[a]-VR[c]);
  const sortedVR=Float64Array.from(ord,t=>VR[t]);
  let line='DECILES by VR (VRlo..hi | meanS sdS minS): ';
  for(let d=0;d<10;d++){const lo=Math.floor(d*W/10),hi=Math.floor((d+1)*W/10);
    let s=0,s2=0,mn=1e9;for(let i=lo;i<hi;i++){const v=Sf[ord[i]];s+=v;s2+=v*v;if(v<mn)mn=v;}
    const n=hi-lo,m=s/n,sd=Math.sqrt(Math.max(0,s2/n-m*m));
    line+=`\n  d${d+1} ${f(VR[ord[lo]],2)}..${f(VR[ord[hi-1]],2)} | ${f(m,1)} ${f(sd,2)} ${mn}`;}
  console.log(line);
  // ---------------- the calm family ----------------
  const sortedS=Int32Array.from(S).sort();
  const q01=sortedS[Math.floor(0.001*W)],q1=sortedS[Math.floor(0.01*W)],q5=sortedS[Math.floor(0.05*W)];
  {
    let n=0,s=0,s2=0,mn=1e9,mx=-1,le1=0;let fullle1=0;
    for(let t=0;t<W;t++){if(S[t]<=q1)fullle1++;
      if(VR[t]<=VR[0]){n++;const v=Sf[t];s+=v;s2+=v*v;if(v<mn)mn=v;if(v>mx)mx=v;if(v<=q1)le1++;}}
    const m=s/n,sd=Math.sqrt(Math.max(0,s2/n-m*m));
    console.log(`CALM F={VR≤VR(0)}: |F|=${n} (${f(100*n/W,2)}%)  S|F: mean=${f(m,2)} sd=${f(sd,2)} min=${mn} max=${mx}  Var(S|F)/Var(S)=${f(sd*sd/(sdS*sdS))}  minS|F−minS=${mn-sMin}  P(S≤q1%|F)=${f(100*le1/n,2)}% vs ${f(100*fullle1/W,2)}% full`);
  }
  // ---------------- minimizer loudness + empirical floor ----------------
  {
    const idx=[];for(let t=0;t<W;t++)idx.push(t);idx.sort((a,c)=>S[a]-S[c]);
    console.log('MINIMIZERS (8 lowest S): '+idx.slice(0,8).map(t=>`t=${t}:S=${S[t]},VR=${f(VR[t],2)}(p${f(pctile(sortedVR,VR[t]),1)})`).join(' '));
    const floor=(s)=>{let mn=1e9,mx=-1;for(let t=0;t<W;t++)if(S[t]<=s){if(VR[t]<mn)mn=VR[t];if(VR[t]>mx)mx=VR[t];}return[mn,mx];};
    const [f01lo,f01hi]=floor(q01),[f1lo]=floor(q1),[f5lo]=floor(q5);
    console.log(`EMPIRICAL FLOOR minVR among {S≤s}: s=${q01}(0.1%): ${f(f01lo,3)} (max ${f(f01hi,2)})  s=${q1}(1%): ${f(f1lo,3)}  s=${q5}(5%): ${f(f5lo,3)}   [anchor VR=${f(VR[0],3)}]`);
  }
  // ---------------- the missing-lemma price c_obs + proven floor ----------------
  {
    const ratios=new Float64Array(W);let cmax=0,targ=-1,dmax=0;
    for(let t=0;t<W;t++){const den=Math.sqrt(K*Vbar*VR[t]);const r=Math.abs(Xa[t]-mX)/den;ratios[t]=r;
      if(r>cmax){cmax=r;targ=t;}const rd=Math.abs(Darr[t])/den;if(rd>dmax)dmax=rd;}
    ratios.sort();
    console.log(`OVERLAP-FLOOR PRICE: c_obs=max|X−X̄|/√(KV̄·VR)=${f(cmax,3)}@t=${targ}(VR=${f(VR[targ],2)})  p99.9=${f(ratios[Math.floor(0.999*W)],3)}  median=${f(ratios[W>>1],3)}  [CS check max|D|/√(KV̄·VR)=${f(dmax,3)}≤1]`);
    const EoverB=mS/Math.sqrt(K*Vbar);
    console.log(`SCALING: E[S]/√(K·V̄)=${f(EoverB,2)} → candidate v_min=(E/(1+c))²/(KV̄) with c=c_obs: ${f((mS/(1+cmax))**2/(K*Vbar),3)}  (vs max observed VR=${f(VR[ord[W-1]],2)})`);
    if(H<1){
      const del=N*(1-H),vmin=del*del/(K*Vbar);
      let loud=[];for(let t=0;t<W;t++)if(VR[t]>=vmin)loud.push(t);
      let viol=0;for(let t=0;t<W;t++)if(Sf[t]<N*(1-H)-Math.sqrt(K*Vbar*VR[t])-1e-9)viol++;
      console.log(`PROVEN LEMMA (H<1): S(t)=0 ⇒ VR≥Δ²/(KV̄)=${f(vmin,3)} (Δ=N(1−H)=${f(del,1)});  rotations with VR≥${f(vmin,2)}: ${loud.length} ${loud.map(t=>`t=${t}(S=${S[t]})`).join(' ')};  calm-floor violations ${viol}/${W}`);
    } else console.log(`PROVEN LEMMA: H=${f(H,3)}>1 — pigeonhole leg vacuous at this level (overlap credit mandatory: S=0 ⟺ X−D=N(H−1)=${f(N*(H-1),1)}, i.e. (X−D) ${f(mS/sdS,1)}σ_S below its mean)`);
  }
  console.log(`[level time ${(Date.now()-t0)/1000}s]`);
}
for(const x of [11,13,17]) runLevel(x);
console.log(`[total ${(Date.now()-T00)/1000}s]`);
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/natal-cap-31-calm-vs-kill.js
//   invocation:  node research/natal-cap-31-calm-vs-kill.js
//   code-sha256: d536984ff13940a6a20ba15d7101e14a16cf66048ddd2ff82aa6e71466981d51
//   out-sha256:  9fd6cfb5ea65ee44109db5a4aba9f38c39d6228de472bcbd5b74dffc271139d5
//   body-lines:  76
//   restamped:   2026-08-20 normalize migration; body verified byte-authentic under the bind-time rule (pre-min (before 2026-08-20)) before the hash moved
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     77.2 s
// ============================================================================
//
// ===== @11: W=2310 N=90 K=10 (13..47)  H=2Σ1/q=0.7891  V̄=ΣVarRot=15.07  N(1−H)=19.0 =====
// checks: VR(0)=0.344 (cap13 0.344 PASS)  S(0)=45 (45 PASS)  brute@3t PASS  P2=cap12-pairsum PASS  mirror PASS  0≤X≤P2 all t PASS
// ENSEMBLE: S mean=38.24 sd=3.70 min=28@t=759 max=51 | D sd=3.87 | X mean=19.3 sd=3.88 | P2 mean=24.9 | meanVR=0.999
//   Var(S)=Var(D)+Var(X)−2Cov(D,X): 13.71 = 14.96+15.09−2·8.17 (relerr 4.3e-15)  Cov(D,X)/sdDsdX=0.544  Var(D)/V̄=0.993
// ANCHOR: S(0)=45 (z=1.83)  VR(0)=0.344  D(0)=1.98 (z=0.51)  X(0)=28 (z=2.25)  P2(0)=30 (z=0.45)  drift split S−S̄=6.8 = X̂(8.7) − D̂(2.0)
// LAW: corr(VR,S)=0.088  corr(VR,(S−S̄)²)=0.113  corr(D,S)=-0.474  corr(X,S)=0.481  corr(P2,X)=0.589  slope S on VR: 0.86 (=0.23σS per VR unit)
// DECILES by VR (VRlo..hi | meanS sdS minS):
//   d1 0.16..0.55 | 37.8 3.45 31
//   d2 0.55..0.67 | 38.1 3.40 31
//   d3 0.67..0.77 | 38.1 3.70 28
//   d4 0.77..0.87 | 38.1 3.70 31
//   d5 0.87..0.96 | 37.7 3.08 30
//   d6 0.96..1.06 | 38.4 3.76 30
//   d7 1.06..1.17 | 38.4 3.48 32
//   d8 1.17..1.30 | 38.1 4.09 30
//   d9 1.30..1.49 | 38.3 3.63 29
//   d10 1.50..2.78 | 39.2 4.37 29
// CALM F={VR≤VR(0)}: |F|=43 (1.86%)  S|F: mean=38.95 sd=3.77 min=33 max=46  Var(S|F)/Var(S)=1.038  minS|F−minS=5  P(S≤q1%|F)=0.00% vs 1.30% full
// MINIMIZERS (8 lowest S): t=759:S=28,VR=0.73(p26.5) t=1551:S=28,VR=0.73(p26.5) t=805:S=29,VR=1.54(p91.7) t=907:S=29,VR=2.03(p98.7) t=969:S=29,VR=1.40(p86.0) t=1097:S=29,VR=1.53(p91.3) t=1213:S=29,VR=1.53(p91.3) t=1341:S=29,VR=1.40(p86.0)
// EMPIRICAL FLOOR minVR among {S≤s}: s=29(0.1%): 0.733 (max 2.03)  s=30(1%): 0.689  s=32(5%): 0.370   [anchor VR=0.344]
// OVERLAP-FLOOR PRICE: c_obs=max|X−X̄|/√(KV̄·VR)=1.250@t=840(VR=0.80)  p99.9=1.214  median=0.224  [CS check max|D|/√(KV̄·VR)=0.851≤1]
// SCALING: E[S]/√(K·V̄)=3.12 → candidate v_min=(E/(1+c))²/(KV̄) with c=c_obs: 1.918  (vs max observed VR=2.78)
// PROVEN LEMMA (H<1): S(t)=0 ⇒ VR≥Δ²/(KV̄)=2.392 (Δ=N(1−H)=19.0);  rotations with VR≥2.39: 7 t=166(S=35) t=940(S=43) t=983(S=30) t=1155(S=48) t=1327(S=30) t=1370(S=43) t=2144(S=35);  calm-floor violations 0/2310
// [level time 0.02s]
//
// ===== @13: W=30030 N=990 K=34 (17..173)  H=2Σ1/q=1.1468  V̄=ΣVarRot=119.58  N(1−H)=-145.3 =====
// checks: VR(0)=0.623 (cap13 0.623 PASS)  S(0)=307 (307 PASS)  brute@3t PASS  P2=cap12-pairsum PASS  mirror PASS  0≤X≤P2 all t PASS
// ENSEMBLE: S mean=310.88 sd=25.03 min=248@t=8161 max=398 | D sd=10.96 | X mean=456.2 sd=25.86 | P2 mean=621.6 | meanVR=1.000
//   Var(S)=Var(D)+Var(X)−2Cov(D,X): 626.48 = 120.22+668.94−2·81.34 (relerr 4.1e-14)  Cov(D,X)/sdDsdX=0.287  Var(D)/V̄=1.005
// ANCHOR: S(0)=307 (z=-0.16)  VR(0)=0.623  D(0)=-0.30 (z=-0.03)  X(0)=452 (z=-0.16)  P2(0)=601 (z=-0.16)  drift split S−S̄=-3.9 = X̂(-4.2) − D̂(-0.3)
// LAW: corr(VR,S)=0.004  corr(VR,(S−S̄)²)=0.014  corr(D,S)=-0.142  corr(X,S)=0.908  corr(P2,X)=0.134  slope S on VR: 0.43 (=0.02σS per VR unit)
// DECILES by VR (VRlo..hi | meanS sdS minS):
//   d1 0.34..0.71 | 311.2 24.71 248
//   d2 0.71..0.80 | 310.6 24.79 248
//   d3 0.80..0.86 | 311.1 24.27 249
//   d4 0.86..0.92 | 309.4 24.90 255
//   d5 0.92..0.98 | 310.9 25.42 248
//   d6 0.98..1.04 | 310.9 25.17 249
//   d7 1.04..1.11 | 311.7 25.33 251
//   d8 1.11..1.20 | 310.4 25.09 252
//   d9 1.20..1.31 | 311.2 25.58 249
//   d10 1.31..2.35 | 311.4 24.95 248
// CALM F={VR≤VR(0)}: |F|=1183 (3.94%)  S|F: mean=311.65 sd=25.42 min=248 max=387  Var(S|F)/Var(S)=1.032  minS|F−minS=0  P(S≤q1%|F)=1.86% vs 1.18% full
// MINIMIZERS (8 lowest S): t=8161:S=248,VR=0.95(p44.5) t=13567:S=248,VR=1.35(p92.4) t=13679:S=248,VR=0.55(p1.4) t=14249:S=248,VR=0.78(p17.5) t=15781:S=248,VR=0.78(p17.5) t=16351:S=248,VR=0.55(p1.4) t=16463:S=248,VR=1.35(p92.4) t=21869:S=248,VR=0.95(p44.5)
// EMPIRICAL FLOOR minVR among {S≤s}: s=251(0.1%): 0.546 (max 1.87)  s=259(1%): 0.488  s=269(5%): 0.383   [anchor VR=0.623]
// OVERLAP-FLOOR PRICE: c_obs=max|X−X̄|/√(KV̄·VR)=1.458@t=14170(VR=0.55)  p99.9=1.153  median=0.310  [CS check max|D|/√(KV̄·VR)=0.676≤1]
// SCALING: E[S]/√(K·V̄)=4.88 → candidate v_min=(E/(1+c))²/(KV̄) with c=c_obs: 3.935  (vs max observed VR=2.35)
// PROVEN LEMMA: H=1.147>1 — pigeonhole leg vacuous at this level (overlap credit mandatory: S=0 ⟺ X−D=N(H−1)=145.3, i.e. (X−D) 12.4σ_S below its mean)
// [level time 0.371s]
//
// ===== @17: W=510510 N=14850 K=120 (19..709)  H=2Σ1/q=1.4938  V̄=ΣVarRot=1144.40  N(1−H)=-7332.8 =====
// checks: VR(0)=0.553 (cap13 0.553 PASS)  S(0)=3099 (3099 PASS)  brute@3t PASS  P2=cap12-pairsum PASS  mirror PASS  0≤X≤P2 all t PASS
// ENSEMBLE: S mean=3614.93 sd=207.53 min=3033@t=232093 max=4319 | D sd=33.85 | X mean=10947.7 sd=208.93 | P2 mean=16201.2 | meanVR=1.000
//   Var(S)=Var(D)+Var(X)−2Cov(D,X): 43068.31 = 1145.86+43653.83−2·865.69 (relerr 4.1e-13)  Cov(D,X)/sdDsdX=0.122  Var(D)/V̄=1.001
// ANCHOR: S(0)=3099 (z=-2.49)  VR(0)=0.553  D(0)=-50.76 (z=-1.50)  X(0)=10381 (z=-2.71)  P2(0)=15770 (z=-0.30)  drift split S−S̄=-515.9 = X̂(-566.7) − D̂(-50.8)
// LAW: corr(VR,S)=0.002  corr(VR,(S−S̄)²)=0.001  corr(D,S)=-0.040  corr(X,S)=0.987  corr(P2,X)=-0.213  slope S on VR: 2.61 (=0.01σS per VR unit)
// DECILES by VR (VRlo..hi | meanS sdS minS):
//   d1 0.49..0.84 | 3615.9 206.75 3049
//   d2 0.84..0.89 | 3614.6 206.92 3038
//   d3 0.89..0.93 | 3615.7 208.28 3039
//   d4 0.93..0.96 | 3613.9 209.11 3033
//   d5 0.96..1.00 | 3612.9 207.15 3043
//   d6 1.00..1.03 | 3613.1 207.76 3051
//   d7 1.03..1.06 | 3616.8 206.98 3038
//   d8 1.06..1.11 | 3615.6 206.66 3044
//   d9 1.11..1.17 | 3615.1 207.25 3037
//   d10 1.17..2.14 | 3615.8 208.39 3048
// CALM F={VR≤VR(0)}: |F|=11 (0.00%)  S|F: mean=3514.27 sd=245.19 min=3099 max=3819  Var(S|F)/Var(S)=1.396  minS|F−minS=66  P(S≤q1%|F)=9.09% vs 1.02% full
// MINIMIZERS (8 lowest S): t=232093:S=3033,VR=0.93(p31.4) t=278417:S=3033,VR=0.93(p31.4) t=208123:S=3037,VR=1.15(p88.1) t=302387:S=3037,VR=1.15(p88.1) t=246529:S=3038,VR=0.89(p19.7) t=248683:S=3038,VR=1.03(p62.1) t=261827:S=3038,VR=1.03(p62.1) t=263981:S=3038,VR=0.89(p19.7)
// EMPIRICAL FLOOR minVR among {S≤s}: s=3074(0.1%): 0.649 (max 1.34)  s=3115(1%): 0.553  s=3216(5%): 0.488   [anchor VR=0.553]
// OVERLAP-FLOOR PRICE: c_obs=max|X−X̄|/√(KV̄·VR)=2.056@t=0(VR=0.55)  p99.9=1.560  median=0.388  [CS check max|D|/√(KV̄·VR)=0.424≤1]
// SCALING: E[S]/√(K·V̄)=9.75 → candidate v_min=(E/(1+c))²/(KV̄) with c=c_obs: 10.186  (vs max observed VR=2.14)
// PROVEN LEMMA: H=1.494>1 — pigeonhole leg vacuous at this level (overlap credit mandatory: S=0 ⟺ X−D=N(H−1)=7332.8, i.e. (X−D) 17.4σ_S below its mean)
// [level time 76.706s]
// [total 77.097s]
// ============================================================================
// READINGS (2026-08-14) — honestly calibrated
// ============================================================================
// 1. THE INTUITION FAILS AT ITS CENTER: CALM DOES NOT CONCENTRATE S.
//    corr(VR,S) = 0.088 / 0.004 / 0.002 at @11/@13/@17; corr(VR,(S−S̄)²) =
//    0.113 / 0.014 / 0.001; the VR-decile means of S are flat to <0.5%; and
//    Var(S | VR ≤ VR(0)) / Var(S) = 1.04 / 1.03 / 1.40 — conditioning on the
//    anchor's own calm buys ZERO concentration. Sharpest cut: at @17 the calm
//    family is 11 rotations and the ANCHOR IS ITS S-MINIMUM (3099; family max
//    3819). Within its own low-variance family the anchored tile sits CLOSEST
//    to the kill tail — its deficit is drift in the overlap channel, which VR
//    does not see.
// 2. THE MECHANISM, EXACT — why the card cannot win as dealt. S = N(1−H) +
//    X − D (L1, verified to the integer), so Var(S) = Var(D) + Var(X) −
//    2Cov(D,X): 15.0+15.1−16.3 @11, 120+669−163 @13, 1146+43654−1731 @17.
//    The union's variance lives in the SECOND-order term: Var(X)/Var(S) =
//    1.10 / 1.07 / 1.01 and corr(X,S) = 0.48 / 0.91 / 0.99, while D — the
//    only channel VR constrains (L2; Var(D)/V̄ = 0.993/1.005/1.001,
//    cross-prime covariances CRT-cancel) — carries 2.7% of Var(S) at @17.
//    Low VR forces NOTHING about overlap predictability: that was the gap in
//    the intuition, and it is the whole story.
// 3. ANNIHILATION IS X-LIMITED, NOT D-LIMITED (proven, per level, from L2 +
//    enumerated max VR). S=0 requires D̂ − X̂ = S̄ (L1). But max_t |D| ≤
//    √(K·V̄·VRmax) = 20.5 / 97.8 / 542 against S̄ = 38.2 / 310.9 / 3614.9:
//    at EACH of @11, @13 and @17 the strike channel alone is PROVABLY too
//    small to annihilate even at ensemble-maximum loudness — at the levels
//    THIS file enumerates. (Amended 2026-08-18: this reading used to add "and
//    at those three levels only: max VR is enumerated nowhere else", which is
//    a false absence claim. max VR IS enumerated at @19, by cap-19 PART A and
//    again by cap-38, and cap-38 supplies the @19 S̄ = 49,238.76 that carries
//    the theorem to that level. So the theorem holds at @11, @13, @17 and
//    @19.) "From @13 upward" is still an extrapolation and not the theorem;
//    the all-x form is the Loudness Ceiling Conjecture, OPEN, and cap-38
//    measures its margin at ×3.5, ×10.1, ×44.4, ×271.7. See the .md.
//    S = 0 therefore needs
//    overlap collapse X̄ − X ≥ S̄ − max|D| = 213 (8.2σ_X) @13, 3073 (14.7σ_X)
//    @17. The kill, if it ever happens, is an overlap-credit event.
// 4. MINIMIZER LOUDNESS VERDICT: NOT LOUD. Global minima 28 / 248 / 3033 sit
//    only 2.8 / 2.5 / 2.8 σ_S below the mean (S=0 is 10.3 / 12.4 / 17.4 σ).
//    The @13 minimizers (8 tied at 248) span VR percentiles 1.4–92.4 — two
//    are among the CALMEST 1.4% of the ensemble; @17 minimizers span
//    p19.7–88.1. Empirical floor min{VR : S ≤ q0.1%} = 0.73 / 0.55 / 0.65:
//    at @13 it is BELOW the anchor's own VR (0.55 < 0.62). The hoped lemma
//    "S(t)=0 requires VR(t) ≥ v_min(x), v_min growing" is REFUTED at @13+
//    as a mechanism claim: annihilation-adjacent rotations are VR-generic.
// 5. WHAT SURVIVES, PROVEN — THE @11 THEOREM. At @11, H = 0.789 < 1, so L4
//    gives: S(t) = 0 ⇒ VR(t) ≥ Δ²/(K·V̄) = 2.392. Exactly 7 of 2310
//    rotations are that loud, and their enumerated survivor counts are
//    30–48 > 0. COROLLARY (new door): no rotation of the @11 scour
//    annihilates the natal set — one inequality plus 7 direct checks, where
//    cap-21 Thm 3 needed a 1.63M-member exhaustion (different, larger
//    ensemble there; same conclusion shape). This is the calm-excludes-kill
//    argument in its only rigorously closable habitat: H < 1, which dies
//    forever at @13 (H grows ~2ln(x/2lnx); overlap credit becomes mandatory).
// 6. THE OVERLAP-FLOOR CANDIDATE, AND ITS HONEST PRICE. If |X−X̄| ≤
//    c·√(K·V̄·VR) held with bounded c, then S=0 ⇒ VR ≥ (S̄/(1+c))²/(K·V̄) =
//    1.9 / 3.9 / 10.2 — which at @13/@17 EXCEEDS the enumerated max VR
//    (2.35 / 2.14): it would prove non-annihilation for the ENTIRE ensemble,
//    calm and loud alike, and E[S]/√(K·V̄) = 3.1 / 4.9 / 9.8 grows, so it
//    scales. But the measured price c_obs = 1.25 / 1.46 / 2.06 GROWS, and at
//    @17 the maximizing rotation is t = 0 ITSELF: the anchored drift (X(0)
//    2.7σ_X below X̄, carrying 92% of the anchored S-deficit −516) is the
//    candidate lemma's own worst case. The missing link dies on the anchor's
//    own drift — the β wall, met from a new side.
// 7. THE ONE MISSING LINK, EXACTLY. S(0) > 0 ⟺ X̄ − X(0) + (D(0)−D̄) < S̄.
//    Fusion+L2 fence the strike term: |D(0)| ≤ √(K·V̄·VR(0)) = 276 @17, 8%
//    of S̄ (and D(0) measured −50.8). The chain "fusion ⇒ calm ⇒ cannot be
//    zeroed" therefore reduces to ONE statement: THE ANCHORED OVERLAP-CREDIT
//    DEFICIT STAYS BELOW (1−ε)·S̄, i.e. X(0)/X̄ ≥ 1 − (1−ε)S̄/X̄. Measured
//    X(0)/X̄ = 1.45 / 0.991 / 0.948 — descending: this is the X-face of the
//    anchored bias β(x). The card, played to the end, returns Assumption A
//    in sharper clothes: drift relocated from survivor count to overlap
//    credit, with the strike channel now rigorously fenced off (that fence —
//    reading 3 + the fusion calm — is what the campaign actually won here).
// 8. CALIBRATION. (i) All numbers are exact full enumerations of cap-13's
//    W-member diagonal rotation ensemble; its mean differs from both the
//    independent strike ensemble and the window ensemble (S̄ = 38.24 here
//    vs 39.27 there @11; 3614.9 vs 3245.5 window @17) — the diagonal
//    correlates classes across primes; anchored z here (−2.49 @17) is NOT
//    cap-07's window z (−4.50). (ii) P2 = cap-12's S₂ tracks X poorly
//    (corr 0.59 / 0.13 / −0.21) and the anchored P2 is z = −0.30 while X is
//    z = −2.71 @17: the anchored overlap deficit lives in multiplicity
//    structure (m ≥ 3), not in pair counts — a warning for any T4-style
//    route to X-tails. (iii) c_obs is a max over W enumerated members, not
//    a tail estimate; its @17 maximizer being t=0 is structural (smallest
//    denominator × largest drift), not look-elsewhere. (iv) Runtime 76 s.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   668.94 -> 669, 1145.86 -> 1146, 43653.83 -> 43654, 162.68 -> 163 and
//     1731.38 -> 1731 (reading 2 quotes the printed variance identity with
//     2Cov folded in and every term rounded to integers)
//   1.005 -> 1.01, 0.993 -> 0.991 (the Var(D)/V-bar column)
//   0.589 -> 0.59
//   1.458 -> 1.46, 2.056 -> 2.06 (the c_obs row)
//   10.186 -> 10.2
//   3074 -> 3073 in reading 3's floor, and 0.95 -> 0.948
//   the empirical floor row 0.73 / 0.55 / 0.65, printed to more digits in the
//     EMPIRICAL FLOOR lines
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   sqrt(K*V-bar*VRmax) = 20.5 / 97.8 / 542, and 276 in reading 7, all formed
//     from the printed K, V-bar and VR columns.
//   the sigma counts 8.2, 14.7, 10.3, 12.4, 17.4, 2.7, 2.8, 2.5.
//   the ratios Var(X)/Var(S) = 1.10 / 1.07 / 1.01 and the 2.7% of Var(S).
//   the 92% of the anchored S-deficit.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   S-bar = 49,238.76 at @19 and the margin row x3.5, x10.1, x44.4, x271.7 are
//     cap-38's, and reading 3 says so: both are in
//     research/natal-cap-38-loudness-driver.js's embedded OUTPUT.
//   39.27 (@11) and 3245.5 (@17) are cap-21/thm5 window means, present in
//     research/natal-cap-32-wrap-identity.js and
//     research/natal-cap-34-wrap-precision.js as T1 = 3245.512635440701.
//   the 1.63M-member exhaustion of reading 5 is cap-21 Thm 3's, named there.
// ---------------------------------------------------------------------------
